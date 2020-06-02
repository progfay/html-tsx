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

    // Reference: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts
    interface HTMLAttributes {
      // Standard HTML Attributes
      accesskey?: string
      class?: string
      contenteditable?: boolean | 'true' | 'false' | 'inherit'
      contextmenu?: string
      dir?: string
      draggable?: boolean | 'true' | 'false'
      hidden?: boolean
      id?: string
      lang?: string
      placeholder?: string
      slot?: string
      spellcheck?: boolean | 'true' | 'false'
      style?: string
      tabindex?: number
      title?: string
      translate?: 'yes' | 'no'

      // Unknown
      radiogroup?: string // <command>, <menuitem>

      // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
      role?: string
      'aria-activedescendant'?: string
      'aria-atomic'?: boolean | 'false' | 'true'
      'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both'
      'aria-busy'?: boolean | 'false' | 'true'
      'aria-checked'?: boolean | 'false' | 'mixed' | 'true'
      'aria-colcount'?: number
      'aria-colindex'?: number
      'aria-colspan'?: number
      'aria-controls'?: string
      'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time'
      'aria-describedby'?: string
      'aria-details'?: string
      'aria-disabled'?: boolean | 'false' | 'true'
      'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup'
      'aria-errormessage'?: string
      'aria-expanded'?: boolean | 'false' | 'true'
      'aria-flowto'?: string
      'aria-grabbed'?: boolean | 'false' | 'true'
      'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'
      'aria-hidden'?: boolean | 'false' | 'true'
      'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling'
      'aria-keyshortcuts'?: string
      'aria-label'?: string
      'aria-labelledby'?: string
      'aria-level'?: number
      'aria-live'?: 'off' | 'assertive' | 'polite'
      'aria-modal'?: boolean | 'false' | 'true'
      'aria-multiline'?: boolean | 'false' | 'true'
      'aria-multiselectable'?: boolean | 'false' | 'true'
      'aria-orientation'?: 'horizontal' | 'vertical'
      'aria-owns'?: string
      'aria-placeholder'?: string
      'aria-posinset'?: number
      'aria-pressed'?: boolean | 'false' | 'mixed' | 'true'
      'aria-readonly'?: boolean | 'false' | 'true'
      'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text'
      'aria-required'?: boolean | 'false' | 'true'
      'aria-roledescription'?: string
      'aria-rowcount'?: number
      'aria-rowindex'?: number
      'aria-rowspan'?: number
      'aria-selected'?: boolean | 'false' | 'true'
      'aria-setsize'?: number
      'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other'
      'aria-valuemax'?: number
      'aria-valuemin'?: number
      'aria-valuenow'?: number
      'aria-valuetext'?: string

      // RDFa Attributes
      about?: string
      datatype?: string
      inlist?: any
      prefix?: string
      property?: string
      resource?: string
      typeof?: string
      vocab?: string

      // Non-standard Attributes
      autocapitalize?: string
      autocorrect?: string
      autosave?: string
      color?: string
      itemprop?: string
      itemscope?: boolean
      itemtype?: string
      itemid?: string
      itemref?: string
      results?: number
      security?: string
      unselectable?: 'on' | 'off'

      // Living Standard
      inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
      is?: string
    }

    type Properties<T extends keyof HTMLElementTagNameMap> = {
      readonly [K in keyof Omit<HTMLElementTagNameMap[T], 'children' | keyof HTMLAttributes>]?:
        HTMLElementTagNameMap[T][K] extends (string | boolean | number)
          ? HTMLElementTagNameMap[T][K]
          : never
    } & {
      readonly toString: () => string
      readonly children?: T extends JSX.EmptyElementTagName ? never : (string | string[])
    } & HTMLAttributes

    type IntrinsicElements = {
      [T in keyof HTMLElementTagNameMap]: Properties<T>
    }
  }
}

// Reference: https://developer.mozilla.org/en-US/docs/Glossary/Empty_element
const EMPTY_ELEMENT_LIST: JSX.EmptyElementTagName[] = [
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

function renderAttributes<T extends keyof JSX.IntrinsicElements> (attr: JSX.Properties<T>): string {
  return Object
    .entries(attr)
    .map(([key, value]) => (
      typeof value === 'boolean'
        ? key
        : `${key}="${(value as number | string)?.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;') ?? ''}"`
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
