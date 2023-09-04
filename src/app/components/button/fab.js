import Button from './button'
import styled from 'styled-components'

const FAB = styled(Button)`
  &&&& {
    ${ ({ theme }) => theme.helpers.typography.accent }

    background-color: ${ ({ color = 'primary', theme }) => theme.palette.rgb[color] };
    border-radius: ${ ({ extended }) => extended ? '2.4rem' : '50%' };
    box-shadow: ${ ({ theme }) => theme.elevation.box[6] };
    color: ${ ({ theme }) => theme.palette.rgb.white };
    fill: ${ ({ theme }) => theme.palette.rgb.white };
    height: ${ ({ extended, mini }) => extended ? '4.8rem' : mini ? '4rem' : '5.6rem' };
    min-width: ${ ({ extended }) => extended ? '4.8rem' : 'auto' };
    padding: ${ ({ extended }) => extended ? '0 1.6rem' : '0' };
    transition: box-shadow ${ ({ theme }) => theme.transition.duration.elevation } ${ ({ theme }) => theme.transition.timing.standard };
    width: ${ ({ extended, mini }) => extended ? 'auto' : mini ? '4rem' : '5.6rem' };

    &:hover {
      box-shadow: ${ ({ theme }) => theme.elevation.box[9] };
    }

    &:active {
      box-shadow: ${ ({ theme }) => theme.elevation.box[12] };
    }

    &:disabled,
    &[disabled] {
      background-color: ${ ({ theme }) => theme.palette.rgb.disabled };
      box-shadow: ${ ({ theme }) => theme.elevation.box[0] };
      color: ${ ({ theme }) => theme.palette.rgb.text };
      fill: ${ ({ theme }) => theme.palette.rgb.text };
    }
  }
`

export default FAB
