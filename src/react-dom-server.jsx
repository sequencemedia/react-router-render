/**
 *  @typedef {ReactRouterRenderTypes.RouterPropsType} RouterPropsType
 *  @typedef {ReactRouterRenderTypes.RoutesType} RoutesType
 *
 *  @typedef {{
 *    props: RouterPropsType
 *  }} RouterPropsException
 *
 *  @typedef {{
 *    e: unknown
 *  }} Exception
 */

import debug from 'debug'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  StaticRouter as Router
} from 'react-router'
import Boom from '@hapi/boom'

const log = debug('@sequencemedia/react-redux-render')

log('`react-redux-render` is awake')

/**
 *  @param {Error} e
 *  @param {RouterPropsException | Exception} data
 *  @returns A boom object
 */
function badImplementation (e, data) {
  return (
    Boom.boomify(e, { statusCode: 500, message: 'Rendering exception', data })
  )
}

/**
 *  @param {RouterPropsType} routerProps
 *  @param {RoutesType} routes
 *  @returns {string}
 */
export function getReactDOMServerRenderToString (routerProps, routes) {
  try {
    return ReactDOMServer.renderToString(
      <Router {...routerProps}>
        {routes}
      </Router>
    )
  } catch (e) {
    if (e instanceof Error) throw badImplementation(e, { props: routerProps })
    throw badImplementation(new Error('Exception'), { e })
  }
}

/**
 *  @param {RouterPropsType} routerProps
 *  @param {RoutesType} routes
 *  @returns {string}
 */
export function getReactDOMServerRenderToStaticMarkup (routerProps, routes) {
  try {
    return ReactDOMServer.renderToStaticMarkup(
      <Router {...routerProps}>
        {routes}
      </Router>
    )
  } catch (e) {
    if (e instanceof Error) throw badImplementation(e, { props: routerProps })
    throw badImplementation(new Error('Exception'), { e })
  }
}
