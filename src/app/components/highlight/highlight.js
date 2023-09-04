import styled from 'styled-components'

const Highlight = styled.mark`
  background: ${ ({ theme }) => theme.palette.chroma.highlight.alpha(0.33).css() };
  border-radius: ${ ({ theme }) => theme.measures.borderRadius };
  color: inherit;
  padding: 0.25em 0.5em;
`

export default Highlight
