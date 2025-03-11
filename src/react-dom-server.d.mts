declare module '#react-router-render/react-dom-server' {
  type RouterPropsType = ReactRouterRenderTypes.RouterPropsType
  type RoutesType = ReactRouterRenderTypes.RoutesType

  export function getReactDOMServerRenderToString (routerProps: RouterPropsType, routes: RoutesType): string

  export function getReactDOMServerRenderToStaticMarkup (routerProps: RouterPropsType, routes: RoutesType): string
}
