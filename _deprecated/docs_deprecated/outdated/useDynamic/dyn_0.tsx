import React from 'react'

const dyn = () => {
    return(
        <div className='dynamic-card'>
            <h3>Loading...</h3>
            <p>Render a fallback component with built-in `React.Suspense`</p>
            <br />
            <div style={{width: '100%', height: '200px', background: 'grey', marginTop: '1rem'}} />
        </div>
    )
}
export default dyn