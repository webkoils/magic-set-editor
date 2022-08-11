import { outputFileSync, readFile } from 'fs-extra';
import { format } from 'prettier';
export interface TemplateLine {
  rawText: string;
  level: number;
  key?: string;
  value?: any;
  children?: TemplateLine[];
}
const keysToSkip = ['script'];
export const convertTemplateFile = async (
  filePath: string,
  outputDir?: string
) => {
  const templateFileData = await readFile(filePath);
  let templateFileString = templateFileData
    .toString('utf-8')
    .replace(/#.*/gi, '')
    .replace(/\n#.*/gi, '')
    .replace(/\n\n/, '\n');
  const lines: TemplateLine[] = templateFileString.split('\n').map((text) => {
    let matches = text.match(/\s*(?<key>.+?):(?:\s*(?<value>.*))?/i);
    const tempLine: TemplateLine = {
      rawText: text,
      level: text.split('\t').length,
    };
    if (matches?.groups?.key) {
      tempLine.key = matches.groups.key;
    }
    if (matches?.groups?.value) {
      tempLine.value = matches.groups.value;
    }
    return tempLine;
  });

  const templateLevels = buildNestedTemplateLevel(lines);
  const templateObj = nestedTemplateToObject(templateLevels);
  if (outputDir) {
    outputFileSync(
      outputDir,
      format(JSON.stringify(templateObj), { parser: 'json-stringify' })
    );
  }
  return templateObj;
};

export const buildNestedTemplateLevel = (
  lines: TemplateLine[],
  currentLevel = 0
) => {
  const nestedTemplate: TemplateLine[] = [];
  let line;

  do {
    line = lines[0];
    if (!line) {
      return nestedTemplate;
    }
    if (line && line.level > currentLevel) {
      lines.shift();
      if (line.key) {
        if (line.value) {
          nestedTemplate.push(line);
        } else {
          line.children = buildNestedTemplateLevel(lines, line.level);
          nestedTemplate.push(line);
        }
      }
    }
  } while (lines.length > 0 && (line?.level || 0) > currentLevel);
  return nestedTemplate;
};

export const nestedTemplateToObject = (
  lines: TemplateLine[]
): Record<string, any> => {
  const entries: [string, any][] = lines.map<[string, any]>((line) => {
    if (line?.key) {
      if (line.value) {
        return [line.key, line.value.trim()];
      } else if (line.children) {
        return [line.key, nestedTemplateToObject(line.children)];
      }
    }

    return ['', ''];
  });
  const obj: Record<string, any> = {};
  entries.forEach(([key, val]) => {
    if (keysToSkip.includes(key)) {
      return;
    }
    if (!obj[key]) {
      obj[key] = val;
    } else {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key], val];
      } else {
        obj[key] = [...obj[key], val];
      }
    }
  });
  return obj;
};

export {};
