import styled from 'styled-components'

export const Initial = styled.span`
  ${ ({ accent, theme }) => accent ? theme.helpers.typography.accent : theme.helpers.typography.primary }
`
