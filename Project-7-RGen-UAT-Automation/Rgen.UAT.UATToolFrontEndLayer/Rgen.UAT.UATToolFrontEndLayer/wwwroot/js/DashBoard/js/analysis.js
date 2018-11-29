/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/
var AnalysisArray;
var membersForinitPagination = new Array();
var merge = new Array();
function initPagination() {
    // count entries inside the hidden content
    merge = Analysis.drawVisualizationChart();
    membersForinitPagination = merge.split("~")[0].split(",");
    var member = membersForinitPagination.length;

    $("#Pagination").pagination(member, {
        callback: pageselectCallback,
        items_per_page: 15,
        num_display_entries: 10,
        num: 2
    });
}
function pageselectCallback(page_index, jq) {
    // Get number of elements per pagionation page from form
    // var members = new Array();
    //  members = DashBoard.getAppActivity();

    var items_per_page = 15
    var max_elem = Math.min((page_index + 1) * items_per_page, membersForinitPagination.length);
    var newcontent = '';

    if (membersForinitPagination[0] != "") {
        if ($("#totTestCase").text() != "0" && $("#totTeSt").text() != "0") {
            $("#Pagination").show();
            $("#TD").css('display', '');
            $(".proj-desc h1 h3").remove();
            $(".proj-desc h1 br").remove()
            var passSeries = new Array();
            var failSeries = new Array();
            var ncSeries = new Array();
            var testerNames = new Array();
            var url = "https://chart.googleapis.com/chart?" +
                    "chxl=1:";
            for (var i = page_index * items_per_page; i < max_elem; i++) {
                //url+="|"+membersForinitPagination[i].split(' ')[0];
                url += "|" + membersForinitPagination[i];
                if (merge.split("~")[1].split(",")[i] != 0 && merge.split("~")[1].split(",")[i] != undefined)
                    passSeries.push(merge.split("~")[1].split(",")[i]);
                else
                    passSeries.push(-1);
                if (merge.split("~")[2].split(",")[i] != 0 && merge.split("~")[2].split(",")[i] != undefined)
                    failSeries.push(merge.split("~")[2].split(",")[i]);
                else
                    failSeries.push(-1);
                if (merge.split("~")[3].split(",")[i] != 0 && merge.split("~")[3].split(",")[i] != undefined)
                    ncSeries.push(merge.split("~")[3].split(",")[i]);
                else
                    ncSeries.push(-1);
            }
            url += "&chxt=y,x" +
                 "&chbh=29,29" +
                 "&chs=1000x300" +
                 "&cht=bvs" +
                 "&chdl=Pass|Fail|Not Completed" +
                 "&chdp:1000" +
                 "&chco=008000,FF0000,FF9900" +
                 "&chd=t:" + passSeries + "|" + failSeries + "|" + ncSeries + "" +
                 "&chma=5&chg=0,10,1" +
                 "&chm=N,000000,0,,12,,c|N,000000,1,,12,,c|N,ffffff,2,,12,,c";
            //$('#dvtesterDetail').html('Tester Detail(s)');
            $('#dvtesterDetail').html(Analysis.rsTester + ' Detail(s)');//added by mohini for resource file

            $('#barChart').gchart('destroy');
            //$('#barChart').html("<img src='"+url+"'  alt='Tester Analysis Chart' />");
            $('#barChart').html("<img src='" + url + "'  alt=" + Analysis.rsTester + " Analysis Chart' />");//added by mohini for resource file

            //Code to show the Tester names on Hover Over :Ejaz Waquif DT:5/14/2014
            $('#barChart img').mousemove(function (mEvent) {

                if (mEvent.offsetY >= 280 && mEvent.offsetY <= 295) {
                    $.each(Analysis.gTesterArr, function (ind, itm) {

                        if (mEvent.offsetX >= parseInt(itm["Range"]) && mEvent.offsetX <= parseInt(itm["Range"]) + 30) {
                            $('#barChart img').attr("title", itm["Tester"]);
                        }

                    });
                }
                else
                    $('#barChart img').removeAttr("title");
            });
            //End of Code to show the Tester names on Hover Over :Ejaz Waquif DT:5/14/2014							
        }
        else {
            $('#barChart').gchart('destroy');
            $('#barChart').html('');
            $('#dvtesterDetail').html('');
            $("#Pagination").hide();
            if ($("#totTestCase").text() == "0") {
                //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>No Test Case is Available for the Tester(s)</h3>");
                $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">No ' + Analysis.rsTestCase + ' is Available for the ' + Analysis.rsTester + '(s)</h3>');//added by Mohini for resource file

            }
            else {
                //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>No Test Step is Available for the Tester(s)</h3>");
                $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">No ' + Analysis.rsTestStep + ' is Available for the ' + Analysis.rsTester + '(s)</h3>');//added by Mohini for resource file
            }
        }
    }
    else {

        //Added by Mangesh
        $('#barChart').gchart('destroy');
        $('#barChart').html('');
        $('#dvtesterDetail').html('');
        $("#Pagination").hide();

        if ($("#totTestCase").text() == "0") {
            //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>No Test Case is Available for the Tester(s)</h3>");
            $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">No ' + Analysis.rsTestCase + ' is Available for the ' + Analysis.rsTester + '(s)</h3>');//added by Mohini for resource file

        }
        else if ($("#totTeSt").text() == "0") {
            //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>No Test Step is Available for the Tester(s)</h3>");
            $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">No ' + Analysis.rsTestStep + ' is Available for the ' + Analysis.rsTester + '(s)</h3>');//added by Mohini for resource file
        }
        else if ($("#totTester").text() == "0") {
            //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>There are no Testers</h3>");
            $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">There are no' + Analysis.rsTester + '</h3>');//added by Mohini for resource file
        }
    }
    // Prevent click event propagation
    return false;
}

var Analysis = {

    //Created by HRW for optimization on 1 Aug 2012
    leadNameForProjectID: new Array(),
    TMNameDueDateForTPID: new Array(),
    pid: new Array(),
    tpid: new Array(),
    pageLoad: 0,
    /******Variable defined for resource file by Mohini*******/
    rsProject: 'Project',
    rstestPass: 'Test Pass',
    rsTestStep: 'Test Step',
    rsTestCase: 'Test Case',
    rsTester: 'Tester',
    rsAnalysis: 'Analysis',
    rsVersion: 'Version',
    rsRole: 'Role',//:SD
    isPortfolioOn: false,
    RoleItems: new Array(),

    gProjectVersion: new Array(),

    gTesterArr: new Array(),
    RolesForSPUserID: new Array(),//:SD
    RoleNameForRoleID: new Array(),//:SD

    getTestPassNameByProjectId: new Array(), // Added by Mangesh

    projectItems: [], // Added by Mangesh

    getProjectNameByID: new Array(),

    getTestPassIdByProjectId: new Array(),

    getTesterIdByTestpassId: new Array(),   // Added by Mangesh

    getRoleIdByTesterId: new Array(),   // Added by Mangesh

    getCountByTesterIdAndRoleId: new Array(),    // Added by Mangesh

    countItems: [],

    getUniqueTesters: new Array(),

    initAnalysis: function () {
        security.applyCommanSecurity(_spUserId, $('#userW').text());

        /************************Added by For resource file*********************/
        if (resource.isConfig.toLowerCase() == 'true') {
            Analysis.rsProject = resource.gPageSpecialTerms['Project'] == undefined ? 'Project' : resource.gPageSpecialTerms['Project'];
            Analysis.rstestPass = resource.gPageSpecialTerms['Test Pass'] == undefined ? 'Test Pass' : resource.gPageSpecialTerms['Test Pass'];
            Analysis.rsTestCase = resource.gPageSpecialTerms['Test Case'] == undefined ? 'Test Case' : resource.gPageSpecialTerms['Test Case'];
            Analysis.rsTestStep = resource.gPageSpecialTerms['Test Step'] == undefined ? 'Test Step' : resource.gPageSpecialTerms['Test Step'];
            Analysis.rsTester = resource.gPageSpecialTerms['Tester'] == undefined ? 'Tester' : resource.gPageSpecialTerms['Tester'];
            Analysis.rsAnalysis = resource.gPageSpecialTerms['Analysis'] == undefined ? 'Analysis' : resource.gPageSpecialTerms['Analysis'];
            Analysis.rsVersion = resource.gPageSpecialTerms['Version'] == undefined ? 'Version' : resource.gPageSpecialTerms['Version'];
            Analysis.rsRole = resource.gPageSpecialTerms['Role'] == undefined ? 'Role' : resource.gPageSpecialTerms['Role'];//:SD
        }
        $('#TestDt').html(Analysis.rsTester + ' Detail(s)');
        $('#prjName').html('<select id="dd" class="ddl" style="width:240px;"><option value="select">' + Analysis.rsProject + ' Name</option></select>');
        $('#slectTP').html('<select style="width:240px;" id="testPassDD" class="ddl"><option value="select">Select ' + Analysis.rstestPass + '</option></select>');
        $('#slectTester').html('<select id="testerDD" class="ddl" style="width:240px;"><option value="select">All ' + Analysis.rsTester + 's</option></select>');
        $('#SelectRole').html('<select id="roleDD" class="ddl" style="width:240px;"><option value="select">All ' + Analysis.rsRole + 's</option></select>');//:SD
        $('#btnShow').val('Export ' + Analysis.rsTestCase + ' Statistics');
        /********************************************************************************/


        /**************code for checking the url***********/
        var url = window.location.href;
        var splitUrl = url.split("?");
        var pid, tpid;

        if (splitUrl[1] != null || splitUrl[1] != undefined) {
            if (splitUrl[1].indexOf('&') != -1) {
                var splitUrlAmp = splitUrl[1].split("&");
                pid = $.trim(splitUrlAmp[0].split("=")[1]);
                tpid = $.trim(splitUrlAmp[1].split("=")[1]);
            }
        }

        Analysis.pid = pid;
        Analysis.tpid = tpid;

        //Fill Project Drop Down
        var DataCollection;
        //Using the generic service layer getmethod to call the required function  :   Mangesh
        Analysis.projectItems = ServiceLayer.GetData("GetDropdownDataForDetailAnalysis", undefined, 'Dashboard');  // _spUserId   "12" 
        DataCollection = Analysis.projectItems;

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


        Analysis.projectItems = [];
        Analysis.projectItems = DataCollection;
        AnalysisArray = DataCollection

        Analysis.fillProjectDD();
        Analysis.versionFillOnddChange();
        Analysis.fillTestPassDD($('#versionDD').val());    //take value of versionDD instead

        if (pid != '' && pid != undefined) {
            if (pid != "Default " + Analysis.rsVersion) {

                var prjName = Analysis.getProjectNameByID[pid][0].projectName;
                $("#dd [title='" + prjName + "']").attr("selected", "selected");
                //$("#dd").change();

                Analysis.versionFillOnddChange(prjName);
                $("#versionDD [value='" + pid + "']").attr("selected", "selected");
                Analysis.fillTestPassDD(pid);
                //$("#versionDD").change();
                $("#testPassDD [value='" + tpid + "']").attr("selected", "selected");
                //$("#testPassDD").change();
            }

        }


        /******Added by Mohini For Resource file*****/
        //$('#testPassDet').text( Analysis.rstestPass+' Details: '+trimText( $('#testPassDD option:selected').attr("title"),25) ); 

        $('#testPassDet').text(Analysis.rstestPass + ' Details: ' + $('#testPassDD option:selected').text());
        $('#testPassDet').attr("title", $('#testPassDD option:selected').attr("title"));


        Analysis.fillTesterDD();

        //call the second method for counts
        Analysis.getCount();

        google.setOnLoadCallback(Analysis.drawVisualizationGauge);


        //handle Change event for Project Drop down
        $('#dd').change(function (e) {
            Analysis.versionFillOnddChange();
            Analysis.fillTestPassDD(this.value);
            Analysis.fillTesterDD();

            //call the second method for counts
            Analysis.getCount();

            Analysis.drawVisualizationGauge($('#testPassDD option:selected').val());
            initPagination();
            //$('#testPassDet').text('Test Pass Details: '+$('#testPassDD option:selected').text());
            /*******Added by mohini For Resource file********/
            $('#testPassDet').text(Analysis.rstestPass + ' Details: ' + $('#testPassDD option:selected').text());
            $('#testPassDet').attr("title", $('#testPassDD option:selected').attr("title"));

            $("#hideRow").hide();
            $("#snglTester").hide();
            $("#hideRow2").hide();
            $("#snglTester2").hide();

        });

        //handle Change event for Test Pass Drop down
        $('#testPassDD').change(function (e) {
            Analysis.fillTesterDD();
            Analysis.fillTab();

            //call the second method for counts
            Analysis.getCount();

            Analysis.drawVisualizationGauge($('#testPassDD option:selected').val());
            initPagination();
            //$('#testPassDet').text('Test Pass Details: '+$('#testPassDD option:selected').text());
            /*******Added by mohini for resource file*****/
            $('#testPassDet').text(Analysis.rstestPass + ' Details: ' + $('#testPassDD option:selected').text());
            $('#testPassDet').attr("title", $('#testPassDD option:selected').attr("title"));

            $("#hideRow").hide();
            $("#snglTester").hide();
            $("#hideRow2").hide();
            $("#snglTester2").hide();

        });

        //handle Change event for Tester Drop down
        $('#testerDD').change(function (e) {
            //Fill roles on tester change:SD 
            $("#roleDD").empty();
            var temp = '<option value="' + 0 + '">All ' + Analysis.rsRole + '</option>';
            $('#roleDD').append(temp);

            if ($("#testerDD").val() == 0) {
                var rroleIDss = new Array();
                //to get roles according to testpassId
                var roleItems = Analysis.getTesterIdByTestpassId[$('#testPassDD option:selected').val()];
                for (var i = 0; i < roleItems.length; i++) {

                    if ($.inArray(roleItems[i].roleId, rroleIDss) == -1) {
                        rroleIDss.push(roleItems[i].roleId);
                        var temp1 = '<option title="' + roleItems[i].roleName + '" value="' + roleItems[i].roleId + '">' + trimText(roleItems[i].roleName.toString(), 16) + '</option>';

                        $("#roleDD").append(temp1);
                    }
                }

            }
            else if ($("#testerDD").val() != 0) {
                var rroleIDs = new Array();
                var roles = Analysis.getRoleIdByTesterId[$("#versionDD option:selected").val() + "-" + $("#testPassDD option:selected").val() + "-" + $("#testerDD option:selected").val()];
                if (roles != undefined) {
                    for (var i = 0; i < roles.length; i++) {
                        if ($.inArray(roles[i].roleId, rroleIDs) == -1) {
                            rroleIDs.push(roles[i].roleId);
                            var temp = '<option title="' + roles[i].roleName + '" value="' + roles[i].roleId + '">' + trimText(roles[i].roleName.toString(), 16) + '</option>';
                            $("#roleDD").append(temp);
                        }
                    }
                }
            }//:SD

            //call the second method for counts
            Analysis.getCount();

            Analysis.drawVisualizationGauge();
            initPagination();
            //$('#testPassDet').text('Test Pass Details: '+$('#testPassDD option:selected').text());
            $('#testPassDet').text(Analysis.rstestPass + ' Details: ' + $('#testPassDD option:selected').text());

        });

        //Role change event added:SD	
        $('#roleDD').change(function () {

            //call the second method for counts
            Analysis.getCount();

            Analysis.drawVisualizationGauge();
            initPagination();
            $('#testPassDet').text(Analysis.rstestPass + ' Details: ' + $('#testPassDD option:selected').text());

        });

        $("#versionDD").change(function () {

            var projId = $(this).val();

            Analysis.fillTestPassDD(projId);
            Analysis.fillTesterDD();

            //call the second method for counts
            Analysis.getCount();

            Analysis.drawVisualizationGauge($('#testPassDD option:selected').val());
            initPagination();
            //$('#testPassDet').text('Test Pass Details: '+$('#testPassDD option:selected').text());
            /*******Added by mohini For Resource file********/
            $('#testPassDet').text(Analysis.rstestPass + ' Details: ' + $('#testPassDD option:selected').text());
            $('#testPassDet').attr("title", $('#testPassDD option:selected').attr("title"));

            $("#hideRow").hide();
            $("#snglTester").hide();
            $("#hideRow2").hide();
            $("#snglTester2").hide();
        });
    },
    // function to fill project drop down
    fillProjectDD: function () {
        var temp = '';
        var projectName = '';
        var testpassName = '';
        var testpassId = '';
        //var testerId='';
        //var testerName='';
        //var roleId='';
        //var roleName='';
        var tpEndDate = '';
        var testManager = '';
        var versionLead = '';
        var projectVersion = '';

        ////////////////////////////////////////////////////////////////////////////////
        $('#dd').empty();
        var tempProjArr = new Array();
        var tempProjVersion = new Array();

        if ((Analysis.projectItems != undefined) && (Analysis.projectItems != null) && (Analysis.projectItems.length > 0)) {
            // alert(projectItems.length);
            for (var i = 0; i < Analysis.projectItems.length ; i++) {
                Analysis.leadNameForProjectID[Analysis.projectItems[i].projectId] = Analysis.projectItems[i].versionLead;
                projectID = Analysis.projectItems[i].projectId;
                projectName = Analysis.projectItems[i].projectName;
                projectVersion = Analysis.projectItems[i].projectVersion; //added by Mangesh	                  	                  
                versionLead = Analysis.projectItems[i].versionLead;

                testpassName = Analysis.projectItems[i].testpassName; //added by Mangesh
                testpassId = Analysis.projectItems[i].testpassId; //added by Mangesh
                //testerId=Analysis.projectItems[i].testerId; //added by Mangesh
                //testerName=Analysis.projectItems[i].testerName; //added by Mangesh
                //roleId=Analysis.projectItems[i].roleId; //added by Mangesh
                //roleName=Analysis.projectItems[i].roleName; //added by Mangesh
                tpEndDate = Analysis.projectItems[i].tpEndDate; //added by Mangesh
                testManager = Analysis.projectItems[i].testManager; //added by Mangesh


                if (Analysis.getProjectNameByID[Analysis.projectItems[i].projectId] == undefined) {
                    Analysis.getProjectNameByID[Analysis.projectItems[i].projectId] = new Array();
                    Analysis.getProjectNameByID[Analysis.projectItems[i].projectId].push({

                        "projectName": projectName,
                        "versionLead": versionLead,
                        "projectVersion": projectVersion
                    });
                }
                else {
                    Analysis.getProjectNameByID[Analysis.projectItems[i].projectId].push({

                        "projectName": projectName,
                        "versionLead": versionLead,
                        "projectVersion": projectVersion
                    });

                }

                if (testpassId != "") {
                    if (Analysis.getTestPassIdByProjectId[Analysis.projectItems[i].projectId] == undefined) {
                        Analysis.getTestPassIdByProjectId[Analysis.projectItems[i].projectId] = new Array();
                        Analysis.getTestPassIdByProjectId[Analysis.projectItems[i].projectId].push({

                            "testpassId": testpassId,
                            "testpassName": testpassName,
                            //"testerId":testerId,
                            //"testerName": testerName,
                            "testManager": testManager,
                            "tpEndDate": tpEndDate

                        }); //added by Mangesh
                    }
                    else {
                        Analysis.getTestPassIdByProjectId[Analysis.projectItems[i].projectId].push({

                            "testpassId": testpassId,
                            "testpassName": testpassName,
                            //"testerId":testerId,
                            //"testerName": testerName,
                            "testManager": testManager,
                            "tpEndDate": tpEndDate

                        }); //added by Mangesh
                    }
                }

                var listTester = Analysis.projectItems[i].lstTesterList;
                if (listTester!=undefined) {
                    for (var j = 0; j < listTester.length; j++) {
                        if (listTester[j].testerId != "") {

                            if (Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testpassId] == undefined) {
                                Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testpassId] = new Array();
                                Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testpassId].push({
                                    "testerId": listTester[j].testerId,
                                    "testerName": listTester[j].testerName,
                                    "roleId": listTester[j].roleId,
                                    "roleName": listTester[j].roleName
                                });
                            }
                            else {
                                Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testpassId].push({
                                    "testerId": listTester[j].testerId,
                                    "testerName": listTester[j].testerName,
                                    "roleId": listTester[j].roleId,
                                    "roleName": listTester[j].roleName

                                });

                            }
                        }

                        if (listTester[j].roleId != "") {

                            if (Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId + "-" + Analysis.projectItems[i].testpassId + "-" + listTester[j].testerId] == undefined) {
                                Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId + "-" + Analysis.projectItems[i].testpassId + "-" + listTester[j].testerId] = new Array();
                                Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId + "-" + Analysis.projectItems[i].testpassId + "-" + listTester[j].testerId].push({

                                    "roleId": listTester[j].roleId,
                                    "roleName": listTester[j].roleName
                                });
                            }
                            else {
                                Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId + "-" + Analysis.projectItems[i].testpassId + "-" + listTester[j].testerId].push({
                                    "roleId": listTester[j].roleId,
                                    "roleName": listTester[j].roleName
                                });

                            }
                        }
                    }
                }
               



                if ($.inArray(Analysis.projectItems[i].projectName, tempProjArr) == -1) {
                    tempProjArr.push(Analysis.projectItems[i].projectName);
                    temp = '<option value="' + projectID + '" title="' + projectName + '">' + trimText(projectName.toString(), 39) + '</option>'; //added by shilpa to solve bug 3378
                    Analysis.gProjectVersion[Analysis.projectItems[i].projectName] = new Array();

                    var version = Analysis.projectItems[i].projectVersion == undefined || Analysis.projectItems[i].projectVersion == null || Analysis.projectItems[i].projectVersion == "" ? "Default " + Analysis.rsVersion : Analysis.projectItems[i].projectVersion;
                    Analysis.gProjectVersion[Analysis.projectItems[i].projectName].push(projectID + "`" + version);
                    $('#dd').append(temp);
                }
                else {
                    if ($.inArray(projectID + "`" + projectVersion, Analysis.gProjectVersion[Analysis.projectItems[i].projectName]) == -1) {
                        var version = Analysis.projectItems[i].projectVersion == undefined || Analysis.projectItems[i].projectVersion == null || Analysis.projectItems[i].projectVersion == "" ? "Default " + Analysis.rsVersion : Analysis.projectItems[i].projectVersion;
                        Analysis.gProjectVersion[Analysis.projectItems[i].projectName].push(projectID + "`" + version);
                    }
                }

            }

        }
        else {
            temp = '<option value="' + 0 + '">No ' + Analysis.rsProject + ' Available</option>';
            $('#dd').append(temp);
            $("#versionDD").html("<option >No " + Analysis.rsVersion + "</option>");
        }

    },
    versionFillOnddChange: function (p) {

        var verLen = 0;
        var versionMarkup = '';
        if (p == "" || p == undefined) {
            if (Analysis.gProjectVersion[$('#dd option:selected').attr("title")] != undefined) {
                verLen = Analysis.gProjectVersion[$('#dd option:selected').attr("title")].length;

                for (var i = 0; i < verLen; i++) {
                    var versionName = Analysis.gProjectVersion[$('#dd option:selected').attr("title")][i].split("`")[1];
                    var versionNameTrim = versionName.length > 35 ? versionName.slice(0, 35) + "..." : versionName;
                    var projID = Analysis.gProjectVersion[$('#dd option:selected').attr("title")][i].split("`")[0];
                    versionMarkup += '<option value="' + projID + '" title="' + versionName + '" >' + versionNameTrim + '</option>';

                }

                $("#versionDD").html(versionMarkup);
            }
            else {
                //$("#versionDD").html("<option >No Version Available</option>");
                $("#versionDD").html("<option >Default " + Analysis.rsVersion + "</option>");
            }
        }
        else {
            if (Analysis.gProjectVersion[p] != undefined) {
                verLen = Analysis.gProjectVersion[p].length;

                for (var i = 0; i < verLen; i++) {
                    var versionName = Analysis.gProjectVersion[p][i].split("`")[1];
                    var versionNameTrim = versionName.length > 35 ? versionName.slice(0, 35) + "..." : versionName;
                    var projID = Analysis.gProjectVersion[p][i].split("`")[0];
                    versionMarkup += '<option value="' + projID + '" title="' + versionName + '" >' + versionNameTrim + '</option>';

                }

                $("#versionDD").html(versionMarkup);

            }
            else {
                //$("#versionDD").html("<option >No Version Available</option>");
                $("#versionDD").html("<option >Default " + Analysis.rsVersion + "</option>");
            }
        }

    },

    testCaseFailcount: '',
    testCasePassCount: '',
    testCaseNtCompletedCount: '',
    testStepFailcount: '',
    testStepPassCount: '',
    testStepNtCompletedCount: '',
    totalTestStepCount: '',
    totalTestCaseCount: '',

    getCount: function () {
        Analysis.testCaseFailcount = 0;
        Analysis.testCasePassCount = 0;
        Analysis.testCaseNtCompletedCount = 0;
        Analysis.testStepFailcount = 0;
        Analysis.testStepPassCount = 0;
        Analysis.testStepNtCompletedCount = 0;
        Analysis.totalTestStepCount = 0;
        Analysis.totalTestCaseCount = 0;
        Analysis.totalTesterCount = 0;


        var param = '';
        //$('#totTester').html("");

        if ($("#testerDD").val() == 0 && $("#roleDD").val() == 0) {
            //param = "Parameters?ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val();
            param = "&ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val();
        }
        else if ($("#testerDD").val() != 0 && $("#roleDD").val() == 0) {
            //param = "Parameters?ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val() + "&TesterSPUserId=" + $("#testerDD option:selected").val();
            param = "&ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val() + "&TesterSPUserId=" + $("#testerDD option:selected").val();
        }
        else if ($("#testerDD").val() != 0 && $("#roleDD").val() != 0) {
            //param = "Parameters?ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val() + "&TesterSPUserId=" + $('#testerDD option:selected').val() + "&RoleId=" + $('#roleDD option:selected').val();
            param = "&ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val() + "&TesterSPUserId=" + $('#testerDD option:selected').val() + "&RoleId=" + $('#roleDD option:selected').val();
        }
        else if ($("#testerDD").val() == 0 && $("#roleDD").val() != 0) {
            //param = "Parameters?ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val() + "&RoleId=" + $('#roleDD option:selected').val();
            param = "&ProjectId=" + $('#versionDD option:selected').val() + "&TestPassId=" + $('#testPassDD option:selected').val() + "&RoleId=" + $('#roleDD option:selected').val();
        }
        Analysis.countItems = ServiceLayer.GetData("GetDetailAnalysisData", param, 'Dashboard');

        if (Analysis.countItems.match != undefined) {
            if (Analysis.countItems.match(/[a-z]/gmi)) {
                console.log('Error');
            }
        }
        else {

            //[!] Iteration
            var testPassId;
            var EterationArray = new Array();
            EterationArray = Analysis.countItems;
            var finalAnlysisArray = new Array();
            var itArray1 = []; var itArray2 = []; var itArray3 = [];
            /*[!] 1st Iteration for OutPut=1*/
            if (EterationArray != undefined && EterationArray.length > 0) {
                var len = EterationArray.length;
                for (var i = 0; i < len; i++) {

                    if (EterationArray[i].hasOwnProperty("OutPut1")) {
                        if (EterationArray[i].OutPut1 == "1") {
                            itArray1.push(EterationArray[i]);
                            for (var i1 = 0; i1 < itArray1.length; i1++) {
                                if (itArray1[i1].hasOwnProperty("TestPass_ID")) { testPassId = itArray1[i1].TestPass_ID.toString() }
                            }
                        }
                    }

                    if (EterationArray[i].OutPut1 == "2" && EterationArray[i].TestPass_ID == testPassId) {
                        itArray2.push(EterationArray[i]);
                    }

                    if (EterationArray[i].OutPut1 == "3" && EterationArray[i].TestPass_ID == testPassId) {
                        itArray3.push(EterationArray[i]);
                    }
                }

                if (itArray1 != undefined && itArray1.length > 0) {
                    var lenthOfArr = itArray1.length;
                    var finalArr = {};
                    for (var j = 0; j < lenthOfArr; j++) {
                        if (itArray1[j].hasOwnProperty("Ts_NotCompleted")) {
                            var TsNcCount = parseInt(itArray1[j].Ts_NotCompleted == null ? 0 : itArray1[j].Ts_NotCompleted)
                            TsNcCount += parseInt(itArray1[j].Ts_Pending == null ? 0 : itArray1[j].Ts_Pending);
                        }
                        if (itArray1[j].hasOwnProperty("TestPass_ID")) { testPassId = itArray1[j].TestPass_ID.toString() }
                        if (itArray1[j].hasOwnProperty("Project_Id")) { finalArr['projectId'] = itArray1[j].Project_Id.toString() }
                        if (itArray1[j].hasOwnProperty("Lead")) { finalArr['versionLead'] = itArray1[j].Lead }
                        if (itArray1[j].hasOwnProperty("TestPass_ID")) { finalArr['testpassId'] = itArray1[j].TestPass_ID.toString() }
                        if (itArray1[j].hasOwnProperty("TestPass_Name")) { finalArr['testpassName'] = itArray1[j].TestPass_Name }
                        if (itArray1[j].hasOwnProperty("TpStartDate")) { finalArr['tpStartDate'] = itArray1[j].TpStartDate == null ? "" : itArray1[j].TpStartDate }
                        if (itArray1[j].hasOwnProperty("TpEndDate")) { finalArr['tpEndDate'] = itArray1[j].TpEndDate == null ? "" : itArray1[j].TpEndDate }
                        if (itArray1[j].hasOwnProperty("TestManager")) { finalArr['testManager'] = itArray1[j].TestManager }
                        if (itArray1[j].hasOwnProperty("TestPass_Description")) { finalArr['testPassDescription'] = itArray1[j].TestPass_Description == null ? "" : itArray1[j].TestPass_Description }
                        if (itArray1[j].hasOwnProperty("TotalTestCase")) { finalArr['totalTestCaseCount'] = itArray1[j].TotalTestCase.toString() }
                        if (itArray1[j].hasOwnProperty("TotalTestSteps")) { finalArr['totalTestStepCount'] = itArray1[j].TotalTestSteps.toString() }
                        if (itArray1[j].hasOwnProperty("TotalTester")) { finalArr['totalTesterCount'] = itArray1[j].TotalTester }
                        if (itArray1[j].hasOwnProperty("Ts_Pass")) { finalArr['testStepPassCount'] = itArray1[j].Ts_Pass.toString() }
                        if (itArray1[j].hasOwnProperty("Ts_Fail")) { finalArr['testStepFailcount'] = itArray1[j].Ts_Fail.toString() }
                        finalArr['testStepNtCompletedCount'] = TsNcCount.toString();



                        if (itArray2 != undefined && itArray2.length > 0) {
                            finalArr['listTesterData'] = [];
                            for (var k = 0; k < itArray2.length; k++) {
                               
                                var TesterDataForDetailAnalysis = {};

                                var NCcount = (!itArray2[k].hasOwnProperty("Te_NotCompleted")) ? 0 : parseInt(itArray2[k].Te_NotCompleted)
                                var Pendingcount = (!itArray2[k].hasOwnProperty("Te_Pending")) ? 0 : parseInt(itArray2[k].Te_Pending)
                                var NCTotal = NCcount + Pendingcount;

                                TesterDataForDetailAnalysis['testerId'] = (!itArray2[k].hasOwnProperty("TesterSpUserID")) ? "" : itArray2[k].TesterSpUserID.toString(),
                                TesterDataForDetailAnalysis['testerName'] = (!itArray2[k].hasOwnProperty("Tester")) ? "" : itArray2[k].Tester == null ? "" : itArray2[k].Tester,
                                TesterDataForDetailAnalysis['testerArea'] = (!itArray2[k].hasOwnProperty("Area_Name")) ? "" : itArray2[k].Area_Name == null ? "" : itArray2[k].Area_Name,
                                TesterDataForDetailAnalysis['testerPassCount'] = (!itArray2[k].hasOwnProperty("Te_Pass")) ? "" : itArray2[k].Te_Pass.toString(),
                                TesterDataForDetailAnalysis['testerFailcount'] = (!itArray2[k].hasOwnProperty("Te_Fail")) ? "" : itArray2[k].Te_Fail.toString(),
                                TesterDataForDetailAnalysis['testerNtCompletedCount'] = NCTotal.toString();


                                finalArr['listTesterData'].push(TesterDataForDetailAnalysis);
                            }
                        }
                        var testCasePassCount = 0; var testCaseFailCount = 0; var testCaseNcCount = 0;
                        if (itArray3 != undefined && itArray3.length > 0) {
                            for (var l = 0; l < itArray3.length; l++) {

                                var TCStatus = (!itArray3[l].hasOwnProperty("TCStatus")) ? "" : itArray3[l].TCStatus
                                switch (TCStatus.toString()) {
                                    case "Pass":
                                        testCasePassCount++;
                                        break;
                                    case "Fail":
                                        testCaseFailCount++;
                                        break;
                                    case "NC":
                                        testCaseNcCount++;
                                        break;
                                }

                            }
                            finalArr['testCasePassCount'] = testCasePassCount.toString();
                            finalArr['testCaseFailcount'] = testCaseFailCount.toString();
                            finalArr['testCaseNtCompletedCount'] = testCaseNcCount.toString();
                        }
                    }

                    finalAnlysisArray.push(finalArr);
                }




            }
            /***END***/







            Analysis.countItems = [];
            Analysis.countItems = finalAnlysisArray;

            //[!] END




            if ((Analysis.countItems != undefined) && (Analysis.countItems != null) && (Analysis.countItems.length > 0)) {
                Analysis.testCaseFailcount = parseInt(Analysis.countItems[0].testCaseFailcount); //added by Mangesh
                Analysis.testCasePassCount = parseInt(Analysis.countItems[0].testCasePassCount); //added by Mangesh
                Analysis.testCaseNtCompletedCount = parseInt(Analysis.countItems[0].testCaseNtCompletedCount); //added by Mangesh
                Analysis.testStepFailcount = parseInt(Analysis.countItems[0].testStepFailcount); //added by Mangesh
                Analysis.testStepPassCount = parseInt(Analysis.countItems[0].testStepPassCount); //added by Mangesh
                Analysis.testStepNtCompletedCount = parseInt(Analysis.countItems[0].testStepNtCompletedCount); //added by Mangesh
                Analysis.totalTestStepCount = parseInt(Analysis.countItems[0].totalTestStepCount); //added by Mangesh
                Analysis.totalTestCaseCount = parseInt(Analysis.countItems[0].totalTestCaseCount); //added by Mangesh
                Analysis.totalTesterCount = parseInt(Analysis.countItems[0].totalTesterCount); //added by Mangesh


                // $('#totTester').html(Analysis.totalTesterCount);	


            }
        }





    },

    // Function to fill Test Pass Drop down  
    fillTestPassDD: function (projectID) {
        $('#testPassDD').empty();

        var tempTestPassArr = new Array();
        var passItems = Analysis.getTestPassIdByProjectId[projectID]; // added by Mangesh         

        if ((passItems != undefined) && (passItems != null)) {
            var pass = '';
            var dTemp = '';
            for (var x = 0; x < passItems.length; x++) {

                if ($.inArray(passItems[x].testpassName, tempTestPassArr) == -1) {
                    tempTestPassArr.push(passItems[x].testpassName);
                    pass = passItems[x].testpassName;
                    pass = (pass == null || pass == undefined) ? '-' : pass;
                    // dTemp = '<option value="'+passItems[x]['ID']+'">'+pass+'</option>'; 
                    dTemp = '<option value="' + passItems[x].testpassId + '" title="' + pass + '">' + trimText(pass.toString(), 29) + '</option>'; //added by shilpa to solve bug 3378		              				              		
                    $('#testPassDD').append(dTemp);

                    if (passItems[x].testpassId == Analysis.tpid) {
                        //document.getElementById('testPassDD').options[x].selected = true;
                        $('#testPassDD option[value="' + passItems[x].testpassId + '"]').selected = true;
                    }

                    //Added by HRW for optimization
                    var due = passItems[x].tpEndDate;
                    var d = due.split(" ");
                    due = d[0];

                    // var crd =  due.slice(0,10);
                    //var dd = crd.split('-');
                    //due = dd[1]+'-'+dd[2]+'-'+dd[0];
                    var testManagerName = passItems[x].testManager;
                    if (Analysis.TMNameDueDateForTPID[passItems[x].testpassId] == undefined)
                        Analysis.TMNameDueDateForTPID[passItems[x].testpassId] = testManagerName + "~" + due;
                }
            }
        }
        else {
            //$('#testPassDD').html('<option>No Test Pass Available</option>');
            $('#testPassDD').html('<option>No ' + Analysis.rstestPass + ' Available</option>');//added by Mohini for resource file
        }
        Analysis.fillTab();
    },

    //Added by HRW for optimization

    testerListItemsOfSelectedTestPass: new Array(),
    role: new Array(),

    //fill tester dropdown
    fillTesterDD: function () {

        Analysis.getUniqueTesters = []; //reset the array

        var testerArr = new Array();

        Analysis.testerListItemsOfSelectedTestPass = Analysis.getTesterIdByTestpassId[$('#testPassDD option:selected').val()];

        if ((Analysis.testerListItemsOfSelectedTestPass != null) && (Analysis.testerListItemsOfSelectedTestPass != undefined)) {
            var index = 0;
            $('#testerDD').empty();
            var obj = new Option();
            document.getElementById('testerDD').options[index] = obj;
            document.getElementById('testerDD').options[index].text = "All " + Analysis.rsTester + "s";//Added by mohini for resource file
            document.getElementById('testerDD').options[index].value = "0";

            $("#roleDD").empty();//:SD
            $("#roleDD").append('<option value="0">All ' + Analysis.rsRole + '</option>');//:SD

            if (Analysis.RoleNameForRoleID != undefined)
                Analysis.RoleNameForRoleID.splice(0, Analysis.RoleNameForRoleID.length);//:SD
            if (Analysis.RolesForSPUserID != undefined)
                Analysis.RolesForSPUserID.splice(0, Analysis.RolesForSPUserID.length);//:SD*/

            var roleIDs = new Array();//:SD
            for (var i = 0; i < Analysis.testerListItemsOfSelectedTestPass.length; i++) {
                //:SD
                if (Analysis.RolesForSPUserID[Analysis.testerListItemsOfSelectedTestPass[i].testerId] == undefined)
                    Analysis.RolesForSPUserID[Analysis.testerListItemsOfSelectedTestPass[i].testerId] = parseInt(Analysis.testerListItemsOfSelectedTestPass[i].roleId);
                else
                    Analysis.RolesForSPUserID[Analysis.testerListItemsOfSelectedTestPass[i].testerName] += "," + parseInt(Analysis.testerListItemsOfSelectedTestPass[i].roleId);

                //To collect RoleIDs of testers:SD
                if ($.inArray(Analysis.testerListItemsOfSelectedTestPass[i].roleId, roleIDs) == -1) {
                    roleIDs.push(Analysis.testerListItemsOfSelectedTestPass[i].roleId);
                    if (parseInt(Analysis.testerListItemsOfSelectedTestPass[i].roleId) == 1) {
                        temp = '<option title="Standard" value="1">Standard</option>';
                        $("#roleDD").append(temp);
                        Analysis.RoleNameForRoleID[parseInt(Analysis.testerListItemsOfSelectedTestPass[i].roleId)] = "Standard";
                    }
                    else {
                        temp = '<option title="' + Analysis.testerListItemsOfSelectedTestPass[i].roleName + '" value="' + parseInt(Analysis.testerListItemsOfSelectedTestPass[i].roleId) + '">' + trimText(Analysis.testerListItemsOfSelectedTestPass[i].roleName, 16) + '</option>';
                        $("#roleDD").append(temp);
                    }
                }

                Analysis.role.push(parseInt(Analysis.testerListItemsOfSelectedTestPass[i].roleId));//?
                if ($.inArray(Analysis.testerListItemsOfSelectedTestPass[i].testerName, testerArr) == -1) {
                    index++;
                    var obj = new Option();
                    document.getElementById('testerDD').options[index] = obj;
                    document.getElementById('testerDD').options[index].text = trimText(Analysis.testerListItemsOfSelectedTestPass[i].testerName.toString(), 29); //added by shilpa to solve bug 3378
                    document.getElementById('testerDD').options[index].title = Analysis.testerListItemsOfSelectedTestPass[i].testerName; //
                    document.getElementById('testerDD').options[index].value = Analysis.testerListItemsOfSelectedTestPass[i].testerId;

                    testerArr.push(Analysis.testerListItemsOfSelectedTestPass[i].testerName);
                    Analysis.getUniqueTesters.push({ "testerName": Analysis.testerListItemsOfSelectedTestPass[i].testerName });
                }
            }

            var tempRoles = new Array();
            Analysis.RoleItems = Analysis.getRoleIdByTesterId[$("#versionDD option:selected").val() + "-" + $("#testPassDD option:selected").val() + "-" + $("#testerDD option:selected").val()];

            if (Analysis.RoleItems != null && Analysis.RoleItems != undefined) {
                for (var j = 0; j < Analysis.RoleItems.length; j++) {
                    if ($.inArray(Analysis.RoleItems[j].roleId, tempRoles) == -1) {
                        tempRoles.push(Analysis.RoleItems[j].roleId);
                        temp = '<option title="' + Analysis.RoleItems[j].roleName + '" value="' + parseInt(Analysis.RoleItems[j].roleId) + '">' + trimText(Analysis.RoleItems[j].roleName, 16) + '</option>';
                        $("#roleDD").append(temp);

                        Analysis.RoleNameForRoleID[parseInt(Analysis.RoleItems[j].roleId)] = Analysis.RoleItems[j].roleName;
                    }
                }
            }
        }
        else {
            $('#testerDD').empty();
            //$('#testerDD').html('<option>No Tester Alloted</option>');
            $('#testerDD').html('<option>No ' + Analysis.rsTester + ' Alloted</option>');//Added by Mohini for resource file 
            document.getElementById('testerDD').options[0].value = "0";
            $("#roleDD").empty();//:SD
            $("#roleDD").append('<option value="0">No ' + Analysis.rsRole + '</option>');//:SD
        }
        $('#totTester').html(testerArr.length);    //Total testers in drop down show this only

    },

    //fill details table
    fillTab: function () {
        $('#testMgr').text('');
        $('#projMrg').text('');
        $('#dueDat').text('');
        if (Analysis.leadNameForProjectID[$('#versionDD option:selected').val()] != undefined)    //take value of versionDD instead
        {
            $('#projMrg').text(trimText(Analysis.leadNameForProjectID[$('#dd option:selected').val()], 26));
            $('#projMrg').attr('title', Analysis.leadNameForProjectID[$('#dd option:selected').val()]);
        }
        else {
            $('#projMrg').text("-");
            $('#projMrg').attr('title', '');
        }

        if (Analysis.TMNameDueDateForTPID[$('#testPassDD').val()] != undefined) {
            $('#testMgr').text(trimText(Analysis.TMNameDueDateForTPID[$('#testPassDD').val()].split("~")[0], 26));
            $('#testMgr').attr('title', Analysis.TMNameDueDateForTPID[$('#testPassDD').val()].split("~")[0]);
            $('#dueDat').text(Analysis.TMNameDueDateForTPID[$('#testPassDD').val()].split("~")[1]);
        }
        else {
            $('#testMgr').text('-');
            $('#testMgr').attr('title', '');
            $('#dueDat').text('-');
        }
    },

    ///////////////////////Count calculation used in gauge etc////////////////////////
    calc: function (testPassID, bool) {

        //Added by HRW for optimization
        if (Analysis.role != undefined)
            role = Analysis.role;

        //For all tester and all role
        var totalTestCasePassedAll = 0;
        var totalTestCaseFailedAll = 0;
        var totalTestCaseNCAll = 0;
        var totalTestStepPassedAll = 0;
        var totalTestStepFailedAll = 0;
        var totalTestStepNCAll = 0;
        var totalTestSteps = 0;
        var totalTestCase = 0;

        //For single tester all role
        var totalTestCasePassedTesterAllRole = 0;
        var totalTestCaseFailedTesterAllRole = 0;
        var totalTestCaseNCTesterAllRole = 0;
        var totalTestStepPassedTesterAllRole = 0;
        var totalTestStepFailedTesterAllRole = 0;
        var totalTestStepNCTesterAllRole = 0;
        var totalTestStepsTesterAllRole = 0;
        var totalTestCaseTesterAllRole = 0;

        //For single tester single role
        var totalTestCasePassedTesterRole = 0;
        var totalTestCaseFailedTesterRole = 0;
        var totalTestCaseNCTesterRole = 0;
        var totalTestStepPassedTesterRole = 0;
        var totalTestStepFailedTesterRole = 0;
        var totalTestStepNCTesterRole = 0;
        var totalTestStepsTesterRole = 0;
        var totalTestCaseTesterRole = 0;

        //For All tester single role
        var totalTestCasePassedAllTesterRole = 0;
        var totalTestCaseFailedAllTesterRole = 0;
        var totalTestCaseNCAllTesterRole = 0;
        var totalTestStepPassedAllTesterRole = 0;
        var totalTestStepFailedAllTesterRole = 0;
        var totalTestStepNCAllTesterRole = 0;
        var totalTestStepsAllTesterRole = 0;
        var totalTestCaseAllTesterRole = 0;


        var dataCount = new Array();

        if ($("#testerDD").val() == '0') {
            if ($("#roleDD").val() == '0') {

                totalTestCaseNCAll = Analysis.testCaseNtCompletedCount;
                totalTestCaseFailedAll = Analysis.testCaseFailcount;
                totalTestCasePassedAll = Analysis.testCasePassCount;
                totalTestCase = Analysis.totalTestCaseCount;

                totalTestStepNCAll = Analysis.testStepNtCompletedCount;
                totalTestStepFailedAll = Analysis.testStepFailcount;
                totalTestStepPassedAll = Analysis.testStepPassCount;
                totalTestSteps = Analysis.totalTestStepCount;

                dataCount.push(totalTestStepPassedAll);
                dataCount.push(totalTestStepFailedAll);
                dataCount.push(totalTestStepNCAll);

                $("#totTestCase").text(totalTestCase);
                $("#totTeSt").text(totalTestSteps);

                $('#divPassTCCount').text(Analysis.rsTestCase + 's Passed:' + totalTestCasePassedAll);
                $('#divFailTCCount').text(Analysis.rsTestCase + 's Failed:' + totalTestCaseFailedAll);
                $('#divNCTCCount').text(Analysis.rsTestCase + 's NC:' + totalTestCaseNCAll);

                return dataCount;
            }
            else {
                totalTestCaseNCAllTesterRole = Analysis.testCaseNtCompletedCount;
                totalTestCaseFailedAllTesterRole = Analysis.testCaseFailcount;
                totalTestCasePassedAllTesterRole = Analysis.testCasePassCount;
                totalTestCaseAllTesterRole = Analysis.totalTestCaseCount;

                totalTestStepNCAllTesterRole = Analysis.testStepNtCompletedCount;
                totalTestStepFailedAllTesterRole = Analysis.testStepFailcount;
                totalTestStepPassedAllTesterRole = Analysis.testStepPassCount;
                totalTestStepsAllTesterRole = Analysis.totalTestStepCount;

                dataCount.push(totalTestStepPassedAllTesterRole);
                dataCount.push(totalTestStepFailedAllTesterRole);
                dataCount.push(totalTestStepNCAllTesterRole);

                $("#totTestCase").text(totalTestCaseAllTesterRole);
                $("#totTeSt").text(totalTestStepsAllTesterRole);

                $('#divPassTCCount').text(Analysis.rsTestCase + 's Passed:' + totalTestCasePassedAllTesterRole);
                $('#divFailTCCount').text(Analysis.rsTestCase + 's Failed:' + totalTestCaseFailedAllTesterRole);
                $('#divNCTCCount').text(Analysis.rsTestCase + 's NC:' + totalTestCaseNCAllTesterRole);

                return dataCount;
            }
        }
        else {
            if ($("#roleDD").val() == '0') {

                totalTestCaseNCTesterAllRole = Analysis.testCaseNtCompletedCount;
                totalTestCaseFailedTesterAllRole = Analysis.testCaseFailcount;
                totalTestCasePassedTesterAllRole = Analysis.testCasePassCount;
                totalTestCaseTesterAllRole = Analysis.totalTestCaseCount;

                totalTestStepNCTesterAllRole = Analysis.testStepNtCompletedCount;
                totalTestStepFailedTesterAllRole = Analysis.testStepFailcount;
                totalTestStepPassedTesterAllRole = Analysis.testStepPassCount;
                totalTestStepsTesterAllRole = Analysis.totalTestStepCount;

                $("#snglTester2").text(totalTestCaseTesterAllRole);
                $("#snglTester").text(totalTestStepsTesterAllRole);

                $('#divPassTCCount').text(Analysis.rsTestCase + 's Passed:' + totalTestCasePassedTesterAllRole);
                $('#divFailTCCount').text(Analysis.rsTestCase + 's Failed:' + totalTestCaseFailedTesterAllRole);
                $('#divNCTCCount').text(Analysis.rsTestCase + 's NC:' + totalTestCaseNCTesterAllRole);

                dataCount.push(totalTestStepPassedTesterAllRole);
                dataCount.push(totalTestStepFailedTesterAllRole);
                dataCount.push(totalTestStepNCTesterAllRole);

                return dataCount;
            }
            else {
                totalTestCaseNCTesterRole = Analysis.testCaseNtCompletedCount;
                totalTestCaseFailedTesterRole = Analysis.testCaseFailcount;
                totalTestCasePassedTesterRole = Analysis.testCasePassCount;
                totalTestCaseTesterRole = Analysis.totalTestCaseCount;

                totalTestStepNCTesterRole = Analysis.testStepNtCompletedCount;
                totalTestStepFailedTesterRole = Analysis.testStepFailcount;
                totalTestStepPassedTesterRole = Analysis.testStepPassCount;
                totalTestStepsTesterRole = Analysis.totalTestStepCount;

                $("#snglTester2").text(totalTestCaseTesterRole);
                $("#snglTester").text(totalTestStepsTesterRole);

                $('#divPassTCCount').text(Analysis.rsTestCase + 's Passed:' + totalTestCasePassedTesterRole);
                $('#divFailTCCount').text(Analysis.rsTestCase + 's Failed:' + totalTestCaseFailedTesterRole);
                $('#divNCTCCount').text(Analysis.rsTestCase + 's NC:' + totalTestCaseNCTesterRole);

                dataCount.push(totalTestStepPassedTesterRole);
                dataCount.push(totalTestStepFailedTesterRole);
                dataCount.push(totalTestStepNCTesterRole);

                return dataCount;
            }
        }

    },

    //drawVisualizationGauge:function(stat) {
    drawVisualizationGauge: function () {
        // Create and populate the data table for Pass Test Cases.

        var su = 0;
        var row = document.getElementById("hideRow");

        var stat = Analysis.calc($('#testPassDD option:selected').val(), 1);    //calc method used for gauge related count calculations

        su = stat[0] + stat[1] + stat[2];

        document.getElementById('testerDD').options[0].value = "0";

        if ($("#testerDD").val() == '0') {
            if (row.style.display == '') {
                row.style.display = 'none';
                $("#snglTester").hide();
                $("#hideRow2").css('display', 'none');
                $("#snglTester2").hide();
            }
        }
        if ($("#testerDD").val() != '0') {
            if (row.style.display == 'none') {
                row.style.display = '';
                $("#snglTester").show();
                $("#hideRow2").css('display', '');
                $("#snglTester2").show();
            }
        }

        var perPass = (stat[0] == 0) ? 0 : parseInt(((stat[0] / su) * 100).toFixed(0));
        var perFail = (stat[1] == 0) ? 0 : parseInt(((stat[1] / su) * 100).toFixed(0));
        var perNC = (stat[2] == 0) ? 0 : parseInt(((stat[2] / su) * 100).toFixed(0));

        //code added on 16 March by sheetal to validate total value not exceed 100 and are not less than 100//
        var flagPassRounded = false;
        var flagFailRounded = false;
        var flagNCRounded = false;
        var temp1, temp2, temp3;

        temp1 = ((stat[0] / su) * 100).toFixed(0);
        if (((stat[0] / su) * 100) != temp1)
            flagPassRounded = true;

        temp2 = ((stat[1] / su) * 100).toFixed(0);
        if (((stat[1] / su) * 100) != temp2)
            flagFailRounded = true;


        temp3 = ((stat[2] / su) * 100).toFixed(0);
        if (((stat[2] / su) * 100) != temp3)
            flagNCRounded = true;

        if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) > 100) {
            if (flagPassRounded)
                perPass = Math.floor((stat[0] / su) * 100);
            else if (flagFailRounded)
                perFail = Math.floor((stat[1] / su) * 100);
            else if (flagNCRounded)
                perNC = Math.floor((stat[2] / su) * 100);
        }
        else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) < 100) {
            if (flagPassRounded)
                perPass = Math.ceil((stat[0] / su) * 100);
            else if (flagFailRounded)
                perFail = Math.ceil((stat[1] / su) * 100);
            else if (flagNCRounded)
                perNC = Math.ceil((stat[2] / su) * 100);
        }


        //Resource file changes:SD
        $('#divPassCount').text(Analysis.rsTestStep + 's Passed:' + stat[0]);
        $('#divFailCount').text(Analysis.rsTestStep + 's Failed:' + stat[1]);
        $('#divNCCount').text(Analysis.rsTestStep + 's NC:' + stat[2]);


        ////////////////////////////////////////////////////////   Added by HRW      //////////////////////////////////////////////////////////////////////////////////////////

        var dataPass = new google.visualization.DataTable();
        dataPass.addColumn('string', 'Label');
        dataPass.addColumn('number', 'Value');
        dataPass.addRows(1);
        dataPass.setValue(0, 0, 'Pass(%)');
        dataPass.setValue(0, 1, Number(perPass));

        // Create and draw the visualization for Passed Test Cases.
        var optPass = { greenFrom: 0, greenTo: Number(perPass), width: 133, height: 130 };

        var otp = new google.visualization.Gauge(document.getElementById('visualizationPass'));
        otp.draw(dataPass, optPass);

        // Create and populate the data table for Failed Test Cases.
        var dataFail = new google.visualization.DataTable();
        dataFail.addColumn('string', 'Label');
        dataFail.addColumn('number', 'Value');
        dataFail.addRows(1);
        dataFail.setValue(0, 0, 'Fail(%)');
        dataFail.setValue(0, 1, Number(perFail));

        // Create and draw the visualization for Failed Test Cases.
        var optFail = { redFrom: 0, redTo: Number(perFail), width: 133, height: 130 };
        var otf = new google.visualization.Gauge(document.getElementById('visualizationFail'));
        otf.draw(dataFail, optFail);

        // Create and populate the data table for Failed Test Cases.
        var dataNC = new google.visualization.DataTable();
        dataNC.addColumn('string', 'Label');
        dataNC.addColumn('number', 'Value');
        dataNC.addRows(1);
        dataNC.setValue(0, 0, 'Not Completed(%)');
        dataNC.setValue(0, 1, Number(perNC));

        // Create and draw the visualization for Not Completed Test Cases.

        var optNC = { yellowFrom: 0, yellowTo: Number(perNC), width: 133, height: 130 };

        var otnc = new google.visualization.Gauge(document.getElementById('visualizationNC'));
        otnc.draw(dataNC, optNC);

        if (Analysis.pageLoad == 0) {
            Analysis.pageLoad = 1;
            if ($("#totTestCase").text() == "0" || $("#totTeSt").text() == "0") {
                $('#barChart').gchart('destroy');
                $('#barChart').html('');
                $('#dvtesterDetail').html('');
                $("#Pagination").hide();
                if ($("#totTestCase").text() == "0") {
                    //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>No Test Case is Available for the Tester(s)</h3>");
                    $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">No ' + Analysis.rsTestCase + ' is Available for the ' + Analysis.rsTester + '(s)</h3>');//added by Mohini for resource file
                }
                else {
                    //$(".proj-desc h1").html("Tester Detail(s)<br/><h3 style='color:#f60;font-size:14px;font-weight:bold;'>No Test Step is Available for the Tester(s)</h3>");
                    $(".proj-desc h1").html(Analysis.rsTester + ' Detail(s)<br/><h3 class="h3DbDa">No ' + Analysis.rsTestStep + ' is Available for the ' + Analysis.rsTester + '(s)</h3>');//added by Mohini for resource file
                }
            }
        }
        else
            Analysis.pageLoad = 1;
    },

    setRandomValue: function (gauge, range, val) {
        gauge.setValueAnimated(val);
    },

    drawVisualizationChart: function (testPassID) {
        var testerArr = new Array();
        var charData = new Array();

        var labelSeries = new Array();
        var passSeries = new Array();
        var failSeries = new Array();
        var ncSeries = new Array();

        var passSeries1 = new Array();
        var failSeries1 = new Array();
        var ncSeries1 = new Array();

        var testerDone = new Array();

        var tot = 0;

        if ($("#testerDD").val() == '0') {
            var StartRange = 30;
            Analysis.gTesterArr = new Array();
            var arr = new Array();
            for (var i = 0; i < Analysis.countItems.length; i++)    //retrieving data from second response in CountItems
            {
                if (Analysis.countItems[i].testpassId == $("#testPassDD").val()) {
                    arr = Analysis.countItems[i].listTesterData;
                    break;
                }

            }


            for (var i = 0; i < arr.length; i++) {
                var testerName = arr[i].testerName;
                var passcnt = 0;
                var failcnt = 0;
                var notcompletecnt = 0;
                if (testerName.indexOf('\\') != -1) {
                    labelSeries.push(Analysis.trimText(testerName.split('\\')[1], 6));
                    Analysis.gTesterArr.push({
                        "Tester": testerName.split('\\')[1],
                        "Range": StartRange
                    });
                }
                else {
                    labelSeries.push(Analysis.trimText(testerName, 6));
                    Analysis.gTesterArr.push({
                        "Tester": testerName,
                        "Range": StartRange
                    });

                }
                StartRange += 55;

                testerDone.push({ "testerName": testerName });

                var statusArr = new Array();

                //var stat=Analysis.calc($('#testPassDD option:selected').val(),1);

                passcnt = parseInt(arr[i].testerPassCount);
                failcnt = parseInt(arr[i].testerFailcount);
                notcompletecnt = parseInt(arr[i].testerNtCompletedCount);

                var tot = passcnt + failcnt + notcompletecnt;

                var perPass = (passcnt == 0) ? 0 : parseInt(((passcnt / tot) * 100).toFixed(0));
                var perFail = (failcnt == 0) ? 0 : parseInt(((failcnt / tot) * 100).toFixed(0));
                var perNC = (notcompletecnt == 0) ? 0 : parseInt(((notcompletecnt / tot) * 100).toFixed(0));

                //code added on 16 March by sheetal to validate total value not exceed 100 and are not less than 100//
                var flagPassRounded = false;
                var flagFailRounded = false;
                var flagNCRounded = false;
                var temp1, temp2, temp3;

                temp1 = ((passcnt / tot) * 100).toFixed(0);
                if (((passcnt / tot) * 100) != temp1)
                    flagPassRounded = true;

                temp2 = ((failcnt / tot) * 100).toFixed(0);
                if (((failcnt / tot) * 100) != temp2)
                    flagFailRounded = true;


                temp3 = ((notcompletecnt / tot) * 100).toFixed(0);
                if (((notcompletecnt / tot) * 100) != temp3)
                    flagNCRounded = true;

                if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) > 100) {
                    if (flagPassRounded)
                        perPass = Math.floor((passcnt / tot) * 100);
                    else if (flagFailRounded)
                        perFail = Math.floor((failcnt / tot) * 100);
                    else if (flagNCRounded)
                        perNC = Math.floor((notcompletecnt / tot) * 100);
                }
                else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) < 100) {
                    if (flagPassRounded)
                        perPass = Math.ceil((passcnt / tot) * 100);
                    else if (flagFailRounded)
                        perFail = Math.ceil((failcnt / tot) * 100);
                    else if (flagNCRounded)
                        perNC = Math.ceil((notcompletecnt / tot) * 100);
                }

                ////////////////////////////////////////

                passSeries.push(perPass);
                failSeries.push(perFail);
                ncSeries.push(perNC);

                passSeries1.push(passcnt);
                failSeries1.push(failcnt);
                ncSeries1.push(notcompletecnt);

                statusArr.push(passcnt);
                statusArr.push(failcnt);
                statusArr.push(notcompletecnt);

                if (statusArr != null || statusArr != undefined) {
                    charData.push(statusArr);
                }
                else {
                    charData.push(new Array(0, 0, 100));
                }

            }



            //////////////To set the blank bar chart values///////////////
            var TesterDonne = new Array();
            for (var j = 0; j < testerDone.length; j++) {
                TesterDonne.push(testerDone[j].testerName);
            }

            var UniqueTesters = Analysis.getUniqueTesters;

            var ShowBlankValues = new Array();
            for (var i = 0; i < UniqueTesters.length; i++) {
                if ($.inArray(UniqueTesters[i].testerName, TesterDonne) == -1) {
                    ShowBlankValues.push({ "testerName": UniqueTesters[i].testerName });

                }

            }

            for (var i = 0; i < ShowBlankValues.length; i++) {
                var statusArr = new Array();

                var passcnt = 0;
                var failcnt = 0;
                var notcompletecnt = 0;
                if (ShowBlankValues[i].testerName.indexOf('\\') != -1) {
                    labelSeries.push(Analysis.trimText(ShowBlankValues[i].testerName.split('\\')[1], 6));
                    Analysis.gTesterArr.push({
                        "Tester": ShowBlankValues[i].testerName.split('\\')[1],
                        "Range": StartRange
                    });
                }
                else {
                    labelSeries.push(Analysis.trimText(ShowBlankValues[i].testerName, 6));
                    Analysis.gTesterArr.push({
                        "Tester": ShowBlankValues[i].testerName,
                        "Range": StartRange
                    });

                }
                StartRange += 55;

                passSeries.push(0);
                failSeries.push(0);
                ncSeries.push(0);

                passSeries1.push(passcnt);
                failSeries1.push(failcnt);
                ncSeries1.push(notcompletecnt);

                statusArr.push(passcnt);
                statusArr.push(failcnt);
                statusArr.push(notcompletecnt);

                if (statusArr != null || statusArr != undefined) {
                    charData.push(statusArr);
                }
                else {
                    charData.push(new Array(0, 0, 100));
                }

            }

            //////////////////End of blank chart values filling		  			    				    		
        }

        else {
            var testerName = $("#testerDD :selected").attr('title');
            if (testerName.indexOf('\\') != -1) {
                labelSeries.push(Analysis.trimText(testerName.split('\\')[1], 6));
                Analysis.gTesterArr.push({
                    "Tester": testerName.split('\\')[1],
                    "Range": 30
                });
            }
            else {
                labelSeries.push(Analysis.trimText(testerName, 6));
                Analysis.gTesterArr.push({
                    "Tester": testerName,
                    "Range": 30
                });

            }

            if ($("#testerDD :selected").val() != undefined) {
                var passcnt = 0;
                var failcnt = 0;
                var notcompletecnt = 0;

                var statusArr = new Array();

                var stat = Analysis.calc($('#testPassDD option:selected').val(), 1);

                passcnt = stat[0];
                failcnt = stat[1];
                notcompletecnt = stat[2];

                var tot = passcnt + failcnt + notcompletecnt;
                var perPass = (passcnt == 0) ? 0 : parseInt(((passcnt / tot) * 100).toFixed(0));
                var perFail = (failcnt == 0) ? 0 : parseInt(((failcnt / tot) * 100).toFixed(0));
                var perNC = (notcompletecnt == 0) ? 0 : parseInt(((notcompletecnt / tot) * 100).toFixed(0));

                var perPass1 = (passcnt == 0) ? 0 : parseInt(((passcnt / tot) * 100).toFixed(0));
                var perFail1 = (failcnt == 0) ? 0 : parseInt(((failcnt / tot) * 100).toFixed(0));
                var perNC1 = (notcompletecnt == 0) ? 0 : parseInt(((notcompletecnt / tot) * 100).toFixed(0));

                //code added on 16 March by sheetal to validate total value not exceed 100 and are not less than 100//
                var flagPassRounded = false;
                var flagFailRounded = false;
                var flagNCRounded = false;
                var temp1, temp2, temp3;

                temp1 = ((passcnt / tot) * 100).toFixed(0);
                if (((passcnt / tot) * 100) != temp1)
                    flagPassRounded = true;

                temp2 = ((failcnt / tot) * 100).toFixed(0);
                if (((failcnt / tot) * 100) != temp2)
                    flagFailRounded = true;


                temp3 = ((notcompletecnt / tot) * 100).toFixed(0);
                if (((notcompletecnt / tot) * 100) != temp3)
                    flagNCRounded = true;

                if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) > 100) {
                    if (flagPassRounded)
                        perPass = Math.floor((passcnt / tot) * 100);
                    else if (flagFailRounded)
                        perFail = Math.floor((failcnt / tot) * 100);
                    else if (flagNCRounded)
                        perNC = Math.floor((notcompletecnt / tot) * 100);
                }
                else if (parseInt(temp1) + parseInt(temp2) + parseInt(temp3) < 100) {
                    if (flagPassRounded)
                        perPass = Math.ceil((passcnt / tot) * 100);
                    else if (flagFailRounded)
                        perFail = Math.ceil((failcnt / tot) * 100);
                    else if (flagNCRounded)
                        perNC = Math.ceil((notcompletecnt / tot) * 100);
                }

                ////////////////////////////////////////

                passSeries.push(perPass);
                failSeries.push(perFail);
                ncSeries.push(perNC);

                passSeries1.push(passcnt);
                failSeries1.push(failcnt);
                ncSeries1.push(notcompletecnt);

                statusArr.push(passcnt);
                statusArr.push(failcnt);
                statusArr.push(notcompletecnt);
            }
            if (statusArr != null || statusArr != undefined) {
                charData.push(statusArr);
            }
            else {
                charData.push(new Array(0, 0, 100));
            }

        }

        $('#barChart').gchart('destroy');

        var merge = labelSeries + "~" + passSeries + "~" + failSeries + "~" + ncSeries;
        return merge;

    },// End drawVisualizationChart

    ExportExcel: function () {
        var pid = $("#versionDD option:selected").val();

        if ($("#testPassDD option:selected").val() == "No Test Pass Available") {
            tpid = null;
        }
        else {
            tpid = $("#testPassDD option:selected").val();
        }

        //ServiceLayer.GenerateReport("ExportDetailAnalysis", pid + "/" + tpid);
        var testerResult = ServiceLayer.GetData("ExportDetailAnalysis" + "/" + pid + "/" + tpid, null, "Dashboard");
        
        var getAnalysisResult = testerResult;

        if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else
        {
            Main.showLoading();
            var stat = 0;
            try
            {
                var xlApp = new ActiveXObject("Excel.Application");
                stat = 1;
            }
            catch(ex)
            {
                Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
            }
            if(stat == 0)
            {
                Main.hideLoading();
                return;
            }
            try
            {
                xlApp.DisplayAlerts = false;
                var xlBook = xlApp.Workbooks.Add();
                xlBook.worksheets("Sheet1").activate;
                var XlSheet = xlBook.activeSheet;
                XlSheet.Name='"'+Analysis.rsAnalysis+' Template"';//added by Mohini for resource file

                if(isPortfolioOn)
                {
                    var projectCellNo=1;var versionCellNo=2;var testPassCellNo=3;var testCaseCellNo=4;
                    var testerNumCellNo=5;var testerPassCellNo=6;var testerFailCellNo=7;testerNotCompletedCellNo=8;	
                }
                else
                {
                    var projectCellNo=1;var testPassCellNo=2;var testCaseCellNo=3;
                    var testerNumCellNo=4;var testerPassCellNo=5;var testerFailCellNo=6;testerNotCompletedCellNo=7;	
                }

                //Set Excel Column Headers and formatting from array
                if(isPortfolioOn)
                    XlSheet.Range("A1:H1000").NumberFormat = "@";
                else
                    XlSheet.Range("A1:G1000").NumberFormat = "@";
                XlSheet.cells(1,projectCellNo).value= Analysis.rsProject;//added by Mohini for resource file
                XlSheet.cells(1,projectCellNo).font.colorindex="2";
                XlSheet.cells(1,projectCellNo).font.bold="false";
                XlSheet.cells(1,projectCellNo).interior.colorindex="23";

                if(isPortfolioOn)//:SD
                { 
                    //XlSheet.cells(1,2).value= "Version";
                    XlSheet.cells(1,versionCellNo).value= Analysis.rsVersion;//added by Mohini for resource file
                    XlSheet.cells(1,versionCellNo).font.colorindex="2";
                    XlSheet.cells(1,versionCellNo).font.bold="false";
                    XlSheet.cells(1,versionCellNo).interior.colorindex="23";
                }
                //XlSheet.cells(1,2).value= "TestPass";
                XlSheet.cells(1, testPassCellNo).value = Analysis.rstestPass;//added by Mohini for resource file
                XlSheet.cells(1, testPassCellNo).font.colorindex = "2";
                XlSheet.cells(1, testPassCellNo).font.bold = "false";
                XlSheet.cells(1, testPassCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,3).value= "TestCase";
                XlSheet.cells(1, testCaseCellNo).value = Analysis.rsTestCase;//added by Mohini for resource file
                XlSheet.cells(1, testCaseCellNo).font.colorindex = "2";
                XlSheet.cells(1, testCaseCellNo).font.bold = "false";
                XlSheet.cells(1, testCaseCellNo).interior.colorindex = "23";



                //XlSheet.cells(1,4).value= "Number of Testers who are assigned this Test Case";
                XlSheet.cells(1, testerNumCellNo).value = '"Number of ' + Analysis.rsTester + ' who are assigned this ' + Analysis.rsTestCase + '"';//added by Mohini for resource file
                XlSheet.cells(1, testerNumCellNo).font.colorindex = "2";
                XlSheet.cells(1, testerNumCellNo).font.bold = "false";
                XlSheet.cells(1, testerNumCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,5).value= "Number of Testers with Results as Pass";
                XlSheet.cells(1, testerPassCellNo).value = '"Number of ' + Analysis.rsTester + ' with Results as Pass"';//added by Mohini for resource file
                XlSheet.cells(1, testerPassCellNo).font.colorindex = "2";
                XlSheet.cells(1, testerPassCellNo).font.bold = "false";
                XlSheet.cells(1, testerPassCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,6).value= "Number of Testers with Results as Fail";
                XlSheet.cells(1, testerFailCellNo).value = '"Number of ' + Analysis.rsTester + ' with Results as Fail"';//added by Mohini for resource file
                XlSheet.cells(1, testerFailCellNo).font.colorindex = "2";
                XlSheet.cells(1, testerFailCellNo).font.bold = "false";
                XlSheet.cells(1, testerFailCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,7).value= "Number of Testers with Results as  Not Complete";
                XlSheet.cells(1, testerNotCompletedCellNo).value = '"Number of ' + Analysis.rsTester + ' with Results as  Not Complete"';//added by Mohini for resource file
                XlSheet.cells(1, testerNotCompletedCellNo).font.colorindex = "2";
                XlSheet.cells(1, testerNotCompletedCellNo).font.bold = "false";
                XlSheet.cells(1, testerNotCompletedCellNo).interior.colorindex = "23";


                XlSheet.Range("A1").EntireColumn.AutoFit();
                XlSheet.Range("B1").EntireColumn.AutoFit();
                XlSheet.Range("C1").EntireColumn.AutoFit();
                XlSheet.Range("D1").EntireColumn.AutoFit();
                XlSheet.Range("E1").EntireColumn.AutoFit();
                XlSheet.Range("F1").EntireColumn.AutoFit();
                XlSheet.Range("G1").EntireColumn.AutoFit();
                if (isPortfolioOn)//:SD
                    XlSheet.Range("H1").EntireColumn.AutoFit();
                if (isPortfolioOn)//:SD
                {
                    XlSheet.Range("A1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("B1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("C1").EntireColumn.columnwidth = '20';
                    XlSheet.Range("D1").EntireColumn.columnwidth = '30';
                    XlSheet.Range("E1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("F1").EntireColumn.columnwidth = '20';
                    XlSheet.Range("G1").EntireColumn.columnwidth = '20';
                    XlSheet.Range("H1").EntireColumn.columnwidth = '25';
                }
                else {
                    XlSheet.Range("A1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("B1").EntireColumn.columnwidth = '20';
                    XlSheet.Range("C1").EntireColumn.columnwidth = '30';
                    XlSheet.Range("D1").EntireColumn.columnwidth = '25';
                    XlSheet.Range("E1").EntireColumn.columnwidth = '20';
                    XlSheet.Range("F1").EntireColumn.columnwidth = '20';
                    XlSheet.Range("G1").EntireColumn.columnwidth = '25';
                }

                XlSheet.Range("A1").EntireColumn.WrapText = 'True';
                XlSheet.Range("B1").EntireColumn.WrapText = 'True';
                XlSheet.Range("C1").EntireColumn.WrapText = 'True';
                XlSheet.Range("D1").EntireColumn.WrapText = 'True';
                XlSheet.Range("E1").EntireColumn.WrapText = 'True';
                XlSheet.Range("F1").EntireColumn.WrapText = 'True';
                XlSheet.Range("G1").EntireColumn.WrapText = 'True';
                if (isPortfolioOn)//:SD
                    XlSheet.Range("H1").EntireColumn.WrapText = 'True';

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

                XlSheet.Range("F1").EntireColumn.VerticalAlignment = true;
                XlSheet.Range("F1").EntireColumn.HorizontalAlignment = true;

                XlSheet.Range("G1").EntireColumn.VerticalAlignment = true;
                XlSheet.Range("G1").EntireColumn.HorizontalAlignment = true;

                if (isPortfolioOn)//:SD
                {
                    XlSheet.Range("H1").EntireColumn.VerticalAlignment = true;
                    XlSheet.Range("H1").EntireColumn.HorizontalAlignment = true;
                }
                XlSheet.cells(2, projectCellNo).value = $("#dd option:selected").attr('title');
                if (isPortfolioOn)//:SD
                {
                    XlSheet.cells(2, versionCellNo).value = $("#versionDD option:selected").attr('title');
                }
                XlSheet.cells(2, testPassCellNo).value = $("#testPassDD option:selected").attr('title') == "" ? "No Test Pass available" : $("#testPassDD option:selected").attr('title');

                /*********************************************/


                if (testerResult != null && testerResult != undefined)
                {
                    for (var i = 0; i < testerResult.length; i++)
                    {
                        var totalPass = 0;
                        var totalFail = 0;
                        var totalNC = 0;

                        totalPass = testerResult[i]['testerPassTC'];
                        totalFail = testerResult[i]['testerFailTC'];
                        totalNC = testerResult[i]['testerNCTC'];

                       // //var data = Analysis.ForTCIDGetStatusAndParentID[testerResult[i]['ID']].split(",");
                       //// for(var mm=0;mm<data.length;mm++)
                       //// {
                       // switch (testerResult[i]['TcStatusByTester'])
                       //     {
                       //         case 'Pass' : totalPass = totalPass + 1;
                       //             break;
                       //         case 'Fail' : totalFail = totalFail + 1;
                       //             break;
                       //         case 'Not Completed' : totalNC = totalNC + 1;
                       //             break;
                       //// }
                       // }
                        if(i!=0)
                        {
                            XlSheet.cells(i+2,projectCellNo).value = $("#dd option:selected").attr('title');
                            if(isPortfolioOn)//:SD
                                XlSheet.cells(i+2,versionCellNo).value = $("#versionDD option:selected").attr('title');
                            XlSheet.cells(i+2,testPassCellNo).value = $("#testPassDD option:selected").attr('title');
                        }	
                        XlSheet.cells(i+2, testCaseCellNo).value = testerResult[i]['testCase'];
                        XlSheet.cells(i+2,testerNumCellNo).value = totalPass+totalFail+totalNC;
                        XlSheet.cells(i+2,testerPassCellNo).value = totalPass;
                        if(totalPass != 0)
                            XlSheet.cells(i+2,testerPassCellNo).Font.ColorIndex=10; 	
                        XlSheet.cells(i+2,testerFailCellNo).value = totalFail;
                        if(totalFail != 0)
                            XlSheet.cells(i+2,testerFailCellNo).Font.ColorIndex= 3;
                        XlSheet.cells(i+2,testerNotCompletedCellNo).value = totalNC;
                        if(totalNC != 0)
                            XlSheet.cells(i+2,testerNotCompletedCellNo).Font.ColorIndex=46
			        		
                    }
                }
                else
                                 
                    XlSheet.cells(i, testCaseCellNo).value = 'No ' + Analysis.rsTestCase + ' available';//added by Mohini for resource file              
            
           
                    XlSheet.cells(2,testCaseCellNo).value = 'No '+Analysis.rsTestCase+' available';//added by Mohini for resource file    	

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
    
       // Main.hideLoading();
    },

    trimText: function (txt, len) {
        if (txt != undefined && txt != null && txt != "") {
            if (txt.length > len)
                return txt.substring(0, len) + '...';
            else
                return txt;

        }
    }

}