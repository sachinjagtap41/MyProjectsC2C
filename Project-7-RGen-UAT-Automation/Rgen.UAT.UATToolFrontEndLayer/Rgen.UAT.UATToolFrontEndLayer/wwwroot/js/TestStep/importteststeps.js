// Copyright © 2012 RGen Solutions . All Rights Reserved.
// Contact : support@rgensolutions.com 

var impTS={

	i:0,
	msg:'',
	row:0,
	blExl:0,
	intc:0,
	totc:0,
	testCaseIDsInPage:new Array(),
	testWithSpecialCharacter:0,
	flagForImport:0,
	isPortfolioOn:false,
	
	importExcel:function()
	{
	
		//Code added by Ejaz Waquif for Portfolio DT:2/3/2014
		 var query = "<Query></Query>";
	     var result = teststep.dmlOperation(query,'Portfolio');
	     
	     if(result != undefined && result != null && result != "")
	     {
	     if(result [0]["EnablePortfolio"] == "1")
	     	impTS.isPortfolioOn = true;
	     }
	     //End of Code added by Ejaz Waquif for Portfolio DT:2/3/2014

		impTS.msg="";
		impTS.testCaseIDsInPage.length=0;
		var allValidTestCaseIds = new Array();
		if(typeof(window.ActiveXObject) == undefined) 
		{
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
		else
		{				
			var stat = 0;
			var flgActiveX = 0, flgWord = 0; //shilpa: 26sep
			try
			{
				var excel = new ActiveXObject("Excel.Application");
				stat = 1;
				
				/* shilpa 23 sep */
				var objActiveX = new ActiveXObject("Scripting.FileSystemObject");
	            flgActiveX = 1;
				var objWord = new ActiveXObject("Word.Application");
				flgWord = 1;
				if(flgActiveX == 1 && flgWord == 1)
					var doc = objWord.Documents.Add();
			}
			catch(ex)
			{
				Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
				
        		if(flgActiveX == 1 && flgWord == 0) /* shilpa 26sep */
        			impTS.alertBox("Microsoft Word cannot be detected.");
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
			window.setTimeout('$("#upload").remove();',200);
			window.setTimeout('Main.showLoading();',200);
			
			var stat=0;
			var blnk=0;
			//Validation
			if(path=="" || path==null || path==undefined)
			{
				impTS.msg="You have not selected the file.<br/>";
				stat=1;
				impTS.alertBox(impTS.msg);
				Main.hideLoading();
                return;
			}
			var ext = path.split('.').pop().toLowerCase();
			if($.inArray(ext, ['xlsx','xls']) == -1) 
			{
				if(stat==0)
				{
	    			impTS.msg="Please select the Excel file Template for "+teststep.gConfigTestStep+" with extention .xls or .xlsx!<br/>";
	    			stat = 1;
	    		}
			}
			else
			{
				var excel_file = excel.Workbooks.Open(path);
				var excel_sheet;
				try
				{
					excel_sheet = excel.Worksheets(teststep.gConfigTestStep+" Template");//Added by Mohini for Resource file
				}
				catch(e)
				{
					impTS.alertBox("Please select the valid "+teststep.gConfigTestStep+" template!<br/>");//Added by Mohini for Resource file
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
						var tpFound;
						var availableTestCaseIDs = new Array();
						var	availableRoleIDs = new Array();
						impTS.blExl=0;
						
						var cnt=excel_sheet.UsedRange.Rows.Count;
						blnk=0;
				
						updateRTE('rte2');
						var currTestStepName =document.getElementById('hdn' + 'rte2').value;
						var myRange1 = document.body.createTextRange();
						if(isPortfolioOn)
						{
							var versionCellNo=2;var testPassCellNo=3;var testCaseCellNo=4;var testStepCellNo=5;var expectCellNo=6;var roleCellNo=7;
						}
						else
						{
							var testPassCellNo=2;var testCaseCellNo=3;var testStepCellNo=4;var expectCellNo=5;var roleCellNo=6;
						}
							
						for(var an=4;an<=cnt+blnk;an++)
						{
							
							/* shilpa 23 sep */
							$('#divHtml').html("");
							var sel = objWord.Selection;
							for(var mm=0;mm<100;mm++)
						    {
								try
								{
									excel_sheet.Cells(an,expectCellNo).copy();
						        	sel.Paste();
						        	break;
							    }
						        catch(e)
						        {
									continue;
						        }
						    }
							var xdDoc = new ActiveXObject("Microsoft.XMLDOM");
							xdDoc.loadXML(doc.WordOpenXML); 
							var openXML = xdDoc.xml;
							impTS.pasteData(openXML,divHtml);
							var expRes = $('#divHtml').html();
							doc.Select();
							sel.Delete();
							
							var testCaseNamesInPage= new Array();
							
							var roleNamesInPage= new Array();
							var roleIDsInPage= new Array();
				
							projectFound = false;
							tpFound = false;
							availableTestCaseIDs.length = 0;
							availableRoleIDs.length = 0;
							
							d[0] = excel_sheet.Cells(an,1).Value;    //Project Name
							if(d[0] != undefined)
								d[0] = jQuery.trim(d[0].toString());
							
							if(isPortfolioOn)	
							{
								d[6] = excel_sheet.Cells(an,versionCellNo).Value;    //Version Name
								if(d[6] != undefined)
									d[6] = jQuery.trim(d[6].toString());
							}
							
							d[1] = excel_sheet.Cells(an,testPassCellNo).Value;    //Test Pass Name
							if(d[1] != undefined)
								d[1] = jQuery.trim(d[1].toString());
		
							d[2] = excel_sheet.Cells(an,testCaseCellNo).Value;    //Test Case Name
							if(d[2] != undefined)
								d[2] = jQuery.trim(d[2].toString());
								
		
							/* shilpa 15 apr */
							try
							{
								d[3] = "<a href=\'"+excel_sheet.Cells(an,testStepCellNo).Hyperlinks(blnk+1).Address+"\'>" + excel_sheet.Cells(an,testStepCellNo).Value + "</a>";	 //Test Steps
							}
							catch(e)
							{
								d[3] = excel_sheet.Cells(an,testStepCellNo).Value;	 //Test Steps
							}
							if(d[3] != undefined)
								d[3] = jQuery.trim(d[3].toString());
							
							
							d[4] = $('#divHtml').html(); //shilpa 20 sep
							if(excel_sheet.Cells(an,roleCellNo).Value != undefined)
							{
								d[5] = excel_sheet.Cells(an,roleCellNo).Value;	 //Roles
								if(d[5] != undefined)
									d[5] = jQuery.trim(d[5].toString());
							}
							else
								d[5] = '';					
							impTS.row++;
							
							//Project Name
							if(d[0] == '' || d[0] == undefined || d[0]==null)
							{
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigProject+" is a mandatory field!<br/>";//Added by Mohini for Resource file
								impTS.intc++;
								continue;
							}
							
							//Version Name
							if(isPortfolioOn)
							{
								if(d[6] == '' || d[6] == undefined || d[6]==null)
								{
									impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigVersion+" is a mandatory field!<br/>";//Added by Mohini for Resource file
									impTS.intc++;
									continue;
								}
								else
								{
								   if( $.trim(d[6]) !=$.trim ( $("#versionTitle label").attr("title") )  )
								   {
								   		impTS.msg+="Row"+impTS.row+" "+":"+teststep.gConfigVersion+" "+d[6]+"is not available for the respective "+teststep.gConfigProject.toLowerCase()+"!<br/>";//Added by Mohini for Resource file
										impTS.intc++;
										continue;
	
								   }
								}
							}

							if(d[1] == '' || d[1] == undefined || d[1]==null)
							{
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestPass+" is a mandatory field!<br/>";//Added by Mohini for Resource file
								impTS.intc++;
								continue;
							}
							if(d[2] == '' || d[2] == undefined || d[2]==null)
							{
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestCase+" is a mandatory field!<br/>";//Added by Mohini for Resource file
								impTS.intc++;
								continue;
							}
							if(d[5] == '' || d[5] == undefined || d[5]==null)
							{
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gCongfigRole+"s is a mandatory field!<br/>";//Added by Mohini for Resource file
								impTS.intc++;
								continue;
							}
							if(d[3] == '' || d[3] == undefined || d[3]==null)
							{
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestStep+"s is a mandatory field!<br/>";//Added by Mohini for Resource file
								impTS.intc++;
								continue;
							}
							if(d[2]!=null) //Code added by deepak for sequencing
							{
								if(d[2].split('|').length > 1)
								{
									impTS.msg+="Row"+impTS.row+" "+":"+" "+"Cannot add "+teststep.gConfigTestStep+" in more than one "+teststep.gConfigTestCase+"!<br/>";//Added by Mohini for Resource file
									impTS.intc++;
									continue;
								}
							}	//Code added by deepak for sequencing
		
							
							if(teststep.projectName == d[0])
							{
								$(this).attr('selected','true');
								//teststep.populateTestPass();
								teststep.populateRole();
								projectFound =true
								//return;
							}
								
							if(!projectFound)
							{	
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigProject+" <b>\""+d[0]+"</b>\" does not exist!<br/>";
								impTS.intc++;
								continue;
							}
							
							//Test Pass Name
							if(d[1] == "")
							{
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestPass+" field can not be blank! Please enter valid "+teststep.gConfigTestPass+" name<br/>";//Added by Mohini for Resource file
								impTS.intc++;
								continue;
							}
							else
							{
								if(teststep.testPassName == d[1])
								{
									teststep.populateTestCase();
									tpFound =true;
								}
								if(!tpFound)
								{	
									impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestPass+" <b>\""+d[1]+"\"</b> does not exist!<br/>";//Added by Mohini for Resource file
									impTS.intc++;
									continue;
								}
							}
							
							//Test Cases
							var testCaseNamesInExcelcell = new Array();
							testCaseNamesInExcelcell = d[2].split('|');
							
							impTS.testCaseIDsInPage.length = 0;//Added by Harshal on 20 April for Test STep is saving on wrong Test Case
							$("#testCaseName div div li").each(function()
							{		     
						     	testCaseNamesInPage.push($(this).children('span').text());
								impTS.testCaseIDsInPage.push($(this).children(".mslChk").attr('Id').split("_")[1]);	
							});
							
							var invalidTestCases = new Array();
							for(var i=0;i<testCaseNamesInExcelcell.length;i++)
							{
								var index = $.inArray(testCaseNamesInExcelcell[i].replace(/^\s+|\s+$/g, ""),testCaseNamesInPage);//Remove whitespaces
								if(index==-1)
								{
								    invalidTestCases.push(testCaseNamesInExcelcell[i]);
				               	}
				               	else
				               	{
									if($.inArray(impTS.testCaseIDsInPage[index],availableTestCaseIDs) == -1)
										availableTestCaseIDs.push(impTS.testCaseIDsInPage[index]);
								}
							}
							$.merge(allValidTestCaseIds,availableTestCaseIDs);
							
							if(invalidTestCases.length>0)
							{
								if(invalidTestCases .length == 1)
									impTS.msg+="Row"+impTS.row+" "+":"+teststep.gConfigTestCase+" \""+invalidTestCases +"\" is not available for the respective "+teststep.gConfigProject.toLowerCase()+"!<br/>";//Added by Mohini for Resource file
								else
								 	impTS.msg+="Row"+impTS.row+" "+":"+teststep.gConfigTestCase+"s \""+invalidTestCases +"\"  are not available for the respective "+teststep.gConfigProject+"!<br/>";//Added by Mohini for Resource file
				            }
				            
						    if(invalidTestCases.length>0)
						    {
						    	impTS.intc++;
				            	continue;
				            }
				            
							//TestSteps
							var testStepNames = d[3];
							
							//Expected Result
							var expResult = d[4];
							
							//Roles
							var roleNamesInExcelcell = new Array();
							roleNamesInExcelcell = d[5].split(',');	
							
							$("#role div div li").each(function()
							{
						     	roleNamesInPage.push($(this).attr("title"));
								roleIDsInPage.push($(this).children(".mslChk").attr('Id').split("_")[1]);	
							});
							
							var invalidRoles = new Array();
							var roleNames = new Array();
							var flagForRoleChk = '';
							for(var i=0;i<roleNamesInExcelcell.length;i++)
							{
								var index = $.inArray(roleNamesInExcelcell[i].replace(/^\s+|\s+$/g, ""),roleNamesInPage);//Remove whitespaces
								if(index==-1)
								{
								    invalidRoles.push(roleNamesInExcelcell[i]);
								}
				               	else
				               	{
									if($.inArray(roleIDsInPage[index],availableRoleIDs) == -1)
									{
										availableRoleIDs.push(roleIDsInPage[index]);
										
									}	
									multiSelectList.allRolesUnchecked=false;
								}
							}
							
							if(invalidRoles.length>0)
							{
								if(invalidRoles.length == 1)
								{	
									if(invalidRoles[0] != "")
										impTS.msg+="Row"+impTS.row+" "+":"+teststep.gCongfigRole+" \""+invalidRoles +"\"is not available for the respective "+teststep.gConfigProject.toLowerCase()+"!<br/>";
									else
										impTS.msg+="Row"+impTS.row+" "+":"+teststep.gCongfigRole+" name is missing after comma(,) for the respective "+teststep.gConfigProject.toLowerCase()+"!<br/>";		
								}	
								else
								 	impTS.msg+="Row"+impTS.row+" "+":"+teststep.gCongfigRole.toLowerCase()+"s \""+invalidRoles +"\"are not available for the respective "+teststep.gConfigProject.toLowerCase()+"!<br/>";//Added by Mohini for Resource file
				            	impTS.intc++;
				            	continue;
				            }
				            /////// 3 Sep 2013////////////////
				            enableDesignMode("rte2","", false);
					        excel_sheet.Cells(an,testStepCellNo).Copy();//:SD
				            for(var ss=0;ss<100;ss++)
					        {
					            rteCommand("rte2","paste");
					            updateRTE('rte2');
					            var testStepNameNew =document.getElementById('hdn' + 'rte2').value.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");
								if(testStepNameNew != "")
								{
									//Added on 23 July 2014 by HRW
									$(document).contents().find('#rte2').contents().find('table').css('width','900px');
									$(document).contents().find('#rte2').contents().find('td').css('width','900px');
									if($(document).contents().find('#rte2').contents().find('td').css('height') != undefined && $(document).contents().find('#rte2').contents().find('td').css('height') != '')
									{
										var height = parseInt( $(document).contents().find('#rte2').contents().find('td').css('height').split("p")[0]);
										if(height > 80)
											height = "80px";
									}
									else		
										height = "80px";									//height = "118px";		
									$(document).contents().find('#rte2').contents().find('tr').attr('height',height);
									$(document).contents().find('#rte2').contents().find('tr').css('height',height);
									$(document).contents().find('#rte2').contents().find('td').attr('height',height);
									$(document).contents().find('#rte2').contents().find('td').css('height',height);		
									updateRTE('rte2');
									var testStepNameNew =document.getElementById('hdn' + 'rte2').value.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");
									break;
								}	
							}
							jQuery.trim(testStepNameNew);
							if(expResult != undefined)
							{
					            expResult = $('#divHtml').html(); // shilpa
							}	
							impTS.saveTestStep(availableTestCaseIDs,testStepNameNew,expResult,availableRoleIDs);
						}
			    
			}
			enableDesignMode("rte2",currTestStepName, false);
			window.setTimeout("Main.hideLoading()", 200);
		}
		if(impTS.blExl==0 && stat==0 && impTS.intc==0)
		{
			if(impTS.testWithSpecialCharacter ==0 )
				impTS.msg+="Excel Sheet is blank.<br/>Please add some "+teststep.gConfigTestCase+"s and then import!<br/>";
		}
		
		//Total test cases
		impTS.totc = impTS.blExl+ impTS.intc;
			
		if(impTS.blExl!=0 || impTS.intc!=0)
		{
			impTS.alertBoxOnRead(impTS.msg);
		}
		else
		{
			impTS.alertBox(impTS.msg);
		}
		
		impTS.msg="";
		impTS.row=0;
		impTS.blExl=0;
		impTS.intc=0;
		impTS.totc=0;
		
		/* shilpa 24sep */
		objWord.Quit(0);

		excel_file.Close();
		excel.Quit();
		
        teststep.flagForTC = false;
        multiSelectList.setSelectedItemsFromArray("testCaseName",allValidTestCaseIds); 
        multiSelectList.selectAll('assotestcases');// for bug 10535
        teststep.pagination();
        $('.navTabs h2:eq(2)').click();	// For imp/exp template
        
		Main.hideLoading();
	},
	
	//Alert box
	alertBox:function(msg)
	{       $("#divAlert").empty();
			$("#divAlert").append(msg);
			$('#divAlert').dialog({modal: true, title: "Import "+teststep.gConfigStatus, height:'auto',width:'auto',resizable: false, buttons: { "Ok":function() { $(this).dialog("close");}} });//Added by Mohini for Resource file
	}, 
	
	alertBoxOnRead:function(msg)
	{
			$("#divAlert").empty();
			html='<fieldset><legend><b>'+teststep.gConfigStatus+'</b></legend><label id="lbl1">Total '+teststep.gConfigTestStep+'(s) :'+" "+'<font color="blue">'+impTS.totc+'</font></label><br />'+'<label id="lbl1">Valid '+teststep.gConfigTestStep+'(s) :'+" "+'<font color="green">'+impTS.blExl+'</font></label><br />'+'<label id="lbl1">Invalid '+teststep.gConfigTestStep+'(s) :'+" "+'<font color="red">'+impTS.intc+'</font></label><br /></fieldset>';//Added by Mohini for Resource file
			$("#divAlert").append(html);
			$("#divAlert").append('<br /><fieldset><legend><b>Details</b></legend>'+msg+'</fieldset>');
			$('#divAlert').dialog({modal: true, title: "Import "+teststep.gConfigStatus, height:'auto',width:'auto',resizable: false, buttons: { "Ok":function() { $(this).dialog("close");}} });//Added by Mohini for Resource file

	}, 

	//Saving TestSteps
	saveTestStep:function(availableTestCaseIDs,testStepNames,expResult,availableRoleIDs)
	{
		impTS.flagForImport = 0;
		teststep.flagForSave = true;
		Main.showLoading();
		var roleNames=new Array();
		var testStepName = testStepNames;
		jQuery.trim(testStepName);	
		
		if(expResult == undefined)//Bug code push
			expResult = '';
		var testStepDetail = expResult;
		jQuery.trim(testStepDetail);
		testStepDetail = (testStepDetail.length == 0) ? '-' : testStepDetail;
		
		var testCaseID =new Array();
		testCaseID = availableTestCaseIDs;
		//Added for 7794
		var camlQuery = '<Query><Where>';
		var q = '';
		$("#testCaseName div div li").each(
		function()
		{
			camlQuery +='<Or><Eq><FieldRef Name="TestCasesID" /><Value Type="Text">'+$(this).children(".mslChk").attr('Id').split("_")[1]+'</Value></Eq>';
			q += '</Or>';	
		});	
		camlQuery += '<Eq><FieldRef Name="TestCasesID" /><Value Type="Text">0</Value></Eq>';
		camlQuery += q;
		camlQuery += '</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="position"/></ViewFields><OrderBy><FieldRef Name="position" Ascending="True" /></OrderBy></Query>';
		/************************Logic for Positions/Sequence*********************************************************************/
			var obj = new Array();
			var actionListName = jP.Lists.setSPObject(teststep.SiteURL,'Action');
			var ActionResult = teststep.dmlOperation(camlQuery,'Action');
	
		/*********************************************************************************************/ 	
	    testCaseID.join(",");    
	    var roleIDs = new Array();
	    roleIDs = availableRoleIDs;

		roleIDs.join(","); 
		
		if(roleIDs=='' || roleIDs==undefined || roleIDs.length== 0 )//commented on 2 feb 2012 by rajiv to soleve issue related to bug 524 
			roleIDs.push("1");
		
		window.setTimeout("Main.hideLoading()", 200);  
		
		teststep.RoleNameBasedOnRoleID.length=0; 
			 $("#role div div  li").each(function()
				{
		   			teststep.RoleNameBasedOnRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] =$(this).attr("title");																
					if(  $.inArray(  $(this).children(".mslChk").attr('Id').split("_")[1],availableRoleIDs )!=-1)
						roleNames.push($(this).children('span').text());
					
				});
	    if(testStepName.indexOf("~") == -1 && testStepDetail.indexOf("~") == -1)
	    {
			if(testStepName.length == 0 || testCaseID == null || testCaseID == undefined || testCaseID == '')
			{
				impTS.msg+="Row"+impTS.row+" "+":"+" "+"Fields marked with asterisk(*) are mandatory field!<br/>";
			}
			else
			{		
				var rolesPresentForTester = teststep.preSaveTestStep(roleIDs,testCaseID);
				if(rolesPresentForTester == 0)
				{
					if(multiSelectList.allRolesUnchecked==false)
						impTS.msg+="Row"+impTS.row+" "+":"+" "+"There is no "+teststep.gConfigTester.toLowerCase()+" with the selected "+teststep.gCongfigRoles+", hence the "+teststep.gConfigTestStep+" cannot be saved with the selected "+teststep.gCongfigRoles+"!<br/>";//Added by Mohini for Resource file
					else
					    impTS.msg+="Row"+impTS.row+" "+":"+" "+"There is no "+teststep.gConfigTester.toLowerCase()+" with the standard "+teststep.gCongfigRole+"(default "+role+"), hence the "+teststep.gConfigTestStep+" cannot be saved!<br/>";//Added by Mohini for Resource file
					
	                impTS.intc++;		
				}
				else
				{
					var sameTSName = 0;
					if(teststep.choiceForTPID == "1" && ActionResult !=undefined)
					{
						var ts = teststep.filterData(testStepName);
						ts = ts.replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");
						ts = ts.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, ""); 
						ts = ts.replace(/\s+/g, '');
						jQuery.trim(ts);
						var name = '';
						for(var i=0;i<ActionResult.length;i++)
						{
							name = ActionResult[i]['actionName'].replace(/&nbsp;/g,'').replace(/^\s+|\s+$/g, "");
							jQuery.trim(name);
							name = teststep.filterData(name);
							name = name.replace(/\t/g, "").replace(/\n/g, "").replace(/\r/g, ""); 
							name = name.replace(/\s+/g, '');
							jQuery.trim(name);
							if(name == ts && testCaseID[0] == ActionResult[i]['TestCasesID'])
							{
								sameTSName = 1;	
								break;
							}		
						}
					}
					if(sameTSName == 1)
					{
						impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestStep+" with "+ts+" name already exists!!<br/>";//Added by Mohini for Resource file
						impTS.intc++;
					}	
					else
					{
						teststep.flagForSaveMessage = true;
						teststep.flagForSaveMessage1 = true;
						var listname =  jP.Lists.setSPObject(teststep.SiteURL,'Action');
						var obj = new Array();
						obj.push({'actionName':testStepName,//testStepName.replace(/</g,'&lt;').replace(/>/g,'&gt;'),
								  'ExpectedResult': $('#divHtml').html(),//testStepDetail,//.replace(/</g,'&lt;').replace(/>/g,'&gt;'),				  
								  //'status':	document.getElementById('status').options[document.getElementById('status').selectedIndex].text,
								  'TestCasesID'	: testCaseID,
								  'TestPassID':teststep.testPassId, //$('#testPassName').val(),
								  'Role' : rolesPresentForTester,
								  'position':(ActionResult !=undefined && ActionResult !=null)?ActionResult.length:0,//(teststep.result!=undefined)?teststep.result.length:0  commneted by HRW for Bug 7794
								  'ExcelImport':1
						});
						var result = listname.updateItem(obj);
					    
					    //Valid TestSteps Count
				         impTS.blExl++;
		
						teststep.saveTestCaseToTestStepMapping(result.ID,roleIDs,testCaseID);
						if(teststep.flagForSaveMessage==true)
						{
							if(teststep.flagForSaveMessage1==true)
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestStep+" added successfully!<br/>";//Added by Mohini for Resource file
							else
							{
								var roleNames=new Array();
								for(var i=0;i<teststep.roleNotSaved.length;i++)
									roleNames.push(teststep.RoleNameBasedOnRoleID[teststep.roleNotSaved[i]]);
									
								impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestStep+" is saved successfully but it could not be saved under "+teststep.gCongfigRoles+" " +roleNames+" as it does not have any Tester with these "+teststep.gCongfigRoles+"<br/>";//Added by Mohini for Resource file
							}	
						}	
						else
						{
							teststep.TestPassWithNoRolesOfTestStep=$.unique(teststep.TestPassWithNoRolesOfTestStep);
								
							//Code added by Rajiv and Harshal on 31 jan to show the test passes under which the test steps cannot be saved.		
							if(teststep.TestPassWithNoRolesOfTestStep.length !=0)
							{
								if(teststep.TestPassWithNoRolesOfTestStep.length==1)
									impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestStep+" is saved successfully but it could not be saved under another associated "+teststep.gConfigTestPass+" "+teststep.TestPassWithNoRolesOfTestStep+" as it does not have any "+teststep.gConfigTester+" with "+teststep.gCongfigRole+" "+roleNames+"<br/>";//Added by Mohini for Resource file

								else
									impTS.msg+="Row"+impTS.row+" "+":"+" "+teststep.gConfigTestStep+" is saved successfully but it could not be saved with all the selected "+teststep.gCongfigRoles+" under these associated testpasses viz."+teststep.TestPassWithNoRolesOfTestStep+" as they do not have "+teststep.gConfigTester+"(s) with respective "+teststep.gCongfigRoles+"<br/>";//Added by Mohini for Resource file
							}			   
						}	
						multiSelectList.selectNone("role");
					}
				}			
			}
			impTS.testWithSpecialCharacter = 0;
		}
		else
		{
			impTS.msg+="Row"+impTS.row+" "+":"+" "+"~ is not allowed in "+teststep.gConfigTestStep+" Details and Expected Result!<br/>";//Added by Mohini for Resource file
			impTS.testWithSpecialCharacter = 1;
		}	
			
		window.setTimeout("Main.hideLoading()", 200);
	},
	
	populateTestPass:function()
	{
			Main.showLoading();
			var temp=$('#userW').text();
			if(temp.indexOf("//")!=-1)
				temp=temp.substring(0,temp.indexOf("//"));
			temp=jQuery.trim(temp);
			
			Main.changeTabURL($("#projectName").val());
			teststep.startIndexA=0;
					
			var markup = '<p class="clear"></p><h3>There are no '+teststep.gConfigTestStep+'s.</h3>';//Added by Mohini for Resource file	
			
			if( $.inArray('1',security.userType)!=-1)
			{
				var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq></Where>'+
					'<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/></ViewFields>'+
					'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
			}
			else
			{
				var prjId=$("#projectNames").val();
			    if(prjId==null || prjId==undefned)
					prjId=teststep.searchKey;
	
						var getSecId='<Query><Where><And>'+
						'<Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+prjId+'</Value></Eq>'+
						'<Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq>'+
						'</And></Where><ViewFields><FieldRef Name="ProjectId"/><FieldRef Name="SecurityId"/><FieldRef Name="SPUserID"/></ViewFields></Query>';
						var securityId=teststep.dmlOperation(getSecId,'UserSecurity');
						var secIdArray=new Array();
							
						if(securityId!= null && securityId!= undefined)
						{
							for(var x=0;x<securityId.length;x++)
								secIdArray.push(securityId[x]['SecurityId']);
						}
	
				
						if($.inArray('2',secIdArray)!=-1 || $.inArray('5',secIdArray)!=-1)
						{
							var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq></Where>'+
										'<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/></ViewFields>'+
										'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
						}
						else 
						{
								var query ='<Query><Where><And><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq><Eq>'+
						         '<FieldRef Name="SPUserID" />'+
						         '<Value Type="Text">'+_spUserId+'</Value></Eq></And></Where>'+
						         '<ViewFields><FieldRef Name="ID"/><FieldRef Name="tstMngrFulNm"/><FieldRef Name="TestPassName" /><FieldRef Name="Description" /><FieldRef Name="CreateDate" /><FieldRef Name="DueDate" /><FieldRef Name="Tester" /></ViewFields>'+
								'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
						}
			}	
	
			var rolequery = '<Query><Where><Eq><FieldRef Name="ProjectID" /><Value Type="Text">'+$("#projectName").val()+'</Value></Eq></Where><ViewFields><FieldRef Name="Role" /></ViewFields></Query>';
			var roleResult = teststep.dmlOperation(rolequery,'TesterRole');	
			
			document.getElementById('testPassName').length = 0;
			var TestPassName = teststep.dmlOperation(query,'TestPass');
			if( TestPassName != null || TestPassName != undefined)
			{						
				document.getElementById('btnSave').disabled = false;
				for(var i=0;i<TestPassName.length;i++)
				{			 																
					var obj=new Option();
					document.getElementById('testPassName').options[i]=obj;
					document.getElementById('testPassName').options[i].text = trimText(TestPassName[i]['TestPassName'].toString(),33);
					document.getElementById('testPassName').options[i].value = TestPassName[i]['ID'];	
					document.getElementById('testPassName').options[i].title = TestPassName[i]['TestPassName'];			
				}	
				
				if(teststep.testPassId!=''&& teststep.testPassId!= null && teststep.testPassId!= undefined)
				{
					document.getElementById('testPassName').value = teststep.testPassId;
				}
				else
				{
					document.getElementById('testPassName').options[0].selected = true;
				}
			}
			else
			{
				document.getElementById('btnSave').disabled = 'true';
				$('#testCaseName').html('');
				var obj=new Option();
				document.getElementById('testPassName').options[0]=obj;
				document.getElementById('testPassName').options[0].text = "No "+teststep.gConfigTestPass;//Added by Mohini for Resource file
			}
			window.setTimeout("Main.hideLoading()", 200);															
	},
saveDetailsInMasterList:function(TesterSPUserIDWithRoleArray,AllRoles,DelfromMA,testCaseID2,TestPassIDOfRemovedTestCases,TestPassesOfRemovedRoles) //TesterSPUserIDWithRoleArray also contains the TestPassID
{
     var testCaseID=new Array();
     var testPassID=new Array();
     var temp= new Array();
    
        ///////////Code to fetch all testpasses of all the selectecd testcase added by Rajiv and Harshal on 31 Jan 2012////////////////
         	    var testPassIDVariable;
			    for(var i=0;i<TesterSPUserIDWithRoleArray.length;i++)
			    {   testPassIDVariable = TesterSPUserIDWithRoleArray[i][0].split(",")[1];
			    	if($.inArray(testPassIDVariable ,testPassID)==-1)	
			    		testPassID.push(testPassIDVariable);
				}
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        /////////////////////////Code added by Rajiv and Harhsal to retrieve names of all the testpasse(s) and the roles of teststeps under them ;added on 31 jan 2012////////////////////////
        
        		var camlQuery='';
				camlQuery = '<Query><Where>';
			
				for(var i=0;i<testPassID.length-1;i++)			 
					camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+testPassID[i]+'</Value></Eq>';
				camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">'+testPassID[i]+'</Value></Eq>';
				for(var i=0;i<testPassID.length-1;i++)
					camlQuery +='</Or>';
				camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="AllRoles"/><FieldRef Name="TestPassName"/></ViewFields></Query>';
			    var TestPassResult = teststep.dmlOperation(camlQuery,'TestPass');

     	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//for(var jj=0;jj<testPassID.length;jj++) //Commented by Rajiv and Harshal on 2 feb to resolve bug 424/444 (as the sequece of testpasses in collection and array were different)
		for(var jj=0;jj<TestPassResult.length;jj++) //Modified by Rajiv and Harshal on 2 feb to resolve bug 424/444 (as the sequece of testpasses in collection and array were different)
		{
	     	    	        //Added by Harshal on 30 Jan 2012
			     			if(teststep.TestPassNameBasedOnTestPassID[TestPassResult[jj]['ID']] == undefined)
			     			 	teststep.TestPassNameBasedOnTestPassID[TestPassResult[jj]['ID']] = TestPassResult[jj]['TestPassName'];
			     		
			     			 var rolesForTestPassID = new Array();
						     var roleNameForRoleID=new Array();
						     var MyActivityListname =jP.Lists.setSPObject(teststep.SiteURL,'MyActivity');
						     var AllRolesFromList=new Array(); 
						     var AllRolesToBeSaved =new Array();
						     var AllSaveableRoles=new Array();
						     var rolesToBeSavedOnTP='';
						     var rolesToBeSavedOnTPArray=new Array();
						     var AllRolesFromListvar;
						      
						     if(TestPassResult !=null && TestPassResult !=undefined && TestPassResult[0]["AllRoles"]!=undefined )
						     {  
						     	AllRolesToBeSaved= AllRoles;
						     	
						        if(TestPassResult[jj]["AllRoles"]!='-1')// if there were some teststeps under this testpass. //modified by rajiv and harhsal on 1/2 feb
						        {
						     	AllRolesFromList=TestPassResult[jj]["AllRoles"].split(',');
						     	AllRolesFromListvar=TestPassResult[jj]["AllRoles"];
						     	}
						     	else // if there were no teststeps under this testpass.
						     	$.merge(AllSaveableRoles,AllRolesToBeSaved);
						     }
						     if(AllSaveableRoles.length==0)
						     {
							     var c=0;
							     if($.inArray("1",AllRolesToBeSaved)==0)
							     	AllRolesToBeSaved.splice(0,1);
							      $("#role div div  li").each(function()
										{
								   			roleNameForRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] =$(this).children('span').text();	
											if(AllRolesFromList.length!=0 && c<AllRolesToBeSaved.length ) //Modified by Rajiv on 2 feb to resolve bug 508 
											{		
												if($.inArray(AllRolesToBeSaved[c],AllRolesFromList)==-1)
													AllSaveableRoles.push(AllRolesToBeSaved[c]);
												c++;		
											}
										});
										if($.inArray("1",AllRolesFromList)==-1)//Here c==0 is removed for bug 6139
										{
										AllSaveableRoles.push('1');		
										}
							 }	
							 else  //23-12-11
							 {
							 		 $("#role div div  li").each(function()
										{
											roleNameForRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] =$(this).children('span').text();																
										});
							 }	
						    var selectedIndexOfProject=document.getElementById('projectName').selectedIndex;
							var selectedIndexOfTestPass=document.getElementById('testPassName').selectedIndex;
							var projectName=teststep.projectName; //document.getElementById('projectName').options[selectedIndexOfProject].text; 
						
						    var obj = new Array();
						    var roleofcurract;
						    for(var i=0;i<TesterSPUserIDWithRoleArray.length;i++)
							{   
							    if(AllRolesFromList.length==0)
							    {	
							    	if(TesterSPUserIDWithRoleArray[i][0]!='-3' && TesterSPUserIDWithRoleArray[i][0].split(",")[1] == TestPassResult[jj]['ID'])//Modified by Rajiv and Harshal on 2 feb to resolve bug 424/444 (as the sequece of testpasses in collection and array were different)
							    	{
								    	 obj.push({		
									                  'Title':'MasterDetailsList',
												  	  'ProjectName':projectName,
												  	  'TestPassID':TestPassResult[jj]['ID'], //TesterSPUserIDWithRoleArray[i][0].split(",")[1],//modified on 31 jan 2012
												  	  'ProjectID':TestPassResult[jj]['ProjectId'], //$('#projectName').val(),
												  	  'TestPassName':TestPassResult[jj]['TestPassName'], //teststep.TestPassNameBasedOnTestPassID[ TesterSPUserIDWithRoleArray[i][0].split(",")[1] ], //modified on 31 jan 2012
												  	  'Action': 'Begin Testing',
												  	  'TesterSPUserID':TesterSPUserIDWithRoleArray[i][0].split(",")[0],//modified on 31 jan 2012
												  	  'RoleID':TesterSPUserIDWithRoleArray[i][1],
												  	  'RoleName':roleNameForRoleID[TesterSPUserIDWithRoleArray[i][1]]
											});	
										}				
										 rolesToBeSavedOnTP = (i==0)? TesterSPUserIDWithRoleArray[i][1] :(rolesToBeSavedOnTP+','+TesterSPUserIDWithRoleArray[i][1]);
										 
										  //Added by Harshal on 24 Feb 2012
										 if(rolesForTestPassID[TesterSPUserIDWithRoleArray[i][0].split(",")[1]] == undefined)
											rolesForTestPassID[TesterSPUserIDWithRoleArray[i][0].split(",")[1]] = TesterSPUserIDWithRoleArray[i][1];
										 else 
										 {
										 	rolesForTestPassID[TesterSPUserIDWithRoleArray[i][0].split(",")[1]] += "," + TesterSPUserIDWithRoleArray[i][1];
										 }
										 
							    }
							    else
							    {   //if(TesterSPUserIDWithRoleArray[i][1]!='1') //commented on 2 feb by rajiv
							    	{
										if($.inArray(TesterSPUserIDWithRoleArray[i][1],AllSaveableRoles)!=-1 )
									    {   
									    	if(TesterSPUserIDWithRoleArray[i][0]!='-3' && TesterSPUserIDWithRoleArray[i][0].split(",")[1] == TestPassResult[jj]['ID'])//Modified by Rajiv and Harshal on 2 feb to resolve bug 424/444 (as the sequece of testpasses in collection and array were different)
									        {
										        obj.push({
										                  'Title':'MasterDetailsList',
													  	  'ProjectName':projectName,
													  	  'TestPassID':TestPassResult[jj]['ID'], //TesterSPUserIDWithRoleArray[i][0].split(",")[1],//modified on 31 jan 2012 to get the TestPasssID
													  	  'ProjectID':TestPassResult[jj]['ProjectId'],
													  	  'TestPassName':TestPassResult[jj]['TestPassName'], //teststep.TestPassNameBasedOnTestPassID[ TesterSPUserIDWithRoleArray[i][0].split(",")[1] ], //modified on 31 jan 2012 to get the TestPassNAme
													  	  'Action': 'Begin Testing',
													  	  'TesterSPUserID':TesterSPUserIDWithRoleArray[i][0].split(",")[0],//modified on 31 jan 2012
													  	  'RoleID':TesterSPUserIDWithRoleArray[i][1],
													  	  'RoleName':roleNameForRoleID[TesterSPUserIDWithRoleArray[i][1]],
													  	  //'AllRoles':AllRoles
												});
											}		
										}
										 rolesToBeSavedOnTP = (i==0)? TesterSPUserIDWithRoleArray[i][1] :(rolesToBeSavedOnTP+','+TesterSPUserIDWithRoleArray[i][1]);
										 
										 //Added by Harshal on 24 Feb 2012
										  if(rolesForTestPassID[TesterSPUserIDWithRoleArray[i][0].split(",")[1]] == undefined)
											rolesForTestPassID[TesterSPUserIDWithRoleArray[i][0].split(",")[1]] = TesterSPUserIDWithRoleArray[i][1];
										 else 
										 {
										 	rolesForTestPassID[TesterSPUserIDWithRoleArray[i][0].split(",")[1]] += "," + TesterSPUserIDWithRoleArray[i][1];
										 }
									}
								}
							}
							
							if(obj.length!=0)
								var res = MyActivityListname.updateItem(obj);
							var object1=new Array();
							var rolesToBeSavedOnTP2 = new Array();
							
							////////////////////////  Code Modified by Harshal on 24 Feb 2012(Above code is commented & copy of above code modified here) //////////////////////////
							rolesToBeSavedOnTP2 = rolesForTestPassID[TestPassResult[jj]['ID']];
							if(AllRolesFromList.length>0)
							{
							    /*Code modififed by rajiv on 2 feb 2012*/
							    
								if(rolesToBeSavedOnTP2=='')
							    {
							    	rolesToBeSavedOnTP2 = "1";
							    }
							    
							    if(rolesToBeSavedOnTP2.length!=0)
							      {
							       rolesToBeSavedOnTP2=AllRolesFromListvar+','+rolesToBeSavedOnTP2;    
							      }
						    }    
						    
						    rolesToBeSavedOnTPArray = rolesToBeSavedOnTP2.split(',');
						    uniqueRolesToBeSavedOnTPArray= new Array();
							for(var t=0;t<rolesToBeSavedOnTPArray.length;t++)
							{
								if($.inArray(rolesToBeSavedOnTPArray[t],uniqueRolesToBeSavedOnTPArray)==-1)
									uniqueRolesToBeSavedOnTPArray.push(rolesToBeSavedOnTPArray[t]);
							}
							
							rolesToBeSavedOnTP2 = uniqueRolesToBeSavedOnTPArray.join(',')
							
							/////////////////////////   End Of Code Modification  ///////////////////////////
							
							var TestPassListname= jP.Lists.setSPObject(teststep.SiteURL,'TestPass');
							object1.push({
											  	  'ID':TestPassResult[jj]['ID'],//Modified by Rajiv and Harshal on 2 feb to resolve bug 424/444 (as the sequece of testpasses in collection and array were different)
											  	  'AllRoles':rolesToBeSavedOnTP2
										});
										
						   var result = TestPassListname.updateItem(object1);
			  		 
			   
			   //Code to set the flag for prompt message, if no tester with the current teststep role is present under another testpass 
			   
		}
},

pasteData:function(openXML,element){
		Main.showLoading();
		$(openXML).find('part > xmlData > document > body').children().each(function(index,val){
			var arr = new Array();
			
        	if($(val).find('p > hyperlink')[0]!=undefined)  // for hyperlink
			{	
				if($(val).find('pPr > numPr')[0]!=undefined)  // If text contains any bullets
				{
					var p = document.createElement("ul");
					p.id = "ul" + index;
					element.appendChild(p);
					
					var paraText = $(val).find('r').next().text(); //$(val).find('t').text();
												
					var rId = $(val).find('p > hyperlink')[0].getAttribute('r:id');	
					// JS: Using imageData ID  find the Target XPath
					var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
					var paraText1 = $(val).find('p > hyperlink').text();
					var p = document.createElement("a");
					p.innerHTML = paraText1;
					p.href = target;
					element.appendChild(p);
					
					var p1 = document.createElement("li");
					p1.innerHTML = paraText;
					p1.appendChild(p);
					$('#ul' + index).append(p1);
					$('#ul' + index).css('padding-left','30px');
				}
				else // for normal text
				{
					var rId = $(val).find('p > hyperlink')[0].getAttribute('r:id');	
					// JS: Using imageData ID  find the Target XPath
					var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
					var paraText = $(val).find('p > hyperlink').text();
					var p = document.createElement("a");
					p.innerHTML = paraText;
					p.href = target;
					element.appendChild(p);

					var breakLine = document.createElement("br");  // shilpa:25sep
	        		element.appendChild(breakLine);
				}
				$(element).find('a').css('margin-left','5px') // shilpa:27th may bug:8001
			}

        	if($(val).find('r > t')[0]!=undefined && $(val).find('p > hyperlink')[0]==undefined)
			{
				if($(val).find('pPr > numPr')[0]!=undefined)  // If text contains any bullets
				{
					var p = document.createElement("ul");
					p.id = "ul" + index;
					element.appendChild(p);
					var paraText = $(val).find('r > t').text();
					var p1 = document.createElement("li");
					p1.innerHTML = paraText;
					$('#ul' + index).append(p1);
					$('#ul' + index).css('padding-left','30px');
				}
				else // for normal text
				{
					var paraText = $(val).find('r > t').text();
					var p = document.createElement("p");
					p.innerHTML = paraText;
					element.appendChild(p);
				}
			}
			
			
			for(var j = 0; j <= $(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip').length; j++) {
			
			if($(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip')[j]!=undefined){
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip')[j].getAttribute('r:embed');	
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		img.src = imageData;
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		element.appendChild(breakLine);
			}
			
			}
		});
		Main.hideLoading();
	}
	
}