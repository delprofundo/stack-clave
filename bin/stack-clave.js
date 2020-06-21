#!/usr/bin/env node
const cdk = require('@aws-cdk/core');

const { KeyStack } = require( '../lib/kms.stack')
const { Dns_Stack } = require( '../lib/dns_stack' )
const { CertificateStack } = require( '../lib/cert-stack' )
const { BlobStack } = require( '../lib/s3.stack' )
const { QueueStack } = require( '../lib/queue.stack' )
const { CollectionStack } = require( '../lib/collection.stack')


const app = new cdk.App();

const STACK_DOMAIN = 'bave.groklobster.io'

const dns_stack = new Dns_Stack( app, 'dns-stack', STACK_DOMAIN, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})
const key_stack = new KeyStack( app, 'key-stack' )
const blob_stack = new BlobStack( app, 'blob-stack' )
const queue_stack = new QueueStack( app, 'queue-stack', {
  kmsKey: key_stack.queueKey
})
const collectionStack = new CollectionStack( app, 'collection-stack', {
  kmsKey: key_stack.collectionKey
})
// const cert_stack = new CertificateStack( app, 'cert-stack', STACK_DOMAIN )