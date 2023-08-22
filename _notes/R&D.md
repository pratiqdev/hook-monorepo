// TODO- Read this file...

## Hooks to Migrate

- useOnlineStatus
- useOnScreen
- usePageVisibility
- usePosition
- usePerformance
- useScript
- useTimeout
- useTile
- useStateToggle
- useUpdateEffect
- useValidCss
- useCssVariables
- useVibration

## Possible Hooks

**useTime**
Returns the current time on a custom interval, with optional callback
```tsx
const { time } = useTime({
    zone: 'ET', // OR '+5'
    format: (date:Date) => string | number
})
```







## Recommended Separate monorepo/docs

**Reginald**
Regex based file testing
- consider optional reporter (format and print to CLI or write to file)
- consider optional middleware (intercept and read/modify file data before chunks)

**Animatour**  
Animated react tour gide

**bufferedToast**  
Manage and display toast notifications

**refaze**  
still thinking about refaze
refaze-client => refaze-server => refaze-app

**finder**
Customizable file accumulator for node.js
Needs more testing:,current implementation is concerning:
- reads all files and then filters the set (not performant solution)

**Reginald**
Regex based file testing
- consider optional reporter (format and print to CLI or write to file)
- consider optional middleware (intercept and read/modify file data before chunks)
