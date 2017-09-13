const fs = require('fs');
const type = process.argv[2];
const source = fs.readFileSync(`scripts/prismic-types/${type}.json`, 'utf8');
const slices = fs.readFileSync('scripts/prismic-types/slices.json', 'utf8');

const output = source.replace(/"%%SLICES%%"/g, slices);
console.log(output);
