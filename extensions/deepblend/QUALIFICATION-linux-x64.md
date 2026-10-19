# Linux in-app qualification — DeepBlend 0.15.0

**Result:** passed for the locally installed BharatCode `0.2.0-rc.2` profile, using the regular `DeepBlend Studio` preset and the configured DeepSeek route. The public catalog entry remains `needs-qualification` because this source branch does not publish a hash-bound artifact or signed catalog update.

## Artifact and runtime

- Upstream package: `@deepblend/dsh-blender-bundle` `0.15.0`
- Upstream source commit: `467a83991d8353ffcc3db9446e3a9d22f65cb236`
- BharatCode adaptation archive: `deepblend-v0.15.0-bc-0.2.0-rc.2-adapted.tgz`
- Adapted archive SHA-256: `cf0d50e66dd4a77e5ee8ed18eb5edfcd910ea94a30781b9485b5dc738a76d839`
- Blender: `5.2.1 LTS`; the installed capability probe passed. EEVEE, Cycles and Workbench were reported available; FFmpeg/ffprobe were available for video validation.
- Recipe: `deepblend.glazed-cup@3.1.0`, digest `db9859743b99e6f18329c7e7b10d67879f1a8b0a0d2174ba0a074eb0cede7971`.

## In-app DeepSeek workflow

Model route: `bharatcode/deepseek-v4.1-flash`, reasoning effort `Low`. The scoped preset exposed the Blender tool set only for the DeepBlend session. These calls succeeded: `blender_capabilities`, `blender_recipe_list`, `blender_project_create`, `blender_recipe_parameters` (read and save), `blender_preview_render`, `blender_final_render`, `blender_job_status` and `blender_export`.

The model created a glazed handled cup, saved the 110 mm height parameter as revision `r0002`, produced and inspected the 640×480 preview, rendered the final frame, and exported a verified complete delivery manifest. The editable checkpoint is a valid Blender 5+ file. Output hashes:

| Output | Bytes | SHA-256 |
| --- | ---: | --- |
| Editable `.blend` checkpoint, revision `r0002` | 4,673,954 | `9c6b7dd4372ffbc27489e453d8f172b38db671c3c0c4816c51aa12ff9e80b62d` |
| 640×480 preview PNG | 274,701 | `d23af504498eb2951a9b7ef5366c28ec123335176cb2c66543ba688c6344743e` |
| Final MP4, H.264 | 10,457 | `23cc9cb18da67f4a680eab6deac7a82dece4cb29664c754f3ff3b5272e96e3a5` |
| Verified delivery manifest | 6,474 | `b46d1212959ecceb33960f691f3d0618b7f73f8565b5537d3ee20b39247e93aa` |

The MP4 is a single-frame output: frame 1 only, 960×720, 24 fps, 0.041667 seconds. `ffprobe` passed. The delivery manifest reported `complete=true`, `verified=true` and no problems. The model's final prose was stopped after its actual Blender calls had completed; the saved tool outputs and completed render/export job are the qualification evidence.

## Publication boundary

This verifies the local adapted Linux archive and installed workflow. The public `deepblend` catalog record remains `needs-qualification` until the exact archive is published immutably and its signed catalog record can be updated under the release signing process.
