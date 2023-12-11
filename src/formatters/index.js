import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import makeAstTree from '../makeAstTree.js';

const chooseFormatters = (obj1, obj2, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(makeAstTree(obj1, obj2));
    case 'plain':
      return plain(makeAstTree(obj1, obj2));
    case 'json':
      return json(makeAstTree(obj1, obj2));
    default:
      throw new Error(`Unsupported format: ${formatName}'!`);
  }
};

export default chooseFormatters;
