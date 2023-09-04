import styled from 'styled-components'

export const A = styled.a`
  background: ${ ({ background, color, plain, theme }) => {
    const bg = theme.palette.rgb[background]
    const cl = theme.palette.rgb[color]

    return plain
      ? 'none'
      : `linear-gradient(${ bg }, ${ bg }), linear-gradient(${ bg }, ${ bg }), linear-gradient(${ cl }, ${ cl })`
  } };
  background-position: 0 90%, 90% 90%, 0 90%;
  background-repeat: no-repeat, no-repeat, repeat-x;
  background-size: 1px 1px, 1px 1px, 1px 1px;
  color: ${ ({ color, theme }) => theme.palette.rgb[color] };
  text-decoration: none;
  text-shadow: ${ ({ background, plain, theme }) => {
    if (plain) return 'transparent'
    const bg = theme.palette.rgb[background]
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

  &:hover,
  &:active,
  &:visited {
    color: ${ ({ color, theme }) => theme.palette.rgb[color] };
    text-decoration: none;
  }
`
