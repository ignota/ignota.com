import styled from 'styled-components'

export const BaseP = styled.p`
  ${ ({ theme }) => theme.helpers.plumber() }

  text-align: ${ ({ align }) => align };
  text-indent: ${ ({ flush, indent }) => {
    return indent
      ? '1.777em !important'
      : flush
        ? '0 !important'
        : '0'
  } };

  & + p {
    text-indent: 1.777em;
  }
`
