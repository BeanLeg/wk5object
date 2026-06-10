// ============================================================
// Week 5 Example 2 — Animated Flower
// ============================================================

// ------------------------------------------------------------
// FLOWER SPRITE CONFIGURATION
// Flower sheet: 256 x 32px — 8 frames in a single row.
// Adjust these values to match your own sprite sheet.
// ------------------------------------------------------------
const FLOWER = {
  frameWidth: 704, // 5632 total / 8 frames
  frameHeight: 704, // only one row, full sheet height
  numFrames: 8, // 8 frames of spin animation
  animSpeed: 10, // draw() frames per sprite frame (lower = faster)
  scale: 0.1, // scale up so the flower is visible on screen
};

// ------------------------------------------------------------
// FLOWER OBJECTS
// Each flower is an object with a position and its own
// frame and frameTimer so they animate independently.
// Storing flowers in an array means we can loop through
// and update or draw all of them with a single for loop.
// Starting each flower on a different frame gives visual variety —
// they won't all spin in sync.
// ------------------------------------------------------------
let flowers = [
  { x: 200, y: 150, frame: 0, frameTimer: 0 },
  { x: 400, y: 280, frame: 2, frameTimer: 0 }, // offset start frame for variety
  { x: 600, y: 180, frame: 5, frameTimer: 0 },
  { x: 300, y: 350, frame: 3, frameTimer: 0 },
  { x: 550, y: 360, frame: 1, frameTimer: 0 },
];

let flowerSheet; // the loaded flower sprite sheet image

// ============================================================
// preload()
// Runs once before setup(). Always load images here so they
// are ready before the sketch tries to use them.
// ============================================================
function preload() {
  flowerSheet = loadImage("assets/images/flowerObject.png");
}

// ============================================================
// setup()
// Runs once at the very start of the sketch.
// imageMode(CENTER) makes image() draw from the centre point
// rather than the top-left corner.
// ============================================================
function setup() {
  createCanvas(800, 450);
  imageMode(CENTER);
}

// ============================================================
// draw()
// Runs repeatedly in a loop after setup() finishes.
// Update and draw are called separately to keep responsibilities clear:
// updateFlowers() advances animation state,
// drawFlowers() renders the current state to the canvas.
// ============================================================
function draw() {
  background(30);

  updateFlowers();
  drawFlowers();
  drawHUD();
}

// ------------------------------------------------------------
// updateFlowers()
// Loops through every flower and advances its animation frame.
// Each flower has its own frameTimer so they animate independently.
// frameTimer counts up every draw() call; when it reaches
// animSpeed, the frame advances and the timer resets.
// % numFrames wraps the frame back to 0 after the last frame.
// ------------------------------------------------------------
function updateFlowers() {
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];

    // Advance the animation timer each frame
    flower.frameTimer++;
    if (flower.frameTimer >= FLOWER.animSpeed) {
      flower.frameTimer = 0;
      flower.frame = (flower.frame + 1) % FLOWER.numFrames;
    }
  }
}

// ------------------------------------------------------------
// drawFlowers()
// Loops through every flower and draws it at its current frame.
// Flowers only have one row so sy (source y) is always 0.
// sx slides along the row by multiplying the frame number
// by frameWidth — the same pattern as the walking character.
// ------------------------------------------------------------
function drawFlowers() {
  for (let i = 0; i < flowers.length; i++) {
    let flower = flowers[i];

    // Source x position on the sprite sheet
    // Flowers have only one row so sy is always 0
    let sx = flower.frame * FLOWER.frameWidth;
    let sy = 0;

    // Draw size (original frame size multiplied by scale)
    let dw = FLOWER.frameWidth * FLOWER.scale;
    let dh = FLOWER.frameHeight * FLOWER.scale;

    image(
      flowerSheet,
      flower.x,
      flower.y, // destination centre position
      dw,
      dh, // destination size (scaled)
      sx,
      sy, // source position on sheet
      FLOWER.frameWidth, // source width  (one frame)
      FLOWER.frameHeight, // source height (one row)
    );
  }
}

// ------------------------------------------------------------
// drawHUD()
// HUD = Heads Up Display.
// Shows the current config values — useful when tuning
// animation speed and scale on a new sprite sheet.
// ------------------------------------------------------------
function drawHUD() {
  noStroke();
  fill(160);
  textSize(13);
  textAlign(LEFT);
  textFont("monospace");
  text("5 animated flowers — each has its own frame counter", 16, 24);

  // Config readout — useful when tuning a new sprite sheet
  fill(100);
  textSize(11);
  text("FLOWER.animSpeed: " + FLOWER.animSpeed + "  (lower = faster)", 16, 44);
  text("FLOWER.scale: " + FLOWER.scale, 16, 58);
  text("FLOWER.numFrames: " + FLOWER.numFrames, 16, 72);
}
