import {
  at,
  halfGutter,
  span,
  wide,
} from '@ignota/susy.js'
import { ButtonBase } from 'app/components/button'
import HeadingBase from 'app/components/heading'
import styled from 'styled-components'

export const AuthorBio = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
  position: relative;

  p {
    text-align: left;
  }
`

export const AuthorHero = styled.header`
  align-items: flex-end;
  display: flex;
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  height: 100%;
  justify-content: flex-end;
  position: relative;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    grid-column: 1 / span 1;
    grid-row: 1 / -1;
  ` }
`

export const AuthorMedia = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 30vh 20vh;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    grid-template-columns: 60% 40%;
    grid-template-rows: 25vh 25vh;
  ` }
`

export const FeaturedAuthor = styled.article`
  padding: ${ halfGutter() };
`

export const FeaturedContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const FeaturedHeading = styled(HeadingBase)`
  &&& {
    color: ${ ({ theme }) => theme.palette.rgb.white };
    margin: 0.5rem;
    padding: 0;
    position: relative;
    text-align: right;
    text-shadow: ${ ({ theme }) => theme.elevation.text[4] };
    width: 100%;
  }
`

export const FeaturedPost = styled.article`
  align-items: flex-end;
  display: flex;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  width: 100%;
`

export const Heading = styled(HeadingBase)`
  &&& {
    margin: 0.5rem 0;
    padding: 0;
  }
`

export const ImageButton = styled(ButtonBase)`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const More = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 1rem 0;
`

export const Pagination = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 5rem 0;
`

export const PostHeading = styled(HeadingBase)`
  &&& {
    color: ${ ({ theme }) => theme.palette.rgb.white };
    margin: 0.5rem;
    padding: 0;
    position: relative;
    text-align: left;
    text-shadow: ${ ({ theme }) => theme.elevation.text[2] };
    width: 100%;
  }
`

export const Root = styled.div`
  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin-left: ${ span(2, wide) };
    width: ${ span(3, at(3)) };
  ` }
`

export const Strut = styled.div`
  flex: 1 0 auto;
`

export const SupportingAuthor = styled.article`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 25vh auto;
  padding: ${ halfGutter() };

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    grid-column-gap: 1rem;
    grid-template-columns: 50% 50%;
    grid-template-rows: 25vh;
  ` }
`

export const SupportingContainer = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
