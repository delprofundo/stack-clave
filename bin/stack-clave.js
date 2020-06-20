#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { StackClaveStack } = require('../lib/stack-clave-stack');
const { ItsABucketStack } = require('../lib/its-a-bucket')
const { CertificateStack } = require('../lib/cert-stack')

const app = new cdk.App();
// new StackClaveStack(app, 'StackClaveStack');
// new ItsABucketStack(app, 'BucketStack')
new CertificateStack(app, 'certificate-stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})