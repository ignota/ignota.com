import {
  AtIcon,
  FacebookIcon,
  LinkIcon,
  TwitterIcon,
} from 'mdi-react'
import Button, { ButtonIcon } from 'app/components/button'
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
  SocialButtons,
  Timestamp,
} from './styled-author'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import CroppedImage from 'app/components/cropped-image'
import Heading from 'app/components/heading'
import { Helmet } from 'react-helmet'
import Link from 'app/components/link'
import MainToolbar from 'app/components/main-toolbar'
import moment from 'moment'
import Paragraph from 'app/components/paragraph'
import R from 'ramda'

const PROVIDER_COLORS = {
  email: 'text',
  facebook: 'facebook',
  portfolio: 'text',
  twitter: 'twitter',
}

const PROVIDER_ICONS = {
  email: AtIcon,
  facebook: FacebookIcon,
  portfolio: LinkIcon,
  twitter: TwitterIcon,
}

const PROVIDER_NAMES = {
  email: 'E-Mail',
  facebook: 'Facebook',
  portfolio: 'Portfolio',
  twitter: 'Twitter',
}

@connect(
  (state, props) => {
    const { slug } = props.match.params

    const author = R.pipe(
      R.values,
      R.find(R.whereEq({ slug })),
    )(state.authors.byID) ?? {}

    const posts = R.pipe(
      R.map(id => R.propOr({}, id, state.posts.byID)),
      R.sortBy(R.prop('publishedAt')),
      R.map(post => {
        const tags = R.map(id => R.propOr({}, id, state.tags.byID), post.tags ?? [])
        return R.assoc('tags', tags, post)
      }),
    )(author.posts ?? [])

    const profiles = R.map(id => R.propOr({}, id, state.profiles.byID), author.profiles ?? [])

    return {
      author,
      posts,
      profiles,
    }
  },
  {
    onRequestAuthor: actions.authors.requestAuthor,
  },
)
class Author extends PureComponent {
  constructor(props) {
    super(props)

    const {
      match: {
        params: { slug },
      },
      onRequestAuthor,
    } = props

    onRequestAuthor(slug)
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
      author,
      posts,
      profiles,
    } = this.props

    return (
      <>
        <Helmet>
          <title>{ author.name }</title>
        </Helmet>
        <MainToolbar />
        <Root>
          <Hero>
            <Portrait>
              <CroppedImage src={ author.pictureSRC } />
            </Portrait>
            <Name>
              <Heading size={ 2 }>
                { author.name }
              </Heading>
              <Paragraph>
                { author.bio }
              </Paragraph>
            </Name>
          </Hero>
          <SocialButtons>
            { profiles.map(profile => (
              <Button popup color={ PROVIDER_COLORS[profile.provider] } key={ profile.uuid } to={ profile.url }>
                { PROVIDER_NAMES[profile.provider] }
                <ButtonIcon use={ PROVIDER_ICONS[profile.provider] } />
              </Button>
            )) }
          </SocialButtons>
          <Posts>
            { posts.map(this.renderPost) }
          </Posts>
        </Root>
      </>
    )
  }
}

export default Author
