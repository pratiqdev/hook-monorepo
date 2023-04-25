import React from 'react'
import { Close } from '@emotion-icons/evaicons-solid/Close'
import { Server } from '@emotion-icons/fa-solid/Server'
import { Button, Card, CopyText } from '.'
import Link from '@docusaurus/Link'


const Contribute = (props: any) => (
    <Card className='contribute'>
        <article>
            <h3>Contribute!?</h3>
            <h4>Issue reporting, pull requests and ideas welcome!</h4>
            
            <p>This library is designed for client-side development using React hooks, making it a valuable resource for developers who want to build modern, dynamic web applications. The library is available on <a href="https://github.com/pratiqdev/hook-monorepo">GitHub</a>, where you can browse the code, report issues, and make contributions.</p>
            <p>If you're interested in contributing, start by browsing the <Link href="https://github.com/pratiqdev/hook-monorepo/issues">issues</Link> section of the repository. Here, you'll find a list of tasks and bugs that need to be addressed, as well as discussions about potential improvements to the library. You can also reach out to the project's maintainers to learn more about how you can help.</p>
        </article>

        <div style={{display: 'flex', gap: '.5rem'}}>
            <Button href="https://github.com/pratiqdev/hook-monorepo">GitHub Repo</Button>
            <Button href="https://www.npmjs.com/package/@pratiq/hooks">NPM Package</Button>
            <Button href="https://github.com/pratiqdev/hook-monorepo/issues">Issues</Button>
        </div>
        <div style={{display: 'flex', gap: '.5rem', marginTop: '.5rem'}}>
            <Button href="/docs/dev">Development Status</Button>
            <Button href="https://www.npmjs.com/package/@pratiq/hooks">More ways to contribute</Button>
        </div>

    </Card>
)

export default Contribute
