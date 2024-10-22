import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { space } from 'styled-system';
import { ErrorBoundary } from 'react-error-boundary';

import { useDebouncedCallback } from 'use-debounce';

import { useRecoilState } from 'recoil';

import { BlockMonacoCodeEditor } from './BlockMonacoCodeEditor';
import { createLiveEditor } from './createLiveEditor';
import { blockAtomFamily } from './blockAtomFamily';
import Debug from './Debug';

const RunButton = styled(Button)`
  color: green;
  ${space}
`;

const Result = styled.div`
  background: #f9f8f7;
  border: solid 1px #e8e5e8;
  padding: 5px;
`;

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

const Preview = styled.div`
  &:last-child {
    border-top: solid 1px #ccc;
    border-right: solid 1px #ccc;
    border-bottom: solid 1px #ccc;
  }
  &:empty:before {
    content: 'Nothing to render';
    color: rgba(0, 0, 0, 0.3);
  }
`;

const RedSpan = styled.span`
  color: red;
`;

const PreviewError = () => {
  return <RedSpan>React Preview Error</RedSpan>;
};

type Props = {
  id: string;
};
const RunnableBlockCode = ({ id }: Props) => {
  const [block, setBlock] = useRecoilState(blockAtomFamily(id));
  const [codeResult, setCodeResult] = useState(null);

  const code = block.code;

  const setCode = (newCode) => {
    setBlock({
      ...block,
      code: newCode,
    });
  };

  const previewRef = useRef();
  const editorRef = useRef();

  const evalBlock = () => {
    try {
      const fn = new Function(code);

      const result = fn();

      // eslint-disable-next-line
      console.log({
        fn,
        fnS: fn.toString(),
        result,
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log('new Function err: ', err);
    }

    try {
      const result = eval(code);

      setCodeResult(result);
    } catch (err) {
      setCodeResult(err.toString());
    }
  };

  useEffect(() => {
    editorRef.current = createLiveEditor(previewRef.current);
  }, []);

  const [run] = useDebouncedCallback((code) => {
    editorRef.current.run(code);
  });

  const onCodeChange = (newCode) => {
    setCode(newCode);

    run(newCode);
  };

  return (
    <Wrapper>
      <BlockMonacoCodeEditor code={code} setCode={onCodeChange} />
      <RunButton onClick={evalBlock} mt='5px' mb='5px'>
        <PlayArrowIcon />
        Run
      </RunButton>
      {!!codeResult && (
        <Result>
          <p>Eval</p>
          <span>{codeResult}</span>
        </Result>
      )}
      <Debug code={code} />
      <ErrorBoundary FallbackComponent={PreviewError}>
        <span>Preview</span>
        <Preview ref={previewRef} />
      </ErrorBoundary>
    </Wrapper>
  );
};

export default RunnableBlockCode;
