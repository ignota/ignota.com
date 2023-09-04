import styled from 'styled-components'

export const HR = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 2.369rem 1fr;
  margin: 2.369rem 0;
  padding: 0.5rem 0;

  &::before,
  &::after {
    background: ${ ({ theme }) => theme.palette.rgb.quote };
    content: '';
    display: block;
    height: 1px;
    width: 100%;
  }

  & > svg {
    fill: ${ ({ theme }) => theme.palette.rgb.quoteText };
    height: auto;
    width: 100%;
  }
`
