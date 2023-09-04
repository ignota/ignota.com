import styled from 'styled-components'

export const Quotation = styled.blockquote`
  ${ ({ theme }) => theme.helpers.typography.accent }

  color: ${ ({ theme }) => theme.palette.rgb.quoteText };
  margin: 0;
  width: 100%;

  & > p {
    ${ ({ theme }) => theme.helpers.plumber.accent() }

    ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
      text-align: ${ ({ float }) => float === 'right' ? 'left' : 'right' };
    ` }
  }
`
