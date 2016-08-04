import React from 'react'

import LangStore from '~/scripts/stores/LangStore'

export default class Home extends React.Component {
  constructor () {
    super()

    this.getLang = this.getLang.bind(this)
    this.state = {
      lang: LangStore.getLang()
    }
  }

  getLang () {
    this.setState({
      lang: LangStore.getLang()
    })
  }

  componentWillMount () {
    LangStore.on('change', this.getLang)
  }

  componentWillUnmount () {
    LangStore.removeListener('change', this.getLang)
  }

  render () {
    return (
      <div>
        <span>Home page</span>
      </div>
    )
  }
}
