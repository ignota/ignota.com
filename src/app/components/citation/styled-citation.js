import styled from 'styled-components'

export const Root = styled.cite`
  ${ ({ theme }) => theme.helpers.plumber.accent() }

  display: block;
  font-style: italic;
  text-align: ${ ({ alignment }) => alignment };

  &::before {
    content: '\\2014';
  }

  em {
    font-style: normal;
  }
`
