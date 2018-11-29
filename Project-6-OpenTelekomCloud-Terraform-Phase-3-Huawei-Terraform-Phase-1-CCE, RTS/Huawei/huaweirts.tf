provider "opentelekomcloud"  {
  user_name   = "c2c-5"
  domain_name = "OTC00000000001000010501"
  password    = "Newuser@123"
  auth_url    = "https://iam.eu-de.otc.t-systems.com/v3"
  region      = "eu-de"
  tenant_id   = "17fbda95add24720a4038ba4b1c705ed"
  
  user_name   = "Longyin_kk"
  domain_name = "longyin_kk"
  password    = "kuaiLE02"
  auth_url    = "https://iam.cn-east-2.myhuaweicloud.com/v3"
  region      = "cn-east-2"
  tenant_id   = "95fb48c35a6c49bca3f99924885d0362"
}


resource "huaweicloud_rts_stack_v1" "test-roh" {
  name = "rohini-test"
  disable_rollback= true
  timeout_mins=10
  template = <<JSON
          {
			 "heat_template_version": "2013-05-23",
             "description" : "test rohini description",

			 "parameters": {
			    "image_id": {
			        "type": "string",
                    "description": "Image to be used for compute instance",
			        "label": "Image ID",
                    "default": "af3d8419-5dd1-4f9f-959d-2ed72236ab73"
			    },
			    "net_id": {
			        "type": "string",
			        "description": "The network to be used",
			        "label": "Network UUID",
                    "default": "5232f396-d6cc-4a81-8de3-afd7a7ecdfd8"
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
/*output "disable_rollback" {

  value = "${opentelekomcloud_rts_stack_v1.test-roh.disable_rollback}"
}
*/
output "description" {

  value = "${opentelekomcloud_rts_stack_v1.test-roh.status}"
}

