/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/
 
var testcase={
     SiteURL:Main.getSiteUrl(),		
	 testIDList:" ",	 	                     
	 startIndexT:0,
     startIndexA:0,
     TestCaseIDForUpdate:"",
     TestPassIDForUpdate:"",
     TPTCmaparr:new Array(),	     
     Tester:"",
     EiForAction:0,
     gTestCaseList:"",
     createDate:Main.getCurrentSystmDt(),
     searchKey:'',
     testerIndex:0,
     testCaseLength:0,
     testpassIDsForUpdate:new Array(),
     flagForUpdateTestCase:true,
     testPassForEdit:new Array(),
     //Added  for optimization
     TestCaseList : new Array(),  
     TestPassNameForTPID : new Array(),
     TesterSPUserIDForTP : new Array(),
     globalTestCaseIDs : new Array(),
     
     availableTPIDForUser : new Array(),
     flagForClone:false,//:SD
     associatedTestPassIDsForTestCase : new Array(),//:SD
     gPageIndex:0,//:SD
     gPageIndexCloneGrid:0,//:SD
    /**************Added for resource file ******************/
     gConfigTestCase:"Test Case",     
     gConfigTestStep:"Test Step",
     gConfigTestPass:"Test Pass",
     gConfigTester:"Tester",
     gConfigProject:"Project",
     gConfigStatus:"Status",
     gConfigVersion:"Version",
     gConfigGroup:'Group',
     gConfigPortfolio:'Portfolio',
     glblvalOfEstimatedTime:'',
     glblvalOfDescription:'',
     glblValOfTestcaseName:'',
     gtabValOfClone:'',
     forTCIdGetTCDetails:new Array(),
     TesterListResult:new Array(),
 /*************************************************************/     
  

alertBox:function(msg){
			$("#divAlert").text(msg);
			$('#divAlert').dialog({ minHeight: 150, height:'auto',width: 'auto', modal: true, title: '', buttons: { "Ok": function () { $(this).dialog("close"); } } });
},

alertBoxForNavigation:function(msg,navigationPage){
			$("#divAlert").html(msg);
			$('#divAlert').dialog({minHeight:150, height:'auto',width: 'auto',modal: true, buttons: { "Ok":function() { 
			                                                                if (navigationPage == 'testpass')
			                                                                    window.location.pathname = 'TestPass';
																				//window.location.href= 'TestPassMgnt_1.aspx?pid='+show.projectId;
			                                                                else if(navigationPage=='tester')
			                                                                    window.location.pathname = 'Tester';
																				//window.location.href= 'Tester_1.aspx?pid='+show.projectId+"&tpid="+show.testPassId
			                                                                else if (navigationPage == 'project')
			                                                                    window.location.pathname = 'Dashboard/ProjectMgnt';
																		        //window.location.href= 'ProjectMgnt_1.aspx';
																			$(this).dialog("close");
																		},
																		"Cancel":function(){ 
																			    $(this).dialog("close");
																			   }

																			} 
																	});
},
pageLoad:function()
{
	$(".rgTableBread tr:eq(1) td").click(function() {
		if($('#containerClonePopUp').is(':visible'))
		{
			$('#containerClonePopUp').hide();
			$('#containerClonePopUp').attr('testcaseId','');
		}
		
	});
	
	$(".navTabs h2").click(function() {
		if($('#containerClonePopUp').is(':visible'))
		{
			$('#containerClonePopUp').hide();
			$('#containerClonePopUp').attr('testcaseId','');
		}
		
	});

   if(resource.isConfig.toLowerCase()=='true')
   {
   	    testcase.gConfigTestCase = resource.gPageSpecialTerms['Test Case']!=undefined?resource.gPageSpecialTerms['Test Case']:"Test Case";
   	    testcase.gConfigTestStep = resource.gPageSpecialTerms['Test Step']!=undefined?resource.gPageSpecialTerms['Test Step']:"Test Step";
   	    testcase.gConfigTestPass = resource.gPageSpecialTerms['Test Pass']!=undefined?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
   	    testcase.gConfigTester = resource.gPageSpecialTerms['Tester']!=undefined?resource.gPageSpecialTerms['Tester']:"Tester";
   	    testcase.gConfigProject= resource.gPageSpecialTerms['Project']!=undefined?resource.gPageSpecialTerms['Project']:"Project";
   	    testcase.gConfigStatus= resource.gPageSpecialTerms['Status']!=undefined?resource.gPageSpecialTerms['Status']:"Status";
   	    testcase.gConfigGroup=resource.gPageSpecialTerms['Group']!=undefined?resource.gPageSpecialTerms['Group']:"Group";
        testcase.gConfigPortfolio=resource.gPageSpecialTerms['Portfolio']!=undefined?resource.gPageSpecialTerms['Portfolio']:"Portfolio";
        testcase.gConfigVersion=resource.gPageSpecialTerms['Version']!=undefined?resource.gPageSpecialTerms['Version']:"Version";
   }
   
      //To make the bredcrumb box label cofigurable
   $("#groupHead label").html(testcase.gConfigGroup + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
   $("#portfolioHead label").html(testcase.gConfigPortfolio + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
   $("#projectHead label").html(testcase.gConfigProject + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
   $("#versionHead label").html(testcase.gConfigVersion + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
   $("#TestPassHead label").html(testcase.gConfigTestPass + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');

      //End of To make the bredcrumb box label cofigurable

   
   $('#btnImport').val('Import '+testcase.gConfigTestCase+'(s)');
   $('#paraNote').html('<b>NOTE:</b>'+testcase.gConfigTestCase+'s are used to organize your '+testcase.gConfigTestStep+'s into logical groupings within your ' 
								+testcase.gConfigTestPass+'. And because of the way the system is structured, it is required that you enter' 
								+' at least one '+testcase.gConfigTestCase+' for each '+testcase.gConfigTestPass+'.');
   testcase.glblvalOfEstimatedTime=$('#lblETT').text().substring(0,$('#lblETT').text().length-2);
   testcase.glblvalOfDescription=$('#lblDescription').text();
   testcase.glblValOfTestcaseName=$('#lblTestCaseName').text().substring(0,$('#lblTestCaseName').text().length-2);
   testcase.gtabValOfClone=$('#clon').text();
   $('#noTestCaseDiv').html('No '+testcase.gConfigTestCase+'(s) Available.');
   $('#noTestCaseForCloneDiv').html('No '+testcase.gConfigTestCase+'(s) Available.');//Added on 28/04/2014 by HRW
   $('#pTemp').html('Please follow the same format as given in downloaded template to add the '+testcase.gConfigTestCase.toLowerCase()+'s!');
   $('#orderedList').find('li:eq(1)').text('Populate data of '+testcase.gConfigTestCase+'s as directed in template.');
   $('#orderedList').find('li:eq(3)').text("Upload this saved template using 'Import "+testcase.gConfigTestCase+"(s)' button.");
   $('#dwnlupldTmp').attr('title','To import the '+testcase.gConfigTestCase+'s using the standard excel Template.');
   $('#btnDelete').attr('title','Deletes all '+testcase.gConfigTestCase+'s of the current selected '+testcase.gConfigTestPass+'.');
/***************************************************/
	$('#navHeading tr:eq(4) td').attr('class','activeNav');
    $('#navHeading tr:eq(4) td img').attr('src','/images/Admin/g_Details View.png');

    //--#Rupal comment
    //show.showData();
	show.showData('testcase');
	
	$('.rgTableBread').show();
    if(isPortfolioOn) 
    {
    	$(".prjHead").hide();
		$(".tpHead").hide();
    	createDD.create();
    	$('#clon').attr('title','To  copy '+testcase.gConfigTestCase+'(es) in multiple '+testcase.gConfigTestPass+'es of the same '+testcase.gConfigProject+'/'+testcase.gConfigVersion+'.');//added by Mohini for Hover Ovr Text
    }
    else
    {
    	$('#clon').attr('title','To copy '+testcase.gConfigTestCase+'(es) in multiple '+testcase.gConfigTestPass+'es of the same '+testcase.gConfigProject+'.');//added by Mohini for Hover Ovr Text
    	createDD.createWithoutPort();
    }	

	//testcase.pagination();
	$('#navHeading tr:eq(3) td:eq(1)').css('background-color','#FFFFFF');
	$('.navTabs h2:eq(4)').hide();
	
	$('.navTabs h2:eq(0)').click(function(){
		// Added for DD
		createDD.editMode = 0
		createDD.showDD();

		$('#testCaseContents').hide();
		$('#Pagination').show();
		$('#testCaseGrid').show();
		$('#btnDelete').show();
		$('#divTestCaseClone').hide();
		$('#impExpTemplate').hide();
		$('.navTabs h2').css('color','#7F7F7F');
		$(this).css('color','#000000');
		setTabForCreatNew();
		testcase.flagForClone = false;
		testcase.pagination();
		testcase.gPageIndexCloneGrid=0;
					
	});
	
	
	$('.navTabs h2:eq(1)').click(function(){
		// Added for DD
		createDD.editMode = 0
		createDD.showDD();

		$('#impExpTemplate').hide();
		$('#Pagination').hide();
		$('#testCaseGrid').hide();
		$('#btnDelete').hide();
		$('#divTestCaseClone').hide();
		$('#testCaseContents').show();
		$('.navTabs h2').css('color','#7F7F7F');
		$(this).css('color','#000000');
		$('#noTestCaseDiv').hide();
		testcase.flagForClone = false;
		$('#countDiv').css('display','none');
		setTabForCreatNew();
		CheckForTestPassTesterAvailable();
		testcase.gPageIndex=0;
		testcase.gPageIndexCloneGrid=0;
		
	});
	
	$('.navTabs h2:eq(2)').click(function(){
		// Added for DD
		createDD.editMode = 0
		createDD.showDD();

		$('#impExpTemplate').show();
		$('#Pagination').hide();
		$('#testCaseGrid').hide();
		$('#btnDelete').hide();
		$('#testCaseContents').hide();
		$('#divTestCaseClone').hide();
		$('.navTabs h2').css('color','#7F7F7F');
		$(this).css('color','#000000');
		$('#noTestCaseDiv').hide();
		testcase.flagForClone = false;
		$('#countDiv').css('display','none');
		setTabForCreatNew();
		CheckForTestPassTesterAvailable();
		testcase.gPageIndex=0;
		testcase.gPageIndexCloneGrid=0;
		
	});
	
	$('.navTabs h2:eq(3)').click(function(){
		// Added for DD
		createDD.editMode = 0
		createDD.showDD();

		$('#impExpTemplate').hide();
		$('#Pagination').hide();
		$('#testCaseGrid').hide();
		$('#btnDelete').hide();
		$('#testCaseContents').hide();
		$('.navTabs h2').css('color','#7F7F7F');
		$(this).css('color','#000000');
		$('#noTestCaseDiv').hide();
		testcase.flagForClone = true;
		testcase.ShowCloneTestCase();
		$('#divTestCaseClone').show();
		setTabForCreatNew();
		testcase.gPageIndex=0;
		

	});
	
	$('.navTabs h2:eq(4)').click(function(){
		// Added for DD
		createDD.editMode = 1;
		createDD.hideDD();

		$('#impExpTemplate').hide();
		$('#Pagination').hide();
		$('#testCaseGrid').hide();
		$('#btnDelete').hide();
		$('#divTestCaseClone').hide();
		$('#testCaseContents').show();
		testcase.flagForClone = false;
		$('.navTabs h2').css('color','#7F7F7F');
		$(this).css('color','#000000');
		$('#noTestCaseDiv').hide();
	});
	
	function setTabForCreatNew(){
		$('.navTabs h2:eq(4)').hide();
		testcase.clearFields();
	} 
	
	$("#testStepGrid thead tr td:eq(2)").click(function(){
	    $("#assotestcases").slideToggle("slow");
	  });
	  
	function CheckForTestPassTesterAvailable(){
		//if(show.TestPassIDArr.length == 0)
		if(show.testPassId == '')
		{
		    if(show.projectId == '')
		        testcase.alertBoxForNavigation("Sorry! No "+testcase.gConfigProject.toLowerCase()+" is available for selected "+testcase.gConfigPortfolio.toLowerCase()+" !<br/>Please create the "+testcase.gConfigProject.toLowerCase()+" First.",'project');//Added by Mohini for Resource file
            else
			    testcase.alertBoxForNavigation("<span>Sorry! No "+testcase.gConfigTestPass+" is available for this "+testcase.gConfigProject+"!</span></br><span> Please create the "+testcase.gConfigTestPass+" first.</span>","testpass");//Added by Mohini for Resource file       
		}
		else if($.inArray(show.testPassId,testcase.testpassesWithTester) == -1)
	    {
	    	testcase.alertBoxForNavigation("<span>Sorry! No "+testcase.gConfigTester+" is assigned for this "+testcase.gConfigTestPass+"!</span></br><span> Please assign the "+testcase.gConfigTester+" first.</span>","tester");//Added by Mohini for Resource file      
	    }
	}
},
getTestCases:function()
{
    testcase.TestCaseList = ServiceLayer.GetData("GetTestCaseDetailForTestPassId", show.testPassId, 'TestCase');
},
  
testPassesWithNoTester : new Array(),//:SD
testpassesWithTester:new Array(),
getTestPassesWithNoTester:function()
{
	if($.inArray(show.testPassId,testcase.testpassesWithTester) == -1)
	{
	    var TesterListResult = ServiceLayer.GetData("GetTestersByTestPassID", show.testPassId ,"Testcase");
		var testpassesWithTester = new Array();
		var tpid = '';
		if(TesterListResult != null && TesterListResult != undefined)
		{
			if(TesterListResult.length != 0)
				testcase.testpassesWithTester.push(show.testPassId);
			else
				testcase.testPassesWithNoTester.push(show.testPassId);
		}
		else
			testcase.testPassesWithNoTester.push(show.testPassId);
	}
		//Here****************************************************
},

clearFields:function()
{
		document.getElementById('txttestcname').value = '';
		document.getElementById('desc').value = '-';
		$("#estTime").val(''); 		
		$('#btnUpdate').hide();
		$('#btnSave').show();
		$('#btnCancelNew').show();
		$('#btnCancel').hide();
		$('#addNewTestCase').empty();
		$('#testcaseid1').hide();
		
},

    //Added by Rupal
BulkDelete:function()
{    
	//get the TestPass Id from query string		
	var testPassID = show.testPassId;
    
	    if(testPassID ==undefined)
	    {
	    	Main.hideLoading();
       		testcase.alertBox('No '+testcase.gConfigTestPass+' Available For Deletion');
       		return false; 
        } 
	    else if(testcase.TestCaseList.length == 0)
	    {
	       Main.hideLoading();
	       testcase.alertBox('There are no '+testcase.gConfigTestCase+'s.');
	       return false;
	    } 
		else
		{ 
		    Main.hideLoading();
	
		    $( "#dialog:ui-dialog" ).dialog( "destroy" );
				$( "#divConfirm" ).text('Are you sure you want to delete this '+testcase.gConfigTestCase+'? Doing so will delete all the test scripts within it along with their associations to other '+testcase.gConfigTestCase.toLowerCase()+'s?');//Added by Mohini for resource file	
				$( "#divConfirm" ).dialog
				({
			         autoOpen: false,
			         resizable: false,
			         height:180,
			         modal: true,
			         buttons: {
								"Delete": function(){
														Main.showLoading();
														$( this ).dialog( "close" );
														setTimeout('testcase.bulkDeleteOk2();',200);
														Main.hideLoading();
								                    },
								"Cancel": function(){
														$( this ).dialog( "close" );
														 	 
													}
							  }
				});
				$('#divConfirm').dialog("open");	
		}

},

    //Added by Rupal
bulkDeleteOk2:function()
{
	var data = {"testPassId":show.testPassId};
	var result = ServiceLayer.DeleteData("BulkDeleteTestCase", data, 'TestCase');
	if(result!='' && result != undefined)
	{
	    //if (result[0].Value == "Done")
	    if (result.Success == "Done")
		{
			testcase.clearFields();
			testcase.TestCaseList = [];
			testcase.pagination();
			
			//testcase.alertBox(testcase.gConfigTestCase+"(s) deleted successfully!");
			Main.AutoHideAlertBox(testcase.gConfigTestCase+"(s) deleted successfully!");
		}
		else
			testcase.alertBox('Sorry! Something went wrong, please try again!');
	}
	else
		testcase.alertBox('Sorry! Something went wrong, please try again!');
		
	

},

delTestcase:function(id)
{	
 	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	$( "#divConfirm" ).text('Are you sure you want to delete this '+testcase.gConfigTestCase+'? Doing so will delete all the test scripts within it along with their associations to other '+testcase.gConfigTestCase+'?');//Added by Mohini for resource file	
	$( "#divConfirm" ).dialog
	({
         autoOpen: false,
         resizable: false,
         height:180,
         modal: true,
         buttons: {
					"Delete": function(){
											Main.showLoading();
											$( this ).dialog( "close" );
											setTimeout('testcase.delOk('+id+');',100);
											Main.hideLoading();
					                    },
					"Cancel": function(){
											$( this ).dialog( "close" );
											 	 
										}
				  }
	});
	$('#divConfirm').dialog("open");					
  	 	
},
delOk:function(id)
{
	var data = {"testCaseId":id.toString()};
	var result = ServiceLayer.DeleteData("DeleteTestCase",data ,'Testcase'); 
	if(result!='' && result != undefined)
	{
	    //if (result.Value == "Done")
	        if (result.Success == "Done") 
		{
			testcase.clearFields();
			testcase.gPageIndex = parseInt($('#Pagination span(.current):not(.prev,.next)').text())-1;//to maintain paging :SD
			
			testcase.reArrangeSequenceUsingTestCasesBuffer(id);
			
			for(var ii=0;ii<testcase.TestCaseList.length;ii++)
			{
				if(testcase.TestCaseList[ii].testCaseId == id)
				{
					testcase.TestCaseList.splice(ii,1);
					break;
				}	
			}
			
			testcase.pagination();//:SD
			//testcase.alertBox(testcase.gConfigTestCase+" deleted successfully!");
			Main.AutoHideAlertBox(testcase.gConfigTestCase+" deleted successfully!");
		}
		else
			testcase.alertBox('Sorry! Something went wrong, please try again!');
	}	
	else
		testcase.alertBox('Sorry! Something went wrong, please try again!');

	
},
reArrangeSequenceUsingTestCasesBuffer:function(testCaseID)
{
	var position = -1;
	if(testcase.TestCaseList != undefined && testcase.TestCaseList != null)
	{
		if(testcase.TestCaseList[0].testCaseSeq != undefined && testcase.TestCaseList[0].testCaseSeq!= null)
		{
		    for(var j=0;j< testcase.TestCaseList.length;j++)
			{	
					if(testcase.TestCaseList[j].testCaseId == testCaseID)
			        {	
			        	position = j;
			        	break;
			        }
			}
		}	

		if(position == 0)
		{
			for(var j=1;j< testcase.TestCaseList.length;j++)
            {
				/*obj.push({'ID':testcase.TestCaseList[j]['ID'],
						  'position':(j-1)	
					});
				var res = TestCaseListName.updateItem(obj);	*/
				
				//TBD
				var data={
					  'testCaseId':testcase.TestCaseList[j].testCaseId,
					  'testCaseSeq':(j-1)
				};
				var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase", data ,"TestCase");

				testcase.TestCaseList[j].testCaseSeq = (j-1);

			}
		}
		else if(position!=testcase.TestCaseList.length-1 && position != -1)
		{
			for(var j=position+1;j<testcase.TestCaseList.length;j++)
            {
				/*obj.push({'ID':testcase.TestCaseList[j]['ID'],
						  'position':(j-1)	
					});
				var res = TestCaseListName.updateItem(obj);	*/
				
				//TBD
				var data={
					  'testCaseId':testcase.TestCaseList[j].testCaseId,
					  'testCaseSeq':(j-1)
				};
				var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase", data, "TestCase");

				testcase.TestCaseList[j].testCaseSeq = (j-1);

			}
    	}
    }	
               
},
/*******************************************************************************************************/
	
saveTestCase:function ()
{	
	var testCase= jQuery.trim($('#txttestcname').val());
	testCase= testCase.replace(/\s+/g, " ");
	var desc = document.getElementById('desc').value;
	desc = jQuery.trim(desc);
	var testPassID =new Array();
	var tcflag=0;
	
	if(testCase.indexOf("|") != -1 || desc.indexOf("|") != -1)
	{
		testcase.alertBox("Pipe(|) is not allowed in "+testcase.glblValOfTestcaseName+' and '+testcase.glblvalOfDescription+"!");//Added by Mohini for Resource file	
		Main.hideLoading();
		tcflag= 1;
	}	
	testPassID = show.testPassId;
	
	if(testCase.length == 0 || testPassID == null || testPassID == undefined || testPassID == '')
	{
		if(show.projectId == '')
		{
		 		testcase.alertBox("No "+testcase.gConfigProject+" available under selected "+testcase.gConfigPortfolio+"!");//Added by Mohini for Resource file
		 		Main.hideLoading();
		 		return;
		}
		else if(show.testPassId == '')
		{
		 		testcase.alertBox("No "+testcase.gConfigTestPass+" available under selected "+testcase.gConfigVersion+"!");//Added by Mohini for Resource file
		 		Main.hideLoading();
		 		return;
		}
		else
		{
			testcase.alertBox("Fields marked with asterisk(*) are mandatory!");	
			Main.hideLoading();
			 tcflag= 1;	
			return;
		}			
	}
	var Estimatedtime = trim($("#estTime").val());
	if(Estimatedtime != '')
	{
		if(Estimatedtime.match(/^[0-9]+$/) == null)
		{
			testcase.alertBox("Only integer numbers are allowed in "+testcase.glblvalOfEstimatedTime+")!");//Added by Mohini for Resource file
			Main.hideLoading();
			tcflag= 1;
		}
	}	
	if(testCase.length > 0)	
	{
		  for(var i=0;i<testcase.TestCaseList.length;i++)
		  {
		  	if(Main.filterData(testcase.TestCaseList[i].testCaseName) == Main.filterData(testCase))
		  	{
		  		testcase.alertBox(testcase.gConfigTestCase+' with '+Main.filterData(testCase)+' name already exists!');//Added by Mohini for Resource file
		    	tcflag= 1;
		   	 	Main.hideLoading();
		   	 	break;
		  	}
		  }
	}	
	if(tcflag==0)
	{
	    //Added by Rupal
       /*****Code for mapping************/
  	   if($.inArray(show.testPassId,testcase.testpassesWithTester) == -1)
       {
			testcase.alertBox("You cannot create a "+testcase.gConfigTestCase.toLowerCase()+" unless at least one "+testcase.gConfigTester.toLowerCase()+" has been assigned to the selected "+testcase.gConfigTestPass.toLowerCase()+"(es)!");//Added by Mohini for Resource file       
			Main.hideLoading();
	   }
       else 
	   {
   			desc = (desc.length != 0)? desc : '-';		
			var data={
	        		  'testCaseName':testCase,
					  'testCaseDesp':desc,				  
					  'testPassId':testPassID,
					  'testCaseETT':Estimatedtime,
					  'testCaseSeq':testcase.TestCaseList.length
			};
			var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase", data, "TestCase");
			if(result != '')
			{
			    //if (result[0].Value == "Done")
			        if (result.Success == "Done")
			        {
			            data.testCaseId = result['ID'];
					//data.testCaseId = result[1].Value;
					testcase.TestCaseList.push(data);
					Main.AutoHideAlertBox(testcase.gConfigTestCase+" added successfully");		
					testcase.clearFields();
					$(".navTabs h2:eq(0)").click();
				}
				else
					testpass.alertBox('Sorry! Something went wrong, please try again!');	
			}
			else
				testpass.alertBox('Sorry! Something went wrong, please try again!');	
			 Main.hideLoading();

	    }
	}
},

reset:function()
{
 	Main.showLoading();
	if(testcase.gTestCaseList != null || testcase.gTestCaseList != undefined)
	{
		document.getElementById('txttestcname').value = testcase.gTestCaseList.testCaseName;
		document.getElementById('desc').value = testcase.gTestCaseList.testCaseDesp;
		$("#estTime").val(testcase.gTestCaseList.testCaseETT);			
		var TestPassIDs = testcase.gTestCaseList.testPassId;
		//TestPassIDs = TestPassIDs.split(",");			
	}
	//To hide paging
	$('#divTestCaseCount').hide();
	Main.hideLoading();		
	
	//To enable the Create and View links
	//$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
	//$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
	//$(".navTabs h2:eq(3)").removeAttr("disabled").css("cursor","pointer");

},

updateTestCase:function()
{
	var testCaseName = jQuery.trim($('#txttestcname').val());
	testCaseName= testCaseName.replace(/\s+/g, " ");
	var desc = document.getElementById('desc').value;
	var flag=true;
	desc = jQuery.trim(desc);
	var testPassID =new Array();	
	var tcflag=0;
	
	testPassID = show.testPassId;
				
	if(testCaseName.indexOf("|") != -1 || desc.indexOf("|") != -1)
	{
		testcase.alertBox("Pipe(|) is not allowed in "+testcase.glblValOfTestcaseName+" & "+testcase.glblvalOfDescription+"!");//Added by Mohini for Resource file
		Main.hideLoading();
		tcflag= 1;
	}

	if(testCaseName.length == 0 || testPassID == null || testPassID == undefined || testPassID == '')
	{
		if(show.projectId == '')
		{
		 		testcase.alertBox("No "+testcase.gConfigProject+" available under selected "+testcase.gConfigPortfolio+"!");//Added by Mohini for Resource file
		 		Main.hideLoading();
		 		return;
		}
		else if(show.testPassId == '')
		{
		 		testcase.alertBox("No "+testcase.gConfigTestPass+" available under selected "+testcase.gConfigVersion+"!");//Added by Mohini for Resource file
		 		Main.hideLoading();
		 		return;
		}
		else
		{
			testcase.alertBox("Fields marked with asterisk(*) are mandatory!");	
			Main.hideLoading();
			 tcflag= 1;	
		}	 
	}
	
    ////Added by Rupal
	if(testCaseName.length > 0)
	{
		for(var i=0;i<testcase.TestCaseList.length;i++)
		{
		  	if(Main.filterData(testcase.TestCaseList[i].testCaseName) == Main.filterData(testCaseName) && testcase.TestCaseList[i].testCaseId != testcase.TestCaseIDForUpdate)
		  	{
		  		testcase.alertBox(testcase.gConfigTestCase+' with '+Main.filterData(testCaseName)+' name already exist!');//Added by Mohini for Resource file
			    tcflag= 1;
			    Main.hideLoading();
		   	 	break;
		  	}
		}

	}	
	var Estimatedtime =jQuery.trim($("#estTime").val());
	if(Estimatedtime != '')
	{
		if(Estimatedtime.match(/^[0-9]+$/) == null)
		{
			testcase.alertBox("Only integer numbers are allowed in "+testcase.glblvalOfEstimatedTime+")!");//Added by Mohini for Resource file
			Main.hideLoading();
			tcflag= 1;
		}
	}			 
	if(tcflag==0)
	{
		var seq = '';
		for(var i=0;i<testcase.TestCaseList.length;i++)
		{
			if(testcase.TestCaseIDForUpdate == testcase.TestCaseList[i].testCaseId)
				seq = testcase.TestCaseList[i].testCaseSeq;
		}
		desc = (desc.length != 0)? desc : '-';		
		var data={
				  'testCaseId':testcase.TestCaseIDForUpdate,
        		  'testCaseName':testCaseName,
				  'testCaseDesp':desc,				  
				  'testCaseETT':Estimatedtime,
				  'testPassId':show.testPassId,
				  'testCaseSeq':seq
				  }
				  
		var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase", data, "TestCase");
		for(var ii=0;ii<testcase.TestCaseList.length;ii++)
		{
			if(testcase.TestCaseList[ii].testCaseId == testcase.TestCaseIDForUpdate)
			{
				testcase.TestCaseList.splice(ii,1);
				break;
			}	
		}
		testcase.TestCaseList.push(data);

		//testcase.alertBox(testcase.gConfigTestCase+" updated successfully!");
		Main.AutoHideAlertBox(testcase.gConfigTestCase+" updated successfully!");
      	testcase.clearFields();
		
		// Added for DD
		createDD.editMode = 0;
		createDD.showDD();
		//To show testcase grid tab
		$('.navTabs h2:eq(0)').trigger('click');
		//$('.navTabs h2:eq(1)').text('Create New');
		$('.navTabs h2:eq(1)').show();
		
	}
	
	//To enable the Create and View links
	//$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
	//$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
	//$(".navTabs h2:eq(3)").removeAttr("disabled").css("cursor","pointer");
},

//////////////////////////  ************   Copy Test Case code starts here.   **************   ///////////////////////////////
forTPIDGetTesterFlag:new Array(),
copyTestCase:function(testcaseId)
{
	var msg = '';
	var succ = 0;
	
	var tcDetails = new Array();
	if(testcase.forTCIdGetTCDetails[testcaseId] != undefined)
		tcDetails = testcase.forTCIdGetTCDetails[testcaseId].split("`");
	
	var tpCount = 0;
	var tpNoTesterCount = 0
	var tpId = '';	
	var tpName = '';
	var maineTP = $("#TestPassTitle label").attr('title');
	$("#testPassSelectDiv div div li").each(
	function()
	{
		tpCount++;
		if($(this).children(".mslChk").attr('checked') == true && $(this).children(".mslChk").attr('disabled') == false)
		{
				tpId = $(this).children(".mslChk").attr('Id').split("_")[1];	
				tpName = $(this).children(".mslChk").parent().attr('title');
				
				if(testcase.forTPIDGetTesterFlag[tpId] == '1')
				{
					if($.inArray(tpId,testcase.testPassesWithNoTester) == -1)
					{	
						var data={
							  'testCaseId':testcaseId.toString(),
							  'testPassId':show.testPassId,
							  'destTestPassId':$(this).children(".mslChk").attr('Id').split("_")[1]
						};
						var result = ServiceLayer.InsertUpdateData("CopyTestCase", data , 'Testcase');
						if(result != '' && result != undefined)
						{
							if(result.length>1)
							{
								var roleNames = new Array();
								for(var mm=0;mm<result.length-1;mm++)
									roleNames.push(result[mm]['roleName']);
								msg += 'In the ('+tpName+') there is no tester available with the role ('+roleNames+'). Hence ('+result[0]['testerName']+') with the role ('+roleNames+') is also copied from ('+maineTP+') to ('+tpName+').'
							}
						    else if(result[0].errorValue == "Done")
						//	else if (result.Success == "Done")
							{
								succ = 1;
								msg += testcase.gConfigTestCase+' copied successfully in '+testcase.gConfigTestPass+' "'+tpName+'"!<br/>'
							}
						else if (result[0].errorValue.toLowerCase() == "test case name already exists")
					//	else if (result.Success == "test case name already exists")
							{
								msg += testcase.gConfigTestCase+' with "'+Main.filterData(tcDetails[0])+'" name already exists in '+testcase.gConfigTestPass+' "'+tpName+'"!<br/>'
							}
							else
								msg += 'Sorry something went wrong in '+testcase.gConfigTestPass+' "'+tpName+'"!<br/>';
						}
					}
					else
						msg += 'No '+testcase.gConfigTester+' available in '+testcase.gConfigTestPass+' "'+tpName+'"!<br/>';	
				}
				else
					msg += 'No '+testcase.gConfigTester+' available in '+testcase.gConfigTestPass+' "'+tpName+'"!<br/>';	
				
		}
		else if($(this).children(".mslChk").attr('disabled'))
			tpNoTesterCount++;
			
	});	
	if(tpId=='')
	{
		if(tpNoTesterCount == tpCount)
			testcase.alertBox("No tester(s) available in "+testcase.gConfigTestPass+"(es)! Please assign "+testcase.gConfigTester+" first");
		else
			testcase.alertBox("Please Select "+testcase.gConfigTestPass+"(es)!");//Added by Mohini for Resource file	
		Main.hideLoading();
		return;
	}	
	
	if(msg != '')
		testcase.alertBoxOnRead(msg);
	else	
	{

	  
	  testcase.alertBox('Test Case copied successfully');
	  //  testcase.alertBox(testcase.gConfigTestCase + ' copied successfully in ' + testcase.gConfigTestPass + ' "' + tpName + '"!');
		succ = 1;
	}	
	
	if(succ == 1)
	{
		if($('#containerClonePopUp').is(':visible'))
		{
			$('#containerClonePopUp').hide();
			$('#containerClonePopUp').attr('testcaseId','');
		}
	}
	Main.hideLoading();

},
alertBoxOnRead:function(msg)
{
		$("#divAlert").empty();
		$("#divAlert").append('<br /><fieldset><legend><b>Details</b></legend>'+msg+'</fieldset>');
		$('#divAlert').dialog({modal: true, title: "Copy "+testcase.gConfigTestCase+" "+testcase.gConfigStatus, height:'auto',width:'auto',resizable: false, buttons: { "Ok":function() { $(this).dialog("close");}} });
},

//////////////////////////  ************   Copy Test Case code ends here. **************   ///////////////////////////////


//:SD
updateTestCaseForClone:function(testcaseId)
{
	testcase.gPageIndexCloneGrid = parseInt($('#CloneTestCasePagination span(.current):not(.prev,.next)').text())-1;//to maintain paging :SD
	var flag=true;
	var testPassID =new Array();	
	var tcflag=0;
	
	$('#containerClonePopUp').attr('testcaseId','');
	var tpIdsToBeChecked = new Array();
	var tpIdsDefaultSelected = testcase.associatedTestPassIDsForTestCase[testcaseId];

	//Added for simple Admin process changes:SD
	$("#testPassSelectDiv div div li").each(
		function()
		{
   			if($(this).children(".mslChk").attr('checked') == true)
			{
				testPassID.push('|'+$(this).children(".mslChk").attr('Id').split("_")[1]+'|');	
				if($.inArray($(this).children(".mslChk").attr('Id').split("_")[1],tpIdsDefaultSelected) == -1)
					tpIdsToBeChecked.push('|'+$(this).children(".mslChk").attr('Id').split("_")[1]+'|');				
			}
		});	
		
	if(testPassID == null || testPassID == undefined || testPassID == '')
	{
		//testcase.alertBox("Please Select TestPass(es)!");
		testcase.alertBox("Please Select "+testcase.gConfigTestPass+"(es)!");//Added by Mohini for Resource file	
		Main.hideLoading();
		tcflag= 1;	
	}
	
	//To get testcase name:SD
	var testcaseName='';
	$('#testCaseCloneGrid tbody tr').each(function(){
		if($(this).children('td:eq(0)').text()== parseInt(testcaseId))
		{
			testcaseName = $(this).children('td:eq(1)').text();
		}
	});
	
	
	//code added for validation of testcase name already exist 
	if(testcaseName.length > 0)
	{
		  var testcasejquery='<Query><Where><And><Eq><FieldRef Name="testCaseName" /><Value Type="Text">'+Main.filterData(testcaseName)+'</Value></Eq>';
		  	testcasejquery+='<And><Neq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseId+'</Value></Neq>';
	  	  testcasejquery+='<Contains><FieldRef Name="TestPassID" /><Value Type="Text">'+tpIdsToBeChecked+'</Value></Contains>';
		  testcasejquery+= '</And></And></Where></Query>';
		  var testcasejqueryListItems=testcase.dmlOperation(testcasejquery,'TestCases');
		 if(testcasejqueryListItems!=null && testcasejqueryListItems!=undefined)
		{
			//testcase.alertBox('Test Case with '+Main.filterData(testcaseName)+' name already exist!');
			testcase.alertBox(testcase.gConfigTestCase+' with '+Main.filterData(testcaseName)+' name already exist!');//Added by Mohini for Resource file
		    tcflag= 1;
		    Main.hideLoading();
		}
	}	
	
	if(tcflag==0)
	{
		var listname = jP.Lists.setSPObject(testcase.SiteURL,'TestCases');
		var obj = new Array();
		obj.push({'ID':testcaseId,
				   'TestPassID':testPassID
				});
		var result = listname.updateItem(obj);
		//to update all mapping list for clonned testcases
		testcase.updateTestPassToTestCaseMapping(testcaseId);
	}
	
},

//updateTestPassToTestCaseMapping:function(testCaseID,testPassIDs)//commented 
updateTestPassToTestCaseMapping:function(testCaseID)//:SD
{	    	    
		/* Algorithm:
			1. Query on TestPassToTestCaseMapping and take out the old testpass id
			2. loop (for each testpass id)
			3. 		compare each testpass id with new testpass id
			4.		IF Not match then 
			5.			delete the testpass entry from  TestPassToTestCaseMapping 
			6.			Also delete the associated entries from TestCaseToTestStepMapping
			7.		End IF
			8. End Loop.
			9.For New Test Pass Association
				9.1. Make entry in TestPassToTestCaseMapping 
				9.2. Also make entry in associated TestCaseToTestStepMapping
		*/
		var testPassForClone = new Array();//for testcase.testPassForEdit array:SD
		var associatedTestPassIds = new Array();//for testPassIDs array:SD
		var ParentList = jP.Lists.setSPObject(testcase.SiteURL,'TestPassToTestCaseMapping');
		var ChildList = jP.Lists.setSPObject(testcase.SiteURL,'TestCaseToTestStepMapping');	
		
		//Added for simple Admin process changes:SD
		$("#testPassSelectDiv div div li").each(
			function()
			{
	   			if($(this).children(".mslChk").attr('checked') == true)
				{
					testPassForClone.push($(this).children(".mslChk").attr('Id').split("_")[1]);					
				}
			});	
			
		associatedTestPassIds =  testcase.associatedTestPassIDsForTestCase[testCaseID]; //:SD
				
		//Added by Harshal on 14 Feb 2012/////////////////////
		var allTestPassIDs = new Array();
		var allTestPassIDs2 = new Array();
		
		//$.merge(allTestPassIDs2,testPassIDs);//commented now
		$.merge(allTestPassIDs2,associatedTestPassIds);//:SD
 		//$.merge(allTestPassIDs2,testcase.testPassForEdit);//commented now
 		$.merge(allTestPassIDs2,testPassForClone);//:SD
		
		//to get unique testpassIds
		for(var a=0;a<allTestPassIDs2.length;a++)
		{
			if($.inArray(allTestPassIDs2[a],allTestPassIDs) == -1)
				allTestPassIDs.push(allTestPassIDs2[a]);
		}
	
 		/////////////////////////////////////////////////////// 

		// For adding new TestPass Association in edit mode
		var listname = jP.Lists.setSPObject(testcase.SiteURL,'TestPassToTestCaseMapping');	
		
		//Added by Harshal on 7 Feb 2012
	
		var testPassesToBeRemoved = new Array();
		/*for(var i=0;i<testcase.testPassForEdit.length;i++)
		{
			if($.inArray(testcase.testPassForEdit[i],testPassIDs) == -1)
				testPassesToBeRemoved.push(testcase.testPassForEdit[i]);
		}commented*/
		
		//:SD
		for(var i=0;i<associatedTestPassIds.length;i++)
		{
		 	if($.inArray(associatedTestPassIds[i],testPassForClone) == -1 )
		 	{
		 		testPassesToBeRemoved.push(associatedTestPassIds[i]); 
		 	}
		}
		
		 var addedTestPasses = new Array();
		 /*for(var i=0;i<testPassIDs.length;i++)
		 {
			 	if($.inArray(testPassIDs[i],testcase.testPassForEdit) == -1 )
			 	{
			 		addedTestPasses.push(testPassIDs[i]); 
			 	}
		 }commented*/
		 //:SD
		 for(var i=0;i<testPassForClone.length;i++)
		{
			if($.inArray(testPassForClone[i],associatedTestPassIds) == -1)
				addedTestPasses.push(testPassForClone[i]);
		}
		 
		 
		 //Saving Selected Test Pass(es) name according to their ID(s)
		
			

		//Here bulk data is not handle as in one project there is very little possibility of more than 148 Test Passes
		//Added by HRW 0n 5 Sep 2012
		var ParentResult = new Array();
		
		var iteration= Math.ceil((allTestPassIDs.length)/147);//147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
		var iterationStartPoint=0;
		for(var y=0;y<iteration;y++)
	    {
		   if(y!=iteration-1)
		   {
		 		var q = '';
				var camlQuery = '<Query><Where>';
          					
				for(var u=0+iterationStartPoint;u<(147+iterationStartPoint)-1;u++)			 
				{
					camlQuery +='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[u]+'</Value></Eq>';
					q += '</Or>';
		        }			

				camlQuery += '<Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+allTestPassIDs[u]+'</Value></Eq>';
				
				if(q != '')
					camlQuery += q;
			
				camlQuery +='</Where><ViewFields></ViewFields></Query>';	
				
				iterationStartPoint+=147;  
				var Result = testcase.dmlOperation(camlQuery,'TestPassToTestCaseMapping');
				if(Result != null && Result != undefined)
					$.merge(ParentResult,Result);
		   }
		   
		    var q = '';
			var camlQuery = '<Query><Where>';
      					
			for(var u=iterationStartPoint;u<allTestPassIDs.length-1;u++)			 
			{
				camlQuery +='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+allTestPassIDs[u]+'</Value></Eq>';
				q += '</Or>';
	        }			

			camlQuery += '<Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+allTestPassIDs[u]+'</Value></Eq>';
			
	        if(q != '')
				camlQuery += q;
		
			camlQuery +='</Where><ViewFields></ViewFields></Query>';	
			
			var Result = testcase.dmlOperation(camlQuery,'TestPassToTestCaseMapping');
			if(Result != null && Result != undefined)
				$.merge(ParentResult,Result);

		}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    	
	
//////////////////////////////////Move on top by Harshal on 15 Feb 2012////////////////////////////////////////////////////	
		 var TestCasesForAddedTPID = new Array();//Added on 12 April
		 var ParentIDsAndSPUserIDforRemovedTPID = new Array();
		 var ParentMappingIDsOfRemovedTestPasses = new Array();//Move to up on 12 March
		 var ParentResultIDOfSelectedTestCase = new Array();
		 if(ParentResult.length != 0)	
		 {
			for(var bb=0;bb<ParentResult.length;bb++)
            {
        		if(ParentResult[bb]['TestCaseID'] == testCaseID)
            	{
            		ParentResultIDOfSelectedTestCase.push(ParentResult[bb]['ID']);
            	}
            	//Added on 12 April for optimization
            	if($.inArray(ParentResult[bb]['TestPassID'],addedTestPasses) !=-1 )
            	{
            		if(TestCasesForAddedTPID[ ParentResult[bb]['TestPassID'] ] == undefined)
            			TestCasesForAddedTPID[ ParentResult[bb]['TestPassID'] ] = ParentResult[bb]['TestCaseID'];
            		else
            		{
            			var TCIDs = TestCasesForAddedTPID[ ParentResult[bb]['TestPassID'] ].split(",");//To get only unique Test Cases
            			if($.inArray(ParentResult[bb]['TestCaseID'],TCIDs) == -1)
            				TestCasesForAddedTPID[ ParentResult[bb]['TestPassID'] ] += "," + ParentResult[bb]['TestCaseID'];
            		}		
            	}
            	if($.inArray(ParentResult[bb]['TestPassID'],testPassesToBeRemoved) != -1 && ParentResult[bb]['TestCaseID'] == testCaseID)
            		ParentMappingIDsOfRemovedTestPasses.push(ParentResult[bb]['ID']);
            		
            	if($.inArray(ParentResult[bb]['TestPassID'],testPassesToBeRemoved) != -1 )
            	{
            		if(ParentIDsAndSPUserIDforRemovedTPID[ ParentResult[bb]['TestPassID'] ] == undefined)
            			ParentIDsAndSPUserIDforRemovedTPID[ ParentResult[bb]['TestPassID'] ] = ParentResult[bb]['ID']+"|"+ParentResult[bb]['SPUserID'];
            		else
            			ParentIDsAndSPUserIDforRemovedTPID[ ParentResult[bb]['TestPassID'] ] += "," + ParentResult[bb]['ID']+"|"+ParentResult[bb]['SPUserID'];
            	}	
            }	
         }  	

		var TSID=new Array();
		var TSRoleID=new Array();
		var ChildListItemsToBeDeleted = new Array();//Added on 12 April 2012
		if(ParentResultIDOfSelectedTestCase.length != 0)
		{
			//Ankita:8/21/2012 Bulk data handling
			var TCToTSList=jP.Lists.setSPObject(testcase.SiteURL,'TestCaseToTestStepMapping');
			var TCToTSResult= new Array();
			var numberOfIterations = Math.ceil((ParentResultIDOfSelectedTestCase.length)/147);
			var iterationPoint = 0;
			var queryOnTCToTS;
			var OrEndTags;
			for(var y=0;y<numberOfIterations-1;y++)
			{
				queryOnTCToTS= '<Query><Where>';
				OrEndTags='';
				for(var ii=iterationPoint ;ii< (147+iterationPoint-1);ii++)
				{
					queryOnTCToTS+= '<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResultIDOfSelectedTestCase[ii]+'</Value></Eq>';
					OrEndTags +='</Or>';
				}
				queryOnTCToTS+= '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResultIDOfSelectedTestCase[ii]+'</Value></Eq>';
				queryOnTCToTS += OrEndTags;
				queryOnTCToTS+='</Where></Query>';
				var Result = TCToTSList.getSPItemsWithQuery(queryOnTCToTS).Items;
				if(Result !=null && Result != undefined)
					$.merge(TCToTSResult,Result);
				iterationPoint +=147;
			}
			queryOnTCToTS= '<Query><Where>';
			OrEndTags='';
			for(var ii=iterationPoint ;ii<ParentResultIDOfSelectedTestCase.length-1;ii++)
			{
				queryOnTCToTS+= '<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResultIDOfSelectedTestCase[ii]+'</Value></Eq>';
				OrEndTags +='</Or>';
			}
			queryOnTCToTS+= '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+ParentResultIDOfSelectedTestCase[ii]+'</Value></Eq>';
			queryOnTCToTS += OrEndTags;
			queryOnTCToTS+='</Where></Query>';
			var Result = TCToTSList.getSPItemsWithQuery(queryOnTCToTS).Items;
			if(Result !=null && Result != undefined)
				$.merge(TCToTSResult,Result);

			if(TCToTSResult!=null && TCToTSResult!=undefined)
			{
				
				for(var qq=0;qq<TCToTSResult.length;qq++)
				{
					var index = $.inArray(TCToTSResult[qq]['TestStep'],TSID); 
					if(index == -1)
					{
						TSID.push(TCToTSResult[qq]['TestStep']);
						TSRoleID.push(TCToTSResult[qq]['Role']);
					}
					else
					{
						TSRoleID[index] +="," + TCToTSResult[qq]['Role']; // to take all the roles for a test step
					}
					//Added on 12 April for performance improvement
					if($.inArray(TCToTSResult[qq]['TestPassMappingID'],ParentMappingIDsOfRemovedTestPasses) != -1)
						ChildListItemsToBeDeleted.push(TCToTSResult[qq]['ID']);
				}
			}
		}
/////////////////////////  End of Move on Top  //////////////////////////////////////////////////////////////////////////////////////////////	
		//Code modified by Harshal on 1 March
			var testStepRole=new Array();
			var allRolesInAllTestSteps=new Array();
			for(var pp=0;pp<TSRoleID.length;pp++)//Loop for all test steps roles
			{
				var testStepRoleVariable;
				testStepRoleVariable= TSRoleID[pp];
				testStepRole=testStepRoleVariable.split(",");//One Test Step can have more than one roles
				for(var qq=0;qq<testStepRole.length;qq++)
				{	
				    if($.inArray(testStepRole[qq],allRolesInAllTestSteps)==-1)
						allRolesInAllTestSteps.push(testStepRole[qq]);
				
				}
			}
		 ////////////////Insertation logic for inserting new entries in Parrent List,Child List and Tester List change by Harshal on 7 Feb 2012////////////////////////////////////////// 
		 for(var i=0;i<addedTestPasses.length;i++)
		 {
		 	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				/*********************** Adding Tester in Tester List (Added by Harshal) ************************************************/
				
				////////////////////// Added by Harshal on 14 Feb 2012 /////////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				for(var bb=0;bb<allRolesInAllTestSteps.length;bb++)
				{
					var testetSPUserIDForHiddenTestPass=new Array();
					var testerList = jP.Lists.setSPObject(testcase.SiteURL,'Tester');
					var queryOnTesterWithNewTestPass ='<Query><Where><And><Eq><FieldRef Name="RoleID" /><Value Type="Number">'+allRolesInAllTestSteps[bb]+'</Value></Eq><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+addedTestPasses[i]+'</Value></Eq></And></Where>'+
					'<ViewFields><FieldRef Name="ID" /><FieldRef Name="SPUserID" /></ViewFields></Query>';
					var testerResultForNewTestPass= testerList.getSPItemsWithQuery(queryOnTesterWithNewTestPass).Items;
					if(testerResultForNewTestPass==null || testerResultForNewTestPass==undefined)//If any one Test Pass(Out of The Test Passes for edit) don't have any tester with selected role
					{
						
						var testerList2 = jP.Lists.setSPObject(testcase.SiteURL,'Tester');
						var numberOfIterations = Math.ceil(testcase.testpassIDsForUpdate.length/147);
						var iterations =0;
						var queryOnTesterWithOldTestPass;
						var	orEndTags;
						var testerResultForOldTestPass;
						for(var y=0; y<numberOfIterations-1; y++)
						{
							queryOnTesterWithOldTestPass= '<Query><Where>';
							orEndTags='';
							for(var ii=iterations; ii<(iterations+147)-1; ii++)
							{
								queryOnTesterWithOldTestPass+= '<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testcase.testpassIDsForUpdate[ii]+'</Value></Eq>';
								orEndTags +='</Or>';
							}
							queryOnTesterWithOldTestPass+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testcase.testpassIDsForUpdate[ii]+'</Value></Eq>';
							queryOnTesterWithOldTestPass+= orEndTags;
							queryOnTesterWithOldTestPass+='</Where></Query>';
							var TresultForOldTPresult= testerList2.getSPItemsWithQuery(queryOnTesterWithOldTestPass).Items;
							if(TresultForOldTPresult!= null && TresultForOldTPresult!=undefined)			
								$.merge(testerResultForOldTestPass,TresultForOldTPresult); 
							iterations +=147;
						}
						queryOnTesterWithOldTestPass= '<Query><Where>';
						orEndTags='';
						for(var ii=iterations; ii<testcase.testpassIDsForUpdate.length-1; ii++)
						{
							queryOnTesterWithOldTestPass+= '<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testcase.testpassIDsForUpdate[ii]+'</Value></Eq>';
							orEndTags +='</Or>';
						}
						queryOnTesterWithOldTestPass+= '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testcase.testpassIDsForUpdate[ii]+'</Value></Eq>';
						queryOnTesterWithOldTestPass+= orEndTags;
						queryOnTesterWithOldTestPass+='</Where></Query>';
						var TresultForOldTPresult= testerList2.getSPItemsWithQuery(queryOnTesterWithOldTestPass).Items;
						if(TresultForOldTPresult!= null && TresultForOldTPresult!=undefined)			
							$.merge(testerResultForOldTestPass,TresultForOldTPresult); 

						if(testerResultForOldTestPass!=null && testerResultForOldTestPass!=undefined)
						{
							var testerRole1 = new Array();
							var Obj=new Array();
							var flagForOnlyOneTestPass = false;
							var uniqueRole=new Array();
							for(var iii=0;iii<testerResultForOldTestPass.length;iii++)
							{
									if(parseInt(testerResultForOldTestPass[iii]['RoleID']).toString() == allRolesInAllTestSteps[bb] && flagForOnlyOneTestPass == false)
									{
										flagForOnlyOneTestPass = true;
										testetSPUserIDForHiddenTestPass = testerResultForOldTestPass[iii]['SPUserID'];
									}	
									if(flagForOnlyOneTestPass == true && testerResultForOldTestPass[iii]['SPUserID'] == testetSPUserIDForHiddenTestPass)
									{
										if($.inArray(parseInt(testerResultForOldTestPass[iii]['RoleID']).toString(),uniqueRole) == -1)
										{
											uniqueRole.push(parseInt(testerResultForOldTestPass[iii]['RoleID']).toString());
											Obj.push({ 'ProjectID' :testerResultForOldTestPass[iii]['ProjectID'],
											   'TestPassID':addedTestPasses[i],
											   'RoleID':testerResultForOldTestPass[iii]['RoleID'],
											   'SPUserID':testerResultForOldTestPass[iii]['SPUserID'],
											   'TesterName':testerResultForOldTestPass[iii]['TesterName'],
											   'TesterFullName':testerResultForOldTestPass[iii]['TesterFullName']
											 });
										}	 
									}
							}
							
							if(Obj.length!=0)
								var r = testerList2.updateItem(Obj);	
								
							/////////// Added by Harshal on 14 Feb 2012 Inserting the new entry in Parent Mapping List for new Tester with all the other Test Case(s) of Added Test Pass //////
							if(TestCasesForAddedTPID[ addedTestPasses[i] ] !=undefined)
							{
								var OtherTestCasesForAddedTestPass = TestCasesForAddedTPID[ addedTestPasses[i] ].split(",");
								var parentMappingList = jP.Lists.setSPObject(testcase.SiteURL,'TestPassToTestCaseMapping');
								for(var cc=0;cc<OtherTestCasesForAddedTestPass.length;cc++)
								{
									var Obj = new Array();
									Obj.push({ 
												   'Title' :'TestPassToTestCaseMapping',
												   'TestPassID':addedTestPasses[i],
												   'TestCaseID':OtherTestCasesForAddedTestPass[cc],
												   'status': 'Not Completed',
												   'SPUserID':testetSPUserIDForHiddenTestPass
											});
										var r = parentMappingList.updateItem(Obj);
								}
							}	
							
							/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
							testcase.updateMasterList(addedTestPasses[i],testetSPUserIDForHiddenTestPass,allRolesInAllTestSteps[bb]);
						}	
					}
					else
					{
						testcase.updateMasterList2(addedTestPasses[i],testerResultForNewTestPass,allRolesInAllTestSteps[bb]);
					}
				}	
				
				////////////End of Adding Tester(s) in Test Pass and New entry in My Activity List//////////////////// 
				
				
				//Added on 31 Jan by Harshal For adding Roles in All ROles cloumn of Test Pass/////////////////////// 
				
				var testPassList = jP.Lists.setSPObject(testcase.SiteURL,'TestPass');	
				var testPassQuery='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+addedTestPasses[i]+'</Value></Eq></Where><ViewFields><FieldRef Name="AllRoles"/></ViewFields></Query>';
				var allRolesInTestPass=testPassList.getSPItemsWithQuery(testPassQuery).Items;
				if(allRolesInTestPass[0]["AllRoles"]=="-1")
				{
					if(allRolesInAllTestSteps.length!=0)//If Test case don't have any test steps added by Harshal on 9 Feb 2012(Bug ID 643)
					{
						var obj=new Array;
						obj.push({
									'ID':addedTestPasses[i],
									'AllRoles':allRolesInAllTestSteps
								});
						var updateTestPass=testPassList.updateItem(obj);
					}	
				}
				else//Test Pass can have other test cases and these test cases can have Test Steps with other roles too
				{
					var allRoles=new Array();
					if(allRolesInTestPass[0]["AllRoles"]!=undefined)
						allRoles = allRolesInTestPass[0]["AllRoles"].split(",");
					$.merge(allRoles,allRolesInAllTestSteps);
					//allRoles = $.unique(allRoles);
					var obj=new Array;
					obj.push({
								'ID':addedTestPasses[i],
								'AllRoles':allRoles
							});
					var updateTestPass=testPassList.updateItem(obj);
				}
				///////////////////////////////////////////////////////////////////////////////////////////////////////////////
				
				// insert new Mapping Here (New Code Added on 1 Feb 2012 )
				
				/*	1.Query on Tester List using Test Pass ID and All the Roles of Test Steps under selected Test Case
				  	2.We get all the Tester(s) of the Test Pass for All the Roles of Test Steps under selected Test Case
				  	3.Loop for founding Testers
				  		3.A.Insert new entry in Parent List for the Tester 
				  		3.B.Get all the ROle for that Tester 
				  		4.C.Loop for all the Test Steps under selected Test Case
				  		4.C.a.Get the Role(s) for the Test Step
				  		4.C.a.1.Loop for the Test Step Role(s)
				  		4.C.a.2.Check if Test Step Role is similer to the Tester Role 
				  		4.C.a.3.If it is similer then add the new entry in Child mapping list
				*/
				
				
				var queryOnTesterList = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+addedTestPasses[i]+'</Value></Eq></Where></Query>';
				
				var testerResult1 = testcase.dmlOperation(queryOnTesterList,'Tester');
				
				/////////////////////////////////// Added by Harshal on 13 feb 2012 for geting the Role(s) for Each Tester in Added Test Pass /////////////////////////////////////////////////
				//Store all the Roles for particular tester in Test Pass
				var RolesForSPUserID = new Array();
				
				 for(var j=0;j<testerResult1.length;j++)
		         {
		         	var SPUserID = testerResult1[j]["SPUserID"];
					if(RolesForSPUserID[SPUserID] == undefined)
						RolesForSPUserID[SPUserID] = parseInt(testerResult1[j]['RoleID']).toString();
					else
						RolesForSPUserID[SPUserID] +=	"," + parseInt(testerResult1[j]['RoleID']).toString();
		         }

			    /////////////////////////////////////////////////////////////////////////////////////////////////////
                if(testerResult1!=null&&testerResult1!=undefined)
                {
	                var TesterBuffer = new Array(); 
		            for(var j=0;j<testerResult1.length;j++)
		            {
						if($.inArray(testerResult1[j]['SPUserID'],TesterBuffer)==-1)
						{
							TesterBuffer.push(testerResult1[j]['SPUserID']);	
							
						}			
				    }
	               
		        	for(var po=0;po<TesterBuffer.length;po++) 
					{
						var obj = new Array();								
						obj.push({ 'Title' :'TestPassToTestCaseMapping',
								   'TestPassID':addedTestPasses[i],
								   'TestCaseID':testCaseID,
								   'status': 'Not Completed',
								   'SPUserID' :TesterBuffer[po]
					   });
						var res = listname.updateItem(obj);
						
						var testerRole=new Array();
						
						testerRole = RolesForSPUserID[TesterBuffer[po]].split(",");
						var testStepRole=new Array();
						for(var qq=0;qq<TSID.length;qq++)//Loop for all Test Steps in Test Case
						{
							var roleIDVariable;
					        roleIDVariable = TSRoleID[qq];
					        testStepRole = roleIDVariable.split(",");
					        for(var rr=0;rr<testerRole.length;rr++)//Loop for all Roles In Test Step
					        {
					        	if($.inArray(testerRole[rr],testStepRole)!=-1)//Check if Test Step Role is similer to the Tester Role 
					        	{
									var Obj = new Array();								
									Obj.push({ 'Title' :'TestCaseToTestStepMapping',
											   'TestPassMappingID':res.ID,
											   'TestStep':TSID[qq],
											   'status': 'Not Completed',
											   'Role':testerRole[rr],
											   'TestPassID':addedTestPasses[i],	//Added by HRW on 19 Dec 2013
											   'TestCaseID':testCaseID,
											   'SPUserID':TesterBuffer[po]
											 });
									var r = ChildList.updateItem(Obj);
								}		
							}
						}	
					}
					
					
				}
				///////////////////////////////// End Of Insertation of New Mapping ///////////////////////////////////////////////////////////////////////////

		 }
		 //////////////////////////////////////End of Insertation Logic on Parrent List,Child List and Tester List////////////////////////////////////////////////
		 
		 
		 ////////////////////////////////////////Deletion Logic from Parrent Mapping, Child Mapping and My Activity List change by Harshal on 7 Feb 2012//////////////////////////////////////
		 
		
		
		/******************Deleting From Parrent Mapping and Child Mapping List****************************/
		if(testPassesToBeRemoved.length!=0)
		{ 
			if(ParentMappingIDsOfRemovedTestPasses.length != 0)
			{
				if(ChildListItemsToBeDeleted.length != 0)
				{
					for(var kk=0;kk<ChildListItemsToBeDeleted.length;kk++)
					{
						var res = ChildList.deleteItem(ChildListItemsToBeDeleted[kk]);
					}
					if(addedTestPasses.length == 0)//Added on 12 April 2012 If Test Case association is only removed not added on other Test Pass(es)
					{
						//TO find if the test step(s) of selected test case is/are present in other test cases
						var ActionList = jP.Lists.setSPObject(testcase.SiteURL,'Action');
						
						/*if(TSID.length<=147)
						{
							var q ='';
							var queryOnChildList= '<Query><Where>';
							for(var ii=0;ii<TSID.length-1;ii++)
							{
								queryOnChildList+= '<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[ii]+'</Value></Eq>';
								q +='</Or>';	
							}	
							queryOnChildList+= '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[ii]+'</Value></Eq>';
							if(q != '')
								queryOnChildList+= q;
							queryOnChildList+='</Where><ViewFields><FieldRef Name="TestStep" /></ViewFields></Query>';
							var result =testcase.dmlOperation(queryOnChildList,'TestCaseToTestStepMapping');
								if(result !=null && result !=undefined)
							var childListResult =result;
						}
						else
						{*/
						
							var childListResult = new Array();
							//var numberOfIterations = Math.ceil((teststep.TSID.length)/147);
							var numberOfIterations = Math.ceil((TSID.length)/147);
							var iterationPoint = 0;
							var queryOnChildList;
							var OrEndTags;
							for(var y=0;y<numberOfIterations-1;y++)
							{
								queryOnChildList = '<Query><Where>';
								OrEndTags ='';
								for(var ii=iterationPoint ;ii< (147+iterationPoint-1);ii++)
								{
									queryOnChildList += '<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[ii]+'</Value></Eq>';
									OrEndTags +='</Or>';	
								}
								queryOnChildList+= '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[ii]+'</Value></Eq>';
								queryOnChildList+= OrEndTags;
								queryOnChildList+='</Where><ViewFields><FieldRef Name="TestStep" /></ViewFields></Query>';
								var result =testcase.dmlOperation(queryOnChildList,'TestCaseToTestStepMapping');
								if(result !=null && result !=undefined)
									$.merge(childListResult,result);
								iterationPoint +=147;
							}
							 queryOnChildList = '<Query><Where>';
							 OrEndTags='';
							 //for(var ii=iterationPoint ;ii<teststep.TSID.length-1;ii++)
							 for(var ii=iterationPoint ;ii<TSID.length-1;ii++)
							 {
								 queryOnChildList += '<Or><Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[ii]+'</Value></Eq>';
								 OrEndTags +='</Or>';	
							 }
							 queryOnChildList+= '<Eq><FieldRef Name="TestStep" /><Value Type="Text">'+TSID[ii]+'</Value></Eq>';
							 queryOnChildList+= OrEndTags;
							 queryOnChildList+='</Where><ViewFields><FieldRef Name="TestStep" /></ViewFields></Query>';
							 var result =testcase.dmlOperation(queryOnChildList,'TestCaseToTestStepMapping');
							 if(result !=null && result !=undefined)
									$.merge(childListResult,result);
						//}						
						
						if(childListResult != null && childListResult != undefined)
						{
							var TestSteps = new Array();
							for(var aa=0;aa<childListResult.length;aa++)
							{
								if($.inArray(childListResult[aa]['TestStep'],TestSteps) == -1 )
									TestSteps.push(childListResult[aa]['TestStep']);
							}
							if(TestSteps.length != TSID.length)
							{
								for(var ss=0;ss<TSID.length;ss++)
								{
									if($.inArray(TSID[ss],TestSteps) == -1)//Delete only these test steps which are not present in other test cases
										var res = ActionList.deleteItem(TSID[ss]);
								}	
							}		
						}
						else
						{
							for(var ss=0;ss<TSID.length;ss++)
								var res = ActionList.deleteItem(TSID[ss]);
						}
							
					}
				}
				 for(var mm=0;mm<ParentMappingIDsOfRemovedTestPasses.length;mm++)	
					var res2 = ParentList.deleteItem(ParentMappingIDsOfRemovedTestPasses[mm]);
			}
		}	
			
			/******************************Deleting From MyActivity List added by by Harshal on 7 Feb and 8 Feb ***************************************/
		/*
			A.First check if Removed Test Pass(s) has any other Test Case(s).
			B.If the Removed Test Pass has some other Test Case(s)
				1.Loop for all Roles In TestSteps(Test Steps in Selected Test Case)
				2.Then check for each role there is test step present in test case(s) of removed Test Pass or not 
				3.If not then delete all the entries in My Activity List for the Removed Test Pass and Role
			C.If not then Remove all entries in My Acivity list for the Removed Test Pass(es) 	
		
		*/
		var CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity = new Array();
		var CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity = new Array(); 
		var SPUserIDForParentID = new Array();
		for(var i=0;i<testPassesToBeRemoved.length;i++)
		{
			var roleHasNoTestStep = new Array();
			if(ParentIDsAndSPUserIDforRemovedTPID[ testPassesToBeRemoved[i] ] !=undefined)
			{
				var TPTCItems = ParentIDsAndSPUserIDforRemovedTPID[ testPassesToBeRemoved[i] ].split(",");
				for(var pp=0;pp<allRolesInAllTestSteps.length;pp++)
				{
					//ankita:8/24/2012 Bulk data handling
					if(TPTCItems.length<=147)
					{
						var q = '';
						var queryOnChildList= '<Query><Where><And><Eq><FieldRef Name="Role" /><Value Type="Text">'+allRolesInAllTestSteps[pp]+'</Value></Eq>';
						for(var ii=0;ii<TPTCItems.length-1;ii++)
						{
							queryOnChildList+= '<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+TPTCItems[ii].split("|")[0]+'</Value></Eq>';
							SPUserIDForParentID[ TPTCItems[ii].split("|")[0] ] = TPTCItems[ii].split("|")[1];
							q +='</Or>';
						}	
						queryOnChildList+= '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+TPTCItems[ii].split("|")[0]+'</Value></Eq>';
						SPUserIDForParentID[ TPTCItems[ii].split("|")[0] ] = TPTCItems[ii].split("|")[1];
						if(q != '')
							queryOnChildList+= q;
						queryOnChildList+='</And></Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="TestPassMappingID" /><FieldRef Name="status" /></ViewFields></Query>';
	
						var childListResult = testcase.dmlOperation(queryOnChildList,'TestCaseToTestStepMapping');	
					}
					else
					{
						var numberOfIterations= Math.ceil(TPTCItems.length/147);
						var iterations=0;
						var queryOnChildList;
						var orEndTags;
						var childListResult= new Array();
						for(var y=0; y<numberOfIterations-1; y++)
						{
							queryOnChildList= '<Query><Where><And><Eq><FieldRef Name="Role" /><Value Type="Text">'+allRolesInAllTestSteps[pp]+'</Value></Eq>';
							orEndTags='';
							for(var ii=iterations; ii<(iterations+147)-1; ii++)
							{
								queryOnChildList+= '<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+TPTCItems[ii].split("|")[0]+'</Value></Eq>';
								SPUserIDForParentID[ TPTCItems[ii].split("|")[0] ] = TPTCItems[ii].split("|")[1];
								orEndTags +='</Or>';
							}
							queryOnChildList+= '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+TPTCItems[ii].split("|")[0]+'</Value></Eq>';
							SPUserIDForParentID[ TPTCItems[ii].split("|")[0] ] = TPTCItems[ii].split("|")[1];
							queryOnChildList+= orEndTags;
							queryOnChildList+='</And></Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="TestPassMappingID" /><FieldRef Name="status" /></ViewFields></Query>';
							var result= testcase.dmlOperation(queryOnChildList,'TestCaseToTestStepMapping');
							if(result!= null && result!= undefined)
								$.merge(childListResult,result);	
							iterations+=147;
						}
						queryOnChildList= '<Query><Where><And><Eq><FieldRef Name="Role" /><Value Type="Text">'+allRolesInAllTestSteps[pp]+'</Value></Eq>';
						orEndTags='';
						for(var ii=iterations; ii<TPTCItems.length-1; ii++)
						{
							queryOnChildList+= '<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+TPTCItems[ii].split("|")[0]+'</Value></Eq>';
							SPUserIDForParentID[ TPTCItems[ii].split("|")[0] ] = TPTCItems[ii].split("|")[1];
							orEndTags +='</Or>';
						}
						queryOnChildList+= '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+TPTCItems[ii].split("|")[0]+'</Value></Eq>';
						SPUserIDForParentID[ TPTCItems[ii].split("|")[0] ] = TPTCItems[ii].split("|")[1];
						queryOnChildList+= orEndTags;
						queryOnChildList+='</And></Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="TestPassMappingID" /><FieldRef Name="status" /></ViewFields></Query>';
						var result= testcase.dmlOperation(queryOnChildList,'TestCaseToTestStepMapping');
						if(result!= null && result!= undefined)
							$.merge(childListResult,result);	
					}
					if(childListResult == undefined)
					{
						roleHasNoTestStep.push(allRolesInAllTestSteps[pp]);
						var queryOnMyActivity='<Query><Where><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassesToBeRemoved[i]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+allRolesInAllTestSteps[pp]+'</Value></Eq></And></Where>'+
											  '<ViewFields><FieldRef Name="ID" /></ViewFields></Query>';	
						var myActivityList=jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
						var myActivityItem=myActivityList.getSPItemsWithQuery(queryOnMyActivity).Items;
						if(myActivityItem!=null && myActivityItem!=undefined)
						{
							for(var zz=0;zz<myActivityItem.length;zz++)
								var delMyActivity = myActivityList.deleteItem(myActivityItem[zz]['ID']);
						}

					}
					else
					{
						for(var ss=0;ss<childListResult.length;ss++)
						{
							if(childListResult[ss]['status'] == "Not Completed")
								CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity.push(testPassesToBeRemoved[i] +"|"+ SPUserIDForParentID[childListResult[ss]['TestPassMappingID']]+"|"+ allRolesInAllTestSteps[pp]);
							else	
								CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity.push(testPassesToBeRemoved[i] +"|"+ SPUserIDForParentID[childListResult[ss]['TestPassMappingID']]+"|"+ allRolesInAllTestSteps[pp]);
						}
					}	
				}
				if(roleHasNoTestStep.length!=0)
				{
					var TestPassList = jP.Lists.setSPObject(testcase.SiteURL,'TestPass');
					var queryOnTestPass = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testPassesToBeRemoved[i]+'</Value></Eq></Where><ViewFields><FieldRef Name="AllRoles" /></ViewFields></Query>';
					var TestPassResultForAllRole = testcase.dmlOperation(queryOnTestPass,'TestPass');
					if(TestPassResultForAllRole!=null && TestPassResultForAllRole!=undefined)
					{
						var allRolesInTestPass = TestPassResultForAllRole[0]['AllRoles'].split(",");
						var remainingRoles = new Array();
						for(var ss=0;ss<allRolesInTestPass.length;ss++)
						{
							if($.inArray(allRolesInTestPass[ss],roleHasNoTestStep)==-1)
								remainingRoles.push(allRolesInTestPass[ss]);
						}
						var Obj = new Array();
						if(remainingRoles.length != 0)
							Obj.push({
										'ID':testPassesToBeRemoved[i],
										'AllRoles' :remainingRoles
									});
						else
							Obj.push({
										'ID':testPassesToBeRemoved[i],
										'AllRoles' :-1
									});		
						var res = TestPassList.updateItem(Obj);

					}	
				}
			}
			else
			{
				var queryOnMyActivity='<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassesToBeRemoved[i]+'</Value></Eq></Where>'+
												  '<ViewFields><FieldRef Name="ID" /></ViewFields></Query>';	
				var myActivityList=jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
				var myActivityItem=myActivityList.getSPItemsWithQuery(queryOnMyActivity).Items;
				if(myActivityItem!=null && myActivityItem!=undefined)
				{
					for(var zz=0;zz<myActivityItem.length;zz++)
						var delMyActivity = myActivityList.deleteItem(myActivityItem[zz]['ID']);
				}
				
				
				var TestPassList = jP.Lists.setSPObject(testcase.SiteURL,'TestPass');
				var Obj = new Array();
				Obj.push({
							'ID':testPassesToBeRemoved[i],
							'AllRoles' :-1
						});
				var res = TestPassList.updateItem(Obj);
			}

		}
		if(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity.length !=0)
		{			
			//Ankita:8/24/2012 Bulk Data Handling
			if(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity.length<=147)	
			{						
				var queryForMyActivity = '<Query><Where>';	
				var bufferQuery;
				var OrCount=0;
				var OneOrForOneDataElement = true; 
				var orEndTags='';
				for(var i=0;i<CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity.length-1;i++)
		        {
					if($.inArray(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i],CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity)==-1)
					{
						queryForMyActivity += '<Or><And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And>';  
						bufferQuery ='<Query><Where><And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And></Eq></Where></Query>' 
						OrCount++;
						orEndTags='</Or>';
					}											
		
				}
				if($.inArray(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i],CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity)==-1)
				{	queryForMyActivity += '<And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And>';  
					OneOrForOneDataElement = false;
				}
				queryForMyActivity += orEndTags;
				
		        queryForMyActivity += '</Where></Query>';
		        
		        if(OneOrForOneDataElement == true &&  OrCount==1)
		        	queryForMyActivity = bufferQuery;
		        if(queryForMyActivity != '<Query><Where></Where></Query>')	
				{
		
		            var MyActivityResult = testcase.dmlOperation(queryForMyActivity,'MyActivity');
		           
				 }
		  	}
		  	else
		  	{
		  		var numberOfIterations= Math.ceil(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity.length/147);
		  		var iterations=0;
		  		var queryForMyActivity;
		  		var orEndTags;
		  		var MyActivityResult= new Array();
		  		var bufferQuery;
				var OrCount=0;
				var OneOrForOneDataElement = true; 
		  		for(var y=0; y<numberOfIterations-1; y++)
		  		{
		  			queryForMyActivity = '<Query><Where>';
		  			orEndTags='';
		  			for(var i=iterations; i<(iterations+147)-1; i++)
		  			{
			  				if($.inArray(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i],CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity)==-1)
						{
							queryForMyActivity += '<Or><And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And>';  
							bufferQuery ='<Query><Where><And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And></Eq></Where></Query>' 
							OrCount++;
							orEndTags='</Or>';
						}	
		  			}
		  			if($.inArray(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i],CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity)==-1)
					{	
						queryForMyActivity += '<And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And>';  
						OneOrForOneDataElement = false;
					}
					queryForMyActivity +=orEndTags;
					queryForMyActivity += '</Where></Query>';
		        
		        	if(OneOrForOneDataElement == true &&  OrCount==1)
		        	queryForMyActivity = bufferQuery;
		        	if(queryForMyActivity != '<Query><Where></Where></Query>')	
					{
						var result = testcase.dmlOperation(queryForMyActivity,'MyActivity');
						if(result !=undefined && result != null)
			            	$.merge(MyActivityResult,result); 
			  		}
			  		iterations +=147;
		  		}
		  		queryForMyActivity = '<Query><Where>';
	  			orEndTags='';
	  			for(var i=iterations; i<CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity.length-1; i++)
	  			{
		  				if($.inArray(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i],CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity)==-1)
					{
						queryForMyActivity += '<Or><And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And>';  
						bufferQuery ='<Query><Where><And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And></Eq></Where></Query>' 
						OrCount++;
						orEndTags='</Or>';
					}	
	  			}
	  			if($.inArray(CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i],CombOfTPIdSPUSerIdAndRoleIDMustNotBeDeletedFromMyActivity)==-1)
				{	
					queryForMyActivity += '<And><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[1]+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[0]+'</Value></Eq><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+CombOfTPIdSPUSerIdAndRoleIDToBeDeletedFromMyActivity[i].split("|")[2]+'</Value></Eq></And></And>';  
					OneOrForOneDataElement = false;
				}
				queryForMyActivity +=orEndTags;
				queryForMyActivity += '</Where></Query>';
	        
	        	if(OneOrForOneDataElement == true &&  OrCount==1)
	        	queryForMyActivity = bufferQuery;
	        	if(queryForMyActivity != '<Query><Where></Where></Query>')	
				{
					var result = testcase.dmlOperation(queryForMyActivity,'MyActivity');
					if(result !=undefined && result != null)
		            	$.merge(MyActivityResult,result);
	  			}
		}
		 if(queryForMyActivity != '<Query><Where></Where></Query>')	
		{
			if(MyActivityResult !=null && MyActivityResult!=undefined)
			{
				var MyActivityListName = jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
				for(var aa=0;aa<MyActivityResult.length;aa++)
				{
					var res =MyActivityListName.deleteItem(MyActivityResult[aa]['ID']);
				}
			} 
		}
	}
	/*******************************************************End Of Deletion Logic*********************************************************************************************************/
	
	testcase.ShowCloneTestCase();//:SD
	$('#containerClonePopUp').hide();//:SD
	
	if(testPassesToBeRemoved.length>0 && addedTestPasses.length>0)
		//testcase.alertBox("Test Case cloned/uncloned successfully!");
		testcase.alertBox(testcase.gConfigTestCase+" cloned/uncloned successfully!");
	else if(addedTestPasses.length>0)
		testcase.alertBox("Test Case cloned successfully!");
	else if(testPassesToBeRemoved.length>0)
		testcase.alertBox("Test Case uncloned successfully!");
		
	Main.hideLoading();
	
	//$('#testPassSelectDiv').dialog("close");//:SD
},

///////////////////////* Code for adding Test Pass entry in Master List*////////////////////////////
updateMasterList:function(testPassID,testetSPUserID,newRoles)
{
//Query on Tester Role List to get the Name of Role  
	if(newRoles != 1)
	{
		var testerRoleList = jP.Lists.setSPObject(testcase.SiteURL,'TesterRole');
		var queryOnTesterRoleList = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+newRoles+'</Value></Eq></Where><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
		var roleName2=testerRoleList.getSPItemsWithQuery(queryOnTesterRoleList).Items;
		var roleName = roleName2[0]['Role'];
	}
	else
		var roleName = 'Standard';	

	//Adding by Rupal For new entry in Master list for every Tester in Test Pass
	var myActivityList2= jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
	var obj2=new Array;
	/*obj2.push({'Title':'MasterDetailsList',
		  	  'ProjectName':$("#projectName option:selected").text(),
		  	  'TestPassID':testPassID,
		  	  'ProjectID':$('#projectName').val(),
		  	  'TestPassName':testcase.TestPassNameForTPID[testPassID],
		  	  'Action': 'Begin Testing',
		  	  'TesterSPUserID':testetSPUserID,
		  	  'RoleID':newRoles,
		  	  'RoleName':roleName
	});*/
	
	obj2.push({'Title':'MasterDetailsList',
		  	  'ProjectName':show.selectedProjectName,//:SD
		  	  'TestPassID':testPassID,
		  	  'ProjectID':show.projectId,//:SD
		  	  'TestPassName':show.tpNameForTPID[testPassID],//:SD
		  	  'Action': 'Begin Testing',
		  	  'TesterSPUserID':testetSPUserID,
		  	  'RoleID':newRoles,
		  	  'RoleName':roleName
	});
	
	var updateMyActivityList=myActivityList2.updateItem(obj2);
},	
updateMasterList2:function(testPassID,testetSPUserID,newRoles)
{
	var AllTesterSPUserIDsPresentInTestPass = new Array();
	var q = '';
	var queryOnMyActivity= '<Query><Where><And>';
	for(var ii=0;ii<testetSPUserID.length-1;ii++)
	{
		queryOnMyActivity+= '<Or><Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+testetSPUserID[ii]['SPUserID']+'</Value></Eq>';
		AllTesterSPUserIDsPresentInTestPass.push(testetSPUserID[ii]['SPUserID']);
		q +='</Or>';
	}	
	queryOnMyActivity+= '<Eq><FieldRef Name="TesterSPUserID" /><Value Type="Text">'+testetSPUserID[ii]['SPUserID']+'</Value></Eq>';
		AllTesterSPUserIDsPresentInTestPass.push(testetSPUserID[ii]['SPUserID']);
	if(q != '')
		queryOnMyActivity+= q;
	queryOnMyActivity+='<And><Eq><FieldRef Name="RoleID" /><Value Type="Text">'+newRoles+'</Value></Eq><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+testPassID+'</Value></Eq></And></And></Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="TesterSPUserID" /></ViewFields></Query>';
	var MyActivityList = jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
	var MyActivityResult = MyActivityList.getSPItemsWithQuery(queryOnMyActivity).Items;
	if(MyActivityResult!=null || MyActivityResult!=undefined)
	{
		if(MyActivityResult.length != testetSPUserID.length)
		{
			//Query on Tester Role List to get the Name of Role  
			if(newRoles != 1)
			{
				var testerRoleList = jP.Lists.setSPObject(testcase.SiteURL,'TesterRole');
				var queryOnTesterRoleList = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+newRoles+'</Value></Eq></Where><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
				var roleName2=testerRoleList.getSPItemsWithQuery(queryOnTesterRoleList).Items;
				var roleName = roleName2[0]['Role'];
			}
			else
				var roleName = 'Standard';

			var testetSPUserIDsPresentInMyactivity = new Array();
			for(var i=0;i<MyActivityResult.length;i++)
			{
				testetSPUserIDsPresentInMyactivity.push(MyActivityResult[i]['TesterSPUserID']);
			}
			for(var i=0;i<AllTesterSPUserIDsPresentInTestPass.length;i++)
			{
				var myActivityList2= jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
				var obj2=new Array();

				if($.inArray(AllTesterSPUserIDsPresentInTestPass[i],testetSPUserIDsPresentInMyactivity)==-1)
				{
					/*obj2.push({'Title':'MasterDetailsList',
				  	  'ProjectName':$("#projectName option:selected").text(),
				  	  'TestPassID':testPassID,
				  	  'ProjectID':$('#projectName').val(),
				  	  'TestPassName':testcase.TestPassNameForTPID[testPassID],
				  	  'Action': 'Begin Testing',
				  	  'TesterSPUserID':AllTesterSPUserIDsPresentInTestPass[i],
				  	  'RoleID':newRoles,
				  	  'RoleName':roleName
					});*/
					
					
					obj2.push({'Title':'MasterDetailsList',
				  	  'ProjectName':show.selectedProjectName,//:SD
				  	  'TestPassID':testPassID,
				  	  'ProjectID':show.projectId,//:SD
				  	  'TestPassName':show.tpNameForTPID[testPassID],//:SD
				  	  'Action': 'Begin Testing',
				  	  'TesterSPUserID':AllTesterSPUserIDsPresentInTestPass[i],
				  	  'RoleID':newRoles,
				  	  'RoleName':roleName
					});

				}
				if(obj2.length!=0)	
					var updateMyActivityList=myActivityList2.updateItem(obj2);

			}
		}
	}
	else
	{
		//Adding new entry in Master list for every Tester in Test Pass
		//Query on Tester Role List to get the Name of Role  
		if(newRoles != 1)
		{
			var testerRoleList = jP.Lists.setSPObject(testcase.SiteURL,'TesterRole');
			var queryOnTesterRoleList = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+newRoles+'</Value></Eq></Where><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
			var roleName2=testerRoleList.getSPItemsWithQuery(queryOnTesterRoleList).Items;
			var roleName = roleName2[0]['Role'];
		}
		else
			var roleName = 'Standard';
		var myActivityList2= jP.Lists.setSPObject(testcase.SiteURL,'MyActivity');
		var obj2=new Array();
		for(var i=0;i<testetSPUserID.length;i++)
		{
			/*obj2.push({'Title':'MasterDetailsList',
				  	  'ProjectName':$("#projectName option:selected").text(),
				  	  'TestPassID':testPassID,
				  	  'ProjectID':$('#projectName').val(),
				  	  'TestPassName':testcase.TestPassNameForTPID[testPassID],
				  	  'Action': 'Begin Testing',
				  	  'TesterSPUserID':testetSPUserID[i]['SPUserID'],
				  	  'RoleID':newRoles,
				  	  'RoleName':roleName
			});*/
			obj2.push({'Title':'MasterDetailsList',
				  	  'ProjectName':show.selectedProjectName,//:SD
				  	  'TestPassID':testPassID,
				  	  'ProjectID':show.projectId,//:SD
				  	  'TestPassName':show.tpNameForTPID[testPassID],//:SD
				  	  'Action': 'Begin Testing',
				  	  'TesterSPUserID':testetSPUserID[i]['SPUserID'],
				  	  'RoleID':newRoles,
				  	  'RoleName':roleName
			});

		}
		if(obj2.length!=0)	
			var updateMyActivityList=myActivityList2.updateItem(obj2);

	}	
},

showTestCase:function(){
						
	var TotalTestPassIDArray = new Array();
	var id=new Array();	
			
	//get the TestPass Id from query string		
	var testPassID = show.testPassId;
	if(testPassID!=undefined)
		id.push(testPassID);
	var testcaseids = new Array();
	
	
	var markup ='';var cloneMarkup='';
	var TestCaseCount;
	var arrTestCaseRowsHtml = new Array();
	
	if(testcase.TestCaseList != null && testcase.TestCaseList != undefined)
	{		
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
		testcase.TestCaseList = testcase.TestCaseList.sort(sort_by('testCaseSeq', true, parseInt));
		
		var TestCaseListLength =  testcase.TestCaseList.length;
		testcase.testCaseLength = testcase.TestCaseList.length;
		
		for(var j=0;j<testcase.TestCaseList.length;j++)
		{
			testcase.globalTestCaseIDs.push(testcase.TestCaseList[j].testCaseId);
			markup ='';//Added
			cloneMarkup='';//Added
			var testp = testcase.TestCaseList[j].testPassId;
			var testPassNames = $("#TestPassTitle label").attr('title');			
			
			testcase.associatedTestPassIDsForTestCase[testcase.TestCaseList[j].testCaseId]= testp;
		
			var testCaseName = 	testcase.TestCaseList[j].testCaseName.replace(/"/g, "&quot;");	
			testCaseName = testCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;');//Added by HRW on 17 Jan 2012
			if(testcase.TestCaseList[j].testCaseETT != undefined && testcase.TestCaseList[j].testCaseETT != "")
				var estTime = testcase.TestCaseList[j].testCaseETT;
			else
				var estTime = 'N/A';
			
		    testcase.forTCIdGetTCDetails[ testcase.TestCaseList[j]['testCaseId'] ] = testcase.TestCaseList[j].testCaseName+'`'+testcase.TestCaseList[j].testCaseDesp+'`'+testcase.TestCaseList[j].testCaseETT;
		    
			testPassNames = testPassNames.replace(/"/g, "&quot;");
		
			markup += '<tr><td class="center"><span>'+(j+1)+'</span></td>';
			markup += '<td style="padding-right:5px;"><span>'+testCaseName+'</span></td>';//New Added
			markup += '<td class="center"><span>'+estTime+'</span></td>';
			if( id.length == 1)
				markup += '<td class="center"><span><a class="sequenceup"  onclick="Main.showLoading();setTimeout(\'testcase.swapUp('+j+')\',200);" style="cursor:pointer;"><img width="25px" height="25px" src="/images/Admin/Road-Forward.png"></a>&nbsp;<a title="Edit '+testcase.gConfigTestCase+'"'+' onclick="Main.showLoading();setTimeout(\'testcase.editTestCase('+testcase.TestCaseList[j].testCaseId+')\',200);" style="cursor:pointer;"><img width="25px" height="25px" src="/images/Admin/Edit1.png"/></a>&nbsp;&nbsp;<a title="Delete '+testcase.gConfigTestCase+'"'+'  onclick="testcase.delTestcase('+testcase.TestCaseList[j].testCaseId+')"  style="cursor:pointer;"><img width="25px" height="25px" src="/images/Admin/Garbage1.png"/></a>&nbsp;<a class="sequencedown"  style="cursor:pointer;"  onclick="Main.showLoading();setTimeout(\'testcase.swapDown('+j+')\',200);"><img width="25px" height="25px" src="/images/Admin/Road-Backward.png"></a></span></td></tr>';	
			else
				markup += '<td class="center"><span><a title="Edit '+testcase.gConfigTestCase+' Details" style="cursor: pointer;" class="pedit" onclick="Main.showLoading();setTimeout(\'testcase.editTestCase('+testcase.TestCaseList[j]['ID']+')\',200);" ></a>&nbsp;&nbsp;<a onclick="testcase.delTestcase('+testcase.TestCaseList[j].testCaseId+')" title="Delete '+testcase.gConfigTestCase+'"'+'  class="pdelete"  style="cursor: pointer;">&nbsp;</a></td></tr>';//Added by mohini for Resource File
            
            //Clone Markup :SD***********************************************
			cloneMarkup += '<tr><td class="center"><span>'+testcase.TestCaseList[j].testCaseId+'</span></td>';
			cloneMarkup += '<td style="padding-right:5px;"><span>'+testCaseName+'</span></td>';
			cloneMarkup += '<td ><span title="'+testPassNames+'">'+trimText(testPassNames,35)+'</span></td>';
		    //var testcaseIdAssociatedtestPassIds = testcase.TestCaseList[j]['ID']+testp;			
		    var testcaseIdAssociatedtestPassIds = testp;	
			cloneMarkup += '<td class="center"><span><a title="Copy '+testcase.gConfigTestCase+'"'+' class="clsClone" testCaseId="'+testcase.TestCaseList[j].testCaseId+'" testCaseName="'+testCaseName+'" style="cursor: pointer;" ><img width="25px" height="25px" src="/images/Admin/Clone.png"></a></td></tr>';
			//:SD
			if(testcase.flagForClone)
				arrTestCaseRowsHtml.push(cloneMarkup);
			else
				arrTestCaseRowsHtml.push(markup);
		}
	}
	else
	{
		$('#noTestCaseDiv').show();
	    $('#Pagination').hide();
		$('#testCaseGrid').hide();
		$('#btnDelete').hide();		
	}
	
 Main.hideLoading();
 	if(testcase.TestCaseList == undefined || testcase.TestCaseList == null)
 		testcase.TestCaseList = new Array();
 		
    //To check for global page index value :SD
    //If last record of page is deleted then decrease pageindex value by 1
 	if(parseInt(testcase.TestCaseList.length)>0)
	{
		var pageCount =  Math.ceil(parseInt(testcase.TestCaseList.length)/10);
		if(parseInt(testcase.gPageIndex)> parseInt(pageCount)-1)
			testcase.gPageIndex = parseInt(testcase.gPageIndex)-1;
	}
 
 
	return arrTestCaseRowsHtml;//Added
},

arr:new Array(),
initpage:function(page_index, jq)
{
    var items_per_page = 10;
    var max_elem = Math.min((page_index+1)*items_per_page,testcase.arr.length);
    var newhtml = '';
    for(var i=page_index*items_per_page;i<max_elem;i++)
    {
        newhtml=newhtml+testcase.arr[i];
    }     
    if(newhtml == '')
    {
    	$("#Pagination").css('display','none');
    	$('#showTestCases').html("");
    	$("#noP").css('display','');
    	$('#noTestCaseDiv').css('display','');
    	$("#testCaseGrid").css('display','none')
    	$("#countDiv").css('display','none');
    	$("#btnDelete").hide();
    }
    else
    {
    	$('#showTestCases').html(newhtml);
    	resource.updateTableColumnHeadingTesMgnt();//Added by Mohini for Resource file
    	//To hightlight testcase column
    	var len = $('#showTestCases tr').length;
      	for(var i = 0; i <= len; i++)
     		$('.tableGrid tbody tr:eq('+i+') td:eq(1)').attr('class','selTD');
    	
    	$("#Pagination").css('display','');
    	$("#testCaseGrid").css('display','');
    	
    	$('#labelCount').text(testcase.arr.length);//:SD
		$('#countDiv').css('display','');
		$('#noTestCaseDiv').css('display','none');
		$("#btnDelete").show();
    }
    return false;
},
pagination:function()
{
	testcase.arr = testcase.showTestCase();
	var len = testcase.arr.length;
	 
	$("#Pagination").pagination(len,{
	    callback:testcase.initpage,
	    items_per_page:10, 
	    num_display_entries:10,
	    num:2,
	    current_page:testcase.gPageIndex
	});
},

CloneArrHtml:new Array(),
ShowCloneTestCase:function()
{
	testcase.CloneArrHtml = testcase.showTestCase();
	var len = testcase.CloneArrHtml.length;
	$("#CloneTestCasePagination").pagination(len,{
	    callback:testcase.cloneGridPage,
	    items_per_page:10, 
	    num_display_entries:10,
	    num:2,
	    current_page:testcase.gPageIndexCloneGrid
	});
},

cloneGridPage:function(page_index, jq)
{
    var items_per_page = 10;
    var max_elem = Math.min((page_index+1)*items_per_page,testcase.CloneArrHtml.length);
    var newhtml = '';
    for(var i=page_index*items_per_page;i<max_elem;i++)
    {
        newhtml=newhtml+testcase.CloneArrHtml[i];
    }     
    if(newhtml == '')
    {
    	$("#CloneTestCasePagination").css('display','none');
    	$('#showTestcasesForClone').html("");
    	$("#noTestCaseForCloneDiv").css('display','');
    	$("#testCaseCloneGrid").css('display','none')
    	$("#noTestCaseDiv").css('display','none');
    	$('#countDiv').css('display','none');
    }
    else
    {
    	$('#showTestcasesForClone').html(newhtml);
    	//To hightlight testcase column
    	var len = $('#showTestcasesForClone tr').length;
      	for(var i = 0; i <= len; i++)
     		$('#showTestcasesForClone tr:eq('+i+') td:eq(1)').attr('class','selTD');
     		
     	//Bind clone event	
		$('.clsClone').click(function(){
            
			 if($('#containerClonePopUp').attr('testcaseId')==$(this).attr('testCaseId'))
			{	
				if($('#containerClonePopUp').is(':visible'))
				{
					$('#containerClonePopUp').hide();
					$('#containerClonePopUp').attr('testcaseId','');//Added on 16 Dec 2013
				}	
			}
			else
			{
				var testCaseId = $(this).attr('testCaseId');
				var testCaseName = $(this).attr('testCaseName');
				var positionDiv = $(this).position();
				$('#containerClonePopUp').attr('testcaseId',$(this).attr('testCaseId'));
				testcase.cloneTestCase(testCaseId,testCaseName,positionDiv);
			}
		});		
     	
	
     	//Here
    	$("#CloneTestCasePagination").css('display','');
    	$("#noTestCaseForCloneDiv").css('display','none');
    	$("#testCaseCloneGrid").css('display','');
    	$("#noTestCaseDiv").css('display','none');
    	$('#countDiv').css('display','');

    }
    return false;
},

//:SD
cloneTestCase:function(testcaseId,testcaseName,positionDiv)
{
	//pop up with multiselect testpass
	testcase.createMultiSelectList(testcaseId,testcaseName,"testPassSelectDiv","130px",positionDiv);
},
hideFlyOut:function()
{
	if($('#containerClonePopUp').is(':visible'))
	{
		$('#containerClonePopUp').hide();
		$('#containerClonePopUp').attr('testcaseId','');
	}
},
createMultiSelectList:function(testcaseId,testcaseName,divID,height,positionDiv)
{
	
	var divhtml="";
	//divhtml+="<div class='Mediumddl' style='border: solid 1px #ccc;width:300px; padding-left:1px;'>"
	divhtml+="<div style='font-size:15px;width:350px'><label style='font-size:15px;margin-left: 120px;'>Test Passes</label> <b style='cursor: pointer; position: relative; left: 110px;' onclick='testcase.hideFlyOut();'>x</b></div><div class='Mediumddl' style='border: solid 1px #ccc;width:320px;margin-left:10px;padding-left:1px;'>"+
			"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
				/*"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>All</a>"+
					 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>None</a>"+
					 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>Selected</a></li>"+
				<li><hr/></li>"+*/
				"<div style='overflow-y:scroll; height:"+height+" width:340px'>";
							
	
	for(var i=0;i<show.TestPassIDArr.length;i++)
	{		
		var itemId = divID+"_"+show.TestPassIDArr[i];
		
		if(show.TestPassNameArr[i] != undefined)
		{
			var hoverTxt = multiSelectList.GetFormatedText(show.TestPassNameArr[i]).replace(/(\r\n)+/g, '');
			hoverTxt = multiSelectList.filterData1(hoverTxt); //shilpa 17 apr bug: 7660
			hoverTxt = hoverTxt.replace(/(.|\n)*?/ig,'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			hoverTxt=hoverTxt.replace(/"/g, "&quot;");
			hoverTxt=hoverTxt.replace(/'/g, '&quot;');
			hoverTxt=hoverTxt.replace(/(\r\n)+/g, '');
			
			if(show.TestPassIDArr[i] == show.testPassId)
			{			
				divhtml=divhtml+"<li title='"+hoverTxt+"'><input testpassID='"+show.TestPassIDArr[i]+"' id='"+itemId+"' checked disabled type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(show.TestPassNameArr[i].replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(show.TestPassNameArr[i].replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";
			}	
			else
				divhtml=divhtml+"<li title='"+hoverTxt+"'><input testpassID='"+show.TestPassIDArr[i]+"' id='"+itemId+"'  type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(show.TestPassNameArr[i].replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(show.TestPassNameArr[i].replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";		
						
		}	
		
	}			
											
	divhtml+="</div></ul></div>";

	$("#"+divID).html(divhtml);	
	
	var testpassIds = testcase.associatedTestPassIDsForTestCase[testcaseId]; 
	//multiSelectList.setSelectedItemsFromArray("testPassSelectDiv",testcase.associatedTestPassIDsForTestCase[testcaseId]);
	var tpId = '';
	for(var i=0;i<show.TestPassIDArr.length;i++)
	{
		tpId = show.TestPassIDArr[i];
		if(tpId != show.testPassId)
		{
			if(testcase.forTPIDGetTesterFlag[tpId] == undefined)
			{
				//var TesterListResult = ServiceLayer.GetData("GetTestersByTestPassID",tpId);
			    var TesterListResult = ServiceLayer.GetData("GetTestersByTestPassID", tpId ,'TestCase' );
			    if (TesterListResult != '' && TesterListResult != undefined)
				{
					if(TesterListResult.length != 0)
					{
						testcase.testpassesWithTester.push(tpId);
						testcase.forTPIDGetTesterFlag[tpId] = '1';
					}	
					else
					{
						testcase.testPassesWithNoTester.push(tpId);
						testcase.forTPIDGetTesterFlag[tpId] = '0';
					}	
				}
				else
				{
					testcase.testPassesWithNoTester.push(tpId);
					testcase.forTPIDGetTesterFlag[tpId] = '0';
				}
			}
			if(testcase.forTPIDGetTesterFlag[tpId] == '0')
			{
				var itemId = "testPassSelectDiv_"+tpId;
				$('input[id='+itemId+']').attr('disabled','disabled');
			}
		}
		else
			testcase.forTPIDGetTesterFlag[tpId] = '1';	
	}
	/*for(var i=0;i<testcase.testPassesWithNoTester.length;i++)
	{		
		var itemId = "testPassSelectDiv_"+testcase.testPassesWithNoTester[i];
		$('input[id='+itemId+']').attr('disabled','disabled');
	}*/
	
	var posLf= parseInt(positionDiv.left)-315;
	var posTp= parseInt(positionDiv.top)+12;
	$('#containerClonePopUp').css('left',parseInt(posLf)+"px");	
	$('#containerClonePopUp').css('top',posTp+"px");	
	$('#containerClonePopUp').css('position','absolute');	
	$('#containerClonePopUp').css('display','');
	
     var markupBtn ='';
	 markupBtn+='<input type="button" value="OK" id ="btnClone" style="margin-left:0px;margin-right:5px;margin-top:5px;margin-bottom:5px;" class="btnNew1" onclick="Main.showLoading();setTimeout(function(){testcase.copyTestCase('+testcaseId+');},200);" />';
     markupBtn+='<input type="button" value="Cancel" id ="resetClone" style="margin-left:0px;margin-right:5px;margin-top:5px;margin-bottom:5px;" class="btnNew1" onclick="Main.showLoading();setTimeout(function(){testcase.resetTestPassForClone('+testcaseId+');},200);" />';

	$('#divContainerCloneBtn').html(markupBtn);
									
},

resetTestPassForClone:function(testcaseId)
{
   var arr = [];
   arr.push(testcase.associatedTestPassIDsForTestCase[testcaseId]) 
   multiSelectList.setSelectedItemsFromArray("testPassSelectDiv",arr);
   Main.hideLoading();
},
editTestCase:function (id)
{

	createDD.editMode = 1;
	createDD.hideDD();

    testcase.gPageIndex = parseInt($('#Pagination span(.current):not(.prev,.next)').text())-1;//to maintain paging :SD
	testcase.testPassForEdit.length=0;
	$('#countDiv').css('display','none');	

	$('#addNewTestCase').empty();
	var addnew = '<a style="cursor:pointer;float:right;" onclick="testcase.clearFields();$(\'#linkSN_testPassName\').click();" class="rgt addNew" alt="Add New Test Case" ><b>+ Add New Test Case</b></a>';
	$('#addNewTestCase').append(addnew);
	$('#btnSave').hide();
	$('#btnCancelNew').hide();
	$('#btnUpdate').show();	
	$('#btnCancel').show();
	testcase.TestCaseIDForUpdate = id;

	for(var j=0;j<testcase.TestCaseList.length;j++)
	{
		if(testcase.TestCaseList[j]['testCaseId'] == id)
		{
			TestCaseList = testcase.TestCaseList[j];
			break;
		}
	}			
	testcase.gTestCaseList = TestCaseList; 
	if(TestCaseList != null && TestCaseList != undefined)
	{
		$('#testcaseid1').show();
		testcase.TestPassIDForUpdate =TestCaseList.testPassId;
				
		document.getElementById('txttestcname').value = (TestCaseList.testCaseName).replace(/\n/g," "); // modified for bug 5751
		document.getElementById('desc').value = TestCaseList.testCaseDesp.toString();		
 		testcase.testpassIDsForUpdate.length=0;
 		testcase.testpassIDsForUpdate=show.testPassId;	
 		
 		$("#estTime").val(TestCaseList.testCaseETT);
				
	}
	   //To navigate to update tab
	   $('.navTabs h2:eq(4)').show();
	   $('.navTabs h2:eq(4)').trigger('click');
          
	Main.hideLoading();
	
	//To disable the Create and view links on edit mode
	//$(".navTabs h2:eq(0)").attr("disabled",true).css("cursor","default");
	//$(".navTabs h2:eq(1)").attr("disabled",true).css("cursor","default");
	//$(".navTabs h2:eq(3)").attr("disabled",true).css("cursor","default");
			
},

dmlOperation:function(search,list)
{
	var listname = jP.Lists.setSPObject(testcase.SiteURL,list);	
	var query = search;
	var result = listname.getSPItemsWithQuery(query).Items;
	return (result);
},

alertBoxR:function(msg)
{
	$("#divAlert").text(msg);
	$('#divAlert').dialog({height: 150,modal: false, buttons: [{text: "Ok",click: function() {  window.location.href="/SitePages/Dashboard.aspx"; $(this).dialog("close"); } }], close: function() { window.location.href="/SitePages/Dashboard.aspx"; } });
},

/*Rajiv;11 june testcase sequencing*/
swapUp:function(i)
{
	testcase.gPageIndex = parseInt($('#Pagination span(.current):not(.prev,.next)').text())-1;//to maintain paging :SD

	if(i == 0)
	{
			var temp = testcase.TestCaseList[i]; 
			testcase.TestCaseList[i] = testcase.TestCaseList[testcase.TestCaseList.length-1];
			testcase.TestCaseList[testcase.TestCaseList.length-1] = temp;
			var test = "";
			for(var j=0;j< testcase.TestCaseList.length;j++)
			{	
			    var data={
					  'testCaseId':testcase.TestCaseList[j].testCaseId,
					  'testCaseSeq':j
				};
				//var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase",data);
				
				if(test == "")
					test = testcase.TestCaseList[j].testCaseId+"~"+j;
				else
					test += "#"+ testcase.TestCaseList[j].testCaseId+"~"+j;

				testcase.TestCaseList[j].testCaseSeq = j;

			}
			var result = ServiceLayer.InsertUpdateData("TestCaseSequencing", test ,'TestCase');
			
			if(testcase.TestCaseList.length > 10)//Code added by deepak for sequencing
		    	testcase.alertBox("The top "+testcase.gConfigTestStep.toLowerCase()+" was moved to the last step within this "+testcase.gConfigTestCase.toLowerCase()+"(on the last page in the grid).");//Added by Mohini for Resource file
		    else
		    	testcase.alertBox("The top "+testcase.gConfigTestStep.toLowerCase()+" was moved to the last step within this "+testcase.gConfigTestCase.toLowerCase()+".");//Added by Mohini for Resource file	
	} 
	else
	{
	
			var showMsgFlag = false;
			//Logic to check for row is top row to display message:SD
			var arrSequence = new Array();
			$('#testCaseGrid tbody tr').each(function(){
				arrSequence.push($(this).children('td:eq(0)').text());
			});
			var leastSequence = Math.min.apply( null, arrSequence);
			if(i==parseInt(leastSequence)-1)
			 showMsgFlag = true;
			//**********************// 
	
			var temp = testcase.TestCaseList[i];
			testcase.TestCaseList[i] = testcase.TestCaseList[i-1];
			testcase.TestCaseList[i-1] = temp;
			var test = "";
			for(var j=0;j< testcase.TestCaseList.length;j++)
			{	 
				var data={
				  'testCaseId':testcase.TestCaseList[j].testCaseId,
				  'testCaseSeq':j
				};
				//var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase",data);
				if(test == "")
					test = testcase.TestCaseList[j].testCaseId+"~"+j;
				else
					test += "#"+ testcase.TestCaseList[j].testCaseId+"~"+j;

				testcase.TestCaseList[j].testCaseSeq = j;

			}
			var result = ServiceLayer.InsertUpdateData("TestCaseSequencing", test, 'TestCase');
				
			if(showMsgFlag)
				testcase.alertBox("The top "+testcase.gConfigTestStep.toLowerCase()+" was moved to the previous step(on the previous page in the grid).");//Added by Mohini for Resource file
	
	}
	testcase.pagination();//:SD
	Main.hideLoading();
},


swapDown:function(i)
{
	testcase.gPageIndex = parseInt($('#Pagination span(.current):not(.prev,.next)').text())-1;//to maintain paging :SD
		
	if(i == testcase.TestCaseList.length-1)//Last Test Case
	 {
		 	var temp = testcase.TestCaseList[i];
		 	testcase.TestCaseList[i] = testcase.TestCaseList[0];
		    testcase.TestCaseList[0] = temp;
		    
		    var test = "";
			for(var j=0;j< testcase.TestCaseList.length;j++)
			{	
				var data={
						  'testCaseId':testcase.TestCaseList[j].testCaseId,
						  'testCaseSeq':j
				};
				if(test == "")
					test = testcase.TestCaseList[j].testCaseId+"~"+j;
				else
					test += "#"+ testcase.TestCaseList[j].testCaseId+"~"+j;
					
				testcase.TestCaseList[j].testCaseSeq = j;
			}
			var result = ServiceLayer.InsertUpdateData("TestCaseSequencing", test ,'TestCase');
			
			if(testcase.TestCaseList.length > 5)		
				testcase.alertBox("The bottom "+testcase.gConfigTestStep.toLowerCase()+" was moved to the first step within this "+testcase.gConfigTestPass.toLowerCase()+"(on the first page in the grid).");//Added by Mohini for Resource file
			else
				testcase.alertBox("The bottom "+testcase.gConfigTestStep.toLowerCase()+" was moved to the first step within this "+testcase.gConfigTestPass.toLowerCase()+".");//Added by Mohini for Resource file
	 } 
	 else
	 {
		 	var temp = testcase.TestCaseList[i];
		 	testcase.TestCaseList[i] = testcase.TestCaseList[i+1];
		    testcase.TestCaseList[i+1] = temp;
			var obj = new Array();
			var arrangedtestcaseIDs = new Array();
			var test = "";
			for(var j=0;j< testcase.TestCaseList.length;j++)
			{	
				var data={
						  'testCaseId':testcase.TestCaseList[j].testCaseId,
						  'testCaseSeq':j
				};
				//var result = ServiceLayer.InsertUpdateData("InsertUpdateTestCase",data);
				
				if(test == "")
					test = testcase.TestCaseList[j].testCaseId+"~"+j;
				else
					test += "#"+ testcase.TestCaseList[j].testCaseId+"~"+j;

				testcase.TestCaseList[j].testCaseSeq = j;
			}
			var result = ServiceLayer.InsertUpdateData("TestCaseSequencing", test ,'TestCase');
			
			if(i==testcase.EiForAction-1)
				testcase.alertBox("The bottom "+testcase.gConfigTestStep.toLowerCase()+" was moved to the next step(on the next page in the grid).");//Added by Mohini for Resource file 
	 }
	 
	 testcase.pagination();//:SD
	 Main.hideLoading();
}

}