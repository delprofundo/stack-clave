const cdk = require('@aws-cdk/core');

class StackClaveStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);
    console.log("hai there")
    // The code that defines your stack goes here
  }
}

module.exports = { StackClaveStack }
