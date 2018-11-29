/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

//Page Load Event

function CheckUrl() {
    var url
    if (window.location.href.toLowerCase() != '') {
        var arry = [];
        arry = window.location.href.split('/');
        if (arry.length > 0) {
            url = arry[arry.length - 1] == "" ? arry[arry.length - 2] : arry[arry.length - 1];
            return url;
        }

    }
}

function customPageLoad() {

    Main.showLoading();


    /*******Added by Mohini For resource file*********/
    if (resource.isConfig.toLowerCase() == 'true') {
        DashBoard.gConfigProject = resource.gPageSpecialTerms['Project'] == undefined ? 'Project' : resource.gPageSpecialTerms['Project'];

        DashBoard.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] == undefined ? 'Test Pass' : resource.gPageSpecialTerms['Test Pass'];

        DashBoard.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] == undefined ? 'Test Case' : resource.gPageSpecialTerms['Test Case'];

        DashBoard.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] == undefined ? 'Test Step' : resource.gPageSpecialTerms['Test Step'];

        DashBoard.gConfigTester = resource.gPageSpecialTerms['Tester'] == undefined ? 'Tester' : resource.gPageSpecialTerms['Tester'];

        DashBoard.gConfigAction = resource.gPageSpecialTerms['Action'] == undefined ? 'Action' : resource.gPageSpecialTerms['Action'];

        DashBoard.gConfigTemplate = resource.gPageSpecialTerms['Template'] == undefined ? 'Template' : resource.gPageSpecialTerms['Template'];

        DashBoard.gConfigStartDate = resource.gPageSpecialTerms['Start Date'] == undefined ? 'Start Date' : resource.gPageSpecialTerms['Start Date'];

        DashBoard.gConfigEndDate = resource.gPageSpecialTerms['End Date'] == undefined ? 'End Date' : resource.gPageSpecialTerms['End Date'];

        DashBoard.gConfigStatus = resource.gPageSpecialTerms['Status'] == undefined ? 'Status' : resource.gPageSpecialTerms['Status'];

        DashBoard.gConfigLead = resource.gPageSpecialTerms['Lead'] == undefined ? 'Lead' : resource.gPageSpecialTerms['Lead'];

        DashBoard.gConfigManager = resource.gPageSpecialTerms['Test Manager'] == undefined ? 'Test Manager' : resource.gPageSpecialTerms['Test Manager'];

        DashBoard.gConfigRole = resource.gPageSpecialTerms['Role'] == undefined ? 'Role' : resource.gPageSpecialTerms['Role'];

        DashBoard.gConfigSequence = resource.gPageSpecialTerms['Sequence'] == undefined ? 'Sequence' : resource.gPageSpecialTerms['Sequence'];

        DashBoard.gConfigExpectedResult = resource.gPageSpecialTerms['Expected Result'] == undefined ? 'Expected Result' : resource.gPageSpecialTerms['Expected Result'];

        DashBoard.gConfigActualresult = resource.gPageSpecialTerms['Actual Result'] == undefined ? 'Actual Result' : resource.gPageSpecialTerms['Actual Result'];

        DashBoard.gConfigActivity = resource.gPageSpecialTerms['Activities'] == undefined ? 'Activities' : resource.gPageSpecialTerms['Activities'];

        DashBoard.gConfigAnalysis = resource.gPageSpecialTerms['Analysis'] == undefined ? 'Analysis' : resource.gPageSpecialTerms['Analysis'];

        DashBoard.gConfigTriage = resource.gPageSpecialTerms['Triage'] == undefined ? 'Triage' : resource.gPageSpecialTerms['Triage'];

        DashBoard.gConfigArea = resource.gPageSpecialTerms['Area'] == undefined ? 'Area' : resource.gPageSpecialTerms['Area'];

        DashBoard.gConfigVersion = resource.gPageSpecialTerms['Version'] == undefined ? 'Version' : resource.gPageSpecialTerms['Version'];

        DashBoard.gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] == undefined ? 'Portfolio' : resource.gPageSpecialTerms['Portfolio'];

        DashBoard.gConfigGroup = resource.gPageSpecialTerms['Group'] == undefined ? 'Group' : resource.gPageSpecialTerms['Group'];

    }

    $('#onhovertextOfflinetesting').html('Offline Testing: Here User can download Testing template from UAT APP, execute ' + DashBoard.gConfigTestStep +
                    's and save its ' + DashBoard.gConfigStatus.toLowerCase() + ' in the download file. At the end upload the saved (with Testing '
                    + DashBoard.gConfigStatus.toLowerCase() + ') excel template in UAT APP.<br/>Click on the icon for  guidelines on how to ' +
                    'download and upload the Offline Testing Template.');

    $(".offtesting ").attr('title', $('#onhovertextOfflinetesting').html());

    $('.nc').attr('title', "Total number of " + DashBoard.gConfigTestStep + "s in 'Not Completed' state for this Test Activity.");

    $('.daysrm').attr('title', 'Number of days available to complete testing of this ' + DashBoard.gConfigTestPass + '.');

    $('#divAlert').attr('title', $('#pgHeading').text());

    $('#ddVersion').html('<option value="select">All ' + DashBoard.gConfigVersion + 's</option>');

    $('#ddPortfolio').html('<option value="select">Default ' + DashBoard.gConfigPortfolio + '</option>');

    $('#versionDD').html('<option value="select">Select ' + DashBoard.gConfigVersion + '</option>');

    $('#testPassDD').html('<option value="select">Select ' + DashBoard.gConfigTestPass + '</option>');


    if (isPortfolioOn) {
        $(".celebsWithPortfolio").show();

        $(".celebsMAWithPortfolio").show();

        $(".VersionDDWithPortfolio").show();

        $(".celebsWithoutPortfolio").remove();

        $(".celebsMAWithoutPortfolio").remove();

        $("#divTester").addClass("divTesterPortfolio");

        $("#divManager").addClass("divManagerPortfolio");

        //<<--Hover Over Text if portfolio Feature is enable: Added by Mohini 
        DashBoard.gDetailAnalysisTitle = 'To view Testing ' + DashBoard.gConfigStatus.toLowerCase() + ' of ' + DashBoard.gConfigProject + "s " + DashBoard.gConfigVersion + "s and " + DashBoard.gConfigTestPass + 'es ' +
                                     'as per ' + DashBoard.gConfigTester + 's assigned within it. ' + DashBoard.gConfigTestCase + ' statistics can be exported.';

        DashBoard.gTriageTitle = 'As per selected ' + DashBoard.gConfigProject + ', ' + DashBoard.gConfigVersion + ' and ' + DashBoard.gConfigTestPass + ', ' +
                              'redirects user to \'' + DashBoard.gConfigTriage + '\' page showing the list of all failed ' + DashBoard.gConfigTestStep + 's as per selection.';

        DashBoard.gNoOfTestTitle = 'As per selected ' + DashBoard.gConfigProject + ' and ' + DashBoard.gConfigVersion + ', area wise ' + DashBoard.gConfigTester + ' statistics as per ' + DashBoard.gConfigTester + '\'s participation in an excel file.';
        //End of Hover Over Text if portfolio Feature is enable
    }
    else {
        $(".celebsWithPortfolio").remove();

        $(".celebsMAWithPortfolio").remove();

        $(".VersionDDWithPortfolio").remove();

        $("#trPortfolio").remove();

        $("#trVersion").remove();

        $("#divManager").addClass("divManagerWithoutPortfolio");

        //<<--Hover Over Text if portfolio Feature is disable: Added by Mohini 
        DashBoard.gDetailAnalysisTitle = 'To view Testing ' + DashBoard.gConfigStatus.toLowerCase() + ' of ' + DashBoard.gConfigProject + 's and ' + DashBoard.gConfigTestPass + 'es ' +
                                     'as per ' + DashBoard.gConfigTester + 's assigned within it. ' + DashBoard.gConfigTestCase + ' statistics can be exported.';

        DashBoard.gTriageTitle = "As per selected " + DashBoard.gConfigProject + ' and ' + DashBoard.gConfigTestPass + ', ' +
                              "redirects user to 'Triage' page showing the list of all failed " + DashBoard.gConfigTestStep + 's as per selection.';

        DashBoard.gNoOfTestTitle = 'As per selected ' + DashBoard.gConfigProject + ', area wise ' + DashBoard.gConfigTester + ' statistics as per ' + DashBoard.gConfigTester + '\'s participation in an excel file.';
        //End of Hover Over Text if portfolio Feature is disable
    }

    DashBoard.isUserOtherThanTester = $.inArray("4", security.userType) == -1 ? true : false;

    if (!DashBoard.isUserOtherThanTester) {
        var arr = jQuery.grep(security.userType, function (a) {
            return a !== "4";
        });

        if (arr.length == 0)
            DashBoard.userOnlyTester = true;
    }

    //DashBoard.isUserOtherThanTester = false;  //need to change wcf (comment this)
    //DashBoard.userOnlyTester = true;

    Main.hideLoading();

    $('.tTipdash').betterTooltip();//added by Mohini for increasing the delay time of hover over text 

    if (DashBoard.userOnlyTester) {
        $(".divTesterPortfolio .dashboard").eq(1).attr("id", "divOnlyTester");

        $("#divTester .dashboard").eq(1).attr("id", "divOnlyTester");//For Bug id 11541 DT:04-04-2014
    }

    DashBoard.getDataFromService();
}

$(document).ready(function () {
});

//End of Page Load Event

function noActHandle() {
    $('#spanMA').html('<b>No ' + DashBoard.gConfigActivity + ' Assigned to you</b>');
}

//<-- Code written on ASPX page

var membersForinitPagination = new Array();

var membersForinitMAPagination = new Array();

function pageselectCallback(page_index, jq) {

    var items_per_page = 5;
    var max_elem = Math.min((page_index + 1) * items_per_page, membersForinitPagination.length);
    var newcontent = '';

    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {
        newcontent += membersForinitPagination[i];
    }

    // Replace old content with new content
    $('#Searchresult').empty().html(newcontent);

    var trGroupArr = new Array();
    $('#Searchresult tr').each(function () {

        if ($.inArray($(this).attr("group"), trGroupArr) == -1) {
            trGroupArr.push($(this).attr("group"));
        }

    });

    $.each(trGroupArr, function (ind, itm) {
        var cnt = 1;
        var len = $('tr[group="' + itm + '"]').length
        if (len > 1) {
            $('tr[group="' + itm + '"]').each(function () {
                if (cnt == 1) {
                    $(this).children().eq(0).attr("rowSpan", len);
                    cnt++;
                }
                else {
                    $(this).children().eq(0).remove();
                }
            });
        }

    });

    if (newcontent == "") {
        $('#myTestPassSummary').html('<h3 style="color: black; font-size: 12px; margin-left: 5px;font-weight:bold;">No ' + DashBoard.gConfigTestPass + ' Available</h3>');//Added by Mohini for Resource file
        $('#Pagination').hide();

    }

    // Prevent click event propagation
    return false;

}


function pageselectMACallback(page_index, jq) {

    var items_per_page = 5;

    var data = new Array();

    var max_elem = Math.min((page_index + 1) * items_per_page, membersForinitMAPagination.length);

    var data = membersForinitMAPagination;

    var markup = '';

    var j = 0;// for bug id-11953

    // Iterate through a selection of the content and build an HTML string
    for (var i = page_index * items_per_page; i < max_elem; i++) {

        var onUploadEvent = data[i]['onClickUpload'].replace("rowIndex", j);

        var onDownloadEvent = data[i]['onClickExport'].replace("rowIndex", j);

        var tdAction = "";

        if (parseInt(data[i]['DaysRemaining']) <= 0)
            tdAction = '<td class="myActLinkOrng">' + data[i]["Action"] + '</td>';
        else
            tdAction = '<td class="myActLinkOrng"><a style="color: #0033CC;cursor: pointer;text-decoration: underline;"  onclick="DashBoard.showTesterPageFun2(' + data[i]['onClickAction'] + ');" class="myActLinkOrng" >' + data[i]['Action'] + '</a></td>';

        if (isPortfolioOn) {
            markup += '<tr>' +
                     '<td title="' + data[i]['ProjectName'] + '">' + trimText(data[i]['ProjectName'], 7) + '</td>' +
                     '<td title="' + data[i]['Version'] + '">' + trimText(data[i]['Version'], 10) + '</td>' +
                     '<td title="' + data[i]['TestPassName'] + '">' + trimText(data[i]['TestPassName'], 7) + '</td>' +
                     '<td><span title="' + data[i]['Role'] + '">' + trimText(data[i]['Role'], 6) + '</span></td>' +
                     '<td>' + data[i]['DaysRemaining'] + '</td>' +
                     '<td class="NC">' + data[i]['NC'] + '</td>' +
                     '<td class="Pass">' + data[i]['Pass'] + '</td>' +
                     '<td class="Fail">' + data[i]['Fail'] + '</td>' +
                     tdAction +
                     '<td style="text-align:center"><img title="Download Testing Template" alt="" src="../images/icon-download-2.jpg" onclick="DashBoard.exportTemp(' + onDownloadEvent + ');" style="height:15px;padding-right:5px;margin-top:0px;cursor:pointer;" /><img title="Upload Testing Template" alt="" onclick="DashBoard.uploadTemp(' + onUploadEvent + ');" src="../images/icon-upload-2.jpg" style="height:15px;margin-top:5px;cursor:pointer" /></td>' +
                     '</tr>';
        }
        else {

            markup += '<tr>' +
                     '<td title="' + data[i]['ProjectName'] + '">' + trimText((data[i]['ProjectName']), 9) + '</td>' +
                     '<td style="display:none" title="' + data[i]['Version'] + '">' + trimText(data[i]['Version'], 10) + '</td>' +
                     '<td title="' + data[i]['TestPassName'] + '">' + trimText(data[i]['TestPassName'], 7) + '</td>' +
                     '<td><span title="' + data[i]['Role'] + '">' + trimText(data[i]['Role'], 6) + '</span></td>' +
                     '<td>' + data[i]['DaysRemaining'] + '</td>' +
                     '<td class="NC">' + data[i]['NC'] + '</td>' +
                     '<td class="Pass">' + data[i]['Pass'] + '</td>' +
                     '<td class="Fail">' + data[i]['Fail'] + '</td>' +
                     tdAction +
                     '<td style="text-align:center"><img title="Download Testing Template" alt="" src="./images/icon-download-2.jpg" onclick="DashBoard.exportTemp(' + onDownloadEvent + ');" style="height:15px;padding-right:5px;margin-top:0px;cursor:pointer;" /><img title="Upload Testing Template" alt="" onclick="DashBoard.uploadTemp(' + onUploadEvent + ');" src="./images/icon-upload-2.jpg" style="height:15px;margin-top:5px;cursor:pointer" /></td>' +
                     '</tr>';
        }

        j++;

    }

    // Replace old content with new content
    if (data.length == 0) {
        markup = '<h3 style="font-size: 12px; font-weight: bold; margin-top: 10px; margin-left: 0px;">There are no ' + DashBoard.gConfigActivity + ' assigned.</h3>';
        $('#spanMA').empty().html(markup);
        $("#MyActPagination").hide()
    }
    else {
        $('#myact').empty().html(markup);

        $('#celebsMA thead td').mouseover(function () {

            if ($(this).attr("class").indexOf("sorted") != -1 || $(this).attr('id') == "offLinetest")
                return;

            $(this).css('background-image', 'url("./images/Sorting.png")').css('background-size', "15px").css('background-repeat', "no-repeat").css('background-position', "90%");

        });
        $('#celebsMA thead td').mouseout(function () {

            if ($(this).attr("class").indexOf("sorted") != -1 || $(this).attr('id') == "offLinetest")
                return;

            $(this).css('background-image', 'none');

        });
    }
    // Prevent click event propagation
    return false;
}


//Initialisation function for pagination
function initPagination() {
    // count entries inside the hidden content
    membersForinitPagination = DashBoard.getAppActivity();
    var member = membersForinitPagination.length;

    $("#Pagination").pagination(member, {
        callback: pageselectCallback,
        items_per_page: 5,
        num_display_entries: 10,
        num: 2
    });
}


function initMAPagination() {

    if (!DashBoard.isUserOtherThanTester)//To check if the user is also a tester or only a tester
    {
        $("#divManager").empty();

        membersForinitMAPagination = DashBoard.getMyActivity();

        var member = membersForinitMAPagination.length;
        $("#MyActPagination").pagination(member, {
            callback: pageselectMACallback,
            items_per_page: 5,
            num_display_entries: 10,
            num: 2
        });

    }
    else//if the user is other than tester
    {
        $("#divTester").empty();

        $("#divManager").show();
    }
}

//UAT Feedback Function
function openUATFeedback() {

    /**************/
    $(".ms-dlgOverlay").hide();

    Main.showLoading();

    var interval = setInterval(
        function () {

            $(".ms-dlgOverlay").hide();

            $(".ms-dlgContent").hide();

            if ($(".ms-dlgTitle").text() == "Rate the UAT Dashboard - New Item") {
                $(".ms-dlgContent").show();

                $(".ms-dlgOverlay").show();

                Main.hideLoading();

                clearInterval(interval);
            }

        }, 10);
    /**************/

    var urlMain = _spPageContextInfo.webServerRelativeUrl;

    var options =
    {
        url: urlMain + "/Lists/Rate the UAT Dashboard/NewForm.aspx",
        allowMaximize: false,
        showClose: false,
        dialogReturnValueCallback: uatCallBackFromDialog
    };

    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
}

function uatCallBackFromDialog(result, value) {
    if (result == 1) {
    }
}
// Code written on ASPX page -->

var DashBoard = {

    //web service data collection variable
    dataCollection: new Array(),

    getTPStatusByTPID: new Array(),

    notCompletedCount: 0,

    dvg: new Array(),

    projectActivityItemsForCurrentUser: new Array(),

    flagForTP: 0,

    showTriageForTPID: new Array(),

    /*Download Upload Template variables*/
    RoleNameForRoleID: new Array(),

    ProjectNameForPID: new Array(),

    TPNameForTPID: new Array(),

    forTPIDGetManager: new Array(),

    forTPIDGetStartDate: new Array(),

    forTPIDGetEndDate: new Array(),

    forPIDGetStatus: [],

    forTPIDGetStatus: [],

    forTPSPRoleIDGetStatus: [],

    forTPIDGetTPName: [],

    forTPIDGetUserRole: [],

    getAllTPByPid: [],

    isUserOtherThanTester: false,

    getTPIdStatus: [],

    getPIdStatus: [],

    forTPIDGetTPStatus: [],

    /*End ofDownload Upload Template variables*/

    /*Portfolio Variables*/
    getVersionByPID: new Array(),

    gPortfolioProjects: new Array(),

    getAllVersionByProjName: new Array(),

    getAllVersionByPID: new Array(),

    getProjectNameByID: new Array(),

    gPortfolio: new Array(),

    getPIDStatusAsCount: new Array(),

    gAllProjectStatusCount: new Array(0, 0, 0),

    //isPortfolioOn:false,

    getGroupPortfolioByPID: new Array(),

    getPidByTestPass: new Array(),

    userOnlyTester: false,

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

    gConfigActivity: 'Activity',

    gConfigAnalysis: 'Analysis',

    gConfigTriage: 'Triage',

    gConfigArea: 'Area',

    gConfigVersion: 'Version',

    gConfigPortfolio: 'Portfolio',

    gConfigGroup: 'Group',

    //Hover Over Text,
    gDetailAnalysisTitle: '',

    gTriageTitle: '',

    gNoOfTestTitle: '',

    gGetRolesBySPID: new Array(),

    //Init Dashboard function	   
    initDashboardPage: function () {

        //$("#offLinetest").hide();//Remove this once the offline testing feature implemented

        $("ul li a:eq(0)").attr('class', 'selHeading');

        //fill Project DropDown List
        var opt = DashBoard.fillProjectDD();

        //If PORTFOLIO feature is on :Ejaz Waquif DT:1/27/2014
        var versionCount = 0;

        if (DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")] != undefined)
            versionCount = DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")].length;

        var versionMarkup = '';

        for (var i = 0; i < versionCount; i++) {
            versionMarkup += '<option value="' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["ProjectID"] + '">' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["Version"] + '</option>';
        }

        if (versionMarkup == "") {
            versionMarkup = "<option>Default " + DashBoard.gConfigVersion + "</option>";
        }

        $("#versionDD").html(versionMarkup);

        //If PORTFOLIO feature is on :Ejaz Waquif DT:1/27/2014   
        if (isPortfolioOn) {

            if (DashBoard.isUserOtherThanTester)
                $('#dd option:selected').val($('#ddVersion option:selected').val());
            else
                $('#dd option:selected').val($('#versionDD option:selected').val());

        }


        this.fillTestPass($('#dd option:selected').val());

        if ((window.location.href).indexOf("tpid") != -1)
            $('#testPassDD option[value="' + Main.getQuerystring('tpid') + '"]').attr('selected', 'selected');

        /*To calculate the status for project if the user is not a tester*/
        if (DashBoard.isUserOtherThanTester) {

            var totalPass = 0;
            var totalFail = 0;
            var totalNC = 0;

            if (DashBoard.getPIdStatus[$('#dd option:selected').val()] == undefined) {
                if (DashBoard.getAllTPByPid[$('#dd option:selected').val()] != undefined) {
                    $.each(DashBoard.getAllTPByPid[$('#dd option:selected').val()], function (ind, itm) {

                        var data = DashBoard.getTPStatusByTPID[itm.split(",")[0]].split(",");

                        if (data != undefined) {
                            totalPass += parseInt(data[0]);
                            totalFail += parseInt(data[1]);
                            totalNC += parseInt(data[2]);

                            DashBoard.getTPIdStatus[itm.split(",")[0]] = DashBoard.getPercentageByCount(data);
                        }
                        else
                            DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);

                    });

                    if (parseInt(totalPass + totalFail + totalNC) != 0) {
                        DashBoard.getPIdStatus[$('#dd option:selected').val()] = DashBoard.getPercentageByCount(new Array(totalPass, totalFail, totalNC));

                        DashBoard.getPIDStatusAsCount[$('#dd option:selected').val()] = new Array(totalPass, totalFail, totalNC);
                    }
                    else {
                        $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px' >No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file
                        $('#pieChartProject').hide();

                    }
                }
                else {
                    $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px'>No " + DashBoard.gConfigTestPass + " Available</b>");//Added by Mohini for Resource file
                    $('#pieChartProject').hide();
                }
            }


            if (DashBoard.getPIdStatus[$('#dd option:selected').val()] != undefined) {
                var projectStatus = DashBoard.getPIdStatus[$('#dd option:selected').val()];

                $('#noTestPases').css('display', 'none');

                $('#pieChartProject').show();

                $('#divDetailAnalysisLink').show();

                //Changed below to remove Completed status
                var onLoadplot = [$.gchart.series(projectStatus, ['green', 'orange', 'red'])];

                //Changed below to remove Completed status
                var d = 'Pass|NC|Fail';
                $('#pieChartProject').gchart({
                    type: '3dpie',
                    series: onLoadplot,
                    legend: 'right',
                    extension: { chdl: d },
                    titleColor: 'orange',
                    backgroundColor: 'white',
                    dataLabels: projectStatus
                });
                $('#pieChartProject').gchart('change', { series: onLoadplot, dataLabels: projectStatus });
            }

            var isNotUndefined = false;

            var total = 0;

            if (DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()] != undefined) {
                var tempArr = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                isNotUndefined = true;

                total = parseInt(tempArr[0]) + parseInt(tempArr[1]) + parseInt(tempArr[2]);

            }

            if (isNotUndefined && total != 0 && !isNaN(total)) {
                var pdata = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                $('#noTestCases').css('display', 'none');

                $('#pieChart').show();

                $('#divDetailAnalysisLink').show();

                var plot = [$.gchart.series(pdata, ['green', 'orange', 'red'])];

                var d = 'Pass|NC|Fail';

                $('#pieChart').gchart({
                    type: '3dpie',
                    series: plot,
                    legend: 'right',
                    extension: { chdl: d },
                    // title:'Status(in %)', 
                    titleColor: 'orange',
                    backgroundColor: 'white',
                    dataLabels: pdata
                });

                $('#pieChart').gchart('change', { series: plot, dataLabels: pdata });

                var pid = '';

                if (isPortfolioOn) {
                    if (DashBoard.isUserOtherThanTester) {
                        if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                            pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                        else
                            pid = $('#ddVersion').val();
                    }
                    else
                        pid = $('#versionDD').val();
                }
                else
                    pid = $('#dd').val();

                $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file

                if (pdata.length != 0 && pdata != undefined && pdata != null && isNaN(pdata[0]) != true) {
                    if (pdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                        $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                }

                var userAsso = new Array();

                if (security.userAssociationForProject[$("#dd").val()] != undefined)
                    userAsso = security.userAssociationForProject[$("#dd").val()];

                if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                    $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013//Added by Mohini for Resource file

                /* added by shilpa */
                if ($('#pieChart').is(':hidden'))
                    $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');

            }
            else {

                $('#noTestCases').css('display', 'block').html("<b style='margin-left:132px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                $('#pieChart').hide();

                DashBoard.bindDetailAnalysisData();

            }
        }
        else//For the user who is a tester or a tester too
        {

            var testPassId = $('#testPassDD option:selected').val();

            if (DashBoard.getTPIdStatus[testPassId] == undefined) {
                if (DashBoard.getTPStatusByTPID[testPassId] != undefined) {
                    var data = DashBoard.getTPStatusByTPID[testPassId].split(",");

                    DashBoard.getTPIdStatus[testPassId] = DashBoard.getPercentageByCount(data);
                }
                else
                    DashBoard.getTPIdStatus[testPassId] = new Array();
            }

            var onLoadpdata = DashBoard.getTPIdStatus[testPassId];

            if (onLoadpdata.length == 0 || onLoadpdata == undefined || onLoadpdata == null || isNaN(onLoadpdata[0]) == true) {

                $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                $('#pieChart').hide();

                DashBoard.bindDetailAnalysisData();

            }
            else {
                if (onLoadpdata[0] == 0 && onLoadpdata[1] == 0 && onLoadpdata[2] == 0) {
                    $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                    $('#pieChart').hide();

                    DashBoard.bindDetailAnalysisData();

                }
                else {
                    $('#noTestCases').css('display', 'none');

                    $('#pieChart').show();

                    $('#divDetailAnalysisLink').show();

                    //Changed below to remove Completed status
                    var onLoadplot = [$.gchart.series(onLoadpdata, ['green', 'orange', 'red'])];

                    //Changed below to remove Completed status
                    var d = 'Pass|Not completed|Fail';

                    $('#pieChart').gchart({
                        type: '3dpie',
                        series: onLoadplot,
                        legend: 'right',
                        extension: { chdl: d },
                        titleColor: 'orange',
                        backgroundColor: 'white',
                        dataLabels: onLoadpdata
                    });

                    $('#pieChart').gchart('change', { series: onLoadplot, dataLabels: onLoadpdata });

                    var pid = '';

                    if (isPortfolioOn) {
                        if (DashBoard.isUserOtherThanTester) {
                            if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                                pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                            else
                                pid = $('#ddVersion').val();
                        }
                        else
                            pid = $('#versionDD').val();
                    }
                    else
                        pid = $('#dd').val();


                    $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file

                    if (onLoadpdata.length != 0 && onLoadpdata != undefined && onLoadpdata != null && isNaN(onLoadpdata[0]) != true) {
                        if (onLoadpdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                            $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                    }

                    var userAsso = new Array();

                    if (security.userAssociationForProject[$("#dd").val()] != undefined)
                        userAsso = security.userAssociationForProject[$("#dd").val()];

                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013

                    /* added by shilpa */
                    if ($('#pieChart').is(':hidden'))
                        $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');
                }


            }


        }
        //End OnLoad Plot graph (Default)

        //Plot graph on Change event of Project List
        $('#dd').change(function (e) {

            //To let the version there even if the portfolio is disabled
            if (isPortfolioOn) {

                var versionCount = 0;

                if (DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")] != undefined)
                    versionCount = DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")].length;

                var versionMarkup = '';

                for (var i = 0; i < versionCount; i++) {
                    versionMarkup += '<option value="' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["ProjectID"] + '">' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["Version"] + '</option>';
                }

                $("#ddVersion").html(versionMarkup);
            }

            //If PORTFOLIO feature is on :Ejaz Waquif DT:1/27/2014
            if ((!DashBoard.isUserOtherThanTester))//For Tester view and Portfolio//isPortfolioOn
            {

                if (isPortfolioOn) {
                    var versionCount = 0;

                    if (DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")] != undefined)
                        versionCount = DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")].length;

                    var versionMarkup = '';

                    for (var i = 0; i < versionCount; i++) {
                        versionMarkup += '<option value="' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["ProjectID"] + '">' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["Version"] + '</option>';
                    }
                    $("#versionDD").html(versionMarkup);

                    DashBoard.fillTestPass($("#versionDD").val());
                }
                else
                    DashBoard.fillTestPass($("#dd").val());

            }//If PORTFOLIO feature is on :Ejaz Waquif DT:1/27/2014
            else if (DashBoard.isUserOtherThanTester) //For Manager view and Portfolio
            {
                if (isPortfolioOn) {

                    if ($('#dd option:selected').text() == "All " + DashBoard.gConfigProject + "s") {
                        $("#ddVersion").html('<option>All ' + DashBoard.gConfigVersion + 's</option>');//Added by Mohini for Resource file

                        DashBoard.generateAllProjectStatus();

                        return false;
                    }
                    else {
                        var versionCount = 0;

                        if (DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")] != undefined)
                            versionCount = DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")].length;

                        var versionMarkup = '';

                        for (var i = 0; i < versionCount; i++) {
                            versionMarkup += '<option value="' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["ProjectID"] + '">' + DashBoard.getAllVersionByProjName[$('#dd option:selected').attr("title")][i]["Version"] + '</option>';
                        }
                        if (versionCount > 1)
                            versionMarkup += '<option>All ' + DashBoard.gConfigVersion + 's</option>';//Added by Mohini for Resource file

                        $("#ddVersion").html(versionMarkup);
                    }
                    DashBoard.fillTestPass($("#ddVersion").val());
                }
                else
                    DashBoard.fillTestPass($("#dd").val());
            }
            else {
                DashBoard.fillTestPass(this.value);
            }
            /***To load the first version data***/
            if ($("#ddVersion").val() != undefined && $("#ddVersion").val() != "")
                $('#dd option:selected').val($("#ddVersion").val());

            else if ($("#versionDD").val() != undefined && $("#versionDD").val() != "")
                $('#dd option:selected').val($("#versionDD").val());
            /***To load the first version data***/

            if (DashBoard.isUserOtherThanTester) {

                var totalPass = 0;

                var totalFail = 0;

                var totalNC = 0;

                if (DashBoard.getPIdStatus[$('#dd option:selected').val()] == undefined) {
                    if (DashBoard.getAllTPByPid[$('#dd option:selected').val()] != undefined) {
                        $.each(DashBoard.getAllTPByPid[$('#dd option:selected').val()], function (ind, itm) {

                            var data = DashBoard.getTPStatusByTPID[itm.split(",")[0]].split(",");

                            if (data != undefined) {
                                totalPass += parseInt(data[0]);

                                totalFail += parseInt(data[1]);

                                totalNC += parseInt(data[2]);


                                DashBoard.getTPIdStatus[itm.split(",")[0]] = DashBoard.getPercentageByCount(data);
                            }
                            else
                                DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);


                        });

                        if (parseInt(totalPass + totalFail + totalNC) != 0) {
                            DashBoard.getPIdStatus[$('#dd option:selected').val()] = DashBoard.getPercentageByCount(new Array(totalPass, totalFail, totalNC));

                            DashBoard.getPIDStatusAsCount[$('#dd option:selected').val()] = new Array(totalPass, totalFail, totalNC);
                        }
                        else {
                            $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px' >No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                            $('#pieChartProject').hide();
                        }
                    }
                    else {
                        $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px'>No " + DashBoard.gConfigTestPass + " Available</b>");//Added by Mohini for Resource file

                        $('#pieChartProject').hide();
                    }
                }


                if (DashBoard.getPIdStatus[$('#dd option:selected').val()] != undefined) {
                    var projectStatus = DashBoard.getPIdStatus[$('#dd option:selected').val()];

                    $('#noTestPases').css('display', 'none');

                    $('#pieChartProject').show();

                    $('#divDetailAnalysisLink').show();

                    //Changed below to remove Completed status
                    var onLoadplot = [$.gchart.series(projectStatus, ['green', 'orange', 'red'])];

                    //Changed below to remove Completed status
                    var d = 'Pass|NC|Fail';

                    $('#pieChartProject').gchart({
                        type: '3dpie',
                        series: onLoadplot,
                        legend: 'right',
                        extension: { chdl: d },
                        // title:'Status(in %)', 
                        titleColor: 'orange',
                        backgroundColor: 'white',
                        dataLabels: projectStatus
                    });

                    $('#pieChartProject').gchart('change', { series: onLoadplot, dataLabels: projectStatus });
                }

                var isNotUndefined = false;

                var total = 0;

                if (DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()] != undefined) {
                    var tempArr = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                    isNotUndefined = true;

                    total = parseInt(tempArr[0]) + parseInt(tempArr[1]) + parseInt(tempArr[2]);

                }

                if (isNotUndefined && total != 0 && !isNaN(total)) {
                    var pdata = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                    $('#noTestCases').css('display', 'none');

                    $('#pieChart').show();

                    $('#divDetailAnalysisLink').show();

                    var plot = [$.gchart.series(pdata, ['green', 'orange', 'red'])];

                    var d = 'Pass|NC|Fail';

                    $('#pieChart').gchart({
                        type: '3dpie',
                        series: plot,
                        legend: 'right',
                        extension: { chdl: d },
                        // title:'Status(in %)', 
                        titleColor: 'orange',
                        backgroundColor: 'white',
                        dataLabels: pdata
                    });

                    $('#pieChart').gchart('change', { series: plot, dataLabels: pdata });

                    var pid = '';

                    if (isPortfolioOn) {
                        if (DashBoard.isUserOtherThanTester) {
                            if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                                pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                            else
                                pid = $('#ddVersion').val();
                        }
                        else
                            pid = $('#versionDD').val();
                    }
                    else
                        pid = $('#dd').val();


                    $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file

                    if (pdata.length != 0 && pdata != undefined && pdata != null && isNaN(pdata[0]) != true) {
                        if (pdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                            $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                    }

                    var userAsso = new Array();

                    if (security.userAssociationForProject[$("#dd").val()] != undefined)
                        userAsso = security.userAssociationForProject[$("#dd").val()];

                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013

                    /* added by shilpa */
                    if ($('#pieChart').is(':hidden'))
                        $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');

                }
                else {
                    $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                    $('#pieChart').hide();

                    DashBoard.bindDetailAnalysisData();



                }
            }
            else {
                var testPassId = $('#testPassDD option:selected').val();

                if (DashBoard.getTPIdStatus[testPassId] == undefined) {
                    if (DashBoard.getTPStatusByTPID[testPassId] != undefined) {
                        var data = DashBoard.getTPStatusByTPID[testPassId].split(",");

                        DashBoard.getTPIdStatus[testPassId] = DashBoard.getPercentageByCount(data);
                    }
                    else
                        DashBoard.getTPIdStatus[testPassId] = new Array();
                }

                var pdata = DashBoard.getTPIdStatus[testPassId];

                if (pdata.length == 0 || pdata == undefined || pdata == null || isNaN(pdata[0]) == true) {
                    $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                    $('#pieChart').hide();

                    DashBoard.bindDetailAnalysisData();

                }
                else {
                    if (pdata[0] == 0 && pdata[1] == 0 && pdata[2] == 0) {
                        $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                        $('#pieChart').hide();

                        DashBoard.bindDetailAnalysisData();

                    }
                    else {
                        $('#noTestCases').css('display', 'none');

                        $('#pieChart').show();

                        $('#divDetailAnalysisLink').show();

                        var plot = [$.gchart.series(pdata, ['green', 'orange', 'red'])];

                        var d = 'Pass|Not completed|Fail';

                        $('#pieChart').gchart({
                            type: '3dpie',
                            series: plot,
                            legend: 'right',
                            extension: { chdl: d },
                            titleColor: 'orange',
                            backgroundColor: 'white',
                            dataLabels: pdata
                        });

                        $('#pieChart').gchart('change', { series: plot, dataLabels: pdata });

                    }
                }

                var pid = '';

                if (isPortfolioOn) {
                    if (DashBoard.isUserOtherThanTester) {
                        if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                            pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                        else
                            pid = $('#ddVersion').val();
                    }
                    else
                        pid = $('#versionDD').val();
                }
                else
                    pid = $('#dd').val();

                $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file

                if (pdata.length != 0 && pdata != undefined && pdata != null && isNaN(pdata[0]) != true) {
                    if (pdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                        $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                }

                var userAsso = new Array();

                var onlyTester = false;

                if (security.userAssociationForProject[$("#dd").val()] != undefined)
                    userAsso = security.userAssociationForProject[$("#dd").val()];

                if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1) {
                    $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013//Added by Mohini for Resource file
                }
                else
                    onlyTester = true;

                /* added by shilpa */
                if ($('#pieChart').is(':hidden'))
                    $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');

            }

            $('.tTipdetailed').betterTooltip();//added by Mohini for increasing the delay time of hover over text	

            //If the testing status panel contains only one button then set the "No Test step" message margin :Ejaz Waquif DT:5/12/2014
            DashBoard.ChangeDivAanalysisBtnMargin();

        });
        //End Plot graph on Change event of Project List


        if (isPortfolioOn)//onchange functions if Portfolio is Enabled :Ejaz Waquif DT:5/9/2014 
        {
            $("#versionDD").change(function () {

                DashBoard.fillTestPass(this.value);

                if (DashBoard.isUserOtherThanTester) {
                    var totalPass = 0;

                    var totalFail = 0;

                    var totalNC = 0;

                    if (DashBoard.getPIdStatus[this.value] == undefined) {
                        if (DashBoard.getAllTPByPid[this.value] != undefined) {
                            $.each(DashBoard.getAllTPByPid[this.value], function (ind, itm) {

                                var data = DashBoard.getTPStatusByTPID[itm.split(",")[0]].split(",");

                                if (data != undefined) {
                                    totalPass += parseInt(data[0]);

                                    totalFail += parseInt(data[1]);

                                    totalNC += parseInt(data[2]);

                                    DashBoard.getTPIdStatus[itm.split(",")[0]] = DashBoard.getPercentageByCount(data);
                                }
                                else
                                    DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);


                            });

                            if (parseInt(totalPass + totalFail + totalNC) != 0) {
                                DashBoard.getPIdStatus[$('#dd option:selected').val()] = DashBoard.getPercentageByCount(new Array(totalPass, totalFail, totalNC));

                                DashBoard.getPIDStatusAsCount[$('#dd option:selected').val()] = new Array(totalPass, totalFail, totalNC);
                            }
                            else {
                                $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px' >No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                                $('#pieChartProject').hide();
                            }
                        }
                        else {
                            $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px'>No " + DashBoard.gConfigTestPass + " Available</b>");//Added by Mohini for Resource file

                            $('#pieChartProject').hide();
                        }
                    }


                    if (DashBoard.getPIdStatus[this.value] != undefined) {
                        var projectStatus = DashBoard.getPIdStatus[this.value];

                        $('#noTestPases').css('display', 'none');

                        $('#pieChartProject').show();

                        $('#divDetailAnalysisLink').show();

                        //Changed below to remove Completed status
                        var onLoadplot = [$.gchart.series(projectStatus, ['green', 'orange', 'red'])];

                        //Changed below to remove Completed status
                        var d = 'Pass|NC|Fail';

                        $('#pieChartProject').gchart({
                            type: '3dpie',
                            series: onLoadplot,
                            legend: 'right',
                            extension: { chdl: d },
                            // title:'Status(in %)', 
                            titleColor: 'orange',
                            backgroundColor: 'white',
                            dataLabels: projectStatus
                        });

                        $('#pieChartProject').gchart('change', { series: onLoadplot, dataLabels: projectStatus });
                    }

                    var isNotUndefined = false;

                    var total = 0;

                    if (DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()] != undefined) {
                        var tempArr = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                        isNotUndefined = true;

                        total = parseInt(tempArr[0]) + parseInt(tempArr[1]) + parseInt(tempArr[2]);

                    }

                    if (isNotUndefined && total != 0 && !isNaN(total)) {
                        var pdata = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                        $('#noTestCases').css('display', 'none');

                        $('#pieChart').show();

                        $('#divDetailAnalysisLink').show();

                        var plot = [$.gchart.series(pdata, ['green', 'orange', 'red'])];

                        var d = 'Pass|NC|Fail';

                        $('#pieChart').gchart({
                            type: '3dpie',
                            series: plot,
                            legend: 'right',
                            extension: { chdl: d },
                            titleColor: 'orange',
                            backgroundColor: 'white',
                            dataLabels: pdata
                        });

                        $('#pieChart').gchart('change', { series: plot, dataLabels: pdata });

                        var pid = '';

                        if (isPortfolioOn) {
                            if (DashBoard.isUserOtherThanTester) {
                                if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                                    pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                                else
                                    pid = $('#ddVersion').val();
                            }
                            else
                                pid = $('#versionDD').val();
                        }
                        else
                            pid = $('#dd').val();

                        $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file

                        if (pdata.length != 0 && pdata != undefined && pdata != null && isNaN(pdata[0]) != true) {
                            if (pdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                                $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                        }

                        var userAsso = new Array();

                        if (security.userAssociationForProject[$("#dd").val()] != undefined)
                            userAsso = security.userAssociationForProject[$("#dd").val()];

                        if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                            $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013

                        /* added by shilpa */
                        if ($('#pieChart').is(':hidden'))
                            $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');

                    }
                    else {
                        $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                        $('#pieChart').hide();

                        DashBoard.bindDetailAnalysisData();
                    }
                }
                else {
                    var testPassId = $('#testPassDD option:selected').val();

                    if (DashBoard.getTPIdStatus[testPassId] == undefined) {
                        if (DashBoard.getTPStatusByTPID[testPassId] != undefined) {
                            var data = DashBoard.getTPStatusByTPID[testPassId].split(",");

                            DashBoard.getTPIdStatus[testPassId] = DashBoard.getPercentageByCount(data);
                        }
                        else
                            DashBoard.getTPIdStatus[testPassId] = new Array();
                    }

                    var pdata = DashBoard.getTPIdStatus[testPassId];

                    if (pdata.length == 0 || pdata == undefined || pdata == null || isNaN(pdata[0]) == true) {
                        $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                        $('#pieChart').hide();

                        DashBoard.bindDetailAnalysisData();

                    }
                    else {
                        if (pdata[0] == 0 && pdata[1] == 0 && pdata[2] == 0) {
                            $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                            $('#pieChart').hide();

                            DashBoard.bindDetailAnalysisData();

                        }
                        else {
                            $('#noTestCases').css('display', 'none');

                            $('#pieChart').show();

                            $('#divDetailAnalysisLink').show();

                            var plot = [$.gchart.series(pdata, ['green', 'orange', 'red'])];

                            var d = 'Pass|Not completed|Fail';

                            $('#pieChart').gchart({
                                type: '3dpie',
                                series: plot,
                                legend: 'right',
                                extension: { chdl: d },
                                // title:'Status(in %)', 
                                titleColor: 'orange',
                                backgroundColor: 'white',
                                dataLabels: pdata
                            });

                            $('#pieChart').gchart('change', { series: plot, dataLabels: pdata });

                        }
                    }

                    var pid = '';

                    if (isPortfolioOn) {
                        if (DashBoard.isUserOtherThanTester) {
                            if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                                pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                            else
                                pid = $('#ddVersion').val();
                        }
                        else
                            pid = $('#versionDD').val();
                    }
                    else
                        pid = $('#dd').val();

                    $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file

                    if (pdata.length != 0 && pdata != undefined && pdata != null && isNaN(pdata[0]) != true) {
                        if (pdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                            $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                    }

                    var userAsso = new Array();

                    if (security.userAssociationForProject[$("#dd").val()] != undefined)
                        userAsso = security.userAssociationForProject[$("#dd").val()];

                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013//Added by Mohini for Resource file

                    /* added by shilpa */
                    if ($('#pieChart').is(':hidden'))
                        $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');


                }

                $('.tTipdetailed').betterTooltip();//added by Mohini for increasing the delay time of hover over text

                //If the testing status panel contains only one button then set the "No Test step" message margin :Ejaz Waquif DT:5/12/2014
                DashBoard.ChangeDivAanalysisBtnMargin();

            });


            $("#ddPortfolio").change(function () {

                var projLen = DashBoard.gPortfolioProjects[$("#ddPortfolio").val()].length;

                var projMarkup = '';

                for (var i = 0; i < projLen; i++) {
                    var projectName = DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"].length < 40 ? DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"] : DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"].slice(0, 40) + "...";

                    projMarkup += '<option title="' + DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"] + '" value="' + DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectID"] + '">' + projectName + '</option>';
                }
                if (projLen > 1)
                    projMarkup += '<option>All ' + DashBoard.gConfigProject + 's</option>';//Added by Mohini for Resource file

                $('#dd').html(projMarkup);

                $('#dd').change();

                if ($("#dd option:selected").text() == "All " + DashBoard.gConfigProject + "s")//Added by Mohini for Resource file
                {
                    $("#ddVersion").html('<option>All ' + DashBoard.gConfigVersion + 's</option>');//Added by Mohini for Resource file
                }
                else {
                    var versionLen = 0;

                    if (DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")] != undefined)
                        versionLen = DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")].length;

                    var verMarkup = '';

                    for (var j = 0; j < versionLen; j++) {
                        verMarkup += "<option value='" + DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")][j]["ProjectID"] + "'>" + DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")][j]["Version"] + "</option>"
                    }

                    if (versionLen > 1)
                        verMarkup += '<option >All ' + DashBoard.gConfigVersion + 's</option>';//Added by Mohini for Resource file

                    if (verMarkup == "")
                        verMarkup = "<option>Default " + DashBoard.gConfigVersion + "</option>";

                    $("#ddVersion").html(verMarkup);
                }
            });

            $("#ddVersion").change(function () {


                DashBoard.fillTestPass($("#ddVersion").val());//Fill the first project test Pass even if All Version OPtion is selected

                var totalPass = 0;

                var totalFail = 0;

                var totalNC = 0;

                var AllVersionTestPassMarkup = '';

                if ($(this).val() == "All " + DashBoard.gConfigVersion + "s")//<<--------(2)//Added by Mohini for Resource file
                {
                    var totalCount = new Array(0, 0, 0);

                    $("#ddVersion option").each(function () {

                        if ($(this).val() != "All " + DashBoard.gConfigVersion + "s")//Added by Mohini for Resource file
                        {

                            if (DashBoard.getPIDStatusAsCount[$(this).val()] == undefined) {
                                if (DashBoard.getAllTPByPid[$(this).val()] == undefined) {
                                    DashBoard.fillTestPass($(this).val());

                                }

                                if (DashBoard.getAllTPByPid[$(this).val()] != undefined) {
                                    $.each(DashBoard.getAllTPByPid[$(this).val()], function (ind, itm) {

                                        //To bind all the version Test Pass in Test Pass DD
                                        AllVersionTestPassMarkup += '<option title="' + itm.split(",")[1] + '" value="' + itm.split(",")[0] + '">' + itm.split(",")[1] + '</option>';

                                        var data = DashBoard.getTPStatusByTPID[itm.split(",")[0]].split(",");

                                        if (data != undefined) {
                                            totalPass += parseInt(data[0]);

                                            totalFail += parseInt(data[1]);

                                            totalNC += parseInt(data[2]);

                                            DashBoard.getTPIdStatus[itm.split(",")[0]] = DashBoard.getPercentageByCount(data);
                                        }
                                        else
                                            DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);


                                    });

                                    if (parseInt(totalPass + totalFail + totalNC) != 0) {

                                        DashBoard.getPIdStatus[$(this).val()] = DashBoard.getPercentageByCount(new Array(totalPass, totalFail, totalNC));

                                        DashBoard.getPIDStatusAsCount[$(this).val()] = new Array(totalPass, totalFail, totalNC);

                                        totalCount[0] += totalPass;

                                        totalCount[1] += totalFail;

                                        totalCount[2] += totalNC;

                                    }
                                    else {
                                        $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px' >No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file

                                        $('#pieChartProject').hide();
                                    }


                                }

                            }
                            else {

                                totalCount[0] += DashBoard.getPIDStatusAsCount[$(this).val()][0];

                                totalCount[1] += DashBoard.getPIDStatusAsCount[$(this).val()][1];

                                totalCount[2] += DashBoard.getPIDStatusAsCount[$(this).val()][2];

                                $.each(DashBoard.getAllTPByPid[$(this).val()], function (ind, itm) {
                                    //To bind all the version Test Pass in Test Pass DD
                                    AllVersionTestPassMarkup += '<option title="' + itm.split(",")[1] + '" value="' + itm.split(",")[0] + '">' + itm.split(",")[1] + '</option>';
                                });

                            }
                        }


                    });

                    if (totalCount[0] + totalCount[1] + totalCount[2] != 0) {
                        var projectStatus = DashBoard.getPercentageByCount(totalCount);

                        $('#noTestPases').css('display', 'none');

                        $('#pieChartProject').show();

                        $('#divDetailAnalysisLink').show();

                        //Changed below to remove Completed status
                        var onLoadplot = [$.gchart.series(projectStatus, ['green', 'orange', 'red'])];

                        //Changed below to remove Completed status
                        var d = 'Pass|NC|Fail';
                        $('#pieChartProject').gchart({
                            type: '3dpie',
                            series: onLoadplot,
                            legend: 'right',
                            extension: { chdl: d },
                            // title:'Status(in %)', 
                            titleColor: 'orange',
                            backgroundColor: 'white',
                            dataLabels: projectStatus
                        });
                        $('#pieChartProject').gchart('change', { series: onLoadplot, dataLabels: projectStatus });

                        //$("#testPassDD").html( AllVersionTestPassMarkup );
                        //$("#testPassDD").change();
                    }
                    //To remove the No of Tester Tab if All Versions Are selected
                    $("#TesterCount").remove();
                    if (AllVersionTestPassMarkup == '') {
                        $("#testPassDD").html("<option>No " + DashBoard.gConfigTestPass + " Available</option>");//Added by Mohini for Resource file
                    }
                    else {
                        $("#testPassDD").html(AllVersionTestPassMarkup);
                        $("#testPassDD").change();
                    }



                }//(2)--------->>
                else//<<--------(1)
                {


                    if (DashBoard.getPIdStatus[$(this).val()] == undefined) {
                        if (DashBoard.getAllTPByPid[$(this).val()] != undefined) {
                            $.each(DashBoard.getAllTPByPid[$(this).val()], function (ind, itm) {

                                //var data = DashBoard.calcProjectStatus(itm.split(",")[0] , itm.split(",")[1] , 1);

                                var data = DashBoard.getTPStatusByTPID[itm.split(",")[0]].split(",");

                                if (data != undefined) {
                                    totalPass += parseInt(data[0]);
                                    totalFail += parseInt(data[1]);
                                    totalNC += parseInt(data[2]);

                                    DashBoard.getTPIdStatus[itm.split(",")[0]] = DashBoard.getPercentageByCount(data);
                                }
                                else
                                    DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);


                            });

                            if (parseInt(totalPass + totalFail + totalNC) != 0) {
                                DashBoard.getPIdStatus[$(this).val()] = DashBoard.getPercentageByCount(new Array(totalPass, totalFail, totalNC));
                                DashBoard.getPIDStatusAsCount[$(this).val()] = new Array(totalPass, totalFail, totalNC);
                            }
                            else {
                                $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px' >No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file
                                $('#pieChartProject').hide();
                            }
                        }
                        else {
                            $('#noTestPases').css('display', 'block').html("<b style ='margin-left:5px'>No " + DashBoard.gConfigTestPass + " Available</b>");//Added by Mohini for Resource file
                            $('#pieChartProject').hide();
                        }
                    }


                    if (DashBoard.getPIdStatus[$(this).val()] != undefined) {
                        var projectStatus = DashBoard.getPIdStatus[$(this).val()];

                        $('#noTestPases').css('display', 'none');
                        $('#pieChartProject').show();
                        $('#divDetailAnalysisLink').show();

                        //Changed below to remove Completed status
                        var onLoadplot = [$.gchart.series(projectStatus, ['green', 'orange', 'red'])];

                        //Changed below to remove Completed status
                        var d = 'Pass|NC|Fail';
                        $('#pieChartProject').gchart({
                            type: '3dpie',
                            series: onLoadplot,
                            legend: 'right',
                            extension: { chdl: d },
                            // title:'Status(in %)', 
                            titleColor: 'orange',
                            backgroundColor: 'white',
                            dataLabels: projectStatus
                        });
                        $('#pieChartProject').gchart('change', { series: onLoadplot, dataLabels: projectStatus });
                    }

                    var isNotUndefined = false;
                    var total = 0;
                    if (DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()] != undefined) {
                        var tempArr = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];
                        isNotUndefined = true;
                        total = parseInt(tempArr[0]) + parseInt(tempArr[1]) + parseInt(tempArr[2]);

                    }

                    if (isNotUndefined && total != 0 && !isNaN(total)) {
                        var pdata = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];

                        $('#noTestCases').css('display', 'none');
                        $('#pieChart').show();
                        $('#divDetailAnalysisLink').show();

                        var plot = [$.gchart.series(pdata, ['green', 'orange', 'red'])];
                        var d = 'Pass|NC|Fail';
                        $('#pieChart').gchart({
                            type: '3dpie',
                            series: plot,
                            legend: 'right',
                            extension: { chdl: d },
                            titleColor: 'orange',
                            backgroundColor: 'white',
                            dataLabels: pdata
                        });
                        $('#pieChart').gchart('change', { series: plot, dataLabels: pdata });

                        var pid = '';

                        if (isPortfolioOn) {
                            if (DashBoard.isUserOtherThanTester) {
                                if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                                    pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                                else
                                    pid = $('#ddVersion').val();
                            }
                            else
                                pid = $('#versionDD').val();
                        }
                        else
                            pid = $('#dd').val();


                        $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file
                        if (pdata.length != 0 && pdata != undefined && pdata != null && isNaN(pdata[0]) != true) {
                            if (pdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                                $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
                        }
                        var userAsso = new Array();
                        if (security.userAssociationForProject[$("#dd").val()] != undefined)
                            userAsso = security.userAssociationForProject[$("#dd").val()];
                        if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                            $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013

                        /* added by shilpa */
                        if ($('#pieChart').is(':hidden'))
                            $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');

                    }
                    else {
                        $('#noTestCases').css('display', 'block').html("<b style='margin-left:130px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file
                        $('#pieChart').hide();
                        //$('#divDetailAnalysisLink').hide();
                        DashBoard.bindDetailAnalysisData();


                    }
                    $('.tTipdetailed').betterTooltip();//For delay in hover over text Added by Mohini DT:28-04-2014
                }//(1)----------->>

                //If the testing status panel contains only one button then set the "No Test step" message margin :Ejaz Waquif DT:5/12/2014
                DashBoard.ChangeDivAanalysisBtnMargin();

            });
        }//End of onchange functions if Portfolio is Enabled :Ejaz Waquif DT:5/9/2014    


        //Plot graph on Change event of Test Pass DropDown List
        $('#testPassDD').change(function (e) {



            if (DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()] != undefined) {
                var npdata = DashBoard.getTPIdStatus[$('#testPassDD option:selected').val()];
            }
            else {
                //var npdata = DashBoard.calcProjectStata($('#testPassDD option:selected').val(),$('#testPassDD option:selected').text(),1);
                var testPassId = $('#testPassDD option:selected').val();

                if (DashBoard.getTPIdStatus[testPassId] == undefined) {
                    if (DashBoard.getTPStatusByTPID[testPassId] != undefined) {
                        var data = DashBoard.getTPStatusByTPID[testPassId].split(",");

                        DashBoard.getTPIdStatus[testPassId] = DashBoard.getPercentageByCount(data);
                    }
                    else
                        DashBoard.getTPIdStatus[testPassId] = new Array();
                }

                var npdata = DashBoard.getTPIdStatus[testPassId];
            }

            if (npdata.length == 0 || npdata == undefined || npdata == null || isNaN(npdata[0]) == true) {
                $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file
                $('#pieChart').hide();
                //$('#divDetailAnalysisLink').hide();
                DashBoard.bindDetailAnalysisData();

            }
            else {
                if (npdata[0] == 0 && npdata[1] == 0 && npdata[2] == 0) {
                    $('#noTestCases').css('display', 'block').html("<b style='margin-left:5px'>No " + DashBoard.gConfigTestStep + "s Available</b>");//Added by Mohini for Resource file
                    $('#pieChart').hide();
                    //$('#divDetailAnalysisLink').hide();
                    DashBoard.bindDetailAnalysisData();

                }
                else {
                    $('#noTestCases').css('display', 'none');
                    $('#pieChart').show();
                    $('#divDetailAnalysisLink').show();
                    var nplot = [$.gchart.series(npdata, ['green', 'orange', 'red'])];
                    var d = 'Pass|NC|Fail';
                    $('#pieChart').gchart({
                        type: '3dpie',
                        series: nplot,
                        legend: 'right',
                        extension: { chdl: d },
                        titleColor: 'orange',
                        backgroundColor: 'white',
                        dataLabels: npdata
                    });
                    $('#pieChart').gchart('change', { series: nplot, dataLabels: npdata });
                }
            }

            var pid = '';

            if (isPortfolioOn) {
                if (DashBoard.isUserOtherThanTester) {
                    if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's') {
                        //pid = DashBoard.getPidByTestPass[ $('#testPassDD option:selected').attr("title") ][0];
                        pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                    }
                    else
                        pid = $('#ddVersion').val();
                }
                else
                    pid = $('#versionDD').val();
            }
            else
                pid = $('#dd').val();


            $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file
            if (npdata.length != 0 && npdata != undefined && npdata != null && isNaN(npdata[0]) != true) {
                if (npdata[2] != "0" && DashBoard.showTriageForTPID[$('#testPassDD option:selected').val()] == "Yes")
                    $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gTriageTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" href="Triage?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">' + DashBoard.gConfigTriage + '</a></b> ');//Added by Mohini for Resource file	
            }

            var userAsso = new Array();

            if (isPortfolioOn && $("#dd option:selected").val() == "All Projects") {
                if (security.userAssociationForProject[$("#dd option").eq(0).val()] != undefined)
                    userAsso = security.userAssociationForProject[$("#dd option").eq(0).val()];
            }
            else {
                if (security.userAssociationForProject[$("#dd").val()] != undefined)
                    userAsso = security.userAssociationForProject[$("#dd").val()];
            }

            if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013


            /* added by shilpa */
            if ($('#pieChart').is(':hidden'))
                $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');


            $('.tTipdetailed').betterTooltip();//added by Mohini for increasing the delay time of hover over text

            if (isPortfolioOn) {
                if ($("#ddVersion").val() == "All " + DashBoard.gConfigVersion + "s")//<<--------(2)//Added by Mohini for Resource file
                {
                    $("#TesterCount").remove();
                }
            }

            //If the testing status panel contains only one button then set the "No Test step" message margin :Ejaz Waquif DT:5/12/2014
            DashBoard.ChangeDivAanalysisBtnMargin();

        });

        $('.tTipdetailed').betterTooltip();//added by Mohini for increasing the delay time of hover over text


        if ((window.location.href).indexOf("pid") != -1) {

            var pid = Main.getQuerystring('pid');


            var isfound = false;

            if (isPortfolioOn) {
                if (DashBoard.isUserOtherThanTester) {
                    if (DashBoard.getGroupPortfolioByPID[pid] != undefined)
                        var portfolio = DashBoard.getGroupPortfolioByPID[pid][0].split('`')[1];

                    $('#ddPortfolio option[title="' + portfolio + '"]').attr('selected', 'selected');
                    $('#ddPortfolio').change();

                    if (DashBoard.getProjectNameByID[pid] != undefined)
                        var projName = DashBoard.getProjectNameByID[pid][0];

                    $('#dd option[title="' + projName + '"]').attr('selected', 'selected');
                    $('#dd').change();
                    $('#ddVersion option[value="' + pid + '"]').attr('selected', 'selected');
                    $('#ddVersion').change();
                }
                else {
                    if ($("#dd option[value='" + pid + "']").length == 0) {
                        if (DashBoard.getProjectNameByID[pid] != undefined)
                            var projName = DashBoard.getProjectNameByID[pid][0];

                        $('#dd option[title="' + projName + '"]').attr('selected', 'selected');
                        $('#dd').change();
                        $('#versionDD option[value="' + pid + '"]').attr('selected', 'selected');
                        $('#versionDD').change();
                    }
                    else {
                        $('#dd option[value="' + pid + '"]').attr('selected', 'selected');
                        $('#dd').change();
                    }
                }
            }
            else {
                $('#dd option[value="' + pid + '"]').attr('selected', 'selected');
                $('#dd').change();

            }

        }

        //If the testing status panel contains only one button then set the "No Test step" message margin :Ejaz Waquif DT:5/12/2014
        DashBoard.ChangeDivAanalysisBtnMargin();



    },
    /*for filling Test Pass and Tester dropdown list information*/
    fillTestPass: function (projectID) {
        $('#testPassDD').empty();
        var noTPFlag = 0;
        //var passList = jP.Lists.setSPObject(Main.getSiteUrl(),'TestPass');
        //if(DashBoard.TPIDsforProject[projectID] != undefined)
        //{
        /*testPassIds = DashBoard.TPIDsforProject[projectID].split(",");
        var q = '';
        //var camlQuery2 = '<Query><Where>';
        var camlQuery2 = '<Query><OrderBy Override="TRUE"><FieldRef Name="ID" /></OrderBy><Where>';//speed enhancement
        for(var i=0;i<(testPassIds.length)-1;i++)			 
        {
            camlQuery2 +='<Or><Eq><FieldRef Name="ID" /><Value Type="Text">'+testPassIds[i]+'</Value></Eq>';
            q += '</Or>'	
        }	
        camlQuery2 += '<Eq><FieldRef Name="ID"/><Value Type="Text">'+testPassIds[i]+'</Value></Eq>';
        if(q != '')
            camlQuery2 += q;
        //camlQuery2 +='</Where><ViewFields></ViewFields></Query>';
        camlQuery2 +='</Where></Query>';
        //for speed enhancement
        camlQuery2 +='<ViewFields><FieldRef Name="ID"/><FieldRef Name="TestPassName"/></ViewFields><RowLimit Paged="TRUE">2147483647</RowLimit><Aggregations Value="Off"/>';
        
        var passItems = passList.getSPItemsWithQuery(camlQuery2).Items;
        */

        var passItems = DashBoard.getAllTPByPid[projectID];

        if ((passItems != 'undefined') && (passItems != null)) {
            $('#pieChart').show();

            DashBoard.flagForTP = 1;  // Added by shilpa for bug 6521

            var pass = '';

            var dTemp = '';

            //var tempArr = new Array();

            var tpId = '';

            for (var x = 0; x < passItems.length; x++) {

                tpFullName = passItems[x].split(",")[1];

                pass = passItems[x].split(",")[1];

                pass = (pass == null || pass == 'undefined') ? '-' : pass;

                tpId = passItems[x].split(",")[0];

                //tempArr.push(passItems[x]['ID']+","+pass);

                if (DashBoard.isUserOtherThanTester)
                    pass = pass.length < 40 ? pass : pass.slice(0, 40) + "...";
                else
                    pass = pass.length < 35 ? pass : pass.slice(0, 35) + "...";

                dTemp = '<option title="' + tpFullName + '" value="' + tpId + '">' + pass + '</option>';

                $('#testPassDD').append(dTemp);

                DashBoard.getPidByTestPass[tpFullName] = new Array();
                DashBoard.getPidByTestPass[tpFullName].push(tpId);

            }
            noTPFlag = 1;
        }

        //DashBoard.getAllTPByPid[ projectID ] = tempArr;

        //}
        if (noTPFlag == 0) {
            var dTemp = '<option value="0">No ' + DashBoard.gConfigTestPass + ' Available</option>';//Added by Mohini for Resource file
            $('#testPassDD').append(dTemp);

            if (DashBoard.flagForTP == 0 && DashBoard.testPassPresentFlag == 0) // Added by shilpa for bug 6521
            {
                //$('#myTestPassSummary').html('<h3 style="color: black; font-size: 12px; margin-left: 5px;font-weight:bold;">No ' + DashBoard.gConfigTestPass + ' Available</h3>');//Added by Mohini for Resource file
                //$('#Pagination').hide();
                //$("#ddVersion").html('<option>No Version</option>');
                //$("#versionDD").html('<option>No Version</option>');


                //Code modified for Project-Version changes [Task ID 11745 ] :Ejaz Waquif DT:5/12/2014
                //$("#ddVersion").html('<option>Default ' +DashBoard.gConfigVersion+'</option>');
                //$("#versionDD").html('<option>Default ' +DashBoard.gConfigVersion+'</option>');


            }
        }
    },

    /*For filling up Project drop down*/
    fillProjectDD: function () {


        $('#dd').empty();

        var temp = '';

        var projectName = '';

        var projectDD = new Array();

        var projectList = '';

        var projectQuery = '';

        var projectItems = '';

        projectItems = DashBoard.sortJSON(DashBoard.projectActivityItemsForCurrentUser, "ID", "asc");

        var tempProjName = new Array();

        var tempAllVersionByProjName = new Array();

        if ((projectItems != 'undefined') && (projectItems != null) && projectItems.length > 0) {
            for (var i = 0; i < projectItems.length ; i++) {
                projectID = projectItems[i].projectId;

                if (projectItems[i].projectName != undefined && projectItems[i].projectName != "") {

                    if (DashBoard.isUserOtherThanTester)
                        projectName = projectItems[i].projectName.length < 40 ? projectItems[i].projectName : projectItems[i].projectName.slice(0, 40) + "...";
                    else
                        projectName = projectItems[i].projectName.length < 32 ? projectItems[i].projectName : projectItems[i].projectName.slice(0, 32) + "...";
                }
                else
                    projectName = '-';

                temp = '<option title="' + projectItems[i].projectName + '" value="' + projectID + '">' + projectName + '</option>';

                projectDD.push(temp);

                //To push the Project name by ID
                DashBoard.getProjectNameByID[projectItems[i].projectId] = new Array();

                DashBoard.getProjectNameByID[projectItems[i].projectId].push(projectItems[i].projectName);


                if (isPortfolioOn) {
                    if ($.inArray(projectItems[i].projectName, tempProjName) == -1) {

                        tempProjName.push(projectItems[i].projectName);

                        //Code modified for Project-Version changes [Task ID 11745 ] :Ejaz Waquif DT:5/12/2014
                        var version = projectItems[i].projectVersion == "" || projectItems[i].projectVersion == null || projectItems[i].projectVersion == undefined ? "Default " + DashBoard.gConfigVersion : projectItems[i].projectVersion;

                        DashBoard.getAllVersionByProjName[projectItems[i].projectName] = new Array();
                        DashBoard.getAllVersionByProjName[projectItems[i].projectName].push({
                            "Version": version,
                            "ProjectID": projectItems[i].projectId

                        });

                        //To push the unique version values for each project
                        tempAllVersionByProjName[projectItems[i].projectName] = new Array();

                        tempAllVersionByProjName[projectItems[i].projectName].push(version);

                        $('#dd').append(temp);


                    }
                    else {

                        var version = projectItems[i].projectVersion == "" || projectItems[i].projectVersion == null || projectItems[i].projectVersion == undefined ? "Default " + DashBoard.gConfigVersion : projectItems[i].projectVersion;//Added by Mohini for Resource file
                        if ($.inArray(version, tempAllVersionByProjName[projectItems[i].projectName]) == -1) {

                            DashBoard.getAllVersionByProjName[projectItems[i].projectName].push({
                                "Version": version,
                                "ProjectID": projectItems[i].projectId

                            });

                            tempAllVersionByProjName[projectItems[i].projectName].push(version);
                        }

                    }
                }
                else {
                    if ($.inArray(projectItems[i].projectName, tempProjName) == -1) {
                        $('#dd').append(temp);

                        tempProjName.push(projectItems[i].projectName);
                    }


                }

            }

            if (DashBoard.isUserOtherThanTester && isPortfolioOn)// 
            {
                var projLen = DashBoard.gPortfolioProjects[$("#ddPortfolio").val()].length;
                var projMarkup = '';

                for (var i = 0; i < projLen; i++) {
                    var projectName = DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"].length < 40 ? DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"] : DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"].slice(0, 40) + "...";
                    projMarkup += '<option title="' + DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectName"] + '" value="' + DashBoard.gPortfolioProjects[$("#ddPortfolio").val()][i]["ProjectID"] + '">' + projectName + '</option>';
                }
                if (projLen > 1)
                    projMarkup += '<option>All ' + DashBoard.gConfigProject + 's</option>';//Added by Mohini for Resource file

                $('#dd').html(projMarkup);

                var versionLen = 0;
                if (DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")] != undefined)
                    versionLen = DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")].length;

                var verMarkup = '';


                for (var j = 0; j < versionLen; j++) {
                    verMarkup += "<option value='" + DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")][j]["ProjectID"] + "'>" + DashBoard.getAllVersionByProjName[$("#dd option:selected").attr("title")][j]["Version"] + "</option>"
                }
                if (versionLen > 1)
                    verMarkup += '<option >All ' + DashBoard.gConfigVersion + 's</option>';//Added by Mohini for Resource file

                if (verMarkup == "")
                    verMarkup = "<option>Default " + DashBoard.gConfigVersion + "</option>";

                $("#ddVersion").html(verMarkup);


            }
            /*
            else
            {
                
                var versionLen = 0;
                if(DashBoard.getAllVersionByProjName[ $("#dd option:selected").attr("title")] != undefined)
                    versionLen = DashBoard.getAllVersionByProjName[ $("#dd option:selected").attr("title")].length;

                var verMarkup = '';
                
                
                for(var j=0;j<versionLen;j++)
                {
                    verMarkup += "<option value='"+DashBoard.getAllVersionByProjName[ $("#dd option:selected").attr("title")][j]["ProjectID"]+"'>"+DashBoard.getAllVersionByProjName[ $("#dd option:selected").attr("title")][j]["Version"]+"</option>"
                }
                
                if(verMarkup =="")
                    verMarkup = "<option>No "+DashBoard.gConfigVersion+"</option>";
                    
                $("#ddVersion").html(verMarkup);
                
            
            
            }
            */
        }
        else /* Added by shilpa */ {
            $('#dd').html('<option value="0">No ' + DashBoard.gConfigProject + ' Available</option>');//Added by Mohini for Resource file
            $('#spanMA').html('<h3 class="h3DbDa" style="margin-left:5px">There are no ' + DashBoard.gConfigActivity + ' assigned.</h3>');//Added by Mohini for Resource file
            $('#divMyActivity').html('<h3 class="h3DbDa" style="margin-left:5px">There are no ' + DashBoard.gConfigProject + 's available.</h3>');//Added by Mohini for Resource file
            $('#myTestPassSummary').html('<h3 class="h3DbDa" style="margin-left:5px">There are no ' + DashBoard.gConfigTestPass + 'es available.</h3>');//Added by Mohini for Resource file
            $('#MyActPagination').hide();
            $('#Pagination').hide();
            $('#Pagination1').hide();
            if (isPortfolioOn) {
                //$("#ddVersion").html('<option>No '+DashBoard.gConfigVersion+'</option>');
                //$("#versionDD").html('<option>No '+DashBoard.gConfigVersion+'</option>');

                //Code modified for Project-Version changes [Task ID 11745 ] :Ejaz Waquif DT:5/12/2014
                $("#ddVersion").html('<option>Default ' + DashBoard.gConfigVersion + '</option>');
                $("#versionDD").html('<option>Default ' + DashBoard.gConfigVersion + '</option>');

            }

        }
        return projectDD;
    },

    getPercentageByCount: function (Arr) {

        var data0 = new Array();
        var data1 = new Array();
        var role = new Array();
        var countPass = parseInt(Arr[0]);
        var countFail = parseInt(Arr[1]);
        var countNC = parseInt(Arr[2]);
        var temp = 0;
        var total = 0;
        var ffflag = 0;


        total = countPass + countFail + countNC;

        //code updated on 14 March by sheetal to validate total value not exceed 100 and are not less than 100
        var flagPassRounded = false;
        var flagFailRounded = false;
        var flagNCRounded = false;
        var temp1, temp2, temp3;
        temp1 = ((countPass / total) * 100).toFixed(0);

        if (((countPass / total) * 100) != temp1)
            flagPassRounded = true;

        data1.push(countPass);

        temp2 = ((countNC / total) * 100).toFixed(0);

        if (((countNC / total) * 100) != temp2)
            flagNCRounded = true;

        data1.push(countNC);

        temp3 = ((countFail / total) * 100).toFixed(0);

        if (((countFail / total) * 100) != temp3)
            flagFailRounded = true;

        if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) > 100) {
            if (flagPassRounded)
                temp1 = Math.floor((countPass / total) * 100);
            else if (flagFailRounded)
                temp3 = Math.floor((countFail / total) * 100);
            else if (flagNCRounded)
                temp2 = Math.floor((countNC / total) * 100);
        }
        else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) < 100) {
            if (flagPassRounded)
                temp1 = Math.ceil((countPass / total) * 100);
            else if (flagFailRounded)
                temp3 = Math.ceil((countFail / total) * 100);
            else if (flagNCRounded)
                temp2 = Math.ceil((countNC / total) * 100);
        }

        data0.push(temp1);
        data0.push(temp2);
        data0.push(temp3);


        return data0;

    },

    getMyActivity: function () {

        //var MyActivityResult = ServiceLayer.GetData("GetTesterData",12);

        var MyActivityResult = DashBoard.getActivityData();

        var MyActivityGridBuffer = new Array();

        //var tempTestPassIdArr = new Array();
        var tempTesterArr = new Array();


        var flag = 1;

        if ($("ul li a:eq(7)").is(":hidden") == true)
            flag = 1;
        else
            flag = 0;

        if (MyActivityResult != null && MyActivityResult != undefined) {

            for (var pp = 0; pp < MyActivityResult.length; pp++) {

                var testPassID = MyActivityResult[pp].testpassId;

                /*if( $.inArray( testPassID, tempTestPassIdArr ) != -1)
				{
					continue;
				}
				
				tempTestPassIdArr.push( testPassID );*/

                //Code modified by Shrutika M. on 11/12/2014 to distinguish user using testerId

                var testerID = MyActivityResult[pp].testerId;

                if ($.inArray(testerID, tempTesterArr) != -1) {
                    continue;
                }

                tempTesterArr.push(testerID);

                var projectName = MyActivityResult[pp].projectName;

                var testPassName = MyActivityResult[pp].testpassName;

                var projectID = MyActivityResult[pp].projectId;

                var role = MyActivityResult[pp].role;

                var roleID = MyActivityResult[pp].roleId;

                var testManager = MyActivityResult[pp].testManagerAlias;

                var testerSPUserID = MyActivityResult[pp].testerId;

                //var daysRemaining = MyActivityResult[pp].daysRemain < 0 ? 0 : parseInt(MyActivityResult[pp].daysRemain)+1;

                var daysRemaining = MyActivityResult[pp].daysRemain;

                /*Fill all the required fields in an Array in order to apply sorting on them :Ejaz Waquif DT 12/19/2013 */
                MyActivityGridBuffer.push({

                    "ProjectName": projectName,
                    "TestPassName": testPassName,
                    "onClickTP": testPassID + ',' + projectID + ',' + roleID,
                    "TestManager": testManager,
                    "Role": role,
                    "DaysRemaining": daysRemaining,
                    "NC": parseInt(MyActivityResult[pp].ntCompletedCount) + parseInt(MyActivityResult[pp].pendingCount),
                    "Pass": MyActivityResult[pp].passCount,
                    "Fail": MyActivityResult[pp].failcount,
                    "Action": MyActivityResult[pp].action,
                    "onClickAction": testPassID + ',' + projectID + ',' + roleID + ',' + flag,
                    "onClickExport": projectID + ',' + testPassID + ',' + roleID + ',' + testerSPUserID + ",rowIndex",
                    "onClickUpload": projectID + ',' + testPassID + ',' + roleID + ',' + "rowIndex," + testerSPUserID,
                    "RoleID": roleID,
                    "EndDTPassed": MyActivityResult[pp].tpEndDtPassed,
                    "Version": MyActivityResult[pp].projectVersion

                });

            }

        }
        else {
            $('#spanMA').html('<h3 class="h3DbDa" style="margin-left:5px">There are no ' + DashBoard.gConfigActivity + ' assigned.</h3>');//Added by Mohini for Resource file

            $('#MyActPagination').hide();
        }

        MyActivityGridBuffer = DashBoard.sortJSON(MyActivityGridBuffer, "DaysRemaining", 'desc');

        return MyActivityGridBuffer;


    },

    showTesterPageFun2: function (id, projectId, roleIdd, flag) {
        Main.deletecookie("TesterPageState");
        window.location.href = '/Dashboard/Tester?keyVal=' + id + ',' + projectId + ',' + roleIdd + ',' + flag + ''; 
        
    },

    testPassPresentFlag: 0,

    TPIDsforProject: new Array(),

    getPIdByTPID: new Array(),

    //pull all activity information for activity stream
    getAppActivity: function () {

        var arr = new Array();

        var str = '';

        var projectActivityItems = new Array();

        var testPassItems = new Array();

        var SPUserID = _spUserId;

        var ArrIndex = 0;

        var projectActivityItems = DashBoard.dataCollection;

        if (projectActivityItems != null && projectActivityItems != undefined) {

            DashBoard.projectActivityItemsForCurrentUser = projectActivityItems;

            var tempProjArr = new Array();

            var tempPortfolioArr = new Array();

            var portfolioDDMarkup = '';

            var ProjectSummaryTblMarkup = '';

            var tempGroupArr = new Array();

            var IndexCount = 0;

            var IsDefaultPortfolioPresent = false;

            var uniqueTestPassId = new Array();

            DashBoard.gPortfolioProjects["Default Portfolio"] = new Array();


            for (var i = 0; i < projectActivityItems.length; i++) {

                var projectID = projectActivityItems[i].projectId;

                var version = projectActivityItems[i].projectVersion == "" || projectActivityItems[i].projectVersion == undefined || projectActivityItems[i].projectVersion == null ? "Default " + DashBoard.gConfigVersion : projectActivityItems[i].projectVersion;

                var projectStatus = projectActivityItems[i].projectStatus;

                var projectStartDate = projectActivityItems[i].projectStartDate;

                var projectEndDate = projectActivityItems[i].projectEndDate;

                var testPassName = projectActivityItems[i].testpassName;

                var testpassID = projectActivityItems[i].testpassId;

                var group = projectActivityItems[i].groupName;

                var portfolio = projectActivityItems[i].portfolio;

                var testPassStatus = projectActivityItems[i].tpStatus;

                var testPassStartDate = projectActivityItems[i].tpStartDate;

                var testPassEndDate = projectActivityItems[i].tpEndDate;

                var testManager = projectActivityItems[i].testManagerAlias == "" || projectActivityItems[i].testManagerAlias == null || projectActivityItems[i].testManagerAlias == undefined ? "-" : projectActivityItems[i].testManagerAlias;

                var projectLead = projectActivityItems[i].projectLeadAlias;

                var passCount = projectActivityItems[i].passCount;

                var failCount = projectActivityItems[i].failcount;

                var ncCount = parseInt(projectActivityItems[i].ntCompletedCount) + parseInt(projectActivityItems[i].pendingCount);

                //Fill the global arrays to use them afterwards

                /////////////////////////added by Mangesh for project Status Validation
                if (projectID != undefined && projectID != null && projectID != -1 && projectID != "") {
                    if (DashBoard.forPIDGetStatus[projectID] == undefined) {
                        DashBoard.forPIDGetStatus[projectID] = new Array();

                        DashBoard.forPIDGetStatus[projectID].push(
                        {
                            "projectStatus": projectStatus,
                            "projectStartDate": projectStartDate,
                            "projectEndDate": projectEndDate
                        }
                        );
                    }

                    /*else
                    {							
                        DashBoard.forPIDGetStatus[projectID].push(
                        {
                            "projectStatus":projectStatus,
                            "projectStartDate":,projectStartDate,
                            "projectEndDate":projectEndDate	
                        }
                        );
                    }
                    */
                }

                /////////////////////////


                if (testpassID != undefined && testpassID != null && testpassID != -1 && testpassID != "") {
                    //<--To get all Test Pass by Project Id
                    if (DashBoard.getAllTPByPid[projectID] == undefined) {
                        DashBoard.getAllTPByPid[projectID] = new Array();

                        DashBoard.getAllTPByPid[projectID].push(testpassID + "," + testPassName);
                    }
                    else {
                        if ($.inArray(testpassID + "," + testPassName, DashBoard.getAllTPByPid[projectID]) == -1)
                            DashBoard.getAllTPByPid[projectID].push(testpassID + "," + testPassName);
                    }

                    //End of To get all Test Pass by Project Id -->


                    //<--To get the Test Pass Status By Test Pass Id
                    if (DashBoard.getTPStatusByTPID[testpassID] == undefined) {
                        DashBoard.getTPStatusByTPID[testpassID] = new Array();

                        DashBoard.getTPStatusByTPID[testpassID] = passCount + "," + failCount + "," + ncCount;
                    }
                    else {
                        var tempArr = DashBoard.getTPStatusByTPID[testpassID].split(",");

                        var passNew = parseInt(tempArr[0]) + parseInt(passCount);

                        var failNew = parseInt(tempArr[1]) + parseInt(failCount);

                        var ntCompNew = parseInt(tempArr[2]) + parseInt(ncCount);

                        DashBoard.getTPStatusByTPID[testpassID] = passNew + "," + failNew + "," + ntCompNew;
                    }
                    //End To get the Test Pass Status By Test Pass Id -->
                    DashBoard.forTPIDGetStartDate[testpassID] = testPassStartDate;

                    DashBoard.forTPIDGetEndDate[testpassID] = testPassEndDate;

                    DashBoard.forTPIDGetTPStatus[testpassID] = testPassStatus;

                    //To get the Start and End date and Status by TPID


                    //End of To get the Start and End date and Status by TPID

                    //<--To get the projectId By Test Pass Id
                    if (DashBoard.getPIdByTPID[testpassID] == undefined) {
                        DashBoard.getPIdByTPID[testpassID] = new Array();

                        DashBoard.getPIdByTPID[testpassID] = projectID;
                    }



                }

                DashBoard.getVersionByPID[projectActivityItems[i].projectId] = projectActivityItems[i].projectVersion == "" || projectActivityItems[i].projectVersion == undefined || projectActivityItems[i].projectVersion == null ? "Default " + DashBoard.gConfigVersion : projectActivityItems[i].projectVersion;//Added by Mohini for Resource file

                /*IF PORTFOLIO feature is on :Ejaz Waquif DT:1/28/2014*/
                if ($.inArray(projectActivityItems[i].portfolio, DashBoard.gPortfolio) == -1 && projectActivityItems[i].portfolio != undefined && projectActivityItems[i].portfolio != "") {
                    DashBoard.gPortfolio.push(projectActivityItems[i].portfolio);
                    portfolioDDMarkup += "<option title='" + projectActivityItems[i].portfolio + "'>" + projectActivityItems[i].portfolio + "</option>";
                }

                if ($.inArray(projectActivityItems[i].projectName, tempProjArr) == -1)//<<---------2
                {
                    tempProjArr.push(projectActivityItems[i].projectName);

                    if (projectActivityItems[i].portfolio != undefined && projectActivityItems[i].portfolio != "") {
                        if ($.inArray(projectActivityItems[i].portfolio, tempPortfolioArr) == -1)//<<---------1 
                        {
                            tempPortfolioArr.push(projectActivityItems[i].portfolio);

                            DashBoard.gPortfolioProjects[projectActivityItems[i].portfolio] = new Array();

                            DashBoard.gPortfolioProjects[projectActivityItems[i].portfolio].push({
                                "ProjectName": projectActivityItems[i].projectName,
                                "ProjectID": projectActivityItems[i].projectId

                            });

                        }
                        else {

                            DashBoard.gPortfolioProjects[projectActivityItems[i].portfolio].push({
                                "ProjectName": projectActivityItems[i].projectName,
                                "ProjectID": projectActivityItems[i].projectId

                            });



                        }//1------>>
                    }
                    else {
                        DashBoard.gPortfolioProjects["Default Portfolio"].push({
                            "ProjectName": projectActivityItems[i].projectName,
                            "ProjectID": projectActivityItems[i].projectId

                        });
                        IsDefaultPortfolioPresent = true;

                    }


                }//2------>>

                // To push group and portfolio in golobal arr
                var groupName = projectActivityItems[i].groupName == undefined || projectActivityItems[i].groupName == "" || projectActivityItems[i].groupName == null ? "Default Group" : projectActivityItems[i].groupName;

                var portfolioName = projectActivityItems[i].portfolio == undefined || projectActivityItems[i].portfolio == "" || projectActivityItems[i].portfolio == null ? "Default Portfolio" : projectActivityItems[i].portfolio;

                if (DashBoard.getGroupPortfolioByPID[projectActivityItems[i].projectId] == undefined) {
                    DashBoard.getGroupPortfolioByPID[projectActivityItems[i].projectId] = new Array();
                    DashBoard.getGroupPortfolioByPID[projectActivityItems[i].projectId].push(groupName + "`" + portfolioName);
                }
                else {
                    if ($.inArray(groupName + "`" + portfolioName, DashBoard.getGroupPortfolioByPID[projectActivityItems[i].projectId]) == -1)
                        DashBoard.getGroupPortfolioByPID[projectActivityItems[i].projectId].push(groupName + "`" + portfolioName);
                }


                //To restrict the Empty or repeat Test pass Entry in "Project and Test Pass Summary" section | Ejaz Waquif DT:11/11/2014
                if (testPassName == "" || testPassName == undefined || testPassName == null || $.inArray(testpassID, uniqueTestPassId) != -1) {
                    continue;
                }

                uniqueTestPassId.push(testpassID);

                str = '';

                if (isPortfolioOn)
                    projectName = (projectActivityItems[i].projectName.length < 20) ? ('' + projectActivityItems[i].projectName) : ('' + projectActivityItems[i].projectName.slice(0, 20) + '...');
                else
                    projectName = (projectActivityItems[i].projectName.length < 20) ? ('' + projectActivityItems[i].projectName) : ('' + projectActivityItems[i].projectName.slice(0, 20) + '...');

                var projectFullName = projectActivityItems[i].projectName;


                var userAssoc = new Array();
                if (security.userAssociationForProject[projectID] != undefined)
                    userAssoc = security.userAssociationForProject[projectID];

                //Portfolio
                if (isPortfolioOn) {

                    str += '<tr group="' + groupName + '">';

                    str += '<td title="' + groupName + '">' + trimText(groupName, 12) + '</td>';

                    str += '<td title="' + portfolioName + '">' + trimText(portfolioName, 12) + '</td>';

                    //if($.inArray('1',security.userType)!= -1 || $.inArray('2',userAssoc)!= -1 || ($.inArray('3',userAssoc)!= -1 && testPassItems[i1]['SPUserID'] == _spUserId.toString()) || $.inArray('5',userAssoc)!= -1)//Modified for Stakeholder
                    if ($.inArray('1', security.userType) != -1 || $.inArray('2', userAssoc) != -1 || ($.inArray('3', userAssoc) != -1) || $.inArray('5', userAssoc) != -1)//Modified for Stakeholder
                        str += '<td title="' + projectFullName + '"><a target="_blank" href=' + Main.getSiteUrl() + '/ProjectMgnt?pid=' + projectID + '&edit=1' + '>' + projectName + '</a></td>';
                    else
                        str += '<td title="' + projectFullName + '">' + projectName + '</td>';

                    str += '<td title="' + version + '">' + trimText(version, 10) + '</td>';

                    if ($.inArray('1', security.userType) != -1 || $.inArray('2', userAssoc) != -1 || ($.inArray('3', userAssoc) != -1) || $.inArray('5', userAssoc) != -1)//Modified for Stakeholder
                    {
                        str += '<td title="' + testPassName + '"><a target="_blank" href=' + Main.getSiteUrl() + '/TestPassMgnt?pid=' + projectID + '&tpid=' + testpassID + '&edit=1' + '>' + trimText(testPassName, 28) + '</a></td>'; //Code modified by Rajiv on 23 feb 2012

                        DashBoard.showTriageForTPID[testpassID] = "Yes";
                    }
                    else//User is only Tester to the Project
                    {
                        str += '<td title="' + testPassName + '">' + trimText(testPassName, 28) + '</td>'; //Code modified by Rajiv on 23 feb 2012	 

                        DashBoard.showTriageForTPID[testpassID] = "No";
                    }

                    str += '<td title="' + testManager + '" >' + trimText(testManager, 17) + '</td>';

                    str += '<td class="center">' + testPassStatus + '</td>';

                    str += '<td >' + testPassStartDate + '</td>';

                    str += '<td >' + testPassEndDate + '</td>';

                    str += '</tr>';

                }
                else {

                    str += '<tr>';

                    if ($.inArray('1', security.userType) != -1 || $.inArray('2', userAssoc) != -1 || ($.inArray('3', userAssoc) != -1) || $.inArray('5', userAssoc) != -1)//Modified for Stakeholder
                        str += '<td title="' + projectFullName + '"><a target="_blank" href=' + Main.getSiteUrl() + '/Dashboard/ProjectMgnt?pid=' + projectID + '&edit=1' + '>' + projectName + '</a></td>';
                    else
                        str += '<td title="' + projectFullName + '">' + projectName + '</td>';

                    str += '<td title="' + projectLead + '">' + trimText(projectLead, 20) + '</td>';

                    str += '<td >' + projectEndDate + '</td>';

                    if ($.inArray('1', security.userType) != -1 || $.inArray('2', userAssoc) != -1 || ($.inArray('3', userAssoc) != -1) || $.inArray('5', userAssoc) != -1)//Modified for Stakeholder
                    {
                        str += '<td title="' + testPassName + '"><a target="_blank" href=/TestPass?pid=' + projectID + '&tpid=' + testpassID + '&edit=1' + '>' + trimText(testPassName, 28) + '</a></td>'; //Code modified by Rajiv on 23 feb 2012

                        DashBoard.showTriageForTPID[testpassID] = "Yes";
                    }
                    else//User is only Tester to the Project
                    {
                        str += '<td title="' + testPassName + '">' + trimText(testPassName, 32) + '</td>'; //Code modified by Rajiv on 23 feb 2012	 

                        DashBoard.showTriageForTPID[testpassID] = "No";
                    }

                    str += '<td title="' + testManager + '" >' + trimText(testManager, 17) + '</td>';

                    str += '<td >' + testPassEndDate + '</td>';

                    str += '<td class="center">' + testPassStatus + '</td>';

                    str += '</tr>';

                }

                arr.push(str);

                ArrIndex++;

            }

            /*IF PORTFOLIO feature is on :Ejaz Waquif DT:1/28/2014*/
            if (isPortfolioOn) {
                var prependInPortfolioDDMarkup = '';
                if (IsDefaultPortfolioPresent) {
                    prependInPortfolioDDMarkup = "<option title='Default Portfolio'>Default Portfolio</option>";
                }

                $("#ddPortfolio").html(prependInPortfolioDDMarkup + portfolioDDMarkup);

                if (prependInPortfolioDDMarkup == "" && portfolioDDMarkup == "") {
                    $("#ddPortfolio").html("<option title='Default Portfolio'>Default Portfolio</option>");
                }


            }

        }

        return arr;

    },


    showTesterPageFun1: function (id, testPassName) {
        Main.deletecookie("TesterPageState");
        window.location.href = Main.getSiteUrl() + '/Dashboard/Tester?keyVal=' + id + '>' + testPassName + '';

    },

    getUser: function () {
        var thisUserAccount = $().SPServices.SPGetCurrentUser({ fieldName: "Name", debug: false });
        return thisUserAccount;

    },
    dmlOperation: function (search, list) {
        var listname = jP.Lists.setSPObject(Main.getSiteUrl(), list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        return (result);
    },

    ////////////////////////////   Added on 27 Sep 2013 for downloding and uploading Testing template  /////////////////////////////////
    filterData: function (info2) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        if (navigator.appName == "Microsoft Internet Explorer")
            info2 = mydiv.innerText;
        else
            info2 = mydiv.textContent;
        return info2;
    },
    uploadTemp: function (pId, tPId, rID, rowindex, testerSPID) {

        ///////////// Added by Mangesh for validation for project
        //validation
        var dueDate = DashBoard.forPIDGetStatus[pId][0].projectEndDate;

        var sliceDate = dueDate.slice(0, 10);

        sliceDate = sliceDate.split("-");

        var DueDate = sliceDate[0] + '/' + sliceDate[1] + '/' + sliceDate[2];

        var objDueDate = new Date(DueDate);

        objDueDate.setHours("23");

        objDueDate.setMinutes("59");

        objDueDate.setSeconds("59");

        var CreateDate = DashBoard.forPIDGetStatus[pId][0].projectStartDate;

        var sliceDate2 = CreateDate.slice(0, 10);

        sliceDate2 = sliceDate2.split("-");

        var CreateDate = sliceDate2[0] + '/' + sliceDate2[1] + '/' + sliceDate2[2];

        var objCreateDate = new Date(CreateDate);

        var currentDate = new Date();

        var PStatus = '';

        PStatus = DashBoard.forPIDGetStatus[pId][0].projectStatus;
        if (PStatus == 'C' || PStatus == 'O') {
            var status = '';

            if (PStatus == 'C')
                status = 'Complete';
            else
                status = 'On Hold';

            DashBoard.alertBox1('This ' + DashBoard.gConfigProject + ' has been given ' + status + ' ' + DashBoard.gConfigStatus.toLowerCase() + ' by ' + DashBoard.gConfigLead + ' .You can not start testing on it until it is made Active by ' + DashBoard.gConfigLead + '.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        //else if (objDueDate < currentDate) {
        //    DashBoard.alertBox1(DashBoard.gConfigEndDate + ' of the ' + DashBoard.gConfigProject + ' is passed away');//Added by Mohini for Resource file

        //    Main.hideLoading();

        //    return;
        //}
        else if (objCreateDate > currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigStartDate + ' of this ' + DashBoard.gConfigProject + ' has not come yet.Please contact your ' + DashBoard.gConfigLead + ' for more information.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }

        //End of validation

        ////////////////		

        //validation
        var dueDate = DashBoard.forTPIDGetEndDate[tPId];

        var sliceDate = dueDate.slice(0, 10);

        sliceDate = sliceDate.split("-");

        var DueDate = sliceDate[0] + '/' + sliceDate[1] + '/' + sliceDate[2];

        var objDueDate = new Date(DueDate);

        objDueDate.setHours("23");

        objDueDate.setMinutes("59");

        objDueDate.setSeconds("59");

        var CreateDate = DashBoard.forTPIDGetStartDate[tPId];

        var sliceDate2 = CreateDate.slice(0, 10);

        sliceDate2 = sliceDate2.split("-");

        var CreateDate = sliceDate2[0] + '/' + sliceDate2[1] + '/' + sliceDate2[2];

        var objCreateDate = new Date(CreateDate);

        var currentDate = new Date();

        var TPStatus = '';

        TPStatus = DashBoard.forTPIDGetTPStatus[tPId];

        if (TPStatus == 'Completed' || TPStatus == 'On Hold') {
            var status = '';

            if (TPStatus == 'Completed')
                status = 'Complete';
            else
                status = 'On Hold';

            DashBoard.alertBox1('This ' + DashBoard.gConfigTestPass + ' has been given ' + status + ' ' + DashBoard.gConfigStatus.toLowerCase() + ' by ' + DashBoard.gConfigLead + '/' + DashBoard.gConfigManager + ' .You can not start testing on it until it is made Active by ' + DashBoard.gConfigLead + ' or ' + DashBoard.gConfigManager + '.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        else if (objDueDate < currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigEndDate + ' of the ' + DashBoard.gConfigTestPass + ' is passed away');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        else if (objCreateDate > currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigStartDate + ' of this ' + DashBoard.gConfigTestPass + ' has not come yet.Please contact your ' + DashBoard.gConfigManager + ' for more information.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }

        else {
            var stat = 0;
            $("#divUpload").html('<input type="file" id="upload" style="display:none"/>');
            $("#upload").click();
            var path = $('#upload').val();
            window.setTimeout('$("#upload").remove();', 100);
           // window.setTimeout('Main.showLoading();', 200);

            if (path == "" || path == null || path == undefined) {
                DashBoard.msg = "You have not selected the file.";
                stat = 1;
                DashBoard.alertBox(DashBoard.msg);
               // Main.hideLoading();
                return;
            }
            var ext = path.split('.').pop().toLowerCase();
            if ($.inArray(ext, ['xlsx', 'xls']) == -1) {
                if (stat == 0) {
                    DashBoard.msg = "Please select the Excel file Template for " + DashBoard.gConfigTestCase + " with extention .xls or .xlsx!";//Added by Mohini for Resource file
                    DashBoard.alertBox(DashBoard.msg);
                    Main.hideLoading();
                    return;
                }
            }


            /*****************/
            Main.showLoading();
            var path = $('#upload').val();
            setTimeout(function () {
                DashBoard.importTCTemplate(pId, tPId, rID, rowindex, testerSPID, path);
            }, 200);
            /*****************/
        }

        //End of validation


        $("#divUpload").html('<input id="upload" style="display: none;" type="file">');

        $("#upload").change(function () {
            Main.showLoading();
            var path = $('#upload').val();
            setTimeout(function(){
            DashBoard.importTCTemplate(pId, tPId, rID, rowindex, testerSPID,path);
            }, 200);
        });

       // $("#upload").click();


        /*
            Main.showLoading();
            
            setTimeout(function(){
                DashBoard.importTCTemplate(pId,tPId,rID,rowindex,testerSPID);
            },200);
            */
    },

    importTCTemplate: function (pId, tPId, rID, rowindex, testerSPID,vpath) {
        Main.showLoading();
        obj = new Array();
        //var fileData = document.getElementById("upload").files[0];

        /***************************************************************************************/
        var stat = 0;
        var blnk = 0;
        var flgActiveX = 0, flgWord = 0;
        try {
            var excel = new ActiveXObject("Excel.Application");
            stat = 1;

            /* shilpa 25 sep */
            var objActiveX = new ActiveXObject("Scripting.FileSystemObject");
            flgActiveX = 1;
            var objWord = new ActiveXObject("Word.Application");
            flgWord = 1;
            if (flgActiveX == 1 && flgWord == 1)
                var doc = objWord.Documents.Add();
            //objWord.Visible = true;
            /***/


        }
        catch (ex) {
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        if (stat == 0) {
            Main.hideLoading();
            return;
        }

        var path = vpath;//$('#upload').val();

        var excel_file = excel.Workbooks.Open(path);

        var excel_sheet;
       // try{
            //excel_sheet = excel.Worksheets("Testing Template");
        try {
            excel_sheet = excel.Worksheets("Testing Template");
        }
        catch (e) {
            DashBoard.alertBox("Please select a valid Testing Template!");
            blnk = 1;
        }
        if (blnk == 1) {
            Main.hideLoading();
            return;
        }
            var cnt = excel_sheet.UsedRange.Rows.Count;
            blnk = 0;
            var flag = 0;

            var XlSheet = excel.activeSheet;
            var projectFound = false;

            //if(pId == excel_sheet.Cells(3,10).value && tPId == excel_sheet.Cells(5,10).value && excel_sheet.Cells(8,10).value == rID)
            //projectFound = true;


            var RowCount = 12;
            if (isPortfolioOn) {
                RowCount = 13;

                if (pId == excel_sheet.Cells(3, 10).value && tPId == excel_sheet.Cells(5, 10).value && excel_sheet.Cells(8, 10).value == rID)
                    projectFound = true;

            }
            else {
                if (pId == excel_sheet.Cells(3, 10).value && tPId == excel_sheet.Cells(4, 10).value && excel_sheet.Cells(7, 10).value == rID)
                    projectFound = true;

            }
            var TestStep_Listobj = new Array();
            var BulkImportArrayList = "";

            if (projectFound == true) {
                if (excel_sheet.Cells(7, 3).value != testerSPID) {
                    DashBoard.alertBox("Please select a valid Testing Template!");
                    Main.hideLoading();
                    return;
                }
                var testPassID = excel_sheet.Cells(4, 10).value;
                ///done
                if (cnt >= RowCount) {
                    var actResult = '';
                    var status = '';
                    var childID = '';
                   
                   
                    var statusBuffer = new Array();
                    var NCandPassChildID = new Array();
                    var diff = "";
                    var countNC = 0;
                    var countPass = 0;
                    var countFail = 0;
                    for (var an = RowCount ; an <= cnt + blnk; an++) {
                        if (excel_sheet.Cells(an, 1).value == undefined || excel_sheet.Cells(an, 1).value == '') {
                            an = an + 3;
                            continue;
                        }
                        diff = excel_sheet.Cells(an, 11).value;
                        enableDesignMode("rte1", "", false);
                        var copyFlag = 0;

                        ////if (diff == 1) {
                        ////    excel_sheet.Cells(an, 4).Copy();
                        ////}
                        ////else {
                        ////    var rangeCalc = "D" + an + ":D" + (an + diff);
                        ////    excel_sheet.range(rangeCalc).Copy();
                        ////}
                        var a3 = excel_sheet.Cells(an, 4).value;

                        var rangeCalc = "D" + an + ":D" + (an + diff);
                        excel_sheet.range(rangeCalc).Copy();

                        $('#divHtml').html("");
                        var sel = objWord.Selection;
                        //excel_sheet.Cells(an, 4).Copy();
                        sel.Paste();
                        var xdDoc = new ActiveXObject("Microsoft.XMLDOM");
                        xdDoc.loadXML(doc.WordOpenXML);
                        var openXML = xdDoc.xml;
                        DashBoard.pasteData1(openXML, divHtml);
                        actResult = $('#divHtml').html();
                        doc.Select();
                        sel.Delete();
                        /***/
                       
                        status = excel_sheet.Cells(an, 5).value;
                        if (status == "Pass")
                            countPass++;
                        else if (status == "Fail")
                            countFail++;
                        else if (status == "Not Completed")
                            countNC++;

                        childID = excel_sheet.Cells(an, 10).value;

                       
                        TestStep_Listobj.push({
                            's_planId': childID,
                            's_actualResult': actResult,
                            's_status': status
                        });
                      
                    }
                }
            }

            BulkImportArrayList = {
                'TestStep_Listobj': TestStep_Listobj
            };

            var result = ServiceLayer.InsertUpdateData("ImportTestingTemplate", BulkImportArrayList, "Dashboard");

           
            DashBoard.showInfoMsg(result, countPass, countFail, countNC, rowindex);
            Main.hideLoading();
        //}
        //catch (ex) {
        //    var a = ex;
        //}     
    },

    showInfoMsg: function (result, countPass, countFail, countNC, rowIndex) {
        var resArr = new Array();
        resArr = result;
        var msg = "";
        var width = 300;
        if (result == null || result == 'null') {
            msg = "Something went wrong"

        }
        else {

            //if (resArr[0].row_no == "-1") {
            //    msg = "Please select proper sheet";
            //}
            //else if (resArr[0].row_no == "-2") {
            //    msg = "Cannot upload blank template";
            //}
        //else if (resArr[0].row_no == "1") {
            if (result == 'Success') {
                msg = "Testing done successfully";

                //var resArr = resArr[0].sheetName.split(",");
                var passCount = countPass;// resArr[0];
                var failCount = countFail;// resArr[1];
                var ncCount = countNC;//resArr[2];
                var rowIndex = rowIndex;// resArr[3];

                $("#myact tr:eq(" + rowIndex + ") .NC").text(ncCount);

                $("#myact tr:eq(" + rowIndex + ") .Pass").text(passCount);

                $("#myact tr:eq(" + rowIndex + ") .Fail").text(failCount);


                if (ncCount == 0) {
                    $("#myact tr:eq(" + rowIndex + ") .myActLinkOrng a").text("Testing Complete");
                }
                else if ((passCount + failCount) == 0) {
                    $("#myact tr:eq(" + rowIndex + ") .myActLinkOrng a").text("Begin Testing");
                }
                else if ((passCount + failCount) != 0 && ncCount != 0) {
                    $("#myact tr:eq(" + rowIndex + ") .myActLinkOrng a").text("Continue Testing");
                }
            }

        }


        //Call the dialog box
        $("#divAlert").html(msg);

        $('#divAlert').dialog({

            modal: true,

            title: "Offline Testing",

            buttons: {

                "Ok": function () { $(this).dialog("close"); }

            }


        });
        $(".ui-dialog #divAlert").css("width", width + "px");


    },


    exportTemp: function (pId, tPId, rID, testerSPID, rowID) {
        Main.showLoading();

        ///////////// Added by Mangesh for validation for project
        //validation
        var dueDate = DashBoard.forPIDGetStatus[pId][0].projectEndDate;

        var sliceDate = dueDate.slice(0, 10);

        sliceDate = sliceDate.split("-");

        var DueDate = sliceDate[0] + '/' + sliceDate[1] + '/' + sliceDate[2];

        var objDueDate = new Date(DueDate);

        objDueDate.setHours("23");

        objDueDate.setMinutes("59");

        objDueDate.setSeconds("59");

        var CreateDate = DashBoard.forPIDGetStatus[pId][0].projectStartDate;

        var sliceDate2 = CreateDate.slice(0, 10);

        sliceDate2 = sliceDate2.split("-");

        var CreateDate = sliceDate2[0] + '/' + sliceDate2[1] + '/' + sliceDate2[2];

        var objCreateDate = new Date(CreateDate);

        var currentDate = new Date();

        var PStatus = '';

        PStatus = DashBoard.forPIDGetStatus[pId][0].projectStatus;
        if (PStatus == 'C' || PStatus == 'O') {
            var status = '';

            if (PStatus == 'C')
                status = 'Complete';
            else
                status = 'On Hold';

            DashBoard.alertBox1('This ' + DashBoard.gConfigProject + ' has been given ' + status + ' ' + DashBoard.gConfigStatus.toLowerCase() + ' by ' + DashBoard.gConfigLead + ' .You can not start testing on it until it is made Active by ' + DashBoard.gConfigLead + '.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        else if (objDueDate < currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigEndDate + ' of the ' + DashBoard.gConfigProject + ' is passed away');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        else if (objCreateDate > currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigStartDate + ' of this ' + DashBoard.gConfigProject + ' has not come yet.Please contact your ' + DashBoard.gConfigLead + ' for more information.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }

        //End of validation

        ////////////////

        ///////////// Added by Mangesh for validation for tp
        //validation
        var dueDate = DashBoard.forTPIDGetEndDate[tPId];

        var sliceDate = dueDate.slice(0, 10);

        sliceDate = sliceDate.split("-");

        var DueDate = sliceDate[0] + '/' + sliceDate[1] + '/' + sliceDate[2];

        var objDueDate = new Date(DueDate);

        objDueDate.setHours("23");

        objDueDate.setMinutes("59");

        objDueDate.setSeconds("59");

        var CreateDate = DashBoard.forTPIDGetStartDate[tPId];

        var sliceDate2 = CreateDate.slice(0, 10);

        sliceDate2 = sliceDate2.split("-");

        var CreateDate = sliceDate2[0] + '/' + sliceDate2[1] + '/' + sliceDate2[2];

        var objCreateDate = new Date(CreateDate);

        var currentDate = new Date();

        var TPStatus = '';

        TPStatus = DashBoard.forTPIDGetTPStatus[tPId];

        if (TPStatus == 'Completed' || TPStatus == 'On Hold') {
            var status = '';

            if (TPStatus == 'Completed')
                status = 'Complete';
            else
                status = 'On Hold';

            DashBoard.alertBox1('This ' + DashBoard.gConfigTestPass + ' has been given ' + status + ' ' + DashBoard.gConfigStatus.toLowerCase() + ' by ' + DashBoard.gConfigLead + '/' + DashBoard.gConfigManager + ' .You can not start testing on it until it is made Active by ' + DashBoard.gConfigLead + ' or ' + DashBoard.gConfigManager + '.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        else if (objDueDate < currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigEndDate + ' of the ' + DashBoard.gConfigTestPass + ' is passed away');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }
        else if (objCreateDate > currentDate) {
            DashBoard.alertBox1(DashBoard.gConfigStartDate + ' of this ' + DashBoard.gConfigTestPass + ' has not come yet.Please contact your ' + DashBoard.gConfigManager + ' for more information.');//Added by Mohini for Resource file

            Main.hideLoading();

            return;
        }

        //End of validation

        ////////////////        

        setTimeout(function () {

            //var inputParameters = pId+"/"+tPId+"/"+rID+"/"+testerSPID;
            var v = testerSPID;
            var inputParameters = _spUserId + "/" + tPId + "/" + rID;
            var resultTesting = ServiceLayer.GetData('ExportTestingTemplate', inputParameters, 'Dashboard');
           //ServiceLayer.GenerateReport("ExportTestingTemplate", inputParameters);

            Main.hideLoading();

            if (resultTesting != null)
            {
                DashBoard.exportTCTemplate_core(resultTesting, tPId, pId, rID, testerSPID);
            }

        }, 200);
    },

    //exportTCTemplate_core: function (pId, tPId, role, testerSPID, rowID) {
    exportTCTemplate_core: function (resultTesting, tPId, pId, role, testerSPID) {

        //Added by Mohini///
        var dueDate = DashBoard.forTPIDGetEndDate[tPId];

        var sliceDate = dueDate.slice(0, 10);
        sliceDate = sliceDate.split("-");
        var DueDate = sliceDate[1] + '/' + sliceDate[2] + '/' + sliceDate[0];
        var objDueDate = new Date(DueDate);
        objDueDate.setHours("23");
        objDueDate.setMinutes("59");
        objDueDate.setSeconds("59");
        var CreateDate = DashBoard.forTPIDGetStartDate[tPId];
        var sliceDate2 = CreateDate.slice(0, 10);
        sliceDate2 = sliceDate2.split("-");
        var CreateDate = sliceDate2[1] + '/' + sliceDate2[2] + '/' + sliceDate2[0];
        var objCreateDate = new Date(CreateDate);
        var currentDate = new Date();

        var TPStatus = '';
        TPStatus = DashBoard.forTPIDGetTPStatus[tPId];

        if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else {

            if (TPStatus == 'Complete' || TPStatus == 'On Hold') {
                var status = '';
                if (TPStatus == 'Complete')
                    status = 'Complete';
                else
                    status = 'On Hold';

                //DashBoard.alertBox1('This Test Pass has been given '+ status + ' status by Lead/Test Manager .You can not start testing on it until it is made Active by Lead or Test Manager.');
                DashBoard.alertBox1('This ' + DashBoard.gConfigTestPass + ' has been given ' + status + ' ' + DashBoard.gConfigStatus.toLowerCase() + ' by ' + DashBoard.gConfigLead + '/' + DashBoard.gConfigManager + ' .You can not start testing on it until it is made Active by ' + DashBoard.gConfigLead + ' or ' + DashBoard.gConfigManager + '.');//Added by Mohini for Resource file
                Main.hideLoading();
            }
            ////else if (objDueDate < currentDate) {//by trupti 
            ////    //DashBoard.alertBox1('End Date of the Test Pass is passed away');
            ////    DashBoard.alertBox1(DashBoard.gConfigEndDate + ' of the ' + DashBoard.gConfigTestPass + ' is passed away');//Added by Mohini for Resource file
            ////    Main.hideLoading();
            ////}
            else if (objCreateDate > currentDate) {
                //DashBoard.alertBox1('Start Date of this Test Pass has not come yet.Please contact your test manager for more information.');
                DashBoard.alertBox1(DashBoard.gConfigStartDate + ' of this ' + DashBoard.gConfigTestPass + ' has not come yet.Please contact your ' + DashBoard.gConfigManager + ' for more information.');//Added by Mohini for Resource file
                Main.hideLoading();
            }
            else {

                //Main.showLoading();
                var stat = 0;
                try {
                    var xlApp = new ActiveXObject("Excel.Application");
                    stat = 1;
                }
                catch (ex) {
                    Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
                }
                if (stat == 0) {
                    Main.hideLoading();
                    return;
                }
                try {
                    $("#tester").val(_spUserId);

                    xlApp.DisplayAlerts = false;
                    var xlBook = xlApp.Workbooks.Add();
                    xlBook.worksheets("Sheet1").activate;
                    var XlSheet = xlBook.activeSheet;
                    XlSheet.Name = "Testing Template";

                    //Set Excel Column Headers and formatting from array
                    XlSheet.cells(1, 1).value = "Note:";
                    XlSheet.cells(1, 1).font.colorindex = "2";
                    XlSheet.cells(1, 1).font.bold = "true";
                    XlSheet.cells(1, 1).font.Name = "Cambria";
                    XlSheet.cells(1, 1).interior.colorindex = "16";
                    XlSheet.cells(2, 1).interior.colorindex = "16";

                    XlSheet.cells(1, 2).value = "•Please follow the same format as given below to perform Testing!";
                    XlSheet.cells(1, 2).font.colorindex = "1";
                    XlSheet.cells(1, 2).font.bold = "true";
                    XlSheet.cells(1, 2).font.Name = "Cambria";

                    XlSheet.cells(2, 2).value = "•If you change the format of the template, data will not be imported properly.";
                    XlSheet.cells(2, 2).font.colorindex = "1";
                    XlSheet.cells(2, 2).font.bold = "true";
                    XlSheet.cells(2, 2).font.Name = "Cambria";

                    XlSheet.Range("B1:E1").Interior.ColorIndex = 15;
                    XlSheet.Range("B2:E2").Interior.ColorIndex = 15;

                    if (isPortfolioOn) //Code to run if the Portfolio is enabled :Ejaz Waquif DT:5/9/2014
                    {
                        XlSheet.cells(3, 1).value = DashBoard.gConfigProject + " Name";//Added by Mohini for Resource file
                        XlSheet.cells(3, 1).font.colorindex = 1;
                        XlSheet.cells(3, 1).font.bold = "true";
                        XlSheet.Cells(3, 2).value = resultTesting[0]['project_Name']==null?"-": resultTesting[0]['project_Name'];//trupti DashBoard.ProjectNameForPID[pId];//$("#projSelect option:selected").attr('title');
                        XlSheet.cells(3, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(3, 10).value = pId;

                        XlSheet.cells(4, 1).value = DashBoard.gConfigVersion;
                        XlSheet.cells(4, 1).font.colorindex = 1;
                        XlSheet.cells(4, 1).font.bold = "true";
                        XlSheet.Cells(4, 2).value = resultTesting[0]['project_Version'] == null ? "-" : resultTesting[0]['project_Version'];//trupti "'" + $("#myact tr").eq(parseInt(rowID)).children("td").eq(1).attr("title");
                        XlSheet.cells(4, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(4, 10).value = tPId;


                        XlSheet.cells(5, 1).value = DashBoard.gConfigTestPass + " Name";//Added by Mohini for Resource file
                        XlSheet.cells(5, 1).font.colorindex = 1;
                        XlSheet.cells(5, 1).font.bold = "true";
                        XlSheet.Cells(5, 2).value = resultTesting[0]['testPass_Name'] == null ? "-" : resultTesting[0]['testPass_Name'];//trupti DashBoard.TPNameForTPID[tPId];//$("#scenSelect option:selected").attr('title');
                        XlSheet.cells(5, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(5, 10).value = tPId;

                        XlSheet.cells(6, 1).value = DashBoard.gConfigManager;//Added by Mohini for Resource file
                        XlSheet.cells(6, 1).font.colorindex = 1;
                        XlSheet.cells(6, 1).font.bold = "true";
                        XlSheet.Cells(6, 2).value = resultTesting[0]['testManager'] == null ? "-" : resultTesting[0]['testManager'];//trupti DashBoard.forTPIDGetManager[tPId]//DashBoard.managerNameForTPID[ $("#scenSelect").val() ];
                        XlSheet.cells(6, 2).Interior.ColorIndex = 36;

                        XlSheet.cells(7, 1).value = DashBoard.gConfigTester;//Added by Mohini for Resource file
                        XlSheet.cells(7, 1).font.colorindex = 1;
                        XlSheet.cells(7, 1).font.bold = "true";

                        /*Modified by Ejaz Waquif for migration to O365 DT:7/16/2014*/
                        $("#userW span:eq(1) a span").text("");
                        XlSheet.Cells(7, 2).value = resultTesting[0]['tester_Name'] == null ? "-" : resultTesting[0]['tester_Name'];//trupti $("#userW span:eq(1) a").text();//$("#tester option:selected").attr('text');
                        XlSheet.cells(7, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(7, 3).value = testerSPID; //shilpa for tester validation
                        XlSheet.cells(7, 3).font.colorindex = 36; //shilpa for tester validation
                        XlSheet.Cells(7, 10).value = role;//

                        XlSheet.cells(8, 1).value = DashBoard.gConfigRole;//Added by Mohini for Resource file
                        XlSheet.cells(8, 1).font.colorindex = 1;
                        XlSheet.cells(8, 1).font.bold = "true";
                        XlSheet.Cells(8, 2).value = resultTesting[0]['role_Name'] == null ? "-" : resultTesting[0]['role_Name'];//trupti DashBoard.RoleNameForRoleID[role];
                        XlSheet.cells(8, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(8, 10).value = role;

                        XlSheet.Range("A3").EntireColumn.columnwidth = '30';
                        XlSheet.Range("B3").EntireColumn.columnwidth = '80';
                        XlSheet.Range("B3").EntireColumn.WrapText = 'True';
                        XlSheet.Range("A3:E3").Interior.ColorIndex = 36;
                        XlSheet.Range("A4:E7").Interior.ColorIndex = 36;
                        XlSheet.Range("A4:E7").Interior.ColorIndex = 36;
                        XlSheet.Range("A5:E5").Interior.ColorIndex = 36;
                        XlSheet.Range("A6:E6").Interior.ColorIndex = 36;
                        XlSheet.Range("A7:E7").Interior.ColorIndex = 36;
                        XlSheet.Range("A8:E7").Interior.ColorIndex = 36;
                    }
                    else {
                        //var ver = $("#myact tr").eq( parseInt( rowID ) ).children("td").eq(1).text();
                        //ver = ver == "No "+DashBoard.gConfigVersion ? "" : ver;

                        XlSheet.cells(3, 1).value = DashBoard.gConfigProject + " Name";//Added by Mohini for Resource file
                        XlSheet.cells(3, 1).font.colorindex = 1;
                        XlSheet.cells(3, 1).font.bold = "true";
                        XlSheet.Cells(3, 2).value = DashBoard.ProjectNameForPID[pId];//$("#projSelect option:selected").attr('title');
                        XlSheet.cells(3, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(3, 10).value = pId;

                        //done

                        XlSheet.cells(4, 1).value = DashBoard.gConfigTestPass + " Name";//Added by Mohini for Resource file
                        XlSheet.cells(4, 1).font.colorindex = 1;
                        XlSheet.cells(4, 1).font.bold = "true";
                        XlSheet.Cells(4, 2).value = DashBoard.TPNameForTPID[tPId];//$("#scenSelect option:selected").attr('title');
                        XlSheet.cells(4, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(4, 10).value = tPId;

                        XlSheet.cells(5, 1).value = DashBoard.gConfigManager;//Added by Mohini for Resource file
                        XlSheet.cells(5, 1).font.colorindex = 1;
                        XlSheet.cells(5, 1).font.bold = "true";
                        XlSheet.Cells(5, 2).value = DashBoard.forTPIDGetManager[tPId]//DashBoard.managerNameForTPID[ $("#scenSelect").val() ];
                        XlSheet.cells(5, 2).Interior.ColorIndex = 36;

                        XlSheet.cells(6, 1).value = DashBoard.gConfigTester;//Added by Mohini for Resource file
                        XlSheet.cells(6, 1).font.colorindex = 1;
                        XlSheet.cells(6, 1).font.bold = "true";

                        /*Modified by Ejaz Waquif for migration to O365 DT:7/16/2014*/
                        $("#userW span:eq(1) a span").text("");
                        XlSheet.Cells(6, 2).value = $("#userW span:eq(1) a").text();//$("#tester option:selected").attr('text');
                        XlSheet.cells(6, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(6, 3).value = testerSPID; //shilpa for tester validation
                        XlSheet.cells(6, 3).font.colorindex = 36; //shilpa for tester validation
                        XlSheet.Cells(6, 10).value = role;//

                        XlSheet.cells(7, 1).value = DashBoard.gConfigRole;//Added by Mohini for Resource file
                        XlSheet.cells(7, 1).font.colorindex = 1;
                        XlSheet.cells(7, 1).font.bold = "true";
                        XlSheet.Cells(7, 2).value = DashBoard.RoleNameForRoleID[role];
                        XlSheet.cells(7, 2).HorizontalAlignment = 2;
                        XlSheet.Cells(7, 3).value = testerSPID; //shilpa for tester validation
                        XlSheet.cells(7, 3).font.colorindex = 36; //shilpa for tester validation

                        XlSheet.Cells(7, 10).value = role;

                        XlSheet.Range("A3").EntireColumn.columnwidth = '30';
                        XlSheet.Range("B3").EntireColumn.columnwidth = '80';
                        XlSheet.Range("B3").EntireColumn.WrapText = 'True';

                        XlSheet.Range("A3:E7").Interior.ColorIndex = 36;

                    }

                    //Query on parent list using Test Pass ID and SPUserID
                    var trackrow = 9;

                    if (isPortfolioOn)
                        trackrow = 10;

                    var TestStepNameAndExpResultForTSID = new Array();
                    var RoleNameForRoleID = new Array();
                    var TSIDStatusForTCID = new Array();
                    var ActualResultForTSID = new Array();
                    var TestCaseNameAndDescForTCID = new Array();
                    var ParentIDAndSPUSerIDForTCID = new Array();
                    var TCID = new Array();
                    var count = 0;
                    var testCaseItems = new Array();
                    var ChildListResult = new Array();
                    var testStepItems = new Array();
                    var TC_coll = new Array();

                    var sequnceForTSID = new Array();

                    if (resultTesting.length != 0) {

                        var forTCIDgetIndex = new Array();
                        var OrEndTags = '';
                        var iteration = 0;//Math.ceil((testCaseItems2.length) / 147); //147 is the maximum number of IDs(10 digit ID at the max) accomodated in the query
                        var iterationStartPoint = 0;
                        var TestCaseToTestStepMappingList = new Array();
                        
                            var TestStepResult = new Array();
                            var TSID = new Array();
                            var TCIDs = new Array();
                            //Acode added on 22 Aug 2012 by HRW
                            for (var i = 0; i < resultTesting.length; i++) {
                                if ($.inArray(resultTesting[i]['testStep_ActionName'], TSID) == -1) {
                                    TSID.push(resultTesting[i]['testStep_ActionName']);
                                }
                                if (resultTesting[i]['actual_Result'] != undefined)                                   
                                    ActualResultForTSID[resultTesting[i]['testStepPlan_Id']] = resultTesting[i]['actual_Result'];//ActualResultForTSID[resultTesting[i]['testStep_Id']] = resultTesting[i]['actual_Result'];
                                else
                                    ActualResultForTSID[resultTesting[i]['testStepPlan_Id']] = '-'; //ActualResultForTSID[resultTesting[i]['testStep_Id']] = '-';
                                if (TSIDStatusForTCID[resultTesting[i]['testCase_ID']] == undefined) {
                                    TSIDStatusForTCID[resultTesting[i]['testCase_ID']] = resultTesting[i]['testStep_ActionName'] + "|" + resultTesting[i]['testStepStatus'] + "|" + resultTesting[i]['testStepPlan_Id'];
                                    //TSIDStatusForTCID[resultTesting[i]['testCase_ID']] = resultTesting[i]['testStep_ActionName'] + "|" + resultTesting[i]['testStepStatus'] + "|" + resultTesting[i]['testStep_Id'];
                                }
                                else {
                                    //TSIDStatusForTCID[resultTesting[i]['testCase_ID']] += "~" + resultTesting[i]['testStep_ActionName'] + "|" + resultTesting[i]['testStepStatus'] + "|" + resultTesting[i]['testStep_Id'];
                                    TSIDStatusForTCID[resultTesting[i]['testCase_ID']] += "~" + resultTesting[i]['testStep_ActionName'] + "|" + resultTesting[i]['testStepStatus'] + "|" + resultTesting[i]['testStepPlan_Id'];
                                }
                                if ($.inArray(resultTesting[i]['testCase_ID'], TCIDs) == -1) {
                                   // testCaseItems = testCaseItems.concat(testCaseItems2[forTCIDgetIndex[resultTesting[i]['testCase_ID']]]);
                                    TCIDs.push(resultTesting[i]['testCase_ID']);
                                }


                                //if (resultTesting[i]['expected_Result'] != undefined)
                                //    TestStepNameAndExpResultForTSID[resultTesting[i]['testStep_Id']] = resultTesting[i]['testStep_ActionName'] + "~" + resultTesting[i]['expected_Result'];
                                //else
                                //    TestStepNameAndExpResultForTSID[resultTesting[i]['testStep_Id']] = resultTesting[i]['testStep_ActionName'] + "~" + "-";
                                //sequnceForTSID[resultTesting[i]['testStep_Id']] = resultTesting[i]['testStep_Sequence'];


                                if (resultTesting[i]['expected_Result'] != undefined)
                                    TestStepNameAndExpResultForTSID[resultTesting[i]['testStepPlan_Id']] = resultTesting[i]['testStep_ActionName'] + "~" + resultTesting[i]['expected_Result'];
                                else
                                    TestStepNameAndExpResultForTSID[resultTesting[i]['testStepPlan_Id']] = resultTesting[i]['testStep_ActionName'] + "~" + "-";
                                sequnceForTSID[resultTesting[i]['testStepPlan_Id']] = resultTesting[i]['testStep_Sequence'];



                            }
                                var uniqueTestCases = new Array();

                                if (resultTesting.length != 0) {
                                var myRange1 = document.body.createTextRange();
                                var statusArr = ["Pass", "Fail", "Not Completed"];
                                for (var itm = 0; itm < resultTesting.length; itm++) //for all the testCaseID
                                {
                                    if (TSIDStatusForTCID[resultTesting[itm]['testCase_ID']] != undefined && ($.inArray(resultTesting[itm]['testCase_ID'], uniqueTestCases) == -1)) {

                                        uniqueTestCases.push(resultTesting[itm]['testCase_ID']);

                                        var row;
                                        var coll = 4;

                                        XlSheet.Cells(trackrow, 1).value = DashBoard.gConfigTestCase + ' Name';//Added by Mohini for Resource file
                                        XlSheet.cells(trackrow, 1).font.bold = "true";
                                        XlSheet.Cells(trackrow, 2).value = resultTesting[itm]['testCase_Name'];
                                        XlSheet.cells(trackrow, 2).font.bold = "true";
                                        trackrow++;

                                        XlSheet.Cells(trackrow, 1).value = 'Estimated ' + DashBoard.gConfigTestCase + ' Time (mins)';//Added by Mohini for Resource file
                                        XlSheet.cells(trackrow, 1).font.bold = "true";
                                        XlSheet.cells(trackrow, 2).HorizontalAlignment = 2;
                                        XlSheet.Cells(trackrow, 2).value = resultTesting[itm]['ett'];
                                        trackrow++;

                                        XlSheet.Cells(trackrow, 1).value = DashBoard.gConfigSequence;//Added by Mohini for Resource file
                                        XlSheet.cells(trackrow, 1).font.bold = "true";
                                        XlSheet.cells(trackrow, 1).HorizontalAlignment = -4152;
                                        XlSheet.cells(trackrow, 1).Interior.ColorIndex = 40;
                                        XlSheet.Cells(trackrow, 2).value = 'Test ' + DashBoard.gConfigAction + ' / Steps';//Added by Mohini for Resource file
                                        XlSheet.cells(trackrow, 2).font.bold = "true";
                                        XlSheet.cells(trackrow, 2).Interior.ColorIndex = 40;

                                        XlSheet.Cells(trackrow, 3).value = DashBoard.gConfigExpectedResult;//Added by Mohini for Resource file
                                        XlSheet.cells(trackrow, 3).font.bold = "true";
                                        XlSheet.cells(trackrow, 3).Interior.ColorIndex = 40;
                                        var nameRow = trackrow;
                                        trackrow++;

                                        XlSheet.Range("B1").EntireColumn.columnwidth = '80';

                                        XlSheet.Range("C1").EntireColumn.columnwidth = '60';
                                        XlSheet.Range("C1").EntireColumn.WrapText = 'True';

                                        XlSheet.Range("D1").EntireColumn.columnwidth = '60';
                                        XlSheet.Range("D1").EntireColumn.WrapText = 'True';

                                        XlSheet.Range("E1").EntireColumn.columnwidth = '15';
                                        XlSheet.Range("E1").EntireColumn.WrapText = 'True';

                                        XlSheet.Cells(nameRow, coll).value = DashBoard.gConfigActualresult;//Added by Mohini for Resource file
                                        XlSheet.cells(nameRow, coll).font.bold = "true";
                                        XlSheet.cells(nameRow, coll).Interior.ColorIndex = 40;

                                        XlSheet.Cells(nameRow, coll + 1).value = DashBoard.gConfigStatus;//Added by Mohini for Resource file
                                        XlSheet.cells(nameRow, coll + 1).font.bold = "true";
                                        XlSheet.cells(nameRow, coll + 1).Interior.ColorIndex = 40;

                                        var result = new Array();
                                        var result2 = TSIDStatusForTCID[resultTesting[itm]['testCase_ID']].split("~");
                                        var anchorCount = 0;
                                       
                                        for (var ii = 0; ii < result2.length; ii++)
                                            result.push({ 'Data': result2[ii], 'position': sequnceForTSID[result2[ii].split("|")[2]] });


                                        result.sort(function (a, b) {
                                            return a.position - b.position;
                                        });

                                        var cellCount = trackrow - 1;
                                        var lastCount = trackrow - 1;
                                        var cellW = 417;//XlSheet.cells((cellCount+1),5).width+150;
                                        var flagTrue = 0;
                                        //var srcObjExp = document.getElementById("divExp");
                                        var srcObjAct = document.getElementById("divAct");
                                        var rangeObj = document.body.createTextRange();
                                        for (var ss = 0; ss < result.length; ss++) {
                                            if (XlSheet.cells((cellCount + 1), 1).value != undefined)
                                                cellCount = cellCount + 1;
                                            flagTrue = 0;
                                            lastCount = cellCount;
                                            var flagExp = 0;
                                            var flagTS = 0;
                                            var flagAct = 0;

                                            XlSheet.cells((cellCount + 1), 1).value = ss + 1;;//Sequence Number
                                            var TSID = result[ss].Data.split("|")[2];
                                            var TSName = TestStepNameAndExpResultForTSID[TSID].split("~")[0];
                                            TSName = TSName.replace(/&quot;/g, '"');
                                            /*For Bug Id:11779 Mohini DT:15-05-2014*/
                                            TSName = TSName.replace(/&gt;/g, '>');
                                            TSName = TSName.replace(/&lt;/g, '<');
                                            TSName = TSName.replace(/&amp;/g, '&');
                                            /*******************************/
                                            if (TSName.match(/</g) == undefined && TSName.match(/</g) == null)//Test Step Name
                                                XlSheet.cells((cellCount + 1), 2).value = TSName;
                                            else if (TSName.match(/</g).length == 2 && (TSName.indexOf("<div") != -1 || TSName.indexOf("<p") != -1))
                                                XlSheet.cells((cellCount + 1), 2).value = DashBoard.filterData(TSName);
                                            else if (TSName.indexOf("</table>") != -1 && TSName.indexOf("<table") != -1) {
                                                if (TSName.match(/<td/g).length > 1) {
                                                    var completeActionName = DashBoard.filterData(TSName);
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
                                            var ExpectedResult = TestStepNameAndExpResultForTSID[TSID].split("~")[1];
                                            ExpectedResult = ExpectedResult.replace(/&quot;/g, '"');
                                            /*For Bug Id:11779 Mohini DT:15-05-2014*/
                                            ExpectedResult = ExpectedResult.replace(/&gt;/g, '>');
                                            ExpectedResult = ExpectedResult.replace(/&lt;/g, '<');
                                            ExpectedResult = ExpectedResult.replace(/&amp;/g, '&');
                                            /*******************************/
                                            if (ExpectedResult != "-" && ExpectedResult != undefined && ExpectedResult != "undefined")//Expected Reult
                                            {
                                                flagTrue = 0;
                                                if (ExpectedResult.match(/</g) == undefined && ExpectedResult.match(/</g) == null)
                                                    XlSheet.cells((cellCount + 1), 3).value = ExpectedResult;
                                                else if (ExpectedResult.match(/</g).length == 2 && (ExpectedResult.indexOf("<div") != -1 || ExpectedResult.indexOf("<p") != -1))
                                                    XlSheet.cells((cellCount + 1), 3).value = DashBoard.filterData(ExpectedResult);
                                                else if (ExpectedResult.indexOf("</table>") != -1 && ExpectedResult.indexOf("<table") != -1) {
                                                    if (ExpectedResult.match(/<td/g).length > 1) {
                                                        var completeExpResult = DashBoard.filterData(ExpectedResult);
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
                                                        XlSheet.cells((cellCount + 1), 3).WrapText = 'True'; //shilpa 4oct
                                                    }
                                                    else {
                                                        var cellH = 15;//XlSheet.cells((cellCount+1),3).height+115;
                                                        var flagActShow = 0;
                                                        var imageCount = 0;
                                                        var otherTextPresent = 0;
                                                        var planID = resultTesting[itm]['testStepPlan_Id'];
                                                        var idExp = 'divExp' + planID;


                                                        if ($("#" + idExp).html() == undefined) {
                                                            var htmlforAppend = "<div id='" + idExp + "'></div>";
                                                            $("#divExp").after(htmlforAppend);
                                                            $("#" + idExp).html(ExpectedResult);

                                                            $("#" + idExp + " img").each(function () {
                                                               
                                                                var url = ServiceLayer.serviceURL + '/Dashboard/GetFile_ExpResult?id=' + planID + '&Url=' + ServiceLayer.appurl;
                                                                $(this).attr("src", url);
                                                                if (cellW < $(this).attr("width"))
                                                                    $(this).attr("width", cellW);
                                                                if ($(this).attr("height") < 150)
                                                                    cellH = $(this).attr("height");
                                                                else {
                                                                    cellH = 150;
                                                                    $(this).attr("height", 150);
                                                                }
                                                                imageCount++;
                                                            });
                                                        }
                                                        $("#" + idExp).hide();





                                                        
                                                        

                                                    

                                                        
                                                        $("#divExp").children().each(function () {
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

                                                        /*enableDesignMode("rte1", $("#divExp").html(), false); 
												        rteCommand("rte1","selectAll");
												        rteCommand("rte1","copy");*/
                                                        XlSheet.cells((cellCount + 1), 3).PasteSpecial(); //Expected Result
                                                        XlSheet.cells((cellCount + 1), 3).WrapText = 'True'; //shilpa 4oct
                                                        if (flagActShow == 1) {
                                                            cellCount2 = XlSheet.UsedRange.Rows.Count;
                                                            if (imageCount != 1 || otherTextPresent == 1) {
                                                                if (cellH > 110)
                                                                    XlSheet.Range("A" + (cellCount2) + ":F" + (cellCount2)).RowHeight = cellH - 95;
                                                                else
                                                                    XlSheet.Range("A" + (cellCount2) + ":F" + (cellCount2)).RowHeight = cellH - 15;

                                                            }
                                                            flagExp = 1;
                                                        }
                                                    }
                                                }
                                            }
                                            else
                                                XlSheet.cells((cellCount + 1), 3).value = '-';

                                            var actRes = ActualResultForTSID[TSID];
                                            actRes = actRes.replace(/&quot;/g, '"');
                                            /*For Bug Id:11779 Mohini DT:15-05-2014*/
                                            actRes = actRes.replace(/&gt;/g, '>');
                                            actRes = actRes.replace(/&lt;/g, '<');
                                            actRes = actRes.replace(/&amp;/g, '&');
                                            /****************************************/
                                            var flagForMinus = 0;
                                            if (actRes != undefined) {
                                                flagTrue = 0;
                                                if (actRes.match(/</g) == undefined && actRes.match(/</g) == null) {
                                                    XlSheet.cells((cellCount + 1), 4).value = actRes;
                                                    cellCount = cellCount2;
                                                }
                                                else if (actRes.match(/</g).length == 2 && (actRes.indexOf("<div") != -1 || actRes.indexOf("<p") != -1)) {
                                                    XlSheet.cells((cellCount + 1), 4).value = DashBoard.filterData(actRes);
                                                    cellCount = cellCount2;
                                                }
                                                else if (actRes.indexOf("</table>") != -1 && actRes.indexOf("<table") != -1) {
                                                    if (actRes.match(/<td/g).length > 1) {
                                                        var completeActResult = DashBoard.filterData(actRes);
                                                        completeActResult = completeActResult.replace(/&quot;/g, '"');
                                                        completeActResult = completeActResult.replace(/(\r\n)+/g, '');
                                                        XlSheet.cells((cellCount + 1), 4).value = completeActResult;
                                                        cellCount = XlSheet.UsedRange.Rows.Count;
                                                    }
                                                    else
                                                        flagTrue = 1;
                                                }
                                                else
                                                    flagTrue = 1;
                                                if (flagTrue == 1) {
                                                    if (actRes.indexOf("data:image/png;base64") == -1) {
                                                        enableDesignMode("rte1", actRes, false);
                                                        rteCommand("rte1", "selectAll");
                                                        rteCommand("rte1", "copy");
                                                        XlSheet.cells((cellCount + 1), 4).PasteSpecial(); //Expected Result
                                                        XlSheet.cells((cellCount + 1), 4).WrapText = 'True'; //shilpa 4oct
                                                        cellCount = XlSheet.UsedRange.Rows.Count;
                                                    }
                                                    else {
                                                        var cellH = 15;//XlSheet.cells((cellCount+1),6).height+115;
                                                        var planID = resultTesting[itm]['testStepPlan_Id'];

                                                       

                                                        var flagActShow = 0;
                                                        var imageCount = 0;
                                                        $("#divAct").html(actRes);
                                                        $("#divAct img").each(function () {
                                                           
                                                            var url = ServiceLayer.serviceURL + '/Dashboard/GetFile_ActResult?id=' + planID + '&Url=' + ServiceLayer.appurl;

                                                            if (DashBoard.imageURL != "") {
                                                                $(this).attr("src", url);
                                                                if (cellW < $(this).attr("width"))
                                                                    $(this).attr("width", cellW);
                                                                if ($(this).attr("height") < 150)
                                                                    cellH = $(this).attr("height");
                                                                else {
                                                                    cellH = 150;
                                                                    $(this).attr("height", 150);
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

                                                        /*enableDesignMode("rte1",$("#divAct").html(), false); 
												        rteCommand("rte1","selectAll");
												        rteCommand("rte1","copy");*/

                                                        XlSheet.cells((cellCount + 1), 4).PasteSpecial(); //Actual Result
                                                        XlSheet.cells((cellCount + 1), 4).WrapText = 'True'; //shilpa 4oct
                                                        if (flagActShow == 1) {
                                                            cellCount = XlSheet.UsedRange.Rows.Count;
                                                            if (cellH > 110)
                                                                XlSheet.Range("A" + (cellCount) + ":F" + (cellCount)).RowHeight = cellH - 95;
                                                            else
                                                                XlSheet.Range("A" + (cellCount) + ":F" + (cellCount)).RowHeight = cellH - 15;
                                                            flagAct = 1;
                                                        }
                                                        else
                                                            flagForMinus = 1;

                                                    }
                                                }

                                            }
                                            else
                                                XlSheet.Cells((cellCount + 1), 4).value = '-';

                                            var rn = XlSheet.Cells(trackrow, 5);//XlSheet.range("E"+trackrow+":E1000");	
                                            rn.Validation.Add(3, 1, 1, statusArr);
                                            rn.Validation.IgnoreBlank = 1;
                                            rn.Validation.InCellDropdown = 1;
                                            rn.Validation.ErrorMessage = "Select value from dropdown.";
//done
                                            XlSheet.Cells(trackrow, 5).value = result[ss].Data.split("|")[1];

                                            XlSheet.Cells(trackrow, 10).value = result[ss].Data.split("|")[2];
                                            if (flagForMinus == 1)
                                                cellCount = XlSheet.UsedRange.Rows.Count - 2;
                                            else
                                                cellCount = XlSheet.UsedRange.Rows.Count;

                                            XlSheet.Cells(trackrow, 11).value = cellCount - trackrow;//Diffenrence
                                            if (lastCount < cellCount - 1) {
                                                XlSheet.Range(XlSheet.cells((lastCount + 1), 1), XlSheet.cells(cellCount, 1)).Merge();
                                                for (var mm = lastCount + 2; mm <= cellCount; mm++) {
                                                    if (XlSheet.cells((mm), 2).value != undefined)
                                                        flagTS = 1;
                                                    if (XlSheet.cells((mm), 3).value != undefined && XlSheet.cells((mm), 3).value != "-")
                                                        flagExp = 1;
                                                    if (XlSheet.cells((mm), 4).value != undefined && XlSheet.cells((mm), 4).value != "-")
                                                        flagAct = 1;
                                                    XlSheet.cells(mm, 2).WrapText = 'True';
                                                    XlSheet.cells(mm, 3).WrapText = 'True';
                                                }
                                                if (flagTS == 0) {
                                                    XlSheet.Range(XlSheet.cells((lastCount + 1), 2), XlSheet.cells(cellCount, 2)).Merge();
                                                    XlSheet.Range(XlSheet.cells((lastCount + 1), 2), XlSheet.cells(cellCount, 2)).VerticalAlignment = -4108;
                                                }
                                                if (flagExp == 0) {
                                                    XlSheet.Range(XlSheet.cells((lastCount + 1), 3), XlSheet.cells(cellCount, 3)).Merge();
                                                    XlSheet.Range(XlSheet.cells((lastCount + 1), 3), XlSheet.cells(cellCount, 3)).VerticalAlignment = -4108;
                                                }
                                                if (flagAct == 0) {
                                                    XlSheet.Range(XlSheet.cells((lastCount + 1), 4), XlSheet.cells(cellCount, 4)).Merge();
                                                    XlSheet.Range(XlSheet.cells((lastCount + 1), 4), XlSheet.cells(cellCount, 4)).VerticalAlignment = -4108;
                                                    //XlSheet.Range(XlSheet.cells((lastCount+1),4), XlSheet.cells(cellCount,4)).HorizontalAlignment=-4108;
                                                }
                                            }
                                            trackrow = cellCount + 1;
                                        }
                                        trackrow++;
                                    }
                                }
                                XlSheet.Range("A1").EntireColumn.VerticalAlignment = -4108;
                                XlSheet.Range("A1").EntireColumn.HorizontalAlignment = -4131;

                                $("#divExp").html('');
                                $("#divAct").html('');
                            }

                        //}
                        else
                            XlSheet.Cells(trackrow, 2).value = "No " + DashBoard.gConfigTestStep + " Available !";//Added by Mohini for Resource file
                    }
                    else
                        XlSheet.Cells(9, 2).value = "No " + DashBoard.gConfigTestCase + " Available !";//Added by Mohini for Resource file
                    XlSheet.Range("J1").EntireColumn.Hidden = true; //For hiding column
                    XlSheet.Range("K1").EntireColumn.Hidden = true; //For hiding column
                    XlSheet.Range("D1:D" + trackrow + "").Locked = false;
                    XlSheet.Range("E1:E" + trackrow + "").Locked = false;
                    XlSheet.protect("password", false, true, true, true, false, true, true, false, false, true);// shilpa: 26sep
                    xlApp.DisplayAlerts = true;
                    xlApp.Visible = true;
                    CollectGarbage();
                    window.setTimeout("Main.hideLoading()", 200);


                }
                catch (err) {
                    alert(err.message);
                    window.setTimeout("Main.hideLoading()", 200);
                    $("#divExp").html('');
                    $("#divAct").html('');
                    xlApp.Visible = true;
                }
            }

        }
    },
    exportTCTemplate: function (pId, tPId, role, testerSPID, rowID) {
    },
    AddAttachment: function (baseStr) {
        var obj = new Array();
        obj.push({
            "Title": "New1",
            "Qry": "Test"
        });
        var SPlistName = "testlist";
        var listname = jP.Lists.setSPObject(Main.getSiteUrl(), SPlistName);
        var result = listname.updateItem(obj);
        $().SPServices(
                    {
                        operation: "AddAttachment",
                        webURL: Main.getSiteUrl(),
                        listName: SPlistName,
                        listItemID: result.ID,
                        fileName: "Att.png",
                        attachment: baseStr,
                        async: false,
                        completefunc: DashBoard.AttResult
                    });
    },
    AttResult: function (xmlHttpRequest, status) {
        DashBoard.imageURL = "";
        if (status == "success")
            DashBoard.imageURL = $(xmlHttpRequest.responseText).find('AddAttachmentResult').text();

    },
    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 130, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },
    msg: '',

    helpTextOnTempalteUse: function () {
        var msg = "•If you are " + DashBoard.gConfigTester.toLowerCase() + " in selected " + DashBoard.gConfigTestPass + " then only you can download/export the Testing template of selected " + DashBoard.gConfigTestPass + " against assigned " + DashBoard.gConfigRole + "(s)!<br/>";
        msg += "•For importing Testing tempate, please select 'Import " + DashBoard.gConfigTestCase + "' option from Action dropdown and click on 'Go' button!<br/>";
        msg += "•Please follow the same format as given below to perform Testing!<br/>";
        msg += "•If you change the format of the template, data will not be imported properly.<br/>"

        if (isRootWeb)
            var url = "<a href='../GuidelineDocs/Dashboard My Activity - Offline Testing - Template uploading guidelines.pdf' target='_blank' style='text-decoration:underline;color:blue'>File</a>";
        else
            var url = "<a href='../../GuidelineDocs/Dashboard My Activity - Offline Testing - Template uploading guidelines.pdf' target='_blank' style='text-decoration:underline;color:blue'>File</a>";




        var msg = "Please follow below steps to Import Testing Template:<br/>";
        msg += "&nbsp;&nbsp;1.	Download a Template with 'Export " + DashBoard.gConfigTestCase + "s' option from 'Offline Testing' column for selected " + DashBoard.gConfigProject + " and &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selected " + DashBoard.gConfigTestPass + " (Select only 1 " + DashBoard.gConfigTestPass + " at a time).<br/>";
        msg += "&nbsp;&nbsp;2.	You will get a " + DashBoard.gConfigTestCase + " template as per the selected " + DashBoard.gConfigRole + ". (1 template for 1 Testing " + DashBoard.gConfigRole + ".)<br/>";
        msg += "&nbsp;&nbsp;3.	Do the offline testing of the respective 'application which is under UAT phase' and add the 'Actual Result' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;against each " + DashBoard.gConfigTestStep + " and select the " + DashBoard.gConfigStatus.toLowerCase() + " of the " + DashBoard.gConfigTestStep + " (as per its testing " + DashBoard.gConfigStatus.toLowerCase() + ") from provided drop &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;down.<br/>";
        msg += "&nbsp;&nbsp;4.	Save Template in local drive.<br/>"
        msg += "&nbsp;&nbsp;5.	Upload this saved template using 'Import " + DashBoard.gConfigTestCase + "s' option from 'Offline Testing' column.<br/><br/>"
        msg += " Download " + url + " for detailed guidelines.";
        $("#divAlert").html(msg);
        $('#divAlert').dialog({ height: 150, width: 750, modal: true, resizable: false, title: "Guidelines to Import Testing Template", buttons: { "Ok": function () { $(this).dialog("close"); } } });

    },
    pasteData1: function (openXML, element) {

        $(openXML).find('pkg\\:part > pkg\\:xmlData > w\\:document > w\\:body').children().each(function (index, val) {
            var arr = new Array();

            if ($(val).find('w\\:p > w\\:hyperlink')[0] != undefined)  // for hyperlink
            {
                if ($(val).find('w\\:pPr > w\\:numPr')[0] != undefined)  // If text contains any bullets
                {
                    var p = document.createElement("ul");
                    p.id = "ul" + index;
                    element.appendChild(p);

                    var paraText = $(val).find('w\\:r').next().text(); //$(val).find('t').text();

                    var rId = $(val).find('w\\:p > w\\:hyperlink')[0].getAttribute('r:id');
                    // JS: Using imageData ID  find the Target XPath
                    var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
                    var paraText1 = $(val).find('w\\:p > w\\:hyperlink').text();
                    var p = document.createElement("a");
                    p.innerHTML = paraText1;
                    p.href = target;
                    element.appendChild(p);

                    var p1 = document.createElement("li");
                    p1.innerHTML = paraText;
                    p1.appendChild(p);
                    $('#ul' + index).append(p1);
                    $('#ul' + index).css('padding-left', '30px');
                }
                else // for normal text
                {
                    var rId = $(val).find('w\\:p > w\\:hyperlink')[0].getAttribute('r:id');
                    // JS: Using imageData ID  find the Target XPath
                    var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
                    var paraText = $(val).find('w\\:p > w\\:hyperlink').text();
                    var p = document.createElement("a");
                    p.innerHTML = paraText;
                    p.href = target;
                    element.appendChild(p);

                    var breakLine = document.createElement("br");  // shilpa:25sep
                    element.appendChild(breakLine);
                }
                $(element).find('a').css('margin-left', '5px') // shilpa:27th may bug:8001
            }

            if ($(val).find('w\\:r > w\\:t')[0] != undefined && $(val).find('w\\:p > w\\:hyperlink')[0] == undefined) {
                if ($(val).find('w\\:pPr > w\\:numPr')[0] != undefined)  // If text contains any bullets
                {
                    var p = document.createElement("ul");
                    p.id = "ul" + index;
                    element.appendChild(p);
                    var paraText = $(val).find('w\\:r > w\\:t').text();
                    var p1 = document.createElement("li");
                    p1.innerHTML = paraText;
                    $('#ul' + index).append(p1);
                    $('#ul' + index).css('padding-left', '30px');
                }
                else // for normal text
                {
                    var paraText = $(val).find('w\\:r > w\\:t').text();
                    var p = document.createElement("p");
                    p.innerHTML = paraText;
                    element.appendChild(p);
                }
            }


            for (var j = 0; j <= $(val).find('w\\:drawing > wp\\:anchor > a\\:graphic > a\\:graphicData > pic\\:pic > pic\\:blipFill > a\\:blip').length; j++) {

                if ($(val).find('w\\:drawing > wp\\:anchor > a\\:graphic > a\\:graphicData > pic\\:pic > pic\\:blipFill > a\\:blip')[j] != undefined) {
                    // JS: Find imageData ID for the image
                    var embedId = $(val).find('w\\:drawing > wp\\:anchor > a\\:graphic > a\\:graphicData > pic\\:pic > pic\\:blipFill > a\\:blip')[j].getAttribute('r:embed');
                    // JS: Using imageData ID  find the Target XPath
                    var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
                    // JS: Using Target XPath find the base64 format of image data
                    // var imageData = $(openXML).find('pkg\\:part pkg\\:name="/word/' + target + '"] > pkg\\:binaryData').text();
                    var imageData = $(openXML).find('pkg\\:part > pkg\\:binaryData').text();

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
    },
    pasteData: function (openXML, element) {
        Main.showLoading();
        $(openXML).find('part > xmlData > document > body').children().each(function (index, val) {
            var arr = new Array();

            if ($(val).find('p > hyperlink')[0] != undefined)  // for hyperlink
            {
                if ($(val).find('pPr > numPr')[0] != undefined)  // If text contains any bullets
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
                    $('#ul' + index).css('padding-left', '30px');
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
                $(element).find('a').css('margin-left', '5px') // shilpa:27th may bug:8001
            }

            if ($(val).find('r > t')[0] != undefined && $(val).find('p > hyperlink')[0] == undefined) {
                if ($(val).find('pPr > numPr')[0] != undefined)  // If text contains any bullets
                {
                    var p = document.createElement("ul");
                    p.id = "ul" + index;
                    element.appendChild(p);
                    var paraText = $(val).find('r > t').text();
                    var p1 = document.createElement("li");
                    p1.innerHTML = paraText;
                    $('#ul' + index).append(p1);
                    $('#ul' + index).css('padding-left', '30px');
                }
                else // for normal text
                {
                    var paraText = $(val).find('r > t').text();
                    var p = document.createElement("p");
                    p.innerHTML = paraText;
                    element.appendChild(p);
                }
            }

            for (var j = 0; j <= $(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip').length; j++) {

                if ($(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip')[j] != undefined) {
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
    },

    SortMyActivity: function (column, order) {
        if (order.attr("order") == undefined) {
            membersForinitMAPagination = DashBoard.sortJSON(membersForinitMAPagination, column, 'asc');

            $("#celebsMA thead td").css("background-image", "none").removeClass("sorted").removeAttr("order");
            order.attr("order", 'asc').css("background-image", "url('../images/Sort-asc.png')").addClass("sorted");
        }
        else {
            if (order.attr("order") == 'asc') {
                membersForinitMAPagination = DashBoard.sortJSON(membersForinitMAPagination, column, 'desc');

                $("#celebsMA thead td").css("background-image", "none").removeClass("sorted");
                order.attr("order", 'desc').css("background-image", "url('../images/Sort-desc.png')").addClass("sorted");

            }
            else {
                membersForinitMAPagination = DashBoard.sortJSON(membersForinitMAPagination, column, 'asc');

                $("#celebsMA thead td").css("background-image", "none").removeClass("sorted");
                order.attr("order", 'asc').css("background-image", "url('../images/Sort-asc.png')").addClass("sorted");
            }
        }

        pageselectMACallback(parseInt($("#MyActPagination .pagination .current").text().replace("Prev", "").replace("Next", "")) - 1);
    },

    sortJSON: function (data, key, way) {
        return data.sort(function (a, b) {
            var x = a[key] == undefined ? "" : a[key]; var y = b[key] == undefined ? "" : b[key];
            if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    },

    /***********Added by Mohini***********/
    alertBox1: function (msg) {
        $("#div1").html(msg);
        $("#div1").dialog({ height: 150, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },

    alertBox2: function (msg) {
        $("#div2").html(msg);
        $("#div2").dialog({ height: 150, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },

    ExportExcel: function () {
        var projectID = "";
        if (!isPortfolioOn) {
            projectID = $("#dd option:selected").val();
        }
        else {
            if (DashBoard.isUserOtherThanTester) {
                if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                    projectID = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                else
                    projectID = $('#ddVersion').val();
            }
            else
                projectID = $("#versionDD option:selected").val();

        }



        var testerResult = ServiceLayer.GetData('ExportTestersParticipation', projectID, 'Dashboard');

        if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else {
            Main.showLoading();
            var stat = 0;
            try {
                var xlApp = new ActiveXObject("Excel.Application");
                stat = 1;
            }
            catch (ex) {
                Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
            }
            if (stat == 0) {
                Main.hideLoading();
                return;
            }
            try {
                xlApp.DisplayAlerts = false;
                var xlBook = xlApp.Workbooks.Add();
                xlBook.worksheets("Sheet1").activate;
                var XlSheet = xlBook.activeSheet;
                XlSheet.Name = " Active " + DashBoard.gConfigTester + "s Number";//Added by Mohini for Resource file
                var StartRow = 3;

                if (isPortfolioOn) //Code to execute if portfolio feauture is enabled :Ejaz Waquif DT:5/9/2014 
                {
                    StartRow = 4;
                    //Set Excel Column Headers and formatting from array
                    XlSheet.cells(1, 1).value = DashBoard.gConfigProject + " Name:";//Added by Mohini for Resource file			
                    XlSheet.cells(1, 1).font.colorindex = "2";
                    XlSheet.cells(1, 1).font.bold = "true";
                    XlSheet.cells(1, 1).font.Name = "calibri";
                    XlSheet.cells(1, 1).interior.colorindex = "16";

                    XlSheet.cells(1, 2).value = $("#dd option:selected").attr("title");
                    XlSheet.cells(1, 2).font.colorindex = "1";
                    XlSheet.cells(1, 2).font.bold = "true";
                    XlSheet.cells(1, 2).font.Name = "calibri";
                    XlSheet.cells(1, 2).interior.colorindex = "15";
                    XlSheet.cells(1, 3).interior.colorindex = "15";
                    XlSheet.cells(1, 4).interior.colorindex = "15";
                    XlSheet.cells(1, 5).interior.colorindex = "15";
                    XlSheet.cells(1, 6).interior.colorindex = "15";
                    XlSheet.cells(1, 7).interior.colorindex = "15";
                    XlSheet.cells(1, 8).interior.colorindex = "15";
                    XlSheet.cells(1, 9).interior.colorindex = "15";
                    XlSheet.cells(1, 10).interior.colorindex = "15";

                    XlSheet.cells(2, 1).value = DashBoard.gConfigVersion;//Added by Mohini for Resource file			
                    XlSheet.cells(2, 1).font.colorindex = "2";
                    XlSheet.cells(2, 1).font.bold = "true";
                    XlSheet.cells(2, 1).font.Name = "calibri";
                    XlSheet.cells(2, 1).interior.colorindex = "16";

                    if (DashBoard.isUserOtherThanTester) {
                        Version = $('#ddVersion option:selected').text();
                    }
                    else {
                        Version = $('#versionDD option:selected').text();
                    }

                    XlSheet.cells(2, 2).value = "'" + Version;
                    XlSheet.cells(2, 2).font.colorindex = "1";
                    XlSheet.cells(2, 2).font.bold = "true";
                    XlSheet.cells(2, 2).font.Name = "calibri";
                    XlSheet.cells(2, 2).interior.colorindex = "15";
                    XlSheet.cells(2, 3).interior.colorindex = "15";
                    XlSheet.cells(2, 4).interior.colorindex = "15";
                    XlSheet.cells(2, 5).interior.colorindex = "15";
                    XlSheet.cells(2, 6).interior.colorindex = "15";
                    XlSheet.cells(2, 7).interior.colorindex = "15";
                    XlSheet.cells(2, 8).interior.colorindex = "15";
                    XlSheet.cells(2, 9).interior.colorindex = "15";
                    XlSheet.cells(2, 10).interior.colorindex = "15";
                    //XlSheet.cells().NumberFormat = "@";
                    XlSheet.Range("B2:B2").NumberFormat = "@";


                    XlSheet.cells(3, 1).value = "Countries/" + DashBoard.gConfigArea;//Added by Mohini for Resource file
                    XlSheet.cells(3, 1).font.colorindex = "2";
                    XlSheet.cells(3, 1).font.bold = "false";
                    XlSheet.cells(3, 1).interior.colorindex = "23";


                    XlSheet.cells(3, 2).value = "No of " + DashBoard.gConfigTester + "s Assigned";//Added by Mohini for Resource file
                    XlSheet.cells(3, 2).font.colorindex = "2";
                    XlSheet.cells(3, 2).font.bold = "false";
                    XlSheet.cells(3, 2).interior.colorindex = "23";

                    XlSheet.cells(3, 3).value = "No of " + DashBoard.gConfigTester + "s Participated";//Added by Mohini for Resource file
                    XlSheet.cells(3, 3).font.colorindex = "2";
                    XlSheet.cells(3, 3).font.bold = "false";
                    XlSheet.cells(3, 3).interior.colorindex = "23";

                    XlSheet.cells(3, 4).value = "% Of Active " + DashBoard.gConfigTester + "s (Till Date)";//Added by Mohini for Resource file
                    XlSheet.cells(3, 4).font.colorindex = "2";
                    XlSheet.cells(3, 4).font.bold = "false";
                    XlSheet.cells(3, 4).interior.colorindex = "23";


                    XlSheet.Range("A1").EntireColumn.AutoFit();
                    XlSheet.Range("B1").EntireColumn.AutoFit();
                    XlSheet.Range("C1").EntireColumn.AutoFit();
                    XlSheet.Range("D1").EntireColumn.AutoFit();


                    XlSheet.Range("A1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("B1").EntireColumn.columnwidth = '24';
                    XlSheet.Range("C1").EntireColumn.columnwidth = '24';
                    XlSheet.Range("D1").EntireColumn.columnwidth = '27';

                    XlSheet.Range("A1").EntireColumn.WrapText = 'True';
                    XlSheet.Range("C1").EntireColumn.WrapText = 'True';
                    XlSheet.Range("D1").EntireColumn.WrapText = 'True';


                    XlSheet.Range("A1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("A1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("B1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("B1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("C1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("C1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("D1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("D1").EntireColumn.HorizontalAlignment = true;
                }
                else {
                    //Set Excel Column Headers and formatting from array
                    XlSheet.cells(1, 1).value = DashBoard.gConfigProject + " Name:";//Added by Mohini for Resource file			
                    XlSheet.cells(1, 1).font.colorindex = "2";
                    XlSheet.cells(1, 1).font.bold = "true";
                    XlSheet.cells(1, 1).font.Name = "calibri";
                    XlSheet.cells(1, 1).interior.colorindex = "16";

                    XlSheet.cells(1, 2).value = $("#dd option:selected").attr("title");
                    XlSheet.cells(1, 2).font.colorindex = "1";
                    XlSheet.cells(1, 2).font.bold = "true";
                    XlSheet.cells(1, 2).font.Name = "calibri";
                    XlSheet.cells(1, 2).interior.colorindex = "15";
                    XlSheet.cells(1, 3).interior.colorindex = "15";
                    XlSheet.cells(1, 4).interior.colorindex = "15";
                    XlSheet.cells(1, 5).interior.colorindex = "15";
                    XlSheet.cells(1, 6).interior.colorindex = "15";
                    XlSheet.cells(1, 7).interior.colorindex = "15";
                    XlSheet.cells(1, 8).interior.colorindex = "15";
                    XlSheet.cells(1, 9).interior.colorindex = "15";
                    XlSheet.cells(1, 10).interior.colorindex = "15";


                    XlSheet.cells(2, 1).value = "Countries/" + DashBoard.gConfigArea;//Added by Mohini for Resource file
                    XlSheet.cells(2, 1).font.colorindex = "2";
                    XlSheet.cells(2, 1).font.bold = "false";
                    XlSheet.cells(2, 1).interior.colorindex = "23";


                    XlSheet.cells(2, 2).value = "No of " + DashBoard.gConfigTester + "s Assigned";//Added by Mohini for Resource file
                    XlSheet.cells(2, 2).font.colorindex = "2";
                    XlSheet.cells(2, 2).font.bold = "false";
                    XlSheet.cells(2, 2).interior.colorindex = "23";

                    XlSheet.cells(2, 3).value = "No of " + DashBoard.gConfigTester + "s Participated";//Added by Mohini for Resource file
                    XlSheet.cells(2, 3).font.colorindex = "2";
                    XlSheet.cells(2, 3).font.bold = "false";
                    XlSheet.cells(2, 3).interior.colorindex = "23";

                    XlSheet.cells(2, 4).value = "% Of Active " + DashBoard.gConfigTester + "s (Till Date)";//Added by Mohini for Resource file
                    XlSheet.cells(2, 4).font.colorindex = "2";
                    XlSheet.cells(2, 4).font.bold = "false";
                    XlSheet.cells(2, 4).interior.colorindex = "23";


                    XlSheet.Range("A1").EntireColumn.AutoFit();
                    XlSheet.Range("B1").EntireColumn.AutoFit();
                    XlSheet.Range("C1").EntireColumn.AutoFit();
                    XlSheet.Range("D1").EntireColumn.AutoFit();


                    XlSheet.Range("A1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("B1").EntireColumn.columnwidth = '24';
                    XlSheet.Range("C1").EntireColumn.columnwidth = '24';
                    XlSheet.Range("D1").EntireColumn.columnwidth = '27';

                    XlSheet.Range("A1").EntireColumn.WrapText = 'True';
                    XlSheet.Range("C1").EntireColumn.WrapText = 'True';
                    XlSheet.Range("D1").EntireColumn.WrapText = 'True';


                    XlSheet.Range("A1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("A1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("B1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("B1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("C1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("C1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("D1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("D1").EntireColumn.HorizontalAlignment = true;
                }

                //Query on Tester list
                var testPassIds = new Array();
                //$("#testPassDD option").each(function () {

                //    testPassIds.push($(this).val());
                //});
                var testerRes2 = new Array();
                var uSPIDs = new Array();
                var rolesInProject = new Array();

                if (testerResult != null && testerResult != undefined) {
                    var area = new Array();
                    var forAreaGetSPID = new Array();
                    for (var i = 0; i < testerResult.length; i++) {
                        if ($.inArray(testerResult[i]['User_ID'].toString(), uSPIDs) == -1) {
                            uSPIDs.push(testerResult[i]['User_ID'].toString());
                            testerRes2.push(testerResult[i]);
                            DashBoard.gGetRolesBySPID[testerResult[i]['User_ID'].toString()] = new Array();

                            if ($.inArray(parseInt(testerResult[i]['MultiRoleStr']), DashBoard.gGetRolesBySPID[testerResult[i]['User_ID'].toString()]) == -1)
                                DashBoard.gGetRolesBySPID[testerResult[i]['User_ID'].toString()].push(testerResult[i]['MultiRoleStr']);
                        }
                        else {
                            if ($.inArray(parseInt(testerResult[i]['MultiRoleStr']), DashBoard.gGetRolesBySPID[testerResult[i]['User_ID'].toString()]) == -1)
                                DashBoard.gGetRolesBySPID[testerResult[i]['User_ID'].toString()].push(testerResult[i]['MultiRoleStr']);
                        }
                        if ($.inArray(testerResult[i]['MultiRoleStr'], rolesInProject) == -1)
                            rolesInProject.push(testerResult[i]['MultiRoleStr']);

                        if (testerResult[i]['Area_Name'] != undefined) {
                            var ar = "";
                            var flag = 0;
                            switch (testerResult[i]['Area_Name']) {
                                case "CEE": ar = "Central and Eastern Europe";
                                    break;
                                case "GCR": ar = "Greater China";
                                    break;
                                case "WE": ar = "Western Europe";
                                    break;
                                case "USA": ar = "United States";
                                    break;
                                default: ar = testerResult[i]['Area_Name'];
                            }
                        }
                        else
                            ar = 0;
                        if ($.inArray(ar, area) == -1)
                            area.push(ar);
                        if (forAreaGetSPID[ar] == undefined)
                            forAreaGetSPID[ar] = testerResult[i]['User_ID'].toString();
                        else {
                            var spids = forAreaGetSPID[ar].split(',');
                            if ($.inArray(testerResult[i]['User_ID'], spids) == -1) {
                                forAreaGetSPID[ar] += "," + testerResult[i]['User_ID'].toString();
                            }
                        }
                    }



                    var tsResults = new Array();
                    for (var i = 0; i < testerResult.length; i++) {
                        if (testerResult[i].Testing_started.toLowerCase() != 'no') {
                            if ($.inArray(testerResult[i]['User_ID'], tsResults) == -1) {
                                tsResults.push({ 'User_ID': testerResult[i]['User_ID'].toString() });
                            }
                        }

                    }

                    var totalTesters = 0;
                    var totalActive = 0;
                    var allActiveTesters = new Array();
                    for (var m = 0; m < tsResults.length; m++) {
                        if ($.inArray(tsResults[m]['User_ID'].toString(), allActiveTesters) == -1)
                            allActiveTesters.push(tsResults[m]['User_ID'].toString());
                    }
                    for (var i = 0; i < area.length; i++) {
                        var spids = forAreaGetSPID[area[i]].split(",");
                        totalTesters = totalTesters + spids.length;
                        var activeTesters = new Array();
                        for (var ii = 0; ii < spids.length; ii++) {
                            if ($.inArray(spids[ii], allActiveTesters) != -1)
                                activeTesters.push(spids[ii]);
                        }
                        if (area[i] != 0)
                            ar = area[i];
                        else
                            ar = "No " + DashBoard.gConfigArea + " Specified";//Added by Mohini for Resource file	

                        XlSheet.cells(i + StartRow, 1).value = ar;
                        XlSheet.cells(i + StartRow, 2).value = spids.length;
                        XlSheet.cells(i + StartRow, 3).value = activeTesters.length;
                        totalActive = totalActive + activeTesters.length;
                        var per = (activeTesters.length * 100) / spids.length;
                        per = Math.round(per);
                        per = per + "%";
                        XlSheet.cells(i + StartRow, 4).value = per;
                    }

                    XlSheet.cells(i + StartRow, 1).value = "Grand Total";
                    XlSheet.cells(i + StartRow, 1).font.bold = "true";
                    XlSheet.cells(i + StartRow, 2).value = totalTesters;
                    XlSheet.cells(i + StartRow, 2).font.bold = "true";
                    XlSheet.cells(i + StartRow, 3).value = totalActive;
                    XlSheet.cells(i + StartRow, 3).font.bold = "true";
                    var per = (totalActive * 100) / totalTesters;
                    per = Math.round(per);
                    XlSheet.cells(i + StartRow, 4).value = per + "%";
                    XlSheet.cells(i + StartRow, 4).font.bold = "true";

                    ///////////////////      Participate Status     ////////////////////////
                    var projInf = XlSheet;
                    sh = "Sheet2";
                    var flag = 0;
                    if (2 > xlBook.worksheets.count) {
                        flag = 1;
                        xlBook.worksheets.Add();
                    }
                    try
                    { xlBook.worksheets(sh).activate; }
                    catch (e)
                    { xlBook.worksheets.Add; }

                    var XlSheet = xlBook.activeSheet;
                    XlSheet.Name = "Participate " + DashBoard.gConfigStatus;//Added by Mohini for Resource file
                    //Set Excel Column Headers and formatting from array
                    XlSheet.cells(1, 1).value = DashBoard.gConfigProject;	//Added by Mohini for Resource file			
                    XlSheet.cells(1, 1).font.colorindex = "2";
                    XlSheet.cells(1, 1).font.bold = "true";
                    XlSheet.cells(1, 1).font.Name = "calibri";
                    XlSheet.cells(1, 1).interior.colorindex = "16";

                    XlSheet.cells(1, 2).value = $("#dd option:selected").attr("title");
                    XlSheet.cells(1, 2).font.colorindex = "1";
                    XlSheet.cells(1, 2).font.bold = "true";
                    XlSheet.cells(1, 2).font.Name = "calibri";
                    XlSheet.cells(1, 2).interior.colorindex = "15";
                    XlSheet.cells(1, 3).interior.colorindex = "15";
                    XlSheet.cells(1, 4).interior.colorindex = "15";
                    XlSheet.cells(1, 5).interior.colorindex = "15";
                    XlSheet.cells(1, 6).interior.colorindex = "15";
                    XlSheet.cells(1, 7).interior.colorindex = "15";
                    XlSheet.cells(1, 8).interior.colorindex = "15";
                    XlSheet.cells(1, 9).interior.colorindex = "15";
                    XlSheet.cells(1, 10).interior.colorindex = "15";

                    if (isPortfolioOn) {
                        XlSheet.cells(2, 1).value = DashBoard.gConfigVersion;	//Added by Mohini for Resource file			
                        XlSheet.cells(2, 1).font.colorindex = "2";
                        XlSheet.cells(2, 1).font.bold = "true";
                        XlSheet.cells(2, 1).font.Name = "calibri";
                        XlSheet.cells(2, 1).interior.colorindex = "16";
                        XlSheet.Range("B2:B2").NumberFormat = "@";

                        if (DashBoard.isUserOtherThanTester) {
                            Version = $('#ddVersion option:selected').text();
                        }
                        else {
                            Version = $('#versionDD option:selected').text();
                        }


                        XlSheet.cells(2, 2).value = "'" + Version;
                        XlSheet.cells(2, 2).font.colorindex = "1";
                        XlSheet.cells(2, 2).font.bold = "true";
                        XlSheet.cells(2, 2).font.Name = "calibri";
                        XlSheet.cells(2, 2).interior.colorindex = "15";
                        XlSheet.cells(2, 3).interior.colorindex = "15";
                        XlSheet.cells(2, 4).interior.colorindex = "15";
                        XlSheet.cells(2, 5).interior.colorindex = "15";
                        XlSheet.cells(2, 6).interior.colorindex = "15";
                        XlSheet.cells(2, 7).interior.colorindex = "15";
                        XlSheet.cells(2, 8).interior.colorindex = "15";
                        XlSheet.cells(2, 9).interior.colorindex = "15";
                        XlSheet.cells(2, 10).interior.colorindex = "15";


                        XlSheet.cells(3, 1).value = "SN";
                        XlSheet.cells(3, 1).font.colorindex = "2";
                        XlSheet.cells(3, 1).font.bold = "false";
                        XlSheet.cells(3, 1).interior.colorindex = "23";

                        XlSheet.cells(3, 2).value = DashBoard.gConfigTester + " Name";//Added by Mohini for Resource file
                        XlSheet.cells(3, 2).font.colorindex = "2";
                        XlSheet.cells(3, 2).font.bold = "false";
                        XlSheet.cells(3, 2).interior.colorindex = "23";

                        //<--Code added to show the role of tester :Ejaz Waquif DT:5/7/2014
                        XlSheet.cells(3, 3).value = DashBoard.gConfigRole;
                        XlSheet.cells(3, 3).font.colorindex = "2";
                        XlSheet.cells(3, 3).font.bold = "false";
                        XlSheet.cells(3, 3).interior.colorindex = "23";
                        //End of Code added to show the role of tester :Ejaz Waquif DT:5/7/2014-->

                        XlSheet.cells(3, 4).value = DashBoard.gConfigArea;
                        XlSheet.cells(3, 4).font.colorindex = "2";
                        XlSheet.cells(3, 4).font.bold = "false";
                        XlSheet.cells(3, 4).interior.colorindex = "23";

                        XlSheet.cells(3, 5).value = "Testing Started " + DashBoard.gConfigStatus;
                        XlSheet.cells(3, 5).font.colorindex = "2";
                        XlSheet.cells(3, 5).font.bold = "false";
                        XlSheet.cells(3, 5).interior.colorindex = "23";
                    }
                    else {


                        XlSheet.cells(2, 1).value = "SN";
                        XlSheet.cells(2, 1).font.colorindex = "2";
                        XlSheet.cells(2, 1).font.bold = "false";
                        XlSheet.cells(2, 1).interior.colorindex = "23";

                        XlSheet.cells(2, 2).value = DashBoard.gConfigTester + " Name";//Added by Mohini for Resource file
                        XlSheet.cells(2, 2).font.colorindex = "2";
                        XlSheet.cells(2, 2).font.bold = "false";
                        XlSheet.cells(2, 2).interior.colorindex = "23";

                        //<--Code added to show the role of tester :Ejaz Waquif DT:5/7/2014
                        XlSheet.cells(2, 3).value = DashBoard.gConfigRole;
                        XlSheet.cells(2, 3).font.colorindex = "2";
                        XlSheet.cells(2, 3).font.bold = "false";
                        XlSheet.cells(2, 3).interior.colorindex = "23";
                        //End of Code added to show the role of tester :Ejaz Waquif DT:5/7/2014-->

                        XlSheet.cells(2, 4).value = DashBoard.gConfigArea;
                        XlSheet.cells(2, 4).font.colorindex = "2";
                        XlSheet.cells(2, 4).font.bold = "false";
                        XlSheet.cells(2, 4).interior.colorindex = "23";

                        XlSheet.cells(2, 5).value = "Testing Started " + DashBoard.gConfigStatus;
                        XlSheet.cells(2, 5).font.colorindex = "2";
                        XlSheet.cells(2, 5).font.bold = "false";
                        XlSheet.cells(2, 5).interior.colorindex = "23";

                    }

                    XlSheet.Range("A1").EntireColumn.AutoFit();
                    XlSheet.Range("B1").EntireColumn.AutoFit();
                    XlSheet.Range("C1").EntireColumn.AutoFit();
                    XlSheet.Range("D1").EntireColumn.AutoFit();
                    XlSheet.Range("E1").EntireColumn.AutoFit();


                    XlSheet.Range("A1").EntireColumn.columnwidth = '15';
                    XlSheet.Range("B1").EntireColumn.columnwidth = '45';
                    XlSheet.Range("C1").EntireColumn.columnwidth = '30';
                    XlSheet.Range("D1").EntireColumn.columnwidth = '26';
                    XlSheet.Range("E1").EntireColumn.columnwidth = '20';

                    XlSheet.Range("C1").EntireColumn.WrapText = 'True';
                    XlSheet.Range("D1").EntireColumn.WrapText = 'True';
                    XlSheet.Range("E1").EntireColumn.WrapText = 'True';

                    XlSheet.Range("A1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("A1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("B1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("B1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("C1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("C1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("D1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("D1").EntireColumn.HorizontalAlignment = true;

                    XlSheet.Range("E1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("E1").EntireColumn.HorizontalAlignment = true;


                    for (var i = 0; i < testerRes2.length; i++) {
                        if (testerRes2[i]['Area_Name'] != undefined) {
                            var ar = "";
                            var flag = 0;
                            switch (testerRes2[i]['Area_Name']) {
                                case "CEE": ar = "Central and Eastern Europe";
                                    break;
                                case "GCR": ar = "Greater China";
                                    break;
                                case "WE": ar = "Western Europe";
                                    break;
                                case "USA": ar = "United States";
                                    break;
                                default: ar = testerRes2[i]['Area_Name'];
                            }
                        }
                        else
                            ar = "No " + DashBoard.gConfigArea + " Specified";//Added by Mohini for Resource file		

                        XlSheet.cells(i + StartRow, 1).value = i + 1;


                        XlSheet.cells(i + StartRow, 2).value = testerRes2[i]['Tester'].replace("&amp;", "&");

                        //To add the Role name in front of Testers :Ejaz Waquif DT:5/7/2014
                        var len = DashBoard.gGetRolesBySPID[testerRes2[i]['User_ID']].length;
                        var RoleString = '';
                        if (len != 0) {
                            RoleString = DashBoard.gGetRolesBySPID[testerRes2[i]['User_ID']][0];

                            for (var r = 1; r < len; r++) {
                                RoleString += ", " + DashBoard.gGetRolesBySPID[testerRes2[i]['User_ID']][r];
                            }
                        }
                        XlSheet.cells(i + StartRow, 3).value = RoleString;
                        //End of To add the Role name in front of Testers :Ejaz Waquif DT:5/7/2014

                        XlSheet.cells(i + StartRow, 4).value = ar;
                        //if ($.inArray(testerRes2[i]['User_ID'], allActiveTesters) != -1)
                        //    XlSheet.cells(i + StartRow, 5).value = "Yes";
                        //else
                        //    XlSheet.cells(i + StartRow, 5).value = "No";


                      
                            XlSheet.cells(i + StartRow, 5).value = testerRes2[i].Testing_started;
                       


                    }
                    //if(flag ==1)
                    {
                        projInf.activate;
                        projInf.Move(XlSheet);
                    }

                }
                else {
                    XlSheet.cells(5, 2).value = "No " + DashBoard.gConfigTester + " Assigned!"
                }
                xlApp.DisplayAlerts = true;
                xlApp.Visible = true;
                CollectGarbage();
                window.setTimeout("Main.hideLoading()", 200);
            }
            catch (err) {
                xlApp.Visible = true;
                alert(err.message);
                window.setTimeout("Main.hideLoading()", 200);
            }
        }


    },

    generateAllProjectStatus: function () {

        var totalCount = new Array(0, 0, 0);
        var AllVersionTestPassMarkup = '';

        $("#dd option").each(function () {

            var projectID = $(this).val();
            var projName = $(this).attr("title");

            if (projectID != "All " + DashBoard.gConfigProject + "s") {

                $.each(DashBoard.getAllVersionByProjName[projName], function (ind1, itm1) {
                    var projID = itm1["ProjectID"];
                    if (DashBoard.getPIdStatus[projID] == undefined) {
                        if (DashBoard.getAllTPByPid[projID] == undefined) {
                            DashBoard.fillTestPass(projID);
                        }

                        if (DashBoard.getAllTPByPid[projID] != undefined) {

                            var totalPass = 0;
                            var totalFail = 0;
                            var totalNC = 0;

                            $.each(DashBoard.getAllTPByPid[projID], function (ind, itm) {

                                //To bind all the version Test Pass in Test Pass DD
                                AllVersionTestPassMarkup += '<option title="' + itm.split(",")[1] + '" value="' + itm.split(",")[0] + '">' + itm.split(",")[1] + '</option>';

                                //var data = DashBoard.calcProjectStatus(itm.split(",")[0] , itm.split(",")[1] , 1);
                                var data = DashBoard.getTPStatusByTPID[itm.split(",")[0]].split(",");

                                if (data != undefined) {
                                    totalPass += parseInt(data[0]);
                                    totalFail += parseInt(data[1]);
                                    totalNC += parseInt(data[2]);

                                    if (data[0] != 0 && data[1] != 0 && data[2] != 0)
                                        DashBoard.getTPIdStatus[itm.split(",")[0]] = DashBoard.getPercentageByCount(data);
                                    else
                                        DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);
                                }
                                else
                                    DashBoard.getTPIdStatus[itm.split(",")[0]] = new Array(0, 0, 0);


                            });

                            if (parseInt(totalPass + totalFail + totalNC) != 0) {
                                DashBoard.getPIdStatus[projID] = DashBoard.getPercentageByCount(new Array(totalPass, totalFail, totalNC));
                                DashBoard.getPIDStatusAsCount[projID] = new Array(totalPass, totalFail, totalNC);

                                totalCount[0] += totalPass;
                                totalCount[1] += totalFail;
                                totalCount[2] += totalNC;

                            }
                        }
                    }
                    else {
                        totalCount[0] += DashBoard.getPIDStatusAsCount[projID][0];
                        totalCount[1] += DashBoard.getPIDStatusAsCount[projID][1];
                        totalCount[2] += DashBoard.getPIDStatusAsCount[projID][2];

                        $.each(DashBoard.getAllTPByPid[projID], function (ind2, itm2) {
                            //To bind all the version Test Pass in Test Pass DD
                            AllVersionTestPassMarkup += '<option title="' + itm2.split(",")[1] + '" value="' + itm2.split(",")[0] + '">' + itm2.split(",")[1] + '</option>';
                        });


                    }

                    //============

                });

            }


        });


        if (totalCount[0] + totalCount[1] + totalCount[2] != 0) {
            var projectStatus = DashBoard.getPercentageByCount(totalCount);

            $('#noTestPases').css('display', 'none');
            $('#pieChartProject').show();
            $('#divDetailAnalysisLink').show();

            //Changed below to remove Completed status
            var onLoadplot = [$.gchart.series(projectStatus, ['green', 'orange', 'red'])];

            //Changed below to remove Completed status
            var d = 'Pass|NC|Fail';
            $('#pieChartProject').gchart({
                type: '3dpie',
                series: onLoadplot,
                legend: 'right',
                extension: { chdl: d },
                // title:'Status(in %)', 
                titleColor: 'orange',
                backgroundColor: 'white',
                dataLabels: projectStatus
            });
            $('#pieChartProject').gchart('change', { series: onLoadplot, dataLabels: projectStatus });


        }

        if (AllVersionTestPassMarkup == '') {
            $("#testPassDD").html("<option>No " + DashBoard.gConfigTestPass + " Available</option>");//Added by Mohini for Resource file
        }
        else {
            $("#testPassDD").html(AllVersionTestPassMarkup);
            $("#testPassDD").change();
        }



    },

    bindDetailAnalysisData: function () {

        var pid = $('#dd').val();

        if (DashBoard.isUserOtherThanTester) {
            if (isPortfolioOn) {
                if ($('#ddVersion').val() == 'All ' + DashBoard.gConfigVersion + 's')
                    pid = DashBoard.getPIdByTPID[$('#testPassDD option:selected').val()];
                else
                    pid = $('#ddVersion').val();
            }

        }
        else {
            if (isPortfolioOn)
                pid = $('#versionDD').val();

            $('#noTestCases').css('margin-top', '-135px');
        }

        $('#divDetailAnalysisLink').html('<b><a title="' + DashBoard.gDetailAnalysisTitle + '" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right" href="Dashboard/analysis?pid=' + pid + '&tpid=' + $('#testPassDD').val() + '">Detailed ' + DashBoard.gConfigAnalysis + '</a></b>');//Added by Mohini for Resource file
        var userAsso = new Array();
        if (security.userAssociationForProject[pid] != undefined)
            userAsso = security.userAssociationForProject[pid];
        if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
            $('#divDetailAnalysisLink').append('<b><a title="' + DashBoard.gNoOfTestTitle + '" id="TesterCount" class="btnTestingStatus tTipdetailed" style="color:#0033CC;cursor: pointer;font-size:14px;float:right;" onclick="Main.showLoading();window.setTimeout(\'DashBoard.ExportExcel()\',200)">No. of ' + DashBoard.gConfigTester + 's Participated</a></b> ');//Added on 6 Dec 2013//Added by Mohini for Resource file

        if ($('#pieChart').is(':hidden'))
            $('#divDetailAnalysisLink').find('a').css('margin-top', '130px');


    },

    ChangeDivAanalysisBtnMargin: function () {
        if ($("#divDetailAnalysisLink").children().length < 2)
            $("#noTestCases").css("margin-top", "20px");


    },

    getDataFromService: function () {

        //call the service layer to get data

        var DataCollection;
        DashBoard.dataCollection = ServiceLayer.GetData("GetDashboardData", undefined, 'Dashboard');
        DataCollection = DashBoard.dataCollection;
        if (DataCollection != undefined) {
            var len = DataCollection.length;
            for (var i = 0; i < len; i++) {

                DataCollection[i].portfolio = DataCollection[i].portfolioName;
                try {
                    if (DataCollection[i].hasOwnProperty("projectLead")) {
                        DataCollection[i].projectLeadAlias = $(DataCollection[i].projectLead).find("userAlias").text();
                        DataCollection[i].projectLeadEmail = $(DataCollection[i].projectLead).find("userEmail").text();
                        DataCollection[i].projectLeadSPUserId = $(DataCollection[i].projectLead).find("spUserId").text();
                    }
                    if (DataCollection[i].hasOwnProperty("testManagerDetails")) {
                        DataCollection[i].testManagerAlias = $(DataCollection[i].testManagerDetails).find("userName").text();
                        DataCollection[i].testManagerEmail = $(DataCollection[i].testManagerDetails).find("userEmail").text();
                        DataCollection[i].testManagerSPUserId = $(DataCollection[i].testManagerDetails).find("spUserId").text();
                    }
                    if (DataCollection[i].hasOwnProperty("testPassName")) { DataCollection[i].testpassName = DataCollection[i].testPassName }
                    if (DataCollection[i].hasOwnProperty("testPassId")) { DataCollection[i].testpassId = DataCollection[i].testPassId }
                    if (DataCollection[i].hasOwnProperty("failCount")) { DataCollection[i].failcount = DataCollection[i].failCount }
                    if (DataCollection[i].hasOwnProperty("daysRemain")) {
                        DataCollection[i].daysRemain = parseInt(DataCollection[i].daysRemain) < 0 ? "0" : DataCollection[i].daysRemain;
                        DataCollection[i].tpEndDtPassed = parseInt(DataCollection[i].daysRemain) < 0 ? "1" : "0"
                    }
                    if (DataCollection[i].hasOwnProperty("roleName")) { DataCollection[i].role = DataCollection[i].roleName }
                    if (DataCollection[i].hasOwnProperty("action")) {
                        DataCollection[i].action = DataCollection[i].action == null ? "" : DataCollection[i].action;
                    }
                } catch (e) {
                    alert(e.message);
                }


            }
        }




        DashBoard.dataCollection = [];
        DashBoard.dataCollection = DataCollection;
        var Urls = CheckUrl();
        if (Urls.toLowerCase() == 'dashboard') {
            setTimeout('initPagination();initMAPagination();DashBoard.initDashboardPage();', 100);
        }


    },

    //To get My Activity data
    getActivityData: function () {

        //SMP:
        var myactivitydata = $.grep(DashBoard.dataCollection, function (item) {

            if ((item.testerspuserid == _spUserId) && (item.spuserid == _spUserId) && (item.action != "")) {
                return true;
            }

        });

        var myActivityData = $.grep(DashBoard.dataCollection, function (item) {

            if ((item.testerSPUserId == _spUserId) && (item.action != "")) {
                return true;
            }

        });


        return myActivityData;


    }
}

