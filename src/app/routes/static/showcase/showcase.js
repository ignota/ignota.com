import React, { PureComponent } from 'react'
import { actions } from 'app/flux'
import { connect } from 'react-redux'
import imgGoldStarDay from 'images/gold-star-day.png'
import Impress from 'app/components/impress'
import MainToolbar from 'app/components/main-toolbar'
import { Root } from './styled-showcase'
import Step from 'app/components/step'

@connect(
  null,
  { onRequestPost: actions.posts.requestPost },
)
class Showcase extends PureComponent {
  constructor(props) {
    super(props)
    // props.onRequestPost('567526d9-e641-4732-a7c3-992feef9a0a6')
  }

  render() {
    return (
      <>
        <MainToolbar />
        <Root>
          <Impress height={ 768 } width={ 1024 }>
            <Step>
              <img src={ imgGoldStarDay } />
            </Step>
            <Step x={ 1000 }>
              <img src={ imgGoldStarDay } />
            </Step>
            <Step x={ -1000 }>
              <img src={ imgGoldStarDay } />
            </Step>
          </Impress>
        </Root>
      </>
    )
  }
}

export default Showcase
