var blessed = require('blessed');
var childProcess = require('child_process');
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
  console.log('file: ', file);
  childProcess.exec(`./scripts/play_video.sh ${file}`);
});

// Focus our element.
fileManager.focus();

// Render the screen.
screen.render();
