---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: data_source_opentelekomcloud_vpc_subnet_v1"
sidebar_current: "docs-opentelekomcloud-data-source-vpc-subnet-v1"
description: |-
  Get information on an OpenTelekomCloud VPC Subnet.
---

# opentelekomcloud_vpc_subnet_v1

This interface is used to query details about a subnet.

## Example Usage

```hcl
data "opentelekomcloud_subnet_v1" "by_id" {
  vp_id   = "${var.vpc_id}"
 }
output "subnet_cidr" {
  value = "${data.opentelekomcloud_subnet_v1.by_id.cidr}"
}
```

## Argument Reference

The arguments of this data source act as filters for querying the available subnets in the current region. The given filters must match exactly one subnet whose data will be exported as attributes.

- id - (Required) - Specifies the subnet ID, which uniquely identifies the subnet.

- name (Required) - Specifies the subnet name. The value is a string of 1 to 64 characters that can contain letters, digits, underscores (_), and hyphens (-).

- cidr (Required) - Specifies the network segment on which the subnet resides. The value must be in CIDR format. The value must be within the CIDR block of the VPC. The subnet mask cannot be greater than 28.

- gateway_ip (Required) - Specifies the gateway of the subnet. The value must be a valid IP address. The value must be an IP address in the subnet segment.

- vpc_id (Required) - Specifies the ID of the VPC to which the subnet belongs.

- dhcp_enable (Optional) - Specifies whether the DHCP function is enabled for the subnet. The value can be true or false. If this parameter is left blank, it is set to true by default.

- primary_dns (Optional) - Specifies the IP address of DNS server 1 on the subnet. The value must be a valid IP address.

- secondary_dns (Optional) - Specifies the IP address of DNS server 2 on the subnet. The value must be a valid IP address.

- dnsList (Optional) - Specifies the DNS server address list of a subnet. This field is required if you need to use more than two DNS servers. This parameter value is the superset of both DNS server address 1 and DNS server address 2.

- availability_zone (Optional) - Identifies the availability zone (AZ) to which the subnet belongs. The value must be an existing AZ in the system.

## **Attributes Reference**

This data source will complete the data by populating any fields that are not included in the configuration with the data for the selected subnet.

- id - The ID of the subnet.

- availability_zone - The Availability Zone for the subnet.

- cidr_block - The CIDR block for the subnet.

- vpc_id - The VPC ID.

- name - The name of the subnet.

- dnsList - The IP address list of DNS servers on the subnet.
 
- status - The value can be ACTIVE, DOWN, UNKNOWN, or ERROR.

- gateway_ip -  The subnet gateway address.

- dhcp_enable - Specifies whether the DHCP function is enabled for the subnet.
 
- primary_dns - The IP address of DNS server 1 on the subnet.
 
- secondary_dns - The IP address of DNS server 2 on the subnet.
