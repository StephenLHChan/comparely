import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaRole = new iam.Role(this, "lambdaRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );
    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaVPCAccessExecutionRole"
      )
    );

    const lambdaPrefix = "comparely";

    const healthCheckLambda = new lambda.Function(this, "HealthCheckLambda", {
      functionName: `${lambdaPrefix}-healthCheck`,
      role: lambdaRole,
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset("../app/src/handlers"),
      handler: "build/healthCheck.handler",
    });

    const api = new apigateway.HttpApi(this, "HttpApi", {
      apiName: "comparely",
    });

    api.addRoutes({
      path: "/health",
      methods: [apigateway.HttpMethod.GET],
      integration: new integrations.HttpLambdaIntegration(
        "HealthCheckIntegration",
        healthCheckLambda
      ),
    });

    const authTable = new dynamodb.TableV2(this, `AuthTable`, {
      tableName: "comparely-auth",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      timeToLiveAttribute: "expires",
      deletionProtection: true,
    });

    authTable.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "GSI1PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "GSI1SK", type: dynamodb.AttributeType.STRING },
    });

    const productTable = new dynamodb.TableV2(this, `ProductTable`, {
      tableName: "comparely-product",
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "sk", type: dynamodb.AttributeType.STRING },
      deletionProtection: true,
    });

    const dbTableUser = new iam.User(this, "User", {
      userName: "comparely",
    });

    dbTableUser.addToPolicy(
      new iam.PolicyStatement({
        actions: [
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:Describe*",
          "dynamodb:List*",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:UpdateItem",
        ],
        resources: [
          authTable.tableArn,
          `${authTable.tableArn}/index/GSI1`,
          productTable.tableArn,
        ],
      })
    );
  }
}
