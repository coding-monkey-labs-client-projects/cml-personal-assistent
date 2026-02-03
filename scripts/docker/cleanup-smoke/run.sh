#!/usr/bin/env bash
set -euo pipefail

cd /repo

export CML_HIVE_ASSIST_STATE_DIR="/tmp/cml-hive-assist-test"
export CML_HIVE_ASSIST_CONFIG_PATH="${CML_HIVE_ASSIST_STATE_DIR}/cml-hive-assist.json"

echo "==> Build"
pnpm build

echo "==> Seed state"
mkdir -p "${CML_HIVE_ASSIST_STATE_DIR}/credentials"
mkdir -p "${CML_HIVE_ASSIST_STATE_DIR}/agents/main/sessions"
echo '{}' >"${CML_HIVE_ASSIST_CONFIG_PATH}"
echo 'creds' >"${CML_HIVE_ASSIST_STATE_DIR}/credentials/marker.txt"
echo 'session' >"${CML_HIVE_ASSIST_STATE_DIR}/agents/main/sessions/sessions.json"

echo "==> Reset (config+creds+sessions)"
pnpm cml-hive-assist reset --scope config+creds+sessions --yes --non-interactive

test ! -f "${CML_HIVE_ASSIST_CONFIG_PATH}"
test ! -d "${CML_HIVE_ASSIST_STATE_DIR}/credentials"
test ! -d "${CML_HIVE_ASSIST_STATE_DIR}/agents/main/sessions"

echo "==> Recreate minimal config"
mkdir -p "${CML_HIVE_ASSIST_STATE_DIR}/credentials"
echo '{}' >"${CML_HIVE_ASSIST_CONFIG_PATH}"

echo "==> Uninstall (state only)"
pnpm cml-hive-assist uninstall --state --yes --non-interactive

test ! -d "${CML_HIVE_ASSIST_STATE_DIR}"

echo "OK"
