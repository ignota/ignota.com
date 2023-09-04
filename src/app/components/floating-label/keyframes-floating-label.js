import { keyframes } from 'styled-components'

export const standardShake = keyframes`
  0% {
    transform: translateX(0) translateY(-100%) scale(0.85);
  }

  33% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(4%) translateY(-100%) scale(0.85);
  }

  66% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-4%) translateY(-100%) scale(0.85);
  }

  100% {
    transform: translateX(0) translateY(-100%) scale(0.85);
  }
`
