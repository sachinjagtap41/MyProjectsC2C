provider "opentelekomcloud"  {
  user_name   = "c2c-5"
  domain_name = "OTC00000000001000010501"
  password    = "Newuser@123"
  auth_url    = "https://iam.eu-de.otc.t-systems.com/v3"
  region      = "eu-de"
  tenant_id   = "17fbda95add24720a4038ba4b1c705ed"
}

/*resource "opentelekomcloud_rts_stack_v1" "TestSachin" {
  name = "roh"
  disable_rollback= true
  timeout_mins=1
  template = <<JSON
          {
			 "heat_template_version": "2013-05-23",
			 "description": "Simple template TestSachin",
			 "parameters": {
			    "image_id": {
			        "type": "string",
                    "description": "Image to be used for compute instance",
			        "label": "Image ID",
                    "default": "ea67839e-fd7a-4b99-9f81-13c4c8dc317c"
			    },
			    "net_id": {
			        "type": "string",
			        "description": "The network to be used",
			        "label": "Network UUID",
                    "default": "7eb54ab6-5cdb-446a-abbe-0dda1885c76e"
			    },
			    "instance_type": {
			        "type": "string",
			        "description": "Type of instance (flavor) to be used",
			        "label": "Instance Type",
                    "default": "m1.medium"
			      }
			  },
			 "resources": {
			    "my_instance": {
                  "type": "OS::Nova::Server",
			      "properties": {
			      "image": {
			      "get_param": "image_id"
			      },
			      "flavor": {
                  "get_param": "instance_type"
			      },
			    "networks": [
			     {
			        "network": {
			        "get_param": "net_id"
			      }
			     }
			    ]
			   }
			  }
			 }
			}
JSON

}*/



data "opentelekomcloud_rts_stack_v1" "stacks" {
  name = "opentelekomcloud_stack_c2copent",
  id = "3ef7fc84-ad91-421e-9d0a-cafb19f67678"


}

output "stack_data" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.name}"
}
output "stack_data1" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.id}"
}
output "stack_data2" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.disable_rollback}"
}
output "stack_data3" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.parameters}"
}
output "stack_data4" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.status_reason}"
}
output "stack_data5" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.outputs}"
}
output "stack_data6" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.parameters}"
}
output "stack_data7" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.capabilities}"
}
output "stack_data8" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.notification_topics}"
}
output "stack_data9" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.timeout_mins}"
}
output "stack_data10" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.status}"
}
output "stack_data11" {
  //  value = "${data.opentelekomcloud_sfs_stack_v1.stacks.template_body["key_name"]}"
  value = "${data.opentelekomcloud_rts_stack_v1.stacks.template_body}"
}