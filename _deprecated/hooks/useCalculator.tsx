import React, { useState, useEffect, useCallback } from 'react'



type Operator = {
    type: string; // 'basic' | 'currency' | 'time' | etc.
    symbol: string;
    description?: string;
    operation: (...args:number[]) => number;
}

type OperatorMap = { [key:string]: Operator }

type UseCalculatorConfig = {
    /** User created operators in addition to the provided operators */
    customOperators?: OperatorMap;


}

type UseCalculatorReturn = any

type UseCalculator = (config: UseCalculatorConfig) => UseCalculatorReturn

type N = number

type HistoryMap = { [key:string]: number }

const providedOperators: OperatorMap = {
    'addition':{
        type: 'basic',
        symbol: '+',
        operation: (a:N,b:N) => a + b
    },
    'subtraction':{
        type: 'basic',
        symbol: '-',
        operation: (a:N,b:N) => a - b
    }
}

const useCalculator:UseCalculator = (config: UseCalculatorConfig = {}) => {
    const [result, setResult] = useState<number>(null)
    const [operandA, setOperandA] = useState<number>(null)
    const [operandB, setOperandB] = useState<number>(null)
    const [history, setHistory] = useState<HistoryMap>({})

    const operatorMap: OperatorMap = providedOperators
    Object.assign(operatorMap, config.customOperators)

    const operators = {}
    Object.entries(operatorMap).forEach(([name, obj]) => {
        operators[name] = obj.operation
    })









    return {
        result,
        history,
        operatorMap,
        operandA,
        operandB,
        setOperandA,
        setOperandB,
    }
}

export default useCalculator




/*
+ WHAT CHANGES:
- language
- decimal seperator: 1,000.00 vs 1.000,00
- 


+ COMMON FEATURES
- basic math
- conversions:
    - currencies
    - fractions
- undo/redo
- clear


+ UX
- use last value on operand when no primary operator input


+ HISTORY
- "timstamp:::full_operation_string" => result number


*/