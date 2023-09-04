import React, { PureComponent } from 'react'
import { getUploadURL } from 'app/lib'
import { Player } from 'video-react'
import R from 'ramda'

class VideoPlayer extends PureComponent {
  get sources() {
    const { sources } = this.props
    if (!sources) return {}
    return R.map(
      // data => data.storage === 'store' ? `${ data.metadata.host }/${ data.id }` : undefined,
      // data => data.storage === 'store' ? `https://ignota-archives-scenic-tundra-4052.s3.amazonaws.com/ignota-production-uploads/${ data.id }` : undefined,
      // data => data.storage === 'store' ? `http://api.ignota.toys/${ data.id }` : undefined,
      getUploadURL,
      JSON.parse(sources),
    )
  }

  render() {
    const {
      children,
      sources: _sources,
      ...props
    } = this.props

    return (
      <Player
        fluid
        playsInline
        poster={ this.sources.poster }
        { ...props }>
        { children }
        { this.sources.webm && <source src={ this.sources.webm } /> }
        { this.sources.mp4 && <source src={ this.sources.mp4 } /> }
      </Player>
    )
  }
}

export default VideoPlayer
