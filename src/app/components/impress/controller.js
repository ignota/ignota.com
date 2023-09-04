import React, { useRef } from 'react'

const Controller = React.memo(function Controller({ children, setStep, step, steps }) {
  const animating = useRef(false)

  function handleWheel(e) {
    e.stopPropagation()
    e.preventDefault()

    if (animating.current) {
      return
    }

    if (e.deltaY <= -15) {
      animating.current = true
      handlePrevious()
    } else if (e.deltaY >= 15) {
      animating.current = true
      handleNext()
    }

    setTimeout(() => animating.current = false, 1000)
  }

  function handleNext() {
    let nextStep = step + 1

    if (nextStep > steps) {
      nextStep = 0
    }

    setStep(nextStep)
  }

  function handlePrevious() {
    let nextStep = step - 1

    if (nextStep < 0) {
      nextStep = steps
    }

    setStep(nextStep)
  }

  return (
    <div onWheel={ handleWheel }>
      { children }
    </div>
  )
})

export default Controller
