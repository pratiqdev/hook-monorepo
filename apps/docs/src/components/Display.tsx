import * as React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

const Display = (props:any) => {
    return (
        <div className={props.hide ? 'display-input-hidden' : 'display-input'}>
            <BrowserOnly />
            <label>
                {props.id}
            </label>
            <input id={props.id} value={props.value} />
        </div>
    )
}

export default Display;