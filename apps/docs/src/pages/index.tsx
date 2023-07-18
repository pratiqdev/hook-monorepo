//@ts-nocheck
import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { Card, Icons, Button } from '@site/src/components'
import { useMediaQuery } from '@pratiq/hooks'




// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();

//   return (
//     // <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <header className={styles.container}>
//         <Card className='homepage-card' style={{padding:'2rem', marginTop: '1rem', marginBottom: '1rem'}}>
//           <h1 className="hero__title" style={{fontFamily:'monospace', width:'100%', textAlign:'center', letterSpacing:'.2rem', fontWeight:'normal', fontSize: mq(['1.4rem', '2rem', '2.4rem'])}}>{siteConfig.title}</h1>
//           <p className="hero__subtitle" style={{width:'100%', textAlign:'center', padding:mq(['0 5%', '0 20%']), fontSize: mq(['1rem', '1.4rem', '1.8rem']) }}>
//             A collection of hooks, high-order components and utilities for React and Node.js web development
//           </p>
//           <div className={styles.buttons} style={{display:'flex', flexDirection: mq(['column']), justifyContent:'space-between', alignItems:'stretch'}}>
//             <Link
//               className="button button--primary button--lg homepage-btn-main"
//               style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']),  padding: mq(['.25rem', '.5rem'])}}
//               to="docs/getting-started/installation">
//               Getting Started
//             </Link>
//             {/* <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}> */}
//             <Link
//               style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']), padding: mq(['.25rem', '.5rem'])}}
//               className="button button--primary button--lg homepage-btn"
//               to="docs/hooks/">
//               Hooks
//             </Link>
//             {/* <Link
//                 style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']), padding: mq(['.25rem', '.5rem'])}}
//                 className="button button--primary button--lg homepage-btn"
//                 to="docs/utilities/intro">
//               Utilities
//             </Link> */}
//             {/* <Link
//                 style={{ margin: mq(['.5rem', '1rem']), flex:1, fontSize: mq(['1rem', '1.2rem']), padding: mq(['.25rem', '.5rem'])}}
//                 className="button button--primary button--lg homepage-btn"
//                 to="docs/examples/intro">
//                 Examples
//               </Link> */}
//             </div>
//           {/* </div> */}


//         </Card>
//       </header>
//     // </header>
//   );
// }



function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    // <header className={clsx('hero hero--primary', styles.heroBanner)}>
    <header className={styles.container}>
      <Card className={styles.banner_container}>
        <h1 className={styles.main_title}>{siteConfig.title}</h1>
        <p className="hero__subtitle" style={{ width: '100%', textAlign: 'center', padding: '0 5%', fontSize: '1rem' }}>
          A collection of hooks, high-order components and utilities for React and Node.js web development
        </p>
        <div className={styles.buttons} >
          {/* <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}> */}
          <Link
            className="button button--secondary"
            to="docs/hooks/">
            Hooks
          </Link>
          <Link
            className="button button--primary"
            to="docs/getting-started/installation">
            Getting Started
          </Link>
          <Link
            className="button button--secondary"
            to="docs/examples/">
            Examples
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




  return (
    <Layout
      title={`Welcome`}
      description="React hooks and functions for simplifying common features"
    >
      <HomepageHeader />
      <main className={styles.feature_container}>
       {FeatureList.map((x:any, idx:number) => 

        <Card 
          key={idx}
          className={styles.feature_card}>

          <div className={styles.feature_icon}>
          {x.icon}
          </div>
           <div className={styles.feature_text}>
            <h2 style={{letterSpacing:'.15rem', fontWeight: 'semibold'}}>{x.title}</h2>
            <p >{x.description}</p>
          </div>
        </Card>

      )}
      </main>
    </Layout>
  );
}
