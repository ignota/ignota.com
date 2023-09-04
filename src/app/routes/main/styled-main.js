import {
  at,
  gutter,
  of,
  slice,
  span,
  wide,
} from '@ignota/susy.js'
import { ButtonBase } from 'app/components/button'
import { clearFix } from 'polished'
import HeadingBase from 'app/components/heading'
import Paragraph from 'app/components/paragraph'
import styled from 'styled-components'
import TagBase from 'app/components/tag'

export const Excerpt = styled(Paragraph)`
  ${ ({ theme }) => theme.helpers.plumber({
    fontSize: 1.666,
    lineHeight: 2,
  }) }
`

export const Featured = styled.article`
  margin: ${ gutter() } 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const FeaturedContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  float: left;
  justify-content: center;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    min-height: 100vh;
    margin: 0;
    width: ${ span(3, at(5)) };
  ` }
`

export const FeaturedContent = styled.div`
`

export const FeaturedImage = styled.div`
  height: 20vh;
`

export const Heading = styled(HeadingBase)`
  &&& {
    margin: 0.5rem 0;
    padding: 0;
  }
`

export const Hero = styled.section`
  ${ clearFix() }
`

export const ImageButton = styled(ButtonBase)`
  height: 100%;
  width: 100%;
`

export const Lead = styled.article`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  float: left;
  justify-content: space-between;
  margin: 0;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin-right: ${ gutter() };
    min-height: 100vh;
    width: ${ span(4) };
  ` }
`

export const LeadContent = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;

  p,
  h3 {
    text-align: center;
  }
`

export const LeadImage = styled.div`
  flex: 0 1 33vh;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    flex: 1 1 50vh;
  ` }
`

export const LeadTags = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    width: ${ span(1, at(4), of(slice(4))) };
  ` }
`

export const Root = styled.section`
  ${ '' }
`

export const Supporting = styled.section`
  margin: 2.5rem ${ gutter() } 2.5rem ${ span(1, wide) };
  width: ${ span(5, at(2)) };

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    padding: 0;
  ` }
`

export const SupportingArticle = styled.article`
  ${ clearFix() }

  margin: 2.5rem 0;
  width: 100%;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin: 5rem 0;
  ` }
`

export const SupportingContent = styled.div`
  margin-left: ${ ({ even }) => even ? span(2, wide, of(slice(5, at(2)))) : '0' };
  margin-right: ${ ({ even }) => even ? '0' : gutter() };
  width: ${ span(3, at(3), of(slice(5, at(2)), wide)) };

  p,
  h4 {
    text-align: ${ ({ even }) => even ? 'left' : 'right' };
  }

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin-left: ${ span(2, wide, of(slice(5, at(2)))) };
    margin-right: ${ ({ even }) => even ? '0' : gutter() };
    width: ${ span(1, at(3), of(slice(5, at(2)))) };
  ` }
`

export const SupportingImage = styled.div`
  float: ${ ({ even }) => even ? 'left' : 'right' };
  height: 25vh;
  margin-right: ${ ({ even }) => even ? gutter() : '0' };
  width: ${ span(2, of(slice(5, at(2)))) };
`

export const SupportingTags = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${ ({ even }) => even ? 'flex-start' : 'flex-end' };
  margin: 1rem;
`

export const Tag = styled(TagBase)`
  margin: 0.5rem;
`

export const Timestamp = styled.p`
  ${ ({ theme }) => theme.helpers.typography.accent }
  ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 1.5,
    lineHeight: 2,
  }) }

  color: ${ ({ theme }) => theme.palette.rgb.gray };
`
