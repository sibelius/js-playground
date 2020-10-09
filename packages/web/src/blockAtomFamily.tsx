import { atom, atomFamily, selectorFamily } from 'recoil';

import { initialCode, sampleReactCode } from './initialCode';
import { getRandomFilename } from './getRandomFilename';

// list of all blocks
export const blocksAtom = atom({
  key: 'blocks',
  default: [
    {
      id: getRandomFilename(),
      code: initialCode,
    },
    {
      id: getRandomFilename(),
      code: sampleReactCode,
    },
  ],
});

// state of each block
export const blockAtomFamily = atomFamily<any, string>({
  key: 'block',
  default: selectorFamily({
    key: 'block/default',
    get: (param) => ({ get }) => get(blocksAtom).find((x) => x.id === param),
  }),
});
