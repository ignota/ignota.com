import styled from 'styled-components'

export const Button = styled.button`
  align-items: center;
  appearance: none;
  border: none;
  display: inline-flex;
  justify-content: center;
  line-height: inherit;
  outline: none;
  position: relative;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;

  &::-moz-focus-inner {
    border: none;
    padding: 0;
  }

  &:focus {
    outline: none;
    text-decoration: none;
  }

  &:active {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  &:disabled,
  &[disabled] {
    cursor: default;
    pointer-events: none;
  }
`
