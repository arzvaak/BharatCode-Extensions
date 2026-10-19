# DeepBlend for BharatCode

Curated source for the optional DeepBlend Studio native extension. It adapts the upstream `@deepblend/dsh-blender-bundle` release metadata for BharatCode `0.2.0-rc.2`; the adapter does not modify upstream application code.

- Upstream project: <https://github.com/pearjelly/deep-blend>
- Upstream release: `0.15.0`
- Upstream source commit: `467a83991d8353ffcc3db9446e3a9d22f65cb236`
- Upstream npm archive SHA-256: `b67542e9cd6108a5c3a1182672e3cde05bd7e40b3b4e9316b24fd72515cff05a`
- Adaptation: [adapt.mjs](./adapt.mjs)

The adapter verifies every expected manifest before editing and only extends declared peer/host version ranges to include the BharatCode preview version. Run it against an already verified, extracted upstream archive; it does not fetch or verify archive bytes itself. From the repository root, run its regression test with `node --test extensions/deepblend/test/adapter.test.mjs`.

DeepBlend requires Blender `5.2.1` or newer. FFmpeg and ffprobe are used for MP4 encoding. The package exposes a model preset with 18 tools and a workbench for scene creation, revisions, preview, final rendering, MP4 output, and editable `.blend` checkpoints. The local Linux in-app workflow was qualified against the adapted archive; see [the qualification record](./QUALIFICATION-linux-x64.md). The public catalog record remains `needs-qualification` until an immutable artifact and signed catalog evidence are published.

DeepBlend Studio upstream docs and usage: <https://github.com/pearjelly/deep-blend#readme>.
