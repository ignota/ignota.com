import styled from 'styled-components'

export const Background = styled.div`
  background: ${ ({ theme }) => theme.palette.rgb.white };
  background-size: cover;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 990;
`

export const EmbedContainer = styled.aside`
  background-size: cover;
  height: 68.43vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  transform-origin: 0 0;
  width: 100%;
  z-index: 1000;

  ${ ({ alignment, theme }) => {
    switch (alignment) {
      case 'bottom':
        return theme.helpers.media.greaterThan('medium')`
                    height: 68.43vh;
                    left: 0;
                    top: 0;
                    width: 100%;
                `

      case 'left':
        return theme.helpers.media.greaterThan('medium')`
                    height: 100vh;
                    left: 31.67vw;
                    top: 0;
                    width: 68.43vw;
                `

      case 'right':
        return theme.helpers.media.greaterThan('medium')`
                    height: 100vh;
                    left: 0;
                    top: 0;
                    width: 68.43vw;
                `

      case 'top':
        return theme.helpers.media.greaterThan('medium')`
                    height: 68.43vh;
                    left: 0;
                    top: 31.67vh;
                    width: 100%;
                `
    }
  } }
`

export const Popout = styled.aside`
  ${ ({ theme }) => theme.helpers.typography.accent }

  align-items: center;
  background: ${ ({ color, theme }) => theme.palette.chroma[color].alpha(0.33).css() };
  box-shadow: ${ ({ theme }) => theme.elevation.box[4] };
  display: flex;
  height: 31.67vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 68.43vh;
  transform-origin: 0 0;
  user-select: none;
  width: 100%;
  z-index: 1000;

  ${ ({ alignment, theme }) => {
    switch (alignment) {
      case 'bottom':
        return theme.helpers.media.greaterThan('medium')`
                    height: 31.67vh;
                    left: 0;
                    top: 68.43vh;
                    width: 100%;
                `

      case 'left':
        return theme.helpers.media.greaterThan('medium')`
                    height: 100vh;
                    left: 0;
                    top: 0;
                    width: 31.67vw;
                `

      case 'right':
        return theme.helpers.media.greaterThan('medium')`
                    height: 100vh;
                    left: 68.43vw;
                    top: 0;
                    width: 31.67vw;
                `

      case 'top':
        return theme.helpers.media.greaterThan('medium')`
                    height: 31.67vh;
                    left: 0;
                    top: 0;
                    width: 100%;
                `
    }
  } }
`

export const PopoutChildren = styled.div`
  max-height: 100%;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5%;
  position: relative;
`
