# UsersApi

All URIs are relative to *http://localhost*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**usersControllerGetCurrentUser**](UsersApi.md#userscontrollergetcurrentuser) | **GET** /api/users/me |  |
| [**usersControllerListUsers**](UsersApi.md#userscontrollerlistusers) | **GET** /api/users |  |
| [**usersControllerUpdateCurrentUser**](UsersApi.md#userscontrollerupdatecurrentuser) | **PATCH** /api/users/me |  |
| [**usersControllerUpdateUserRole**](UsersApi.md#userscontrollerupdateuserrole) | **PATCH** /api/users/{id}/role |  |



## usersControllerGetCurrentUser

> usersControllerGetCurrentUser()



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersControllerGetCurrentUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.usersControllerGetCurrentUser();
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


## usersControllerListUsers

> usersControllerListUsers()



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersControllerListUsersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  try {
    const data = await api.usersControllerListUsers();
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


## usersControllerUpdateCurrentUser

> usersControllerUpdateCurrentUser(updateUserDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersControllerUpdateCurrentUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // UpdateUserDto
    updateUserDto: ...,
  } satisfies UsersControllerUpdateCurrentUserRequest;

  try {
    const data = await api.usersControllerUpdateCurrentUser(body);
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
| **updateUserDto** | [UpdateUserDto](UpdateUserDto.md) |  | |

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


## usersControllerUpdateUserRole

> usersControllerUpdateUserRole(id, updateUserRoleDto)



### Example

```ts
import {
  Configuration,
  UsersApi,
} from '';
import type { UsersControllerUpdateUserRoleRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearer
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new UsersApi(config);

  const body = {
    // string
    id: id_example,
    // UpdateUserRoleDto
    updateUserRoleDto: ...,
  } satisfies UsersControllerUpdateUserRoleRequest;

  try {
    const data = await api.usersControllerUpdateUserRole(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |
| **updateUserRoleDto** | [UpdateUserRoleDto](UpdateUserRoleDto.md) |  | |

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

