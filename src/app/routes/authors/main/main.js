import {
  AuthorBio,
  AuthorHero,
  AuthorMedia,
  FeaturedAuthor,
  FeaturedContainer,
  FeaturedHeading,
  FeaturedPost,
  Heading,
  ImageButton,
  More,
  Pagination,
  PostHeading,
  Root,
  Strut,
  SupportingAuthor,
  SupportingContainer,
} from './styled-main'
import Button, { ButtonIcon } from 'app/components/button'
import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { ChevronRightIcon } from 'mdi-react'
import { connect } from 'react-redux'
import CroppedImage from 'app/components/cropped-image'
import { Helmet } from 'react-helmet'
import Link from 'app/components/link'
import MainToolbar from 'app/components/main-toolbar'
import moment from 'moment'
import Paragraph from 'app/components/paragraph'
import R from 'ramda'

@connect(
  state => {
    const { byID, currentPage } = state.authors

    const authors = Object.values(byID).map(author => {
      const posts = R.pipe(
        R.map(id => R.propOr({}, id, state.posts.byID)),
        R.sortBy(R.prop('publishedAt')),
      )(author.posts || [])
      return R.assoc('posts', posts, author)
    })

    const featuredAuthors = R.filter(a => a.featured, authors)
    const supportingAuthors = R.filter(a => !a.featured, authors)

    return {
      currentPage,
      featuredAuthors,
      supportingAuthors,
    }
  },
  { onRequestAuthorsPage: actions.authors.requestAuthorsPage },
)
class AuthorsMain extends PureComponent {
  constructor(props) {
    super(props)

    const { onRequestAuthorsPage } = props
    onRequestAuthorsPage()
  }

  renderFeaturedAuthor(author) {
    const recentPosts = R.slice(0, 2, author.posts)

    return (
      <FeaturedAuthor key={ author.uuid }>
        <AuthorMedia>
          <AuthorHero>
            <ImageButton disableRipple to={ `/authors/${ author.slug }` }>
              <CroppedImage src={ author.pictureSRC } />
            </ImageButton>
            <FeaturedHeading size={ 3 }>
              <Link plain color='white' to={ `/authors/${ author.slug }` }>
                { author.name }
              </Link>
            </FeaturedHeading>
          </AuthorHero>
          { recentPosts.map(post => (
            <FeaturedPost key={ post.uuid }>
              <ImageButton disableRipple to={ `/post/${ post.slug }` }>
                <CroppedImage src={ post.heroSRC } />
              </ImageButton>
              <PostHeading size={ 5 }>
                <Link plain color='white' to={ `/post/${ post.slug }` }>
                  { post.title }
                </Link>
              </PostHeading>
            </FeaturedPost>
          )) }
        </AuthorMedia>
        <AuthorBio>
          <Paragraph>
            { author.bio }
          </Paragraph>
        </AuthorBio>
        <More>
          <Button to={ `/authors/${ author.slug }` }>
            Read More
          </Button>
        </More>
      </FeaturedAuthor>
    )
  }

  renderSupportingAuthor(author) {
    const recentPost = R.head(author.posts) ?? {}

    return (
      <SupportingAuthor key={ author.uuid }>
        <AuthorHero>
          <ImageButton disableRipple to={ `/authors/${ author.slug }` }>
            <CroppedImage src={ author.pictureSRC } />
          </ImageButton>
        </AuthorHero>
        <AuthorBio>
          <Heading size={ 4 }>
            <Link plain color='text' to={ `/authors/${ author.slug }` }>
              { author.name }
            </Link>
          </Heading>
          <Paragraph>
            <strong>Latest Post:</strong>
                        &nbsp;
            <Link to={ `/post/${ recentPost.slug }` }>
              { recentPost.title }
            </Link>
            &nbsp;
            ({ moment(recentPost.publishedAt).format('D MMMM YYYY') })
          </Paragraph>
          <Strut />
          <More>
            <Button to={ `/authors/${ author.slug }` }>
              Read More
            </Button>
          </More>
        </AuthorBio>
      </SupportingAuthor>
    )
  }

  render() {
    const {
      currentPage,
      featuredAuthors,
      supportingAuthors,
    } = this.props

    return (
      <>
        <Helmet>
          <title>Authors</title>
        </Helmet>
        <MainToolbar />
        <Root>
          <FeaturedContainer>
            { featuredAuthors.map(this.renderFeaturedAuthor) }
          </FeaturedContainer>
          <SupportingContainer>
            { supportingAuthors.map(this.renderSupportingAuthor) }
          </SupportingContainer>
          <Pagination>
            <Button to={ `/authors/page/${ currentPage }` }>
              More Authors
              <ButtonIcon use={ ChevronRightIcon } />
            </Button>
          </Pagination>
        </Root>
      </>
    )
  }
}

export default AuthorsMain
