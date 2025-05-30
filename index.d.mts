import type React from 'react'
import type {
  StaticRouterProps
} from 'react-router'

declare global {
  namespace ReactRouterRenderTypes {
    export type RouterPropsType = StaticRouterProps
    export type RoutesType = React.ReactNode
  }
}

export {}
