
# CreateBoardDto


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string

## Example

```typescript
import type { CreateBoardDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Product Roadmap,
  "description": Planning the next major release,
} satisfies CreateBoardDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateBoardDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


