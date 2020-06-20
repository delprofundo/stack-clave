const core = require("@aws-cdk/core")
// const cm = require("@aws-cdk/aws-certificatemanager")



class CertificateStack extends core.Stack {
  constructor( scope, id, props ){
    super(scope, id, props);
    //
    // const cert = new cm.DnsValidatedCertificate(
    //   this, 'clave-cert', {
    //     domainName: "api.clave.groklobster.io",
    //     hostedZone
    //   }
    // )

  }
}

module.exports = { CertificateStack }