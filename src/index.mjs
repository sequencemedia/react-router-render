/**
 *  @typedef {ReactRouterRenderTypes.RouterPropsType} RouterPropsType
 *  @typedef {ReactRouterRenderTypes.RoutesType} RoutesType
 */

import debug from 'debug'

import Boom from '@hapi/boom'

import {
  getReactDOMServerRenderToString,
  getReactDOMServerRenderToStaticMarkup
} from './react-dom-server.cjs'

const log = debug('@sequencemedia/react-redux-render')

log('`react-redux-render` is awake')

/**
 *  @param {RouterPropsType} data
 *  @returns A boom object
 */
function notFound (data) {
  return (
    Boom.notFound('Routing exception', data)
  )
}

/**
 *  @param {RouterPropsType & { context?: Record<PropertyKey, unknown> }} routerProps
 *  @param {RoutesType} routes
 *  @returns {string}
 */
export function renderToString ({ location, context = {}, ...router }, routes) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToString(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}

/**
 *  @param {RouterPropsType & { context?: Record<PropertyKey, unknown> }} routerProps
 *  @param {RoutesType} routes
 *  @returns {string}
 */
export function renderToStaticMarkup ({ location, context = {}, ...router }, routes) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToStaticMarkup(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}

/**
 *  @param {RouterPropsType & { context?: Record<PropertyKey, unknown> }} routerProps
 *  @param {RoutesType} routes
 *  @returns {string}
 */
export function render ({ location, context = {}, ...router }, routes) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToString(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}
