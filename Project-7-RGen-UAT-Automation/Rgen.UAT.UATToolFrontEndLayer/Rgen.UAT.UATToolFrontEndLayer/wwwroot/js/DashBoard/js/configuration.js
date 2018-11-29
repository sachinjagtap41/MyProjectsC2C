/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/


var GSclickFlag = 0; 

function noActHandle()
{
    $('#Doc').empty();
    $('#DocPagination').empty();
   	$('#spanDoc').html('<span class="msgSpan">No Documents Uploaded<span>');
}
	  
function pageselectDocCallback(page_index, jq)
{
   // Get number of elements per pagionation page from form
    var members = new Array()
    members = documents;
   
    var items_per_page = 5;
    var max_elem = Math.min((page_index+1) * items_per_page, members.length);
    var newcontent = '';
    
    // Iterate through a selection of the content and build an HTML string
    for(var i=page_index*items_per_page;i<max_elem;i++)
    {
        newcontent += members[i];
    }
     $('#spanDoc').empty();
     // Replace old content with new content
      $('#Doc').empty().html(newcontent);
    
    // Prevent click event propagation
    return false;
}
var documents = new Array();
function initDocPagination()
{
    // count entries inside the hidden content
    documents = Configuration.getDoc();
    if(documents != undefined)
    {
        var member = documents.length;
        $("#DocPagination").pagination(member,{
            callback: pageselectDocCallback,
            items_per_page:5, 
            num_display_entries:10,
            num:2
            
        });
        if(documents.length == 0)
        {
        	$('#Doc').empty();
		    $('#DocPagination').empty();
		   	$('#spanDoc').html('<span class="msgSpan">No Documents Uploaded<span>');
        }
    }    
}
           
function hoverText()
{
 // Tooltip only Text
	$('.masterTooltip').hover(function(){
	        // Hover over code
	        var title = $(this).attr('title');
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

var Configuration = {
startIndex:0,
Ei:0,
gAttlength:0,
//application url grid paging
startIndexApp:0,
EiApp:0,
gAttlengthApp:0,
gAttlengthAppConf:0,
SelectedUserArryRequest:new Array(),//array to save selected user names for sending request to admin by nitu on 18 dec 2012

EnvironmentUserArry:new Array(),//array to save Environment for selected users for sending request to admin by nitu on 18 dec 2012

//Process grid paging
startIndexProc:0,
EiProc:0,
gAttlengthProc:0,
//File Upload
startIndexFile:0,
EiFile:0,
globalEnvironmentId:new Array(),
gAttlengthFile:0,
environmentListResult:'',
EnvronmentNameForEnvironmentID:new Array(),
SiteURL:Main.getSiteUrl(),
UATEnvironment: new Array(),
TesterList:new Array(),
globalUserID:'',
processSavedForProjectId: new Array(),
loginUserName:'',
userSettingID:'',
flagForLoginUserNotTester:false,
CheckMode:true,
actualURL:'',
prjID:'',
GSTestPassFlag:0,
gCongfigRole:"Role",//Added for resource file:SD
gConfigTestPass:"Test Pass",//Added for resource file:SD
gConfigTestStep:"Test Step",//Added for resource file:SD
gConfigTestCase:"Test Case",//Added for resource file:SD
gConfigProject:"Project",//Added for resource file:SD
gConfigTester:"Tester",//Added for resource file:SD
gEnvironmentLabelText:"Environment",//:SD
gConfigPortfolio:"Portfolio",
gConfigVersion:"Version",
gConfigMyActivity :'My Activity',
gConfigStakeholder:'Stakeholders',
gConfigManager:'Test Manager',
gConfigLead:'Lead',
gConfigFeedback:'Feedback',
gConfigUser:'User',
gConfigStatistic:'Usage Statistics:UAT V1.1', 
gConfigStatisticUnus:'Usage Statistics:Unus Site',
gPortfolio:0,
gPortfolioID:'',

getVersionByProjByName:new Array(),

isPortfolioOn:true,
portfolioFlag:'',

init:function()
{
	/**************************************************************************/
         
   		Main.showLoading();
   		/*Code added by Mohini DT:20-05-2014 for list count*/
   		$.getJSON(Main.getSiteUrl()+'/_vti_bin/Listdata.svc/Project/$count',function(data){ 
   		  var count=((data)>=10)?(data):('0'+(data));
   		  $('#prjCount').text(count);
   		});
   		  
   		$.getJSON(Main.getSiteUrl()+'/_vti_bin/Listdata.svc/TestPass/$count',function(data){ 
   		  var count=((data)>=10)?(data):('0'+(data));
   		  $('#tpCount').text(count);
   		});
   		
   		$.getJSON(Main.getSiteUrl()+'/_vti_bin/Listdata.svc/Action/$count',function(data){ 
   		  var count=((data)>=10)?(data):('0'+(data));
   		  $('#tsCount').text(count);
   		});
   		
   		$.getJSON(Main.getSiteUrl()+'/_vti_bin/Listdata.svc/UserSecurity/?$select=SPUserID,SecurityId',function(xData){
	    var uniqueID =new Array();
	    for(var i=0;i<xData.d.results.length;i++)
	    {
	       if(xData.d.results[i].SecurityId != 1)
	         if($.inArray(xData.d.results[i].SPUserID,uniqueID) == -1)
	             uniqueID.push(xData.d.results[i].SPUserID);
	    }
           var count=((uniqueID.length)>=10)?(uniqueID.length):('0'+(uniqueID.length));
           $('#userCount').text(count);
   		});
               		
        //Resource file:SD
		if(resource.isConfig.toLowerCase()=='true')
	    {
	   	    Configuration.gCongfigRole = resource.gPageSpecialTerms['Role']!=undefined?resource.gPageSpecialTerms['Role']:"Role";
	   	    Configuration.gConfigTestPass = resource.gPageSpecialTerms['Test Pass']!=undefined?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
	   	    Configuration.gConfigTestStep = resource.gPageSpecialTerms['Test Step']!=undefined?resource.gPageSpecialTerms['Test Step']:"Test Step";
	   	    Configuration.gConfigTestCase = resource.gPageSpecialTerms['Test Case']!=undefined?resource.gPageSpecialTerms['Test Case']:"Test Case";
	   	    Configuration.gConfigTester = resource.gPageSpecialTerms['Tester']!=undefined?resource.gPageSpecialTerms['Tester']:"Tester";
	   	    Configuration.gConfigProject = resource.gPageSpecialTerms['Project']!=undefined?resource.gPageSpecialTerms['Project']:"Project";
	   	   	Configuration.gConfigPortfolio= resource.gPageSpecialTerms['Portfolio']!=undefined?resource.gPageSpecialTerms['Portfolio']:"Portfolio";
	   	   	Configuration.gConfigVersion= resource.gPageSpecialTerms['Version']!=undefined?resource.gPageSpecialTerms['Version']:"Version";
	   	   	Configuration.gConfigMyActivity =resource.gPageSpecialTerms['My Activity']==undefined?'My Activity':resource.gPageSpecialTerms['My Activity'];
	   	    Configuration.gConfigStakeholder =resource.gPageSpecialTerms['Stakeholders']==undefined?'Stakeholders':resource.gPageSpecialTerms['Stakeholders'];
	   	    Configuration.gConfigManager=resource.gPageSpecialTerms['Test Manager']==undefined?'Test Manager':resource.gPageSpecialTerms['Test Manager'];
	   	    Configuration.gConfigLead=resource.gPageSpecialTerms['Lead']==undefined?'Lead':resource.gPageSpecialTerms['Lead'];
	   	    Configuration.gConfigFeedback=resource.gPageSpecialTerms['Feedback']==undefined?'Feedback':resource.gPageSpecialTerms['Feedback'];
	   	    Configuration.gConfigUser=resource.gPageSpecialTerms['User']==undefined?'User':resource.gPageSpecialTerms['User']; 
	   	   	Configuration.gConfigStatistic=resource.gPageSpecialTerms['Usage Statistics:UAT V1.1']==undefined?'Usage Statistics:UAT V1.1':resource.gPageSpecialTerms['Usage Statistics:UAT V1.1']; 
	   	   	Configuration.gConfigStatisticUnus=resource.gPageSpecialTerms['Usage Statistics:Unus Site']==undefined?'Usage Statistics:Unus Site':resource.gPageSpecialTerms['Usage Statistics:Unus Site']; 
	   }
      /*Added bhy Mohini for Usage statistic DT:21-05-2014*/
        $('#lblPrj').text('Total '+Configuration.gConfigProject+'s');
        $('#lblTP').text('Total '+Configuration.gConfigTestPass+'es');
        $('#lblTS').text('Total '+Configuration.gConfigTestStep+'s');
        $('#lblUser').text('Total '+Configuration.gConfigUser+'s*');
        $('#statNote').text('* Total Users includes all '+Configuration.gConfigTester+'s, '+Configuration.gConfigManager+' and '+Configuration.gConfigStakeholder+' added to any '+Configuration.gConfigProject+' or '+Configuration.gConfigTestPass+' for this site.');
        var url=window.location.href;
        if(url.indexOf('Unus')==-1)
            $('#heading').text(Configuration.gConfigStatistic);
        else
            $('#heading').text(Configuration.gConfigStatisticUnus);
      /*********************/
        $('#divAlert2').attr('title',Configuration.gConfigPortfolio+' Setting Confirmation');
   		Configuration.isPortfolioOn=isPortfolioOn;
   		Configuration.gPortfolioID=gPortfolioID;
        //security.applySecurityForAnalysis(_spUserId,$('#userW').text()); 
  		/*To hide version field if Portfolio OFF*/
  		if(!Configuration.isPortfolioOn)
  		{
  		      $('#UATStatistic').css('margin-top','-204px');
  		      Configuration.portfolioFlag=0;
  		      $('input[id="portfolioOption'+Configuration.portfolioFlag).attr('checked','checked');
      		  $('#tab1 div table tr:eq(1)').hide(); //to hide the version field of config tab
      		  $('#tab2 div div table tr:eq(1)').hide();//to hide the version field of user setting tab
      		  $('#tab3 div table tr:eq(1)').hide();//to hide the version field of doc lib tab
              $('#tab4 div div table tbody tr:eq(1)').hide();//to hide the version field of Process details tab
              $('#GSVersionField').hide();
              $('#ProjectOptions').text(Configuration.gConfigProject+' Level Options:');
              
              var genSetTitle = Configuration.gConfigManager+' (or '+Configuration.gConfigStakeholder+' or '+Configuration.gConfigProject+' '+Configuration.gConfigLead+') can configure Application, '+
				                Configuration.gConfigTestPass+' level General settings which is applicable at respective levels.';
  		              
  		}
  		else
  		{ 
  		      $('#UATStatistic').css('margin-top','-140px');
  		      Configuration.portfolioFlag=1;
  		      $('input[id="portfolioOption'+Configuration.portfolioFlag).attr('checked','checked');
      	      $('#appDiv').hide();
	          $('#EnPortf').show();
	          $('#tab5dropdown').css('margin-top','5px');
	          
	          var genSetTitle = Configuration.gConfigManager+' (or '+Configuration.gConfigStakeholder+' or '+Configuration.gConfigVersion+' '+Configuration.gConfigLead+') can configure Application, '+Configuration.gConfigVersion+' and '+
				  Configuration.gConfigTestPass+' level General settings which is applicable at respective levels.';
  		}
          		/****** file upload related code Added by shilpa **********/
		var configPageStateVar= Main.getCookie("ConfigPageState");
		var attchprjid='';
		if(configPageStateVar!= null && configPageStateVar!= undefined)
		{
			attchprjid=configPageStateVar.split('|')[0];
			//Added by HRW
			var flag = configPageStateVar.split('|')[2];
			if(flag == 0)
			{
				var configInfo =attchprjid+"|"+"tab3"+"|"+"1";		
				Main.setCookie("ConfigPageState",configInfo ,null);
			}	
			else
				Main.deletecookie("ConfigPageState");
			Configuration.prjID = attchprjid;
			
		}
 		///////////////////// Code for blocking user from navigating to configuredocuments list-allitems page after save btn press ///////////////////////////////////
           // Configuration.AttachmentWebPartFunc();
            var urlvar =''; 
            urlvar = window.location.href;
		 	if(urlvar.indexOf('source')==-1)
		 	{
				//var newurl =urlvar.charAt(urlvar.indexOf(".aspx"));
				var index = urlvar.indexOf(".aspx"); 
				var str = "?source="+urlvar.substr(0, index);
				var newurl = urlvar.substr(0, index+5) + str + urlvar.substr(index)
				 if(attchprjid!='')		 	 
				 newurl =newurl +'#tab3';
				//newurl =newurl +'#tab3,pid='+attchprjid;			 
			    window.location.href=newurl;
		 	}
			 else
			 {
				 //Added by HRW for 3890 bug(Windows 8)
				if(urlvar.split("#")[2] == "tab3" && urlvar.split("#")[2] != undefined)
	            	window.location.href=urlvar.split('#')[0] + "#tab3";
			 }
            /*****************Code added for attachment wp styling*******/
		var arr = $("[id$='toolBarTbltop']").html();
		('<b>Attachments</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+arr);
		$("h1 tbody").css('width','20px');
		//$("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
		//$("[id$='diidIOSaveItem']").addClass('ms-toolbar ms-ButtonHeightWidth btn');
		$("[id$='attachCancelButton']").hide();
		$("[id$='diidIOGoBack']").hide();
		$("#partAttachment").css("display","block");
		$("#onetidIOFile").css("width","200pt");
		$("[id$='toolBarTbltop']").css("display","none");
		$("[id$='TextField']").css('width','200pt');
	    $(".ms-formlabel").css("height","10px");
	    $("#attachOKbutton").addClass('btnOk');
		    $("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
		    $("[id$='diidIOSaveItem']").addClass('ms-toolbar ms-ButtonHeightWidth btn');
			$(".ms-formtable").each(function()
			{
				var i=0;
				$(this).find("tr").each(function()
				{
					if(i!=2 && i!=3)
					{
						$(this).hide();
					}
					i++;
				});
			});
		  	$(".ms-formline").hide();
		  	$(".ms-descriptiontext").hide();
		  	
	     //For Hover Over Text:-Added By Mohini  
		var configTitle = Configuration.gConfigTester+' can view information required to execute UAT Test Scripts here '+
						  'like Test Environment, Supporting documents for reference.'
						  
	    var userSetTitle = 'To assign '+$('#lblEnvironment').text().substring(0,$('#lblEnvironment').text().length-2)+' to '+Configuration.gConfigTester+'s. Also '+Configuration.gConfigManager+' can send the access request for '+Configuration.gConfigTester+'.';	
	    
		var docLibTitle = 'To upload documents which a '+Configuration.gConfigTester+' needs for reference to execute the UAT Test Scripts.';
		
		var procDetTitle = 'To add the process/features of the application under UAT phase which is useful '+
						   'for '+Configuration.gConfigTester+'s to understand the application/system.';
			   
		$("#configTab").attr('title',configTitle);
	    $("#genSetTab").attr('title',genSetTitle);
	    $("#userSetTab").attr('title',userSetTitle);
	    $("#docLibTab").attr('title',docLibTitle);
	    $("#proDet").attr('title',procDetTitle);
	    
	    $('#msgPort').html("<b>Note:</b><i>&nbsp;Once ‘Enable "+Configuration.gConfigPortfolio+"’ is selected, you will not be able to make it ‘Disable "+Configuration.gConfigPortfolio+"’ throughout the application.</i>");
		$('#msgEnabled').html("<b>Note:</b><i>"+Configuration.gConfigPortfolio+" feature is enabled for this UAT App.</i>");	
		if(isRootWeb)
			$('#docEnP').html("Download&nbsp;<a href='../SiteAssets/GuidelineDocs/UAT_Enabled Portfolio_RGen_V1.0.pdf' target='_blank'" +
			               "style='text-decoration:underline;color:blue'>Enable "+Configuration.gConfigPortfolio+"</a>&nbsp;document for detailed guidelines.");
		else
			$('#docEnP').html("Download&nbsp;<a href='../../SiteAssets/GuidelineDocs/UAT_Enabled Portfolio_RGen_V1.0.pdf' target='_blank'" +
		               "style='text-decoration:underline;color:blue'>Enable "+Configuration.gConfigPortfolio+"</a>&nbsp;document for detailed guidelines.");	               
       /************************************************/
	   
	   $('#spnEnvironment').html('Add '+$('#lblEnvironment').text().substring(0,$('#lblEnvironment').text().length-2));//:SD
		/************Code added for attachment wp styling *********/
          		
          		setTimeout("Configuration.onPageLoad(\'projectName\');",200);

				//hide all 3 editable tabs if login user is only tester code by sheetal on 24 March
				if($.inArray('4',security.userType)==-1)
				{   
					if(Configuration.prjID=='')
						$("#tabs").tabs({disabled: [0],selected: 1});//Disabled the configuration tab for the User who is not Tester
					$('#tabs li:eq(0)').hide();
					
					/*Added by Mohini*/
					if(GSclickFlag == 0)//Added for onhover text
					{	
					   GSclickFlag = 1;
					   hoverText();
					}

				}
				
				if($.inArray('4',security.userType)!=-1 && $.inArray('1',security.userType)==-1 && $.inArray('2',security.userType)==-1 && $.inArray('3',security.userType)==-1 && $.inArray('5',security.userType)==-1)
	          	{	
	          	    $("#tabs").tabs();
           		 	$('#tabs ul li:eq(0) a').click(function(e){
						//Configuration.populateProjectForTester();
						//Configuration.populateTestPassForTester();
						Configuration.getServrsFrLogInUser();
						Configuration.gridDetails();
						noActHandle();
						initDocPagination();
						Configuration.populateTestPassForTester();
					});
           		 	$('#tabs li:eq(1)').hide();
           		    $('#tabs li:eq(2)').hide();
				 	$('#tabs li:eq(3)').hide();
				 	$('#tabs li:eq(4)').hide();
				}
				else
				{
					if(Configuration.prjID=='')
						$("#tabs").tabs({selected: 0});//Disabled the configuration tab for the User who is not Tester
					$("#tabs").tabs();
				}
				//Added for bub 10682
				$('#tabs ul li:eq(1) a').click(function(e){
				         if(GSclickFlag == 0)//Added for onhover text
						 {	
						   GSclickFlag = 1;
						   hoverText();
						 }
						Configuration.populateTPForGS();
					});
				//hide 1st tab readonly is login user is not tester
				
				//Resource file changes:SD
				//$('#ProjectOptions').html(Configuration.gConfigVersion+' Level Options:');
				$('#lblPortfolioDisable').text('Disable '+Configuration.gConfigPortfolio);
				$('#lblPortfolioEnable').text('Enable '+Configuration.gConfigPortfolio);
				$('#h4PortfolioOption').text('Select '+Configuration.gConfigPortfolio+' Options:');
				$("#imgDisPortfolio").attr('title',Configuration.gConfigPortfolio+" feature will not be available at UAT application level.");
				$("#imgEnPortfolio ").attr('title',Configuration.gConfigPortfolio+" feature will be available at UAT application level.");
				$('#h4TestPassOptions1').html(Configuration.gConfigTestPass+' Level Options:');//:SD
				$('#h4TestPassOptions2').html(Configuration.gConfigTestPass+' Level Options:');//:SD
				$('#lblRoleConfig').html(Configuration.gCongfigRole+' Configuration:');//:SD
				$('#lblSelectRoles').text("Please select "+Configuration.gCongfigRole+"(s) to display on 'Sign Up' form:");//:SD
				
				$('#imgTestingType1').attr('title','Execute '+Configuration.gConfigTestStep+' sequentialy within a '+Configuration.gConfigTestCase+'.');//:SD
	   			$('#imgTestingType2').attr('title','Execute '+Configuration.gConfigTestStep+' sequentialy as per its creation within a '+Configuration.gConfigTestPass+'.');//:SD
     			$('#imgTestingType3').attr('title','Execute '+Configuration.gConfigTestStep+' in any sequence at '+Configuration.gConfigTestPass+' level.');//:SD
     			$('#lblTestingType1').text('Sequential Testing within a '+Configuration.gConfigTestCase);//:SD
	   			$('#lblTestingType2').text('Sequential Testing within a '+Configuration.gConfigTestPass);//:SD
	   			
	   			$('#lblFeedbackRatingOption1').text("After completion of each "+Configuration.gConfigTestPass+" activity.");//:SD
	   			$('#lblFeedbackRatingOption2').text("After completion of each (Pass) "+Configuration.gConfigTestCase+'.');//:SD
	   			$('#imgFeedbackRatingOption1').attr("title","User has to provide a mandatory feedback rating after completing testing of a "+Configuration.gConfigTestPass+" activity which he selects from '"+Configuration.gConfigMyActivity+"' Action links.");//:SD
	   			$('#imgFeedbackRatingOption2').attr("title","User has to provide a mandatory feedback rating after every 'Pass' "+Configuration.gConfigTestCase+".");//:SD
	   			
	   			$('#lblTestStepConstraint').text(Configuration.gConfigTestStep+' Name Constraint:');//:SD
	   			$('#lblTestStepConstraint1').text("Allow same "+Configuration.gConfigTestStep+" name within "+Configuration.gConfigTestCase);//:SD
	   			$('#lblTestStepConstraint2').text("Don't allow same "+Configuration.gConfigTestStep+" name within "+Configuration.gConfigTestCase);//:SD
	   			Configuration.gEnvironmentLabelText = $("#lblEnvironment").text().substring(0,$("#lblEnvironment").text().length-2);//:SD
	   			
	   			$('#roleConfig').attr('title','Only checked '+Configuration.gCongfigRole.toLowerCase()+'s will be available on Sign Up form of Onboarding platform.');//added by mohini for resource file
	   			$('#autoapp').attr('title','If checked then '+Configuration.gConfigTester+' requested from Sign Up form to join the '+Configuration.gConfigTestPass+' will automatically gets added in the requested '+Configuration.gConfigTestPass+'.(For '+Configuration.gConfigTester+'s who signs up from Onboarding Platform.)');//added by mohini for resource file
				//$('#proDet').attr('title','To add '+Configuration.gConfigProject.toLowerCase()+' process details');
				//*************************************//
				$('.tTipConfig').betterTooltip();//added by Mohini for increasing the delay time of hover over text
				Main.hideLoading();
},

onPageLoad:function()
{  
	
	/*Highlight the configuration tab*/
	$(".nav ul li:eq(6) a").addClass("active");
	
	/******Attachment Wp code Added by Shilpa *********/
	var arr = $("[id$='toolBarTbltop']").html();     
	$('#saveBtnUpload').append(arr);
	var arr2=$("#saveBtnUpload tbody tr td:eq(1) table tr td").html();
	$('#saveBtnUpload').empty();  
	$('#partAttachment table tbody tr:eq(5)').remove();					
	$('.ms-attachUploadButtons').append(arr2);
	$("[id$='toolBarTbl']").remove();
	$(".s4-wpTopTable tr:eq(0)").remove();
	/*********Attachment Wp code******/
	
	Configuration.CheckMode=true;
	var query='<Query></Query>';
	Configuration.environmentListResult=Configuration.dmlOperation(query,'Environment');
	if(Configuration.environmentListResult!=undefined)
	{
		 for(var i=0;i<Configuration.environmentListResult.length;i++)
		 {
		  Configuration.EnvronmentNameForEnvironmentID[Configuration.environmentListResult[i]['ID']]=Configuration.environmentListResult[i]['actualURL']+'`'+Configuration.environmentListResult[i]['aliasURL'];
		 }
	}
 
	/*Get current logged in user name*/
	var userName = $().SPServices.SPGetCurrentUser({
                fieldName: "name",
                debug: false
                });
	//$("#userNameDiv").html(userName);
	$("#userW span:eq(1) a span").text("");
	var displayText = $("#userW span:eq(1) a").text();
	$("#userNameDiv").html( displayText );
	//code Commented Now
	Configuration.loginUserName = userName;
	
	//code added on 16 March Application URL related code//
	if($.inArray('4',security.userType)!=-1)//login user is tester for some project
	{
		Configuration.populateProjectForTester();
		Configuration.populateTestPassForTester();
		//code Commented Now
		Configuration.getServrsFrLogInUser();
		Configuration.gridDetails();
		noActHandle();
		initDocPagination();
	    //code Commented Now end
	}
		
	Configuration.populateProjectName();
	Configuration.populateTestPass();
	
	//ankita 17/7/2012: to show grid 
	Configuration.gridDetailsForProcess();
		
	Configuration.getUserList();
	//code commented now
	//code commented by swapnil kamle on 7-8-2012
	//Configuration.getServerInformForLogInUser();
	Configuration.resetAddModeUserSetting();
    Configuration.populateEnvironments();
    //code commented now
	Configuration.bindUploadedFileGrid(Configuration.prjID); // passing parameter for bug 3890
	
		
	//Code Modified by swapnil kamle on 7-8-2012	
	$( "#dialog:ui-dialog" ).dialog( "destroy" );	
	$( "#divUrlPopUpUpdate" ).dialog({
     		autoOpen: false,
			height: 230,
			width: 350,
			modal: true,
			open: function(event, ui) { 
			   				 	
								Configuration.actualURL = '';
								document.getElementById('actualURLUpdate').value ='';
								document.getElementById('aliasURLUpdate').value ='';
								document.getElementById('lblErrorUpdate').innerHTML='';
				//Code Modified by swapnil kamle on 7-8-2012
									 $("#urlboxdiv li").each(function()
										{
											if($(this).children(".mslChk").attr('checked') == true)
											{
										   		EnvironmentID=$(this).children(".mslChk").attr('value');
										   		
										   		if(EnvironmentID!=undefined) 
										   		{
										   		    var query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+EnvironmentID+'</Value></Eq></Where></Query>';
												 	//var EnvironmentList = jP.Lists.setSPObject(Configuration.SiteURL,'Environment'); 
							        	            var result = Configuration.dmlOperation(query,'Environment');
							        	            document.getElementById('actualURLUpdate').value =result[0]['actualURL'];
													document.getElementById('aliasURLUpdate').value =result[0]['aliasURL'];
													document.getElementById('lblErrorUpdate').innerHTML='';
													Configuration.actualURL = result[0]['actualURL'];
	
											 	}
											  }				   	
											
										  }
									     )
									     
									     //
			},
			buttons:{
				//Modified by swapnil kamle ok to Add
				"Update":function(){
					
				        var actualUrl = jQuery.trim(document.getElementById('actualURLUpdate').value);
						var aliasUrl = jQuery.trim(document.getElementById('aliasURLUpdate').value);
						Configuration.CheckMode=false;
					    if(actualUrl=='' || aliasUrl=='' ){
					        document.getElementById('lblErrorUpdate').innerHTML = "Fields marked with asterisk(*) are mandatory!";
					        
					        return false;
					    }
					    else{
					    	
					    	if(actualUrl.indexOf("HTTP")!=-1)
					    		actualUrl = actualUrl.replace("HTTP","http");
					    	
					    	if(actualUrl.indexOf("http") == -1)
                              var actualUrlWithHttp='http://'+actualUrl;
                            else
                              var actualUrlWithHttp=actualUrl;
                            
                            /* Added by shilpa for bug 6856 on 15 march */
                            if(actualUrlWithHttp.indexOf("http://") == -1 && actualUrlWithHttp.indexOf("https://") == -1)
    						{
					    		document.getElementById('lblErrorUpdate').innerHTML = "Please enter correct url";
					        	return false;
					        }/**/
					        
                            //Falg varible
                            //0 - Environment already present in list
                            //1 - Duplicate Alias
                            //2 - Push data
							var flag = 0;
							if($('#projectNames').val()!=undefined && $('#testPassNames').val()!=undefined )
							{ 
								//Code Modified by swapnil kamle on 6-8-2012 
								if($('#aliasURLUpdate').val().length > 50)
								{
									document.getElementById('lblErrorUpdate').innerHTML = "Alias' length should not exceed 50 characters!";
								}
								else
								{
									if($("#urlboxdiv li").find(":checked").length==0)
									{	
            							//Configuration.alertBox("Select the Environment first!");
										Configuration.alertBox("Select the "+Configuration.gEnvironmentLabelText+"first!");//:SD
										
									}
									else if($("#urlboxdiv li").find(":checked").length>1)
									{
										//Configuration.alertBox("Select one Environment at a time!");
										Configuration.alertBox("Select one "+Configuration.gEnvironmentLabelText+" at a time!");//:SD
									}
									else
									{
									    $("#urlboxdiv li").each(function()
											{
												var EnvironmentID;
												if($(this).children(".mslChk").attr('checked') == true)
												{
											   		EnvironmentID=$(this).children(".mslChk").attr('value');
												}				   	
												if(EnvironmentID!=undefined) 
										   		{
										   		     var flag = 0;
							        	             //Added by HRW for bug 4243
							        	             if(Configuration.actualURL == actualUrlWithHttp)
							        	            	flag = 1;
								        	         else
								        	         {
								        	            var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$('#projectNames').val()+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$('#testPassNames').val()+'</Value></Eq><Eq><FieldRef Name="actualURL" /><Value Type="Text">'+actualUrlWithHttp+'</Value></Eq></And></And></Where></Query>';
														var envItems = Configuration.dmlOperation(query,"Environment");
														if(envItems != null && envItems != undefined)
														{
															document.getElementById('lblErrorUpdate').innerHTML = "Environment already present in list!";
															flag = 0;
														}
														else
															flag = 1;
													 }
								        	            
													 if(flag == 1)
													 {
	
														 	var Environment = new Array();
															Environment.push({
															'Title': '',
															'ID':EnvironmentID,
															'ProjectId': $('#projectNames').val(),
															'TestPassID': $('#testPassNames').val(),
															'actualURL': actualUrlWithHttp == '' ? null :  actualUrlWithHttp,
															 'aliasURL':$('#aliasURLUpdate').val() == '' ? null :  $('#aliasURLUpdate').val(),
															});
															
														 	var EnvironmentList = jP.Lists.setSPObject(Configuration.SiteURL,'Environment'); 
									        	            var result = EnvironmentList .updateItem(Environment);
									        	            Configuration.EnvronmentNameForEnvironmentID[EnvironmentID]=actualUrlWithHttp+'`'+$('#aliasURLUpdate').val();
	
									        	            var markup = '<li>';
										                    markup += '<input class="mslChk" type="checkbox" value="'+result['ID']+'"/>';
										                    markup += '<a style="color: blue; padding-left: 6px;" title="' + actualUrlWithHttp + '" href="'+ actualUrlWithHttp +'" target="_blank">' + trimText(aliasUrl,28) +'</a>';
										                    markup += '</li>';
										                    $('#urlboxdiv span').remove();        
										                    $('#urlboxdiv').append(markup);
										                    
															Configuration.populateEnvironments();	
							             					Configuration.bindUserSettingGrid();
															//Configuration.resetUserSettingInEditMode(); //commented by shilpa for bug 5205(1)
															$("#divUrlPopUpUpdate").dialog( "close" );
															/*$("#urlboxdiv .mslChk").removeAttr('checked');
															$("input[value='"+EnvironmentID+"']").attr('checked','checked');*/
	
									                 }
							
												}
											}
										)										
									} 
								}//else
		        	          }		        	           
        	            } 
				},				
				"Cancel":function(){
				    document.getElementById('lblErrorUpdate').innerHTML=" ";
     		    	$( this ).dialog( "close" );
				}
		   }
	});

	//	
	$( "#dialog:ui-dialog" ).dialog( "destroy" );	
    	$( "#divUrlPopUp" ).dialog({
     		autoOpen: false,
			height: 230,
			width: 350,
			modal: true,
			open: function(event, ui) { 
				document.getElementById('actualURL').value ='';
				document.getElementById('aliasURL').value ='';
				document.getElementById('lblError').innerHTML='';
			},
			buttons:{
				//Modified by swapnil kamle ok to Add
				"Add":function(){
						Configuration.CheckMode=true;				
				        var actualUrl = jQuery.trim(document.getElementById('actualURL').value);
						var aliasUrl = jQuery.trim(document.getElementById('aliasURL').value);
						
						
					    if(actualUrl=='' || aliasUrl=='' ){
					        document.getElementById('lblError').innerHTML = "Fields marked with asterisk(*) are mandatory!";
					        
					        return false;
					    }
					    else{
					    	
					    	if(actualUrl.indexOf("HTTP")!=-1)
					    		actualUrl = actualUrl.replace("HTTP","http");
					    		
					    	if(actualUrl.indexOf("http") == -1)
                              var actualUrlWithHttp='http://'+actualUrl;
                            else
                              var actualUrlWithHttp=actualUrl;
                            
                            /* Added by shilpa for bug 6856 on 15 march */
                            if(actualUrlWithHttp.indexOf("http://") == -1 && actualUrlWithHttp.indexOf("https://") == -1)
    						{
					    		document.getElementById('lblError').innerHTML = "Please enter correct url";
					        	return false;
					        }/**/
					        
                            //Falg varible
                            //0 - Environment already present in list
                            //1 - Duplicate Alias
                            //2 - Push data
							var flag = 0;
							
							if(Configuration.UATEnvironment.length == 0){
								flag = 2;
							}
							else{
						    	$.each(Configuration.UATEnvironment,function(index,environment){
									if((environment['UATEnvironmentURL'].toString().toLowerCase() == actualUrl.toString().toLowerCase()) && (environment['AliasURL'].toString().toLowerCase() == aliasUrl.toString().toLowerCase())){
										//Environemt Already In List
										document.getElementById('lblError').innerHTML = "Environment already present in list!";
										flag = 0;
										return false;
									}
									else{
										//Check for alias
										if(environment['AliasURL'].toString().toLowerCase() == aliasUrl.toString().toLowerCase()){
											document.getElementById('lblError').innerHTML = "Duplicate Alias! Please give different Alias.";
											flag = 1;
											return false;
										}
										
										else{
											var _environment= {UATEnvironmentURL: actualUrlWithHttp, AliasURL:aliasUrl};
											Configuration.UATEnvironment.push(_environment);
											flag = 2;
		        	            		}
									}
								});
							}
							
							//alert(flag);
							
							if(flag == 2){
							if($('#projectNames').val()!=undefined && $('#testPassNames').val()!=undefined )
								{ 
			        	            //Code Modified by swapnil kamle on 6-8-2012 
			        	            
			        	            if($('#aliasURL').val().length > 50)
			        	            {
			        	            	document.getElementById('lblError').innerHTML = "Alias' length should not exceed 50 characters!";
			        	            }
			        	            else
			        	            {
				        	            //Added by HRW for bug 4243
				        	            //var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$('#projectNames').val()+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$('#testPassNames').val()+'</Value></Eq><Eq><FieldRef Name="actualURL" /><Value Type="Text">'+actualUrlWithHttp+'</Value></Eq></And></And></Where></Query>';
										/* query modified for bug 5786 */
										var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$('#projectNames').val()+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$('#testPassNames').val()+'</Value></Eq><Or><Eq><FieldRef Name="actualURL" /><Value Type="Text">'+actualUrlWithHttp+'</Value></Eq><Eq><FieldRef Name="aliasURL" /><Value Type="Text">'+aliasUrl+'</Value></Eq></Or></And></And></Where></Query>';
										var envItems = Configuration.dmlOperation(query,"Environment");
										if(envItems != null && envItems != undefined)
											document.getElementById('lblError').innerHTML = "Environment already present in list!";
										else
										{	
					        	            var Environment = new Array();
					        	            Environment.push({
											'Title': '',
											'ProjectId': $('#projectNames').val(),
											'TestPassID': $('#testPassNames').val(),
											'actualURL': actualUrlWithHttp== '' ? null :  actualUrlWithHttp,
											 'aliasURL':$('#aliasURL').val() == '' ? null :  $('#aliasURL').val(),
											});
					        	            var EnvironmentList = jP.Lists.setSPObject(Configuration.SiteURL,'Environment'); 
					        	            var result = EnvironmentList.updateItem(Environment);
											
										    if(result.ID!=undefined && $('#actualURL').val()!=undefined && $('#aliasURL').val()!=undefined)
					        	               {
					        	               Configuration.EnvronmentNameForEnvironmentID[result.ID]=actualUrlWithHttp+'`'+$('#aliasURL').val();
					        	               }
					        	            var markup = '<li>';
						                    markup += '<input class="mslChk" type="checkbox" value="'+result['ID']+'"/>';
						                    markup += '<a style="color: blue; padding-left: 6px;" title="' + actualUrlWithHttp + '" href="'+ actualUrlWithHttp +'" target="_blank">' + trimText(aliasUrl,28) +'</a>';
						                    markup += '</li>';
						                    $('#urlboxdiv span').remove();        
						                    $('#urlboxdiv').append(markup);
					                   		 $("#divUrlPopUp").dialog( "close" );
			        	            //
			        	            	}
			        	            }
		        	            }
							}
        	            } 
				},				
				"Cancel":function(){
				    document.getElementById('lblError').innerHTML=" ";
     		    	$( this ).dialog( "close" );
				}
		   }
	});
	
	/*To get the saved portfolio option*/
	/*var queryPortfolio = '<Query></Query>';
	var gPortfolio = Configuration.dmlOperation(queryPortfolio ,'Portfolio');
	if(gPortfolio != null && gPortfolio != undefined)
	{
		$('input[id="portfolioOption'+gPortfolio[0]["EnablePortfolio"]+'"]').attr('checked','checked');
		Configuration.gPortfolio = gPortfolio[0]["EnablePortfolio"];
		Configuration.gPortfolioID = gPortfolio[0]["ID"];
	}
	else
		Configuration.gPortfolio = '0';*/

	/////////////////////////
},
AttachmentWebPartFunc:function()
{			
  		   			$(".ms-attachUploadButtons input:eq(0)").addClass('btnOk');
					$("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
					$("[id$='diidIOSaveItem']").attr("value","Save");
					$("[id$='diidIOSaveItem']").addClass('btn');
},

setPageStateBeforeAttch:function()
{
		var configInfo =$('#projectForFileUpload').val()+"|"+"tab3"+"|"+"0";		
		Main.setCookie("ConfigPageState",configInfo ,null);
},

getDoc:function()
{	
	var arrDoc=new Array();
	//var queryDocuments='<Query><OrderBy><FieldRef Name="fileName" Ascending="False" /></OrderBy></Query>';
	//var getDocsItems = Configuration.dmlOperation(queryDocuments,"DocumentCollection");
	var queryDocuments="<Query><Where><Eq><FieldRef Name='ProjectID' /><Value Type='Text'>"+$('#projectForTester').val()+"</Value></Eq></Where><OrderBy><FieldRef Name='ID' Ascending='True' /></OrderBy><ViewFields><FieldRef Name='ID'/><FieldRef Name='FileName'/><FieldRef Name='FileDescription'/></ViewFields></Query>";
	var getDocsItems = Configuration.dmlOperation(queryDocuments,"ConfigureDocuments");

	if((getDocsItems != 'undefined') && (getDocsItems != null))
	{
				for(var i=0;i<getDocsItems.length ; i++)
				{
					var filesHtml='';
					//var getPath=getDocsItems[i]['filePath'].split(",");
					var getPath=Main.getSiteUrl()+"/Lists/ConfigureDocuments/Attachments/"+getDocsItems[i]["ID"]+"/"+getDocsItems[i]['FileName'].toString();
					var ext = (getDocsItems[i]['FileName']).split('.').pop();
					filesHtml+='<tr><td>';
					switch(ext)
					{
						case "doc":
						case "docx": 
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/icon-word.png"/>';
						}
						break;
						
						case "xls":
						case "xlsx": 
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/icon-excel.png"/>';
						}
						break;
						
						case "ppt":
						case "pptx": 
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/icon-powerpoint.png"/>';
						}
						break;
						
						case "jpg":
						case "jpeg":
						case "gif":
						case "bmp":
						case "png":
						case "bmp":						
						{
							filesHtml+='<img style="vertical-align:middle;" src="../SiteAssets/images/image.png"/>';
						}
						break;

						case "pdf":
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/icon-pdf.png"/>';
						}
						break;
						
						case "msg":
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/outlook.jpg"/>';
						}
						break;

						case "txt":
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/textfileicon.png"/>';
						}
						break;

						
						default:
						{
							filesHtml+='<img style="vertical-align:middle" src="../SiteAssets/images/unknown file.jpg"/>';
						}
						break;
					}
					
					var filedesp = getDocsItems[i]['FileDescription']==undefined?'No Description Available':getDocsItems[i]['FileDescription'];
					filedesp = filedesp.replace(/"/g, "&quot;");
					filesHtml+='<a style="padding-left:5px;vertical-align:middle" href="'+getPath+'" title="'+filedesp+'" class="orange" target="_blank" >'+trimText(getDocsItems[i]['AttachmentName'],60)+'</a></td></tr>';
					arrDoc.push(filesHtml);

				}
	}
		
	return arrDoc;
},
getServrsFrLogInUser:function()
{
		//var queryForServers='<Query><Where><Eq><FieldRef Name="Alias" /><Value Type="Text">'+userName+'</Value></Eq></Where><OrderBy><FieldRef Name="Title" Ascending="False" /></OrderBy><ViewFields><FieldRef Name="ID"/><FieldRef Name="AliasURL"/><FieldRef Name="UATEnvironmentURL"/></ViewFields></Query>';
		var queryForServers='<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$('#projectForTester').val()+'</Value></Eq><And><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq><Eq><FieldRef Name="TestPassId" /><Value Type="Text">'+$('#testPassforPrj').val()+'</Value></Eq></And></And></Where><OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy><ViewFields><FieldRef Name="ID"/><FieldRef Name="AliasURL"/><FieldRef Name="UATEnvironmentURL"/><FieldRef Name="TestPassId"/><FieldRef Name="TestPassName"/></ViewFields></Query>';
		var getItems = Configuration.dmlOperation(queryForServers,"UserSetting");
		var urlArray=new Array();
		
		if((getItems != 'undefined') && (getItems != null))
		{
			var htmlAlert="";
			var EnvironmentIDs=new Array;
			for(var i=0;i<getItems.length; i++)
			{
			   // EnvironmentIDs.push(.split('|'));
			    temp =getItems[i]['EnvironmentID'].split('|');
						temp.splice(temp.length-1,1);
						$.merge(EnvironmentIDs,temp);

			}
			for(var i=0;i<EnvironmentIDs.length; i++)
			{
				var actualUrl='';
				var aliasUrl='';
					    
						actualUrl=Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split('`')[0];
					
						aliasUrl=Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split('`')[1];
					
					htmlAlert+='<a style="color:blue;padding-left:6px" target="_blank" Title='+actualUrl+' href="'+actualUrl+'">'+aliasUrl+'</a><br/>';
			}
				
			//for(var p=0;p<urlArray.length;p++)
			//htmlAlert+='<a style="color:blue;padding-left:4px" href="'+urlArray[p]+'">'+urlArray[p]+'</a><br/>';	
			//htmlAlert+='<a style="color:blue;padding-left:4px" Title='+getItems[i]["UATEnvironmentURL"]+'href="'+urlArray[p]+'">'+urlArray[p]+'</a><br/>';	
			$("#urltextboxdiv").empty();
			$("#urltextboxdiv").html(htmlAlert);
			//urltextboxdiv
		}
		else
		{
			$("#urltextboxdiv").empty();
			$("#urltextboxdiv").html('<span class="msgSpan">No '+Configuration.gEnvironmentLabelText+' Created</span>');

		 }	
},

/*Code for sending mail to ADMIN*/
sendMail:function(){
				var usersArray=new Array();
			/*	if($("#serversDiv li").find(":checked").length==0)
				{
					Configuration.alertBox4("Please select the servers first.");
				}
				else
				{
						$("#serversDiv li").each(function()
						{
							if($(this).children(".mslChk").attr('checked') == true)
							{
								var ids=$(this).children(".mslChk").attr("ID");
						 		var usersNames=$("span[id="+ids+"]").text();
						 		usersArray.push(usersNames);
					 		}                 
						}) */
						/*below line commented by nitu on 18 dec 2012 to create array for demaon names urls */
						usersArray=$('#urltextboxdiv').find('a').toArray();
							if($('#sendEmailAnchor').attr('href'))
							$("#sendEmailAnchor").removeAttr('href');//code added by nitu to remove href tag while checking new entry on 19 dec 2012

						if(usersArray.length==0)
		          		{
		          			//Configuration.alertBox('Sorry! No Environment is alloted to you');
		          			Configuration.alertBox('Sorry! No '+Configuration.gEnvironmentLabelText+' is alloted to you');//:SD

		          		}
					else
		          		{
					//	usersArray.push('deepak@rgensolutions.com');
							var adminMailId = "admin@demo.com";
							/* Code by nitu dated 18Dec 2012 to get current user namre for mail request by admin*/
							var MUserID=Main.getSiteUser();
							MUserID=MUserID.substring(8);
						var mailSubject = "Request For Access to '" +MUserID+"'";  //"Request For Access to 'Url of environment'";  
		          		var mailBody = "Please provide access to user '"+MUserID+"'  for the following Environments :%0A%0A"; // "Please provide the access to ‘url of environment’ for user "
		          		if(usersArray != undefined || usersArray != null)
		          		{
		          		
		          			for(var y=0;y<usersArray.length;y++)
			          		{
			          		mailBody+=usersArray[y]+"%0A%0A";
			          		}
		          		}
		          		//mailBody =mailBody .text();
		          		$("#sendEmailAnchor").attr("href","mailto:"+adminMailId+"?Subject="+mailSubject+"&body="+mailBody.replace(/#/g,"")+"");
		          		}
          //	}
},

	
/*startIndexTIncrement:function (){
            if(Configuration.gAttlength>Configuration.startIndex+5)
				Configuration.startIndex+=5;
},
startIndexTDecrement:function (){
            if(Configuration.startIndex>0)
				Configuration.startIndex-=5;
},*/   // Commented by ekta and below code edited by Ekta
startIndexTIncrement:function (){
            if(Configuration.gAttlength>Configuration.startIndex+5)
				Configuration.startIndex+=5;
},
startIndexTDecrement:function (){
            if(Configuration.startIndex>0)
				Configuration.startIndex-=5;
},

/*grid*/
tab1Save:function()
{
	Configuration.getServrsFrLogInUser();
	Configuration.gridDetails();
	noActHandle();
	initDocPagination();
	
	/* Added by shilpa for bug 6747 on 13 march */
	if($('#process table tbody').find('tr').length == 0)
	{
		Configuration.startIndexTDecrement();
		Configuration.gridDetails();
	}
},
gridDetails:function()
{
	var gridDetails='<p class="clear"/>'+
		'<table class="gridDetails" cellSpacing="0">'+
			'<thead>'+
				'<tr class="hoverRow">'+
					/*'<td style="width: 5%;" class="tblhd center"><span>#</span></td>'+
					'<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>AS-IS</span></td>'+					
					'<td style="width: 20%;" class="tblhd"><span>AS-IS Description</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>TO-BE</span></td>'+
					'<td style="width: 20%;" class="tblhd"><span>TO-BE Description</span></td>'+*/
					//Header text formed as per label text for configurable values from resource xml file//:SD
					'<td style="width: 5%;" class="tblhd center"><span>#</span></td>'+
					'<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>AS IS</span></td>'+					
					'<td style="width: 20%;" class="tblhd"><span>AS IS Description</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>TO BE</span></td>'+
					'<td style="width: 20%;" class="tblhd"><span>TO BE Description</span></td>'+										
					//'<td style="width: 10%;" class="tblhd center"><span>Edit Item</span></td>'+
				'</tr>'+
			'</thead>'+
			'<tbody>';
			
			var url=Main.getSiteUrl();
			var listname=jP.Lists.setSPObject(url,'Processes');
			//var camlQuery='<Query><Where><Neq><FieldRef Name="ProjectID" /><Value Type="Text">null</Value></Neq></Where></Query>';
			var camlQuery='<Query><Where><Eq><FieldRef Name="ProjectID" /><Value Type="Text">'+$('#projectForTester').val()+'</Value></Eq></Where>';
			camlQuery+='<OrderBy><FieldRef Name="ID" Ascending="True" /></OrderBy>';
			//camlQuery+='<ViewFields><FieldRef Name="ID"/></ViewFields>';
			camlQuery+='</Query>';
						
			var result=listname.getSPItemsWithQuery(camlQuery).Items;
			var cnt=0;
			if(result != null && result != undefined)
			{
				$('#paging').show();
				
				var resultLength =  result.length;
				Configuration.gAttlength=resultLength ;
				if(resultLength >=(Configuration.startIndex+5))
					Configuration.Ei=Configuration.startIndex+5;
				else
					Configuration.Ei=resultLength;
	
				for(var i=Configuration.startIndex;i<Configuration.Ei;i++)
				{
					cnt=i+1;
					
					/* Added by shilpa for bug 5605 on 11th March */
					var asIS = result[i]["AsIsID"].replace(/"/g, "&quot;"); 
					asIS = asIS.replace(/'/g, '&#39;');
					if(result[i]["AsIsDescription"] != null && result[i]["AsIsDescription"] != undefined )
					{
						var asISDesc = result[i]["AsIsDescription"].replace(/"/g, "&quot;");
						asISDesc = asISDesc.replace(/'/g, '&#39;');
					}
					var toBe = result[i]["ToBeID"].replace(/"/g, "&quot;"); 
					toBe = toBe.replace(/'/g, '&#39;');
					if(result[i]["ToBeDescription"] != null && result[i]["ToBeDescription"] != undefined )
					{
						var toBeDesc = result[i]["ToBeDescription"].replace(/"/g, "&quot;"); 
						toBeDesc = toBeDesc.replace(/'/g, '&#39;');
					}

					gridDetails+='<tr>'+
						'<td class="center">'+cnt+'</td>'+
						//'<td>'+document.getElementById('projectNamesForProcess').options[document.getElementById('projectNamesForProcess').selectedIndex].title+'</td>'+ // Added by shilpa for bug 5277
						'<td title="'+$("#projectForTester option:selected").attr('title')+'">'+trimText($("#projectForTester option:selected").attr('title'),37)+'</td>'+
						'<td title="'+asIS+'">'+((result[i]["AsIsID"] == null || result[i]["AsIsID"] == undefined )?"-":trimText(result[i]["AsIsID"],30))+'</td>'+
						'<td title="'+((result[i]["AsIsDescription"] == null || result[i]["AsIsDescription"] == undefined )?"-":asISDesc)+'">'+((result[i]["AsIsDescription"] == null || result[i]["AsIsDescription"] == undefined )?"-":trimText(result[i]["AsIsDescription"],30))+'</td>'+						
						'<td title="'+toBe+'">'+((result[i]["ToBeID"] == null || result[i]["ToBeID"] == undefined )?"-":trimText(result[i]["ToBeID"],30))+'</td>'+
						'<td title="'+((result[i]["ToBeDescription"] == null || result[i]["ToBeDescription"] == undefined )?"-":toBeDesc)+'">'+((result[i]["ToBeDescription"] == null || result[i]["ToBeDescription"] == undefined )?"-":trimText(result[i]["ToBeDescription"],30))+'</td>'+
						//'<td class="center"><a onclick="Configuration.fillForm('+result[i]["ID"]+')"  title="Edit Process Details"  class="pedit" style="cursor:Pointer"></a>'+
						//'<a onclick="Configuration.delProcess('+result[i]["ID"]+');" title="Delete process"  class="pdelete" style="cursor:Pointer"></a></td>'+
					'</tr>';
				}
				gridDetails+='</tbody>'+
							'</table>';	
													
			$("#process").html(gridDetails);
			resource.UpdateTableHeaderText();//:SD
 			var info='<label>Showing '+(Configuration.startIndex+1)+ '-'+Configuration.Ei+' Processes of Total '+(result).length+' Processes </label> | <a id="previous" style="cursor:pointer" onclick="Configuration.startIndexTDecrement();Configuration.gridDetails()">Previous</a> | <a  id="next" style="cursor:pointer" onclick="Configuration.startIndexTIncrement();Configuration.gridDetails()">Next</a>';
 			$('#paging').empty();
 			$("#paging").append(info); 

				if(Configuration.startIndex<=0) 
		        {   
					document.getElementById('previous').disabled="disabled";  
					document.getElementById('previous').style.color="#989898";
				}
				else
					document.getElementById('previous').disabled=false;
				     
				if(resultLength <=((Configuration.startIndex)+5)) 
				{
					document.getElementById('next').disabled="disabled";  
				    document.getElementById('next').style.color="#989898";
				}
				else
					document.getElementById('next').disabled=false;
			}
			else
			{
				$("#process").empty();
				//$("#process").append("<p class='clear'></p><h3>There are no Processes.</h3>");
				$("#process").append("<p class='clear'></p><span class='msgSpan'>No Processes Available</span>");
				$('#paging').hide();
			}
},

/* Function to get result of query by passing query and name of list */
dmlOperation:function(search,list){
		var listname = jP.Lists.setSPObject(Configuration.SiteURL,list);	
		var query = search;
		var result = listname.getSPItemsWithQuery(query).Items;
		return (result);
},

//code added on 16 March Application URL related code//
fUrlPopUp:function()
{
		$("#dialog:ui-dialog" ).dialog( "destroy" ); 
		$("#divUrlPopUp").dialog("open");
		
		$("#actualURL").val('');
		$("#aliasURL").val('');
},
	
fUrlPopUpUpdate:function()
{
     	if($("#urlboxdiv li").find(":checked").length==0)
		{
			//Configuration.alertBox("Select the Environment first!");
			Configuration.alertBox("Select the "+Configuration.gEnvironmentLabelText+" first!");//:SD
		}
	  	else if($("#urlboxdiv li").find(":checked").length>1)
		{
			//Configuration.alertBox("Select one Environment at a time!");
			Configuration.alertBox("Select one "+Configuration.gEnvironmentLabelText+" at a time!");//:SD
		}
		else
		{
			$("#dialog:ui-dialog" ).dialog( "destroy" ); 
			$("#divUrlPopUpUpdate").dialog("open");
			
		}
		//$("#actualURLUpdate").val('');
		//$("#aliasURLUpdate").val('');
},
	
/////////////*************///////////
populateProjectName:function()
{	
	 	var ProjNames=new Array();  
		if($.inArray('2',security.userType)!=-1 || $.inArray('5',security.userType)!=-1)
		{
			
			//alert("user"+$('#userW').text());
			var temp=$('#userW').text();
			if(temp.indexOf("//")!=-1)
				temp=temp.substring(0,temp.indexOf("//"));
			//alert($('#userW').text());
			temp=jQuery.trim(temp);
			
			//Modified for Stakeholder
		 var query = '<Query><Where><Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq><Contains><FieldRef Name="stakeholderSPUserID" /><Value Type="Text">|'+_spUserId+'|</Value></Contains></Or></Where></Query>';
		 ProjNames = Configuration.dmlOperation(query,'Project');
		
		var PrjectIDs=new Array();
			if(ProjNames != null || ProjNames != undefined)
	        {
		         for(var h=0;h<ProjNames.length;h++)
			       PrjectIDs.push(ProjNames[h]['ID']); 
			}
		}
		
		if(($.inArray('3',security.userType)!=-1))
		{
		
		  /*var temp=$('#userW').text();
			if(temp.indexOf("//")!=-1)
				temp=temp.substring(0,temp.indexOf("//"));
			//alert($('#userW').text());
			temp=jQuery.trim(temp);

		  QueryTestPass ='<Query><Where>'+
					      '<Or><Eq>'+
					         '<FieldRef Name="Tester" />'+
					         '<Value Type="Text">'+temp+'</Value>'+
					      '</Eq><Eq><FieldRef Name="tstMngrFulNm" /><Value Type="Text">'+temp+'</Value></Eq></Or>'+
					   '</Where>'+
					   '<OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy>'+
                      '<ViewFields>'+
                      '<FieldRef Name="projectId" />'+
                       '</ViewFields>'+
                      '</Query>'; */
          QueryTestPass ='<Query><Where><Eq><FieldRef Name="SPUserID"/><Value Type="Text">'+_spUserId+'</Value></Eq>'+
                         '</Where><OrderBy><FieldRef Name="ID" Ascending="True"/></OrderBy><ViewFields><FieldRef Name="ProjectId" /></ViewFields></Query>';
		  QueryTestPassListItems =   Configuration.dmlOperation(QueryTestPass,'TestPass');		  
			
			var camlQuery ='';		  
			if(QueryTestPassListItems.length<=147)
		    {
				if(QueryTestPassListItems != null || QueryTestPassListItems != undefined)
				{	    
				    var numberOfIterations=0;
				    var OrEndTags='';
				    
					    camlQuery = '<Query><Where>';
						for(var i=0;i<(QueryTestPassListItems.length)-1;i++)			 
							{
							 camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+QueryTestPassListItems[i]['ProjectId']+'</Value></Eq>';
						     OrEndTags+='</Or>';
							}
							camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+QueryTestPassListItems[i]['ProjectId']+'</Value></Eq>';
							camlQuery +=OrEndTags;
							camlQuery +='</Where><ViewFields><FieldRef Name="projectId" /><FieldRef Name="projectName" /><FieldRef Name="prjLeadFulNm" /><FieldRef Name="projectLead" /><FieldRef Name="description" /><FieldRef Name="status"/><FieldRef Name="url" /><FieldRef Name="appUrl" /></ViewFields></Query>';				
			 	}
				  if(ProjNames != null || ProjNames != undefined)
			      {
				       if(ProjNames.length==0)
					   		ProjNames=Configuration.dmlOperation(camlQuery ,'Project');
			           else
			           {   
			           		//var camlQuery = '<Query><Where>'; 
			           		var temp=Configuration.dmlOperation(camlQuery ,'Project');
			           		if(temp!=null && temp!=undefined)
			           		{
						   		for(var t=0;t<temp.length;t++)
						   		{
							   		if($.inArray(temp[t]['ID'],PrjectIDs )==-1)
							   			ProjNames.push(temp[t]);
						   		}
						   }
					   }
				   }
			}
			else
			{
			
				var numberOfIterations = Math.ceil(QueryTestPassListItems.length/147);
				var iterationPoint=0;
				var temp= new Array();
				var OrEndTags;
				for(var y=0;y<numberOfIterations-1;y++)
				{
				   
				    OrEndTags='';
				    camlQuery = '<Query><Where>';
					for(var i=iterationPoint;i<147+iterationPoint-1;i++)	
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+QueryTestPassListItems[i]['ProjectId']+'</Value></Eq>';
						OrEndTags+='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+QueryTestPassListItems[i]['ProjectId']+'</Value></Eq>';
					camlQuery +=OrEndTags;
					camlQuery +='</Where><ViewFields><FieldRef Name="projectId" /><FieldRef Name="projectName" /><FieldRef Name="prjLeadFulNm" /><FieldRef Name="projectLead" /><FieldRef Name="description" /><FieldRef Name="status"/><FieldRef Name="url" /><FieldRef Name="appUrl" /></ViewFields></Query>';				
			 		
					$.merge(temp,Configuration.dmlOperation(camlQuery ,'Project'));
					iterationPoint+=147;
				}
				
				  	OrEndTags='';
				    camlQuery = '<Query><Where>';
					for(var i=iterationPoint;i<(QueryTestPassListItems.length)-1;i++)	
					{
						camlQuery +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+QueryTestPassListItems[i]['ProjectId']+'</Value></Eq>';
						OrEndTags+='</Or>';
					}
					camlQuery += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+QueryTestPassListItems[i]['ProjectId']+'</Value></Eq>';
					camlQuery +=OrEndTags;
					camlQuery +='</Where><ViewFields><FieldRef Name="projectId" /><FieldRef Name="projectName" /><FieldRef Name="prjLeadFulNm" /><FieldRef Name="projectLead" /><FieldRef Name="description" /><FieldRef Name="status"/><FieldRef Name="url" /><FieldRef Name="appUrl" /></ViewFields></Query>';				
					$.merge(temp,Configuration.dmlOperation(camlQuery ,'Project'));
				
					if(temp!=null && temp!=undefined)
	           		{
				   		for(var t=0;t<temp.length;t++)
				   		{
					   		if($.inArray(temp[t]['ID'],PrjectIDs )==-1)
					   			ProjNames.push(temp[t]);
				   		}
				   }
			}
				   
		   //project.ProjectListItems.push( (project.ProjectList).getSPItemsWithQuery(camlQuery).Items);    	                          
		
		}
		if($.inArray('1',security.userType)!=-1 )
		{
			var query = '<Query><OrderBy><FieldRef Name="ID" Ascending="True" /></OrderBy>'+
						'<ViewFields><FieldRef Name="ID"/><FieldRef Name="projectName" /><FieldRef Name="projectLead" /></ViewFields>'+
						'</Query>';
			 ProjNames = Configuration.dmlOperation(query,'Project');			
		}
		
		var tempProjArr = new Array();
		var tempProjNmArr = new Array();
		var j = 0;
		if( ProjNames != null || ProjNames != undefined)
		{
			//$('#btnSaveProcess').removeAttr('disabled');

			for(var i=0;i<ProjNames.length;i++)
			{	
				if( (ProjNames[i]['projectName'] != null || ProjNames[i]['projectName']!= undefined ) && $.inArray(ProjNames[i]['projectName'],tempProjNmArr) ==-1 )
				{		
				
 					tempProjNmArr.push(ProjNames[i]['projectName']);
					/*var obj=new Option();
					document.getElementById('projectNames').options[i]=obj;
					document.getElementById('projectNames').options[i].text = trimText((ProjNames [i]['projectName'].toString()),48);
					document.getElementById('projectNames').options[i].value = ProjNames [i]['ID'].toString();*/
					
					var obj=new Option();
					var objProcess=new Option();
					var objPrjFileUpload = new Option();										
					document.getElementById('projectNames').options[j]=obj;
					document.getElementById('projectNames').options[j].text = trimText(ProjNames[i]['projectName'].toString(),48);
					document.getElementById('projectNames').options[j].title=ProjNames[i]['projectName'].toString();
					document.getElementById('projectNames').options[j].value = ProjNames[i]['ID'].toString(); 
					document.getElementById('projectNamesForProcess').options[j]= objProcess;
					document.getElementById('projectNamesForProcess').options[j].text = trimText(ProjNames[i]['projectName'].toString(),48);
					document.getElementById('projectNamesForProcess').options[j].title=ProjNames[i]['projectName'].toString();
					document.getElementById('projectNamesForProcess').options[j].value = ProjNames[i]['ID'].toString(); 
					document.getElementById('projectForFileUpload').options[j]=objPrjFileUpload;
					document.getElementById('projectForFileUpload').options[j].text = trimText(ProjNames[i]['projectName'].toString(),48);
					document.getElementById('projectForFileUpload').options[j].title=ProjNames[i]['projectName'].toString();
					document.getElementById('projectForFileUpload').options[j].value = ProjNames[i]['ID'].toString(); 
					
					obj=new Option();
					document.getElementById('projectForGS').options[j]=obj;
					document.getElementById('projectForGS').options[j].text = trimText(ProjNames[i]['projectName'].toString(),48);
					document.getElementById('projectForGS').options[j].title=ProjNames[i]['projectName'].toString();
					document.getElementById('projectForGS').options[j].value = ProjNames[i]['ID'].toString(); 
					j++;
				}
				
				//Code added by Ejaz Waquif for Portfolio 
				//To Fill the project and version on global array 
				if(Configuration.isPortfolioOn)
				{
	   			if( $.inArray( ProjNames[i]['projectName'] , tempProjArr)== -1 )
	   			{
	   			    tempProjArr.push(ProjNames[i]['projectName']);
	   				//var version = ProjNames[i]['ProjectVersion'] == undefined ||ProjNames[i]['ProjectVersion']==null ||ProjNames[i]['ProjectVersion']==""?"No Version":ProjNames[i]['ProjectVersion'];
	   			    var version = ProjNames[i]['ProjectVersion'] == undefined ||ProjNames[i]['ProjectVersion']==null ||ProjNames[i]['ProjectVersion']==""?"Default "+Configuration.gConfigVersion:ProjNames[i]['ProjectVersion'];//Added by Mohini for Resource file
	   				Configuration.getVersionByProjByName[ProjNames[i]['projectName']] = new Array();
	   				Configuration.getVersionByProjByName[ProjNames[i]['projectName']].push({
	   				
	   					'ProjectID':ProjNames[i]['ID'],
	   					'Version':version
	   				});
	   			}
	   			else
	   			{
	   			   //var version = ProjNames[i]['ProjectVersion'] == undefined ||ProjNames[i]['ProjectVersion']==null ||ProjNames[i]['ProjectVersion']==""?"No Version":ProjNames[i]['ProjectVersion'];
	   				var version = ProjNames[i]['ProjectVersion'] == undefined ||ProjNames[i]['ProjectVersion']==null ||ProjNames[i]['ProjectVersion']==""?"Default "+Configuration.gConfigVersion:ProjNames[i]['ProjectVersion'];//Added by Mohini for Resource file
	   				Configuration.getVersionByProjByName[ProjNames[i]['projectName']].push({
	   				
	   					'ProjectID':ProjNames[i]['ID'],
	   					'Version':version
	   				});
	
	   			}
	   		    }
			}
   			if(Configuration.isPortfolioOn)
			{
   			//Bind the version for selected project
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectForGS option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectForGSVersion").html(versionMarkup);
			$("#projectNamesVersion").html(versionMarkup);
			$("#projectForFileUploadVersion").html(versionMarkup);
			$("#projectNamesForProcessVersion").html(versionMarkup);
			}
		}
		else
		{
			var obj=new Option();
			document.getElementById('projectNames').options[0]=obj;
			//document.getElementById('projectNames').options[0].text = "No Project Available";
			document.getElementById('projectNames').options[0].text = "No "+Configuration.gConfigProject+" Available";
			var objProcess=new Option();
			var objPrjFileUpload = new Option();
			document.getElementById('projectNamesForProcess').options[0]= objProcess;
			//document.getElementById('projectNamesForProcess').options[0].text = "No Project Available";
			document.getElementById('projectNamesForProcess').options[0].text = "No "+Configuration.gConfigProject+" Available";
			document.getElementById('projectForFileUpload').options[0]=objPrjFileUpload;
			//document.getElementById('projectForFileUpload').options[0].text = "No Project Available";
			document.getElementById('projectForFileUpload').options[0].text = "No "+Configuration.gConfigProject+" Available";
			
			obj=new Option();
			document.getElementById('projectForGS').options[0]=obj;
			//document.getElementById('projectForGS').options[0].text = "No Project Available";
			document.getElementById('projectForGS').options[0].text = "No "+Configuration.gConfigProject+" Available";
			
			//For Version
			if(Configuration.isPortfolioOn)
			{
				var obj=new Option();
				document.getElementById('projectNamesVersion').options[0]=obj;
				document.getElementById('projectNamesVersion').options[0].text = "No "+Configuration.gConfigVersion+" Available";
				
				var objProcess=new Option();
				document.getElementById('projectNamesForProcessVersion').options[0]= objProcess;
				document.getElementById('projectNamesForProcessVersion').options[0].text = "No "+Configuration.gConfigVersion+" Available";
				
				var objPrjFileUpload = new Option();
				document.getElementById('projectForFileUploadVersion').options[0]=objPrjFileUpload;
				document.getElementById('projectForFileUploadVersion').options[0].text = "No "+Configuration.gConfigVersion+" Available";
				
				var obj=new Option();
				document.getElementById('projectForGSVersion').options[0]=obj;
				document.getElementById('projectForGSVersion').options[0].text = "No "+Configuration.gConfigVersion+" Available";
            }
		}
},						

populateTestPass:function()
{
		//////////////
		document.getElementById('testPassNames').disabled = false;
		var userDesignationForProject = new Array();
		if(security.userAssociationForProject[$("#projectNames").val()]!=undefined)
			userDesignationForProject = security.userAssociationForProject[$("#projectNames").val()].split(",");
		if(($.inArray('3',userDesignationForProject)!=-1) && ($.inArray('2',userDesignationForProject)==-1)
		   && ($.inArray('1',security.userType)==-1) && ($.inArray('5',userDesignationForProject)==-1))
		{
			var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$("#projectNames").val()+'</Value></Eq><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq></And></Where>';
			query += '<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/><FieldRef Name="autoApprovalForTesting" /><FieldRef Name="choiceForName"/></ViewFields>';
			query +='<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
		}  
		else
		{
			//for lead or admin fill all the testpass
			var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectNames").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/><FieldRef Name="autoApprovalForTesting" /><FieldRef Name="choiceForName"/></ViewFields>'+
				'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
		}
		 
		var TestPassName = Configuration.dmlOperation(query,'TestPass');
		$('#testPassNames').empty();		
		if( TestPassName != null && TestPassName != undefined)
		{									
			for(var i=0;i<TestPassName.length;i++)
			{			 					
				var obj=new Option();									
				document.getElementById('testPassNames').options[i]=obj;
				document.getElementById('testPassNames').options[i].text = trimText(TestPassName[i]['TestPassName'].toString(),35);
				document.getElementById('testPassNames').options[i].title=TestPassName[i]['TestPassName'].toString();
				document.getElementById('testPassNames').options[i].value = TestPassName[i]['ID'].toString(); 
				if(Configuration.GSTestPassFlag == 0)
				{
					obj=new Option();									
					document.getElementById('tpForGS').options[i]=obj;
					document.getElementById('tpForGS').options[i].text = trimText(TestPassName[i]['TestPassName'].toString(),35);
					document.getElementById('tpForGS').options[i].title=TestPassName[i]['TestPassName'].toString();
					document.getElementById('tpForGS').options[i].value = TestPassName[i]['ID'].toString();
				}
				Configuration.forTPIDGetAutoAprv[TestPassName[i]['ID']] = TestPassName[i]['autoApprovalForTesting'];
				Configuration.forTPIDGetChoiceForName[TestPassName[i]['ID']] = TestPassName[i]['choiceForName'];
				Configuration.forTPIDGetTestingType[TestPassName[i]['ID']] = TestPassName[i]['testingType'];
				Configuration.forTPIDGetfeedbackRating[TestPassName[i]['ID']] = TestPassName[i]['feedbackRating'];
			}
		}
		else
		{
			var obj=new Option();
			document.getElementById('testPassNames').options[0]=obj;
			//document.getElementById('testPassNames').options[0].text = "No Test Pass Available";
			document.getElementById('testPassNames').options[0].text = "No "+Configuration.gConfigTestPass+" Available";//:SD
			document.getElementById('testPassNames').options[0].value = "0"; 
			if(Configuration.GSTestPassFlag == 0)
			{
				obj=new Option();
				document.getElementById('tpForGS').options[0]=obj;
				//document.getElementById('tpForGS').options[0].text = "No Test Pass Available";
				document.getElementById('tpForGS').options[0].text = "No "+Configuration.gConfigTestPass+" Available";//:SD
				document.getElementById('tpForGS').options[0].value = "0"; 
			}	
		}
		if(Configuration.GSTestPassFlag == 0)
		{
			if( TestPassName != null && TestPassName != undefined)
			{
				if(TestPassName[0]['autoApprovalForTesting'] == "Yes")
					$("#autoApproval").attr('checked',true);
				else
					$("#autoApproval").attr('checked',false);	
				if(TestPassName[0]['choiceForName'] == "1")
					$("#TSNameConstraint1").attr('checked',true);
				else
					$("#TSNameConstraint0").attr('checked',true);	
					
				if(TestPassName[0]['testingType'] == "2")
					$("#testingType2").attr('checked',true);
				else if(TestPassName[0]['testingType'] == "1")
					$("#testingType1").attr('checked',true);
					else
						$("#testingType0").attr('checked',true);
				
				if(TestPassName[0]['feedbackRating'] == "2")
					$("#feedbackRating2").attr('checked',true);
				else if(TestPassName[0]['feedbackRating'] == "1")
					$("#feedbackRating1").attr('checked',true);
					else
						$("#feedbackRating0").attr('checked',true);	
			}		
			Configuration.populateRoles();
		}	
		Configuration.GSTestPassFlag = 1;
},

GSProjectChange:function()
{
	        //Code added by Ejaz Waquif for Portfolio
			//Bind the version for selected project
			if(Configuration.isPortfolioOn)
			{
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectForGS option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectForGSVersion").html(versionMarkup);
		    }
		
		//End Code added by Ejaz Waquif for Portfolio


},

GSVersionChange:function()
{
	if($('#projectForGSVersion option:selected').val()!= "" && $('#projectForGSVersion option').length >1)
	{
		$("#projectForGS option:selected").val($('#projectForGSVersion option:selected').val());
		Configuration.populateTPForGS();	
	}

},

USProjectChange:function()
{
	        //Code added by Ejaz Waquif for Portfolio
			//Bind the version for selected project
			if(Configuration.isPortfolioOn)
			{
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectNames option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectNamesVersion").html(versionMarkup);
		    }
		//End Code added by Ejaz Waquif for Portfolio


},

USVersionChange:function()
{
	if($('#projectNamesVersion option:selected').val()!= "" && $('#projectNamesVersion option').length >1)
	{
		$("#projectNames option:selected").val($('#projectNamesVersion option:selected').val());
		Configuration.clearFields();Configuration.populateTestPass();Configuration.populateEnvironments();Configuration.resetAddModeUserSetting();
	}

},

DLProjectChange:function()
{
	        //Code added by Ejaz Waquif for Portfolio
			//Bind the version for selected project
			if(Configuration.isPortfolioOn)
			{
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectForFileUpload option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectForFileUploadVersion").html(versionMarkup);
		    }
		//End Code added by Ejaz Waquif for Portfolio


},

DLVersionChange:function()
{
	if($('#projectForFileUploadVersion option:selected').val()!= "" && $('#projectForFileUploadVersion option').length >1)
	{
		$("#projectForFileUpload option:selected").val($('#projectForFileUploadVersion option:selected').val());
		Configuration.bindUploadedFileGrid();
	}

},

PDProjectChange:function()
{
	        //Code added by Ejaz Waquif for Portfolio
			//Bind the version for selected project
			if(Configuration.isPortfolioOn)
			{
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectNamesForProcess option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectNamesForProcessVersion").html(versionMarkup);
		    }
		//End Code added by Ejaz Waquif for Portfolio


},

PDVersionChange:function()
{
	if($('#projectNamesForProcessVersion option:selected').val()!= "" && $('#projectNamesForProcessVersion option').length >1)
	{
		$("#projectNamesForProcess option:selected").val($('#projectNamesForProcessVersion option:selected').val());
		Configuration.clearProcessFields();Configuration.gridDetailsForProcess();
	}

},




forTPIDGetAutoAprv:new Array(),
forTPIDGetChoiceForName:new Array(),
forTPIDGetTestingType:new Array(),
forTPIDGetfeedbackRating:new Array(),
populateTPForGS:function()
{
		var userDesignationForProject = new Array();
		if(security.userAssociationForProject[$("#projectForGS").val()]!=undefined)
			userDesignationForProject = security.userAssociationForProject[$("#projectForGS").val()].split(",");
		if(($.inArray('3',userDesignationForProject)!=-1) && ($.inArray('2',userDesignationForProject)==-1)
		   && ($.inArray('1',security.userType)==-1) && ($.inArray('5',userDesignationForProject)==-1))
		{
			var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$("#projectForGS").val()+'</Value></Eq><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq></And></Where>';
			query += '<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/><FieldRef Name="autoApprovalForTesting" /><FieldRef Name="choiceForName"/></ViewFields>';
			query +='<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
		}  
		else
		{
			//for lead or admin fill all the testpass
			var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectForGS").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/><FieldRef Name="autoApprovalForTesting" /><FieldRef Name="choiceForName"/></ViewFields>'+
				'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
		}
		 
		var TestPassName = Configuration.dmlOperation(query,'TestPass');
		$('#tpForGS').empty();		
		if( TestPassName != null || TestPassName != undefined)
		{									
			for(var i=0;i<TestPassName.length;i++)
			{			 					
				var obj=new Option();									
				document.getElementById('tpForGS').options[i]=obj;
				document.getElementById('tpForGS').options[i].text = trimText(TestPassName[i]['TestPassName'].toString(),50);
				document.getElementById('tpForGS').options[i].title=TestPassName[i]['TestPassName'].toString();
				document.getElementById('tpForGS').options[i].value = TestPassName[i]['ID'].toString();
				
				Configuration.forTPIDGetAutoAprv[TestPassName[i]['ID']] = TestPassName[i]['autoApprovalForTesting'];
				Configuration.forTPIDGetChoiceForName[TestPassName[i]['ID']] = TestPassName[i]['choiceForName'];
				Configuration.forTPIDGetTestingType[TestPassName[i]['ID']] = TestPassName[i]['testingType'];
				Configuration.forTPIDGetfeedbackRating[TestPassName[i]['ID']] = TestPassName[i]['feedbackRating'];
			}
			
			if(TestPassName[0]['autoApprovalForTesting'] == "Yes")
				$("#autoApproval").attr('checked',true);
			else
				$("#autoApproval").attr('checked',false);	
				
			if(TestPassName[0]['choiceForName'] == "1")
				$("#TSNameConstraint1").attr('checked',true);
			else
				$("#TSNameConstraint0").attr('checked',true);
			
			if(TestPassName[0]['testingType'] == "2")
				$("#testingType2").attr('checked',true);
			else if(TestPassName[0]['testingType'] == "1")
				$("#testingType1").attr('checked',true);
				else
					$("#testingType0").attr('checked',true);
			
			if(TestPassName[0]['feedbackRating'] == "2")
					$("#feedbackRating2").attr('checked',true);
				else if(TestPassName[0]['feedbackRating'] == "1")
					$("#feedbackRating1").attr('checked',true);
					else
						$("#feedbackRating0").attr('checked',true);	
		}
		else
		{
			var obj=new Option();
			document.getElementById('tpForGS').options[0]=obj;
			//document.getElementById('tpForGS').options[0].text = "No Test Pass Available";
			document.getElementById('tpForGS').options[0].text = "No "+Configuration.gConfigTestPass+" Available";//:SD
			document.getElementById('tpForGS').options[0].value = "0"; 
			
			$("#testingType0").attr('checked',true);
			$("#TSNameConstraint0").attr('checked',true);
			$("#autoApproval").attr('checked',false);
			$("#feedbackRating0").attr('checked',true);	
		}
		Configuration.populateRoles();
},
testPassDDChange:function()
{
	if(Configuration.forTPIDGetAutoAprv[ $("#tpForGS").val() ] == "Yes")
		$("#autoApproval").attr('checked',true);
	else
		$("#autoApproval").attr('checked',false);	
		
	if(Configuration.forTPIDGetChoiceForName[ $("#tpForGS").val() ] == "1")
		$("#TSNameConstraint1").attr('checked',true);
	else
		$("#TSNameConstraint0").attr('checked',true);
	
	if(Configuration.forTPIDGetTestingType[ $("#tpForGS").val() ] == "2")
			$("#testingType2").attr('checked',true);
		else if(Configuration.forTPIDGetTestingType[ $("#tpForGS").val() ] == "1")
			$("#testingType1").attr('checked',true);
			else
				$("#testingType0").attr('checked',true);
	
	if(Configuration.forTPIDGetfeedbackRating[ $("#tpForGS").val() ] == "2")
			$("#feedbackRating2").attr('checked',true);
		else if(Configuration.forTPIDGetfeedbackRating[ $("#tpForGS").val() ] == "1")
			$("#feedbackRating1").attr('checked',true);
			else
				$("#feedbackRating0").attr('checked',true);

},
configRolesArray:new Array(),
populateRoles:function()
{
	Configuration.configRolesArray = [];
	var query = '<Query><Where><Eq><FieldRef Name="ProjectID" /><Value Type="Text">'+$("#projectForGS").val()+'</Value></Eq></Where></Query>';
	var TesterRoles = Configuration.dmlOperation(query,'TesterRole');
	if(TesterRoles != undefined)
	{
		multiSelectList.createMultiSelectList("testerRolesConf",TesterRoles,"Role","ID","80px;");
		for(var yy=0;yy<TesterRoles.length;yy++)  
		{
			if(TesterRoles[yy]['displayOnSignUp'] == "Yes")
				Configuration.configRolesArray.push(TesterRoles[yy]['ID']);
		}		

	}	
	else
		Configuration.createMultiSelectList("testerRolesConf","120px");	
	var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">'+$("#projectForGS").val()+'</Value></Eq></Where></Query>';
	var result = Configuration.dmlOperation(query,'StandardSignUp');
	if(result != undefined)
		Configuration.configRolesArray.push(1);
	if(Configuration.configRolesArray.length != 0)	
		multiSelectList.setSelectedItemsFromArray("testerRolesConf",Configuration.configRolesArray);
	else
	{
		$('input[id=testerRolesConf_1]').attr('checked','checked');
		var StandardSignUpList=jP.Lists.setSPObject(Configuration.SiteURL,'StandardSignUp');
		var obj = [];
		obj.push({
					'projectID':$("#projectForGS").val()
				});

		var Result = StandardSignUpList.updateItem(obj);
	}		
},  
createMultiSelectList:function(divID,height)
{
	var divhtml="";
	var divhtml="<div class='Mediumddl' style='border: solid 1px #ccc;  width:inherit; padding-left:1px;'>"+
				
				"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
					"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");'>All</a>"+
						 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");'>None</a>"+
						 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>Selected</a></li>"+
					"<li><hr/></li>"+
					"<div style='overflow-y:scroll; height:"+height+" width:inherit'>";
					
	var itemId = divID+"_1";
	divhtml=divhtml+"<li title='Standard'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked'></input><span id='"+itemId+"' style=\"display: none;\">Standard</span>Standard</li>";					
	divhtml+="</div></ul></div>";
	$("#"+divID).html(divhtml);										
},
saveGS:function()
{
	if($("#tpForGS").val() == 0)
		//Configuration.alertBox('No Test Pass present!');
		Configuration.alertBox('No '+Configuration.gConfigTestPass+' present!');//:SD
	else
	{
		var flag = 0;
		if(Configuration.forTPIDGetfeedbackRating[ $("#tpForGS").val() ] == $("input[name='feedbackRating']:checked").val() && Configuration.forTPIDGetTestingType[ $("#tpForGS").val() ] == $("input[name='testingType']:checked").val())
			flag = 0;
		else
		{
			var query = '<Query><Where><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$("#tpForGS").val()+'</Value></Eq><Neq><FieldRef Name="status" /><Value Type="Text">Not Completed</Value></Neq></And></Where></Query>'
			var result = Configuration.dmlOperation(query,'TestCaseToTestStepMapping');
			if(result != null && result != undefined)
				flag = 1;
		}	
		if(flag == 1)
			//Configuration.alertBox("Testing is already begun for selected Test Pass so you won't be able to change 'Testing Type' and 'Feedback Rating Option'!");
			Configuration.alertBox("Testing is already begun for selected "+Configuration.gConfigTestPass+" so you won't be able to change 'Testing Type' and 'Feedback Rating Option'!");//:SD
		else
		{
			var configRolesArray = [];
			var obj = [];
			var count = 0;
			var standardRolePresentForConfig = 0; 
			$("#testerRolesConf div div li").each(function(){
					if($(this).children(".mslChk").attr('checked') == true)
					{
						if($(this).children(".mslChk").attr('Id').split("_")[1] != '1')
						{
							configRolesArray.push($(this).children(".mslChk").attr('Id').split("_")[1]);
							obj.push({
								'ID':$(this).children(".mslChk").attr('Id').split("_")[1],
								'displayOnSignUp':'Yes'
							});
						}
						else
						{
							standardRolePresentForConfig = 1;
							configRolesArray.push("1");
							var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">'+$("#projectForGS").val()+'</Value></Eq></Where></Query>';
							var result = Configuration.dmlOperation(query,'StandardSignUp');
							if(result == undefined)//If standard is not present for configuration earlier
							{
								var StandardSignUpList=jP.Lists.setSPObject(Configuration.SiteURL,'StandardSignUp');
								var obj2 = [];
								obj2.push({
											'projectID':$("#projectForGS").val()
										});
						
								var Result = StandardSignUpList.updateItem(obj2);
							}
						}
						count++;	
					}
					else if($(this).children(".mslChk").attr('Id').split("_")[1] != '1')
					{
						obj.push({
								'ID':$(this).children(".mslChk").attr('Id').split("_")[1],
								'displayOnSignUp':'No'
							});
					}	
			});	
			if(count != 0)
			{
				if(obj.length != 0)
				{
					var RoleDetailsList=jP.Lists.setSPObject(Configuration.SiteURL,'TesterRole');
					var Result = RoleDetailsList.updateItem(obj);
					if(standardRolePresentForConfig == 0)//If standard role is not present for configuration then delete its entry from StandardSignUp list
					{
						var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">'+$("#projectForGS").val()+'</Value></Eq></Where></Query>';
						var result = Configuration.dmlOperation(query,'StandardSignUp');
						if(result != undefined)
						{
							var StandardSignUpList=jP.Lists.setSPObject(Configuration.SiteURL,'StandardSignUp');
							var res = StandardSignUpList.deleteItem(result[0]['ID']);
						}
					}
				}	
				Configuration.configRolesArray = configRolesArray;
				
				////////////////
				var obj = new Array();
				if($("#autoApproval").attr('checked') == true)
				{
					obj.push({
							'ID':$("#tpForGS").val(),
							'autoApprovalForTesting':'Yes',
							'choiceForName':$("input[name='TSNameConstraint']:checked").val(),
							'testingType':$("input[name='testingType']:checked").val(),
							'feedbackRating':$("input[name='feedbackRating']:checked").val()
						});
					Configuration.forTPIDGetAutoAprv[ $("#tpForGS").val() ] = 'Yes';	
				}
				else
				{
					obj.push({
							'ID':$("#tpForGS").val(),
							'autoApprovalForTesting':'No',
							'choiceForName':$("input[name='TSNameConstraint']:checked").val(),
							'testingType':$("input[name='testingType']:checked").val(),
							'feedbackRating':$("input[name='feedbackRating']:checked").val()
						});
					Configuration.forTPIDGetAutoAprv[ $("#tpForGS").val() ] = 'No';	
				}
				Configuration.forTPIDGetChoiceForName[ $("#tpForGS").val() ] = $("input[name='TSNameConstraint']:checked").val();
				Configuration.forTPIDGetTestingType[ $("#tpForGS").val() ] = $("input[name='testingType']:checked").val(); 
				Configuration.forTPIDGetfeedbackRating[ $("#tpForGS").val() ] = $("input[name='feedbackRating']:checked").val(); 
				var TPList = jP.Lists.setSPObject(Configuration.SiteURL,'TestPass');
				var Result = TPList.updateItem(obj);
				//////////
				
				Configuration.alertBox('General Settings have configured successfully!');
			}
			else
				//Configuration.alertBox('Please select minimum one Role for configuration!');
				Configuration.alertBox('Please select minimum one '+Configuration.gCongfigRole+' for configuration!');//:SD
		}		
	}	
		
	Main.hideLoading();				
},
resetGS:function()
{
	//$('input[id="portfolioOption'+Configuration.gPortfolio+'"]').attr('checked','checked');
	
	if(Configuration.configRolesArray.length != 0)	
		multiSelectList.setSelectedItemsFromArray("testerRolesConf",Configuration.configRolesArray);
	if(Configuration.forTPIDGetAutoAprv[ $("#tpForGS").val() ] == "Yes")
		$("#autoApproval").attr('checked',true);
	else
		$("#autoApproval").attr('checked',false);	
		
	if(Configuration.forTPIDGetChoiceForName[ $("#tpForGS").val() ] == "1")
		$("#TSNameConstraint1").attr('checked',true);
	else
		$("#TSNameConstraint0").attr('checked',true);
		
	if(Configuration.forTPIDGetTestingType[ $("#tpForGS").val() ] == "2")
		$("#testingType2").attr('checked',true);
	else if(Configuration.forTPIDGetTestingType[ $("#tpForGS").val() ] == "1")
		$("#testingType1").attr('checked',true);
		else
			$("#testingType0").attr('checked',true);
			
	if(Configuration.forTPIDGetfeedbackRating[ $("#tpForGS").val() ] == "2")
		$("#feedbackRating2").attr('checked',true);
	else if(Configuration.forTPIDGetfeedbackRating[ $("#tpForGS").val() ] == "1")
		$("#feedbackRating1").attr('checked',true);
		else
			$("#feedbackRating0").attr('checked',true);		
},

editEnvironment:function()
{
		//btnDiv
			if($("#urlboxdiv li").find(":checked").length==0)
			{
				//Configuration.alertBox("Select the Environment first!");
				Configuration.alertBox("Select the "+Configuration.gEnvironmentLabelText+" first!");//:SD
			}
			else if($("#urlboxdiv li").find(":checked").length>1)
			{
				//Configuration.alertBox("Select one Environment at a time!");
				Configuration.alertBox("Select one "+Configuration.gEnvironmentLabelText+" at a time!");//:SD
			}
			else
			{
			    $("#urlboxdiv li").each(function()
					{
					if($(this).children(".mslChk").attr('checked') == true)
					{
				   		EnvironmentID=$(this).children(".mslChk").attr('value');
					}				   	
						if(EnvironmentID!=undefined)
				   		{
						 	//var deleteEnvironment=jP.Lists.setSPObject(Configuration.SiteURL,'Environment');
						 	//var deletedata = deleteEnvironment.deleteItem(EnvironmentID);
							//Configuration.alertBox("Environment Deleted Successfully");
	
						}
					}
				)
			} 
		
},			
deleteEnvironment:function()
{
		//btnDiv
            var EnvironmentID;
			if($("#urlboxdiv li").find(":checked").length==0)
			{
				//Configuration.alertBox("Select the Environment first!");
				Configuration.alertBox("Select the "+Configuration.gEnvironmentLabelText+" first!");
				Configuration.resetUserSettingInEditMode();

			}
			else if($("#urlboxdiv li").find(":checked").length>1)
			{
				//Configuration.alertBox("Select one Environment at a time!");
				Configuration.alertBox("Select one "+Configuration.gEnvironmentLabelText+" at a time!");
				Configuration.resetUserSettingInEditMode();
			}
			else
			{
			    $("#urlboxdiv li").each(function()
					{
					if($(this).children(".mslChk").attr('checked') == true)
					{
				   		EnvironmentID=$(this).children(".mslChk").attr('value');
					}				   	
						if(EnvironmentID!=undefined)
				   		{
						 	var deleteEnvironment=jP.Lists.setSPObject(Configuration.SiteURL,'Environment');
						 	if($.inArray(EnvironmentID,Configuration.globalEnvironmentId)==-1)
						 	{
						 	var deletedata = deleteEnvironment.deleteItem(EnvironmentID);
							//Configuration.alertBox("Environment Deleted Successfully");
							Configuration.alertBox(Configuration.gEnvironmentLabelText+" Deleted Successfully");//:SD
							Configuration.populateEnvironments();	
							}
							else
							{
							//Configuration.alertBox("Environment is associated with tester You Cannot delete the Environment!");
          					Configuration.alertBox(Configuration.gEnvironmentLabelText+" is associated with tester You Cannot delete the "+Configuration.gEnvironmentLabelText+"!");//:SD
							//Configuration.resetUserSettingInEditMode();
							}
						}
					}
				)
			} 
		
       Main.hideLoading();
},			

populateEnvironments:function()
{
 //Code Modified by swapnil kamle on 6-8-2012
        var camlQuery='<Query><Where><And><Eq><FieldRef Name="ProjectId" /> <Value Type="Text">'+$("#projectNames").val()+'</Value></Eq>'+
        				'<Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+$('#testPassNames').val()+'</Value></Eq></And></Where></Query>';
        var Evironmenturl=Configuration.dmlOperation(camlQuery,'Environment');
        var markup='';
        if(Evironmenturl!=undefined)
        {
			for(var i=0;i<=Evironmenturl.length-1;i++)
			{
									markup += '<li>';
				                    markup += '<input class="mslChk" type="checkbox" value="'+ Evironmenturl[i]['ID']+'"/>';//change alias url to in trim text Evironmenturl[0]
				                   	markup += '<a style="color: blue; padding-left: 6px;" title="' + Evironmenturl[i]['actualURL']+ '" href="'+ Evironmenturl[i]['actualURL'] +'" target="_blank">' + trimText(Evironmenturl[i]['aliasURL'],28) +'</a>';
				                    markup += '</li>';
			}
			 $('#urlboxdiv span').remove();
			 $('#urlboxdiv').empty();        
			 $('#urlboxdiv').append(markup);
        }
        else
        {
        $('#urlboxdiv span').remove(); 
        $('#urlboxdiv').empty();
       // $("#urlboxdiv").html('<span>No Environment Created</span>');
        $("#urlboxdiv").html('<span>No '+Configuration.gEnvironmentLabelText+' Created</span>');//added by Mohini for bug 10741(related to resource file)

	}
        //
},
populateUsers:function()
{
	var query ='<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Text">'+$("#projectNames").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="ID"/><FieldRef Name="prjLeadFulNm" /><FieldRef Name="SPUserID" /></ViewFields>'+
				'<OrderBy><FieldRef Name="prjLeadFulNm" Ascending="False" /></OrderBy></Query>';
		
	var ProjectLead = Configuration.dmlOperation(query,'Project');	
	/*if(ProjectLead!=undefined && ProjectLead!=null)
	{
		multiSelectList.createMultiSelectList("UsersName",ProjectLead,"prjLeadFulNm","SPUserID","130px;");

	}*/
	if(ProjectLead!=undefined && ProjectLead!=null)
	{

		$.each(ProjectLead,function(i,ProjectLead){
					//if($.inArray(tester['SPUserID'],_testerIDArray) == -1){
						var markup = '<li>';
						markup += '<input id="'+ ProjectLead['SPUserID'] +'" class="mslChk" type="checkbox">';
						markup += '<span id="'+ ProjectLead['SPUserID'] +'">'+ ProjectLead['prjLeadFulNm'] +'</span>';
						markup += '</li>';          
						$('#userListDiv').append(markup);
						//}
					});	
	}
	
	var query ='<Query><Where><Eq><FieldRef Name="ID"/><Value Type="Text">'+$("#testPassNames").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="ID"/><FieldRef Name="tstMngrFulNm" /><FieldRef Name="SPUserID" /></ViewFields>'+
				'<OrderBy><FieldRef Name="tstMngrFulNm" Ascending="False" /></OrderBy></Query>';	   	   
		
	var ProjectTestManager = Configuration.dmlOperation(query,'TestPass');
		
	/*if(ProjectTestManager!=undefined && ProjectTestManager!=null)
	{
		multiSelectList.createMultiSelectList("UsersName",ProjectTestManager,"tstMngrFulNm","SPUserID","130px;");

	}*/
	
	if(ProjectTestManager!=undefined && ProjectTestManager!=null)
	{

		$.each(ProjectTestManager ,function(i,ProjectTestManager ){
					//if($.inArray(tester['SPUserID'],_testerIDArray) == -1){
						var markup = '<li>';
						markup += '<input id="'+ ProjectTestManager['SPUserID'] +'" class="mslChk" type="checkbox">';
						markup += '<span id="'+ ProjectTestManager['SPUserID'] +'">'+ ProjectTestManager['tstMngrFulNm'] +'</span>';
						markup += '</li>';          
						$('#userListDiv').append(markup);
						//}
					});	
	}
	
	var query ='<Query><Where><Eq><FieldRef Name="TestPassID"/><Value Type="Text">'+$("#testPassNames").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="ID"/><FieldRef Name="TesterFullName" /><FieldRef Name="SPUserID" /></ViewFields>'+
				'<OrderBy><FieldRef Name="tstMngrFulNm" Ascending="False" /></OrderBy></Query>';
	   	   
	var ProjectTesters = Configuration.dmlOperation(query,'Tester');	
	/*if(ProjectTesters!=undefined && ProjectTesters!=null)
	{
		multiSelectList.createMultiSelectList("UsersName",ProjectTesters,"TesterFullName","SPUserID","130px;");

	}*/
		
	if(ProjectTesters!=undefined && ProjectTesters!=null)
	{

		$.each(ProjectTesters,function(i,ProjectTesters){
					//if($.inArray(tester['SPUserID'],_testerIDArray) == -1){
						var markup = '<li>';
						markup += '<input id="'+ ProjectTesters['SPUserID'] +'" class="mslChk" type="checkbox">';
						markup += '<span id="'+ ProjectTesters['SPUserID'] +'">'+ ProjectTesters['TesterFullName'] +'</span>';
						markup += '</li>';          
						//$('#userListDiv').append(markup);
						//}
					});	
					$('#userListDiv').empty().html(markup);

	}
	
},
saveUATEnvironment:function()
{
      if(Configuration.validateUATEnvironment())
      {
			//Main.showLoading();
			
			//Get project related information
			var _projectID = 1;
			var _projectName;
					
			//Get Test Pass related information
			var _testPassId = 1;
			var _testPassName;
					
			//User Setting array to store array of Usersetting List Items
			var _userSetting = new Array();
			var EnvironmentID='';
		
			//Code Modified by swapnil kamle on 7-8-2012
			//Array of selected users(testers)
				var _selectedUserArray = new Array();
				Configuration.SelectedUserArryRequest.length=0;
				$("div#userList input.mslChk:checked").each(function(){
					_selectedUserArray.push({ID:$(this).attr('id'), Name:$(this).siblings('span').html()});
					/*edited by nitu on 18 dec 2012*/
					Configuration.SelectedUserArryRequest.push($(this).siblings('span').html());

				});
							//For each tester associating UAT environment
			//	$.each(_selectedUserArray,function(i,user){
				     
                      //
                       $("#urlboxdiv li").each(function()
						{
							if($(this).children(".mslChk").attr('checked') == true)
							{
						   		EnvironmentID+=$(this).children(".mslChk").attr('value')+'|';
							}				   	
							if(EnvironmentID!=undefined)
					   		{
							 	
		
							}
						}
					   );

					//	  
					//Getting the selected UAT Environment
				//	$("div#uatEnvironmentList input.mslChk:checked").each(function(){
						
						  
						//adding list item of usersetting for each user and for each UAT environment $("#projectNames").text(),
						for(var i=0;i<_selectedUserArray.length;i++)
						  {
						_userSetting.push({
							'Title': '',
							'ProjectId': $("#projectNames").val(),
							'ProjectName':$("#projectNames option:selected").text(),
							'TestPassId' : $("#testPassNames").val(),
							'TestPassName' : $("#testPassNames option:selected").text(),
							'SPUserID': _selectedUserArray[i]['ID'] ,
							'TesterFullName':_selectedUserArray[i]['Name'],
							 'EnvironmentID':EnvironmentID,
							//'UATEnvironmentURL': $(this).siblings('a').attr('href') ,
							//'AliasURL':$(this).siblings('a').html(),
							
							});
							
						}
						//Code Modified
							var _userSettingList = jP.Lists.setSPObject(Configuration.SiteURL,'UserSetting');
			
							//Saving Bulk Items in list
							var _result = _userSettingList.updateItem(_userSetting);
							
							//Configuration.alertBox('User Setting saved successfully!');
							Configuration.alertSuccessfullUserSetting('User Setting saved successfully!');
							Main.hideLoading();

							//
						//Configuration.bindUserSettingGrid();
						
					//});
				//}); 

			
			//
		
		}
			Configuration.CheckMode=true;
			Configuration.resetAddModeUserSetting();
			Main.hideLoading();

},
	
bindUserSettingGrid:function()
{
		
		//Get Test Pass related information
		Configuration.globalEnvironmentId=new Array();		
		Configuration.UserSettingList = new Array();
		//Old code removed and new code added for optimization by HRW
		 if(Configuration.TesterList != undefined)
		 {
			 var q = '';
			 var camlQuery = '<Query><Where><And><Eq><FieldRef Name="TestPassId" /><Value Type="Text">'+$("#testPassNames").val()+'</Value></Eq>';
			 for(var i=0;i<(Configuration.TesterList.length)-1;i++)			 
			 {
			 	camlQuery +='<Or><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+Configuration.TesterList[i]+'</Value></Eq>';
			 	q += '</Or>';
			 }	
			 camlQuery += '<Eq><FieldRef Name="SPUserID"/><Value Type="Text">'+Configuration.TesterList[i]+'</Value></Eq>';
			 if(q != '')
				camlQuery += q;
			 camlQuery +='</And></Where></Query>';		
			 var _userSetting = Configuration.dmlOperation(camlQuery,'UserSetting');
			 if(_userSetting != undefined)
			 {
			 	for(var ii=0;ii<_userSetting.length;ii++)
				{
					var environment = new Array();
					var environmentHTML = '';
					var IDs = new Array();
					var EnvironmentIDs=new Array();
					var settings = new Array();
					var userSettingIDs = new Array();
					var temp = new Array();
					temp =_userSetting[ii]["EnvironmentID"].split('|');
					temp.splice(temp.length-1,1);
					$.merge(EnvironmentIDs,temp);
					userSettingIDs.push(_userSetting[ii]["ID"]);
					$.merge(Configuration.globalEnvironmentId,EnvironmentIDs);
		
					$.merge(IDs,userSettingIDs);
					for(var i=0;i<EnvironmentIDs.length-1;i++)
					{
						environment.push({UATEnvironment:Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0],AliasURL:Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1],ID:userSettingIDs[i]});
						
						environmentHTML += '<a href="'+ Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0] +'" target="_blank">'+ Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1]+'</a>,&nbsp;&nbsp;';
						
					}
					environment.push({UATEnvironment:Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0],AliasURL:Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1],ID:userSettingIDs[i]});
					
					environmentHTML += '<a href="'+ Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0] +'" target="_blank">'+ Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1]+'</a>&nbsp;&nbsp;';
					Configuration.UserSettingList.push({SPUserID:_userSetting[ii]['SPUserID'],TesterFullName:_userSetting[ii]['TesterFullName'],Environment:environment,EnvironmentHTML:environmentHTML, IDs:IDs});
				}	
			 }
		}
		
		  // Bellow code edited by Ekta
			$.each(Configuration.UserSettingList,function(i,userSetting){
			//Hide Tester From User List
		         if(Configuration.CheckMode==true)
		         {
				 Configuration.hideUserFronUsersList(userSetting['SPUserID']);
				 }
			});  // Till here
	
		if(Configuration.UserSettingList.length != 0)
		{
		
			$('#userSettingsPaginf').show();
						
			var gridDetails='<p class="clear"/>'+
			'<table class="gridDetails" cellSpacing="0">'+
			'<thead>'+
				'<tr class="hoverRow">'+
					//'<td style="width: 20%;" class="tblhd "><span>User</span></td>'+
					'<td style="width: 20%;" class="tblhd "><span>User(s)</span></td>'+//:SD
					'<td style="width: 20%;" class="tblhd "><span>UAT Environment</span></td>'+					
					'<td style="width: 8%;" class="tblhd center"><span>Edit Item</span></td>'+
				'</tr>'+
			'</thead>'+
			'<tbody>';
			
			
			    var resultLengthApp =  Configuration.UserSettingList.length;
				Configuration.gAttlengthApp=resultLengthApp ;
				if(resultLengthApp >=(Configuration.startIndexApp+5))
					Configuration.EiApp=Configuration.startIndexApp+5;
				else
					Configuration.EiApp=resultLengthApp;
					
				var cnt=0;
				for(var i=Configuration.startIndexApp;i<Configuration.EiApp;i++)
				{
					cnt++;
					//Hide Tester From User List
				    if(Configuration.CheckMode==true)
				     {
						Configuration.hideUserFronUsersList(Configuration.UserSettingList[i]['SPUserID']);
					 } 
					
					gridDetails+='<tr>'+
							'<td>'+ Configuration.UserSettingList[i]['TesterFullName'] +'</td>'+
							'<td> '+ Configuration.UserSettingList[i]['EnvironmentHTML'] +'</td>'+
							'<td class="center"><a onclick="Configuration.editUserSetting('+Configuration.UserSettingList[i]['SPUserID'] +','+Configuration.UserSettingList[i]['IDs'] +')"  title="Edit user Setting"  class="pedit" style="cursor:Pointer"></a>'+
							'<a onclick="Configuration.deleteUserSetting('+ Configuration.UserSettingList[i]['SPUserID'] +');" title="Delete user setting"  class="pdelete" style="cursor:Pointer"></a></td>'+
						'</tr>';
			
			    } 
					
				gridDetails+='</tbody></table>';
				$("#userSettingGrid").html(gridDetails);
				
				resource.UpdateTableHeaderText();//:SD
				
				var info='<label>Showing '+(Configuration.startIndexApp+1)+ '-'+Configuration.EiApp+' User Setting(s) of Total '+Configuration.UserSettingList.length+' User Setting(s) </label> | <a id="previousApp" style="cursor:pointer" onclick="Configuration.startIndexTDecrementApp();Configuration.bindUserSettingGridFromBuffer()">Previous</a> | <a  id="nextApp" style="cursor:pointer" onclick="Configuration.startIndexTIncrementApp();Configuration.bindUserSettingGridFromBuffer()">Next</a>';
	 			$('#userSettingsPaginf').empty();
	 			$("#userSettingsPaginf").append(info); 


				if(Configuration.startIndexApp<=0) 
		        {   
					document.getElementById('previousApp').disabled="disabled";  
					document.getElementById('previousApp').style.color="#989898";
				}
				else
					document.getElementById('previousApp').disabled=false;
				     
				if(resultLengthApp <=((Configuration.startIndexApp)+5)) 
				{
					document.getElementById('nextApp').disabled="disabled";  
				    document.getElementById('nextApp').style.color="#989898";
				}
				else
					document.getElementById('nextApp').disabled=false;
									                
		}
		else
		{
			$("#userSettingGrid").empty();
			$("#userSettingGrid").append("<p class='clear'></p><h3>There are no User Setting.</h3>");
			
			$('#userSettingsPaginf').hide();
		}
		
},
bindUserSettingGridFromBuffer:function()
{
	$('#userSettingsPaginf').show();
				
	var gridDetails='<p class="clear"/>'+
	'<table class="gridDetails" cellSpacing="0">'+
	'<thead>'+
		'<tr class="hoverRow">'+
			'<td style="width: 20%;" class="tblhd "><span>User</span></td>'+
			'<td style="width: 20%;" class="tblhd "><span>UAT Environment</span></td>'+					
			'<td style="width: 8%;" class="tblhd center"><span>Edit Item</span></td>'+
		'</tr>'+
	'</thead>'+
	'<tbody>';
	
	
    var resultLengthApp =  Configuration.UserSettingList.length;
	Configuration.gAttlengthApp=resultLengthApp ;
	if(resultLengthApp >=(Configuration.startIndexApp+5))
		Configuration.EiApp=Configuration.startIndexApp+5;
	else
		Configuration.EiApp=resultLengthApp;
			
	for(var i=Configuration.startIndexApp;i<Configuration.EiApp;i++)
	{
		//Hide Tester From User List
	    if(Configuration.CheckMode==true)
	     {
			Configuration.hideUserFronUsersList(Configuration.UserSettingList[i]['SPUserID']);
		 } 
		
		gridDetails+='<tr>'+
				'<td>'+ Configuration.UserSettingList[i]['TesterFullName'] +'</td>'+
				'<td> '+ Configuration.UserSettingList[i]['EnvironmentHTML'] +'</td>'+
				'<td class="center"><a onclick="Configuration.editUserSetting('+Configuration.UserSettingList[i]['SPUserID'] +','+Configuration.UserSettingList[i]['IDs'] +')"  title="Edit user Setting"  class="pedit" style="cursor:Pointer"></a>'+
				'<a onclick="Configuration.deleteUserSetting('+ Configuration.UserSettingList[i]['SPUserID'] +');" title="Delete user setting"  class="pdelete" style="cursor:Pointer"></a></td>'+
			'</tr>';

    } 
		
	gridDetails+='</tbody></table>';
	$("#userSettingGrid").html(gridDetails);
		
	var info='<label>Showing '+(Configuration.startIndexApp+1)+ '-'+Configuration.EiApp+' User Setting(s) of Total '+Configuration.UserSettingList.length+' User Setting(s) </label> | <a id="previousApp" style="cursor:pointer" onclick="Configuration.startIndexTDecrementApp();Configuration.bindUserSettingGridFromBuffer()">Previous</a> | <a  id="nextApp" style="cursor:pointer" onclick="Configuration.startIndexTIncrementApp();Configuration.bindUserSettingGridFromBuffer()">Next</a>';
	$('#userSettingsPaginf').empty();
	$("#userSettingsPaginf").append(info); 


	if(Configuration.startIndexApp<=0) 
    {   
		document.getElementById('previousApp').disabled="disabled";  
		document.getElementById('previousApp').style.color="#989898";
	}
	else
		document.getElementById('previousApp').disabled=false;
	     
	if(resultLengthApp <=((Configuration.startIndexApp)+5)) 
	{
		document.getElementById('nextApp').disabled="disabled";  
	    document.getElementById('nextApp').style.color="#989898";
	}
	else
		document.getElementById('nextApp').disabled=false;
									                
		
},
	
startIndexTIncrementApp:function (){
             Configuration.CheckMode=false;
            if(Configuration.gAttlengthApp>Configuration.startIndexApp+5)
				Configuration.startIndexApp+=5;
},
startIndexTDecrementApp:function (){
			 Configuration.CheckMode=false;

            if(Configuration.startIndexApp>0)
				Configuration.startIndexApp-=5;
},
	
editUserSetting:function(userID,userSettingID){
		//Main.showLoading();
	
		$('#aliasURLUpdate').val('');
		$('#actualURLUpdate').val('');
		$('#aliasURL').val('');
		$('#actualURL').val('');

		document.getElementById('userSettingID').value=userSettingID ;
        
		//$("#testerID").val(userID);
		Configuration.globalUserID=userID;
		var userName ='';
		$.each(Configuration.UserSettingList,function(i,userSetting){
			if(userID == userSetting['SPUserID']){
				
				userName = userSetting['TesterFullName'];
				document.getElementById('testerName').value=userSetting['TesterFullName'];
				//Hide Show Buttons\
				//Code Updated by swapnil kamle on 30/7/2012 
				$("#userListDiv").html('');
				//
				$("#btnSaveUATEnvironment").hide();
				$("#btnClearUATEnvironment").hide();
				$("#btnUpdateUATEnvironment").show();
				$("#btnCancelUATEnvironment").show();	
				/*********************************/
				
				//Show add new user setting
				$("#newUserSetting").show();
				
				//Set user list 
				//Done By swapnil kamle and manish on 30/7/2012
				// $("#userList").attr('disabled',true);
				//
				//$("#linkSA_testPassName").attr('disabled',true);
				//$("#linkSN_testPassName").attr('disabled',true);
				//$("#anchShow_testPassName").attr('disabled',true);

				//if($("#userListDiv").html() == 'No tester available to configure.')
				if($("#userListDiv").html() == 'No '+Configuration.gConfigTester+' available to configure.')//added by Mohini for bug 10741(related to resource file)
					$("#userListDiv").html('');
				$("#userList #userListDiv input").removeAttr('checked');
				if($("#userList #userListDiv input[id='"+userID+"']").length == 0)
					$("#userListDiv").append('<li><input id="'+ userID  +'" class="mslChk" type="checkbox" checked="checked"><span id="'+ userID +'">'+ userName +'</span></li>');
				else
					$("#userList #userListDiv input[id='"+userID+"']").attr('checked','checked');
					
					/*edited by nitu on 18 dec 2012*/
				//	Configuration.SelectedUserArryRequest.length=0;
				//	Configuration.SelectedUserArryRequest.push($("#userList #userListDiv input").siblings('span').html());

				
				//Setting UAT environment List
				$("#uatEnvironmentList #urlboxdiv input").removeAttr('checked');
				$.each(userSetting['Environment'],function(index,environment){
					//$("#uatEnvironmentList #urlboxdiv a[href='"+environment['UATEnvironment'] +"']").siblings('input').attr('checked','checked');
					  if(environment['UATEnvironment'].indexOf("http://")==-1)
					  	$("#uatEnvironmentList #urlboxdiv a[href='http://"+environment['UATEnvironment'] +"']").siblings('input').attr('checked','checked');
					  else
					  	$("#uatEnvironmentList #urlboxdiv a[href='"+environment['UATEnvironment'] +"']").siblings('input').attr('checked','checked');
						
						/* Added by shilpa for bug 6829 */
					  if(environment['UATEnvironment'].indexOf("https://")==-1)
					  	$("#uatEnvironmentList #urlboxdiv a[href='https://"+environment['UATEnvironment'] +"']").siblings('input').attr('checked','checked');
					  else
					  	$("#uatEnvironmentList #urlboxdiv a[href='"+environment['UATEnvironment'] +"']").siblings('input').attr('checked','checked');
						/* */
				});	
			}
		});

		//Main.hideLoading();
},	
getUserList:function(){
		var _testerIDArray = new Array();
		var _query = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+ $("#testPassNames").val() +'</Value></Eq></Where></Query>';
		
		var _testers = Configuration.dmlOperation(_query,'Tester');
		$('#userListDiv').empty();
		if(_testers != undefined)
				{
				$.each(_testers,function(i,tester){
				if($.inArray(tester['SPUserID'],_testerIDArray) == -1){
					var markup = '<li>';
					markup += '<input id="'+ tester['SPUserID'] +'" class="mslChk" type="checkbox">';
					markup += '<span id="'+ tester['SPUserID'] +'">'+ tester['TesterFullName'] +'</span>';
					markup += '</li>';          
					$('#userListDiv').append(markup);
					
					_testerIDArray.push(tester['SPUserID']);
					
					//Adding Item in Drop Down
					//$('#ddlUserList').append('<option value="' + tester['SPUserID'] + '">' + tester['TesterFullName'] + '</option>');
				}
			});
		}
		else
		{
		Configuration.resetUserSetting();
		}
		Configuration.TesterList = _testerIDArray;
		//return _testerIDArray;
	},
updateUserSetting:function()
{
		var userID = Configuration.globalUserID;
		var EnvironmentID='';
		var userSettingList;		
		if(Configuration.validateUATEnvironment())
		{
			//Main.showLoading();
			
			//User Setting array to store array of Usersetting List Items
			var _userSetting = new Array();
			
			var userSettingMyArray = new Array();
			
			//$.each(Configuration.UserSettingList,function(i,userSetting){
				/*if(userID == userSetting['SPUserID']){
					userSettingMyArray = userSetting;
					return;
				}*/
				$("#userList").attr('disabled',false);

			
			userSettingList = jP.Lists.setSPObject(Main.getSiteUrl(),'UserSetting');
		 	Configuration.SelectedUserArryRequest.length=0;
		 	//Code Modified by swapnil kamle on 8-8-2012 
		 	$("#urlboxdiv li").each(function()
							{
							if($(this).children(".mslChk").attr('checked') == true)
								{
							   		EnvironmentID+=$(this).children(".mslChk").attr('value')+'|';
							   		Configuration.SelectedUserArryRequest.push($("div#userList input.mslChk:checked").siblings('span').html());

								}				   	
							
							}
					  	 );
		  	 
		  	if(EnvironmentID!=undefined && $("#userSettingID").val()!=undefined && $("#testerName").val()!=undefined )
			   		{
	 		  
						_userSetting.push({
						'Title': '',
						'ID':$("#userSettingID").val(),
						'ProjectId': $("#projectNames").val(),
						'ProjectName': $("#projectNames option:selected").text(),
						'TestPassId' : $("#testPassNames").val(),
						'TestPassName' : $("#testPassNames option:selected").text(),
						'SPUserID': userID ,
						'TesterFullName': $("#testerName").val(),
						'EnvironmentID':EnvironmentID,
						});

					}
			  // });
   
		    //End of Code Modified by swapnil kamle on 8-8-2012 
 			//Saving Bulk Items in list
			var _result = userSettingList.updateItem(_userSetting);
			
			//Configuration.alertBox('User Setting updated successfully!');
			Configuration.alertSuccessfullUserSetting('User Setting updated successfully!');
			//Configuration.clearFields();
			$("#newUserSetting").hide();
				
			Configuration.resetAddModeUserSetting();

			//Configuration.bindUserSettingGrid();
			
			//ankita 18/7/2012 
			$("#btnSaveUATEnvironment").show();
			$("#btnUpdateUATEnvironment").hide();
			$("#btnClearUATEnvironment").show();
			$("#btnCancelUATEnvironment").hide();

		}
		Main.hideLoading();
		Configuration.CheckMode=true;
},

/* function added by shilpa */	
deleteUserSettingOk:function(userID)
{
	Configuration.CheckMode=true;
	var userName ='';
	$.each(Configuration.UserSettingList,function(i,userSetting){
		if(userID == userSetting['SPUserID']){
			userName = userSetting['TesterFullName'];
			
			var userSettingList = jP.Lists.setSPObject(Main.getSiteUrl(),'UserSetting');
			$.each(userSetting['IDs'],function(index,id){
				userSettingList.deleteItem(id);
				
			});
		}
	});
	
	//Code Modifed  By swapnil kamle on 30/07/2012
				//Configuration.resetAddModeUserSetting();
				Configuration.clearFields();
				Configuration.getUserList();
				Configuration.bindUserSettingGrid()
				Configuration.populateEnvironments();
				//
	//$('#divConfirm').dialog("destroy");
	
	//if($("#userListDiv").html() == 'No tester available to configure.')
	if($("#userListDiv").html() == 'No '+Configuration.gConfigTester+' available to configure.')//added by Mohini for bug 10741(related to resource file)
		//$("#userListDiv").html('');
	
	$("#userListDiv").append('<li><input id="'+ userID  +'" class="mslChk" type="checkbox"><span id="'+ userID +'">'+ userName +'</span></li>');
	
	//Configuration.bindUserSettingGrid();
	
	Configuration.alertBox('User setting deleted successfully!!');
},
deleteUserSetting:function(userID)
{
		$("#dialog:ui-dialog" ).dialog( "destroy" );
		$("#divConfirm" ).text('Are you sure you want to delete ?');							
		$("#divConfirm" ).dialog({
			autoOpen: false,
			resizable: false,
			height:140,
			modal: true,
			buttons: {
				"Delete": function() {
				    
					Main.showLoading();
					setTimeout('Configuration.deleteUserSettingOk('+userID+');',100);
					$('#divConfirm').dialog("destroy");				
					Main.hideLoading();

				},
				"Cancel": function() {
					$( this ).dialog( "close" );
				}
			}
		});
							
		$('#divConfirm').dialog("open");

},
	
hideUserFronUsersList:function(userID)
{
		$("input#"+userID).parent().remove();
},
	
alertBox:function(message){
		$("#divAlert").text(message);
		$('#divAlert').dialog({height: 150,modal: true, buttons: { "Ok":function() {  $(this).dialog("close");}} });
},

resetUserSetting:function(){
		if($("#userList #userListDiv input").length == 0){
			//$("#userListDiv").html('No tester available to configure.');
			$("#userListDiv").html('No '+Configuration.gConfigTester+' available to configure.');//added by Mohini for bug 10741(related to resource file)
		}
		//else{
			//$("#userListDiv").html()
			$("#userList #userListDiv input").removeAttr('checked');
			$("#uatEnvironmentList #urlboxdiv input").removeAttr('checked');
		//}
		
	},
	
resetUserSettingInEditMode:function(){
	
	//Configuration.editUserSetting($("#testerID").val());
		//Code Modified by swapnil kamle on 8-8-2012
		
		$('#aliasURLUpdate').val('');
		$('#actualURLUpdate').val('');
		$('#aliasURL').val('');
		$('#actualURL').val('');
		
		if( $('#userSettingID').val()!=undefined)
		 {
			Configuration.editUserSetting(Configuration.globalUserID,$('#userSettingID').val());
		 }
},

resetAddModeUserSetting:function()
{
		//Hide Show Buttons
		Configuration.getUserList();
		$("#btnSaveUATEnvironment").show();
		$("#btnClearUATEnvironment").show();
		$("#btnUpdateUATEnvironment").hide();
		$("#btnCancelUATEnvironment").hide();	
		/*********************************/
				
		//Show add new user setting
		$("#newUserSetting").hide();
				
		//Set user list 
		$("#userList").attr('disabled',false);
		$("#linkSA_testPassName").attr('disabled',false);
		$("#linkSN_testPassName").attr('disabled',false);
		$("#anchShow_testPassName").attr('disabled',false);
		
		Configuration.bindUserSettingGrid();
		Configuration.resetUserSetting();
		
		if(Configuration.UserSettingList != undefined)
		{
			$.each(Configuration.UserSettingList,function(i,userSetting){
					//Hide Tester From User List
					Configuration.hideUserFronUsersList(userSetting['SPUserID']);
			});
		}
		/* Added by shilpa */
		if($("#userList #userListDiv input").length == 0){
			//$("#userListDiv").html('No tester available to configure.');
		    $("#userListDiv").html('No '+Configuration.gConfigTester+' available to configure.');//added by Mohini for bug 10741(related to resource file)
		}
},
	
alertSuccessfullUserSetting:function(message)
{
		$("#dialog:ui-dialog" ).dialog( "destroy" );
		$("#divConfirm" ).html(message+"<br/><b>Do you want to send request to admin?</b>");							
		$("#divConfirm" ).dialog({
			autoOpen: false,
			resizable: false,
			//height:140,
			modal: true,
			buttons: {
				"Yes": function() {
					var mailTo = 'admin@demo.com';
					var subject = 'Request For Access to Tester &amp'; // "Request For Access to 'Url of environment'";
					//var messageBody = 'Please provide the access and passwords for following users - \n \n \n '; //"Please provide the access to ‘url of environment’ for following users : %0D%0A %0D%0A %0D%0A"; //
					/*edited by nitu on 18 dec 2012 */
					var UserArry=new Array();
					var UserSelectedName='';
					var OutlookList = jP.Lists.setSPObject(Configuration.SiteURL,'OutlookWorkflow'); 
					UserArry=Configuration.SelectedUserArryRequest;
					var j=0;
					$.each(Configuration.UserSettingList,function(i,userSetting){
					var indx=jQuery.inArray(""+userSetting["TesterFullName"]+"", UserArry);
					if(indx != -1)
					{
						var messageBody = 'Please provide the access and passwords to the below user - \n \n \n '; //"Please provide the access to ‘url of environment’ for following users : %0D%0A %0D%0A %0D%0A"; //
						//messageBody += parseInt(j)+1 +")  ";
						//j++;
						UserSelectedName=userSetting["TesterFullName"];
						
						messageBody += "Name - "+userSetting["TesterFullName"] +" \n";
						messageBody += "URLs - \n";
						$.each(userSetting["Environment"],function(index,environment){
							messageBody += ""+environment["UATEnvironment"].replace(/#/g,"") +" \n";
						});
						
						messageBody += " \n \n";
						
						/* workflow code added by shilpa on 19 march */
						Obj = new Array();
		                    Obj.push({
		                     'messageBody':messageBody                     
		                   });   
		                   var result = OutlookList.updateItem(Obj);
						/**/
						}
					});
															
					//messageBody += '';
					//window.location ='mailto:'+ mailTo +'?Subject='+ subject +';body='+ messageBody ;
					$( this ).dialog( "close" );
					Configuration.alertBox('Request has been sent successfully!!');		
					
					/* Added by shilpa to delete the items from the list */
					/*var query = '<Query><ViewFields><FieldRef Name="ID" /></ViewFields></Query>';
					var OutlookList= jP.Lists.setSPObject(Configuration.SiteURL,'OutlookWorkflow');
					var result = Configuration.dmlOperation(query,'OutlookWorkflow');
					
					if(result != null && result != undefined)
					{
						for(var i=0;i<result.length;i++)
							var res = OutlookList.deleteItem(result[i]['ID']);
					}*/
					/* */
			},
			"No": function() {
				$( this ).dialog( "close" );
			}
		}
	});
	
		
	$('#divConfirm').dialog("open");
	
},
	
validateUATEnvironment:function(){
		
		if($("#userList").css('display') != 'none'){
		
			//Validate User Selected and UAT environment selected
			if($("input.mslChk:checked").length == 0){
				Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
				return false;
			}
			
			//Validating Selected Users
			if($("div#userList input.mslChk:checked").length == 0){
				//Configuration.alertBox('Please select atleast one user!');
				Configuration.alertBox('Please select atleast one '+$('#lblUser').text().substring(0,$('#lblUser').text().length-2)+'!');//:SD
				
				return false;
			}
			
			//Validating UAT Environment
			if($("div#uatEnvironmentList input.mslChk:checked").length == 0){
				//Configuration.alertBox('Please select atleast one UAT Environment!');
				Configuration.alertBox('Please select atleast one '+$("#lblEnvironment").text().substring(0,$("#lblEnvironment").text().length-2)+'!');//:SD
				return false;
			}
			
			return true;
		}
		else{
			//Validate User Selected and UAT environment selected
			if($("#ddlUserList option:selected").val() == -1 && $("div#uatEnvironmentList input.mslChk:checked").length == 0){
				Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
				return false;
			}
			
			//Validating Selected Users
			if($("#ddlUserList option:selected").val() == -1){
				//Configuration.alertBox('Please select atleast one user!');
				Configuration.alertBox('Please select atleast one '+$('#lblUser').text().substring(0,$('#lblUser').text().length-2)+'!');//:SD
				return false;
			}
			
			//Validating UAT Environment
			if($("div#uatEnvironmentList input.mslChk:checked").length == 0){
				//Configuration.alertBox('Please select atleast one UAT Environment!');
				Configuration.alertBox('Please select atleast one '+$("#lblEnvironment").text().substring(0,$("#lblEnvironment").text().length-2)+'!');//:SD
				return false;
			}
			
			return true;
		}
		Main.hideLoading();
	},	

clearProcessFields:function()
{
	//Show add new user setting
				$("#newUserSetting").hide();
				//Clear For Process Details
				$("#txtAsIs").val('');
				$("#txtAsIsDescription").val('');
				$("#txtToBe").val('');
				$("#txtToBeDescription").val('');
				
				$("#newProcess").hide();
				$("#btnSaveProcess").show();
				$("#btnUpdateProcess").hide();
				$("#btnResetProcess").hide();


				$("#btnCancelProcess").show();
},
	
clearFields:function()
{
	$('#userListDiv').empty();
	//Hide Show Buttons
	$("#btnSaveUATEnvironment").show();
	$("#btnClearUATEnvironment").show();
	$("#btnUpdateUATEnvironment").hide();
	$("#btnCancelUATEnvironment").hide();
	
	$("#newUserSetting").hide();

/*********************************/
	//Added by HRW
	Configuration.startIndexApp = 0;
},
//Code write by swapnil kamle on 31/7/2012 to ge t back on save Mode After Deletion from Grid
clearFieldsOnDelete:function()
{
//Show add new user setting on Delete
	$("#newUserSetting").hide();
	Configuration.startIndexProc = 0;
	//Clear For Process Details
	$("#txtAsIs").val('');
	$("#txtAsIsDescription").val('');
	$("#txtToBe").val('');
	$("#txtToBeDescription").val('');
	
	$("#newProcess").hide();
	$("#btnSaveProcess").show();
	$("#btnUpdateProcess").hide();
	$("#btnResetProcess").hide();
	$("#btnCancelProcess").show();
	//

},

//End of clearFieldsOnDelete
/* Process Details related functions */
saveProcess:function(){
	
		if(Configuration.validateProcess()){
			Main.showLoading();
			var _projectID = 1;
			var _projectName;
			var _process = new Array();
			_process.push({
				'Title': '',
				'ProjectID': $('#projectNamesForProcess').val(),
				'ProjectName': $('#projectNamesForProcess option:selected').text(),
				'AsIsID': $('#txtAsIs').val(),
				'ToBeID': $('#txtToBe').val(),
				'AsIsDescription': $('#txtAsIsDescription').val() == '' ? null :  $('#txtAsIsDescription').val(),
				'ToBeDescription': $('#txtToBeDescription').val() == '' ? null :  $('#txtToBeDescription').val(),
			});
			
			var _processID;
			var _processList = jP.Lists.setSPObject(Configuration.SiteURL,'Processes'); 

			var _result = _processList.updateItem(_process);   
			_processID = _result.ID;
			
			Main.hideLoading();
			
			Configuration.blankProcess();
			Configuration.alertBox('Process added successfully!');
			
			Configuration.gridDetailsForProcess();			
		}
		else{
			Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
		}
		Main.hideLoading();

	},
	validateProcess:function(){
		if($("#txtAsIs").val().trim() == ''){
			return false;
		}
		if($("#txtToBe").val().trim() == ''){
			return false;
		}
		return true;
	},
	
	/*Blank the data fields*/
	blankProcess:function()
	{
		document.getElementById('txtAsIs').value='' ;
		document.getElementById('txtAsIsDescription').value=''; 
		document.getElementById('txtToBe').value='';
		document.getElementById('txtToBeDescription').value='';
	},

	/*grid*/
	
//Code Modified By swapnil on 31/7/2012
//	
gridDetailsForProcess:function()
{
	var gridDetails='<p class="clear"/>'+
		'<table class="gridDetails" cellSpacing="0">'+
			'<thead>'+
				'<tr class="hoverRow">'+
					//header text changed as per label text for configuable value from xml resource file//:SD
					/*'<td style="width: 5%;" class="tblhd center"><span>#</span></td>'+
					'<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>AS-IS</span></td>'+					
					'<td style="width: 20%;" class="tblhd"><span>AS-IS Description</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>TO-BE</span></td>'+
					'<td style="width: 20%;" class="tblhd"><span>TO-BE Description</span></td>'+					
					'<td style="width: 10%;" class="tblhd center"><span>Edit Item</span></td>'+*/
					'<td style="width: 5%;" class="tblhd center"><span>#</span></td>'+
					'<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>AS IS</span></td>'+					
					'<td style="width: 20%;" class="tblhd"><span>AS IS Description</span></td>'+
					'<td style="width: 10%;" class="tblhd "><span>TO BE</span></td>'+
					'<td style="width: 20%;" class="tblhd"><span>TO BE Description</span></td>'+					
					'<td style="width: 10%;" class="tblhd center"><span>Edit Item</span></td>'+
				'</tr>'+
			'</thead>'+
			'<tbody>';
			
			var url=Main.getSiteUrl();
			
			//SM: Modified to show only processes for selected project
			/**********************************************************************/
			var camlQuery ="";
				var camlQuery ='<Query><Where><Eq><FieldRef Name="ProjectID" /><Value Type="Text">' + $('#projectNamesForProcess').val() + '</Value></Eq></Where></Query>';
				
				var listname=jP.Lists.setSPObject(Configuration.SiteURL,'Processes');
			/**********************************************************************/
			
			var result=listname.getSPItemsWithQuery(camlQuery).Items;
			var cnt=0;
			if(result != null && result != undefined)
			{
				$('#pagingProcess').show();

				processSavedForProjectId = result;
				var resultLength =  result.length;
				Configuration.gAttlengthProc=resultLength ;
				if(resultLength >=(Configuration.startIndexProc+5))
					Configuration.EiProc=Configuration.startIndexProc+5;
				else
					Configuration.EiProc=resultLength ;
					
	
				for(var i=Configuration.startIndexProc;i<Configuration.EiProc;i++)
				{
					cnt=i+1;
					
					/* Added by shilpa for bug 5605 on 11th March */
					var asIS = result[i]["AsIsID"].replace(/"/g, "&quot;"); 
					asIS = asIS.replace(/'/g, '&#39;');
					if(result[i]["AsIsDescription"] != null && result[i]["AsIsDescription"] != undefined )
					{
						var asISDesc = result[i]["AsIsDescription"].replace(/"/g, "&quot;");
						asISDesc = asISDesc.replace(/'/g, '&#39;');
					}
					var toBe = result[i]["ToBeID"].replace(/"/g, "&quot;"); 
					toBe = toBe.replace(/'/g, '&#39;');
					if(result[i]["ToBeDescription"] != null && result[i]["ToBeDescription"] != undefined )
					{
						var toBeDesc = result[i]["ToBeDescription"].replace(/"/g, "&quot;"); 
						toBeDesc = toBeDesc.replace(/'/g, '&#39;');
					}

					gridDetails+='<tr>'+
						'<td class="center">'+cnt+'</td>'+
						//'<td>'+result[i]["ProjectName"]+'</td>'+
						'<td>'+document.getElementById('projectNamesForProcess').options[document.getElementById('projectNamesForProcess').selectedIndex].title+'</td>'+ // Added by shilpa for bug 5277
						'<td title="'+asIS+'">'+((result[i]["AsIsID"] == null || result[i]["AsIsID"] == undefined )?"-":trimText(result[i]["AsIsID"],30))+'</td>'+
						'<td title="'+((result[i]["AsIsDescription"] == null || result[i]["AsIsDescription"] == undefined )?"-":asISDesc)+'">'+((result[i]["AsIsDescription"] == null || result[i]["AsIsDescription"] == undefined )?"-":trimText(result[i]["AsIsDescription"],30))+'</td>'+						
						'<td title="'+toBe+'">'+((result[i]["ToBeID"] == null || result[i]["ToBeID"] == undefined )?"-":trimText(result[i]["ToBeID"],30))+'</td>'+
						'<td title="'+((result[i]["ToBeDescription"] == null || result[i]["ToBeDescription"] == undefined )?"-":toBeDesc)+'">'+((result[i]["ToBeDescription"] == null || result[i]["ToBeDescription"] == undefined )?"-":trimText(result[i]["ToBeDescription"],30))+'</td>'+
						'<td class="center"><a onclick="Configuration.fillForm('+result[i]["ID"]+')"  title="Edit Process Details"  class="pedit" style="cursor:Pointer"></a>'+
						'<a onclick="Configuration.delProcess('+result[i]["ID"]+');" title="Delete process"  class="pdelete" style="cursor:Pointer"></a></td>'+
					'</tr>';
				}
				
				gridDetails+='</tbody>'+
							'</table>';	
			//Code Modifed By swapnil kamle on 31/7/2012 to get process grid when configuration tab clicked									
			//$("#process").html(gridDetails);	
			//
			$("#processGrid").html(gridDetails);
			resource.UpdateTableHeaderText();//:SD
 			var info='<label>Showing '+(Configuration.startIndexProc+1)+ '-'+Configuration.EiProc+' Processes of Total '+(result).length+' Processes </label> | <a id="previousProc" style="cursor:pointer" onclick="Configuration.startIndexTDecrementProc();Configuration.gridDetailsForProcess()">Previous</a> | <a  id="nextProc" style="cursor:pointer" onclick="Configuration.startIndexTIncrementProc();Configuration.gridDetailsForProcess()">Next</a>';
 			$('#pagingProcess').empty();
 			$("#pagingProcess").append(info); 

				if(Configuration.startIndexProc<=0) 
		        {   
					document.getElementById('previousProc').disabled="disabled";  
					document.getElementById('previousProc').style.color="#989898";
				}
				else
					document.getElementById('previousProc').disabled=false;
				     
				if(resultLength <=((Configuration.startIndexProc)+5)) 
				{
					document.getElementById('nextProc').disabled="disabled";  
				    document.getElementById('nextProc').style.color="#989898";
				}
				else
					document.getElementById('nextProc').disabled=false;
			}
			else
				{
					$("#processGrid").empty();
					$("#processGrid").append("<p class='clear'></p><h3>There are no Processes.</h3>");
					/*var info='<label>Showing ' +0+'-'+0+' of total  ' +0+' Processes</label> | <a id="previousProc" style="cursor:pointer"  onclick="Configuration.startIndexTDecrementProc();Configuration.gridDetailsForProcess()">Previous</a> | <a id="nextProc" style="cursor:pointer"  onclick="Configuration.startIndexTIncrementProc();Configuration.gridDetailsForProcess()">Next</a>';
					$('#pagingProcess').empty();
					$('#pagingProcess').append(info);	
					document.getElementById('previousProc').disabled="disabled";
					document.getElementById('previousProc').style.color="#989898";
					document.getElementById('nextProc').disabled="disabled";
					document.getElementById('nextProc').style.color="#989898";*/
					$('#pagingProcess').hide();

				}
},

startIndexTIncrementProc:function ()
{
	if(Configuration.gAttlengthProc>Configuration.startIndexProc+5)
		Configuration.startIndexProc+=5;
},
startIndexTDecrementProc:function ()
{
    if(Configuration.startIndexProc>0)
		Configuration.startIndexProc-=5;
},

//Edit Processes

fillForm:function(ID)
{
	$("#newProcess").show();
	$("#btnSaveProcess").hide();
	$("#btnUpdateProcess").show();
	$("#btnCancelProcess").hide();
	$("#btnResetProcess").show();
	
	var query='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+ID+'</Value></Eq></Where></Query>';
	var url=Main.getSiteUrl();
	var listname=jP.Lists.setSPObject(url,'Processes');
	var result=listname.getSPItemsWithQuery(query).Items;
	if(result != null && result != undefined)
	{
		document.getElementById('txtAsIs').value=result[0]["AsIsID"];
		document.getElementById('txtToBe').value=result[0]["ToBeID"]; 
		document.getElementById('txtToBeDescription').value=result[0]["ToBeDescription"]==undefined ? "" : result[0]["ToBeDescription"];
		document.getElementById('txtAsIsDescription').value=result[0]["AsIsDescription"]==undefined ? "": result[0]["AsIsDescription"];	
		document.getElementById('processId').value=ID;	
	}
},

//Start of Update Process Function

update:function()
{
	if(Configuration.validateProcess())
	{
	
	var url= Main.getSiteUrl();
	var listname =  jP.Lists.setSPObject(url,'Processes');
	var obj = new Array();
				obj.push({'ID':$('#processId').val(),
								  'ProjectID':$('#projectNamesForProcess').val(),
								  'ProjectName':$('#projectNamesForProcess option:selected').text(),				  
								  'ToBeID'	:document.getElementById('txtToBe').value ,
								  'AsIsID' :document.getElementById('txtAsIs').value, 
								  'ToBeDescription' :document.getElementById('txtToBeDescription').value,
								  'AsIsDescription' :document.getElementById('txtAsIsDescription').value 	 		
										});
				var result = listname.updateItem(obj);
		
		document.getElementById('txtAsIs').value='' ;
		document.getElementById('txtToBe').value=''; 
		document.getElementById('txtToBeDescription').value='';
		document.getElementById('txtAsIsDescription').value='';					
		Configuration.alertBox('Processes Updated successfully!!');
		$("#btnSaveProcess").show();
		$("#btnUpdateProcess").hide();
		Configuration.gridDetailsForProcess();
	 }
	 else
	    {	$("#btnSaveProcess").show();
			$("#btnUpdateProcess").hide();

			Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
		}
	Main.hideLoading();
},
/*Delete*/

delProcessOk:function(ID)
{
	var ProcessList = jP.Lists.setSPObject(Main.getSiteUrl(),'Processes');
	ProcessList.deleteItem(ID);
	//$('#divConfirm').dialog("destroy")
	Configuration.alertBox('Processes deleted successfully!!');
	Configuration.clearFieldsOnDelete();
	Configuration.gridDetailsForProcess();
},
delProcess:function(ID)
{							
			$("#dialog:ui-dialog" ).dialog( "destroy" );
			$("#divConfirm" ).text('Are you sure you want to delete ?');							
			$("#divConfirm" ).dialog({
			autoOpen: false,
			resizable: false,
			height:140,
			modal: true,
			buttons: {
						"Delete": function() {
									Main.showLoading();
									setTimeout('Configuration.delProcessOk('+ID+');',100);
									$('#divConfirm').dialog("destroy")
									Main.hideLoading();
									//Configuration.clearFields();

									 },
						"Cancel": function() {
										$( this ).dialog( "close" );
											}
						}
							});
							
		$('#divConfirm').dialog("open");
			 	
		Main.hideLoading();
},

/*End of Update Function*/
resetProcess:function(){
		Configuration.fillForm(document.getElementById('processId').value);
	},
//Add mode for Process 	
addMode:function(){
		Configuration.blankProcess();
		$("#btnSaveProcess").show();
		$("#btnCancelProcess").show();
		$("#btnUpdateProcess").hide();
		$("#btnResetProcess").hide();
		$("#newProcess").hide();
		
		document.getElementById('processId').value='';
},
//////////Upload File Code Added by Shilpa/////////////

UploadFilePopUp:function(){
	//if($('#projectForFileUpload').text() == "No Project Available")
	if($('#projectForFileUpload').text() == "No "+Configuration.gConfigProject+" Available")//:SD
	{
		//Configuration.alertBox('No Project Available.');
		Configuration.alertBox('No '+Configuration.gConfigProject+' Available.');//:SD
	}
	else
	{
		$('#upload').dialog( {height: 275,width: 450,resizable: false,title:"Configuration",modal: true ,close: function() {Configuration.renewUploadPopup();}});
		$("#upload").parent().appendTo($("form:first"));
		
		$('.ms-standardheader nobr:eq(2)').html("Attachment&nbsp;Name&nbsp;<font color='red'>*</font>");
		$('.ms-standardheader nobr:eq(3)').html("Description");//added by shilpa on 29 Nov
		$('#partAttachment table tbody tr:eq(1) td:eq(0)').html("File Name<font color='red'>*</font>"); //added by shilpa on 1st Nov
		$('.ms-attachUploadButtons').css('padding-bottom','7px');
		$("input[title$='AttachmentName']").css('float','right');
		$("textarea[title$='FileDescription']").css('float','right');
		$("input[title$='AttachmentName']").css('padding-right','6px');
		$("textarea[title$='FileDescription']").css('padding-right','5px');

	}
	$("#upload h2 span").css("display","none");
	Main.hideLoading();
},
renewUploadPopup:function(){
 /* Added by shilpa on 29 Nov */
	$('#attachRow0').remove();
	$("[title$='AttachmentName']").val("");
	$("[title$='Description']").val("");
	$("#attachOKbutton").show();
	$('#attachmentsOnClient').empty().append('<input style="width: 205pt;" id="onetidIOFile" class="ms-fileinput" title="Name  " name="fileupload0" size="56" type="file">');
	$("#idAttachmentsRow").hide();
    $('#partAttachment table tbody tr:eq(1) td:eq(0)').show();
    $('#partAttachment table tbody tr:eq(3)').show();
},

/////////////////////////////////////////////

bindUploadedFileGrid:function(pId){
	//alert("called"+pId);
	/* Added by shilpa on 15 march for bug 3890 */
	if(pId != '' && pId != undefined && pId != null) 
	{
		var prjID =	pId;
		$('#projectForFileUpload option[value="'+pId+'"]').attr('selected', 'selected');
	}
	else
	{	
		if($('#projectForFileUpload').val()!=undefined && $('#projectForFileUpload').val()!=null)
			var prjID = $('#projectForFileUpload').val();
		else
			var prjID =	pId;
	}
//	var query ="<Query><Where><Eq><FieldRef Name='ProjectID' /><Value Type='Text'>"+$('#projectForFileUpload').val()+"</Value></Eq>";
	var query ="<Query><Where><Eq><FieldRef Name='ProjectID' /><Value Type='Text'>"+prjID+"</Value></Eq>";
	query+="<ViewFields><FieldRef Name='ID'/><FieldRef Name='AttachmentName' /><FieldRef Name='Description' /><FieldRef Name='ProjectID' /><FieldRef Name='FileName' /></ViewFields>";			
		query+="<OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Where></Query>";	
		var result = Configuration.dmlOperation(query,'ConfigureDocuments');
		$('#grdUploadedFiles').empty();
		
		var tablemarkup = '<table cellspacing="0" class="gridDetails" style="width:650px;">'+
              			  '<thead>'+
                  		  '<tr>'+
                        	'<td width="40" class="tblhd center" style="width:5%"><span>#</span></td>'+
                                    '<td class="tblhd" style="width:20%"><span>File Name</span></td>'+
                                    '<td class="tblhd" style="width:40%"><span>File View</span></td>'+
                                    '<td class="tblhd" style="width:20%"><span>File Description</span></td>'+
                                    '<td class="tblhd" style="width:15%"><span>Delete Item</span></td>'+
                           '</tr>'+
		                '</thead>'+
		                '<tbody>';   
		var cnt=0;
		if(result != null && result != undefined)
		{
			//for(var i=0;i<result.length;i++)
			//{
				$('#pagingFile').show();

				var resultLength =  result.length;
				Configuration.gAttlengthFile=resultLength ;
				if(resultLength >=(Configuration.startIndexFile+5))
					Configuration.EiFile=Configuration.startIndexFile+5;
				else
					Configuration.EiFile=resultLength ;					
	
				for(var i=Configuration.startIndexFile;i<Configuration.EiFile;i++)
				{
					//cnt++;
					var attName = (result[i]["AttachmentName"]).replace(/"/g, "&quot;"); 
					attName = attName.replace(/'/g, '&#39;');

					cnt= i+1;
					var iconHtml = Configuration.displayIcons(result[i]['FileName'].toString());
					tablemarkup+= "<tr class='doubleCoumn'><td class='center '>"+cnt+"</td>";
					tablemarkup+="<td align='left' title='"+attName+"'><span>"+trimText(result[i]["AttachmentName"],30)+"</span></td>";
					tablemarkup+="<td align='left'>"+iconHtml+"<a class='orange' style='padding-left:5px;vertical-align:middle;' href='"+Main.getSiteUrl()+"/Lists/ConfigureDocuments/Attachments/"+result[i]["ID"]+"/"+result[i]['FileName'].toString()+"' target='_blank'><font color=''>"+result[i]['FileName'].toString()+"</font></a></td>";
											//'<td class="center"><span><a title="Edit Attachment" onclick="attachment.editAttachment('+result[j]["ID"]+',\''+result[j]["TestStepID"]+'\',\''+result[j]['AttachmentName'].toString()+'\',\''+result[j]['Description']+'\');attachment.preview(\''+result[j]['ID']+'/'+result[j]['FileName']+'\');" style="cursor:pointer;" class="pedit">&nbsp;</a><a title="Delete Attachment"  onclick="attachment.deleteAttachment('+result[j]["ID"]+')" class="pdelete"  style="cursor:pointer;">&nbsp;</a></span></td></tr>'; 
											//'<td class="center"><span><a title="Edit Attachment" onclick="" style="cursor:pointer;" class="pedit">&nbsp;</a><a title="Delete Attachment"  onclick="Configuration.deleteFile('+result[i]["ID"]+')" class="pdelete"  style="cursor:pointer;">&nbsp;</a></span></td></tr>'; 
					 if(result[i]["FileDescription"]!=undefined && result[i]["FileDescription"]!=null)
					 {	
					 	var desc = result[i]["FileDescription"].replace(/"/g, "&quot;");
						desc = desc.replace(/'/g, '&#39;');
						tablemarkup+="<td align='left' title='"+desc+"'><span>"+trimText(result[i]["FileDescription"],30)+"</span></td>";
					 }	
					 else
					 {
					 	tablemarkup+="<td align='left' title='-'><span>-</span></td>";
					 }	
						tablemarkup+='<td class="center"><span><a title="Delete Attachment"  onclick="Configuration.deleteFile('+result[i]["ID"]+')" class="pdelete"  style="cursor:pointer;">&nbsp;</a></span></td></tr>'; 
				}						
				
				tablemarkup+= '</tbody></table>';
				$('#grdUploadedFiles').append(tablemarkup);
	
				var info='<label style="font-weight:normal;display:inline-block;">Showing '+(Configuration.startIndexFile+1)+ '-'+Configuration.EiFile+' Files of Total '+(result).length+' Files </label> | <a id="previousFile" style="cursor:pointer" onclick="Configuration.startIndexTDecrementFile();Configuration.bindUploadedFileGrid()">Previous</a> | <a  id="nextFile" style="cursor:pointer" onclick="Configuration.startIndexTIncrementFile();Configuration.bindUploadedFileGrid()">Next</a>';
 				$('#pagingFile').empty();
 				$("#pagingFile").append(info); 

				if(Configuration.startIndexFile<=0) 
		        {   
					document.getElementById('previousFile').disabled="disabled";  
					document.getElementById('previousFile').style.color="#989898";
				}
				else
					document.getElementById('previousFile').disabled=false;
				     
				if(resultLength <=((Configuration.startIndexFile)+5)) 
				{
					document.getElementById('nextFile').disabled="disabled";  
				    document.getElementById('nextFile').style.color="#989898";
				}
				else
					document.getElementById('nextFile').disabled=false;	
			
			/* Added by shilpa on 15 march */
			if($('#grdUploadedFiles table tbody').find('tr').length == 0)
			{
				Configuration.startIndexTDecrementFile();
				Configuration.bindUploadedFileGrid();
			}

		}
		else
		{
			$("#grdUploadedFiles").empty();
			$("#grdUploadedFiles").append("<p class='clear'></p><h3>There are no Files Uploaded.</h3>");
			/*var info='<label style="font-weight:normal;">Showing ' +0+'-'+0+' of total  ' +0+' Processes</label> | <a id="previousFile" style="cursor:pointer"  onclick="Configuration.startIndexTDecrementFile();Configuration.bindUploadedFileGrid()">Previous</a> | <a id="nextFile" style="cursor:pointer"  onclick="Configuration.startIndexTIncrementFile();Configuration.bindUploadedFileGrid()">Next</a>';
			$('#pagingFile').empty();
			$('#pagingFile').append(info);	
			document.getElementById('previousFile').disabled="disabled";
			document.getElementById('previousFile').style.color="#989898";
			document.getElementById('nextFile').disabled="disabled";
			document.getElementById('nextFile').style.color="#989898";*/
			$('#pagingFile').hide();
		}

		//tablemarkup+= '</tbody></table>';
		//if(result != null && result != undefined)
			//$('#grdUploadedFiles').append(tablemarkup);

},

startIndexTIncrementFile:function (){
            if(Configuration.gAttlengthFile>Configuration.startIndexFile+5)
				Configuration.startIndexFile+=5;
},
startIndexTDecrementFile:function (){
            if(Configuration.startIndexFile>0)
				Configuration.startIndexFile-=5;
},

deleteFileOk:function(id){
	var listName = jP.Lists.setSPObject(Main.getSiteUrl(),'ConfigureDocuments');						
    var res = listName.deleteItem(id);									
	Configuration.alertBox("Attachment Deleted !!! ");
	//Configuration.clearFields();
	//$( this ).dialog( "close" );
	Configuration.startIndexFile=0;										
	Configuration.bindUploadedFileGrid();
},
deleteFile:function(id){
//divConfirmDelete
	$( "#divConfirm" ).text('Are you sure want to delete attachment?');				
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
										setTimeout('Configuration.deleteFileOk('+id+');',100);																						
										$( this ).dialog( "close" );
										Main.hideLoading();									
									 },
				"Cancel": function() {
										$( this ).dialog( "close" );
									 }
			}
		});
	$('#divConfirm').dialog("open");
	
},
displayIcons:function(filename){
		var ext = filename.split('.').pop();
					
					switch(ext)
					{
						case "doc":
						case "docx": 
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/icon-word.png"/>';
						}
						break;
						
						case "xls":
						case "xlsx": 
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/icon-excel.png"/>';
						}
						break;
						
						case "ppt":
						case "pptx": 
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/icon-powerpoint.png"/>';
						}
						break;
						
						case "jpg":
						case "jpeg":
						case "gif":
						case "bmp":
						case "png":
						case "bmp":						
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/image.png"/>';
						}
						break;

						case "pdf":
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/icon-pdf.png"/>';
						}
						break;
						
						case "msg":
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/outlook.jpg"/>';
						}
						break;

						case "txt":
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/textfileicon.png"/>';
						}
						break;

						
						default:
						{
							filesHtml='<img style="vertical-align:middle;padding-left:5px;" src="../SiteAssets/images/unknown file.jpg"/>';
						}
						break;
					}

			return filesHtml;
},
//code added on 24 March to show projects for which login user is tester on 1st tab by sheetal
populateProjectForTester:function(){

  if($.inArray('4',security.userType)!=-1 )//login user is tester for some projects
  {
			
			var query='<Query><Where>'+
							'<Eq>'+
					         '<FieldRef Name="SPUserID" />'+
					         '<Value Type="Text">'+_spUserId+'</Value>'+
					      '</Eq>'+
					   '</Where>'+
					   '<OrderBy><FieldRef Name="ID" Ascending="False" /></OrderBy>'+
                      '<ViewFields>'+
                      '<FieldRef Name="ProjectID" /><FieldRef Name="SPUserID" /><FieldRef Name="ID" />'+
                       '</ViewFields>'+
                      '</Query>';    
		
		var ProjectForTester = Configuration.dmlOperation(query,'Tester');
		if(ProjectForTester != 'undefined' && ProjectForTester!=null)
		{
		    
			if(ProjectForTester.length<=147)
			{
				var queryPrj='<Query><Where>';
				var orEndTags;

				for(var i=0;i<ProjectForTester.length-1;i++)
					{
						queryPrj+='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+ProjectForTester[i]['ProjectID']+'</Value></Eq>';
				    	orEndTags+='</Or>';	
				    } 
					queryPrj+='<Eq><FieldRef Name="ID"/><Value Type="Text">'+ProjectForTester[i]['ProjectID']+'</Value></Eq>';
				    queryPrj+=orEndTags;
					queryPrj+='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="projectName" /><FieldRef Name="prjLeadFulNm" /><FieldRef Name="projectLead" /><FieldRef Name="description" /><FieldRef Name="status"/><FieldRef Name="url" /><FieldRef Name="appUrl" /></ViewFields></Query>';				
					var PrjTester = Configuration.dmlOperation(queryPrj,'Project');
			}
			else
			{  var PrjTester=new Array();
			   var numberOfIterations=Math.ceil(ProjectForTester.length/147);
			   var orEndTags;
			   var iterations=0;
			   for(var y=0;y<numberOfIterations-1;y++)
			     {
			       var queryPrj='<Query><Where>';
					orEndTags='';

			       for(var i=iterations;i<(147+iterations-1);i++)
			       {
			         queryPrj+='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+ProjectForTester[i]['ProjectID']+'</Value></Eq>';
			         orEndTags+='</Or>';
			       }
			       queryPrj+='<Eq><FieldRef Name="ID"/><Value Type="Text">'+ProjectForTester[i]['ProjectID']+'</Value></Eq>';
				   queryPrj+=orEndTags;
				   queryPrj+='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="projectName" /><FieldRef Name="prjLeadFulNm" /><FieldRef Name="projectLead" /><FieldRef Name="description" /><FieldRef Name="status"/><FieldRef Name="url" /><FieldRef Name="appUrl" /></ViewFields></Query>';				
			       $.merge(PrjTester,Configuration.dmlOperation(queryPrj,'Project'));
			       iterations+=147;
			     }
			       var queryPrj='<Query><Where>';
					orEndTags='';

			     for(var ii=iterations;ii<ProjectForTester.length-1;ii++)
			      {
			        
			        queryPrj+='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+ProjectForTester[ii]['ProjectID']+'</Value></Eq>';
			         orEndTags+='</Or>';

			      }
			       queryPrj+='<Eq><FieldRef Name="ID"/><Value Type="Text">'+ProjectForTester[ii]['ProjectID']+'</Value></Eq>';
				   queryPrj+=orEndTags;  
			       queryPrj+='</Where><ViewFields><FieldRef Name="ID" /><FieldRef Name="projectName" /><FieldRef Name="prjLeadFulNm" /><FieldRef Name="projectLead" /><FieldRef Name="description" /><FieldRef Name="status"/><FieldRef Name="url" /><FieldRef Name="appUrl" /></ViewFields></Query>';				
			       $.merge(PrjTester,Configuration.dmlOperation(queryPrj,'Project'));

			}
		}
		//fill projects for which login user is tester
		
		var tempProjArr = new Array();
		var uniquePrjName = new Array();
		
		if(PrjTester != 'undefined' && PrjTester !=null)
		{
			var uniquePrj = new Array();
			for(var i=0;i<PrjTester.length;i++)
			{
				//if($.inArray(PrjTester[i]['ID'],uniquePrj)==-1)
				if($.inArray(PrjTester[i]['ID'],uniquePrj)==-1 && $.inArray(PrjTester[i]['projectName'],uniquePrjName)==-1 )
				{
					var obj=new Option();
					document.getElementById('projectForTester').options[i]=obj;
					document.getElementById('projectForTester').options[i].title = PrjTester[i]['projectName'];
		   			document.getElementById('projectForTester').options[i].text = PrjTester[i]['projectName'];
		   			document.getElementById('projectForTester').options[i].value=PrjTester[i]['ID'];
		   			uniquePrj.push(PrjTester[i]['ID']);
		   			uniquePrjName.push(PrjTester[i]['projectName']);
	   			} 
	   			
	   			if(Configuration.isPortfolioOn)
	   			{
	   			//To Fill the project and version on global array
	   			if( $.inArray( PrjTester[i]['projectName'] , tempProjArr)== -1 )
	   			{
	   			    tempProjArr.push(PrjTester[i]['projectName']);
	   				//var version = PrjTester[i]['ProjectVersion'] == undefined ||PrjTester[i]['ProjectVersion']==null ||PrjTester[i]['ProjectVersion']==""?"No Version":PrjTester[i]['ProjectVersion'];
	   				var version = PrjTester[i]['ProjectVersion'] == undefined ||PrjTester[i]['ProjectVersion']==null ||PrjTester[i]['ProjectVersion']==""?"Default "+Configuration.gConfigVersion:PrjTester[i]['ProjectVersion'];//Added by Mohini for Resource file
	   				Configuration.getVersionByProjByName[PrjTester[i]['projectName']] = new Array();
	   				Configuration.getVersionByProjByName[PrjTester[i]['projectName']].push({
	   				
	   					'ProjectID':PrjTester[i]['ID'],
	   					'Version':version
	   				});
	   			}
	   			else
	   			{
	   			    //var version = PrjTester[i]['ProjectVersion'] == undefined ||PrjTester[i]['ProjectVersion']==null ||PrjTester[i]['ProjectVersion']==""?"No Version":PrjTester[i]['ProjectVersion'];
	   				var version = PrjTester[i]['ProjectVersion'] == undefined ||PrjTester[i]['ProjectVersion']==null ||PrjTester[i]['ProjectVersion']==""?"Default "+Configuration.gConfigVersion:PrjTester[i]['ProjectVersion'];//Added by Mohini for Resource file

	   				Configuration.getVersionByProjByName[PrjTester[i]['projectName']].push({
	   				
	   					'ProjectID':PrjTester[i]['ID'],
	   					'Version':version
	   				});

	   			}
	   		   }
   			}
   			if(Configuration.isPortfolioOn)
	   		{	
   			//Bind the version for selected project
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectForTester option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectForTesterVersion").html(versionMarkup);	
		   }
   			
		}
		else
		{
				//document.getElementById('projectForTester').options[0].text = "No Project Available";
				document.getElementById('projectForTester').options[0].text = "No "+Configuration.gConfigProject+" Available";//:SD
				document.getElementById('projectForTester').options[0].value = "0"; 
				if(Configuration.isPortfolioOn)
				   document.getElementById('projectForTesterVersion').options[0].text = "No "+Configuration.gConfigVersion+" Available";//:SD

		}
  }

},
ProjectChange:function()
{
			//Code added by Ejaz Waquif for Portfolio
			//Bind the version for selected project
			if(Configuration.isPortfolioOn)
            {
   			var verLen = 0;
   			var versionMarkup = '';
   			var projObj = Configuration.getVersionByProjByName[$('#projectForTester option:selected').attr('title')];
   			if( projObj != undefined )
   				verLen = projObj.length;
   			for(var i = 0;i<verLen;i++)
   			{
   				versionMarkup +='<option value="'+projObj[i]["ProjectID"]+'">'+projObj[i]["Version"]+'</option>'
   			}
   			
   			if(versionMarkup=='')
   				//versionMarkup = '<option>No Version</option>';
   				versionMarkup = '<option>Default '+Configuration.gConfigVersion+'</option>';
   			
			$("#projectForTesterVersion").html(versionMarkup);
		    }
		//End Code added by Ejaz Waquif for Portfolio

},
VersionChange:function()
{
	if($('#projectForTesterVersion option:selected').val()!= "" && $('#projectForTesterVersion option').length >1)
	{
		$("#projectForTester option:selected").val($('#projectForTesterVersion option:selected').val());
		Configuration.populateTestPassForTester();Configuration.gridDetails();(Configuration.getDoc().length==0)?noActHandle():initDocPagination();Configuration.getServrsFrLogInUser();
	
	}

},
populateTestPassForTester:function()
{

		
		document.getElementById('testPassforPrj').disabled = false;
		var testerquery='<Query><Where><And><Eq><FieldRef Name="ProjectID" /><Value Type="Text">'+$("#projectForTester").val()+'</Value></Eq><Eq><FieldRef Name="SPUserID" /><Value Type="Text">'+_spUserId+'</Value></Eq></And></Where></Query>';
		var TestPassIds=Configuration.dmlOperation(testerquery,'Tester');
		var TestPassidarr=new Array();
		if(TestPassIds!=null && TestPassIds!=undefined)
		{
			for(var i=0;i<TestPassIds.length;i++)
				TestPassidarr[i]=TestPassIds[i]["TestPassID"];
		}
		
		var query ='<Query><Where><Eq><FieldRef Name="ProjectId"/><Value Type="Text">'+$("#projectForTester").val()+'</Value></Eq></Where>'+
				'<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName" /><FieldRef Name="Tester" /><FieldRef Name="DueDate"/></ViewFields>'+
				'<OrderBy><FieldRef Name="Created" Ascending="False" /></OrderBy></Query>';
				
		var TestPassName = Configuration.dmlOperation(query,'TestPass');
		
		$('#testPassforPrj').empty();		
		if( TestPassName != null || TestPassName != undefined)
		{									
			var counter = 0;
			for(var i=0;i<TestPassName.length;i++)
			{			 					
				if($.inArray(TestPassName[i]['ID'],TestPassidarr)!=-1 )
				{
					var obj=new Option();									
					document.getElementById('testPassforPrj').options[counter]=obj;
					document.getElementById('testPassforPrj').options[counter].text = trimText(TestPassName[i]['TestPassName'].toString(),35);
					document.getElementById('testPassforPrj').options[counter].title=TestPassName[i]['TestPassName'].toString();
					document.getElementById('testPassforPrj').options[counter].value = TestPassName[i]['ID'].toString(); 
					counter=counter+1;
				}
			}
		}
		else
		{
			var obj=new Option();
			document.getElementById('testPassforPrj').options[0]=obj;
			document.getElementById('testPassforPrj').options[0].text = "No Test Pass Available";
			document.getElementById('testPassforPrj').options[0].value = "0"; 
			document.getElementById('testPassforPrj').disabled = true;
		}

},

attachPortfolioCheckBoxEvent:function(){


    /*To save the portfolio option*/	
	/*var PortfolioList=jP.Lists.setSPObject(Configuration.SiteURL,'Portfolio');
	var state = '';
	if( Configuration.gPortfolio != $("input[name='portfolioOption']:checked").val() )
	{
	    var portObj = new Array();
	    if(Configuration.gPortfolioID != '')
		{
		    portObj.push({
			    "ID":Configuration.gPortfolioID,
			    "EnablePortfolio":  $("input[name='portfolioOption']:checked").val()
		    });
		}
		else
		{
			 portObj.push({
			    "EnablePortfolio":  $("input[name='portfolioOption']:checked").val()
		    });
		}    
		var r = PortfolioList.updateItem(portObj);
		Configuration.gPortfolioID = r.ID;*/
		Configuration.gPortfolio = $("input[name='portfolioOption']:checked").val();
		if(parseInt(Configuration.gPortfolio))
		{
			//Configuration.alertBox(Configuration.gConfigPortfolio+" enabled successfully!");
			var msg="Once ‘Enable "+Configuration.gConfigPortfolio+"’ is selected, you will not be able to make it"+
			                       " ‘Disable "+Configuration.gConfigPortfolio+"’ throughout the application."+
                                   "Are you sure you want to proceed for ‘Enable "+Configuration.gConfigPortfolio+"’?</br></br>";
            msg+="<b>Note: </b>Please download the files &nbsp;"; 
            msg+="<a href='../SiteAssets/GuidelineDocs/UAT_Enable Portfolio_RGen_V1.0.pdf' target='_blank' style='text-decoration:underline;color:blue'>Enable "+Configuration.gConfigPortfolio+"</a>";                     
			msg+="&nbsp;and&nbsp;<a href='../SiteAssets/GuidelineDocs/UAT_Disable Portfolio_RGen_V1.0.pdf' target='_blank' style='text-decoration:underline;color:blue'>Disable "+Configuration.gConfigPortfolio+"</a>";
			msg+="&nbsp;to know more on working and benefits of these features.";
			Configuration.alertBoxforPortfolio(msg);
			
		}
		else
		{
			Configuration.alertBox(Configuration.gConfigPortfolio+" disabled successfully!");
			var PortfolioList=jP.Lists.setSPObject(Configuration.SiteURL,'Portfolio');
			var state = '';
			if(Configuration.portfolioFlag!= $("input[name='portfolioOption']:checked").val() )
			{
			    var portObj = new Array();
			    if(Configuration.gPortfolioID != '')
				{
				    portObj.push({
					    "ID":Configuration.gPortfolioID,
					    "EnablePortfolio":  $("input[name='portfolioOption']:checked").val()
				    });
				}
				else
				{
					 portObj.push({
					    "EnablePortfolio":  $("input[name='portfolioOption']:checked").val()
				    });
				}    
				var r = PortfolioList.updateItem(portObj);
				Configuration.isPortfolioOn=false;
				Configuration.gPortfolioID = r.ID;
				Configuration.portfolioFlag=0;
			}
			/*For change of version for Portfolio by Mohini DT:08-05-2014*/
			$('#tab1 div table tr:eq(1)').hide(); //to hide the version field of config tab
  		    $('#tab2 div div table tr:eq(1)').hide();//to hide the version field of US tab
  		    $('#tab3 div table tr:eq(1)').hide();//to hide the version field of DL tab
            $('#tab4 div div table tbody tr:eq(1)').hide();//to hide the version field of PD tab
            $('#GSVersionField').hide();//to hide the version field of GS tab	
            $('#ProjectOptions').text('Project Level Options:');
            $('#UATStatistic').css('margin-top','-204px');
		}
		
	//}


},
/*For change of version for Portfolio by Mohini DT:08-05-2014*/
alertBoxforPortfolio:function(msg)
{
    // Main.showLoading();
     $("#divAlert2").html(msg);
     $('#divAlert2').dialog({
        height: 150,
		modal: true, 
		close: function (ev, ui)
		       {
		            if(Configuration.portfolioFlag != 1)
                         $('input[id="portfolioOption'+Configuration.portfolioFlag).attr('checked','checked');
			   },
		buttons:{
			     "Yes":function()
			     {
			            Main.showLoading();
					    $('#appDiv').hide();
					    $('#EnPortf').show();
					    $('#tab5dropdown').css('margin-top','5px');
					    var PortfolioList=jP.Lists.setSPObject(Configuration.SiteURL,'Portfolio');
						var state = '';
						if(Configuration.portfolioFlag != $("input[name='portfolioOption']:checked").val() )
						{
						    var portObj = new Array();
						    if(Configuration.gPortfolioID != '')
							{
							    portObj.push({
								    "ID":Configuration.gPortfolioID,
								    "EnablePortfolio":  $("input[name='portfolioOption']:checked").val()
							    });
							}
							else
							{
								 portObj.push({
								    "EnablePortfolio":  $("input[name='portfolioOption']:checked").val()
							    });
							}    
							var r = PortfolioList.updateItem(portObj);
							Configuration.isPortfolioOn=true;
							Configuration.gPortfolioID = r.ID;
							Configuration.portfolioFlag=1;
							
							Configuration.onPageLoad();
						    Configuration.populateTestPassForTester();
						    /*For change of version for Portfolio by Mohini DT:08-05-2014*/
							$('#tab1 div table tr:eq(1)').show(); //to show the version field of config tab
				      		$('#tab2 div div table tr:eq(1)').show();//to show the version field of US tab
				      		$('#tab3 div table tr:eq(1)').show();//to show the version field of DL tab
				            $('#tab4 div div table tbody tr:eq(1)').show();//to show the version field of PD tab
				            $('#GSVersionField').show();//to show the version field of GS tab
				            $('#ProjectOptions').text('Version Level Options:');
				            $('#UATStatistic').css('margin-top','-140px');
						}
					    
					    $(this).dialog("close");
					    Main.hideLoading();
					   
			     },
			     "No":function()
			     {
			        $('input[id="portfolioOption'+Configuration.portfolioFlag).attr('checked','checked');
			        $(this).dialog("close");

			     }
		     }
		
		
		
     });
     // Main.hideLoading();
}

}