# Configure the OpenStack Provider
provider "opentelekomcloud" {
  user_name   = "lizhonghua"
  domain_name = "OTC00000000001000010501"
  password    = "slob@123"
  auth_url    = "https://iam.eu-de.otc.t-systems.com/v1"
  //region      = "eu-de"
  tenant_id = "87a56a48977e42068f70ad3280c50f0e"
}

#to create security group
resource"opentelekomcloud_vpc_v1" "vpc_v1"{
  name = "vpctestupdate1"
//  admin_state_up = true
  cidr = "192.168.0.0/16"
}
//opentelekomcloud_vpc_v1
//opentelekomcloud_networking_router_v2
//opentelekomcloud_networking_secgroup_v2
//opentelekomcloud_networking_secgroup_v2

/*data "opentelekomcloud_vpc_v1" "data_vpc_v1" {
//  id = "${opentelekomcloud_vpc_v1.vpc_v1.id}"
  name = "terraform-provider-myvpc3"
}*/

/*resource"opentelekomcloud_networking_secgroup_v2" "secgroup_1"{
  name = "secgroup"
  description = "just to check"
}*/

//resource "opentelekomcloud_networking_secgroup_rule_v2" "secgroup_rule_1" {
//  direction         = "ingress"
//  ethertype         = "IPv4"
//  protocol          = "tcp"
//  port_range_min    = 22
//  port_range_max    = 22
//  remote_ip_prefix  = "0.0.0.0/0"
//  security_group_id = "${opentelekomcloud_networking_secgroup_v2.secgroup_1.id}"
//}
/*
resource "opentelekomcloud_networking_router_v2" "vpc_1" {
  name             = "my_c2c_router"
  #external_gateway = "f67f0d72-0ddf-11e4-9d95-e1f29f417e2f"
}


data "opentelekomcloud_networking_secgroup_v2" "secgroup" {
  name = "default"
}
output "sec_data" {
  value = "${data.opentelekomcloud_networking_secgroup_v2.secgroup.tenant_id}"
}*/

#not working
/*data "opentelekomcloud_networking_network_v2" "vpc" {
  name = "vpc-elb-l00379969"
}

output "vpc_data" {
  value = "${data.opentelekomcloud_networking_network_v2.vpc.name}"
}*/
/*
resource "opentelekomcloud_networking_network_v2" "network_1" {
  name           = "mynetwork_1"
  admin_state_up = "true"
}

resource "opentelekomcloud_networking_subnet_v2" "subnet_1" {
  name       = "subnet_1"
  network_id = "${opentelekomcloud_networking_network_v2.network_1.id}"
  cidr       = "192.168.199.0/24"
  ip_version = 4
}

resource "opentelekomcloud_compute_secgroup_v2" "secgroup_1" {
  name        = "mysecgroup_1"
  description = "a security group"

  rule {
    from_port   = 22
    to_port     = 22
    ip_protocol = "tcp"
    cidr        = "0.0.0.0/0"
  }
}*/


/*resource "opentelekomcloud_networking_secgroup_v2" "secgroup_1" {
  name        = "secgroup_1"
  description = "My neutron security group"
}*/

/*
data "opentelekomcloud_networking_secgroup_v2" "secgroup_1" {
//  secgroup_id = "${opentelekomcloud_networking_secgroup_v2.secgroup_1.id}"
  name = "default"
}*/
