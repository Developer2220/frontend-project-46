import genDiff from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('check genDiff', () => {
  expect( genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
  .toEqual(fs.readFileSync(getFixturePath('etalonStylish.txt'), 'utf8')
  );
  expect( genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))
  .toEqual(fs.readFileSync(getFixturePath('etalonStylish.txt'), 'utf8')
  );
  expect( genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))
  .toEqual(fs.readFileSync(getFixturePath('etalonStylish.txt'), 'utf8')
  );
});