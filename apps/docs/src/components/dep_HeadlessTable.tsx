import React from 'react'
//@ts-nocheck
interface IHeadlessTable {
    items: any[],
    code: number;
    color: number;
}



const HeadlessTable = (props: IHeadlessTable) => {
    if(!props.items) return null

    let codeCols = typeof props.code === 'undefined' 
        ? 0 
        : typeof props.code === 'number' 
            ? props.code 
            : 1
    let lastOneWasEmpty = false
    
    return (
        <table className={'footer-headless-table'}>
            <tbody>
                {props.items.map((x:string[], tr_idx:number) => 
                    <tr key={tr_idx}>
                        {x.map((x:any, td_idx:number) => 
                            <td 
                                key={x + td_idx } 
                                style={{
                                    fontFamily: codeCols - 1 >= td_idx ? 'monospace' : 'inherit', 
                                    color: x.includes('@') ? '#88f' : 'inherit',
                                    fontWeight: x.includes('@') ? 'bold' : 'inherit'
                                }} 
                                dangerouslySetInnerHTML={{__html:x.replace('@','')}} 
                            />
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default HeadlessTable