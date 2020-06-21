const core = require("@aws-cdk/core")
const { StringParameter } = require("@aws-cdk/aws-ssm")
const db = require("@aws-cdk/aws-dynamodb")


class CollectionStack extends core.Stack {
  constructor( scope, id, kmsKey, props ){
    super(scope, id, props);

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    const serviceCollection = new db.Table( this, 'service-collection', {
      partitionKey: { name: 'partitionKey', type: db.AttributeType.STRING },
      sortKey: { name: 'sortKey', type: db.AttributeType.STRING },
      encryption: db.TableEncryption.CUSTOMER_MANAGED,
      encryptionKey: kmsKey,
      billingMode: db.BillingMode.PAY_PER_REQUEST,
      // stream: db.StreamViewType.NEW_AND_OLD_IMAGES,
      timeToLiveAttribute: 'recordExpiry'
    })

    

  }
}

module.exports = { CollectionStack }