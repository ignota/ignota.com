import LogoBase from 'images/logo.svg'
import styled from 'styled-components'

export const Logo = styled(LogoBase)`
  display: inline-flex;
  fill: ${ ({ theme }) => theme.palette.rgb.brandGray };
  flex-grow: 0;
  flex-shrink: 0;
  height: 66%;
  width: auto;
`

export const Root = styled.nav`
  align-items: stretch;
  background-color: ${ ({ theme }) => theme.palette.rgb.white };
  box-shadow: ${ ({ theme }) => theme.elevation.box[2] };
  display: flex;
  flex-direction: row;
  height: 6rem;
  justify-content: space-between;
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
