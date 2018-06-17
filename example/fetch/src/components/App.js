import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

import { fetchGithub } from '../actions'

class App extends React.Component {
  componentDidMount() {
     this.props.fetchGithub()
  }

  render() {
    const { github, loading } = this.props
    return (
      <React.Fragment>
        <pre>{github == null ? '' : JSON.stringify(github, null, 2)}</pre>
        {loading ? <p>loading...</p> : null}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  github: state.github,
})

const mapDispatchToActions = {
  fetchGithub,
}

export default App |> connect(mapStateToProps, mapDispatchToActions) |> hot(module)
