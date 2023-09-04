import React from 'react'
import styled from 'styled-components'

const div = styled(({ alpha: _alpha, scale: _scale, ...props }) => <div { ...props } />)
const span = styled(({ alpha: _alpha, scale: _scale, ...props }) => <span { ...props } />)

export const Root = div`
  background: ${ ({ alpha, scale: [color1, color2, color3, color4, color5], theme }) => `linear-gradient(${ color5.css() }, ${ color4.css() } 10%, ${ color3.css() } 38%, ${ color2.css() } 48%, ${ color1.css() } 62%, ${ theme.palette.chroma.white.alpha(alpha).css() })` };
  display: grid;
  grid: repeat(5, 1fr) / repeat(10, 1fr);
  height: 150%;
  position: absolute;
  transform: skewY(-12deg);
  transform-origin: 0;
  width: 100%;
`

export const Stripe1 = span`
  ${ ({ scale: [color1] }) => {
    const color = color1.brighten(0.8)
    return `background: linear-gradient(90deg, ${ color.alpha(0.4).css() }, ${ color.alpha(0.15).css() } 20%, ${ color.alpha(0).css() });`
  } }

  grid-column: span 3;
`

export const Stripe2 = span`
  ${ ({ scale: [, , , color4] }) => {
    const color = color4.brighten(0.8)
    return `background: linear-gradient(90deg, ${ color.alpha(0).css() }, ${ color.alpha(0.05).css() } 40%, ${ color.alpha(0.35).css() });`
  } }

  grid-area: 3 / span 3 / auto / -1;
`

export const Stripe3 = span`
  background: linear-gradient(90deg, ${ ({ alpha, theme }) => theme.palette.chroma.white.alpha(1 - alpha).css() } 50%, ${ ({ theme }) => theme.palette.rgb.transparent });
  grid-column: span 5;
  grid-row: 4;
`

export const Stripe4 = span`
  ${ ({ scale: [color1] }) => {
    const color = color1.brighten(0.8)
    return `background: linear-gradient(90deg, ${ color.alpha(0).css() } 10%, ${ color.alpha(0.05).css() });`
  } }

  grid-area: 4 / span 5 / auto / -1;
`

export const Stripe5 = span`
  ${ ({ alpha, scale: [color1], theme }) => {
    const color = color1.brighten(0.8)
    return `background: linear-gradient(90deg, ${ theme.palette.chroma.white.alpha(1 - alpha).css() } 80%, ${ color.alpha(0.35).css() });`
  } }
  grid-area: auto / 1 / -1 / -1;
`
