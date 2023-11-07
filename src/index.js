import fs from 'fs';
import path from 'path';
import { getParsedFileData } from './parser.js';
import process from 'process';
import _ from 'lodash'
import { makeAstTree } from './makeAstTree.js';

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
    const isAstTree = makeAstTree(parsedData1, parsedData2);
    const getDiffFlatData = (data) =>{
        const result = data.map((node) => {
          if (node.status === "unchanged") {
            return `    ${node.key}: ${node.value}`;
          }
          if (node.status === "changed") {
            return `  - ${node.key}: ${node.oldValue}\n  + ${node.key}: ${node.newValue}`;
          }
          if (node.status === "deleted") {
            return `  - ${node.key}: ${node.value}`;
          }
          if (node.status === "added") {
            return `  + ${node.key}: ${node.value}`;
          }
        })
        return result.join('\n')
        }

    return getDiffFlatData(isAstTree)
}

export default genDiff;
