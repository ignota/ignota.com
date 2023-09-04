import {
  Hero,
  ImageButton,
  Name,
  Portrait,
  Post,
  PostButton,
  PostImage,
  Posts,
  Root,
  Timestamp,
} from './styled-tag'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import Button from 'app/components/button'
import { connect } from 'react-redux'
import CroppedImage from 'app/components/cropped-image'
import Heading from 'app/components/heading'
import { Helmet } from 'react-helmet'
import Link from 'app/components/link'
import MainToolbar from 'app/components/main-toolbar'
import moment from 'moment'
import Paragraph from 'app/components/paragraph'
import R from 'ramda'

@connect(
  (state, props) => {
    const { slug } = props.match.params

    const tag = R.pipe(
      R.values,
      R.find(R.whereEq({ slug })),
    )(state.tags.byID) ?? {}

    const posts = R.pipe(
      R.map(id => R.prop(id, state.posts.byID)),
      R.filter(Boolean),
      R.sortBy(R.prop('lastPost')),
      R.map(post => {
        const authors = R.pipe(
          R.map(id => R.prop(id, state.tags.byID)),
          R.filter(Boolean),
        )(post.authors ?? [])
        return R.assoc('authors', authors, post)
      }),
    )(tag.posts ?? [])

    return {
      posts,
      tag,
    }
  },
  {
    onRequestTag: actions.tags.requestTag,
  },
)
class Tag extends PureComponent {
  constructor(props) {
    super(props)

    const {
      match: {
        params: { slug },
      },
      onRequestTag,
    } = props

    onRequestTag(slug)
  }

  renderPost(post) {
    return (
      <Post key={ post.uuid }>
        <ImageButton disableRipple to={ `/post/${ post.slug }` }>
          <PostImage>
            <CroppedImage src={ post.heroSRC } />
          </PostImage>
        </ImageButton>
        <Heading size={ 4 }>
          <Link plain color='text' to={ `/post/${ post.slug }` }>
            { post.title }
          </Link>
        </Heading>
        <Paragraph>
          { post.excerpt }
        </Paragraph>
        <PostButton>
          <Timestamp>
            { moment(post.publishedAt).format('D MMMM YYYY') }
          </Timestamp>
          <Button to={ `/post/${ post.slug }` }>
            Read More
          </Button>
        </PostButton>
      </Post>
    )
  }

  render() {
    const {
      posts,
      tag,
    } = this.props

    const heroSRC = R.path(['heroSRC', 'hero'], tag)

    return (
      <>
        <Helmet>
          <title>{ tag.name }</title>
        </Helmet>
        <MainToolbar />
        <Root>
          <Hero>
            <Portrait>
              <CroppedImage src={ heroSRC } />
            </Portrait>
            <Name>
              <Heading size={ 2 }>
                { tag.name }
              </Heading>
              <Paragraph>
                { tag.description }
              </Paragraph>
            </Name>
          </Hero>
          <Posts>
            { posts.map(this.renderPost) }
          </Posts>
        </Root>
      </>
    )
  }
}

export default Tag
