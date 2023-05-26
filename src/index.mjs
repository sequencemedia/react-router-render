import debug from 'debug'

import Boom from '@hapi/boom'

import {
  getReactDOMServerRenderToString,
  getReactDOMServerRenderToStaticMarkup
} from './react-dom-server.cjs'

const log = debug('@sequencemedia/react-redux-render')

log('`react-redux-render` is awake')

/**
 * @param {Object.<string, any>} data
 * @returns A boom object
 */
const notFound = (data) => Boom.notFound('Routing exception', data)

/**
 * @param {Object.<string, any>} routerProps
 * @param {Object.<string, any>} routes
 * @returns {string}
 */
export function renderToString ({ location, context = {}, ...router } = {}, routes = {}) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToString(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}

/**
 * @param {Object.<string, any>} routerProps
 * @param {Object.<string, any>} routes
 * @returns {string}
 */
export function renderToStaticMarkup ({ location, context = {}, ...router } = {}, routes = {}) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToStaticMarkup(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}

/**
 * @param {Object.<string, any>} routerProps
 * @param {Object.<string, any>} routes
 * @returns {Promise<string>}
 */
export async function render ({ location, context = {}, ...router } = {}, routes = {}) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToString(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}
