
# RegisterDto


## Properties

Name | Type
------------ | -------------
`email` | string
`password` | string
`displayName` | string
`role` | string

## Example

```typescript
import type { RegisterDto } from ''

// TODO: Update the object below with actual values
const example = {
  "email": user@example.com,
  "password": null,
  "displayName": Jane Doe,
  "role": null,
} satisfies RegisterDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as RegisterDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


