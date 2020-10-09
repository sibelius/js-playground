import React from 'react';
import styled from 'styled-components';
import { transform as babelTransform } from '@babel/standalone';

import { getWrapperCode } from './createLiveEditor';
import config from './config';

const Result = styled.div`
  background: #f9f8f7;
  border: solid 1px #e8e5e8;
  padding: 5px;
`;

type Props = {
  code: string;
};
const Debug = ({ code }: Props) => {
  // TODO - transform this into an atom
  if (!config.DEBUG) {
    return null;
  }

  const getTcode = () => {
    try {
      return babelTransform(code, {
        presets: [
          // 'es2015',
          'react',
        ],
      }).code;
    } catch (err) {
      return null;
    }
  };

  const tcode = getTcode();

  const { ast, js, err } = getWrapperCode(code);

  return (
    <>
      <Result>
        <p>Transpile</p>
        <span>{tcode}</span>
      </Result>
      <Result>
        <p>AST</p>
        <span>{ast && JSON.stringify(ast)}</span>
      </Result>
      <Result>
        <p>JS</p>
        <span>{js}</span>
      </Result>
      <Result>
        <p>Err</p>
        <span>{err}</span>
      </Result>
    </>
  );
};

export default Debug;
