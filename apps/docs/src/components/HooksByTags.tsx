import React from 'react'
// @ts-ignore
import { getAllHooksByTags } from '/utils/getHooks'
import { Card } from './index'

export const HooksByTags = () => {

    return <div style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap', margin:'-.5rem'}}>

    {Object.entries(getAllHooksByTags()).map(([tag, hookArr]:any) => 
        <Card key={tag} style={{width:'50%', margin:'.5rem'}}>
            <h3 style={{marginLeft:'.25rem'}}>{tag}</h3>
            <div style={{margin:'-.25rem', padding:0, paddingLeft:'0rem', fontSize: '1rem', lineHeight:'1rem', marginBottom:'1rem', display:'flex', flexWrap:'wrap'}}>
                {hookArr.map(hook => 
                    <a key={hook.title + tag} href={`/docs/hooks/${hook.title}`} style={{color:'inherit'}}>
                        <p style={{padding:'.5rem', margin:'.25rem', background: '#7782', borderRadius: '.25rem', color:'inherit'}}>{hook.title}</p>
                    </a>
                )}
            </div>
        </Card>
    )}
    
    </div>
}

export default HooksByTags
