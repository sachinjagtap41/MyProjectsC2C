/* 
   Copyright © 2013 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

//Global Constants
var ID = "ID";
var ProjectID = "ProjectID"; 
var TestPassID = "TestPassID";
var RoleID = "RoleID";  
var TesterName = "TesterName"; 
var ProjectName = "projectName";

var importExport=
{
	row:0,
	msg:"",
	msgSucc:"",
	succ:0,
	arrProjID: new Array(),
	sGroupName:'UAT App Members',//"UATAppTestEnv Members",//'UATAppDevEnv Members',//"UAT App Members",//
	
	init:function()
	{
		$("#clsExpTemp").click(function()
		{	
			Main.showLoading();
			if(typeof (window.ActiveXObject) == "undefined" || typeof (window.ActiveXObject)  == undefined) 
			{
	            //importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>ActiveX is not enabled on your browser.<br />Please enable ActiveX on your browser to see the expected results!</p>");
	        	importExport.showPrerequisites();
	        	Main.hideLoading(); 
	        }
	        else
	        {
				try
				{
					var xlApp = new ActiveXObject("Excel.Application");
				}
				catch(ex)
				{
					importExport.showPrerequisites();
	        		Main.hideLoading();
	        		return;
				}
				
				if(window.navigator.appName=="Microsoft Internet Explorer")
				{
					$('#template-form').dialog('open'); 
				}
				else
				{
					alert('This feature is best supported by IE as Active-x Dependent.');
				}
				Main.hideLoading();
			}	
		});	
				
		$("#clsImpCont").click(function()
		{	
			Main.showLoading();
			if(typeof (window.ActiveXObject) == "undefined" || typeof (window.ActiveXObject)  == undefined) 
			{
	            //importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>ActiveX is not enabled on your browser.<br />Please enable ActiveX on your browser to see the expected results!</p>");
	        	importExport.showPrerequisites();
	        	Main.hideLoading(); 
	        }
	        else
	        {
				try
				{
					var xlApp = new ActiveXObject("Excel.Application");
				}
				catch(ex)
				{
					importExport.showPrerequisites();
	        		Main.hideLoading();
	        		return;
				}

				if(window.navigator.appName=="Microsoft Internet Explorer")
				{
					$('#import-form').dialog('open');
				}
				else
				{
					alert('This feature is best supported by IE as Active-x Dependent.');
				}
				Main.hideLoading();
			}	
		});
		
		$("#import-form").dialog({
			autoOpen: false,
			height: 180,
			width: 300,
			modal: true,
			buttons: {
			"Ok": function() { 
				$(this).dialog("close");
				importExport.importTemplate($("#chkclrList").is(":checked"));                    
			},
			Cancel: function() {                	
			    $(this).dialog("close");
			}
			},
			open:function() { $(".ui-dialog-titlebar-close").hide(); },
			close: function() {}
		});	
		
		$("#template-form").dialog({
            autoOpen: false,
            height: 180,
            width: 300,
            modal: true,
            buttons: {
                "Yes": function() { 
                	$(this).dialog("close");
                	
                	$.blockUI
				 	({
					            
				        //<img src="/SiteAssets/ITLCNext/images/ajaxloader.gif" style="margin-top: 5px;" />
				        message: '<div style="color:white;font-weight:normal;font-size:16px; font-family:calibri;">Please Wait! Excel Template is Downloading...</div>',
				        //message: '<h1><img src="../images/ajaxloader.gif" /> Please Wait! GSX Data is Loading...</h1>'
				        css: 
				        { 
				            border: 'none', 
				            padding: '15px', 
				            backgroundColor: '#000000', 
				            '-webkit-border-radius': '10px',
				            '-moz-border-radius': '10px',
				            'border-top-left-radius': '10px',
				            'border-top-right-radius': '10px',
				            'border-bottom-right-radius': '10px',
				            'border-bottom-left-radius': '10px', 
				            opacity: .7, 
				            color: '#fff',
				            width: '240px',
				            top: ($(window).height() - 40) / 2 + 'px',
				            left: (($(window).width() - 40) / 2) - 70 + 'px' 
						} 
					});
					
					setTimeout(function() 
					{
                		importExport.exportTemplate("Yes");
                	}, 800);
                	                    
                },
                "No": function() 
                {                	
                    $(this).dialog("close");
                    
                    $.blockUI
				 	({
					            
				        //<img src="/SiteAssets/ITLCNext/images/ajaxloader.gif" style="margin-top: 5px;" />
				        message: '<div style="color:white;font-weight:normal;font-size:16px; font-family:calibri;">Please Wait! Excel Template is Downloading...</div>',
				        //message: '<h1><img src="../images/ajaxloader.gif" /> Please Wait! GSX Data is Loading...</h1>'
				        css: 
				        { 
				            border: 'none', 
				            padding: '15px', 
				            backgroundColor: '#000000', 
				            '-webkit-border-radius': '10px',
				            '-moz-border-radius': '10px',
				            'border-top-left-radius': '10px',
				            'border-top-right-radius': '10px',
				            'border-bottom-right-radius': '10px',
				            'border-bottom-left-radius': '10px', 
				            opacity: .7, 
				            color: '#fff',
				            width: '240px',
				            top: ($(window).height() - 40) / 2 + 'px',
				            left: (($(window).width() - 40) / 2) - 70 + 'px' 
						} 
					});
					
					setTimeout(function() 
					{
                    	importExport.exportTemplate("No");
                    }, 800);
                },
                "Cancel": function() 
                {                	
                    $(this).dialog("close");
                }
            },
            open:function() { $(".ui-dialog-titlebar-close").hide(); },
            close: function() {}
        });	
	},

	exportTemplate:function(prefilled)
	{
		var excelStat = 0;
		try
			{
			if(typeof (window.ActiveXObject) == "undefined" || typeof (window.ActiveXObject)  == undefined) 
			{
	            //importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>ActiveX is not enabled on your browser.<br />Please enable ActiveX on your browser to see the expected results!</p>");
	        	importExport.showPrerequisites();
	        	Main.hideLoading(); 
	        }
	        else
	        {
				try
				{
					var xlApp = new ActiveXObject("Excel.Application");
				}
				catch(ex)
				{
					importExport.showPrerequisites();
	        		Main.hideLoading();
	        		return;
				}
				if($("#testPassName").val() != "0")
				{
					xlApp.Visible = false;
					xlApp.DisplayAlerts = false;
					var xlBook = xlApp.Workbooks.Add();
					xlBook.worksheets("Sheet1").activate;
					var XlSheet = xlBook.activeSheet;
					XlSheet.Name="Tester Template";  
						   			   	
				   	XlSheet.Range("A1:H1000").NumberFormat = "@";
				   	XlSheet.cells(1,1).value= "Note:";			
					XlSheet.cells(1,1).font.colorindex = 1;
				   	XlSheet.cells(1,1).font.bold="true";
				   	XlSheet.cells(1,1).interior.colorindex = 16;
				   	XlSheet.cells(2,1).interior.colorindex = 16;
				   	XlSheet.cells(3,1).interior.colorindex = 16;
				   	//XlSheet.cells(4,1).interior.colorindex = 16;
				   	XlSheet.cells(1,1).font.Name = "Segoe UI";
					
				   	XlSheet.cells(1,2).value= "Please follow the same format as given below to add the data! If you change the format of the template, data will not be imported properly.";		   	
				   	XlSheet.cells(2,2).value= "Please make sure you can only use comma separated values for multiple TestPasses or Roles.";
				   	//XlSheet.cells(3,2).value= "Blank value in Role column will be considered as Standard role.";
				    XlSheet.cells(3,2).value= "Please use 'Email address' input format to enter Tester Name.";
				   	
				   	//Creating Table 	
		            XlSheet.ListObjects.Add(1, XlSheet.Range("A4:E5"), "", true).Name = "TesterInformation";//Area - HRW
		            if(xlApp.Version=="15.0")
		            {
		            	XlSheet.ListObjects("TesterInformation").TableStyle = "TableStyleLight9";
		            }
		            else
		            {
		            	XlSheet.ListObjects("TesterInformation").TableStyle = "TableStyleLight11";
		            }
		            XlSheet.Range("A4:E4").Font.ColorIndex = 2;//Area - HRW
		            //End
		            
		            //Freeze Panes
					XlSheet.Rows(5).Select();
		    		xlApp.ActiveWindow.FreezePanes = true;
		    		XlSheet.cells(5, 1).Select();
					//End
					
					//Header Background
					XlSheet.Range("B1:E3").Interior.ColorIndex = 15;//Area - HRW
		            XlSheet.Range("B1:E3").Font.ColorIndex = 1;//Area - HRW
		            XlSheet.Range("B1:E3").Font.Name = "calibri";//Area - HRW
		
					XlSheet.cells(4,1).value= "Project *";	
				   	XlSheet.cells(4,2).value= "TestPass *";
					XlSheet.cells(4,3).value= "Role";
				   	XlSheet.cells(4,4).value= "Tester *";
				   	XlSheet.cells(4,5).value= "Area";//Area - HRW
				   	
				   	XlSheet.cells(4,1).Characters(9,1).Font.colorindex= "3";
				   	XlSheet.cells(4,2).Characters(10,1).Font.colorindex= "3";
				   	//XlSheet.cells(4,3).Characters(6,1).Font.colorindex= "3";
				   	XlSheet.cells(4,4).Characters(8,1).Font.colorindex= "3";
				   	
				   	//Adding ToolTip Messages for Header Cell
				   	XlSheet.cells(4,1).AddComment("Please select the value from the Dropdown only.");
				   	XlSheet.cells(4,2).AddComment("Only comma separated values are allowed to have multiple TestPass association with the Tester.");
				   	XlSheet.cells(4,3).AddComment("Only comma separated values are allowed to have multiple Role association with the Tester.");
				   	XlSheet.cells(4,4).AddComment("Tester Name will be allow in this given format only 'DomainName\\Alias\'.");
				   	XlSheet.cells(4,5).AddComment("Please select the value from the Dropdown only.");//Area - HRW
				   	
			 	    XlSheet.Range("A4").EntireColumn.AutoFit();
			 	    XlSheet.Range("B4").EntireColumn.AutoFit();
				    XlSheet.Range("C4").EntireColumn.AutoFit();
			        XlSheet.Range("D4").EntireColumn.AutoFit();
			        XlSheet.Range("E4").EntireColumn.AutoFit();//Area - HRW
					
			        XlSheet.Range("A4").EntireColumn.columnwidth='25';
			        XlSheet.Range("B4").EntireColumn.columnwidth='25';
			        XlSheet.Range("C4").EntireColumn.columnwidth='35';
			        XlSheet.Range("D4").EntireColumn.columnwidth='35';
			        XlSheet.Range("E4").EntireColumn.columnwidth='30';	//Area - HRW	    
		
			        XlSheet.Range("A4").EntireColumn.WrapText='True';
			        XlSheet.Range("B4").EntireColumn.WrapText='True';
			        XlSheet.Range("C4").EntireColumn.WrapText='True';
			        XlSheet.Range("D4").EntireColumn.WrapText='True';	
			        XlSheet.Range("E4").EntireColumn.WrapText='True';	//Area - HRW        
		
			        XlSheet.Range("A4").EntireColumn.VerticalAlignment=true;
			        XlSheet.Range("A4").EntireColumn.HorizontalAlignment=true;
			      
			        XlSheet.Range("B4").EntireColumn.VerticalAlignment=true;
			        XlSheet.Range("B4").EntireColumn.HorizontalAlignment=true;
			       
			        XlSheet.Range("C4").EntireColumn.VerticalAlignment=true;
			        XlSheet.Range("C4").EntireColumn.HorizontalAlignment=true;
			       
			        XlSheet.Range("D4").EntireColumn.VerticalAlignment=true;
			        XlSheet.Range("D4").EntireColumn.HorizontalAlignment=true;	 
			        
					XlSheet.Range("E4").EntireColumn.VerticalAlignment=true;//Area - HRW
			        XlSheet.Range("E4").EntireColumn.HorizontalAlignment=true;	     
				        
			        XlSheet.cells(1,2).WrapText='False';
			        XlSheet.cells(2,2).WrapText='False';
			        XlSheet.cells(3,2).WrapText='False';
			        //XlSheet.cells(4,2).WrapText='False';
			        
			        xlApp.DisplayAlerts = true;
			        
			        XlSheet.Range("A6:E7").WrapText = 'True';//Area - HRW
			        
			        //Creating Dropdown for Project Name
			        var arrProject = $("#projectName option").map(function (i, el) { return $(el).text(); }).get();
			        var projName = $("#projectName option:selected").attr("title");
			        
			        var rn = XlSheet.range("a6:a1000");	
			        rn.Validation.Add(3,1,1,projName);
					rn.Validation.IgnoreBlank = 1;
					rn.Validation.InCellDropdown = 1;
					rn.Validation.ErrorMessage = "Select value from dropdown.";
					
					//Creating Dropdown for Area - Area - HRW
			        var arrArea = $("#area option").map(function (i, el) { return $(el).attr('title'); }).get();
			        var rn = XlSheet.range("e5:e1000");	
			        rn.Validation.Add(3,1,1,arrArea);
					rn.Validation.IgnoreBlank = 1;
					rn.Validation.InCellDropdown = 1;
					rn.Validation.ErrorMessage = "Select value from dropdown.";
					
					//Creating Dropdown for Test Pass
					var arrTestPass = $("#testPassName option:selected").attr("title");
			        
			        /*var rn = XlSheet.range("b6:b1000");	
			        rn.Validation.Add(3,1,1,arrTestPass);
					rn.Validation.IgnoreBlank = 1;
					rn.Validation.InCellDropdown = 1;
					rn.Validation.ErrorMessage = "Select value from dropdown.";*/
					
					//Data Validation for Role Name Text 
			        var rn=XlSheet.range("c6:c1000");
					rn.Validation.Add(6,1,8,"250");
					rn.Validation.IgnoreBlank =1;
					rn.Validation.InCellDropdown =1;
					rn.Validation.ErrorMessage = "Max 250 characters are allowed.";
					
					//Data Validation for Tester Name Text 
			        var rn=XlSheet.range("d6:d1000");
					rn.Validation.Add(6,1,8,"250");
					rn.Validation.IgnoreBlank =1;
					rn.Validation.InCellDropdown =1;
					rn.Validation.ErrorMessage = "Max 250 characters are allowed.";
					
					//Adding Default Value in the Role Field
			        //Data Validation for KPI Name 
			        /*var rn=XlSheet.range("a4:a1000");
					rn.Validation.Add(7,1,1,"=ISTEXT(A4)");
					rn.Validation.IgnoreBlank =1;
					rn.Validation.InCellDropdown =1;
		        	rn.Validation.ErrorMessage = "Only text is allowed";
		
			        //Data Validation for Period 
			        var rn=XlSheet.range("b4:b1000");
					rn.Validation.Add(4,1,1,"1/1/1975","12/31/2050");
					rn.Validation.IgnoreBlank =1;
					rn.Validation.InCellDropdown =1;
		        	rn.Validation.ErrorMessage = "Enter a valid date between 01/01/1975 and 12/31/2050 in MM/DD/YYYY format";
			        
					//Data Validation for Units 
			        var rn=XlSheet.range("e4:e1000");
			        rn.Validation.Add(7,1,1,"=ISTEXT(F4)");
					rn.Validation.IgnoreBlank =1;
					rn.Validation.InCellDropdown =1;
		        	rn.Validation.ErrorMessage = "Only characters are allowed";
		        	
					//Data Validation for Min KPI Value 
			        var rn=XlSheet.range("m4:m1000");
					rn.Validation.Add(2,1,5,"0");
					rn.Validation.IgnoreBlank =1;
					rn.Validation.InCellDropdown =1;
		        	rn.Validation.ErrorMessage = "Only numbers are allowed";
		        	*/
		        		
					if(prefilled=="Yes")
		        	{
		        		var i = importExport.fillTemp(XlSheet);//Added by HRW
		        		var testerMsg = "";
						if(i==0)
						{
							//Getting Project Name
							XlSheet.Cells(5,1).Value = projName;
							
							//Getting Test Pass Name
							XlSheet.Cells(5,2).Value = arrTestPass;
							
							//Getting Role Name
							var arrRole = $("#ulItemstesterRoles div li").map(function (i, el) { return $(el).attr("title"); }).get();
							XlSheet.Cells(5,3).Value = arrRole.join(",");
						
							testerMsg = "<p style='padding-left:15px; padding-top:15px;'>Sorry! Tester Information is not available.</p>";
							importExport.Alert(testerMsg+"<p style='padding-left:15px; padding-top:15px;'>Blank Template is Downloaded successfully!</p>");
						}
						else
						{
							importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Template Downloaded successfully!</p>");
						}
						
			        	xlApp.Visible = true;
			        
			        	xlApp = null;
			        	xlBook = null;
			        	XlSheet = null;
			        	
			        	Main.hideLoading();	
				             	
					}
					else
					{        	
			        	//Getting Project Name
						XlSheet.Cells(5,1).Value = projName;
						
						//Getting Test Pass Name
						XlSheet.Cells(5,2).Value = arrTestPass;
						
						//Getting Role Name
						var arrRole = $("#ulItemstesterRoles div li").map(function (i, el) { return $(el).attr("title"); }).get();
						XlSheet.Cells(5,3).Value = arrRole.join(",");
						
			        	importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Template Downloaded successfully!</p>");
			        	xlApp.Visible = true;
			        
			        	xlApp = null;
			        	xlBook = null;
			        	XlSheet = null;
			        	
			        	Main.hideLoading();
			        }
		        }
		        else
		        {
		        	tester.alertBox("Select the test pass first!");
		        	Main.hideLoading();
		        }
	        }	
		}
		catch(ex)
		{
			if(excelStat==1)
			{
				xlBook.close();
	        	xlApp.Quit();
	        	importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Error returned - "+ex.message+"</p>");
			}
			Main.hideLoading();
		}		
		CollectGarbage();
	},
	
	importTemplate:function(clearData)
	{
		var excelStat = 0;
		try
		{
			//Getting file Input
			$("#fileInput").click();
			
			var filePath=$("#fileInput").val();
			if(filePath=='' || filePath==null || filePath==undefined)
			{
				importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>You haven't selected the Excel Template to upload on UAT Tester Page.</p>");
				Main.hideLoading();
			}
			else
			{
				var ext = filePath.split('.').pop().toLowerCase();
				if($.inArray(ext, ['xlsx','xls']) == -1) 
				{
					importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Please select UAT Tester Excel Template only to upload .</p>");
					Main.hideLoading();
				}
				else
				{
					try
					{
						excelStat = 0;
						var excel = new ActiveXObject("Excel.Application");
						var excel_file = excel.Workbooks.Open(filePath);
						var excel_sheet;
						excelStat = 1;
					}
					catch(ex)
					{
						if(excelStat==0)
						{
							//importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Sorry for the inconvinience! There is some issue with your ActiveX Control on browser or Excel Application.</p>");
							importExport.showPrerequisites();
							Main.hideLoading();
							return;
						}
					}
					
					try
					{
						excel_sheet = excel.Worksheets("Tester Template");
						var tableName = excel_sheet.ListObjects(1).Name;
						if(tableName != "TesterInformation")
						{
							importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Sorry! We can not process this action!<br />May be selected Excel Template is not downloaded from the UAT portal.</p>");
							Main.hideLoading();
							return; 
						}
					}
					catch(e)
					{
						importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Please select the valid Tester Template!</p>");
						Main.hideLoading();
						return;
					}
					
					//Code to show Loading message
					$.blockUI
				 	({
					            
				        //<img src="/SiteAssets/ITLCNext/images/ajaxloader.gif" style="margin-top: 5px;" />
				        message: '<div style="color:white;font-weight:normal;font-size:16px; font-family:calibri;">Please Wait! Excel Template is Uploading...</div>',
				        //message: '<h1><img src="../images/ajaxloader.gif" /> Please Wait! GSX Data is Loading...</h1>'
				        css: 
				        { 
				            border: 'none', 
				            padding: '15px', 
				            backgroundColor: '#000000', 
				            '-webkit-border-radius': '10px',
				            '-moz-border-radius': '10px',
				            'border-top-left-radius': '10px',
				            'border-top-right-radius': '10px',
				            'border-bottom-right-radius': '10px',
				            'border-bottom-left-radius': '10px', 
				            opacity: .7, 
				            color: '#fff',
				            width: '240px',
				            top: ($(window).height() - 40) / 2 + 'px',
				            left: (($(window).width() - 40) / 2) - 70 + 'px' 
						} 
					});
					
					setTimeout(function() 
					{
						//Getting All used rows of Excel within given table
						var tableAddress = excel_sheet.ListObjects("TesterInformation").Range.Address;
						var startIndex = parseInt(tableAddress.split(":")[0].split('$')[2]) + 1;
						var endIndex = parseInt(tableAddress.split(":")[1].split('$')[2]);
			
						var rows=excel_sheet.UsedRange.Rows.Count;
						if(rows < 5)
						{ 
							importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Please make sure you have filled in all the values in Tester Template!</p>");
							Main.hideLoading(); 
							return; 
						}
						
							
						var testDate=new Date();					
						var hh=testDate.getHours();
						var mm=testDate.getMinutes();
						var ss=testDate.getSeconds();	
						var time=String(hh)+':'+String(mm)+':'+String(ss);
						var dateStr='2012-10-10'+'T'+time+'Z';
						
						//Variables for Project Info
						var arrProject = $("#projectName option").map(function (i, el) { return $(el).attr("title"); }).get();
						var arrProjectID = $("#projectName option").map(function (i, el) { return $(el).val(); }).get();
						
						var lastTPID = '';
						var previousProjectID = '';
						//Excel Validations prior to Import
						importExport.row = startIndex;
						for(var i=startIndex; i<=endIndex; i++)
						{
							var list = jP.Lists.setSPObject(tester.SiteURL, "Tester"); 							
							if(excel_sheet.Cells(i,1).Value==undefined && excel_sheet.Cells(i,2).Value==undefined && excel_sheet.Cells(i,3).Value==undefined && excel_sheet.Cells(i,4).Value==undefined)	
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"Does not contain information!</span><br />";
								importExport.row++;
								continue;
							}					
							
							if(excel_sheet.Cells(i,1).Value==undefined)
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"Project Name information is missing from the cell.</span><br />";
								importExport.row++;
								continue;
							}
							
							if(excel_sheet.Cells(i,2).Value==undefined)
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"TestPass Name information is missing from the cell.</span><br />";
								importExport.row++;
								continue;
							}
							/*if(excel_sheet.Cells(i,3).Value== undefined)
							(
								importExport.msg+="<span >Row "+importExport.row+": "+"Role Name information is missing from the cell.</span><br />";
								importExport.row++;
								continue;
							)*/
							if(excel_sheet.Cells(i,4).Value==undefined)
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"Tester Name information is missing from the cell.</span><br />";
								importExport.row++;
								continue;
							}
							else
							{
								if(excel_sheet.Cells(i,4).Value.replace(/^\s+|\s+$/g, "")==undefined)
								{
									importExport.msg+="<span >Row "+importExport.row+": "+"Tester Name information is missing from the cell.</span><br />";
									importExport.row++;
									continue;
								}

							}
							
							importExport.testerEmail = "";
							importExport.testerSPID = "";
							importExport.testerFullName = "";
							
							importExport.addGroupStatus = 1;
							if(importExport.validateTesterName(excel_sheet.Cells(i,4).Value.replace(/^\s+|\s+$/g, ""))==false && excel_sheet.Cells(i,4).Value.indexOf("@") == -1)
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"Tester Information is not valid!</span><br />";
								importExport.row++;
								continue;
							}
							
							if(importExport.addGroupStatus == 0)
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"You do not have rights to add Tester in SharePoint Group!</span><br />";
								importExport.row++;
								continue;
							}
							if(importExport.noEmailPresent == 1)
							{
								importExport.msg+="<span >Row "+importExport.row+": <b>"+excel_sheet.Cells(i,4).Value+"</b> is not present in directory!</span><br />";
								importExport.row++;
								continue;
							}
							
							//alert(importExport.testerEmail + " "  + importExport.testerSPID + " " + importExport.testerFullName);
							
							//Code to get Project ID by Name					
							var prjID = '';					
							if($.inArray(excel_sheet.Cells(i,1).Value, arrProject) != -1)
							{
								var index = $.inArray(excel_sheet.Cells(i,1).Value, arrProject);
								prjID = arrProjectID[index];
								if(previousProjectID != prjID)
								{
									$("#projectName option[value='"+prjID+"']").attr("selected",true);
									importExport.populateTestPassForImport();
								}	
								
								//Variables for Test Pass Info
								var arrTestPass = $("#testPassName option").map(function (i, el) { return $(el).attr("title"); }).get(); 
								var arrTestPassID = $("#testPassName option").map(function (i, el) { return $(el).val(); }).get();
								
								//Variables for Role Info
								var arrRole = $("#ulItemstesterRoles div li").map(function (i, el) { return $(el).attr("title"); }).get();
								var arrRoleID = $("#ulItemstesterRoles div li").map(function (i, el) { return $(el).find("input").attr("id").split("_")[1]; }).get();
								var arrRole2 = $("#ulItemstesterRoles div li").map(function (i, el) { return $(el).attr("title").toUpperCase(); }).get();//For bug 7232
							}
							else
							{
								importExport.msg+="<span >Row "+importExport.row+": "+"Either this project is not associated with you or no longer available!</span><br />";
								importExport.row++;
								continue;
							}
							importExport.selectedProjID = prjID;
							
							//HRW	
							previousProjectID = prjID;
							if(importExport.testerSPID != '')				
							{
								var testPassNamesInExcelcell = new Array();
								if(excel_sheet.Cells(i,2).Value!=undefined)
								{
								 	var TPName = excel_sheet.Cells(i,2).Value.split(',');
								 	for(var ii=0;ii<TPName.length;ii++)
								 		testPassNamesInExcelcell.push(TPName[ii].replace(/^\s+|\s+$/g, ""));	//remove white spaces from begining and end
								}	
								else
								{
									importExport.msg+="<span >Row "+importExport.row+": "+"Tester can not be alloted to this project.</span><br />";
									importExport.row++;
									continue;
								}
								var selectedTestPassId = new Array();
								var invalidTestPasses = new Array();
								for(var ii=0;ii<testPassNamesInExcelcell.length;ii++)
								{
									var index = $.inArray(testPassNamesInExcelcell[ii],arrTestPass);
									if(index==-1)
									    invalidTestPasses.push(testPassNamesInExcelcell[ii]);
					               	else
									{
										if($.inArray(arrTestPassID[index],selectedTestPassId) == -1)
										{
											selectedTestPassId.push(arrTestPassID[index]);
										}	
											
									}	
								}
								if(invalidTestPasses.length>0)
								{
									if(invalidTestPasses.length == 1)
									{
										if(invalidTestPasses[0] == "")
											importExport.msg+="Row"+importExport.row+" "+":"+ "Test Pass name is missing after/before comma(,) for the respective project!<br/>";
										else
											importExport.msg+="Row"+importExport.row+" "+":"+" <b>"+invalidTestPasses+"</b>is not available for the respective project !<br/>";
									}
									else
									 	importExport.msg+="Row"+importExport.row+" "+":"+" <b>"+invalidTestPasses+" </b> are not available for the respective project !<br/>";
								
									importExport.row++;
									continue;
					            }
					            //Code to validate Tester alreay alloted or not under Test Pass(es)
							    var query='<Query><Where><And><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+importExport.testerSPID+'</Value></Eq>';
	                     	    for(var j=0;j<selectedTestPassId.length-1;j++)
							    {	
							   		query+='<Or><Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+selectedTestPassId[j]+'</Value></Eq>';
							   		ortag+='</Or>';
							    }	
	             		        query+='<Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+selectedTestPassId[j]+'</Value></Eq>';
	             		        if(ortag != '')
									query+=ortag;
	             		        query+='</And></Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassID"/><FieldRef Name="TestCaseID"/></ViewFields></Query>';							
								var TestersListItemsFind = list.getSPItemsWithQuery(query).Items;
								
								if(TestersListItemsFind != null && TestersListItemsFind != undefined)
								{
									importExport.msg+="<span >Row "+importExport.row+": <b>"+importExport.globTesterName+"</b> already exists for test pass(es) of this project.</span><br />";
									importExport.row++;
									lastTPID = selectedTestPassId[0];
									continue;
								}
					            var roleIdArray = new Array();
					            var RoleBasedOnRoleID = new Array();
					            var roleFlag = 0;
								if(excel_sheet.Cells(i,3).Value != undefined)
								{
									if(excel_sheet.Cells(i,3).Value.toString().replace(/^\s+|\s+$/g, "") != '')
									{
										var rol = excel_sheet.Cells(i,3).Value.toString().split(",");
										var flag = 0;
										var standardFlag = 0;
										var otherRoles = 0;
										var roleNames = new Array();
										for(var mm=0;mm<rol.length;mm++)
										{
											if(rol[mm].replace(/^\s+|\s+$/g, "") == '')
											{
												importExport.msg+="<span >Row "+importExport.row+": "+"Role name is missing after/before comma(,) for the respective project</span><br />";
												importExport.row++;
												flag = 1;
												break;
											}
											if(rol[mm].replace(/^\s+|\s+$/g, "").toUpperCase() == "STANDARD")
												standardFlag = 1;
											else
											{
												otherRoles = 1;	
												roleNames.push(rol[mm].replace(/^\s+|\s+$/g, ""));
											}	
										}
										if(flag == 1)
											continue;
										
										var roles = excel_sheet.Cells(i,3).Value.toString().split(",");
										var flag = 0;
										var rolechk = '';
										for(var ii=0;ii<roles.length;ii++)
										{
											rolechk = roles[ii].replace(/^\s+|\s+$/g, "");
											if($.inArray(rolechk.toUpperCase(),arrRole2) == -1)//For bug 7232
											{
												var newRole = rolechk;
												var iChars = /^[a-zA-Z0-9-,_ ]*$/;
																						
												if(!iChars.test(newRole)) 
									    		{
									    			importExport.msg+="<span >Row "+importExport.row+": "+"Role Name contains special characters. These are not allowed.</span><br />";
													importExport.row++;
													flag = 1;
													break;
												}							
												
												if( ($.trim(newRole)).toLowerCase()==('Standard'.toLowerCase()) || ($.trim(newRole)).toLowerCase()==('All'.toLowerCase()) )
											    {
												 	importExport.msg+="<span >Row "+importExport.row+": "+"Roles with names Standard and All are not allowed.</span><br />";
													importExport.row++;
													flag = 1;
													break;
												}	
												importExport.msg+="<span >Row "+importExport.row+": <b>"+newRole+"</b> Role is not available for the respective project!</span><br />";
												importExport.row++;
												flag = 1;
												break;	
	
											}
											else
											{
												var index = $.inArray(rolechk.toUpperCase(),arrRole2);//For bug 7232
												if($.inArray(arrRoleID[index],roleIdArray) == -1)
												{
													roleIdArray.push(arrRoleID[index]);
													RoleBasedOnRoleID[arrRoleID[index]] = $.trim(arrRole[index]);
												}	
												
											}
										}
										if(flag == 1)
											continue;
									}
									else
										roleFlag = 1;		
								}
								else
									roleFlag = 1;
									
								if(roleFlag == 1)
								{
									roleIdArray.push("1");
									RoleBasedOnRoleID[1] ='Standard';
								}
								var Area = "";
								if( excel_sheet.Cells(i,5).Value != "Select Area" && excel_sheet.Cells(i,5).Value != undefined && excel_sheet.Cells(i,5).Value != null)
									Area = excel_sheet.Cells(i,5).Value.replace(/\t/g, "").replace(/\n/g, "");
								//Code to get Tester Name
								var testerName = importExport.globTesterName;//excel_sheet.Cells(i,4).Value;
								var listname =  jP.Lists.setSPObject(tester.SiteURL,'Tester');
								var obj = new Array();
								for(var j=0;j<selectedTestPassId.length;j++)
								{										
									 for(var b=0;b<roleIdArray.length;b++)
									 {
											obj.push({
											'Title':'',
			  								'ProjectID':$("#projectName").val(),
			  								'TestPassID':selectedTestPassId[j],
			  								'RoleID':roleIdArray[b],
			  								'TesterName':testerName,
			  								'TesterEmail':importExport.testerEmail,
			  								'SPUserID':importExport.testerSPID,
			  								'TesterFullName':importExport.testerFullName,
			  								'Area':Area
											});
									}
									lastTPID = selectedTestPassId[j];
								}
								if(obj.length>0)
								 	var result = listname.updateItem(obj);
	
								if(result.ID==-1)
								{	
									importExport.msg+="<span style='color:Red;'>Row "+importExport.row+": "+"Error returned - '<i>"+result.errorText+"<i>'</span><br /><br />";
									importExport.row++;					
									continue;
								}
								
								//importExport.msg+="Row "+importExport.row+" "+":"+" <b>"+excel_sheet.Cells(i,4).Value+"</b> added successfully !<br/>";
								importExport.msgSucc+="Row "+importExport.row+" "+":"+" <b>"+excel_sheet.Cells(i,4).Value+"</b> added successfully !<br/>";
								importExport.row++;
								importExport.succ++;	
								
								//Code to enter listitems in UserSecurity to enter SecurityId as 4 for the tester being added for the project
								var UserSecurityList = jP.Lists.setSPObject(tester.SiteURL,'UserSecurity'); 
								var Obj = new Array();
								Obj.push
								({
									 'Title':'Tester',
									 'UserName':testerName,
									 'SecurityId':'4',
									 'SPUserID':importExport.testerSPID,
									 'ProjectId':prjID
								});   					
								var result = UserSecurityList.updateItem(Obj);
								
							   // code to enter listitems in TestPassToTestCaseMapping list for all the available testcaseId for selected testpassId for the new tester being added
							   var ortag = '';		        
	             		       var TestPassToTestCaseMappingList=jP.Lists.setSPObject(tester.SiteURL,'TestPassToTestCaseMapping');  
	                     	   var query='<Query><Where>';
	                     	   for(var j=0;j<selectedTestPassId.length-1;j++)
							   {	
							   		query+='<Or><Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+selectedTestPassId[j]+'</Value></Eq>';
							   		ortag+='</Or>';
							   }	
	             		       query+='<Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+selectedTestPassId[j]+'</Value></Eq>';
	             		       if(ortag != '')
									query+=ortag;
	             		       query+='</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassID"/><FieldRef Name="TestCaseID"/></ViewFields></Query>';
	             		       
	             		       var TestPassToTestCaseMappingListItems=TestPassToTestCaseMappingList.getSPItemsWithQuery(query).Items;
	             		       var savedTestPassIdAndTestCaseId = new Array();
	             		       var TestCaseForParentMappingIDForOtherTester = new Array();
	             		       var TestPassForParentMappingIDForOtherTester = new Array();
	             		       var TestCaseForParentMappingIDForNewTester = new Array();
	             		       var TestPassForParentMappingIDForNewTester = new Array();
	             		       var parentMappingIdsForOtherTester = new Array();
	             		       var parentMappingIdsForNewTester = new Array(); 
	             		       
	             		       //If testcases present for the selected testpass(s)
	             		     if(TestPassToTestCaseMappingListItems != undefined && TestPassToTestCaseMappingListItems!=null)
	             		     { 
		             		      for(var g=0;g<TestPassToTestCaseMappingListItems.length;g++)
		             		      {
		             		      	 var Obj=new Array();
		             		      	 if($.inArray(TestPassToTestCaseMappingListItems[g]['TestPassID']+'_'+TestPassToTestCaseMappingListItems[g]['TestCaseID'],savedTestPassIdAndTestCaseId)==-1)//to save unique entry for testpass and testcase for the tester being added
		             		      	 {
			             	    	 	 Obj.push({'Title':'TestPassToTestCaseMappingNew',
			         		         	           'TestPassID':TestPassToTestCaseMappingListItems[g]['TestPassID'],
			                     				    'TestCaseID':TestPassToTestCaseMappingListItems[g]['TestCaseID'],
			                    				    'status':'Not Completed',
			                    				    'SPUserID':importExport.testerSPID
			                     			    }); 
		                     		 	savedTestPassIdAndTestCaseId.push(TestPassToTestCaseMappingListItems[g]['TestPassID']+'_'+TestPassToTestCaseMappingListItems[g]['TestCaseID']);//to save unique testcase for the testpass for the tester being added
		                     		 	var TestPassToTestCaseMappingListResult = TestPassToTestCaseMappingList.updateItem(Obj);
		                     		 	parentMappingIdsForNewTester.push(TestPassToTestCaseMappingListResult['ID']);//parentmapping ID for the new tester 
		                     		 	TestCaseForParentMappingIDForNewTester[TestPassToTestCaseMappingListResult['ID']]= TestPassToTestCaseMappingListItems[g]['TestCaseID'];
		                     		 	TestPassForParentMappingIDForNewTester[TestPassToTestCaseMappingListResult['ID']]= TestPassToTestCaseMappingListItems[g]['TestPassID'];
		                     		 	
		                     		  }	
		                     		  TestCaseForParentMappingIDForOtherTester[TestPassToTestCaseMappingListItems[g]['ID']]= TestPassToTestCaseMappingListItems[g]['TestCaseID'];
		                     		  TestPassForParentMappingIDForOtherTester[TestPassToTestCaseMappingListItems[g]['ID']]=TestPassToTestCaseMappingListItems[g]['TestPassID'];
		                     		  parentMappingIdsForOtherTester.push(TestPassToTestCaseMappingListItems[g]['ID']); 
		                     		
								   }	
								   
								   //code to insert listitems in TestCaseToTestStepMapping list for assigning teststeps //////////////////////////////  	
		                     	   var TestCaseToTestStepMappingList=jP.Lists.setSPObject(tester.SiteURL,'TestCaseToTestStepMapping');
		                     	   var TestCaseToTestStepMappingListItems = new Array();
		                     	   if(parentMappingIdsForOtherTester.length <= 147)
	 		                       {
	 		                     	   var ortag = '';
	 		                     	   var query='<Query><Where><And>';
		                         	   for(var j=0;j<parentMappingIdsForOtherTester.length-1;j++)
											query+='<Or><Eq><FieldRef Name="TestPassMappingID"/><Value Type="Text">'+parentMappingIdsForOtherTester[j]+'</Value></Eq>';
		                 		       query+='<Eq><FieldRef Name="TestPassMappingID"/><Value Type="Text">'+parentMappingIdsForOtherTester[j]+'</Value></Eq>';
		                 		       for(var j=0;j<parentMappingIdsForOtherTester.length-1;j++)
											query+='</Or>';
									   for(var ii=0;ii<roleIdArray.length-1;ii++)		
									   {
									   		query+='<Or><Eq><FieldRef Name="Role"/><Value Type="Text">'+roleIdArray[ii]+'</Value></Eq>';
									   		ortag+='</Or>';
									   }		
									   query+='<Eq><FieldRef Name="Role"/><Value Type="Text">'+roleIdArray[ii]+'</Value></Eq>';
									   if(ortag != '')		
											query+=ortag;
		                 		       query+='</And></Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="TestStep"/><FieldRef Name="Role"/></ViewFields></Query>';
		                 		       
									  TestCaseToTestStepMappingListItems=TestCaseToTestStepMappingList.getSPItemsWithQuery(query).Items;
								  }
								  else
								  {
								  	
								    	var numberOfIterations = Math.ceil((parentMappingIdsForOtherTester.length)/147);
								 		var iterationPoint = 0;
								 		var camlQuery;
								 		var OrEndTags;
								 		var ortag = '';
								 		for(var y=0;y<numberOfIterations-1;y++)
								 		{
								 			camlQuery = '<Query><Where><And>';
								 			OrEndTags = '';
								 			ortag = '';
								 			for(var ii=iterationPoint ;ii<(147+iterationPoint-1);ii++)
								 			{
								 				camlQuery +='<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+parentMappingIdsForOtherTester[ii]+'</Value></Eq>';
								 				OrEndTags +='</Or>';
								 			}
								 			camlQuery += '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+parentMappingIdsForOtherTester[ii]+'</Value></Eq>';
								 			camlQuery +=OrEndTags;
								 			for(var ii=0;ii<roleIdArray.length-1;ii++)		
											{
												camlQuery += '<Or><Eq><FieldRef Name="Role"/><Value Type="Text">'+roleIdArray[ii]+'</Value></Eq>';
												ortag+='</Or>';
											}	
										    camlQuery +='<Eq><FieldRef Name="Role"/><Value Type="Text">'+roleIdArray[ii]+'</Value></Eq>';
										    if(ortag != '')		
												camlQuery +=ortag;
								 			camlQuery +='</And></Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="TestStep"/><FieldRef Name="Role"/></ViewFields></Query>';
								 			
								 			var TPToTCResult = TestCaseToTestStepMappingList.getSPItemsWithQuery(camlQuery).Items;
								 			if(TPToTCResult != null && TPToTCResult != undefined)
								 				$.merge(TestCaseToTestStepMappingListItems,TPToTCResult);
								 			iterationPoint += 147;
					
								 		}
								 		camlQuery = '<Query><Where><And>';
								 		OrEndTags = '';
								 		ortag = '';
								 		for(var ii=iterationPoint ;ii<parentMappingIdsForOtherTester.length-1;ii++)
								 		{
								 			camlQuery +='<Or><Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+parentMappingIdsForOtherTester[ii]+'</Value></Eq>';
								 			OrEndTags +='</Or>';
										}
								 		camlQuery += '<Eq><FieldRef Name="TestPassMappingID" /><Value Type="Text">'+parentMappingIdsForOtherTester[ii]+'</Value></Eq>';
							 			camlQuery +=OrEndTags;
							 			for(var ii=0;ii<roleIdArray.length-1;ii++)		
										{
											camlQuery += '<Or><Eq><FieldRef Name="Role"/><Value Type="Text">'+roleIdArray[ii]+'</Value></Eq>';
											ortag+='</Or>';
										}	
									    camlQuery +='<Eq><FieldRef Name="Role"/><Value Type="Text">'+roleIdArray[ii]+'</Value></Eq>';
									    if(ortag != '')		
												camlQuery +=ortag;
							 			camlQuery +='</And></Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="TestStep"/><FieldRef Name="Role"/></ViewFields></Query>';
							 			var TPToTCResult = TestCaseToTestStepMappingList.getSPItemsWithQuery(camlQuery).Items;
							 			if(TPToTCResult != null && TPToTCResult != undefined)
							 				$.merge(TestCaseToTestStepMappingListItems,TPToTCResult);
								}	  
									  
								  if(TestCaseToTestStepMappingListItems!=undefined && TestCaseToTestStepMappingListItems!=null)
								  {
			                 		  var count=0;
			                 		  var Obj=new Array();		
			                 		  //var parentMappingIDTestStepRoleCombination = new Array();
			                 		  var testPassIDTestCaseIDTestStepIDRoleCombination = new Array();
			                 		  var testCaseIDTestStepIDRoleCombination = new Array();
	
			                 		  for(var y=0;y<TestCaseToTestStepMappingListItems.length;y++)
			                 		  {
			                 		  	  var testcaseIdForOtherTester = TestCaseForParentMappingIDForOtherTester[TestCaseToTestStepMappingListItems[y]['TestPassMappingID']];
			                 		  	  var testpassIdForOtherTester = TestPassForParentMappingIDForOtherTester[TestCaseToTestStepMappingListItems[y]['TestPassMappingID']];
			                 		  	  for(var ii=0;ii<parentMappingIdsForNewTester.length;ii++)
		             		         	 {
		             		         		    var testpassIdForNewTester = TestPassForParentMappingIDForNewTester[parentMappingIdsForNewTester[ii]];	
			                 		  	  		var testcaseIdForNewTester =TestCaseForParentMappingIDForNewTester[parentMappingIdsForNewTester[ii]];
		             		         	  		if(testpassIdForNewTester == testpassIdForOtherTester && testcaseIdForNewTester == testcaseIdForOtherTester && $.inArray(testpassIdForNewTester+'_'+testcaseIdForOtherTester+'_'+TestCaseToTestStepMappingListItems[y]['TestStep']+'_'+TestCaseToTestStepMappingListItems[y]['Role'],testPassIDTestCaseIDTestStepIDRoleCombination)==-1)//to save unique parentmappingId teststep role 
		             		         	  		{
			             		              	    count++;
													Obj.push({'Title':'TestCaseToTestStepMapping',
			                 		         	            'TestPassMappingID':parentMappingIdsForNewTester[ii], //parentmappingID for new tester added
			                             				    'TestStep':TestCaseToTestStepMappingListItems[y]['TestStep'],
			                             				    'Role':TestCaseToTestStepMappingListItems[y]['Role'],
			                            				    'status':'Not Completed'
			                             			    }); 
			                             			testPassIDTestCaseIDTestStepIDRoleCombination.push(testpassIdForNewTester+'_'+testcaseIdForOtherTester+'_'+TestCaseToTestStepMappingListItems[y]['TestStep']+'_'+TestCaseToTestStepMappingListItems[y]['Role']);
		                             				if(count == 200)
		                             				{
		                             					var result = TestCaseToTestStepMappingList.updateItem(Obj);
		                             					Obj = new Array();
		                             					count = 0;	
		                             				}
		                             			} 
		                                   } 
		                                  
		                               }
		                               if(Obj.length != 0)
		                               		var result = TestCaseToTestStepMappingList.updateItem(Obj);
		                                   
	
	 							  }
	 							  	
		             		 }	
								
								//Logic to update MyActivityList						
								var TestPassList=jP.Lists.setSPObject(tester.SiteURL,'TestPass');
								var ortag = '';
								var camlQuery = '<Query><Where>';
								for(var ii=0;ii<(selectedTestPassId.length)-1;ii++)			 
								{
									camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">'+selectedTestPassId[ii]+'</Value></Eq>';
									ortag +='</Or>';
								}	
								camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Counter">'+selectedTestPassId[ii]+'</Value></Eq>';
								if(ortag != '')
									camlQuery +=ortag ;
								camlQuery +='</Where></Query>';
								var TestPassResult = TestPassList.getSPItemsWithQuery(camlQuery).Items;
								
								var projectName = excel_sheet.Cells(i,1).Value;
								var Obj = new Array();
								for(var ii=0;ii<TestPassResult.length;ii++)
							    {    
								   if(TestPassResult[ii]['AllRoles']!=-1)
								   {													  					   																	  '															  '
								   		var roleIdArrayForTestPass=new Array();
								   		if(TestPassResult[ii]['AllRoles'].indexOf(',')!=-1)
								   		roleIdArrayForTestPass=TestPassResult[ii]['AllRoles'].split(',');
								   		else
								   		roleIdArrayForTestPass.push(TestPassResult[ii]['AllRoles']);
								   		var roleId = new Array();
								   		
			                            if($.inArray(undefined,roleIdArrayForTestPass)!=-1)
			                            {    for(var jk=0;jk<roleIdArrayForTestPass.length;jk++)
			                                {
			                                	if(roleIdArrayForTestPass[jk]!=undefined)
			                                		roleId.push(roleIdArrayForTestPass[jk]);	
			                                }
			                            } 
			                            if(roleId.length>0)  
			 								roleIdArrayForTestPass = roleId;	
										
										var MyActivityList=jP.Lists.setSPObject(tester.SiteURL,'MyActivity');
								   		for(var jk=0;jk<roleIdArray.length;jk++)
								   		{
									   		if($.inArray((roleIdArray[jk]).toString(),roleIdArrayForTestPass)!=-1)
									   		{
													 Obj.push({
																  'Title':'MasterDetailsList',
																  'RoleName':RoleBasedOnRoleID[roleIdArray[jk]],
																  'ProjectName':projectName,
																  'TestPassName':TestPassResult[ii]['TestPassName'],
																  'TesterSPUserID':importExport.testerSPID,
																  'ProjectID': $('#projectName').val(),
																  'TestPassID':TestPassResult[ii]['ID'],
																  'RoleID' : roleIdArray[jk],
																  'Action':"Begin Testing"
																  		
													 });
									   		}
								   		 
								   		 
								   		}
								   	}	//if end
							   	
							    }//for end
	
								if(Obj.length!=0)
									var result = MyActivityList.updateItem(Obj);
							}
							else
							{
								importExport.msg+="<span >Row "+importExport.row+": <b>"+excel_sheet.Cells(i,4).Value+"</b> is not present in directory!</span><br />";
								importExport.row++;
								continue;
							}
						}				
									
						if(importExport.msg=="" && importExport.succ!=0 && importExport.msgSucc == "")
						{
							importExport.msgSucc+="<span style='color:green;'>Tester Information Template is uploaded successfully.</span><br /><br />";
						}
			
						var totalRows = importExport.row-startIndex;
						var invalidRows = totalRows - importExport.succ;
						
						//Creating markup for UI
						var result = '<div style="border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: gray; padding-left:15px; padding-top:15px;">'+
										'<b>Tester Upload Statistics</b>'+
				                        '<table>'+
				                        	'<tr>'+
				                        		'<td>'+
				                    				'Total number of rows'+
				                				'</td>'+
				                				'<td>'+
				                    				': '+
				                    				'<b>'+ (importExport.row-startIndex) +'</b>'+
				                				'</td>'+
								            '</tr>'+
								            '<tr>'+
								            	'<td colspan="2">'+
								            		//'<br/>'+
								                    '<b>Details :</b> &nbsp;<br/>'+ 				                
								                '</td>'+
								            '</tr>'+
								        '</table>'+
								        '<fieldset><legend style="color:red;font-weight:bold">Invalid Rows: '+invalidRows+'</legend><table>'+
				                        	'<tr>'+
				                        		'<td>'+
													importExport.msg +// '<br/>&nbsp;'+
												'</td>'+
								            '</tr>'+
								        '</table></fieldset>'+
								         '<fieldset><legend style="color:green;font-weight:bold">Valid Rows: '+importExport.succ+'</legend><table>'+
				                        	'<tr>'+
				                        		'<td>'+
													importExport.msgSucc + //'<br/>&nbsp;'+
												'</td>'+
								            '</tr>'+
								        '</table></fieldset>'+
				                     '</div>';
				                     
			            //importExport.testerUpdateStatus = 1;
			            if(lastTPID != '')
			            	$("#testPassName").val(lastTPID);
			            else
			            	$("#testPassName").val(0);	
			            tester.fillTesterListForDD();
			            	
						importExport.Alert(result);
						         
						importExport.row=0;
						importExport.succ=0;
						importExport.msg="";
						importExport.msgSucc="";
						
						try
						{
							excel_file.close();
				    		excel.Quit();
				    	}
				    	catch(ex)
				    	{	    		
				    	}	    	
						
						Main.hideLoading();
						//oScorecard.createScorecardHBars($divScorecardKPIBars);
						CollectGarbage();
					}, 800);
				}
			}
		}
		catch(ex)
		{
			if(excelStat==1)
			{
				importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Error returned - "+ex.message+"</p>");
				excel_file.close();
				excel.Quit();
			}
					
			importExport.row=0;
			importExport.succ=0;
			importExport.msg="";
			importExport.msgSucc="";
			Main.hideLoading();
			CollectGarbage();
		}
	},
	
	testerUpdateStatus:0,
	selectedProjID:'',
	Alert:function(alrtMsg)
	{
		var hght = 180;
		var wdth = 300;
		
		if(alrtMsg.length > 450)
		{
			hght = 300;
			wdth = 400;
		}
				
		$("#dvAlert").dialog({
	        autoOpen: false,
	        height: hght,
	        width: wdth,
	        modal: true,
	        buttons: {
	            "OK": function() 
	            { 
					$(this).dialog("close");            	                   
	            }
	        },
	        open:function() { $(".ui-dialog-titlebar-close").hide(); },
	        
	    });		
	    
	    $("#dvAlert").html(alrtMsg);
		$("#dvAlert").dialog("open");
	},
	
	showPrerequisites:function()
	{
		if(window.navigator.appName=="Microsoft Internet Explorer")
		{
			try
			{
	    	    var Activeobj=new ActiveXObject("WScript.shell"); 
	    	}
	    	catch(e)
	    	{
	    	}
	    	if(Activeobj ==undefined)      
	    	{
	    		$('#activeX-form').dialog({
	    			height: 320,
	    			width:600,
	    			modal: true,
	    			title:'Prerequesites for Active-X',
	    			resizable:false,
	    			open:function() { 
	    				$(".ui-dialog-titlebar-close").show();         		
	    			} 
	    		});   
	    		
				Main.hideLoading(); 
	    		return;
	    	}	
	    }
	    else return;	
	},
	
	PrerequesitesMsg:function(msg,Path)
	{
	    $('#activeX-form').dialog({height: 320,width:600,modal: true,title:'Prerequesites for Active-X',resizable:false,open:function() { $(".ui-dialog-titlebar-close").show(); } });    
	    return false;
	},
	
	convertDate:function(date)
	{
		var Months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		var Index=["01","02","03","04","05","06","07","08","09","10","11","12"];
		var d=String(date).split(" ");
	
	
		for(var i=0;i<Months.length;i++)
		{
			if(d[1]==Months[i])
			{
				break;
			}
		}
		var dd=d[5]+'-'+Index[i]+'-'+d[2];
		return dd;
	},
	
	deleteAllItems:function()
	{
		var list = jP.Lists.setSPObject(importExport.getSiteURL(),oSource.ListName); 	
		var query="<Query></Query>";
		var obj=list.getSPItemsWithQuery(query).Items;
		if(obj!=undefined)
		{
			for(var i=0;i<obj.length;i++)
			{
				list.deleteItem(obj[i]['ID']);
			}		
		}		
	},
	
	getSiteURL:function()
	{
		try
		{
			return _spPageContextInfo.webServerRelativeUrl;
		}
		catch(ex)
		{
			return $().SPServices.SPGetCurrentSite()+"/";
		}
	},
	
	vListItems: '',
	vCallbackFunction: '',
	getAllListItems:function(pListName, callbackFunction) 
 	{
		 //get current context
		 var ctx =  SP.ClientContext.get_current();
		 
		 //point to get all the fiel names from specified list 
		 var vList =  ctx.get_web().get_lists().getByTitle(pListName);   		
		
		 //Load all lists items
		 var vcamlQuery = SP.CamlQuery.createAllItemsQuery();
		 
		 //var arrProjectID = $("#projectName option").map(function (i, el) { return $(el).val(); }).get();
		 var arrProjectID = $("#projectName option:selected").val();
		 
		 var genQuery = "<Query>"+
					   		"<Where>"+
					   			"<Eq>"+
						            "<FieldRef Name='ProjectID' />"+
						            "<Value Type='Text'>"+arrProjectID+"</Value>"+
						        "</Eq>"+
						    "</Where>"+
						   "<OrderBy>"+
						      "<FieldRef Name='ProjectID' Ascending='True' />"+
						   "</OrderBy>"+
						"</Query>";
						
		 importExport.arrProjID = arrProjectID;
		
		 vcamlQuery.set_viewXml("<View>"+genQuery+"</View>");
		 importExport.vListItems = vList.getItems(vcamlQuery);
		 
		 //oList.vListItems.retrieveItems();
		 ctx.load(importExport.vListItems);
		   
		 //async excute
		 ctx.executeQueryAsync(Function.createDelegate(this,importExport.getAllListItems_succeeded) , Function.createDelegate(this,importExport.failed));
		 importExport.vCallbackFunction = callbackFunction;
 	},

	getAllListItems_succeeded:function(sender, args)
	{
		importExport.vCallbackFunction(importExport.vListItems);
	},

	failed:function(sender, args)
	{
		importExport.Alert("<p style='padding-left:15px; padding-top:15px;'>Failed - "+args.get_message()+ "<br /></p>");
		Main.hideLoading();
	},
 
	getListItemObjectFromListEnumerator:function(pListEnumerator)
 	{	
		var vCurrentItem = pListEnumerator.get_current();
		
		//JSON Object
		var oListItem={
						ID:((vCurrentItem.get_item(ID)!=null)?vCurrentItem.get_item(ID):0),
						ProjectID:((vCurrentItem.get_item(ProjectID)!=null)?vCurrentItem.get_item(ProjectID):'-'),
						//ProjectName:((vCurrentItem.get_item(ProjectName)!=null)?vCurrentItem.get_item(ProjectName):'-'),
						TestPassID:((vCurrentItem.get_item(TestPassID)!=null)?vCurrentItem.get_item(TestPassID):'-'), 
						RoleID:((vCurrentItem.get_item(RoleID)!=null)?vCurrentItem.get_item(RoleID):0),
						TesterName:((vCurrentItem.get_item(TesterName)!=null)?vCurrentItem.get_item(TesterName):'-')						
				   };
					 
		return oListItem;
 	},

	validUserFlag:0,
	globTesterName:'',
	globEmail:'',
	noEmailPresent:0,
	validateTesterName:function(tesName)
	{
		importExport.validUserFlag = 0;
		//importExport.globTesterName = tesName;
		importExport.globEmail = tesName;//Added by HRW
		importExport.IsUserValid();
		if(importExport.validUserFlag) 
		{
	    	return true;
	    } 
	    else
	    {
	        return false;
		}
	},

	IsUserValid:function()
	{
		 jQuery.support.cors = true;
		 //constructing the call to a user profile using web services
		 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
								+'<ResolvePrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">'
							      +'<principalKeys>'
							        +'<string>web</string>'
							        +'<string>'+importExport.globEmail+'</string>'     //Changed by HRW
							      +'</principalKeys>'
							      +'<principalType>All</principalType>'
							      +'<addToUserInfoList>false</addToUserInfoList>'
							    +'</ResolvePrincipals>'
							  +'</soap:Body>'
							+'</soap:Envelope>'
		$.ajax
		({  
			 url: importExport.getSiteURL()+'/_vti_bin/People.asmx',  
			 type: "POST",  
			 async: false,
			 dataType: "xml",  
			 data: soapMessage,  
			 complete: importExport.IsValidUserResult,  
			 contentType: "text/xml; charset=\"utf-8\"" 
	 	});
	},
	
	IsValidUserResult:function(xmlHttpRequest, status)
	{
		var isValidUser = false;
		importExport.noEmailPresent = 0;
		for(var i=0; i< $(xmlHttpRequest.responseXML).find('PrincipalInfo').length; i++)
		{
			if($($(xmlHttpRequest.responseXML).find('PrincipalInfo')[i]).find('IsResolved')[0].text == 'true')
			{
				if($($(xmlHttpRequest.responseXML).find('PrincipalInfo')[i]).find('Email')[0].text.toUpperCase() == importExport.globEmail.toUpperCase())
				{
					isValidUser = true;
					importExport.noEmailPresent = 0;
					importExport.globTesterName = $($(xmlHttpRequest.responseXML).find('PrincipalInfo')[i]).find('AccountName')[0].text;
				}
				else if($($(xmlHttpRequest.responseXML).find('PrincipalInfo')[i]).find('Email')[0].text.toUpperCase() == '')
					importExport.noEmailPresent = 1;
			}
		}
		
		if(isValidUser)
		{		
			importExport.noEmailPresent = 0;
			//Code to find User Information
			importExport.GetGroupNameforUser();				
		}
		else
		{
			//Code to send user invalid status
			importExport.validUserFlag = 0;
		}	
	},
	
	GetGroupNameforUser:function() 
	{
		 jQuery.support.cors = true;
		 
		 //Constructing the call to a user profile using web services
		 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
							    +'<GetGroupCollectionFromUser xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							      +'<userLoginName>'+importExport.globTesterName+'</userLoginName>'
							    +'</GetGroupCollectionFromUser>'
							  +'</soap:Body>'
							+'</soap:Envelope>'
							
		 //making a call with jQuery
		 $.ajax
		 ({  
			 url: importExport.getSiteURL()+'/_vti_bin/usergroup.asmx',  
			 type: "POST",  
			 async: false,
			 dataType: "xml",  
			 data: soapMessage,  
			 complete: importExport.GroupNameResult,  
			 contentType: "text/xml; charset=\"utf-8\"" 
	 	}); 
	},
	GroupNameResult:function(xmlHttpRequest, status)
	{
		var bGroupFound = false;
		
		if(status != 'error')
		{
			for(var i=0;i< $(xmlHttpRequest.responseXML).find('Group').length; i++)
			{			
				if($($(xmlHttpRequest.responseXML).find('Group')[i]).attr('Name') == importExport.sGroupName)
				{
					bGroupFound = true;
				}						
			}
			
			if(!bGroupFound)
			{
				//alert('Not present in any group. Adding User in "TEST" Group');
				importExport.AddUserToSharePointGroup();						
			}
			else
			{
				importExport.addGroupStatus = 1;
				
				//alert('User already present in group.');
				importExport.GetUserProperty();
			}
		}		
		else
		{
	 		if($(xmlHttpRequest.responseXML).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseXML).find('errorstring')[0].text  == "User cannot be found.")
	 		{
	 			//alert('Not present in any group. Adding User in "TEST" Group');
				importExport.AddUserToSharePointGroup();		
	 		}	
		}
	},
	
	//Add User to Sharpoint group
	AddUserToSharePointGroup:function()
	{ 
		jQuery.support.cors = true;	
		 var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
							+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
							  +'<soap:Body>'
							    +'<AddUserToGroup xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
							      +'<groupName>'+importExport.sGroupName+'</groupName>'
							      +'<userLoginName>'+importExport.globTesterName+'</userLoginName>'						     
							    +'</AddUserToGroup>'
							  +'</soap:Body>'
							+'</soap:Envelope>'	 
							
		 $.ajax
		 ({  
			 url: importExport.getSiteURL()+'/_vti_bin/usergroup.asmx',  
			 beforeSend: function(xhr) 
			 {
		        xhr.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/sharepoint/soap/directory/AddUserToGroup");
		     },
			 type: "POST",  
			 dataType: "xml",
			 async: false,
			 data: soapMessage,  
			 complete: importExport.GroupAddingResults,  
			 contentType: "text/xml; charset=\"utf-8\"" 
		 }); 
	},
	
	addGroupStatus:0,
	GroupAddingResults:function(xmlHttpRequest, status)
	{
		if(status =='success')
		{
			importExport.addGroupStatus = 1;
			//alert('User added successfully. Retriving User properties');
			importExport.GetUserProperty();
		}
		else
		{
			importExport.addGroupStatus = 0;
		}
	},
	
	testerEmail: "",
	testerSPID: "",
	testerFullName: "",
	
	GetUserProperty:function() 
	{
			jQuery.support.cors = true;
			
			//constructing the call to a user profile using web services
			
			var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
								+'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
								  +'<soap:Body>'
								    +'<GetUserInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
								      +'<userLoginName>'+importExport.globTesterName+'</userLoginName>'
								    +'</GetUserInfo>'
								  +'</soap:Body>'
								+'</soap:Envelope>';
			
			 //making a call with jQuery
			 $.ajax
			 ({  
				 url: importExport.getSiteURL()+'/_vti_bin/usergroup.asmx',  
				 type: "POST",  
				 dataType: "xml",  
				 async: false,
				 data: soapMessage,  
				 complete: importExport.displayProfileProperty,  
				 contentType: "text/xml; charset=\"utf-8\"" 
			 });  
	},

	displayProfileProperty:function(xmlHttpRequest, status)  
 	{  
		if(status == 'error')
		{
			if($(xmlHttpRequest.responseXML).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseXML).find('errorstring')[0].text  == "User cannot be found.")
			{
			}
		}
		else
		{
			/*var info = "Full Name : "+$($(xmlHttpRequest.responseXML).find('User')[0]).attr('Name')+"\n"
						+"Login Name : " +$($(xmlHttpRequest.responseXML).find('User')[0]).attr('LoginName') + "\n"
						+"SP User ID : "+$($(xmlHttpRequest.responseXML).find('User')[0]).attr('ID')+"\n"
						+"Email : "+$($(xmlHttpRequest.responseXML).find('User')[0]).attr('Email')+"\n";*/
			
			importExport.testerEmail = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('Email');
			importExport.testerSPID = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('ID');
			importExport.testerFullName = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('Name');
			
			importExport.validUserFlag = 1;	
		}
	},
	//Added by HRW
	fillTemp:function(XlSheet)
	{
		var associatedTestPassesForTester=new Array();
		var fullAssociatedTestPassesForTester=new Array();
		var associatedRolesForTester=new Array();
		var fullAssociatedRolesForTester=new Array();
		var associatedTestPassIDsForTester=new Array();
		var allRolesOfTester=new Array();
		var allTestPassIds=new Array();
		var gridArray = new Array();
		var forSPIDGetArea = new Array();
		
		//Query on Tester list using Test Pass ID
		var queryOnTester = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$("#testPassName").val()+'</Value></Eq></Where></Query>';
		var TesterResult = tester.dmlOperation(queryOnTester,'Tester');
		if(TesterResult != undefined)
		{
			tester.forSPUserIdGetRoleIDs = new Array();
			tester.forSPUserIdGetTesterName = new Array();
			tester.forSPUserIdGetAlias = new Array();
			tester.forSPUserIdGetEmail = new Array();
			tester.SPUserIDs = new Array();
			for(var i=0;i<TesterResult.length;i++)
			{
				if(tester.forSPUserIdGetRoleIDs[TesterResult[i]['SPUserID']] == undefined)
				{
					tester.forSPUserIdGetRoleIDs[TesterResult[i]['SPUserID']] = TesterResult[i]['RoleID'];
					tester.forSPUserIdGetTesterName[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterFullName'];
					tester.forSPUserIdGetAlias[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterName'];
					tester.forSPUserIdGetEmail[TesterResult[i]['SPUserID']] = TesterResult[i]['TesterEmail'];
				}
				else
					tester.forSPUserIdGetRoleIDs[TesterResult[i]['SPUserID']] += "," + TesterResult[i]['RoleID'];	
					
				if($.inArray(TesterResult[i]['SPUserID'],tester.SPUserIDs) == -1)
					tester.SPUserIDs.push(TesterResult[i]['SPUserID']);	
				forSPIDGetArea[TesterResult[i]['SPUserID']] = TesterResult[i]['Area'];
			}
			var mm = 5;
			var roleIDs = [];	
			var roleName = [];
            for(var i=0;i<tester.SPUserIDs.length;i++)
            {
            	roleName = [];
            	roleIDs = tester.forSPUserIdGetRoleIDs[ tester.SPUserIDs[i] ].split(",");
            	for(var ii=0;ii<roleIDs.length;ii++)
            	{
            		if($.inArray(tester.roleNameForRoleID[ parseInt(roleIDs[ii]) ],roleName) == -1)
            			roleName.push(tester.roleNameForRoleID[ parseInt(roleIDs[ii]) ]);
            	}	
            	//Getting Project Name
				XlSheet.Cells(mm,1).Value = $("#projectName  option:selected").attr("title");
				
				//Getting Test Pass Name
				XlSheet.Cells(mm,2).Value = $("#testPassName option:selected").attr("title");
				
				//Getting Role Name
				XlSheet.Cells(mm,3).Value = roleName.toString();
				
				XlSheet.Cells(mm,4).Value = tester.forSPUserIdGetEmail[tester.SPUserIDs[i]];
				
				if(forSPIDGetArea[tester.SPUserIDs[i]] != undefined)
					XlSheet.Cells(mm,5).Value = forSPIDGetArea[tester.SPUserIDs[i]].replace(/\t/g, "").replace(/\n/g, "");
				mm++;
            }
            return 1;
            
		}
		else
			return 0;		
			
	
	},
	populateTestPassForImport:function()
	{		
        var projectID=$("#projectName").val();
		Main.changeTabURL(projectID);	
		
		if($.inArray('1',security.userType)!=-1)
		{
		 var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectName").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="SPUserID" /><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/></ViewFields>'+
				'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
		}
		else
		{
			var securityIdsForProject = new Array();
			if(security.userAssociationForProject[$("#projectName").val()] != undefined && security.userAssociationForProject[$("#projectName").val()] != null)
				securityIdsForProject=security.userAssociationForProject[$("#projectName").val()].split(',');
	
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

		/*var TestPassName = tester.dmlOperation(query,'TestPass');
		if( TestPassName != null && TestPassName != undefined)
		{
			multiSelectList.testerPageFlag = 1;
			multiSelectList.createMultiSelectList("testPassName",TestPassName,"TestPassName","ID","125px;");
		}
		else
		{
			$("#testPassName").html('No Test Pass Available');
		}*/
		var TestPassName = tester.dmlOperation(query,'TestPass');
		if( TestPassName != null && TestPassName != undefined)
		{
			$("#testPassName").html("<option value='0'>Select Test Pass</option>");
			for(var i=0;i<TestPassName.length;i++)
				$("#testPassName").append("<option value='"+TestPassName[i]['ID']+"' title='"+TestPassName[i]['TestPassName']+"'>"+TestPassName[i]['TestPassName']+"</option>");
		}
		else
		{
			$("#testPassName").html("<option value='0'>No Test Pass Available</option>");
		}

		tester.populateRoles();
	}
}