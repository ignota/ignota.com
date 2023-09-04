import styled from 'styled-components'

export const SmallCaps = styled.span`
  font-feature-settings: 'smcp';
  font-variant-caps: all-small-caps;
  text-transform: lowercase;
`

export const Underline = styled.span`
  background: ${ ({ theme }) => `linear-gradient(${ theme.palette.rgb.white }, ${ theme.palette.rgb.white }), linear-gradient(${ theme.palette.rgb.white }, ${ theme.palette.rgb.white }), linear-gradient(${ theme.palette.rgb.text }, ${ theme.palette.rgb.text })` };
  background-position: 0 90%, 100% 90%, 0 90%;
  background-repeat: no-repeat, no-repeat, repeat-x;
  background-size: 1px 1px, 1px 1px, 1px 1px;
  color: ${ ({ theme }) => theme.palette.rgb.text };
  text-decoration: none;
  text-shadow: ${ ({ theme }) => {
    const bg = theme.palette.rgb.white
    return `0 1px 0 ${ bg },
            0 2px 0 ${ bg },
            0 -1px 0 ${ bg },
            0 -2px 0 ${ bg },
            -1px 1px 0 ${ bg },
            -1px 2px 0 ${ bg },
            1px 1px 0 ${ bg },
            1px 2px 0 ${ bg },
            -1px 0 0 ${ bg },
            0 -3px 0 ${ bg }`
  } };
`
