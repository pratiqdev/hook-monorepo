## TODO


### 0 - add 'empty' return object to all hooks to return noops and null values instead of returning undefined



### 1 - Refactor all interfaces to match

- same casing / underscore for interface names `I_BumpyCaps`
- same naming conventions for variable names `enableSomeSetting: true`
- commented examples in a column `// example`
- interfaces use brackets `<I_UseInterfaces>`

```ts
export interface I_Object {     // example
    [key: string]: any;         // 'key': { a: 'value' }
}

export interface I_UseThing {   // example
    thing: <I_Object>           // interface
    isOkay: boolean;            // true
}
```


### 2 - Replace all `console.log`

All calls to `console.log()` should use `extend()` of `debug` exported from `utils/logger`


### 3 - Convert Return Values to HeadlessTable

All return value sections should match, use HeadlessTable component to display all return values and types


### 4 - Refactor Interfaces and Config Examples

See useNotifications for good example

- add examples to interface codeblock
- add names, types and descriptions to table
- add return structure interface as well as 'hook methods'


```ts
export interface I_UseNotificationOptions { // example
    dir?: string;                           // 'rtl'
    actions?: <I_ActionObject[]>            // [ { action:'', title:'', icon:'' },  ]       
}

export interface I_UseNotificationReturn {
    notify: Function; 
    request: Function;
    available: boolean; 
    permission: boolean;
}
```



#### `<I_UseNotificationReturn>`

| a | b | c |
|---|---|---|
notify | Function | The function used to emit a notification
request | Function | Request permission to use notifications if permission is false




### 5 - Demos should have consistent layout and collapsible code block

```
-----------------------------
|  INPUT - BTN - BTN -BTN   |
-----------------------------
| Return | value | table    |
-----------------------------
|           CODE            |
-----------------------------


-----------------------------
| Return | value | table    |
-----------------------------
|           CODE            |
-----------------------------


-----------------------------
|  INPUT - BTN - BTN -BTN   |
-----------------------------
|           CODE            |
-----------------------------


-----------------------------
|           CODE            |
-----------------------------
```



### 6 - Use destructured import for markdown components

```ts
import { Card, MainText, RelatedTable, HeadlessTable } from '/src/components'
```








### 7 - Convert project to monorepo with package/, tests/ and docs/