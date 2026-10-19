# Linux in-app qualification — 3D Toolkit 0.1.1

**Result:** passed on the installed BharatCode `0.2.0-rc.2` desktop profile. The test used BharatCode's configured DeepSeek route in real app chats and the actual 3D Studio renderer. This qualifies the local Linux artifact and workflows; the public catalog entries remain `needs-qualification` until an immutable public artifact and the signed-catalog release evidence are available.

## Artifact and package checks

- Package: `@bharatcode/3d-toolkit` `0.1.1`
- Source commit: `aea4dfe0a988652c75a8c73f5fc58fee5ae79699`
- Linux archive: `bharatcode-3d-toolkit-0.1.1-linux-x64.tgz`
- Archive SHA-256: `37e4f3f93b38e0df5d33e8693eb8d3dec85da3e872c16e71bd57af019d19a06d`
- Confirmed installed in the desktop profile with its Cordis bundle enabled.
- Package build and all 15 package tests passed for the source commit, including visible-size initialization and resize regression coverage.

## In-app model and renderer checks

The configured model route was `bharatcode/deepseek-v4.1-flash`. The 0.1.1 artifact recheck reused the saved projects from the earlier create/edit tests, then requested project reads, visible Studio previews, renders and exports. All listed model tool calls returned successfully.

| Engine | Effort | Studio canvas | DeepSeek tool results | Output verification |
| --- | --- | --- | --- | --- |
| Three.js | Max | Ready; 3 meshes; visible 723×426 CSS and drawing-buffer dimensions | `three_project_get`, `three_render`, `three_export` GLB/source/viewer passed | 480×320 PNG; valid glTF 2.0 GLB; valid editable source ZIP; valid offline viewer ZIP |
| Babylon.js | Low | Ready; 2 meshes; visible 723×426 CSS and drawing-buffer dimensions | `babylon_project_get`, `babylon_render`, `babylon_export` GLB/Babylon JSON/source/viewer passed | 480×320 PNG; valid glTF 2.0 GLB; valid Babylon JSON with 2 meshes and 2 materials; valid source and offline viewer ZIPs |

The actual Studio canvases were inspected after opening the preview panes: the Three.js sculpture, floor and shadows were visible, as were the Babylon.js knot, ground plane and shadow. Export files were validated by format and ZIP contents.

The following output hashes identify the verified files without publishing generated project content:

| Engine / output | Bytes | SHA-256 |
| --- | ---: | --- |
| Three.js render PNG | 26,135 | `d92c15f67db45814246aa604efe38bc6a974b0c2a87388e6d761e9b7344f60d0` |
| Three.js GLB | 215,556 | `7d96dbcca9ed41c8b03a7aaca175c86c5e91638c334f7f077718ccfb7b742804` |
| Three.js source ZIP | 1,722 | `ddfebc0ba3cff284349e930167b6e02d967c7a25a940869aed142133b6389191` |
| Three.js viewer ZIP | 315,099 | `c1266e4a0e606238b383a60284509ed438bf8b89e9a3f7547845ebf4da21166d` |
| Babylon.js render PNG | 18,344 | `8957650db984eaf029ba01d5f6b44213c08ada89611b40e76c12d070551db7f0` |
| Babylon.js GLB | 104,884 | `e43e00a5efff2810e8c096b59672aa6b2926562892fcde5d0f608184404ab07f` |
| Babylon.js JSON | 426,857 | `f88ef4df5001da01b85cb0fced38a28896af3a33addabd7e9acfb0a01d32bb86` |
| Babylon.js source ZIP | 1,364 | `4ae7865e92d9933e80c2d147b72ba50b3172b9b8b5618e7bdde9a63c4c29998d` |
| Babylon.js viewer ZIP | 3,394,288 | `697cfbb97bf2ffca47f549fa8cae2ea8aaec9457283aa8f4bbd2204d6e600f33` |

## Publication boundary

The archive was qualified locally and is not attached to this source repository. The `3d-toolkit`, `three-pack` and `babylon-pack` catalog entries therefore remain `needs-qualification`; this report does not assert that a signed catalog or public download is available.
