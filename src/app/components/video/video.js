import React, { PureComponent } from 'react'
import { getUploadURL } from 'app/lib'
import R from 'ramda'
import { VideoBase } from './styled-video'

class Video extends PureComponent {
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
      sources: _sources,
      ...props
    } = this.props

    return (
      <VideoBase
        autoPlay
        playsInline
        poster={ this.sources.poster }
        { ...props }>
        { this.sources.webm && <source src={ this.sources.webm } /> }
        { this.sources.mp4 && <source src={ this.sources.mp4 } /> }
      </VideoBase>
    )
  }
}

export default Video
