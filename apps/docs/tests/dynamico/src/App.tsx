import React, { useEffect, Suspense, useState, lazy } from 'react';
import './App.css';
import useDynamico from './dynamico';

 



function App() {
  const DYN = useDynamico({
    'd0':'./dyn_0',
    'd1':'./dyn_1',
    'd2':'./dyn_2',
    'd3':'./dyn_3',
    'd4':'./dyn_4',
}, <p>Ahh</p>, 2)
  
  return (
    <div className="App">
      <header className="App-header">
        dynamico
        <br />

      <div style={{display: 'flex'}}>
        <button onClick={() => DYN.prev()}>{`<<`}</button>
        <p>{DYN.index} - {DYN.names[DYN.index]}</p>
        <button onClick={() => DYN.next()}>{`>>`}</button>
      </div>

        {DYN.names.map((x:any, idx:number) => <button onClick={() => DYN.setIndex(idx)}>{x}</button>)}


        <DYN.Component />

        {/* <Suspense fallback={<div>Loading...</div>}>
          <DYN.D1 />
        </Suspense>
 */}


       
      </header>
    </div>
  );
}

export default App;
