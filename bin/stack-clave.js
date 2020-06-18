#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { StackClaveStack } = require('../lib/stack-clave-stack');

const app = new cdk.App();
new StackClaveStack(app, 'StackClaveStack');
