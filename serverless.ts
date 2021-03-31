import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'tweakchallenge',
  package: {
    individually: true
  },
  custom: {
    'serverless-offline': {
      httpPort: 3003
    },
    stages: [
      'dev'
    ],
    bucket: 'tweakchallenge-upload-dev',
  },
  plugins: [
    'serverless-webpack',
    'serverless-iam-roles-per-function',
    'serverless-offline'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: 'dev',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      binaryMediaTypes: ['*/*']
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      TABLE_NAME: 'tweakchallenge-dev',
      BUCKET_NAME: '${self:custom.bucket}',
      MAX_SIZE: '4000000', // 4MB
      region: '${provider.region}'
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:*'
        ],
        Resource: 'arn:aws:dynamodb:${self:provider.region}:*:*'
      }
    ],
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: {
    create: {
      handler: 'src/functions/create/create.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'notes',
            cors: true,
            authorizer: 'aws_iam'
          }
        }
      ]
    },
    getAll: {
      handler: 'src/functions/getAll/getAll.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'notes',
            cors: true,
            authorizer: 'aws_iam'
          }
        }
      ]
    },
    get: {
      handler: 'src/functions/get/get.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'notes/{id}',
            cors: true,
            authorizer: 'aws_iam'
          }
        }
      ]
    },
    update: {
      handler: 'src/functions/update/update.handler',
      events: [
        {
          http: {
            method: 'put',
            path: 'notes/{id}',
            cors: true,
            authorizer: 'aws_iam'
          }
        }
      ]
    },
    delete: {
      handler: 'src/functions/delete/delete.handler',
      events: [
        {
          http: {
            method: 'delete',
            path: 'notes/{id}',
            cors: true,
            authorizer: 'aws_iam'
          }
        }
      ]
    },
    upload: {
      handler: 'src/functions/upload/upload.handler',
      events: [
        {
          http: {
            method: 'post',
            path: 'upload',
            cors: true,
            authorizer: 'aws_iam'
          }
        }
      ]
    },
  },
  resources: {
    Resources: {
      TweakChallengeS3Bucket:{
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: '${self:provider.environment.BUCKET_NAME}'
        }
      },
      TweakChallengeDynamoDBTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:provider.environment.TABLE_NAME}',
          AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'S'
          }],            
          KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH'
          }],
          ProvisionedThroughput:{  
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
