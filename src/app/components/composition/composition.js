import React, { PureComponent } from 'react'
import { getUploadURL } from 'app/lib'
import Lottie from 'lottie-web'
import { Root } from './styled-composition'

class Composition extends PureComponent {
  root = React.createRef()

  componentDidMount() {
    this.renderComposition()
  }

  componentWillUnmount() {
    if (this.bodymovin) {
      this.bodymovin.destroy()
    }
  }

  async renderComposition() {
    const { jsonFile } = this.props

    const jsonURL = getUploadURL(jsonFile)
    const animationData = await this.retrieveJSON(jsonURL)

    this.bodymovin = Lottie.loadAnimation({
      animationData,
      autoplay: true,
      container: this.root.current,
      loop: true,
      renderer: 'svg',
    })
  }

  async retrieveJSON(url) {
    try {
      const response = await fetch(url, { mode: 'cors' })
      const json = await response.json()
      return json
    } catch (err) {
      console.error(err)
      return {}
    }
  }

  render() {
    const {
      jsonFile: _jsonFile,
      ...props
    } = this.props

    return (
      <Root ref={ this.root } { ...props } />
    )
  }
}

export default Composition
