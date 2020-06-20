const core = require( "@aws-cdk/core" )
const s3 = require( "@aws-cdk/aws-s3" )
const { StringParameter } = require("@aws-cdk/aws-ssm")


class BlobStack extends core.Stack {
  constructor( scope, id, props ) {
    super( scope, id, props );

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    const accountId = core.Aws.ACCOUNT_ID;

    const frontendBucket = new s3.Bucket( this, `${prj_name}-app-bucket`, {
      accessControl: s3.BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      bucket_name: `${accountId}-${env}-frontend`,
      blockPublicAccess: {
        blockPublicAccess: true,
        blockPublicPolicy: true,
        ignorePublicAcls: true,
        restrictPublicBuckets: true
      },
      removalPolicy: core.RemovalPolicy.DESTROY
    });

    new core.CfnOutput( this, 's3-frontend-export', {
      value: frontendBucket.bucketName,
      exportName: 'frontendBucket'
    })
  }
}

module.exports = { BlobStack }