import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {LiveProvider, LiveEditor, LiveError, LivePreview} from 'react-live';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {usePrismTheme} from '@docusaurus/theme-common';
import styles from './styles.module.css';


function Playground({children, transformCode, ...props}) {
  const {
    siteConfig: {themeConfig},
  } = useDocusaurusContext();
  const {
    liveCodeBlock: {playgroundPosition},
  } = themeConfig;
  const prismTheme = usePrismTheme();
  const isBrowser = useIsBrowser();
  const noInline = props.metastring?.includes('noInline') ?? false;
  return (
    <div className='demo-container'>
      {/* @ts-expect-error: type incompatibility with refs */}

      <LiveProvider
        code={children.replace(/\n$/, '')}
        noInline={noInline}
        transformCode={transformCode ?? ((code) => `${code};`)}
        theme={prismTheme}
        {...props}>
          <div className='demo-preview'>
            <BrowserOnly fallback={<div>Loading...</div>}>
              {() => (
                <>
                  <LivePreview />
                  <LiveError />
                </>
              )}
            </BrowserOnly>
          </div>
          <LiveEditor
            // We force remount the editor on hydration,
            // otherwise dark prism theme is not applied
            key={String(isBrowser)}
            className='demo-editor'
            />
      </LiveProvider>
    </div>
  );
}


const PlaygroundWrapper = (props) => {
  return (

    <ErrorBoundary fallback={({error, tryAgain}) => (
      <div>
        <p>This component crashed because of error: {error.message}.</p>
        <button onClick={tryAgain}>Try Again!</button>
      </div>
    )}>

      <Playground {...props}/>
    </ErrorBoundary>
  )
}

export default PlaygroundWrapper