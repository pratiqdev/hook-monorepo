import React from 'react'
import hookData from '../../utils/getHooks'

let simpleHookMap = {}
Object.entries(hookData).forEach(([k,v]:any) => {
    simpleHookMap[k] = v.description ?? '?'
})

export const hookMap = {

    // React Hooks
    'useState': 'Hook: Store and manage local React state <a target="_blank" href="https://reactjs.org/docs/hooks-state.html">-&gt;</a>',
    'useEffect': 'Hook: Perform operations after a render <a target="_blank" href="https://reactjs.org/docs/hooks-effect.html">-&gt;</a>',
    'useMemo': 'Hook: Memoize a value to prevent unnecessary operations <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#usememo">-&gt;</a>',
    'useCallback': 'Hook: Memoize a function to prevent unnecessary operations <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#usecallback">-&gt;</a>',
    'useRef': 'Hook: Persist values between renders <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#useref">-&gt;</a>',
    'useReducer': 'Hook: Handle complex state logic with reducers <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#usereducer">-&gt;</a>',
    'useContext': 'Hook: Access the context without wrapping a component <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#usecontext">-&gt;</a>',
    'useLayoutEffect': 'Hook: Perform operations before the browser&apos;s next paint<a target="_blank" href = "https://reactjs.org/docs/hooks-reference.html#uselayouteffect">-& gt;</a > ',
    'useImperativeHandle': 'Hook: Customize the instance value exposed to parent components <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#useimperativehandle">-&gt;</a>',

    // Types
    'ReactNode': 'Type: Anything that can be rendered, including numbers, strings, elements <a target="_blank" href="https://reactjs.org/docs/react-api.html#reactnode">-&gt;</a>',
    'ReactElement': 'Type: An object representing a virtual DOM node <a target="_blank" href="https://reactjs.org/docs/react-api.html#reactreactelement">-&gt;</a>',
    'SetStateAction': 'Type: Allows setting or updating the state in a React component <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#usestate">-&gt;</a>',
    'Dispatch': 'Type: Dispatches actions or other values in various React patterns <a target="_blank" href="https://reactjs.org/docs/hooks-reference.html#dispatchsetstateaction">-&gt;</a>',

    // HOC
    'memo': 'HOC: Memoize a function component <a target="_blank" href="https://reactjs.org/docs/react-api.html#reactmemo">-&gt;</a>',
    'forwardRef': 'HOC: Forward refs through components <a target="_blank" href="https://reactjs.org/docs/react-api.html#reactforwardref">-&gt;</a>',
    'cloneElement': 'HOC: Clone and return a new React element <a target="_blank" href="https://reactjs.org/docs/react-api.html#cloneelement">-&gt;</a>',
    'createContext': 'HOC: Creates a context object <a target="_blank" href="https://reactjs.org/docs/react-api.html#createcontext">-&gt;</a>',
    'PureComponent': 'HOC: A base class for classes that only rerender when props and state change <a target="_blank" href="https://reactjs.org/docs/react-api.html#reactpurecomponent">-&gt;</a>',


    // Custom Hooks
    
}
const fullHookMap = { ...hookMap, ...simpleHookMap }

interface IRelatedTable {
    hooks: string[];
    heading?: boolean;
}


function encodeHTML(str) {
    return str.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

const RelatedTable = (props: IRelatedTable) => {
    const { hooks = [], heading = true } = props

    if(!hooks.length){
        return (
            <table className='footer-related-table'>
                <tbody>
                    {
                    Object.entries(hookMap).map(([key, val]) => {
                            return (
                                <tr key={key}>
                                    <td><a target="_blank" href={key} style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#88f' }}>{key}</a></td>
                                    <td dangerouslySetInnerHTML={{ __html: val }} />
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        )
    }
    
    return(
    <table className='footer-related-table'>
        {heading && <thead>
            <tr>
                <th>Hook</th>
                <th>Description</th>
            </tr>
        </thead>}
        <tbody>
            {props.hooks && props.hooks.map(x => {
                if(x in fullHookMap){
                    return (
                        <tr key={x}>
                            <td><a target="_blank" href={x} style={{fontFamily:'monospace', fontWeight: 'bold', color:'#88f'}}>{x}</a></td>
                            <td dangerouslySetInnerHTML={{ __html: encodeHTML(fullHookMap[x]) }} />
                        </tr>
                    )
                }else{
                    return (
                        <tr key={x}>
                            <td><a target="_blank" href='#related-hook-error' style={{color: 'red', fontWeight:'bold'}}>NO HOOK FOUND</a></td>
                            <td>{x}</td>
                        </tr>
                    )
                }
            })}
        </tbody>
    </table>
)}

export default RelatedTable