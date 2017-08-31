const fs = require('fs');

const filePath = process.argv[2];
const source = fs.readFileSync(filePath, 'utf8');
const slices = fs.readFileSync('scripts/prismic-types/slices.json', 'utf8');

const output = source.replace(/%%CHOICES%%/g, slices);
console.log(output);
