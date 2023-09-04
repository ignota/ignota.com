import Button from '../button'
import styled from 'styled-components'

const MenuItem = styled(Button)`
  &&& {
    border-radius: 0;
    flex-direction: column;
    height: 100%;
    width: 100%;

    i {
      margin: 0;
    }
  }
`

export default MenuItem
