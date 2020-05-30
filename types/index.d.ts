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
    // | 'keygen'
    | 'link'
    | 'meta'
    | 'param'
    | 'source'
    | 'track'
    | 'wbr'
  )

  interface ElementChildrenAttribute {
    children: {}
  }

  type Properties<T extends keyof HTMLElementTagNameMap> = {
    readonly [K in keyof Omit<HTMLElementTagNameMap[T], 'children'>]?:
      HTMLElementTagNameMap[T][K] extends (string | boolean | number)
        ? HTMLElementTagNameMap[T][K]
        : never
  } | {
    readonly toString: () => string
    readonly children?: T extends pragma.JSX.EmptyElementTagName ? never : (string | string[])
  }

  type IntrinsicElements = {
    [T in keyof HTMLElementTagNameMap]: Properties<T>
  }
}
