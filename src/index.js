import fs from 'fs';
import path from 'path';
import { getParsedFileData } from './parser.js';
import process from 'process';
import _ from 'lodash'
import { makeAstTree } from './makeAstTree.js';
import { stylish } from './formatters/stylish.js';


const getAbsolutePath = (file) => {
    const absolutePath = path.resolve(process.cwd(), file);
    return absolutePath;
};
const getExtName = (file) => path.extname(file);
const readData = (file) => fs.readFileSync(file, 'utf-8');


const genDiff = (filepath1, filepath2, formatName) => {
    const absolutPath1 = getAbsolutePath(filepath1)
    const absolutPath2 = getAbsolutePath(filepath2)
    const data1 = readData(absolutPath1)
    const data2 = readData(absolutPath2)
    const ext1 = getExtName(filepath1)
    const ext2 = getExtName(filepath2)
    const parsedData1 = getParsedFileData(data1, ext1)
    const parsedData2 = getParsedFileData(data2, ext2)
    // console.log(parsedData1)
    // console.log(parsedData2)
    const isAstTree = makeAstTree(parsedData1, parsedData2);

    return stylish(isAstTree)
}

export default genDiff;
