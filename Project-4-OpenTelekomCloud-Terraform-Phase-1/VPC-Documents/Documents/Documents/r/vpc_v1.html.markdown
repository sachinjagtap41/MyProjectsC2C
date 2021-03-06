---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: opentelekomcloud_vpc_v1"
sidebar_current: "docs-opentelekomcloud_vpc_v1"
description: |-
  Manages a V1 vpc resource within OpenTelekomCloud.
---

# opentelekomcloud_vpc_v1

Manages a V1 vpc resource within OpenTelekomCloud.

## Example Usage

```hcl

variable "long_name" {
  default = "opentelekomcloud"
}

variable "vpc_cidr" {
  default = "10.1.0.0/21"
}

resource "opentelekomcloud_vpc_v1" "vpc_v1" {
  name = "${var.long_name}"
  cidr_block = "${var.vpc_cidr}"
}

```

## Argument Reference

The following arguments are supported:

* `region` - (Optional) The region in which to obtain the V2 Neutron client. A Neutron client is needed to retrieve vpc details from the region. If omitted, the region argument of the provider is used.

* `name` - (Optional) The name of the VPC. The name must be unique for a tenant. The value is a string of no more than 64 characters and can contain digits, letters, underscores (_), and hyphens (-).

* `cidr` - (Optional) The range of available subnets in the VPC. The value must be in CIDR format, for example, 192.168.0.0/16. The value ranges from 10.0.0.0/8 to 10.255.255.0/24, 172.16.0.0/12 to 172.31.255.0/24, or 192.168.0.0/16 to 192.168.255.0/24.

* `status` - (Optional) The status of the VPC. The value can be CREATING, OK, DOWN, PENDING_UPDATE, PENDING_DELETE, or ERROR.


  ## Attributes Reference

The following attributes are exported:

* `id` - The resource ID in UUID format.

* `vpc_id` - See Argument Reference above.

* `region` - See Argument Reference above.

* `name` -  See Argument Reference above.

* `cidr` - See Argument Reference above.

* `routes` - The route information.

* `destination` - The destination network segment of a route. The value must be in the CIDR format. Currently, only the value 0.0.0.0/0 is supported.

* `nexthop` - The next hop of a route. The value must be an IP address and must belong to the subnet in the VPC. Otherwise, this value does not take effect.

* `status` - See Argument Reference above.
