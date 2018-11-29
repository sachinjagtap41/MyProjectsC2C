resource "opentelekomcloud_vpc_v1" "vpc_v1" {
  name = "${var.name}"
  cidr_block = "${var.vpc_cidr}"
}

