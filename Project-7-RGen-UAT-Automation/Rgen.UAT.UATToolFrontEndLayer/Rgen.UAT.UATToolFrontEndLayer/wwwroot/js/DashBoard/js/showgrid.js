var show={
	SiteURL:Main.getSiteUrl(),
	testPassId:'',
	projectId:'',
	TPAvail:0,
	TestPassNameArr:new Array(),
	TestPassIDArr:new Array(),
	flagForPrj:0,
	flagForTP:0,
	choiceForTPID:new Array(),
	sequenceForTPID:new Array(),
	forGroupGetPortfolios:new Array(),
	forGroupPortfolioGetProjects:new Array(),
	forGroupPortfolioProjectGetVersions:new Array(),
	forGroupPortfolioProjectGetVersions:new Array(),
	forProjectGetVersions:new Array(),
	groupNames:new Array(),
	selectedGroupName:'',
	selectedPortfolioName:'',
	selectedProjectName:'',
	selectedProjectLeadEmailId:'',
	selectedProjectStakeholdersEmailId:'',
	selectedTPName:'',
	forVersionGetID:new Array(),
	pageLoadFlag:0,
	allTestPasses:'',
	tpNameForTPID:new Array(),
	allProjectNames:new Array(),
	forProjectVersionGetID:new Array(),
	forprojectgetLeadEmailId:new Array(),
	forProjectgetStakholderEmailId:new Array(),
	forProjectNamegetID:new Array(),
	GetGroupPortfolioProjectTestPass:new Array(),
	showData:function()
	{
		var projectCount = 0;
	    var queryOnProject = '';
	    if((window.location.href).indexOf("pid")!= -1 && show.projectId == '')
	    {
	      show.projectId = Main.getQuerystring('pid');
	      show.flagForPrj = 1;
	    }
		jQuery.support.cors = true;
		var pageName = "";
		switch(window.location.href.split("/SitePages/")[1].split(".aspx")[0].toLowerCase())
		{
			case "bulkuploaddata":
			case "testpassmgnt_1":
									pageName = "TestPass";
									break;				
			case "tester_1":
									pageName = "Tester";
									break;
			case "testcase_1":
									pageName = "TestCase";
									break;
			case "teststep_1":
									pageName = "TestStep";
									break;
			case "attachment_1":
									pageName = "Attachment";
									break;																							 
		}
	    var msg = ServiceLayer.GetData("GetDropdownDataTestManagement",_spUserId+"/"+pageName);//GetGroupPortfolioProjectTestPass
	    if(msg != undefined && msg != null)
		{
			show.GetGroupPortfolioProjectTestPass = msg;
			var projectName = msg;
			
			var flag = 0;
			var gConfigGroup=resource.gPageSpecialTerms['Group']!=undefined?resource.gPageSpecialTerms['Group']:"Group";
			var gConfigPortfolio=resource.gPageSpecialTerms['Portfolio']!=undefined?resource.gPageSpecialTerms['Portfolio']:"Portfolio";
			var gConfigVersion=resource.gPageSpecialTerms['Version']!=undefined?resource.gPageSpecialTerms['Version']:"Version";
			
			//show.groupNames.push("Default "+gConfigGroup);
			var arrProjectId = new Array();//:SD
		    for(var i=0;i<projectName.length;i++)
			{
				//To execute for loop only for unique projectIds:SD
				if($.inArray(projectName[i].projectId,arrProjectId)==-1)
					arrProjectId.push(projectName[i].projectId);
				else
					continue;
				 
			     if(show.projectId == '')
			      	show.projectId = projectName[i].projectId;
			     if(isPortfolioOn)
			     {
				     if(projectName[i].groupName != null && projectName[i].groupName!= undefined )
				     {
				     	if(show.projectId == projectName[i].projectId)
			     	 	{
			     	 		show.selectedGroupName = projectName[i].groupName;
			     	 		show.selectedPortfolioName = projectName[i].portfolioName;
			     	 		show.selectedProjectName = projectName[i].projectName;
			     	 		show.selectedProjectLeadEmailId= projectName[i].leadEmailId;//Added By Mohini DT:30-07-2014
			     	 		show.selectedProjectStakeholdersEmailId= projectName[i]['stakeHoldersEmailIDs'];//Added By Mohini DT:05-08-2014
			     	 		//show.selectedVersionName = projectName[i].projectVersion;
			     	 		
			     	 		//Changed by :Ejaz Waquif DT:5/12/2014
		     	 			show.selectedVersionName = projectName[i].projectVersion==undefined || projectName[i].projectVersion==null || projectName[i].projectVersion==""?"Default "+gConfigVersion:projectName[i].projectVersion;
			     	 	}	
	
				     	if(show.forGroupGetPortfolios[projectName[i].groupName] == undefined)
				     	{
				     		show.forGroupGetPortfolios[projectName[i].groupName] = projectName[i].portfolioName;
				     		show.groupNames.push(projectName[i].groupName);
				     	}	
				     	else
				     	{
				     		var arr = show.forGroupGetPortfolios[projectName[i].groupName].split(",");
				     		if($.inArray(projectName[i].portfolioName,arr) == -1)
				     			show.forGroupGetPortfolios[projectName[i].groupName] += "," + projectName[i].portfolioName;
				     	}	
				     			
				     	if(show.forGroupPortfolioGetProjects[projectName[i].groupName+"-"+projectName[i].portfolioName] == undefined)
				     		show.forGroupPortfolioGetProjects[projectName[i].groupName+"-"+projectName[i].portfolioName] = projectName[i].projectName;
				     	else
				     	{
				     		var arr = show.forGroupPortfolioGetProjects[projectName[i].groupName+"-"+projectName[i].portfolioName].split(",");
				     		if($.inArray(projectName[i].projectName,arr) == -1)
				     			show.forGroupPortfolioGetProjects[projectName[i].groupName+"-"+projectName[i].portfolioName] += "," + projectName[i].projectName;
				     	}
				     	
						//Default version condition added :SD
						var version = projectName[i].projectVersion!=undefined?projectName[i].projectVersion:'Default '+gConfigVersion;	
				     	if(show.forGroupPortfolioProjectGetVersions[projectName[i].groupName+"-"+projectName[i].portfolioName+"-"+projectName[i].projectName] == undefined)
				     		show.forGroupPortfolioProjectGetVersions[projectName[i].groupName+"-"+projectName[i].portfolioName+"-"+projectName[i].projectName] = version;
				     	else
				     		show.forGroupPortfolioProjectGetVersions[projectName[i].groupName+"-"+projectName[i].portfolioName+"-"+projectName[i].projectName] += "`" + version;	
				     	
				     	var version = projectName[i].projectVersion!=undefined?projectName[i].projectVersion:'Default '+gConfigVersion;//:SD	
				     	show.forVersionGetID[projectName[i].groupName+"-"+projectName[i].portfolioName+"-"+projectName[i].projectName+"-"+version] = projectName[i].projectId;	
			     	 }
			     	 else
			     	 {
			     	 	if(show.projectId == projectName[i].projectId)
			     	 	{
			     	 		show.selectedGroupName = "Default "+gConfigGroup;
			     	 		show.selectedPortfolioName = "Default "+gConfigPortfolio;
			     	 		show.selectedProjectName = projectName[i].projectName;
			     	 		//show.selectedVersionName = projectName[i].projectVersion;//commented
			     	 		//show.selectedVersionName = "Default "+gConfigVersion;//:SD
			     	 		
			     	 		//Changed by :Ejaz Waquif DT:5/12/2014
			     	 		show.selectedVersionName = projectName[i].projectVersion==undefined || projectName[i].projectVersion==null || projectName[i].projectVersion==""?"Default "+gConfigVersion:projectName[i].projectVersion;
			     	 	    show.selectedProjectLeadEmailId= projectName[i].leadEmailId;//Added By Mohini DT:30-07-2014
			     	 	    show.selectedProjectStakeholdersEmailId= projectName[i]['stakeHoldersEmailIDs'];//Added By Mohini DT:05-08-2014
	
			     	 	}	
			     	 	show.forGroupGetPortfolios["Default "+gConfigGroup] = "Default "+gConfigPortfolio;
			     	 	if(show.forGroupPortfolioGetProjects["Default "+gConfigGroup+"-Default "+gConfigPortfolio] == undefined)
			     	 		show.forGroupPortfolioGetProjects["Default "+gConfigGroup+"-Default "+gConfigPortfolio] = (projectName[i].projectName);
			     	 	else
			     	 	{
			     	 		var arr = show.forGroupPortfolioGetProjects["Default "+gConfigGroup+"-Default "+gConfigPortfolio].split(",");
			     	 		if($.inArray(projectName[i].projectName,arr) == -1)
			     	 			show.forGroupPortfolioGetProjects["Default "+gConfigGroup+"-Default "+gConfigPortfolio] += "," + (projectName[i].projectName);
			     	 	}	
			     	 	
						//Default version condition added :SD
						var version = projectName[i].projectVersion!=undefined?projectName[i].projectVersion:'Default '+gConfigVersion;		
			     	 	if(show.forGroupPortfolioProjectGetVersions["Default "+gConfigGroup+"-Default "+gConfigPortfolio+"-"+projectName[i].projectName] == undefined)
			     	 		show.forGroupPortfolioProjectGetVersions["Default "+gConfigGroup+"-Default "+gConfigPortfolio+"-"+projectName[i].projectName] = version;
			     	 	else
			     	 		show.forGroupPortfolioProjectGetVersions["Default "+gConfigGroup+"-Default "+gConfigPortfolio+"-"+projectName[i].projectName] += "`" + version;	
			     	 	var version = projectName[i].projectVersion!=undefined?projectName[i].projectVersion:'Default '+gConfigVersion;//:SD
						show.forVersionGetID["Default "+gConfigGroup+"-Default "+gConfigPortfolio+"-"+projectName[i].projectName+"-"+version] = projectName[i].projectId;	
			     	 }
			     	var vers=projectName[i].projectVersion==undefined || projectName[i].projectVersion==null || projectName[i].projectVersion==""?"Default "+gConfigVersion:projectName[i].projectVersion;
			     	show.forProjectNamegetID[projectName[i].projectName+"-"+vers] = projectName[i].projectId;//Added By Mohini DT:30-07-2014	
			     	show.forprojectgetLeadEmailId[projectName[i].projectId]=projectName[i].leadEmailId;//Added By Mohini DT:30-07-2014
			     	if(projectName[i].stakeholderList != undefined)
		            {
		            	var stakes = '';
		            	for(var mm=0;mm<projectName[i].stakeholderList.length;mm++)
		            		stakes = stakes+";"+projectName[i].stakeholderList[mm].stakeHolderEmail;
		            	show.forProjectgetStakholderEmailId[projectName[i].projectId]=stakes;
		            }	
			     }
			     else
			     {
			     	if(show.forProjectGetVersions[projectName[i].projectName] == undefined)
			     	{
			     		show.forProjectGetVersions[projectName[i].projectName] = projectName[i].projectVersion;
			     		if($.inArray(projectName[i].projectName,show.allProjectNames)==-1)//To bind unique projects:SD
			     			show.allProjectNames.push(projectName[i].projectName);
			     	}	
			     	else
			     		show.forProjectGetVersions[projectName[i].projectName] += "`" + projectName[i].projectVersion;
			     	if(show.projectId == projectName[i].projectId)
		     	 	{
		     	 		show.selectedProjectName = projectName[i].projectName;
		     	 		//show.selectedVersionName = projectName[i].projectVersion;
		     	 		
		     	 		//Changed by :Ejaz Waquif DT:5/12/2014
		     	 		show.selectedVersionName = projectName[i].projectVersion==undefined || projectName[i].projectVersion==null || projectName[i].projectVersion==""?"Default "+gConfigVersion:projectName[i].projectVersion;
		     	 	    show.selectedProjectLeadEmailId= projectName[i].leadEmailId;//Added By Mohini DT:30-07-2014
		     	 	    show.selectedProjectStakeholdersEmailId= projectName[i]['stakeHoldersEmailIDs'];//Added By Mohini DT:05-08-2014
	
		     	 	}
		     	 	//show.forProjectVersionGetID[projectName[i].projectName+"-"+projectName[i].projectVersion] = projectName[i].projectId;//commented
		     	 	show.forProjectVersionGetID[projectName[i].projectName] = projectName[i].projectId;//:SD		 		 
			        
			        var vers=projectName[i].projectVersion==undefined || projectName[i].projectVersion==null || projectName[i].projectVersion==""?"Default "+gConfigVersion:projectName[i].projectVersion;
		     	 	show.forProjectNamegetID[projectName[i].projectName+"-"+vers] = projectName[i].projectId;//Added By Mohini DT:30-07-2014	
		     	 	show.forprojectgetLeadEmailId[projectName[i].projectId]=projectName[i].leadEmailId;//Added By Mohini DT:30-07-2014
					
					if(projectName[i].stakeholderList != undefined)
		            {
		            	var stakes = '';
		            	for(var mm=0;mm<projectName[i].stakeholderList.length;mm++)
		            		stakes = stakes+";"+projectName[i].stakeholderList[mm].stakeHolderEmail;
		            	show.forProjectgetStakholderEmailId[projectName[i].projectId]=stakes;
		            }	 		 
	
			     }
			     if(projectName[i].projectId == show.projectId && flag == 0)
				 {
				      flag++;
				      $("#projectName").text(projectName[i].projectName);
				      $("#projectName").attr("projID",projectName[i].projectId);
				      var queryOnTP = "";
				      if((window.location.href).indexOf("tpid")!= -1)
				      {
				      	if(Main.getQuerystring('tpid') != "undefined" && Main.getQuerystring('tpid') != '' && show.testPassId == '')
					    {
					      	show.testPassId = Main.getQuerystring('tpid');
					      	show.flagForTP = 1;
					    }  	
				      }
				} 
			}
		}	
			   
	 },
	 populateTestPass:function()
	 {
		for(var i=0;i<show.GetGroupPortfolioProjectTestPass.length;i++)
		{
			if(show.projectId == show.GetGroupPortfolioProjectTestPass[i].projectId)
			{
				show.allTestPasses = show.GetGroupPortfolioProjectTestPass[i].testPassList;
				break;
			}	
		}
		show.TestPassIDArr = new Array();
		show.TestPassNameArr = new Array();

		if(show.allTestPasses == undefined  || show.allTestPasses == null || show.allTestPasses == '')
			show.allTestPasses = new Array();
		else
		{
			var flag = 0;
			/**/
			var sort_by = function(field, reverse, primer)
			{
		   	   var key = primer ? 
		       function(x) {return primer(x[field])} : 
		       function(x) {return x[field]};
		
		   		reverse = [-1, 1][+!!reverse];
		
			   return function (a, b) {
			       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
			     } 
			} 
			show.allTestPasses = show.allTestPasses.sort(sort_by('testpassId', false, parseInt));

			for(var i=0;i<show.allTestPasses.length;i++)
			{
				if(show.allTestPasses[i]['choiceForName'] != undefined)
					show.choiceForTPID[ show.allTestPasses[i].testpassId ] = show.allTestPasses[i]['choiceForName'];
				else
					show.choiceForTPID[ show.allTestPasses[i].testpassId ] = '0';
					
				if(show.allTestPasses[i]['testingType'] != undefined)	
					show.sequenceForTPID[ show.allTestPasses[i].testpassId ] = show.allTestPasses[i]['testingType'];
			    else
					show.sequenceForTPID[ show.allTestPasses[i].testpassId ] = "0";	
						
				show.TestPassIDArr.push(show.allTestPasses[i].testpassId);
				show.TestPassNameArr.push(show.allTestPasses[i].testpassName);

				show.tpNameForTPID[ show.allTestPasses[i].testpassId ] = show.allTestPasses[i].testpassName;
				if(show.pageLoadFlag == 0)//Execute on Page load
				{
					if(show.testPassId == "")
						flag++;
					else if(show.testPassId == show.allTestPasses[i].testpassId)
					{
						show.testPassId = show.allTestPasses[i].testpassId;
					}	
				}
				else 
					flag = 1;
			}
			if(flag != 0)
			{
				show.testPassId = show.allTestPasses[0].testpassId;
			}
			else if($.inArray(show.testPassId,show.TestPassIDArr) == -1)
					show.testPassId = show.TestPassIDArr[0];
			
		}		
	 },
 //Excecute DML operations on list
	dmlOperation:function(search,list)
	{
		var listname = jP.Lists.setSPObject(Main.getSiteUrl(),list);	
		var query = search;
		var result = listname.getSPItemsWithQuery(query).Items;
		return (result);
	}
}	
