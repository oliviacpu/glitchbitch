var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
});

screen.title = 'glitchbitch';

// Create a fileManager perfectly centered horizontally and vertically.
var fileManager = blessed.filemanager({
  cwd: './',
  top: 'center',
  left: 'center',
  width: '100%',
  height: '100%',
  tags: true,
  keys: true,
  border: {
    type: 'line',
  },
  style: {
    fg: 'magenta',
    border: {
      fg: 'magenta',
    },
  },
});

// Append our box to the screen.
screen.append(fileManager);

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
