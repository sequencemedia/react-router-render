import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Boom from '@hapi/boom'
import { StaticRouter as Router } from 'react-router-dom/server'
import debug from 'debug'

const log = debug('@sequencemedia/react-redux-render')

log('`react-redux-render` is awake')

const badImplementation = (e, data) => Boom.boomify(e, { statusCode: 500, message: 'Rendering exception', data })
const notFound = (data) => Boom.notFound('Routing exception', data)

function getReactDOMServerRenderToString (routerProps, routes) {
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

function getReactDOMServerRenderToStaticMarkup (routerProps, routes) {
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

/**
 * @return {string}
 */
export function renderToString ({ location, context = {}, ...router } = {}, routes = {}) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToString(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}

/**
 * @return {string}
 */
export function renderToStaticMarkup ({ location, context = {}, ...router } = {}, routes = {}) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToStaticMarkup(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}

/**
 * @return {Promise<string>}
 */
export async function render ({ location, context = {}, ...router } = {}, routes = {}) {
  const routerProps = { ...router, location, context }
  const string = getReactDOMServerRenderToString(routerProps, routes)
  if (string) return string
  throw notFound(routerProps)
}
