/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/


var report2 = {

    projectsCons: [],

    pieDataWithExecForPIDs: [],

    projectsConsWithExcec: [],

    allProjectIDsWithExcec: [],

    execMode: 0,

    minDate: '',

    maxDate: '',

    filterGrid: 1,

    ExecTSandTesterCountForProjectIDs: new Array(),

    pptResetFlag: 0,

    flagForBarChart: 0,

    /* Export To PPT */
    pptDate: new Array(),

    pptDate1: new Array(),

    //variable for Portfolio
    flagonload: 0,

    projectsConsWithExcecPortfolio: new Array(),

    projectsConsPortfolio: new Array(),

    //variables added by Mohini DT:18-03-2014
    arrprjChecked: new Array(),

    arrprjUnchecked: new Array(),

    q1: new Array(),

    q2: new Array(),

    q3: new Array(),

    q4: new Array(),

    currentYear: '',

    currentQuarter: '',

    arrfy: new Array(),

    arrfyYear: new Array(),

    projectsExpPPT: new Array(),

    setStatusFilter: function () {
        $("#setFilter").val("Select");
        $("#setFiscal option:last-child").attr("selected", true);//For bug ID:12972 |Ejaz Waquif DT:2/Jan/2015
        $("#dvCalender").hide();
        $("#quarter input").each(function () {
            if ($(this).attr('checked'))
                $(this).attr('checked', false);
        });

        setTimeout('report2.fillGridForDateFilter(0);', 200);
    },

    setFiscalFilter: function () {
        $("#quarter input").each(function () {
            if ($(this).attr('checked'))
                $(this).attr('checked', false);
        });
    },


    setFilter: function () {
        $("#setStatus").val("All");

        $("#setFiscal option:last-child").attr("selected", true);//For bug ID:12972 |Ejaz Waquif DT:2/Jan/2015

        $("#quarter input").each(function () {
            if ($(this).attr('checked'))
                $(this).attr('checked', false);
        });
        if ($("#setFilter").val() == "Select") {
            $("#quarterDiv").hide();
            $("#dvCalender").hide();
            setTimeout('report2.fillGridForDateFilter(0);', 200);
            //$("#goButton").hide();
        }
        else if ($("#setFilter").val() == "Dates") {
            $("#quarterDiv").hide();
            $("#dvCalender").show();
            $("#goButton").show();
            $("#startDate").val('');
            $("#endDate").val('');
            $('#ui-datepicker-div').css('top', '0');
            $('#ui-datepicker-div').css('z-index', '1000');
            $('#ui-datepicker-div').css('position', 'relative');
        }
        else {
            $("#dvCalender").hide();
            $("#quarterDiv").hide();
            //$("#goButton").show();
            setTimeout('report2.fillGridForDateFilter(1);', 200);
        }
        /* shilpa 9oct : showing datepicker above textbox field */
        $('img[title="Select Date"]').click(function () {
            var t = $('#ui-datepicker-div').offset().top - 206;
            $('#ui-datepicker-div').css('top', t);
        });
        /**/
        function func() {
            alert('a');
        }
        /* reload datepicker */
        $("#startDate").datepicker("destroy");
        $("#endDate").datepicker("destroy");
        if (isRootWeb) {
            $("#startDate").datepicker({
                showOn: "button",
                buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true,
                onSelect: function (curDate, instance) {
                    if (curDate != instance.lastVal) {
                        if ($("#startDate").val() != "" && $("#endDate").val() != "")
                            setTimeout('report2.fillGridForDateFilter(1);', 200);
                    }
                }
            });
            $("#endDate").datepicker({
                showOn: "button",
                buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true,
                onSelect: function (curDate, instance) {
                    if (curDate != instance.lastVal) {
                        if ($("#startDate").val() != "" && $("#endDate").val() != "")
                            setTimeout('report2.fillGridForDateFilter(1);', 200);
                    }
                }
            });
        }
        else {
            $("#startDate").datepicker({
                showOn: "button",
                buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true,
                onSelect: function (curDate, instance) {
                    if (curDate != instance.lastVal) {
                        if ($("#startDate").val() != "" && $("#endDate").val() != "")
                            setTimeout('report2.fillGridForDateFilter(1);', 200);
                    }
                }
            });
            $("#endDate").datepicker({
                showOn: "button",
                buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true,
                onSelect: function (curDate, instance) {
                    if (curDate != instance.lastVal) {
                        if ($("#startDate").val() != "" && $("#endDate").val() != "")
                            setTimeout('report2.fillGridForDateFilter(1);', 200);
                    }
                }
            });
        }
        $(".ui-datepicker-trigger").css('margin-left', '6px');
        $(".ui-datepicker-trigger").css('margin-top', '5px');
        $(".ui-datepicker-trigger").css('height', '14px');
        $(".ui-datepicker-trigger").css('width', '14px');
        $(".ui-datepicker-trigger").attr('title', 'Select Date');
        $('#ui-datepicker-div').css('top', '0');
        $('#ui-datepicker-div').css('z-index', '1000');
        $('#ui-datepicker-div').css('position', 'relative');
        /**/
        /* shilpa 9oct : showing datepicker above textbox field */
        $('img[title="Select Date"]').click(function () {
            var t = $('#ui-datepicker-div').offset().top - 206;
            $('#ui-datepicker-div').css('top', t);
            //$('#ui-datepicker-div').css('position','relative');
            //$('#ui-datepicker-div').css('margin-top','-670px'); 
        });
        /**/
    },
    ConsolidateInit: function () {
        $("#dvCon h1").css('color', ' #1f1f1f');

        $("#dvDet h1").css('color', '#f60');

        $("#dvCalender").hide();

        $("#goButton").hide();

        $("#startDate").datepicker("destroy");

        $("#endDate").datepicker("destroy");

        $("#startDate").datepicker({

            showOn: "button",
            buttonImage: "/css/theme/" + themeColor + "/images/Calendar-Logo.gif",
            buttonImageOnly: true,
            dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true

        });

        $("#endDate").datepicker({

            showOn: "button",
            buttonImage: "./css/theme/" + themeColor + "/images/Calendar-Logo.gif",
            buttonImageOnly: true,
            dateFormat: "mm/dd/yy", changeMonth: true, changeYear: true

        });

        $(".ui-datepicker-trigger").css('margin-left', '6px');

        $(".ui-datepicker-trigger").css('margin-top', '5px');

        $(".ui-datepicker-trigger").css('height', '14px');

        $(".ui-datepicker-trigger").css('width', '14px');

        $(".ui-datepicker-trigger").attr('title', 'Select Date');

        $('#ui-datepicker-div').css('top', '0');

        $('#ui-datepicker-div').css('z-index', '1000');

        $('#ui-datepicker-div').css('position', 'relative');

        $("#dvDetView").show();

        $("#dvDateFilter").show();

        $("#dvConView").hide();

        report2.execMode = 0;

        report.removedPID = [];

        report2.projectsCons = [];

        report2.filterGrid = 0;

        $("#tblDataDet").html('');

        $("#infoDivDet").html('');

        $("#setFilter").val("Select");

        $("#tpAllCons").click(function () {
            report2.showDataForProjectStatus('All');
        });

        $("#tpPassCons").click(function () {

            report2.showDataForProjectStatus('Pass');

        });

        $("#tpNCCons").click(function () {

            report2.showDataForProjectStatus('Not Completed');

        });

        $("#tpFailCons").click(function () {

            report2.showDataForProjectStatus('Fail');

        });

        $("#tpExecCons").click(function () {
            report2.showDataForProjectStatus('Executed');
            $("#tpAllCons").css("color", "white");
            $("#tpPassCons").css("color", "white");
            $("#tpNCCons").css("color", "white");
            $("#tpFailCons").css("color", "white");
            $("#tpExecCons").css("color", "");
        });

        $("#tpAllCons").css("color", "white");

        $("#tpPassCons").css("color", "white");

        $("#tpNCCons").css("color", "white");

        $("#tpFailCons").css("color", "white");

        $("#tpExecCons").css("color", "white");
    },

    resetCons: function () {
        $('#executedBarGraph').css('width', '0%');

        $('#executedTable').hide();

        $("#executedMessage").hide();

        $("#execLegend").hide();

        $("#executedMessageForLessTS").hide();

        $("#quarterDiv").hide();

        $("#setStatus").val("All");

        report2.ConsolidateInit();

        report2.projectsConsolidateView();

        Main.hideLoading();
    },

    todayFilter: function () {
        report.showProjects(report.projectItems);

        report2.ConsolidateInit();

        $("#setStatus").val("Active");

        $("#setFilter").val('1');

        $("#dvCalender").hide();

        $("#setFiscal").val(report2.currentYear);

        $("#quarter input").each(function () {
            $(this).attr('checked', false);
        });

        $("#" + report2.currentQuarter).attr('checked', true);

        //setTimeout('report2.fillGridForDateFilter(1);report2.filterFailesTestSteps();Main.hideLoading();',200);	
        setTimeout('report2.fillGridForDateFilter(1);report2.showDataForProjectStatus("Executed");Main.hideLoading();', 200);
    },

    //For Portfolio Feature :Mohini Date:06-03-2014
    todayFilterPortfolio: function () {
        report.showProjects(report.projectItems);

        report2.ConsolidateInit();

        $("#setStatus").val("Active");

        $("#setFilter").val('1');

        $("#dvCalender").hide();

        $("#setFiscal").val(report2.currentYear);

        $("#quarter input").each(function () {
            $(this).attr('checked', false);
        });

        $("#" + report2.currentQuarter).attr('checked', true);

        //setTimeout('report2.fillGridForDateFilter(1);report2.filterFailesTestSteps();Main.hideLoading();',200);
        setTimeout('report2.fillGridForDateFilter(1);report2.showDataForProjectStatus("Executed");Main.hideLoading();', 200);
    },

    //Added on 25 Nov 2013
    filterFailesTestSteps: function () {
        report2.statusFilterFlagCons = 1;

        //report2.showDataForProjectStatus2("Executed");
        report2.showDataForProjectStatus2("Fail");

        $("#tpAllCons").css("color", "white");

        $("#tpPassCons").css("color", "white");

        $("#tpNCCons").css("color", "white");

        /*Added by Mohini for bug id 12020 DT:25-06-2014*/
        $("#tpFailCons").css("color", "");

        $("#tpExecCons").css("color", "white");

        if (report2.statusCons.length == 2) {
            report2.createMultiSelectList("dvStatusC", report2.statusCons, "130px;", "checked", "");

            $("#dvStatusC").css("display", "");

            $("#dvStatusC_Pass").attr('checked', false);

            report2.applyFilter("dvStatusC");
        }
    },

    projectsConsolidateView: function () {
        report2.showProjectsCons();

        if (report.isPortfolioOn)//added by Mohini
        {
            var member = report2.projectsConsPortfolio.length;
        }
        else {
            var member = report2.projectsCons.length;
        }
        var member = report2.projectsCons.length;

        $("#PaginationCons").pagination(member, {

            callback: report2.callbackForProjectCons,
            items_per_page: 5,
            num_display_entries: 10,
            num: 2
        });
    },

    callbackForProjectCons: function (page_index, jq) {
        var items_per_page = 5;

        if (report.isPortfolioOn)//added by Mohini
        {
            var max_elem = Math.min((page_index + 1) * items_per_page, report2.projectsConsPortfolio.length);

            var newcontent = '';

            // Iterate through a selection of the content and build an HTML string
            for (var i = page_index * items_per_page; i < max_elem; i++)
                newcontent += report2.projectsConsPortfolio[i];
        }
        else {
            var max_elem = Math.min((page_index + 1) * items_per_page, report2.projectsCons.length);

            var newcontent = '';

            // Iterate through a selection of the content and build an HTML string
            for (var i = page_index * items_per_page; i < max_elem; i++)
                newcontent += report2.projectsCons[i];
        }


        $('#prjDetailsCons').empty().html(newcontent);

        var trGroupArr = new Array();

        $('#prjDetailsCons tr').each(function () {

            if ($.inArray($(this).attr("group"), trGroupArr) == -1) {
                trGroupArr.push($(this).attr("group"));
            }

        });


        $.each(trGroupArr, function (ind, itm) {

            var cnt = 1;

            var len = $('tr[group="' + itm + '"]').length;

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


        $("#prjDetailsCons input").each(function () {
            if ($.inArray($(this).attr('id').split('s')[1], report.removedPID) == -1)
                $(this).attr('checked', true)
        });

        report2.projectCheckForCons();

    },

    projectCheckForCons: function (pID) {
        //added by Mohini DT:18-03-2014
        if (pID == undefined) {
            report2.arrprjChecked = [];
            report2.arrprjUnchecked = [];
        }
        else {
            report2.arrprjChecked = jQuery.grep(report2.arrprjChecked, function (n) {
                return (n != pID);
            });

            report2.arrprjUnchecked = jQuery.grep(report2.arrprjUnchecked, function (n) {
                return (n != pID);
            });
        }
        /**********************************/
        try {
            $("#tblDataDet").html('');
            $("#infoDivDet").html('');
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
            if (pID != undefined) {
                if ($("#Cons" + pID).attr('checked') == false) {
                    report2.arrprjUnchecked.push(pID.toString());
                    if ($.inArray(pID.toString(), report.removedPID) == -1)
                        report.removedPID.push(pID.toString());
                }
                else {
                    report2.arrprjChecked.push(pID.toString());
                    var index = report.removedPID.indexOf(pID.toString());
                    if (index > -1)
                        report.removedPID.splice(index, 1);
                }

            }
            for (var i = 0; i < report.allProjectIDs.length; i++) {
                if ($.inArray(report.allProjectIDs[i].toString(), report.removedPID) == -1) {
                    if ($.inArray(report.allProjectIDs[i], report2.arrprjChecked) == -1) {
                        report2.arrprjChecked.push(report.allProjectIDs[i]);
                    }
                    var prjParams = report.passFailNCCountByPID[report.allProjectIDs[i]];
                    if (prjParams != "-" && prjParams != undefined) {
                        //prjParams = prjParams.split(',');
                        if (prjParams[0] != "NaN" && !(isNaN(prjParams[0]))) {
                            passCnt += parseInt(prjParams[0], 10);
                            notCompCnt += parseInt(prjParams[2], 10);
                            failCnt += parseInt(prjParams[1], 10);
                        }
                        avgCnt++;

                        /*
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
                        */
                        if (report.TestersStartedTestingByPID[report.allProjectIDs[i]] != undefined) {
                            totalSPIDs.push(report.TestersStartedTestingByPID[report.allProjectIDs[i]]);
                        }
                    }
                }
            }
            ///// Test Step(s) Statistics: Start here ///////
            /*
             $("#passCount").text(totalTSPass);
             $("#failCount").text(totalTSFail);
             $("#NCCount").text(totalTSNC);
             $("#execCount").text(0);
             $("#totalTSCount").text(totalTS);
             $("#execTesters").text(totalSPIDs.length);
             */
            //////////////////////////////////////////////////

            var totalCount = passCnt + notCompCnt + failCnt;

            $("#passCount").text(passCnt);
            $("#failCount").text(failCnt);
            $("#NCCount").text(notCompCnt);
            $("#execCount").text(0);
            $("#totalTSCount").text(totalCount);
            $("#execTesters").text(totalSPIDs.length);


            var pieArray = [];
            pieArray[0] = passCnt;
            pieArray[1] = notCompCnt;
            pieArray[2] = failCnt;

            //pieArray = report.getPercentageByCount( new Array(passCnt, failCnt, notCompCnt) );

            if (pieArray[0] != undefined) {
                report2.fillProjectConsPie(pieArray);
            }
        }
        catch (e) {
            alert(e.message);
        }
    },
    fillProjectConsPie: function (pieArray) {
        var totalPass = pieArray[0];
        var totalNotCompleted = pieArray[1];
        var totalFail = pieArray[2];
        var flagPassRounded = false;
        var flagFailRounded = false;
        var flagNCRounded = false;
        var temp1, temp2, temp3;
        var total;

        total = totalPass + totalNotCompleted + totalFail;

        temp1 = ((totalPass / total) * 100).toFixed(0);

        if (((totalPass / total) * 100) != temp1)
            flagPassRounded = true;

        temp2 = ((totalNotCompleted / total) * 100).toFixed(0);

        if (((totalNotCompleted / total) * 100) != temp2)
            flagNCRounded = true;

        temp3 = ((totalFail / total) * 100).toFixed(0);

        if (((totalFail / total) * 100) != temp3)
            flagFailRounded = true;

        if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) > 100) {
            if (flagPassRounded)
                temp1 = Math.floor((totalPass / total) * 100);
            else if (flagFailRounded)
                temp3 = Math.floor((totalFail / total) * 100);
            else if (flagNCRounded)
                temp2 = Math.floor((totalNotCompleted / total) * 100);
        }
        else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) < 100) {
            if (flagPassRounded)
                temp1 = Math.ceil((totalPass / total) * 100);
            else if (flagFailRounded)
                temp3 = Math.ceil((totalFail / total) * 100);
            else if (flagNCRounded)
                temp2 = Math.ceil((totalNotCompleted / total) * 100);
        }

        var pieChartArray = new Array();
        pieChartArray.push(parseInt(temp1));
        pieChartArray.push(parseInt(temp2));
        pieChartArray.push(parseInt(temp3));

        var pieChartArrayLab = new Array();
        pieChartArrayLab.push(temp1);
        pieChartArrayLab.push(temp2);
        pieChartArrayLab.push(temp3);

        var pieChartArrayTooltips = new Array();
        var total = $("#totalTSCount").text();
        /*pieChartArrayTooltips.push(temp1+"% of the scripts for selected project(s) ("+total+" total) have passed.");
        pieChartArrayTooltips.push(temp2+"% of the scripts for selected project(s) ("+total+" total) have not been completed.");
        pieChartArrayTooltips.push(temp3+"% of the scripts for selected project(s) ("+total+" total) have failed.");*/

        /****************Added By Mohini For Resource File(25-02-2014)****************/
        pieChartArrayTooltips.push(temp1 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have passed.");
        pieChartArrayTooltips.push(temp2 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have not been completed.");
        pieChartArrayTooltips.push(temp3 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have failed.");


        if (pieChartArray == undefined || pieChartArray == null || isNaN(pieChartArray[0]) == true) {
            if (report.flagForDateFilter == 0) {
                if (report.isPortfolioOn)//if portfolio is On
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)
                else
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;margin-left:-100px;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)

                $("#executedMessage").hide();
            }
            else {
                if (report.isPortfolioOn)//if portfolio is On
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)
                else
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;margin-left:-100px;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)

                $("#executedMessage").hide();
            }
        }
        else {
            try {
                $("#pieChartDet").chart('clear');
                $("#pieChartDet").chart({
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
    showProjectsCons: function () {
        //Defined by Mohini
        var SortArrByGroup = new Array();
        var IndexOfArr = 0;
        var projectIdArr = new Array();

        if (report.projectItems != null && report.projectItems != undefined) {
            for (var i = 0; i < report.projectItems.length; i++) {
                if ($.inArray(report.projectItems[i]['projectId'], projectIdArr) != -1) {
                    continue;
                }
                projectIdArr.push(report.projectItems[i]['projectId']);

                var dueDate = report.projectItems[i]['projectEndDate'];
                //dueDate = (dueDate == null || dueDate == 'undefined')?'-':dueDate.slice(0,10);
                //var dd1 = dueDate.split('-');
                //dueDate = dd1[1]+'-'+dd1[2]+'-'+dd1[0];
                var userAsso = [];
                if (security.userAssociationForProject[report.projectItems[i]['projectId']] != undefined)
                    userAsso = security.userAssociationForProject[report.projectItems[i]['projectId']];
                if (report.isPortfolioOn)//if Portfolio is On
                {
                    var groupName = report.projectItems[i].groupName == undefined || report.projectItems[i].groupName == null || report.projectItems[i].groupName == "" ? 'Default ' + report.gConfigGroup : report.projectItems[i].groupName;
                    var portfolioName = report.projectItems[i].portfolio == undefined || report.projectItems[i].portfolio == null || report.projectItems[i].portfolio == "" ? 'Default ' + report.gConfigPortfolio : report.projectItems[i].portfolio;
                    var VersionName = report.projectItems[i].projectVersion == undefined || report.projectItems[i].projectVersion == null || report.projectItems[i].projectVersion == "" ? 'Default ' + report.gConfigVersion : report.projectItems[i].projectVersion;

                    SortArrByGroup.push({
                        "Group": groupName,
                        "ArrIndex": IndexOfArr
                    });

                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        report2.projectsCons.push('<tr group="' + groupName + '"><td class="consbBgrdGrp" style="border-bottom:solid 1px #ccc" title="' + groupName + '">' + trimText(groupName, 18) + '</td><td title="' + portfolioName + '" style="border-bottom:solid 1px #ccc">' + trimText(portfolioName, 18) + '</td><td style="border-bottom:solid 1px #ccc"><input id="Cons' + report.projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForCons(' + report.projectItems[i]['projectId'] + ')" type="checkbox" /><a href="/Dashboard/ProjectMgnt?pid=' + report.projectItems[i]['projectId'] + '&edit=1" target="_blank" style="text-decoration:underline;color:blue" title="' + report.projectItems[i]['projectName'] + '">' + trimText(report.projectItems[i]['projectName'].toString(), 18) + '</a></td><td title="' + VersionName + '" style="border-bottom:solid 1px #ccc">' + trimText(VersionName, 16) + '</td><td style="border-bottom:solid 1px #ccc">' + report.projectItems[i]["projectLeadName"] + '</td><td style="border-bottom:solid 1px #ccc">' + dueDate + '</td></tr>');
                    else
                        report2.projectsCons.push('<tr group="' + groupName + '"><td class="consbBgrdGrp" style="border-bottom:solid 1px #ccc" title="' + groupName + '">' + trimText(groupName, 18) + '</td><td title="' + portfolioName + '" style="border-bottom:solid 1px #ccc">' + trimText(portfolioName, 18) + '</td><td title="' + report.projectItems[i]['projectName'] + '" style="border-bottom:solid 1px #ccc"><input id="Cons' + report.projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForCons(' + report.projectItems[i]['projectId'] + ')" type="checkbox" />' + trimText(report.projectItems[i]['projectName'].toString(), 18) + '</td><td style="border-bottom:solid 1px #ccc">' + trimText(VersionName, 16) + '</td><td>' + report.projectItems[i]["projectLeadName"] + '</td><td style="border-bottom:solid 1px #ccc">' + dueDate + '</td></tr>');

                    IndexOfArr++;
                }
                else {
                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                        report2.projectsCons.push('<tr><td><input id="Cons' + report.projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForCons(' + report.projectItems[i]['projectId'] + ')" type="checkbox" /><a href="/ProjectMgmt?pid=' + report.projectItems[i]['projectId'] + '&edit=1" target="_blank" style="text-decoration:underline;color:blue">' + report.projectItems[i]['projectName'] + '</a></td><td>' + report.projectItems[i]["projectLeadName"] + '</td><td>' + dueDate + '</td></tr>');
                    else
                        report2.projectsCons.push('<tr><td><input id="Cons' + report.projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForCons(' + report.projectItems[i]['projectId'] + ')" type="checkbox" />' + report.projectItems[i]['projectName'] + '</td><td>' + report.projectItems[i]["projectLeadName"] + '</td><td>' + dueDate + '</td></tr>');

                }
            }
        }
        //added by Mohini for sorting	
        if (report.isPortfolioOn) {
            report2.projectsConsPortfolio = [];
            SortArrByGroup = report2.sortJSON(SortArrByGroup, "Group", "asc");
            $.each(SortArrByGroup, function (grpInd, grpItm) {

                report2.projectsConsPortfolio.push(report2.projectsCons[grpItm["ArrIndex"]]);

            });
        }
    },
    fillGridForDateFilter: function (currDD, q) {
        report.currDD = currDD;

        if ($(".ui-state-active a").attr('id') == "dvDet") {
            report.showDataForFilter(currDD, q);
            return;
        }
        else {
            var pptProjects = report2.projectsExpPPT;
            report2.projectsExpPPT = [];
            var flag = 0;
            var flag2 = 0;
            var max = '';
            var min = '';
            var projectItems = new Array();
            if (currDD == "0")//If Project Status DD change 
            {
                if ($("#setStatus").val() == "All") {
                    report2.projectsExpPPT = report.projectItems;
                    report2.resetCons();
                    flag = 1;
                    $("#execLegend").prev().hide();
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
                        if (min <= new Date(report.projectItems[i]['projectEndDate']))
                            projectItems.push(report.projectItems[i]);
                    }
                    report2.projectsExpPPT = projectItems;
                    flag2 = 1;
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
                    report2.projectsExpPPT = projectItems;
                    flag2 = 1;
                }
            }
            if (flag2 != 1)
                projectItems = report.projectItems;

            if (flag == 0) {
                /*Export to ppt*/
                ppt.pptDate.length = 0;
                ppt.pptDate1.length = 0;

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
                        $("#executedTable").hide();
                        $("#execLegend").hide()
                        report2.projectsExpPPT = pptProjects;
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
                report2.projectsConsWithExcec = [];
                report.removedPID = [];
                report2.allProjectIDsWithExcec = [];
                report2.ExecTSandTesterCountForProjectIDs = [];
                report2.execMode = 1;
                report2.minDate = min;
                report2.maxDate = max;
                $("#tblDataDet").html('');
                $("#infoDivDet").html('');
                var showFlagDate = 0;

                //defined by Mohini
                var SortArrByGroup = new Array();
                var IndexOfArr = 0;
                report2.projectsConsWithExcecPortfolio = [];

                if (min.toString().indexOf("-") != -1) {
                    max = new Date((max).replace(/\-/g, '/'));
                    min = new Date((min).replace(/\-/g, '/'));
                }
                /*
                var max1 = max.split(" ");
                
                var max2 = max1[0].split("-");
                
                max = new Date(max2[1]+"/"+max2[2]+"/"+max2[0]+ max1[1]);
                
                var min1 = min.split(" ");
                
                var min2 = min1[0].split("-");
                
                min = new Date(min2[1]+"/"+min2[2]+"/"+min2[0]+ min1[1]);
                */


                var tempProjectIDArr = new Array();


                if (projectItems != null && projectItems != undefined) {
                    for (var i = 0; i < projectItems.length; i++) {

                        if ($.inArray(projectItems[i]['projectId'], tempProjectIDArr) != -1) {
                            continue;
                        }
                        tempProjectIDArr.push(projectItems[i]['projectId']);

                        var projStart = new Date(projectItems[i]['projectStartDate']);

                        var projEnd = new Date(projectItems[i]['projectEndDate']);

                        /*showFlagDate = 0;
                                    
                        if($("#setFilter").val() == "Dates")
                        {
                            //if((min.split(" ")[0]>=report.projectItems[i]['startDate'].split(" ")[0] && min.split(" ")[0]<=report.projectItems[i]['endDate'].split(" ")[0]) || (report.projectItems[i]['endDate'].split(" ")[0]>=max.split(" ")[0] && report.projectItems[i]['startDate'].split(" ")[0]<=max.split(" ")[0]))
                            //if((min.split(" ")[0]>=report.projectItems[i]['startDate'].split(" ")[0] && min.split(" ")[0]<=report.projectItems[i]['endDate'].split(" ")[0]) || (report.projectItems[i]['endDate'].split(" ")[0]>=max.split(" ")[0] && report.projectItems[i]['startDate'].split(" ")[0]<=max.split(" ")[0]))
                            if((min1<=projStart && max1>=projStart) || (projEnd>=min1 && projEnd<=max1) || (projStart<=min1 && projEnd>=max1))
                                showFlagDate = 1;
                        }
                        else
                        {
                            if((min1>=projStart && min1<=projEnd) || (projEnd>=max1 && projStart<=max1))
                                showFlagDate = 1;	
                        }
                        */
                        //<<---------------------------------
                        showFlagDate = 0;

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

                        if (flag2 == 1)
                            showFlagDate = 1;

                        //--------------------------------->>

                        if (showFlagDate == 1) {
                            if (report.childItemsForPID[projectItems[i]['projectId']] != undefined && report.childItemsForPID[projectItems[i]['projectId']] != "N/A") {
                                var countPending = 0; // S 14Nov
                                var countPass = 0;
                                var countFail = 0;
                                var countNC = 0;
                                var countExecuted = 0;
                                var temp = 0;
                                var total = 0;
                                var testersPerformedTesting = [];
                                var testCaseItems2 = report.childItemsForPID[projectItems[i]['projectId']];
                                for (var xi = 0; xi < (testCaseItems2.length) ; xi++) {
                                    if (testCaseItems2[xi]['DateTimeForFailedStep'] != undefined)
                                        var compDate = new Date(testCaseItems2[xi]['DateTimeForFailedStep'].replace("- ", ""));
                                    else
                                        //var compDate = new Date((testCaseItems2[xi]['Modified']).replace(/\-/g,'/'));
                                        var compDate = new Date((testCaseItems2[xi]['modified']).replace(/\-/g, '/'));
                                    if (compDate <= max && compDate >= min) //&& testCaseItems2[xi]['Modified']!=testCaseItems2[xi]['Created']
                                    {
                                        switch (testCaseItems2[xi]['status']) {
                                            case 'Pass':
                                                countPass++
                                                countExecuted++;
                                                if ($.inArray(testCaseItems2[xi]['SPUserID'], testersPerformedTesting) == -1)
                                                    testersPerformedTesting.push(testCaseItems2[xi]['SPUserID']);
                                                break;
                                            case 'Fail':
                                                countFail++;
                                                countExecuted++;
                                                if ($.inArray(testCaseItems2[xi]['SPUserID'], testersPerformedTesting) == -1)
                                                    testersPerformedTesting.push(testCaseItems2[xi]['SPUserID']);
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

                                onLoadpdata = new Array();

                                total = countPass + countFail + countNC + countPending;

                                report2.ExecTSandTesterCountForProjectIDs[projectItems[i]['projectId']] = total + "," + countPass + "," + countFail + "," + countNC + "," + countExecuted + "," + countPending + "," + testersPerformedTesting;

                                var flagPendingRounded = false;
                                var flagPassRounded = false;
                                var flagFailRounded = false;
                                var flagNCRounded = false;
                                var flagExecutedRounded = false;
                                var temp1, temp2, temp3, temp4, temp5;
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

                                onLoadpdata.push(temp1);
                                onLoadpdata.push(temp2);
                                onLoadpdata.push(temp3);
                                onLoadpdata.push(temp4);
                                onLoadpdata.push(temp5);
                                report2.pieDataWithExecForPIDs[projectItems[i]['projectId']] = onLoadpdata;

                                if ($.inArray(projectItems[i]['projectId'], report2.allProjectIDsWithExcec) == -1) {
                                    report2.allProjectIDsWithExcec.push(projectItems[i]['projectId']);
                                }
                                var dueDate = projectItems[i]['projectEndDate'];

                                var userAsso = [];
                                if (security.userAssociationForProject[projectItems[i]['projectId']] != undefined)
                                    userAsso = security.userAssociationForProject[projectItems[i]['projectId']];

                                if (report.isPortfolioOn)//if Portfolio on
                                {
                                    var groupName = projectItems[i].groupName == undefined || projectItems[i].groupName == null || projectItems[i].groupName == "" ? 'Default ' + report.gConfigGroup : projectItems[i].groupName;
                                    var portfolioName = projectItems[i].portfolio == undefined || projectItems[i].portfolio == null || projectItems[i].portfolio == "" ? 'Default ' + report.gConfigPortfolio : projectItems[i].portfolio;
                                    var VersionName = projectItems[i].projectVersion == undefined || projectItems[i].projectVersion == null || projectItems[i].projectVersion == "" ? 'Default ' + report.gConfigVersion : projectItems[i].projectVersion;

                                    SortArrByGroup.push({
                                        "Group": groupName,
                                        "ArrIndex": IndexOfArr
                                    });

                                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                                        report2.projectsConsWithExcec.push('<tr group="' + groupName + '"><td class="consbBgrdGrp" style="#FFD786;border-bottom:solid 1px #ccc" title="' + groupName + '">' + trimText(groupName, 18) + '</td><td style="border-bottom:solid 1px #ccc" title="' + portfolioName + '">' + trimText(portfolioName, 18) + '</td><td style="border-bottom:solid 1px #ccc"><input id="Exec' + projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');ppt.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');" type="checkbox" /><a href=' + '/Dashboard/ProjectMgnt?pid=' + projectItems[i]['projectId'] + '&edit=1" target="_blank" style="text-decoration:underline;color:blue" title="' + projectItems[i]['projectName'] + '" style="border-bottom:solid 1px #ccc">' + trimText(projectItems[i]['projectName'].toString(), 16) + '</a></td><td title="' + VersionName + '" style="border-bottom:solid 1px #ccc">' + trimText(VersionName, 10) + '</td><td style="border-bottom:solid 1px #ccc">' + projectItems[i]["projectLeadName"] + '</td><td style="border-bottom:solid 1px #ccc">' + dueDate + '</td></tr>');
                                    else
                                        report2.projectsConsWithExcec.push('<tr group="' + groupName + '"><td class="consbBgrdGrp" style="border-bottom:solid 1px #ccc" title="' + groupName + '">' + trimText(groupName, 18) + '</td><td style="border-bottom:solid 1px #ccc" title="' + portfolioName + '">' + trimText(portfolioName, 18) + '</td><td title="' + projectItems[i]['projectName'] + '" style="border-bottom:solid 1px #ccc"><input id="Exec' + projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');ppt.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');" type="checkbox" />' + trimText(projectItems[i]['projectName'].toString(), 16) + '</td><td title="' + VersionName + '" style="border-bottom:solid 1px #ccc">' + trimText(VersionName, 10) + '</td><td>' + projectItems[i]["projectLeadName"] + '</td><td style="border-bottom:solid 1px #ccc">' + dueDate + '</td></tr>');

                                    IndexOfArr++;
                                }
                                else {
                                    if ($.inArray("1", security.userType) != -1 || $.inArray("2", userAsso) != -1 || $.inArray("3", userAsso) != -1 || $.inArray("5", userAsso) != -1)
                                        report2.projectsConsWithExcec.push('<tr><td><input id="Exec' + projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');ppt.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');" type="checkbox" /><a href="/Dashboard/ProjectMgnt?pid=' + projectItems[i]['projectId'] + '&edit=1" target="_blank" style="text-decoration:underline;color:blue">' + projectItems[i]['projectName'] + '</a></td><td>' + projectItems[i]["projectLeadName"] + '</td><td>' + dueDate + '</td></tr>');
                                    else
                                        report2.projectsConsWithExcec.push('<tr><td><input id="Exec' + projectItems[i]['projectId'] + '" class="chkProj" onclick="report2.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');ppt.projectCheckForConsWithExcec(' + projectItems[i]['projectId'] + ');" type="checkbox" />' + projectItems[i]['projectName'] + '</td><td>' + projectItems[i]["projectLeadName"] + '</td><td>' + dueDate + '</td></tr>');

                                }
                            }
                        }
                    }
                }
                if (report.isPortfolioOn) {
                    SortArrByGroup = report2.sortJSON(SortArrByGroup, "Group", "asc");
                    $.each(SortArrByGroup, function (grpInd, grpItm) {

                        report2.projectsConsWithExcecPortfolio.push(report2.projectsConsWithExcec[grpItm["ArrIndex"]]);

                    });
                }

                report2.projectsConsolidateViewWithExcec();

                if (flag2 == 1 || currDD == "2") {
                    $("#executedMessage").hide();
                    $("#execLegend").hide();
                    $("#executedTable").hide();


                }
                if (currDD == "1")
                    $("#execLegend").prev().show();

            }//====
        }//===

        Main.hideLoading();
    },
    projectsConsolidateViewWithExcec: function () {
        if (report.isPortfolioOn) {
            var member = report2.projectsConsWithExcecPortfolio.length;
        }
        else {
            var member = report2.projectsConsWithExcec.length;
        }


        $("#PaginationCons").pagination(member, {
            callback: report2.callbackForProjectConsWithExcec,
            items_per_page: 5,
            num_display_entries: 10,
            num: 2
        });
    },
    callbackForProjectConsWithExcec: function (page_index, jq) {
        var items_per_page = 5;

        if (report.isPortfolioOn)//for Portfolio ON
        {
            var max_elem = Math.min((page_index + 1) * items_per_page, report2.projectsConsWithExcecPortfolio.length);
            var newcontent = '';
            // Iterate through a selection of the content and build an HTML string
            for (var i = page_index * items_per_page; i < max_elem; i++)
                newcontent += report2.projectsConsWithExcecPortfolio[i];

            $('#prjDetailsCons').empty().html(newcontent);

            var trGroupArr = new Array();
            $('#prjDetailsCons tr').each(function () {

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
        }
        else {
            var max_elem = Math.min((page_index + 1) * items_per_page, report2.projectsConsWithExcec.length);
            var newcontent = '';
            // Iterate through a selection of the content and build an HTML string
            for (var i = page_index * items_per_page; i < max_elem; i++)
                newcontent += report2.projectsConsWithExcec[i];

            $('#prjDetailsCons').empty().html(newcontent);
        }



        $("#prjDetailsCons input").each(function () {
            if ($.inArray($(this).attr('id').split('c')[1], report.removedPID) == -1)
                $(this).attr('checked', true)
        });
        report2.projectCheckForConsWithExcec();
    },
    projectCheckForConsWithExcec: function (pID) {
        //added by Mohini DT:18-03-2014
        if (pID == undefined) {
            report2.arrprjChecked = [];
            report2.arrprjUnchecked = [];
        }
        else {
            report2.arrprjChecked = jQuery.grep(report2.arrprjChecked, function (n) {
                return (n != pID);
            });

            report2.arrprjUnchecked = jQuery.grep(report2.arrprjUnchecked, function (n) {
                return (n != pID);
            });
        }
        /**********************************/
        try {
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
            if (pID != undefined) {
                if ($("#Exec" + pID).attr('checked') == false) {
                    report2.arrprjUnchecked.push(pID.toString());
                    if ($.inArray(pID.toString(), report.removedPID) == -1)
                        report.removedPID.push(pID.toString());

                }
                else {
                    report2.arrprjChecked.push(pID.toString());
                    var index = report.removedPID.indexOf(pID.toString());
                    if (index > -1)
                        report.removedPID.splice(index, 1);
                }
                $("#tpAllCons").css("color", "white");
                $("#tpPassCons").css("color", "white");
                $("#tpNCCons").css("color", "white");
                $("#tpFailCons").css("color", "white");
                $("#tpExecCons").css("color", "white");
                $("#tblDataDet").html('');
                $("#infoDivDet").html('');

            }
            for (var i = 0; i < report2.allProjectIDsWithExcec.length; i++) {

                if ($.inArray(report2.allProjectIDsWithExcec[i].toString(), report.removedPID) == -1) {
                    if ($.inArray(report2.allProjectIDsWithExcec[i], report2.arrprjChecked) == -1) {
                        report2.arrprjChecked.push(report2.allProjectIDsWithExcec[i]);
                    }
                    var prjParams = report2.pieDataWithExecForPIDs[report2.allProjectIDsWithExcec[i]];
                    if (prjParams != "-" && prjParams != undefined) {
                        //prjParams = prjParams.split(',');
                        passCnt += parseInt(prjParams[0], 10);
                        notCompCnt += parseInt(prjParams[1], 10);
                        failCnt += parseInt(prjParams[2], 10);
                        execCount += parseInt(prjParams[3], 10);
                        pendingCnt += parseInt(prjParams[4], 10);
                        avgCnt++;
                    }
                    var prjParams = report2.ExecTSandTesterCountForProjectIDs[report2.allProjectIDsWithExcec[i]];//Added for Test Step(s) Statistics(In execute mode))
                    if (prjParams != "-" && prjParams != undefined) {
                        prjParams = report2.ExecTSandTesterCountForProjectIDs[report2.allProjectIDsWithExcec[i]].split(",");
                        totalTS += parseInt(prjParams[0], 10);
                        totalTSPass += parseInt(prjParams[1], 10);
                        totalTSFail += parseInt(prjParams[2], 10);
                        totalTSNC += parseInt(prjParams[3], 10);
                        totalTSExec += parseInt(prjParams[4], 10);
                        totalTSPending += parseInt(prjParams[5], 10);
                        for (var mm = 6; mm < prjParams.length; mm++) {
                            if ($.inArray(prjParams[mm], totalSPIDs) == -1 && prjParams[mm] != "" && prjParams[mm] != undefined)
                                totalSPIDs.push(prjParams[mm]);
                        }
                    }
                }
            }
            //// Test Step(s) Statistics: Start here ///////
            $("#totalTSCount").text(totalTS);
            $("#passCount").text(totalTSPass);
            $("#failCount").text(totalTSFail);
            $("#NCCount").text(totalTSNC);
            $("#execCount").text(totalTSExec);
            $("#pendingCount").text(totalTSPending);
            $("#execTesters").text(totalSPIDs.length);
            if (totalSPIDs.length >= 1)
                report2.flagForBarChart = 1;
            else
                report2.flagForBarChart = 0;
            //////////////////////////////////////////////////
            var pieArray = [];
            pieArray[0] = passCnt / avgCnt;
            pieArray[1] = notCompCnt / avgCnt;
            pieArray[2] = failCnt / avgCnt;
            pieArray[3] = execCount / avgCnt;
            pieArray[4] = pendingCnt / avgCnt;

            if (pieArray[0] != undefined) {
                report2.fillProjectConsPieWithExcec(pieArray);
            }
        }
        catch (e) {
            alert(e.message);
        }

    },
    fillProjectConsPieWithExcec: function (pieArray) {
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
        var temp1, temp2, temp3, temp4, temp5;
        var total;

        total = totalPass + totalNotCompleted + totalFail + totalPending;
        temp1 = ((totalPass / total) * 100).toFixed(0);

        if (((totalPass / total) * 100) != temp1)
            flagPassRounded = true;

        temp2 = ((totalNotCompleted / total) * 100).toFixed(0);

        if (((totalNotCompleted / total) * 100) != temp2)
            flagNCRounded = true;

        temp3 = ((totalFail / total) * 100).toFixed(0);

        if (((totalFail / total) * 100) != temp3)
            flagFailRounded = true;

        /*temp4 = ((totalExecuted/total)*100).toFixed(0);
        
        if(((totalExecuted/total)*100)!= temp3)
           flagExecutedRounded = true;*/
        if (totalExecuted < 1)
            temp4 = totalExecuted;
        else {
            temp4 = ((totalExecuted / total) * 100).toFixed(0);
            if (((totalExecuted / total) * 100) != temp3)
                flagExecutedRounded = true;
        }


        temp5 = ((totalPending / total) * 100).toFixed(0);

        if (((totalPending / total) * 100) != temp5)
            flagPendingRounded = true;

        /* Modified by shilpa */
        if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) > 100) {
            if (flagPassRounded)
                temp1 = Math.floor((totalPass / total) * 100);
            else if (flagFailRounded)
                temp3 = Math.floor((totalFail / total) * 100);
            else if (flagNCRounded)
                temp2 = Math.floor((totalNotCompleted / total) * 100);
        }
        else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) < 100) {
            if (flagPassRounded)
                temp1 = Math.ceil((totalPass / total) * 100);
            else if (flagFailRounded)
                temp3 = Math.ceil((totalFail / total) * 100);
            else if (flagNCRounded)
                temp2 = Math.ceil((totalNotCompleted / total) * 100);
        }


        var pieChartArray = new Array();
        pieChartArray.push(parseInt(temp1));
        pieChartArray.push(parseInt(temp2));
        pieChartArray.push(parseInt(temp3));
        //pieChartArray.push(parseInt(temp4));
        pieChartArray.push(parseInt(temp5));

        var pieChartArrayTooltips = new Array();
        var total = $("#totalTSCount").text();

        /***************Added By Mohini For Resource File(25-02-2014)**************************/
        pieChartArrayTooltips.push(temp1 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have passed.");
        pieChartArrayTooltips.push(temp2 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have not been completed.");
        pieChartArrayTooltips.push(temp3 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "(s) (" + total + " total) have failed.");

        var pieChartArrayLab = new Array();
        pieChartArrayLab.push(temp1);
        pieChartArrayLab.push(temp2);
        pieChartArrayLab.push(temp3);
        //pieChartArrayLab.push(temp4);
        pieChartArrayLab.push(temp5);

        if (pieChartArray == undefined || pieChartArray == null || isNaN(pieChartArray[0]) == true) {
            if (report.flagForDateFilter == 0) {
                if (report.isPortfolioOn)//if portfolio is On
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)
                else
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;margin-left:-100px;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)

                $("#executedMessage").hide();
            }
            else {
                if (report.isPortfolioOn)//if portfolio is On
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)
                else
                    $('#pieChartDet').html('<div style="height:60px;padding-top:35px;text-align:center;margin-left:-100px;"><b>No ' + report.gConfigTestStep + 's Available!</b></div>');//Added By Mohini For Resource File(25-02-2014)

                $("#executedMessage").hide();
            }
        }
        else {
            try {
                $("#pieChartDet").chart('clear');
                $("#pieChartDet").chart({
                    template: "pie_basic_1",
                    values: {
                        serie1: pieChartArray
                    },
                    labels: pieChartArray,
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
                        }, {
                            plotProps: {
                                fill: "#c3c3c3"
                            }
                        }]
                    }
                });
            }
            catch (e) {
                alert(e.message);
            }
        }

        if (temp4 != 0 && temp4 != "NaN") {
            $("#executedMessageForLessTS").hide();
            $("#executedMessage").hide();
            $('#executedTable').show();
            $("#execLegend").show();
            $('#executedBarGraph').css('width', '' + temp4 + '%');
            //$('#executedBarGraph').attr('title',temp4+"% of the scripts for selected projects have been executed in the date range entered above.");
            $('#executedBarGraph').attr('title', temp4 + "% of the scripts for selected " + report.gConfigProject.toLowerCase() + "s have been executed in the date range entered above.");//Added By Mohini For Resource File(25-02-2014)
            $("#executedBarGraph").click(function () {
                report2.showDataForProjectStatus('Executed');
            });
        }
        else {
            $('#executedBarGraph').attr('title', '');
            $('#executedTable').hide();
            $("#execLegend").hide();
            //if( temp4 != "NaN")
            if (temp4 != "NaN" && report2.flagForBarChart == 0) {
                $("#executedMessage").show();
                $("#executedMessageForLessTS").hide();
            }
            else if (report2.flagForBarChart == 1) {
                $("#executedMessage").hide();
                $("#executedMessageForLessTS").show();
            }
        }
        if (report.currDD != 1) {
            $("#executedMessage").hide();
            $("#execLegend").hide();
            $("#executedTable").hide();
            $("#execLegend").prev().hide();
        }
    },
     /*for date conversion*/
    leadingZero: function (value) {
        if (value < 10) {
            return "0" + value.toString();
        }
        return value.toString();
    },
    showDataForProjectStatus: function (status) {
        if (report2.execMode == 0 && status == "Executed") {
            $("#tblDataDet").html("<a style='float:left;margin-top: 40px; margin-left: -620px;'>No " + report.gConfigTestStep + "s available!</a>");//Added By Mohini For Resource File(25-02-2014)
            $("#infoDivDet").html('');
        }
        else {
            Main.showLoading();
            if (status == "All" || status == "Executed")
                report2.statusFilterFlagCons = 1;
            else
                report2.statusFilterFlagCons = 0;
            setTimeout('report2.showDataForProjectStatus2("' + status + '");', 200);
        }
    },
    testStepToShow: [],
    forStatusGetChildItemsCons: [],
    forTCIDGetChildItemsCons: [],
    forRoleIDGetChildItemCons: [],
    forTesterGetChildItemsCons: [],
    forTPIDGetChildItemsCons: [],
    forPIDGetChildItemsCons: [],
    roleIDsCons: [],
    statusCons: [],
    TCIDsCons: [],
    testerCons: [],
    TPIDsCons: [],
    PIDsCons: [],
    statusFilterFlagCons: 0,
    showDataForProjectStatus2: function (status) {
        switch (status) {
            case "All":
                {
                    $("#tpAllCons").css("color", "");
                    $("#tpPassCons").css("color", "white");
                    $("#tpNCCons").css("color", "white");
                    $("#tpFailCons").css("color", "white");
                    $("#tpExecCons").css("color", "white");
                    break;
                }
            case "Pass":
                {
                    $("#tpAllCons").css("color", "white");
                    $("#tpPassCons").css("color", "");
                    $("#tpNCCons").css("color", "white");
                    $("#tpFailCons").css("color", "white");
                    $("#tpExecCons").css("color", "white");
                    break;
                }
            case "Not Completed":
                {
                    $("#tpAllCons").css("color", "white");
                    $("#tpPassCons").css("color", "white");
                    $("#tpNCCons").css("color", "");
                    $("#tpFailCons").css("color", "white");
                    $("#tpExecCons").css("color", "white");
                    break;
                }
            case "Fail":
                {
                    $("#tpAllCons").css("color", "white");
                    $("#tpPassCons").css("color", "white");
                    $("#tpNCCons").css("color", "white");
                    $("#tpFailCons").css("color", "");
                    $("#tpExecCons").css("color", "white");
                    break;
                }
            case "Executed":
                {
                    $("#tpAllCons").css("color", "white");
                    $("#tpPassCons").css("color", "white");
                    $("#tpNCCons").css("color", "white");
                    $("#tpFailCons").css("color", "white");
                    $("#tpExecCons").css("color", "");
                    break;
                }
        }
        report2.testStepToShow = [];
        report2.forStatusGetChildItemsCons = [];//Added for Filter
        report2.forTCIDGetChildItemsCons = [];
        report2.forRoleIDGetChildItemCons = [];
        report2.forTesterGetChildItemsCons = [];
        report2.forTPIDGetChildItemsCons = [];
        report2.forPIDGetChildItemsCons = [];
        report2.roleIDsCons = [];
        report2.statusCons = [];
        report2.TCIDsCons = [];
        report2.testerCons = [];
        report2.TPIDCons = [];
        report2.PIDCons = [];

        report2.testStepDetails = [];
        report2.arrayOfFilteredColumn = [];
        report2.latestFilteredColumn = '';

        var testCaseItems2 = [];
        var projectIDs = [];
        var TestCaseIds = [];
        var SPIDsNeedToShow = [];
        var TSIDs = [];
        var PID = '';
        var TPID = '';
        var TCID = '';
        var SPID = '';
        var ActRes = '';
        var nn = 0;
        var showFlag = 0;
        var testingFlag = 0;
        if (report2.execMode == 0)
            projectIDs = report.allProjectIDs;
        else
            projectIDs = report2.allProjectIDsWithExcec;
        for (var i = 0; i < projectIDs.length; i++) {
            if ($.inArray(projectIDs[i].toString(), report.removedPID) == -1) {

                if (report.childItemsForPID[projectIDs[i]] != undefined && report.childItemsForPID[projectIDs[i]] != "N/A") {
                    testCaseItems2 = report.childItemsForPID[projectIDs[i]];
                    for (var mm = 0; mm < testCaseItems2.length; mm++) {
                        showFlag = 0;
                        testingFlag = 0;
                        if (status == "Executed" || report2.execMode == 1) {
                            if (status == "All")
                                showFlag = 1;
                            else {
                                /* var max = new Date((report2.maxDate).replace(/\-/g, '/'));
                                 var min = new Date((report2.minDate).replace(/\-/g, '/'));*/

                                    var maxOldDate = (report2.maxDate);
                                    var minOldDate = (report2.minDate);
                                    if (report2.maxDate.toString().indexOf('UTC') > -1) {
                                        var dateObj = new Date(report2.maxDate);
                                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                                        var day = dateObj.getUTCDate();
                                        var year = dateObj.getUTCFullYear();
                                        var hours = dateObj.getUTCHours();
                                        var minutes = dateObj.getUTCMinutes();
                                        var seconds = dateObj.getUTCSeconds();

                                        var max = year + "-" + report2.leadingZero(month) + "-" + report2.leadingZero(day) + " " + hours + ":" + minutes + ":" + seconds;
                                        day = ""; year = ""; month = ""; hours = ""; minutes = ""; seconds = "";
                                    }
                                    else {
                                        var max = maxOldDate.split(' ')[0];
                                    }
                                    if (report2.minDate.toString().indexOf('UTC') > -1) {
                                        var dateObj1 = new Date(report2.minDate);
                                        var month1 = dateObj1.getUTCMonth() + 1; //months from 1-12
                                        var day1 = dateObj1.getUTCDate();
                                        var year1 = dateObj1.getUTCFullYear();
                                        var hours1 = dateObj1.getUTCHours();
                                        var minutes1 = dateObj1.getUTCMinutes();
                                        var seconds1 = dateObj1.getUTCSeconds();

                                        var min = year1 + "-" + report2.leadingZero(month1) + "-" + report2.leadingZero(day1) + " " + hours1 + ":" + minutes1 + ":" + seconds1;
                                        day1 = ""; year1 = ""; month1 = ""; hours1 = ""; minutes1 = ""; seconds1 = "";
                                    }
                                    else {
                                        var min = minOldDate.split(' ')[0];
                                    }

                                if (testCaseItems2[mm]['DateTimeForFailedStep'] != undefined)
                                    var compDate = testCaseItems2[mm]['DateTimeForFailedStep'];
                                else {  /* var compDate = new Date((testCaseItems2[mm]['modified']).replace(/\-/g, '/'));*/
                                    var compDateold = testCaseItems2[mm]['modified'];
                                    NewcompDate = new Date(compDateold);

                                    var d1 = NewcompDate.getDate();
                                    var m1 = NewcompDate.getMonth() + 1;
                                    var y1 = NewcompDate.getFullYear();
                                    var compDate = y1 + "-" + report2.leadingZero(m1) + "-" + report2.leadingZero(d1);
                                    y1 = ""; m1 = ""; d1 = "";
                                }
                                if (compDate <= max && compDate >= min)/*&& testCaseItems2[mm]['Modified']!=testCaseItems2[mm]['Created']*/ {
                                    if (status == "Executed" && testCaseItems2[mm]['status'] != "Not Completed" && testCaseItems2[mm]['status'] != "Pending" && testingFlag == 0)
                                        showFlag = 1;
                                }
                                if ((testCaseItems2[mm]['status'] == "Not Completed" || testCaseItems2[mm]['status'] == undefined) && status == "Not Completed")
                                    showFlag = 1;
                                if (testCaseItems2[mm]['status'] == status && testCaseItems2[mm]['status'] != "Not Completed")
                                    showFlag = 1;
                                else if (status == "Executed")
                                    testingFlag = 1;
                            }
                        }
                        else if (status == "All" || status == testCaseItems2[mm]['status'])
                            showFlag = 1;

                        if (showFlag == 1) {
                            PID = projectIDs[i];
                            TPID = testCaseItems2[mm]['testPassId'];
                            TCID = testCaseItems2[mm]['testCaseId'];
                            if ($.inArray(TCID, TestCaseIds) == -1)
                                TestCaseIds.push(TCID);

                            SPID = testCaseItems2[mm]['SPUserID'];
                            if ($.inArray(SPID, SPIDsNeedToShow) == -1)
                                SPIDsNeedToShow.push(SPID);

                            if ($.inArray(testCaseItems2[mm]['TestStep'], TSIDs) == -1)
                                TSIDs.push(testCaseItems2[mm]['TestStep']);
                            if (testCaseItems2[mm]['actualResult'] == undefined)
                                ActRes = "-";
                            else
                                ActRes = testCaseItems2[mm]['actualResult'];
                            report2.testStepToShow[nn] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];

                            if (report2.forPIDGetChildItemsCons[PID] == undefined) {
                                report2.forPIDGetChildItemsCons[PID] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                                report2.PIDCons.push(PID);
                            }
                            else
                                report2.forPIDGetChildItemsCons[PID] += "`" + PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];

                            if (report2.forTPIDGetChildItemsCons[TPID] == undefined) {
                                report2.forTPIDGetChildItemsCons[TPID] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                                report2.TPIDCons.push(TPID);
                            }
                            else
                                report2.forTPIDGetChildItemsCons[TPID] += "`" + PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];

                            if (report2.forTCIDGetChildItemsCons[TCID] == undefined) {
                                report2.forTCIDGetChildItemsCons[TCID] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                                report2.TCIDsCons.push(TCID);
                            }
                            else
                                report2.forTCIDGetChildItemsCons[TCID] += "`" + PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];

                            if (report2.forTesterGetChildItemsCons[SPID] == undefined) {
                                report2.forTesterGetChildItemsCons[SPID] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                                report2.testerCons.push(SPID);
                            }
                            else
                                report2.forTesterGetChildItemsCons[SPID] += "`" + PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];

                            if (report2.forRoleIDGetChildItemCons[testCaseItems2[mm]['Role']] == undefined) {
                                report2.forRoleIDGetChildItemCons[testCaseItems2[mm]['Role']] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                                report2.roleIDsCons.push(testCaseItems2[mm]['Role']);
                            }
                            else
                                report2.forRoleIDGetChildItemCons[testCaseItems2[mm]['Role']] += "`" + PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];

                            if (report2.forStatusGetChildItemsCons[testCaseItems2[mm]['status']] == undefined) {
                                report2.forStatusGetChildItemsCons[testCaseItems2[mm]['status']] = PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                                report2.statusCons.push(testCaseItems2[mm]['status']);
                            }
                            else
                                report2.forStatusGetChildItemsCons[testCaseItems2[mm]['status']] += "`" + PID + "~" + TPID + "~" + TCID + "~" + SPID + "~" + testCaseItems2[mm]['TestStep'] + "~" + testCaseItems2[mm]['status'] + "~" + testCaseItems2[mm]['Role'] + "~" + ActRes + "~" + testCaseItems2[mm]['ID'];
                            nn++;
                        }
                    }
                }
            }
        }

        report2.filterGrid = 0;
        report2.startIndexC = 0;
        if (report2.testStepToShow.length != 0) {
            report2.projectIDsAfterFilter.length = 0;
            report2.TPIDsAfterFilter.length = 0;
            report2.SPIDsAfterFilter.length = 0;
            report2.TCIDsAfterFilter.length = 0;
            report2.statusAfterFilter.length = 0;
            report2.RoleIDsAfterFilter.length = 0;
            report2.latestFilteredColumn = '';
            report2.latestFilteredColumnDetails.length = 0;
            report2.showDataFromBuffer();
        }
        else {
            $("#tblDataDet").html("<br/><a style='float:left;margin-top: 40px; margin-left: -620px;'>No " + report.gConfigTestStep + "s available!</a>");//Added By Mohini for Resource file(25-02-2014)
            $("#infoDivDet").html('');
        }
        Main.hideLoading();
    },
    startIndexTIncrementC: function () {
        if ((report2.startIndexC + 10) < report.testStepLength) {
            report2.startIndexC += 10;
            report2.showDataFromBuffer();
        }
    },
    startIndexTDecrementC: function () {
        if (report2.startIndexC >= 10) {
            report2.startIndexC -= 10;
            report2.showDataFromBuffer();
        }
    },
    showDataFromBuffer: function () {
        //////  Pagination of Test Steps starts here
        var arr = [];
        if (report2.filterGrid == 1) {
            var TestStepListLength = report2.testStepDetails.length;
            report.testStepLength = report2.testStepDetails.length;
            arr = report2.testStepDetails;
        }
        else {
            var TestStepListLength = report2.testStepToShow.length;
            report.testStepLength = report2.testStepToShow.length;
            arr = report2.testStepToShow;
        }
        if (TestStepListLength >= (report2.startIndexC + 10))
            var Ei = report2.startIndexC + 10;
        else
            var Ei = TestStepListLength;

        var TestStepCount = '<label>Showing ' + ((report2.startIndexC) + 1) + '-' + Ei + ' of total  ' + TestStepListLength + ' ' + report.gConfigTestStep + '(s)</label> | <a id="previousC" style="cursor:pointer" onclick="report2.startIndexTDecrementC();">Previous</a> | <a id="nextC" style="cursor:pointer"  onclick="report2.startIndexTIncrementC();">Next</a>';//Added By Mohini For Resource File(25-02-2014)

        $('#infoDivDet').empty();
        $("#infoDivDet").append(TestStepCount);

        if (report2.startIndexC <= 0) {
            document.getElementById('previousC').disabled = "disabled";
            document.getElementById('previousC').style.color = '#989898';

        }
        else {
            document.getElementById('previousC').disabled = false;
        }

        if (TestStepListLength <= ((report2.startIndexC) + 10)) {
            document.getElementById('nextC').disabled = "disabled";
            document.getElementById('nextC').style.color = '#989898';
        }
        else {
            document.getElementById('nextC').disabled = false;
            //document.getElementById('nextC').style.color = '#FF6600';
        }

        var projInfo = '';
        if (report.isPortfolioOn)//if portfolio is On
        {
            projInfo += '<table class="reptTableTestCase gConfigTableHeader" id="projectGrid" cellspacing="0" style="table-layout:fixed;word-wrap: break-word;"><thead><tr>';
            projInfo += '<td id="colPrj" class=" TopHeading" style="width:8%">Project</td>';
            projInfo += '<td id="colPrj" class=" TopHeading" style="width:6%">Version</td>';
            projInfo += '<td id="colTP" class=" TopHeading" style="width:8%">Test Pass</td>';
            projInfo += '<td id="colTC" class="TopHeading tcNameDet" style="width:10%">Test Case</td>';
            projInfo += '<td id="colTester" class=" TopHeading" style="width:10%">Tester</td>';
            projInfo += '<td id="colRole" class="TopHeading roleNameDet" style="width:7%">Role</td>';
            projInfo += '<td class="TopHeading" style="width:17%">Test Action / Steps</td>';
            projInfo += '<td class="TopHeading" style="width:13%">Expected Result</td>';
            projInfo += '<td class="TopHeading" style="width:13%">Actual Result</td>';
        }
        else {
            projInfo += '<table class="reptTableTestCase gConfigTableHeader" id="projectGrid" cellspacing="0" style="table-layout:fixed;word-wrap: break-word;"><thead><tr>';
            projInfo += '<td id="colPrj" class=" TopHeading" style="width:9%">Project</td>';
            projInfo += '<td id="colTP" class=" TopHeading" style="width:8%">Test Pass</td>';
            projInfo += '<td id="colTC" class="TopHeading tcNameDet" style="width:10%">Test Case</td>';
            projInfo += '<td id="colTester" class=" TopHeading" style="width:10%">Tester</td>';
            projInfo += '<td id="colRole" class="TopHeading roleNameDet" style="width:7%">Role</td>';
            projInfo += '<td class="TopHeading" style="width:17%">Test Action / Steps</td>';
            projInfo += '<td class="TopHeading" style="width:13%">Expected Result</td>';
            projInfo += '<td class="TopHeading" style="width:13%">Actual Result</td>';
        }
        if (report2.statusFilterFlagCons == 1)
            projInfo += '<td id="colStatus" class="TopHeading statusDet" style="width:9%">Status</td>';
        else
            projInfo += '<td id="colStatus" class="TopHeading statusDet" style="width:9%">Status</td>';
        projInfo += '</tr></thead><tbody>';

        var items = [];
        if (report.isPortfolioOn)//if portfolio is On
        {
            for (var i = report2.startIndexC; i < Ei; i++) {
                items = arr[i].split("~");
                projInfo += '<tr><td>' + report.projectNameForPID[items[0]] + '</td>';
                projInfo += '<td>' + report.versionNameForPID[items[0]] + '</td>';
                projInfo += '<td>' + report.TPNameForTPID[items[1]] + '</td>';
                projInfo += '<td>' + report.TCNameForTCID[items[2]] + '</td>';
                projInfo += '<td>' + report.testerNameForSPID[items[3]] + '</td>';
                projInfo += '<td>' + report.RoleNameForRoleID[items[6]] + '</td>';
                projInfo += '<td>' + report.TSNameForTSID[items[4]] + '</td>';
                projInfo += '<td>' + report.ExpResForTSID[items[4]] + '</td>';
                projInfo += '<td>' + items[7] + '</td>';
                projInfo += '<td>' + items[5] + '</td></tr>';
            }
        }
        else {
            for (var i = report2.startIndexC; i < Ei; i++) {
                items = arr[i].split("~");
                projInfo += '<tr><td>' + report.projectNameForPID[items[0]] + '</td>';
                projInfo += '<td>' + report.TPNameForTPID[items[1]] + '</td>';
                projInfo += '<td>' + report.TCNameForTCID[items[2]] + '</td>';
                projInfo += '<td>' + report.testerNameForSPID[items[3]] + '</td>';
                projInfo += '<td>' + report.RoleNameForRoleID[items[6]] + '</td>';
                projInfo += '<td>' + report.TSNameForTSID[items[4]] + '</td>';
                projInfo += '<td>' + report.ExpResForTSID[items[4]] + '</td>';
                projInfo += '<td>' + items[7] + '</td>';
                projInfo += '<td>' + items[5] + '</td></tr>';
            }

        }
        projInfo = projInfo + '</tbody></table><div id="dvStatusDet" style="width: 150px; margin-top: 5px; position: absolute; top: 605px; left: 1120px;display:none"></div>';
        $("#tblDataDet").html(projInfo);
        /**************Added By Mohini ForResource File(25-02-2014)*************************/
        resource.updateTableHeaderTextOfNewReportPage();
        $('#colPrj').append('<div style="float:right" id="dvProjectimg"><img onclick="report2.filters(\'dvProject\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvProject" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        $('#colTP').append('<div style="float:right" id="dvTPimg"><img onclick="report2.filters(\'dvTP\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvTP" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        $('#colTC').append('<div style="float:right" id="dvTCimg"><img onclick="report2.filters(\'dvTC\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvTC" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        $('#colTester').append('<div style="float:right" id="dvTesterimg"><img onclick="report2.filters(\'dvTester\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvTester" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        $('#colRole').append('<div style="float:right" id="dvRoleCimg"><img onclick="report2.filters(\'dvRoleC\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvRoleC" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        if (report2.statusFilterFlagCons == 1) {
            $('#colStatus').append('<div style="float:right" id="dvStatusCimg"><img onclick="report2.filters(\'dvStatusC\');" src="/images/no-filter.png" style="cursor:pointer" /></div><div id="dvStatusC" style="margin-top: 5px;width:150px;position:absolute; display:none"></div>');
        }
        /*********************************************************/
        for (var mm = 0; mm < report2.arrayOfFilteredColumn.length; mm++)
            $("#" + report2.arrayOfFilteredColumn[mm] + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report2.filters(\'' + report2.arrayOfFilteredColumn[mm] + '\')"/>');
        /* shilpa: 7oct */
        $('#projectGrid tbody').find('td').find('img').each(function () {
            if ($(this).attr('width') > 150)
                $(this).css('width', '150');
            if ($(this).attr('height') > 150)
                $(this).css('height', '150');
        });

        $('#projectGrid tbody').find('td').find('table').each(function () {
            if ($(this).attr('width') > 150)
                $(this).css('width', '150');
            if ($(this).attr('height') > 150)
                $(this).css('height', '150');
        });

        $('#projectGrid tbody').find('td').find('h1').each(function () {
            if ($(this).attr('width') > 150)
                $(this).css('width', '150');
        });

        /**/
        //Added by Mohinifor UI issue DT:18-08-2014
        $('#projectGrid tbody').find('td').find('table').each(function () {
            $(this).css('width', '135px');
            $(this).css('height', '135px');
        });



    },
    ////////////////////// Filters start Here  ////////////////////////////////
    arrayOfFilteredColumn: [],
    latestFilteredColumn: '',
    currentlyOpenFilter: '',
    latestFilteredColumnDetails: [],
    testStepDetails: [],
    filterGrid: 0,
    showFilteredData: function () {
        report2.startIndexC = 0;
        report2.filterGrid = 1;
        report2.showDataFromBuffer();
    },
    clearFilter: function (divID) {
        if ($.inArray(divID, report2.arrayOfFilteredColumn) != -1) {
            $("#" + divID + "img").html('<img src="/images/no-filter.png" style="cursor:pointer" onclick="report2.filters(\'' + report2.currentlyOpenFilter + '\')"/>');
            $("#" + divID + "").html('');
            if (report2.arrayOfFilteredColumn.length != 1) {

                var arr = new Array();
                for (var i = 0; i < report2.arrayOfFilteredColumn.length; i++) {
                    if (report2.arrayOfFilteredColumn[i] != divID)
                        arr.push(report2.arrayOfFilteredColumn[i]);
                }
                report2.arrayOfFilteredColumn = arr;
                report2.latestFilteredColumn = arr[arr.length - 1];

                var index0 = '';
                var arrTest0 = [];
                var index = '';
                var arrTest = [];
                var index2 = '';
                var arrTest2 = [];
                var index3 = '';
                var arrTest3 = [];
                var index4 = '';
                var arrTest4 = [];

                switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 1]) {
                    case "dvProject":
                        index0 = 0;
                        arrTest0 = report2.projectIDsAfterFilter;
                        break;

                    case "dvTP":
                        index0 = 1;
                        arrTest0 = report2.TPIDsAfterFilter;
                        break;

                    case "dvTC":
                        index0 = 2;
                        arrTest0 = report2.TCIDsAfterFilter;
                        break;

                    case "dvTester":
                        index0 = 3;
                        arrTest0 = report2.SPIDsAfterFilter;
                        break;

                    case "dvRoleC":
                        index0 = 6;
                        arrTest0 = report2.RoleIDsAfterFilter;
                        break;

                    case "dvStatusC":
                        index0 = 5;
                        arrTest0 = report2.statusAfterFilter;
                        break;
                }
                if (report2.arrayOfFilteredColumn.length >= 2) {
                    switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 2]) {
                        case "dvProject":
                            index = 0;
                            arrTest = report2.projectIDsAfterFilter;
                            break;

                        case "dvTP":
                            index = 1;
                            arrTest = report2.TPIDsAfterFilter;
                            break;

                        case "dvTC":
                            index = 2;
                            arrTest = report2.TCIDsAfterFilter;
                            break;

                        case "dvTester":
                            index = 3;
                            arrTest = report2.SPIDsAfterFilter;
                            break;

                        case "dvRoleC":
                            index = 6;
                            arrTest = report2.RoleIDsAfterFilter;
                            break;

                        case "dvStatusC":
                            index = 5;
                            arrTest = report2.statusAfterFilter;
                            break;
                    }
                }
                if (report2.arrayOfFilteredColumn.length >= 3) {
                    switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 3]) {
                        case "dvProject":
                            index2 = 0;
                            arrTest2 = report2.projectIDsAfterFilter;
                            break;

                        case "dvTP":
                            index2 = 1;
                            arrTest2 = report2.TPIDsAfterFilter;
                            break;

                        case "dvTC":
                            index2 = 2;
                            arrTest2 = report2.TCIDsAfterFilter;
                            break;

                        case "dvTester":
                            index2 = 3;
                            arrTest2 = report2.SPIDsAfterFilter;
                            break;

                        case "dvRoleC":
                            index2 = 6;
                            arrTest2 = report2.RoleIDsAfterFilter;
                            break;

                        case "dvStatusC":
                            index2 = 5;
                            arrTest2 = report2.statusAfterFilter;
                            break;
                    }
                }
                if (report2.arrayOfFilteredColumn.length >= 4) {
                    switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 4]) {
                        case "dvProject":
                            index3 = 0;
                            arrTest3 = report2.projectIDsAfterFilter;
                            break;

                        case "dvTP":
                            index3 = 1;
                            arrTest3 = report2.TPIDsAfterFilter;
                            break;

                        case "dvTC":
                            index3 = 2;
                            arrTest3 = report2.TCIDsAfterFilter;
                            break;

                        case "dvTester":
                            index3 = 3;
                            arrTest3 = report2.SPIDsAfterFilter;
                            break;

                        case "dvRoleC":
                            index3 = 6;
                            arrTest3 = report2.RoleIDsAfterFilter;
                            break;

                        case "dvStatusC":
                            index3 = 5;
                            arrTest3 = report2.statusAfterFilter;
                            break;
                    }
                }
                if (report2.arrayOfFilteredColumn.length >= 5) {
                    switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 5]) {
                        case "dvProject":
                            index4 = 0;
                            arrTest4 = report2.projectIDsAfterFilter;
                            break;

                        case "dvTP":
                            index4 = 1;
                            arrTest4 = report2.TPIDsAfterFilter;
                            break;

                        case "dvTC":
                            index4 = 2;
                            arrTest4 = report2.TCIDsAfterFilter;
                            break;

                        case "dvTester":
                            index4 = 3;
                            arrTest4 = report2.SPIDsAfterFilter;
                            break;

                        case "dvRoleC":
                            index4 = 6;
                            arrTest4 = report2.RoleIDsAfterFilter;
                            break;

                        case "dvStatusC":
                            index4 = 5;
                            arrTest4 = report2.statusAfterFilter;
                            break;
                    }
                }
                var tpDetArr = new Array();
                if (report2.latestFilteredColumnDetails[report2.latestFilteredColumn] != undefined) {
                    var arr = report2.latestFilteredColumnDetails[report2.latestFilteredColumn];
                    for (var i = 0; i < arr.length; i++) {
                        var items = arr[i].split("~");
                        if (($.inArray(items[index0], arrTest0) != -1 || arrTest0.length == 0) && ($.inArray(items[index], arrTest) != -1 || arrTest.length == 0) && ($.inArray(items[index2], arrTest2) != -1 || arrTest2.length == 0) && ($.inArray(items[index3], arrTest3) != -1 || arrTest3.length == 0) && ($.inArray(items[index4], arrTest4) != -1 || arrTest4.length == 0))
                            tpDetArr.push(arr[i]);

                    }
                    report2.testStepDetails = tpDetArr;
                }
                if (arr.length == 1)
                    report2.latestFilteredColumnDetails[report2.latestFilteredColumn] = report2.testStepToShow;

                report2.showFilteredData();
                for (var mm = 0; mm < report2.arrayOfFilteredColumn.length; mm++)
                    $("#" + report2.arrayOfFilteredColumn[mm] + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report2.filters(\'' + report2.arrayOfFilteredColumn[mm] + '\')"/>');
            }
            else {
                report2.arrayOfFilteredColumn.length = 0;
                report2.testStepDetails.length = 0;
                report2.latestFilteredColumn = '';
                report2.startIndexT = 0;
                report2.filterGrid = 0;
                report2.TCIDsAfterFilter = [];
                report2.SPIDsAfterFilter = [];
                report2.showDataFromBuffer();
            }
            if (divID == "dvTC")
                report2.TCIDsAfterFilter = [];
            else if (divID == "dvTester")
                report2.SPIDsAfterFilter = [];
        }
        switch (divID) {
            case "dvProject":
                report2.projectIDsAfterFilter = [];
                break;

            case "dvTP":
                report2.TPIDsAfterFilter = [];
                break;

            case "dvTC":
                report2.TCIDsAfterFilter = [];
                break;

            case "dvTester":
                report2.SPIDsAfterFilter = [];
                break;

            case "dvRoleC":
                report2.RoleIDsAfterFilter = [];
                break;

            case "dvStatusC":
                report2.statusAfterFilter = [];
                break;
        }
    },

    filters: function (divID) {
        report2.currentlyOpenFilter = divID;
        switch (divID) {
            case "dvProject": if ($("#dvProject").html() != "")
                $("#dvProject").html("");
            else {
                $("#dvProject").slideToggle("slow");
                $("#dvTP").css("display", "none");
                $("#dvTester").css("display", "none");
                $("#dvTC").css("display", "none");
                $("#dvRoleC").css("display", "none");
                $("#dvStatusC").css("display", "none");

                if (report2.latestFilteredColumn == divID) {
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var PIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report2.latestFilteredColumnDetails[divID].length; i++) {
                            id = report2.latestFilteredColumnDetails[divID][i].split("~")[0];
                            if ($.inArray(id, PIDs) == -1)
                                PIDs.push(id);
                        }
                        report2.createMultiSelectList("dvProject", PIDs, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report2.testStepDetails.length; i++)
                            ids.push(report2.testStepDetails[i].split("~")[0]);
                        multiSelectList.setSelectedItemsFromArray("dvProject", ids);
                    }
                }
                else if (report2.testStepDetails.length == 0)
                    report2.createMultiSelectList("dvProject", report2.PIDCons, "130px;", "checked", "");
                else {
                    var PIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report2.testStepDetails.length; i++) {
                        id = report2.testStepDetails[i].split("~")[0];
                        if ($.inArray(id, PIDs) == -1)
                            PIDs.push(id);
                    }
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var PIDs2 = new Array();
                        var id2 = '';
                        var arr = report2.latestFilteredColumnDetails[divID];
                        for (var i = 0; i < arr.length; i++) {
                            id2 = arr[i].split("~")[0];
                            if ($.inArray(id2, PIDs2) == -1)
                                PIDs2.push(id2);
                        }
                        report2.createMultiSelectList("dvProject", PIDs2, "130px;", "", "");
                        multiSelectList.setSelectedItemsFromArray("dvProject", PIDs);
                    }
                    else
                        report2.createMultiSelectList("dvProject", PIDs, "130px;", "checked", "");
                }
            }
                break;

            case "dvTP": if ($("#dvTP").html() != "")
                $("#dvTP").html("");
            else {
                $("#dvTP").slideToggle("slow");
                $("#dvProject").css("display", "none");
                $("#dvTester").css("display", "none");
                $("#dvTC").css("display", "none");
                $("#dvRoleC").css("display", "none");
                $("#dvStatusC").css("display", "none");

                if (report2.latestFilteredColumn == divID) {
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var TPIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report2.latestFilteredColumnDetails[divID].length; i++) {
                            id = report2.latestFilteredColumnDetails[divID][i].split("~")[1];
                            if ($.inArray(id, TPIDs) == -1)
                                TPIDs.push(id);
                        }
                        report2.createMultiSelectList("dvTP", TPIDs, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report2.testStepDetails.length; i++)
                            ids.push(report2.testStepDetails[i].split("~")[1]);
                        multiSelectList.setSelectedItemsFromArray("dvTP", ids);
                    }
                }
                else if (report2.testStepDetails.length == 0)
                    report2.createMultiSelectList("dvTP", report2.TPIDCons, "130px;", "checked", "");
                else {
                    var TPIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report2.testStepDetails.length; i++) {
                        id = report2.testStepDetails[i].split("~")[1];
                        if ($.inArray(id, TPIDs) == -1)
                            TPIDs.push(id);
                    }
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var TPIDs2 = new Array();
                        var id2 = '';
                        var arr = report2.latestFilteredColumnDetails[divID];
                        for (var i = 0; i < arr.length; i++) {
                            id2 = arr[i].split("~")[1];
                            if ($.inArray(id2, TPIDs2) == -1)
                                TPIDs2.push(id2);
                        }
                        report2.createMultiSelectList("dvTP", TPIDs2, "130px;", "", "");
                        multiSelectList.setSelectedItemsFromArray("dvTP", TPIDs);
                    }
                    else
                        report2.createMultiSelectList("dvTP", TPIDs, "130px;", "checked", "");
                }
            }
                break;

            case "dvTC": if ($("#dvTC").html() != "")
                $("#dvTC").html("");
            else {
                $("#dvTC").slideToggle("slow");
                $("#dvProject").css("display", "none");
                $("#dvTester").css("display", "none");
                $("#dvTP").css("display", "none");
                $("#dvRoleC").css("display", "none");
                $("#dvStatusC").css("display", "none");
                if (report2.latestFilteredColumn == divID) {
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var TCIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report2.latestFilteredColumnDetails[divID].length; i++) {
                            id = report2.latestFilteredColumnDetails[divID][i].split("~")[2];
                            if ($.inArray(id, TCIDs) == -1)
                                TCIDs.push(id);
                        }
                        report2.createMultiSelectList("dvTC", TCIDs, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report2.testStepDetails.length; i++)
                            ids.push(report2.testStepDetails[i].split("~")[2]);
                        multiSelectList.setSelectedItemsFromArray("dvTC", ids);
                    }
                }
                else if (report2.testStepDetails.length == 0)
                    report2.createMultiSelectList("dvTC", report2.TCIDsCons, "130px;", "checked", "");
                else {
                    var TCIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report2.testStepDetails.length; i++) {
                        id = report2.testStepDetails[i].split("~")[2];
                        if ($.inArray(id, TCIDs) == -1)
                            TCIDs.push(id);
                    }
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var TCIDs2 = new Array();
                        var id2 = '';
                        var arr = report2.latestFilteredColumnDetails[divID];
                        for (var i = 0; i < arr.length; i++) {
                            id2 = arr[i].split("~")[2];
                            if ($.inArray(id2, TCIDs2) == -1)
                                TCIDs2.push(id2);
                        }
                        report2.createMultiSelectList("dvTC", TCIDs2, "130px;", "", "");
                        multiSelectList.setSelectedItemsFromArray("dvTC", TCIDs);
                    }
                    else
                        report2.createMultiSelectList("dvTC", TCIDs, "130px;", "checked", "");
                }
            }
                break;

            case "dvTester": if ($("#dvTester").html() != "")
                $("#dvTester").html("");
            else {
                $("#dvTester").slideToggle("slow");
                $("#dvProject").css("display", "none");
                $("#dvTP").css("display", "none");
                $("#dvTC").css("display", "none");
                $("#dvRoleC").css("display", "none");
                $("#dvStatusC").css("display", "none");

                if (report2.latestFilteredColumn == divID) {
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var SPIDs = new Array();
                        var id = '';
                        for (var i = 0; i < report2.latestFilteredColumnDetails[divID].length; i++) {
                            id = report2.latestFilteredColumnDetails[divID][i].split("~")[3];
                            if ($.inArray(id, SPIDs) == -1)
                                SPIDs.push(id);
                        }
                        report2.createMultiSelectList("dvTester", SPIDs, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report2.testStepDetails.length; i++)
                            ids.push(report2.testStepDetails[i].split("~")[3]);
                        multiSelectList.setSelectedItemsFromArray("dvTester", ids);
                    }
                }
                else if (report2.testStepDetails.length == 0)
                    report2.createMultiSelectList("dvTester", report2.testerCons, "130px;", "checked", "");
                else {
                    var SPIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report2.testStepDetails.length; i++) {
                        id = report2.testStepDetails[i].split("~")[3];
                        if ($.inArray(id, SPIDs) == -1)
                            SPIDs.push(id);
                    }
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var SPIDs2 = new Array();
                        var id2 = '';
                        var arr = report2.latestFilteredColumnDetails[divID];
                        for (var i = 0; i < arr.length; i++) {
                            id2 = arr[i].split("~")[3];
                            if ($.inArray(id2, SPIDs2) == -1)
                                SPIDs2.push(id2);
                        }
                        report2.createMultiSelectList("dvTester", SPIDs2, "130px;", "", "");
                        multiSelectList.setSelectedItemsFromArray("dvTester", SPIDs);
                    }
                    else
                        report2.createMultiSelectList("dvTester", SPIDs, "130px;", "checked", "");
                }
            }
                break;

            case "dvRoleC": if ($("#dvRoleC").html() != "")
                $("#dvRoleC").html("");
            else {
                $("#dvRoleC").slideToggle("slow");
                $("#dvProject").css("display", "none");
                $("#dvTP").css("display", "none");
                $("#dvTC").css("display", "none");
                $("#dvTester").css("display", "none");
                $("#dvStatusC").css("display", "none");

                if (report2.latestFilteredColumn == divID) {
                    var roleIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report2.latestFilteredColumnDetails[divID].length; i++) {
                        id = report2.latestFilteredColumnDetails[divID][i].split("~")[6];
                        if ($.inArray(id, roleIDs) == -1)
                            roleIDs.push(id);
                    }
                    report2.createMultiSelectList("dvRoleC", roleIDs, "130px;", "", "clear");
                    var ids = new Array();
                    for (var i = 0; i < report2.testStepDetails.length; i++)
                        ids.push(report2.testStepDetails[i].split("~")[6]);
                    multiSelectList.setSelectedItemsFromArray("dvRoleC", ids);
                }
                else if (report2.testStepDetails.length == 0)
                    report2.createMultiSelectList("dvRoleC", report2.roleIDsCons, "130px;", "checked", "");
                else {
                    var roleIDs = new Array();
                    var id = '';
                    for (var i = 0; i < report2.testStepDetails.length; i++) {
                        id = report2.testStepDetails[i].split("~")[6];
                        if ($.inArray(id, roleIDs) == -1)
                            roleIDs.push(id);
                    }
                    if (report2.latestFilteredColumnDetails[divID] != undefined) {
                        var roleIDs2 = new Array();
                        var id2 = '';
                        var arr = report2.latestFilteredColumnDetails[divID];
                        for (var i = 0; i < arr.length; i++) {
                            id2 = arr[i].split("~")[6];
                            if ($.inArray(id2, roleIDs2) == -1)
                                roleIDs2.push(id2);
                        }
                        report2.createMultiSelectList("dvRoleC", roleIDs2, "130px;", "", "");
                        multiSelectList.setSelectedItemsFromArray("dvRoleC", roleIDs);
                    }
                    else
                        report2.createMultiSelectList("dvRoleC", roleIDs, "130px;", "checked", "");
                }
            }
                break;

            case "dvStatusC":
                if ($("#dvStatusC").html() != "")
                    $("#dvStatusC").html("");
                else {
                    $("#dvStatusC").slideToggle("slow");
                    $("#dvProject").css("display", "none");
                    $("#dvTP").css("display", "none");
                    $("#dvTC").css("display", "none");
                    $("#dvTester").css("display", "none");
                    $("#dvRoleC").css("display", "none");
                    if (report2.latestFilteredColumn == divID) {
                        var status = new Array();
                        var id = '';
                        for (var i = 0; i < report2.latestFilteredColumnDetails[divID].length; i++) {
                            id = report2.latestFilteredColumnDetails[divID][i].split("~")[5];
                            if ($.inArray(id, status) == -1)
                                status.push(id);
                        }
                        report2.createMultiSelectList("dvStatusC", status, "130px;", "", "clear");
                        var ids = new Array();
                        for (var i = 0; i < report2.testStepDetails.length; i++)
                            ids.push(report2.testStepDetails[i].split("~")[5]);
                        multiSelectList.setSelectedItemsFromArray("dvStatusC", ids);
                    }
                    else if (report2.testStepDetails.length == 0)
                        report2.createMultiSelectList("dvStatusC", report2.statusCons, "130px;", "checked", "");
                    else {
                        var status = new Array();
                        var id = '';
                        for (var i = 0; i < report2.testStepDetails.length; i++) {
                            id = report2.testStepDetails[i].split("~")[5];
                            if ($.inArray(id, status) == -1)
                                status.push(id);
                        }
                        if (report2.latestFilteredColumnDetails[divID] != undefined) {
                            var status2 = new Array();
                            var id2 = '';
                            var arr = report2.latestFilteredColumnDetails[divID];
                            for (var i = 0; i < arr.length; i++) {
                                id2 = arr[i].split("~")[5];
                                if ($.inArray(id2, status2) == -1)
                                    status2.push(id2);
                            }
                            report2.createMultiSelectList("dvStatusC", status2, "130px;", "", "");
                            multiSelectList.setSelectedItemsFromArray("dvStatusC", status);
                        }
                        else
                            report2.createMultiSelectList("dvStatusC", status, "130px;", "checked", "");
                    }
                }
                break;
        }
        var filters = ["dvProject", "dvTP", "dvTC", "dvTester", "dvRoleC", "dvStatusC"];
        for (var i = 0; i < filters.length; i++) {
            if ($("#" + filters[i] + "").html() != "" && filters[i] != divID) {
                $("#" + filters[i] + "").html('');
                break;
            }
        }
    },
    projectIDsAfterFilter: [],
    TPIDsAfterFilter: [],
    SPIDsAfterFilter: [],
    TCIDsAfterFilter: [],
    statusAfterFilter: [],
    RoleIDsAfterFilter: [],
    applyFilter: function (currentFilter) {
        if ($("#" + currentFilter + " input:checkbox:not(:checked)").length != $("#" + currentFilter + " input:checkbox").length) {
            if ($("#" + currentFilter + " input:checkbox:checked").length < $("#" + currentFilter + " input:checkbox").length) {
                var flagFilterNotPresent = 0;
                var previousFilteredColumn = report2.latestFilteredColumn;
                report2.latestFilteredColumn = currentFilter;
                if ($.inArray(currentFilter, report2.arrayOfFilteredColumn) == -1) {
                    report2.arrayOfFilteredColumn.push(currentFilter);
                    flagFilterNotPresent = 1;
                }

                var index0 = '';
                var arrTest0 = [];
                var index = '';
                var arrTest = [];
                var index2 = '';
                var arrTest2 = [];
                var index3 = '';
                var arrTest3 = [];
                var index4 = '';
                var arrTest4 = [];
                var index5 = '';
                var arrTest5 = [];

                if (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 1] != currentFilter) {
                    switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 1]) {
                        case "dvProject":
                            index0 = 0;
                            arrTest0 = report2.projectIDsAfterFilter;
                            break;

                        case "dvTP":
                            index0 = 1;
                            arrTest0 = report2.TPIDsAfterFilter;
                            break;

                        case "dvTC":
                            index0 = 2;
                            arrTest0 = report2.TCIDsAfterFilter;
                            break;

                        case "dvTester":
                            index0 = 3;
                            arrTest0 = report2.SPIDsAfterFilter;
                            break;

                        case "dvRoleC":
                            index0 = 6;
                            arrTest0 = report2.RoleIDsAfterFilter;
                            break;

                        case "dvStatusC":
                            index0 = 5;
                            arrTest0 = report2.statusAfterFilter;
                            break;
                    }
                }
                if (report2.arrayOfFilteredColumn.length > 1) {
                    if (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 2] != currentFilter) {
                        switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 2]) {
                            case "dvProject":
                                index = 0;
                                arrTest = report2.projectIDsAfterFilter;
                                break;

                            case "dvTP":
                                index = 1;
                                arrTest = report2.TPIDsAfterFilter;
                                break;

                            case "dvTC":
                                index = 2;
                                arrTest = report2.TCIDsAfterFilter;
                                break;

                            case "dvTester":
                                index = 3;
                                arrTest = report2.SPIDsAfterFilter;
                                break;

                            case "dvRoleC":
                                index = 6;
                                arrTest = report2.RoleIDsAfterFilter;
                                break;

                            case "dvStatusC":
                                index = 5;
                                arrTest = report2.statusAfterFilter;
                                break;
                        }
                    }
                    if (report2.arrayOfFilteredColumn.length >= 3) {
                        if (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 3] != currentFilter) {
                            switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 3]) {
                                case "dvProject":
                                    index2 = 0;
                                    arrTest2 = report2.projectIDsAfterFilter;
                                    break;

                                case "dvTP":
                                    index2 = 1;
                                    arrTest2 = report2.TPIDsAfterFilter;
                                    break;

                                case "dvTC":
                                    index2 = 2;
                                    arrTest2 = report2.TCIDsAfterFilter;
                                    break;

                                case "dvTester":
                                    index2 = 3;
                                    arrTest2 = report2.SPIDsAfterFilter;
                                    break;

                                case "dvRoleC":
                                    index2 = 6;
                                    arrTest2 = report2.RoleIDsAfterFilter;
                                    break;

                                case "dvStatusC":
                                    index2 = 5;
                                    arrTest2 = report2.statusAfterFilter;
                                    break;
                            }
                        }
                    }
                    if (report2.arrayOfFilteredColumn.length >= 4) {
                        if (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 4] != currentFilter) {
                            switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 4]) {
                                case "dvProject":
                                    index3 = 0;
                                    arrTest3 = report2.projectIDsAfterFilter;
                                    break;

                                case "dvTP":
                                    index3 = 1;
                                    arrTest3 = report2.TPIDsAfterFilter;
                                    break;

                                case "dvTC":
                                    index3 = 2;
                                    arrTest3 = report2.TCIDsAfterFilter;
                                    break;

                                case "dvTester":
                                    index3 = 3;
                                    arrTest3 = report2.SPIDsAfterFilter;
                                    break;

                                case "dvRoleC":
                                    index3 = 6;
                                    arrTest3 = report2.RoleIDsAfterFilter;
                                    break;

                                case "dvStatusC":
                                    index3 = 5;
                                    arrTest3 = report2.statusAfterFilter;
                                    break;
                            }
                        }
                    }
                    if (report2.arrayOfFilteredColumn.length >= 5) {
                        if (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 5] != currentFilter) {
                            switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 5]) {
                                case "dvProject":
                                    index4 = 0;
                                    arrTest4 = report2.projectIDsAfterFilter;
                                    break;

                                case "dvTP":
                                    index4 = 1;
                                    arrTest4 = report2.TPIDsAfterFilter;
                                    break;

                                case "dvTC":
                                    index4 = 2;
                                    arrTest4 = report2.TCIDsAfterFilter;
                                    break;

                                case "dvTester":
                                    index4 = 3;
                                    arrTest4 = report2.SPIDsAfterFilter;
                                    break;

                                case "dvRoleC":
                                    index4 = 6;
                                    arrTest4 = report2.RoleIDsAfterFilter;
                                    break;

                                case "dvStatusC":
                                    index4 = 5;
                                    arrTest4 = report2.statusAfterFilter;
                                    break;
                            }
                        }
                    }
                    if (report2.arrayOfFilteredColumn.length >= 6) {
                        if (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 6] != currentFilter) {
                            switch (report2.arrayOfFilteredColumn[report2.arrayOfFilteredColumn.length - 6]) {
                                case "dvProject":
                                    index5 = 0;
                                    arrTest5 = report2.projectIDsAfterFilter;
                                    break;

                                case "dvTP":
                                    index5 = 1;
                                    arrTest5 = report2.TPIDsAfterFilter;
                                    break;

                                case "dvTC":
                                    index5 = 2;
                                    arrTest5 = report2.TCIDsAfterFilter;
                                    break;

                                case "dvTester":
                                    index5 = 3;
                                    arrTest5 = report2.SPIDsAfterFilter;
                                    break;

                                case "dvRoleC":
                                    index5 = 6;
                                    arrTest5 = report2.RoleIDsAfterFilter;
                                    break;

                                case "dvStatusC":
                                    index5 = 5;
                                    arrTest5 = report2.statusAfterFilter;
                                    break;
                            }
                        }
                    }

                }
                var arrBuf = [];
                switch (currentFilter) {
                    case "dvProject":
                        arrBuf = report2.projectIDsAfterFilter;
                        report2.projectIDsAfterFilter = [];
                        break;

                    case "dvTP":
                        arrBuf = report2.TPIDsAfterFilter;
                        report2.TPIDsAfterFilter = [];
                        break;

                    case "dvTC":
                        arrBuf = report2.TCIDsAfterFilter;
                        report2.TCIDsAfterFilter = [];
                        break;

                    case "dvTester":
                        arrBuf = report2.SPIDsAfterFilter;
                        report2.SPIDsAfterFilter = [];
                        break;

                    case "dvRoleC":
                        arrBuf = report2.RoleIDsAfterFilter;
                        report2.RoleIDsAfterFilter = [];
                        break;

                    case "dvStatusC":
                        arrBuf = report2.statusAfterFilter;
                        report2.statusAfterFilter = [];
                        break;
                }
                var testStepDetails = [];
                testStepDetails = report2.testStepDetails;
                report2.testStepDetails = new Array();
                var data = new Array();
                var childItems2 = [];
                $("#" + currentFilter + " div div li").each(
                    function () {
                        childItems2 = [];
                        switch (currentFilter) {
                            case "dvProject":
                                childItems2 = report2.forPIDGetChildItemsCons[$(this).children(".mslChk").attr('Id').split("_")[1]];
                                break;
                            case "dvTP":
                                childItems2 = report2.forTPIDGetChildItemsCons[$(this).children(".mslChk").attr('Id').split("_")[1]];
                                break;
                            case "dvTC":
                                childItems2 = report2.forTCIDGetChildItemsCons[$(this).children(".mslChk").attr('Id').split("_")[1]];
                                break;
                            case "dvTester":
                                childItems2 = report2.forTesterGetChildItemsCons[$(this).children(".mslChk").attr('Id').split("_")[1]];
                                break;

                            case "dvRoleC":
                                childItems2 = report2.forRoleIDGetChildItemCons[$(this).children(".mslChk").attr('Id').split("_")[1]];
                                break;

                            case "dvStatusC":
                                childItems2 = report2.forStatusGetChildItemsCons[$(this).children(".mslChk").attr('Id').split("_")[1]];
                                break;
                        }
                        if (childItems2 != undefined)
                            data = data.concat(childItems2.split("`"));
                        if ($(this).children(".mslChk").attr('checked') == true) {
                            if (childItems2 != undefined) {
                                var childItems = childItems2.split("`");
                                for (var i = 0; i < childItems.length; i++) {
                                    var items = childItems[i].split("~");
                                    if (($.inArray(items[index0], arrTest0) != -1 || arrTest0.length == 0) && ($.inArray(items[index], arrTest) != -1 || arrTest.length == 0) && ($.inArray(items[index2], arrTest2) != -1 || arrTest2.length == 0) && ($.inArray(items[index3], arrTest3) != -1 || arrTest3.length == 0) && ($.inArray(items[index4], arrTest4) != -1 || arrTest4.length == 0) && ($.inArray(items[index5], arrTest5) != -1 || arrTest5.length == 0))
                                        report2.testStepDetails.push(childItems[i]);
                                }
                                switch (currentFilter) {
                                    case "dvProject":
                                        report2.projectIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                        break;

                                    case "dvTP":
                                        report2.TPIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                        break;

                                    case "dvTC":
                                        report2.TCIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                        break;

                                    case "dvTester":
                                        report2.SPIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                        break;

                                    case "dvRoleC":
                                        report2.RoleIDsAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                        break;

                                    case "dvStatusC":
                                        report2.statusAfterFilter.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                        break;
                                }
                            }
                        }
                    });
                if (report2.testStepDetails.length != 0) {
                    report2.latestFilteredColumnDetails[currentFilter] = data;
                    report2.showFilteredData(report2.testStepDetails);
                    $("#" + report2.currentlyOpenFilter + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report2.filters(\'' + report2.currentlyOpenFilter + '\')"/>');
                    if ((previousFilteredColumn != '' && previousFilteredColumn != currentFilter || report2.arrayOfFilteredColumn.length > 1)) {
                        for (var mm = 0; mm < report2.arrayOfFilteredColumn.length; mm++)
                            $("#" + report2.arrayOfFilteredColumn[mm] + "img").html('<img src="/images/with-filter.png" style="cursor:pointer" onclick="report2.filters(\'' + report2.arrayOfFilteredColumn[mm] + '\')"/>');
                    }
                }
                else {
                    switch (currentFilter) {
                        case "dvProject":
                            report2.projectIDsAfterFilter = arrBuf;
                            break;

                        case "dvTP":
                            report2.TPIDsAfterFilter = arrBuf;
                            break;

                        case "dvTC":
                            report2.TCIDsAfterFilter = arrBuf;
                            break;

                        case "dvTester":
                            report2.SPIDsAfterFilter = arrBuf;
                            break;

                        case "dvRoleC":
                            report2.RoleIDsAfterFilter = arrBuf;
                            break;

                        case "dvStatusC":
                            report2.statusAfterFilter = arrBuf;
                            break;
                    }
                    report2.testStepDetails = testStepDetails;
                    if (flagFilterNotPresent == 1) {
                        report2.latestFilteredColumn = previousFilteredColumn;
                        var arr = new Array();
                        for (var i = 0; i < report2.arrayOfFilteredColumn.length; i++) {
                            if (report2.arrayOfFilteredColumn[i] != currentFilter)
                                arr.push(report2.arrayOfFilteredColumn[i]);
                        }
                        report2.arrayOfFilteredColumn = arr;
                    }

                    //report.alertBox("No Test Step available with selected filter!");
                    report.alertBox("No " + report.gConfigTestStep + " available with selected filter!");//Added By Mohini For resource File(25-02-2014)
                }
            }
            else if ($("#" + currentFilter + " input:checkbox:checked").length == $("#" + currentFilter + " input:checkbox").length) {
                report2.clearFilter(currentFilter);
            }
            if (report2.currentlyOpenFilter != '')
                $("#" + report2.currentlyOpenFilter + "").html('');

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
        if (divID != "dvStatusC")
            divhtml = "<div class='Mediumddl' style='border: solid 1px #ccc; width:300px; padding-left:1px;margin-left:-10px;margin-top:8.5px'>";
        else
            divhtml = "<div class='Mediumddl' style='border: solid 1px #ccc; width:150px; padding-left:1px;margin-left:-10px;margin-top:8.5px'>";
        divhtml += "<ul id='ulItems" + divID + "' style='list-style-type:none; list-style-position:outside;display:inline;'>" +
            "<li>Select:&nbsp;<a id='linkSA_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\"" + divID + "\");" + multiSelectList.functionToInvoke + "'>All</a>" +
                 "&nbsp;&nbsp;<a id='linkSN_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\"" + divID + "\");" + multiSelectList.functionToInvoke + "'>None</a>";
        if (clear == "clear" || $.inArray(divID, report2.arrayOfFilteredColumn) != -1)
            divhtml += "&nbsp;&nbsp;|&nbsp;&nbsp;<a id='anchShow_" + divID + "' style='color:blue; text-decoration:underline; cursor:pointer' onclick='report2.clearFilter(\"" + divID + "\");'>Clear Filter</a></li>";
        divhtml += "<li><hr/></li>";
        divhtml += "<div style='overflow-y:auto; height:" + height + " width:inherit;white-space: nowrap;border:1px #ccc solid'>";

        for (var i = 0; i < listItems.length; i++) {
            var itemId = divID + "_" + listItems[i];

            switch (divID) {
                case "dvProject":
                    var hoverTxt = report.projectNameForPID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;

                case "dvTP":
                    var hoverTxt = report.TPNameForTPID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;

                case "dvTC":
                    var hoverTxt = report.TCNameForTCID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;
                case "dvTester":
                    var hoverTxt = report.testerNameForSPID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;

                case "dvStatusC":
                    //itemId = itemId.replace(" ","");
                    if (chk == "checked")
                        divhtml = divhtml + "<li><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + listItems[i] + "</span>" + listItems[i] + "</li>";
                    else
                        divhtml = divhtml + "<li><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + listItems[i] + "</span>" + listItems[i] + "</li>";
                    break;

                case "dvRoleC":
                    var hoverTxt = report.RoleNameForRoleID[listItems[i]];
                    if (chk == "checked")
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    else
                        divhtml = divhtml + "<li title='" + hoverTxt + "'><input id='" + itemId + "'  type='checkbox' class='mslChk' ></input><span id='" + itemId + "' style=\"display: none;\">" + multiSelectList.filterData(hoverTxt) + "</span>" + trimText(multiSelectList.filterData(hoverTxt), 100) + "</li>";
                    break;
            }

        }
        divhtml += "</div></ul><div style='margin-top:5px;float:right;padding:5px 0px 5px 0px'><input type='button' class='btn' style='width:50px;margin-left:0px;min-width:0px !important' value='Ok' onclick='report2.applyFilter(\"" + divID + "\")'/><input type='button' class='btn' style='margin-left:0px' value='Cancel' style='margin-left:5px;margin-right:7px;min-width:0px !important' onclick='report.cancel(\"" + divID + "\");'/></div></div>";

        $("#" + divID).html(divhtml);

    },
    sortJSON: function (data, key, way) {
        return data.sort(function (a, b) {
            var x = a[key] == undefined ? "" : a[key]; var y = b[key] == undefined ? "" : b[key];
            if (way === 'asc') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
            if (way === 'desc') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
        });
    }


}