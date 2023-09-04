import {
  at,
  span,
} from '@ignota/susy.js'
import { clearFix } from 'polished'
import styled from 'styled-components'

const Article = styled.article`
  ${ clearFix() }

  margin: 10rem auto;
  max-width: 720px;
  width: ${ span(5, at(2)) };

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin: 10rem auto;
    width: ${ span(3, at(3)) };
  ` }
`

export default Article
