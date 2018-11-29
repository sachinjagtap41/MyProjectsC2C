---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: opentelekomcloud_vpc_v1"
sidebar_current: "docs-opentelekomcloud_vpc_v1"
description: |-
  Query detailed information of an OpenTelekomcloud VPC.
---

# opentelekomcloud_vpc_v1

Use this data source to get the details of OpenTelekomCloud VPC.

## Example Usage

```hcl
variable "vpc_id" {}

data "opentelekomcloud_vpc_v1" "vpc_v1" {
  id = "${var.vpc_id}"
}

```

## Argument Reference

* `vpc_id` - (Required) The VPC ID, which uniquely identifies the VPC.

* `status` - (Optional) The status of the VPC. The value can be CREATING, OK, DOWN, PENDING_UPDATE, PENDING_DELETE, or ERROR.

* `region` - (Optional) The region in which to obtain the V2 Neutron client. A Neutron client is needed to retrieve vpc details from the region. If omitted, the region argument of the provider is used.

* `name` - (Optional) The name of the VPC. The name must be unique for a tenant. The value is a string of no more than 64 characters and can contain digits, letters, underscores (_), and hyphens (-).

* `marker` - (Optional) The resource ID of the pagination query. If the parameter is left empty, only resources on the first page are queried.

* `limit` - (Optional) The number of records returned on each page. The value ranges from 0 to intmax.

## Attributes Reference

The following attributes are exported:

* `id` - The resource ID in UUID format.

* `vpc_id` - See Argument Reference above.

* `region` - See Argument Reference above.

* `name` -  See Argument Reference above.

* `status` - See Argument Reference above.

* `cidr` - See Argument Reference above.

* `routes` - The route information.

* `destination` - The destination network segment of a route. The value must be in the CIDR format. Currently, only the value 0.0.0.0/0 is supported.

* `nexthop` - The next hop of a route. The value must be an IP address and must belong to the subnet in the VPC. Otherwise, this value does not take effect.

* `marker` - The resource ID of the pagination query. If the parameter is left empty, only resources on the first page are queried.

* `limit` - The number of records returned on each page. The value ranges from 0 to intmax.

