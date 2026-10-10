# BharatCode Extensions

Public source and distribution for BharatCode’s included extensions and starter skills. Downloads require no GitHub account or access to the private harness repository.

The included extensions cover provider setup, subscription connections, skills, graphics, context, task boards, reference libraries, language-server actions, novel continuity, research and the extension store. Each extension retains its original licence and attribution.

Download a release archive and add the chosen extension through BharatCode’s plugin manager. The core-distribution archive includes the exact dependency archives used in the Linux packed-install fixture. Core extensions are already included in BharatCode. Subscription inference still requires the relevant provider account.

The discovery catalog also describes optional candidates. Their presence is not an installability claim: they remain unavailable until their platform-specific packaging and workflow qualification pass.

Starter skills are in `skills/`. Add this public repository from the Skills sidebar, search, inspect a skill and install it. The standard SKILL.md format also works with other compatible agent tools.

The subscription adapter is bundled with the BharatCode application and is excluded from this public extension snapshot. Its native OAuth client configuration is being reviewed separately. This repository contains no user credentials or subscription sessions.

The Linux x64 application preview is distributed as a standalone AppImage in the application release. It carries its own runtimes and included extensions. Provider setup can be deferred; the application does not include user accounts or sessions. Preview updates are manual. Keep the prior AppImage until the new version starts, and back up your profile before switching versions. Windows, ARM64 and paid-account inference are outside this Linux preview qualification.
