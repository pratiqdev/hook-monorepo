import React from 'react'

const dyn = () => {
    return(
        <div className='dynamic-card'>
            <h3>Only load visible components</h3>
            <p>This is a dynamic component.</p>
            <p>It was lazy loaded using <code>useDynamic</code> which internally uses <code>React.lazy()</code>.</p>
            <br />
            <br />
            <blockquote>This hook automatically loads the first component in the list. (The load time is intentionally delayed to show the fallback component)</blockquote>
            <img src='https://placekitten.com/800/200' alt=''/>
        </div>
    )
}
export default dyn 