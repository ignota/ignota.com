import styled from 'styled-components'

export const HeroContent = styled.header`
  display: grid;
  grid-template-rows: [padding-start] calc(50% - 15rem) [padding-end title-start] 13rem [title-end subtitle-start] auto [subtitle-end];
  height: 100vh;
  padding: 7.779%;
`

export const HeroRoot = styled.div`
  height: 100vh;
  margin-bottom: 50%;
  margin-top: -6rem;
  position: relative;

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    margin-bottom: 15%;
  ` }
`

export const ScrollImageGradient = styled.div`
  background: ${ ({ theme }) => `linear-gradient(${ theme.palette.rgb.transparent } 50%, ${ theme.palette.rgb.white })` };
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

export const Subtitle = styled.span`
    ${ ({ theme }) => theme.helpers.plumber({
    fontSize: 2.369,
    leadingBottom: 1,
    leadingTop: 2,
    lineHeight: 3,
  }) }

  color: ${ ({ theme }) => theme.palette.rgb.white };
  text-align: center;
  text-shadow: ${ ({ theme }) => theme.elevation.text[2] };
`

export const SubtitleRow = styled.div`
  align-items: center;
  display: flex;
  grid-row: subtitle;
  justify-content: center;
`

export const Title = styled.span`
    ${ ({ theme }) => theme.helpers.typography.accent }
    ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 5.61,
    leadingBottom: 1,
    leadingTop: 3,
    lineHeight: 6,
  }) }

  color: ${ ({ theme }) => theme.palette.rgb.white };
  font-weight: 700;
  text-align: center;
  text-shadow: ${ ({ theme }) => theme.elevation.text[6] };
`

export const TitleRow = styled.div`
  align-items: center;
  display: flex;
  grid-row: title;
  justify-content: center;
`
