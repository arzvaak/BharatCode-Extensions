# Linux in-app qualification — DeepBlend 0.15.0 English edition v3

**Status:** the exact English v3 package passed its compiled-package checks and installed-app qualification. The public catalog entry remains `needs-qualification` until an immutable public archive and signed-catalog evidence are available.

## Artifact identity

- Upstream release: `@deepblend/dsh-blender-bundle` `0.15.0`
- Upstream source commit: `467a83991d8353ffcc3db9446e3a9d22f65cb236`
- Upstream archive SHA-256: `b67542e9cd6108a5c3a1182672e3cde05bd7e40b3b4e9316b24fd72515cff05a`
- BharatCode English edition source commit: `63985494780b9ac2257c69f0bdfafcd894fecc05`
- Exact English v3 archive: `deepblend-v0.15.0-bc-0.2.0-rc.2-en-v3.tgz`
- Archive size: 70,667,288 bytes
- Archive SHA-256: `4168de9e5a2ff8b16fb751ac3eee7261bb09a6b1dc54ca386db05af1fdf6f72d`

The edition applies the BharatCode host metadata adaptation and English translations after verifying the upstream package. The derived archive hash identifies this edition; the upstream hash does not.

## Exact-package checks

The final compiled-package suite passed **7/7** checks. It covers the active bundle-root client entry, the nested standalone UI client, English QA and job display contracts, translated recipe hashes, and preservation of recipe geometry and timing.

## Installed-app qualification

- All six DeepBlend tabs rendered without Chinese text, and the active bundle-root client delivery marker loaded.
- A completed animation played in the app with `readyState=4`, a 2-second duration, and 960×720 dimensions. Playback advanced to 0.694 seconds; seeking and pausing at 1.25 seconds worked.
- The MP4 download returned HTTP 200 with `video/mp4`, 153,241 bytes, and SHA-256 `3dee2a0e51f2661a66ff429b6691c56512602e027dc159543a31624507666fcc`.
- The downloaded H.264 render contains 48 frames at 24 fps. The compared frames 1, 12, 24, and 36 differ from frame 1 in 0, 114,269, 123,605, and 204,787 pixels, respectively; the first and last frames close the full turn.
- Completed-job delivery defaults to the final render profile with both frame-range fields blank, and the UI explains that this renders the full project range of frames 1–48 at 24 fps.
- Final cleanup verification passed after a normal installed-app relaunch: English remained selected, the global maximum setting was unchanged, and temporary debugger instrumentation and listener were absent.

The installed-app acceptance and normal-restart cleanup checks passed. This source record contains no local runtime paths, process identifiers, debugging ports, or capability URLs.

## Publication boundary

This source PR publishes no runtime archive. The `deepblend` catalog entry remains `needs-qualification` until an immutable public archive and valid signed-catalog evidence are published.
