import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1);
    return `${currentIndent}${key}: ${formattedValue}`;
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatDiff = (diff, depth = 1) => {
  const indentSize = depth * 4;
  const indent = ' '.repeat(indentSize - 2);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = diff.map((node) => {
    const { key, type } = node;

    switch (type) {
      case 'added':
        return `${indent}+ ${key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indent}+ ${key}: ${stringify(node.newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}  ${key}: ${formatDiff(node.children, depth + 1)}`;
      default:
        return '';
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default formatDiff;