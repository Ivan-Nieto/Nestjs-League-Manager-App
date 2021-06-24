<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

An api to manage a soccer league. This API can handle CRUD operations for staff members, team members, teams, and matches.

## Swagger Documentation

Swagger documentation can be found at http://localhost:3001/docs

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ docker-compose up
```

# League Manager

League Manager API

## Version: 1.2

### /member

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /member/free-agent

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /member/{memberId}

#### GET

##### Parameters

| Name     | Located in | Description | Required | Schema |
| -------- | ---------- | ----------- | -------- | ------ |
| memberId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name     | Located in | Description | Required | Schema |
| -------- | ---------- | ----------- | -------- | ------ |
| memberId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name     | Located in | Description | Required | Schema |
| -------- | ---------- | ----------- | -------- | ------ |
| memberId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /member/{memberId}/payment

#### POST

##### Parameters

| Name     | Located in | Description | Required | Schema |
| -------- | ---------- | ----------- | -------- | ------ |
| memberId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /member/{memberId}/status

#### PATCH

##### Parameters

| Name     | Located in | Description | Required | Schema |
| -------- | ---------- | ----------- | -------- | ------ |
| memberId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /person

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /person/{personId}

#### GET

##### Parameters

| Name     | Located in | Description | Required | Schema |
| -------- | ---------- | ----------- | -------- | ------ |
| personId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /team

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /team/{teamId}

#### GET

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /team/{teamId}/matches

#### GET

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /team/{teamId}/member

#### GET

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |
| status | query      |             | No       | string |
| role   | query      |             | No       | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /team/{teamId}/stats

#### GET

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /team/{teamId}/status

#### PATCH

##### Parameters

| Name   | Located in | Description | Required | Schema |
| ------ | ---------- | ----------- | -------- | ------ |
| teamId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /match

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /match/{matchId}

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| matchId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| matchId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| matchId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /staff

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### POST

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201  |             |

### /staff/{staffId}

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| staffId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### PATCH

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| staffId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

#### DELETE

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| staffId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /audit

#### GET

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### /audit/{auditId}

#### GET

##### Parameters

| Name    | Located in | Description | Required | Schema |
| ------- | ---------- | ----------- | -------- | ------ |
| auditId | path       |             | Yes      | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200  |             |

### Models

#### Member

| Name      | Type     | Description                                                               | Required |
| --------- | -------- | ------------------------------------------------------------------------- | -------- |
| balance   | number   |                                                                           | Yes      |
| team_id   | string   |                                                                           | Yes      |
| id        | string   |                                                                           | Yes      |
| name      | string   |                                                                           | Yes      |
| last_name | string   |                                                                           | Yes      |
| phone     | number   |                                                                           | No       |
| email     | string   |                                                                           | No       |
| dob       | dateTime |                                                                           | Yes      |
| role      | string   |                                                                           | Yes      |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"` | Yes      |

#### PostMemberDto

| Name      | Type     | Description                                                                                         | Required |
| --------- | -------- | --------------------------------------------------------------------------------------------------- | -------- |
| name      | string   | _Example:_ `"Douglass"`                                                                             | Yes      |
| last_name | string   | _Example:_ `"Mc Murray"`                                                                            | Yes      |
| phone     | number   | _Example:_ `5759939983`                                                                             | No       |
| email     | string   | _Example:_ `"d.mcmurray@test.com"`                                                                  | No       |
| dob       | dateTime | _Example:_ `"2000-11-24"`                                                                           | Yes      |
| role      | string   | _Example:_ `"player"`                                                                               | Yes      |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"`<br>_Example:_ `"injured"` | No       |
| team_id   | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                 | No       |
| balance   | number   |                                                                                                     | No       |

#### PostPaymentDto

| Name   | Type   | Description | Required |
| ------ | ------ | ----------- | -------- |
| amount | number |             | Yes      |

#### PatchMemberDto

| Name      | Type     | Description                                                                                         | Required |
| --------- | -------- | --------------------------------------------------------------------------------------------------- | -------- |
| name      | string   | _Example:_ `"Douglass"`                                                                             | No       |
| last_name | string   | _Example:_ `"Mc Murray"`                                                                            | No       |
| phone     | number   | _Example:_ `5759939983`                                                                             | No       |
| email     | string   | _Example:_ `"d.mcmurray@test.com"`                                                                  | No       |
| dob       | dateTime | _Example:_ `"2000-11-24"`                                                                           | No       |
| role      | string   | _Example:_ `"player"`                                                                               | No       |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"`<br>_Example:_ `"injured"` | No       |
| balance   | number   |                                                                                                     | No       |
| team_id   | string   |                                                                                                     | No       |

#### Person

| Name      | Type     | Description                                                               | Required |
| --------- | -------- | ------------------------------------------------------------------------- | -------- |
| id        | string   |                                                                           | Yes      |
| name      | string   |                                                                           | Yes      |
| last_name | string   |                                                                           | Yes      |
| phone     | number   |                                                                           | No       |
| email     | string   |                                                                           | No       |
| dob       | dateTime |                                                                           | Yes      |
| role      | string   |                                                                           | Yes      |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"` | Yes      |

#### Team

| Name    | Type   | Description                                   | Required |
| ------- | ------ | --------------------------------------------- | -------- |
| id      | string |                                               | Yes      |
| name    | string |                                               | Yes      |
| coach   | string |                                               | Yes      |
| captain | string |                                               | Yes      |
| status  | string | _Enum:_ `"active"`, `"inactive"`, `"unknown"` | Yes      |

#### CreateTeamDto

| Name    | Type   | Description                                                            | Required |
| ------- | ------ | ---------------------------------------------------------------------- | -------- |
| name    | string | _Example:_ `"Team A"`                                                  | Yes      |
| coach   | string | _Example:_ `"00000000-0000-4000-A000-000000000000"`                    | Yes      |
| captain | string | _Example:_ `"00000000-0000-4000-A000-000000000000"`                    | No       |
| status  | string | _Enum:_ `"active"`, `"inactive"`, `"unknown"`<br>_Example:_ `"active"` | Yes      |

#### Match

| Name       | Type     | Description                                                                                                                                                                                                                                                                     | Required |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| id         | string   |                                                                                                                                                                                                                                                                                 | Yes      |
| home       | string   |                                                                                                                                                                                                                                                                                 | Yes      |
| team       | string   |                                                                                                                                                                                                                                                                                 | Yes      |
| home-score | number   |                                                                                                                                                                                                                                                                                 | Yes      |
| away-score | number   |                                                                                                                                                                                                                                                                                 | Yes      |
| played     | dateTime |                                                                                                                                                                                                                                                                                 | Yes      |
| location   | string   | _Enum:_ `"Argentina"`, `"Brazil"`, `"Canada"`, `"Chile"`, `"England"`, `"France"`, `"Germany"`, `"Italy"`, `"Japan"`, `"South_Korea"`, `"Mexico"`, `"Qatar"`, `"Russia"`, `"South_Africa"`, `"Spain"`, `"Sweden"`, `"Switzerland"`, `"United_States"`, `"Uruguay"`, `"unknown"` | Yes      |
| referee    | string   |                                                                                                                                                                                                                                                                                 | Yes      |

#### PatchTeamDto

| Name    | Type   | Description                                                            | Required |
| ------- | ------ | ---------------------------------------------------------------------- | -------- |
| name    | string | _Example:_ `"Team A"`                                                  | No       |
| coach   | string | _Example:_ `"00000000-0000-4000-A000-000000000000"`                    | No       |
| captain | string | _Example:_ `"00000000-0000-4000-A000-000000000000"`                    | No       |
| status  | string | _Enum:_ `"active"`, `"inactive"`, `"unknown"`<br>_Example:_ `"active"` | No       |

#### PatchStatusDto

| Name   | Type   | Description                                                            | Required |
| ------ | ------ | ---------------------------------------------------------------------- | -------- |
| status | string | _Enum:_ `"active"`, `"inactive"`, `"unknown"`<br>_Example:_ `"active"` | Yes      |

#### CreateMatchDto

| Name       | Type     | Description                                                                                                                                                                                                                                                                     | Required |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| home       | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                                                                                                                                                                                             | Yes      |
| team       | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                                                                                                                                                                                             | Yes      |
| location   | string   | _Enum:_ `"Argentina"`, `"Brazil"`, `"Canada"`, `"Chile"`, `"England"`, `"France"`, `"Germany"`, `"Italy"`, `"Japan"`, `"South_Korea"`, `"Mexico"`, `"Qatar"`, `"Russia"`, `"South_Africa"`, `"Spain"`, `"Sweden"`, `"Switzerland"`, `"United_States"`, `"Uruguay"`, `"unknown"` | Yes      |
| referee    | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                                                                                                                                                                                             | Yes      |
| home-score | number   |                                                                                                                                                                                                                                                                                 | Yes      |
| away-score | number   |                                                                                                                                                                                                                                                                                 | Yes      |
| played     | dateTime |                                                                                                                                                                                                                                                                                 | Yes      |

#### PatchMatchDto

| Name       | Type     | Description                                                                                                                                                                                                                                                                     | Required |
| ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| home       | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                                                                                                                                                                                             | No       |
| team       | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                                                                                                                                                                                             | No       |
| location   | string   | _Enum:_ `"Argentina"`, `"Brazil"`, `"Canada"`, `"Chile"`, `"England"`, `"France"`, `"Germany"`, `"Italy"`, `"Japan"`, `"South_Korea"`, `"Mexico"`, `"Qatar"`, `"Russia"`, `"South_Africa"`, `"Spain"`, `"Sweden"`, `"Switzerland"`, `"United_States"`, `"Uruguay"`, `"unknown"` | No       |
| referee    | string   | _Example:_ `"00000000-0000-4000-A000-000000000000"`                                                                                                                                                                                                                             | No       |
| home-score | number   |                                                                                                                                                                                                                                                                                 | No       |
| away-score | number   |                                                                                                                                                                                                                                                                                 | No       |
| played     | dateTime |                                                                                                                                                                                                                                                                                 | No       |

#### Staff

| Name      | Type     | Description                                                               | Required |
| --------- | -------- | ------------------------------------------------------------------------- | -------- |
| wage      | number   | _Example:_ `"12.50"`                                                      | No       |
| hire_date | dateTime |                                                                           | No       |
| id        | string   |                                                                           | Yes      |
| name      | string   |                                                                           | Yes      |
| last_name | string   |                                                                           | Yes      |
| phone     | number   |                                                                           | No       |
| email     | string   |                                                                           | No       |
| dob       | dateTime |                                                                           | Yes      |
| role      | string   |                                                                           | Yes      |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"` | Yes      |

#### CreateStaffDto

| Name      | Type     | Description                                                                                         | Required |
| --------- | -------- | --------------------------------------------------------------------------------------------------- | -------- |
| name      | string   | _Example:_ `"Douglass"`                                                                             | Yes      |
| last_name | string   | _Example:_ `"Mc Murray"`                                                                            | Yes      |
| phone     | number   | _Example:_ `5759939983`                                                                             | No       |
| email     | string   | _Example:_ `"d.mcmurray@test.com"`                                                                  | No       |
| dob       | dateTime | _Example:_ `"2000-11-24"`                                                                           | Yes      |
| role      | string   | _Example:_ `"player"`                                                                               | Yes      |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"`<br>_Example:_ `"injured"` | No       |
| wage      | number   |                                                                                                     | Yes      |
| hire_date | dateTime |                                                                                                     | No       |

#### UpdateStaffDto

| Name      | Type     | Description                                                                                         | Required |
| --------- | -------- | --------------------------------------------------------------------------------------------------- | -------- |
| name      | string   | _Example:_ `"Douglass"`                                                                             | No       |
| last_name | string   | _Example:_ `"Mc Murray"`                                                                            | No       |
| phone     | number   | _Example:_ `5759939983`                                                                             | No       |
| email     | string   | _Example:_ `"d.mcmurray@test.com"`                                                                  | No       |
| dob       | dateTime | _Example:_ `"2000-11-24"`                                                                           | No       |
| role      | string   | _Example:_ `"player"`                                                                               | No       |
| status    | string   | _Enum:_ `"injured"`, `"active"`, `"inactive"`, `"suspended"`, `"unknown"`<br>_Example:_ `"injured"` | No       |
| wage      | number   |                                                                                                     | No       |
| hire_date | dateTime |                                                                                                     | No       |

#### Audit

| Name        | Type     | Description                                                    | Required |
| ----------- | -------- | -------------------------------------------------------------- | -------- |
| id          | string   |                                                                | Yes      |
| entity      | string   | _Enum:_ `"match"`, `"member"`, `"person"`, `"team"`, `"staff"` | Yes      |
| action      | string   | _Enum:_ `"add"`, `"update"`, `"delete"`                        | Yes      |
| modified_at | dateTime |                                                                | Yes      |
| new_value   | object   |                                                                | Yes      |
