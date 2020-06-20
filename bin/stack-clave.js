#!/usr/bin/env node
const cdk = require('@aws-cdk/core');

const { Dns_Stack } = require( '../lib/dns_stack' )
const { CertificateStack } = require( '../lib/cert-stack' )

const app = new cdk.App();

const STACK_DOMAIN = 'bave.groklobster.io'

const dns_stack = new Dns_Stack( app, 'dns-stack', STACK_DOMAIN, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
const cert_stack = new CertificateStack( app, 'cert-stack', STACK_DOMAIN )