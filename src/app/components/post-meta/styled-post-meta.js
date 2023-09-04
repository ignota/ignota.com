import {
  at,
  gutter,
  of,
  slice,
  span,
} from '@ignota/susy.js'
import { clearFix } from 'polished'
import Paragraph from '../paragraph'
import styled from 'styled-components'
import TagBase from '../tag'

export const MetadataColumn = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin-right: ${ gutter(of(slice(5, at(2)))) };
    padding: 0;
    width: ${ span(2, of(slice(5, at(2)))) };
  ` }
`

export const P = styled(Paragraph)`
  ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 1.6,
    lineHeight: 2,
  }) }

  text-align: center;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    text-align: left;
  ` }
`

export const Root = styled.footer`
  ${ clearFix() }
  ${ ({ theme }) => theme.helpers.typography.accent }

  align-items: stretch;
  border-bottom: 1px solid ${ ({ theme }) => theme.palette.rgb.gray };
  border-top: 1px solid ${ ({ theme }) => theme.palette.rgb.gray };
  color: ${ ({ theme }) => theme.palette.rgb.gray };
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 5rem auto;
  padding: 2.5rem 0;
  position: relative;
  width: ${ span(7) };

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    flex-direction: row;
    width: ${ span(5, at(2)) };
  ` }
`

export const Tag = styled(TagBase)`
  margin: 1rem;
`

export const Tags = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

export const TagsColumn = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin: 0;
    padding: 0;
    width: ${ span(3, at(3), of(slice(5, at(2)))) };
  ` }
`
