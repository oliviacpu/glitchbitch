var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true,
});

screen.title = 'glitchbitch';

var fileManager = blessed.filemanager({
  cwd: './',
  width: '100%',
  height: '100%',
  tags: true,
  keys: true,
  style: {
    fg: '#5F4B8B',
    bg: 'white',
    item: {
      fg: '#5F4B8B',
      bg: 'white',
    },
    selected: {
      fg: 'white',
      bg: '#5F4B8B',
    }
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
  console.log('file: ', file);
});

// Focus our element.
fileManager.focus();

// Render the screen.
screen.render();
