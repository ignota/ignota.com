import { TimelineMax } from 'gsap'

const combineTimelines = timelines => timelines.reduce((masterTimeline, timeline) => {
  return masterTimeline.add(timeline, 0)
}, new TimelineMax())

export default combineTimelines
