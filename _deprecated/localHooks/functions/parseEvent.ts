

const parseEvent = (e:any, asString = true) => {
    const obj:any = {};
    for (let k in e) {
        obj[k] = e[k];
    }
    if(asString){
        return JSON.stringify(obj, (k, v) => {
            if (v instanceof Node) return 'Node';
            if (v instanceof Window) return 'Window';
            return v;
        }, ' ');
    }else{
        return obj
    }
}
export default parseEvent