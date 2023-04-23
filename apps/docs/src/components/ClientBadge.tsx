import React from 'react'
import { Close } from '@emotion-icons/evaicons-solid/Close'
import { Server } from '@emotion-icons/fa-solid/Server'



const Badge = (props: any) => {
    return <div className='client-badge'><Close size='65' color='red' style={{marginRight:'-2rem'}}/><Server size='25' style={{marginRight:'1rem'}}/><div className='status-badge-title'>CSR ONLY</div><div>This hook only works in the <b>browser</b>. It will <b>fail in SSR</b> environments.</div></div>
}

export default Badge
