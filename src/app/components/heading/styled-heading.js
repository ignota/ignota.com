import styled from 'styled-components'

export const Header = styled.h1`
  ${ ({ primary, theme }) => primary ? theme.helpers.typography.primary : theme.helpers.typography.accent }
  ${ ({ primary, size, theme }) =>
    primary
      ? theme.helpers.plumber({
        fontSize: 1.333 ** (7 - size),
        leadingBottom: 7 - size,
        leadingTop: 12 - size,
        lineHeight: 7 - size,
      }) : theme.helpers.plumber.accent({
        fontSize: 1.333 ** (7 - size),
        leadingBottom: 7 - size,
        leadingTop: 12 - size,
        lineHeight: 7 - size,
      })
}

    font-weight: 700;

    &:first-child {
      ${ ({ primary, size, theme }) =>
    primary
      ? theme.helpers.plumber({
        fontSize: 1.333 ** (7 - size),
        leadingBottom: 7 - size,
        leadingTop: 7 - size,
        lineHeight: 7 - size,
      }) : theme.helpers.plumber.accent({
        fontSize: 1.333 ** (7 - size),
        leadingBottom: 7 - size,
        leadingTop: 7 - size,
        lineHeight: 7 - size,
      })
}
    }
`
