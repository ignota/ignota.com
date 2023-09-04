import { css } from 'styled-components'
import curry from 'lodash/curry'
import round from 'lodash/round'

const ADELLE_BASELINE = 0.208
const AKZIDENZ_BASELINE = 0.148
const CAMPHOR_BASELINE = 0.200
const CAPITA_BASELINE = 0.100
const CHARLIE_BASELINE = 0.224
const CORPORATIVE_BASELINE = 0.090
const FLAMA_BASELINE = 0.150
const FREIGHT_MACRO_BASELINE = 0.272
const MAISON_BASELINE = 0.172
const NORT_BASELINE = 0.147
const ORGON_BASELINE = 0.252
const SINA_NOVA_BASELINE = 0.272
const SST_BASELINE = 0.077

const withUnit = (unit, val) => val === 0 ? val : `${ val }${ unit }`
const round3 = curry(round)(curry.placeholder, 3)

function getBaselineCorrection({ baseline, fontSize, lineHeight }) {
  const baselineFromBottom = ((lineHeight - fontSize) / 2) + (fontSize * baseline)
  const correctedBaseline = round(baselineFromBottom)
  const baselineDifference = correctedBaseline - baselineFromBottom

  return {
    baselineDifference,
    correctedBaseline,
  }
}

function getPlumber({
  baseline: BASELINE,
  fontSize: FONT_SIZE = 1.777,
  gridHeight: GRID_HEIGHT = 1,
  gridUnit: GRID_UNIT = 'rem',
  leadingBottom: LEADING_BOTTOM = 1,
  leadingTop: LEADING_TOP = 2,
  lineHeight: LINE_HEIGHT = 3,
  useBaselineOrigin: USE_BASELINE_ORIGIN = true,
}) {
  const plumber = function({
    baseline = BASELINE,
    fontSize = FONT_SIZE,
    gridHeight = GRID_HEIGHT,
    gridUnit = GRID_UNIT,
    leadingBottom = LEADING_BOTTOM,
    leadingTop = LEADING_TOP,
    lineHeight = LINE_HEIGHT,
    useBaselineOrigin = USE_BASELINE_ORIGIN,
  } = {}) {
    const withGridUnit = curry(withUnit)(gridUnit)

    const { baselineDifference, correctedBaseline } = getBaselineCorrection({ baseline, fontSize, lineHeight })

    if (useBaselineOrigin) {
      leadingTop -= lineHeight - correctedBaseline
      leadingBottom -= correctedBaseline
    }

    const shift = baselineDifference < 0 ? 0 : 1

    fontSize = round3(fontSize * gridHeight)
    const marginTop = round3((leadingTop - shift) * gridHeight)
    const paddingTop = round3((shift - baselineDifference) * gridHeight)
    const paddingBottom = round3((1 - shift + baselineDifference) * gridHeight)
    const marginBottom = round3((leadingBottom + shift - 1) * gridHeight)

    return css`
      font-size: ${ withGridUnit(fontSize) };
      line-height: ${ withGridUnit(lineHeight) };
      margin-bottom: ${ withGridUnit(marginBottom) };
      margin-top: ${ withGridUnit(marginTop) };
      padding-bottom: ${ withGridUnit(paddingBottom) };
      padding-top: ${ withGridUnit(paddingTop) };
    `
  }

  plumber.box = function({
    border = 0,
    borderUnit = GRID_UNIT,
    gridHeight = GRID_HEIGHT,
    gridUnit = GRID_UNIT,
    margin = 0,
    padding = 0,
  }) {
    const [marginTop, marginBottom] = Array.isArray(margin)
      ? margin.map(m => round3(m * gridHeight))
      : [margin, margin].map(m => round3(m * gridHeight))
    const [paddingTop, paddingBottom] = Array.isArray(padding)
      ? padding.map(p => round3(p * gridHeight))
      : [padding, padding].map(p => round3(p * gridHeight))
    const [borderTop, borderBottom] = Array.isArray(border)
      ? border
      : [border, border]

    return css`
      margin-bottom: ${ withUnit(gridUnit, marginBottom) };
      margin-top: ${ withUnit(gridUnit, marginTop) };
      padding-bottom: calc(${ withUnit(gridUnit, paddingBottom) } - ${ withUnit(borderUnit, borderBottom) });
      padding-top: calc(${ withUnit(gridUnit, paddingTop) } - ${ withUnit(borderUnit, borderTop) });
    `
  }

  return plumber
}

const plumber = getPlumber({ baseline: CHARLIE_BASELINE })
plumber.accent = getPlumber({ baseline: MAISON_BASELINE })

export default plumber
