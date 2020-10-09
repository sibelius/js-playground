import React from 'react';
import { Text } from 'rebass';
import media from 'styled-media-query';
import styled from 'styled-components';

import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

import { useRecoilState } from 'recoil';

import RunnableBlockCode from './RunnableBlockCode';
import { initialCode } from './initialCode';
import { blocksAtom } from './blockAtomFamily';
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

  const newBlock = () => {
    setBlocks((prev) => {
      return [
        ...prev,
        {
          id: getRandomFilename(),
          code: initialCode,
        },
      ];
    });
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
