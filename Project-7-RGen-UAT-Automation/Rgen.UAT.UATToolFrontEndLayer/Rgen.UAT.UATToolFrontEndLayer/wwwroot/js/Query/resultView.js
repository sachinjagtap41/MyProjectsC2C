/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var ResultView={
resultType:"",
AllResultInTableForm : '',
getQueryResultView:function(itemsObj,optionItemsTxt)
{
	var tableId='resultToExcel'+Query.totalResultTables;

//alert('curr:'+totalResultTables+' tot:'+ QueryGridCount);

	if(Query.totalResultTables<=Query.QueryGridCount)
	{
		Query.totalResultTables++; 	
		    if(itemsObj!=null)
		    {			   
		   				
				   		for(var i=0;i<itemsObj.length;i++)
				   		{		
				   			if((itemsObj[i]["status"]==null) || (itemsObj[i]["status"]=='undefined'))
				   			itemsObj[i]["status"]='--';
				   				   		  
				   			if(itemsObj[i]["status"].indexOf("#")!=-1)
				   			{
								var stat=itemsObj[i]["status"].split("#");
								itemsObj[i]["status"]=stat[1];							   
							}
				   		
				   		   var testId=itemsObj[i]["id"];	
				   		   var version = itemsObj[i]["version"];				
	       				   var testName=itemsObj[i]["name"];
	       				   var status= itemsObj[i]["status"];
	       				   var dueDate= itemsObj[i]["dueDate"];	       				
	  					   var assignTo= itemsObj[i]["assignTo"];
	  					   var priority= itemsObj[i]["priority"];
	  					   var state= itemsObj[i]["state"];	
	  					   var redirect=itemsObj[i]["redirect"];
	 					   var type=itemsObj[i]["queryType"];
	 					   var associatedTPName=itemsObj[i]["associatedTPName"];
	 					   var TesterName=itemsObj[i]["TesterName"]; 
	 					   var associatedTCName=itemsObj[i]["associatedTCName"];
	 					   var associatedRoleName=itemsObj[i]["associatedRoleName"];
	
	  					  	if((testId=='undefined') || (testId==null))
	  					  	testId='--';
	  					  	if((testName=='undefined') || (testName==null))
	  					  	testName='--';
	  					  	if((status=='undefined') || (status==null))
	  					  	status='--';
	  					  	if((dueDate=='undefined') || (dueDate==null))
	  					  	dueDate='--';
	  					  	if((assignTo=='undefined') || (assignTo==null))
	  					  	assignTo='--';
	  					  	if((associatedTPName=='undefined') || (associatedTPName==null))//Added by Harshal on 14 March
	  					  		associatedTPName='--';
	  					  	if((TesterName=='undefined') || (TesterName==null))//Added by Harshal on 14 March
	  					  		TesterName='--';	
	  					  	if((associatedTCName=='undefined') || (associatedTCName==null))//Added by Harshal on 16 March
	  					  		associatedTCName='--';	
	  					  	if((associatedRoleName=='undefined') || (associatedRoleName==null))//Added by Harshal on 20 March
	  					  		associatedRoleName='--';	
	  					  	if((priority=='undefined') || (priority==null))
	  					  	{
	  					  	priority='--';
	  					  	}
	  					  	else
	  					  	{  					  	
	  					  		 if(priority=='High')
	  					  		 priority='<img src="/SiteAssets/images/icon-priority-high.png" />';
	  					  		  if(priority=='Medium')
	  					  		 priority='<img src="/SiteAssets/images/icon-priority-medium.png" />';
	  					  		  if(priority=='Low')
	  					  		 priority='<img src="/SiteAssets/images/icon-priority-low.png" />';
	  					  	}
	  					  	if((state=='undefined') || (state==null))
	  					  	state='--';
							if((redirect=='undefined') || (redirect==null) || redirect == '')
	  					  	redirect='--';										
							Query.QuerySet.push({type:type, id:testId,version:version, name:testName, status:status,dueDate:dueDate,assignTo:assignTo,priority:priority,state:state,redirect:redirect,associatedTPName:associatedTPName,TesterName:TesterName,associatedTCName:associatedTCName,associatedRoleName:associatedRoleName});														  				
						}														
			} 				  			   
	}
},

displayResults:function(prevPaging,nextPaging,pagingSize,resultSet)
{			
	  		 var queryResultUi='';
             allResults=resultSet;
	
			 if(prevPaging<0){			  		  
			  	prevPaging=0;
			  	nextPaging=Paging.PagingSize;
		  		Paging.resetPagingFirst();			  	
        	 	//return false;
        	 }             	  	
				
		 	  var countRow=0;var typeHead='';
		 	  var countRowForVersion = 0;
		 	  var countRowForVersionName = 0;
		 	  var countRowForVersionFreeText = 0;
		 	  var countRowForTestPassName = 0;
		 	  var countRowForTestPassID = 0;
		 	  var countRowForTSID = 0;
		 	  var countRowForTCID = 0;
		 	  var countRowForStatusProject	= 0;
		 	  var countRowForStatusTestPass	= 0;
		 	  var countRowForStatusTP	= 0;
		 	  var countRowForStatusTCID = 0;
		 	  var countRowForStatusTSID	= 0;
		 	  var countRowForNameTC = 0;	
		 	  var countRowForNameTS = 0; 	
		 	  var countRowForAssignedToLead = 0;
		 	  var countRowForAssignedToTestManager = 0;  
		 	  var countRowForAssignedToTester = 0; 
		 	  var countRowForUATItemsTP = 0; 
		 	  var countRowForUATItemsTC = 0;
		 	  var countRowForUATItemsTS = 0;
		 	  var countRowForIDVersion = 0; 
		 	  var countRowForIDUIVersion = 0;
		 	  var countRowForIDTP = 0;
		 	  var countRowForIDTC = 0;
		 	  var countRowForIDTS = 0;
		 	  var countRowForRoleTP = 0;
		 	  var countRowForRoleTS = 0;
		 	  
		 	  for(var j=prevPaging;j<nextPaging;j++)
 	    	  {		
 	    	  		var ProjOrVerSelector = Query.gConfigProject;
 	    	  		var ProjAndVer = Query.gConfigProject+'(s)';
 	    	  		if(isPortfolioOn)
 	    	  		{
 	    	  			ProjOrVerSelector = Query.gConfigVersion
 	    	  			ProjAndVer = Query.gConfigProject+'(s) and '+Query.gConfigVersion+'(s)';
 	    	  		}	
 	    	  
 	    	  		if(allResults[j].type.split("=")[1] != undefined)		
						var type =allResults[j].type.split("=")[1];
					else
						var type =allResults[j].type;	 
					if(countRow==0 && type == undefined)
					{						
						var tableId='resultToExcel0';
						if(type == undefined)
							type = "Saved results";
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+allResults[j].type+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Name</b></td>';
						queryResultUi+='<td class="tblhd" width="200"><b>Assigned To</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td> <td class="tblhd" width="80"><b>Priority</b></td><td class="tblhd" width="80"><b>State</b></td></tr>';			
					}
					if(countRowForVersionName==0 && type == "Name-Version(s)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Name-'+ProjOrVerSelector+'(s)</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						else
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';									
						countRowForVersionName++;
					}
					
					if(countRowForVersion==0 && type == "Project(s)-Version")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigProject+'(s)-'+ProjOrVerSelector+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						else
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';				
						countRowForVersion++;
					}

					if(countRowForVersionFreeText==0 && type == "Name-Project(s) and Version(s)")//Free text search
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Name-'+ProjAndVer+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						else
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						countRowForVersionFreeText++;
					}
					if(countRowForTestPassName==0 && type == "Name-TestPass(es)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Name-'+Query.gConfigTestPass+'(es)</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';			
						countRowForTestPassName++;
					}

					//Added by Harshal on 14 March
					if(countRowForAssignedToLead==0 && type == "Assigned To.Version(s)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Assigned To.'+ProjOrVerSelector+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						else
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';									
						countRowForAssignedToLead++;
					}
					if(countRowForAssignedToTestManager ==0 && type == "Assigned To.TestPass(es)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Assigned To.'+Query.gConfigTestPass+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';			
						countRowForAssignedToTestManager ++;
					}
					//Added on 20 March
					if(countRowForAssignedToTester==0 && type == "Assigned To.TestPass(As Tester)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Assigned To.'+Query.gConfigTestPass+'(As '+Query.gConfigTester+')'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
						queryResultUi+='<td class="tblhd" width="180"><b>'+Query.gConfigTester+'</b></td> <td class="tblhd" width="200"><b>'+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						countRowForAssignedToTester++;
					}
					
					//Added for Role :Ejaz Waquif DT:5/19/2014
					if(countRowForRoleTP==0 && type == "Role-Test Pass(es)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gCongfigRole+'-'+Query.gConfigTester+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
						queryResultUi+='<td class="tblhd" width="180"><b>'+Query.gConfigTester+'</b></td> <td class="tblhd" width="200"><b>'+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						countRowForRoleTP++;
					}
					
					//Added for Role :Ejaz Waquif DT:5/19/2014
					if(countRowForRoleTS==0 && type == "Role-Test Step(s)")
					{	
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gCongfigRole+'-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestStep+' Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gCongfigRole+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="200"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForRoleTS++;

					}



					//Added by Harshal on 14 March
					if(type == "Id-Version(s)"  && countRowForIDVersion == 0)
					{						
						countRowForIDVersion++;
						/*****added by Mohini for resource file******/	
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Id-'+ProjOrVerSelector+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+' Name</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>State</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						else
							queryResultUi+='<td class="tblhd" width="160"><b>State</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
					}
					//Added by Harshal on 16 March
					if(type == "Id-TestPass(es)" && countRowForIDTP == 0)
					{						
						countRowForIDTP++;
						/*****added by Mohini for resource file******/	
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Id-'+Query.gConfigTestPass+'(es)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';			
					}
					if(type == "Id-Test case(s)" && countRowForIDTC == 0)
					{						
						countRowForIDTC++;
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Id-'+Query.gConfigTestCase+'(es)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td> <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
					}
					//Added by Harshal on 16 March
					if(type == "Id-Test step(s)" && countRowForIDTS == 0)
					{						
						countRowForIDTS++;
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Id-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gCongfigRole+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="200"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
					}

					
					if(countRowForStatusProject==0 && type == "Status-Version(s)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+ProjOrVerSelector+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						else
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						countRowForStatusProject++;
					}
					
					if(countRowForStatusTestPass==0 && type == "Status-TestPass(es)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+Query.gConfigTestPass+'(es)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
						countRowForStatusTestPass++;
					}


					//Added on 19 March
					if(countRowForStatusTCID==0 && type == "Status-Test case(s)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+Query.gConfigTestCase+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestCase+' Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td> <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForStatusTCID++;
						countRowForStatusTSID = 0;
					}
					//Added by Harshal on 19 March
					if(countRowForStatusTSID==0 && type == "Status-Test step(s)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestStep+' Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gCongfigRole+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="200"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForStatusTSID++;
						countRowForStatusTCID = 0;
					}
					if(countRowForNameTC ==0 && type == "Name-Test case(s)")//Added on 20 March
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Name-'+Query.gConfigTestCase+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestCase+' Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td> <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForNameTC++;
					}
					//Added by Harshal on 20 March
					if(countRowForNameTS==0 && type == "Name-Test step(s)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Name-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestStep+' Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gCongfigRole+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="200"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForNameTS++;
					}
					if(countRowForUATItemsTP ==0 && type == "UAT Items- TestPass(es)")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items- '+Query.gConfigTestPass+'(es)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';			
						countRowForUATItemsTP++;
					}
					if(countRowForUATItemsTC==0 && type == "UAT Items- Test cases")//Added on 20 March
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items- '+Query.gConfigTestCase+'s'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestCase+' Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td> <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForUATItemsTC++;
					}
					if(countRowForUATItemsTS==0 && type == "UAT Items- Actions")
					{						
						/*****added by Mohini for resource file******/
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items- '+Query.gConfigAction+'s'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Test Step Name</b></td>';
						queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="200"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';			
						countRowForUATItemsTS++;
					}
					if(countRowForIDUIVersion==0 && type == "UAT Items- Versions")
					{						
						/*****added by Mohini for resource file******/
						countRowForIDUIVersion++;
						/*****added by Mohini for resource file******/	
						queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items-'+Query.gConfigVersion+'(s)'+'</b></h2></td></tr></table><table id="'+tableId+'" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+' Name</b></td>';
						if(isPortfolioOn)
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';					
						else
							queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';					
					}


					

					
					if((countRow==0) &&(allResults[j].type=='Saved results'))
					{							
		 				typeHead=type ;
		 				queryResultUi='<table class="gridDetails" cellspacing="0">';  
					}  		
					
					/*if(j>0)Commented by Harshal on 22 March
					{
						if(type != "Status-Test step(s)" && type != "Status-Test case(s)" && type != "Name-Test step(s)" && type!== "Name-Test case(s)" && type != "Assigned To.TestPass(As Tester)" && type != "Assigned To.TestPass(es)")//Added on 19 March
						{
							if((allResults[j].type)!=(allResults[j-1].type)&&(type!=typeHead))
							{
								queryResultUi+='<tr><td colspan="6" class="bggray"><h2>Query Criteria: <b class="blk">'+type+'</b></h2></td></tr>';						
							}	
						}		
					}*/
								
					if(allResults[j].type=='Saved results')
					{
						queryResultUi +="<tbody><tr><td colspan='6' class='bggray'><h2>Query Criteria: <b class='blk'>"+type+"</b></h2></td></tr><tbody>" +allResults[j].name;
					}
					else
					{	
							if(type == "Name-Version(s)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';
								if(isPortfolioOn)//:SD										
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}
							if(type == "Project(s)-Version")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								if(isPortfolioOn)//:SD									
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}


							if(type == "Name-Project(s) and Version(s)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								if(isPortfolioOn)//:SD	
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}
							if(type == "Name-TestPass(es)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';							
							}


							//Added by Harshal on 14 March
							if(type == "Assigned To.Version(s)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								if(isPortfolioOn)//:SD	
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}
							if(type == "Assigned To.TestPass(es)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';							
							}

							if(type == "Assigned To.TestPass(As Tester)")//Added on 20 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].associatedTPName+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td>'+allResults[j].associatedRoleName+'</td><td>'+allResults[j].status+'</td>';
							}
							
							//Added for Role Test Passes :Ejaz Waquif DT:5/19/2014
							if(type == "Role-Test Pass(es)")//Added on 20 March
							{
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td>'+allResults[j].associatedRoleName+'</td><td>'+allResults[j].status+'</td>';
							}
							
							//Added for Role Test Steps :Ejaz Waquif DT:5/19/2014
							if(type == "Role-Test Step(s)")//Added on 20 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].associatedRoleName+'</td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:110px;\'>'+allResults[j].status+'</td><td style=\'width:160px;\'>'+allResults[j].associatedTCName+'</td><td>'+allResults[j].associatedTPName+'</td>';

							}


							//Added on 10 July 2012 by HRW
							if(type == "Id-Version(s)")
							{
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></span></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';	
								if(isPortfolioOn)//:SD									
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].state+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].state+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td>';
							}
							if(type == "Id-TestPass(es)")//Added on 16 March
							{
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></span></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';	
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td>';
							}
							//
							if(type == "Id-Test case(s)")
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "Id-Test step(s)")//Added on 16 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].associatedRoleName+'</td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td style=\'width:160px;\'>'+allResults[j].associatedTCName+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							
							if(type == "Status-Version(s)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';
								if(isPortfolioOn)//:SD
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}
							if(type == "Status-TestPass(es)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}


							if(type == "Status-Test case(s)")//Added on 19 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "Status-Test step(s)")//Added on 19 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].associatedRoleName+'</td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td style=\'width:160px;\'>'+allResults[j].associatedTCName+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "Name-Test case(s)")//Added on 20 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "Name-Test step(s)")//Added on 20 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].associatedRoleName+'</td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td style=\'width:160px;\'>'+allResults[j].associatedTCName+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "UAT Items- TestPass(es)")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';							
							}

							if(type == "UAT Items- Test cases")//Added on 20 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "UAT Items- Actions")//Added on 20 March
							{
								queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
								queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].TesterName+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td style=\'width:160px;\'>'+allResults[j].associatedTCName+'</td><td>'+allResults[j].associatedTPName+'</td>';
							}
							if(type == "UAT Items- Versions")
							{						
								if(allResults[j].redirect != '--' && allResults[j].redirect != '')
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
								else
									queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'>'+allResults[j].name+'</td>';	
								if(isPortfolioOn)//:SD
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].version+'</td><td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
								else
									queryResultUi+='<td style=\'width:130px;\'>'+allResults[j].assignTo+'</td><td>'+allResults[j].status+'</td>';
							}


							if(type == 'Saved results')
							{
							//code added to check security id for user to allow to navigate to the project on 10 Mar by sheetal
								var securityIDForPrjID ='';
								if(type == 'Project(s)-Project')
								{
									if(security.userAssociationForProject[allResults[j].id]!=undefined && security.userAssociationForProject[allResults[j].id]!=null)
										 securityIDForPrjID = security.userAssociationForProject[allResults[j].id].split(',');//to get all securityId(s) of login user 
									if(($.inArray('3',securityIDForPrjID)!=-1)||($.inArray('2',securityIDForPrjID)!=-1) || ($.inArray('5',securityIDForPrjID)!=-1)) //to check that user is either lead(2) or testmanager(3) for that project then only he can navigate to testmanagement tab for that project							
									{
				   	 					queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><a target="blank" href="'+allResults[j].redirect+'">'+allResults[j].name+'</a></td>';
				   	 				}
				   	 				else
				   	 				{	
				   	 					//var str="You do not have previlege to access this project further";
				   	 					var str="You do not have previlege to access this "+Query.gConfigProject.toLowerCase()+" further";//Added by Mohini for resource file
										queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span title="'+str+'">'+allResults[j].name+'</span></td>';
									}
							    }
							    else
							    {
							    	queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+allResults[j].id+'</td><td style=\'width:600px;\'><span>'+allResults[j].name+'</span></td>';
							    }
							    
							    queryResultUi+='<td style=\'width:150px;\'>'+allResults[j].assignTo+'</td><td style=\'width:100px;\'>'+allResults[j].status+'</td><td style=\'width:75px;\'>'+allResults[j].priority+'</td>';
								queryResultUi+='<td> '+allResults[j].state+'</td></tr>';
							}													
					}
					
				
					if(j==(resultSet.length-1))
					{       
       	  				break;       	  			
       	  			}      	  											

					if(j>Paging.TotalPaging)
					{	    	  		 	  		
		  	  			Paging.NextPaging=Paging.TotalPaging;
		  	  			Paging.showPagination();		  	   
       	  				return false;
       	  			}
       	  			if(type != "Id-Test step(s)" && type != "Id-Test case(s)" )//Added on 19 March
       	  			{
       	  				countRow++;
       	  			}	       	  			       	  			
				
			}						
			queryResultUi+='</table>';
			
	  	  	Paging.showPagination();				
	  	  	return queryResultUi;		
},
getSavedQuery:function(){	
	var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'QueryResult');
	var Query1 ='<Query><OrderBy><FieldRef Name="ID" Ascending="true"/></OrderBy></Query>';
	var queryItems =listN1.getSPItemsWithQuery(Query1).Items;	
	return queryItems ; 						    
},

validateName:function(savedQueryResults,queryInput)
{

 var nameSatus=true;	
 if(savedQueryResults!=null)
 {			   
		for(var i=0;i<savedQueryResults.length;i++)
		{	
			   //var testId=savedQueryResults[i]["queryresultId"];					
       		   var testName=savedQueryResults[i]["queryName"];       		   
       		   if(testName==queryInput)
       		   {
       		  		 nameSatus=false;
       		     	 break;
       		   }       	
       	}
 }
 
 return nameSatus;
},

saveNewQuery:function(queryInput,queryResult)
{	
	   var listName = jP.Lists.setSPObject(Main.getSiteUrl(),'QueryResult');
		var Obj = new Array();
				Obj.push({'Title':'Query Result',
						'queryName':queryInput,
			  			'result':queryResult
			  			//'status':'2;# In progress'			  					  	 		
			  			});
		var result = listName.updateItem(Obj);	
},
sortJSON: function (data, key, way) {
        return data.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
}        

}
