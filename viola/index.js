// if you have node installed
// run node index.js
const fs = require('fs');
const path = require('path')
const RED = 'R';
const GREEN = 'G';
const SPACE = ' ';

function readInputFile(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) throw err;
    callback(data);
  });
}

function setUpInitialBallGroup(ballsGroupCount) {
  const initGroup = [];
  const halfWayPoint = ballsGroupCount / 2;
  // adding balls to the initial default group
  // we add one for the space
  for (let i = 0; i < ballsGroupCount + 1; i++) {
    if (i < halfWayPoint) {
      initGroup[i] = GREEN;
    } else if (i === halfWayPoint) {
      initGroup[i] = SPACE;
    } else {
      initGroup[i] = RED;
    }
  }
  console.log('initGroup', initGroup);
  // add an inital space in the ball group
  return initGroup;
}

function traverseBallGroup(ballGroup) {
  const spacePosition = (ballGroup / 2 ).roundOff();
  for (let i = 0; i < ballGroup; i ++) {
    // shift item before space into space's position
    // and move space into that items postion
  }
}

// we are only interested numerical data
function cleanUpData(data) {
  return data.map(function (val) {
    return parseInt(val, 10);
  })
  .filter(function (val) {
    return ! Number.isNaN(val)
  });
}

function reArrangeBalls(raw) {
  const rawDataArr = raw.split('\n'); // split by end of character;
  const data = cleanUpData(rawDataArr);
  for (let i = 0; i < data.length; i++) {
    if (i !== 0) {
      const ballGroup = setUpInitialBallGroup(data[i]);
      // const ballsTraversal = traverseBallGroup(ballGroup);
    }
  }
}

function main() {
  const filePath = path.resolve(__dirname, 'input.txt');
  readInputFile(filePath, reArrangeBalls);
}

main();
