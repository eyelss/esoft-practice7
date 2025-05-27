const fs = require('fs');
const path = require('path');
const readline = require('readline');
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

const stream = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity,
});

var line_index = 0;
stream.on('line', (line) => {
  line_index++

  if (line.includes(query)) {
    console.log(`[Line ${line_index}] "${line}"`);
  }
});