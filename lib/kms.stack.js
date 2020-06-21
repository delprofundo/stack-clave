const core = require( "@aws-cdk/core" );
const { Key } = require( "@aws-cdk/aws-kms" )
const { StringParameter } = require( "@aws-cdk/aws-ssm")

class KeyStack extends core.Stack {
  constructor( scope, id, props ) {
    super( scope, id, props  );

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    this.queueKey = new Key( this, 'queue-enc-key', {
      description: `${ prj_name }-key-queue`,
      enableKeyRotation: true
    })
    new StringParameter( this, 'queue-enc-key-param', {
      stringValue: this.queueKey.keyId,
      parameterName: `/${prj_name}/queue/key`
    })
    this.collectionKey = new Key( this, 'collection-enc-key', {
      description: `${ prj_name }-key-collection`,
      enableKeyRotation: true
    })
    new StringParameter( this, 'collectoin-enc-key-param', {
      stringValue: this.collectionKey.keyId,
      parameterName: `/${ prj_name }/collection/key`
    })
  }
}

module.exports={ KeyStack }