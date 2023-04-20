//@ts-nocheck
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Card, Icons } from '@site/src/components'
import { useMediaQuery } from '@pratiq/hooks'




function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const mq = useMediaQuery({
    'sm':'(max-width: 1000px)',
    'md':'(min-width: 1001px) and (max-width: 1200px)',
    'lg':'(min-width: 1201px) and (max-width: 1400px)',
    'xl':'(min-width: 1401px)',
  })

  return (
    // <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <header className="container">
        <Card className='homepage-card' style={{padding:'2rem', marginTop: '1rem', marginBottom: '1rem'}}>
          <h1 className="hero__title" style={{fontFamily:'monospace', width:'100%', textAlign:'center', letterSpacing:'.2rem', fontWeight:'normal', fontSize: mq(['1.4rem', '2rem', '2.4rem'])}}>{siteConfig.title}</h1>
          <p className="hero__subtitle" style={{width:'100%', textAlign:'center', padding:mq(['0 5%', '0 20%']), fontSize: mq(['1rem', '1.4rem', '1.8rem']) }}>
            A collection of hooks, high-order components and utilities for React and Node.js web development
          </p>
          <div className={styles.buttons} style={{display:'flex', flexDirection: mq(['column']), justifyContent:'space-between', alignItems:'stretch'}}>
            <Link
              className="button button--primary button--lg homepage-btn-main"
              style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']),  padding: mq(['.25rem', '.5rem'])}}
              to="docs/getting-started/installation">
              Getting Started
            </Link>
            {/* <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}> */}
            <Link
              style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']), padding: mq(['.25rem', '.5rem'])}}
              className="button button--primary button--lg homepage-btn"
              to="docs/hooks/">
              Hooks
            </Link>
            {/* <Link
                style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']), padding: mq(['.25rem', '.5rem'])}}
                className="button button--primary button--lg homepage-btn"
                to="docs/utilities/intro">
              Utilities
            </Link> */}
            {/* <Link
                style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']), padding: mq(['.25rem', '.5rem'])}}
                className="button button--primary button--lg homepage-btn"
                to="docs/examples/intro">
                Examples
              </Link> */}
            </div>
          {/* </div> */}


        </Card>
      </header>
    // </header>
  );
}

function Section(props:any) {
  return (
      // <div className="container">
        <Card style={{padding:'2rem', paddingBottom:'1rem', margin:'2rem ', display:'flex', ...props.style}}>
          {props.children}
        </Card>
      // </div>
  );
}


const FeatureList: FeatureItem[] = [
  {
    title: 'Use and Reuse',
    icon: <Icons icon='cycle' iconProps={{size:'4rem', color: 'primary'}} />,
    description: (
      <>
        Designed to simplify the developer experience and reduce repitition with
        hooks that are easy to use and extend. 
      </>
    ),
  },
  {
    title: 'Powered by React',
    icon: <Icons icon='react' iconProps={{size:'4rem', color:'primary'}} />,
    description: (
      <>
        Add <code>@pratiq/hooks</code> to your projects, check out the docs 
        and demos for a closer look then get back to creating something awesome.
      </>
    ),
  },
  // {
  //   title: 'Tested. Tested again.',
  //   icon: <Icons icon='test' iconProps={{size:'4rem', color: 'primary'}} />,
  //   description: (
  //     <>
  //       Tested multiple environments to ensure reliability without unintended 
  //       side-effects, unnecessary rerenders, stale closures and other common pitfalls.
  //     </>
  //   ),
  // },
  // {
  //   title: 'SSR Compatible',
  //   icon: <Icons icon='server' iconProps={{size:'4rem', color:'primary'}} />,
  //   description: (
  //     <>
  //       Built for the client-side and fully compatible with server rendering environments like Next.js
  //     </>
  //   ),
  // },
  {
    title: 'Just Easy',
    icon: <div style={{display:'flex', alignItems:'center'}}>
      <Icons icon='coffee' iconProps={{size:'2rem', color:'primary'}} />
      <div style={{margin: '0 1rem'}}>
        <Icons icon='heartEyes' iconProps={{size:'4rem', color:'primary'}} />
      </div>
      <Icons icon='code' iconProps={{size:'2rem', color:'primary'}} />
      </div>,
    description: (
      <>
        Hooks and utilities that provide complex features for users and devs, without feeling too complicated
      </>
    ),
  },
];
  
export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const isMobile = useMediaQuery(`(max-width: 996px)`)

  const mq = useMediaQuery({
    'sm':'(max-width: 1000px)',
    'md':'(min-width: 1001px) and (max-width: 1200px)',
    'lg':'(min-width: 1201px) and (max-width: 1400px)',
    'xl':'(min-width: 1401px)',
  })




/*
{mq([
  <SM />,
  <MD />,
  <LG />,
  <XL />,
])}

*/
  
  
  return (
    <Layout
      title={`Welcome`}
      description="React hooks and functions for simplifying common features"
    >
      <HomepageHeader />
      <main className='pb-3 container' style={{padding: '0', maxWidth: '100vw'}}>
      <div style={{
        display:'flex',
        flexWrap:'wrap',
        width:'100%',
        maxWidth: 'min(100vw, 1320px)',
        margin: 'auto',
      }}>
       {FeatureList.map((x:any, idx:number) => 

        <Section 
          key={idx}
          style={{
            display: 'flex',
            // flexDirection: mq(['column', idx % 2 === 0 ? 'row' : 'row-reverse']), 
            justifyContent: 'center',
            alignItems: 'center',
            // alignItems: mq(['center', 'center', 'flex-start']),
            // margin: mq(['0rem', null, '2rem 1rem']),
            marginLeft: '1rem',
            marginRight: '1rem',
            marginBottom: '1rem',
            paddingBottom:'1rem',
            flexWrap: 'wrap',
            flex:1,
            minWidth: mq(['80%', '50%', '35%']),
          }}>

            {x.icon}
          <div style={{
              flex:1, 
              display:'flex', 
              flexDirection: 'column', 
              margin: mq(['0 1rem', '0']),
              marginTop: mq(['2rem', '0']),
              alignItems: 'center', //idx % 2 === 0 ? mq(['center', 'flex-start']) : mq(['center', 'flex-end']), 
              textAlign: 'center', //idx % 2 === 0 ? mq(['center', 'left']) : mq(['center', 'right']), 
              width: '100%',
              }}>
            <h2 style={{letterSpacing:'.15rem'}}>{x.title}</h2>
            <p style={{fontSize: mq(['1rem', '1.2rem'])}}>{x.description}</p>
          </div>
        </Section>

      )}
      </div>
      </main>
    </Layout>
  );
}
