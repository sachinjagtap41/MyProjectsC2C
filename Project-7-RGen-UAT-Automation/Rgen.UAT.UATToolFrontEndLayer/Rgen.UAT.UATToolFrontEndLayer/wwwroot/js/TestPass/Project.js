var project={
		SiteURL:Main.getSiteUrl(),
		globalDueDate:" ",
		landedUrl:" ",
		oldLeadSPUserId:"",
		landedAliasUrl:"",
		landedAppUrl:"",
		landedAliasAppUrl:"",
		landedProjectName:" ",
		landedProjectId:" ",
		landedPriority:" ",
		landedStatus:" ",
		landedLead:" ",
		landedDescription:'Write down the description of project',
		landedStartDate:" ",
		landedEndDate:" ",
		tabSelected:"",
		startIndex:0,
		endIndex:" ",
		oldLead:"",
		oldLeadFullName:"",
		oldLeadMailId:"",
		newLead:"",
		leadDetails:"",
		descr:new Array(),
		oldDueDate:"",		
		desc:new Array(),
		ProjectListItems:new Array(),
		QueryProject:"",
		ProjectList:"",		
		Ei:0,	
		leadName:"",
		testPassListItems:"",
		prjFulName:"",
		SPUSserID2:"",
		SPUserID1:"",
		//Variable Declare By swapnil kamle For Max Due Date
		getMaxDueDate:"",
		getMinStartDate:"",
		//variables added for stakeholders
		stakeholders:"",
		stakeholdersSPUserIDs:"",
		stakeholder_spUserId:new Array(),
		stakeholder_Name:new Array(),//Alias
		stakeholder_NameOld:new Array(),
		stakeholder_EmailIDs:new Array(),
		stakeholder_FullName:new Array(),
		idOfFirstRow:'',
		projectCount:'',
		countVal:'',
		arrtest1:new Array(),
		pageIndex:'',
	    /***********Added for resource file by Mohini*******************/
		gConfigProject:"Project",
		gConfigTestPass:"Test Pass",
		gConfigStakeholders:"Stakeholders",
		gConfigLead:"Lead",
		gConfigGroup:"Group",
		gConfigPortfolio:"Portfolio",
		gConfigVersion:"Version",

		/*PNew variable*/
		isPortfolioOn:false,
		gGroupPortfolioArr:new Array(),
		gGroupPortfolioIdArr:new Array(),
		gGroupPortfolioProjectArr:new Array(),
		gUserProjArr:new Array(),
		gProjectList:new Array(),
		garrIDofGroup:new Array(),
		gUserInfo:new Array(),
		/*PNew variable*/
		tabClick:0,
		stakeHolderDetailsArr:new Array(),
		leadSPUserID:'',

pageload:function()
{
	/*isPortfolioOn = false;
	project.isPortfolioOn = isPortfolioOn;*/
	 		
	project.AddNewDelegate();
	
	$("#navProjects").attr("onclick","ProjectMgnt_Portfolio.aspx");

    $(".createFormWithoutPortfolio").remove();
    Main.showLoading(); 
  
	$('#navHeading tr:eq(1) td').attr('class','activeNav');
	$('#navHeading tr:eq(1) td img').attr('src','../SiteAssets/images/Admin/b_Current Folder.png');
   	
    $("#pplLead").bind("contextmenu", function(e) {return false;});
	$("#pplStakeHolder").bind("contextmenu", function(e) {return false;});
	$("a[title='Browse']").css("margin-right","25px");
	$("div[title='lead']").css('width','374px');
	//$("div[title='stakeholders']").css('height','80px');
    $('#navProjects').css('background-color','#FFFFFF');
    $(".ms-inputuserfield").css('border','1px #ccc solid');
    $("div[title='stakeholders']").css('min-height','80px');
    $("a[title='Check Names']").css('display','none');

	$('#pageTab h2:eq(1)').click(function(){
			if(project.tabClick ==0)//added for delay in hover over text of group and portfolio
			{ 
			   project.hoverText();
			   project.tabClick =1;
			}
		    $('#deletePortfolio').css('display','none');//Mohini
	        $('#deleteGroup').css('display','none');//Mohini
		    $('#pageTab h2:eq(2)').hide();
		    $('#countDiv').hide();
		    project.clearPortfolio();
	        $('#ProjectGrid').hide();
			$('#Pagination1').hide();
			$('#noP').hide()
	        $('#Projectform').show();
			$('#pageTab h2:eq(0)').css('color','#7F7F7F');
		    $('#pageTab h2:eq(1)').css('color','#000000');
		    document.getElementById('btnUpdate').style.display="none";
	   		document.getElementById('btnCancel').style.display="none";
	   		document.getElementById('btnSave').style.display="inline";
	   		document.getElementById('btnClear').style.display="inline";
	   		document.getElementById('testPassCount0').style.display="none";
	        document.getElementById('testPassCount').style.display="none";
	          $("a[title='Browse']").eq(0).show();
	        
			if( $("#pName")[0].tagName.toLowerCase() != "select")
			{
		        //$("#pName").replaceWith('<select class="dropDown" id="pName" style="width: 333px;"><option value="0">Select Project</option></select>');
		        $("#pName").replaceWith('<select class="dropDown" id="pName" style="width: 333px;"><option value="0">Select '+project.gConfigProject+'</option></select>');//Added by Mohini for Resource file
		        /*$("#pName").after('<a class="addNew" id="addProject" href="#">Add New</a>');*/
		        $("#pName").after('<a href="#" class="addNew addNew1" id="addProject"><img title="Add Project" src="../SiteAssets/images/Admin/add.png" style="width:23px;height:23px;vertical-align:top;margin-left:7px"/></a>');	
	
		        project.AddNewDelegate();
		        
	        }
     });
     
	 $('#pageTab h2:eq(0)').click(function(){
        project.getProjectList();
        if(project.countVal== 00)
        {
          $("#countDiv").css('display','none');

        }
        else
        {
          $("#countDiv").css('display','');
          $("#labelCount").html(project.countVal);
        }

        $('#pageTab h2:eq(2)').hide();
        $('#Projectform').hide();
        $('#pageTab h2:eq(1)').show();
		$('#pageTab h2:eq(1)').css('color','#7F7F7F');
		$('#pageTab h2:eq(0)').css('color','#000000');
		project.clear();
		document.getElementById('btnUpdate').style.display="none";
   		document.getElementById('btnCancel').style.display="none";
   		document.getElementById('btnSave').style.display="inline";
   		document.getElementById('btnClear').style.display="inline";
   		document.getElementById('testPassCount0').style.display="none";
        document.getElementById('testPassCount').style.display="none";
        $("a[title='Browse']").eq(0).show();
    });
    
	  project.compressFunPortfolio();	
	  if(!project.isPortfolioOn)
	  {
	  	  $("#portfolioEnabledDiv").hide();
		  $("#portfolioEnabledDiv").next('label').html('Project:<font color="red"><b>*</b></font>');
		  $("#pplLead .mandatory").html('Project Lead:<font color="red"><b>*</b></font>')
	  }
	  else
	  {
	  	  project.getGPPArray();
		  project.fillProjects();
	  }
     //Added for bug 6776
	 $("div[title=stakeholders]").hover(function () {
		$('div[title=stakeholders] span').attr('contentEditable','true');
				
	 });
	 
	 
	 //To open the project in Edit mode if user redirect from dashboard to project page :Ejaz Waquif DT:2/19/2014	 
	var url=window.location.href;	 
	var isEdit = url.toLowerCase().indexOf('edit=1')!= -1?true:false;
	var keyVal='';
    var temp=url.indexOf("pid");
    if(temp!=-1)
    {
      keyVal = Main.getQuerystring('pid');
    }
	if(isEdit)
	{
		var editInterval = setInterval(function(){
			
			if( $("tr").hasClass("rowSelected") )
			{
				clearInterval(editInterval);
				$("#"+keyVal).children().eq(6).children().eq(0).click();
			
			}
		
		},1000);
		
	}	 
	//End of To open the project in Edit mode if user redirect from dashboard to project page :Ejaz Waquif DT:2/19/2014
	//To add the default portfolio for default group
	 project.gGroupPortfolioArr["Default "+project.gConfigGroup] = new Array();//Added by Mohini for Resource file
	 project.gGroupPortfolioArr["Default "+project.gConfigGroup].push("Default "+project.gConfigPortfolio);//Added by Mohini for Resource file
	 
	navigation.changeLinks();
	project.deleteGroupPortfolio();
    $('#pplStakeHolder span table tbody tr td:eq(2)').css('float','');//added by Mohini for aligment foe people picker DT:16-07-2014
},

stakeholders:'',


fUrlPopUp:function()
{  
	$( "#divUrlPopUp" ).dialog("open");
	if(document.getElementById('hidProjectPosition').value=='')
	{
	  document.getElementById('actualURL').value='';
	  document.getElementById('aliasURL').value='';
	}
	else
	{
		var i=document.getElementById('hidProjectPosition').value;
		if((project.ProjectListItems)[i]['url']!=null&&(project.ProjectListItems)[i]['url']!=undefined)
		    document.getElementById('actualURL').value=(project.ProjectListItems)[i]['url'];
		else
		    document.getElementById('actualURL').value='';
		if((project.ProjectListItems)[i]['aliasUrl']!=null&&(project.ProjectListItems)[i]['aliasUrl']!=undefined)
		    document.getElementById('aliasURL').value=(project.ProjectListItems)[i]['aliasUrl'];
		else
		    document.getElementById('aliasURL').value='';
	}
	document.getElementById('actualURL').value = ($('#lblUrl').find('a').html() == null || $('#lblUrl').find('a').html() == 'N/A')?"":$('#lblUrl').find('a').attr('title');
	document.getElementById('aliasURL').value = ($('#lblAliasUrl').find('a').html() == null || $('#lblAliasUrl').find('a').html() == 'N/A')?"":$('#lblAliasUrl').find('a').attr('title'); 

},

fUrlPopUp2:function()
{  
	$( "#divUrlPopUp2" ).dialog("open");
	if(document.getElementById('hidProjectPosition').value=='')
	{
		document.getElementById('actualURL2').value='';
		document.getElementById('aliasURL2').value='';
	}
	else
	{
		var i=document.getElementById('hidProjectPosition').value;
		if((project.ProjectListItems)[i]['appUrl']!=null&&(project.ProjectListItems)[i]['appUrl']!=undefined)
		    document.getElementById('actualURL2').value=(project.ProjectListItems)[i]['appUrl'];
		else
		    document.getElementById('actualURL2').value='';
		if((project.ProjectListItems)[i]['aliasAppUrl']!=null&&(project.ProjectListItems)[i]['aliasAppUrl']!=undefined)
		    document.getElementById('aliasURL2').value=(project.ProjectListItems)[i]['aliasAppUrl'];
		else
		    document.getElementById('aliasURL2').value='';
	}
	document.getElementById('actualURL2').value = ($('#lblAppUrl').find('a').html() == null || $('#lblAppUrl').find('a').html() == 'N/A')?"":$('#lblAppUrl').find('a').attr('title');
	document.getElementById('aliasURL2').value = ($('#lblAliasAppUrl').find('a').html() == null || $('#lblAliasAppUrl').find('a').html() == 'N/A')?"":$('#lblAliasAppUrl').find('a').attr('title'); 
},

resolveSPUserID:function(str)
{        

	var subStr=new Array();
			while(str.length!=0)
			{
				/********Logic for extracting SPUserID*********/
				index=str.indexOf("SPUserID");
			
				if(index==-1)
					break;
				
				var subTester=str.substring(str.indexOf("SPUserID"),str.length);
				subTester=subTester.substring(subTester.indexOf("xsd"),subTester.length);
				subTester=subTester.substring(subTester.indexOf(";")+1,subTester.length);
				var SPUserID=subTester.substring(subTester.indexOf(";")+1, subTester.indexOf("&lt"));  
			 
				if(SPUserID=="")		
					subStr.push(subTester.substring(subTester.indexOf(";")+1, subTester.indexOf("&lt")));

				else					
                	subStr.push(subTester.substring(subTester.indexOf(";")+1, subTester.indexOf("&lt")));
               
				str=subTester.substring(subTester.indexOf(";")+1,subTester.length);
            }
		
		return subStr;
},

resolveTesterFullName:function(leadStr)
{ 
		
		var subStr=new Array();
		/**Logic to remove the extra code attached to the user names**/
		while(leadStr.length!=0)
		{
					    if( (leadStr.indexOf("displaytext=")) ==-1)
					    	break;
					  
						var sub2=leadStr.substring(leadStr.indexOf("displaytext=")+13,leadStr.indexOf("isresolved=")-2);
						subStr.push(sub2);
					    leadStr=leadStr.substring(leadStr.indexOf("isresolved=")+12,leadStr.length-1); 
		}		   
		/************************************************************/ 
	 
		return subStr;
},

resolveTesterName:function(leadStr)
{ 
		
		var subStr=new Array();
		/**Logic to remove the extra code attached to the user names**/
		while(leadStr.length!=0)
		{
			index1=leadStr.indexOf("key=");
			index2=leadStr.indexOf("displaytext=");
			if(index1==-1)
				break;
			if(subStr=="")
				subStr.push(leadStr.substring(index1+5,index2-2));
			else
				subStr.push(leadStr.substring(index1+5,index2-2));

			leadStr=leadStr.substring(index2+12,(leadStr.length-1));
		}
		/************************************************************/ 
		
		return subStr;
},


resolveTesterEmail:function(str)
 { 
	
			var subStr=new Array();
			while(str.length!=0)
			{
				/********Logic for extracting mail id*********/
				
				index=str.indexOf("Email");
			
				if(index==-1)
					break;
				
				var subTester=str.substring(str.indexOf("Email"),str.length);
				subTester =   subTester.substring(subTester.indexOf("xsd"),subTester.length);
				subTester =   subTester.substring(subTester.indexOf(";")+1,subTester.length);
				var emailId=       subTester.substring(subTester.indexOf(";")+1, subTester.indexOf("&lt"));  
			 
				if(emailId=="")		
					subStr.push(subTester.substring(subTester.indexOf(";")+1, subTester.indexOf("&lt")));

				else					
                	subStr.push(subTester.substring(subTester.indexOf(";")+1, subTester.indexOf("&lt")));
   	
				str=subTester.substring(subTester.indexOf(";")+1,subTester.length);
            }
		
		return subStr;
},

removeCodeFromLead:function(leadStr)
{
		var subStr="";
		/**Logic to remove the extra code attached to the user names**/
		while(leadStr.length!=0)
		{
			index1=leadStr.indexOf("key=");
			index2=leadStr.indexOf("displaytext=");
			if(index1==-1)
				break;
			if(subStr=="")
				subStr=subStr+leadStr.substring(index1+5,index2-2);
			else
				subStr=subStr+leadStr.substring(index1+5,index2-2);
			leadStr=leadStr.substring(index2+12,(leadStr.length-1));
			}
		/************************************************************/ 
		return subStr;
},


  
removeCodeFromUser:function(leadStr)
{
		var subStr="";
		/**Code to remove the extra code attached to the user names**/
		while(leadStr.length!=0)
		{
			index1=leadStr.indexOf("key=");
			index2=leadStr.indexOf("displaytext=");
			if(index1==-1)
				break;
			if(subStr=="")
				subStr=subStr+leadStr.substring(index1+5,index2-2)+';';
			else
				subStr=subStr+leadStr.substring(index1+5,index2-2)+";";
			leadStr=leadStr.substring(index2+12,(leadStr.length-1));
		}
		/************************************************************/ 
		return subStr;
},


resolveAccountName:function(title)
{
		var name = '';
		var dat = $('div[title="'+title+'"]').find('div').find('div').attr("data"); 
		$(dat).find("DictionaryEntry").each(function(i, dItem){
			if($(dItem).find('Key').text() == "AccountName")
				name = $(dItem).find('Value').text();
		});
		return name;

},


clear:function()
{
	$("div[title='lead']").html('');
	$("textarea[title='lead']").text('');
	
	$("div[title='stakeholders']").html('');
	$("textarea[title='stakeholders']").text('');
	
	var currentDate=new Date();
	var currentMonth=((currentDate.getMonth()+1)>9)?(currentDate.getMonth()+1):('0'+(currentDate.getMonth()+1));
	var currentDay=(currentDate.getDate()>9)?(currentDate.getDate()):('0'+currentDate.getDate());
	var processedDate=currentMonth+'/'+currentDay+'/'+String(currentDate.getFullYear());
	document.getElementById('startDate').value=processedDate;
    document.getElementById('endDate').value='';
	document.getElementById('txtDescription').value='';
	
	//$("#pName option").eq(0).attr("selected","selected");//commented:SD
	$("#pName").val('');//:SD
	$("#version").val('');
	
	$('#divApplicationUrl').html("&nbsp;");
	$('#divProjectUrl').html("&nbsp;");
	//CODE MODIFIED BY SWAPNIL KAMLE ON 14-8-2012
	$('#hidPUrl').val('');
	$('#url').val('');
	$('#hidAUrl').val('');
	$('#appUrl').val(''); 
	
	document.getElementById('status').options[0].selected=true; // Added by shilpa for bug 529
	$('#hid').val('');
},

withoutPermision:new Array(),

callEditmode:function()
{
	if($("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser4_OuterTable .ms-error").text() == "No exact match was found. Click the item(s) that did not resolve for more options.")
	{
		setTimeout('project.editMode("'+project.editNo+'");',200);
		Main.hideLoading();
		
	}
},

///To Select The Row
prjctID:"",
selectRow:function(pid)
{
    $('#showproject tr').attr('class','');
  	
  	var len = $('#showproject tr').length;
  	
  	for(var ii=0; ii<=len; ii++)
  	    $('#showproject tr:eq('+ii+') td:eq(1)').attr('class','selTD');
  	
  	
  	$('#showproject tr[id="'+pid+'"]').attr('class','rowSelected');
	$('#showproject tr[id="'+pid+'"] td:eq(1)').attr('class','rowSelected'); //s
	
	
	project.prjctID=pid;
	show.projectId=pid;
	show.testPassId = '';//added by mohini for to set testpass ID 
	
},


/**** Alert Boxes****/

alertBox:function(msg){
		$("#divAlert").text(msg);
		$('#divAlert').dialog({height: 150,modal: true, buttons: { "Ok":function() { $(this).dialog("close");}} });
},  
alertBox2:function(msg){
		$("#divAlert2").text(msg);
		$('#divAlert2').dialog({height: 160,modal: true, buttons: { "Ok":function() { $(this).dialog("close");}} });
},  
alertBox3:function(msg){
		$("#divAlert3").text(msg);
		$('#divAlert3').dialog({height: 150,modal: true, buttons: { "Ok":function() { $(this).dialog("close");}} });
},  
alertBoxForSuccessfullInsertion:function(msg){
			$("#divAlert").text(msg);
			$('#divAlert').dialog({height: 150,modal: true,  buttons: { "Ok":function() { $(this).dialog("close");}} });
},


//==============================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> PORTFOLIO FUNCTIONS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<====================================================


btnSavePortfolio:function(stakeHolderDetailsArr)
{
		var saveJson = '';
		if(!project.isPortfolioOn)
		    var prjName = $.trim($('#version').val());
		else
			var prjName=  $.trim($("#pName option:selected").text()); //$.trim($("#pName option:selected").attr('title'));
			
		prjName=prjName.replace(/\s+/g, " ");
		
		var version = $('#version').val() == ""||$('#version').val()=="-"?null:$('#version').val();
		version=jQuery.trim( version );
		version =version.replace(/\s+/g, " ");
	
		Main.showLoading();
		//Portfolio fields validation
		if(project.isPortfolioOn)
		{
			if ( $("#group option:selected").val() =="0" || $("#process option:selected").val() =="0" || $("#pName option:selected").val() =="0" || $.trim ( $("#version").val() ) == "" )
			{
			     project.alertBox3('Fields marked with asterisk(*) are mandatory!');
		 		 $('#Projectform').show();
			     Main.hideLoading();
			     return;
			}
		}
		else
		{
			if (prjName == "")
			{
			     project.alertBox3('Fields marked with asterisk(*) are mandatory!');
		 		 $('#Projectform').show();
			     Main.hideLoading();
			     return;
			}
		}
	   var leadAlias = $('div[title="lead"] #divEntityData').attr('key');
	   if(leadAlias == null || leadAlias == undefined || leadAlias == '')
       {
	       var msgTag=$('#verLead').text().substring(0,$('#verLead').text().length-2)+' cannot be empty!'//added by Mohini for resource file
	       project.alertBox(msgTag);
	       $('#Projectform').show();
           Main.hideLoading();
	       addPrjFlag==1;
	       return;
       } 
		//Portfolio fields validation
		project.stakeholder_Name = new Array();
		project.stakeholder_FullName = new Array();
		project.stakeholder_spUserId = new Array();
		project.stakeholder_EmailIDs = new Array(); //SH
		var currentDate=new Date();
		var currentMonth=((currentDate.getMonth()+1)>9)?(currentDate.getMonth()+1):('0'+(currentDate.getMonth()+1));
		var currentDay=(currentDate.getDate()>9)?(currentDate.getDate()):('0'+currentDate.getDate());
		var processedDate=currentMonth+'/'+currentDay+'/'+String(currentDate.getFullYear());
		
		 $('div[title="stakeholders"] span.ms-entity-resolved').each(function(indx, item){
			if($(this).children('span').text() != '')
			{
				AddUser.globTesterName = $(item).find('div').attr("key");
				AddUser.presentInGroup = 0;
				AddUser.flagForStake = 1;
			    AddUser.GetGroupNameforUser();
			    if(AddUser.presentInGroup == 1)//User is not present in member group
			    {
					AddUser.AddUserToSharePointGroup();  /*?*/
			    }
				
			}
	    });/*each close*/
	
		if(project.stakeholder_spUserId.length>20)
		{
			project.alertBox('A '+project.gConfigProject.toLowerCase()+' can have only 20 '+$('#vStakeh').text().substring(0,$('#vStakeh').text().length-2)+' at maximum!');//added by Mohini for resource file
			
			$('#Projectform').show();
			Main.hideLoading();
			return(false);
		}
		else
		{	
			AddUser.flagForStake = 0;
			var listN = jP.Lists.setSPObject(project.SiteURL,'Project');
			var lead=$("textarea[Title='lead']").val();  
			var SPUserID = '';
			var leadMailId=project.resolveTesterEmail(lead).join();
			project.leadName=project.resolveTesterFullName(lead).join();
			
			 var leadVal =$("div[Title='lead']").text();
		     if(leadVal.indexOf(";")!=-1)
		     {
		     	leadVal = leadVal.replace(';','');
		     }
		
		    if((document.getElementById('startDate').value.length==0)||(document.getElementById('endDate').value.length==0) )
		     {
		          project.alertBox3('Fields marked with asterisk(*) are mandatory!');
		          
		          $('#Projectform').show();
		          Main.hideLoading();
		     }
		     else 
		     { 
      			var addPrjFlag=0;
 				//Added by HRW
 				if(!(Main.checkAlphanumeric( prjName)))
			    {
			    	project.alertBox('Only Alphanumeric values are allowed in '+project.gConfigProject+' name!.');//added by Mohini for resource file
			    	
			    	$('#Projectform').show();
			        Main.hideLoading();
			        addPrjFlag==1;
			        return;
			    }
               if(prjName.length>55)                  
               {
               	 	  var msgTag=project.gConfigProject+' name cannot contain more than 55 characters!'//added by Mohini for resource file
			       	  project.alertBox(msgTag);
			       	  $('#Projectform').show();
			       	  Main.hideLoading();
			       	  addPrjFlag==1;
               }	
               else
               {
					//Project Name validataion 23-12-11 
					if(addPrjFlag!=1) 
					{     	
						var parameter = Main.filterData(prjName)+"/"+version;
						var res = ServiceLayer.GetData('ValidateProjectName',parameter);
						if(res != '' && res != undefined)
						{
							if(res[0].Value.toLowerCase() != 'not exist')
							{
								project.alertBox3(project.gConfigVersion+' with name \''+Main.filterData(version)+'\' already exist for '+project.gConfigProject+' \''+Main.filterData(prjName)+'\'. Please give some other name for Version!');//added by Mohini for resource file
				       	    	addPrjFlag=1;
				       	    	$('#Projectform').show();
				       	    	Main.hideLoading();
							}
						}	
						if($.inArray("<",prjName) !=-1 || $.inArray(">",prjName) != -1)
						{
							addPrjFlag=1;
							project.alertBox3(project.gConfigProject+' name should not contain < and > characters');//added by Mohini for resource file
							$('#Projectform').show();
							Main.hideLoading();
						}
					}
                   if(addPrjFlag==0)
                   {
	                   //Project Lead Info 
	                   AddUser.testerSPID = '';
	                   AddUser.globTesterName = $('div[title="lead"] #divEntityData').attr('key');//Added for SP13
				   	   AddUser.presentInGroup = 0;
					   AddUser.GetGroupNameforUser();
					   if(AddUser.presentInGroup == 1)//User is not present in member group
					   {
							AddUser.AddUserToSharePointGroup();
					   }
					   SPUserID = AddUser.testerSPID;		
					   
					   lead=$("#pplLead #divEntityData").attr("displaytext");
						var listProjectUsers = new Array();
						listProjectUsers.push({
							"userName":	project.leadName,
								"email":leadMailId,
								"spUserId":SPUserID,
								"securityId":"2",
								"alias":AddUser.globTesterName					
							}); 
							
							
	                   var dateString=document.getElementById('startDate').value;
					   var testDate=new Date();
					   var hh=testDate.getHours();
					   var mm=testDate.getMinutes();
					   var ss=testDate.getSeconds();
					   var time=String(hh)+':'+String(mm)+':'+String(ss);
				       var arrivalDateTime=String(testDate.getFullYear())+'-'+String(testDate.getMonth()+1)+'-'+String(testDate.getDate())+'T'+time+'Z';
	                   var dateStr=dateString.charAt(6)+dateString.charAt(7)+dateString.charAt(8)+dateString.charAt(9)+'-'+dateString.charAt(0)+dateString.charAt(1)+'-'+dateString.charAt(3)+dateString.charAt(4)+'T'+time+'Z';
                      
                       var Obj = new Array();
                       var dateString2=document.getElementById('endDate').value;
					   var testDate2=new Date();
					   var hh2=testDate2.getHours();
					   var mm2=testDate.getMinutes();
					   var ss2=testDate.getSeconds();
					   var time2=String(hh2)+':'+String(mm2)+':'+String(ss2);
				       var arrivalDateTime2=String(testDate2.getFullYear())+'-'+String(testDate2.getMonth()+1)+'-'+String(testDate2.getDate())+'T'+time2+'Z';
                       var dateStr2=dateString2.charAt(6)+dateString2.charAt(7)+dateString2.charAt(8)+dateString2.charAt(9)+'-'+dateString2.charAt(0)+dateString2.charAt(1)+'-'+dateString2.charAt(3)+dateString2.charAt(4)+'T'+time2+'Z';
                       var id='txtDescription';				
	                   var desc=document.getElementById(''+id+'').value;	
	                   var l=document.getElementById('status').selectedIndex;      
                       var status=document.getElementById('status').options[l].text;      
                       var leadForWorkFlow=lead+'#wf';
                       var startDate=new Date(dateString);
                       var endDate=new Date(dateString2);
                       if(startDate>endDate)
                      {
                           project.alertBox($("#lblEndDate").text().substring(0,$("#lblEndDate").text().length-2)+' should always be greater or equal to the '+$("#lblStartDate").text().substring(0,$("#lblStartDate").text().length-2)+'!');
                           $('#Projectform').show();
                           Main.hideLoading();
                      }
                      else 
                      {
	                       var projectID;
                           var UserSecurityList=jP.Lists.setSPObject(project.SiteURL,'UserSecurity'); 
				           
		                    var prjNm;
		                    var prjDesc;
		                    prjNm=prjName;
                            prjDesc=document.getElementById('txtDescription').value;

							/*PNew*/
							for(st=0;st<project.stakeholder_Name.length;st++)
							{
								listProjectUsers.push({
												"userName":	project.stakeholder_FullName[st],
												"email":project.stakeholder_EmailIDs[st],
												"spUserId":project.stakeholder_spUserId[st],
												"securityId":"5",
												"alias":project.stakeholder_Name[st]					
											});
							}
							
	                   		/*PNew*/
	                   		var NewJsonIns='';
	                   		if(!project.isPortfolioOn)
	                   		{
	                   			NewJsonIns = {
								   	"groupId":"1",
									"portfolioId":"1",
									"projectName":prjName,
									"projectVersion":prjName,
								   "startDate":dateString,
								   "endDate":dateString2,
								   "projectStatus":status,
								   "description":jQuery.trim(prjDesc),
								   "appUrl":jQuery.trim($('#hidAUrl').val()),
								   "aliasAppUrl":jQuery.trim($('#appUrl').val()),
								   "projectUrl":jQuery.trim($('#hidPUrl').val()),
								   "projectAliasUrl":jQuery.trim($('#url').val()),
								   "listProjectUsers":new Array()
								}

	                   		}
	                   		else
							{
								var group = $('#group option:selected').val() !="Default Group"? $('#group option:selected').val() : null;
								var potfolio = $('#process option:selected').val() !="Default Portfolio"? $('#process option:selected').val() : null;
							
								NewJsonIns = {
								   	"groupId":jQuery.trim($('#group option:selected').val()),
									"portfolioId":jQuery.trim($('#process option:selected').val()),
									"projectName":prjName,
								   "startDate":dateString,
								   "endDate":dateString2,
								   "projectStatus":status,
								   "projectVersion":$('#version').val(),
								   "description":jQuery.trim(prjDesc),
								   "appUrl":jQuery.trim($('#hidAUrl').val()),
								   "aliasAppUrl":jQuery.trim($('#appUrl').val()),
								   "projectUrl":jQuery.trim($('#hidPUrl').val()),
								   "projectAliasUrl":jQuery.trim($('#url').val()),
								   "listProjectUsers":new Array()
								}
							}	
							NewJsonIns.listProjectUsers = listProjectUsers;
							
							var retPrjId = ServiceLayer.InsertUpdateData('InsertUpdateProjectDetails',NewJsonIns);
							
							if(retPrjId != "" && retPrjId != undefined)
							{
								if(retPrjId[1].Value == "Done")
								{
									//project.alertBoxForSuccessfullInsertion(project.gConfigProject+" and "+project.gConfigVersion+" saved successfully!");
									Main.AutoHideAlertBox(project.gConfigProject+" created successfully!"); 
							        project.clearPortfolio(); 
							        
							        if(SPUserID == _spUserId || $.inArray(_spUserId.toString(),project.stakeholder_spUserId)!=-1 || $.inArray('1',security.userType)!= -1)
			                        {
			                       		show.projectId=retPrjId[0].Value;
			                       					                       		
			                       		/////Added by Mangesh for addition of latest user association data for stakeholder	
			                       		security.userAssociationForProject[ retPrjId[0].Value ] = new Array();
			                       		if(SPUserID == _spUserId)
			                       		{
			                       			security.userAssociationForProject[ retPrjId[0].Value ].push('2');
			                       		}	                       		
			                       		if($.inArray(_spUserId.toString(),project.stakeholder_spUserId)!=-1)
			                       		{			                       						                       			
											security.userAssociationForProject[retPrjId[0].Value].push('5');
										}
			                       		//////////////////////////////////////////////////////
			                        }
			                        else
			                        { 
			                       	    var len = project.arrtest1.length;
			                       	    if(len>0)
							        	{
								        	show.projectId=project.arrtest1[0];
							        	}
							        }
							        $(".navTabs h2").eq(0).click();
							    }
							    else
							    	 project.alertBox('Sorry! Something went wrong, please try again!');  
							}
							else
								project.alertBox('Sorry! Something went wrong, please try again!');     	  
				    }//End enddate else          
		        }//End If addprojectflag 	
         	}//End Else prjName.length
    	}//End Else (pName option)
	}	/*project.stakeholder_spUserId.length>20*/

	Main.hideLoading();
},

compressFunPortfolio:function ()
{	
    /////////////*****************/////////////
    $('#pplLead').find('img').css('margin-right','18px');
    $('#pplStakeHolder').find('img').css('margin-right','18px');
    $('#pageTab h2:eq(0)').css('color','#000000');
    /////////////////*************///////////////
   
	Main.showLoading();  
	//show.showData();
	AddUser.GetGroups();

	/***********Code added by Mohini for resource file************/
   if(resource.isConfig.toLowerCase()=='true')
   {
     project.gConfigProject=resource.gPageSpecialTerms['Project']!=undefined?resource.gPageSpecialTerms['Project']:"Project";
     project.gConfigTestPass=resource.gPageSpecialTerms['Test Pass']!=undefined?resource.gPageSpecialTerms['Test Pass']:"Test Pass";
     project.gConfigStakeholders=resource.gPageSpecialTerms['Stakeholders']!=undefined?resource.gPageSpecialTerms['Stakeholders']:"Stakeholders";
     project.gConfigLead=resource.gPageSpecialTerms['Lead']!=undefined?resource.gPageSpecialTerms['Lead']:"Lead";
     project.gConfigGroup=resource.gPageSpecialTerms['Group']!=undefined?resource.gPageSpecialTerms['Group']:"Group";
	 project.gConfigPortfolio=resource.gPageSpecialTerms['Portfolio']!=undefined?resource.gPageSpecialTerms['Portfolio']:"Portfolio";
	 project.gConfigVersion=resource.gPageSpecialTerms['Version']!=undefined?resource.gPageSpecialTerms['Version']:"Version";
   }
   $('#testPassCount0 ').html('<b>Total '+project.gConfigTestPass+'(es) :</b>');
   $('#divUrlPopUp').attr('title',$('#prjUrl').text().substring(0,$('#prjUrl').text().length-1));
   $('#divUrlPopUp2').attr('title',$('#appUrl').text().substring(0,$('#appUrl').text().length-1));
   $('#noP').html('No '+project.gConfigProject+'(s) available!');
   //$('#notevStake').html('A '+project.gConfigProject.toLowerCase()+' can have only 20 '+$('#vStakeh').text().substring(0,$('#vStakeh').text().length-1)+' at maximum.');
   $('#notevStake').html('A '+project.gConfigProject.toLowerCase()+' can have maximum 20 '+$('#vStakeh').text().substring(0,$('#vStakeh').text().length-1)+'.');
   $('#group').html('<option value="0">Select '+project.gConfigGroup+'</option><option>Default '+project.gConfigGroup+'</option>');
   $('#process').html('<option value="0">Select '+project.gConfigPortfolio+'</option>');
   $('#pName').html('<option selected="selected" value="0">Select '+project.gConfigProject+'</option>');
   $('#addGroup img').attr('title','Add '+project.gConfigGroup);
   $('#addPortfolio img').attr('title','Add '+project.gConfigPortfolio);
   $('#deleteGroup img').attr('title','Delete '+project.gConfigGroup);
   $('#deletePortfolio img').attr('title','Delete '+project.gConfigPortfolio);
   $('#addProject img').attr('title','Add '+project.gConfigProject);
   $('#imgGrpTmN').attr('title','Please select an existing '+project.gConfigGroup+
      '/Team in which you want to add your '+project.gConfigProject+'. Click "Add" icon if you want to add new '+project.gConfigGroup+'/Team Or select Default '+project.gConfigGroup+" if you don't want to add into any "+project.gConfigGroup+'/Team.');
   $('#imgPrtPrcN').attr('title','Please select an existing '+project.gConfigPortfolio+
      ' in which you want to add your '+project.gConfigProject.toLowerCase()+'. Click "Add" icon if you want to add new '+project.gConfigPortfolio+' Or  select "Default '+project.gConfigPortfolio+'" if you have selected the "Default '+project.gConfigGroup+'".');
   /******************************************************************/
   
	//Code added by Rajiv on 21 august 2012;to keep the update button invisible whenever page loads from any environment
	$(".ms-error").hide();
   	$('#divApplicationUrl').html("&nbsp;"); // Added by shilpa to solve UI issue of Appln url
   	$('#pplLead').find('span').find('table').find('table').find('div').css('max-height','20px'); //Added by shilpa on 25 March
   	/*code for date picker*/
   	if(isRootWeb)
		$("#startDate").datepicker({
			minDate:0,
		    showOn: "button",
			buttonImage: "../SiteAssets/theme/"+themeColor+"/images/Calendar-Logo.gif",
			buttonImageOnly: true,
			dateFormat:"mm/dd/yy",changeMonth: true,changeYear: true   
		});
	else
		$("#startDate").datepicker({
			minDate:0,
		    showOn: "button",
			buttonImage: "../../SiteAssets/theme/"+themeColor+"/images/Calendar-Logo.gif",
			buttonImageOnly: true,
			dateFormat:"mm/dd/yy",changeMonth: true,changeYear: true   
		});	
	
	$(".ui-datepicker-trigger").css('margin-right','40px');

	if(isRootWeb)
		$("#endDate").datepicker({
			minDate: 0,
			showOn: "button",
			buttonImage: "../SiteAssets/theme/"+themeColor+"/images/Calendar-Logo.gif",
			buttonImageOnly: true,
			dateFormat:"mm/dd/yy" ,changeMonth: true,changeYear: true  
		});
	else
		$("#endDate").datepicker({
			minDate: 0,
			showOn: "button",
			buttonImage: "../../SiteAssets/theme/"+themeColor+"/images/Calendar-Logo.gif",
			buttonImageOnly: true,
			dateFormat:"mm/dd/yy" ,changeMonth: true,changeYear: true  
		});	
	$(".ui-datepicker-trigger").attr('title','Select Date'); 
	$(".hasDatepicker").css('border','1px #ccc solid'); //Added for bug 2199
	var currentDate=new Date();
	var currentMonth=((currentDate.getMonth()+1)>9)?(currentDate.getMonth()+1):('0'+(currentDate.getMonth()+1));
	var currentDay=(currentDate.getDate()>9)?(currentDate.getDate()):('0'+currentDate.getDate());
	var processedDate=currentMonth+'/'+currentDay+'/'+String(currentDate.getFullYear());
	document.getElementById('startDate').value=processedDate;
	
	//Status
    var ListItems1 = ["Active","On Hold","Complete"];
    for(var x=0;x<ListItems1.length;x++)
    {
      var object=new Option();
      document.getElementById('status').options[x]=object;
      document.getElementById('status').options[x].text=ListItems1[x]; 
      document.getElementById('status').options[x].value  = ListItems1[x];
    }
    for(var k=0;k<document.getElementById('status').length;k++)
	{
	   	if(document.getElementById('status').options[k].text=='Active')
	    	document.getElementById('status').options[k].selected=true;
	}
    /*Logic to retrieve the record if control comes here through e-mail link or through Dashboard*/ 
    var url=window.location.href;
    var keyVal='';
    
    var temp=url.indexOf("key");
    if(temp!=-1)
    {
      keyVal = Main.getQuerystring('key');
    }
    else 
    {
       keyVal = Main.getQuerystring('pid');

    }
     if(keyVal!="")
     {
        show.projectId=keyVal;   
        //project.paginationPortfolio(); /*commented by prasanna*/
		project.getProjectList();/*PNew*/

     }
     else
     {
		//project.paginationPortfolio(); /*commented by prasanna*/
		project.getProjectList();/*PNew*/

     }
	
	/*******************/  
	this.SiteURL = Main.getSiteUrl();
  	var leadStr;
  	var subStr="";
    var index1;
    var index2;
    var leadStr2;
    var subStr2="";
  	var index12;
  	var index22;
  	var aliasUrl;
  	var actualUrl;
  	var aliasUrl2;
  	var actualUrl;
  	$( "#dialog:ui-dialog" ).dialog( "destroy" );	
    $( "#divUrlPopUp2" ).dialog({
		autoOpen: false,
		height: 230,
		width: 350,
		modal: true,	
		buttons:{
			"OK":function(){
						$('#divApplicationUrl').children().css('display','block'); //added by shilpa
						actualUrl=jQuery.trim(document.getElementById('actualURL2').value);
						aliasUrl=jQuery.trim(document.getElementById('aliasURL2').value);
						if(actualUrl=='' && aliasUrl!='')
				        	document.getElementById('lblError2').innerHTML="Alias cannot be given until url is assigned!";
                   		else if(!(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(actualUrl)))
					    {
					    	document.getElementById('lblError2').innerHTML="Please enter valid URL!";				    	
					    }
                   		else
                    	{
							if(actualUrl.indexOf("http")==-1)
							   var actualUrlWithHttp='http://'+actualUrl;
							else
							   var actualUrlWithHttp=actualUrl;  
							
							var markup = '<label id="lblAppUrl">Url:&nbsp;<a title="'+actualUrl+'" href="'+actualUrlWithHttp+'" target="_blank">'+((actualUrl == "")?'N/A':trimText(actualUrl,26))+'</a></label><br/>'+
							 '<label id="lblAliasAppUrl">Alias:&nbsp;<a title="'+aliasUrl+'" href="'+actualUrlWithHttp+'" target="_blank">'+((aliasUrl == "")?'N/A':trimText(aliasUrl,26))+'</a></label>';
							
							$('#divApplicationUrl').html("&nbsp;");
							$('#divApplicationUrl').append(markup);
							
							aliasUrl=document.getElementById('aliasURL2').value;
							document.getElementById('appUrl').value=aliasUrl;	
							actualUrl=document.getElementById('actualURL2').value;
							document.getElementById('hidAUrl').value=actualUrl;	
							document.getElementById('lblError2').innerHTML=" ";
							/*code added by sushil for user interface on margin of application url*/
						    $("#lblAppUrl").css("margin-top","-20px");			
							$( this ).dialog( "close" );
			        	}
			        	if(actualUrl=='' && aliasUrl=='')//added by shilpa
        					$('#divApplicationUrl').children().css('display','none');
			},				
			"Cancel":function(){
			    document.getElementById('lblError2').innerHTML=" ";
 		    	$( this ).dialog( "close" );
			}
	   }
	});
    $( "#dialog:ui-dialog" ).dialog( "destroy" );	
    $( "#divUrlPopUp" ).dialog({
 		autoOpen: false,
		height: 230,
		width: 350,
		modal: true,
		buttons:{
			"OK":function(){
					$('#divProjectUrl').children().css('display','block'); //added by shilpa
			        actualUrl=jQuery.trim(document.getElementById('actualURL').value);
					aliasUrl=jQuery.trim(document.getElementById('aliasURL').value);
				    if(actualUrl=='' && aliasUrl!='')
				        document.getElementById('lblError').innerHTML="Alias cannot be given until url is assigned!";
				    else if(!(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(actualUrl)))
				    {
				    	document.getElementById('lblError').innerHTML="Please enter valid URL!";				    	
				    }
				    else
					{
					    if(actualUrl.indexOf("http")==-1)
                          var actualUrlWithHttp='http://'+actualUrl;
                        else
                          var actualUrlWithHttp=actualUrl;  

						var markup = '<label id="lblUrl">Url:&nbsp;<a title="'+actualUrl+'" href="'+actualUrlWithHttp+'" target="_blank">'+((actualUrl == "")?'N/A':trimText(actualUrl,26))+'</a></label><br/>'+
						 '<label id="lblAliasUrl">Alias:&nbsp;<a title="'+aliasUrl+'" href="'+actualUrlWithHttp+'" target="_blank">'+((aliasUrl == "")?'N/A':trimText(aliasUrl,26))+'</a></label>';

						$('#divProjectUrl').html("&nbsp;");
						$('#divProjectUrl').append(markup);
					    
					    aliasUrl=document.getElementById('aliasURL').value;
			            document.getElementById('url').value=aliasUrl;	
        	            actualUrl=document.getElementById('actualURL').value;
			            document.getElementById('hidPUrl').value=actualUrl	
			            document.getElementById('lblError').innerHTML=" ";
			            /*code added by sushil for user interface on margin of project url*/
			            $("#lblUrl").css("margin-top","-20px");
        	            $( this ).dialog( "close" );
    	            }
		            if(actualUrl=='' && aliasUrl=='')//added by shilpa
        				$('#divProjectUrl').children().css('display','none');
			},				
			"Cancel":function(){
			    document.getElementById('lblError').innerHTML=" ";
 		    	$( this ).dialog( "close" );
			}
	   }
	});
		
},

clearPortfolio:function()
{
	$("div[title='lead']").html('');
	$("textarea[title='lead']").text('');
	
	$("div[title='stakeholders']").html('');
	$("textarea[title='stakeholders']").text('');
	
	var currentDate=new Date();
	var currentMonth=((currentDate.getMonth()+1)>9)?(currentDate.getMonth()+1):('0'+(currentDate.getMonth()+1));
	var currentDay=(currentDate.getDate()>9)?(currentDate.getDate()):('0'+currentDate.getDate());
	var processedDate=currentMonth+'/'+currentDay+'/'+String(currentDate.getFullYear());
	document.getElementById('startDate').value=processedDate;
    document.getElementById('endDate').value='';
	document.getElementById('txtDescription').value='';
	$('#divApplicationUrl').html("&nbsp;");
	$('#divProjectUrl').html("&nbsp;");
	//CODE MODIFIED BY SWAPNIL KAMLE ON 14-8-2012
	$('#hidPUrl').val('');
	$('#url').val('');
	$('#hidAUrl').val('');
	$('#appUrl').val(''); 
	
	//Portfolio Fields
	$('#version').val(''); 
	$("#pName").html('<option value="0">Select '+project.gConfigProject+'</option>');//Added by Mohini for Resource file
	
	$("#process").html('<option value="0">Select '+project.gConfigPortfolio+'</option>');//Added by Mohini for Resource file
	$("#group option").removeAttr("selected");
	$("#group option").eq(0).attr("selected","selected");
	$(".sminput").val("");
	$(".action").hide();

	document.getElementById('status').options[0].selected=true; // Added by shilpa for bug 529
	$('#hid').val('');
	
	//Added for bug 12950
	$('#deleteGroup').css('display','none');
	$('#deletePortfolio').css('display','none');
},

AttachDropDownDelegates:function()
{   
	$("#group").change(function(){
	    
	    if($("#group option:selected").val() == "0")
	    {
	        $("#process").html('<option value="0">Select '+project.gConfigPortfolio+'</option>');//Added by Mohini for Resource file
	        
	        if( $(".navTabs h2").eq(2).css("display") != "block")
	    	{
				$("#pName").html('<option value="0">Select '+project.gConfigProject+'</option>');//Added by Mohini for Resource file
			}
	    	return;
	    }
	    
	    $("#process").html('<option value="0">Select '+project.gConfigPortfolio+'</option>');//Added by Mohini for Resource file
	    
	    if(project.gGroupPortfolioArr[$("#group option:selected").text()] == undefined)
	    	return;
	    	
		var len = project.gGroupPortfolioArr[$("#group option:selected").text()].length;
		var tempPortfolioArr = new Array();
		for(var i = 0;i<len ;i++)
		{
			var portfolio = project.gGroupPortfolioArr[$("#group option:selected").text()][i];
			var portfolioId = project.gGroupPortfolioIdArr[$("#group option:selected").text()][i];
			if( $.inArray(portfolio,tempPortfolioArr)==-1 )
			{
				tempPortfolioArr.push(portfolio);
				$("#process").append('<option value="'+portfolioId+'">'+portfolio+'</option>');
			}
			
			if( $(".navTabs h2").eq(2).css("display") != "block")
	    	{
				$("#pName").html('<option value="0">Select '+project.gConfigProject+'</option>');//Added by Mohini for Resource file
			}
		
		}
	
	});
	
	$("#process").change(function(){
	
	    if( $(".navTabs h2").eq(2).css("display") == "block")
	    {
	      return;
	    }
	    
		if($("#process option:selected").val() == "0")
	    {
	        $("#pName").html('<option value="0">Select '+project.gConfigProject+'</option>');//Added by Mohini for Resource file
	    	return;
	    }
	    
	    $("#pName").html('<option value="0">Select '+project.gConfigProject+'</option>');//Added by Mohini for Resource file
	    
	    
	    if( project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ] == undefined)
	    	return;

		var len = 0;
        if(project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ] != undefined)
	    	len = project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ].length;
		
		var tempProjNameArr = new Array();
		for(var j = 0;j<len ;j++)
		{
		    var projN = project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ][j];
		    var projNTrim = projN.length>50?projN.slice(0,50):projN;
		    if( $.inArray(projN,tempProjNameArr) == -1 )
		    {
			    tempProjNameArr.push(projN);
				$("#pName").append('<option title="'+projN+'">'+projNTrim+'</option>');
			}
		}
		
		
	
	});



},

initpagePortfolio:function(page_index, jq)
{
   project.pgIndex=page_index;
    var items_per_page = 10;
    var max_elem = Math.min((page_index+1)*items_per_page,project.arrPage.length);
    var newhtml = '';
    for(var i=page_index*items_per_page;i<max_elem;i++)
    {
        newhtml=newhtml+project.arrPage[i];
    }     
    if(newhtml == '')
    {
    	$("#Pagination1").css('display','none');
    	$('#showproject').html("");
    	$("#noP").css('display','');
    	$("#ProjectGrid").css('display','none')
    }
    else
    {
    	$('#showproject').html(newhtml);
    	$("#Pagination1").css('display','');
    	$("#noP").css('display','none');
    	$("#ProjectGrid").css('display','');
    	project.selectRow(show.projectId);
    	
    	

    }
    $("#pName").html('<option value="0">Select '+project.gConfigProject+'</option>');//Added by Mohini for Resource file
    return false;
},

cancelPortfolio:function(i)
{
		Main.showLoading();
		if(project.landedStartDate==null||project.landedStartDate==undefined)
			project.landedStartDate='';
		document.getElementById('startDate').value=project.landedStartDate;
		if(project.landedEndDate==null||project.landedEndDate==undefined)
			project.landedEndDate='';
		document.getElementById('endDate').value=project.landedEndDate;
		if(project.landedUrl==null||project.landedUrl==undefined)
			project.landedUrl='';
		document.getElementById('url').value=project.landedUrl;
		if(project.landedProjectName==null||project.landedProjectName==undefined)
			project.landedProjectName='';
		document.getElementById('pName').value=project.landedProjectName;
		if(project.oldLead==null||project.oldLead==undefined)  
			project.oldLead='';
		$('div[title="lead"]').text(project.oldLead);
		$('div[title="stakeholders"]').text(project.stakeholder_NameOld);
		$('#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2Port_checkNames').trigger('click'); 
		if(project.landedDescription==null||project.landedDescription==undefined)  
			project.landedDescription='';
		document.getElementById('txtDescription').value=project.landedDescription; 	
        
		//To reset the Group, Portfolio Drop Down and Version :Ejaz DT:1/22/2014
		$("#group option").each(function(){
		    
		    	if( $(this).val() == project.oldGroup )
		    	{
		    		$(this).attr("selected","selected");
		    	}
		});
		
		$("#group").change();
		    
	    $("#process option").each(function(){
	    
	    	if( $(this).val() == project.oldPortfolio)
	    	{
	    		$(this).attr("selected","selected");
	    	}
	    });
		 
		//$("#version").val(project.oldVersion);//commented
		//To show default version after reset if no version available//:SD
		var versionText=project.oldVersion==undefined?'Default '+project.gConfigVersion:project.oldVersion;
		$("#version").val(versionText);//:SD
		
		//End of To reset the Group, Portfolio Drop Down and Version :Ejaz DT:1/22/2014

		/* added by shilpa */
		if(project.landedUrl.indexOf("http")==-1)
	  	     var landedUrlWithHTTP='http://'+project.landedUrl;
	  	else
	  	     var landedUrlWithHTTP=project.landedUrl;
	  	/***/
				
		if(document.getElementById('lblUrl')!=null||document.getElementById('lblUrl')!=undefined)
		{ 
		   if(project.landedUrl==null || project.landedUrl== undefined || project.landedUrl=='')
		   {
		      document.getElementById('lblUrl').innerHTML ="";
		      $('#hidPUrl').val("");
		   }  
		   else
           {   
           		document.getElementById('lblUrl').innerHTML='<b>Url:&nbsp;</b><a title="'+project.landedUrl+'" href="'+landedUrlWithHTTP+'" target="_blank">'+trimText(project.landedUrl,28)+'</a>';
           		$('#hidPUrl').val(project.landedUrl);	
           	}	
		}
		if(project.landedAliasUrl==null||project.landedAliasUrl==undefined || project.landedAliasUrl == '')  
		{
		  project.landedAliasUrl='';
		  $('#url').val('');
		}
		if(document.getElementById('lblAliasUrl')!=null||document.getElementById('lblAliasUrl')!=undefined)
		{
				if(project.landedAliasUrl==null || project.landedAliasUrl== undefined || project.landedAliasUrl=='')
			    {
			      	document.getElementById('lblAliasUrl').innerHTML ="";
			      	$('#url').val('');
			    }  	
			    else
			    {
			      document.getElementById('lblAliasUrl').innerHTML='<b>Alias:&nbsp;</b><a title="'+project.landedAliasUrl+'" href="'+landedUrlWithHTTP+'" target="_blank">'+trimText(project.landedAliasUrl,26)+'</a>';
			      $('#url').val(project.landedAliasUrl);
			    }
		}
		
		if(project.landedAppUrl==null||project.landedAppUrl==undefined)  
		{
		    project.landedAppUrl='';
		    $('#hidAUrl').val('');
		}
		  
		/* added by shilpa */
		if(project.landedAppUrl.indexOf("http")==-1)
	  	     var landedAppUrlWithHTTP='http://'+project.landedAppUrl;
	  	else
	  	     var landedAppUrlWithHTTP=project.landedAppUrl;
	  	/***/
		  
		if(document.getElementById('lblAppUrl')!=null||document.getElementById('lblAppUrl')!=undefined) 
		{
			if(project.landedAppUrl==null || project.landedAppUrl== undefined || project.landedAppUrl=='')
			{
			      document.getElementById('lblAppUrl').innerHTML ="";
			      $('#hidAUrl').val('');
			}      
			else
			{
				document.getElementById('lblAppUrl').innerHTML='<b>Url:&nbsp;</b><a title="'+project.landedAppUrl+'" href="'+landedAppUrlWithHTTP+'" target="_blank">'+trimText(project.landedAppUrl,28)+'</a>';
				$('#hidAUrl').val(project.landedAppUrl);
			}	
		}
		
		if(project.landedAliasAppUrl==null||project.landedAliasAppUrl==undefined)  
		{
		  project.landedAliasAppUrl='';
		  $('#appUrl').val('');
		}
		if(document.getElementById('lblAliasAppUrl')!=null||document.getElementById('lblAliasAppUrl')!=undefined) 
		{
			if(project.landedAliasAppUrl==null || project.landedAliasAppUrl== undefined || project.landedAliasAppUrl=='')
			{
			      document.getElementById('lblAliasAppUrl').innerHTML ="";
			      $('#appUrl').val('');
			}      
			else
			{
				document.getElementById('lblAliasAppUrl').innerHTML='<b>Alias:&nbsp;</b><a title="'+project.landedAliasAppUrl+'" href="'+landedAppUrlWithHTTP+'" target="_blank">'+trimText(project.landedAliasAppUrl,26)+'</a>';
				$('#appUrl').val(project.landedAliasAppUrl);
			}	
		}	
		
		if((project.landedUrl==''||project.landedUrl==null||project.landedUrl==undefined) && (project.landedAliasUrl==''||project.landedAliasUrl==null||project.landedAliasUrl==undefined)) 
		{
			$('#divProjectUrl').html("&nbsp;");
		}
		
		if((project.landedAppUrl==''||project.landedAppUrl==null||project.landedAppUrl==undefined) && (project.landedAliasAppUrl==''||project.landedAliasAppUrl==null||project.landedAliasAppUrl==undefined)) 
		{
			$('#divApplicationUrl').html("&nbsp;");
		}
		
        for(var y=0;y<document.getElementById('status').length;y++)
		{
			if(document.getElementById('status').options[y].text==project.landedStatus)
		    	document.getElementById('status').options[y].selected=true;
		}
		project.checkNames(); 	
	    Main.hideLoading();
	    
	    //To enable the Create and View links
		//$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
		//$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
},

updatePortfolio:function()
{
        if(!project.isPortfolioOn)
		    var projectName = $.trim($('#version').val());
		else
        {
        	var projectName = $.trim($("#pName").val());
			if( $("#group option:selected").val()=="0" )
			{
		    	Main.hideLoading();
		    	project.alertBox("Please select "+project.gConfigGroup+".");//Added by Mohini for Resource file
		    	return;
			} 
		    if( $("#process option:selected").val()=="0" )
		    {
		    	Main.hideLoading();
		    	project.alertBox("Please select "+project.gConfigPortfolio+".");//Added by Mohini for Resource file
		    	return;
		    } 
	    }
		projectName=projectName.replace(/\s+/g, " ");
	    $('#Projectform').hide();
	    AddUser.testerSPID = '';
	    var addprojectflag=0;
        AddUser.globTesterName = $('div[title="lead"] #divEntityData').attr('key');//Added for SP13
        if((AddUser.globTesterName==null||AddUser.globTesterName==undefined||AddUser.globTesterName==''))
        {
	       var msgTag=project.gConfigVersion+' Lead cannot be empty!'//added by Mohini for resource file
	       project.alertBox(msgTag);
	       $('#Projectform').show();
		   addprojectflag=1;
           Main.hideLoading();
	       return;
        } 
   	    AddUser.presentInGroup = 0;
	    AddUser.GetGroupNameforUser();
	    if(AddUser.presentInGroup == 1)//User is not present in member group
	    {
			AddUser.AddUserToSharePointGroup();
	    }
	    var SPUserID = AddUser.testerSPID;
	    var leadAlias = AddUser.globTesterName;
	    var lead=$("textarea[Title='lead']").val();
		var leadMailId=project.resolveTesterEmail(lead).join();
		var leadName=project.resolveTesterFullName(lead).join();
		project.prjFulName = leadName;

	    var listProjectUsers = new Array();
		listProjectUsers.push({
				"userName":	leadName,
				"email":leadMailId,
				"spUserId":SPUserID,
				"securityId":"2",
				"alias":AddUser.globTesterName					
		}); 
	       
		Main.showLoading();
	    document.getElementById('testPassCount0').style.display="none";
	    document.getElementById('testPassCount').style.display="none";
	    //$("a[title='Browse']").eq(0).show();

		$('#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser4Port_checkNames').trigger('click'); 
		project.stakeholder_Name.length = 0;
		project.stakeholder_FullName = new Array();
		project.stakeholder_EmailIDs.length = 0;
		project.stakeholder_spUserId.length = 0;
		var newStakes = new Array();
		$('div[title="stakeholders"] span.ms-entity-resolved').each(function(indx, item){
			if($(this).children('span').text() != '')
			{
				var key = $(item).find('div').attr("key");
				newStakes.push(key);
			}		
		});
		
		var allStakes = new Array();
		allStakes = newStakes;
		for(var i=0;i<allStakes.length;i++)
		{
			AddUser.globTesterName = trim(allStakes[i]);
			AddUser.presentInGroup = 0;
			AddUser.flagForStake = 1;
		    AddUser.GetGroupNameforUser();
		    if(AddUser.presentInGroup == 1)//User is not present in member group
		    {
				AddUser.AddUserToSharePointGroup();
		    }	
		}
		if(project.stakeholder_spUserId.length>20)
		{
			project.alertBox('A '+project.gConfigProject.toLowerCase()+' can have only 20 '+project.gConfigStakeholders+' at maximum!');//added by Mohini for resource file
			$('#Projectform').show();
    	    Main.hideLoading();
			return(false);
		}
		else
		{	
			AddUser.flagForStake = 0;
			var leadUpdateInfo=$("textarea[Title='lead']").val(); 
			var listN = jP.Lists.setSPObject(this.SiteURL,'Project');
			var Obj = new Array();     
			var id='txtDescription';				
			var desc=Main.filterData(document.getElementById(''+id+'').value);	
			
		   var dateString=document.getElementById('startDate').value;
		   var testDate=new Date();
		   var hh=testDate.getHours();
		   var mm=testDate.getMinutes();
		   var ss=testDate.getSeconds();
		   var time=String(hh)+':'+String(mm)+':'+String(ss);
	       var arrivalDateTime=String(testDate.getFullYear())+'-'+String(testDate.getMonth()+1)+'-'+String(testDate.getDate())+'T'+time+'Z';
           var dateStr=dateString.charAt(6)+dateString.charAt(7)+dateString.charAt(8)+dateString.charAt(9)+'-'+dateString.charAt(0)+dateString.charAt(1)+'-'+dateString.charAt(3)+dateString.charAt(4)+'T'+time+'Z';

	       var dateString2=document.getElementById('endDate').value;
		   var testDate2=new Date();
		   var hh2=testDate2.getHours();
		   var mm2=testDate.getMinutes();
		   var ss2=testDate.getSeconds();
		   var time2=String(hh2)+':'+String(mm2)+':'+String(ss2);
	       var arrivalDateTime2=String(testDate2.getFullYear())+'-'+String(testDate2.getMonth()+1)+'-'+String(testDate2.getDate())+'T'+time2+'Z';
           var dateStr2=dateString2.charAt(6)+dateString2.charAt(7)+dateString2.charAt(8)+dateString2.charAt(9)+'-'+dateString2.charAt(0)+dateString2.charAt(1)+'-'+dateString2.charAt(3)+dateString2.charAt(4)+'T'+time2+'Z';
                       
	        var startDate=new Date(dateString);
			var endDate=new Date(dateString2);
			var maxDueDate= new Date(project.getMaxDueDate.toString());
			
 			if(project.getMinStartDate != '' && project.getMaxDueDate != '')
 			{
				/*var oldEndDate = project.getMaxDueDate.toString();
				var sliceDate = oldEndDate.slice(0,10);
				sliceDate =sliceDate.split("-");		
			  	var oldDueDate=sliceDate [1]+'/'+sliceDate [0]+'/'+sliceDate [2];
			  	
			  	var oldStartDate = project.getMinStartDate.toString();
			  	var sliceDate = oldStartDate.slice(0,10);
			  	sliceDate =sliceDate.split("-");		
			  	var passOldStartDate=sliceDate [1]+'/'+sliceDate [0]+'/'+sliceDate [2]; 
				
				var PassDueDate=new Date(oldDueDate);
				var PassStartDate=new Date(passOldStartDate);*/
				
				var PassDueDate=new Date(project.getMaxDueDate);
				var PassStartDate=new Date(project.getMinStartDate);
				
				if(startDate>PassDueDate)
	 			{
					project.alertBox($("#lblStartDate").text().substring(0,$("#lblStartDate").text().length-2) +' of Project should always be greater or equal to the '+$("#lblEndDate").text().substring(0,$("#lblEndDate").text().length-2)+' of test pass!');//added by Mohini for resource file

					$('#Projectform').show();
                    Main.hideLoading();
					return(false);
			 	}
			 	else if(startDate>PassStartDate)
			 	{
			 		project.alertBox($("#lblStartDate").text().substring(0,$("#lblStartDate").text().length-2) +' of Project should always be greater or equal to the '+$("#lblEndDate").text().substring(0,$("#lblEndDate").text().length-2)+' of test pass!');//added by Mohini for resource file

			 		$('#Projectform').show();
                    Main.hideLoading();
			 		return(false);
			 	}
	 		}		
			if(startDate>endDate)
			{
			   project.alertBox($("#lblEndDate").text().substring(0,$("#lblEndDate").text().length-2)+' should always be greater or equal to the '+$("#lblStartDate").text().substring(0,$("#lblStartDate").text().length-2)+'!');
			   $('#Projectform').show();
			}
			//Code Modified By swapnil Kamle on 17-7-2012 to Validate Date
		    else if(endDate<maxDueDate)
		    {
		    	project.alertBox(project.gConfigProject+' Date should always be ahead of '+project.gConfigTestPass+' Date!');//added by Mohini for resource file
		    	$('#Projectform').show();
		    }
	        else
	        {   
			        var leadForWorkFlow=leadName+'#wf';
					if(projectName=='')
					{
				 	    project.alertBox2(project.gConfigProject+' Name is a mandatory field!');//added by Mohini for resource file
				 	    $('#Projectform').show();
				 	    addprojectflag=1;
				 	}  
				 	
				 	if (  $.trim( $("#version").val() )==""  )
				 	{
				 		project.alertBox2(project.gConfigVersion+' is a mandatory field!');//added by Mohini for resource file
				 		$('#Projectform').show();
				 		Main.hideLoading();
				 	    return;
				 	}
				 	
					//Added by HRW
					if(!(Main.checkAlphanumeric( projectName )))
				    {
				    	project.alertBox2('Only Alphanumeric values are allowed in '+project.gConfigProject+' name!.');//added by Mohini for resource file
				        $('#Projectform').show();
				        addprojectflag=1;
				    }
					if(leadName=='')
					{
		       	        project.alertBox3(project.gConfigLead+' is a mandatory field!');//added by Mohini for resource file
		       	        $('#Projectform').show();
                        addprojectflag=1;
		       	    } 
					//To Add Portfolio fields
					var group = null;
					var portfolio = null;
					var version = null;
					
					if($("#group option:selected").text() !="Default "+project.gConfigGroup)//Added by Mohini for Resource file
					{
						group = $("#group option:selected").text();
						portfolio = $("#process option:selected").text();
					
					}
					if( !($("#version").val() == "Default "+project.gConfigVersion || $("#version").val() == "") )
					{
						version =  $.trim($("#version").val());
						version =version.replace(/\s+/g, " ");
					}
					
					if(addprojectflag!=1)
		       	    {
						project.oldVersion = $.trim(project.oldVersion);
						project.oldVersion = project.oldVersion.replace(/\s+/g, " ");
						
						project.oldProject = $.trim(project.oldProject);
						project.oldProject = project.oldProject.replace(/\s+/g, " ");

						if(project.oldProject != Main.filterData(projectName) || project.oldVersion != version)
						{
							var parameter = Main.filterData(projectName)+"/"+version;
							var res = ServiceLayer.GetData('ValidateProjectName',parameter);
							if(res != '')
							{
								if(res[0].Value.toLowerCase() != 'not exist')
								{
									project.alertBox3(project.gConfigVersion+' with name \''+Main.filterData(version)+'\' already exist for '+project.gConfigProject+' \''+Main.filterData(project.landedProjectName)+'\'. Please give some other name for Version!');//added by Mohini for resource file
									$('#Projectform').show();
	                                addprojectflag=1;
					       	    	Main.hideLoading();
								}
							}	
						}	
						
						 if(projectName.length>55)                  
		                 {
		               	   	var msgTag=project.gConfigProject+' name cannot contain more than 55 characters!'//added by Mohini for resource file
				       	    project.alertBox(msgTag);
				       	    $('#Projectform').show();
                            Main.hideLoading();
				       	    addprojectflag=1;
		                 }
						
						  if($.inArray("<",projectName) !=-1 || $.inArray(">",projectName) != -1)
						  {
							addprojectflag=1;
							project.alertBox3(project.gConfigProject+' name should not contain < and > characters');//added by Mohini for resource file
							$('#Projectform').show();
                            Main.hideLoading();
						  }
					}
						
					if(addprojectflag==0)
					{
						var prjNm=Main.filterData(projectName);
				        var prjDesc = Main.filterData(document.getElementById('txtDescription').value);
						//New Code
						for(st=0;st<project.stakeholder_Name.length;st++)
						{
							listProjectUsers.push({
											"userName":	project.stakeholder_FullName[st],
											"email":project.stakeholder_EmailIDs[st],
											"spUserId":project.stakeholder_spUserId[st],
											"securityId":"5",
											"alias":project.stakeholder_Name[st]					
										});
						}
						var sd = dateStr.split('T')[0];
						var sd2 = sd[0]+sd[1]+sd[2]+sd[3]+"-"+sd[8]+sd[9]+"-"+sd[5]+sd[6];
						
						var ed = dateStr2.split('T')[0];
						var ed2 = ed[0]+ed[1]+ed[2]+ed[3]+"-"+ed[8]+ed[9]+"-"+ed[5]+ed[6];

						var NewJsonIns='';
						if(!project.isPortfolioOn)
						{
							NewJsonIns = {
							   "projectId":$('#hid').val(),
							   "groupId":"1",
							   "portfolioId":"1",
							   "projectName":jQuery.trim(prjNm),
							   "projectVersion":jQuery.trim(prjNm),
							   "startDate":dateString,
							   "endDate":dateString2,
							   "projectStatus":$('#status').val(),
							   "description":jQuery.trim(prjDesc),
							   "appUrl":jQuery.trim($('#hidAUrl').val()),
							   "aliasAppUrl":jQuery.trim($('#appUrl').val()),
							   "projectUrl":jQuery.trim($('#hidPUrl').val()),
							   "projectAliasUrl":jQuery.trim($('#url').val()),
							   "listProjectUsers":new Array()
							  }

						}
						else
						{
							var group = $('#group option:selected').val() !="Default Group"? $('#group option:selected').val() : null;
							var potfolio = $('#process option:selected').val() !="Default Portfolio"? $('#process option:selected').val() : null;
							
							NewJsonIns = {
							   "projectId":$('#hid').val(),
							   "groupId":jQuery.trim($('#group option:selected').val()),
							   "portfolioId":jQuery.trim($('#process option:selected').val()),
							   "projectName":jQuery.trim(prjNm),
							   "startDate":dateString,
							   "endDate":dateString2,
							   "projectStatus":$('#status').val(),
							   "projectVersion":version,
							   "description":jQuery.trim(prjDesc),
							   "appUrl":jQuery.trim($('#hidAUrl').val()),
							   "aliasAppUrl":jQuery.trim($('#appUrl').val()),
							   "projectUrl":jQuery.trim($('#hidPUrl').val()),
							   "projectAliasUrl":jQuery.trim($('#url').val()),
							   "listProjectUsers":new Array()
							}
						}	
						NewJsonIns.listProjectUsers = listProjectUsers;

					  var retPrjId = ServiceLayer.InsertUpdateData('InsertUpdateProjectDetails',NewJsonIns);
						
					   if(retPrjId != "" && retPrjId != undefined)	
				       {
				           if(retPrjId[0].Value == "Done")
					       {
					           //project.alertBox(project.gConfigProject+" and "+project.gConfigVersion+" updated successfully!");
					           Main.AutoHideAlertBox(project.gConfigProject+" updated successfully!");
	
					           $('#pageTab h2:eq(0)').css('color','#000000');
					           $('#pageTab h2:eq(2)').hide();
	
			                   document.getElementById('btnSave').style.display="inline";
		                       document.getElementById('btnClear').style.display="inline";
	                           document.getElementById('btnUpdate').style.display="none";
		                       document.getElementById('btnCancel').style.display="none";
					           
					           Main.hideLoading();
					           project.ProjectListItems.length=0;
					           
					           var id1=$('#hid').val();
					           show.projectId=id1;
					           
					           ////
					           if(project.isPortfolioOn)//For bug 12951
					           { 
						             var arr = project.gGroupPortfolioProjectArr[$('#group option:selected').val() + "-" + $('#process option:selected').val()];
								     var arr2 = [];
								     if(arr != undefined)
									 {
									     for(var ii=0;ii<arr.length;ii++)
									     {
									     	if(arr[ii] != project.oldProject)
									     		arr2.push(arr[ii]);
									     } 
									 }
								     arr2.push(jQuery.trim(prjNm));
					 				project.gGroupPortfolioProjectArr[$('#group option:selected').val() + "-" + $('#process option:selected').val()] = arr2;
					 				
					 				//Remove entry from old group and portfolio
					 				if(project.oldGroup != $('#group option:selected').val() || project.oldPortfolio != $('#process option:selected').val())
					 				{
					 					var arr = project.gGroupPortfolioProjectArr[project.oldGroup + "-" + project.oldPortfolio];
									    var arr2 = [];
									    if(arr != undefined)
										{
										     for(var ii=0;ii<arr.length;ii++)
										     {
										     	if(arr[ii] != project.oldProject)
										     		arr2.push(arr[ii]);
										     } 
										}
										project.gGroupPortfolioProjectArr[project.oldGroup + "-" + project.oldPortfolio] = arr2;
					 				}
					           }
					           //Added by HRW on 22 Jan 2015
					           var userAsso = new Array();
							   if(security.userAssociationForProject[$('#hid').val()] != undefined)
							   {
							   		userAsso = security.userAssociationForProject[$('#hid').val()];
							   		if($.inArray('2',userAsso) != -1 && listProjectUsers[0]['spUserId'] != project.oldLeadSPUserId)//Log in User was lead previously
							   		{
							   			var userAsso2 = new Array();
							   			for(var i=0;i<userAsso.length;i++)
							   			{
							   				if(userAsso[i] != "2")
							   					userAsso2.push(userAsso[i]);	
							   			}
							   			security.userAssociationForProject[$('#hid').val()] = userAsso2;
							   		}
							   		else if($.inArray('2',userAsso) == -1 && listProjectUsers[0]['spUserId'] == _spUserId)
							   		{
							   			security.userAssociationForProject[ $('#hid').val() ].push('2');
							   		}
							   		if($.inArray('5',userAsso) != -1 && $.inArray(_spUserId,project.stakeholder_spUserId) == -1)//Log in User was stakeholder previously
							   		{
							   			var userAsso2 = new Array();
							   			for(var i=0;i<userAsso.length;i++)
							   			{
							   				if(userAsso[i] != "5")
							   					userAsso2.push(userAsso[i]);	
							   			}
							   			security.userAssociationForProject[$('#hid').val()] = userAsso2;
							   		}
							   		else if($.inArray('5',userAsso) == -1 && $.inArray(_spUserId.toString(),project.stakeholder_spUserId)!=-1)
		                       		{			                       						                       			
										security.userAssociationForProject[$('#hid').val()].push('5');
									}
							   }
							   else
							   {
								   	security.userAssociationForProject[ $('#hid').val() ] = new Array();
								   	if(listProjectUsers[0]['spUserId'] == _spUserId)
		                       		{
		                       			security.userAssociationForProject[$('#hid').val() ].push('2');
		                       		}	                       		
		                       		if($.inArray(_spUserId.toString(),project.stakeholder_spUserId)!=-1)
		                       		{			                       						                       			
										security.userAssociationForProject[$('#hid').val()].push('5');
									}
							   }	
					           /////
					           
				               project.clearPortfolio();
				               project.getProjectList();
				           }
				           else
				           		project.alertBox('Sorry! Something went wrong, please try again!'); 
			           }
			           else
			           		project.alertBox('Sorry! Something went wrong, please try again!'); 
					}//end of else for (lead==''||document.getElementById('pName').value=='')
				}//end of else for if(startDate>endDate)
			Main.hideLoading();
		}	
		
		//To enable the Create and View links
		//$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
		//$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
	
},

editModePortfolio:function(i)
{
       Main.showLoading();
	   project.getMinStartDate = '';
	   project.getMaxDueDate = '';
       ///////////***********/////////////////
       $('#countDiv').hide();
       $('#ProjectGrid').hide();
       $('#Pagination1').hide();
       $('#pageTab h2:eq(2)').show();
       $('#Projectform').show();
       $('#pageTab h2:eq(0)').css('color','#7F7F7F');
       $('#pageTab h2:eq(1)').css('color','#7F7F7F');
       $('#pageTab h2:eq(2)').css('color','#000000');

       document.getElementById('testPassCount').style.display="inline";

       ///////////***********/////////////////
        if(project.tabClick ==0)//added for delay in hover over text of group and portfolio
		{ 
		   project.hoverText();
		   project.tabClick =1;
		}

		project.editNo = i;
		document.getElementById('testPassCount0').style.display="inline";
        
        if(security.userType.length!=0)  
		{
			if($.inArray('1',security.userType)!=-1)
			{								
				document.getElementById('btnUpdate').style.display="inline";
			    document.getElementById('btnCancel').style.display="inline";
			}
			else
			{
				var userAsso = new Array();
				if(security.userAssociationForProject[(project.ProjectListItems)[i]['projectId'] ] != undefined)
					userAsso = security.userAssociationForProject[(project.ProjectListItems)[i]['projectId'] ];
					
				if( ($.inArray('5',userAsso)!=-1) )
				{
				   $("a[title='Browse']").eq(0).show();
				   document.getElementById('btnUpdate').style.display="inline";
				   document.getElementById('btnCancel').style.display="inline";
				}
				else
				{
					 $("a[title='Browse']").eq(0).hide();//$('#editLead').hide();
					 document.getElementById('btnUpdate').style.display="inline";
					 document.getElementById('btnCancel').style.display="inline";
				}
				
	        }
	   } 
	    else
	    {     
				 $('#editLead').remove();
				document.getElementById('btnUpdate').style.display="none";
				document.getElementById('btnCancel').style.display="none";			
	     }
	     
		document.getElementById('btnSave').style.display="none";
		document.getElementById('btnClear').style.display="none";
		document.getElementById('hid').value = project.ProjectListItems[i].projectId;
		
		var lstSL = project.ProjectListItems[i].listProjectUsers;
		var leadAlias = '';
		if( lstSL!='' && lstSL != null && lstSL.length>0)
		{
			var stakeHolderStr = '';
			var stakeHolderNames = '';
			var stakeHolderSpId = '';
			
			for(sl=0;sl<lstSL.length;sl++)
			{
				if(lstSL[sl].securityId=='2')
				{
					project.oldLead = lstSL[sl].userName;
					project.oldLeadSPUserId = lstSL[sl].spUserId;
					project.oldLeadMailId = lstSL[sl].email;
					leadAlias = lstSL[sl].alias;
				}	
				else if(lstSL[sl].securityId=='5')
				{
					stakeHolderStr += lstSL[sl].email +';';
					stakeHolderNames += lstSL[sl].userName + ';';
					stakeHolderSpId += lstSL[sl].spUserId + ';';
				}
				
			}
			$('div[title="stakeholders"]').text(stakeHolderStr);
			project.stakeholder_NameOld = stakeHolderNames;
			project.stakeholder_spUserIdOld = stakeHolderSpId;
		}

		project.landedProjectName=project.ProjectListItems[i].projectName;
		project.landedDescription=project.ProjectListItems[i].description;
		project.oldProject = project.ProjectListItems[i].projectName;
		project.oldGroup = project.ProjectListItems[i].groupId;
		project.oldPortfolio = project.ProjectListItems[i].portfolioId;
		project.oldVersion = project.ProjectListItems[i].projectVersion;
		
		if( project.ProjectListItems[i].groupId == undefined || project.ProjectListItems[i].groupId == null || project.ProjectListItems[i].groupId=='' )
		{
				
			$("#group option").each(function(){
		    
		    	if( $(this).text() == "Default "+project.gConfigGroup)//Added by Mohini for Resource file
		    	{
		    		$(this).attr("selected","selected");
		    	}
		    
		    });
		    $("#group").change();
		    
		    $("#process option").each(function(){
		    
		    	if( $(this).text() == "Default "+project.gConfigPortfolio)//Added by Mohini for Resource file
		    	{
		    		$(this).attr("selected","selected");
		    	}
		    
		    });
		
		}
		else
		{
		    $("#group option").each(function(){
		    
		    	if( $.trim($(this).val()) == project.ProjectListItems[i].groupId)
		    	{
		    		$(this).attr("selected","selected");
		    	}
		    
		    });
		    $("#group").change();
		    
		    $("#process option").each(function(){
		    
		    	if( $.trim($(this).val()) == project.ProjectListItems[i].portfolioId)
		    	{
		    		$(this).attr("selected","selected");
		    	}
		    
		    });

		
		}
		
		var ver = project.ProjectListItems[i].projectVersion == undefined || project.ProjectListItems[i].projectVersion ==""?"Default "+project.gConfigVersion:project.ProjectListItems[i].projectVersion;
		
		
		$("#pName").next('.addNew').remove();
		$("#pName").replaceWith('<input class="dropDown" id="pName" style="border: 1px solid rgb(204, 204, 204); width: 390px; height: 18px;" type="text" value="'+project.ProjectListItems[i]["projectName"]+'">');
		
		$("#version").val( ver );

		if(project.ProjectListItems[i].description !=null && project.ProjectListItems[i].description != undefined )	
	    	document.getElementById('txtDescription').value = project.ProjectListItems[i].description;
		else
		    document.getElementById('txtDescription').value='-';
		
		var markup='';	
		var actualUrl='';    
		if(project.ProjectListItems[i].projectUrl !=null && (project.ProjectListItems[i].projectUrl != 'undefined')&&(project.ProjectListItems[i].projectUrl!='-') && project.ProjectListItems[i].projectUrl !="")
		{
		    
		    $("#hidPUrl").val(project.ProjectListItems[i].projectUrl);
		    actualUrl=project.ProjectListItems[i].projectUrl;
            project.landedUrl=actualUrl;
            
            if(actualUrl.indexOf("http")==-1)
               var actualUrlWithHttp='http://'+actualUrl;
            else
               var actualUrlWithHttp=actualUrl;
   
	  	    markup = '<label id="lblUrl"><b>Url:&nbsp;</b><a title="'+actualUrl+'" href="'+actualUrlWithHttp+'" target="_blank">'+trimText(actualUrl,28)+'</a></label><br/>';
		}
		else
		{
		project.landedUrl=''
		$("#hidPUrl").val('');
		}
	   if((project.ProjectListItems[i].projectAliasUrl != null)&&(project.ProjectListItems[i].projectAliasUrl != 'undefined')&&(project.ProjectListItems[i].projectAliasUrl != '-') && project.ProjectListItems[i].projectAliasUrl != '')	
	   {
	      $("#url").val(project.ProjectListItems[i].projectAliasUrl);
	      
	      if(actualUrl.indexOf("http")==-1)
               var actualUrlWithHttp='http://'+actualUrl;
            else
               var actualUrlWithHttp=actualUrl;
	   
			var aliasUrl = project.ProjectListItems[i].projectAliasUrl;
			project.landedAliasUrl=aliasUrl;
			markup+='<label id="lblAliasUrl"><b>Alias:&nbsp;</b><a title="'+aliasUrl+'" href="'+actualUrlWithHttp+'" target="_blank">'+trimText(aliasUrl,26)+'</a></label>';
	   } 
		else
		{
		   project.landedAliasUrl='';
		   $("#url").val('');
		}
		   
		 $('#divProjectUrl').html("&nbsp;");
		 //$('#divProjectUrl').empty();
	     $('#divProjectUrl').append(markup );
  		var markup='';
		var actualAppUrl='';
		if((project.ProjectListItems[i].appUrl != null)&&(project.ProjectListItems[i].appUrl != 'undefined')&&(project.ProjectListItems[i].appUrl != '-') && (project.ProjectListItems[i].appUrl != ''))	
	    {
			$("#hidAUrl").val(project.ProjectListItems[i].appUrl);
			
			actualAppUrl=(project.ProjectListItems[i].appUrl);
			project.landedAppUrl=actualAppUrl;
			
			if(actualAppUrl.indexOf("http")==-1)
               var actuaApplUrlWithHttp='http://'+actualAppUrl;
            else
               var actuaApplUrlWithHttp=actualAppUrl;

		  
	        markup = '<label id="lblAppUrl"><b>Url:&nbsp;</b><a title="'+actualAppUrl+'" href="'+actuaApplUrlWithHttp+'" target="_blank">'+trimText(actualAppUrl,28)+'</a></label><br/>';
		} 
		else
		{
		    project.landedAppUrl='';
		    $("#hidAUrl").val('');
		}
	          
		if(( project.ProjectListItems[i].aliasAppUrl != null)&&(project.ProjectListItems[i].aliasAppUrl != 'undefined')&&(project.ProjectListItems[i].aliasAppUrl != '-') && project.ProjectListItems[i].aliasAppUrl != '')	
	    {
			$("#appUrl").val(project.ProjectListItems[i].aliasAppUrl);
			
			if(actualAppUrl.indexOf("http")==-1)
               var actuaApplUrlWithHttp='http://'+actualAppUrl;
            else
               var actuaApplUrlWithHttp=actualAppUrl;
               
			var aliasAppUrl=project.ProjectListItems[i].aliasAppUrl;
			project.landedAliasAppUrl=aliasAppUrl;

		    markup+='<label id="lblAliasAppUrl"><b>Alias:&nbsp;</b><a title="'+aliasAppUrl+'" href="'+actuaApplUrlWithHttp +' " target="_blank">'+trimText(aliasAppUrl,26)+'</a></label>';
			$('#divApplicationUrl').html("&nbsp;");
			$('#divApplicationUrl').append(markup );
		} 
		else
		{
		    project.landedAliasAppUrl=''; 
		    $("#appUrl").val('');
		}
		$('#divApplicationUrl').html("&nbsp;");
	    $('#divApplicationUrl').append(markup );    
    	/*changed till this pt.*/
		if(leadAlias!=undefined && leadAlias != '')		
		{   
		     $('div[title="lead"]').text(leadAlias);
			 $('#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2Port_checkNames').trigger('click');
		     project.prjFulName=project.oldLead;

		}
		else
		{
			$('div[title="lead"]').text('');
		    project.prjFulName='';    
		} 
		if((project.ProjectListItems)[i].startDate!=null && (project.ProjectListItems)[i].startDate != undefined)
		{
			var startDate = (project.ProjectListItems)[i].startDate.split(" ")[0].replace(/-/g, "/");
			//var startDate1 = startDate[3]+ startDate[4]+"/"+startDate[0]+startDate[1]+"/"+startDate[6]+ startDate[7]+startDate[8]+ startDate[9];
			document.getElementById('startDate').value = startDate;
		    project.landedStartDate = startDate;      	    
		}
		else
		{
		    document.getElementById('startDate').value='';
		    project.landedStartDate=undefined;
		}
		if((project.ProjectListItems)[i].endDate !=null && (project.ProjectListItems)[i].endDate!=undefined)
	    {
			var endDate = (project.ProjectListItems)[i].endDate.split(" ")[0].replace(/-/g, "/");
			//var endDate1 = endDate[3]+ endDate[4]+"/"+endDate[0]+endDate[1]+"/"+endDate[6]+ endDate[7]+endDate[8]+ endDate[9];
			document.getElementById('endDate').value = endDate;
		    project.landedEndDate = endDate;
	    }       
		else
		{
			document.getElementById('endDate').value='';
		    project.landedEndDate=undefined;
		}
		document.getElementById('txtPId').value=(project.ProjectListItems)[i].projectId;
		var projectID=(project.ProjectListItems)[i].projectId;
		
		document.getElementById('hidProjectPosition').value=i;
		for(var y=0;y<document.getElementById('status').length;y++)
		{
			if((project.ProjectListItems)[i]['projectStatus']==document.getElementById('status').options[y].text)
		    {
		    	document.getElementById('status').options[y].selected=true;
		    	project.landedStatus=document.getElementById('status').options[y].text;
		    }
		}
		if((project.ProjectListItems)[i].testpass_Count!='' && (project.ProjectListItems)[i].testpass_Count!=undefined)
		{
			document.getElementById('testPassCount').innerHTML=(project.ProjectListItems)[i].testpass_Count;
			var endDate = (project.ProjectListItems)[i].testpass_MaxDate;
			//var maxDate = endDate[3]+ endDate[4]+"/"+endDate[0]+endDate[1]+"/"+endDate[6]+ endDate[7]+endDate[8]+ endDate[9];
			project.getMaxDueDate = endDate;
			
			var startDate = (project.ProjectListItems)[i].testpass_MinDate;
			//var startDate1 = startDate[3]+ startDate[4]+"/"+startDate[0]+startDate[1]+"/"+startDate[6]+ startDate[7]+startDate[8]+ startDate[9];
			project.getMinStartDate = startDate;	
	    }  
        else
        {
            document.getElementById('testPassCount').innerHTML='0';
            project.getMinStartDate = '';
	   		project.getMaxDueDate = '';
        }
        
        if( ($.inArray('1',security.userType)!=-1) )
	    {
	   		 $('#editLead').show();
	    }
	   
	   /*code added by sushil for user interface on url and application url margin*/
	   $("#lblUrl").css("margin-top","-20px");	   
	   $("#lblAppUrl").css("margin-top","-20px");
	
	   show.projectId=projectID;
	   project.checkNames();
	
	   Main.hideLoading();
	   
	   //To disable the Create and view links on edit mode
	   //$(".navTabs h2:eq(0)").attr("disabled",true).css("cursor","default");
	   //$(".navTabs h2:eq(1)").attr("disabled",true).css("cursor","default");

},

delPortfolio:function(projectId){

		$( "#dialog:ui-dialog" ).dialog( "destroy" );
		
		//code added sheetal 10 Feb  for last project deleted for not admin
		if( project.ProjectListItems.length==1 && ($.inArray('1',security.userType)==-1) && ($.inArray('4',security.userType)!=-1) && ($.inArray('5',security.userType)!=-1))
		{
			$( "#divConfirm" ).text('This is your last '+project.gConfigProject.toLowerCase()+', if you delete this you will no more have access to Test Management section !');//Added by Mohini for Resource file	
		}
		else if(project.ProjectListItems.length==1 && ($.inArray('1',security.userType)==-1) && ($.inArray('4',security.userType)==-1) && ($.inArray('5',security.userType)!=-1))
		{
			$( "#divConfirm" ).text('This is your last '+project.gConfigProject.toLowerCase()+', if you delete this you will no more have access to the application !');//Added by Mohini for Resource file	
		} 
		else
		{
			$( "#divConfirm" ).text('Are you sure you want to delete?');
		}	
					
		$( "#divConfirm" ).dialog({
			autoOpen: false,
			resizable: false,
			height:140,
			modal: true,
			buttons:{
				"Delete":function(){
					Main.showLoading();
			        setTimeout('project.delOkPortfolio('+projectId+');',100);
					$( this ).dialog( "close" );
				},	
				"Cancel": function(){
					Main.showLoading();
					$( this ).dialog( "close" );
					Main.hideLoading();
	     		}
			}
		});
		$('#divConfirm').dialog("open"); 
},

delOkPortfolio:function(projectId)
{
	for(var i=0;i<project.ProjectListItems.length;i++)
	{
		if(project.ProjectListItems[i].projectId == projectId)
		{
			if(project.ProjectListItems[i].testpass_Count != "0" && project.ProjectListItems[i].testpass_Count != undefined && project.ProjectListItems[i].testpass_Count != "")
			{
				project.alertBox(' You can not delete this '+project.gConfigProject.toLowerCase()+' until all the '+project.gConfigTestPass.toLowerCase()+'es under this are deleted!');//added by Mohini for resource file
				 Main.hideLoading();
				 $( this ).dialog( "close" );
			}
			else
			{
				var data = {"projectId":projectId};
 				var res = ServiceLayer.DeleteData('DeleteProject',data);
 				if(res != "" &&  res != undefined)
 				{
	 				if(res[1].Value == "Done")
		 			{
		 				//project.alertBox(project.gConfigProject+' deleted successfully! ');
		 				Main.AutoHideAlertBox(project.gConfigProject+' deleted successfully! ');
		 				
		 				 var arr = project.gGroupPortfolioProjectArr[project.ProjectListItems[i].groupId + "-" + project.ProjectListItems[i].portfolioId];
					     var arr2 = [];
					     if(arr != undefined)
						 {
						     for(var ii=0;ii<arr.length;ii++)
						     {
						     	if(arr[ii] != project.ProjectListItems[i].projectName)
						     		arr2.push(arr[ii]);
						     } 
						 }
		 				project.gGroupPortfolioProjectArr[project.ProjectListItems[i].groupId + "-" + project.ProjectListItems[i].portfolioId] = arr2;
		 				
		 				var len = project.arrtest1.length;
			
			        	if(len>0)
			        	{
			        	     var pid=project.arrtest1[0];
			        	     if(project.arrtest1[0] != project.ProjectListItems[i].projectId )
			                 	show.projectId=project.arrtest1[0];
			                 else
			                 	show.projectId=project.arrtest1[1];	
				        } 
				        else
				        {
				           show.projectId='';
				        } 
				        
		 				project.getProjectList();
			        	       	
						//code added sheetal 10 Feb last project deleted to redirect to dashboard
						if(project.ProjectListItems != undefined && ($.inArray('1',security.userType)==-1))
						{
							if(project.ProjectListItems.length == 0)
								window.location.href="Dashboard.aspx";
						}
						//Added by HRW for bug 2316
						$('#hidAUrl').val("");
						$('#hidPUrl').val("");
						$('#url').val("");
						$('#appUrl').val("");
					}
					else
						project.alertBox('Sorry! Something went wrong, please try again!');
				}
				else		
 					project.alertBox('Sorry! Something went wrong, please try again!');
			}
		}
	}
},

AddNewDelegate:function()
{
	/*To Add the Group and Portfolio into the list*/
	$(".addNew").click(function(event)
	{
		event.preventDefault();
		var choice = '';
		var entityName = '';
		
		/*Validation for Order of entry*/
		//For Portfolio
		if($(this).attr("id") == "addPortfolio")
		{
			/*To check if the Group is Default than dotn allow to add portfolio*/
		    if( $("#group option:selected").val() == "1" )
		    {
		    	   project.alertBox("Sorry, You cannot add "+project.gConfigPortfolio+" in Default "+project.gConfigGroup+"!");//Added by Mohini for Resource file
			       return;
	
		    }
		    
		    /*To check if the Group is not selected than dont allow to add portfolio*/
		    if(  $("#group option:selected").val() == 0 )
		    {
		    	   project.alertBox("Please Select "+project.gConfigGroup+" first!");//Added by Mohini for Resource file
			       return;
	
		    }
	    }
	    
	    //For Project
	    if($(this).attr("id") == "addProject")
		{
		    if(  $("#group option:selected").val() == 0 || $("#process option:selected").val() == 0 )
			{
			    	   project.alertBox("Please select "+project.gConfigGroup+" and "+project.gConfigPortfolio+" first!");//Added by Mohini for Resource file
				       return;
		
			}
		}   

	    /*Validation for Order of entry*/
		
		$("#portfolioError").text("");//To initaialise the Error label
		$("#txtPortfolioPopUp").val("");//To initaialise the textbox
		
		if( $(this).attr("id") == "addGroup" || $(this).attr("id") == "addPortfolio" )
		{       
		
				if($(this).attr("id") =="addGroup")
				{
					$("#lblPortfolioPopUp").text($('#lblGrpTmN').text().substring(0,$('#lblGrpTmN').text().length-1));//Added by Mohini for resource file
					choice = "group";
					entityName = project.gConfigGroup;
				}
				else
				{
					$("#lblPortfolioPopUp").text($('#lblPrtPrcN').text().substring(0,$('#lblPrtPrcN').text().length-1));//Added by Mohini for resource file
					choice = "process";
					entityName = project.gConfigPortfolio;
				}

				$("#divPortfolioPopUp" ).dialog({
		
				height: 'auto',
				width: 'auto',
				modal: true,
				resizable:false,
				buttons:{
					
							"Save":function(){
							
							SaveDetails();

							},				
							"Cancel":function(){
				 		    	$( this ).dialog( "close" );
							}
					   }


			});							
			
		}
		else
		{
				$("#lblPortfolioPopUp").text($('#lblPNameStar').text().substring(0,$('#lblPNameStar').text().length-1));//Added by Mohini for Resource File
				choice = "pName";
				entityName = project.gConfigProject; 
				
				$("#divPortfolioPopUp" ).dialog({
		
				height: 'auto',
				width: 'auto',
				modal: true,
				resizable:false,
				buttons:{
					
							"Add":function(){
							
							SaveDetails();

							},				
							"Cancel":function(){
				 		    	$( this ).dialog( "close" );
							}
					   }


			});							
		
		}
		
		function SaveDetails()
		{
		    var entityValue=$.trim($("#txtPortfolioPopUp").val());
			entityValue=entityValue.replace(/\s+/g, " ");
		    if( entityValue=="")//For blank validation
		    {
		    	$("#portfolioError").text( entityName+" name cannot be blank!" );
		    	return;
		    }
		    
		    if( !(Main.checkAlphanumeric(entityValue)) )//For character validation
		    {
		    	$("#portfolioError").text('Only Alphanumeric values are allowed in '+entityName+' name!.');//Added by Mohini for Resource file
		        Main.hideLoading();
		        return;
		    }
		    
		    var isNameExist = false;
		    
		    $("#"+choice+ " option").each(function(){
		    	if($(this).text().toLowerCase() ==entityValue.toLowerCase())
		    	{
		    	   isNameExist = true;
		    	   $("#portfolioError").text(entityName+' name already exist!');//Added by Mohini for Resource file
			       Main.hideLoading();
			       return;
	
		    	}
	    	});
	    	
	    	
	    	if(!isNameExist)
	    	{
				/*To save the Group And Portfolio*/
				if(choice=="group")
				{
				   var objInsertGroup = {"groupName":entityValue};
				   var resGpI = ServiceLayer.InsertUpdateData('InsertGroup',objInsertGroup);
				   if(resGpI != '' && resGpI != undefined && resGpI != null)
				   {
				   		if(resGpI[1].Value == "Done")
				   		{
							$("#group").append('<option value="'+resGpI[0].Value+'" title="'+entityValue+'">'+ entityValue +'</option>');
							$("#group").val(resGpI[0].Value);
							$("#group").change();
						}	
				   }
				}
				if(choice=="process")
				{
					   var objInsertProcess = {"groupID":$("#group").val(),"portfolioName":entityValue};
					   var resPoI = ServiceLayer.InsertUpdateData('InsertPortfolio',objInsertProcess );
						
					   if(resPoI != '' && resPoI != undefined && resPoI != null)
					   {
							if(resPoI[1].Value == "Done")
							{
								$("#process").append('<option value="'+resPoI[0].Value+'" title="'+entityValue+'">'+ entityValue +'</option>');
								$("#process").val(resPoI[0].Value);
								$("#process").change();
							}	
					   }
				
					    $("#process").change();
					    
					    //To add the Portfolio name in gloabal array
						if( project.gGroupPortfolioArr[ $("#group option:selected").text()]==undefined )
			            {
				            project.gGroupPortfolioArr[ $("#group option:selected").text()] = new Array();
				            project.gGroupPortfolioArr[ $("#group option:selected").text()].push(entityValue);
				            project.gGroupPortfolioIdArr[ $("#group option:selected").text()] = new Array();
			          		project.gGroupPortfolioIdArr[ $("#group option:selected").text()].push(resPoI[0].Value);
			            }
			            else
			            {
				            if( $.inArray(entityValue,project.gGroupPortfolioArr[$("#group option:selected").text()] ) == -1 )
				            {
				          		project.gGroupPortfolioArr[$("#group option:selected").text()].push(entityValue);
				          		project.gGroupPortfolioIdArr[ $("#group option:selected").text()].push(resPoI[0].Value);
				          	}
			            }
		            
		            //End of To add the Portfolio name in gloabal array
					
				}
				$("#divPortfolioPopUp" ).dialog("close");
	    	}
	    	
	    	//To save the project name to the Group-Portfolio Array
	    	if(choice=="pName")
			{
			    $('#deletePortfolio').css('display','none');//Mohini
		    	/*PNew*/
				$("#pName").append('<option title="'+entityValue+'">'+ entityValue +'</option>');
				
				$("#pName [title='"+entityValue+"']").attr('selected',true);
		    	if(project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ]==undefined)
		    	{
			    	project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ] = new Array();
 					project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ].push(entityValue);
				}
				else
				{
					var arr = project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ];
					if($.inArray(entityValue,arr) == -1)
						project.gGroupPortfolioProjectArr[ $("#group").val()+'-'+$("#process").val() ].push(entityValue);

				}
				
			}
		
		}
		
	});
	/*To Add the Group and Portfolio into the list*/


},
/*Added by Mohini to delete Group and Portfolio DT:22-05-2014*/
deleteGroupPortfolio:function()
{
	 var arrPort=new Array();
	 $('#group').change(function(e){
	    $('#deletePortfolio').css('display','none');
	    arrPort=project.gGroupPortfolioArr[$("#group option:selected").text()];
	    if((arrPort == null || arrPort == undefined || arrPort.length == 0) && $("#group option:selected").val() != "0")
	       $('#deleteGroup').css('display','');
	    else
	       $('#deleteGroup').css('display','none');
	 });
	 var arrPrj=new Array();
	 $('#process').change(function(e){
	     $('#deleteGroup').css('display','none');
	 	 arrPrj=project.gGroupPortfolioProjectArr[$("#group option:selected").val()+"-"+$("#process option:selected").val()];
	 	 if((arrPrj == null || arrPrj == undefined || arrPrj.length==0) && $("#process option:selected").val() !="0" && $("#process option:selected").val() !="1")
	 	 {  
	        $('#deletePortfolio').css('display','');
	     }
	     else
	     	$('#deletePortfolio').css('display','none');
	 });
},
delGrpPort:function(str)
{
    var flag=0;
    if(str == 'Group')
    {
        $("#alertGrpPort").text('Are you sure you want to delete this '+project.gConfigGroup+' ?');
        flag=1;
    }
    else if(str == 'Portfolio')
        $("#alertGrpPort").text('Are you sure you want to delete this '+project.gConfigPortfolio+' ?');
    
	$("#alertGrpPort").dialog({
				resizable: false,
				height:140,
				modal: true,
				position: [660,300],
				buttons:{
					"Delete":function(){
						Main.showLoading();
							if(flag == 1)
					          setTimeout('project.delGroupOK();',100);
					        else if(flag == 0)
					          setTimeout('project.delPortfolioOK();',100);
				          
						$( this ).dialog( "close" );
					},	
					"Cancel": function(){
						Main.showLoading();
						$( this ).dialog( "close" );
						Main.hideLoading();
		     		}
				}
			});
},
delGroupOK:function()
{
   var portfolios=new Array();
   portfolios=project.gGroupPortfolioArr[$("#group option:selected").text()];
   if(portfolios == null || portfolios == undefined || portfolios.length == 0)
   {
     var id = $("#group option:selected").val();
     
     var groupValue = {"groupId":id};
 	 var res = ServiceLayer.DeleteData('DeleteGroup',groupValue);
	 
	 $('#deleteGroup').css('display','none');
	 $("#group option:selected").remove();
	 //project.alertBox(project.gConfigGroup+' deleted successfully');
	 Main.AutoHideAlertBox(project.gConfigGroup+' deleted successfully');
   }                  
   Main.hideLoading();

},
delPortfolioOK:function()
{
	/**/
	   var projects=new Array();
	   projects=project.gGroupPortfolioProjectArr[$("#group option:selected").val()+"-"+$("#process option:selected").val()];
	   if(projects== null || projects== undefined || projects.length == 0)
	   {
		     var currPort = $("#process option:selected").text();
		     
		     var arr=new Array();
		     arr=project.gGroupPortfolioArr[$("#group option:selected").text()];
		     arr = jQuery.grep(arr, function( a ) {
			   return a !==$("#process option:selected").val();
			 });
			 
			 var portfolioValue = {"portfolioID":$("#process option:selected").val()};
 			 var res = ServiceLayer.DeleteData('DeletePortfolio',portfolioValue);
 			 
 			 var id = $("#process option:selected").val();
		     
		     var str2=arr.join(',');
		     project.gGroupPortfolioArr[$("#group option:selected").text()]= jQuery.grep(project.gGroupPortfolioArr[$("#group option:selected").text()], function( a ) {
			   return a !==$("#process option:selected").val();
			 });
		     $('#process option:selected').remove();
		     $('#deletePortfolio').css('display','none'); 
		     var arrPort=new Array();
		     arrPort=project.gGroupPortfolioArr[$("#group option:selected").text()];
		     if(arrPort == null || arrPort == undefined)
		     {
		      	$('#deleteGroup').css('display','');
		     }
		     else  
			 {         
				 if((arrPort.length==1 && project.gGroupPortfolioArr[$("#group option:selected").text()][0] == currPort) || arrPort.length==0)
			     	 $('#deleteGroup').css('display','');
			     	 
				 var arr = project.gGroupPortfolioIdArr[$("#group option:selected").text()];
			     for(var i=0;i<arr.length;i++)
			     {
			     	if(arr[i] == id)
			     	{
			     		arr.splice(i,1);
			     		arrPort.splice(i,1);
			     		break;
			     	}
			     } 
			     project.gGroupPortfolioIdArr[$("#group option:selected").text()] = arr;
			     project.gGroupPortfolioArr[$("#group option:selected").text()] = arrPort;
		     }
		     //project.alertBox(project.gConfigPortfolio+' deleted successfully');
		     Main.AutoHideAlertBox(project.gConfigPortfolio+' deleted successfully');
	   }
	/**/
   Main.hideLoading();
},
/*Added by Mohini for delay in hover over text*/
hoverText:function()
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

},
/***********************************************************************************/
checkNames:function()
{
	$("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser4_checkNames").click();
	$("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser4Port_checkNames").click();
	

},

getGPPArray:function()
{/*PNew fn*/

	//gGroupPortfolioProjectArr = ServiceLayer.GetData('GetGrpPortProjects',_spUserId);
	
	var resultCollection = new Array();
    	
    jQuery.support.cors = true;
    $.ajax({
    	cache: false,
        url: ServiceLayer.serviceURL + "/GetAllGroupPortfolio",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        data: '',
        contentType: "application/json; charset=utf-8",
        processData: true,
        async: false,
        success: function (msg, data, result) {
            resultCollection = msg;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus);
        }
    });
    gGroupPortfolioProjectArr = resultCollection;
	
},
fillProjects:function()
{/*PNew fn*/

	var cntG = gGroupPortfolioProjectArr.length;
	if(cntG != 0)
	{
	    var firstEle = '';
	    var GrpMarkUp = '';
	
	    for (i = 0; i < cntG; i++) 
	    {
	        GrpMarkUp += ('<option value="' + gGroupPortfolioProjectArr[i].groupId + '">' + gGroupPortfolioProjectArr[i].groupName + '</option>');
	        
	        project.gGroupPortfolioArr[ gGroupPortfolioProjectArr[i].groupName ] = new Array();
	        project.gGroupPortfolioIdArr[gGroupPortfolioProjectArr[i].groupName] = new Array();
	        
			var portfolios = new Array();
			if(gGroupPortfolioProjectArr[i].listPortfolio != undefined)
			{
				portfolios = gGroupPortfolioProjectArr[i].listPortfolio;
				for(var mm=0;mm<portfolios.length;mm++)
				{
					if(gGroupPortfolioProjectArr[i].groupName == "Default Group" && portfolios[mm].portfolioId == "1")
					{
						project.gGroupPortfolioArr[ gGroupPortfolioProjectArr[i].groupName ].push(portfolios[mm].portfolioName);
						project.gGroupPortfolioIdArr[gGroupPortfolioProjectArr[i].groupName].push(portfolios[mm].portfolioId);
					}
					else if(gGroupPortfolioProjectArr[i].groupName != "Default Group")
					{
						project.gGroupPortfolioArr[ gGroupPortfolioProjectArr[i].groupName ].push(portfolios[mm].portfolioName);
						project.gGroupPortfolioIdArr[gGroupPortfolioProjectArr[i].groupName].push(portfolios[mm].portfolioId);
					}
				} 
			}
	    }
	    project.bindGroup(GrpMarkUp);
	}
},
bindGroup:function(mrkup) {/*PNew fn*/

            $('#group').html('<option value="0">Select Group</option>');
            $('#group').append(mrkup);
        },
        
getProjectList:function()
{/*PNew fn*/
  Main.showLoading();
  
  project.ProjectListItems= ServiceLayer.GetData('GetProjectDetails',_spUserId);
  var markup = project.getMarkup();
  project.arrPage=markup;
  var arr2=new Array();
  var len= project.arrPage.length;
  project.countVal=((len)>=10)?(len):('0'+(len));
	 // to set total record
	 if(project.countVal== 00)
	 {
	    $("#countDiv").css('display','none');
	 }
	 else
	 {
	   $("#countDiv").css('display','');
	   $("#labelCount").html(project.countVal);
	}
    // to set cuurent_page variable
  var val1=Main.getQuerystring('pid');
  var val2=show.projectId;
  var val='';
  if(val2 == "" || val2 == undefined)
  {
    if(val1 == "" || val1 == undefined)
    {
       project.pageIndex=0;
       
    }
    else
    {
      val=val1.toString();
    }
    
  }
  else 
  {
    val=val2.toString();
  }
  
   if(val=="")
   {
     project.pageIndex=0;
   }
   else
   {
	     var val3 = $.inArray(val,project.arrtest1);
	     if (val3 != 0 && val3 != -1 ) 
	     {
		    if ((val3/10).toString().indexOf(".") != -1) 
		    {
		        if ((val3/10).toString().indexOf(".") != -1)
		            project.pageIndex = Math.ceil(val3/10)-1;
		        else
		            project.pageIndex = Math.ceil(val3/10);
		    }
		    else
		         project.pageIndex = Math.ceil(val3/10);
		 }
		 else
		    project.pageIndex = 0;
    }
    
    $("#Pagination1").pagination(len,{
        callback:project.initpagePortfolio,
        items_per_page:10, 
        num_display_entries:10,
        current_page:project.pageIndex,
        num:2
        
    });
	if(project.arrPage.length >0)
	{	
        $('#table1').show();
    	$("#Pagination1").css('display','');
    	$("#noP").css('display','none');
    	$("#ProjectGrid").css('display','');
    	project.selectRow(show.projectId);
    	if(!isPortfolioOn)
	    {
	    	//To hide version column from grid:SD
	    	$("#table1 td:nth-child(3)").hide();
	    }	
		
	}
	else
	{
		$('#table1').hide();
		var len= 0;
		project.countVal=((len)>=10)?(len):('0'+(len));
		// to set total record
		if(project.countVal== 00)
		{
			$("#countDiv").css('display','none');
		}
		else
		{
			$("#countDiv").css('display','');
			$("#labelCount").html(project.countVal);
		}
		
		$("#Pagination1").css('display','none');
    	$("#noP").css('display','');
    	$("#ProjectGrid").css('display','none');
	}
	project.AttachDropDownDelegates();
	Main.hideLoading();
},
getMarkup:function()
{/*PNew fn*/
	project.arrtest1 = [];
	var parr = project.ProjectListItems;
    var sampleMarkupTemp = '';
	var tempProjArr  = [];
	var arr = [];
	if(parr != null && parr != undefined)
	{
	    for (i4 = 0; i4 < parr.length; i4++) 
	    {
	        project.arrtest1.push(parr[i4].projectId);
	        //Project Array
	          if( project.gGroupPortfolioProjectArr[parr[i4].groupId+'-'+parr[i4].portfolioId]==undefined  )
	          {
	          	project.gGroupPortfolioProjectArr[parr[i4].groupId+'-'+parr[i4].portfolioId] = new Array();
	          	project.gGroupPortfolioProjectArr[parr[i4].groupId+'-'+parr[i4].portfolioId].push(parr[i4].projectName);
	          
	          }
	          else
	          {  
	            if( $.inArray(parr[i4].projectName ,tempProjArr ) == -1 )
	        	{
	          		project.gGroupPortfolioProjectArr[parr[i4].groupId+'-'+parr[i4].portfolioId].push(parr[i4].projectName);
	          		tempProjArr.push(parr[i4].projectName);
	          	}
	          
	          }
			
	        
	        var leadName = '';
	        var stakeHolderName = '';
	
	        var prjUsrArr = parr[i4].listProjectUsers;
	        for (j = 0; j < prjUsrArr.length; j++) 
	        {
	            if (prjUsrArr[j].securityId == 2) {
	                leadName = prjUsrArr[j].userName;
	            }
	            else if (prjUsrArr[j].securityId == 5) 
	            {
	                stakeHolderName += prjUsrArr[j].userName + ",";
	            }
	        
	        }
	        stakeHolderName = stakeHolderName.substr(0, stakeHolderName.length - 1);
	        if(stakeHolderName == "")
	        	stakeHolderName = "-";
	        sampleMarkupTemp =
	              '<tr id="' + parr[i4].projectId + '" onclick="project.selectRow(' + parr[i4].projectId + ');"><td valign="top" class="center"><span>' + parr[i4].projectId +
				  '</span></td><td  align="left" valign="top"><span title="' + parr[i4].projectName + '">' + parr[i4].projectName +
				  '</span></td>';
				  //if(isPortfolioOn)
				  	sampleMarkupTemp += '<td align="left" vAlign="top"><span title="' + parr[i4].projectVersion + '">' + trimText(parr[i4].projectVersion, 7) + '</span></td>';
				  sampleMarkupTemp = sampleMarkupTemp+ '<td align="left" valign="top"><span title="' + leadName + '">' + leadName + '</span></td><td align="left" valign="top"><span>' + parr[i4].projectStatus +
				  '</span></td><td align="left" valign="top" style="padding-right:10px;padding-left:10px"><span title="' + stakeHolderName + '">' + stakeHolderName +
				  '</span></td><td  align="center" valign="top"> <a title="Edit ' + project.gConfigProject + '/' + project.gConfigVersion + ' Details" style="cursor:pointer" onclick="project.editModePortfolio(' + i4 + ');">' +
				  '<img style="width:25px;height:25px;padding-right:7px" src="../SiteAssets/images/Admin/Edit1.png"></a>' +
				  '<a onclick="project.delPortfolio(' + parr[i4].projectId + ')" style="cursor:pointer;" title="Delete ' + project.gConfigProject + '/' + project.gConfigVersion + '" ><img style="width: 25px; height: 25px" src="../SiteAssets/images/Admin/Garbage1.png"></a></td></tr>';
				  
			arr.push(sampleMarkupTemp);
	    }
    }
    return arr;
}                                                                                                                                                                                           
}