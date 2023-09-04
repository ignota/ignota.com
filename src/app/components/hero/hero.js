import {
  HeroContent,
  HeroRoot,
  ScrollImageGradient,
  Subtitle,
  SubtitleRow,
  Title,
  TitleRow,
} from './styled-hero'
import Parallax, { ParallaxLayer } from '../spring-parallax'
import React, { PureComponent } from 'react'
import chroma from 'chroma-js'
import CroppedImage from '../cropped-image'
import Stripes from '../stripes'

class Hero extends PureComponent {
  static defaultProps = {
    gradient: [],
  }

  render() {
    const {
      children,
      gradient,
      imageSRC,
      title,
      ...props
    } = this.props

    const chromaGradient = gradient.map(c => chroma(c))

    return (
      <HeroRoot { ...props }>
        <Parallax>
          { imageSRC &&
              <ParallaxLayer speed={ 0.75 }>
                <span>
                  <CroppedImage src={ imageSRC } />
                  <ScrollImageGradient />
                </span>
              </ParallaxLayer>
          }
          <ParallaxLayer speed={ 0.33 }>
            <Stripes alpha={ imageSRC ? undefined : 1 } gradient={ chromaGradient } />
          </ParallaxLayer>
          <ParallaxLayer speed={ -0.25 }>
            <HeroContent>
              <TitleRow>
                <Title>{ title }</Title>
              </TitleRow>
              <SubtitleRow>
                <Subtitle>
                  { children }
                </Subtitle>
              </SubtitleRow>
            </HeroContent>
          </ParallaxLayer>
        </Parallax>
      </HeroRoot>
    )
  }
}

export default Hero
