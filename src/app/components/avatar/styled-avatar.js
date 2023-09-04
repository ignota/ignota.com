import chroma from 'chroma-js'
import styled from 'styled-components'

export const Image = styled.img`
  height: 100%;
  object-fit: cover;
  text-align: center;
  width: 100%;
`

export const Root = styled.div`
  ${ ({ theme }) => theme.helpers.typography.sans }

  align-items: center;
  background-color: ${ ({ bg, theme }) => theme.palette.chroma[bg] ? theme.palette.chroma[bg].darken(0.1).css() : chroma(bg).darken(0.1).css() };
  border-radius: 50%;
  color: ${ ({ theme }) => theme.palette.rgb.white };
  display: flex;
  flex-shrink: 0;
  font-size: 2rem;
  height: 4rem;
  justify-content: center;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: 4rem;

  & > svg {
    fill: ${ ({ theme }) => theme.palette.rgb.white };
    height: 50%;
    width: 50%;
  }
`
