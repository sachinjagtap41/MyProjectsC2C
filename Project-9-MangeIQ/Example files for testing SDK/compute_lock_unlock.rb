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
# Lock server
#  lock_response = service.lock_server('930ffaba-14f8-486e-be60-0843a377b61a');
#  puts lock_response.body
#  puts "Lock server successfully"

# Unlock servers
 unlock_response = service.unlock_server('930ffaba-14f8-486e-be60-0843a377b61a');
puts unlock_response.body
  puts "Unlock server successfully"
