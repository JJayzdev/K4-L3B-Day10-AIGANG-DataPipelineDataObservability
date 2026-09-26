// Quan Sát Dữ Liệu & Pipeline Tự Phục Hồi Cho RAG - Demo Controller
// Tác giả: Lục Tiến Đạt (2A202602969) - Nhóm AIGANG

document.addEventListener('DOMContentLoaded', () => {
  const data = window.DEMO_DATA || {};

  // 1. Chuyển đổi qua lại giữa các Tab
  initTabs();

  // 2. Logic cho Stepper Tiến trình Pipeline
  initStepper();

  // 3. Biểu đồ Radar & Bar Chart (Chart.js)
  initCharts(data);

  // 4. RAG Playground Thực Nghiệm
  initPlayground(data);

  // 5. Mô Phỏng Tự Phục Hồi (Idempotent Simulator)
  initSimulator();
});

/* ==================== 1. ĐIỀU HƯỚNG TABS ==================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/* ==================== 2. PIPELINE STEPPER ==================== */
const STAGE_DETAILS = [
  {
    title: 'Bước 01: Thu Thập & Lưu Trữ Dữ Liệu Thô (Raw Preservation)',
    desc: 'Dữ liệu phản hồi gốc từ Crossref REST API được chụp lại nguyên vẹn và ghi trực tiếp vào tệp JSON bất biến trước khi thực hiện bất kỳ bước xử lý hay làm sạch nào.',
    banner: 'Nguyên Lý Kỹ Thuật: Dữ liệu thô (Raw) là nguồn chân lý duy nhất (Single Source of Truth). Việc lưu trữ vĩnh viễn tệp raw cho phép hệ thống chạy lại (replay) bất cứ lúc nào mà không cần gọi lại API bên ngoài bị giới hạn lượt gọi.',
    file: 'src/ingestion/crossref.py',
    features: [
      'Lưu trữ phản hồi Crossref gốc trực tiếp vào data/raw/crossref_response.json',
      'Trích xuất 24 bài báo khoa học chất lượng cao về chủ đề LLM & Retrieval Augmented Generation',
      'Tích hợp cơ chế fallback tự động nạp từ fixture dữ liệu khi mạng bên ngoài gặp sự cố'
    ],
    snippet: `def fetch_source_records(query: str = "retrieval augmented generation", rows: int = 25) -> list[dict]:
    """Thu thập dữ liệu thô từ Crossref với cơ chế fallback vào snapshot nội bộ."""
    url = f"https://api.crossref.org/works?query={quote(query)}&rows={rows}"
    try:
        req = Request(url, headers={"User-Agent": "AIGANG-DataPipeline/1.0"})
        with urlopen(req, timeout=10) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
            save_raw_payload(payload)
            return parse_crossref_payload(payload)
    except Exception:
        # Fallback về snapshot bất biến nguyên bản
        return load_raw_records()`
  },
  {
    title: 'Bước 02: Tiền Xử Lý, Khử Trùng Lặp & Chuẩn Hóa Schema',
    desc: 'Các bài báo thô được chuẩn hóa về một cấu trúc dữ liệu đồng nhất: khóa chính DOI chuẩn, loại bỏ mã HTML entities, dọn dẹp khoảng trắng thừa và khử trùng lặp.',
    banner: 'Nguyên Lý Kỹ Thuật: Khử trùng lặp đảm bảo các bản ghi gửi nhiều lần hoặc nhiều phiên bản sẽ thu gọn về duy nhất 1 hàng dữ liệu chuẩn, tránh lãng phí chi phí embedding và vector index.',
    file: 'src/ingestion/cleaning.py',
    features: [
      'Chuẩn hóa paper_id về định dạng DOI chữ thường duy nhất',
      'Giải mã các ký tự HTML entities và làm sạch mã đánh dấu thừa trong tóm tắt bài báo',
      'Loại bỏ các bản ghi trùng lặp hoàn toàn, xuất 24 bài báo chuẩn ra data/clean/papers_clean.csv'
    ],
    snippet: `def build_clean_dataframe(raw_records: list[dict]) -> pd.DataFrame:
    """Chuẩn hóa dữ liệu thô thành DataFrame sạch, có cấu trúc."""
    cleaned = []
    for r in raw_records:
        paper_id = normalize_id(r.get("paper_id") or r.get("DOI"))
        title = clean_text(r.get("title", ""))
        summary = clean_abstract(r.get("summary") or r.get("abstract", ""))
        published = parse_iso_date(r.get("published"))
        cleaned.append({"paper_id": paper_id, "title": title, "summary": summary, "published": published})
    
    df = pd.DataFrame(cleaned).drop_duplicates(subset=["paper_id"])
    return df`
  },
  {
    title: 'Bước 03: Cổng Kiểm Định Chất Lượng (Great Expectations 1.x)',
    desc: 'Chạy bộ kiểm định khai báo (Expectation Suite) trên tập dữ liệu đã làm sạch. Kiểm tra tính duy nhất của khóa chính, trường bắt buộc, độ dài tiêu đề và chuẩn độ tươi SLA.',
    banner: 'Nguyên Lý Kỹ Thuật: Cổng kiểm soát chất lượng (Quality Gate) chặn đứng dữ liệu bẩn trước khi đi vào vector embeddings. Nếu có bất kỳ vi phạm nào, tiến trình tạo index sẽ lập tức bị chặn lại.',
    file: 'src/observability/quality.py',
    features: [
      'Sử dụng Great Expectations 1.x với kiến trúc Ephemeral Context hiện đại',
      'Kiểm định 7 điều kiện: tính duy nhất của paper_id, tóm tắt không được rỗng, độ dài tiêu đề >= 8',
      'Áp dụng Freshness SLA: Cảnh báo đỏ nếu tỷ lệ tài liệu cũ (>180 ngày) vượt ngưỡng 20%'
    ],
    snippet: `def validate_paper_dataframe(df: pd.DataFrame) -> dict:
    """Chạy bộ kiểm thử Great Expectations 1.x và Freshness SLA."""
    context = gx.get_context(mode="ephemeral")
    data_source = context.data_sources.add_pandas("clean_source")
    data_asset = data_source.add_dataframe_asset("papers")
    
    suite = gx.ExpectationSuite(name="rag_clean_suite")
    suite.add_expectation(gx.expectations.ExpectColumnValuesToBeUnique(column="paper_id"))
    suite.add_expectation(gx.expectations.ExpectColumnValuesToNotBeNull(column="summary"))
    suite.add_expectation(gx.expectations.ExpectColumnValueLengthsToBeBetween(column="title", min_value=8))
    
    res = batch.validate(suite)
    freshness = check_freshness_sla(df, threshold_days=180)
    return {"success": res.success and freshness["is_fresh"], "res": res}`
  },
  {
    title: 'Bước 04: Vector Store & RAG Baseline (Giai Đoạn 1)',
    desc: 'Đánh chỉ mục các tài liệu sạch vào ChromaDB bằng mô hình SentenceTransformers. Đánh giá kiểm thử 10 câu hỏi chuẩn hóa.',
    banner: 'Nguyên Lý Kỹ Thuật: Baseline xác lập điểm mốc chuẩn: Đạt 100% Retrieval Hit Rate, 100% Token F1 và điểm đánh giá tuyệt đối 5.0/5.0 trên toàn bộ tập benchmark.',
    file: 'src/pipelines/phase1.py',
    features: [
      'Chia đoạn và vector hóa tóm tắt bài báo vào collection ChromaDB bền vững',
      'Thực thi tìm kiếm ngữ nghĩa Top-k=3 cho từng câu hỏi kiểm thử',
      'Tổng hợp câu trả lời RAG chính xác và đo lường Token F1 so với câu trả lời kỳ vọng'
    ],
    snippet: `def run_baseline_rag():
    """Khởi tạo ChromaDB vector index và đánh giá benchmark mốc chuẩn."""
    client = chromadb.PersistentClient(path="data/chroma")
    col = client.get_or_create_collection("rag_papers_baseline")
    
    # Nạp các đoạn văn bản sạch
    for _, row in clean_df.iterrows():
        col.add(ids=[row["paper_id"]], documents=[row["summary"]], metadatas=[{"title": row["title"]}])
        
    metrics = evaluate_testset(col, test_queries)
    # Kết quả: Retrieval Hit Rate = 1.0 (100%), Mean Token F1 = 1.0 (100%)`
  },
  {
    title: 'Bước 05: Tiêm Lỗi Ngầm & Biến Dạng Dữ Liệu (Giai Đoạn 2)',
    desc: 'Tiêm 6 lỗi dữ liệu nhân tạo phổ biến trong thực tế. Chứng minh rằng RAG thông thường thất bại trong im lặng (Silent Failure) trong khi Observability cảnh báo ngay lập tức.',
    banner: 'Cảnh Báo Lỗi Ngầm: Các lệnh gọi API vẫn trả về mã 200 OK, nhưng tỷ lệ tìm thấy văn bản đúng của RAG đã sụt từ 100% xuống 60%! Great Expectations đã phát hiện ngay lập tức.',
    file: 'src/ingestion/corruption.py',
    features: [
      'Mô phỏng 6 lỗi: Bỏ rơi tài liệu mới, xóa trắng tóm tắt, cắt ngắn tiêu đề, sai lệch ngày',
      'Tập dữ liệu biến dạng còn lại 22 bài báo và phát sinh 2 bản ghi trùng lặp khóa chính',
      'Great Expectations thất bại với 2 điều kiện vi phạm, ghi lại nhật ký kiểm định chi tiết'
    ],
    snippet: `def inject_corruptions(df: pd.DataFrame) -> tuple[pd.DataFrame, list[dict]]:
    """Tiêm 6 khiếm khuyết dữ liệu nhân tạo vào DataFrame sạch."""
    df = drop_latest_records(df, count=4)      # Sự cố đứt mạng nguồn
    df = blank_summary(df, count=2)            # Lỗi schema nhà xuất bản
    df = inject_noise(df, count=2)             # Lỗi parser mạng
    df = truncate_title(df, count=2)           # Lỗi tràn cột DB
    df = stale_date(df, count=8, days=365)     # Lỗi trôi đồng hồ
    df = duplicate_rows(df, count=2)           # Lỗi retry hàng đợi
    return df, logs`
  },
  {
    title: 'Bước 06: Cơ Chế Tự Phục Hồi Bất Biến (Idempotent Repair)',
    desc: 'Đảm bảo khả năng tự chữa lành hoàn toàn của pipeline. Phục hồi dữ liệu từ bản thô nguyên gốc, dọn sạch collection bẩn và đưa RAG trở lại 100%.',
    banner: 'Bảo Đảm Tính Bất Biến: f(f(x)) = f(x). Chạy quy trình phục hồi 1 lần hay 50 lần đều tạo ra trạng thái sạch sẽ, nhất quán 100% như nhau.',
    file: 'src/pipelines/corruption_flow.py',
    features: [
      'Xóa sạch collection ChromaDB bị nhiễm bẩn trước khi tái nạp',
      'Đọc lại dữ liệu thô nguyên bản data/raw/crossref_records.json',
      'Chạy lại làm sạch và Great Expectations đạt 100% pass, khôi phục Hit Rate về 100%'
    ],
    snippet: `def run_idempotent_repair_flow():
    """Dọn dẹp, tái nạp từ nguồn raw bất biến và kiểm chứng độc lập."""
    # 1. Xóa sạch vector store nhiễm bẩn
    chroma_client.delete_collection("rag_papers_repaired")
    
    # 2. Đọc lại nguồn chân lý raw bất biến
    raw_records = load_raw_records()
    repaired_df = build_clean_dataframe(raw_records)
    
    # 3. Kiểm chứng Cổng GX
    assert validate_paper_dataframe(repaired_df)["success"] is True
    
    # 4. Tạo lại index và đánh giá benchmark
    metrics = evaluate_testset(repaired_col, test_queries)
    assert metrics["retrieval_hit_rate"] == 1.0`
  }
];

function initStepper() {
  const stepItems = document.querySelectorAll('.step-item');
  const titleEl = document.getElementById('stage-detail-title');
  const descEl = document.getElementById('stage-detail-desc');
  const bannerEl = document.getElementById('stage-banner');
  const featureListEl = document.getElementById('stage-feature-list');
  const filenameEl = document.getElementById('code-filename');
  const snippetEl = document.getElementById('stage-code-snippet');

  function renderStage(index) {
    const stage = STAGE_DETAILS[index];
    if (!stage) return;

    stepItems.forEach((item, idx) => {
      if (idx === index) item.classList.add('active');
      else item.classList.remove('active');
    });

    titleEl.textContent = stage.title;
    descEl.textContent = stage.desc;
    bannerEl.innerHTML = `<strong>Ghi Chú Kỹ Thuật:</strong> ${stage.banner}`;
    filenameEl.textContent = stage.file;
    snippetEl.textContent = stage.snippet;

    featureListEl.innerHTML = stage.features
      .map(f => `<li>${f}</li>`)
      .join('');
  }

  stepItems.forEach(item => {
    item.addEventListener('click', () => {
      const stepIdx = parseInt(item.getAttribute('data-step'), 10);
      renderStage(stepIdx);
    });
  });

  // Render bước đầu tiên
  renderStage(0);
}

/* ==================== 3. BIỂU ĐỒ ĐỐI SO SÁNH ==================== */
function initCharts(data) {
  const radarCtx = document.getElementById('radarChart');
  const barCtx = document.getElementById('barChart');

  if (!radarCtx || !barCtx) return;

  // 1. Radar Chart: 5 Chiều Sức Khỏe Pipeline
  new Chart(radarCtx, {
    type: 'radar',
    data: {
      labels: ['Tỷ Lệ Hit Rate', 'Điểm Token F1', 'Độ Chính Xác Giám Khảo', 'Cổng Kiểm Định GX', 'Chuẩn Độ Tươi SLA'],
      datasets: [
        {
          label: '1. Gốc (Baseline)',
          data: [100, 100, 100, 100, 100],
          backgroundColor: 'rgba(6, 182, 212, 0.2)',
          borderColor: '#06b6d4',
          borderWidth: 2,
          pointBackgroundColor: '#06b6d4'
        },
        {
          label: '2. Biến Dạng (Corrupted)',
          data: [60, 64.6, 60, 0, 0],
          backgroundColor: 'rgba(244, 63, 94, 0.25)',
          borderColor: '#f43f5e',
          borderWidth: 2,
          pointBackgroundColor: '#f43f5e'
        },
        {
          label: '3. Phục Hồi (Repaired)',
          data: [100, 100, 100, 100, 100],
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: '#10b981',
          borderWidth: 2,
          borderDash: [4, 4],
          pointBackgroundColor: '#10b981'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          pointLabels: {
            color: '#94a3b8',
            font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }
          },
          ticks: {
            display: false,
            stepSize: 20
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: {
          labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 12 } }
        }
      }
    }
  });

  // 2. Bar Chart: So Sánh Chỉ Số Cột
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: ['Hit Rate (%)', 'Token F1 (%)', 'Độ Chính Xác (%)', 'Điểm Đánh Giá (x20)'],
      datasets: [
        {
          label: 'Gốc (Baseline)',
          data: [100, 100, 100, 100],
          backgroundColor: '#06b6d4'
        },
        {
          label: 'Biến Dạng (Corrupted)',
          data: [60, 64.6, 60, 68],
          backgroundColor: '#f43f5e'
        },
        {
          label: 'Phục Hồi (Repaired)',
          data: [100, 100, 100, 100],
          backgroundColor: '#10b981'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          grid: { color: 'rgba(255, 255, 255, 0.08)' },
          ticks: { color: '#94a3b8' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#94a3b8' }
        }
      },
      plugins: {
        legend: {
          labels: { color: '#cbd5e1', font: { family: 'Plus Jakarta Sans', size: 12 } }
        }
      }
    }
  });
}

/* ==================== 4. RAG PLAYGROUND THỰC NGHIỆM ==================== */
function initPlayground(data) {
  const testSet = data.test_set || [];
  const baselineAnswers = data.baseline_answers || [];
  const corruptedAnswers = data.corrupted_answers || [];
  const repairedAnswers = data.repaired_answers || [];

  let activeIndex = 0;
  let activeCollection = 'corrupted'; // Mặc định mở corrupted để thể hiện lỗi ngầm
  let activeFilter = 'all';

  const queryListEl = document.getElementById('query-list');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const collectionBtns = document.querySelectorAll('.collection-btn');

  // Các phần tử DOM cho câu hỏi
  const queryIdEl = document.getElementById('rag-query-id');
  const queryTextEl = document.getElementById('rag-query-text');
  const hitBadgeEl = document.getElementById('rag-hit-badge');
  const f1ValEl = document.getElementById('rag-f1-val');
  const judgeValEl = document.getElementById('rag-judge-val');
  const expectedDocEl = document.getElementById('rag-expected-doc');
  const retrievedDocBadgeEl = document.getElementById('rag-retrieved-doc-badge');
  const retrievedChunksEl = document.getElementById('rag-retrieved-chunks');
  const groundTruthEl = document.getElementById('rag-ground-truth');
  const answerLabelEl = document.getElementById('rag-answer-label');
  const answerTextEl = document.getElementById('rag-answer-text');

  // Danh mục câu hỏi hiển thị
  function renderQueryList() {
    queryListEl.innerHTML = '';
    testSet.forEach((item, idx) => {
      const qType = item.question_type || 'general';
      if (activeFilter !== 'all' && qType !== activeFilter) return;

      const div = document.createElement('div');
      div.className = `query-item ${idx === activeIndex ? 'active' : ''}`;
      div.innerHTML = `
        <div class="query-item-header">
          <span class="query-id">${item.id.toUpperCase()} &bull; LOẠI: ${qType}</span>
        </div>
        <div class="query-text">${item.question}</div>
      `;
      div.addEventListener('click', () => {
        activeIndex = idx;
        renderActiveQuery();
        renderQueryList();
      });
      queryListEl.appendChild(div);
    });
  }

  // Bộ lọc danh mục
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderQueryList();
    });
  });

  // Nút chuyển đổi Collection
  collectionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      collectionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCollection = btn.getAttribute('data-col');
      renderActiveQuery();
    });
  });

  // Hiển thị chi tiết câu hỏi đang chọn
  function renderActiveQuery() {
    const q = testSet[activeIndex];
    if (!q) return;

    let ansList = corruptedAnswers;
    if (activeCollection === 'baseline') ansList = baselineAnswers;
    else if (activeCollection === 'repaired') ansList = repairedAnswers;

    const ansData = ansList[activeIndex] || {};
    const isHit = ansData.retrieval_hit ?? false;
    const f1Score = ((ansData.token_f1 ?? 0) * 100).toFixed(1);
    const judgeScore = ansData.judge ? `${ansData.judge.score} / 5.0` : '5.0 / 5.0';

    queryIdEl.textContent = `${q.id.toUpperCase()} &bull; PHÂN LOẠI: ${q.question_type.toUpperCase()}`;
    queryTextEl.textContent = q.question;

    // Huy hiệu Hit / Miss
    if (isHit) {
      hitBadgeEl.className = 'badge-tag badge-pass';
      hitBadgeEl.textContent = 'TÌM THẤY (HIT)';
    } else {
      hitBadgeEl.className = 'badge-tag badge-fail';
      hitBadgeEl.textContent = 'BỎ LỠ (MISS - LỖI NGẦM)';
    }

    f1ValEl.textContent = `${f1Score}%`;
    judgeValEl.textContent = judgeScore;
    expectedDocEl.textContent = (q.ground_truth_doc_ids || []).join(', ') || 'N/A';

    // Đoạn ngữ cảnh truy xuất
    const retrievedDocs = ansData.retrieved_doc_ids || [];
    retrievedDocBadgeEl.textContent = `Mã tài liệu tìm thấy: [${retrievedDocs.join(', ')}]`;

    const contexts = ansData.retrieved_contexts || [];
    if (contexts.length === 0) {
      retrievedChunksEl.innerHTML = `<div class="chunk-card miss">Không tìm thấy tài liệu phù hợp từ vector store.</div>`;
    } else {
      retrievedChunksEl.innerHTML = contexts
        .map((ctx, i) => {
          const docId = retrievedDocs[i] || 'Chưa rõ';
          const matchExpected = (q.ground_truth_doc_ids || []).includes(docId);
          return `
            <div class="chunk-card ${matchExpected ? 'hit' : 'miss'}">
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); margin-bottom: 4px;">
                ĐOẠN TRÍCH #${i + 1} &bull; TÀI LIỆU: ${docId} ${matchExpected ? '✔ [ĐÚNG MỤC TIÊU]' : '❌ [SAI LỆCH / BIẾN DẠNG]'}
              </div>
              <div>${ctx}</div>
            </div>
          `;
        })
        .join('');
    }

    groundTruthEl.textContent = q.ground_truth || 'N/A';

    let collectionName = 'Tập Dữ Liệu Biến Dạng (Corrupted)';
    if (activeCollection === 'baseline') collectionName = 'Tập Dữ Liệu Gốc (Baseline Phase 1)';
    else if (activeCollection === 'repaired') collectionName = 'Tập Dữ Liệu Phục Hồi (Repaired Idempotent)';

    answerLabelEl.textContent = `Câu Trả Lời RAG Sinh Ra (${collectionName})`;
    answerTextEl.textContent = ansData.answer || 'Không có câu trả lời nào được sinh ra.';
  }

  // Khởi tạo hiển thị ban đầu
  renderQueryList();
  renderActiveQuery();
}

/* ==================== 5. MÔ PHỎNG TỰ PHỤC HỒI ==================== */
function initSimulator() {
  const terminalBody = document.getElementById('sim-terminal-body');
  const btnTrigger = document.getElementById('btn-trigger-repair');
  const btnReset = document.getElementById('btn-reset-sim');

  if (!terminalBody || !btnTrigger || !btnReset) return;

  const INITIAL_LOGS = [
    { type: 'info', text: 'Hệ thống đang ở Trạng thái Biến Dạng (Corrupted State - Phase 2).' },
    { type: 'warn', text: 'Cảnh báo Observability: Phát hiện 2 vi phạm kiểm định Great Expectations.' },
    { type: 'error', text: 'Tỷ lệ truy xuất đúng của RAG sụt giảm xuống 60.0% (giảm -40.0% so với chuẩn).' },
    { type: 'info', text: 'Đang chờ kỹ sư kích hoạt quy trình tự phục hồi bất biến...' }
  ];

  function resetTerminal() {
    terminalBody.innerHTML = '';
    INITIAL_LOGS.forEach(log => appendLog(log.type, log.text));
  }

  function appendLog(type, text) {
    const now = new Date();
    const ts = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    const div = document.createElement('div');
    div.className = 'log-line';
    div.innerHTML = `<span class="log-ts">${ts}</span> <span class="log-${type}">${text}</span>`;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  const REPAIR_STEPS = [
    { delay: 300, type: 'info', text: 'BƯỚC 1: Xóa sạch bộ sưu tập vector ChromaDB `rag_papers_repaired`...' },
    { delay: 700, type: 'success', text: 'Bộ sưu tập ChromaDB đã được dọn sạch hoàn toàn. 0 vector rác còn sót lại.' },
    { delay: 1100, type: 'info', text: 'BƯỚC 2: Tải nguồn dữ liệu thô bất biến `data/raw/crossref_records.json` (24 tài liệu)...' },
    { delay: 1500, type: 'info', text: 'BƯỚC 3: Chuẩn hóa schema, làm sạch văn bản và khử trùng lặp theo mã DOI...' },
    { delay: 2000, type: 'info', text: 'BƯỚC 4: Khởi chạy bộ kiểm định Great Expectations 1.x Ephemeral Suite...' },
    { delay: 2500, type: 'success', text: 'Cổng kiểm định GX: 7 / 7 Kỳ vọng ĐẠT (Tỷ lệ thành công 100%, 0 vi phạm).' },
    { delay: 2900, type: 'success', text: 'Chuẩn độ tươi SLA: 100% tài liệu đạt chuẩn (< 180 ngày). Trạng thái: FRESH.' },
    { delay: 3400, type: 'info', text: 'BƯỚC 5: Tái tạo vector embeddings cho 24 tài liệu sạch vào ChromaDB...' },
    { delay: 3900, type: 'info', text: 'BƯỚC 6: Chạy kiểm thử 10 câu hỏi benchmark chuẩn hóa trên collection vừa phục hồi...' },
    { delay: 4400, type: 'success', text: 'HOÀN TẤT ĐÁNH GIÁ: Retrieval Hit Rate = 100.0%, Token F1 = 100.0%, Điểm Giám khảo = 5.0/5.0!' },
    { delay: 4800, type: 'info', text: 'CHỨNG MINH BẤT BIẾN: f(f(x)) = f(x). Chạy lại quy trình cho kết quả trùng khớp 100%.' }
  ];

  let isRunning = false;

  btnTrigger.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    btnTrigger.disabled = true;
    btnTrigger.style.opacity = '0.5';

    appendLog('info', 'Đang kích hoạt chuỗi phục hồi dữ liệu tự động (Idempotent Flow)...');

    REPAIR_STEPS.forEach(step => {
      setTimeout(() => {
        appendLog(step.type, step.text);
      }, step.delay);
    });

    setTimeout(() => {
      isRunning = false;
      btnTrigger.disabled = false;
      btnTrigger.style.opacity = '1';
    }, 5200);
  });

  btnReset.addEventListener('click', () => {
    resetTerminal();
  });
}
