// @ts-nocheck
import React, { useEffect, useState } from 'react'
// import { useInput } from '@pratiq/hooks'
import CodeBlock from '@theme/CodeBlock'
// import useClamp from '/src/hooks/useClamp'
import { useCalculator } from '@pratiq/hooks'
import Layout from '/src/components/DemoLayout'
import { getHookDataByTitle } from '/utils/getHooks'
const data = getHookDataByTitle('useCalculator')

// + useAsync
function DemoComponent () {
  const pkg = useCalculator()

  return (
    <Layout {...data}>
      <div style={{ background: '#ccc4', padding: '.5rem', borderRadius: '.5rem', width: 'min-content', marginBottom: '1rem', borderRadius: '.5rem' }}>
        <pre>{JSON.stringify(pkg, null, 2)}</pre>
        <button onClick={() => pkg.operators.addition(1, 3)} />
      </div>

      <CodeBlock language="ts" className="demo-display">
        {
`
`
}
      </CodeBlock>

    </Layout>
  )
}

export default DemoComponent
