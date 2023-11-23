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
    const calculateIndent = (depth, spacesCount = 4) => {
      const count = spacesCount * depth - 2;
      return count >= 0 ? ' '.repeat(count) : '  ';
    };
    
    
    const stylish = (data) => {
      const iter = (arrWithData, depth) => {
        const indent = calculateIndent(depth);
        const result =  arrWithData.map((node) => {
          // const spaces = ''.repeat(depth);
    
          if (node.status === 'unchanged') {
            return `  ${indent}${node.key}: ${stringify(node.value)}`;
          }
    
          if (node.status === 'changed') {
            return `${indent}- ${node.key}: ${stringify(node.oldValue)}\n${indent}+ ${node.key}: ${stringify(node.newValue)}`;
          }
    
          if (node.status === 'deleted') {
            return `${indent}- ${node.key}: ${stringify(node.value)}`;
          }
    
          if (node.status === 'added') {
            return `${indent}+ ${node.key}: ${stringify(node.value)}`;
          }
    
          if (node.status === 'nested') {
            return `${indent}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n  }`;
          }
        });
    
        return result
        // return ['{', ...result, `}`];
        
      };
    
      return iter(data, 1).join('\n');
    };
    
    
    const stringify = (data, replacer = ' ', spacesCount = 4, depth = 1) => {
      // const spaces = replacer.repeat(spacesCount * depth);
      const currentIndent = calculateIndent(depth + 1);
      const bracketIndent = calculateIndent(depth);
    
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
        // console.log(entries)
        const formattedEntries = entries.map(([key, value]) => {
          if (typeof value === "object") {
            const nestedObject = stringify(value, replacer, spacesCount, depth + 1);
            return `${currentIndent}${key}: ${nestedObject}`;
          } else {
            return `${currentIndent}${key}: ${value}`;
          }
        });
    
        return `{\n${formattedEntries.join("\n")}\n${bracketIndent}}`;
      } else {
        return data;
      }
    };
    

    // return getDiffFlatData(isAstTree)
    return stylish(isAstTree)
}

export default genDiff;
