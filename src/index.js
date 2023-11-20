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
    console.log(parsedData1)
    console.log(parsedData2)
    const isAstTree = makeAstTree(parsedData1, parsedData2);
    // const getDiffFlatData = (data) =>{
    //     const result = data.map((node) => {
    //       if (node.status === "unchanged") {
    //         return `    ${node.key}: ${node.value}`;
    //       }
    //       if (node.status === "changed") {
    //         return `  - ${node.key}: ${node.oldValue}\n  + ${node.key}: ${node.newValue}`;
    //       }
    //       if (node.status === "deleted") {
    //         return `  - ${node.key}: ${node.value}`;
    //       }
    //       if (node.status === "added") {
    //         return `  + ${node.key}: ${node.value}`;
    //       }
    //     })
    //     return `{\n${result.join('\n')}\n}`
    //     }
    const stylish = (data) => {
      const iter = (arrWithData, currentDepth) => {
        return arrWithData.map((node) => {
          // const spaces = ''.repeat(currentDepth);
    
          if (node.status === 'unchanged') {
            return `  ${node.key}: ${stringify(node.value, ' ', 4)}`;
          }
    
          if (node.status === 'changed') {
            return `- ${node.key}: ${stringify(node.oldValue, ' ', 4)}\n+ ${node.key}: ${stringify(node.newValue, ' ', 4)}`;
          }
    
          if (node.status === 'deleted') {
            return `- ${node.key}: ${stringify(node.value, ' ', 4)}`;
          }
    
          if (node.status === 'added') {
            return `+ ${node.key}: ${stringify(node.value, ' ', 4)}`;
          }
    
          if (node.status === 'nested') {
            return `  ${node.key}: {\n${iter(node.children, currentDepth + 1).join('\n')}\n  }`;
          }
        });
      };
    
      return iter(data, 1).join('\n');
    };
    
    
    const stringify = (data, replacer = ' ', spacesCount = 1, depth = 1) => {
      const spaces = replacer.repeat(spacesCount * depth);
    
      if (typeof data === 'string') {
        return data.replace(/"/g, '');
      }
      if (data === true) {
        return data.toString();
      }
      if (Number.isFinite(data)) {
        return data.toString();
      }
    
      if (typeof data === 'object' && data !== null) {
        const entries = Object.entries(data);
        console.log(entries)
        const formattedEntries = entries.map(([key, value]) => {
          if (typeof value === "object") {
            const nestedObject = stringify(value, replacer, spacesCount, depth + 1);
            return `${spaces}${key}: ${nestedObject}`;
          } else {
            return `${spaces}${key}: ${value}`;
          }
        });
    
        return `{\n${formattedEntries.join("\n")}\n${replacer.repeat(spacesCount * (depth - 1))}}`;
      } else {
        return data;
      }
    };

    // return getDiffFlatData(isAstTree)
    return stylish(isAstTree)
}

export default genDiff;
