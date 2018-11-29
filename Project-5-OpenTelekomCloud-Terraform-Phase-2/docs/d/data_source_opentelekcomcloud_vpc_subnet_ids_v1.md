---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: data_source_opentelekcomcloud_subnet_ids_v1"
sidebar_current: "docs-opentelekomcloud-data-source-subnet-ids-v1"
description: |-
  Get information on an OpenTelekomCloud VPC Subnet.
---

# opentelekomcloud_vpc_subnet_ids_v1

This interface is used to query subnets using search criteria and to display the subnets in a list.

## Example Usage

The following shows outputing all cidr blocks for every subnet id in a vpc.

 ```hcl
data "opentelekomcloud_subnet_ids_v1" "subnet_ids" {
  vpc_id = "${var.vpc_id}" 
}

data "opentelekomcloud_subnet_v1" "subnet" {
  count = "${length(data.opentelekomcloud_subnet_ids_v1.subnet_ids.ids)}"
  id    = "${data.opentelekomcloud_subnet_ids_v1.subnet_ids.ids[count.index]}"
 }

output "subnet_cidr_blocks" {
  value = "${data.opentelekomcloud_subnet_v1.subnet.*.cidr}"
}
 ```

## Argument Reference

The following arguments are supported:

- vpc_id - (Required) Specifies the VPC ID used as the query filter.

## Attributes Reference

The following attributes are exported:

- id - The ID of the subnet.

## Import

Subnets can be imported using the subnet id, e.g.
> $ terraform import opentelekomcloud_subnet.public_subnet subnet-9d4a7b6c