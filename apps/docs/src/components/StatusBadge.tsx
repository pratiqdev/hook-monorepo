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
    switch(props.status){
        case 1: return <div className='status-badge status-one'><div className='status-badge-title'><TestTube size='22'/>TESTING</div>Currently being tested in various scenarios to ensure usability and stability</div>
        case 2: return <div className='status-badge status-two'><div className='status-badge-title'><CodeSlash size='20'/>DEVELOPMENT</div>Currently iterating on features, design and/or implementation</div>
        case 3: return <div className='status-badge status-three'><div className='status-badge-title'><Server size='20'/>RESEARCH</div>Currently researching this concept and/or similar implementations</div>
        case 4: return <div className='status-badge status-four'><div className='status-badge-title'><Coffee size='25'/>BRAINSTORMING</div>Currently exploring the concept or idea</div>
        default: return <div className='status-badge'><div className='status-badge-title'><FileDoc size='22'/>DOCUMENTATION</div>Finalizing documentation, instructions and in-hook JSDoc comments</div>
    }
}

export default Badge
