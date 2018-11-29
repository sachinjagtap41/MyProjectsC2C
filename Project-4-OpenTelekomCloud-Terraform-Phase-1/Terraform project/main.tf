# Configure the OpenStack Provider
provider "opentelekomcloud" {
  user_name   = "lizhonghua"
  domain_name = "OTC00000000001000010501"
  password    = "slob@123"
  auth_url    = "https://iam.eu-de.otc.t-systems.com/v3"
  region      = "eu-de"
  tenant_id = "87a56a48977e42068f70ad3280c50f0e"
  //tenant_name  ="eu-de_Nordea"
}


variable "vpc_id"{
default="vpc-nor10"
}

data "opentelekomcloud_vpc_v1" "selected" {
  name = "${var.vpc_id}"
  //cidr = "192.168.0.0/16"
}

/*resource "opentelekomcloud_networking_subnet_v2" "subnet_1" {
  network_id = "abda1f6e-ae7c-4ff5-8d06-53425dc11f34"
  cidr       = "192.168.0.0/16"
}*/

output "myOutput" {
  value = "${data.opentelekomcloud_vpc_v1.selected.status}"
}


