---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: data_source_opentelekcomcloud_vpc_route_ids_v1"
sidebar_current: "docs-opentelekomcloud-data-source-vpc-route-ids-v1"
description: |-
  Get information on an OpenTelekomCloud VPC Route IDs.
---

# opentelekomcloud_vpc_route_ids_v1

This interface is used to query routes and display the routes in a list.

## Example Usage

 ```hcl
data "opentelekomcloud_vpc_route_ids_v2" "vpc_route" {
  vpc_id = "${var.vpc_id}"
}

output "vpc_data" {
  value = "${data.opentelekomcloud_vpc_route_ids_v2.vpc_route.id}"
}
 ```

## Argument Reference

The arguments of this data source act as filters for querying the available VPC peering connection. The given filters must match exactly one VPC peering connection whose data will be exported as attributes.

- vpc_id - (Required) The id of the vpc route.

## Attributes Reference

- id - The route ID.

