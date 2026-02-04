import Foundation
import Testing
@testable import CmlHiveAssist

@Suite(.serialized)
struct CmlHiveAssistConfigFileTests {
    @Test
    func configPathRespectsEnvOverride() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("cml-hive-assist-config-\(UUID().uuidString)")
            .appendingPathComponent("cml-hive-assist.json")
            .path

        await TestIsolation.withEnvValues(["CML_HIVE_ASSIST_CONFIG_PATH": override]) {
            #expect(CmlHiveAssistConfigFile.url().path == override)
        }
    }

    @MainActor
    @Test
    func remoteGatewayPortParsesAndMatchesHost() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("cml-hive-assist-config-\(UUID().uuidString)")
            .appendingPathComponent("cml-hive-assist.json")
            .path

        await TestIsolation.withEnvValues(["CML_HIVE_ASSIST_CONFIG_PATH": override]) {
            CmlHiveAssistConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "ws://gateway.ts.net:19999",
                    ],
                ],
            ])
            #expect(CmlHiveAssistConfigFile.remoteGatewayPort() == 19999)
            #expect(CmlHiveAssistConfigFile.remoteGatewayPort(matchingHost: "gateway.ts.net") == 19999)
            #expect(CmlHiveAssistConfigFile.remoteGatewayPort(matchingHost: "gateway") == 19999)
            #expect(CmlHiveAssistConfigFile.remoteGatewayPort(matchingHost: "other.ts.net") == nil)
        }
    }

    @MainActor
    @Test
    func setRemoteGatewayUrlPreservesScheme() async {
        let override = FileManager().temporaryDirectory
            .appendingPathComponent("cml-hive-assist-config-\(UUID().uuidString)")
            .appendingPathComponent("cml-hive-assist.json")
            .path

        await TestIsolation.withEnvValues(["CML_HIVE_ASSIST_CONFIG_PATH": override]) {
            CmlHiveAssistConfigFile.saveDict([
                "gateway": [
                    "remote": [
                        "url": "wss://old-host:111",
                    ],
                ],
            ])
            CmlHiveAssistConfigFile.setRemoteGatewayUrl(host: "new-host", port: 2222)
            let root = CmlHiveAssistConfigFile.loadDict()
            let url = ((root["gateway"] as? [String: Any])?["remote"] as? [String: Any])?["url"] as? String
            #expect(url == "wss://new-host:2222")
        }
    }

    @Test
    func stateDirOverrideSetsConfigPath() async {
        let dir = FileManager().temporaryDirectory
            .appendingPathComponent("cml-hive-assist-state-\(UUID().uuidString)", isDirectory: true)
            .path

        await TestIsolation.withEnvValues([
            "CML_HIVE_ASSIST_CONFIG_PATH": nil,
            "CML_HIVE_ASSIST_STATE_DIR": dir,
        ]) {
            #expect(CmlHiveAssistConfigFile.stateDirURL().path == dir)
            #expect(CmlHiveAssistConfigFile.url().path == "\(dir)/cml-hive-assist.json")
        }
    }
}
