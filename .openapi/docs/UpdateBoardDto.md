
# UpdateBoardDto


## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string

## Example

```typescript
import type { UpdateBoardDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Release Readiness,
  "description": Updated description for stakeholders,
} satisfies UpdateBoardDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateBoardDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


