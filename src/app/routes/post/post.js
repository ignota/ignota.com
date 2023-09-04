import {
  Article,
  Contents,
  Spinner,
} from './styled-post'
import React, { PureComponent } from 'react'
import _ from 'lodash'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import { getUploadURL } from 'app/lib'
import { Helmet } from 'react-helmet'
import Loading from 'app/components/loading'
import R from 'ramda'
import universal from 'react-universal-component'

const LazyComponent = universal(({ component }) => {
  const pathname = _.kebabCase(component)
  return import(`app/components/${ pathname }`)
}, {
  loadingTransition: false,
  onError: error => {
    if (__DEV__) {
      throw error
    }

    console.error(error)
  },
  render: ({ component: _component, ...props }, Component, _isLoading, error) => {
    if (error && __DEV__) {
      throw error
    } else if (error) {
      console.error(error)
    }

    if (Component) {
      return <Component { ...props } />
    }

    return null
  },
})

const NON_PROP_KEYS = [
  'createdAt',
  'embed',
  'firstChild',
  'id',
  'nextSibling',
  'type',
  'updatedAt',
  'uuid',
]

@connect(
  (state, props) => {
    const { loading } = state.posts

    const postsByID = state.posts.byID
    const post = Object.values(postsByID).find(p => p.slug === props.match.params.slug) || {}

    const { authors: authorIDs = [] } = post
    const authors = R.pipe(
      R.map(id => R.prop(id, state.authors.byID)),
      R.filter(Boolean),
    )(authorIDs)

    const profiles = R.pipe(
      R.map(author => author.profiles),
      R.flatten,
      R.map(profileID => R.prop(profileID, state.profiles.byID)),
      R.filter(Boolean),
    )(authors)
    const facebookProfiles = profiles.filter(p => p.provider === 'facebook')
    const twitterProfiles = profiles.filter(p => p.provider === 'twitter')

    const postTags = post.tags || []
    const tags = R.map(tagID => R.propOr({}, tagID, state.tags.byID), postTags)

    return {
      authors,
      facebookProfiles,
      loading,
      post,
      tags,
      twitterProfiles,
    }
  },
  { onRequestPost: actions.posts.requestPost },
)
class Post extends PureComponent {
  constructor(props) {
    super(props)

    const {
      match: {
        params: { slug },
      },
      onRequestPost,
    } = props

    onRequestPost(slug)
  }

  get authorNames() {
    const {
      authors,
    } = this.props

    const authorNames = authors.map(a => a.name)
    const lastAuthorName = authorNames.pop()

    return authorNames.length === 0
      ? lastAuthorName
      : authorNames.length === 1
        ? `${ authorNames.join(', ') } and ${ lastAuthorName }`
        : `${ authorNames.join(', ') }, and ${ lastAuthorName }`
  }

  renderContents(rootNode) {
    if (!rootNode) {
      return []
    }

    let node = R.path([0], rootNode)
    let child
    let sibling
    let embed

    if (node.nextSibling) {
      sibling = this.renderContents(node.nextSibling)
    }

    if (node.firstChild) {
      child = this.renderContents(node.firstChild)
    }

    if (node.embed) {
      embed = this.renderContents(node.embed)
    }

    const componentType = node.type && node.type.replace(/(:|Node)/g, '')

    if (componentType === 'Text' && sibling) {
      return node.value
        ? [node.value, sibling]
        : [sibling]
    } else if (componentType === 'Text') {
      return node.value
        ? [node.value]
        : []
    }

    const props = R.omit(NON_PROP_KEYS, node)

    const ary = [
      <LazyComponent component={ componentType } embed={ embed } key={ node.uuid } { ...props }>
        { child }
      </LazyComponent>,
    ]

    if (sibling) {
      ary.push(sibling)
    }

    return ary
  }

  render() {
    const {
      authors,
      error,
      facebookProfiles,
      post,
      tags,
      twitterProfiles,
    } = this.props

    const heroSRC = post.heroSRC ? getUploadURL(post.heroSRC) : null
    const { height, width } = post.heroSRC ? post.heroSRC.metadata : {}

    return (
      <>
        <Helmet>
          <title>{ post.title }</title>

          { authors.map(author => <meta content={ author.name } key={ author.uuid } name='author' />) }

          { /* Facebook OpenGraph */ }
          <meta content='article' property='og:type' />
          <meta content={ post.title } property='og:title' />
          <meta content={ heroSRC } property='og:image' />
          { height && <meta content={ height } property='og:image:height' /> }
          { width && <meta content={ width } property='og:image:width' /> }
          <meta content={ post.excerpt } property='og:description' />
          { facebookProfiles.map(profile => <meta content={ profile.url } key={ profile.uuid } property='article:author' />) }
          <meta content={ post.publishedAt } property='article:published_time' />

          { /* Twitter Cards */ }
          <meta content='summary_large_image' name='twitter:card' />
          { twitterProfiles.map(profile => <meta content={ profile.providerID } key={ profile.uuid } name='twitter:creator' />) }
          <meta content={ post.title } name='twitter:title' />
          <meta content={ post.excerpt } name='twitter:description' />
          <meta content={ heroSRC } name='twitter:image' />

          { /* Slack Unfurls */ }
          <meta content={ authors.length > 1 ? 'Authors' : 'Author' } name='twitter:label1' />
          <meta content={ this.authorNames } name='twitter:data1' />
          { !!tags.length && <meta content='Tagged' name='twitter:label2' /> }
          { !!tags.length && <meta content={ tags.map(t => t.name).join(', ') } name='twitter:data2' /> }
        </Helmet>
        <LazyComponent authors={ authors } component='PostToolbar' title={ post.title } />
        { do {
          if (post.rootNode) {
            <Article>
              <Contents>
                { R.pipe(this.renderContents, R.flatten)(post.rootNode) }
              </Contents>
              <LazyComponent authors={ authors } component='PostMeta' post={ post } tags={ tags } />
            </Article>
          } else if (error) {
            <Spinner>
              <Loading error={ error } />
            </Spinner>
          } else {
            <Spinner>
              <Loading />
            </Spinner>
          }
        } }
      </>
    )
  }
}

export default Post
