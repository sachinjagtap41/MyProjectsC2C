---
layout: "opentelekomcloud"
page_title: "OpenTelekomCloud: resource_opentelekomcloud_vpc_peering_connection_accepter_v2"
sidebar_current: "docs-opentelekomcloud-resource-vpc-peering-connection-accepter-v2"
description: |-
  Get information on an OpenTelekomCloud VPC Peering Connection Accepter.
---

# opentelekomcloud_vpc_peering_connection_accepter_v2

Provides a resource to manage the accepter's side of a VPC Peering Connection.

## Example Usage

 ```hcl
 provider "opentelekomcloud"  {
  alias = "main"
  user_name   = "${var.username}"
  domain_name = "${var.domain_name}"
  password    = "${var.password}"
  auth_url    = "${var.auth_url}"
  region      = "${var.region}"
  tenant_id   = "${var.tenant_id}"
}

provider "opentelekomcloud"  {
  alias = "peer"
  user_name = "${var.peer_username}"
  domain_name = "${var.peer_domain_name}"
  password    = "${var.peer_password}"
  auth_url    = "${var.peer_auth_url}"
  region      = "${var.peer_region}"
  tenant_id   = "${var.peer_tenant_id}"
}

resource "opentelekomcloud_vpc_v1" "vpc_main" {
  provider = "opentelekomcloud.main"
  name = "${var.vpc_name}"
  cidr = "${var.vpc_cidr}"
}

resource "opentelekomcloud_vpc_v1" "vpc_peer" {
  provider = "opentelekomcloud.peer"
  name = "${var.peer_vpc_name}"
  cidr = "${var.peer_vpc_cidr}"
}

resource "opentelekomcloud_vpc_peering_connection_v2" "peering" {
  provider = "opentelekomcloud.main"
  name = "${var.peer_name}"
  vpc_id = "${opentelekomcloud_vpc_v1.vpc_main.id}"
  peer_vpc_id = "${opentelekomcloud_vpc_v1.vpc_peer.id}"
  peer_tenant_id =  "${var.tenant_id}"
}
resource "opentelekomcloud_vpc_peering_connection_accepter_v2" "peer" {
    provider = "opentelekomcloud.peer"
    id = "${opentelekomcloud_vpc_peering_connection_v2."peering".id}"
  
}
 ```

## Argument Reference

The following arguments are supported:

- id - (Required) The VPC Peering Connection ID to manage.


## Removing opentelekomcloud_vpc_peering_connection_accepter from your configuration
 
OpenTelekomCloud allows a cross-account VPC Peering Connection to be deleted from either the requester's or accepter's side. However, Terraform only allows the VPC Peering Connection to be deleted from the requester's side by removing the corresponding opentelekomcloud_vpc_peering_connection resource from your configuration. Removing a opentelekomcloud_vpc_peering_connection_accepter resource from your configuration will remove it from your statefile and management, but will not destroy the VPC Peering Connection.

## Attributes Reference

All of the argument attributes except auto_accept are also exported as result attributes.

name - 	The VPC peering connection name.

id - The VPC peering connection ID.

request_vpc_info - 	The information about the local VPC.

accept_vpc_info - The information about the peer VPC.

status - The VPC peering connection status.


