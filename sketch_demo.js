let t;
let increment = 0.001; 
let lines;
let words;
let totalCounts;
let maxFreq = 0;
let depth = 40;
let px = 0;
let py = 0;
let animationCount = 1000;
let newAnimation = false;
let lastWord;

function preload() {
    lines = loadStrings("keywords.txt");
  }
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    init(join(lines, " ").toLowerCase());
    t = 0;
  }
  
  function init(text) {
    let tokens = text.toLowerCase().split(/[ \-,.;:!?()]/);
    let dict = {};
    let count = 0;
    for (let w of tokens) {
      if (w.length != 0) {
        if (dict[w] == undefined) {
          dict[w] = 0;
        }
        dict[w]++;
        count++;
      }
    }
    words = [];
    for (let w in dict) {
      let val = dict[w];
      let freq = val / count;
      words.push(new Word(w, freq));
      maxFreq = max(maxFreq, freq);
    }
    words.sort((a, b) => a.frequency - b.frequency < 0 ? -1 : 1);
    totalCounts = count;
  }

  function detectNewWords(text) {
    let tokens = text.toLowerCase().split(/[ \-,.;:!?()]/);
    let dict = {};
    let count = 0;
    for (let w of tokens) {
      if (w.length != 0) {
        if (dict[w] == undefined) {
          dict[w] = 0;
        }
        dict[w]++;
        count++;
      }
    }
    lastWord = tokens[-1];
    if (count > totalCounts) {
        return lastWord;    
    } else {
        return " ";
    }
  }
  
  function keyPressed() {
    if (key == ' ') {
      for (let w of words) {
        w.position = createVector(random(width), random(height));
      }
    }
  }
  
  function draw() {
    background(0);
  
    let newX = width/2;
    let newY = height/2;
    let dx = lerp(px, newX, 0.1);
    let dy = lerp(py, newY, 0.1);
    for (let w of words) {
      w.show(maxFreq, dx, dy);
    }
    px = dx;
    py = dy;
    t += increment;

    fill(0);
    // circle(width / 2, height / 2, height/2);
    // if (newAnimation == false ) {
    //     if (detectNewWords(join(lines, " ").toLowerCase()) != " ") {
        
    //         newAnimation = true;
    //     } 
    // } else {
    //     if (animationCount > 0) {
    //         textSize(height / 2);
    //         fill(255);
    //         noStroke();
    //         text(lastWord, weight / 2, height / 2);
    //         animationCount -= 1;
    //     } else {
    //         newAnimation = false;
    //         animationCount = 1000;
    //     }
    // }
  }
  
  class Word {
    constructor(val, freq) {
      this.value = val;
      this.position = createVector(random(width/2), random(height/2));
      this.frequency = freq;
      this.t = t;
    }
  
    show(maxFreq, mx, my) {
      let ts = map(this.frequency, 0, maxFreq, height / 100, height / 5);
      let fl = map(this.frequency, 0, maxFreq, 80, 255);
      let dx = (mx - noise(mx+t) * width/1.5) * this.frequency * depth;
      let dy = (my - noise(my+t) * height/1.5) * this.frequency * depth;
      let x = this.position.x + dx;
      let y = this.position.y + dy;
      textSize(ts);
      fill(7, 110, 255);

      // fill(fl);
      noStroke();
      text(this.value, x, y);
      rotate(20);
    }
  
  }