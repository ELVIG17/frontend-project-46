import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  test('should compare flat JSON files correctly', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected.txt').trim();
    
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  });

  test('should compare flat YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.yaml');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFile('expected.txt').trim();
    
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  });

  test('should compare JSON and YAML files correctly', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.yaml');
    const expected = readFile('expected.txt').trim();
    
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  });

  test('should work with absolute paths', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected.txt').trim();
    
    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
  });

  test('should handle non-existent files', () => {
    expect(() => {
      genDiff('nonexistent1.json', 'nonexistent2.json');
    }).toThrow();
  });

  test('should handle unsupported file formats', () => {
    expect(() => {
      genDiff('file1.txt', 'file2.txt');
    }).toThrow('Unsupported file format: .txt');
  });
});