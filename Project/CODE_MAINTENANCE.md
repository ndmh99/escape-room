# Code Maintenance Guide

This document provides guidelines for maintaining, updating, and extending the Escape Room Game codebase.

## Code Organization

### File Naming Conventions

- HTML files: `levelX.html` (where X is the level number)
- JavaScript files: `levelX-script.js` (corresponding to each level)
- Asset files: Descriptive names with appropriate prefixes:
  - `character-[action]-animation.png` for character sprites
  - `[object]-lv[X]-obstacle.png` for level-specific obstacles

### Core Components

1. **Player Character**
   - Movement controls in `mainChar()` function
   - Collision detection with obstacles and enemies
   - Sprite animation based on movement direction

2. **Enemies (Skeletons)**
   - Created using the `Skeleton` constructor
   - Movement patterns defined by direction parameter (vertical/horizontal)
   - Collision detection with player

3. **Obstacles**
   - Static obstacles (rocks, cacti) to block player movement
   - Animated obstacles (fire) with animation cycles
   - Key hiding mechanics associated with obstacles

4. **Key and Exit Mechanics**
   - Hidden key randomly placed in each level
   - Exit unlocked when key is found
   - Riddle challenge triggered at exit

## Common Maintenance Tasks

### Adding New Sprites

1. Add sprite files to the appropriate directory in `assets/images/`
2. Load the sprites in the JavaScript file:
   ```javascript
   let new_sprite = new Image();
   new_sprite.src = "../assets/images/path/to/sprite.png";
   ```
3. Use the sprite in drawing functions as needed

### Modifying Level Difficulty

1. **Adjust Enemy Patterns**
   - Change the parameters in the Skeleton constructor calls:
   ```javascript
   let skeleton = new Skeleton(x, y, direction, initialSprite, startBound, endBound);
   ```

2. **Modify Obstacle Layouts**
   - Update the coordinates in the xBrick/yBrick and xStone/yStone arrays

3. **Change Riddle Difficulty**
   - Modify the question and answer in the challenge function:
   ```javascript
   let question = {
       prompt: "Your riddle here?",
       answer: "answer"
   }
   ```

### Adding New Mechanics

1. Define new object images and positions
2. Implement collision detection in the `mainChar()` function
3. Add game logic for the new mechanic
4. Test thoroughly for interactions with existing mechanics

## Known Issues and Solutions

### Collision Detection Inaccuracies

The current collision detection is based on rectangular boundaries and may sometimes feel imprecise. If needed, you can improve it by:

1. Adjusting the collision box sizes in the if-conditions
2. Implementing a more precise hit-detection algorithm

### Animation Flicker

Occasional flickering may occur due to the clearing and redrawing of sprites. To reduce this:

1. Implement double-buffering with off-screen canvas
2. Only clear and redraw the necessary parts of the canvas

### Memory Management

The game may consume increasing memory over time due to:

1. Animation intervals not being properly cleared
2. Event listeners accumulating

Always ensure that intervals are cleared when no longer needed and consider using event delegation.

## Performance Optimization Tips

1. **Sprite Management**
   - Use sprite sheets rather than individual images
   - Preload all assets at the beginning of the level

2. **Canvas Operations**
   - Minimize the number of canvas operations
   - Group similar drawing operations
   - Use `requestAnimationFrame()` instead of `setInterval()`

3. **Event Handling**
   - Debounce or throttle event handlers for performance
   - Use event delegation where appropriate

## Extending the Game

### Adding a New Level

1. Create HTML and JS files for the new level
2. Create assets directory for level-specific images
3. Connect it to the previous level through the `nextlv()` function
4. Update the level transition logic

### Adding New Enemies

1. Create sprite sheets for the new enemy
2. Create a constructor function for the new enemy type
3. Implement movement and collision logic
4. Instantiate the enemies in the level setup

### Adding New Game Mechanics

1. Design and implement the new game mechanic
2. Test for interactions with existing mechanics
3. Update documentation to reflect the new features
4. Ensure consistent user experience across levels

## Documentation Standards

Always document your code following these guidelines:

1. **File Headers**
   ```javascript
   /**
    * Escape Room Game - Level X Script
    * Created by: [Your Name]
    * Last updated: [Date]
    * 
    * Description:
    * [Brief description of the level and its features]
    * 
    * Game Mechanics:
    * - [List of key mechanics]
    */
   ```

2. **Function Documentation**
   ```javascript
   /**
    * Function description
    * 
    * @param {Type} paramName - Description
    * @returns {Type} Description of return value
    */
   ```

3. **Object Documentation**
   ```javascript
   /**
    * Object that manages [purpose]
    * [Additional description]
    */
   ```

## Testing Checklist

Before committing changes, verify:

1. Game starts correctly from index.html
2. Character movement works in all directions
3. Collision detection functions properly
4. Enemies move as expected and detect collisions
5. Key can be found and collected
6. Exit and riddle mechanics work correctly
7. Transitions between levels function properly
8. No JavaScript errors in the console
9. Performance is acceptable

Remember that thorough testing prevents regressions and ensures a good player experience.
