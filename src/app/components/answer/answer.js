import {
  Children,
  Label,
  QARoot,
} from '../qa'
import React, { PureComponent } from 'react'
import { InformationOutlineIcon } from 'mdi-react'

class Answer extends PureComponent {
  render() {
    const {
      children,
      ...props
    } = this.props

    return (
      <QARoot { ...props }>
        <Label>
          <InformationOutlineIcon />
        </Label>
        <Children>{ children }</Children>
      </QARoot>
    )
  }
}

export default Answer
