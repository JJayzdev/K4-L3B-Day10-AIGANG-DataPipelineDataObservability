"""Launch the interactive Demo Showcase UI for Data Pipeline & Data Observability."""

from __future__ import annotations

import functools
import http.server
import os
import socket
import socketserver
import webbrowser
from pathlib import Path


def find_available_port(start_port: int = 8000, max_port: int = 8020) -> int:
    """Find an available TCP port."""
    for port in range(start_port, max_port):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    return start_port


def run_demo_server(port: int | None = None) -> None:
    """Serve the demo directory via local HTTP server."""
    demo_dir = Path(__file__).resolve().parent.parent / "demo"
    if not demo_dir.exists():
        raise FileNotFoundError(f"Demo directory not found at {demo_dir}")

    chosen_port = port or find_available_port(8000)
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(demo_dir))

    print("=" * 70)
    print("  🚀 RAG OBSERVABILITY & DATA PIPELINE INTERACTIVE SHOWCASE")
    print(f"  📍 Local URL: http://localhost:{chosen_port}")
    print(f"  📂 Serving:   {demo_dir}")
    print("  ⚡ Press Ctrl+C to terminate the server anytime.")
    print("=" * 70)

    # Automatically launch default browser
    webbrowser.open(f"http://localhost:{chosen_port}/index.html")

    with socketserver.TCPServer(("127.0.0.1", chosen_port), handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down demo server cleanly. Bye!")
            httpd.server_close()


if __name__ == "__main__":
    run_demo_server()
