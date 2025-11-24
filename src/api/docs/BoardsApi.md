# BoardsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**boardsControllerAddAttachment**](BoardsApi.md#boardscontrolleraddattachment) | **POST** /api/boards/cards/{cardId}/attachments |  |
| [**boardsControllerAddComment**](BoardsApi.md#boardscontrolleraddcomment) | **POST** /api/boards/cards/{cardId}/comments |  |
| [**boardsControllerAddMember**](BoardsApi.md#boardscontrolleraddmember) | **POST** /api/boards/{boardId}/members |  |
| [**boardsControllerCreateBoard**](BoardsApi.md#boardscontrollercreateboard) | **POST** /api/boards |  |
| [**boardsControllerCreateCard**](BoardsApi.md#boardscontrollercreatecard) | **POST** /api/boards/{boardId}/columns/{columnId}/cards |  |
| [**boardsControllerCreateChecklistItem**](BoardsApi.md#boardscontrollercreatechecklistitem) | **POST** /api/boards/cards/{cardId}/checklist |  |
| [**boardsControllerCreateColumn**](BoardsApi.md#boardscontrollercreatecolumn) | **POST** /api/boards/{boardId}/columns |  |
| [**boardsControllerCreateLabel**](BoardsApi.md#boardscontrollercreatelabel) | **POST** /api/boards/{boardId}/labels |  |
| [**boardsControllerCreateSprint**](BoardsApi.md#boardscontrollercreatesprint) | **POST** /api/boards/{boardId}/sprints |  |
| [**boardsControllerDeleteAttachment**](BoardsApi.md#boardscontrollerdeleteattachment) | **DELETE** /api/boards/cards/{cardId}/attachments/{attachmentId} |  |
| [**boardsControllerDeleteBoard**](BoardsApi.md#boardscontrollerdeleteboard) | **DELETE** /api/boards/{boardId} |  |
| [**boardsControllerDeleteCard**](BoardsApi.md#boardscontrollerdeletecard) | **DELETE** /api/boards/cards/{cardId} |  |
| [**boardsControllerDeleteChecklistItem**](BoardsApi.md#boardscontrollerdeletechecklistitem) | **DELETE** /api/boards/cards/{cardId}/checklist/{itemId} |  |
| [**boardsControllerDeleteColumn**](BoardsApi.md#boardscontrollerdeletecolumn) | **DELETE** /api/boards/{boardId}/columns/{columnId} |  |
| [**boardsControllerDeleteComment**](BoardsApi.md#boardscontrollerdeletecomment) | **DELETE** /api/boards/cards/{cardId}/comments/{commentId} |  |
| [**boardsControllerDeleteLabel**](BoardsApi.md#boardscontrollerdeletelabel) | **DELETE** /api/boards/{boardId}/labels/{labelId} |  |
| [**boardsControllerDeleteSprint**](BoardsApi.md#boardscontrollerdeletesprint) | **DELETE** /api/boards/{boardId}/sprints/{sprintId} |  |
| [**boardsControllerGetBoard**](BoardsApi.md#boardscontrollergetboard) | **GET** /api/boards/{boardId} |  |
| [**boardsControllerListBoards**](BoardsApi.md#boardscontrollerlistboards) | **GET** /api/boards |  |
| [**boardsControllerMoveCard**](BoardsApi.md#boardscontrollermovecard) | **PATCH** /api/boards/cards/{cardId}/move |  |
| [**boardsControllerRemoveMember**](BoardsApi.md#boardscontrollerremovemember) | **DELETE** /api/boards/{boardId}/members/{memberId} |  |
| [**boardsControllerReorderColumns**](BoardsApi.md#boardscontrollerreordercolumns) | **PATCH** /api/boards/{boardId}/columns/reorder |  |
| [**boardsControllerUpdateBoard**](BoardsApi.md#boardscontrollerupdateboard) | **PATCH** /api/boards/{boardId} |  |
| [**boardsControllerUpdateCard**](BoardsApi.md#boardscontrollerupdatecard) | **PATCH** /api/boards/cards/{cardId} |  |
| [**boardsControllerUpdateCardAssignee**](BoardsApi.md#boardscontrollerupdatecardassignee) | **PATCH** /api/boards/cards/{cardId}/assignee |  |
| [**boardsControllerUpdateCardLabels**](BoardsApi.md#boardscontrollerupdatecardlabels) | **PATCH** /api/boards/cards/{cardId}/labels |  |
| [**boardsControllerUpdateCardSprint**](BoardsApi.md#boardscontrollerupdatecardsprint) | **PATCH** /api/boards/cards/{cardId}/sprint |  |
| [**boardsControllerUpdateCardWatchers**](BoardsApi.md#boardscontrollerupdatecardwatchers) | **PATCH** /api/boards/cards/{cardId}/watchers |  |
| [**boardsControllerUpdateChecklistItem**](BoardsApi.md#boardscontrollerupdatechecklistitem) | **PATCH** /api/boards/cards/{cardId}/checklist/{itemId} |  |
| [**boardsControllerUpdateColumn**](BoardsApi.md#boardscontrollerupdatecolumn) | **PATCH** /api/boards/{boardId}/columns/{columnId} |  |
| [**boardsControllerUpdateLabel**](BoardsApi.md#boardscontrollerupdatelabel) | **PATCH** /api/boards/{boardId}/labels/{labelId} |  |
| [**boardsControllerUpdateSprint**](BoardsApi.md#boardscontrollerupdatesprint) | **PATCH** /api/boards/{boardId}/sprints/{sprintId} |  |
| [**boardsControllerUpdateSprintStatus**](BoardsApi.md#boardscontrollerupdatesprintstatus) | **PATCH** /api/boards/{boardId}/sprints/{sprintId}/status |  |



## boardsControllerAddAttachment

> boardsControllerAddAttachment(cardId, addAttachmentDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerAddAttachmentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // AddAttachmentDto
    addAttachmentDto: ...,
  } satisfies BoardsControllerAddAttachmentRequest;

  try {
    const data = await api.boardsControllerAddAttachment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **addAttachmentDto** | [AddAttachmentDto](AddAttachmentDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerAddComment

> boardsControllerAddComment(cardId, addCommentDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerAddCommentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // AddCommentDto
    addCommentDto: ...,
  } satisfies BoardsControllerAddCommentRequest;

  try {
    const data = await api.boardsControllerAddComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **addCommentDto** | [AddCommentDto](AddCommentDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerAddMember

> boardsControllerAddMember(boardId, addBoardMemberDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerAddMemberRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // AddBoardMemberDto
    addBoardMemberDto: ...,
  } satisfies BoardsControllerAddMemberRequest;

  try {
    const data = await api.boardsControllerAddMember(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **addBoardMemberDto** | [AddBoardMemberDto](AddBoardMemberDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerCreateBoard

> boardsControllerCreateBoard(createBoardDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerCreateBoardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // CreateBoardDto
    createBoardDto: ...,
  } satisfies BoardsControllerCreateBoardRequest;

  try {
    const data = await api.boardsControllerCreateBoard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createBoardDto** | [CreateBoardDto](CreateBoardDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerCreateCard

> boardsControllerCreateCard(boardId, columnId, createCardDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerCreateCardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    columnId: columnId_example,
    // CreateCardDto
    createCardDto: ...,
  } satisfies BoardsControllerCreateCardRequest;

  try {
    const data = await api.boardsControllerCreateCard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **columnId** | `string` |  | [Defaults to `undefined`] |
| **createCardDto** | [CreateCardDto](CreateCardDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerCreateChecklistItem

> boardsControllerCreateChecklistItem(cardId, createChecklistItemDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerCreateChecklistItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // CreateChecklistItemDto
    createChecklistItemDto: ...,
  } satisfies BoardsControllerCreateChecklistItemRequest;

  try {
    const data = await api.boardsControllerCreateChecklistItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **createChecklistItemDto** | [CreateChecklistItemDto](CreateChecklistItemDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerCreateColumn

> boardsControllerCreateColumn(boardId, createColumnDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerCreateColumnRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // CreateColumnDto
    createColumnDto: ...,
  } satisfies BoardsControllerCreateColumnRequest;

  try {
    const data = await api.boardsControllerCreateColumn(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **createColumnDto** | [CreateColumnDto](CreateColumnDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerCreateLabel

> boardsControllerCreateLabel(boardId, createLabelDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerCreateLabelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // CreateLabelDto
    createLabelDto: ...,
  } satisfies BoardsControllerCreateLabelRequest;

  try {
    const data = await api.boardsControllerCreateLabel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **createLabelDto** | [CreateLabelDto](CreateLabelDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerCreateSprint

> boardsControllerCreateSprint(boardId, createSprintDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerCreateSprintRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // CreateSprintDto
    createSprintDto: ...,
  } satisfies BoardsControllerCreateSprintRequest;

  try {
    const data = await api.boardsControllerCreateSprint(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **createSprintDto** | [CreateSprintDto](CreateSprintDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteAttachment

> boardsControllerDeleteAttachment(cardId, attachmentId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteAttachmentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // string
    attachmentId: attachmentId_example,
  } satisfies BoardsControllerDeleteAttachmentRequest;

  try {
    const data = await api.boardsControllerDeleteAttachment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **attachmentId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteBoard

> boardsControllerDeleteBoard(boardId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteBoardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
  } satisfies BoardsControllerDeleteBoardRequest;

  try {
    const data = await api.boardsControllerDeleteBoard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteCard

> boardsControllerDeleteCard(cardId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteCardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
  } satisfies BoardsControllerDeleteCardRequest;

  try {
    const data = await api.boardsControllerDeleteCard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteChecklistItem

> boardsControllerDeleteChecklistItem(cardId, itemId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteChecklistItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // string
    itemId: itemId_example,
  } satisfies BoardsControllerDeleteChecklistItemRequest;

  try {
    const data = await api.boardsControllerDeleteChecklistItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **itemId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteColumn

> boardsControllerDeleteColumn(boardId, columnId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteColumnRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    columnId: columnId_example,
  } satisfies BoardsControllerDeleteColumnRequest;

  try {
    const data = await api.boardsControllerDeleteColumn(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **columnId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteComment

> boardsControllerDeleteComment(cardId, commentId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteCommentRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // string
    commentId: commentId_example,
  } satisfies BoardsControllerDeleteCommentRequest;

  try {
    const data = await api.boardsControllerDeleteComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **commentId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteLabel

> boardsControllerDeleteLabel(boardId, labelId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteLabelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    labelId: labelId_example,
  } satisfies BoardsControllerDeleteLabelRequest;

  try {
    const data = await api.boardsControllerDeleteLabel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **labelId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerDeleteSprint

> boardsControllerDeleteSprint(boardId, sprintId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerDeleteSprintRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    sprintId: sprintId_example,
  } satisfies BoardsControllerDeleteSprintRequest;

  try {
    const data = await api.boardsControllerDeleteSprint(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **sprintId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerGetBoard

> boardsControllerGetBoard(boardId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerGetBoardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
  } satisfies BoardsControllerGetBoardRequest;

  try {
    const data = await api.boardsControllerGetBoard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerListBoards

> boardsControllerListBoards()



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerListBoardsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  try {
    const data = await api.boardsControllerListBoards();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerMoveCard

> boardsControllerMoveCard(cardId, moveCardDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerMoveCardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // MoveCardDto
    moveCardDto: ...,
  } satisfies BoardsControllerMoveCardRequest;

  try {
    const data = await api.boardsControllerMoveCard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **moveCardDto** | [MoveCardDto](MoveCardDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerRemoveMember

> boardsControllerRemoveMember(boardId, memberId)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerRemoveMemberRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    memberId: memberId_example,
  } satisfies BoardsControllerRemoveMemberRequest;

  try {
    const data = await api.boardsControllerRemoveMember(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **memberId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerReorderColumns

> boardsControllerReorderColumns(boardId, reorderColumnsDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerReorderColumnsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // ReorderColumnsDto
    reorderColumnsDto: ...,
  } satisfies BoardsControllerReorderColumnsRequest;

  try {
    const data = await api.boardsControllerReorderColumns(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **reorderColumnsDto** | [ReorderColumnsDto](ReorderColumnsDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateBoard

> boardsControllerUpdateBoard(boardId, updateBoardDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateBoardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // UpdateBoardDto
    updateBoardDto: ...,
  } satisfies BoardsControllerUpdateBoardRequest;

  try {
    const data = await api.boardsControllerUpdateBoard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **updateBoardDto** | [UpdateBoardDto](UpdateBoardDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateCard

> boardsControllerUpdateCard(cardId, updateCardDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateCardRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // UpdateCardDto
    updateCardDto: ...,
  } satisfies BoardsControllerUpdateCardRequest;

  try {
    const data = await api.boardsControllerUpdateCard(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **updateCardDto** | [UpdateCardDto](UpdateCardDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateCardAssignee

> boardsControllerUpdateCardAssignee(cardId, updateCardAssigneeDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateCardAssigneeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // UpdateCardAssigneeDto
    updateCardAssigneeDto: ...,
  } satisfies BoardsControllerUpdateCardAssigneeRequest;

  try {
    const data = await api.boardsControllerUpdateCardAssignee(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **updateCardAssigneeDto** | [UpdateCardAssigneeDto](UpdateCardAssigneeDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateCardLabels

> boardsControllerUpdateCardLabels(cardId, updateCardLabelsDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateCardLabelsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // UpdateCardLabelsDto
    updateCardLabelsDto: ...,
  } satisfies BoardsControllerUpdateCardLabelsRequest;

  try {
    const data = await api.boardsControllerUpdateCardLabels(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **updateCardLabelsDto** | [UpdateCardLabelsDto](UpdateCardLabelsDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateCardSprint

> boardsControllerUpdateCardSprint(cardId, updateCardSprintDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateCardSprintRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // UpdateCardSprintDto
    updateCardSprintDto: ...,
  } satisfies BoardsControllerUpdateCardSprintRequest;

  try {
    const data = await api.boardsControllerUpdateCardSprint(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **updateCardSprintDto** | [UpdateCardSprintDto](UpdateCardSprintDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateCardWatchers

> boardsControllerUpdateCardWatchers(cardId, updateCardWatchersDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateCardWatchersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // UpdateCardWatchersDto
    updateCardWatchersDto: ...,
  } satisfies BoardsControllerUpdateCardWatchersRequest;

  try {
    const data = await api.boardsControllerUpdateCardWatchers(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **updateCardWatchersDto** | [UpdateCardWatchersDto](UpdateCardWatchersDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateChecklistItem

> boardsControllerUpdateChecklistItem(cardId, itemId, updateChecklistItemDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateChecklistItemRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    cardId: cardId_example,
    // string
    itemId: itemId_example,
    // UpdateChecklistItemDto
    updateChecklistItemDto: ...,
  } satisfies BoardsControllerUpdateChecklistItemRequest;

  try {
    const data = await api.boardsControllerUpdateChecklistItem(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **cardId** | `string` |  | [Defaults to `undefined`] |
| **itemId** | `string` |  | [Defaults to `undefined`] |
| **updateChecklistItemDto** | [UpdateChecklistItemDto](UpdateChecklistItemDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateColumn

> boardsControllerUpdateColumn(boardId, columnId, updateColumnDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateColumnRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    columnId: columnId_example,
    // UpdateColumnDto
    updateColumnDto: ...,
  } satisfies BoardsControllerUpdateColumnRequest;

  try {
    const data = await api.boardsControllerUpdateColumn(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **columnId** | `string` |  | [Defaults to `undefined`] |
| **updateColumnDto** | [UpdateColumnDto](UpdateColumnDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateLabel

> boardsControllerUpdateLabel(boardId, labelId, updateLabelDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateLabelRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    labelId: labelId_example,
    // UpdateLabelDto
    updateLabelDto: ...,
  } satisfies BoardsControllerUpdateLabelRequest;

  try {
    const data = await api.boardsControllerUpdateLabel(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **labelId** | `string` |  | [Defaults to `undefined`] |
| **updateLabelDto** | [UpdateLabelDto](UpdateLabelDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateSprint

> boardsControllerUpdateSprint(boardId, sprintId, updateSprintDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateSprintRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    sprintId: sprintId_example,
    // UpdateSprintDto
    updateSprintDto: ...,
  } satisfies BoardsControllerUpdateSprintRequest;

  try {
    const data = await api.boardsControllerUpdateSprint(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **sprintId** | `string` |  | [Defaults to `undefined`] |
| **updateSprintDto** | [UpdateSprintDto](UpdateSprintDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## boardsControllerUpdateSprintStatus

> boardsControllerUpdateSprintStatus(boardId, sprintId, updateSprintStatusDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateSprintStatusRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BoardsApi(config);

  const body = {
    // string
    boardId: boardId_example,
    // string
    sprintId: sprintId_example,
    // UpdateSprintStatusDto
    updateSprintStatusDto: ...,
  } satisfies BoardsControllerUpdateSprintStatusRequest;

  try {
    const data = await api.boardsControllerUpdateSprintStatus(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **boardId** | `string` |  | [Defaults to `undefined`] |
| **sprintId** | `string` |  | [Defaults to `undefined`] |
| **updateSprintStatusDto** | [UpdateSprintStatusDto](UpdateSprintStatusDto.md) |  | |

### Return type

`void` (Empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

