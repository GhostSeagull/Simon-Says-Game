# Simon Says Game 

[🎮Play it here🎮](https://ghostseagull.github.io/Simon-Says-Game/)

A browser-based Simon Says game built as part of **Angela Yu's Complete Web Developer Bootcamp**.

## How to play

- Press any key to start the game
- Watch which colour lights up and listen to its sound
- Repeat the sequence by clicking the buttons
- Each round adds one new colour to the sequence
- Wrong button? Red flash, wrong sound, game over — press any key to restart

## What's mine and what's from the course

| File | Author |
|------|--------|
| `game.js` | Me (written independently, without following the guided solution) |
| `index.html` | Provided by the course |
| `styles.css` | Provided by the course |
| `sounds/` | Provided by the course |

## My process

I started by following the first steps of the course to set up `nextSequence` and the initial game variables. Once I understood the structure, I decided to continue on my own without following the guided solution.

My first attempt got complicated fast — I had everything inside the click handler and the logic became hard to reason about. When I ran into bugs I couldn't debug, I stopped and rewrote from scratch, starting with pseudocode: *what should happen on each click? what counts as game over? how do I prevent invalid state?*

That approach worked. I broke the logic into focused functions (`changeTitle`, `gameOver`, `nextSequence`) and built up the click handler step by step, testing as I went. I also made sure to handle the case where `userPattern` exceeds `gamePattern` length — without that check, extra clicks between sequences wouldn't be caught as an error.

## Bugs I found and fixed

**The main bug: `nextSequence` firing after game over**

When a player fails and then keeps clicking rapidly, the `setTimeout(nextSequence, 1000)` that was already queued would still fire — even though the game was over. This caused the game to silently restart without waiting for a key press.

My fix: added a `if (!isGameOver)` guard at the start of `nextSequence`. If the game is already over by the time the timeout fires, the call does nothing.

**Interestingly, this same bug exists in Angela Yu's official solution.** If you start the game, then quickly click wrong colours, the next sequence plays automatically without waiting for a key press. My implementation handles this correctly.

## Built with

- JavaScript (vanilla logic)
- jQuery (DOM manipulation and events)
- HTML5 Audio API

---

*Part of my learning journey through Angela Yu's Web Development Bootcamp.*