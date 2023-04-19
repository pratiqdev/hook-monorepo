import extend from '../utils/logger'
const log = extend('deepEqual')

/**
 * deepEqual()
 * ---
 * 
 * Deeply compare keys and values of two
 * @param {any} x - used when comparing array of more than two items
 * @param {any} y - used when comparing x, y
 * @returns boolean true if all areguments are equal
 * 
 * @example
 * // compare two items
 * deepEqual(a,b)
 * // compare more than two items
 * deepEqual([a,b,c,d,e])
 */

const deepEqual = (x: any, y = null) => {
    let diffsFound = 0

    const inner = (a:any, b:any) => {
        if( (typeof a == 'object' && a != null) &&
            (typeof b == 'object' && b != null) )
        {
            var count = [0,0];
            for( var a_key in a) count[0]++;
            for( var b_key in b) count[1]++;
            if( count[0]-count[1] !== 0 ) {diffsFound++; return false;}

            for( var key_a in a){ if(!(key_a in b) || !inner(a[key_a],b[key_a])) { diffsFound++; return false } }
            for( var key_b in b){ if(!(key_b in a) || !inner(b[key_b],a[key_b])) { diffsFound++; return false } }

            return true;
        }
        else{
            if(a === b){
                return true;
            }else{
                diffsFound++;
                return false;
            }
        }
    }
    
    if(typeof y == 'undefined'){
        for(let i = 0; i < x.length - 1; i++){
            log(`loop ${i}`)
            inner(x[i], x[i+1])
        }
    }
    else{
        inner(x,y)
    }

    return diffsFound === 0 ? true : false
}


export default deepEqual


// // test function ---------------------------------------------
// const obj1 = {
//     name: 'John',
//     age: 34,
//     id: 1,
//     color: 2

// }

// const obj2 = {
//     name: 'John',
//     age: 34,
//     id: 1,
//     color: 2
// }

// const obj3 = {
//     name: 'John',
//     age: 34,
//     id: 1,
//     color: 1

// }

// let obj4

// log(deepEqual([obj1, obj2, obj3]))  // false
// log(deepEqual(obj1, obj2))          // true
// log(deepEqual(obj1, obj4))          // false
// log(deepEqual(obj1))                // false

// module.exports = deepEqual