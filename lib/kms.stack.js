const core = require( "@aws-cdk/core" );
const { Key } = require( "@aws-cdk/aws-kms" )
const { StringParameter } = require( "@aws-cdk/aws-ssm")

class KeyStack extends core.Stack {
  constructor( scope, id, props ) {
    super( scope, id, props  );

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    self.queueKey = new Key( this, 'queue-enc-key', {
      description: `${ prj_name }-key-queue`,
      enableKeyRotation: true
    })
    new StringParameter( this, 'queue-enc-key-param', {
      stringValue: this.queueKey.keyId,
      parameterName: `/${prj_name}/queue/key`
    })
  }
}

module.exports={ KeyStack }