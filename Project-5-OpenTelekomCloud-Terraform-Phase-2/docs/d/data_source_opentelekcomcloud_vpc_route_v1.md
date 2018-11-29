---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: data_source_opentelekcomcloud_vpc_route_v1"
sidebar_current: "docs-opentelekomcloud-data-source-vpc-route-v1"
description: |-
  Get information on an OpenTelekomCloud VPC Route.
---

# opentelekomcloud_vpc_route_v1

This interface is used to query details about a route.

## Example Usage

 ```hcl
data "opentelekomcloud_vpc_route_v2" "vpc_route" {
  id = "${var.route_id}"
}

output "vpc_data" {
  value = "${data.opentelekomcloud_vpc_route_v2.vpc_route.destination}"
}
 ```

## Argument Reference

The following arguments are supported:

- id - (Required) The id whose details need to be query.

## Attribute Reference

- id - The route ID.
 
- tenant_id - The tenant ID. Only the administrator can specify the tenant ID of other tenants.

- vpc_id - The VPC for which a route is to be added.

- destination - The destination IP address or CIDR block.

- nexthop - The next hop. If the route type is peering.

- type - The route type.

