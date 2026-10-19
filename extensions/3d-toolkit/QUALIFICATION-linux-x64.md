# Linux in-app qualification — 3D Toolkit 0.1.3

**Result:** passed for the local Linux desktop workflow. The package archive, source revision, and installed UI checks are recorded below. The public catalog entries remain `needs-qualification` until an immutable public archive and signed-catalog evidence are available.

## Artifact and package checks

- Package: `@bharatcode/3d-toolkit` `0.1.3`
- Source commit: `ece03b374a34141f9c8486916c0a3769cc4b61b3`
- Archive: `bharatcode-3d-toolkit-0.1.3-linux-x64.tgz`
- Archive size: 41,598,624 bytes
- Archive SHA-256: `bc0822f1aac47f3637d96e8d8d44f61058c58e8bfa25abefa6800d3d38e686c8`
- Linux x64 archive checks passed: exact dependencies and license files, executable esbuild binary, retained WASM files, and expanded size below the 256 MiB catalog limit.
- Package build passed and all 15 package tests passed.

## Installed UI checks

The active chat workspace selected the initial workspace, and the scene picker remained scoped to the selected workspace. Both Three.js and Babylon.js previews displayed and supported play, pause, seek, and time updates. Custom PNG width, height, and time controls worked. Three.js GLB and Babylon.js native JSON export downloads passed.

## Publication boundary

This is local Linux qualification evidence. The `3d-toolkit`, `three-pack`, and `babylon-pack` catalog entries remain `needs-qualification`; this source PR does not publish an immutable runtime archive or signed catalog update.
