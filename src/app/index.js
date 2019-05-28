import React from 'react'
import PropTypes from 'prop-types'
import { StaticRouter as Router } from 'react-router-dom'

const App = ({ store, router, routes }) => (
  <Router {...router}>
    {routes}
  </Router>
)

App.propTypes = {
  router: PropTypes.shape({
    location: PropTypes.string.isRequired,
    context: PropTypes.shape()
  }).isRequired,
  routes: PropTypes.shape().isRequired
}

export default App
