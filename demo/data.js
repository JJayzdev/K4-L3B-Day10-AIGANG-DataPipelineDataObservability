window.DEMO_DATA = {
  "baseline_metrics": {
    "samples": 10,
    "retrieval_hit_rate": 1.0,
    "mean_token_f1": 1.0,
    "judge_accuracy": 1.0,
    "mean_judge_score": 5,
    "ragas": {
      "skipped": "Set RUN_RAGAS=1 to enable the slower Ragas pass."
    }
  },
  "corrupted_metrics": {
    "samples": 10,
    "retrieval_hit_rate": 0.6,
    "mean_token_f1": 0.6455927051671733,
    "judge_accuracy": 0.6,
    "mean_judge_score": 3.4,
    "ragas": {
      "skipped": "Set RUN_RAGAS=1 to enable the slower Ragas pass."
    }
  },
  "repaired_metrics": {
    "samples": 10,
    "retrieval_hit_rate": 1.0,
    "mean_token_f1": 1.0,
    "judge_accuracy": 1.0,
    "mean_judge_score": 5,
    "ragas": {
      "skipped": "Set RUN_RAGAS=1 to enable the slower Ragas pass."
    }
  },
  "baseline_quality": {
    "report_name": "baseline",
    "success": true,
    "gx_success": true,
    "is_fresh": true,
    "row_count": 24,
    "failed_expectations_count": 0,
    "failed_expectations": [],
    "freshness": {
      "latest_published": "2026-09-15",
      "oldest_published": "2026-04-01",
      "stale_rows": 0,
      "total_rows": 24,
      "stale_ratio": 0.0,
      "threshold_days": 180,
      "is_fresh": true
    }
  },
  "corrupted_quality": {
    "report_name": "corrupted",
    "success": false,
    "gx_success": false,
    "is_fresh": false,
    "row_count": 22,
    "failed_expectations_count": 2,
    "failed_expectations": [
      {
        "expectation_type": "expect_column_values_to_be_unique",
        "kwargs": {
          "batch_id": "papers_source_corrupted-papers_asset_corrupted",
          "column": "paper_id"
        }
      },
      {
        "expectation_type": "expect_column_value_lengths_to_be_between",
        "kwargs": {
          "batch_id": "papers_source_corrupted-papers_asset_corrupted",
          "column": "summary",
          "min_value": 30
        }
      }
    ],
    "freshness": {
      "latest_published": "2026-09-04",
      "oldest_published": "2025-06-15",
      "stale_rows": 8,
      "total_rows": 22,
      "stale_ratio": 0.3636,
      "threshold_days": 180,
      "is_fresh": false
    }
  },
  "repaired_quality": {
    "report_name": "repaired",
    "success": true,
    "gx_success": true,
    "is_fresh": true,
    "row_count": 24,
    "failed_expectations_count": 0,
    "failed_expectations": [],
    "freshness": {
      "latest_published": "2026-09-15",
      "oldest_published": "2026-04-01",
      "stale_rows": 0,
      "total_rows": 24,
      "stale_ratio": 0.0,
      "threshold_days": 180,
      "is_fresh": true
    }
  },
  "freshness_report": {
    "latest_published": "2026-09-15",
    "oldest_published": "2026-04-01",
    "stale_rows": 0,
    "total_rows": 24,
    "stale_ratio": 0.0,
    "threshold_days": 180,
    "is_fresh": true
  },
  "corruption_log": {
    "timestamp": "2026-09-26T10:33:12.443789",
    "total_scenarios": 6,
    "initial_rows": 24,
    "corrupted_rows": 22,
    "scenarios": [
      {
        "scenario": "drop_latest_records",
        "count": 4,
        "description": "Dropped 4 newest records (20% of corpus)",
        "affected_paper_ids": [
          "10.21203/rs.3.rs-10489777/v1",
          "10.70267/aitia.2026482489",
          "10.21203/rs.3.rs-10349437/v1",
          "10.54254/2755-2721/2026.36624"
        ]
      },
      {
        "scenario": "blank_summary",
        "count": 2,
        "description": "Blanked out summary fields",
        "affected_paper_ids": [
          "10.36887/2415-8453-2026-3-2",
          "10.28932/jutisi.v12i2.13099"
        ]
      },
      {
        "scenario": "inject_noise",
        "count": 2,
        "description": "Injected synthetic noise strings into summaries",
        "affected_paper_ids": [
          "10.21203/rs.3.rs-10423755/v1",
          "10.20944/preprints202608.1849.v1"
        ]
      },
      {
        "scenario": "truncate_title",
        "count": 2,
        "description": "Truncated titles to fewer than 8 characters",
        "affected_paper_ids": [
          "10.3390/knowledge6030022",
          "10.36948/ijfmr.2026.v08i04.85777"
        ]
      },
      {
        "scenario": "stale_date",
        "count": 8,
        "description": "Shifted publication date back by 365 days to simulate stale data",
        "affected_paper_ids": [
          "10.2118/234689-pa",
          "10.1007/s10278-026-02086-9",
          "10.21203/rs.3.rs-10178277/v1",
          "10.2196/preprints.106157",
          "10.3390/buildings16132637",
          "10.21079/11681/50309",
          "10.63646/kpqm1958",
          "10.47576/2949-1894.2026.7.7.023"
        ]
      },
      {
        "scenario": "duplicate_rows",
        "count": 2,
        "description": "Duplicated rows to create duplicate paper_ids",
        "affected_paper_ids": [
          "10.36887/2415-8453-2026-3-2",
          "10.28932/jutisi.v12i2.13099"
        ]
      }
    ]
  },
  "test_set": [
    {
      "id": "eval_001",
      "question_type": "summary",
      "question": "What is the summary of the paper 'DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation'?",
      "ground_truth": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10489777/v1"
      ]
    },
    {
      "id": "eval_002",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review'?",
      "ground_truth": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation.",
      "ground_truth_doc_ids": [
        "10.70267/aitia.2026482489"
      ]
    },
    {
      "id": "eval_003",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems'?",
      "ground_truth": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10349437/v1"
      ]
    },
    {
      "id": "eval_004",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model'?",
      "ground_truth": "Zunlong Hong",
      "ground_truth_doc_ids": [
        "10.54254/2755-2721/2026.36624"
      ]
    },
    {
      "id": "eval_005",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Intelligent automation of economic processes based on retrieval-augmented generation and large language models'?",
      "ground_truth": "Serhii Arefiev, Serhii Hildi",
      "ground_truth_doc_ids": [
        "10.36887/2415-8453-2026-3-2"
      ]
    },
    {
      "id": "eval_006",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model'?",
      "ground_truth": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "ground_truth_doc_ids": [
        "10.28932/jutisi.v12i2.13099"
      ]
    },
    {
      "id": "eval_007",
      "question_type": "date",
      "question": "When was the paper 'Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1"
      ]
    },
    {
      "id": "eval_008",
      "question_type": "date",
      "question": "When was the paper 'An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.20944/preprints202608.1849.v1"
      ]
    },
    {
      "id": "eval_009",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.3390/knowledge6030022"
      ]
    },
    {
      "id": "eval_010",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777"
      ]
    }
  ],
  "baseline_answers": [
    {
      "id": "eval_001",
      "question_type": "summary",
      "question": "What is the summary of the paper 'DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation'?",
      "ground_truth": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10489777/v1"
      ],
      "answer": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination.",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10489777/v1",
        "10.21203/rs.3.rs-10349437/v1",
        "10.52060/juptik.v4i1.4318",
        "10.21203/rs.3.rs-10012178/v1"
      ],
      "retrieved_contexts": [
        "Title: DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation\nAuthors: Divya K\nPublished: 2026-09-15\nCategories: Computer Science\nSummary: Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination. Existing approaches to forensic readiness are, however, infrastructure-based and inadequately support the completeness of evidence, the identification of evidence gaps, and preparation of a structured investigation at the case level. This study introduces a privacy-preserving framework for assessing digital investigation readiness called DOLPHIN, which integrates offline large language models with retrieval-augmented generation to provide evidence-based investigation support. Thirty sets of 30 cases of structured investigation scenarios were created under five evidence-completeness conditions: complete-evidence, partial-evidence, and low-evidence cases. A Forensic Readiness Index was scored for each case across six categories of evidence: victim statement, FIR/CSR, CCTV evidence, witness statement, ownership documents, and metadata. The deficiencies were categorized using a taxonomy of evidence gaps. Evidence gaps were classified into four categories: documentation gaps, corroboration gaps, visual gaps, and time gaps. To ensure that critical investigation data is not processed in the cloud, the framework was deployed locally with the help of LM Studio, AnythingLLM, and Qwen 3. The experimental results indicated that DOLPHIN obtained a readiness classification accuracy of 92.0% and excellent evidence-gap detection performance with F1 scores ranging from 90.27% to 94.60%. The retrieval performance with metadata-filtered RAG was found to be superior, with 90.33% top-1 accuracy, 99.67% top-3 accuracy, and 94.06% mean reciprocal rank. The unsupported output rate went down from 16.33% to 2.00% when using metadata-filtered RAG. DOLPHIN also significantly reduced the mean preparation time, from 15.46 to 4.41 minutes per case, and increased the completion rate for reports. The results show the potential of offline LLM-RAG systems to aid in investigation-readiness assessment in a human-centered and interpretable way while preserving privacy.",
        "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
        "Title: Chatbot Hybrid Fatwa MUI Menggunakan Retrieval Augmented Generation dan Large Language Model\nAuthors: Surya Hidayatullah Firdaus, Nazruddin Safaat H, Yelfi Vitriani, Novriyanto\nPublished: 2026-06-01\nCategories: Computer Science\nSummary: Aksesibilitas dokumen digital Fatwa Majelis Ulama Indonesia (MUI) yang terfragmentasi membuat pencarian informasi kurang efektif. Di sisi lain, sistem tanya jawab AI berbasis satu sumber dokumen (single-corpus) rentan menghasilkan jawaban tidak akurat (halusinasi) pada pertanyaan di luar domain. Penelitian ini mengembangkan Chatbot Hybrid Fatwa MUI menggunakan arsitektur Hybrid Retrieval bertingkat dengan dua sumber pengetahuan: dokumen Fatwa MUI sebagai korpus utama dan 12.370 hadis Bukhari-Muslim sebagai mekanisme cadangan (fallback). Sistem ini menerapkan pencarian semantik, verifikasi topik otomatis oleh model bahasa, dan pengalihan ke basis data hadis jika konteks fatwa dinilai tidak relevan. Hasil evaluasi menunjukkan peningkatan kesamaan makna jawaban sebesar 13,23% (dari 0,6664 menjadi 0,7546) dan peningkatan kesetiaan pada rujukan (faithfulness) sebesar 10,57% (dari 85,37% menjadi 94,39%), dengan tingkat penolakan (abstain rate) identik sebesar 26,83%. Pendekatan multi-korpus ini terbukti signifikan meningkatkan relevansi dan keakuratan jawaban dibandingkan RAG standar.",
        "Title: Retrieval-Augmented Generation (RAG), Generative AI, and Agentic AI Governance: An Integrated Enterprise Governance Prioritization Architecture\nAuthors: Audrey Rah, Sven Hahues\nPublished: 2026-06-15\nCategories: Computer Science\nSummary: Abstract Enterprise adoption of artificial intelligence (AI) systems, including Generative AI (GenAI), Retrieval-Augmented Generation (RAG), and agentic AI, is advancing faster than many organizations can adapt their governance, audit, cybersecurity, and executive oversight practices. This paper develops a proposed integrated AI governance prioritization architecture using a design-science research approach, supported by exploratory platform-risk analysis, a reproducible platform-risk dataset, a Monte Carlo robustness assessment, a framework coverage matrix, a Governance Priority Score (GPS)-based demonstration, and a public-document relevance assessment. The primary contribution is an integrated governance decision-support architecture that uses the Enterprise AI Platform Taxonomy (EAPT) to estimate platform burden, the Enterprise AI Risk Taxonomy (EART) to organize governance-risk exposure, the Enterprise AI Governance Maturity Model (EAGM) to represent organizational readiness, and the Integrated Agentic AI Governance Framework (IAGF) to identify agentic AI oversight requirements within a unified workflow. These components are operationally connected through GPS, which links platform burden, governancerisk gaps, organizational readiness, agentic runtime-control needs, and executive decision support. The proposed architecture draws upon NIST AI RMF, NIST AI 600-1, ISO/IEC 42001, COBIT, OWASP LLM Top 10, MITRE ATLAS, the EU AI Act, and related AI governance literature. A rubric-based analytical dataset covering 19 enterprise AI platforms evaluates each platform across eight subdimensions, with final platform-risk scores computed as the arithmetic mean of data access scope, operational autonomy, tool/API integration breadth, external connectivity, governance burden, cybersecurity exposure, adoption and shadow-AI risk, and supply-chain integrity. TThe expanded scoring method produces high rank stability relative to the original final-score dataset, with Spearman’s ρ = 0.996, and remains directionally stable under coding-uncertainty stress testing; these results are interpreted only as internal coding stability and robustness, not external validation. Public evidence from U.S. government agencies, universities, healthcare systems, and financial institutions is used to assess architecture relevance and observability, not to claim organizational effectiveness. The paper contributes a bounded design-science foundation for future inter-rater reliability testing, Delphi expert validation, organizational pilots, psychometric evaluation, and dashboard usability assessment."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_002",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review'?",
      "ground_truth": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation.",
      "ground_truth_doc_ids": [
        "10.70267/aitia.2026482489"
      ],
      "answer": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation.",
      "retrieved_doc_ids": [
        "10.70267/aitia.2026482489",
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.63646/kpqm1958",
        "10.54254/2755-2721/2026.36624"
      ],
      "retrieved_contexts": [
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems.",
        "Title: A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_003",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems'?",
      "ground_truth": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10349437/v1"
      ],
      "answer": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services.",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10349437/v1",
        "10.21203/rs.3.rs-10423755/v1",
        "10.3390/buildings16132637",
        "10.63646/kpqm1958"
      ],
      "retrieved_contexts": [
        "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
        "Title: Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study\nAuthors: Yizhang Huang, Xinhui Zhang\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Abstract Substation civil engineering preliminary design documents must integrate project-specific conditions, current regulatory requirements, typical design practices, and historical engineering experience while maintaining consistency across architectural, structural, general-layout, foundation, road, drainage, and technical-indicator sections. Conventional Retrieval-Augmented Generation (RAG) systems remain vulnerable to condition-insensitive retrieval, unequal source authority, incompatible evidence, unsupported engineering claims, and parameter drift during long-document drafting. This study proposes an Evidence-Constrained Agentic Retrieval-Augmented Generation framework, termed EC-ARAG. The framework combines regulation-aware evidence representation, validity-gated hybrid retrieval, source-role-aware conflict resolution, dual planning--retrieval and generation--verification--repair loops, and global project-state memory. The experimental corpus comprised 36 national and industry standards, 12 enterprise standards, 18 typical-design documents, 64 historical preliminary design documents, and nine project-input documents. The held-out evaluation included 120 retrieval queries, 80 applicability cases, 48 evidence-conflict cases, 318 atomic design propositions, and five independent generation runs. EC-ARAG achieved a Recall@5 of 94.1\\%, an applicability Macro-F1 of 90.6\\%, an evidence support rate of 95.0\\%, section completeness of 96.0\\%, and cross-section parameter consistency of 97.0\\%. Its unsafe-claim rate and character-level manual-edit rate were 3.4\\% and 7.6\\%, respectively. Although agentic verification increased machine inference time, total operational completion time was 21.4\\% lower than that of closed-corpus Corrective RAG. Under the evaluated single-project, text-only conditions, EC-ARAG improved the reliability, traceability, and professional editability of regulation-intensive preliminary design drafting.",
        "Title: An Agentic AI System for Roof Design Compliance Using Computer Vision, Retrieval-Augmented Generation and Large Language Models\nAuthors: Nawari O. Nawari, Oluwatoyin O. Lawal\nPublished: 2026-07-02\nCategories: Computer Science\nSummary: Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure. Roof assemblies and rooftop structures are particularly challenging due to the complexity and fragmentation of regulatory requirements, especially in jurisdictions such as Florida, where compliance must be verified across both the residential and commercial volumes of the Florida Building Code (FBC). The resulting review process is technically demanding and time-intensive, imposing significant cognitive and operational burdens on practitioners and under-resourced public agencies. To address these challenges, this study proposes and evaluates an agentic artificial intelligence (AI) framework for automated code compliance checking of roof assemblies and rooftop structures. The framework employs a multi-agent architecture in which specialized AI agents collaboratively interpret regulatory provisions and evaluate roof design parameters across four core modules: data preprocessing and code ingestion, rule-based and semantic analysis, results visualization, and iterative validation. YOLO11m-seg and Mask R-CNN were used for element detection and segmentation, and the system was developed using 150 design projects, including roof plans, section details, and specifications. Four large language models from two families (Mistral and GPT) were comparatively evaluated on standardized compliance tasks. The framework was then tested on a held-out portfolio of 15 distinct roof-design projects comprising 60 code-compliance decisions derived from the FBC 2023, with performance measured by precision, recall, F1-score, and accuracy. GPT-5.4 achieved the highest overall performance (F1 = 0.97; accuracy = 97%). Because the reasoning and vision components were evaluated separately rather than as an integrated end-to-end pipeline, and the scope was limited to one jurisdiction and two drawing types, broader code coverage and production-setting validation are needed before claims of generality. Nonetheless, the results suggest that agentic AI can meaningfully support compliance review and reduce reviewer burden in roof-design permitting.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_004",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model'?",
      "ground_truth": "Zunlong Hong",
      "ground_truth_doc_ids": [
        "10.54254/2755-2721/2026.36624"
      ],
      "answer": "Zunlong Hong",
      "retrieved_doc_ids": [
        "10.54254/2755-2721/2026.36624",
        "10.63646/kpqm1958",
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.70267/aitia.2026482489"
      ],
      "retrieved_contexts": [
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_005",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Intelligent automation of economic processes based on retrieval-augmented generation and large language models'?",
      "ground_truth": "Serhii Arefiev, Serhii Hildi",
      "ground_truth_doc_ids": [
        "10.36887/2415-8453-2026-3-2"
      ],
      "answer": "Serhii Arefiev, Serhii Hildi",
      "retrieved_doc_ids": [
        "10.36887/2415-8453-2026-3-2",
        "10.63646/kpqm1958",
        "10.54254/2755-2721/2026.36624",
        "10.20944/preprints202608.1849.v1"
      ],
      "retrieved_contexts": [
        "Title: Intelligent automation of economic processes based on retrieval-augmented generation and large language models\nAuthors: Serhii Arefiev, Serhii Hildi\nPublished: 2026-09-04\nCategories: Computer Science\nSummary: The article is devoted to the theoretical and methodological substantiation of the concept of intelligent automation of economic processes based on the integration of Retrieval-Augmented Generation (RAG), Large Language Models (LLM), Prompt Engineering, and Automatic Engineering technologies. The modern digital economy is moving from technical automation to cognitive automation, in which self-learning systems are emerging that can adapt to environmental changes, analyze the results of their own activities, and generate new economic solutions. RAG acts as a cognitive intermediary between generation and data retrieval, ensuring the factual reliability of analytical results. LLMs provide semantic interpretation of information and create conditions for natural-language scenario modeling. Prompt Engineering determines the quality of interaction between humans and the system by transforming users’ analytical intentions into a formalized query structure. Particular attention is paid to Automatic Engineering as a meta-level of cognitive management that ensures automated prompt improvement, reconfiguration of generation parameters, development of decision metamodels, and formation of digital twins of management processes. A multilevel cognitive-engineering model of economic management is proposed, which includes strategic, cognitive-technical, self-learning, and reflexive levels. This architecture forms a closed cognitive cycle of “generation – evaluation – optimization – updating,” which ensures the system’s capacity for reflexive self-learning and evolutionary development. The practical significance of the research lies in creating a methodological basis for implementing agentic AI solutions in strategic planning, risk forecasting, and enhancing the intellectual resilience of economic systems in the digital economy. Keywords: intelligent automation, Retrieval-Augmented Generation (RAG), Large Language Models (LLM), Prompt Engineering, Automatic Engineering, cognitive architecture, digital economy, strategic management, self-learning economy, artificial intelligence.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
        "Title: An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization\nAuthors: Fardin Jalil Piran, Rajiv Malhotra, Farhad Imani\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Selecting an encoding configuration for Hyperdimensional Computing (HDC) determines whether a model fits the memory budget of an Internet of Things (IoT) device, yet the knowledge needed to make that choice is dispersed across thousands of papers in a form no optimizer can query. The configuration space is large and each evaluation is expensive, so exhaustive search is infeasible; sequential optimizers are the standard remedy, but they begin from an uninformed prior and spend early evaluations exploring blindly. We present an agentic Retrieval-Augmented Generation (RAG) recommendation system that converts the HDC literature into an informed starting point for this search. A corpus of 1,518 HDC papers is indexed multimodally. A vision-language model (VLM) describes 1,755 figure regions extracted from source PDFs, making plotted evidence such as accuracy against dimension curves retrievable alongside prose and tables. Given a task profile stating the dataset characteristics, target hardware, objectives, and memory budget, the agent retrieves evidence under an allocation that reserves context for figures, and returns an encoding configuration with supporting citations. That configuration seeds the first trial of a constrained multi-objective search over accuracy and inference memory, which then refines it, and feasibility is enforced by external measurement rather than by the model. On network intrusion detection (CICIDS2017) and bearing fault diagnosis (CWRU), the literature-grounded start raised the hypervolume of the recovered Pareto front by 17.4% and 19.1% over an identically budgeted search from a random draw, at no additional evaluation cost. A natural extension is to let the system perform the data preprocessing that the practitioner now supplies, so that a deployment can be described end to end from raw sensor streams."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_006",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model'?",
      "ground_truth": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "ground_truth_doc_ids": [
        "10.28932/jutisi.v12i2.13099"
      ],
      "answer": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "retrieved_doc_ids": [
        "10.28932/jutisi.v12i2.13099",
        "10.52060/juptik.v4i1.4318",
        "10.63646/kpqm1958",
        "10.3390/knowledge6030022"
      ],
      "retrieved_contexts": [
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: Keterbukaan akses informasi publik diatur dalam Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik sebagai elemen utama untuk mewujudkan transparansi dan tata kelola pemerintahan yang baik. Di Universitas Lampung, Pejabat Pengelola Informasi dan Dokumentasi (PPID) menyediakan berbagai data publik melalui website resminya. Namun, pengguna sering mengalami kesulitan dalam menemukan informasi spesifik akibat tersebarnya dokumenserta keterbatasan fitur pencarian. Untuk mengatasi permasalahan tersebut, dikembangkan chatbot Telegram berbasis kecerdasan buatan menggunakan Large Language Model (LLM) Qwen2.5 VL 72B Instruct yang terintegrasi dengan arsitektur Retrieval Augmented Generation (RAG). Data diambil dari website PPID Universitas Lampung yang selanjutnya disusun menjadi dataset terstruktur sebanyak 375 pasangan pertanyaan–jawaban yang dikurasi dari 47 entri informasi publik. Data tersebut diproses melalui tahap tokenisasi, embedding, serta indexing menggunakan vector database FAISS untuk mendukung pencariansemantik. Evaluasi dilakukan dengan metrik RAGAS (faithfulness, answer relevance, dan context recall) dengan ambang batas minimal 0,8, serta perbandingan performa dengan LLM murni. Hasil pengujian menunjukkan bahwa sistem berhasilmelampaui ambang batas RAGAS dengan rata-rata latensi respons yang sangat rendah yaitu 0,69 detik, serta memiliki akurasi lebih tinggi dibandingkan LLM murni dengan pengurangan signifikan terhadap halusinasi jawaban. Uji kegunaan menggunakan Chatbot Usability Questionnaire (CUQ) menghasilkan skor rata-rata 90,62 yang mengindikasikan pengalaman pengguna yang sangat baik. Penelitian ini menyimpulkan bahwa integrasi LLM dan RAG pada chatbot efektif meningkatkan akurasi, relevansi, dan kemudahan akses informasi publik secara real-time.",
        "Title: Chatbot Hybrid Fatwa MUI Menggunakan Retrieval Augmented Generation dan Large Language Model\nAuthors: Surya Hidayatullah Firdaus, Nazruddin Safaat H, Yelfi Vitriani, Novriyanto\nPublished: 2026-06-01\nCategories: Computer Science\nSummary: Aksesibilitas dokumen digital Fatwa Majelis Ulama Indonesia (MUI) yang terfragmentasi membuat pencarian informasi kurang efektif. Di sisi lain, sistem tanya jawab AI berbasis satu sumber dokumen (single-corpus) rentan menghasilkan jawaban tidak akurat (halusinasi) pada pertanyaan di luar domain. Penelitian ini mengembangkan Chatbot Hybrid Fatwa MUI menggunakan arsitektur Hybrid Retrieval bertingkat dengan dua sumber pengetahuan: dokumen Fatwa MUI sebagai korpus utama dan 12.370 hadis Bukhari-Muslim sebagai mekanisme cadangan (fallback). Sistem ini menerapkan pencarian semantik, verifikasi topik otomatis oleh model bahasa, dan pengalihan ke basis data hadis jika konteks fatwa dinilai tidak relevan. Hasil evaluasi menunjukkan peningkatan kesamaan makna jawaban sebesar 13,23% (dari 0,6664 menjadi 0,7546) dan peningkatan kesetiaan pada rujukan (faithfulness) sebesar 10,57% (dari 85,37% menjadi 94,39%), dengan tingkat penolakan (abstain rate) identik sebesar 26,83%. Pendekatan multi-korpus ini terbukti signifikan meningkatkan relevansi dan keakuratan jawaban dibandingkan RAG standar.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection\nAuthors: Ibtasam Ur Rehman, Muhammad Islam, Muhammad Yousaf Rehman, Basharat Hussain\nPublished: 2026-08-25\nCategories: Computer Science\nSummary: Large Language Models (LLMs) have been rapidly evolving lately, resulting in the need for strong, explainable models to detect the difference between human-generated and machine-generated articles. Existing approaches which are mostly based on fine-tuned transformers suffer from several drawbacks such as rapid obsolescence, paraphrasing attacks, and lack of interpretability. To improve their ability to detect, this paper proposes a novel paradigm called Human vs. LLM Identification (HLI) which introduces a Retrieval-Augmented Generation (RAG)-inspired evidence-based detection strategy alongside a fine-tuned transformer classifier. Our core model, DeBERTa-Sentinel, is built on top of a fine-tuned Microsoft DeBERTa-v3-small model, which uses a disentangled attention mechanism to better capture subtle syntactic and stylistic deviations characteristic of AI-generated text. We evaluate our framework on a balanced dataset of 43,456 text samples, curated from the OpenGPTText corpus and covering AI-generated and human-authored content across diverse domains including news, education, and creative text. The experimental results show improved performance over the selected baselines, with our framework achieving an accuracy of 97.53%, precision of 95.89%, recall of 99.34%, and ROC-AUC of 99.53%. In addition, explainability is integrated into our framework through Local Interpretable Model-agnostic Explanations (LIME) analysis, providing token-level insight into classification decisions. This study establishes a benchmark for scalable, explainable AI text detection, with implications for academic integrity, content moderation, and combating misinformation."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_007",
      "question_type": "date",
      "question": "When was the paper 'Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1"
      ],
      "answer": "2026-08-26",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1",
        "10.21203/rs.3.rs-10349437/v1",
        "10.3390/buildings16132637",
        "10.63646/kpqm1958"
      ],
      "retrieved_contexts": [
        "Title: Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study\nAuthors: Yizhang Huang, Xinhui Zhang\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Abstract Substation civil engineering preliminary design documents must integrate project-specific conditions, current regulatory requirements, typical design practices, and historical engineering experience while maintaining consistency across architectural, structural, general-layout, foundation, road, drainage, and technical-indicator sections. Conventional Retrieval-Augmented Generation (RAG) systems remain vulnerable to condition-insensitive retrieval, unequal source authority, incompatible evidence, unsupported engineering claims, and parameter drift during long-document drafting. This study proposes an Evidence-Constrained Agentic Retrieval-Augmented Generation framework, termed EC-ARAG. The framework combines regulation-aware evidence representation, validity-gated hybrid retrieval, source-role-aware conflict resolution, dual planning--retrieval and generation--verification--repair loops, and global project-state memory. The experimental corpus comprised 36 national and industry standards, 12 enterprise standards, 18 typical-design documents, 64 historical preliminary design documents, and nine project-input documents. The held-out evaluation included 120 retrieval queries, 80 applicability cases, 48 evidence-conflict cases, 318 atomic design propositions, and five independent generation runs. EC-ARAG achieved a Recall@5 of 94.1\\%, an applicability Macro-F1 of 90.6\\%, an evidence support rate of 95.0\\%, section completeness of 96.0\\%, and cross-section parameter consistency of 97.0\\%. Its unsafe-claim rate and character-level manual-edit rate were 3.4\\% and 7.6\\%, respectively. Although agentic verification increased machine inference time, total operational completion time was 21.4\\% lower than that of closed-corpus Corrective RAG. Under the evaluated single-project, text-only conditions, EC-ARAG improved the reliability, traceability, and professional editability of regulation-intensive preliminary design drafting.",
        "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
        "Title: An Agentic AI System for Roof Design Compliance Using Computer Vision, Retrieval-Augmented Generation and Large Language Models\nAuthors: Nawari O. Nawari, Oluwatoyin O. Lawal\nPublished: 2026-07-02\nCategories: Computer Science\nSummary: Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure. Roof assemblies and rooftop structures are particularly challenging due to the complexity and fragmentation of regulatory requirements, especially in jurisdictions such as Florida, where compliance must be verified across both the residential and commercial volumes of the Florida Building Code (FBC). The resulting review process is technically demanding and time-intensive, imposing significant cognitive and operational burdens on practitioners and under-resourced public agencies. To address these challenges, this study proposes and evaluates an agentic artificial intelligence (AI) framework for automated code compliance checking of roof assemblies and rooftop structures. The framework employs a multi-agent architecture in which specialized AI agents collaboratively interpret regulatory provisions and evaluate roof design parameters across four core modules: data preprocessing and code ingestion, rule-based and semantic analysis, results visualization, and iterative validation. YOLO11m-seg and Mask R-CNN were used for element detection and segmentation, and the system was developed using 150 design projects, including roof plans, section details, and specifications. Four large language models from two families (Mistral and GPT) were comparatively evaluated on standardized compliance tasks. The framework was then tested on a held-out portfolio of 15 distinct roof-design projects comprising 60 code-compliance decisions derived from the FBC 2023, with performance measured by precision, recall, F1-score, and accuracy. GPT-5.4 achieved the highest overall performance (F1 = 0.97; accuracy = 97%). Because the reasoning and vision components were evaluated separately rather than as an integrated end-to-end pipeline, and the scope was limited to one jurisdiction and two drawing types, broader code coverage and production-setting validation are needed before claims of generality. Nonetheless, the results suggest that agentic AI can meaningfully support compliance review and reduce reviewer burden in roof-design permitting.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_008",
      "question_type": "date",
      "question": "When was the paper 'An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.20944/preprints202608.1849.v1"
      ],
      "answer": "2026-08-26",
      "retrieved_doc_ids": [
        "10.20944/preprints202608.1849.v1",
        "10.63646/kpqm1958",
        "10.55041/isjem07213",
        "10.54254/2755-2721/2026.36624"
      ],
      "retrieved_contexts": [
        "Title: An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization\nAuthors: Fardin Jalil Piran, Rajiv Malhotra, Farhad Imani\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Selecting an encoding configuration for Hyperdimensional Computing (HDC) determines whether a model fits the memory budget of an Internet of Things (IoT) device, yet the knowledge needed to make that choice is dispersed across thousands of papers in a form no optimizer can query. The configuration space is large and each evaluation is expensive, so exhaustive search is infeasible; sequential optimizers are the standard remedy, but they begin from an uninformed prior and spend early evaluations exploring blindly. We present an agentic Retrieval-Augmented Generation (RAG) recommendation system that converts the HDC literature into an informed starting point for this search. A corpus of 1,518 HDC papers is indexed multimodally. A vision-language model (VLM) describes 1,755 figure regions extracted from source PDFs, making plotted evidence such as accuracy against dimension curves retrievable alongside prose and tables. Given a task profile stating the dataset characteristics, target hardware, objectives, and memory budget, the agent retrieves evidence under an allocation that reserves context for figures, and returns an encoding configuration with supporting citations. That configuration seeds the first trial of a constrained multi-objective search over accuracy and inference memory, which then refines it, and feasibility is enforced by external measurement rather than by the model. On network intrusion detection (CICIDS2017) and bearing fault diagnosis (CWRU), the literature-grounded start raised the hypervolume of the recovered Pareto front by 17.4% and 19.1% over an identically budgeted search from a random draw, at no additional evaluation cost. A natural extension is to let the system perform the data preprocessing that the practitioner now supplies, so that a deployment can be described end to end from raw sensor streams.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Speculative Retrieval-Augmented Generation for Cost-Efficient Large Language Model Inference\nAuthors: Dr. Sumalatha P, Manoj Kumar\nPublished: 2026-05-06\nCategories: Computer Science\nSummary: Abstract - This work focuses on the two crucial bottlenecks in Retrieval-Augmented Generation (RAG): high inference latency and expensive computation cost. RAG enhances the factual correctness of Large Language Models (LLMs) by utilizing external knowledge sources; However, the auto-To achieve a good recall, the system applies a two-way retrieval mechanism: Dense retrieval: This module uses BAAI/bge-small-en-v1.5 to create a 384-dimensional embedding space, where queries and documents are mapped. The embeddings are stored in a FAISS IndexFlatL2. Sparse retrieval: This module uses TF-IDF vectorization to capture an exact keyword match. Reranking: A simple heuristic mechanism of matching substrings of the query terms in the documents selected to perform the final step of ranking them for prompt introduce a novel speculative RAG framework that combines hybrid retrieval with speculative decoding. Our framework employs hybrid dense vector search (BGE-small) and sparse keyword search (TF-IDF) for enhanced recall followed by a lightweight re-ranker model. A compact draft model (TinyLlama-1.1B) makes tentative future token generation, then a larger verifier model (Mistral-7B) checks the correctness of the candidate token. Empirical experiments demonstrate 33% and 29% improvement in inference latency and token reduction, respectively, compared to the baseline of a typical 7B model, while retaining 94% accuracy on factoid tasks. Key Words: Retrieval-Augmented Generation, Speculative Decoding, Large Language Models, Inference Optimization, Hybrid Retrieval",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_009",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.3390/knowledge6030022"
      ],
      "answer": "Computer Science",
      "retrieved_doc_ids": [
        "10.3390/knowledge6030022",
        "10.63646/kpqm1958",
        "10.20944/preprints202604.0339.v1",
        "10.70267/aitia.2026482489"
      ],
      "retrieved_contexts": [
        "Title: Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection\nAuthors: Ibtasam Ur Rehman, Muhammad Islam, Muhammad Yousaf Rehman, Basharat Hussain\nPublished: 2026-08-25\nCategories: Computer Science\nSummary: Large Language Models (LLMs) have been rapidly evolving lately, resulting in the need for strong, explainable models to detect the difference between human-generated and machine-generated articles. Existing approaches which are mostly based on fine-tuned transformers suffer from several drawbacks such as rapid obsolescence, paraphrasing attacks, and lack of interpretability. To improve their ability to detect, this paper proposes a novel paradigm called Human vs. LLM Identification (HLI) which introduces a Retrieval-Augmented Generation (RAG)-inspired evidence-based detection strategy alongside a fine-tuned transformer classifier. Our core model, DeBERTa-Sentinel, is built on top of a fine-tuned Microsoft DeBERTa-v3-small model, which uses a disentangled attention mechanism to better capture subtle syntactic and stylistic deviations characteristic of AI-generated text. We evaluate our framework on a balanced dataset of 43,456 text samples, curated from the OpenGPTText corpus and covering AI-generated and human-authored content across diverse domains including news, education, and creative text. The experimental results show improved performance over the selected baselines, with our framework achieving an accuracy of 97.53%, precision of 95.89%, recall of 99.34%, and ROC-AUC of 99.53%. In addition, explainability is integrated into our framework through Local Interpretable Model-agnostic Explanations (LIME) analysis, providing token-level insight into classification decisions. This study establishes a benchmark for scalable, explainable AI text detection, with implications for academic integrity, content moderation, and combating misinformation.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Retrieval-Augmented Large Language Model Agents for Automated Scientific Literature Review Generation\nAuthors: Ruotong Wang, Nyutian Long, Shunqi Liu, Yuxi Wang, Zhen Qi, Huajun Zhang\nPublished: 2026-04-06\nCategories: Computer Science\nSummary: This study investigates a method that integrates retrieval-augmented mechanisms into large language model agents for scientific literature review generation. The approach addresses the limitations of traditional review models that rely on parametric knowledge with insufficient timeliness and limited coverage. Incorporating external document retrieval and dynamic information fusion into the generation process enhances the accuracy and completeness of the output. The overall framework consists of query encoding, semantic retrieval, document filtering, knowledge fusion, language modeling, task planning, memory storage, and reinforcement optimization, forming a closed loop of retrieval, understanding, and generation. Relevant document fragments are first retrieved through semantic vector search to ensure comprehensive and reliable information sources. These external representations are then integrated with the internal embeddings of the language model through weighted fusion, which preserves fluency while maintaining factual grounding. The task planning module constrains logical flow and text structure, and reinforcement learning optimization further improves relevance and consistency. Comparative experiments on large-scale scientific literature datasets demonstrate that the method outperforms existing approaches on ROUGE, BLEU, METEOR, and diversity metrics, validating its effectiveness and practicality. The findings show that combining retrieval augmentation with agent architectures can significantly improve coverage, accuracy, and language quality in review generation, providing a feasible solution for knowledge organization in complex literature environments.",
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_010",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777"
      ],
      "answer": "Computer Science",
      "retrieved_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.70267/aitia.2026482489",
        "10.54254/2755-2721/2026.36624",
        "10.55041/isjem07213"
      ],
      "retrieved_contexts": [
        "Title: A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems.",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
        "Title: Speculative Retrieval-Augmented Generation for Cost-Efficient Large Language Model Inference\nAuthors: Dr. Sumalatha P, Manoj Kumar\nPublished: 2026-05-06\nCategories: Computer Science\nSummary: Abstract - This work focuses on the two crucial bottlenecks in Retrieval-Augmented Generation (RAG): high inference latency and expensive computation cost. RAG enhances the factual correctness of Large Language Models (LLMs) by utilizing external knowledge sources; However, the auto-To achieve a good recall, the system applies a two-way retrieval mechanism: Dense retrieval: This module uses BAAI/bge-small-en-v1.5 to create a 384-dimensional embedding space, where queries and documents are mapped. The embeddings are stored in a FAISS IndexFlatL2. Sparse retrieval: This module uses TF-IDF vectorization to capture an exact keyword match. Reranking: A simple heuristic mechanism of matching substrings of the query terms in the documents selected to perform the final step of ranking them for prompt introduce a novel speculative RAG framework that combines hybrid retrieval with speculative decoding. Our framework employs hybrid dense vector search (BGE-small) and sparse keyword search (TF-IDF) for enhanced recall followed by a lightweight re-ranker model. A compact draft model (TinyLlama-1.1B) makes tentative future token generation, then a larger verifier model (Mistral-7B) checks the correctness of the candidate token. Empirical experiments demonstrate 33% and 29% improvement in inference latency and token reduction, respectively, compared to the baseline of a typical 7B model, while retaining 94% accuracy on factoid tasks. Key Words: Retrieval-Augmented Generation, Speculative Decoding, Large Language Models, Inference Optimization, Hybrid Retrieval"
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    }
  ],
  "corrupted_answers": [
    {
      "id": "eval_001",
      "question_type": "summary",
      "question": "What is the summary of the paper 'DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation'?",
      "ground_truth": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10489777/v1"
      ],
      "answer": "",
      "retrieved_doc_ids": [
        "10.28932/jutisi.v12i2.13099",
        "10.28932/jutisi.v12i2.13099",
        "10.52060/juptik.v4i1.4318",
        "10.21203/rs.3.rs-10012178/v1"
      ],
      "retrieved_contexts": [
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Chatbot Hybrid Fatwa MUI Menggunakan Retrieval Augmented Generation dan Large Language Model\nAuthors: Surya Hidayatullah Firdaus, Nazruddin Safaat H, Yelfi Vitriani, Novriyanto\nPublished: 2026-06-01\nCategories: Computer Science\nSummary: Aksesibilitas dokumen digital Fatwa Majelis Ulama Indonesia (MUI) yang terfragmentasi membuat pencarian informasi kurang efektif. Di sisi lain, sistem tanya jawab AI berbasis satu sumber dokumen (single-corpus) rentan menghasilkan jawaban tidak akurat (halusinasi) pada pertanyaan di luar domain. Penelitian ini mengembangkan Chatbot Hybrid Fatwa MUI menggunakan arsitektur Hybrid Retrieval bertingkat dengan dua sumber pengetahuan: dokumen Fatwa MUI sebagai korpus utama dan 12.370 hadis Bukhari-Muslim sebagai mekanisme cadangan (fallback). Sistem ini menerapkan pencarian semantik, verifikasi topik otomatis oleh model bahasa, dan pengalihan ke basis data hadis jika konteks fatwa dinilai tidak relevan. Hasil evaluasi menunjukkan peningkatan kesamaan makna jawaban sebesar 13,23% (dari 0,6664 menjadi 0,7546) dan peningkatan kesetiaan pada rujukan (faithfulness) sebesar 10,57% (dari 85,37% menjadi 94,39%), dengan tingkat penolakan (abstain rate) identik sebesar 26,83%. Pendekatan multi-korpus ini terbukti signifikan meningkatkan relevansi dan keakuratan jawaban dibandingkan RAG standar.",
        "Title: Retrieval-Augmented Generation (RAG), Generative AI, and Agentic AI Governance: An Integrated Enterprise Governance Prioritization Architecture\nAuthors: Audrey Rah, Sven Hahues\nPublished: 2026-06-15\nCategories: Computer Science\nSummary: Abstract Enterprise adoption of artificial intelligence (AI) systems, including Generative AI (GenAI), Retrieval-Augmented Generation (RAG), and agentic AI, is advancing faster than many organizations can adapt their governance, audit, cybersecurity, and executive oversight practices. This paper develops a proposed integrated AI governance prioritization architecture using a design-science research approach, supported by exploratory platform-risk analysis, a reproducible platform-risk dataset, a Monte Carlo robustness assessment, a framework coverage matrix, a Governance Priority Score (GPS)-based demonstration, and a public-document relevance assessment. The primary contribution is an integrated governance decision-support architecture that uses the Enterprise AI Platform Taxonomy (EAPT) to estimate platform burden, the Enterprise AI Risk Taxonomy (EART) to organize governance-risk exposure, the Enterprise AI Governance Maturity Model (EAGM) to represent organizational readiness, and the Integrated Agentic AI Governance Framework (IAGF) to identify agentic AI oversight requirements within a unified workflow. These components are operationally connected through GPS, which links platform burden, governancerisk gaps, organizational readiness, agentic runtime-control needs, and executive decision support. The proposed architecture draws upon NIST AI RMF, NIST AI 600-1, ISO/IEC 42001, COBIT, OWASP LLM Top 10, MITRE ATLAS, the EU AI Act, and related AI governance literature. A rubric-based analytical dataset covering 19 enterprise AI platforms evaluates each platform across eight subdimensions, with final platform-risk scores computed as the arithmetic mean of data access scope, operational autonomy, tool/API integration breadth, external connectivity, governance burden, cybersecurity exposure, adoption and shadow-AI risk, and supply-chain integrity. TThe expanded scoring method produces high rank stability relative to the original final-score dataset, with Spearman’s ρ = 0.996, and remains directionally stable under coding-uncertainty stress testing; these results are interpreted only as internal coding stability and robustness, not external validation. Public evidence from U.S. government agencies, universities, healthcare systems, and financial institutions is used to assess architecture relevance and observability, not to claim organizational effectiveness. The paper contributes a bounded design-science foundation for future inter-rater reliability testing, Delphi expert validation, organizational pilots, psychometric evaluation, and dashboard usability assessment."
      ],
      "retrieval_hit": false,
      "token_f1": 0.0,
      "judge": {
        "score": 1,
        "correct": false,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_002",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review'?",
      "ground_truth": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation.",
      "ground_truth_doc_ids": [
        "10.70267/aitia.2026482489"
      ],
      "answer": "The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases.",
      "retrieved_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.28932/jutisi.v12i2.13099",
        "10.28932/jutisi.v12i2.13099",
        "10.63646/kpqm1958"
      ],
      "retrieved_contexts": [
        "Title: A Fram\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field."
      ],
      "retrieval_hit": false,
      "token_f1": 0.28571428571428564,
      "judge": {
        "score": 1,
        "correct": false,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_003",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems'?",
      "ground_truth": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10349437/v1"
      ],
      "answer": "Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure.",
      "retrieved_doc_ids": [
        "10.3390/buildings16132637",
        "10.21203/rs.3.rs-10423755/v1",
        "10.63646/kpqm1958",
        "10.21203/rs.3.rs-10012178/v1"
      ],
      "retrieved_contexts": [
        "Title: An Agentic AI System for Roof Design Compliance Using Computer Vision, Retrieval-Augmented Generation and Large Language Models\nAuthors: Nawari O. Nawari, Oluwatoyin O. Lawal\nPublished: 2025-07-02\nCategories: Computer Science\nSummary: Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure. Roof assemblies and rooftop structures are particularly challenging due to the complexity and fragmentation of regulatory requirements, especially in jurisdictions such as Florida, where compliance must be verified across both the residential and commercial volumes of the Florida Building Code (FBC). The resulting review process is technically demanding and time-intensive, imposing significant cognitive and operational burdens on practitioners and under-resourced public agencies. To address these challenges, this study proposes and evaluates an agentic artificial intelligence (AI) framework for automated code compliance checking of roof assemblies and rooftop structures. The framework employs a multi-agent architecture in which specialized AI agents collaboratively interpret regulatory provisions and evaluate roof design parameters across four core modules: data preprocessing and code ingestion, rule-based and semantic analysis, results visualization, and iterative validation. YOLO11m-seg and Mask R-CNN were used for element detection and segmentation, and the system was developed using 150 design projects, including roof plans, section details, and specifications. Four large language models from two families (Mistral and GPT) were comparatively evaluated on standardized compliance tasks. The framework was then tested on a held-out portfolio of 15 distinct roof-design projects comprising 60 code-compliance decisions derived from the FBC 2023, with performance measured by precision, recall, F1-score, and accuracy. GPT-5.4 achieved the highest overall performance (F1 = 0.97; accuracy = 97%). Because the reasoning and vision components were evaluated separately rather than as an integrated end-to-end pipeline, and the scope was limited to one jurisdiction and two drawing types, broader code coverage and production-setting validation are needed before claims of generality. Nonetheless, the results suggest that agentic AI can meaningfully support compliance review and reduce reviewer burden in roof-design permitting.",
        "Title: Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study\nAuthors: Yizhang Huang, Xinhui Zhang\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD Abstract Substation civil engineering preliminary design documents must integrate project-specific conditions, current regulatory requirements, typical design practices, and historical engineering experience while maintaining consistency across architectural, structural, general-layout, foundation, road, drainage, and technical-indicator sections. Conventional Retrieval-Augmented Generation (RAG) systems remain vulnerable to condition-insensitive retrieval, unequal source authority, incompatible evidence, unsupported engineering claims, and parameter drift during long-document drafting. This study proposes an Evidence-Constrained Agentic Retrieval-Augmented Generation framework, termed EC-ARAG. The framework combines regulation-aware evidence representation, validity-gated hybrid retrieval, source-role-aware conflict resolution, dual planning--retrieval and generation--verification--repair loops, and global project-state memory. The experimental corpus comprised 36 national and industry standards, 12 enterprise standards, 18 typical-design documents, 64 historical preliminary design documents, and nine project-input documents. The held-out evaluation included 120 retrieval queries, 80 applicability cases, 48 evidence-conflict cases, 318 atomic design propositions, and five independent generation runs. EC-ARAG achieved a Recall@5 of 94.1\\%, an applicability Macro-F1 of 90.6\\%, an evidence support rate of 95.0\\%, section completeness of 96.0\\%, and cross-section parameter consistency of 97.0\\%. Its unsafe-claim rate and character-level manual-edit rate were 3.4\\% and 7.6\\%, respectively. Although agentic verification increased machine inference time, total operational completion time was 21.4\\% lower than that of closed-corpus Corrective RAG. Under the evaluated single-project, text-only conditions, EC-ARAG improved the reliability, traceability, and professional editability of regulation-intensive preliminary design drafting.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Retrieval-Augmented Generation (RAG), Generative AI, and Agentic AI Governance: An Integrated Enterprise Governance Prioritization Architecture\nAuthors: Audrey Rah, Sven Hahues\nPublished: 2026-06-15\nCategories: Computer Science\nSummary: Abstract Enterprise adoption of artificial intelligence (AI) systems, including Generative AI (GenAI), Retrieval-Augmented Generation (RAG), and agentic AI, is advancing faster than many organizations can adapt their governance, audit, cybersecurity, and executive oversight practices. This paper develops a proposed integrated AI governance prioritization architecture using a design-science research approach, supported by exploratory platform-risk analysis, a reproducible platform-risk dataset, a Monte Carlo robustness assessment, a framework coverage matrix, a Governance Priority Score (GPS)-based demonstration, and a public-document relevance assessment. The primary contribution is an integrated governance decision-support architecture that uses the Enterprise AI Platform Taxonomy (EAPT) to estimate platform burden, the Enterprise AI Risk Taxonomy (EART) to organize governance-risk exposure, the Enterprise AI Governance Maturity Model (EAGM) to represent organizational readiness, and the Integrated Agentic AI Governance Framework (IAGF) to identify agentic AI oversight requirements within a unified workflow. These components are operationally connected through GPS, which links platform burden, governancerisk gaps, organizational readiness, agentic runtime-control needs, and executive decision support. The proposed architecture draws upon NIST AI RMF, NIST AI 600-1, ISO/IEC 42001, COBIT, OWASP LLM Top 10, MITRE ATLAS, the EU AI Act, and related AI governance literature. A rubric-based analytical dataset covering 19 enterprise AI platforms evaluates each platform across eight subdimensions, with final platform-risk scores computed as the arithmetic mean of data access scope, operational autonomy, tool/API integration breadth, external connectivity, governance burden, cybersecurity exposure, adoption and shadow-AI risk, and supply-chain integrity. TThe expanded scoring method produces high rank stability relative to the original final-score dataset, with Spearman’s ρ = 0.996, and remains directionally stable under coding-uncertainty stress testing; these results are interpreted only as internal coding stability and robustness, not external validation. Public evidence from U.S. government agencies, universities, healthcare systems, and financial institutions is used to assess architecture relevance and observability, not to claim organizational effectiveness. The paper contributes a bounded design-science foundation for future inter-rater reliability testing, Delphi expert validation, organizational pilots, psychometric evaluation, and dashboard usability assessment."
      ],
      "retrieval_hit": false,
      "token_f1": 0.1702127659574468,
      "judge": {
        "score": 1,
        "correct": false,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_004",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model'?",
      "ground_truth": "Zunlong Hong",
      "ground_truth_doc_ids": [
        "10.54254/2755-2721/2026.36624"
      ],
      "answer": "Ben J. Weber, Clara M. Hofmann, Amara N. Okoye",
      "retrieved_doc_ids": [
        "10.63646/kpqm1958",
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.55041/isjem07213",
        "10.20944/preprints202604.0339.v1"
      ],
      "retrieved_contexts": [
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: A Fram\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Speculative Retrieval-Augmented Generation for Cost-Efficient Large Language Model Inference\nAuthors: Dr. Sumalatha P, Manoj Kumar\nPublished: 2026-05-06\nCategories: Computer Science\nSummary: Abstract - This work focuses on the two crucial bottlenecks in Retrieval-Augmented Generation (RAG): high inference latency and expensive computation cost. RAG enhances the factual correctness of Large Language Models (LLMs) by utilizing external knowledge sources; However, the auto-To achieve a good recall, the system applies a two-way retrieval mechanism: Dense retrieval: This module uses BAAI/bge-small-en-v1.5 to create a 384-dimensional embedding space, where queries and documents are mapped. The embeddings are stored in a FAISS IndexFlatL2. Sparse retrieval: This module uses TF-IDF vectorization to capture an exact keyword match. Reranking: A simple heuristic mechanism of matching substrings of the query terms in the documents selected to perform the final step of ranking them for prompt introduce a novel speculative RAG framework that combines hybrid retrieval with speculative decoding. Our framework employs hybrid dense vector search (BGE-small) and sparse keyword search (TF-IDF) for enhanced recall followed by a lightweight re-ranker model. A compact draft model (TinyLlama-1.1B) makes tentative future token generation, then a larger verifier model (Mistral-7B) checks the correctness of the candidate token. Empirical experiments demonstrate 33% and 29% improvement in inference latency and token reduction, respectively, compared to the baseline of a typical 7B model, while retaining 94% accuracy on factoid tasks. Key Words: Retrieval-Augmented Generation, Speculative Decoding, Large Language Models, Inference Optimization, Hybrid Retrieval",
        "Title: Retrieval-Augmented Large Language Model Agents for Automated Scientific Literature Review Generation\nAuthors: Ruotong Wang, Nyutian Long, Shunqi Liu, Yuxi Wang, Zhen Qi, Huajun Zhang\nPublished: 2026-04-06\nCategories: Computer Science\nSummary: This study investigates a method that integrates retrieval-augmented mechanisms into large language model agents for scientific literature review generation. The approach addresses the limitations of traditional review models that rely on parametric knowledge with insufficient timeliness and limited coverage. Incorporating external document retrieval and dynamic information fusion into the generation process enhances the accuracy and completeness of the output. The overall framework consists of query encoding, semantic retrieval, document filtering, knowledge fusion, language modeling, task planning, memory storage, and reinforcement optimization, forming a closed loop of retrieval, understanding, and generation. Relevant document fragments are first retrieved through semantic vector search to ensure comprehensive and reliable information sources. These external representations are then integrated with the internal embeddings of the language model through weighted fusion, which preserves fluency while maintaining factual grounding. The task planning module constrains logical flow and text structure, and reinforcement learning optimization further improves relevance and consistency. Comparative experiments on large-scale scientific literature datasets demonstrate that the method outperforms existing approaches on ROUGE, BLEU, METEOR, and diversity metrics, validating its effectiveness and practicality. The findings show that combining retrieval augmentation with agent architectures can significantly improve coverage, accuracy, and language quality in review generation, providing a feasible solution for knowledge organization in complex literature environments."
      ],
      "retrieval_hit": false,
      "token_f1": 0.0,
      "judge": {
        "score": 1,
        "correct": false,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_005",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Intelligent automation of economic processes based on retrieval-augmented generation and large language models'?",
      "ground_truth": "Serhii Arefiev, Serhii Hildi",
      "ground_truth_doc_ids": [
        "10.36887/2415-8453-2026-3-2"
      ],
      "answer": "Serhii Arefiev, Serhii Hildi",
      "retrieved_doc_ids": [
        "10.36887/2415-8453-2026-3-2",
        "10.63646/kpqm1958",
        "10.28932/jutisi.v12i2.13099"
      ],
      "retrieved_contexts": [
        "Title: Intelligent automation of economic processes based on retrieval-augmented generation and large language models\nAuthors: Serhii Arefiev, Serhii Hildi\nPublished: 2026-09-04\nCategories: Computer Science\nSummary: ",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: "
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_006",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model'?",
      "ground_truth": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "ground_truth_doc_ids": [
        "10.28932/jutisi.v12i2.13099"
      ],
      "answer": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "retrieved_doc_ids": [
        "10.28932/jutisi.v12i2.13099",
        "10.52060/juptik.v4i1.4318",
        "10.63646/kpqm1958"
      ],
      "retrieved_contexts": [
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Chatbot Hybrid Fatwa MUI Menggunakan Retrieval Augmented Generation dan Large Language Model\nAuthors: Surya Hidayatullah Firdaus, Nazruddin Safaat H, Yelfi Vitriani, Novriyanto\nPublished: 2026-06-01\nCategories: Computer Science\nSummary: Aksesibilitas dokumen digital Fatwa Majelis Ulama Indonesia (MUI) yang terfragmentasi membuat pencarian informasi kurang efektif. Di sisi lain, sistem tanya jawab AI berbasis satu sumber dokumen (single-corpus) rentan menghasilkan jawaban tidak akurat (halusinasi) pada pertanyaan di luar domain. Penelitian ini mengembangkan Chatbot Hybrid Fatwa MUI menggunakan arsitektur Hybrid Retrieval bertingkat dengan dua sumber pengetahuan: dokumen Fatwa MUI sebagai korpus utama dan 12.370 hadis Bukhari-Muslim sebagai mekanisme cadangan (fallback). Sistem ini menerapkan pencarian semantik, verifikasi topik otomatis oleh model bahasa, dan pengalihan ke basis data hadis jika konteks fatwa dinilai tidak relevan. Hasil evaluasi menunjukkan peningkatan kesamaan makna jawaban sebesar 13,23% (dari 0,6664 menjadi 0,7546) dan peningkatan kesetiaan pada rujukan (faithfulness) sebesar 10,57% (dari 85,37% menjadi 94,39%), dengan tingkat penolakan (abstain rate) identik sebesar 26,83%. Pendekatan multi-korpus ini terbukti signifikan meningkatkan relevansi dan keakuratan jawaban dibandingkan RAG standar.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_007",
      "question_type": "date",
      "question": "When was the paper 'Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1"
      ],
      "answer": "2026-08-26",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1",
        "10.3390/buildings16132637",
        "10.63646/kpqm1958",
        "10.36887/2415-8453-2026-3-2"
      ],
      "retrieved_contexts": [
        "Title: Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study\nAuthors: Yizhang Huang, Xinhui Zhang\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD Abstract Substation civil engineering preliminary design documents must integrate project-specific conditions, current regulatory requirements, typical design practices, and historical engineering experience while maintaining consistency across architectural, structural, general-layout, foundation, road, drainage, and technical-indicator sections. Conventional Retrieval-Augmented Generation (RAG) systems remain vulnerable to condition-insensitive retrieval, unequal source authority, incompatible evidence, unsupported engineering claims, and parameter drift during long-document drafting. This study proposes an Evidence-Constrained Agentic Retrieval-Augmented Generation framework, termed EC-ARAG. The framework combines regulation-aware evidence representation, validity-gated hybrid retrieval, source-role-aware conflict resolution, dual planning--retrieval and generation--verification--repair loops, and global project-state memory. The experimental corpus comprised 36 national and industry standards, 12 enterprise standards, 18 typical-design documents, 64 historical preliminary design documents, and nine project-input documents. The held-out evaluation included 120 retrieval queries, 80 applicability cases, 48 evidence-conflict cases, 318 atomic design propositions, and five independent generation runs. EC-ARAG achieved a Recall@5 of 94.1\\%, an applicability Macro-F1 of 90.6\\%, an evidence support rate of 95.0\\%, section completeness of 96.0\\%, and cross-section parameter consistency of 97.0\\%. Its unsafe-claim rate and character-level manual-edit rate were 3.4\\% and 7.6\\%, respectively. Although agentic verification increased machine inference time, total operational completion time was 21.4\\% lower than that of closed-corpus Corrective RAG. Under the evaluated single-project, text-only conditions, EC-ARAG improved the reliability, traceability, and professional editability of regulation-intensive preliminary design drafting.",
        "Title: An Agentic AI System for Roof Design Compliance Using Computer Vision, Retrieval-Augmented Generation and Large Language Models\nAuthors: Nawari O. Nawari, Oluwatoyin O. Lawal\nPublished: 2025-07-02\nCategories: Computer Science\nSummary: Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure. Roof assemblies and rooftop structures are particularly challenging due to the complexity and fragmentation of regulatory requirements, especially in jurisdictions such as Florida, where compliance must be verified across both the residential and commercial volumes of the Florida Building Code (FBC). The resulting review process is technically demanding and time-intensive, imposing significant cognitive and operational burdens on practitioners and under-resourced public agencies. To address these challenges, this study proposes and evaluates an agentic artificial intelligence (AI) framework for automated code compliance checking of roof assemblies and rooftop structures. The framework employs a multi-agent architecture in which specialized AI agents collaboratively interpret regulatory provisions and evaluate roof design parameters across four core modules: data preprocessing and code ingestion, rule-based and semantic analysis, results visualization, and iterative validation. YOLO11m-seg and Mask R-CNN were used for element detection and segmentation, and the system was developed using 150 design projects, including roof plans, section details, and specifications. Four large language models from two families (Mistral and GPT) were comparatively evaluated on standardized compliance tasks. The framework was then tested on a held-out portfolio of 15 distinct roof-design projects comprising 60 code-compliance decisions derived from the FBC 2023, with performance measured by precision, recall, F1-score, and accuracy. GPT-5.4 achieved the highest overall performance (F1 = 0.97; accuracy = 97%). Because the reasoning and vision components were evaluated separately rather than as an integrated end-to-end pipeline, and the scope was limited to one jurisdiction and two drawing types, broader code coverage and production-setting validation are needed before claims of generality. Nonetheless, the results suggest that agentic AI can meaningfully support compliance review and reduce reviewer burden in roof-design permitting.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Intelligent automation of economic processes based on retrieval-augmented generation and large language models\nAuthors: Serhii Arefiev, Serhii Hildi\nPublished: 2026-09-04\nCategories: Computer Science\nSummary: "
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_008",
      "question_type": "date",
      "question": "When was the paper 'An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.20944/preprints202608.1849.v1"
      ],
      "answer": "2026-08-26",
      "retrieved_doc_ids": [
        "10.20944/preprints202608.1849.v1",
        "10.63646/kpqm1958",
        "10.28932/jutisi.v12i2.13099",
        "10.28932/jutisi.v12i2.13099"
      ],
      "retrieved_contexts": [
        "Title: An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization\nAuthors: Fardin Jalil Piran, Rajiv Malhotra, Farhad Imani\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD ###CORRUPTED_NOISE_TOKEN### @#$$%^&* INVALID_PAYLOAD Selecting an encoding configuration for Hyperdimensional Computing (HDC) determines whether a model fits the memory budget of an Internet of Things (IoT) device, yet the knowledge needed to make that choice is dispersed across thousands of papers in a form no optimizer can query. The configuration space is large and each evaluation is expensive, so exhaustive search is infeasible; sequential optimizers are the standard remedy, but they begin from an uninformed prior and spend early evaluations exploring blindly. We present an agentic Retrieval-Augmented Generation (RAG) recommendation system that converts the HDC literature into an informed starting point for this search. A corpus of 1,518 HDC papers is indexed multimodally. A vision-language model (VLM) describes 1,755 figure regions extracted from source PDFs, making plotted evidence such as accuracy against dimension curves retrievable alongside prose and tables. Given a task profile stating the dataset characteristics, target hardware, objectives, and memory budget, the agent retrieves evidence under an allocation that reserves context for figures, and returns an encoding configuration with supporting citations. That configuration seeds the first trial of a constrained multi-objective search over accuracy and inference memory, which then refines it, and feasibility is enforced by external measurement rather than by the model. On network intrusion detection (CICIDS2017) and bearing fault diagnosis (CWRU), the literature-grounded start raised the hypervolume of the recovered Pareto front by 17.4% and 19.1% over an identically budgeted search from a random draw, at no additional evaluation cost. A natural extension is to let the system perform the data preprocessing that the practitioner now supplies, so that a deployment can be described end to end from raw sensor streams.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: "
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_009",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.3390/knowledge6030022"
      ],
      "answer": "Computer Science",
      "retrieved_doc_ids": [
        "10.63646/kpqm1958",
        "10.28932/jutisi.v12i2.13099",
        "10.28932/jutisi.v12i2.13099",
        "10.3390/knowledge6030022"
      ],
      "retrieved_contexts": [
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2025-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Integr\nAuthors: Ibtasam Ur Rehman, Muhammad Islam, Muhammad Yousaf Rehman, Basharat Hussain\nPublished: 2026-08-25\nCategories: Computer Science\nSummary: Large Language Models (LLMs) have been rapidly evolving lately, resulting in the need for strong, explainable models to detect the difference between human-generated and machine-generated articles. Existing approaches which are mostly based on fine-tuned transformers suffer from several drawbacks such as rapid obsolescence, paraphrasing attacks, and lack of interpretability. To improve their ability to detect, this paper proposes a novel paradigm called Human vs. LLM Identification (HLI) which introduces a Retrieval-Augmented Generation (RAG)-inspired evidence-based detection strategy alongside a fine-tuned transformer classifier. Our core model, DeBERTa-Sentinel, is built on top of a fine-tuned Microsoft DeBERTa-v3-small model, which uses a disentangled attention mechanism to better capture subtle syntactic and stylistic deviations characteristic of AI-generated text. We evaluate our framework on a balanced dataset of 43,456 text samples, curated from the OpenGPTText corpus and covering AI-generated and human-authored content across diverse domains including news, education, and creative text. The experimental results show improved performance over the selected baselines, with our framework achieving an accuracy of 97.53%, precision of 95.89%, recall of 99.34%, and ROC-AUC of 99.53%. In addition, explainability is integrated into our framework through Local Interpretable Model-agnostic Explanations (LIME) analysis, providing token-level insight into classification decisions. This study establishes a benchmark for scalable, explainable AI text detection, with implications for academic integrity, content moderation, and combating misinformation."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_010",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777"
      ],
      "answer": "Computer Science",
      "retrieved_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.55041/isjem07213",
        "10.28932/jutisi.v12i2.13099",
        "10.28932/jutisi.v12i2.13099"
      ],
      "retrieved_contexts": [
        "Title: A Fram\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Speculative Retrieval-Augmented Generation for Cost-Efficient Large Language Model Inference\nAuthors: Dr. Sumalatha P, Manoj Kumar\nPublished: 2026-05-06\nCategories: Computer Science\nSummary: Abstract - This work focuses on the two crucial bottlenecks in Retrieval-Augmented Generation (RAG): high inference latency and expensive computation cost. RAG enhances the factual correctness of Large Language Models (LLMs) by utilizing external knowledge sources; However, the auto-To achieve a good recall, the system applies a two-way retrieval mechanism: Dense retrieval: This module uses BAAI/bge-small-en-v1.5 to create a 384-dimensional embedding space, where queries and documents are mapped. The embeddings are stored in a FAISS IndexFlatL2. Sparse retrieval: This module uses TF-IDF vectorization to capture an exact keyword match. Reranking: A simple heuristic mechanism of matching substrings of the query terms in the documents selected to perform the final step of ranking them for prompt introduce a novel speculative RAG framework that combines hybrid retrieval with speculative decoding. Our framework employs hybrid dense vector search (BGE-small) and sparse keyword search (TF-IDF) for enhanced recall followed by a lightweight re-ranker model. A compact draft model (TinyLlama-1.1B) makes tentative future token generation, then a larger verifier model (Mistral-7B) checks the correctness of the candidate token. Empirical experiments demonstrate 33% and 29% improvement in inference latency and token reduction, respectively, compared to the baseline of a typical 7B model, while retaining 94% accuracy on factoid tasks. Key Words: Retrieval-Augmented Generation, Speculative Decoding, Large Language Models, Inference Optimization, Hybrid Retrieval",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: ",
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: "
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    }
  ],
  "repaired_answers": [
    {
      "id": "eval_001",
      "question_type": "summary",
      "question": "What is the summary of the paper 'DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation'?",
      "ground_truth": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10489777/v1"
      ],
      "answer": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination.",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10489777/v1",
        "10.21203/rs.3.rs-10349437/v1",
        "10.52060/juptik.v4i1.4318",
        "10.21203/rs.3.rs-10012178/v1"
      ],
      "retrieved_contexts": [
        "Title: DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation\nAuthors: Divya K\nPublished: 2026-09-15\nCategories: Computer Science\nSummary: Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination. Existing approaches to forensic readiness are, however, infrastructure-based and inadequately support the completeness of evidence, the identification of evidence gaps, and preparation of a structured investigation at the case level. This study introduces a privacy-preserving framework for assessing digital investigation readiness called DOLPHIN, which integrates offline large language models with retrieval-augmented generation to provide evidence-based investigation support. Thirty sets of 30 cases of structured investigation scenarios were created under five evidence-completeness conditions: complete-evidence, partial-evidence, and low-evidence cases. A Forensic Readiness Index was scored for each case across six categories of evidence: victim statement, FIR/CSR, CCTV evidence, witness statement, ownership documents, and metadata. The deficiencies were categorized using a taxonomy of evidence gaps. Evidence gaps were classified into four categories: documentation gaps, corroboration gaps, visual gaps, and time gaps. To ensure that critical investigation data is not processed in the cloud, the framework was deployed locally with the help of LM Studio, AnythingLLM, and Qwen 3. The experimental results indicated that DOLPHIN obtained a readiness classification accuracy of 92.0% and excellent evidence-gap detection performance with F1 scores ranging from 90.27% to 94.60%. The retrieval performance with metadata-filtered RAG was found to be superior, with 90.33% top-1 accuracy, 99.67% top-3 accuracy, and 94.06% mean reciprocal rank. The unsupported output rate went down from 16.33% to 2.00% when using metadata-filtered RAG. DOLPHIN also significantly reduced the mean preparation time, from 15.46 to 4.41 minutes per case, and increased the completion rate for reports. The results show the potential of offline LLM-RAG systems to aid in investigation-readiness assessment in a human-centered and interpretable way while preserving privacy.",
        "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
        "Title: Chatbot Hybrid Fatwa MUI Menggunakan Retrieval Augmented Generation dan Large Language Model\nAuthors: Surya Hidayatullah Firdaus, Nazruddin Safaat H, Yelfi Vitriani, Novriyanto\nPublished: 2026-06-01\nCategories: Computer Science\nSummary: Aksesibilitas dokumen digital Fatwa Majelis Ulama Indonesia (MUI) yang terfragmentasi membuat pencarian informasi kurang efektif. Di sisi lain, sistem tanya jawab AI berbasis satu sumber dokumen (single-corpus) rentan menghasilkan jawaban tidak akurat (halusinasi) pada pertanyaan di luar domain. Penelitian ini mengembangkan Chatbot Hybrid Fatwa MUI menggunakan arsitektur Hybrid Retrieval bertingkat dengan dua sumber pengetahuan: dokumen Fatwa MUI sebagai korpus utama dan 12.370 hadis Bukhari-Muslim sebagai mekanisme cadangan (fallback). Sistem ini menerapkan pencarian semantik, verifikasi topik otomatis oleh model bahasa, dan pengalihan ke basis data hadis jika konteks fatwa dinilai tidak relevan. Hasil evaluasi menunjukkan peningkatan kesamaan makna jawaban sebesar 13,23% (dari 0,6664 menjadi 0,7546) dan peningkatan kesetiaan pada rujukan (faithfulness) sebesar 10,57% (dari 85,37% menjadi 94,39%), dengan tingkat penolakan (abstain rate) identik sebesar 26,83%. Pendekatan multi-korpus ini terbukti signifikan meningkatkan relevansi dan keakuratan jawaban dibandingkan RAG standar.",
        "Title: Retrieval-Augmented Generation (RAG), Generative AI, and Agentic AI Governance: An Integrated Enterprise Governance Prioritization Architecture\nAuthors: Audrey Rah, Sven Hahues\nPublished: 2026-06-15\nCategories: Computer Science\nSummary: Abstract Enterprise adoption of artificial intelligence (AI) systems, including Generative AI (GenAI), Retrieval-Augmented Generation (RAG), and agentic AI, is advancing faster than many organizations can adapt their governance, audit, cybersecurity, and executive oversight practices. This paper develops a proposed integrated AI governance prioritization architecture using a design-science research approach, supported by exploratory platform-risk analysis, a reproducible platform-risk dataset, a Monte Carlo robustness assessment, a framework coverage matrix, a Governance Priority Score (GPS)-based demonstration, and a public-document relevance assessment. The primary contribution is an integrated governance decision-support architecture that uses the Enterprise AI Platform Taxonomy (EAPT) to estimate platform burden, the Enterprise AI Risk Taxonomy (EART) to organize governance-risk exposure, the Enterprise AI Governance Maturity Model (EAGM) to represent organizational readiness, and the Integrated Agentic AI Governance Framework (IAGF) to identify agentic AI oversight requirements within a unified workflow. These components are operationally connected through GPS, which links platform burden, governancerisk gaps, organizational readiness, agentic runtime-control needs, and executive decision support. The proposed architecture draws upon NIST AI RMF, NIST AI 600-1, ISO/IEC 42001, COBIT, OWASP LLM Top 10, MITRE ATLAS, the EU AI Act, and related AI governance literature. A rubric-based analytical dataset covering 19 enterprise AI platforms evaluates each platform across eight subdimensions, with final platform-risk scores computed as the arithmetic mean of data access scope, operational autonomy, tool/API integration breadth, external connectivity, governance burden, cybersecurity exposure, adoption and shadow-AI risk, and supply-chain integrity. TThe expanded scoring method produces high rank stability relative to the original final-score dataset, with Spearman’s ρ = 0.996, and remains directionally stable under coding-uncertainty stress testing; these results are interpreted only as internal coding stability and robustness, not external validation. Public evidence from U.S. government agencies, universities, healthcare systems, and financial institutions is used to assess architecture relevance and observability, not to claim organizational effectiveness. The paper contributes a bounded design-science foundation for future inter-rater reliability testing, Delphi expert validation, organizational pilots, psychometric evaluation, and dashboard usability assessment."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_002",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review'?",
      "ground_truth": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation.",
      "ground_truth_doc_ids": [
        "10.70267/aitia.2026482489"
      ],
      "answer": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation.",
      "retrieved_doc_ids": [
        "10.70267/aitia.2026482489",
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.63646/kpqm1958",
        "10.54254/2755-2721/2026.36624"
      ],
      "retrieved_contexts": [
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems.",
        "Title: A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_003",
      "question_type": "summary",
      "question": "What is the summary of the paper 'Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems'?",
      "ground_truth": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services.",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10349437/v1"
      ],
      "answer": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services.",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10349437/v1",
        "10.21203/rs.3.rs-10423755/v1",
        "10.3390/buildings16132637",
        "10.63646/kpqm1958"
      ],
      "retrieved_contexts": [
        "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
        "Title: Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study\nAuthors: Yizhang Huang, Xinhui Zhang\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Abstract Substation civil engineering preliminary design documents must integrate project-specific conditions, current regulatory requirements, typical design practices, and historical engineering experience while maintaining consistency across architectural, structural, general-layout, foundation, road, drainage, and technical-indicator sections. Conventional Retrieval-Augmented Generation (RAG) systems remain vulnerable to condition-insensitive retrieval, unequal source authority, incompatible evidence, unsupported engineering claims, and parameter drift during long-document drafting. This study proposes an Evidence-Constrained Agentic Retrieval-Augmented Generation framework, termed EC-ARAG. The framework combines regulation-aware evidence representation, validity-gated hybrid retrieval, source-role-aware conflict resolution, dual planning--retrieval and generation--verification--repair loops, and global project-state memory. The experimental corpus comprised 36 national and industry standards, 12 enterprise standards, 18 typical-design documents, 64 historical preliminary design documents, and nine project-input documents. The held-out evaluation included 120 retrieval queries, 80 applicability cases, 48 evidence-conflict cases, 318 atomic design propositions, and five independent generation runs. EC-ARAG achieved a Recall@5 of 94.1\\%, an applicability Macro-F1 of 90.6\\%, an evidence support rate of 95.0\\%, section completeness of 96.0\\%, and cross-section parameter consistency of 97.0\\%. Its unsafe-claim rate and character-level manual-edit rate were 3.4\\% and 7.6\\%, respectively. Although agentic verification increased machine inference time, total operational completion time was 21.4\\% lower than that of closed-corpus Corrective RAG. Under the evaluated single-project, text-only conditions, EC-ARAG improved the reliability, traceability, and professional editability of regulation-intensive preliminary design drafting.",
        "Title: An Agentic AI System for Roof Design Compliance Using Computer Vision, Retrieval-Augmented Generation and Large Language Models\nAuthors: Nawari O. Nawari, Oluwatoyin O. Lawal\nPublished: 2026-07-02\nCategories: Computer Science\nSummary: Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure. Roof assemblies and rooftop structures are particularly challenging due to the complexity and fragmentation of regulatory requirements, especially in jurisdictions such as Florida, where compliance must be verified across both the residential and commercial volumes of the Florida Building Code (FBC). The resulting review process is technically demanding and time-intensive, imposing significant cognitive and operational burdens on practitioners and under-resourced public agencies. To address these challenges, this study proposes and evaluates an agentic artificial intelligence (AI) framework for automated code compliance checking of roof assemblies and rooftop structures. The framework employs a multi-agent architecture in which specialized AI agents collaboratively interpret regulatory provisions and evaluate roof design parameters across four core modules: data preprocessing and code ingestion, rule-based and semantic analysis, results visualization, and iterative validation. YOLO11m-seg and Mask R-CNN were used for element detection and segmentation, and the system was developed using 150 design projects, including roof plans, section details, and specifications. Four large language models from two families (Mistral and GPT) were comparatively evaluated on standardized compliance tasks. The framework was then tested on a held-out portfolio of 15 distinct roof-design projects comprising 60 code-compliance decisions derived from the FBC 2023, with performance measured by precision, recall, F1-score, and accuracy. GPT-5.4 achieved the highest overall performance (F1 = 0.97; accuracy = 97%). Because the reasoning and vision components were evaluated separately rather than as an integrated end-to-end pipeline, and the scope was limited to one jurisdiction and two drawing types, broader code coverage and production-setting validation are needed before claims of generality. Nonetheless, the results suggest that agentic AI can meaningfully support compliance review and reduce reviewer burden in roof-design permitting.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_004",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model'?",
      "ground_truth": "Zunlong Hong",
      "ground_truth_doc_ids": [
        "10.54254/2755-2721/2026.36624"
      ],
      "answer": "Zunlong Hong",
      "retrieved_doc_ids": [
        "10.54254/2755-2721/2026.36624",
        "10.63646/kpqm1958",
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.70267/aitia.2026482489"
      ],
      "retrieved_contexts": [
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_005",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Intelligent automation of economic processes based on retrieval-augmented generation and large language models'?",
      "ground_truth": "Serhii Arefiev, Serhii Hildi",
      "ground_truth_doc_ids": [
        "10.36887/2415-8453-2026-3-2"
      ],
      "answer": "Serhii Arefiev, Serhii Hildi",
      "retrieved_doc_ids": [
        "10.36887/2415-8453-2026-3-2",
        "10.63646/kpqm1958",
        "10.54254/2755-2721/2026.36624",
        "10.20944/preprints202608.1849.v1"
      ],
      "retrieved_contexts": [
        "Title: Intelligent automation of economic processes based on retrieval-augmented generation and large language models\nAuthors: Serhii Arefiev, Serhii Hildi\nPublished: 2026-09-04\nCategories: Computer Science\nSummary: The article is devoted to the theoretical and methodological substantiation of the concept of intelligent automation of economic processes based on the integration of Retrieval-Augmented Generation (RAG), Large Language Models (LLM), Prompt Engineering, and Automatic Engineering technologies. The modern digital economy is moving from technical automation to cognitive automation, in which self-learning systems are emerging that can adapt to environmental changes, analyze the results of their own activities, and generate new economic solutions. RAG acts as a cognitive intermediary between generation and data retrieval, ensuring the factual reliability of analytical results. LLMs provide semantic interpretation of information and create conditions for natural-language scenario modeling. Prompt Engineering determines the quality of interaction between humans and the system by transforming users’ analytical intentions into a formalized query structure. Particular attention is paid to Automatic Engineering as a meta-level of cognitive management that ensures automated prompt improvement, reconfiguration of generation parameters, development of decision metamodels, and formation of digital twins of management processes. A multilevel cognitive-engineering model of economic management is proposed, which includes strategic, cognitive-technical, self-learning, and reflexive levels. This architecture forms a closed cognitive cycle of “generation – evaluation – optimization – updating,” which ensures the system’s capacity for reflexive self-learning and evolutionary development. The practical significance of the research lies in creating a methodological basis for implementing agentic AI solutions in strategic planning, risk forecasting, and enhancing the intellectual resilience of economic systems in the digital economy. Keywords: intelligent automation, Retrieval-Augmented Generation (RAG), Large Language Models (LLM), Prompt Engineering, Automatic Engineering, cognitive architecture, digital economy, strategic management, self-learning economy, artificial intelligence.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
        "Title: An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization\nAuthors: Fardin Jalil Piran, Rajiv Malhotra, Farhad Imani\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Selecting an encoding configuration for Hyperdimensional Computing (HDC) determines whether a model fits the memory budget of an Internet of Things (IoT) device, yet the knowledge needed to make that choice is dispersed across thousands of papers in a form no optimizer can query. The configuration space is large and each evaluation is expensive, so exhaustive search is infeasible; sequential optimizers are the standard remedy, but they begin from an uninformed prior and spend early evaluations exploring blindly. We present an agentic Retrieval-Augmented Generation (RAG) recommendation system that converts the HDC literature into an informed starting point for this search. A corpus of 1,518 HDC papers is indexed multimodally. A vision-language model (VLM) describes 1,755 figure regions extracted from source PDFs, making plotted evidence such as accuracy against dimension curves retrievable alongside prose and tables. Given a task profile stating the dataset characteristics, target hardware, objectives, and memory budget, the agent retrieves evidence under an allocation that reserves context for figures, and returns an encoding configuration with supporting citations. That configuration seeds the first trial of a constrained multi-objective search over accuracy and inference memory, which then refines it, and feasibility is enforced by external measurement rather than by the model. On network intrusion detection (CICIDS2017) and bearing fault diagnosis (CWRU), the literature-grounded start raised the hypervolume of the recovered Pareto front by 17.4% and 19.1% over an identically budgeted search from a random draw, at no additional evaluation cost. A natural extension is to let the system perform the data preprocessing that the practitioner now supplies, so that a deployment can be described end to end from raw sensor streams."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_006",
      "question_type": "authors",
      "question": "Who are the authors of the paper 'Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model'?",
      "ground_truth": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "ground_truth_doc_ids": [
        "10.28932/jutisi.v12i2.13099"
      ],
      "answer": "Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro",
      "retrieved_doc_ids": [
        "10.28932/jutisi.v12i2.13099",
        "10.52060/juptik.v4i1.4318",
        "10.63646/kpqm1958",
        "10.3390/knowledge6030022"
      ],
      "retrieved_contexts": [
        "Title: Transformasi Layanan Informasi Berbasis Chatbot Retrieval-Augmented Generation dan Large Language Model\nAuthors: Muhamad Komarudin, Chelly Sabrina, Yessy Mulyani, Puput Budi Wintoro\nPublished: 2026-08-27\nCategories: Computer Science\nSummary: Keterbukaan akses informasi publik diatur dalam Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik sebagai elemen utama untuk mewujudkan transparansi dan tata kelola pemerintahan yang baik. Di Universitas Lampung, Pejabat Pengelola Informasi dan Dokumentasi (PPID) menyediakan berbagai data publik melalui website resminya. Namun, pengguna sering mengalami kesulitan dalam menemukan informasi spesifik akibat tersebarnya dokumenserta keterbatasan fitur pencarian. Untuk mengatasi permasalahan tersebut, dikembangkan chatbot Telegram berbasis kecerdasan buatan menggunakan Large Language Model (LLM) Qwen2.5 VL 72B Instruct yang terintegrasi dengan arsitektur Retrieval Augmented Generation (RAG). Data diambil dari website PPID Universitas Lampung yang selanjutnya disusun menjadi dataset terstruktur sebanyak 375 pasangan pertanyaan–jawaban yang dikurasi dari 47 entri informasi publik. Data tersebut diproses melalui tahap tokenisasi, embedding, serta indexing menggunakan vector database FAISS untuk mendukung pencariansemantik. Evaluasi dilakukan dengan metrik RAGAS (faithfulness, answer relevance, dan context recall) dengan ambang batas minimal 0,8, serta perbandingan performa dengan LLM murni. Hasil pengujian menunjukkan bahwa sistem berhasilmelampaui ambang batas RAGAS dengan rata-rata latensi respons yang sangat rendah yaitu 0,69 detik, serta memiliki akurasi lebih tinggi dibandingkan LLM murni dengan pengurangan signifikan terhadap halusinasi jawaban. Uji kegunaan menggunakan Chatbot Usability Questionnaire (CUQ) menghasilkan skor rata-rata 90,62 yang mengindikasikan pengalaman pengguna yang sangat baik. Penelitian ini menyimpulkan bahwa integrasi LLM dan RAG pada chatbot efektif meningkatkan akurasi, relevansi, dan kemudahan akses informasi publik secara real-time.",
        "Title: Chatbot Hybrid Fatwa MUI Menggunakan Retrieval Augmented Generation dan Large Language Model\nAuthors: Surya Hidayatullah Firdaus, Nazruddin Safaat H, Yelfi Vitriani, Novriyanto\nPublished: 2026-06-01\nCategories: Computer Science\nSummary: Aksesibilitas dokumen digital Fatwa Majelis Ulama Indonesia (MUI) yang terfragmentasi membuat pencarian informasi kurang efektif. Di sisi lain, sistem tanya jawab AI berbasis satu sumber dokumen (single-corpus) rentan menghasilkan jawaban tidak akurat (halusinasi) pada pertanyaan di luar domain. Penelitian ini mengembangkan Chatbot Hybrid Fatwa MUI menggunakan arsitektur Hybrid Retrieval bertingkat dengan dua sumber pengetahuan: dokumen Fatwa MUI sebagai korpus utama dan 12.370 hadis Bukhari-Muslim sebagai mekanisme cadangan (fallback). Sistem ini menerapkan pencarian semantik, verifikasi topik otomatis oleh model bahasa, dan pengalihan ke basis data hadis jika konteks fatwa dinilai tidak relevan. Hasil evaluasi menunjukkan peningkatan kesamaan makna jawaban sebesar 13,23% (dari 0,6664 menjadi 0,7546) dan peningkatan kesetiaan pada rujukan (faithfulness) sebesar 10,57% (dari 85,37% menjadi 94,39%), dengan tingkat penolakan (abstain rate) identik sebesar 26,83%. Pendekatan multi-korpus ini terbukti signifikan meningkatkan relevansi dan keakuratan jawaban dibandingkan RAG standar.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection\nAuthors: Ibtasam Ur Rehman, Muhammad Islam, Muhammad Yousaf Rehman, Basharat Hussain\nPublished: 2026-08-25\nCategories: Computer Science\nSummary: Large Language Models (LLMs) have been rapidly evolving lately, resulting in the need for strong, explainable models to detect the difference between human-generated and machine-generated articles. Existing approaches which are mostly based on fine-tuned transformers suffer from several drawbacks such as rapid obsolescence, paraphrasing attacks, and lack of interpretability. To improve their ability to detect, this paper proposes a novel paradigm called Human vs. LLM Identification (HLI) which introduces a Retrieval-Augmented Generation (RAG)-inspired evidence-based detection strategy alongside a fine-tuned transformer classifier. Our core model, DeBERTa-Sentinel, is built on top of a fine-tuned Microsoft DeBERTa-v3-small model, which uses a disentangled attention mechanism to better capture subtle syntactic and stylistic deviations characteristic of AI-generated text. We evaluate our framework on a balanced dataset of 43,456 text samples, curated from the OpenGPTText corpus and covering AI-generated and human-authored content across diverse domains including news, education, and creative text. The experimental results show improved performance over the selected baselines, with our framework achieving an accuracy of 97.53%, precision of 95.89%, recall of 99.34%, and ROC-AUC of 99.53%. In addition, explainability is integrated into our framework through Local Interpretable Model-agnostic Explanations (LIME) analysis, providing token-level insight into classification decisions. This study establishes a benchmark for scalable, explainable AI text detection, with implications for academic integrity, content moderation, and combating misinformation."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_007",
      "question_type": "date",
      "question": "When was the paper 'Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1"
      ],
      "answer": "2026-08-26",
      "retrieved_doc_ids": [
        "10.21203/rs.3.rs-10423755/v1",
        "10.21203/rs.3.rs-10349437/v1",
        "10.3390/buildings16132637",
        "10.63646/kpqm1958"
      ],
      "retrieved_contexts": [
        "Title: Evidence Constrained Agentic Retrieval Augmented Generation for Substation Civil Engineering Preliminary Design Documents in a Single Project Study\nAuthors: Yizhang Huang, Xinhui Zhang\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Abstract Substation civil engineering preliminary design documents must integrate project-specific conditions, current regulatory requirements, typical design practices, and historical engineering experience while maintaining consistency across architectural, structural, general-layout, foundation, road, drainage, and technical-indicator sections. Conventional Retrieval-Augmented Generation (RAG) systems remain vulnerable to condition-insensitive retrieval, unequal source authority, incompatible evidence, unsupported engineering claims, and parameter drift during long-document drafting. This study proposes an Evidence-Constrained Agentic Retrieval-Augmented Generation framework, termed EC-ARAG. The framework combines regulation-aware evidence representation, validity-gated hybrid retrieval, source-role-aware conflict resolution, dual planning--retrieval and generation--verification--repair loops, and global project-state memory. The experimental corpus comprised 36 national and industry standards, 12 enterprise standards, 18 typical-design documents, 64 historical preliminary design documents, and nine project-input documents. The held-out evaluation included 120 retrieval queries, 80 applicability cases, 48 evidence-conflict cases, 318 atomic design propositions, and five independent generation runs. EC-ARAG achieved a Recall@5 of 94.1\\%, an applicability Macro-F1 of 90.6\\%, an evidence support rate of 95.0\\%, section completeness of 96.0\\%, and cross-section parameter consistency of 97.0\\%. Its unsafe-claim rate and character-level manual-edit rate were 3.4\\% and 7.6\\%, respectively. Although agentic verification increased machine inference time, total operational completion time was 21.4\\% lower than that of closed-corpus Corrective RAG. Under the evaluated single-project, text-only conditions, EC-ARAG improved the reliability, traceability, and professional editability of regulation-intensive preliminary design drafting.",
        "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
        "Title: An Agentic AI System for Roof Design Compliance Using Computer Vision, Retrieval-Augmented Generation and Large Language Models\nAuthors: Nawari O. Nawari, Oluwatoyin O. Lawal\nPublished: 2026-07-02\nCategories: Computer Science\nSummary: Designers, engineers, and building officials face increasing pressure to accelerate and improve the accuracy of design review for buildings and infrastructure. Roof assemblies and rooftop structures are particularly challenging due to the complexity and fragmentation of regulatory requirements, especially in jurisdictions such as Florida, where compliance must be verified across both the residential and commercial volumes of the Florida Building Code (FBC). The resulting review process is technically demanding and time-intensive, imposing significant cognitive and operational burdens on practitioners and under-resourced public agencies. To address these challenges, this study proposes and evaluates an agentic artificial intelligence (AI) framework for automated code compliance checking of roof assemblies and rooftop structures. The framework employs a multi-agent architecture in which specialized AI agents collaboratively interpret regulatory provisions and evaluate roof design parameters across four core modules: data preprocessing and code ingestion, rule-based and semantic analysis, results visualization, and iterative validation. YOLO11m-seg and Mask R-CNN were used for element detection and segmentation, and the system was developed using 150 design projects, including roof plans, section details, and specifications. Four large language models from two families (Mistral and GPT) were comparatively evaluated on standardized compliance tasks. The framework was then tested on a held-out portfolio of 15 distinct roof-design projects comprising 60 code-compliance decisions derived from the FBC 2023, with performance measured by precision, recall, F1-score, and accuracy. GPT-5.4 achieved the highest overall performance (F1 = 0.97; accuracy = 97%). Because the reasoning and vision components were evaluated separately rather than as an integrated end-to-end pipeline, and the scope was limited to one jurisdiction and two drawing types, broader code coverage and production-setting validation are needed before claims of generality. Nonetheless, the results suggest that agentic AI can meaningfully support compliance review and reduce reviewer burden in roof-design permitting.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_008",
      "question_type": "date",
      "question": "When was the paper 'An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization' published?",
      "ground_truth": "2026-08-26",
      "ground_truth_doc_ids": [
        "10.20944/preprints202608.1849.v1"
      ],
      "answer": "2026-08-26",
      "retrieved_doc_ids": [
        "10.20944/preprints202608.1849.v1",
        "10.63646/kpqm1958",
        "10.55041/isjem07213",
        "10.54254/2755-2721/2026.36624"
      ],
      "retrieved_contexts": [
        "Title: An Agentic Retrieval-Augmented Vision-Language Recommendation System for Hyperdimensional Encoding Optimization\nAuthors: Fardin Jalil Piran, Rajiv Malhotra, Farhad Imani\nPublished: 2026-08-26\nCategories: Computer Science\nSummary: Selecting an encoding configuration for Hyperdimensional Computing (HDC) determines whether a model fits the memory budget of an Internet of Things (IoT) device, yet the knowledge needed to make that choice is dispersed across thousands of papers in a form no optimizer can query. The configuration space is large and each evaluation is expensive, so exhaustive search is infeasible; sequential optimizers are the standard remedy, but they begin from an uninformed prior and spend early evaluations exploring blindly. We present an agentic Retrieval-Augmented Generation (RAG) recommendation system that converts the HDC literature into an informed starting point for this search. A corpus of 1,518 HDC papers is indexed multimodally. A vision-language model (VLM) describes 1,755 figure regions extracted from source PDFs, making plotted evidence such as accuracy against dimension curves retrievable alongside prose and tables. Given a task profile stating the dataset characteristics, target hardware, objectives, and memory budget, the agent retrieves evidence under an allocation that reserves context for figures, and returns an encoding configuration with supporting citations. That configuration seeds the first trial of a constrained multi-objective search over accuracy and inference memory, which then refines it, and feasibility is enforced by external measurement rather than by the model. On network intrusion detection (CICIDS2017) and bearing fault diagnosis (CWRU), the literature-grounded start raised the hypervolume of the recovered Pareto front by 17.4% and 19.1% over an identically budgeted search from a random draw, at no additional evaluation cost. A natural extension is to let the system perform the data preprocessing that the practitioner now supplies, so that a deployment can be described end to end from raw sensor streams.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Speculative Retrieval-Augmented Generation for Cost-Efficient Large Language Model Inference\nAuthors: Dr. Sumalatha P, Manoj Kumar\nPublished: 2026-05-06\nCategories: Computer Science\nSummary: Abstract - This work focuses on the two crucial bottlenecks in Retrieval-Augmented Generation (RAG): high inference latency and expensive computation cost. RAG enhances the factual correctness of Large Language Models (LLMs) by utilizing external knowledge sources; However, the auto-To achieve a good recall, the system applies a two-way retrieval mechanism: Dense retrieval: This module uses BAAI/bge-small-en-v1.5 to create a 384-dimensional embedding space, where queries and documents are mapped. The embeddings are stored in a FAISS IndexFlatL2. Sparse retrieval: This module uses TF-IDF vectorization to capture an exact keyword match. Reranking: A simple heuristic mechanism of matching substrings of the query terms in the documents selected to perform the final step of ranking them for prompt introduce a novel speculative RAG framework that combines hybrid retrieval with speculative decoding. Our framework employs hybrid dense vector search (BGE-small) and sparse keyword search (TF-IDF) for enhanced recall followed by a lightweight re-ranker model. A compact draft model (TinyLlama-1.1B) makes tentative future token generation, then a larger verifier model (Mistral-7B) checks the correctness of the candidate token. Empirical experiments demonstrate 33% and 29% improvement in inference latency and token reduction, respectively, compared to the baseline of a typical 7B model, while retaining 94% accuracy on factoid tasks. Key Words: Retrieval-Augmented Generation, Speculative Decoding, Large Language Models, Inference Optimization, Hybrid Retrieval",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_009",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.3390/knowledge6030022"
      ],
      "answer": "Computer Science",
      "retrieved_doc_ids": [
        "10.3390/knowledge6030022",
        "10.63646/kpqm1958",
        "10.20944/preprints202604.0339.v1",
        "10.70267/aitia.2026482489"
      ],
      "retrieved_contexts": [
        "Title: Integrating Retrieval-Augmented Generation with Large Language Model for Robust and Explainable AI Text Detection\nAuthors: Ibtasam Ur Rehman, Muhammad Islam, Muhammad Yousaf Rehman, Basharat Hussain\nPublished: 2026-08-25\nCategories: Computer Science\nSummary: Large Language Models (LLMs) have been rapidly evolving lately, resulting in the need for strong, explainable models to detect the difference between human-generated and machine-generated articles. Existing approaches which are mostly based on fine-tuned transformers suffer from several drawbacks such as rapid obsolescence, paraphrasing attacks, and lack of interpretability. To improve their ability to detect, this paper proposes a novel paradigm called Human vs. LLM Identification (HLI) which introduces a Retrieval-Augmented Generation (RAG)-inspired evidence-based detection strategy alongside a fine-tuned transformer classifier. Our core model, DeBERTa-Sentinel, is built on top of a fine-tuned Microsoft DeBERTa-v3-small model, which uses a disentangled attention mechanism to better capture subtle syntactic and stylistic deviations characteristic of AI-generated text. We evaluate our framework on a balanced dataset of 43,456 text samples, curated from the OpenGPTText corpus and covering AI-generated and human-authored content across diverse domains including news, education, and creative text. The experimental results show improved performance over the selected baselines, with our framework achieving an accuracy of 97.53%, precision of 95.89%, recall of 99.34%, and ROC-AUC of 99.53%. In addition, explainability is integrated into our framework through Local Interpretable Model-agnostic Explanations (LIME) analysis, providing token-level insight into classification decisions. This study establishes a benchmark for scalable, explainable AI text detection, with implications for academic integrity, content moderation, and combating misinformation.",
        "Title: The Age of Autonomous Agents: A Bibliometric Review of Agentic AI Architectures, Applications, and Emerging Challenges\nAuthors: Ben J. Weber, Clara M. Hofmann, Amara N. Okoye\nPublished: 2026-06-30\nCategories: Computer Science\nSummary: The rapid evolution of large language models (LLMs) has catalyzed a shift from passive AI systems toward autonomous agentic architectures capable of reasoning, memory, tool use, and multi-agent collaboration. This bibliometric review characterizes the emerging field through 810 publications retrieved from the Web of Science Core Collection for the period 2023–2025. Annual output rose sharply over this window—from 4 publications in 2023 to 96 in 2024 and 710 in 2025—accompanied by a parallel rise in citations, indicating rapid mainstream adoption. Author-keyword analysis reveals a landscape dominated by large language models, artificial intelligence, and multi-agent systems, with agentic AI, generative AI, and retrieval-augmented generation (RAG) emerging as core themes. Research output is geographically concentrated, led by China and the United States, and is distributed across a broad range of engineering, applied-science, and domain-specific journals rather than a single specialist venue, reflecting the field's cross-disciplinary uptake. Synthesizing this corpus, we organize the technical landscape around reasoning, memory, tool integration and RAG, and multi-agent orchestration; survey application domains spanning healthcare, scientific discovery, education, and software engineering, with emerging activity in finance and law; and analyze the principal challenges—hallucination, trust and robustness, inter-agent coordination, scalability, and governance. The review provides a structured, evidence-based map of agentic AI research to orient researchers and practitioners navigating this rapidly evolving field.",
        "Title: Retrieval-Augmented Large Language Model Agents for Automated Scientific Literature Review Generation\nAuthors: Ruotong Wang, Nyutian Long, Shunqi Liu, Yuxi Wang, Zhen Qi, Huajun Zhang\nPublished: 2026-04-06\nCategories: Computer Science\nSummary: This study investigates a method that integrates retrieval-augmented mechanisms into large language model agents for scientific literature review generation. The approach addresses the limitations of traditional review models that rely on parametric knowledge with insufficient timeliness and limited coverage. Incorporating external document retrieval and dynamic information fusion into the generation process enhances the accuracy and completeness of the output. The overall framework consists of query encoding, semantic retrieval, document filtering, knowledge fusion, language modeling, task planning, memory storage, and reinforcement optimization, forming a closed loop of retrieval, understanding, and generation. Relevant document fragments are first retrieved through semantic vector search to ensure comprehensive and reliable information sources. These external representations are then integrated with the internal embeddings of the language model through weighted fusion, which preserves fluency while maintaining factual grounding. The task planning module constrains logical flow and text structure, and reinforcement learning optimization further improves relevance and consistency. Comparative experiments on large-scale scientific literature datasets demonstrate that the method outperforms existing approaches on ROUGE, BLEU, METEOR, and diversity metrics, validating its effectiveness and practicality. The findings show that combining retrieval augmentation with agent architectures can significantly improve coverage, accuracy, and language quality in review generation, providing a feasible solution for knowledge organization in complex literature environments.",
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems."
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    },
    {
      "id": "eval_010",
      "question_type": "categories",
      "question": "What are the research categories of the paper 'A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning'?",
      "ground_truth": "Computer Science",
      "ground_truth_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777"
      ],
      "answer": "Computer Science",
      "retrieved_doc_ids": [
        "10.36948/ijfmr.2026.v08i04.85777",
        "10.70267/aitia.2026482489",
        "10.54254/2755-2721/2026.36624",
        "10.55041/isjem07213"
      ],
      "retrieved_contexts": [
        "Title: A Framework for Adaptive Knowledge-Augmented Mizo Large Language Models Using Retrieval-Augmented Generation and Continual Learning\nAuthors: Vanlalropuia Ralte, Abhisake Sinha -\nPublished: 2026-08-14\nCategories: Computer Science\nSummary: The deployment of Large Language Models (LLMs) for low-resource languages is challenging due to the lack of linguistic resources, sparse digital content and the absence of structured knowledge bases. In this paper, we present an adaptive knowledge-augmented framework for Mizo Large Language Models by combining Retrieval-Augmented Generation (RAG) with continual learning. This methodology harnesses semantic retrieval with dense embeddings and FAISS indexing, adaptive evidence re-ranking, parameter-efficient fine-tuning, and incremental knowledge updating to enhance factual accuracy and decrease hallucinations. Experimental evaluation shows better retrieval performance, greater text creation quality, and superior human evaluation scores than typical multilingual LLMs and static RAG methods. Moreover, the continual learning technique allows for effective integration of newly accessible Mizo resources, without re-training the model from scratch. The suggested architecture offers a scalable, stable and reusable method for the development of intelligent language technologies for Mizo and other low-resource languages.",
        "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems.",
        "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
        "Title: Speculative Retrieval-Augmented Generation for Cost-Efficient Large Language Model Inference\nAuthors: Dr. Sumalatha P, Manoj Kumar\nPublished: 2026-05-06\nCategories: Computer Science\nSummary: Abstract - This work focuses on the two crucial bottlenecks in Retrieval-Augmented Generation (RAG): high inference latency and expensive computation cost. RAG enhances the factual correctness of Large Language Models (LLMs) by utilizing external knowledge sources; However, the auto-To achieve a good recall, the system applies a two-way retrieval mechanism: Dense retrieval: This module uses BAAI/bge-small-en-v1.5 to create a 384-dimensional embedding space, where queries and documents are mapped. The embeddings are stored in a FAISS IndexFlatL2. Sparse retrieval: This module uses TF-IDF vectorization to capture an exact keyword match. Reranking: A simple heuristic mechanism of matching substrings of the query terms in the documents selected to perform the final step of ranking them for prompt introduce a novel speculative RAG framework that combines hybrid retrieval with speculative decoding. Our framework employs hybrid dense vector search (BGE-small) and sparse keyword search (TF-IDF) for enhanced recall followed by a lightweight re-ranker model. A compact draft model (TinyLlama-1.1B) makes tentative future token generation, then a larger verifier model (Mistral-7B) checks the correctness of the candidate token. Empirical experiments demonstrate 33% and 29% improvement in inference latency and token reduction, respectively, compared to the baseline of a typical 7B model, while retaining 94% accuracy on factoid tasks. Key Words: Retrieval-Augmented Generation, Speculative Decoding, Large Language Models, Inference Optimization, Hybrid Retrieval"
      ],
      "retrieval_hit": true,
      "token_f1": 1.0,
      "judge": {
        "score": 5,
        "correct": true,
        "reasoning": "Fallback heuristic judge used because the LLM evaluator was unavailable."
      }
    }
  ],
  "raw_samples": [
    {
      "paper_id": "10.47576/2949-1894.2026.7.7.023",
      "title": "Снижение рисков применения LLM (Large Language Model) в сфере экономической безопасности предприятий молочной промышленности на основе подхода RAG (Retrieval-Augmented Generation)",
      "summary": "В статье проведено исследование особенностей снижения рисков применения LLM (Large Language Model) в сфере экономической безопасности предприятий молочной промышленности на основе подхода RAG (Retrieval-Augmented Generation) в современных условиях. Рассмотрены риски применения LLM в сфере экономической безопасности предприятий молочной промышленности. Подробно разобраны сценарии применения LLM+RAG в российской молочной промышленности – с описанием процесса, задействованных данных, решаемых рисков и достигнутых результатов. Показано, что в результате интеграция RAG с LLM трансформирует генеративную модель из потенциально опасного инструмента в надежный механизм поддержки принятия решений – от мониторинга угроз фальсификации до прогнозирования экономических показателей с учетом отраслевой специфики. The article examines the features of reducing the risks of using LLM (Large Language Model) in the field of economic security of dairy industry enterprises based on the RAG (Retrieval-Augmented Generation) approach in modern conditions. The risks of using LLM in the field of economic security of dairy industry enterprises are considered. The scenarios of LLM+RAG application in the Russian dairy industry are analyzed in detail, describing the process, the data involved, the risks to be solved and the results achieved. It is shown that as a result, the integration of RAG with LLM transforms the generative model from a potentially dangerous tool into a reliable decision support mechanism, from monitoring fraud threats to forecasting economic indicators based on industry specifics.",
      "authors": [
        "И.В. Ермаков",
        "В.В. Филатов"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-06-15",
      "updated": "2026-06-17T07:51:54Z",
      "abs_url": "https://doi.org/10.47576/2949-1894.2026.7.7.023",
      "pdf_url": "",
      "comment": ""
    },
    {
      "paper_id": "10.70267/aitia.2026482489",
      "title": "Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review",
      "summary": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems.",
      "authors": [
        "Zilang Shao"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-09-13",
      "updated": "2026-09-13T10:04:31Z",
      "abs_url": "https://doi.org/10.70267/aitia.2026482489",
      "pdf_url": "https://journals.zeuspress.org/index.php/conference/article/download/1352/1280",
      "comment": ""
    },
    {
      "paper_id": "10.54254/2755-2721/2026.36624",
      "title": "Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model",
      "summary": "Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
      "authors": [
        "Zunlong Hong"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-09-08",
      "updated": "2026-09-08T02:26:31Z",
      "abs_url": "https://doi.org/10.54254/2755-2721/2026.36624",
      "pdf_url": "",
      "comment": ""
    },
    {
      "paper_id": "10.20944/preprints202604.0339.v1",
      "title": "Retrieval-Augmented Large Language Model Agents for Automated Scientific Literature Review Generation",
      "summary": "This study investigates a method that integrates retrieval-augmented mechanisms into large language model agents for scientific literature review generation. The approach addresses the limitations of traditional review models that rely on parametric knowledge with insufficient timeliness and limited coverage. Incorporating external document retrieval and dynamic information fusion into the generation process enhances the accuracy and completeness of the output. The overall framework consists of query encoding, semantic retrieval, document filtering, knowledge fusion, language modeling, task planning, memory storage, and reinforcement optimization, forming a closed loop of retrieval, understanding, and generation. Relevant document fragments are first retrieved through semantic vector search to ensure comprehensive and reliable information sources. These external representations are then integrated with the internal embeddings of the language model through weighted fusion, which preserves fluency while maintaining factual grounding. The task planning module constrains logical flow and text structure, and reinforcement learning optimization further improves relevance and consistency. Comparative experiments on large-scale scientific literature datasets demonstrate that the method outperforms existing approaches on ROUGE, BLEU, METEOR, and diversity metrics, validating its effectiveness and practicality. The findings show that combining retrieval augmentation with agent architectures can significantly improve coverage, accuracy, and language quality in review generation, providing a feasible solution for knowledge organization in complex literature environments.",
      "authors": [
        "Ruotong Wang",
        "Nyutian Long",
        "Shunqi Liu",
        "Yuxi Wang",
        "Zhen Qi",
        "Huajun Zhang"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-04-06",
      "updated": "2026-04-07T00:32:22Z",
      "abs_url": "https://doi.org/10.20944/preprints202604.0339.v1",
      "pdf_url": "",
      "comment": ""
    }
  ],
  "clean_samples": [
    {
      "paper_id": "10.21203/rs.3.rs-10489777/v1",
      "title": "DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation",
      "summary": "Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination. Existing approaches to forensic readiness are, however, infrastructure-based and inadequately support the completeness of evidence, the identification of evidence gaps, and preparation of a structured investigation at the case level. This study introduces a privacy-preserving framework for assessing digital investigation readiness called DOLPHIN, which integrates offline large language models with retrieval-augmented generation to provide evidence-based investigation support. Thirty sets of 30 cases of structured investigation scenarios were created under five evidence-completeness conditions: complete-evidence, partial-evidence, and low-evidence cases. A Forensic Readiness Index was scored for each case across six categories of evidence: victim statement, FIR/CSR, CCTV evidence, witness statement, ownership documents, and metadata. The deficiencies were categorized using a taxonomy of evidence gaps. Evidence gaps were classified into four categories: documentation gaps, corroboration gaps, visual gaps, and time gaps. To ensure that critical investigation data is not processed in the cloud, the framework was deployed locally with the help of LM Studio, AnythingLLM, and Qwen 3. The experimental results indicated that DOLPHIN obtained a readiness classification accuracy of 92.0% and excellent evidence-gap detection performance with F1 scores ranging from 90.27% to 94.60%. The retrieval performance with metadata-filtered RAG was found to be superior, with 90.33% top-1 accuracy, 99.67% top-3 accuracy, and 94.06% mean reciprocal rank. The unsupported output rate went down from 16.33% to 2.00% when using metadata-filtered RAG. DOLPHIN also significantly reduced the mean preparation time, from 15.46 to 4.41 minutes per case, and increased the completion rate for reports. The results show the potential of offline LLM-RAG systems to aid in investigation-readiness assessment in a human-centered and interpretable way while preserving privacy.",
      "authors": [
        "Divya K"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-09-15",
      "updated": "2026-09-15T11:49:09Z",
      "abs_url": "https://doi.org/10.21203/rs.3.rs-10489777/v1",
      "pdf_url": "",
      "comment": "",
      "authors_joined": "Divya K",
      "categories_joined": "Computer Science",
      "age_days": 11,
      "summary_chars": 2135,
      "text_for_embedding": "Title: DOLPHIN: A Privacy-Preserving Digital Investigation Readiness Assessment Framework based on Offline Large Language Models and Retrieval-Augmented Generation\nAuthors: Divya K\nPublished: 2026-09-15\nCategories: Computer Science\nSummary: Abstract Increasingly, digital forensic investigations require a quick, reliable, and privacy-preserving assessment of case materials before formal forensic examination. Existing approaches to forensic readiness are, however, infrastructure-based and inadequately support the completeness of evidence, the identification of evidence gaps, and preparation of a structured investigation at the case level. This study introduces a privacy-preserving framework for assessing digital investigation readiness called DOLPHIN, which integrates offline large language models with retrieval-augmented generation to provide evidence-based investigation support. Thirty sets of 30 cases of structured investigation scenarios were created under five evidence-completeness conditions: complete-evidence, partial-evidence, and low-evidence cases. A Forensic Readiness Index was scored for each case across six categories of evidence: victim statement, FIR/CSR, CCTV evidence, witness statement, ownership documents, and metadata. The deficiencies were categorized using a taxonomy of evidence gaps. Evidence gaps were classified into four categories: documentation gaps, corroboration gaps, visual gaps, and time gaps. To ensure that critical investigation data is not processed in the cloud, the framework was deployed locally with the help of LM Studio, AnythingLLM, and Qwen 3. The experimental results indicated that DOLPHIN obtained a readiness classification accuracy of 92.0% and excellent evidence-gap detection performance with F1 scores ranging from 90.27% to 94.60%. The retrieval performance with metadata-filtered RAG was found to be superior, with 90.33% top-1 accuracy, 99.67% top-3 accuracy, and 94.06% mean reciprocal rank. The unsupported output rate went down from 16.33% to 2.00% when using metadata-filtered RAG. DOLPHIN also significantly reduced the mean preparation time, from 15.46 to 4.41 minutes per case, and increased the completion rate for reports. The results show the potential of offline LLM-RAG systems to aid in investigation-readiness assessment in a human-centered and interpretable way while preserving privacy."
    },
    {
      "paper_id": "10.70267/aitia.2026482489",
      "title": "Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review",
      "summary": "Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems.",
      "authors": [
        "Zilang Shao"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-09-13",
      "updated": "2026-09-13T10:04:31Z",
      "abs_url": "https://doi.org/10.70267/aitia.2026482489",
      "pdf_url": "https://journals.zeuspress.org/index.php/conference/article/download/1352/1280",
      "comment": "",
      "authors_joined": "Zilang Shao",
      "categories_joined": "Computer Science",
      "age_days": 13,
      "summary_chars": 1329,
      "text_for_embedding": "Title: Retrieval-Augmented Generation for Large Language Model-Based Intelligent Assistants: A Review\nAuthors: Zilang Shao\nPublished: 2026-09-13\nCategories: Computer Science\nSummary: Large language models have accelerated the development of intelligent assistants by providing flexible natural- language understanding and generation. However, hallucination, knowledge staleness, and limited coverage of domain-specific information continue to restrict their reliability in knowledge-intensive tasks. This review examines how Retrieval -Augmented Generation (RAG) can strengthen LLM-based intelligent assistants by connecting generative capability with external, maintainable knowledge. It synthesi zes research on the technical foundations of RAG, key components and optimization strategies, and applications and challenges in intelligent-assistant settings. The review finds that RAG can improve knowledge accuracy and timeliness by grounding responses in retrieved evidence and allowing knowledge resources to be updated independently of the base model. These benefits are conditional: unreliable retrieval, poorly maintained sources, ineffective use of context, and fragmented evaluation can still produce u nsupported or unsafe answers. Reliable deployment, therefore, requires coordinated retrieval quality, knowledge management, generation control, and trustworthy evaluation. Future RAG-based assistants should combine these capabilities to become scalable, secure, evidence-aware, and verifiable systems."
    },
    {
      "paper_id": "10.21203/rs.3.rs-10349437/v1",
      "title": "Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems",
      "summary": "Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance.",
      "authors": [
        "Sathiska Priyad",
        "Gayathri Karthick"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-09-12",
      "updated": "2026-09-12T16:12:32Z",
      "abs_url": "https://doi.org/10.21203/rs.3.rs-10349437/v1",
      "pdf_url": "",
      "comment": "",
      "authors_joined": "Sathiska Priyad, Gayathri Karthick",
      "categories_joined": "Computer Science",
      "age_days": 14,
      "summary_chars": 1715,
      "text_for_embedding": "Title: Agentic Retrieval-Augmented Generation for Verifiable Regulatory Compliance in Urban Cyber-Physical Systems\nAuthors: Sathiska Priyad, Gayathri Karthick\nPublished: 2026-09-12\nCategories: Computer Science\nSummary: Abstract Urban Cyber-Physical Systems (UCPS) support sustainable cities through the integration of Internet of Things (IoT), Artificial Intelligence (AI), and digi-tal infrastructures for environmental monitoring, urban planning, and resilient public services. However, ensuring regulatory compliance is increasingly chal-lenging because environmental, cybersecurity, municipal planning, and AI gov-ernance regulations evolve continuously across jurisdictions. Existing Retrieval-Augmented Generation (RAG) approaches improve evidence retrieval but remain vulnerable to hallucinations, regulatory supersession errors, and jurisdictional inconsistencies due to the absence of deterministic regulatory verification. This paper proposes a Verification-First Agentic Retrieval-Augmented Generation framework for trustworthy regulatory compliance reasoning in UCPS. The framework incorporates a Retrieval Agent, a deterministic Critic Agent, and a Formatting Agent to validate temporal validity, regulatory supersession, juris-dictional applicability, and compliance scope before language-model generation. A curated regulatory corpus and a benchmark comprising 78 regulatory com-pliance probes were used for evaluation against BM25, Dense RAG, Self-RAG, and Corrective RAG (CRAG). The proposed framework achieved a superses-sion detection rate of 0.88, perfect standalone Critic Agent validation (Precision = Recall = F1-score = 1.00), improved retrieval ranking quality (nDCG@5 = 0.75), and competitive computational efficiency. These results demonstrate that deterministic verification significantly improves the reliability, transparency, and trustworthiness of regulatory reasoning for sustainable urban governance."
    },
    {
      "paper_id": "10.54254/2755-2721/2026.36624",
      "title": "Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model",
      "summary": "Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information.",
      "authors": [
        "Zunlong Hong"
      ],
      "categories": [
        "Computer Science"
      ],
      "primary_category": "Computer Science",
      "published": "2026-09-08",
      "updated": "2026-09-08T02:26:31Z",
      "abs_url": "https://doi.org/10.54254/2755-2721/2026.36624",
      "pdf_url": "",
      "comment": "",
      "authors_joined": "Zunlong Hong",
      "categories_joined": "Computer Science",
      "age_days": 18,
      "summary_chars": 1106,
      "text_for_embedding": "Title: Advances in Reinforcement Learning for Retrieval-Augmented Generation in Large Language Model\nAuthors: Zunlong Hong\nPublished: 2026-09-08\nCategories: Computer Science\nSummary: Retrieval-augmented generation (RAG) enhances large language models (LLMs) by incorporating external information, but traditional fixed retrieval processes struggle to adapt to complex task requirements. In recent years, reinforcement learning (RL) has been increasingly applied to train LLMs to autonomously invoke search tools, driving RAG to evolve from the passive information acquisition of a fixed pipeline to a trustworthy retrieval system with autonomous decision-making capabilities. This paper reviews the representative studies on the combination of LLMs, RAG and RL in recent years. It focuses on analyzing the role of RL in dynamic retrieval, process rewards, query optimization, etc., and compares the connections and evolutionary relationships among different methods. The research findings show that RL has gradually expanded from simply improving the accuracy of the final answer to optimizing queries, multi-round search, process decision-making and trustworthy screening, providing new ideas for enhancing the active retrieval ability of RAG and improving the credibility of information."
    }
  ]
};
