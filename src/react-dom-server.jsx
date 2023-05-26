import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Boom from '@hapi/boom'
import { StaticRouter as Router } from 'react-router-dom/server'

/**
 * @param {Error} e
 * @param {{props: Object.<string, any>}} data
 * @returns A boom object
 */
const badImplementation = (e, data) => Boom.boomify(e, { statusCode: 500, message: 'Rendering exception', data })

/**
 * @param {Object.<string, any>} routerProps
 * @param {Object.<string, any>} routes
 * @returns {string}
 */
export function getReactDOMServerRenderToString (routerProps, routes) {
  try {
    return ReactDOMServer.renderToString(
      <Router {...routerProps}>
        {routes}
      </Router>
    )
  } catch (e) {
    log(e)

    throw badImplementation(e, routerProps)
  }
}

/**
 * @param {Object.<string, any>} routerProps
 * @param {Object.<string, any>} routes
 * @returns {string}
 */
export function getReactDOMServerRenderToStaticMarkup (routerProps, routes) {
  try {
    return ReactDOMServer.renderToStaticMarkup(
      <Router {...routerProps}>
        {routes}
      </Router>
    )
  } catch (e) {
    log(e)

    throw badImplementation(e, routerProps)
  }
}
