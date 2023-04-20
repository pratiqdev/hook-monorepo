import React from 'react'
import { Close } from '@emotion-icons/evaicons-solid/Close'
import { Cycle } from '@emotion-icons/entypo/Cycle'
import { LogoReact } from '@emotion-icons/ionicons-solid/LogoReact'
import { TestTube } from '@emotion-icons/remix-fill/TestTube'
import { Server } from '@emotion-icons/fa-solid/Server'
import { EmojiHeartEyes } from '@emotion-icons/bootstrap/EmojiHeartEyes'
import { Coffee } from '@emotion-icons/boxicons-regular/Coffee'
import { CodeSlash } from '@emotion-icons/bootstrap/CodeSlash'
import { Brain } from '@emotion-icons/fluentui-system-filled/BrainCircuit'
import { FileDoc } from '@emotion-icons/boxicons-solid/FileDoc'


const Badge = (props: any) => {
    return <div className='client-badge'><Close size='65' color='red' style={{marginRight:'-2rem'}}/><Server size='25' style={{marginRight:'1rem'}}/><div className='status-badge-title'>CSR ONLY</div><div>This hook only works in the <b>browser</b>. It will <b>fail in SSR</b> environments.</div></div>
}

export default Badge
