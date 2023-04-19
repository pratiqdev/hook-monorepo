import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Use and Reuse',
    img: require('@site/static/img/pratiq-hooks-stack.png').default,
    description: (
      <>
        Designed to simplify the developer experience and reduce repitition with
        hooks that are easy to use and work everywhere. 
      </>
    ),
  },
  {
    title: 'Tested. Tested again.',
    img: require('@site/static/img/pratiq-hooks-testing.png').default,
    description: (
      <>
        Tested in all environments to ensure reliability without unintended 
        side-effects and sticky extras.
      </>
    ),
  },
  {
    title: 'Powered by React',
    img: require('@site/static/img/pratiq-hooks-react.png').default,
    description: (
      <>
        Add <code>@pratiq/hooks</code> to your projects, check out the docs 
        and demos for a closer look then get back to creating something awesome.
      </>
    ),
  },
];

function Feature({title, img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} role="img" src={img} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
