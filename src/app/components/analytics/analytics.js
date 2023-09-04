import { PureComponent } from 'react'
import ReactGA from 'react-ga'
import { withRouter } from 'react-router'

@withRouter
class Analytics extends PureComponent {
  componentDidMount() {
    const { pathname } = this.props.location
    this.registerImpression(pathname)
  }

  componentDidUpdate(prevProps) {
    const { pathname: prevPathname } = prevProps.location
    const { pathname: nextPathname } = this.props.location

    if (prevPathname !== nextPathname) {
      this.registerImpression(nextPathname)
    }
  }

  registerImpression(page) {
    if (__DEV__) {
      return
    }

    ReactGA.set({ page })
    ReactGA.pageview(page)
  }

  render() {
    return this.props.children
  }
}

export default Analytics
