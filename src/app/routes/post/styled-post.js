import { clearFix } from 'polished'
import styled from 'styled-components'

export const Article = styled.article`
`

export const Contents = styled.div`
  ${ clearFix() }

  position: relative;
`

export const Spinner = styled.div`
  align-items: center;
  display: flex;
  height: calc(100vh - 6rem);
  justify-content: center;
  width: 100vw;
`
