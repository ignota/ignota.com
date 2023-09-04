import styled from 'styled-components'

const Caption = styled.figcaption`
  margin: 1.333rem auto 0;
  width: 100%;

  p {
    ${ ({ theme }) => theme.helpers.typography.accent }
    ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 1.777,
    leadingBottom: 2,
    leadingTop: 2,
    lineHeight: 2,
  }) }

    color: ${ ({ theme }) => theme.palette.rgb.gray };
    text-align: center;
  }
`

export default Caption
