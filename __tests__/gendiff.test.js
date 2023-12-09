import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from 'jest';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('check genDiff with stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('etalonStylish.txt'), 'utf8'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('etalonStylish.txt'), 'utf8'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish'))
    .toEqual(fs.readFileSync(getFixturePath('etalonStylish.txt'), 'utf8'));
});

test('check genDiff with plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('etalonPlain.txt'), 'utf8'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('etalonPlain.txt'), 'utf8'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain'))
    .toEqual(fs.readFileSync(getFixturePath('etalonPlain.txt'), 'utf8'));
});

test('check genDiff with json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))
    .toEqual(fs.readFileSync(getFixturePath('etalonJSON.txt'), 'utf8'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json'))
    .toEqual(fs.readFileSync(getFixturePath('etalonJSON.txt'), 'utf8'));
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json'))
    .toEqual(fs.readFileSync(getFixturePath('etalonJSON.txt'), 'utf8'));
});
