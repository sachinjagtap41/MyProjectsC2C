/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/


var TestCasecount = 0;
var oldTitle = '';
function hoverText()
{
 // Tooltip only Text
	$('.masterTooltip').hover(function(){
	        // Hover over code
	        if($(this).attr('title') != '')
	        {
	        	var title = $(this).attr('title');
	        	oldTitle = title;
	        }
	        else
	        	var title = oldTitle;	
	        $(this).data('tipText', title).removeAttr('title');
	        $('<p class="tooltip"></p>')
	        .text(title)
	        .appendTo('body')
	        .fadeIn('slow');
	}, 
	function() {
	        // Hover out code
	        $(this).attr('title', $(this).data('tipText'));
	        $('.tooltip').remove();
	}).mousemove(function(e) {
	        var mousex = e.pageX + 20; //Get X coordinates
	        var mousey = e.pageY + 10; //Get Y coordinates
	        $('.tooltip')
	        .css({ top: mousey, left: mousex })
	});
}
	
function CreateExcelSheet()
{  
   if($('#projSelect').val() == "select")
   {
        $('#dialog').text('Please select '+UATReport.gConfigProject);
		$('#dialog').dialog({height: 125,modal: false,buttons: { "Ok":function() { $(this).dialog("close");}} });
		Main.hideLoading();
		
	}   
   else{	   	    
   Main.showLoading();
   var status= document.getElementById('status').options[document.getElementById('status').selectedIndex].text;		
   var proj =  $('#projSelect').val();
   UATReport.getExportTable(proj,status);
   window.setTimeout("Main.hideLoading()", 400);
   }
}
	

var UATReport ={
	SiteURL:$().SPServices.SPGetCurrentSite(),
	ScenarioInfo:"",
	gTestPassID:"", 
	col:4,
	Page: new Array(),
	RoleNameForRoleID:new Array(),
	sBulleteChar:'Ø,v,ü',   //Added by Nikhil
	forTPIDGetDetails:new Array(),
  	forPIDGetDetails:new Array(),
	rolesForSPUserID:new Array(),
	managerNameForTPID:new Array(),
	imageURL:"",
	/******Variable defined for resource file by Mohini*******/
	gConfigProject:'Project',
	gConfigTestPass:'Test Pass',
	gConfigTestStep:'Test Step',
	gConfigTestCase:'Test Case',
	gConfigTester:'Tester',
	gConfigAction:'Action',
	gConfigStartDate:'Start Date',
	gConfigEndDate:'End Date',
	gConfigStatus:'Status',
	gConfigLead:'Lead',
	gConfigManager:'Manager',
	gConfigRole:'Role',
	gConfigSequence:'Sequence',
	gConfigExpectedResult:'Expected Result',
	gConfigActualresult:'Actual Result',
	gConfigActivity:'Activity',
	gConfigAnalysis:'Analysis',
	gConfigTriage:'Triage',
	gConfigArea:'Area',
	gConfigActivities:'Activities',
	gConfigVersion :'Version',
	getVerByProjName:new Array(),

	//onLoad init page 
	initReportPage:function(){
     try{  
          
          $("ul li a:eq(2)").attr('class','selHeading');
          /*******Added by Mohini For resource file*********/
			if(resource.isConfig.toLowerCase()=='true')
			{
			    UATReport.gConfigProject=resource.gPageSpecialTerms['Project']==undefined?'Project':resource.gPageSpecialTerms['Project'];
			    UATReport.gConfigTestPass=resource.gPageSpecialTerms['Test Pass']==undefined?'Test Pass':resource.gPageSpecialTerms['Test Pass'];
			    UATReport.gConfigTestCase=resource.gPageSpecialTerms['Test Case']==undefined?'Test Case':resource.gPageSpecialTerms['Test Case'];
			    UATReport.gConfigTestStep=resource.gPageSpecialTerms['Test Step']==undefined?'Test Step':resource.gPageSpecialTerms['Test Step'];
			    UATReport.gConfigTester=resource.gPageSpecialTerms['Tester']==undefined?'Tester':resource.gPageSpecialTerms['Tester'];
			    UATReport.gConfigAction=resource.gPageSpecialTerms['Action']==undefined?'Action':resource.gPageSpecialTerms['Action'];
			    UATReport.gConfigStartDate=resource.gPageSpecialTerms['Start Date']==undefined?'Start Date':resource.gPageSpecialTerms['Start Date'];
		        UATReport.gConfigEndDate=resource.gPageSpecialTerms['End Date']==undefined?'End Date':resource.gPageSpecialTerms['End Date'];
		        UATReport.gConfigStatus=resource.gPageSpecialTerms['Status']==undefined?'Status':resource.gPageSpecialTerms['Status'];
		        UATReport.gConfigLead=resource.gPageSpecialTerms['Lead']==undefined?'Lead':resource.gPageSpecialTerms['Lead'];
		        UATReport.gConfigManager=resource.gPageSpecialTerms['Test Manager']==undefined?'Test Manager':resource.gPageSpecialTerms['Test Manager'];
		        UATReport.gConfigRole=resource.gPageSpecialTerms['Role']==undefined?'Role':resource.gPageSpecialTerms['Role'];
		        UATReport.gConfigSequence=resource.gPageSpecialTerms['Sequence']==undefined?'Sequence':resource.gPageSpecialTerms['Sequence'];
			    UATReport.gConfigExpectedResult=resource.gPageSpecialTerms['Expected Result']==undefined?'Expected Result':resource.gPageSpecialTerms['Expected Result'];
		        UATReport.gConfigActualresult=resource.gPageSpecialTerms['Actual Result']==undefined?'Actual Result':resource.gPageSpecialTerms['Actual Result'];
		        UATReport.gConfigActivity=resource.gPageSpecialTerms['Activities']==undefined?'Activities':resource.gPageSpecialTerms['Activities'];
		        UATReport.gConfigAnalysis=resource.gPageSpecialTerms['Analysis']==undefined?'Analysis':resource.gPageSpecialTerms['Analysis'];
		        UATReport.gConfigTriage=resource.gPageSpecialTerms['Triage']==undefined?'Triage':resource.gPageSpecialTerms['Triage'];
		        UATReport.gConfigArea=resource.gPageSpecialTerms['Area']==undefined?'Area':resource.gPageSpecialTerms['Area'];
		        UATReport.gConfigVersion=resource.gPageSpecialTerms['Version']==undefined?'Version':resource.gPageSpecialTerms['Version'];
		
			}
		 
		 $("#dvProjectDetails").css('min-height','140px');
         $('#tpDetails').html(UATReport.gConfigTestPass+' Details');
         $('#hTestCase').html(UATReport.gConfigTestCase+'(s)');
         $('#divAlert').attr('title',$('#pgHeading').html());
         $('#dvTemp').attr('title',$('#pgHeading').html());
         $('#versionSelect').html('<option>Select '+UATReport.gConfigVersion+'</option>');
          //Fill Project DropDown
		  UATReport.fillProjectDD();
          
	      //On load Fill Project(Default) area
	      var onLoadte = UATReport.getScenarios($('#projSelect option:selected').val());
		  $('#thisScenario').empty();//to clear testpass details of previous project if any
		 					
		  var onLoadgs = '';
		  // hover effect
		  $('div.scenario h3').add('div.scenario2 h3').hover(function() {
		             $(this).addClass('hover');
				}, function() {
				     $(this).removeClass('hover');
		  }); 
		  // independently show and hide	    				        
		  $('div.scenario:eq(0) > div').hide();  
		  $('div.scenario:eq(0) > h3').click(function() {
				    $(this).next().slideToggle('fast');
				if($(this).css("background-image").substr($(this).css("background-image").length-13,11) == "arrow-u.jpg")
					$(this).css("background-image", "url("+this.SiteURL+"/SiteAssets/images/arrow-d.jpg)");  	
		    	else
					$(this).css("background-image", "url("+this.SiteURL+"/SiteAssets/images/arrow-u.jpg)");  
		   });
		   //simultaneous showing and hiding	  
		   $('div.scenario2:eq(0) > div').hide();
		   $('div.scenario2:eq(0) > h3').click(function() {
			     $(this).next('div').slideToggle('fast')
					    .siblings('div:visible').slideUp('fast');
			});
								
			
	      //End On load Fill Project(Default) area
	     
          //On Change Project Area Fill 
	      $('#projSelect').change(function(e) { 
	      
					  var selected = this.value;
					  if(selected == 'select')
					  {
					      //$('#projectName').text('Project -');
					      $('#projectName').text(UATReport.gConfigProject+' -');//Added By Mohini for Resource File
						  $('#projectName').append('<span>(#ID: )</span)');
                          $('#projDesc').empty();
						  $('#scenSelect').val(0);
						  $('#thisScenario').empty();
						  $('#tester').val(0);
						  $('#scenario').empty();
						  $('#roleList').empty();//:SD
						  /*********Added By Mohini for Resource file*************/
						  $('#scenSelect').html('<option value="0" selected="selected">Select '+UATReport.gConfigTestPass+'</option>');
						  $('#tester').html('<option value="0" selected="selected">Select '+UATReport.gConfigTester+'</option>');
						  $('#versionSelect').html('<option>Select '+UATReport.gConfigVersion+'</option>');
						  $('#roleList').html('<option>Select '+UATReport.gConfigRole+'</option>');//:SD

						  	$('#hTestCase').hide();
							$('#scrollbar1').hide();
							$('#dvProjectDetails').hide();
							$('#status>option:eq(0)').attr('selected', true);
					  }
					  else
					  {   
					      if(isPortfolioOn)
					      { 
						      //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
						  	  var NoOfVer = 0;
						  	  var data = UATReport.getVerByProjName[$('#projSelect option:selected').attr("title")];
						  	  if(data!= undefined)
						  	  	NoOfVer = data.length;
						  	  	
						  	  var verOptions = '';
						  	  
						  	  for(var i=0;i<NoOfVer;i++)
						  	  {
						  	  	verOptions += '<option value="'+data[i]["ProjectID"]+'">'+data[i]["Version"]+'</option>'
						  	  }
						  	  
						  	  if(verOptions =="")
						  	  	 verOptions = '<option>Default '+UATReport.gConfigVersion+'</option>';
						  	  	
						  	  $("#versionSelect").html(verOptions);
						  	  //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
						  	}
					       
					       //Code Modified By swapnil kamle on 2/8/2012
					      //$('#projectName').text('Project -');
					      $('#projectName').text(UATReport.gConfigProject+' -');//Added By Mohini for Resource File
						  $('#projectName').append('<span>(#ID: )</span)');
                          $('#projDesc').empty();
						  $('#scenSelect').empty();
						  
						  $('#thisScenario').empty();
						  $('#tester').empty();
						  $('#scenario').empty();
						 
						  $('#hTestCase').hide();
						  $('#scrollbar1').hide();
						  $('#dvProjectDetails').hide();

					      //$('#projectName').text('Project -'+this.options[this.selectedIndex].title);
					      $('#projectName').text(UATReport.gConfigProject+' - '+this.options[this.selectedIndex].title);//Added By Mohini for Resource File

						  $('#projectName').append('<span>(#ID: '+this.value+')</span)');
						  if(isPortfolioOn)
						      $('#VersionName').text(UATReport.gConfigVersion+" - "+$('#versionSelect option:selected').text());
						  
						  var te = UATReport.getScenarios(this.value);
						  
						  var projectDesc = '-';
						  if(UATReport.forPIDGetDetails[$('#projSelect option:selected').val()] != undefined)
						  	 projectDesc = UATReport.forPIDGetDetails[$('#projSelect option:selected').val()].description;

						 
						  if(te.length != 0)
						  {
						  	  var tp = '';
						  	  if(te.length > 1)
						  	  	//tp ='<option value="0">All Test Passes</option>';
						  	  	tp ='<option value="0">All '+UATReport.gConfigTestPass+'es</option>';//Added By Mohini for Resource File

							  for( var j=0; j<te.length;j++)
							  {
							     tp = tp+te[j];
							  }
						  }
						  else
						  	//var tp ='<option>No Test Pass Available</option>';
						  	var tp ='<option>No '+UATReport.gConfigTestPass+' Available</option>';//Added By Mohini for Resource File	  
						  if(projectDesc == '-' || projectDesc == undefined)
						  	projectDesc ='No Description Available';
						  	
						  $('#projDesc').text(trimText(projectDesc,400));
						  $('#projDesc').attr('title',projectDesc);
						  hoverText();
						 
						  $('#scenSelect').html(tp);
						  $('#thisScenario').empty();//to clear testpass details of previous project if any
	                      $('#scenario').empty();  
						 var Tester = UATReport.getTester($('#scenSelect option:selected').val());						  
						 var onLoadtester ='';
						 for(var t=0;t<Tester.length;t++)
						 	onLoadtester+=Tester[t];
						 $('#tester').html(onLoadtester);
					   }
					   $('#scrollbar1').tinyscrollbar_update('relative');
	   
    		});
             //End On Change Project Area Fill
             
             $("#versionSelect").change(function(){
            
            			  $('#projSelect option:selected').val( $(this).val());
            
					      $('#projectName').text(UATReport.gConfigProject+' -');//Added By Mohini for Resource File
						  $('#projectName').append('<span>(#ID: )</span)');
                          $('#projDesc').empty();
						  $('#scenSelect').empty();
						  
						  $('#thisScenario').empty();
						  $('#tester').empty();
						  $('#scenario').empty();
						 
						  $('#hTestCase').hide();
						  $('#scrollbar1').hide();
						  $('#dvProjectDetails').hide();

					      //$('#projectName').text('Project -'+this.options[this.selectedIndex].title);
					      $('#projectName').text(UATReport.gConfigProject+' -'+$('#projSelect option:selected').attr("title"));//Added By Mohini for Resource File

						  $('#projectName').append('<span>(#ID: '+$('#projSelect option:selected').val()+')</span)');
						  
						  $('#VersionName').text(UATReport.gConfigVersion+" - "+$('#versionSelect option:selected').text());
						  
						  var te = UATReport.getScenarios($('#projSelect option:selected').val());
						  
						  var projectDesc = '-';
						  if(UATReport.forPIDGetDetails[$('#projSelect option:selected').val()] != undefined)
						  	 projectDesc = UATReport.forPIDGetDetails[$('#projSelect option:selected').val()].description;
						 
						  if(te.length != 0)
						  {
						  	  var tp = '';
						  	  if(te.length > 1)
						  	  	//tp ='<option value="0">All Test Passes</option>';
						  	  	tp ='<option value="0">All '+UATReport.gConfigTestPass+'es</option>';//Added By Mohini for Resource File

							  for( var j=0; j<te.length;j++)
							  {
							     tp = tp+te[j];
							  }
						  }
						  else
						  	var tp ='<option>No '+UATReport.gConfigTestPass+' Available</option>';//Added By Mohini for Resource File	  
						  	
						  if(projectDesc == '-' || projectDesc == undefined)
						  	projectDesc ='No Description Available';
						  	
						  $('#projDesc').text(trimText(projectDesc,400));
						  $('#projDesc').attr('title',projectDesc);
						  hoverText();
						  $('#scenSelect').html(tp);
						  $('#thisScenario').empty();//to clear testpass details of previous project if any
	                      $('#scenario').empty();  
						 var Tester = UATReport.getTester($('#scenSelect option:selected').val());						  
						 var onLoadtester ='';
						 for(var t=0;t<Tester.length;t++)
						 	onLoadtester+=Tester[t];
						 $('#tester').html(onLoadtester);
					   
					   $('#scrollbar1').tinyscrollbar_update('relative');
            
            }); 

             
             //On Change Scenario Area Fill
		  $('#scenSelect').change(function(e) { 
			    var selectedScenario = this.value;
				if(selectedScenario == 'select')
				{
				   // alert('select scenario');
				}
				else
				{   
				   var Tester = UATReport.getTester($('#scenSelect option:selected').val());						  
				   var onLoadtester ='';
				   for(var t=0;t<Tester.length;t++)
					  	onLoadtester+=Tester[t];
				   $('#tester').html(onLoadtester);						   
				}	   
		  });
		  
		  //Tester change event:SD
		  $('#tester').change(function(e){
		  		$("#roleList").empty();
				var temp = '<option value="' + 0 + '">All ' + UATReport.gConfigRole + '</option>';
			    $('#roleList').append(temp);
			try
			{
				if($("#tester").val() == 0)
    			{
    				var roleIDs = new Array();
			    	for(var ii=1;ii<$('#tester option').length;ii++)
					{
						var roles = UATReport.rolesForSPUserID[$('#tester option').eq(ii).val()].toString().split(",");
				    	for(var i=0;i<roles.length;i++)
						{
							 if($.inArray(roles[i],roleIDs) == -1)
							 {
							 	 var temp = '<option title="'+UATReport.RoleNameForRoleID[roles[i]]+'" value="'+roles[i]+'">'+trimText(UATReport.RoleNameForRoleID[roles[i]].toString(),16)+'</option>';
			            		 $("#roleList").append(temp);
			            		 roleIDs.push(roles[i]);
			            	 }	 
				        }
					}
				}
				else if($("#tester").val() != 0)
    			{	
    				var roleIDs = new Array();
					var roles = UATReport.rolesForSPUserID[$("#tester").val()].toString().split(",");
					for(var i=0;i<roles.length;i++)
					{
						if($.inArray(roles[i],roleIDs) == -1)
						{
							var temp = '<option title="'+UATReport.RoleNameForRoleID[roles[i]]+'" value="'+roles[i]+'">'+trimText(UATReport.RoleNameForRoleID[roles[i]].toString(),16)+'</option>';
			            	$("#roleList").append(temp);
			            	roleIDs.push(roles[i]);
						}
					}
				}
			}
			catch(e)
			{
			}

		  });
		  
		  
 		//End On Change Scenario Area Fill
 		if(opt.length == 1) // shilpa 30 apr bug 7843
        {
         	/*********Added By Mohini for Resource file*************/
         	$('#projSelect').html('<option>No '+UATReport.gConfigProject+' Available</option>');
	        $('#scenSelect').html('<option>No '+UATReport.gConfigTestPass+' Available</option>');
         	$('#tester').html('<option>No '+UATReport.gConfigTester+' Alloted</option>');
        }
        

        
 }catch(e){}
},
  fillProjectDD:function(){
    try{       
          ///////////////////////////// Single user sign on implemented on 3 May 2013    ///////////////////////////////////////////////////////////////////////////////////////
           
 			$("#projSelect").empty();
 			//$("#projSelect").html('<option value="select">Select Project</option>');
 			$("#projSelect").html('<option value="select">Select '+UATReport.gConfigProject+'</option>');//Added By Mohini for Resource File
			
			var projectItems = new Array();
			if($.inArray('1',security.userType)!=-1 )
			{
				var query = '<Query><OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy><ViewFields></ViewFields></Query>';
				projectItems=UATReport.dmlOperation(query,'Project');
			}
			else
			{
				//Added by Harshal on 14 March
				var userQuery='<Query><Where><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq></Where></Query>';
				var resultSecurity=UATReport.dmlOperation(userQuery,'UserSecurity');
				var temp="";
				if(resultSecurity != null || resultSecurity != undefined)
				{			
					var projectID = new Array();
				 	var numberOfIterations = Math.ceil(resultSecurity.length/147);
				 	var iterations=0;
				 	var camlQuery;
				 	var orEndTags;
				 	var projectItems= new Array();
				 	for(var y=0; y<numberOfIterations-1; y++)
				 	{
				 		camlQuery = '<Query><Where>';
				 		orEndTags='';
				 		for(var i=iterations; i<(iterations+147)-1; i++)
				 		{
				 			if($.inArray(resultSecurity[i]['ProjectId'],projectID)==-1 && resultSecurity[i]['ProjectId'] != undefined)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+resultSecurity[i]['ProjectId']+'</Value></Eq>';
								projectID.push(resultSecurity[i]['ProjectId']);
								orEndTags +='</Or>';
							}

				 		}
					 	camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Text">'+resultSecurity[i]['ProjectId']+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields></ViewFields></Query>';
						var result = UATReport.dmlOperation(camlQuery,'Project');
						if(result!=undefined)
							$.merge(projectItems,result);
						iterations +=147;
				 	}
				 	camlQuery = '<Query><Where>';
				 	orEndTags='';
				 	for(var i=iterations; i<resultSecurity.length-1; i++)
				 	{
				 		if($.inArray(resultSecurity[i]['ProjectId'],projectID)==-1 && resultSecurity[i]['ProjectId'] != undefined)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+resultSecurity[i]['ProjectId']+'</Value></Eq>';
							projectID.push(resultSecurity[i]['ProjectId']);
							orEndTags +='</Or>';
						}

				 	}
				 	camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Text">'+resultSecurity[i]['ProjectId']+'</Value></Eq>';
					camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields></ViewFields></Query>';
					var result = UATReport.dmlOperation(camlQuery,'Project');
					if(result!=undefined)
						$.merge(projectItems,result);
					
				}
			}
			if(projectItems != null && projectItems != undefined)
			{
				if(projectItems.length != 0)
				{
					var temp = '';
            		var projectName = '';
					var projectID = '';
					var tempProjName = new Array();
					for(var i=0;i<projectItems.length ; i++)
	                {
	                	  projectID = projectItems[i]['ID'];
	                	  //Code for portfolio changes :Ejaz Waquif DT:1/23/2014
		               	  if($.inArray(projectItems[i]['projectName'],tempProjName) == -1)
		               	  {
		               	      tempProjName.push(projectItems[i]['projectName']);
		               	      if(isPortfolioOn)//if Portfolio is on added by Mohini DT:09-05-2014
		               	      {
	                              var version = projectItems[i]['ProjectVersion'] == null || projectItems[i]['ProjectVersion'] == undefined ? "Default " + UATReport.gConfigVersion : projectItems[i]['ProjectVersion'];//Added by Mohini for Resource file
			               	      UATReport.getVerByProjName[projectItems[i]['projectName']] = new Array();
			               	      UATReport.getVerByProjName[projectItems[i]['projectName']] .push({
			               	      
				               	      	"Version":version,
				               	  		"ProjectID":projectItems[i]['ID']
			               	      
			               	      });
			               	  }
		               	      		                  
			                  projectName = projectItems[i]['projectName'].toString();
			                  
			                  if(projectName.length >25)
			                  {
			                     var sProNameTrimed=projectName.substring(0,25)+'...';
			                     temp = '<option title="'+projectName+'" value="'+projectID+'">'+sProNameTrimed+'</option>';
			                  }
			                  else
			                      temp = '<option title="'+projectName+'"  value="'+projectID+'">'+projectName+'</option>';
			                  
							  $("#projSelect").append(temp);   
						  }
						  else
						  {
						      if(isPortfolioOn)//if Portfolio is on added by Mohini DT:09-05-2014
		               	      {
	                                var version = projectItems[i]['ProjectVersion'] == null || projectItems[i]['ProjectVersion'] == undefined ? "Default " + UATReport.gConfigVersion : projectItems[i]['ProjectVersion'];//Added by Mohini for Resource file
							  		UATReport.getVerByProjName[projectItems[i]['projectName']] .push({
			               	      
				               	      	"Version":version,
				               	  		"ProjectID":projectItems[i]['ID']
			               	      });
			               	  }
						  }
						  UATReport.forPIDGetDetails[projectID] = projectItems[i]; 
		            }
		            
				}
				else
					window.location.href=Main.getSiteUrl()+"/SitePages/Dashboard.aspx";
			}
			

           /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         }catch(e){}
  },
  // get All Scenarios for drop down
  getScenarios:function(selected){
        try{   
            var temp = '';
            var ScenarioName = '';
            var ScenarioDD = new Array();
          ///////////////////////////////////////////////   Single User sign on implemented on 3 May 2013  //////////////////////////////////
            var userAsso = new Array();
			if(security.userAssociationForProject[$("#projSelect").val()] != undefined)
				userAsso = security.userAssociationForProject[$("#projSelect").val()].split(",");
	
			if($.inArray('2',userAsso)!=-1 || $.inArray('1',security.userType)!=-1 || $.inArray('5',userAsso)!=-1)
				var TPQuery = '<Query><Where><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$("#projSelect option:selected").val()+'</Value></Eq></Where></Query>';
			else	
			{
				var TPQuery = '<Query><Where>';
				if($.inArray('3',userAsso)!=-1)
				{
					TPQuery += '<And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$("#projSelect option:selected").val()+'</Value></Eq><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq></And>';
				}
				if($.inArray('4',userAsso)!=-1)
				{
					var queryOnTesterList = '<Query><Where><And><Eq><FieldRef Name="ProjectID" /><Value Type="Text">'+$("#projSelect option:selected").val()+'</Value></Eq><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq></And></Where></Query>';
					var testerItems=UATReport.dmlOperation(queryOnTesterList,'Tester');	
					if(testerItems != null && testerItems != undefined)
					{
						orEndTags = '';
						for(var ii=0;ii<(testerItems.length)-1;ii++)			 
						{
							TPQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+testerItems[ii]['TestPassID']+'</Value></Eq>';
						    orEndTags+='</Or>';
					    }
						TPQuery += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+testerItems[ii]['TestPassID']+'</Value></Eq>';
						if(orEndTags != '')
							TPQuery +=orEndTags;
	
					}
				}
				TPQuery += '</Where></Query>';	
					
			}	
			var ScenarioItems=UATReport.dmlOperation(TPQuery ,'TestPass');
			if(ScenarioItems!= undefined && ScenarioItems!= null)
	        {
	           for(var ii=0;ii<ScenarioItems.length ; ii++)
               { 
	                 ScenarioID = ScenarioItems[ii]['ID'];
	                 ScenarioName = ScenarioItems[ii]['TestPassName'];
	                 if(ScenarioName.length>32)
	                 {
	                 	var tpNameTrimed= ScenarioName.substring(0,32)+'...';
	                 	temp = '<option title="'+ScenarioName+'" value="'+ScenarioID+'">'+tpNameTrimed+'</option>';
	                 }
	                 else
	                 {
	            		temp = '<option value="'+ScenarioID+'">'+ScenarioName+'</option>';
	                 }
	                 ScenarioDD.push(temp);
	                 UATReport.forTPIDGetDetails[ScenarioItems[ii]['ID']] = ScenarioItems[ii];
                } 
	         }
	         else 
	         {
	         	 if($("#projSelect").val() == "select")
	         	 {
		         	 /*********Added By Mohini for Resource file*************/
		         	 $("#scenSelect").html('<option>Select '+UATReport.gConfigTestPass+'</option>');
		         	 $('#tester').html('<option>Select '+UATReport.gConfigTester+'</option>');
		         }
		         else
		         {
		         	/*********Added By Mohini for Resource file*************/
		         	$("#scenSelect").html('<option>No '+UATReport.gConfigTestPass+' Available</option>');
		         	$('#tester').html('<option>No '+UATReport.gConfigTester+' Alloted</option>');

		         }	 
	         }	
	         return ScenarioDD;
	      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
         }catch(e){}
      },
// get tester for selected testpass
getTester:function(selected){
        try{   
            var temp = '';
            var TesterName = '';
            var TesterDD = new Array();
            var TesterList='';
            var TesterQuery='';
            var TesterItems=''; 
            var testerIDArr = new Array();//:SD
            var roleIDArr = new Array();//:SD
            
            RoleList = jP.Lists.setSPObject(this.SiteURL,'TesterRole');//:SD
            
            if(selected!='0' && selected!=0)
            {
	            TesterList = jP.Lists.setSPObject(this.SiteURL,'Tester');            
			    TesterQuery = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+selected+'</Value></Eq></Where><ViewFields><FieldRef Name="TesterFullName" /><FieldRef Name="SPUserID" /><FieldRef Name="RoleID" /></ViewFields></Query>';								
			    TesterItems =TesterList.getSPItemsWithQuery(TesterQuery).Items;			
	            if((TesterItems != undefined) && (TesterItems != null))
	            {              
	                var flag =0;
					var count =0;
					//temp = '<option value="'+0+'">All Tester</option>';
					temp = '<option value="'+0+'">All '+UATReport.gConfigTester+'</option>';//Added By Mohini for Resource File
					TesterDD.push(temp);
					
					$("#roleList").empty();//:SD
					$("#roleList").append('<option value="0">All '+UATReport.gConfigRole+'</option>');//:SD
													
					UATReport.rolesForSPUserID.length = 0;
					for(var ii=0;ii<TesterItems.length;ii++)
					{						
						TesterID = TesterItems[ii]['SPUserID'];
	                    TesterName = TesterItems[ii]['TesterFullName'];
	                    
	                    //To get unique testers:SD
	                    if($.inArray(TesterID,testerIDArr)==-1)
	                    {
	                    	testerIDArr.push(TesterID);
	                    	temp = '<option value="'+TesterID+'">'+TesterName+'</option>';
							TesterDD.push(temp);
	                    }
	                    //To collect RoleIDs of testers:SD
						if($.inArray(TesterItems[ii]['RoleID'],roleIDArr) == -1)
						{
							roleIDArr.push(TesterItems[ii]['RoleID']);
							if(parseInt(TesterItems[ii]['RoleID'])== 1)
						    {
						    	var roleTemp = '<option title="Standard" value="1">Standard</option>';
					        	$("#roleList").append(roleTemp);
					        	UATReport.RoleNameForRoleID[parseInt(TesterItems[ii]['RoleID'])]="Standard";
						    }
						 }
	                    if(UATReport.rolesForSPUserID[TesterID] == undefined)
	                    	UATReport.rolesForSPUserID[TesterID] = parseInt(TesterItems[ii]['RoleID']);
	                    else
	                    	UATReport.rolesForSPUserID[TesterID] += "," + parseInt(TesterItems[ii]['RoleID']); 	
	                    
					}              
	             }  
	             else
	             {
	             	//temp = '<option value="'+0+'">No Tester Alloted</option>';
	             	temp = '<option value="'+0+'">No '+UATReport.gConfigTester+' Alloted</option>';//Added By Mohini for Resource File
					TesterDD.push(temp);
					$("#roleList").empty();//:SD
					$("#roleList").append('<option value="0">No '+UATReport.gConfigRole+'</option>');//:SD

	             }            
			}
			else
			{
					TesterList = jP.Lists.setSPObject(this.SiteURL,'Tester');            
				    TesterQuery = '<Query><Where><Eq><FieldRef Name="ProjectID" /><Value Type="Text">'+$('#projSelect option:selected').val()+'</Value></Eq></Where><ViewFields><FieldRef Name="TesterFullName" /><FieldRef Name="SPUserID" /><FieldRef Name="TestPassID" /><FieldRef Name="RoleID" /></ViewFields></Query>';								
				    TesterItems =TesterList.getSPItemsWithQuery(TesterQuery).Items;			
		            //temp = '<option value="'+0+'">All Tester</option>';
		            temp = '<option value="'+0+'">All '+UATReport.gConfigTester+'</option>';
					TesterDD.push(temp);
					if((TesterItems != undefined) && (TesterItems != null))
			        { 
			        	$("#roleList").empty();//:SD
						$("#roleList").append('<option value="0">All '+UATReport.gConfigRole+'</option>');//:SD

						$("#scenSelect option").each(function() //for iterating and fetching evry test pass id in dropdown
						{
							var flag =0;
							var count =0;
							for(var ii=0;ii<TesterItems.length;ii++)
									{		if(TesterItems[ii]["TestPassID"]== $(this).val())				
											{
											    TesterID = TesterItems[ii]['SPUserID'];
							                    TesterName = TesterItems[ii]['TesterFullName'];
							                    
							                    //To get unique testers:SD
							                    if($.inArray(TesterID,testerIDArr)==-1)
							                    {
							                    	testerIDArr.push(TesterID);
							                    	temp = '<option value="'+TesterID+'">'+TesterName+'</option>';
													TesterDD.push(temp);
							                    }

									            //To collect RoleIDs of testers:SD
												if($.inArray(TesterItems[ii]['RoleID'],roleIDArr) == -1)
												{
													roleIDArr.push(TesterItems[ii]['RoleID']);
													if(parseInt(TesterItems[ii]['RoleID'])== 1)
												    {
												    	var roleTemp = '<option title="Standard" value="1">Standard</option>';
											        	$("#roleList").append(roleTemp);
											        	UATReport.RoleNameForRoleID[parseInt(TesterItems[ii]['RoleID'])]="Standard";
												    }
												 }
									                
									            //To set gloabal variable:SD
												if(UATReport.rolesForSPUserID[TesterID] == undefined)
							                    	UATReport.rolesForSPUserID[TesterID] = parseInt(TesterItems[ii]['RoleID']);
							                    else
							                    	UATReport.rolesForSPUserID[TesterID] += "," + parseInt(TesterItems[ii]['RoleID']);     
									        }        	
									}              
				               
			             });
		             } 
		             else //:SD
		             {
		             	//temp = '<option value="'+0+'">No Tester Alloted</option>';
		             	temp = '<option value="'+0+'">No '+UATReport.gConfigTester+' Alloted</option>';//Added By Mohini for Resource File
						TesterDD.push(temp);
						$("#roleList").empty();//:SD
						$("#roleList").append('<option value="0">No '+UATReport.gConfigRole+'</option>');//:SD
					 }        
			      }
			
			        //Showing Roles:SD 
					var orEndTags='';
				 	var camlQuery ='';
				 	camlQuery = '<Query><Where>';
					for(var ii=0;ii<(roleIDArr.length)-1;ii++)			 
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+parseInt(roleIDArr[ii])+'</Value></Eq>';
					    orEndTags+='</Or>';
					    
				    }
					camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+parseInt(roleIDArr[ii])+'</Value></Eq>';
					if(orEndTags != '')
						camlQuery +=orEndTags;
					camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="Role" /></ViewFields></Query>';		
					var RoleItems = RoleList.getSPItemsWithQuery(camlQuery).Items;
					
					if(RoleItems != null && RoleItems != undefined)
					{
						for(var i=0;i<RoleItems.length;i++)
						{
							 if(RoleItems[i]['ID'] != 1)
							 {
							 	 temp = '<option title="'+RoleItems[i]['Role']+'" value="'+RoleItems[i]['ID']+'">'+trimText(RoleItems[i]['Role'],16)+'</option>';
					        	 $("#roleList").append(temp);
					        	 
					        	 UATReport.RoleNameForRoleID[parseInt(RoleItems[i]['ID'])]= RoleItems[i]['Role'];
					         }	 
				        }	 
					}
			
	       return TesterDD;
         }catch(e){}
      },
 // get Content of Scenario Test Cases and Action     
 getScenariosDeatils:function(getTestPass)
 {
  	try
  	{ 	  
   	    var temp='';
        var testinfo='';
	    // get & fill test pass information
	    var ScenarioItems = new Array(); 
        var due='';
        var obj = new Array();
        if(getTestPass==0)
        {
        	$("#scenSelect option").each(function()
			{
				obj = new Array();
        		obj = UATReport.forTPIDGetDetails[$(this).val()];
        		if(obj != undefined)
        		{
        			ScenarioItems.push(obj);
        		}
			});
        }
        else
        {
		    obj = UATReport.forTPIDGetDetails[ getTestPass ];
    		if(obj != undefined)
    		{
    			ScenarioItems.push(obj);
    		}	    
    	}
    	if(ScenarioItems.length != 0)
	    {	 
            temp+='<table class="gridDetails" cellspacing="0" style="word-wrap:break-word;"><thead>'
                    +'<tr>'
                        +'<td class="tblhd center" style="width:5%">#</td>'
                        +'<td class="tblhd" style="width:30%">Test Pass Name</td>'
                        +'<td class="tblhd" style="width:40%">Description</td>'
                        +'<td class="tblhd" style="width:15%">Test Manager</td>'
                        +'<td class="tblhd" style="width:10%">Due Date</td>'
                    +'</tr>'
             +'</thead><tbody>';  
           var testCaseIDs = new Array();              
           for(var mm=0;mm<ScenarioItems.length;mm++)
           {  
              if(ScenarioItems[mm]['Description']!=null&&ScenarioItems[mm]['Description']!=undefined)
              	var description=ScenarioItems[mm]['Description'];
              else
              	var description='-';	
              temp+='<tr style="width:1220px"><td class="center" style="width:5%">'+ScenarioItems[mm]['ID']+'</td>';
              temp+='<td  style="width:30%">'+ScenarioItems[mm]['TestPassName']+'</td>';  
              temp+='<td style="width:40%">'+UATReport.replaceSplCharacters2(description)+'</td>';
              temp+='<td style="width:15%">'+ScenarioItems[mm]['tstMngrFulNm']+'</td>';
              due = ScenarioItems[mm]['DueDate']
              var crd =  due.slice(0,10);
              var dd = crd.split('-');
              due = dd[1]+'-'+dd[2]+'-'+dd[0];
              
              temp+='<td style="width:10%">'+due+'</td></tr>';
	         
	          var testCaseList1 = jP.Lists.setSPObject(this.SiteURL,'TestCases');
	          var getTesterID = $("#tester option:selected").val();
	          
	          var roleID = $("#roleList option:selected").val();//:SD
	          
	          //Forming query for tester /Role selected if any along with testpassid selected:SD
	          var testPassMapListQuery = '<Query><Where>';
	          if(getTesterID != 0)
	          	 testPassMapListQuery += '<And><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+getTesterID+'</Value></Eq>';
	          if(roleID != 0)
	          	 testPassMapListQuery += '<And><Eq><FieldRef Name="Role" /><Value Type="Text">'+roleID+'</Value></Eq>';
			  testPassMapListQuery += '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+ScenarioItems[mm]['ID']+'</Value></Eq>';
			  
			  if(getTesterID != 0)
			  	testPassMapListQuery += '</And>';
			  if(roleID != 0)
				testPassMapListQuery += '</And>';
			  testPassMapListQuery += '</Where><OrderBy><FieldRef Name="TestCaseID" Ascending="True" /></OrderBy></Query>';

	           var testCaseMapListItems = UATReport.dmlOperation(testPassMapListQuery,'TestCaseToTestStepMapping');
	           var TestStepsPresentForTCID = new Array(); 
	           if(testCaseMapListItems != undefined && testCaseMapListItems != null)
	           {	            	
		             ////////////////////       Code added by Harshal on 5 April 2012 for optimization   ////////////////////////////////////////////
		            var testCaseItems = new Array();
			 		var testerListItems = new Array();
		            if(testCaseMapListItems != undefined && testCaseMapListItems != null)
		            {
		            	var ParentIDSPIDForTCID = new Array();
		            	var forParentIDGetStatus = new Array();
		            	var ActualResultForParentID = new Array();//Added by HRW as we are using different buffer for Actual Result
						var TestStepsForParentID = new Array();
		                var TesterNameForSPUserID = new Array();
						var TestStepNameAndExResultForTSID  = new Array();
						var uniqueTestSteps = new Array();
						var uniqueTestCases = new Array();
		                for(var ii=0;ii<testCaseMapListItems.length;ii++)			 
						{
							 if(forParentIDGetStatus[testCaseMapListItems[ii]['TestPassMappingID']] == undefined)
							 	forParentIDGetStatus[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['status'];
							 else
							 	forParentIDGetStatus[testCaseMapListItems[ii]['TestPassMappingID']] += "," + testCaseMapListItems[ii]['status'];
							 if($("#status option:selected").text()=='All' || $("#status option:selected").text() == testCaseMapListItems[ii]['status'])
							 {
								 if(TestStepsForParentID[testCaseMapListItems[ii]['TestPassMappingID']] == undefined)
								 {
								 	TestStepsForParentID[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['TestStep']+"|"+testCaseMapListItems[ii]['status']+"|"+testCaseMapListItems[ii]['Role'];
								 	//Added by HRW for solving issue related pipe(|) as we are using different buffer for Actual Result
								 	if(testCaseMapListItems[ii]['ActualResult'] != undefined && testCaseMapListItems[ii]['ActualResult'] != '')
								 		ActualResultForParentID[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['ActualResult'];
								 	else
								 		ActualResultForParentID[testCaseMapListItems[ii]['TestPassMappingID']] = '-';	
								 }
								 else
								 {
								 	TestStepsForParentID[testCaseMapListItems[ii]['TestPassMappingID']] += "~" + testCaseMapListItems[ii]['TestStep']+"|"+testCaseMapListItems[ii]['status']+"|"+testCaseMapListItems[ii]['Role'];
								 	if(testCaseMapListItems[ii]['ActualResult'] != undefined && testCaseMapListItems[ii]['ActualResult'] != '')
								 		ActualResultForParentID[testCaseMapListItems[ii]['TestPassMappingID']] += "~" + testCaseMapListItems[ii]['ActualResult'];
								 	else
								 		ActualResultForParentID[testCaseMapListItems[ii]['TestPassMappingID']] += "~" + '-';
								 }		
								 if(ParentIDSPIDForTCID[testCaseMapListItems[ii]['TestCaseID']] == undefined)
								 	ParentIDSPIDForTCID[testCaseMapListItems[ii]['TestCaseID']] = testCaseMapListItems[ii]['TestPassMappingID']+","+testCaseMapListItems[ii]['SPUserID'];
								 else
								 {
								 	var str = testCaseMapListItems[ii]['TestPassMappingID']+","+testCaseMapListItems[ii]['SPUserID'];
								 	var arr = ParentIDSPIDForTCID[testCaseMapListItems[ii]['TestCaseID']].split("~");
								 	if($.inArray(str,arr) == -1)
								 		ParentIDSPIDForTCID[testCaseMapListItems[ii]['TestCaseID']] += "~" +str ;
								 }	
								 	
								 if($.inArray(testCaseMapListItems[ii]['TestStep'],uniqueTestSteps) == -1)
								 	uniqueTestSteps.push(testCaseMapListItems[ii]['TestStep']);
								 if($.inArray(testCaseMapListItems[ii]['TestCaseID'],uniqueTestCases) == -1)
								 	uniqueTestCases.push(testCaseMapListItems[ii]['TestCaseID']);
							}	 	
						}
						
						var numberOfIterrations = Math.ceil(uniqueTestSteps.length/147);
						var iterationpoint=0;
						var camlQuery;
						var orEndTags;
						var testStepItems= new Array();
						for(var y=0; y<numberOfIterrations-1; y++)
						{
							camlQuery = '<Query><Where>';
							orEndTags='';
							for(var ii=iterationpoint;ii<(iterationpoint+147)-1;ii++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ExpectedResult"/><FieldRef Name="actionName"/></ViewFields></Query>';
							var testStepItems2 = UATReport.dmlOperation(camlQuery,'Action')
							if(testStepItems2!= undefined)
								$.merge(testStepItems,testStepItems2);
							iterationpoint +=147;

						}
						camlQuery = '<Query><Where>';
						orEndTags='';
						for(var ii=iterationpoint; ii<uniqueTestSteps.length-1; ii++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ExpectedResult"/><FieldRef Name="actionName"/></ViewFields></Query>';
						var testStepItems2 = UATReport.dmlOperation(camlQuery,'Action')
						if(testStepItems2!= undefined)
							$.merge(testStepItems,testStepItems2);
							
						if(testStepItems != null && testStepItems !=undefined)
						{
							for(var i=0;i<testStepItems.length;i++)
								TestStepNameAndExResultForTSID[testStepItems[i]['ID']] = testStepItems[i]['actionName'] + "~" + testStepItems[i]['ExpectedResult'];
						}
						
						var numberOfIterrations = Math.ceil(uniqueTestCases.length/147);
						var iterationpoint=0;
						var camlQuery;
						var orEndTags;
						for(var y=0; y<numberOfIterrations-1; y++)
						{
							camlQuery = '<Query><Where>';
							orEndTags='';
							for(var ii=iterationpoint;ii<(iterationpoint+147)-1;ii++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="testCaseName"/><FieldRef Name="summary"/><FieldRef Name="position"/></ViewFields></Query>';
							var testCaseItems2 = UATReport.dmlOperation(camlQuery,'TestCases')
							if(testCaseItems2!= undefined)
								$.merge(testCaseItems,testCaseItems2);
							iterationpoint +=147;

						}
						camlQuery = '<Query><Where>';
						orEndTags='';
						for(var ii=iterationpoint; ii<uniqueTestCases.length-1; ii++)
						{
							camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
						camlQuery +=orEndTags;
						camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="testCaseName"/><FieldRef Name="summary"/><FieldRef Name="position"/></ViewFields></Query>';
						var testCaseItems2 = UATReport.dmlOperation(camlQuery,'TestCases')
						if(testCaseItems2!= undefined)
							$.merge(testCaseItems,testCaseItems2);
							
						if(testCaseItems.length != 0)
						{
							testCaseItems.sort(function(a,b){
									return a.position - b.position;
								});	
						}

						$("#tester option").each(function(){
							TesterNameForSPUserID[ $(this).val() ] = $(this).text();	
						});	
						
						for(var ii=0;ii<testCaseItems.length;ii++)			 
						{
							var parentID = "";
							var SPID = "";
							var parentIDsSPIDs = ParentIDSPIDForTCID[testCaseItems[ii]['ID']].split("~");
							for(var ms=0;ms<parentIDsSPIDs.length;ms++)
							{
								parentID = parentIDsSPIDs[ms].split(",")[0];
								SPID = parentIDsSPIDs[ms].split(",")[1];
								if(TestStepsForParentID[ parentID ] != undefined)
								{	
									var getTestCaseStatus = '';
									if(forParentIDGetStatus[parentID] != undefined)
									{
										var status = forParentIDGetStatus[parentID].split(",");
										if($.inArray('Fail',status) != -1)
											getTestCaseStatus = 'Fail';
										else if($.inArray('Not Completed',status) != -1)
												getTestCaseStatus = 'Not Completed';
										else if($.inArray('Pass',status) != -1)
												getTestCaseStatus = 'Pass';			
									}
									var testName = ''; 
									var summ = '';
									
									testName = testCaseItems[ii]['testCaseName'];
									if(testCaseItems[ii]['summary'] != undefined)	
										summ = testCaseItems[ii]['summary'];
									else	
					                    summ = '-';
					                 
					                TestStepsPresentForTCID.push(testCaseItems[ii]['ID']);
					                
					              	 var vTester= TesterNameForSPUserID[ SPID ];
							         testinfo = testinfo+'<h3>';
							         testinfo = testinfo+'<span class="desc">'+testName+'</span>';
							         testinfo = testinfo+'<span>[<b>Details</b>:'+summ+']</span>';
							         testinfo = testinfo+'<span class="desc2">'+UATReport.gConfigStatus+': '+getTestCaseStatus+'<b></b> </span>';   
							         testinfo = testinfo+'<span ><b class="desc">'+UATReport.gConfigTester+':- </b>'+vTester+'</span></h3>';
							         
							         //Modified by Anil On 10 Mar
				                 	//Modified by rajiv 
				                 	testinfo = testinfo+'<div style="overflow-x: auto;"><table style="table-layout:fixed;word-wrap:break-word;" class="gridDetails" cellspacing="0"><thead><tr>';
						         	testinfo = testinfo+'<td class="tblhd-b center" style="width:5%">#</td>';
						         	testinfo = testinfo+'<td class="tblhd-b" style="width:28%">Test Action / Steps</td>';
						         	testinfo = testinfo+'<td class="tblhd-b" style="width:7%">Role</td>';
						         	testinfo = testinfo+'<td class="tblhd-b" style="width:26%">Expected Result</td>';
						         	testinfo = testinfo+'<td class="tblhd-b" style="width:26%">Actual Result</td>';
						         	testinfo = testinfo+' <td class="tblhd-b" style="width:8%">Status</td>';
						         	testinfo = testinfo+'</tr></thead><tbody >';
						         	//End
						         	
						         	var testCaseMapListItems = TestStepsForParentID[ parentID ].split("~");
						         	var allActualResult = ActualResultForParentID[ parentID ].split("~");//Added by HRW
						         	for(tcm in testCaseMapListItems)
				                    {
					                     var getTestAction = testCaseMapListItems[tcm].split("|")[0];
					                     var getTestActionStatus = testCaseMapListItems[tcm].split("|")[1];
					                     var getTestActionRole = UATReport.RoleNameForRoleID[ testCaseMapListItems[tcm].split("|")[2] ];
				                      	 var getTestActionActualResult = '';
				                      	
				                      	 getTestActionActualResult = allActualResult[tcm];	
				
					                     if(TestStepNameAndExResultForTSID[getTestAction] != undefined)
						                 {
						                     //Nikhil - 02/04/2012 - Added to handle Bullete Changes
						                     	var ExpectedResult= '';
						                     	if(TestStepNameAndExResultForTSID[getTestAction].split('~')[1] != undefined && TestStepNameAndExResultForTSID[getTestAction].split('~')[1] != 'undefined')
						                     		ExpectedResult= UATReport.GetFormatedText(TestStepNameAndExResultForTSID[getTestAction].split('~')[1],'false');
						                     	else
						                     		ExpectedResult = '-';	
						                     	var ActualResult= UATReport.GetFormatedText(getTestActionActualResult,'false');
						                     	 var ActionName= UATReport.GetFormatedText(TestStepNameAndExResultForTSID[getTestAction].split('~')[0],'false');
				
							                    /** Added by shilpa **/
							                    //var completeActionName = UATReport.filterData(ActionName);
						                     	var completeActionName =ActionName.replace(/(\r\n)+/g, '');
				                                if(ActionName.indexOf("<") != -1 && ActionName.indexOf(">") != -1)
				                                	ActionName=completeActionName;
				                                	
						                     	//var completeExpectedResult = UATReport.filterData(ExpectedResult);
				                                var completeExpectedResult = ExpectedResult.replace(/(\r\n)+/g, '');
				                                if(ExpectedResult.indexOf("<") != -1 && ExpectedResult.indexOf(">") != -1)
				                                	ExpectedResult=completeExpectedResult;
		
						                     	//var completeActualResult = UATReport.filterData(ActualResult);
				                                var completeActualResult = ActualResult.replace(/(\r\n)+/g, '');
				                                if(ActualResult.indexOf("<") != -1 && ActualResult.indexOf(">") != -1)
				                                	ActualResult=completeActualResult;
						                     /** ***/
												var ActionName1 = UATReport.filterData(ActionName);
						                       ActionName1 = ActionName1.replace(/"/g, "&quot;");
						                       var ExpectedResult1 = UATReport.filterData(ExpectedResult);
						                       ExpectedResult1 = ExpectedResult1.replace(/"/g, "&quot;");
											   var ActualResult1 = UATReport.filterData(ActualResult);
						                       ActualResult1 = ActualResult1.replace(/"/g, "&quot;");

						                       testinfo = testinfo+'<tr><td class="center">'+getTestAction+'</td>';
						                       testinfo = testinfo+'<td title="'+ActionName1+'" style="overflow:hidden">'+ActionName+'</td>';
						                       testinfo = testinfo+'<td>'+getTestActionRole+'</td>';
						                       testinfo = testinfo+'<td title="'+ExpectedResult1+'" style="overflow:hidden">'+ExpectedResult+'</td>';
						                       testinfo = testinfo+'<td title="'+ActualResult1+'" style="overflow:hidden">'+ActualResult+'</td>';
						                       testinfo = testinfo+'<td>'+ getTestActionStatus+'</td></tr>';
					                  	}

				                    }
									testinfo = testinfo+'</tbody></table></div>';
								}
							}
						}
		                
		            }    
		            
		      }
              this.ScenarioInfo = temp+"</tbody></table>";
      		  //Added by HRW if Test case is present in test pass but not Test STep in it 30 Nov 2012
	       	  if(testCaseItems != null && testCaseItems != undefined)
		      {
	     		 for(var i=0;i<testCaseItems.length;i++)
		     	 {
		     		 if($.inArray(testCaseItems[i]['ID'],testCaseIDs) == -1)
				     {
						 testCaseIDs.push(testCaseItems[i]['ID']);
				         if($.inArray(testCaseItems[i]['ID'],TestStepsPresentForTCID) == -1)
					     {
							 testinfo = testinfo+'<h2 style="background-image:url(\'../SiteAssets/images/arrow-u.jpg\');background-repeat:no-repeat;padding:5px 10px 5px 15px;background-position-y:10px">';
					         testinfo = testinfo+'<span style="color:#030;padding-right:5px;font-size:13px;font-weight:bold"><b>'+testCaseItems[i]['testCaseName']+'</b></span>';
					         testinfo = testinfo+'<span> [<b>Details</b>:'+testCaseItems[i]['summary']+']</span>';
					         if($("#status option:selected").text() == "All")
					         {
					         	testinfo = testinfo+'</br><span>No '+UATReport.gConfigTestStep+' available</span></br></h2>';//Added By Mohini for Resource File
					         }
					         else
					         {
					            var tempStr = $("#status option:selected").text()=="Pass"||$("#status option:selected").text()=="Fail"?$("#status option:selected").text()+"ed" : $("#status option:selected").text();
					         	testinfo = testinfo+"</br><span>No '"+tempStr +"' "+UATReport.gConfigTestStep+" available</span></br></h2>";//Added By Mohini for Resource File
					         }	
					     }
					 }    
			    }
		     }
    	  }//End Of Test Pass For loop
	       
	  }//End Of Test Pass IF loop
     return testinfo;
   }
   catch(e){}
 },
 //ankita 18/7/2012: for alert of mandetory field
 alertBox:function(msg){
		$("#divAlert").text(msg);
		$('#divAlert').dialog({height: 130,modal: true, buttons: { "Ok":function() { $(this).dialog("close");}} });
},  
helpTextOnTempalteUse:function()
{
	/*********Added By Mohini for Resource file*************/
	var msg = "•If you are "+UATReport.gConfigTester.toLowerCase()+" in selected "+UATReport.gConfigTestPass+" then only you can download/export the Testing template of selected "+UATReport.gConfigTestPass+" against assigned "+UATReport.gConfigRole+"(s)!<br/>";
	msg += "•For importing Testing tempate, please select 'Import "+UATReport.gConfigTestCase+"' option from Action dropdown and click on 'Go' button!<br/>";
	msg += "•Please follow the same format as given below to perform Testing!<br/>";								
	msg += "•If you change the format of the template, data will not be imported properly.<br/>"
	//msg += "•You can only select value from Status dropdown.<br/>";
	//msg += "•Please use 'Email address' input format to enter Tester Name.";
		
	var url = "<a href='../SiteAssets/GuidelineDocs/Detailed Guidelines to Upload Offline Testing "+UATReport.gConfigStatus.toLowerCase()+" (Reports) Updated.pdf' target='_blank' style='text-decoration:underline;color:blue'>File</a>";
	var msg = "Please follow below steps to Import Testing Template:<br/>";
	msg += "&nbsp;&nbsp;1.	Download a Template with 'Export "+UATReport.gConfigTestCase+"s' option from 'Actions' dropdown for selected "+UATReport.gConfigProject+" and selected &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+UATReport.gConfigTestPass+" (Select only 1 "+UATReport.gConfigTestPass+" at a time).<br/>";
	msg += "&nbsp;&nbsp;2.	You will get a "+UATReport.gConfigTestCase+" template as per the selected "+UATReport.gConfigRole+". (1 template for 1 Testing "+UATReport.gConfigRole+".)<br/>";
	msg += "&nbsp;&nbsp;3.	Do the offline testing of the respective 'application which is under UAT phase' and add the '"+UATReport.gConfigActualresult+"' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;against each "+UATReport.gConfigTestStep+" and select the "+UATReport.gConfigStatus.toLowerCase()+" of the "+UATReport.gConfigTestStep+" (as per its testing "+UATReport.gConfigStatus.toLowerCase()+") from provided drop &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;down.<br/>";
	msg += "&nbsp;&nbsp;4.	Save Template in local drive.<br/>"
	msg += "&nbsp;&nbsp;5.	Upload this saved template using 'Import "+UATReport.gConfigTestCase+"s' option from 'Actions' dropdown.<br/><br/>"
	//msg += "6.	"+url+" to download guideline document.";
	msg += " Download "+url+" for detailed guidelines.";	
	$("#divAlert").html(msg);
	$('#divAlert').dialog({height: 150,width: 750,modal: true,title: "Guidelines to Import Testing Template", buttons: { "Ok":function() { $(this).dialog("close");}} });

},

 //show all the text related to selected tester
 
 showTesterData:function()
 {
 	//ankita 18/7/2012: to make select project mandetory
 	if($('#projSelect option:selected').val() == 'select')
 	{
 		//UATReport.alertBox("Please select project");
 		UATReport.alertBox("Please select "+UATReport.gConfigProject);//Added By Mohini for Resource File
 		Main.hideLoading();
 	}
 	else
 	{
    //Disable Show Button
		  var a= $('#projSelect option:selected').val();
		  $("#btnShow").attr("disabled","true");
		  Main.showLoading();
	 	
		/**********************************************************************/
	
	 	$('#hTestCase').show();
		$('#scrollbar1').show();
		$('#dvProjectDetails').show();
	 	
		$(".proj-desc").show();
		$('#tesctCaseDiv').show();
		$('#thisScenario').empty();//Clean Discription area
		$('#scenario').empty();//Clean Test Cases Grid
	
	 	/************ Code to Fill The Test Pass Names in the Grid **************/ 	
	    
	    var tpID= $('#scenSelect option:selected').val();
	    //var testerID= $('#tester option:selected').val();
	    var statusTS= $("#status option:selected").text();	
						
		UATReport.ScenarioInfo = "";
		var onLoadgss = UATReport.getScenariosDeatils(tpID);
		//Ankita 19/7/2012 : to solve Bug ID 983
		if(UATReport.ScenarioInfo=="" || UATReport.ScenarioInfo==undefined)
		{
			//$('#thisScenario').html('<span style="color:red;font-weight:bold">There are no Test Passes!</span>'); 
			$('#thisScenario').html('<span style="color:red;font-weight:bold">There are no '+UATReport.gConfigTestPass+'es!</span>');//Added By Mohini for Resource File
		}
		else
			$('#thisScenario').html(UATReport.ScenarioInfo);
			
		resource.UpdateTableHeaderText();//Added by Mohini for Resource file 
		
		if(onLoadgss=="" || onLoadgss==undefined)
		{
	    	//$('#scenario').html('<span style="color:red;font-weight:bold">There are no Test Cases!</span>');
	    	$('#scenario').html('<span style="color:red;font-weight:bold">There are no '+UATReport.gConfigTestCase+'s!</span>');//Added By Mohini for Resource File
		}
		else
		{
			$('#scenario').html(onLoadgss);
			resource.UpdateTableHeaderText();//Added by Mohini for Resource file
			$('#scrollbar1').tinyscrollbar_update('relative');
		}	
			   
	    //hover effect
	    $('div.scenario h3').add('div.scenario2 h3').hover(function() { $(this).addClass('hover'); $('#scrollbar1').tinyscrollbar_update('relative');
	                                                                   }, function() { $(this).removeClass('hover'); $('#scrollbar1').tinyscrollbar_update('relative');
	     }); 
		// independently show and hide	    				        
		$('div.scenario:eq(0) > div').hide();  
		$('div.scenario:eq(0) > h3').click(function() {
				    $(this).next().slideToggle('fast');
					if($(this).css("background-image").substr($(this).css("background-image").length-13,11) == "arrow-u.jpg")
						$(this).css("background-image", "url("+UATReport.SiteURL+"/SiteAssets/images/arrow-d.jpg)");  	
		    		else
						$(this).css("background-image", "url("+UATReport.SiteURL+"/SiteAssets/images/arrow-u.jpg)");  
					$('#scrollbar1').tinyscrollbar_update('relative');			
		});
		//simultaneous showing and hiding	  
		$('div.scenario2:eq(0) > div').hide();
		$('div.scenario2:eq(0) > h3').click(function() {
				$(this).next('div').slideToggle('fast')
						    .siblings('div:visible').slideUp('fast');
				$('#scrollbar1').tinyscrollbar_update('relative');
	    });
		
		window.setTimeout("Main.hideLoading()", 100);
	   //Enable Show Button
	   $("#btnShow").removeAttr("disabled");	
	 }
	 /* Added for bug 7278 */
	 if($('#thisScenario').find('table').length == 0)
	 	$('#thisScenario').css('float','left');
	 else
	 	$('#thisScenario').css('float','');
	 	
	 if($("#scenario").find("a").length != 0) /* shilpa 25 apr */
		$("#scenario").find("a").attr('target','_blank');
		
	$('.gridDetails').find('tr').each(function(i,v){
		$(v).find('td:eq(3)').find('img').attr('height','200');
		$(v).find('td:eq(3)').find('img').attr('width','250');
		$(v).find('td:eq(3)').find('img').css('height','200px').css('width','250px');
		$(v).find('td:eq(4)').find('img').attr('height','200');
		$(v).find('td:eq(4)').find('img').attr('width','250');
		$(v).find('td:eq(4)').find('img').css('height','200px').css('width','250px');
		$(v).find('td:eq(3)').find('table').css('width','290px');
		$(v).find('td:eq(4)').find('table').css('width','290px');
		$(v).find('td:eq(1)').find('table').css('width','290px');


	});
},

    
dmlOperation:function(search,list)
{
	var listname = jP.Lists.setSPObject(UATReport.SiteURL,list);	
	var query = search;
	var result = listname.getSPItemsWithQuery(query).Items;
	return (result);
},

    
    
getExportTable:function(selected,exportStatus)
{
	Main.showLoading();
	try
	{
		var came=0;
	           
	 	var eT = "";
           //alert(eT);
            var projectID =  '';      
            var stat = 0;
			try
			{
				var xls = new ActiveXObject("Excel.Application");
				stat = 1;
			}
			catch(ex)
			{
				//alert("ActiveX is not enabled on your browser.To enable this Open IE -> Tools ->Internet Options -> Security -> Custom Level -> ActiveX controls and plug-ins ->Enable \"Initialize and script ActiveX controls not marked as safe for scripting!");
				Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr

			}
			if(stat == 0)
			{
				Main.hideLoading();
				return;
			}
            
            //anki
		    xls.visible =true;
		    
            var xlsBook = xls.Workbooks.Add;
            var XlSheet='';
            var deleteFlagForRow=new Array();
           
            var projectListItems = UATReport.forPIDGetDetails[selected];
			var testPassListItems = new Array();						
            if($('#scenSelect option:selected').text()=='All '+UATReport.gConfigTestPass+'es')
	        {
	        	$("#scenSelect option").each(function()
				{
					obj = new Array();
	        		obj = UATReport.forTPIDGetDetails[$(this).val()];
	        		if(obj != undefined)
	        		{
	        			testPassListItems.push(obj);
	        		}
				});
	        }
	        else
	        {
			    obj = UATReport.forTPIDGetDetails[ $("#scenSelect").val() ];
	    		if(obj != undefined)
	    		{
	    			testPassListItems.push(obj);
	    		}	    
	    	}

            var sceSheet='';
		    if(projectListItems != null && projectListItems !=undefined  )
		    {     //activate project sheet
		          var projSheet= UATReport.gConfigProject+'-'+projectListItems['ID'];//Added By Mohini for Resource File
		          xls.worksheets("Sheet1").activate;
		          var XlSheet = xls.activeSheet;
		          
		          xls.visible = false;
		          //fill active Sheet cells 
		          XlSheet.Range("A1:H1000").NumberFormat = "@";
		          XlSheet.Cells(1,1).value = UATReport.gConfigProject+" ID";//Added By Mohini for Resource File
		          XlSheet.cells(1,1).font.bold="true";
		          XlSheet.cells(1,1).Interior.ColorIndex = 40;
		          var projId = projectListItems['ID'];
		          projId = (projId==null || projId == undefined)?'-':projId;
		          XlSheet.Cells(1,2).value = projId;
		          XlSheet.cells(1,2).Interior.ColorIndex = 36;
		          XlSheet.cells(1,2).HorizontalAlignment = 2;
		          XlSheet.Cells(2,1).value =UATReport.gConfigProject+" Name";//Added By Mohini for Resource File
		          XlSheet.cells(2,1).font.bold="true";
		          XlSheet.cells(2,1).Interior.ColorIndex = 40;
		          var projN = projectListItems['projectName'];
		          projN = (projN==null || projN == undefined)?'-':projN;
		          XlSheet.Cells(2,2).value = projN;
		          XlSheet.cells(2,2).Interior.ColorIndex = 36; 
		          
		          if(isPortfolioOn)//when Portfolio is ON DT:09-05-2014 
		          {
			          XlSheet.Cells(3,1).value = UATReport.gConfigVersion;//Added By Mohini for Resource File
			          XlSheet.cells(3,1).font.bold="true";
			          XlSheet.cells(3,1).VerticalAlignment=1;
			          XlSheet.cells(3,1).Interior.ColorIndex = 40;
			          var projD = projectListItems['ProjectVersion'];
			          //projD = (projD==null || projD == undefined)?'-':projD.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
			          projD = (projD==null || projD == undefined)?'Default '+UATReport.gConfigVersion:projD.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
	                  XlSheet.Cells(3,2).value = projD;
	                  XlSheet.cells(3,2).Interior.ColorIndex = 36;
	
			          
			          XlSheet.Cells(4,1).value = UATReport.gConfigProject+" Description";//Added By Mohini for Resource File
			          XlSheet.cells(4,1).font.bold="true";
			          XlSheet.cells(4,1).VerticalAlignment=1;
			          XlSheet.cells(4,1).Interior.ColorIndex = 40;
			          var projD = projectListItems['description'];
			          projD = (projD==null || projD == undefined)?'-':projD.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
	                  XlSheet.Cells(4,2).value = projD;
	                  XlSheet.cells(4,2).Interior.ColorIndex = 36;
	                  
	                  XlSheet.Cells(5,1).value = UATReport.gConfigVersion+" "+UATReport.gConfigLead;//Added By Mohini for Resource File
			          XlSheet.cells(5,1).font.bold="true";
			          XlSheet.cells(5,1).Interior.ColorIndex = 40;
			          var projLead = projectListItems['prjLeadFulNm'];
			          projLead = (projLead==null || projLead == undefined)?'-':projLead.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
	                  XlSheet.Cells(5,2).value = projLead;
	                  XlSheet.cells(5,2).Interior.ColorIndex = 36;
	               }
	               else
	               {
	                  XlSheet.Cells(3,1).value = UATReport.gConfigProject+" Description";//Added By Mohini for Resource File
			          XlSheet.cells(3,1).font.bold="true";
			          XlSheet.cells(3,1).VerticalAlignment=1;
			          XlSheet.cells(3,1).Interior.ColorIndex = 40;
			          var projD = projectListItems['description'];
			          projD = (projD==null || projD == undefined)?'-':projD.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
	                  XlSheet.Cells(3,2).value = projD;
	                  XlSheet.cells(3,2).Interior.ColorIndex = 36;
	                  
	                  XlSheet.Cells(4,1).value = UATReport.gConfigProject+" "+UATReport.gConfigLead;//Added By Mohini for Resource File
			          XlSheet.cells(4,1).font.bold="true";
			          XlSheet.cells(4,1).Interior.ColorIndex = 40;
			          var projLead = projectListItems['prjLeadFulNm'];
			          projLead = (projLead==null || projLead == undefined)?'-':projLead.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
	                  XlSheet.Cells(4,2).value = projLead;
	                  XlSheet.cells(4,2).Interior.ColorIndex = 36;
	               }
	
                   XlSheet.Range("A1").EntireColumn.AutoFit();
                   XlSheet.Range("B1").EntireColumn.columnwidth='80';
				   XlSheet.Range("B1").EntireColumn.WrapText = 'True';

                  //rename Active sheet
		          XlSheet.Name = projSheet;
		          
		          var projInf = XlSheet;
		          if(testPassListItems.length != 0)
                  {    
                    var sh='';
                    var des='';       
                    var j=1; 
					for(var si=testPassListItems.length-1; si>=0; si--)
					{
				      	j++;
       					var dataFlag = 0;
                        sceID = testPassListItems[si]['ID'];
                        sceID = (sceID==null || sceID == undefined)?'-':sceID;
                        //sceSheet = 'Test Pass'+'-'+ sceID;
                        sceSheet = UATReport.gConfigTestPass+'-'+ sceID;//Added y Mohini for resource file
                        var sID = sceID;

                        sh = "Sheet"+(j);
                        
                        if(j>xlsBook.worksheets.count)
                       		xlsBook.worksheets.Add();
                       	try	
                        {	xlsBook.worksheets(sh).activate;}
                        catch(e)
                        {	xlsBook.worksheets.Add;}
                        	
                        XlSheet = xlsBook.activeSheet;

                        XlSheet.Name = sceSheet;
                        XlSheet.Cells(1,1).Value = UATReport.gConfigTestPass+" ID";//Added By Mohini for Resource File
                        XlSheet.cells(1,1).font.bold="true";
                        XlSheet.Cells(1,2).Value = sceID;
                        XlSheet.cells(1,2).HorizontalAlignment = 2;
                        XlSheet.Cells(2,1).value = UATReport.gConfigTestPass+" Name";//Added By Mohini for Resource File
				        XlSheet.cells(2,1).font.bold="true";
				        var sN = testPassListItems[si]['TestPassName'];
				        sN = (sN==null || sN == undefined)?'-':sN;

				        XlSheet.Cells(2,2).value = sN;
				        XlSheet.Cells(3,1).value = UATReport.gConfigTestPass+" Description";//Added By Mohini for Resource File
				        XlSheet.cells(3,1).font.bold="true";

				        des = testPassListItems[si]['Description'];
				        des = (des==null || des == undefined)?'-':des.replace(/<(.|\n)*?>/ig,'');

				        XlSheet.Cells(3,2).value = des.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
				        
				        XlSheet.Cells(4,1).value = UATReport.gConfigManager;//Added By Mohini for Resource File
				        XlSheet.cells(4,1).font.bold="true";
                        var tm = testPassListItems[si]['tstMngrFulNm'];
                        tm = (tm==null || tm==undefined)?'-':tm;
                        XlSheet.Cells(4,2).value = tm;
                        
                        //Move on top to show the the bg color for the Test Pass(es) which don't have the Test Case or Tester
                        XlSheet.Range("A1").EntireColumn.AutoFit();
                        XlSheet.Range("B1").EntireColumn.AutoFit();
			            XlSheet.Range("C1").EntireColumn.AutoFit();
			            XlSheet.Range("F1").EntireColumn.AutoFit();
			            XlSheet.Range("G1").EntireColumn.AutoFit();
                        XlSheet.Range("A1:D1").Interior.ColorIndex = 36;
                        XlSheet.Range("A2:D2").Interior.ColorIndex = 36;
                        XlSheet.Range("A3:D3").Interior.ColorIndex = 36;
                        XlSheet.Range("A4:D4").Interior.ColorIndex = 36;
                        
                        var testerList = jP.Lists.setSPObject(this.SiteURL,'Tester');
                        
						var index=document.getElementById('tester').selectedIndex;
                     	var TesterNameForSPUserID = new Array();
                       
                        $("#tester option").each(function(){
							TesterNameForSPUserID[ $(this).val() ] = $(this).text();	
						});		
		                
						//Query for selected Role and selected tester condition along with testpassID :SD	
                        var testPassMapListQuery = '<Query><Where>';
						if($('#tester').val()!=0)
							testPassMapListQuery +='<And><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+$('#tester option:selected').val()+'</Value></Eq>';
                        if($('#roleList').val()!=0)	
                        	testPassMapListQuery +='<And><Eq><FieldRef Name="Role" /><Value Type="Text">'+$('#roleList option:selected').val()+'</Value></Eq>';
                        testPassMapListQuery +='<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+sceID+'</Value></Eq>';
                        if($('#tester').val()!=0)
							testPassMapListQuery +='</And>';
						if($('#roleList').val()!=0)
							testPassMapListQuery +='</And>';
						testPassMapListQuery +='</Where></Query>';
						
						if($('#tester').val()!=0)
						{
							var testPassMapListQuery = '<Query><Where>';
							if($('#tester').val()!=0)
								testPassMapListQuery +='<And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+sceID+'</Value></Eq>';
	                        if($('#roleList').val()!=0)	
	                        	testPassMapListQuery +='<And><Eq><FieldRef Name="Role" /><Value Type="Text">'+$('#roleList option:selected').val()+'</Value></Eq>';
	                        testPassMapListQuery +='<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+$('#tester option:selected').val()+'</Value></Eq>';
	                        if($('#tester').val()!=0)
								testPassMapListQuery +='</And>';
							if($('#roleList').val()!=0)
								testPassMapListQuery +='</And>';
							testPassMapListQuery +='</Where></Query>';
						}
						else
						{
							var testPassMapListQuery = '<Query><Where>';
	                        if($('#roleList').val()!=0)	
	                        	testPassMapListQuery +='<And><Eq><FieldRef Name="Role" /><Value Type="Text">'+$('#roleList option:selected').val()+'</Value></Eq>';
	                        testPassMapListQuery +='<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+sceID+'</Value></Eq>';
							if($('#roleList').val()!=0)
								testPassMapListQuery +='</And>';
							testPassMapListQuery +='</Where></Query>';
						}

                        var testPassMapList2 = jP.Lists.setSPObject(this.SiteURL,'TestCaseToTestStepMapping');
                        var ChildListResult2 = testPassMapList2.getSPItemsWithQuery(testPassMapListQuery).Items;     
		                       
                        if(ChildListResult2 != null && ChildListResult2 != undefined)
                        {
	                    	var trackrow = 10;
	            			var TestStepNameAndExpResultForTSID = new Array();
	            			var RoleNameForRoleID = new Array();
	              			var count = 0;
	              			var testCaseItems = new Array();
							var RoleResult = new Array();
							var RoleID = new Array();
							var uniqueTestSteps = new Array();
							var uniqueTestCases = new Array();
							
							var totalPass = 0;
							var totalFail = 0;
							var totalNC = 0;
							var ChildListResult = new Array();
			                for(var ii=0;ii<ChildListResult2.length;ii++)			 
							{
								 if($("#status option:selected").text()=='All' || $("#status option:selected").text() == ChildListResult2[ii]['status'])
								 {
									if($.inArray(ChildListResult2[ii]['TestStep'],uniqueTestSteps) == -1)
									 	uniqueTestSteps.push(ChildListResult2[ii]['TestStep']);
									if($.inArray(ChildListResult2[ii]['TestCaseID'],uniqueTestCases) == -1)
									 	uniqueTestCases.push(ChildListResult2[ii]['TestCaseID']);
									if($.inArray(ChildListResult2[ii]['Role'],RoleID) == -1)
										RoleID.push(ChildListResult2[ii]['Role']);
									
									ChildListResult = ChildListResult.concat(ChildListResult2[ii]);
									
									switch(ChildListResult2[ii]['status'])
									{
										case 'Pass':totalPass++;
													break;
										case 'Fail':totalFail++;
													break;
										case 'Not Completed':totalNC++;
													break;
									} 
								}	
									
							}
							XlSheet.Range("A5:D5").Interior.ColorIndex = 36;
	                        XlSheet.Range("A6:D6").Interior.ColorIndex = 36;
	                        XlSheet.Range("A7:D7").Interior.ColorIndex = 36;
	                        XlSheet.Range("A8:D8").Interior.ColorIndex = 36;

							XlSheet.Cells(5,1).Value = "Test Step(s) Statistics";
	                        XlSheet.cells(5,1).font.bold="true";
	                        XlSheet.Range(XlSheet.cells(5,1), XlSheet.cells(5,2)).Merge();
	                        //XlSheet.cells(5,1).verticalAlignment=1;
	                        
	                        XlSheet.Cells(6,1).Value = "Pass";
	                        XlSheet.cells(6,1).font.bold="true";
	                        XlSheet.Cells(6,2).Value = totalPass;
	                        XlSheet.cells(6,2).HorizontalAlignment = 2;
	                        
	                        XlSheet.Cells(7,1).Value = "Fail";
	                        XlSheet.cells(7,1).font.bold="true";
	                        XlSheet.Cells(7,2).Value = totalFail;
	                        XlSheet.cells(7,2).HorizontalAlignment = 2;
	                        
 							XlSheet.Cells(8,1).Value = "Not Completed";
	                        XlSheet.cells(8,1).font.bold="true";
	                        XlSheet.Cells(8,2).Value = totalNC;
	                        XlSheet.cells(8,2).HorizontalAlignment = 2;
							
							//For Test Case
							var numberOfIterrations = Math.ceil(uniqueTestCases.length/147);
							var iterationpoint=0;
							var camlQuery;
							var orEndTags;
							for(var y=0; y<numberOfIterrations-1; y++)
							{
								camlQuery = '<Query><Where>';
								orEndTags='';
								for(var ii=iterationpoint;ii<(iterationpoint+147)-1;ii++)
								{
									camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
									orEndTags +='</Or>';
								}
								camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
								camlQuery +=orEndTags;
								camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="testCaseName"/><FieldRef Name="summary"/><FieldRef Name="position"/></ViewFields></Query>';
								var testCaseItems2 = UATReport.dmlOperation(camlQuery,'TestCases')
								if(testCaseItems2!= undefined)
									$.merge(testCaseItems,testCaseItems2);
								iterationpoint +=147;
	
							}
							camlQuery = '<Query><Where>';
							orEndTags='';
							for(var ii=iterationpoint; ii<uniqueTestCases.length-1; ii++)
							{
								camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestCases[ii]+'</Value></Eq>';
							camlQuery +=orEndTags;
							camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="testCaseName"/><FieldRef Name="summary"/><FieldRef Name="position"/></ViewFields></Query>';
							var testCaseItems2 = UATReport.dmlOperation(camlQuery,'TestCases')
							if(testCaseItems2!= undefined)
								$.merge(testCaseItems,testCaseItems2);
							if(ChildListResult.length != 0)
							{
								//For role
								var q = '';
								var camlQuery = '<Query><Where>';
							    for(var mm=0;mm<(RoleID.length)-1;mm++)			 
								{
									camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+RoleID[mm]+'</Value></Eq>';
									q+='</Or>';
								}	
								camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+RoleID[mm]+'</Value></Eq>';
								camlQuery += q;
								camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="Role" /></ViewFields></Query>';
								RoleResult = UATReport.dmlOperation(camlQuery,'TesterRole');;
								
								//For Test Steps
								var numberOfIterrations = Math.ceil(uniqueTestSteps.length/147);
								var iterationpoint=0;
								var camlQuery;
								var orEndTags;
								var testStepItems= new Array();
								for(var y=0; y<numberOfIterrations-1; y++)
								{
									camlQuery = '<Query><Where>';
									orEndTags='';
									for(var ii=iterationpoint;ii<(iterationpoint+147)-1;ii++)
									{
										camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
										orEndTags +='</Or>';
									}
									camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
									camlQuery +=orEndTags;
									camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ExpectedResult"/><FieldRef Name="actionName"/></ViewFields></Query>';
									var testStepItems2 = UATReport.dmlOperation(camlQuery,'Action')
									if(testStepItems2!= undefined)
										$.merge(testStepItems,testStepItems2);
									iterationpoint +=147;
								}
								camlQuery = '<Query><Where>';
								orEndTags='';
								for(var ii=iterationpoint; ii<uniqueTestSteps.length-1; ii++)
								{
									camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
									orEndTags +='</Or>';
								}
								camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+uniqueTestSteps[ii]+'</Value></Eq>';
								camlQuery +=orEndTags;
								camlQuery +='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ExpectedResult"/><FieldRef Name="actionName"/></ViewFields></Query>';
								var testStepItems2 = UATReport.dmlOperation(camlQuery,'Action')
								if(testStepItems2!= undefined)
									$.merge(testStepItems,testStepItems2);
									
								
								//Collection Framework for getting Test Step Name & Description for TSID
								if(testStepItems!= null && testStepItems!=undefined)
								{
									for(var ss=0;ss<testStepItems.length;ss++)
									{
										if(testStepItems[ss]['ExpectedResult'] != undefined)
											TestStepNameAndExpResultForTSID[testStepItems[ss]['ID']] = testStepItems[ss]['actionName'] + "~" + testStepItems[ss]['ExpectedResult'];
										else
											TestStepNameAndExpResultForTSID[testStepItems[ss]['ID']] = testStepItems[ss]['actionName'] + "~" + '-';
									}	
								}
								//Collection Framework for getting Role Name for Role ID
								if(RoleResult != null && RoleResult !=undefined)
								{
									for(var ss=0;ss<RoleResult.length;ss++)
										RoleNameForRoleID[RoleResult[ss]['ID']] = RoleResult[ss]['Role'];
								}	
								RoleNameForRoleID[1] = 'Standard';	
								
								//////////////////********************    11 Sep 2014 ****************************
								var TestCaseNameForTCID = new Array();
								for(var mm=0;mm<testCaseItems.length;mm++)
									TestCaseNameForTCID[testCaseItems[mm]['ID']] = testCaseItems[mm]['testCaseName'];
								
								XlSheet.Cells(trackrow,1).value = UATReport.gConfigTestCase+' ID';
	                            XlSheet.cells(trackrow,1).font.bold="true";                                
	                     		XlSheet.cells(trackrow,1).HorizontalAlignment = -4152;
	                            XlSheet.cells(trackrow,1).Interior.ColorIndex = 40;
	                            
	                            XlSheet.Cells(trackrow,2).value =  UATReport.gConfigTestCase+' Name';
	                            XlSheet.cells(trackrow,2).font.bold="true";
	                            XlSheet.cells(trackrow,2).Interior.ColorIndex = 40;
	                            
	                            XlSheet.Cells(trackrow,3).value =  UATReport.gConfigTester+' Name';
	                            XlSheet.cells(trackrow,3).font.bold="true";
	                            XlSheet.cells(trackrow,3).Interior.ColorIndex = 40;
	
	                            XlSheet.Cells(trackrow,4).value = 'Test '+UATReport.gConfigAction+' / Steps';
	                            XlSheet.cells(trackrow,4).font.bold="true";
	                            XlSheet.cells(trackrow,4).Interior.ColorIndex = 40;
	                            
	                            XlSheet.Cells(trackrow,5).value = UATReport.gConfigExpectedResult;
	                            XlSheet.cells(trackrow,5).font.bold="true";
	                            XlSheet.cells(trackrow,5).Interior.ColorIndex = 40;
	                            
								XlSheet.Cells(trackrow,6).value = UATReport.gConfigRole;
	                            XlSheet.cells(trackrow,6).font.bold="true";
	                            XlSheet.cells(trackrow,6).Interior.ColorIndex = 40;
	                            
	                            XlSheet.Cells(trackrow,7).value = UATReport.gConfigStatus;
	                            XlSheet.cells(trackrow,7).font.bold="true";
	                            XlSheet.cells(trackrow,7).Interior.ColorIndex = 40;
	                            
	                            XlSheet.Cells(trackrow,8).value =UATReport.gConfigActualresult;
	                            XlSheet.cells(trackrow,8).font.bold="true";
	                            XlSheet.cells(trackrow,8).Interior.ColorIndex = 40;
	                            
	                            XlSheet.Cells(trackrow,9).value = 'Execution Time';
	                            XlSheet.cells(trackrow,9).font.bold="true";
	                            XlSheet.cells(trackrow,9).Interior.ColorIndex = 40;
								
								XlSheet.Range("B1").EntireColumn.columnwidth='30';//Test Case Name
								XlSheet.Range("B1").EntireColumn.WrapText = 'True';
								XlSheet.Range("C1").EntireColumn.columnwidth='20';//Tester Name
								XlSheet.Range("C1").EntireColumn.WrapText = 'True';
								
								XlSheet.Range("D1").EntireColumn.columnwidth='80';//Test Step Details
									            
					            XlSheet.Range("E1").EntireColumn.columnwidth='60';
					            XlSheet.Range("E1").EntireColumn.WrapText = 'True';
	
								XlSheet.Range("F1").EntireColumn.columnwidth='20';
					            XlSheet.Range("F1").EntireColumn.WrapText = 'True';
	
					            XlSheet.Range("F1").EntireColumn.Top;
					            XlSheet.Range("F1").EntireColumn.Left;
					            
								XlSheet.Range("G1").EntireColumn.columnwidth='20';
					            XlSheet.Range("G1").EntireColumn.WrapText = 'True';
	
					            XlSheet.Range("H1").EntireColumn.columnwidth='60';
					            XlSheet.Range("I1").EntireColumn.columnwidth='25';
								
								var srcObjAct = document.getElementById("divAct");
	                            var rangeObj = document.body.createTextRange();
	                            //var myRange1 = document.body.createTextRange();
	                            trackrow++;
								for(var ii=0;ii<ChildListResult.length;ii++)			 
								{
									XlSheet.Cells(trackrow,1).value = ChildListResult[ii]['TestCaseID'];
									XlSheet.Cells(trackrow,2).value = TestCaseNameForTCID[ ChildListResult[ii]['TestCaseID'] ];
									XlSheet.Cells(trackrow,3).value = TesterNameForSPUserID[ ChildListResult[ii]['SPUserID'] ];
									XlSheet.Cells(trackrow,9).value = ChildListResult[ii]['Modified'];
									
									var cellCount = trackrow-1;
									var lastCount = trackrow-1;
									var cellW = 417;//XlSheet.cells((cellCount+1),5).width+150;
									var childID = ChildListResult[ii]['ID'];
									var flagTrue = 0;
									/*if(XlSheet.cells((cellCount+1),1).value != undefined)
	               						cellCount = cellCount+1;*/
	               					TestStepPresentInTestCaseflag = true;
	               					flagTrue = 0;
	               					var flagExp = 0;
								    var flagTS = 0;
								    var flagAct = 0;
	               					lastCount = cellCount;
	               					if(TestStepNameAndExpResultForTSID[ ChildListResult[ii]['TestStep'] ] != undefined)//Test Step name
								    {
								        var TSName = TestStepNameAndExpResultForTSID[ ChildListResult[ii]['TestStep'] ].split("~")[0];
								        TSName = TSName.replace(/&quot;/g,'"');
								        /*For Bug Id:11778 Mohini DT:14-05-2014*/
								        TSName =TSName.replace(/&gt;/g,'>'); 
								        TSName =TSName.replace(/&lt;/g,'<'); 
								        TSName =TSName.replace(/&amp;/g,'&');
								        /*********************************/
								        if(TSName.match(/</g) == undefined && TSName.match(/</g) == null)
											XlSheet.cells((cellCount+1),4).value = TSName;
								        else if(TSName.match(/</g).length == 2 && (TSName.indexOf("<div") != -1 ||TSName.indexOf("<p") != -1))
								        	XlSheet.cells((cellCount+1),4).value = UATReport.filterData(TSName);
								        else if(TSName.indexOf("</table>") != -1 && TSName.indexOf("<table") != -1)
				       					    {
					       					    if(TSName.match(/<td/g).length > 1)
						       					{
						       					    var completeActionName = UATReport.filterData(TSName);
													completeActionName = completeActionName.replace(/&quot;/g, '"');
													completeActionName =completeActionName.replace(/(\r\n)+/g, '');
													XlSheet.cells((cellCount+1),4).value = completeActionName;
												}
												else
													flagTrue = 1;	
											}
											else
												flagTrue = 1;
											if(flagTrue == 1)	
											{
												enableDesignMode("rte1", TSName, false); 
										        rteCommand("rte1","selectAll");
										        rteCommand("rte1","copy");
												XlSheet.cells((cellCount+1),4).PasteSpecial();
											}
									}
									else
										XlSheet.cells((cellCount+1),4).value = "-";
										
									XlSheet.cells((cellCount+1),4).WrapText='True';
														
									var cellCount2 = cellCount; 
									var ExpectedResult = TestStepNameAndExpResultForTSID[ ChildListResult[ii]['TestStep'] ].split("~")[1];
									if(ExpectedResult != "-" && ExpectedResult != undefined && ExpectedResult != "undefined")
									{
										ExpectedResult= ExpectedResult.replace(/&quot;/g,'"');
									    /*For Bug Id:11778 Mohini DT:14-05-2014*/
									    ExpectedResult=ExpectedResult.replace(/&gt;/g,'>'); 
									    ExpectedResult=ExpectedResult.replace(/&lt;/g,'<'); 
									    ExpectedResult=ExpectedResult.replace(/&amp;/g,'&');
									}
									if(ExpectedResult != "-" && ExpectedResult != undefined && ExpectedResult != "undefined")//Expected Reult
									{
										flagTrue = 0;
										if(ExpectedResult.match(/</g) == undefined && ExpectedResult.match(/</g) == null)
											XlSheet.cells((cellCount+1),5).value = ExpectedResult;
										else if(ExpectedResult.match(/</g).length == 2 && (ExpectedResult.indexOf("<div") != -1 ||ExpectedResult.indexOf("<p") != -1))
								        	XlSheet.cells((cellCount+1),5).value = UATReport.filterData(ExpectedResult);
										else if(ExpectedResult.indexOf("</table>") != -1 && ExpectedResult.indexOf("<table") != -1)
											{
												if(ExpectedResult.match(/<td/g) != null && ExpectedResult.match(/<td/g) != undefined)
												{
													if(ExpectedResult.match(/<td/g).length > 1)
													{
														var completeExpResult = UATReport.filterData(ExpectedResult);
														completeExpResult = completeExpResult.replace(/&quot;/g, '"');
														completeExpResult =completeExpResult.replace(/(\r\n)+/g, '');
														XlSheet.cells((cellCount+1),5).value = completeExpResult;
													}
													else
														flagTrue = 1;		
												}	
												else
												{
													var completeExpResult = UATReport.filterData(ExpectedResult);
													completeExpResult = completeExpResult.replace(/&quot;/g, '"');
													completeExpResult =completeExpResult.replace(/(\r\n)+/g, '');
													XlSheet.cells((cellCount+1),5).value = completeExpResult;
												}	
											}
											else
												flagTrue = 1;
											if(flagTrue == 1)	
											{
												if(ExpectedResult.indexOf("data:image/png;base64") == -1)
												{
													$('#expectedResultWithImage').html(ExpectedResult);
									  				rangeObj.moveToElementText(expectedResultWithImage);
													rangeObj.execCommand('copy');
													XlSheet.cells((cellCount+1),5).PasteSpecial(); //Expected Result
												}
												else
												{
													var cellH = 15;//130;
													var flagActShow = 0;
													var idExp = 'divExp'+childID;
													//idExp = 'divExp'+childID;
													var imageCount = 0;
													var otherTextPresent = 0;
													if($("#"+idExp).html() == undefined)
													{
														var htmlforAppend = "<div id='"+idExp+"'></div>";
														$("#divExp").after(htmlforAppend);
														$("#"+idExp).html(ExpectedResult);
														$("#"+idExp+" img").each(function()
														{
															UATReport.AddAttachment($(this).attr('src').split(",")[1]);
															if(UATReport.imageURL != "")
															{
																$(this).attr("src","../"+UATReport.imageURL);
																if(cellW < $(this).attr("width")) 
																	$(this).attr("width",cellW);
																	
																if($(this).attr("height")<135)	
																	cellH = $(this).attr("height");	
																else
																{
																	cellH = 135;	
																	$(this).attr("height",135);	
																}	
																imageCount++;
															}	
														});
													}
													$("#"+idExp).children().each(function()
													{
														if($(this).attr('src')!=undefined)
														{
															flagActShow = 1;
														}	
														else if($(this).text() != "" && $(this).text() != undefined)
															{
																flagActShow = 0;	
																otherTextPresent = 1;
															}	
													});
													var srcObjExp = document.getElementById(idExp);
													rangeObj.moveToElementText(srcObjExp);
													rangeObj.select;					     
													rangeObj.execCommand('copy');
	
													XlSheet.cells((cellCount+1),5).PasteSpecial(); //Expected Result
													if(flagActShow == 1)
													{
														cellCount2 = XlSheet.UsedRange.Rows.Count;
														if(imageCount != 1 || otherTextPresent == 1)
														{
															if(cellH > 110)
																XlSheet.Range("A"+(cellCount2)+":F"+(cellCount2)).RowHeight = cellH-95;
															else
																XlSheet.Range("A"+(cellCount2)+":F"+(cellCount2)).RowHeight = cellH - 15;	
														}	
														flagExp = 1;
													}
													
												}	
											}
										XlSheet.cells((cellCount+1),5).WrapText='True'; //shilpa 4oct	
									}
									else
										XlSheet.cells((cellCount+1),5).value = '-';	
										
									XlSheet.Cells((cellCount+1),6).value = RoleNameForRoleID[ ChildListResult[ii]['Role'] ]; //Role
	                        		XlSheet.Cells((cellCount+1),7).value = ChildListResult[ii]['status']; //Status
	                        		
	                        		if(ChildListResult[ii]['ActualResult'] != undefined)//Actual Result
	                        		{
	                        		    var actRes= ChildListResult[ii]['ActualResult'];
	                        		    actRes= actRes.replace(/&quot;/g,'"');
									    /*For Bug Id:11778 Mohini DT:14-05-2014*/
									    actRes=actRes.replace(/&gt;/g,'>'); 
									    actRes=actRes.replace(/&lt;/g,'<'); 
									    actRes=actRes.replace(/&amp;/g,'&');
									    /*********************************/
										flagTrue = 0;
										if(actRes.match(/</g) == undefined && actRes.match(/</g) == null)
										{
											XlSheet.cells((cellCount+1),8).value = actRes;
											cellCount = cellCount2;
										}	
										else if(actRes.match(/</g).length == 2 && (actRes.indexOf("<div") != -1 ||actRes.indexOf("<p") != -1))
								        	{
								        		XlSheet.cells((cellCount+1),8).value = UATReport.filterData(actRes);
								        		cellCount = cellCount2;
								        	}	
										else if(actRes.indexOf("</table>") != -1 && actRes.indexOf("<table") != -1)
											{
												if(actRes.match(/<td/g).length > 1)
												{
													var completeActResult = UATReport.filterData(actRes);
													completeActResult = completeActResult.replace(/&quot;/g, '"');
													completeActResult =completeActResult.replace(/(\r\n)+/g, '');
													XlSheet.cells((cellCount+1),8).value = completeActResult;
													cellCount = XlSheet.UsedRange.Rows.Count;
												}
												else
													flagTrue = 1;	
											}
											else
												flagTrue = 1;
											
											if(flagTrue == 1)
											{
												if(actRes.indexOf("data:image/png;base64") == -1)
												{
													enableDesignMode("rte1", actRes, false); 
											        rteCommand("rte1","selectAll");
											        rteCommand("rte1","copy");
													XlSheet.cells((cellCount+1),8).PasteSpecial(); //Actual Result
													XlSheet.cells((cellCount+1),8).WrapText='True'; //shilpa 4oct
													cellCount = XlSheet.UsedRange.Rows.Count;
												}
												else
												{
													var cellH = 15;//XlSheet.cells((cellCount+1),6).height+115;
	
													var flagActShow = 0;
													$("#divAct").html(actRes);
													$("#divAct img").each(function()
													{
														UATReport.AddAttachment($(this).attr('src').split(",")[1]);
														if(UATReport.imageURL != "")
														{
															$(this).attr("src","../"+UATReport.imageURL);
															if(cellW < $(this).attr("width")) 
																$(this).attr("width",cellW);
															if($(this).attr("height")<150)	
																cellH = $(this).attr("height");	
															else
															{
																cellH = 150;	
																$(this).attr("height",150);
															}	
														}	
													});
													
													$("#divAct").children().each(function()
													{
														if($(this).attr('src')!=undefined)
														{
															flagActShow = 1;
														}	
														else if($(this).text() != "" && $(this).text() != undefined)
															flagActShow = 0;	
													});
													
													rangeObj.moveToElementText(srcObjAct);				
													rangeObj.select;					     
													rangeObj.execCommand('copy');
	
													/*enableDesignMode("rte1",$("#divAct").html(), false); 
											        rteCommand("rte1","selectAll");
											        rteCommand("rte1","copy");*/	
													XlSheet.cells((cellCount+1),8).PasteSpecial(); //Actual Result
													XlSheet.cells((cellCount+1),8).WrapText='True'; //shilpa 4oct
													if(flagActShow == 1)
													{
														cellCount = XlSheet.UsedRange.Rows.Count;
														XlSheet.Range("A"+(cellCount+2)+":F"+(cellCount+2)).RowHeight = cellH-35;
														flagAct = 1;
														cellCount=cellCount+2;
													}
													else
														cellCount = XlSheet.UsedRange.Rows.Count-2;
													
												}	
											}	
										XlSheet.cells((cellCount+1),8).WrapText='True'; //shilpa 4oct
	                        		}
	                        		else
	                        			XlSheet.Cells((cellCount+1),8).value = '-';
									
									cellCount = XlSheet.UsedRange.Rows.Count;
							        if(lastCount<cellCount-1)
							        {
							        	XlSheet.Range(XlSheet.cells((lastCount+1),1), XlSheet.cells(cellCount,1)).Merge();
							        	XlSheet.Range(XlSheet.cells((lastCount+1),2), XlSheet.cells(cellCount,2)).Merge();
									    XlSheet.Range(XlSheet.cells((lastCount+1),3), XlSheet.cells(cellCount,3)).Merge();
									    XlSheet.Range(XlSheet.cells((lastCount+1),6), XlSheet.cells(cellCount,6)).Merge();
									    XlSheet.Range(XlSheet.cells((lastCount+1),7), XlSheet.cells(cellCount,7)).Merge();
									    XlSheet.Range(XlSheet.cells((lastCount+1),9), XlSheet.cells(cellCount,9)).Merge();

									    for(var mm=lastCount+2;mm<=cellCount;mm++)
									    {
									    	if(XlSheet.cells((mm),4).value != undefined)
									    		flagTS = 1;
									    	if(XlSheet.cells((mm),5).value != undefined && XlSheet.cells((mm),3).value != "-")
									    		flagExp = 1;
									    	if(XlSheet.cells((mm),8).value != undefined && XlSheet.cells((mm),6).value != "-")
									    		flagAct = 1;		
									    	XlSheet.cells(mm,4).WrapText='True';
									    	XlSheet.cells(mm,5).WrapText='True';
									    	XlSheet.cells(mm,8).WrapText='True';	
									    }
									    if(flagTS == 0)
									    {
									    	 XlSheet.Range(XlSheet.cells((lastCount+1),4), XlSheet.cells(cellCount,4)).Merge();
									    	 XlSheet.Range(XlSheet.cells((lastCount+1),4), XlSheet.cells(cellCount,4)).VerticalAlignment=-4108;
									    	 //XlSheet.Range(XlSheet.cells((lastCount+1),2), XlSheet.cells(cellCount,2)).HorizontalAlignment=-4108;
										}
									    if(flagExp == 0)
									    {
									    	 XlSheet.Range(XlSheet.cells((lastCount+1),5), XlSheet.cells(cellCount,5)).Merge();	
									    	 XlSheet.Range(XlSheet.cells((lastCount+1),5), XlSheet.cells(cellCount,5)).VerticalAlignment=-4108;
									    	 //XlSheet.Range(XlSheet.cells((lastCount+1),3), XlSheet.cells(cellCount,3)).HorizontalAlignment=-4108;
									    }
									    if(flagAct == 0)
									    {
									    	 XlSheet.Range(XlSheet.cells((lastCount+1),8), XlSheet.cells(cellCount,8)).Merge();	
									    	 XlSheet.Range(XlSheet.cells((lastCount+1),8), XlSheet.cells(cellCount,8)).VerticalAlignment=-4108;
									    	 //XlSheet.Range(XlSheet.cells((lastCount+1),6), XlSheet.cells(cellCount,6)).HorizontalAlignment=-4108;
									    }	 	 
							        }
									trackrow = cellCount+1;	
	
								}
							}
							else
								dataFlag = 1;
								
							/////////////////////***************   End   ******************************///////////////
                        }
                        else
                        	dataFlag = 1;
                        if(dataFlag == 1)	
                        {
                        	/*if(testCaseItems !=null && testCaseItems !=undefined)			
                      		{
								for(var ss=0;ss<testCaseItems.length;ss++)
                      			{	
									var testName = testCaseItems[ss]['testCaseName'];
								    testName = (testName==null || testName==undefined)?'-':testName;
								    var testDesc = testCaseItems[ss]['summary'];
								    testDesc = (testDesc==null || testDesc==undefined)?'-':testDesc.replace(/<(.|\n)*?>/ig,'');
									//XlSheet.Cells(trackrow,1).value = 'Test Case ID';
									XlSheet.Cells(trackrow,1).value = UATReport.gConfigTestCase+' ID';//Added By Mohini for Resource File
			                        XlSheet.cells(trackrow,1).font.bold="true";
			                        XlSheet.Cells(trackrow,2).value = testCaseItems[ss]['ID'];
			                        XlSheet.cells(trackrow,2).HorizontalAlignment = 2;
	                                trackrow++;
	                                //XlSheet.Cells(trackrow,1).value = 'Test Case Name';
	                                XlSheet.Cells(trackrow,1).value = UATReport.gConfigTestCase+' Name';//Added By Mohini for Resource File
			                        XlSheet.cells(trackrow,1).font.bold="true";
			                        XlSheet.Cells(trackrow,2).value = testName;
			                        XlSheet.cells(trackrow,2).font.bold="true";
	                                trackrow++;
	                                XlSheet.Cells(trackrow,1).value = 'Test Description';
			                        XlSheet.cells(trackrow,1).font.bold="true";
			                        XlSheet.cells(trackrow,1).verticalAlignment=1;
			                        XlSheet.Cells(trackrow,2).value = testDesc;
	                                trackrow++;
	                                if($("#status option:selected").text() == "All")
	                                {
	                                	//XlSheet.cells(trackrow,2).value='No Test Step under this Test Case';
	                                	XlSheet.cells(trackrow,2).value='No '+UATReport.gConfigTestStep+' under this '+UATReport.gConfigTestCase;//Added By Mohini for Resource File
	                                }
	                                else
	                                {
	                                    var tempStr = $("#status option:selected").text()=="Pass"||$("#status option:selected").text()=="Fail"?$("#status option:selected").text()+"ed" : $("#status option:selected").text();	
	                                	//XlSheet.cells(trackrow,2).value="No '"+tempStr +"' Test Step under this Test Case";
	                                	XlSheet.cells(trackrow,2).value="No '"+tempStr +"' "+UATReport.gConfigTestStep+" under this "+UATReport.gConfigTestCase;//Added By Mohini for Resource File
	                                XlSheet.cells(trackrow,2).Interior.ColorIndex = 40;
	                                XlSheet.cells(trackrow,3).Interior.ColorIndex = 40;
	                                XlSheet.cells(trackrow,4).Interior.ColorIndex = 40;
	                                XlSheet.cells(trackrow,5).Interior.ColorIndex = 40;
	                               	trackrow++;
	                               }
	                            }   
                            }
                            else*/
                        		XlSheet.cells(11,2).value='No '+UATReport.gConfigTestCase+' Available';//Added By Mohini for Resource File
                    	}
                    	//Added on 11 Sep 2013
				        XlSheet.Range("A1").EntireColumn.VerticalAlignment=-4108;
				        XlSheet.Range("A1").EntireColumn.HorizontalAlignment=-4131;
				        XlSheet.Range("I1").EntireColumn.VerticalAlignment=-4108;
				        XlSheet.Range("I1").EntireColumn.HorizontalAlignment=-4131;
				       
				        if(trackrow != undefined)
					    {
					        XlSheet.Range("B10:B"+trackrow).VerticalAlignment=-4108;
					        XlSheet.Range("B10:B"+trackrow).HorizontalAlignment=-4108;
				        }
				        XlSheet.Range("C1").EntireColumn.VerticalAlignment=-4108;
				        XlSheet.Range("C1").EntireColumn.HorizontalAlignment=-4108;
				        
				        XlSheet.Range("F1").EntireColumn.VerticalAlignment=-4108;
				        XlSheet.Range("F1").EntireColumn.HorizontalAlignment=-4108;
				        
				        XlSheet.Range("G1").EntireColumn.VerticalAlignment=-4108;
				        XlSheet.Range("G1").EntireColumn.HorizontalAlignment=-4108;
				        

               	}
               projInf.activate;
               if(xlsBook.worksheets(1).Name.indexOf("Project-") == -1)
               {
	              projInf.Move(XlSheet);
	           } 
	           //Removing images from page which got attached during exporting to excel(13 Sep 2013)
	           $("#divExp").siblings().each(function(){
					if($(this).attr('id').indexOf("divExp") != -1)
					{
						var parent=document.getElementById("parentExp");
						var child=document.getElementById($(this).attr('id'));
						parent.removeChild(child);
					}
				}); 
				$("#divAct").html('');
				$("#expectedResultWithImage").html('');   
               //testPassListItems for ends
             }//testPassListItems if ends 
             else
             	//XlSheet.Cells(6,2).value = "There are no Test Passes!";
             	XlSheet.Cells(7,2).value = "There are no "+UATReport.gConfigTestPass+"es!";//Added By Mohini for Resource File
                 
   
         }//projectList if ends      
         xls.DisplayAlerts = true;
         xls.visible = true;
         CollectGarbage();   
         Main.hideLoading();
    
  }  
  catch(e)
  {
  	if(e.message == "Subscript out of range")
  	{
  		UATReport.alertBox("Please increase the range of excel sheets up to as below:Go to File > Option > General > Set value of ‘Include this may sheets’ = 3");
  	}
  	else if(e.message == "PasteSpecial method of Range class failed")
  	{
  		UATReport.alertBox("Please try again");
  	}
  	else
  	{
  		UATReport.alertBox(e.message);
  	}
  	 //Removing images from page which got attached during exporting to excel(13 Sep 2013)
       $("#divExp").siblings().each(function(){
			if($(this).attr('id').indexOf("divExp") != -1)
			{
				var parent=document.getElementById("parentExp");
				var child=document.getElementById($(this).attr('id'));
				parent.removeChild(child);
			}
		});
		$("#divAct").html('');
		$("#expectedResultWithImage").html(''); 
		xls.visible = true;
  	Main.hideLoading();
  }    
},
AddAttachment:function(baseStr)
{
	var obj = new Array();
	obj.push({
	 	"Title":"New1",
	 	"Qry":"Test"
	});
	var SPlistName = "testlist";
	var listname = jP.Lists.setSPObject(UATReport.SiteURL,SPlistName);
	var result = listname.updateItem(obj);	
	 $().SPServices(
	             {
	               operation: "AddAttachment",
	               webURL: UATReport.SiteURL,
	               listName: SPlistName,
	               listItemID: result.ID,
	               fileName: "Att.png",
	               attachment: baseStr,
	               async: false,
	               completefunc:UATReport.AttResult 
	             });		
},
AttResult:function(xmlHttpRequest, status)
{
	UATReport.imageURL = "";
	if(status == "success")
		UATReport.imageURL = $(xmlHttpRequest.responseText).find('AddAttachmentResult').text();
	
},

  replaceSplCharacters:function(str)
  {
	str = str.replace(/&nbsp;/gi,' ').replace(/&quot;/gi,"\"").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
	return str;
  },
  replaceSplCharacters2:function(str)
  {
	str = str.replace(/</g,'&lt;').replace(/>/g,'&gt;');
	return str;
  },

  //Nikhil - 2/03/2012 - Returns Formated Text for Actual and Expected Results.
  GetFormatedText:function(sText,FromExport)
  {
  sText=sText.replace(/\n|\r/g, '');
  if(FromExport=='true')
  {
  
  var sNewLine='\n';
  
  if(FromExport=='true')
  {
  sNewLine='\n';

  }
  else
  {
  sNewLine='<br/>';

  }
  
  var sResult ='';
  
  		var FlagBullete='false';
  		
  		$('#dvTemp').html('');
		$('#dvTemp').html(sText);
		
		//var length = $('#dvTemp').find('p').length-1;
		var length = $('#dvTemp').find('p').length-1;
	if(length>0)
	{
	
		for(i=0;i<=length;i++)
		{
					FlagBullete='false';
					var txtText;
			
					var pElement= $('#dvTemp').find('p')[i];
					//pElement=pElement.remove('/n');
						// case for Special bullete 
						if(pElement.childNodes.length==1)
						{
							//if(pElement.childNodes[0].nodeName=='A')
							if(pElement.childNodes[0].childNodes.length >= 2)
							{
								pElement= pElement.childNodes[0];
							}
						}
						
						
						// Handle Three Span to determine bullete.
						
						if(pElement.childNodes.length>=2)
						{
							FlagBullete='true';
						}

						//End
						
			if(pElement.childNodes.length>=2)
			{
			
				  txtText= pElement.childNodes[pElement.childNodes.length-1].innerText;
							
				  if(txtText!=undefined && txtText!=null && txtText!='')
					{	
						
						
						if(FlagBullete=='true')
						{
							sResult = sResult+'*  '+txtText+sNewLine;	//'\n';
				
						}
						else
						{
							sResult = sResult + txtText+sNewLine;	//'\n';
				
						}
					}
				
			}
			else
			{
				sResult = sResult + $('#dvTemp').find('p')[i].innerText +sNewLine;	//'\n';
						
			}
		}
	}
		else
		{
			// Remove <br />
			
			while(sText.indexOf('<br />')!=-1)
			{
				sText= sText.replace('<br />','');
			}
			
			sResult= sText;
			
		}
		
		if(sResult=='')
		{
		  sResult=sText;
		}
		
  	return sResult;
  	}
  	else
  	{
  		var arrBullet= UATReport.sBulleteChar.split(',');
			
			for(i=0;i<=arrBullet.length-1;i++)
			{
			  while(sText.indexOf('>'+arrBullet[i]+'<span')!=-1)
				   	sText= sText.replace('>'+arrBullet[i]+'<span','>* <span');
				  			  
			}
			
				return sText;
  	
  	}

  
  },
  
  filterData:function (info2){
   		var mydiv = document.createElement("div");
   		mydiv.innerHTML = info2;
   		if(navigator.appName=="Microsoft Internet Explorer")
        	info2=mydiv.innerText;
        else	        
        	info2=mydiv.textContent;
      	return  info2;     
},
}