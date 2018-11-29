/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var QueryGridCount=0;
var totalResultTables=0;
var gConfigVersion = 'Version';


var Query={

    /*Globally accessible variables at application level*/
    QuerySet:[],
    QueryResultUi:'',
    QueryFlag:true,
    QueryGridCount:0,
    totalResultTables:0,
    flagForSelectCriteria:0,
    flagForInputValue:0,
    countFOrCriteriaAndInput:0,

    /****added by Mohini for resource file*****/
    arr:new Array(),
    /******Variable defined for resource file by Mohini*******/
    gConfigProject:'Project',
    gConfigVersion:'Version',
    gCongfigRole:'Role',
    gConfigTestPass:'Test Pass',
    gConfigTestStep:'Test Step',
    gConfigTestCase:'Test Case',
    gConfigTester:'Tester',
    gConfigStatus:'Status',
    gConfigLead:'Lead',
    gConfigQuery:'Query',
    gConfigAction:'Action',
    gConfigTestManager:'Test Manager',
    gConfigassTC:'Associated Test Case',
    gConfigassTP:'Associated Test Pass',
    gExpectedResult:'Expected Result',
    gActualResult:'Actual Result',
    gActualAttachments:'Actual Attachments',
    gStartDate:'Start Date',
    gEndDate:'End Date',
    valueOflblCriteria:'',
    valueOflblOperator:'',
    valueOflblValue:'',
    valueOflblClause:'',


    /*All common page initialisations*/
    init:function(){	

        /*******Added by mohini For resource file*********/
        if(resource.isConfig.toLowerCase()=='true')
        {
            Query.gConfigProject=resource.gPageSpecialTerms['Project']==undefined?'Project':resource.gPageSpecialTerms['Project'];
            Query.gConfigVersion=resource.gPageSpecialTerms['Version']==undefined?'Version':resource.gPageSpecialTerms['Version'];
            Query.gConfigTestPass=resource.gPageSpecialTerms['Test Pass']==undefined?'Test Pass':resource.gPageSpecialTerms['Test Pass'];
            Query.gConfigTestCase=resource.gPageSpecialTerms['Test Case']==undefined?'Test Case':resource.gPageSpecialTerms['Test Case'];
            Query.gConfigTestStep=resource.gPageSpecialTerms['Test Step']==undefined?'Test Step':resource.gPageSpecialTerms['Test Step'];
            Query.gConfigTester=resource.gPageSpecialTerms['Tester']==undefined?'Tester':resource.gPageSpecialTerms['Tester'];
            Query.gCongfigRole=resource.gPageSpecialTerms['Role']==undefined?'Role':resource.gPageSpecialTerms['Role'];
            Query.gConfigStatus=resource.gPageSpecialTerms['Status']==undefined?'Status':resource.gPageSpecialTerms['Status'];
            Query.gConfigLead=resource.gPageSpecialTerms['Lead']==undefined?'Lead':resource.gPageSpecialTerms['Lead'];
            Query.gConfigQuery=resource.gPageSpecialTerms['Query']==undefined?'Query':resource.gPageSpecialTerms['Query'];
            Query.gConfigTestManager=resource.gPageSpecialTerms['Test Manager']==undefined?'Test Manager':resource.gPageSpecialTerms['Test Manager'];
            Query.gConfigAction=resource.gPageSpecialTerms['Action']==undefined?'Action':resource.gPageSpecialTerms['Action'];
            Query.gConfigassTC=resource.gPageSpecialTerms['Associated Test Case']==undefined?'Associated Test Case':resource.gPageSpecialTerms['Associated Test Case'];
            Query.gConfigassTP=resource.gPageSpecialTerms['Associated Test Pass']==undefined?'Associated Test Pass':resource.gPageSpecialTerms['Associated Test Pass'];
            gConfigVersion = Query.gConfigVersion;
	
        }
	
        Query.valueOflblCriteria=$('#crit').html();
        Query.valueOflblOperator=$('#opt').html();
        Query.valueOflblValue=$('#val').html();
        Query.valueOflblClause=$('#clau').html();
    
        $('#ddlOp').html('<option selected="selected" id="selOpt">Select '+Query.valueOflblOperator+'</option>');
        $('#selectValue').html('<option value="Select Value" selected="selected">Select '+Query.valueOflblValue+'</option>'); 
   
   
        //For version option to be available in portfolio on mode only:SD
        var markUp='<option id="selCrit" value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>'
   
        if(isPortfolioOn)
            //R markUp+='<option id="version" value="Versions">'+Query.gConfigVersion+'</option>'
            markUp+='<option id="TP" value="TestPasses">'+Query.gConfigTestPass+'</option>'
        markUp+='<option id="TC" value="TestCases">'+Query.gConfigTestCase+'</option><option id="TS" value="TestSteps">'+ Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>'  
        //R markUp+='<option value="Name" >Free Text </option> <option value="AssignedTo"> Assigned to</option>'
        markUp+='<option value="AssignedTo"> Assigned to</option><option value="status">'+Query.gConfigStatus+'</option>'
        markUp+='<option value="Roles">'+Query.gCongfigRole+'</option>';
        //R markUp+='<option value="SavedQueries">Saved Queries</option>';
	      
        $("#changeCriteriaDrDo").html(markUp);
	     
        $("#btnAddQuery").val("Add "+Query.gConfigQuery);
        $("#btnremoveQuery").val("Remove "+Query.gConfigQuery);
        $("#saveQ").val("Save "+Query.gConfigQuery);
        /*************************************************************/
	      

        //$("#queryResults").html("");
        Query.setCriteriaDD();  
	
        Query.fillProjectDD(); 
		
        /*For Query Remove*/
        if(Query.QueryGridCount==0){
            //alert('rem');
            $('#removeQuery').hide();
        }
				
        $("ul li a:eq(3)").attr('class','selHeading');
	
        $("#queryResults").css("height", "auto");
        $("#queryResults").css("overflow", "auto");
	
        /*Adding query*/
        $("#addQuery").click(function (e) {						
            Query.addQuery();	
        });
	
        /*Remove Query*/
        $("#removeQuery").click(function (e) {			
            Query.removeQuery();	
        });

        /*Export Result*/
        $("#exportResult").click(function (e) {				
            Query.exportToExcel();				
        });
	
        /* On change event of project dropdown */ //Added by Rasika
        $("#projSelect").change(function(e){
				
		
            //To initialise the result grid		
            $("#queryPanelTab ").find("tr:gt(1)").remove();
            $("#changeCriteriaDrDo").val("Select Criteria");
            Query.changeCriteriaDrDo();
            Query.setCriteriaDD();
            $("#removeQuery").hide();		
            $("#queryResults").empty();
            $("#pagingDiv").empty();
            Query.QueryGridCount=0;
			  		
        });
	
        $("#clear").click(function (e) {		 
            //this.document.location.reload();	
		
            //To initialise the result grid		
            $("#queryPanelTab ").find("tr:gt(1)").remove();
            $("#changeCriteriaDrDo").val("Select Criteria");
            Query.changeCriteriaDrDo();
            Query.setCriteriaDD();
            $("#removeQuery").hide();			
            $("#queryResults").empty();
            $("#pagingDiv").empty();
            Query.QueryGridCount=0;

        });
	
    },
    QuerySetDisplay:new Array(),
    runQ:function()
    {
        //To initialise the result grid
        $("#queryResults").empty();
        $("#pagingDiv").empty();
	
        Query.QuerySetDisplay=[];
        Query.totalResultTables=0;
        Query.flagForSelectCriteria=0;
        Query.flagForInputValue=0;	 
        Query.countFOrCriteriaAndInput=0;
        Query.result='';
			
        for(var r=0;r<=Query.QueryGridCount;r++)
        {	
            Query.executeQuery(r);
		
        }
        Query.result +='/'+$("#projSelect").val();
	
        //var result=ServiceLayer.GetData("GetQueryDetails",Query.result);
        //var result=ServiceLayer.GetData("GetQueryDetailsForAND",Query.result);
        var result = ServiceLayer.GetData("GetQueryDetailsForAND" + "/" + Query.result, null, "Query");

        Query.QuerySetDisplay= result.lstProject ? $.merge( Query.QuerySetDisplay, result.lstProject ):Query.QuerySetDisplay;
	
        Query.QuerySetDisplay= result.lstTestPass? $.merge( Query.QuerySetDisplay, result.lstTestPass):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTestPassUI? $.merge( Query.QuerySetDisplay, result.lstTestPassUI):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTestCase? $.merge( Query.QuerySetDisplay, result.lstTestCase):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTestCaseUI? $.merge( Query.QuerySetDisplay, result.lstTestCaseUI):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTestStep? $.merge( Query.QuerySetDisplay, result.lstTestStep):Query.QuerySetDisplay;	
        Query.QuerySetDisplay= result.lstTestStepUI? $.merge( Query.QuerySetDisplay, result.lstTestStepUI):Query.QuerySetDisplay;
	
        Query.QuerySetDisplay= result.lstRoleTester? $.merge( Query.QuerySetDisplay, result.lstRoleTester):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstRoleTS? $.merge( Query.QuerySetDisplay, result.lstRoleTS):Query.QuerySetDisplay;
	
        Query.QuerySetDisplay= result.lstAssignPrjLead? $.merge( Query.QuerySetDisplay, result.lstAssignPrjLead):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstAssignedToTester? $.merge( Query.QuerySetDisplay, result.lstAssignedToTester):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstAssignedToTestMgr? $.merge( Query.QuerySetDisplay, result.lstAssignedToTestMgr):Query.QuerySetDisplay;
	
        Query.QuerySetDisplay= result.lstPrjByStatus? $.merge( Query.QuerySetDisplay, result.lstPrjByStatus):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTPByStatus? $.merge( Query.QuerySetDisplay, result.lstTPByStatus):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTcByStatus? $.merge( Query.QuerySetDisplay, result.lstTcByStatus):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTSStatus? $.merge( Query.QuerySetDisplay, result.lstTSStatus):Query.QuerySetDisplay;
	
        Query.QuerySetDisplay= result.lstPrjByID? $.merge( Query.QuerySetDisplay, result.lstPrjByID):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTPByID? $.merge( Query.QuerySetDisplay, result.lstTPByID):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTCByID? $.merge( Query.QuerySetDisplay, result.lstTCByID):Query.QuerySetDisplay;
        Query.QuerySetDisplay= result.lstTSByID? $.merge( Query.QuerySetDisplay, result.lstTSByID):Query.QuerySetDisplay;
			
        if(Query.QuerySetDisplay.length != 0)
        {
            Paging.initPaging();
            Paging.pagingList=Query.QuerySetDisplay;	

            /*Initial Page settings*/		 						
            Paging.PrevPaging = Paging.NextPaging;
            Paging.NextPaging += Paging.PagingSize;
            Paging.TotalPaging = Query.QuerySetDisplay.length;
		 	 
            var displayResult = Query.displayAllResult(Query.QuerySetDisplay,Paging.PrevPaging,Paging.NextPaging,Paging.PagingSize);
		 
            $('#queryResults').html(displayResult);
		 
            ///////////////////Added by Mangesh for image resizing
            $('#showTestStep').find('tr').each(function(i,v){
					
                $(v).find('td:eq(1)').find('img').attr('height','100');
                $(v).find('td:eq(1)').find('img').attr('width','150');
                $(v).find('td:eq(1)').find('img').css('height','100px').css('width','150px');
                $(v).find('td:eq(1)').find('table').css('width','170px');
					    	
                $(v).find('td:eq(7)').find('img').attr('height','100');
                $(v).find('td:eq(7)').find('img').attr('width','150');
                $(v).find('td:eq(7)').find('img').css('height','100px').css('width','150px');
                $(v).find('td:eq(7)').find('table').css('width','170px');
			    	
                $(v).find('td:eq(8)').find('img').attr('height','100');
                $(v).find('td:eq(8)').find('img').attr('width','150');
                $(v).find('td:eq(8)').find('img').css('height','100px').css('width','150px');
                $(v).find('td:eq(8)').find('table').css('width','170px');
			    	
		
            }); 
            //////////////////
		 
            /*Rendering paging display*/
            Paging.showPagination();
	
        }
        else
        {   
            if($("#projSelect").val()=='Select Project')
                Query.alertBox('Please select Project first.');
            else if(Query.flagForSelectCriteria == 1)
                Query.alertBox('Please select some '+Query.valueOflblCriteria);//Added by Mohini for resource file
            else if(  ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="UATItems") && ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="status")&& 				($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="TestPasses")&& ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="Roles") && 							$('.inputValue'+Query.QueryGridCount+'').val()==''	 )
                Query.alertBox2('Please enter some value.');      
            else
                Query.alertBox('No match result found.');
        
        }
	
		
        if($("#queryResults").find("a").length != 0) /* shilpa 16 apr 7664 */
            $("#queryResults").find("a").attr('target','_blank');
        Main.hideLoading();
    },
    //truptiAtt
    openAttachment: function (Attachment_Name,TestStepId) {

        //var url = ServiceLayer.serviceURL + '/Query/GetFileToDownload?attname=' + Attachment_Name + '&stepid=' + TestStepId + '&Url=' + ServiceLayer.appurl;
        //var win = window.open(url, "_blank");
        //win.focus();

    },

    displayAllResult:function(displaydata,prevPaging,nextPaging,pagingSize){

        var queryResultUi='';
        var countProject=0;
        var countTestPass=0;
        var countTestCase=0;
        var countTestStep=0;
        var countUITestPass=0;var countUITestCase=0;var countUITestStep=0;
        var countAssignedToTester=0;var countAssignedToTestMgr=0;var countAssignPrjLead=0;
        var countStatusProj=0;var countStatusTestPass=0;var countStatusTestCase=0;var countStatusTestStep=0;
        var countIDProj=0;var countIDTP=0;var countIDTC=0;var countIDTS=0;var countRoleTP=0;var countRoleTS=0;
				
        if(prevPaging<0){			  		  
            prevPaging=0;
            nextPaging=Paging.PagingSize;
            Paging.resetPagingFirst();			  	
        }
		
        for(var j=prevPaging;j<nextPaging;j++)
        {
            var ProjOrVerSelector = Query.gConfigProject;
            var ProjAndVer = Query.gConfigProject+'(s)';
            if(isPortfolioOn)
            {
                ProjOrVerSelector = Query.gConfigVersion
                ProjAndVer = Query.gConfigProject+'(s) and '+Query.gConfigVersion+'(s)';
            }	

		
            switch(displaydata[j]['sType'])
            {
                case 'Project_Type':
                    //To display title row of the table
                    if(countProject==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+':<b 									class="blk">'+Query.gConfigProject+'(s)-'+ProjOrVerSelector+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0">										<tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
                        if(isPortfolioOn)
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' 											'+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
                        else
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80">												<b>'+Query.gConfigStatus+'</b></td></tr>';
                    }
						
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sProject_Id+'</td><td style=\'width:600px;												\'>'+displaydata[j].sProject_Name+'</td>';	
                    if(isPortfolioOn)									
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sProject_Version+'</td><td style=\'width:130px;\'>'+displaydata[j].sVersion_Lead+'</td>										<td>'+displaydata[j].sProject_Status+'</td>';
                    else
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sVersion_Lead+'</td><td>'+displaydata[j].sProject_Status+'</td>';											countProject++;						
                    break;
												
                case 'TestPass_Type':
                    if(countTestPass==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk"> Name-'+Query.gConfigTestPass+'(es)</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="50"><b>#ID</b></td><td class="tblhd" width="130"><b>'+Query.gConfigTestPass+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="400"><b>Description</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td><td class="tblhd" width="100"><b>'+Query.gStartDate+'</b></td><td class="tblhd" width="100"><b>'+Query.gEndDate+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Test Cases</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Testers</b></td></tr>';		
                    }
                    queryResultUi+='<tr><td style=\'width:50px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestPassId+'</td><td style=\'width:130px;\'>'+displaydata[j].sTestPassName+'</td>';	
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+displaydata[j].stestpassStatus+'</td>';
                    var StartDate = displaydata[j].sStartDate.slice(0, 10); var EndDate = displaydata[j].sEndDate.slice(0, 10);
            				
                    queryResultUi+='<td style=\'width:400px;\'>'+displaydata[j].sTPDescription+'</td>';	            				
                    queryResultUi+='<td>'+displaydata[j].stestpassStatus+'</td>';	            			
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+StartDate+'</td><td>'+EndDate+'</td><td>'+displaydata[j].sTcCount+'</td>';	 
                    queryResultUi+='<td>'+displaydata[j].sTesterCount+'</td>';
						
                    countTestPass++;					
                    break;
						
                case 'TestCase_Type':
                    if(countTestCase==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk"> Name-'+Query.gConfigTestCase+'(s)'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestCase+' Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td><td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd"><b>'+Query.gCongfigRole+'</b></td><td class="tblhd" width="130"><b>'+Query.gConfigStatus+'</b></td></tr>';				
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestCaseId+'</td><td style=\'width:400px;\'>'+displaydata[j].sTestCaseName+'</td>';	
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td><td>'+displaydata[j].sTCStatus+'</td><td>'+displaydata[j].sTestPassName+'</td>';
                    queryResultUi+='<td>'+displaydata[j].sTestPassName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td><td>'+displaydata[j].sRoleName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTCStatus+'</td>';
                    countTestCase++;						
                    break;
						
                case 'TestStep_Type':
                    if(countTestStep==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Name-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="showTestStep" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestStep+' Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTester+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td 	class="tblhd" width="250"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="250"><b>'+Query.gConfigassTP+'</b></td> <td class="tblhd" width="200"><b>'+Query.gExpectedResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualAttachments+'</b></td> </tr>';
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestStepId+'</td><td style=\'width:550px;\'><span>'+displaydata[j].sTestStepName+'</span></td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sRoleName+'</td><td style=\'width:100px;\'>'+displaydata[j].sTestStepStatus+'</td><td style=\'width:200px;\'>'+displaydata[j].sTestCaseName+'</td><td>'+displaydata[j].sTestPassName+'</td>';
						
                    ///For AR, ER and attachments
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sExpected_Result+'</td>';
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sActual_Result+'</td>';
						
                    queryResultUi= queryResultUi+'<td style=\'width:180px;\'>';
						//trupti
                    if(displaydata[j].sAR_Attachment1_Name!="-" && displaydata[j].sAR_Attachment1_Name!="" && displaydata[j].sAR_Attachment1_Name!=null && displaydata[j].sAR_Attachment1_Name!=undefined)
                    {	                                       		   		 
                        queryResultUi = queryResultUi + '<a onclick=Query.openAttachment("' + displaydata[j].sAR_Attachment1_Name + '","' + displaydata[j].sTestStepId + '");><b><font color="#ff6500">' + displaydata[j].sAR_Attachment1_Name + '</font></b></a>';
                    }
                    if(displaydata[j].sAR_Attachment2_Name!="-" && displaydata[j].sAR_Attachment2_Name!="" && displaydata[j].sAR_Attachment2_Name!=null && displaydata[j].sAR_Attachment2_Name!=undefined)
                    {
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment2_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment2_Name +'</font></b></a>';			                      
                    }
                    if(displaydata[j].sAR_Attachment3_Name!="-" && displaydata[j].sAR_Attachment3_Name!="" && displaydata[j].sAR_Attachment3_Name!=null && displaydata[j].sAR_Attachment3_Name!=undefined)
                    {								             		   		 	             		   		 
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment3_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment3_Name +'</font></b></a>';			                     
                    }	
								
                    if(displaydata[j].sAR_Attachment1_Name=="-" && displaydata[j].sAR_Attachment2_Name=="-" && displaydata[j].sAR_Attachment3_Name=="-")					
                    {
                        queryResultUi+='-';
                    }
																	
                    queryResultUi= queryResultUi+'</td>';												
                    countTestStep++;						
                    break;
						
                case 'UITestPass_Type':
                    if(countTestPass==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items-'+Query.gConfigTestPass+'(es)</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="50"><b>#ID</b></td><td class="tblhd" width="130"><b>'+Query.gConfigTestPass+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="400"><b>Description</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td><td class="tblhd" width="100"><b>'+Query.gStartDate+'</b></td><td class="tblhd" width="100"><b>'+Query.gEndDate+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Test Cases</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Testers</b></td></tr>';		
                    }
                    queryResultUi+='<tr><td style=\'width:50px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestPassId+'</td><td style=\'width:130px;\'>'+displaydata[j].sTestPassName+'</td>';	
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+displaydata[j].stestpassStatus+'</td>';
						
                    var StartDate=  displaydata[j].sStartDate.slice(0,10);            var EndDate=  displaydata[j].sEndDate.slice(0,10);
                    //var sd = StartDate.split('-');                                    var ed = EndDate.split('-');
                    //StartDate= sd[1]+'-'+sd[0]+'-'+sd[2];							  EndDate= ed[1]+'-'+ed[0]+'-'+ed[2];
            				
                    queryResultUi+='<td style=\'width:400px;\'>'+displaydata[j].sTPDescription+'</td>';	            				
                    queryResultUi+='<td>'+displaydata[j].stestpassStatus+'</td>';	            			
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+StartDate+'</td><td>'+EndDate+'</td><td>'+displaydata[j].sTcCount+'</td>';	 
                    queryResultUi+='<td>'+displaydata[j].sTesterCount+'</td>';
						
                    countTestPass++;					
                    break;
                    ////////
						
                case 'UITestCase_Type':
                    if(countUITestCase==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items- '+Query.gConfigTestCase+'s'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestCase+' Name</b></td>';
                        //queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td> <td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td></tr>';
                        queryResultUi+='<td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td><td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd"><b>'+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></tr>';
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestCaseId+'</td><td style=\'width:600px;\'><span>'+displaydata[j].sTestCaseName+'</span></td>';
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td><td style=\'width:100px;\'>'+displaydata[j].sTCStatus+'</td>	<td>'+displaydata[j].sTestPassName+'</td>';
                    queryResultUi+='<td>'+displaydata[j].sTestPassName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td><td>'+displaydata[j].sRoleName+'</td>';
                    queryResultUi+='<td>'+displaydata[j].sTCStatus+'</td>';						
                    countUITestCase++;						
                    break;
						
                case 'UITestStep_Type':
                    if(countUITestStep==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">UAT Items- '+Query.gConfigAction+'s'+'</b></h2></td></tr></table><table id="showTestStep" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Test Step Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTester+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td 	class="tblhd" width="250"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="250"><b>'+Query.gConfigassTP+'</b></td> <td class="tblhd" width="200"><b>'+Query.gExpectedResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualAttachments+'</b></td> </tr>';
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestStepId+'</td><td style=\'width:550px;\'>	<span>'+displaydata[j].sTestStepName+'</span></td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sRoleName+'</td><td style=\'width:100px;\'>'+displaydata[j].sTestStepStatus+'</td><td style=\'width:200px;	\'>'+displaydata[j].sTestCaseName+'</td><td>'+displaydata[j].sTestPassName+'</td>';
						
                    ///For AR, ER and attachments
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sExpected_Result+'</td>';
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sActual_Result+'</td>';
						
                    queryResultUi= queryResultUi+'<td style=\'width:180px;\'>';
						
                    if(displaydata[j].sAR_Attachment1_Name!="-" && displaydata[j].sAR_Attachment1_Name!="" && displaydata[j].sAR_Attachment1_Name!=null && displaydata[j].sAR_Attachment1_Name!=undefined)
                    {	                                       		   		 
                        queryResultUi= queryResultUi+'<a href="'+displaydata[j].sAR_Attachment1_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment1_Name +'</font></b></a>';		                     
                    }
                    if(displaydata[j].sAR_Attachment2_Name!="-" && displaydata[j].sAR_Attachment2_Name!="" && displaydata[j].sAR_Attachment2_Name!=null && displaydata[j].sAR_Attachment2_Name!=undefined)
                    {
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment2_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment2_Name +'</font></b></a>';			                      
                    }
                    if(displaydata[j].sAR_Attachment3_Name!="-" && displaydata[j].sAR_Attachment3_Name!="" && displaydata[j].sAR_Attachment3_Name!=null && displaydata[j].sAR_Attachment3_Name!=undefined)
                    {								             		   		 	             		   		 
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment3_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment3_Name +'</font></b></a>';			                     
                    }	
								
                    if(displaydata[j].sAR_Attachment1_Name=="-" && displaydata[j].sAR_Attachment2_Name=="-" && displaydata[j].sAR_Attachment3_Name=="-")					
                    {
                        queryResultUi+='-';
                    }
																	
                    queryResultUi= queryResultUi+'</td>'; 
													
                    countUITestStep++;						
                    break;
						
                case 'AssignedToTester':
                    if(countAssignedToTester==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Assigned To.'+Query.gConfigTestPass+'(As '+Query.gConfigTester+')'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="130"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="180"><b>Area</b></td><td class="tblhd" width="180"><b>'+Query.gConfigTester+'</b></td> <td class="tblhd" width="150"><b>'+Query.gCongfigRole+'</b></td></tr>';
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTpId+'</td><td style=\'width:400px;\'>	<span>'+displaydata[j].sTpName+'</span></td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sStatusTester+'</td><td style=\'width:130px;\'>'+displaydata[j].sArea_Name+'</td><td style=\'width:130px;\'>'+displaydata[j].sTesterName+'</td><td style=\'width:130px;\'>'+displaydata[j].sRoleName+'</td>';
                    countAssignedToTester++;
                    break; 
						
                case 'AssignedToTestMgr':
                    if(countTestPass==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Assigned To.'+Query.gConfigTestPass+'(s) (As '+Query.gConfigTestManager+')'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="50"><b>#ID</b></td><td class="tblhd" width="130"><b>'+Query.gConfigTestPass+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="400"><b>Description</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td><td class="tblhd" width="100"><b>'+Query.gStartDate+'</b></td><td class="tblhd" width="100"><b>'+Query.gEndDate+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Test Cases</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Testers</b></td></tr>';		
                    }
                    queryResultUi+='<tr><td style=\'width:50px; padding-right:2px;text-align:center\'> '+displaydata[j].sTpId+'</td><td style=\'width:130px;\'>'+displaydata[j].sTpName+'</td>';	
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+displaydata[j].stestpassStatus+'</td>';
						
                    var StartDate=  displaydata[j].sStartDate.slice(0,10);            var EndDate=  displaydata[j].sEndDate.slice(0,10);
                    //var sd = StartDate.split('-');                                    var ed = EndDate.split('-');
                    //StartDate= sd[1]+'-'+sd[0]+'-'+sd[2];							  EndDate= ed[1]+'-'+ed[0]+'-'+ed[2];
            				
                    queryResultUi+='<td style=\'width:400px;\'>'+displaydata[j].sTpDescription+'</td>';	            				
                    queryResultUi+='<td>'+displaydata[j].sStatusTestMgr+'</td>';	            			
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestMgrName+'</td><td>'+StartDate+'</td><td>'+EndDate+'</td><td>'+displaydata[j].sTcCount+'</td>';	 
                    queryResultUi+='<td>'+displaydata[j].sTesterCount+'</td>';
						
                    countTestPass++;					
                    break;
												
                case 'AssignPrjLead_Type':
                    if(countAssignPrjLead==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Assigned To.'+ProjOrVerSelector+'(s)'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
                        if(isPortfolioOn)
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' 	'+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
                        else
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';	
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sProjID+'</td><td style=\'width:600px;	\'>'+displaydata[j].sProjName+'</td>';	
                    if(isPortfolioOn)	
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sProjVersion+'</td><td style=\'width:130px;\'>'+displaydata[j].sProjleadName+'</td>	<td>'+displaydata[j].sProjStatus+'</td>';
                    else
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sProjleadName+'</td><td>'+displaydata[j].sProjStatus+'</td>';countAssignPrjLead++;
                    break;
						
                case 'StatusPrj_Type':
                    if(countStatusProj==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+ProjOrVerSelector+'(s)'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr>	<td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+'</b></td>';
                        if(isPortfolioOn)
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigVersion+' 	'+Query.gConfigLead+'</b></td> <td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';		
                        else
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80">	<b>'+Query.gConfigStatus+'</b></td></tr>';
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sProject_Id+'</td><td style=\'width:600px;	\'>'+displaydata[j].sProject_Name+'</td>';	
                    if(isPortfolioOn)									
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sProject_Version+'</td><td style=\'width:130px;\'>'+displaydata[j].sVersion_Lead+'</td><td>'+displaydata[j].sProject_Status+'</td>';
                    else
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sVersion_Lead+'</td><td>'+displaydata[j].sProject_Status+'</td>';	
                    countStatusProj++;
                    break;
						
                case 'StatusTP_Type':
                    if(countTestPass==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+Query.gConfigTestPass+'(es)</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="50"><b>#ID</b></td><td class="tblhd" width="130"><b>'+Query.gConfigTestPass+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="400"><b>Description</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td><td class="tblhd" width="100"><b>'+Query.gStartDate+'</b></td><td class="tblhd" width="100"><b>'+Query.gEndDate+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Test Cases</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Testers</b></td></tr>';		
                    }
                    queryResultUi+='<tr><td style=\'width:50px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestPassId+'</td><td style=\'width:130px;\'>'+displaydata[j].sTestPassName+'</td>';	
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+displaydata[j].stestpassStatus+'</td>';
						
                    var StartDate=  displaydata[j].sStartDate.slice(0,10);            var EndDate=  displaydata[j].sEndDate.slice(0,10);
                    //var sd = StartDate.split('-');                                    var ed = EndDate.split('-');
                    //StartDate= sd[1]+'-'+sd[0]+'-'+sd[2];							  EndDate= ed[1]+'-'+ed[0]+'-'+ed[2];
            				
                    queryResultUi+='<td style=\'width:400px;\'>'+displaydata[j].sTPDescription+'</td>';	            				
                    queryResultUi+='<td>'+displaydata[j].stestpassStatus+'</td>';	            			
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+StartDate+'</td><td>'+EndDate+'</td><td>'+displaydata[j].sTcCount+'</td>';	 
                    queryResultUi+='<td>'+displaydata[j].sTesterCount+'</td>';
						
                    countTestPass++;					
                    break;
                    ///////////////						
												
                case 'StatusTestCase_Type':
                    if(countStatusTestCase==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+Query.gConfigTestCase+'(s)'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td 	class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestCase+' Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td><td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd"><b>'+Query.gCongfigRole+'</b></td><td 	class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';	
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestCaseId+'</td><td style=\'width:600px;\'>	<span>'+displaydata[j].sTestCaseName+'</span></td>';
                    queryResultUi+='<td>'+displaydata[j].sTestPassName+'</td><td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td><td>'+displaydata[j].sRoleName+'</td>';
                    queryResultUi+='<td>'+displaydata[j].sTCStatus+'</td>';
                    countStatusTestCase++;
                    break;
						
                case 'StatusTestStep_Type':
                    if(countStatusTestStep==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gConfigStatus+'-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="showTestStep" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestStep+' Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTester+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td 	class="tblhd" width="250"><b>'+Query.gConfigassTC+'</b></td><td class="tblhd" width="250"><b>'+Query.gConfigassTP+'</b></td> <td class="tblhd" width="200"><b>'+Query.gExpectedResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualAttachments+'</b></td> </tr>';	
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestStepId+'</td><td style=\'width:550px;\'>	<span>'+displaydata[j].sTestStepName+'</span></td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sRoleName+'</td><td style=\'width:100px;\'>'+displaydata[j].sTestStepStatus+'</td><td style=\'width:200px;	\'>'+displaydata[j].sTestCaseName+'</td><td>'+displaydata[j].sTestPassName+'</td>';						
						
                    ///For AR, ER and attachments
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sExpected_Result+'</td>';
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sActual_Result+'</td>';
						
                    queryResultUi= queryResultUi+'<td style=\'width:180px;\'>';
						
                    if(displaydata[j].sAR_Attachment1_Name!="-" && displaydata[j].sAR_Attachment1_Name!="" && displaydata[j].sAR_Attachment1_Name!=null && displaydata[j].sAR_Attachment1_Name!=undefined)
                    {	                                       		   		 
                        queryResultUi= queryResultUi+'<a href="'+displaydata[j].sAR_Attachment1_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment1_Name +'</font></b></a>';		                     
                    }
                    if(displaydata[j].sAR_Attachment2_Name!="-" && displaydata[j].sAR_Attachment2_Name!="" && displaydata[j].sAR_Attachment2_Name!=null && displaydata[j].sAR_Attachment2_Name!=undefined)
                    {
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment2_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment2_Name +'</font></b></a>';			                      
                    }
                    if(displaydata[j].sAR_Attachment3_Name!="-" && displaydata[j].sAR_Attachment3_Name!="" && displaydata[j].sAR_Attachment3_Name!=null && displaydata[j].sAR_Attachment3_Name!=undefined)
                    {								             		   		 	             		   		 
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment3_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment3_Name +'</font></b></a>';			                     
                    }	
								
                    if(displaydata[j].sAR_Attachment1_Name=="-" && displaydata[j].sAR_Attachment2_Name=="-" && displaydata[j].sAR_Attachment3_Name=="-")					
                    {
                        queryResultUi+='-';
                    }
																	
                    queryResultUi= queryResultUi+'</td>';  
						
                    countStatusTestStep++;
                    break;
						
                case 'IDProj_Type':
                    if(countIDProj==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b	class="blk">Id-Version(s)'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd 	center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigProject+' Name</b></td>';
                        if(isPortfolioOn)
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigVersion+'</b></td><td class="tblhd" width="160"><b>State</b></td> <td class="tblhd" width="80">	<b>'+Query.gConfigStatus+'</b></td></tr>';		
                        else
                            queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigProject+' '+Query.gConfigLead+'</b></td> <td class="tblhd" width="80">	<b>'+Query.gConfigStatus+'</b></td></tr>';
	
                    }							
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sProjID+'</td><td style=\'width:600px;	\'>'+displaydata[j].sProjName+'</td>';	
                    if(isPortfolioOn)									
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sProjVersion+'</td><td style=\'width:130px;\'>'+displaydata[j].sProjleadName+'</td>	<td>'+displaydata[j].sProjStatus+'</td>';
                    else
                        queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sProjleadName+'</td><td>'+displaydata[j].sProjStatus+'</td>';countIDProj++;
                    break;
				
                case 'IDTP_Type':
                    if(countTestPass==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Id-'+Query.gConfigTestPass+'(es)</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="50"><b>#ID</b></td><td class="tblhd" width="130"><b>'+Query.gConfigTestPass+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="400"><b>Description</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td class="tblhd" width="160"><b>'+Query.gConfigTestManager+'</b></td><td class="tblhd" width="100"><b>'+Query.gStartDate+'</b></td><td class="tblhd" width="100"><b>'+Query.gEndDate+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Test Cases</b></td>';
                        queryResultUi+='<td class="tblhd" width="80"><b>Total Testers</b></td></tr>';		
                    }
                    queryResultUi+='<tr><td style=\'width:50px; padding-right:2px;text-align:center\'> '+displaydata[j].sTPID+'</td><td style=\'width:130px;\'>'+displaydata[j].sTPName+'</td>';	
                    //queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestManagerName+'</td><td>'+displaydata[j].stestpassStatus+'</td>';
						
                    var StartDate=  displaydata[j].sStart_Date.slice(0,10);            var EndDate=  displaydata[j].sEnd_Date.slice(0,10);
                    //var sd = StartDate.split('-');                                    var ed = EndDate.split('-');
                    //StartDate= sd[1]+'-'+sd[0]+'-'+sd[2];							  EndDate= ed[1]+'-'+ed[0]+'-'+ed[2];
            				
                    queryResultUi+='<td style=\'width:400px;\'>'+displaydata[j].sTPDescription+'</td>';	            				
                    queryResultUi+='<td>'+displaydata[j].sTpstatus+'</td>';	            			
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTestMgr_Name+'</td><td>'+StartDate+'</td><td>'+EndDate+'</td><td>'+displaydata[j].sTcCount+'</td>';	 
                    queryResultUi+='<td>'+displaydata[j].sTesterCount+'</td>';
						
                    countTestPass++;					
                    break;
                    ///////////////	
						
                case 'IDTC_Type':
                    if(countIDTC==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b 	class="blk">Id-'+Query.gConfigTestCase+'(es)'+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd 	center" width="40"><b>#ID</b></td><td class="tblhd"><b>Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="200"><b>'+Query.gConfigassTP+'</b></td><td class="tblhd" width="160"><b>Associated '+Query.gConfigTester+'</b></td><td class="tblhd"><b>'+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';	
                    }												
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestCaseId+'</td><td style=\'width:600px;\'>	<span>'+displaydata[j].sTestCaseName+'</span></td>';
                    queryResultUi+='<td>'+displaydata[j].sTestPassName+'</td><td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td><td>'+displaydata[j].sRoleName+'</td>';
                    queryResultUi+='<td>'+displaydata[j].sTCStatus+'</td>';
                    countIDTC++;						
                    break;
						
                case 'IDTS_Type':
                    if(countIDTS==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">Id-'+Query.gConfigTestStep+'(s)'+'</b></h2></td></tr></table><table id="showTestStep" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTester+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td 	class="tblhd" width="250"><b>'+Query.gConfigassTC+'</b></td><td class="tblhd" width="250"><b>'+Query.gConfigassTP+'</b></td> <td class="tblhd" width="200"><b>'+Query.gExpectedResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualAttachments+'</b></td> </tr>';
                    }						
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestStepId+'</td><td style=\'width:600px;\'>	<span>'+displaydata[j].sTestStepName+'</span></td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sUserName+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sRoleName+'</td><td style=\'width:100px;\'>'+displaydata[j].sTestStepStatus+'</td><td style=\'width:200px;	\'>'+displaydata[j].sTestCaseName+'</td><td>'+displaydata[j].sTestPassName+'</td>';							
						
                    ///For AR, ER and attachments
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sExpected_Result+'</td>';
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sActual_Result+'</td>';
						
                    queryResultUi= queryResultUi+'<td style=\'width:180px;\'>';
						
                    if(displaydata[j].sAR_Attachment1_Name!="-" && displaydata[j].sAR_Attachment1_Name!="" && displaydata[j].sAR_Attachment1_Name!=null && displaydata[j].sAR_Attachment1_Name!=undefined)
                    {	                                       		   		 
                        queryResultUi= queryResultUi+'<a href="'+displaydata[j].sAR_Attachment1_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment1_Name +'</font></b></a>';		                     
                    }
                    if(displaydata[j].sAR_Attachment2_Name!="-" && displaydata[j].sAR_Attachment2_Name!="" && displaydata[j].sAR_Attachment2_Name!=null && displaydata[j].sAR_Attachment2_Name!=undefined)
                    {
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment2_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment2_Name +'</font></b></a>';			                      
                    }
                    if(displaydata[j].sAR_Attachment3_Name!="-" && displaydata[j].sAR_Attachment3_Name!="" && displaydata[j].sAR_Attachment3_Name!=null && displaydata[j].sAR_Attachment3_Name!=undefined)
                    {								             		   		 	             		   		 
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment3_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment3_Name +'</font></b></a>';			                     
                    }	
								
                    if(displaydata[j].sAR_Attachment1_Name=="-" && displaydata[j].sAR_Attachment2_Name=="-" && displaydata[j].sAR_Attachment3_Name=="-")					
                    {
                        queryResultUi+='-';
                    }
																	
                    queryResultUi= queryResultUi+'</td>'; 
						
                    countIDTS++;
                    break;
						
                case 'RoleTestManager_Type':
						
                    if(countRoleTP==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b 									class="blk">'+Query.gCongfigRole+'</b></h2></td></tr></table><table class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestPass+'</b></td>';					queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTester+'</b></td><td class="tblhd" width="160"><b>'+Query.gCongfigRole+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gStartDate+'</b></td><td class="tblhd" width="160"><b>'+Query.gEndDate+'</b></td>';										queryResultUi+='<td class="tblhd" width="80"><b>Count of Test Case</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td></tr>';								}
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTpId+'</td><td style=\'width:600px;										\'>'+displaydata[j].sTpName+'</td>';	
						
                    var StartDate=  displaydata[j].sStartDate.slice(0,10);            var EndDate=  displaydata[j].sEndDate.slice(0,10);
                    //var sd = StartDate.split('-');                                    var ed = EndDate.split('-');
                    //StartDate= sd[1]+'-'+sd[0]+'-'+sd[2];							  EndDate= ed[1]+'-'+ed[0]+'-'+ed[2];
	            									
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTesterName+'</td><td>'+displaydata[j].sRoleName+'</td><td>';						
                    queryResultUi+=StartDate+'</td><td>'+EndDate+'</td><td>'+displaydata[j].sTcCount+'</td><td>'+displaydata[j].sStatus+'</td>';
                    countRoleTP++;		
                    break;
						
                case 'RoleTester_Type':
                    if(countRoleTS==0)
                    {
                        queryResultUi+='<table class="gridDetails" cellspacing="0" ><tr><td colspan="6" class="bggray"><h2>'+Query.gConfigQuery+' '+ Query.valueOflblCriteria+': <b class="blk">'+Query.gCongfigRole+'</b></h2></td></tr></table><table id="showTestStep" class="gridDetails gridQueryData" cellspacing="0"><tr><td class="tblhd center" width="40"><b>#ID</b></td><td class="tblhd"><b>'+Query.gConfigTestStep+' Name</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>'+Query.gConfigTester+'</b></td>';
                        queryResultUi+='<td class="tblhd" width="160"><b>Associated '+Query.gCongfigRole+'</b></td><td class="tblhd" width="80"><b>'+Query.gConfigStatus+'</b></td><td 	class="tblhd" width="250"><b>'+Query.gConfigassTC+'</b></td>  <td class="tblhd" width="250"><b>'+Query.gConfigassTP+'</b></td> <td class="tblhd" width="200"><b>'+Query.gExpectedResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualResult+'</b></td> <td class="tblhd" width="200"><b>'+Query.gActualAttachments+'</b></td> </tr>';	
                    }
                    queryResultUi+='<tr><td style=\'width:75px; padding-right:2px;text-align:center\'> '+displaydata[j].sTestStepID+'</td><td style=\'width:600px;\'><span>'+displaydata[j].sTestStepName+'</span></td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sTester+'</td>';
                    queryResultUi+='<td style=\'width:130px;\'>'+displaydata[j].sRoleName+'</td><td style=\'width:100px;\'>'+displaydata[j].sStatus+'</td><td style=\'width:200px;	\'>'+displaydata[j].sTestCaseName+'</td><td>'+displaydata[j].sTestPassName+'</td>';	
						
                    ///For AR, ER and attachments
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sExpected_Result+'</td>';
                    queryResultUi+='<td style=\'width:180px;\'>'+displaydata[j].sActual_Result+'</td>';
						
                    queryResultUi= queryResultUi+'<td style=\'width:180px;\'>';
						
                    if(displaydata[j].sAR_Attachment1_Name!="-" && displaydata[j].sAR_Attachment1_Name!="" && displaydata[j].sAR_Attachment1_Name!=null && displaydata[j].sAR_Attachment1_Name!=undefined)
                    {	                                       		   		 
                        queryResultUi= queryResultUi+'<a href="'+displaydata[j].sAR_Attachment1_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment1_Name +'</font></b></a>';		                     
                    }
                    if(displaydata[j].sAR_Attachment2_Name!="-" && displaydata[j].sAR_Attachment2_Name!="" && displaydata[j].sAR_Attachment2_Name!=null && displaydata[j].sAR_Attachment2_Name!=undefined)
                    {
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment2_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment2_Name +'</font></b></a>';			                      
                    }
                    if(displaydata[j].sAR_Attachment3_Name!="-" && displaydata[j].sAR_Attachment3_Name!="" && displaydata[j].sAR_Attachment3_Name!=null && displaydata[j].sAR_Attachment3_Name!=undefined)
                    {								             		   		 	             		   		 
                        queryResultUi= queryResultUi+',<br/><a href="'+displaydata[j].sAR_Attachment3_URL+'" target="_blank"><b><font color="#ff6500">'+displaydata[j].sAR_Attachment3_Name +'</font></b></a>';			                     
                    }	
								
                    if(displaydata[j].sAR_Attachment1_Name=="-" && displaydata[j].sAR_Attachment2_Name=="-" && displaydata[j].sAR_Attachment3_Name=="-")					
                    {
                        queryResultUi+='-';
                    }
																	
                    queryResultUi= queryResultUi+'</td>';  
						
                    countRoleTS++;						
                    break;
							
            }			
            if(j==(displaydata.length-1))
            {       
                break;       	  			
            }      	  											

            if(j>Paging.TotalPaging)
            {	    	  		 	  		
                Paging.NextPaging=Paging.TotalPaging;
                Paging.showPagination();		  	   
                return false;
            }		
        }
        queryResultUi+='</table>';
        Paging.showPagination();			  
        return queryResultUi;

    },


    /*For binding of drop-downs*/
    setCriteriaDD:function(){
        try{
            $(".selectCriteria0").change(function (e) {
                Query.setValueText('selectCriteria0',0);	
	 
                var option= "";
                $(".selectCriteria0 option:selected").each(function () {
                    option+= $(this).text() + " ";
                });
        
                Query.fillValuesDD(option, 'selectValue0'); 
		              	 
                //alert('Handler for .change() called.'+str );
	  
            }).change();
        }catch(e){
        }
    },

    /*Remove Query*/
    removeQuery:function(){
        //alert('remove-'+ QueryGridCount);
		
        try{
            if(Query.QueryGridCount>0){		
                selectCriteriaId=Query.QueryGridCount;
                Query.QueryGridCount=Query.QueryGridCount-1;			
                var selectCriteriaClass='selectCriteria'+selectCriteriaId;
                var selectOperatorClass='selectOperator'+selectCriteriaId;
                var selectValueClass='selectValue'+selectCriteriaId;
                var inputValueClass='inputValue'+selectCriteriaId;
                var selectClauseClass='selectClause'+selectCriteriaId;	
                $('.'+selectCriteriaClass+'').remove();
                $('.'+selectOperatorClass+'').remove();
                $('.'+selectValueClass+'').remove();
                $('.'+inputValueClass+'').remove();
                $('.'+selectClauseClass+'').remove();
			
                var operatorDrDo='operatorDrDo2'+selectCriteriaId;
                $('#'+operatorDrDo+'').remove();
			
                //Added by HRW for for hiding remove query button
                if(Query.QueryGridCount == 0)
                    $('#removeQuery').hide();
				
                $('#queryPanelTab tbody tr:last').remove(); // Added by shilpa for bug 4874
            }	
        }
        catch(e){
	
        }	
    },
    /*Adding Query*/
    addQuery:function(){

        selectCriteriaId=Query.QueryGridCount+1;
        var selectCriteriaClass='selectCriteria'+selectCriteriaId;
        var selectOperatorClass='selectOperator'+selectCriteriaId;
        var selectValueClass='selectValue'+selectCriteriaId;
        var inputValueClass='inputValue'+selectCriteriaId;
        var selectClauseClass='selectClause'+selectCriteriaId;		
        var selctOperatorDrDo2='operatorDrDo2'+selectCriteriaId;
        var selectChangeCriteriaDrDo2='changeCriteriaDrDo2'+selectCriteriaId;
				
        /* For validation */
        if($("#projSelect").val()=='Select Project')
        {
            Query.alertBox('Please select Project first.');
            return;
        }		
        else if($('.selectCriteria'+Query.QueryGridCount+'').val()=='Select Criteria')
        {
            Query.alertBox('Please select some '+Query.valueOflblCriteria);
            return;
        }
        else if( ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="UATItems") && ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="status")&& ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="TestPasses")&& ($(".selectCriteria"+Query.QueryGridCount+" option:selected").val()!="Roles") && $('.inputValue'+Query.QueryGridCount+'').val()=='' )
        {
            Query.alertBox2('Please enter some value.');  			
            return;
        }
				
        if(Query.QueryGridCount<=7)
        {	
            var queryMarkup=Query.generateQueryView(selectCriteriaClass,selectOperatorClass,selectValueClass,selectClauseClass,inputValueClass,selctOperatorDrDo2,selectChangeCriteriaDrDo2 );			
            Query.QueryGridCount++;					
            $("#queryPanelTab").append(queryMarkup);		
            $('#addQuery').hide();	
            $('#removeQuery').hide();
            //Code Modified by swapnil kamle on 6/8/2012 to show the add and remove button on add query button click
            $('#addQuery').show();	
            $('#removeQuery').show();
            $('#queryPanelTab input').attr('maxlength','55'); // Added by shilpa to solve bug 2646
	  		         
            //$("."+selectClauseClass+" option:selected").text('');
				
            $("."+selectCriteriaClass+"").change(function (e) {
	
                Query.setValueText(selectCriteriaClass,selectCriteriaId,inputValueClass,selectValueClass);
		
                $('#addQuery').show();
                $('#removeQuery').show();					
			
                $("."+selectClauseClass+" option:selected").text('AND');   //Changed by Mangesh for only AND in dd
						
                var option= "";
                $("."+selectCriteriaClass+" option:selected").each(function () {
                    option+= $(this).text() + " ";
                });          	        
			         
                var a=selectChangeCriteriaDrDo2;
                var arr=a.split("changeCriteriaDrDo2");
                var count=arr[1];		             
                //Query.fillValuesDD(option, selectValueClass);
                Query.fillValueDropDown(option, selectValueClass,count);  
			         
            });      
        }
        else
            Query.alertBox2('You cannot add any criteria');		    
	
						
        //selectCriteriaId=Query.QueryGridCount+1;		

    },
    generateQueryView:function(selectCriteriaClass,selectOperatorClass,selectValueClass,selectClauseClass,inputValueClass,selctOperatorDrDo2,selectChangeCriteriaDrDo2){

        var value="";
        var count="";
        if(selectChangeCriteriaDrDo2=="changeCriteriaDrDo21")
        {
            value=$("#changeCriteriaDrDo").val();
            if(value=="UATItems" || value=="status")
                value =$(".selectValue0").val();
        }
        else
        {
            var a=selectChangeCriteriaDrDo2;
            var arr=a.split("changeCriteriaDrDo2");
            count=arr[1];
		
            value = $("#changeCriteriaDrDo2"+(count-1)+"").val();
            if(value=="UATItems" || value=="status")
                value =$(".ddlselectValue"+(count-1)+"").val();
        }
	
        switch(value)
        {
            case 'TestPasses':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'" 										onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
		    
                newQuery+='<option  value="TestCases">'+Query.gConfigTestCase+'</option><option 															value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>					<option value="AssignedTo">Assigned to</option><option value="status">'+Query.gConfigStatus+'</option><option 										value="Roles">'+Query.gCongfigRole+'</option>'
		 		
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option 				selected="selected">Select'+Query.valueOflblOperator+'</option></select></div> '
								
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select 					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value" selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 							'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';
                break;
			
            case 'TestCases':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'" 											onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">				<option  value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
			 
                newQuery+='<option value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">				ID</option><option value="AssignedTo"> Assigned to</option><option value="status">'+Query.gConfigStatus+'</option> <option 					value="Roles">'+Query.gCongfigRole+'</option>'
		
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option 				selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select 					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value" selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 							'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';
                break;
			
            case 'TestSteps':			
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'" 											onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
			 
                newQuery+='<option value="ID">ID</option><option value="AssignedTo"> Assigned to</option>			<option value="status">'+Query.gConfigStatus+'</option><option value="Roles">'+Query.gCongfigRole+'</option>'
					
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option 			selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
			
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select 				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select Value" 			selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small '+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';			
                break;
								
            case 'scenario': 
			
				
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  								onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2						+'\');"><option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
			    
                newQuery+='<option  value="TestPasses">'+Query.gConfigTestPass+'</option><option  															value="TestCases">'+Query.gConfigTestCase+'</option><option value="TestSteps">'+Query.gConfigTestStep+'</option><option 						value="UATItems">UAT Items</option><option value="ID">ID</option><option value="AssignedTo"> Assigned to</option>   <option 					value="status">'+Query.gConfigStatus+'</option><option value="Roles">'+Query.gCongfigRole+'</option>'
			     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
			   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value" selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 						'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
			   			   
                break;
			  
            case 'test':									
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  								onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2						+'\');">    <option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
			    
                newQuery+='<option  value="TestCases">'+Query.gConfigTestCase+'</option><option  																value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>					<option value="AssignedTo"> Assigned to</option>   <option value="status">'+Query.gConfigStatus+'</option><option 							value="Roles">'+Query.gCongfigRole+'</option>'
			     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
			   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 						'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;
			  
            case 'action':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  								onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2						+'\');">    <option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
			    
                newQuery+='<option value="TestSteps">'+Query.gConfigTestStep+'</option><option value="ID">ID</option><option value="AssignedTo"> 					Assigned to</option>   <option value="status">'+Query.gConfigStatus+'</option><option 														value="Roles">'+Query.gCongfigRole+'</option>'
			     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
			   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 						'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
		 
                break;
			
            case 'ID': 
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
	    
                newQuery+='<option  value="TestPasses">'+Query.gConfigTestPass+'</option><option  															value="TestCases">'+Query.gConfigTestCase+'</option>				<option value="TestSteps">'+Query.gConfigTestStep+'</option>				<option value="UATItems">UAT Items</option><option value="ID">ID</option><option value="AssignedTo"> Assigned to</option>   <option 				value="status">'+Query.gConfigStatus+'</option><option value="Roles">'+Query.gCongfigRole+'</option>'
	     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    				selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
	   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 						'+selectClauseClass+'">';
	   			
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;
	   			
            case 'AssignedTo': 
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  								onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2						+'\');">    <option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
	    
                newQuery+='<option  value="TestPasses">'+Query.gConfigTestPass+'</option><option  																value="TestCases">'+Query.gConfigTestCase+'</option><option  																				value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>   					<option value="status">'+Query.gConfigStatus+'</option><option value="Roles">'+Query.gCongfigRole+'</option>'
	     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
	   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 						'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;	
	   			
            case 'Roles': 
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  								onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2						+'\');">    <option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
	    
                newQuery+='<option  value="TestCases">'+Query.gConfigTestCase+'</option><option  																value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>   					<option value="AssignedTo"> Assigned to</option><option value="status">'+Query.gConfigStatus+'</option>'
	     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
	   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     					id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 						'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;	
	   			
            case 'Active': 			
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
				    
                newQuery+='<option  value="TestPasses">'+Query.gConfigTestPass+'</option><option value="UATItems">UAT Items</option><option 					value="ID">	ID</option>   <option value="AssignedTo"> Assigned to</option><option value="Roles">'+Query.gCongfigRole+'</option>'
				     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    				selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    			selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 				'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;   
			   
            case 'OnHold':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
				    
                newQuery+='<option  value="TestPasses">'+Query.gConfigTestPass+'</option><option value="UATItems">UAT Items</option><option 					value="ID">	ID</option>   <option value="AssignedTo"> Assigned to</option><option value="Roles">'+Query.gCongfigRole+'</option>'
				     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    				selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    			selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 				'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;  
                break;
		
            case 'Complete':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
				    
                newQuery+='<option  value="TestPasses">'+Query.gConfigTestPass+'</option><option value="UATItems">UAT Items</option><option 					value="ID">	ID</option>   <option value="AssignedTo"> Assigned to</option><option value="Roles">'+Query.gCongfigRole+'</option>'
				     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    				selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value"    			selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 				'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break; 
				
            case 'Pass':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
				    
                newQuery+='<option  value="TestCases">'+Query.gConfigTestCase+'</option><option  																value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>   					<option value="AssignedTo"> Assigned to</option><option 																					value="Roles">'+Query.gCongfigRole+'</option>'
				     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value" selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 							'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;		
				 
            case 'Fail':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
				    
                newQuery+='<option  value="TestCases">'+Query.gConfigTestCase+'</option><option  																value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>   					<option value="AssignedTo"> Assigned to</option><option 																						value="Roles">'+Query.gCongfigRole+'</option>'
				     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value" selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 							'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;
		
            case 'NotCompleted':
                var newQuery='<tr><td><select id="'+selectChangeCriteriaDrDo2+'" class="ddl '+selectCriteriaClass+'"                  							onchange="Query.changeCriteriaDrDo2(\''+selectOperatorClass+'\',\''+selctOperatorDrDo2+'\',\''+selectChangeCriteriaDrDo2+'\');">    				<option value="Select Criteria">Select '+Query.valueOflblCriteria+'</option>' 
				    
                newQuery+='<option  value="TestCases">'+Query.gConfigTestCase+'</option><option  																value="TestSteps">'+Query.gConfigTestStep+'</option><option value="UATItems">UAT Items</option><option value="ID">ID</option>   					<option value="AssignedTo"> Assigned to</option><option 																					value="Roles">'+Query.gCongfigRole+'</option>'
				     
                newQuery+='</select></td><td><div id="'+selctOperatorDrDo2+'"><select class="ddl-small selectOperator0" id="optionOperator"><option    					selected="selected">Select '+Query.valueOflblOperator+'</option></select></div> '
				   
                newQuery+='<td><div id="valueDiv"><input type="text" style="display:none;width:400px;" class="ddl '+inputValueClass+'" /><select     				id="selectValue" style="width:400px;padding:1px 1px 1px 1px" class="ddl'+selectValueClass+'" name="D1"><option value="Select 					Value" selected="selected">Select '+Query.valueOflblValue+'</option></select></div></td><td><select class="ddl-small 							'+selectClauseClass+'">';
                newQuery+='<option value="AND" selected="selected">AND</option></select></td></tr>';   
                break;
        }

        return newQuery;	
    },

    fillValueDropDown:function(option,valueClass,count)
    {
        var value="";
        if(count=="1")
        {
            value = $("#changeCriteriaDrDo").val();
            if(value=="UATItems" || value=="status")
                value =$(".selectValue0").val();	
        }
        else
        {
            value = $("#changeCriteriaDrDo2"+(count-1)+"").val();
            if(value=="UATItems" || value=="status")
                value =$(".ddlselectValue"+(count-1)+"").val();
        }
	

        if(option.indexOf('UAT Items')!=-1)
        {     
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     	
            if(value=="TestPasses")
            {
                $('.ddl'+valueClass+'').append('<option value="test">'+Query.gConfigTestCase+'</option>');
                $('.ddl'+valueClass+'').append('<option value="action">'+Query.gConfigTestStep+'</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 

            }
            else if(value=="ID" || value=="AssignedTo" || value=="Roles")
            {
                $('.ddl'+valueClass+'').append('<option value="scenario" selected="selected">'+Query.gConfigTestPass+'</option>');     						$('.ddl'+valueClass+'').append('<option value="test">'+Query.gConfigTestCase+'</option>');
                $('.ddl'+valueClass+'').append('<option value="action">'+Query.gConfigTestStep+'</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 

            }
            else if(value=="TestCases")
            {	     		
                $('.ddl'+valueClass+'').append('<option value="action">'+Query.gConfigTestStep+'</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove();      	
            }
            else if(value=="scenario" || value=="Pass" || value=="Fail" || value=="NotCompleted")
            {	
                $('.ddl'+valueClass+'').append('<option value="test" selected="selected">'+Query.gConfigTestCase+'</option>');
                $('.ddl'+valueClass+'').append('<option value="action">'+Query.gConfigTestStep+'</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove();      	
            }
                /*se if(value=="TestSteps" || value=="test")
                {
                    $('.ddl'+valueClass+'').append('<option value="action" selected="selected">'+Query.gConfigTestStep+'</option>');
                    $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove();     
                }*/
            else if(value=="test")
            {
                $('.ddl'+valueClass+'').append('<option value="action" selected="selected">'+Query.gConfigTestStep+'</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove();     
            }
            else if(value=="Active" || value=="OnHold" || value=="Complete")
            {
                $('.ddl'+valueClass+'').append('<option value="scenario" selected="selected">'+Query.gConfigTestPass+'</option>');     						$('.ddl'+valueClass+' '+'option[value="Select Value"]').remove();	 	
            } 		 		 	
        }
	 
        if(option.indexOf('Status')!=-1)
        {
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     	
            if(value=="TestPasses" || value=="scenario")
            {
                $('.ddl'+valueClass+'').append('<option value="Active" selected="selected">Active</option>');
                $('.ddl'+valueClass+'').append('<option value="OnHold">On Hold</option>');
                $('.ddl'+valueClass+'').append('<option value="Complete">Complete</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
     	
            }
            else if(value=="TestCases" || value=="TestSteps" || value=="test" || value=="action")
            {
                $('.ddl'+valueClass+'').append('<option value="Pass" selected="selected">Pass</option>');
                $('.ddl'+valueClass+'').append('<option value="Fail">Fail</option>');
                $('.ddl'+valueClass+'').append('<option value="NotCompleted">Not Completed</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 

            }
            else if(value=="Roles")
            {
                $('.ddl'+valueClass+'').append('<option value="Pass">Pass</option>');
                $('.ddl'+valueClass+'').append('<option value="Fail">Fail</option>');
                $('.ddl'+valueClass+'').append('<option value="NotCompleted">Not Completed</option>');	 		
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
            }
            else 
            {
                $('.ddl'+valueClass+'').append('<option value="Active" selected="selected">Active</option>');
                $('.ddl'+valueClass+'').append('<option value="OnHold">On Hold</option>');
                $('.ddl'+valueClass+'').append('<option value="Complete">Complete</option>');
                $('.ddl'+valueClass+'').append('<option value="Pass">Pass</option>');
                $('.ddl'+valueClass+'').append('<option value="Fail">Fail</option>');
                $('.ddl'+valueClass+'').append('<option value="NotCompleted">Not Completed</option>');	 		
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 

            }	
        }
	 
        if(option.indexOf('Test Pass')!=-1)
        {
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     	
            var pid=$('#projSelect option:selected').val();
            var temp='';		
            //var obj=ServiceLayer.GetData('GetQueryTestPassRoleDropDown',pid);	
            var obj = ServiceLayer.GetData("GetQueryTestPassDropDown" + "/" + pid, null, "Query");
	 		 	///ttt
            if(valueClass!="selectValue0")
            {
                //if(obj.lstTpDD!=null)
                //{
                //    if(obj.lstTpDD.length>0)
                //    {
                //        var tps= obj.lstTpDD;
                if (obj.length > 0)
                {
                    for (var i = 0; i < obj.length; i++) {
                        var tpid = obj[i]["testPass_ID"];
                        var tpname = obj[i]["testPass_Name"];
                        temp += '<option value="' + tpid + '" title="' + tpname + '">' + tpname + '</option>';
                    }
                    $('.ddl' + valueClass + '').append(temp);
                }
                else
                {
                    $('.ddl' + valueClass + '').html('<option>No Test Pass Available</option>');
                }				
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
	 		 		
            }	
        }
	 
        if(option.indexOf('Role')!=-1)
        {
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     		 		 	
	 	
            var pid=$('#projSelect option:selected').val();
            var temp='';		
           // var obj=ServiceLayer.GetData('GetQueryTestPassRoleDropDown',pid);		
            var obj = ServiceLayer.GetData("GetQueryRoleDropDown" + "/" + pid, null, "Query");
	 	
            if(valueClass!="selectValue0")
            {
                //if(obj.lstRoleDD!=null)
                //{
                //    if(obj.lstRoleDD.length>0)
                //    {
                //        var rol= obj.lstRoleDD;
                if (obj.length > 0)
                {
                    temp += '<option value="1" title="Standard">Standard</option>';
                    for (var i = 0; i < obj.length; i++) {
                        var rolid = obj[i]["role_Id"];
                        var rolname = obj[i]["role_Name"];
                        temp += '<option value="' + rolid + '" title="' + rolname + '">' + rolname + '</option>';
                    }
                    $('.ddl' + valueClass + '').append(temp);
                }
                else {
                    $('.ddl' + valueClass + '').html('<option>No Roles</option>');
                }
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove();	 	
            }		 	
        }

	 
	 


    },
    //To bind Project and its version dropdown
    fillProjectDD:function()
    {
        //To get all the Projects
    
        var result = ServiceLayer.GetData("GetQueryProjectDropDown" , null, "Query");

        //var result = ServiceLayer.GetData("GetQueryProjectDropDown");
    	
        if(result != null || result != undefined)
        {
            var projectID = '';
            var tempProjName = new Array();
            var projectName='';
    		
            $('#projSelect option:value="Select Project"').remove();
    		    		
            for(var i=0;i<result.length;i++)
            {
                //changed by trupti
                //projectName=result[i]['ProjectName'];
                //projectID=result[i]['ProjectId'];
                //version=result[i]['ProjectVersion'];
                projectName = result[i]['project_Name'];
                projectID = result[i]['project_Id'];
                version = result[i]['project_Version'];
                if(i==0)    			 	 
                    temp = '<option title="'+projectName+'-'+version+'" value="'+projectID+'" selected="selected">'+projectName+'-'+version+'</option>';
                else
                    temp = '<option title="'+projectName+'-'+version+'" value="'+projectID+'">'+projectName+'-'+version+'</option>';
    			 	    			 		          
                $("#projSelect").append(temp);             	
            }
        }
        else
            $('.'+valueClass+'').html('<option>No '+Query.gConfigProject+' Available.');  
    },

    forProjectNameGetPID:new Array(),
    getVerByProjName:new Array(),
    fillValuesDD:function(option,valueClass){ 		
	      
        if(option.indexOf('UAT Items')!=-1){     
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     		 		 	
            /****Added by Mohini for resource file*******/
            if(valueClass!="selectValue0")
            {
                $('.ddl'+valueClass+'').append('<option value="scenario" selected="selected">'+Query.gConfigTestPass+'</option>');
                $('.ddl'+valueClass+'').append('<option value="test">'+Query.gConfigTestCase+'</option>');
                $('.ddl'+valueClass+'').append('<option value="action">'+Query.gConfigTestStep+'</option>');
                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
	 		 		
            }
            else
            {
                $('.'+valueClass+'').append('<option value="scenario" selected="selected">'+Query.gConfigTestPass+'</option>');
                $('.'+valueClass+'').append('<option value="test">'+Query.gConfigTestCase+'</option>');
                $('.'+valueClass+'').append('<option value="action">'+Query.gConfigTestStep+'</option>');
            }	 
        }
	
        if(option.indexOf('Status')!=-1)
        {
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     		 		 	
            /****Added by Mohini for resource file*******/
            if(valueClass!="selectValue0")
            {
                $('.ddl'+valueClass+'').append('<option value="Active" selected="selected">Active</option>');
                $('.ddl'+valueClass+'').append('<option value="OnHold">On Hold</option>');
                $('.ddl'+valueClass+'').append('<option value="Complete">Complete</option>');
                $('.ddl'+valueClass+'').append('<option value="Pass">Pass</option>');
                $('.ddl'+valueClass+'').append('<option value="Fail">Fail</option>');
                $('.ddl'+valueClass+'').append('<option value="NotCompleted">Not Completed</option>');

                $('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
	 		 		
            }
            else
            {
                $('.'+valueClass+'').append('<option value="Active" selected="selected">Active</option>');
                $('.'+valueClass+'').append('<option value="OnHold">On Hold</option>');
                $('.'+valueClass+'').append('<option value="Complete">Complete</option>');
                $('.'+valueClass+'').append('<option value="Pass">Pass</option>');
                $('.'+valueClass+'').append('<option value="Fail">Fail</option>');
                $('.'+valueClass+'').append('<option value="NotCompleted">Not Completed</option>');

            }	 

        }
	
        ////////////////////////////////////////////////added by Mangesh/////////
        if(option.indexOf('Test Pass')!=-1)
        {
            $('.'+valueClass+' > option').remove();  
            $('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     	
            var pid=$('#projSelect option:selected').val();
            var temp='';		
            //var obj=ServiceLayer.GetData('GetQueryTestPassRoleDropDown',pid);		
            //change:by trupti ttt
            var obj = ServiceLayer.GetData("GetQueryTestPassDropDown" + "/" + pid, null, "Query");
          
            if (valueClass != "selectValue0") {
                //if(obj.length>0)
                //{
                //    for (var i = 0; i < obj.length; i++)
                //    {
                //        var tpid = obj[i]["testPass_ID"];
                //        var tpname = obj[i]["testPass_Name"];
                //        temp+='<option value="'+tpid+'" title="'+tpname+'">'+tpname+'</option>';								
                //    }
                //    $('.ddl' + valueClass).append(temp);
                //}
                //else
                //{
                //	$('.ddl'+valueClass+'').html('<option>No Test Pass Available</option>');
                //}									
                //$('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
                if (obj.lstTpDD != null) {
                    if (obj.lstTpDD.length > 0) {
                        var tps = obj.lstTpDD;

                        for (var i = 0; i < tps.length; i++) {
                            var tpid = tps[i].sTestPassId;
                            var tpname = tps[i].sTestPassName;
                            temp += '<option value="' + tpid + '" title="' + tpname + '">' + tpname + '</option>';
                        }

                        $('.ddl' + valueClass + '').append(temp);

                    }
                }
                else {
                    $('.ddl' + valueClass + '').html('<option>No Test Pass Available</option>');
                }
                $('.ddl' + valueClass + ' ' + 'option[value="Select Value"]').remove();
            }
            else {
                //here
                if (obj.length > 0) {
                    for (var i = 0; i < obj.length; i++) {
                        var tpid = obj[i]["testPass_ID"];
                        var tpname = obj[i]["testPass_Name"];
                        temp += '<option value="' + tpid + '" title="' + tpname + '">' + tpname + '</option>';
                    }
                    $('.' + valueClass + '').append(temp);
                }
                else {
                    //no test pass available
                    $('.' + valueClass + '').html('<option>No Test Pass Available</option>');
                }
            }

}
	
	if(option.indexOf('Role')!=-1)
	{
		$('.'+valueClass+' > option').remove();  
     	$('.ddl'+valueClass+' > option').remove();  //Added by Rasika
     		 		 	
	 	
	 	var pid=$('#projSelect option:selected').val();
		var temp='';		
		//var obj=ServiceLayer.GetData('GetQueryTestPassRoleDropDown',pid);		
	    //by trupti
      
		var obj = ServiceLayer.GetData("GetQueryRoleDropDown" + "/" + pid, null, "Query");
	 	
	 	if(valueClass!="selectValue0")
	 	{
	 		//if(obj.lstRoleDD!=null)
			//{
			//	if(obj.lstRoleDD.length>0)
			//	{
			//		var rol= obj.lstRoleDD;
			//		temp+='<option value="1" title="Standard">Standard</option>';	
			//		for(var i=0;i<rol.length;i++)
			//		{
			//			var rolid= rol[i].sRoleId;
			//			var rolname=rol[i].sRoleName;
			//		    temp+='<option value="'+rolid+'" title="'+rolname+'">'+rolname+'</option>';								
			//		}
					
			//		$('.ddl'+valueClass+'').append(temp);
															
			//	}
	 	    //}
	 	    if (obj.length > 0) {
	 	        temp += '<option value="1" title="Standard">Standard</option>';
	 	        for (var i = 0; i < obj.length; i++) {
	 	            var tpid = obj[i]["role_Id"];
	 	            var tpname = obj[i]["role_Name"];
	 	            temp += '<option value="' + tpid + '" title="' + tpname + '">' + tpname + '</option>';
	 	        }
	 	    }
			else
			{
				$('.ddl'+valueClass+'').html('<option>No Roles</option>');
			}
										

	 		$('.ddl'+valueClass+' '+'option[value="Select Value"]').remove(); 
	 		 		
	 	}
	 	else
	 	{
	 		 	//here		 			 					
	 	    if(obj.length>1)
	 	    {
					
					temp+='<option value="1" title="Standard">Standard</option>';
					for (var i = 0; i < obj.length; i++)
					{
						var rolid= obj[i]["role_Id"];
						var rolname = obj[i]["role_Name"];
					    temp+='<option value="'+rolid+'" title="'+rolname+'">'+rolname+'</option>';								
					}
					
					$('.'+valueClass+'').append(temp);
															
				
			}
			else
			{
				$('.'+valueClass+'').html('<option>No Roles</option>');
			}
										

	 		$('.'+valueClass+' '+'option[value="Select Value"]').remove();
	 	}	 		 		 	
	}
	
	/////////////////////////////////////////////////////////////
	
	
	   
	//Added by HRW on 17 Dec 2012
	//if(option.indexOf("Select Criteria ")!=-1)
	if(option.indexOf('Select '+Query.valueOflblCriteria )!=-1)//Added by Mohini for Resource file
	{     
    	$('.'+valueClass+'> option').remove();  
    	$('.'+valueClass+'').append('<option value="Select Value" selected="selected">Select '+Query.valueOflblValue+'</option>');// Added by Mohini for resource file
	}

},
result:'',
executeQuery:function(i){
			//alert("executequery");
			var textInputVal="";
			
			var optionCriteriaVal=$(".selectCriteria"+i+" option:selected").val();
   		    var optionCriteriaTxt=$(".selectCriteria"+i+" option:selected").text();
   		    
   		    var optionOpVal=$(".selectOperator"+i+" option:selected").val();
	    	var optionOpTxt=$(".selectOperator"+i+" option:selected").text();
	   
			/*var optionItemsVal=$(".ddlselectValue"+i+" option:selected").val();
		    var optionItemsTxt=$(".ddlselectValue"+i+" option:selected").text();*/
		    
		    //replace('/','^^') bcoz '/' is used to separate parameters in Service.GetData():Rasika Mendhe
			if($(".inputValue"+i).val()!="" && $(".inputValue"+i).val()!=undefined && $(".inputValue"+i).val()!=null)
				textInputVal=$(".inputValue"+i).val().replace(/</g,'&lt;').replace(/>/g,'&gt;').replace('/','^^');
			
			if( i==0 && ( optionCriteriaTxt=='UAT Items' || optionCriteriaTxt=="Test Pass" || optionCriteriaTxt=="Status" || optionCriteriaTxt=="Role") )//Added by Rasika	
				  var optionItemsTxt=$(".selectValue"+i+" option:selected").text(); 
			else
			{
				var optionItemsVal=$(".ddlselectValue"+i+" option:selected").val();
		    	var optionItemsTxt=$(".ddlselectValue"+i+" option:selected").text();
		    }
		   		    			    			
   		    var optionClauseVal=$(".selectClause"+i+" option:selected").val();
   		    var optionClauseTxt=$(".selectClause"+i+" option:selected").text();
   		    if(i>0){
   		        var clauseRow=i-1;
   		    	optionClauseVal=$(".selectClause"+clauseRow+" option:selected").val();
   		    	optionClauseTxt=$(".selectClause"+clauseRow+" option:selected").text();   		    
   		    }
   		    
   		    		   
   		    Query.result += Query.getQueryResult(optionCriteriaVal,optionOpVal,optionItemsVal,optionItemsTxt,optionClauseVal,textInputVal)+'$'; 
            
            //Added by HRW for giving a proper alert message
			  var flag = 0;
			  if(optionCriteriaVal == "Select Criteria")
			  {
			  	 Query.flagForSelectCriteria = 1;
			  	 Query.countFOrCriteriaAndInput++;
			  	 flag = 1;
			  }	 
			  else
			  	 Query.flagForSelectCriteria = 0;	 
			  
			  if($.trim(textInputVal) == "" && optionCriteriaVal != "Select Criteria")
			  {
			  	Query.flagForInputValue = 1;
			  	Query.countFOrCriteriaAndInput++;
			  }	
			  if(Query.flagForInputValue == 1)
			  {
			  	 Query.flagForSelectCriteria = 0;
			  }
},

getQueryResult:function(optionCriteriaVal,optionOprVal,optionItemsVal,optionItemsTxt,optionClauseVal,textInputVal){	
	
	if(optionCriteriaVal.indexOf('UATItems')!=-1){	
		if((optionOprVal.indexOf('=')!=-1)||(optionOprVal.indexOf('Contains')!=-1)){
			var resultQuery='UATItems~'+$.trim(optionItemsTxt.split(" ").join(""))+'~'+optionClauseVal;
			return resultQuery;	
		}		
	}
	
	if(optionCriteriaVal.indexOf('TestPasses')!=-1)
	{		
		if((optionOprVal.indexOf('=')!=-1) ){	
		   			
			var resultQuery='TestPass~'+optionItemsTxt+'~'+optionClauseVal;
			return resultQuery;
		}
					
	}
	
	if(optionCriteriaVal.indexOf('TestCases')!=-1)
	{		
		if( (optionOprVal.indexOf('Contains')!=-1) ){			   			
			var resultQuery='TestCase~'+textInputVal+'~'+optionClauseVal;
			return resultQuery;

		}					
	}
	
    if(optionCriteriaVal.indexOf('TestSteps')!=-1)
    {	
    		if( (optionOprVal.indexOf('Contains')!=-1) ){	
    			var resultQuery='TestStep~'+textInputVal+'~'+optionClauseVal;
				return resultQuery;			
		}
					
	}
			
	if(optionCriteriaVal.indexOf('ID')!=-1){	
		if((optionOprVal.indexOf('=')!=-1)){	
		   	var resultQuery='ID~'+textInputVal+'~'+optionClauseVal;
			return resultQuery;

		}
	}	
	
	if(optionCriteriaVal.indexOf('Versions')!=-1)
	{		
		if((optionOprVal.indexOf('Contains')!=-1)||(optionOprVal.indexOf('Contains')!=-1)){	
		    var fieldSearch='version';
		    var opr='contains';		
			var resultQuery=ResultFields.searchName(textInputVal,fieldSearch,opr);
			return resultQuery;
		}
	}
	
	if(optionCriteriaVal.indexOf('AssignedTo')!=-1){	
		if((optionOprVal.indexOf('Contains')!=-1)){				
			var resultQuery='AssignedTo~'+textInputVal+'~'+optionClauseVal;
			return resultQuery;
		}
		
	}	
	
	//Added for Role Criteria :Ejaz Waquif DT:5/19/2014
	if(optionCriteriaVal.indexOf('Roles')!=-1)
	{		
		if((optionOprVal.indexOf('=')!=-1)){				
			var resultQuery='Roles~'+optionItemsTxt+'~'+optionClauseVal;
			return resultQuery;
		}
	}
		
	// == sign chnage to conatains by pallavi
	if(optionCriteriaVal.indexOf('status')!=-1)
	{	
		if((optionOprVal.indexOf('=')!=-1)){				
			var resultQuery='Status~'+optionItemsTxt+'~'+optionClauseVal;
			return resultQuery;
		}		
		
	}
	
/*	if(optionCriteriaVal.indexOf('Projects')!=-1)
	{	
	    var projectIds = new Array();
		projectIds = Query.forProjectNameGetPID[optionItemsTxt].split(",");					
		
		if((optionOprVal.indexOf('=')!=-1)){	
		    var fieldSearch='project';
		    var opr='equals';
			var resultQuery=ResultFields.searchName(projectIds,fieldSearch,opr);
			return resultQuery;
		}	
		
		if((optionOprVal.indexOf('<>')!=-1)){	
		    var fieldSearch='project';
		    var opr='not';		
			var resultQuery=ResultFields.searchName(projectIds,fieldSearch,opr);
			return resultQuery;
		}
	}*/

},

setValueText:function(selectCriteriaClass,row,inputValueCls,selectValueCls){	
	var optionCriteriaVal=$("."+selectCriteriaClass+" option:selected").val();
	
	//modified for bug id:3389 Ankita 10/3/2012
	if(row!=0)
	{
		var inputValueClass=inputValueCls;
		var selectValueClass=selectValueCls;
	}
	else
	{
		var inputValueClass='inputValue'+row;
		var selectValueClass="selectValue"+row;
	}

	if((optionCriteriaVal.indexOf('UATItems')==-1)&&(optionCriteriaVal.indexOf('status')==-1)&&(optionCriteriaVal.indexOf('TestPasses')==-1)&&(optionCriteriaVal.indexOf('Roles')==-1) && (optionCriteriaVal.indexOf('Projects')==-1) && (optionCriteriaVal.indexOf('SavedQueries')==-1) && (optionCriteriaVal.indexOf('Select Criteria')==-1))
    {			    
        //$("."+inputValueClass+"").style("display","block");
       	$("."+inputValueClass+"").val('');	
		$("."+inputValueClass+"").show();	
		$("."+selectValueClass+"").hide();	
		
		///Added by Mangesh////////////////////
		$(".ddl"+inputValueClass+"").val('');	
		$(".ddl"+inputValueClass+"").show();	
		$(".ddl"+selectValueClass+"").hide();		
	}
	else
	{	
		$("."+inputValueClass+"").hide();	
		$("."+selectValueClass+"").show();	
		
		///Added by Mangesh//////////////////////
		$(".ddl"+inputValueClass+"").hide();	
		$(".ddl"+selectValueClass+"").show();	
	}
	
	/*Commented by HRW as we are creating the criteria operator dropdown in changeCriteriaDrDo() and changeCriteriaDrDo2() function
	if(optionCriteriaVal.indexOf('UATItems')!=-1 || optionCriteriaVal.indexOf('TestPasses')!=-1 || optionCriteriaVal.indexOf('TestCases')!=-1 || optionCriteriaVal.indexOf('TestSteps')!=-1 || optionCriteriaVal.indexOf('Name')!=-1 || optionCriteriaVal.indexOf('AssignedTo')!=-1 || optionCriteriaVal.indexOf('status')!=-1)
		$("#ddlOp option[value='<>']").remove();
	else
	{   $("#ddlOp option[value='<>']").remove();
	    $('#ddlOp').append('<option value="<>" > <> </option'); 
    }*/
},

exportToExcel:function(){
for(row=0;row<Query.totalResultTables;row++){	
	var idRes='resultToExcel'+row;	
		var tbl = document.getElementById(""+idRes+"");
		//alert(tbl );
		var x=tbl.rows;

		
		var xls = new ActiveXObject("Excel.Application");

		xls.visible = true;
		xls.Workbooks.Add;
		for (i = 0; i < x.length; i++)
		{
			var y = x[i].cells;
		
			for (j = 0; j < y.length; j++)
			{
				xls.Cells( i+1, j+1).Value = y[j].innerText;
			}
		}	
}
},

getUserProjectsandRoles:function(){
 	 var name="";//Main.getSiteUser();	
 	 //alert(name);
	 //var listN1 = jP.Lists.setSPObject(Main.getSiteUrl(),'UserSecurity'); //UserRolesMapping
	 //   		var Query1 ='<Query><Where><Eq><FieldRef Name="UserName" /><Value Type="Text">'+name+'</Value></Eq></Where><OrderBy><FieldRef Name="UserName" Ascending="true"/></OrderBy></Query>';
	 //   	    var userItems =listN1.getSPItemsWithQuery(Query1).Items;
	 //   	    var userProjectMap=[];
			  
	 //   	    if((userItems !=null) && (userItems !='undefined')){				    
	 //   	   		for(var i=0;i<userItems .length;i++){				   			   		  
	 //   	   		  //var projId=userItems[i]["referenceID"];				   		  			
	 //   	   		  var role=userItems[i]["SecurityId"];	
	 //   	   		  userProjectMap.push({project:0,role:role});
     //  				}
     //  			} 
     //  			else{
     //  				  userProjectMap.push({project:null,role:null});
     //  				  //alert('User Unauthorised');
	 //   		} 
       		
	 //   		for(k=0;k<userProjectMap.length;k++){
	 //   			 //alert(userProjectMap[k].project);					
	 //   			 //alert(userProjectMap[k].role);						  
	 //   		}     			       			
},
alertBox:function(msg){
			$("#divAlert").text(msg);
			$('#divAlert').dialog({height: 150,modal: true, buttons: { "Ok":function() { $(this).dialog("close");}} });
},
alertBox2:function(msg){
			$("#divAlert").text(msg);
			$('#divAlert').dialog({height: 150,modal: true,title:"Search",resizable:false, buttons: { "Ok":function() { $(this).dialog("close");}} });
			//$('#divAlert').dialog({height: 150,modal: true,title:"Search",resizable:false, buttons: { "Ok":function() { $(this).dialog("close");Query.saveResult();}} });//Ankita: to disable resizablity 10/15/2012
},

/*** Added By Harshal on 29/12/11 *****/
changeCriteriaDrDo:function()
{	
	//$('#operatorDrDo').empty();
	
	//alert($('#changeCriteriaDrDo option:selected').val());AssignedTo
	if($('#changeCriteriaDrDo option:selected').val()=="Select Criteria")
		$('#operatorDrDo').html('<select class="ddl-small selectOperator0" id="ddlOp"><option selected="selected">Select '+Query.valueOflblOperator+'</option></select>');
	else if($('#changeCriteriaDrDo option:selected').val()=="Projects" || $('#changeCriteriaDrDo option:selected').val()=="ID" || $('#changeCriteriaDrDo 					option:selected').val()=="SavedQueries" )
		$('#operatorDrDo').html('<select class="ddl-small selectOperator0" id="ddlOp"><option selected="selected">=</option></select>');
	else if($('#changeCriteriaDrDo option:selected').val()=="UATItems" || $('#changeCriteriaDrDo option:selected').val()=="status" || $('#changeCriteriaDrDo option:selected').val()=="TestPasses" || $('#changeCriteriaDrDo option:selected').val()=="Roles")
		$('#operatorDrDo').html('<select class="ddl-small selectOperator0" id="ddlOp"><option selected="selected">=</option></select>');
	else if($('#changeCriteriaDrDo option:selected').val()=="Versions" || $('#changeCriteriaDrDo option:selected').val()=="TestCases" || $('#changeCriteriaDrDo option:selected').val()== "TestSteps" || $('#changeCriteriaDrDo option:selected').val()=="Name" || $('#changeCriteriaDrDo option:selected').val()=="AssignedTo" )
		$('#operatorDrDo').html('<select class="ddl-small selectOperator0" id="ddlOp"><option value="Contains"> Contains </option></select>');		
},
changeCriteriaDrDo2:function(selectOperatorClass,selctOperatorDrDo2,selectChangeCriteriaDrDo2)
{
 		if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="Select Criteria")
 		{
			$('#'+selctOperatorDrDo2+'').html('<select class="ddl-small selectOperator0" id="optionOperator"><option selected="selected">Select Operator</option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).show(); //Added by Rasika
		}
		else if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="Projects" || $('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="ID"  || $('#'+selectChangeCriteriaDrDo2+' 			option:selected').val()=="SavedQueries")
		{
			$('#'+selctOperatorDrDo2+'').html('<select id="optionOperator" class="ddl-small '+selectOperatorClass+'"><option selected="selected"> = </option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).hide(); //Added by Rasika
		}
		else if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="UATItems")
		{
			$('#'+selctOperatorDrDo2+'').html('<select id="optionOperator" class="ddl-small '+selectOperatorClass+'"><option selected="selected"> = </option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).show(); //Added by Rasika
		}
		else if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="status" )
		{
			$('#'+selctOperatorDrDo2+'').html('<select id="optionOperator" class="ddl-small '+selectOperatorClass+'"><option selected="selected"> = </option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).show(); //Added by Rasika
		}
		else if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="TestPasses" )
		{
			$('#'+selctOperatorDrDo2+'').html('<select id="optionOperator" class="ddl-small '+selectOperatorClass+'"><option selected="selected"> = </option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).show(); //Added by Rasika
		}
		else if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="Roles" )
		{
			$('#'+selctOperatorDrDo2+'').html('<select id="optionOperator" class="ddl-small '+selectOperatorClass+'"><option selected="selected"> = </option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).show(); //Added by Rasika
		}

		else if($('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="Versions" || $('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="TestCases" || $('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="TestSteps" || $('#'+selectChangeCriteriaDrDo2	+' option:selected').val()=="Name" || $('#'+selectChangeCriteriaDrDo2+' option:selected').val()=="AssignedTo")
		{
			$('#'+selctOperatorDrDo2+'').html('<select id="optionOperator" class="ddl-small '+selectOperatorClass+'"><option value="Contains"> Contains </option></select>');
			//$('.ddlselectValue'+Query.QueryGridCount).hide(); //Added by Rasika
		}		
},
sortJSON: function (data, key, way) {
        return data.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
} 


}
