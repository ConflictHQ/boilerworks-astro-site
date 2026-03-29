#!/usr/bin/env bash
set -euo pipefail

# Boilerworks — Astro Site
# Usage: ./run.sh [command]

case "${1:-help}" in
    up|start)
        npm run dev
        ;;
    down|stop)
        echo "No persistent services to stop (static site)"
        ;;
    restart)
        echo "Restart not applicable — run ./run.sh up to start dev server"
        ;;
    status|ps)
        echo "No Docker services (static site)"
        ;;
    logs)
        echo "No Docker services — dev server logs appear in the terminal"
        ;;
    build)
        npm run build
        ;;
    test)
        npx vitest run
        ;;
    lint)
        npx eslint . && npx prettier --check .
        ;;
    shell)
        echo "No backend service — this is a static site"
        ;;
    seed)
        echo "No database to seed (static site)"
        ;;
    help|*)
        echo "Usage: ./run.sh <command>"
        echo ""
        echo "Commands:"
        echo "  up, start     Start dev server"
        echo "  build         Build for production"
        echo "  test          Run tests"
        echo "  lint          Run linters"
        echo "  help          Show this help"
        ;;
esac
