/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var ResultFields={
/*All common page functionalities*/
uatItems:function(optionItemsVal,optionItemsTxt)
{
	//alert('optionItemsVal'+optionItemsVal);	
    var resultObj;
	if(optionItemsVal.indexOf('test')!=-1)
	{		
		resultObj=[];			
			 	var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');
				var Query1 ='<Query><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
			    var testItems =listN1.getSPItemsWithQuery(Query1).Items;
			  
		       if(testItems != null && testItems != undefined)
		       {			   
			   		///////////////////////////////////////   Added by HRW on 5 Dec 2012  ////////////////////////////////////////////////////////////////////////////
			   		var Query = '<Query></Query>';
			   		var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
					var ParentListResult = ParentList.getSPItemsWithQuery(Query).Items;
			
					var TestPassNameForTestPassID = new Array();
					var ProejctIDForTPID = new Array();
			
					var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
					var TestPassResult =  TestPassList.getSPItemsWithQuery(Query).Items;
					//Collection Framework for getting a Test Pass Name for Test Pass ID 
					if(TestPassResult !=null && TestPassResult !=undefined)
					{
						for(var i=0;i<TestPassResult.length;i++)
						{
							TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
							ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
						}	
					}	
					var TesterNameForSPUserID = new Array();
					var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
					var TesterResult =  TesterList.getSPItemsWithQuery(Query).Items;
					//Collection Framework for getting a Tester Name for SPUserID 
					if(TesterResult !=null && TesterResult !=undefined)
					{
						for(var i=0;i<TesterResult.length;i++)
							TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
					}
					//Collection Framework for getting a Test Case Name for TestCaseID 
					var TestCaseNameForTestCaseID = new Array();
					for(var ii=0;ii<testItems.length;ii++)
						TestCaseNameForTestCaseID[testItems[ii]['ID']] = testItems[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
			   		
			   		if(ParentListResult != null && ParentListResult != undefined)
			   		{
			   			for(var i=0;i<ParentListResult.length;i++)
			   			{
			   				   var testId=ParentListResult[i]["TestCaseID"];
					   		   var projectID=ProejctIDForTPID[ParentListResult[i]['TestPassID']];
			   				   var associatedTPName=TestPassNameForTestPassID[ParentListResult[i]['TestPassID']];
			   				   var TesterName= TesterNameForSPUserID[ParentListResult[i]['SPUserID']];	
			   				   var testName=TestCaseNameForTestCaseID[ParentListResult[i]['TestCaseID']];
			   				   var status= ParentListResult[i]["status"];
			   				   var dueDate= "N/A";
			   				   var assignTo= 'N/A';//testItems [i]["assignedTo"];
							   var priority= 'N/A';//testItems [i]["priority"];
							   var state= 'N/A';//testItems [i]["state"];  	  					   									     					    					   
							
							 var redirect=Search.getURL()+'/testcase_1.aspx?pid='+projectID;
							 ResultView.resultType='TestCase';		  					  
							 resultObj.push({id:testId,name:testName,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,queryType:"UAT Items- Test cases",redirect:redirect,associatedTPName:associatedTPName,TesterName:TesterName});												
			   			}
			   		}
			   		
			   		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			   		
			   						
				}
			    
  			    var	queryResult=ResultView.getQueryResultView(resultObj,optionItemsTxt);							
				return queryResult;		
		}
			
		if(optionItemsVal.indexOf('scenario')!=-1)
		{		
				resultObj=[];
				var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
				var Query1 ='<Query><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
			    var testItems =listN1.getSPItemsWithQuery(Query1).Items;	

				////////////////////////////////// Added by Harshal on 22 March/////////////////////////////////////////////////////////////////////////
				  if(testItems!=null)
				  {
					  for(var i=0;i<testItems .length;i++)
					  {
					  
					      /*
						  var NotCompletedFlag = false;
						  var PassFlag = false;
						  var FailFlag = false;
						  var testPassMapList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
						  var testPassMapQuery='<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testItems[i]["ID"]+'</Value></Eq></Where><ViewFields><FieldRef Name="status"/></ViewFields></Query>';
						  var testPassMapItems = testPassMapList.getSPItemsWithQuery(testPassMapQuery).Items;
						  if((testPassMapItems != 'undefined') && (testPassMapItems != null))
						  {  
						      for(var x=0;x<testPassMapItems.length;x++)
						     {
						     	if(testPassMapItems[x]['status'] == "Fail")
						     	{
						     		FailFlag = true;
						     		break;
								}
						     	if(testPassMapItems[x]['status'] == "Not Completed")
						     	{
						     		NotCompletedFlag = true;
						     	}
								if(testPassMapItems[x]['status'] == "Pass")
						     	{
						     		PassFlag = true;
						     	}
									
							 }
							 
							 
							 if(FailFlag == true)
							 	var status = "Fail";
							 else if(NotCompletedFlag == true)
							 		var status = "Not Complete";
							 			else if(PassFlag == true)
							 				var status = "Pass";
						  }
						  else
		  					var status = "Not Complete";
		  					
		  					*/

						   var scenarioId=testItems[i]["ID"];					
						   var scenarioName=( (testItems[i]["TestPassName"]!=null)&&(testItems[i]["TestPassName"]!=undefined) ) ? testItems[i]["TestPassName"] : '-';
					
						   var dueDate= ( (testItems[i]["DueDate"]!=null)&&(testItems[i]["DueDate"]!=undefined) ) ? testItems[i]["DueDate"] : '-';
						   //var assignTo= ( (testItems[i]["Tester"]!=null)&&(testItems[i]["Tester"]!=undefined) ) ? testItems[i]["Tester"] : '-';
						   var assignTo= ( (testItems[i]["tstMngrFulNm"]!=null)&&(testItems[i]["tstMngrFulNm"]!=undefined) ) ? testItems[i]["tstMngrFulNm"] : '-';
						   
						   Search.projectID= ( (testItems[i]["ProjectId"]!=null)&&(testItems[i]["ProjectId"]!=undefined) ) ? testItems[i]["ProjectId"] : '-';	  
						   var status = testItems[i]["Status"];			   			  	  
							  
							type='UAT Items- TestPass(es)';  				   
							   
						  ResultView.resultType="TestPass";
						  if($.inArray("1",security.userType) != -1)
						     redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+"&tpid="+scenarioId+'&edit=1';
						  else
						  {
						  	 var userAsso = security.userAssociationForProject[Search.projectID];
						  	 if(userAsso != undefined)
							 { 	 if($.inArray('2',userAsso.split(",")) != -1 || $.inArray('5',userAsso.split(",")) != -1)
							  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+"&tpid="+scenarioId+'&edit=1';
							  	 else if(_spUserId == testItems[i]["SPUserID"])
							  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+"&tpid="+scenarioId+'&edit=1';
							  	 	else
							  	 		redirect = '';
							 }
							 else
							 	redirect = ''; 	 		
						  } 	   
							 	     			  
						  resultObj.push({id:scenarioId,name:scenarioName,status:status,dueDate:dueDate,assignTo:assignTo,queryType:type,redirect:redirect});	
					   }  
				  }
					var queryResult=ResultView.getQueryResultView(resultObj,optionItemsTxt);						
			   		return queryResult;	
				
				///////////////////////////////////////////////////////////////////////////////////////////////////////////
			 			
		}
		
		if(optionItemsVal.indexOf('action')!=-1){		
				resultObj=[];
			
			 	var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');
				var Query1 ='<Query><OrderBy><FieldRef Name="actionID" Ascending="true"/></OrderBy></Query>';
			    var testItems =listN1.getSPItemsWithQuery(Query1).Items;				

				var scenarioIdForProj;	
				var type="";
			   	var redirect;
				if(testItems!=null && testItems!=undefined)
			   	{
					//Added by HRW on 5 Nov 2012
					var TestStepNameForTSID = new Array();
					var TSID = new Array();
					
					
					for(var i=0;i<testItems.length;i++)
					{
						TestStepNameForTSID[testItems[i]['ID']] = testItems[i]['actionName'];
					}
					var ChildList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping');
					var Query = '<Query></Query>';
					var ChildListResult = ChildList.getSPItemsWithQuery(Query).Items;
					
					var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
					var ParentListResult = ParentList.getSPItemsWithQuery(Query).Items;
			
					var TestPassNameForTestPassID = new Array();
					var ProejctIDForTPID = new Array();
			
					var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
					var TestPassResult =  TestPassList.getSPItemsWithQuery(Query).Items;
					//Collection Framework for getting a Test Pass Name for Test Pass ID 
					if(TestPassResult !=null && TestPassResult !=undefined)
					{
						for(var i=0;i<TestPassResult.length;i++)
						{
							TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
							ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
						}	
					}	
					var TesterNameForSPUserID = new Array();
					var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
					var TesterResult =  TesterList.getSPItemsWithQuery(Query).Items;
					//Collection Framework for getting a Tester Name for SPUserID 
					if(TesterResult !=null && TesterResult !=undefined)
					{
						for(var i=0;i<TesterResult.length;i++)
						{
								TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
						}		
					}
					var TestCaseNameForTestCaseID = new Array();
					var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
					var TestCaseResult =  TestCaseList.getSPItemsWithQuery(Query).Items; 
					
					if(TestCaseResult !=null && TestCaseResult!=undefined)
					{
						for(var ii=0;ii<TestCaseResult.length;ii++)
						{
							TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] = TestCaseResult[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
						}
					}
				
					var TesterNameTCNameTPNameForParentID = new Array(); 	
					for(var i=0;i<ParentListResult.length;i++)
					{
						TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] = TesterNameForSPUserID[ParentListResult[i]['SPUserID']] +"`"+ TestCaseNameForTestCaseID[ParentListResult[i]['TestCaseID']] +"`"+ TestPassNameForTestPassID[ParentListResult[i]['TestPassID']];
					}
					
					/*To get the Role name by Role ID :Ejaz Waquif DT:5/22/2014*/
					var roleNameByRoleIDArr = new Array();
					roleNameByRoleIDArr[1] = "Standard";
					
					var testerRoleList = jP.Lists.setSPObject(Main.getSiteUrl(),'TesterRole');
					var testerRoleResult =  testerRoleList.getSPItemsWithQuery(Query).Items; 
					
					
					if(testerRoleResult!=undefined )
					{
						var testerRoleResultLen = testerRoleResult.length;
						for(var i=0;i<testerRoleResultLen;i++)
						{
							roleNameByRoleIDArr[parseInt(testerRoleResult[i]["ID"])] = testerRoleResult[i]["Role"];
						
						}
					}
					/*To get the Role name by Role ID :Ejaz Waquif DT:5/22/2014*/
					
					for(var i=0;i<ChildListResult.length;i++)
					{
						var associatedTCName = '--';
			    		var associatedTPName = '--';
			    		var TesterName = '--';
			    			
						if(TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']]!=undefined)
		   	    		{
			   	    		 var testId = ChildListResult[i]["TestStep"];
							 var status = ChildListResult[i]['status'];
							 if(TestStepNameForTSID[ ChildListResult[i]['TestStep'] ] != undefined)
								var testName = TestStepNameForTSID[ ChildListResult[i]['TestStep'] ];
							 else
								var testName = "N/A";
			   	    		 associatedTCName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[1];
			   	    		 associatedTPName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[2];
			   	    		 TesterName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[0];
			   	    		 var role = roleNameByRoleIDArr[ parseInt(ChildListResult[i]['Role']) ];
			   	    		 
			   	    		 type='Name-Test step(s)'; 
			    		 
					 		ResultView.resultType="TestStep";
				
							resultObj.push({id:testId,name:testName,status:status,associatedTCName:associatedTCName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect,associatedRoleName:role});													
			   	    	}
			   	    	
			    		
					}
				
				
			}	
			var queryResult=ResultView.getQueryResultView(resultObj,optionItemsTxt);						
			return queryResult;	

		}
		if(optionItemsVal.indexOf('UIversion')!=-1)
	    {		
				resultObj=[];			
			 	var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'Project');
				var Query1 ='<Query><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
			    var testItems =listN1.getSPItemsWithQuery(Query1).Items;
			  
		       if(testItems != null && testItems != undefined)
		       {			 
		       
					for(var i=0;i<testItems .length;i++)
					{	
					   		var id=testItems[i]["ID"];					
				       	    Search.projectID=id;
				       	    var name=( (testItems[i]["projectName"]!=null)&&(testItems[i]["projectName"]!=undefined) ) ? testItems[i]["projectName"] : '-';
				
				       	    var status= ( (testItems[i]["status"]!=null)&&(testItems[i]["status"]!=undefined) ) ? testItems[i]["status"] : '-';
				       	    var dueDate= ( (testItems[i]["dueDate"]!=null)&&(testItems[i]["dueDate"]!=undefined) ) ? testItems[i]["dueDate"] : '-';
				            	       				
				  			var assignTo= ( (testItems[i]["projectLead"]!=null)&&(testItems[i]["projectLead"]!=undefined) ) ? testItems[i]["projectLead"] : '-';
				  			var priority= 'N/A';
				  			
				  			var version=( (testItems[i]["ProjectVersion"]!=null)&&(testItems[i]["ProjectVersion"]!=undefined) ) ? testItems[i]["ProjectVersion"] : 'Default '+gConfigVersion;
				  			
				  			var state= 'Created';

  
							type='UAT Items- Versions'; 
			    		 
					 		ResultView.resultType="version";

							 if($.inArray("1",security.userType) != -1)
						     	redirect=Search.getURL()+'/ProjectMgnt_1.aspx?pid='+(id)+'&edit=1';
						    else
						    {
						  	 var userAsso = security.userAssociationForProject[id];
						  	 if(userAsso != undefined)
							 { 	 if($.inArray('2',userAsso.split(",")) != -1 || $.inArray('3',userAsso.split(",")) != -1 || $.inArray('5',userAsso.split(",")) != -1)
							  	 	redirect=Search.getURL()+'/ProjectMgnt_1.aspx?pid='+(id)+'&edit=1';
							 }
							 else
							 	redirect = ''; 	 		
						    }     	
							 resultObj.push({id:id,version:version,name:name,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,queryType:type,redirect:redirect});												
			   			}
			   	}
			   		
			   		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			    
  			    var	queryResult=ResultView.getQueryResultView(resultObj,optionItemsTxt);							
				return queryResult;		
		}
		
		
},

searchName:function(textInputVal,fieldSearch,opr){
		 
	 resultObj=Search.searchName(textInputVal,fieldSearch,opr);	
	 var queryResult=ResultView.getQueryResultView(resultObj,'Name');						
	 return queryResult;	
	 
},
searchTestPasses:function(textInputVal,fieldSearch,opr){
		 
	 resultObj=Search.searchTestPasses(textInputVal,fieldSearch,opr);	
	 var queryResult=ResultView.getQueryResultView(resultObj,'Name');						
	 return queryResult;	
	 
},
searchTestCases:function(textInputVal,fieldSearch,opr){
		 
	 resultObj=Search.searchTestCases(textInputVal,fieldSearch,opr);	
	 var queryResult=ResultView.getQueryResultView(resultObj,'Name');						
	 return queryResult;	
	 
},
searchTestSteps:function(textInputVal,fieldSearch,opr){
		 
	 resultObj=Search.searchTestSteps(textInputVal,fieldSearch,opr);	
	 var queryResult=ResultView.getQueryResultView(resultObj,'Name');						
	 return queryResult;	
	 
},



getQueryResults:function(textInputVal,fieldSearch,opr){
	
	 var results=Search.getQueryResults(textInputVal,fieldSearch,opr);		 	
	 return results;	
},

freeTextResult:function(textInputVal,fieldSearch,opr)
{
	var resultObj=[];
	var type="";
   	var redirect;
	//For Project
	var projectList = jP.Lists.setSPObject(Main.getSiteUrl(),'Project');
	
	var str = "Default "+gConfigVersion;
	//var str = "Default Version";
	if(isPortfolioOn && str.toLowerCase().indexOf(textInputVal.toLowerCase())!= -1 && $.trim(textInputVal)!="" )
	{
		queryOnProjectList ='<Query><Where><Or><Contains><FieldRef Name="projectName" /><Value Type="Text">'+textInputVal+'</Value></Contains><Or><Contains><FieldRef Name="ProjectVersion" /><Value Type="Text">'+textInputVal+'</Value></Contains><IsNull><FieldRef Name="ProjectVersion" /></IsNull></Or></Or></Where></Query>';
	}
	else
		var queryOnProjectList = '<Query><Where><Or><Contains><FieldRef Name="projectName" /><Value Type="Text">'+textInputVal+'</Value></Contains><Contains><FieldRef Name="ProjectVersion" /><Value Type="Text">'+textInputVal+'</Value></Contains></Or></Where></Query>';
	var projectItems = projectList.getSPItemsWithQuery(queryOnProjectList).Items;
	
	if(projectItems!=null && projectItems!=undefined)
	{	   		  
   		for(var i=0;i<projectItems.length;i++)
   		{
	   		var id=projectItems[i]["ID"];					
	   	    Search.projectID=id;
	   	    var name=( (projectItems[i]["projectName"]!=null)&&(projectItems[i]["projectName"]!=undefined) ) ? projectItems[i]["projectName"] : '-';
	
	   	    var status= ( (projectItems[i]["status"]!=null)&&(projectItems[i]["status"]!=undefined) ) ? projectItems[i]["status"] : '-';
	   	    var dueDate= ( (projectItems[i]["dueDate"]!=null)&&(projectItems[i]["dueDate"]!=undefined) ) ? projectItems[i]["dueDate"] : '-';
	        	       				
			var assignTo= ( (projectItems[i]["projectLead"]!=null)&&(projectItems[i]["projectLead"]!=undefined) ) ? projectItems[i]["projectLead"] : '-';
			var priority= 'N/A';
			
			var version =( (projectItems[i]["ProjectVersion"]!=null)&&(projectItems[i]["ProjectVersion"]!=undefined) ) ? projectItems[i]["ProjectVersion"] : 'Default '+gConfigVersion;
			type='Name-Project(s) and Version(s)';  				   
			ResultView.resultType="Project";
	       	redirect=Search.getURL()+'/ProjectMgnt_1.aspx?pid='+id+'&edit=1';	
	       	if($.inArray("1",security.userType) != -1)
		     redirect=Search.getURL()+'/ProjectMgnt_1.aspx?pid='+(id)+'&edit=1';
		   else
		   {
		  	 var userAsso = security.userAssociationForProject[id];
		  	 if(userAsso != undefined)
			 { 	 if($.inArray('2',userAsso.split(",")) != -1 || $.inArray('3',userAsso.split(",")) != -1 || $.inArray('5',userAsso.split(",")) != -1)
			  	 	redirect=Search.getURL()+'/ProjectMgnt_1.aspx?pid='+(id)+'&edit=1';
			  	 else
			  	 	redirect = '';	
			 }
			 else
			 	redirect = ''; 	 		
		   }     			
			resultObj.push({id:id,version:version,name:name,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,queryType:type,redirect:redirect});	
		}												
	}
	//For Test Pass
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
  var Query1 = '<Query><Where><Contains><FieldRef Name="TestPassName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
  var testItems = TestPassList.getSPItemsWithQuery(Query1).Items;	
  if(testItems!=null)
  {
	  for(var i=0;i<testItems .length;i++)
	  {
		  /*
		  var NotCompletedFlag = false;
		  var PassFlag = false;
		  var FailFlag = false;
		  var testPassMapList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
		  var testPassMapQuery='<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testItems[i]["ID"]+'</Value></Eq></Where><ViewFields><FieldRef Name="status"/></ViewFields></Query>';
		  var testPassMapItems = testPassMapList.getSPItemsWithQuery(testPassMapQuery).Items;
		  if((testPassMapItems != undefined) && (testPassMapItems != null))
		  {  
		     for(var x=0;x<testPassMapItems.length;x++)
		     {
		     	if(testPassMapItems[x]['status'] == "Not Completed")
		     	{
		     		NotCompletedFlag = true;
		     		break;
				}
				if(testPassMapItems[x]['status'] == "Pass")
		     	{
		     		PassFlag = true;
		     	}
				if(testPassMapItems[x]['status'] == "Fail")
		     	{
		     		FailFlag = true;
				}	
			 }
			 if(NotCompletedFlag == true)
			 	var status = "Not Complete";
			 if(PassFlag == true && FailFlag == false)
			 	var status = "Fail";
			 if(FailFlag == true)
			 	var status = "Pass";
		  }
		  else
		  	var status = "Not Complete";
		  	*/
		  	
		   var scenarioId=testItems[i]["ID"];					
		   var scenarioName=( (testItems[i]["TestPassName"]!=null)&&(testItems[i]["TestPassName"]!=undefined) ) ? testItems[i]["TestPassName"] : '-';
	
		   var dueDate= ( (testItems[i]["DueDate"]!=null)&&(testItems[i]["DueDate"]!=undefined) ) ? testItems[i]["DueDate"] : '-';
		   //var assignTo= ( (testItems[i]["Tester"]!=null)&&(testItems[i]["Tester"]!=undefined) ) ? testItems[i]["Tester"] : '-';
		   var assignTo= ( (testItems[i]["tstMngrFulNm"]!=null)&&(testItems[i]["tstMngrFulNm"]!=undefined) ) ? testItems[i]["tstMngrFulNm"] : '-';
		   Search.projectID= ( (testItems[i]["ProjectId"]!=null)&&(testItems[i]["ProjectId"]!=undefined) ) ? testItems[i]["ProjectId"] : '-';	
		   var status = testItems[i]["Status"]; 			   			  	  
			  
			type='Name-TestPass(es)';  				   
			   
		  ResultView.resultType="TestPass";	   
		  if($.inArray("1",security.userType) != -1)
		     redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+"&tpid="+scenarioId+'&edit=1';
		  else
		  {
		  	 var userAsso = security.userAssociationForProject[Search.projectID];
		  	 if(userAsso != undefined)
			 { 	 if($.inArray('2',userAsso.split(",")) != -1 || $.inArray('5',userAsso.split(",")) != -1)
			  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+"&tpid="+scenarioId+'&edit=1';
			  	 else if(_spUserId == testItems[i]["SPUserID"])
			  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+"&tpid="+scenarioId+'&edit=1';
			  	 	else
			  	 		redirect = '';
			 }
			 else
			 	redirect = ''; 	 		
		  }	     			  
		  resultObj.push({id:scenarioId,name:scenarioName,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,queryType:type,redirect:redirect});	
	   }  
  }  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////			
   
	//For Test Case  
	var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');	
	var Query1 = '<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where></Query>';
	var testItems = TestCaseList.getSPItemsWithQuery(Query1).Items;	
	if(testItems!=null && testItems!=undefined)
	{
		var TestCaseNameForTCID = new Array(); 
		var allTestPassIDs = new Array();
		var TestCasesID = new Array();
		for(var i=0;i<testItems.length;i++)
		{
			TestCaseNameForTCID[ testItems[i]['ID'] ] = testItems[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
			var testPassID = testItems[i]['TestPassID'].split(",");
			for(var m=0;m<testPassID.length;m++)
			{
				if($.inArray(testPassID[m],allTestPassIDs) == -1)
					allTestPassIDs.push(testPassID[m]);//To get all the Associated Test Pass IDs for Test Case(s) 
			}
			TestCasesID.push(testItems[i]['ID']);
		}
		//Query on Test Pass List & Tester List to get name of Test Pass & Tester resp.
		//Two queries on Test Pass List and Tester List resp. are created in same 'for loop' to save iterations
		var TestPassNameForTestPassID = new Array();
		var ProejctIDForTPID = new Array();
		var TesterNameForSPUserID = new Array();
		var TesterSPUserID = new Array();
		var TestPassResult;
		var TesterResult;
		if(allTestPassIDs.length<=147)
		{
 			var camlQueryForTestPassList='';
 			var camlQueryForTesterList='';
				camlQueryForTestPassList = '<Query><Where>';
				camlQueryForTesterList = '<Query><Where>';
				for(var i=0;i<allTestPassIDs.length-1;i++)			 
				{
					camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
				}	
				camlQueryForTestPassList+= '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
				camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
				for(var i=0;i<allTestPassIDs.length-1;i++)
				{
					camlQueryForTestPassList+='</Or>';
					camlQueryForTesterList+='</Or>';
				}	
				camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';
				camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';
				
			var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
			var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
			
			//Collection Framework for getting a Test Pass Name for Test Pass ID 
			if(TestPassResult !=null && TestPassResult !=undefined)
			{
				for(var i=0;i<TestPassResult.length;i++)
				{
					TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
					ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
				}	
			} 
			
			var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
			var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
			
			//Collection Framework for getting a Tester Name for SPUserID 
			if(TesterResult !=null && TesterResult !=undefined)
			{
				for(var i=0;i<TesterResult.length;i++)
				{
					if($.inArray(TesterResult[i]['SPUserID'],TesterSPUserID) == -1)
					{
						TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
						TesterSPUserID.push(TesterResult[i]['SPUserID']);
					}
				}		
			}
		}
		else
		{
			var iteration= Math.ceil((allTestPassIDs.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
          	var iterationStartPoint=0;

          	for(var y=0;y<iteration;y++)
          	{
				if(y!=iteration-1)
	          	{
	          		var camlQueryForTestPassList = '<Query><Where>';
	          		var camlQueryForTesterList = '<Query><Where>';		
	          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
	          		{
						camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
						camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
					}
					camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
					for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
					{
						camlQueryForTestPassList+='</Or>';
						camlQueryForTesterList+='</Or>';
					}
					camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';	
					camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';			
	                
	                iterationStartPoint+=147;
					 //////
	            
					var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
					var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
					
					//Collection Framework for getting a Test Pass Name for Test Pass ID 
					if(TestPassResult !=null && TestPassResult !=undefined)
					{
						for(var ii=0;ii<TestPassResult.length;ii++)
						{
							TestPassNameForTestPassID[TestPassResult[ii]['ID']] = TestPassResult[ii]['TestPassName'];
							ProejctIDForTPID[TestPassResult[ii]['ID']] = TestPassResult[ii]['ProjectId'];
						}	
					} 
					
					var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
					var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
					
					//Collection Framework for getting a Tester Name for SPUserID 
					if(TesterResult !=null && TesterResult !=undefined)
					{
						for(var ii=0;ii<TesterResult.length;ii++)
						{
							if($.inArray(TesterResult[ii]['SPUserID'],TesterSPUserID) == -1)
							{
								TesterNameForSPUserID[TesterResult[ii]['SPUserID']] = TesterResult[ii]['TesterName'];
								TesterSPUserID.push(TesterResult[ii]['SPUserID']);
							}
						}		
					}
				}
				else
				{
					var camlQueryForTestPassList = '<Query><Where>';
					var camlQueryForTesterList = '<Query><Where>';
					for(var w=iterationStartPoint;w<(allTestPassIDs.length)-1;w++)
					{
						camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
						camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[w]+'</Value></Eq>';
					}
					camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
					camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[w]+'</Value></Eq>';
					for(var w=iterationStartPoint;w<(allTestPassIDs.length)-1;w++)
					{
						camlQueryForTestPassList+='</Or>';
						camlQueryForTesterList+='</Or>';
					}	
					camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';
					camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';
									
		         	var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
					var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
					
					//Collection Framework for getting a Test Pass Name for Test Pass ID 
					if(TestPassResult !=null && TestPassResult !=undefined)
					{
						for(var i=0;i<TestPassResult.length;i++)
						{
							TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
							ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
						}	
					} 
					
					var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
					var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
					
					//Collection Framework for getting a Tester Name for SPUserID 
					if(TesterResult !=null && TesterResult !=undefined)
					{
						for(var i=0;i<TesterResult.length;i++)
						{
							if($.inArray(TesterResult[i]['SPUserID'],TesterSPUserID) == -1)
							{
								TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
								TesterSPUserID.push(TesterResult[i]['SPUserID']);
							}
						}		
					}
  
		     	}		
      		}
		
		}
		var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
		var ParentListResult;
		if(TestCasesID.length<=147)
		{
			var QueryOnTPToTCList='';
			QueryOnTPToTCList= '<Query><Where>';
			for(var i=0;i<TestCasesID.length-1;i++)			 
				QueryOnTPToTCList+='<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
			QueryOnTPToTCList+= '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
			for(var i=0;i<TestCasesID.length-1;i++)
				QueryOnTPToTCList+='</Or>';
			QueryOnTPToTCList+='</Where><ViewFields></ViewFields></Query>';
			ParentListResult = ParentList.getSPItemsWithQuery(QueryOnTPToTCList).Items;
		}
		else
		{
			var iteration= Math.ceil((TestCasesID.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
          	var iterationStartPoint=0;
          	ParentListResult = new Array();
          	for(var y=0;y<iteration;y++)
          	{
				if(y!=iteration-1)
	          	{
	          		var QueryOnTPToTCList= '<Query><Where>';	
	          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
						QueryOnTPToTCList+='<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
					QueryOnTPToTCList+= '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
					for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
						QueryOnTPToTCList+='</Or>';
					QueryOnTPToTCList+='</Where><ViewFields></ViewFields></Query>';				
	                
	                iterationStartPoint+=147;
					 //////
					 var ParentListResult2 = ParentList.getSPItemsWithQuery(QueryOnTPToTCList).Items;
					 if(ParentListResult2 !=null && ParentListResult2 !=undefined)
					 {
					 	for(var j=0;j<ParentListResult2.length;j++)
					 		ParentListResult.push(ParentListResult2[j]);
					 }		
	            }
				else
				{
					var QueryOnTPToTCList= '<Query><Where>';
					for(var w=iterationStartPoint;w<(TestCasesID.length)-1;w++)
						QueryOnTPToTCList+='<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[w]+'</Value></Eq>';
					QueryOnTPToTCList+= '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[w]+'</Value></Eq>';
					for(var w=iterationStartPoint;w<(TestCasesID.length)-1;w++)
						QueryOnTPToTCList+='</Or>';
					QueryOnTPToTCList+='</Where><ViewFields></ViewFields></Query>';
					 var ParentListResult2 = ParentList.getSPItemsWithQuery(QueryOnTPToTCList).Items;
					 if(ParentListResult2 !=null && ParentListResult2 !=undefined)
					 {
					 	for(var j=0;j<ParentListResult2.length;j++)
					 		ParentListResult.push(ParentListResult2[j]);
					 }
				}		
      		}
		}
		if(ParentListResult!=null && ParentListResult!=undefined)
		{
			for(var i=0;i<ParentListResult.length;i++)
			{
				var testId = ParentListResult[i]["TestCaseID"];					
	       	    var testName = TestCaseNameForTCID[ ParentListResult[i]["TestCaseID"] ];
	       	    var status = ParentListResult[i]["status"];
	       	   	var associatedTPName = TestPassNameForTestPassID[ ParentListResult[i]["TestPassID"] ];
				var TesterName = TesterNameForSPUserID[ ParentListResult[i]['SPUserID'] ];
			
				type='Name-Test case(s)'; 
				
				Search.projectID = ProejctIDForTPID[ ParentListResult[i]["TestPassID"] ];
	  			redirect=Search.getURL()+'/testcase_1.aspx?pid='+(Search.projectID);  
		 		ResultView.resultType="TestCase";
	
				var associatedTPName = TestPassNameForTestPassID[ParentListResult[i]["TestPassID"]];
				resultObj.push({id:testId,name:testName,status:status,queryType:type,redirect:redirect,associatedTPName:associatedTPName,TesterName:TesterName});													
	
			}
		}
			
	}
	//For Test Step
	
	var TestStepList = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');	
	var Query1 = '<Query><Where><Contains><FieldRef Name="actionName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where></Query>';
	var testItems =TestStepList.getSPItemsWithQuery(Query1).Items;
	var ParentListResult = new Array();
	var uniqueRoleIDArr = new Array();
   	var roleNameByRoleIDArr = new Array();
   	roleNameByRoleIDArr[1] = "Standard";

	if(testItems!=null && testItems!=undefined)
   	{
		var TestStepNameForTSID = new Array();
		var TSID = new Array();
		for(var i=0;i<testItems.length;i++)
		{
			if($.inArray(testItems[i]['TestStep'],TSID)==-1)
			{	
				TestStepNameForTSID[testItems[i]['ID']] = testItems[i]['actionName'];
				TSID.push(testItems[i]['ID']);
			}	
		}
		var ChildList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping');
		var ChildListResult;
		var uniqueParentID = new Array();
		if(TSID.length<=147)
		{
			var QueryOnTCToTSList ='';
			QueryOnTCToTSList = '<Query><Where>';
			var orEndTags='';
			for(var i=0;i<TSID.length-1;i++)
			{			 
				QueryOnTCToTSList +='<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[i]+'</Value></Eq>';
				orEndTags+='</Or>';
			}
			QueryOnTCToTSList += '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[i]+'</Value></Eq>';
			QueryOnTCToTSList +=orEndTags;
			QueryOnTCToTSList +='</Where><ViewFields></ViewFields></Query>';
			ChildListResult = ChildList.getSPItemsWithQuery(QueryOnTCToTSList).Items;
			if(ChildListResult!=null && ChildListResult!=undefined)
			{
				for(var i=0;i<ChildListResult.length;i++)
				{
					if($.inArray(ChildListResult[i]['TestPassMappingID'],uniqueParentID)==-1)
						uniqueParentID.push(ChildListResult[i]['TestPassMappingID']);
						
					if($.inArray(ChildListResult[i]['Role'],uniqueRoleIDArr)==-1)
						uniqueRoleIDArr.push( parseInt( ChildListResult[i]["Role"] ) );	

	
				}
			}
			
		}
		else
		{
			ChildListResult = new Array();
			var iteration= Math.ceil((TSID.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
          	var iterationStartPoint=0;
          	var orEndTags;
          	for(var y=0;y<iteration;y++)
          	{
				if(y!=iteration-1)
	          	{
	          		var QueryOnTCToTSList = '<Query><Where>';
	          		orEndTags='';	
	          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
	          		{
						QueryOnTCToTSList +='<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[i]+'</Value></Eq>';
						orEndTags+='</Or>';
					}
					QueryOnTCToTSList += '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[i]+'</Value></Eq>';
					QueryOnTCToTSList +=orEndTags;
					QueryOnTCToTSList +='</Where><ViewFields></ViewFields></Query>';				
	                
	                iterationStartPoint+=147;
					 //////
					 var ChildListResult2 = ChildList.getSPItemsWithQuery(QueryOnTCToTSList).Items;
					 if(ChildListResult2 !=null && ChildListResult2 !=undefined)
					 {
					 	for(var j=0;j<ChildListResult2.length;j++)
					 	{
					 		ChildListResult.push(ChildListResult2[j]);
					 		if($.inArray(ChildListResult2[j]['TestPassMappingID'],uniqueParentID)==-1)
								uniqueParentID.push(ChildListResult2[j]['TestPassMappingID']);
								
							if($.inArray(ChildListResult[i]['Role'],uniqueRoleIDArr)==-1)
								uniqueRoleIDArr.push( parseInt( ChildListResult[i]["Role"] ) );	

					 	}	
					 }		
	            }
				else
				{
					var QueryOnTCToTSList = '<Query><Where>';
					orEndTags='';
					for(var w=iterationStartPoint;w<(TSID.length)-1;w++)
					{
						QueryOnTCToTSList +='<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[w]+'</Value></Eq>';
						orEndTags+='</Or>';
					}
					QueryOnTCToTSList += '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[w]+'</Value></Eq>';
					QueryOnTCToTSList +=orEndTags;
					QueryOnTCToTSList +='</Where><ViewFields><FieldRef Name="TestPassMappingID" /></ViewFields></Query>';
					var ChildListResult2 = ChildList.getSPItemsWithQuery(QueryOnTCToTSList).Items;
					if(ChildListResult2 !=null && ChildListResult2 !=undefined)
					{
					 	for(var j=0;j<ChildListResult2.length;j++)
					 	{
					 		ChildListResult.push(ChildListResult2[j]);
					 		if($.inArray(ChildListResult2[j]['TestPassMappingID'],uniqueParentID)==-1)
								uniqueParentID.push(ChildListResult2[j]['TestPassMappingID']);
								
							if($.inArray(ChildListResult[i]['Role'],uniqueRoleIDArr)==-1)
								uniqueRoleIDArr.push( parseInt( ChildListResult[i]["Role"] ) );	
	
						}		
	
					}
				}		
      		}
			
		}	
		if(ChildListResult.length != 0)
		{
			var allTestPassIDs = new Array();
			var uniqueTCIDs = new Array();
			var uniqueTester = new Array();
			var orEndTags;
			if(uniqueParentID.length<=147)
			{
				orEndTags='';
				var camlQuery = '<Query><Where>';
				for(var i=0;i<uniqueParentID.length-1;i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
					orEndTags+='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
				ParentListResult = ParentList.getSPItemsWithQuery(camlQuery).Items;
				if(ParentListResult != null && ParentListResult != undefined)
				{
					for(var i=0;i<ParentListResult.length;i++)
					{
						if($.inArray(ParentListResult[i]['TestPassID'],allTestPassIDs) == -1)
							allTestPassIDs.push(ParentListResult[i]['TestPassID']);
							
						if($.inArray(ParentListResult[i]['TestCaseID'],uniqueTCIDs) == -1)
							uniqueTCIDs.push(ParentListResult[i]['TestCaseID']);
						
						if($.inArray(ParentListResult[i]['SPUserID'],uniqueTester) == -1)	
							uniqueTester.push(ParentListResult[i]['SPUserID']);
					}
				}
			}
			else
			{
				var iteration= Math.ceil((uniqueParentID.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
	          	var iterationStartPoint=0;
	          	for(var y=0;y<iteration;y++)
	          	{
					if(y!=iteration-1)
		          	{
		          		var camlQuery = '<Query><Where>';
		          		orEndTags='';	
		          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
		          		{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
							orEndTags+='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';				
		                
		                iterationStartPoint+=147;
						 //////
		            
						var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
						var ParentListResult2 = ParentList.getSPItemsWithQuery(camlQuery).Items;
						if(ParentListResult2 != null && ParentListResult2 != undefined)
						{
							ParentListResult = ParentListResult.concat(ParentListResult2);
							for(var ii=0;ii<ParentListResult2.length;ii++)
							{
								if($.inArray(ParentListResult2[ii]['TestPassID'],allTestPassIDs) == -1)
									allTestPassIDs.push(ParentListResult2[ii]['TestPassID']);
									
								if($.inArray(ParentListResult2[ii]['TestCaseID'],uniqueTCIDs) == -1)
									uniqueTCIDs.push(ParentListResult2[ii]['TestCaseID']);
								
								if($.inArray(ParentListResult2[ii]['SPUserID'],uniqueTester) == -1)	
									uniqueTester.push(ParentListResult2[ii]['SPUserID']);
							}
						}
					}
					else
					{
						var camlQuery = '<Query><Where>';
						orEndTags='';
						for(var w=iterationStartPoint;w<(uniqueParentID.length)-1;w++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[w]+'</Value></Eq>';
							orEndTags+='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueParentID[w]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
										
			         	var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
						var ParentListResult2 = ParentList.getSPItemsWithQuery(camlQuery).Items;
						if(ParentListResult2 != null && ParentListResult2 != undefined)
						{
							ParentListResult = ParentListResult.concat(ParentListResult2);
							for(var i=0;i<ParentListResult2.length;i++)
							{
								if($.inArray(ParentListResult2[i]['TestPassID'],allTestPassIDs) == -1)
									allTestPassIDs.push(ParentListResult2[i]['TestPassID']);
									
								if($.inArray(ParentListResult2[i]['TestCaseID'],uniqueTCIDs) == -1)
									uniqueTCIDs.push(ParentListResult2[i]['TestCaseID']);
								
								if($.inArray(ParentListResult2[i]['SPUserID'],uniqueTester) == -1)	
									uniqueTester.push(ParentListResult2[i]['SPUserID']);
							}
						}
	  
			     	}		
          		}
			
			}	
			
		//Query on Test Pass List & Tester List to get name of Test Pass & Tester resp.
			//Two queries on Test Pass List and Tester List resp. are created in same 'for loop' to save iterations
			var TestPassNameForTestPassID = new Array();
			var ProejctIDForTPID = new Array();
			var orEndTags;
			if(allTestPassIDs.length<=147)
			{
				var camlQueryForTestPassList= '<Query><Where>';
				orEndTags='';
				for(var i=0;i<allTestPassIDs.length-1;i++)
				{
					camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					orEndTags+='</Or>';
				}
				camlQueryForTestPassList+= '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
				camlQueryForTestPassList+=orEndTags;
				camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';
	
				var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
				var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
				//Collection Framework for getting a Test Pass Name for Test Pass ID 
				if(TestPassResult !=null && TestPassResult !=undefined)
				{
					for(var i=0;i<TestPassResult.length;i++)
					{
						TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
						ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
					}	
				} 
				
				
			}
			else
			{
				var iteration= Math.ceil((allTestPassIDs.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
	          	var iterationStartPoint=0;
	          	for(var y=0;y<iteration;y++)
	          	{
					if(y!=iteration-1)
		          	{
		          		var camlQueryForTestPassList = '<Query><Where>';
		          		orEndTags='';	
		          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
		          		{
							camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
							orEndTags+='</Or>';
						}
						camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
						camlQueryForTestPassList+=orEndTags;
						camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';				
		                
		                iterationStartPoint+=147;
						 //////
		            
						var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
						var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
						//Collection Framework for getting a Test Pass Name for Test Pass ID 
						if(TestPassResult !=null && TestPassResult !=undefined)
						{
							for(var ii=0;ii<TestPassResult.length;ii++)
							{
								TestPassNameForTestPassID[TestPassResult[ii]['ID']] = TestPassResult[ii]['TestPassName'];
								ProejctIDForTPID[TestPassResult[ii]['ID']] = TestPassResult[ii]['ProjectId'];
							}	
						} 
					}
					else
					{
						var camlQueryForTestPassList = '<Query><Where>';
						orEndTags='';
						for(var w=iterationStartPoint;w<(allTestPassIDs.length)-1;w++)
						{
							camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
							orEndTags+='</Or>';
						}
						camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
						camlQueryForTestPassList+=orEndTags;
						camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';
										
			         	var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
						var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
						//Collection Framework for getting a Test Pass Name for Test Pass ID 
						if(TestPassResult !=null && TestPassResult !=undefined)
						{
							for(var i=0;i<TestPassResult.length;i++)
							{
								TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
								ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
							}	
						} 
	  
			     	}		
	      		}
			}
			var TesterNameForSPUserID = new Array();
			var TesterSPUserID = new Array();
			var orEndTags;
			if(uniqueTester.length<=147)
			{
				var camlQueryForTesterList= '<Query><Where>';
				orEndTags='';
				for(var i=0;i<uniqueTester.length-1;i++)
				{
					camlQueryForTesterList+='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
					orEndTags+='</Or>';
				}
				camlQueryForTesterList+= '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
				camlQueryForTesterList+=orEndTags;
				camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';
				
				var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
				var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
				//Collection Framework for getting a Tester Name for SPUserID 
				if(TesterResult !=null && TesterResult !=undefined)
				{
					for(var i=0;i<TesterResult.length;i++)
					{
						if($.inArray(TesterResult[i]['SPUserID'],TesterSPUserID) == -1)
						{
							TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
							TesterSPUserID.push(TesterResult[i]['SPUserID']);
						}
					}		
				}
			}
			else
			{
				var iteration= Math.ceil((uniqueTester.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
	          	var iterationStartPoint=0;
	          	orEndTags='';
	          	for(var y=0;y<iteration;y++)
	          	{
					if(y!=iteration-1)
		          	{
		          		var camlQueryForTesterList = '<Query><Where>';	
		          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
		          		{
							camlQueryForTesterList+='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
							orEndTags+='</Or>';
						}
						camlQueryForTesterList+= '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
						camlQueryForTesterList+=orEndTags;
						camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';				
		                
		                iterationStartPoint+=147;
						 //////
		            
						var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
						var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
						//Collection Framework for getting a Tester Name for SPUserID 
						if(TesterResult !=null && TesterResult !=undefined)
						{
							for(var ii=0;ii<TesterResult.length;ii++)
							{
								if($.inArray(TesterResult[ii]['SPUserID'],TesterSPUserID) == -1)
								{
									TesterNameForSPUserID[TesterResult[ii]['SPUserID']] = TesterResult[ii]['TesterName'];
									TesterSPUserID.push(TesterResult[ii]['SPUserID']);
								}
							}		
						}
 
					}
					else
					{
						var camlQueryForTesterList = '<Query><Where>';
						orEndTags='';
						for(var w=iterationStartPoint;w<(uniqueTester.length)-1;w++)
						{
							camlQueryForTesterList+='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[w]+'</Value></Eq>';
							orEndTags+='</Or>';
						}
						camlQueryForTesterList+= '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[w]+'</Value></Eq>';
						camlQueryForTesterList +=orEndTags;
						camlQueryForTesterList +='</Where><ViewFields></ViewFields></Query>';
										
			         	var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
						var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
						//Collection Framework for getting a Tester Name for SPUserID 
						if(TesterResult !=null && TesterResult !=undefined)
						{
							for(var i=0;i<TesterResult.length;i++)
							{
								if($.inArray(TesterResult[i]['SPUserID'],TesterSPUserID) == -1)
								{
									TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
									TesterSPUserID.push(TesterResult[i]['SPUserID']);
								}
							}		
						}
 
	  
			     	}		
	      		}
			}
	
			//Test Case Name for TCID
				var TestCaseNameForTestCaseID = new Array();
				var orEndTags;
				if(uniqueTCIDs.length<=147)
				{
					var camlQuery='';
					camlQuery = '<Query><Where>';
					orEndTags='';
					for(var i=0;i<uniqueTCIDs.length-1;i++)	
					{		 
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
						orEndTags+='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';
					var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
					var TestCaseResult =  TestCaseList.getSPItemsWithQuery(camlQuery).Items; 
					
					if(TestCaseResult !=null && TestCaseResult!=undefined)
					{
						for(var i=0;i<TestCaseResult.length;i++)
						{
							if(TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] == undefined)
								TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] = TestCaseResult[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
						}
					}
				}
				else
				{
					var iteration= Math.ceil((uniqueTCIDs.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
		          	var iterationStartPoint=0;
		          	orEndTags='';
		          	for(var y=0;y<iteration;y++)
		          	{
						if(y!=iteration-1)
			          	{
			          		var camlQuery = '<Query><Where>';	
			          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
			          		{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
								orEndTags+='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';				
			                
			                iterationStartPoint+=147;
							 //////
			            
							var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
							var TestCaseResult =  TestCaseList.getSPItemsWithQuery(camlQuery).Items; 
							
							if(TestCaseResult !=null && TestCaseResult!=undefined)
							{
								for(var ii=0;ii<TestCaseResult.length;ii++)
								{
									if(TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] == undefined)
										TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] = TestCaseResult[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
								}
							}
						}
						else
						{
							var camlQuery = '<Query><Where>';
							orEndTags='';
							for(var w=iterationStartPoint;w<(uniqueTCIDs.length)-1;w++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[w]+'</Value></Eq>';
								orEndTags+='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueTCIDs[w]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';
											
				         	var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
							var TestCaseResult =  TestCaseList.getSPItemsWithQuery(camlQuery).Items; 
							
							if(TestCaseResult !=null && TestCaseResult!=undefined)
							{
								for(var i=0;i<TestCaseResult.length;i++)
								{
									if(TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] == undefined)
										TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] = TestCaseResult[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
								}
							}
		  
				     	}		
		      		}
			
				}
			
           	var TesterNameTCNameTPNameForParentID = new Array(); 	
			for(var i=0;i<ParentListResult.length;i++)
			{
				if(TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] == undefined)
					TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] = TesterNameForSPUserID[ParentListResult[i]['SPUserID']] +","+ TestCaseNameForTestCaseID[ParentListResult[i]['TestCaseID']] +","+ TestPassNameForTestPassID[ParentListResult[i]['TestPassID']];
			}
			
			/*To get the role names :Ejaz Waquif DT:5/22/2014*/
			if(uniqueRoleIDArr!=undefined && uniqueRoleIDArr.length !=0)
			{
				if(uniqueRoleIDArr.length<=147)
				{
					var orEndTags='';
	          		var camlQuery = '<Query><Where>';	
	          		for(var i=0;i<uniqueRoleIDArr.length;i++)
	          		{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueRoleIDArr[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueRoleIDArr[i]+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';	
					
					var TesterRoleList = jP.Lists.setSPObject(Main.getSiteUrl(),'TesterRole');  
					var TesterRoleResult =  TesterRoleList.getSPItemsWithQuery(camlQuery).Items;
					
					if(TesterRoleResult!=undefined && TesterRoleResult.length!=0)
					{
						$.each(TesterRoleResult, function(TesterRoleIndex,TesterRoleItem){
						
							roleNameByRoleIDArr[parseInt(TesterRoleItem["ID"])] = TesterRoleItem["Role"]
						
						});
					
					}
				
				}
				else
				{
					var numberOfIterations=Math.ceil(uniqueRoleIDArr.length/147);
					var iterations=0;
					
					for(var y=0; y<numberOfIterations-1; y++)
					{
						camlQuery = '<Query><Where>';
						var orEndTags='';
						for(var i=0+iterations; i<(iterations+147)-1; i++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueRoleIDArr[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueRoleIDArr[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';	
						
						var TesterRoleList = jP.Lists.setSPObject(Main.getSiteUrl(),'TesterRole');  
						var TesterRoleResult =  TesterRoleList.getSPItemsWithQuery(camlQuery).Items;
						
						if(TesterRoleResult!=undefined && TesterRoleResult.length!=0)
						{
							$.each(TesterRoleResult, function(TesterRoleIndex,TesterRoleItem){
							
								roleNameByRoleIDArr[parseInt(TesterRoleItem["ID"])] = TesterRoleItem["Role"]
							
							});
						
						}

						iterations+=147;
					}
					
					camlQuery = '<Query><Where>';
					var orEndTags='';

					for(var i=iterations; i<uniqueRoleIDArr.length-1; i++)
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueRoleIDArr[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueRoleIDArr[i]+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';	
					
					var TesterRoleList = jP.Lists.setSPObject(Main.getSiteUrl(),'TesterRole');  
					var TesterRoleResult =  TesterRoleList.getSPItemsWithQuery(camlQuery).Items;
					
					
					if(TesterRoleResult!=undefined && TesterRoleResult.length!=0)
					{
						$.each(TesterRoleResult, function(TesterRoleIndex,TesterRoleItem){
						
							roleNameByRoleIDArr[parseInt(TesterRoleItem["ID"])] = TesterRoleItem["Role"]
						
						});
					
					}

				}
			}
			/*To get the role names :Ejaz Waquif DT:5/22/2014*/
			
			for(var i=0;i<ChildListResult.length;i++)
			{
				var testId = ChildListResult[i]["TestStep"];
				var status = ChildListResult[i]['status'];
				if(TestStepNameForTSID[ ChildListResult[i]['TestStep'] ] != undefined)
					var testName = TestStepNameForTSID[ ChildListResult[i]['TestStep'] ];
				else
					var testName = "N/A";
				var associatedTCName = '';
   	    		var associatedTPName = '';
   	    		var TesterName = '';	
   	    		var role = roleNameByRoleIDArr[ parseInt(ChildListResult[i]['Role']) ];
   	    		
				if(TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ] !=undefined)
   	    		{
	   	    		 associatedTCName = TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ].split(",")[1];
	   	    		 associatedTPName = TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ].split(",")[2];
	   	    		 TesterName = TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ].split(",")[0];
	   	    	}	
   	    		type='Name-Test step(s)'; 
   	    		//Search.projectID = ProejctIDForTPID[];
   	    		//redirect=Search.getURL()+'/TestStep.aspx?pid='+(Search.projectID);  
		 		ResultView.resultType="TestStep";

				resultObj.push({id:testId,name:testName,status:status,associatedTCName:associatedTCName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect,associatedRoleName:role});													
			}
		}
	}	
	
	/*For Role in Free Text Search :Ejaz Waquif DT:5/20/2014 */
	
		
		//get all role ids as per the search value from TesterRole list :Ejaz Waquif DT:5/19/2014
		var roleList = jP.Lists.setSPObject(Main.getSiteUrl(),'TesterRole');  
		var testerRoleQuery = '<Query><Where><Contains><FieldRef Name="Role" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
		var roleListResult = new Array();
		var roleListResultTemp = roleList.getSPItemsWithQuery(testerRoleQuery).Items;
		if(roleListResultTemp!=undefined)
			roleListResult = roleListResultTemp;
		
		var RoleNameByRoleIDArr = new Array();
		var RoleIDArr = new Array();
		var dataArr = new Array();
		var testPassDetailArr = new Array();
		var isStandardRolePresent = false;
		
		if("standard".indexOf(textInputVal)!=-1 && $.trim(textInputVal)!="")
			roleListResult.push({"ID":1,"Role":"Standard"});
		
		if(roleListResult!=undefined && roleListResult!=null && roleListResult.length!=0)
		{
			
			//CAML query for Tester list :Ejaz Waquif DT:5/20/2014
			var camlQuery='';
			orEndTags='';
			camlQuery = '<Query><Where>';
			
			//CAML query for TestCaseToTestStepMapping list :Ejaz Waquif DT:5/20/2014
			var camlQueryTCtoTS='';
			orEndTagsTCtoTS='';
			camlQueryTCtoTS = '<Query><Where>';
			
			var roleListResultLen = roleListResult.length<=147?roleListResult.length:147;

			
			for(var i=0;i<roleListResultLen-1;i++)
			{
				//CAML query for Tester list :Ejaz Waquif DT:5/20/2014
				camlQuery +='<Or><Eq><FieldRef Name="RoleID" /><Value Type="Number">'+roleListResult[i]["ID"]+'</Value></Eq>';
				orEndTags +='</Or>';
				
				//CAML query for TestCaseToTestStepMapping list :Ejaz Waquif DT:5/20/2014
				camlQueryTCtoTS  +='<Or><Eq><FieldRef Name="Role" /><Value Type="Text">'+roleListResult[i]["ID"]+'</Value></Eq>';
				orEndTagsTCtoTS +='</Or>';

				//Array of Role names by Role ID :Ejaz Waquif DT:5/20/2014
				RoleNameByRoleIDArr[roleListResult[i]["ID"]] = roleListResult[i]["Role"];
			}
			//Array of Role names by Role ID :Ejaz Waquif DT:5/20/2014
			RoleNameByRoleIDArr[roleListResult[i]["ID"]] = roleListResult[i]["Role"];
			
			//CAML query for Tester list :Ejaz Waquif DT:5/20/2014
			camlQuery += '<Eq><FieldRef Name="RoleID" /><Value Type="Number">'+roleListResult[i]["ID"]+'</Value></Eq>';
			camlQuery +=orEndTags;
			camlQuery +='</Where><ViewFields></ViewFields></Query>';
			
			//CAML query for TestCaseToTestStepMapping list :Ejaz Waquif DT:5/20/2014
			camlQueryTCtoTS += '<Eq><FieldRef Name="Role" /><Value Type="Text">'+roleListResult[i]["ID"]+'</Value></Eq>';
			camlQueryTCtoTS +=orEndTagsTCtoTS;
			camlQueryTCtoTS +='</Where><ViewFields></ViewFields></Query>';

			//Query on Tester list :Ejaz Waquif DT:5/20/2014
			var testerList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');
			var testerResult = testerList.getSPItemsWithQuery(camlQuery).Items;
			
			var camlQueryTP='';
			var orEndTagsTP='';
			camlQueryTP = '<Query><Where>';
			if(testerResult!=null && testerResult!=undefined)//<---1---
			{
			
				if(testerResult.length<=147)//<---2---
				{
					for(var i=0;i<testerResult.length-1;i++)
					{
					    //To put all the neccessary data in Array :Ejaz Waquif DT:5/20/2014
						dataArr.push({
						
							'TPID':testerResult[i]["TestPassID"],
							'Tester':testerResult[i]["TesterFullName"],
							'RoleID':testerResult[i]["RoleID"],
							'RoleName': RoleNameByRoleIDArr[ parseInt(testerResult[i]["RoleID"]) ]
						
						});
						
						//To build the query to fetch the Test Pass Names and their Status :Ejaz Waquif DT:5/20/2014
						camlQueryTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
						orEndTagsTP +='</Or>';							
					 }
					 
					 //To put all the neccessary data in Array :Ejaz Waquif DT:5/20/2014
					 dataArr.push({
						
							'TPID':testerResult[i]["TestPassID"],
							'Tester':testerResult[i]["TesterFullName"],
							'RoleID':testerResult[i]["RoleID"],
							'RoleName': RoleNameByRoleIDArr [ parseInt(testerResult[i] ["RoleID"]) ]
						
					 });
						
					 //To build the query to fetch the Test Pass Names and their Status	:Ejaz Waquif DT:5/20/2014
					 camlQueryTP += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
					 camlQueryTP +=orEndTagsTP;
					 camlQueryTP +='</Where><ViewFields></ViewFields></Query>';
					 
					 var testPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
					 var testPassListResult = testPassList.getSPItemsWithQuery(camlQueryTP).Items;
					 
					 if(testPassListResult!=undefined && testPassListResult!=null)
					 {
					 	for(var i=0;i<testPassListResult.length;i++)
					 	{
						 	testPassDetailArr[testPassListResult[i]["ID"]] = new Array();
						 	testPassDetailArr[testPassListResult[i]["ID"]].push({
						 		"Name":testPassListResult[i]["TestPassName"],
						 		"Status":testPassListResult[i]["Status"],
						 		"ProjectID":testPassListResult[i]["ProjectId"],
						 		"SPUserID":testPassListResult[i]["SPUserID"]
						 	});
					 	}
					 }
				}//---2--->	 
				else
				{
					var numberOfIterations = Math.ceil(AllTestPassIDs.length/147)-1;
					var iterations =0;
					
					for(var y=0; y<numberOfIterations; y++)
					{
						var camlQueryTP='';
						var orEndTagsTP='';
						camlQueryTP = '<Query><Where>';

						for(var i=iterations; i<(iterations+147)-1; i++)
						{
							//To put all the neccessary data in Array :Ejaz Waquif DT:5/20/2014
							dataArr.push({
							
								'TPID':testerResult[i]["TestPassID"],
								'Tester':testerResult[i]["TesterFullName"],
								'RoleID':testerResult[i]["RoleID"],
								'RoleName': RoleNameByRoleIDArr[ parseInt(testerResult[i]["RoleID"]) ]
							
							});
							
							//To build the query to fetch the Test Pass Names and their Status :Ejaz Waquif DT:5/20/2014
							camlQueryTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
							orEndTagsTP +='</Or>';
							
							
						}
						
						//To put all the neccessary data in Array :Ejaz Waquif DT:5/20/2014
						dataArr.push({
							
								'TPID':testerResult[i]["TestPassID"],
								'Tester':testerResult[i]["TesterFullName"],
								'RoleID':testerResult[i]["RoleID"],
								'RoleName': RoleNameByRoleIDArr [ parseInt(testerResult[i] ["RoleID"]) ]
							
						 });

						//To build the query to fetch the Test Pass Names and their Status:Ejaz Waquif DT:5/20/2014
						 camlQueryTP += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
						 camlQueryTP +=orEndTagsTP;
						 camlQueryTP +='</Where><ViewFields></ViewFields></Query>';
						 
						 var testPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
						 var testPassListResult = testPassList.getSPItemsWithQuery(camlQueryTP).Items;
						 
						 if(testPassListResult!=undefined && testPassListResult!=null)
						 {
						 	for(var i=0;i<testPassListResult.length;i++)
						 	{
							 	testPassDetailArr[testPassListResult[i]["ID"]] = new Array();
							 	testPassDetailArr[testPassListResult[i]["ID"]].push({
							 		"Name":testPassListResult[i]["TestPassName"],
							 		"Status":testPassListResult[i]["Status"],
							 		"ProjectID":testPassListResult[i]["ProjectId"],
							 		"SPUserID":testPassListResult[i]["SPUserID"]
							 	});
						 	}
						 }

						iterations +=147;

					}
					
					/* To iterate the remaining items :Ejaz Waquif DT:5/20/2014 */
					var camlQueryTP='';
					var orEndTagsTP='';
					camlQueryTP = '<Query><Where>';

					for(var i=iterations; i<AllTestPassIDs.length-1; i++)
					{
						//To put all the neccessary data in Array :Ejaz Waquif DT:5/20/2014
							dataArr.push({
							
								'TPID':testerResult[i]["TestPassID"],
								'Tester':testerResult[i]["TesterFullName"],
								'RoleID':testerResult[i]["RoleID"],
								'RoleName': RoleNameByRoleIDArr[ parseInt(testerResult[i]["RoleID"]) ]
							
							});
							
							//To build the query to fetch the Test Pass Names and their Status :Ejaz Waquif DT:5/20/2014
							camlQueryTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
							orEndTagsTP +='</Or>';

					}
					//To put all the neccessary data in Array :Ejaz Waquif DT:5/20/2014
					dataArr.push({
						
							'TPID':testerResult[i]["TestPassID"],
							'Tester':testerResult[i]["TesterFullName"],
							'RoleID':testerResult[i]["RoleID"],
							'RoleName': RoleNameByRoleIDArr [ parseInt(testerResult[i] ["RoleID"]) ]
						
					 });

					//To build the query to fetch the Test Pass Names and their Status :Ejaz Waquif DT:5/20/2014
					 camlQueryTP += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
					 camlQueryTP +=orEndTagsTP;
					 camlQueryTP +='</Where><ViewFields></ViewFields></Query>';
					 
					 var testPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
					 var testPassListResult = testPassList.getSPItemsWithQuery(camlQueryTP).Items;
					 
					 if(testPassListResult!=undefined && testPassListResult!=null)
					 {
					 	for(var i=0;i<testPassListResult.length;i++)
					 	{
						 	testPassDetailArr[testPassListResult[i]["ID"]] = new Array();
						 	testPassDetailArr[testPassListResult[i]["ID"]].push({
						 		"Name":testPassListResult[i]["TestPassName"],
						 		"Status":testPassListResult[i]["Status"],
						 		"ProjectID":testPassListResult[i]["ProjectId"],
						 		"SPUserID":testPassListResult[i]["SPUserID"]
						 	});
					 	}
					 }

					/* To iterate the remaining items :Ejaz Waquif DT:5/20/2014 */


					
				
				}


			}//---1--->
			
			//To fill the ResultObj Array :Ejaz Waquif DT:5/20/2014
			if(dataArr!=undefined && dataArr.length!=0)
			{
				for(var i=0;i<dataArr.length;i++)
				{
					var testPassId = dataArr[i]["TPID"];					
		       	    var testPassName = testPassDetailArr[dataArr[i]["TPID"]][0]["Name"];
		       	    var status = testPassDetailArr[dataArr[i]["TPID"]][0]["Status"];
					var testerName = dataArr[i]["Tester"];
					var role = dataArr[i]["RoleName"];
					var projectID = testPassDetailArr[dataArr[i]["TPID"]][0]["ProjectID"];
					var SPUserID = testPassDetailArr[dataArr[i]["TPID"]][0]["SPUserID"];
				
					type='Role-Test Pass(es)';
		  			
		  			//Search.projectID = ProejctIDForTPID[ ParentListResult[i]["TestPassID"] ];
		  			if($.inArray("1",security.userType) != -1)
					     redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(projectID)+"&tpid="+testPassId+'&edit=1';
					else
					{
					  	 var userAsso = security.userAssociationForProject[projectID];
					  	 if(userAsso != undefined)
						 { 	 if($.inArray('2',userAsso.split(",")) != -1 || $.inArray('5',userAsso.split(",")) != -1)
						  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(projectID)+"&tpid="+testPassId+'&edit=1';
						  	 else if(_spUserId == SPUserID)
						  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(projectID)+"&tpid="+testPassId+'&edit=1';
						  	 	else
						  	 		redirect = '';
						 }
						 else
						 	redirect = ''; 
					}	 	
						 	
			 		ResultView.resultType="Role";
	
					resultObj.push({id:testPassId,name:testPassName,status:status,queryType:type,redirect:redirect,associatedRoleName:role,TesterName:testerName});													
	
				}
			}
			
			
			/*To fill the resultObj array for Role-Test Steps :Ejaz Waquif DT:5/20/2014 */
			
			//Query on TestCaseToTestStepMapping list :Ejaz Waquif DT:5/20/2014
			var testCaseTestStepList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping');
			var testCaseTestStepResult = testCaseTestStepList.getSPItemsWithQuery(camlQueryTCtoTS).Items;
			
			//variables
			var testStepDataArr = new Array();
			var uniqueTSIDNameArr = new Array();
			var uniqueTPIDNameArr = new Array();
			var uniqueTCIDNameArr = new Array();
			var uniqueSPUserIDArr = new Array();
			
			if(testCaseTestStepResult!= undefined && testCaseTestStepResult != null)
			{
			    var testCaseTestStepResultLen = testCaseTestStepResult.length;
				for(var i=0 ;i<testCaseTestStepResultLen;i++)
				{
					testStepDataArr.push({
						"TSID":testCaseTestStepResult[i]["TestStep"],
						"RoleID":testCaseTestStepResult[i]["Role"],
						"RoleName":RoleNameByRoleIDArr [ parseInt(testCaseTestStepResult[i]["Role"]) ],
						"TesterSPUserID":testCaseTestStepResult[i]["SPUserID"],
						"Status":testCaseTestStepResult[i]["status"],
						"TCID":testCaseTestStepResult[i]["TestCaseID"],
						"TPID":testCaseTestStepResult[i]["TestPassID"]
											
					});
					
					//Push the unique Test Step ID
					if($.inArray(testCaseTestStepResult[i]["TestStep"],uniqueTSIDNameArr)==-1)
						uniqueTSIDNameArr.push(testCaseTestStepResult[i]["TestStep"]);
						
					//Push the unique Test Case ID
					if($.inArray(testCaseTestStepResult[i]["TestCaseID"],uniqueTCIDNameArr)==-1)
						uniqueTCIDNameArr.push(testCaseTestStepResult[i]["TestCaseID"]);
						
					//Push the unique Test Pass ID
					if($.inArray(testCaseTestStepResult[i]["TestPassID"],uniqueTPIDNameArr)==-1)
						uniqueTPIDNameArr.push(testCaseTestStepResult[i]["TestPassID"]);
						
					//Push the unique SPUser ID
					if($.inArray(testCaseTestStepResult[i]["SPUserID"],uniqueSPUserIDArr)==-1)
						uniqueSPUserIDArr.push(testCaseTestStepResult[i]["SPUserID"]);

				
				}
				
				//To get the Test Step Names by Test Step IDs :Ejaz Waquif DT:5/20/2014
				var TSID = new Array();
				var TestStepNameForTSID = new Array();
				var orEndTags='';
				var uniqueTSID = uniqueTSIDNameArr;
				if(uniqueTSID.length<=147)
				{
					var counter = new Array();
					var camlQuery = '<Query><Where>';
					for(var i=0;i<uniqueTSID.length-1;i++)
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTSID[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}	
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTSID[i]+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';
					var ActionList = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');
					var ActionItems = ActionList.getSPItemsWithQuery(camlQuery).Items;
					
					if(ActionItems != null && ActionItems!=undefined)
					{
						
						for(var i=0;i<ActionItems.length;i++)
						{
							if($.inArray(ActionItems[i]['TestStep'],TSID)==-1)
							{	
								TestStepNameForTSID[ActionItems[i]['ID']] = ActionItems[i]['actionName'];
								TSID.push(ActionItems[i]['ID']);
							}	
						}	
					}
				}
				else
				{
					var iteration= Math.ceil((uniqueTSID.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
		          	var iterationStartPoint=0;
		          	for(var y=0;y<iteration;y++)
		          	{
						if(y!=iteration-1)
			          	{
			          		var camlQuery = '<Query><Where>';
			          		orEndTags='';	
			          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
			          		{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTSID[i]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueTSID[i]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';				
			                
			                iterationStartPoint+=147;
							 //////
			            
							var ActionList = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');
							var ActionItems = ActionList.getSPItemsWithQuery(camlQuery).Items;
							if(ActionItems != null && ActionItems!=undefined)
							{
								
								for(var ii=0;ii<ActionItems.length;ii++)
								{
									if($.inArray(ActionItems[ii]['TestStep'],TSID)==-1)
									{	
										TestStepNameForTSID[ActionItems[ii]['ID']] = ActionItems[ii]['actionName'];
										TSID.push(ActionItems[ii]['ID']);
									}	
								}	
							}
						}
						else
						{
							var camlQuery = '<Query><Where>';
							orEndTags='';
							for(var w=iterationStartPoint;w<(uniqueTSID.length)-1;w++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTSID[w]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueTSID[w]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';
											
				         	var ActionList = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');
							var ActionItems = ActionList.getSPItemsWithQuery(camlQuery).Items;
							
							if(ActionItems != null && ActionItems!=undefined)
							{
								
								for(var ii=0;ii<ActionItems.length;ii++)
								{
									if($.inArray(ActionItems[ii]['TestStep'],TSID)==-1)
									{	
										TestStepNameForTSID[ActionItems[ii]['ID']] = ActionItems[ii]['actionName'];
										TSID.push(ActionItems[ii]['ID']);
									}	
								}	
							}
		  
				     	}		
	          		}
				
				}
				//End of To get the Test Step Names by Test Step IDs :Ejaz Waquif DT:5/20/2014
				
				
				/*To get the Test Pass Names by Test Pass IDs*/
				var TestPassNameForTestPassID = new Array();
				var ProejctIDForTPID = new Array();
				var allTestPassIDs = uniqueTPIDNameArr;
				var orEndTags='';
				if(allTestPassIDs.length<=147)
				{
					var camlQueryForTestPassList= '<Query><Where>';
					orEndTags ='';
					for(var i=0;i<allTestPassIDs.length-1;i++)
					{
						camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					camlQueryForTestPassList+= '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					camlQueryForTestPassList+=orEndTags;
					camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';
		
					var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
					var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
					//Collection Framework for getting a Test Pass Name for Test Pass ID 
					if(TestPassResult !=null && TestPassResult !=undefined)
					{
						for(var i=0;i<TestPassResult.length;i++)
						{
							TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
							ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
						}	
					} 
					
					
				}
				else
				{
					var iteration= Math.ceil((allTestPassIDs.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
		          	var iterationStartPoint=0;
		          	for(var y=0;y<iteration;y++)
		          	{
						if(y!=iteration-1)
			          	{
			          		var camlQueryForTestPassList = '<Query><Where>';
			          		orEndTags ='';	
			          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
			          		{
								camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
							camlQueryForTestPassList+=orEndTags;
							camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';				
			                
			                iterationStartPoint+=147;
							 //////
			            
							var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
							var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
							//Collection Framework for getting a Test Pass Name for Test Pass ID 
							if(TestPassResult !=null && TestPassResult !=undefined)
							{
								for(var ii=0;ii<TestPassResult.length;ii++)
								{
									TestPassNameForTestPassID[TestPassResult[ii]['ID']] = TestPassResult[ii]['TestPassName'];
									ProejctIDForTPID[TestPassResult[ii]['ID']] = TestPassResult[ii]['ProjectId'];
								}	
							} 
						}
						else
						{
							camlQueryForTestPassList = '<Query><Where>';
							orEndTags='';
							for(var w=iterationStartPoint;w<(allTestPassIDs.length)-1;w++)
							{
								camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
							camlQueryForTestPassList+=orEndTags;
							camlQueryForTestPassList+='</Where><ViewFields></ViewFields></Query>';
											
				         	var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');  
							var TestPassResult =  TestPassList.getSPItemsWithQuery(camlQueryForTestPassList).Items;
							//Collection Framework for getting a Test Pass Name for Test Pass ID 
							if(TestPassResult !=null && TestPassResult !=undefined)
							{
								for(var i=0;i<TestPassResult.length;i++)
								{
									TestPassNameForTestPassID[TestPassResult[i]['ID']] = TestPassResult[i]['TestPassName'];
									ProejctIDForTPID[TestPassResult[i]['ID']] = TestPassResult[i]['ProjectId'];
								}	
							} 
		  
				     	}		
		      		}
				}

				/*End of To get the Test Pass Names by Test Pass IDs :Ejaz Waquif DT:5/20/2014*/
				
				/*To get the Tester Names by SPUser IDs :Ejaz Waquif DT:5/20/2014*/
				var TesterNameForSPUserID = new Array();
				var TesterSPUserID = new Array();
				var uniqueTester = uniqueSPUserIDArr;
				var orEndTags='';
				if(uniqueTester.length<=147)
				{
					var camlQueryForTesterList= '<Query><Where>';
					for(var i=0;i<uniqueTester.length-1;i++)
					{
						camlQueryForTesterList+='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					camlQueryForTesterList+= '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
					camlQueryForTesterList+=orEndTags;
					camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';
					
					var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
					var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
					//Collection Framework for getting a Tester Name for SPUserID 
					if(TesterResult !=null && TesterResult !=undefined)
					{
						for(var i=0;i<TesterResult.length;i++)
						{
							if($.inArray(TesterResult[i]['SPUserID'],TesterSPUserID) == -1)
							{
								TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
								TesterSPUserID.push(TesterResult[i]['SPUserID']);
							}
						}		
					}
				}
				else
				{
					var iteration= Math.ceil((uniqueTester.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
		          	var iterationStartPoint=0;
		          	for(var y=0;y<iteration;y++)
		          	{
						if(y!=iteration-1)
			          	{
			          		var camlQueryForTesterList = '<Query><Where>';
			          		orEndTags='';	
			          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
			          		{
								camlQueryForTesterList+='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQueryForTesterList+= '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[i]+'</Value></Eq>';
							camlQueryForTesterList+=orEndTags;
							camlQueryForTesterList+='</Where><ViewFields></ViewFields></Query>';				
			                
			                iterationStartPoint+=147;
							 //////
			            
							var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
							var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
							//Collection Framework for getting a Tester Name for SPUserID 
							if(TesterResult !=null && TesterResult !=undefined)
							{
								for(var ii=0;ii<TesterResult.length;ii++)
								{
									if($.inArray(TesterResult[ii]['SPUserID'],TesterSPUserID) == -1)
									{
										TesterNameForSPUserID[TesterResult[ii]['SPUserID']] = TesterResult[ii]['TesterName'];
										TesterSPUserID.push(TesterResult[ii]['SPUserID']);
									}
								}		
							}
	 
						}
						else
						{
							var camlQueryForTesterList = '<Query><Where>';
							orEndTags ='';
							for(var w=iterationStartPoint;w<(uniqueTester.length)-1;w++)
							{
								camlQueryForTesterList+='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[w]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQueryForTesterList+= '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueTester[w]+'</Value></Eq>';
							camlQueryForTesterList +=orEndTags;
							camlQueryForTesterList +='</Where><ViewFields></ViewFields></Query>';
											
				         	var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');  
							var TesterResult =  TesterList.getSPItemsWithQuery(camlQueryForTesterList).Items;
							//Collection Framework for getting a Tester Name for SPUserID 
							if(TesterResult !=null && TesterResult !=undefined)
							{
								for(var i=0;i<TesterResult.length;i++)
								{
									if($.inArray(TesterResult[i]['SPUserID'],TesterSPUserID) == -1)
									{
										TesterNameForSPUserID[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
										TesterSPUserID.push(TesterResult[i]['SPUserID']);
									}
								}		
							}
	 
		  
				     	}		
		      		}
				}
				/*End of To get the Tester Names by SPUser IDs :Ejaz Waquif DT:5/20/2014*/
				
				/*To get the Test Case Names by Test Case IDs :Ejaz Waquif DT:5/20/2014*/
				var TestCaseNameForTestCaseID = new Array();
				var orEndTags='';
				var uniqueTCIDs = uniqueTCIDNameArr;
				if(uniqueTCIDs.length<=147)
				{
					var camlQuery='';
					camlQuery = '<Query><Where>';
					orEndTags ='';
					for(var i=0;i<uniqueTCIDs.length-1;i++)
					{			 
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
					camlQuery +=orEndTags ;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';
					var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
					var TestCaseResult =  TestCaseList.getSPItemsWithQuery(camlQuery).Items; 
					
					if(TestCaseResult !=null && TestCaseResult!=undefined)
					{
						for(var i=0;i<TestCaseResult.length;i++)
						{
							if(TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] == undefined)
								TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] = TestCaseResult[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
						}
					}
				}
				else
				{
					var iteration= Math.ceil((uniqueTCIDs.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
		          	var iterationStartPoint=0;
		          	
		          	for(var y=0;y<iteration;y++)
		          	{
		          		orEndTags ='';
						if(y!=iteration-1)
			          	{
			          		var camlQuery = '<Query><Where>';	
			          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
			          		{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';				
			                
			                iterationStartPoint+=147;
							 //////
			            
							var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
							var TestCaseResult =  TestCaseList.getSPItemsWithQuery(camlQuery).Items; 
							
							if(TestCaseResult !=null && TestCaseResult!=undefined)
							{
								for(var ii=0;ii<TestCaseResult.length;ii++)
								{
									if(TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] == undefined)
										TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] = TestCaseResult[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
								}
							}
						}
						else
						{
							var camlQuery = '<Query><Where>';
							orEndTags='';
							for(var w=iterationStartPoint;w<(uniqueTCIDs.length)-1;w++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[w]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueTCIDs[w]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';
											
				         	var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');  
							var TestCaseResult =  TestCaseList.getSPItemsWithQuery(camlQuery).Items; 
							
							if(TestCaseResult !=null && TestCaseResult!=undefined)
							{
								for(var i=0;i<TestCaseResult.length;i++)
								{
									if(TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] == undefined)
										TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] = TestCaseResult[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
								}
							}
		  
				     	}		
		      		}
			
				}
				/*End of To get the Test Case Names by Test Case IDs :Ejaz Waquif DT:5/20/2014 */
				
				/* To fill the ResultObj Array :Ejaz Waquif DT:5/20/2014 */
				if(testStepDataArr!=undefined && testStepDataArr.length!=0)
				{
					for(var i=0;i<testStepDataArr.length;i++)
					{
						var testStepId = testStepDataArr[i]["TSID"];					
			       	    var testStepName = TestStepNameForTSID[ testStepDataArr[i]["TSID"] ];
			       	    var status = testStepDataArr[i]["Status"];
						var testerName = TesterNameForSPUserID[ testStepDataArr[i]["TesterSPUserID"] ];
						var role = RoleNameByRoleIDArr [ parseInt(testStepDataArr[i] ["RoleID"]) ];
						var SPUserID = testStepDataArr[i]["SPUserID"];
						var testCase = TestCaseNameForTestCaseID[ parseInt(testStepDataArr[i] ["TCID"]) ];
						var testPass = TestPassNameForTestPassID[ parseInt(testStepDataArr[i] ["TPID"]) ];
						var redirect = ''; 
					
						type='Role-Test Step(s)';
							 	
				 		ResultView.resultType="Role";
		
						resultObj.push({id:testStepId,name:testStepName,status:status,queryType:type,redirect:redirect,associatedRoleName:role,TesterName:testerName,associatedTCName:testCase,associatedTPName:testPass});
						
					}
				}
				/*End of To fill the ResultObj Array :Ejaz Waquif DT:5/20/2014*/		
													
		

			}

		}
		/*For Role in Free Text Search :Ejaz Waquif DT:5/20/2014*/
	
	var queryResult = ResultView.getQueryResultView(resultObj,'Name');						
	return queryResult;

}
//ankita
}
