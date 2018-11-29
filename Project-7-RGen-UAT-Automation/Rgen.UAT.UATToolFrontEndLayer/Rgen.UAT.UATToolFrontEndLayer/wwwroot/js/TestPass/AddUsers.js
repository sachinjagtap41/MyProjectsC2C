var AddUser = {

globTesterName:'',
testerEmail: '',
testerSPID:'',
testerFullName:'',
presentInGroup:0,
validUserFlag : 1,
sGroupName:'',
flagForStake:0,
flagForStakeNewRequest:0,
flagForTester:0,
logInUser:'',
logInUserFullName:'',
gBusinessOwnerGrpName:'UAT App BusinessOwners',//:SD
gIsBusinessOwner:false,//:SD
gOwnerGrp:'UAT App Owners',//:SD
gIsOwner:false,//:SD

getSiteURL:function()
{
	try
	{
		return _spPageContextInfo.webServerRelativeUrl;
	}
	catch(ex)
	{
		return $().SPServices.SPGetCurrentSite()+"/";
	}
},
GetGroups:function() 
{
	AddUser.GetLogInUserInfo();
	var groupName = '';
	var soapMessage = 	'<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
							    +'<GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							      +'<userLoginName>'+AddUser.logInUser+'</userLoginName>'
							    +'</GetGroupCollectionFromUser>'
							  +'</soap:Body>'
							+'</soap:Envelope>'						
	 //making a call with jQuery
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 type: "POST",  
		 async: false,
		 dataType: "xml",  
		 data: soapMessage,  
		 complete: GroupResults,  
		 contentType: "text/xml; charset=\"utf-8\"" 
 	});
 	function GroupResults(xmlHttpRequest, status)
	{
		if(status != 'error')
		{
			for(var i=0;i< $(xmlHttpRequest.responseText).find('Group').length; i++)
			{			
				if($($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name').indexOf("Members") != -1)
					AddUser.sGroupName = $($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name');
			}
			if($(xmlHttpRequest.responseText).find('Group').length == 1 && AddUser.sGroupName == '')
				groupName = $($(xmlHttpRequest.responseText).find('Group')).attr('Name');
		}	
	};
	if(AddUser.sGroupName == '')
	{
		var isUserAdmin = 0;
		var soapMessage = 	'<?xml version="1.0" encoding="utf-8"?>'
								+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
								  +'<soap:Body>'
								    +'<GetRolesAndPermissionsForCurrentUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />'
								  +'</soap:Body>'
								+'</soap:Envelope>'						
		 //making a call with jQuery
		 $.ajax
		 ({  
			 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
			 type: "POST",  
			 async: false,
			 dataType: "xml",  
			 data: soapMessage,  
			 complete: RoleResults,  
			 contentType: "text/xml; charset=\"utf-8\"" 
	 	});
	 	function RoleResults(xmlHttpRequest, status)
		{
			if(status != 'error')
			{
				$(xmlHttpRequest.responseText).find("Role").each(function () {
	                    if($(this).attr("Name") == "Full Control") 
	                        isUserAdmin = 1;
	                });
			}	
		};
		if(isUserAdmin == 1)
		{
			var soapMessage = 	'<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
							    +'<GetGroupCollectionFromRole xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							      +'<roleName>Contribute</roleName>'
							   +' </GetGroupCollectionFromRole>'
							  +'</soap:Body>'
							+'</soap:Envelope>'						
			 //making a call with jQuery
			 $.ajax
			 ({  
				 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
				 type: "POST",  
				 async: false,
				 dataType: "xml",  
				 data: soapMessage,  
				 complete: GroupResultswithRole,  
				 contentType: "text/xml; charset=\"utf-8\"" 
		 	}); 
		 	function GroupResultswithRole(xmlHttpRequest, status)
			{
				if(status != 'error')
				{
					for(var i=0;i< $(xmlHttpRequest.responseText).find('Group').length; i++)
					{			
						if($($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name').indexOf("Members") != -1)
							AddUser.sGroupName = $($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name'); 
					}
				}	
			};
		}
		if(AddUser.sGroupName == '')
		{
			if(groupName == '')
	   			AddUser.sGroupName = 'UATApp Members';
	   		else
	   			AddUser.sGroupName = groupName;	
	   	}
	}
	//When new site get created, UAT App owner group become owner of UAT App member group.So member of that group can't add any new user to their group. By adding UAT App Member group as an owner of their group then they can add users to group.
	$().SPServices({
	      operation: "UpdateGroupInfo",
	      oldGroupName:AddUser.sGroupName,
	      groupName:AddUser.sGroupName,
	      ownerIdentifier:AddUser.sGroupName,
	      ownerType:"group",
	      async: false,
	      completefunc: function(xData, Status) {
	      }
	   });	
	/*var soapMessage = 	'<?xml version="1.0" encoding="utf-8"?>'
							+'<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'
							  +'<soap12:Body>'
							    +'<UpdateGroupInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							      +'<oldGroupName>'+AddUser.sGroupName+'</oldGroupName>'
							      +'<groupName>'+AddUser.sGroupName+'</groupName>'
							      +'<ownerIdentifier>'+AddUser.sGroupName+'</ownerIdentifier>'
							      +'<description>Use this group to grant people contribute permissions to the SharePoint site</description>'
							      +'<ownerType>group</ownerType>'
							    +'</UpdateGroupInfo>'
							  +'</soap12:Body>'
							+'</soap12:Envelope>'						
	 //making a call with jQuery
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 type: "POST",  
		 async: false,
		 dataType: "xml",  
		 data: soapMessage,  
		 complete: GroupUpdateResults,  
		 contentType: "text/xml; charset=\"utf-8\"" 
 	});
 	function GroupUpdateResults(xmlHttpRequest, status)
	{
		//alert(status);
	};*/
},
GetLogInUserInfo:function() 
{
	 jQuery.support.cors = true;
	 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
				+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
				  +'<soap:Body>'
				    +'<GetCurrentUserInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/" />'
				  +'</soap:Body>'
				+'</soap:Envelope>'				
	 //making a call with jQuery
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 type: "POST",  
		 async: false,
		 dataType: "xml",  
		 data: soapMessage,  
		 complete: AddUser.LogInUserInfo,  
		 contentType: "text/xml; charset=\"utf-8\"" 
 	}); 
},

LogInUserInfo:function(xmlHttpRequest, status)
{
	if(status != 'error')
	{
		AddUser.logInUser = $(xmlHttpRequest.responseText).find('User').attr('LoginName');
		AddUser.logInUserFullName = $(xmlHttpRequest.responseText).find('User').attr('Name');
	}	
},
GetGroupNameforUser:function() 
{
	 jQuery.support.cors = true;
	 
	 //Constructing the call to a user profile using web services
	 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
						+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
						  +'<soap:Body>'
						    +'<GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
						      +'<userLoginName>'+AddUser.globTesterName+'</userLoginName>'
						    +'</GetGroupCollectionFromUser>'
						  +'</soap:Body>'
						+'</soap:Envelope>'
						
	 //making a call with jQuery
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 type: "POST",  
		 async: false,
		 dataType: "xml",  
		 data: soapMessage,  
		 complete: AddUser.GroupNameResult,  
		 contentType: "text/xml; charset=\"utf-8\"" 
 	}); 
},

GroupNameResult:function(xmlHttpRequest, status)
{
	var bGroupFound = false;
	
	if(status != 'error')
	{
		for(var i=0;i< $(xmlHttpRequest.responseText).find('Group').length; i++)
		{			
			if($($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name') == AddUser.sGroupName)
			{
				bGroupFound = true;
			}						
		}
		
		if(!bGroupFound)
		{
			AddUser.presentInGroup = 1;						
		}
		else
		{
			AddUser.addGroupStatus = 1;
		}
		AddUser.GetUserProperty();// Added by HRW for SP13
	}		
	else
	{
 		if(($(xmlHttpRequest.responseText).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseText).find('errorstring')[0].text  == "User cannot be found.") || ($(xmlHttpRequest.responseText).find('errorcode')[0].text == undefined && $(xmlHttpRequest.responseText).find('errorstring')[0].text  == undefined))
 		{
 			//alert('Not present in any group. Adding User in "TEST" Group');
			AddUser.AddUserToSharePointGroup();		
 		}	
	}
},

//Add User to Sharpoint group
AddUserToSharePointGroup:function()
{ 
	jQuery.support.cors = true;	
	 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
						+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
						  +'<soap:Body>'
						    +'<AddUserToGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
						      +'<groupName>'+AddUser.sGroupName+'</groupName>'
						      +'<userLoginName>'+AddUser.globTesterName+'</userLoginName>'						     
						    +'</AddUserToGroup>'
						  +'</soap:Body>'
						+'</soap:Envelope>'	 
						
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 beforeSend: function(xhr) 
		 {
	        xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/AddUserToGroup");
	     },
		 type: "POST",  
		 dataType: "xml",
		 async: false,
		 data: soapMessage,  
		 complete: AddUser.GroupAddingResults,  
		 contentType: "text/xml; charset=\"utf-8\"" 
	 }); 
},

addGroupStatus:0,
GroupAddingResults:function(xmlHttpRequest, status)
{
	if(status =='success')
	{
		AddUser.presentInGroup = 0;
		AddUser.addGroupStatus = 1;
		AddUser.GetUserProperty();
	}
	else
	{
		AddUser.addGroupStatus = 0;
	}
},

testerEmail: "",
testerSPID: "",
testerFullName: "",

GetUserProperty:function() 
{
		jQuery.support.cors = true;
		
		//constructing the call to a user profile using web services
		
		var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
							    +'<GetUserInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							      +'<userLoginName>'+AddUser.globTesterName+'</userLoginName>'
							    +'</GetUserInfo>'
							  +'</soap:Body>'
							+'</soap:Envelope>';
		
		 //making a call with jQuery
		 $.ajax
		 ({  
			 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
			 type: "POST",  
			 dataType: "xml",  
			 async: false,
			 data: soapMessage,  
			 complete: AddUser.displayProfileProperty,  
			 contentType: "text/xml; charset=\"utf-8\"" 
		 });  
},
displayProfileProperty:function(xmlHttpRequest, status)  
{  
	if(status == 'error')
	{
		if($(xmlHttpRequest.responseText).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseText).find('errorstring')[0].text  == "User cannot be found.")
		{
		}
	}
	else
	{
		AddUser.testerEmail = $($(xmlHttpRequest.responseText).find('User')[0]).attr('Email');
		AddUser.testerSPID = $($(xmlHttpRequest.responseText).find('User')[0]).attr('ID');
		AddUser.testerFullName = $($(xmlHttpRequest.responseText).find('User')[0]).attr('Name');
		if(AddUser.flagForStake == 1)
		{
			if($.inArray(AddUser.testerSPID,project.stakeholder_spUserId) == -1)
			{
				project.stakeholder_Name.push(AddUser.globTesterName);//Alias
				project.stakeholder_FullName.push(AddUser.testerFullName);
				project.stakeholder_spUserId.push(AddUser.testerSPID);
				project.stakeholder_EmailIDs.push(AddUser.testerEmail);
			}	
		}
		if(AddUser.flagForStakeNewRequest == 1)
		{
			if($.inArray(AddUser.testerSPID,request.stakeholder_spUserId) == -1)
			{
				request.stakeholder_Name.push(AddUser.testerFullName);
				request.stakeholder_spUserId.push(AddUser.testerSPID);
				request.stakeholder_Alias.push(AddUser.globTesterName);
				if(AddUser.testerEmail != undefined && AddUser.testerEmail != "")
					request.stakeholder_Email.push(AddUser.testerEmail);
				else
					request.stakeholder_Email.push("-");	
			}	
		}
		if(AddUser.flagForTester == 1)
		{
			if($.inArray(AddUser.testerSPID,request.testers_spUserId) == -1)
			{
				request.testers_Name.push(AddUser.testerFullName);
				request.testers_spUserId.push(AddUser.testerSPID);
				request.testers_Alias.push(AddUser.globTesterName);
				if(AddUser.testerEmail != undefined && AddUser.testerEmail != "")
					request.testers_Email.push(AddUser.testerEmail);
				else
					request.testers_Email.push("-");	
			}	
		}	

		AddUser.validUserFlag = 1;	
	}
},

//Added code to check for login user is present in 'BusinessOwners' group:SD
GetGroupNameToCheckForBusinessOwner:function(UserName) 
{
	 jQuery.support.cors = true;
	 
	 //Constructing the call to a user profile using web services
	 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
						+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
						  +'<soap:Body>'
						    +'<GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
						      +'<userLoginName>'+UserName+'</userLoginName>'
						    +'</GetGroupCollectionFromUser>'
						  +'</soap:Body>'
						+'</soap:Envelope>'
						
	 //making a call with jQuery
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 type: "POST",  
		 async: false,
		 dataType: "xml",  
		 data: soapMessage,  
		 complete: AddUser.CheckForBusinessOwner,  
		 contentType: "text/xml; charset=\"utf-8\"" 
 	}); 
},

//Added code to check for login user is present in 'BusinessOwners' group:SD
CheckForBusinessOwner:function(xmlHttpRequest, status)
{
	if(status != 'error')
	{
		for(var i=0;i< $(xmlHttpRequest.responseText).find('Group').length; i++)
		{			
			if($($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name') == AddUser.gBusinessOwnerGrpName)
			{
				AddUser.gIsBusinessOwner = true;

			}						
		}
		
	}		
	else
	{
 		if($(xmlHttpRequest.responseText).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseText).find('errorstring')[0].text  == "User cannot be found.")
 		{
 			//alert('Not present in Business owners group');
 		}	
	}
	
	
},
//Added code to check for login user is present in 'Owners' group:SD
GetGroupNameToCheckForDeployment:function(UserName) 
{
	 jQuery.support.cors = true;
	 
	 //Constructing the call to a user profile using web services
	 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
						+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
						  +'<soap:Body>'
						    +'<GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
						      +'<userLoginName>'+UserName+'</userLoginName>'
						    +'</GetGroupCollectionFromUser>'
						  +'</soap:Body>'
						+'</soap:Envelope>'
						
	 //making a call with jQuery
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 type: "POST",  
		 async: false,
		 dataType: "xml",  
		 data: soapMessage,  
		 complete: AddUser.CheckForDeployment,  
		 contentType: "text/xml; charset=\"utf-8\"" 
 	}); 
},

//Added code to check for login user is present in 'Owners' group:SD
CheckForDeployment:function(xmlHttpRequest, status)
{
	if(status != 'error')
	{
		for(var i=0;i< $(xmlHttpRequest.responseText).find('Group').length; i++)
		{			
			if($($(xmlHttpRequest.responseText).find('Group')[i]).attr('Name') == AddUser.gOwnerGrp)
			{
				AddUser.gIsOwner = true;

			}						
		}
		
	}		
	else
	{
 		if($(xmlHttpRequest.responseText).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseText).find('errorstring')[0].text  == "User cannot be found.")
 		{
 			//alert('Not present in Business owners group');
 		}	
	}
	
	
},

//Add User to Sharpoint group:Code added for DL/AD grp on tester tab:SD
AddUserToSharePointGroupForTester:function(userAlias)
{ 
	jQuery.support.cors = true;
	
	var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
						+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
						  +'<soap:Body>'
						    +'<AddUserToGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
						      +'<groupName>'+AddUser.sGroupName+'</groupName>'
						      +'<userLoginName>'+userAlias+'</userLoginName>'						     
						    +'</AddUserToGroup>'
						  +'</soap:Body>'
						+'</soap:Envelope>'	 
							
	 $.ajax
	 ({  
		 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
		 beforeSend: function(xhr) 
		 {
	        xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/AddUserToGroup");
	     },
		 type: "POST",  
		 dataType: "xml",
		 async: false,
		 data: soapMessage,  
		 complete: AddUser.GroupAddingResultsForTester,  
		 contentType: "text/xml; charset=\"utf-8\"" 
	 }); 
},
//Code added for DL/AD grp on tester tab:SD
GroupAddingResultsForTester:function(xmlHttpRequest, status)
{
	if(status =='success')
	{
		AddUser.addGroupStatus = 1;
	}
	else
	{
		AddUser.addGroupStatus = 0;
	}
},

//Code added for DL/AD grp on tester tab:SD
GetUserPropertyForTester:function(userAlias) 
{
		jQuery.support.cors = true;
		
		//constructing the call to a user profile using web services
		
		var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
							    +'<GetUserInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							       +'<userLoginName>'+userAlias+'</userLoginName>'
							    +'</GetUserInfo>'
							  +'</soap:Body>'
							+'</soap:Envelope>';
		
		 //making a call with jQuery
		 $.ajax
		 ({  
			 url: AddUser.getSiteURL()+'/_vti_bin/usergroup.asmx',  
			 type: "POST",  
			 dataType: "xml",  
			 async: false,
			 data: soapMessage,  
			 complete: AddUser.displayProfilePropertyForTester,  
			 contentType: "text/xml; charset=\"utf-8\"" 
		 });  
},
//Code added for DL/AD grp on tester tab:SD
displayProfilePropertyForTester:function(xmlHttpRequest, status)  
{  
	if(status == 'error')
	{
		if($(xmlHttpRequest.responseXML).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseXML).find('errorstring')[0].text  == "User cannot be found.")
		{
		}
	}
	else
	{
		AddUser.testerEmail = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('Email');
		AddUser.testerSPID = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('ID');
		AddUser.testerFullName = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('Name');
	}
}




}