import LogoBase from 'images/logo.svg'
import styled from 'styled-components'

export const Author = styled.div`
  ${ ({ theme }) => theme.helpers.typography.accent }
  ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 1.333,
    leadingBottom: 1,
    leadingTop: 2,
    lineHeight: 2,
  }) }

  align-items: center;
  color: ${ ({ theme }) => theme.palette.rgb.gray };
  display: inline-flex;
  flex-grow: 0;
  flex-shrink: 1;
  justify-content: flex-start;
  margin: 0 0.5rem;
  overflow: hidden;
  position: relative;
  white-space: nowrap;

  &::after {
    background: linear-gradient(-90deg, ${ ({ theme }) => theme.palette.rgb.white } 0%, ${ ({ theme }) => theme.palette.rgb.transparent } 100%);
    content: '';
    display: block;
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 33%;
  }
`

export const Logo = styled(LogoBase)`
  display: inline-flex;
  fill: ${ ({ theme }) => theme.palette.rgb.brandGray };
  flex-grow: 0;
  flex-shrink: 0;
  height: 66%;
  margin-right: 0.5rem;
  width: auto;
`

export const Root = styled.nav`
  align-items: stretch;
  background-color: ${ ({ theme }) => theme.palette.rgb.white };
  box-shadow: ${ ({ theme }) => theme.elevation.box[2] };
  display: flex;
  flex-direction: row;
  flex-grow: 0;
  flex-shrink: 1;
  height: 6rem;
  justify-content: space-between;
  left: 0;
  padding: 0 1rem;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
`

export const Strut = styled.span`
  display: inline-flex;
  flex-grow: 1;
  flex-shrink: 0;
`

export const Title = styled.div`
  ${ ({ theme }) => theme.helpers.typography.accent }
  ${ ({ theme }) => theme.helpers.plumber.accent({
    fontSize: 1.333,
    leadingBottom: 1,
    leadingTop: 2,
    lineHeight: 2,
  }) }

  align-items: center;
  display: inline-flex;
  flex-grow: 0;
  flex-shrink: 1;
  justify-content: flex-start;
  margin: 0 0.5rem;
  overflow: hidden;
  position: relative;
  white-space: nowrap;

  &::after {
    background: linear-gradient(-90deg, ${ ({ theme }) => theme.palette.rgb.white } 0%, ${ ({ theme }) => theme.palette.rgb.transparent } 100%);
    content: '';
    display: block;
    height: 100%;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 33%;
  }

  ${ ({ theme }) => theme.helpers.media.greaterThan('medium')`
    flex-shrink: 0;
  ` }
`
