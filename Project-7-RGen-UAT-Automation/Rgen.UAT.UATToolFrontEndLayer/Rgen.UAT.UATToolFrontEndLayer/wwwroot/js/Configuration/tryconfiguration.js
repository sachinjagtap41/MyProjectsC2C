/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/


var GSclickFlag = 0;

function noActHandle() {
    $('#Doc').empty();
    $('#DocPagination').empty();
    $('#spanDoc').html('<span class="msgSpan">No Documents Uploaded<span>');
}

function pageselectDocCallback(page_index, jq) {
    // Get number of elements per pagionation page from form
    var members = new Array()
    members = documents;

    var items_per_page = 5;
    var max_elem = Math.min((page_index + 1) * items_per_page, members.length);
    var newcontent = '';

    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        newcontent += members[i];
    }
    $('#spanDoc').empty();
    // Replace old content with new content
    $('#Doc').empty().html(newcontent);

    // Prevent click event propagation
    return false;
}
var documents = new Array();
function initDocPagination() {
    // count entries inside the hidden content
    documents = Configuration.getDoc();
    if (documents != undefined) {
        var member = documents.length;
        $("#DocPagination").pagination(member, {
            callback: pageselectDocCallback,
            items_per_page: 5,
            num_display_entries: 10,
            num: 2

        });
        if (documents.length == 0) {
            $('#Doc').empty();
            $('#DocPagination').empty();
            $('#spanDoc').html('<span class="msgSpan">No Documents Uploaded<span>');
        }
    }
}

function hoverText() {
    // Tooltip only Text
    $('.masterTooltip').hover(function () {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
    },
	function () {
	    // Hover out code
	    $(this).attr('title', $(this).data('tipText'));
	    $('.tooltip').remove();
	}).mousemove(function (e) {
	    var mousex = e.pageX + 20; //Get X coordinates
	    var mousey = e.pageY + 10; //Get Y coordinates
	    $('.tooltip')
        .css({ top: mousey, left: mousex })
	});
}

var Configuration = {
    startIndex: 0,
    Ei: 0,
    gAttlength: 0,
    //application url grid paging
    startIndexApp: 0,
    EiApp: 0,
    gAttlengthApp: 0,
    gAttlengthAppConf: 0,
    SelectedUserArryRequest: new Array(),//array to save selected user names for sending request to admin by nitu on 18 dec 2012

    EnvironmentUserArry: new Array(),//array to save Environment for selected users for sending request to admin by nitu on 18 dec 2012

    //Process grid paging
    startIndexProc: 0,
    EiProc: 0,
    gAttlengthProc: 0,
    //File Upload
    startIndexFile: 0,
    EiFile: 0,
    globalEnvironmentId: new Array(),
    gAttlengthFile: 0,
    environmentListResult: '',
    EnvronmentNameForEnvironmentID: new Array(),
    SiteURL: Main.getSiteUrl(),
    UATEnvironment: new Array(),
    TesterList: new Array(),
    globalUserID: '',
    processSavedForProjectId: new Array(),
    loginUserName: '',
    userSettingID: '',
    flagForLoginUserNotTester: false,
    CheckMode: true,
    actualURL: '',
    prjID: '',
    GSTestPassFlag: 0,
    gCongfigRole: "Role",//Added for resource file:SD
    gConfigTestPass: "Test Pass",//Added for resource file:SD
    gConfigTestStep: "Test Step",//Added for resource file:SD
    gConfigTestCase: "Test Case",//Added for resource file:SD
    gConfigProject: "Project",//Added for resource file:SD
    gConfigTester: "Tester",//Added for resource file:SD
    gEnvironmentLabelText: "Environment",//:SD
    gConfigPortfolio: "Portfolio",
    gConfigVersion: "Version",
    gConfigMyActivity: 'My Activity',
    gConfigStakeholder: 'Stakeholders',
    gConfigManager: 'Test Manager',
    gConfigLead: 'Lead',
    gConfigFeedback: 'Feedback',
    gConfigUser: 'User',
    gConfigStatistic: 'Usage Statistics:UAT V3.0',
    gConfigStatisticUnus: 'Usage Statistics:UAT V3.0',
    gPortfolio: 0,
    gPortfolioID: '',

    getVersionByProjByName: new Array(),

    isPortfolioOn: '',
    portfolioFlag: '',

    fileAttachmentIdSql: '',


    init: function () {
        /**************************************************************************/

        Main.showLoading();


        //To show the counts in General settings tab
        var allCounts = ServiceLayer.GetData("GetSummaryReport",null,"Configuration");
        if (allCounts != undefined && allCounts.length > 0) {
            var count0 = ((allCounts[0].actualCount) >= 10) ? (allCounts[0].actualCount) : ('0' + (allCounts[0].actualCount));
            $('#prjCount').text(count0);
            var count2 = ((allCounts[2].actualCount) >= 10) ? (allCounts[2].actualCount) : ('0' + (allCounts[2].actualCount));
            $('#tpCount').text(count2);
            var count3 = ((allCounts[3].actualCount) >= 10) ? (allCounts[3].actualCount) : ('0' + (allCounts[3].actualCount));
            $('#tsCount').text(count3);
            var count4 = ((allCounts[4].actualCount) >= 10) ? (allCounts[4].actualCount) : ('0' + (allCounts[4].actualCount));
            $('#userCount').text(count4);
        }

        //Resource file:SD
        if (resource.isConfig.toLowerCase() == 'true') {
            Configuration.gCongfigRole = resource.gPageSpecialTerms['Role'] != undefined ? resource.gPageSpecialTerms['Role'] : "Role";
            Configuration.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] != undefined ? resource.gPageSpecialTerms['Test Pass'] : "Test Pass";
            Configuration.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] != undefined ? resource.gPageSpecialTerms['Test Step'] : "Test Step";
            Configuration.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] != undefined ? resource.gPageSpecialTerms['Test Case'] : "Test Case";
            Configuration.gConfigTester = resource.gPageSpecialTerms['Tester'] != undefined ? resource.gPageSpecialTerms['Tester'] : "Tester";
            Configuration.gConfigProject = resource.gPageSpecialTerms['Project'] != undefined ? resource.gPageSpecialTerms['Project'] : "Project";
            Configuration.gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] != undefined ? resource.gPageSpecialTerms['Portfolio'] : "Portfolio";
            Configuration.gConfigVersion = resource.gPageSpecialTerms['Version'] != undefined ? resource.gPageSpecialTerms['Version'] : "Version";
            Configuration.gConfigMyActivity = resource.gPageSpecialTerms['My Activity'] == undefined ? 'My Activity' : resource.gPageSpecialTerms['My Activity'];
            Configuration.gConfigStakeholder = resource.gPageSpecialTerms['Stakeholders'] == undefined ? 'Stakeholders' : resource.gPageSpecialTerms['Stakeholders'];
            Configuration.gConfigManager = resource.gPageSpecialTerms['Test Manager'] == undefined ? 'Test Manager' : resource.gPageSpecialTerms['Test Manager'];
            Configuration.gConfigLead = resource.gPageSpecialTerms['Lead'] == undefined ? 'Lead' : resource.gPageSpecialTerms['Lead'];
            Configuration.gConfigFeedback = resource.gPageSpecialTerms['Feedback'] == undefined ? 'Feedback' : resource.gPageSpecialTerms['Feedback'];
            Configuration.gConfigUser = resource.gPageSpecialTerms['User'] == undefined ? 'User' : resource.gPageSpecialTerms['User'];
            Configuration.gConfigStatistic = resource.gPageSpecialTerms['Usage Statistics:UAT V1.1'] == undefined ? 'Usage Statistics:UAT V1.1' : resource.gPageSpecialTerms['Usage Statistics:UAT V1.1'];
            Configuration.gConfigStatisticUnus = resource.gPageSpecialTerms['Usage Statistics:Unus Site'] == undefined ? 'Usage Statistics:Unus Site' : resource.gPageSpecialTerms['Usage Statistics:Unus Site'];
        }
        /*Added bhy Mohini for Usage statistic DT:21-05-2014*/
        $('#lblPrj').text('Total ' + Configuration.gConfigProject + 's');
        $('#lblTP').text('Total ' + Configuration.gConfigTestPass + 'es');
        $('#lblTS').text('Total ' + Configuration.gConfigTestStep + 's');
        $('#lblUser').text('Total ' + Configuration.gConfigUser + 's*');
        $('#statNote').text('* Total Users includes all ' + Configuration.gConfigTester + 's, ' + Configuration.gConfigManager + ' and ' + Configuration.gConfigStakeholder + ' added to any ' + Configuration.gConfigProject + ' or ' + Configuration.gConfigTestPass + ' for this site.');
        var url = window.location.href;
        if (url.indexOf('Unus') == -1)
            $('#heading').text(Configuration.gConfigStatistic);
        else
            $('#heading').text(Configuration.gConfigStatisticUnus);
        /*********************/
        $('#divAlert2').attr('title', Configuration.gConfigPortfolio + ' Setting Confirmation');
        Configuration.isPortfolioOn = isPortfolioOn;
        Configuration.gPortfolioID = gPortfolioID;
        //security.applySecurityForAnalysis(_spUserId,$('#userW').text()); 
        /*To hide version field if Portfolio OFF*/
        if (!Configuration.isPortfolioOn) {
            $('#UATStatistic').css('margin-top', '-204px');
            Configuration.portfolioFlag = 0;
            $('input[id="portfolioOption' + Configuration.portfolioFlag).attr('checked', 'checked');
            $('#tab1 div table tr:eq(1)').hide(); //to hide the version field of config tab
            $('#tab2 div div table tr:eq(1)').hide();//to hide the version field of user setting tab
            $('#tab3 div table tr:eq(1)').hide();//to hide the version field of doc lib tab
            $('#tab4 div div table tbody tr:eq(1)').hide();//to hide the version field of Process details tab
            $('#GSVersionField').hide();
            $('#ProjectOptions').text(Configuration.gConfigProject + ' Level Options:');

            var genSetTitle = Configuration.gConfigManager + ' (or ' + Configuration.gConfigStakeholder + ' or ' + Configuration.gConfigProject + ' ' + Configuration.gConfigLead + ') can configure Application, ' +
                              Configuration.gConfigTestPass + ' level General settings which is applicable at respective levels.';

        }
        else {
            $('#UATStatistic').css('margin-top', '-140px');
            Configuration.portfolioFlag = 1;
            $('input[id="portfolioOption' + Configuration.portfolioFlag).attr('checked', 'checked');
            $('#appDiv').hide();
            $('#EnPortf').show();
            $('#tab5dropdown').css('margin-top', '5px');

            var genSetTitle = Configuration.gConfigManager + ' (or ' + Configuration.gConfigStakeholder + ' or ' + Configuration.gConfigVersion + ' ' + Configuration.gConfigLead + ') can configure Application, ' + Configuration.gConfigVersion + ' and ' +
                Configuration.gConfigTestPass + ' level General settings which is applicable at respective levels.';
        }
        /****** file upload related code Added by shilpa **********/

        //Added by mangesh to retrive the saved information from the list  		
        var configPageStateVar = Main.getCookie("ConfigPageState");
        var attchprjid = '';
        var attachName = '';
        var fileName = '';
        if (configPageStateVar != null && configPageStateVar != undefined) {
            attchprjid = configPageStateVar.split('|')[0];
            //Added by HRW
            var flag = configPageStateVar.split('|')[2];
            attachName = configPageStateVar.split('|')[3];
            fileName = configPageStateVar.split('|')[4];

            if (flag == 0) {
                var configInfo = attchprjid + "|" + "tab3" + "|" + "1";
                Main.setCookie("ConfigPageState", configInfo, null);
            }
            else
                Main.deletecookie("ConfigPageState");
            Configuration.prjID = attchprjid;

        }

        //to find out the unique ID of attachment
        var query = '';
        query = '<Query><Where><And><Eq><FieldRef Name="ProjectID" /><Value Type="Text">' + attchprjid + '</Value></Eq><And>';
        query += '<Eq><FieldRef Name="AttachmentName" /><Value Type="Text">' + attachName + '</Value></Eq>';

        query += '<Eq><FieldRef Name="FileName" /><Value Type="Text">' + fileName + '</Value></Eq></And></And></Where></Query>';

        var detailsAttach = new Array();
        detailsAttach =[]// Configuration.dmlOperation(query, 'ConfigureDocuments');


        /*if (detailsAttach != undefined) {
            //To Make url
            var desc = detailsAttach[0]['FileDescription'];

            var protocol = window.location.protocol;
            var hostname = window.location.hostname;
            var fileRef = detailsAttach[0]['FileRef'];
            var site = fileRef.split(';')[1].split('#')[1].split("Lists/ConfigureDocuments");
            var fileUrl = protocol + "//" + hostname + "/" + site[0] + "Lists/ConfigureDocuments/Attachments/" + detailsAttach[0]['ID'] + "/" + detailsAttach[0]['FileName'];

            var insertAttachDetails = '';
            insertAttachDetails = {
                'projectId': attchprjid,
                'attachmentName': attachName,
                'fileName': fileName,
                'filePath': fileUrl,
                'fileDescription': desc

            };
            var result = ServiceLayer.InsertUpdateData("InsertUpdateConfigurationDocuments", insertAttachDetails,"Configuration");
            if (result.length > 0) {
                if (result[0].Key == "Success") {
                    Configuration.fileAttachmentIdSql = result[1].Value;
                }
            }
        }*/


        ///////////////////// Code for blocking user from navigating to configuredocuments list-allitems page after save btn press ///////////////////////////////////
        //Configuration.AttachmentWebPartFunc();
        var urlvar = '';
        urlvar = window.location.href;
        if (urlvar.indexOf('source') == -1) {
            //var newurl =urlvar.charAt(urlvar.indexOf(".aspx"));
            var index = urlvar.indexOf(".aspx");
            var str = "?source=" + urlvar.substr(0, index);
            var newurl = urlvar.substr(0, index + 5) + str + urlvar.substr(index)
            if (attchprjid != '')
                newurl = newurl + '#tab3';
            		 
            //window.location.href = newurl;//commented
        }
        else {
            //Added by HRW for 3890 bug(Windows 8)
            if (urlvar.split("#")[2] == "tab3" && urlvar.split("#")[2] != undefined)
                window.location.href = urlvar.split('#')[0] + "#tab3";
        }


        /*****************Code added for attachment wp styling*******/
        var arr = $("[id$='toolBarTbltop']").html();
        ('<b>Attachments</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arr);
        $("h1 tbody").css('width', '20px');
        //$("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
        //$("[id$='diidIOSaveItem']").addClass('ms-toolbar ms-ButtonHeightWidth btn');
        $("[id$='attachCancelButton']").hide();
        $("[id$='diidIOGoBack']").hide();
        $("#partAttachment").css("display", "block");
        $("#onetidIOFile").css("width", "200pt");
        $("[id$='toolBarTbltop']").css("display", "none");
        $("[id$='TextField']").css('width', '200pt');
        $(".ms-formlabel").css("height", "10px");
        $("#attachOKbutton").addClass('btnOk');
        $("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
        $("[id$='diidIOSaveItem']").addClass('ms-toolbar ms-ButtonHeightWidth btn');
        $(".ms-formtable").each(function () {
            var i = 0;
            $(this).find("tr").each(function () {
                if (i != 2 && i != 3) {
                    $(this).hide();
                }
                i++;
            });
        });
        $(".ms-formline").hide();
        $(".ms-descriptiontext").hide();

        //For Hover Over Text:-Added By Mohini  
        var configTitle = Configuration.gConfigTester + ' can view information required to execute UAT Test Scripts here ' +
						  'like Test Environment, Supporting documents for reference.'

        var userSetTitle = 'To assign ' + $('#lblEnvironment').text().substring(0, $('#lblEnvironment').text().length - 2) + ' to ' + Configuration.gConfigTester + 's. Also ' + Configuration.gConfigManager + ' can send the access request for ' + Configuration.gConfigTester + '.';

        var docLibTitle = 'To upload documents which a ' + Configuration.gConfigTester + ' needs for reference to execute the UAT Test Scripts.';

        var procDetTitle = 'To add the process/features of the application under UAT phase which is useful ' +
						   'for ' + Configuration.gConfigTester + 's to understand the application/system.';

        $("#configTab").attr('title', configTitle);
        $("#genSetTab").attr('title', genSetTitle);
        $("#userSetTab").attr('title', userSetTitle);
        $("#docLibTab").attr('title', docLibTitle);
        $("#proDet").attr('title', procDetTitle);

        $('#msgPort').html("<b>Note:</b><i>&nbsp;Once ‘Enable " + Configuration.gConfigPortfolio + "’ is selected, you will not be able to make it ‘Disable " + Configuration.gConfigPortfolio + "’ throughout the application.</i>");
        $('#msgEnabled').html("<b>Note:</b><i>" + Configuration.gConfigPortfolio + " feature is enabled for this UAT App.</i>");
        if (isRootWeb)
            $('#docEnP').html("Download&nbsp;<a href='GuidelineDocs/UAT_Enabled Portfolio_RGen_V1.0.pdf' target='_blank'" +
			               "style='text-decoration:underline;color:blue'>Enable " + Configuration.gConfigPortfolio + "</a>&nbsp;document for detailed guidelines.");
        else
            $('#docEnP').html("Download&nbsp;<a href='GuidelineDocs/UAT_Enabled Portfolio_RGen_V1.0.pdf' target='_blank'" +
		               "style='text-decoration:underline;color:blue'>Enable " + Configuration.gConfigPortfolio + "</a>&nbsp;document for detailed guidelines.");
        /************************************************/
        
        $('#spnEnvironment').html('Add ' + $('#lblEnvironment').text().trim().substring(0, $('#lblEnvironment').text().trim().length - 2));//:SD
        /************Code added for attachment wp styling *********/

        setTimeout("Configuration.onPageLoad(\'projectName\');", 200);

        //only for non-tester
        if ($.inArray('4', security.userType) == -1) {
            $("#tabs").tabs();
            if (Configuration.prjID == '')
                $("#tabs").tabs({ disabled: [0], selected: 1 });//Disabled the configuration tab for the User who is not Tester
            $('#tabs li:eq(0)').hide();

            /*Added by Mohini*/
            if (GSclickFlag == 0)//Added for onhover text
            {
                GSclickFlag = 1;
                hoverText();
            }

        }
            //only for tester
        else if ($.inArray('4', security.userType) != -1 && $.inArray('1', security.userType) == -1 && $.inArray('2', security.userType) == -1 && $.inArray('3', security.userType) == -1 && $.inArray('5', security.userType) == -1) {
            $("#tabs").tabs();
            //$('#tabs ul li:eq(0) a').click(function(e){
            //Configuration.populateProjectForTester();
            //Configuration.populateTestPassForTester();

            //Configuration.getServrsFrLogInUser();
            //Configuration.gridDetails();
            //noActHandle();
            //initDocPagination();
            //Configuration.populateTestPassForTester();
            //});
            $('#tabs li:eq(1)').hide();
            $('#tabs li:eq(2)').hide();
            $('#tabs li:eq(3)').hide();
            $('#tabs li:eq(4)').hide();
        }
        else//both tester and non-tester
        {
            //if(Configuration.prjID=='')
            //$("#tabs").tabs({selected: 0});//Disabled the configuration tab for the User who is not Tester
            $("#tabs").tabs();
        }
        //Added for bub 10682
        $('#tabs ul li:eq(1) a').click(function (e) {
            if (GSclickFlag == 0)//Added for onhover text
            {
                GSclickFlag = 1;
                hoverText();
            }
            //Configuration.populateTPForGS();
        });


        //hide 1st tab readonly is login user is not tester

        //Resource file changes:SD
        //$('#ProjectOptions').html(Configuration.gConfigVersion+' Level Options:');
        $('#lblPortfolioDisable').text('Disable ' + Configuration.gConfigPortfolio);
        $('#lblPortfolioEnable').text('Enable ' + Configuration.gConfigPortfolio);
        $('#h4PortfolioOption').text('Select ' + Configuration.gConfigPortfolio + ' Options:');
        $("#imgDisPortfolio").attr('title', Configuration.gConfigPortfolio + " feature will not be available at UAT application level.");
        $("#imgEnPortfolio ").attr('title', Configuration.gConfigPortfolio + " feature will be available at UAT application level.");
        $('#h4TestPassOptions1').html(Configuration.gConfigTestPass + ' Level Options:');//:SD
        $('#h4TestPassOptions2').html(Configuration.gConfigTestPass + ' Level Options:');//:SD
        $('#lblRoleConfig').html(Configuration.gCongfigRole + ' Configuration:');//:SD
        $('#lblSelectRoles').text("Please select " + Configuration.gCongfigRole + "(s) to display on 'Sign Up' form:");//:SD

        $('#imgTestingType1').attr('title', 'Execute ' + Configuration.gConfigTestStep + ' sequentialy within a ' + Configuration.gConfigTestCase + '.');//:SD
        $('#imgTestingType2').attr('title', 'Execute ' + Configuration.gConfigTestStep + ' sequentialy as per its creation within a ' + Configuration.gConfigTestPass + '.');//:SD
        $('#imgTestingType3').attr('title', 'Execute ' + Configuration.gConfigTestStep + ' in any sequence at ' + Configuration.gConfigTestPass + ' level.');//:SD
        $('#lblTestingType1').text('Sequential Testing within a ' + Configuration.gConfigTestCase);//:SD
        $('#lblTestingType2').text('Sequential Testing within a ' + Configuration.gConfigTestPass);//:SD

        $('#lblFeedbackRatingOption1').text("After completion of each " + Configuration.gConfigTestPass + " activity.");//:SD
        $('#lblFeedbackRatingOption2').text("After completion of each (Pass) " + Configuration.gConfigTestCase + '.');//:SD
        $('#imgFeedbackRatingOption1').attr("title", "User has to provide a mandatory feedback rating after completing testing of a " + Configuration.gConfigTestPass + " activity which he selects from '" + Configuration.gConfigMyActivity + "' Action links.");//:SD
        $('#imgFeedbackRatingOption2').attr("title", "User has to provide a mandatory feedback rating after every 'Pass' " + Configuration.gConfigTestCase + ".");//:SD

        $('#lblTestStepConstraint').text(Configuration.gConfigTestStep + ' Name Constraint:');//:SD
        $('#lblTestStepConstraint1').text("Allow same " + Configuration.gConfigTestStep + " name within " + Configuration.gConfigTestCase);//:SD
        $('#lblTestStepConstraint2').text("Don't allow same " + Configuration.gConfigTestStep + " name within " + Configuration.gConfigTestCase);//:SD
        Configuration.gEnvironmentLabelText = $("#lblEnvironment").text().trim().substring(0, $("#lblEnvironment").text().trim().length - 2);//:SD

        $('#roleConfig').attr('title', 'Only checked ' + Configuration.gCongfigRole.toLowerCase() + 's will be available on Sign Up form of Onboarding platform.');//added by mohini for resource file
        $('#autoapp').attr('title', 'If checked then ' + Configuration.gConfigTester + ' requested from Sign Up form to join the ' + Configuration.gConfigTestPass + ' will automatically gets added in the requested ' + Configuration.gConfigTestPass + '.(For ' + Configuration.gConfigTester + 's who signs up from Onboarding Platform.)');//added by mohini for resource file
        //$('#proDet').attr('title','To add '+Configuration.gConfigProject.toLowerCase()+' process details');
        //*************************************//
        $('.tTipConfig').betterTooltip();//added by Mohini for increasing the delay time of hover over text


        Main.hideLoading();
    },

    ////////Added by Mangesh
    resultPrj: new Array(),
    getProjectNameByID: new Array(),
    getTestPassIdByProjectId: new Array(),
    getRoleIdByTesterId: new Array(),
    getVerByProjName: new Array(),
    getTesterIdByTestpassId: new Array(),

    GSLoad: function () {
        //Added by Mangesh For General Settings Tab for DropDown Arrays

        var temp = "";
        var projectID = '';
        var projectName = '';
        var projectVersion = '';

        var testpassName = '';
        var testpassId = '';
        var testerId = '';
        var testerName = '';
        var roleId = '';
        var roleName = '';

        //Using the generic service layer getmethod to call the required function  :   Mangesh


          // _spUserId   "12" 
        var DataCollection = ServiceLayer.GetData("GetDropdownDataForDetailAnalysis", null, "Dashboard"); 
        //DataCollection = Analysis.projectItems;

        if (DataCollection != undefined) {
            var len = DataCollection.length;
            for (var i = 0; i < len; i++) {


                DataCollection[i].testpassId = DataCollection[i].testPassId == null ? "" : DataCollection[i].testPassId.toString();
                DataCollection[i].testpassName = DataCollection[i].testPassName == null ? "" : DataCollection[i].testPassName.toString();

                if (DataCollection[i].hasOwnProperty("projectLead")) {
                    DataCollection[i].versionLead = $(DataCollection[i].projectLead).find("userName").text();


                }
                if (DataCollection[i].hasOwnProperty("testManagerDetails")) {
                    DataCollection[i].testManager = $(DataCollection[i].testManagerDetails).find("userName").text();

                }
                if (DataCollection[i].hasOwnProperty("rowTesterDetails")) {
                    DataCollection[i].testerId = $(DataCollection[i].rowTesterDetails).find("spUserId").text();
                    DataCollection[i].testerName = $(DataCollection[i].rowTesterDetails).find("userName").text();
                }

                if (DataCollection[i].hasOwnProperty("projectId")) { DataCollection[i].projectId = DataCollection[i].projectId == null ? "" : DataCollection[i].projectId.toString() }
                if (DataCollection[i].hasOwnProperty("roleId")) { DataCollection[i].roleId = DataCollection[i].roleId == null ? "" : DataCollection[i].roleId.toString() }


            }

        }
        Configuration.resultPrj = DataCollection;

        if ((Configuration.resultPrj != null || Configuration.resultPrj != undefined) && Configuration.resultPrj.length > 0) {

            var tempProjName = new Array();
            for (var zz = 0; zz < Configuration.resultPrj.length; zz++) {
                projectName = Configuration.resultPrj[zz].projectName;
                temp = '<option value="' + Configuration.resultPrj[zz].projectId + '" title="' + projectName + '" >' + trimText(projectName, 35) + '</option>';

                //To filter data in arrays accordingly		            
                projectID = Configuration.resultPrj[zz].projectId;
                projectName = Configuration.resultPrj[zz].projectName;
                projectVersion = Configuration.resultPrj[zz].projectVersion; //added by Mangesh
                testpassName = Configuration.resultPrj[zz].testpassName; //added by Mangesh
                testpassId = Configuration.resultPrj[zz].testpassId; //added by Mangesh
                testerId = Configuration.resultPrj[zz].testerId; //added by Mangesh
                testerName = Configuration.resultPrj[zz].testerName; //added by Mangesh
                roleId = Configuration.resultPrj[zz].roleId; //added by Mangesh
                roleName = Configuration.resultPrj[zz].roleName; //added by Mangesh	                  		  

                if (Configuration.getProjectNameByID[Configuration.resultPrj[zz].projectId] == undefined) {
                    Configuration.getProjectNameByID[Configuration.resultPrj[zz].projectId] = new Array();
                    Configuration.getProjectNameByID[Configuration.resultPrj[zz].projectId].push({

                        "projectId": projectID,
                        "projectName": projectName,

                        "projectVersion": projectVersion

                    });
                }


                if (testpassId != "") {

                    if (Configuration.getTestPassIdByProjectId[Configuration.resultPrj[zz].projectId] == undefined) {
                        Configuration.getTestPassIdByProjectId[Configuration.resultPrj[zz].projectId] = new Array();
                        Configuration.getTestPassIdByProjectId[Configuration.resultPrj[zz].projectId].push({

                            "testpassId": testpassId,
                            "testpassName": testpassName,
                            "testerId": testerId,
                            "testerName": testerName,

                            "roleId": roleId,
                            "roleName": roleName

                        }); //added by Mangesh
                    }
                    else {
                        Configuration.getTestPassIdByProjectId[Configuration.resultPrj[zz].projectId].push({

                            "testpassId": testpassId,
                            "testpassName": testpassName,
                            "testerId": testerId,
                            "testerName": testerName,


                            "roleId": roleId,
                            "roleName": roleName

                        }); //added by Mangesh
                    }
                }


                if (testerId != "") {

                    if (Configuration.getTesterIdByTestpassId[Configuration.resultPrj[zz].testpassId] == undefined) {
                        Configuration.getTesterIdByTestpassId[Configuration.resultPrj[zz].testpassId] = new Array();
                        Configuration.getTesterIdByTestpassId[Configuration.resultPrj[zz].testpassId].push({
                            "testerId": testerId,
                            "testerName": testerName,
                            "roleId": roleId,
                            "roleName": roleName
                        });
                    }
                    else {
                        Configuration.getTesterIdByTestpassId[Configuration.resultPrj[zz].testpassId].push({
                            "testerId": testerId,
                            "testerName": testerName,
                            "roleId": roleId,
                            "roleName": roleName

                        });

                    }
                }



                //Code for portfolio changes :Ejaz Waquif DT:1/23/2014		                        		            
                if ($.inArray(projectName, tempProjName) == -1) {
                    //For others          	        
                    $("#projectForGS").append(temp);  //For GS

                    $("#projectNames").append(temp);  //For US

                    $("#projectForFileUpload").append(temp);  //For DL

                    $("#projectNamesForProcess").append(temp);  //For PD

                    //For tester only
                    $("#projectForTester").append(temp);  //For Configuration tab

                    tempProjName.push(projectName);

                    var version = Configuration.resultPrj[zz].projectVersion == null || Configuration.resultPrj[zz].projectVersion == undefined ? "Default " + Configuration.gConfigVersion : Configuration.resultPrj[zz].projectVersion;//Added by Mohini for resource file
                    Configuration.getVerByProjName[projectName] = new Array();
                    Configuration.getVerByProjName[projectName].push({
                        "projectVersion": version,
                        "projectId": projectID
                    });
                }
                else {
                    //var version = resultPrj[zz]['ProjectVersion']==null||resultPrj[zz]['ProjectVersion']==undefined ?"No Version":resultPrj[zz]['ProjectVersion'];
                    var version = Configuration.resultPrj[zz].projectVersion == null || Configuration.resultPrj[zz].projectVersion == undefined ? "Default " + Configuration.gConfigVersion : Configuration.resultPrj[zz].projectVersion;//Added by Mohini for resource file
                    Configuration.getVerByProjName[projectName].push({
                        "projectVersion": version,
                        "projectId": projectID
                    });
                }




            }
        }
        else {
            var projOptions = '<option >No ' + Configuration.gConfigProject + ' Available</option>';

            $("#projectForGS").html(projOptions);  //For GS

            $("#projectNames").html(projOptions);  //For US

            $("#projectForFileUpload").html(projOptions);  //For DL

            $("#projectNamesForProcess").html(projOptions);  //For PD

            //For tester only
            $("#projectForTester").html(projOptions);  //For Configuration tab


        }



        ////////////////////////////////////////////////////////////////////////////
    },
    onPageLoad: function () {

        /*Highlight the configuration tab*/
        $(".nav ul li:eq(6) a").addClass("active");

        /******Attachment Wp code Added by Shilpa *********/
        var arr = $("[id$='toolBarTbltop']").html();
        $('#saveBtnUpload').append(arr);
        var arr2 = $("#saveBtnUpload tbody tr td:eq(1) table tr td").html();
        $('#saveBtnUpload').empty();
        $('#partAttachment table tbody tr:eq(5)').remove();
        $('.ms-attachUploadButtons').append(arr2);
        $("[id$='toolBarTbl']").remove();
        $(".s4-wpTopTable tr:eq(0)").remove();
        /*********Attachment Wp code******/

        Configuration.CheckMode = true;

        /*Get current logged in user name*/
        var userName =''
        //$("#userNameDiv").html(userName);
        $("#userW span:eq(1) a span").text("");
        var displayText = $("#userW").text();
        $("#userNameDiv").html(displayText);
        //code Commented Now


        /////////////Added by Mangesh for General Setting tab
        Configuration.GSLoad();
        //////////////////////////////////////////////////	

        Configuration.loginUserName = userName;

        //only for non-tester
        if ($.inArray('4', security.userType) == -1) {
            ////On load call to general settings dropdown n etc functions
            Configuration.GSProjectChange();
            Configuration.populateTPForGS();
            Configuration.getGSSettings();

            ////On load call to user settings dropdown n etc functions
            Configuration.USProjectChange();
            Configuration.clearFields();
            Configuration.populateTestPass();
            Configuration.populateEnvironments();
            Configuration.resetAddModeUserSetting();
            /////////////////////////////////////

            ////On load call to document library settings dropdown n etc functions
            Configuration.DLProjectChange();
            Configuration.bindUploadedFileGrid(Configuration.prjID);

            ////On load call to process details settings dropdown n etc functions
            Configuration.PDProjectChange();
            Configuration.clearProcessFields();
            Configuration.gridDetailsForProcess();

        }
            //only for tester			
        else if ($.inArray('4', security.userType) != -1 && $.inArray('1', security.userType) == -1 && $.inArray('2', security.userType) == -1 && $.inArray('3', security.userType) == -1 && $.inArray('5', security.userType) == -1) {
            Configuration.ProjectChange();
            Configuration.populateTestPassForTester();
            //code Commented Now
            Configuration.getServrsFrLogInUser();
            Configuration.gridDetails();
            noActHandle();
            initDocPagination();
            //code Commented Now end
        }
        else//both tester and non-tester
        {
            //////////////////////////////////////////tester
            Configuration.ProjectChange();
            Configuration.populateTestPassForTester();
            //code Commented Now
            Configuration.getServrsFrLogInUser();
            Configuration.gridDetails();
            noActHandle();
            initDocPagination();
            //code Commented Now end

            //////////////////////////////////////

            //and non-tester
            ////On load call to general settings dropdown n etc functions
            Configuration.GSProjectChange();
            Configuration.populateTPForGS();
            Configuration.getGSSettings();

            ////On load call to user settings dropdown n etc functions
            Configuration.USProjectChange();
            Configuration.clearFields();
            Configuration.populateTestPass();
            Configuration.populateEnvironments();
            Configuration.resetAddModeUserSetting();
            /////////////////////////////////////

            ////On load call to document library settings dropdown n etc functions
            Configuration.DLProjectChange();
            Configuration.bindUploadedFileGrid(Configuration.prjID);

            ////On load call to process details settings dropdown n etc functions
            Configuration.PDProjectChange();
            Configuration.clearProcessFields();
            Configuration.gridDetailsForProcess();

            /////////////////////////////////////
        }


        //Code Modified by swapnil kamle on 7-8-2012	
        $("#dialog:ui-dialog").dialog("destroy");
        $("#divUrlPopUpUpdate").dialog({
            autoOpen: false,
            height: 230,
            width: 350,
            modal: true,
            open: function (event, ui) {

                Configuration.actualURL = '';
                document.getElementById('actualURLUpdate').value = '';
                document.getElementById('aliasURLUpdate').value = '';
                document.getElementById('lblErrorUpdate').innerHTML = '';
                //Code Modified by swapnil kamle on 7-8-2012
                $("#urlboxdiv li").each(function () {
                    if ($(this).children(".mslChk").attr('checked') == true) {
                        EnvironmentID = $(this).children(".mslChk").attr('value');

                        if (EnvironmentID != undefined) {
                            //Configuration.Evironmenturl// env data	

                            for (var i = 0; i < Configuration.Evironmenturl.length; i++) {
                                if (EnvironmentID == Configuration.Evironmenturl[i].envID) {
                                    document.getElementById('actualURLUpdate').value = Configuration.Evironmenturl[i].actualUrl;
                                    document.getElementById('aliasURLUpdate').value = Configuration.Evironmenturl[i].aliasUrl;
                                    document.getElementById('lblErrorUpdate').innerHTML = '';
                                    Configuration.actualURL = Configuration.Evironmenturl[i].actualUrl;
                                    break;
                                }
                            }

                        }
                    }

                }
                    )

                //
            },
            buttons: {
                //Modified by swapnil kamle ok to Add
                "Update": function () {

                    var actualUrl = jQuery.trim(document.getElementById('actualURLUpdate').value);
                    var aliasUrl = jQuery.trim(document.getElementById('aliasURLUpdate').value);
                    Configuration.CheckMode = false;
                    if (actualUrl == '' || aliasUrl == '') {
                        document.getElementById('lblErrorUpdate').innerHTML = "Fields marked with asterisk(*) are mandatory!";

                        return false;
                    }
                    else {

                        if (actualUrl.indexOf("HTTP") != -1)
                            actualUrl = actualUrl.replace("HTTP", "http");

                        if (actualUrl.indexOf("http") == -1)
                            var actualUrlWithHttp = 'http://' + actualUrl;
                        else
                            var actualUrlWithHttp = actualUrl;

                        /* Added by shilpa for bug 6856 on 15 march */
                        if (actualUrlWithHttp.indexOf("http://") == -1 && actualUrlWithHttp.indexOf("https://") == -1) {
                            document.getElementById('lblErrorUpdate').innerHTML = "Please enter correct url";
                            return false;
                        }/**/

                        //Falg varible
                        //0 - Environment already present in list
                        //1 - Duplicate Alias
                        //2 - Push data
                        var flag = 0;
                        if ($('#projectNames').val() != undefined && $('#testPassNames').val() != undefined) {
                            //Code Modified by swapnil kamle on 6-8-2012 
                            if ($('#aliasURLUpdate').val().length > 50) {
                                document.getElementById('lblErrorUpdate').innerHTML = "Alias' length should not exceed 50 characters!";
                            }
                            else {
                                if ($("#urlboxdiv li").find(":checked").length == 0) {
                                    //Configuration.alertBox("Select the Environment first!");
                                    Configuration.alertBox("Select the " + Configuration.gEnvironmentLabelText + "first!");//:SD

                                }
                                else if ($("#urlboxdiv li").find(":checked").length > 1) {
                                    //Configuration.alertBox("Select one Environment at a time!");
                                    Configuration.alertBox("Select one " + Configuration.gEnvironmentLabelText + " at a time!");//:SD
                                }
                                else {
                                    $("#urlboxdiv li").each(function () {
                                        var EnvironmentID;
                                        if ($(this).children(".mslChk").attr('checked') == true) {
                                            EnvironmentID = $(this).children(".mslChk").attr('value');
                                        }
                                        if (EnvironmentID != undefined) {
                                            var flag = 0;
                                            //Added by HRW for bug 4243
                                            if (Configuration.actualURL == actualUrlWithHttp)
                                                flag = 1;
                                            else {
                                                if (!($.inArray(actualUrl, Configuration.tempUrls) == -1)) {
                                                    document.getElementById('lblErrorUpdate').innerHTML = "Environment already present in list!";
                                                    flag = 0;
                                                }
                                                else
                                                    flag = 1;
                                            }

                                            if (flag == 1) {

                                                var Environment = new Array();
                                                Environment.push({
                                                    'Title': '',
                                                    'ID': EnvironmentID,
                                                    'ProjectId': $('#projectNamesVersion').val(),
                                                    'TestPassID': $('#testPassNames').val(),
                                                    'actualURL': actualUrlWithHttp == '' ? null : actualUrlWithHttp,
                                                    'aliasURL': $('#aliasURLUpdate').val() == '' ? null : $('#aliasURLUpdate').val(),
                                                });


                                                //To form a Parameter to pass it to insert function
                                                var envVariablesForUpdate = '';
                                                envVariablesForUpdate = {

                                                    envID: EnvironmentID,
                                                    projectId: $('#projectNamesVersion').val(),
                                                    testPassId: $('#testPassNames').val(),
                                                    actualUrl: actualUrlWithHttp == '' ? null : actualUrlWithHttp,
                                                    aliasUrl: $('#aliasURLUpdate').val() == '' ? null : $('#aliasURLUpdate').val()

                                                };

                                                var resultForUpdate = ServiceLayer.InsertUpdateData('InsertUpdateEnvironment', envVariablesForUpdate,"Configuration");


                                                //var EnvironmentList = jP.Lists.setSPObject(Configuration.SiteURL,'Environment'); 
                                                //var result = EnvironmentList .updateItem(Environment);

                                                //temporary
                                                Configuration.EnvronmentNameForEnvironmentID[EnvironmentID] = actualUrlWithHttp + '`' + $('#aliasURLUpdate').val();

                                                var markup = '<li>';
                                                markup += '<input class="mslChk" type="checkbox" value="' + EnvironmentID + '"/>';
                                                markup += '<a style="color: blue; padding-left: 6px;" title="' + actualUrlWithHttp + '" href="' + actualUrlWithHttp + '" target="_blank">' + trimText(aliasUrl, 28) + '</a>';
                                                markup += '</li>';
                                                $('#urlboxdiv span').remove();
                                                $('#urlboxdiv').append(markup);

                                                Configuration.populateEnvironments();
                                                Configuration.bindUserSettingGrid();
                                                //Configuration.resetUserSettingInEditMode(); //commented by shilpa for bug 5205(1)
                                                $("#divUrlPopUpUpdate").dialog("close");
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
                "Cancel": function () {
                    document.getElementById('lblErrorUpdate').innerHTML = " ";
                    $(this).dialog("close");
                }
            }
        });

        //	
        $("#dialog:ui-dialog").dialog("destroy");
        $("#divUrlPopUp").dialog({
            autoOpen: false,
            height: 230,
            width: 350,
            modal: true,
            open: function (event, ui) {
                document.getElementById('actualURL').value = '';
                document.getElementById('aliasURL').value = '';
                document.getElementById('lblError').innerHTML = '';
            },
            buttons: {
                //Modified by swapnil kamle ok to Add
                "Add": function () {
                    Configuration.CheckMode = true;
                    var actualUrl = jQuery.trim(document.getElementById('actualURL').value);
                    var aliasUrl = jQuery.trim(document.getElementById('aliasURL').value);


                    if (actualUrl == '' || aliasUrl == '') {
                        document.getElementById('lblError').innerHTML = "Fields marked with asterisk(*) are mandatory!";

                        return false;
                    }
                    else {

                        if (actualUrl.indexOf("HTTP") != -1)
                            actualUrl = actualUrl.replace("HTTP", "http");

                        if (actualUrl.indexOf("http") == -1)
                            var actualUrlWithHttp = 'http://' + actualUrl;
                        else
                            var actualUrlWithHttp = actualUrl;

                        /* Added by shilpa for bug 6856 on 15 march */
                        if (actualUrlWithHttp.indexOf("http://") == -1 && actualUrlWithHttp.indexOf("https://") == -1) {
                            document.getElementById('lblError').innerHTML = "Please enter correct url";
                            return false;
                        }/**/

                        //Falg varible
                        //0 - Environment already present in list
                        //1 - Duplicate Alias
                        //2 - Push data
                        var flag = 0;

                        if (Configuration.UATEnvironment.length == 0) {
                            flag = 2;
                        }
                        else {
                            $.each(Configuration.UATEnvironment, function (index, environment) {
                                if ((environment['UATEnvironmentURL'].toString().toLowerCase() == actualUrl.toString().toLowerCase()) && (environment['AliasURL'].toString().toLowerCase() == aliasUrl.toString().toLowerCase())) {
                                    //Environemt Already In List
                                    document.getElementById('lblError').innerHTML = "Environment already present in list!";
                                    flag = 0;
                                    return false;
                                }
                                else {
                                    //Check for alias
                                    if (environment['AliasURL'].toString().toLowerCase() == aliasUrl.toString().toLowerCase()) {
                                        document.getElementById('lblError').innerHTML = "Duplicate Alias! Please give different Alias.";
                                        flag = 1;
                                        return false;
                                    }

                                    else {
                                        var _environment = { UATEnvironmentURL: actualUrlWithHttp, AliasURL: aliasUrl };
                                        Configuration.UATEnvironment.push(_environment);
                                        flag = 2;
                                    }
                                }
                            });
                        }

                        //alert(flag);

                        if (flag == 2) {
                            if ($('#projectNames').val() != undefined && $('#testPassNames').val() != undefined) {
                                //Code Modified by swapnil kamle on 6-8-2012 

                                if ($('#aliasURL').val().length > 50) {
                                    document.getElementById('lblError').innerHTML = "Alias' length should not exceed 50 characters!";
                                }
                                else {
                                    //Added by HRW for bug 4243
                                    //var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$('#projectNames').val()+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$('#testPassNames').val()+'</Value></Eq><Eq><FieldRef Name="actualURL" /><Value Type="Text">'+actualUrlWithHttp+'</Value></Eq></And></And></Where></Query>';
                                    /* query modified for bug 5786 */
                                    //var query = '<Query><Where><And><Eq><FieldRef Name="ProjectId" /><Value Type="Text">'+$('#projectNames').val()+'</Value></Eq><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+$('#testPassNames').val()+'</Value></Eq><Or><Eq><FieldRef Name="actualURL" /><Value Type="Text">'+actualUrlWithHttp+'</Value></Eq><Eq><FieldRef Name="aliasURL" /><Value Type="Text">'+aliasUrl+'</Value></Eq></Or></And></And></Where></Query>';

                                    if (!($.inArray(actualUrl, Configuration.tempUrls) == -1)) {
                                        document.getElementById('lblError').innerHTML = "Environment already present in list!";
                                    }

                                    else {
                                        var Environment = new Array();
                                        Environment.push({
                                            'Title': '',
                                            'ProjectId': $('#projectNamesVersion').val(),
                                            'TestPassID': $('#testPassNames').val(),
                                            'actualURL': actualUrlWithHttp == '' ? null : actualUrlWithHttp,
                                            'aliasURL': $('#aliasURL').val() == '' ? null : $('#aliasURL').val(),
                                        });


                                        //To form a Parameter to pass it to insert function
                                        var envVariables = '';
                                        envVariables = {

                                            projectId: $('#projectNamesVersion').val(),
                                            testPassId: $('#testPassNames').val(),
                                            actualUrl: actualUrlWithHttp == '' ? null : actualUrlWithHttp,
                                            aliasUrl: $('#aliasURL').val() == '' ? null : $('#aliasURL').val()

                                        };

                                        var result = ServiceLayer.InsertUpdateData('InsertUpdateEnvironment', envVariables, 'Configuration');


                                        //if(result.ID!=undefined && $('#actualURL').val()!=undefined && $('#aliasURL').val()!=undefined)
                                        // {

                                        //temporary
                                        Configuration.EnvronmentNameForEnvironmentID[result.ID] = actualUrlWithHttp + '`' + $('#aliasURL').val();

                                        // }
                                        var markup = '<li>';
                                        markup += '<input class="mslChk" type="checkbox" value="' + result.ID + '"/>';
                                        markup += '<a style="color: blue; padding-left: 6px;" title="' + actualUrlWithHttp + '" href="' + actualUrlWithHttp + '" target="_blank">' + trimText(aliasUrl, 28) + '</a>';
                                        markup += '</li>';
                                        $('#urlboxdiv span').remove();
                                        $('#urlboxdiv').append(markup);
                                        $("#divUrlPopUp").dialog("close");

                                        Configuration.populateEnvironments();

                                    }
                                }
                            }
                        }
                    }
                },
                "Cancel": function () {
                    document.getElementById('lblError').innerHTML = " ";
                    $(this).dialog("close");
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
    AttachmentWebPartFunc: function () {
        $(".ms-attachUploadButtons input:eq(0)").addClass('btnOk');
        $("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
        $("[id$='diidIOSaveItem']").attr("value", "Save");
        $("[id$='diidIOSaveItem']").addClass('btn');
    },

    setPageStateBeforeAttch: function () {
        var attachmentName = $("[title$='AttachmentName']").val();
        var fileName = $("[title$='FileName']").val();
        var projectId = $("[title$='ProjectID']").val();
        var configInfo = projectId + "|" + "tab3" + "|" + "0" + "|" + attachmentName + "|" + fileName;
        Main.setCookie("ConfigPageState", configInfo, null);
    },

    getDoc: function () {

        /////////
        //Read from sql
        var ProjectId = $('#projectForTesterVersion').val();
        //var resultSql = ServiceLayer.GetData("GetConfigurationDocuments", ProjectId, 'Configuration');
        var resultSql = ServiceLayer.GetData("GetConfigurationAttachmentDetails" + "/" + ProjectId, null, "Configuration");
        /////////////

        var arrDoc = new Array();
        /*//var queryDocuments='<Query><OrderBy><FieldRef Name="fileName" Ascending="False" /></OrderBy></Query>';
        //var getDocsItems = Configuration.dmlOperation(queryDocuments,"DocumentCollection");
        var queryDocuments="<Query><Where><Eq><FieldRef Name='ProjectID' /><Value Type='Text'>"+$('#projectForTester').val()+"</Value></Eq></Where><OrderBy><FieldRef Name='ID' Ascending='True' /></OrderBy><ViewFields><FieldRef Name='ID'/><FieldRef Name='FileName'/><FieldRef Name='FileDescription'/></ViewFields></Query>";
        var getDocsItems = Configuration.dmlOperation(queryDocuments,"ConfigureDocuments");
        */

        if ((resultSql != undefined) && (resultSql != null) && (resultSql.length > 0)) {
            for (var i = 0; i < resultSql.length ; i++) {
                var filesHtml = '';
                //var getPath=getDocsItems[i]['filePath'].split(",");
                var getPath = ServiceLayer.serviceURL + "/Configuration/GetConfigurationAttachment/" + resultSql[i]["attachmentId"].toString();
                //resultSql[i]['filePath'].toString();
                var ext = (resultSql[i]['fileName']).split('.').pop();
                filesHtml += '<tr><td>';
                switch (ext) {
                    case "doc":
                    case "docx":
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/icon-word.png"/>';
                        }
                        break;

                    case "xls":
                    case "xlsx":
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/icon-excel.png"/>';
                        }
                        break;

                    case "ppt":
                    case "pptx":
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/icon-powerpoint.png"/>';
                        }
                        break;

                    case "jpg":
                    case "jpeg":
                    case "gif":
                    case "bmp":
                    case "png":
                    case "bmp":
                        {
                            filesHtml += '<img style="vertical-align:middle;" src="/images/image.png"/>';
                        }
                        break;

                    case "pdf":
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/icon-pdf.png"/>';
                        }
                        break;

                    case "msg":
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/outlook.jpg"/>';
                        }
                        break;

                    case "txt":
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/textfileicon.png"/>';
                        }
                        break;


                    default:
                        {
                            filesHtml += '<img style="vertical-align:middle" src="/images/unknown file.jpg"/>';
                        }
                        break;
                }

                var filedesp = resultSql[i]['fileDescription'] == undefined ? 'No Description Available' : resultSql[i]['fileDescription'];
                filedesp = filedesp.replace(/"/g, "&quot;");
                filesHtml += '<a style="padding-left:5px;vertical-align:middle" href="' + getPath + '" title="' + filedesp + '" class="orange" target="_blank" >' + trimText(resultSql[i]['attachmentName'], 60) + '</a></td></tr>';
                arrDoc.push(filesHtml);

            }
        }
        else
        {
            var filesHtml = "<p class='clear'></p><h4>There are no Files Uploaded.</h4>"
            arrDoc.push(filesHtml)
        }

        return arrDoc;
    },
    getServrsFrLogInUser: function () {
        var tempUrls = new Array();
        var projectId = $("#projectForTesterVersion option:selected").val();
        var testPassId = $("#testPassforPrj option:selected").val();

        var getItems = ServiceLayer.GetData('GetEnvironment' +"/"+ projectId + "/" + testPassId,null,'Configuration');

        if ((getItems != undefined) && (getItems != null) && (getItems.length > 0)) {
            var htmlAlert = "";
            for (var i = 0; i < getItems.length; i++) {
                if ($.inArray(getItems[i]['actualUrl'], tempUrls) == -1) {
                    tempUrls.push(getItems[i]['actualUrl']);

                    var actualUrl = '';
                    var aliasUrl = '';

                    actualUrl = getItems[i]['actualUrl'];

                    aliasUrl = getItems[i]['aliasUrl'];

                    htmlAlert += '<a style="color:blue;padding-left:6px" target="_blank" Title=' + actualUrl + ' href="' + actualUrl + '">' + aliasUrl + '</a><br/>';
                }
            }

            //for(var p=0;p<urlArray.length;p++)
            //htmlAlert+='<a style="color:blue;padding-left:4px" href="'+urlArray[p]+'">'+urlArray[p]+'</a><br/>';	
            //htmlAlert+='<a style="color:blue;padding-left:4px" Title='+getItems[i]["UATEnvironmentURL"]+'href="'+urlArray[p]+'">'+urlArray[p]+'</a><br/>';	
            $("#urltextboxdiv").empty();
            $("#urltextboxdiv").html(htmlAlert);
            //urltextboxdiv
        }
        else {
            $("#urltextboxdiv").empty();
            $("#urltextboxdiv").html('<span class="msgSpan">No ' + Configuration.gEnvironmentLabelText + ' Created</span>');
        }

    },

    /*Code for sending mail to ADMIN*/
    sendMail: function () {
        var usersArray = new Array();
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
        usersArray = $('#urltextboxdiv').find('a').toArray();
        if ($('#sendEmailAnchor').attr('href'))
            $("#sendEmailAnchor").removeAttr('href');//code added by nitu to remove href tag while checking new entry on 19 dec 2012

        if (usersArray.length == 0) {
            //Configuration.alertBox('Sorry! No Environment is alloted to you');
            Configuration.alertBox('Sorry! No ' + Configuration.gEnvironmentLabelText + ' is alloted to you');//:SD

        }
        else {
            //	usersArray.push('deepak@rgensolutions.com');
            var adminMailId = "admin@demo.com";
            /* Code by nitu dated 18Dec 2012 to get current user namre for mail request by admin*/
            var MUserID = _spUserId;/* Main.getSiteUser();*/
            MUserID = MUserID.substring(18);
            var mailSubject = "Request For Access to '" + MUserID + "'";  //"Request For Access to 'Url of environment'";  
            var mailBody = "Please provide access to user '" + MUserID + "'  for the following Environments :%0A%0A"; // "Please provide the access to ‘url of environment’ for user "
            if (usersArray != undefined || usersArray != null) {

                for (var y = 0; y < usersArray.length; y++) {
                    mailBody += usersArray[y] + "%0A%0A";
                }
            }
            //mailBody =mailBody .text();
            $("#sendEmailAnchor").attr("href", "mailto:" + adminMailId + "?Subject=" + mailSubject + "&body=" + mailBody.replace(/#/g, "") + "");
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
    startIndexTIncrement: function () {
        if (Configuration.gAttlength > Configuration.startIndex + 5)
            Configuration.startIndex += 5;
    },
    startIndexTDecrement: function () {
        if (Configuration.startIndex > 0)
            Configuration.startIndex -= 5;
    },

    /*grid*/
    tab1Save: function () {
        Configuration.getServrsFrLogInUser();
        Configuration.gridDetails();
        noActHandle();
        initDocPagination();

        /* Added by shilpa for bug 6747 on 13 march */
        if ($('#process table tbody').find('tr').length == 0) {
            Configuration.startIndexTDecrement();
            Configuration.gridDetails();
        }
    },
    getProcesDetailsByProcesDetailsIdConfig: new Array(),

    gridDetails: function () {
        var gridDetails = '<p class="clear"/>' +
            '<table class="gridDetails" cellSpacing="0">' +
                '<thead>' +
                    '<tr class="hoverRow">' +
                        /*'<td style="width: 5%;" class="tblhd center"><span>#</span></td>'+
                        '<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>'+
                        '<td style="width: 10%;" class="tblhd "><span>AS-IS</span></td>'+					
                        '<td style="width: 20%;" class="tblhd"><span>AS-IS Description</span></td>'+
                        '<td style="width: 10%;" class="tblhd "><span>TO-BE</span></td>'+
                        '<td style="width: 20%;" class="tblhd"><span>TO-BE Description</span></td>'+*/
                        //Header text formed as per label text for configurable values from resource xml file//:SD
                        '<td style="width: 5%;" class="tblhd center"><span>#</span></td>' +
                        '<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>' +
                        '<td style="width: 10%;" class="tblhd "><span>AS IS</span></td>' +
                        '<td style="width: 20%;" class="tblhd"><span>AS IS Description</span></td>' +
                        '<td style="width: 10%;" class="tblhd "><span>TO BE</span></td>' +
                        '<td style="width: 20%;" class="tblhd"><span>TO BE Description</span></td>' +
                        //'<td style="width: 10%;" class="tblhd center"><span>Edit Item</span></td>'+
                    '</tr>' +
                '</thead>' +
                '<tbody>';

        var url = Main.getSiteUrl();

        /////Added by Mangesh//////////////////
        var projectId = $('#projectForTesterVersion').val()
        ///////////////////////////////////////						
        /**********************************************************************/

        var result = ServiceLayer.GetData("GetProcessDetail" + "/" + projectId, null, "Configuration");

        var cnt = 0;
        if (result != null && result != undefined && result.length > 0) {
            $('#paging').show();

            var resultLength = result.length;
            Configuration.gAttlength = resultLength;
            if (resultLength >= (Configuration.startIndex + 5))
                Configuration.Ei = Configuration.startIndex + 5;
            else
                Configuration.Ei = resultLength;

            for (var i = Configuration.startIndex; i < Configuration.Ei; i++) {

                //////Added by Mangesh:   fill array by processdetailsId							
                Configuration.getProcesDetailsByProcesDetailsIdConfig = [];
                if (Configuration.getProcesDetailsByProcesDetailsIdConfig[result[i]["processDetailId"]] == undefined) {
                    Configuration.getProcesDetailsByProcesDetailsIdConfig[result[i]["processDetailId"]] = new Array();
                    Configuration.getProcesDetailsByProcesDetailsIdConfig[result[i]["processDetailId"]].push({

                        "asIs": result[i]["asIs"],
                        "asIsDescription": result[i]["asIsDescription"],
                        "toBe": result[i]["toBe"],
                        "toBeDescription": result[i]["toBeDescription"]

                    });
                }


                cnt = i + 1;

                /* Added by shilpa for bug 5605 on 11th March */
                var asIS = result[i]["asIs"].replace(/"/g, "&quot;");
                asIS = asIS.replace(/'/g, '&#39;');
                if (result[i]["asIsDescription"] != null && result[i]["asIsDescription"] != undefined && result[i]["asIsDescription"] != "") {
                    var asISDesc = result[i]["asIsDescription"].replace(/"/g, "&quot;");
                    asISDesc = asISDesc.replace(/'/g, '&#39;');
                }
                var toBe = result[i]["toBe"].replace(/"/g, "&quot;");
                toBe = toBe.replace(/'/g, '&#39;');
                if (result[i]["toBeDescription"] != null && result[i]["toBeDescription"] != undefined && result[i]["toBeDescription"] != "") {
                    var toBeDesc = result[i]["toBeDescription"].replace(/"/g, "&quot;");
                    toBeDesc = toBeDesc.replace(/'/g, '&#39;');
                }

                gridDetails += '<tr>' +
                    '<td class="center">' + cnt + '</td>' +
                    //'<td>'+document.getElementById('projectNamesForProcess').options[document.getElementById('projectNamesForProcess').selectedIndex].title+'</td>'+ // Added by shilpa for bug 5277
                    '<td title="' + $("#projectForTester option:selected").attr('title') + '">' + trimText($("#projectForTester option:selected").attr('title'), 37) + '</td>' +
                    '<td title="' + asIS + '">' + ((result[i]["asIs"] == null || result[i]["asIs"] == undefined) ? "-" : trimText(result[i]["asIs"], 30)) + '</td>' +
                    '<td title="' + ((result[i]["asIsDescription"] == null || result[i]["asIsDescription"] == undefined || result[i]["asIsDescription"] == "") ? "-" : asISDesc) + '">' + ((result[i]["asIsDescription"] == null || result[i]["asIsDescription"] == undefined || result[i]["asIsDescription"] == "") ? "-" : trimText(result[i]["asIsDescription"], 30)) + '</td>' +
                    '<td title="' + toBe + '">' + ((result[i]["toBe"] == null || result[i]["toBe"] == undefined) ? "-" : trimText(result[i]["toBe"], 30)) + '</td>' +
                    '<td title="' + ((result[i]["toBeDescription"] == null || result[i]["toBeDescription"] == undefined || result[i]["toBeDescription"] == "") ? "-" : toBeDesc) + '">' + ((result[i]["toBeDescription"] == null || result[i]["toBeDescription"] == undefined || result[i]["toBeDescription"] == "") ? "-" : trimText(result[i]["toBeDescription"], 30)) + '</td>' +
                    //'<td class="center"><a onclick="Configuration.fillForm('+result[i]["ID"]+')"  title="Edit Process Details"  class="pedit" style="cursor:Pointer"></a>'+
                    //'<a onclick="Configuration.delProcess('+result[i]["ID"]+');" title="Delete process"  class="pdelete" style="cursor:Pointer"></a></td>'+
                '</tr>';
            }
            gridDetails += '</tbody>' +
                        '</table>';

            $("#process").html(gridDetails);
            resource.UpdateTableHeaderText();//:SD
            var info = '<label>Showing ' + (Configuration.startIndex + 1) + '-' + Configuration.Ei + ' Processes of Total ' + (result).length + ' Processes </label> | <a id="previous" style="cursor:pointer" onclick="Configuration.startIndexTDecrement();Configuration.gridDetails()">Previous</a> | <a  id="next" style="cursor:pointer" onclick="Configuration.startIndexTIncrement();Configuration.gridDetails()">Next</a>';
            $('#paging').empty();
            $("#paging").append(info);

            if (Configuration.startIndex <= 0) {
                document.getElementById('previous').disabled = "disabled";
                document.getElementById('previous').style.color = "#989898";
            }
            else
                document.getElementById('previous').disabled = false;

            if (resultLength <= ((Configuration.startIndex) + 5)) {
                document.getElementById('next').disabled = "disabled";
                document.getElementById('next').style.color = "#989898";
            }
            else
                document.getElementById('next').disabled = false;
        }
        else {
            $("#process").empty();
            //$("#process").append("<p class='clear'></p><h3>There are no Processes.</h3>");
            $("#process").append("<p class='clear'></p><span class='msgSpan'>No Processes Available</span>");
            $('#paging').hide();
        }
    },

    /* Function to get result of query by passing query and name of list */
    dmlOperation: function (search, list) {
       /* var listname = jP.Lists.setSPObject(Configuration.SiteURL, list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        return (result);*/
        return [];
    },

    //code added on 16 March Application URL related code//
    fUrlPopUp: function () {
        $("#dialog:ui-dialog").dialog("destroy");
        $("#divUrlPopUp").dialog("open");

        $("#actualURL").val('');
        $("#aliasURL").val('');
    },

    fUrlPopUpUpdate: function () {
        if ($("#urlboxdiv li").find(":checked").length == 0) {
            //Configuration.alertBox("Select the Environment first!");
            Configuration.alertBox("Select the " + Configuration.gEnvironmentLabelText + " first!");//:SD
        }
        else if ($("#urlboxdiv li").find(":checked").length > 1) {
            //Configuration.alertBox("Select one Environment at a time!");
            Configuration.alertBox("Select one " + Configuration.gEnvironmentLabelText + " at a time!");//:SD
        }
        else {
            $("#dialog:ui-dialog").dialog("destroy");
            $("#divUrlPopUpUpdate").dialog("open");

        }
        //$("#actualURLUpdate").val('');
        //$("#aliasURLUpdate").val('');
    },


    populateTestPass: function () {
        /////////////////Added By Mangesh
        var tpItems = Configuration.getTestPassIdByProjectId[$("#projectNamesVersion option:selected").val()];
        $('#testPassNames').empty();
        var tempTestPassArr = new Array();
        if ((tpItems != undefined) && (tpItems != null)) {
            for (var ii = 0; ii < tpItems.length ; ii++) {
                if ($.inArray(tpItems[ii].testpassName, tempTestPassArr) == -1) {
                    tempTestPassArr.push(tpItems[ii].testpassName);
                    temp = '<option title="' + tpItems[ii].testpassName + '" value="' + tpItems[ii].testpassId + '">' + trimText(tpItems[ii].testpassName.toString(), 50) + '</option>';
                    $("#testPassNames").append(temp);
                }
            }
        }
        else /* Added by shilpa for bug 5145 */ {

            /*****Added by Mohini for resource file*****/
            $("#testPassNames").html('<option value="0">No ' + Configuration.gConfigTestPass + ' Available</option>');

        }

        //////////////

    },

    GSProjectChange: function () {

        ///////////////////////Added By Mangesh//////////////////////////////
        if (Configuration.isPortfolioOn) {
            var tempVerArrFTS = new Array();
            if ($('#projectForGS option:selected').text() == "Select " + Configuration.gConfigProject) {
                $("#ProjectForGSVersion").html("<option>Select " + Configuration.gConfigVersion + "</option>");
                $("#tpForGS").html("<option>Select " + Configuration.gConfigTestPass + "</option>");
            }
            else {
                //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                var data = Configuration.getVerByProjName[$('#projectForGS option:selected').attr('title')];
                var NoOfVer = 0;
                if (data != undefined)
                    NoOfVer = data.length;

                var verOptions = '';
                tempVerArrFTS = [];

                for (var i = 0; i < NoOfVer; i++) {

                    if ($.inArray(data[i].projectVersion, tempVerArrFTS) == -1) {
                        tempVerArrFTS.push(data[i].projectVersion);

                        verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                    }
                }

                if (verOptions == "")
                    verOptions = '<option >Default ' + Configuration.gConfigVersion + '</option>';

                $("#projectForGSVersion").html(verOptions);
                //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014

            }
        }
        //////////////////////////////////////		

    },

    GSVersionChange: function () {
        if ($('#projectForGSVersion option:selected').val() != "" && $('#projectForGSVersion option').length > 1) {
            $("#projectForGS option:selected").val($('#projectForGSVersion option:selected').val());
            Configuration.populateTPForGS();
            Configuration.getGSSettings();
        }

    },

    USProjectChange: function () {

        ///////////////////////Added By Mangesh//////////////////////////////
        if (Configuration.isPortfolioOn) {
            var tempVerArrFTS = new Array();
            if ($('#projectNames option:selected').text() == "Select " + Configuration.gConfigProject) {
                $("#projectNamesVersion").html("<option>Select " + Configuration.gConfigVersion + "</option>");
                $("#testPassNames").html("<option>Select " + Configuration.gConfigTestPass + "</option>");
            }
            else {
                //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                var data = Configuration.getVerByProjName[$('#projectNames option:selected').attr('title')];
                var NoOfVer = 0;
                if (data != undefined)
                    NoOfVer = data.length;

                var verOptions = '';
                tempVerArrFTS = [];

                for (var i = 0; i < NoOfVer; i++) {

                    if ($.inArray(data[i].projectVersion, tempVerArrFTS) == -1) {
                        tempVerArrFTS.push(data[i].projectVersion);

                        verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                    }
                }

                if (verOptions == "")
                    verOptions = '<option >Default ' + Configuration.gConfigVersion + '</option>';

                $("#projectNamesVersion").html(verOptions);
                //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014

            }
        }
        //////////////////////////////////////						
    },

    USVersionChange: function () {
        if ($('#projectNamesVersion option:selected').val() != "" && $('#projectNamesVersion option').length > 1) {
            $("#projectNames option:selected").val($('#projectNamesVersion option:selected').val());
            Configuration.clearFields(); Configuration.populateTestPass(); Configuration.populateEnvironments(); Configuration.resetAddModeUserSetting();
        }

    },

    DLProjectChange: function () {

        ///////////////////////Added By Mangesh//////////////////////////////
        if (Configuration.isPortfolioOn) {
            var tempVerArrFTS = new Array();
            if ($('#projectForFileUpload option:selected').text() == "Select " + Configuration.gConfigProject) {
                $("#projectForFileUploadVersion").html("<option>Select " + Configuration.gConfigVersion + "</option>");

            }
            else {
                var data = '';
                //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014

                if (Configuration.prjID == "") {
                    data = Configuration.getVerByProjName[$('#projectForFileUpload option:selected').attr('title')];
                }
                else {
                    var projname = Configuration.getProjectNameByID[Configuration.prjID];

                    //$("#projectForFileUpload [value='"+Configuration.prjID+"']").attr("selected","selected");
                    $("#projectForFileUpload [title='" + projname[0].projectName + "']").attr("selected", "selected");

                    data = Configuration.getVerByProjName[projname[0].projectName];
                }
                var NoOfVer = 0;
                if (data != undefined)
                    NoOfVer = data.length;

                var verOptions = '';
                tempVerArrFTS = [];

                for (var i = 0; i < NoOfVer; i++) {

                    if ($.inArray(data[i].projectVersion, tempVerArrFTS) == -1) {
                        tempVerArrFTS.push(data[i].projectVersion);

                        verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                    }
                }


                if (verOptions == "")
                    verOptions = '<option >Default ' + Configuration.gConfigVersion + '</option>';

                $("#projectForFileUploadVersion").html(verOptions);

                if (Configuration.prjID != "") {
                    $("#projectForFileUploadVersion [value='" + Configuration.prjID + "']").attr("selected", "selected");
                }
                //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014

            }
        }
        //////////////////////////////////////		

    },

    DLVersionChange: function () {
        if ($('#projectForFileUploadVersion option:selected').val() != "" && $('#projectForFileUploadVersion option').length > 1) {
            $("#projectForFileUpload option:selected").val($('#projectForFileUploadVersion option:selected').val());
            Configuration.bindUploadedFileGrid();
        }

    },

    PDProjectChange: function () {

        ///////////////////////Added By Mangesh//////////////////////////////
        if (Configuration.isPortfolioOn) {
            var tempVerArrFTS = new Array();
            if ($('#projectNamesForProcess option:selected').text() == "Select " + Configuration.gConfigProject) {
                $("#projectNamesForProcessVersion").html("<option>Select " + Configuration.gConfigVersion + "</option>");

            }
            else {
                //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                var data = Configuration.getVerByProjName[$('#projectNamesForProcess option:selected').attr('title')];
                var NoOfVer = 0;
                if (data != undefined)
                    NoOfVer = data.length;

                var verOptions = '';
                tempVerArrFTS = [];

                for (var i = 0; i < NoOfVer; i++) {

                    if ($.inArray(data[i].projectVersion, tempVerArrFTS) == -1) {
                        tempVerArrFTS.push(data[i].projectVersion);

                        verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                    }
                }

                if (verOptions == "")
                    verOptions = '<option >Default ' + Configuration.gConfigVersion + '</option>';

                $("#projectNamesForProcessVersion").html(verOptions);
                //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014

            }
        }
        //////////////////////////////////////		

    },

    PDVersionChange: function () {
        if ($('#projectNamesForProcessVersion option:selected').val() != "" && $('#projectNamesForProcessVersion option').length > 1) {
            $("#projectNamesForProcess option:selected").val($('#projectNamesForProcessVersion option:selected').val());
            Configuration.clearProcessFields(); Configuration.gridDetailsForProcess();
        }

    },

    forTPIDGetAutoAprv: new Array(),
    forTPIDGetChoiceForName: new Array(),
    forTPIDGetTestingType: new Array(),
    forTPIDGetfeedbackRating: new Array(),
    populateTPForGS: function () {

        /////////////////Added By Mangesh
        var tpItems = Configuration.getTestPassIdByProjectId[$("#projectForGSVersion option:selected").val()];
        $('#tpForGS').empty();
        var tempTestPassArr = new Array();
        if ((tpItems != undefined) && (tpItems != null)) {
            for (var ii = 0; ii < tpItems.length ; ii++) {
                if ($.inArray(tpItems[ii].testpassName, tempTestPassArr) == -1) {
                    tempTestPassArr.push(tpItems[ii].testpassName);
                    temp = '<option title="' + tpItems[ii].testpassName + '" value="' + tpItems[ii].testpassId + '">' + trimText(tpItems[ii].testpassName.toString(), 50) + '</option>';
                    $("#tpForGS").append(temp);
                }
            }
        }
        else /* Added by shilpa for bug 5145 */ {

            /*****Added by Mohini for resource file*****/
            $("#tpForGS").html('<option value="0">No ' + Configuration.gConfigTestPass + ' Available</option>');

        }

        Configuration.getGSSettings();
        ///////////////////		

    },
    settingData: new Array(),
    testPassDDChange: function () {

        Configuration.getGSSettings();

    },

    getGSSettings: function () {
        ////////////////Added By Mangesh for existing configuration values for General setting
        Configuration.settingData = [];

        var tpId = $("#tpForGS option:selected").val();
        Configuration.settingData = ServiceLayer.GetData("GetGeneralSetting" +"/"+ tpId, null, "Configuration");


        if (Configuration.settingData.testStepUnique == "Y")
            $("#TSNameConstraint1").attr('checked', true);
        else if (Configuration.settingData.testStepUnique == "N" || Configuration.settingData.testStepUnique == "")
            $("#TSNameConstraint0").attr('checked', true);

        if (Configuration.settingData.testingType == "2")
            $("#testingType2").attr('checked', true);
        else if (Configuration.settingData.testingType == "1")
            $("#testingType1").attr('checked', true);
        else if (Configuration.settingData.testingType == "0" || Configuration.settingData.testingType == "")
            $("#testingType0").attr('checked', true);

        if (Configuration.settingData.feedbackType == "2")
            $("#feedbackRating2").attr('checked', true);
        else if (Configuration.settingData.feedbackType == "1")
            $("#feedbackRating1").attr('checked', true);
        else if (Configuration.settingData.feedbackType == "0" || Configuration.settingData.feedbackType == "")
            $("#feedbackRating0").attr('checked', true);
    },

    configRolesArray: new Array(),
    createMultiSelectList: function (divID, height) {
        var divhtml = "";
        var divhtml = "<div class='Mediumddl' style='border: solid 1px #ccc;  width:inherit; padding-left:1px;'>" +

                    "<ul id='ulItems" + divID + "' style='list-style-type:none; list-style-position:outside;display:inline;'>" +
                        "<li>Select:&nbsp;<a id='linkSA_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\"" + divID + "\");'>All</a>" +
                             "&nbsp;&nbsp;&nbsp;<a id='linkSN_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\"" + divID + "\");'>None</a>" +
                             "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\"" + divID + "\");" + multiSelectList.functionToInvoke + "'>Selected</a></li>" +
                        "<li><hr/></li>" +
                        "<div style='overflow-y:scroll; height:" + height + " width:inherit'>";

        var itemId = divID + "_1";
        divhtml = divhtml + "<li title='Standard'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked'></input><span id='" + itemId + "' style=\"display: none;\">Standard</span>Standard</li>";
        divhtml += "</div></ul></div>";
        $("#" + divID).html(divhtml);
    },
    saveGS: function () {

        //var generalSetting=new Array();
        var flag = '';
        var testStepUnique = '';
        var testingType = '';
        var feedbackType = '';
        var testPassId = '';

        if ($("#tpForGS").val() == 0)
            //Configuration.alertBox('No Test Pass present!');
            Configuration.alertBox('No ' + Configuration.gConfigTestPass + ' present!');//:SD
        else {
            ////////////Added by Mangesh
            testPassId = $("#tpForGS option:selected").val();
            testingType = $("input[name='testingType']:checked").val();
            feedbackType = $("input[name='feedbackRating']:checked").val();
            flag = $("input[name='TSNameConstraint']:checked").val();
            if (flag == "1")
                testStepUnique = "Y";
            else if (flag == "0")
                testStepUnique = "N";


            var generalSetting = { feedbackType: feedbackType, testingType: testingType, testPassId: testPassId, testStepUnique: testStepUnique }

            //var odata = {feedbackType: "1", testingType: "1", testPassId: "3022", testStepUnique: "Y"}
            //ServiceLayer.InsertUpdateData('UpdateGSConfig',odata)			

            var status = ServiceLayer.InsertUpdateData('UpdateGSConfig', generalSetting, "Configuration");
            if (status.ErrorDetails != undefined) {
                Configuration.alertBox('General Settings have been configured successfully!');
                return;
            }

            if (status.Success != undefined) {
                if (status.Success == "Done") {
                    Configuration.alertBox('General Settings have been configured successfully!');

                }
                else {
                    Configuration.alertBox("Testing is already begun for selected " + Configuration.gConfigTestPass + " so you won't be able to change 'Testing Type' and 'Feedback Rating Option'!");
                    Configuration.resetGS();
                }
            }

            /////////////////////

        }

        Main.hideLoading();
    },
    resetGS: function () {
        //$('input[id="portfolioOption'+Configuration.gPortfolio+'"]').attr('checked','checked');

        //Added by Mangesh


        if (Configuration.settingData.testStepUnique == "Y")
            $("#TSNameConstraint1").attr('checked', true);
        else if (Configuration.settingData.testStepUnique == "N" || Configuration.settingData.testStepUnique == "")
            $("#TSNameConstraint0").attr('checked', true);

        if (Configuration.settingData.testingType == "2")
            $("#testingType2").attr('checked', true);
        else if (Configuration.settingData.testingType == "1")
            $("#testingType1").attr('checked', true);
        else if (Configuration.settingData.testingType == "0" || Configuration.settingData.testingType == "")
            $("#testingType0").attr('checked', true);

        if (Configuration.settingData.feedbackType == "2")
            $("#feedbackRating2").attr('checked', true);
        else if (Configuration.settingData.feedbackType == "1")
            $("#feedbackRating1").attr('checked', true);
        else if (Configuration.settingData.feedbackType == "0" || Configuration.settingData.feedbackType == "")
            $("#feedbackRating0").attr('checked', true);
    },

    editEnvironment: function () {
        //btnDiv
        if ($("#urlboxdiv li").find(":checked").length == 0) {
            //Configuration.alertBox("Select the Environment first!");
            Configuration.alertBox("Select the " + Configuration.gEnvironmentLabelText + " first!");//:SD
        }
        else if ($("#urlboxdiv li").find(":checked").length > 1) {
            //Configuration.alertBox("Select one Environment at a time!");
            Configuration.alertBox("Select one " + Configuration.gEnvironmentLabelText + " at a time!");//:SD
        }
        else {
            $("#urlboxdiv li").each(function () {
                if ($(this).children(".mslChk").attr('checked') == true) {
                    EnvironmentID = $(this).children(".mslChk").attr('value');
                }
                if (EnvironmentID != undefined) {
                    //var deleteEnvironment=jP.Lists.setSPObject(Configuration.SiteURL,'Environment');
                    //var deletedata = deleteEnvironment.deleteItem(EnvironmentID);
                    //Configuration.alertBox("Environment Deleted Successfully");

                }
            }
            )
        }

    },
    deleteEnvironment: function () {
        //btnDiv
        var EnvironmentID;
        if ($("#urlboxdiv li").find(":checked").length == 0) {
            //Configuration.alertBox("Select the Environment first!");
            Configuration.alertBox("Select the " + Configuration.gEnvironmentLabelText + " first!");
            Configuration.resetUserSettingInEditMode();

        }
        else if ($("#urlboxdiv li").find(":checked").length > 1) {
            //Configuration.alertBox("Select one Environment at a time!");
            Configuration.alertBox("Select one " + Configuration.gEnvironmentLabelText + " at a time!");
            Configuration.resetUserSettingInEditMode();
        }
        else {
            $("#urlboxdiv li").each(function () {
                if ($(this).children(".mslChk").attr('checked') == true) {
                    EnvironmentID = $(this).children(".mslChk").attr('value');
                }
                if (EnvironmentID != undefined) {
                    //var deleteEnvironment=jP.Lists.setSPObject(Configuration.SiteURL,'Environment');
                    if ($.inArray(EnvironmentID, Configuration.globalEnvironmentId) == -1) {
                        //DeleteEnvironment(string envID)
                        var deletedata = ServiceLayer.DeleteData("DeleteEnvironment" + "/" + EnvironmentID,null,"Configuration");
                       // if (deletedata.length > 0) {
                            if (deletedata.Success != undefined && deletedata.Success == "Done") {
                                //Configuration.alertBox("Environment Deleted Successfully");
                                Configuration.alertBox(Configuration.gEnvironmentLabelText + " Deleted Successfully");//:SD
                            }
                        //}
                        Configuration.populateEnvironments();
                    }
                    else {
                        //Configuration.alertBox("Environment is associated with tester You Cannot delete the Environment!");
                        Configuration.alertBox(Configuration.gEnvironmentLabelText + " is associated with tester You Cannot delete the " + Configuration.gEnvironmentLabelText + "!");//:SD
                        //Configuration.resetUserSettingInEditMode();
                    }
                }
            }
            )
        }

        Main.hideLoading();
    },
    tempUrls: new Array(),
    Evironmenturl: new Array(),

    populateEnvironments: function () {
        //Code Modified by swapnil kamle on 6-8-2012

        Configuration.Evironmenturl = [];
        Configuration.EnvronmentNameForEnvironmentID = [];

        var projectId = $("#projectNamesVersion option:selected").val();
        var testPassId = $("#testPassNames option:selected").val();

        Configuration.Evironmenturl = ServiceLayer.GetData('GetEnvironment' + "/" + projectId + "/" + testPassId, null, "Configuration");
        var markup = '';
        Configuration.tempUrls = [];
        if (Configuration.Evironmenturl != undefined && Configuration.Evironmenturl.length > 0) {
            for (var i = 0; i <= Configuration.Evironmenturl.length - 1; i++) {
                if (Configuration.Evironmenturl[i]['actualUrl'] != "") {

                    if ($.inArray(Configuration.Evironmenturl[i]['actualUrl'], Configuration.tempUrls) == -1) {
                        Configuration.EnvronmentNameForEnvironmentID[Configuration.Evironmenturl[i]['envID']] = Configuration.Evironmenturl[i]['actualUrl'] + '`' + Configuration.Evironmenturl[i]['aliasUrl'];

                        Configuration.tempUrls.push(Configuration.Evironmenturl[i]['actualUrl']);

                        markup += '<li>';
                        markup += '<input class="mslChk" type="checkbox" value="' + Configuration.Evironmenturl[i]['envID'] + '"/>';//change alias url to in trim text Evironmenturl[0]
                        markup += '<a style="color: blue; padding-left: 6px;" title="' + Configuration.Evironmenturl[i]['actualUrl'] + '" href="' + Configuration.Evironmenturl[i]['actualUrl'] + '" target="_blank">' + trimText(Configuration.Evironmenturl[i]['aliasUrl'], 28) + '</a>';
                        markup += '</li>';
                    }
                }
            }
            $('#urlboxdiv span').remove();
            $('#urlboxdiv').empty();
            $('#urlboxdiv').append(markup);
        }
        else {
            $('#urlboxdiv span').remove();
            $('#urlboxdiv').empty();
            // $("#urlboxdiv").html('<span>No Environment Created</span>');
            $("#urlboxdiv").html('<span>No ' + Configuration.gEnvironmentLabelText + ' Created</span>');//added by Mohini for bug 10741(related to resource file)

        }

    },
    saveUATEnvironment: function () {
        var _selectedEnvArray = new Array();

        if (Configuration.validateUATEnvironment()) {
            //Main.showLoading();

            //Get project related information
            var _projectID = 1;
            var _projectName;

            //Get Test Pass related information
            var _testPassId = 1;
            var _testPassName;

            //User Setting array to store array of Usersetting List Items
            var _userSetting = new Array();
            var EnvironmentID = '';

            //Code Modified by swapnil kamle on 7-8-2012
            //Array of selected users(testers)
            var _selectedUserArray = new Array();
            Configuration.SelectedUserArryRequest.length = 0;
            $("div#userList input.mslChk:checked").each(function () {
                _selectedUserArray.push({ ID: $(this).attr('id'), Name: $(this).siblings('span').html() });
                /*edited by nitu on 18 dec 2012*/
                Configuration.SelectedUserArryRequest.push($(this).siblings('span').html());

            });

            //For each tester associating UAT environment
            //	$.each(_selectedUserArray,function(i,user){			                       
            $("#urlboxdiv li").each(function () {
                if ($(this).children(".mslChk").attr('checked') == true) {
                    EnvironmentID += $(this).children(".mslChk").attr('value') + '|';
                    _selectedEnvArray.push({ "envID": $(this).children(".mslChk").attr('value') });
                }
                if (EnvironmentID != undefined) {


                }
            }
            );


            //To form the string in the proper format to insert the data
            //format: ENVID~USERID#ENVID~USERID#ENVID~USERID#ENVID~USERID#ENVID~USERID 
            var str = '';
            for (var i = 0; i < _selectedUserArray.length; i++) {
                if (i != 0) {
                    str += "#";
                }
                for (var j = 0; j < _selectedEnvArray.length; j++) {
                    if (j != 0) {
                        str += "#";
                    }
                    str += _selectedEnvArray[j].envID + "~" + _selectedUserArray[i].ID;

                }
            }


            //UserSetting variable formation
            var projectId = $("#projectNamesVersion option:selected").val();
            var testPassId = $("#testPassNames option:selected").val();

            var userSetting =
            {
                projectId: projectId,
                testPassId: testPassId,
                UserSettingString: str
            };


            //Saving Bulk Items in list
            var _result = ServiceLayer.InsertUpdateData("InsertUserSetting", userSetting,"Configuration");
            if (_result.Success != undefined && _result.Success == "Done") {
                    Configuration.alertSuccessfullUserSetting('User Setting saved successfully!');
            }
            
            Main.hideLoading();
        }

        Configuration.CheckMode = true;
        Configuration.resetAddModeUserSetting();
        Main.hideLoading();

    },
    userSettingString: '',
    bindUserSettingGrid: function () {

        //Get Test Pass related information
        Configuration.globalEnvironmentId = new Array();
        Configuration.UserSettingList = new Array();

        //Call the function which forms the array for user setting grid	
        Configuration.UserSettingArray();

        for (var ii = 0; ii < Object.keys(Configuration.getUSByTesterId).length; ii++) {
            Configuration.userSettingString = '';
            var environment = new Array();
            var environmentHTML = '';
            var IDs = new Array();
            var EnvironmentIDs = new Array();
            var settings = new Array();
            var userSettingIDs = new Array();
            var temp = new Array();
            var testerId = Configuration.getUStesterId[ii];
            temp = Configuration.getUSByTesterId[testerId][0]["envId"];
            //temp.splice(temp.length-1,1);
            $.merge(EnvironmentIDs, temp);
            userSettingIDs.push(Configuration.getUSByTesterId[testerId][0]["userSettingId"]);
            $.merge(Configuration.globalEnvironmentId, EnvironmentIDs);

            $.merge(IDs, userSettingIDs);
            for (var i = 0; i < EnvironmentIDs.length - 1; i++) {
                environment.push({ UATEnvironment: Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[0], AliasURL: Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[1] });
                //environment.push({UATEnvironment:Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split("`")[0],AliasURL:Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1],ID:userSettingIDs[i]});

                environmentHTML += '<a href="' + Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[0] + '" target="_blank">' + Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[1] + '</a>,&nbsp;&nbsp;';
                //environmentHTML += '<a href="'+ Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0] +'" target="_blank">'+ Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1]+'</a>,&nbsp;&nbsp;';
            }
            environment.push({ UATEnvironment: Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[0], AliasURL: Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[1] });
            //environment.push({UATEnvironment:Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0],AliasURL:Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1],ID:userSettingIDs[i]});

            environmentHTML += '<a href="' + Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[0] + '" target="_blank">' + Configuration.EnvronmentNameForEnvironmentID[EnvironmentIDs[i]].split("`")[1] + '</a>&nbsp;&nbsp;';
            //environmentHTML += '<a href="'+ Configuration.EnvronmentNameForEnvironmentID[ EnvironmentIDs[i]].split('`')[0] +'" target="_blank">'+ Configuration.EnvronmentNameForEnvironmentID [ EnvironmentIDs[i] ].split('`')[1]+'</a>&nbsp;&nbsp;';

            for (var j = 0; j < IDs[0].length; j++) {
                if (j != 0)
                    Configuration.userSettingString += "|";

                Configuration.userSettingString += IDs[0][j];
            }

            Configuration.UserSettingList.push({ SPUserID: Configuration.getUSByTesterId[testerId][0]['userId'], TesterFullName: Configuration.getUSByTesterId[testerId][0]['userName'], Environment: environment, EnvironmentHTML: environmentHTML, IDs: Configuration.userSettingString });
        }


        // Bellow code edited by Ekta
        $.each(Configuration.UserSettingList, function (i, userSetting) {
            //Hide Tester From User List
            if (Configuration.CheckMode == true) {
                Configuration.hideUserFronUsersList(userSetting['SPUserID']);
            }
        });  // Till here

        if (Configuration.UserSettingList.length != 0) {

            $('#userSettingsPaginf').show();

            var gridDetails = '<p class="clear"/>' +
			'<table class="gridDetails" cellSpacing="0">' +
			'<thead>' +
				'<tr class="hoverRow">' +
					//'<td style="width: 20%;" class="tblhd "><span>User</span></td>'+
					'<td style="width: 20%;" class="tblhd "><span>User(s)</span></td>' +//:SD
					'<td style="width: 20%;" class="tblhd "><span>UAT Environment</span></td>' +
					'<td style="width: 8%;" class="tblhd center"><span>Edit Item</span></td>' +
				'</tr>' +
			'</thead>' +
			'<tbody>';


            var resultLengthApp = Configuration.UserSettingList.length;
            Configuration.gAttlengthApp = resultLengthApp;
            if (resultLengthApp >= (Configuration.startIndexApp + 5))
                Configuration.EiApp = Configuration.startIndexApp + 5;
            else
                Configuration.EiApp = resultLengthApp;

            var cnt = 0;
            for (var i = Configuration.startIndexApp; i < Configuration.EiApp; i++) {
                cnt++;
                //Hide Tester From User List
                if (Configuration.CheckMode == true) {
                    Configuration.hideUserFronUsersList(Configuration.UserSettingList[i]['SPUserID']);
                }

                gridDetails += '<tr>' +
                        '<td>' + Configuration.UserSettingList[i]['TesterFullName'] + '</td>' +
                        '<td> ' + Configuration.UserSettingList[i]['EnvironmentHTML'] + '</td>' +
                        '<td class="center"><a onclick="Configuration.editUserSetting(' + Configuration.UserSettingList[i]['SPUserID'] + ')"  title="Edit user Setting"  class="pedit" style="cursor:Pointer"></a>' +
                        '<a onclick="Configuration.deleteUserSetting(' + Configuration.UserSettingList[i]['SPUserID'] + ');" title="Delete user setting"  class="pdelete" style="cursor:Pointer"></a></td>' +
                    '</tr>';
            }

            gridDetails += '</tbody></table>';
            $("#userSettingGrid").html(gridDetails);

            resource.UpdateTableHeaderText();//:SD

            var info = '<label>Showing ' + (Configuration.startIndexApp + 1) + '-' + Configuration.EiApp + ' User Setting(s) of Total ' + Configuration.UserSettingList.length + ' User Setting(s) </label> | <a id="previousApp" style="cursor:pointer" onclick="Configuration.startIndexTDecrementApp();Configuration.bindUserSettingGridFromBuffer()">Previous</a> | <a  id="nextApp" style="cursor:pointer" onclick="Configuration.startIndexTIncrementApp();Configuration.bindUserSettingGridFromBuffer()">Next</a>';
            $('#userSettingsPaginf').empty();
            $("#userSettingsPaginf").append(info);


            if (Configuration.startIndexApp <= 0) {
                document.getElementById('previousApp').disabled = "disabled";
                document.getElementById('previousApp').style.color = "#989898";
            }
            else
                document.getElementById('previousApp').disabled = false;

            if (resultLengthApp <= ((Configuration.startIndexApp) + 5)) {
                document.getElementById('nextApp').disabled = "disabled";
                document.getElementById('nextApp').style.color = "#989898";
            }
            else
                document.getElementById('nextApp').disabled = false;

        }
        else {
            $("#userSettingGrid").empty();
            $("#userSettingGrid").append("<p class='clear'></p><h3>There are no User Setting.</h3>");

            $('#userSettingsPaginf').hide();
        }

    },
    getUSByTesterId: new Array(),
    getUStesterId: new Array(),

    //Formation of Array for user setting grid
    UserSettingArray: function () {
        Configuration.getUStesterId = [];
        Configuration.getUSByTesterId = [];

        var projectId = $("#projectNamesVersion option:selected").val();
        var testPassId = $("#testPassNames option:selected").val();
        var j = 0;

        var _userSetting = ServiceLayer.GetData("GetUserSetting" + "/" + projectId + "/" + testPassId, null, "Configuration");

        if (_userSetting != undefined) {
            for (var i = 0; i < _userSetting.length; i++) {

                if (Configuration.getUSByTesterId[_userSetting[i].userId] == undefined) {
                    Configuration.getUSByTesterId[_userSetting[i].userId] = new Array();
                    Configuration.getUSByTesterId[_userSetting[i].userId].push({

                        "envId": new Array(),

                        "userId": _userSetting[i].userId,

                        "userName": _userSetting[i].userName,

                        "userSettingId": new Array()

                    });
                    Configuration.getUSByTesterId[_userSetting[i].userId][0].envId.push(_userSetting[i].envId);
                    Configuration.getUSByTesterId[_userSetting[i].userId][0].userSettingId.push(_userSetting[i].userSettingId);

                    Configuration.getUStesterId[j] = _userSetting[i].userId;
                    j++;
                }
                else {
                    //var index=Configuration.getUSByTesterId[_userSetting[i].userId].length;
                    Configuration.getUSByTesterId[_userSetting[i].userId][0].envId.push(_userSetting[i].envId);
                    Configuration.getUSByTesterId[_userSetting[i].userId][0].userSettingId.push(_userSetting[i].userSettingId);
                }
            }
        }
    },
    bindUserSettingGridFromBuffer: function () {
        $('#userSettingsPaginf').show();

        var gridDetails = '<p class="clear"/>' +
        '<table class="gridDetails" cellSpacing="0">' +
        '<thead>' +
            '<tr class="hoverRow">' +
                '<td style="width: 20%;" class="tblhd "><span>User</span></td>' +
                '<td style="width: 20%;" class="tblhd "><span>UAT Environment</span></td>' +
                '<td style="width: 8%;" class="tblhd center"><span>Edit Item</span></td>' +
            '</tr>' +
        '</thead>' +
        '<tbody>';


        var resultLengthApp = Configuration.UserSettingList.length;
        Configuration.gAttlengthApp = resultLengthApp;
        if (resultLengthApp >= (Configuration.startIndexApp + 5))
            Configuration.EiApp = Configuration.startIndexApp + 5;
        else
            Configuration.EiApp = resultLengthApp;

        for (var i = Configuration.startIndexApp; i < Configuration.EiApp; i++) {


            //Hide Tester From User List
            if (Configuration.CheckMode == true) {
                Configuration.hideUserFronUsersList(Configuration.UserSettingList[i]['SPUserID']);
            }

            gridDetails += '<tr>' +
                    '<td>' + Configuration.UserSettingList[i]['TesterFullName'] + '</td>' +
                    '<td> ' + Configuration.UserSettingList[i]['EnvironmentHTML'] + '</td>' +
                    '<td class="center"><a onclick="Configuration.editUserSetting(' + Configuration.UserSettingList[i]['SPUserID'] + ')"  title="Edit user Setting"  class="pedit" style="cursor:Pointer"></a>' +
                    '<a onclick="Configuration.deleteUserSetting(' + Configuration.UserSettingList[i]['SPUserID'] + ');" title="Delete user setting"  class="pdelete" style="cursor:Pointer"></a></td>' +
                '</tr>';

        }

        gridDetails += '</tbody></table>';
        $("#userSettingGrid").html(gridDetails);

        var info = '<label>Showing ' + (Configuration.startIndexApp + 1) + '-' + Configuration.EiApp + ' User Setting(s) of Total ' + Configuration.UserSettingList.length + ' User Setting(s) </label> | <a id="previousApp" style="cursor:pointer" onclick="Configuration.startIndexTDecrementApp();Configuration.bindUserSettingGridFromBuffer()">Previous</a> | <a  id="nextApp" style="cursor:pointer" onclick="Configuration.startIndexTIncrementApp();Configuration.bindUserSettingGridFromBuffer()">Next</a>';
        $('#userSettingsPaginf').empty();
        $("#userSettingsPaginf").append(info);


        if (Configuration.startIndexApp <= 0) {
            document.getElementById('previousApp').disabled = "disabled";
            document.getElementById('previousApp').style.color = "#989898";
        }
        else
            document.getElementById('previousApp').disabled = false;

        if (resultLengthApp <= ((Configuration.startIndexApp) + 5)) {
            document.getElementById('nextApp').disabled = "disabled";
            document.getElementById('nextApp').style.color = "#989898";
        }
        else
            document.getElementById('nextApp').disabled = false;


    },

    startIndexTIncrementApp: function () {
        Configuration.CheckMode = false;
        if (Configuration.gAttlengthApp > Configuration.startIndexApp + 5)
            Configuration.startIndexApp += 5;
    },
    startIndexTDecrementApp: function () {
        Configuration.CheckMode = false;

        if (Configuration.startIndexApp > 0)
            Configuration.startIndexApp -= 5;
    },

    editUserSetting: function (userID) {
        //Main.showLoading();

        $('#aliasURLUpdate').val('');
        $('#actualURLUpdate').val('');
        $('#aliasURL').val('');
        $('#actualURL').val('');

        //document.getElementById('userSettingID').value=userSettingID ;

        //$("#testerID").val(userID);
        Configuration.globalUserID = userID;
        var userName = '';
        $.each(Configuration.UserSettingList, function (i, userSetting) {
            if (userID == userSetting['SPUserID']) {

                userName = userSetting['TesterFullName'];
                document.getElementById('testerName').value = userSetting['TesterFullName'];
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
                if ($("#userListDiv").html() == 'No ' + Configuration.gConfigTester + ' available to configure.')//added by Mohini for bug 10741(related to resource file)
                    $("#userListDiv").html('');
                $("#userList #userListDiv input").removeAttr('checked');
                if ($("#userList #userListDiv input[id='" + userID + "']").length == 0)
                    $("#userListDiv").append('<li><input id="' + userID + '" class="mslChk" type="checkbox" checked="checked"><span id="' + userID + '">' + userName + '</span></li>');
                else
                    $("#userList #userListDiv input[id='" + userID + "']").attr('checked', 'checked');

                /*edited by nitu on 18 dec 2012*/
                //	Configuration.SelectedUserArryRequest.length=0;
                //	Configuration.SelectedUserArryRequest.push($("#userList #userListDiv input").siblings('span').html());


                //Setting UAT environment List
                $("#uatEnvironmentList #urlboxdiv input").removeAttr('checked');
                $.each(userSetting['Environment'], function (index, environment) {
                    //$("#uatEnvironmentList #urlboxdiv a[href='"+environment['UATEnvironment'] +"']").siblings('input').attr('checked','checked');
                    if (environment['UATEnvironment'].indexOf("http://") == -1)
                        $("#uatEnvironmentList #urlboxdiv a[href='http://" + environment['UATEnvironment'] + "']").siblings('input').attr('checked', 'checked');
                    else
                        $("#uatEnvironmentList #urlboxdiv a[href='" + environment['UATEnvironment'] + "']").siblings('input').attr('checked', 'checked');

                    /* Added by shilpa for bug 6829 */
                    if (environment['UATEnvironment'].indexOf("https://") == -1)
                        $("#uatEnvironmentList #urlboxdiv a[href='https://" + environment['UATEnvironment'] + "']").siblings('input').attr('checked', 'checked');
                    else
                        $("#uatEnvironmentList #urlboxdiv a[href='" + environment['UATEnvironment'] + "']").siblings('input').attr('checked', 'checked');
                    /* */
                });
            }
        });

        //Main.hideLoading();
    },
    getUserList: function () {

        ///////////////////////Added By Mangesh
        var tempTesterArrFTS = new Array();

        var TesterItems = Configuration.getTesterIdByTestpassId[$("#testPassNames option:selected").val()];
        $('#userListDiv').empty();

        if ((TesterItems != undefined) && (TesterItems != null)) {
            for (var ii = 0; ii < TesterItems.length; ii++) {

                if ($.inArray(TesterItems[ii].testerName, tempTesterArrFTS) == -1) {
                    tempTesterArrFTS.push(TesterItems[ii].testerName);
                    //temp = '<option title="'+TesterItems[ii].testerName+'" value="'+TesterItems[ii].testerId+'">'+trimText(TesterItems[ii].testerName,16)+'</option>';
                    //$("#testerSelect").append(temp);
                    //feedback.SPUserIDs.push(spUserID);

                    var markup = '<li>';
                    markup += '<input id="' + TesterItems[ii].testerId + '" class="mslChk" type="checkbox">';
                    markup += '<span id="' + TesterItems[ii].testerId + '">' + TesterItems[ii].testerName + '</span>';
                    markup += '</li>';
                    $('#userListDiv').append(markup);

                }
            }
        }
        else {
            Configuration.resetUserSetting();
        }
        Configuration.TesterList = tempTesterArrFTS;


        /////////////////////////////////////////////////

    },
    updateUserSetting: function () {
        var userID = Configuration.globalUserID;
        var EnvironmentID = '';
        //var userSettingList;
        //var userSettingId=document.getElementById('userSettingID').value;
        //var userSettingIds=new Array();



        /*var temp = new Array();
        temp =userSettingId.split("|");				
        $.merge(userSettingIds,temp);*/


        var envIdArray = new Array();

        if (Configuration.validateUATEnvironment()) {
            //Main.showLoading();

            //User Setting array to store array of Usersetting List Items
            var _userSetting = new Array();

            var userSettingMyArray = new Array();

            //$.each(Configuration.UserSettingList,function(i,userSetting){
            /*if(userID == userSetting['SPUserID']){
                userSettingMyArray = userSetting;
                return;
            }*/
            $("#userList").attr('disabled', false);


            //userSettingList = jP.Lists.setSPObject(Main.getSiteUrl(),'UserSetting');
            Configuration.SelectedUserArryRequest.length = 0;
            //Code Modified by swapnil kamle on 8-8-2012 
            $("#urlboxdiv li").each(function () {
                if ($(this).children(".mslChk").attr('checked') == true) {
                    EnvironmentID += $(this).children(".mslChk").attr('value') + '|';
                    Configuration.SelectedUserArryRequest.push($("div#userList input.mslChk:checked").siblings('span').html());
                    envIdArray.push({ "envID": $(this).children(".mslChk").attr('value') });
                }

            }
					  	 );


            //To form the string in the proper format to update the usersettingData
            //format: ENVID~USERID^userSettingId#ENVID~USERID^userSettingId#ENVID~USERID^userSettingId#ENVID~USERID^userSettingId#ENVID~USERID^userSettingId
            var str = '';


            for (var j = 0; j < envIdArray.length; j++) {
                if (j != 0) {
                    str += ",";
                }
                str += envIdArray[j].envID;

            }


            //UserSetting variable formation
            var projectId = $("#projectNamesVersion option:selected").val();
            var testPassId = $("#testPassNames option:selected").val();

            var userSetting =
            {
                projectId: projectId,
                testPassId: testPassId,
                UserSettingString: str,
                userId: userID.toString()
            };


            //Saving Bulk Items in list
            var _result = ServiceLayer.InsertUpdateData("UpdateUserSetting", userSetting, "Configuration");
            
            if (_result.Success != undefined && _result.Success == "Done") {
                    Configuration.alertSuccessfullUserSetting('User Setting updated successfully!');
                }
            

            //End of Code Modified by swapnil kamle on 8-8-2012 
            //Saving Bulk Items in list			

            //Configuration.alertBox('User Setting updated successfully!');

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
        Configuration.CheckMode = true;
    },

    /* function added by shilpa */
    deleteUserSettingOk: function (userID) {
        Configuration.CheckMode = true;
        var userName = '';
        //var usersettingId='';
        var userSettingList = '';

        $.each(Configuration.UserSettingList, function (i, userSetting) {
            if (userID == userSetting['SPUserID']) {
                userName = userSetting['TesterFullName'];
                //usersettingId=userSetting['IDs'].toString();

                var testpassId = $("#testPassNames option:selected").val();
                //var param=testpassId+"/"+userID.toString();				

                var del = {
                    'testPassId': testpassId,
                    'userId': userID.toString()
                }


                userSettingList = ServiceLayer.DeleteData('DeleteUserSetting', del,'Configuration');
                if (userSettingList.length > 0) {
                    if (userSettingList[0].Key == "Success")
                        Configuration.alertBox('User setting deleted successfully!!');
                }
                //$.each(userSetting['IDs'],function(index,id){
                //userSettingList.deleteItem(id);

                //});
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
        if ($("#userListDiv").html() == 'No ' + Configuration.gConfigTester + ' available to configure.')//added by Mohini for bug 10741(related to resource file)
            //$("#userListDiv").html('');

            $("#userListDiv").append('<li><input id="' + userID + '" class="mslChk" type="checkbox"><span id="' + userID + '">' + userName + '</span></li>');

        //Configuration.bindUserSettingGrid();


    },
    deleteUserSetting: function (userID) {
        $("#dialog:ui-dialog").dialog("destroy");
        $("#divConfirm").text('Are you sure you want to delete ?');
        $("#divConfirm").dialog({
            autoOpen: false,
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "Delete": function () {

                    Main.showLoading();
                    setTimeout('Configuration.deleteUserSettingOk(' + userID + ');', 100);
                    $('#divConfirm').dialog("destroy");
                    Main.hideLoading();

                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });

        $('#divConfirm').dialog("open");

    },

    hideUserFronUsersList: function (userID) {
        $("input#" + userID).parent().remove();
    },

    alertBox: function (message) {
        $("#divAlert").text(message);
        $('#divAlert').dialog({ height: 150, width:'auto', modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },

    resetUserSetting: function () {
        if ($("#userList #userListDiv input").length == 0) {
            //$("#userListDiv").html('No tester available to configure.');
            $("#userListDiv").html('No ' + Configuration.gConfigTester + ' available to configure.');//added by Mohini for bug 10741(related to resource file)
        }
        //else{
        //$("#userListDiv").html()
        $("#userList #userListDiv input").removeAttr('checked');
        $("#uatEnvironmentList #urlboxdiv input").removeAttr('checked');
        //}

    },

    resetUserSettingInEditMode: function () {

        //Configuration.editUserSetting($("#testerID").val());
        //Code Modified by swapnil kamle on 8-8-2012

        $('#aliasURLUpdate').val('');
        $('#actualURLUpdate').val('');
        $('#aliasURL').val('');
        $('#actualURL').val('');

        if ($('#userSettingID').val() != undefined) {
            Configuration.editUserSetting(Configuration.globalUserID);
        }
    },

    resetAddModeUserSetting: function () {
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
        $("#userList").attr('disabled', false);
        $("#linkSA_testPassName").attr('disabled', false);
        $("#linkSN_testPassName").attr('disabled', false);
        $("#anchShow_testPassName").attr('disabled', false);

        Configuration.bindUserSettingGrid();
        Configuration.resetUserSetting();

        if (Configuration.UserSettingList != undefined) {
            $.each(Configuration.UserSettingList, function (i, userSetting) {
                //Hide Tester From User List
                Configuration.hideUserFronUsersList(userSetting['SPUserID']);
            });
        }
        /* Added by shilpa */
        if ($("#userList #userListDiv input").length == 0) {
            //$("#userListDiv").html('No tester available to configure.');
            $("#userListDiv").html('No ' + Configuration.gConfigTester + ' available to configure.');//added by Mohini for bug 10741(related to resource file)
        }
    },

    alertSuccessfullUserSetting: function (message) {
        $("#dialog:ui-dialog").dialog("destroy");
        $("#divConfirm").html(message + "<br/><b>Do you want to send request to admin?</b>");
        $("#divConfirm").dialog({
            autoOpen: false,
            resizable: false,
            //height:140,
            modal: true,
            buttons: {
                "Yes": function () {
                    var mailTo = 'admin@demo.com';
                    var subject = 'Request For Access to Tester &amp'; // "Request For Access to 'Url of environment'";
                    //var messageBody = 'Please provide the access and passwords for following users - \n \n \n '; //"Please provide the access to ‘url of environment’ for following users : %0D%0A %0D%0A %0D%0A"; //
                    /*edited by nitu on 18 dec 2012 */
                    var UserArry = new Array();
                    var UserSelectedName = '';
                    var OutlookList = jP.Lists.setSPObject(Configuration.SiteURL, 'OutlookWorkflow');
                    UserArry = Configuration.SelectedUserArryRequest;
                    var j = 0;
                    $.each(Configuration.UserSettingList, function (i, userSetting) {
                        var indx = jQuery.inArray("" + userSetting["TesterFullName"] + "", UserArry);
                        if (indx != -1) {
                            var messageBody = 'Please provide the access and passwords to the below user - \n \n \n '; //"Please provide the access to ‘url of environment’ for following users : %0D%0A %0D%0A %0D%0A"; //
                            //messageBody += parseInt(j)+1 +")  ";
                            //j++;
                            UserSelectedName = userSetting["TesterFullName"];

                            messageBody += "Name - " + userSetting["TesterFullName"] + " \n";
                            messageBody += "URLs - \n";
                            $.each(userSetting["Environment"], function (index, environment) {
                                messageBody += "" + environment["UATEnvironment"].replace(/#/g, "") + " \n";
                            });

                            messageBody += " \n \n";

                            /* workflow code added by shilpa on 19 march */
                            Obj = new Array();
                            Obj.push({
                                'messageBody': messageBody
                            });
                            var result = OutlookList.updateItem(Obj);
                            /**/
                        }
                    });

                    //messageBody += '';
                    //window.location ='mailto:'+ mailTo +'?Subject='+ subject +';body='+ messageBody ;
                    $(this).dialog("close");
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
                "No": function () {
                    $(this).dialog("close");
                }
            }
        });


        $('#divConfirm').dialog("open");

    },

    validateUATEnvironment: function () {

        if ($("#userList").css('display') != 'none') {

            //Validate User Selected and UAT environment selected
            if ($("input.mslChk:checked").length == 0) {
                Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
                return false;
            }

            //Validating Selected Users
            if ($("div#userList input.mslChk:checked").length == 0) {
                //Configuration.alertBox('Please select atleast one user!');
                Configuration.alertBox('Please select atleast one ' + $('#lblUser').text().trim().substring(0, $('#lblUser').text().trim().length - 2) + '!');//:SD

                return false;
            }

            //Validating UAT Environment
            if ($("div#uatEnvironmentList input.mslChk:checked").length == 0) {
                //Configuration.alertBox('Please select atleast one UAT Environment!');
                Configuration.alertBox('Please select atleast one ' + $("#lblEnvironment").text().trim().substring(0, $("#lblEnvironment").text().trim().length - 2) + '!');//:SD
                return false;
            }

            return true;
        }
        else {
            //Validate User Selected and UAT environment selected
            if ($("#ddlUserList option:selected").val() == -1 && $("div#uatEnvironmentList input.mslChk:checked").length == 0) {
                Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
                return false;
            }

            //Validating Selected Users
            if ($("#ddlUserList option:selected").val() == -1) {
                //Configuration.alertBox('Please select atleast one user!');
                Configuration.alertBox('Please select atleast one ' + $('#lblUser').text().trim().substring(0, $('#lblUser').text().trim().length - 2) + '!');//:SD
                return false;
            }

            //Validating UAT Environment
            if ($("div#uatEnvironmentList input.mslChk:checked").length == 0) {
                //Configuration.alertBox('Please select atleast one UAT Environment!');
                Configuration.alertBox('Please select atleast one ' + $("#lblEnvironment").text().trim().substring(0, $("#lblEnvironment").text().trim().length - 2) + '!');//:SD
                return false;
            }

            return true;
        }
        Main.hideLoading();
    },

    clearProcessFields: function () {
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

    clearFields: function () {
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
    clearFieldsOnDelete: function () {
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
    saveProcess: function () {

        if (Configuration.validateProcess()) {
            Main.showLoading();
            var _process = new Array();

            //Added by Mangesh									

            //_process = ({
            //    projectId: $('#projectNamesForProcessVersion').val(),
            //    asIs: $('#txtAsIs').val(),
            //    toBe: $('#txtToBe').val(),
            //    asIsDescription: $('#txtAsIsDescription').val() == '' ? null : $('#txtAsIsDescription').val(),
            //    toBeDescription: $('#txtToBeDescription').val() == '' ? null : $('#txtToBeDescription').val()
            //});

            var insertProcessDetails = '';
            insertProcessDetails = {
                'projectId':  $('#projectNamesForProcessVersion').val(),
                'asIs': $('#txtAsIs').val(),
                'toBe': $('#txtToBe').val(),
                'asIsDescription': $('#txtAsIsDescription').val() == '' ? null : $('#txtAsIsDescription').val(),
                'toBeDescription': $('#txtToBeDescription').val() == '' ? null : $('#txtToBeDescription').val()

            };
            var _processID;

            var _result = ServiceLayer.InsertUpdateData("InsertUpdateProcessDetail", insertProcessDetails, "Configuration");

            if (_result.Success != undefined && _result.Success == "Done") {
                    Configuration.alertBox('Process added successfully!');
                    _processID = _result.ID;
                }
            Main.hideLoading();

            Configuration.blankProcess();

            Configuration.gridDetailsForProcess();
        }
        else {
            Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
        }
        Main.hideLoading();

    },
    validateProcess: function () {
        if ($("#txtAsIs").val().trim() == '') {
            return false;
        }
        if ($("#txtToBe").val().trim() == '') {
            return false;
        }
        return true;
    },

    /*Blank the data fields*/
    blankProcess: function () {
        document.getElementById('txtAsIs').value = '';
        document.getElementById('txtAsIsDescription').value = '';
        document.getElementById('txtToBe').value = '';
        document.getElementById('txtToBeDescription').value = '';
    },

    /*grid*/

    //Code Modified By swapnil on 31/7/2012
    getProcesDetailsByProcesDetailsId: new Array(),
    gridDetailsForProcess: function () {
        var gridDetails = '<p class="clear"/>' +
            '<table class="gridDetails" cellSpacing="0">' +
                '<thead>' +
                    '<tr class="hoverRow">' +
                        //header text changed as per label text for configuable value from xml resource file//:SD
                        /*'<td style="width: 5%;" class="tblhd center"><span>#</span></td>'+
                        '<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>'+
                        '<td style="width: 10%;" class="tblhd "><span>AS-IS</span></td>'+					
                        '<td style="width: 20%;" class="tblhd"><span>AS-IS Description</span></td>'+
                        '<td style="width: 10%;" class="tblhd "><span>TO-BE</span></td>'+
                        '<td style="width: 20%;" class="tblhd"><span>TO-BE Description</span></td>'+					
                        '<td style="width: 10%;" class="tblhd center"><span>Edit Item</span></td>'+*/
                        '<td style="width: 5%;" class="tblhd center"><span>#</span></td>' +
                        '<td style="width: 20%;" class="tblhd "><span>Project Name</span></td>' +
                        '<td style="width: 10%;" class="tblhd "><span>AS IS</span></td>' +
                        '<td style="width: 20%;" class="tblhd"><span>AS IS Description</span></td>' +
                        '<td style="width: 10%;" class="tblhd "><span>TO BE</span></td>' +
                        '<td style="width: 20%;" class="tblhd"><span>TO BE Description</span></td>' +
                        '<td style="width: 10%;" class="tblhd center"><span>Edit Item</span></td>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>';

        var url = Main.getSiteUrl();

        //SM: Modified to show only processes for selected project
        /**********************************************************************/
        /////Added by Mangesh//////////////////
        var projectId = $('#projectNamesForProcessVersion').val()
        ///////////////////////////////////////						
        /**********************************************************************/

        var result = ServiceLayer.GetData("GetProcessDetail", projectId,"Configuration");

        var cnt = 0;
        if (result.length > 0 && result != undefined) {
            $('#pagingProcess').show();

            processSavedForProjectId = result;
            var resultLength = result.length;
            Configuration.gAttlengthProc = resultLength;
            if (resultLength >= (Configuration.startIndexProc + 5))
                Configuration.EiProc = Configuration.startIndexProc + 5;
            else
                Configuration.EiProc = resultLength;


            Configuration.getProcesDetailsByProcesDetailsId = [];

            for (var i = Configuration.startIndexProc; i < Configuration.EiProc; i++) {
                //////Added by Mangesh:   fill array by processdetailsId							

                if (Configuration.getProcesDetailsByProcesDetailsId[result[i]["processDetailId"]] == undefined) {
                    Configuration.getProcesDetailsByProcesDetailsId[result[i]["processDetailId"]] = new Array();
                    Configuration.getProcesDetailsByProcesDetailsId[result[i]["processDetailId"]].push({

                        "asIs": result[i]["asIs"],
                        "asIsDescription": result[i]["asIsDescription"],
                        "toBe": result[i]["toBe"],
                        "toBeDescription": result[i]["toBeDescription"]

                    });
                }


                cnt = i + 1;

                /* Added by shilpa for bug 5605 on 11th March */
                var asIS = result[i]["asIs"].replace(/"/g, "&quot;");
                asIS = asIS.replace(/'/g, '&#39;');
                if (result[i]["asIsDescription"] != null && result[i]["asIsDescription"] != undefined && result[i]["asIsDescription"] != "") {
                    var asISDesc = result[i]["asIsDescription"].replace(/"/g, "&quot;");
                    asISDesc = asISDesc.replace(/'/g, '&#39;');
                }
                var toBe = result[i]["toBe"].replace(/"/g, "&quot;");
                toBe = toBe.replace(/'/g, '&#39;');
                if (result[i]["toBeDescription"] != null && result[i]["toBeDescription"] != undefined && result[i]["toBeDescription"] != "") {
                    var toBeDesc = result[i]["toBeDescription"].replace(/"/g, "&quot;");
                    toBeDesc = toBeDesc.replace(/'/g, '&#39;');
                }

                gridDetails += '<tr>' +
                    '<td class="center">' + cnt + '</td>' +
                    //'<td>'+result[i]["ProjectName"]+'</td>'+
                    '<td>' + document.getElementById('projectNamesForProcess').options[document.getElementById('projectNamesForProcess').selectedIndex].title + '</td>' + // Added by shilpa for bug 5277
                    '<td title="' + asIS + '">' + ((result[i]["asIs"] == null || result[i]["asIs"] == undefined) ? "-" : trimText(result[i]["asIs"], 30)) + '</td>' +
                    '<td title="' + ((result[i]["asIsDescription"] == null || result[i]["asIsDescription"] == undefined || result[i]["asIsDescription"] == "") ? "-" : asISDesc) + '">' + ((result[i]["asIsDescription"] == null || result[i]["asIsDescription"] == undefined || result[i]["asIsDescription"] == "") ? "-" : trimText(result[i]["asIsDescription"], 30)) + '</td>' +
                    '<td title="' + toBe + '">' + ((result[i]["toBe"] == null || result[i]["toBe"] == undefined) ? "-" : trimText(result[i]["toBe"], 30)) + '</td>' +
                    '<td title="' + ((result[i]["toBeDescription"] == null || result[i]["toBeDescription"] == undefined || result[i]["toBeDescription"] == "") ? "-" : toBeDesc) + '">' + ((result[i]["toBeDescription"] == null || result[i]["toBeDescription"] == undefined || result[i]["toBeDescription"] == "") ? "-" : trimText(result[i]["toBeDescription"], 30)) + '</td>' +
                    '<td class="center"><a onclick="Configuration.fillForm(' + result[i]["processDetailId"] + ')"  title="Edit Process Details"  class="pedit" style="cursor:Pointer"></a>' +
                    '<a onclick="Configuration.delProcess(' + result[i]["processDetailId"] + ');" title="Delete process"  class="pdelete" style="cursor:Pointer"></a></td>' +
                '</tr>';
            }

            gridDetails += '</tbody>' +
                        '</table>';
            //Code Modifed By swapnil kamle on 31/7/2012 to get process grid when configuration tab clicked									
            //$("#process").html(gridDetails);	
            //
            $("#processGrid").html(gridDetails);
            resource.UpdateTableHeaderText();//:SD
            var info = '<label>Showing ' + (Configuration.startIndexProc + 1) + '-' + Configuration.EiProc + ' Processes of Total ' + (result).length + ' Processes </label> | <a id="previousProc" style="cursor:pointer" onclick="Configuration.startIndexTDecrementProc();Configuration.gridDetailsForProcess()">Previous</a> | <a  id="nextProc" style="cursor:pointer" onclick="Configuration.startIndexTIncrementProc();Configuration.gridDetailsForProcess()">Next</a>';
            $('#pagingProcess').empty();
            $("#pagingProcess").append(info);

            if (Configuration.startIndexProc <= 0) {
                document.getElementById('previousProc').disabled = "disabled";
                document.getElementById('previousProc').style.color = "#989898";
            }
            else
                document.getElementById('previousProc').disabled = false;

            if (resultLength <= ((Configuration.startIndexProc) + 5)) {
                document.getElementById('nextProc').disabled = "disabled";
                document.getElementById('nextProc').style.color = "#989898";
            }
            else
                document.getElementById('nextProc').disabled = false;
        }
        else {
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

    startIndexTIncrementProc: function () {
        if (Configuration.gAttlengthProc > Configuration.startIndexProc + 5)
            Configuration.startIndexProc += 5;
    },
    startIndexTDecrementProc: function () {
        if (Configuration.startIndexProc > 0)
            Configuration.startIndexProc -= 5;
    },

    //Edit Processes

    fillForm: function (ID) {
        $("#newProcess").show();
        $("#btnSaveProcess").hide();
        $("#btnUpdateProcess").show();
        $("#btnCancelProcess").hide();
        $("#btnResetProcess").show();

        var result = Configuration.getProcesDetailsByProcesDetailsId[ID];
        if (result != null && result != undefined) {
            document.getElementById('txtAsIs').value = result[0]["asIs"];
            document.getElementById('txtToBe').value = result[0]["toBe"];
            document.getElementById('txtAsIsDescription').value = result[0]["asIsDescription"] == undefined ? "" : result[0]["asIsDescription"];
            document.getElementById('txtToBeDescription').value = result[0]["toBeDescription"] == undefined ? "" : result[0]["toBeDescription"];
            document.getElementById('processId').value = ID;
        }
    },

    //Start of Update Process Function

    update: function () {
        if (Configuration.validateProcess()) {

            var obj = new Array();
            obj = ({
                processDetailId: $('#processId').val(),
                projectId: $('#projectNamesForProcessVersion').val(),
                toBe: document.getElementById('txtToBe').value,
                asIs: document.getElementById('txtAsIs').value,
                toBeDescription: document.getElementById('txtToBeDescription').value,
                asIsDescription: document.getElementById('txtAsIsDescription').value
            });

            var _result = ServiceLayer.InsertUpdateData("InsertUpdateProcessDetail", obj,"Configuration");

            
            if (_result.Success != undefined && _result.Success == "Done") {
                    Configuration.alertBox('Processes Updated successfully!!');
                }
            
            document.getElementById('txtAsIs').value = '';
            document.getElementById('txtToBe').value = '';
            document.getElementById('txtToBeDescription').value = '';
            document.getElementById('txtAsIsDescription').value = '';

            $("#btnSaveProcess").show();
            $("#btnUpdateProcess").hide();
            Configuration.gridDetailsForProcess();
        }
        else {
            $("#btnSaveProcess").show();
            $("#btnUpdateProcess").hide();

            Configuration.alertBox('Fields marked with asterisk(*) are mandatory!');
        }
        Main.hideLoading();
    },
    /*Delete*/

    delProcessOk: function (ID) {

        var result = ServiceLayer.DeleteData("DeleteProcessDetail" + "/" + ID,null,"Configuration");
        //if (result.length > 0) {
        if (result.Success != undefined && result.Success == "Done") {
                //$('#divConfirm').dialog("destroy")
                Configuration.alertBox('Processes deleted successfully!!');

                Configuration.clearFieldsOnDelete();
            }
        //}
        Configuration.gridDetailsForProcess();
    },
    delProcess: function (ID) {
        $("#dialog:ui-dialog").dialog("destroy");
        $("#divConfirm").text('Are you sure you want to delete ?');
        $("#divConfirm").dialog({
            autoOpen: false,
            resizable: false,
            height: 140,
            modal: true,
            buttons: {
                "Delete": function () {
                    Main.showLoading();
                    setTimeout('Configuration.delProcessOk(' + ID + ');', 100);
                    $('#divConfirm').dialog("destroy")
                    Main.hideLoading();
                    //Configuration.clearFields();

                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });

        $('#divConfirm').dialog("open");

        Main.hideLoading();
    },

    /*End of Update Function*/
    resetProcess: function () {
        Configuration.fillForm(document.getElementById('processId').value);
    },
    //Add mode for Process 	
    addMode: function () {
        Configuration.blankProcess();
        $("#btnSaveProcess").show();
        $("#btnCancelProcess").show();
        $("#btnUpdateProcess").hide();
        $("#btnResetProcess").hide();
        $("#newProcess").hide();

        document.getElementById('processId').value = '';
    },
    //////////Upload File Code Added by Shilpa/////////////

    UploadFilePopUp: function () {
        //if($('#projectForFileUpload').text() == "No Project Available")
        if ($('#projectForFileUpload').text() == "No " + Configuration.gConfigProject + " Available")//:SD
        {
            //Configuration.alertBox('No Project Available.');
            Configuration.alertBox('No ' + Configuration.gConfigProject + ' Available.');//:SD
        }
        else {
            $('#upload').dialog({ height: 275, width: 450, resizable: false, title: "Configuration", modal: true, close: function () { Configuration.renewUploadPopup(); } });
            $("#upload").parent().appendTo($("form:first"));

            $('.ms-standardheader nobr:eq(2)').html("Attachment&nbsp;Name&nbsp;<font color='red'>*</font>");
            $('.ms-standardheader nobr:eq(3)').html("Description");//added by shilpa on 29 Nov
            $('#partAttachment table tbody tr:eq(1) td:eq(0)').html("File Name<font color='red'>*</font>"); //added by shilpa on 1st Nov
            $('.ms-attachUploadButtons').css('padding-bottom', '7px');
            $("input[title$='AttachmentName']").css('float', 'right');
            $("textarea[title$='FileDescription']").css('float', 'right');
            $("input[title$='AttachmentName']").css('padding-right', '6px');
            $("textarea[title$='FileDescription']").css('padding-right', '5px');
            Configuration.renewUploadPopup();

        }
        $("#upload h2 span").css("display", "none");
        Main.hideLoading();
    },
    renewUploadPopup: function () {
        /* Added by shilpa on 29 Nov */
        $('#attachRow0').remove();
        $("#AttachmentName").val("");
        $("#attdesc").val("");
        $("#attachOKbutton").show();
        $("#FileUpload1").replaceWith($("#FileUpload1").clone(true));
        $('#idUploadFileRow').css('display', 'block');
        $('#FileUpload1').css('display', 'inline-block');
        //$('#attachmentsOnClient').empty().append('<input style="width: 205pt;" id="onetidIOFile" class="ms-fileinput" title="Name  " name="fileupload0" size="56" type="file">');
        $("#idAttachmentsRow").hide();
        $('#partAttachment table tbody tr:eq(1) td:eq(0)').show();
        $('#partAttachment table tbody tr:eq(3)').show();
    },

    /////////////////////////////////////////////

    bindUploadedFileGrid: function (pId) {
        //alert("called"+pId);
        /* Added by shilpa on 15 march for bug 3890 */
        if (pId != '' && pId != undefined && pId != null) {
            var prjID = pId;

            var projname = Configuration.getProjectNameByID[prjID];

            $("#projectForFileUpload [title='" + projname[0].projectName + "']").attr("selected", "selected");

            $("#projectForFileUploadVersion [value='" + prjID + "']").attr("selected", "selected");

        }
        else {
            if ($('#projectForFileUploadVersion').val() != undefined && $('#projectForFileUploadVersion').val() != null)
                var prjID = $('#projectForFileUploadVersion').val();
            else
                var prjID = pId;
        }

        //	var query ="<Query><Where><Eq><FieldRef Name='ProjectID' /><Value Type='Text'>"+$('#projectForFileUpload').val()+"</Value></Eq>";
        /*var query ="<Query><Where><Eq><FieldRef Name='ProjectID' /><Value Type='Text'>"+prjID+"</Value></Eq>";
        query+="<ViewFields><FieldRef Name='ID'/><FieldRef Name='AttachmentName' /><FieldRef Name='Description' /><FieldRef Name='ProjectID' /><FieldRef Name='FileName' /></ViewFields>";			
            query+="<OrderBy><FieldRef Name='ID' Ascending='False' /></OrderBy></Where></Query>";	
            var result = Configuration.dmlOperation(query,'ConfigureDocuments');*/

        //Read from sql		

       // var resultSql = ServiceLayer.GetData("GetConfigurationDocuments" +"/"+ prjID, null, "Configuration");
        var resultSql = ServiceLayer.GetData("GetConfigurationAttachmentDetails" + "/" + prjID, null, "Configuration");

        $('#grdUploadedFiles').empty();

        var tablemarkup = '<table cellspacing="0" class="gridDetails" style="width:650px;">' +
              			  '<thead>' +
                  		  '<tr>' +
                        	'<td width="40" class="tblhd center" style="width:5%"><span>#</span></td>' +
                                    '<td class="tblhd" style="width:20%"><span>File Name</span></td>' +
                                    '<td class="tblhd" style="width:40%"><span>File View</span></td>' +
                                    '<td class="tblhd" style="width:20%"><span>File Description</span></td>' +
                                    '<td class="tblhd" style="width:15%"><span>Delete Item</span></td>' +
                           '</tr>' +
		                '</thead>' +
		                '<tbody>';
        var cnt = 0;
        if (resultSql != null && resultSql != undefined && resultSql.length > 0) {

            $('#pagingFile').show();

            var resultLength = resultSql.length;
            //var resultlen=result.length;//for list

            Configuration.gAttlengthFile = resultLength;
            if (resultLength >= (Configuration.startIndexFile + 5))   //&& resultlen >=(Configuration.startIndexFile+5))
                Configuration.EiFile = Configuration.startIndexFile + 5;
            else
                Configuration.EiFile = resultLength;

            for (var i = Configuration.startIndexFile; i < Configuration.EiFile; i++) {
                //cnt++;
                var attName = (resultSql[i]["attachmentName"]).replace(/"/g, "&quot;");
                attName = attName.replace(/'/g, '&#39;');

                cnt = i + 1;
                var _url = ServiceLayer.serviceURL + "/Configuration/GetConfigurationAttachment/" + resultSql[i]["attachmentId"].toString();

                //ServiceLayer.getAttachment('GetConfigurationAttachment', resultSql[i]["attachmentId"].toString(), 'Configuration');
                
                var iconHtml = Configuration.displayIcons(resultSql[i]['fileName'].toString());
                tablemarkup += "<tr class='doubleCoumn'><td class='center '>" + cnt + "</td>";
                tablemarkup += "<td align='left' title='" + attName + "'><span>" + trimText(resultSql[i]["attachmentName"], 30) + "</span></td>";
                // tablemarkup += "<td align='left'>" + iconHtml + "<a class='orange' style='padding-left:5px;vertical-align:middle;' href='" + _url + "' target='_blank'><font color=''>" + resultSql[i]['fileName'].toString() + "</font></a></td>";
                tablemarkup += "<td align='left'>" + iconHtml + "<a class='orange' style='padding-left:5px;vertical-align:middle;' onclick='Configuration.DownloadFile(" + resultSql[i]["attachmentId"].toString() + ");'><font color=''>" + resultSql[i]['fileName'].toString() + "</font></a></td>";
                if (resultSql[i]["description"] != undefined && resultSql[i]["description"] != null && resultSql[i]["description"] != "") {
                    var desc = resultSql[i]["description"].replace(/"/g, "&quot;");
                    desc = desc.replace(/'/g, '&#39;');
                    tablemarkup += "<td align='left' title='" + desc + "'><span>" + trimText(resultSql[i]["description"], 30) + "</span></td>";
                }
                else {
                    tablemarkup += "<td align='left' title='-'><span>-</span></td>";
                }

                //To find out the ID of record from the filepath
                // var param1=result[i]["ID"];
                var filepath = _url;
                var n = filepath.indexOf("/", 96);
                var param1 = filepath.substring(96, n);

                var param2 = resultSql[i]["attachmentId"];
                var param = param1 + "|" + param2;

                tablemarkup += '<td class="center"><span><a title="Delete Attachment"  onclick="Configuration.deleteFile(\'' + param2 + '\')" class="pdelete"  style="cursor:pointer;">&nbsp;</a></span></td></tr>';
            }

            tablemarkup += '</tbody></table>';
            $('#grdUploadedFiles').append(tablemarkup);

            var info = '<label style="font-weight:normal;display:inline-block;">Showing ' + (Configuration.startIndexFile + 1) + '-' + Configuration.EiFile + ' Files of Total ' + (resultSql).length + ' Files </label> | <a id="previousFile" style="cursor:pointer" onclick="Configuration.startIndexTDecrementFile();Configuration.bindUploadedFileGrid()">Previous</a> | <a  id="nextFile" style="cursor:pointer" onclick="Configuration.startIndexTIncrementFile();Configuration.bindUploadedFileGrid()">Next</a>';
            $('#pagingFile').empty();
            $("#pagingFile").append(info);

            if (Configuration.startIndexFile <= 0) {
                document.getElementById('previousFile').disabled = "disabled";
                document.getElementById('previousFile').style.color = "#989898";
            }
            else
                document.getElementById('previousFile').disabled = false;

            if (resultLength <= ((Configuration.startIndexFile) + 5)) {
                document.getElementById('nextFile').disabled = "disabled";
                document.getElementById('nextFile').style.color = "#989898";
            }
            else
                document.getElementById('nextFile').disabled = false;

            /* Added by shilpa on 15 march */
            if ($('#grdUploadedFiles table tbody').find('tr').length == 0) {
                Configuration.startIndexTDecrementFile();
                Configuration.bindUploadedFileGrid();
            }

        }
        else {
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

        Configuration.prjID = '';

    },
    DownloadFile:function(id){
        
        ServiceLayer.getConfigAttachment(id);
    },

    startIndexTIncrementFile: function () {
        if (Configuration.gAttlengthFile > Configuration.startIndexFile + 5)
            Configuration.startIndexFile += 5;
    },
    startIndexTDecrementFile: function () {
        if (Configuration.startIndexFile > 0)
            Configuration.startIndexFile -= 5;
    },

    deleteFileOk: function (ids) {

        //var id = ids.split("|");

        //first delete from sql    
        //var result = ServiceLayer.DeleteData("DeleteConfigurationDocuments", id[1], "Configuration")
        var result = ServiceLayer.DeleteData("DeleteConfigAttachment/" + ids + "/" + $('#projectForFileUploadVersion option:selected').val(), null, "Configuration")
        if (result.length > 0) {
            if (result.Success != undefined && result.Success == "Done") {

                //Second delete from list
                //var listName = jP.Lists.setSPObject(Main.getSiteUrl(), 'ConfigureDocuments');
                //var res = listName.deleteItem(id[0]);

                Configuration.alertBox("Attachment Deleted !!! ");
            }
        }
        //Configuration.clearFields();
        //$( this ).dialog( "close" );
        Configuration.startIndexFile = 0;
        Configuration.bindUploadedFileGrid($('#projectForFileUploadVersion option:selected').val());
    },
    deleteFile: function (ids) {
        //divConfirmDelete
        $("#divConfirm").text('Are you sure want to delete attachment?');
        $("#divConfirm").dialog
            ({
                autoOpen: false,
                resizable: false,
                height: 140,
                modal: true,
                buttons:
                {
                    "Delete": function () {
                        Main.showLoading();
                        setTimeout('Configuration.deleteFileOk(\'' + ids + '\');', 100);
                        $(this).dialog("close");
                        Main.hideLoading();
                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }
            });
        $('#divConfirm').dialog("open");

    },
    displayIcons: function (filename) {
        var ext = filename.split('.').pop();

        switch (ext) {
            case "doc":
            case "docx":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/icon-word.png"/>';
                }
                break;

            case "xls":
            case "xlsx":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/icon-excel.png"/>';
                }
                break;

            case "ppt":
            case "pptx":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/icon-powerpoint.png"/>';
                }
                break;

            case "jpg":
            case "jpeg":
            case "gif":
            case "bmp":
            case "png":
            case "bmp":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/image.png"/>';
                }
                break;

            case "pdf":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/icon-pdf.png"/>';
                }
                break;

            case "msg":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/outlook.jpg"/>';
                }
                break;

            case "txt":
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/textfileicon.png"/>';
                }
                break;


            default:
                {
                    filesHtml = '<img style="vertical-align:middle;padding-left:5px;" src="/images/unknown file.jpg"/>';
                }
                break;
        }

        return filesHtml;
    },

    ProjectChange: function () {
        ///////////////////////Added By Mangesh//////////////////////////////
        if (Configuration.isPortfolioOn) {
            var tempVerArrFTS = new Array();
            if ($('#projectForTester option:selected').text() == "Select " + Configuration.gConfigProject) {
                $("#projectForTesterVersion").html("<option>Select " + Configuration.gConfigVersion + "</option>");
                $("#testPassforPrj").html("<option>Select " + Configuration.gConfigTestPass + "</option>");
            }
            else {
                //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                var data = Configuration.getVerByProjName[$('#projectForTester option:selected').attr('title')];
                var NoOfVer = 0;
                if (data != undefined)
                    NoOfVer = data.length;

                var verOptions = '';
                tempVerArrFTS = [];

                for (var i = 0; i < NoOfVer; i++) {

                    if ($.inArray(data[i].projectVersion, tempVerArrFTS) == -1) {
                        tempVerArrFTS.push(data[i].projectVersion);

                        verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                    }
                }

                if (verOptions == "")
                    verOptions = '<option >Default ' + Configuration.gConfigVersion + '</option>';

                $("#projectForTesterVersion").html(verOptions);
                //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014			    	  
            }
        }
        //////////////////////////////////////		


    },
    VersionChange: function () {
        if ($('#projectForTesterVersion option:selected').val() != "" && $('#projectForTesterVersion option').length > 1) {
            $("#projectForTester option:selected").val($('#projectForTesterVersion option:selected').val());
            Configuration.populateTestPassForTester(); Configuration.gridDetails(); (Configuration.getDoc().length == 0) ? noActHandle() : initDocPagination(); Configuration.getServrsFrLogInUser();

        }

    },
    populateTestPassForTester: function () {

        /////////////////Added By Mangesh
        var tpItems = Configuration.getTestPassIdByProjectId[$("#projectForTesterVersion option:selected").val()];
        $('#testPassforPrj').empty();
        var tempTestPassArr = new Array();
        if ((tpItems != undefined) && (tpItems != null)) {
            for (var ii = 0; ii < tpItems.length ; ii++) {
                if ($.inArray(tpItems[ii].testpassName, tempTestPassArr) == -1) {
                    tempTestPassArr.push(tpItems[ii].testpassName);
                    temp = '<option title="' + tpItems[ii].testpassName + '" value="' + tpItems[ii].testpassId + '">' + trimText(tpItems[ii].testpassName.toString(), 50) + '</option>';
                    $("#testPassforPrj").append(temp);
                }
            }
        }
        else /* Added by shilpa for bug 5145 */ {

            /*****Added by Mohini for resource file*****/
            $("#testPassforPrj").html('<option value="0">No ' + Configuration.gConfigTestPass + ' Available</option>');

        }

        ///////////////////						

    },

    attachPortfolioCheckBoxEvent: function () {


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
        if (parseInt(Configuration.gPortfolio)) {
            //Configuration.alertBox(Configuration.gConfigPortfolio+" enabled successfully!");
            var msg = "Once ‘Enable " + Configuration.gConfigPortfolio + "’ is selected, you will not be able to make it" +
			                       " ‘Disable " + Configuration.gConfigPortfolio + "’ throughout the application." +
                                   "Are you sure you want to proceed for ‘Enable " + Configuration.gConfigPortfolio + "’?</br></br>";
            msg += "<b>Note: </b>Please download the files &nbsp;";
            msg += "<a href='GuidelineDocs/UAT_Enable Portfolio_RGen_V1.0.pdf' target='_blank' style='text-decoration:underline;color:blue'>Enable " + Configuration.gConfigPortfolio + "</a>";
            msg += "&nbsp;and&nbsp;<a href='GuidelineDocs/UAT_Disable Portfolio_RGen_V1.0.pdf' target='_blank' style='text-decoration:underline;color:blue'>Disable " + Configuration.gConfigPortfolio + "</a>";
            msg += "&nbsp;to know more on working and benefits of these features.";
            Configuration.alertBoxforPortfolio(msg);

        }
        else {
            Configuration.alertBox(Configuration.gConfigPortfolio + " disabled successfully!");
            var PortfolioList = jP.Lists.setSPObject(Configuration.SiteURL, 'Portfolio');
            var state = '';
            if (Configuration.portfolioFlag != $("input[name='portfolioOption']:checked").val()) {
                var portObj = new Array();
                if (Configuration.gPortfolioID != '') {
                    portObj.push({
                        "ID": Configuration.gPortfolioID,
                        "EnablePortfolio": $("input[name='portfolioOption']:checked").val()
                    });
                }
                else {
                    portObj.push({
                        "EnablePortfolio": $("input[name='portfolioOption']:checked").val()
                    });
                }
                var r = PortfolioList.updateItem(portObj);
                Configuration.isPortfolioOn = false;
                Configuration.gPortfolioID = r.ID;
                Configuration.portfolioFlag = 0;
            }
            /*For change of version for Portfolio by Mohini DT:08-05-2014*/
            $('#tab1 div table tr:eq(1)').hide(); //to hide the version field of config tab
            $('#tab2 div div table tr:eq(1)').hide();//to hide the version field of US tab
            $('#tab3 div table tr:eq(1)').hide();//to hide the version field of DL tab
            $('#tab4 div div table tbody tr:eq(1)').hide();//to hide the version field of PD tab
            $('#GSVersionField').hide();//to hide the version field of GS tab	
            $('#ProjectOptions').text('Project Level Options:');
            $('#UATStatistic').css('margin-top', '-204px');
        }

        //}


    },
    /*For change of version for Portfolio by Mohini DT:08-05-2014*/
    alertBoxforPortfolio: function (msg) {
        // Main.showLoading();
        $("#divAlert2").html(msg);
        $('#divAlert2').dialog({
            height: 150,
            modal: true,
            close: function (ev, ui) {
                if (Configuration.portfolioFlag != 1)
                    $('input[id="portfolioOption' + Configuration.portfolioFlag).attr('checked', 'checked');
            },
            buttons: {
                "Yes": function () {
                    Main.showLoading();
                    $('#appDiv').hide();
                    $('#EnPortf').show();
                    $('#tab5dropdown').css('margin-top', '5px');
                    var PortfolioList = jP.Lists.setSPObject(Configuration.SiteURL, 'Portfolio');
                    var state = '';
                    if (Configuration.portfolioFlag != $("input[name='portfolioOption']:checked").val()) {
                        var portObj = new Array();
                        if (Configuration.gPortfolioID != '') {
                            portObj.push({
                                "ID": Configuration.gPortfolioID,
                                "EnablePortfolio": $("input[name='portfolioOption']:checked").val()
                            });
                        }
                        else {
                            portObj.push({
                                "EnablePortfolio": $("input[name='portfolioOption']:checked").val()
                            });
                        }
                        var r = PortfolioList.updateItem(portObj);
                        Configuration.isPortfolioOn = true;
                        Configuration.gPortfolioID = r.ID;
                        Configuration.portfolioFlag = 1;

                        Configuration.onPageLoad();
                        Configuration.populateTestPassForTester();
                        /*For change of version for Portfolio by Mohini DT:08-05-2014*/
                        $('#tab1 div table tr:eq(1)').show(); //to show the version field of config tab
                        $('#tab2 div div table tr:eq(1)').show();//to show the version field of US tab
                        $('#tab3 div table tr:eq(1)').show();//to show the version field of DL tab
                        $('#tab4 div div table tbody tr:eq(1)').show();//to show the version field of PD tab
                        $('#GSVersionField').show();//to show the version field of GS tab
                        $('#ProjectOptions').text('Version Level Options:');
                        $('#UATStatistic').css('margin-top', '-140px');
                    }

                    $(this).dialog("close");
                    Main.hideLoading();

                },
                "No": function () {
                    $('input[id="portfolioOption' + Configuration.portfolioFlag).attr('checked', 'checked');
                    $(this).dialog("close");

                }
            }



        });
        // Main.hideLoading();
    }

}