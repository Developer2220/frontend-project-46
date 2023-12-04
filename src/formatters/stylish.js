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
          return `  ${indent}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${indent}  }`;
        }
      });
      return result
    };
    return `{\n${iter(data, 1).join('\n')}\n}`
  };
  
  
  const stringify = (data, replacer = ' ', spacesCount = 4, depth = 1) => {
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
          return `  ${currentIndent}${key}: ${nestedObject}`;
        } else {
          return `  ${currentIndent}${key}: ${value}`;
        }
      });
  
      return `{\n${formattedEntries.join("\n")}\n${bracketIndent}  }`;
    } else {
      return data;
    }
  };
  
  const calculateIndent = (depth, spacesCount = 4) => {
    const count = spacesCount * depth - 2;
    return count >= 0 ? ' '.repeat(count) : '  ';
  };

  export default stylish