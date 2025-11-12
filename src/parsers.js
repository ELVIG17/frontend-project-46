import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  
  // Проверяем существование файла
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${filepath}`);
  }

  const content = fs.readFileSync(absolutePath, 'utf-8');
  return content;
};

const parseFile = (filepath) => {
  const content = getFileContent(filepath);
  const extension = path.extname(filepath).toLowerCase();

  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export { getFileContent, parseFile };
