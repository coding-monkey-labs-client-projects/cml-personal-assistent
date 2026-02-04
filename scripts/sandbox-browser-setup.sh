#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="cml-hive-assist-sandbox-browser:bookworm-slim"

docker build -t "${IMAGE_NAME}" -f Dockerfile.sandbox-browser .
echo "Built ${IMAGE_NAME}"
