import { gutter } from '@ignota/susy.js'
import styled from 'styled-components'

export const Quotation = styled.blockquote`
  border-bottom: 2px solid ${ ({ theme }) => theme.palette.rgb.black };
  border-top: 2px solid ${ ({ theme }) => theme.palette.rgb.black };
  color: ${ ({ theme }) => theme.palette.rgb.text };
  margin: 0;
  width: 100%;

  & > p {
    ${ ({ theme }) => theme.helpers.plumber({
    fontSize: 2.369,
    leadingBottom: 3,
    leadingTop: 4,
    lineHeight: 3.5,
  }) }

    font-style: italic;
    font-weight: 200;
    padding-left: ${ gutter() };
    padding-right: ${ gutter() };
    text-align: center;

    em {
      font-style: normal;
    }
  }
`
