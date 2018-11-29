# How to use make utility to automate running playbooks 
The automation script allows to run playbooks and trace output on screen and stores the output in file under test-output folder.

## Supported Operating Systems
- Red Hat Enterprise Linux 
- CentOS 
- Ubuntu
- Debian

**NOTE**:<br/>
User should have `root` permissions for running automation scripts.


## Pre-Requisites (Ubuntu OS)

* `make` utility <br/><br/>
 Make utility is required for automate running playbooks. Install `make` utility by running below command on Ubuntu.
```sh
sudo apt-get -y install make 
```
* `python` version 2.7.X<br/><br/>
 Currently Ansible can be run from machine with Python 2.7 installed. Run below command to install `python`.
```sh
sudo apt-get -y install python2.7
```
Check python installation by running below command.
```sh
python --version
```
* Install `pip`<br/><br/>
 `pip` is required to install `ansible` package. Run below command to install `pip` and other packages.
```sh
sudo apt-get -y install python-pip python-dev dos2unix
```
* Install `ansible`<br/><br/>
Before installing `ansible`, enable local setting by running below command.
```sh
export LC_ALL=C
```
Now run below command to install `ansible`.
```sh
sudo pip install ansible
```
Verify installation by running below command.
```sh
ansible --version
```
NOTE:<br/>
If you get the error message <br/>
ImportError: No module named markupsafe, try installing markupsafe manually with 
```sh
sudo pip install markupsafe
```
See this GitHub issue https://github.com/ansible/ansible/issues/13570 for more detail.

## Correcting file permission
While pulling script files from GitHub, the file permission might lost. Run below commands in `UAT` folder to fix this issue.
```sh
find . -type f -name '*.yml' -exec dos2unix '{}' +
dos2unix ./script/*
chmod +x ./script/*
```

## Setup and configure Test Environment 
To setup and download dependencies for Aliyun Ansible Modules, run below command from `UAT` folder.
```sh
make setup
```

## Setting up test environment
* Aliyun Credential Setup<br/><br/>
In order run Playbooks with users credentials, update `alicloud-creds.yml`  available in `UAT\test-script\playbooks` folder. 
Replace `XXXXXXXXX` in front of `aliyun_acs_access_key` and `aliyun_acs_secret_access_key` with your Aliyun Access KEY and Access KEY Secrete respectively.

* Test Environment Parameters Setup<br/><br/>
Also update the `test-environment.yml` file available in var folder of different test scenarios e.g. update region, zone_id, ECS_Instance parameter as per the user demand.

## Running Ansible Playbooks 
To run all the test-scripts playbooks, run the below command:
```sh
make test
```
To run specific test-scripts playbooks, provide `MODULE` parameter in `make test` command as specified below:
```sh
make test MODULE=ecs_instance_create
```

Below is list of `MODULE` supported

| MODULE                                            | Test-Script folder                                                             |
| --------------------------------------------------|:-------------------------------------------------------------------------------|
| ecs_instance_create                               |   test-script/playbooks/ecs/instance/ecs_create_instance                       |
| ecs_instance_status_query                         |   test-script/playbooks/ecs/instance/ecs_querying_instance_status              |
| ecs_instance_attribute_modify                     |   test-script/playbooks/ecs/instance/ecs_modify_instance_attributes            |
| ecs_instance_add_security_group                   |   test-script/playbooks/ecs/instance/ecs_add_ecs_instance_to_sec_group         |
| ecs_instance_remove_security_group                |   test-script/playbooks/ecs/instance/ecs_remove_ecs_instance_from_sec_group    |
| ecs_disk_create                                   |   test-script/playbooks/ecs/disks/ecs_create_disk                              |
| ecs_disk_attach                                   |   test-script/playbooks/ecs/disks/ecs_attach_disk                              |
| ecs_disk_detach                                   |   test-script/playbooks/ecs/disks/ecs_detach_disk                              |
| ecs_disk_delete                                   |   test-script/playbooks/ecs/disks/ecs_delete_disk                              |
| ecs_security_group_create                         |   test-script/playbooks/ecs/groups/securitygroup_create_sec_group              |
| ecs_security_group_authorize                      |   test-script/playbooks/ecs/groups/securitygroup_authorize_sec_group           |
| ecs_security_group_query                          |   test-script/playbooks/ecs/groups/securitygroup_query_sec_group_list          |
| ecs_security_group_delete                         |   test-script/playbooks/ecs/groups/securitygroup_delete_sec_group              |
| ecs_image_create                                  |   test-script/playbooks/ecs/images/ecs_create_custom_image                     |
| ecs_image_delete                                  |   test-script/playbooks/ecs/images/ecs_delete_custom_image                     |
| slb_lb_add_backend_servers                        |   test-script/playbooks/slb/add_backend_servers                                |
| slb_lb_add_vserver_group_backend_servers          |   test-script/playbooks/slb/vserver_group_backend_servers                      |
| slb_lb_create_load_balancer                       |   test-script/playbooks/slb/create_load_balancer                               |
| slb_lb_create_vserver_group                       |   test-script/playbooks/slb/create_vserver_group                               |
| slb_lb_delete_load_balancer                       |   test-script/playbooks/slb/delete_load_balancer                               |
| slb_lb_delete_vserver_group                       |   test-script/playbooks/slb/delete_vserver_group                               |
| slb_lb_describe_health_status_of_backend_server   |   test-script/playbooks/slb/describe_health_status_of_backend_server           |
| slb_lb_listener                                   |   test-script/playbooks/slb/listener                                           |
| slb_lb_modify_load_balancer_internet_spec         |   test-script/playbooks/slb/modify_load_balancer_internet_spec                 |
| slb_lb_modify_vserver_group_backend_server        |   test-script/playbooks/slb/modify_vserver_group_backend_server                |
| slb_lb_remove_backend_servers                     |   test-script/playbooks/slb/remove_backend_servers                             |
| slb_lb_remove_vserver_group_backend_servers       |   test-script/playbooks/slb/remove_vserver_group_backend_servers               |
| slb_lb_set_backend_servers                        |   test-script/playbooks/slb/backend_servers                                    |
| slb_lb_set_load_balancer_name                     |   test-script/playbooks/slb/load_balancer_name                                 |
| slb_lb_set_load_balancer_status                   |   test-script/playbooks/slb/set_load_balancer_status                           |
| slb_lb_set_vserver_group_attribute                |   test-script/playbooks/slb/set_vserver_group_attribute                        |
| slb                                               |   test-script/playbooks/slb                                                    |
| vpc                                               |   test-script/playbooks/vpc                                                    |
| vpc_binding_eip                                   |   test-script/playbooks/vpc/binding_eip                                        |
| vpc_create_vpc                                    |   test-script/playbooks/vpc/create_vpc                                         |
| vpc_create_vswitch                                |   test-script/playbooks/vpc/create_vswitch                                     |
| vpc_creating_custom_route                         |   test-script/playbooks/vpc/creating_custom_route                              |
| vpc_delete_vpc                                    |   test-script/playbooks/vpc/delete_vpc                                         |
| vpc_delete_vswitch                                |   test-script/playbooks/vpc/delete_vswitch                                     |
| vpc_deleting_custom_route                         |   test-script/playbooks/vpc/deleting_custom_route                              |
| vpc_modifying_eip                                 |   test-script/playbooks/vpc/modifying_eip                                      |
| vpc_querying_vrouter_list                         |   test-script/playbooks/vpc/querying_vrouter_list                              |
| vpc_querying_vswitch_list                         |   test-script/playbooks/vpc/querying_vswitch_list                              |
| vpc_releasing_eip                                 |   test-script/playbooks/vpc/releasing_eip                                      |
| vpc_request_eip                                   |   test-script/playbooks/vpc/request_eip                                        |
| vpc_unbinding_eip                                 |   test-script/playbooks/vpc/unbinding_eip                                      |