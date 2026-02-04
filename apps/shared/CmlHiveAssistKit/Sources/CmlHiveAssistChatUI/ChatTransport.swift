import Foundation

public enum CmlHiveAssistChatTransportEvent: Sendable {
    case health(ok: Bool)
    case tick
    case chat(CmlHiveAssistChatEventPayload)
    case agent(CmlHiveAssistAgentEventPayload)
    case seqGap
}

public protocol CmlHiveAssistChatTransport: Sendable {
    func requestHistory(sessionKey: String) async throws -> CmlHiveAssistChatHistoryPayload
    func sendMessage(
        sessionKey: String,
        message: String,
        thinking: String,
        idempotencyKey: String,
        attachments: [CmlHiveAssistChatAttachmentPayload]) async throws -> CmlHiveAssistChatSendResponse

    func abortRun(sessionKey: String, runId: String) async throws
    func listSessions(limit: Int?) async throws -> CmlHiveAssistChatSessionsListResponse

    func requestHealth(timeoutMs: Int) async throws -> Bool
    func events() -> AsyncStream<CmlHiveAssistChatTransportEvent>

    func setActiveSessionKey(_ sessionKey: String) async throws
}

extension CmlHiveAssistChatTransport {
    public func setActiveSessionKey(_: String) async throws {}

    public func abortRun(sessionKey _: String, runId _: String) async throws {
        throw NSError(
            domain: "CmlHiveAssistChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "chat.abort not supported by this transport"])
    }

    public func listSessions(limit _: Int?) async throws -> CmlHiveAssistChatSessionsListResponse {
        throw NSError(
            domain: "CmlHiveAssistChatTransport",
            code: 0,
            userInfo: [NSLocalizedDescriptionKey: "sessions.list not supported by this transport"])
    }
}
