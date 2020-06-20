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
      this, 'zone-id-param',
      `/${prj_name}/zone/id`
    )

    const zoneName = StringParameter.fromStringParameterName(
      this, 'zone-name-param',
      `/${prj_name}/zone/name`
    )

    const dnsZone = r53.HostedZone.fromHostedZoneAttributes( this, `cert_dns_zone`, {
      hostedZoneId: zoneId.stringValue,
      zoneName: zoneName.stringValue
    });

    this.certficate = new cm.DnsValidatedCertificate( this, `${prj_name}-cert-manager`, {
      hostedZone: dnsZone,
      domainName: `*.${ appDomain }`
    })
  }
}

module.exports = { CertificateStack }