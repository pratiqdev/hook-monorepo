import React from 'react'
import { Download } from '@emotion-icons/bootstrap/Download'
import Card from '@site/src/components/Card'
import Link from '@docusaurus/Link'

const flex = { display: 'flex', gap: 10, alignItems: 'center' }

const Item = ({ title, text, link, icon }) => (
    <Card>
        <div style={{ ...flex }}>
            <Link href={link} style={{ ...flex, marginBottom: '1rem', }}>
                {icon}
                <b>{title}</b>
            </Link>
        </div>
        {text}
    </Card>
)

export default Item