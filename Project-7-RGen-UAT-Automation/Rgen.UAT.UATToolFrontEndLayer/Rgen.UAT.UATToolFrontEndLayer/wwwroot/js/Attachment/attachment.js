/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var attachment = {

    SiteURL: Main.getSiteUrl(),

    startIndexT: 0,

    startIndexA: 0,

    gAttlength: 0,

    EiForAction: 0,

    attID: 0,

    prjId: '',

    tpId: '',

    tcId: '',

    tsId: '',

    flagFound: "false",

    flag: false,

    tempResult: new Array(),

    tempEditTestStep: new Array(),

    saveMessagealert: false,

    ForChildIDGetTesterAndRoleName: new Array(),

    projectId: '',

    projectName: '',

    testPassId: '',

    countVal: '',

    testCaseCount: '',

    /**************Added by Mohini for resource file****************/
    gConfigAttachment: "Attachment",

    gConfigProject: "Project",

    gConfigTestPass: "Test Pass",

    gConfigTestCase: "Test Case",

    gConfigTestStep: "Test Step",

    gConfigTester: "Tester",

    gCongfigRole: "Role",

    gConfigGroup: "Group",

    gConfigPortfolio: "Portfolio",

    gConfigVersion: "Version",

    noprjFlag: 0,

    noTPFlag: 0,

    noTestrFlag: 0,

    noTCFlag: 0,

    noTSFlag: 0,

    init: function () {

        if (resource.isConfig.toLowerCase() == 'true') {
            attachment.gConfigAttachment = resource.gPageSpecialTerms['Attachment'] != undefined ? resource.gPageSpecialTerms['Attachment'] : "Attachment";

            attachment.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] != undefined ? resource.gPageSpecialTerms['Test Pass'] : "Test Pass";

            attachment.gConfigProject = resource.gPageSpecialTerms['Project'] != undefined ? resource.gPageSpecialTerms['Project'] : "Project";

            attachment.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] != undefined ? resource.gPageSpecialTerms['Test Step'] : "Test Step";

            attachment.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] != undefined ? resource.gPageSpecialTerms['Test Case'] : "Test Case";

            attachment.gConfigTester = resource.gPageSpecialTerms['Tester'] != undefined ? resource.gPageSpecialTerms['Tester'] : "Tester";

            attachment.gCongfigRole = resource.gPageSpecialTerms['Role'] != undefined ? resource.gPageSpecialTerms['Role'] : "Role";

            attachment.gConfigGroup = resource.gPageSpecialTerms['Group'] != undefined ? resource.gPageSpecialTerms['Group'] : "Group";

            attachment.gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] != undefined ? resource.gPageSpecialTerms['Portfolio'] : "Portfolio";

            attachment.gConfigVersion = resource.gPageSpecialTerms['Version'] != undefined ? resource.gPageSpecialTerms['Version'] : "Version";

        }

        $(function () {
            $('.AddAttachment table tbody tr').mouseover(function () {
                $(this).removeClass('selectedRow');
            }).mouseout(function () {
                $(this).removeClass('selectedRow');
            });
        });

        $('#noAttach').html('No ' + attachment.gConfigAttachment + ' Available.');

        $("#AlertAttach").html('<div id="" style="font-size:30px;color:#B8B8B8;">No ' + attachment.gConfigAttachment + ' Available.</div>');

        $('#navHeading tr:eq(6) td').attr('class', 'activeNav');

        $('#navHeading tr:eq(6) td img').attr('src', '../images/Admin/b_Attachment.png');

        if ($(".navTabs h2:eq(0)").attr("class") != "activeTab") //Added by Rasika
            $("#countDiv").hide();

        $("#attachOKbutton1").click(function () {
            alert('i m clicked');
        });

        $(".navTabs h2").eq(0).click(function () {

            $("#f_UploadImage").replaceWith($("#f_UploadImage").clone(true));

            // Added for DD
            createDD.editMode = 0;

            createDD.showDD();

            $("#testCaseName").attr('disabled', false);

            $("#testCaseName").attr('title', '');

            //if( $("#AlertAttach").css("display") == "none" && $("#testCaseName").val() != "No Test Case Available")
            if ($("#AlertAttach").css("display") == "none" && $("#testCaseName").val() != "No " + attachment.gConfigTestCase + " Available")//Added by Mohini for Resource file
                $("#countDiv").show();//Added by Mohini

            $("#AttachmentContainer").show();

            $(".AddAttachment").hide();

            $(".navTabs h2:eq(2)").hide();

            $('#previewContainer').hide();

            $('.navTabs h2').css('color', '#7F7F7F');

            $(this).css('color', '#000000');

        });

        $(".navTabs h2").eq(1).click(function () {
            // Added for DD
            createDD.editMode = 0
            createDD.showDD();
        



            $("#testCaseName").attr('disabled', false);
            $("#testCaseName").attr('title', '');

            if (show.testPassId == '') {
                //$('.ms-formtable').css('margin-top','-125px');
                if (show.projectId == '') {
                    attachment.alertBox1("Sorry! No " + attachment.gConfigProject + " is available for selected " + attachment.gConfigPortfolio.toLowerCase() + "!<br/>Please create the 							" + attachment.gConfigProject.toLowerCase() + " First.");//Added by Mohini for Resource file
                    attachment.noprjFlag = 1;
                }
                else {
                    attachment.alertBox1("Sorry! No " + attachment.gConfigTestPass + " is available for selected " + attachment.gConfigProject.toLowerCase() + " '" + $('#projectTitle label').text() + "'!<br/>Please 					create the " + attachment.gConfigTestPass + " First.");//Added by Mohini for Resource file
                   // attachment.alertBox1("Sorry! No " + attachment.gConfigTestPass + " is available for selected " + attachment.gConfigProject.toLowerCase() +"!<br/>Please 					create the " + attachment.gConfigTestPass + " First.");//Added by Mohini for Resource file
                    attachment.noTPFlag = 1;
                }
            }
            else if (attachment.flagTester == 'n') {
                $('.ms-formtable').css('margin-top', '-135px');
                attachment.alertBox1("Sorry! No " + attachment.gConfigTester + " is available for selected " + attachment.gConfigTestPass + "!<br/>Please create the " + attachment.gConfigTester + " 				First.");//Added by Mohini for Resource file            
                attachment.noTestrFlag = 1;
            }
            else if (attachment.testCaseCount == 0) {
                $('.ms-formtable').css('margin-top', '-135px');
                /*var query = '<Query><Where><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+show.testPassId+'</Value></Eq></Where><ViewFields><FieldRef Name="TesterName"/></ViewFields>							</Query>';
                var Result = attachment.dmlOperation(query,'Tester');
                     
                if(Result == undefined)
                {
                     attachment.alertBox1("Sorry! No "+attachment.gConfigTester+" is available for selected "+attachment.gConfigTestPass+"!<br/>Please create the "+attachment.gConfigTester+" 						First.");//Added by Mohini for Resource file
                     attachment.noTestrFlag=1;
                }
                else
                {
                     attachment.alertBox1("Sorry! No "+attachment.gConfigTestCase+" is available for selected "+attachment.gConfigTestPass+"!<br/>Please create the "+attachment.gConfigTestCase+" 						First.");//Added by Mohini for Resource file
                     attachment.noTCFlag=1;
                }*/

                attachment.alertBox1("Sorry! No " + attachment.gConfigTestCase + " is available for selected " + attachment.gConfigTestPass + "!<br/>Please create the " + attachment.gConfigTestCase + " 						First.");//Added by Mohini for Resource file
                attachment.noTCFlag = 1;

            }
            else if ($("#testStepName div div li").text() == '') {
                $('.ms-formtable').css('margin-top', '-135px');
                attachment.alertBox1("Sorry! No " + attachment.gConfigTestStep + " is available for selected " + attachment.gConfigTestPass + "!<br/>Please create the " + attachment.gConfigTestStep + " 				First.");//Added by Mohini for Resource file
                attachment.noTSFlag = 1;
            }
            else
                $('.ms-formtable').css('margin-top', '-135px');

            $("#countDiv").hide();//Added by Mohini

            //To reset all the things if coming from edit attachment page
            attachment.clearFields();

            $('.navTabs h2').css('color', '#7F7F7F');
            $(this).css('color', '#000000');

            $(".navTabs h2:eq(2)").hide();
            $('.ms-attachUploadButtons').show();
            $('#onetidIOFile').attr("disabled", false);
            $('#attachOKbutton').attr("disabled", false);
            $($('#idSpace').siblings()[1]).attr('disabled', false);
            $("#btnEditSave").hide();
            $("#btnReset").hide();
            $("#linkSN_testStepName").click();

            $(".AddAttachment").show();
            $("#AttachmentContainer").hide();

            $('#previewContainer').hide();
            $('#attachOKbutton1').show();
            $('#attachCancelButton').show();
            $('#attachmentsOnClient').css('display', 'block');

            $(".uploadContainer").css("display", "inline");//trupti
                
            if (show.testPassId == '') {
                $(".tableMargin").css("margin-top", "0px");
            }
            else {
                $(".tableMargin").css("margin-top", "-90px");
            }
           
        });

        $("ul li a:eq(1)").css('color', '#f60');
        $('#attachOKbutton').val('Save');
        window.alert = function (mess) {
            try { $("#divAlert").alertBox("alert", mess); } catch (ex) { }
        };

        $('.t5').addClass('t5 t5hover');

        attachment.refreshAttachmentWebPart();

        //ok button event
        $('#attachOKbutton').click(function () {
            var tStepIdAttachPresent = new Array();
            attachment.flagFound = "false";

            $("#testStepName li").each(
				function () {
				    if ($(this).children(".mslChk").attr('checked') == true) {
				        if ($.inArray($(this).children(".mslChk").attr('Id'), attachment.tempResult) != -1) {
				            attachment.flagFound = "true";
				        }
				    }
				});

            OkAttach2();
        });

        $("[id$='attachCancelButton']").click(function () {
            /* Added by shilpa for bug 6775 */
            attachment.addMode();
            $('#partAttachment').show();
        });

        /* Modified for bug 10547 */
        $("#AttachmentGrid thead tr td:eq(2)").click(function (e) {
            e.stopPropagation();
            $("#testStepMultiSel").slideToggle("fast");
        });
        $('#testStepMultiSel').click(function (e) {
            e.stopPropagation();
        });
        $(document).click(function () {
            $('#testStepMultiSel').slideUp();
        });

        navigation.changeLinks();
        /*For Bug Id 1167*/
        $('#projectHead').click(function (e) {
            if ($('#assoProjects').height() >= 400)
                $('#assoProjects').css('overflow-y', 'auto');
        });
        /*For Bug Id 11663*/
        $('#TestPassHead').click(function (e) {
            if ($('#assoTP').height() >= 400)
                $('#assoTP').css('overflow-y', 'auto');
        });

        //////////////////////////////////////////////////////////////////////////////////////////////////
        //To make the bredcrumb box label cofigurable
        if (resource.isConfig.toLowerCase() == 'true') {
            attachment.gConfigProject = resource.gPageSpecialTerms['Project'] == undefined ? 'Project' : resource.gPageSpecialTerms['Project'];
            attachment.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] == undefined ? 'Test Pass' : resource.gPageSpecialTerms['Test Pass'];
            attachment.gConfigVersion = resource.gPageSpecialTerms['Version'] == undefined ? 'Version' : resource.gPageSpecialTerms['Version'];
            attachment.gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] == undefined ? 'Portfolio' : resource.gPageSpecialTerms['Portfolio'];
            attachment.gConfigGroup = resource.gPageSpecialTerms['Group'] == undefined ? 'Group' : resource.gPageSpecialTerms['Group'];
        }

        $("#groupHead label").html(attachment.gConfigGroup + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#portfolioHead label").html(attachment.gConfigPortfolio + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#projectHead label").html(attachment.gConfigProject + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#versionHead label").html(attachment.gConfigVersion + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#TestPassHead label").html(attachment.gConfigTestPass + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');


        /**************code for checking the url***********/
        var url = window.location.href;
        var sourceurl;
        var splitUrl;

        var idAfterSave = Main.getCookie("AttachPageState");
        if (idAfterSave != null && idAfterSave != "") {
            var idArray = idAfterSave.split(";");
            attachment.prjId = idArray[0];
            attachment.tpId = idArray[1];
            attachment.tcId = idArray[2];
            attachment.tsId = idArray[3];

            //Added by HRW on 11 Aug 2012
            if (idArray[4] == 0 || idArray[4] == 1) {
                //attachment.alertBox(attachment.gConfigAttachment+" attached successfully");//Added by Mohini for Resource file
                //var a = parseInt(idArray[4]) + 1;
                //if(a == 2)
                Main.deletecookie("AttachPageState");
                /*else
                {
                    var queryVal = attachment.prjId+";"+attachment.tpId+";"+attachment.tcId+";"+attachment.tsId+";"+a;
                    Main.setCookie("AttachPageState",queryVal,null);
                }*/

                /**********************************************************/
                //Added by Rasika			      
                //To save new expected attachment 

                //code after refresh start : trupti

                var query = '';
                query = '<Query><Where><And><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">' + attachment.tpId + '</Value></Eq><And><Eq><FieldRef 									Name="TestCaseID" /><Value Type="Text">' + attachment.tcId + '</Value></Eq>';
                query += '<Eq><FieldRef Name="TestStepID" /><Value Type="Text">' + attachment.tsId + '</Value></Eq>';

                query += '</And></And><Eq><FieldRef Name="ResultType" /><Value Type="Text">Expected</Value></Eq></And></Where></Query>';

                var detailsAttach = new Array();
                detailsAttach = null;//attachment.dmlOperation(query, 'Attachment');

                if (detailsAttach != undefined || detailsAttach != null) {
                    var testPassId = detailsAttach[0]['TestPassID'];
                    var fileName = detailsAttach[0]['AttachmentName'];

                    //To Make url
                    var protocol = window.location.protocol;
                    var hostname = window.location.hostname;
                    var fileRef = detailsAttach[0]['FileRef'];
                    var site = fileRef.split(';')[1].split('#')[1].split("Lists/Attachment");
                    var fileUrl = protocol + "//" + hostname + "/" + site[0] + "Lists/Attachment/Attachments/" + detailsAttach[0]['ID'] + "/" + detailsAttach[0]['FileName'];
                    //To make "," separated string
                    var strTestStepComma = '';
                    var testStepId = detailsAttach[0]['TestStepID'];
                    var strlast = testStepId.slice(1);
                    strlast = strlast.slice(0, -1);
                    var arrTestStepId = strlast.split('|');
                    for (var i = 0; i < arrTestStepId.length - 1; i++) {
                        strTestStepComma += arrTestStepId[i] + ',';
                    }
                    strTestStepComma += arrTestStepId[arrTestStepId.length - 1];

                    var insertAttachDetails = '';
                    insertAttachDetails = {
                        'testPassId': testPassId,
                        'fileName': fileName,
                        'fileUrl': fileUrl,
                        'testStepId': strTestStepComma,
                        'fileType': 'Expected',
                        'StatementType':'Insert',
                        'isDelete': 'false'
                    };
                    var result = ServiceLayer.InsertUpdateData("InsertUpdateAttachment", insertAttachDetails);
                    if (result.length != 0)
                        //attachment.alertBox(attachment.gConfigAttachment+" attached successfully");
                        //attachment.alertBox("File attached successfully");
                        setTimeout(function () { Main.AutoHideAlertBox("File attached successfully"); }, 0);
                }
                /**********************************************************/

            }
        }
        else {
            if (url.indexOf('source') != -1) {
                sourceurl = url.split("source=");

                if (sourceurl != null && sourceurl != undefined) {
                    if (sourceurl[1] != null && sourceurl[1] != undefined) {
                        splitUrl = sourceurl[1].split("?");
                        if (splitUrl[1] != null && splitUrl[1] != undefined) //querystring value
                        {
                            if (splitUrl[1].indexOf('&') != -1) {
                                var splitUrlAmp = splitUrl[1].split("&");

                                attachment.prjId = $.trim(splitUrlAmp[0].split("=")[1]);
                                attachment.tpId = $.trim(splitUrlAmp[1].split("=")[1]);
                            }
                            else {
                                attachment.prjId = $.trim(splitUrl[1].split("=")[1]);
                            }
                        }
                    }
                }
            }
        }

        //Get Page State after postback
        if ($("[name$='HiddenField_URL']").val() != undefined && $("[name$='HiddenField_URL']").val() != '') {
            var pageState = $("[name$='HiddenField_URL']").val().split(";");
            attachment.prjId = pageState[0];
            attachment.tpId = pageState[1];
        }
        if (attachment.prjId != '' && attachment.prjId != undefined)
            show.projectId = attachment.prjId;
        if (attachment.tpId != '' && attachment.tpId != undefined)
            show.testPassId = attachment.tpId;
        show.showData("attachment");
        $('.rgTableBread').show();
        if (isPortfolioOn) {
            $(".prjHead").hide();
            $(".tpHead").hide();
            createDD.create();
        }
        else
            createDD.createWithoutPort();
    },
    //added by trupti
    newAttachment: function () {

        var tStepIdAttachPresent = new Array();
        attachment.flagFound = "false";

        $("#testStepName li").each(
            function () {
                if ($(this).children(".mslChk").attr('checked') == true) {
                    if ($.inArray($(this).children(".mslChk").attr('Id'), attachment.tempResult) != -1) {
                        attachment.flagFound = "true";
                    }
                }
            });

        //-----------OkAttach2(); start of code----------------------------//

        //FileUploadIndex = 0;
        //fileID = FileuploadString + FileUploadIndex;
        //fileInput = GetAttachElement(fileID);
        //filename = TrimWhiteSpaces(fileInput.value);
        var filenamenew;
        if (document.getElementById("f_UploadImage").files.length > 0) {
            filename = document.getElementById("f_UploadImage").files[0]['name'];
            var pos = filename.lastIndexOf("\\");
            filenamenew = filename.substring(pos + 1);
        }
        var checked = $("input[type=checkbox]:checked").length;

        /**********************added by Mohini to prioritize the validation message*************************/
        var checked1 = $("#testStepName input[type=checkbox]:checked").length;
        /******************************************/
        if (document.getElementById("AttachmentName").value == "") {
            attachment.alertBox('Please enter the attachment name first!');
            Main.hideLoading();
            return false;
        }
        if (document.getElementById("f_UploadImage").files.length = 0) {
            attachment.alertBoxForAttachment('Please browse the attachment first!');
            Main.hideLoading();
            return false;
        }
        if (document.getElementById("f_UploadImage").value=="")
        {
            attachment.alertBox('Please browse the attachment first!');
            Main.hideLoading();
            return false;
        }
        if (attachment.flagFound == "true") {
            attachment.alertBoxForAttachment('You can attach only one file to one test step!');
            Main.hideLoading();
            return false;
        }
        if (filenamenew != undefined) {
            if (filenamenew.split(".").length > 2)//code for bugid 3999
            {
                var L_FileNameRequired_TXT = "Attached filename shouldn't contain '.',please remove '.' from filename ";
                attachment.alertBox(L_FileNameRequired_TXT);
                /* Added by shilpa */
                $('#partAttachment').css('display', 'block');
                attachment.addMode();
                return false;
            }
            else {
                if (filenamenew.indexOf(".exe") !== -1) {
                    var L_FileNameRequired_TXT = ".exe file is not allowed for attachment ";
                    attachment.alertBox(L_FileNameRequired_TXT);
                    /* Added by shilpa */
                    $('#partAttachment').css('display', 'block');
                    attachment.addMode();
                    return false;
                }
            }
        }
        if (!filename) {
            var L_FileNameRequired_TXT = "Please browse the attachment first!";
            attachment.alertBox(L_FileNameRequired_TXT);
            //fileInput.focus();
        }
        else {
            var L_FileUploadToolTip_text = "Name";
            //changes by trupti
            //oRow = document.getElementById("idAttachmentsTable").insertRow(-1);
            //RowID = 'attachRow' + FileUploadIndex;
            //oRow.id = RowID;
            //oCellFileName = oRow.insertCell(-1);
            //oCellFileName.className = "ms-vb";

            //++FileUploadIndex;
            //oAttachments = document.getElementById("attachmentsOnClient");
            //var inputNode = document.createElement("input");
            //inputNode.tabIndex = "1";
            //inputNode.type = "File";
            //inputNode.className = "ms-longfileinput";
            //inputNode.title = L_FileUploadToolTip_text;
            //inputNode.name = FileuploadString + FileUploadIndex;
            //inputNode.id = FileuploadString + FileUploadIndex;
            //inputNode.size = "56";
            //oAttachments.appendChild(inputNode);
            //var theForm = fileInput.form;
            //theForm.encoding = 'multipart/form-data';
            ////document.getElementById("idAttachmentsRow").style.display = "";
            ////ShowPart1();
            //$("#onetidIOFile").show();

            ///** Added by shilpa **/
            //$('#attachmentsOnClient').find('input').hide();
            //$("#onetidIOFile").show();
            //$('#attachmentsOnClient input').css('width', '200pt');
            //$("#partAttachment table tbody tr:eq(4)").css("display", "block");
            //$("#partAttachment").css("display", "block");

            ////$("[id$='diidIOSaveItem']").click();  // To save attachment on ok
            //added by trupti
            //PreSaveAction();
            /***************************  PreSaveAction();    Start ***************************/

            if ($("#testStepName").text() == "No Test Step Available") {
                attachment.alertBox("You cannot add an attachment unless at least one test step has been created in the selected Test Pass!");
                return false;
            }

            Main.showLoading();
            var checked = $("#testStepName input[type=checkbox]:checked").length;
            if (checked < 1) {
                attachment.alertBox("Please select at least one test step");
                //fileInput.focus();//commented by trupti
                Main.hideLoading();
                return false;
            }
                //else if ($("[title*='AttachmentName']").val().replace(/\s+/g, "") == '') {
                //    attachment.alertBox('Attachment Name is a mandatory field!');
                //    Main.hideLoading();
                //    return false;
                //}
            else {
                if (attachment.flagFound == "true") {
                    attachment.alertBoxForAttachment('You can attach only one file to one test step!');
                    Main.hideLoading();
                    return false;
                }
                else {
                    var pid = attachment.projectId;
                    var tpid = attachment.testPassId;
                    var tcid = $("#testCaseName").val();
                    var tsid = multiSelectList.getSelectedItems("testStepName").join();
                    var allTSIDcAtt = new Array();

                    //Added by Rasika
                    if (attachment.tempResult != undefined || attachment.tempResult != null)
                        $.merge(allTSIDcAtt, attachment.tempResult);


                    var tempTSID = tsid.split(",");
                    var splitTSID = new Array();
                    //for (tSI in tempTSID)
                    //{
                    //    var splitTSID2 = tempTSID[tSI].split("_");
                    //    splitTSID.push(splitTSID2[1]);
                    //    if (jQuery.inArray(splitTSID2[1], allTSIDcAtt) != -1)
                    //    {
                    //        attachment.alertBoxForAttachment('You can attach only one file to one test step!');
                    //        Main.hideLoading();
                    //        return false;
                    //    }
                    //}
                    
                    for (tSI=0;tSI<tempTSID.length;tSI++)
                    {
                        var splitTSID2 = tempTSID[tSI].split("_");
                        splitTSID.push(splitTSID2[1]);
                        if (jQuery.inArray(splitTSID2[1], allTSIDcAtt) != -1)
                        {
                            attachment.alertBoxForAttachment('You can attach only one file to one test step!');
                            Main.hideLoading();
                            return false;
                        }
                    }
                    /*************
                    var allTSIDcAtt = new Array();

                    //Added by Rasika
                    if (attachment.tempResult != undefined || attachment.tempResult != null)
                        $.merge(allTSIDcAtt, attachment.tempResult);

                    var tsid = multiSelectList.getSelectedItems("testStepName").join();
                    var tempTSID = tsid.split(",");
                    var splitTSID22 = new Array();
                    for (tSI = 0; tSI < tempTSID.length; tSI++)
                    {
                            var splitTSID2 = tempTSID[tSI].split("_");
                            splitTSID22.push(splitTSID2[1]);
                            if (jQuery.inArray(splitTSID2[1], allTSIDcAtt) != -1) {
                                attachment.alertBoxForAttachment('You can attach only one file to one test step!');
                                Main.hideLoading();
                                return false;
                            }
                        }
                    }
                    var strTSId22 = '|' + splitTSID.join('|') + '|';
                    /*************/


               
                    var strTSId = '|' + splitTSID.join('|') + '|';
                   // var strTSId =splitTSID;///to solve bug 
                    var queryVal = pid + ";" + tpid + ";" + tcid + ";" + strTSId + ";" + 0;


                    Main.setCookie("AttachPageState", queryVal, null);

                    // $("[title*='TestStepID']").val(splitTSID);
                    $("[title*='TestStepID']").val(strTSId);

                    //$("[title$='TestStepID']").val(multiSelectList.getSelectedItems("testStepName").join());
                    $("[title*='ResultType']").val("Expected");

                    $("[title*='ProjectID']").val(pid);
                    $("[title*='TestPassID']").val(tpid);
                    $("[title*='TestCaseID']").val(tcid);

                    // var path = fileInput.value;
                    var path = document.getElementById("f_UploadImage").files[0]['name']
                    var pos = path.lastIndexOf("\\");
                    var filename = path.substring(pos + 1);
                    $("[title*='FileName']").val(filename);

                    /**/
                    var data = {
                        "TestStepID": strTSId.toString(),
                        "AttachmentName": document.getElementById("AttachmentName").value,
                        "Description": document.getElementById("attdesc").value,
                        "ResultType": "Expected",
                        "ProjectID": pid.toString(),
                        "TestPassID": tpid.toString(),
                        "StatementType": "Insert",
                        "TestCaseID": tcid.toString()
                    };

                    var result = ServiceLayer.InsertUpdateData("senddata", data, "Attachment");
                    var attId = result;
                   // var attId = result['ErrorDetails'].toString();//issue
                    /**/

                    /****** Code for saving file in db*******/
                    var formData = new FormData();
                    formData.append('file', $('#f_UploadImage')[0].files[0]);
                    formData.append('attaid', attId);
                    formData.append('fileName', $('#f_UploadImage')[0].files[0].name);
                    
                    $.ajax({
                        type: 'post',
                        beforeSend: function (request) {
                            request.setRequestHeader("appurl", ServiceLayer.appurl);
                            request.setRequestHeader("LoggedInUserSPUserId", _spUserId);
                        },
                        url: ServiceLayer.serviceURL + '/Attachment/UploadFile',//Async
                        data: formData,
                        success: function (status) {
                            if (status != 'error') {                               
                            }
                        },
                        processData: false,
                        contentType: false,
                        error: function () {                            
                        }
                    });
                    ////////////////*////////////////////
                    /****** Code for saving file in db*******/
                    /********************************************/

                    //code after refresh start : trupti

                    //var query ='';
                    //query = '<Query><Where><And><And><Eq><FieldRef Name="TestPassID" /><Value Type="Text">'+attachment.tpId+'</Value></Eq><And><Eq><FieldRef 									Name="TestCaseID" /><Value Type="Text">'+attachment.tcId+'</Value></Eq>';					
                    //query +='<Eq><FieldRef Name="TestStepID" /><Value Type="Text">'+attachment.tsId+'</Value></Eq>';

                    //query +='</And></And><Eq><FieldRef Name="ResultType" /><Value Type="Text">Expected</Value></Eq></And></Where></Query>';

                    // var detailsAttach=new Array();	
                    //// detailsAttach= attachment.dmlOperation(query,'Attachment');

                    // if(detailsAttach!=undefined || detailsAttach!=null)
                    // { 
                    //var testPassId=detailsAttach[0]['TestPassID'];
                    //var fileName=detailsAttach[0]['AttachmentName'];

                    //To Make url
                    //    var protocol=window.location.protocol;
                    //    var hostname=window.location.hostname;
                    //    var fileRef=detailsAttach[0]['FileRef'];				    	
                    //    var site=fileRef.split(';')[1].split('#')[1].split("Lists/Attachment");
                    //    var fileUrl=protocol+"//"+hostname+"/"+site[0]+"Lists/Attachment/Attachments/"+detailsAttach[0]['ID']+"/"+detailsAttach[0]['FileName'];				    	 
                    ////To make "," separated string

                    var strTestStepComma = '';
                    //var testStepId=detailsAttach[0]['TestStepID'];
                    //var strlast=testStepId.slice(1);
                    //strlast = strlast.slice(0, -1);

                    //var path = document.getElementById("f_UploadImage").files[0]['name']
                    //var pos = path.lastIndexOf("\\");
                    //var filename = path.substring(pos + 1);
                   // var arrTestStepId = strTSId;
                    var arrTestStepId = strTSId.split('|');//strlast.split('|');
                   
                    for (var i = 0; i < splitTSID.length - 1; i++)//arrTestStepId//splitTSID
                    {
                        strTestStepComma += splitTSID[i] + ',';
                    }
                    strTestStepComma += splitTSID[splitTSID.length - 1];

                    var insertAttachDetails = '';
                    insertAttachDetails = {
                        //'attID':null,
                        'testPassId': tpid.toString(),//cd
                        //'TestStepPlanID':null,
                        'fileName': jQuery.trim($("[title*='AttachmentName']").val()),
                        'Description': jQuery.trim($("[title*='Description']").val()),
                        'fileUrl': "",//'fileUrl': fileUrl,
                        'testStepId': strTestStepComma,
                        'fileType': 'Expected',
                        'StatementType': 'Insert',
                        'isDelete': 'false'
                    };
                    var result = ServiceLayer.InsertUpdateData("InsertUpdateAttachment", insertAttachDetails, "Attachment");

                    /**********************************************/
                    Main.hideLoading();
                    $(".navTabs h2").eq(0).click();
                    setTimeout(function () { Main.AutoHideAlertBox("File attached successfully"); }, 0);
                    attachment.fillAttachmentList();
                    return true;

                }
                Main.hideLoading();
            }


            Main.hideLoading();


            /***************************  PreSaveAction();     End    ***************************/
        }


        //-----------OkAttach2(); End of code----------------------------//

        /****** Code for saving file in db*******
        var data = new FormData();
    
        var files = document.getElementById("f_UploadImage").files;
    
        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
    
        sendFile(this);
    
        /****** Code for saving file in db*******/

    },

    startIndexTIncrement: function () {
        if (attachment.gAttlength + 5 != attachment.startIndexT)
            attachment.startIndexT += 5;
    },

    startIndexTDecrement: function () {
        if (attachment.startIndexT > 0)
            attachment.startIndexT -= 5;
    },

    flagTester: '',
    //populate Test Case Names as per Test Pass
    populateTestCase: function () {
        attachment.addMode(); // added by shilpa on 30 oct

        var allTCIDsForTP = new Array();
        var TestCaseResult = new Array();

        //////////Added by mangesh for getting tester flag
        var testerflag = ServiceLayer.GetData("GetTestCaseDetailForTestPassIdWithTesterFlag" + "/" + show.testPassId, null, "Attachment");
        attachment.flagTester = testerflag[0].testcaseflagTester;
        //////////////////////////////

        //To get all test cases by test pass id 
        TestCaseResult = ServiceLayer.GetData("GetTestCaseDetailForTestPassId" + "/" + show.testPassId, null, "Attachment");

        if (TestCaseResult != null && TestCaseResult != undefined && TestCaseResult.length != 0) {
            document.getElementById('testCaseName').length = 0;
            attachment.testCaseCount = TestCaseResult.length;//Added by  mohini

            for (var i = 0; i < TestCaseResult.length; i++) {
                var obj = new Option();
                document.getElementById('testCaseName').options[i] = obj;
                document.getElementById('testCaseName').options[i].text = trimText(TestCaseResult[i]['testCase_Name'].toString(), 70);//TestCase_Name//testCaseName
                document.getElementById('testCaseName').options[i].value = TestCaseResult[i]['testCase_Id'];//TestCase_Id//testCaseId
                document.getElementById('testCaseName').options[i].title = TestCaseResult[i]['testCase_Name'].toString();//TestCase_Name	//	testCaseName
                if (attachment.tcId != '' && attachment.tcId != null && attachment.tcId != undefined) {
                    if (TestCaseResult[i]['TestCase_Id'] == attachment.tcId)
                        document.getElementById('testCase_Name').value = attachment.tcId;
                }
                else
                    document.getElementById('testCaseName').options[0].selected = true;
            }

            multiSelectList.functionToInvoke = "attachment.fillAttachmentList($(this)[0].id)";//Delegates
            attachment.populateTestSteps();

            $("#ulItemstestCaseNameMultiSel li:eq(0)").html("Note: You can select only one " + attachment.gConfigTestCase + " at a time.");//Added by Mohini for Resource file

            /*To make the first check box selected for Test Case :Ejaz DT-12/10/2013*/
            $("#ulItemstestCaseNameMultiSel div input:eq(0)").click();
            $("#ulItemstestCaseNameMultiSel div input:eq(0)").attr("checked", "checked");

        }
        else {
            //Added by HRW on 11 Oct 2012
            $("#testCaseName").html('');
            var obj = new Option();
            document.getElementById('testCaseName').options[0] = obj;
            document.getElementById('testCaseName').options[0].text = "No " + attachment.gConfigTestCase + " Available";//Added by Mohini for Resource file
            $("#testStepName").html('<div class="Mediumddl">No ' + attachment.gConfigTestStep + ' Available</div>');//Added by Mohini for Resource file

            $("#AlertAttach").show();
            $("#countDiv").hide();
            $(".viewAttachment").hide();
            $('#pagination').hide();

            /* Addede by shilpa on 30 oct */
            $("#addAttachLink").hide();
            $("#btnEditSave").hide();
            //$("[id$='diidIOSaveItem']").show();
            $('#attDownload').hide();
            attachment.testCaseCount = 0;
        }
        attachment.tcId = '';

        $(".navTabs h2").each(function (e) {
            if ($(this).css('color') == "rgb(0, 0, 0)") {
                if ($(this).text() != $('.navTabs h2:eq(0)').text())
                    $(this).click();
            }
        });

    },

    attachListFlag: 0,//Added by Mohini for bug id 12028 DT:26-06-2014 

    //populate Test Steps Names as per Test Step
    populateTestSteps: function () {
        //Added by HRW to hide the update button when user changes the Test Case drop down and show Save button
        attachment.addMode(); // added by shilpa

        attachment.startIndexT = 0;
        attachment.clearFields();

        var TestStepResult = new Array();
        var TestStepResultByTCID = new Array();

        var selectedTCID = $("#testCaseName").val();

        //To get all test steps by test pass id	//"+"/"+show.testPassId,null,"Attachment"
        TestStepResult = ServiceLayer.GetData("GetTestStepsByTestPassID" + "/" + show.testPassId, null, "Attachment");

        if (TestStepResult != null && TestStepResult != undefined && TestStepResult.length != 0) {
            var count = 0;
            for (var i = 0; i < TestStepResult.length; i++) {
                if (TestStepResult[i]['testCaseId'] == selectedTCID) {
                    TestStepResultByTCID[count] = TestStepResult[i];
                    count++;
                }
            }

            if ($(".ms-formtable").css("margin-top") == "0px" && TestStepResultByTCID.length != 0)
                $(".ms-formtable").css("margin-top", "-125px");

            if (TestStepResultByTCID.length != 0) // Added by Rasika
            {
                multiSelectList.createMultiSelectList("testStepName", TestStepResultByTCID, "testStepName", "testStepId", "330px;"); multiSelectList.createMultiSelectList("testStepMultiSel", TestStepResultByTCID, "testStepName", "testStepId", "130px;");

                if (attachment.tsId != '' && attachment.tsId != null && attachment.tsId != undefined) {

                    var strTestStepComma = '';
                    var testStepId = attachment.tsId;
                    var strlast = testStepId.slice(1);
                    strlast = strlast.slice(0, -1);
                    var arrTestStepId = strlast.split('|');
                    for (var i = 0; i < arrTestStepId.length - 1; i++) {
                        strTestStepComma += arrTestStepId[i] + ',';
                    }
                    strTestStepComma += arrTestStepId[arrTestStepId.length - 1];

                    /*var strTestStepComma=attachment.tsId.slice(1);
                        strTestStepComma=strTestStepComma.slice(0,-1);
                        
                        strTestStepComma=strTestStepComma.replace('|',',');*/

                    multiSelectList.selectItem("testStepName", strTestStepComma);
                    attachment.tsId = '';
                    attachment.flag = true;
                }
                else {
                    //changes by trupti
                    //multiSelectList.selectItem("testStepName", TestStepResultByTCID[0]["testStepId"]);
                    multiSelectList.selectItem("testStepName", TestStepResultByTCID[0]["testStepId"].toString());
                }
                //multiSelectList.selectItem("testStepName",ChildResult[0]["ID"]);

            }
            else {
                $("#testStepName").html('<div class="Mediumddl">No ' + attachment.gConfigTestStep + ' Available</div>');
            }

        }
        else
            $('#testStepName').html('<div class="Mediumddl">No ' + attachment.gConfigTestStep + ' Available</div>');//Added by Mohini for Resource file


        $("#linkSA_testStepMultiSel").click();
        $("#linkSN_testStepName").click();

        if (attachment.attachListFlag != 1)
            attachment.fillAttachmentList();

        attachment.testStepSelectionChanged();

        $("#ulItemstestStepName div li").each(function () {

            if ($.trim($(this)[0].lastChild.textContent).indexOf(" ") == -1) {
                $(this).css("word-break", "break-all");
            }
            else {
                $(this).css("word-break", "normal");
            }

        });

        $(".navTabs h2").each(function (e) {
            if ($(this).css('color') == "rgb(0, 0, 0)") {
                if ($(this).text() != $('.navTabs h2:eq(0)').text())
                    $(this).click();
            }
        });


    },

    renewUploadPopup: function () {

        $("[title*='AttachmentName']").val("");
        $("[title*='Description']").val("");
        $('#partAttachment').css("display", "inline");
        $('#onetidIOFile').css("display", "inline");
        $('#partAttachment table tbody tr:eq(1) td:eq(0)').remove();
        $('#fileupload1').remove();
        $("#attachOKbutton").show();
    },

    refreshAttachmentWebPart: function () {

        var arr = $("[id$='toolBarTbltop']").html();

        $('.box h1').append(arr);

        var arr = $("h1 tbody tr td:eq(1) table tr td").html();

        // alert($("h1 tbody tr td:eq(1) table tr td").html());
        var editsave = '<input class="btnNew1" type="button" value="Update" id ="btnEditSave" style="display:none;" onclick="Main.showLoading();setTimeout(\'attachment.saveAttachments(); 			\',200);"/>'; //Main.showLoading();setTimeout('attachment.saveAttachments();',200);
        $('.box h1').empty();

        $('.box h1').html('<b>Attachments</b>&nbsp;&nbsp;&nbsp;&nbsp;' + editsave + arr);
        //$("#btnUpdate").html(''+editsave+'&nbsp;<input class="btnNew1" type="button" value="Reset" id ="btnReset" onclick="attachment.ResetEditAttachment()"/>');
        $("#btnUpdate").html(editsave);
        $("h1 tbody").css('width', '20px');
        $("[id$='diidIOSaveItem']").removeClass('ms-toolbar ms-ButtonHeightWidth');
        $("[id$='diidIOSaveItem']").addClass('ms-toolbar ms-ButtonHeightWidth btn');
        //$("[id$='toolBarTbl']").remove();
        $(".s4-wpTopTable tr:eq(0)").remove();

        //$("[id$='attachCancelButton']").hide();
        $("[id$='diidIOGoBack']").hide();
        $(".ms-formlabel").css("height", "10px");

        $("#partAttachment").css("display", "block");
        $("#onetidIOFile").css("width", "200pt");
        $("[id$='toolBarTbltop']").css("display", "none");
        $("[id$='TextField']").css('width', '199pt');

        $(".ms-formtable tr:eq(2)").show();
        $(".ms-formtable tr:eq(3)").show();
        //$(".ms-formtable tr:eq(6)").show();

        $(".ms-formline").hide();
        $(".ms-formlabel").hide();
        $(".ms-descriptiontext").hide();
        $("#partAttachment tr").last().hide();
        //$('.ms-formtable tr:eq(2) td:eq(1) span').before('<p><b>Attachment Name:<span style="color:red;font-weight:bold;">*</span></b></p>');
        $('.ms-formtable tr:eq(2) td:eq(1) span').before('<p><b>' + attachment.gConfigAttachment + ' Name:<span style="color:red;font-weight:bold;">*</span></b></p>');//:SD
        $('.ms-formtable tr:eq(3) td:eq(1) span').before('<p><b>Description:</b></p>');
        //$('#attachmentsOnClient input').before('<b>Name:</b>'); 
        $('#attachmentsOnClient').empty().html('<b>File Name:<span style="color:red;font-weight:bold;">*</span></b><input style="width: 200pt;" id="onetidIOFile" class="ms-fileinput" 			title="Browse" name="fileupload0" size="56" type="file">');
        $('.ms-formtable tr:eq(3) td:eq(1) textarea').css('height', '25pt');
        //$("[id$='diidIOSaveItem']").show();
        $("#part1 table:eq(9)").hide();
        $(".AddAttachment tbody h2 span").css('display', 'none');
        Main.hideLoading();
    },


    //Set value of TestStepId in Upload Attachment web part
    testStepSelectionChanged: function (str) {
        if (str == "testStepMultiSel") {
            if (multiSelectList.getSelectedItems("testStepMultiSel").length > 0) {
                attachment.flag = true;
            }
            else {
                attachment.flag = false;
            }

            $("[name$='HiddenField_TestStepID']").val(multiSelectList.getSelectedItems("testStepMultiSel").join());
            $("[name$='HiddenField_Result']").val("Expected");
            //Set field to maintain page state after postback
            $("[name$='HiddenField_URL']").val(attachment.projectId + ";" + attachment.testPassId + ";" + $("#testCaseName").val() + ";" + multiSelectList.getSelectedItems("testStepMultiSel").join());
        }
        else {
            if (multiSelectList.getSelectedItems("testStepName").length > 0) {
                attachment.flag = true;
            }
            else {
                attachment.flag = false;
            }

            $("[name$='HiddenField_TestStepID']").val(multiSelectList.getSelectedItems("testStepName").join());
            $("[name$='HiddenField_Result']").val("Expected");
            //Set field to maintain page state after postback
            $("[name$='HiddenField_URL']").val(attachment.projectId + ";" + attachment.testPassId + ";" + $("#testCaseName").val() + ";" + multiSelectList.getSelectedItems("testStepName").join());
        }
    },

    result: new Array(),
    attachTestStep: new Array(),
    forTestStepPlanIdGetTestStepId: new Array(),
    //Populate the list of attachments as per Test Steps
    fillAttachmentList: function (id) {
        try {
            var attResult = attachment.attachTestStep;
            if (id != undefined) {
                if (id.indexOf("testCaseNameMultiSel") != -1 || id.indexOf("testStepName") != -1)
                    return false;
            }

            attachment.attachTestStep = [];//Initialise global array

            var uniqueExpUrl = new Array();
            var testStepNamesByExpectedResArr = new Array();
            var testStepIdsByExpectedResArr = new Array();

            $('#attachmentGrd').empty();

            var attcount = '';
            attachment.tempResult.length = 0;

            $("#AlertAttach").hide();
            $(".viewAttachment").show();
            attachment.testStepSelectionChanged('testStepMultiSel');
            attachment.attachListFlag = 1;//Added by Mohini for bug id 12028 DT:26-06-2014
            //var $("#testCaseName").val() = multiSelectList.getSelectedItems("testCaseNameMultiSel")[0].replace("testCaseNameMultiSel_","");

            attachment.ForChildIDGetTesterAndRoleName.length = 0;

            //To get all attachment details by test pass id
            attachment.result = ServiceLayer.GetData("GetAllAttachment" + "/" + show.testPassId, null, "Attachment");// + "/" + show.testPassId, null, "Attachment"

            if (attachment.result.length != 0) {
                for (var j = 0; j < attachment.result.length; j++) {
                    if (attachment.result[j]['testCaseId'] == $("#testCaseName").val() && (attachment.result[j]['listExpectedAttach'].length != 0)) {
                        /***
                        if ($.inArray(attachment.result[j]['listExpectedAttach'][0]['fileName'], uniqueExpUrl) == -1) {
                            uniqueExpUrl.push(attachment.result[j]['listExpectedAttach'][0]['fileName']);//Unique URLs

                            //list of testStepNames 
                            testStepNamesByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']] = new Array();
                            testStepNamesByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']].push(attachment.result[j]['testStepName']);

                            //list of testStepIds 
                            testStepIdsByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']] = new Array();
                            testStepIdsByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']].push(attachment.result[j]['testStepId']);

                            attachment.tempResult.push(attachment.result[j]['testStepId']);

                        }
                        else {
                            if ($.inArray(attachment.result[j]['testStepName'], testStepNamesByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']]) == -1)
                                testStepNamesByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']].push(attachment.result[j]['testStepName']);

                            if ($.inArray(attachment.result[j]['testStepId'], testStepIdsByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']]) == -1)
                                testStepIdsByExpectedResArr[attachment.result[j]['listExpectedAttach'][0]['fileName']].push(attachment.result[j]['testStepId']);

                            if ($.inArray(attachment.result[j]['testStepId'], attachment.tempResult) == -1)
                                attachment.tempResult.push(attachment.result[j]['testStepId']);
                        }
                        /***/
                        if ($.inArray(attachment.result[j]['attachmentID'], uniqueExpUrl) == -1) {
                            uniqueExpUrl.push(attachment.result[j]['attachmentID']);//Unique URLs

                            //list of testStepNames 
                            testStepNamesByExpectedResArr[attachment.result[j]['attachmentID']] = new Array();
                            testStepNamesByExpectedResArr[attachment.result[j]['attachmentID']].push(attachment.result[j]['testStepName']);

                            //list of testStepIds 
                            testStepIdsByExpectedResArr[attachment.result[j]['attachmentID']] = new Array();
                            testStepIdsByExpectedResArr[attachment.result[j]['attachmentID']].push(attachment.result[j]['testStepId']);

                            attachment.tempResult.push(attachment.result[j]['testStepId']);

                        }
                        else {
                            if ($.inArray(attachment.result[j]['testStepName'], testStepNamesByExpectedResArr[attachment.result[j]['attachmentID']]) == -1)
                                testStepNamesByExpectedResArr[attachment.result[j]['attachmentID']].push(attachment.result[j]['testStepName']);

                            if ($.inArray(attachment.result[j]['attachmentID'], testStepIdsByExpectedResArr[attachment.result[j]['attachmentID']]) == -1)
                                testStepIdsByExpectedResArr[attachment.result[j]['attachmentID']].push(attachment.result[j]['testStepId']);

                            if ($.inArray(attachment.result[j]['attachmentID'], attachment.tempResult) == -1)
                                attachment.tempResult.push(attachment.result[j]['testStepId']);
                        }
                    }
                }
            }


            //////////////////////////////////////
            //To handle testStep dropdown 
            var arr = new Array();
            var z = 0;
            $("#testStepMultiSel li").each(
            function () {
                if ($(this).children(".mslChk").attr('checked') == true) {
                    z++;
                    var id = $(this).children(".mslChk").attr('Id').split("_")[1];
                    arr[z] = jQuery.grep(attachment.result, function (n, i) {
                        if (n.testStepId == id) {
                            return (n.testStepId == id);
                        }
                        return;

                    });

                }
            });
            attachment.result = arr;
            ////////////////////////////////////

            var temp = new Array();

            //To set attachment details by selected test case in global array 'attachTestStep'
            if (attachment.result.length != 0) {
                for (var j = 1; j < attachment.result.length; j++) {
                    if (attachment.result[j].length != 0)//To restrict entry of Null value in the 'attachment.attachTestStep' global array 
                    {
                        attachment.forTestStepPlanIdGetTestStepId[attachment.result[j][0]['testStepPlanId']] = attachment.result[j][0]['testStepId'];
                        if (attachment.result[j][0]['testCaseId'] == $("#testCaseName").val()) {
                            if (attachment.result[j][0]['listActualAttach'].length != 0) {
                                for (var k = 0; k < attachment.result[j][0]['listActualAttach'].length; k++) {
                                    attachment.attachTestStep.push({
                                        "roleId": attachment.result[j][0]['roleId'],
                                        "roleName": attachment.result[j][0]['roleName'],
                                        "testCaseId": attachment.result[j][0]['testCaseId'],
                                        "testerName": attachment.result[j][0]['testerName'],
                                        "testerSpUserId": attachment.result[j][0]['testerSpUserId'],
                                        "testStepId": attachment.forTestStepPlanIdGetTestStepId[attachment.result[j][0]['testStepPlanId']],
                                        "testStepName": attachment.result[j][0]['testStepName'],
                                        "testStepPlanId": attachment.result[j][0]['testStepPlanId'],
                                        "fileIndex": attachment.result[j][0]['listActualAttach'][k]['fileIndex'],
                                        "fileName": attachment.result[j][0]['listActualAttach'][k]['fileName'],
                                        "filePath": attachment.result[j][0]['listActualAttach'][k]['filePath'],
                                        "resultType": 'Actual',
                                        "Description": "",	//stop here		   
                                        //"AttachmentID":attachment.result[j][0]['listActualAttach'][k]['filePath'].split("Attachments/")[1].split("/")[0]//forActualDescAttachId[l]['ID']	    				
                                        "AttachmentID": attachment.result[j][0]['AttachmentID']
                                    });
                                }

                            }

                            if (attachment.result[j][0]['listExpectedAttach'].length != 0) {
                                if ($.inArray(attachment.result[j][0]['attachmentID'], temp) == -1) {//['testStepId']
                                    temp.push(attachment.result[j][0]['attachmentID']);//['testStepId']
                                    attachment.attachTestStep.push({
                                        "roleId": 'N/A',
                                        "roleName": 'N/A',
                                        "testCaseId": attachment.result[j][0]['testCaseId'],
                                        "testerName": 'N/A',
                                        "testerSpUserId": 'N/A',
                                        //"testStepId": testStepIdsByExpectedResArr[attachment.result[j][0]['testStepId']].join(),
                                        //"testStepName": testStepNamesByExpectedResArr[attachment.result[j][0]['testStepId']].join(),
                                        "testStepId": testStepIdsByExpectedResArr[attachment.result[j][0]['attachmentID']].join(),
                                        "testStepName": testStepNamesByExpectedResArr[attachment.result[j][0]['attachmentID']].join(),
                                        "testStepPlanId": attachment.result[j][0]['testStepPlanId'],
                                        "fileIndex": attachment.result[j][0]['listExpectedAttach'][0]['fileIndex'],
                                        "fileName": attachment.result[j][0]['listExpectedAttach'][0]['fileName'],
                                        "filePath": attachment.result[j][0]['listExpectedAttach'][0]['filePath'],
                                        "resultType": 'Expected',
                                        "Description": attachment.result[j][0]['description'],
                                        "AttachmentID": attachment.result[j][0]['attachmentID']//trupti		    				
                                    });
                                }
                            }
                        } //End of IF
                    }

                }//End of FOR

                if (attachment.attachTestStep.length == 0) //Added by Rasika
                {
                    if (id == "linkSA_testStepMultiSel") {
                        $("#AlertAttach").show();
                        $(".viewAttachment").hide();
                        $("#countDiv").hide();
                        return false;
                    }
                    else if (id != undefined && id != "linkSA_testStepMultiSel") {
                        //attachment.result = attResult;
                        attachment.attachTestStep = attResult;
                        $("#AlertAttach").hide();
                        $(".viewAttachment").show();
                        //attachment.alertBox("Sorry! You can't uncheck this Test Step as among the selected Test Steps, this is the only Test Step which has Attachment(s).");
                        attachment.alertBox("Sorry! You can't uncheck this " + attachment.gConfigTestStep + " as among the selected " + attachment.gConfigTestStep + "s, this is the only 							    " + attachment.gConfigTestStep + " which has " + attachment.gConfigAttachment + "(s).");//Added by Mohini for Resource file
                        $('input[id=' + id + ']').attr('checked', 'checked');
                        return false;
                    }

                    var attcount = '<label>Showing ' + 0 + '-' + 0 + ' of total  ' + 0 + ' Attachment(s)</label> | <a id="previous" style="cursor:pointer"  							                    onclick="attachment.startIndexTDecrement();attachment.fillAttachmentListFromBuffer()">Previous</a> | <a id="next" style="cursor:pointer"  	                    onclick="attachment.startIndexTIncrement();attachment.fillAttachmentListFromBuffer()">Next</a>';
                    document.getElementById('previous').disabled = "disabled";
                    document.getElementById('previous').style.color = "#989898";

                    document.getElementById('next').disabled = "disabled";
                    document.getElementById('next').style.color = "#989898";
                    attachment.tempResult.length = 0;
                    $("#AlertAttach").show();
                    $(".viewAttachment").hide();
                    $("#countDiv").hide();

                }

                /************************************************/

                //NEW CODE
                //For paging
                var attlength = attachment.attachTestStep.length;
                attachment.gAttlength = attlength;
                if (attlength >= (attachment.startIndexT + 5))
                    var Ei = attachment.startIndexT + 5;
                else
                    var Ei = attlength;
                var par = "1";
                attcount = '<label>Showing ' + ((attachment.startIndexT) + 1) + '-' + Ei + ' of total  ' + attlength + ' Attachment(s)</label> | <a id="previous" style="cursor:pointer"  								onclick="attachment.startIndexTDecrement();attachment.fillAttachmentListFromBuffer()">Previous</a> | <a id="next" style="cursor:pointer"  									onclick="attachment.startIndexTIncrement();attachment.fillAttachmentListFromBuffer()">Next</a>';

                if (attlength != 0) /* if-else block added by shilpa for bug 5157 */ {
                    attachment.countVal = ((attlength) >= 10) ? (attlength) : ('0' + (attlength));
                    if (attachment.countVal == 00) {
                        $("#countDiv").css('display', 'none');
                    }
                    else {
                        //if( $(".navTabs h2:eq(0)").attr("class")== "activeTab")
                        //{
                        //$("#countDiv").css('display','');
                        $("#countDiv").show();
                        $("#labelCount").html(attachment.countVal);
                        //}
                    }
                }
                else {
                    $("#AlertAttach").show();
                    $(".viewAttachment").hide();
                    $("#countDiv").hide();
                }

                if (attachment.startIndexT <= 0) {
                    document.getElementById('previous').disabled = "disabled";
                    document.getElementById('previous').style.color = "#989898";
                }
                else
                    document.getElementById('previous').disabled = false;

                if (attlength <= ((attachment.startIndexT) + 5)) {
                    document.getElementById('next').disabled = "disabled";
                    document.getElementById('next').style.color = "#989898";
                }
                else
                    document.getElementById('next').disabled = false;
            }
            else {
                if (id == "linkSA_testStepMultiSel") {
                    $("#AlertAttach").show();
                    $(".viewAttachment").hide();
                    $("#countDiv").hide();
                    return false;
                }
                else if (id != undefined && id != "linkSA_testStepMultiSel") {
                    //attachment.result = attResult;
                    attachment.attachTestStep = attResult;
                    $("#AlertAttach").hide();
                    $(".viewAttachment").show();
                    //attachment.alertBox("Sorry! You can't uncheck this Test Step as among the selected Test Steps, this is the only Test Step which has Attachment(s).");
                    attachment.alertBox("Sorry! You can't uncheck this " + attachment.gConfigTestStep + " as among the selected " + attachment.gConfigTestStep + "s, this is the only 							" + attachment.gConfigTestStep + " which has " + attachment.gConfigAttachment + "(s).");//Added by Mohini for Resource file
                    $('input[id=' + id + ']').attr('checked', 'checked');
                    return false;
                }

                var attcount = '<label>Showing ' + 0 + '-' + 0 + ' of total  ' + 0 + ' Attachment(s)</label> | <a id="previous" style="cursor:pointer"  							            onclick="attachment.startIndexTDecrement();attachment.fillAttachmentListFromBuffer()">Previous</a> | <a id="next" style="cursor:pointer"  	            onclick="attachment.startIndexTIncrement();attachment.fillAttachmentListFromBuffer()">Next</a>';
                document.getElementById('previous').disabled = "disabled";
                document.getElementById('previous').style.color = "#989898";

                document.getElementById('next').disabled = "disabled";
                document.getElementById('next').style.color = "#989898";
                attachment.tempResult.length = 0;
                $("#AlertAttach").show();
                $(".viewAttachment").hide();
                $("#countDiv").hide();
            }

            if (attachment.attachTestStep != undefined) {
                $("#divAttachmentPaging").pagination(attachment.attachTestStep.length, {
                    callback: attachment.pageselectMACallback,
                    items_per_page: 10,
                    num_display_entries: 10,
                    num: 2
                });
            }
        }
        catch (e) { }

    },

    pageselectMACallback: function (page_index, jq) {
        try {
            // Get number of elements per pagionation page from form
            var items_per_page = 10;
            var max_elemabc = Math.min((page_index + 1) * items_per_page, attachment.attachTestStep.length);
            var tablemarkup = '';

            //To bind grid
            if (attachment.attachTestStep.length != 0) {
                for (var i = page_index * items_per_page; i < max_elemabc ; i++) {
                    var tsNames = attachment.attachTestStep[i]['testStepName'];
                    tsNames = tsNames.replace(/"/g, "&quot;");
                    tsNames = tsNames.replace(/'/g, '&#39;');
                    tsNames = tsNames.replace(/(\r\n)+/g, '');
                    tsNames = tsNames.replace(/(<([^>]+)>)/ig, '');//To remove html tags from tooltip  /*Added by Rasika*/

                    var AttachmentName = attachment.attachTestStep[i]['fileName'].replace(/"/g, "&quot;");
                    AttachmentName = AttachmentName.replace(/'/g, '&#39;');

                    if (attachment.attachTestStep[i]['Description'] != undefined && attachment.attachTestStep[i]['Description'] != '') {
                        var Description = attachment.attachTestStep[i]['Description'].replace(/"/g, "&quot;");
                        Description = Description.replace(/'/g, '&#39;');
                        Description = Description.replace(/(\r\n)+/g, '');
                        Description = Description.replace(/(<([^>]+)>)/ig, '');	/*Added by Rasika*/
                    }
                    else
                        var Description = '';

                    tablemarkup += "<tr><td style='text-align:center'>" + (i + 1) + "</td><td class='selTD'>" + AttachmentName + "</td>" +
									"<td><span title='" + tsNames + "'>" + tsNames + "</span></td>" +
									"<td><span>" + attachment.attachTestStep[i]['resultType'] + "</span></td>" +
									"<td>" + attachment.attachTestStep[i]['testerName'] + "</td>" +
									"<td>" + attachment.attachTestStep[i]['roleName'] + "</td>" +

									'<td style="text-align:center"><span><a title="Edit Attachment" onclick="attachment.editAttachment(' + attachment.attachTestStep[i]['fileIndex'] + ',											\'' + attachment.attachTestStep[i]['filePath'] + '\',\'' + attachment.attachTestStep[i]['testStepId'] + '\',\'' + attachment.attachTestStep[i]['testStepPlanId'] + '\',\'' + attachment.attachTestStep[i]['resultType'] + '\',\'' + Description + '\',\'' + attachment.attachTestStep[i]['AttachmentID'] + '\',										\'' + attachment.attachTestStep[i]['fileName'] + '\');attachment.preview(\'' + attachment.attachTestStep[i]['AttachmentID'] + '\');" style="cursor:pointer;" 											class="pedit"><img  src="../images/Admin/Edit1.png"></a><a title="Delete Attachment"  						                                    onclick="attachment.deleteAttachment(' + attachment.attachTestStep[i]['AttachmentID'] + ',\'' + attachment.attachTestStep[i]['testStepId'] + '\',      											\'' + attachment.attachTestStep[i]['testStepPlanId'] + '\',\'' + attachment.attachTestStep[i]['fileIndex'] + '\',\'' + attachment.attachTestStep[i]['resultType'] + '\')" class="pdelete"  style="cursor:pointer;"><img src="../images/Admin/Garbage1.png"></a></span></td></tr>';

                }
            }

            $("#AttachmentGrid tbody").html(tablemarkup);

        }
        catch (e) { }

    },

    fillAttachmentListFromBuffer: function () {
        if (attachment.attachTestStep.length != 0) {
            var tablemarkup = '<tbody>';

            //NEW CODE  
            //For paging
            var attlength = attachment.attachTestStep.length;
            attachment.gAttlength = attlength;
            if (attlength >= (attachment.startIndexT + 5))
                var Ei = attachment.startIndexT + 5;
            else
                var Ei = attlength;
            var par = "1";

            attcount = '<label>Showing ' + ((attachment.startIndexT) + 1) + '-' + Ei + ' of total  ' + attlength + ' Attachment(s)</label> | <a id="previous" style="cursor:pointer"  								onclick="attachment.startIndexTDecrement();attachment.fillAttachmentListFromBuffer()">Previous</a> | <a id="next" style="cursor:pointer"  									onclick="attachment.startIndexTIncrement();attachment.fillAttachmentListFromBuffer()">Next</a>';


            //To bind grid
            for (var i = attachment.startIndexT; i < Ei; i++) {
                var tsNames = attachment.attachTestStep[i]['testStepName'];
                tsNames = tsNames.replace(/"/g, "&quot;");
                tsNames = tsNames.replace(/'/g, '&#39;');
                tsNames = tsNames.replace(/(\r\n)+/g, '');

                var AttachmentName = attachment.attachTestStep[i]['fileName'].replace(/"/g, "&quot;");
                AttachmentName = AttachmentName.replace(/'/g, '&#39;');

                if (attachment.attachTestStep[i]['Description'] != undefined && attachment.attachTestStep[i]['Description'] != '') {
                    var Description = attachment.attachTestStep[i]['Description'].replace(/"/g, "&quot;");
                    Description = Description.replace(/'/g, '&#39;');
                    Description = Description.replace(/(\r\n)+/g, '');
                }
                else
                    var Description = '';

                tablemarkup += "<tr><td style='text-align:center'>" + (i + 1) + "</td><td class='selTD'>" + AttachmentName + "</td>" +
                                "<td><span title='" + tsNames + "'>" + tsNames + "</span></td>" +
                                "<td><span>" + attachment.attachTestStep[i]['resultType'] + "</span></td>" +
                                "<td>" + attachment.attachTestStep[i]['testerName'] + "</td>" +
                                "<td>" + attachment.attachTestStep[i]['roleName'] + "</td>" +

                                '<td style="text-align:center"><span><a title="Edit Attachment" onclick="attachment.editAttachment(' + attachment.attachTestStep[i]['fileIndex'] + ',												\'' + attachment.attachTestStep[i]['filePath'] + '\',\'' + attachment.attachTestStep[i]['testStepId'] + '\',\'' + attachment.attachTestStep[i]['testStepPlanId'] + '\',\'' + attachment.attachTestStep[i]['resultType'] + '\',\'' + Description + '\',\'' + attachment.attachTestStep[i]['AttachmentID'] + '\',											\'' + attachment.attachTestStep[i]['fileName'] + '\');attachment.preview(\'' + attachment.attachTestStep[i]['filePath'] + '\');" style="cursor:pointer;" 											class="pedit"><img  src="../SiteAssets/images/Admin/Edit1.png"></a><a title="Delete Attachment"  																		onclick="attachment.deleteAttachment(' + attachment.attachTestStep[i]['AttachmentID'] + ',\'' + attachment.attachTestStep[i]['testStepId'] + '\',												\'' + attachment.attachTestStep[i]['testStepPlanId'] + '\',\'' + attachment.attachTestStep[i]['fileIndex'] + '\',\'' + attachment.attachTestStep[i]['resultType'] + '\')" class="pdelete"  style="cursor:pointer;"><img src="../SiteAssets/images/Admin/Garbage1.png"></a></span></td></tr></tbody>';

            }

            $('#attachmentGrd').html(tablemarkup);

            //commented $('#divTestCaseCount').html(attcount);
            if (attachment.startIndexT <= 0) {
                document.getElementById('previous').disabled = "disabled";
                document.getElementById('previous').style.color = "#989898";
            }
            else
                document.getElementById('previous').disabled = false;

            if (attlength <= ((attachment.startIndexT) + 5)) {
                document.getElementById('next').disabled = "disabled";
                document.getElementById('next').style.color = "#989898";
            }

            else
                document.getElementById('next').disabled = false;
        }
        else {
            var attcount = '<label>Showing ' + 0 + '-' + 0 + ' of total  ' + 0 + ' Attachment(s)</label> | <a id="previous" style="cursor:pointer"  				            onclick="attachment.startIndexTDecrement();attachment.fillAttachmentListFromBuffer()">Previous</a> | <a id="next" style="cursor:pointer"  		            onclick="attachment.startIndexTIncrement();attachment.fillAttachmentListFromBuffer()">Next</a>';
            document.getElementById('previous').disabled = "disabled";
            document.getElementById('previous').style.color = "#989898";

            document.getElementById('next').disabled = "disabled";
            document.getElementById('next').style.color = "#989898";
            //attachment.tempResult.length=0;
            $("#AlertAttach").show();
            $(".viewAttachment").hide();
            $("#countDiv").hide();
        }
    },

    //To update attachment
    saveAttachments: function () {
        Main.showLoading();

        //Added by HRW to validate if Attachment is Actual
        if (multiSelectList.getSelectedItems("testStepName").length <= 0) {
            //attachment.alertBox('Please select atleast one Test Step for attachment.');
            attachment.alertBox('Please select atleast one ' + attachment.gConfigTestStep + ' for ' + attachment.gConfigAttachment.toLowerCase() + '.');
            Main.hideLoading();
        }
        else {
            var arr2 = new Array();
            var arr = new Array();
            var validateFlag = 0;
            var flag = 0;
            arr2 = multiSelectList.getSelectedItems("testStepName");
            for (var i = 0; i < arr2.length; i++) {
                arr.push(arr2[i].split("_")[1]);
            }

            if (attachment.fileType == 'Actual') {
                //if(arr[0] != AttamentResult[0]['TestStepID'] || arr.length != 1)
                if (arr[0] != attachment.testStepId || arr.length != 1) //Added by Rasika
                {
                    flag = 1
                    //attachment.alertBox('Actual Result Attachment cannot be cloned.');
                    attachment.alertBox('Actual Result ' + attachment.gConfigAttachment + ' cannot be cloned.');//Added by Mohini for Resource file
                }
            }
            if (flag == 0) {
                var allTSIDcAtt = new Array();
                /*R for(xc in attachment.tempResult)
                {
                    var tes = new Array();
                    if(attachment.tempResult[xc].indexOf(',')!=-1)
                    {
                        tes = attachment.tempResult[xc].split(',');
                        $.merge(allTSIDcAtt,tes);
                    }
                    else
                    {
                        $.merge(allTSIDcAtt,attachment.tempResult[xc]);
                    }
                } R*/

                //Added by Rasika
                if (attachment.tempResult != undefined || attachment.tempResult != null)
                    $.merge(allTSIDcAtt, attachment.tempResult);

                for (var ii = 0; ii < arr.length; ii++) {
                    if (jQuery.inArray(arr[ii], attachment.tempEditTestStep) == -1) {
                        if (jQuery.inArray(arr[ii], allTSIDcAtt) != -1) {
                            //TestStep with attachement found
                            validateFlag = 1;
                            break;
                        }
                    }
                }

                /**************/

                if (validateFlag == 0) {
                    if ((jQuery.trim($("[title*='AttachmentName']").val()) != "") && multiSelectList.getSelectedItems("testStepName").length > 0 && attachment.attID != 0) {
                        var strTestStepIdPipe = '|' + arr.join('|') + '|';

                        //To update attachment in the list
                        //var attList = jP.Lists.setSPObject(this.SiteURL,'Attachment');
                        //var Obj = new Array();
                        //Obj.push({'ID':attachment.attID,
                        //			'TestStepID':strTestStepIdPipe,
                        //			'AttachmentName':jQuery.trim($("[title*='AttachmentName']").val()),
                        //			'Description':jQuery.trim($("[title*='Description']").val())

                        //});
                        //var result= attList.updateItem(Obj);

                        /*******************/
                        //Added by Rasika
                        //To update attachment in the SQLbackend
                        if (attachment.fileIndex != null)
                            attachment.fileIndex = (attachment.fileIndex).toString();
                        /************************************/
                        /*******get ids******/
                        var allTSIDcAtt = new Array();

                        //Added by Rasika
                        if (attachment.tempResult != undefined || attachment.tempResult != null)
                            $.merge(allTSIDcAtt, attachment.tempResult);

                        var tsid = multiSelectList.getSelectedItems("testStepName").join();
                        var tempTSID = tsid.split(",");
                        var splitTSID22 = new Array();
                        for (tSI = 0; tSI < tempTSID.length; tSI++)
                        {
                            var splitTSID2 = tempTSID[tSI].split("_");
                            splitTSID22.push(splitTSID2[1]);                            
                        }
                    
                    var strTSId22 = '|' + splitTSID22.join('|') + '|';
                    /******get ids*******/
                        var data = {
                            "AttachmentId": parseInt(attachment.attID),
                            "TestStepID": strTSId22.toString(),
                            "AttachmentName": null,
                            "Description": null,
                            "ResultType": null,
                            "ProjectID": null,
                            "TestPassID": null,
                            "StatementType": "Update",
                            "TestCaseID": null
                        };

                        var result = ServiceLayer.InsertUpdateData("senddata", data, "Attachment");

                        /************************************/
                        var insertAttachDetails = '';
                        insertAttachDetails = {
                            'attID': parseInt(attachment.attID),
                            'testPassId': show.testPassId,
                            'fileName': jQuery.trim($("[title*='AttachmentName']").val()),
                            'Description': jQuery.trim($("[title*='Description']").val()),
                            'testStepId': arr.join(),
                            //'testStepPlanId':parseInt(attachment.testStepPlanId),
                            'fileUrl': "",
                            //'fileIndex':attachment.fileIndex,
                            'fileType': attachment.fileType,
                            'StatementType': 'Update',
                            'isDelete': 'false'
                        };
                        var resultSQL = ServiceLayer.InsertUpdateData("InsertUpdateAttachment", insertAttachDetails, "Attachment");//ServiceLayer.InsertUpdateData("InsertUpdateAttachment",insertAttachDetails);				    	
                        //////////////

                        //var insertAttachDetails = '';
                        //insertAttachDetails = {
                        //    'testPassId': tpid.toString(),//cd
                        //    'fileName': filename,
                        //    'fileUrl': "",//'fileUrl': fileUrl,
                        //    'testStepId': strTestStepComma,
                        //    'fileType': 'Expected',
                        //    'isDelete': 'false'
                        //};
                        //var result = ServiceLayer.InsertUpdateData("InsertUpdateAttachment", insertAttachDetails, "Attachment");

                        //////////////
                        //if( result!=undefined && resultSQL!=undefined)
                        if (resultSQL != undefined)
                            //attachment.alertBox(attachment.gConfigAttachment+' updated successfully!');//Added by Mohini for Resource file
                            Main.AutoHideAlertBox(attachment.gConfigAttachment + ' updated successfully!');

                        /*******************/

                        $('.ms-formtable').css('margin-top', '-125px');
                        $(".navTabs h2").eq(0).click();
                        attachment.attID = 0;
                        attachment.fillAttachmentList();
                        /****to bring to save mode****/
                        //$("[title$='AttachmentName']").val('');
                        //$("[title$='Description']").val('');
                        attachment.clearFields();//Added by HRW
                        $("#btnEditSave").hide();
                        //$("[id$='diidIOSaveItem']").show();
                        $("#onetidIOFile").attr("disabled", false);
                        $('#attachOKbutton').attr("disabled", false);
                        //$('.cancelButton').attr("disabled",false);
                        // for bug 5413
                        $($('#idSpace').siblings()[1]).attr('disabled', false); // cancel button
                        $('.cancelButton').attr("title", '');
                        $('#attachOKbutton').attr("title", '');
                        $("#addNewAttachment").hide();			// added by shilpa

                        // Added by shilpa on 12 march bug 5596
                        $('#attachmentsOnClient').empty().html('<b>File Name:<span style="color:red;font-weight:bold;">*</span></b><input style="width: 200pt;" id="onetidIOFile" class="ms- 							fileinput" title="Name  " name="fileupload0" size="56" type="file">');

                    }		/******/

                    else if (jQuery.trim($("[title*='AttachmentName']").val()) == "") {
                        //attachment.alertBox('Please enter attachment name.');
                        attachment.alertBox('Please enter ' + attachment.gConfigAttachment.toLowerCase() + ' name.');//Added by Mohini for Resource file
                        Main.hideLoading();
                    }
                    else if (multiSelectList.getSelectedItems("testStepName").length <= 0) {
                        //attachment.alertBox('Please select atleast one Test Step for attachment.');
                        attachment.alertBox('Please select atleast one ' + attachment.gConfigTestStep + ' for ' + attachment.gConfigAttachment.toLowerCase() + '.');//Added by Mohini for Resource file
                        Main.hideLoading();
                    }
                }
                else if (validateFlag == 1) {
                    //attachment.alertBox('Attachment already present for the Test Step.');
                    attachment.alertBox(attachment.gConfigAttachment + ' already present for the ' + attachment.gConfigTestStep + '.');//Added by Mohini for Resource file
                    Main.hideLoading();
                }
            }
        }
        Main.hideLoading();
        //To enable the Create and View links
        //$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
        //$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
    },
    //Added by Rasika
    fileIndex: 0,
    testStepPlanId: 0,
    testStepId: 0,
    fileUrl: '',
    fileType: '',

    //edit list item
    editAttachment: function (fileIndex, fileUrl, testStepIds, testStepPlanId, fileType, description, attachID, attName) {

        var descNew = ServiceLayer.GetData("GetDescAttachment" + "/" + attachID, null, "Attachment");
        
        description = descNew;
        //attachID = fileUrl.split("Attachments/")[1].split("/")[0];
        // Added for DD
        $(".tableMargin").css("margin-top", "0px");
        $(".uploadContainer").css("display", "none");//trupti
        createDD.editMode = 1;
        createDD.hideDD();
        $("#testCaseName").attr('disabled', true);
        $("#testCaseName").attr('title', 'Sorry! heirarchy selection is not available in edit mode');

        $('.ms-formtable').css('margin-top', '-5px');
        $('#partAttachment table tbody tr:eq(3)').css('display', 'none');
        $('.navTabs h2').css('color', '#7F7F7F');
        $('.navTabs h2:eq(2)').css('color', '#000000');


        $("#countDiv").hide();//added by Mohini

        Main.showLoading();
        $('#attachOKbutton1').hide();
        $('#attachCancelButton').hide();
        $('#attachmentsOnClient').css('display', 'none');
        $('#previewContainer').show();

        $("#btnEditSave").show();
        $("[id$='diidIOSaveItem']").hide();
        $("#onetidIOFile").attr("disabled", true);
        $('#attachOKbutton').attr("disabled", true);
        $('#addNewAttachment').show(); // Added by shilpa
        // for bug 5413
        $($('#idSpace').siblings()[1]).attr('disabled', true); // cancel button
        /* 1/11/2013 for bug 5514*/
        $('#partAttachment table tbody tr:eq(1)').css('display', 'block');
        $('#lblName').remove(); // Added by shilpa on 12 march bug 5596
        $('#attachmentsOnClient').empty().html('<b>File Name:</b><input style="width: 200pt;" id="onetidIOFile" class="ms-fileinput" title="Name  " name="fileupload0" size="56" 						type="file">');
        $("#idAttachmentsTable tbody tr:last").remove();
        $('#onetidIOFile').attr("disabled", true);
        /* */
        $('#idAttachmentsTable tbody tr:eq(1)').hide();

        //Set global variables for updating attachment used in the saveAttachments()
        attachment.attID = attachID;
        attachment.fileIndex = fileIndex;
        attachment.testStepPlanId = testStepPlanId;
        attachment.fileUrl = fileUrl;
        attachment.fileType = fileType;

        attachment.testStepId = testStepIds;//Only used for actual attachment in saveAttachments() to check clone condition

        multiSelectList.setSelectedItemsFromArray("testStepName", testStepIds.split(',').length > 0 ? testStepIds.split(',') : new Array(testStepIds));

        $("[title*='AttachmentName']").val();
        $("[title*='AttachmentName']").val(attName);

        $("[title*='Description']").val();

        ///////////////////////////////
        var query = '<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">' + attachID + '</Value></Eq></Where><ViewFields><FieldRef Name="TesterName"/></ViewFields></Query>';
        var Result = null;//attachment.dmlOperation(query, 'Attachment');
        if (Result != undefined || Result != null)
            description = Result[0]['Description'];
        //////////////////////////////
        var desc = description;
        desc = (desc != null && desc != "undefined" && desc != "") ? desc : '-';;
        $("[title*='Description']").val(desc);

        attachment.tempEditTestStep = testStepIds.split(',');

        /*************************/
        $('#attachOKbutton').text("Update");
        $(".navTabs h2").removeClass("activeTab");
        $(".navTabs h2:eq(2)").show().addClass("activeTab");
        $(".AddAttachment").show();
        $("#AttachmentContainer").hide();
        $('.ms-attachUploadButtons').hide();
        $("#btnReset").show();

        Main.hideLoading();

        //To disable the Create and view links on edit mode
        //$(".navTabs h2:eq(0)").attr("disabled",true).css("cursor","default");
        //$(".navTabs h2:eq(1)").attr("disabled",true).css("cursor","default");

        //downloadfile by trupti

        var getPath = ServiceLayer.getFileAtta(attachID.toString());
        if(getPath.indexOf('image')!= -1)
        $("#preview img").attr('src', getPath);
        else
            $("#preview img").attr('src', '../images/preview-cat.png');
        $("#preview img").css('width', '100%');
        $("#preview img").css('height', '100%');
        //// $("#preview").html("<img src='../images/preview-cat.png' style='width:250px;height:200px;border:1px solid gray;' title='No Preview Available'/>");

    },

    //Delete list item
    deleteAttachment: function (id, testStepIds, testStepPlanId, fileIndex, fileType) {
        $("#dialog:ui-dialog").dialog("destroy");
        //$( "#divConfirm" ).text('Are you sure want to delete attachment?');
        $("#divConfirm").text('Are you sure want to delete ' + attachment.gConfigAttachment.toLowerCase() + '?');//Added by Mohini for Resource file				
        $("#divConfirm").dialog
            ({
                autoOpen: false,
                resizable: false,
                //height: 140,
                width: 'auto',
                modal: true,
                buttons:
                {
                    "Delete": function () {
                        Main.showLoading();
                        setTimeout('attachment.delOk(' + id + ',\'' + testStepIds + '\',\'' + testStepPlanId + '\',\'' + fileIndex + '\',\'' + fileType + '\');', 100);
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
    delOk: function (id, testStepIds, testStepPlanId, fileIndex, fileType) {
        //To delete attachment from the list
        //var listName = jP.Lists.setSPObject(attachment.SiteURL,'Attachment');						
        //var res = listName.deleteItem(id);	

        //To delete attachment from the SQLbackend
        if (fileIndex != 'null')
            fileIndex = fileIndex.toString();
        else
            fileIndex = '';

        //var insertAttachDetails='';
        //insertAttachDetails={
        // 	 'testPassId':show.testPassId,
        //	 'fileName':"",
        //	 'testStepId':testStepIds,
        //	 'testStepPlanId':testStepPlanId,
        //	 'fileUrl':"",
        //	 'fileIndex':fileIndex,
        //	 'fileType':fileType,
        //	 'isDelete':'true'
        //	};
        ////var resultSQL=ServiceLayer.InsertUpdateData("InsertUpdateAttachment",insertAttachDetails);
        //////////////////
        var insertAttachDetails = '';
        insertAttachDetails = {
            'attID': parseInt(id),
            'testPassId': show.testPassId,
            'fileName': "",
            // "TestStepPlanID":null,
            'Description': "",
            'fileUrl': '',//'fileUrl': fileUrl,
            //'fileIndex': '',
            'testStepId': testStepIds,
            'fileType': 'Expected',
            'StatementType': 'Delete',
            'isDelete': 'true'
        };
        var resultSQL = ServiceLayer.InsertUpdateData("InsertUpdateAttachment", insertAttachDetails, "Attachment");

        /////////////////
        //attachment.alertBox("Attachment Deleted !!! ");
        //attachment.alertBox(attachment.gConfigAttachment+" Deleted !!! ");//Added by Mohini for Resource file
        Main.AutoHideAlertBox(attachment.gConfigAttachment + " Deleted !!! ");
        attachment.clearFields();
        //$( this ).dialog( "close" );										
        attachment.fillAttachmentList();
        attachment.addMode(); // added by shilpa	
    },
    preview: function (filepath) {

        //downloadfile by trupti

        //  $("#preview img").attr('src', "data:image/jpeg;base64," + getPath + "");

        if (filepath != undefined && filepath != '') {

            $("#attDownload").click(function () {                
                var getPath = ServiceLayer.downloadFromAttachmentPg(filepath.toString());
               // $("#preview img").attr('src', getPath);              
            });

            $("#attDownload").show();
        }
        else {
            // $("#preview").html("<img src='../images/preview-cat.png' style='width:250px;height:200px;border:1px solid gray;' title='No Preview Available'/>");
            //$("#attDownload").removeAttr("href");
            $("#attDownload").unbind("click");
            $("#attDownload").hide();
        }
    },
    clearFields: function () {
        attachment.preview('');
        //multiSelectList.selectItemByIndex("testStepName",0);For bug 6728 and bug 6034

        $("[title*='AttachmentName']").val('');
        $("[title*='Description']").val('');

        $("[name$='btnUpload']").attr("disabled", false);
        $("[name$='uploadFile']").attr("disabled", false);;

        $("#btnSave").hide();
        $("#btnCancel").hide();

    },
    //Excecute DML operations on list
    dmlOperation: function (search, list) {
        //var listname = jP.Lists.setSPObject(attachment.SiteURL, list);
        //var query = search;
        //var result = listname.getSPItemsWithQuery(query).Items;
        //return (result);
    },

    filterData: function (info2) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        info2 = mydiv.innerText;
        return info2;
    },
    alertBoxForAttachment: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog(
        {
            //height: 150,
            modal: true,
            width:'auto',
            buttons:
                    {
                        "Ok": function () {
                            $(this).dialog("close");
                            window.location.href = window.location.href;
                        }
                    },

            close: function () { window.location.href = window.location.href; }
        });
    },

    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog(
        {
           // height: 150,
            modal: true,
            width: 'auto',
            buttons:
                    {
                        "Ok": function () {
                            $(this).dialog("close");
                        }
                    }
        });

    },
    showFileNameDescription: function (attname, desp) {
        if (attname != 'undefined' && attname != null)
            $("[title*='AttachmentName']").val(attname);
        else
            $("[title*='AttachmentName']").val('');
        if (desp != 'undefined' && desp != null)
            $("[title*='Description']").val(desp);
        else
            $("[title*='Description']").val('-');

    },
    /**** Function Added by shilpa *****/
    addMode: function () {

        $("#f_UploadImage").replaceWith($("#f_UploadImage").clone(true));
        $("[title*='AttachmentName']").val('');
        $("[title*='Description']").val('');
        $("#preview").html("<img src='../SiteAssets/images/preview-cat.png'/>");
        //$("#onetidIOFile").attr("disabled",false);
        $("#btnEditSave").hide();
        //$("[id$='diidIOSaveItem']").hide();
        $("#addAttachLink").hide();
        $('#attDownload').hide();
        //$('#attachmentGrd').html("<h3>There are no attachments.</h3>");
        $('#pagination').hide();
        // for bug 5413
        $($('#idSpace').siblings()[1]).attr('disabled', false); // cancel button
        $('#attachOKbutton').attr("disabled", false);
        $('.cancelButton').attr("title", '');
        $('#attachOKbutton').attr("title", '');
        // added by shilpa on 31 oct
        $('#lblName').remove(); // Added by shilpa on 12 march bug 5596

        $('#attachmentsOnClient').empty().html('<b>File Name:<span style="color:red;font-weight:bold;">*</span></b><input style="width: 200pt;" id="onetidIOFile" class="ms-fileinput" title="Name  " name="fileupload0" value="ejaz" size="56" type="file">');


        $('#partAttachment table tbody tr:eq(1)').css('display', 'block');
        $('#fNM').remove();
        //commented $("#divTestCaseCount").hide();
        $('#addNewAttachment').hide();
        $("#testStepName").find(".mslChk").removeAttr('checked', 'checked'); //Added by shilpa on 18 dec
        //R $("#onetidIOFile").val(file);


    },

    ResetEditAttachment: function () {

        attachment.clearFields();
        $("#linkSN_testStepName").click();
        $("#AttachmentContainer").hide();
    },

    alertBox1: function (msg) {
        $("#divAlert1").html(msg);
        $('#divAlert1').dialog(
		{
		    //height: 170,
		    modal: true,
		    width: 'auto',
		    buttons:
					{
					    "Ok": function ()
					    {
					        var _url =document.URL;
					       // var _url = Main.getSiteUrl();
					        if (_url.indexOf("/Index") > 0) {
					            _url = _url.substr(0, _url.indexOf("/Index"))
					        }
					        else if (_url.indexOf("/ProjectMgnt") > 0) {
					            _url = _url.substr(0, _url.indexOf("/ProjectMgnt"))
					        }					        

					        if (attachment.noprjFlag == 1)
					            window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'Dashboard/ProjectMgnt';//Main.getSiteUrl() + '/SitePages/ProjectMgnt_1.aspx';
					        else if (attachment.noTPFlag == 1)
					            window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'TestPass' + '?pid=' + show.projectId + '&tpid=' + show.testPassId; //Main.getSiteUrl() + '/SitePages/TestPassMgnt_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
					        else if (attachment.noTestrFlag == 1)
					            window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'Tester' + '?pid=' + show.projectId + '&tpid=' + show.testPassId; //Main.getSiteUrl() + '/SitePages/Tester_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
					        else if (attachment.noTCFlag == 1)
					            window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'TestCase' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;//Main.getSiteUrl() + '/SitePages/testcase_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
					        else if (attachment.noTSFlag == 1)
					            window.location.href = _url.substr(0, _url.lastIndexOf('/') + 1) + 'TestStep' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;//Main.getSiteUrl() + '/SitePages/TestStep_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
					        $(this).dialog("close");
					    },
					    "Cancel": function () {
					        $(this).dialog("close");
					    }
					}
		});
    }

}