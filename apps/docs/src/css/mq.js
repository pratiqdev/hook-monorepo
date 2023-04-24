import { useMediaQuery } from "@pratiq/hooks";

const mq = () => useMediaQuery({
    'sm': '(max-width: 1000px)',
    'md': '(min-width: 1001px) and (max-width: 1200px)',
    'lg': '(min-width: 1201px) and (max-width: 1400px)',
    'xl': '(min-width: 1401px)',
})

export default mq