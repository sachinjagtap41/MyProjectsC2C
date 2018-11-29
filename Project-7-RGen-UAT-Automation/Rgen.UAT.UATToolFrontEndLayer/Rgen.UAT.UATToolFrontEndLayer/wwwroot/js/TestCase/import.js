// Copyright © 2012 RGen Solutions . All Rights Reserved.
// Contact : support@rgensolutions.com 
var imp={

	i:0,
	msg:'',
	row:0,
	blExl:0,
	intc:0,
	totc:0,
	isPortfolioOn:false,
	
	//Added by HRW
	testPassNameForTestPassID : new Array(),
	testPassesWithNoTester : new Array(),
	openExcel:function()
	{
		imp.isPortfolioOn = isPortfolioOn;
		
		imp.msg="";
		var allValidTestPasses = new Array();
		if(typeof (window.ActiveXObject) == undefined) 
		{
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else
        {
        	var stat = 0;
			try
			{
				var excel = new ActiveXObject("Excel.Application");
				stat = 1;
			}
			catch(ex)
			{
				Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
			}
			if(stat == 0)
			{
				Main.hideLoading();
				return;
			}
       		$("#divUpload").html('<input type="file" id="upload" style="display:none"/>');
        	$("#upload").click();
        	var path=$('#upload').val();
			//Code added by sushil for waiting cursor on 21 August - 2012//
			window.setTimeout('$("#upload").remove();',100);
			window.setTimeout('Main.showLoading();',200);

			var stat=0;
			var blnk=0;
			//Validation
			if(path=="" || path==null || path==undefined)
			{
				imp.msg="You have not selected the file.";
				stat=1;
				imp.alertBox(imp.msg);
				Main.hideLoading();
                return;
			}
			var ext = path.split('.').pop().toLowerCase();
			if($.inArray(ext, ['xlsx','xls']) == -1) 
			{
				if(stat==0)
				{
	    			imp.msg="Please select the Excel file Template for "+testcase.gConfigTestCase+" with extention .xls or .xlsx!";//Added by Mohini for Resource file
	    		}
			}
			else
			{
				var excel_file = excel.Workbooks.Open(path);
				var excel_sheet;
				try
				{
					excel_sheet = excel.Worksheets(testcase.gConfigTestCase+" Template");
					excel_sheet = excel.Worksheets(testcase.gConfigTestCase+" Template");//added by mohini for resource file
				}
				catch(e)
				{
					imp.alertBox("Please select the valid "+testcase.gConfigTestCase+" template!<br/>");//added by mohini for resource file
					blnk=1;
				}
				if(blnk==1)
				{
					Main.hideLoading();
					return;
				}

				Main.showLoading();
				
						var d=[];
						var projectFound ;
						var availableTestPassIDs = new Array();
						//To define cell no as per portfolio mode:SD
						if(isPortfolioOn)
						{
							var testPassCellNo=3;var testCaseCellNo=4;var descriptionCellNo=5;var ETACellNo=6;
						}
						else
						{
							var testPassCellNo=2;var testCaseCellNo=3;var descriptionCellNo=4;var ETACellNo=5;
						}
						
						var cnt=excel_sheet.UsedRange.Rows.Count;
						blnk=0;
						var flag = 0;
						for(var an=4;an<=cnt+blnk;an++)
						{
							flag = 0;
							if(excel_sheet.Cells(an,1).value == null || excel_sheet.Cells(an,1).value == undefined)
								flag = 1;	
							else if(excel_sheet.Cells(an,1).value.toString().trim() =="")
								flag = 1;
							
							if(flag == 1)
							{
								imp.row++;
								imp.intc++;
								imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+"Fields marked with asterisk(*) are mandatory!<br/>";
								continue;
							}
							
							var testPassNamesInPage= new Array();
							var testPassIDsInPage= new Array();
							projectFound = false;
							availableTestPassIDs.length = 0;
							
							d[0] = excel_sheet.Cells(an,1).Value;	//Project Name
							if(d[0] != undefined)
								d[0] = d[0].toString();
								
							d[1] = excel_sheet.Cells(an,testPassCellNo).Value;	//Test Pass
							if(d[1] != undefined)
								d[1] = d[1].toString();
			
							d[2] = excel_sheet.Cells(an,testCaseCellNo).Value;	//Test Case
							if(d[2] != undefined)
								d[2] = d[2].toString();
								
							d[3] = excel_sheet.Cells(an,descriptionCellNo).Value;	//Description
							if(d[3] != undefined)
								d[3] = d[3].toString();
								
							d[4] = excel_sheet.Cells(an,ETACellNo).Value;	//Estimated Test Time
							if(d[4] != undefined)
								d[4] = d[4].toString();
								
							if(isPortfolioOn)//:SD
							{
								d[5] = excel_sheet.Cells(an,2).Value;	//Version Name	
								if(d[5] != undefined)
									d[5] = d[5].toString();	
							}		
							imp.row++;
							
							//Project Name
							if(d[0] == "")
							{
								imp.msg+="Row"+imp.row+" "+":"+" "+testcase.gConfigProject+" field can not be blank! Please enter valid "+testcase.gConfigProject.toLowerCase()+" name<br/>";//Added by Mohini for resource file
								imp.intc++;
								continue;
							}
							else
							{
							
								//check for project found :SD
								var availableCurrentProject = $('#projectTitle label').attr('title'); 
								if($.trim(availableCurrentProject) == d[0].replace(/^\s+|\s+$/g, ""))//remove white spaces from begining and end
								{
									projectFound =true
								}
								//Here*****************************
								if(!projectFound)
								{	
									imp.msg+="Row"+imp.row+" "+":"+" "+"Project <b>\""+d[0]+"</b>\" does not exist!<br/>";
									imp.intc++;
									continue;
								}
							}
							
							if(isPortfolioOn)//:SD
							{
								if(d[5] == "")
								{
									imp.msg+="Row"+imp.row+" "+":"+" "+testcase.gConfigVersion+" field can not be blank! Please enter valid "+testcase.gConfigVersion.toLowerCase()+" name<br/>";//Added by Mohini for resource file
									imp.intc++;
									continue;
								}
								else
								{
									if($.trim( $("#versionTitle label").attr("title") ) != d[5].replace(/^\s+|\s+$/g, "") )
									{
										imp.msg+="Row"+imp.row+" "+":"+" "+testcase.gConfigVersion+" <b>\""+d[5]+"</b>\" does not exist!<br/>";
										imp.intc++;
										continue;
			
									}
								}
							}
							
							 var testPassNamesInExcelcell = new Array();
							 if(d[1]!=undefined)
							 {
							 	var TPName = d[1].split(',');
							 	for(var ii=0;ii<TPName.length;ii++)
							 		testPassNamesInExcelcell.push(TPName[ii].replace(/^\s+|\s+$/g, ""));	//remove white spaces from begining and end
							 	
							 }	
							 else
							 {
								imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+"Fields marked with asterisk(*) are mandatory!<br/>";
							 	imp.intc++;	
							 	continue;
							 }	
							 
							 /***********************************/
							//Test Pass Name
							var TestPassNotAvailable = false;
							var testPassesWithoutAnyTester = new Array(); 
							imp.testPassesWithNoTester.length = 0; 
							
														
							//****** New Changes:SD *******************
							for(var m=0;m<show.TestPassIDArr.length;m++)
							{
								testPassIDsInPage.push(show.TestPassIDArr[m]);
								testPassNamesInPage.push(show.TestPassNameArr[m]);
							}
							
							for(var p=0;p<testPassNamesInExcelcell.length;p++)
							{
								var index = $.inArray(testPassNamesInExcelcell[p],show.TestPassNameArr);
								if($.inArray(show.TestPassIDArr[index],testcase.testPassesWithNoTester)!=-1)
								{
									testPassesWithoutAnyTester.push(testPassNamesInExcelcell[p]);
									testPassesToBeDisabled.push(show.TestPassIDArr[index]);
								}
							}
							
							var invalidTestPasses = new Array();
							for(var i=0;i<testPassNamesInExcelcell.length;i++)
							{
								var index = $.inArray(testPassNamesInExcelcell[i],testPassNamesInPage);
								if(index==-1)
								    invalidTestPasses.push(testPassNamesInExcelcell[i]);
				               	else
								{
									if($.inArray(testPassIDsInPage[index],availableTestPassIDs) == -1)
										availableTestPassIDs.push(testPassIDsInPage[index]);
								}	
							}
							//Added by HRW
							if(testcase.testPassesWithNoTester.length != 0)
							{
								for(var i=0;i<testcase.testPassesWithNoTester.length;i++)
								{
									if($.inArray(testcase.testPassesWithNoTester[i],availableTestPassIDs) != -1)
										testPassesWithoutAnyTester.push(show.TestPassNameArr[testcase.testPassesWithNoTester]);//Added:SD
									else
									{
										$('#testPassName_'+testcase.testPassesWithNoTester[i]).attr('title','No '+testcase.gConfigTester+' assigned for this '+testcase.gConfigTestPass);//Added by Mohini for Resource file
										$('#testPassName_'+testcase.testPassesWithNoTester[i]).attr('checked',false);
										$('#testPassName_'+testcase.testPassesWithNoTester[i]).attr('disabled',true);
									}	
									
								}	
							}
							
							$.merge(allValidTestPasses,availableTestPassIDs);
							
							if(invalidTestPasses.length>0)
							{
								if(invalidTestPasses.length == 1)
								{
									if(invalidTestPasses[0] == "")
										imp.msg+="Row"+imp.row+" "+":"+ "Invalid Entry !<br/>";
									else
										imp.msg+="Row"+imp.row+" "+":"+" <b>"+invalidTestPasses+"</b>is not available for the respective "+testcase.gConfigProject.toLowerCase()+" !<br/>";//Added by Mohini for Resource file
								}
								else
								 	imp.msg+="Row"+imp.row+" "+":"+" <b>"+invalidTestPasses+" </b> are not available for the respective "+testcase.gConfigProject.toLowerCase()+" !<br/>";//Added by Mohini for Resource file
							
								imp.intc++;
								continue;
				            }
				            
				            if(testPassesWithoutAnyTester.length>0)
				            {
				             	if(testPassesWithoutAnyTester.length == 1)
				             		imp.msg+="Row"+imp.row+" "+":"+"<b> "+testPassesWithoutAnyTester+"</b> does not have any "+testcase.gConfigTester.toLowerCase()+"!<br/>";//Added by Mohini for Resource file
						        else
						        	imp.msg+="Row"+imp.row+" "+":"+" <b>"+testPassesWithoutAnyTester+"</b> do not have any "+testcase.gConfigTester.toLowerCase()+"!<br/>";//Added by Mohini for Resource file
						        continue; 	
						    }
						    if(invalidTestPasses.length>0 || testPassesWithoutAnyTester.length>0)
						    {
						    	imp.intc++;
				            	continue;//if there is  no tester for the testpass in excel cell or if there is some invalid test pass in excel cell take another row
				            }
				            
							//Test Case Name
							if(d[2] == undefined)
							{
								imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+"Fields marked with asterisk(*) are mandatory!<br/>";
								imp.intc++;
								continue;
							}
							else if(d[2].toString().trim() == '')
							{
								imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+"Fields marked with asterisk(*) are mandatory!<br/>";
								imp.intc++;
								continue;
							}
							var Estimatedtime = '';
							if(d[4] != undefined)
							{
								Estimatedtime = jQuery.trim(d[4].toString());
								if(Estimatedtime != '')
								{
									if(Estimatedtime.match(/^[0-9]+$/) == null)
									{
										imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+"Only integer numbers are allowed in "+testcase.glblvalOfEstimatedTime+"!<br/>";//Added by Mohini for Resource file
										imp.intc++;
										continue;
									}
								}		
							}
		
							var testCaseName = d[2].toString();
							
							//Description
							var description = d[3];
							if(description==undefined)
								description = '-';
							
							//Save the test cases
							imp.saveTestCase(availableTestPassIDs,testCaseName,description,Estimatedtime);
						}
						//Shifted by rajiv on  9 august 2012 ;close the file object only if it is opened  
						excel_file.Close();
						excel.Quit();
					
					
				window.setTimeout("Main.hideLoading()", 200);	
			}
			
		}
		//Ankita 7/19/2012: To solve the bug ID 2050
		/*if(imp.blExl==0 && stat==0 && imp.intc==0)
		{
			imp.msg+="Excel Sheet is blank.<br/>Please add some TestCases and then import!<br/>";
		}*/
		
		//Total test cases
		imp.totc = imp.blExl+ imp.intc;
		
		if(imp.blExl!=0 || imp.intc!=0)
		{
			imp.alertBoxOnRead(imp.msg);
		}
		else
		{
			imp.alertBox(imp.msg);
		}
		
		imp.msg="";
		imp.row=0;
		imp.blExl=0;
		imp.intc=0;
		imp.totc=0;
		

		if(testcase.testPassesWithNoTester == 0)
		{
			//multiSelectList.setSelectedItemsFromArray("testPassName",allValidTestPasses);//commented 
		}	
		else
		{
			var validTPs = new Array();
			for(var i=0;i<allValidTestPasses.length;i++)
			{
				if($.inArray(allValidTestPasses[i],testcase.testPassesWithNoTester) == -1)
					validTPs.push(allValidTestPasses[i]);
				else
				{
					$('#testPassName_'+allValidTestPasses[i]).attr('title','No '+testcase.gConfigTester+' assigned for this '+testcase.gConfigTestPass);//Added by Mohini for Resource file
					$('#testPassName_'+allValidTestPasses[i]).attr('checked',false);
					$('#testPassName_'+allValidTestPasses[i]).attr('disabled',true);
				}	
			}
			//if(validTPs.length != 0)//commented
				//multiSelectList.setSelectedItemsFromArray("testPassName",validTPs);//commented	
		}	
		
		testcase.showTestCase();
		$("#noTestCaseDiv").hide();
		Main.hideLoading();
	},
	
	//Aler Box
	alertBox:function(msg)
	{       $("#divAlert").empty();
			$("#divAlert").append(msg);
			$('#divAlert').dialog({modal: true, title: "Import "+testcase.gConfigStatus, height:'auto',width:'auto',resizable: false, buttons: { "Ok":function() { $(this).dialog("close");}} });//Added By Mohini for Resource File
	}, 
	
	alertBoxOnRead:function(msg)
	{
			$("#divAlert").empty();
			html='<fieldset><legend><b>'+testcase.gConfigStatus+'</b></legend><label id="lbl1">Total '+testcase.gConfigTestCase+' :'+" "+'<font color="blue">'+imp.totc+'</font></label><br />'+'<label id="lbl1">Valid '+testcase.gConfigTestCase+' :'+" "+'<font color="green">'+imp.blExl+'</font></label><br />'+'<label id="lbl1">Invalid '+testcase.gConfigTestCase+' :'+" "+'<font color="red">'+imp.intc+'</font></label><br /></fieldset>';//added by Mohini for resource flie
			$("#divAlert").append(html);
			$("#divAlert").append('<br /><fieldset><legend><b>Details</b></legend>'+msg+'</fieldset>');
			$('#divAlert').dialog({modal: true, title: "Import "+testcase.gConfigStatus, height:'auto',width:'auto',resizable: false, buttons: { "Ok":function() { $(this).dialog("close");}} });
	},  
	//Test pass populate 
	populateTestPass:function() 
	{		
		Main.showLoading();
		var temp=$('#userW').text();
		if(temp.indexOf("//")!=-1)
			temp=temp.substring(0,temp.indexOf("//"));
		
		temp=jQuery.trim(temp);
		Main.changeTabURL($("#projectName").val());
		testcase.startIndexT = 0;
		var markup = '<p class="clear"></p><h3>There are no '+testcase.gConfigTestCase+'s.</h3>';//Added by Mohini for Resource file
		$("#t2TableArea").empty();
        $("#t2TableArea").append(markup);
		
		
		
		if($.inArray('1',security.userType)!=-1)
		{
		 var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="SPUserID" /><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/></ViewFields>'+
				'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
		}
		else
		{
			var securityIdsForProject=security.userAssociationForProject[$("#projectName").val()].split(',');
	
			if($.inArray('2',securityIdsForProject)!=-1 || $.inArray('5',securityIdsForProject)!=-1)
			{
				var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="SPUserID" /><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/></ViewFields>'+
				'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
	
			}
			else 
			{
				
				 var query ='<Query><Where><And><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq><Eq>'+
					         '<FieldRef Name="SPUserID" />'+
					         '<Value Type="Text">'+_spUserId+'</Value></Eq></And></Where>'+
					         '<ViewFields><FieldRef Name="SPUserID" /><FieldRef Name="ID"/><FieldRef Name="tstMngrFulNm"/><FieldRef Name="TestPassName" /><FieldRef Name="Description" /><FieldRef Name="CreateDate" /><FieldRef Name="DueDate" /><FieldRef Name="Tester" /></ViewFields>'+
							'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';

			}
		}

		
		document.getElementById('testPassName').length = 0;
		
		var TestPassName = testcase.dmlOperation(query,'TestPass');		
		if( TestPassName != null || TestPassName != undefined)
		{									
			multiSelectList.importTestCaseFlag = 1;
			multiSelectList.createMultiSelectList("testPassName",TestPassName,"TestPassName","ID","130px;");
			document.getElementById('btnSave').disabled = false;		
		}
		else
		{
			$("#testPassName").html('No '+testcase.gConfigTestPass);//Added by Mohini for Resource file		
			// block all fields as there is no TestPass for this Project.				
			document.getElementById('btnSave').disabled = 'true';						
			var markup = '<p class="clear"></p><h3>There are no '+testcase.gConfigTestCase+'s.</h3>';//Added by Mohini for Resource file
			$("#t2TableArea").empty();
	        $("#t2TableArea").append(markup);
	        var TestCaseCount='<label>Showing ' +0+'-'+0+' of total  ' +0+testcase.gConfigTestCase+'(s)</label> | <a id="previous" style="cursor:pointer"  onclick="testcase.startIndexTDecrement();">Previous</a> | <a id="next" style="cursor:pointer"  onclick="testcase.startIndexTIncrement();">Next</a>';//Added by Mohini for Resource file
	        $('#divTestCaseCount').empty();
		    $('#divTestCaseCount').append(TestCaseCount);	
		    document.getElementById('previous').disabled="disabled";
		    document.getElementById('previous').style.color='#989898'; 
		    document.getElementById('next').disabled="disabled";
		    document.getElementById('next').style.color='#989898'; 			
		}
		window.setTimeout("Main.hideLoading()", 200);	
	},
	//End of populate Test Passes
	
	//ShowTestCases 
	showTestCase:function()
	{
		Main.showLoading();
		var TotalTestPassIDArray = new Array();				
		var id=new Array();	
		$("#testPassName div div li").each(
				function()
				{
					if($(this).children(".mslChk").attr('Id') != undefined)
						TotalTestPassIDArray.push($(this).children(".mslChk").attr('Id').split("_")[1]);
				});
		var testcaseids = new Array();
		
		for(var t=0;t<TotalTestPassIDArray.length;t++)
		{
			var CamlQuery = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+TotalTestPassIDArray[t]+'</Value></Eq></Where><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
			var TesterListResult = testcase.dmlOperation(CamlQuery,'Tester');
			if(TesterListResult == null || TesterListResult == undefined)
			{
			   //Code modified by Rajiv on 22 feb to resolve bug # 801
				$('#testPassName_'+TotalTestPassIDArray[t]).attr('title','No '+testcase.gConfigTester+' assigned for this '+testcase.gConfigTestPass);//Added by Mohini for Resource file
				$('#testPassName_'+TotalTestPassIDArray[t]).attr('checked',false);
				$('#testPassName_'+TotalTestPassIDArray[t]).attr('disabled',true);					
			}
			else
			{
				$('#testPassName_'+TotalTestPassIDArray[t]).attr('disabled',false);
				$('#testPassName_'+TotalTestPassIDArray[t]).attr('title','');
	
			}
		}
	
			
		for(var k=0;k<TotalTestPassIDArray.length;k++)
		{   		
			var query ='<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+TotalTestPassIDArray[k]+'</Value></Eq></Where><ViewFields><FieldRef Name="TestCaseID" /></ViewFields></Query>';
			var TestPassToTestCaseResult = testcase.dmlOperation(query,'TestPassToTestCaseMapping');
			
			if(TestPassToTestCaseResult != null && TestPassToTestCaseResult != undefined)
			{
				for(var t=0;t<TestPassToTestCaseResult.length;t++)
				{				
					if($.inArray(TestPassToTestCaseResult[t]['TestCaseID'],testcaseids)==-1)
						testcaseids.push(TestPassToTestCaseResult[t]['TestCaseID']);
				}
			}
		}
		//Ankita: 8/27/2012 Bulk Data handling
		if(testcaseids.length<=147)
		{
			var query = '<Query><Where>';
			var orEndTags='';
			for(var i=0;i<testcaseids.length-1;i++)
			{
				query +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseids[i]+'</Value></Eq>';
				orEndTags +='</Or>';
			}
			query +='<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseids[i]+'</Value></Eq>';
			query +=orEndTags;
			query +='</Where>'+
					'<OrderBy>'+
		      			'<FieldRef Name="ID" Ascending="False" />'+
		   			'</OrderBy>'+
					'</Query>';	
			var TCResult= testcase.dmlOperation(query,'TestCases');
			if(TCResult!=null && TCResult!= undefined)
				var TestCaseList = TCResult;
		}
		else
		{
				var numberOfIterations=Math.ceil(testcaseids.length/147);
		       	var iterations=0;
		       	var query;
		       	var orEndTags;
		       	var TestCaseList = new Array();
		       	for(var y=0; y<numberOfIterations-1; y++)
		       	{
		       		query = '<Query><Where>';
		       		orEndTags ='';
		       		for(var i=iterations; i<(iterations+147)-1; i++)
		       		{
		       			query +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseids[i]+'</Value></Eq>';
		       			orEndTags +='</Or>';
		       		}
		       		query +='<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseids[i]+'</Value></Eq>';
					query +=orEndTags;
					query +='</Where>'+
							'<OrderBy>'+
				      			'<FieldRef Name="ID" Ascending="False" />'+
				   			'</OrderBy>'+
							'</Query>';	
					var TCResult= testcase.dmlOperation(query,'TestCases');
					if(TCResult!=null && TCResult!= undefined)
						$.merge(TestCaseList,TCResult);
					iterations +=147;
		       	}
		       	query = '<Query><Where>';
	       		orEndTags ='';
	       		for(var i=iterations; i<testcaseids.length-1; i++)
	       		{
	       			query +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseids[i]+'</Value></Eq>';
	       			orEndTags +='</Or>';
	       		}
	       		query +='<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testcaseids[i]+'</Value></Eq>';
				query +=orEndTags;
				query +='</Where>'+
						'<OrderBy>'+
			      			'<FieldRef Name="ID" Ascending="False" />'+
			   			'</OrderBy>'+
						'</Query>';	
				var TCResult= testcase.dmlOperation(query,'TestCases');
				if(TCResult!=null && TCResult!= undefined)
					$.merge(TestCaseList,TCResult);


		}
		var markup ='';
		var TestCaseCount;
		if(TestCaseList != null || TestCaseList != undefined)
		{		
			markup+='<p class="clear"></p> '+
					'<table class="gridDetails" cellspacing="0"><thead><tr >'+
					'<td class="tblhd center" style="width:5%"><span>#</span></td>'+
					'<td class="tblhd " style="width:30%"><span>Test Case Name</span></td>'+
					'<td class="tblhd " style="width:20%"><span>Associated Project</span></td>'+
					'<td class="tblhd " style="width:20%"><span>Associated Test Pass</span></td>'+								
					'<td class="tblhd center" style="width:8%"><span>Edit Item</span></td>'+ 
					'</tr></thead><tbody>';
			var TestCaseListLength =  TestCaseList.length;
			testcase.testCaseLength = TestCaseList.length;
			if(TestCaseListLength>=(testcase.startIndexT+5))
				var Ei=testcase.startIndexT+5;
			else
				var Ei=TestCaseListLength;
			var par="1";
			TestCaseCount='<label>Showing ' +((testcase.startIndexT)+1)+'-'+Ei+' of total  ' +TestCaseListLength+' Test Case(s)</label> | <a id="previous" style="cursor:pointer" onclick="testcase.startIndexTDecrement();">Previous</a> | <a id="next" style="cursor:pointer"  onclick="testcase.startIndexTIncrement();">Next</a>';
			for(var j=testcase.startIndexT;j<Ei;j++)
			{
				var testp = TestCaseList[j]['TestPassID'];		
				testp = testp.split(",");
				var testPassNames='';			
				for(var t=0;t<testp.length-1;t++)
				{				
					
					var queryTestPass = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testp[t]+'</Value></Eq></Where><ViewFields><FieldRef Name="TestPassName" /></ViewFields></Query>';
					var testPResult = testcase.dmlOperation(queryTestPass,'TestPass');
					if(testPResult != null || testPResult != undefined)
					{					
						testPassNames += (testPResult[0]['TestPassName'] != null || testPResult[0]['TestPassName'] != undefined) ? testPResult[0]['TestPassName'] : '' ;
						testPassNames +=", ";
					}
				}
				
				var queryTestPass = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testp[t]+'</Value></Eq></Where><ViewFields><FieldRef Name="TestPassName" /></ViewFields></Query>';
				var testPResult = testcase.dmlOperation(queryTestPass,'TestPass');
				zif(testPResult != null || testPResult != undefined)		
					testPassNames += (testPResult[0]['TestPassName'] != null || testPResult[0]['TestPassName'] != undefined) ? testPResult[0]['TestPassName'] : '' ;			
				markup+='<tr><td class="center"><span>'+TestCaseList[j]['ID']+'</span></td><td><span><a onclick="testcase.editTestCase('+TestCaseList[j]['ID']+')" style="cursor: pointer;" title="'+TestCaseList[j]['testCaseName']+'" ><font color="#FF6500"><b>'+trimText(TestCaseList[j]['testCaseName'],30)+'</a></font></a></span></td>';
				markup+='<td ><span><a onclick="testcase.alertBox(\''+document.getElementById('projectName').options[document.getElementById('projectName').selectedIndex].text+'\')" style="cursor:pointer" title="'+document.getElementById('projectName').options[document.getElementById('projectName').selectedIndex].text+'"> '+trimText(document.getElementById('projectName').options[document.getElementById('projectName').selectedIndex].text,30)+'</a></span></td><td ><span><a style="cursor:pointer" onclick="testcase.alertBox(\''+testPassNames+'\')" title="'+testPassNames+'">'+trimText(testPassNames,35)+'</a></span></td>'; 
				markup+='<td class="center"><span><a title="Edit Test Case Details" style="cursor: pointer;" class="pedit" onclick="testcase.editTestCase('+TestCaseList[j]['ID']+')" >&nbsp;</a><a onclick="testcase.delTestcase('+TestCaseList[j]['ID']+')" title="Delete Test Case"  class="pdelete"  style="cursor: pointer;">&nbsp;</a></td></tr>';
			}
			markup+='</tbody></table>';
			$("#t2TableArea").html(markup);
			resource.updateTableColumnHeadingTesMgnt();//Added by Mohini for resource file
	        $('#divTestCaseCount').html(TestCaseCount);
	        if(testcase.startIndexT<=0)
	        { 
				document.getElementById('previous').disabled="disabled";  
				document.getElementById('previous').style.color='#989898';
	
			}
			else
			{
				document.getElementById('previous').disabled=false;
				document.getElementById('previous').style.color = '#FF6600';
			}
			     
			if(TestCaseListLength<=((testcase.startIndexT)+5))
			{ 
				document.getElementById('next').disabled="disabled";  
				document.getElementById('next').style.color='#989898';
			}
			else
			{
				document.getElementById('next').disabled=false;
				document.getElementById('next').style.color = '#FF6600';
			}
		}
		else
		{
			markup = '<p class="clear"></p><h3>There are no '+testcase.gConfigTestCase+'s.</h3>';//Added by Mohini for Resource file
			$("#t2TableArea").empty();
	        $("#t2TableArea").append(markup);
	        TestCaseCount='<label>Showing ' +0+'-'+0+' of total  ' +0+testcase.gConfigTestCase+'(s)</label> | <a id="previous" style="cursor:pointer"  onclick="testcase.startIndexTDecrement();">Previous</a> | <a id="next" style="cursor:pointer"  onclick="testcase.startIndexTIncrement();">Next</a>';//Added by Mohini for Resource file
	        $('#divTestCaseCount').empty();
		    $('#divTestCaseCount').append(TestCaseCount);	
		    document.getElementById('previous').disabled="disabled";
		    document.getElementById('previous').style.color='#989898';
		    document.getElementById('next').disabled="disabled";
		    document.getElementById('next').style.color='#989898';  		
		}
		window.setTimeout("Main.hideLoading()", 200);
	
	},
	//End of showTestCases
	
	//Save operation
	saveTestCase:function (availableTestPassIDs,testCaseName,description,Estimatedtime)
	{	
		Main.showLoading();
	 	imp.blExl++;
	    var testCase= jQuery.trim(testCaseName);
	 	testCase= testCase.replace(/\s+/g, " ");
		var desc = description; // for bug 2209
		desc = jQuery.trim(desc);
		var testPassID =new Array();
		var TesterAvailabilityFlag=0;	
		var tcflag=0;
				
		testPassID  = availableTestPassIDs;
		
		if(testCase.length > 0)	
		{
				if(testCase.indexOf("|") == -1 && desc.indexOf("|") == -1)
				{
					var orEnd = '';
					var testcasejquery='<Query><Where><And><Eq><FieldRef Name="testCaseName" /><Value Type="Text">'+Main.filterData(testCase)+'</Value></Eq>';
					for(var i=0;i<testPassID.length-1;i++)
			       	{
			       		testcasejquery+='<Or><Contains><FieldRef Name="TestPassID" /><Value Type="Text">|'+testPassID[i]+'|</Value></Contains>';
			       		orEnd += '</Or>';
			       	}
			       	testcasejquery+='<Contains><FieldRef Name="TestPassID" /><Value Type="Text">|'+testPassID[i]+'|</Value></Contains>';
			       	testcasejquery+=orEnd;	
					testcasejquery+= '</And></Where></Query>';
					var testcasejqueryListItems=testcase.dmlOperation(testcasejquery,'TestCases');
					if(testcasejqueryListItems!=null && testcasejqueryListItems!=undefined)
					{
						imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+testcase.gConfigTestCase+" with "+Main.filterData(testCase)+" name already exists!<br/>";//Added by Mohini for Resource file
						imp.intc++;
						imp.blExl--;
					    tcflag= 1;
					    Main.hideLoading();
					}
				}
				else
				{
					imp.msg=imp.msg+"Row"+imp.row+" "+":"+" "+"Pipe(|) is not allowed in "+testcase.glblValOfTestcaseName+" &"+testcase.glblvalOfDescription+"!<br/>";//Added by Mohini for Resource file
					imp.intc++;
					imp.blExl--;
				    tcflag= 1;
				    Main.hideLoading();
				}	
  		}
			
		if(tcflag==0)
		{
	       /*****Code for mapping************/
	        var testcaseids = new Array();
	        var tpid = availableTestPassIDs[0];
	        testcase.getTesterForTestPass(tpid);
	   		if(testcase.TesterSPUserIDForTP[ tpid ] != undefined)
		   	{
				var camlQuery = '<Query><Where><Contains><FieldRef Name="TestPassID" /><Value Type="Text">|'+tpid+'|</Value></Contains></Where></Query>';
				var TestCasesResult = testcase.dmlOperation(camlQuery,'TestCases');
				if(TestCasesResult != null && TestCasesResult != undefined)
					testcaseids = TestCasesResult;
			 }
				var tpids = new Array();
				for(var ii=0;ii<availableTestPassIDs.length;ii++)
					tpids.push('|'+availableTestPassIDs[ii]+'|');
	   			desc = (desc.length != 0)? desc : '-';		
				var listname = jP.Lists.setSPObject(testcase.SiteURL,'TestCases');	
				var obj = new Array();
				obj.push({'testCaseName':testCase,
						  'summary':desc,				  
						  'TestPassID':tpids,
						  'status': 'Not Completed',
						  'Estimatedtime':Estimatedtime,
						  'position':testcaseids.length
				});
				var result = listname.updateItem(obj);		
				imp.saveTestPassToTestCaseMapping(result.ID,availableTestPassIDs);		
				imp.msg+="Row"+imp.row+" "+":"+" "+testcase.gConfigTestCase+" added successfully<br/>";//Added by Mohini for Resource file	
				testcase.clearFields();
				multiSelectList.selectItem("testPassName",testPassID[0]);
				
		}	
		window.setTimeout("Main.hideLoading()", 200);				
	},
	//Mapping 
	saveTestPassToTestCaseMapping:function(testCaseID,availableTestPassIDs)
	{
		    var listname = jP.Lists.setSPObject(testcase.SiteURL,'TestPassToTestCaseMapping');			
					
			for(var i=0;i<availableTestPassIDs.length;i++)
			{
		        var TesterBuffer = new Array();
		        if(testcase.TesterSPUserIDForTP[ availableTestPassIDs[i] ] == undefined)
			    {
			        var query = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+availableTestPassIDs[i]+'</Value></Eq></Where>'+
						'<ViewFields><FieldRef Name="ID" /><FieldRef Name="SPUserID"/></ViewFields></Query>';
		            var TesterListItems= testcase.dmlOperation(query,'Tester');
		            if(TesterListItems != undefined)
			        {
			            for(var j=0;j<TesterListItems.length;j++)
			            {
							if($.inArray(TesterListItems[j]['SPUserID'],TesterBuffer)==-1)
								TesterBuffer.push(TesterListItems[j]['SPUserID']);				
					    }
					 }   
				}
				else
					TesterBuffer = testcase.TesterSPUserIDForTP[ availableTestPassIDs[i] ].split(",");     
			    for(var t=0;t<TesterBuffer.length;t++)
			    {
			    	var obj = new Array();								
					obj.push({ 'Title' :'TestPassToTestCaseMapping',
							   'TestPassID':availableTestPassIDs[i],
							   'TestCaseID':testCaseID,
							   'status': 'Not Completed',
							   'SPUserID' :TesterBuffer[t]
							});
					var res = listname.updateItem(obj);
			    }
			    
			}
	},
	
	//Loader
	showLoading:function()
	{
		$.blockUI({
	    message: '<img src="../SiteAssets/images/ajax-loader.gif" alt="Loading..." />',
	    css: 
	    {
	           border: 'none',
	           padding: '15px',
	           backgroundColor: '#000',
	           '-webkit-border-radius': '10px',
	           '-moz-border-radius': '10px',
	           'border-top-left-radius': '10px',
	           'border-top-right-radius': '10px',
	           'border-bottom-right-radius': '10px',
	           'border-bottom-left-radius': '10px',
	           opacity: .5,
	           color: '#fff',
	           width: '40px',
	           top: ($(window).height() - 40) / 2 + 'px',
	           left: ($(window).width() - 40) / 2 + 'px'
	    }
	    });			
	},
	hideLoading:function()
	{
		setTimeout($.unblockUI, 200); 
	}
}

	

