import { readFile } from 'fs-extra';

export const transformTemplateFile = async (
  filePath: string,
  outputDir: string
) => {
  const templateFileData = await readFile(filePath);
  let templateFileString = templateFileData
    .toString('utf-8')
    .replace(/#.*/gi, '')
    .replace(/\n#.*/gi, '')
    .replace(/\n\n/, '\n');
  console.log("t",templateFileString.slice(0, 20));
  return transformChunk(templateFileString, 0);
};

export const transformChunk = (str: string, index: number) => {
  const levelObj: Record<string, any> = { children: [] };
  let lines = str.split('\n');
console.log("l",lines[0])
  levelObj.val = lines.shift();
  let shiftedStr = lines.join('\n').replace('\n  ', '\n');
  console.log(shiftedStr.split(/\n(?!  )/).length,shiftedStr.slice(0,20));
  levelObj.children = shiftedStr
    .split(/\n(?!  )/)
    .filter((c) => c.length > 0)
    .slice(0, 1)
    .map(transformChunk);

  return levelObj;
};

export {};
