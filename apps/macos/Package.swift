// swift-tools-version: 6.2
// Package manifest for the CmlHiveAssist macOS companion (menu bar app + IPC library).

import PackageDescription

let package = Package(
    name: "CmlHiveAssist",
    platforms: [
        .macOS(.v15),
    ],
    products: [
        .library(name: "CmlHiveAssistIPC", targets: ["CmlHiveAssistIPC"]),
        .library(name: "CmlHiveAssistDiscovery", targets: ["CmlHiveAssistDiscovery"]),
        .executable(name: "CmlHiveAssist", targets: ["CmlHiveAssist"]),
        .executable(name: "cml-hive-assist-mac", targets: ["CmlHiveAssistMacCLI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/orchetect/MenuBarExtraAccess", exact: "1.2.2"),
        .package(url: "https://github.com/swiftlang/swift-subprocess.git", from: "0.1.0"),
        .package(url: "https://github.com/apple/swift-log.git", from: "1.8.0"),
        .package(url: "https://github.com/sparkle-project/Sparkle", from: "2.8.1"),
        .package(url: "https://github.com/steipete/Peekaboo.git", branch: "main"),
        .package(path: "../shared/CmlHiveAssistKit"),
        .package(path: "../../Swabble"),
    ],
    targets: [
        .target(
            name: "CmlHiveAssistIPC",
            dependencies: [],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CmlHiveAssistDiscovery",
            dependencies: [
                .product(name: "CmlHiveAssistKit", package: "CmlHiveAssistKit"),
            ],
            path: "Sources/CmlHiveAssistDiscovery",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "CmlHiveAssist",
            dependencies: [
                "CmlHiveAssistIPC",
                "CmlHiveAssistDiscovery",
                .product(name: "CmlHiveAssistKit", package: "CmlHiveAssistKit"),
                .product(name: "CmlHiveAssistChatUI", package: "CmlHiveAssistKit"),
                .product(name: "CmlHiveAssistProtocol", package: "CmlHiveAssistKit"),
                .product(name: "SwabbleKit", package: "swabble"),
                .product(name: "MenuBarExtraAccess", package: "MenuBarExtraAccess"),
                .product(name: "Subprocess", package: "swift-subprocess"),
                .product(name: "Logging", package: "swift-log"),
                .product(name: "Sparkle", package: "Sparkle"),
                .product(name: "PeekabooBridge", package: "Peekaboo"),
                .product(name: "PeekabooAutomationKit", package: "Peekaboo"),
            ],
            exclude: [
                "Resources/Info.plist",
            ],
            resources: [
                .copy("Resources/CmlHiveAssist.icns"),
                .copy("Resources/DeviceModels"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .executableTarget(
            name: "CmlHiveAssistMacCLI",
            dependencies: [
                "CmlHiveAssistDiscovery",
                .product(name: "CmlHiveAssistKit", package: "CmlHiveAssistKit"),
                .product(name: "CmlHiveAssistProtocol", package: "CmlHiveAssistKit"),
            ],
            path: "Sources/CmlHiveAssistMacCLI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "CmlHiveAssistIPCTests",
            dependencies: [
                "CmlHiveAssistIPC",
                "CmlHiveAssist",
                "CmlHiveAssistDiscovery",
                .product(name: "CmlHiveAssistProtocol", package: "CmlHiveAssistKit"),
                .product(name: "SwabbleKit", package: "swabble"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
