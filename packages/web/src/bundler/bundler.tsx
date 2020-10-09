import { createDependencyGraph } from './createDependencyGraph';
import { pack } from './pack';

export const bundler = (entryFilePath: string) => {
  const graph = createDependencyGraph(entryFilePath);
  const bundle = pack(graph);
  console.log('***** Copy code below and paste into browser *****');
  console.log(bundle);
  console.log('***** Copy code above and paste into browser *****');
  return bundle;
};
