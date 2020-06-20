const core = require("@aws-cdk/core")
const { PublicHostedZone, HostedZone, ARecord, RecordTarget } = require("@aws-cdk/aws-route53")
const targets = require("@aws-cdk/aws-route53-targets")
const { StringParameter } = require("@aws-cdk/aws-ssm")


class Dns_Stack extends core.Stack {
  constructor( scope, id, domain, props ) {
    super( scope, id, props );

    const prj_name = this.node.tryGetContext( 'project_name' )
    const env = this.node.tryGetContext( 'env' )

    const root_zone = new PublicHostedZone( this, `${prj_name}-root-zone`, {
      zoneName: domain,
      caaAmazon: true,
      comment: `${domain} root dns zone`
    })
    const api_record = new ARecord( this, `api-endpoint-record`, {
      zone: root_zone,
      recordName: `api.${ domain }`,
      ttl: core.Duration.seconds(60 ),
      target: RecordTarget.fromIpAddresses( '8.8.8.8', '9.9.9.9' )
    })

    // new ARecord(this, `app-endpoint-record`, {
    //   zone: root_zone,
    //   recordName: `app.${ domain }`,
    //   ttl: core.Duration.seconds( 60 ),
    //   target: RecordTarget.fromIpAddresses
    // })

    new StringParameter( this, 'api-endpoint-param', {
      parameterName: `/${prj_name}/zone/id`,
      stringValue: root_zone.hostedZoneId
    })

    new StringParameter( this, 'zone-name-param', {
      parameterName: `/${prj_name}/zone/name`,
      stringValue: root_zone.zoneName
    })
  }
}

module.exports = { Dns_Stack }