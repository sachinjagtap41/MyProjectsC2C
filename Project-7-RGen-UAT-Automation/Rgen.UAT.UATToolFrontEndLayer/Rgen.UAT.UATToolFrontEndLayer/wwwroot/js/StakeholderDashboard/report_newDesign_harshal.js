/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/


var report = {

    //variable for data from WCF
    dataCollection: new Array(),
    testStepCollection: new Array(),
    passFailNCCountByPID: new Array(),
    projectIds: new Array(),
    TestersStartedTestingByPID: new Array(),
    //End variable for data from WCF	
    SiteURL: '',//$().SPServices.SPGetCurrentSite(),
    index: 0,
    TPFlag: 0,
    calcProjectStataForTPID: new Array(),

    currentYear: '',
    currentQuarter: '',
    userAssociationForPID: new Array(),
    userType: new Array(),

    arrSeriesPie: [],
    arrSeries: [],
    arrTesterName: [],
    forTesterNameSPID: [],
    /**********Variables Added For Resource File by Mohini(25-02-2014)******************/
    gConfigProject: 'Project',
    gConfigTestPass: 'Test Pass',
    gConfigTestCase: 'Test Case',
    gConfigTestStep: 'Test Step',
    gConfigStatus: 'Status',
    gConfigTester: 'Tester',
    gConfigGroup: 'Group',
    gConfigPortfolio: 'Portfolio',
    gConfigVersion: 'Version',

    /****Portfolio Variables:Mohini Date:04-03-2014******/
    isPortfolioOn: false,
    gArrForGroup: new Array(),
    gArrGroupPortfolioForPIDs: new Array(),
    versionNameForPID: new Array(),
    portfolioForGroup: new Array(),
    uniqueGroupName: new Array(),
    projectIDsForSelectedGroupPortfolio: '',

    arrTotalTester: new Array(),
    pageLoad: function () {

        $("ul li a:eq(8)").attr('class', 'selHeading');

        report.arrSeriesPie[0] = "Pass";
        report.arrSeriesPie[1] = "Not Completed";
        report.arrSeriesPie[2] = "Fail";
        report.arrSeriesPie[3] = "Executed";

        report.arrSeries[1] = "Pass";
        report.arrSeries[2] = "Fail";
        report.arrSeries[3] = "Not Completed";
        //<--------+++---------
        ///////////////////// Fiscal Year  ///////////////////////////
        report2.q1[0] = 7;
        report2.q1[1] = 8;
        report2.q1[2] = 9;

        report2.q2[0] = 10;
        report2.q2[1] = 11;
        report2.q2[2] = 12;

        report2.q3[0] = 1;
        report2.q3[1] = 2;
        report2.q3[2] = 3;

        report2.q4[0] = 4;
        report2.q4[1] = 5;
        report2.q4[2] = 6;

        var currentDate = new Date();
        var currMonth = currentDate.getMonth() + 1;

        /*modified by Mohini to make fical year changes dynamic 04-07-2014*/
        var year = currentDate.getFullYear();
        year = year.toString();
        year = year.substring(2, year.length);

        var year1 = currentDate.getFullYear() + 1;
        year1 = year1.toString();
        year1 = year1.substring(2, year1.length);

        if ($.inArray(currMonth, report2.q1) != -1) {
            var len = parseInt(year1);
            for (var i = 14; i <= len; i++) {
                report2.arrfy.push("fy" + i);
                report2.arrfyYear["fy" + i] = "20" + i - 1;
                $('#setFiscal').append('<option value="fy' + i + '">FY ' + i + '</option>');
            }

            report2.currentQuarter = "q1";
            $('#q1').attr('checked', 'checked');
            $('#setFiscal').val('fy' + year1);
            report2.currentYear = 'fy' + year1;
        }
        else if ($.inArray(currMonth, report2.q2) != -1) {
            var len = parseInt(year1);
            for (var i = 14; i <= len; i++) {
                report2.arrfy.push("fy" + i);
                report2.arrfyYear["fy" + i] = "20" + i - 1;
                $('#setFiscal').append('<option value="fy' + i + '">FY ' + i + '</option>');
            }

            report2.currentQuarter = "q2";
            $('#q2').attr('checked', 'checked');
            $('#setFiscal').val('fy' + year1);
            report2.currentYear = 'fy' + year1;
        }
        else if ($.inArray(currMonth, report2.q3) != -1) {
            var len = parseInt(year);
            for (var i = 14; i <= len; i++) {
                report2.arrfy.push("fy" + i);
                report2.arrfyYear["fy" + i] = "20" + i - 1;
                $('#setFiscal').append('<option value="fy' + i + '">FY ' + i + '</option>');
            }

            report2.currentQuarter = "q3";
            $('#q3').attr('checked', 'checked');
            $('#setFiscal').val('fy' + year);
            report2.currentYear = 'fy' + year;
        }
        else {
            if ($.inArray(currMonth, report2.q4) != -1) {
                var len = parseInt(year);
                for (var i = 14; i <= len; i++) {
                    report2.arrfy.push("fy" + i);
                    report2.arrfyYear["fy" + i] = "20" + i - 1;
                    $('#setFiscal').append('<option value="fy' + i + '">FY ' + i + '</option>');
                }

                report2.currentQuarter = "q4";
                $('#q4').attr('checked', 'checked');
                $('#setFiscal').val('fy' + year);
                report2.currentYear = 'fy' + year;
            }
        }
        /////////////////////////////////////////////////////////////

        $(".rptTesterDetails").hide();

        var projectItems = report.dataCollection;
        if (projectItems != null && projectItems != undefined) {
            report.projectItems = projectItems;
        }

        if (isPortfolioOn) {
            $("#dvCon").click(
				function () {
				    if ($("#dvCon").parent(".ui-state-active").length == 0)// Code modified to call the function only if Consolidated tab is In active |Ejaz Waquif DT:Dec/18/2014 
				    {
				        Main.showLoading(); setTimeout('report2.todayFilterPortfolio();', 200);
				    }
				}
			);
            $("#dvCon").click();
        }
        else {
            $("#tbTitle tr:eq(0) td:eq(0)").hide();
            $("#tbTitle tr:eq(0) td:eq(1)").hide();
            $("#tbTitle tr:eq(0) td:eq(3)").hide();
            $("#dvConView #tbTitle tr:eq(0) td:eq(1)").hide();
            $("#tblTP tr:eq(0) td:eq(1)").hide();
            $("#dvCon").click(
				function () {
				    if ($("#dvCon").parent(".ui-state-active").length == 0) // Code modified to call the function only if Consolidated tab is In active |Ejaz Waquif DT:Dec/18/2014 
				    {
				        Main.showLoading(); setTimeout('report2.todayFilter();', 200);
				    }
				}
			);
            $("#dvCon").click();
            $(".DivlblWithColon").hide();
        }


        Main.hideLoading();
    },
    detailedViewClick: function () {
        $("#setStatus").val("Active");
        $("#setFilter").val('1');
        $("#dvCalender").hide();
        $("#setFiscal").val(report2.currentYear);
        $("#quarter input").each(function () {
            $(this).attr('checked', false);
        });
        $("#" + report2.currentQuarter).attr('checked', true);
        report.showDataForFilter(1);
    },
    currDD: '',
    showDataForFilter: function (currDD, q) {
        report.currDD = currDD;
        report.minDate = '';
        report.maxDate = '';
        var flag = 0;
        var max = '';
        var min = '';
        var projectItems = new Array();
        if (currDD == "0")//If Project status DD change 
        {

            if ($("#setStatus").val() == "All") {
                if (isPortfolioOn)
                    report.getProjectsForLogInUserPortfolio(report.projectItems);
                else
                    report.getProjectsForLogInUser(report.projectItems);
                //report.getProjectsForLogInUserPortfolio(report.projectItems);
                flag = 1;
            }
            else if ($("#setStatus").val() == "Active") {
                var d = new Date();
                var curr_date = d.getDate();
                if (curr_date.toString().length == 1)
                    curr_date = "0" + curr_date;
                var curr_month = (d.getMonth() + 1);
                if (curr_month.toString().length == 1)
                    curr_month = "0" + curr_month;
                var curr_year = d.getFullYear();
                //min = curr_year+"-"+curr_month+"-"+curr_date+" "+"00:00:00";
                //max = "2020-12-31"+" "+"23:59:59";

                min = new Date(curr_month + "/" + curr_date + "/" + curr_year + " 00:00:00");
                max = new Date("12/31/2020 23:59:59");


                for (var i = 0; i < report.projectItems.length; i++) {
                    //modified for date format 20/10/2016
                    if (report.projectItems[i].projectEndDate != null || report.projectItems[i].projectEndDate != undefined) {
                        report.projectItems[i].projectEndDate = report.projectItems[i].projectEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                    if (min <= new Date(report.projectItems[i]['projectEndDate']))
                        projectItems.push(report.projectItems[i]);
                }
                if (isPortfolioOn)
                    report.getProjectsForLogInUserPortfolio(projectItems);
                else
                    report.getProjectsForLogInUser(projectItems);

                //report.getProjectsForLogInUserPortfolio(projectItems);
                flag = 1;
            }
            else if ($("#setStatus").val() == "Completed") {
                var d = new Date();
                d.setDate(d.getDate() - 1);
                var curr_date = d.getDate();
                if (curr_date.toString().length == 1)
                    curr_date = "0" + curr_date;
                var curr_month = (d.getMonth() + 1);
                if (curr_month.toString().length == 1)
                    curr_month = "0" + curr_month;
                //min = '2013-01-01'+" "+"00:00:00";
                //max = d.getFullYear() + '-' + curr_month + '-' + curr_date+" "+"23:59:59";

                min = new Date("01/01/2013");
                max = new Date(curr_month + "/" + curr_date + "/" + d.getFullYear() + " 23:59:59");

                for (var i = 0; i < report.projectItems.length; i++) {
                    if (new Date(report.projectItems[i]['projectEndDate']) <= max)
                        projectItems.push(report.projectItems[i]);
                }
                if (isPortfolioOn)
                    report.getProjectsForLogInUserPortfolio(projectItems);
                else
                    report.getProjectsForLogInUser(projectItems);
                //report.getProjectsForLogInUserPortfolio(projectItems);
                flag = 1;
            }
        }

        if (flag == 0) {
            projectItems = report.projectItems;

            $('#executedTable').show();
            $("#execLegend").show();

            $("#tpAllCons").css("color", "white");
            $("#tpPassCons").css("color", "white");
            $("#tpNCCons").css("color", "white");
            $("#tpFailCons").css("color", "white");
            $("#tpExecCons").css("color", "white");
            var onLoadpdata = new Array();

            if (currDD == "2")//For Fiscal Year DD and Quarter checkbox
            {
                $("#setStatus").val("All");
                $("#setFilter").val("Select");
                var count = 0;
                var year;
                year = report2.arrfyYear[$('#setFiscal option:selected').val()];
                year = parseInt(year);
                var year1 = year + 1;

                $("#quarter input").each(function () {
                    if ($(this).attr('checked')) {
                        if ($('#q1').attr('checked') == true)
                            count++;

                        if ($('#q2').attr('checked') == true)
                            count++;

                        if ($('#q3').attr('checked') == true)
                            count++;

                        if ($('#q4').attr('checked') == true)
                            count++;

                        return false;
                    }
                });
                if (count == 0) {
                    report.alertBox("Please select any one quarter!");
                    $("#q" + q).attr('checked', true);
                    Main.hideLoading();
                    return;
                }
                $("#dvCalender").hide();
            }
            var lastSevenDays = false;
            if (currDD == "1")//If Date Filter DD is changed
            {
                switch ($("#setFilter").val()) {
                    case "Dates":
                        var startDate = new Date($("#startDate").val());
                        var endDate = new Date($("#endDate").val());

                        if ($("#startDate").val() == "" || $("#endDate").val() == "") {
                            report.alertBox('Please select date!');
                            Main.hideLoading();
                            return;
                        }
                            //else if($("#startDate").val()>$("#endDate").val())
                        else if (startDate > endDate) {
                            report.alertBox('To date should always be greater than or equal to From date!');
                            Main.hideLoading();
                            return;
                        }
                        else {
                            var dateString2 = $("#endDate").val();
                            var systemDate2 = new Date();
                            var ftime = String(systemDate2.getHours()) + ':' + String(systemDate2.getMinutes()) + ':' + String(systemDate2.getSeconds());
                            max = dateString2.charAt(6) + dateString2.charAt(7) + dateString2.charAt(8) + dateString2.charAt(9) + '-' + dateString2.charAt(0) + dateString2.charAt(1) + '-' + dateString2.charAt(3) + dateString2.charAt(4) + " " + "23:59:59";

                            var dateString2 = $("#startDate").val();
                            var systemDate2 = new Date();
                            var ftime = String(systemDate2.getHours()) + ':' + String(systemDate2.getMinutes()) + ':' + String(systemDate2.getSeconds());
                            min = dateString2.charAt(6) + dateString2.charAt(7) + dateString2.charAt(8) + dateString2.charAt(9) + '-' + dateString2.charAt(0) + dateString2.charAt(1) + '-' + dateString2.charAt(3) + dateString2.charAt(4) + " " + "00:00:00";

                        }
                        break;
                    case "1":
                        var d = new Date();
                        var curr_date = d.getDate();
                        if (curr_date.toString().length == 1)
                            curr_date = "0" + curr_date;
                        var curr_month = (d.getMonth() + 1);
                        if (curr_month.toString().length == 1)
                            curr_month = "0" + curr_month;
                        var curr_year = d.getFullYear();
                        min = curr_year + "-" + curr_month + "-" + curr_date + " " + "00:00:00";
                        max = curr_year + "-" + curr_month + "-" + curr_date + " " + "23:59:59";//d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();

                        /* Export to ppt */
                        var pdate = curr_month + "/" + curr_date + "/" + curr_year;
                        ppt.pptDate.push(new Date(pdate));
                        ppt.pptDate1.push(new Date(pdate));
                        break;
                    case "2":
                        var d = new Date();
                        d.setDate(d.getDate() - 1);
                        var curr_date = d.getDate();
                        if (curr_date.toString().length == 1)
                            curr_date = "0" + curr_date;
                        var curr_month = (d.getMonth() + 1);
                        if (curr_month.toString().length == 1)
                            curr_month = "0" + curr_month;
                        min = d.getFullYear() + '-' + curr_month + '-' + curr_date + " " + "00:00:00";
                        max = d.getFullYear() + '-' + curr_month + '-' + curr_date + " " + "23:59:59";

                        /* Export to ppt */
                        var pptBetDate = new Array();
                        var pptBetDate1 = new Array();
                        var pptCurrDate = new Date();
                        pptCurrDate.setDate(pptCurrDate.getDate() - 1);
                        pptBetDate.push(new Date(pptCurrDate));
                        pptBetDate1.push(new Date(pptCurrDate));
                        ppt.pptDate = pptBetDate;
                        ppt.pptDate1 = pptBetDate1;
                        break;
                    case "7":
                        var d = new Date();
                        d.setDate(d.getDate() - 7);
                        var curr_date = d.getDate();
                        if (curr_date.toString().length == 1)
                            curr_date = "0" + curr_date;
                        var curr_month = (d.getMonth() + 1);
                        if (curr_month.toString().length == 1)
                            curr_month = "0" + curr_month;
                        min = d.getFullYear() + '-' + curr_month + '-' + curr_date + " " + "00:00:00";
                        var d = new Date();
                        d.setDate(d.getDate() - 1);
                        var curr_date = d.getDate();
                        if (curr_date.toString().length == 1)
                            curr_date = "0" + curr_date;
                        var curr_month = (d.getMonth() + 1);
                        if (curr_month.toString().length == 1)
                            curr_month = "0" + curr_month;
                        max = d.getFullYear() + '-' + curr_month + '-' + curr_date + " " + "23:59:59";
                        lastSevenDays = true;
                        break;
                }
            }

            if (min.toString().indexOf("-") != -1) {
                max = new Date((max).replace(/\-/g, '/'));
                min = new Date((min).replace(/\-/g, '/'));
            }

            var showFlagDate = 0;
            if (projectItems != null && projectItems != undefined) {
                var pItems = new Array();
                for (var i = 0; i < projectItems.length; i++) {
                    showFlagDate = 0;

                    //modified for date format 20/10/2016
                    if (projectItems[i].projectEndDate != null || projectItems[i].projectEndDate != undefined) {
                        projectItems[i].projectEndDate = projectItems[i].projectEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }
                    var projStart = new Date(projectItems[i]['projectStartDate']);

                    var projEnd = new Date(projectItems[i]['projectEndDate']);


                    if ($("#setFilter").val() == "Dates") {
                        if ((min <= projStart && max >= projStart) || (projEnd >= min && projEnd <= max) || (projStart <= min && projEnd >= max))
                            showFlagDate = 1;
                    }
                    else if (currDD == "2") {
                        $("#quarter input").each(function () {
                            if ($(this).attr('checked')) {
                                if ($('#q1').attr('checked') == true) {

                                    min = new Date("07/01/" + year + " 00:00:00");
                                    max = new Date("09/30/" + year + " 23:59:59");

                                    if ((min <= projStart && max >= projStart) || (projEnd >= min && projEnd <= max) || (projStart <= min && projEnd >= max)) {
                                        showFlagDate = 1;
                                        return false;
                                    }
                                }

                                if ($('#q2').attr('checked') == true) {
                                    min = new Date("10/01/" + year + " 00:00:00");
                                    max = new Date("12/31/" + year + " 23:59:59");

                                    if ((min <= projStart && max >= projStart) || (projEnd >= min && projEnd <= max) || (projStart <= min && projEnd >= max)) {
                                        showFlagDate = 1;
                                        return false;
                                    }
                                }

                                if ($('#q3').attr('checked') == true) {
                                    min = new Date("01/01/" + year1 + " 00:00:00");
                                    max = new Date("03/31/" + year1 + " 23:59:59");

                                    if ((min <= projStart && max >= projStart) || (projEnd >= min && projEnd <= max) || (projStart <= min && projEnd >= max)) {
                                        showFlagDate = 1;
                                        return false;
                                    }
                                }

                                if ($('#q4').attr('checked') == true) {
                                    min = new Date("04/01/" + year1 + " 00:00:00");
                                    max = new Date("06/30/" + year1 + " 23:59:59");

                                    if ((min <= projStart && max >= projStart) || (projEnd >= min && projEnd <= max) || (projStart <= min && projEnd >= max)) {
                                        showFlagDate = 1;
                                        return false;
                                    }
                                }
                            }
                        });

                    }
                    else {

                        if (lastSevenDays) {
                            if (!(projEnd < min && projStart < min) && !(projEnd > max && projStart > max))
                                showFlagDate = 1;
                        }
                        else {
                            if ((min >= projStart && min <= projEnd) || (projEnd >= max && projStart <= max))
                                showFlagDate = 1;
                        }

                    }
                    if (showFlagDate == 1)
                        pItems.push(projectItems[i]);
                }
            }
            report.minDate = min;
            report.maxDate = max;
            if (isPortfolioOn)
                report.getProjectsForLogInUserPortfolio(pItems);
            else
                report.getProjectsForLogInUser(pItems);
        }
        Main.hideLoading();
        //----------+++------->

    },
    getProjectsForLogInUser: function (projectItems) {

        //report.projectItems = report.dataCollection;

        if (projectItems != undefined && projectItems != null) {
            report.projectsDetailView(projectItems);
        }
    },

    //If Portfolio Feature is On:-Added by Mohini| modified for WCF |Ejaz Waquif DT:11/18/2014 
    getProjectsForLogInUserPortfolio: function (projectItems) {
        $("#dvConView").show();

        //var projectItems = report.dataCollection;

        //Initialise all global variables
        report.projectNameForPID = new Array();

        report.versionNameForPID = new Array();

        report.allProjectIDs = new Array();

        report.TPNameForTPID = new Array();

        report.tpInfoForProjectIDs = new Array();

        report.projectsDetailsByPID = new Array();

        report.pieDataForAllProjectIDs = new Array();

        report.pieDataForTPIDs = new Array();

        report.gArrGroupPortfolioForPIDs = new Array();

        report.uniqueGroupName = new Array();


        if (projectItems != null && projectItems != undefined) {
            //report.projectItems = projectItems;

            var markupGroup = '';

            var markupPortfolio = '';

            flag = 0;

            for (var i = 0; i < projectItems.length; i++) {

                report.gArrForGroup[projectItems[i].projectId] = projectItems[i].groupName == undefined || projectItems[i].groupName == null || projectItems[i].groupName == "" ? 'Default ' + report.gConfigGroup : projectItems[i].groupName;

                var groupName = projectItems[i].groupName == undefined || projectItems[i].groupName == null || projectItems[i].groupName == "" ? 'Default ' + report.gConfigGroup : projectItems[i].groupName;

                var portfolioName = projectItems[i].portfolioName == undefined || projectItems[i].portfolioName == null || projectItems[i].portfolioName == "" ? 'Default ' + report.gConfigPortfolio : projectItems[i].portfolioName;

                if (report.gArrGroupPortfolioForPIDs[groupName + "~" + portfolioName] == undefined) {
                    report.gArrGroupPortfolioForPIDs[groupName + "~" + portfolioName] = new Array();

                    report.gArrGroupPortfolioForPIDs[groupName + "~" + portfolioName].push(projectItems[i].projectId);
                }
                else {
                    if ($.inArray(projectItems[i].projectId, report.gArrGroupPortfolioForPIDs[groupName + "~" + portfolioName]) == -1) {
                        report.gArrGroupPortfolioForPIDs[groupName + "~" + portfolioName].push(projectItems[i].projectId);
                    }
                }
                if (groupName != 'Default ' + report.gConfigGroup) {
                    if (report.portfolioForGroup[groupName] == undefined) {
                        report.portfolioForGroup[groupName] = portfolioName;
                    }
                    else {
                        if (report.portfolioForGroup[groupName].indexOf(portfolioName) == -1)
                            report.portfolioForGroup[groupName] += "," + portfolioName;
                    }
                }
                if ($.inArray(groupName, report.uniqueGroupName) == -1) {
                    report.uniqueGroupName.push(groupName);
                }


                //Fill the global Arrays for further references
                report.projectNameForPID[projectItems[i].projectId] = projectItems[i].projectName;

                report.versionNameForPID[projectItems[i].projectId] = projectItems[i].projectVersion == undefined || projectItems[i].projectVersion == null || projectItems[i].projectVersion == "" ? 'Default ' + report.gConfigVersion : projectItems[i].projectVersion;

                report.TPNameForTPID[projectItems[i].testPassId] = projectItems[i].testPassName;

                //modified for date format 20/10/2016
                var tpEndDate = projectItems[i].tpEndDate;
                if (tpEndDate != null || tpEndDate != undefined) {
                    tpEndDate = tpEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }

                if (report.tpInfoForProjectIDs[projectItems[i].projectId] == undefined)
                    report.tpInfoForProjectIDs[projectItems[i].projectId] = projectItems[i].testPassId + "~" + projectItems[i].testManagerName + "~" + projectItems[i].tpEndDate;
                else
                    report.tpInfoForProjectIDs[projectItems[i].projectId] += "`" + projectItems[i].testPassId + "~" + projectItems[i].testManagerName + "~" + projectItems[i].tpEndDate;


                //Project details markup
                if (report.projectsDetailsByPID[projectItems[i].projectId] == undefined) {
                    var userAsso = [];

                    var details = "";

                    if (security.userAssociationForProject[projectItems[i].projectId] != undefined)
                        userAsso = security.userAssociationForProject[projectItems[i].projectId];

                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        details = '<tr><td><input id="' + projectItems[i].projectId + '" class="chkProj" onclick="report.projectCheckForDetails(' + projectItems[i].projectId + ')" type="checkbox" [data] /><a href=' + '/Dashboard/ProjectMgnt?pid=' + projectItems[i].projectId + '&edit=1" target="_blank" style="text-decoration:underline;color:blue" title="' + projectItems[i].projectName + '">' + trimText(projectItems[i].projectName.toString(), 12) + '</a></td><td title="' + projectItems[i].projectVersion + '">' + trimText(projectItems[i].projectVersion, 10) + '</td><td>' + projectItems[i].projectLeadName + '</td><td>' + projectItems[i].projectEndDate + '</td></tr>';
                    else
                        details = '<tr><td title="' + projectItems[i].projectName + '"><input id="' + projectItems[i].projectId + '" class="chkProj" onclick="report.projectCheckForDetails(' + projectItems[i].projectId + ')" type="checkbox" [data] />' + trimText(projectItems[i].projectName.toString(), 12) + '</td><td title="' + projectItems[i].projectVersion + '">' + trimText(projectItems[i].projectVersion, 10) + '</td><td>' + projectItems[i].projectLeadName + '</td><td>' + projectItems[i].projectEndDate + '</td></tr>';

                    report.projectsDetailsByPID[projectItems[i].projectId] = new Array();

                    report.projectsDetailsByPID[projectItems[i].projectId] = details;
                }

                //Pass Fail and NC count
                var pass = projectItems[i].passCount;

                var fail = projectItems[i].failCount;

                var notComplete = parseInt(projectItems[i].ntCompletedCount) + parseInt(projectItems[i].pendingCount);

                //Project status global array
                if (report.pieDataForAllProjectIDs[projectItems[i].projectId] == undefined) {
                    tempStatusArr = new Array();

                    tempStatusArr.push(pass);

                    tempStatusArr.push(fail);

                    tempStatusArr.push(notComplete);

                    report.pieDataForAllProjectIDs[projectItems[i].projectId] = new Array();

                    if (!(isNaN(parseInt(pass))) && parseInt(pass) != "NaN") {
                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = tempStatusArr;
                    }
                    else {
                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = new Array(0, 0, 0);
                    }
                }
                else {
                    tempStatusArr = new Array();
                    if (!(isNaN(parseInt(pass))) && parseInt(pass) != "NaN") {
                        tempStatusArr.push(parseInt(pass) + parseInt(report.pieDataForAllProjectIDs[projectItems[i].projectId][0]));

                        tempStatusArr.push(parseInt(fail) + parseInt(report.pieDataForAllProjectIDs[projectItems[i].projectId][1]));

                        tempStatusArr.push(parseInt(notComplete) + parseInt(report.pieDataForAllProjectIDs[projectItems[i].projectId][2]));

                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = new Array();

                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = tempStatusArr;

                    }

                }

                //Test Pass status Global Array
                report.pieDataForTPIDs[projectItems[i].testPassId] = report.getPercentageByCount(new Array(pass, fail, notComplete));

                //Fill all the project Ids
                if ($.inArray(projectItems[i].projectId, report.projectIds) == -1)
                    report.projectIds.push(projectItems[i].projectId);
            }

            report.ConvertProjectStatusInPercent();

            report.fillGoupDropDown();

            $('#ddGroup').find('option[value="Default ' + report.gConfigGroup + '"]').attr('selected', true);

            report.fillPortfolioDropDown();
        }
    },

    fillGoupDropDown: function () {
        $('#ddGroup').html('');

        var arrgroup = new Array();

        var count = 0;

        //$('#ddGroup').append('<option value="Default '+report.gConfigGroup+'">Default '+report.gConfigGroup+'</option>');

        if (report.uniqueGroupName.length != 0) {
            for (var i = 0; i < report.uniqueGroupName.length; i++) {
                if ($.inArray(report.uniqueGroupName[i], arrgroup) == -1) {
                    arrgroup.push(report.uniqueGroupName[i]);

                    $('#ddGroup').append('<option value="' + report.uniqueGroupName[i] + '">' + report.uniqueGroupName[i] + '</option>');
                }

                count++;
            }
        }
        else {
            $('#ddGroup').append('<option>No ' + report.gConfigGroup + '</option>');
        }
    },
    fillPortfolioDropDown: function () {
        var count = 0;

        var group = $("#ddGroup option:selected").text();

        $("#ddPortfolio").html('');

        if (group != "" || group != null || group != undefined) {

            if (group == 'Default ' + report.gConfigGroup) {
                $("#ddPortfolio").append('<option value="Default ' + report.gConfigPortfolio + '">Default ' + report.gConfigPortfolio + '</option>');

                report.projectsDetailViewPortfolio();
            }
            else {
                $("#ddPortfolio").append('<option>Select ' + report.gConfigPortfolio + '</option>');

                if (report.portfolioForGroup[group] != undefined) {
                    var portfolio = report.portfolioForGroup[group].split(',');

                    for (var i = 0; i < portfolio.length; i++) {
                        $("#ddPortfolio").append('<option title="' + portfolio[i] + '" value="' + count + '">' + portfolio[i] + '</option>');

                        count++;
                    }

                    $("#ddPortfolio").val(0);
                }
                else
                    $("#ddPortfolio").html('<option>No ' + report.gConfigPortfolio + '</option>');

                report.projectsDetailViewPortfolio();

            }
        }
    },

    //To get the status in percentage 
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

        data0.push(parseInt(temp1));

        data0.push(parseInt(temp2));

        data0.push(parseInt(temp3));

        return data0;

    },


    /*******************************************************************/
    projectsDetails: new Array(),
    projectsDetailsByPID: new Array(),
    testPassDetails: new Array(),
    tpInfoForProjectIDs: new Array(),
    projectNameForPID: new Array(),
    TPNameForTPID: new Array(),
    forTPIDGetSPIDs: new Array(),
    forTPIDSPIDGetChildItems: new Array(),
    forTPIDGetChildItem: new Array(),
    childItemsForPID: new Array(),
    childItemsForTPID: new Array(),
    testerNameForSPID: new Array(),
    allProjectIDs: new Array(),
    pieDataForProjectIDs: new Array(),
    pieDataForTPIDs: new Array(),
    pieDataForAllProjectIDs: new Array(),
    tsandTesterCountForProjectIDs: new Array(),

    projectsDetailView: function (projectItems) {
        report.removedPID = [];

        $("#dvCon h1").css('color', ' #f60');

        $("#dvDet h1").css('color', '#1f1f1f');

        report.hideTesterDet();

        $("#dvDetView").hide();

        //$("#dvDateFilter").hide();

        $("#dvConView").show();

        // if(report.projectsDetails.length == 0)
        report.showProjects(projectItems);

        var member = report.projectsDetails.length;

        $("#Pagination").pagination(member, {
            callback: report.callbackForProjectDet,
            items_per_page: 5,
            num_display_entries: 10,
            num: 2
        });
    },
    //For Portfolio Feature added by Mohini DT:06-03-2014
    projectsDetailViewPortfolio: function () {
        report.removedPID = [];

        $("#dvCon h1").css('color', ' #f60');

        $("#dvDet h1").css('color', '#1f1f1f');

        report.hideTesterDet();

        $("#dvDetView").hide();

        //$("#dvDateFilter").hide();

        $("#dvConView").show();

        report.projectsDetails = new Array();

        report.testPassDetails = new Array();

        report.showProjectsPortfolio();

        var member = report.projectsDetails.length;

        $("#Pagination").pagination(member, {
            callback: report.callbackForProjectDet,
            items_per_page: 5,
            num_display_entries: 10,
            num: 2
        });
    },

    callbackForProjectDet: function (page_index, jq) {
        var items_per_page = 5;

        var max_elem = Math.min((page_index + 1) * items_per_page, report.projectsDetails.length);

        var newcontent = '';

        // Iterate through a selection of the content and build an HTML string
        for (var i = page_index * items_per_page; i < max_elem; i++)
            newcontent += report.projectsDetails[i];

        $('#prjDetails').empty().html(newcontent);

        $("#prjDetails input").each(function () {
            if ($.inArray($(this).attr('id'), report.removedPID) == -1)
                $(this).attr('checked', true)
        });
        report.projectCheckForDetails();
    },

    removedPID: new Array(),
    projectCheckForDetails: function (pID) {
        try {
            var cntPrj = 0;

            var passCnt = 0;

            var notCompCnt = 0;

            var failCnt = 0;

            var avgCnt = 0;

            if (pID != undefined) {
                $(".rptTesterDetails").hide();

                $("#arrowUp").show();

                $("#arrowDown").hide();

                $("#arrowDownText").hide();

                $("#arrowUpText").show();

                if ($("#" + pID).attr('checked') == false) {
                    if ($.inArray(pID.toString(), report.removedPID) == -1)
                        report.removedPID.push(pID.toString());
                }
                else {
                    var index = report.removedPID.indexOf(pID.toString());

                    if (index > -1)
                        report.removedPID.splice(index, 1);
                }

            }

            var totalCount = 0;
            var countPending = 0;
            var countPass = 0;
            var countFail = 0;
            var countNC = 0;
            var countExecuted = 0;
            var total = 0;

            for (var i = 0; i < report.allProjectIDs.length; i++) {
                if ($.inArray(report.allProjectIDs[i].toString(), report.removedPID) == -1) {
                    var prjParams = report.pieDataForProjectIDs[report.allProjectIDs[i]];
                    var testCaseItems2 = report.childItemsForPID[report.allProjectIDs[i]];

                    if (prjParams != "-" && prjParams != undefined) {

                        if (prjParams[0] != "NaN" && !(isNaN(prjParams[0]))) {
                            passCnt += parseInt(prjParams[0], 10);

                            notCompCnt += parseInt(prjParams[1], 10);

                            failCnt += parseInt(prjParams[2], 10);
                        }

                        avgCnt++;
                    }

                    //To get the total Test Step count
                    if (testCaseItems2 != undefined)
                        totalCount += testCaseItems2.length;

                    //added for executed 
                    if (testCaseItems2 != undefined && report.maxDate != '' && report.minDate != '' && testCaseItems2 != "N/A" && report.currDD == 1) {
                        for (var xi = 0; xi < testCaseItems2.length; xi++) {
                          
                            var maxOldDate = (report2.maxDate);
                            var max1 = maxOldDate.split(' ')[0];

                            var minOldDate = (report2.minDate);
                            var min1 = minOldDate.split(' ')[0];

                            var modified = testCaseItems2[xi]['modified'];
                            modified = modified == null || modified == undefined || modified == "" ? "" : modified;

                            if (testCaseItems2[xi]['DateTimeForFailedStep'] != undefined)
                                var compDate = new Date(testCaseItems2[xi]['DateTimeForFailedStep'].replace("- ", ""));
                            else
                              { // var compDate = new Date((modified).replace(/\-/g, '/'));
                                var compDateold = new Date(modified);
                           /* NewcompDate = new Date(compDateold);*/

                                var dd1 = compDateold.getDate();
                                var mm1 = compDateold.getMonth() + 1;
                                var yy1 = compDateold.getFullYear();
                            var compDate = yy1 + "-" + mm1 + "-" + dd1;
                            yy1 = ""; mm1 = ""; dd1 = "";
                        }
                            if (compDate <= max1 && compDate >= min1) //&& testCaseItems2[xi]['modified']!=testCaseItems2[xi]['created']
                            {

                                switch (testCaseItems2[xi]['status']) // S 14Nov
                                {
                                    case 'Pass':
                                        countPass++
                                        countExecuted++;
                                        break;
                                    case 'Fail':
                                        countFail++;
                                        countExecuted++;
                                        break;
                                    case 'Not Completed':
                                        countNC++;
                                        break;
                                    case 'Pending':
                                        countNC++;
                                        break;
                                }

                            }
                            else {

                                switch (testCaseItems2[xi]['status']) // S 14Nov
                                {
                                    case 'Pass':
                                        countPass++;
                                        break;
                                    case 'Fail':
                                        countFail++;
                                        break;
                                    case 'Not Completed':
                                        countNC++;
                                        break;
                                    case 'Pending':
                                        countNC++;
                                        break;
                                }

                            }
                        }
                    }

                    //----------------
                }
            }

            var pieArray = [];

            //totalCount += passCnt + notCompCnt + failCnt;
            //totalCount  = countPass + countFail + countNC;

            pieArray = report.getPercentageByCount(new Array(passCnt, failCnt, notCompCnt));

            //added for Executed count ------
            var temp4 = '';
            if (report.currDD == 1)//Added for Executed in Detailed View
            {
                total = countPass + countFail + countNC + countPending;
                var flagPendingRounded = false;
                var flagPassRounded = false;
                var flagFailRounded = false;
                var flagNCRounded = false;
                var flagExecutedRounded = false;
                var temp1, temp2, temp3, temp5;
                temp1 = ((countPass / total) * 100).toFixed(0);

                if (((countPass / total) * 100) != temp1)
                    flagPassRounded = true;

                temp2 = ((countNC / total) * 100).toFixed(0);

                if (((countNC / total) * 100) != temp2)
                    flagNCRounded = true;

                temp3 = ((countFail / total) * 100).toFixed(0);

                if (((countFail / total) * 100) != temp3)
                    flagFailRounded = true;

                temp4 = ((countExecuted / total) * 100).toFixed(0);

                if (((countExecuted / total) * 100) != temp3)
                    flagExecutedRounded = true;

                temp5 = ((countPending / total) * 100).toFixed(0);

                if (((countPending / total) * 100) != temp5)
                    flagPendingRounded = true;

                if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) + parseInt(temp4) + parseInt(temp5) > 100) {
                    if (flagPassRounded)
                        temp1 = Math.floor((countPass / total) * 100);
                    else if (flagFailRounded)
                        temp3 = Math.floor((countFail / total) * 100);
                    else if (flagExecutedRounded)
                        temp4 = Math.floor((countExecuted / total) * 100);
                    else if (flagNCRounded)
                        temp2 = Math.floor((countNC / total) * 100);
                    else if (flagPendingRounded)
                        temp5 = Math.floor((countPending / total) * 100);
                }
                else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) + parseInt(temp4) + parseInt(temp5) < 100) {
                    if (flagPassRounded)
                        temp1 = Math.ceil((countPass / total) * 100);
                    else if (flagFailRounded)
                        temp3 = Math.ceil((countFail / total) * 100);
                    else if (flagExecutedRounded)
                        temp4 = Math.ceil((countExecuted / total) * 100);
                    else if (flagNCRounded)
                        temp2 = Math.ceil((countNC / total) * 100);
                    else if (flagPendingRounded)
                        temp5 = Math.ceil((countPending / total) * 100);
                }

            }

            //--------------------------------

            if (pieArray[0] != undefined && pieArray[0] != "N/A" && pieArray[0] != NaN) {
                pieArray[3] = temp4;

                report.fillProjectDetPie(pieArray, totalCount);

                report.paginationForTestPass();

                //added for Executed count 
                if (report.currDD == 1)//Added for Executed in Detailed View
                {
                    if (temp4 != 0 && temp4 != "NaN") {
                        $("#legImgs1 span").show();
                        $("#executedMessageForLessTS2").hide();
                        $("#executedMessage2").hide();
                        $('#executedTable2').show();
                        //$("#execLegend2").show();
                        $('#executedBarGraph2').css('width', '' + temp4 + '%');
                        $('#executedBarGraph2').attr('title', temp4 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "s have been executed in the date range entered above.");//Added By Mohini For Resource File(25-02-2014)
                    }
                    else {
                        $("#legImgs1 span").hide();
                        $('#executedBarGraph2').attr('title', '');
                        $('#executedTable2').hide();
                        $("#execLegend2").hide();
                        //if( temp4 != "NaN")
                        if (temp4 != "NaN" && countExecuted == 0) {
                            $("#executedMessage2").show();
                            $("#executedMessageForLessTS2").hide();
                        }
                        else if (countExecuted > 0) {
                            $("#executedMessage2").hide();
                            $("#executedMessageForLessTS2").show();
                        }
                    }
                }
                else {
                    $("#legImgs1 span").hide();
                    $("#executedMessageForLessTS2").hide();
                    $("#executedMessage2").hide();
                    $('#executedTable2').hide();
                }
                //------------------------
            }
            else {
                $("#executedMessageForLessTS2").hide();
                $("#executedMessage2").hide();
                $('#executedTable2').hide();
                $("#legImgs1 span").hide();
            }

        }
        catch (e) {
            alert(e.message);
        }
    },
    fillProjectDetPie: function (pieArray, totalTSCount) {

        //To swap the fail and NC percent
        var tempArr = new Array(pieArray[0], pieArray[2], pieArray[1]);

        pieArray = tempArr;

        var pieChartArray = new Array();

        pieChartArray = pieArray;

        var pieChartArrayLab = new Array();

        pieChartArrayLab = pieArray;

        var pieChartArrayTooltips = new Array();

        var total = totalTSCount;

        /********Added by Mohini For Resource File(Date:25-02-2014)********************/
        pieChartArrayTooltips.push(pieArray[0] + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have passed.");

        pieChartArrayTooltips.push(pieArray[1] + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have not been completed.");

        pieChartArrayTooltips.push(pieArray[2] + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have failed.");

        if (pieChartArray == undefined || pieChartArray == null || isNaN(pieChartArray[0]) == true) {
            if (report.flagForDateFilter == 0) {
                $('#pieChart').html('<div style="height:60px;padding-top:35px;text-align:center;margin-left:-100px;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added by Mohini For Resource File(25-02-2014)
                $("#executedMessage2").hide();
            }
            else {
                $('#pieChart').html('<div style="height:60px;padding-top:35px;text-align:center;margin-left:-100px;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added by Mohini For Resource File(25-02-2014)
                $("#executedMessage2").hide();
            }
        }
        else {
            $('#pieChart').empty();
            try {
                $("#pieChart").chart('clear');
                $("#pieChart").chart({
                    template: "pie_basic_1",
                    values: {
                        serie1: pieChartArray
                    },
                    labels: pieChartArrayLab,
                    tooltips: {
                        serie1: pieChartArrayTooltips
                    },
                    defaultSeries: {
                        values: [{
                            plotProps: {
                                fill: "#008000"
                            }
                        }, {
                            plotProps: {
                                fill: "#ffa800"
                            }
                        }, {
                            plotProps: {
                                fill: "#ff0000"
                            }
                        }]
                    }
                });
            }
            catch (e) {
                alert(e.message);
            }
        }
    },
    forPIDGetTPDetails: new Array(),

    forPIDGetProjectStata: new Array(),

    //Code modified for WCF |Ejaz Waquif DT:11/18/2014  
    showProjects: function (projectItems) {

        //Initialise all global variables
        report.projectNameForPID = new Array();

        report.versionNameForPID = new Array();

        report.allProjectIDs = new Array();

        report.TPNameForTPID = new Array();

        report.tpInfoForProjectIDs = new Array();

        report.projectsDetailsByPID = new Array();

        report.pieDataForAllProjectIDs = new Array();

        report.pieDataForTPIDs = new Array();

        //report.projectItems = projectItems;

        if (projectItems != null && projectItems != undefined) {

            for (var i = 0; i < projectItems.length; i++) {

                //Fill the global Arrays for further references
                report.projectNameForPID[projectItems[i].projectId] = projectItems[i].projectName;

                report.versionNameForPID[projectItems[i].projectId] = projectItems[i].projectVersion == undefined || projectItems[i].projectVersion == null || projectItems[i].projectVersion == "" ? 'Default ' + report.gConfigVersion : projectItems[i].projectVersion;

                if ($.inArray(projectItems[i].projectId, report.allProjectIDs) == -1)
                    report.allProjectIDs.push(projectItems[i].projectId);

                report.TPNameForTPID[projectItems[i].testPassId] = projectItems[i].testPassName;

                //modified for date format 20/10/2016
                if (projectItems[i].tpEndDate != null || projectItems[i].tpEndDate != undefined) {
                    projectItems[i].tpEndDate = projectItems[i].tpEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                }

                if (report.tpInfoForProjectIDs[projectItems[i].projectId] == undefined) {

                    report.tpInfoForProjectIDs[projectItems[i].projectId] = projectItems[i].testPassId + "~" + projectItems[i].testManagerName + "~" + projectItems[i].tpEndDate;
                }
                else
                    report.tpInfoForProjectIDs[projectItems[i].projectId] += "`" + projectItems[i].testPassId + "~" + projectItems[i].testManagerName + "~" + projectItems[i].tpEndDate;


                //Project details markup
                if (report.projectsDetailsByPID[projectItems[i].projectId] == undefined) {
                    var userAsso = [];

                    var details = "";

                    if (security.userAssociationForProject[projectItems[i].projectId] != undefined)
                        userAsso = security.userAssociationForProject[projectItems[i].projectId];

                    //modified for date format 20/10/2016
                    if (projectItems[i].projectEndDate != null || projectItems[i].projectEndDate != undefined) {
                        projectItems[i].projectEndDate = projectItems[i].projectEndDate.replace(/^(\d{4})\-(\d{2})\-(\d{2}).*$/, '$2/$3/$1');
                    }

                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        details = '<tr><td><input id="' + projectItems[i].projectId + '" class="chkProj" onclick="report.projectCheckForDetails(' + projectItems[i].projectId + ')" type="checkbox" [data] /><a href=' + '/Dashboard/ProjectMgnt?pid=' + projectItems[i].projectId + '&edit=1" target="_blank" style="text-decoration:underline;color:blue" title="' + projectItems[i].projectName + '">' + trimText(projectItems[i].projectName.toString(), 12) + '</a></td><td>' + projectItems[i].projectLeadName + '</td><td>' + projectItems[i].projectEndDate + '</td></tr>';
                    else
                        details = '<tr><td title="' + projectItems[i].projectName + '"><input id="' + projectItems[i].projectId + '" class="chkProj" onclick="report.projectCheckForDetails(' + projectItems[i].projectId + ')" type="checkbox" [data] />' + trimText(projectItems[i].projectName.toString(), 12) + '</td><td>' + projectItems[i].projectLeadName + '</td><td>' + projectItems[i].projectEndDate + '</td></tr>';

                    report.projectsDetailsByPID[projectItems[i].projectId] = new Array();

                    report.projectsDetailsByPID[projectItems[i].projectId] = details;
                }

                //Pass Fail and NC count
                var pass = projectItems[i].passCount;

                var fail = projectItems[i].failCount;

                var notComplete = parseInt(projectItems[i].ntCompletedCount) + parseInt(projectItems[i].pendingCount);

                //Project status global array
                if (report.pieDataForAllProjectIDs[projectItems[i].projectId] == undefined) {
                    tempStatusArr = new Array();

                    tempStatusArr.push(pass);

                    tempStatusArr.push(fail);

                    tempStatusArr.push(notComplete);

                    report.pieDataForAllProjectIDs[projectItems[i].projectId] = new Array();

                    if (!(isNaN(parseInt(pass))) && parseInt(pass) != "NaN") {
                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = tempStatusArr;
                    }
                    else {
                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = new Array(0, 0, 0);
                    }
                }
                else {
                    tempStatusArr = new Array();

                    if (!(isNaN(parseInt(pass))) && parseInt(pass) != "NaN") {
                        tempStatusArr.push(parseInt(pass) + parseInt(report.pieDataForAllProjectIDs[projectItems[i].projectId][0]));

                        tempStatusArr.push(parseInt(fail) + parseInt(report.pieDataForAllProjectIDs[projectItems[i].projectId][1]));

                        tempStatusArr.push(parseInt(notComplete) + parseInt(report.pieDataForAllProjectIDs[projectItems[i].projectId][2]));

                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = new Array();

                        report.pieDataForAllProjectIDs[projectItems[i].projectId] = tempStatusArr;

                    }

                }

                //Test Pass status Global Array
                report.pieDataForTPIDs[projectItems[i].testPassId] = report.getPercentageByCount(new Array(pass, fail, notComplete));
            }

            //To convert the project status count in Percentage
            report.ConvertProjectStatusInPercent();

            //To bind the Project status in Percent to Project details "data" attribute
            $(report.allProjectIDs).each(function (ind, itm) {

                var dataAttr = report.pieDataForAllProjectIDs[itm];

                var details = report.projectsDetailsByPID[itm];

                var newDetails = details.replace('[data]', 'data=' + '"' + dataAttr + '"');

                report.projectsDetails.push(newDetails);

                //report.pieDataForProjectIDs[itm] = report.pieDataForAllProjectIDs[itm];
                var arr = report.getPercentageByCount(report.pieDataForAllProjectIDs[itm]);

                report.pieDataForProjectIDs[itm] = new Array(arr[0], arr[2], arr[1]);



            });

        }

    },
    //For Portfolio Feature Added by Mohini
    showProjectsPortfolio: function () {

        var groupName = $("#ddGroup option:selected").text();

        var portfolioName = $("#ddPortfolio option:selected").text();

        report.projectIDsForSelectedGroupPortfolio = report.gArrGroupPortfolioForPIDs[groupName + "~" + portfolioName];

        //Initialise the global variable 
        report.pieDataForProjectIDs = new Array();

        report.allProjectIDs = new Array();

        $(report.projectIDsForSelectedGroupPortfolio).each(function (ind, itm) {

            var dataAttr = report.pieDataForAllProjectIDs[itm];

            var details = report.projectsDetailsByPID[itm];

            var newDetails = details.replace('[data]', 'data=' + '"' + dataAttr + '"');

            report.projectsDetails.push(newDetails);

            //report.pieDataForProjectIDs[itm] =  report.pieDataForAllProjectIDs[itm];
            var arr = report.getPercentageByCount(report.pieDataForAllProjectIDs[itm]);
            report.pieDataForProjectIDs[itm] = new Array(arr[0], arr[2], arr[1]);

            report.allProjectIDs.push(itm);


        });

    },
    /****************************************************************/
    paginationForTestPass: function () {
        report.testPassDetails.length = 0;
        report.showTestPass();
        var member = report.testPassDetails.length;

        $("#PaginationTP").pagination(member, {
            callback: report.callbackForTestPass,
            items_per_page: 10,
            num_display_entries: 10,
            num: 2
        });
    },
    callbackForTestPass: function (page_index, jq) {
        var items_per_page = 10;

        var max_elem = Math.min((page_index + 1) * items_per_page, report.testPassDetails.length);

        var newcontent = '';

        // Iterate through a selection of the content and build an HTML string
        for (var i = page_index * items_per_page; i < max_elem; i++)
            newcontent += report.testPassDetails[i];

        $('#TPTable').empty().html(newcontent);

        if (newcontent == '') {
            $("#noTP").css('display', '');

            $("#PaginationTP").css('display', 'none');

            $(".rptShowHideTesters").css('display', 'none');

            $("#tblTP").css('display', 'none');
        }
        else {
            $("#noTP").css('display', 'none');

            $("#tblTP").css('display', '');

            $("#PaginationTP").css('display', '');

            $(".rptShowHideTesters").css('display', '');
        }
        if ($(".rptTesterDetails").css('display') != 'none' && report.currentTPID != '')
            $("#row" + report.currentTPID).addClass("trColor");
    },

    indexForTPID: new Array(),

    TPIDForIndex: new Array(),

    forTPIDGetTPInfo: new Array(),

    indexTP: 0,

    showTestPass: function () {
        var tp = [];

        var projectName = '';

        var versionName = '';

        var testPassName = '';

        var manager = '';

        var dueDate = '';

        var tpDetails = new Array();

        report.indexTP = 0;

        report.indexForTPID = [];

        report.TPIDForIndex = [];

        report.testPassDetails = new Array();

        for (var ss = 0; ss < report.allProjectIDs.length; ss++) {
            if ($.inArray(report.allProjectIDs[ss].toString(), report.removedPID) == -1) {
                if (report.tpInfoForProjectIDs[report.allProjectIDs[ss]] != undefined) {
                    tp = report.tpInfoForProjectIDs[report.allProjectIDs[ss]].split("`");
                    for (var i = 0; i < tp.length; i++) {
                        tpDetails = tp[i].split("~");

                        projectName = report.projectNameForPID[report.allProjectIDs[ss]];

                        versionName = report.versionNameForPID[report.allProjectIDs[ss]];

                        testPassName = report.TPNameForTPID[tpDetails[0]];

                        manager = tpDetails[1];

                        dueDate = tpDetails[2];

                        if (report.pieDataForTPIDs[tpDetails[0]][0] != "NaN" && !(isNaN(report.pieDataForTPIDs[tpDetails[0]][0]))) {
                            var pass = "Pass";

                            var NC = "Not Completed";

                            var fail = "Fail";

                            var all = "All";

                            var temp1 = report.pieDataForTPIDs[tpDetails[0]][0];

                            var temp2 = report.pieDataForTPIDs[tpDetails[0]][1];

                            var temp3 = report.pieDataForTPIDs[tpDetails[0]][2];

                            report.forTPIDGetTPInfo[tpDetails[0]] = tpDetails[0] + "~" + report.allProjectIDs[ss];

                            report.indexForTPID[tpDetails[0]] = report.indexTP;

                            report.TPIDForIndex[report.indexTP] = tpDetails[0];

                            report.indexTP++;

                            if (report.isPortfolioOn) {
                                report.testPassDetails.push('<tr id="row' + tpDetails[0] + '"><td title="' + projectName + '">' + trimText(projectName, 12) + '</td><td title="' + versionName + '">' + trimText(versionName, 12) + '</td><td><a onclick="report.showTesters(\'' + tpDetails[0] + '|' + all + '|' + report.allProjectIDs[ss] + '\');" style="text-decoration:underline;color:blue; cursor:pointer">' + testPassName + '</a></td><td title="' + manager + '">' + trimText(manager, 10) + '</td><td>' + dueDate + '</td>'
									+ '<td id="' + tpDetails[0] + '">'
									+ '<div onclick="report.showTesters(\'' + tpDetails[0] + '|' + pass + '|' + report.allProjectIDs[ss] + '\');" style="float:left; height:30px;cursor:pointer; color:white; width:' + temp1 + '%; background-color: #008000;line-height: 30px;text-align: center;">' + temp1 + '</div>'
									+ '<div onclick="report.showTesters(\'' + tpDetails[0] + '|' + fail + '|' + report.allProjectIDs[ss] + '\');" style="float:left; height:30px; cursor:pointer;color:white; width:' + temp3 + '%; background-color: #ff0000;line-height: 30px;text-align: center;">' + temp3 + '</div>'
									+ '<div onclick="report.showTesters(\'' + tpDetails[0] + '|' + NC + '|' + report.allProjectIDs[ss] + '\');" style="float:left; height:30px;cursor:pointer; color:white; width:' + temp2 + '%; background-color: #ffa800;line-height: 30px;text-align: center;">' + temp2 + '</div></td></tr>');
                            }
                            else {
                                report.testPassDetails.push('<tr id="row' + tpDetails[0] + '"><td title="' + projectName + '">' + trimText(projectName, 12) + '</td><td><a onclick="report.showTesters(\'' + tpDetails[0] + '|' + all + '|' + report.allProjectIDs[ss] + '\');" style="text-decoration:underline;color:blue; cursor:pointer">' + testPassName + '</a></td><td title="' + manager + '">' + trimText(manager, 10) + '</td><td>' + dueDate + '</td>'
									+ '<td id="' + tpDetails[0] + '">'
									+ '<div onclick="report.showTesters(\'' + tpDetails[0] + '|' + pass + '|' + report.allProjectIDs[ss] + '\');" style="float:left; height:30px;cursor:pointer; color:white; width:' + temp1 + '%; background-color: #008000;line-height: 30px;text-align: center;">' + temp1 + '</div>'
									+ '<div onclick="report.showTesters(\'' + tpDetails[0] + '|' + fail + '|' + report.allProjectIDs[ss] + '\');" style="float:left; height:30px; cursor:pointer;color:white; width:' + temp3 + '%; background-color: #ff0000;line-height: 30px;text-align: center;">' + temp3 + '</div>'
									+ '<div onclick="report.showTesters(\'' + tpDetails[0] + '|' + NC + '|' + report.allProjectIDs[ss] + '\');" style="float:left; height:30px;cursor:pointer; color:white; width:' + temp2 + '%; background-color: #ffa800;line-height: 30px;text-align: center;">' + temp2 + '</div></td></tr>');

                            }
                        }
                    }
                }
            }
        }
    },

    currentTPID: '',

    currentPID: '',

    previousPagination: function (TPID) {
        var index = parseInt(report.indexForTPID[TPID]);

        var str = (index + 1) / 10;

        if (str.toString().indexOf('.') == -1)
            $("#PaginationTP .current").prev().click();
    },
    NextPagination: function (TPID) {
        var index = parseInt(report.indexForTPID[TPID]);
        //if(Math.ceil((index)/10) == parseInt($("#PaginationTP .current").text().replace("Prev","").replace("Next","")))
        {
            var str = (index) / 10;
            if (str.toString().indexOf('.') == -1)
                $("#PaginationTP .current").next().click();
        }
    },
    hideTesterDet: function () {
        $("#testerName").text('');
        $("#tblData").html('');
        $("#infoDiv").html('');
        $(".rptTesterDetails").hide();
        $("#arrowUp").show();
        $("#arrowDown").hide();
        $("#arrowDownText").hide();
        $("#arrowUpText").show();
        $("#TPTable").find("tr").removeClass("trColor");
    },
    showTesterDet: function () {
        try {
            if ($("#TPTable tr:eq(0)").attr('id') != undefined) {
                var TPID = $("#TPTable tr:eq(0)").attr('id').split("w")[1];
                report.showTesters(TPID + '|All|' + report.forTPIDGetTPInfo[TPID].split("~")[1]);
            }
        }
        catch (e)
        { }
    },
    showTestersPreq: function (TPID, status) {
        //Hiding Testers Test Steps grid
        $("#testerName").text('');
        $("#tblData").html('');
        $("#infoDiv").html('');

        $("#arrowUp").hide();
        $("#arrowUpText").hide();
        $("#arrowDownText").show();
        $("#arrowDown").show();

        $("#TPTable").find("tr").removeClass("trColor");
        $("#row" + TPID).addClass("trColor");
        var projectName = report.projectNameForPID[report.currentPID];
        if (report.isPortfolioOn)//For Portfolio On BY Mohini DT:09-05-2014
        {
            var versionName = report.versionNameForPID[report.currentPID];
            $("#brdCrum").text("( " + projectName + " / " + versionName + " / " + report.TPNameForTPID[TPID] + " )");
        }
        else {
            $("#brdCrum").text("( " + projectName + "/" + report.TPNameForTPID[TPID] + " )");
        }
        var noPreNext = 0;
        if (report.indexForTPID[TPID] == 0)//No Previous
        {
            if (report.TPIDForIndex[1] != undefined && report.forTPIDGetTPInfo[report.TPIDForIndex[1]] != undefined) {
                var pID = report.forTPIDGetTPInfo[report.TPIDForIndex[1]].split("~")[1];
                if (isRootWeb)
                    $("#toggleTP").html('<img title="No ' + report.gConfigTestPass + '" style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/NoPrevious.png"/>&nbsp<img title="Next ' + report.gConfigTestPass + '" id="imgNext" onclick="report.showTesters(\'' + report.TPIDForIndex[1] + '|All|' + pID + '\');" style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/Next.png"/>');//Added By Mohini For Resource File(Date:25-02-2014)
                else
                    $("#toggleTP").html('<img title="No ' + report.gConfigTestPass + '" style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/NoPrevious.png"/>&nbsp<img title="Next ' + report.gConfigTestPass + '" id="imgNext" onclick="report.showTesters(\'' + report.TPIDForIndex[1] + '|All|' + pID + '\');" style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/Next.png"/>');//Added By Mohini For Resource File(Date:25-02-2014)	
            }
            else
                noPreNext = 1;
        }
        else if (report.indexForTPID[TPID] == report.indexTP - 1)//No Next
        {
            if (report.TPIDForIndex[report.indexTP - 2] != undefined && report.forTPIDGetTPInfo[report.TPIDForIndex[report.indexTP - 2]] != undefined) {
                var pID = report.forTPIDGetTPInfo[report.TPIDForIndex[report.indexTP - 2]].split("~")[1];
                if (isRootWeb)
                    $("#toggleTP").html('<img title="Prev ' + report.gConfigTestPass + '" onclick="report.previousPagination(\'' + report.TPIDForIndex[report.indexTP - 2] + '\');report.showTesters(\'' + report.TPIDForIndex[report.indexTP - 2] + '|All|' + pID + '\');"  style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/Previous.png"/>&nbsp<img title="No ' + report.gConfigTestPass + '" style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/NoNext.png"/>');//Added By Mohini For Resource File(25-02-2014)
                else
                    $("#toggleTP").html('<img title="Prev ' + report.gConfigTestPass + '" onclick="report.previousPagination(\'' + report.TPIDForIndex[report.indexTP - 2] + '\');report.showTesters(\'' + report.TPIDForIndex[report.indexTP - 2] + '|All|' + pID + '\');"  style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/Previous.png"/>&nbsp<img title="No ' + report.gConfigTestPass + '" style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/NoNext.png"/>');//Added By Mohini For Resource File(25-02-2014)	
            }
            else
                noPreNext = 1;
        }
        else //Next and Previous avaialble
        {
            var curTPIndex = report.indexForTPID[TPID];
            if (curTPIndex == 0 && report.indexTP == 1)
                noPreNext = 1;
            else {
                var preTPID = report.TPIDForIndex[curTPIndex - 1];
                var nxtTPID = report.TPIDForIndex[curTPIndex + 1];
                var prePID = report.forTPIDGetTPInfo[preTPID].split("~")[1];
                var nxtPID = report.forTPIDGetTPInfo[nxtTPID].split("~")[1];

                if (isRootWeb)
                    $("#toggleTP").html('<img onclick="report.previousPagination(\'' + preTPID + '\');report.showTesters(\'' + preTPID + '|All|' + prePID + '\');" title="Prev ' + report.gConfigTestPass + '" style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/Previous.png"/>&nbsp<img onclick="report.NextPagination(\'' + nxtTPID + '\');report.showTesters(\'' + nxtTPID + '|All|' + nxtPID + '\');" title="Next ' + report.gConfigTestPass + '"  " style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/Next.png"/>');//Added By Mohini For Resource File(25-02-2014)
                else
                    $("#toggleTP").html('<img onclick="report.previousPagination(\'' + preTPID + '\');report.showTesters(\'' + preTPID + '|All|' + prePID + '\');" title="Prev ' + report.gConfigTestPass + '" style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/Previous.png"/>&nbsp<img onclick="report.NextPagination(\'' + nxtTPID + '\');report.showTesters(\'' + nxtTPID + '|All|' + nxtPID + '\');" title="Next ' + report.gConfigTestPass + '"  " style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/Next.png"/>');//Added By Mohini For Resource File(25-02-2014)	
            }
        }

        if (noPreNext == 1) {
            if (isRootWeb)
                $("#toggleTP").html('<img title="No ' + report.gConfigTestPass + '" style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/NoPrevious.png"/>&nbsp<img title="No ' + report.gConfigTestPass + '"  " style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/NoNext.png"/>');//Added By Mohini For Resource File(25-02-2014)
            else
                $("#toggleTP").html('<img title="No ' + report.gConfigTestPass + '" style="cursor:pointer" src="/css/theme/' + themeColor + '/Report/images/NoPrevious.png"/>&nbsp<img title="No ' + report.gConfigTestPass + '"  " style="cursor:pointer;" src="/css/theme/' + themeColor + '/Report/images/NoNext.png"/>');//Added By Mohini For Resource File(25-02-2014)		
        }
        $("#tpAll").unbind("click");
        $("#tpPass").unbind("click");
        $("#tpFail").unbind("click");
        $("#tpNC").unbind("click");

        //Binding click on status
        if (status != "All") {
            $("#tpAll").click(function () {
                report.showTesters(TPID + '|All|' + report.currentPID);
            });
        }

        if (status != "Pass") {
            $("#tpPass").click(function () {
                report.showTesters(TPID + '|Pass|' + report.currentPID);
            });
        }
        if (status != "Fail") {
            $("#tpFail").click(function () {
                report.showTesters(TPID + '|Fail|' + report.currentPID);
            });
        }
        if (status != "Not Completed") {
            $("#tpNC").click(function () {
                report.showTesters(TPID + '|Not Completed|' + report.currentPID);
            });
        }

        switch (status) {
            case "Pass":
                $("#tpPass").removeClass("txtColor1");
                $("#tpFail").removeClass("txtColor2");
                $("#tpAll").removeClass("txtColor2");
                $("#tpNC").removeClass("txtColor2");
                $("#tpPass").addClass("txtColor2");
                $("#tpFail").addClass("txtColor1");
                $("#tpAll").addClass("txtColor1");
                $("#tpNC").addClass("txtColor1");
                break;

            case "Fail":
                $("#tpFail").removeClass("txtColor1");
                $("#tpPass").removeClass("txtColor2");
                $("#tpAll").removeClass("txtColor2");
                $("#tpNC").removeClass("txtColor2");
                $("#tpFail").addClass("txtColor2");
                $("#tpPass").addClass("txtColor1");
                $("#tpAll").addClass("txtColor1");
                $("#tpNC").addClass("txtColor1");
                break;

            case "Not Completed":
                $("#tpNC").removeClass("txtColor1");
                $("#tpPass").removeClass("txtColor2");
                $("#tpFail").removeClass("txtColor2");
                $("#tpAll").removeClass("txtColor2");
                $("#tpNC").addClass("txtColor2");
                $("#tpPass").addClass("txtColor1");
                $("#tpAll").addClass("txtColor1");
                $("#tpFail").addClass("txtColor1");
                break;

            case "All":
                $("#tpNC").removeClass("txtColor2");
                $("#tpPass").removeClass("txtColor2");
                $("#tpFail").removeClass("txtColor2");
                $("#tpAll").removeClass("txtColor1");
                $("#tpAll").addClass("txtColor2");
                $("#tpPass").addClass("txtColor1");
                $("#tpNC").addClass("txtColor1");
                $("#tpFail").addClass("txtColor1");

        }
    },
    showTesters: function (data2) {
        $(".rptTesterDetails").show();

        var data = data2.split("|");
        var TPID = data[0];
        var status = data[1];
        //var projectName = report.projectNameForPID[ data[2] ];
        report.currentTPID = TPID;
        report.currentPID = data[2];

        report.showTestersPreq(TPID, status);

        if (report.forTPIDGetSPIDs[TPID] != undefined) {
            var SPIDs = new Array();
            var SPIDsNeedToShow = new Array();
            var chilIDItems = new Array();
            SPIDs = report.forTPIDGetSPIDs[TPID].toString().split(",");
            for (var i = 0; i < SPIDs.length; i++) {
                if (report.forTPIDSPIDGetChildItems[TPID + "~" + SPIDs[i]] != undefined && $.inArray(SPIDs[i], SPIDsNeedToShow) == -1) {
                    if (status == "All")
                        SPIDsNeedToShow.push(SPIDs[i]);
                    else if (report.forTPIDSPIDGetChildItems[TPID + "~" + SPIDs[i]] != undefined) {
                        var childItems = report.forTPIDSPIDGetChildItems[TPID + "~" + SPIDs[i]].split("`");
                        for (var ii = 0; ii < childItems.length; ii++) {
                            if (childItems[ii].split("~")[2] == status) {
                                SPIDsNeedToShow.push(SPIDs[i]);
                                break;
                            }
                        }
                    }
                }
            }

            var arrPass = [];
            var arrFail = [];
            var arrNC = [];
            var arrPass2 = [];
            var arrFail2 = [];
            var arrNC2 = [];
            var arrTesterName = [];
            var arrTesterName2 = [];
            if (SPIDsNeedToShow.length != 0) {
                $("#PaginationTesterChart").show();
                for (var i = 0; i < SPIDsNeedToShow.length; i++) {
                    var countPass = 0;
                    var countFail = 0;
                    var countNC = 0;
                    var temp = 0;
                    var total = 0;
                    if (report.forTPIDSPIDGetChildItems[TPID + "~" + SPIDsNeedToShow[i]] != undefined) {
                        chilIDItems = report.forTPIDSPIDGetChildItems[TPID + "~" + SPIDsNeedToShow[i]].split("`");
                        for (var mm = 0; mm < chilIDItems.length; mm++) {
                            switch (chilIDItems[mm].split("~")[2]) {
                                case 'Pass':
                                    countPass++;
                                    break;
                                case 'Fail':
                                    countFail++;
                                    break;
                                case 'Not Completed':
                                    countNC++;
                                    break;
                            }
                        }
                        total = countPass + countFail + countNC;

                        var flagPassRounded = false;
                        var flagFailRounded = false;
                        var flagNCRounded = false;
                        var temp1, temp2, temp3;
                        temp1 = ((countPass / total) * 100).toFixed(0);

                        if (((countPass / total) * 100) != temp1)
                            flagPassRounded = true;

                        temp2 = ((countNC / total) * 100).toFixed(0);

                        if (((countNC / total) * 100) != temp2)
                            flagNCRounded = true;

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
                        arrPass.push(temp1);
                        arrFail.push(temp3);
                        arrNC.push(temp2);

                        arrPass2.push(parseInt(temp1));
                        arrFail2.push(parseInt(temp3));
                        arrNC2.push(parseInt(temp2));

                        report.forTesterNameSPID[report.testerNameForSPID[SPIDsNeedToShow[i]]] = SPIDsNeedToShow[i];
                        arrTesterName.push(report.testerNameForSPID[SPIDsNeedToShow[i]]);
                        arrTesterName2.push(trimText(report.testerNameForSPID[SPIDsNeedToShow[i]], 15));
                    }
                }
                report.paginationForTesterChart(arrTesterName, arrPass, arrFail, arrNC, arrTesterName2, arrPass2, arrFail2, arrNC2);

            }
            else if (status != "Not Completed") {
                //$("#testerChart").html("&nbsp;&nbsp;&nbsp;&nbsp;"+status+"ed Test Steps are not available.");
                $("#testerChart").html("&nbsp;&nbsp;&nbsp;&nbsp;" + status + "ed " + report.gConfigTestStep + "s are not available.");//Added By Mohini for Resource File(25-02-2014)		
                $("#PaginationTesterChart").hide();
            }
            else {
                //$("#testerChart").html("&nbsp;&nbsp;&nbsp;&nbsp;"+status+" Test Steps are not available.");	
                $("#testerChart").html("&nbsp;&nbsp;&nbsp;&nbsp;" + status + " " + report.gConfigTestStep + "s are not available.");//Added By Mohini for Resource File(25-02-2014)
                $("#PaginationTesterChart").hide();
            }
        }
        else {

        }
    },

    /********* Added for paging in the tester chart on 18 oct ***************/
    gPass: new Array(),
    gFail: new Array(),
    gNC: new Array(),
    gTesterName: new Array(),

    gPass2: new Array(),
    gFail2: new Array(),
    gNC2: new Array(),
    gTesterName2: new Array(),

    paginationForTesterChart: function (arrTesterName, arrPass, arrFail, arrNC, arrTesterName2, arrPass2, arrFail2, arrNC2) {
        report.gPass = arrPass;
        report.gFail = arrFail;
        report.gNC = arrNC;
        report.gTesterName = arrTesterName;

        report.gPass2 = arrPass2;
        report.gFail2 = arrFail2;
        report.gNC2 = arrNC2;
        report.gTesterName2 = arrTesterName2;

        var member = arrTesterName.length;

        $("#PaginationTesterChart").pagination(member, {
            callback: report.callbackForTesterChart,
            items_per_page: 10,
            num_display_entries: 10,
            num: 2
        });
    },
    callbackForTesterChart: function (page_index, jq) {
        var sTesterName = new Array();
        var sPass = new Array();
        var sFail = new Array();
        var SNotCompleted = new Array();

        var sTesterName2 = new Array();
        var sPass2 = new Array();
        var sFail2 = new Array();
        var SNotCompleted2 = new Array();

        var items_per_page = 10;
        var max_elem = Math.min((page_index + 1) * items_per_page, report.gTesterName.length);
        var newcontent = '';

        // Iterate through a selection of the content and build an HTML string
        for (var i = page_index * items_per_page; i < max_elem; i++) {
            sTesterName.push(report.gTesterName[i]);
            sPass.push(report.gPass[i]);
            sFail.push(report.gFail[i]);
            SNotCompleted.push(report.gNC[i]);

            sTesterName2.push(report.gTesterName2[i]);
            sPass2.push(report.gPass2[i]);
            sFail2.push(report.gFail2[i]);
            SNotCompleted2.push(report.gNC2[i]);
        }

        var chartWidth = report.getChartWidth(sTesterName.length);
        $("#dvTester").css('display', '');
        $("#testerChart").css('display', '');
        $("#testerChart").chart('clear');
        $("#testerChart").chart({
            template: "line_basic_6",
            width: chartWidth,

            tooltips: {
                serie1: sPass,
                serie2: sFail,
                serie3: SNotCompleted

            },
            values: {
                serie1: sPass2,
                serie2: sFail2,
                serie3: SNotCompleted2
            },
            labels: sTesterName2,//report.arrTesterNameTrim,
            defaultSeries: {
                type: "bar",
                stacked: true
            },
            barMargins: 10,

        });

        report.arrTesterName = sTesterName;
        for (var i = 0; i < sTesterName.length; i++) {
            var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
            title.textContent = sTesterName[i];
            $('#testerChart svg').find('text')[i].appendChild(title);
        }

        $("#testerChart svg text").each(function (index) {

            var testerName = $("#testerChart svg text:eq(" + index + ")").find("title").text();
            $(this).mouseover(function () { $(this).css("cursor", "pointer"); }).click(function () {
                report.showTesterGrid(report.forTesterNameSPID[testerName], testerName, "All");

            });

        });

        $("#PaginationTesterChart a").attr('href', '#testerChart');
    },
    /******** Added by shilpa  ****************/
    getChartWidth: function (barLength) {
        var chartWidth = 0;
        if (barLength == 1)
            chartWidth = 200;
        else
            chartWidth = barLength * 100 + 100;

        return chartWidth;
    },

    RoleNameForRoleID: [],
    RoleIDForRoleName: [],
    pIDsRolesAvail: [],
    TCNameForTCID: [],
    TSNameForTSID: [],
    ExpResForTSID: [],
    childItemsToShow: [],
    testStepLength: '',
    startIndexT: 0,
    forStatusGetChildItemsDet: [],
    forTCIDGetChildItemsDet: [],
    forRoleIDGetChildItemDet: [],
    roleIDsDet: [],
    statusDet: [],
    TCIDsDet: [],
    statusFilterFlag: 0,
    showTesterGrid: function (SPID, testerName, status) {
        report.statusFilterFlag = 0;
        report.forStatusGetChildItemsDet = [];//Added for Filter
        report.forTCIDGetChildItemsDet = [];
        report.forRoleIDGetChildItemDet = [];
        report.roleIDsDet = [];//Added for Filter
        report.statusDet = [];
        report.TCIDsDet = [];
        report.testStepDetails = [];
        report.arrayOfFilteredColumn = [];
        report.latestFilteredColumn = '';

        report.startIndexT = 0;
        report.testStepLength = '';
        report.childItemsToShow = [];
        var TPID = report.currentTPID;
        var childItems = [];
        $("#dvtabs").css('display', "");
        if (report.forTPIDSPIDGetChildItems[TPID + "~" + SPID] != undefined) {

            childItems = report.forTPIDSPIDGetChildItems[TPID + "~" + SPID].split("`");
            var childDetails = [];
            var mm = 0;
            var TestCaseIds = [];
            var TSIDs = [];
            var TCID = '';
            var ActRes = '';
            for (var i = 0; i < childItems.length; i++) {
                childDetails = childItems[i].split("~");
                if (status == "All" || status == childDetails[2]) {
                    TCID = childDetails[0];
                    if ($.inArray(TCID, TestCaseIds) == -1)
                        TestCaseIds.push(TCID);
                    if ($.inArray(childDetails[1], TSIDs) == -1)
                        TSIDs.push(childDetails[1]);
                    if (childDetails[4] == undefined || childDetails[4] == "undefined")
                        ActRes = "-";
                    else
                        ActRes = childDetails[4];

                    report.childItemsToShow[mm] = TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];

                    if (report.forStatusGetChildItemsDet[childDetails[2]] == undefined) {
                        report.forStatusGetChildItemsDet[childDetails[2]] = TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];
                        report.statusDet.push(childDetails[2]);
                    }
                    else
                        report.forStatusGetChildItemsDet[childDetails[2]] += "`" + TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];

                    if (report.forTCIDGetChildItemsDet[TCID] == undefined) {
                        report.forTCIDGetChildItemsDet[TCID] = TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];
                        report.TCIDsDet.push(TCID);
                    }
                    else
                        report.forTCIDGetChildItemsDet[TCID] += "`" + TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];

                    if (report.forRoleIDGetChildItemDet[childDetails[3]] == undefined) {
                        report.forRoleIDGetChildItemDet[childDetails[3]] = TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];
                        report.roleIDsDet.push(childDetails[3]);
                    }
                    else
                        report.forRoleIDGetChildItemDet[childDetails[3]] += "`" + TCID + "~" + childDetails[1] + "~" + childDetails[2] + "~" + childDetails[3] + "~" + ActRes + "~" + childDetails[5];

                    mm++;
                }
            }

            var statusTxt = '';
            switch (status) {
                case 'All':
                    statusTxt = "Total";
                    report.statusFilterFlag = 1;
                    break;
                case 'Pass':
                    statusTxt = "Passed";
                    break;
                case 'Fail':
                    statusTxt = "Failed";
                    break;
                case 'Not Completed':
                    statusTxt = "Not Completed";
                    break;
            }
            $("#testerName").html(testerName + ":<span id='spanTestNm'>" + report.childItemsToShow.length + " " + statusTxt + " " + report.gConfigTestStep + "(s)</span>");//Added By Mohini For Resource File(Date:25-02-2014)
            report.testStepDetails = report.childItemsToShow;
            report.filterGrid = 0;
            report.TCIDsAfterFilter = [];
            report.statusAfterFilter = [];
            report.RoleIDsAfterFilter = [];
            report.latestFilteredColumnDetails = [];
            report.latestFilteredColumn = '';
            report.showTestStepFromBuffer();
        }
        else
            $("#tblData").html("There are no " + report.gConfigTestStep + "s.");//Added By Mohini For Resource File(Date:25-02-2014)
    },
    startIndexTIncrement: function () {
        if ((report.startIndexT + 10) < report.testStepLength) {
            report.startIndexT += 10;
            report.showTestStepFromBuffer();
        }
    },
    startIndexTDecrement: function () {
        if (report.startIndexT >= 10) {
            report.startIndexT -= 10;
            report.showTestStepFromBuffer();
        }
    },
    showTestStepFromBuffer: function () {
        //////  Pagination of Test Steps starts here
        var arr = [];
        if (report.filterGrid == 1) {
            var TestStepListLength = report.testStepDetails.length;
            report.testStepLength = report.testStepDetails.length;
            arr = report.testStepDetails;
        }
        else {
            var TestStepListLength = report.childItemsToShow.length;
            report.testStepLength = report.childItemsToShow.length;
            arr = report.childItemsToShow;
        }
        if (TestStepListLength >= (report.startIndexT + 10))
            var Ei = report.startIndexT + 10;
        else
            var Ei = TestStepListLength;

        var TestStepCount = '<label>Showing ' + ((report.startIndexT) + 1) + '-' + Ei + ' of total  ' + TestStepListLength + ' ' + report.gConfigTestStep + '(s)</label> | <a id="previous" style="cursor:pointer" onclick="report.startIndexTDecrement();">Previous</a> | <a id="next" style="cursor:pointer"  onclick="report.startIndexTIncrement();">Next</a>';//Added by Mohini For Resource File(25-02-2014)		
        $('#infoDiv').empty();
        $("#infoDiv").append(TestStepCount);

        if (report.startIndexT <= 0) {
            document.getElementById('previous').disabled = "disabled";
            document.getElementById('previous').style.color = '#989898';

        }
        else {
            document.getElementById('previous').disabled = false;
            $('#next').css('class', 'pagingColor');
        }

        if (TestStepListLength <= ((report.startIndexT) + 10)) {
            document.getElementById('next').disabled = "disabled";
            document.getElementById('next').style.color = '#989898';
        }
        else {
            document.getElementById('next').disabled = false;
            $('#next').css('class', 'pagingColor');
        }

        var testinfo = '';
        testinfo += '<table class="reptTableTestCase gConfigTableHeader" id="testerGrid" cellspacing="0" style="table-layout:fixed;word-wrap: break-word;"><thead><tr>';
        testinfo += '<td class="TopHeading" style="width:5%">#</td>';
        testinfo += '<td id="colTCName" class="TopHeading tcName" style="width:18%">Test Case</td>';
        testinfo += '<td class="TopHeading" style="width:20%">Test Action / Steps</td>';
        testinfo += '<td id="colRole" class="TopHeading roleName" style="width:8%">Role </td>';
        testinfo += '<td class="TopHeading" style="width:20%">Expected Result</td>';
        testinfo += '<td class="TopHeading" style="width:20%">Actual Result</td>';
        if (report.statusFilterFlag == 1)
            testinfo += '<td id="colStatus" class="TopHeading status" style="width:18%">status </td>';
        else
            testinfo += '<td id="colStatus" class="TopHeading status" style="width:18%">status</td>';
        testinfo += '</tr></thead><tbody>';
        var items = [];
        for (var i = report.startIndexT; i < Ei; i++) {
            items = arr[i].split("~");
            testinfo += '<tr><td class="center" style="width:5%">' + items[0] + '</td>';
            testinfo += '<td>' + report.TCNameForTCID[items[0]] + '</td>';
            testinfo += '<td>' + report.TSNameForTSID[items[1]] + '</td>';
            testinfo += '<td>' + report.RoleNameForRoleID[items[3]] + '</td>';
            testinfo += '<td>' + report.ExpResForTSID[items[1]] + '</td>';
            testinfo += '<td>' + items[4] + '</td>';
            testinfo += '<td>' + items[2] + '</td></tr>';
        }
        testinfo = testinfo + '</tbody></table>';
        $("#tblData").html(testinfo);
        /*******Added by Mohini for Resource File(Date:25-02-2014)**********/
        resource.updateTableHeaderTextOfNewReportPage();
        $('#colTCName').append('<div style="float:right" id="dvTestCasesIDimg"><img onclick="report.filters(\'dvTestCasesID\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvTestCasesID" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        $('#colRole').append('<div style="float:right" id="dvRoleimg"><img onclick="report.filters(\'dvRole\');" src="/images/no-filter.png" style="cursor:pointer"  /></div><div id="dvRole" style="margin-top: 5px;position:absolute;width:150px;display:none"></div>');
        if (report.statusFilterFlag == 1) {
            $('#colStatus').append('<div style="float:right" id="dvStatusimg"><img onclick="report.filters(\'dvStatus\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvStatus" style="margin-top: 5px;position:absolute;width:150px;display:none"></div>');
        }
        /******************End of Resource File*********************/
        for (var mm = 0; mm < report.arrayOfFilteredColumn.length; mm++)
            $("#" + report.arrayOfFilteredColumn[mm] + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report.filters(\'' + report.arrayOfFilteredColumn[mm] + '\')"/>');

        /* shilpa: 7oct */
        $('#testerGrid tbody').find('td').find('img').each(function () {
            if ($(this).attr('width') > 200)
                $(this).css('width', '200');
            if ($(this).attr('height') > 200)
                $(this).css('height', '200');
        });

        $('#testerGrid tbody').find('td').find('table').each(function () {
            if ($(this).attr('width') > 200)
                $(this).css('width', '200');
            if ($(this).attr('height') > 300)
                $(this).css('height', '300');
        });

        /**/
        //Added by Mohinifor UI issue DT:18-08-2014
        $('#testerGrid tbody').find('td').find('table').each(function () {
            $(this).css('width', '190px');
            $(this).css('height', '190px');
        });

    },

    ////////////////////// Filters start Here  ////////////////////////////////
    arrayOfFilteredColumn: [],
    latestFilteredColumn: '',
    currentlyOpenFilter: '',
    latestFilteredColumnDetails: [],
    testStepDetails: [],
    filterGrid: 0,
    TCIDsAfterFilter: [],
    statusAfterFilter: [],
    RoleIDsAfterFilter: [],
    showFilteredData: function () {
        report.startIndexT = 0;
        report.filterGrid = 1;
        report.showTestStepFromBuffer();
    },
    startFilters: function () {
        switch (report.currentlyOpenFilter) {
            case "dvTestCasesID":
                report.applyFilter("dvTestCasesID");
                break;

            case "dvRole":
                report.applyFilter("dvRole");
                break;

            case "dvStatus":
                report.applyFilter("dvStatus");
                break;
        }
    },
    clearFilter: function (divID) {
        if ($.inArray(divID, report.arrayOfFilteredColumn) != -1) {
            $("#" + divID + "img").html('<img src="/images/no-filter.png" style="cursor:pointer" onclick="report.filters(\'' + report.currentlyOpenFilter + '\')"/>');
            $("#" + divID + "").html('');
            if (report.arrayOfFilteredColumn.length != 1) {
                var arr = new Array();
                for (var i = 0; i < report.arrayOfFilteredColumn.length; i++) {
                    if (report.arrayOfFilteredColumn[i] != divID)
                        arr.push(report.arrayOfFilteredColumn[i]);
                }
                report.arrayOfFilteredColumn = arr;
                report.latestFilteredColumn = arr[arr.length - 1];

                var index0 = '';
                var index1 = '';
                var arrTest0 = [];
                var arrTest1 = [];
                switch (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 1]) {
                    case "dvTestCasesID":
                        index0 = 0;
                        arrTest0 = report.TCIDsAfterFilter;
                        break;

                    case "dvRole":
                        index0 = 3;
                        arrTest0 = report.RoleIDsAfterFilter;
                        break;

                    case "dvStatus":
                        index0 = 2;
                        arrTest0 = report.statusAfterFilter;
                        break;
                }
                if (report.arrayOfFilteredColumn.length >= 2) {
                    switch (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 2]) {
                        case "dvTestCasesID":
                            index1 = 0;
                            arrTest2 = report.TCIDsAfterFilter;
                            break;

                        case "dvRole":
                            index1 = 3;
                            arrTest1 = report.RoleIDsAfterFilter;
                            break;

                        case "dvStatus":
                            index1 = 2;
                            arrTest1 = report.statusAfterFilter;
                            break;

                    }
                }
                if (report.latestFilteredColumnDetails[report.latestFilteredColumn] != undefined) {
                    var tpDetArr = [];
                    var arr = report.latestFilteredColumnDetails[report.latestFilteredColumn];
                    for (var i = 0; i < arr.length; i++) {
                        var items = arr[i].split("~");
                        if (($.inArray(items[index0], arrTest0) != -1 || arrTest0.length == 0) && ($.inArray(items[index1], arrTest1) != -1 || arrTest1.length == 0))
                            tpDetArr.push(arr[i]);

                    }
                    report.testStepDetails = tpDetArr;
                }
                $("#spanTestNm").children('span').html('');
                $("#spanTestNm").append('<span> [Filtered Result:' + report.testStepDetails.length + ']</span>');
                report.showFilteredData();
                for (var mm = 0; mm < report.arrayOfFilteredColumn.length; mm++)
                    $("#" + report.arrayOfFilteredColumn[mm] + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report.filters(\'' + report.arrayOfFilteredColumn[mm] + '\')"/>');
            }
            else {
                report.arrayOfFilteredColumn.length = 0;
                report.testStepDetails.length = 0;
                report.latestFilteredColumn = '';
                report.startIndexT = 0;
                report.filterGrid = 0;
                $("#spanTestNm").children('span').html('');
                report.showTestStepFromBuffer();
            }
        }
        if (divID == "dvTestCasesID")
            report.TCIDsAfterFilter = [];
        else if (divID == "dvStatus")
            report.statusAfterFilter = [];
        else
            report.RoleIDsAfterFilter = [];

    },
    filters: function (divID) {
        report.currentlyOpenFilter = divID;
        switch (divID) {
            case "dvTestCasesID": if ($("#dvTestCasesID").html() != "")
                $("#dvTestCasesID").html("");
            else {
                $("#dvTestCasesID").slideToggle("slow");
                $("#dvStatus").css("display", "none");
                $("#dvRole").css("display", "none");

                if (report.latestFilteredColumn == divID) {
                    if (report.latestFilteredColumnDetails[divID] != undefined) {
                        var TCIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report.latestFilteredColumnDetails[divID].length; i++) {
                            id = report.latestFilteredColumnDetails[divID][i].split("~")[0];
                            if ($.inArray(id, TCIDs) == -1)
                                TCIDs.push(id);
                        }
                        report.createMultiSelectList("dvTestCasesID", TCIDs, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report.testStepDetails.length; i++)
                            ids.push(report.testStepDetails[i].split("~")[0]);
                        multiSelectList.setSelectedItemsFromArray("dvTestCasesID", ids);
                    }
                }
                else if (report.testStepDetails.length == 0)
                    report.createMultiSelectList("dvTestCasesID", report.TCIDsDet, "130px;", "checked", "");
                else {
                    var TCIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report.testStepDetails.length; i++) {
                        id = report.testStepDetails[i].split("~")[0];
                        if ($.inArray(id, TCIDs) == -1)
                            TCIDs.push(id);
                    }
                    if (report.latestFilteredColumnDetails[divID] != undefined) {
                        var arr = report.latestFilteredColumnDetails[divID];
                        var TCIDs2 = new Array();
                        var id2 = '';
                        for (var i = 0; i < arr.length; i++) {
                            id2 = arr[i].split("~")[0];
                            if ($.inArray(id2, TCIDs2) == -1)
                                TCIDs2.push(id2);
                        }
                        report.createMultiSelectList("dvTestCasesID", TCIDs2, "130px;", "", "");
                        multiSelectList.setSelectedItemsFromArray("dvTestCasesID", TCIDs);
                    }
                    else
                        report.createMultiSelectList("dvTestCasesID", TCIDs, "130px;", "checked", "");
                }
            }
                break;

            case "dvRole":
                if ($("#dvRole").html() != "")
                    $("#dvRole").html("");
                else {
                    $("#dvRole").slideToggle("slow");
                    $("#dvStatus").css("display", "none");
                    $("#dvTestCasesID").css("display", "none");

                    if (report.latestFilteredColumn == divID) {
                        var roleIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report.latestFilteredColumnDetails[divID].length; i++) {
                            id = report.latestFilteredColumnDetails[divID][i].split("~")[3];
                            if ($.inArray(id, roleIDs) == -1)
                                roleIDs.push(id);
                        }
                        report.createMultiSelectList("dvRole", roleIDs, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report.testStepDetails.length; i++)
                            ids.push(report.testStepDetails[i].split("~")[3]);
                        multiSelectList.setSelectedItemsFromArray("dvRole", ids);
                    }
                    else if (report.testStepDetails.length == 0)
                        report.createMultiSelectList("dvRole", report.roleIDsDet, "130px;", "checked", "");
                    else {
                        var roleIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report.testStepDetails.length; i++) {
                            id = report.testStepDetails[i].split("~")[3];
                            if ($.inArray(id, roleIDs) == -1)
                                roleIDs.push(id);
                        }
                        if (report.latestFilteredColumnDetails[divID] != undefined) {
                            var arr = report.latestFilteredColumnDetails[divID];
                            var roleIDs2 = new Array();
                            var id2 = '';
                            for (var i = 0; i < arr.length; i++) {
                                id2 = arr[i].split("~")[3];
                                if ($.inArray(id2, roleIDs2) == -1)
                                    roleIDs2.push(id2);
                            }
                            report.createMultiSelectList("dvRole", roleIDs2, "130px;", "", "");
                            multiSelectList.setSelectedItemsFromArray("dvRole", roleIDs);
                        }
                        else
                            report.createMultiSelectList("dvRole", roleIDs, "130px;", "checked", "");
                    }
                }
                break;

            case "dvStatus":
                if ($("#dvStatus").html() != "")
                    $("#dvStatus").html("");
                else {
                    $("#dvStatus").slideToggle("slow");
                    $("#dvRole").css("display", "none");
                    $("#dvTestCasesID").css("display", "none");
                    if (report.latestFilteredColumn == divID) {
                        var status = new Array();
                        var id = '';
                        for (var i = 0; i < report.latestFilteredColumnDetails[divID].length; i++) {
                            id = report.latestFilteredColumnDetails[divID][i].split("~")[2];
                            if ($.inArray(id, status) == -1)
                                status.push(id);
                        }
                        report.createMultiSelectList("dvStatus", status, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report.testStepDetails.length; i++)
                            ids.push(report.testStepDetails[i].split("~")[2]);
                        multiSelectList.setSelectedItemsFromArray("dvStatus", ids);
                    }
                    else if (report.testStepDetails.length == 0)
                        report.createMultiSelectList("dvStatus", report.statusDet, "130px;", "checked", "");
                    else {
                        var status = new Array();
                        var id = '';
                        for (var i = 0; i < report.testStepDetails.length; i++) {
                            id = report.testStepDetails[i].split("~")[2];
                            if ($.inArray(id, status) == -1)
                                status.push(id);
                        }
                        if (report.latestFilteredColumnDetails[divID] != undefined) {
                            var arr = report.latestFilteredColumnDetails[divID];
                            var status2 = new Array();
                            var id2 = '';
                            for (var i = 0; i < arr.length; i++) {
                                id2 = arr[i].split("~")[2];
                                if ($.inArray(id2, status2) == -1)
                                    status2.push(id2);
                            }
                            report.createMultiSelectList("dvStatus", status2, "130px;", "", "");
                            multiSelectList.setSelectedItemsFromArray("dvStatus", status);
                        }
                        else
                            report.createMultiSelectList("dvStatus", status, "130px;", "checked", "");
                    }
                }
                break;
        }
        var filters = ["dvTestCasesID", "dvRole", "dvStatus"];
        for (var i = 0; i < filters.length; i++) {
            if ($("#" + filters[i] + "").html() != "" && filters[i] != divID) {
                $("#" + filters[i] + "").html('');
                break;
            }
        }
    },
    prevsGridData: [],
    applyFilter: function (currentFilter) {
        if ($("#" + currentFilter + " input:checkbox:not(:checked)").length != $("#" + currentFilter + " input:checkbox").length) {
            if ($("#" + currentFilter + " input:checkbox:checked").length < $("#" + currentFilter + " input:checkbox").length) {
                var flagFilterNotPresent = 0;
                var previousFilteredColumn = report.latestFilteredColumn;
                report.latestFilteredColumn = currentFilter;
                if ($.inArray(currentFilter, report.arrayOfFilteredColumn) == -1) {
                    report.arrayOfFilteredColumn.push(currentFilter);
                    flagFilterNotPresent = 1;
                }
                var index0 = '';
                var arrTest0 = [];
                var index = '';
                var arrTest = [];
                var index1 = '';
                var arrTest1 = [];
                if (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 1] != currentFilter) {
                    switch (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 1]) {

                        case "dvTestCasesID":
                            index0 = 0;
                            arrTest0 = report.TCIDsAfterFilter;
                            break;

                        case "dvRole":
                            index0 = 3;
                            arrTest0 = report.RoleIDsAfterFilter;
                            break;

                        case "dvStatus":
                            index0 = 2;
                            arrTest0 = report.statusAfterFilter;
                            break;
                    }
                }
                if (report.arrayOfFilteredColumn.length > 1) {
                    if (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 2] != currentFilter) {
                        switch (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 2]) {
                            case "dvTestCasesID":
                                index = 0;
                                arrTest = report.TCIDsAfterFilter;
                                break;

                            case "dvRole":
                                index = 3;
                                arrTest = report.RoleIDsAfterFilter;
                                break;

                            case "dvStatus":
                                index = 2;
                                arrTest = report.statusAfterFilter;
                                break;
                        }
                    }
                    if (report.arrayOfFilteredColumn.length >= 3) {
                        if (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 3] != currentFilter) {
                            switch (report.arrayOfFilteredColumn[report.arrayOfFilteredColumn.length - 3]) {
                                case "dvTestCasesID":
                                    index1 = 0;
                                    arrTest1 = report.TCIDsAfterFilter;
                                    break;

                                case "dvRole":
                                    index1 = 3;
                                    arrTest1 = report.RoleIDsAfterFilter;
                                    break;

                                case "dvStatus":
                                    index1 = 2;
                                    arrTest1 = report.statusAfterFilter;
                                    break;

                            }
                        }
                    }
                }
                var arrBuf = [];
                if (currentFilter == "dvTestCasesID") {
                    arrBuf = report.TCIDsAfterFilter;
                    report.TCIDsAfterFilter = [];
                }
                else if (currentFilter == "dvStatus") {
                    arrBuf = report.statusAfterFilter;
                    report.statusAfterFilter = [];
                }
                else {
                    arrBuf = report.RoleIDsAfterFilter;
                    report.RoleIDsAfterFilter = [];
                }
                var testStepDetails = [];
                testStepDetails = report.testStepDetails;
                report.testStepDetails = new Array();
                var data = new Array();
                var childItms2 = [];
                $("#" + currentFilter + " div div li").each(
					function () {
					    childItms2 = [];
					    switch (currentFilter) {
					        case "dvTestCasesID":
					            childItems2 = report.forTCIDGetChildItemsDet[$(this).children(".mslChk").attr('Id').split("_")[1]];
					            break;
					        case "dvRole":
					            childItems2 = report.forRoleIDGetChildItemDet[$(this).children(".mslChk").attr('Id').split("_")[1]];
					            break;
					        case "dvStatus":
					            childItems2 = report.forStatusGetChildItemsDet[$(this).children(".mslChk").attr('Id').split("_")[1]];
					            break;
					    }
					    if (childItems2 != undefined)
					        data = data.concat(childItems2.split("`"));
					    if ($(this).children(".mslChk").attr('checked') == true) {
					        if (childItems2 != undefined) {
					            var childItems = childItems2.split("`");
					            for (var i = 0; i < childItems.length; i++) {
					                var items = childItems[i].split("~");
					                if (($.inArray(items[index0], arrTest0) != -1 || arrTest0.length == 0) && ($.inArray(items[index], arrTest) != -1 || arrTest.length == 0) && ($.inArray(items[index1], arrTest1) != -1 || arrTest1.length == 0))
					                    report.testStepDetails.push(childItems[i]);
					            }
					            if (currentFilter == "dvTestCasesID")
					                report.TCIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
					            else if (currentFilter == "dvStatus")
					                report.statusAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
					            else
					                report.RoleIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);

					        }
					    }
					});
                if (report.testStepDetails.length != 0) {
                    report.latestFilteredColumnDetails[currentFilter] = data;
                    report.showFilteredData(report.testStepDetails);
                    $("#" + report.currentlyOpenFilter + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report.filters(\'' + report.currentlyOpenFilter + '\')"/>');
                    if ((previousFilteredColumn != '' && previousFilteredColumn != currentFilter || report.arrayOfFilteredColumn.length > 1)) {
                        for (var mm = 0; mm < report.arrayOfFilteredColumn.length; mm++)
                            $("#" + report.arrayOfFilteredColumn[mm] + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report.filters(\'' + report.arrayOfFilteredColumn[mm] + '\')"/>');
                    }
                    $("#spanTestNm").children('span').html('');
                    $("#spanTestNm").append('<span> [Filtered Result:' + report.testStepDetails.length + ']</span>');
                }
                else {
                    if (currentFilter == "dvTestCasesID")
                        report.TCIDsAfterFilter = arrBuf;
                    else if (currentFilter == "dvStatus")
                        report.statusAfterFilter = arrBuf;
                    else
                        report.RoleIDsAfterFilter = arrBuf;
                    report.testStepDetails = testStepDetails;
                    if (flagFilterNotPresent == 1) {
                        report.latestFilteredColumn = previousFilteredColumn;
                        var arr = new Array();
                        for (var i = 0; i < report.arrayOfFilteredColumn.length; i++) {
                            if (report.arrayOfFilteredColumn[i] != currentFilter)
                                arr.push(report.arrayOfFilteredColumn[i]);
                        }
                        report.arrayOfFilteredColumn = arr;
                    }
                    //report.alertBox("No Test Step available with selected filter!");
                    report.alertBox("No " + report.gConfigTestStep + " available with selected filter!");//Added by Mohini for Resource File(Date:25-02-2014)
                }
            }
            else if ($("#" + currentFilter + " input:checkbox:checked").length == $("#" + currentFilter + " input:checkbox").length) {
                report.clearFilter(currentFilter);
            }
            $("#" + report.currentlyOpenFilter + "").html('');

        }
        else {
            report.alertBox("Atleast one filter item should be selected!");
        }
    },
    cancel: function (divID) {
        $("#" + divID + "").html('');
    },

    createMultiSelectList: function (divID, listItems, height, chk, clear) {
        var divhtml = "";
        if (divID != "dvStatus")
            divhtml = "<div class='Mediumddl' style='border: solid 1px #ccc; width:300px; padding-left:1px;margin-left:-10px;margin-top:8.5px'>";
        else
            divhtml = "<div class='Mediumddl' style='border: solid 1px #ccc; width:150px; padding-left:1px;margin-left:-58px;margin-top:8.5px'>";
        divhtml += "<ul id='ulItems" + divID + "' style='list-style-type:none; list-style-position:outside;display:inline;'>" +
			"<li>Select:&nbsp;<a id='linkSA_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\"" + divID + "\");" + multiSelectList.functionToInvoke + "'>All</a>" +
				 "&nbsp;&nbsp;<a id='linkSN_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\"" + divID + "\");" + multiSelectList.functionToInvoke + "'>None</a>";
        if (clear == "clear" || $.inArray(divID, report.arrayOfFilteredColumn) != -1)
            divhtml += "&nbsp;&nbsp;|&nbsp;&nbsp;<a id='anchShow_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='report.clearFilter(\"" + divID + "\");'>Clear Filter</a></li>";
        divhtml += "<li><hr/></li>";
        divhtml += "<div style='overflow-y:auto; height:" + height + " width:inherit;white-space: nowrap;border:1px #ccc solid'>";

        for (var i = 0; i < listItems.length; i++) {
            var itemId = divID + "_" + listItems[i];

            switch (divID) {
                case "dvTestCasesID":
                    var hoverTxt = report.TCNameForTCID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;

                case "dvStatus":
                    if (chk == "checked")
                        divhtml = divhtml + "<li><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + listItems[i] + "</span>" + listItems[i] + "</li>";
                    else
                        divhtml = divhtml + "<li><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + listItems[i] + "</span>" + listItems[i] + "</li>";
                    break;

                case "dvRole":
                    var hoverTxt = report.RoleNameForRoleID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;
            }

        }
        divhtml += "</div></ul><div style='margin-top:5px;float:right;padding:5px 0px 5px 0px'><input type='button' class='btn' style='width:50px;margin-left:0px' value='Ok' onclick='report.startFilters()'/><input type='button' class='btn' style='margin-left:0px' value='Cancel' style='margin-left:5px;margin-right:7px;' onclick='report.cancel(\"" + divID + "\");'/></div></div>";

        $("#" + divID).html(divhtml);

    },
    createFilterContainerPostFilter: function (divID) {

    },

    dmlOperation: function (search, list) {
        var listname = jP.Lists.setSPObject(report.SiteURL, list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        return (result);
    },
    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 150, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },

    //To get the data from WCF layer |Ejaz Waquif DT:11/18/2014 
    getDataFromService: function () {
        //_spUserId = '19'
        //call the service layer to get data		
        report.dataCollection = ServiceLayer.GetData('GetStakeholderProjectDetails', null, 'StakeholderDashboard');

        //Once the data loaded call the report.pageLoad function
        report.pageLoad();

        //Get the TestStep data		
        report.testStepCollection = ServiceLayer.GetData('GetStakeholderTestStep', null, 'StakeholderDashboard');

        report.FillTestStepArray();
    },


    //To convert the status count in percentage for Project |Ejaz Waquif DT:11/18/2014 
    ConvertProjectStatusInPercent: function () {

        $(report.allProjectIDs).each(function (ind, itm) {

            report.passFailNCCountByPID[itm] = report.pieDataForAllProjectIDs[itm];
            var statusPercent = report.getPercentageByCount(report.pieDataForAllProjectIDs[itm]);

            report.pieDataForAllProjectIDs[itm] = statusPercent;

        });

    },

    //To fill the Test Step details in global array |Ejaz Waquif DT:11/18/2014 
    FillTestStepArray: function () {
        //Initialise the global variables
        report.forTPIDSPIDGetChildItems = new Array();

        report.testerNameForSPID = new Array();

        report.forTPIDGetSPIDs = new Array();

        var arrLength = report.testStepCollection.length;

        var data = report.testStepCollection;


        for (var i = 0; i < arrLength ; i++) {

            var testStepDetailLen = data[i]["lstStakeholderDbTSDetails"].length;

            var testStepDetail = data[i]["lstStakeholderDbTSDetails"];

            var TPID = data[i]["testpassId"];

            var SPID = data[i]["testerId"];

            var PID = data[i]["projectId"];

            var testersPerformedTesting = new Array();

            var countPass = 0;

            var countFail = 0;

            var countNC = 0;


            for (var j = 0; j < testStepDetailLen; j++) {

                //To fill the required global arrays
                if (report.forTPIDSPIDGetChildItems[TPID + "~" + SPID] == undefined)
                    report.forTPIDSPIDGetChildItems[TPID + "~" + SPID] = data[i]['testcaseId'] + "~" + testStepDetail[j]['teststepId'] + "~" + testStepDetail[j]['status'] + "~" + data[i]['roleId'] + "~" + testStepDetail[j]['actualResult'] + "~" + "TC2TSmap";
                else
                    report.forTPIDSPIDGetChildItems[TPID + "~" + SPID] += "`" + data[i]['testcaseId'] + "~" + testStepDetail[j]['teststepId'] + "~" + testStepDetail[j]['status'] + "~" + data[i]['roleId'] + "~" + testStepDetail[j]['actualResult'] + "~" + "TC2TSmap";

                //Test Step name for Test Step ID
                report.TSNameForTSID[testStepDetail[j]['teststepId']] = testStepDetail[j]['teststepName'];

                //Expected result for Test Step Id
                report.ExpResForTSID[testStepDetail[j]['teststepId']] = testStepDetail[j]['expectedResult'];

                //To fill the Test Step details by Project ID
                if (report.childItemsForPID[PID] == undefined) {
                    report.childItemsForPID[PID] = new Array();
                    report.childItemsForPID[PID].push({
                        "testPassId": TPID,
                        "TestStep": testStepDetail[j]['teststepId'],
                        "status": testStepDetail[j]['status'],
                        "Role": data[i]['roleId'],
                        "testCaseId": data[i]['testcaseId'],
                        "SPUserID": SPID,
                        "modified": testStepDetail[j]['modified'],
                        "created": testStepDetail[j]['created'],
                        "actualResult": testStepDetail[j]['actualResult']
                    });
                }
                else {
                    report.childItemsForPID[PID].push({
                        "testPassId": TPID,
                        "TestStep": testStepDetail[j]['teststepId'],
                        "status": testStepDetail[j]['status'],
                        "Role": data[i]['roleId'],
                        "testCaseId": data[i]['testcaseId'],
                        "SPUserID": SPID,
                        "modified": testStepDetail[j]['modified'],
                        "created": testStepDetail[j]['created'],
                        "actualResult": testStepDetail[j]['actualResult']
                    });

                }

                //To fill the Test Step details by Test pass Id
                if (report.childItemsForTPID[TPID] == undefined)
                    report.childItemsForTPID[TPID] = "TPMapId" + "~" + testStepDetail[j]['teststepId'] + "~" + testStepDetail[j]['status'] + "~" + data[i]['roleId'] + "~" + testStepDetail[j]['actualResult'] + "~" + "TCMapID";
                else
                    report.childItemsForTPID[TPID] += "`" + "TPMapId" + "~" + testStepDetail[j]['teststepId'] + "~" + testStepDetail[j]['status'] + "~" + data[i]['roleId'] + "~" + testStepDetail[j]['actualResult'] + "~" + "TCMapID";

                //To calculate the testers performed testing
                switch (testStepDetail[j]['status']) {
                    case 'Pass':
                        countPass++;
                        if ($.inArray(SPID, testersPerformedTesting) == -1)
                            testersPerformedTesting.push(SPID);
                        break;
                    case 'Fail':
                        countFail++;
                        if ($.inArray(SPID, testersPerformedTesting) == -1)
                            testersPerformedTesting.push(SPID);
                        break;
                    case 'Not Completed':
                        countNC++;

                }
            }

            //Testers performed Testing by Project Id
            if (report.TestersStartedTestingByPID[PID] == undefined) {
                report.TestersStartedTestingByPID[PID] = new Array();
                report.TestersStartedTestingByPID[PID].push(testersPerformedTesting);
            }
            else {
                for (var k = 0; k < testersPerformedTesting.length; k++) {
                    if ($.inArray(testersPerformedTesting[k], report.TestersStartedTestingByPID[PID]) == -1) {
                        report.TestersStartedTestingByPID[PID].push(testersPerformedTesting[k]);
                    }
                }
            }

            //Tester names for Tester Id array
            report.testerNameForSPID[SPID] = data[i]["testerName"];

            //For TPID all SPID array
            if (report.forTPIDGetSPIDs[TPID] == undefined)
                report.forTPIDGetSPIDs[TPID] = SPID.toString();
            else if ($.inArray(SPID, report.forTPIDGetSPIDs[TPID].split(",")) == -1)
                report.forTPIDGetSPIDs[TPID] += "," + SPID;

            //Role Id for Names Array
            report.RoleIDForRoleName[data[i]['roleName']] = data[i]['roleId'];

            //Role Names for Role Id Array
            report.RoleNameForRoleID[data[i]['roleId']] = data[i]['roleName'];

            //Test Case name for Test Case ID array
            report.TCNameForTCID[data[i]['testcaseId']] = data[i]['testcaseName'];

            //Test Pass Name By Test Pass Id
            report.TPNameForTPID[TPID] = data[i]['testpassName'];

            //Project Name by project Id
            report.projectNameForPID[PID] = data[i]['testcaseName'];

        }

    }

}


