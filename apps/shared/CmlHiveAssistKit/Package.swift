// swift-tools-version: 6.2

import PackageDescription

let package = Package(
    name: "CmlHiveAssistKit",
    platforms: [
        .iOS(.v18),
        .macOS(.v15),
    ],
    products: [
        .library(name: "CmlHiveAssistProtocol", targets: ["CmlHiveAssistProtocol"]),
        .library(name: "CmlHiveAssistKit", targets: ["CmlHiveAssistKit"]),
        .library(name: "CmlHiveAssistChatUI", targets: ["CmlHiveAssistChatUI"]),
    ],
    dependencies: [
        .package(url: "https://github.com/steipete/ElevenLabsKit", exact: "0.1.0"),
        .package(url: "https://github.com/gonzalezreal/textual", exact: "0.3.1"),
    ],
    targets: [
        .target(
            name: "CmlHiveAssistProtocol",
            path: "Sources/CmlHiveAssistProtocol",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CmlHiveAssistKit",
            dependencies: [
                "CmlHiveAssistProtocol",
                .product(name: "ElevenLabsKit", package: "ElevenLabsKit"),
            ],
            path: "Sources/CmlHiveAssistKit",
            resources: [
                .process("Resources"),
            ],
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .target(
            name: "CmlHiveAssistChatUI",
            dependencies: [
                "CmlHiveAssistKit",
                .product(
                    name: "Textual",
                    package: "textual",
                    condition: .when(platforms: [.macOS, .iOS])),
            ],
            path: "Sources/CmlHiveAssistChatUI",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
            ]),
        .testTarget(
            name: "CmlHiveAssistKitTests",
            dependencies: ["CmlHiveAssistKit", "CmlHiveAssistChatUI"],
            path: "Tests/CmlHiveAssistKitTests",
            swiftSettings: [
                .enableUpcomingFeature("StrictConcurrency"),
                .enableExperimentalFeature("SwiftTesting"),
            ]),
    ])
