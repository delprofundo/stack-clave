const core = require("@aws-cdk/core")
const route53 = require("@aws-cdk/aws-route53")
const targets = require("@aws-cdk/aws-route53-targets")


class Dns_Stack extends core.Stack {
  constructor(scope, id, domain, props) {
    super(scope, id, props);


    const root_zone = route53.HostedZone.fromLookup(this, 'root-zone', {
      domainName: domain
    })

    const clave_record = new route53.ARecord(this, 'clave-record', {
      zone: root_zone,
      target: route53.RecordTarget.fromIpAddresses('8.8.8.8', '9.9.9.9')
    });

  }
}

module.exports = { Dns_Stack }