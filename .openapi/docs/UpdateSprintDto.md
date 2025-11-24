
# UpdateSprintDto


## Properties

Name | Type
------------ | -------------
`name` | string
`goal` | string
`startDate` | Date
`endDate` | Date

## Example

```typescript
import type { UpdateSprintDto } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Sprint 12 - Extended,
  "goal": Expanded to cover regression testing,
  "startDate": null,
  "endDate": null,
} satisfies UpdateSprintDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateSprintDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


