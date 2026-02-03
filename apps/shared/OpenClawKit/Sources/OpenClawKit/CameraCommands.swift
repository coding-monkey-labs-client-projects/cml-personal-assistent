import Foundation

public enum CmlHiveAssistCameraCommand: String, Codable, Sendable {
    case list = "camera.list"
    case snap = "camera.snap"
    case clip = "camera.clip"
}

public enum CmlHiveAssistCameraFacing: String, Codable, Sendable {
    case back
    case front
}

public enum CmlHiveAssistCameraImageFormat: String, Codable, Sendable {
    case jpg
    case jpeg
}

public enum CmlHiveAssistCameraVideoFormat: String, Codable, Sendable {
    case mp4
}

public struct CmlHiveAssistCameraSnapParams: Codable, Sendable, Equatable {
    public var facing: CmlHiveAssistCameraFacing?
    public var maxWidth: Int?
    public var quality: Double?
    public var format: CmlHiveAssistCameraImageFormat?
    public var deviceId: String?
    public var delayMs: Int?

    public init(
        facing: CmlHiveAssistCameraFacing? = nil,
        maxWidth: Int? = nil,
        quality: Double? = nil,
        format: CmlHiveAssistCameraImageFormat? = nil,
        deviceId: String? = nil,
        delayMs: Int? = nil)
    {
        self.facing = facing
        self.maxWidth = maxWidth
        self.quality = quality
        self.format = format
        self.deviceId = deviceId
        self.delayMs = delayMs
    }
}

public struct CmlHiveAssistCameraClipParams: Codable, Sendable, Equatable {
    public var facing: CmlHiveAssistCameraFacing?
    public var durationMs: Int?
    public var includeAudio: Bool?
    public var format: CmlHiveAssistCameraVideoFormat?
    public var deviceId: String?

    public init(
        facing: CmlHiveAssistCameraFacing? = nil,
        durationMs: Int? = nil,
        includeAudio: Bool? = nil,
        format: CmlHiveAssistCameraVideoFormat? = nil,
        deviceId: String? = nil)
    {
        self.facing = facing
        self.durationMs = durationMs
        self.includeAudio = includeAudio
        self.format = format
        self.deviceId = deviceId
    }
}
