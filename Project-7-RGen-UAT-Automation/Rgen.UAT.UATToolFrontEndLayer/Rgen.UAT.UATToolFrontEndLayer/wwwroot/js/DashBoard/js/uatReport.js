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
		$('#dialog').dialog({height: 125,modal: true,title:"Reports",buttons: { "Ok":function() { $(this).dialog("close");}} });
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
	gTestPassList:new Array(),// added by Rasika
	gTesterRoleList:new Array(),// added by Rasika
	gTestStep:new Array(),// added by Rasika
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
	gPageIndex:0,
    onLoadgss:new Array(),
  	
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
         $('#hTestCase').html(UATReport.gConfigTestStep+'(s)');
         $('#divAlert').attr('title',$('#pgHeading').html());
         $('#dvTemp').attr('title',$('#pgHeading').html());
         $('#versionSelect').html('<option>Select '+UATReport.gConfigVersion+'</option>');
         
          //Fill Project DropDown
		  UATReport.fillProjectDD();
          
	      //On load Fill Project(Default) area
		      var onLoadte = UATReport.getScenarios($('#versionSelect option:selected').val());
		      $('#thisScenario').empty();//to clear testpass details of previous project if any
		      var onLoadgs = '';
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
						  //$('#scenario').empty();
						  $("#Pagination").hide();
						  $("#testStepDetails").empty();
						  $("#Pagination").hide();
						  $("#testStepDetails").empty();
						  $('#roleList').empty();//:SD
						  /*********Added By Mohini for Resource file*************/
						  $('#scenSelect').html('<option value="0" selected="selected">Select '+UATReport.gConfigTestPass+'</option>');
						  $('#tester').html('<option value="0" selected="selected">Select '+UATReport.gConfigTester+'</option>');
						  $('#versionSelect').html('<option>Select '+UATReport.gConfigVersion+'</option>');
						  $('#roleList').html('<option>Select '+UATReport.gConfigRole+'</option>');//:SD

						  $('#hTestCase').hide();
						  //$('#scrollbar1').hide();
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
						  $("#Pagination").hide();
						  $("#testStepDetails").empty();

						  $('#hTestCase').hide();
						  //$('#scrollbar1').hide();
						  $('#dvProjectDetails').hide();

					      //$('#projectName').text('Project -'+this.options[this.selectedIndex].title);
					      $('#projectName').text(UATReport.gConfigProject+' - '+this.options[this.selectedIndex].title);//Added By Mohini for Resource File

						  $('#projectName').append('<span>(#ID: '+this.value+')</span)');
						  
						  if(isPortfolioOn)
						      $('#VersionName').text(UATReport.gConfigVersion+" - "+$('#versionSelect option:selected').text());
						      
												  
						  var te = UATReport.getScenarios(selected);
												  
						  
						  var projectDesc = '-';
						  if(UATReport.forPIDGetDetails[$('#projSelect option:selected').val()] != undefined)
						  	 projectDesc = UATReport.forPIDGetDetails[$('#projSelect option:selected').val()].projectDescription;

						 
						  //if(te.length != 0)  
					      if(te!=undefined)//Added By Rasika
						  {
						  	  var tp = '';
						  	  if(te.length >= 1)
						  	  {
						  	  		//tp ='<option value="0">All Test Passes</option>';
						  	  		tp ='<option value="0">All '+UATReport.gConfigTestPass+'es</option>';//Added By Mohini for Resource File
						  	  		for( var j=0; j<te.length;j++)
									{
									     tp = tp+te[j];
									}
						  	  }
							  else							  
							  {
							     	//tp ='<option>No '+UATReport.gConfigTestPass+' Available</option>';
							     	tp ='<option value="0" selected="selected">No '+UATReport.gConfigTestPass+' Available</option>';//13044 bugid							     	
							  }
						  }
						  else
						  {
							  	//var tp ='<option>No '+UATReport.gConfigTestPass+' Available</option>';//Added By Mohini for Resource File
							  	//13044 bugid
							  	var tp ='<option value="0" selected="selected">No '+UATReport.gConfigTestPass+' Available</option>';//Added By Mohini for Resource File
						  }
						   		  
						  if(projectDesc == '-' || projectDesc == undefined || projectDesc == '')
						  	projectDesc ='No Description Available';
						  	
						  $('#projDesc').text(trimText(projectDesc,330));
						  $('#projDesc').attr('title',projectDesc);
						  hoverText();
						 
						  $('#scenSelect').html(tp); 
						  $('#thisScenario').empty();//to clear testpass details of previous project if any
	                      //$('#scenario').empty();  
	                      $("#Pagination").hide();
						  $("#testStepDetails").empty();

						 var Tester = UATReport.getTester($('#scenSelect option:selected').val());						  
						 var onLoadtester ='';
						 if(Tester!=undefined)//Added by Rasika
						 {
						 	for(var t=0;t<Tester.length;t++)
						 	onLoadtester+=Tester[t];
						 	$('#tester').html(onLoadtester);
						 	$('#status>option:eq(0)').attr('selected', true);
						 }
						 else
						 {
						 	$('#tester').html('<option>No '+UATReport.gConfigTester+' Alloted</option>');
						 	$("#roleList").html('<option>No '+UATReport.gConfigRole+'</option>');
						 }
						 
						 
					   }
    		});
             //End On Change Project Area Fill
             
             $("#versionSelect").change(function(){
            			
              			  $('#projSelect option:selected').val( $(this).val());
            			  $('#status>option:eq(0)').attr('selected', true);
            			  
					      $('#projectName').text(UATReport.gConfigProject+' -');//Added By Mohini for Resource File
						  $('#projectName').append('<span>(#ID: )</span)');
                          $('#projDesc').empty();
						  $('#scenSelect').empty();
						  
						  $('#thisScenario').empty();
						  $('#tester').empty();
						  //$('#scenario').empty();
						  $("#Pagination").hide();
						  $("#testStepDetails").empty();

						  $('#hTestCase').hide();
						  $('#dvProjectDetails').hide();

					      //$('#projectName').text('Project -'+this.options[this.selectedIndex].title);
					      $('#projectName').text(UATReport.gConfigProject+' -'+$('#projSelect option:selected').attr("title"));//Added By Mohini for Resource File

						  $('#projectName').append('<span>(#ID: '+$('#projSelect option:selected').val()+')</span)');
						  
						  $('#VersionName').text(UATReport.gConfigVersion+" - "+$('#versionSelect option:selected').text());
						  
						  var te = UATReport.getScenarios($('#versionSelect option:selected').val());
						  						  
						  var projectDesc = '-';
						  if(UATReport.forPIDGetDetails[$('#projSelect option:selected').val()] != undefined)
						  	 projectDesc = UATReport.forPIDGetDetails[$('#projSelect option:selected').val()].projectDescription;
						 
						  if(te!=undefined)//Added By Rasika
						  {
						  	  var tp = '';
						  	  if(te.length >= 1)
						  	  {
						  	  		tp ='<option value="0">All '+UATReport.gConfigTestPass+'es</option>';
						  	  		for( var j=0; j<te.length;j++)
									{
									     tp = tp+te[j];
									}
						  	  }
							  else
							  {
							  	 //tp ='<option>No '+UATReport.gConfigTestPass+' Available</option>';
							  	 tp ='<option value="0" selected="selected">No '+UATReport.gConfigTestPass+' Available</option>';//bugid 13044							  	 
							  }
						  }
						  else
						  	  //bugid 13044	
						  	  var tp ='<option value="0" selected="selected">No '+UATReport.gConfigTestPass+' Available</option>';//Added By Mohini for Resource File
						  	  //var tp ='<option>No '+UATReport.gConfigTestPass+' Available</option>';//Added By Mohini for Resource File
						  	
						  if(projectDesc == '-' || projectDesc == undefined || projectDesc == '')
						  	projectDesc ='No Description Available';
						  	
						  $('#projDesc').text(trimText(projectDesc,330));
						  $('#projDesc').attr('title',projectDesc);
						  hoverText();
						  $('#scenSelect').html(tp);
						  $('#thisScenario').empty();//to clear testpass details of previous project if any
	                      //$('#scenario').empty();  
	                      $("#Pagination").hide();
						  $("#testStepDetails").empty();

						 var Tester = UATReport.getTester($('#scenSelect option:selected').val());						  
						 var onLoadtester ='';

						 if(Tester!=undefined)//Added by Rasika
						 {
						 	for(var t=0;t<Tester.length;t++)
						 	onLoadtester+=Tester[t];
						 	$('#tester').html(onLoadtester);
						 	$('#status>option:eq(0)').attr('selected', true);
						 }
						 else
						 {
						 	$('#tester').html('<option>No '+UATReport.gConfigTester+' Alloted</option>');
						 	$("#roleList").html('<option>No '+UATReport.gConfigRole+'</option>');
						 }
            }); 

             
          //On Change Scenario Area Fill
		  $('#scenSelect').change(function(e) { 
			    var selectedScenario = this.value;
			    $('#status>option:eq(0)').attr('selected', true);
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
		  		$('#status>option:eq(0)').attr('selected', true);
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
		  
		  //Role change event /* Added by Rasika */
		  $("#roleList").change(function(e){
		  		$('#status>option:eq(0)').attr('selected', true);
		  });

		   		// End On Change Scenario Area Fill
 		/*if(opt.length == 1) // shilpa 30 apr bug 7843
        {
         	//*********Added By Mohini for Resource file*************
         	$('#projSelect').html('<option>No '+UATReport.gConfigProject+' Available</option>');
	        $('#scenSelect').html('<option>No '+UATReport.gConfigTestPass+' Available</option>');
         	$('#tester').html('<option>No '+UATReport.gConfigTester+' Alloted</option>');
        }*/
        
 }catch(e){}
},
  fillProjectDD:function(){
    try{       
                    
 			$("#projSelect").empty();
 			$("#projSelect").html('<option value="select">Select '+UATReport.gConfigProject+'</option>');//Added By Mohini for Resource File
			
			var projectItems = new Array();
						
			var result = ServiceLayer.GetData("GetTestPassReportPage",_spUserId);
			if(result!=undefined)
						$.merge(projectItems,result);
						
				if(projectItems.length != 0)
				{
					var temp = '';
            		var projectName = '';
					var projectID = '';
					var tempProjName = new Array();
					for(var i=0;i<projectItems.length ; i++)
	                {
	                	  projectID = projectItems[i]['projectId'];
	                	  
	                	  //Code for portfolio changes :Ejaz Waquif DT:1/23/2014
		               	  if($.inArray(projectItems[i]['projectName'],tempProjName) == -1)
		               	  {
		               	      tempProjName.push(projectItems[i]['projectName']);
		               	      if(isPortfolioOn)//if Portfolio is on added by Mohini DT:09-05-2014
		               	      {
		               	      	  //To set Version list by Project name  	
	                              var version = projectItems[i]['projectVersion'] == null || projectItems[i]['projectVersion'] == undefined ? "Default " + UATReport.gConfigVersion : projectItems[i]['projectVersion'];//Added by Mohini for Resource file
			               	      UATReport.getVerByProjName[projectItems[i]['projectName']] = new Array();
			               	      UATReport.getVerByProjName[projectItems[i]['projectName']] .push({
			               	      
				               	      	"Version":version,
				               	  		"ProjectID":projectItems[i]['projectId']
				               	  });	               	     
			               	  									
								 //To set Testpass list by Project id  	
			               	      var testPassList = projectItems[i]['testPassList'] == null || projectItems[i]['testPassList'] == undefined ? "Default " + UATReport.gConfigTestPass: 											projectItems[i]['testPassList'];				
			               	      UATReport.gTestPassList[projectItems[i]['projectId']] = new Array();
			               	      UATReport.gTestPassList[projectItems[i]['projectId']] .push({
			               	      
				               	      "ProjectName":projectItems[i]['projectName'],
				               	      "TestPassList":testPassList 			               	      
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
		               	      		//To set Version list by Project name  	
	                                var version = projectItems[i]['projectVersion'] == null || projectItems[i]['projectVersion'] == undefined ? "Default " + UATReport.gConfigVersion : projectItems[i]['projectVersion'];//Added by Mohini for Resource file                                 
							  		UATReport.getVerByProjName[projectItems[i]['projectName']] .push({
			               	      
				               	      	"Version":version,
				               	  		"ProjectID":projectItems[i]['projectId']
			               	      });
			               	      
			               	       //To set Testpass list by Project id  		
			               	      var testPassList = projectItems[i]['testPassList'] == null || projectItems[i]['testPassList'] == undefined ? "Default " + UATReport.gConfigTestPass: 											projectItems[i]['testPassList'];
			               	      UATReport.gTestPassList[projectItems[i]['projectId']] = new Array();
			               	      UATReport.gTestPassList[projectItems[i]['projectId']] .push({
			               	      
				               	      "ProjectName":projectItems[i]['projectName'],
				               	      "TestPassList":testPassList 			               	      
			               	      });
			               	   }
						  }
						  UATReport.forPIDGetDetails[projectID] = projectItems[i]; 
		            }
				}
				else
					window.location.href=Main.getSiteUrl()+"/SitePages/Dashboard.aspx";
					
           /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         }catch(e){}
  },
  // get All Scenarios for drop down
  getScenarios:function(selected){
 
          try{   
            var temp = '';
            var ScenarioName = '';
            var ScenarioDD = new Array();
            
            //Get testpass by project id
			var ScenarioItems=UATReport.gTestPassList[selected];
			if(ScenarioItems!= undefined && ScenarioItems!= null)
	        {
	           	  for(var i=0;i<ScenarioItems[0]['TestPassList'].length;i++)
	   			  {
	   			  	 ScenarioID = ScenarioItems[0]['TestPassList'][i].testpassId;
	                 ScenarioName = ScenarioItems[0]['TestPassList'][i].testpassName;
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
					UATReport.forTPIDGetDetails[ScenarioItems[0]['TestPassList'][i].testpassId] = ScenarioItems[0]['TestPassList'][i];
					
					//To collect tester with their role by testPassId
					UATReport.gTesterRoleList[ScenarioID] = new Array();
			               	      UATReport.gTesterRoleList[ScenarioID].push({
			               	      
				               	      "testpassId":ScenarioItems[0]['TestPassList'][i].testpassId,
				               	      "testpassName":ScenarioItems[0]['TestPassList'][i].testpassName,
									  "tester":ScenarioItems[0]['TestPassList'][i].tester			               	      
			               	      });			     
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
            var TesterItems=new Array(); 
            var testerIDArr = new Array();//:SD
            var roleIDArr = new Array();//:SD
            
            var gTesterList=new Array();//Added by rasika
                      
            	/* //Collect tester and their roles of all the test passes present in drop-down
                  $('#scenSelect option').each(function (ind, itm)
			      {
			      	   var value = itm.value;
			      	   if(UATReport.gTesterRoleList[value]!=undefined)
			      	   {
			      	   		gTesterList.push(UATReport.gTesterRoleList[value]);
			      	   }
			      	   
			      }); */
			      
	         /*if(selected!='0' && selected!=0)
			 {
				//Collect tester and their roles for the selected test passes 
				if(UATReport.gTesterRoleList[selected]!=undefined)
		      	{
		      	   	gTesterList.push(UATReport.gTesterRoleList[selected]);
		      	}
	
			 }
			 else
			 {
				//Collect tester and their roles for all the test passes present in drop-down
				$('#scenSelect option').each(function (ind, itm)
	        	{
			      	   var value = itm.value;
			      	   if(UATReport.gTesterRoleList[value]!=undefined)
			      	   {
			      	   		gTesterList.push(UATReport.gTesterRoleList[value]);
			      	   }
	      	   
	        	});
	         }

			      
		      if(gTesterList.length!=0)
		      {
		      		//To collect tester list for selected test pass
		      		if(selected!='0' && selected!=0)
		            {
		            	var count=0;				 
		            	if(gTesterList[0][0]['testpassId']==selected)
		            	{
		            		for(var j=0;j<gTesterList[0][0]['tester'].length;j++)
		            		{
		            			TesterItems[count]=gTesterList[0][0]['tester'][j];
		            			count++;
	
		            		}
		            	}
			        }
			        else
			        {
			        	var count=0;
				        for(var i=0;i<gTesterList.length;i++)
			            {	 	
			            		for(var j=0;j<gTesterList[i][0]['tester'].length;j++)
			            		{
			            			TesterItems[count]=gTesterList[i][0]['tester'][j];
			            			count++;				            		
			            		}			           
			            }			        
			        }
		      }*/
		      
		      	if(selected!='0' && selected!=0)
				{
					//Collect tester and their roles of the selected test passes 
					if(UATReport.gTesterRoleList[selected]!=undefined)
			      	{		      	   	
			      	   	var count=0;
				      	for(var j=0;j<UATReport.gTesterRoleList[selected][0]['tester'].length;j++)
	            		{
	            			TesterItems[count]=UATReport.gTesterRoleList[selected][0]['tester'][j];
	            			count++;
	            		}
			      	}
	
				}
				else
				{
					var count=0;
					//Collect tester and their roles of all the test passes present in drop-down
					$('#scenSelect option').each(function (ind, itm)
		        	{
				      	   var value = itm.value;
				      	   if(UATReport.gTesterRoleList[value]!=undefined)
				      	   {			      	   					      	   		
					      		for(var j=0;j<UATReport.gTesterRoleList[value][0]['tester'].length;j++)
			            		{
			            			TesterItems[count]=UATReport.gTesterRoleList[value][0]['tester'][j];
			            			count++;
			            		}
				      	   }
		      	   
		        	});
				}

  					
								
	            //if((TesterItems != undefined) && (TesterItems != null))
	            if(TesterItems.length!=0)
	            {              
	                var flag =0;
					var count =0;
					
					temp = '<option value="'+0+'">All '+UATReport.gConfigTester+'</option>';//Added By Mohini for Resource File
					TesterDD.push(temp);
					
					$("#roleList").empty();//:SD
					$("#roleList").append('<option value="0">All '+UATReport.gConfigRole+'</option>');//:SD
													
					UATReport.rolesForSPUserID.length = 0;
					
					for(var ii=0;ii<TesterItems.length;ii++)
					{						
						TesterID = TesterItems[ii]['spUserId'];
	                    TesterName = TesterItems[ii]['testerName'];
	                    
	                    //To get unique testers:SD
	                    if($.inArray(TesterID,testerIDArr)==-1)
	                    {
	                    	testerIDArr.push(TesterID);
	                    	temp = '<option value="'+TesterID+'">'+TesterName+'</option>';
							TesterDD.push(temp);
	                    }
	                    
	                    //To collect RoleIDs and RoleNames of testers	                    
	                    for(var i=0;i<TesterItems[ii]['roleList'].length;i++)
	                    {
	                    	if($.inArray(TesterItems[ii]['roleList'][i]['roleId'],roleIDArr) == -1)
							{
								roleIDArr.push(TesterItems[ii]['roleList'][i]['roleId']);
								if(parseInt(TesterItems[ii]['roleList'][i]['roleId'])== 1)
							    {
							    	var roleTemp = '<option title="Standard" value="1">Standard</option>';
						        	$("#roleList").append(roleTemp);
						        	UATReport.RoleNameForRoleID[parseInt(TesterItems[ii]['roleList'][i]['roleId'])]="Standard";
							    }
							    else
							    {
							    	 temp = '<option title="'+TesterItems[ii]['roleList'][i]['roleName']+'" value="'+TesterItems[ii]['roleList'][i]['roleId']+'">'+trimText(TesterItems[ii]['roleList'][i]['roleName'],16)+'</option>';
					        	 $("#roleList").append(temp);
					        	 
					        	 UATReport.RoleNameForRoleID[parseInt(TesterItems[ii]['roleList'][i]['roleId'])]= TesterItems[ii]['roleList'][i]['roleName'];

							    }
							 }
							 
							if(UATReport.rolesForSPUserID[TesterID] == undefined)
	                    		UATReport.rolesForSPUserID[TesterID] = parseInt(TesterItems[ii]['roleList'][i]['roleId']);
	                        else
	                    		UATReport.rolesForSPUserID[TesterID] += "," + parseInt(TesterItems[ii]['roleList'][i]['roleId']); 	
	                    }	                    	
	                }					    
	             }  
	             else
	             {
	             	temp = '<option value="'+0+'">No '+UATReport.gConfigTester+' Alloted</option>';//Added By Mohini for Resource File
					TesterDD.push(temp);
					$("#roleList").empty();//:SD
					$("#roleList").append('<option value="0">No '+UATReport.gConfigRole+'</option>');//:SD

	             }            
		 return TesterDD;
         }catch(e){}
      },
 // get Content of Scenario Test Cases and Action     
 forPIDGetResult:new Array(),
 getScenariosDeatils:function(getTestPass)
 {
  	//try
  	{ 	  
   	    var temp='';
        var testinfo=new Array();
	    // get & fill test pass information
	    var ScenarioItems = new Array(); 
	    var tpResult = new Array();
	    var uniqueTestPass= new Array();//added by Rasika
        var due='';
        var obj = new Array();
        var testStepList = new Array();//added by Rasika
        var totalPass=0;
        var totalFail=0;
        var totalNC=0;
        
        if(UATReport.forPIDGetResult[$('#versionSelect option:selected').val()] == undefined)
	    {
	        var param = $('#versionSelect option:selected').val()+"/"+_spUserId;
	        var result=ServiceLayer.GetData("GetReportData",param);
	        UATReport.forPIDGetResult[$('#versionSelect option:selected').val()] = result;
		}
		else
			var result = UATReport.forPIDGetResult[$('#versionSelect option:selected').val()];
			
		///////////////////////  Added by Harshal  /////////////////////////////
		temp+='<table class="gridDetails" cellspacing="0" style="word-wrap:break-word;"><thead>'
                    +'<tr>'
                        +'<td class="tblhd center" style="width:5%">#</td>'
                        +'<td class="tblhd" style="width:17%">Test Pass Name</td>'
                        +'<td class="tblhd" style="width:24%">Description</td>'
                        +'<td class="tblhd" style="width:15%">Test Manager</td>'
                        +'<td class="tblhd" style="width:7%">Due Date</td>'
                        +'<td class="tblhd center" style="width:9%">Passed Test Steps</td>'
                        +'<td class="tblhd center" style="width:9%">Failed Test Steps</td>'
                        +'<td class="tblhd center" style="width:14%">Not Completed Test Steps</td>'
                    +'</tr>'
             +'</thead><tbody>';  

		var forTPIdgetStatus = new Array();
		var resultTP = [];
		var testPassIds = new Array();
		if(result != undefined && result != '')
		{
			var flag = 0;
			var testinfo2 = '';
			resultTP = result;
			///////////////
			if(getTestPass==0 && $('#tester').val()==0 && $("#status option:selected").text() == "All" && $('#roleList').val()==0)
			{
				for(var i=0;i<result.length;i++)
				{
					var arr = result[i]['listRptTesterRoleStatus'];
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j]['status'] != '' && arr[j]['status'] != undefined)
						{
							testinfo2 = '';
	                    	var ExpectedResult= '';
	                     	if(result[i]['expectedResult']!=undefined && result[i]['expectedResult']!="")
	                     		ExpectedResult= UATReport.GetFormatedText(result[i]['expectedResult'],'false');
	                     	else
	                     		ExpectedResult = '-';
	                     			
	                     	if(arr[j]['actualResult'] != undefined && arr[j]['actualResult']!="")
	                     		var ActualResult= UATReport.GetFormatedText(arr[j]['actualResult'],'false');
	                     	else
	                     		var ActualResult= '-';	
	                     	
	                     	if(result[i]['testStepName'] != undefined && result[i]['testStepName'] != "")
	                     		var ActionName= UATReport.GetFormatedText(result[i]['testStepName'],'false');
							else
								var ActionName='-';
												
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
	
	                       testinfo2 = testinfo2+'<tr><td class="center">'+arr[j]['teststepPlanId']+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+result[i]['testCaseName']+'" style="overflow:hidden">'+result[i]['testCaseName']+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+ActionName1+'" style="overflow:hidden">'+ActionName+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+arr[j]['roleName']+'">'+arr[j]['roleName']+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+ExpectedResult1+'" style="overflow:hidden">'+ExpectedResult+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+ActualResult1+'" style="overflow:hidden">'+ActualResult+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+result[i]['testerName']+'">'+ result[i]['testerName']+'</td>';
	                       
	                       var pstatus='';
	         				if(arr[j]['status']=='Pending')							
							{
								pstatus='Not Completed';
								 testinfo2 = testinfo2+'<td>'+pstatus+'</td></tr>';
							}
							else
							{
								 testinfo2 = testinfo2+'<td>'+arr[j]['status']+'</td></tr>';
							}
	                       
	                       testinfo.push(testinfo2);
	                       
	                        switch(arr[j]['status'])
							{
								case 'Pass':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "1,0,0";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = (parseInt(status[0])+1)+","+status[1]+","+status[2];
											}	
											break;
								case 'Fail':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "0,1,0";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = status[0]+","+(parseInt(status[1])+1)+","+status[2];
											}	
											break;
								case 'Not Completed':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "0,0,1";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = status[0]+","+status[1]+","+(parseInt(status[2])+1);
											}	
											break;
											
								/////////////Added by Mangesh//////////////////////////
								case 'Pending':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "0,0,1";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = status[0]+","+status[1]+","+(parseInt(status[2])+1);
											}	
											break;

								////////////////////////////////////////////////////
							} 
						}
					}
				}
			}
			else if(getTestPass !=0 && $('#tester').val() != 0)
			{
				var s = JSLINQ(result).Where(function(item){return item.testPassId == getTestPass && item.testerId == $('#tester').val()});
				result = s.items;
				flag = 1;
			}else if(getTestPass !=0)
			{
				var s = JSLINQ(result).Where(function(item){return item.testPassId == getTestPass});
				result = s.items;
				flag = 1;
			}
			else if($('#tester').val()!= 0)
			{
				var s = JSLINQ(result).Where(function(item){return item.testerId == $('#tester').val()});
				result = s.items;
				flag = 1;
			}
			else if(getTestPass==0 && $('#tester').val()== 0 && $('#roleList').val() != 0)
			{
				result = resultTP ;
				flag = 1;
			}
			else if(getTestPass==0 && $('#tester').val()== 0 && $('#roleList').val() == 0 && $("#status option:selected").text() != "All")
			{
				result = resultTP ;
				flag = 1;
			}
			
			/////////////
			var status = '';
			if(flag == 1 && result != undefined)
			{
				status = $("#status option:selected").text();
				for(var i=0;i<result.length;i++)
				{
					var arr=new Array();
					arr = result[i]['listRptTesterRoleStatus'];
						
					/*if($('#roleList').val() != 0 && $("#status option:selected").text() != 'All')
					{
							var s = JSLINQ(arr).Where(function(item){return item.roleId == $('#roleList').val() && item.status == $("#status option:selected").text()});
							arr = s.items;		
					}
					else*/ if($('#roleList').val() != 0)
					{
						var s = JSLINQ(arr).Where(function(item){return item.roleId == $('#roleList').val()});
						arr = s.items;
					}	
					/*else if($("#status option:selected").text() != 'All')
					{
						var s = JSLINQ(arr).Where(function(item){return item.status == $("#status option:selected").text()});
						arr = s.items;
						
							
					}
					if( arr[0]['status']=='')
							continue;	*/			

					for(var j=0;j<arr.length;j++)
					{
						var pstatus='';
						if(arr[j]['status']=='Pending')							
						{
							pstatus='Not Completed';
						}
						
						if(($("#status option:selected").text()=='All' || $("#status option:selected").text() == arr[j]['status']  || $("#status option:selected").text()==pstatus ) && (arr[j]['status'] != '' && arr[j]['status'] != undefined))
						{
							testPassIds.push(result[i]['testPassId']);
							testinfo2 = '';
	                    	var ExpectedResult= '';
	                     	if(result[i]['expectedResult']!=undefined && result[i]['expectedResult']!="")
	                     		ExpectedResult= UATReport.GetFormatedText(result[i]['expectedResult'],'false');
	                     	else
	                     		ExpectedResult = '-';
	                     			
	                     	if(arr[j]['actualResult'] != undefined && arr[j]['actualResult']!="")
	                     		var ActualResult= UATReport.GetFormatedText(arr[j]['actualResult'],'false');
	                     	else
	                     		var ActualResult= '-';	
	                     	
	                     	if(result[i]['testStepName'] != undefined && result[i]['testStepName'] != "")
	                     		var ActionName= UATReport.GetFormatedText(result[i]['testStepName'],'false');
							else
								var ActionName='-';
												
		                    //var completeActionName = UATReport.filterData(ActionName);
	                     	var completeActionName =ActionName.replace(/(\r\n)+/g, '');
                            if(ActionName.indexOf("<") != -1 && ActionName.indexOf(">") != -1)
                            	ActionName=completeActionName;
                            	
                            var completeExpectedResult = ExpectedResult.replace(/(\r\n)+/g, '');
                            if(ExpectedResult.indexOf("<") != -1 && ExpectedResult.indexOf(">") != -1)
                            	ExpectedResult=completeExpectedResult;

                            var completeActualResult = ActualResult.replace(/(\r\n)+/g, '');
                            if(ActualResult.indexOf("<") != -1 && ActualResult.indexOf(">") != -1)
                            	ActualResult=completeActualResult;
	                   
							var ActionName1 = UATReport.filterData(ActionName);
	                       ActionName1 = ActionName1.replace(/"/g, "&quot;");
	                       var ExpectedResult1 = UATReport.filterData(ExpectedResult);
	                       ExpectedResult1 = ExpectedResult1.replace(/"/g, "&quot;");
						   var ActualResult1 = UATReport.filterData(ActualResult);
	                       ActualResult1 = ActualResult1.replace(/"/g, "&quot;");

	                       testinfo2 = testinfo2+'<tr><td class="center">'+arr[j]['teststepPlanId']+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+result[i]['testCaseName']+'" style="overflow:hidden">'+result[i]['testCaseName']+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+ActionName1+'" style="overflow:hidden">'+ActionName+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+arr[j]['roleName']+'">'+arr[j]['roleName']+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+ExpectedResult1+'" style="overflow:hidden">'+ExpectedResult+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+ActualResult1+'" style="overflow:hidden">'+ActualResult+'</td>';
	                       testinfo2 = testinfo2+'<td title="'+result[i]['testerName']+'">'+ result[i]['testerName']+'</td>';
	                       
	                        if(arr[j]['status']=='Pending')							
							{
								pstatus='Not Completed';
								 testinfo2 = testinfo2+'<td>'+pstatus+'</td></tr>';
							}
							else
							{
								 testinfo2 = testinfo2+'<td>'+arr[j]['status']+'</td></tr>';
							}
	                       
	                       testinfo.push(testinfo2);
	                       
	                        switch(arr[j]['status'])
							{
								case 'Pass':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "1,0,0";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = (parseInt(status[0])+1)+","+status[1]+","+status[2];
											}	
											break;
								case 'Fail':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "0,1,0";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = status[0]+","+(parseInt(status[1])+1)+","+status[2];
											}	
											break;
								case 'Not Completed':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "0,0,1";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = status[0]+","+status[1]+","+(parseInt(status[2])+1);
											}	
											break;
											
								/////////////Added by Mangesh//////////////////////////
								case 'Pending':
											if(forTPIdgetStatus[result[i]['testPassId']] == undefined)
												forTPIdgetStatus[result[i]['testPassId']] = "0,0,1";
											else
											{
												var status = forTPIdgetStatus[result[i]['testPassId']].split(",");
												forTPIdgetStatus[result[i]['testPassId']] = status[0]+","+status[1]+","+(parseInt(status[2])+1);
											}	
											break;

								////////////////////////////////////////////////////
							} 
							

						}
							
							
					}
				}
			}
		}		
		////
		
		var tpIds = [];
		$("#scenSelect option").each(function()
		{
			if(getTestPass != 0)
			{
				tpIds.push(getTestPass);
				return false;
			}
			else if(($.inArray($(this).val(),testPassIds) != -1 && flag == 1) || flag == 0)
				tpIds.push($(this).val());
			
		});
		for(var m=0;m<tpIds.length;m++)
		{
			var s = JSLINQ(resultTP).Where(function(item){return item.testPassId == tpIds[m]});
			result = s.items;
			if(result.length != 0)
			{
				if(result[0]['description']!=null&&result[0]['description']!=undefined&&result[0]['description']!='')
		              	var description=result[0]['description'];
	            else
	              	var description='-';	
	            temp+='<tr style="width:1220px"><td class="center" style="width:5%">'+result[0]['testPassId']+'</td>';
	            temp+='<td  style="width:17%">'+result[0]['testPassName']+'</td>';  
	            temp+='<td style="width:24%">'+UATReport.replaceSplCharacters2(description)+'</td>';
	            temp+='<td style="width:15%">'+result[0]['testMgrName']+'</td>';
	            due = result[0]['dueDate']
	            var crd =  due.slice(0,10);
	            var dd = crd.split('-');
	            due = dd[0]+'-'+dd[1]+'-'+dd[2];
              
                temp+='<td style="width:7%">'+due+'</td>';
				
				if(forTPIdgetStatus[result[0].testPassId] != undefined)
				{
					var status = forTPIdgetStatus[result[0].testPassId].split(",");
					temp+='<td style="width:9%" class="center">'+status[0]+'</td>';
			        temp+='<td style="width:9%" class="center">'+status[1]+'</td>';
			        temp+='<td style="width:14%" class="center">'+status[2]+'</td></tr>';
			    }
			    else
			    {
			    	temp+='<td style="width:9%" class="center">0</td>';
			        temp+='<td style="width:9%" class="center">0</td>';
			        temp+='<td style="width:14%" class="center">0</td></tr>';
			    } 
			    
			    this.ScenarioInfo = temp+"</tbody></table>";

			}

		}
		//////////////////////////////////////////////////////        
     return testinfo;
   }
   //catch(e){}
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
		//$('#scrollbar1').show();
		$('#dvProjectDetails').show();
	 	
		$(".proj-desc").show();
		$('#tesctCaseDiv').show();
		$('#thisScenario').empty();//Clean Discription area
		//$('#scenario').empty();//Clean Test Cases Grid
		$("#Pagination").hide();
		$("#testStepDetails").empty();

	 	/************ Code to Fill The Test Pass Names in the Grid **************/ 	
	    
	    var tpID= $('#scenSelect option:selected').val();
	    //var testerID= $('#tester option:selected').val();
	    var statusTS= $("#status option:selected").text();	
						
		UATReport.ScenarioInfo = "";
		UATReport.onLoadgss = [];
		UATReport.onLoadgss = UATReport.getScenariosDeatils(tpID);
		//Ankita 19/7/2012 : to solve Bug ID 983
		if(UATReport.ScenarioInfo=="" || UATReport.ScenarioInfo==undefined)
		{
			if($("#scenSelect").text() == "No Test Pass Available")
				$('#thisScenario').html('<span style="color:red;font-weight:bold">There are no '+UATReport.gConfigTestPass+'es!</span>');//Added By Mohini for Resource File
			else
				$('#thisScenario').html('<span style="color:red;font-weight:bold">There is no data available with the above criteria!</span>');	
			$("#hTestCase").hide();
			$("#testStepDetails").hide();
		}	
		else
		{
			$('#thisScenario').html(UATReport.ScenarioInfo);
			$("#hTestCase").show();
			$("#testStepDetails").show();
		}
			
		resource.UpdateTableHeaderText();//Added by Mohini for Resource file 
		
		if(UATReport.onLoadgss=="" || UATReport.onLoadgss.length==0)
		{
	    	$('#testStepDetails').html('<span style="color:red;font-weight:bold">There are no '+UATReport.gConfigTestStep+'s!</span>');//Added By Mohini for Resource File
		}
		else
		{
			UATReport.pagination();
		}	
		
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
		
},
pagination:function ()
{
	var len = UATReport.onLoadgss.length;
	 
	$("#Pagination").pagination(len,{
	    callback:UATReport.initpage,
	    items_per_page:10, 
	    num_display_entries:10,
	    num:2,
	    current_page:UATReport.gPageIndex
	});
},
initpage:function(page_index, jq)
{
	var items_per_page = 10;
    var max_elem = Math.min((page_index+1)*items_per_page,UATReport.onLoadgss.length);
    var testinfo = '';
    testinfo = testinfo+'<table style="table-layout:fixed;word-wrap:break-word;" class="gridDetails" cellspacing="0"><thead><tr>';
 	testinfo = testinfo+'<td class="tblhd-b center" style="width:4%">#</td>';
 	testinfo = testinfo+'<td class="tblhd-b" style="width:12%">Test Case Name</td>';
 	testinfo = testinfo+'<td class="tblhd-b" style="width:21%">Test Action / Steps</td>';
 	testinfo = testinfo+'<td class="tblhd-b" style="width:7%">Role</td>';
 	testinfo = testinfo+'<td class="tblhd-b" style="width:20%">Expected Result</td>';
 	testinfo = testinfo+'<td class="tblhd-b" style="width:18%">Actual Result</td>';
 	testinfo = testinfo+'<td class="tblhd-b" style="width:12%">Tester</td>';
 	testinfo = testinfo+' <td class="tblhd-b" style="width:6%">Status</td>';
 	testinfo = testinfo+'</tr></thead><tbody >';
    for(var i=page_index*items_per_page;i<max_elem;i++)
    {
        testinfo=testinfo+UATReport.onLoadgss[i];
    } 
    testinfo = testinfo+'</tbody></table>';
    $('#testStepDetails').empty().html(testinfo);
    $("#Pagination").show();
    
    $('.gridDetails').find('tr').each(function(i,v){
		$(v).find('td:eq(5)').find('img').attr('height','200');
		$(v).find('td:eq(5)').find('img').attr('width','235');
		$(v).find('td:eq(5)').find('img').css('height','200px').css('width','235px');
		$(v).find('td:eq(4)').find('img').attr('height','200');
		$(v).find('td:eq(4)').find('img').attr('width','235');
		$(v).find('td:eq(4)').find('img').css('height','200px').css('width','235px');
		
		$(v).find('td:eq(2)').find('table').css('width','250px');
		$(v).find('td:eq(4)').find('table').css('width','235px');
		$(v).find('td:eq(5)').find('table').css('width','235px');
	});

	return false;
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
			 var exportData='';
			 var loginSpUserId=_spUserId;
			 if( (selected != '' || selected != undefined) && (loginSpUserId != '' || loginSpUserId != undefined)  )
			 {							
			 	exportData ="Parameters?projectId="+selected+"&loginSpUserId="+loginSpUserId;
			 	if($('#scenSelect option:selected').val()!=0)
			 		exportData +="&testPassId="+$('#scenSelect option:selected').val();
			 	
				if($('#tester option:selected').val()!=0)		 	
			 		exportData +="&testerSpUserId="+$('#tester option:selected').val();
			 	
				if($('#roleList option:selected').val()!=0)	
					exportData +="&roleId="+$('#roleList option:selected').val();
					
				if($('#status option:selected').val()!=0)
			 		exportData +="&statusId="+$('#status option:selected').val();					

		}			 
			 var result=ServiceLayer.GenerateReport("ExportReport",exportData);			 
	    
	  }  
	  catch(e)
	  {	  	
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