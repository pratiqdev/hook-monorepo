import React from 'react'
import { Close } from '@emotion-icons/evaicons-solid/Close'
import { Cycle } from '@emotion-icons/entypo/Cycle'
import { LogoReact } from '@emotion-icons/ionicons-solid/LogoReact'
import { TestTube } from '@emotion-icons/remix-fill/TestTube'
import { Server } from '@emotion-icons/fa-solid/Server'
import { EmojiHeartEyes } from '@emotion-icons/bootstrap/EmojiHeartEyes'
import { Coffee } from '@emotion-icons/boxicons-regular/Coffee'
import { CodeSlash } from '@emotion-icons/bootstrap/CodeSlash'

type IconProps = {
    icon: string;
    iconProps?: { [key:string]: any };
}

const Icons = (props: IconProps) => {
    switch(props.icon){
        case 'close':
        case 'x': return <Close size='40' {...props.iconProps}/>

        case 'cycle': return <Cycle size='30' {...props.iconProps}/>
        case 'react': return <LogoReact size='30' {...props.iconProps}/>
        case 'test': return <TestTube size='30' {...props.iconProps}/>
        case 'server': return <Server size='30' {...props.iconProps}/>
        case 'heartEyes': return <EmojiHeartEyes size='30' {...props.iconProps} />
        case 'coffee': return <Coffee size='30' {...props.iconProps} />
        case 'code': return <CodeSlash size='30' {...props.iconProps} />

        default: return <p>NO-ICON</p>
    }

}

export default Icons