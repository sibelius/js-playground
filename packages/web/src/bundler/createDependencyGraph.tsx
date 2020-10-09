import path from 'path';

import { createModuleInfo } from './createModuleInfo';

// Given entry path,
// returns an array containing information from each module
export const createDependencyGraph = (entry: string) => {
  const entryInfo = createModuleInfo(entry);
  const graphArr = [];
  graphArr.push(entryInfo);
  for (const module of graphArr) {
    module.map = {};
    module.deps.forEach(depPath => {
      const baseDir = path.dirname(module.filePath);
      const baseModuleDir = path.join(baseDir, depPath);
      const absPath = path.resolve(baseModuleDir);

      const moduleInfo = createModuleInfo(absPath);
      graphArr.push(moduleInfo);
      module.map[depPath] = moduleInfo.id;
    });
  }
  return graphArr;
}
