import React, { PureComponent } from 'react'
import Cap from 'vendor/dropcap'
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone'
import { Initial } from './styled-dropcap'

const ACCENT_FAMILY = 'Maison Neue'
const PRIMARY_FAILY = 'Charlie Pro'

class Dropcap extends PureComponent {
  static defaultProps = {
    accent: true,
    height: 3,
  }

  dropcap = React.createRef()

  componentDidMount() {
    this.renderDropcap()
  }

  componentDidUpdate() {
    this.renderDropcap()
  }

  async renderDropcap() {
    const {
      baseline: baselineProp,
      accent,
      height,
    } = this.props

    const baseline = baselineProp ?? height - 1
    const family = accent ? ACCENT_FAMILY : PRIMARY_FAILY
    const observer = new FontFaceObserver(family, { weight: 400 })

    await observer.load()

    if (this.dropcap.current) {
      Cap.layout(this.dropcap.current, height, baseline)
    }
  }

  render() {
    const {
      accent,
      children,
      baseline: _baseline,
      height: _height,
      ...props
    } = this.props

    return (
      <Initial accent={ accent } ref={ this.dropcap } { ...props }>
        { children }
      </Initial>
    )
  }
}

export default Dropcap
