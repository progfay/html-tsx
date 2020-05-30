declare global {
  namespace JSX {
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
      [K in keyof Omit<HTMLElementTagNameMap[T], keyof JSX.ElementChildrenAttribute>]?:
        HTMLElementTagNameMap[T][K] extends (string | boolean | number)
          ? HTMLElementTagNameMap[T][K]
          : never
    } & {
      [K in keyof JSX.ElementChildrenAttribute]?:
        T extends JSX.EmptyElementTagName ? never : JSX.ElementChildrenAttribute[K]
    }

    type IntrinsicElements = {
      [T in keyof HTMLElementTagNameMap]?: Properties<T>
    }
  }
}

// Reference: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
const EMPTY_ELEMENT_LIST = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
] as const

function renderAttributes<T extends keyof JSX.IntrinsicElements> (attr: JSX.Properties<T>): string {
  return Object
    .entries(attr)
    .map(([key, value]) => (
      typeof value === 'boolean'
        ? key
        : `${key}="${value?.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;') ?? ''}"`
    ))
    .join(' ')
}

export function pragma<T extends keyof JSX.IntrinsicElements> (
  tagName: T,
  properties?: JSX.Properties<T>,
  ...children: JSX.ElementChildrenAttribute['children'][]
): string {
  return (
    tagName in EMPTY_ELEMENT_LIST
      ? `<${tagName}${properties ? ` ${renderAttributes(properties)}` : ''}>`
      : `<${tagName}${properties ? ` ${renderAttributes(properties)}` : ''}>${children.join('')}</${tagName}>`
  )
}
