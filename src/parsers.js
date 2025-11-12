import fs from 'fs';
import path from 'path';

const getFileContent = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  return content;
};

const parseFile = (filepath) => {
  const content = getFileContent(filepath);
  const extension = path.extname(filepath).toLowerCase();
  
  switch (extension) {
    case '.json':
      return JSON.parse(content);
    // Здесь можно добавить другие форматы в будущем (yaml, etc.)
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export { getFileContent, parseFile };