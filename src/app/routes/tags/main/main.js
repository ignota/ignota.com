import Button, { ButtonIcon } from 'app/components/button'
import {
  FeaturedContainer,
  FeaturedHeading,
  FeaturedPost,
  FeaturedTag,
  Heading,
  ImageButton,
  More,
  Pagination,
  PostHeading,
  Root,
  Strut,
  SupportingContainer,
  SupportingTag,
  TagDescription,
  TagHero,
  TagMedia,
} from './styled-main'
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
    const { byID, currentPage } = state.tags

    const tags = R.pipe(
      R.values,
      R.sortBy(R.prop('lastPost')),
      R.map(tag => {
        const posts = R.pipe(
          R.map(id => R.prop(id, state.posts.byID)),
          R.filter(Boolean),
          R.sortBy(R.prop('publishedAt')),
          R.map(post => {
            const authors = R.pipe(
              R.map(id => R.prop(id, state.authors.byID)),
              R.filter(Boolean),
            )(post.authors || [])
            return R.assoc('authors', authors, post)
          }),
        )(tag.posts || [])
        return R.assoc('posts', posts, tag)
      }),
    )(byID)

    const featuredTags = R.filter(t => t.featured, tags)
    const supportingTags = R.filter(t => !t.featured, tags)

    return {
      currentPage,
      featuredTags,
      supportingTags,
    }
  },
  { onRequestTagsPage: actions.tags.requestTagsPage },
)
class TagsMain extends PureComponent {
  constructor(props) {
    super(props)

    props.onRequestTagsPage()
  }

  renderFeaturedTag(tag) {
    const recentPosts = R.slice(0, 2, tag.posts)
    const heroSRC = R.path(['heroSRC', 'hero'], tag)

    return (
      <FeaturedTag key={ tag.uuid }>
        <TagMedia>
          <TagHero>
            <ImageButton disableRipple to={ `/tags/${ tag.slug }` }>
              <CroppedImage src={ heroSRC } />
            </ImageButton>
            <FeaturedHeading size={ 3 }>
              <Link plain color='white' to={ `/tags/${ tag.slug }` }>
                { tag.name }
              </Link>
            </FeaturedHeading>
          </TagHero>
          { recentPosts.map(post => (
            <FeaturedPost key={ post.uuid }>
              <ImageButton disableRipple to={ `/post/${ post.slug }` }>
                <CroppedImage src={ post.heroSRC } />
              </ImageButton>
              <PostHeading size={ 5 }>
                <Link plain color='white' to={ `/post/${ post.heroSRC }` }>
                  { post.title }
                </Link>
              </PostHeading>
            </FeaturedPost>
          )) }
        </TagMedia>
        <TagDescription>
          <Paragraph>
            { tag.description }
          </Paragraph>
        </TagDescription>
        <More>
          <Button to={ `/tags/${ tag.slug }` }>
            Read More
          </Button>
        </More>
      </FeaturedTag>
    )
  }

  renderSupportingTag(tag) {
    const recentPost = R.head(tag.posts) ?? {}
    const heroSRC = R.path(['heroSRC', 'hero'], tag)

    return (
      <SupportingTag key={ tag.uuid }>
        <TagHero>
          <ImageButton disableRipple to={ `/tags/${ tag.slug }` }>
            <CroppedImage src={ heroSRC } />
          </ImageButton>
        </TagHero>
        <TagDescription>
          <Heading size={ 4 }>
            <Link plain color='text' to={ `/tags/${ tag.slug }` }>
              { tag.name }
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
            <Button to={ `/tags/${ tag.slug }` }>
              Read More
            </Button>
          </More>
        </TagDescription>
      </SupportingTag>
    )
  }

  render() {
    const {
      currentPage,
      featuredTags,
      supportingTags,
    } = this.props

    return (
      <>
        <Helmet>
          <title>Tags</title>
        </Helmet>
        <MainToolbar />
        <Root>
          <FeaturedContainer>
            { featuredTags.map(this.renderFeaturedTag) }
          </FeaturedContainer>
          <SupportingContainer>
            { supportingTags.map(this.renderSupportingTag) }
          </SupportingContainer>
          <Pagination>
            <Button to={ `/tags/page/${ currentPage }` }>
              More Tags
              <ButtonIcon use={ ChevronRightIcon } />
            </Button>
          </Pagination>
        </Root>
      </>
    )
  }
}

export default TagsMain
