let sound;
let mic;

let personClassifier;
let wordClassifier;

let personResult;
let wordResult;

function preload() {
  sound = loadSound('./alarm.m4a');
  // sound = loadSound('./doorbell.mp3');
  personClassifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/BYxkgpj_i/model.json");
  wordClassifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/psSchNDLN/model.json");
}

function setup() {
  // createCanvas(710, 400);
  createCanvas(windowWidth, windowHeight);

  // Create an Audio input
  mic = new p5.AudioIn();
  // start the Audio Input.
  mic.start();

  classifyAudio();
}

function draw() {
  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  
  drawBackground();
  drawVolumeMeter(vol);
  drawClassification();
}

function classifyAudio() {
  personClassifier.classify(gotPersonResults);
  wordClassifier.classify(gotWordResults);
}

function gotPersonResults(error, results) {
  if(!error && !!results && results.length > 0) {
    
//  console.log(results.sort((a, b) => {
//    return b.confidence - a.confidence;
//  }));
    personResult = results[0];
  }
}

function gotWordResults(error, results) {
  if(!error && !!results && results.length > 0) {
    
//  console.log(results.sort((a, b) => {
//    return b.confidence - a.confidence;
//  }));
    wordResult = results[0];
  }
}

function drawBackground() {
  background(200);
}

function drawVolumeMeter(vol) {
  if (vol < 0.33) {
    fill(96, 169, 23)
  } else if (vol < 0.66) {
    fill(250, 104, 0)
  } else {
    fill(229, 20, 0)
  };
  stroke(0);
  let h = map(vol, 0, 1, 0, height);
  rect(0, height, 50, -h);
}

// label confidence
function drawClassification() {
  // if(!!personResult) {
  //   fill(50);
  //   textSize(32);
  //   if (personResult.label != "Bruit de fond") {
  //     text("Ca parle", width / 6 * 2, height / 4 * 2);
  //   } else {
  //     text("Ca parle pas", width / 6 * 2, height / 4 * 2);
  //   }
  // }
  if(!!wordResult && wordResult.confidence > 0.5) {
    fill(50);
    textSize(32);
    if(wordResult.label != "Bruit de fond") {
      text(wordResult.label, width / 6 * 3, height / 4 * 2);
      playSound();
    } else {
      text("...", width / 6 * 3, height / 4 * 2);
    }
  }
}

function playSound() {
  if (sound.isPlaying()) {
    // sound.stop()
  } else {
    sound.play();
  }
}

