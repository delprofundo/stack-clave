const core = require("@aws-cdk/core")
const cm = require("@aws-cdk/aws-certificatemanager")
const r53 = require("@aws-cdk/aws-route53")

class CertificateStack extends core.Stack {
  constructor( scope, id, props ){
    super(scope, id, props);

    const hostedZone = r53.HostedZone.fromLookup(
      this, 'hosted-zone', {
        domainName: 'clave.groklobster.io',
        privateZone: false
      }
    )

    const cert = new cm.DnsValidatedCertificate(
      this, 'clave-cert', {
        domainName: "api.clave.groklobster.io",
        hostedZone
      }
    )

  }
}

module.exports = { CertificateStack }