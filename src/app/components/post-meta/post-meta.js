import {
  MetadataColumn,
  P,
  Root,
  Tag,
  Tags,
  TagsColumn,
} from './styled-post-meta'
import React, { PureComponent } from 'react'
import { getAuthorLinks } from 'app/lib'
import moment from 'moment'

class PostMeta extends PureComponent {
  static defaultProps = {
    authors: [],
    post: {},
    tags: [],
  }

  get timestamp() {
    const {
      post,
    } = this.props

    const $publishedAt = moment(post.publishedAt)
    const date = $publishedAt.format('dddd, D MMMM YYYY')
    const time = $publishedAt.format('h:mma')
    return `${ date }, at ${ time }`
  }

  render() {
    const {
      authors,
      post,
      tags,
      ...props
    } = this.props

    const authorLinks = getAuthorLinks(authors)

    return (
      <Root { ...props }>
        <MetadataColumn>
          <P>
            “{ post.title }” was
            published by { authorLinks } on { this.timestamp }.
          </P>
        </MetadataColumn>
        <TagsColumn>
          <Tags>
            { tags.map(t => (
              <Tag
                color={ t.color }
                gradient={ t.gradient }
                heroSRC={ t.heroSRC }
                key={ t.uuid }
                name={ t.name }
                slug={ t.slug } />
            )) }
          </Tags>
        </TagsColumn>
      </Root>
    )
  }
}

export default PostMeta
