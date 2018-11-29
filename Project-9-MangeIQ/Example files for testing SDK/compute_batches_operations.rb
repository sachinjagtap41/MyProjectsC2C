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

# # Stop servers in batches
 stop_response = service.stop_servers_in_batches(['930ffaba-14f8-486e-be60-0843a377b61a', 'd27fe09e-cba6-4001-abd3-7f672b4fe526', 'dfd27fe09e-cba6-4001-abd3-7f672b4fe526'], 'HARD'); #([id1,id2,.....idn], SOFT/HARD)
 puts stop_response.body
puts "Stop server successfully"


#Start servers in batches
# start_response = service.start_servers_in_batches(['930ffaba-14f8-486e-be60-0843a377b61a', 'd27fe09e-cba6-4001-abd3-7f672b4fe526', 'dfd27fe09e-cba6-4001-abd3-7f672b4fe526'], 'HARD'); #([id1,id2,.....idn], SOFT/HARD)
# puts start_response.body
# puts "Start server successfully"

# Restart servers in batches
#  restart_response = service.restart_servers_in_batches(['930ffaba-14f8-486e-be60-0843a377b61a']); #([id1,id2,.....idn], SOFT/HARD)
#   puts restart_response.body
#   puts "Restart server successfully"
