import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Boom from '@hapi/boom'

import App from './app'

const badImplementation = (e, data) => Boom.boomify(e, { statusCode: 500, message: 'Rendering exception in ReactDOMServer.renderToString()', data })
const notFound = (data) => Boom.notFound('Route match exception in ReactDOMServer.renderToString()', data)
const renderApp = ({ location, context, routes }) => {
  try {
    return ReactDOMServer.renderToString(
      <App
        router={{ location, context }}
        routes={routes}
      />
    )
  } catch (e) {
    throw badImplementation(e, { location, context })
  }
}

/**
 * @return {String}
 */
export const renderToString = (routes, location, context = {}) => (
  renderApp({ routes, location, context }) || throw notFound({ location, context })
)

/**
 * @return {Promise}
 */
export const render = async (routes, location, context = {}) => (
  renderApp({ routes, location, context }) || throw notFound({ location, context })
)
