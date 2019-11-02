declare global {
  namespace JSX {
    type PropertyType = boolean | number | string

    type AttributesType = {
      [key: string]: PropertyType
    }

    type IntrinsicElements = {
      [key: string]: AttributesType | {}
    }
  }
}

const renderAttributes = (attr: JSX.AttributesType): string => (
  Object
    .entries(attr)
    .map(([key, value]) => `${key}="${value.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`)
    .join(' ')
)

const renderInnerHTMLs = (innerHTMLs: (number | string | boolean)[]): string => (
  innerHTMLs.map(
    (innerHTML = '') => (
      Array.isArray(innerHTML)
        ? innerHTML.map(html => html.toString()).join('')
        : innerHTML.toString()
    )
  ).join('')
)

export const pragma = (tagName: string, attributes: JSX.AttributesType, ...innerHTMLs: (number | string | boolean)[]): string =>
  `<${tagName}${attributes ? ` ${renderAttributes(attributes)}` : ''}>${renderInnerHTMLs(innerHTMLs)}</${tagName}>`
