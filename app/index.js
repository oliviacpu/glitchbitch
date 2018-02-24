var blessed = require('blessed');
var childProcess = require('child_process');

var rpio = require('rpio');
rpio.open(23, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin) {
  var state = rpio.read(pin) ? 'pressed' : 'released';
  console.log('Button event on P%d (button currently %s)', pin, state);
}

rpio.poll(23, pollcb);

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
});

screen.title = 'glitchbitch';

var fileManager = blessed.filemanager({
  cwd: './media',
  width: '100%',
  height: '100%',
  tags: true,
  keys: true,
  style: {
    selected: {
      bg: 'blue',
      fg: 'white',
    },
  }
});

// Append our filemanager to the box.
screen.append(fileManager);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Refresh the file manager.
fileManager.refresh();

fileManager.pick(function(err, file) {
  childProcess.spawn('/home/pi/glitchbitch/scripts/play_video.sh ' + file, {
    detached: true,
    stdio: 'ignore'
  });
});

// Focus our element.
fileManager.focus();

// Render the screen.
screen.render();
