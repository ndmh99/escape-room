# 🚪 Escape Room

![Game Status](https://img.shields.io/badge/status-in%20development-yellow)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📖 Overview

Escape Room is an interactive adventure game where players navigate through dynamic levels to retrieve keys and hammers hidden within cactuses and treasure boxes. Players must use their problem-solving skills to answer questions correctly to progress through levels and avoid aggressive skeletons patrolling the area.

## 🎮 Gameplay

Navigate through obstacles, collect items, and answer questions to escape each room. Beware of skeletons - a single touch means game over!

### 🎯 Game Mechanics

- **Arrow keys**: Move your character
- **Letter keys**: Answer questions
- **Hidden items**: Search cactuses and boxes for keys and hammers
- **Obstacles**: Avoid rocks and fires that block your path
- **Enemies**: Stay away from patrolling skeletons

### 🌵 Level Structure

#### Level 1: The Key Challenge
1. Find a key hidden in a cactus or box
2. Open the chest with the key
3. Answer the question correctly to advance

#### Level 2: The Hammer Quest
1. Find a hammer hidden in the environment
2. Break the door with the hammer
3. Reach the exit
4. Answer the final question to escape

## ⚙️ Technical Features

- Vanilla JavaScript implementation with no external libraries
- Custom collision detection system
- Randomized item placement for replayability
- Interactive question and answer system
- Immersive sound effects and background music

## 🎵 Audio Experience

The game features carefully selected sound effects and background music that enhance the gaming experience. We **highly recommend** playing with volume turned on for full immersion.

## 🐞 Known Issues

- Alert popups may repeat when revisiting areas where items were previously collected
- Visual artifacts may remain after collecting keys (clearRect issues)
- Some collision detection edge cases remain to be fixed

## 🔧 Technical Implementation

The game is built using pure JavaScript, HTML5 Canvas, and CSS. Audio elements are implemented using local sounds.

```javascript
// Example of player movement implementation
function movePlayer(direction) {
  switch(direction) {
    case 'up':
      if(!checkCollision(player.x, player.y - player.speed)) {
        player.y -= player.speed;
      }
      break;
    // other directions...
  }
  redrawGameElements();
}
```

## 🚀 Future Enhancements

- Additional levels with increasing difficulty
- More puzzle types and interactive elements
- Character customization options
- Leaderboard and scoring system

---

Happy escaping! 🗝️🔨
