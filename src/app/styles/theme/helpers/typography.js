import { css } from 'styled-components'
import { modularScale } from 'polished'

export const accent = css`
  font-family: sans-serif;

  html.accent & {
    font-family: ${ ({ theme }) => theme.typography.accent };
  }
`

export const primary = css`
  font-family: serif;

  html.primary & {
    font-family: ${ ({ theme }) => theme.typography.primary };
  }
`

export const ms = step => modularScale(step, '1rem', 'perfectFourth')
