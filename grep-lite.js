const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const args = Object.fromEntries(process.argv
  .filter(arg => arg.startsWith('--'))
  .map(arg => arg.slice(2).split('='))
);

const filePath = path.resolve(args['file']);
const query = args['search'];

if (!filePath || !query) {
  console.warn('Usage: node grep-lite.js --file=<path> --seach=<string>');
  exit(2);
}

if (!fs.existsSync(filePath)) {
  console.error('File not found');
  exit(1);
}

fs.readFile(filePath, (err, data) => {
  if (err) {
    console.error(err.message);
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