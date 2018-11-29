# How to use make utility to automate running playbooks 
The automation script allows to run playbooks and trace output on screen or in output file.


## Supported Operating Systems
- Red Hat Enterprise Linux 6 64-bit
- Red Hat Enterprise Linux 7 64-bit
- CentOS 6 64-bit
- CentOS 7 64-bit
- Ubuntu 12.04 LTS 64-bit
- Ubuntu 14.04 LTS 64-bit

**NOTE**:<br/>
User should have `root` permissions for running automation scripts

## Setup Test Environment
To auto download python packages, navigate to this current folder and run below command:

```sh
make setup
```

This will install and update all the python packages required for running Aliyun Modules.

## Setting Ansible Library Path
The `test-script/modules` folder contains latest ansbile modules. It is required to set `ANSIBLE_LIBRARY` variable to 
 this folder location. 

## Setting up test environment
- In order run Playbooks with users credentials , update alicloud-creds.yml  available in var Folder
- Also Update the test-environment.yml file available in var folder to provide e.g. Region zone parameter as per the user demand or you can execute with default provided Parameter

## Running Ansible Playbooks 
To run all the test-scripts playbooks, run the below command:

```sh
make test
```

If you want to run specific test-script, pass `MODULE` parameter in `make test` as specified below:

```sh
make test MODULE=ecs_instance_create
```

Currently scripts supports below parameter options for MODULE:

| Parameter  | Details |
|------------|---------|
| ecs_instance_create | to check ecs instance creation test-scripts  | 