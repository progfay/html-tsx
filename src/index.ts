// Reference: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
const EMPTY_ELEMENT_LIST: pragma.JSX.EmptyElementTagName[] = [
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  // 'keygen',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]

function renderAttributes<T extends keyof pragma.JSX.IntrinsicElements> (attr: pragma.JSX.Properties<T>): string {
  return Object
    .entries(attr)
    .map(([key, value]) => (
      typeof value === 'boolean'
        ? key
        : `${key}="${value?.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;') ?? ''}"`
    ))
    .join(' ')
}

export function pragma<T extends keyof pragma.JSX.IntrinsicElements> (
  tagName: T,
  properties?: pragma.JSX.Properties<T>,
  ...children: pragma.JSX.ElementChildrenAttribute['children'][]
): string {
  return (
    tagName in EMPTY_ELEMENT_LIST
      ? `<${tagName}${properties ? ` ${renderAttributes(properties)}` : ''}>`
      : `<${tagName}${properties ? ` ${renderAttributes(properties)}` : ''}>${children.join('')}</${tagName}>`
  )
}
