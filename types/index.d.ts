declare namespace pragma.JSX {
  type EmptyElementTagName = (keyof HTMLElementTagNameMap) & (
    | 'area'
    | 'base'
    | 'br'
    | 'col'
    | 'embed'
    | 'hr'
    | 'img'
    | 'input'
    | 'keygen'
    | 'link'
    | 'meta'
    | 'param'
    | 'source'
    | 'track'
    | 'wbr'
  )

  interface ElementChildrenAttribute {
    children: string | string[]
  }

  type Properties<T extends keyof HTMLElementTagNameMap> =
  {
    [K in keyof Omit<HTMLElementTagNameMap[T], keyof pragma.JSX.ElementChildrenAttribute>]?:
      HTMLElementTagNameMap[T][K] extends (string | boolean | number)
        ? HTMLElementTagNameMap[T][K]
        : never
  } & {
    [K in keyof pragma.JSX.ElementChildrenAttribute]?:
      T extends pragma.JSX.EmptyElementTagName ? never : pragma.JSX.ElementChildrenAttribute[K]
  }

  type IntrinsicElements = {
    [T in keyof HTMLElementTagNameMap]?: Properties<T>
  }
}
