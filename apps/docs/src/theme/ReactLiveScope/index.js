import React from 'react';
import * as hooks from '@pratiq/hooks'
// Add react-live imports you need here
import * as components from '@site/src/components'


const styles = {
  useClamp: {
    container: { background: '#ccc4', padding: '.5rem', borderRadius: '.5rem', width: 'min-content', marginBottom: '1rem', borderRadius: '.5rem' },
    button: { width: 'auto', minWidth: '1.5rem', margin: 0 },
    row: { width: '10rem', display: 'flex', marginBottom: '0rem', background: '#0004', padding: '.25rem', justifyContent: 'space-between', borderRadius: '.5rem' },
    display: { flex: 1, textAlign: 'center', fontSize: '1.4rem', width: '100%', margin: 0 },
    column: { width: '10rem', display: 'flex', gap: '.5rem', flexDirection: 'column', marginTop: '.5rem'},
  }
}

const ReactLiveScope = {
  React,
  ...React,
  ...hooks,
  ...components,
  styles,
};
export default ReactLiveScope;
