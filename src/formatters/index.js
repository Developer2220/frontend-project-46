import stylish from "./stylish.js"
import plain from "./plain.js"
import { makeAstTree } from "../makeAstTree.js";

const chooseFormatters = (obj1, obj2, formatName) => {
    if (formatName === 'stylish') {
        return stylish(makeAstTree(obj1, obj2))
      }
      if (formatName === 'plain') {
        return plain(makeAstTree(obj1, obj2))
      } else {
        throw new Error(`Unsupported format: ${formatName}`);
      }
}

export default chooseFormatters;