import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";

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
  }
}
