# tweakchallenge
An API to enable system users to securely upload images provided that they are authenticated.

# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `v12.22.0`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This projetct contains some lambda functions triggered by HTTP requests made on the provisioned API Gateway REST API following routes: 

- `/notes` - `POST` -> Creates a note for the authenticated user. If you want to attach a image file (JPG, JPEG or PNG) to the note the file must be on body as a form-data item with key 'image'.
- `/notes` - `GET` -> Gets all notes from the authenticated user.
- `/notes/{id}` - `GET` -> Gets a note with the specified id from the authenticated user.
- `/notes/{id}` - `PUT` -> Updates an existing note from the authenticated user with the specified id. If you want to attach or modify an already attached image file (JPG, JPEG or PNG) to the note the file must be on body as a form-data item with key 'image'.
- `/notes/{id}` - `DELETE` -> Deletes an existing note from the authenticated user with the specified id.

> - requesting any other path than the listed above with any other method than the listed above will result in API Gateway returning a `404` with a list of valid routes.
> - trying to create or update a note with a file that is not an image will create the note without any attachment.
> - trying to update a note without or with a body and without a file won't update anything on note.

### Locally

> **Requirements**: Serverless Offline. If you're using npm, run `npm --save-dev install serverless-offline` to ensure you have the hability to run the following command:

In order to test the functions locally, run the following command:
```
serverless invoke local --function {FUNCTIONNAME}  --path src/functions/mock.json
```
*Replacing {FUNCTIONNAME} with the function you're trying to test and updating the mock.json data with the parameters you want to test.

### Remotely

> **Requirements**: aws-api-gateway-cli-test. If you're using npm, run `npm install --save-dev aws-api-gateway-cli` to ensure you have the hability to run the following command:

```
npx aws-api-gateway-cli-test --username {USERNAME}  --password {PASSWORD}! --user-pool-id {USERPOOL} --app-client-id {APPCLIENTID} --cognito-region {COGNITOREGION} --identity-pool-id {IDENTITYPOOL} --invoke-url {INVOKEURL} --api-gateway-region {APIREGION} --path-template {APIPATH} --method {APIMETHOD} --body '{BODYOBJECT}'
```

## Template features

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [busboy](https://www.npmjs.com/package/busboy) - used to parse API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object.
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`
