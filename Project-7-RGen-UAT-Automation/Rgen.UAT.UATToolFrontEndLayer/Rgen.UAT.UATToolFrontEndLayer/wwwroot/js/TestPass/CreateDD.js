var createDD={
	editMode:0,
	
	hideDD:function()
	{
		$(".rgTableBread .rgBCHead").each(function(e) {
				$(this).attr('title','Sorry! heirarchy selection is not available in edit mode');
				$(this).children('img').hide();
				//$(this).betterTooltip();
			});
	},
	showDD:function()
	{
		$(".rgTableBread .rgBCHead").each(function(e) {
				$(this).attr('title','');
				$(this).children('img').show()
			});
	},
	createWithoutPort:function()
	{
		$("#groupTitle").remove();
        $("#portfolioTitle").remove();
        $("#groupHead").remove();
        $("#portfolioHead").remove();
        $("#versionHead").remove();//:SD
        $("#versionTitle").remove();//:SD
        
        $('.rgTableBread tbody tr td').attr('style','width:350px!important');//:SD
        $('.headDD').css('width','350px');//:SD

		var prjctName = '';
		for(var i=0;i<show.allProjectNames.length;i++)
        	prjctName += "<li title='"+show.allProjectNames[i]+"'>"+show.allProjectNames[i]+"</li>";
        $("#prjctul").html(prjctName);

		if(show.allProjectNames.length != 0 && show.selectedProjectName == '')
		{
			show.selectedProjectName = show.allProjectNames[0];
			/**Added by mohini for bug id:12238 DT:06-08-2014****/
			var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+show.selectedVersionName];
			show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
            /****************************************/

		}
		// For the Project dropdown
		$('#projectHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoGroups").hide();
				$("#assoPortfolios").hide();
				$("#assoVersions").hide();
				$("#assoTP").hide();
			    $("#assoProjects").slideToggle("fast");
		    }
		});
		$('#prjctul li').click(function(e) {
			$('#prjctul li').each(function(e) {
				$("#prjctul li[title='"+$(this).attr('title')+"']").removeClass("liselected");
			});
			var Project = $(this).attr('title');
			$("#projectTitle label").attr("title", Project);
			Project = trimText(Project,35);
 			$("#projectTitle label").text(Project);
 			$("#prjctul li[title='"+$(this).attr('title')+"']").addClass("liselected");
 			show.selectedProjectName = $(this).attr('title');
 			show.projectId = show.forProjectVersionGetID[show.selectedProjectName];//:SD
			
			/**Added by mohini for bug id:12238 DT:06-08-2014****/
			var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+show.selectedVersionName];
			show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
            /****************************************/

			createDD.changeProjectDDWithoutPort();
			$("#assoProjects").hide(); 			
		});
		if(show.selectedProjectName != '')
		{
			$("#prjctul li[title='"+show.selectedProjectName+"']").addClass("liselected");
			$("#projectTitle label").attr("title", show.selectedProjectName);
 			$("#projectTitle label").text(trimText(show.selectedProjectName,35));
		}

		//createDD.changeProjectDDWithoutPort(show.selectedVersionName);//commented
		createDD.changeProjectDDWithoutPort();//:SD
		
		// For the Version dropdown
		$('#versionHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoProjects").hide();
				$("#assoTP").hide();
			    $("#assoVersions").slideToggle("fast");
		    }
		});
		
		// For the Test Pass dropdown
		$('#TestPassHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoProjects").hide();
				$("#assoVersions").hide();
			    $("#assoTP").slideToggle("fast");
		    }
		});
		
		$('#assoProjects').click(function(e) {
			e.stopPropagation();
		});
		$('#assoVersions').click(function(e) {
			e.stopPropagation();
		});
		$('#assoTP').click(function(e) {
			e.stopPropagation();
		});
		
		$(document).click(function(){
			$("#assoProjects").slideUp();
			$("#assoVersions").slideUp();
			$('#assoTP').slideUp();
		});

		show.pageLoadFlag = 1;
	},
	
	//:SD
	changeProjectDDWithoutPort:function()
	{
		switch( $(".activeNav span").attr('id'))
        {
	        case "tab2":
		        testpass.prjId = show.projectId;
		        $("#pageTab h2").each(function(e) {
					if($(this).css('color') == "rgb(0, 0, 0)" && $(this).text() != "Edit Test Pass")
					{
						testpass.getTestPasses();
						if($(this).text() != "View All")
							testpass.pagination();	
						$(this).click();
					}	
				});
		 		
		 		if(testpass.allTestPasses != undefined)
		 		{
		 			if(testpass.allTestPasses.length != 0)
		 				show.testPassId = testpass.allTestPasses[0]['ID'];
		 			else
		 				show.testPassId = '';	
		 		}	
		 		else
		 			show.testPassId = '';
		 			
		 		break;
		 	default:
		 		 createDD.changeVersionDD();
		 		 break;	
	 	}	

	},
	
	create:function()
	{
		// For the Group dropdown
        var grpName = '';
        for(var i=0;i<show.groupNames.length;i++)
        	grpName += "<li title='"+show.groupNames[i]+"'>"+show.groupNames[i]+"</li>";
        $("#grpul").html(grpName);
        $('#groupHead').click(function(e) {
        	if(createDD.editMode == 0)
	        {
	        	e.stopPropagation();
	        	$("#assoPortfolios").hide();
	        	$("#assoProjects").hide();
	        	$("#assoVersions").hide();
	        	$("#assoTP").hide();
			    $("#assoGroups").slideToggle("fast");
			 }   
		});
		
		if(show.groupNames.length != 0 && show.selectedGroupName == '')
			show.selectedGroupName = show.groupNames[0];
			
		$('#grpul li').click(function(e) {
			$('#grpul li').each(function(e) {
				$("#grpul li[title='"+$(this).attr('title')+"']").removeClass("liselected");
			});
			var Group = $(this).attr('title');
			$("#groupTitle label").attr("title", Group);
			Group = trimText(Group,35);
 			$("#groupTitle label").text(Group);
 			$("#grpul li[title='"+$(this).attr('title')+"']").addClass("liselected");
 			
 			show.selectedGroupName = $(this).attr('title');
 			createDD.changeGroupDD();
 			$("#assoGroups").hide();
		});
		if(show.selectedGroupName != '')
		{
			$("#grpul li[title='"+show.selectedGroupName+"']").addClass("liselected");
			$("#groupTitle label").attr("title", show.selectedGroupName);
 			$("#groupTitle label").text(trimText(show.selectedGroupName,35));
		}
			
		// For the Portfolio dropdown
		createDD.changeGroupDD(show.selectedPortfolioName);
		$('#portfolioHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoGroups").hide();
				$("#assoProjects").hide();
				$("#assoVersions").hide();
				$("#assoTP").hide();
			    $("#assoPortfolios").slideToggle("fast");
		    }
		});
		
		// For the Project dropdown
		$('#projectHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoGroups").hide();
				$("#assoPortfolios").hide();
				$("#assoVersions").hide();
				$("#assoTP").hide();
			    $("#assoProjects").slideToggle("fast");
		    }
		});
		
		// For the Version dropdown
		$('#versionHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoGroups").hide();
				$("#assoPortfolios").hide();
				$("#assoProjects").hide();
				$("#assoTP").hide();
			    $("#assoVersions").slideToggle("fast");
		    }
		});
		
		// For the Test Pass dropdown
		$('#TestPassHead').click(function(e) {
			if(createDD.editMode == 0)
			{
				e.stopPropagation();
				$("#assoGroups").hide();
				$("#assoPortfolios").hide();
				$("#assoProjects").hide();
				$("#assoVersions").hide();
			    $("#assoTP").slideToggle("fast");
		    }
		});
		
		$('#assoGroups').click(function(e) {
			e.stopPropagation();
		});
		$('#assoPortfolios').click(function(e) {
			e.stopPropagation();
		});
		$('#assoProjects').click(function(e) {
			e.stopPropagation();
		});
		$('#assoVersions').click(function(e) {
			e.stopPropagation();
		});
		$('#assoTP').click(function(e) {
			e.stopPropagation();
		});
		
		$(document).click(function(){
			$("#assoGroups").slideUp();
			$("#assoPortfolios").slideUp();
			$("#assoProjects").slideUp();
			$("#assoVersions").slideUp();
			$('#assoTP').slideUp();
		});

		show.pageLoadFlag = 1;
	},
	changeGroupDD:function(portfolio)
	{
		if(show.forGroupGetPortfolios[ show.selectedGroupName ] != undefined)
		{
			var portfolioNames = show.forGroupGetPortfolios[ show.selectedGroupName ].split(",");
			var portName = '';
			for(var i=0;i<portfolioNames.length;i++)
	        	portName += "<li title='"+portfolioNames[i]+"'>"+portfolioNames[i]+"</li>";
	        $("#portful").html(portName);
	        
	        if(portfolio != undefined && portfolio != '' && show.pageLoadFlag == 0)
	        {
	        	$("#portfolioTitle label").attr("title", portfolio);
				$("#portfolioTitle label").text(trimText(portfolio,35));
		        $("#portful li[title='"+portfolio+"']").addClass("liselected");
		        show.selectedPortfolioName = portfolio; 
		        createDD.changePortfolioDD(show.selectedProjectName);
	        }
	        else
	        {
		        $("#portfolioTitle label").attr("title", portfolioNames[0]);
				$("#portfolioTitle label").text(trimText(portfolioNames[0],35));
		        $("#portful li[title='"+portfolioNames[0]+"']").addClass("liselected");
		        show.selectedPortfolioName = portfolioNames[0]; 
		        createDD.changePortfolioDD(show.selectedProjectName);
	        }
	        
	        $('#portful li').click(function(e) {
				$('#portful li').each(function(e) {
					$("#portful li[title='"+$(this).attr('title')+"']").removeClass("liselected");
				});
				var Portfolio = $(this).attr('title');
				$("#portfolioTitle label").attr("title", Portfolio);
				Portfolio = trimText(Portfolio,35);
	 			$("#portfolioTitle label").text(Portfolio);
	 			$("#portful li[title='"+$(this).attr('title')+"']").addClass("liselected");
	 			show.selectedPortfolioName = $(this).attr('title');
				createDD.changePortfolioDD();
				$("#assoPortfolios").hide();
			});
			
		}
		else //No Portfolio
		{
			var port = resource.gPageSpecialTerms['Portfolio']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Portfolio']:"Portfolio";
			var portName = "<li title='Default "+port+"'>Default "+port+"</li>";//for bug Id 11700(change no to default)
	        $("#portful").html(portName);
	        $("#portful li[title='Default "+port+"']").addClass("liselected");
	        $("#portfolioTitle label").attr("title", "Default "+port+"");
			$("#portfolioTitle label").text("Default "+port+"");
			
			var prjct = resource.gPageSpecialTerms['Project']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Project']:"Project";
			var prjctName = "<li title='No "+prjct+"'>No "+prjct+"</li>";
	        $("#prjctul").html(prjctName);
	        $("#prjctul li[title='No "+prjct+"']").addClass("liselected");
	        $("#projectTitle label").attr("title", "No "+prjct+"");
			$("#projectTitle label").text("No "+prjct+"");
			
			var ver = resource.gPageSpecialTerms['Version']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Version']:"Version";
			var vers = "<li title='No "+ver+"'>No "+ver+"</li>";
	        $("#versul").html(vers);
	        $("#versul li[title='No "+ver+"']").addClass("liselected");
	        $("#versionTitle label").attr("title", "No "+ver+"");
			$("#versionTitle label").text("No "+ver+"");
			
			var t = resource.gPageSpecialTerms['Test Pass']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
			var tp = "<li title='No "+t+"'>No "+t+"</li>";
	        $("#tpul").html(tp);
	        $("#tpul li[title='No "+t+"']").addClass("liselected");
	        $("#TestPassTitle label").attr("title", "No "+t+"");
			$("#TestPassTitle label").text("No "+t+"");
			
			show.projectId = '';
			show.testPassId = '';
			$("#begTest").hide();
	    	$("#testResult").hide();
			createDD.showMessage();
		}
		
	},
	changePortfolioDD:function(project)
	{
		if(show.forGroupPortfolioGetProjects[ show.selectedGroupName+"-"+show.selectedPortfolioName ] != undefined)
		{
			var projectNames = show.forGroupPortfolioGetProjects[ show.selectedGroupName+"-"+show.selectedPortfolioName ].split(",");
			var prjctName = '';
			for(var i=0;i<projectNames.length;i++)
	        	prjctName += "<li title='"+projectNames[i]+"'>"+projectNames[i]+"</li>";
	        $("#prjctul").html(prjctName);
	        
	        if(project != undefined && project != '' && show.pageLoadFlag == 0)
	        {
	        	$("#projectTitle label").attr("title", project);
				$("#projectTitle label").text(trimText(project,35));
		        $("#prjctul li[title='"+project+"']").addClass("liselected");
		        show.selectedProjectName = project;
		        
		        /**Added by mohini for bug id:12238 DT:06-08-2014****/
				var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+show.selectedVersionName];
				show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
	            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
	            /****************************************/

		        createDD.changeProjectDD(show.selectedVersionName);
	        }
	        else
	        {
		        $("#projectTitle label").attr("title", projectNames[0]);
				$("#projectTitle label").text(trimText(projectNames[0],35));
		        $("#prjctul li[title='"+projectNames[0]+"']").addClass("liselected");
		        show.selectedProjectName = projectNames[0];
		        
		         /**Added by mohini for bug id:12238 DT:06-08-2014****/
				var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+show.selectedVersionName];
				show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
	            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
	            /****************************************/
	            
		        createDD.changeProjectDD(show.selectedVersionName);
	        }
	
	        $('#prjctul li').click(function(e) {
				$('#prjctul li').each(function(e) {
					$("#prjctul li[title='"+$(this).attr('title')+"']").removeClass("liselected");
				});
				var Project = $(this).attr('title');
				$("#projectTitle label").attr("title", Project);
				Project = trimText(Project,35);
	 			$("#projectTitle label").text(Project);
	 			$("#prjctul li[title='"+$(this).attr('title')+"']").addClass("liselected");
	 			show.selectedProjectName = $(this).attr('title');
				createDD.changeProjectDD(); 	
				$("#assoProjects").hide();		
			});
		}
		else //No Project
		{
			var prjct = resource.gPageSpecialTerms['Project']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Project']:"Project";
			var prjctName = "<li title='No "+prjct+"'>No "+prjct+"</li>";
	        $("#prjctul").html(prjctName);
	        $("#prjctul li[title='No "+prjct+"']").addClass("liselected");
	        $("#projectTitle label").attr("title", "No "+prjct+"");
			$("#projectTitle label").text("No "+prjct+"");
			
			var ver = resource.gPageSpecialTerms['Version']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Version']:"Version";
			var vers = "<li title='No "+ver+"'>No "+ver+"</li>";
	        $("#versul").html(vers);
	        $("#versul li[title='No "+ver+"']").addClass("liselected");
	        $("#versionTitle label").attr("title", "No "+ver+"");
			$("#versionTitle label").text("No "+ver+"");
			
			var t = resource.gPageSpecialTerms['Test Pass']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
			var tp = "<li title='No "+t+"'>No "+t+"</li>";
	        $("#tpul").html(tp);
	        $("#tpul li[title='No "+t+"']").addClass("liselected");
	        $("#TestPassTitle label").attr("title", "No "+t+"");
			$("#TestPassTitle label").text("No "+t+"");
			
			show.projectId = ''
			show.testPassId = '';
			$("#begTest").hide();
	    	$("#testResult").hide();
			createDD.showMessage();
		}
	
	},
	changeProjectDD:function(version)
	{
		if(show.forGroupPortfolioProjectGetVersions[ show.selectedGroupName+"-"+show.selectedPortfolioName+"-"+show.selectedProjectName ] != undefined)
		{
			var versions = show.forGroupPortfolioProjectGetVersions[ show.selectedGroupName+"-"+show.selectedPortfolioName+"-"+show.selectedProjectName ].split("`");
			var vers = '';
			for(var i=0;i<versions.length;i++)
	        	vers += "<li title='"+versions[i]+"'>"+versions[i]+"</li>";
	        $("#versul").html(vers);
	        
	        if(version != undefined && version != '' && show.pageLoadFlag == 0)
	        {
	        	$("#versionTitle label").attr("title", version);
				$("#versionTitle label").text(trimText(version,35));
		        $("#versul li[title='"+version+"']").addClass("liselected");
		        show.projectId = show.forVersionGetID[show.selectedGroupName+"-"+show.selectedPortfolioName+"-"+show.selectedProjectName+"-"+version]; 
	            /**Added by mohini for bug id:12238 DT:06-08-2014****/
				var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+version];
				show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
	            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
	            /****************************************/

	        }
	        else
	        {
		        $("#versionTitle label").attr("title", versions[0]);
				$("#versionTitle label").text(trimText(versions[0],35));
		        $("#versul li[title='"+versions[0]+"']").addClass("liselected");
		        show.projectId = show.forVersionGetID[show.selectedGroupName+"-"+show.selectedPortfolioName+"-"+show.selectedProjectName+"-"+versions[0]];
		        /**Added by mohini for bug id:12238 DT:06-08-2014****/
				var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+versions[0]];
				show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
	            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
	            /****************************************/
	        }
	        switch( $(".activeNav span").attr('id') )
	        {
		        case "tab2":
			        testpass.prjId = show.projectId;
			        $("#pageTab h2").each(function(e) {
						if($(this).css('color') == "rgb(0, 0, 0)" && $(this).text() != "Edit Test Pass")
						{
							 testpass.getTestPasses();
							if($(this).text() != "View All")
								testpass.pagination();	
							$(this).click();
						}	
					});
			 		
			 		if(testpass.allTestPasses != undefined)
			 		{
			 			show.testPassId = Main.getQuerystring('tpid'); 
			 			if(testpass.allTestPasses.length != 0)
			 			{
			 				var arr = new Array();
			 				for(var m=0;m<testpass.allTestPasses.length;m++)
			 					arr.push(testpass.allTestPasses[m].testPassId);	
			 				if($.inArray(show.testPassId,arr) == -1)
			 					show.testPassId = testpass.allTestPasses[m-1].testPassId;
			 			}	
			 			else
			 				show.testPassId = '';	
			 		}	
			 		else
			 			show.testPassId = '';
			 		break;
			 	default:
			 		 createDD.changeVersionDD();
			 		 break;	
		 	}	
	
	        $('#versul li').click(function(e) {
				$('#versul li').each(function(e) {
					$("#versul li[title='"+$(this).attr('title')+"']").removeClass("liselected");
				});
				var Version = $(this).attr('title');
				$("#versionTitle label").attr("title", Version);
				Version = trimText(Version,35);
	 			$("#versionTitle label").text(Version);
	 			$("#versul li[title='"+$(this).attr('title')+"']").addClass("liselected");
	 			show.selectedVersionName = $(this).attr('title');
	 			
	 			/**Added by mohini for bug id:12238 DT:06-08-2014****/
				var prjId=show.forProjectNamegetID[show.selectedProjectName+"-"+show.selectedVersionName];
				show.selectedProjectLeadEmailId=show.forprojectgetLeadEmailId[prjId];
	            show.selectedProjectStakeholdersEmailId= show.forProjectgetStakholderEmailId[prjId];
	            /****************************************/ 
	            
	 			show.projectId = show.forVersionGetID[show.selectedGroupName+"-"+show.selectedPortfolioName+"-"+show.selectedProjectName+"-"+$(this).attr('title')];
	 			switch( $(".activeNav span").attr('id') )
		        {
			        case "tab2":
				        testpass.prjId = show.projectId;
				        $("#pageTab h2").each(function(e) {
							if($(this).css('color') == "rgb(0, 0, 0)" && $(this).text() != "Edit Test Pass")
							{
								 testpass.getTestPasses();
								if($(this).text() != "View All")
									testpass.pagination();	
								$(this).click();
							}	
						});
				 		
				 		if(testpass.allTestPasses != undefined)
				 		{
				 			if(testpass.allTestPasses.length != 0)
					 		{
					 			var arr = new Array();
				 				for(var m=0;m<testpass.allTestPasses.length;m++)
				 					arr.push(testpass.allTestPasses[m].testPassId);	
				 				if($.inArray(show.testPassId,arr) == -1)
				 					show.testPassId = testpass.allTestPasses[m-1].testPassId;	
				 			}		
				 		}	
				 		else
				 			show.testPassId = '';
				 			
				 		break;	
				 	default:
				 		 createDD.changeVersionDD();
				 		 break;
			 	}
			 	$("#assoVersions").hide();
			 				
			});
			
		}
		else //No Version
		{
			var ver = resource.gPageSpecialTerms['Version']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Version']:"Version";
			var vers = "<li title='No "+ver+"'>No "+ver+"</li>";
	        $("#versul").html(vers);
	        $("#versul li[title='No "+ver+"']").addClass("liselected");
	        $("#versionTitle label").attr("title", "No "+ver+"");
			$("#versionTitle label").text("No "+ver+"");
			
			var t = resource.gPageSpecialTerms['Test Pass']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
			var tp = "<li title='No "+t+"'>No "+t+"</li>";
	        $("#tpul").html(tp);
	        $("#tpul li[title='No "+t+"']").addClass("liselected");
	        $("#TestPassTitle label").attr("title", "No "+t+"");
			$("#TestPassTitle label").text("No "+t+"");

			show.testPassId = '';
			$("#begTest").hide();
	    	$("#testResult").hide();
			createDD.showMessage();
		}
	
	},
	changeVersionDD:function()
	{
		show.populateTestPass();
		if(show.allTestPasses.length != 0)
		{
			var tpName = '';
			for(var i=0;i<show.allTestPasses.length;i++)
	        	tpName += "<li id='"+show.allTestPasses[i].testpassId+"' title='"+show.allTestPasses[i].testpassName+"'>"+show.allTestPasses[i].testpassName+"</li>";
	        $("#tpul").html(tpName);
	        
	        if(show.testPassId != '')
	        {
	        	var tp = show.tpNameForTPID[show.testPassId]; 
	        	$("#TestPassTitle label").attr("title", tp);
				$("#TestPassTitle label").text(trimText(tp,35));
		        $("#tpul li[title='"+tp+"']").addClass("liselected");
		        show.selectedTPName = tp;
	        }
	
	        $('#tpul li').click(function(e) {
				$('#tpul li').each(function(e) {
					$("#tpul li[title='"+$(this).attr('title')+"']").removeClass("liselected");
				});
				var tp = $(this).attr('title');
				$("#TestPassTitle label").attr("title", tp);
				tp = trimText(tp,35);
	 			$("#TestPassTitle label").text(tp);
	 			$("#tpul li[title='"+$(this).attr('title')+"']").addClass("liselected");
	 			show.testPassId = $(this).attr('id');
	 			switch( $(".activeNav span").attr('id') )
		        {
			        case "tab3":
			        	tester.getTesters();
				 		tester.showTestersGrid();
				 		if($('#allT').css('color') == "rgb(0, 0, 0)")
			        		$('#allT').click();
			        	else if($('#createT').css('color') == "rgb(0, 0, 0)")
			        				$('#createT').click();
			        	else if($('#downloadT').css('color') == "rgb(0, 0, 0)")
			        				$('#downloadT').click();
				 		break;
				 	case "tab4":
				 		$('#btnDelete').show();
				 		testcase.getTestCases();
				 		testcase.getTestPassesWithNoTester();
				 		testcase.pagination();
						$('#navHeading tr:eq(3) td:eq(1)').css('background-color','#FFFFFF');
						$('.navTabs h2:eq(4)').hide();
						$(".navTabs h2").each(function(e) {
							if($(this).css('color') == "rgb(0, 0, 0)")
							{
								if($(this).text() != "View All")
									$(this).click();
							}	
						});				 		
						break;
				 	case "tab5":	
				 		teststep.testPassId = show.testPassId;
						teststep.projectId = show.projectId;
						teststep.choiceForTPID = show.choiceForTPID[show.testPassId];
						teststep.sequenceForTPID = show.sequenceForTPID[show.testPassId];
						teststep.projectName = $("#projectTitle label").attr("title");
						$('#projectName').text( teststep.projectName );
						teststep.testPassName = show.tpNameForTPID[ show.testPassId ]
						$('#testPassName').text(teststep.testPassName);
						teststep.clearFields();
						teststep.populateTestCase();
						teststep.populateRole();
						multiSelectList.selectAll("assotestcases");
						$('#showTestSteps').html("");
						teststep.pagination();
						$(".navTabs h2").each(function(e) {
							if($(this).css('color') == "rgb(0, 0, 0)")
							{
								if($(this).text() != "View All")
									$(this).click();
							}	
						});

						break;
					case "tab6":
						$("#AttachmentGrid").show();
						attachment.projectId = show.projectId;
						attachment.testPassId = show.testPassId;
						attachment.testPassName = show.tpNameForTPID[ show.testPassId ];
						attachment.populateTestCase();
						
						$(".navTabs h2").each(function(e) {
						if($(this).css('color') == "rgb(0, 0, 0)")
						{
							if($(this).text() != $('.navTabs h2:eq(0)').text() )
								$(this).click();
						}	
						});
						
						break;
			 	}
				$('#assoTP').hide();
			});
			
			switch( $(".activeNav span").attr('id') )
	        {
		        case "tab3":
		        	if($('#allT').css('color') == "rgb(0, 0, 0)")
		        	{
		        		tester.getProjectIndex();
		        		tester.populateRoles();
		        		tester.getTesters();
		        		tester.showTestersGrid();
		        		$('#allT').click();
		        	}	
		        	else if($('#createT').css('color') == "rgb(0, 0, 0)")
		        	{
		        			tester.getProjectIndex();
		        			tester.populateRoles();
		        			tester.getTesters();
		        			tester.showTestersGrid();
		        			$('#createT').click();//Populate roles are called on createT click
		        	}		
		        	else if($('#downloadT').css('color') == "rgb(0, 0, 0)")
		        	{
        				tester.getProjectIndex();
        				tester.populateRoles();
        				tester.getTesters();
        				tester.showTestersGrid();
        				$('#downloadT').click();	
		        	}							
			 		break;
			 	case "tab4":
			 		$('#btnDelete').show();
			 		testcase.getTestCases();
			 		testcase.getTestPassesWithNoTester();
			 		testcase.pagination();
					$('#navHeading tr:eq(3) td:eq(1)').css('background-color','#FFFFFF');
					$('.navTabs h2:eq(4)').hide();
					$(".navTabs h2").each(function(e) {
						if($(this).css('color') == "rgb(0, 0, 0)")
						{
							if($(this).text() != "View All")
								$(this).click();
						}	
					});
			 		break;	
			 	case "tab5":	
			 		teststep.testPassId = show.testPassId;
					teststep.projectId = show.projectId;
					teststep.choiceForTPID = show.choiceForTPID[show.testPassId];
					teststep.sequenceForTPID = show.sequenceForTPID[show.testPassId];
					teststep.projectName = $("#projectTitle label").attr("title");
					$('#projectName').text( teststep.projectName );
					teststep.testPassName = show.tpNameForTPID[ show.testPassId ];
					$('#testPassName').text(teststep.testPassName);
					teststep.clearFields();
					teststep.populateTestCase();
					teststep.populateRole();
					multiSelectList.selectAll("assotestcases");
					$('#showTestSteps').html("");
					teststep.pagination();
					$(".navTabs h2").each(function(e) {
						if($(this).css('color') == "rgb(0, 0, 0)")
						{
							if($(this).text() != "View All")
								$(this).click();
						}	
					});
					break;
				case "tab6":
					$("#AttachmentGrid").show();
					attachment.projectId = show.projectId;
					attachment.testPassId = show.testPassId;
					attachment.testPassName = show.tpNameForTPID[ show.testPassId ];
					attachment.populateTestCase();
					
					$(".navTabs h2").each(function(e) {
					if($(this).css('color') == "rgb(0, 0, 0)")
					{
						if($(this).text() != $('.navTabs h2:eq(0)').text() )
							$(this).click();
					}	
					});
					
					break;
		 	}

		}
		else
		{
			if($(".activeNav span").attr('id') == "tab3")
			{
				tester.getProjectIndex();
		        tester.populateRoles();
			}
			show.testPassId = '';
			var t = resource.gPageSpecialTerms['Test Pass']!=undefined&&resource.isConfig.toLowerCase()=='true'?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
			var tp = "<li title='No "+t+"'>No "+t+"</li>";
	        $("#tpul").html(tp);
	        $("#tpul li[title='No "+t+"']").addClass("liselected");
	        $("#TestPassTitle label").attr("title", "No "+t+"");
			$("#TestPassTitle label").text("No "+t+"");
			createDD.showMessage();
		}
	},
	showMessage:function()
	{
		switch( $(".activeNav span").attr('id') )
        {
	        case "tab2":
	        	if(show.projectId == '')
	        		testpass.prjId = '';
    			$("#Pagination1").css('display','none');
		    	$('#showTestPass').html("");
		    	$("#noP").css('display','');
		    	$("#testPassGrid").css('display','none');
		        $("#noP").show();
		        $('#noP').html('No '+testpass.gConfigTestPass+'(es) available!');
		        $("#pageTab h2").each(function(e) {
					if($(this).css('color') == "rgb(0, 0, 0)")
					{
						if($(this).text() != $('.navTabs h2:eq(0)').text())//for Bug Id 11702
							$(this).click();
					}	
				});
				
			 	testpass.allTestPasses = [];
			 	testpass.itemCount = 0;
			 	$("#countDiv").css('display', 'none');
		 		break;

	        case "tab3":
	        	tester.countVal = 0;
		 		$("#countDiv").css('display','none');
				$("#testerGrid").html('<h2 style="font-size:30px;color:#B8B8B8;">No '+tester.gConfigTester+'(s) Available!</h2>');//Added by Mohini for Resource file
  				$("#pagination").hide();
  				if($('#allT').css('color') == "rgb(0, 0, 0)")
	        		$('#allT').click();
	        	else if($('#createT').css('color') == "rgb(0, 0, 0)")
	        				$('#createT').click();
	        	else if($('#downloadT').css('color') == "rgb(0, 0, 0)")
	        				$('#downloadT').click();
		 		break;
		 		
		 	case "tab4":
		 		$("#Pagination").css('display','none');
		    	$('#showTestCases').html("");
		    	$("#noP").css('display','');
		    	$('#noTestCaseDiv').css('display','');
		    	$("#testCaseGrid").css('display','none');
		    	$("#countDiv").css('display','none');
				$('#btnDelete').hide();
				$(".navTabs h2").each(function(e) {
					if($(this).css('color') == "rgb(0, 0, 0)")
					{
						if($(this).text() != $('.navTabs h2:eq(0)').text() )
							$(this).click();
					}	
				});
				break;
				
			case "tab5":
				if(show.testPassId == '')
					teststep.testPassId = '';
				$('#testCaseName').html('<div style="border:1px #ccc solid;width:480px;height:165px"> No Test Case Available.</div>');
				$('#role').html('<div style="border:1px #ccc solid;width:447px;height:165px"> No Role Available.</div>');
				$("#testStepGrid").hide();
				$('#countDiv').hide();
				$("#noTP").show();
				$(".navTabs h2").each(function(e) {
					if($(this).css('color') == "rgb(0, 0, 0)")
					{
						if($(this).text() != $('.navTabs h2:eq(0)').text() )
							$(this).click();
					}	
				});

				break;
				
			case "tab6":	
				 //$("#AttachmentGrid").hide();
				 $("#testCaseName").html("<option>No "+attachment.gConfigTestCase+" Available</option>");//Added by Mohini for Resource file
				 $("#testStepName").html('<div class="Mediumddl" Style="height:192px">No '+attachment.gConfigTestStep+' Available</div>');//Added by Mohini for Resource file
				 $("AlertAttach").html('No '+attachment.gConfigAttachment+' Available.');
				 $("#AlertAttach").show();
				 $(".viewAttachment").hide();
				 
				 $('.ms-formtable').css('margin-top','0px');
				 
				 $(".navTabs h2").each(function(e) {
					if($(this).css('color') == "rgb(0, 0, 0)")
					{
						if($(this).text() != $('.navTabs h2:eq(0)').text() )
							$(this).click();
					}	
				});

	 	}

	}
}	