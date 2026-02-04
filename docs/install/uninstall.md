---
summary: "Uninstall CmlHiveAssist completely (CLI, service, state, workspace)"
read_when:
  - You want to remove CmlHiveAssist from a machine
  - The gateway service is still running after uninstall
title: "Uninstall"
---

# Uninstall

Two paths:

- **Easy path** if `cml-hive-assist` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
cml-hive-assist uninstall
```

Non-interactive (automation / npx):

```bash
cml-hive-assist uninstall --all --yes --non-interactive
npx -y cml-hive-assist uninstall --all --yes --non-interactive
```

Manual steps (same result):

1. Stop the gateway service:

```bash
cml-hive-assist gateway stop
```

2. Uninstall the gateway service (launchd/systemd/schtasks):

```bash
cml-hive-assist gateway uninstall
```

3. Delete state + config:

```bash
rm -rf "${CML_HIVE_ASSIST_STATE_DIR:-$HOME/.cml-hive-assist}"
```

If you set `CML_HIVE_ASSIST_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4. Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/.cml-hive-assist/workspace
```

5. Remove the CLI install (pick the one you used):

```bash
npm rm -g cml-hive-assist
pnpm remove -g cml-hive-assist
bun remove -g cml-hive-assist
```

6. If you installed the macOS app:

```bash
rm -rf /Applications/CmlHiveAssist.app
```

Notes:

- If you used profiles (`--profile` / `CML_HIVE_ASSIST_PROFILE`), repeat step 3 for each state dir (defaults are `~/.cml-hive-assist-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `cml-hive-assist` is missing.

### macOS (launchd)

Default label is `bot.molt.gateway` (or `bot.molt.<profile>`; legacy `com.cml-hive-assist.*` may still exist):

```bash
launchctl bootout gui/$UID/bot.molt.gateway
rm -f ~/Library/LaunchAgents/bot.molt.gateway.plist
```

If you used a profile, replace the label and plist name with `bot.molt.<profile>`. Remove any legacy `com.cml-hive-assist.*` plists if present.

### Linux (systemd user unit)

Default unit name is `cml-hive-assist-gateway.service` (or `cml-hive-assist-gateway-<profile>.service`):

```bash
systemctl --user disable --now cml-hive-assist-gateway.service
rm -f ~/.config/systemd/user/cml-hive-assist-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `CmlHiveAssist Gateway` (or `CmlHiveAssist Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "CmlHiveAssist Gateway"
Remove-Item -Force "$env:USERPROFILE\.cml-hive-assist\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.cml-hive-assist-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://cml-hive-assist.ai/install.sh` or `install.ps1`, the CLI was installed with `npm install -g cml-hive-assist@latest`.
Remove it with `npm rm -g cml-hive-assist` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `cml-hive-assist ...` / `bun run cml-hive-assist ...`):

1. Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2. Delete the repo directory.
3. Remove state + workspace as shown above.
