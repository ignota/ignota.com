import {
  Author,
  Logo,
  Root,
  Strut,
  Title,
} from './styled-post-toolbar'
import React, { PureComponent } from 'react'
import { ButtonBase } from '../button'
import { getAuthorLinks } from 'app/lib'

class PostToolbar extends PureComponent {
  render() {
    const {
      authors,
      title,
      ...props
    } = this.props

    const authorLinks = getAuthorLinks(authors)

    return (
      <Root { ...props }>
        <ButtonBase disableRipple style={{ display: 'inline-flex', flexGrow: 0, flexShrink: 0, height: '100%' }} to='/'>
          <Logo />
        </ButtonBase>
        <Title>{ title }</Title>
        &nbsp;
        <Author>{ authorLinks }</Author>
        <Strut />
      </Root>
    )
  }
}

export default PostToolbar
