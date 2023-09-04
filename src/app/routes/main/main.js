import {
  Excerpt,
  Featured,
  FeaturedContainer,
  FeaturedImage,
  Heading,
  Hero,
  ImageButton,
  Lead,
  LeadContent,
  LeadImage,
  LeadTags,
  Root,
  Supporting,
  SupportingArticle,
  SupportingContent,
  SupportingImage,
  SupportingTags,
  Tag,
  Timestamp,
} from './styled-main'
import React, { PureComponent } from 'react'
import _ from 'lodash'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import CroppedImage from 'app/components/cropped-image'
import { getAuthorLinks } from 'app/lib'
import Link from 'app/components/link'
import MainToolbar from 'app/components/main-toolbar'
import moment from 'moment'
import R from 'ramda'

@connect(
  state => {
    const { byID } = state.posts

    const posts = R.pipe(
      R.values,
      R.map(post => {
        const authors = R.pipe(
          R.map(id => R.prop(id, state.authors.byID)),
          R.filter(Boolean),
        )(post.authors ?? [])
        const tags = R.pipe(
          R.map(id => R.prop(id, state.tags.byID)),
          R.filter(Boolean),
        )(post.tags ?? [])

        return R.pipe(
          R.assoc('authors', authors),
          R.assoc('tags', tags),
        )(post)
      }),
    )(byID)

    return {
      posts,
    }
  },
  { onRequestPostPage: actions.posts.requestPostPage },
)
class Main extends PureComponent {
  constructor(props) {
    super(props)

    const { onRequestPostPage } = props
    onRequestPostPage()
  }

  renderHero(heroPosts) {
    const lead = R.pathOr({}, [0], heroPosts)
    const featuredFirst = R.pathOr({}, [1], heroPosts)
    const featuredLast = R.pathOr({}, [2], heroPosts)

    const leadAuthors = getAuthorLinks(lead.authors)
    const featuredFirstAuthors = getAuthorLinks(featuredFirst.authors)
    const featuredLastAuthors = getAuthorLinks(featuredLast.authors)

    const leadTags = R.pipe(
      _.shuffle,
      R.slice(0, 4),
    )(lead.tags ?? [])

    return (
      <Hero>
        <Lead>
          <LeadImage>
            <ImageButton disableRipple to={ `/post/${ lead.slug }` }>
              <CroppedImage src={ lead.heroSRC } />
            </ImageButton>
          </LeadImage>
          <LeadContent>
            <LeadTags>
              { leadTags.map(t => (
                <Tag
                  color={ t.color }
                  gradient={ t.gradient }
                  heroSRC={ t.heroSRC }
                  key={ t.uuid }
                  name={ t.name }
                  slug={ t.slug } />
              )) }
            </LeadTags>
            <Heading size={ 3 }>
              <Link plain color='text' to={ `/post/${ lead.slug }` }>
                { lead.title }
              </Link>
            </Heading>
            <Timestamp>
              by { leadAuthors } | { moment(lead.publishedAt).fromNow() }
            </Timestamp>
            <Excerpt>
              { lead.excerpt }
            </Excerpt>
          </LeadContent>
        </Lead>
        <FeaturedContainer>
          <Featured>
            <Heading size={ 4 }>
              <Link plain color='text' to={ `/post/${ featuredFirst.slug }` }>
                { featuredFirst.title }
              </Link>
            </Heading>
            <FeaturedImage>
              <ImageButton disableRipple to={ `/post/${ featuredFirst.slug }` }>
                <CroppedImage src={ featuredFirst.heroSRC } />
              </ImageButton>
            </FeaturedImage>
            <Timestamp>
              by { featuredFirstAuthors } | { moment(featuredFirst.publishedAt).fromNow() }
            </Timestamp>
            <Excerpt>
              { featuredFirst.excerpt }
            </Excerpt>
          </Featured>
          <Featured>
            <Heading size={ 4 }>
              <Link plain color='text' to={ `/post/${ featuredLast.slug }` }>
                { featuredLast.title }
              </Link>
            </Heading>
            <FeaturedImage>
              <ImageButton disableRipple to={ `/post/${ featuredLast.slug }` }>
                <CroppedImage src={ featuredLast.heroSRC } />
              </ImageButton>
            </FeaturedImage>
            <Timestamp>
              by { featuredLastAuthors } | { moment(featuredLast.publishedAt).fromNow() }
            </Timestamp>
            <Excerpt>
              { featuredLast.excerpt }
            </Excerpt>
          </Featured>
        </FeaturedContainer>
      </Hero>
    )
  }

  renderSupportingPost(post, idx) {
    const authors = getAuthorLinks(post.authors)
    const tags = R.pipe(
      _.shuffle,
      R.slice(0, 2),
    )(post.tags ?? [])

    return (
      <SupportingArticle key={ post.uuid }>
        <SupportingImage even={ idx % 2 === 0 }>
          <ImageButton disableRipple to={ `/post/${ post.slug }` }>
            <CroppedImage src={ post.heroSRC } />
          </ImageButton>
        </SupportingImage>
        <SupportingContent even={ idx % 2 === 0 }>
          <Heading size={ 4 }>
            <Link plain color='text' to={ `/post/${ post.slug }` }>
              { post.title }
            </Link>
          </Heading>
          <Timestamp>
            by { authors } | { moment(post.publishedAt).format('D MMMM YYYY') }
          </Timestamp>
          <Excerpt>
            { post.excerpt }
          </Excerpt>
          <SupportingTags even={ idx % 2 === 0 }>
            { tags.map(t => (
              <Tag
                color={ t.color }
                gradient={ t.gradient }
                heroSRC={ t.heroSRC }
                key={ t.uuid }
                name={ t.name }
                slug={ t.slug } />
            )) }
          </SupportingTags>
        </SupportingContent>
      </SupportingArticle>
    )
  }

  render() {
    const { posts } = this.props
    const heroPosts = posts.slice(0, 3)
    const supportingPosts = posts.slice(3)

    return (
      <>
        <MainToolbar />
        <Root>
          { this.renderHero(heroPosts) }
          <Supporting>
            { supportingPosts.map(this.renderSupportingPost) }
          </Supporting>
        </Root>
      </>
    )
  }
}

export default Main
