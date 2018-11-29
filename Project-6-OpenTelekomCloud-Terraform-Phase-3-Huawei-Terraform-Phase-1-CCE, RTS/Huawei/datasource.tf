# Configure the OpenStack Provider
provider "huaweicloud" {
  user_name   = "Longyin_kk"
  domain_name = "longyin_kk"
  password    = "kuaiLE02"
  auth_url    = "https://iam.cn-north-1.myhuaweicloud.com/v3"
  region      = "cn-north-1"
  tenant_id   = "c59fd21fd2a94963b822d8985b884673"
}

data "huaweicloud_rts_stack_v1" "stacks" {
    name = "opentelekomcloud_stack_c2",
  //  tenant_id = "c59fd21fd2a94963b822d8985b884673",
   //id = "db0053e1-e04e-4780-a56a-eb41a0c7a294"
}


output "stack_data1" {
   value = "${data.huaweicloud_rts_stack_v1.stacks.status}"
 }

output "stack_data2" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.name}"
}
output "stack_data3" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.status_reason}"
}
output "stack_data4" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.description}"
}
output "stack_data5" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.outputs}"
}
output "stack_data6" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.parameters}"
}
output "stack_data7" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.timeout_mins}"
}
output "stack_data8" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.id}"
}
output "stack_data9" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.disable_rollback}"
}
output "stack_data10" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.capabilities}"
}
output "stack_data11" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.notification_topics}"
}
output "stack_data12" {
  value = "${data.huaweicloud_rts_stack_v1.stacks.template_body}"
}
