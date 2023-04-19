import React, { useEffect } from 'react'
//@ts-nocheck
interface IHeadlessTable {
    items: any[],
    code?: number;
    color?: number;
    heading?: boolean;
    style?: any;
}



const HeadlessTable = (props: IHeadlessTable) => {
    if(!props.items || !Array.isArray(props.items)) return null

    let codeCols = typeof props.code === 'undefined' 
        ? 0 
        : typeof props.code === 'number' 
            ? props.code 
            : 1

    
    return (
        <table style={props.style} className='footer-related-table'>
            {props.heading &&
                <thead>
                    <tr>
                        {props.items[0].map((x:any, hd_idx:number) => 
                            <th 
                                key={x + hd_idx } 
                                style={{
                                    color: '#88f',
                                    fontWeight: 'bold'
                                }} 
                                dangerouslySetInnerHTML={{__html:x}} 
                            />
                        )}
                    </tr>
                </thead>
            }
            <tbody>
                {props.items.slice(props.heading ? 1 : 0, props.items.length).map((x:string[], tr_idx:number) => 
                    <tr key={tr_idx}>
                        {Array.isArray(x) && x.map((x:any, td_idx:number) => 
                            <td 
                                key={x + td_idx } 
                                style={{
                                    fontFamily: codeCols - 1 >= td_idx ? 'monospace' : 'inherit', 
                                    color: typeof x === 'string' && x.includes('@') ? '#88f' : 'inherit',
                                    fontWeight: typeof x === 'string' && x.includes('@') ? 'bold' : 'inherit'
                                }} 
                                dangerouslySetInnerHTML={{__html: typeof x === 'string' ? x.replace('@','') : x}} 
                            />
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default HeadlessTable