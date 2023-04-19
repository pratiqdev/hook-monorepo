import React from 'react'

const dyn = () => {
    return(
        <div className='dynamic-card'>
            <h3>Keep it!</h3>
            <p>Loaded components will be memoized and saved for next time.</p>
            <br />
            <img src='https://placekitten.com/900/200' alt=''/>
        </div>
    )
}
export default dyn