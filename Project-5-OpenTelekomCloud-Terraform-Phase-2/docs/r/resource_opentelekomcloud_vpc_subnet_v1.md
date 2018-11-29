---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: resource_opentelekomcloud_vpc_subnet_v1"
sidebar_current: "docs-opentelekomcloud-resource-vpc-subnet-v1"
description: |-
  Get information on an OpenTelekomCloud VPC Subnet.
---

# opentelekomcloud_vpc_subnet_v1

Provides VPC subnet resource.

# Example Usage

 ```hcl
resource "opentelekomcloud_vpc_v1" "vpc_v1" {
  name = "${var.vpc_name}"
  cidr = "${var.vpc_cidr}"
}


resource "opentelekomcloud_subnet_v1" "subnet_v1" {
  name = "${var.subnet_name}"
  cidr = "${var.subnet_cidr}"
  gateway_ip = "${var.subnet_gateway_ip}"
  vpc_id = "${opentelekomcloud_vpc_v1.vpc_v1.id}"
}
 ```

# Argument Reference

The following arguments are supported:

- name (Required) - Specifies the subnet name. The value is a string of 1 to 64 characters that can contain letters, digits, underscores (_), and hyphens (-).

- cidr (Required) - Specifies the network segment on which the subnet resides. The value must be in CIDR format. The value must be within the CIDR block of the VPC. The subnet mask cannot be greater than 28.

- gateway_ip (Required) - Specifies the gateway of the subnet. The value must be a valid IP address. The value must be an IP address in the subnet segment.

- vpc_id (Required) - Specifies the ID of the VPC to which the subnet belongs.

- dhcp_enable (Optional) - Specifies whether the DHCP function is enabled for the subnet. The value can be true or false. If this parameter is left blank, it is set to true by default.

- primary_dns (Optional) - Specifies the IP address of DNS server 1 on the subnet. The value must be a valid IP address.

- secondary_dns (Optional) - Specifies the IP address of DNS server 2 on the subnet. The value must be a valid IP address.

- dnsList (Optional) - Specifies the DNS server address list of a subnet. This field is required if you need to use more than two DNS servers. This parameter value is the superset of both DNS server address 1 and DNS server address 2.

- availability_zone (Optional) - Identifies the availability zone (AZ) to which the subnet belongs. The value must be an existing AZ in the system.


# Attributes Reference

The following attributes are exported:

- id - The ID of the subnet.

- availability_zone- The AZ for the subnet.

- cidr_block - The CIDR block for the subnet.

- vpc_id - The VPC ID.

- name - The name of the subnet.

- dnsList - The IP address list of DNS servers on the subnet.
 
- status - The value can be ACTIVE, DOWN, UNKNOWN, or ERROR.

- gateway_ip -  The subnet gateway address.

- dhcp_enable - Specifies whether the DHCP function is enabled for the subnet.
 
- primary_dns - The IP address of DNS server 1 on the subnet.
 
- secondary_dns - The IP address of DNS server 2 on the subnet.

# Import

Subnets can be imported using the subnet id, e.g.

> $ terraform import opentelekomcloud_subnet_v1 subnet-9d4a7b6caaa111