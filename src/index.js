import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Boom from '@hapi/boom'

import App from './app'

const badImplementation = (e, data) => Boom.boomify(e, { statusCode: 500, message: 'Rendering exception', data })
const notFound = (data) => Boom.notFound('Routing exception', data)

const getReactDOMServerRenderToString = ({ location, context, routes }) => {
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

const getReactDOMServerRenderToStaticMarkup = ({ location, context, routes }) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(
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
  getReactDOMServerRenderToString({ routes, location, context }) || throw notFound({ location, context })
)

/**
 * @return {String}
 */
export const renderToStaticMarkup = (routes, location, context = {}) => (
  getReactDOMServerRenderToStaticMarkup({ routes, location, context }) || throw notFound({ location, context })
)

/**
 * @return {Promise}
 */
export const render = async (routes, location, context = {}) => renderToString(routes, location, context)
