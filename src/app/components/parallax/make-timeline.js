import normalizeKeyframes from './normalize-keyframes'
import { TimelineLite } from 'gsap'

const makeTimeline = (keyframes, element) => {
  const normalizedKeyframeArray = normalizeKeyframes(keyframes)
  const [head, ...tail] = normalizedKeyframeArray
  return tail.reduce((timeline, keyframe, index) => {
    const previousKeyframe = normalizedKeyframeArray[index]
    return timeline.to(element, previousKeyframe.duration, keyframe.value)
  }, new TimelineLite().to(element, 0, head.value))
}

export default makeTimeline
