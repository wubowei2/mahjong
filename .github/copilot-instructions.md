- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements. Static site for a Chinese Official Mahjong fan calculator. User enters a winning hand and flower count.
- [x] Scaffold the Project. Node.js is not installed, so the site is plain HTML, CSS, and JavaScript instead of Vite.
- [x] Customize the Project. Scoring covers the 81 MCR fan patterns, flower tiles, and common exclusion rules.
- [x] Install Required Extensions. No extensions were required.
- [x] Compile the Project. No build step. Static checks confirmed 81 unique fan names.
- [x] Create and Run Task. Default task opens index.html.
- [x] Launch the Project. User confirmed debug mode. Serve the site locally and launch the browser debugger.
- [x] Ensure Documentation is Complete. README.md describes how to enter a hand and calculate the score.

Project notes:
- Open index.html in a browser, or debug through http://127.0.0.1:8765 so ES modules load.
- Flower tiles score 1 fan each, from 0 to 8. A hand needs 8 fan to win. A winning hand with no other fan scores 无番和 for 8.
- Chinese popular mahjong entry: no winning-tile field and no exposed-meld section. All groups go in the concealed hand. Edge, closed, and last-tile waits are checkboxes.
