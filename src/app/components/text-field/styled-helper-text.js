import { Input } from './styled-text-field'
import styled from 'styled-components'

export const Text = styled.p`
  ${ ({ theme }) => theme.helpers.typography.accent }

  color: ${ ({ invalid, theme }) => invalid ? theme.palette.rgb.danger : theme.palette.rgb.hint };
  font-size: 0.75rem;
  margin: 0;
  opacity: ${ ({ persistent }) => persistent ? '1' : '0' };
  transition: ${ ({ persistent, theme }) => persistent ? 'none' : `opacity 180ms ${ theme.transition.timing.standard }` };
  will-change: ${ ({ persistent }) => persistent ? 'initial' : 'opacity' };

  ${ Input } + & {
    margin-bottom: 0.5rem;
  }
`
