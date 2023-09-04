import React, { PureComponent } from 'react'

const {
  Consumer: MenuConsumer,
  Provider,
} = React.createContext({
  onToggle: () => {},
  open: false,
})

class MenuProvider extends PureComponent {
  state = {
    open: false,
  }

  handleToggle(e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({ open: !this.state.open })
  }

  render() {
    const {
      children,
    } = this.props
    const { open } = this.state

    return (
      <Provider value={{ onToggle: this.handleToggle, open }}>
        { children }
      </Provider>
    )
  }
}

export { MenuConsumer }
export default MenuProvider
