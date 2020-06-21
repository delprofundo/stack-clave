const core = require( "@aws-cdk/core" );
const { Queue, QueueEncryption } = require( "@aws-cdk/aws-sqs" )
const { StringParameter } = require( "@aws-cdk/aws-ssm" )

class QueueStack extends core.Stack {
  constructor( scope, id, kmsKey, props ) {
    super( scope, id, props  );

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    this.serviceQueue = new Queue( this, 'service-queue', {
      encryption: QueueEncryption.KMS,
      encryptionMasterKey: kmsKey
    })
    new StringParameter( this, 'service-queue-url', {
      stringValue: this.serviceQueue.queueUrl,
      parameterName: `/${ prj_name }/queue/url`
    })
    new StringParameter( this, 'service-queue-arn', {
      stringValue: this.serviceQueue.queueArn,
      parameterName: `/${ prj_name }/queue/arn`
    })
  }
}

module.exports={ QueueStack }