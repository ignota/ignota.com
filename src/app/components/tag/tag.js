import {
  Avatar,
  Background,
  Foreground,
  Root,
} from './styled-tag'
import React, { PureComponent } from 'react'
import chroma from 'chroma-js'
import { TagIcon } from 'mdi-react'
import { withTheme } from 'styled-components'

@withTheme
class Tag extends PureComponent {
  static defaultProps = {
    color: 'gray',
    gradient: [],
  }

  get iconSRC() {
    const { heroSRC } = this.props

    if (!heroSRC || !heroSRC.icon) {
      return
    }

    const { icon } = heroSRC

    if (icon.storage === 'store') {
      // return `${ icon.metadata.host }/${ icon.id }`
      // return `https://ignota-archives-scenic-tundra-4052.s3.amazonaws.com/ignota-local-uploads/${ icon.id }`
      // return `http://api.ignota.toys/${ icon.id }`
      // return `http://api.ignota.toys/${ icon.id }`
      return `${ __STRUCTUR_URI__ }/shrine/${ icon.id }`
    }
  }

  render() {
    const {
      color,
      gradient,
      name,
      slug,
      theme,
      ...props
    } = this.props

    let avatarColor
    let background
    if (color === 'gradient') {
      const scale = chroma
        .scale(gradient)
        .mode('lab')
        .correctLightness()
        .colors(5)

      avatarColor = scale[0]
      background = `radial-gradient(circle at 0%, ${ scale[4] }, ${ scale[3] }, ${ scale[2] }, ${ scale[1] }, ${ scale[0] })`
    } else {
      avatarColor = color
      background = theme.palette.rgb[color]
    }

    return (
      <Root to={ `/tags/${ slug }` } { ...props }>
        <Background bg={ background } />
        <Avatar color={ avatarColor } src={ this.iconSRC }>
          <TagIcon />
        </Avatar>
        <Foreground>{ name }</Foreground>
      </Root>
    )
  }
}

export default Tag
