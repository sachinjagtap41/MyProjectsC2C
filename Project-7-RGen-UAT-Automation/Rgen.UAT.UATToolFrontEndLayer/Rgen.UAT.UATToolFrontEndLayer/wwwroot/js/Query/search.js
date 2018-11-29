/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var Search={
projectID:"",
getURL:function()
{
var location=window.location.href;
var ii=location.lastIndexOf("/");
var url=location.substring(0, ii);
return url;
},
searchName: function(textInputVal,fieldSearch,opr){

	
	var resultObj=[];
	var scenarioIdForProj;	
	
		
	var type="";
   	var redirect;
   		
	listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'Project');	
	if(fieldSearch == "project")
	{
		var orEndTags='';
	 	var camlQuery ='';
	 	camlQuery = '<Query><Where>';
		for(var ii=0;ii<(textInputVal.length)-1;ii++)			 
		{
			if(opr != "not")
			{
				camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal[ii]+'</Value></Eq>';
				orEndTags+='</Or>';
			}	
			else
			{	
				camlQuery +='<And><Neq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal[ii]+'</Value></Neq>';	
				orEndTags+='</And>';
			}		    
	    }
	    if(opr != "not")
			camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+textInputVal[ii]+'</Value></Eq>';
		else
			camlQuery += '<Neq><FieldRef Name="ID"/><Value Type="Text">'+textInputVal[ii]+'</Value></Neq>';	
		if(orEndTags != '')
			camlQuery +=orEndTags;
		camlQuery +='</Where></Query>';	
	}
	else		
		var camlQuery = Search.getSearchQuery(textInputVal,fieldSearch,opr, 'Project'); //'<Query><Where><Contains><FieldRef Name="projectName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="projectID" Ascending="true"/></OrderBy></Query>';
	
	if(fieldSearch!="role")
	testItems = listN1.getSPItemsWithQuery(camlQuery).Items;	
			
   	if(testItems!=null){			   
		for(var i=0;i<testItems .length;i++){	
	   		var id=testItems[i]["ID"];					
       	    Search.projectID=id;
       	    var name=( (testItems[i]["projectName"]!=null)&&(testItems[i]["projectName"]!=undefined) ) ? testItems[i]["projectName"] : '-';

       	    var status= ( (testItems[i]["status"]!=null)&&(testItems[i]["status"]!=undefined) ) ? testItems[i]["status"] : '-';
       	    var dueDate= ( (testItems[i]["dueDate"]!=null)&&(testItems[i]["dueDate"]!=undefined) ) ? testItems[i]["dueDate"] : '-';
            	       				
  			var assignTo= ( (testItems[i]["projectLead"]!=null)&&(testItems[i]["projectLead"]!=undefined) ) ? testItems[i]["projectLead"] : '-';
  			var priority= 'N/A';
  			
  			var version=( (testItems[i]["ProjectVersion"]!=null)&&(testItems[i]["ProjectVersion"]!=undefined) ) ? testItems[i]["ProjectVersion"] : 'Default '+gConfigVersion;
  			
  			var state= 'Created';
  			if(fieldSearch=='id'){
  				   type='Id-Version(s)';  				   
  			}
  			
  			if(fieldSearch=='version'){
  				   type='Name-Version(s)';  				   
  			}
  			if(fieldSearch=='assignTo'){
  				   	type='Assigned To.Version(s)';  				   
  			}	
  			 
  			if(fieldSearch=='status'){
  				   		type='Status-Version(s)';  				   
  			}	
  			 
  			if(fieldSearch=='project'){
  				   		type='Project(s)-Version';  				   
  			}
            ResultView.resultType="Project";
           	    			
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
  			resultObj.push({id:id,version:version,name:name,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,queryType:type,redirect:redirect});												
		}				
	}	
	/*For Scenarios*/
	if(fieldSearch != "assignTo")
	{	
		var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
		var Query1 =Search.getSearchQuery(textInputVal,fieldSearch,opr, 'TestPass'); //'<Query><Where><Contains><FieldRef Name="scenarioName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="scenarioId" Ascending="true"/></OrderBy></Query>';
		if(Query1 != undefined)
			var testItems =listN1.getSPItemsWithQuery(Query1).Items;				
	   	else
	   		var testItems = null;      			   			
		if(testItems!=null){			   
			for(var i=0;i<testItems .length;i++){
		   		   var scenarioId=testItems[i]["ID"];					
	    		   var scenarioName=( (testItems[i]["TestPassName"]!=null)&&(testItems[i]["TestPassName"]!=undefined) ) ? testItems[i]["TestPassName"] : '-';
				   
				   //Commented by HRW as these are not on previous version
				   //var associatedTPName=( (testItems[i]["TestPassName"]!=null)&&(testItems[i]["TestPassName"]!=undefined) ) ? testItems[i]["TestPassName"] : '-';
				   //var TesterName=( (testerResult[i]["TesterFullName"]!=null)&&(testerResult[i]["TesterFullName"]!=undefined) ) ? testerResult[i]["TesterFullName"] : '-';
	    		   var status= ( (testItems[i]["Status"]!=null)&&(testItems[i]["Status"]!=undefined) ) ? testItems[i]["Status"] : '-';
	
	    		   var dueDate= ( (testItems[i]["DueDate"]!=null)&&(testItems[i]["DueDate"]!=undefined) ) ? testItems[i]["DueDate"] : '-';
	  			   var assignTo= ( (testItems[i]["tstMngrFulNm"]!=null)&&(testItems[i]["tstMngrFulNm"]!=undefined) ) ? testItems[i]["tstMngrFulNm"] : '-';
	  			   Search.projectID= ( (testItems[i]["ProjectId"]!=null)&&(testItems[i]["ProjectId"]!=undefined) ) ? testItems[i]["ProjectId"] : '-';
	
	  			   //var priority= testItems[i]["priority"];
	  			   //var state= testItems[i]["state"];	  
	  			   var priority='N/A';
	  			   var state= 'N/A';	  			   			  	  
	  				  
				   			  	  
	  				  
	  				   if(fieldSearch=='id'){
	  				   		type='Id-TestPass(es)';  				   
	  				   }
	  				   if(fieldSearch=='name'){
	  				   		type='Name-TestPass(es)';  				   
	  				   }
	  				   if(fieldSearch=='assignTo'){
	  				   		type='Assigned To-TestPass(es)';  				   
	  				   }
	  				   if(fieldSearch=='status'){
	  				   		type='Status-TestPass(es)';  				   
	  				   }
	  				   if(fieldSearch=='project'){
	  				   		type='Projects-TestPass(es)';  
	  				   		scenarioIdForProj =	scenarioId;			   
	  				   }
	  			 ResultView.resultType="TestPass";
	  			 if($.inArray("1",security.userType) != -1)
				     redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+'&tpid='+testItems[i]["ID"]+'&edit=1';
				 else
				 {
				  	 var userAsso = security.userAssociationForProject[Search.projectID];
				  	 if(userAsso != undefined)
					 { 	 if($.inArray('2',userAsso.split(",")) != -1 || $.inArray('5',userAsso.split(",")) != -1)
					  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+'&tpid='+testItems[i]["ID"]+'&edit=1';
					  	 else if(_spUserId == testItems[i]["SPUserID"])
					  	 	redirect=Search.getURL()+'/TestPassMgnt_1.aspx?pid='+(Search.projectID)+'&tpid='+testItems[i]["ID"]+'&edit=1';
					  	 	else
					  	 		redirect = '';
					 }
					 else
					 	redirect = ''; 	 		
				 }	   
				 resultObj.push({id:scenarioId,name:scenarioName,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,queryType:type,redirect:redirect});												
			}				
		}
	}	
	
//////////////  For Test Pass Manger & Tester(Assigned To) /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	if(fieldSearch == "assignTo")
	{
		//For Test Pass Manager
	  var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
	  //var Query1 = '<Query><Where><Contains><FieldRef Name="Tester" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
	  var Query1 = '<Query><Where><Or><Contains><FieldRef Name="Tester" /><Value Type="Text">'+textInputVal+'</Value></Contains><Contains><FieldRef Name="tstMngrFulNm" /><Value Type="Text">'+textInputVal+'</Value></Contains></Or></Where></Query>';
	  var testItems = TestPassList.getSPItemsWithQuery(Query1).Items;	
	  if(testItems!=null)
	  {
		  for(var i=0;i<testItems .length;i++)
		  {
				
			   var scenarioId=testItems[i]["ID"];					
			   var scenarioName=( (testItems[i]["TestPassName"]!=null)&&(testItems[i]["TestPassName"]!=undefined) ) ? testItems[i]["TestPassName"] : '-';
		
			   var dueDate= ( (testItems[i]["DueDate"]!=null)&&(testItems[i]["DueDate"]!=undefined) ) ? testItems[i]["DueDate"] : '-';
			   var assignTo= ( (testItems[i]["tstMngrFulNm"]!=null)&&(testItems[i]["tstMngrFulNm"]!=undefined) ) ? testItems[i]["tstMngrFulNm"] : '-';
			   Search.projectID= ( (testItems[i]["ProjectId"]!=null)&&(testItems[i]["ProjectId"]!=undefined) ) ? testItems[i]["ProjectId"] : '-';
			   var status = testItems[i]["Status"];	  			   			  	  
				  
				type='Assigned To.TestPass(es)';  				   
				   
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
		////////////////////
		//For Tester
		
		//var queryOnTesterList = '<Query><Where><Contains><FieldRef Name="TesterName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
		var queryOnTesterList =  '<Query><Where><Or><Contains><FieldRef Name="TesterName" /><Value Type="Text">'+textInputVal+'</Value></Contains><Contains><FieldRef Name="TesterFullName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Or></Where></Query>';
		var testerList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');
		var testerResult = testerList.getSPItemsWithQuery(queryOnTesterList).Items;
		if(testerResult != null && testerResult != undefined)
		{
			var AllTestPassIDs = new Array();
			var AllRoleIDs = new Array();
			for(var i=0;i<testerResult.length;i++)
			{
				if($.inArray(testerResult[i]['TestPassID'],AllTestPassIDs)==-1)
					AllTestPassIDs.push(testerResult[i]['TestPassID']);
					
				if($.inArray(testerResult[i]['RoleID'],AllRoleIDs)==-1)
					AllRoleIDs.push(testerResult[i]['RoleID']);
		
			}
			//ankita:8/23/2012 : Bulk Data Handling
			var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
			var testPassItems;
			if(AllTestPassIDs.length<=147)
			{
				var camlQuery='';
				var orEndTags='';
				camlQuery = '<Query><Where>';
				for(var i=0;i<AllTestPassIDs.length-1;i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestPassIDs[i]+'</Value></Eq>';
					orEndTags +='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestPassIDs[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				var TPResult=TestPassList.getSPItemsWithQuery(camlQuery).Items;
				if(TPResult!=undefined && TPResult!=null)
					testPassItems = TPResult;
			}
			else
			{
				var numberOfIterations = Math.ceil(AllTestPassIDs.length/147);
				var iterations =0;
				var camlQuery;
				var orEndTags='';
				testPassItems = new Array();
				for(var y=0; y<numberOfIterations-1; y++)
				{
					camlQuery = '<Query><Where>';
					orEndTags='';
					for(var i=iterations; i<(iterations+147)-1; i++)
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestPassIDs[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestPassIDs[i]+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';
					var TPResult=TestPassList.getSPItemsWithQuery(camlQuery).Items;
					if(TPResult!=undefined && TPResult!=null)
						$.merge(testPassItems,TPResult);
					iterations +=147;
				}
				camlQuery = '<Query><Where>';
				orEndTags='';
				for(var i=iterations; i<AllTestPassIDs.length-1; i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestPassIDs[i]+'</Value></Eq>';
					orEndTags +='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestPassIDs[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				var TPResult=TestPassList.getSPItemsWithQuery(camlQuery).Items;
				if(TPResult!=undefined && TPResult!=null)
					$.merge(testPassItems,TPResult);

			}
			var TestPassNameForTPID = new Array();
			var TestPassStatusForTPID = new Array();
			var ProejctIDForTPID = new Array();
			if(testPassItems !=null && testPassItems !=undefined)
			{
				for(var i=0;i<testPassItems.length;i++)
				{
					TestPassNameForTPID[ testPassItems[i]['ID'] ] = testPassItems[i]['TestPassName'];
					ProejctIDForTPID[ testPassItems[i]['ID'] ] = testPassItems[i]['ProjectId'];
					TestPassStatusForTPID[testPassItems[i]['ID']] = testPassItems[i]['Status'];
				}
			}
			//Ankita:8/23/2012 Bulk data Handling
			var TesterRoleList = jP.Lists.setSPObject(Main.getSiteUrl(),'TesterRole');
			var orEndTags='';
			var TesterRoleItems;
			if(AllRoleIDs.length<=147)
			{
				var camlQuery='';
				orEndTags='';
				camlQuery = '<Query><Where>';
				for(var i=0;i<AllRoleIDs.length-1;i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllRoleIDs[i]+'</Value></Eq>';
					orEndTags +='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllRoleIDs[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				TesterRoleResult=TesterRoleList.getSPItemsWithQuery(camlQuery).Items;
				if(TesterRoleResult!=undefined && TesterRoleResult!=undefined)
					TesterRoleItems = TesterRoleResult;
			}
			else
			{
				var numberOfIterations = Math.ceil(AllRoleIDs.length/147);
				var iterations =0;
				var camlQuery;
				var orEndTags='';
				TesterRoleItems= new Array();
				for(var y=0; y<numberOfIterations-1; y++)
				{
					camlQuery='<Query><Where>';
					orEndTags='';
					for(var i=iterations; i<(iterations+147)-1; i++)
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllRoleIDs[i]+'</Value></Eq>';
						orEndTags+='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllRoleIDs[i]+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';
					TesterRoleResult=TesterRoleList.getSPItemsWithQuery(camlQuery).Items;
					if(TesterRoleResult!=undefined && TesterRoleResult!=undefined)
						$.merge(TesterRoleItems,TesterRoleResult);
					iterations+=147;
				}
				camlQuery='<Query><Where>';
				orEndTags='';
				for(var i=iterations; i<AllRoleIDs.length-1; i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllRoleIDs[i]+'</Value></Eq>';
					orEndTags+='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllRoleIDs[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				TesterRoleResult=TesterRoleList.getSPItemsWithQuery(camlQuery).Items;
				if(TesterRoleResult!=undefined && TesterRoleResult!=undefined)
						$.merge(TesterRoleItems,TesterRoleResult);


			}
			var RoleNameForRoleID = new Array();
			if(TesterRoleItems !=null && TesterRoleItems !=undefined)
			{
				for(var i=0;i<TesterRoleItems.length;i++)
				{
					RoleNameForRoleID[ TesterRoleItems[i]['ID'] ] = TesterRoleItems[i]['Role'];
				}
				
			}
			RoleNameForRoleID[ 1 ] = "Standard";
			for(var i=0;i<testerResult.length;i++)
			{
				//Query On Parent List
				var QueryOnParentList = '<Query><Where><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testerResult[i]['TestPassID']+'</Value></Eq><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+testerResult[i]['SPUserID']+'</Value></Eq></And></Where><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
				var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');  
				var ParentResult =  ParentList.getSPItemsWithQuery(QueryOnParentList).Items;
				if(ParentResult !=null && ParentResult!=undefined)
				{
					//Ankita:8/23/2012 Bulk Data handling
					var ChildList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping');
					var ChildResult;
					if(ParentResult.length<=147)
					{
						var camlQuery='';
						var orEndTags='';
						camlQuery = '<Query><Where><And><Eq><FieldRef Name="Role" /><Value Type="Text">'+parseInt(testerResult[i]['RoleID']).toString()+'</Value></Eq>';
						for(var ii=0;ii<ParentResult.length-1;ii++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResult[ii]['ID']+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResult[ii]['ID']+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</And></Where><ViewFields><FieldRef Name="status" /></ViewFields></Query>';
						var Childlistresult=ChildList.getSPItemsWithQuery(camlQuery).Items;
						if(Childlistresult!=undefined && Childlistresult!=null)
							ChildResult = Childlistresult;
					}
					else
					{
						var numgerOfIterations= Math.ceil(ParentResult.length/147);
						var iterations=0;
						var camlQuery;
						var orEndTags='';
						ChildResult= new Array();
						for(var y=0; y<numgerOfIterations-1; y++)
						{
							camlQuery = '<Query><Where><And><Eq><FieldRef Name="Role" /><Value Type="Text">'+parseInt(testerResult[i]['RoleID']).toString()+'</Value></Eq>';
							orEndTags ='';
							for(var ii=iterations; ii<(iterations+147)-1; ii++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResult[ii]['ID']+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResult[ii]['ID']+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</And></Where><ViewFields><FieldRef Name="status" /></ViewFields></Query>';
							var Childlistresult=ChildList.getSPItemsWithQuery(camlQuery).Items;
							if(Childlistresult!=undefined && Childlistresult!=null)
								$.merge(ChildResult,Childlistresult);
							iterations +=147;
						}
						camlQuery = '<Query><Where><And><Eq><FieldRef Name="Role" /><Value Type="Text">'+parseInt(testerResult[i]['RoleID']).toString()+'</Value></Eq>';
						orEndTags ='';
						for(var ii=iterations; ii<ParentResult.length-1; ii++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResult[ii]['ID']+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResult[ii]['ID']+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</And></Where><ViewFields><FieldRef Name="status" /></ViewFields></Query>';
						var Childlistresult=ChildList.getSPItemsWithQuery(camlQuery).Items;
						if(Childlistresult!=undefined && Childlistresult!=null)
								$.merge(ChildResult,Childlistresult);

						
					}

					var testId = testerResult[i]["TestPassID"];
					var associatedTPName = TestPassNameForTPID[testerResult[i]["TestPassID"]];
		    		var associatedRoleName = RoleNameForRoleID[parseInt(testerResult[i]["RoleID"])];
		    		var TesterName = testerResult[i]["TesterFullName"];	
		    		var status = TestPassStatusForTPID[testerResult[i]["TestPassID"]];
		    			
		    		type='Assigned To.TestPass(As Tester)'; 
		    		Search.projectID = ProejctIDForTPID[testerResult[i]["TestPassID"]];
		    		redirect=Search.getURL()+'/TestStep_1.aspx?pid='+(Search.projectID);  
			 		ResultView.resultType="TestStep";
		
					resultObj.push({id:testId,associatedRoleName:associatedRoleName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect,status:status});													
				}
				
			}
		}	
	}
	
	//For Role of Tester and Test Step :Ejaz Waquif DT:5/19/2014
	if(fieldSearch == "role")
	{
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
		
		RoleNameByRoleIDArr[1] = "Standard";
		
		var roleName = textInputVal.toLowerCase();
		if("standard".indexOf(roleName)!=-1 && $.trim(roleName)!="")
			roleListResult.push({"ID":1,"Role":"Standard"});
		
		if(roleListResult!=undefined && roleListResult!=null && roleListResult.length!=0)
		{
			
			//CAML query for Tester list
			var camlQuery='';
			orEndTags='';
			camlQuery = '<Query><Where>';
			
			//CAML query for TestCaseToTestStepMapping list
			var camlQueryTCtoTS='';
			orEndTagsTCtoTS='';
			camlQueryTCtoTS = '<Query><Where>';
			
			var roleListResultLen = roleListResult.length<=147?roleListResult.length:147;

			
			for(var i=0;i<roleListResultLen-1;i++)
			{
				//CAML query for Tester list 
				camlQuery +='<Or><Eq><FieldRef Name="RoleID" /><Value Type="Number">'+roleListResult[i]["ID"]+'</Value></Eq>';
				orEndTags +='</Or>';
				
				//CAML query for TestCaseToTestStepMapping list
				camlQueryTCtoTS  +='<Or><Eq><FieldRef Name="Role" /><Value Type="Text">'+roleListResult[i]["ID"]+'</Value></Eq>';
				orEndTagsTCtoTS +='</Or>';

				//Array of Role names by Role ID
				RoleNameByRoleIDArr[roleListResult[i]["ID"]] = roleListResult[i]["Role"];
			}
			//Array of Role names by Role ID
			RoleNameByRoleIDArr[roleListResult[i]["ID"]] = roleListResult[i]["Role"];
			
			//CAML query for Tester list 
			camlQuery += '<Eq><FieldRef Name="RoleID" /><Value Type="Number">'+roleListResult[i]["ID"]+'</Value></Eq>';
			camlQuery +=orEndTags;
			camlQuery +='</Where><ViewFields></ViewFields></Query>';
			
			//CAML query for TestCaseToTestStepMapping list
			camlQueryTCtoTS += '<Eq><FieldRef Name="Role" /><Value Type="Text">'+roleListResult[i]["ID"]+'</Value></Eq>';
			camlQueryTCtoTS +=orEndTagsTCtoTS;
			camlQueryTCtoTS +='</Where><ViewFields></ViewFields></Query>';

			//Query on Tester list
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
					    //To put all the neccessary data in Array
						dataArr.push({
						
							'TPID':testerResult[i]["TestPassID"],
							'Tester':testerResult[i]["TesterFullName"],
							'RoleID':testerResult[i]["RoleID"],
							'RoleName': RoleNameByRoleIDArr[ parseInt(testerResult[i]["RoleID"]) ]
						
						});
						
						//To build the query to fetch the Test Pass Names and their Status
						camlQueryTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
						orEndTagsTP +='</Or>';							
					 }
					 
					 //To put all the neccessary data in Array
					 dataArr.push({
						
							'TPID':testerResult[i]["TestPassID"],
							'Tester':testerResult[i]["TesterFullName"],
							'RoleID':testerResult[i]["RoleID"],
							'RoleName': RoleNameByRoleIDArr [ parseInt(testerResult[i] ["RoleID"]) ]
						
					 });
						
					 //To build the query to fetch the Test Pass Names and their Status	
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
					var numberOfIterations = Math.ceil(testerResult.length/147)-1;
					var iterations =0;
					
					for(var y=0; y<numberOfIterations; y++)
					{
						var camlQueryTP='';
						var orEndTagsTP='';
						camlQueryTP = '<Query><Where>';

						for(var i=iterations; i<(iterations+147)-1; i++)
						{
							//To put all the neccessary data in Array
							dataArr.push({
							
								'TPID':testerResult[i]["TestPassID"],
								'Tester':testerResult[i]["TesterFullName"],
								'RoleID':testerResult[i]["RoleID"],
								'RoleName': RoleNameByRoleIDArr[ parseInt(testerResult[i]["RoleID"]) ]
							
							});
							
							//To build the query to fetch the Test Pass Names and their Status
							camlQueryTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
							orEndTagsTP +='</Or>';
							
							
						}
						
						//To put all the neccessary data in Array
						dataArr.push({
							
								'TPID':testerResult[i]["TestPassID"],
								'Tester':testerResult[i]["TesterFullName"],
								'RoleID':testerResult[i]["RoleID"],
								'RoleName': RoleNameByRoleIDArr [ parseInt(testerResult[i] ["RoleID"]) ]
							
						 });

						//To build the query to fetch the Test Pass Names and their Status	
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
					
					/* To iterate the remaining items */
					var camlQueryTP='';
					var orEndTagsTP='';
					camlQueryTP = '<Query><Where>';

					for(var i=iterations; i<testerResult.length-1; i++)
					{
						//To put all the neccessary data in Array
							dataArr.push({
							
								'TPID':testerResult[i]["TestPassID"],
								'Tester':testerResult[i]["TesterFullName"],
								'RoleID':testerResult[i]["RoleID"],
								'RoleName': RoleNameByRoleIDArr[ parseInt(testerResult[i]["RoleID"]) ]
							
							});
							
							//To build the query to fetch the Test Pass Names and their Status
							camlQueryTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testerResult[i]["TestPassID"]+'</Value></Eq>';
							orEndTagsTP +='</Or>';

					}
					//To put all the neccessary data in Array
					dataArr.push({
						
							'TPID':testerResult[i]["TestPassID"],
							'Tester':testerResult[i]["TesterFullName"],
							'RoleID':testerResult[i]["RoleID"],
							'RoleName': RoleNameByRoleIDArr [ parseInt(testerResult[i] ["RoleID"]) ]
						
					 });

					//To build the query to fetch the Test Pass Names and their Status	
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

					/* To iterate the remaining items */


					
				
				}


			}//---1--->
			
			//To fill the ResultObj Array
			if(dataArr!=undefined && dataArr.length!=0)
			{
				for(var i=0;i<dataArr.length;i++)
				{
					if(testPassDetailArr[dataArr[i]["TPID"]] != undefined)
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
			}
			
			
			//To fill the resultObj array for Role-Test Steps
			
			//Query on TestCaseToTestStepMapping list
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
				
				//To get the Test Step Names by Test Step IDs
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
				//End of To get the Test Step Names by Test Step IDs
				
				
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

				/*End of To get the Test Pass Names by Test Pass IDs*/
				
				/*To get the Tester Names by SPUser IDs*/
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
				/*End of To get the Tester Names by SPUser IDs*/
				
				/*To get the Test Case Names by Test Case IDs*/
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
				/*End of To get the Test Case Names by Test Case IDs*/
				
				/* To fill the ResultObj Array */
				if(testStepDataArr!=undefined && testStepDataArr.length!=0)
				{
					for(var i=0;i<testStepDataArr.length;i++)
					{
						var testStepId = testStepDataArr[i]["TSID"];					
			       	    var testStepName = TestStepNameForTSID[ testStepDataArr[i]["TSID"] ];
			       	    var status = testStepDataArr[i]["Status"];
						var testerName = TesterNameForSPUserID[ testStepDataArr[i]["TesterSPUserID"] ];
						var role = RoleNameByRoleIDArr [ parseInt(testStepDataArr[i] ["RoleID"]) ];
						//var projectID = testPassDetailArr[testStepDataArr[i]["TPID"]][0]["ProjectID"];
						var SPUserID = testStepDataArr[i]["SPUserID"];
						var testCase = TestCaseNameForTestCaseID[ parseInt(testStepDataArr[i] ["TCID"]) ];
						var testPass = TestPassNameForTestPassID[ parseInt(testStepDataArr[i] ["TPID"]) ];
					
						type='Role-Test Step(s)';
			  			
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
		
						//var associatedTPName = TestPassNameForTestPassID[ParentListResult[i]["TestPassID"]];
						resultObj.push({id:testStepId,name:testStepName,status:status,queryType:type,redirect:redirect,associatedRoleName:role,TesterName:testerName,associatedTCName:testCase,associatedTPName:testPass});
						//resultObj.push({id:testId,name:testName,status:status,associatedTCName:associatedTCName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect});													
						
					}
				}
				/*End of To fill the ResultObj Array */		
													
		

			}

		}
	}

	//End of For Role of Tester and Test Step :Ejaz Waquif DT:5/19/2014
	

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
	//For Status of Test Case & Test Step
	if(fieldSearch == "status")
	{
		//Status of Test Case
		var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
		if(opr == "contains")
			var QueryOnTPToTCList = '<Query><Where><Contains><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
		else
			var QueryOnTPToTCList = '<Query><Where><Neq><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where></Query>';	
		var ParentListResult = ParentList.getSPItemsWithQuery(QueryOnTPToTCList).Items;
		if(ParentListResult!=null && ParentListResult!=undefined)
		{
			var allTestPassIDs = new Array();
			var AllTestCases = new Array();
			
			//Get all the unique associated Test Case ID(s) & associated Test Pass ID(s) 
			for(var i=0;i<ParentListResult.length;i++)
			{
				if($.inArray(ParentListResult[i]['TestCaseID'],AllTestCases) == -1)		 
					AllTestCases.push(ParentListResult[i]['TestCaseID']);
					
				if($.inArray(ParentListResult[i]['TestPassID'],allTestPassIDs) == -1)	
					allTestPassIDs.push(ParentListResult[i]['TestPassID']);	
			}
			
			var TestCaseNameForTCID = new Array(); 
			var orEndTags='';
			//Query on Test Case List using Test Case ID to get Name of Test Case
			if(AllTestCases.length<=147)
			{
				var camlQuery='';
				orEndTags='';
				camlQuery = '<Query><Where>';
				for(var i=0;i<AllTestCases.length-1;i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestCases[i]+'</Value></Eq>';
					orEndTags +='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestCases[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');
				var testCaseItems = TestCaseList.getSPItemsWithQuery(camlQuery).Items;
				if(testCaseItems!=null && testCaseItems!=undefined)
				{
					for(var i=0;i<testCaseItems.length;i++)
						TestCaseNameForTCID[ testCaseItems[i]['ID'] ] = testCaseItems[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
				}
			}
			else
			{
				var iteration= Math.ceil((AllTestCases.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
	          	var iterationStartPoint=0;
	          	for(var y=0;y<iteration;y++)
	          	{
					if(y!=iteration-1)
		          	{
		          		orEndTags='';
		          		var camlQuery = '<Query><Where>';	
		          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
		          		{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestCases[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+AllTestCases[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';				
		                
		                iterationStartPoint+=147;
						 //////
		            
						var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');
						var testCaseItems = TestCaseList.getSPItemsWithQuery(camlQuery).Items;
					   	if(testCaseItems!=null && testCaseItems!=undefined)
						{
							for(var ii=0;ii<testCaseItems.length;ii++)
								TestCaseNameForTCID[ testCaseItems[ii]['ID'] ] = testCaseItems[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
						}
					}
					else
					{
						var camlQuery = '<Query><Where>';
						orEndTags='';
						for(var w=iterationStartPoint;w<(AllTestCases.length)-1;w++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+AllTestCases[w]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+AllTestCases[w]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
										
			         	var TestCaseList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');
						var testCaseItems = TestCaseList.getSPItemsWithQuery(camlQuery).Items;
					   	if(testCaseItems!=null && testCaseItems!=undefined)
						{
							for(var ii=0;ii<testCaseItems.length;ii++)
								TestCaseNameForTCID[ testCaseItems[ii]['ID'] ] = testCaseItems[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
						}
	  
			     	}		
          		}
			}	
			//Query on Test Pass List & Tester List to get name of Test Pass & Tester resp.
			//Two queries on Test Pass List and Tester List resp. are created in same 'for loop' to save iterations
			var TestPassNameForTestPassID = new Array();
			var ProejctIDForTPID = new Array();
			var TesterNameForSPUserID = new Array();
			var TesterSPUserID = new Array();
			var orEndTags='';
			if(allTestPassIDs.length<=147)
 			{
	 			var camlQueryForTestPassList='';
	 			var camlQueryForTesterList='';
	 			orEndTags ='';
					camlQueryForTestPassList = '<Query><Where>';
					camlQueryForTesterList = '<Query><Where>';
					for(var i=0;i<allTestPassIDs.length-1;i++)			 
					{
						camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
						camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}	
					camlQueryForTestPassList+= '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
					
						camlQueryForTestPassList+=orEndTags;
						camlQueryForTesterList+=orEndTags;
						
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
		          		orEndTags ='';	
		          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
		          		{
							camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
							camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
						camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
						
							camlQueryForTestPassList+=orEndTags;
							camlQueryForTesterList+=orEndTags;
						
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
						camlQueryForTestPassList = '<Query><Where>';
						camlQueryForTesterList = '<Query><Where>';
						orEndTags='';
						for(var w=iterationStartPoint;w<(allTestPassIDs.length)-1;w++)
						{
							camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
							camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[w]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
						camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[w]+'</Value></Eq>';
						
							camlQueryForTestPassList+=orEndTags;
							camlQueryForTesterList+=orEndTags;
							
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

			for(var i=0;i<ParentListResult.length;i++)
			{
				var testId = ParentListResult[i]["TestCaseID"];					
	       	    var testName = TestCaseNameForTCID[ ParentListResult[i]["TestCaseID"] ];
	       	    var status = ParentListResult[i]["status"];
	       	   	var associatedTPName = TestPassNameForTestPassID[ ParentListResult[i]["TestPassID"] ];
				var TesterName = TesterNameForSPUserID[ ParentListResult[i]['SPUserID'] ];
			
				type='Status-Test case(s)';
				var assignTo= 'N/A';//testItems[i]["assignedTo"];
	  			var priority= 'N/A';//testItems[i]["priority"];
	  			var state='N/A';// testItems[i]["state"];
	  			var dueDate='N/A'
	  			
	  			Search.projectID = ProejctIDForTPID[ ParentListResult[i]["TestPassID"] ];
	  			redirect=Search.getURL()+'/TestCase_1.aspx?pid='+(Search.projectID);  
		 		ResultView.resultType="TestCase";

				var associatedTPName = TestPassNameForTestPassID[ParentListResult[i]["TestPassID"]];
				resultObj.push({id:testId,name:testName,status:status,queryType:type,redirect:redirect,associatedTPName:associatedTPName,TesterName:TesterName});													

			}
				
		}
		
        //Status of Test Step	
        var uniqueRoleIDArr = new Array();
		var roleNameByRoleIDArr = new Array();
		roleNameByRoleIDArr[1] = "Standard";
		
		var ChildList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping');
		if(opr == "contains")
			var QueryOnTCToTSList = '<Query><Where><Contains><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
		else
			var QueryOnTCToTSList = '<Query><Where><Neq><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where></Query>';	
		var ChildListResult = ChildList.getSPItemsWithQuery(QueryOnTCToTSList).Items;
		if(ChildListResult != null && ChildListResult != undefined)
		{
			var uniqueParentID = new Array();
			var uniqueTSID = new Array();
			for(var i=0;i<ChildListResult.length;i++)
			{
				if($.inArray(ChildListResult[i]['TestStep'],uniqueTSID)==-1)
					uniqueTSID.push(ChildListResult[i]['TestStep']);
				
				if($.inArray(ChildListResult[i]['TestPassMappingID'],uniqueParentID)==-1)
					uniqueParentID.push(ChildListResult[i]['TestPassMappingID']);	
					
				if($.inArray(ChildListResult[i]['Role'],uniqueRoleIDArr)==-1)
					uniqueRoleIDArr.push( parseInt( ChildListResult[i]["Role"] ) );	

			}	
			
			var TSID = new Array();
			var TestStepNameForTSID = new Array();
			var orEndTags='';
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
			var allTestPassIDs = new Array();
			var uniqueTCIDs = new Array();
			var uniqueTester = new Array();
			var orEndTags='';	
			if(uniqueParentID.length<=147)
			{
				var camlQuery = '<Query><Where>';
				orEndTags='';
				for(var i=0;i<uniqueParentID.length-1;i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
					orEndTags +='</Or>';
				}
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
				camlQuery +=orEndTags;
				camlQuery +='</Where><ViewFields></ViewFields></Query>';
				var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
				var ParentListResult = ParentList.getSPItemsWithQuery(camlQuery).Items;
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
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';				
		                
		                iterationStartPoint+=147;
						 //////
		            
						var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
						var ParentListResult = ParentList.getSPItemsWithQuery(camlQuery).Items;
						if(ParentListResult != null && ParentListResult != undefined)
						{
							for(var ii=0;ii<ParentListResult.length;ii++)
							{
								if($.inArray(ParentListResult[ii]['TestPassID'],allTestPassIDs) == -1)
									allTestPassIDs.push(ParentListResult[ii]['TestPassID']);
									
								if($.inArray(ParentListResult[ii]['TestCaseID'],uniqueTCIDs) == -1)
									uniqueTCIDs.push(ParentListResult[ii]['TestCaseID']);
								
								if($.inArray(ParentListResult[ii]['SPUserID'],uniqueTester) == -1)	
									uniqueTester.push(ParentListResult[ii]['SPUserID']);
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
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+uniqueParentID[w]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
										
			         	var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
						var ParentListResult = ParentList.getSPItemsWithQuery(camlQuery).Items;
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
          		}
			
			
			}	
			
		//Query on Test Pass List & Tester List to get name of Test Pass & Tester resp.
			//Two queries on Test Pass List and Tester List resp. are created in same 'for loop' to save iterations
			var TestPassNameForTestPassID = new Array();
			var ProejctIDForTPID = new Array();
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
			var TesterNameForSPUserID = new Array();
			var TesterSPUserID = new Array();
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
	
			//Test Case Name for TCID
				var TestCaseNameForTestCaseID = new Array();
				var orEndTags='';
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
				var associatedTCName = '';
   	    		var associatedTPName = '';
   	    		var TesterName = '';	
				if(TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ] !=undefined)
   	    		{
	   	    		 var testId = ChildListResult[i]["TestStep"];
					 var status = ChildListResult[i]['status'];
					 if(TestStepNameForTSID[ ChildListResult[i]['TestStep'] ] != undefined)
						var testName = TestStepNameForTSID[ ChildListResult[i]['TestStep'] ];
					 else
						var testName = "N/A";
						
					 var role = roleNameByRoleIDArr[ parseInt(ChildListResult[i]['Role']) ];
					 	
	   	    		 associatedTCName = TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ].split(",")[1];
	   	    		 associatedTPName = TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ].split(",")[2];
	   	    		 TesterName = TesterNameTCNameTPNameForParentID[ ChildListResult[i]['TestPassMappingID'] ].split(",")[0];
	   	    		 
	   	    		 type='Status-Test step(s)'; 
   	    		  
			 		ResultView.resultType="TestStep";
	
					resultObj.push({id:testId,name:testName,status:status,associatedTCName:associatedTCName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect,associatedRoleName:role});													
	   	    	}	
   	    		
			}
		}

	}
	//For Status of Test Case & Test Step	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////							
	/*For Test cases*/
	if(fieldSearch != "status") 
	{
		listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');	
		
		//Added by Harshal on 14 March
		if(fieldSearch == "id")
		{
			//Query on Parent List using Test Case ID to get all the Tester(s) of the Test Case 
			var ParentList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
			if(opr == "equals")
				var QueryOnTPToTCList = '<Query><Where><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where></Query>';
			else
				var QueryOnTPToTCList = '<Query><Where><Neq><FieldRef Name="TestCaseID" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where></Query>';
			var ParentListResult = ParentList.getSPItemsWithQuery(QueryOnTPToTCList).Items;
			if(ParentListResult!=null && ParentListResult!=undefined)
			{
				//Query on Test Case List using Test Case ID to get all the associated Test Pass ID(s) of the Test Case and Name of Test Case
				if(opr == "equals")
					var QueryOnTCList = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+textInputVal+'</Value></Eq></Where></Query>';
				else	
					var QueryOnTCList = '<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Counter">'+textInputVal+'</Value></Neq></Where></Query>';
				var testItems =listN1.getSPItemsWithQuery(QueryOnTCList).Items;
				if(testItems!=null && testItems!=undefined)
				{
					var tcNameForTCID = new Array();
					for(var i=0;i<testItems.length;i++)
						tcNameForTCID[testItems[i]['ID']] = testItems[i]['testCaseName'];
					var TestPassNameForTestPassID = new Array();
					
					var TesterListItems = new Array();
					var TestPassListItems = new Array();
					var TesterList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');
					var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
					var uniqueTPIDs = new Array();
					var uniqueSPUserIDs = new Array();
					for(var i=0;i<ParentListResult.length;i++)
					{
						if($.inArray(ParentListResult[i]['SPUserID'],uniqueSPUserIDs) == -1)
							uniqueSPUserIDs.push(ParentListResult[i]['SPUserID']);
						
						if($.inArray(ParentListResult[i]['TestPassID'],uniqueTPIDs) == -1)
							uniqueTPIDs.push(ParentListResult[i]['TestPassID'])
					}
					if(uniqueTPIDs.length<=147)
					{
						var camlQuery='';
						var camlQueryForTP = '';
						var orEndTags='';
						camlQuery = '<Query><Where>';
						camlQueryForTP = '<Query><Where>';
						for(var i=0;i<uniqueTPIDs.length-1;i++)			 
						{
							camlQueryForTP +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+uniqueTPIDs[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}	
						camlQueryForTP += '<Eq><FieldRef Name="ID" /><Value Type="Text">'+uniqueTPIDs[i]+'</Value></Eq>';
						camlQueryForTP +=orEndTags;
						camlQueryForTP +='</Where><ViewFields></ViewFields></Query>';
						TestPassListItems =	TestPassList.getSPItemsWithQuery(camlQueryForTP).Items;
					}	
					else
					{
						var numberOfIterations=Math.ceil(uniqueTPIDs.length/147);
						var iterations=0;
						var orEndTags='';
						var camlQueryForTP = '';
						var camlQuery;
						TesterListItems = new Array();
						for(var y=0; y<numberOfIterations-1; y++)
						{
							camlQuery = '<Query><Where>';
							orEndTags='';
							for(var i=0+iterations; i<(iterations+147)-1; i++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+uniqueTPIDs[i]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Text">'+uniqueTPIDs[i]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';
							var TesterResult= TestPassList.getSPItemsWithQuery(camlQuery).Items;
							if(TesterResult!=null && TesterResult!=undefined)
								$.merge(TestPassListItems,TesterResult);
							
							iterations+=147;
						}
						camlQuery = '<Query><Where>';
						var camlQueryForTP = '';
						orEndTags='';
						for(var i=iterations; i<uniqueTPIDs.length-1; i++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+uniqueTPIDs[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Text">'+uniqueTPIDs[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
						var TesterResult= TestPassList.getSPItemsWithQuery(camlQuery).Items;
						if(TesterResult!=null && TesterResult!=undefined)
							$.merge(TestPassListItems,TesterResult);
					}
					if(uniqueSPUserIDs.length<=147)
					{
						var camlQuery='';
						var camlQueryForTP = '';
						var orEndTags='';
						camlQuery = '<Query><Where>';
						for(var i=0;i<uniqueSPUserIDs.length-1;i++)			 
						{
							camlQuery +='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueSPUserIDs[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}	
						camlQuery += '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueSPUserIDs[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
						TesterListItems = TesterList.getSPItemsWithQuery(camlQuery).Items;

					}
					else
					{
						var numberOfIterations=Math.ceil(uniqueSPUserIDs.length/147);
						var iterations=0;
						var orEndTags='';
						var camlQueryForTP = '';
						var camlQuery;
						TesterListItems = new Array();
						for(var y=0; y<numberOfIterations-1; y++)
						{
							camlQuery = '<Query><Where>';
							orEndTags='';
							for(var i=0+iterations; i<(iterations+147)-1; i++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueSPUserIDs[i]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueSPUserIDs[i]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields></ViewFields></Query>';
							var TesterResult= TesterList.getSPItemsWithQuery(camlQuery).Items;
							if(TesterResult!=null && TesterResult!=undefined)
								$.merge(TesterListItems,TesterResult);
							
							iterations+=147;
						}
						camlQuery = '<Query><Where>';
						var camlQueryForTP = '';
						orEndTags='';
						for(var i=iterations; i<uniqueSPUserIDs.length-1; i++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueSPUserIDs[i]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+uniqueSPUserIDs[i]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
						var TesterResult= TesterList.getSPItemsWithQuery(camlQuery).Items;
						if(TesterResult!=null && TesterResult!=undefined)
							$.merge(TesterListItems,TesterResult);
						
					}
					if(TestPassListItems != null && TestPassListItems != undefined)
					{
						for(var i=0;i<TestPassListItems.length;i++)
							TestPassNameForTestPassID[ TestPassListItems[i]['ID'] ] = TestPassListItems[i]['TestPassName'];
					}
					if(TesterListItems !=null && TesterListItems !=undefined)
					{
						var combOfTPIDAndSPUserID = new Array();
						var TesterNameForTPIDAndSPUserID = new Array();
						for(var i=0;i<TesterListItems.length;i++)
						{
							var combOfTPIDAndSPUserID2 = TesterListItems[i]['TestPassID'] + "," + TesterListItems[i]['SPUserID'];
							if($.inArray(combOfTPIDAndSPUserID2,combOfTPIDAndSPUserID)==-1)
							{
								combOfTPIDAndSPUserID.push(combOfTPIDAndSPUserID2);
								TesterNameForTPIDAndSPUserID[combOfTPIDAndSPUserID2] = TesterListItems[i]['TesterFullName'];
							}	
							
						}
					}	
						
					
					for(var i=0;i<ParentListResult.length;i++)
					{
						var testId = ParentListResult[i]["TestCaseID"];					
			       	    var testName= tcNameForTCID[ testId ].replace(/</g,'&lt;').replace(/>/g,'&gt;');
			       	    var status= ParentListResult[i]["status"];
			       	   
						var TesterName = TesterNameForTPIDAndSPUserID[ParentListResult[i]['TestPassID'] + "," + ParentListResult[i]['SPUserID']];
					
						type = 'Id-Test case(s)';
						var assignTo= 'N/A';//testItems[i]["assignedTo"];
			  			var priority= 'N/A';//testItems[i]["priority"];
			  			var state='N/A';// testItems[i]["state"];
			  			var dueDate='N/A'
			  			
			  			Search.projectID=TestPassListItems[0]["ProjectId"];
			  			redirect=Search.getURL()+'/TestCase_1.aspx?pid='+(Search.projectID);  
	  			 		ResultView.resultType="TestCase";
	
						var associatedTPName = TestPassNameForTestPassID[ParentListResult[i]["TestPassID"]];
						resultObj.push({id:testId,name:testName,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,queryType:type,redirect:redirect,associatedTPName:associatedTPName,TesterName:TesterName});													
	
					}
				}	
			}	
								
		}
		else
		{
			if(fieldSearch=='project')
			var Query1 =Search.getSearchQuery(scenarioIdForProj,fieldSearch,opr, 'Test');
			else
			var Query1 =Search.getSearchQuery(textInputVal,fieldSearch,opr, 'Test'); //'<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
		
			//testItems =listN1.getSPItemsWithQuery(Query1).Items;	
			if(Query1 != undefined)
				var testItems =listN1.getSPItemsWithQuery(Query1).Items;				
		   	else
		   		var testItems = null;  	
			if(testItems!=null)
	   		{			   
				for(var i=0;i<testItems .length;i++)
				{	
				//alert(testItems .length);		   		  
			   		var testId=testItems[i]["ID"];					
		       	    var testName=( (testItems[i]["testCaseName"]!=null)&&(testItems[i]["testCaseName"]!=undefined) ) ? testItems[i]["testCaseName"] : '-';
		       	    var status= ( (testItems[i]["status"]!=null)&&(testItems[i]["status"]!=undefined) ) ? testItems[i]["status"] : '-';
		       	    var dueDate=	( (testItems[i]["dueDate"]!=null)&&(testItems[i]["dueDate"]!=undefined) ) ? testItems[i]["dueDate"] : '-';
		       	    var TestPassID=	( (testItems[i]["TestPassID"]!=null)&&(testItems[i]["TestPassID"]!=undefined) ) ? testItems[i]["TestPassID"] : '-';
		
		       	    
		       	    var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
			   		var testPassListQuery='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+TestPassID+'</Value></Eq></Where><ViewFields><FieldRef Name="ProjectId"/></ViewFields></Query>';
		 			var TestPassListItems =	TestPassList.getSPItemsWithQuery(testPassListQuery).Items;	
		       	    if(TestPassListItems!=null && TestPassListItems != undefined )
		       	    Search.projectID=TestPassListItems[0]["ProjectId"]; 
		 			var assignTo= 'N/A';//testItems[i]["assignedTo"];
		  			var priority= 'N/A';//testItems[i]["priority"];
		  			var state='N/A';// testItems[i]["state"];	
					
					 if(fieldSearch=='id'){
		  				   type='Id-Test case(s)';  				   
		  			 }
		  			 if(fieldSearch=='name'){
		  				   type='Name-Test case(s)';  				   
		  			 }  
		  			 if(fieldSearch=='assignTo'){
		  				   	type='Assigned To-Test case(s)';  				   
		  			 }	
		  			 
		  			 if(fieldSearch=='status'){
		  				   		type='Status-Test case(s)';  				   
		  			 }		 
			  		  redirect=Search.getURL()+'/TestCase_1.aspx?pid='+(Search.projectID);  
		  			 ResultView.resultType="TestCase";	   
		  			 resultObj.push({id:testId,name:testName,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,queryType:type,redirect:redirect});												
				}				
			}
		}	
			
	/*For Test cases*/
	
	/*For Test Steps*/
		listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');
	
	//Added by Harshal on 15 March
	
		if(fieldSearch == "id")
		{
			//Query on Action list using Test Step ID to get Test Step Name and all associated Test Cases
			var actionList = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');
			if(opr == "equals")
				var QueryOnActionList = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+textInputVal+'</Value></Eq></Where></Query>';
			else
				var QueryOnActionList = '<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Counter">'+textInputVal+'</Value></Neq></Where></Query>';
					
			var ActionListResult = actionList.getSPItemsWithQuery(QueryOnActionList).Items;
			if(ActionListResult !=null && ActionListResult!=undefined)
			{
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				var TestStepNameForTSID = new Array();
				var TSID = new Array();
				var uniqueRoleIDArr = new Array();
				var roleNameByRoleIDArr = new Array();
				roleNameByRoleIDArr[1] = "Standard";
				
				for(var i=0;i<ActionListResult.length;i++)
				{
					TestStepNameForTSID[ActionListResult[i]['ID']] = ActionListResult[i]['actionName'];
				}
				var ChildList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping');
				if(opr == "equals")
					var Query = '<Query><Where><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where></Query>';
				else	
					var Query = '<Query><Where><Neq><FieldRef Name="TestStep" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where></Query>';
				var ChildListResult = ChildList.getSPItemsWithQuery(Query).Items;
				
				if(ChildListResult != null && ChildListResult != undefined)
				{
					var uniqueParentID = new Array();
					var ParentListResult = new Array();
					for(var j=0;j<ChildListResult.length;j++)
					{
						if($.inArray(ChildListResult[j]['TestPassMappingID'],uniqueParentID)==-1)
							uniqueParentID.push(ChildListResult[j]['TestPassMappingID']);
							
						if($.inArray(ChildListResult[i]['Role'],uniqueRoleIDArr)==-1)
							uniqueRoleIDArr.push( parseInt( ChildListResult[i]["Role"] ) );		
					}
					var allTestPassIDs = new Array();
					var uniqueTCIDs = new Array();
					var uniqueTester = new Array();
					var orEndTags='';
					if(uniqueParentID.length<=147)
					{
						var camlQuery = '<Query><Where>';
						orEndTags='';
						for(var i=0;i<uniqueParentID.length-1;i++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
							orEndTags +='</Or>';
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
			          	orEndTags='';
			          	for(var y=0;y<iteration;y++)
			          	{
							if(y!=iteration-1)
				          	{
				          		var camlQuery = '<Query><Where>';
				          		orEndTags='';	
				          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
				          		{
									camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
									orEndTags +='</Or>';
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
									orEndTags +='</Or>';
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
					var TestPassNameForTestPassID = new Array();
					var ProejctIDForTPID = new Array();
					var orEndTags='';
					if(allTestPassIDs.length<=147)
					{
						var camlQueryForTestPassList= '<Query><Where>';
						orEndTags='';
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
					
					var TesterNameForSPUserID = new Array();
					var TesterSPUserID = new Array();
					var orEndTags='';
					if(uniqueTester.length<=147)
					{
						var camlQueryForTesterList= '<Query><Where>';
						orEndTags='';
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
								orEndTags='';
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
			
					//Test Case Name for TCID
					var TestCaseNameForTestCaseID = new Array();
					var orEndTags='';
					if(uniqueTCIDs.length<=147)
					{
						var camlQuery='';
						camlQuery = '<Query><Where>';
						orEndTags='';
						for(var i=0;i<uniqueTCIDs.length-1;i++)	
						{		 
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
							orEndTags +='</Or>';
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
			          	
			          	for(var y=0;y<iteration;y++)
			          	{
							if(y!=iteration-1)
				          	{
				          		orEndTags='';
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
									for(var i=0;i<TestCaseResult.length;i++)
									{
										if(TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] == undefined)
											TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] = TestCaseResult[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
									for(var ii=0;ii<TestCaseResult.length;ii++)
									{
										if(TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] == undefined)
											TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] = TestCaseResult[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
									}
								}
			  
					     	}		
			      		}
				
					}
				
		           	var TesterNameTCNameTPNameForParentID = new Array(); 	
					for(var i=0;i<ParentListResult.length;i++)
					{
						if(TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] == undefined)
							TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] = TesterNameForSPUserID[ParentListResult[i]['SPUserID']] +"`"+ TestCaseNameForTestCaseID[ParentListResult[i]['TestCaseID']] +"`"+ TestPassNameForTestPassID[ParentListResult[i]['TestPassID']];
					}
					
					/*To get the Role name by Role ID :Ejaz Waquif DT:5/22/2014*/
					//var roleNameByRoleIDArr = new Array();
					//roleNameByRoleIDArr[1] = "Standard";
					var Query = "<Query></Query>";					
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
						var testId = ChildListResult[i]["TestStep"];
						var status = ChildListResult[i]['status'];
						if(TestStepNameForTSID[ ChildListResult[i]['TestStep'] ] != undefined)
							var testName = TestStepNameForTSID[ ChildListResult[i]['TestStep'] ];
						else
							var testName = "N/A";
						var associatedTCName = '--';
		   	    		var associatedTPName = '--';
		   	    		var TesterName = '--';
		   	    		var role = roleNameByRoleIDArr[ parseInt(ChildListResult[i]['Role']) ]
		   	    			
						if(TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']]!=undefined)
		   	    		{
			   	    		 associatedTCName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[1];
			   	    		 associatedTPName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[2];
			   	    		 TesterName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[0];
			   	    	}
			   	    	type='Id-Test step(s)';
	  			 		ResultView.resultType="TestStep";

						resultObj.push({id:testId,name:testName,status:status,associatedTCName:associatedTCName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect,associatedRoleName:role});
				   	 }   	

				}
				/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			}
		}
		else
		{
			if(fieldSearch=='project')
			var Query1 =Search.getSearchQuery(scenarioIdForProj,fieldSearch,opr, 'Action');
			else
			var Query1 =Search.getSearchQuery(textInputVal,fieldSearch,opr, 'Action'); //'<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
			if(Query1 != undefined)
				var testItems =listN1.getSPItemsWithQuery(Query1).Items;				
		   	else
		   		var testItems = null;  
			//testItems =listN1.getSPItemsWithQuery(Query1).Items;	
					
		   	if(testItems!=null){	
				for(var i=0;i<testItems.length;i++){			   		  
			   		var testId=testItems[i]["ID"];					
		       	    var testName=( (testItems[i]["actionName"]!=null)&&(testItems[i]["actionName"]!=undefined) ) ? testItems[i]["actionName"] : '-';
		       	    var status= ( (testItems[i]["status"]!=null)&&(testItems[i]["status"]!=undefined) ) ? testItems[i]["status"] : '-';
		       	    var dueDate= 'N/A';//testItems[i]["dueDate"];
		       	    var TestCasesID=( (testItems[i]["TestCasesID"]!=null)&&(testItems[i]["TestCasesID"]!=undefined) ) ? testItems[i]["TestCasesID"] : '-';
		       	    var assignTo= 'N/A';//testItems[i]["assignedTo"];
			  		var priority= 'N/A';//testItems[i]["priority"];
			  		var state='N/A';// testItems[i]["state"];	
					
		       	    if(TestCasesID.indexOf(',')==-1)
		       	    	var anyOneTestCaseID=TestCasesID;
		       	    else
		       	    {   var splitTestCasesID=TestCasesID.split(',');
		       	        var anyOneTestCaseID=splitTestCasesID[0];
		       	    }
		       	    var TestPassToTestCaseMappingList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPassToTestCaseMapping');
			   		var TestPassToTestCaseMappingListQuery='<Query><Where><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+anyOneTestCaseID+'</Value></Eq></Where><ViewFields><FieldRef Name="TestPassID"/></ViewFields></Query>';
		 			var TestPassToTestCaseMappingListItems =TestPassToTestCaseMappingList.getSPItemsWithQuery(TestPassToTestCaseMappingListQuery).Items;	
		       	    if(TestPassToTestCaseMappingListItems !=null && TestPassToTestCaseMappingListItems != undefined )
		       	    {	
			       	    var TestPassID = TestPassToTestCaseMappingListItems[0]["TestPassID"]; 
			       	    var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
				   		var testPassListQuery='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+TestPassID+'</Value></Eq></Where><ViewFields><FieldRef Name="ProjectId"/></ViewFields></Query>';
			 			var TestPassListItems =	TestPassList.getSPItemsWithQuery(testPassListQuery).Items;	
			       	    if(TestPassListItems!=null && TestPassListItems != undefined )
			       	    Search.projectID=TestPassListItems[0]["ProjectId"]; 
			 		}	
					 if(fieldSearch=='id'){
		  				   type='Id-Test step(s)';  				   
		  			 }
		  			 if(fieldSearch=='name'){
		  				   type='Name-Test step(s)';  				   
		  			 }  
		  			 if(fieldSearch=='assignTo'){
		  				   	type='Assigned To-Test step(s)';  				   
		  			 }	
		  			 
		  			 if(fieldSearch=='status'){
		  				   		type='Status-Test step(s)';  				   
		  			 }		 
			  		  redirect=Search.getURL()+'/TestStep_1.aspx?pid='+(Search.projectID);  
		  			 ResultView.resultType="TestStep";	   
		  			 resultObj.push({id:testId,name:testName,status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,queryType:type,redirect:redirect});												
				}	
			 				
			}
		}		
	}
	
	/**********/
	return resultObj;
},

searchTestPasses:function(textInputVal,fieldSearch,opr)
{
	////////////////////////////////////////////////////////////////////////////////////
  var resultObj=[];
  var scenarioIdForProj;	
  var type="";
  var redirect;

  var TestPassList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
  var Query1 = '<Query><Where><Contains><FieldRef Name="TestPassName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where></Query>';
  var testItems = TestPassList.getSPItemsWithQuery(Query1).Items;	
  if(testItems!=null)
  {
	  for(var i=0;i<testItems .length;i++)
	  {
		  
		  	
		   var scenarioId=testItems[i]["ID"];					
		   var scenarioName=( (testItems[i]["TestPassName"]!=null)&&(testItems[i]["TestPassName"]!=undefined) ) ? testItems[i]["TestPassName"] : '-';
	
		   var dueDate= ( (testItems[i]["DueDate"]!=null)&&(testItems[i]["DueDate"]!=undefined) ) ? testItems[i]["DueDate"] : '-';
		   var assignTo= ( (testItems[i]["tstMngrFulNm"]!=null)&&(testItems[i]["tstMngrFulNm"]!=undefined) ) ? testItems[i]["tstMngrFulNm"] : '-';
		   Search.projectID= ( (testItems[i]["ProjectId"]!=null)&&(testItems[i]["ProjectId"]!=undefined) ) ? testItems[i]["ProjectId"] : '-';	 
		   var status =  testItems[i]["Status"];			   			  	  
			  
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
		  resultObj.push({id:scenarioId,name:scenarioName,status:status,dueDate:dueDate,assignTo:assignTo,queryType:type,redirect:redirect});	
	   }  
  }

	///////////////////////////////////////////////////////////////////////////////////
	
	
	return resultObj;
},

searchTestCases:function(textInputVal,fieldSearch,opr){

	
	var resultObj=[];
	var scenarioIdForProj;	
	
		
	var type="";
   	var redirect;
   		
   	//	alert( textInputVal + '--'+ fieldSearch + '--' + opr);
	
	/*For Test cases*/	  
	listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');	
	if(fieldSearch=='project')
	var Query1 =Search.getSearchQuery(scenarioIdForProj,fieldSearch,opr, 'Test');
	else
	var Query1 =Search.getSearchQuery(textInputVal,fieldSearch,opr, 'Test'); //'<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
	testItems =listN1.getSPItemsWithQuery(Query1).Items;	
	
	//Added by Harshal on 20 March//////////////////////////////////
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
					allTestPassIDs.push(testPassID[m].replace(/\|/g,''));//To get all the Associated Test Pass IDs for Test Case(s) 
			}
			TestCasesID.push(testItems[i]['ID']);
		}
		//Query on Test Pass List & Tester List to get name of Test Pass & Tester resp.
		//Two queries on Test Pass List and Tester List resp. are created in same 'for loop' to save iterations
		var TestPassNameForTestPassID = new Array();
		var ProejctIDForTPID = new Array();
		var TesterNameForSPUserID = new Array();
		var TesterSPUserID = new Array();
		var orEndTags=''; 
		if(allTestPassIDs.length<=147)
		{
 			var camlQueryForTestPassList='';
 			var camlQueryForTesterList='';
				camlQueryForTestPassList = '<Query><Where>';
				camlQueryForTesterList = '<Query><Where>';
				orEndTags ='';
				for(var i=0;i<allTestPassIDs.length-1;i++) 			 
				{
					camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
					
					orEndTags +='</Or>';
				}	
				camlQueryForTestPassList+= '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
				camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';

					camlQueryForTestPassList+=orEndTags;
					camlQueryForTesterList+=orEndTags;
				
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
	          		orEndTags ='';	
	          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
	          		{
						camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
						camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';
						
						orEndTags +='</Or>';
					}
					camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[i]+'</Value></Eq>';
					camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[i]+'</Value></Eq>';

						camlQueryForTestPassList+=orEndTags;
						camlQueryForTesterList+=orEndTags;
					
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
					orEndTags='';
					for(var w=iterationStartPoint;w<(allTestPassIDs.length)-1;w++)
					{
						camlQueryForTestPassList+='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
						camlQueryForTesterList+='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[w]+'</Value></Eq>';
						
						orEndTags +='</Or>';
					}
					camlQueryForTestPassList+= '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+allTestPassIDs[w]+'</Value></Eq>';
					camlQueryForTesterList+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[w]+'</Value></Eq>';

						camlQueryForTestPassList+=orEndTags;
						camlQueryForTesterList+=orEndTags;
						
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
		var orEndTags='';
		if(TestCasesID.length<=147)
		{
			var QueryOnTPToTCList='';
			QueryOnTPToTCList= '<Query><Where>';
			orEndTags='';
			for(var i=0;i<TestCasesID.length-1;i++)	
			{		 
				QueryOnTPToTCList+='<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
				orEndTags +='</Or>';
			}
			QueryOnTPToTCList+= '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
			QueryOnTPToTCList+=orEndTags;
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
	          		orEndTags='';
	          		var QueryOnTPToTCList= '<Query><Where>';	
	          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
	          		{
						QueryOnTPToTCList+='<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					QueryOnTPToTCList+= '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[i]+'</Value></Eq>';
					QueryOnTPToTCList+=orEndTags;
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
					orEndTags='';
					for(var w=iterationStartPoint;w<(TestCasesID.length)-1;w++)
					{
						QueryOnTPToTCList+='<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[w]+'</Value></Eq>';
						orEndTags +='</Or>';
					}
					QueryOnTPToTCList+= '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+TestCasesID[w]+'</Value></Eq>';
					QueryOnTPToTCList+=orEndTags;
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
	       	    var testName = TestCaseNameForTCID[ ParentListResult[i]["TestCaseID"] ].replace(/</g,'&lt;').replace(/>/g,'&gt;');
	       	    var status = ParentListResult[i]["status"];
	       	   	var associatedTPName = TestPassNameForTestPassID[ ParentListResult[i]["TestPassID"] ];
				var TesterName = TesterNameForSPUserID[ ParentListResult[i]['SPUserID'] ];
			
				type='Name-Test case(s)';
				
				Search.projectID = ProejctIDForTPID[ ParentListResult[i]["TestPassID"] ];
	  			redirect=Search.getURL()+'/TestCase_1.aspx?pid='+(Search.projectID);  
		 		ResultView.resultType="TestCase";
	
				var associatedTPName = TestPassNameForTestPassID[ParentListResult[i]["TestPassID"]];
				resultObj.push({id:testId,name:testName,status:status,queryType:type,redirect:redirect,associatedTPName:associatedTPName,TesterName:TesterName});													
	
			}
		}
			
	}
	
	///////////////////////////////////////////////////////////////////
	/*For Test cases*/
	return resultObj;
},

searchTestSteps:function(textInputVal,fieldSearch,opr)
{
//textInputVal=textInputVal.replace(/[^a-zA-Z 0-9]+/g,'');

	var txtSearch='';
	for(i=0;i<textInputVal.length;i++)
	{
		var text=textInputVal.charAt(i);
		if((text!='<>') || (text!='>') || (text!='!') || (text!='&gt')|| (text!='&lt'))
		txtSearch+=text;
		else
		break;
	}
	textInputVal=txtSearch;

	var result=[];
	
   	/*For Test Steps*/
	listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'Action');	
	if(fieldSearch=='project')
	var Query1 =Search.getSearchQuery(scenarioIdForProj,fieldSearch,opr, 'Action');
	else
	var Query1 =Search.getSearchQuery(textInputVal,fieldSearch,opr, 'Action'); //'<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
	testItems =listN1.getSPItemsWithQuery(Query1).Items;
	var result = Search.SearchForTSAndUATItems(testItems);
	return result;
},	
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SearchForTSAndUATItems:function(testItems)
{
	var resultObj=[];
	var scenarioIdForProj;	
	var type="";
   	var redirect;
   	
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
		var orEndTags='';
		if(TSID.length<=147)
		{
			var QueryOnTCToTSList ='';
			QueryOnTCToTSList = '<Query><Where>';
			orEndTags='';
			for(var i=0;i<TSID.length-1;i++)
			{			 
				QueryOnTCToTSList +='<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[i]+'</Value></Eq>';
				orEndTags +='</Or>';
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
			var iteration= Math.ceil((TSID.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
          	var iterationStartPoint=0;
          	ChildListResult = new Array();
          	
          	for(var y=0;y<iteration;y++)
          	{
				if(y!=iteration-1)
	          	{
	          		var QueryOnTCToTSList = '<Query><Where>';
	          		orEndTags='';	
	          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
	          		{
						QueryOnTCToTSList +='<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[i]+'</Value></Eq>';
						orEndTags +='</Or>';
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
								
								
							if($.inArray(ChildListResult2[i]['Role'],uniqueRoleIDArr)==-1)
								uniqueRoleIDArr.push( parseInt( ChildListResult2[i]["Role"] ) );	
	
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
						orEndTags +='</Or>';
					}
					QueryOnTCToTSList += '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[w]+'</Value></Eq>';
					QueryOnTCToTSList +=orEndTags;
					QueryOnTCToTSList +='</Where><ViewFields></ViewFields></Query>';
					var ChildListResult2 = ChildList.getSPItemsWithQuery(QueryOnTCToTSList).Items;
					if(ChildListResult2 !=null && ChildListResult2 !=undefined)
					{
					 	for(var j=0;j<ChildListResult2.length;j++)
					 	{
					 		ChildListResult.push(ChildListResult2[j]);
					 		if($.inArray(ChildListResult2[j]['TestPassMappingID'],uniqueParentID)==-1)
								uniqueParentID.push(ChildListResult2[j]['TestPassMappingID']);
								
							if($.inArray(ChildListResult2[i]['Role'],uniqueRoleIDArr)==-1)
								uniqueRoleIDArr.push( parseInt( ChildListResult2[i]["Role"] ) );	
						}		
	
					}
				}		
      		}
			
		}
		var ParentListResult = new Array();	
		if(ChildListResult.length != 0)
		{
			var allTestPassIDs = new Array();
			var uniqueTCIDs = new Array();
			var uniqueTester = new Array();
			var orEndTags='';
			if(uniqueParentID.length<=147)
			{
				var camlQuery = '<Query><Where>';
				orEndTags='';
				for(var i=0;i<uniqueParentID.length-1;i++)
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
					orEndTags +='</Or>';
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
	          	orEndTags='';
	          	for(var y=0;y<iteration;y++)
	          	{
					if(y!=iteration-1)
		          	{
		          		var camlQuery = '<Query><Where>';
		          		orEndTags='';	
		          		for(var i=0+iterationStartPoint;i<(147+iterationStartPoint)-1;i++)
		          		{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueParentID[i]+'</Value></Eq>';
							orEndTags +='</Or>';
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
							orEndTags +='</Or>';
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
			var orEndTags='';
			if(allTestPassIDs.length<=147)
			{
				var camlQueryForTestPassList= '<Query><Where>';
				orEndTags='';
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
		          		orEndTags='';	
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
						var camlQueryForTestPassList = '<Query><Where>';
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
			var TesterNameForSPUserID = new Array();
			var TesterSPUserID = new Array();
			var orEndTags='';
			if(uniqueTester.length<=147)
			{
				var camlQueryForTesterList= '<Query><Where>';
				orEndTags='';
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
						orEndTags='';
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
	
			//Test Case Name for TCID
				var TestCaseNameForTestCaseID = new Array();
				var orEndTags='';
				if(uniqueTCIDs.length<=147)
				{
					var camlQuery='';
					camlQuery = '<Query><Where>';
					orEndTags='';
					for(var i=0;i<uniqueTCIDs.length-1;i++)	
					{		 
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTCIDs[i]+'</Value></Eq>';
						orEndTags +='</Or>';
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
		          	
		          	for(var y=0;y<iteration;y++)
		          	{
						if(y!=iteration-1)
			          	{
			          		orEndTags='';
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
								for(var i=0;i<TestCaseResult.length;i++)
								{
									if(TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] == undefined)
										TestCaseNameForTestCaseID[TestCaseResult[i]['ID']] = TestCaseResult[i]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
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
								for(var ii=0;ii<TestCaseResult.length;ii++)
								{
									if(TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] == undefined)
										TestCaseNameForTestCaseID[TestCaseResult[ii]['ID']] = TestCaseResult[ii]['testCaseName'].replace(/</g,'&lt;').replace(/>/g,'&gt;');
								}
							}
		  
				     	}		
		      		}
			
				}
			
           	var TesterNameTCNameTPNameForParentID = new Array(); 	
			for(var i=0;i<ParentListResult.length;i++)
			{
				if(TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] == undefined)
					TesterNameTCNameTPNameForParentID[ ParentListResult[i]['ID'] ] = TesterNameForSPUserID[ParentListResult[i]['SPUserID']] +"`"+ TestCaseNameForTestCaseID[ParentListResult[i]['TestCaseID']] +"`"+ TestPassNameForTestPassID[ParentListResult[i]['TestPassID']];
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
				var associatedTCName = '--';
   	    		var associatedTPName = '--';
   	    		var TesterName = '--';
   	    		var role = roleNameByRoleIDArr[ parseInt(ChildListResult[i]['Role']) ];
   	    			
					if(TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']]!=undefined)
	   	    		{
		   	    		 associatedTCName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[1];
		   	    		 associatedTPName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[2];
		   	    		 TesterName = TesterNameTCNameTPNameForParentID[ChildListResult[i]['TestPassMappingID']].split("`")[0];
		   	    	}
	   	    	
   	    		type='Name-Test step(s)'; 
   	    		//Search.projectID = ProejctIDForTPID[];
   	    		//redirect=Search.getURL()+'/TestStep_1.aspx?pid='+(Search.projectID);  
		 		ResultView.resultType="TestStep";

				resultObj.push({id:testId,name:testName,status:status,associatedTCName:associatedTCName,associatedTPName:associatedTPName,TesterName:TesterName,queryType:type,redirect:redirect,associatedRoleName:role});													
			}
		}
		
	}	


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
   
	/**********/
	return resultObj;
},


getSearchQuery:function(textInputVal,fieldSearch,opr,list){
var query;
 
/*For Action*/
if(list=='Action'){
 	if(fieldSearch=='name'){
 		if(opr=='contains'){
 		//ankita:21/9/2012 as action name column in action list is multiline text so value type is changed from 'Text' to 'Note'
 			query='<Query><Where><Contains><FieldRef Name="actionName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="actionName" /><Value Type="Note">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
 	if(fieldSearch=='Test Steps'){
 		if(opr=='contains'){
 			query='<Query><Where><Contains><FieldRef Name="actionName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="actionName" /><Value Type="Note">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}

 	if(fieldSearch=='id'){
 		if(opr=='equals'){ 		
 			query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
	if(fieldSearch=='assignTo'){
 		if(opr=='equals'){ 		
 			query='<Query><Where><Contains><FieldRef Name="Tester" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="Tester" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}	
 	
 	if(fieldSearch=='status'){
 		if(opr=='contains'){ 		
 			query='<Query><Where><Contains><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}		
 	
 	if(fieldSearch=='project'){
 
 		//textInputVal= textInputVal+';#'+textInputVal; 	
 		
 		if(opr=='equals'){ 		
 			query='<Query><Where><Eq><FieldRef Name="projectId0" /><Value Type="Lookup">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="scenarioId" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="projectId0" /><Value Type="Lookup">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="scenarioId" Ascending="true"/></OrderBy></Query>';
 		}
 	}		
 }
 

/*For Action*/ 
/*For Test Pass*/
 if(list=='TestPass'){
 	if(fieldSearch=='name'){
 		if(opr=='contains'){
 			query='<Query><Where><Contains><FieldRef Name="TestPassName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="TestPassName" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
 	if(fieldSearch=='Test Passes'){
 		if(opr=='contains'){
 			query='<Query><Where><Contains><FieldRef Name="TestPassName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="TestPassName" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
 	if(fieldSearch=='id'){
 		if(opr=='equals'){ 		
 			query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
	if(fieldSearch=='assignTo'){
 		if(opr=='equals'){ 		
 			query='<Query><Where><Contains><FieldRef Name="Tester" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="Tester" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}	
 	
 	if(fieldSearch=='status'){
 		if(opr=='contains'){ 		
 			query='<Query><Where><Contains><FieldRef Name="Status" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="Status" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}		
 	
 	if(fieldSearch=='project'){
 
 		//textInputVal= textInputVal+';#'+textInputVal; 	
 		
 		if(opr=='equals'){ 		
 			query='<Query><Where><Eq><FieldRef Name="projectId0" /><Value Type="Lookup">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="scenarioId" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="projectId0" /><Value Type="Lookup">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="scenarioId" Ascending="true"/></OrderBy></Query>';
 		}
 	}		
 }
 /*For Test Pass*/
 
 /*For Test Cases*/
 if(list=='Test'){
 	if(fieldSearch=='name'){
 		if(opr=='contains'){
 			query='<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}
 	if(fieldSearch=='Test Cases'){
 		if(opr=='contains'){
 			query='<Query><Where><Contains><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="testCaseName" /><Value Type="Note">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}

 	if(fieldSearch=='id'){
 		if(opr=='equals'){
 			query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
 	
 	if(fieldSearch=='assignTo'){
 		if(opr=='equals'){ 		
 			query='<Query><Where><Contains><FieldRef Name="TesterName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="TesterName" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="testCaseID" Ascending="true"/></OrderBy></Query>';
 		}
 	}	
 	
 	if(fieldSearch=='status'){
 		if(opr=='contains'){ 		
 			query='<Query><Where><Contains><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}	
 	
 	//To be made dynamic for Test case
 	if(fieldSearch=='project'){
 	
			 var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'TestCases');
			 var Query1 ='<Query>><Where><Eq><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
			 var testItems =listN1.getSPItemsWithQuery(Query1).Items;				
   			 //var	queryResult=ResultView.getQueryResultView(testItems);	
   			   			
    		 var testId;
			 if(testItems!=null){			   
			   		for(var i=0;i<testItems .length;i++){			   		  
			   		  testId=testItems[i]["testCaseID"];					
			   	    }
			   	}	  	
			          		
 	
 		if(opr=='equals'){ 		
 			query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+testId+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Text">'+testId+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}	

 }

 if(list=='Project'){
 	if(fieldSearch=='name'){
 		if(opr=='contains'){
 		
 		    query='<Query><Where><Contains><FieldRef Name="projectName" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="projectName" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}
 	if(fieldSearch=='version'){
 	
 			var str = "Default "+gConfigVersion;
 			if(isPortfolioOn && str.toLowerCase().indexOf(textInputVal.toLowerCase())!= -1 && $.trim(textInputVal)!="" )
 			{
 				query='<Query><Where><Or><Contains><FieldRef Name="ProjectVersion" /><Value Type="Text">'+textInputVal+'</Value></Contains><IsNull><FieldRef Name="ProjectVersion" /></IsNull></Or></Where></Query>';
 			}
 			else
 				query='<Query><Where><Contains><FieldRef Name="ProjectVersion" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
	}

 	if(fieldSearch=='id'){
 		if(opr=='equals'){
 			query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){
 			query='<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}

 	}
 	
 	if(fieldSearch=='assignTo'){
 		if(opr=='equals'){ 		
 			//query='<Query><Where><Contains><FieldRef Name="projectLead" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 			query='<Query><Where><Or><Contains><FieldRef Name="projectLead" /><Value Type="Text">'+textInputVal+'</Value></Contains><Contains><FieldRef Name="prjLeadFulNm" /><Value Type="Text">'+textInputVal+'</Value></Contains></Or></Where></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="projectLead" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}	
 	
	if(fieldSearch=='status'){	
 		if(opr=='contains'){ 		
 			query='<Query><Where><Contains><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Contains></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="status" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	}	
 	
 	if(fieldSearch=='project'){
 		if(opr=='equals'){ 		
 			query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 		if(opr=='not'){ 		
 			query='<Query><Where><Neq><FieldRef Name="ID" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
 		}
 	} 	 	
}  
	
	if(list=='QueryResult'){
 		if(opr=='equals'){  		
 			query='<Query><Where><Eq><FieldRef Name="queryName" /><Value Type="Text">'+textInputVal+'</Value></Eq></Where><OrderBy><FieldRef Name="id" Ascending="true"/></OrderBy></Query>';
 	
		} 
		//Ankita: For bug id: 3497 10/9/2012
		if(opr=='notEquals'){  		
 			query='<Query><Where><Neq><FieldRef Name="queryName" /><Value Type="Text">'+textInputVal+'</Value></Neq></Where><OrderBy><FieldRef Name="ID" Ascending="True" /></OrderBy></Query>'; 	
		} 
 	}	
 	 	
	return query;
},
	

getQueryResults:function(textInputVal,fieldSearch,opr){
	
	var type;
   	var redirect;
   		
	/*For Projects*/	  
	var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'QueryResult');
	var Query1 =Search.getSearchQuery(textInputVal,fieldSearch,opr, 'QueryResult');
	var result =listN1.getSPItemsWithQuery(Query1).Items;
	
	//alert('srch'+result + 'ti'+ textInputVal);
   	var queryRes=new Array();
   	if(result!=null){	
		//queryRes=result[0].result; Commented by Harshal
		//Ankita: For bug id: 3497 10/9/2012
		for(i=0;i<result.length;i++)
		{
			//Added by Harshal on 13 March 2012
			$.merge(queryRes,result[i].result.split("`"));
		}
		for(var i=0;i<queryRes.length;i++)
		{
			Query.QuerySet.push({
					type:queryRes[i].split("~")[0],
					id:queryRes[i].split("~")[1],
					name:queryRes[i].split("~")[2],
					status:queryRes[i].split("~")[3],
					assignTo:queryRes[i].split("~")[4],
					redirect:queryRes[i].split("~")[5],
					associatedTPName:queryRes[i].split("~")[6],
					TesterName:queryRes[i].split("~")[7],
					associatedTCName:queryRes[i].split("~")[8],
					associatedRoleName:queryRes[i].split("~")[9],
					version:queryRes[i].split("~")[10],
			})
		}
		//Query.QuerySet.push({type:"Saved results", id:null, name:queryRes, status:null,dueDate:null,assignTo:null,priority:null,state:null,redirect:null});										  									
	} 
		  
	return Query.QuerySet;
}

}