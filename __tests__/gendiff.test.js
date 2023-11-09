import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('check genDiff', () => {
    const outputPath = path.join(__dirname, 'etalonStylish.txt');
  expect( genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
  .toEqual(fs.readFileSync(getFixturePath('etalon.txt'), 'utf8')
  );
});