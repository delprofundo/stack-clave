#!/usr/bin/env node
const cdk = require('@aws-cdk/core');

const { Dns_Stack } = require( '../lib/dns_stack' )
// const { CertificateStack } = require( '../lib/cert-stack' )

const app = new cdk.App();

const STACK_DOMAIN = 'clave.groklobster.io'

const dns_stack = new Dns_Stack(app, 'certificate-stack', STACK_DOMAIN, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})