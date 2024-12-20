#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();

const stackPrefix = "comparely";

const stack = new BackendStack(app, `${stackPrefix}-backendStack`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "ca-central-1",
  },
});

cdk.Aspects.of(stack).add(new cdk.Tag("ProjectName", "comparely"));
