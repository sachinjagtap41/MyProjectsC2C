---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: data_source_opentelekomcloud_vpc_peering_connection_v2"
sidebar_current: "docs-opentelekomcloud-data-source-vpc-peering-connection-v2"
description: |-
  Get information on an OpenTelekomCloud VPC Peering Connection.
---

# opentelekomcloud_vpc_peering_connection_v2

The VPC Peering Connection data source provides details about a specific VPC peering connection.

## Example Usage

 ```hcl
data "opentelekomcloud_vpc_peering_connection_v2" "peering" {
 id = "${var.id}"
}
resource "opentelekomcloud_vpc_route_v2" "vpc_route" {
  type       = "peering"
  nexthop       = "${data.opentelekomcloud_vpc_peering_connection_v2.peering.id}"
  destination = "192.168.0.0/16"
  vpc_id = "${var.vpc_id}"
}
 ```

## Argument Reference

The arguments of this data source act as filters for querying the available VPC peering connection. The given filters must match exactly one VPC peering connection whose data will be exported as attributes.

- id - (Optional) The ID of the specific VPC Peering Connection to retrieve.

- status - (Optional) The status of the specific VPC Peering Connection to retrieve.

- vpc_id - (Optional) The ID of the requester VPC of the specific VPC Peering Connection to retrieve.

- peer_vpc_id -  Specifies the VPC ID of the accepte tenant.

- peer_tenant_id - Specified the Tenant Id of the accepter tenant. 

- name - (Optional) The name of the field to filter by, as defined by the underlying AWS API.

## Attributes Reference

All of the argument attributes except filter are also exported as result attributes.

- id - The VPC peering connection ID.

- name - The name of the VPC peering connection. The value can contain 1 to 64 characters.

- vpc_id - The ID of a VPC involved in a VPC peering connection.

- peer_vpc_id -  The VPC ID of the accepte tenant.

- peer_tenant_id - The Tenant Id of the accepter tenant. 

- status - The VPC peering connection status. The value can be PENDING_ACCEPTANCE, REJECTED, EXPIRED, DELETED, or ACTIVE.