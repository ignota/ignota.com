import ArticleBase from 'app/components/article'
import { ButtonBase } from 'app/components/button'
import styled from 'styled-components'

export const Hero = styled.section`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 50vh auto;
`

export const ImageButton = styled(ButtonBase)`
  &&& {
    display: inline;
  }
`

export const Name = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 1;
`

export const Portrait = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / span 1;
  position: relative;
`

export const Post = styled.article`
  padding: 1rem;

  ${ ({ theme }) => theme.helpers.media.greaterThan('large')`
    width: 50%;
  ` }
`

export const PostButton = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const PostImage = styled.figure`
  height: 25vh;
  margin: 0;
  padding: 0;
`

export const Posts = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;

  ${ ({ theme }) => theme.helpers.media.greaterThan('large')`
    align-items: stretch;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  ` }
`

export const Root = styled(ArticleBase)`
  &&& {
    margin-top: 0;
    padding-top: 0;
  }
`

export const SocialButtons = styled.aside`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    align-items: center;
    flex-direction: row;
    justify-content: center;
  ` }
`

export const Timestamp = styled.span`
  ${ ({ theme }) => theme.helpers.typography.accent }
  ${ ({ theme }) => theme.helpers.plumber.accent() }

  color: ${ ({ theme }) => theme.palette.rgb.gray };
`
