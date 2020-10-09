import fs from 'fs';

import parser from '@babel/parser'; // parses and returns AST
import traverse from '@babel/traverse'; // walks through AST
import babel from '@babel/core'; // main babel functionality
import detective from 'detective';

let ID = 0;

/*
 * Given filePath, read and parses module, returns module information
 * Module information includes:
 * - module ID
 * - module filePath
 * - all dependencies used in the module (in array form)
 * - code inside the module
 */
export const createModuleInfo = (filePath: string) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const cjsDeps = detective(content);
  let deps = [];
  let code;
  let isES6;

  if (cjsDeps.length === 0) {
    const ast = parser.parse(content, {
      sourceType: 'module',
    });
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        deps.push(node.source.value);
      },
    });
    code = babel.transformFromAstSync(ast, null, {
      presets: ['@babel/preset-env'],
    }).code;
    isES6 = true;
  } else {
    deps = cjsDeps;
    code = content;
    isES6 = false;
  }
  const id = ID++;

  return {
    id,
    filePath,
    deps,
    code,
    isES6,
  };
};
