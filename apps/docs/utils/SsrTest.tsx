import React from 'react'
// import useCookie from './useCookie'
import * as pkg from '@pratiq/hooks'

export default () => {
    const something = pkg.useCookie('myCookie', 'nom')
    
    return(
        <p>SSR Test</p>
    )
}