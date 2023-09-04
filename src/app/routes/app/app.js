import {
  AccountGroupIcon,
  HomeIcon,
  SendIcon,
  TagMultipleIcon,
} from 'mdi-react'
import { config, Controller } from 'react-spring'
import Menu, { MenuBackground, MenuContent, MenuItem, MenuProvider } from 'app/components/menu'
import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import { ButtonIcon } from 'app/components/button'
import { customUniversalRenderer } from 'app/lib'
import { Helmet } from 'react-helmet'
import { hot } from 'react-hot-loader'
import imageFaviconICO from 'images/favicon.ico'
import imageFaviconPNG from 'images/favicon-152x152.png'
import ReactDOM from 'react-dom'
import Reset from 'app/styles/reset'
import scrollTop from 'dom-helpers/query/scrollTop'
import universal from 'react-universal-component'

const Authors = universal(import('app/routes/authors'), { render: customUniversalRenderer })
const Main = universal(import('app/routes/main'), { render: customUniversalRenderer })
const Post = universal(import('app/routes/post'), { render: customUniversalRenderer })
const Static = universal(import('app/routes/static'), { render: customUniversalRenderer })
const Tags = universal(import('app/routes/tags'), { render: customUniversalRenderer })

const META_DESCRIPTION = 'Showcasing the distinctive genius of LGBTQ artists and creators.'
const META_FULL_TITLE = 'Ignota: The Voice of Queer Genius'
const META_SITE_NAME = 'Ignota'
const META_KEYWORDS = [
  'art',
  'blog',
  'LGBTQ',
  'LGBTQ art',
  'LGBTQ blog',
  'LGBTQ literature',
  'literature',
  'queer',
  'queer art',
  'queer blog',
  'queer literature',
].join(',')

@hot(module)
class App extends PureComponent {
  content = React.createRef()

  controller = new Controller({
    scroll: 0,
  })

  componentDidUpdate(prevProps) {
    const {
      history: {
        action,
      },
      location: {
        key: nextKey,
      },
    } = this.props
    const {
      location: {
        key: prevKey,
      },
    } = prevProps

    if (nextKey !== prevKey && action === 'PUSH') {
      const contentNode = ReactDOM.findDOMNode(this.content.current)
      const scroll = scrollTop(contentNode)

      this.controller = new Controller({
        config: config.slow,
        duration: 300,
        scroll,
      })

      this.forceUpdate()
    }
  }

  render() {
    const {
      location: { pathname },
    } = this.props

    const { scroll } = this.controller.update({ scroll: 0 })

    const fqURL = process.env.NODE_ENV === 'production'
      ? `https://ignota.com${ pathname }`
      : `https://ignota.fyi${ pathname }`
    const assetURL = `https://ass.ignota.${ process.env.NODE_ENV === 'production' ? 'cloud' : 'fyi' }`
    const apiURL = `https://api.ignota.${ process.env.NODE_ENV === 'production' ? 'cloud' : 'fyi' }`
    const uploadURL = `https://up.ignota.${ process.env.NODE_ENV === 'production' ? 'cloud' : 'fyi' }`

    return (
      <>
        <Reset />
        <Helmet defaultTitle='Ignota | The voice of queer genius.' titleTemplate='%s | Ignota'>
          <meta charSet='utf-8' />
          <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
          <meta content='IE=edge,chrome=1' httpEquiv='X-UA-Compatible' />

          <link href={ assetURL } rel='dns-prefetch' />
          <link href={ assetURL } rel='preconnect' />
          <link href={ apiURL } rel='dns-prefetch' />
          <link href={ apiURL } rel='preconnect' />
          <link href={ uploadURL } rel='dns-prefetch' />
          <link href={ uploadURL } rel='preconnect' />

          <link
            rel='shortcut icon'
            type='image/x-icon'
            // A bug in Slack's unfurls will only recognize favicon links whose
            // attributes are sorted `rel`, `type`, `href`!
            // eslint-disable-next-line react/jsx-sort-props
            href={ imageFaviconICO } />
          <link href={ imageFaviconPNG } rel='apple-touch-icon' />

          <meta content={ META_DESCRIPTION } name='description' />
          <meta content={ META_KEYWORDS } name='keywords' />

          { /* Google Search Console */ }
          <meta content='xZdTPQVJp-zU6XcrEtqIsYEogzZiyuMsg0-aXME67r8' name='google-site-verification' />

          { /* Facebook OpenGraph */ }
          <meta content={ fqURL } property='og:url' />
          <meta content='website' property='og:type' />
          <meta content={ META_FULL_TITLE } property='og:title' />
          <meta content={ imageFaviconPNG } property='og:image' />
          <meta content={ META_DESCRIPTION } property='og:description' />
          <meta content={ META_SITE_NAME } property='og:site_name' />
          <meta content='468421176930183' property='fb:app_id' />
          <meta content='en_US' property='og:locale' />

          { /* Twitter Cards */ }
          <meta content='summary' name='twitter:card' />
          <meta content='@ignotadotcom' name='twitter:site' />
          <meta content={ fqURL } name='twitter:url' />
          <meta content={ META_FULL_TITLE } name='twitter:title' />
          <meta content={ META_DESCRIPTION } name='twitter:description' />
          <meta content={ imageFaviconPNG } name='twitter:image' />
          <meta content='on' name='twitter:dnt' />
        </Helmet>
        <MenuProvider>
          <Menu>
            <MenuItem color='white' to='/'>
              <ButtonIcon use={ HomeIcon } />
                Home
            </MenuItem>
            <MenuItem color='white' to='/authors'>
              <ButtonIcon use={ AccountGroupIcon } />
                Authors
            </MenuItem>
            <MenuItem color='white' to='/tags'>
              <ButtonIcon use={ TagMultipleIcon } />
                Tags
            </MenuItem>
            <MenuItem color='white' to='/newsletter'>
              <ButtonIcon use={ SendIcon } />
                Subscribe
            </MenuItem>
          </Menu>
          <MenuBackground />
          <MenuContent ref={ this.content } scrollTop={ scroll }>
            <Switch>
              <Route exact component={ Main } path='/' />
              <Route component={ Post } path='/post/:slug' />
              <Route component={ Authors } path='/authors' />
              <Route component={ Tags } path='/tags' />
              <Route component={ Static } />
            </Switch>
          </MenuContent>
        </MenuProvider>
      </>
    )
  }
}

export default App
