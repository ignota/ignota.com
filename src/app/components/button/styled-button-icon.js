import styled from 'styled-components'

export const Icon = styled.i`
  align-items: center;
  display: flex;
  height: 1.777rem;
  justify-content: center;
  margin-left: ${ ({ right }) => right ? '0.75rem' : '0' };
  margin-right: ${ ({ left }) => left ? '0.75rem' : '0' };
  position: relative;
  width: auto;

  & > svg {
    fill: currentColor;
    height: 1.777rem;
    width: auto;
  }
`
