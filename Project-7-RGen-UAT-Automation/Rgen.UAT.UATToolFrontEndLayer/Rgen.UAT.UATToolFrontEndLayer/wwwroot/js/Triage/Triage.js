
/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var TestCasecount = 0;
function CreateExcelSheet() {
    if (Triage.validation()) {
        if ($('#projSelect').val() == "select") {
            $('#dialog').text('Please select ' + Triage.gConfigProject);
            $('#dialog').dialog({ height: 125, modal: true, title: "Triage", buttons: { "Ok": function () { $(this).dialog("close"); } } });
            Main.hideLoading();

        }
        else {
            Main.showLoading();

            if (Triage.isPortfolioOn) {
                var proj = $('#versionSelect option:selected').val();
            }
            else {
                var proj = $('#projSelect option:selected').val();
            }

            Triage.getExportTable(proj);
            window.setTimeout("Main.hideLoading()", 400);
        }
    }
    else
        Main.hideLoading();
}

var Triage = {
    SiteURL: "",
    ScenarioInfo: "",
    gTestPassID: "",
    col: 4,
    Page: new Array(),
    //RoleNameForRoleID:new Array(),
    sBulleteChar: 'Ø,v,ü',   //Added by Nikhil
    prjctDescForPID: new Array(),
    noTCAvailable: 0,
    allTestPass: [],
    TPIDForTSID: new Array(),
    testStepDate: new Array(), // Added by shilpa

    //Portfolio Variable
    getVerByProjName: new Array(),
    isPortfolioOn: false,
    getProjectNameByPid: new Array(),

    imageURL: "",
    ForPIDGetDetails: new Array(),//:SD
    RolesForSPUserID: new Array(),//:SD
    RoleNameForRoleID: new Array(),//:SD
    ForTPIDGetDetails: new Array(),//:SD

    gTesterRoleList: new Array(),// added by Rasika
    gTestPassList: new Array(),// added by Rasika
    testStepList: new Array(), // added by Rasika
    testStepListMapping: new Array(), // added by Rasika
    testStepListIndex: 0,// added by Rasika


    //Variable defined for Auto SUggestion 
    hdn_SpuserId: '',
    owner: '',
    hdn_EmailId: '',
    hdn_alias: '',
    setOwnerValue: function () {
        var ele = $('#Auto_Hdn').val();
        if (ele.trim() != '') {
            hdn_SpuserId = ele.split('|')[1]
            ownerName = ele.split('|')[0]
            hdn_EmailId = ele.split('|')[2]
            hdn_alias = "i:0#.f|membership|" + ele.split('|')[2]
            gPrincipalType = 'User'
        }
    },


    /******Variable defined for resource file by Mohini*******/
    gConfigProject: 'Project',
    gConfigTestPass: 'Test Pass',
    gConfigTestStep: 'Test Step',
    gConfigTestCase: 'Test Case',
    gConfigTester: 'Tester',
    gConfigAction: 'Action',
    gConfigTemplate: 'Template',
    gConfigStartDate: 'Start Date',
    gConfigEndDate: 'End Date',
    gConfigStatus: 'Status',
    gConfigLead: 'Lead',
    gConfigManager: 'Manager',
    gConfigRole: 'Role',
    gConfigSequence: 'Sequence',
    gConfigExpectedResult: 'Expected Result',
    gConfigActualresult: 'Actual Result',
    gConfigTriage: 'Triage',
    gConfigVersion: 'Version',
    gConfigTestManager: 'Test Manager',
    glblBug: '',
    glblvstfb: '',
    onLoadgss: new Array(),
    gPageIndex: 0,
    init: function () {

        /*******Added by Mohini For resource file*********/
        if (resource.isConfig.toLowerCase() == 'true') {
            Triage.gConfigProject = resource.gPageSpecialTerms['Project'] == undefined ? 'Project' : resource.gPageSpecialTerms['Project'];
            Triage.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] == undefined ? 'Test Pass' : resource.gPageSpecialTerms['Test Pass'];
            Triage.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] == undefined ? 'Test Case' : resource.gPageSpecialTerms['Test Case'];
            Triage.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] == undefined ? 'Test Step' : resource.gPageSpecialTerms['Test Step'];
            Triage.gConfigTester = resource.gPageSpecialTerms['Tester'] == undefined ? 'Tester' : resource.gPageSpecialTerms['Tester'];
            Triage.gConfigAction = resource.gPageSpecialTerms['Action'] == undefined ? 'Action' : resource.gPageSpecialTerms['Action'];
            Triage.gConfigTemplate = resource.gPageSpecialTerms['Template'] == undefined ? 'Template' : resource.gPageSpecialTerms['Template'];
            Triage.gConfigStartDate = resource.gPageSpecialTerms['Start Date'] == undefined ? 'Start Date' : resource.gPageSpecialTerms['Start Date'];
            Triage.gConfigEndDate = resource.gPageSpecialTerms['End Date'] == undefined ? 'End Date' : resource.gPageSpecialTerms['End Date'];
            Triage.gConfigStatus = resource.gPageSpecialTerms['Status'] == undefined ? 'Status' : resource.gPageSpecialTerms['Status'];
            Triage.gConfigLead = resource.gPageSpecialTerms['Lead'] == undefined ? 'Lead' : resource.gPageSpecialTerms['Lead'];
            Triage.gConfigManager = resource.gPageSpecialTerms['Test Manager'] == undefined ? 'Test Manager' : resource.gPageSpecialTerms['Test Manager'];
            Triage.gConfigRole = resource.gPageSpecialTerms['Role'] == undefined ? 'Role' : resource.gPageSpecialTerms['Role'];
            Triage.gConfigSequence = resource.gPageSpecialTerms['Sequence'] == undefined ? 'Sequence' : resource.gPageSpecialTerms['Sequence'];
            Triage.gConfigExpectedResult = resource.gPageSpecialTerms['Expected Result'] == undefined ? 'Expected Result' : resource.gPageSpecialTerms['Expected Result'];
            Triage.gConfigActualresult = resource.gPageSpecialTerms['Actual Result'] == undefined ? 'Actual Result' : resource.gPageSpecialTerms['Actual Result'];
            Triage.gConfigTriage = resource.gPageSpecialTerms['Triage'] == undefined ? 'Triage' : resource.gPageSpecialTerms['Triage'];
            Triage.gConfigVersion = resource.gPageSpecialTerms['Version'] == undefined ? 'Version' : resource.gPageSpecialTerms['Version'];
            Triage.gConfigTestManager = resource.gPageSpecialTerms['Test Manager'] == undefined ? 'Test Manager' : resource.gPageSpecialTerms['Test Manager'];
        }

        //For bug id 11779 Mohini Dt:14-05-2014
        Triage.glblBug = $('#bug').text().substr(0, $('#bug').text().length - 2);
        Triage.glblvstfb = $('#vstfb').text().substr(0, $('#vstfb').text().length - 2);
        $('#FailTPmg').html("<b>Note:</b> This page shows only all &#39;Fail&#39; results for all " + Triage.gConfigTestPass + "es.");
        /*************************************/
        $('#versionSelect').html('<option>Select ' + Triage.gConfigVersion + '</option>');
        /****************************************/

        try {

            $("ul li a:eq(7)").attr('class', 'selHeading');

            $("a [title='Check Names']").hide();
            if (isRootWeb)
                $("#closedDate").datepicker({
                    minDate: 0,
                    showOn: "button",
                    buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
                    buttonImageOnly: true,
                    dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true
                });
            else
                $("#closedDate").datepicker({
                    minDate: 0,
                    showOn: "button",
                    buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
                    buttonImageOnly: true,
                    dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true
                });

            $(".ui-datepicker-trigger").css('margin-left', '10px');
            $(".ui-datepicker-trigger").attr('title', 'Select Date'); //added by shilpa
            $(".ms-inputuserfield").css("border", "1px #ccc solid"); // for bug 6199

            /****Added by Mohini for resource flie******/
            $('#hTestCase').html(Triage.gConfigTestStep + '(s)');
            $('#hTestPass').html(Triage.gConfigTestPass + ' Details');
            /*******************/

            //Fill Project DropDown
            Triage.fillProjectDDPortfolio();

            var splitUrl = window.location.href.split("?");
            var pid = "";
            var tpid = "";
            var ver = "";

            if (splitUrl[1] != null || splitUrl[1] != undefined) {
                if (splitUrl[1].indexOf('&') != -1) {
                    var splitUrlAmp = splitUrl[1].split("&");

                    pid = $.trim(splitUrlAmp[0].split("=")[1]);
                    tpid = $.trim(splitUrlAmp[1].split("=")[1]);
                }
            }
            if (pid != "") {

                $('#projectName').text(Triage.gConfigProject + ' -');//Added by Mohini for Resource flie
                $('#projectName').append('<span>(#ID: )</span)');
                $('#projDesc').empty();
                $('#scenSelect').empty();

                $('#thisScenario').empty();
                $('#tester').empty();
                //$('#scenario').empty();
                $("#Pagination").hide();
                $("#testStepDetails").empty();

                $('#hTestCase').hide();
                $('#dvProjectDetails').hide();

                $('#projectName').text(Triage.gConfigProject + ' -' + $("#projSelect option:selected").attr("title"));//Added by Mohini for Resource flie
                $('#projectName').attr('title', $("#projSelect option:selected").attr("title"));
                $('#projectName').append('<span>(#ID: ' + pid + ')</span)');

            }

            if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
            {
                //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                var NoOfVer = 0;
                var data = Triage.getVerByProjName[$('#projSelect option:selected').attr("title")];
                if (data != undefined)
                    NoOfVer = data.length;

                var verOptions = '';

                for (var i = 0; i < NoOfVer; i++) {
                    verOptions += '<option value="' + data[i]["ProjectID"] + '">' + data[i]["Version"] + '</option>'
                }
                if (verOptions == "" && $("#projSelect option:selected").text() != "Select " + Triage.gConfigProject && $("#projSelect option:selected").text() != "No " + Triage.gConfigProject + " 					Available")//modify by Mohini DT:`4-05-2014
                    verOptions = '<option>Default ' + Triage.gConfigVersion + '</option>';
                else {
                    if ($("#projSelect option:selected").text() != "No " + Triage.gConfigProject + " Available")
                        verOptions = '<option>Select ' + Triage.gConfigVersion + '</option>';
                    else
                        verOptions = '<option>No ' + Triage.gConfigVersion + ' Available</option>';
                }

                $("#versionSelect").html(verOptions);
                //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014

                //code added by Ejaz Waquif for Portfolio DT2/12/2014
                if (ver != "")
                    $("#versionSelect option[value='" + ver + "']").attr("selected", "selected");
            }

            if ($('#projSelect').val() == "select") {
                $('#scenSelect').append('<option value="0">Select ' + Triage.gConfigTestPass + '</option>');//Added by Mohini for Resource flie
                $('#tester').append('<option value="0">Select ' + Triage.gConfigTester + '</option>');//Added by Mohini for Resource flie	
                $('#roleList').html('<option value="0" selected="selected">Select ' + Triage.gConfigRole + '</option>');//:SD     
            }

            //On Change Project Area Fill 
            $('#projSelect').change(function (e) {

                Triage.allTestPass = new Array();
                var selected = this.value;
                if (selected == 'select') {
                    //$('#projectName').text('Project -');
                    $('#projectName').text(Triage.gConfigProject + ' -');//Added by Mohini for Resource flie
                    $('#projectName').append('<span>(#ID: )</span)');
                    $('#projDesc').empty();
                    $('#scenSelect').val(0);
                    $('#thisScenario').empty();
                    $('#tester').val(0);
                    //$('#scenario').empty();
                    $("#Pagination").hide();
                    $("#testStepDetails").empty();

                    //For Role dropdown:SD
                    $('#roleList').empty();
                    $('#roleList').html('<option value="0" selected="selected">Select ' + Triage.gConfigRole + '</option>');
                    //Added by HRW
                    //$('#scenSelect').html('<option value="0" selected="selected">Select Test Pass</option>');
                    $('#scenSelect').html('<option value="0" selected="selected">Select ' + Triage.gConfigTestPass + '</option>');//Added by Mohini for Resource flie

                    //$('#tester').html('<option value="0" selected="selected">Select Tester</option>');
                    $('#tester').html('<option value="0" selected="selected">Select ' + Triage.gConfigTester + '</option>');//Added by Mohini for Resource flie
                    $('#versionSelect').html('<option value="0" selected="selected">Select ' + Triage.gConfigVersion + '</option>');

                    $('#hTestCase').hide();
                    $('#dvProjectDetails').hide();
                }
                else {
                    if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                    {
                        //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                        var NoOfVer = 0;
                        var data = Triage.getVerByProjName[$('#projSelect option:selected').attr("title")];
                        if (data != undefined)
                            NoOfVer = data.length;

                        var verOptions = '';

                        for (var i = 0; i < NoOfVer; i++) {
                            verOptions += '<option value="' + data[i]["ProjectID"] + '">' + data[i]["Version"] + '</option>'
                        }

                        if (verOptions == "")
                            verOptions = '<option>Default ' + Triage.gConfigVersion + '</option>';

                        $("#versionSelect").html(verOptions);
                        //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                    }


                    //Code Modified By swapnil kamle on 2/8/2012
                    //$('#projectName').text('Project -');
                    $('#projectName').text(Triage.gConfigProject + ' -');//Added by Mohini for Resource flie
                    $('#projectName').append('<span>(#ID: )</span)');
                    $('#projDesc').empty();
                    $('#scenSelect').empty();

                    $('#thisScenario').empty();
                    $('#tester').empty();
                    //$('#scenario').empty();
                    $("#Pagination").hide();
                    $("#testStepDetails").empty();

                    $('#hTestCase').hide();
                    $('#dvProjectDetails').hide();

                    $('#projectName').text(Triage.gConfigProject + ' -' + this.options[this.selectedIndex].title);//Added by Mohini for Resource flie
                    $('#projectName').attr('title', this.options[this.selectedIndex].title);
                    $('#projectName').append('<span>(#ID: ' + this.value + ')</span)');

                    if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                        Triage.getScenarios($("#versionSelect option:selected").val());
                    else
                        Triage.getScenarios($("#projSelect option:selected").val());

                    /* Added for prj desc */
                    var projectDesc = Triage.prjctDescForPID[selected];
                    if (projectDesc == '-' || projectDesc == undefined || projectDesc == "")
                        projectDesc = 'No Description Available';
                    $('#projDesc').text(projectDesc);
                    /* */

                    Triage.getTester($('#scenSelect option:selected').val());
                }
            });
            //End On Change Project Area Fill

            //On Change project version Area Fill
            $("#versionSelect").change(function () {

                Triage.getScenarios($("#versionSelect option:selected").val());

                Triage.getTester($('#scenSelect option:selected').val());

                $('#projectName').text('Project -');
                $('#projectName').append('<span>(#ID: )</span)');
                $('#projDesc').empty();
                //$('#scenSelect').empty();

                $('#thisScenario').empty();
                //$('#tester').empty();
                //$('#scenario').empty();
                $("#Pagination").hide();
                $("#testStepDetails").empty();

                $('#hTestCase').hide();
                $('#dvProjectDetails').hide();
            });


            //On Change Scenario Area Fill
            $('#scenSelect').change(function (e) {
                var selectedScenario = this.value;
                if (selectedScenario == 'select') {
                    // alert('select scenario');
                }
                else {
                    Triage.getTester($('#scenSelect option:selected').val());

                }
            });
            //End On Change Scenario Area Fill

            //On Tester change fill roles:SD
            $('#tester').change(function (e) {
                try {
                    $("#roleList").empty();
                    var temp = '<option value="' + 0 + '">All ' + Triage.gConfigRole + '</option>';
                    $('#roleList').append(temp);

                    if ($("#tester").val() == 0) {
                        var roleIDs = new Array();
                        for (var ii = 1; ii < $('#tester option').length; ii++) {
                            var roles = Triage.RolesForSPUserID[$('#tester option').eq(ii).val()].toString().split(",");
                            for (var i = 0; i < roles.length; i++) {
                                if ($.inArray(roles[i], roleIDs) == -1) {
                                    var temp = '<option title="' + Triage.RoleNameForRoleID[roles[i]] + '" 								                                 value="' + roles[i] + '">' + trimText(Triage.RoleNameForRoleID[roles[i]].toString(), 16) + '</option>';
                                    $("#roleList").append(temp);
                                    roleIDs.push(roles[i]);
                                }
                            }
                        }
                    }
                    else if ($("#tester").val() != 0) {
                        var roleIDs = new Array();
                        var roles = Triage.RolesForSPUserID[$("#tester").val()].toString().split(",");
                        for (var i = 0; i < roles.length; i++) {
                            if ($.inArray(roles[i], roleIDs) == -1) {
                                var temp = '<option title="' + Triage.RoleNameForRoleID[roles[i]] + '" value="' + roles[i] + '">' + trimText(Triage.RoleNameForRoleID[roles[i]].toString(), 16) + '</option>';
                                $("#roleList").append(temp);
                                roleIDs.push(roles[i]);
                            }
                        }
                    }
                }
                catch (e) {

                }
            });


        } catch (e) { }
        if (pid != "") {
            $("#projSelect [title='" + Triage.getProjectNameByPid[pid][0] + "']").attr("selected", "selected");
            $("#projSelect").change();
            if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
            {
                $("#versionSelect [value='" + pid + "']").attr("selected", "selected");
                $("#versionSelect").change();
            }
            $("#scenSelect [value='" + tpid + "']").attr("selected", "selected");
            $("#scenSelect").change();
            Triage.showTesterData();

        }

    },

    fillProjectDDPortfolio: function () {
        try {
            var temp = '';
            var projectName = '';
            var projectDD = new Array();
            var ProjectNames = new Array();

            //To clear global variable:SD
            if (Triage.ForPIDGetDetails != undefined)
                Triage.ForPIDGetDetails.splice(0, Triage.ForPIDGetDetails.length);

            $('#projSelect').empty();
            temp = '<option value="select">Select ' + Triage.gConfigProject + '</option>';//Added by Mohini for resource File
            $('#projSelect').append(temp);

            var result = ServiceLayer.GetData("GetTestPassTriagePage", null, "Triage");

            if (result != undefined)
                $.merge(ProjectNames, result);

            //if((ProjectNames != undefined) && (ProjectNames!= null))
            if (ProjectNames.length != 0) {
                var PIDS = new Array();
                var tempProjName = new Array();
                var projectID = '';

                for (var i = 0; i < ProjectNames.length ; i++) {
                    projectID = ProjectNames[i]['projectId'];
                    Triage.prjctDescForPID[projectID] = ProjectNames[i]['projectDescription'];

                    if ($.inArray(projectID, PIDS) == -1) {
                        PIDS.push(projectID);
                        projectName = ProjectNames[i]['projectName'].toString();

                        sProNameTrimed = trimText(projectName, 32);
                        temp = '<option title="' + projectName + '" value="' + projectID + '">' + sProNameTrimed + '</option>';

                        Triage.getProjectNameByPid[projectID] = new Array();
                        Triage.getProjectNameByPid[projectID].push(projectName);


                        //Code for portfolio changes :Ejaz Waquif DT:1/23/2014
                        if ($.inArray(projectName, tempProjName) == -1) {
                            tempProjName.push(projectName);
                            if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                            {
                                //To set project version list by project name 		                            
                                var version = ProjectNames[i]['projectVersion'] == null || ProjectNames[i]['projectVersion'] == undefined ? "Default " + Triage.gConfigVersion : ProjectNames[i]['projectVersion'];//Added by Mohini for Resource file
                                Triage.getVerByProjName[ProjectNames[i]['projectName']] = new Array();
                                Triage.getVerByProjName[ProjectNames[i]['projectName']].push({
                                    "Version": version,
                                    "ProjectID": ProjectNames[i]['projectId']

                                });

                                //To set testpass list by project id	
                                var testPassList = ProjectNames[i]['testPassList'] == null || ProjectNames[i]['testPassList'] == undefined ? "Default " + Triage.gConfigTestPass : ProjectNames[i]['testPassList'];

                                Triage.gTestPassList[ProjectNames[i]['projectId']] = new Array();
                                Triage.gTestPassList[ProjectNames[i]['projectId']].push({

                                    "ProjectName": ProjectNames[i]['projectName'],
                                    "TestPassList": testPassList

                                });
                            }
                            $('#projSelect').append(temp);

                        }
                        else {
                            if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                            {
                                //To set project version list by project name
                                var version = ProjectNames[i]['projectVersion'] == null || ProjectNames[i]['projectVersion'] == undefined ? "Default " + Triage.gConfigVersion : ProjectNames[i]['projectVersion'];//Added by Mohini for Resource file

                                Triage.getVerByProjName[ProjectNames[i]['projectName']].push({
                                    "Version": version,
                                    "ProjectID": ProjectNames[i]['projectId']

                                });

                                //To set testpass list by project id
                                var testPassList = ProjectNames[i]['testPassList'] == null || ProjectNames[i]['testPassList'] == undefined ? "Default " + Triage.gConfigTestPass : ProjectNames[i]['testPassList'];
                                Triage.gTestPassList[ProjectNames[i]['projectId']] = new Array();
                                Triage.gTestPassList[ProjectNames[i]['projectId']].push({

                                    "ProjectName": ProjectNames[i]['projectName'],
                                    "TestPassList": testPassList

                                });
                            }

                        }
                        //End of Code for portfolio changes :Ejaz Waquif DT:1/23/2014
                    }

                    //To keep project details in global variable as per projectId :SD
                    Triage.ForPIDGetDetails[ProjectNames[i]['projectId']] = ProjectNames[i];
                }
            }
            if (ProjectNames.length == 0) // shilpa 30 apr bug 7843
            {
                $('#projSelect').html('<option>No ' + Triage.gConfigProject + ' Available</option>');
                $('#scenSelect').html('<option>No ' + Triage.gConfigTestPass + ' Available</option>');
                $('#tester').html('<option>No ' + Triage.gConfigTester + ' Alloted</option>');
                $('#roleList').html('<option value="0" selected="selected">No ' + Triage.gConfigRole + '</option>'); //added by Rasika

            }
        }
        catch (e) { }
    },

    // get All Test Passes for drop down
    getScenarios: function (selected) {
        try {
            var temp = '';
            var TPName = '';
            var TPID = new Array();

            var securityIdsForProject = new Array();
            $('#scenSelect').empty();
            Triage.allTestPass = new Array();

            var ScenarioItems = Triage.gTestPassList[selected];
            if ((ScenarioItems != undefined) && (ScenarioItems != null)) {
                if (ScenarioItems[0]['TestPassList'].length != 0) {
                    $('#scenSelect').append('<option value="0">All ' + Triage.gConfigTestPass + '</option>');//Added by Mohini for Resource flie

                    //Triage.allTestPass = new Array();
                    for (var ii = 0; ii < ScenarioItems[0]['TestPassList'].length; ii++) {
                        TPID = ScenarioItems[0]['TestPassList'][ii].testpassId;
                        TPName = ScenarioItems[0]['TestPassList'][ii].testpassName;
                        tpNameTrimed = trimText(TPName, 32);
                        temp = '<option title="' + TPName + '" value="' + TPID + '">' + tpNameTrimed + '</option>';

                        $('#scenSelect').append(temp);

                        //code added by Ejaz Waquif to fill all TP in one array DT:1/2/2014
                        //Triage.allTestPass.push(TPID+","+TPName);

                        Triage.ForTPIDGetDetails[ScenarioItems[0]['TestPassList'][ii].testpassId] = ScenarioItems[0]['TestPassList'][ii];//:SD

                        //To collect tester with their role by testPassId
                        Triage.gTesterRoleList[TPID] = new Array();
                        Triage.gTesterRoleList[TPID].push({
                            "testpassId": ScenarioItems[0]['TestPassList'][ii].testpassId,
                            "testpassName": ScenarioItems[0]['TestPassList'][ii].testpassName,
                            "tester": ScenarioItems[0]['TestPassList'][ii].tester
                        });
                    }

                    //$('#tester').append('<option value="0">Select Tester</option>');
                    $('#tester').append('<option value="0">Select ' + Triage.gConfigTester + '</option>');//Added by Mohini for Resource flie
                }
                else {
                    $('#scenSelect').append('<option value="0">No ' + Triage.gConfigTestPass + ' Available</option>');//Added by Mohini for Resource flie
                    $('#tester').append('<option value="0">No ' + Triage.gConfigTester + ' Alloted</option>');//Added by Mohini for Resource flie	
                }

            }
            else {
                $('#scenSelect').append('<option value="0">No ' + Triage.gConfigTestPass + ' Available</option>');//Added by Mohini for Resource flie
                $('#tester').append('<option value="0">No ' + Triage.gConfigTester + ' Alloted</option>');//Added by Mohini for Resource flie	         
            }

        } catch (e) { }
    },
    // get tester for selected testpass
    getTester: function (selected) {
        try {
            $('#tester').empty();
            var temp = '';
            var TesterID = '';
            var TesterName = '';
            var TesterList = '';
            var TesterQuery = '';
            var TesterItems = new Array();
            var RoleList = '';//:SD
            var testerIDArr = new Array();//:SD
            var roleIDArr = new Array();//:SD

            var gTesterList = new Array();//Added by rasika

            /* if(selected!='0' && selected!=0)
             {
                 //Collect tester and their roles of the selected test passes 
                 if(Triage.gTesterRoleList[selected]!=undefined)
                 {
                     gTesterList.push(Triage.gTesterRoleList[selected]);
                 }
 
             }
             else
             {
                 //Collect tester and their roles of all the test passes present in drop-down
                 $('#scenSelect option').each(function (ind, itm)
                 {
                        var value = itm.value;
                        if(Triage.gTesterRoleList[value]!=undefined)
                        {
                             gTesterList.push(Triage.gTesterRoleList[value]);
                        }
                
                 });
 
             }
             
            if(gTesterList.length!=0)
            {
                 //To collect tester list of selected test pass
                 if(selected!='0' && selected!=0)
                 {
                         var count=0;     	
                         if(gTesterList[0][0]['testpassId']==selected)
                         {
                             for(var j=0;j<gTesterList[0][0]['tester'].length;j++)
                             {
                                 TesterItems[count]=gTesterList[0][0]['tester'][j];
                                 count++;
 
                             }
                         }
                 }
                 else
                 {
                     var count=0;
                     for(var i=0;i<gTesterList.length;i++)
                     {	
                             for(var j=0;j<gTesterList[i][0]['tester'].length;j++)
                             {
                                 TesterItems[count]=gTesterList[i][0]['tester'][j];
                                 count++;
                             }
                     }
                 }
             }*/

            if (selected != '0' && selected != 0) {
                //Collect tester and their roles of the selected test passes 
                if (Triage.gTesterRoleList[selected] != undefined) {
                    var count = 0;
                    for (var j = 0; j < Triage.gTesterRoleList[selected][0]['tester'].length; j++) {
                        TesterItems[count] = Triage.gTesterRoleList[selected][0]['tester'][j];
                        count++;
                    }
                }

            }
            else {
                var count = 0;
                //Collect tester and their roles of all the test passes present in drop-down
                $('#scenSelect option').each(function (ind, itm) {
                    var value = itm.value;
                    if (Triage.gTesterRoleList[value] != undefined) {
                        for (var j = 0; j < Triage.gTesterRoleList[value][0]['tester'].length; j++) {
                            TesterItems[count] = Triage.gTesterRoleList[value][0]['tester'][j];
                            count++;
                        }
                    }

                });
            }


            //if((TesterItems != undefined) && (TesterItems != null))
            if (TesterItems.length != 0) {
                var flag = 0;
                var count = 0;
                //temp = '<option value="'+0+'">All Tester</option>';
                temp = '<option value="' + 0 + '">All ' + Triage.gConfigTester + '</option>';//Added By Mohini for Resource File
                $('#tester').append(temp);

                $("#roleList").empty();//:SD
                $("#roleList").append('<option value="0">All ' + Triage.gConfigRole + '</option>');//:SD

                Triage.RolesForSPUserID.length = 0;

                for (var ii = 0; ii < TesterItems.length; ii++) {
                    TesterID = TesterItems[ii]['spUserId'];
                    TesterName = TesterItems[ii]['testerName'];

                    //To get unique testers:SD
                    if ($.inArray(TesterID, testerIDArr) == -1) {
                        testerIDArr.push(TesterID);
                        temp = '<option value="' + TesterID + '">' + TesterName + '</option>';
                        $('#tester').append(temp);
                    }

                    //To collect RoleIDs of testers:SD	                    
                    for (var i = 0; i < TesterItems[ii]['roleList'].length; i++) {
                        if ($.inArray(TesterItems[ii]['roleList'][i]['roleId'], roleIDArr) == -1) {
                            roleIDArr.push(TesterItems[ii]['roleList'][i]['roleId']);
                            if (parseInt(TesterItems[ii]['roleList'][i]['roleId']) == 1) {
                                var roleTemp = '<option title="Standard" value="1">Standard</option>';
                                $("#roleList").append(roleTemp);
                                Triage.RoleNameForRoleID[parseInt(TesterItems[ii]['roleList'][i]['roleId'])] = "Standard";
                            }
                            else {
                                temp = '<option title="' + TesterItems[ii]['roleList'][i]['roleName'] + '" value="' + TesterItems[ii]['roleList'][i]['roleId'] + '">' + trimText(TesterItems[ii]['roleList'][i]['roleName'], 16) + '</option>';
                                $("#roleList").append(temp);

                                Triage.RoleNameForRoleID[parseInt(TesterItems[ii]['roleList'][i]['roleId'])] = TesterItems[ii]['roleList'][i]['roleName'];

                            }
                        }

                        if (Triage.RolesForSPUserID[TesterID] == undefined)
                            Triage.RolesForSPUserID[TesterID] = parseInt(TesterItems[ii]['roleList'][i]['roleId']);
                        else
                            Triage.RolesForSPUserID[TesterID] += "," + parseInt(TesterItems[ii]['roleList'][i]['roleId']);
                    }

                }//End of For loop
            }
            else {
                //temp = '<option value="'+0+'">No Tester Alloted</option>';
                temp = '<option value="' + 0 + '">No ' + Triage.gConfigTester + ' Alloted</option>';//Added by Mohini for Resource flie
                $('#tester').append(temp);

                //For Role dropdown:SD
                $('#roleList').empty();
                $('#roleList').html('<option value="0" selected="selected">No ' + Triage.gConfigRole + '</option>');
            }
        } catch (e) { }
    },

    // get Content of Scenario Test Cases and Action   
    forPIDGetResult: new Array(),
    OpenDialogByTestStepPlanID: new Array(),
    testPassShow: 0,
    getScenariosDetails: function (getTestPass) {
        try {
            Triage.testPassShow = 0;
            var temp = '';
            var testinfo = new Array();
            Triage.OpenDialogByTestStepPlanID = new Array();

            //var param = $('#versionSelect option:selected').val() + "/" + _spUserId;
            var param = $('#versionSelect option:selected').val();
            var result = ServiceLayer.GetData("GetTriageDetails", param, "Triage");
            Triage.forPIDGetResult[$('#versionSelect option:selected').val()] = result;

            ///////////////////////  Added by Harshal  /////////////////////////////
            temp += '<table class="gridDetails" cellspacing="0" style="word-wrap:break-word;"><thead>'
                        + '<tr>'
                            + '<td class="tblhd center" style="width:5%">#</td>'
                            + '<td class="tblhd" style="width:17%">Test Pass Name</td>'
                            + '<td class="tblhd" style="width:24%">Description</td>'
                            + '<td class="tblhd" style="width:15%">Test Manager</td>'
                            + '<td class="tblhd" style="width:7%">End Date</td>'
                            + '<td class="tblhd center" style="width:9%">Failed Test Steps</td>'
                        + '</tr>'
                 + '</thead><tbody>';

            var forTPIdgetStatus = new Array();
            var tpids = new Array();
            var tpStatusFail = new Array();
            var testPassDetails = [];
            var resultTP = [];
            if (result != undefined && result != '') {
                var flag = 0;
                var testinfo2 = '';
                resultTP = result;
                ///////////////
                if (getTestPass == 0 && $('#tester').val() == 0 && $('#roleList').val() == 0) {
                    for (var i = 0; i < result.length; i++) {
                        var arr = result[i]['listTriageTestSteps'];

                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j]['roleId'] != '') {

                                //Triage.OpenDialogByTestStepPlanID[arr[j]['teststepPlanId']]=result[i]['listTriageTestSteps'];
                                Triage.OpenDialogByTestStepPlanID[arr[j]['teststepPlanId']] = arr[j];

                                testinfo2 = '';
                                var ExpectedResult = '';
                                if (arr[j]['expectedResult'] != undefined && arr[j]['expectedResult'] != "")
                                    ExpectedResult = Triage.GetFormatedText(arr[j]['expectedResult'], 'false');
                                else
                                    ExpectedResult = '-';

                                if (arr[j]['actualResult'] != undefined && arr[j]['actualResult'] != "")
                                    var ActualResult = Triage.GetFormatedText(arr[j]['actualResult'], 'false');
                                else
                                    var ActualResult = '-';

                                if (arr[j]['testStepName'] != undefined && arr[j]['testStepName'] != "")
                                    var ActionName = Triage.GetFormatedText(arr[j]['testStepName'], 'false');
                                else
                                    var ActionName = '-';

                                /** Added by shilpa **/
                                //var completeActionName = UATReport.filterData(ActionName);
                                var completeActionName = ActionName.replace(/(\r\n)+/g, '');
                                if (ActionName.indexOf("<") != -1 && ActionName.indexOf(">") != -1)
                                    ActionName = completeActionName;

                                //var completeExpectedResult = UATReport.filterData(ExpectedResult);
                                var completeExpectedResult = ExpectedResult.replace(/(\r\n)+/g, '');
                                if (ExpectedResult.indexOf("<") != -1 && ExpectedResult.indexOf(">") != -1)
                                    ExpectedResult = completeExpectedResult;

                                //var completeActualResult = UATReport.filterData(ActualResult);
                                var completeActualResult = ActualResult.replace(/(\r\n)+/g, '');
                                if (ActualResult.indexOf("<") != -1 && ActualResult.indexOf(">") != -1)
                                    ActualResult = completeActualResult;
                                /** ***/
                                var ActionName1 = Triage.filterData(ActionName);
                                ActionName1 = ActionName1.replace(/"/g, "&quot;");
                                var ExpectedResult1 = Triage.filterData(ExpectedResult);
                                ExpectedResult1 = ExpectedResult1.replace(/"/g, "&quot;");
                                var ActualResult1 = Triage.filterData(ActualResult);
                                ActualResult1 = ActualResult1.replace(/"/g, "&quot;");

                                testinfo2 = testinfo2 + '<tr><td class="center">' + result[i]['testPassId'] + '</td>';
                                testinfo2 = testinfo2 + '<td class="center">' + arr[j]['teststepPlanId'] + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + ActionName1 + '" style="overflow:hidden">' + ActionName + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + arr[j]['roleName'] + '">' + arr[j]['roleName'] + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + ExpectedResult1 + '" style="overflow:hidden">' + ExpectedResult + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + ActualResult1 + '" style="overflow:hidden">' + ActualResult + '</td>';

                                //For bug 
                                var bug = arr[j]['bug'];
                                if (bug != "") {
                                    var title = arr[j]['vstfBugTitle'];
                                    if (bug == "Y")
                                        bug = "Yes";
                                    else
                                        bug = "No";
                                }
                                else {
                                    bug = '-';
                                    var title = '-';
                                }


                                /*For attachment*/
                                if (arr[j]['lstAttachment'].length != 0) {
                                    testinfo2 = testinfo2 + '<td>';
                                    var filepath = 0;
                                    var attachment = arr[j]['lstAttachment'];
                                    for (var vv = 0; vv < attachment.length - 1; vv++) {
                                        /*href="' + attachment[vv]['filePath'] + '"*/
                                        filepath = attachment[vv]['attachmentId'];
                                        testinfo2 = testinfo2 + '<a style="cursor:pointer" onclick="AutoCompleteTextbox._testingPgattchmentdownload( ' + filepath + ');"  target="_blank"><b><font color="#ff6500">' + attachment[vv]['fileName'] + '</font></b></a>,<br/>';
                                    }
                                    /*href="' + attachment[vv]['filePath'] + '"*/
                                    filepath = attachment[vv]['attachmentId'];
                                    testinfo2 = testinfo2 + '<a style="cursor:pointer" onclick="AutoCompleteTextbox._testingPgattchmentdownload( ' + filepath + ');"  target="_blank"><b><font color="#ff6500">' + attachment[vv]['fileName'] + '</font></b></a><br/></td>';
                                    /*testinfo2 = testinfo2+'</td>';	*/

                                }
                               
                                else {
                                    testinfo2 = testinfo2 + '<td>-</td>';
                                }

                                testinfo2 = testinfo2 + '<td>' + result[i]['testerName'] + '</td>';
                                testinfo2 = testinfo2 + '<td id="bug' + arr[j]['teststepPlanId'] + '">' + bug + '</td>';

                                if (arr[j]['vstfBugTitle'] != undefined && arr[j]['vstfBugTitle'] != "")
                                    testinfo2 = testinfo2 + '<td title="' + Triage.replaceSplCharacters2(arr[j]['vstfBugTitle']) + '" id="title' + arr[j]['teststepPlanId'] + '">' + arr[j]['vstfBugTitle'] + '</td>';
                                else
                                    //testinfo2 = testinfo2+'<td>-</td>';
                                    testinfo2 = testinfo2 + '<td title="' + Triage.replaceSplCharacters2(arr[j]['vstfBugTitle']) + '" id="title' + arr[j]['teststepPlanId'] + '">-</td>';

                                if (arr[j]['bug'] != "")
                                    testinfo2 = testinfo2 + '<td class="myActLinkOrng"><div style="float:left;padding:0px"><img src="/images/right.png" 														style="width:20px;padding-top:2px" /></div><a style="color: #0033CC;cursor: pointer;text-decoration: underline;" 															onclick="Triage.OpenTriageDialog(' + arr[j]['teststepPlanId'] + ');" class="myActLinkOrng" id="Triage' + arr[j]['teststepPlanId'] + '">Triaged</a></td></tr>';
                                else
                                    testinfo2 = testinfo2 + '<td class="myActLinkOrng center"><a style="color: #0033CC;cursor: pointer;text-decoration: underline;" 														onclick="Triage.OpenTriageDialog(' + arr[j]['teststepPlanId'] + ');" class="myActLinkOrng" id="Triage' + arr[j]['teststepPlanId'] + '">Triage</a></td></tr>';
                                ////////////
                                if (forTPIdgetStatus[result[i]['testPassId']] == undefined)
                                    forTPIdgetStatus[result[i]['testPassId']] = 0;
                                else {
                                    var status = forTPIdgetStatus[result[i]['testPassId']];
                                    forTPIdgetStatus[result[i]['testPassId']] = parseInt(status) + 1;
                                }
                                testinfo.push(testinfo2);

                            }
                        }
                    }
                }
                else if (getTestPass != 0 && $('#tester').val() != 0) {
                    var s = JSLINQ(result).Where(function (item) { return item.testPassId == getTestPass && item.testerSpuserId == $('#tester').val() });
                    result = s.items;
                    flag = 1;
                }
                else if (getTestPass != 0) {
                    var s = JSLINQ(result).Where(function (item) { return item.testPassId == getTestPass });
                    result = s.items;
                    flag = 1;
                }
                else if ($('#tester').val() != 0) {
                    var s = JSLINQ(result).Where(function (item) { return item.testerSpuserId == $('#tester').val() });
                    result = s.items;

                    //if(result.length==0)
                    //result = resultTP ;				

                    flag = 1;
                }
                else if (getTestPass == 0 && $('#tester').val() == 0 && $('#roleList').val() != 0) {
                    result = resultTP;
                    flag = 1;
                }

                /////////////
                //var status = '';
                totalNC = 0;
                var testPassIds = [];
                if (flag == 1 && result != undefined) {
                    for (var i = 0; i < result.length; i++) {

                        var arr = new Array();
                        arr = result[i]['listTriageTestSteps'];
                        if ($('#roleList').val() != 0) {
                            var s = JSLINQ(arr).Where(function (item) { return item.roleId == $('#roleList').val() });
                            arr = s.items;
                        }

                        for (var j = 0; j < arr.length; j++) {
                            if (arr[j]['roleId'] != '') {
                                testPassIds.push(result[i]['testPassId']);
                                //Triage.OpenDialogByTestStepPlanID[arr[j]['teststepPlanId']]=result[i]['listTriageTestSteps'];
                                Triage.OpenDialogByTestStepPlanID[arr[j]['teststepPlanId']] = arr[j];

                                testinfo2 = '';
                                var ExpectedResult = '';
                                if (arr[j]['expectedResult'] != undefined && arr[j]['expectedResult'] != "")
                                    ExpectedResult = Triage.GetFormatedText(arr[j]['expectedResult'], 'false');
                                else
                                    ExpectedResult = '-';

                                if (arr[j]['actualResult'] != undefined && arr[j]['actualResult'] != "")
                                    var ActualResult = Triage.GetFormatedText(arr[j]['actualResult'], 'false');
                                else
                                    var ActualResult = '-';

                                if (arr[j]['testStepName'] != undefined && arr[j]['testStepName'] != "")
                                    var ActionName = Triage.GetFormatedText(arr[j]['testStepName'], 'false');
                                else
                                    var ActionName = '-';

                                //var completeActionName = UATReport.filterData(ActionName);
                                var completeActionName = ActionName.replace(/(\r\n)+/g, '');
                                if (ActionName.indexOf("<") != -1 && ActionName.indexOf(">") != -1)
                                    ActionName = completeActionName;

                                var completeExpectedResult = ExpectedResult.replace(/(\r\n)+/g, '');
                                if (ExpectedResult.indexOf("<") != -1 && ExpectedResult.indexOf(">") != -1)
                                    ExpectedResult = completeExpectedResult;

                                var completeActualResult = ActualResult.replace(/(\r\n)+/g, '');
                                if (ActualResult.indexOf("<") != -1 && ActualResult.indexOf(">") != -1)
                                    ActualResult = completeActualResult;

                                var ActionName1 = Triage.filterData(ActionName);
                                ActionName1 = ActionName1.replace(/"/g, "&quot;");
                                var ExpectedResult1 = Triage.filterData(ExpectedResult);
                                ExpectedResult1 = ExpectedResult1.replace(/"/g, "&quot;");
                                var ActualResult1 = Triage.filterData(ActualResult);
                                ActualResult1 = ActualResult1.replace(/"/g, "&quot;");

                                testinfo2 = testinfo2 + '<tr><td class="center">' + result[i]['testPassId'] + '</td>';
                                testinfo2 = testinfo2 + '<td class="center">' + arr[j]['teststepPlanId'] + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + ActionName1 + '" style="overflow:hidden">' + ActionName + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + arr[j]['roleName'] + '">' + arr[j]['roleName'] + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + ExpectedResult1 + '" style="overflow:hidden">' + ExpectedResult + '</td>';
                                testinfo2 = testinfo2 + '<td title="' + ActualResult1 + '" style="overflow:hidden">' + ActualResult + '</td>';

                                //For bug 
                                var bug = arr[j]['bug'];
                                if (bug != "") {
                                    var title = arr[j]['vstfBugTitle'];
                                    if (bug == "Y")
                                        bug = "Yes";
                                    else
                                        bug = "No";
                                }
                                else {
                                    bug = '-';
                                    var title = '-';

                                }


                                /*For attachment*/
                                if (arr[j]['lstAttachment'].length != 0) {
                                    testinfo2 = testinfo2 + '<td>';
                                    var filepath = 0;
                                    var attachment = arr[j]['lstAttachment'];
                                    for (var vv = 0; vv < attachment.length - 1; vv++) {
                                        /*href="' + attachment[vv]['filePath'] + '"*/
                                        filepath = attachment[vv]['attachmentId'];
                                        testinfo2 = testinfo2 + '<a style="cursor:pointer" onclick="AutoCompleteTextbox._testingPgattchmentdownload( ' + filepath + ');"  target="_blank"><b><font color="#ff6500">' + attachment[vv]['fileName'] + '</font></b></a>,<br/>';
                                    }
                                    /*href="' + attachment[vv]['filePath'] + '"*/
                                    filepath = attachment[vv]['attachmentId'];
                                    testinfo2 = testinfo2 + '<a style="cursor:pointer" onclick="AutoCompleteTextbox._testingPgattchmentdownload( ' + filepath + ');"  target="_blank"><b><font color="#ff6500">' + attachment[vv]['fileName'] + '</font></b></a><br/></td>';
                                    /*testinfo2 = testinfo2+'</td>';	*/

                                }
                                else {
                                    testinfo2 = testinfo2 + '<td>-</td>';
                                }

                                testinfo2 = testinfo2 + '<td>' + result[i]['testerName'] + '</td>';
                                testinfo2 = testinfo2 + '<td id="bug' + arr[j]['teststepPlanId'] + '">' + bug + '</td>';

                                if (arr[j]['vstfBugTitle'] != undefined && arr[j]['vstfBugTitle'] != "")
                                    testinfo2 = testinfo2 + '<td title="' + Triage.replaceSplCharacters2(arr[j]['vstfBugTitle']) + '" id="title' + arr[j]['teststepPlanId'] + '">' + arr[j]['vstfBugTitle'] + '</td>';
                                else
                                    //testinfo2 = testinfo2+'<td>-</td>';
                                    testinfo2 = testinfo2 + '<td title="' + Triage.replaceSplCharacters2(arr[j]['vstfBugTitle']) + '" id="title' + arr[j]['teststepPlanId'] + '">-</td>';

                                if (arr[j]['bug'] != "")
                                    testinfo2 = testinfo2 + '<td class="myActLinkOrng"><div style="float:left;padding:0px"><img src="/images/right.png" 													style="width:20px;padding-top:2px" /></div><a style="color: #0033CC;cursor: pointer;text-decoration: underline;" 															onclick="Triage.OpenTriageDialog(' + arr[j]['teststepPlanId'] + ');" class="myActLinkOrng" id="Triage' + arr[j]['teststepPlanId'] + '">Triaged</a></td></tr>';
                                else
                                    testinfo2 = testinfo2 + '<td class="myActLinkOrng center"><a style="color: #0033CC;cursor: pointer;text-decoration: underline;" 														onclick="Triage.OpenTriageDialog(' + arr[j]['teststepPlanId'] + ');" class="myActLinkOrng" id="Triage' + arr[j]['teststepPlanId'] + '">Triage</a></td></tr>';
                                if (forTPIdgetStatus[result[i]['testPassId']] == undefined)
                                    forTPIdgetStatus[result[i]['testPassId']] = 0;
                                else {
                                    var status = forTPIdgetStatus[result[i]['testPassId']];
                                    forTPIdgetStatus[result[i]['testPassId']] = parseInt(status) + 1;
                                }
                                testinfo.push(testinfo2);

                            }

                        }
                    }
                }
            }

            var tpIds = [];
            $("#scenSelect option").each(function () {
                if (getTestPass != 0) {
                    tpIds.push(getTestPass);
                    return false;
                }
                else if (($.inArray($(this).val(), testPassIds) != -1 && flag == 1) || flag == 0)
                    tpIds.push($(this).val());

            });

            for (var m = 0; m < tpIds.length; m++) {
                var s = JSLINQ(resultTP).Where(function (item) { return item.testPassId == tpIds[m] });
                result = s.items;
                if (result.length != 0) {
                    Triage.testPassShow = 1;
                    if (result[0]['description'] != null && result[0]['description'] != undefined && result[0]['description'] != '')
                        var description = result[0]['description'];
                    else
                        var description = '-';
                    temp += '<tr style="width:1220px"><td class="center" style="width:5%">' + result[0]['testPassId'] + '</td>';
                    temp += '<td  style="width:17%">' + result[0]['testPassName'] + '</td>';
                    temp += '<td style="width:24%">' + Triage.replaceSplCharacters2(description) + '</td>';
                    temp += '<td style="width:15%">' + result[0]['testMgrName'] + '</td>';
                    due = result[0]['endDate'];
                    var crd = due.slice(0, 10);
                    var dd = crd.split('-');
                    due = dd[0] + '-' + dd[1] + '-' + dd[2];

                    temp += '<td style="width:7%">' + due + '</td>';

                    if (forTPIdgetStatus[result[0].testPassId] != undefined) {
                        var status = forTPIdgetStatus[result[0].testPassId];
                        temp += '<td style="width:9%" class="center">' + (parseInt(status) + 1) + '</td>';
                    }
                    else {
                        temp += '<td style="width:9%" class="center">0</td>';
                    }


                    this.ScenarioInfo = temp + "</tbody></table>";

                }

            }

            ////
            /*	if(tpids.length>0)
                {
                    for(var i=0;i<testPassDetails.length;i++)
                    {
                        if(testPassDetails[i]['description']!=null&&testPassDetails[i]['description']!=undefined&&testPassDetails[i]['description']!='')
                            var description=testPassDetails[i]['description'];
                        else
                            var description='-';	
                        temp+='<tr style="width:1220px"><td class="center" style="width:5%">'+testPassDetails[i]['testPassId']+'</td>';
                        temp+='<td  style="width:17%">'+testPassDetails[i]['testPassName']+'</td>';  
                        temp+='<td style="width:24%">'+Triage.replaceSplCharacters2(description)+'</td>';
                        temp+='<td style="width:15%">'+testPassDetails[i]['testMgrName']+'</td>';
                        due = testPassDetails[i]['endDate'];
                        var crd =  due.slice(0,10);
                        var dd = crd.split('-');
                        due = dd[0]+'-'+dd[1]+'-'+dd[2];
                      
                        temp+='<td style="width:7%">'+due+'</td>';
                        
                        if(forTPIdgetStatus[tpids[i]] != undefined)
                        {
                            var status = forTPIdgetStatus[tpids[i]];
                            temp+='<td style="width:9%" class="center">'+(parseInt(status)+1)+'</td>';
                        }
                        else
                        {
                            temp+='<td style="width:9%" class="center">0</td>';
                        }    
                                         
                    }    
                }
                else if(testPassDetails.length > 0)
                {
                    temp+='<td style="width:14%" class="center">0</td></tr>';
                }
                if(testPassDetails.length > 0 && tpids.length>0)
                    this.ScenarioInfo = temp+"</tbody></table>";
                else if(getTestPass != 0)
                {
                    var s = JSLINQ(resultTP).Where(function(item){return item.testPassId == getTestPass});
                    result = s.items;
                    if(result != undefined)
                    {
                        if(result.length != 0)
                        {
                            if(result[0]['description']!=null&&result[0]['description']!=undefined&&result[0]['description']!='')
                                var description=result[0]['description'];
                            else
                                var description='-';	
                            temp+='<tr style="width:1220px"><td class="center" style="width:5%">'+result[0]['testPassId']+'</td>';
                            temp+='<td  style="width:17%">'+result[0]['testPassName']+'</td>';  
                            temp+='<td style="width:24%">'+Triage.replaceSplCharacters2(description)+'</td>';
                            temp+='<td style="width:15%">'+result[0]['testMgrName']+'</td>';
                            due = result[0]['dueDate']
                            var crd =  due.slice(0,10);
                            var dd = crd.split('-');
                            due = dd[0]+'-'+dd[1]+'-'+dd[2];
                          
                            temp+='<td style="width:7%">'+due+'</td>';
                            
                            if(forTPIdgetStatus[tpids[i]] != undefined)
                            {
                                var status = forTPIdgetStatus[tpids[i]];
                                temp+='<td style="width:9%" class="center">'+(parseInt(status)+1)+'</td>';
                            }
                            else
                            {
                                temp+='<td style="width:9%" class="center">0</td>';
                            }  									    
                            this.ScenarioInfo = temp+"</tbody></table>";
                        }
                        else
                            this.ScenarioInfo = '';
                    }
                    else
                        this.ScenarioInfo = '';
                }
                else
                 this.ScenarioInfo = '';*/

            return testinfo;
        }
        catch (ex) {
        }

    },

    OpenTriageDialog: function (teststepPlanId) {
        try {
            var TriageResult = Triage.OpenDialogByTestStepPlanID[teststepPlanId];



            //if(TriageResult != null && TriageResult != undefined)
            if ((TriageResult.bug == "Y") || (TriageResult.bug == "N")) {
                if (TriageResult.bug == "Y") {
                    $('input:radio[name=Bug]:eq(0)').attr("checked", "checked");
                    //for bug id 11987 DT:17-06-2014
                    $("#ownertr").css('display', '');
                    $("#priottr").css('display', '');
                    $("#severttr").css('display', '');
                    $("#vstbugtr").css('display', '');
                    $("#vstfbuglinktr").css('display', '');
                }
                else {
                    $('input:radio[name=Bug]:eq(1)').attr("checked", "checked");
                    //for bug id 11987 DT:17-06-2014
                    $("#ownertr").css('display', 'none');
                    $("#priottr").css('display', 'none');
                    $("#severttr").css('display', 'none');
                    $("#vstbugtr").css('display', 'none');
                    $("#vstfbuglinktr").css('display', 'none');

                }

                if (TriageResult.triageDetails != "" && TriageResult.triageDetails != undefined)
                    $("#details").val(TriageResult.triageDetails);
                else
                    $("#details").val('');

                if (TriageResult.owner != "" && TriageResult.owner != undefined)
                    $("#Owner").val(TriageResult.owner);
                else
                    $("#Owner").text('');

                if (TriageResult.testingDate != "" && TriageResult.testingDate != undefined) {
                    $('#testingDate').val(TriageResult.testingDate);
                    /*var oldDate=TriageResult.testingDate.toString();
                    var sliceDate = oldDate.slice(0,10);
                    sliceDate =sliceDate.split("-");		
                    document.getElementById('testingDate').value = sliceDate [1]+'/'+sliceDate [0]+'/'+sliceDate [2];*/

                }
                else
                    $('#testingDate').val('');

                if (TriageResult.triagestatus != "" && TriageResult.triagestatus != undefined) {

                    switch (TriageResult.triagestatus) {
                        case 'T': TriageResult.triagestatus = "Triaged";
                            break;
                        case 'R': TriageResult.triagestatus = "Resolved";
                            break;
                        case 'C': TriageResult.triagestatus = "Closed";
                            break;

                    }

                    $("#status option").each(function () {
                        if (trim($(this).text()) == trim(TriageResult.triagestatus))
                            $(this).attr("selected", "selected");
                    });
                }
                else {
                    $("#status option").each(function () {
                        if (trim($(this).text()) == "Select Status")
                            $(this).attr("selected", "selected");
                    });

                }

                if (TriageResult.priority != "" && TriageResult.priority != undefined) {
                    $("#priority option").each(function () {
                        if (trim($(this).text()) == trim(TriageResult.priority))
                            $(this).attr("selected", "selected");
                    });
                }
                else {
                    $("#priority option").each(function () {
                        if (trim($(this).text()) == "Select Priority")
                            $(this).attr("selected", "selected");
                    });

                }

                if (TriageResult.severity != "") {
                    switch (TriageResult.severity) {
                        case 'C': TriageResult.severity = "Critical";
                            break;
                        case 'H': TriageResult.severity = "High";
                            break;
                        case 'M': TriageResult.severity = "Medium";
                            break;
                        case 'L': TriageResult.severity = "Low";
                            break;

                    }

                    $("#severity option").each(function () {
                        if (trim($(this).text()) == trim(TriageResult.severity))
                            $(this).attr("selected", "selected");
                    });
                }
                else {
                    $("#severity option").each(function () {
                        if (trim($(this).text()) == "Select Severity")
                            $(this).attr("selected", "selected");
                    });

                }

                if (TriageResult.dateClosed != "" && TriageResult.dateClosed != undefined) {
                    /*var oldDate=TriageResult.dateClosed.toString();
                    var sliceDate = oldDate.slice(0,10);
                    sliceDate =sliceDate.split("-");		
                    document.getElementById('closedDate').value = sliceDate [1]+'/'+sliceDate [0]+'/'+sliceDate [2];*/
                    document.getElementById('closedDate').value = TriageResult.dateClosed;

                }
                else
                    document.getElementById('closedDate').value = '';


                if (TriageResult.vstfBugTitle != "" && TriageResult.vstfBugTitle != undefined)
                    $("#title").val(TriageResult.vstfBugTitle);
                else
                    $("#title").val('');

                if (TriageResult.vstfBugLink != "" && TriageResult.vstfBugLink != undefined)
                    $("#url").val(TriageResult.vstfBugLink);
                else
                    $("#url").val('');


            }
            else {
                //$('#testingDate').val(Triage.testStepDate[childID]); // Added by shilpa
                $('#testingDate').val('');
                $('input:radio[name=Bug]:eq(0)').attr('checked', true); // modified by shilpa
                $('input:radio[name=Bug]:eq(1)').attr('checked', false)
                $("#details").val('');
                $("#Owner").val('');

                /*
                $("#status option").each(function(){
                  if (trim($(this).text()) == "Select Status")
                    $(this).attr("selected","selected");
                });
                */
                $("#status").val($("#status option:first").val());

                /*
                $("#priority option").each(function(){
                  if (trim($(this).text()) == "Select Priority")
                    $(this).attr("selected","selected");
                });
                */
                $("#priority").val($("#priority option:first").val());

                /*
                $("#severity option").each(function(){
                  if (trim($(this).text()) == "Select Severity")
                    $(this).attr("selected","selected");
                });
                */
                $("#severity").val($("#severity option:first").val());

                document.getElementById('closedDate').value = '';
                $("#title").val('');
                $("#url").val('');
                //for bug id 11987 DT:17-06-2014
                $("#ownertr").css('display', '');
                $("#priottr").css('display', '');
                $("#severttr").css('display', '');
                $("#vstbugtr").css('display', '');
                $("#vstfbuglinktr").css('display', '');
            }


            $('#dvTriage').dialog({
                resizable: false,
                modal: true,
                height: 370,
                width: 500,
                buttons: {
                    "Save": function () {
                        Triage.setOwnerValue();
                        var flag = 0;
                        //if($("#title").val().replace(/^\s+|\s+$/g, "") == '' || $('input:radio[name=Bug]:eq(0)').attr('checked') == false && 																		$('input:radio[name=Bug]:eq(1)').attr('checked') == false)
                        if ($("#title").val().replace(/^\s+|\s+$/g, "") == '' && $('input:radio[name=Bug]:eq(0)').attr('checked') == true) {
                            Triage.alertBox("Fields marked with asterisk(*) are mandatory!");
                            flag = 1;
                        }
                        else if ($('input:radio[name=Bug]:eq(1)').attr('checked') == false && $('input:radio[name=Bug]:eq(0)').attr('checked') == false)
                            flag = 1;

                        if (flag == 0) {
                            Main.showLoading();
                            var bug = ($('input:radio[name=Bug]:checked').val()).slice(0, 1);
                            var details = $("#details").val();
                            var owner = $("#Owner").val();

                            var status = '';
                            if (($("#status option:selected").val().trim()) != "Select Status") {
                                status = ($("#status option:selected").text().trim()).slice(0, 1);
                            }

                            var priority = '';
                            if ($("#priority option:selected").val().trim() != "Select Priority") {
                                priority = $("#priority option:selected").text();
                            }

                            var severity = '';
                            if ($("#severity option:selected").val().trim() != "Select Severity") {
                                severity = ($("#severity option:selected").text()).slice(0, 1);
                            }

                            var dateStr = '';
                            if ($("#closedDate").val() != '') {
                                var oldDate = $("#closedDate").val();
                                var sliceDate = oldDate.slice(0, 10);
                                sliceDate = sliceDate.split("/");
                                dateStr = sliceDate[2] + '-' + sliceDate[0] + '-' + sliceDate[1];
                            }
                            var title = $("#title").val().replace(/^\s+|\s+$/g, "");
                            title = title == undefined || title == "" || title == null ? "-" : title;
                            var url = $("#url").val();
                            if (title.length > 255)
                                Triage.alertBox('Title should contain only 255 characters.');
                            else if (url.length > 255)
                                Triage.alertBox('URL should contain only 255 characters.');
                            else {
                                var obj = new Array();
                                //var list = jP.Lists.setSPObject(Triage.SiteURL,'Triage');
                                $("#bug" + teststepPlanId).text($('input:radio[name=Bug]:checked').val());
                                $("#title" + teststepPlanId).text(title);
                                $("#title" + teststepPlanId).attr('title', title);
                                if ($("#Triage" + teststepPlanId).text() != "Triaged")
                                    $("#Triage" + teststepPlanId).before('<div style="float:left;padding:0px"><img src="/images/right.png" 																				style="width:20px;padding-top:2px" /></div>');
                                $("#Triage" + teststepPlanId).text("Triaged");
                                var btnResult = $("span.ui-button-text:eq(0)").text();
                                //if(TriageResult == undefined)
                                var TriageData = '';
                                if (btnResult == "Save") {
                                    var ownerName = ownerName == undefined || ownerName == "" || ownerName == null ? "-" : ownerName;
                                    //var ownerNew = ownerName;

                                    TriageData = {
                                        'bug': bug,
                                        'triageDetails': details,
                                        'owner': owner,
                                        'Triagestatus': status,
                                        'dateClosed': dateStr,
                                        'vstfBugTitle': title,
                                        'vstfBugLink': url,
                                        'teststepPlanId': teststepPlanId,
                                        'priority': priority,
                                        'severity': severity
                                    };

                                    var result = ServiceLayer.InsertUpdateData("InsertUpdateTriage", TriageData, "Triage");
                                    if (result != null && result != undefined)
                                        Main.AutoHideAlertBox(Triage.gConfigTriage + " saved successfully!");//Added by Mohini for Resource flie
                                    //Triage.alertBox(Triage.gConfigTriage + " saved successfully!");
                                    Triage.getScenariosDetails(0);
                                }
                                else {
                                    //var ownerNew = ownerName;

                                    TriageData = {
                                        "triageId": TriageResult.triageId,
                                        'bug': bug,
                                        'triageDetails': details,
                                        'owner': owner,
                                        'Triagestatus': status,
                                        'dateClosed': dateStr,
                                        'vstfBugTitle': title,
                                        'vstfBugLink': url,
                                        'teststepPlanId': teststepPlanId,
                                        'priority': priority,
                                        'severity': severity
                                    };

                                    var result = ServiceLayer.InsertUpdateData("InsertUpdateTriage", TriageData, "Triage");
                                    if (result != null && result != undefined)
                                        Main.AutoHideAlertBox(Triage.gConfigTriage + " updated successfully!");//Added by Mohini for Resource flie
                                    //Triage.alertBox(Triage.gConfigTriage + " updated successfully!");
                                    Triage.getScenariosDetails(0);

                                }

                                Main.hideLoading();
                                $(this).dialog("close");
                            }
                            Main.hideLoading();
                        }

                    },
                    "Cancel": function () {
                        $(this).dialog("close");
                    }
                }

            });
            $("#dvTriage").removeAttr('style').attr('style', 'height:""');
            $('#dvTriage').css('background-color', '#eee');
            $('.ui-widget-content').css('background-color', '#eee');
            $('.ui-autocomplete').css('background-color', 'white');
             
            //if(TriageResult != undefined)
            if (TriageResult.bug != "")
                $("span.ui-button-text:eq(0)").text("Update");
            else
                $("span.ui-button-text:eq(0)").text("Save");

        }
        catch (e) { }
    },
    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 130, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },

    //show all the text related to selected tester
    validation: function () {
        if ($('#projSelect option:selected').val() == 'select') {
            //Triage.alertBox("Please select project");
            Triage.alertBox("Please select " + Triage.gConfigProject);//Added by Mohini for Resource flie
            return false;
        }
            //else if($('#scenSelect option:selected').text() == "No Test Pass Available") //$('#scenSelect option:selected').val() == "0"
        else if ($('#scenSelect option:selected').text() == "No " + Triage.gConfigTestPass + " Available")//Added by Mohini for Resource flie
        {
            //Triage.alertBox("No Test Pass available");
            Triage.alertBox("No " + Triage.gConfigTestPass + " available");//Added by Mohini for Resource flie
            return false;
        }
        else if ($('#tester option:selected').val() == "0") {
            // if($('#tester option:selected').text() == "No Tester Alloted")
            if ($('#tester option:selected').text() == "No " + Triage.gConfigTester + " Alloted")//Added by Mohini for Resource flie
                //Triage.alertBox("No Tester available");
                Triage.alertBox("No " + Triage.gConfigTester + " available");
            else
                return true;
        }
        else
            return true;
        Main.hideLoading();
    },

    showTesterData: function () {
        if (Triage.validation()) {
            Main.showLoading();
            var projectID = '';

            if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                projectID = $('#versionSelect option:selected').val();
            else
                projectID = $('#projSelect option:selected').val();

            $('#hTestCase').show();
            $('#dvProjectDetails').show();

            $(".proj-desc").show();
            $('#tesctCaseDiv').show();
            $('#thisScenario').empty();//Clean Discription area
            //$('#scenario').empty();//Clean Test Cases Grid
            $("#Pagination").hide();
            $("#testStepDetails").empty();

            var tpID = $('#scenSelect option:selected').val();
            var statusTS = $("#status option:selected").text();
            Triage.noTCAvailable = 0;
            Triage.onLoadgss = Triage.getScenariosDetails(tpID);
            //Ankita 19/7/2012 : to solve Bug ID 983
            if (Triage.testPassShow == 0) {
                if ($("#scenSelect").text() == "No Test Pass Available")
                    $('#thisScenario').html('<span style="color:red;font-weight:bold">There are no ' + UATReport.gConfigTestPass + 'es!</span>');//Added By Mohini for Resource File
                else
                    $('#thisScenario').html('<span style="color:red;font-weight:bold">There is no data available with the above criteria!</span>');
                $("#hTestCase").hide();
                $("#testStepDetails").hide();
            }
            else {
                $('#thisScenario').html(Triage.ScenarioInfo);
                $("#hTestCase").show();
                $("#testStepDetails").show();
            }
            if (Triage.onLoadgss == "" || Triage.onLoadgss == undefined) {
                if (Triage.noTCAvailable == 1)
                    $('#testStepDetails').html('<span style="color:red;font-weight:bold">No ' + Triage.gConfigTestCase + ' Available !</span>');//Added by Mohini for Resource flie
                else
                    $('#testStepDetails').html('<span style="color:red;font-weight:bold">There are no failed ' + Triage.gConfigTestStep + ' !</span>');//Added by Mohini for Resource flie	
            }
            else {
                Triage.pagination();
            }
            window.setTimeout("Main.hideLoading()", 100);
        }
        if ($("#scenario").find("a").length != 0) /* shilpa 25 apr */
            $("#scenario").find("a").attr('target', '_blank');


        Main.hideLoading();
    },
    pagination: function () {
        var len = Triage.onLoadgss.length;

        $("#Pagination").pagination(len, {
            callback: Triage.initpage,
            items_per_page: 10,
            num_display_entries: 10,
            num: 2,
            current_page: Triage.gPageIndex
        });
    },
    initpage: function (page_index, jq) {
        var items_per_page = 10;
        var max_elem = Math.min((page_index + 1) * items_per_page, Triage.onLoadgss.length);
        var testinfo = '';
        testinfo = testinfo + '<table style="table-layout:fixed;word-wrap:break-word;" class="gridDetails" cellspacing="0"><thead><tr>';
        testinfo = testinfo + '<td class="tblhd-b center" style="width:4%">' + Triage.gConfigTestPass + ' ID</td>';//added by Ejaz Waquif
        testinfo = testinfo + '<td class="tblhd-b center" style="width:4%">Test ID</td>';
        testinfo = testinfo + '<td class="tblhd-b" style="width:13%">Test ' + Triage.gConfigAction + ' / Steps</td>';//15%
        testinfo = testinfo + '<td class="tblhd-b" style="width:5%">' + Triage.gConfigRole + '</td>';
        testinfo = testinfo + '<td class="tblhd-b" style="width:17%">' + Triage.gConfigExpectedResult + '</td>';
        testinfo = testinfo + '<td class="tblhd-b" style="width:17%">' + Triage.gConfigActualresult + '</td>';
        testinfo = testinfo + ' <td class="tblhd-b" style="width:9%">Actual Attachment</td>';
        testinfo = testinfo + ' <td class="tblhd-b" style="width:12%">' + Triage.gConfigTester + '</td>';
        testinfo = testinfo + ' <td class="tblhd-b" style="width:3%">' + Triage.glblBug + '</td>';
        testinfo = testinfo + ' <td class="tblhd-b" style="width:10%">' + Triage.glblvstfb + '</td>';
        testinfo = testinfo + ' <td class="tblhd-b" style="width:6%">' + Triage.gConfigTriage + '</td>';
        testinfo = testinfo + '</tr></thead><tbody >';
        for (var i = page_index * items_per_page; i < max_elem; i++) {
            testinfo = testinfo + Triage.onLoadgss[i];
        }
        testinfo = testinfo + '</tbody></table>';
        $('#testStepDetails').empty().html(testinfo);
        $("#Pagination").show();
        $('.gridDetails').find('tr').each(function (i, v) {
            $(v).find('td:eq(4)').find('img').attr('height', '200');
            $(v).find('td:eq(4)').find('img').attr('width', '200');
            $(v).find('td:eq(4)').find('img').css('height', '200px').css('width', '200px');
            $(v).find('td:eq(5)').find('img').attr('height', '200');
            $(v).find('td:eq(5)').find('img').attr('width', '200');
            $(v).find('td:eq(5)').find('img').css('height', '200px').css('width', '200px');

            $(v).find('td:eq(2)').find('table').css('width', '155px');
            $(v).find('td:eq(4)').find('table').css('width', '195px');
            $(v).find('td:eq(5)').find('table').css('width', '195px');

        });
        return false;
    },
    dmlOperation: function (search, list) {
        var listname = jP.Lists.setSPObject(Triage.SiteURL, list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        return (result);
    },
    //for bug id 11987 DT:17-06-2014
    noBugClick: function () {
        if ($("input:radio[name='Bug'][value='No']").is(":checked")) {
            $("#ownertr").css('display', 'none');
            $("#priottr").css('display', 'none');
            $("#severttr").css('display', 'none');
            $("#vstbugtr").css('display', 'none');
            $("#vstfbuglinktr").css('display', 'none');
        }
    },
    BugClick: function () {
        if ($("input:radio[name='Bug'][value='Yes']").is(":checked")) {
            $("#ownertr").css('display', '');
            $("#priottr").css('display', '');
            $("#severttr").css('display', '');
            $("#vstbugtr").css('display', '');
            $("#vstfbuglinktr").css('display', '');
        }
    },
    /*********************************************/
    getExportTable: function (selected) {
        try {
            if (Triage.validation()) {
                Main.showLoading();
                if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                    var selected = $('#versionSelect option:selected').val();
                else
                    var selected = $('#projSelect option:selected').val();

                var getTestPass = $('#scenSelect option:selected').val();

                var projectListItems = new Array();//:SD
                projectListItems = Triage.ForPIDGetDetails[selected];//:SD

                //To get testpass details as per testpassId from global variable:SD
                var testPassListItems = new Array();
                //if($('#scenSelect option:selected').text()=='All '+Triage.gConfigTestPass+'es')
                if ($('#scenSelect option:selected').text() == 'All ' + Triage.gConfigTestPass) {
                    $("#scenSelect option").each(function () {
                        obj = new Array();
                        obj = Triage.ForTPIDGetDetails[$(this).val()];
                        if (obj != undefined) {
                            testPassListItems.push(obj);
                        }
                    });
                }
                else {
                    obj = Triage.ForTPIDGetDetails[$("#scenSelect").val()];
                    if (obj != undefined) {
                        testPassListItems.push(obj);
                    }
                }

                var came = 0;
                var eT = "";
                var projectID = '';
                var stat = 0;
                try {
                    var xls = new ActiveXObject("Excel.Application");
                    stat = 1;
                }
                catch (ex) {
                    //alert("ActiveX is not enabled on your browser.To enable this Open IE -> Tools ->Internet Options -> Security -> Custom Level -> ActiveX controls and plug-ins ->Enable \"Initialize and script ActiveX controls not marked as safe for scripting!");
                    Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
                }
                if (stat == 0) {
                    Main.hideLoading();
                    return;
                }
                xls.visible = true;

                var xlsBook = xls.Workbooks.Add;
                var XlSheet = '';
                var deleteFlagForRow = new Array();
                var noOfSheets = 0;
                noOfSheets = testPassListItems.length;//:SD

                var defaultCount = xlsBook.worksheets.count;

                for (var i = defaultCount; i >= 2; i--)
                    xlsBook.worksheets(i).Delete();

                for (var i = 0; i < (noOfSheets) ; i++) {
                    xlsBook.worksheets.Add;
                }
               
                //var testPassMapList = jP.Lists.setSPObject(this.SiteURL, 'TestPassToTestCaseMapping');
                var sceSheet = '';
                var TotalItems = testPassListItems.length;

                if (projectListItems != null && projectListItems != undefined) {     //activate project sheet

                    var projSheet = Triage.gConfigProject + '-' + projectListItems['projectId'];//Added by Mohini for Resource flie

                    xls.worksheets("Sheet1").activate;
                    var XlSheet = xls.activeSheet;
                    xls.visible = false;
                    
                    //fill active Sheet cells 
                    XlSheet.Range("A1:H1000").NumberFormat = "@";
                    //XlSheet.Cells(1,1).value = "Project ID";
                    XlSheet.Cells(1, 1).value = Triage.gConfigProject + " ID";//Added by Mohini for Resource flie
                    XlSheet.cells(1, 1).font.bold = "true";
                    XlSheet.cells(1, 1).Interior.ColorIndex = 40;
                    var projId = projectListItems['projectId'];
                    projId = (projId == null || projId == undefined) ? '-' : projId;
                    XlSheet.Cells(1, 2).value = projId;
                    XlSheet.cells(1, 2).Interior.ColorIndex = 36;
                    //XlSheet.Cells(2,1).value = "Project Name";
                    XlSheet.Cells(2, 1).value = Triage.gConfigProject + " Name";//Added by Mohini for Resource flie
                    XlSheet.cells(2, 1).font.bold = "true";
                    XlSheet.cells(2, 1).Interior.ColorIndex = 40;
                    var projN = projectListItems['projectName'];
                    projN = (projN == null || projN == undefined) ? '-' : projN;
                    XlSheet.Cells(2, 2).value = projN;
                    XlSheet.cells(2, 2).Interior.ColorIndex = 36;

                    if (Triage.isPortfolioOn)//When Portfolio is ON :-Mohini DT:09-05-2014 
                    {
                        XlSheet.Cells(3, 1).value = Triage.gConfigVersion;//Added by Mohini for Resource flie
                        XlSheet.cells(3, 1).font.bold = "true";
                        XlSheet.cells(3, 1).Interior.ColorIndex = 40;
                        var version = projectListItems['ProjectVersion'];
                        //version = (version==null || version== undefined)?'-':version.replace(/<div[^><]*>|<.div[^><]*>/ig,'');
                        version = (version == null || version == undefined) ? 'Default ' + Triage.gConfigVersion : version.replace(/<div[^><]*>|<.div[^><]*>/ig, '');
                        XlSheet.Cells(3, 2).value = version;
                        XlSheet.cells(3, 2).Interior.ColorIndex = 36;

                        //XlSheet.Cells(4,1).value = "Project Description";
                        XlSheet.Cells(4, 1).value = Triage.gConfigProject + " Description";//Added by Mohini for Resource flie
                        XlSheet.cells(4, 1).font.bold = "true";
                        XlSheet.cells(4, 1).Interior.ColorIndex = 40;
                        var projD = projectListItems['projectDescription'];
                        projD = (projD == null || projD == undefined) ? '-' : projD.replace(/<div[^><]*>|<.div[^><]*>/ig, '');
                        XlSheet.Cells(4, 2).value = projD;
                        XlSheet.cells(4, 2).Interior.ColorIndex = 36;

                        XlSheet.Cells(5, 1).value = Triage.gConfigVersion + " " + Triage.gConfigLead;//Added by Mohini for Resource flie
                        XlSheet.cells(5, 1).font.bold = "true";
                        XlSheet.cells(5, 1).Interior.ColorIndex = 40;
                        var projLead = projectListItems['projectleadName'];
                        projLead = (projLead == null || projLead == undefined) ? '-' : projLead.replace(/<div[^><]*>|<.div[^><]*>/ig, '');
                        XlSheet.Cells(5, 2).value = projLead;
                        XlSheet.cells(5, 2).Interior.ColorIndex = 36;
                    }
                    else {
                        //XlSheet.Cells(4,1).value = "Project Description";
                        XlSheet.Cells(3, 1).value = Triage.gConfigProject + " Description";//Added by Mohini for Resource flie
                        XlSheet.cells(3, 1).font.bold = "true";
                        XlSheet.cells(3, 1).Interior.ColorIndex = 40;
                        var projD = projectListItems['projectDescription'];
                        projD = (projD == null || projD == undefined) ? '-' : projD.replace(/<div[^><]*>|<.div[^><]*>/ig, '');
                        XlSheet.Cells(3, 2).value = projD;
                        XlSheet.cells(3, 2).Interior.ColorIndex = 36;

                        //XlSheet.Cells(5,1).value = "Project Lead";
                        XlSheet.Cells(4, 1).value = Triage.gConfigProject + " " + Triage.gConfigLead;//Added by Mohini for Resource flie
                        XlSheet.cells(4, 1).font.bold = "true";
                        XlSheet.cells(4, 1).Interior.ColorIndex = 40;
                        var projLead = projectListItems['projectleadName'];
                        projLead = (projLead == null || projLead == undefined) ? '-' : projLead.replace(/<div[^><]*>|<.div[^><]*>/ig, '');
                        XlSheet.Cells(4, 2).value = projLead;
                        XlSheet.cells(4, 2).Interior.ColorIndex = 36;

                    }

                    XlSheet.Range("A1").EntireColumn.AutoFit();
                    XlSheet.Range("B1").EntireColumn.columnwidth = '80';
                    XlSheet.Range("B1").EntireColumn.WrapText = 'True';


                    //rename Active sheet
                    XlSheet.Name = projSheet;
                    var projInf = XlSheet;
                    defaultCount = defaultCount - 1;
                    var count = xlsBook.worksheets.count + defaultCount;

                    var param = $('#versionSelect option:selected').val();
                    var result = ServiceLayer.GetData("GetTriageDetails", param, "Triage");
                                 
                    /* for filter data as per Role and Tester*/

                    var TempArray = [];
                    TempArray = result;

                    if ($('#tester option:selected').val() > 0 || $('#roleList option:selected').val() > 0) {

                        if ($('#tester option:selected').val() > 0) {
                            result = [];
                            var tester = $('#tester option:selected').text();
                            var role = $('#roleList option:selected').val();
                            var roleName = $('#roleList option:selected').text();
                            for (var s = 0; s < TempArray.length; s++) {
                                if (roleName != 'All Role') {
                                    if (TempArray[s].listTriageTestSteps.length >0) {
                                        if (tester == TempArray[s].testerName && role == TempArray[s].listTriageTestSteps[0].roleId) {
                                            result.push(TempArray[s]);
                                        }
                                    }
                                }
                                else {
                                    if (tester == TempArray[s].testerName)
                                        result.push(TempArray[s]);
                                }
                            }
                        }

                        else if ($('#roleList option:selected').val() > 0) {
                            result = [];
                            var tester = $('#tester option:selected').text();
                            var role = $('#roleList option:selected').val();
                            for (var s = 0; s < TempArray.length; s++) {
                                if (TempArray[s].listTriageTestSteps.length > 0) {
                                    if (tester != 'All Tester') {
                                        if (tester == TempArray[s].testerName && role == TempArray[s].listTriageTestSteps[0].roleId) {
                                            result.push(TempArray[s]);
                                        }
                                    }
                                    else {
                                        if (role == TempArray[s].listTriageTestSteps[0].roleId) {
                                            result.push(TempArray[s]);
                                        }
                                    }
                                }
                            }
                        }
                      
                    }
                    /* end    */

                    if ((testPassListItems != null) && (testPassListItems != undefined)) {
                        for (var xx = 0 ; xx < TotalItems ; xx++) {
                            var sh = '';
                            var des = '';
                            var si = xx;

                            sceID = testPassListItems[xx]['testpassId'];
                            OnlyTestStep = [];
                            ChildListResult = [];
                            var uniqueTestSteps = new Array();

                            /*Filter Record as Per TestPassId*/
                            if (sceID != '' && sceID != undefined && sceID != null) {
                                if (result != undefined && result.length > 0) {
                                    for (var u = 0; u < result.length; u++) {
                                        var testPassId = result[u].testPassId;

                                        if (parseInt(testPassId) == parseInt(sceID)) {
                                            var TPMappingId = "200";
                                            if (result[u].listTriageTestSteps.length >= 1) {
                                            var temp = 0;
                                                if (result[u].listTriageTestSteps[temp].teststepPlanId) {
                                                for (var y = 0; y < result[u].listTriageTestSteps.length; y++) {
                                                    OnlyTestStep.push(result[u].listTriageTestSteps[y]);
                                                    OnlyTestStep[y].description = result[u].description;
                                                    OnlyTestStep[y].testCaseId = result[u].testCaseId;
                                                    OnlyTestStep[y].testCaseName = result[u].testCaseName;
                                                    OnlyTestStep[y].testCaseDesc = result[u].testCaseDesc;
                                                    OnlyTestStep[y].testPassId = result[u].testPassId;
                                                    OnlyTestStep[y].testPassName = result[u].testPassName;
                                                    OnlyTestStep[y].testerName = result[u].testerName;
                                                    OnlyTestStep[y].testerSpuserId = result[u].testerSpuserId;
                                                    OnlyTestStep[y].testMgrName = result[u].testMgrName;
                                                    OnlyTestStep[y].TestPassMappingID = (u + parseInt(TPMappingId)).toString();
                                                }
                                                temp++;
                                               }
                                            }
                                            else {
                                             if (result[u].listTriageTestSteps !="") {
                                                OnlyTestStep.push(result[u]);
                                                var len=OnlyTestStep.length;
                                                OnlyTestStep[len-1].TestPassMappingID = (u + parseInt(TPMappingId)).toString();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                               
                            if (OnlyTestStep.length > 0) {
                                //var TPMappingId = "200";
                                for (var t = 0; t < OnlyTestStep.length; t++) {
                                   // OnlyTestStep[t].TestPassMappingID = (t + parseInt(TPMappingId)).toString();
                                    OnlyTestStep[t].ChildID = (OnlyTestStep[t].teststepPlanId == undefined) ? null : OnlyTestStep[t].teststepPlanId;
                                    OnlyTestStep[t].ID = (OnlyTestStep[t].teststepPlanId == undefined) ? null : OnlyTestStep[t].teststepPlanId;
                                    OnlyTestStep[t].ActualResult = (OnlyTestStep[t]['actualResult'] == undefined) ? null : OnlyTestStep[t]['actualResult'];
                                    OnlyTestStep[t].Role = (OnlyTestStep[t]['roleId'] == undefined) ? null : OnlyTestStep[t]['roleId'];
                                    OnlyTestStep[t].TestStep = (OnlyTestStep[t].teststepPlanId == undefined) ? null : OnlyTestStep[t].teststepPlanId;
                                    OnlyTestStep[t].TestCaseID = (OnlyTestStep[t].testCaseId == undefined) ? null : OnlyTestStep[t].testCaseId;
                                    OnlyTestStep[t].SPUserID = (OnlyTestStep[t].testerSpuserId == undefined) ? null : OnlyTestStep[t].testerSpuserId;
                                }
                            }

                            ChildListResult = OnlyTestStep;
                       
                        /*End*/

                        sceID = (sceID == null || sceID == undefined) ? '-' : sceID;
                        sceSheet = Triage.gConfigTestPass + '-' + sceID;//added by Mohini for resource file
                        var sID = sceID;
                        getTestPass = sceID;
                            
                        var j = count - xx;
                        sh = "Sheet" + (j);


                        xlsBook.worksheets(sh).activate;
                        XlSheet = xlsBook.activeSheet;
                        //j++;

                        XlSheet.Name = sceSheet;
                        //XlSheet.Range("A1:H1000").NumberFormat = "@";
                        //XlSheet.Cells(1,1).Value = "Test Pass ID";
                        XlSheet.Cells(1, 1).Value = Triage.gConfigTestPass + " ID";//Added by Mohini for Resource flie
                        XlSheet.cells(1, 1).font.bold = "true";
                        XlSheet.Cells(1, 2).Value = sceID;
                        XlSheet.cells(1, 2).HorizontalAlignment = 2;
                        //XlSheet.Cells(2,1).value = "Test Pass Name";
                        XlSheet.Cells(2, 1).value = Triage.gConfigTestPass + " Name";//Added by Mohini for Resource flie
                        XlSheet.cells(2, 1).font.bold = "true";
                        var sN = testPassListItems[si]['testpassName'];
                        sN = (sN == null || sN == undefined) ? '-' : sN;

                        XlSheet.Cells(2, 2).value = sN;
                        //XlSheet.Cells(3,1).value = "Test Pass Description";
                        XlSheet.Cells(3, 1).value = Triage.gConfigTestPass + " Description";//Added by Mohini for Resource flie
                        XlSheet.cells(3, 1).font.bold = "true";


                        des = testPassListItems[si]['testPassDescription'];
                        des = (des == null || des == undefined) ? '-' : des.replace(/<(.|\n)*?>/ig, '');

                        XlSheet.Cells(3, 2).value = des.replace(/<div[^><]*>|<.div[^><]*>/ig, '');

                        //XlSheet.Cells(4,1).value = "Test Manager";
                        XlSheet.Cells(4, 1).value = Triage.gConfigManager;//Added by Mohini for Resource flie
                        XlSheet.cells(4, 1).font.bold = "true";
                        var tm = testPassListItems[si]['testManager'];
                        tm = (tm == null || tm == undefined) ? '-' : tm;
                        XlSheet.Cells(4, 2).value = tm;

                        //Move on top to show the the bg color for the Test Pass(es) which don't have the Test Case or Tester
                        XlSheet.Range("A1").EntireColumn.AutoFit();
                        XlSheet.Range("B1").EntireColumn.AutoFit();
                        XlSheet.Range("C1").EntireColumn.AutoFit();
                        XlSheet.Range("D1").EntireColumn.AutoFit();
                        XlSheet.Range("E1").EntireColumn.AutoFit();
                        XlSheet.Range("A1:D1").Interior.ColorIndex = 36;
                        XlSheet.Range("A2:D2").Interior.ColorIndex = 36;
                        XlSheet.Range("A3:D3").Interior.ColorIndex = 36;
                        XlSheet.Range("A4:D4").Interior.ColorIndex = 36;

                        // var testerList = jP.Lists.setSPObject(this.SiteURL, 'Tester');
                        //var testCaseList1 = jP.Lists.setSPObject(this.SiteURL, 'TestCases');

                        var ForTCIDgetParentIDs = new Array();
                        var ForParentIDGetSPUserIDs = new Array();
                        var ForParentIDgetChildIDs = new Array();
                        var ForChildIDgetTSIDRoleIDAndActualResult = new Array();

                        // var camlQueryForTestCaseList = '<Query><Where>';

                        var testCaseItems = new Array();
                        var testCaseMapListItems = new Array();
                        var testerListItems = new Array();
                        var IterationPoint = 0;
                        var OrEndTags = '';

                        //:SD
                        //var camlQueryForChildList = '<Query><Where>';
                        //if ($("#tester").val() != 0)
                        //    camlQueryForChildList += '<And><Eq><FieldRef Name="SPUserID" /><Value Type="Text">' + $("#tester").val() + '</Value></Eq>';
                        //if ($("#roleList").val() != 0)
                        //    camlQueryForChildList += '<And><Eq><FieldRef Name="Role" /><Value Type="Text">' + $("#roleList").val() + '</Value></Eq>';
                        //camlQueryForChildList += '<And><Eq><FieldRef Name="status" /><Value Type="Text">Fail</Value></Eq>';
                        //camlQueryForChildList += '<Eq><FieldRef Name="TestPassID" /><Value Type="Text">' + getTestPass + '</Value></Eq>';
                        //if ($("#tester").val() != 0)
                        //    camlQueryForChildList += '</And>';
                        //if ($("#roleList").val() != 0)
                        //    camlQueryForChildList += '</And>';
                        //camlQueryForChildList += '</And></Where><ViewFields></ViewFields></Query>';

                        //var childMapping = Triage.dmlOperation(camlQueryForChildList, 'TestCaseToTestStepMapping');
                        //if (childMapping != undefined)
                        //    $.merge(testCaseMapListItems, childMapping);

                        testCaseMapListItems = ChildListResult;

                        if (testCaseMapListItems.length != 0) {
                            var TesterNameForSPUserID = new Array();
                            var TestStepNameAndExResultForTSID = new Array();
                            var AttachmentForChildID = new Array();
                            var TriageForChildID = new Array();
                            var testStepItems = new Array();
                            var attachmentItems = new Array();
                            var TriageItems = new Array();
                            var numberOfIterations = Math.ceil(testCaseMapListItems.length / 147);
                            var IterationPoint = 0;
                            var OrEndTags;
                            for (var y = 0; y < numberOfIterations - 1; y++) {
                                //camlQuery = '<Query><Where>';
                                //var camlQueryForTriage = '<Query><Where>';
                                //var camlQueryForTestCaseList = '<Query><Where>';//:SD

                                OrEndTags = '';
                                for (var ii = IterationPoint; ii < (IterationPoint + 147 - 1) ; ii++) {
                                    //camlQuery += '<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestStep'] + '</Value></Eq>';
                                    //camlQueryForTriage += '<Or><Eq><FieldRef Name="ChildID" /><Value Type="Text">' + testCaseMapListItems[ii]['ID'] + '</Value></Eq>';
                                    ////TestCase list forming query:SD
                                    //camlQueryForTestCaseList += '<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestCaseID'] + '</Value></Eq>';
                                    //OrEndTags += '</Or>';

                                    if (ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] == undefined)
                                        ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['ID'];
                                    else
                                        ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] += "," + testCaseMapListItems[ii]['ID'];

                                    if (testCaseMapListItems[ii]['ActualResult'] != undefined)
                                        ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + testCaseMapListItems[ii]['ActualResult'];
                                    else
                                        ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + "-";

                                    //To set global variables:SD
                                    if (ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] == undefined)
                                        ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] = testCaseMapListItems[ii]['TestPassMappingID'];
                                    else {
                                        var arr = new Array();
                                        arr = ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']].split(",");
                                        if ($.inArray(testCaseMapListItems[ii]['TestPassMappingID'], arr) == -1)
                                            ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] += "," + testCaseMapListItems[ii]['TestPassMappingID'];
                                    }
                                    ForParentIDGetSPUserIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['SPUserID'];//:SD

                                    if ($.inArray(testCaseMapListItems[ii]['TestStep'], uniqueTestSteps) == -1) {
                                        uniqueTestSteps.push(testCaseMapListItems[ii]['TestStep']);
                                        testStepItems.push(testCaseMapListItems[ii]);
                                    }
                                    if ((testCaseMapListItems[ii].bug) != undefined && (testCaseMapListItems[ii].bug) != '') {
                                        // uniqueTestSteps.push(ChildListResult[ii]['TestStep']);
                                        TriageItems.push(testCaseMapListItems[ii]);
                                    }

                                }
                                if (ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] == undefined)
                                    ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['ID'];
                                else
                                    ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] += "," + testCaseMapListItems[ii]['ID'];

                                if (testCaseMapListItems[ii]['ActualResult'] != undefined)
                                    ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + testCaseMapListItems[ii]['ActualResult'];
                                else
                                    ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + "-";

                                //To set global variables:SD
                                if (ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] == undefined)
                                    ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] = testCaseMapListItems[ii]['TestPassMappingID'];
                                else {
                                    var arr = new Array();
                                    arr = ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']].split(",");
                                    if ($.inArray(testCaseMapListItems[ii]['TestPassMappingID'], arr) == -1)
                                        ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] += "," + testCaseMapListItems[ii]['TestPassMappingID'];
                                }
                                ForParentIDGetSPUserIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['SPUserID'];//:SD

                                //camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestStep'] + '</Value></Eq>';
                                //camlQueryForTriage += '<Eq><FieldRef Name="ChildID" /><Value Type="Text">' + testCaseMapListItems[ii]['ID'] + '</Value></Eq>';
                                //camlQueryForTestCaseList += '<Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestCaseID'] + '</Value></Eq>';

                                //camlQuery += OrEndTags;
                                //camlQueryForTriage += OrEndTags;
                                //camlQueryForTestCaseList += OrEndTags;

                                //camlQuery += '</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ExpectedResult"/><FieldRef Name="actionName"/></ViewFields></Query>';
                                //camlQueryForTriage += '</Where><ViewFields></ViewFields></Query>';
                                //camlQueryForTestCaseList += '</Where><ViewFields></ViewFields></Query>';//:SD

                                //var Actions = Triage.dmlOperation(camlQuery, 'Action');
                                //if (Actions != undefined)
                                //    $.merge(testStepItems, Actions);
                                //var listname = jP.Lists.setSPObject(Triage.SiteURL, 'Triage');
                                //var result = listname.getSPItemsWithQuery(camlQueryForTriage).Items;
                                //if (result != undefined)
                                //    $.merge(TriageItems, result);

                                //var testcases = Triage.dmlOperation(camlQueryForTestCaseList, 'TestCases');//:SD
                                //if (testcases != undefined)
                                //    $.merge(testCaseItems, testcases);//:SD


                                if ($.inArray(testCaseMapListItems[ii]['TestStep'], uniqueTestSteps) == -1) {
                                    uniqueTestSteps.push(testCaseMapListItems[ii]['TestStep']);
                                    testStepItems.push(testCaseMapListItems[ii]);
                                }
                                if ((testCaseMapListItems[ii].bug) != undefined && (testCaseMapListItems[ii].bug) != '') {
                                    // uniqueTestSteps.push(ChildListResult[ii]['TestStep']);
                                    TriageItems.push(testCaseMapListItems[ii]);
                                }
                                if ((testCaseMapListItems[ii]['TestCaseID']) != undefined) {
                                    // uniqueTestCases.push(ChildListResult[ii]['TestCaseID']);
                                    testCaseItems.push(testCaseMapListItems[ii]);
                                }
                                IterationPoint += 147;
                            }
                            //camlQuery = '<Query><Where>';
                            //var camlQueryForTriage = '<Query><Where>';
                            //var camlQueryForTestCaseList = '<Query><Where>';//:SD

                            OrEndTags = '';
                            for (var ii = IterationPoint; ii < (testCaseMapListItems.length - 1) ; ii++) {
                                //camlQuery += '<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestStep'] + '</Value></Eq>';
                                //camlQueryForTriage += '<Or><Eq><FieldRef Name="ChildID" /><Value Type="Text">' + testCaseMapListItems[ii]['ID'] + '</Value></Eq>';

                                //TestCase list forming query:SD
                                //camlQueryForTestCaseList += '<Or><Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestCaseID'] + '</Value></Eq>';
                                //OrEndTags += '</Or>';
                                if (ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] == undefined)
                                    ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['ID'];
                                else
                                    ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] += "," + testCaseMapListItems[ii]['ID'];

                                if (testCaseMapListItems[ii]['ActualResult'] != undefined)
                                    ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + testCaseMapListItems[ii]['ActualResult'];
                                else
                                    ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + "-";
                                //To set global variables:SD
                                if (ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] == undefined)
                                    ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] = testCaseMapListItems[ii]['TestPassMappingID'];
                                else {
                                    var arr = new Array();
                                    arr = ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']].split(",");
                                    if ($.inArray(testCaseMapListItems[ii]['TestPassMappingID'], arr) == -1)
                                        ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] += "," + testCaseMapListItems[ii]['TestPassMappingID'];
                                }
                                ForParentIDGetSPUserIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['SPUserID'];//:SD
                                       
                                if ($.inArray(testCaseMapListItems[ii]['TestStep'], uniqueTestSteps) == -1) {
                                    uniqueTestSteps.push(testCaseMapListItems[ii]['TestStep']);
                                    testStepItems.push(testCaseMapListItems[ii]);
                                }
                                if ((testCaseMapListItems[ii].bug) != undefined && (testCaseMapListItems[ii].bug) != '') {
                                    // uniqueTestSteps.push(ChildListResult[ii]['TestStep']);
                                    TriageItems.push(testCaseMapListItems[ii]);
                                }
                            }
                            if (ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] == undefined)
                                ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['ID'];
                            else
                                ForParentIDgetChildIDs[testCaseMapListItems[ii]['TestPassMappingID']] += "," + testCaseMapListItems[ii]['ID'];

                            if (testCaseMapListItems[ii]['ActualResult'] != undefined)
                                ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + testCaseMapListItems[ii]['ActualResult'];
                            else
                                ForChildIDgetTSIDRoleIDAndActualResult[testCaseMapListItems[ii]['ID']] = testCaseMapListItems[ii]['TestStep'] + "`" + testCaseMapListItems[ii]['Role'] + "`" + "-";

                            //To set global variables:SD
                            if (ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] == undefined)
                                ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] = testCaseMapListItems[ii]['TestPassMappingID'];
                            else {
                                var arr = new Array();
                                arr = ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']].split(",");
                                if ($.inArray(testCaseMapListItems[ii]['TestPassMappingID'], arr) == -1)
                                    ForTCIDgetParentIDs[testCaseMapListItems[ii]['TestCaseID']] += "," + testCaseMapListItems[ii]['TestPassMappingID'];
                            }
                            ForParentIDGetSPUserIDs[testCaseMapListItems[ii]['TestPassMappingID']] = testCaseMapListItems[ii]['SPUserID'];//:SD

                            //camlQuery += '<Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestStep'] + '</Value></Eq>';
                            //camlQueryForTriage += '<Eq><FieldRef Name="ChildID" /><Value Type="Text">' + testCaseMapListItems[ii]['ID'] + '</Value></Eq>';
                            //camlQueryForTestCaseList += '<Eq><FieldRef Name="ID" /><Value Type="Counter">' + testCaseMapListItems[ii]['TestCaseID'] + '</Value></Eq>';

                            //camlQuery += OrEndTags;
                            //camlQueryForTriage += OrEndTags;
                            //camlQueryForTestCaseList += OrEndTags;

                            //camlQuery += '</Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ExpectedResult"/><FieldRef Name="actionName"/></ViewFields></Query>';
                            //camlQueryForTriage += '</Where><ViewFields></ViewFields></Query>';
                            //camlQueryForTestCaseList += '</Where><ViewFields></ViewFields></Query>';//:SD

                            //var Actions = Triage.dmlOperation(camlQuery, 'Action');
                            //if (Actions != undefined)
                            //    $.merge(testStepItems, Actions);

                            //var listname = jP.Lists.setSPObject(Triage.SiteURL, 'Triage');
                            //var result = listname.getSPItemsWithQuery(camlQueryForTriage).Items;
                            //if (result != undefined)
                            //    $.merge(TriageItems, result);
                            //var testcases = Triage.dmlOperation(camlQueryForTestCaseList, 'TestCases');//:SD
                            //if (testcases != undefined)
                            //    $.merge(testCaseItems, testcases);//:SD

                            if ($.inArray(testCaseMapListItems[ii]['TestStep'], uniqueTestSteps) == -1) {
                                uniqueTestSteps.push(testCaseMapListItems[ii]['TestStep']);
                                testStepItems.push(testCaseMapListItems[ii]);
                            }

                            if ((testCaseMapListItems[ii].bug) != undefined && (testCaseMapListItems[ii].bug) != '') {
                                // uniqueTestSteps.push(ChildListResult[ii]['TestStep']);
                                TriageItems.push(testCaseMapListItems[ii]);
                            }
                            if ((testCaseMapListItems[ii]['TestCaseID']) != undefined) {
                                // uniqueTestCases.push(testCaseMapListItems[ii]['TestCaseID']);
                                testCaseItems.push(testCaseMapListItems[ii]);
                            }

                            /*Add properties in testStepItems Array*/
                            if (testStepItems.length > 0) {
                                for (var y = 0; y < testStepItems.length; y++) {
                                    testStepItems[y].ExpectedResult = (testStepItems[y].expectedResult == undefined) ? null : testStepItems[y].expectedResult;;
                                    testStepItems[y].ID = (testStepItems[y].teststepPlanId == undefined) ? null : testStepItems[y].teststepPlanId;;
                                    testStepItems[y].actionName = (testStepItems[y].testStepName == undefined) ? null : testStepItems[y].testStepName;;
                                }
                            }
                            /*end*/

                            if (testStepItems != null && testStepItems != undefined) {
                                for (var i = 0; i < testStepItems.length; i++)
                                    TestStepNameAndExResultForTSID[testStepItems[i]['ID']] = testStepItems[i]['actionName'] + "~" + ((testStepItems[i]['ExpectedResult'] != undefined && testStepItems[i]['ExpectedResult'] != null) ? testStepItems[i]['ExpectedResult'] : "-"); // modified by shilpa 26 june //testStepItems[i]['ExpectedResult'];
                            }
                            if (TriageItems != undefined) {
                                for (var i = 0; i < TriageItems.length; i++)
                                    TriageForChildID[TriageItems[i]['ChildID']] = TriageItems[i].bug + "`" + TriageItems[i].vstfBugTitle;
                            }

                            $("#tester option").each(function () {
                                TesterNameForSPUserID[$(this).val()] = $(this).text();
                            });
                            if (testCaseItems != null && testCaseItems != undefined) {
                                var trackrow = 6;
                                var TSID = '';
                                var getTestActionRole = '';
                                var ActualResult = '';
                                var ActionName = '';
                                var ExpectedResult = '';
                                var getTestAction = '';
                                var tester = '';
                                var filepath = '';
                                var attachmentName = '';
                                var bug = '';
                                var title = '';

                                var myRange1 = document.body.createTextRange();
                                for (var i = 0; i < testCaseItems.length; i++) {
                                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    var flag = 0;
                                    var testName = testCaseItems[i]['testCaseName'];
                                    var summ = testCaseItems[i]['testCaseDesc'];
                                    var testDesc = '';
                                    if (ForTCIDgetParentIDs[testCaseItems[i]['TestCaseID']] != undefined) {
                                        var ParentIDs = ForTCIDgetParentIDs[testCaseItems[i]['TestCaseID']].split(",");
                                        for (var ii = 0; ii < ParentIDs.length; ii++) {
                                            if (ForParentIDgetChildIDs[ParentIDs[ii]] != undefined) {
                                                if (flag == 0) {
                                                    var row;
                                                    var coll = 4;

                                                    testDesc = (summ == null || summ == undefined) ? '-' : summ.replace(/<(.|\n)*?>/ig, '');
                                                    // XlSheet.Cells(trackrow,1).value = 'Test Case ID';
                                                    XlSheet.Cells(trackrow, 1).value = Triage.gConfigTestCase + ' ID';//Added by Mohini for Resource flie
                                                    XlSheet.cells(trackrow, 1).font.bold = "true";
                                                    XlSheet.Cells(trackrow, 2).value = testCaseItems[i]['TestCaseID'];
                                                    XlSheet.cells(trackrow, 2).HorizontalAlignment = 2;
                                                    trackrow++;
                                                    //XlSheet.Cells(trackrow,1).value = 'Test Case Name';
                                                    XlSheet.Cells(trackrow, 1).value = Triage.gConfigTestCase + ' Name';//Added by Mohini for Resource flie
                                                    XlSheet.cells(trackrow, 1).font.bold = "true";
                                                    XlSheet.Cells(trackrow, 2).value = testName;
                                                    XlSheet.cells(trackrow, 2).font.bold = "true";
                                                    trackrow++;
                                                    XlSheet.Cells(trackrow, 1).value = 'Test Description';
                                                    XlSheet.cells(trackrow, 1).font.bold = "true";
                                                    XlSheet.Cells(trackrow, 2).value = testDesc;
                                                    trackrow++;
                                                    XlSheet.Cells(trackrow, 1).value = 'Test ID';
                                                    XlSheet.cells(trackrow, 1).font.bold = "true";
                                                    XlSheet.cells(trackrow, 1).HorizontalAlignment = -4152;
                                                    XlSheet.cells(trackrow, 1).Interior.ColorIndex = 40;
                                                    // XlSheet.Cells(trackrow,2).value = 'Test Case Steps/Action';
                                                    XlSheet.Cells(trackrow, 2).value = 'Test ' + Triage.gConfigAction + ' / Step';//Added by Mohini for Resource flie
                                                    XlSheet.cells(trackrow, 2).font.bold = "true";
                                                    XlSheet.cells(trackrow, 2).Interior.ColorIndex = 40;

                                                    //XlSheet.Cells(trackrow,3).value = 'Expected Result';
                                                    XlSheet.Cells(trackrow, 3).value = Triage.gConfigExpectedResult;//Added by Mohini for Resource flie
                                                    XlSheet.cells(trackrow, 3).font.bold = "true";
                                                    XlSheet.cells(trackrow, 3).Interior.ColorIndex = 40;
                                                    var nameRow = trackrow;
                                                    trackrow++;
                                                    var statusRow = trackrow;
                                                    var statusRowFixed = statusRow;

                                                    XlSheet.Range("B1").EntireColumn.columnwidth = '80';
                                                    //XlSheet.Range("B1").EntireColumn.WrapText = 'True';

                                                    /*XlSheet.Range("B1").EntireColumn.Top;
                                                    XlSheet.Range("B1").EntireColumn.Left;*/

                                                    XlSheet.Range("C1").EntireColumn.columnwidth = '60';
                                                    XlSheet.Range("C1").EntireColumn.WrapText = 'True';

                                                    XlSheet.Range("C1").EntireColumn.Top;
                                                    XlSheet.Range("C1").EntireColumn.Left;

                                                    XlSheet.Range("D1").EntireColumn.columnwidth = '20';
                                                    XlSheet.Range("D1").EntireColumn.WrapText = 'True';

                                                    XlSheet.Range("D1").EntireColumn.Top;
                                                    XlSheet.Range("D1").EntireColumn.Left;

                                                    XlSheet.Range("E1").EntireColumn.columnwidth = '60';
                                                    //XlSheet.Range("E1").EntireColumn.WrapText = 'True';

                                                    /*XlSheet.Range("E1").EntireColumn.Top;
                                                    XlSheet.Range("E1").EntireColumn.Left;*/

                                                    XlSheet.Range("F1").EntireColumn.columnwidth = '20';
                                                    XlSheet.Range("F1").EntireColumn.WrapText = 'True';

                                                    XlSheet.Range("F1").EntireColumn.Top;
                                                    XlSheet.Range("F1").EntireColumn.Left;

                                                    XlSheet.Range("G1").EntireColumn.Top;
                                                    XlSheet.Range("G1").EntireColumn.Left;

                                                    XlSheet.Range("H1").EntireColumn.Top;
                                                    XlSheet.Range("H1").EntireColumn.Left;

                                                    XlSheet.Range("H1").EntireColumn.columnwidth = '30';
                                                    XlSheet.Range("H1").EntireColumn.WrapText = 'True';

                                                    //XlSheet.Cells(nameRow,coll).value = "Role";
                                                    XlSheet.Cells(nameRow, coll).value = Triage.gConfigRole;//Added by Mohini for Resource flie
                                                    XlSheet.cells(nameRow, coll).font.bold = "true";
                                                    XlSheet.cells(nameRow, coll).Interior.ColorIndex = 40;

                                                    //XlSheet.Cells(nameRow,coll+1).value = "Actual Result";
                                                    XlSheet.Cells(nameRow, coll + 1).value = Triage.gConfigActualresult;//Added by Mohini for Resource flie
                                                    XlSheet.cells(nameRow, coll + 1).font.bold = "true";
                                                    XlSheet.cells(nameRow, coll + 1).Interior.ColorIndex = 40;

                                                    //XlSheet.Cells(nameRow,coll+2).value = "Tester";
                                                    XlSheet.Cells(nameRow, coll + 2).value = Triage.gConfigTester;//Added by Mohini for Resource flie
                                                    XlSheet.cells(nameRow, coll + 2).font.bold = "true";
                                                    XlSheet.cells(nameRow, coll + 2).Interior.ColorIndex = 40;

                                                    //XlSheet.Cells(nameRow,coll+2).value = "Tester";
                                                    XlSheet.Cells(nameRow, coll + 2).value = Triage.gConfigTester;//Added by Mohini for Resource flie
                                                    XlSheet.cells(nameRow, coll + 2).font.bold = "true";
                                                    XlSheet.cells(nameRow, coll + 2).Interior.ColorIndex = 40;

                                                    // XlSheet.Cells(nameRow,coll+3).value = "Bug";
                                                    XlSheet.Cells(nameRow, coll + 3).value = Triage.glblBug;//Added by Mohini for Resource flie

                                                    XlSheet.cells(nameRow, coll + 3).font.bold = "true";
                                                    XlSheet.cells(nameRow, coll + 3).Interior.ColorIndex = 40;

                                                    //XlSheet.Cells(nameRow,coll+4).value = "VSTF Bug #/Title";
                                                    XlSheet.Cells(nameRow, coll + 4).value = Triage.glblvstfb;//Added by Mohini for Resource flie
                                                    XlSheet.cells(nameRow, coll + 4).font.bold = "true";
                                                    XlSheet.cells(nameRow, coll + 4).Interior.ColorIndex = 40;

                                                    flag = 1;
                                                }

                                                var childIDs = ForParentIDgetChildIDs[ParentIDs[ii]].split(",");
                                                tester = TesterNameForSPUserID[ForParentIDGetSPUserIDs[ParentIDs[ii]]];

                                                var cellCount = trackrow - 1;
                                                var lastCount = trackrow - 1;
                                                var cellW = 417;//XlSheet.cells((cellCount+1),5).width+150;
                                                var childID = "";
                                                var flagTrue = 0;
                                                var srcObjAct = document.getElementById("divAct");
                                                var rangeObj = document.body.createTextRange();
                                                for (var j = 0; j < childIDs.length; j++) {
                                                    flagTrue = 0;
                                                    lastCount = cellCount;
                                                    var flagExp = 0;
                                                    var flagTS = 0;
                                                    var flagAct = 0;
                                                    if (XlSheet.cells((cellCount + 1), 1).value != undefined)
                                                        cellCount = cellCount + 1;

                                                    TSID = ForChildIDgetTSIDRoleIDAndActualResult[childIDs[j]].split("`")[0];

                                                    XlSheet.cells((cellCount + 1), 1).value = childIDs[j];

                                                    var TSName = TestStepNameAndExResultForTSID[TSID].split('~')[0];
                                                    TSName = TSName.replace(/&quot;/g, '"');
                                                    /*For Bug Id:11779 Mohini DT:14-05-2014*/
                                                    TSName = TSName.replace(/&gt;/g, '>');
                                                    TSName = TSName.replace(/&lt;/g, '<');
                                                    TSName = TSName.replace(/&amp;/g, '&');
                                                    /*********************************/
                                                    if (TSName.match(/</g) == undefined && TSName.match(/</g) == null)
                                                        XlSheet.cells((cellCount + 1), 2).value = TSName;
                                                    else if (TSName.match(/</g).length == 2 && (TSName.indexOf("<div") != -1 || TSName.indexOf("<p") != -1))
                                                        XlSheet.cells((cellCount + 1), 2).value = Triage.filterData(TSName);
                                                    else if (TSName.indexOf("</table>") != -1 && TSName.indexOf("<table") != -1) {
                                                        if (TSName.match(/<td/g).length > 1) {
                                                            var completeActionName = Triage.filterData(TSName);
                                                            completeActionName = completeActionName.replace(/&quot;/g, '"');
                                                            completeActionName = completeActionName.replace(/(\r\n)+/g, '');
                                                            XlSheet.cells((cellCount + 1), 2).value = completeActionName;
                                                        }
                                                        else
                                                            flagTrue = 1;
                                                    }
                                                    else
                                                        flagTrue = 1;
                                                    if (flagTrue == 1) {
                                                        enableDesignMode("rte1", TSName, false);
                                                        rteCommand("rte1", "selectAll");
                                                        rteCommand("rte1", "copy");
                                                        XlSheet.cells((cellCount + 1), 2).PasteSpecial();
                                                    }


                                                    XlSheet.cells((cellCount + 1), 2).WrapText = 'True';

                                                    var cellCount2 = cellCount;
                                                    var ExpectedResult = TestStepNameAndExResultForTSID[TSID].split('~')[1];
                                                    if (ExpectedResult != "-" && ExpectedResult != undefined && ExpectedResult != "undefined") {
                                                        ExpectedResult = ExpectedResult.replace(/&quot;/g, '"');
                                                        /*For Bug Id:11779 Mohini DT:14-05-2014*/
                                                        ExpectedResult = ExpectedResult.replace(/&gt;/g, '>');
                                                        ExpectedResult = ExpectedResult.replace(/&lt;/g, '<');
                                                        ExpectedResult = ExpectedResult.replace(/&amp;/g, '&');
                                                    }
                                                    /*********************************/
                                                    if (ExpectedResult != "-" && ExpectedResult != undefined && ExpectedResult != "undefined"  && ExpectedResult!="")//Expected Reult
                                                    {
                                                        flagTrue = 0;
                                                        if (ExpectedResult.match(/</g) == undefined && ExpectedResult.match(/</g) == null)
                                                            XlSheet.cells((cellCount + 1), 3).value = ExpectedResult;
                                                        else if (ExpectedResult.match(/</g).length == 2 && (ExpectedResult.indexOf("<div") != -1 || ExpectedResult.indexOf("<p") != -1))
                                                            XlSheet.cells((cellCount + 1), 3).value = Triage.filterData(ExpectedResult);
                                                        else if (ExpectedResult.indexOf("</table>") != -1 && ExpectedResult.indexOf("<table") != -1) {
                                                            if (ExpectedResult.match(/<td/g).length > 1) {
                                                                var completeExpResult = Triage.filterData(ExpectedResult);
                                                                completeExpResult = completeExpResult.replace(/&quot;/g, '"');
                                                                completeExpResult = completeExpResult.replace(/(\r\n)+/g, '');
                                                                XlSheet.cells((cellCount + 1), 3).value = completeExpResult;
                                                            }
                                                            else
                                                                flagTrue = 1;
                                                        }
                                                        else
                                                            flagTrue = 1;
                                                        if (flagTrue == 1) {
                                                            if (ExpectedResult.indexOf("data:image/png;base64") == -1) {
                                                                $('#expectedResultWithImage').html(ExpectedResult);
                                                                myRange1.moveToElementText(expectedResultWithImage);
                                                                myRange1.execCommand('copy');
                                                                XlSheet.cells((cellCount + 1), 3).PasteSpecial(); //Expected Result
                                                            }
                                                            else {
                                                                var cellH = 15;//XlSheet.cells((cellCount+1),3).height+115;
                                                                var flagActShow = 0;
                                                                var imageCount = 0;
                                                                var otherTextPresent = 0;
                                                                var idExp = 'divExp' + childIDs[j];
                                                                if ($("#" + idExp).html() == undefined) {
                                                                    var htmlforAppend = "<div id='" + idExp + "'></div>";
                                                                    $("#divExp").after(htmlforAppend);
                                                                    $("#" + idExp).html(ExpectedResult);
                                                                    $("#" + idExp + " img").each(function () {
                                                                        //Triage.AddAttachment($(this).attr('src').split(",")[1]);
                                                                        if (Triage.imageURL == "") {
                                                                            var url = ServiceLayer.serviceURL + '/Triage/GetFileToDownloadExpResult?id=' + TSID + '&Url=' + ServiceLayer.appurl;

                                                                            $(this).attr("src", url);
                                                                            if (cellW < $(this).attr("width"))
                                                                                $(this).attr("width", cellW);
                                                                            if ($(this).attr("height") < 135)
                                                                                cellH = $(this).attr("height");
                                                                            else {
                                                                                cellH = 135;
                                                                                $(this).attr("height", 135);
                                                                            }
                                                                            imageCount++;
                                                                        }
                                                                    });
                                                                }
                                                                $("#" + idExp).children().each(function () {
                                                                    if ($(this).attr('src') != undefined) {
                                                                        flagActShow = 1;
                                                                    }
                                                                    else if ($(this).text() != "" && $(this).text() != undefined) {
                                                                        flagActShow = 0;
                                                                        otherTextPresent = 1;
                                                                    }
                                                                });

                                                                var srcObjExp = document.getElementById(idExp);
                                                                rangeObj.moveToElementText(srcObjExp);
                                                                rangeObj.select;
                                                                rangeObj.execCommand('copy');


                                                                /*enableDesignMode("rte1", $("#"+idExp).html(), false); 
                                                                rteCommand("rte1","selectAll");
                                                                rteCommand("rte1","copy");*/
                                                                XlSheet.cells((cellCount + 1), 3).PasteSpecial(); //Expected Result
                                                                if (flagActShow == 1) {
                                                                    cellCount2 = XlSheet.UsedRange.Rows.Count;
                                                                    if (imageCount != 1 || otherTextPresent == 1) {
                                                                        if (cellH > 90)
                                                                            XlSheet.Range("A" + (cellCount2) + ":F" + (cellCount2)).RowHeight = cellH - 75;
                                                                        else
                                                                            XlSheet.Range("A" + (cellCount2) + ":F" + (cellCount2)).RowHeight = cellH - 15;
                                                                    }
                                                                    flagExp = 1;
                                                                }

                                                            }
                                                        }
                                                        XlSheet.cells((cellCount + 1), 3).WrapText = 'True'; //shilpa 4oct
                                                    }
                                                    else
                                                        XlSheet.cells((cellCount + 1), 3).value = '-';

                                                    XlSheet.Cells((cellCount + 1), 4).value = Triage.RoleNameForRoleID[ForChildIDgetTSIDRoleIDAndActualResult[childIDs[j]].split("`")[1]]; //Role

                                                    var flagForMinus = 0;
                                                    var actualRes = ForChildIDgetTSIDRoleIDAndActualResult[childIDs[j]].split("`")[2];
                                                    if (actualRes != undefined) {
                                                        actualRes = actualRes.replace(/&quot;/g, '"');
                                                        /*For Bug Id:11779 Mohini DT:14-05-2014*/
                                                        actualRes = actualRes.replace(/&gt;/g, '>');
                                                        actualRes = actualRes.replace(/&lt;/g, '<');
                                                        actualRes = actualRes.replace(/&amp;/g, '&');
                                                    }
                                                    /*********************************/
                                                    if (actualRes != undefined  && actualRes!="")//Actual Result
                                                    {
                                                        flagTrue = 0;
                                                        if (actualRes.match(/</g) == undefined && actualRes.match(/</g) == null) {
                                                            XlSheet.cells((cellCount + 1), 5).value = actualRes;
                                                            //cellCount = cellCount2;
                                                        }
                                                        else if (actualRes.match(/</g).length == 2 && (actualRes.indexOf("<div") != -1 || actualRes.indexOf("<p") != -1)) {
                                                            XlSheet.cells((cellCount + 1), 5).value = Triage.filterData(actualRes);
                                                            //cellCount = cellCount2;
                                                        }
                                                        else if (actualRes.indexOf("</table>") != -1 && actualRes.indexOf("<table") != -1) {
                                                            if (actualRes.match(/<td/g).length > 1) {
                                                                var completeActResult = Triage.filterData(actualRes);
                                                                completeActResult = completeActResult.replace(/&quot;/g, '"');
                                                                completeActResult = completeActResult.replace(/(\r\n)+/g, '');
                                                                XlSheet.cells((cellCount + 1), 5).value = completeActResult;
                                                            }
                                                            else
                                                                flagTrue = 1;
                                                        }
                                                        else
                                                            flagTrue = 1;
                                                        if (flagTrue == 1) {
                                                            if (actualRes.indexOf("data:image/png;base64") == -1) {
                                                                enableDesignMode("rte1", actualRes, false);
                                                                rteCommand("rte1", "selectAll");
                                                                rteCommand("rte1", "copy");
                                                                XlSheet.cells((cellCount + 1), 5).PasteSpecial(); //Expected Result
                                                            }
                                                            else {
                                                                var cellH = 15;//XlSheet.cells((cellCount+1),6).height+115;
                                                                var flagActShow = 0;
                                                                var imageCount = 0;
                                                                $("#divAct").html(actualRes);
                                                                $("#divAct img").each(function () {
                                                                    //Triage.AddAttachment($(this).attr('src').split(",")[1]);
                                                                    if (Triage.imageURL == "") {
                                                                        var url = ServiceLayer.serviceURL + '/Triage/GetFileToDownloadActResult?id=' + childIDs[j] + '&Url=' + ServiceLayer.appurl;

                                                                        $(this).attr("src", url);
                                                                        if (cellW < $(this).attr("width"))
                                                                            $(this).attr("width", cellW);
                                                                        if ($(this).attr("height") < 135)
                                                                            cellH = $(this).attr("height");
                                                                        else {
                                                                            cellH = 135;
                                                                            $(this).attr("height", 135);
                                                                        }
                                                                        imageCount++;
                                                                    }
                                                                });
                                                                $("#divAct").children().each(function () {
                                                                    if ($(this).attr('src') != undefined) {
                                                                        flagActShow = 1;
                                                                    }
                                                                    else if ($(this).text() != "" && $(this).text() != undefined)
                                                                        flagActShow = 0;
                                                                });

                                                                rangeObj.moveToElementText(srcObjAct);
                                                                rangeObj.select;
                                                                rangeObj.execCommand('copy');

                                                                /*enableDesignMode("rte1", $("#divAct").html(), false); 
                                                                rteCommand("rte1","selectAll");
                                                                rteCommand("rte1","copy");*/
                                                                XlSheet.cells((cellCount + 1), 5).PasteSpecial(); //Expected Result
                                                                if (flagActShow == 1) {
                                                                    var cellCount2 = XlSheet.UsedRange.Rows.Count;
                                                                    if (cellH > 50)
                                                                        XlSheet.Range("A" + (cellCount2 + 2) + ":F" + (cellCount2 + 2)).RowHeight = cellH - 35;
                                                                    else
                                                                        XlSheet.Range("A" + (cellCount2 + 2) + ":F" + (cellCount2 + 2)).RowHeight = cellH - 15;
                                                                    flagAct = 1;
                                                                }
                                                                else
                                                                    flagForMinus = 1;
                                                            }
                                                        }
                                                        XlSheet.cells((cellCount + 1), 5).WrapText = 'True'; //shilpa 4oct
                                                    }
                                                    else
                                                        XlSheet.Cells((cellCount + 1), 5).value = '-';

                                                    XlSheet.Cells((cellCount + 1), 6).value = tester;
                                                    if (TriageForChildID[childIDs[j]] != undefined) {
                                                        bug = TriageForChildID[childIDs[j]].split("`")[0];
                                                        title = TriageForChildID[childIDs[j]].split("`")[1];
                                                    }
                                                    else {
                                                        bug = '-';
                                                        title = '-';
                                                    }
                                                    XlSheet.Cells((cellCount + 1), 7).value = bug;
                                                    XlSheet.Cells((cellCount + 1), 8).value = title;

                                                    if (flagForMinus == 1)
                                                        cellCount = XlSheet.UsedRange.Rows.Count - 2;
                                                    else
                                                        cellCount = XlSheet.UsedRange.Rows.Count;
                                                    if (lastCount < cellCount - 1) {
                                                        XlSheet.Range(XlSheet.cells((lastCount + 1), 1), XlSheet.cells(cellCount, 1)).Merge();
                                                        XlSheet.Range(XlSheet.cells((lastCount + 1), 4), XlSheet.cells(cellCount, 4)).Merge();
                                                        XlSheet.Range(XlSheet.cells((lastCount + 1), 6), XlSheet.cells(cellCount, 6)).Merge();
                                                        XlSheet.Range(XlSheet.cells((lastCount + 1), 7), XlSheet.cells(cellCount, 7)).Merge();
                                                        XlSheet.Range(XlSheet.cells((lastCount + 1), 8), XlSheet.cells(cellCount, 8)).Merge();

                                                        for (var mm = lastCount + 2; mm <= cellCount; mm++) {
                                                            if (XlSheet.cells((mm), 2).value != undefined)
                                                                flagTS = 1;
                                                            if (XlSheet.cells((mm), 3).value != undefined && XlSheet.cells((mm), 3).value != "-")
                                                                flagExp = 1;
                                                            if (XlSheet.cells((mm), 5).value != undefined && XlSheet.cells((mm), 5).value != "-")
                                                                flagAct = 1;
                                                            XlSheet.cells(mm, 2).WrapText = 'True';
                                                            XlSheet.cells(mm, 3).WrapText = 'True';
                                                            XlSheet.cells(mm, 5).WrapText = 'True';
                                                        }
                                                        if (flagTS == 0) {
                                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 2), XlSheet.cells(cellCount, 2)).Merge();
                                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 2), XlSheet.cells(cellCount, 2)).VerticalAlignment = -4108;
                                                            //XlSheet.Range(XlSheet.cells((lastCount+1),2), XlSheet.cells(cellCount,2)).HorizontalAlignment=-4108;
                                                        }
                                                        if (flagExp == 0) {
                                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 3), XlSheet.cells(cellCount, 3)).Merge();
                                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 3), XlSheet.cells(cellCount, 3)).VerticalAlignment = -4108;
                                                            //XlSheet.Range(XlSheet.cells((lastCount+1),3), XlSheet.cells(cellCount,3)).HorizontalAlignment=-4108;
                                                        }
                                                        if (flagAct == 0) {
                                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 5), XlSheet.cells(cellCount, 5)).Merge();
                                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 5), XlSheet.cells(cellCount, 5)).VerticalAlignment = -4108;
                                                            //XlSheet.Range(XlSheet.cells((lastCount+1),5), XlSheet.cells(cellCount,5)).HorizontalAlignment=-4108;
                                                        }
                                                    }
                                                    else if (actualRes != undefined || actualRes != "-") {
                                                        XlSheet.cells((cellCount), 5).VerticalAlignment = -4108;
                                                        //XlSheet.cells((cellCount),5).HorizontalAlignment=-4108;
                                                    }

                                                    trackrow = cellCount + 1;

                                                    /////////////////////////////////////**//////////////////////////////////////////////////////////
                                                }
                                            }
                                        }
                                        trackrow++;
                                    }
                                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
                                }
                            }
                            else//Added for bug 7512
                                XlSheet.cells(6, 2).value = 'No ' + Triage.gConfigTestCase + ' Available';//Added by Mohini for Resource file else condition Added here:SD

                            //Added on 11 Sep 2013
                            XlSheet.Range("A1").EntireColumn.VerticalAlignment = -4108;
                            XlSheet.Range("A1").EntireColumn.HorizontalAlignment = -4131;

                            XlSheet.Range("D1").EntireColumn.VerticalAlignment = -4108;
                            XlSheet.Range("D1").EntireColumn.HorizontalAlignment = -4108;

                            XlSheet.Range("F1").EntireColumn.VerticalAlignment = -4108;
                            XlSheet.Range("F1").EntireColumn.HorizontalAlignment = -4108;

                            XlSheet.Range("G1").EntireColumn.VerticalAlignment = -4108;
                            XlSheet.Range("G1").EntireColumn.HorizontalAlignment = -4108;

                            XlSheet.Range("H1").EntireColumn.VerticalAlignment = -4108;
                            XlSheet.Range("H1").EntireColumn.HorizontalAlignment = -4108;

                            //Removing images from page which got attached during exporting to excel(13 Sep 2013)
                            $("#divExp").siblings().each(function () {
                                if ($(this).attr('id').indexOf("divExp") != -1) {
                                    var parent = document.getElementById("parentExp");
                                    var child = document.getElementById($(this).attr('id'));
                                    parent.removeChild(child);
                                }
                            });
                            $("#divAct").html('');
                            $("#expectedResultWithImage").html('');

                        }
                        else
                            //XlSheet.Cells(6,1).value = 'There are no failed Test Steps !';
                            XlSheet.Cells(6, 1).value = 'There are no failed ' + Triage.gConfigTestStep + 's !';//Added by Mohini for Resource flie  

                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                        projInf.activate;
                        if (xlsBook.worksheets(1).Name.indexOf("Project-") == -1) {
                            projInf.Move(XlSheet);
                        }
                    }//testPassListItems for ends
                }//testPassListItems if ends 
            

            }//projectList if ends      
            xls.DisplayAlerts = true;
            xls.visible = true;
            CollectGarbage();
            Main.hideLoading();
        } //IF of validation 
        Main.hideLoading();
    }
        catch (e) {
            if (e.message == "Subscript out of range") {
                Triage.alertBox("Please increase the range of excel sheets up to as below:Go to File > Option > General > Set value of ‘Include this may sheets’ = 3");
            }
            //Removing images from page which got attached during exporting to excel(13 Sep 2013)
            $("#divExp").siblings().each(function () {
                if ($(this).attr('id').indexOf("divExp") != -1) {
                    var parent = document.getElementById("parentExp");
                    var child = document.getElementById($(this).attr('id'));
                    parent.removeChild(child);
                }
            });
            $("#divAct").html('');
            $("#expectedResultWithImage").html('');
            Triage.alertBox(e.message);
            xls.visible = true;
            Main.hideLoading();
        }
    },
   
    AddAttachment: function (baseStr) {
        var obj = new Array();
        obj.push({
            "Title": "New1",
            "Qry": "Test"
        });
        var SPlistName = "testlist";
        var listname = jP.Lists.setSPObject(Triage.SiteURL, SPlistName);
        var result = listname.updateItem(obj);
        $().SPServices(
                    {
                        operation: "AddAttachment",
                        webURL: Triage.SiteURL,
                        listName: SPlistName,
                        listItemID: result.ID,
                        fileName: "Att.png",
                        attachment: baseStr,
                        async: false,
                        completefunc: Triage.AttResult
                    });
    },
    AttResult: function (xmlHttpRequest, status) {
        Triage.imageURL = "";
        if (status == "success")
            Triage.imageURL = $(xmlHttpRequest.responseText).find('AddAttachmentResult').text();

    },
    replaceSplCharacters: function (str) {
        str = str.replace(/&nbsp;/gi, ' ').replace(/&quot;/gi, "\"").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
        return str;
    },
    replaceSplCharacters2: function (str) {
        str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, '&#39;');
        return str;
    },

    //Nikhil - 2/03/2012 - Returns Formated Text for Actual and Expected Results.
    GetFormatedText: function (sText, FromExport) {

        if (FromExport == 'true') {

            var sNewLine = '\n';

            if (FromExport == 'true') {
                sNewLine = '\n';

            }
            else {
                sNewLine = '<br/>';

            }

            var sResult = '';

            var FlagBullete = 'false';

            $('#dvTemp').html('');
            $('#dvTemp').html(sText);

            var length = $('#dvTemp').find('p').length - 1;

            if (length > 0) {

                for (i = 0; i <= length; i++) {
                    FlagBullete = 'false';
                    var txtText;

                    var pElement = $('#dvTemp').find('p')[i];

                    // case for Special bullete 
                    if (pElement.childNodes.length == 1) {
                        //if(pElement.childNodes[0].nodeName=='A')
                        if (pElement.childNodes[0].childNodes.length >= 2) {
                            pElement = pElement.childNodes[0];
                        }
                    }

                    // Handle Three Span to determine bullete.
                    if (pElement.childNodes.length >= 2) {
                        FlagBullete = 'true';
                    }


                    if (pElement.childNodes.length >= 2) {

                        txtText = pElement.childNodes[pElement.childNodes.length - 1].innerText;

                        if (txtText != undefined && txtText != null && txtText != '') {
                            if (FlagBullete == 'true') {
                                sResult = sResult + '*  ' + txtText + sNewLine;	//'\n';
                            }
                            else {
                                sResult = sResult + txtText + sNewLine;	//'\n';
                            }
                        }

                    }
                    else {
                        sResult = sResult + $('#dvTemp').find('p')[i].innerText + sNewLine;	//'\n';

                    }
                }
            }
            else {
                // Remove <br />

                while (sText.indexOf('<br />') != -1) {
                    sText = sText.replace('<br />', '');
                }

                sResult = sText;

            }


            return sResult;
        }
        else {
            var arrBullet = Triage.sBulleteChar.split(',');

            for (i = 0; i <= arrBullet.length - 1; i++) {
                while (sText.indexOf('>' + arrBullet[i] + '<span') != -1)
                    sText = sText.replace('>' + arrBullet[i] + '<span', '>* <span');

            }

            return sText;
        }

    },

    filterData: function (info2) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        if (navigator.appName == "Microsoft Internet Explorer")
            info2 = mydiv.innerText;
        else
            info2 = mydiv.textContent;
        return info2;
    }

}