provider "opentelekomcloud"  {
  user_name   = "lizhonghua"
  domain_name = "OTC00000000001000010501"
  password    = "slob@1234"
  auth_url    = "https://iam.eu-de.otc.t-systems.com/v3"
  region      = "eu-de"
  tenant_id   = "87a56a48977e42068f70ad3280c50f0e"
}


resource "opentelekomcloud_sfs_stack_v1" "peering_1" {
  name = "disha"
  disable_rollback= true
  timeout_mins=60
  template = <<JSON
          {
			 "heat_template_version": "2013-05-23",
			 "description": "Simple template disha",
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
                    "default": "s1.medium"
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

}
output "disable_rollback" {

  value = "${opentelekomcloud_sfs_stack_v1.peering_1.disable_rollback}"
}
output "timeout_mins" {

  value = "${opentelekomcloud_sfs_stack_v1.peering_1.timeout_mins}"
}


