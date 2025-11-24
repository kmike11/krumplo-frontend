
# UpdateChecklistItemDto


## Properties

Name | Type
------------ | -------------
`content` | string
`completed` | boolean
`position` | number

## Example

```typescript
import type { UpdateChecklistItemDto } from ''

// TODO: Update the object below with actual values
const example = {
  "content": Write integration tests,
  "completed": null,
  "position": null,
} satisfies UpdateChecklistItemDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateChecklistItemDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


