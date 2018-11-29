---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: resource_opentelekomcloud_vpc_peering_connection_v2"
sidebar_current: "docs-opentelekomcloud-resource-vpc-peering-connection-v2"
description: |-
  Get information on an OpenTelekomCloud VPC Peering Connection.
---

# opentelekomcloud_vpc_peering_connection_v2

Provides a resource to manage a VPC Peering Connection resource.

> Note: For cross-account (requester's account differs from the accepter's account) or inter-region VPC Peering Connections use the opentelekom_vpc_peering_connection_v2 resource to manage the requester's side of the connection and use the opentelekomcloud_vpc_peering_connection_accepter_v2 resource to manage the accepter's side of the connection.

## Example Usage

 ```hcl
resource "opentelekomcloud_vpc_peering_connection_v2" "peering" {
  name = "${var.vpc_name}"
  vpc_id = "${var.vpc_id}"
  peer_vpc_id = "${var.accpet_vpc_id}"
}
 ```

## Argument Reference

The following arguments are supported:

- name - (Required) Specifies the name of the VPC peering connection. The value can contain 1 to 64 characters.

- vpc_id - (Required) Specifies the ID of a VPC involved in a VPC peering connection.

- peer_vpc_id - (Required) Specifies the VPC ID of the accepte tenant.

- peer_tenant_id - (Optionl) Specified the Tenant Id of the accepter tenant. 
  
## Attributes Reference

The following attributes are exported:

- id - The VPC peering connection ID.

- name - The name of the VPC peering connection. The value can contain 1 to 64 characters.

- vpc_id - The ID of a VPC involved in a VPC peering connection.

- peer_vpc_id -  The VPC ID of the accepte tenant.

- peer_tenant_id - The Tenant Id of the accepter tenant. 

- status - The VPC peering connection status. The value can be PENDING_ACCEPTANCE, REJECTED, EXPIRED, DELETED, or ACTIVE.

## Import

VPC Peering resources can be imported using the vpc peering id, e.g.

> $ terraform import opentelekomcloud_vpc_peering_connection.test_connection pcx-111aaa111