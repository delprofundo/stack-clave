#!/usr/bin/env node
const cdk = require('@aws-cdk/core');

const { Dns_Stack } = require( '../lib/dns_stack' )
const { CertificateStack } = require( '../lib/cert-stack' )
const { BlobStack } = require( '../lib/s3.stack' )
const { QueueStack } = require( '../lib/queue.stack' )


const app = new cdk.App();

const STACK_DOMAIN = 'bave.groklobster.io'

const dns_stack = new Dns_Stack( app, 'dns-stack', STACK_DOMAIN, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
const blob_stack = new BlobStack( app, 'blob-stack', )
const queue_stack = new QueueStack( app, 'queue-stack' )
// const cert_stack = new CertificateStack( app, 'cert-stack', STACK_DOMAIN )