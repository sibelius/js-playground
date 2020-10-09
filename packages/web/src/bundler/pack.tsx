/*
 * Given an array containing information from each module
 * return a bundled code to run the modules
 */
export const pack = (graph) => {
  const isES6 = graph[0].isES6;
  const moduleArgArr = graph.map(module => {
    let exportsStatement;
    if (isES6) {
      exportsStatement = "exports";
    } else {
      exportsStatement = "module";
    }
    return `${module.id}: {
        factory: (${exportsStatement}, require) => {
          ${module.code}
        },
        map: ${JSON.stringify(module.map)}
      }`;
  });

  let factoryExportsStatement;
  if (isES6) {
    factoryExportsStatement = "module.exports";
  } else {
    factoryExportsStatement = "module";
  }

  const iifeBundler = `(function(modules){
      const require = id => {
        const {factory, map} = modules[id];
        const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
        const module = {exports: {}};
        
        factory(${factoryExportsStatement}, localRequire); 
        return module.exports; 
      } 
      require(0);
    })({${moduleArgArr.join()}})
    `;
  return iifeBundler;
}
