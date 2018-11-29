/* ------------------------------------------------------------------------------------------*
*                         RGen Software Solutions (I) Pvt. Ltd.                              *
*                     Copyright ©2016 - 2017 - All Rights reserved                           *
*                                                                                            *
*                                                                                            *
*            Copyright © 2016 - 2017 by RGen Software Solutions | www.rgensoft.com/          *
*            All rights reserved. No part of this publication may be reproduced,             *
*            stored in a retrieval system or transmitted, in any form or by any              *
*            means, photocopying, recording or otherwise, without prior written              *
*            consent of  RGen Software Solutions (I) Pvt. Ltd.                               *
*                                                                                            *
*                                                                                            *
* -------------------------------------------------------------------------------------------*/
$.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
});
var teststep={
	
	//For data from WCF
	dataCollection:new Array(),
	TestCaseNameArrForTCID:new Array(),
	onlyTestCasewithTestSteps:-1,
	TestStepArrIndexMap:new Array(),
	testStepsCountInSelectedTP:0,
	lastSequenceWithinTP:-1,
	testingType:0,
	
	SiteURL:Main.getSiteUrl(),
	startIndexA:0,
	EiForAction:0,
	TestStepIDFromEditTestStep:"",
	gTestStepList:"",
	roleLength:0,
	searchKey:'',
	teststatus:'',
	result:new Array(),
	//below buffer to keep data for showing during next/previous paging
	testStepIdsGlbl2:new Array(),
	AllRolesCollection:new Array(),
	
	//below flag is set in multiSelectDDL.js when select all
	flagSelectAll:0,
	//below buffer to keep select all data
	testStepIdsGlblSelectAll:new Array(),
	testCaseIdFrmCookie:new Array(),
	roleIdFrmCookie:new Array(),
	flagForSaveMessage:true,
	flagForSaveMessage1:true,
	TestPassNameBasedOnTestPassID:new Array(),
	TestPassWithNoRolesOfTestStep:new Array(),
	RoleNameBasedOnRoleID:new Array(),
	roleNotSaved:new Array(),
	testCasesInEditMode:new Array(),
	testCasesToBeRemoved:false,
	TestCasesOfRemovedRoles:new Array(),
	positionStored:false,
	sBulleteChar:'Ø,v,ü,§',   //Added by Nikhil
	TestPassStatus:new Array(),
	RolesForTestStepEdit:new Array(),
	//Added by HRW on 18 july
	testCaseNameForTCID:new Array(),
	flagForTC:false,
	attachmentResultForTestStepID:new Array(),
	allTestCaseIDsOfTP:new Array(),
	ParentResultForSave:new Array(),
	addedRoles:new Array(),
	ExpectedResult:"", //shilpa 7 may
	//choiceForTPID:new Array(),
	choiceForTPID:'0',
	sequenceForTPID:'0',
	
	projectId:'',
	testPassId:'',
	projectName:'',
	testPassName:'',
	countVal:'',
	delFlag:0,
	/**************Added by Mohini for resource file**************/
	gCongfigRole:"Role",
	gCongfigRoles:"Role(s)",
	gConfigTestPass:"Test Pass",
	gConfigTester:"Tester",
	gConfigProject:"Project",
	gConfigTestStep:"Test Step",
	gConfigTestCase:"Test Case",
	gConfigExpectedResult:"Expected Result",
	gConfigStatus:"Status",
	gConfigAttachment:"Attachment",
	glablValOfExpectedResult:'',
	gConfigVersion:"Version",
	gConfigGroup:'Group',
	gConfigPortfolio:'Portfolio',

	
	allTestCaseIDsWithinSelectedTestPass : new Array(),//Added by Rajiv on 10 August to resolve 2165 in an optimized way
	allteststepsdata:new Array(),
	arrTestSteps:new Array(),
	
	noprjFlag:0,
	noTPFlag:0,
	noTestrFlag:0,
	noTCFlag:0,

onPageLoad:function()
{      
	Main.showLoading();
	
	$('.navTabs h2:eq(0)').click(function () {
	    
			// Added for DD
			createDD.editMode = 0
			createDD.showDD();

			teststep.delFlag = 1;
			$('#impExpTemplate').hide();
			$('#ActionCount').show();
			$('#testStepGrid').show();
			$('#testStepinput').hide();
			$('#countDiv').show();
			$('.navTabs h2').css('color','#7F7F7F');
			$(this).css('color','#000000');
			$('#Pagination').show();
			$('#btnDelete').show();
			teststep.pagination();
			//$('#countDiv').show();
			teststep.clearFields();
			$('.navTabs h2:eq(3)').hide();
		});
		
		$('.navTabs h2:eq(1)').click(function(){
			// Added for DD
			createDD.editMode = 0;
			createDD.showDD();
			
			//Initialize all the flags
			teststep.noprjFlag = 0;
			
			teststep.noTPFlag = 0;
			
			teststep.noTestrFlag = 0;
			
			teststep.noTCFlag = 0;
			
		
		/****************Added by  Mohini on 12-19-2013****************/
		    if(show.testPassId == '')
		    {
		       if(show.projectId == '')//for bug id 11699
		       {
		           teststep.alertBox2("Sorry! No "+teststep.gConfigProject.toLowerCase()+" is available for selected "+teststep.gConfigPortfolio.toLowerCase()+" !<br/>Please create the "+teststep.gConfigProject.toLowerCase()+" First.");//Added by Mohini for Resource file
                   teststep.noprjFlag=1;
               }
               else
               {
			       teststep.alertBox2("Sorry! No "+teststep.gConfigTestPass.toLowerCase()+" is available for selected "+teststep.gConfigProject.toLowerCase()+" '"+$('#projectTitle label').attr('title')+"'!<br/>Please create the "+teststep.gConfigTestPass.toLowerCase()+" First.");//Added by Mohini for Resource file
			       teststep.noTPFlag=1;
			   }
			}
			else if($("#testCaseName div div li").text() == "")
			{
		        
		        //To check for the Tester present or not
		        var isTesterPresent = 0;
		        $.each( teststep.roles,function(ind,itm){
			
					if(itm.isTestersAssigned == 1)
					{
						isTesterPresent = 1;
					}
			
				});

		        
		        if(isTesterPresent == 0 )
		        {
		            teststep.alertBox2("Sorry! No "+teststep.gConfigTester+" is available for selected "+teststep.gConfigTestPass+"!<br/>Please create the "+teststep.gConfigTester+" First.");//Added by Mohini for Resource file
                    teststep.noTestrFlag=1;
                }
                else
                {
                    teststep.alertBox2("Sorry! No "+teststep.gConfigTestCase+" is available for selected "+teststep.gConfigTestPass+"!<br/>Please create the "+teststep.gConfigTestCase+" First.");//Added by Mohini for Resource file
                    teststep.noTCFlag=1;
                }
            }

		    $('#impExpTemplate').hide();
			$('#ActionCount').hide();
			$('#testStepGrid').hide();
			$('#countDiv').hide();
			$('#testStepinput').show();
			$('.navTabs h2').css('color','#7F7F7F');
			$(this).css('color','#000000');
			$('#Pagination').hide();
			$('#btnDelete').hide();
			teststep.clearFields();
			$('.navTabs h2:eq(3)').hide();
			$('#noTP').hide();
			
			////////Added by Mangesh to uncheck testcase and role checkboxes on clicking on create link after edit
			multiSelectList.selectNone("testCaseName");

			multiSelectList.selectNone("role");
			////////////////////////////////////////////////////
			
		});
		
		$('.navTabs h2:eq(2)').click(function(){
			// Added for DD
			createDD.editMode = 0;
			
			createDD.showDD();
			
			//Initialize all the flags
			teststep.noprjFlag = 0;
			
			teststep.noTPFlag = 0;
			
			teststep.noTestrFlag = 0;
			
			teststep.noTCFlag = 0;

		
		/****************Added by  Mohini on 12-19-2013****************/
		    if(show.testPassId == '')
		    {
		       if(show.projectId == '')//for bug id 11699
		       {
		           teststep.alertBox2("Sorry! No "+teststep.gConfigProject.toLowerCase()+" is available for selected "+teststep.gConfigPortfolio.toLowerCase()+" !<br/>Please create the "+teststep.gConfigProject.toLowerCase()+" First.");//Added by Mohini for Resource file
                   teststep.noprjFlag=1;
               }
               else
               {
			       teststep.alertBox2("Sorry! No "+teststep.gConfigTestPass.toLowerCase()+" is available for selected "+teststep.gConfigProject.toLowerCase()+" '"+$('#projectTitle label').attr('title')+"'!<br/>Please create the "+teststep.gConfigTestPass.toLowerCase()+" First.");//Added by Mohini for Resource file
			       teststep.noTPFlag=1;
			   }
			}
			else if($("#testCaseName div div li").text() == "")
			{
		        //var query = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+show.testPassId+'</Value></Eq></Where><ViewFields><FieldRef Name="TesterName"/></ViewFields></Query>';
		        //var Result = teststep.dmlOperation(query,'Tester');
		        
		        //To check for the Tester present or not
		        var isTesterPresent = 0;
		        $.each( teststep.roles,function(ind,itm){
			
					if(itm.isTestersAssigned == 1)
					{
						isTesterPresent = 1;
					}
			
				});

		        
		        if(isTesterPresent  == 0)
		        {
		            teststep.alertBox2("Sorry! No "+teststep.gConfigTester+" is available for selected "+teststep.gConfigTestPass+"!<br/>Please create the "+teststep.gConfigTester+" First.");//Added by Mohini for Resource file
                    teststep.noTestrFlag=1;
                }
                else
                {
                    teststep.alertBox2("Sorry! No "+teststep.gConfigTestCase+" is available for selected "+teststep.gConfigTestPass+"!<br/>Please create the "+teststep.gConfigTestCase+" First.");//Added by Mohini for Resource file
                    teststep.noTCFlag=1;
                }
            }
            
			$('#impExpTemplate').show();
			$('#ActionCount').hide();
			$('#testStepGrid').hide();
			$('#countDiv').hide();
			$('#testStepinput').hide();
			$('.navTabs h2').css('color','#7F7F7F');
			$(this).css('color','#000000');
			$('#Pagination').hide();
			$('#btnDelete').hide();
			teststep.clearFields();
			$('.navTabs h2:eq(3)').hide();
			$('#noTP').hide();
		});
	
     //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014
		$("#groupHead label").html(teststep.gConfigGroup + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
	      $("#portfolioHead label").html(teststep.gConfigPortfolio+'<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
	      $("#projectHead label").html(teststep.gConfigProject+'<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
	      $("#versionHead label").html(teststep.gConfigVersion+'<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
		  $("#TestPassHead label").html(teststep.gConfigTestPass+'<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');

	   $('#impTestStep').html('Import '+teststep.gConfigTestStep+'(s)');
	   $('#expTestStep').html('Export '+teststep.gConfigTestStep+'(s)');
	   $('#selTestCase').attr('title','Please select single '+teststep.gConfigTestCase.toLowerCase()+' for '+teststep.gConfigTestStep.toLowerCase()+' sequence configuration.');
	   $('#assoTestcase').append('&nbsp;&nbsp;&nbsp;&nbsp;<img src="/images/drop-arrow.gif"/>');
	   teststep.glablValOfExpectedResult=$('#lblExpRes').text().substring(0,$('#lblExpRes').text().length-1);
	   $('#clipBrdImage').attr('title',teststep.glablValOfExpectedResult);
	   $('#paraStep').find('p:eq(0)').text('Please follow below steps to Import '+teststep.gConfigTestStep+'(s):');
	   $('#paraStep').find('p:eq(2)').html('&nbsp;&nbsp;2. Populate data of '+teststep.gConfigTestStep+'s as directed in template.');
	   $('#paraStep').find('p:eq(4)').html("&nbsp;&nbsp;4. Upload this saved template using Import '"+teststep.gConfigTestStep+'(s);');
	   $('#divExprt').html('Please click to export all the '+teststep.gConfigTestStep+'s within the '+teststep.gConfigTestPass+'.')
	   $('#noTP').html('No '+teststep.gConfigTestStep+'(s) Available.');
	/*************************************************************/
	
	
	multiSelectList.functionToInvoke1='teststep.delFlag = 0;teststep.pagination(this);';
	
	show.showData('teststep');
	$('.rgTableBread').show();
	isPortfolioOn = true;
    if(isPortfolioOn) 
    {
    	$(".prjHead").hide();
		$(".tpHead").hide();
    	createDD.create();
    	$('#impexpTS').attr('title','To import the '+teststep.gConfigTestStep+'s using the standard excel Template. '+
                              'User can export all '+teststep.gConfigTestStep+'s of current '+teststep.gConfigTestPass+'.');//For Hover Over Text Added by Mohini
    }
    else
    {
        $(".prjHead").hide();
        $(".tpHead").hide();
        createDD.create();
        $('#impexpTS').attr('title', 'To import the ' + teststep.gConfigTestStep + 's using the standard excel Template. ' +
                              'User can export all ' + teststep.gConfigTestStep + 's of current ' + teststep.gConfigTestPass + '.');//For Hover Over Text Added by Mohini
    	//$('#impexpTS').attr('title','To import the '+teststep.gConfigTestStep+'s using the standard excel Template.');//For Hover Over Text Added by Mohini
    	//createDD.createWithoutPort();
    }
	
	/*****Logic for storing positions*****/
	if(!teststep.positionStored)
	{
	/*
		var obj = new Array();
		var result;
		var actionListName = jP.Lists.setSPObject(teststep.SiteURL,'Action');
		var query;
		query='<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+teststep.testPassId+'</Value></Eq></Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="position"/></ViewFields></Query>';
		result = teststep.dmlOperation(query,'Action');
		if(result!=undefined && result!=null)
			if(result[0]["position"]==undefined || result[0]["position"]==null || result[0]["position"]=='')
				for(var j=0;j< result.length;j++)
				{	
					obj.push({'ID':result[j]['ID'],
							  'position':(j)	
					});
					var result = actionListName.updateItem(obj);
				}
		teststep.positionStored=true;
		*/
	}
	
	/* to make img non-draggable */
     $('.pasteImage').mouseover(function(e){
			$(this).bind('dragstart', function(event) { event.preventDefault(); });	               
	  });
    /**/
    
   	window.setTimeout("Main.hideLoading()", 200);
},

showTestStep:function(sel)
{

	//<--Code to handle the case:if user trying to uncheck the Test Case which is the only Test Case
	//that contains Test Steps than dont allow to uncheck it |Ejaz Waquif DT:Dec/3/2014
	if ( sel != undefined && sel != -1 && sel != "swap" && sel != "delete")
	{
		if(teststep.onlyTestCasewithTestSteps == sel.id.split("_")[1] )
		{
			teststep.alertBox('Sorry! You can\'t uncheck this '+teststep.gConfigTestCase+' as among the selected '+teststep.gConfigTestCase+'s, this is the only '+teststep.gConfigTestCase+' which has '+teststep.gConfigTestStep+'s.');//Added by Mohini for Resource file
			$(sel).attr('checked','checked');
			return;
		}
	}
	//-->

	$('#testStepGrid table').show();
	
	
	teststep.arrTestSteps.length = 0;
	teststep.allTestCaseIDsWithinSelectedTestPass.length;
	teststep.testStepIdsGlbl2.length=0;
	
	var checkedTestCaseCount=0;
	flagAll=0;//flag for select all
	
	var id =new Array();	
	$("#assotestcases div div li").each(
		function()
		{
   			if($(this).children(".mslChk").attr('checked') == true)
			{
				id.push($(this).children(".mslChk").attr('Id').split("_")[1]);		
				checkedTestCaseCount = checkedTestCaseCount+1;			
			}
			teststep.allTestCaseIDsWithinSelectedTestPass.push($(this).children(".mslChk").attr('Id').split("_")[1]);//Added by Rajiv on 10 August to resolve 2165 in an optimized way
		});
	
		
		if(id.length !=0)
		{
		
				$('#noTP').hide();
				
				$('#Pagination').show();
				
				$('#testStepGrid').show();
				
				$('#countDiv').show();
				
				$('#btnDelete').show();
				
				//Code modified for WCF data | Ejaz Waquif DT:11/28/2014 
				var data = new Array();
				if(sel == "swap")
				{
					data = teststep.result;
				}
				else
				{
				    
				    var ts_datacollection = ServiceLayer.GetData("GetTestStepsByTestPassID/" + show.testPassId, "", "TestStep");
                    
				    for (var i = 0; i < ts_datacollection.length; i++) {
				        var ts_role = [];
				        ts_datacollection[i].testStepRoleCollection =  '<root>' + ts_datacollection[i].testStepRoleCollection + '</root>';
				        var count_ts = (ts_datacollection[i].testStepRoleCollection == null) ? 0 : $($.parseXML(ts_datacollection[i].testStepRoleCollection)).find('role>roleId').length;
				        for (var j = 0; j < count_ts; j++) {
				            ts_role.push({
				                "roleId": $($($.parseXML(ts_datacollection[i].testStepRoleCollection)).find('role>roleId')[j]).text(),
				                "roleName": $($($.parseXML(ts_datacollection[i].testStepRoleCollection)).find('role>roleName')[j]).text(),
				                "countOfTestStepPlanInStartDate": $($($.parseXML(ts_datacollection[i].testStepRoleCollection)).find('role>countOfTestStepPlanInStartDate')[j]).text(),
				                "countOfTestersAssigned": $($($.parseXML(ts_datacollection[i].testStepRoleCollection)).find('role>countOfTestersAssigned')[j]).text()
				            });
				        }
				        ts_datacollection[i].testStepRoleCollection = ts_role;
				        ts_datacollection[i].roleList = ts_role;
				    }

				    teststep.dataCollection = ts_datacollection;
					teststep.testStepsCountInSelectedTP = teststep.dataCollection.length;
					
					data = teststep.dataCollection;
					
			    	$("#chkbxSelectAll").attr("checked",false);

				}
				
				if( data == "" || data == null || data == undefined)
				{
					$('#noTP').show();
					
					$('#Pagination').hide();
					
					$('#testStepGrid').hide();
					
					$('#countDiv').hide();
					
					$('#btnDelete').hide();
					
					return;
				}
				
				//if(checkedTestCaseCount==1 && sel != "swap")
					//data = teststep.sortJSON(data,"testStepSequence","asc");
					
				var loopCounter = data.length;
				
				if( loopCounter != 0 )
				{
				
					var testCaseIdsThatContainsTestSteps = new Array();
					
					var stepSequence = 0;
					
					teststep.result = new Array();
					
					var lastSequenceArr = new Array();
					
					for(var i=0 ; i<loopCounter; i++)
					{
					
						if( $.inArray( data[i].testCaseId.toString(), id ) == -1 )
						{
							continue;
						}
						
						//<-- Code to handle the case:if user trying to uncheck the Test Case which is the only Test Case
						//that contains Test Steps than dont allow to uncheck it |Ejaz Waquif DT:Dec/3/2014 
						if( sel == undefined || sel == "delete")
						{
							if( $.inArray( data[i].testCaseId, testCaseIdsThatContainsTestSteps ) ==-1 )
							{
								testCaseIdsThatContainsTestSteps.push( data[i].testCaseId );
							}
						}
						//-->
						
						var table='';
						var completeTestCaseName = teststep.TestCaseNameArrForTCID[ data[i].testCaseId ];
																												
						if (data[i].erAttachmentName == null || data[i].erAttachmentName == "")
                            var attachimg = '&nbsp';	
						else
							var attachimg = '<img title="View Attachment Details" src="/images/icon-attachment.png" alt="Attachment"></img>';
																		
						expResult = ( data[i].expectedResult == undefined || data[i].expectedResult == "" ) ? '-' : data[i].expectedResult;
						
						var testStepName = data[i].testStepName;
						
						//Nikhil - 02/04/2012 - Added to handle Bullete Text
						actionName = teststep.GetFormatedText(testStepName,'false');		
									
						var completeActionName = teststep.filterData(actionName);
						
						//Added by HRW to show the data that contains "" in title
						completeActionName = completeActionName.replace(/"/g, "&quot;");
						completeTestCaseName = completeTestCaseName.replace(/"/g, "&quot;");
						
							
						completeActionName =completeActionName.replace(/(\r\n)+/g, '');
						if(actionName.indexOf("<") == -1 && actionName.indexOf(">") == -1)
							actionName=actionName;
						else
						   actionName=completeActionName;
						
						var completeExpectedResult = expResult.replace(/(\r\n)+/g, '');
		                if(expResult.indexOf("<") != -1 && expResult.indexOf(">") != -1)
		                	expResult=completeExpectedResult;
						
		               	
						var sequence = (parseInt(data[i].testStepSequence)+1).toString();
		
						table += '<tr><td style="padding-left:3px;"><input class="mslChk chkBoxTS" testStepId="'+data[i].testStepId+'"  type="checkbox"/></td><td style="text-align:center">'+(stepSequence+1)+'</td><td class="selTD">'+actionName.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</td><td>'+completeTestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</td>' +'<td>'+expResult+'</td>';
		
						if(attachimg == '&nbsp')
							table += '<td class="center"><span>N/A</span></td>';								 
						else								 
							table +='<td class="center"><span><a onclick="teststep.onClickAttaAnch('+data[i].testCaseId	+','+ data[i].testStepId+');" style="cursor:pointer;">'+attachimg+'</a></span></td>';
						
						if( (checkedTestCaseCount==1 && teststep.testingType == "0") || teststep.testingType == "1" )
						{
							table +='<td class="center"><span><a class="sequenceup"  onclick="Main.showLoading();setTimeout(\'teststep.swapUp('+stepSequence+')\',200);" style="cursor:pointer;"><img src="/images/Admin/Road-Forward.png" style="height:30px;width:25px" /></a><a title="Edit '+teststep.gConfigTestStep+' Details" onclick="Main.showLoading();setTimeout(\'teststep.editTestStep('+data[i].testStepId+')\',200);" style="cursor:pointer;"><img src="/images/Admin/Edit1.png" style="height:25px;width:25px;padding-right:3px" /></a><a class="sequencedown"  style="cursor:pointer;"  onclick="Main.showLoading();setTimeout(\'teststep.swapDown('+stepSequence+')\',200);"><img src="/images/Admin/Road-Backward.png" style="height:30px;width:25px" /></a></span></td>'+ 
							'</tr>';		
							//<a title="Delete '+teststep.gConfigTestStep+'"'+'  onclick="teststep.deleteTestStep('+data[i].testStepId+')" style="cursor:pointer;"><img src="../SiteAssets/images/Admin/Garbage1.png" style="height:25px;width:25px" /></a>				 									 
						}
						else
						{
							table +='<td class="center"><span><a title="Edit '+teststep.gConfigTestStep+' Details" onclick="Main.showLoading();setTimeout(\'teststep.editTestStep('+data[i].testStepId+')\',200);" style="cursor:pointer;" ><img src="/images/Admin/Edit1.png" style="height:25px;width:25px;padding-right:7px" /></a></span></td>'+ 
							'</tr>';	
							//<a title="Delete '+teststep.gConfigTestStep+'"'+'  onclick="teststep.deleteTestStep('+data[i].testStepId+')" style="cursor:pointer;"><img src="../SiteAssets/images/Admin/Garbage1.png" style="height:25px;width:25px" /></a>					 									 
						}
						
						teststep.arrTestSteps.push(table);
						
						stepSequence++;
						
						teststep.result.push(data[i]);
						
						if( sel == undefined )
						{
							teststep.TestStepArrIndexMap[data[i].testStepId] = new Array();
							
							teststep.TestStepArrIndexMap[data[i].testStepId] = i;
							
							lastSequenceArr.push( parseInt(data[i].testStepSequence) );
						}
						else if( sel == "delete" )
						{
							lastSequenceArr.push( parseInt(data[i].testStepSequence) );
						}

					}
					
					//<--Code to handle the case:if user trying to uncheck the Test Case which is the only Test Case
					//that contains Test Steps than dont allow to uncheck it |Ejaz Waquif DT:Dec/3/2014
					if( sel == undefined || sel == "delete") 
					{
						if(testCaseIdsThatContainsTestSteps.length > 1)
						{
							teststep.onlyTestCasewithTestSteps = 0;
						}
						else if(testCaseIdsThatContainsTestSteps.length == 1)
						{
							teststep.onlyTestCasewithTestSteps = testCaseIdsThatContainsTestSteps[0];
						}
						
						teststep.lastSequenceWithinTP = Math.max.apply(Math, lastSequenceArr);
					}
					//-->
					
				
				}
				
	}
	else
	{
		$('#noTP').show();
		$('#Pagination').hide();
		$('#testStepGrid').hide();
		$('#countDiv').hide();
		$('#btnDelete').hide();
	}
	
	return teststep.arrTestSteps;	
	
	Main.hideLoading();		 
},

clearFields:function()
{
		//teststep.startIndexA = 0;//Added for bug 5947
		$('#ulItemstestCaseName div').css('height','130px');
		teststep.flagForTC = false;	
		//DropDown.fillStatusTestDD('status');
		teststep.flagSelectAll=0;
		enableDesignMode("rte1",'', false);	
		$('#expectedResultWithImage').html('');
		$("iframe[name='rte1'").contents().bind("paste keyup", function(e) {
			$("iframe[name='rte1'").contents().find('body').find('a').mouseover(function(e){
			   $("iframe[name='rte1'").contents().find('body').attr('contentEditable','false');
			   $(this).attr('title',$(this)[0].href); 
			});
			$("iframe[name='rte1'").contents().find('body').find('a').mouseout(function(e){
			   $("iframe[name='rte1'").contents().find('body').attr('contentEditable','true'); 
			});
			$("iframe[name='rte1'").contents().find('body').find('a').each(function(){
				$(this).unbind('click');    
				$(this).click(function(){
					window.open($(this)[0].href,'_blank');
					return false;
				});
			});
		}); 
			 $("iframe[name='rte2'").contents().bind("paste keyup", function(e) {
				
			     $("iframe[name='rte2'").contents().find('body').find('a').mouseover(function(e){
		               $("iframe[name='rte2'").contents().find('body').attr('contentEditable','false');
		               $(this).attr('title',$(this)[0].href); 
				  });
	              $("iframe[name='rte2'").contents().find('body').find('a').mouseout(function(e){
			             	$("iframe[name='rte2'").contents().find('body').attr('contentEditable','true'); 
					  });
				 	$("iframe[name='rte2'").contents().find('body').find('a').each(function(){
					$(this).unbind('click');    
		            $(this).click(function(){
			                //$("iframe[name='rte2'").contents().find('body').attr('contentEditable','true');
			                 window.open($(this)[0].href,'_blank');
			                 return false;
			             });
			        });
			});
			
		document.getElementById('status').disabled = 'disabled';
		$('#btnUpdate').hide();
		$('#reset').hide();
		$('#btnSave').show();		
		$('#btnCancelNew').show();
		$('#addNewTestStep').hide();
		$('#teststepid1').hide();
		$('#teststepid2').hide();
		$('#attachment').empty();
		teststep.testStepIdsGlblSelectAll.splice(0,teststep.testStepIdsGlblSelectAll.length);
		teststep.testStepIdsGlbl2.splice(0,teststep.testStepIdsGlbl2.length);
},

dmlOperation:function(search,list)
{
	var listname = jP.Lists.setSPObject(teststep.SiteURL,list);	
	var query = search;
	var result = listname.getSPItemsWithQuery(query).Items;
	return (result);
},

populateTestCase:function()
{
		
		teststep.roles = new Array();
		
		var TestCaseResult = new Array();
		
		//To get the data from WCF | Ejaz Waquif DT:12/2/2014 
		$.each(show.GetGroupPortfolioProjectTestPass, function(ind,itm){
		
			if(itm.projectId == show.projectId)
			{
				
				$.each(itm.testPassList, function(index,item){
					
					if(item.testpassId == teststep.testPassId)
					{
						TestCaseResult = item.testCaseList;
						
						//To get roles for Test Pass
						teststep.roles = item.listRoles;
						
						teststep.testingType = item.testingType == null || item.testingType == "" || item.testingType == "N" ? "0" : item.testingType;

					}
				});
			}
			
		});
		
		teststep.TestCaseNameArrForTCID = new Array();
		//To get Test case name by test cace id
		$.each(TestCaseResult, function(ind,itm){
			
			//teststep.TestCaseNameArrForTCID[itm.testCaseId] = new Array();
			teststep.TestCaseNameArrForTCID[itm.testCaseId] = itm.testCaseName;
			
		}); 
		
		
		if(TestCaseResult != null && TestCaseResult != undefined)
		{
				teststep.flagForTC = false; // Added by shilpa on 23 apr bug:7762
			
				/**********************************************************************************************************************************/
				document.getElementById('btnSave').disabled = false;

             
				multiSelectList.createMultiSelectList("testCaseName",TestCaseResult,"testCaseName","testCaseId","130px;","480px");
				
				multiSelectList.createMultiSelectList("assotestcases",TestCaseResult,"testCaseName","testCaseId","130px;","420px");
				$('#assotestcases div ul div li:eq(0) input').attr('checked','checked');
								
				if(teststep.testCaseIdFrmCookie == null || teststep.testCaseIdFrmCookie == undefined)
					multiSelectList.selectItem("testCaseName",TestCaseResult[0]["testCaseId"]);
				else
					multiSelectList.setSelectedItemsFromArray("testCaseName",teststep.testCaseIdFrmCookie);
                  
		}
		else
		{
			$('#testCaseName').html('<div style="border:1px #ccc solid;width:480px;height:165px"> No Test Case Available.</div>');
		}
},

//Nikhil - 2/03/2012 - Returns Formated Text for Actual and Expected Results.
GetFormatedText:function(sText,FromExport)
{
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
		var length = $('#dvTemp').find('p').length-1;
			
		if(length>0)
		{
			for(i=0;i<=length;i++)
			{
				FlagBullete='false';
				var txtText;
				var pElement= $('#dvTemp').find('p')[i];
				
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
	  	return sResult;
  	}
  	else
  	{
  		var arrBullet= teststep.sBulleteChar.split(',');
		for(i=0;i<=arrBullet.length-1;i++)
		{
			while(sText.indexOf('>'+arrBullet[i]+'<span')!=-1)
			   	sText= sText.replace('>'+arrBullet[i]+'<span','>*<span');
		}
		return sText;
  	}
},

filterData:function (info2)
{
   		var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        if(navigator.appName=="Microsoft Internet Explorer")
        	info2=mydiv.innerText;    
        else
        	info2=mydiv.textContent;	        
		return  info2;     
},

populateRole:function()
{
		
        var TesterRoles =new Array();
		TesterRoles = $.grep(teststep.roles,function(item){ 
		
						return item.roleId != "1";
					  });
		if(TesterRoles!= null && TesterRoles!= undefined)
		{			
			$("#role").html('');
			multiSelectList.createRoleMultiSelectList("role",TesterRoles,"roleName","roleId","130px;")//changed by rajiv on 15 march 2012
			if(teststep.roleIdFrmCookie== null || teststep.roleIdFrmCookie== undefined)
				multiSelectList.selectNone("role");
			else
				multiSelectList.setSelectedItemsFromArray("role",teststep.roleIdFrmCookie);
		}
		else
		{
			teststep.createMultiSelectList("role","130px;");
		}
},

createMultiSelectList:function(divID,height)
{
	var divhtml="";
	var divhtml="<div class='Mediumddl' style='border: solid 1px #ccc;  width:447px; padding-left:1px;'>"+
				
				"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
					"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");'>All</a>"+
						 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");'>None</a>"+
						 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>Selected</a></li>"+
					"<li><hr/></li>"+
					//"<div style='overflow-y:scroll; height:"+multiSelectList.height+" width:290px'>";
					"<div style='overflow-y:scroll; height:"+height+" width:447px'>";
					
	var itemId = divID+"_1";
	divhtml=divhtml+"<li title='Standard'><input id='"+itemId+"'  type='checkbox' class='mslChk'></input><span id='"+itemId+"' style=\"display: none;\">Standard</span>Standard</li>";
	divhtml+="</div></ul></div>";
	$("#"+divID).html(divhtml);										

},


flagForSave : false,

saveTestStep:function()
{
	impTS.flagForImport = 1;
	
	teststep.flagForSave = true;
	
	Main.showLoading();	
	
	teststep.TestPassStatus.length=0;
	
	teststep.ExpectedResult = $('#expectedResultWithImage').html();
	
	//code added on 30 March for Richtextbox for teststep name by sheetal////
	updateRTE('rte1');
	
	var testStepName =document.getElementById('hdn' + 'rte1').value.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");//Added by HRW for bug 5963
	
	jQuery.trim(testStepName);	
	
	testStepDetail =document.getElementById('hdn' + 'rte1').value.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");//Added by HRW for bug 5963
	
	jQuery.trim(testStepDetail);
	
	testStepDetail = (testStepDetail.length == 0) ? '-' : testStepDetail;
	
	var testCaseID =new Array();
	
	$("#testCaseName div div li").each( function(){
	
		if($(this).children(".mslChk").attr('checked') == true)
			testCaseID.push($(this).children(".mslChk").attr('Id').split("_")[1]);	
			
	});	

    testCaseID.join(",");    
    
    var roleIDs = new Array();
    
    teststep.RoleNameBasedOnRoleID.length=0;
    
    if(testStepName.indexOf("~") == -1 && testStepDetail.indexOf("~") == -1)
	{
		if(testStepName.length == 0 || testCaseID == null || testCaseID == undefined || testCaseID == '' || $("#role div div li").find(":checked").length == "0")
			teststep.alertBox("Fields marked with asterisk(*) are mandatory field!");
		else
		{		
			 $("#role div div  li").each(function()
			 {
				if($(this).children(".mslChk").attr('checked') == true)
				{
					roleIDs.push($(this).children(".mslChk").attr('Id').split("_")[1]);	
						
					multiSelectList.allRolesUnchecked=false;			
				}
				
				teststep.RoleNameBasedOnRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] =$(this).children('span').text();
			 });
		
			//To get the roles that has Tester available WCF changes |Ejaz Waquif DT:12/2/2014 
			var rolesWithTester = new Array();
			
			teststep.flagForSaveMessage1 = true;
			
			teststep.roleNotSaved = new Array();
			
			$.each( teststep.roles,function(ind,itm){
			
				if( $.inArray(itm.roleId, roleIDs ) != -1)
				{
					if(itm.isTestersAssigned == 1)
					{
						rolesWithTester.push(itm.roleId);
					}
					else
					{
						teststep.roleNotSaved.push(itm.roleId);
						
						teststep.flagForSaveMessage1 = false;
					}
				}
			
			});
			
			//If No Role(s) contain Tester than show the message
			if(rolesWithTester.length == 0)
			{
				teststep.alertBox("There is no "+teststep.gConfigTester.toLowerCase()+" with the selected "+teststep.gCongfigRoles.toLowerCase()
								  +", hence the "+teststep.gConfigTestStep.toLowerCase()+" cannot be added with the selected "
								  +teststep.gCongfigRoles.toLowerCase()+"!");//Added by Mohini for Resource file
								  
				Main.hideLoading();	
							  
				return;				  
			}
			
			var rolesPresentForTester = 0;
			
			if(rolesWithTester.length > 0)
			{
				rolesPresentForTester = rolesWithTester;
			}
			
			if(rolesPresentForTester == 0)
			{
				if(multiSelectList.allRolesUnchecked==false)
					teststep.alertBox("There is no "+teststep.gConfigTester.toLowerCase()+" with the selected "+teststep.gCongfigRoles.toLowerCase()+", hence the "+teststep.gConfigTestStep.toLowerCase()+" cannot be saved with the selected "+teststep.gCongfigRoles.toLowerCase()+"!");//Added by Mohini for Resource file
				else
				    teststep.alertBox("There is no "+teststep.gConfigTester.toLowerCase()+" with the standard "+teststep.gCongfigRole.toLowerCase()+"(default "+teststep.gCongfigRole.toLowerCase()+"), hence the "+teststep.gConfigTestStep.toLowerCase()+" cannot be saved!");//Added by Mohini for Resource file
			}
			else if($('#ulItemstestCaseName input:checked').length > 1)   /*Code added by Deepak for sequencing*/
  			{
				teststep.alertBox("Cannot save "+teststep.gConfigTestStep.toLowerCase()+" under more than one "+teststep.gConfigTestCase.toLowerCase()+"!");//Added by Mohini for Resource file    
		    }/*Code added by Deepak for sequencing*/
			else
			{
					
					var data={
						'testCaseId':testCaseID[0],
						'testStepName':testStepName,
						'expectedResult':teststep.ExpectedResult,
						'testStepSequence': (teststep.lastSequenceWithinTP + 1).toString() ,//testStepsCountInSelectedTP
						'roleArray':rolesPresentForTester,
						'action':'add'
					};
					
					var result = ServiceLayer.InsertUpdateData("InsertUpdateTestStep", data, "TestStep");
					
			    //if( result == "ErrorDetails")
					if (result.ErrorDetails != undefined || result.ErrorDetails != null)
					{
						teststep.alertBox(teststep.gConfigTestStep+' with "'+testStepName+'" name already exists!');
						Main.hideLoading();
						return;
					}
					
					if(teststep.flagForSaveMessage1==true)
					{
						setTimeout(function(){ Main.AutoHideAlertBox(teststep.gConfigTestStep+" added successfully!")},1);
						//teststep.alertBox(teststep.gConfigTestStep+" added successfully!");//Added by Mohini for Resource file
						$(".navTabs h2:eq(0)").click();
					}
					else
					{
						var roleNames=new Array();
						
						for(var i=0;i<teststep.roleNotSaved.length;i++)
							roleNames.push(teststep.RoleNameBasedOnRoleID[teststep.roleNotSaved[i]]);
							
						var msg=teststep.gConfigTestStep+" is added successfully but it could not be saved under "+teststep.gCongfigRoles+" "+roleNames+" as it does not have any "+teststep.gConfigTester+" with these "+teststep.gCongfigRoles;//Added by Mohini for Resource file
						
						teststep.alertBox(msg);
					}
	
					teststep.clearFields();
					
					teststep.showTestStep();

					multiSelectList.selectNone("role");
					
					//$('.navTabs h2:eq(1)').click();

					$('.navTabs h2:eq(0)').click();	// For view all
					
			}			
		}
	}
	else
		teststep.alertBox("~ is not allowed in "+$('#lblPNameStar').text().substring(0,$('#lblPNameStar').text().length-2)+" and "+$('#lblExpRes').text().substring(0,$('#lblExpRes').text().length-1)+"!");//Added by Mohini for Resource file
	
	window.setTimeout("Main.hideLoading()", 200);
},


testerListItem : new Array(),
preSaveTestStep:function(roleIDs,testCaseID)
{
	/* Algorithm :
		1. fetch ID from TestPassToTestCaseMapping based on testpass id and testcase id
		2. for each test case selected make entry in TestCaseToTestStep containing ( fetched id from step 1, teststepID, status=Not Completed) 
	*/	
	
	if(teststep.ParentResultForSave != undefined)
		teststep.ParentResultForSave.length = 0;
	var newRole=new Array();	
	var flagForRole=0;	
	var testPassIDs = new Array();
	
	var iteration= Math.ceil((testCaseID.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
	var iterationStartPoint=0;
	for(var y=0;y<iteration;y++)
    {
	   if(y!=iteration-1)
	   {
      		var q = '';
      		var camlQuery = '<Query><Where>';	
      		var camlQueryForParentMapping = '<Query><Where>';	
			for(var u=0+iterationStartPoint;u<(147+iterationStartPoint)-1;u++)			 
			{
				camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testCaseID[u]+'</Value></Eq>';
				camlQueryForParentMapping += '<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+testCaseID[u]+'</Value></Eq>';
				q += '</Or>';		
	        }			
			camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+testCaseID[u]+'</Value></Eq>';
			camlQueryForParentMapping += '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+testCaseID[u]+'</Value></Eq>';
			
	        if(q != '')
			{
				camlQuery += q;	
				camlQueryForParentMapping += q;
			}	
												
			camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="TestPassID" /></ViewFields></Query>';	
			camlQueryForParentMapping +='</Where><ViewFields><FieldRef Name="TestPassID"/><FieldRef Name="status"/><FieldRef Name="SPUserID"/><FieldRef Name="Title" /></ViewFields></Query>';
			
			iterationStartPoint+=147;

			var TestCasesItems = teststep.dmlOperation(camlQuery,'TestCases');
			if(TestCasesItems !=null && TestCasesItems !=undefined)
			{
				//Code added by HRW for optimization	
				for(var i=0;i<TestCasesItems.length;i++)
				{
					var testPassIDsForTC = TestCasesItems[i]['TestPassID'].split(",");
					for(var aa=0;aa<testPassIDsForTC.length;aa++)
					{
						if($.inArray(testPassIDsForTC[aa],testPassIDs) == -1)
							testPassIDs.push(testPassIDsForTC[aa]);
					}		
				}
			}
			if(teststep.flagForSave == true)
			{
				var parentResult = teststep.dmlOperation(camlQueryForParentMapping,'TestPassToTestCaseMapping');
				if(parentResult != null && parentResult != undefined)
				{
					for(var mm=0;mm<parentResult.length;mm++)
					{
							teststep.ParentResultForSave.push(parentResult[mm]);
					}
				}	
			}		
	  	  }
		  else
		  {
				var q = '';
				var camlQuery = '<Query><Where>';
				var camlQueryForParentMapping = '<Query><Where>';
				for(var w=iterationStartPoint;w<(testCaseID.length)-1;w++)			 
				{
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testCaseID[w]+'</Value></Eq>';
					camlQueryForParentMapping += '<Or><Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+testCaseID[w]+'</Value></Eq>';
					q += '</Or>';	
				}
				camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+testCaseID[w]+'</Value></Eq>';	
				camlQueryForParentMapping += '<Eq><FieldRef Name="TestCaseID" /><Value Type="Text">'+testCaseID[w]+'</Value></Eq>';
				
				if(q != '')
				{
					camlQuery += q;		
					camlQueryForParentMapping += q;
				}							
				camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="TestPassID" /></ViewFields></Query>';	
				camlQueryForParentMapping +='</Where><ViewFields><FieldRef Name="TestPassID"/><FieldRef Name="status"/><FieldRef Name="SPUserID"/><FieldRef Name="Title" /></ViewFields></Query>';
			
				var TestCasesItems = teststep.dmlOperation(camlQuery,'TestCases');
				if(TestCasesItems !=null && TestCasesItems !=undefined)
				{
					//Code added by HRW for optimization	
					for(var i=0;i<TestCasesItems.length;i++)
					{
						var testPassIDsForTC = TestCasesItems[i]['TestPassID'].split(",");
						for(var aa=0;aa<testPassIDsForTC.length;aa++)
						{
							if($.inArray(testPassIDsForTC[aa],testPassIDs) == -1)
								testPassIDs.push(testPassIDsForTC[aa].replace(/\|/g,''));
						}		
					}
				}
				if(teststep.flagForSave == true)
				{
					var parentResult = teststep.dmlOperation(camlQueryForParentMapping,'TestPassToTestCaseMapping');
					if(parentResult != null && parentResult != undefined)
					{
						for(var mm=0;mm<parentResult.length;mm++)
						{
							teststep.ParentResultForSave.push(parentResult[mm]);
						}
					}	
				}						
		   }
	  }
	//Ankita: 8/27/2012 Bulk Data Handling 
	var testerList = jP.Lists.setSPObject(Main.getSiteUrl(),'Tester');
	if(testPassIDs.length<=147)
	{		
		var q = '';
		var camlQuery = '<Query><Where>';
		for(var iii=0;iii<testPassIDs.length-1;iii++)
		{
			camlQuery += '<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassIDs[iii]+'</Value></Eq>';
			q += '</Or>';	
		}	
		camlQuery += '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassIDs[iii]+'</Value></Eq>';
		if(q != '')
			camlQuery += q;
		camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="RoleID" /></ViewFields></Query>';
		var testerListItem = testerList.getSPItemsWithQuery(camlQuery).Items;
	}
	else
	{
		var numberOfIterations=Math.ceil(testPassIDs.length/147);
		var iterationsPoint=0;
		var orEndTags;
		var camlQuery;
		var testerListItem= new Array();
		for(var y=0; y<numberOfIterations-1; y++)
		{
			camlQuery = '<Query><Where>';
			orEndTags='';
			for(var iii=iterationsPoint; iii<(iterationsPoint+147)-1; iii++)
			{	
				camlQuery += '<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassIDs[iii]+'</Value></Eq>';
				orEndTags += '</Or>';
			}
			camlQuery += '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassIDs[iii]+'</Value></Eq>';
			camlQuery += orEndTags;
			camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="RoleID" /></ViewFields></Query>';
			var TesterResult = testerList.getSPItemsWithQuery(camlQuery).Items;
			if(TesterResult != null && TesterResult != undefined)
				$.merge(testerListItem,TesterResult);
			iterationsPoint+=147;
		}
		camlQuery = '<Query><Where>';
		orEndTags='';
		for(var iii=iterationsPoint; iii<testPassIDs.length-1; iii++)
		{	
			camlQuery += '<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassIDs[iii]+'</Value></Eq>';
			orEndTags += '</Or>';
		}
		camlQuery += '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassIDs[iii]+'</Value></Eq>';
		camlQuery += orEndTags;
		camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="RoleID" /></ViewFields></Query>';
		var TesterResult = testerList.getSPItemsWithQuery(camlQuery).Items;
		if(TesterResult != null && TesterResult != undefined)
			$.merge(testerListItem,TesterResult);

	}
	if(testerListItem !=null && testerListItem!=undefined)
	{
		teststep.testerListItem = testerListItem;//Added by HRW for optimization
		for(x in testerListItem)
	    {
		      var temp=parseInt(testerListItem[x]['RoleID']).toString();
		      //Added on 19 July 2012
		      if($.inArray(temp,roleIDs)!=-1)//roleIDs are Role(s) selected by User
			  {	
				 if($.inArray(temp,newRole)==-1)//Added by Harshal on 8 Feb 2012
			    	newRole.push(temp);
			  }
	    } 
	}
	
	//Code added by Harshal on 3/01/11
	if(newRole.length>0)
	{
		/*Code Modified by Rajiv and Harshal on 1 feb to return correct flag as per role availibity of test step*/
		for(var xy=0;xy<roleIDs.length;xy++)
		{
			if($.inArray(roleIDs[xy],newRole)!=-1)
			{	flagForRole=1;
			    break;
			}
		}
		
		if(flagForRole==1)
		 	return newRole;
		else 
		 	return 0;
	}
	else
		return 0;
},

alertBox:function(msg){
	$("#divAlert").html(msg);
    //$('#divAlert').dialog({ height: 150, width: 'auto', title: "", modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
	$('#divAlert').dialog({ height: 150, width: 'auto', minWidth: 350, maxWidth: 600, title: "", modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
},

alertBox1:function(msg){
	$("#divAlert").html(msg);
	//$('#divAlert').dialog({ height: 150, width:'auto', title: "",modal: true, buttons: { "Ok":function() { $('#testStepGrid').load(); $(this).dialog("close");}} });
	$('#divAlert').dialog({ height: 150, minWidth: 350, maxWidth: 600, title: "", modal: true, buttons: { "Ok": function () { $('#testStepGrid').load(); $(this).dialog("close"); } } });
},

popUpForExpected:function(){
	$('#expectedResultPreview').html($('#expectedResultWithImage').html());
	teststep.enableHyperlink('#expectedResultPreview');
	$('#clipBrdImage').dialog({height: 630,width: 630,resizable:false, modal: true, buttons: {
		"Save": function(){
			$('#expectedResultWithImage').html($('#expectedResultPreview').html());
			$( this ).dialog( "close" );
		}, 
	
		"Cancel": function(){
			$( this ).dialog( "close" );
		} 
	} 
	});
	$("#clipBrdImage").height(400);
	$("#expectedResultPreview").height('400px');
},
  
enableHyperlink:function(element){
	$(element).find('a').mouseover(function(e){
	    $(element).attr('contentEditable','false');
	    $(this).attr('title',$(this)[0].href); 
	});
	$(element).find('a').mouseout(function(e){
		$(element).attr('contentEditable','true'); 
	});
	$(element).find('a').each(function(){
		$(this).unbind('click');    
	    $(this).click(function(){
	        window.open($(this)[0].href,'_blank');
	        return false;
		});
	});
	$('#expectedResultPreview').click(function(){
		$("#clipBrdImage").height(400);
	    $("#expectedResultPreview").height('400px')
	});
},

arr:new Array(),
initpage:function(page_index, jq)
{
    var items_per_page = 10;
    if(teststep.arr != null && teststep.arr != undefined)
    {
    	var max_elem = Math.min((page_index+1)*items_per_page,teststep.arr.length);
	    var newhtml = '';
	    for(var i=page_index*items_per_page;i<max_elem;i++)
	    {
	        newhtml=newhtml+teststep.arr[i];
	    }     
	    if(newhtml == '')
	    {
	    	$("#Pagination").css('display','none');
	    	$("#noTP").css('display','');
	    }
	    else
	    {
	    	$('#showTestSteps').html("");
	    	$('#showTestSteps').html(newhtml);
	    	
	    	//To show all the Test Step check boxes selected for "Selelect All" option
	    	if($("#chkbxSelectAll").attr("checked"))
	    	{
	    		$(".chkBoxTS").attr("checked",true);
	    	}

			
			$('#showTestSteps').find('tr').each(function(i,v){
		    	$(v).find('td:eq(4)').find('a').css('color','blue').css('text-decoration','underline');
		    	$(v).find('td:eq(4)').find('a').attr('target','_blank');
		    	$(v).find('td:eq(4)').find('img').attr('height','100');
		    	$(v).find('td:eq(4)').find('img').attr('width','150');
		    	$(v).find('td:eq(4)').find('img').css('height','100px').css('width','150px');
		    	$(v).find('td:eq(4)').find('table').css('width','170px');

	    	});
	    	
	    	$(".chkBoxTS").click(function(){
    
		    	$("#chkbxSelectAll").attr("checked",false);
		    
		    });
	    }
	}
    return false;
},
pagination:function(sel)
{
	if($('#ulItemsassotestcases div').find('input[type=checkbox]').length != 0)
	{
		if($('#ulItemsassotestcases div').find('input[type=checkbox]:checked').length != 0)
		{
			var len = 0;
			teststep.arr = teststep.showTestStep(sel); 
			//teststep.arr = teststep.initPagination();
			if(teststep.arr != null && teststep.arr != undefined)
				len = teststep.arr.length;
			else if(sel != undefined)
					len = parseInt($("#labelCount").html());	
			
		     var countVal=((len)>=10)?(len):('0'+(len));
		     if(countVal== 00)
             {
                $("#countDiv").css('display','none');
             }
             else
             {
               $("#countDiv").css('display','');
               $("#labelCount").html(countVal);
            }

			if(len != 0)
			{
				$("#Pagination").pagination(len,{
				    callback:teststep.initpage,
				    items_per_page:10, 
				    num_display_entries:10,
				    num:2
				});
			}
			else
			{
				$('#noTP').show();
				$('#Pagination').hide();
				$('#testStepGrid').hide();
				$('#countDiv').hide();
				$('#btnDelete').hide();
			}
		}
		else
		{
			//teststep.alertBox("Please select atleast one testcase.");
			teststep.alertBox("Please select at least one "+teststep.gConfigTestCase+".");//Added by Mohini for Resource file	
			$(sel).attr('checked','checked');
			return; 
		}
	}
	else
	{
		$('#noTP').show();
		$('#Pagination').hide();
		$('#testStepGrid').hide();
		$('#countDiv').hide();
		$('#btnDelete').hide();
	}
},


reset:function()
{
	if(teststep.gTestStepList != null || teststep.gTestStepList != undefined)
	{
		enableDesignMode("rte1",teststep.gTestStepList.testStepName, false);	
		$("iframe[name='rte1'").contents().find('body p.MsoListParagraphCxSpLast').css("margin-bottom","0pt");//to remove scroll even if text is small
		
		if(teststep.gTestStepList.expectedResult == "" || teststep.gTestStepList.expectedResult == undefined)
			$("#expectedResultWithImage").html("");
		else
			$("#expectedResultWithImage").html(teststep.gTestStepList.expectedResult);
		
		//var temp = teststep.teststatus;						    			    
	    //DropDown.fillTestStatusDDInEdit(temp,'status');
	    var TestCasesID = new Array();
	    
	    TestCasesID.push(teststep.gTestStepList.testCaseId);
	    
	    multiSelectList.setSelectedItemsFromArray("testCaseName",TestCasesID);
	    
	    var role = new Array();
	    
	    $( teststep.gTestStepList.roleList ).each(function(ind,itm){
	    
	    	role.push(itm.roleId);
	    
	    });
	    
	    //var role = (teststep.gTestStepList[0]['Role'] != null || teststep.gTestStepList[0]['Role'] != undefined) ? teststep.gTestStepList[0]['Role'] : '';
	    if(role.length == 0)
	    	multiSelectList.selectNone("role");
	    else if(role.length == teststep.roleLength)
	    	multiSelectList.selectAll("role");
	    else
	    {
	    	//role = role.split(",");
	    	multiSelectList.setSelectedItemsFromArray("role",role);
	    }
	    //teststep.showTestStep(); // Added for bug 6097	   		   
	}
	document.getElementById('status').disabled = false; 
	//document.getElementById('devitem').value = '';
	//To enable the Create and View links
	//$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
	//$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
			
},

editTestStep:function(id)
{
	Main.showLoading();
	// Added for DD
	createDD.editMode = 1;
	
	createDD.hideDD();

	$('.navTabs h2:eq(3)').show();
	
	$('.navTabs h2').css('color','#7F7F7F');
	
	$('.navTabs h2:eq(3)').css('color','#000000');
	
	$('#testStepinput').show();
	
	$('#testStepGrid').hide();
	
	$('#countDiv').hide();
	
	teststep.RolesForTestStepEdit.length = 0;
	
	$('#rte1').attr('height','150');

	var indexForTestStepToBeEdited;
	
	teststep.TestStepIDFromEditTestStep = id;
	
	$('#btnSave').hide();
	
	$('#btnCancelNew').hide();
	
	$('#btnUpdate').show();
	
	$('#reset').show();
	
	$('#addNewTestStep').show();
	
	var temp='Not Completed';
	
	var TestStepList = new Array();
	
	TestStepList = teststep.dataCollection[ teststep.TestStepArrIndexMap[id] ];
	
	teststep.gTestStepList = TestStepList;
	
	if(TestStepList != null || TestStepList != undefined || TestStepList.length > 0)
	{			
		$('#teststepid1').show();
		
		document.getElementById('teststepid2').value = id;
		
		// code added on 30 March For richtextbox by sheetal//// 
		enableDesignMode("rte1", TestStepList.testStepName, false);
		
		//if(TestStepList[0]['ExcelImport'] == 1)//Added on 23 July 2014 by HRW
			//$(document).contents().find('#rte1').contents().find('table').css('width','455px');
				
		if(TestStepList.expectedResult != undefined)
			$('#expectedResultWithImage').html(TestStepList.expectedResult);
		else
			$('#expectedResultWithImage').html('');	
		
		var testPassID = teststep.testPassId; //$('#testPassName').val();
				
		var testCaseID =new Array();	
		/****************Move from down side to here by Harshal and Rajiv on 1 feb 2012************************************/
		testCaseID = TestStepList.testCaseId;//.split(",");
		
		var AllTestCasesInTestStep = new Array();//Added by Harshal on 28 March
		
	    teststep.showAttachment(id);
		
		AllTestCasesInTestStep.push( testCaseID );
		
		var role = new Array();
		
		$.each( TestStepList.roleList, function(ind,itm){
		
			role.push( itm.roleId );
			
		});
		
		multiSelectList.setSelectedItemsFromArray("testCaseName",AllTestCasesInTestStep);
		   
	    if(role.length>0) //code modified by Harshal and Rajiv on 1 feb
	    	multiSelectList.setSelectedItemsFromArray("role",role);
	    else
	    {	 
	        if(role.length == 0 || role == '')
		    	multiSelectList.selectNone("role");
		    else if(role.length == teststep.roleLength)
		    	multiSelectList.selectAll("role");
		    else
		    	multiSelectList.setSelectedItemsFromArray("role",role);
		}    
	}
	
	document.getElementById('status').disabled = false; 
	
	$("iframe[name='rte1'").contents().find('body').find('a').each(function(){    
      $(this).click(function(){
             window.open($(this)[0].href,'_blank');
             return false;
         });
	});

	$("iframe[name='rte1'").contents().find('body').find('a').mouseover(function(e){
	     $("iframe[name='rte1'").contents().find('body').attr('contentEditable','false'); 
	  });
	  
	$("iframe[name='rte1'").contents().find('body').find('a').mouseout(function(e){
	     $("iframe[name='rte1'").contents().find('body').attr('contentEditable','true'); 
	  });	  
	  
	$("iframe[name='rte1'").contents().bind("paste keyup", function(e) {
	    $("iframe[name='rte1'").contents().find('body').find('a').each(function(){
		$(this).unbind('click');    
	    $(this).click(function(){
	             window.open($(this)[0].href,'_blank');
	             return false;
	         });
	    });
	    
		$("iframe[name='rte1'").contents().find('body').find('a').mouseover(function(e){
			$("iframe[name='rte1'").contents().find('body').attr('contentEditable','false');
			$(this).attr('title',$(this)[0].href); 
		});
		
		$("iframe[name='rte1'").contents().find('body').find('a').mouseout(function(e){
		 	$("iframe[name='rte1'").contents().find('body').attr('contentEditable','true'); 
		});
	});
	 
	$('#ulItemstestCaseName div').css('height','127px');
	
	Main.hideLoading();
	
	//To disable the Create and view links on edit mode
	//$(".navTabs h2:eq(0)").attr("disabled",true).css("cursor","default");
	//$(".navTabs h2:eq(1)").attr("disabled",true).css("cursor","default");
},

showAttachment:function(id)
{
/*
	var markup='<b style="margin-top:4px">Attachment:</b>';	
	var attachquery = '<Query><Where><Contains><FieldRef Name="TestStepID" /><Value Type="Text">'+id+'</Value></Contains></Where><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
	var attachResult = teststep.dmlOperation(attachquery,'Attachment');
	
    if(attachResult != null || attachResult != undefined)
    	markup += '<span><b>YES</b></span>';
    else
    	markup +='&nbsp;<b>NO</b>&nbsp;&nbsp;<a onclick="teststep.showUpload();" style="cursor:pointer" title="Upload File"><font color="#FF6500">Attach File</font></a>';
    $('#attachment').html(markup);
    */
},

updateTestStep:function()
{
	teststep.flagForSave = false;
	
	teststep.TestCasesOfRemovedRoles.length = 0;
	
	Main.showLoading();
	
	//code added for rich text box on 30 march by sheetal 
	updateRTE('rte1');
	
	teststep.ExpectedResult = $('#expectedResultWithImage').html();
	
	var testStepName = document.getElementById('hdn' + 'rte1').value.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");//Added by HRW for bug 5963
	
	teststep.TestPassStatus.length = 0;
	
	jQuery.trim(testStepName);
	
	var testStepDetail = document.getElementById('hdn' + 'rte1').value.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");//Added by HRW for bug 5963
	
	jQuery.trim(testStepDetail);
	
	testStepDetail = (testStepDetail.length == 0) ? '-' : testStepDetail;
	
	var RoleNameBasedOnRoleID=new Array();
	
	var testCaseID =new Array();	
	
	var allTestCasesInTestPass = new Array();
	
	$("#testCaseName div div li").each(function(){
	
		allTestCasesInTestPass.push($(this).children(".mslChk").attr('Id').split("_")[1]);//Added by Harshal on 17 Feb
		
		if($(this).children(".mslChk").attr('checked') == true)
		{
			testCaseID.push($(this).children(".mslChk").attr('Id').split("_")[1]);					
		}
	});	
	
	var roleIDs = new Array();  
	
	var RemovedRoles=new Array();//logic to update masterList
	
	var AddedRoles=new Array();
	
	var o=0;//logic to update masterList
	
	var RolesOfSelectedTestStepVar = teststep.RolesForTestStepEdit;//Code commneted and new code added for bug 899//teststep.gTestStepList[0]['Role'];//logic to update masterList
	
	var RolesOfSelectedTestStepArray=new Array();//logic to update masterList
	
	RolesOfSelectedTestStepArray=RolesOfSelectedTestStepVar;//logic to update masterList
	
	var isonlyts=0;
	
	var allRolesFromTestStepListVar='';
	
	var allRolesFromTestStepList=new Array();
	
	if(testStepName.indexOf("~") == -1 && testStepDetail.indexOf("~") == -1)    
	{
		var ts = teststep.filterData(testStepName);
		
		ts = ts.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, "");
		
		ts = ts.replace(/\s+/g, '');
		
		ts = jQuery.trim(ts);
		
		if(ts.length == 0 || testCaseID == null || testCaseID == undefined || testCaseID == '' || $("#role div div li").find(":checked").length == "0")
		{
			teststep.alertBox("Fields marked with asterisk(*) are mandatory!");
			
			Main.hideLoading();
		}	
		else if($('#ulItemstestCaseName input:checked').length > 1)   /*Code added by Deepak for sequencing*/
		{
			teststep.alertBox("Cannot save "+teststep.gConfigTestStep.toLowerCase()+" under more than one "+teststep.gConfigTestCase.toLowerCase()+"!");//Added by Mohini for Resource file     
		}/*Code added by Deepak for sequencing*/
		else
		{	
			
			var testCaseID= new Array();
			$("#testCaseName div div li").each(function() {
			
				if($(this).children(".mslChk").attr('checked') == true)
				{
					testCaseID.push($(this).children(".mslChk").attr('Id').split("_")[1]);     
				}
			});
			
			teststep.addedRoles.length = 0;
			
			$("#role div div  li").each(function()
			{
				if($(this).children(".mslChk").attr('checked') == true)
				{
					roleIDs.push($(this).children(".mslChk").attr('Id').split("_")[1]);	
					
					multiSelectList.allRolesUnchecked=false;			
				}
				teststep.RoleNameBasedOnRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] =$(this).children('span').text();
			});
			
			//To get the roles that has Tester available WCF changes |Ejaz Waquif DT:12/2/2014 
			var rolesWithTester = new Array();
			
			teststep.flagForSaveMessage1 = true;
			
			teststep.roleNotSaved = new Array();
			
			$.each( teststep.roles,function(ind,itm){
			
			if( $.inArray(itm.roleId, roleIDs ) != -1)
			{
				if(itm.isTestersAssigned == 1)
				{
					rolesWithTester.push(itm.roleId);
				}
				else
				{
					teststep.roleNotSaved.push(itm.roleId);
					
					teststep.flagForSaveMessage1 = false;
				}
			}
			
			});
			
			if(rolesWithTester.length == 0)
			{
				teststep.alertBox("There is no "+teststep.gConfigTester.toLowerCase()+" with the selected "+teststep.gCongfigRoles.toLowerCase()
				  					+", hence the "+teststep.gConfigTestStep.toLowerCase()+" cannot be added with the selected "
				  					+teststep.gCongfigRoles.toLowerCase()+"!");//Added by Mohini for Resource file
			  
				Main.hideLoading();	
			
				return;				  
			}
			
			var data={
			
				'testStepId':teststep.TestStepIDFromEditTestStep.toString(),
				'testCaseId': testCaseID[0],
				'testStepName':testStepName,
				'expectedResult':teststep.ExpectedResult,
				//'testStepSequence':'3',
				//'erAttachmentName': 'Test Attachmeent',
				//'erAttachmentURL': 'http://msn.com',
				'roleArray':rolesWithTester,
				'action':'edit'
			};
			
			var result = ServiceLayer.InsertUpdateData("InsertUpdateTestStep", data, "TestStep");
			
			if( result.ErrorDetails != undefined && result.Value == "[Test Step is already available with this name! Please select different Test Step Name.]")
			{
				teststep.alertBox(teststep.gConfigTestStep+' with '+testStepName+' name already exists!');
				$('.navTabs h2:eq(0)').click();	// For view all				
				Main.hideLoading();
				return;
			}
			
			if(teststep.flagForSaveMessage1==true)
			{
				//teststep.alertBox(teststep.gConfigTestStep+" updated successfully!");
				Main.AutoHideAlertBox(teststep.gConfigTestStep+" updated successfully!");//Added by Mohini for Resource file
				
			}
			else
			{
				var roleNames=new Array();
			
				for(var i=0;i<teststep.roleNotSaved.length;i++)
				roleNames.push(teststep.RoleNameBasedOnRoleID[teststep.roleNotSaved[i]]);
				
				var msg=teststep.gConfigTestStep+" is updated successfully but it could not be saved under "+teststep.gCongfigRoles+" "+roleNames+" as it does not have any "+teststep.gConfigTester+" with these "+teststep.gCongfigRoles;//Added by Mohini for Resource file
				
				teststep.alertBox(msg);
			}
			
			// Added for DD
			createDD.editMode = 0;
			
			createDD.showDD();
			
			teststep.clearFields(); //Position swapped by rajiv on 7 june 2012 to resolve the bug mentioned by Steve on the same date. 
			
			multiSelectList.selectNone("role");	
			
			$('.navTabs h2:eq(0)').click();	// For view all
			
			
		}
	}
	else
	//teststep.alertBox("~ is not allowed in Test Step Details and Expected Result!");
	teststep.alertBox("~ is not allowed in "+$('#lblPNameStar').text().substring(0,$('#lblPNameStar').text().length-2)+" and "+$('#lblExpRes').text().substring(0,$('#lblExpRes').text().length-1)+"!");//Added by Mohini for Resource file    
	
	window.setTimeout("Main.hideLoading()", 200);	
	
	//To enable the Create and View links
	//$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
	//$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");			
},



onClickAttaAnch:function(testCase,testStep)
{
	Main.deletecookie("AttachPageState");
	var prjName = teststep.projectId; //$("#projectName").val(); 
	var passNm = teststep.testPassId; //$('#testPassName').val();
	
	window.location.href="/attachment/Index?pid="+prjName+"&tpid="+passNm+"&tcid="+testCase+"&tsid="+testStep+"";
},

swapUpForTPSeq:function(i)
{
	var actionListName = jP.Lists.setSPObject(teststep.SiteURL,'Action');
	var obj = new Array();
	if(i!=0)
	{
		obj.push({'ID':teststep.result[i]['ID'],
						  'position':teststep.result[i-1]['position']	
				});
		obj.push({'ID':teststep.result[i-1]['ID'],
						  'position':teststep.result[i]['position']	
				});		
		var result = actionListName.updateItem(obj);
		if(i==teststep.startIndexA)
			//teststep.alertBox("The top test step was moved to the previous step(on the previous page in the grid).");
			teststep.alertBox("The top "+teststep.gConfigTestStep+" was moved to the previous step(on the previous page in the grid).");
	}
	else
	{
		var len = teststep.result.length-1;
		obj.push({'ID':teststep.result[i]['ID'],
						  'position':teststep.result[len]['position']	
				});
		obj.push({'ID':teststep.result[len]['ID'],
						  'position':teststep.result[i]['position']	
				});		
		var result = actionListName.updateItem(obj);
		if(ActionResult.length > 5)//Code added by deepak for sequencing
	    	//teststep.alertBox("The top test step was moved to the last step within this test case(on the last page in the grid).");
	    	teststep.alertBox("The top "+teststep.gConfigTestStep+" was moved to the last step within this "+teststep.gConfigTestCase+"(on the last page in the grid).");
	    else
	    	//teststep.alertBox("The top test step was moved to the last step within this test case.");
	    	teststep.alertBox("The top "+teststep.gConfigTestStep+" was moved to the last step within this "+teststep.gConfigTestCase+".");
	}
},
swapUp:function(i)
{
	if(teststep.sequenceForTPID[ $("#testPassName").val() ] == "1")
	{
		teststep.swapUpForTPSeq(i);
	}
	else if(i==0)
	{
			var test = "";
			
			var temp = teststep.result[i]; 
			
			teststep.result[i] = teststep.result[teststep.result.length-1];
						
			teststep.result[teststep.result.length-1] = temp;
			
			
			test = teststep.result[i].testStepId+"~"+teststep.result[teststep.result.length-1].testStepSequence
				   +"#"+teststep.result[teststep.result.length-1].testStepId+"~"+teststep.result[i].testStepSequence;
				   
			//To swap the sequence within array
			var tempSequence = teststep.result[i].testStepSequence;
			teststep.result[i].testStepSequence = teststep.result[teststep.result.length-1].testStepSequence;
			teststep.result[teststep.result.length-1].testStepSequence = tempSequence;
			
			var arrangedTestStepIDs = new Array();
			
			
			/*
			for(var j=0;j< teststep.result.length;j++)
			{	
				arrangedTestStepIDs.push(teststep.result[j].testStepId);
				
				if(test == "")
					test = teststep.result[j].testStepId+"~"+j;
				else
					test += "#"+ teststep.result[j].testStepId+"~"+j;
			}
			*/
			
			var result = ServiceLayer.InsertUpdateData("TestStepSequencing" + "/" + test, null,"TestStep");
						
			if(teststep.result.length > 10)//Code added by deepak for sequencing
		    	teststep.alertBox("The top "+teststep.gConfigTestStep+" was moved to the last step within this "+teststep.gConfigTestCase+"(on the last page in the grid).");
		    else
		    	teststep.alertBox("The top "+teststep.gConfigTestStep+" was moved to the last step within this "+teststep.gConfigTestCase+".");	
		    
	} 
	else
	{
			var temp = teststep.result[i];
			
			teststep.result[i] = teststep.result[i-1];
			
			teststep.result[i-1] = temp;
			
			var arrangedTestStepIDs = new Array();
			
			var test = "";
			
			
			test = teststep.result[i].testStepId+"~"+teststep.result[i-1].testStepSequence
				   +"#"+teststep.result[i-1].testStepId+"~"+teststep.result[i].testStepSequence;
				   
			//To swap the sequence within array
			var tempSequence = teststep.result[i].testStepSequence;
			teststep.result[i].testStepSequence = teststep.result[i-1].testStepSequence;
			teststep.result[i-1].testStepSequence = tempSequence;


			
			/*
			for(var j=0;j< teststep.result.length;j++)
			{	
				arrangedTestStepIDs.push(teststep.result[j].testStepId);
				
				if(test == "")
					test = teststep.result[j].testStepId+"~"+j;
				else
					test += "#"+ teststep.result[j].testStepId+"~"+j;
			}
			*/
			
			var result = ServiceLayer.InsertUpdateData("TestStepSequencing" + "/" + test, null, "TestStep");
			
			if(i==teststep.startIndexA)
				teststep.alertBox("The top "+teststep.gConfigTestStep+" was moved to the previous step(on the previous page in the grid).");
	
	}
	teststep.pagination("swap");
	
	Main.hideLoading();
},

swapDownForTPSeq:function(i)
{
	var actionListName = jP.Lists.setSPObject(teststep.SiteURL,'Action');
	var obj = new Array();
	if(i != teststep.result.length-1)
	{
		obj.push({'ID':teststep.result[i]['ID'],
						  'position':teststep.result[i+1]['position']	
				});
		obj.push({'ID':teststep.result[i+1]['ID'],
						  'position':teststep.result[i]['position']	
				});		
		var result = actionListName.updateItem(obj);
		if(i==teststep.EiForAction-1)
			//teststep.alertBox("The bottom test step was moved to the next step(on the next page in the grid)."); 
			teststep.alertBox("The bottom "+teststep.gConfigTestStep+" was moved to the next step(on the next page in the grid)."); 
	}
	else
	{
		var len = teststep.result.length-1;
		obj.push({'ID':teststep.result[i]['ID'],
						  'position':teststep.result[0]['position']	
				});
		obj.push({'ID':teststep.result[0]['ID'],
						  'position':teststep.result[len]['position']	
				});		
		var result = actionListName.updateItem(obj);
		if(teststep.result.length > 5)		
			//teststep.alertBox("The bottom test step was moved to the first step within this test pass(on the first page in the grid).");
			teststep.alertBox("The bottom "+teststep.gConfigTestStep+" was moved to the first step within this "+teststep.gConfigTestPass+"(on the first page in the grid).");
		else
			//teststep.alertBox("The bottom test step was moved to the first step within this test pass.");
			teststep.alertBox("The bottom "+teststep.gConfigTestStep+" was moved to the first step within this "+teststep.gConfigTestPass+".");
	}
},
swapDown:function(i)
{
	if(teststep.sequenceForTPID[ $("#testPassName").val() ] == "1")
	{
		teststep.swapDownForTPSeq(i);
	}
	else if(i==teststep.result.length-1)
	 {
		 	var temp = teststep.result[i];
		 	
		 	teststep.result[i] = teststep.result[0];
		 	
		    teststep.result[0] = temp;
		    
			var arrangedTestStepIDs = new Array();
			
			var test = "";
			
			test = teststep.result[i].testStepId+"~"+teststep.result[0].testStepSequence
				   +"#"+teststep.result[0].testStepId+"~"+teststep.result[i].testStepSequence;
				   
			//To swap the sequence within array
			var tempSequence = teststep.result[i].testStepSequence;
			teststep.result[i].testStepSequence = teststep.result[0].testStepSequence;
			teststep.result[0].testStepSequence = tempSequence;


			/*
			for(var j=0;j< teststep.result.length;j++)
			{	
				
				arrangedTestStepIDs.push(teststep.result[j]['ID']);
				
				if(test == "")
					test = teststep.result[j].testStepId+"~"+j;
				else
					test += "#"+ teststep.result[j].testStepId+"~"+j;
			}
			*/
			
			var result = ServiceLayer.InsertUpdateData("TestStepSequencing" + "/" + test, null, "TestStep");
				
			if(teststep.result.length > 10)		
				teststep.alertBox("The bottom "+teststep.gConfigTestStep+" was moved to the first step within this "+teststep.gConfigTestPass+"(on the first page in the grid).");
			else
				teststep.alertBox("The bottom "+teststep.gConfigTestStep+" was moved to the first step within this "+teststep.gConfigTestPass+".");
	 } 
	 else
	 {
		 	var temp = teststep.result[i];
		 	
		 	teststep.result[i] = teststep.result[i+1];
		 	
		    teststep.result[i+1] = temp;
		    
			var arrangedTestStepIDs = new Array();
			
			var test = "";
			
			test = teststep.result[i].testStepId+"~"+teststep.result[i+1].testStepSequence
				   +"#"+teststep.result[i+1].testStepId+"~"+teststep.result[i].testStepSequence;
				   
			//To swap the sequence within array
			var tempSequence = teststep.result[i].testStepSequence;
			teststep.result[i].testStepSequence = teststep.result[i+1].testStepSequence;
			teststep.result[i+1].testStepSequence = tempSequence;


			/*
			for(var j=0;j< teststep.result.length;j++)
			{	
				arrangedTestStepIDs.push(teststep.result[j]['ID']);
				
				if(test == "")
					test = teststep.result[j].testStepId+"~"+j;
				else
					test += "#"+ teststep.result[j].testStepId+"~"+j;
			}
			*/
			
			var result = ServiceLayer.InsertUpdateData("TestStepSequencing" + "/" + test, null, "TestStep");
			
		if(i==teststep.EiForAction-1)
			teststep.alertBox("The bottom "+teststep.gConfigTestStep+" was moved to the next step(on the next page in the grid)."); 
	 }
	 teststep.pagination("swap");
	 Main.hideLoading();
},
deleteTestStep:function(id)
{  
	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	//$( "#divConfirm" ).text('Are you sure want to Delete this Test Step?');
	$( "#divConfirm" ).text('Are you sure you want to Delete this '+teststep.gConfigTestStep+'?');//Added by Mohini for Resource file				
	$( "#divConfirm" ).dialog
	({
         autoOpen: false,
         resizable: false,
         height:140,
         modal: true,
         buttons: 
         {
			"Delete": function() {	
									Main.showLoading();																							
									setTimeout('teststep.delOk('+id+');',100);
									$( this ).dialog( "close" );
									Main.hideLoading();
									},
			"Cancel": function() {
									Main.showLoading();		
									$( this ).dialog( "close" );
									Main.hideLoading();
								 }
		}
	});
		
	$('#divConfirm').dialog("open");
},

reArrangeSequenceUsingTestStepsBuffer:function(teststepId)
{
	var actionListName = jP.Lists.setSPObject(teststep.SiteURL,'Action');
	var query;
	var obj = new Array();
	var position=-1;
	if(teststep.result!=undefined && teststep.result!=null)
	if(teststep.result[0]["position"]!=undefined && teststep.result[0]["position"]!=null && teststep.result[0]["position"]!='')
	for(var j=0;j< teststep.result.length;j++)
	{	
		if(teststep.result[j]['ID']==teststepId)
        {	
        	position=j;
        	break;
        }
	}
	if(teststep.result!=null && teststep.result!=undefined)
	{
		if(position==0)
		{
			for(var j=1;j< teststep.result.length;j++)
	        {
				obj.push({'ID':teststep.result[j]['ID'],
						  'position':(j-1)	
					});
				var res = actionListName.updateItem(obj);	
			}
		}
		else if(position!=teststep.result.length-1 && position != -1)
		{
			for(var j=position+1;j<teststep.result.length;j++)
	        {
				obj.push({'ID':teststep.result[j]['ID'],
						  'position':(j-1)	
					});
				var res = actionListName.updateItem(obj);	
			}
	    }
	}   
},


/*Function Added by swapnil on 4/16/2013 for bulk deletion*/
delTestSteps:function()
{	   
   var Count=0;
   
   //To check wether the user selected the Test Step or not
   var testStepToDelete = new Array();
	
	$(".chkBoxTS").each(function(){
	
		if( $(this).attr("checked") )
		{
			testStepToDelete.push( $(this).attr("testStepId") );
		}
	
	});
	
	if(testStepToDelete.length == 0)
	{
		teststep.alertBox("Please select the "+teststep.gConfigTestStep+"(s) first.");
		
		Main.hideLoading();
		
		return;
	}
	//End of To check wether the user selected the Test Step or not
   
   if($('#assotestcases').text()=='No Test Case Available')
    {
      Main.hideLoading();
      //teststep.alertBox("No Test Case Available");
      teststep.alertBox("No "+teststep.gConfigTestCase+" Available");//Added by Mohini for Resource file
      return false;
    }
    else
    { 
        Main.hideLoading();
		$("#assotestcases div div li").each(
				function()
				{
		   			if($(this).children(".mslChk").attr('checked') == true)
					{
						Count++;
					}
				});
        
		if(Count==0)
		{  
		  //teststep.alertBox('Please select atleast one TestCase for deletion');
		  teststep.alertBox('Please select atleast one '+teststep.gConfigTestCase+' for deletion');//Added by Mohini for Resource file
		  Main.hideLoading();
		  return false;
		}
		//else if($('#actionSteps').text()=='There are no Test Steps.')
		else if($('#showTestSteps tr').length == 0)
		{ 
		  //teststep.alertBox('There are no Test Steps.');
		  teststep.alertBox('There are no '+teststep.gConfigTestStep+'s.');//Added by Mohini for Resource file
		  Main.hideLoading();
		  return false;
		}
		else if(Count>0)
        {  
			$( "#dialog:ui-dialog" ).dialog( "destroy" );
			//$( "#divConfirm" ).text('Are you sure you want to delete All Test Steps?');	
			$( "#divConfirm" ).text('Are you sure you want to delete all selected '+teststep.gConfigTestStep+'(s)?');//Added by Mohini for Resource file
			$( "#divConfirm" ).dialog
			({
		         autoOpen: false,
		         resizable: false,
		         height:180,
		         modal: true,
		         buttons: {
							"Delete": function(){
													Main.showLoading();
													//var listName = jP.Lists.setSPObject(testcase.SiteURL,'TestCases');						
													//var res = listName.deleteItem(id);
													$( this ).dialog( "close" );
													setTimeout('teststep.delTestStepOk("'+testStepToDelete.join()+'");',100);
													Main.hideLoading();
							                    },
							"Cancel": function(){
													$( this ).dialog( "close" );
													 	 
												}
						  }
			});
			$('#divConfirm').dialog("open");
		}
     }
},
/* function added by shilpa */
/*Function Added by swapnil on 4/16/2013 for bulk deletion*/
delTestStepOk:function(testStepToDelete){
	teststep.delFlag = 1;
	teststep.BulkDelete(testStepToDelete);
	teststep.clearFields();
	multiSelectList.selectAll("assotestcases");
	teststep.pagination("delete");
	Main.AutoHideAlertBox(teststep.gConfigTestStep+"s deleted successfully!");
},

sortJSON: function (data, key, way) {
    return data.sort(function (a, b) {
        var x = a[key]==undefined?"":a[key] ; var y = b[key]==undefined?"":b[key];
        if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
},


//Code modified for WCF changes |Ejaz Waquif DT:Dec/18/2014 
BulkDelete:function(testStepToDelete)
{
    var count = testStepToDelete.length;
     
	if($("#chkbxSelectAll").attr("checked"))
	{	
		
		testStepToDelete = "";
		$.each( teststep.result ,function(ind,itm){
		
			if(ind == 0)
				testStepToDelete += itm.testStepId;
			else
				testStepToDelete += ","+itm.testStepId;	
		
		});
		
		count = teststep.result.length;
	}
	
	//To update the Total count label |Ejaz Waquif DT:Dec/18/2014
	var len = parseInt($("#labelCount").html()) - count;
	
	var countVal=((len)>=10)?(len):('0'+(len));
	
    $("#labelCount").html(countVal);
	

	var data={
	
		'testStepId':testStepToDelete	
	};
	
	var result = ServiceLayer.DeleteData("DeleteTestStep" + "/" + testStepToDelete, null, "TestStep");
},
/*End*/

/**********Added by Mohini 12-19-2013***********/
alertBox2:function(msg){
	$("#divAlert2").html(msg);
	$('#divAlert2').dialog({
	height: 150,
	modal: true, 
	buttons:
    { 
        "Ok":function() 
		{ 
            var _url = window.location.href;
            if (_url.indexOf("/Index") > 0) {
                _url = _url.substr(0,_url.indexOf("/Index"))
            }
            else if (_url.indexOf("/ProjectMgnt") > 0) {
	            _url = _url.substr(0, _url.indexOf("/ProjectMgnt"))
	        }
            if (teststep.noprjFlag == 1)
                window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'Dashboard/ProjectMgnt'; //Main.getSiteUrl()+'/SitePages/ProjectMgnt_1.aspx';
            else if (teststep.noTPFlag == 1)
                window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'TestPass' + '?pid=' + show.projectId + '&tpid=' + show.testPassId; //+ '/SitePages/TestPassMgnt_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
            else if (teststep.noTestrFlag == 1)
                window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'Tester' + '?pid=' + show.projectId + '&tpid=' + show.testPassId; //+'/SitePages/Tester_1.aspx'+'?pid='+show.projectId+'&tpid='+show.testPassId;
            else if (teststep.noTCFlag == 1)
                window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'TestCase' + '?pid=' + show.projectId + '&tpid=' + show.testPassId; //+ '/SitePages/testcase_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
				
			 $(this).dialog("close");
		},
		"Cancel":function()
		{ 
		    $(this).dialog("close");
		}
	} 
 });
}
}
