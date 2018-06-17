import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux'

import { fetchGithub1, fetchGithub2, reset } from '../actions'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchGithub1('https://api.github.com/users/maxmellon')
    setTimeout(() => {
      this.props.reset()
      this.props.fetchGithub2('https://api.github.com/users/maxmellon')
    }, 3000)
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
  fetchGithub1,
  fetchGithub2,
  reset,
}

export default App |> connect(mapStateToProps, mapDispatchToActions) |> hot(module)
