const core = require( "@aws-cdk/core" );
const { Queue, QueueEncryption } = require( "@aws-cdk/aws-sqs" )

class QueueStack extends core.Stack {
  constructor( scope, id, props ) {
    super( scope, id, props  );

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    const serviceQueue = new Queue( this, 'service-queue', {
      encryption: QueueEncryption.KMS,
      encryptionMasterKey:
    })


  }
}

module.exports={ QueueStack }