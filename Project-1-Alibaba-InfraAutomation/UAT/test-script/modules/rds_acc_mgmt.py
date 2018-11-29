#!/usr/bin/python
#
# Copyright 2017 Alibaba Group Holding Limited.
#
# This file is part of Ansible
#
# Ansible is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# Ansible is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Ansible. If not, see http://www.gnu.org/licenses/

ANSIBLE_METADATA = {'status': ['stableinterface'],
                    'supported_by': 'core',
                    'version': '1.0'}

DOCUMENTATION = """
---
module: rds_acc_mgmt
short_description: Create account, delete account, resetting instance password, resetting account, granting account permission and revoking account permission in RDS
description:
     - Create account, delete account, resetting instance password, resetting account, granting account permission and revoking account permission in RDS
common options:
  acs_access_key:
    description: The access key.
    required: false
    default: null
    aliases: ['ecs_access_key', 'access_key']
  acs_secret_access_key:
    description: The access secret key.
    required: false
    default: null
    aliases: ['ecs_secret_key', 'secret_key']
  command:
    description:
      -  command for rds,
    choices: ['create', 'delete', 'grant', 'revoke', 'reset_password', 'reset']
    required: false
    default: create

function: create an account
    description: Creates an account for a database. For instances of the same user, a single account can be used
    to operate multiple databases.  A single account can have different permissions on different databases
    command: create
    options:
      db_instance_id:
        description:
          - Id of instance.
        required: True
      account_name:
        description:
          - Operation account requiring a uniqueness check. It may consist of lower case letters, numbers and
          underlines, and must start with a letter and have no more than 16 characters
        required: True
        aliases: ['name']
      account_password:
        description:
          - Operation password. It may consist of letters, digits, or underlines, with a length of 6 to 32 characters
        required: True
        aliases: ['password']
      description:
        description:
          - Account remarks, which cannot exceed 256 characters. It cannot begin with http:// , https:// .
          It must start with a Chinese character or English letter. It can include Chinese and
          English characters/letters, underlines (_), hyphens (-), and numbers. The length may be 2-256 characters
        required: false
      account_type:
        description:
          - Privilege type of account. Normal: Common privilege; Super: High privilege; Default value is Normal.
          This parameter is valid for MySQL 5.5/5.6 only
        required: false

function: delete an account
    description: delete an account in an Instance
    command: delete
    options:
      db_instance_id:
        description:
          - Id of instance.
        required: True
      account_name:
        description:
          - Operation account requiring a uniqueness check. It may consist of lower case letters, numbers and
          underlines, and must start with a letter and have no more than 16 characters
        required: True
        aliases: ['name']

function: Granting account permissions
    description: Granting account permissions
    command: grant
    options:
      db_instance_id:
        description:
          - Id of instance.
        required: True
      account_name:
        description:
          - Name of an account
        aliases: ['name']
        required: True
      db_name:
        description:
          - Name of the database associated with this account
        required: True
      account_privilege:
        description:
          - Account permission.
        aliases: ['privilege']
        choices: ['ReadOnly', 'ReadWrite']
        required: True

function: Revoking account permissions
    description: Granting account permissions
    command: revoke
    options:
      db_instance_id:
        description:
          - Id of instance.
        required: True
      account_name:
        description:
          - Name of an account
        aliases: ['name']
        required: True
      db_name:
        description:
          - Name of the database associated with this account
        required: True

function: resetting the instance password
    description: Resets the account password
    command: reset_password
    options:
      db_instance_id:
        description:
          - Id of instance.
        required: True
      account_name:
        description:
          - Name of an account
        aliases: ['name']
        required: True
      account_password:
        description:
          - A new password. It may consist of letters, numbers, or underlines, with a length of 6 to 32 characters
        aliases: ['password']
        required: True

function: resetting an account
    description: Resets an instance's initial account. It is only effective for RDS for
    PostgreSQL and RDS for PPAS instances
    command: reset
    options:
      db_instance_id:
        description:
          - Id of instance
        required: True
      account_name:
        description:
          - Operation account requiring a uniqueness check. It may consist of lower case letters,
          numbers and underlines, and must start with a letter and have no more than 16 characters
        aliases: ['name']
        required: True
      account_password:
        description:
          - Account password
        aliases: ['password']
        required: True

"""

EXAMPLES = """
#
# provisioning for rds
#

# basic provisioning example to create account

- name: create account
  hosts: localhost
  connection: local
  vars:
    acs_access_key: xxxxxxxxxx
    acs_secret_access_key: xxxxxxxxxx
    region: cn-hongkong
    command: create
    db_instance_id: xxxxxxxxxx
    account_name: xxxxxxxxxx
    account_password: rohit@123
    description: normal account
    account_type: normal
  tasks:
    - name: create account
      rds_acc_mgmt:
        acs_access_key: '{{ acs_access_key }}'
        acs_secret_access_key: '{{ acs_secret_access_key }}'
        region: '{{ region }}'
        command: '{{ command }}'
        db_instance_id: '{{ db_instance_id }}'
        account_name: '{{ account_name }}'
        account_password: '{{ account_password }}'
        description: '{{ description }}'
        account_type: '{{ account_type }}'
      register: result
    - debug: var=result


# basic provisioning example to resetting an instance password

- name: Resetting an instance password
  hosts: localhost
  connection: local
  vars:
    acs_access_key: xxxxxxxxxx
    acs_secret_access_key: xxxxxxxxxx
    region: cn-hongkong
    command: reset_password
    db_instance_id: xxxxxxxxxx
    account_name: xxxxxxxxxx
    account_password: testuser@123
  tasks:
    - name: Resetting an instance password
      rds_acc_mgmt:
        acs_access_key: '{{ acs_access_key }}'
        acs_secret_access_key: '{{ acs_secret_access_key }}'
        region: '{{ region }}'
        command: '{{ command }}'
        db_instance_id: '{{ db_instance_id }}'
        account_name: '{{ account_name }}'
        account_password: '{{ account_password }}'
      register: result
    - debug: var=result


# basic provisioning example to resetting an account

- name: Resetting an account
  hosts: localhost
  connection: local
  vars:
    acs_access_key: xxxxxxxxxx
    acs_secret_access_key: xxxxxxxxxx
    region: cn-hongkong
    command: reset
    db_instance_id: xxxxxxxxxx
    account_name: xxxxxxxxxx
    account_password: testuser@123   
  tasks:
    - name: Resetting an account
      rds_acc_mgmt:
        acs_access_key: '{{ acs_access_key }}'
        acs_secret_access_key: '{{ acs_secret_access_key }}'
        region: '{{ region }}'
        command: '{{ command }}'
        db_instance_id: '{{ db_instance_id }}'
        account_name: '{{ account_name }}'
        account_password: '{{ account_password }}'
      register: result
    - debug: var=result

# basic provisioning example to delete an account

- name: delete account
  hosts: localhost
  connection: local
  vars:
    acs_access_key: xxxxxxxxxx
    acs_secret_access_key: xxxxxxxxxx
    region: cn-hongkong
    command: delete
    db_instance_id: xxxxxxxxxx
    account_name: xxxxxxxxxx

  tasks:
    - name: delete account
      rds_acc_mgmt:
        acs_access_key: '{{ acs_access_key }}'
        acs_secret_access_key: '{{ acs_secret_access_key }}'
        region: '{{ region }}'
        command: '{{ command }}'
        db_instance_id: '{{ db_instance_id }}'
        account_name: '{{ account_name }}'

      register: result
    - debug: var=result

# basic provisioning example to granting account permission

- name: granting account permission
  hosts: localhost
  connection: local
  vars:
    acs_access_key: xxxxxxxxxx
    acs_secret_access_key: xxxxxxxxxx
    region: cn-hongkong
    command: grant
    db_instance_id: xxxxxxxxxx
    db_name: xxxxxxxxxx
    account_name: xxxxxxxxxx
    account_privilege: ReadOnly

  tasks:
    - name: granting account permission
      rds_acc_mgmt:
        acs_access_key: '{{ acs_access_key }}'
        acs_secret_access_key: '{{ acs_secret_access_key }}'
        region: '{{ region }}'
        command: '{{ command }}'
        db_instance_id: '{{ db_instance_id }}'
        db_name: '{{ db_name }}'
        account_name: '{{ account_name }}'
        account_privilege: '{{ account_privilege }}'

      register: result
    - debug: var=result

# basic provisioning example to revoking account permission

- name: revoking account permission
  hosts: localhost
  connection: local
  vars:
    acs_access_key: xxxxxxxxxx
    acs_secret_access_key: xxxxxxxxxx
    region: cn-hongkong
    command: revoke
    db_instance_id: xxxxxxxxxx
    db_name: xxxxxxxxxx
    account_name:  xxxxxxxxxx

  tasks:
    - name: revoking account permission
      rds_acc_mgmt:
        acs_access_key: '{{ acs_access_key }}'
        acs_secret_access_key: '{{ acs_secret_access_key }}'
        region: '{{ region }}'
        command: '{{ command }}'
        db_instance_id: '{{ db_instance_id }}'
        db_name: '{{ db_name }}'
        account_name: '{{ account_name }}'

      register: result
    - debug: var=result

"""

import time
import re
from ast import literal_eval
from footmark.exception import RDSResponseError


def create_account(module, rds, db_instance_id, account_name, account_password, description=None, account_type=None):
    """
    Create account for database
    :param module: Ansible module object
    :param rds: Authenticated rds connection object
    :param db_instance_id: Id of instance
    :param account_name: Operation account requiring a uniqueness check. It may consist of lower case letters,
    numbers and underlines, and must start with a letter and have no more than 16 characters.
    :param account_password: Operation password. It may consist of letters, digits, or underlines,
    with a length of 6 to 32 characters
    :param description: Account remarks, which cannot exceed 256 characters. NOTE: It cannot begin with http://,
    https:// . It must start with a Chinese character or English letter. It can include Chinese and English
    characters/letters, underlines (_), hyphens (-), and numbers. The length may be 2-256 characters
    :param account_type: Privilege type of account. Normal: Common privilege;Super: High privilege;
    Default value is Normal.This parameter is valid for MySQL 5.5/5.6 only.
    :return: Result dict of operation
    """
    if not db_instance_id:
        module.fail_json(msg='db_instance_id is required for create account')
    if not account_name:
        module.fail_json(msg='account_name is required for create account')
    if not account_password:
        module.fail_json(msg='account_password is required for create account')

    if account_type:
        if account_type.lower() == 'normal':
            account_type = "Normal"
        elif account_type.lower() == 'super':
            account_type = "Super"

    spec = ['@', '#', '$', '%', '^', '&', '*', '(', '_', '+', '-', '=', ')', '!']
    intersection_condition = set(spec).intersection(account_password)
    changed = False

    if (len(account_password) >= 6) and (len(account_password) <= 32):
        if len(intersection_condition) > 0:
            if re.match('[a-zA-Z0-9]', account_password):
                try:
                    changed, result = rds.create_account(db_instance_id=db_instance_id, account_name=account_name,
                                                         account_password=account_password, description=description,
                                                         account_type=account_type)
                    if 'error' in (''.join(str(result))).lower():
                        module.fail_json(changed=changed, msg=result)

                except RDSResponseError as e:
                    module.fail_json(msg='Unable to create account, error: {0}'.format(e))
            else:            
                module.fail_json(msg='account_password pattern does not match')
        else:
            module.fail_json(msg='account_password is not valid')
    else:
        module.fail_json(msg='account_password length must be between 6 to 32 characters.')

    return changed, result


def delete_account(module, rds, db_instance_id, account_name):
    """
    Delete Account

    :param module: Ansible module object
    :param rds: Authenticated rds connection object
    :param db_instance_id: Id of the instance to delete
    :param account_name: Name of the database
    :return:
        changed: If account is deleted successfully the changed will be set to True else False
        result: detailed server response
    """

    changed = False
    try:
        if not db_instance_id:
            module.fail_json(msg='db_instance_id is required for delete account')
        if not account_name:
            module.fail_json(msg='account_name is required for delete account')
        changed, result = rds.delete_account(db_instance_id=db_instance_id, account_name=account_name)

        if 'error' in (''.join(str(result))).lower():
            module.fail_json(changed=changed, msg=result)

    except RDSResponseError as e:
        module.fail_json(msg='Unable to delete account, error: {0}'.format(e))

    return changed, result


def resetting_instance_password(module, rds, db_instance_id, account_name, account_password):
    """
    Resetting instance password
    :param module: Ansible module object
    :param rds: Authenticated rds connection object
    :param db_instance_id: Id of instance
    :param account_name: Name of an account
    :param account_password: A new password. It may consist of letters, numbers, or underlines,
    with a length of 6 to 32 characters
    :return: Result dict of operation
    """
    if not db_instance_id:
        module.fail_json(msg='db_instance_id is required for resetting instance password')
    if not account_name:
        module.fail_json(msg='account_name is required for resetting instance password')
    if not account_password:
        module.fail_json(msg='account_password is required for resetting instance password')

    spec = ['@', '#', '$', '%', '^', '&', '*', '(', '_', '+', '-', '=', ')', '!']
    intersection_condition = set(spec).intersection(account_password)
    changed = False

    if (len(account_password) >= 6) and (len(account_password) <= 32):
        if len(intersection_condition) > 0:
            if re.match('[a-zA-Z0-9]', account_password):
                try:
                    changed, result = rds.resetting_instance_password(db_instance_id=db_instance_id,
                                                                      account_name=account_name,
                                                                      account_password=account_password)
                    if 'error' in (''.join(str(result))).lower():
                        module.fail_json(changed=changed, msg=result)

                except RDSResponseError as e:
                    module.fail_json(msg='Unable to resetting account password, error: {0}'.format(e))
            else:            
                module.fail_json(msg='account_password pattern does not match')
        else:
            module.fail_json(msg='account_password is not valid')
    else:
        module.fail_json(msg='account_password length must be between 6 to 32 characters.')

    return changed, result


def resetting_account(module, rds, db_instance_id, account_name, account_password):
    """
    Resetting Account
    :param module: Ansible module object
    :param rds: Authenticated rds connection object
    :param db_instance_id: Id of instance
    :param account_name: Name of an account
    :param account_password: A new password. It may consist of letters, numbers, or underlines,
    with a length of 6 to 32 characters
    :return: Result dict of operation
    """
    if not db_instance_id:
        module.fail_json(msg='db_instance_id is required for resetting account')
    if not account_name:
        module.fail_json(msg='account_name is required for resetting account')
    if not account_password:
        module.fail_json(msg='account_password is required for resetting account')

    try:
        changed, result = rds.resetting_account(db_instance_id=db_instance_id, account_name=account_name,
                                                account_password=account_password)
        if 'error' in (''.join(str(result))).lower():
            module.fail_json(changed=changed, msg=result)

    except RDSResponseError as e:
        module.fail_json(msg='Unable to resetting account, error: {0}'.format(e))
          
    return changed, result


def granting_account_permission(module, rds, db_instance_id, account_name, db_name, account_privilege):
    """
    Granting Account Permission

    :param module: Ansible module object
    :param rds: Authenticated rds connection object
    :param db_instance_id: Id of the Instance
    :param account_name: Name of an account
    :param db_name: Name of the database associated with this account
    :param account_privilege: Account permission. Values: ReadOnly and ReadWrite
    :return:
        changed: If permission granted successfully the changed will be set to True else False
        result: detailed server response
    """
    changed = False
    if not db_instance_id:
        module.fail_json(msg='db_instance_id is required for granting account permission')
    if not account_name:
        module.fail_json(msg='account_name is required for granting account permission')
    if not db_name:
        module.fail_json(msg='db_name is required for granting account permission')
    if not account_privilege:
        module.fail_json(msg='account_privilege is required for granting account permission')
    changed = False    
    try:
        changed, result = rds.granting_account_permission(db_instance_id=db_instance_id, account_name=account_name,
                                                          db_name=db_name, account_privilege=account_privilege)

        if 'error' in (''.join(str(result))).lower():
            module.fail_json(changed=changed, msg=result)

    except RDSResponseError as e:
        module.fail_json(msg='Unable to  granting account permission, error: {0}'.format(e))

    return changed, result


def revoking_account_permission(module, rds, db_instance_id, account_name, db_name):
    """

    :param module: Ansible module object
    :param rds: Authenticated rds connection object
    :param db_instance_id: Id of the Instance
    :param account_name: Name of an account
    :param db_name: Name of the database associated with this account
    :return:
        changed: If permission revoked successfully the changed will be set to True else False
        result: detailed server response
    """
    changed = False    
    try:
        if not db_instance_id:
            module.fail_json(msg='db_instance_id is required for revoking account permission')
        if not account_name:
            module.fail_json(msg='account_name is required for revoking account permission')
        if not db_name:
            module.fail_json(msg='db_name is required for revoking account permission')

        changed, result = rds.revoking_account_permission(db_instance_id=db_instance_id, account_name=account_name,
                                                          db_name=db_name)

        if 'error' in (''.join(str(result))).lower():
            module.fail_json(changed=changed, msg=result)

    except RDSResponseError as e:
        module.fail_json(msg='Unable to revoke account permission, error: {0}'.format(e))

    return changed, result


def main():
    argument_spec = ecs_argument_spec()
    argument_spec.update(dict(
        command=dict(default='create', choices=['create', 'delete', 'reset_password', 'reset', 'grant', 'revoke']),
        db_name=dict(type='str'), 
        db_instance_id=dict(type='str'),
        account_name=dict(type='str', aliases=['name']),
        account_password=dict(type='str', aliases=['password']),
        account_privilege=dict(aliases=['privilege'], choices=['ReadOnly', 'ReadWrite']),
        description=dict(type='str'),
        account_type=dict(default='Normal', type='str', choices=['Normal', 'normal', 'Super', 'super']),
    ))

    module = AnsibleModule(argument_spec=argument_spec)
    rds = rds_connect(module)
    region, acs_connect_kwargs = get_acs_connection_info(module)

    # Get values of variable
    command = module.params['command']
    db_instance_id = module.params['db_instance_id']
    account_name = module.params['account_name']
    account_password = module.params['account_password']
    account_privilege = module.params['account_privilege']
    description = module.params['description']
    account_type = module.params['account_type']
    db_name =  module.params['db_name']

    if command == 'create':

        (changed, result) = create_account(module=module, rds=rds, db_instance_id=db_instance_id,
                                           account_name=account_name, account_password=account_password,
                                           description=description, account_type=account_type)
        module.exit_json(changed=changed, result=result)
    elif command == 'delete':
        (changed, result) = delete_account(module, rds, db_instance_id, account_name)
        module.exit_json(changed=changed, result=result)

    elif command == 'reset_password':

        (changed, result) = resetting_instance_password(module=module, rds=rds, db_instance_id=db_instance_id,
                                                        account_name=account_name, account_password=account_password)
        module.exit_json(changed=changed, result=result)

    elif command == 'reset':

        (changed, result) = resetting_account(module=module, rds=rds, db_instance_id=db_instance_id,
                                              account_name=account_name, account_password=account_password)
        module.exit_json(changed=changed, result=result)

    elif command == 'grant':
        (changed, result) = granting_account_permission(module, rds, db_instance_id, account_name, db_name,
                                                        account_privilege)
        module.exit_json(changed=changed, result=result)    
    elif command == 'revoke':
        (changed, result) = revoking_account_permission(module, rds, db_instance_id, account_name, db_name)
        module.exit_json(changed=changed, result=result)  


from ansible.module_utils.basic import *
from ecsutils.ecs import *
main()
