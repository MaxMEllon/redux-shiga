import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

import { pararellFetchGithubSomeInfo } from '../actions'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    // bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleStartFetch = this.handleStartFetch.bind(this)
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value })
  }

  handleStartFetch() {
    const { name } = this.state
    this.props.pararellFetchGithubSomeInfo(name)
  }

  render() {
    const { user, orgs,  loading } = this.props
    return (
      <React.Fragment>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChangeName}
        />
        <button onClick={this.handleStartFetch}>{loading ? 'loading...' : 'fetch start'}</button>
        <pre>{user == null ? '' : JSON.stringify(user, null, 2)}</pre>
        <pre>{orgs == null ? '' : JSON.stringify(orgs, null, 2)}</pre>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  user: state.user,
  orgs: state.orgs,
})

const mapDispatchToActions = {
  pararellFetchGithubSomeInfo,
}

export default App |> connect(mapStateToProps, mapDispatchToActions) |> hot(module)
