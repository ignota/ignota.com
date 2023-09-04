import ButtonBase from './button-base'
import styled from 'styled-components'

const Button = styled(ButtonBase)`
  &&& {
    ${ ({ theme }) => theme.helpers.typography.accent }

    background-color: ${ ({ theme }) => theme.palette.rgb.transparent };
    border-radius: ${ ({ theme }) => theme.measures.borderRadius };
    color: ${ ({ color = 'text', theme }) => theme.palette.rgb[color] };
    font-size: 1.333rem;
    font-weight: 600;
    height: 4.208rem;
    letter-spacing: 0.075em;
    min-width: 6.4rem;
    padding: 0 0.8rem;
    text-align: center;
    text-transform: uppercase;
    transition: background-color ${ ({ theme }) => theme.transition.duration.enter } ${ ({ theme }) => theme.transition.timing.standard };

    &:hover {
      background-color: ${ ({ color = 'text', theme }) => theme.palette.chroma[color].alpha(0.04).css() };
    }

    &:disabled,
    &[disabled] {
      background-color: transparent;
      color: ${ ({ theme }) => theme.palette.rgb.disabled };
    }
  }
`

export default Button
