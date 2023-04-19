import React, { useState } from 'react'
import BrowserOnly from '@docusaurus/BrowserOnly';


const MethodInput = (props:any) => {
    const [value, setValue] = useState<any>()

    return(
        <div className='desc-row'>
<BrowserOnly />
            <button id={`method-${props.get}`} onClick={() => props.func(JSON.parse(value))}>{'run'}</button>
            <pre>{props.pre}
                (<input 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    style={{
                        border: '0px solid white',
                        height: '1.4rem',
                        padding: '0 .25rem',
                        outline: 'none',
                        letterSpacing: '.1rem'
                    }}
                />)
            </pre>
            <p>{props.desc}</p>
        </div>
    )
}

export default MethodInput