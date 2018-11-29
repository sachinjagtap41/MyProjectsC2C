// Copyright © 2012 RGen Solutions . All Rights Reserved.
// Contact : support@rgensolutions.com 


var exp={

	i:0,
	isPortfolioOn:false,
	
	openExcel:function()
	{
	    exp.isPortfolioOn = isPortfolioOn;
	    //To define cell no as per portfolio mode:SD
	    if(isPortfolioOn)
	    {
	    	var versionCellNo=2; var testPassCellNo=3; var testCaseCellNo=4; var descriptionCellNo=5;var ETAcellNo=6;
	    }
	    else
	    {
	    	var testPassCellNo=2; var testCaseCellNo=3; var descriptionCellNo=4;var ETAcellNo=5;
	    }
		if(typeof (window.ActiveXObject) == undefined) 
		{
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else
        {
			Main.showLoading();
			var stat = 0;
			try
			{
				var xlApp = new ActiveXObject("Excel.Application");
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
			try
			{
				//xlApp.Visible = true;
				xlApp.DisplayAlerts = false;
				var xlBook = xlApp.Workbooks.Add();
				xlBook.worksheets("Sheet1").activate;
				var XlSheet = xlBook.activeSheet;
				//XlSheet.Name="TestCase Template";
				XlSheet.Name=testcase.gConfigTestCase+" Template";//Added by Mohini for Resource file 
				
				// Set Excel Column Headers and formatting from array
				XlSheet.cells(1,1).value= "Note:";			
				XlSheet.cells(1,1).font.colorindex="2";
			   	XlSheet.cells(1,1).font.bold="true";
				XlSheet.cells(1,1).font.Name="Cambria";		   	
			   	XlSheet.cells(1,1).interior.colorindex="16";
			   	XlSheet.cells(2,1).interior.colorindex="16";
			   	
			   	XlSheet.cells(1,2).value= "•Please follow the same format as given below to add the "+testcase.gConfigTestCase+"s!";//Added by Mohini for Resource file
			   	XlSheet.cells(1,2).font.colorindex="1";
			   	XlSheet.cells(1,2).font.bold="true";
			   	XlSheet.cells(1,2).font.Name="Cambria";
			   	XlSheet.cells(1,2).interior.colorindex="15";
			   	XlSheet.cells(1,3).interior.colorindex="15";
			   	XlSheet.cells(1,4).interior.colorindex="15";
				XlSheet.cells(1,5).interior.colorindex="15";
				XlSheet.cells(1,6).interior.colorindex="15";
			   	XlSheet.cells(1,7).interior.colorindex="15";
			   	XlSheet.cells(1,8).interior.colorindex="15";
			   	XlSheet.cells(1,9).interior.colorindex="15";
			   	XlSheet.cells(1,10).interior.colorindex="15";
	
			    XlSheet.cells(2,2).value= "•If you change the format of the template, data will not be imported properly. Use only integer numbers in "+testcase.glblvalOfEstimatedTime;//Added by Mohini for Resource file
	        	XlSheet.cells(2,2).font.colorindex="1";
			   	XlSheet.cells(2,2).font.bold="true";
			   	XlSheet.cells(2,2).font.Name="Cambria";
			   	XlSheet.cells(2,2).interior.colorindex="15";
			   	XlSheet.cells(2,3).interior.colorindex="15";
				XlSheet.cells(2,4).interior.colorindex="15";
				XlSheet.cells(2,5).interior.colorindex="15";
				XlSheet.cells(2,6).interior.colorindex="15";
				XlSheet.cells(2,7).interior.colorindex="15";
				XlSheet.cells(2,8).interior.colorindex="15";
				XlSheet.cells(2,9).interior.colorindex="15";
				XlSheet.cells(2,10).interior.colorindex="15";
	
				XlSheet.cells(3,1).value=testcase.gConfigProject+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,1).font.colorindex="2";
			   	XlSheet.cells(3,1).font.bold="false";
			   	XlSheet.cells(3,1).interior.colorindex="23";
			   	XlSheet.cells(3,1).Characters( testcase.gConfigProject.length+2 ,1).Font.colorindex= "3";
			   	
			   	if(isPortfolioOn)//:SD
			   	{
				   	XlSheet.cells(3,2).value=testcase.gConfigVersion+" *";//Added by Mohini for Resource file
				   	XlSheet.cells(3,2).font.colorindex="2";
				   	XlSheet.cells(3,2).font.bold="false";
				   	XlSheet.cells(3,2).interior.colorindex="23";
				   	XlSheet.cells(3,2).Characters(testcase.gConfigVersion.length+2,1).Font.colorindex= "3";
			   	}
			    
				//Variable for cell no:SD       
			   	XlSheet.cells(3,testPassCellNo).value=testcase.gConfigTestPass+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,testPassCellNo).font.colorindex="2";
			   	XlSheet.cells(3,testPassCellNo).font.bold="false";
			   	XlSheet.cells(3,testPassCellNo).interior.colorindex="23";
			   	XlSheet.cells(3,testPassCellNo).Characters(testcase.gConfigTestPass.length+2,1).Font.colorindex= "3";
		
			   	XlSheet.cells(3,testCaseCellNo).value=testcase.gConfigTestCase+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,testCaseCellNo).font.colorindex="2";
			   	XlSheet.cells(3,testCaseCellNo).font.bold="false";
			   	XlSheet.cells(3,testCaseCellNo).interior.colorindex="23";
			   	XlSheet.cells(3,testCaseCellNo).Characters(testcase.gConfigTestCase.length+2,1).Font.colorindex= "3";
		
				XlSheet.cells(3,descriptionCellNo).value= testcase.glblvalOfDescription;//Added by Mohini for Resource file
			   	XlSheet.cells(3,descriptionCellNo).font.colorindex="2";
			   	XlSheet.cells(3,descriptionCellNo).font.bold="false";
			   	XlSheet.cells(3,descriptionCellNo).interior.colorindex="23";
			   	
			   	XlSheet.cells(3,ETAcellNo).value=testcase.glblvalOfEstimatedTime;
			   	XlSheet.cells(3,ETAcellNo).font.colorindex="2";
			   	XlSheet.cells(3,ETAcellNo).font.bold="false";
			   	XlSheet.cells(3,ETAcellNo).interior.colorindex="23";
		 	   	
		 	    XlSheet.Range("A3").EntireColumn.AutoFit();
		 	    XlSheet.Range("B3").EntireColumn.AutoFit();
			    XlSheet.Range("C3").EntireColumn.AutoFit();
		        XlSheet.Range("D3").EntireColumn.AutoFit();
		        XlSheet.Range("E3").EntireColumn.AutoFit();
		        if(isPortfolioOn)//:SD
		        	XlSheet.Range("F3").EntireColumn.AutoFit();
		       
		        XlSheet.Range("A3").EntireColumn.columnwidth='20';
		        XlSheet.Range("B3").EntireColumn.columnwidth='20';
		        XlSheet.Range("C3").EntireColumn.columnwidth='20';
		        XlSheet.Range("D3").EntireColumn.columnwidth='20';
		        if(isPortfolioOn)
		        	XlSheet.Range("E3").EntireColumn.columnwidth='20';
		        else
		        	XlSheet.Range("E3").EntireColumn.columnwidth='28';//:SD
		        		
		        if(isPortfolioOn)//:SD
		        	XlSheet.Range("F3").EntireColumn.columnwidth='28';
		       
		        XlSheet.Range("A3").EntireColumn.WrapText='True';
		        XlSheet.Range("B3").EntireColumn.WrapText='True';
		        XlSheet.Range("C3").EntireColumn.WrapText='True';
		        XlSheet.Range("D3").EntireColumn.WrapText='True';
		        XlSheet.Range("E3").EntireColumn.WrapText='True';
		        if(isPortfolioOn)//:SD
		        	XlSheet.Range("F3").EntireColumn.WrapText='True';
		       
		        XlSheet.Range("A3").EntireColumn.VerticalAlignment=true;
		        XlSheet.Range("A3").EntireColumn.HorizontalAlignment=true;
		      
		        XlSheet.Range("B3").EntireColumn.VerticalAlignment=true;
		        XlSheet.Range("B3").EntireColumn.HorizontalAlignment=true;
		       
		        XlSheet.Range("C3").EntireColumn.VerticalAlignment=true;
		        XlSheet.Range("C3").EntireColumn.HorizontalAlignment=true;
		       
		        XlSheet.Range("D3").EntireColumn.VerticalAlignment=true;
		        XlSheet.Range("D3").EntireColumn.HorizontalAlignment=true;
		        
		        XlSheet.Range("E3").EntireColumn.VerticalAlignment=true;
		        XlSheet.Range("E3").EntireColumn.HorizontalAlignment=true;
		        
		        if(isPortfolioOn)//:SD
		        {
		        	XlSheet.Range("F3").EntireColumn.VerticalAlignment=true;
		        	XlSheet.Range("F3").EntireColumn.HorizontalAlignment=true;
		        	XlSheet.Range("F3").EntireColumn.HorizontalAlignment = 2; //Added by shilpa for bug 7081
		        }
	
		        
		        XlSheet.cells(1,2).WrapText='False';
		        XlSheet.cells(2,2).WrapText='False';
		       
		       			    
			    XlSheet.cells(4,1).value= $("#projectTitle label").attr('title');
			    
			    if(isPortfolioOn)//:SD
			    	XlSheet.cells(4,2).value = "'"+$("#versionTitle label").attr("title");
			    
			    //TestPass Names
			    var testPassesWithTester = new Array();
			   				
				//query form for all testpassIds for which testers are present in tester list :SD
				var camlQuery = '<Query><Where>';var q ='';
				for(var u=0;u<show.TestPassIDArr.length-1;u++)			 
				{
					camlQuery +='<Or><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+show.TestPassIDArr[u]+'</Value></Eq>';
					q += '</Or>';
					
		        }			
				camlQuery += '<Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+show.TestPassIDArr[u]+'</Value></Eq>';
				if(q != '')
					camlQuery += q;
			
				camlQuery +='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="SPUserID" /><FieldRef Name="TestPassID" /></ViewFields></Query>';	
				var TesterListResult  = testcase.dmlOperation(camlQuery,'Tester');
				if(TesterListResult != null && TesterListResult != undefined)
				{
					for(var m=0;m<TesterListResult.length;m++)
					{
						var index = $.inArray(TesterListResult[m]['TestPassID'],show.TestPassIDArr);
						if(index!=undefined)
						{
							if($.inArray(show.TestPassNameArr[index],testPassesWithTester)==-1)
								testPassesWithTester.push(show.TestPassNameArr[index]);
						}
					}
				}
				//Here***********************
				
				var tp=testPassesWithTester[0];
				for(var i=1;i<testPassesWithTester.length;i++)
				{
					tp=tp+","+testPassesWithTester[i];
				}
				XlSheet.cells(4,testPassCellNo).value = tp;//:SD
				
				xlApp.DisplayAlerts = true;
				xlApp.Visible = true; // Added by shilpa
	         	CollectGarbage();
	         	window.setTimeout("Main.hideLoading()", 200);

									
         	}
         	catch(err)
         	{
         		alert(err.message);
         		window.setTimeout("Main.hideLoading()", 200);
         	}
		}
		
		
	},
	//End Of TestCase Template
	
	//Test Step Template
	openTSExcel:function()
	{
		exp.isPortfolioOn = isPortfolioOn;
		
		if(typeof (window.ActiveXObject) == undefined) 
		{
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else
        {
			Main.showLoading();
			var stat = 0;
			try
			{
				var xlApp = new ActiveXObject("Excel.Application");
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
			try
			{
				xlApp.DisplayAlerts = false;
				var xlBook = xlApp.Workbooks.Add();
				xlBook.worksheets("Sheet1").activate;
				var XlSheet = xlBook.activeSheet;
				XlSheet.Name=teststep.gConfigTestStep+" Template";//Added by Mohini for Resource file
				
				//To define cellNo as per portfolio mode:SD
				if(isPortfolioOn)
				{
					var versionCellNo=2;var testPassCellNo=3;var testCaseCellNo=4;var testStepCellNo=5;var expectedResult=6;var roleCellNo=7;   
				}
				else
				{
					var testPassCellNo=2;var testCaseCellNo=3;var testStepCellNo=4;var expectedResult=5;var roleCellNo=6;   
				}
					
		  		//Set Excel Column Headers and formatting from array
		  		XlSheet.cells(1,1).value= "Note:";			
				XlSheet.cells(1,1).font.colorindex="2";
			   	XlSheet.cells(1,1).font.bold="true";
				XlSheet.cells(1,1).font.Name="Cambria";		   	
			   	XlSheet.cells(1,1).interior.colorindex="16";
			   	XlSheet.cells(2,1).interior.colorindex="16";
			   	
			   	XlSheet.cells(1,2).value= "•Please follow the same format as given below to add the "+teststep.gConfigTestStep.toLowerCase()+"s!";//Added by Mohini for Resource file
			   	XlSheet.cells(1,2).font.colorindex="1";
			   	XlSheet.cells(1,2).font.bold="true";
			   	XlSheet.cells(1,2).font.Name="Cambria";
			   	XlSheet.cells(1,2).interior.colorindex="15";
			   	XlSheet.cells(1,3).interior.colorindex="15";
			   	XlSheet.cells(1,4).interior.colorindex="15";
				XlSheet.cells(1,5).interior.colorindex="15";
				XlSheet.cells(1,6).interior.colorindex="15";
	
			    //Code added by Deepak for sequencing 
			   	XlSheet.cells(2,2).value= "•If you change the format of the template, data will not be imported properly.(Use only single "+teststep.gConfigTestCase.toLowerCase()+" name from the list of provided pipe separated "+teststep.gConfigTestCase.toLowerCase()+"s as you can add "+teststep.gConfigTestStep.toLowerCase()+" within one "+teststep.gConfigTestCase.toLowerCase()+" only at a time.)";//Added by Mohini for Resource file
			    //Code added by Deepak for sequencing 
			   	XlSheet.cells(2,2).font.colorindex="1";
			   	XlSheet.cells(2,2).font.bold="true";
			   	XlSheet.cells(2,2).font.Name="Cambria";
			   	XlSheet.cells(2,2).interior.colorindex="15";
			   	XlSheet.cells(2,3).interior.colorindex="15";
				XlSheet.cells(2,4).interior.colorindex="15";
				XlSheet.cells(2,5).interior.colorindex="15";
				XlSheet.cells(2,6).interior.colorindex="15";
				
				if(isPortfolioOn)//:SD
			   	{
					XlSheet.cells(1,7).interior.colorindex="15";
					XlSheet.cells(2,7).interior.colorindex="15";
				}
				
				XlSheet.cells(3,1).value= teststep.gConfigProject+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,1).font.colorindex="2";
			   	XlSheet.cells(3,1).font.bold="false";
			   	XlSheet.cells(3,1).interior.colorindex="23";
			   	XlSheet.cells(3,1).Characters(teststep.gConfigProject.length+2,1).Font.colorindex= "3";
			   	
			   	if(isPortfolioOn)//:SD
			   	{
				   	XlSheet.cells(3,versionCellNo).value= teststep.gConfigVersion+" *";//Added by Mohini for Resource file
				   	XlSheet.cells(3,versionCellNo).font.colorindex="2";
				   	XlSheet.cells(3,versionCellNo).font.bold="false";
				   	XlSheet.cells(3,versionCellNo).interior.colorindex="23";
				   	XlSheet.cells(3,versionCellNo).Characters(teststep.gConfigVersion.length+2,1).Font.colorindex= "3";
			   	}
		        
			   	XlSheet.cells(3,testPassCellNo).value= teststep.gConfigTestPass+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,testPassCellNo).font.colorindex="2";
			   	XlSheet.cells(3,testPassCellNo).font.bold="false";
			   	XlSheet.cells(3,testPassCellNo).interior.colorindex="23";
			   	XlSheet.cells(3,testPassCellNo).Characters(teststep.gConfigTestPass.length+2,1).Font.colorindex= "3";
		
			   	XlSheet.cells(3,testCaseCellNo).value= teststep.gConfigTestCase+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,testCaseCellNo).font.colorindex="2";
			   	XlSheet.cells(3,testCaseCellNo).font.bold="false";
			   	XlSheet.cells(3,testCaseCellNo).interior.colorindex="23";
			   	XlSheet.cells(3,testCaseCellNo).Characters(teststep.gConfigTestCase.length+2,1).Font.colorindex= "3";
		
				XlSheet.cells(3,testStepCellNo).value= teststep.gConfigTestStep+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,testStepCellNo).font.colorindex="2";
			   	XlSheet.cells(3,testStepCellNo).font.bold="false";
			   	XlSheet.cells(3,testStepCellNo).interior.colorindex="23";
			   	XlSheet.cells(3,testStepCellNo).Characters(teststep.gConfigTestStep.length+2,1).Font.colorindex= "3";
			   	
			   	XlSheet.cells(3,expectedResult).value= teststep.gConfigExpectedResult;//Added by Mohini for Resource file
			   	XlSheet.cells(3,expectedResult).font.colorindex="2";
			   	XlSheet.cells(3,expectedResult).font.bold="false";
			   	XlSheet.cells(3,expectedResult).interior.colorindex="23";
			   	
			   	XlSheet.cells(3,roleCellNo).value= teststep.gCongfigRoles+" *";//Added by Mohini for Resource file
			   	XlSheet.cells(3,roleCellNo).font.colorindex="2";
			   	XlSheet.cells(3,roleCellNo).font.bold="false";
			   	XlSheet.cells(3,roleCellNo).interior.colorindex="23";
			   	XlSheet.cells(3,roleCellNo).Characters(teststep.gCongfigRoles.length+2,1).Font.colorindex= "3";
			   			 	   	
		 	   XlSheet.Range("A1").EntireColumn.AutoFit();
		 	   XlSheet.Range("B1").EntireColumn.AutoFit();
			   XlSheet.Range("C1").EntireColumn.AutoFit();
		       XlSheet.Range("D1").EntireColumn.AutoFit();
		       XlSheet.Range("E1").EntireColumn.AutoFit();
		       XlSheet.Range("F1").EntireColumn.AutoFit();
		       if(isPortfolioOn)
		       	XlSheet.Range("G1").EntireColumn.AutoFit();
		       	
		       //Set width of columns as per portfolio mode:SD	
		       if(isPortfolioOn)
		       {
			       XlSheet.Range("A1").EntireColumn.columnwidth='20';
			       XlSheet.Range("B1").EntireColumn.columnwidth='20';
			       XlSheet.Range("C1").EntireColumn.columnwidth='20';
			       XlSheet.Range("D1").EntireColumn.columnwidth='20';
			       XlSheet.Range("E1").EntireColumn.columnwidth='50';//Changed by HRW
			       XlSheet.Range("F1").EntireColumn.columnwidth='50';
			       XlSheet.Range("G1").EntireColumn.columnwidth='20';
		       }
		       else
		       {
		       	   XlSheet.Range("A1").EntireColumn.columnwidth='20';
			       XlSheet.Range("B1").EntireColumn.columnwidth='20';
			       XlSheet.Range("C1").EntireColumn.columnwidth='20';
			       XlSheet.Range("D1").EntireColumn.columnwidth='50';
			       XlSheet.Range("E1").EntireColumn.columnwidth='50';//Changed by HRW
			       XlSheet.Range("F1").EntireColumn.columnwidth='20';
		       }
		
			   XlSheet.Range("A1").EntireColumn.WrapText='True';
		       XlSheet.Range("B1").EntireColumn.WrapText='True';
		       XlSheet.Range("C1").EntireColumn.WrapText='True';
		       XlSheet.Range("D1").EntireColumn.WrapText='True';
		       XlSheet.Range("E1").EntireColumn.WrapText='True';
		       XlSheet.Range("F1").EntireColumn.WrapText='True';
		       if(isPortfolioOn)
		       	XlSheet.Range("G1").EntireColumn.WrapText='True';
		
		       XlSheet.Range("A1").EntireColumn.VerticalAlignment=true;
		       XlSheet.Range("A1").EntireColumn.HorizontalAlignment=true;
		       
		       XlSheet.Range("B1").EntireColumn.VerticalAlignment=true;
		       XlSheet.Range("B1").EntireColumn.HorizontalAlignment=true;
		       
		       XlSheet.Range("C1").EntireColumn.VerticalAlignment=true;
		       XlSheet.Range("C1").EntireColumn.HorizontalAlignment=true;
		       
		       XlSheet.Range("D1").EntireColumn.VerticalAlignment=true;
		       XlSheet.Range("D1").EntireColumn.HorizontalAlignment=true;
		       
		       XlSheet.Range("E1").EntireColumn.VerticalAlignment=true;
		       XlSheet.Range("E1").EntireColumn.HorizontalAlignment=true;
		       
		       XlSheet.Range("F1").EntireColumn.VerticalAlignment=true;
		       XlSheet.Range("F1").EntireColumn.HorizontalAlignment=true;
		       
		       if(isPortfolioOn)//:SD
		       {
					XlSheet.Range("G1").EntireColumn.VerticalAlignment=true;
					XlSheet.Range("G1").EntireColumn.HorizontalAlignment=true;
					XlSheet.cells(1,2).WrapText='False';
					XlSheet.Range("B2:G2").RowHeight = 35;
					XlSheet.Range("B2:G2").Merge(true);
					XlSheet.cells(2,2).WrapText='true';
				}
				else
				{
					XlSheet.Range("F1").EntireColumn.VerticalAlignment=true;
					XlSheet.Range("F1").EntireColumn.HorizontalAlignment=true;
					XlSheet.cells(1,2).WrapText='False';
					XlSheet.Range("B2:F2").RowHeight = 35;
					XlSheet.Range("B2:F2").Merge(true);
					XlSheet.cells(2,2).WrapText='true';
				}
				var projectName = teststep.projectName;
				var TPName = teststep.testPassName;
				var version  = "'"+$("#versionTitle label").attr("title");
				var roles = new Array();
				
			    //Roles
				$("#role div div li").each(function()
				{
					if($(this).children(".mslChk").attr('disabled')!= true)
					{
						roles.push($(this).attr("title"));
					}
				});
				var testPassesWithTester = new Array();
			    $("#testCaseName div div li").each(function()
				{
					if($(this).children(".mslChk").attr('disabled')!= true)
					{
						testPassesWithTester.push($(this).children('span').text());
					}
				});
				for(var i=0;i<testPassesWithTester.length;i++)
				{
					var rangeT = "A1:F"+(i+4);
					XlSheet.Range(rangeT).NumberFormat = "@";
					XlSheet.cells(i+4,1).value = projectName;
					if(isPortfolioOn)
		       			XlSheet.cells(i+4,versionCellNo).value = version;
					XlSheet.cells(i+4,testPassCellNo).value = TPName;
					XlSheet.cells(i+4,testCaseCellNo).value = testPassesWithTester[i];
					XlSheet.cells(i+4,roleCellNo).value = roles;// tp;
				}
				
				
				
				xlApp.DisplayAlerts = true;
				xlApp.Visible = true;
	         	CollectGarbage();
	         	window.setTimeout("Main.hideLoading()", 200);
         	}
         	catch(err)
         	{
         		alert(err.message);
         		window.setTimeout("Main.hideLoading()", 200);
         	}
		}
	}
}