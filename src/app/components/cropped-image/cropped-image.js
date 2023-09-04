import React, { PureComponent } from 'react'
import { addEventListener } from 'consolidated-events'
import { getUploadURL } from 'app/lib'
import smartcrop from 'smartcrop'

class CroppedImage extends PureComponent {
  static defaultProps = {
    height: 0,
    scale: 1,
    width: 0,
  }

  canvas = React.createRef()

  image = React.createRef()

  state = {
    ready: false,
  }

  componentDidMount() {
    if (this.image.current?.complete && this.image.current?.naturalWidth) {
      this.drawImage(this.image.current)
    }

    this.removeResizeListener = addEventListener(window, 'resize', () => this.handleLoad)
  }

  componentDidUpdate(prevProps) {
    const {
      height: prevHeight,
      scale: prevScale,
      src: prevSRCProp,
      width: prevWidth,
    } = prevProps
    const {
      height: nextHeight,
      scale: nextScale,
      src: nextSRCProp,
      width: nextWidth,
    } = this.props

    const prevSRC = getUploadURL(prevSRCProp)
    const nextSRC = getUploadURL(nextSRCProp)

    if (prevSRC !== nextSRC) {
      this.setState({ ready: false })
      return
    }

    if (
      prevScale !== nextScale ||
      prevHeight !== nextHeight ||
      prevWidth !== nextWidth
    ) {
      this.handleLoad()
    }
  }

  componentWillUnmount() {
    if (this.removeResizeListener) {
      this.removeResizeListener()
    }
  }

  async drawImage(img) {
    const {
      height: fixedHeight,
      scale,
      width: fixedWidth,
    } = this.props

    const canvas = this.canvas.current

    if (!img) {
      return
    }

    let height = fixedHeight
    let width = fixedWidth

    if (!height || !width) {
      const parentDimensions = await this.getParentDimensions(canvas)
      height = parentDimensions.height
      width = parentDimensions.width
    }

    const drawWidth = Math.ceil(width * scale)
    const drawHeight = Math.ceil(height * scale)

    const { topCrop: crop } =
          await smartcrop.crop(img, {
            height: drawHeight,
            width: drawWidth,
          })

    canvas.width = drawWidth
    canvas.height = drawHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      img,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      drawWidth,
      drawHeight,
    )

    this.setState({ ready: true })
  }

  async getParentDimensions(node) {
    return new Promise(resolve => {
      let nextNode = node
      while (nextNode && nextNode.parentNode) {
        nextNode = nextNode.parentNode
        const { height, width } = nextNode.getBoundingClientRect()
        if (height && width) return resolve({ height, width })
      }

      const { innerHeight, innerWidth } = window
      resolve({ height: innerHeight, width: innerWidth })
    })
  }

  handleLoad(ev) {
    this.drawImage(ev.target)
  }

  render() {
    const {
      height,
      scale: _scale,
      src: srcProp,
      width,
      ...props
    } = this.props
    const { ready } = this.state

    const src = getUploadURL(srcProp)

    return (
      <>
        <canvas height={ height } ref={ this.canvas } width={ width } { ...props } />
        { ready || <img ref={ this.image } src={ src } style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }} onLoad={ this.handleLoad } /> }
      </>
    )
  }
}

export default CroppedImage
