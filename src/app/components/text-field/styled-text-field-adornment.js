import styled from 'styled-components'

export const I = styled.i`
  align-items: center;
  bottom: 0.875rem;
  color: ${ ({ color, disabled, focused, error, theme }) =>
    disabled
      ? theme.palette.rgb.disabled
      : error
        ? theme.palette.rgb.danger
        : focused
          ? theme.palette.rgb[color]
          : theme.palette.rgb.text };
  cursor: ${ ({ hasAction }) => hasAction ? 'pointer' : 'default' };
  display: flex;
  justify-content: center;
  pointer-events: ${ ({ hasAction }) => hasAction ? 'auto' : 'none' };
  position: absolute;

  &:first-child {
    left: 1rem;
  }

  &:last-child {
    right: 1rem;
  }

  & > svg {
    fill: currentColor;
    height: 1.5rem;
    width: 1.5rem;
  }
`
