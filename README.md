# html-tsx

Transform tsx to HTML string

## Setup

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "pragma"
  }
}
```

## Usage

```tsx
import { pragma } from 'html-tsx'

const renderToString = (name: string) => (
  <div class="one two three">
    <p id="line">
      Hello, {name}!
    </p>
  </div>
)

console.log(renderToString('world'))
// => <div class="one two three"><p id="line">Hello, world!</p></div>
```
