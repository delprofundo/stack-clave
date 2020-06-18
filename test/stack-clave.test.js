const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const StackClave = require('../lib/stack-clave-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new StackClave.StackClaveStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
