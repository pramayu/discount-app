import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { BottomTabBar } from 'react-navigation'

class TabBarComponent extends Component {

  constructor(props) {
    super(props)

    this.keyboardWillShow = this.keyboardWillShow.bind(this)
    this.keyboardWillHide = this.keyboardWillHide.bind(this)

    this.state = {
      isVisible: true
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const newState = nextProps.navigation.state;
    const newRoute = newState.routes[newState.index];
    if(newRoute.routeName === 'BuyerDashboard') {
      const newParams = newRoute.params;
      this.setState({isVisible: newParams.isVisible})
    } else {
      this.setState({isVisible: true})
    }
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }

  render() {
    return this.state.isVisible ?
      <BottomTabBar {...this.props} />
      :
      null
  }
}

export default TabBarComponent
