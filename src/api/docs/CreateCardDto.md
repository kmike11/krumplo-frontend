
# CreateCardDto


## Properties

Name | Type
------------ | -------------
`title` | string
`description` | string
`priority` | string
`type` | string
`dueDate` | Date
`storyPoints` | number
`assigneeId` | string
`reporterId` | string
`labelIds` | Array&lt;string&gt;

## Example

```typescript
import type { CreateCardDto } from ''

// TODO: Update the object below with actual values
const example = {
  "title": Implement authentication flow,
  "description": Handle login, registration, and forgot password,
  "priority": null,
  "type": null,
  "dueDate": null,
  "storyPoints": null,
  "assigneeId": null,
  "reporterId": null,
  "labelIds": null,
} satisfies CreateCardDto

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateCardDto
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


