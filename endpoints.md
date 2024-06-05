# User Endpoints
## /user/login
### Body
```ts
interface LoginRequestBody {
  email: string,
  password: string
}
```

### Responses
#### 200
Returned if the user was successfully logged in.

##### Body
```ts
interface LoginResponseBody {
  email: string,
  password: string,
  last_login?: number, // unix time stamp
  register_date: number, // unix time stamp
  races: [{
    race_id: number,
    vehicle_id: number,
    position_qualifying_overall?: number,
    position_race_overall?: number,
    position_qualifying_class: number,
    position_race_class: number
  }]
}
```

#### 401
Returned if the login credentials were invalid.

##### Body
```ts
interface ErrorResponseBody {
  error: string
}
```

#### 500
Returned if the server has an internal server error.

##### Body
```ts
interface ErrorResponseBody {
  error: string
}
```

## /user/register
Registers a new user.

### Body
```ts
interface RegisterRequestBody {
  email: string,
  password: string
}
```

### Responses
#### 201
Returned if the user has been successfully created.

##### Body
```ts
interface RegisterResponseBody {
  user_id: string,
  email: string,
  register_date: number // unix time stamp
}
```

#### 409
Returned if the email has already been registered before
and is unavailable.

##### Body
```ts
interface ErrorResponseBody {
  error: string
}
```

#### 500
Returned if the server has an internal server error.

##### Body
```ts
interface ErrorResponseBody {
  error: string
}
```

## /user
Returns all users.

### Responses
#### 200
Returned if any users have been found.

##### Body
```ts
type UsersResponseBody = [{
  email: string,
  password: string,
  last_login?: number, // unix time stamp
  register_date: number, // unix time stamp
  races: [{
    race_id: number,
    vehicle_id: number,
    position_qualifying_overall?: number,
    position_race_overall?: number,
    position_qualifying_class: number,
    position_race_class: number
  }]
}];
```

## /user/:id
### Parameters
#### id
The id of the user.

### Responses
#### 200
Returned if the user exists.

##### Body
```ts
interface UserResponseBody {
  email: string,
  password: string,
  last_login?: number, // unix time stamp
  register_date: number, // unix time stamp
  races: [{
    race_id: number,
    vehicle_id: number,
    position_qualifying_overall?: number,
    position_race_overall?: number,
    position_qualifying_class: number,
    position_race_class: number
  }]
}
```

#### 500
Returned if the server ahs an internal server error.

##### Body
```ts
interface ErrorResponseBody {
  error: string
}
```
