import React from 'react'

const dyn = () => {
    return(
        <div className='dynamic-card'>
            <h3>Faster Page Loading!</h3>
            <p>Achieve faster TTI by sending less JS on the initial request and wait to load components once they are needed.</p>
            <br />
            <img src='https://placekitten.com/1000/200' alt=''/>
        </div>
    )
}
export default dyn