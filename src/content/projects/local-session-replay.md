---
title: Local Session Replay
year: 2026
role: Open Source
summary: Local-only session replay and think-aloud recording for web prototypes. Drop it into any app; testers download one self-contained HTML file, and nothing leaves their machine.
stack: [JavaScript, React, Usability Testing]
repo: https://github.com/joesteinkamp/local-session-replay
featured: false
accent: p3
order: 10
---

Usability testing a prototype usually means a recording service, a consent form, and a data-handling question. This one skips all three.

Mount it in a React or vanilla app, open the app with `?test=1`, and testers run scripted tasks while thinking aloud. When they're done, they download a single HTML file with the replay, synced audio, and a summary an agent can read. No backend and no third-party services. The recorder only loads while testing is active, so everyone else pays about 1 KB.
