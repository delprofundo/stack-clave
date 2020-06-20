const core = require("@aws-cdk/core")
const { StringParameter } = require("@aws-cdk/aws-ssm")
const r53 = require("@aws-cdk/aws-route53")
const cm = require("@aws-cdk/aws-certificatemanager")



class CertificateStack extends core.Stack {
  constructor( scope, id, appDomain, props ){
    super(scope, id, props);

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )


    const zoneId = StringParameter.fromStringParameterName(
      self, 'zone-id-param',
      `/${prj_name}/api/record`
    )

    const dnsZone = r53.HostedZone.fromHostedZoneId( this, `cert_dns_zone`, zoneId.stringValue );

    this.certManager = new cm.DnsValidatedCertificate( this, `${prj_name}-cert-manager`, {
      hostedZone: dnsZone,
      domainName: `*.${ appDomain }`,
      subjectAlternativeNames: `*.${ appDomain }`
    })


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