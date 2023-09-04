import styled from 'styled-components'

export const Children = styled.div`
  ${ ({ theme }) => theme.helpers.typography.accent }

  padding: 0 0 0 ${ ({ hasNumber }) => hasNumber ? '11rem' : '2rem' };

  & > p {
    ${ ({ theme }) => theme.helpers.plumber.accent() }

    text-align: left;
  }
`

export const Root = styled.li`
  margin: 3.157rem 0;
  min-height: 5rem;
  padding: 0;
  position: relative;
`
