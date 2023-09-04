import styled from 'styled-components'

export const Trigger = styled.span`
  ${ ({ theme }) => theme.helpers.typography.accent }

  background: ${ ({ theme, triggerColor }) => theme.palette.chroma[triggerColor].alpha(0.33).css() };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  cursor: pointer;
  padding: 0.25em 0.5em;
`
