// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
// - duotoneLight
const lightCodeTheme = require('prism-react-renderer/themes/vsLight')
const darkCodeTheme = require('prism-react-renderer/themes/vsDark')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '@pratiq/hooks',
  tagline: 'React hooks and functions',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/favicon.ico',
  organizationName: 'pratiqdev', // Usually your GitHub org/user name.
  projectName: '@pratiq/hooks', // Usually your repo name.
  trailingSlash: false,

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js')
          // Please change this to your repo.
          // editUrl: 'https://github.com/pratiqdev/custom-hooks',
        },
        // blog: {
        // showReadingTime: true,
        // Please change this to your repo.
        // editUrl: 'https://github.com/pratiqdev/custom-hooks',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      })
    ]
  ],

  plugins: ['@docusaurus/theme-live-codeblock'],

  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true
        
      },

      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'bottom',
      },

      navbar: {
        // title: '@pratiq/hooks',
        logo: {
          alt: '@pratiq/hooks',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'right',
            label: 'Docs'
          },
          {
            type: 'doc',
            docId: 'examples/index',
            position: 'right',
            label: 'Examples'
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/pratiqdev/pratiq-hooks',
            label: 'GitHub',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: 'docs'
              },
              {
                label: 'Getting Started',
                to: 'docs/getting-started/installation'
              }
              // {
              //   label: 'Examples',
              //   to: 'docs/examples/form',
              // },
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus'
              },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/docusaurus',
              // },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus'
              }
            ]
          },
          {
            title: 'More',
            items: [
              // {
              //   label: 'Blog',
              //   to: '/blog',
              // },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus'
              }
            ]
          }
        ],
        copyright: 'Created by Michael Jannetta<br/>Unlicense 2022 - Pratiq Development, Inc.'
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    })
}

module.exports = config
