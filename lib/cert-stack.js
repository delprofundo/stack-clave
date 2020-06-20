const core = require("@aws-cdk/core")
// const cm = require("@aws-cdk/aws-certificatemanager")

const route53 = require("@aws-cdk/aws-route53")
// import * as route53 from '@aws-cdk/aws-route53';
// import * as targets from '@aws-cdk/aws-route53-targets';

class CertificateStack extends core.Stack {
  constructor( scope, id, props ){
    super(scope, id, props);

    // const hostedZone = r53.HostedZone.fromLookup(
    //   this, 'hosted-zone', {
    //     domainName: 'clave.groklobster.io'
    //   },
    // );


    const rootZone = route53.HostedZone.fromLookup(this, 'rootzone', {
      domainName: 'groklobster.io'
    })

    const clave_record = new route53.ARecord( this, 'clave-record', {
      zone: rootZone,
      target: route53.RecordTarget.fromIpAddresses('8.8.8.8', '9.9.9.9')
    });




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