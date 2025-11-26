# BoardsApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**boardsControllerAddComment**](BoardsApi.md#boardscontrolleraddcomment) | **POST** /api/boards/cards/{cardId}/comments |  |
| [**boardsControllerAddMember**](BoardsApi.md#boardscontrolleraddmember) | **POST** /api/boards/{boardId}/members |  |
| [**boardsControllerCreateBoard**](BoardsApi.md#boardscontrollercreateboard) | **POST** /api/boards |  |
| [**boardsControllerCreateCard**](BoardsApi.md#boardscontrollercreatecard) | **POST** /api/boards/{boardId}/columns/{columnId}/cards |  |
| [**boardsControllerCreateColumn**](BoardsApi.md#boardscontrollercreatecolumn) | **POST** /api/boards/{boardId}/columns |  |
| [**boardsControllerDeleteBoard**](BoardsApi.md#boardscontrollerdeleteboard) | **DELETE** /api/boards/{boardId} |  |
| [**boardsControllerDeleteCard**](BoardsApi.md#boardscontrollerdeletecard) | **DELETE** /api/boards/cards/{cardId} |  |
| [**boardsControllerDeleteColumn**](BoardsApi.md#boardscontrollerdeletecolumn) | **DELETE** /api/boards/{boardId}/columns/{columnId} |  |
| [**boardsControllerDeleteComment**](BoardsApi.md#boardscontrollerdeletecomment) | **DELETE** /api/boards/cards/{cardId}/comments/{commentId} |  |
| [**boardsControllerGetBoard**](BoardsApi.md#boardscontrollergetboard) | **GET** /api/boards/{boardId} |  |
| [**boardsControllerListBoards**](BoardsApi.md#boardscontrollerlistboards) | **GET** /api/boards |  |
| [**boardsControllerMoveCard**](BoardsApi.md#boardscontrollermovecard) | **PATCH** /api/boards/cards/{cardId}/move |  |
| [**boardsControllerRemoveMember**](BoardsApi.md#boardscontrollerremovemember) | **DELETE** /api/boards/{boardId}/members/{memberId} |  |
| [**boardsControllerReorderColumns**](BoardsApi.md#boardscontrollerreordercolumns) | **PATCH** /api/boards/{boardId}/columns/reorder |  |
| [**boardsControllerUpdateBoard**](BoardsApi.md#boardscontrollerupdateboard) | **PATCH** /api/boards/{boardId} |  |
| [**boardsControllerUpdateCard**](BoardsApi.md#boardscontrollerupdatecard) | **PATCH** /api/boards/cards/{cardId} |  |
| [**boardsControllerUpdateColumn**](BoardsApi.md#boardscontrollerupdatecolumn) | **PATCH** /api/boards/{boardId}/columns/{columnId} |  |
| [**boardsControllerUpdateComment**](BoardsApi.md#boardscontrollerupdatecomment) | **PATCH** /api/boards/cards/{cardId}/comments/{commentId} |  |



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


## boardsControllerUpdateComment

> boardsControllerUpdateComment(cardId, commentId, updateCommentDto)



### Example

```ts
import {
  Configuration,
  BoardsApi,
} from '';
import type { BoardsControllerUpdateCommentRequest } from '';

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
    // UpdateCommentDto
    updateCommentDto: ...,
  } satisfies BoardsControllerUpdateCommentRequest;

  try {
    const data = await api.boardsControllerUpdateComment(body);
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
| **updateCommentDto** | [UpdateCommentDto](UpdateCommentDto.md) |  | |

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

