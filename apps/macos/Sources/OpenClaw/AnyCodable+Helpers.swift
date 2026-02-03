import CmlHiveAssistKit
import CmlHiveAssistProtocol
import Foundation

// Prefer the CmlHiveAssistKit wrapper to keep gateway request payloads consistent.
typealias AnyCodable = CmlHiveAssistKit.AnyCodable
typealias InstanceIdentity = CmlHiveAssistKit.InstanceIdentity

extension AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: AnyCodable]? { self.value as? [String: AnyCodable] }
    var arrayValue: [AnyCodable]? { self.value as? [AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}

extension CmlHiveAssistProtocol.AnyCodable {
    var stringValue: String? { self.value as? String }
    var boolValue: Bool? { self.value as? Bool }
    var intValue: Int? { self.value as? Int }
    var doubleValue: Double? { self.value as? Double }
    var dictionaryValue: [String: CmlHiveAssistProtocol.AnyCodable]? { self.value as? [String: CmlHiveAssistProtocol.AnyCodable] }
    var arrayValue: [CmlHiveAssistProtocol.AnyCodable]? { self.value as? [CmlHiveAssistProtocol.AnyCodable] }

    var foundationValue: Any {
        switch self.value {
        case let dict as [String: CmlHiveAssistProtocol.AnyCodable]:
            dict.mapValues { $0.foundationValue }
        case let array as [CmlHiveAssistProtocol.AnyCodable]:
            array.map(\.foundationValue)
        default:
            self.value
        }
    }
}
