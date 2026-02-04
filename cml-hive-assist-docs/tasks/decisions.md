# Decision Log

All decisions for this cleanup project are pre-approved as YES.

## Task 1: Remove Skills

| Decision                      | Answer | Rationale                                                                                     |
| ----------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| Remove discord skill?         | YES    | Not in keep list                                                                              |
| Remove slack skill?           | YES    | Not in keep list (keeping channel in src/, not skill)                                         |
| Remove imsg skill?            | YES    | Not in keep list                                                                              |
| Remove bluebubbles skill?     | YES    | Not in keep list                                                                              |
| Remove signal skill?          | YES    | Not in keep list                                                                              |
| Remove other non-core skills? | YES    | Only keeping WhatsApp, Telegram, WebChat related + healthcheck, skill-creator, security-audit |

## Task 2: Remove Apps/Channels

| Decision                   | Answer | Rationale                           |
| -------------------------- | ------ | ----------------------------------- |
| Remove src/discord/?       | YES    | Not enterprise                      |
| Remove src/signal/?        | YES    | Not enterprise                      |
| Remove src/imessage/?      | YES    | Apple-specific, not enterprise      |
| Remove src/line/?          | YES    | Not enterprise                      |
| Remove related extensions? | YES    | Cleaning up non-enterprise channels |
| Keep src/slack/?           | YES    | Enterprise channel                  |
| Keep src/telegram/?        | YES    | Core channel                        |
| Keep src/whatsapp/?        | YES    | Core channel                        |
| Keep src/web/?             | YES    | WebChat core                        |
| Keep msteams extension?    | YES    | Enterprise channel                  |

## Task 3: Create New UI

| Decision                    | Answer | Rationale          |
| --------------------------- | ------ | ------------------ |
| Create cml-hive-assist-ui?  | YES    | Requested task     |
| Follow frontend guidelines? | YES    | Required standard  |
| Add to build system?        | YES    | Required for CI/CD |
