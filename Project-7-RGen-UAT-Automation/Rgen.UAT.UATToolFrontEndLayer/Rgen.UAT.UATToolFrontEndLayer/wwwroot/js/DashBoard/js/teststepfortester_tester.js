/* Copyright © 2012 RGen Solutions . All Rights Reserved.
Contact : support@rgensolutions.com 
*/

var teststepfortester = {
    SiteURL: Main.getSiteUrl(),
    firstTimeFlag: 0,
    startIndexA: 0,
    gLastSearchString: "",
    TCIDArray: new Array(),
    TCNameArray: new Array(),
    TCDescArray: new Array(),
    EstimatedTime: new Array(),
    BlockNextPreviousNavigation: false,

    TCIDArrayForPass: new Array(),
    TCIDArrayForFail: new Array(),
    TCIDArrayForNotCompleted: new Array(),
    TCIDArrayForPending: new Array(),
    TCIDArrayForSearchResult: new Array(),
    TCIDArrayForSearchResult2: new Array(),

    StatusArray: new Array(),
    StatusArrayForPass: new Array(),
    StatusArrayForFail: new Array(),
    StatusArrayForNotCompleted: new Array(),
    StatusArrayForPending: new Array(),
    StatusArrayForSearchResult: new Array(),
    StatusArrayForSearchResult2: new Array(),

    ActualResultArray: new Array(),
    ActualResultArrayForPass: new Array(),
    ActualResultArrayForFail: new Array(),
    ActualResultArrayForNotCompleted: new Array(),
    ActualResultArrayForPending: new Array(),
    ActualResultArrayForSearchResult: new Array(),
    ActualResultArrayForSearchResult2: new Array(),

    pendingStartIndexA: 0,
    passedStartIndexA: 0,
    previousTestStepNo: 0,
    failedStartIndexA: 0,
    notCompletedStartIndexA: 0,
    searchResultStartIndexA: 0,
    AutoSavedIDsArray: new Array(),
    EiForAction: 0,
    TestStepIDFromEditTestStep: "",
    gTestStepList: "",
    searchTestPassKey: '',
    searchProjectKey: '',
    searchRoleKey: '',
    searchTestCaseKey: new Array(),
    allTestSteps: new Array(),
    passedTestSteps: new Array(),
    failedTestSteps: new Array(),
    notCompletedTestSteps: new Array(),
    pendingTestSteps: new Array(),
    searchResultTestSteps: new Array(),
    userRolesArray: new Array(),
    TestCaseNameLength: '',
    landedActualResult: "",
    landedStatus: "",
    landedActualResultOnHide: "",
    landedStatusOnHide: "",
    hidTestCaseID: "",
    KeyIndex: '',
    KeyLength: '',

    pendingCount: 0,
    passCount: 0,
    saveOnNextPreviousFlagForHide: false,
    failCount: 0,
    notCompletedCount: 0,
    total: 0,
    previous: 0,
    landedStatusForHide: '',
    landedActualResultForHide: '',
    saveButtonFlag: false,
    gridFlag: "",
    saveOnNextPreviousFlag: 0,
    PrjName: "",
    testPasNm: "",
    testPasId: "",
    startIndexPass: 0,
    startIndexFail: 0,
    startIndexNC: 0,
    startIndexPending: 0,
    setSaveFlag: false,
    searchResultGrid_onHide: false,
    searchLength: "",
    startIndexSearch: 0,
    startIndexNewAll: 0,
    testingStarted: false,

    endIndex: 0,
    testManagerMailID: '',
    objValidate: new Array(),
    sBulleteChar: 'Ø,v,ü,§',   //Added by Nikhil

    createStatusSection: 0, //flag for blocking the creation of status section when testing completed//added by deepak for bugid 3960
    //Added by HRW
    ChildIDArray: new Array(),
    ChildIDArrayForPass: new Array(),
    ChildIDArrayForFail: new Array(),
    ChildIDArrayForNotCompleted: new Array(),
    ChildIDArrayForPending: new Array(),
    ChildIDArrayForSearchResult: new Array(),

    DateTimeStr: '', // Added by shilpa
    forTCIDGetLastTestStep: new Array(),
    rteText: "",
    lastTestedTestStep: 0,
    lastTestedTestStep2: 0,

    currentPointer: 1,
    startIndexOfTestStep: 0,
    indexStart: 0,
    Ei: 0,
    flag: 0,
    myActivityID: '',
    //action:'',
    ActionNumberForChildID: new Array(), //Code added by Deepak for sequencing
    feedbackRating: 0,
    testingType: 0,
    forTCIDGetFeedbackID: new Array(),
    forTCIDGetFeedbackIDFlag: 0,
    gCongfigRole: "Role",//Added for resource file:SD
    gConfigTestPass: "Test Pass",//Added for resource file:SD
    gConfigTester: "Tester",//Added for resource file:SD
    gConfigProject: "Project",//Added for resource file:SD
    gConfigTestStep: "Test Step",//Added for resource file:SD
    gConfigTestCase: "Test Case",//Added for resource file:SD
    gConfigAttachment: "Attachment",//Added for resource file:SD
    gConfigSequence: "Sequence",//Added for resource file:SD
    gConfigStatus: "Status",//Added for resource file:SD
    gConfigFeedback: "Feedback",//Added for resource file:SD

    totalTestCaseCount: new Array(),
    close: function () {
        window.location.href = teststepfortester.SiteURL + '/Dashboard';
    },

    onPageLoad: function () {
        /******Code added to retain attachment webpart design after clicking on close button *******/
        var url = window.location.href;
        var arr = $("[id$='toolBarTbltop']").html();
        $('#saveBtnUpload').append(arr);
        var arr2 = $("#saveBtnUpload tbody tr td:eq(1) table tr td").html();
        $('#saveBtnUpload').empty();
        $('#partAttachment table tbody tr:eq(5)').remove();
        $('.ms-attachUploadButtons').append(arr2);
        $("[id$='toolBarTbl']").remove();
        $(".s4-wpTopTable tr:eq(0)").remove();

        //Resource file:SD
        if (resource.isConfig.toLowerCase() == 'true') {
            teststepfortester.gCongfigRole = resource.gPageSpecialTerms['Role'] != undefined ? resource.gPageSpecialTerms['Role'] : "Role";
            teststepfortester.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] != undefined ? resource.gPageSpecialTerms['Test Pass'] : "Test Pass";
            teststepfortester.gConfigTester = resource.gPageSpecialTerms['Tester'] != undefined ? resource.gPageSpecialTerms['Tester'] : "Tester";
            teststepfortester.gConfigProject = resource.gPageSpecialTerms['Project'] != undefined ? resource.gPageSpecialTerms['Project'] : "Project";
            teststepfortester.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] != undefined ? resource.gPageSpecialTerms['Test Step'] : "Test Step";
            teststepfortester.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] != undefined ? resource.gPageSpecialTerms['Test Case'] : "Test Case";
            teststepfortester.gConfigAttachment = resource.gPageSpecialTerms['Attachment'] != undefined ? resource.gPageSpecialTerms['Attachment'] : "Attachment";
            teststepfortester.gConfigSequence = resource.gPageSpecialTerms['Sequence'] != undefined ? resource.gPageSpecialTerms['Sequence'] : "Sequence";
            teststepfortester.gConfigStatus = resource.gPageSpecialTerms['Status'] != undefined ? resource.gPageSpecialTerms['Status'] : "Status";
            teststepfortester.gConfigFeedback = resource.gPageSpecialTerms['Feedback'] != undefined ? resource.gPageSpecialTerms['Feedback'] : "Feedback";
        }

        $('#h2TestPass').html('<img src="../images/drop-arrow.gif"/>' + teststepfortester.gConfigTestPass + ': ');//:SD
        $('#h2Statistics').html('Statistics: ' + teststepfortester.gConfigTestStep);//:SD
        $('#spnTestCase').html(teststepfortester.gConfigTestCase + ':');//:SD
        $('#h3TestStepHeader').html(teststepfortester.gConfigTestStep + 's');//:SD
        $('#h4TestStepHeader').html(teststepfortester.gConfigTestStep + 's');//:SD
        $('#spnETT').html('Estimated ' + teststepfortester.gConfigTestCase + ' Time (mins):');//:SD

        /*************************************************/

        var url = window.location.href;
        var temp = url.lastIndexOf("?");
        var link = url.substring(temp, url.length);
        link = link.split('?');
        if (link != null || link != undefined) {
            var getKey = link[1];
            var getval = (getKey != null || getKey != undefined) ? getKey.split("=") : '';
            var twoKeys = (getval[1] != null || getval[1] != undefined) ? getval[1] : '';
            twoKeys = (twoKeys != null || twoKeys != undefined) ? twoKeys.split(",") : '';
            teststepfortester.searchTestPassKey = twoKeys[0];
            teststepfortester.searchProjectKey = twoKeys[1];
            teststepfortester.searchRoleKey = twoKeys[2];
            if (twoKeys[3] == 1) {
                $("ul li a:eq(7)").hide(); //shilpa 15 apr
                $("ul li a:eq(1)").attr('disabled', true);
                $("ul li a:eq(8)").attr('disabled', true);//Added by Mohini for Bug ID:11406
            }
        }
        var result = ServiceLayer.GetData("getProjectTestPass", teststepfortester.searchTestPassKey + "&" + teststepfortester.searchRoleKey, "TestingPg"); //SPUSerId/TestPassId/RoleId

        if (result != undefined && result != '') {
            if (result[0].testerRole != undefined) {
                $("#role").text(trimText(result[0].testerRole, 20));
                $("#role").attr('title', result[0].testerRole);
            }

            // Showing Area of Tester
            if (result[0].testerArea != undefined && result[0].testerArea != '') {
                $("#area").text(trimText(result[0].testerArea, 18));
                $("#area").attr('title', result[0].testerArea);
            }
            else
                $("#area").text("N/A");

            //Code for retriving a Test Passes in Drop Down
            $('div.testPassProjectDetails:eq(0) > div').hide();
            /* modified by shilpa 18 apr */
            $('#testpassdropdown').hide();
            $('.testPassProjectDetails h2').click(function () {
                $(this).next().slideToggle('fast');
            });

            $('.testPassProjectDetails table tbody tr:eq(0) td:eq(0) div').click(function () {
                $('#testpassdropdown').slideToggle('fast');
            });
            /**/
            /*$('.tesrPassList').empty();
	        $('.tesrPassList').append('<a title="' + result[0].testPassName + '">' + result[0].testPassName + '</a>')*/

            var MyActivityItems = result[0].listTestPassNames;
            $('.tesrPassList').empty();
            if (MyActivityItems != null && MyActivityItems != undefined) {
                for (var i = 0; i < MyActivityItems.length; i++) {
                    $('.tesrPassList').append('<a title="' + MyActivityItems[i]['testPassName'] + '">' + MyActivityItems[i]['testPassName'] + '</a>');
                }
            }

            if (isRootWeb)
                $("body").css('background-image', 'url(../images/bg.jpg)');
            else
                $("body").css('background-image', 'url(../images/bg.jpg)');


            document.getElementById('txtProject').innerHTML = trimText(result[0].projectName.toString(), 20);
            $("#txtProject").attr("title", result[0].projectName);

            if (result[0].projectStatus == 'O') {
                htmlAlert = " This project is kept in 'On Hold' status by Lead/Test Manager.&nbsp;You can't start testing until it is made Active." + //for bug id 12006
					"<br/>" +
					"<div class='center' style='padding-top:7px'><a href='/dashboard' style='color:#0000FF;text-decoration:underline;cursor:pointer;'>Return to the Home Page</a></div>";
                /*"<div style='padding-top:7px'>You will be able to review its Active status from Project section of the home page.</div>";*///for bug id 12006

                $("#divCompTesting").html(htmlAlert);
                $('#divCompTesting').dialog({ width: 350, height: 200, resizable: false, title: "Testing", modal: true, closeOnEscape: false });
                $("#divCompTesting").parent().children(0).children('a').remove(); // added by Rajiv on 9 feb 2012 to resolve issues related to bug 644
                return;
                Main.hideLoading();
            }
            if (result[0].projectStatus == 'C') {
                htmlAlert = " This project is kept in 'Complete' status by Lead/Test Manager.&nbsp;You can't start testing until it is made Active." + //for bug id 12006
					"<br/>" +
					"<div class='center' style='padding-top:7px'><a href='/dashboard' style='color:#0000FF;text-decoration:underline;cursor:pointer;'>Return to the Home Page</a></div>";
                /*"<div style='padding-top:7px'>You will be able to review its status from Project section of the home page.</div>";*/ //for bug id 12006
                $("#divCompTesting").html(htmlAlert);
                $('#divCompTesting').dialog({ width: 350, height: 200, resizable: false, title: "Testing", modal: true, closeOnEscape: false });
                $("#divCompTesting").parent().children(0).children('a').remove(); // added by Rajiv on 9 feb 2012 to resolve issues related to bug 644
                return;
                Main.hideLoading();
            }

            if (result[0].feedbackRType != undefined && result[0].feedbackRType != '')
                teststepfortester.feedbackRating = result[0].feedbackRType;
            else
                teststepfortester.feedbackRating = '0';
            if (result[0].testingType != undefined && result[0].testingType != '')
                teststepfortester.testingType = result[0].testingType;
            else
                teststepfortester.testingType = '0';

            //Added by HRW on 27 August 2012
            if (result[0].testPassStatus == 'C' || result[0].testPassStatus == 'H') {
                var status = '';
                if (result[0].testPassStatus == 'C')
                    status = 'Complete';
                else
                    status = 'On Hold'
                htmlAlert = " This Test Pass has been given status as " + status + " by Lead/Test Manager .You can not start testing on it until it is made Active by Lead or Test Manager." +
					"<br/>" +
					"<div class='center' style='padding-top:7px'><a href='/dashboard' style='color:#0000FF;text-decoration:underline;cursor:pointer;'>Return to the Home Page</a></div>" +
					"<div style='padding-top:7px'>You will be able to review its status from the column 'TP Status' of the '" + teststepfortester.gConfigProject + " and " + teststepfortester.gConfigTestPass + " summary section' of the home page.</div>";
                $("#divCompTesting").html(htmlAlert);
                //$('#divCompTesting').dialog({width:350, height:200,modal: true, close: function() { teststepfortester.close(); } });
                $('#divCompTesting').dialog({ width: 350, height: 200, resizable: false, title: "Testing", modal: true, closeOnEscape: false });
                $("#divCompTesting").parent().children(0).children('a').remove(); // added by Rajiv on 9 feb 2012 to resolve issues related to bug 644
                return;
                Main.hideLoading();
            }
            else {
                var currentDate = new Date();
                var oldDate = result[0].testPassEndDate.toString();
                /*var sliceDate = oldDate.slice(0, 10);
	            sliceDate = sliceDate.split("-");
	            var DueDate = sliceDate[1] + '/' + sliceDate[0] + '/' + sliceDate[2];*/
                var DueDate = oldDate;

                var CreateDate = result[0].testPassStartDate.toString(); //Added for bug 7809
                /*var sliceDate2 = CreateDate.slice(0, 10);
	            sliceDate2 = sliceDate2.split("-");
	            var CreateDate = sliceDate2[1] + '/' + sliceDate2[0] + '/' + sliceDate2[2];*/

                /* Modified by shilpa on 19 dec */
                var objCreateDate = new Date(CreateDate);
                var objDueDate = new Date(DueDate);
                objDueDate.setHours("23");
                objDueDate.setMinutes("59");
                objDueDate.setSeconds("59");
                /**/

                if (objDueDate < currentDate) {
                    htmlAlert = "End Date of this ‘Test Pass'  has already passed away. Please contact your test manager for more information." +
					"<br/>" +
					"<div class='center' style='padding-top:7px'><a href='dashboard.aspx' style='color:#0000FF;text-decoration:underline;cursor:pointer;'>Return to the Home Page</a></div>" +
					"<div style='padding-top:7px'>You will be able to review its End Date from Test Pass summary section of the home page.</div>";
                    $("#divCompTesting").html(htmlAlert);
                    $('#divCompTesting').dialog({ width: 350, height: 200, resizable: false, title: "Testing", modal: true, closeOnEscape: false });
                    $("#divCompTesting").parent().children(0).children('a').remove(); // added by Rajiv on 9 feb 2012 to resolve issues related to bug 644
                    return;
                    Main.hideLoading();
                }
                else if (objCreateDate > currentDate) {
                    htmlAlert = "Start Date of this ‘Test Pass' has not come yet. Please contact your test manager for more information." +
					"<br/>" +
					"<div class='center' style='padding-top:7px'><a href='dashboard.aspx' style='color:#0000FF;text-decoration:underline;cursor:pointer;'>Return to the Home Page</a></div>" +
					"<div style='padding-top:7px'>Start Date of this Test Pass is " + CreateDate + ".</div>";
                    $("#divCompTesting").html(htmlAlert);
                    $('#divCompTesting').dialog({ width: 350, height: 200, resizable: false, title: "Testing", modal: true, closeOnEscape: false });
                    $("#divCompTesting").parent().children(0).children('a').remove(); // added by Rajiv on 9 feb 2012 to resolve issues related to bug 644
                    return;
                    Main.hideLoading();
                }
            }

            document.getElementById('txtTestPass').innerHTML = trimText(result[0].testPassName.toString(), 17);
            $("#txtTestPass").attr("title", result[0].testPassName.toString());

            if (result[0].managerEmail != undefined && result[0].managerEmail != '')
                teststepfortester.testManagerMailID = result[0].managerEmail;

            /*feedback*/
            teststepfortester.PrjName = "";
            teststepfortester.testPasNm = "";
            teststepfortester.PrjName = result[0].projectName.toString();
            teststepfortester.testPasNm = result[0].testPassName.toString();
            teststepfortester.testPasId = teststepfortester.searchTestPassKey;

            document.getElementById('txtDueDate').innerHTML = DueDate;
            document.getElementById('txtTestManager').innerHTML = trimText(result[0].testPassManager, 18);

            var EnvironmentListItems = result[0].listActualAliasUrls;
            $('#divUrl').html('');
            var markupUrl = '';
            if (EnvironmentListItems != null && EnvironmentListItems != undefined) {
                for (var i = 0; i < EnvironmentListItems.length; i++) {
                    if (EnvironmentListItems[i]['actualUrl'] != '') {
                        var URL = EnvironmentListItems[i]['actualUrl'];
                        var UrlAlias = EnvironmentListItems[i]['aliasUrl'];
                        markupUrl += '<a style="cursor:pointer" href="' + URL + '" target="_blank" title="' + URL + '">' + UrlAlias + '</a >';
                    }
                }
                $('#divUrl').html(markupUrl);
                if (markupUrl == '')
                    $('#divUrl').append('<span >No environment(s) available</span>');
            }
            else
                $('#divUrl').append('<span >No environment(s) available</span>');

            var idAfterSave = Main.getCookie("TesterPageState");
            if (idAfterSave != null || idAfterSave != undefined) {
                var pageState = idAfterSave.split("~");

                //Get latest added Attachment from list
                pageState[8] = "-";
                //var attList = jP.Lists.setSPObject(teststepfortester.SiteURL,'Attachment');
                // var query = '<Query><Where><And><Eq><FieldRef Name="ChildID" /><Value Type="Text">'+pageState[12]+'</Value></Eq><Eq><FieldRef Name="ResultType" /><Value Type="Text">Actual</Value></Eq></And></Where><ViewFields><FieldRef Name="ID"/><FieldRef Name="ResultType"/></ViewFields></Query>'
                var AttachmentResult = ServiceLayer.GetData('GetAttachmentAfterUpload', pageState[12], 'TestingPg'); //attList.getSPItemsWithQuery(query).Items;
                if (AttachmentResult != null && AttachmentResult != undefined && AttachmentResult.length > 0) {
                    if (AttachmentResult[AttachmentResult.length - 1]['ActualResult'] != undefined)
                        pageState[8] = AttachmentResult[AttachmentResult.length - 1]['ActualResult'];
                    else
                        pageState[8] = '';
                    if (AttachmentResult.length > 3) {
                        //var r = attList.deleteItem(AttachmentResult[0]['ID']);
                        var l = AttachmentResult.length;
                        var rem = l % 3;
                        if (rem == 0)
                            var index = 2;
                        else if (rem == 1)
                            index = 0;
                        else
                            index = 1;
                    }
                    else
                        var index = AttachmentResult.length - 1;

                    var index2 = AttachmentResult.length - 1;

                    //var a = window.location.href.split("SitePages")[0];
                    var url = "";// a+"Lists/Attachment/Attachments/"+AttachmentResult[index2]['ID']+"/"+AttachmentResult[index2]['FileName'];

                    var data = {
                        "testStepPlanId": pageState[12],
                        "actAttachmentName": AttachmentResult[index2]['AttachmentName'],
                        "actAttachmentUrl": url,
                        "actAttachmentIndex": index
                    };
                    var result = ServiceLayer.InsertUpdateData("AddActAttachment", data, "TestingPg");

                    Main.deletecookie("TesterPageState");
                }
                switch (pageState[5]) {
                    case "all":
                        teststepfortester.startIndexA = parseInt(pageState[0]);
                        teststepfortester.saveOnNextPreviousFlag = 0;
                        teststepfortester.modifySearchResultString();
                        teststepfortester.fillTestPassStatus();
                        teststepfortester.startIndexA = parseInt(pageState[0]);
                        break;
                    case "passed":
                        teststepfortester.passedStartIndexA = parseInt(pageState[1]);
                        teststepfortester.saveOnNextPreviousFlag = 0;
                        teststepfortester.modifySearchResultString();
                        teststepfortester.fillTestPassStatus();
                        teststepfortester.passedStartIndexA = parseInt(pageState[1]);
                        break;
                    case "failed":
                        teststepfortester.failedStartIndexA = parseInt(pageState[2]);
                        teststepfortester.saveOnNextPreviousFlag = 0;
                        teststepfortester.modifySearchResultString();
                        teststepfortester.fillTestPassStatus();
                        teststepfortester.failedStartIndexA = parseInt(pageState[2]);
                        break;
                    case "notCompleted":
                        teststepfortester.notCompletedStartIndexA = parseInt(pageState[3]);
                        teststepfortester.saveOnNextPreviousFlag = 0;
                        teststepfortester.modifySearchResultString();
                        teststepfortester.fillTestPassStatus();
                        teststepfortester.notCompletedStartIndexA = parseInt(pageState[3]);
                        break;
                    case "searchResult":
                        teststepfortester.fillTestPassStatus();
                        $("#txtSearch").val(pageState[6]);
                        teststepfortester.gLastSearchString = pageState[6];
                        teststepfortester.fsearch();
                        teststepfortester.searchResultStartIndexA = parseInt(pageState[4]);
                        teststepfortester.saveOnNextPreviousFlag = 0;
                        teststepfortester.searchResultStartIndexA = parseInt(pageState[4]);
                        break;
                    case "pending":
                        teststepfortester.pendingStartIndexA = parseInt(pageState[3]);
                        teststepfortester.saveOnNextPreviousFlag = 0;
                        teststepfortester.modifySearchResultString();
                        teststepfortester.fillTestPassStatus();
                        teststepfortester.pendingStartIndexA = parseInt(pageState[3]);
                }

                for (var j = 0; j < teststepfortester.testCaseListResult.length; j++) {
                    var obj = new Option();
                    document.getElementById('ddTestCases').options[j] = obj;
                    document.getElementById('ddTestCases').options[j].text = trimText((j + 1) + ". " + teststepfortester.testCaseListResult[j]['testCaseName'], 20); //Modified by shilpa on 3 Dec for bug 4200
                    document.getElementById('ddTestCases').options[j].title = teststepfortester.testCaseListResult[j]['testCaseName'];
                    document.getElementById('ddTestCases').options[j].value = teststepfortester.testCaseListResult[j]["testCaseId"];
                }
                //////////////////////
                if (teststepfortester.total == 0)
                    teststepfortester.alertBox2("There are no " + teststepfortester.gConfigTestStep + "s under this " + teststepfortester.gConfigTestPass + ".");//:SD

                $("#ddTestCases").attr('selectedIndex', parseInt(pageState[10]));
                var TestCaseId = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value;
                if (teststepfortester.childListResult.length != 0) {
                    for (var x = 0; x < teststepfortester.childListResult.length; x++) {
                        if (teststepfortester.childListResult[x]['testStepPlanId'] == pageState[11] && TestCaseId == teststepfortester.childListResult[x]["TCID"]) {
                            var flagForBuffer = true;
                            $('.actions').css("background-image", "");
                            $('.actions').css("background-position", "");
                            $('.actions').css("background-repeat", "");
                            var foundInRespectiveBuffer = false;
                            switch (pageState[5]) {
                                case "passed":
                                    for (var i = 0; i < teststepfortester.passedTestSteps.length; i++) {

                                        if (teststepfortester.TCIDArray[i] == TestCaseId && teststepfortester.passedTestSteps[i]['ID'] == pageState[11]) {
                                            teststepfortester.passedStartIndexA = i;
                                            teststepfortester.fillPassedGrid();
                                            foundInRespectiveBuffer = true;
                                            break;
                                        }
                                    }
                                    break;
                                case "failed":
                                    for (var i = 0; i < teststepfortester.failedTestSteps.length; i++) {

                                        if (teststepfortester.TCIDArrayForFail[i] == TestCaseId && teststepfortester.failedTestSteps[i]['ID'] == pageState[11]) {
                                            teststepfortester.failedStartIndexA = i;
                                            teststepfortester.fillFailedGrid();
                                            foundInRespectiveBuffer = true;
                                            break;
                                        }
                                    }
                                    break;
                                    break;
                                case "notCompleted":
                                    for (var i = 0; i < teststepfortester.notCompletedTestSteps.length; i++) {

                                        if (teststepfortester.TCIDArrayForNotCompleted[i] == TestCaseId && teststepfortester.notCompletedTestSteps[i]['ID'] == pageState[11]) {
                                            teststepfortester.notCompletedStartIndexA = i;
                                            teststepfortester.fillNotCompletedGrid();
                                            foundInRespectiveBuffer = true;
                                            break;
                                        }
                                    }
                                    break;
                                    break;
                                case "searchResult":
                                    for (var i = 0; i < teststepfortester.searchResultTestSteps.length; i++) {

                                        if (teststepfortester.TCIDArrayForSearchResult[i] == TestCaseId && teststepfortester.searchResultTestSteps[i]['ID'] == pageState[11]) {
                                            teststepfortester.searchResultStartIndexA = i;
                                            teststepfortester.fillSearchResultGrid();
                                            foundInRespectiveBuffer = true;
                                            break;
                                        }
                                    }
                                    break;
                                    break;
                                case "pending":
                                    for (var i = 0; i < teststepfortester.pendingTestSteps.length; i++) {

                                        if (teststepfortester.TCIDArrayForPending[i] == TestCaseId && teststepfortester.pendingTestSteps[i]['ID'] == pageState[11]) {
                                            teststepfortester.pendingStartIndexA = i;
                                            teststepfortester.fillPendingGrid();
                                            foundInRespectiveBuffer = true;
                                            break;
                                        }
                                    }
                                    break;

                                case "all":
                                    for (var i = 0; i < teststepfortester.allTestSteps.length; i++) {

                                        if (teststepfortester.TCIDArray[i] == TestCaseId && teststepfortester.allTestSteps[i]['ID'] == pageState[11]) {
                                            teststepfortester.startIndexA = i;
                                            teststepfortester.fillGrid();
                                            foundInRespectiveBuffer = true;
                                            break;
                                        }
                                    }
                                    break;
                            }

                        }

                    }
                    if (foundInRespectiveBuffer == false) {
                        for (var i = 0; i < teststepfortester.allTestSteps.length; i++) {
                            if (teststepfortester.TCIDArray[i] == TestCaseId && teststepfortester.allTestSteps[i]['ID'] == pageState[11]) {
                                teststepfortester.startIndexA = i;
                                teststepfortester.fillGrid();
                                break;
                            }
                        }

                    }

                }

                //Added by Harshal
                switch (pageState[7]) {
                    case "2": $('#radPass').attr("checked", "checked");
                        break;
                    case "3": $('#radFail').attr("checked", "checked");
                        break;
                    case "1": $('#radNotCompleted').attr("checked", "checked");
                        break;
                    case "4": $('#radPending').attr("checked", "checked");
                        break;
                }

                $('#actualResultWithImage').html(pageState[8]);

                ////
                //if (pageState[9] == '2')
                Main.deletecookie("TesterPageState");
                /*else 
	            {
	                var queryVal = pageState[0] + "~" + pageState[1] + "~" + pageState[2] + "~" + pageState[3] + "~" + pageState[4] + "~" + pageState[5] + "~" + pageState[6] + "~" + pageState[7] + "~" + pageState[8] + "~" + '2' + "~" + pageState[10] + "~" + pageState[11]+"~"+pageState[12];
	                Main.setCookie("TesterPageState", queryVal, null);
	            }*/

            }

            if (idAfterSave == null || idAfterSave == undefined) {
                var furtherProcessing = teststepfortester.fillTestPassStatus();
                //============= Start Of Code For Test Cases in Drop Down================>
                if (furtherProcessing != -1) {
                    var j = 0;
                    if (teststepfortester.childListResult.length != 0) {
                        //============= Start Of Code For Test Cases in Drop Down================>
                        for (var j = 0; j < teststepfortester.testCaseListResult.length; j++) {
                            var obj = new Option();
                            document.getElementById('ddTestCases').options[j] = obj;
                            document.getElementById('ddTestCases').options[j].text = trimText((j + 1) + ". " + teststepfortester.testCaseListResult[j]['testCaseName'], 20); //Modified by shilpa on 3 Dec for bug 4200
                            document.getElementById('ddTestCases').options[j].title = teststepfortester.testCaseListResult[j]['testCaseName'];
                            document.getElementById('ddTestCases').options[j].value = teststepfortester.testCaseListResult[j]["testCaseId"];
                        }


                        if (teststepfortester.notCompletedCount != 0) {
                            teststepfortester.fillNotCompletedGrid();
                            $("#ddTestCases > option").each(function () {
                                if (this.value == teststepfortester.TCIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA]) {
                                    this.selected = true;
                                    return;
                                }
                            });

                            var ID = teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA].testStepPlanId;
                            if (isRootWeb)
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            else
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            $('#id' + ID + '').css("background-position", "0px 0px");
                            $('#id' + ID + '').css("background-repeat", "no-repeat");

                        }
                        else if (teststepfortester.pendingCount != 0) {
                            teststepfortester.fillPendingGrid();
                            $("#ddTestCases > option").each(function () {
                                if (this.value == teststepfortester.TCIDArrayForPending[teststepfortester.pendingStartIndexA]) {
                                    this.selected = true;
                                    return;
                                }
                            });
                            var ID = teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA].testStepPlanId;
                            if (isRootWeb)
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            else
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            $('#id' + ID + '').css("background-position", "0px 0px");
                            $('#id' + ID + '').css("background-repeat", "no-repeat");

                        }
                        else if (teststepfortester.failCount != 0) {
                            teststepfortester.fillFailedGrid();
                            $("#ddTestCases > option").each(function () {
                                if (this.value == teststepfortester.TCIDArrayForFail[teststepfortester.failedStartIndexA]) {
                                    this.selected = true;
                                    return;
                                }
                            });
                            var ID = teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA].testStepPlanId;
                            if (isRootWeb)
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            else
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            $('#id' + ID + '').css("background-position", "0px 0px");
                            $('#id' + ID + '').css("background-repeat", "no-repeat");

                        }
                        else if (teststepfortester.passCount != 0) {
                            teststepfortester.fillPassedGrid();
                            $("#ddTestCases > option").each(function () {
                                if (this.value == teststepfortester.TCIDArrayForPass[teststepfortester.passedStartIndexA]) {
                                    this.selected = true;
                                    return;
                                }
                            });
                            var ID = teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA].testStepPlanId;
                            if (isRootWeb)
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            else
                                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                            $('#id' + ID + '').css("background-position", "0px 0px");
                            $('#id' + ID + '').css("background-repeat", "no-repeat");

                        }
                        if (teststepfortester.total == 0)
                            //teststepfortester.alertBox2("There are no test steps under this test pass.");
                            teststepfortester.alertBox2("There are no " + teststepfortester.gConfigTestStep + "s under this " + teststepfortester.gConfigTestPass + ".");//:SD
                        Main.hideLoading();
                    }

                    //=============End Of Code========>	 
                }
                $("img").mousedown(function () { return false }); //Added by shilpa for 5781
                /* shilpa 15 apr */
                if ($("#txtTestStep").find("a").length != 0)
                    $("#txtTestStep").find("a").attr("target", "_blank");
                //Added by swapnil kamle on 4/26/2013
                $("#txtTestStep").find("a").each(function () {
                    $(this).attr('title', $(this)[0].href);
                });

                $('#expectedResultWithImage').find('a').attr('target', '_blank');

                /* to make img non-draggable */
                $('#actualResultWithImage').mouseover(function (e) {
                    $(this).bind('dragstart', function (event) { event.preventDefault(); });
                });
                /**/

                /* shilpa 14 may */
                /* Added by shilpa for paging on 16 May **/
                var arr = $(".tblResult tr").map(function (i, el) { if ($(el).find(".actions").css("background-image") != "none") { return $(el).index(); } }).get();
                teststepfortester.currentPointer = arr[0];

                var a = arr[0] / 10;
                a = a % 10;
                for (var i = 1; i <= a; i++)
                    teststepfortester.Next10();
                /**/
                window.setTimeout("Main.hideLoading()", 200);
            }


            if (teststepfortester.testingType == "1")// If sequencing within Test Pass is selected
            {
                $("#navigation").hide();
                $("#newPagination").hide();
            }
        }
    },

    onChangeTestCase: function () {
        teststepfortester.indexStart = 0;
        teststepfortester.preFetchTestSteps();
        teststepfortester.displayPaging();
        var TSID = $(".tblResult").find("a:eq(0)").attr("id");
        if (isRootWeb)
            $('#' + TSID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        else
            $('#' + TSID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        $('#' + TSID + '').css("background-position", "0px 0px");
        $('#' + TSID + '').css("background-repeat", "no-repeat");

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
    },
    ChildIDForTSID: new Array(),
    //============= Start Of Code For Changing the Test Cases in Drop Down================>
    preFetchTestSteps: function () {
        var arr = new Array();
        //var TestPassMappingId = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value.split(',')[1];
        var TestCaseId = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value;
        var StatusForTSID = new Array();
        var ActionTable2;
        var status = '';
        if (teststepfortester.childListResult.length != 0) {
            var ActionTable2 = new Array();
            var tsids = new Array();
            for (var i = 0; i < teststepfortester.childListResult.length; i++) {
                if (teststepfortester.childListResult[i]['TCID'] == TestCaseId) {
                    StatusForTSID[teststepfortester.childListResult[i]['ID']] = teststepfortester.childListResult[i]['status'];
                    teststepfortester.ChildIDForTSID[teststepfortester.childListResult[i]['ID']] = teststepfortester.childListResult[i]['ID'];
                    tsids.push(teststepfortester.childListResult[i]['ID']);
                }
            }
            for (var i = 0; i < teststepfortester.actionListResult.length; i++) {
                if ($.inArray(teststepfortester.actionListResult[i]['ID'], tsids) != -1)
                    ActionTable2.push(teststepfortester.actionListResult[i]);
            }
            var ActionTableLength = (ActionTable2.length);

            $('.ddlTestCases').siblings('p').html('Total Steps/Scripts:<span class="txtorange">' + ActionTableLength + '</span>');
            var html = '';
            var called = false;
            var i;
            var TestStepStatus;
            var html = '';
            var actionNumber = '';
            for (i = 0; i < ActionTable2.length; i++) {
                if (teststepfortester.testingType != "1")
                    actionNumber = i + 1; //Code added by deepak for sequencing 
                else
                    actionNumber = teststepfortester.forTSIDGetSequence[ActionTable2[i]["ID"]];
                //Nikhil - 03/04/2012 - Handle Bulleted Text.
                var vActionName = teststepfortester.GetFormatedText(ActionTable2[i]["testStepName"].toString(), 'false');
                vActionName = teststepfortester.filterData(vActionName);
                var trimmedActionName = trimText(vActionName, 15);
                vActionName = vActionName.split('"').join('&quote;');

                switch (StatusForTSID[ActionTable2[i]['ID']]) {
                    case "2":
                        status = "2";
                        html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["ID"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgreen">Pass</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                        break;
                    case "3":
                        status = "3";
                        html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["ID"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtred">Fail</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                        break;
                    case "1":
                        status = "1";
                        html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["ID"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgold">Not Completed</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                        break;
                    case "4":
                        status = "4";
                        html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["ID"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgoldenbrown">Pending</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                        break;
                    case undefined:
                        status = "1";
                        html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["ID"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgold">Not Completed</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                }
                arr.push(html);
                teststepfortester.TsIds.push(ActionTable2[i]["testStepPlanId"]);
                teststepfortester.ActionNumberForChildID[ActionTable2[i]["testStepPlanId"]] = i + 1;
            }
            teststepfortester.forTCIDGetLastTestStep[TestCaseId] = ActionTable2[i - 1]['testStepPlanId'];
            teststepfortester.ShowTestStep(1, ActionTable2[0]["testStepPlanId"], TestStepStatus, TestCaseId);

            /* shilpa 14 may */
            $('.tblResult').empty().html(html);

            var ID = ActionTable2[0]["ID"];
            if (isRootWeb)
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            else
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            $('#id' + ID + '').css("background-position", "0px 0px");
            $('#id' + ID + '').css("background-repeat", "no-repeat");

            /* shilpa 15 apr */
            if ($("#txtTestStep").find("a").length != 0)
                $("#txtTestStep").find("a").attr("target", "_blank");
            $('#expectedResultWithImage').find('a').attr('target', '_blank');

        }
    },
    TsIds: new Array(),
    fetchTestSteps: function () {
        teststepfortester.TsIds.length = 0;
        var status = '';
        if (document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value != undefined) {
            var arr = new Array();
            var TestCaseId = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value;
            var StatusForTSID = new Array();
            if (teststepfortester.childListResult.length != 0) {
                var ActionTable2 = new Array();
                var tsids = new Array();
                for (var i = 0; i < teststepfortester.childListResult.length; i++) {
                    if (teststepfortester.childListResult[i]['TCID'] == TestCaseId) {
                        StatusForTSID[teststepfortester.childListResult[i]['testStepPlanId']] = teststepfortester.childListResult[i]['status'];
                        teststepfortester.ChildIDForTSID[teststepfortester.childListResult[i]['testStepPlanId']] = teststepfortester.childListResult[i]['ID'];
                        tsids.push(teststepfortester.childListResult[i]['testStepPlanId']);
                    }
                }
                for (var i = 0; i < teststepfortester.actionListResult.length; i++) {
                    if ($.inArray(teststepfortester.actionListResult[i]['testStepPlanId'], tsids) != -1)
                        ActionTable2.push(teststepfortester.actionListResult[i]);
                }
                var ActionTableLength = (ActionTable2.length);
                $('.ddlTestCases').siblings('p').html('Total Steps/Scripts:<span class="txtorange">' + ActionTableLength + '</span>');
                var html = '';
                var actionNumber = '';
                /********************************Added by HRW*************************************************************************/
                for (i = 0; i < ActionTable2.length; i++) {
                    if (teststepfortester.testingType != "1")
                        actionNumber = i + 1; //Code added by deepak for sequencing 
                    else
                        actionNumber = teststepfortester.forTSIDGetSequence[ActionTable2[i]["testStepPlanId"]];
                    //Nikhil - 03/04/2012 - Handle Bulleted Text.
                    var vActionName = teststepfortester.GetFormatedText(ActionTable2[i]["testStepName"].toString(), 'false');
                    vActionName = teststepfortester.filterData(vActionName);
                    var trimmedActionName = trimText(vActionName, 15);
                    trimmedActionName = trimmedActionName.replace(/</g, "&lt;"); //shilpa 16 apr bug 7656
                    trimmedActionName = trimmedActionName.replace(/>/g, "&gt;"); //shilpa 16 apr bug 7656
                    vActionName = vActionName.split('"').join('&quote;');

                    switch (StatusForTSID[ActionTable2[i]['testStepPlanId']]) {
                        case "2":
                            status = "2";
                            html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["testStepPlanId"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgreen" >Pass</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                            break;
                        case "3":
                            status = "3";
                            html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["testStepPlanId"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtred">Fail</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                            break;
                        case "1":
                            status = "1";
                            html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["testStepPlanId"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgold" >Not Completed</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                            break;
                        case "4":
                            status = "4";
                            html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["testStepPlanId"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgoldenbrown">Pending</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                            break;
                        case undefined:
                            status = "1";
                            html += '<tr><td><a style="cursor:pointer" class="actions" id="id' + ActionTable2[i]["testStepPlanId"] + '" onclick="teststepfortester.ShowTestStep(' + actionNumber + ',' + ActionTable2[i]["ID"] + ',\'' + status + '\',' + TestCaseId + ');"><b>' + trimmedActionName + '</b>Status: <span class="txtgold" >Not Completed</span></a></td><td class="testStepID">' + actionNumber + '</td></tr>';
                    }
                    arr.push(html);
                    teststepfortester.TsIds.push(ActionTable2[i]["testStepPlanId"]);
                    teststepfortester.ActionNumberForChildID[ActionTable2[i]["testStepPlanId"]] = i + 1;
                }
                teststepfortester.forTCIDGetLastTestStep[TestCaseId] = ActionTable2[i - 1]['testStepPlanId'];

                /* shilpa 14 may */
                $('.tblResult').empty().html(html);
            }
        }

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
    },

    Next: function () {
        //Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid()',100);

        teststepfortester.saveOnNextPrevious();
        if (teststepfortester.BlockNextPreviousNavigation != true) {
            for (var i = 0; i < teststepfortester.allTestSteps.length; i++) {
                if (teststepfortester.allTestSteps[i]['testStepPlanId'] == document.getElementById('hidTestStepID').value)// && teststepfortester.allTestSteps[i+1] != undefined)//Test Step can not be comman within two(or more Test Cases) 
                {
                    if (teststepfortester.allTestSteps[i + 1] != undefined)//Move above condition here for bug id 12826 
                        teststepfortester.startIndexA = i + 1;
                    teststepfortester.fillGrid();
                    break;
                }
            }
        }
        else
            teststepfortester.BlockNextPreviousNavigation = false;
    },
    Prev: function () {
        teststepfortester.saveOnNextPrevious();
        if (teststepfortester.BlockNextPreviousNavigation != true) {
            for (var i = 1; i < teststepfortester.allTestSteps.length; i++) {
                if (teststepfortester.allTestSteps[i]['testStepPlanId'] == document.getElementById('hidTestStepID').value)//Test Step can not be comman within two(or more Test Cases) 
                {
                    teststepfortester.startIndexA = i - 1;
                    teststepfortester.fillGrid();
                    break;
                }
            }
            var arr = $(".tblResult tr").map(function (i, el) { if ($(el).find(".actions").css("background-image") != "none") { return $(el).index(); } }).get();
            teststepfortester.currentPointer = arr[0];
            teststepfortester.indexStart = (teststepfortester.gPageIndex) * 10;
            if (arr[0] == 9)
                teststepfortester.Prev10();
        }
        else
            teststepfortester.BlockNextPreviousNavigation = false;
    },

    Next10: function () {
        teststepfortester.indexStart += 10;
        teststepfortester.displayPaging();
    },
    Prev10: function () {
        if (teststepfortester.indexStart >= 10) {
            teststepfortester.indexStart -= 10;
            teststepfortester.displayPaging();
        }
    },

    displayPaging: function () {
        var resultLength = $('.tblResult').find("tr").length;

        if (resultLength > (teststepfortester.indexStart + 10))
            var Ei2 = teststepfortester.indexStart + 10;
        else
            var Ei2 = resultLength;

        //var info = '<label>Showing ' + (teststepfortester.indexStart + 1) + '-' + Ei2 + ' From Total ' + resultLength + ' Steps</label>';
        var info = '<label>Showing ' + (teststepfortester.indexStart + 1) + '-' + Ei2 + ' From Total ' + resultLength + ' ' + teststepfortester.gConfigTestStep + 's</label>';//:SD
        $('#showPagination').html(info);


        if (teststepfortester.indexStart <= 0) {
            $("#prevPage").attr("disabled", "disabled");
            $("#prevPage").css("color", "#989898");
        }
        else {
            $("#prevPage").attr("disabled", false);
            $("#prevPage").addClass("prevNextPg");
        }

        if (resultLength <= (teststepfortester.indexStart + 10)) {
            $("#nextPage").attr("disabled", "disabled");
            $("#nextPage").css("color", "#989898");
            teststepfortester.flag = 1;
        }
        else {
            $("#nextPage").attr("disabled", false);
            $("#nextPage").addClass("prevNextPg");
            teststepfortester.flag = 0;
        }

        if (resultLength > 10) {
            $('.tblResult').find("tr").slice(0, $('.tblResult').find("tr").length).css("display", "none");
            $('.tblResult').find("tr").slice(teststepfortester.indexStart, Ei2).css("display", "");
        }
    },

    //=============End Of Code========>	
    IDForShowTestStep: '',
    //Code Added By Rajiv
    ShowTestStep: function (ActionNumber, ID, status, TestCaseId) {
        teststepfortester.IDForShowTestStep = ID;
        var flagForBuffer = true;
        $('.actions').css("background-image", "");
        $('.actions').css("background-position", "");
        $('.actions').css("background-repeat", "");
        if (isRootWeb)
            $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        else
            $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        $('#id' + ID + '').css("background-position", "0px 0px");
        $('#id' + ID + '').css("background-repeat", "no-repeat");
        var foundInRespectiveBuffer = false;

        /*Code added by Rajiv on 3 April for filling buffer of total scripts*/
        for (var i = 0; i < teststepfortester.allTestSteps.length; i++) {
            if (teststepfortester.TCIDArray[i] == TestCaseId && teststepfortester.allTestSteps[i]['testStepPlanId'] == ID) {
                teststepfortester.startIndexA = i;
                teststepfortester.fillGridForShowTestStep();
                foundInRespectiveBuffer = true;
                break;
            }
        }
        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        var childID = teststepfortester.ChildIDForTSID[ID];
        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TestCaseId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.forTCIDGetLastTestStep[TestCaseId] == childID && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();
    },
    //New function created for solving the paging issue
    fillGridForShowTestStep: function () {
        teststepfortester.gridFlag = "all";
        $("[name$='HiddenField_URL']").val(teststepfortester.startIndexA + ";" + teststepfortester.passedStartIndexA + ";" + teststepfortester.failedStartIndexA + ";" + teststepfortester.notCompletedStartIndexA + ";" + teststepfortester.pendingStartIndexA + ";" + teststepfortester.searchResultStartIndexA + ";" + teststepfortester.gridFlag);
        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.startIndexA) + 1) + ' of total ' + teststepfortester.total + ' ' + teststepfortester.gConfigTestStep + '(s) only</label>';//:SD

        $("#btnSave").attr('onClick', '');
        $('.testPassNavigation').empty();
        var indexCount = (teststepfortester.failedStartIndexA) + 1;
        if (indexCount != teststepfortester.notCompletedTestSteps.length) {
            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid();\',100);"><br /></a></div><div class="clear"></div>');
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid();',100);");

        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid();\',100);"/><br /></a></div><div class="clear"></div>');
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid();',100);");
        }

        $('#divActionCount').append('<a id="previous" style="cursor:pointer" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()">' +
				'Previous</a> | <a id="next" style="cursor:pointer" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid()">Next</a>');


        if (teststepfortester.allTestSteps != null && teststepfortester.allTestSteps != undefined && teststepfortester.allTestSteps != '') {
            var TCId = teststepfortester.TCIDArray[teststepfortester.startIndexA];
            teststepfortester.hidTestCaseID = TCId;
            var TestCaseName = teststepfortester.TCNameArray[TCId];
            var actionNumber = parseInt(teststepfortester.allTestSteps[teststepfortester.startIndexA]["testStepSeq"].toString()) + 1; //code added by rajiv for sequencing

            if (TestCaseName != null || TestCaseName != undefined) {
                document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
                document.getElementById('tdTestCase').title = TestCaseName;

                document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
                document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

                if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                    var estTime = teststepfortester.EstimatedTime[TCId];
                else
                    var estTime = ' N/A';
                document.getElementById('estTime').innerHTML = estTime;

                //////////////
                document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.allTestSteps[teststepfortester.startIndexA]['testStepPlanId']);
                if (teststepfortester.allTestSteps[teststepfortester.startIndexA]['expResult'] != null && teststepfortester.allTestSteps[teststepfortester.startIndexA]['expResult'] != undefined)
                    $('#expectedResultWithImage').html(teststepfortester.allTestSteps[teststepfortester.startIndexA]['expResult']);
                else
                    $('#expectedResultWithImage').html('-');
                if (teststepfortester.ActualResultArray[teststepfortester.startIndexA] != null
                        && teststepfortester.ActualResultArray[teststepfortester.startIndexA] != undefined
                        && teststepfortester.ActualResultArray[teststepfortester.startIndexA] != '') {
                    $('#actualResultWithImage').html(teststepfortester.ActualResultArray[teststepfortester.startIndexA]);
                    teststepfortester.landedActualResult = $('#actualResultWithImage').html();
                }
                else {
                    $('#actualResultWithImage').html("");
                    teststepfortester.landedActualResult = '';
                }

                for (var m = 0; m < teststepfortester.StatusArray.length; m++) {

                    if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "1") {
                        var ncstatus = '1';
                        $('#radNotCompleted').attr("checked", "checked");
                        teststepfortester.landedStatus = ncstatus;
                    }
                    else if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "4") {
                        var ncstatus = '4';
                        $('#radPending').attr("checked", "checked");
                        teststepfortester.landedStatus = ncstatus;
                    }

                    else if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "2") {
                        var pstatus = '2';
                        $('#radPass').attr("checked", "checked");
                        teststepfortester.landedStatus = pstatus;
                    }
                    else if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "3") {
                        var fstatus = '3'
                        $('#radFail').attr("checked", "checked");
                        teststepfortester.landedStatus = fstatus;
                    }
                }

                var childID = teststepfortester.ChildIDArray[teststepfortester.startIndexA];
                teststepfortester.viewAttachments(childID);
            }
        }
        var ID = teststepfortester.allTestSteps[teststepfortester.startIndexA]['testStepPlanId'];
        if (isRootWeb)
            $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        else
            $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");

        $('#id' + ID + '').css("background-position", "0px 0px");
        $('#id' + ID + '').css("background-repeat", "no-repeat");

        //Code added by deepak for sequencing 
        var childID = teststepfortester.ChildIDArray[teststepfortester.startIndexA];
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];

        //Added for scenario 2 of Bug 8031
        var ID = teststepfortester.allTestSteps[teststepfortester.startIndexA]['testStepPlanId'];
        var index = $.inArray(ID, teststepfortester.TsIds);
        if (index != 0) {
            if ((index / 10).toString().indexOf(".") != -1)
                teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
            else
                teststepfortester.gPageIndex = Math.ceil(index / 10);

        }
        else
            teststepfortester.gPageIndex = 0;

        var vActionName = teststepfortester.GetFormatedText(teststepfortester.allTestSteps[teststepfortester.startIndexA].testStepName, 'false');
        var completeActionName = vActionName.replace(/(\r\n)+/g, '');
        if (vActionName.indexOf("<") != -1 && vActionName.indexOf(">") != -1)
            vActionName = completeActionName;
        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vActionName + '</td></tr></tbody></table>';
        //Code added by deepak for sequencing 

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));
    },
    //End of code
    dmlOperation: function (search, list) {
        var listname = jP.Lists.setSPObject(teststepfortester.SiteURL, list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        return (result);
    },
    childListResult: new Array(),
    actionListResult: new Array(),
    testCaseListResult: new Array(),
    forTCIDGetSequence: new Array(),
    forTSIDGetSequence: new Array(),
    forTCIDGetStatus: new Array(),
    testCaseListResult2: new Array(),
    fillTestPassStatus: function () {
        teststepfortester.childListResult = new Array();
        teststepfortester.forTSIDGetSequence.length = 0;
        teststepfortester.objValidate.length = 0;
        teststepfortester.passCount = 0;
        teststepfortester.failCount = 0;
        teststepfortester.notCompletedCount = 0;
        teststepfortester.total = 0;
        teststepfortester.failedTestSteps.length = 0;
        teststepfortester.passedTestSteps.length = 0;
        teststepfortester.notCompletedTestSteps.length = 0;
        teststepfortester.forTCIDGetStatus.length = 0;
        /*************For Pending***************************/
        teststepfortester.pendingCount = 0;
        teststepfortester.pendingTestSteps.length = 0,
     	teststepfortester.TCIDArrayForPending.length = 0;
        teststepfortester.ActualResultArrayForPending.length = 0;
        teststepfortester.StatusArrayForPending.length = 0;
        /**************************************************/

        teststepfortester.allTestSteps.length = 0;
        teststepfortester.TCIDArray.length = 0;
        teststepfortester.StatusArray.length = 0;
        teststepfortester.ActualResultArray.length = 0;
        teststepfortester.TCIDArrayForPass.length = 0;
        teststepfortester.StatusArrayForPass.length = 0;
        teststepfortester.ActualResultArrayForPass.length = 0;
        teststepfortester.TCIDArrayForFail.length = 0;
        teststepfortester.StatusArrayForFail.length = 0;
        teststepfortester.ActualResultArrayForFail.length = 0;
        teststepfortester.TCIDArrayForNotCompleted.length = 0;
        teststepfortester.StatusArrayForNotCompleted.length = 0;
        teststepfortester.ActualResultArrayForNotCompleted.length = 0;
        teststepfortester.TCIDArrayForSearchResult.length = 0;
        teststepfortester.StatusArrayForSearchResult.length = 0;
        teststepfortester.ActualResultArrayForSearchResult.length = 0;

        teststepfortester.ChildIDArray.length = 0;
        teststepfortester.ChildIDArrayForPass.length = 0;
        teststepfortester.ChildIDArrayForFail.length = 0;
        teststepfortester.ChildIDArrayForNotCompleted.length = 0;
        teststepfortester.ChildIDArrayForPending.length = 0;
        teststepfortester.ChildIDArrayForSearchResult.length = 0;

        var totalTestCasesCount = 0;
        var arr = [];
        var TestCaseToTestStepMappingList = new Array();
        var result = ServiceLayer.GetData("GetTestCasesTestSteps", teststepfortester.searchTestPassKey + "&" + teststepfortester.searchRoleKey, "TestingPg");
        var getTCIDForTestplanID = new Array();
        if (result != undefined && result != '') {
            totalTestCasesCount = result.length;
            var tcSeq = '';
            teststepfortester.testCaseListResult = new Array();
            for (var i = 0; i < result.length; i++) {
                teststepfortester.testCaseListResult.push(result[i]);

                teststepfortester.TCNameArray[result[i].testCaseId] = result[i].testCaseName;
                teststepfortester.EstimatedTime[result[i].testCaseId] = result[i].testCaseETT;
                teststepfortester.TCDescArray[result[i].testCaseId] = result[i].testCaseDescription;
                if (result[i].testCaseSeq != undefined) {
                    teststepfortester.forTCIDGetSequence[result[i].testCaseId] = parseInt(result[i].testCaseSeq.toString()) + 1;
                    tcSeq = parseInt(result[i].testCaseSeq.toString()) + 1;
                }
                else {
                    teststepfortester.forTCIDGetSequence[result[i].testCaseId] = i + 1;
                    tcSeq = i + 1;
                }

                arr = result[i].listTestStep;
                for (var ii = 0; ii < arr.length; ii++) {
                    arr[ii]['ID'] = arr[ii].testStepPlanId;
                    arr[ii]['TCID'] = result[i].testCaseId;
                    arr[ii]['TCSeq'] = tcSeq;
                    arr[ii]['TCPosition'] = tcSeq;

                    TestCaseToTestStepMappingList.push(arr[ii]);
                    getTCIDForTestplanID[arr[ii].testStepPlanId] = result[i].testCaseId;
                }
            }
        }

        ///////**********
        var testCaseListResult = new Array();

        testCaseListResult = teststepfortester.testCaseListResult;
        teststepfortester.testCaseListResult2 = teststepfortester.testCaseListResult2;

        ///////   End  ***********
        var TestPassToTestCaseMappingListBuffer = new Array();

        if (TestCaseToTestStepMappingList == null || TestCaseToTestStepMappingList == undefined) {
            teststepfortester.alertBox2("You do not have any " + teststepfortester.gConfigTestCase + "(s) from the current " + teststepfortester.gConfigTestPass + "! Visit Dashboard to see your assigned " + teststepfortester.gConfigTestPass + "(s)!");//:SD
            return -1;
        }
        Main.hideLoading();
        if (TestCaseToTestStepMappingList.length != 0) {
            teststepfortester.childListResult = TestCaseToTestStepMappingList;
            teststepfortester.actionListResult = TestCaseToTestStepMappingList;

            //Added for solving sequence issue/////////////////////////////////////////////
            var TCIDArrayForFail = new Array();
            var StatusArrayForFail = new Array();
            var ActualResultArrayForFail = new Array();
            var ChildIDArrayForFail = new Array();

            var TCIDArrayForPass = new Array();
            var StatusArrayForPass = new Array();
            var ActualResultArrayForPass = new Array();
            var ChildIDArrayForPass = new Array();

            var TCIDArrayForPending = new Array();
            var StatusArrayForPending = new Array();
            var ActualResultArrayForPending = new Array();
            var ChildIDArrayForPending = new Array();

            var TCIDArrayForNotCompleted = new Array();
            var StatusArrayForNotCompleted = new Array();
            var ActualResultArrayForNotCompleted = new Array();
            var ChildIDArrayForNotCompleted = new Array();

            var TCIDArray = new Array();
            var StatusArray = new Array();
            var ActualResultArray = new Array();
            var ChildIDArray = new Array();
            ////////////////////////////////////////////////////////////////////////////////

            for (var x = 0; x < TestCaseToTestStepMappingList.length; x++) {
                if (teststepfortester.forTCIDGetStatus[TestCaseToTestStepMappingList[x]['TCID']] == undefined)
                    teststepfortester.forTCIDGetStatus[TestCaseToTestStepMappingList[x]['TCID']] = TestCaseToTestStepMappingList[x].status;
                else
                    teststepfortester.forTCIDGetStatus[TestCaseToTestStepMappingList[x]['TCID']] += "," + TestCaseToTestStepMappingList[x].status;

                if (TestCaseToTestStepMappingList[x].actResult == null || TestCaseToTestStepMappingList[x].actResult == undefined)
                    TestCaseToTestStepMappingList[x]['ActualResult'] = '';

                teststepfortester.objValidate.push({
                    'TestStepIDAndTestCaseID': TestCaseToTestStepMappingList[x].testStepPlanId + "," + TestCaseToTestStepMappingList[x].TCID,
                    'Sequence': parseInt(TestCaseToTestStepMappingList[x].testStepSeq.toString()) + 1,
                    'status': TestCaseToTestStepMappingList[x].status,
                    'TCID': TestCaseToTestStepMappingList[x].TCID,
                    'TCPosition': TestCaseToTestStepMappingList[x].TCSeq
                });
                //1: NC 
                //2: Pass
                //3: Fail
                //4: Pending
                switch (TestCaseToTestStepMappingList[x].status) {
                    case "3":
                        {
                            teststepfortester.failCount++;
                            teststepfortester.failedTestSteps.push(TestCaseToTestStepMappingList[x]);

                            TCIDArrayForFail.push({ 'Data': TestCaseToTestStepMappingList[x].TCID, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            StatusArrayForFail.push({ 'Data': "3", 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ActualResultArrayForFail.push({ 'Data': TestCaseToTestStepMappingList[x].actResult, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ChildIDArrayForFail.push({ 'Data': TestCaseToTestStepMappingList[x].testStepPlanId, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                        }
                        break;
                    case "2":
                        {

                            teststepfortester.passCount++;
                            teststepfortester.passedTestSteps.push(TestCaseToTestStepMappingList[x]);

                            TCIDArrayForPass.push({ 'Data': TestCaseToTestStepMappingList[x].TCID, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            StatusArrayForPass.push({ 'Data': "2", 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ActualResultArrayForPass.push({ 'Data': TestCaseToTestStepMappingList[x].actResult, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ChildIDArrayForPass.push({ 'Data': TestCaseToTestStepMappingList[x].testStepPlanId, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });
                        }
                        break;
                    case "1":
                        {
                            teststepfortester.notCompletedCount++;
                            teststepfortester.notCompletedTestSteps.push(TestCaseToTestStepMappingList[x]);

                            TCIDArrayForNotCompleted.push({ 'Data': TestCaseToTestStepMappingList[x].TCID, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            StatusArrayForNotCompleted.push({ 'Data': "1", 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ActualResultArrayForNotCompleted.push({ 'Data': TestCaseToTestStepMappingList[x].actResult, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ChildIDArrayForNotCompleted.push({ 'Data': TestCaseToTestStepMappingList[x].testStepPlanId, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });
                        }
                        break;

                    case "4":
                        {
                            teststepfortester.pendingCount++;
                            teststepfortester.pendingTestSteps.push(TestCaseToTestStepMappingList[x]);

                            TCIDArrayForPending.push({ 'Data': TestCaseToTestStepMappingList[x].TCID, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            StatusArrayForPending.push({ 'Data': "4", 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ActualResultArrayForPending.push({ 'Data': TestCaseToTestStepMappingList[x].actResult, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                            ChildIDArrayForPending.push({ 'Data': TestCaseToTestStepMappingList[x].testStepPlanId, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });
                        }
                }
                teststepfortester.allTestSteps.push(TestCaseToTestStepMappingList[x]);

                TCIDArray.push({ 'Data': TestCaseToTestStepMappingList[x].TCID, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                StatusArray.push({ 'Data': TestCaseToTestStepMappingList[x].status, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                ChildIDArray.push({ 'Data': TestCaseToTestStepMappingList[x].testStepPlanId, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                ActualResultArray.push({ 'Data': TestCaseToTestStepMappingList[x].actResult, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

            }
            //Added for solving sequence issue/////////////////////////////////////////////	
            teststepfortester.actionListResult.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });
            if (teststepfortester.testingType != "1") {
                teststepfortester.actionListResult.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
            }

            teststepfortester.objValidate.sort(function (a, b) {
                return a.Sequence - b.Sequence
            });

            teststepfortester.failedTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });


            teststepfortester.passedTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });


            teststepfortester.notCompletedTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });


            teststepfortester.pendingTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });

            teststepfortester.allTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });
            if (teststepfortester.testingType != "1") {
                teststepfortester.allTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.pendingTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.notCompletedTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.failedTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.objValidate.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.passedTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
            }
            else {
                for (var i = 0; i < teststepfortester.allTestSteps.length; i++)
                    teststepfortester.forTSIDGetSequence[teststepfortester.allTestSteps[i]['testStepPlanId']] = i + 1;
            }

            ///////////////  Fail  ////////////////////////////////////////////////////

            if (TCIDArrayForFail.length != 0) {
                TCIDArrayForFail.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    TCIDArrayForFail.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });
                }

                for (var i = 0; i < TCIDArrayForFail.length; i++)
                    teststepfortester.TCIDArrayForFail.push(TCIDArrayForFail[i]['Data']);
            }
            if (StatusArrayForFail.length != 0) {
                StatusArrayForFail.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    StatusArrayForFail.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < StatusArrayForFail.length; i++)
                    teststepfortester.StatusArrayForFail.push(StatusArrayForFail[i]['Data']);
            }
            if (ActualResultArrayForFail.length != 0) {
                ActualResultArrayForFail.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ActualResultArrayForFail.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ActualResultArrayForFail.length; i++)
                    teststepfortester.ActualResultArrayForFail.push(ActualResultArrayForFail[i]['Data']);

            }
            if (ChildIDArrayForFail.length != 0) {
                ChildIDArrayForFail.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ChildIDArrayForFail.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });
                }

                for (var i = 0; i < ChildIDArrayForFail.length; i++)
                    teststepfortester.ChildIDArrayForFail.push(ChildIDArrayForFail[i]['Data']);
            }
            ///////////////  Pass  ////////////////////////////////////////////////////

            if (TCIDArrayForPass.length != 0) {
                TCIDArrayForPass.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    TCIDArrayForPass.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < TCIDArrayForPass.length; i++)
                    teststepfortester.TCIDArrayForPass.push(TCIDArrayForPass[i]['Data']);
            }
            if (StatusArrayForPass.length != 0) {
                StatusArrayForPass.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    StatusArrayForPass.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < StatusArrayForPass.length; i++)
                    teststepfortester.StatusArrayForPass.push(StatusArrayForPass[i]['Data']);
            }
            if (ActualResultArrayForPass.length != 0) {
                ActualResultArrayForPass.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ActualResultArrayForPass.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ActualResultArrayForPass.length; i++)
                    teststepfortester.ActualResultArrayForPass.push(ActualResultArrayForPass[i]['Data']);
            }
            if (ChildIDArrayForPass.length != 0) {
                ChildIDArrayForPass.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ChildIDArrayForPass.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ChildIDArrayForPass.length; i++)
                    teststepfortester.ChildIDArrayForPass.push(ChildIDArrayForPass[i]['Data']);
            }
            ///////////////  Pending  ////////////////////////////////////////////////////

            if (TCIDArrayForPending.length != 0) {
                TCIDArrayForPending.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    TCIDArrayForPending.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < TCIDArrayForPending.length; i++)
                    teststepfortester.TCIDArrayForPending.push(TCIDArrayForPending[i]['Data']);
            }
            if (StatusArrayForPending.length != 0) {
                StatusArrayForPending.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    StatusArrayForPending.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < StatusArrayForPending.length; i++)
                    teststepfortester.StatusArrayForPending.push(StatusArrayForPending[i]['Data']);
            }
            if (ActualResultArrayForPending.length != 0) {
                ActualResultArrayForPending.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ActualResultArrayForPending.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ActualResultArrayForPending.length; i++)
                    teststepfortester.ActualResultArrayForPending.push(ActualResultArrayForPending[i]['Data']);
            }
            if (ChildIDArrayForPending.length != 0) {
                ChildIDArrayForPending.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ChildIDArrayForPending.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ChildIDArrayForPending.length; i++)
                    teststepfortester.ChildIDArrayForPending.push(ChildIDArrayForPending[i]['Data']);
            }

            ///////////////  Not Completed  ////////////////////////////////////////////////////

            if (TCIDArrayForNotCompleted.length != 0) {
                TCIDArrayForNotCompleted.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    TCIDArrayForNotCompleted.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < TCIDArrayForNotCompleted.length; i++)
                    teststepfortester.TCIDArrayForNotCompleted.push(TCIDArrayForNotCompleted[i]['Data']);
            }
            if (StatusArrayForNotCompleted.length != 0) {
                StatusArrayForNotCompleted.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    StatusArrayForNotCompleted.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < StatusArrayForNotCompleted.length; i++)
                    teststepfortester.StatusArrayForNotCompleted.push(StatusArrayForNotCompleted[i]['Data']);
            }
            if (ActualResultArrayForNotCompleted.length != 0) {
                ActualResultArrayForNotCompleted.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ActualResultArrayForNotCompleted.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ActualResultArrayForNotCompleted.length; i++)
                    teststepfortester.ActualResultArrayForNotCompleted.push(ActualResultArrayForNotCompleted[i]['Data']);
            }
            if (ChildIDArrayForNotCompleted.length != 0) {
                ChildIDArrayForNotCompleted.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ChildIDArrayForNotCompleted.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ChildIDArrayForNotCompleted.length; i++)
                    teststepfortester.ChildIDArrayForNotCompleted.push(ChildIDArrayForNotCompleted[i]['Data']);
            }

            ///////////////  All  ////////////////////////////////////////////////////

            if (TCIDArray.length != 0) {
                TCIDArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    TCIDArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < TCIDArray.length; i++)
                    teststepfortester.TCIDArray.push(TCIDArray[i]['Data']);
            }
            if (StatusArray.length != 0) {
                StatusArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    StatusArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < StatusArray.length; i++)
                    teststepfortester.StatusArray.push(StatusArray[i]['Data']);
            }
            if (ActualResultArray.length != 0) {
                ActualResultArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ActualResultArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }

                for (var i = 0; i < ActualResultArray.length; i++)
                    teststepfortester.ActualResultArray.push(ActualResultArray[i]['Data']);
            }
            if (ChildIDArray.length != 0) {
                ChildIDArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ChildIDArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });

                }
                for (var i = 0; i < ChildIDArray.length; i++)
                    teststepfortester.ChildIDArray.push(ChildIDArray[i]['Data']);
            }
        }
        else {
            //teststepfortester.alertBox2("You do not have any Test Step(s) from the current Test Pass and Role! Visit Dashboard to see your assigned Test Passe(s) and Role(s)!");
            teststepfortester.alertBox2("You do not have any " + teststepfortester.gConfigTestStep + "(s) from the current " + teststepfortester.gConfigTestPass + " and " + teststepfortester.gCongfigRole + "! Visit Dashboard to see your assigned " + teststepfortester.gConfigTestPass + "(s) and " + teststepfortester.gCongfigRole + "(s)!");//:SD
            return -1;
        }

        teststepfortester.total = teststepfortester.failCount + teststepfortester.passCount + teststepfortester.notCompletedCount + teststepfortester.pendingCount;
        $('.statisticsData').empty();
        if (teststepfortester.passCount == 0)
            $('.statisticsData').append('<a>Passed<span class="txtgreen" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillPassedGrid()\',200);">Passed<span class="txtgreen" style="font-weight:bold;">' + teststepfortester.passCount + '</span></a>');
        if (teststepfortester.failCount == 0)
            $('.statisticsData').append('<a>Failed<span class="txtred" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillFailedGrid()\',200);">Failed<span class="txtred" style="font-weight:bold;">' + teststepfortester.failCount + '</span></a>');
        if (teststepfortester.notCompletedCount == 0)
            $('.statisticsData').append('<a>Not Completed<span class="txtgold" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillNotCompletedGrid()\',200);">Not Completed<span class="txtgold" style="font-weight:bold;">' + teststepfortester.notCompletedCount + '</span></a>');
        if (teststepfortester.pendingCount == 0)
            $('.statisticsData').append('<a>Pending<span class="txtgoldenbrown" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillPendingGrid()\',200);">Pending<span class="txtgoldenbrown" style="font-weight:bold;">' + teststepfortester.pendingCount + '</span></a>');
        $('.statisticsData').append('<a  style="cursor:pointer" class="last" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.startIndexA=0;teststepfortester.fillGrid()\',200);">Total<span style="font-weight:bold;">' + teststepfortester.total + '</span></a>');

        //var temp = '<div id="lblSaveInfo" style="float:left" ></div><label id="testStepCount">Showing #' + ((teststepfortester.startIndexA) + 1) + ' of total ' + teststepfortester.total + ' Test Step(s) only</label>';
        var temp = '<div id="lblSaveInfo" style="float:left" ></div><label id="testStepCount">Showing #' + ((teststepfortester.startIndexA) + 1) + ' of total ' + teststepfortester.total + ' ' + teststepfortester.gConfigTestStep + '(s) only</label>';//:SD
        $('#divActionCount').empty();
        // $('#divActionCount').append(temp);
        $('#divActionCount').append('div class="testPassNavigation"><a class="showPrev" id="previous" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexADecrement();teststepfortester.fillNotCompletedGrid()">Previous Test Script<br /</a><a href="#" class="showNext" id="next" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexAIncrement();teststepfortester.fillNotCompletedGrid()">Next Test Script<br /></a></div>');


        teststepfortester.passedStartIndexA = 0;
        teststepfortester.failedStartIndexA = 0;
        teststepfortester.notCompletedStartIndexA = 0;
        teststepfortester.searchResultStartIndexA = 0;
        teststepfortester.pendingStartIndexA = 0;

        document.getElementById('totalTestCase').innerHTML = totalTestCasesCount;
        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        /* if($("#rte2").contents().find("a").length != 0)
        $("#rte2").contents().find("a").attr("target","_blank");*/
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
    },
    fillTestPassStatus2: function () {
        teststepfortester.forTCIDGetStatus.length = 0;
        teststepfortester.StatusArray.length = 0;
        teststepfortester.ActualResultArray.length = 0;
        teststepfortester.allTestSteps.length = 0;
        teststepfortester.TCIDArray.length = 0;

        teststepfortester.passCount = 0;
        teststepfortester.failCount = 0;
        teststepfortester.notCompletedCount = 0;
        teststepfortester.total = 0;
        teststepfortester.pendingCount = 0;
        teststepfortester.objValidate.length = 0;

        var arr = [];
        var TestCaseToTestStepMappingList = new Array();
        var result = ServiceLayer.GetData("GetTestCasesTestSteps", teststepfortester.searchTestPassKey + "&" + teststepfortester.searchRoleKey, "TestingPg");
        var getTCIDForTestplanID = new Array();
        if (result != undefined && result != '') {
            var tcSeq = '';
            for (var i = 0; i < result.length; i++) {
                arr = result[i].listTestStep;
                for (var ii = 0; ii < arr.length; ii++) {
                    arr[ii]['ID'] = arr[ii].testStepPlanId;
                    arr[ii]['TCID'] = result[i].testCaseId;
                    arr[ii]['TCSeq'] = tcSeq;
                    TestCaseToTestStepMappingList.push(arr[ii]);
                    getTCIDForTestplanID[arr[ii].testStepPlanId] = result[i].testCaseId;
                }
            }
            teststepfortester.childListResult = TestCaseToTestStepMappingList;
            var TCIDArray = new Array();
            var StatusArray = new Array();
            var ActualResultArray = new Array();
            /////Logic for retrieving TestCaseToTestStepMapping(For checking the staus of action)/////
            for (var x = 0; x < TestCaseToTestStepMappingList.length; x++) {
                if (teststepfortester.forTCIDGetStatus[TestCaseToTestStepMappingList[x]['TCID']] == undefined)
                    teststepfortester.forTCIDGetStatus[TestCaseToTestStepMappingList[x]['TCID']] = TestCaseToTestStepMappingList[x]['status'];
                else
                    teststepfortester.forTCIDGetStatus[TestCaseToTestStepMappingList[x]['TCID']] += "," + TestCaseToTestStepMappingList[x]['status'];

                if (TestCaseToTestStepMappingList[x]['actResult'] == null || TestCaseToTestStepMappingList[x]['actResult'] == undefined)
                    TestCaseToTestStepMappingList[x]['actResult'] = '';

                teststepfortester.objValidate.push({
                    'TestStepIDAndTestCaseID': TestCaseToTestStepMappingList[x].testStepPlanId + "," + TestCaseToTestStepMappingList[x].TCID,
                    'Sequence': parseInt(TestCaseToTestStepMappingList[x].testStepSeq.toString()) + 1,
                    'status': TestCaseToTestStepMappingList[x].status,
                    'TCID': TestCaseToTestStepMappingList[x].TCID,
                    'TCPosition': TestCaseToTestStepMappingList[x].TCSeq
                });

                switch (TestCaseToTestStepMappingList[x]['status']) {
                    case "2":
                        teststepfortester.passCount++;
                        break;
                    case "3":
                        teststepfortester.failCount++;
                        break;
                    case "1":
                        teststepfortester.notCompletedCount++;
                        break;
                    case "4":
                        teststepfortester.pendingCount++;
                        break;
                    case undefined:
                        teststepfortester.notCompletedCount++;
                        break;
                }
                for (var l = 0; l < teststepfortester.failedTestSteps.length; l++) {
                    if (teststepfortester.failedTestSteps[l]['ID'] == TestCaseToTestStepMappingList[x]['testStepPlanId'] && teststepfortester.TCIDArrayForFail[l] == TestCaseToTestStepMappingList[x].TCID) {
                        teststepfortester.TCIDArrayForFail[l] = TestCaseToTestStepMappingList[x].TCID;
                        teststepfortester.StatusArrayForFail[l] = TestCaseToTestStepMappingList[x]['status'] != undefined ? TestCaseToTestStepMappingList[x]['status'] : TestCaseToTestStepMappingList[x]['status'];
                        teststepfortester.ActualResultArrayForFail[l] = TestCaseToTestStepMappingList[x]['actResult'];
                    }
                }

                for (var l = 0; l < teststepfortester.passedTestSteps.length; l++) {
                    if (teststepfortester.passedTestSteps[l]['ID'] == TestCaseToTestStepMappingList[x]['testStepPlanId'] && teststepfortester.TCIDArrayForPass[l] == TestCaseToTestStepMappingList[x].TCID) {
                        teststepfortester.TCIDArrayForPass[l] = TestCaseToTestStepMappingList[x].TCID;
                        teststepfortester.StatusArrayForPass[l] = TestCaseToTestStepMappingList[x]['status'] != undefined ? TestCaseToTestStepMappingList[x]['status'] : TestCaseToTestStepMappingList[x]['status'];
                        teststepfortester.ActualResultArrayForPass[l] = TestCaseToTestStepMappingList[x]['actResult'];
                    }
                }

                for (var l = 0; l < teststepfortester.notCompletedTestSteps.length; l++) {
                    if (teststepfortester.notCompletedTestSteps[l]['ID'] == TestCaseToTestStepMappingList[x]['testStepPlanId'] && teststepfortester.TCIDArrayForNotCompleted[l] == TestCaseToTestStepMappingList[x].TCID) {
                        teststepfortester.TCIDArrayForNotCompleted[l] = TestCaseToTestStepMappingList[x].TCID;
                        teststepfortester.StatusArrayForNotCompleted[l] = TestCaseToTestStepMappingList[x]['status'] != undefined ? TestCaseToTestStepMappingList[x]['status'] : TestCaseToTestStepMappingList[x]['status'];
                        teststepfortester.ActualResultArrayForNotCompleted[l] = TestCaseToTestStepMappingList[x]['actResult'];
                    }
                }

                for (var l = 0; l < teststepfortester.pendingTestSteps.length; l++) {
                    if (teststepfortester.pendingTestSteps[l]['ID'] == TestCaseToTestStepMappingList[x]['testStepPlanId'] && teststepfortester.TCIDArrayForPending[l] == TestCaseToTestStepMappingList[x].TCID) {
                        teststepfortester.TCIDArrayForPending[l] = TestCaseToTestStepMappingList[x].TCID;
                        teststepfortester.StatusArrayForPending[l] = TestCaseToTestStepMappingList[x]['status'];
                        teststepfortester.ActualResultArrayForPending[l] = TestCaseToTestStepMappingList[x]['actResult'];
                    }
                }
                teststepfortester.allTestSteps.push(TestCaseToTestStepMappingList[x]);

                TCIDArray.push({ 'Data': TestCaseToTestStepMappingList[x].TCID, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                StatusArray.push({ 'Data': TestCaseToTestStepMappingList[x].status, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });

                ActualResultArray.push({ 'Data': TestCaseToTestStepMappingList[x].actResult, 'testStepSeq': TestCaseToTestStepMappingList[x].testStepSeq, 'TCID': TestCaseToTestStepMappingList[x].TCID, 'TCPosition': TestCaseToTestStepMappingList[x].TCSeq });
            }

            teststepfortester.objValidate.sort(function (a, b) {
                return a.Sequence - b.Sequence
            });


            teststepfortester.failedTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });


            teststepfortester.passedTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });



            teststepfortester.notCompletedTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });


            teststepfortester.pendingTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });


            teststepfortester.allTestSteps.sort(function (a, b) {
                return a.testStepSeq - b.testStepSeq
            });

            if (teststepfortester.testingType != "1") {
                teststepfortester.objValidate.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.allTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.pendingTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.notCompletedTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.passedTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
                teststepfortester.failedTestSteps.sort(function (a, b) {
                    return a.TCPosition - b.TCPosition
                });
            }
            if (TCIDArray.length != 0) {
                TCIDArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    TCIDArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });
                }
                for (var i = 0; i < TCIDArray.length; i++)
                    teststepfortester.TCIDArray.push(TCIDArray[i]['Data']);

            }
            if (ActualResultArray.length != 0) {
                ActualResultArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    ActualResultArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });
                }
                for (var i = 0; i < ActualResultArray.length; i++)
                    teststepfortester.ActualResultArray.push(ActualResultArray[i]['Data']);

            }
            if (StatusArray.length != 0) {
                StatusArray.sort(function (a, b) {
                    return a.testStepSeq - b.testStepSeq
                });
                if (teststepfortester.testingType != "1") {
                    StatusArray.sort(function (a, b) {
                        return a.TCPosition - b.TCPosition
                    });
                }
                for (var i = 0; i < StatusArray.length; i++)
                    teststepfortester.StatusArray.push(StatusArray[i]['Data']);
            }
        }
        else {
            teststepfortester.alertBox2("You do not have any " + teststepfortester.gConfigTestStep + "(s) from the current " + teststepfortester.gConfigTestPass + " and " + teststepfortester.gCongfigRole + "! Visit Dashboard to see your assigned " + teststepfortester.gConfigTestPass + "e(s) and " + teststepfortester.gCongfigRole + "(s)!");//:SD
            return -1;
        }
        teststepfortester.total = teststepfortester.failCount + teststepfortester.passCount + teststepfortester.notCompletedCount + teststepfortester.pendingCount;

        $('.statisticsData').empty();
        if (teststepfortester.passCount == 0)
            $('.statisticsData').append('<a>Passed<span class="txtgreen" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillPassedGrid()\',200);">Passed<span class="txtgreen" style="font-weight:bold;">' + teststepfortester.passCount + '</span></a>');
        if (teststepfortester.failCount == 0)
            $('.statisticsData').append('<a>Failed<span class="txtred" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillFailedGrid()\',200);">Failed<span class="txtred" style="font-weight:bold;">' + teststepfortester.failCount + '</span></a>');
        if (teststepfortester.notCompletedCount == 0)
            $('.statisticsData').append('<a>Not Completed<span class="txtgold" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillNotCompletedGrid()\',200);">Not Completed<span class="txtgold" style="font-weight:bold;">' + teststepfortester.notCompletedCount + '</span></a>');

        if (teststepfortester.pendingCount == 0)
            $('.statisticsData').append('<a>Pending<span class="txtgoldenbrown" style="font-weight:bold;">0</span></a>');
        else
            $('.statisticsData').append('<a  style="cursor:pointer" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.fillPendingGrid()\',200);">Pending<span class="txtgoldenbrown" style="font-weight:bold;">' + teststepfortester.pendingCount + '</span></a>');
        $('.statisticsData').append('<a  style="cursor:pointer" class="last" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPreviousFlag=0;teststepfortester.modifySearchResultString(); teststepfortester.fillTestPassStatus();teststepfortester.startIndexA=0;teststepfortester.fillGrid()\',200);">Total<span style="font-weight:bold;">' + teststepfortester.total + '</span></a>');

        if (teststepfortester.startIndexA <= 0) {
            document.getElementById('previous').disabled = "disabled";
            document.getElementById('previous').style.color = "#989898";
        }
        else
            document.getElementById('previous').disabled = false;
        if ((teststepfortester.startIndexA + 1) >= (teststepfortester.allTestSteps).length) {
            document.getElementById('next').disabled = "disabled";
            document.getElementById('next').style.color = "#989898";
            document.getElementById('previous').disabled = "disabled";
            document.getElementById('previous').style.color = "#989898";
        }
        else
            document.getElementById('next').disabled = false;
        var temp = '<div id="lblSaveInfo" style="float:left" ></div><label id="testStepCount">Showing #' + ((teststepfortester.startIndexA) + 1) + ' of total ' + teststepfortester.total + ' ' + teststepfortester.gConfigTestStep + '(s) only</label>';//:SD

        $('#divActionCount').empty();
        $('#divActionCount').append(temp);
        $('#divActionCount').append('<a id="previous" style="cursor:pointer" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()">' +
		 			'Previous</a> | <a id="next" style="cursor:pointer" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid()">Next</a>');

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');

    },

    lastTestingTestStep: function ()//Added for rating feature 
    {
        teststepfortester.searchProjectKey = teststepfortester.searchProjectKey + ",";
        teststepfortester.searchTestPassKey = teststepfortester.searchTestPassKey;

        //Code added by deepak for bugid 3960
        $('.txtgold').html(0);
        if (teststepfortester.Selected_radStatus == '2') {
            $('#radPass').attr('checked', 'checked');
            var passCnt = 0;
            passCnt = parseInt($('.txtgreen').html());
            passCnt = passCnt + 1;
            $('.txtgreen').html(passCnt);
        }
        else {
            $('#radFail').attr('checked', 'checked');
            var failCnt = 0;
            failCnt = parseInt($('.txtred').html());
            failCnt = failCnt + 1;
            $('.txtred').html(failCnt);
        }
        //Code added by deepak for bugid 3960

        var htmlAlert = "";
        htmlAlert = "You have completed the [<b>" + teststepfortester.testPasNm + "</b>] test pass for the [<b>" + teststepfortester.PrjName + "</b>] project.You can choose to do one of the following:" +
		"<br/><div class='center' style='padding-top:7px'><a style='color:#0000FF;text-decoration:underline;cursor:pointer;' href='feedback?keys=" + teststepfortester.searchProjectKey + "" + teststepfortester.searchTestPassKey + "," + teststepfortester.searchRoleKey + "'>Review my Results and Provide Feedback</a>" +
		"</div><div class='center' style='padding-top:7px'><a href='dashboard.aspx' style='color:#0000FF;text-decoration:underline;cursor:pointer;'>Return to the Home Page</a></div>" +
		"<div style='padding-top:7px'>You will be able to review your results at any time from the Testing Status section of the home page.</div>";
        $("#divCompTesting").html(htmlAlert);
        $('#divCompTesting').dialog({ width: 350, height: 200, resizable: false, title: "Testing", modal: true, closeOnEscape: false });
        $("#divCompTesting").parent().children(0).children('a').remove(); //code added by rajiv on 9 feb 2012 to resolve bug 640 
        return;
        Main.hideLoading();
    },

    fsearch: function () {
        teststepfortester.searchResultTestSteps.length = 0;
        teststepfortester.TCIDArrayForSearchResult.length = 0;
        teststepfortester.StatusArrayForSearchResult.length = 0;

        teststepfortester.ActualResultArrayForSearchResult.length = 0;

        if (teststepfortester.saveOnNextPreviousFlag == 0) {
            teststepfortester.searchResultStartIndexA = 0;

        }
        //teststepfortester.searchResultTestSteps.length=0;
        //ankita 18/7/2012: to show proper alert message for empty text search
        if (document.getElementById('txtSearch').value == '') {
            teststepfortester.alertBox('Please enter Key/Text to Search!');
        }
        else {
            var flag = 0;
            var x = 0;

            if (teststepfortester.gLastSearchString == '' || teststepfortester.gLastSearchString == null || teststepfortester.gLastSearchString == undefined)
                var key = jQuery.trim((document.getElementById('txtSearch').value));

            else
                var key = teststepfortester.gLastSearchString;
            teststepfortester.gLastSearchString = key;
            var keyAscii = key.charCodeAt(0);
            if (key == '') {
                teststepfortester.preview('');
                document.getElementById('lblSearchResult').innerHTML = '<font italic="true" color="red"><i>No match result found</i></font>';
                teststepfortester.alertBox('No match found!Try another string!');
                Main.hideLoading();
                teststepfortester.fillGrid();

            }
            else {
                flag = 0;
                x = 0;
                key = key.toLowerCase();

                for (var i = 0; i < teststepfortester.allTestSteps.length; i++) {
                    var actionName = teststepfortester.filterData(teststepfortester.allTestSteps[i].testStepName).toLowerCase();
                    var expResult = teststepfortester.filterData(teststepfortester.allTestSteps[i]['expResult']).toLowerCase();
                    var actResult = teststepfortester.ActualResultArray[i].toLowerCase();
                    if (actionName.indexOf(key) != -1 || expResult.indexOf(key) != -1 || actResult.indexOf(key) != -1) {
                        flag = 1;
                        teststepfortester.searchResultTestSteps[x] = teststepfortester.allTestSteps[i];
                        teststepfortester.TCIDArrayForSearchResult[x] = teststepfortester.TCIDArray[i];
                        teststepfortester.StatusArrayForSearchResult[x] = teststepfortester.StatusArray[i];

                        teststepfortester.ActualResultArrayForSearchResult[x] = teststepfortester.ActualResultArray[i];

                        teststepfortester.ChildIDArrayForSearchResult[x] = teststepfortester.ChildIDArray[i];
                        x++;

                    }
                }
                if (flag == 0) {
                    document.getElementById('lblSearchResult').innerHTML = '<font italic="true" color="red"><i>No match result found</i></font>';
                    teststepfortester.alertBox('No match found!Try another string!');
                    Main.hideLoading();
                    teststepfortester.fillGrid();

                }
                else {
                    document.getElementById('lblSearchResult').innerHTML = '<span class="selHeading"><b>' + x + ' match result(s) found</b></span>';
                    teststepfortester.searchResultGrid_onHide = true;
                    teststepfortester.fillSearchResultGrid(x);
                    teststepfortester.searchLength = x;
                }

            }
        }
        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
    },

    fillSearchResultGrid: function (x) {
        Main.showLoading();
        x = teststepfortester.searchResultTestSteps.length;
        teststepfortester.startIndexSearch = teststepfortester.searchResultStartIndexA;
        teststepfortester.gridFlag = "searchResult";
        var TCId;
        //var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.searchResultStartIndexA) + 1) + ' of total ' + x + ' found Test Step(s) only</label>';
        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.searchResultStartIndexA) + 1) + ' of total ' + x + ' found ' + teststepfortester.gConfigTestStep + '(s) only</label>';//:SD
        //==============Harshal Code Start For Next & Previous Click==========  
        //******code added by sheetal on 2 April for adding next functionality to save button ******/
        $("#btnSave").attr('onClick', '');
        //******************************************************************/
        $('.testPassNavigation').empty();
        var indexCount = (teststepfortester.notCompletedStartIndexA) + 1;
        if (indexCount != teststepfortester.notCompletedTestSteps.length) {

            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.searchResultStartIndexADecrement();teststepfortester.fillSearchResultGrid(' + x + ')\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.searchResultStartIndexAIncrement();teststepfortester.fillSearchResultGrid(' + x + ')\',100);"><br /></a></div><div class="clear"></div>');

            /****code added by sheetal on 2 April for adding next functionality to save button **********/
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.searchResultStartIndexAIncrement();teststepfortester.fillSearchResultGrid(" + x + ");',100);");
            /**************************************************************************/
        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.searchResultStartIndexADecrement();teststepfortester.fillSearchResultGrid(' + x + ')\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.searchResultStartIndexAIncrement();teststepfortester.fillSearchResultGrid(' + x + ')\',100);"><br /></a></div><div class="clear"></div>');

            /****code added by sheetal on 2 April for adding next functionality to save button **********/
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.searchResultStartIndexAIncrement();teststepfortester.fillSearchResultGrid(" + x + ");',100);");
            /**************************************************************************/
        }

        //=============Harshal Code End============

        if (teststepfortester.TCIDArrayForSearchResult[teststepfortester.searchResultStartIndexA] != null && teststepfortester.TCIDArrayForSearchResult[teststepfortester.searchResultStartIndexA] != undefined) {
            TCId = teststepfortester.TCIDArrayForSearchResult[teststepfortester.searchResultStartIndexA];

        }
        else {
            TCId = teststepfortester.TCIDArrayForSearchResult2[teststepfortester.searchResultStartIndexA];

        }

        teststepfortester.hidTestCaseID = TCId;
        var TestCaseName = teststepfortester.TCNameArray[TCId];
        if (TestCaseName != null || TestCaseName != undefined) {
            document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
            document.getElementById('tdTestCase').title = TestCaseName;

            document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
            document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

            if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                var estTime = teststepfortester.EstimatedTime[TCId];
            else
                var estTime = ' N/A';
            document.getElementById('estTime').innerHTML = estTime;

            //Nikhil - 03/04/2012 - Handle Bulleted Text.
            var vAction = teststepfortester.GetFormatedText(teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA].testStepName, 'false');

            /** Added by shilpa on 3 Dec **/
            var completeActionName = vAction.replace(/(\r\n)+/g, '');
            if (vAction.indexOf("<") != -1 && vAction.indexOf(">") != -1)
                vAction = completeActionName;
            /******/

            var childID = teststepfortester.ChildIDArrayForSearchResult[teststepfortester.searchResultStartIndexA];
            /////////////////////////////////
            document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['ID']);
            if (teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['expResult'] != null && teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['expResult'] != undefined)
                $('#expectedResultWithImage').html(teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['expResult']);
            else
                $('#expectedResultWithImage').html('-');
            if (teststepfortester.ActualResultArrayForSearchResult != null && teststepfortester.ActualResultArrayForSearchResult != undefined) {

                if (teststepfortester.ActualResultArrayForSearchResult[teststepfortester.searchResultStartIndexA] != null && teststepfortester.ActualResultArrayForSearchResult[teststepfortester.searchResultStartIndexA] != undefined) {
                    $('#actualResultWithImage').html(teststepfortester.ActualResultArrayForSearchResult[teststepfortester.searchResultStartIndexA]);
                    teststepfortester.landedActualResult = $('#actualResultWithImage').html();
                }
                else {
                    $('#actualResultWithImage').html("");
                    teststepfortester.landedActualResult = '';
                }

            }
            else {
                if (teststepfortester.ActualResultArrayForSearchResult2[teststepfortester.searchResultStartIndexA] != null && teststepfortester.ActualResultArrayForSearchResult2[teststepfortester.searchResultStartIndexA] != undefined) {
                    $('#actualResultWithImage').html(teststepfortester.ActualResultArrayForSearchResult2[teststepfortester.searchResultStartIndexA]);
                    teststepfortester.landedActualResult = $('#actualResultWithImage').html();
                }
                else {
                    $('#actualResultWithImage').html("");
                    teststepfortester.landedActualResult = '';
                }
            }

            if (teststepfortester.StatusArrayForSearchResult != null && teststepfortester.StatusArrayForSearchResult != undefined
	        && teststepfortester.StatusArrayForSearchResult != '')//if StatusArrayForSearchResult array is not damaged 
            {

                if (teststepfortester.StatusArrayForSearchResult[teststepfortester.searchResultStartIndexA] == '2') {
                    $('#radPass').attr("checked", "checked");
                }
                else if (teststepfortester.StatusArrayForSearchResult[teststepfortester.searchResultStartIndexA] == '3') {
                    $('#radFail').attr("checked", "checked");

                }
                else if (teststepfortester.StatusArrayForSearchResult[teststepfortester.searchResultStartIndexA] == '4') {
                    $('#radPending').attr("checked", "checked");
                }

                else {
                    $('#radNotCompleted').attr("checked", "checked");
                }
            }
            else {

                if (teststepfortester.StatusArrayForSearchResult2[teststepfortester.searchResultStartIndexA] == '2') {
                    $('#radPass').attr("checked", "checked");
                }
                else if (teststepfortester.StatusArrayForSearchResult2[teststepfortester.searchResultStartIndexA] == '3') {
                    $('#radFail').attr("checked", "checked");

                }
                else if (teststepfortester.StatusArrayForSearchResult2[teststepfortester.searchResultStartIndexA] == '4') {
                    $('#radPending').attr("checked", "checked");
                }
                else {
                    $('#radNotCompleted').attr("checked", "checked");
                }

            }
            teststepfortester.landedStatus = $('input:radio[name=radStatus]:checked').val();

            teststepfortester.viewAttachments(childID);
        }

        Main.hideLoading();
        //Code added by Rajiv
        // below code commented by shilpa on 15 may
        $("#ddTestCases > option").each(function () {
            if (this.value == TCId) {
                this.selected = true;
                teststepfortester.fetchTestSteps();
                // teststepfortester.membersForinitPagination = teststepfortester.fetchTestSteps();
                var ID = teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['ID'];
                var index = $.inArray(ID, teststepfortester.TsIds);
                if (index != 0) {
                    if ((index / 10).toString().indexOf(".") != -1) {
                        if ((index / 10).toString().indexOf(".") != -1)
                            teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
                        else
                            teststepfortester.gPageIndex = Math.ceil(index / 10);
                    }
                    else
                        teststepfortester.gPageIndex = Math.ceil(index / 10);

                }
                else
                    teststepfortester.gPageIndex = 0;

                teststepfortester.indexStart = teststepfortester.gPageIndex * 10;
                teststepfortester.displayPaging();

            }
        });


        if (teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['ID'] != null
       && teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['ID'] != undefined) {
            var ID = teststepfortester.searchResultTestSteps[teststepfortester.searchResultStartIndexA]['ID'];
            if (isRootWeb)
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            else
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            $('#id' + ID + '').css("background-position", "0px 0px");
            $('#id' + ID + '').css("background-repeat", "no-repeat");

            if (ID != teststepfortester.latestSelectedTestStep)
                $('#id' + teststepfortester.latestSelectedTestStep + '').css("background-image", "");

            teststepfortester.latestSelectedTestStep = ID;
        }
        if (teststepfortester.IDForShowTestStep != '' && ID != teststepfortester.IDForShowTestStep) {
            // var ID=teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['ID'];
            $('#id' + teststepfortester.IDForShowTestStep + '').css("background-image", "");
            teststepfortester.IDForShowTestStep = '';
        }
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];
        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vAction + '</td></tr></tbody></table>';
        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");

        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TCId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.ChildIDArrayForSearchResult[teststepfortester.searchResultStartIndexA] == teststepfortester.forTCIDGetLastTestStep[TCId] && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));
    },

    fillGrid: function () {
        teststepfortester.gridFlag = "all";
        $("[name$='HiddenField_URL']").val(teststepfortester.startIndexA + ";" + teststepfortester.passedStartIndexA + ";" + teststepfortester.failedStartIndexA + ";" + teststepfortester.notCompletedStartIndexA + ";" + teststepfortester.pendingStartIndexA + ";" + teststepfortester.searchResultStartIndexA + ";" + teststepfortester.gridFlag);
        //var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.startIndexA) + 1) + ' of total ' + teststepfortester.total + ' Test Step(s) only</label>';
        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.startIndexA) + 1) + ' of total ' + teststepfortester.total + ' ' + teststepfortester.gConfigTestStep + '(s) only</label>';//:SD
        //===========Harshal Code Start for Next & Previous click========
        /****code added by sheetal on 2 April for adding next functionality to save button **********/
        $("#btnSave").attr('onClick', '');
        /***************************************/
        $('.testPassNavigation').empty();
        var indexCount = (teststepfortester.failedStartIndexA) + 1;
        if (indexCount != teststepfortester.notCompletedTestSteps.length) {
            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid()\',100);"><br /></a></div><div class="clear"></div>');
            /****code added by sheetal on 2 April for adding next functionality to save button **********/
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid();',100);");
            /**************************************************************************/
        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid()\',100);"><br /></a></div><div class="clear"></div>');
            /****code added by sheetal on 2 April for adding next functionality to save button **********/
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid();',100);");
            /**************************************************************************/
        }
        //=========Harshal Code End===========

        $('#divActionCount').append('<a id="previous" style="cursor:pointer" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.startIndexADecrement();teststepfortester.fillGrid()">' +
				'Previous</a> | <a id="next" style="cursor:pointer" onclick="teststepfortester.saveOnNextPrevious();teststepfortester.startIndexAIncrement();teststepfortester.fillGrid()">Next</a>');
        if (teststepfortester.startIndexA <= 0) {
            document.getElementById('previous').style.color = "#989898";
            document.getElementById('previous').disabled = "disabled";
        }
        else
            document.getElementById('previous').disabled = false;
        if ((teststepfortester.startIndexA + 1) >= (teststepfortester.allTestSteps).length) {
            document.getElementById('next').disabled = "disabled";
            document.getElementById('next').style.color = "#989898";
        }
        else
            document.getElementById('next').disabled = false;

        if (teststepfortester.allTestSteps != null && teststepfortester.allTestSteps != undefined && teststepfortester.allTestSteps != '') {
            var TCId = teststepfortester.TCIDArray[teststepfortester.startIndexA];
            teststepfortester.hidTestCaseID = TCId;

            var TestCaseName = teststepfortester.TCNameArray[TCId];
            var actionNumber = parseInt(teststepfortester.allTestSteps[teststepfortester.startIndexA]["testStepSeq"].toString()) + 1; //code added by rajiv for sequencing

            if (TestCaseName != null || TestCaseName != undefined) {
                document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
                document.getElementById('tdTestCase').title = TestCaseName;

                document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
                document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

                if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                    var estTime = teststepfortester.EstimatedTime[TCId];
                else
                    var estTime = ' N/A';
                document.getElementById('estTime').innerHTML = estTime;

                document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.allTestSteps[teststepfortester.startIndexA]['ID']);
                if (teststepfortester.allTestSteps[teststepfortester.startIndexA]['expResult'] != null && teststepfortester.allTestSteps[teststepfortester.startIndexA]['expResult'] != undefined)
                    $('#expectedResultWithImage').html(teststepfortester.allTestSteps[teststepfortester.startIndexA]['expResult']);
                else
                    $('#expectedResultWithImage').html('-');
                if (teststepfortester.ActualResultArray[teststepfortester.startIndexA] != null
			        && teststepfortester.ActualResultArray[teststepfortester.startIndexA] != undefined
			        && teststepfortester.ActualResultArray[teststepfortester.startIndexA] != '') {
                    $('#actualResultWithImage').html(teststepfortester.ActualResultArray[teststepfortester.startIndexA]);
                    teststepfortester.landedActualResult = $('#actualResultWithImage').html();
                }
                else {
                    $('#actualResultWithImage').html("");
                    teststepfortester.landedActualResult = '';
                }

                for (var m = 0; m < teststepfortester.StatusArray.length; m++) {
                    if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "1") {
                        var ncstatus = '1';
                        $('#radNotCompleted').attr("checked", "checked");
                        teststepfortester.landedStatus = ncstatus;
                    }
                    else if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "4") {
                        var ncstatus = '4';
                        $('#radPending').attr("checked", "checked");
                        teststepfortester.landedStatus = ncstatus;
                    }

                    else if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "2") {
                        var pstatus = '2';
                        $('#radPass').attr("checked", "checked");
                        teststepfortester.landedStatus = pstatus;
                    }
                    else if (teststepfortester.StatusArray[teststepfortester.startIndexA] == "3") {
                        var fstatus = '3'
                        $('#radFail').attr("checked", "checked");
                        teststepfortester.landedStatus = fstatus;
                    }
                }
                var childID = teststepfortester.ChildIDArray[teststepfortester.startIndexA];
                teststepfortester.viewAttachments(childID);
            }
        } //if alltesstepList is empty 

        $("#ddTestCases > option").each(function () {
            if (this.value == teststepfortester.TCIDArray[teststepfortester.startIndexA]) {
                this.selected = true;
                teststepfortester.fetchTestSteps();
                var ID = teststepfortester.allTestSteps[teststepfortester.startIndexA]['ID'];
                var index = $.inArray(ID, teststepfortester.TsIds);
                if (index != 0) {
                    if ((index / 10).toString().indexOf(".") != -1)
                        teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
                    else
                        teststepfortester.gPageIndex = Math.ceil(index / 10);

                }
                else
                    teststepfortester.gPageIndex = 0;

                //Added by HRW
                teststepfortester.indexStart = (teststepfortester.gPageIndex) * 10;
                teststepfortester.displayPaging();
            }
        });
        var ID = teststepfortester.allTestSteps[teststepfortester.startIndexA]['ID'];
        if (isRootWeb)
            $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        else
            $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
        $('#id' + ID + '').css("background-position", "0px 0px");
        $('#id' + ID + '').css("background-repeat", "no-repeat");

        if (ID != teststepfortester.latestSelectedTestStep)
            $('#id' + teststepfortester.latestSelectedTestStep + '').css("background-image", "");

        teststepfortester.latestSelectedTestStep = ID;

        if (teststepfortester.IDForShowTestStep != '' && ID != teststepfortester.IDForShowTestStep) {
            // var ID=teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['ID'];
            $('#id' + teststepfortester.IDForShowTestStep + '').css("background-image", "");
            teststepfortester.IDForShowTestStep = '';
        }

        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TCId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.ChildIDArray[teststepfortester.startIndexA] == teststepfortester.forTCIDGetLastTestStep[TCId] && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();
        //Code added by deepak for sequencing
        var childID = teststepfortester.ChildIDArray[teststepfortester.startIndexA];
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];
        var vActionName = teststepfortester.GetFormatedText(teststepfortester.allTestSteps[teststepfortester.startIndexA].testStepName, 'false');
        var completeActionName = vActionName.replace(/(\r\n)+/g, '');
        if (vActionName.indexOf("<") != -1 && vActionName.indexOf(">") != -1)
            vActionName = completeActionName;
        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vActionName + '</td></tr></tbody></table>';
        //Code added by deepak for sequencing

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");

        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));

    },
    fillPassedGrid: function () {
        teststepfortester.gridFlag = "passed";
        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.passedStartIndexA) + 1) + ' of ' + teststepfortester.passedTestSteps.length + ' total ' + teststepfortester.gConfigTestStep + '(s) passed only</label>';//:SD
        $("#btnSave").attr('onClick', '');
        $('.testPassNavigation').empty();
        var indexCount = (teststepfortester.failedStartIndexA) + 1;
        if (indexCount != teststepfortester.notCompletedTestSteps.length) {
            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.passedStartIndexADecrement();teststepfortester.fillPassedGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.passedStartIndexAIncrement();teststepfortester.fillPassedGrid()\',100);"><br /></a></div><div class="clear"></div>');

            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.passedStartIndexAIncrement();teststepfortester.fillPassedGrid();',100);");
        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.passedStartIndexADecrement();teststepfortester.fillPassedGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.passedStartIndexAIncrement();teststepfortester.fillPassedGrid()\',100);"><br /></a></div><div class="clear"></div>');

            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.passedStartIndexAIncrement();teststepfortester.fillPassedGrid();',100);");
        }

        $("[name$='HiddenField_URL']").val(teststepfortester.startIndexA + ";" + teststepfortester.passedStartIndexA + ";" + teststepfortester.failedStartIndexA + ";" + teststepfortester.notCompletedStartIndexA + ";" + teststepfortester.pendingStartIndexA + ";" + teststepfortester.searchResultStartIndexA + ";" + teststepfortester.gridFlag);

        var TCId = teststepfortester.TCIDArrayForPass[teststepfortester.passedStartIndexA];
        teststepfortester.hidTestCaseID = TCId;


        var TestCaseName = teststepfortester.TCNameArray[TCId];
        if (TestCaseName != null || TestCaseName != undefined) {
            document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
            document.getElementById('tdTestCase').title = TestCaseName;

            document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
            document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

            if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                var estTime = teststepfortester.EstimatedTime[TCId];
            else
                var estTime = ' N/A';
            document.getElementById('estTime').innerHTML = estTime;

            ////////////////////////////////

            document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['ID']);
            if (teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['expResult'] != null && teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['expResult'] != undefined)
                $('#expectedResultWithImage').html(teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['expResult']);
            else
                $('#expectedResultWithImage').html('-');
            if (teststepfortester.ActualResultArrayForPass[teststepfortester.passedStartIndexA] != null
	        && teststepfortester.ActualResultArrayForPass[teststepfortester.passedStartIndexA] != undefined
	        && teststepfortester.ActualResultArrayForPass[teststepfortester.passedStartIndexA] != '') {

                $('#actualResultWithImage').html(teststepfortester.ActualResultArrayForPass[teststepfortester.passedStartIndexA]);
                teststepfortester.landedActualResult = $('#actualResultWithImage').html();

            }
            else {

                $('#actualResultWithImage').html("");
                teststepfortester.landedActualResult = '';
            }

            for (var m = 0; m < teststepfortester.StatusArrayForPass.length; m++) {

                if (teststepfortester.StatusArrayForPass[teststepfortester.passedStartIndexA] == "1") {
                    var ncstatus = '1';
                    $('#radNotCompleted').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }
                else if (teststepfortester.StatusArrayForPass[teststepfortester.passedStartIndexA] == "4") {
                    var ncstatus = '4';
                    $('#radPending').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }

                else if (teststepfortester.StatusArrayForPass[teststepfortester.passedStartIndexA] == "2") {
                    var pstatus = '2';
                    $('#radPass').attr("checked", "checked");
                    teststepfortester.landedStatus = pstatus;
                }
                else if (teststepfortester.StatusArrayForPass[teststepfortester.passedStartIndexA] == "3") {
                    var fstatus = '3'
                    $('#radFail').attr("checked", "checked");
                    teststepfortester.landedStatus = fstatus;
                }
            }

            var childID = teststepfortester.ChildIDArrayForPass[teststepfortester.passedStartIndexA];
            teststepfortester.viewAttachments(childID);
        }

        //Code Added by Rajiv
        $("#ddTestCases > option").each(function () {
            if (this.value == teststepfortester.TCIDArrayForPass[teststepfortester.passedStartIndexA]) {
                this.selected = true;
                teststepfortester.fetchTestSteps();
                var ID = teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['ID'];
                var index = $.inArray(ID, teststepfortester.TsIds);
                if (index != 0) {
                    if ((index / 10).toString().indexOf(".") != -1)
                        teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
                    else
                        teststepfortester.gPageIndex = Math.ceil(index / 10);
                }
                else
                    teststepfortester.gPageIndex = 0;

                teststepfortester.indexStart = (teststepfortester.gPageIndex) * 10;
                teststepfortester.displayPaging();
            }
        });
        try {
            var ID = teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['ID'];
        }
        catch (e) {
            var ID = '';
            if (teststepfortester.passedTestSteps.length != 0)
                ID = teststepfortester.passedTestSteps[0]['ID'];
        }
        //var ID=teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA]['ID'];
        if (ID != '') {
            if (isRootWeb)
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            else
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            $('#id' + ID + '').css("background-position", "0px 0px");
            $('#id' + ID + '').css("background-repeat", "no-repeat");

            if (ID != teststepfortester.latestSelectedTestStep)
                $('#id' + teststepfortester.latestSelectedTestStep + '').css("background-image", "");

            teststepfortester.latestSelectedTestStep = ID;

            if (teststepfortester.IDForShowTestStep != '' && ID != teststepfortester.IDForShowTestStep) {
                // var ID=teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['ID'];
                $('#id' + teststepfortester.IDForShowTestStep + '').css("background-image", "");
                teststepfortester.IDForShowTestStep = '';
            }
        }

        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TCId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.ChildIDArrayForPass[teststepfortester.passedStartIndexA] == teststepfortester.forTCIDGetLastTestStep[TCId] && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();
        //Code added by deepak for sequencing
        var childID = teststepfortester.ChildIDArrayForPass[teststepfortester.passedStartIndexA];
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];
        var vActionName = teststepfortester.GetFormatedText(teststepfortester.passedTestSteps[teststepfortester.passedStartIndexA].testStepName, 'false');
        var completeActionName = vActionName.replace(/(\r\n)+/g, '');
        if (vActionName.indexOf("<") != -1 && vActionName.indexOf(">") != -1)
            vActionName = completeActionName;

        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vActionName + '</td></tr></tbody></table>';
        //Code added by deepak for sequencing

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        /*if($("#rte2").contents().find("a").length != 0)
        $("#rte2").contents().find("a").attr("target","_blank");*/
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));

    },
    fillFailedGrid: function () {
        teststepfortester.gridFlag = "failed";
        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.failedStartIndexA) + 1) + ' of  ' + teststepfortester.failedTestSteps.length + ' total ' + teststepfortester.gConfigTestStep + '(s) failed only</label>';//:SD
        $("#btnSave").attr('onClick', '');

        $('.testPassNavigation').empty();
        var indexCount = (teststepfortester.failedStartIndexA) + 1;

        if (indexCount != teststepfortester.notCompletedTestSteps.length) {
            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.failedStartIndexADecrement();teststepfortester.fillFailedGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.failedStartIndexAIncrement();teststepfortester.fillFailedGrid()\',100);"><br /></a></div><div class="clear"></div>');

            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.failedStartIndexAIncrement();teststepfortester.fillFailedGrid();',100);");
        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.failedStartIndexADecrement();teststepfortester.fillFailedGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.failedStartIndexAIncrement();teststepfortester.fillFailedGrid()\',100);"><br /></a></div><div class="clear"></div>');

            /****code added by sheetal on 2 April for adding next functionality to save button **********/
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.failedStartIndexAIncrement();teststepfortester.fillFailedGrid();',100);");
            /**************************************************************************/

        }

        $("[name$='HiddenField_URL']").val(teststepfortester.startIndexA + ";" + teststepfortester.passedStartIndexA + ";" + teststepfortester.failedStartIndexA + ";" + teststepfortester.notCompletedStartIndexA + ";" + teststepfortester.pendingStartIndexA + ";" + teststepfortester.searchResultStartIndexA + ";" + teststepfortester.gridFlag);

        var TCId = teststepfortester.TCIDArrayForFail[teststepfortester.failedStartIndexA];
        teststepfortester.hidTestCaseID = TCId;

        var TestCaseName = teststepfortester.TCNameArray[TCId];
        if (TestCaseName != null || TestCaseName != undefined) {
            document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
            document.getElementById('tdTestCase').title = TestCaseName;

            document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
            document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

            if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                var estTime = teststepfortester.EstimatedTime[TCId];
            else
                var estTime = ' N/A';
            document.getElementById('estTime').innerHTML = estTime;

            /////////////////////////////////
            document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA]['ID']);
            if (teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA]['expResult'] != undefined && teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA]['expResult'] != undefined)
                $('#expectedResultWithImage').html(teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA]['expResult']);
            else
                $('#expectedResultWithImage').html('-');
            if (teststepfortester.ActualResultArrayForFail[teststepfortester.failedStartIndexA] != null
		   && teststepfortester.ActualResultArrayForFail[teststepfortester.failedStartIndexA] != undefined
		   && teststepfortester.ActualResultArrayForFail[teststepfortester.failedStartIndexA] != '') {
                $('#actualResultWithImage').html(teststepfortester.ActualResultArrayForFail[teststepfortester.failedStartIndexA]);
                teststepfortester.landedActualResult = $('#actualResultWithImage').html();

            }
            else {
                $('#actualResultWithImage').html("");
                teststepfortester.landedActualResult = '';
            }

            for (var m = 0; m < teststepfortester.StatusArrayForFail.length; m++) {
                if (teststepfortester.StatusArrayForFail[teststepfortester.failedStartIndexA] == "1") {
                    var ncstatus = '1';
                    $('#radNotCompleted').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }
                else if (teststepfortester.StatusArrayForFail[teststepfortester.failedStartIndexA] == "4") {
                    var ncstatus = '4';
                    $('#radPending').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }

                else if (teststepfortester.StatusArrayForFail[teststepfortester.failedStartIndexA] == "2") {
                    var pstatus = '2';
                    $('#radPass').attr("checked", "checked");
                    teststepfortester.landedStatus = pstatus;
                }
                else if (teststepfortester.StatusArrayForFail[teststepfortester.failedStartIndexA] == "3") {
                    var fstatus = '3';
                    $('#radFail').attr("checked", "checked");
                    teststepfortester.landedStatus = fstatus;
                }
            }

            //Added by HRW
            var childID = teststepfortester.ChildIDArrayForFail[teststepfortester.failedStartIndexA];
            teststepfortester.viewAttachments(childID);
        }

        //code added by Rajiv
        $("#ddTestCases > option").each(function () {
            if (this.value == teststepfortester.TCIDArrayForFail[teststepfortester.failedStartIndexA]) {
                this.selected = true;
                teststepfortester.fetchTestSteps();
                var ID = teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA]['ID'];
                var index = $.inArray(ID, teststepfortester.TsIds);
                if (index != 0) {
                    if ((index / 10).toString().indexOf(".") != -1)
                        teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
                    else
                        teststepfortester.gPageIndex = Math.ceil(index / 10);
                }
                else
                    teststepfortester.gPageIndex = 0;

                teststepfortester.indexStart = (teststepfortester.gPageIndex) * 10;
                teststepfortester.displayPaging();
            }
        });
        try {
            var ID = teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA]['ID'];
        }
        catch (e) {
            var ID = '';
            if (teststepfortester.failedTestSteps.length != 0)
                ID = teststepfortester.failedTestSteps[0]['ID'];
        }
        if (ID != '') {
            if (isRootWeb)
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            else
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            $('#id' + ID + '').css("background-position", "0px 0px");
            $('#id' + ID + '').css("background-repeat", "no-repeat");
            if (ID != teststepfortester.latestSelectedTestStep)
                $('#id' + teststepfortester.latestSelectedTestStep + '').css("background-image", "");

            teststepfortester.latestSelectedTestStep = ID;

            if (teststepfortester.IDForShowTestStep != '' && ID != teststepfortester.IDForShowTestStep) {
                // var ID=teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['ID'];
                $('#id' + teststepfortester.IDForShowTestStep + '').css("background-image", "");
                teststepfortester.IDForShowTestStep = '';
            }
        }

        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TCId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.ChildIDArrayForFail[teststepfortester.failedStartIndexA] == teststepfortester.forTCIDGetLastTestStep[TCId] && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();

        //Code added by deepak for sequencing
        var childID = teststepfortester.ChildIDArrayForFail[teststepfortester.failedStartIndexA];
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];
        var vActionName = teststepfortester.GetFormatedText(teststepfortester.failedTestSteps[teststepfortester.failedStartIndexA].testStepName, 'false');
        var completeActionName = vActionName.replace(/(\r\n)+/g, '');
        if (vActionName.indexOf("<") != -1 && vActionName.indexOf(">") != -1)
            vActionName = completeActionName;
        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vActionName + '</td></tr></tbody></table>';
        //Code added by deepak for sequencing

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        /*if($("#rte2").contents().find("a").length != 0)
        $("#rte2").contents().find("a").attr("target","_blank");*/
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));
    },

    membersForinitPagination: new Array(),
    gPageIndex: "",
    latestSelectedTestStep: '',
    fillNotCompletedGrid: function () {
        $("[name$='HiddenField_URL']").val(teststepfortester.startIndexA + ";" + teststepfortester.passedStartIndexA + ";" + teststepfortester.failedStartIndexA + ";" + teststepfortester.notCompletedStartIndexA + ";" + teststepfortester.pendingStartIndexA + ";" + teststepfortester.searchResultStartIndexA + ";" + teststepfortester.gridFlag);

        teststepfortester.gridFlag = "notCompleted";

        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.notCompletedStartIndexA) + 1) + ' of  ' + teststepfortester.notCompletedTestSteps.length + ' total ' + teststepfortester.gConfigTestStep + '(s) Not Completed only</label>';//:SD

        $("#btnSave").attr('onClick', '');
        $('.testPassNavigation').empty();
        var indexCount = (teststepfortester.notCompletedStartIndexA) + 1;
        if (indexCount != teststepfortester.notCompletedTestSteps.length) {
            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexADecrement();teststepfortester.fillNotCompletedGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexAIncrement();teststepfortester.fillNotCompletedGrid();\',100);"><br /></a></div><div class="clear"></div>');

            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexAIncrement();teststepfortester.fillNotCompletedGrid();',100);");
        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexADecrement();teststepfortester.fillNotCompletedGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexAIncrement();teststepfortester.fillNotCompletedGrid();\',100);"><br /></a></div><div class="clear"></div>');

            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.notCompletedStartIndexAIncrement();teststepfortester.fillNotCompletedGrid();',100);");
        }

        var TCId = teststepfortester.TCIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA];

        teststepfortester.hidTestCaseID = TCId;

        var TestCaseName = teststepfortester.TCNameArray[TCId];
        if (TestCaseName != null || TestCaseName != undefined) {
            document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
            document.getElementById('tdTestCase').title = TestCaseName;

            document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
            document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

            if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                var estTime = teststepfortester.EstimatedTime[TCId];
            else
                var estTime = ' N/A';
            document.getElementById('estTime').innerHTML = estTime;

            /////////////////////
            document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['ID']);
            if (teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['expResult'] !== null && teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['expResult'] != undefined)
                $('#expectedResultWithImage').html(teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['expResult']);
            else
                $('#expectedResultWithImage').html('-');
            $("iframe[name='rte2'").contents().find('body p.MsoListParagraphCxSpLast').css("margin-bottom", "0pt"); //to avoid scroll 

            if (teststepfortester.ActualResultArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] != null
           && teststepfortester.ActualResultArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] != undefined
           && teststepfortester.ActualResultArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] != '') {
                $('#actualResultWithImage').html(teststepfortester.ActualResultArrayForNotCompleted[teststepfortester.notCompletedStartIndexA]);
                teststepfortester.landedActualResult = $('#actualResultWithImage').html();
            }
            else {
                $('#actualResultWithImage').html("");
                teststepfortester.landedActualResult = '';
            }
            for (var m = 0; m < teststepfortester.StatusArrayForNotCompleted.length; m++) {
                if (teststepfortester.StatusArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] == "1") {
                    var ncstatus = '1';
                    if (teststepfortester.createStatusSection != 1)//code added by deepak for bug id 3960
                        $('#radNotCompleted').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }
                else if (teststepfortester.StatusArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] == "4") {
                    var ncstatus = '4';
                    $('#radPending').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }

                else if (teststepfortester.StatusArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] == "2") {
                    var pstatus = '2';
                    $('#radPass').attr("checked", "checked");
                    teststepfortester.landedStatus = pstatus;
                }
                else if (teststepfortester.StatusArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] == "3") {
                    var fstatus = '3'
                    $('#radFail').attr("checked", "checked");
                    teststepfortester.landedStatus = fstatus;
                }
            }
            teststepfortester.landedStatus = $('input:radio[name=radStatus]:checked').val();

            var childID = teststepfortester.ChildIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA];
            teststepfortester.viewAttachments(childID);

        }

        //Code added by Rajiv

        $("#ddTestCases > option").each(function () {
            if (this.value == teststepfortester.TCIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA]) {
                this.selected = true;
                teststepfortester.fetchTestSteps();
                var ID = teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['testStepPlanId'];
                var index = $.inArray(ID, teststepfortester.TsIds);
                if (index != 0) {
                    if ((index / 10).toString().indexOf(".") != -1) {
                        if ((index / 10).toString().indexOf(".") != -1)
                            teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
                        else
                            teststepfortester.gPageIndex = Math.ceil(index / 10);
                    }
                    else
                        teststepfortester.gPageIndex = Math.ceil(index / 10);

                }
                else
                    teststepfortester.gPageIndex = 0;

                //Added by HRW
                teststepfortester.indexStart = (teststepfortester.gPageIndex) * 10;
                teststepfortester.displayPaging();
            }
        });

        //Added by HRW 
        if (teststepfortester.notCompletedStartIndexA + 1 > teststepfortester.notCompletedTestSteps.length && Main.getCookie("TesterPageState") != undefined) {
            teststepfortester.notCompletedStartIndexA = teststepfortester.notCompletedStartIndexA - (teststepfortester.notCompletedStartIndexA + 1 - teststepfortester.notCompletedTestSteps.length);
        }
        if (teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['testStepPlanId'] != null && teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['testStepPlanId'] != undefined) {
            try {
                var ID = teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['testStepPlanId'];
            }
            catch (e) {
                var ID = '';
                if (teststepfortester.notCompletedTestSteps.length != 0)
                    var ID = teststepfortester.notCompletedTestSteps[0]['testStepPlanId'];
            }
            if (ID != '') {
                if (isRootWeb)
                    $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                else
                    $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
                $('#id' + ID + '').css("background-position", "0px 0px");
                $('#id' + ID + '').css("background-repeat", "no-repeat");


                if (ID != teststepfortester.latestSelectedTestStep)
                    $('#id' + teststepfortester.latestSelectedTestStep + '').css("background-image", "");

                teststepfortester.latestSelectedTestStep = ID;
            }
        }
        if (teststepfortester.IDForShowTestStep != '' && ID != teststepfortester.IDForShowTestStep) {
            $('#id' + teststepfortester.IDForShowTestStep + '').css("background-image", "");
            teststepfortester.IDForShowTestStep = '';
        }

        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TCId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.ChildIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA] == teststepfortester.forTCIDGetLastTestStep[TCId] && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();

        //Code added by deepak for sequencing
        var childID = teststepfortester.ChildIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA];
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];
        var vActionName = teststepfortester.GetFormatedText(teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA].testStepName, 'false');
        var completeActionName = vActionName.replace(/(\r\n)+/g, '');
        if (vActionName.indexOf("<") != -1 && vActionName.indexOf(">") != -1)
            vActionName = completeActionName;
        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vActionName + '</td></tr></tbody></table>';
        //Code added by deepak for sequencing

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));
    },
    viewAttachments: function (testStepPlanId) {
        for (var i = 0; i < teststepfortester.childListResult.length; i++) {
            if (teststepfortester.childListResult[i]['testStepPlanId'] == testStepPlanId) {
                var flagResult = false;
                var flagExpected = false;
                var actCount = 0;
                $("#preview").html('');
                $("#lblAttachment a").css('margin-right', '8px');

                /*Added by Atul.s to Get Attachment*/
                var _filesId = ServiceLayer.GetData('GetAttachmentIDbyChildID', testStepPlanId, 'TestingPg');
                if (_filesId != null && _filesId != undefined && _filesId.length > 0) {
                    for (var j = 0; j < _filesId.length; j++) {
                        actCount++;
                        teststepfortester.preview(_filesId[j].ids, actCount);
                        flagResult = true;
                    }
                }

                if (teststepfortester.childListResult[i]["TCID"] != "") {
                    var tcId = teststepfortester.childListResult[i]["TCID"]
                    var _filesId1 = ServiceLayer.GetData('GetExpectedAttachmentIDbyTCID', tcId, 'TestingPg');
                    if (_filesId1 != null && _filesId1 != undefined && _filesId1.length > 0) {
                        for (var j = 0; j < _filesId1.length; j++) {

                            teststepfortester.preview2(_filesId1[j].ids);
                            flagExpected = true;
                        }
                    }
                }

                /* comment by Atul.s
                                if (teststepfortester.childListResult[i]['actAttachment1'] != '' && teststepfortester.childListResult[i]['actAttachment1'] != undefined) {
                                    actCount++;
                                    teststepfortester.preview(teststepfortester.childListResult[i]['actAttachment1'], actCount);
                                    flagResult = true;
                                }
                
                                if (teststepfortester.childListResult[i]['actAttachment2'] != '' && teststepfortester.childListResult[i]['actAttachment2'] != undefined) {
                                    actCount++;
                                    teststepfortester.preview(teststepfortester.childListResult[i]['actAttachment2'], actCount);
                                    flagResult = true;
                                }
                
                                if (teststepfortester.childListResult[i]['actAttachment3'] != '' && teststepfortester.childListResult[i]['actAttachment3'] != undefined) {
                                    actCount++;
                                    teststepfortester.preview(teststepfortester.childListResult[i]['actAttachment3'], actCount);
                                    flagResult = true;
                                }
                
                                if (teststepfortester.childListResult[i]['expAttachment'] != '' && teststepfortester.childListResult[i]['expAttachment'] != undefined)//For Bug 5671
                                {
                                    teststepfortester.preview2(teststepfortester.childListResult[i]['expAttachment']);
                                    flagExpected = true;
                                }
                                */

                if (flagResult == false) {
                    teststepfortester.preview('');
                }
                if (flagExpected == false)
                    teststepfortester.preview2('');

                break;
            }
        }
    },
    //Pending Function starts here
    fillPendingGrid: function () {
        $("[name$='HiddenField_URL']").val(teststepfortester.startIndexA + ";" + teststepfortester.passedStartIndexA + ";" + teststepfortester.failedStartIndexA + ";" + teststepfortester.notCompletedStartIndexA + ";" + teststepfortester.pendingStartIndexA + ";" + teststepfortester.searchResultStartIndexA + ";" + teststepfortester.gridFlag);
        teststepfortester.gridFlag = "pending";
        var temp = '<label class="showCounter" id="testStepCount">Showing #' + ((teststepfortester.pendingStartIndexA) + 1) + ' of  ' + teststepfortester.pendingTestSteps.length + ' total ' + teststepfortester.gConfigTestStep + '(s) Pending only</label>';//:SD
        $('.testPassNavigation').empty();
        $("#btnSave").attr('onClick', '');

        var indexCount = (teststepfortester.pendingStartIndexA) + 1;
        if (indexCount != teststepfortester.pendingTestSteps.length) {
            $('.testPassNavigation').append('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.pendingStartIndexADecrement();teststepfortester.fillPendingGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.pendingStartIndexAIncrement();teststepfortester.fillPendingGrid()\',100);"><br /></a></div><div class="clear"></div>');
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.pendingStartIndexAIncrement();teststepfortester.fillPendingGrid();',100);");

        }
        else {
            $('.testPassNavigation').html('<div class="pre-tab"><a class="showPrev" style="cursor:pointer" id="previous" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.pendingStartIndexADecrement();teststepfortester.fillPendingGrid()\',100);"></a></div>' + temp + '<div class="nxt-tab"><a style="cursor:pointer" class="showNext" id="next" onclick="Main.showLoading();setTimeout(\'teststepfortester.saveOnNextPrevious();teststepfortester.pendingStartIndexAIncrement();teststepfortester.fillPendingGrid()\',100);"><br /></a></div><div class="clear"></div>');
            $("#btnSave").attr("onClick", "Main.showLoading();setTimeout('teststepfortester.saveOnNextPrevious();teststepfortester.pendingStartIndexAIncrement();teststepfortester.fillPendingGrid();',100);");
        }

        var TCId = teststepfortester.TCIDArrayForPending[teststepfortester.pendingStartIndexA];
        teststepfortester.hidTestCaseID = TCId;
        var TestCaseName = teststepfortester.TCNameArray[TCId];
        if (TestCaseName != null || TestCaseName != undefined) {
            document.getElementById('tdTestCase').innerHTML = trimText(TestCaseName.replace(/</g, '&lt;').replace(/>/g, '&gt;'), 68);
            document.getElementById('tdTestCase').title = TestCaseName;

            document.getElementById('testCaseDesc').innerHTML = trimText(teststepfortester.TCDescArray[TCId].replace(/</g, '&lt;').replace(/>/g, '&gt;'), 80);
            document.getElementById('testCaseDesc').title = teststepfortester.TCDescArray[TCId];

            if (teststepfortester.EstimatedTime[TCId] != undefined && teststepfortester.EstimatedTime[TCId] != "")
                var estTime = teststepfortester.EstimatedTime[TCId];
            else
                var estTime = ' N/A';
            document.getElementById('estTime').innerHTML = estTime;

            ///////////////////////////////
            document.getElementById('hidTestStepID').value = teststepfortester.filterData(teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['ID']);
            if (teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['expResult'] != null && teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['expResult'] != undefined)
                $('#expectedResultWithImage').html(teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['expResult']);
            else
                $('#expectedResultWithImage').html('-');
            if (teststepfortester.ActualResultArrayForPending[teststepfortester.pendingStartIndexA] != null
	           && teststepfortester.ActualResultArrayForPending[teststepfortester.pendingStartIndexA] != undefined
	           && teststepfortester.ActualResultArrayForPending[teststepfortester.pendingStartIndexA] != '') {
                $('#actualResultWithImage').html(teststepfortester.ActualResultArrayForPending[teststepfortester.pendingStartIndexA]);
                teststepfortester.landedActualResult = $('#actualResultWithImage').html();

            }
            else {
                //code added to blank value in RTE on 15 Mar by sheetal
                $('#actualResultWithImage').html("");
                teststepfortester.landedActualResult = '';
            }
            for (var m = 0; m < teststepfortester.StatusArrayForPending.length; m++) {

                if (teststepfortester.StatusArrayForPending[teststepfortester.pendingStartIndexA] == "1") {
                    var ncstatus = '1';
                    $('#radNotCompleted').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }
                else if (teststepfortester.StatusArrayForPending[teststepfortester.pendingStartIndexA] == "4") {
                    var ncstatus = '4';
                    $('#radPending').attr("checked", "checked");
                    teststepfortester.landedStatus = ncstatus;
                }

                else if (teststepfortester.StatusArrayForPending[teststepfortester.pendingStartIndexA] == "2") {
                    var pstatus = '2';
                    $('#radPass').attr("checked", "checked");
                    teststepfortester.landedStatus = pstatus;
                }
                else if (teststepfortester.StatusArrayForPending[teststepfortester.pendingStartIndexA] == "3") {
                    var fstatus = '3'
                    $('#radFail').attr("checked", "checked");

                    teststepfortester.landedStatus = fstatus;
                }
            }

            teststepfortester.landedStatus = $('input:radio[name=radStatus]:checked').val();

            var childID = teststepfortester.ChildIDArrayForPending[teststepfortester.pendingStartIndexA];
            teststepfortester.viewAttachments(childID);

        }
        //Code added by Rajiv

        $("#ddTestCases > option").each(function () {
            if (this.value == teststepfortester.TCIDArrayForPending[teststepfortester.pendingStartIndexA]) {
                this.selected = true;
                teststepfortester.fetchTestSteps();
                var ID = teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['ID'];
                var index = $.inArray(ID, teststepfortester.TsIds);
                if (index != 0) {
                    if ((index / 10).toString().indexOf(".") != -1)
                        teststepfortester.gPageIndex = Math.ceil(index / 10) - 1;
                    else
                        teststepfortester.gPageIndex = Math.ceil(index / 10);
                }
                else
                    teststepfortester.gPageIndex = 0;

                teststepfortester.indexStart = (teststepfortester.gPageIndex) * 10;
                teststepfortester.displayPaging();
            }
        });
        if (teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['ID'] != null
       && teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['ID'] != undefined) {
            var ID = teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA]['ID'];
            if (isRootWeb)
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            else
                $('#id' + ID + '').css("background-image", "url('../images/bg-testCaseHover.jpg')");
            $('#id' + ID + '').css("background-position", "0px 0px");
            $('#id' + ID + '').css("background-repeat", "no-repeat");

            if (ID != teststepfortester.latestSelectedTestStep)
                $('#id' + teststepfortester.latestSelectedTestStep + '').css("background-image", "");

            teststepfortester.latestSelectedTestStep = ID;
        }
        if (teststepfortester.IDForShowTestStep != '' && ID != teststepfortester.IDForShowTestStep) {
            // var ID=teststepfortester.notCompletedTestSteps[teststepfortester.notCompletedStartIndexA]['ID'];
            $('#id' + teststepfortester.IDForShowTestStep + '').css("background-image", "");
            teststepfortester.IDForShowTestStep = '';
        }

        var TCId = teststepfortester.TCIDArrayForPending[teststepfortester.pendingStartIndexA];
        if (teststepfortester.feedbackRating == '1' && teststepfortester.testingType == '2') {
            var status = teststepfortester.forTCIDGetStatus[TCId].split(",");
            var count = 0;
            for (var mm = 0; mm < status.length; mm++) {
                if (status[mm] == '2')
                    count++;
            }
            if ((status.length - 1) == count && teststepfortester.landedStatus != '2')
                $("#feedbackNote").show();
            else
                $("#feedbackNote").hide();
        }
        else if (teststepfortester.ChildIDArrayForPending[teststepfortester.pendingStartIndexA] == teststepfortester.forTCIDGetLastTestStep[TCId] && teststepfortester.feedbackRating == '1')
            $("#feedbackNote").show();
        else
            $("#feedbackNote").hide();
        //Code added by deepak for sequencing
        var childID = teststepfortester.ChildIDArrayForPending[teststepfortester.pendingStartIndexA];
        var actionNumber = teststepfortester.ActionNumberForChildID[childID];
        var vActionName = teststepfortester.GetFormatedText(teststepfortester.pendingTestSteps[teststepfortester.pendingStartIndexA].testStepName, 'false');
        var completeActionName = vActionName.replace(/(\r\n)+/g, '');
        if (vActionName.indexOf("<") != -1 && vActionName.indexOf(">") != -1)
            vActionName = completeActionName;
        document.getElementById('txtTestStep').innerHTML = '<table><tbody><tr><td class="testStepID">' + actionNumber + '</td><td>' + vActionName + '</td></tr></tbody></table>';
        //Code added by deepak for sequencing

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        /*if($("#rte2").contents().find("a").length != 0)
        $("#rte2").contents().find("a").attr("target","_blank");*/
        $('#expectedResultWithImage').find('a').attr('target', '_blank');
        $("#TCnumber").html($("#ddTestCases option:selected").text().substr(0, $("#ddTestCases option:selected").text().indexOf('.')));
    },

    deleteAttachment: function (id) {

        var attList = jP.Lists.setSPObject(teststepfortester.SiteURL, 'Attachment');
        attList.deleteItem(id);
        //teststepfortester.alertBox("Attachment deleted successfully!");
        teststepfortester.alertBox(teststepfortester.gConfigAttachment + " deleted successfully!");//:SD
        //$("#preview").html("No Preview");
        $("#attDownload").removeAttr("href");
        $("#attDownload").hide();
        $("#actionDiv").empty();
        $("#preview").html("<div style='float:left; cursor:pointer'><a style='cursor:pointer' onclick='teststepfortester.showUpload();'><img class='testPassResultImages' src='../images/no-attachment-found.jpg'/></a></div><div style='float:left; padding-top:5px;'><a onclick='teststepfortester.showUpload();' style='cursor:pointer'></a></div>");
    },

    preview: function (filepath, actCount) {
        if (filepath != '') {
            $("#lblAttachment a").css('margin-right', '2px');
            $("#preview").show();
            //filepath = Main.getSiteUrl() + "/Lists/Attachment/Attachments/" + filepath;
            //--Commented by Atul.s $("#preview").append("<a class='txtSmall rgt' href='" + filepath + "' target='_blank' style='cursor:pointer;color:blue'>[ View Attachment" + actCount + " ]</a>");

            $("#preview").append("<a class='txtSmall rgt' onclick='AutoCompleteTextbox._testingPgattchmentdownload( " + filepath + ");' target='_blank' style='cursor:pointer;color:blue'>[ View Attachment" + actCount + " ]</a>");
            $('.testPassInstruction-01').attr('style', "display:inline");
        }
        else {
            $("#preview").hide();
        }
    },
    preview2: function (filepath) {
        var filesHtml;
        if (filepath != '') {
            $("#preview2").show();
            $("#preview2").html("<a class='txtSmall rgt' onclick='AutoCompleteTextbox._testingPgattchmentdownload( " + filepath + ");' target='_blank' style='cursor:pointer;color:blue'>[ View Attachment ]</a>");
        }
        else {
            $("#preview2").hide();
        }
        /*
        if (filepath != '') {
            $("#preview2").show();
            //filepath = Main.getSiteUrl() + "/Lists/Attachment/Attachments/" + filepath;
            if ($.inArray(filepath.split('.').pop().toLowerCase(), ['gif', 'png', 'jpg', 'jpeg', 'bmp']) != -1) {
                $("#preview2").html("<a class='txtSmall rgt' target='_blank' style='cursor:pointer;color:blue'>[ View Attachment ]</a>");
                $("#preview2 a").attr('href', filepath);
            }
                /////////////////////////
            else if (filepath != null && filepath.split('.')[1] != undefined && filepath.split('.')[1] != '') {
                $("#preview2").show();
                var ext = filepath.split('.').pop().toLowerCase();
                var filename = filepath.split('.')[0];
                var filesHtml;
                switch (ext) {
                    case "doc":
                    case "docx":
                        {
                            filesHtml = '../images/icon-word.png';
                        }
                        break;

                    case "xls":
                    case "xlsx":
                        {
                            filesHtml = '../images/icon-excel.png';
                        }
                        break;

                    case "ppt":
                    case "pptx":
                        {
                            filesHtml = '../images/icon-powerpoint.png';
                        }
                        break;

                    case "pdf":
                        {
                            filesHtml = '../images/icon-pdf.png';
                        }
                        break;

                    case "msg":
                        {
                            filesHtml = '../images/outlook.jpg';
                        }
                        break;

                    default:
                        {
                            filesHtml = '../images/unknown file.jpg';
                        }
                        break;
                }

                //$("#preview2").html("<div style='width: 100px; height: 50px; text-align:center;' class='testPassResultImages'><a style='padding-left:5px;vertical-align:middle' href='"+filepath+"' class='orange' target='_blank' Title='"+filepath.split('/').pop().toLowerCase()+"'><img src='"+filesHtml+"' alt='' style='width: 20px; height: 20px;'/></br>"+trimText(filepath.split('/').pop(),10)+"</a></div>");
                $("#preview2").html("<a style='padding-left:5px;vertical-align:middle' href='" + filepath + "' class='orange' target='_blank' Title='" + filepath.split('/').pop().toLowerCase() + "'><a class='txtSmall rgt' href='" + filepath + "' target='_blank' style='cursor:pointer;color:blue'>[ View Attachment ]</a></a>");
                $('.testPassInstruction-01').attr('style', "display:none");
                $("#preview2 a").attr("href", filepath);

            }

                /////////////////////////// 

            else
                $("#preview2").hide();


            $("#attDownload").attr("href", teststepfortester.SiteURL + filepath);
            $("#attDownload").show();
            $('.testPassInstruction-01').attr('style', "display:inline");
        }
        else {

            $("#preview2").hide();
            $("#attDownload").removeAttr("href");
            $("#attDownload").hide();
        }
        */
    },


    filterData: function (info2) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        if (navigator.appName == "Microsoft Internet Explorer")
            info2 = mydiv.innerText;
        else
            info2 = mydiv.textContent;
        return info2;
    },
    filterDataOld: function (info2) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        info2 = mydiv.innerHTML;

        info2 = info2.innerHTML;
        return info2;
    },


    searchResultStartIndexAIncrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.searchResultStartIndexA + 1 != teststepfortester.searchResultTestSteps.length)
                teststepfortester.searchResultStartIndexA += 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;
        }


    },

    searchResultStartIndexADecrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.searchResultStartIndexA > 0)
                teststepfortester.searchResultStartIndexA -= 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;
        }


    },
    startIndexAIncrementNew: function () {
        teststepfortester.startIndexNewAll += 3;
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexNewAll >= teststepfortester.allTestSteps.length) {
                teststepfortester.startIndexNewAll = teststepfortester.allTestSteps.length - 1;
            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }

    },

    startIndexADecrementNew: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexNewAll > 0) {
                teststepfortester.startIndexNewAll -= 3;
                if (teststepfortester.startIndexNewAll < 0)
                    teststepfortester.startIndexNewAll = 0;

            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },
    startIndexAIncrementNewSearch: function () {
        teststepfortester.startIndexSearch += 3;
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexSearch >= teststepfortester.searchLength) {

                teststepfortester.startIndexSearch = teststepfortester.searchLength - 1;

            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }

    },

    startIndexADecrementNewSearch: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexSearch > 0) {
                teststepfortester.startIndexSearch -= 3;
                if (teststepfortester.startIndexSearch < 0)
                    teststepfortester.startIndexSearch = 0;
            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    startIndexAIncrementNewPass: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexPass + 3 != teststepfortester.passedTestSteps.length)
                teststepfortester.startIndexPass += 3;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }

    },

    startIndexADecrementNewPass: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexPass > 0) {
                teststepfortester.startIndexPass -= 3;
                if (teststepfortester.startIndexPass < 0)
                    teststepfortester.startIndexPass = 0;

            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },
    startIndexAIncrementNewFail: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexFail + 3 != teststepfortester.failedTestSteps.length)
                teststepfortester.startIndexFail += 3;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    startIndexADecrementNewFail: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexFail > 0) {
                teststepfortester.startIndexFail -= 3;
                if (teststepfortester.startIndexFail < 0)
                    teststepfortester.startIndexFail = 0;

            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },
    startIndexAIncrementNewNC: function () {
        var t = teststepfortester.startIndexNC + 3;
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (t != teststepfortester.notCompletedTestSteps.length) {
                teststepfortester.startIndexNC += 3;
                var temp = teststepfortester.startIndexNC + 1;

                if (temp >= teststepfortester.notCompletedTestSteps.length) {
                    teststepfortester.startIndexNC = teststepfortester.notCompletedTestSteps.length;
                    teststepfortester.startIndexNC -= 1;
                }
            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    startIndexADecrementNewNC: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexNC > 0) {
                teststepfortester.startIndexNC -= 3;
                if (teststepfortester.startIndexNC < 0)
                    teststepfortester.startIndexNC = 0;

            }
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    startIndexAIncrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexA + 1 != teststepfortester.allTestSteps.length)
                teststepfortester.startIndexA += 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },


    startIndexADecrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.startIndexA > 0)
                teststepfortester.startIndexA -= 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }

    },

    passedStartIndexAIncrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.passedStartIndexA + 1 != teststepfortester.passedTestSteps.length)
                teststepfortester.passedStartIndexA += 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },


    passedStartIndexADecrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.passedStartIndexA > 0)
                teststepfortester.passedStartIndexA -= 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    failedStartIndexAIncrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.failedStartIndexA + 1 != teststepfortester.failedTestSteps.length)
                teststepfortester.failedStartIndexA += 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },


    failedStartIndexADecrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.failedStartIndexA > 0)
                teststepfortester.failedStartIndexA -= 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    notCompletedStartIndexAIncrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.notCompletedStartIndexA + 1 != teststepfortester.notCompletedTestSteps.length)
                teststepfortester.notCompletedStartIndexA += 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    notCompletedStartIndexADecrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.notCompletedStartIndexA > 0)
                teststepfortester.notCompletedStartIndexA -= 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    //Code for Pending
    pendingStartIndexAIncrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.pendingStartIndexA + 1 != teststepfortester.pendingTestSteps.length)
                teststepfortester.pendingStartIndexA += 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    pendingStartIndexADecrement: function () {
        if (!teststepfortester.BlockNextPreviousNavigation) {
            if (teststepfortester.pendingStartIndexA > 0)
                teststepfortester.pendingStartIndexA -= 1;
        }
        else {
            teststepfortester.BlockNextPreviousNavigation = false;

        }
    },

    newSearch: function () {
        teststepfortester.gLastSearchString = '';
        teststepfortester.searchResultStartIndexA = 0;
        teststepfortester.fillTestPassStatus();
    },

    saveOnNextPrevious: function () {
        teststepfortester.Selected_radStatus = $('input:radio[name=radStatus]:checked').val();
        /* Added by shilpa for Date time stamp on 9 apr */
        teststepfortester.DateTimeStr = '';
        var currentDate = new Date();
        var currentMonth = ((currentDate.getMonth() + 1) > 9) ? (currentDate.getMonth() + 1) : ('0' + (currentDate.getMonth() + 1));
        var currentDay = (currentDate.getDate() > 9) ? (currentDate.getDate()) : ('0' + currentDate.getDate());
        var dateString = currentMonth + '/' + currentDay + '/' + String(currentDate.getFullYear());
        var hh = currentDate.getHours();
        var mm = currentDate.getMinutes();
        var ss = currentDate.getSeconds();
        var time = String(hh) + ':' + String(mm) + ':' + String(ss);
        //when column type is Date and Time
        teststepfortester.DateTimeStr = dateString + ' - ' + time; //when column type is Single line of text
        /*************/
        Main.showLoading();
        if ($('#actualResultWithImage').html() != teststepfortester.landedActualResult || $('input:radio[name=radStatus]:checked').val() != teststepfortester.landedStatus) {
            switch (teststepfortester.gridFlag) {
                case "searchResult": teststepfortester.previousTestStepNo = teststepfortester.searchResultStartIndexA + 1;
                    break;
                case "all": teststepfortester.previousTestStepNo = teststepfortester.startIndexA + 1;
                    break;
                case "passed": teststepfortester.previousTestStepNo = teststepfortester.passedStartIndexA + 1;
                    break;
                case "failed": teststepfortester.previousTestStepNo = teststepfortester.failedStartIndexA + 1;
                    break;
                case "notCompleted": teststepfortester.previousTestStepNo = teststepfortester.notCompletedStartIndexA + 1;
                    break;
                case "pending": teststepfortester.previousTestStepNo = teststepfortester.pendingStartIndexA + 1;
                    break;
            }
            teststepfortester.saveOnNextPreviousFlag = 1;
            var ID = document.getElementById('hidTestStepID').value;
            var actualResult = $('#actualResultWithImage').html();
            jQuery.trim(actualResult);

            var radStatus = $('input:radio[name=radStatus]:checked').val();
            if (radStatus == '1' && teststepfortester.testingType != "2")	//Code added by Rajiv on 9 feb 2012 to resolve bug 640;to prompt user on effects of sequntial testing
                teststepfortester.alertBox4(teststepfortester.gConfigStatus + " is changed to Not completed, but you won't be able to test its immediate next " + teststepfortester.gConfigTestStep + "! To evade this, you can change the " + teststepfortester.gConfigStatus + " to Pending!");//:SD

            var radStatusPending = radStatus;
            if (radStatus == '4')
                radStatus = '1';

            var seq = '';
            var status = '';
            var preSeq = '';
            var selectedTestCaseID = $("#ddTestCases").val().split(",")[0];
            var statusForSeq = new Array();
            var sequence = new Array();
            if (teststepfortester.testingType != "2") {
                for (var i = 0; i < teststepfortester.objValidate.length; i++) {
                    if (teststepfortester.objValidate[i]['TestStepIDAndTestCaseID'].split(",")[1] == selectedTestCaseID || teststepfortester.testingType == "1")//For sequencing according within test cases by deepak and harshal
                    {
                        if (statusForSeq[teststepfortester.objValidate[i]['Sequence']] == undefined)
                            statusForSeq[teststepfortester.objValidate[i]['Sequence']] = teststepfortester.objValidate[i]['status'];
                        else
                            statusForSeq[teststepfortester.objValidate[i]['Sequence']] += "," + teststepfortester.objValidate[i]['status'];
                        if ($.inArray(teststepfortester.objValidate[i]['Sequence'], sequence) == -1)
                            sequence.push(teststepfortester.objValidate[i]['Sequence']);
                        if (teststepfortester.objValidate[i]['TestStepIDAndTestCaseID'] == ID + "," + selectedTestCaseID) {
                            seq = teststepfortester.objValidate[i]['Sequence'];
                            if (i != 0) {
                                var index = $.inArray(seq, sequence);
                                var temp = new Array();
                                if (index != -1 && index != 0) {
                                    temp = sequence.slice(0, index);
                                    for (var ii = 0; ii < temp.length; ii++) {
                                        if ($.inArray('1', statusForSeq[temp[ii]].split(",")) != -1) {
                                            status = '1';
                                            break;
                                        }
                                    }
                                }
                                else if (teststepfortester.testingType == "0")//Added for sequencing within test case
                                {
                                    var sameStatus = statusForSeq[teststepfortester.objValidate[i]['Sequence']].split(",");
                                    for (var ii = 1; ii < sameStatus.length; ii++) {
                                        if (sameStatus[ii] == '1' && sameStatus[ii - 1] == '1') {
                                            status = '1';
                                            break;
                                        }
                                    }

                                }
                            }
                            break;
                        }
                    }
                }
            }
            else
                status = '';

            if (jQuery.trim(status) != '1') {
                teststepfortester.updateStatus(ID);
                if (teststepfortester.gridFlag == "all")
                    teststepfortester.fillTestPassStatus();
                else
                    teststepfortester.fillTestPassStatus2();
                if (teststepfortester.lastTestedTestStep == 1 && teststepfortester.lastTestedTestStep2 == 1)//Added for rating feature
                    teststepfortester.lastTestingTestStep();

                if (teststepfortester.gridFlag == "searchResult")
                    teststepfortester.fsearch();
                var notCompletedStartIndexAPlus1 = (teststepfortester.notCompletedStartIndexA) + 1;
                var failedStartIndexAPlus1 = (teststepfortester.failedStartIndexA) + 1;
                var passedStartIndexAPlus1 = (teststepfortester.passedStartIndexA) + 1;
                var pendingStartIndexAPlus1 = (teststepfortester.pendingStartIndexA) + 1;
                var searchResultStartIndexAPlus1 = (teststepfortester.searchResultStartIndexA) + 1;

                if (notCompletedStartIndexAPlus1 == teststepfortester.notCompletedTestSteps.length)
                    teststepfortester.notCompletedStartIndexA -= 1;
                if (failedStartIndexAPlus1 == teststepfortester.failedTestSteps.length && teststepfortester.failedStartIndexA != 0)
                    teststepfortester.failedStartIndexA -= 1;
                if (passedStartIndexAPlus1 == teststepfortester.passedTestSteps.length && teststepfortester.passedStartIndexA != 0)
                    teststepfortester.passedStartIndexA -= 1;
                if (pendingStartIndexAPlus1 == teststepfortester.pendingTestSteps.length && teststepfortester.pendingStartIndexA != 0)
                    teststepfortester.pendingStartIndexA -= 1;
                if (searchResultStartIndexAPlus1 == teststepfortester.searchResultTestSteps.length) {
                    if (teststepfortester.previous == 0)
                        teststepfortester.searchResultStartIndexA -= 1;
                    else
                        teststepfortester.searchResultStartIndexA += 1;
                }
                window.setTimeout("Main.hideLoading()", 200);
                teststepfortester.BlockNextPreviousNavigation = false;
            }
            else {
                teststepfortester.BlockNextPreviousNavigation = true;
                //teststepfortester.alertBox("You must complete test steps in proper sequence");
                teststepfortester.alertBox("You must complete " + teststepfortester.gConfigTestStep + "s in proper " + teststepfortester.gConfigSequence);//:SD
            }
        } //outer if

        else {
            teststepfortester.saveOnNextPreviousFlag = 0;
        }

        /* shilpa 15 apr */
        if ($("#txtTestStep").find("a").length != 0)
            $("#txtTestStep").find("a").attr("target", "_blank");
        $('#expectedResultWithImage').find('a').attr('target', '_blank');

        Main.hideLoading();
    },
    /*For Test Step feedback PopUP*/
    actionName: '',
    arrTStatus: new Array(),
    firstTimeFlag: 0,
    /*************************/
    updateStatus: function (teststepID) {
        teststepfortester.lastTestedTestStep2 = 1;
        var camlQuery = '';
        var testPassID = teststepfortester.searchTestPassKey;
        var ParentResult;
        var TestingCompleted = true;
        var ChildResult = new Array();
        var StatusForParentID = new Array();
        var StatusForTCIDForLandedRole = new Array();
        var actualResult = $('#actualResultWithImage').html();
        var childID = '';
        switch (teststepfortester.gridFlag) {
            case "searchResult": childID = teststepfortester.ChildIDArrayForSearchResult[teststepfortester.searchResultStartIndexA];
                break;
            case "all": childID = teststepfortester.ChildIDArray[teststepfortester.startIndexA];
                break;
            case "passed": childID = teststepfortester.ChildIDArrayForPass[teststepfortester.passedStartIndexA];
                break;
            case "failed": childID = teststepfortester.ChildIDArrayForFail[teststepfortester.failedStartIndexA];
                break;
            case "notCompleted": childID = teststepfortester.ChildIDArrayForNotCompleted[teststepfortester.notCompletedStartIndexA];
                break;
            case "pending": childID = teststepfortester.ChildIDArrayForPending[teststepfortester.pendingStartIndexA];
                break;
        }

        var obj = new Array();
        var radStatus = $('input:radio[name=radStatus]:checked').val(); //$('#statusDropDown option:selected').val();
        var radStatusPending = radStatus;

        var data = {
            "testStepPlanId": childID,
            "status": radStatus,
            "actResult": actualResult
        };
        var result = ServiceLayer.InsertUpdateData("UpdateTesting", data, "TestingPg");
        if (result != '' && result != undefined) {
            if (result.Success == "Done") {
                var AllNotCompleted = true;
                var status = '';
                var notCompletedFlag = 0;
                teststepfortester.arrTStatus = [];
                for (var i = 0; i < teststepfortester.childListResult.length; i++) {
                    if (teststepfortester.childListResult[i]['ID'] == childID) {
                        status = radStatus;
                        parentIDForSelectedTCID = teststepfortester.childListResult[i]['TestPassMappingID'];
                        teststepfortester.arrTStatus.push(status);
                    }
                    else {
                        status = teststepfortester.childListResult[i]['status'];
                        teststepfortester.arrTStatus.push(status);
                    }
                    if (teststepfortester.childListResult[i]['status'] == 1 || teststepfortester.childListResult[i]['status'] == 4)
                        notCompletedFlag = 1;
                    if (status == "2" || status == "2" || status == "3" || status == "3")
                        AllNotCompleted = false;
                    if (status == "1" || status == "4")
                        TestingCompleted = false;

                    if (StatusForTCIDForLandedRole[teststepfortester.childListResult[i]['TCID']] == undefined)
                        StatusForTCIDForLandedRole[teststepfortester.childListResult[i]['TCID']] = status;
                    else
                        StatusForTCIDForLandedRole[teststepfortester.childListResult[i]['TCID']] += "," + status;
                }
                if (notCompletedFlag == 0 && teststepfortester.firstTimeFlag == 0)
                    teststepfortester.actionName = 'Testing Complete';

                teststepfortester.firstTimeFlag = 1;
                ////// Rating popup will come after complete(pass or fail only) testing is completed by Tester //////
                if (TestingCompleted == true && teststepfortester.feedbackRating == '0')
                    teststepfortester.openRatingPopupAfterTestingComplete();

                // Added for Rating popup(for every passed Test Case) ///////////////////////////////////
                var TestCaseId = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value;
                if (teststepfortester.feedbackRating == '1') {
                    var Status = StatusForTCIDForLandedRole[TestCaseId].split(",");
                    if ($.inArray("3", Status) == -1 && $.inArray("1", Status) == -1 && $.inArray("2", Status) != -1) {
                        teststepfortester.lastTestedTestStep2 = 0;
                        teststepfortester.openRatingPopup();
                    }
                    else {
                        teststepfortester.lastTestedTestStep2 = 1;
                        var feedbackList = ""// jP.Lists.setSPObject(teststepfortester.SiteURL, 'FeedbackRating');
                        if (teststepfortester.forTCIDGetFeedbackID[TestCaseId] != undefined && teststepfortester.forTCIDGetFeedbackID[TestCaseId] != "") {
                          //  var r = feedbackList.deleteItem(teststepfortester.forTCIDGetFeedbackID[TestCaseId]);
                            teststepfortester.forTCIDGetFeedbackID[TestCaseId] = "";
                        }
                    }
                    if (childID != teststepfortester.forTCIDGetLastTestStep[TestCaseId])
                        teststepfortester.lastTestedTestStep2 = 1;

                }
                //Added by Mohini for teststep feedback popup if no feedback rating popup is selected:DT 28-05-2014
                if (TestingCompleted == true && teststepfortester.feedbackRating == '2' && teststepfortester.actionName != 'Testing Complete') {
                    var html = '';
                    html += 'Testing Complete!<br/>';
                    html += 'Thank you for Taking this Test Pass!<br/><br/>';
                    html += 'You can provide individual feedback responses to each test step if you wish from<br/>';
                    html += 'the Feedback Page(on the Test Step Feedback tab)';
                    teststepfortester.testStepFeedbackPopup(html);
                }

                /* shilpa 15 apr */
                if ($("#txtTestStep").find("a").length != 0)
                    $("#txtTestStep").find("a").attr("target", "_blank");
                $('#expectedResultWithImage').find('a').attr('target', '_blank');
            }
        }
    },
    feedbackID: '',
    openRatingPopupAfterTestingComplete: function () {
        teststepfortester.feedbackID = '';
        $("input:radio[name='Rating']").attr("checked", false);
        $('#FeedbackPopUpRTE').attr("title", "Please provide satisfaction rating for this " + teststepfortester.gConfigTestPass);
        $('#FeedbackPopUpRTE').dialog({
            height: 400, width: 423, resizable: false, modal: true, buttons: {
                "Save": function () {
                    Main.showLoading();
                    updateRTE('rte3');
                    var rating = $('input:radio[name=Rating]:checked').val();
                    if (rating != '' && rating != undefined) {
                        var feedback = document.getElementById('hdn' + 'rte3').value;
                        if (teststepfortester.feedbackID != '') {
                            var data = {
                                "feedbackId": teststepfortester.feedbackID,
                                "rating": rating,
                                "feedback": feedback
                            };
                            var result = ServiceLayer.InsertUpdateData("InsertUpdateFR", data, "TestingPg");
                            if (result == '' && result == undefined) {
                                teststepfortester.alertBox('Sorry! Something went wrong, please try again!');
                                return;
                            }
                        }
                        else {
                            var data = {
                                'testPassId': teststepfortester.searchTestPassKey,
                                'rating': rating,
                                'feedback': feedback,
                                'userId': _spUserId.toString(),
                                'roleId': teststepfortester.searchRoleKey
                            };
                            var result = ServiceLayer.InsertUpdateData("InsertUpdateFR", data, "TestingPg");
                            if (result != '' && result != undefined) {
                                if (result.Success == "Done") {
                                    teststepfortester.feedbackID = result.ID;
                                }
                                else {
                                    teststepfortester.alertBox('Sorry! Something went wrong, please try again!');
                                    return;
                                }
                            }
                            else {
                                teststepfortester.alertBox('Sorry! Something went wrong, please try again!');
                                return;
                            }
                        }

                        //added by Mohini for test Step feedback popup DT:28-05-2014  
                        if (teststepfortester.actionName != 'Testing Complete') {
                            var html = '';
                            html += 'Thank you for your ' + teststepfortester.gConfigFeedback + '!<br/><br/>';
                            html += 'You can provide individual ' + teststepfortester.gConfigFeedback.toLowerCase() + ' responses to each ' + teststepfortester.gConfigTestStep.toLowerCase() + ' if you wish from<br/>';
                            html += 'the ' + teststepfortester.gConfigFeedback + ' Page(on the ' + teststepfortester.gConfigTestStep + ' ' + teststepfortester.gConfigFeedback + ' tab)';
                            teststepfortester.testStepFeedbackPopup(html);
                        }
                        /*******************************************/

                        $(this).dialog("close");
                    }
                    else
                        teststepfortester.alertBox('Rating is mandatory field');
                    Main.hideLoading();
                }
            }
        });
        document.getElementById('hdn' + 'rte3').value = "";
        enableDesignMode("rte3", "", false);
        setTimeout(function () { $('div[aria-labelledby=ui-dialog-title-FeedbackPopUpRTE]').css('width', '') }, 100)
        var Result = ServiceLayer.GetData("getFeedbackRating", teststepfortester.searchTestPassKey + "&" + teststepfortester.searchRoleKey, "TestingPg");
        if (Result != null && Result != undefined) {
            if (Result.length != 0) {
                teststepfortester.feedbackID = Result[0]['feedbackId'];
                updateRTE('rte3');
                if (Result[0]['feedback'] != undefined)
                    enableDesignMode("rte3", Result[0]['Feedback'], false);
                switch (Result[0]['rating']) {
                    case "1": $('input[name=Rating]:eq(0)').attr('checked', 'checked');
                        break;
                    case "2": $('input[name=Rating]:eq(1)').attr('checked', 'checked');
                        break;
                    case "3": $('input[name=Rating]:eq(2)').attr('checked', 'checked');
                        break;
                    case "4": $('input[name=Rating]:eq(3)').attr('checked', 'checked');
                        break;
                }
            }
        }
        $("#FeedbackPopUpRTE").parent().children(0).children('a').remove();
    },
    TCIdTCView: '',
    openRatingPopup: function () {
        teststepfortester.feedbackID = '';
        teststepfortester.TCIdTCView = '';
        teststepfortester.TCIdTCView = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value;
        $("input:radio[name='Rating']").attr("checked", false);
        $('#FeedbackPopUpRTE').attr("title", "Please provide satisfaction rating for this " + teststepfortester.gConfigTestCase);

        $('#FeedbackPopUpRTE').dialog({
            height: 400,width:423, resizable: false, modal: true, buttons: {
                "Save": function () {
                    Main.showLoading();
                    updateRTE('rte3');
                    var rating = $('input:radio[name=Rating]:checked').val();
                    if (rating != '' && rating != undefined) {
                        var feedback = document.getElementById('hdn' + 'rte3').value;
                        var obj = new Array();
                        if (teststepfortester.feedbackID == '') {
                            var data = {
                                'testPassId': teststepfortester.searchTestPassKey,
                                'rating': rating,
                                'feedback': feedback,
                                'testCaseId': teststepfortester.TCIdTCView,
                                'userId': _spUserId.toString(),
                                'roleId': teststepfortester.searchRoleKey
                            };
                            var result = ServiceLayer.InsertUpdateData("InsertUpdateFR", data, "TestingPg");
                            if (result != '' && result != undefined) {
                                if (result.Success == "Done") {
                                    teststepfortester.feedbackID = result.ID;
                                }
                                else {
                                    teststepfortester.alertBox('Sorry! Something went wrong, please try again!');
                                    return;
                                }
                            }
                            else {
                                teststepfortester.alertBox('Sorry! Something went wrong, please try again!');
                                return;
                            }
                        }
                        else {
                            var data = {
                                "feedbackId": teststepfortester.feedbackID,
                                "rating": rating,
                                "feedback": feedback
                            };
                            var result = ServiceLayer.InsertUpdateData("InsertUpdateFR", data, "TestingPg");
                            if (result == '' && result == undefined) {
                                teststepfortester.alertBox('Sorry! Something went wrong, please try again!');
                                return;
                            }

                        }
                        teststepfortester.forTCIDGetFeedbackID[teststepfortester.TCIdTCView] = teststepfortester.feedbackID;

                        //added by Mohini for test Step feedback popup DT:28-05-2014  
                        if (teststepfortester.actionName != 'Testing Complete' && $.inArray('1', teststepfortester.arrTStatus) == -1) {
                            var html = '';
                            html += 'Thank you for your ' + teststepfortester.gConfigFeedback.toLowerCase() + '!<br/><br/>';
                            html += 'This is the final ' + teststepfortester.gConfigTestCase + ' of your ' + teststepfortester.gConfigTestPass + ' activity.<br/>';
                            html += 'You can provide individual ' + teststepfortester.gConfigFeedback.toLowerCase() + 'responses to each ' + teststepfortester.gConfigTestStep.toLowerCase() + ' if you wish from<br/>';
                            html += 'the ' + teststepfortester.gConfigFeedback + ' Page(on the ' + teststepfortester.gConfigTestStep + ' ' + teststepfortester.gConfigFeedback + ' tab)';
                            teststepfortester.testStepFeedbackPopup(html);
                        }
                        else if (teststepfortester.actionName != 'Testing Complete' && ($.inArray('1', teststepfortester.arrTStatus) != -1 || $.inArray('4', teststepfortester.arrTStatus) != -1)) {
                            var html = '';
                            html += 'Thank you for your ' + teststepfortester.gConfigFeedback.toLowerCase() + '!<br/><br/>';
                            html += 'You can provide individual ' + teststepfortester.gConfigFeedback.toLowerCase() + ' responses to each ' + teststepfortester.gConfigTestStep.toLowerCase() + ' if you wish from<br/>';
                            html += 'the ' + teststepfortester.gConfigFeedback + ' Page(on the ' + teststepfortester.gConfigTestStep + ' ' + teststepfortester.gConfigFeedback + ' tab)';
                            teststepfortester.testStepFeedbackPopupforTC(html);
                        }
                        /*************************************************************/
                        $(this).dialog("close");
                    }
                    else
                        teststepfortester.alertBox('Rating is mandatory field');
                    Main.hideLoading();
                }
            }
        });
        document.getElementById('hdn' + 'rte3').value = "";
        enableDesignMode("rte3", "", false);
        setTimeout(function () { $('div[aria-labelledby=ui-dialog-title-FeedbackPopUpRTE]').css('width', '') }, 100)
        var TCID = document.getElementById('ddTestCases').options[document.getElementById('ddTestCases').selectedIndex].value;
        var Result = ServiceLayer.GetData("getFeedbackRating", teststepfortester.searchTestPassKey + "&" + teststepfortester.searchRoleKey + "&" + TCID, "TestingPg");
        if (Result != null && Result != undefined) {
            if (Result.length != 0) {
                teststepfortester.feedbackID = Result[0]['feedbackId'];
                updateRTE('rte3');
                if (Result[0]['feedback'] != undefined)
                    enableDesignMode("rte3", Result[0]['feedback'], false);
                switch (Result[0]['rating']) {
                    case "1": $('input[name=Rating]:eq(0)').attr('checked', 'checked');
                        break;
                    case "2": $('input[name=Rating]:eq(1)').attr('checked', 'checked');
                        break;
                    case "3": $('input[name=Rating]:eq(2)').attr('checked', 'checked');
                        break;
                    case "4": $('input[name=Rating]:eq(3)').attr('checked', 'checked');
                        break;
                }
            }
        }
        $("#FeedbackPopUpRTE").parent().children(0).children('a').remove();

    },
    clearFields: function () {
        $('#actualResultWithImage').html(teststepfortester.landedActualResult);

        if (teststepfortester.landedStatus == '2') {
            $('#radPass').attr("checked", "checked");
        }
        else if (teststepfortester.landedStatus == '3') {
            $('#radFail').attr("checked", "checked");
        }
        else {
            $('#radNotCompleted').attr("checked", "checked");
        }
    },

    showUpload: function () {
        $('#upload').dialog({ height: 240, width: 504, top: 240, resizable: false, title: "Testing", modal: true, close: function () { teststepfortester.renewUploadPopup() } });
        $("#upload").parent().appendTo($("form:first"));
        /* Added by shilpa for bug 2204 */
        //$('.ms-standardheader nobr:eq(2)').html("Attachment&nbsp;Name&nbsp;<font color='red'>*</font>");
        //$("#partAttachment .ms-formlabel").text('File Name');
        $("#partAttachment .ms-formlabel").css('display', '').html("File&nbsp;Name&nbsp;<font color='red'>*</font>");//added by Mohini DT:17-06-2014
        $("#partAttachment .ms-formlabel").css('color', '#525252');
        $('.ms-attachUploadButtons').css('padding-bottom', '7px');
        $('.ms-attachUploadButtons').children().eq(0).css('display', '');
        $('.ms-attachUploadButtons').children().eq(1).css('display', '');

        // Code to make the proper alignment of controls :Ejaz Waquif DT:4/23/2014
        //$('#upload input[title="Name  "]').css('height', '20px').css('width', '270px');
        //$("#attachOKbutton").css("margin-right", "-12px");
        //$("textarea[title='Description']").css("margin-top", "7px").css("width", "198pt");
        //End of Code to make the proper alignment of controls :Ejaz Waquif DT:4/23/2014

        //added by Mohini DT:16-07-2014 for alignment
        $("input[title$='AttachmentName']").css('float', 'right');
        $("textarea[title$='Description']").css('float', 'right');
        $("input[title$='AttachmentName']").css('padding-right', '5px');
        $("textarea[title$='Description']").css('padding-right', '5px');
        $("#upload h2 span").css("display", "none");
        $('#attachRow0').html('')
        $('#upload input[type=text]').val('')
        $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable').css("top", "240px");
        $('#attachmentsOnClient').show();
        $('#attachmentsOnClient').prev('td').show()
        $('.ui-dialog .ui-dialog-content').removeAttr('style')
        $('.ui-dialog .ui-dialog-content').css(
            {
                'position': 'relative',
                'border': '0',
                'padding': '.5em 1em',
                'background': 'none',
                'overflow': 'auto',
                'zoom': '1',
                'height': '240px',
                'min-height': '90px !important',
                'max-height': '600px !important'
            })
        $('#upload').css('height', '240px')
        teststepfortester.setAutoFocus();
    },
    setAutoFocus: function () {
        var inter = setTimeout(function () {
            if ($('#upload').is(':visible')) {
                $('#upload input[type=text]:eq(0)').focus();

                _attachEvent();
                clearTimeout(inter);
            }
        }, 100)
    },
    renewUploadPopup: function () {
        $("[title$='Attachment Name']").val("");
        $("[title$='Description']").val("");
        $('#attachmentsOnClient').empty().html('<input style="width: 200pt;margin-left:70px" id="onetidIOFile" class="ms-fileinput" title="Browse" name="fileupload0" size="56" type="file">');
        $('#partAttachment table tbody tr:eq(3)').css('display', 'block');
        //$("#idAttachmentsTable").empty();
        $("#idAttachmentsRow").css('display', 'none');
        $("#partAttachment .ms-formlabel").css('display', '').text('File Name');
        $("#partAttachment .ms-formlabel").css('color', '#525252');
        $('.ms-attachUploadButtons').css('padding-top', '7px');
        $('.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.ui-draggable').css("top", "240px!important;");
        $('#upload input[type=text]:eq(0)').focus();
        $('#upload').css('height', '240px')
    },
    alertBoxwithEval: function (msg, func) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({
            height: 170, resizable: false, title: "Testing", modal: true,
            buttons: {
                "Ok": function () {
                    eval(func);
                    $(this).dialog("close");
                }
            }
        });
    },
    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 170, resizable: false, title: "Testing", modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },
    alertBox2: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 170, resizable: false, title: "Testing", modal: true, buttons: { "Ok": function () { teststepfortester.close(); $(this).dialog("close"); } }, close: function () { teststepfortester.close(); } });
    },
    alertBox3: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 170, resizable: false, title: "Testing", modal: true });
    },
    alertBox4: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 170, resizable: false, title: "Testing", modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },
    //:SD
    alertBoxHTML: function (msg) {
        $("#divAlert").html(msg);
        $('#divAlert').dialog({ height: 170, resizable: false, title: "Testing", modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },

    modifySearchResultString: function () {
        if (teststepfortester.searchResultTestSteps.length != 0)
            document.getElementById('lblSearchResult').innerHTML = '<a class="selHeading" style="cursor:pointer;" onclick=teststepfortester.fsearch()>' + teststepfortester.searchResultTestSteps.length + ' match result(s) of last search</a>';

    },
    FeedbackRedirect: function () {
        var path = "feedback?keys=" + teststepfortester.searchProjectKey + "," + teststepfortester.searchTestPassKey + "," + teststepfortester.searchRoleKey + "";
        $('#feedbackredirect').attr('href', path);
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
                                sResult = sResult + '*  ' + txtText + sNewLine; //'\n';

                            }
                            else {
                                sResult = sResult + txtText + sNewLine; //'\n';

                            }
                        }
                    }
                    else {
                        sResult = sResult + $('#dvTemp').find('p')[i].innerText + sNewLine; //'\n';
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
            var arrBullet = teststepfortester.sBulleteChar.split(',');

            for (i = 0; i <= arrBullet.length - 1; i++) {
                while (sText.indexOf('>' + arrBullet[i] + '<span') != -1)
                    sText = sText.replace('>' + arrBullet[i] + '<span', '>* <span');

            }

            return sText;

        }


    },

    /*Code for sending mail to testmanager*/
    sendMail: function () {
        //subject Project name
        var testManagerMailId = teststepfortester.testManagerMailID;
        var mailSubject = 'Project Name:' + teststepfortester.PrjName;
        $("#txtTestManager").attr("href", "mailto:" + testManagerMailId + "?Subject=" + mailSubject);

    },

    popUpForExpected: function () {

        $('#expectedResultPreview').html($('#expectedResultWithImage').html());

        $('#clipBrdImageExpected').dialog({
            height: 550, width: 'auto', resizable: false, modal: true, buttons: {
                "Ok": function () {
                    $(this).dialog("close");
                }
            }
        });

        $('#expectedResultPreview').find('a').attr('target', '_blank');
        $('#expectedResultPreview').click(function () {
            $("#clipBrdImageExpected").height(600);
        });

    },

    popUpForActual: function () {

        $('#actualResultPreview').html($('#actualResultWithImage').html());
        teststepfortester.enableHyperlink('#actualResultPreview');

        $('#clipBrdImageActual').dialog({
            maxHeight: 550, width: 'auto', resizable: false, modal: true, buttons: {
                "Save": function () {
                    //alert('save');
                    //teststep.ExpectedResult = $('#expectedResultPreview').html();
                    $('#actualResultWithImage').html($('#actualResultPreview').html());
                    $(this).dialog("close");
                },

                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });

        $('#actualResultPreview').click(function () {
            $("#clipBrdImageActual").height(600);
        });

    },
    enableHyperlink: function (element) {
        $(element).find('a').mouseover(function (e) {
            $(element).attr('contentEditable', 'false');
            $(this).attr('title', $(this)[0].href);
        });
        $(element).find('a').mouseout(function (e) {
            $(element).attr('contentEditable', 'true');
        });
        $(element).find('a').each(function () {
            $(this).unbind('click');
            $(this).click(function () {
                window.open($(this)[0].href, '_blank');
                return false;
            });
        });

        /* to make img non-draggable */
        $('#actualResultPreview').mouseover(function (e) {
            $(this).bind('dragstart', function (event) { event.preventDefault(); });
        });
        /**/
        $('#actualResultPreview').click(function () {
            $("#clipBrdImageActual").height(600);
        });

    },

    /*Added by Mohini for Test step feedback Popup DT:28-05-2014*/
    testStepFeedbackPopup: function (msg) {
        $("#divAlert").html(msg);
        $('#divAlert').dialog({
            height: 170,
            resizable: false,
            title: teststepfortester.gConfigTestStep + " " + teststepfortester.gConfigFeedback,
            modal: true,
            buttons: {
                "Go to Feedback": function () {

                    var url = '/feedback?tsfd=1&key=' + teststepfortester.searchProjectKey + ',' + teststepfortester.searchTestPassKey + ',' + teststepfortester.searchRoleKey;
                    window.location.href = url;
                    $(this).dialog("close");
                },
                "Return to Home": function () {
                    window.location.href = '/Dashboard';
                }
            }

        });



    },
    testStepFeedbackPopupforTC: function (msg) {
        $("#divAlert").html(msg);
        $('#divAlert').dialog({
            height: 170,
            resizable: false,
            title: teststepfortester.gConfigTestStep + " " + teststepfortester.gConfigFeedback,
            modal: true,
            buttons: {
                "Continue Testing": function () {
                    if ($.inArray("1", teststepfortester.arrTStatus) != -1) {
                        if (teststepfortester.notCompletedTestSteps.length == 1)
                            teststepfortester.notCompletedStartIndexA = 0;
                    }

                    teststepfortester.fillNotCompletedGrid();
                    $(this).dialog("close");
                }
            }
        });
    }
    /*****************************************************************************/

}