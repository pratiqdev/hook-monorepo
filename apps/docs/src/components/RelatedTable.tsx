import React from 'react'
import hookData from '../../utils/getHooks'

let simpleHookMap = {}
Object.entries(hookData).forEach(([k,v]:any) => {
    simpleHookMap[v.title] = v.description
})

const hookMap = {

    // React Hooks
    'useState':'Store and manage local React state',
    'useEffect':'Perform operations after a render',
    'useMemo':'Memoize a value to prevent unnecessary operations',
    'useCallback':'Memoize a function to prevent unnecessary operations',
    'useRef':'Persist values between renders, usually a reference to a DOM node',

    // HOC
    'React.memo':'Memoize a function component to prevent unnecessary renders',
    'React.cloneElement':'',

    // Custom Hooks
    ...simpleHookMap,
    
}

interface IRelatedTable {
    hooks: string[];
}

const RelatedTable = (props: IRelatedTable) => (
    <table className='footer-related-table'>
        <thead>
            <tr>
                <th>Hook</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {props.hooks && props.hooks.map(x => {
                if(x in hookMap){
                    return (
                        <tr key={x}>
                            <td><a href={x} style={{fontFamily:'monospace', fontWeight: 'bold', color:'#88f'}}>{x}</a></td>
                            <td>{hookMap[x]}</td>
                        </tr>
                    )
                }else{
                    return (
                        <tr key={x}>
                            <td><a href='#related-hook-error' style={{color: 'red', fontWeight:'bold'}}>NO HOOK FOUND</a></td>
                            <td>{x}</td>
                        </tr>
                    )
                }
            })}
        </tbody>
    </table>
)

export default RelatedTable