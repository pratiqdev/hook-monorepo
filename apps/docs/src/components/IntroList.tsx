import React from 'react'
import { Card } from './index'
//@ts-ignore
import { getHooksAlphabetized } from '/utils/getHooks' 

export const List = () => {
    // const d = Object.entries(data)

    const Tags = ({tags}) => 
        <div style={{display:'flex', marginBottom:'.5rem', alignItems:'center', marginTop:'.5rem', height:'100%'}}>
            {(!tags || !tags.length) ? null : tags
            .map((x) => <div key={x} 
                className=""
                style={{
                    background: '#8886',
                    padding: '.0rem .25rem', 
                    borderRadius: '.25rem', 
                    fontSize:'.8rem', 
                    marginRight: '.1rem'
                }}>{x.trim()}</div>
            )}
        </div>



    return getHooksAlphabetized().map(({title, description, tags}) => {
        return (
            <a key={title}href={`/docs/hooks/${title}`} style={{color:'inherit', textDecoration: 'none'}}>
            <Card className='list-card' style={{padding:'.5rem', paddingTop:'.25rem', display: 'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                <div>
                    <div style={{display:'flex', alignItems: 'center'}}>
                        {title && <h4 style={{margin:'.25rem', fontSize: '1.2rem'}}>{title}</h4>}
                        {tags && <Tags tags={tags}/>}
                    </div>
                    {description && <p style={{fontSize:'1rem', margin: '0 .25rem'}}>{description}</p>}
                </div>
                <div className='right-chev' />
            </Card>
            </a>
        )      
    })
}

export default List