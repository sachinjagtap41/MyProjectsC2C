var ppt = {

	/* Export To PPT */
	pptPieChartArray:new Array(),
	pptBarChartArray:new Array(),
	pptProjectNameArray:new Array(),
	pptDate:new Array(),
	pptDate1:new Array(),
	
	pptExecTSandTesterCountForProjectIDs:new Array(),
	pptpieDataWithExecForPIDs:new Array(),
	pptallProjectIDsWithExcec:new Array(),
	
	uname:'',
	pptPassCnt:'',
	pptFailCnt:'',
	pptNotCompletedCnt:'',
	pptExecuted:'',
	pptTotal:'',
	pptActiveTesters:'',
	dateDispFlag:0,
	reportHeading:'',
	prjArray:new Array(),
	prjArray1:new Array(),
	fileNameArr:new Array(),
	
	flagForActivex:0,
	
	monthName:new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'),
//Variables for Portfolio:Mohini Date:07-03-2014
arrVersion:new Array(),
arrVersion1:new Array(),
jsonArrOfProjects:new Array(),
SortedjsonArrOfProjects:new Array(),
arrofProjectName:new Array(),
//added by Mohini DT:18-03-2014
projectInfo:function()
{

 if(report.isPortfolioOn)//if Portfolio is On
 {
   
     if(report.projectItems != null && report.projectItems != undefined)
     {
	      for(var i=0;i<report.projectItems.length;i++)
		  {
		    if($.inArray(report.projectItems[i]["ID"],report2.arrprjChecked) !=-1)
		    {
		      items={}
		      items["group"]=report.projectItems[i].Group==undefined || report.projectItems[i].Group==null || report.projectItems[i].Group==""?'Default '+report.gConfigGroup:report.projectItems[i].Group;
		      items["portfolio"]=report.projectItems[i].Portfolio==undefined || report.projectItems[i].Portfolio==null || report.projectItems[i].Portfolio==""?'Default '+report.gConfigPortfolio:report.projectItems[i].Portfolio;
		      items["projectName"]=report.projectItems[i].projectName;
		      items["versionName"]=report.projectItems[i].ProjectVersion==undefined || report.projectItems[i].ProjectVersion==null || report.projectItems[i].ProjectVersion==""?'Default '+report.gConfigVersion:report.projectItems[i].ProjectVersion;
	
		      
		      ppt.jsonArrOfProjects.push(items);
		    }
		  }
	 }
	   ppt.SortedjsonArrOfProjects=ppt.sortJSON(ppt.jsonArrOfProjects,"group",'asc');
 }
 else
 {
       ppt.arrofProjectName=[];
      if(report.projectItems != null && report.projectItems != undefined)
      {
		   for(var i=0;i<report.projectItems.length;i++)
		   {
			    if($.inArray(report.projectItems[i]["ID"],report2.arrprjChecked) !=-1)
			    {
			      items={}
			      items["projectName"]=report.projectItems[i].projectName;
		          ppt.arrofProjectName.push(items);
			    }
		   }
	  }
	
 }
},
sortJSON:function(data, key, way) {
    return data.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        if (way === 'asc' ) { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
        if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
    });
},
/*****************************************/
	statusPatternDiaplg:function()
	{
	  //Added By Mohini for bug ID:11484 DT:27-03-2014
	  if($("#setFilter").val()=="Dates")
	  {
		  if($("#startDate").val() == "" || $("#endDate").val() == "")
		  {
		     report.alertBox('Please select date!');
		     Main.hideLoading();	
		     return;
		  }
	  }
	  if($('#prjDetailsCons input').length != 0)
      {
      	if(report2.pptResetFlag == 1)
		{
			ppt.reportHeading = "Consolidated Status Report";
			ppt.exportToPPT('','',"ConsolidateStatusReport");
			ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
		}
		else
		{
		  switch($("#setFilter").val())
		  {
			case "Dates":
				$('#statusPopUpForDates').dialog({ resizable: false,
					modal: true,
					height: 370,
					width:500,
					buttons: {
						"Ok" : function(){	
							$( this ).dialog( "close" );
							Main.showLoading();
							setTimeout('ppt.genearatePPTForDates();',200);
							Main.hideLoading();
						},
						"Cancel" : function(){
							$( this ).dialog( "close" );
						}											
					}
		 		});
		 		break;
			case "1":
				ppt.fileNameArr.length = 0;
				ppt.dateDispFlag = 0;
				ppt.reportHeading = "Status Report";
				ppt.exportToPPT(ppt.pptDate,ppt.pptDate1,"StatusReport");
				if(ppt.flagForActivex == 0)
					ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
				break;
			case "2":
				ppt.fileNameArr.length = 0;
				ppt.dateDispFlag = 0;
				ppt.reportHeading = "Status Report";
				ppt.exportToPPT(ppt.pptDate,ppt.pptDate1,"StatusReport");
				if(ppt.flagForActivex == 0)
					ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
				break;
			case "7":
				$('#statusPopUpForLast7').dialog({ resizable: false,
					modal: true,
					height: 370,
					width:500,
					buttons: {
						"Ok" : function(){	
							$( this ).dialog( "close" );
							Main.showLoading();
							setTimeout('ppt.generatePPTForLast7();',200);
							Main.hideLoading();
						},
						"Cancel" : function(){
							$( this ).dialog( "close" );
						}											
					}
		 		});
				break;
		    }
		  }
		}
		else
		{
			//report.alertBox("No 'Project' is available in selected 'Date Filter' criteria.");
			report.alertBox("No '"+report.gConfigProject+"' is available in selected 'Date Filter' criteria.");//Added by Mohini for Resource File(Date:25-02-2014)
			Main.hideLoading();	
			return;
		}
		Main.hideLoading();
	},
	
	genearatePPTForDates:function()
	{
		ppt.fileNameArr.length = 0;
		$('#statusPopUpForDates').find('input[type="checkbox"]:checked').each(function(){ 
			switch($(this).val())
			{
				case "Monthly":
					var startDate = new Date($("#startDate").val());
					var endDate = new Date($("#endDate").val());
					
					ppt.dateDispFlag = 1;
					var monthStartDate = new Array();
					var monthEndDate = new Array();

					var firstDay = new Date(startDate);
					var lastDay = new Date(startDate.getFullYear(), startDate.getMonth()+1, 0);

					monthStartDate.push(new Date(firstDay));
					//monthEndDate.push(new Date(lastDay));
					if(lastDay <= endDate)
						monthEndDate.push(new Date(lastDay));
					else
						monthEndDate.push(new Date(endDate));

					while(lastDay < endDate)
					{
						firstDay = lastDay.setDate(lastDay.getDate() + 1);
						var temp = new Date(firstDay);
						lastDay = new Date(temp.getFullYear(), temp.getMonth()+1, 0);
						monthStartDate.push(new Date(firstDay));
						if(lastDay <= endDate)
							monthEndDate.push(new Date(lastDay));
						else
						{
							monthEndDate.push(new Date(endDate));
							break;
						}
					}
					ppt.reportHeading = "Monthly Status Report";
					ppt.exportToPPT(monthStartDate,monthEndDate,"MonthlyStatusReport");
					break;
					
				case "Weekly":
					ppt.dateDispFlag = 1;
					var startDate = new Date($("#startDate").val());
					var endDate = new Date($("#endDate").val());
					var weekStartDate = new Array();
					var weekEndDate = new Array();
					
					d = new Date(startDate);
					weekStartDate.push(new Date(startDate));
					if(d.getDay() == 0 && startDate <= endDate)
					{
						weekEndDate.push(new Date(startDate));
						var d1 = d.setDate(d.getDate() + 1);
						d = new Date(d1);
						weekStartDate.push(new Date(d));
					}
					
					var day = d.getDay();
					d.setDate(d.getDate()+ (6 - day) + 1);
					var temp = new Date(d);
					if(temp <= endDate)
						weekEndDate.push(new Date(temp));
					else
						weekEndDate.push(new Date(endDate));
					
					while(temp < endDate)
					{
						var firstDay = temp.setDate(temp.getDate() + 1);
						var d = new Date(firstDay);
						weekStartDate.push(new Date(d));
						var day = d.getDay();
						d.setDate(d.getDate()+ (6 - day) + 1);
						var temp = new Date(d);
						if(temp <= endDate)
							weekEndDate.push(new Date(temp));
						else
						{
							weekEndDate.push(new Date(endDate));
							break;
						}
					}
					ppt.reportHeading = "Weekly Status Report";
					ppt.exportToPPT(weekStartDate,weekEndDate,"WeeklyStatusReport");
					break;

					/*ppt.dateDispFlag = 1;
					var startDate = new Date($("#startDate").val());
					var endDate = new Date($("#endDate").val());
					var weekStartDate = new Array();
					var weekEndDate = new Array();
					d = new Date(startDate);
					var day = d.getDay();
					d.setDate(d.getDate()+ (6 - day) + 1);
					var temp = new Date(d);
					weekStartDate.push(new Date(startDate));
					//weekEndDate.push(new Date(temp));
					if(temp <= endDate)
						weekEndDate.push(new Date(temp));
					else
						weekEndDate.push(new Date(endDate));

					while(temp < endDate)
					{
						var firstDay = temp.setDate(temp.getDate() + 1);
						var d = new Date(firstDay);
						weekStartDate.push(new Date(d));
						var day = d.getDay();
						d.setDate(d.getDate()+ (6 - day) + 1);
						var temp = new Date(d);
						if(temp <= endDate)
							weekEndDate.push(new Date(temp));
						else
						{
							weekEndDate.push(new Date(endDate));
							break;
						}
					}
					ppt.reportHeading = "Weekly Status Report";
					ppt.exportToPPT(weekStartDate,weekEndDate,"WeeklyStatusReport");
					break;*/
					
				case "Daily":
					ppt.dateDispFlag = 0;
					var startDate = new Date($("#startDate").val());
					var endDate = new Date($("#endDate").val());
					var pptBetDate = new Array();
					var pptBetDate1 = new Array();
					var pptCurrDate = startDate;
					while (pptCurrDate <= endDate)
					{
					    pptBetDate.push(new Date(pptCurrDate));
					    pptBetDate1.push(new Date(pptCurrDate));
					    pptCurrDate.setDate(pptCurrDate.getDate() + 1);
					}
					ppt.pptDate = pptBetDate;
					ppt.pptDate1 = pptBetDate1;
					ppt.reportHeading = "Daily Status Report";
					ppt.exportToPPT(ppt.pptDate,ppt.pptDate1,"DailyStatusReport");
					break;
					
				case "Consolidate":
					ppt.dateDispFlag = 1;
					var weekStartDate = new Array();
					var weekEndDate = new Array();
					weekStartDate.push(new Date($("#startDate").val()));
					weekEndDate.push(new Date($("#endDate").val()));
					ppt.reportHeading = "Consolidated Status Report";
					ppt.exportToPPT(weekStartDate,weekEndDate,"ConsolidateStatusReport");
					break;
			}
		});
		if(ppt.flagForActivex == 0)
		{
			var len = $('#statusPopUpForDates').find('input[type="checkbox"]:checked').length;
			switch(len)
			{
				case 1:
					ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
					break;
				case 2:
					ppt.alertBox("PPT files for selected 'Status Patterns' are exported successfully with below listed filenames and are saved on local drive at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport'.<br/><br/> 1. "+ppt.fileNameArr[0]+"<br/>2. "+ppt.fileNameArr[1]);
					break;
				case 3:
					ppt.alertBox("PPT files for selected 'Status Patterns' are exported successfully with below listed filenames and are saved on local drive at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport'.<br/><br/> 1. "+ppt.fileNameArr[0]+"<br/>2. "+ppt.fileNameArr[1]+"<br/>3. "+ppt.fileNameArr[2]);
					break;
				case 4:
					ppt.alertBox("PPT files for selected 'Status Patterns' are exported successfully with below listed filenames and are saved on local drive at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport'.<br/><br/> 1. "+ppt.fileNameArr[0]+"<br/>2. "+ppt.fileNameArr[1]+"<br/>3. "+ppt.fileNameArr[2]+"<br/>4. "+ppt.fileNameArr[3]);
					break;
			}
		}
	},
	
	generatePPTForLast7:function()
	{
		ppt.fileNameArr.length = 0;
		$('#statusPopUpForLast7').find('input[type="checkbox"]:checked').each(function(){ 
			switch($(this).val())
			{
				case "Daily":
					var curr = new Date();
					var startDate = new Date(curr.setDate(curr.getDate() - 1));
					var endDate = new Date(curr.setDate(curr.getDate() - 6));
					ppt.dateDispFlag = 0;
					var pptBetDate = new Array();
					var pptBetDate1 = new Array();
					var pptCurrDate = startDate;
					for(var a=0; a<7; a++)
					{
					    pptBetDate.push(new Date(pptCurrDate));
					    pptBetDate1.push(new Date(pptCurrDate));
					    pptCurrDate.setDate(pptCurrDate.getDate() - 1);
					}
					ppt.pptDate = pptBetDate;
					ppt.pptDate1 = pptBetDate1;
					ppt.reportHeading = "Daily Status Report";
					ppt.exportToPPT(ppt.pptDate,ppt.pptDate1,"DailyStatusReport");
					break;
					
				case "Consolidate":
					var curr = new Date();
					var startDate = new Date(curr.setDate(curr.getDate() - 1));
					var endDate = new Date(curr.setDate(curr.getDate() - 6));
					ppt.dateDispFlag = 1;
					var weekStartDate = new Array();
					var weekEndDate = new Array();
					weekStartDate.push(startDate);
					weekEndDate.push(endDate);
					ppt.reportHeading = "Consolidated Status Report";
					ppt.exportToPPT(weekEndDate,weekStartDate,"ConsolidateStatusReport");
					break;
			}
		});
		if(ppt.flagForActivex == 0)
		{
			var len = $('#statusPopUpForLast7').find('input[type="checkbox"]:checked').length;
			switch(len)
			{
				case 1:
					ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
					break;
				case 2:
					ppt.alertBox("PPT files for selected 'Status Patterns' are exported successfully with below listed filenames and are saved on local drive at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport'.<br/><br/> 1. "+ppt.fileNameArr[0]+"<br/>2. "+ppt.fileNameArr[1]);
					break;
			}
		}
	},
	exportToPPT:function(weekStartDate,weekEndDate,fName)
	{
	   	var state = 0;
		try {
			var object = new ActiveXObject("Scripting.FileSystemObject");
			var WinNetwork = new ActiveXObject("WScript.Network");
			ppt.uname = WinNetwork.username;
			state = 1;
		}
		catch (e) {
		}
		if (state == 0) {
			Main.showPrerequisites("Prerequisites for 'Export to ppt' feature"); 
			ppt.flagForActivex = 1;
			return;
		}
		else
		{
			if (!object.FolderExists("C:\\Users\\" + ppt.uname + "\\Desktop\\StatusReport"))
				object.CreateFolder("C:\\Users\\" + ppt.uname + "\\Desktop\\StatusReport\\");
		}
		
		var location = "C:\\Users\\" + ppt.uname + "\\Desktop\\StatusReport";
		var fileName = fName +""+ ppt.FilesCount("C:\\Users\\" + ppt.uname + "\\Desktop\\StatusReport") + ".pptx";
		var dest = "C:\\Users\\" + ppt.uname + "\\Desktop\\StatusReport\\" + fileName;
     	
		var myApp = new ActiveXObject("PowerPoint.Application");
		myApp.DisplayAlerts = false;
		var pres = myApp.Presentations.Add(0);
		var slide1 = pres.Slides.Add(1, 2);

		/* Code for slide 1 */
		var sHeight = pres.PageSetup.SlideHeight;
		var sWidth = pres.PageSetup.SlideWidth;

		var shape = slide1.shapes.AddShape(1, 0, 0, sWidth, Math.round(sHeight/3));
		shape.Fill.ForeColor.RGB = '15643136';	// Blue
		shape.Line.visible=0;

		var shapetxt = slide1.shapes.AddTextbox(1, 0, 55, sWidth, 30);
		shapetxt.TextFrame.TextRange.Text = ppt.reportHeading; //"Report Heading goes here";
		shapetxt.TextFrame.TextRange.Font.Size = 16;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
		shapetxt.TextFrame.MarginRight = 30;

		var shapetxt = slide1.shapes.AddTextbox(1, 0, 85, sWidth, 60);
		//shapetxt.TextFrame.TextRange.Text = "Project Status Report";
		shapetxt.TextFrame.TextRange.Text = report.gConfigProject+" Status Report";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = 44;
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; // 3 -> right aligned
		shapetxt.TextFrame.MarginRight = 30;
		
		/*var shape = slide1.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/3), Math.round(sWidth/2), Math.round(sHeight/2));
		shape.Fill.ForeColor.RGB = '14277081'; //Gray
		shape.Line.visible=0;
		ppt.prjArray.length = 0;
			$('#prjDetailsCons input').each(function(){
			if($(this).is(':checked') == true)
				ppt.prjArray.push($(this).parent().text());	
		});
		
		var top = Math.round(sHeight/3) + 10;
		for(var i=0; i<ppt.prjArray.length; i++)
		{
			var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/2), top, Math.round(sWidth/2), Math.round(sHeight/2.5));
			shapetxt.TextFrame.TextRange.Text = ppt.prjArray[i];
			shapetxt.TextFrame.TextRange.Font.Size = 20;
			shapetxt.TextFrame.MarginTop = 5;
			shapetxt.TextFrame.MarginRight = 30;
			shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
			top += 30;
		}*/
		
	   //added by Mohini DT:18-03-2014
		ppt.jsonArrOfProjects=[]; 
        ppt.SortedjsonArrOfProjects=[];      
        ppt.projectInfo();
      /*********************************/
		if(report.isPortfolioOn)//if portfolio is On
        {
             var groupName='';
             var portfolioName='';
             var versionName='';
             var projectName='';
             var shape = slide1.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/3), Math.round(sWidth/2), Math.round(sHeight/1.5));
		     shape.Fill.ForeColor.RGB = '14277081'; //Gray
		     shape.Line.visible=0;
		      
		      ppt.prjArray.length = 0;
	          ppt.arrVersion.length = 0;
	          var top = Math.round(sHeight/3);
			     for(var i=0;i<ppt.SortedjsonArrOfProjects.length;i++)
			     {
				    ppt.prjArray.push(ppt.SortedjsonArrOfProjects[i].projectName);
					ppt.arrVersion.push(ppt.SortedjsonArrOfProjects[i].versionName);
					if(groupName!=ppt.SortedjsonArrOfProjects[i].group || portfolioName!=ppt.SortedjsonArrOfProjects[i].portfolio)
					{
						groupName=ppt.SortedjsonArrOfProjects[i].group;
						portfolioName=ppt.SortedjsonArrOfProjects[i].portfolio;
						versionName=ppt.SortedjsonArrOfProjects[i].versionName;
						projectName=ppt.SortedjsonArrOfProjects[i].projectName;

						
						var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.65),top, Math.round(sWidth/5), Math.round(sHeight/3)+10);
						shapetxt.Fill.ForeColor.RGB = '11250603';
						shapetxt.TextFrame.TextRange.Text =trimText(groupName,19);
						shapetxt.TextFrame.TextRange.Font.Color.RGB ='2368548';
						shapetxt.TextFrame.TextRange.Font.Size = 14;
						shapetxt.TextFrame.MarginTop = 3;
						shapetxt.TextFrame.MarginRight = 25;
						shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
						//top += 30;
						
						var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.25)+5,top, Math.round(sWidth/5)-4, Math.round(sHeight/3)+10);
						shapetxt.Fill.ForeColor.RGB = '11250603';
						shapetxt.TextFrame.TextRange.Text =trimText(portfolioName,18);
						shapetxt.TextFrame.TextRange.Font.Color.RGB ='16579836';
						shapetxt.TextFrame.TextRange.Font.Size = 14;
						shapetxt.TextFrame.MarginTop = 3;
						shapetxt.TextFrame.MarginRight = 25;
						shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
						top += 25;
						
						var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.65), top, Math.round(sWidth/5), Math.round(sHeight/3));
						shapetxt.TextFrame.TextRange.Text =trimText(projectName,16);
						shapetxt.TextFrame.TextRange.Font.Size = 12;
						shapetxt.TextFrame.MarginTop = 3;
						shapetxt.TextFrame.MarginRight = 25;
						shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
						//top += 30;
						
						var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.25)+5, top, Math.round(sWidth/5)-4, Math.round(sHeight/3));
						shapetxt.TextFrame.TextRange.Text =trimText(versionName,22);
						shapetxt.TextFrame.TextRange.Font.Size = 12;
						shapetxt.TextFrame.MarginTop = 3;
						shapetxt.TextFrame.MarginRight = 25;
						shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
						top += 25;

					}
					else
					{
						versionName=ppt.SortedjsonArrOfProjects[i].versionName;
						projectName=ppt.SortedjsonArrOfProjects[i].projectName;
						
						var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.65), top, Math.round(sWidth/5), Math.round(sHeight/3));
						shapetxt.TextFrame.TextRange.Text =trimText(projectName,16);
						shapetxt.TextFrame.TextRange.Font.Size = 12;
						shapetxt.TextFrame.MarginTop = 3;
						shapetxt.TextFrame.MarginRight = 25;
						shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
						//top += 30;
						
						var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.25)+5, top, Math.round(sWidth/5)-4, Math.round(sHeight/3));
						shapetxt.TextFrame.TextRange.Text=trimText(versionName,22);
						shapetxt.TextFrame.TextRange.Font.Size = 12;
						shapetxt.TextFrame.MarginTop = 3;
						shapetxt.TextFrame.MarginRight = 25;
						shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
						top += 25;
					}
			   
                  }
					
			//});
			
        }
        else//if Portfolio is Off
        {
		   var shape = slide1.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/3), Math.round(sWidth/2), Math.round(sHeight/1.5));
		   shape.Fill.ForeColor.RGB = '14277081'; //Gray
		   shape.Line.visible=0;

		   
	         ppt.prjArray.length = 0;
	         //ppt.arrVersion.length = 0;
				
			//added by Mohini for all checked project should export DT:18-03-2014
			var top = Math.round(sHeight/3);
			for(var i=0;i<ppt.arrofProjectName.length;i++)
			{
			    /*Commented for version portfolio change
			    ppt.prjArray.push(ppt.SortedjsonArrOfProjects[i].projectName);	
			    ppt.arrVersion.push(ppt.SortedjsonArrOfProjects[i].versionName);*/
			    ppt.prjArray.push(ppt.arrofProjectName[i].projectName);
			    
				//var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.65)-20, top, Math.round(sWidth/3)-50, Math.round(sHeight/3)+10);
				var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/2), top, Math.round(sWidth/2), Math.round(sHeight/2.5));
				shapetxt.Fill.ForeColor.RGB = '11250603';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.arrofProjectName[i].projectName.toString(),12);
				shapetxt.TextFrame.TextRange.Font.Size = 16;
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 30;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				top += 35;
				
				/*//var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.65)+250, top, Math.round(sWidth/3)-190, Math.round(sHeight/3)+10);
				var shapetxt = slide1.shapes.AddTextbox(1, Math.round(sWidth/1.25)+5, top, Math.round(sWidth/5)-4, Math.round(sHeight/3));
				shapetxt.Fill.ForeColor.RGB = '11250603';
				shapetxt.TextFrame.TextRange.Text =trimText(ppt.SortedjsonArrOfProjects[i].versionName.toString(),10);
				shapetxt.TextFrame.TextRange.Font.Size = 16;
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 30;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				top += 35;*/

			}

        }
		
		
		var ctrlRange = document.body.createControlRange();
		var img = document.createElement("img");
		img.src = report.SiteURL +'/css/images/logo.jpg'; //obj.image;
		document.body.appendChild(img);
       	ctrlRange.add(img);
       	ctrlRange.execCommand('Copy');
		for (var i = 0; i < 2; i++) {
			try {
				var shape = slide1.Shapes.PasteSpecial(8);
				shape.Left = 0;
				shape.Top = sHeight - 50;
				shape.Width = 50;
				shape.Height = 50;
				break;
			} catch (e) {
				try {
				var shape = slide1.Shapes.PasteSpecial(1);
				shape.Left = 0;
				shape.Top = sHeight - 50;
				shape.Width = 50;
				shape.Height = 50;
				break;
				} catch(e) { }
			}
		}
       	document.body.removeChild(img);

		if(report2.pptResetFlag == 1)
		{
			ppt.pptPieChartArray.length = 0;
			ppt.pptProjectCheckForCons();
			var slide = pres.Slides.Add(2, 2);
			ppt.exportPieChartToPPT(slide);
			ppt.fillSlide1(pres,slide);
			slide.Shapes(2).Delete();
			slide.Shapes(1).Delete();
		}
		else
		{
			for(var s=0; s<weekStartDate.length; s++)
			{
				ppt.pptPassCnt = 0;
				ppt.pptFailCnt = 0;
				ppt.pptNotCompletedCnt = 0;
				ppt.pptTotal = 0;
				ppt.pptExecuted = 0;
				ppt.pptActiveTesters = 0;
				ppt.pptPieChartArray.length = 0;
				ppt.pptBarChartArray.length = 0;	
	
				var min = weekStartDate[s];
				var max = weekEndDate[s];
				
				if(max != undefined)
				{
					min.setHours("00");
		            min.setMinutes("00");
		            min.setSeconds("00");
				}
				if(max != undefined)
				{
					max.setHours("23");
					max.setMinutes("59");
					max.setSeconds("59");
				}
				ppt.pptpieDataWithExecForPIDs = [];
				ppt.pptallProjectIDsWithExcec = [];
				ppt.pptExecTSandTesterCountForProjectIDs = [];
				ppt.prjArray1 = [];
				ppt.arrVersion1=[];//added by Mohini
	
				ppt.fillPPTData(min,max);
				ppt.fillSlide(pres,s,min,max);
				
				
			}
		}
		slide1.Shapes(2).Delete();
		slide1.Shapes(1).Delete();
		try{
			pres.SaveAs(dest);
		}
		catch(e){}
		ppt.fileNameArr.push(fileName);
		myApp.Presentations.Open(dest);
		//myApp.ActiveWindow.View.Zoom = 80;
		Main.hideLoading();
	},
	alertBox:function(msg){
		$("#divPPTAlert").html(msg);
		$('#divPPTAlert').dialog({height: 150,modal: true, buttons: { "Ok":function() { $(this).dialog("close");}} });
	},

	exportPieChartToPPT:function(slide)
	{
		if(isNaN(ppt.pptPieChartArray[0]))
		{
			var shapetxt = slide.shapes.AddTextbox(1, 30, 150, 200, 150);
			//shapetxt.TextFrame.TextRange.Text = "No 'Test Step' is available in selected 'Date Filter' criteria."; //"No Test Steps Available";
			shapetxt.TextFrame.TextRange.Text = "No '"+report.gConfigTestStep+"' is available in selected 'Date Filter' criteria."; //"No Test Steps Available";//Added by Mohini for Resource File(Date:25-02-2014)
			shapetxt.TextFrame.TextRange.Font.Size = '15';
			shapetxt.TextFrame.TextRange.Font.Bold = true;
		}
		else
		{
			var data = new Array();
			var expVal = new Array();
			var expTitle = new Array();
			
			expVal.push(ppt.pptPieChartArray[0]);
			expVal.push(ppt.pptPieChartArray[1]);
			expVal.push(ppt.pptPieChartArray[2]);
			
			expTitle.push("Pass");
			expTitle.push("Not Completed");
			expTitle.push("Fail");
			
			data.push({data : expVal, title : expTitle});
	
			var xlApp = new ActiveXObject("Excel.Application");
			xlApp.DisplayAlerts = false;
			var wsht = xlApp.Workbooks.Add().Worksheets.Add();
			var maxCol = 2;
	
			for (var i = 0; i < 3; i++) {
				wsht.Cells(i + 2, 1).Value = data[0].title[i];  
				wsht.Cells(i + 2, 2).Value = data[0].data[i];   
			}
			//Code added for removing exceptions for Office 10
			var chart = '';
			try
			{
				chart = wsht.Shapes.AddChart2();
			}
			catch(ex)
			{
				chart = wsht.Shapes.AddChart();
			}
			
			chart.Width = 300; //rect.Width;
			chart.Height = 300; //rect.Height;
			chart.Chart.ChartType = 5; //PPT.PIE;
			chart.Chart.HasLegend = false;
			chart.Chart.HasTitle = false;
			chart.Chart.ChartArea.Format.TextFrame2.TextRange.Font.Fill.ForeColor.RGB = 0;
				
			var ser = chart.Chart.SeriesCollection(1);
			ser.Explosion = 2;
			ser.HasDataLabels = true;
			var cols = [2263842,2474495,238];
	
			ser.Points(0 + 1).Format.Fill.ForeColor.RGB = cols[0 % cols.length];
			ser.Points(1 + 1).Format.Fill.ForeColor.RGB = cols[1 % cols.length];
			ser.Points(2 + 1).Format.Fill.ForeColor.RGB = cols[2 % cols.length];
			
			chart.Copy();
	
			var copChr = slide.Shapes.Paste().Item(1);
			copChr.Top = 50;
			copChr.Left = 50;
			xlApp.DisplayAlerts = false;
			wsht.Application.Quit();
			xlApp.Quit();
		}
	},
	
	exportBarChartToPPT:function(slide,sHeight,sWidth)
	{
		if(isNaN(ppt.pptBarChartArray[0]))
		{
			/*var shapetxt = slide.shapes.AddTextbox(1, 30, (sHeight-Math.round(sHeight/5))+30, Math.round(sWidth/2), 150);
			shapetxt.TextFrame.TextRange.Text = "No Testing is done in selected 'Date Filter' criteria."; //"No Test Steps Available";
			shapetxt.TextFrame.TextRange.Font.Size = '15';*/
			//shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215';
			var shape = slide.shapes.AddShape(1, 0, sHeight-Math.round(sHeight/5), Math.round(sWidth/2), Math.round(sHeight/5));
			shape.Fill.ForeColor.RGB = '13464600'; // blue(Executed)
			shape.Line.visible=0;

			var shapetxt = slide.shapes.AddTextbox(1, 30, (sHeight-Math.round(sHeight/5))+30, Math.round(sWidth/2), 150);
			shapetxt.TextFrame.TextRange.Text = "No Testing is done in selected 'Date Filter' criteria."; //"No Testing done";
			shapetxt.TextFrame.TextRange.Font.Size = '15';
			shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215';
		}
		else
		{
			var data = new Array();
			var expVal = new Array();
			var expTitle = new Array();
			expVal.push(ppt.pptBarChartArray[0]);
			
			if(ppt.pptBarChartArray[0] != 0)
			{
				expTitle.push("Executed");
				data.push({data : expVal, title : expTitle});
				var xlApp = new ActiveXObject("Excel.Application");
				xlApp.DisplayAlerts = false;
				var wsht = xlApp.Workbooks.Add().Worksheets.Add();
				var maxCol = 2;
		
				wsht.Cells(2, 1).Value = data[0].title[0];  //data[i].label;
				wsht.Cells(2, 2).Value = data[0].data[0];   //data[i].value;
				
				//Code added for removing exceptions for Office 10
				var chart = '';
				try
				{
					chart = wsht.Shapes.AddChart2();
				}
				catch(ex)
				{
					chart = wsht.Shapes.AddChart();
				}
				
				chart.Width = 300; //rect.Width;
				chart.Height = 100; //rect.Height;
				chart.Chart.ChartType = 58; //PPT.PIE;
				chart.Chart.HasLegend = false;
				chart.Chart.HasTitle = false;
				chart.Chart.ChartArea.Format.TextFrame2.TextRange.Font.Fill.ForeColor.RGB = 0;
					
				var ser = chart.Chart.SeriesCollection(1);
				//ser.Explosion = 7;
				ser.HasDataLabels = true;
				//change colors:
				var cols = [13464600];
				ser.Points(0 + 1).Format.Fill.ForeColor.RGB = cols[0 % cols.length];
				
				chart.Copy();
		
				var copChr = slide.Shapes.Paste().Item(1);
				copChr.Top = 400;
				copChr.Left = 20;
				xlApp.DisplayAlerts = false;
				wsht.Application.Quit();
				xlApp.Quit();
			}
			else
			{
				var shape = slide.shapes.AddShape(1, 0, sHeight-Math.round(sHeight/5), Math.round(sWidth/2), Math.round(sHeight/5));
				shape.Fill.ForeColor.RGB = '13464600'; // blue(Executed)
				shape.Line.visible=0;
				if(ppt.pptExecuted > 0)
				{
					var shapetxt = slide.shapes.AddTextbox(1, 30, (sHeight-Math.round(sHeight/5))+30, Math.round(sWidth/2)-50, 150);
					shapetxt.TextFrame.TextRange.Text = "As 'Executed' count is very less compared to total, no bar chart is generated!"; 
					shapetxt.TextFrame.TextRange.Font.Size = '15';
					shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215';
				}
				else
				{
					var shapetxt = slide.shapes.AddTextbox(1, 30, (sHeight-Math.round(sHeight/5))+30, Math.round(sWidth/2), 150);
					shapetxt.TextFrame.TextRange.Text = "No Testing is done in selected 'Date Filter' criteria."; 
					shapetxt.TextFrame.TextRange.Font.Size = '15';
					shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215';
				}
			}
		}
	},
	fillPPTData:function(min,max)
	{
		var showFlagDate = 0;
		for(var i=0;i<report.projectItems.length;i++)
		{
			var arr = report.projectItems[i]['startDate'].split(' ');
			var t = arr[1].split(':');
			var stDate = new Date(arr[0].replace(/-/g, '/'));
			stDate.setHours(t[0]);
			stDate.setMinutes(t[1]);
			stDate.setSeconds(t[2]);
			
			var arr = report.projectItems[i]['endDate'].split(' ');
			var t = arr[1].split(':');
			var enDate = new Date(arr[0].replace(/-/g, '/'));
			enDate.setHours(t[0]);
			enDate.setMinutes(t[1]);
			enDate.setSeconds(t[2]);

			showFlagDate = 0;
			
			if($("#setFilter").val() == "Dates")
			{
				if((min <= stDate  && max >= stDate ) || (enDate >= min && enDate <= max) || (stDate <= min && enDate >= max))
					showFlagDate = 1;
			}
			else
			{
				if((min >= stDate && min <= enDate) || (enDate >= max && stDate <= max))
					showFlagDate = 1;	
			}
			if(showFlagDate == 1)
			{
				if(report.childItemsForPID[report.projectItems[i]['ID']] != undefined && report.childItemsForPID[report.projectItems[i]['ID']] != "N/A")	
				{
					var countPending = 0; // S 14Nov
					var countPass =0;
				    var countFail =0;
				    var countNC =0;
				    var countExecuted = 0;
				    var temp=0;
				    var total = 0;
				    var testersPerformedTesting = [];
					var testCaseItems2 = report.childItemsForPID[report.projectItems[i]['ID']];
					for(var xi=0;xi<(testCaseItems2.length);xi++)
		            {  
			           var max1 = max; 
					   var min1 = min;
					   if (testCaseItems2[xi]['DateTimeForFailedStep'] != undefined)
					       var compDate = new Date(testCaseItems2[xi]['DateTimeForFailedStep'].replace("- ", ""));
					   else
					       //var compDate = new Date((testCaseItems2[xi]['Modified']).replace(/\-/g,'/'));
					       var compDate = new Date((testCaseItems2[xi]['Modified']));
			           if(compDate <= max1 && compDate >= min1 && testCaseItems2[xi]['Modified']!=testCaseItems2[xi]['Created'])
				       {
					    	if(testCaseItems2[xi]['Pending'] == undefined)
					    		countNC++;
					    	else
					    	{
						        switch(testCaseItems2[xi]['Pending']) // S 14Nov
						        { 
							         case 'Pass' : 
							         	  countPass++
							              countExecuted++;
							              if($.inArray(testCaseItems2[xi]['SPUserID'],testersPerformedTesting) == -1)
						              		testersPerformedTesting.push(testCaseItems2[xi]['SPUserID']);
							              break;
							         case 'Fail' : 
							              countFail++;
							              countExecuted++;
							               if($.inArray(testCaseItems2[xi]['SPUserID'],testersPerformedTesting) == -1)
						              		 testersPerformedTesting.push(testCaseItems2[xi]['SPUserID']);
							              break;     
							         case 'Not Completed' : 
							              countNC++;
							              break;
							         case 'Pending' :
							         	  countNC++;
							         	  break;
						        }
						    }
				       } 
					    else
					    {
				           if(testCaseItems2[xi]['Pending'] == undefined)
				           		countNC++;
				           else
				           {
						       switch(testCaseItems2[xi]['Pending']) // S 14Nov
						       { 
						         case 'Pass' : 
						              countPass++;
						              break;
						         case 'Fail' : 
						              countFail++;
						              break;     
						         case 'Not Completed' : 
						              countNC++;
						              break;
						         case 'Pending' :
						         	  countNC++;
						         	  break;
						       }
					       }
					    }  
		            }
		             onLoadpdata = new Array();
		             total=countPass+countFail+countNC+countPending;  
		             
		             ppt.pptExecTSandTesterCountForProjectIDs[report.projectItems[i]['ID']] = total+","+countPass+","+countFail+","+countNC+","+countExecuted+","+countPending+","+testersPerformedTesting;
		             
		             var flagPendingRounded = false;
					 var flagPassRounded = false;
					 var flagFailRounded = false;
					 var flagNCRounded = false;
					 var flagExecutedRounded = false;
				     var temp1,temp2,temp3,temp4,temp5;
				     
				     temp1 = ((countPass/total)*100).toFixed(0);
				     if(((countPass/total)*100)!= temp1)
						flagPassRounded =true;
				
				     temp2 = ((countNC/total)*100).toFixed(0);
				  	 if(((countNC/total)*100)!= temp2)
						flagNCRounded  =true;
				  
				     temp3 = ((countFail/total)*100).toFixed(0);
				     if(((countFail/total)*100)!= temp3)
						flagFailRounded =true;
						
					 temp4 = ((countExecuted/total)*100).toFixed(0);
				     if(((countExecuted/total)*100)!= temp3)
						flagExecutedRounded =true;	
						
					 temp5 = ((countPending/total)*100).toFixed(0);
				     if(((countPending/total)*100)!= temp5)
						flagPendingRounded = true;
					
					 if(parseInt(temp1)+parseInt(temp2)+parseInt(temp3) > 100)
					 {
					     if(flagPassRounded)
					     	temp1 = Math.floor((countPass/total)*100);
					     else if(flagFailRounded)
					         temp3 = Math.floor((countFail/total)*100);
					     else if(flagNCRounded)
					          temp2 = Math.floor((countNC/total)*100);
					 } 
				     else if(parseInt(temp1)+parseInt(temp2)+parseInt(temp3) < 100)
				     {
				     	if(flagPassRounded)
					     	temp1 = Math.ceil((countPass/total)*100);
					     else if(flagFailRounded)
					        temp3 = Math.ceil((countFail/total)*100);
					     else if(flagNCRounded)
				 	        temp2 = Math.ceil((countNC/total)*100);
				 	}
				 	
				     onLoadpdata.push(temp1);
				     onLoadpdata.push(temp2);
				     onLoadpdata.push(temp3);
				     onLoadpdata.push(temp4);
				     onLoadpdata.push(temp5);
					 ppt.pptpieDataWithExecForPIDs[ report.projectItems[i]['ID'] ] = onLoadpdata;
					 
					 ppt.pptallProjectIDsWithExcec.push(report.projectItems[i]['ID']);
					 
					 if($.inArray(report.projectItems[i]['ID'],report2.arrprjChecked) !=-1)
					 {
					   ppt.prjArray1.push(report.projectItems[i]['projectName']);
					   
					   if(report.isPortfolioOn)//if portfolio is On
					   {
					       var ProjectVersion=report.projectItems[i].ProjectVersion==undefined || report.projectItems[i].ProjectVersion==null || report.projectItems[i].ProjectVersion==""?'Default '+report.gConfigVersion:report.projectItems[i].ProjectVersion;//for Version added by Mohini
					       ppt.arrVersion1.push(ProjectVersion);
                          // ppt.arrVersion1.push(report.projectItems[i]['ProjectVersion']);
					   }
					 }
					 
					 
				}
			}	
		}
		ppt.projectCheckForConsWithExcec();
	},
	
	projectCheckForConsWithExcec:function(pID)
	{
	
	    try
		{
			var pendingCnt = 0;
			var cntPrj = 0;
			var passCnt = 0;
			var notCompCnt = 0;
			var failCnt = 0;
			var execCount = 0;
			var avgCnt = 0;
			
			var totalTSPending = 0;
			var totalTSPass = 0;
			var totalTSFail = 0;
			var totalTSNC = 0;
			var totalTSExec = 0;
			var totalTS = 0;
			var totalSPIDs = new Array();

			for(var i=0;i<ppt.pptallProjectIDsWithExcec.length;i++)
			{
				if($.inArray(ppt.pptallProjectIDsWithExcec[i],report.removedPID) == -1)
				{
					var prjParams = ppt.pptpieDataWithExecForPIDs[ppt.pptallProjectIDsWithExcec[i]];
					if(prjParams != "-" && prjParams != undefined)
					{
						passCnt += parseInt(prjParams[0], 10); 
						notCompCnt += parseInt(prjParams[1], 10);
						failCnt += parseInt(prjParams[2], 10);
						execCount += parseInt(prjParams[3], 10);
						pendingCnt += parseInt(prjParams[4], 10);
						avgCnt++;
					}
					var prjParams = ppt.pptExecTSandTesterCountForProjectIDs[ppt.pptallProjectIDsWithExcec[i]];//Added for Test Step(s) Statistics(In execute mode))
					if(prjParams != "-" && prjParams != undefined)
					{
						prjParams = ppt.pptExecTSandTesterCountForProjectIDs[ppt.pptallProjectIDsWithExcec[i]].split(",");
						totalTS += parseInt(prjParams[0], 10); 
						totalTSPass += parseInt(prjParams[1], 10);	
						totalTSFail += parseInt(prjParams[2], 10);
						totalTSNC += parseInt(prjParams[3], 10);
						totalTSExec += parseInt(prjParams[4], 10);
						totalTSPending += parseInt(prjParams[5], 10);
						for(var mm=6;mm<prjParams.length;mm++)
						{
							if($.inArray(prjParams[mm],totalSPIDs) == -1 && prjParams[mm]!= "" && prjParams[mm] != undefined)
								totalSPIDs.push(prjParams[mm]);
						}
					}
				}
			}
			
			ppt.pptPassCnt = totalTSPass;
			ppt.pptFailCnt = totalTSFail;
			ppt.pptNotCompletedCnt = totalTSNC;
			ppt.pptTotal = totalTS;
			ppt.pptExecuted = totalTSExec;
			ppt.pptActiveTesters = totalSPIDs.length;
			
			var pieArray = [];
			pieArray[0] = passCnt/avgCnt;
			pieArray[1] = notCompCnt/avgCnt;
			pieArray[2] = failCnt/avgCnt;
			pieArray[3] = execCount/avgCnt;
			pieArray[4] = pendingCnt/avgCnt;
			
			if(pieArray[0] != undefined)
			{
				ppt.fillProjectConsPieWithExcec(pieArray);
			}
		}
		catch(e)
		{
			alert(e.message);	
		}	
	},
	
	fillProjectConsPieWithExcec:function(pieArray)
	{
		var totalPass = pieArray[0];
		var totalNotCompleted = pieArray[1];
		var totalFail = pieArray[2];
		var totalExecuted = pieArray[3];
		var totalPending = pieArray[4];
		
		var flagPendingRounded = false;
		var flagPassRounded = false;
		var flagFailRounded = false;
		var flagNCRounded = false;
		var flagExecutedRounded = false;
		var temp1,temp2,temp3,temp4,temp5;
		var total;
		 
		 total = totalPass + totalNotCompleted + totalFail+totalPending; 
		 
		 temp1 = ((totalPass/total)*100).toFixed(0);
		 if(((totalPass/total)*100)!= temp1)
			flagPassRounded =true;
		
		 temp2 = ((totalNotCompleted/total)*100).toFixed(0);
		 if(((totalNotCompleted/total)*100)!= temp2)
			flagNCRounded  = true;
		 
		 temp3 = ((totalFail/total)*100).toFixed(0);
		 if(((totalFail/total)*100)!= temp3)
			flagFailRounded = true;
		
		 if(totalExecuted < 1)
		 	temp4 = totalExecuted;
		 else
		 {
			temp4 = ((totalExecuted/total)*100).toFixed(0);
			if(((totalExecuted/total)*100)!= temp3)
				flagExecutedRounded = true;
		 }
		
		 temp5 = ((totalPending/total)*100).toFixed(0);
		 if(((totalPending/total)*100)!= temp5)
			flagPendingRounded = true;
		
		 if(parseInt(temp1)+parseInt(temp2)+parseInt(temp3) > 100)
		 {
		     if(flagPassRounded)
		     	temp1 = Math.floor((totalPass/total)*100);
		     else if(flagFailRounded)
		         temp3 = Math.floor((totalFail/total)*100);
		     else if(flagNCRounded)
		          temp2 = Math.floor((totalNotCompleted/total)*100);
		 } 
	     else if(parseInt(temp1)+parseInt(temp2)+parseInt(temp3) < 100)
	     {
	     	if(flagPassRounded)
		     	temp1 = Math.ceil((totalPass/total)*100);
		     else if(flagFailRounded)
		        temp3 = Math.ceil((totalFail/total)*100);
		     else if(flagNCRounded)
	 	        temp2 = Math.ceil((totalNotCompleted/total)*100);
	 	}
		
		ppt.pptPieChartArray.push(parseInt(temp1));	//Pass
		ppt.pptPieChartArray.push(parseInt(temp2));	//Not Completed
		ppt.pptPieChartArray.push(parseInt(temp3));	//Fail
		ppt.pptPieChartArray.push(parseInt(temp5));	//Pending
		if(temp4 < 1)
		{
			temp4 = Math.round(temp4*100)/100;
			ppt.pptBarChartArray.push(temp4);	//Executed
		}
		else
			ppt.pptBarChartArray.push(parseInt(temp4));	//Executed
	},
	
	/*fillSlide:function(pres,s,min,max)//old design
	{
		var sHeight = pres.PageSetup.SlideHeight;
		var sWidth = pres.PageSetup.SlideWidth;
	
		var index = s;
		var slide = pres.Slides.Add(index+2, 2);
		
		//code to add notes into slide 
		var a = slide.NotesPage.Shapes(2);
		//a.TextFrame.TextRange.Text = "1. Executed: Number of Test Steps tested/executed (with Pass or Fail Status) within the selected \'Date Filter\' criteria.   2. Active Testers: Number of Testers who has performed Testing with the selected \'Date Filter\' criteria.";
		a.TextFrame.TextRange.Text = "1. Executed: Number of "+report.gConfigTestStep+"s tested/executed (with Pass or Fail Status) within the selected \'Date Filter\' criteria.   2. Active "+ report.gConfigTester+"s: Number of "+ report.gConfigTester+"s who has performed Testing with the selected \'Date Filter\' criteria.";//Added by Mohini For Resource File(25-02-2014)
		
		//Code for slide 2 Export Text 
		if(ppt.dateDispFlag == 0)
			var dateText = ppt.monthName[min.getMonth()]+" "+min.getDate()+", "+min.getFullYear();
		else
			var dateText = ppt.monthName[min.getMonth()]+" "+min.getDate()+", "+min.getFullYear() +" - "+ ppt.monthName[max.getMonth()]+" "+max.getDate()+", "+max.getFullYear();
			
		var shapetxt = slide.shapes.AddTextbox(1, 0, 10, Math.round(sWidth/2), 50);
		shapetxt.TextFrame.TextRange.Text = ppt.reportHeading; //text; 
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 
			
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), 0, Math.round(sWidth/2), Math.round(sHeight/3)+60);
		shape.Fill.ForeColor.RGB = '15643136'; // blue
		shape.Line.visible=0;

		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), 0, Math.round(sWidth/2), 50);
		shapetxt.TextFrame.TextRange.Text = dateText ;
		shapetxt.TextFrame.TextRange.Font.Size = 30;
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 
		
		var top = 40;
		for(var i=0; i<ppt.prjArray1.length; i++)
		{
			var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), top, Math.round(sWidth/2), Math.round(sHeight/3));
			shapetxt.TextFrame.TextRange.Text = ppt.prjArray1[i];
			shapetxt.TextFrame.TextRange.Font.Size = 14;
			shapetxt.TextFrame.MarginTop = 5;
			shapetxt.TextFrame.MarginRight = 10;
			shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
			top += 18;
		}
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), Math.round(sHeight/3)+20, Math.round(sWidth/2), 50);
		//shapetxt.TextFrame.TextRange.Text = "Test Step(s) Statistics:";
		shapetxt.TextFrame.TextRange.Text = report.gConfigTestStep+"(s) Statistics:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 

		var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/3)+60, Math.round(sWidth/2), Math.round(sHeight/2)+30);
		shape.Fill.ForeColor.RGB = '14277081'; // gray
		shape.Line.visible=0;

		var top = Math.round(sHeight/3) + 60;
		var left = Math.round(sWidth/2);
		
		var shape = slide.shapes.AddShape(1, left+40, top+30, 15, 15);
		shape.Fill.ForeColor.RGB = '2263842'; //Green
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+25, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Pass:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+25, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptPassCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
		
		var shape = slide.shapes.AddShape(1, left+40, top+70, 15, 15);
		shape.Fill.ForeColor.RGB = '238'; //Red
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+65, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Fail:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+65, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptFailCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shape = slide.shapes.AddShape(1, left+40, top+110, 15, 15);
		shape.Fill.ForeColor.RGB = '2474495'; //orange
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+105, 150, 20);
		shapetxt.TextFrame.TextRange.Text = "Not Completed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+105, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptNotCompletedCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shape = slide.shapes.AddLine(left+40, top+140, left+360, top+140);
		shape.Line.DashStyle = 1;
		shape.Line.Weight = 2;
		shape.Line.ForeColor.RGB = '13224393'; //Gray

		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+150, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Total:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+150, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptTotal;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shape = slide.shapes.AddShape(1, left+40, top+200, 15, 15);
		shape.Fill.ForeColor.RGB = '13464600'; //blue(Executed)
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+195, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Executed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+195, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptExecuted;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+240, 150, 20);
		//shapetxt.TextFrame.TextRange.Text = "Active Testers:";
		shapetxt.TextFrame.TextRange.Text = "Active "+ report.gConfigTester+"s:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+240, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptActiveTesters;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		ppt.exportPieChartToPPT(slide);
		ppt.exportBarChartToPPT(slide,sHeight,sWidth);
		
		slide.Shapes(2).Delete();
		slide.Shapes(1).Delete();
	},*/
	fillSlide:function(pres,s,min,max)// when Portfolio is On and Off at both case it will get call with new design
	{
		var sHeight = pres.PageSetup.SlideHeight;
		var sWidth = pres.PageSetup.SlideWidth;
	
		var index = s;
		var slide = pres.Slides.Add(index+2, 2);
		
		/* code to add notes into slide */
		var a = slide.NotesPage.Shapes(2);
		//a.TextFrame.TextRange.Text = "1. Executed: Number of Test Steps tested/executed (with Pass or Fail Status) within the selected \'Date Filter\' criteria.   2. Active Testers: Number of Testers who has performed Testing with the selected \'Date Filter\' criteria.";
		a.TextFrame.TextRange.Text = "1. Executed: Number of "+report.gConfigTestStep+"s tested/executed (with Pass or Fail Status) within the selected \'Date Filter\' criteria.   2. Active "+ report.gConfigTester+"s: Number of "+ report.gConfigTester+"s who has performed Testing with the selected \'Date Filter\' criteria.";//Added by Mohini For Resource File(25-02-2014)
		
		/* Code for slide 2 Export Text */
		if(ppt.dateDispFlag == 0)
			var dateText = ppt.monthName[min.getMonth()]+" "+min.getDate()+", "+min.getFullYear();
		else
			var dateText = ppt.monthName[min.getMonth()]+" "+min.getDate()+", "+min.getFullYear() +" - "+ ppt.monthName[max.getMonth()]+" "+max.getDate()+", "+max.getFullYear();
			
		var shapetxt = slide.shapes.AddTextbox(1, 0, 10, Math.round(sWidth/2), 50);
		shapetxt.TextFrame.TextRange.Text = ppt.reportHeading; //text; 
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 
			
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), 0, Math.round(sWidth/2), Math.round(sHeight/1.5));
		shape.Fill.ForeColor.RGB = '15643136'; // blue
		shape.Line.visible=0;

		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), 0, Math.round(sWidth/2), 50);
		shapetxt.TextFrame.TextRange.Text = dateText ;
		shapetxt.TextFrame.TextRange.Font.Size = 30;
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 
		
		var top = 60;
		for(var i=0; i<ppt.prjArray1.length; i++)
		{
			if(report.isPortfolioOn)//if portfolio is On
            {
                var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.71), top, Math.round(sWidth/3.55), Math.round(sHeight/2.84));
				shapetxt .Fill.ForeColor.RGB = '13474304';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.prjArray1[i].toString(),24);
				shapetxt.TextFrame.TextRange.Font.Size = 14;
				shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 10;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

				var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.16)+1, top, Math.round(sWidth/7.3), Math.round(sHeight/2.8)-2);
				shapetxt .Fill.ForeColor.RGB = '13474304';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.arrVersion1[i].toString(),12);
				shapetxt.TextFrame.TextRange.Font.Size = 14;
				shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 10;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				top += 30;
			}
			else
			{
			    var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), top, Math.round(sWidth/2), Math.round(sHeight/3));
			    //var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.71), top, Math.round(sWidth/3.55), Math.round(sHeight/2.84));
				shapetxt .Fill.ForeColor.RGB = '13474304';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.prjArray1[i].toString(),24);
				shapetxt.TextFrame.TextRange.Font.Size = 14;
				shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 10;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				top += 30;
			}
			
		}
		
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), Math.round(sHeight/1.5), Math.round(sWidth/2), 60);
		shapetxt .Fill.ForeColor.RGB = '3881787'; //gray 23
		//shapetxt.TextFrame.TextRange.Text = "Test Step(s) Statistics:";
		shapetxt.TextFrame.TextRange.Text = report.gConfigTestStep+"(s) Statistics:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 

	    var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/1.38), Math.round(sWidth/4), Math.round(sHeight/5.25));
		shape.Fill.ForeColor.RGB = '14277081'; // gray
		shape.Line.visible=0;

		//var top = Math.round(sHeight/1.5) +40;
		var top = Math.round(sHeight/1.35);
		var left = Math.round(sWidth/2);
		
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.95)+1, top+15, 15, 15);
		shape.Fill.ForeColor.RGB = '2263842'; //Green
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.87), top+10, 60, 20);
		shapetxt.TextFrame.TextRange.Text = "Pass:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46), top+10, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptPassCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
		
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.95)+1, top+40, 15, 15);
		shape.Fill.ForeColor.RGB = '238'; //Red
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.87), top+35, 60, 20);
		shapetxt.TextFrame.TextRange.Text = "Fail:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46),  top+35, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptFailCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shape = slide.shapes.AddShape(1,Math.round(sWidth/1.95)+1, top+65, 15, 15);
		shape.Fill.ForeColor.RGB = '2474495'; //orange
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.87), top+60, 120, 20);
		shapetxt.TextFrame.TextRange.Text = "Not Completed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46), top+60, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptNotCompletedCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		/*var shape = slide.shapes.AddLine(left+40, top+140, left+360, top+140);
		shape.Line.DashStyle = 1;
		shape.Line.Weight = 2;
		shape.Line.ForeColor.RGB = '13224393'; //Gray*/
		
        var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/1.1)+3, Math.round(sWidth/4), Math.round(sHeight/11)-1);
        shape.Fill.ForeColor.RGB = '12434877'; // gray 74
		shape.Line.visible=0;

		var shapetxt = slide.shapes.AddTextbox(1,Math.round(sWidth/1.87), Math.round(sHeight/1.08)+2, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Total:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46),Math.round(sHeight/1.08)+2, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptTotal;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
		
        var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.33)-1, Math.round(sHeight/1.38), Math.round(sWidth/4), Math.round(sHeight/3.6));
        shape.Fill.ForeColor.RGB = '5526612'; // gray 33
		shape.Line.visible=0;

		var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.31), top+15, 15, 15);
		shape.Fill.ForeColor.RGB = '13464600'; //blue(Executed)
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.28), top+10, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Executed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.08), top+10, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptExecuted;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.28), top+45, 120, 20);
		//shapetxt.TextFrame.TextRange.Text = "Active Testers:";
		shapetxt.TextFrame.TextRange.Text = "Active "+ report.gConfigTester+"s:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1,Math.round(sWidth/1.08), top+45, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptActiveTesters;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		ppt.exportPieChartToPPT(slide);
		ppt.exportBarChartToPPT(slide,sHeight,sWidth);
		
		slide.Shapes(2).Delete();
		slide.Shapes(1).Delete();
	},
	
	fillSlide1:function(pres,slide)// when Portfolio is On and Off at both case it will get call with new design
	{
		var sHeight = pres.PageSetup.SlideHeight;
		var sWidth = pres.PageSetup.SlideWidth;

		/* code to add notes into slide*/ 
		var a = slide.NotesPage.Shapes(2);
		//a.TextFrame.TextRange.Text = "Active Testers: Number of Testers who has performed Testing with the selected \'Date Filter\' criteria.";
		a.TextFrame.TextRange.Text = "Active "+ report.gConfigTester+"s: Number of "+ report.gConfigTester+"s who has performed Testing with the selected \'Date Filter\' criteria.";//Added by Mohini for Resource File(Date:25-02-2014)
		/* Code for slide 2 Export Text*/
		var shapetxt = slide.shapes.AddTextbox(1, 0, 10, Math.round(sWidth/2), 50);
		shapetxt.TextFrame.TextRange.Text = ppt.reportHeading; //text; 
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 
			
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), 0, Math.round(sWidth/2), Math.round(sHeight/1.5));
		shape.Fill.ForeColor.RGB = '15643136'; // blue
		shape.Line.visible=0;
		
		var top = 40;
		for(var i=0; i<ppt.prjArray.length; i++)
		{
		    if(report.isPortfolioOn)//if portfolio is On
            {
				//var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2)+80, top, Math.round(sWidth/3)-50, Math.round(sHeight/3)+10);
				var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.71), top, Math.round(sWidth/3.55), Math.round(sHeight/2.84));
				shapetxt .Fill.ForeColor.RGB = '13474304';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.prjArray[i].toString(),24);
				shapetxt.TextFrame.TextRange.Font.Size = 14;
				shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 10;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				//top += 35;
				//var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.3)+90, top, Math.round(sWidth/3)-189, Math.round(sHeight/3)+10);
				var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.16)+1, top, Math.round(sWidth/7.3), Math.round(sHeight/2.8)-2);
				shapetxt .Fill.ForeColor.RGB = '13474304';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.arrVersion[i].toString(),12);
				shapetxt.TextFrame.TextRange.Font.Size = 14;
				shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 10;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				top += 30;
			}
			else
			{
                 var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), top, Math.round(sWidth/2), Math.round(sHeight/3));
				//var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.71), top, Math.round(sWidth/3.55), Math.round(sHeight/2.84));
				shapetxt .Fill.ForeColor.RGB = '13474304';
				shapetxt.TextFrame.TextRange.Text = trimText(ppt.prjArray[i].toString(),24);
				shapetxt.TextFrame.TextRange.Font.Size = 14;
				shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
				shapetxt.TextFrame.MarginTop = 5;
				shapetxt.TextFrame.MarginRight = 10;
				shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
				top += 30;
			}
			
		}

		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), Math.round(sHeight/1.5), Math.round(sWidth/2), 60);
		shapetxt .Fill.ForeColor.RGB = '3881787'; //gray 23
		//shapetxt.TextFrame.TextRange.Text = "Test Step(s) Statistics:";
		shapetxt.TextFrame.TextRange.Text = report.gConfigTestStep+"(s) Statistics:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 

		//var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/1.5)+31, Math.round(sWidth/4), Math.round(sHeight/3)-78);
	    var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/1.38), Math.round(sWidth/4), Math.round(sHeight/5.25));
		shape.Fill.ForeColor.RGB = '14277081'; // gray
		shape.Line.visible=0;
		
		
		//var top = Math.round(sHeight/1.5) +40;
		var top = Math.round(sHeight/1.35);
		var left = Math.round(sWidth/2);
		
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.95)+1, top+15, 15, 15);
		shape.Fill.ForeColor.RGB = '2263842'; //Green
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.87), top+10, 60, 20);
		shapetxt.TextFrame.TextRange.Text = "Pass:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46), top+10, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptPassCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
		
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.95)+1, top+40, 15, 15);
		shape.Fill.ForeColor.RGB = '238'; //Red
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.87), top+35, 60, 20);
		shapetxt.TextFrame.TextRange.Text = "Fail:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46),  top+35, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptFailCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shape = slide.shapes.AddShape(1,Math.round(sWidth/1.95)+1, top+65, 15, 15);
		shape.Fill.ForeColor.RGB = '2474495'; //orange
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.87), top+60, 120, 20);
		shapetxt.TextFrame.TextRange.Text = "Not Completed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46), top+60, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptNotCompletedCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		/*var shape = slide.shapes.AddLine(left+40, top+140, left+360, top+140);
		shape.Line.DashStyle = 1;
		shape.Line.Weight = 2;
		shape.Line.ForeColor.RGB = '13224393'; //Gray*/
		
        var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/1.1)+3, Math.round(sWidth/4), Math.round(sHeight/11)-1);
        shape.Fill.ForeColor.RGB = '12434877'; // gray 74
		shape.Line.visible=0;

		var shapetxt = slide.shapes.AddTextbox(1,Math.round(sWidth/1.87), Math.round(sHeight/1.08)+2, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Total:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.46),Math.round(sHeight/1.08)+2, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptTotal;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
		
        var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.33)-1, Math.round(sHeight/1.38), Math.round(sWidth/4), Math.round(sHeight/3.6));
        shape.Fill.ForeColor.RGB = '5526612'; // gray 33
		shape.Line.visible=0;

		var shape = slide.shapes.AddShape(1, Math.round(sWidth/1.31), top+15, 15, 15);
		shape.Fill.ForeColor.RGB = '13464600'; //blue(Executed)
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.28), top+10, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Executed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.08), top+10, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptExecuted;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;

		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/1.28), top+45, 120, 20);
		//shapetxt.TextFrame.TextRange.Text = "Active Testers:";
		shapetxt.TextFrame.TextRange.Text = "Active "+ report.gConfigTester+"s:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1,Math.round(sWidth/1.08), top+45, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptActiveTesters;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Color.RGB = '16777215'; //White
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;	
		ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
	},

	/*fillSlide1:function(pres,slide)//this is of Old Design
	{
		var sHeight = pres.PageSetup.SlideHeight;
		var sWidth = pres.PageSetup.SlideWidth;

		/* code to add notes into slide
		var a = slide.NotesPage.Shapes(2);
		//a.TextFrame.TextRange.Text = "Active Testers: Number of Testers who has performed Testing with the selected \'Date Filter\' criteria.";
		a.TextFrame.TextRange.Text = "Active "+ report.gConfigTester+"s: Number of "+ report.gConfigTester+"s who has performed Testing with the selected \'Date Filter\' criteria.";//Added by Mohini for Resource File(Date:25-02-2014)
		/* Code for slide 2 Export Text
		var shapetxt = slide.shapes.AddTextbox(1, 0, 10, Math.round(sWidth/2), 50);
		shapetxt.TextFrame.TextRange.Text = ppt.reportHeading; //text; 
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 
			
		var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), 0, Math.round(sWidth/2), Math.round(sHeight/3)+60);
		shape.Fill.ForeColor.RGB = '15643136'; // blue
		shape.Line.visible=0;
		
		var top = 40;
		for(var i=0; i<ppt.prjArray.length; i++)
		{
			var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), top, Math.round(sWidth/2), Math.round(sHeight/3));
			shapetxt.TextFrame.TextRange.Text = ppt.prjArray[i];
			shapetxt.TextFrame.TextRange.Font.Size = 14;
			shapetxt.TextFrame.MarginTop = 5;
			shapetxt.TextFrame.MarginRight = 10;
			shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3;
			top += 18;
		}

		var shapetxt = slide.shapes.AddTextbox(1, Math.round(sWidth/2), Math.round(sHeight/3)+20, Math.round(sWidth/2), 50);
		//shapetxt.TextFrame.TextRange.Text = "Test Step(s) Statistics:";
		shapetxt.TextFrame.TextRange.Text = report.gConfigTestStep+"(s) Statistics:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = 20;
		shapetxt.TextFrame.TextRange.ParagraphFormat.Alignment = 3; 

		var shape = slide.shapes.AddShape(1, Math.round(sWidth/2), Math.round(sHeight/3)+60, Math.round(sWidth/2), Math.round(sHeight/2)+30);
		shape.Fill.ForeColor.RGB = '14277081'; // gray
		shape.Line.visible=0;

		var top = Math.round(sHeight/3) + 60;
		var left = Math.round(sWidth/2);
		
		var shape = slide.shapes.AddShape(1, left+40, top+30, 15, 15);
		shape.Fill.ForeColor.RGB = '2263842'; //Green
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+25, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Pass:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+25, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptPassCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		
		var shape = slide.shapes.AddShape(1, left+40, top+70, 15, 15);
		shape.Fill.ForeColor.RGB = '238'; //Red
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+65, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Fail:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+65, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptFailCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';

		var shape = slide.shapes.AddShape(1, left+40, top+110, 15, 15);
		shape.Fill.ForeColor.RGB = '2474495'; //orange
		shape.Line.ForeColor.RGB = '16777215'; //White
		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+105, 150, 20);
		shapetxt.TextFrame.TextRange.Text = "Not Completed:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+105, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptNotCompletedCnt;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';

		var shape = slide.shapes.AddLine(left+40, top+140, left+360, top+140);
		shape.Line.DashStyle = 1;
		shape.Line.Weight = 2;
		shape.Line.ForeColor.RGB = '13224393'; //Gray

		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+150, 100, 20);
		shapetxt.TextFrame.TextRange.Text = "Total:";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+150, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptTotal;//"10";
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;

		var shapetxt = slide.shapes.AddTextbox(1, left+60, top+240, 150, 20);
		//shapetxt.TextFrame.TextRange.Text = "Active Testers:";
		shapetxt.TextFrame.TextRange.Text = "Active "+report.gConfigTester+"s:";//Added by Mohini for Resource File(Date:25-02-2014)
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		var shapetxt = slide.shapes.AddTextbox(1, left+290, top+240, 50, 20);
		shapetxt.TextFrame.TextRange.Text = ppt.pptActiveTesters;
		shapetxt.TextFrame.TextRange.Font.Size = '16';
		shapetxt.TextFrame.TextRange.Font.Bold = true;
		
		ppt.alertBox("Requested PPT file is exported successfully at 'C:\\Users\\"+ ppt.uname+"\\Desktop\\StatusReport' with filename as '"+ppt.fileNameArr[0]+"'");
	},*/
	
	FilesCount:function(folderPath)
    {
      var oFileSystem, oFile, filesCount;
      oFileSystem= new ActiveXObject("Scripting.FileSystemObject");
      oFile = oFileSystem.GetFolder(folderPath);
      filesCount = oFile.files.Count;
      return filesCount+1;
    },
	
	pptProjectCheckForCons:function(pID)
	{
		try
		{
			var cntPrj = 0;
			var passCnt = 0;
			var notCompCnt = 0;
			var failCnt = 0;
			var avgCnt = 0;
			
			var totalTSPass = 0;
			var totalTSFail = 0;
			var totalTSNC = 0;
			var totalTS = 0;
			var totalSPIDs = new Array();
			for(var i=0;i<report.allProjectIDs.length;i++)
			{
				if($.inArray(report.allProjectIDs[i],report.removedPID) == -1)
				{
					var prjParams = report.pieDataForProjectIDs[report.allProjectIDs[i]];
					if(prjParams != "-" && prjParams != undefined)
					{
						prjParams = prjParams.split(',');
						passCnt += parseInt(prjParams[0], 10);
						notCompCnt += parseInt(prjParams[1], 10);
						failCnt += parseInt(prjParams[2], 10);
						avgCnt++;
						
						var prjParams2 = report.tsandTesterCountForProjectIDs[report.allProjectIDs[i]]
						if(prjParams2 != undefined)
						{
							prjParams2 = prjParams2.split(',');
							totalTSPass += parseInt(prjParams2[1], 10);
							totalTSFail += parseInt(prjParams2[2], 10);
							totalTSNC += parseInt(prjParams2[3], 10);
							totalTS += parseInt(prjParams2[0], 10);
							for(var mm=4;mm<prjParams2.length;mm++)
							{
								if($.inArray(prjParams2[mm],totalSPIDs) == -1  && prjParams2[mm]!= "" && prjParams2[mm] != undefined)
									totalSPIDs.push(prjParams2[mm]);
							}
						}
					}
				}
			}
			
			ppt.pptPassCnt = totalTSPass;
			ppt.pptFailCnt = totalTSFail;
			ppt.pptNotCompletedCnt = totalTSNC;
			ppt.pptTotal = totalTS;
			//ppt.pptExecuted = totalTSExec;
			ppt.pptActiveTesters = totalSPIDs.length;

			var pieArray = [];
			pieArray[0] = passCnt/avgCnt;
			pieArray[1] = notCompCnt/avgCnt;
			pieArray[2] = failCnt/avgCnt;
			
			if(pieArray[0] != undefined)
			{
				ppt.pptFillProjectConsPie(pieArray);
			}
		}
		catch(e)
		{
			alert(e.message);	
		}	
	},
	pptFillProjectConsPie:function(pieArray)
	{
		var totalPass = pieArray[0];
		var totalNotCompleted = pieArray[1];
		var totalFail = pieArray[2];
		var flagPassRounded = false;
		var flagFailRounded = false;
		var flagNCRounded = false;
		var temp1,temp2,temp3;
		var total;
		 
		total = totalPass + totalNotCompleted + totalFail; 
		 
		temp1 = ((totalPass/total)*100).toFixed(0);
		 if(((totalPass/total)*100)!= temp1)
			flagPassRounded =true;
		
		 temp2 = ((totalNotCompleted/total)*100).toFixed(0);
		 if(((totalNotCompleted/total)*100)!= temp2)
			flagNCRounded  = true;
		 
		 temp3 = ((totalFail/total)*100).toFixed(0);
		 if(((totalFail/total)*100)!= temp3)
			flagFailRounded = true;
			
		 if(parseInt(temp1)+parseInt(temp2)+parseInt(temp3)> 100)
		 {
		     if(flagPassRounded)
		     	temp1 = Math.floor((totalPass/total)*100);
		     else if(flagFailRounded)
		        temp3 = Math.floor((totalFail/total)*100);
		     else if(flagNCRounded)
		        temp2 = Math.floor((totalNotCompleted/total)*100);
		 } 
		 else if(parseInt(temp1)+parseInt(temp2)+parseInt(temp3)< 100)
		 {
		 	if(flagPassRounded)
		     	temp1 = Math.ceil((totalPass/total)*100);
		     else if(flagFailRounded)
		        temp3 = Math.ceil((totalFail/total)*100);
		     else if(flagNCRounded)
		        temp2 = Math.ceil((totalNotCompleted/total)*100);
		 }		    	
		ppt.pptPieChartArray.push(parseInt(temp1));	//Pass
		ppt.pptPieChartArray.push(parseInt(temp2));	//Not Completed
		ppt.pptPieChartArray.push(parseInt(temp3));	//Fail
	}
}
