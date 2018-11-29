---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: resource_opentelekomcloud_vpc_route_v2"
sidebar_current: "docs-opentelekomcloud-resource-vpc-route-v2"
description: |-
  Get information on an OpenTelekomCloud VPC Route.
---

# opentelekomcloud_vpc_route_v2

Provides a resource to create a routing table entry (a route) in a VPC routing table.

## Example Usage

 ```hcl
resource "opentelekomcloud_vpc_route_v2" "vpc_route" {
  type  = "peering"
  nexthop  = "${var.nexthop}"
  destination = "192.168.0.0/16"
  vpc_id = "${var.vpc_id}"
 }
```
## Argument Reference

The following arguments are supported:

- destination - (Required) Specifies the destination IP address or CIDR block.

- nexthop - (Required)  Specifies the next hop. If the route type is peering, enter the VPC peering connection ID.

- type - (Required) Specifies the route type.

- vpc_id - (Required) Specifies the VPC for which a route is to be added.

- tenant_id - (Optional) Specifies the tenant ID. Only the administrator can specify the tenant ID of other tenant

## Attributes Reference

The following attributes are exported:

> **NOTE:** Only the target type that is specified (one of the above) will be exported as an attribute once the resource is created.

- id - The route ID.

- destination - The destination IP address or CIDR block.

- nexthop - The next hop. If the route type is peering, enter the VPC peering connection ID.

- type - The the route type.

- vpc_id - The VPC where route is added.

- tenant_id - The tenant ID.

