const calculateIndent = (depth, spacesCount = 4) => {
  const count = spacesCount * depth - 2;
  return count >= 0 ? ' '.repeat(count) : '  ';
};

const stringify = (data, depth = 1) => {
  const currentIndent = calculateIndent(depth + 1);
  const bracketIndent = calculateIndent(depth);
  if (typeof data === 'object' && data !== null) {
    const entries = Object.entries(data);
    const formattedEntries = entries.map(([key, value]) => {
      if (typeof value === 'object') {
        const nestedObject = stringify(value, depth + 1);
        return `  ${currentIndent}${key}: ${nestedObject}`;
      }
      return `  ${currentIndent}${key}: ${value}`;
    });

    return `{\n${formattedEntries.join('\n')}\n${bracketIndent}  }`;
  }
  return data;
};

const stylish = (data) => {
  const iter = (arrWithData, depth) => {
    const indent = calculateIndent(depth);
    const result = arrWithData.map((node) => {
      switch (node.status) {
        case 'unchanged':
          return `  ${indent}${node.key}: ${stringify(node.value, depth)}`;
        case 'deleted':
          return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}\n${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`;
        case 'nested':
          return `  ${indent}${node.key}: {\n${iter(node.children, depth + 1).join('\n')}\n${indent}  }`;
        default:
          throw new Error(`Unknown node status: ${node.status}`);
      }
    });
    return result;
  };
  return `{\n${iter(data, 1).join('\n')}\n}`;
};

export default stylish;
