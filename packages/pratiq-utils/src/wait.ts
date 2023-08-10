const wait = (_time = 1000) => {
    return new Promise((res)=>{
        setTimeout(() => res(true), _time)
    })
}
export default wait