import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Boom from '@hapi/boom'

import { StaticRouter as Router } from 'react-router-dom'

const badImplementation = (e, data) => Boom.boomify(e, { statusCode: 500, message: 'Rendering exception', data })
const notFound = (data) => Boom.notFound('Routing exception', data)

const getReactDOMServerRenderToString = (routerProps, routes = {}) => {
  try {
    return ReactDOMServer.renderToString(
      <Router {...routerProps}>
        {routes}
      </Router>
    )
  } catch (e) {
    throw badImplementation(e, routerProps)
  }
}

const getReactDOMServerRenderToStaticMarkup = (routerProps, routes = {}) => {
  try {
    return ReactDOMServer.renderToStaticMarkup(
      <Router {...routerProps}>
        {routes}
      </Router>
    )
  } catch (e) {
    throw badImplementation(e, routerProps)
  }
}

/**
 * @return {String}
 */
export const renderToString = ({ location, context = {}, ...router } = {}, routes = {}) => (
  getReactDOMServerRenderToString({ ...router, location, context }, routes) || throw notFound({ ...router, location, context })
)

/**
 * @return {String}
 */
export const renderToStaticMarkup = ({ location, context = {}, ...router } = {}, routes = {}) => (
  getReactDOMServerRenderToStaticMarkup({ ...router, location, context }, routes) || throw notFound({ ...router, location, context })
)

/**
 * @return {Promise}
 */
export const render = async ({ location, context = {}, ...router } = {}, routes = {}) => (
  getReactDOMServerRenderToString({ ...router, location, context }, routes) || throw notFound({ ...router, location, context })
)
