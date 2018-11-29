var testpass = {
    SiteURL: Main.getSiteUrl(),
    startIndex: 0,
    oldTestMngrMailId: "",
    oldTestPassName: "",
    oldTestManager: "",
    oldTestManagerFullName: "",
    oldDueDate: "",
    oldCreateDate: "",
    oldDescription: "",
    oldStatus: "",
    testPassList: "",
    IsSave: true,
    prjId: "",
    flag: "",
    testMngrNm: "",
    updatedSPUserID: "",
    tempTMname: "",
    tempHdnTMname: "",
    //Added by HRW for optimization
    allTestPasses: new Array(),
    ProjectNameForProjectID: new Array(),
    LeadNameForProjectID: new Array(),
    oldSPUserID: '',
    autoApproval: '',
    oldChoice: "",
    ////////////*************/////////////    
    ProjectName: '',
    ProjectId: '',
    ProjectLeadName: '',
    ProjectLeadFullName: '',
    pId: '',
    Id: '',
    countVal: '',
    pageIndex: '',
    arrtest1: new Array(),
    /****************Added for resource file by Mohini*****************/
    gConfigTestPass: "Test Pass",
    gConfigTestCase: "Test Case",
    gConfigTestStep: "Test Step",
    gConfigProject: "Project",
    gConfigTestManager: "Test Manager",
    gConfigGroup: "Group",
    gConfigPortfolio: "Portfolio",
    gConfigVersion: "Version",
    gConfigTester: "Tester",


    onPageLoad: function () {

        Main.showLoading();
        $('#pageTab h2:eq(0)').css('color', '#000000');
        //show.showData();
        show.showData('testpass');
        //AddUser.GetGroups();
        $('.rgTableBread').show();

        /****************Added by Mohini for resourcef file********************/
        if (resource.isConfig.toLowerCase() == 'true') {
            testpass.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] != undefined ? resource.gPageSpecialTerms['Test Pass'] : "Test Pass";
            testpass.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] != undefined ? resource.gPageSpecialTerms['Test Case'] : "Test Case";
            testpass.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] != undefined ? resource.gPageSpecialTerms['Test Step'] : "Test Step";
            testpass.gConfigProject = resource.gPageSpecialTerms['Project'] != undefined ? resource.gPageSpecialTerms['Project'] : "Project";
            testpass.gConfigTestManager = resource.gPageSpecialTerms['Test Manager'] != undefined ? resource.gPageSpecialTerms['Test Manager'] : "Test Manager";
            testpass.gConfigGroup = resource.gPageSpecialTerms['Group'] != undefined ? resource.gPageSpecialTerms['Group'] : "Group";
            testpass.gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] != undefined ? resource.gPageSpecialTerms['Portfolio'] : "Portfolio";
            testpass.gConfigVersion = resource.gPageSpecialTerms['Version'] != undefined ? resource.gPageSpecialTerms['Version'] : "Version";
            testpass.gConfigTester = resource.gPageSpecialTerms['Tester'] != undefined ? resource.gPageSpecialTerms['Tester'] : "Tester";
        }
        if (isPortfolioOn) {
            $(".prjHead").hide();
            createDD.create();
        }
        else
            createDD.createWithoutPort();

        ////To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014 
        ////$("#groupHead label").html(testpass.gConfigGroup+'<img src="../SiteAssets/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        ////$("#portfolioHead label").html(testpass.gConfigPortfolio+'<img src="../SiteAssets/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        ////$("#projectHead label").html(testpass.gConfigProject+'<img src="../SiteAssets/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        ////$("#versionHead label").html(testpass.gConfigVersion+'<img src="../SiteAssets/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        ////$("#TestPassHead label").text(testpass.gConfigTestPass);
        ////To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014





        //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014 
        $("#groupHead label").html(testpass.gConfigGroup + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#portfolioHead label").html(testpass.gConfigPortfolio + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#projectHead label").html(testpass.gConfigProject + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#versionHead label").html(testpass.gConfigVersion + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#TestPassHead label").text(testpass.gConfigTestPass);
        //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014


        $('#noP').html('No ' + testpass.gConfigTestPass + '(es) available!');

        testpass.populateStatusDDL();

        $("ul li a:eq(1)").css('color', '#f60');

        if (isRootWeb)
            $("#startDate").datepicker({
                minDate: 0,
                showOn: "button",
                //    buttonImage: "/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImage: "/images/theme/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy",
                changeMonth: true,
                changeYear: true
            });
        else
            $("#startDate").datepicker({
                minDate: 0,
                showOn: "button",
                // buttonImage: "/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImage: "/images/theme/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy",
                changeMonth: true,
                changeYear: true
            });

        $(".ui-datepicker-trigger").css('margin-right', '35px');
        $(".hasDatepicker").css('border', '1px #ccc solid');

        if (isRootWeb)
            $("#endDate").datepicker({
                minDate: 0,
                showOn: "button",
                // buttonImage: "/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImage: "/images/theme/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy",
                changeMonth: true,
                changeYear: true
            });
        else
            $("#endDate").datepicker({
                minDate: 0,
                showOn: "button",
                //  buttonImage: "/theme/" + themeColor + "/images/Calendar-Logo.gif",
                buttonImage: "/images/theme/Calendar-Logo.gif",
                buttonImageOnly: true,
                dateFormat: "mm/dd/yy",
                changeMonth: true,
                changeYear: true
            });

        $(".ui-datepicker-trigger").css('margin-left', '10px');
        $(".ui-datepicker-trigger").attr('title', 'Select Date'); //added by shilpa
        $(".hasDatepicker").css('border', '1px #ccc solid');

        $("#startDate").val(Main.getCurrentSystmDt());

        document.getElementById('drillDownDetails').style.display = "none";

        /*var len = $('#showTestPass tr').length;
        for(var i = 0; i <= len; i++)
            $('#showTestPass tr:eq('+i+') td:eq(1)').css('background-color','rgb(253,220,138)');*/

        if (show.testPassId != "") {
            testpass.selectRow1(show.testPassId);
        }
        else {
            var id = $('#showTestPass tr:eq(0)').attr('id');
            testpass.selectRow1(id);
        }
        Main.hideLoading();
        $("#dialog:ui-dialog").dialog("destroy");


        $("#dialog-form").dialog({
            autoOpen: false, height: 200, width: 300, modal: true, resizable: false,
            buttons: {

                "OK": function () {

                    //Code Modified By swapnil on 17-7-2012 to resolve bug:677
                    if ($("div[title='Test Manager']").text() != '') {
                        var str = $("textarea[Title='Test Manager']").val();
                        if (str.indexOf("unresolved") != -1) {
                            testpass.alertBox('The user name is unresolved,enter the valid user name!');
                            Main.hideLoading();
                            testpass.testMngrNm = testpass.oldTestManagerFullName;
                        }
                        else {
                            //var key=str.indexOf("key");			
                            //var displaytext=str.indexOf("displaytext");	

                            /********Logic for extra ting mail id*********/
                            //var subTester=str.substring(str.indexOf("Email")+62,str.length);
                            //var testMngrMailID=subTester.substring(0,subTester.indexOf("&"));
                            var testMngrMailID = testpass.resolveTesterEmail(str);
                            /**********************************************/
                            var isresolved = str.indexOf("isresolved");
                            //testpass.testMngrNm=str.substring(displaytext+13,isresolved-2);
                            testpass.testMngrNm = testpass.resolveTesterFullName(str);
                            //var sub=str.substring(str.indexOf("SPUserID")-1,str.length);
                            //var sub2=sub.substring(sub.indexOf("SPUserID")+62,sub.indexOf("SPUserID")+72);
                            //var SPUserID=sub2.substring(sub2.indexOf(";")+1,sub2.indexOf("&") );
                            var SPUserID = testpass.resolveSPUserID(str);
                            //str=str.substring(key+5,displaytext-2);
                            document.getElementById('txtTester').value = testpass.testMngrNm;
                            document.getElementById('hiddenMailId').value = testMngrMailID;
                        }
                    }
                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });

        $("#dialog:ui-dialog").dialog("destroy");
        $("#dialog:ui-dialog").dialog("destroy");
    },
    //getTestPasses: function () {
    //    testpass.allTestPasses = ServiceLayer.GetData("GetTestPassDetailForProjectId", show.projectId  , "TestPass");
    //},

    getTestPasses: function () {
        testpass.allTestPasses = ServiceLayer.GetData("GetTestPassDetailForProjectId" + "/" + show.projectId + "/" + _spUserId, null, "TestPass");
    },


    populateStatusDDL: function () {
        var statusOpn = ["Active", "On Hold", "Complete"];
        if (statusOpn != null || statusOpn != undefined) {
            for (var i = 0; i < statusOpn.length; i++) {
                //if(statusOpn [i]['statusValue'] != null || statusOpn [i]['statusValue']!= undefined)
                {
                    var obj = new Option();
                    document.getElementById('status').options[i] = obj;
                    document.getElementById('status').options[i].text = statusOpn[i].toString();
                    document.getElementById('status').options[i].value = statusOpn[i].toString();
                }
            }
        }
    },
    itemCount: '',
    dmlOperation: function (search, list) {
        var listname = jP.Lists.setSPObject(testpass.SiteURL, list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        var total = listname.getSPItemsWithQuery(query).total;
        testpass.itemCount = parseInt(total);
        return (result);
    },
    startIndexIncrement: function () {
        if (testpass.flag == 0) {
            testpass.startIndex += 5;
            testpass.showTestPassFromBuffer();
        }
    },

    /* Function to perform to decrement the index in paging */
    startIndexDecrement: function () {
        if (testpass.startIndex >= 5) {
            testpass.startIndex -= 5;
            testpass.showTestPassFromBuffer();
        }
    },

    validation: function (tester) {
        Main.showLoading();
        //var projectID = $("#projectNames").val();
        var projectID = show.projectId;
        var testPaNm = jQuery.trim(document.getElementById('testPasNm').value);
        var testPaDesc = Main.filterData(document.getElementById('desc').value);
        var SPUserID;
        var testerMailId;
        var getFulNm;

        if (testpass.IsSave == false) {
            //Shashank 2/14/2012 Bug 661 Update Start-> Validate all required fields then proced		    
            if (testPaNm == '' || $('#endDate').val() == '') {
                testpass.alertBox('Fields marked with asterisk(*) are mandatory!.');
                Main.hideLoading();
                return;
            }
            //Added by HRW	
            if (!(Main.checkAlphanumeric($('#testPasNm').val()))) {
                //testpass.alertBox('Only Alphanumeric values are allowed in Test Pass name!.');
                testpass.alertBox('Only Alphanumeric values are allowed in ' + testpass.gConfigTestPass + ' name!.');//added by Mohini for resource file
                Main.hideLoading();
                return;
            }
            //    AddUser.globTesterName = $('div[title="tester"] #divEntityData').attr('key');
            //if((AddUser.globTesterName==null||AddUser.globTesterName==undefined||AddUser.globTesterName==''))
            //{
            //	var msgTag = testpass.gConfigTestManager +' cannot be empty!';
            //	testpass.alertBox(msgTag);
            //    Main.hideLoading();
            //    return;
            //}

        }

        /*Tester name manipulation*/
        if (testpass.IsSave == true) {
            //Shashank 2/14/2012 Bug 661 Update Start-> Validate all required fields then proced		    
            if (testPaNm == '' || $('#endDate').val() == '' || $('textarea[title="tester"]').val() == '' || $('#Auto').val() == '') {
                testpass.alertBox('Fields marked with asterisk(*) are mandatory!.');
                Main.hideLoading();
                return;
            }
            //Added by HRW	
            if (!(Main.checkAlphanumeric($('#testPasNm').val()))) {
                testpass.alertBox('Only Alphanumeric values are allowed in ' + testpass.gConfigTestPass + ' name!.');//added by Mohini for resource file
                Main.hideLoading();
                return;
            }
            var testerTemp = $("textarea[Title='" + tester + "']").val();
            //var isresolved = testerTemp.indexOf("isresolved");

            //AddUser.testerSPID = '';
            //AddUser.globTesterName = $('div[title="'+tester+'"] #divEntityData').attr('key');//Added for SP13

            //if((AddUser.globTesterName==null||AddUser.globTesterName==undefined||AddUser.globTesterName==''))
            //{
            //	var msgTag= testpass.gConfigTestManager +' cannot be empty!';UPDA
            //	testpass.alertBox(msgTag);
            //    Main.hideLoading();
            //    return;
            //}	
            //AddUser.presentInGroup = 0;
            //AddUser.GetGroupNameforUser();
            //if(AddUser.presentInGroup == 1)//User is not present in member group
            //{
            //	AddUser.AddUserToSharePointGroup();
            //}

            //var x = GlobalUsersArray;
            //var blankArray = [];

            if ($("#TooltipVersionLead").is(':visible') == true) {
                var msgTag1 = testpass.gConfigTestManager + ' name is invalid !';
                testpass.alertBox(msgTag1);
                Main.hideLoading();
                return;

            }

            var Ele = $('#Auto_Hdn');
            var Ele1 = $('#Auto').val();

            /* from Autocomplete Textbox */

            if (Ele.length > 0 && Ele.val().trim() != '') {
                var values = Ele.val().split('|');
                SPUserID = values[1];

                getFulNm = values[0];

                tester = "i:0#.f|membership|" + values[2];

                testerMailId = values[2];
            }
            else {
                if (Ele == "" || Ele1 == "") {
                    var msgTag = testpass.gConfigTestManager + ' cannot be empty!';
                    testpass.alertBox(msgTag);
                    Main.hideLoading();
                    return;
                }


            }


        }

        var getInfo = [];
        for (var ii = 0; ii < show.GetGroupPortfolioProjectTestPass.length; ii++) {
            if (show.GetGroupPortfolioProjectTestPass[ii].projectId == projectID) {
                getInfo = show.GetGroupPortfolioProjectTestPass[ii];
                break;
            }
        }

        if (getInfo != null && getInfo != undefined) {
            /*Date manipulation*/
            var dateString = $("#startDate").val();
            var systemDate = new Date();
            var time = String(systemDate.getHours()) + ':' + String(systemDate.getMinutes()) + ':' + String(systemDate.getSeconds());
            var createDate = dateString.charAt(6) + dateString.charAt(7) + dateString.charAt(8) + dateString.charAt(9) + '-' + dateString.charAt(0) + dateString.charAt(1) + '-' + dateString.charAt(3) + dateString.charAt(4) + 'T' + time + 'Z';

            var dateString2 = $("#endDate").val();
            var systemDate2 = new Date();
            var ftime = String(systemDate2.getHours()) + ':' + String(systemDate2.getMinutes()) + ':' + String(systemDate2.getSeconds());
            var dueDate = dateString2.charAt(6) + dateString2.charAt(7) + dateString2.charAt(8) + dateString2.charAt(9) + '-' + dateString2.charAt(0) + dateString2.charAt(1) + '-' + dateString2.charAt(3) + dateString2.charAt(4) + 'T' + ftime + 'Z';
            /********************/

            /*Project due date info*/
            getInfo.projectEndDate = getInfo.projectEndDate;//TBC
            var getDueDt = getInfo.projectEndDate;
            var prjYr = getDueDt.charAt(6) + getDueDt.charAt(7) + getDueDt.charAt(8) + getDueDt.charAt(9);
            var prjMnth = getDueDt.charAt(0) + getDueDt.charAt(1);
            var prjDay = getDueDt.charAt(3) + getDueDt.charAt(4);
            var showPrjDate = prjMnth + "/" + prjDay + "/" + prjYr;
            var finDate = prjYr + "/" + prjMnth + "/" + prjDay;
            /************************/

            /*Project start date info code added to validate testpass create date greater project start date on 9Feb sheetal*/
            getInfo.projectStartDate = getInfo.projectStartDate;//TBC
            var getStDt = getInfo.projectStartDate;
            var prjStYr = getStDt.charAt(6) + getStDt.charAt(7) + getStDt.charAt(8) + getStDt.charAt(9);
            var prjStMnth = getStDt.charAt(0) + getStDt.charAt(1);
            var prjStDay = getStDt.charAt(3) + getStDt.charAt(4);
            var showPrjStDate = prjStMnth + "/" + prjStDay + "/" + prjStYr;
            var finStDate = prjStYr + "/" + prjStMnth + "/" + prjStDay;
            /************************/

            /*test pass create date info*/
            var creDtYr = dateString.charAt(6) + dateString.charAt(7) + dateString.charAt(8) + dateString.charAt(9);
            var creDtMnt = dateString.charAt(0) + dateString.charAt(1);
            var creDtDay = dateString.charAt(3) + dateString.charAt(4);
            var creDate = creDtYr + "/" + creDtMnt + "/" + creDtDay;
            /************************/

            /*test pass due date info*/
            var dueDtYr = dateString2.charAt(6) + dateString2.charAt(7) + dateString2.charAt(8) + dateString2.charAt(9);
            var dueDtMnt = dateString2.charAt(0) + dateString2.charAt(1);
            var dueDtDay = dateString2.charAt(3) + dateString2.charAt(4);
            var fnlDueDt = dueDtYr + "/" + dueDtMnt + "/" + dueDtDay;
            /***********************************************************/
            var projectDue = new Date(finDate);
            var testPassCreate = new Date(creDate);
            var testPassDue = new Date(fnlDueDt);
            var updtp = 0;
            var createCorrect1 = false;
            var createCorrect2 = false;
            var dueCorrect = false;
            var createCorrect3 = false;

            /***************Compare the project start date and create date of test pass code added on 9Feb sheetal******************/
            if (creDate < finStDate) {
                testpass.alertBox('Test Pass must have a create date after ' + testpass.gConfigVersion + ' ' + $("#lblStartDate").text().substring(0, $("#lblStartDate").text().length - 2).toLowerCase() + ' (' + showPrjStDate + ') .');//added by Mohini for resource file
                Main.hideLoading();
            }
            else
                createCorrect3 = true;

            /***************Compare the due and create date of test pass******************/
            if (creDate > fnlDueDt) {
                testpass.alertBox($("#lblStartDate").text().substring(0, $("#lblStartDate").text().length - 2) + ' should be prior to ' + $("#lblEndDate").text().substring(0, $("#lblEndDate").text().length - 2).toLowerCase() + ' (' + $("#endDate").val() + ') .');//added by Mohini for resource file
                Main.hideLoading();
            }
            else
                createCorrect1 = true;
            /*********Compare the due date of test pass with due date of project *******/
            if (fnlDueDt > finDate) {
                testpass.alertBox(testpass.gConfigTestPass + ' must have an ' + $("#lblEndDate").text().substring(0, $("#lblEndDate").text().length - 2).toLowerCase() + ' that is prior to ' + $("#lblEndDate").text().substring(0, $("#lblEndDate").text().length - 2).toLowerCase() + ' of ' + testpass.gConfigVersion.toLowerCase() + ' (' + showPrjDate + ') .');//added by Mohini for resource file
                Main.hideLoading();
            }
            else
                dueCorrect = true;
            /*********Compare the create date of test pass with due date of project *******/
            if (creDate > finDate) {
                testpass.alertBox(testpass.gConfigTestPass + ' must have a create date that is prior to ' + $("#lblEndDate").text().substring(0, $("#lblEndDate").text().length - 2).toLowerCase() + ' of ' + testpass.gConfigVersion.toLowerCase() + ' (' + showPrjDate + ') .');//added by Mohini for resource file
                Main.hideLoading();
            }
            else
                createCorrect2 = true;

            /*End of date manipulation*/
            if ($("#startDate").val() == "" || $("#endDate").val() == "" || testPaNm == "" || testPaNm == null || testPaNm == undefined || createCorrect1 != true || tester == null || tester == undefined || tester == '' || dueCorrect != true) {
                if (testPaNm == null || testPaNm == undefined || testPaNm == "" || tester == null || tester == undefined || tester == ''
			      || $("#startDate").val() == "" || $("#endDate").val() == "") {
                    testpass.alertBox2('Fields marked with asterisk(*) are mandatory!');
                    Main.hideLoading();
                    updtp = 1;
                }
                if ((testPaNm != null || testPaNm != undefined || testPaNm != "") && (tester == null || tester == undefined || tester == '')
			      && ($("#startDate").val() != "") && ($("#endDate").val() != "")) {
                    testpass.alertBox2($("#lblTestManager").text().substring(0, $("#lblTestManager").text().length - 2) + ' field cannot be contain empty or cannot contain invalid username!Enter the username and press enter key or click check Names option!');//added by Mohini for resource file
                    Main.hideLoading();
                    updtp = 1;
                }
            }
            if (testPaNm.length > 0) {
                var dd = 0;
                if (testPaNm.length > 55) {
                    testpass.alertBox2(testpass.gConfigTestPass + ' name should contain only 55 characters.');//added by Mohini for resource file 
                    Main.hideLoading();
                    dd = 1;
                    updtp = 1;
                }
                if (dd == 0 && testpass.IsSave == true) {
                    for (var ii = 0; ii < testpass.allTestPasses.length; ii++) {
                        if (testpass.allTestPasses[ii].testPassName == testPaNm) {
                            testpass.alertBox(testpass.gConfigTestPass + ' with ' + jQuery.trim(testPaNm) + 'Name already exists!');//added by Mohini for resource file 
                            Main.hideLoading();
                            updtp = 1;
                        }
                    }
                }
            }
            if (testPaDesc.length > 0) {
                var dd = 0;
                if (testPaNm.length > 255) {
                    //testpass.alertBox2('Test pass description should contain only 255 charaters.');
                    testpass.alertBox2(testpass.gConfigTestPass + ' description should contain only 255 characters.');//added by Mohini for resource file	
                    Main.hideLoading();
                    updtp = 1;
                    dd = 1;
                }

            }
            if (updtp == 0 && dueCorrect && createCorrect1 && createCorrect2 && createCorrect3)// else 1
            {
                if (testpass.IsSave == true) {
                    testpass.savingData(projectID, dueDate, testPaNm, testPaDesc, createDate, tester, testerMailId, getFulNm, SPUserID); // save the data
                }
                else
                    testpass.updateTestPass();	// update the data	

            } // end of else 1
        }
        else /* Added by shilpa */ {
            //testpass.alertBox2('Create the project first.');
            testpass.alertBox2('Create the ' + testpass.gConfigProject.toLowerCase() + ' first.');//added by Mohini for resource file
            testpass.clearFields();
        }
        Main.hideLoading();

    },

    savingData: function (projectID, dueDate, testPaNm, testPaDesc, createDate, tester, emailId, getFulNm, SPUserID) {
        Main.showLoading();
        var selectedStatus = $('#status option:selected').val();
        // tester = tester.join();
        var cd = createDate[5] + createDate[6] + "-" + createDate[8] + createDate[9] + "-" + createDate[0] + createDate[1] + createDate[2] + createDate[3];
        var dd = dueDate[5] + dueDate[6] + "-" + dueDate[8] + dueDate[9] + "-" + dueDate[0] + dueDate[1] + dueDate[2] + dueDate[3];
        var data = {
            "projectId": projectID,
            "testPassName": jQuery.trim(testPaNm),
            "testPassDesp": jQuery.trim(testPaDesc),
            "tpStartDate": cd,//createDate.split("T")[0],
            "tpEndDate": dd,//dueDate.split("T")[0],
            "tpStatus": selectedStatus,
            "listTestMgr": []
        }
        var item = {};
        item['userName'] = getFulNm//.join();
        item['alias'] = jQuery.trim(tester);
        item['email'] = emailId//.join();
        item['spUserId'] = SPUserID;
        item['securityId'] = '3';
        data.listTestMgr.push(item);

        var result = ServiceLayer.InsertUpdateData("InsertUpdateTestPass", data, 'TestPass');
        if (result != '' && result != undefined) {
            if (result.Success == "Done") {
                ////
                data.tpStartDate = data.tpStartDate.replace(/-/g, "/");
                data.tpEndDate = data.tpEndDate.replace(/-/g, "/");
                ////

                data.testPassId = result.Value;
                data.totalTestCaseCount = '0';
                testpass.allTestPasses.push(data);
                show.testPassId = result.Value;

                //testpass.alertBox(testpass.gConfigTestPass+' added successfully!');//added by Mohini for resource file
                Main.AutoHideAlertBox(testpass.gConfigTestPass + ' added successfully!');

                testpass.selectRow1(show.testPassId);
                testpass.clearFields();

                $(".navTabs h2").eq(0).click();
            }
            else {
                testpass.alertBox('Sorry! Something went wrong, please try again!');

            }

        }
        else {
            testpass.alertBox('Sorry! Something went wrong, please try again!');

        }

    },
    /* Function to update the test pass */
    updateTestPass: function () {
        $('#pageTab h2:eq(1)').css('color', '#7F7F7F');
        $('#pageTab h2:eq(0)').css('color', '#000000');
        $('#pageTab h2:eq(2)').hide();
        if ($("#TooltipVersionLead").is(':visible') == true) {
            var msgTag1 = testpass.gConfigTestManager + ' name is invalid !';
            testpass.alertBox(msgTag1);
            $('#TestPassForm').show();
            flagfortp = 1;
            Main.hideLoading();
            return;
        }
        $('#TestPassForm').hide();
        Main.showLoading();
        var SPUserID = '';
        var tester = '';
        var getFulNm = '';
        var testerMailId = '';
        var TooltipVersionLead = '';


        //commented by rupal
        //AddUser.presentInGroup = 0;
        //AddUser.GetGroupNameforUser();
        //if (AddUser.presentInGroup == 1)//User is not present in member group
        //{
        //    AddUser.AddUserToSharePointGroup();
        //}

        //SPUserID = AddUser.testerSPID;
        var Ele = $('#Auto_Hdn').val();
        var Ele1 = $('#Auto').val();
        if (Ele.trim() == '' || Ele1 == "") {
            var msgTag = 'Test Manager cannot be empty!'//added by Mohini for resource file
            testpass.alertBox(msgTag);
            $('#TestPassForm').show();
            addprojectflag = 1;
            Main.hideLoading();
            return;
        }
        SPUserID = Ele.split('|')[1]; // Ele.spUserId;
        if (SPUserID != testpass.oldSPUserID) {
            testpass.updatedSPUserID = SPUserID;
            tester = "i:0#.f|membership|" + (Ele.split('|')[2] == '' ? '' : Ele.split('|')[2].toString())   // AddUser.globTesterName;
            getFulNm = Ele.split('|')[0] //ddUser.testerFullName;
            testerMailId = Ele.split('|')[2]// AddUser.testerEmail;

        }
        else {
            testpass.updatedSPUserID = '';
            SPUserID = testpass.oldSPUserID;
            tester = testpass.oldTestManager;
            getFulNm = testpass.oldTestManagerFullName;
            testerMailId = testpass.oldTestMngrMailId;
        }

        var selectedStatus = document.getElementById('status').options[document.getElementById('status').selectedIndex].text;

        /*Date manipulation*/
        var dateString = $("#startDate").val();
        var CHKcreateDate = dateString;
        var systemDate = new Date();
        var time = String(systemDate.getHours()) + ':' + String(systemDate.getMinutes()) + ':' + String(systemDate.getSeconds());
        var createDate = dateString.charAt(6) + dateString.charAt(7) + dateString.charAt(8) + dateString.charAt(9) + '-' + dateString.charAt(0) + dateString.charAt(1) + '-' + dateString.charAt(3) + dateString.charAt(4) + 'T' + time + 'Z';

        var dateString2 = $("#endDate").val();
        var systemDate2 = new Date();
        var ftime = String(systemDate2.getHours()) + ':' + String(systemDate2.getMinutes()) + ':' + String(systemDate2.getSeconds());
        var dueDate = dateString2.charAt(6) + dateString2.charAt(7) + dateString2.charAt(8) + dateString2.charAt(9) + '-' + dateString2.charAt(0) + dateString2.charAt(1) + '-' + dateString2.charAt(3) + dateString2.charAt(4) + 'T' + ftime + 'Z';
        var CHKdueDate = dateString2;
        /*End of date manipulation*/

        //var testMngr=document.getElementById('txtTester').value;
        var testNm = Main.filterData(document.getElementById('testPasNm').value);
        var testDesc = Main.filterData(document.getElementById('desc').value);
        //var testMngrMailID=document.getElementById('hiddenMailId').value;
        //var testPasslist = jP.Lists.setSPObject(this.SiteURL, 'testpass');
        var testPasslist = null;
        var Obj = new Array();
        var flagfortp = 0;
        if (testNm == null || testNm == undefined || testNm == '') {
            testpass.alertBox(testpass.gConfigTestPass + ' Name is mandatory field!');//added by Mohini for resource file
            Main.hideLoading();
            flagfortp = 1;
        }
        //TestPass Name validataion 23-12-11
        if (flagfortp != 1) {
            for (var ii = 0; ii < testpass.allTestPasses.length; ii++) {
                if (jQuery.trim(testpass.allTestPasses[ii].testPassName.toLowerCase()) == jQuery.trim(testNm.toLowerCase()) && testpass.allTestPasses[ii].testPassId != $('#hid').val()) {
                    testpass.alertBox(testpass.gConfigTestPass + ' with ' + jQuery.trim(testNm) + 'Name already exists!');
                    Main.hideLoading();
                    flagfortp = 1;
                }
            }


        }
        if (flagfortp == 0) {
            var cd = createDate[5] + createDate[6] + "-" + createDate[8] + createDate[9] + "-" + createDate[0] + createDate[1] + createDate[2] + createDate[3];
            var dd = dueDate[5] + dueDate[6] + "-" + dueDate[8] + dueDate[9] + "-" + dueDate[0] + dueDate[1] + dueDate[2] + dueDate[3];
            var data = {
                "projectId": show.projectId,
                "testPassId": $('#hid').val(),
                "testPassName": jQuery.trim(testNm),
                "testPassDesp": jQuery.trim(testDesc),
                "tpStartDate": cd,//createDate.split("T")[0],
                "tpEndDate": dd,//dueDate.split("T")[0],
                "tpStatus": selectedStatus,
                "listTestMgr": []
            }
            var item = {};
            item['userName'] = getFulNm;
            item['alias'] = tester;
            item['email'] = testerMailId;
            item['spUserId'] = SPUserID;
            item['securityId'] = '3';
            data.listTestMgr.push(item);

            var result = ServiceLayer.InsertUpdateData("InsertUpdateTestPass", data, 'TestPass');

            if (result != undefined && result != '') {

                if (result.Success == "Done") {
                    ////
                    data.tpStartDate = data.tpStartDate.replace(/-/g, "/");
                    data.tpEndDate = data.tpEndDate.replace(/-/g, "/");
                    ////

                    for (var ii = 0; ii < testpass.allTestPasses.length; ii++) {
                        if (testpass.allTestPasses[ii].testPassId == $('#hid').val()) {
                            data.totalTestCaseCount = testpass.allTestPasses[ii].totalTestCaseCount;
                            testpass.allTestPasses.splice(ii, 1);
                        }
                    }
                    testpass.allTestPasses.push(data);

                    //testpass.alertBox(testpass.gConfigTestPass+' updated successfully!');
                    Main.AutoHideAlertBox(testpass.gConfigTestPass + ' updated successfully!');

                    var tpId = $('#hid').val();
                    show.testPassId = tpId;
                    testpass.clearFields();
                    testpass.reset();
                    $("#TooltipVersionLead").hide();

                    if (testpass.updatedSPUserID != testpass.oldSPUserID) /* modified by shilpa on 1st march */ {
                        var userAsso = [];
                        var flag = 0;
                        if (security.userAssociationForProject[show.projectId] != undefined && security.userAssociationForProject[show.projectId] != "") {
                            userAsso = security.userAssociationForProject[show.projectId];
                            if (($.inArray('1', userAsso) == -1 && $.inArray('2', userAsso) == -1 && $.inArray('5', userAsso) == -1) && testpass.allTestPasses.length == 1)
                                flag = 1;
                        }

                        var mananger = 0;
                        for (var i = 0; i < security.userType.length; i++) {
                            if (security.userType[i] == "2")
                                mananger++;
                        }
                        if ((flag == 1) && ($.inArray('1', security.userType) == -1) && ($.inArray('2', security.userType) == -1) && ($.inArray('5', security.userType) == -1) && (mananger == 1))
                            window.location.href = "Dashboard.aspx";
                        else {
                            if ($.inArray('1', security.userType) == -1 && testpass.allTestPasses.length == 1)//Removing the entry from Project drop down
                            {
                                var userAssForPrj = new Array();
                                //if(security.userAssociationForProject[$('#projectNames').val()] != undefined)
                                /*if(security.userAssociationForProject[show.projectId] != undefined)
                                {
                                    //userAssForPrj = security.userAssociationForProject[$('#projectNames').val()].split(",");
                                    userAssForPrj = security.userAssociationForProject[show.projectId];
    
                                    if($.inArray('2',userAssForPrj)==-1 && $.inArray('5',userAssForPrj)==-1)
                                    {
                                        //var select=document.getElementById('projectNames');
                                        var select=show.projectId;
    
                                        for (i=0;i<select.length;i++)
                                        {
                                           //if(select.options[i].value==$('#projectNames').val())
                                            if(select.options[i].value==show.projectId)
                                            {
                                             select.remove(i);
                                             break;
                                           }  
                                        }
                                    }
                                }*/
                            }
                        } // End of else

                    }

                }
                else {
                    testpass.alertBox('Sorry! Something went wrong, please try again!');

                }
            }
            else
                testpass.alertBox('Sorry! Something went wrong, please try again!');
        }



        testpass.pagination();
        //testpass.selectRow1(tpId);
        testpass.selectRow1(show.testPassId);

        //To enable the Create and View links
        //$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
        //$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");


    },

    clearFields: function () {
        //// Added for DD
        createDD.editMode = 0
        createDD.showDD();

        $("div[title='tester']").html('&nbsp;');
        $("textarea[title='tester']").text('');
        document.getElementById('testPasNm').value = "";
        document.getElementById('desc').value = "";
        $("#startDate").val(Main.getCurrentSystmDt());
        document.getElementById('endDate').value = "";
        $("#autoApproval").attr("checked", false);
        $("#choice").val(0);
        //New code added by Rupal.s
        $('#Auto').val('');
        $('#Auto_Hdn').val('');
        $("#TooltipVersionLead").hide();

        // End
        testpass.populateStatusDDL();

    },

    reset: function () {
        Main.showLoading();
        $("#newTP").css('display', 'none');
        $("div[title='tester']").html('&nbsp;');
        $("textarea[title='tester']").text('');
        document.getElementById('testPasNm').value = "";
        document.getElementById('hid').value = "";
        document.getElementById('desc').value = "";
        $("#startDate").val(Main.getCurrentSystmDt());
        document.getElementById('endDate').value = "";
        $("#TooltipVersionLead").hide();
        $("#btnSave").show();
        $("#btnCancel").show();
        $("#btnUpdate").hide();
        $("#btnReset").hide();
        $("#divTpId").hide();
        $("#divPP").hide();
        $("#testerDiv").show();
        //$("#newTPImg").empty();
        testpass.populateStatusDDL();
        testpass.IsSave = true;
        document.getElementById('testCaseCount').innerHTML = "";
        $("#autoApproval").attr("checked", false);
        $("#choice").val(0);

        Main.hideLoading();

    },


    buffer: function () {
        document.getElementById('testPasNm').value = testpass.oldTestPassName;
        document.getElementById('desc').value = testpass.oldDescription;
        document.getElementById('startDate').value = testpass.oldCreateDate;
        document.getElementById('endDate').value = testpass.oldDueDate;
        $("#Auto").val(testpass.tempTMname);
        $("#Auto_Hdn").val(testpass.tempHdnTMname);
        $("#TooltipVersionLead").hide();
        $("div[title='tester']").text(testpass.oldTestManagerFullName);
        $("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2_checkNames").trigger('click');

        document.getElementById('hiddenMailId').value = testpass.oldTestMngrMailId;
        document.getElementById('status').options[0].text = testpass.oldStatus;
        testpass.populateStatusDDL();
        $("textarea[title='Test Manager']").val("");

        if (testpass.autoApproval == "No")
            $("#autoApproval").attr("checked", false);
        else
            $("#autoApproval").attr("checked", true);
        $("#choice").val(testpass.oldChoice);


        //To enable the Create and View links
        //$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
        //$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
    },

    /* Function to perform to fill all the fields of selected test pass */
    fillForm: function (id) {
        Main.showLoading();
        $('#Auto_Otxt').val($('#Auto_Hdn').val());
        $("#begTest").hide();
        $("#testResult").hide();
        $("#TooltipVersionLead").hide()


        // Added for DD
        createDD.editMode = 1;
        createDD.hideDD();

        //////////////**************///////////////////////
        $('#countDiv').hide();
        $('#testPassGrid').hide();
        $('#testpassCount').hide();
        $('#TestPassForm').show();
        $('#Pagination1').hide();
        $('#pageTab h2:eq(0)').css('color', '#7F7F7F');
        $('#pageTab h2:eq(2)').show();
        $('#pageTab h2:eq(2)').css('color', '#000000');

        //////////////************///////////////

        $("#btnSave").css('display', 'none');
        $("#btnCancel").css('display', 'none');
        $("#btnUpdate").css('display', 'inline');
        $("#btnReset").css('display', 'inline');
        $("#divTpId").css('display', 'inline');
        $("#newTP").css('display', 'inline');
        $('#drillDownDetails').css('display', 'inline');



        testpass.IsSave = false;


        if ($.inArray('1', security.userType) == -1) {
            // var securityIdsForProject=security.userAssociationForProject[$('#projectNames').val()].split(',');
            var securityIdsForProject = security.userAssociationForProject[show.projectId];

            if ($.inArray('2', securityIdsForProject) != -1) {
                $('#editTestManager').show();
            }
            else if ($.inArray('3', securityIdsForProject) != -1) {
                $('#editTestManager').hide();
            }
        }

        for (var i = 0; i < testpass.allTestPasses.length; i++) {
            if (testpass.allTestPasses[i].testPassId == id) {
                var testPass = testpass.allTestPasses[i];
                break;
            }
        }
        testpass.cache = testPass;
        if (testPass != null && testPass != undefined) {
            testpass.oldSPUserID = testPass.listTestMgr[0].spUserId;
            document.getElementById('hid').value = testPass.testPassId;
            document.getElementById('testPasID').value = testPass.testPassId;
            if (testPass.tpStatus != null || testPass.tpStatus != undefined) {
                //document.getElementById('status').options[0].text=testPass.tpStatus;
                testpass.oldStatus = testPass.tpStatus;
                testpass.populateStatusDDL();
                $('#status').val(testPass.tpStatus);
            }

            if (testPass.testPassDesp != null || testPass.testPassDesp != undefined) {
                document.getElementById('desc').value = testPass.testPassDesp;
                testpass.oldDescription = document.getElementById('desc').value;
            }
            else {
                document.getElementById('desc').value = "";
                testpass.oldDescription = '';
            }
            if (testPass.testPassName != null || testPass.testPassName != undefined) {
                document.getElementById('testPasNm').value = testPass.testPassName;
                testpass.oldTestPassName = document.getElementById('testPasNm').value;
            }
            else {
                document.getElementById('testPasNm').value = "-";
                testpass.oldTestPassName = '-';
            }

            if (testPass.tpEndDate != null && testPass.tpEndDate != undefined) {
                document.getElementById('endDate').value = testPass.tpEndDate;
                testpass.oldDueDate = testPass.tpEndDate;
            }

            if (testPass.tpStartDate != null && testPass.tpStartDate != undefined) {
                document.getElementById('startDate').value = testPass.tpStartDate;
                testpass.oldCreateDate = testPass.tpStartDate;
            }
            if (testPass.listTestMgr[0].alias != null && testPass.listTestMgr[0].alias != undefined) {
                $("div[title='tester']").text(testPass.listTestMgr[0].alias);
                $("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2_checkNames").trigger('click');
                $('#Auto').val(testPass.listTestMgr[0].userName)
                var hdn = testPass.listTestMgr[0].userName + "|" + testPass.listTestMgr[0].spUserId + "|" + testPass.listTestMgr[0].email
                $('#Auto_Hdn').val(hdn)


                testpass.oldTestManager = testPass.listTestMgr[0].alias;
            }
            if (testPass.listTestMgr[0].userName != null && testPass.listTestMgr[0].userName != undefined) {
                testpass.oldTestManagerFullName = testPass.listTestMgr[0].userName;
            }
            if (testPass.listTestMgr[0].email != null && testPass.listTestMgr[0].email != undefined) {
                document.getElementById('hiddenMailId').value = testPass.listTestMgr[0].email;
                testpass.oldTestMngrMailId = document.getElementById('hiddenMailId').value;
            }

            testpass.testCaseCount = testPass.totalTestCaseCount;
            testpass.tempTMname = testPass.listTestMgr[0].userName;
            testpass.tempHdnTMname = hdn;
            document.getElementById('testCaseCount').innerHTML = 'Total ' + testpass.gConfigTestCase + '(s):' + testpass.testCaseCount;
        }

        Main.hideLoading();

        //To disable the Create and view links on edit mode
        //$(".navTabs h2:eq(0)").attr("disabled",true).css("cursor","default");
        //$(".navTabs h2:eq(1)").attr("disabled",true).css("cursor","default");


        /************************************/
    },

    delTestPass: function (id) {
        for (var i = 0; i < testpass.allTestPasses.length; i++) {
            if (testpass.allTestPasses[i]['totalTestCaseCount'] != undefined && testpass.allTestPasses[i]['totalTestCaseCount'] != '' && testpass.allTestPasses[i]['totalTestCaseCount'] != '0' && testpass.allTestPasses[i]['testPassId'] == id) {
                testpass.alertBox('You are not allowed to delete the ' + testpass.gConfigTestPass + '. First delete the ' + testpass.gConfigTestCase + 's under this ' + testpass.gConfigTestPass + '.');//added by Mohini for resource file
                Main.hideLoading();
                return;
            }
        }
        var flag = 0;
        if (testpass.allTestPasses.length == 1) {
            if (testpass.allTestPasses[0].listTestMgr[0].spUserId == _spUserId)
                flag = 1;
        }
        if (flag == 1)
            $("#divConfirm").text('You will be no more the ' + $("#lblTestManager").text().substring(0, $("#lblTestManager").text().length - 2) + ' under this ' + testpass.gConfigProject + ' as this is the only remaining ' + testpass.gConfigTestPass + ' assigned to you. Are you sure you want to delete?');//added by Mohini for resource file							
        else
            $("#divConfirm").text('Are you sure you want to delete?');


        $("#dialog:ui-dialog").dialog("destroy");

        $("#divConfirm").dialog({
            autoOpen: false,
            resizable: false,
            //width: 'auto',
            height: 140,
            modal: true,
            buttons: {

                "Delete": function () {
                    Main.showLoading();
                    //testpass.alertBox('You are not allowed to delete the '+testpass.gConfigTestPass+'. First delete the '+testpass.gConfigTestCase+'s under this '+testpass.gConfigTestPass+'.');//added by Mohini for resource file
                    var data = { "testpassId": id.toString() };
                    var result = ServiceLayer.DeleteData("DeleteTestPass", data, 'TestPass');
                    if (result != '' && result != undefined) {
                        if (result == "Done")
                            setTimeout('testpass.delOk(' + id + ');', 100);
                        else
                            testpass.alertBox('Sorry! Something went wrong, please try again!');
                    }
                    else
                        testpass.alertBox('Sorry! Something went wrong, please try again!');

                    $(this).dialog("close");
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }
        });

        $('#divConfirm').dialog("open");

        setTimeout($.unblockUI, 100);
    },

    delOk: function (id) {
        //testpass.alertBox(testpass.gConfigTestPass+' deleted successfully!!');
        Main.AutoHideAlertBox(testpass.gConfigTestPass + ' deleted successfully!!');

        for (var ii = 0; ii < testpass.allTestPasses.length; ii++) {
            if (testpass.allTestPasses[ii].testPassId == id) {
                testpass.allTestPasses.splice(ii, 1);
                break;
            }
        }

        var userAsso = [];
        var flag = 0;
        if (security.userAssociationForProject[show.projectId] != undefined && security.userAssociationForProject[show.projectId] != "") {
            userAsso = security.userAssociationForProject[show.projectId];
            if (($.inArray('1', userAsso) == -1 && $.inArray('2', userAsso) == -1 && $.inArray('5', userAsso) == -1) && testpass.allTestPasses.length == 1)
                flag = 1;
        }
        var mananger = 0;
        for (var i = 0; i < security.userType.length; i++) {
            if (security.userType[i] == "2")
                mananger++;
        }
        if ((flag == 1) && ($.inArray('1', security.userType) == -1) && ($.inArray('2', security.userType) == -1) && ($.inArray('5', security.userType) == -1) && (mananger == 1))
            window.location.href = "Dashboard.aspx";
        else {
            if ($.inArray('1', security.userType) == -1 && testpass.allTestPasses.length == 1)//Removing the entry from Project drop down
            {
                var userAssForPrj = new Array();
                //
                if (security.userAssociationForProject[show.projectId] != undefined) {
                    userAssForPrj = security.userAssociationForProject[show.projectId];

                    if ($.inArray('2', userAssForPrj) == -1 && $.inArray('5', userAssForPrj) == -1) {
                        //var select=document.getElementById('projectNames');
                        var select = show.projectId;

                        for (i = 0; i < select.length; i++) {
                            if (select.options[i].value == show.projectId) {
                                select.remove(i);
                                break;
                            }
                        }
                    }
                }
                //
            }
        } // End of else

        //testpass.startIndexDecrement();
        if (id == $("#hid").val()) {
            testpass.reset();
        }

        var len = testpass.arrtest1.length;
        if (len > 0) {
            tpid = testpass.arrtest1[1];
            show.testPassId = tpid;
            testpass.selectRow1(show.testPassId);
        }
        testpass.pagination();

    },

    testCaseCount: '',
    SPUserIDOfTestManagerForTestPassID: new Array(),
    TestManagerForTestPassID: new Array(),
    TPNameForTPId: new Array(),
    /* Function to show the test pass table*/
    showTestPass: function () {
        testpass.itemCount = 0;
        var arr = new Array();
        var projectID = show.projectId;

        if (testpass.allTestPasses != null && testpass.allTestPasses != undefined) {
            testpass.itemCount = testpass.allTestPasses.length;
            testpass.allTestPasses = testpass.allTestPasses.sort(function (a, b) {
                return a.testPassId - b.testPassId
            });
        }

        testpass.arrtest1.splice(0, testpass.arrtest1.length);//to make testpass.arrtest1 empty 
        testpass.TestManagerForTestPassID.splice(0, testpass.TestManagerForTestPassID.length);
        testpass.TPNameForTPId.splice(0, testpass.TPNameForTPId.length);

        if (testpass.itemCount > 0) {
            for (var j = testpass.allTestPasses.length - 1; j >= 0; j--) {
                if (testpass.SPUserIDOfTestManagerForTestPassID[testpass.allTestPasses[j].testPassId] == undefined)
                    testpass.SPUserIDOfTestManagerForTestPassID[testpass.allTestPasses[j].testPassId] = testpass.allTestPasses[j].listTestMgr[0].spUserId;

                var testPassId = ((testpass.allTestPasses[j].testPassId != null) || (testpass.allTestPasses[j].testPassId != undefined)) ? testpass.allTestPasses[j].testPassId : "-";
                var testPassNm = ((testpass.allTestPasses[j].testPassName != null) || (testpass.allTestPasses[j].testPassName != undefined)) ? testpass.allTestPasses[j].testPassName : "-";
                var tsttTester = ((testpass.allTestPasses[j].listTestMgr[0].userName != null) || (testpass.allTestPasses[j].listTestMgr[0].userName != undefined)) ? testpass.allTestPasses[j].listTestMgr[0].userName : "-";
                testpass.TestManagerForTestPassID[testPassId] = ((testpass.allTestPasses[j].listTestMgr[0].email != null) || (testpass.allTestPasses[j].listTestMgr[0].email != undefined)) ? testpass.allTestPasses[j].listTestMgr[0].email : " ";
                if ((testpass.allTestPasses[j].tpStartDate != null) || (testpass.allTestPasses[j].tpStartDate != undefined)) {
                    /*var testPaCreDate=testpass.allTestPasses[j].tpStartDate; 		       
					var sliceNDate=testPaCreDate.slice(0,10);
					var splitCrDate=sliceNDate.split("-");
					var finCreateDate=splitCrDate[1]+'/'+splitCrDate[2]+'/'+splitCrDate[0];*/
                    var finCreateDate = testpass.allTestPasses[j].tpStartDate;
                }

                if ((testpass.allTestPasses[j].tpEndDate != null) || (testpass.allTestPasses[j].tpEndDate != undefined)) {
                    /*var testPaDueDate=testpass.allTestPasses[j].tpEndDate;
					var sliceNDate=testPaDueDate.slice(0,10);
					var splitDueDate=sliceNDate.split("-");
					var finDueDate=splitDueDate[1]+'/'+splitDueDate[2]+'/'+splitDueDate[0];*/
                    var finDueDate = testpass.allTestPasses[j].tpEndDate;
                }
                testPassNm = testPassNm.replace(/"/g, "&quot;");

                if ((testpass.allTestPasses[j].testPassId != null) || (testpass.allTestPasses[j].testPassId != undefined)) {
                    var testPassId = testpass.allTestPasses[j].testPassId.toString();
                    testpass.arrtest1.push(testPassId);
                    testpass.TPNameForTPId[testPassId] = testPassNm;
                }

                $('#testPassGrid table').show();
                var sampleMarkupTemp = "";
                sampleMarkupTemp = sampleMarkupTemp + '<tr id="' + testPassId + '" onclick="testpass.selectRow1(' + testPassId + ');"><td valign="top" class="center"><span>' + testPassId + '</span></td><td  align="left" valign="top"><span title="' + testPassNm + '">' + testPassNm + '</span></td><td align="left" valign="top"><span title="' + tsttTester + '">' + tsttTester + '</span></td><td align="left" valign="top"><span>' + finCreateDate + '</span></td><td align="left" valign="top"><span>' + finDueDate + '</span></td><td  align="center" valign="top"> <a title="Edit ' + testpass.gConfigTestPass + ' Details" style="cursor:pointer;"  onclick="Main.showLoading();setTimeout(\'testpass.fillForm(' + testPassId + ')\',200);"><img style="width: 25px; height: 25px;padding-right:3px" src="/images/Admin/Edit1.png"</a> <a onclick="testpass.delTestPass(' + testPassId + ');" style="cursor:pointer;" title="Delete ' + testpass.gConfigTestPass + '"' + '><img style="width: 25px; height: 25px" src="/images/Admin/Garbage1.png"></a></td></tr>';
                arr.push(sampleMarkupTemp);
            }
        }
        return arr;
    },

    arrPage: new Array(),
    initpage: function (page_index, jq) {

        var items_per_page = 10;
        var max_elem = Math.min((page_index + 1) * items_per_page, testpass.arrPage.length);
        var newhtml = '';
        for (var i = page_index * items_per_page; i < max_elem; i++) {
            newhtml = newhtml + testpass.arrPage[i];
        }
        if (newhtml == '') {
            $("#Pagination1").css('display', 'none');
            $('#showTestPass').html("");
            $("#noP").css('display', '');
            $("#testPassGrid").css('display', 'none');
            $("#begTest").hide();
            $("#testResult").hide();
            Main.hideLoading();
        }
        else {
            $('#showTestPass').html(newhtml);
            //resource.updateTableColumnHeadingTesMgnt();//added by mohini for resource file
            $("#Pagination1").css('display', '');
            $("#noP").css('display', 'none');
            $("#testPassGrid").css('display', '');
            $("#begTest").show();
            $("#testResult").show();
            testpass.selectRow1(show.testPassId);
        }
        return false;
    },
    pagination: function () {
        Main.showLoading();
        testpass.arrPage = testpass.showTestPass();
        var len = testpass.arrPage.length;
        testpass.countVal = ((len) >= 10) ? (len) : ('0' + (len));
        if (testpass.countVal == 00) {
            $("#countDiv").css('display', 'none');
        }
        else {
            $("#countDiv").css('display', '');
            $("#labelCount").html(testpass.countVal);
        }

        if (len != 0) {
            var val = show.testPassId;
            if (val == "" || val == undefined) {
                testpass.pageIndex = 0;
                if (testpass.arrtest1.length > 0) {
                    show.testPassId = testpass.arrtest1[0];
                }
            }
            else {
                var val3 = $.inArray(val, testpass.arrtest1);

                if (val3 == -1) {
                    testpass.pageIndex = 0;

                }
                else {
                    if (val3 != 0) {
                        if ((val3 / 10).toString().indexOf(".") != -1) {
                            if ((val3 / 10).toString().indexOf(".") != -1)
                                testpass.pageIndex = Math.ceil(val3 / 10) - 1;
                            else
                                testpass.pageIndex = Math.ceil(val3 / 10);
                        }
                        else
                            testpass.pageIndex = Math.ceil(val3 / 10);
                    }
                    else
                        testpass.pageIndex = 0;
                }
            }
        }
        $("#Pagination1").pagination(len, {
            callback: testpass.initpage,
            items_per_page: 10,
            num_display_entries: 10,
            current_page: testpass.pageIndex,
            num: 2
        });
        Main.hideLoading();

    },

    resolveTesterFullName: function (leadStr) {

        var subStr = new Array();
        /**Logic to remove the extra code attached to the user names**/
        while (leadStr.length != 0) {
            if ((leadStr.indexOf("displaytext=")) == -1)
                break;

            var sub2 = leadStr.substring(leadStr.indexOf("displaytext=") + 13, leadStr.indexOf("isresolved=") - 2);
            subStr.push(sub2);
            leadStr = leadStr.substring(leadStr.indexOf("isresolved=") + 12, leadStr.length - 1);


        }
        /************************************************************/

        return subStr;

    },

    resolveTesterName: function (leadStr) {

        var subStr = new Array();
        /**Logic to remove the extra code attached to the user names**/
        while (leadStr.length != 0) {
            index1 = leadStr.indexOf("key=");
            index2 = leadStr.indexOf("displaytext=");
            if (index1 == -1)
                break;
            if (subStr == "")
                //subStr=subStr+leadStr.substring(index1+5,index2-2);
                subStr.push(leadStr.substring(index1 + 5, index2 - 2));
            else
                //subStr=subStr+','+leadStr.substring(index1+5,index2-2);
                subStr.push(leadStr.substring(index1 + 5, index2 - 2));

            leadStr = leadStr.substring(index2 + 12, (leadStr.length - 1));
        }
        /************************************************************/

        return subStr;
    },

    resolveSPUserID: function (str) {

        var subStr = new Array();
        while (str.length != 0) {

            /********Logic for extracting SPUserID*********/

            index = str.indexOf("SPUserID");

            if (index == -1)
                break;

            var subTester = str.substring(str.indexOf("SPUserID"), str.length);
            subTester = subTester.substring(subTester.indexOf("xsd"), subTester.length);
            subTester = subTester.substring(subTester.indexOf(";") + 1, subTester.length);
            var SPUserID = subTester.substring(subTester.indexOf(";") + 1, subTester.indexOf("&lt"));

            if (SPUserID == "")
                subStr.push(subTester.substring(subTester.indexOf(";") + 1, subTester.indexOf("&lt")));

            else
                subStr.push(subTester.substring(subTester.indexOf(";") + 1, subTester.indexOf("&lt")));

            str = subTester.substring(subTester.indexOf(";") + 1, subTester.length);


        }

        return subStr;
    },

    resolveTesterEmail: function (str) {

        var subStr = new Array();
        while (str.length != 0) {

            /********Logic for extracting mail id*********/

            index = str.indexOf("Email");

            if (index == -1)
                break;

            var subTester = str.substring(str.indexOf("Email"), str.length);
            subTester = subTester.substring(subTester.indexOf("xsd"), subTester.length);
            subTester = subTester.substring(subTester.indexOf(";") + 1, subTester.length);
            var emailId = subTester.substring(subTester.indexOf(";") + 1, subTester.indexOf("&lt"));

            if (emailId == "")
                subStr.push(subTester.substring(subTester.indexOf(";") + 1, subTester.indexOf("&lt")));

            else
                subStr.push(subTester.substring(subTester.indexOf(";") + 1, subTester.indexOf("&lt")));

            str = subTester.substring(subTester.indexOf(";") + 1, subTester.length);


        }

        return subStr;
    },

    selectRow1: function (tId) {
        $('#showTestPass tr').attr('class', '');

        var len = $('#showTestPass tr').length;
        for (var ii = 0; ii <= len; ii++)
            $('#showTestPass tr:eq(' + ii + ') td:eq(1)').attr('class', 'selTD'); //s


        $('#showTestPass tr[id="' + tId + '"]').attr('class', 'rowSelected');

        $('#showTestPass tr[id="' + tId + '"] td:eq(1)').attr('class', 'rowSelected');
        show.testPassId = tId;
    },

    /* Function to show jquery alert box */
    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },
    noPrjFlag: 0,
    alertBox2: function (msg) {
        $("#divAlert2").text(msg);
        $('#divAlert2').dialog({
            modal: true, buttons:
				{
				    "Ok": function () {
				        if (testpass.noPrjFlag == 1) {
				            window.location.pathname = 'Dashboard/ProjectMgnt';
				            //  window.location.href = Main.getSiteUrl() + '/SitePages/ProjectMgnt_1.aspx';
				        }
				        else if (testpass.notesterFlag == 1) {
				            window.location.pathname = 'Tester';
				            // window.location.href = Main.getSiteUrl() + '/SitePages/Tester_1.aspx?pid=' + show.projectId + "&tpid=" + show.testPassId;
				        }
				        else if (testpass.noTCTSFlag == 1) {
				            window.location.pathname = 'TestCase';
				            // window.location.href = Main.getSiteUrl() + '/SitePages/testcase_1.aspx?pid=' + show.projectId + '&tpid=' + show.testPassId;
				        }
				        $(this).dialog("close");
				    },
				    "Cancel": function () {
				        testpass.noTCTSFlag = 0;//Added by Mohini for email functionality Bug Id:12236 DT:06-08-2014 
				        testpass.notesterFlag = 0;//Added by Mohini for email functionality Bug Id:12235 DT:06-08-2014 
				        $(this).dialog("close");
				    }
				}
        });
    },
    /*For sending the email functionality */
    testerEmailIds: '',
    arrofTester: new Array(),
    arrofTesterIDs: new Array(),
    notesterFlag: 0,
    noTCTSFlag: 0,
    TSandTesterDetails: new Array(),
    validationbeforeSendingEmail: function (num) {
        Main.showLoading();
        testpass.testerEmailIds = '';
        testpass.TSandTesterDetails = [];
        var tpid = '';
        if (show.testPassId != undefined && show.testPassId != '')
            tpid = show.testPassId;
        else {
            if (testpass.allTestPasses != undefined) {
                var l = testpass.allTestPasses.length;
                if (l != 0) {
                    tpid = testpass.allTestPasses[l - 1]['testPassId'];
                    show.testPassId = tpid;
                    testpass.selectRow1(tpid);
                }
            }
        }

        var testerRecords = ServiceLayer.GetData("GetAllTesterRolePFNCountForTestPassId", tpid, "TestPass");
        if (testerRecords == undefined || testerRecords == null) {
            testpass.notesterFlag = 1;
            //testpass.alertBox2('Sorry! No '+testpass.gConfigTester+' is available for selected '+testpass.gConfigTestPass+' ! Please create the '+testpass.gConfigTester+' First.');
            testpass.alertBox2('Sorry! No ' + testpass.gConfigTester + ' is assigned to this ' + testpass.gConfigTestPass + '! Please assign the ' + testpass.gConfigTester + ' first.');
            Main.hideLoading();
            return;
        }
        else {
            if (testerRecords.length == 0) {
                testpass.notesterFlag = 1;
                testpass.alertBox2('Sorry! No ' + testpass.gConfigTester + ' is assigned to this ' + testpass.gConfigTestPass + '! Please assign the ' + testpass.gConfigTester + ' first.');
                Main.hideLoading();
                return;
            }
            else if (testerRecords.testPassStatus.toLowerCase() == "tester not present") {
                testpass.notesterFlag = 1;
                testpass.alertBox2('Sorry! No ' + testpass.gConfigTester + ' is assigned to this ' + testpass.gConfigTestPass + '! Please assign the ' + testpass.gConfigTester + ' first.');
                Main.hideLoading();
                return;
            }
            else if (testerRecords.testPassStatus.toLowerCase() == "tester present") {
                testpass.noTCTSFlag = 1;
                testpass.alertBox2('Sorry! No ' + testpass.gConfigTestCase + " or " + testpass.gConfigTestStep + ' is available for selected ' + testpass.gConfigTestPass + ' ! Please create the ' + testpass.gConfigTestCase + " or " + testpass.gConfigTestStep + ' First.');
                Main.hideLoading();
                return;
            }
        }

        if (testerRecords != undefined || testerRecords != null) {
            if (testerRecords.length != 0) {
                testpass.TSandTesterDetails = testerRecords;
                $("#pieChart").html('');
                /*////*/
                var countPass = 0;
                var countNC = 0;
                var countFail = 0;
                var total = 0;
                var data0 = new Array();
                var emailIds = [];
                for (var i = 0; i < testerRecords.listTesterRolePFNCount.length; i++) {
                    countPass = countPass + parseInt(testerRecords.listTesterRolePFNCount[i].passCount);
                    countFail = countFail + parseInt(testerRecords.listTesterRolePFNCount[i].failCount);
                    //countNC = countNC + parseInt(testerRecords.listTesterRolePFNCount[i].NCCount);
                    countNC = countNC + parseInt(testerRecords.listTesterRolePFNCount[i].ncCount);
                    if ($.inArray(testerRecords.listTesterRolePFNCount[i].testerEmail, emailIds) == -1) {
                        testpass.testerEmailIds = testpass.testerEmailIds + ";" + testerRecords.listTesterRolePFNCount[i].testerEmail;
                        emailIds.push(testerRecords.listTesterRolePFNCount[i].testerEmail);
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

                data0.push(temp1);
                data0.push(temp2);
                data0.push(temp3);
                var npdata = data0;
                /*//////////*/


                if (total == 0) {
                    testpass.noTCTSFlag = 1;
                    testpass.alertBox2('Sorry! No ' + testpass.gConfigTestCase + " or " + testpass.gConfigTestStep + ' is available for selected ' + testpass.gConfigTestPass + ' ! Please create the ' + testpass.gConfigTestCase + " or " + testpass.gConfigTestStep + ' First.');
                    Main.hideLoading();
                    return;
                }

                if (npdata.length == 0 || npdata == undefined || npdata == null || isNaN(npdata[0]) == true) {
                    $('#pieChart').hide();
                }
                else {
                    if (npdata[0] == 0 && npdata[1] == 0 && npdata[2] == 0) {
                        $('#pieChart').hide();
                    }
                    else {
                        //$('#pieChart').show();	
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


                if (num == 0)
                    setTimeout('testpass.sendEmailForBeginTesting();', 200);
                else if (num == 1)
                    setTimeout('testpass.sendEmailForTestResult();', 200);
            }
            else {
                testpass.notesterFlag = 1;
                //testpass.alertBox2('Sorry! No '+testpass.gConfigTester+' is available for selected '+testpass.gConfigTestPass+' ! Please create the '+testpass.gConfigTester+' First.');
                testpass.alertBox2('Sorry! No ' + testpass.gConfigTester + ' is assigned to this ' + testpass.gConfigTestPass + '! Please assign the ' + testpass.gConfigTester + ' first.');
                Main.hideLoading();
                return;
            }

        }
        else {
            testpass.notesterFlag = 1;
            //testpass.alertBox2('Sorry! No '+testpass.gConfigTester+' is available for selected '+testpass.gConfigTestPass+' ! Please create the '+testpass.gConfigTester+' First.');
            testpass.alertBox2('Sorry! No ' + testpass.gConfigTester + ' is assigned to this ' + testpass.gConfigTestPass + '! Please assign the ' + testpass.gConfigTester + ' first.');
            Main.hideLoading();
            return;
        }
    },
    nameSpace: null,
    mailFolder: null,
    mailItem: null,
    tempDoc: null,
    outlookApp: null,

    sendEmailForBeginTesting: function () {
        var uname = '';
        if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Outlook mail' feature"); // shilpa 12 apr
        }
        else {
            var stat = 0;
            try {
                testpass.outlookApp = new ActiveXObject("Outlook.Application");
                var object = new ActiveXObject("Scripting.FileSystemObject");
                var WinNetwork = new ActiveXObject("WScript.Network");
                uname = WinNetwork.username;
                stat = 1;
            }
            catch (ex) {
                Main.showPrerequisites("Prerequisites for 'Outlook mail' feature"); // shilpa 12 apr
            }
            if (stat == 0) {
                Main.hideLoading();
                return;
            }

            try {
                ///////////////////////////////////////////////
                if ($(".rowSelected").html() == null)
                    testpass.selectRow1(1);
                if (isPortfolioOn)
                    $(".celebsMAWithoutPortfolio").remove();
                var membersForinitMAPagination = getMyActivity();
                var member = membersForinitMAPagination.length;
                $("#MyActPagination").pagination(member, {
                    callback: pageselectMACallback,
                    items_per_page: 5,
                    num_display_entries: 10,
                    num: 2
                });
                function getMyActivity() {
                    var data = new Array();
                    var email = '';
                    var arr = testpass.TSandTesterDetails.listTesterRolePFNCount;
                    for (var ii = 0; ii < arr.length; ii++) {
                        if (arr[ii].passCount != undefined || arr[ii].failCount != undefined || arr[ii].NCCount != undefined) {
                            if ((arr[ii].passCount != 0 || arr[ii].failCount != 0 || arr[ii].NCCount != 0) && (email == '')) {
                                email = arr[ii].testerEmail;
                                var DueDate = $(".rowSelected td").eq(4).text();
                                var objDueDate = new Date(DueDate);
                                objDueDate.setHours("23");
                                objDueDate.setMinutes("59");
                                objDueDate.setSeconds("59");
                                var currentDate = new Date();


                                var NoOfDays = 0;
                                var ddSplit = $(".rowSelected td").eq(4).text().split('/');
                                var StartDate = $(".rowSelected td").eq(3).text().split('/');


                                var DueDate = new Date(ddSplit[2], ddSplit[0] - 1, ddSplit[1], '23', '59', '59');
                                var CurrentDate = new Date();
                                CurrentDate = new Date(CurrentDate.getFullYear(), CurrentDate.getMonth(), CurrentDate.getDate());
                                var sDate = new Date(StartDate[2], StartDate[0] - 1, StartDate[1]);
                                var DueDateTime = DueDate.getTime();

                                if (CurrentDate < sDate) {
                                    while (sDate.getTime() <= DueDateTime) {
                                        NoOfDays++;
                                        sDate.setTime(parseInt(sDate.getTime()) + 86400000);
                                    }

                                }
                                else {
                                    if (CurrentDate.getTime() < DueDateTime) {
                                        while (CurrentDate.getTime() <= DueDateTime) {
                                            NoOfDays++;
                                            CurrentDate.setTime(parseInt(CurrentDate.getTime()) + 86400000);
                                        }
                                    }
                                    else {
                                        NoOfDays = 0;
                                    }
                                }

                            }
                            if ((email == arr[ii].testerEmail) && (arr[ii].passCount != 0 || arr[ii].failCount != 0 || arr[ii].NCCount != 0)) {
                                var markup = '';
                                markup = '';
                                var pass = 0;
                                var fail = 0;
                                var NC = 0;
                                pass = arr[ii].passCount;
                                fail = arr[ii].failCount;
                                NC = arr[ii].NCCount;

                                if (parseInt(pass) == 0 && parseInt(fail) == 0)
                                    var action = 'Begin Testing';
                                else if (parseInt(NC) == 0)
                                    var action = 'Testing Complete';
                                else
                                    var action = 'Continue Testing';
                                //var StatusCount = [0,1,2];
                                pass = parseInt(pass); fail = parseInt(fail); NC = parseInt(NC);

                                var finalAction = "";
                                var endDTPassed = true;
                                if (objDueDate >= currentDate) {
                                    finalAction = action;
                                    endDTPassed = false;
                                }
                                else if (objDueDate < currentDate && action == "Continue Testing") {
                                    finalAction = "Testing Incomplete";
                                }
                                else if (objDueDate < currentDate && action == "Begin Testing") {
                                    finalAction = "Testing Incomplete";
                                }
                                else if (objDueDate < currentDate && action == "Testing Complete") {
                                    finalAction = "Testing Complete";
                                }
                                if (endDTPassed)
                                    tdAction = '<td class="myActLinkOrng">' + finalAction + '</td>';
                                else
                                    tdAction = '<td class="myActLinkOrng"><a style="color: #0033CC;cursor: pointer;text-decoration: underline;" class="myActLinkOrng" >' + finalAction + '</a></td>';


                                var pName = $("#projectTitle label").attr('title');
                                var tpName = $("#showTestPass .rowSelected td").eq(1).text();
                                if (isPortfolioOn) {
                                    markup += '<tr>' +
				                             '<td title="' + pName + '">' + trimText(pName, 7) + '</td>' +
				                             '<td title="' + $("#versionTitle .rgBCTitle").attr("title") + '">' + trimText($("#versionTitle .rgBCTitle").attr("title"), 10) + '</td>' +
				                             '<td title="' + tpName + '">' + trimText(tpName, 7) + '</td>' +
				                             '<td><span title="' + arr[ii].testerRoleName + '">' + trimText(arr[ii].testerRoleName, 8) + '</span></td>' +
				                             '<td>' + NoOfDays + '</td>' +
				                             '<td class="NC">' + NC + '</td>' +
				                             '<td class="Pass">' + pass + '</td>' +
				                             '<td class="Fail">' + fail + '</td>' +
				                             tdAction +
				                             '<td style="text-align:center"><img title="Download Testing Template" alt="" src="../SiteAssets/images/icon-download-2.jpg" style="height:15px;padding-right:5px;margin-top:0px;cursor:pointer;" /><img title="Upload Testing Template" alt=""  src="../SiteAssets/images/icon-upload-2.jpg" style="height:15px;margin-top:5px;cursor:pointer" /></td>' +
				                             '</tr>';
                                }
                                else {
                                    markup += '<tr>' +
				                             '<td title="' + pName + '">' + trimText((pName), 9) + '</td>' +
				                             '<td style="display:none" title="' + $("#versionTitle .rgBCTitle").attr("title") + '">' + trimText($("#versionTitle .rgBCTitle").attr("title"), 10) + '</td>' +
				                             '<td title="' + tpName + '">' + trimText(tpName, 7) + '</td>' +
				                             '<td><span title="' + arr[ii].testerRoleName + '">' + trimText(arr[ii].testerRoleName, 8) + '</span></td>' +
				                             '<td>' + NoOfDays + '</td>' +
				                             '<td class="NC">' + NC + '</td>' +
				                             '<td class="Pass">' + pass + '</td>' +
				                             '<td class="Fail">' + fail + '</td>' +
				                             tdAction +
				                             '<td style="text-align:center"><img title="Download Testing Template" alt="" src="../SiteAssets/images/icon-download-2.jpg" style="height:15px;padding-right:5px;margin-top:0px;cursor:pointer;" /><img title="Upload Testing Template" alt="" src="../SiteAssets/images/icon-upload-2.jpg" style="height:15px;margin-top:5px;cursor:pointer" /></td>' +
				                             '</tr>';
                                }
                                data.push(markup);
                            }
                        }
                    }

                    return data;
                }
                function pageselectMACallback(page_index, jq) {
                    var items_per_page = 5;
                    var max_elem = Math.min((page_index + 1) * items_per_page, membersForinitMAPagination.length);
                    //var newcontent = '';
                    var data = membersForinitMAPagination;
                    var markup = '';
                    for (var i = page_index * items_per_page; i < max_elem; i++) {
                        markup += membersForinitMAPagination[i];
                    }

                    $('#myact').empty().html(markup);
                }

                //////////////////////////////////////////////
                /*var Source = substring+"/SiteAssets/GuidelineDocs/Project Unus - UAT Test Pass - UAT App Training Deck.pptx";
                var myItem = testpass.outlookApp.CreateItem(olMailItem) 
                myItem.Attachments.Add( Source, _olByValue, 1, "Test"  myItem.Display );*/
                var imageURL = '';
                $("#myactImg").show();//spanMA

                html2canvas($('#divTester'), {//spanMA
                    onrendered: function (canvas) {
                        try {
                            var img = canvas.toDataURL();
                            $("#myactImg").hide();
                            var img2 = img.split(",")[1];
                            //#Rupal  AddAttachment(img2);
                            var _attdId = AddAttachment(img2);
                            var r = window.location.href.split('/');
                            var FrontEndUrl = r[0] + "//" + r[2];


                            var url = window.location.href;
                            var index = url.indexOf("SitePages");
                            var substring = url.substr(0, index);
                            var lead = ((show.selectedProjectLeadEmailId != null) || (show.selectedProjectLeadEmailId != undefined)) ? show.selectedProjectLeadEmailId : " ";
                            var manager = ((testpass.TestManagerForTestPassID[show.testPassId] != null) || (testpass.TestManagerForTestPassID[show.testPassId] != undefined)) ? testpass.TestManagerForTestPassID[show.testPassId] : " ";
                            testpass.nameSpace = testpass.outlookApp.getNameSpace("MAPI");
                            testpass.mailFolder = testpass.nameSpace.getDefaultFolder(6);
                            testpass.mailItem = testpass.mailFolder.Items.add('IPM.Note.FormA');
                            testpass.mailItem.Subject = "Begin Testing on the '" + testpass.TPNameForTPId[show.testPassId] + "' UAT test pass for the '" + show.selectedProjectName + "' project";

                            /*var Source = substring+"/SiteAssets/GuidelineDocs/Project Unus - UAT Test Pass - UAT App Training Deck.pptx";
                            testpass.mailItem.Attachments.Add(Source);*/

                            //#Rupal 
                            //var Source = substring + "/" + imageURL;
                            //testpass.mailItem.Attachments.Add(Source);


                            var imageBytes = AutoCompleteTextbox._testpassAttachmentForEmail(_attdId);

                            var image = new Image();
                            image.src = ServiceLayer.serviceURL + '/TestPass/GetAttachmentFile' + '?id=' + _attdId + '&_Appurl=' + ServiceLayer.appurl;;
                            var imgformail = $('#ImgEmail').html(image.outerHTML).html();
                            $(imgformail).show();
                            var url = window.location.href;

                            //  var w = window.open("");
                            //w.document.write(image.outerHTML);
                           // var Source = substring + "/" + image.outerHTML;
                          //  var Source = ServiceLayer.serviceURL + "/" + image +"/"+ ServiceLayer.appurl;
                         // var url = ServiceLayer.serviceURL + '/TestPass/GetAttachmentFile_Core2?id=' + _attdId + '&Url=' + ServiceLayer.appurl; 
                          //var matches = imgSrc.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                          //var baseStr = matches[2];

                          //  var data = {
                          //      "file": baseStr.toString()
                          //  };
                            //testpass.mailItem.Attachments.Add(image.outerHTML);
                            //var url = ServiceLayer.serviceURL + '/Report/GetFileToDownload?baseStr=' + baseStr + '&Url=' + ServiceLayer.appurl;
                            //var url = ServiceLayer.serviceURL + '/TestPass/GetFileToDownload?baseStr=' + baseStr.toString() + '&Url=http://localhost:1581/';
                          //var win = window.open(url, "_blank");
                          //win.focus();
                          //testpass.mailItem.Attachments.Add(url);
                            // testpass.mailItem.Attachments.Add("https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg");
                            //   testpass.mailItem.Attachments.Add(Source);
                           //var imgSrc = $(image.outerHTML).attr(url);
                            testpass.mailItem.To = testpass.testerEmailIds;//Testers EmailIds
                            testpass.mailItem.Cc = lead + ";" + manager;//Lead and manager's emailId
                            var mg_source = "";
                            //testpass.mailItem.HTMLBody = "<html><body><font face='Calibri'>Hello Team,<br /><br />Please begin testing on the '" + testpass.TPNameForTPId[show.testPassId] + "' UAT test pass for the '" + show.selectedProjectName + "' project by clicking <a href='" + substring + "/SitePages/Dashboard.aspx' target='_blank'>here</a>.&nbsp;There you’ll see a My Activities grid on the home page; simply click Begin Testing to get started, for the testing role(s) to which you have been assigned.  You can learn all about the test taking UI, how to check your test results, provide functionality feedback and more by reviewing the UAT App Training Deck attached.<br /><br />Thanks for your participation,<br />"
                            //+"UAT Team<br /><img alt='error' src='" + image.src + "' /></font></body></html>";
                            //testResulte:\company project\uatv3.0\frontend\rgen.uat.uattoolfrontendlayer\src\rgen.uat.uattoolfrontendlayer\wwwroot\css\theme\orange\images\banner-feedback.jpg
                            //src='/images/banner-feedback.jpg'

                            testpass.mailItem.HTMLBody = "<html><body><font face='Calibri'>Hello Team,<br /><br />Please begin testing on the '" + testpass.TPNameForTPId[show.testPassId] + "' UAT test pass for the '" + show.selectedProjectName + "' project by clicking <a href=" + FrontEndUrl + "/Dashboard" + "  target='_blank'>here</a>.&nbsp;There you’ll see a My Activities grid on the home page; simply click Begin Testing to get started, for the testing role(s) to which you have been assigned.  You can learn all about the test taking UI, how to check your test results, provide functionality feedback and more by reviewing the UAT App Training Deck attached.<br /><br />Thanks for your participation,<br />"
                            + "UAT Team<br /><img alt='error' src='cid:A' /></font></body></html>";
                            //   $(".current").html(testpass.mailItem.HTMLBody);
                          
                            testpass.mailItem.VotingOptions = "Go;No Go";
                            testpass.mailItem.display(0);
                            window.setTimeout("Main.hideLoading()", 200);
                        }
                        catch (e) {
                            if (e.message.indexOf("You don't have appropriate permission") != -1)
                                showPreq('activeX-OutlookLI');
                            else if (e.message.indexOf("Operation Failed") != -1)
                                showPreq('activeX-OutlookAL');
                            else
                                alert(e);
                            window.setTimeout("Main.hideLoading()", 200);
                        }
                    }
                });

                function AddAttachment(baseStr) {
                    //var obj = new Array();
                    //  obj.push({ "title": msg.action})
                    //obj.push({
                    //    "Title": "New1",
                    //    "Qry": "Test"
                    //});
                    //var SPlistName = "testlist";
                    //var listname = jP.Lists.setSPObject(testpass.SiteURL, SPlistName);
                    //var result = listname.updateItem(obj);
                    //$().SPServices(
                    //            {
                    //                operation: "AddAttachment",
                    //                webURL: testpass.SiteURL,
                    //                listName: SPlistName,
                    //                listItemID: result.ID,
                    //                fileName: "Att.png",
                    //                attachment: baseStr,
                    //                async: false,
                    //                completefunc: AttResult
                    //            });

                    //#Rupal

                    var formData;
                    formData = new FormData();
                    var blob = new Blob([baseStr], { type: "octet/stream" })
                    formData.append('file1', blob);
                    var x = ServiceLayer.postFile('UploadAttachmentForMail', formData, 'testpass');


                    $().SPServices(
                                {
                                    operation: "AddAttachment",
                                   
                                    fileName: "Att.png",
                                    attachment: baseStr,
                                    async: false,
                                    completefunc: AttResult
                                });
                    return x;
                }
                function AttResult(xmlHttpRequest, status) {
                    imageURL = "";
                    if (status == "success")
                        imageURL = $(xmlHttpRequest.ResponseText).find('AddAttachmentResult').text();

                }
            }
            catch (e) {
                if (e.message.indexOf("You don't have appropriate permission") != -1)
                    showPreq('activeX-OutlookLI');
                else if (e.message.indexOf("Operation Failed") != -1)
                    showPreq('activeX-OutlookAL');
                else
                    alert(e);
                window.setTimeout("Main.hideLoading()", 200);
            }
        }
        function showPreq(id) {
            if (window.navigator.appName == "Microsoft Internet Explorer") {
                try {
                    var Activeobj = new ActiveXObject("WScript.shell");
                }
                catch (e) {
                }
                //if(Activeobj ==undefined)      
                {
                    $('#' + id).dialog({
                        height: 320,
                        width: 600,
                        modal: true,
                        title: "Prerequisites for 'Outlook mail' feature",
                        resizable: false,
                        position: [500, 300],
                        open: function () {
                            $(".ui-dialog-titlebar-close").show();
                            jQuery('.ui-widget-overlay').bind('click', function () {
                                jQuery('#activeX-form').dialog('close');
                            })
                        }
                    });

                    Main.hideLoading();
                    return;
                }
            }
            else return;
        }
    },
    Cleanup: function () {
        CollectGarbage();
    },
    sendEmailForTestResult: function () {
        if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Outlook mail' feature"); // shilpa 12 apr
        }
        else {
            var stat = 0;
            try {
                testpass.outlookApp = new ActiveXObject("Outlook.Application");
                stat = 1;
            }
            catch (ex) {
                Main.showPrerequisites("Prerequisites for 'Outlook mail' feature"); // shilpa 12 apr
            }
            if (stat == 0) {
                Main.hideLoading();
                return;
            }

            try {
                var url = window.location.href;
                var index = url.indexOf("SitePages");
                var substring = url.substr(0, index);
                
                var r = window.location.href.split('/');
                var FrontEndUrl = r[0] + "//" + r[2];

                var img = $("#pieChart").html();
                var lead = ((show.selectedProjectLeadEmailId != null) || (show.selectedProjectLeadEmailId != undefined)) ? show.selectedProjectLeadEmailId : " ";
                var manager = ((testpass.TestManagerForTestPassID[show.testPassId] != null) || (testpass.TestManagerForTestPassID[show.testPassId] != undefined)) ? testpass.TestManagerForTestPassID[show.testPassId] : " ";
                var stakeholder = ((show.selectedProjectStakeholdersEmailId != null) || (show.selectedProjectStakeholdersEmailId != undefined)) ? show.selectedProjectStakeholdersEmailId : " ";
                testpass.nameSpace = testpass.outlookApp.getNameSpace("MAPI");
                testpass.mailFolder = testpass.nameSpace.getDefaultFolder(6);
                testpass.mailItem = testpass.mailFolder.Items.add('IPM.Note.FormA');
                testpass.mailItem.Subject = "Email for Test Result";
                testpass.mailItem.To = lead + ";" + manager;//lead and manger's emailIds
                testpass.mailItem.Cc = stakeholder;//satkeholder's emailIds
                testpass.mailItem.HTMLBody = "<html><body><font face='Calibri (Body)'>Hello Team,<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>" + testpass.gConfigProject + " Name:</b></label>&nbsp;&nbsp;<label>" + show.selectedProjectName + "</label><br /><br />" +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>" + testpass.gConfigVersion + " Name:</b></label>&nbsp;&nbsp;<label>" + $('#versionTitle label').attr('title') + "</label><br /><br />" +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>" + testpass.gConfigTestPass + " Name:</b></label>&nbsp;&nbsp;<label>" + testpass.TPNameForTPId[show.testPassId] + "</label><br /><br />" +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href=" + FrontEndUrl + "/Dashboard" + " >UAT App</a><br /><br />" + img + "<br /><br />Regards,<br />UAT Support Team</font></body></html>";
                testpass.mailItem.VotingOptions = "Go;No Go";
                testpass.mailItem.display(0);
                window.setTimeout("Main.hideLoading()", 200);
              
                //<a href='" + substring + "/SitePages/Dashboard.aspx'>UAT App</a>
            }
            catch (e) {
                alert(e);
                window.setTimeout("Main.hideLoading()", 200);

            }
        }
    },
    forSPIDandRoleIDGetStatusCount: new Array(),
    calcProjectStata: function (testPassID, testPassName, bool) {
        //Pass, Fail and NC
        testpass.forSPIDandRoleIDGetStatusCount = new Array();
        var data0 = new Array();
        var data1 = new Array();
        var role = new Array();
        var countPass = 0;
        var countFail = 0;
        var countNC = 0;
        var temp = 0;
        var total = 0;
        var ffflag = 0;

        var testCaseItems2 = new Array();
        var testPassMapList = jP.Lists.setSPObject(Main.getSiteUrl(), 'TestCaseToTestStepMapping');
        var testPassMapQuery = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">' + testPassID + '</Value></Eq></Where><ViewFields><FieldRef Name="status"/></ViewFields></Query>';
        var testCaseItems2 = testPassMapList.getSPItemsWithQuery(testPassMapQuery).Items;
        if ((testCaseItems2 != 'undefined') && (testCaseItems2 != null)) {
            var arr = new Array();
            var c = 0;
            for (var xi = 0; xi < (testCaseItems2.length) ; xi++) {
                switch (testCaseItems2[xi]['status']) {
                    case 'Pass':
                        countPass++;
                        if (testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] == undefined)
                            testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] = "1,0,0";
                        else {
                            arr = testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']].split(",");
                            c = 1 + parseInt(arr[0]);
                            testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] = c + "," + arr[1] + "," + arr[2];
                        }
                        break;
                    case 'Fail':
                        countFail++;
                        if (testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] == undefined)
                            testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] = "0,1,0";
                        else {
                            arr = testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']].split(",");
                            c = 1 + parseInt(arr[1]);
                            testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] = arr[0] + "," + c + "," + arr[2];
                        }
                        break;
                    case 'Not Completed':
                        countNC++;
                        if (testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] == undefined)
                            testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] = "0,0,1";
                        else {
                            arr = testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']].split(",");
                            c = 1 + parseInt(arr[2]);
                            testpass.forSPIDandRoleIDGetStatusCount[testCaseItems2[xi]['SPUserID'] + ',' + testCaseItems2[xi]['Role']] = arr[0] + "," + arr[1] + "," + c;
                        }
                        break;
                }
            }

            if (bool == 3) {
                var countArr = new Array(countPass, countFail, countNC);
                return countArr;
            }


            total = countPass + countFail + countNC;
            //code updated to validate total value not exceed 100 and are not less than 100
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
            data1.push(countFail);
        }
        else { // handle null
            data0.push(0);
            data0.push(0);
            data0.push(0);
            data1.push(0);
            data1.push(0);
            data1.push(0);
            testpass.noTCTSFlag = 1;

        }
        return data0;
    }
    /**************************End of Email Functionality Code***************************/
}