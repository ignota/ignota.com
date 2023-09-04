import styled from 'styled-components'

export const Children = styled.div`
  display: inline-block;
  padding-bottom: 1rem;
`

export const Label = styled.div`
  align-items: center;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr auto 1fr;
  padding: 0.5rem 0;
  text-transform: uppercase;

  &::before,
  &::after {
    background: ${ ({ theme }) => theme.palette.rgb.quote };
    content: '';
    display: block;
    height: 2px;
    width: 100%;
  }

  & > svg {
    fill: ${ ({ theme }) => theme.palette.rgb.quoteText };
  }
`

export const LI = styled.li`
  display: block;
`

export const QARoot = styled.div`
  ${ ({ accent, theme }) => accent ? theme.helpers.typography.accent : theme.helpers.typography.primary }

  display: block;
  margin: 1rem 0;
  position: relative;
`

export const UL = styled.ul`
  display: block;
  list-style: none;
  margin: 0 auto;
  padding: 0;
`
