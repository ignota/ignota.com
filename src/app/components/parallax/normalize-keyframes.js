import _ from 'lodash/fp'

const sort = _.sortBy(_.nth(0))

const checkKeyframes = (() => {
  const checkKeyframe = kf => {
    if (kf < 0 || kf > 100) {
      throw new Error(`Keyframes must be between 0 and 100 (got ${ kf }).`)
    }
  }

  return keyframes => {
    const [[firstKey]] = keyframes
    const [lastKey] = _.last(keyframes)
    checkKeyframe(firstKey)
    checkKeyframe(lastKey)
    return keyframes
  }
})()

const prependFirstFrame = keyframes => {
  const [[firstKey, firstValue]] = keyframes
  if (firstKey === 0) return keyframes
  return [[0, firstValue], ...keyframes]
}

const appendLastFrame = keyframes => {
  const [lastKey, lastValue] = _.last(keyframes)
  if (lastKey === 100) return keyframes
  return [...keyframes, [100, lastValue]]
}

const pend = _.pipe(prependFirstFrame, appendLastFrame)

const toObjects = keyframes => {
  return keyframes.map(([key, value]) => ({
    duration: 0,
    key,
    value,
  }))
}

const addDurations = keyframes => {
  return keyframes.map((keyframe, index) => {
    if (index === keyframes.length - 1) {
      return {
        ...keyframe,
        duration: 0,
      }
    } else {
      const next = keyframes[index + 1]
      return {
        ...keyframe,
        duration: next.key - keyframe.key,
      }
    }
  })
}

const normalizeKeyframes = _.pipe(
  _.toPairs,
  _.map(_.update(0, parseFloat)),
  sort,
  checkKeyframes,
  pend,
  toObjects,
  addDurations,
)

export default normalizeKeyframes
