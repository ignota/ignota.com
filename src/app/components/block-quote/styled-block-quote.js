import {
  at,
  of,
  slice,
  span,
} from '@ignota/susy.js'
import {
  FormatQuoteCloseIcon,
  FormatQuoteOpenIcon,
} from 'mdi-react'
import styled from 'styled-components'

export const QuoteLeft = styled(FormatQuoteOpenIcon)`
  fill: ${ ({ theme }) => theme.palette.rgb.quote };
  height: 4rem;
  left: -1rem;
  position: absolute;
  top: 0;
  width: 4rem;
`

export const QuoteRight = styled(FormatQuoteCloseIcon)`
  bottom: 0;
  fill: ${ ({ theme }) => theme.palette.rgb.quote };
  height: 4rem;
  position: absolute;
  right: -1rem;
  width: 4rem;
`

export const Root = styled.blockquote`
  ${ ({ theme }) => theme.helpers.typography.accent }

  color: ${ ({ theme }) => theme.palette.rgb.quoteText };
  font-weight: 300;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    width: ${ span(2, at(2), of(slice(3, at(3)))) };
  ` }

  &::before,
  &::after {
    background-color: ${ ({ theme }) => theme.palette.rgb.quote };
    content: '';
    display: block;
    height: calc(100% - 4rem);
    position: absolute;
    width: 1px;
  }

  &::before {
    left: 1rem;
    top: 3rem;
  }

  &::after {
    bottom: 3rem;
    right: 1rem;
  }

  & > p {
    ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 2,
    leadingBottom: 2,
    leadingTop: 3,
    lineHeight: 3,
  }) }
  }
`
