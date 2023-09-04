import styled from 'styled-components'

export const Input = styled.input`
  appearance: none;
  background: none;
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;
  color: ${ ({ error, theme }) => error ? theme.palette.rgb.danger : theme.palette.rgb.text };
  font-size: inherit;
  letter-spacing: 0.04em;
  margin-left: 3.5rem;
  padding: 1.25rem 0 0.5rem;
  transition: opacity 180ms ${ ({ theme }) => theme.transition.timing.standard };
  width: calc(100% - 3.5rem);

  &::placeholder {
    display: none;
  }

  &:focus {
    outline: none;
  }

  &:invalid {
    box-shadow: none;
  }

  &:not(:disabled) {
    border-bottom-color: ${ ({ error, fullWidth, theme }) => theme.palette.chroma[error ? 'danger' : 'inputBorder'].alpha(fullWidth ? 0.12 : 0.5).css() };
  }

  &:not(:disabled) {
    border-bottom-color: ${ ({ error, theme }) => error ? theme.palette.rgb.danger : theme.palette.rgb.inputBorder };
  }

  &:disabled {
    color: ${ ({ theme }) => theme.palette.rgb.disabled };
    border-bottom: 1px dotted ${ ({ fullWidth, theme }) => fullWidth ? theme.palette.chroma.inputBorder.alpha(0.12).css() : theme.palette.rgb.inputBorderDisabled };
    pointer-events: none;
  }
`

export const Root = styled.div`
  ${ ({ theme }) => theme.helpers.typography.accent }

  align-items: flex-end;
  display: inline-flex;
  font-size: 1.777rem;
  height: 4rem;
  margin-bottom: 0.5rem;
  margin-top: 3rem;
  position: relative;
  will-change: opacity, transform, color;
`
