# Configure the OpenStack Provider
provider "opentelekomcloud" {
  user_name   = "lizhonghua"
  domain_name = "OTC00000000001000010501"
  password    = "slob@123"
  auth_url    = "https://iam.eu-de.otc.t-systems.com/v3"
  //region      = "eu-de"
  tenant_id = "87a56a48977e42068f70ad3280c50f0e"
}

resource "opentelekomcloud_vpc_v1" "vpc_v1" {
  name = "click2cloud"
  cidr = "192.168.0.0/16"

}