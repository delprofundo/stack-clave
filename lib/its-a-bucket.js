const core = require("@aws-cdk/core")
const s3 = require("@aws-cdk/aws-s3")

class ItsABucketStack extends core.Stack {
  constructor( scope, id, props ){
    super(scope, id, props);

    new s3.Bucket(
      this, "its-a-bucket", {
        versioned: true
      }
    )
  }
}

module.exports = { ItsABucketStack }