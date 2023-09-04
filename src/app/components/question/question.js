import {
  Children,
  Label,
  QARoot,
} from '../qa'
import React, { PureComponent } from 'react'
import { HelpIcon } from 'mdi-react'

class Question extends PureComponent {
  render() {
    const {
      children,
      ...props
    } = this.props

    return (
      <QARoot accent { ...props }>
        <Label>
          <HelpIcon />
        </Label>
        <Children>{ children }</Children>
      </QARoot>
    )
  }
}

export default Question
