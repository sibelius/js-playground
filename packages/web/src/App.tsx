import React, { useEffect } from 'react';
import { Text } from 'rebass';
import media from 'styled-media-query';
import styled from 'styled-components';

import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

import { useRecoilCallback, useRecoilState } from 'recoil';

import RunnableBlockCode from './RunnableBlockCode';
import { initialCode } from './initialCode';
import { blockAtomFamily, blocksAtom } from './blockAtomFamily';
import { getRandomFilename } from './getRandomFilename';

const Content = styled.div`
  margin: 0 auto;
  max-width: 50em;
  line-height: 1.5;
  ${media.lessThan('small')`
    margin: 0 20px;
  `}
`;

const App = () => {
  const [blocks, setBlocks] = useRecoilState(blocksAtom);

  const logState = useRecoilCallback(({ snapshot, set, gotoSnapshot, reset }) => () => {
    const blocks =  snapshot.getLoadable(blocksAtom).contents;

    const blockValues = blocks.map(b => {
      const v = snapshot.getLoadable(blockAtomFamily(b.id));

      return v.contents;
    });

    console.log('logState', {
      blocks,
      blockValues,
    });
  });

  const newBlock = () => {
    const id = getRandomFilename();

    setBlocks((prev) => {
      return [
        ...prev,
        {
          id,
          code: initialCode,
        },
      ];
    });

    logState({ id });
  };

  return (
    <Content>
      <Text fontWeight='bold' fontSize='40px' mb='10px' mt='10px'>
        JavaScript Playground
      </Text>
      {blocks.map((block, i) => (
        <RunnableBlockCode key={i} id={block.id} />
      ))}
      <Button onClick={newBlock} mt='5px' mb='5px'>
        <AddIcon />
      </Button>
    </Content>
  );
};

export default App;
