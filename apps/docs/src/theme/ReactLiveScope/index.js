import React from 'react';
import * as hooks from '@pratiq/hooks'
// Add react-live imports you need here
import * as components from '@site/src/components'


const styles = {
  useClamp: {
    container: { background: '#ccf4', padding: '.5rem', borderRadius: '.5rem', width: 'min-content', borderRadius: '.5rem', },
    button: { flex: 1, display: 'flex', minWidth: '1.5rem', minHeight: '1.5rem', margin: 0, background: '#aac' },
    row: { flex:1, display: 'flex', gap: '.5rem', marginBottom: '0rem', background: '#0000', padding: '0rem', justifyContent: 'space-between', borderRadius: '.5rem' },
    display: { flex: 1, textAlign: 'center', fontSize: '1.4rem', width: '100%', margin: 0 },
    column: { flex: 1, display: 'flex', gap: '.5rem', flexDirection: 'column', marginTop: '.5rem'},
  }
}

const ReactLiveScope = {
  React,
  ...React,
  ...hooks,
  styles,
  ...components
};


export default ReactLiveScope;
