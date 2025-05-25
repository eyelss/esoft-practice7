const fs = require('fs');
const path = require('path');

const args = Object.fromEntries(process.argv
  .filter(arg => arg.startsWith('--'))
  .map(arg => arg.slice(2).split('='))
);

const fileName = args['file'];
const query = args['search'];

if (!fileName || !query) {
  throw new Error('Usage: node grep-lite.js --file=<path> --seach=<string>');
}

fs.readFile(path.join(__dirname, fileName), (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  data
    .toString()
    .split('\n')
    .forEach((line, idx) => {
      if (line.includes(query)) {
        console.log(`[Line ${idx+1}]: ${line}`);
      }
    });
});