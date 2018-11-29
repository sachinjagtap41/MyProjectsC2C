gem 'fog-telefonica'

require 'pp'
require 'rubygems'

require 'pp'
require 'rubygems'
require 'fog/telefonica'

auth_url = 'https://iam.sa-brazil-1.telefonicaopencloud.com/v3/auth/tokens'
username = 'us_cloud--ci-ahuawei-dcom'
password = 'Tools@123'
domain = 'Huawei China'
project = 'sa-brazil-1'
region =  'sa-brazil-1'
service  = Fog::Compute::Telefonica.new({ :telefonica_auth_url => auth_url,
                                          :telefonica_api_key  => password,
                                          :telefonica_username => username,
                                          :telefonica_domain_name => domain,
                                          :telefonica_project_name   => project,
                                          :telefonica_region => region
                                        })

# Query execution status of tasks
#taskStatus = service.query_task_status('8ab790896383c563016416d7ccb6616e')
 #puts "Task status response :#{taskStatus.body}"

# Display FloatingIP details
#  floatingIp = service.show_floating_ip('a38f51b4-c388-4c5c-9810-5552c63dcdd1')
#  puts "floatingIp is :#{floatingIp.body}"

# Modify ecs specification
ecs_specifiction = service.update_ecs_specifications('088b97d0-8978-4251-b4ea-4f464a4bb916', 'c2.8xlarge4')
 puts "Updated ECS speification :#{ecs_specifiction.body}"
