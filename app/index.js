var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
});

screen.title = 'glitchbitch';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  width: '100%',
  height: '100%',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Append our box to the screen.
screen.append(box);

var fileManager = blessed.filemanager({
  cwd: './',
  width: '100%',
  height: '100%',
  tags: true,
  keys: true,
});

// Append our filemanager to the box.
box.append(fileManager);

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Refresh the file manager.
fileManager.refresh();

fileManager.pick(function(err, file) {
  console.log('file: ', file);
});

// Focus our element.
fileManager.focus();

// Render the screen.
screen.render();
