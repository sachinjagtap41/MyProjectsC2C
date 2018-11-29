
$(document).ready(function () {

    $("#navBulkImport").addClass("activeNav");

    $(".navTabs").hide();

    Main.showLoading();

    setTimeout('impTS.onPageLoad();', 200);

    Main.hideLoading();

});

var impTS = {
    erroroccur : 0,
    i: 0,
    msg: '',
    row: 0,
    blExl: 0,
    intc: 0,
    totc: 0,
    testCaseIDsInPage: new Array(),
    testWithSpecialCharacter: 0,
    flagForImport: 0,
    isPortfolioOn: true,
    isWindowClosed: false,

    onPageLoad: function () {

        //impTS.showErrorMsg();
        show.showData("attachment");

        $('.rgTableBread').show();
        if (isPortfolioOn) {
            $(".prjHead").hide();
            createDD.create();
        }
        else
            createDD.createWithoutPort();

        //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014 
        $("#groupHead label").html("Group" + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#portfolioHead label").html("Portfolio" + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#projectHead label").html("Project" + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#versionHead label").html("Version" + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014


        $('#pageTab h2:eq(0)').click(function () {
            $("#pageTab h2").css('color', 'rgb(127, 127, 127)');
            $(this).css('color', 'rgb(0, 0, 0)');

            $("#impExpTemplate").show();
            $("#dvHistory").hide();
        });

        $('#pageTab h2:eq(1)').click(function () {
            $("#pageTab h2").css('color', 'rgb(127, 127, 127)');
            $(this).css('color', 'rgb(0, 0, 0)');

            $("#impExpTemplate").hide();
            $("#dvHistory").show();
        });

        $("#btnDownloadTemplate").click(function () {
            window.setTimeout("Main.showLoading()", 200);

            var data = ServiceLayer.GetData("DownloadBulkImportTemplate" + "/" + show.projectId, null, "BulkDownloadImportTemplate");

            if (data[0] == undefined || data.length == 0) {
                alert("Please try again");
                window.setTimeout("Main.hideLoading()", 200);
                return;
            }
            if (typeof (window.ActiveXObject) == undefined) {
            }
            try {
                var excel = new ActiveXObject("Excel.Application");
            }
            catch (e) {
                stat = 1;
                // window.setTimeout("Main.hideLoading()", 200);
                Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature");
            }

            var objExcel = excel.Workbooks.Open(ServiceLayer.appurl + "/Excel/BulkImportTemplateUAT.xlsx");
            var ExcelSheet = objExcel;

            try {
                var fileObj = new ActiveXObject("Scripting.FileSystemObject");
            }
            catch (e) {
                stat = 1;
            }
            try {

                var DestinationFileLoc = "BulkImportTemplateUAT" + ".xlsx";

                fileExists = fileObj.fileExists("C:\\Download\\" + DestinationFileLoc);

                if (fileExists)
                    var DestinationFileLoc = "BulkImportTemplateUAT" + ".xlsx";

                ExcelSheet.saveAs(DestinationFileLoc);

                var excel_sheet;
                excel_sheet = excel.Worksheets("Project Info");

                //excel_sheet.Unprotect.Password = "~~UAT2.0_2014**";

                excel_sheet.Cells(4, 2).Value = data[0].Project_Name;
                excel_sheet.Cells(7, 2).Value = data[0].Project_Version;
                excel_sheet.Cells(8, 2).Value = data[0].Group_Name;

                excel_sheet.Cells(7, 5).Value = data[0].ProjectLead;
                excel_sheet.Cells(8, 5).Value = data[0].Portfolio_Name;

                excel_sheet.Cells(10, 2).Value = data[0].Project_Description;

                excel_sheet.Cells(17, 2).Value = data[0].Start_Date;
                excel_sheet.Cells(17, 5).Value = data[0].End_Date;
                excel_sheet.Cells(3, 10).Value = data[0].Project_Id;

                //    excel_sheet.Unprotect.Password = "~~UAT2.0_2014**";

                excel.visible = true;

                CollectGarbage();
                window.setTimeout("Main.hideLoading()", 200);

            }
            catch (err) {
                alert(err.message);
                window.setTimeout("Main.hideLoading()", 200);
            }
            window.setTimeout("Main.hideLoading()", 200);
        });

        $("#btnUploadTemplate").click(function () {

            //   impTS.uploadFile();
            impTS.confirmMessage();

        });

    },

    confirmMessage: function () {
        //Initialize the file colntrol
        // $("#btnUploadTemplate").next().remove();

        // $("#btnUploadTemplate").after('<input id="fileUpload" style="display: none;" onchange="impTS.uploadFile();" type="file">');

        //Call the dialog box
        //  $("#errorMsg").html("<b>Please Note</b>: Using Bulk Import will delete all the existing data associated with the project: " + $("#projectTitle label").attr("title"));

        $("#errorMsg").html("<b>Please Note</b>: Add only unique Test Pass Name's in the excel of the project: " + $("#projectTitle label").attr("title"));

        $('#errorMsg').dialog({

            modal: true,

            buttons: {

                "Yes": function () {

                    //setTimeout(function(){
                    //  $("#fileUpload").click();
                    //},1);
                    $(this).dialog("close");
                    impTS.uploadFile();
                    //        $(this).dialog("close");


                },
                "No": function () { $(this).dialog("close"); }

            }
        });
    },

    uploadFile: function () {

        var Error_Listobj = new Array();

        window.setTimeout("Main.showLoading()", 200);
        row: 0;
        if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature");
        }
        else {

            var stat = 0;
            var flgActiveX = 0, flgWord = 0;
            try {
                var excel = new ActiveXObject("Excel.Application");
                stat = 1;
            }
            catch (ex) {
                Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
            }
            if (stat == 0) {
                Main.hideLoading();
                return;
            }
            $("#upload").remove();
            $("#divUpload").html('<input type="file" id="upload" style="display:none"/>');
            $("#upload").click();
            var path = $('#upload').val();

            //Code added by sushil for waiting cursor on 21 August - 2012//
            window.setTimeout('$("#upload").remove();', 200);
            window.setTimeout('Main.showLoading();', 200);

            var stat = 0;
            var blnk = 0;
            if (path == "" || path == null || path == undefined) {
                impTS.msg = "You have not selected the file.<br/>";
                stat = 1;
                impTS.alertBox(impTS.msg);
                Main.hideLoading();
                return;
            }
            var ext = path.split('.').pop().toLowerCase();
            if ($.inArray(ext, ['xlsx', 'xls']) == -1) {
                if (stat == 0) {
                    impTS.msg = "Please select the Excel file Template with extension .xls or .xlsx!<br/>";
                    stat = 1;
                }
            }
            else {
                var excel_file = excel.Workbooks.Open(path);

                var excel_sheet;

                try {
                    excel_sheet = excel.Worksheets("Project Info");
                }
                catch (e) {
                    blnk = 1;
                }

                if (blnk == 1) {
                    Main.hideLoading();
                    return;
                }
                Main.showLoading();

                //To Read the Project ID
                var ProjectID = parseInt(excel_sheet.Cells(3, 10).Value);

                if (ProjectID == show.projectId) {
                    //Test Pass 
                    var excel_sheet;
                    excel_sheet = excel.Worksheets("Test Pass");
                    var tableName = excel_sheet.ListObjects(1).Name;

                    var tableAddress = excel_sheet.ListObjects("tblTestPass").Range.Address;
                    var startIndex = parseInt(tableAddress.split(":")[0].split('$')[2]) + 1;
                    var endIndex = parseInt(tableAddress.split(":")[1].split('$')[2]);

                    var rows = excel_sheet.UsedRange.Rows.Count;
                    var TestPass_Listobj = new Array();

                    for (var i = startIndex; i <= endIndex; i++) {
                        if (excel_sheet.Cells(i, 3).Value == undefined) {
                            Error_Listobj.push({
                                row: i,
                                sheetName: 'Test Pass',
                                Error: 'Please Enter Test Pass Name.'
                            });
                        }

                        if (excel_sheet.Cells(i, 5).Value == undefined) {
                            Error_Listobj.push({
                                row: i,
                                sheetName: 'Test Pass',
                                Error: 'Please Enter Test Manager Name.'
                            });
                        }
                        if (excel_sheet.Cells(i, 6).Value == undefined) {
                            Error_Listobj.push({
                                row: i,
                                sheetName: 'Test Pass',
                                Error: 'Please Enter Start Date.'
                            });
                        }
                        if (excel_sheet.Cells(i, 7).Value == undefined) {
                            Error_Listobj.push({
                                row: i,
                                sheetName: 'Test Pass',
                                Error: 'Please Enter End Date.'
                            });
                        }

                        // if (excel_sheet.Cells(i, 3).Value != undefined)
                        if (Error_Listobj.length == 0) {
                            var Startdate;
                            var Enddate;


                            if (excel_sheet.Cells(i, 6).Value != undefined) {
                                Startdate = new Date(excel_sheet.Cells(i, 6).Value);
                            }
                            if (excel_sheet.Cells(i, 7).Value != undefined) {
                                Enddate = new Date(excel_sheet.Cells(i, 7).Value);
                            }
                            var Startdate1 = Startdate.getUTCFullYear() + "-" + (Startdate.getMonth() + 1) + "-" + (Startdate.getDate());
                            var EndDate1 = Enddate.getUTCFullYear() + "-" + (Enddate.getMonth() + 1) + "-" + (Enddate.getDate());

                            TestPass_Listobj.push({

                                'Project_Id': ProjectID,
                                'TestPass_Name': excel_sheet.Cells(i, 3).Value == undefined ? "" : excel_sheet.Cells(i, 3).Value,
                                'TestPass_Description': excel_sheet.Cells(i, 4).Value == undefined ? "" : excel_sheet.Cells(i, 4).Value,
                                'TestMgrEmail': excel_sheet.Cells(i, 5).Value == undefined ? "" : excel_sheet.Cells(i, 5).Value,
                                'Start_Date': Startdate1,
                                'End_Date': EndDate1
                            });
                        }
                    }

                    //Check If Mandatory fields are filled or not.
                    //If Not than display message and stop further process.

                    if (Error_Listobj.length == 0) {

                        //Tester
                        var excel_sheet;
                        excel_sheet = excel.Worksheets("Tester");
                        var tableName = excel_sheet.ListObjects(1).Name;

                        var tableAddress = excel_sheet.ListObjects("tblTester").Range.Address;
                        var startIndex = parseInt(tableAddress.split(":")[0].split('$')[2]) + 1;
                        var endIndex = parseInt(tableAddress.split(":")[1].split('$')[2]);

                        var rows = excel_sheet.UsedRange.Rows.Count;

                        var Tester_Listobj = new Array();

                        for (var i = startIndex; i <= endIndex; i++) {
                            if (excel_sheet.Cells(i, 5).Value != undefined) {
                                Tester_Listobj.push
                                ({
                                    'Project_Id': ProjectID,
                                    'TestPass_Name': excel_sheet.Cells(i, 5).Value == undefined ? "" : excel_sheet.Cells(i, 5).Value,
                                    'TesterEmail': excel_sheet.Cells(i, 6).Value == undefined ? "" : excel_sheet.Cells(i, 6).Value,
                                    'RoleName': excel_sheet.Cells(i, 7).Value == undefined ? "" : excel_sheet.Cells(i, 7).Value,
                                    'Area': excel_sheet.Cells(i, 8).Value == undefined ? "" : excel_sheet.Cells(i, 8).Value
                                });
                            }
                        }

                        //Test Case
                        var excel_sheet;
                        excel_sheet = excel.Worksheets("Test Case");
                        var tableName = excel_sheet.ListObjects(1).Name;

                        var tableAddress = excel_sheet.ListObjects("tblTestCase").Range.Address;
                        var startIndex = parseInt(tableAddress.split(":")[0].split('$')[2]) + 1;
                        var endIndex = parseInt(tableAddress.split(":")[1].split('$')[2]);

                        var rows = excel_sheet.UsedRange.Rows.Count;

                        var TestCase_Listobj = new Array();

                        for (var i = startIndex; i <= endIndex; i++) {
                            if (excel_sheet.Cells(i, 4).Value != undefined) {
                                TestCase_Listobj.push
                                ({
                                    'Project_Id': ProjectID,
                                    'TestPass_Name': excel_sheet.Cells(i, 4).Value == undefined ? "" : excel_sheet.Cells(i, 4).Value,
                                    'TestCase_Name': excel_sheet.Cells(i, 6).Value == undefined ? "" : excel_sheet.Cells(i, 6).Value,
                                    'TestCase_Description': excel_sheet.Cells(i, 7).Value == undefined ? "" : excel_sheet.Cells(i, 7).Value,
                                    'ETT': excel_sheet.Cells(i, 8).Value == undefined ? 0 : excel_sheet.Cells(i, 8).Value
                                });
                            }
                        }

                        //Test Step

                        var excel_sheet;
                        var objActiveX = new ActiveXObject("Scripting.FileSystemObject");
                        flgActiveX = 1;
                        var objWord = new ActiveXObject("Word.Application");
                        flgWord = 1;

                        if (flgActiveX == 1 && flgWord == 1)
                            var doc = objWord.Documents.Add();

                        if (flgActiveX == 1 && flgWord == 0) /* shilpa 26sep */
                            impTS.alertBox("Microsoft Word cannot be detected.");

                        excel_sheet = excel.Worksheets("Test Step");

                        var d = [];
                        var projectFound;
                        var tpFound;
                        var availableTestCaseIDs = new Array();
                        var availableRoleIDs = new Array();
                        impTS.blExl = 0;

                        var cnt = excel_sheet.UsedRange.Rows.Count;
                        blnk = 0;

                        var myRange1 = document.body.createTextRange();
                        var tableName = excel_sheet.ListObjects(1).Name;

                        var tableAddress = excel_sheet.ListObjects("tblTestStep").Range.Address;
                        var startIndex = parseInt(tableAddress.split(":")[0].split('$')[2]) + 1;
                        var endIndex = parseInt(tableAddress.split(":")[1].split('$')[2]);

                        var rows = excel_sheet.UsedRange.Rows.Count;

                        var TestStep_Listobj = new Array();

                        for (var i = startIndex; i <= endIndex; i++) {
                            if (excel_sheet.Cells(i, 4).Value != undefined) {
                                $('#divHtml').html("");
                                var sel = objWord.Selection;
                                for (var mm = 0; mm < 100; mm++) {
                                    try {
                                        excel_sheet.Cells(i, 11).copy();
                                        sel.Paste();
                                        break;
                                    }
                                    catch (e) {
                                        continue;
                                    }
                                }
                                var _expectedRes = ""
                                var _expectedResImage = ""

                                var xdDoc = new ActiveXObject("Microsoft.XMLDOM");
                                xdDoc.loadXML(doc.WordOpenXML);
                                var openXML = xdDoc.xml;
                                impTS.pasteData(openXML, divHtml);
                                var expRes = $('#divHtml').html();
                                _expectedRes = expRes;


                                doc.Select();
                                sel.Delete();

                                var testCaseNamesInPage = new Array();

                                var roleNamesInPage = new Array();
                                var roleIDsInPage = new Array();

                                projectFound = false;
                                tpFound = false;
                                availableTestCaseIDs.length = 0;
                                availableRoleIDs.length = 0;

                                d[1] = excel_sheet.Cells(i, 4).Value == undefined ? "" : excel_sheet.Cells(i, 4).Value;    //Test Pass Name
                                if (d[1] != undefined)
                                    d[1] = jQuery.trim(d[1].toString());

                                d[2] = excel_sheet.Cells(i, 7).Value == undefined ? "" : excel_sheet.Cells(i, 7).Value;    //Test Case Name

                                if (d[2] != undefined)

                                    d[2] = jQuery.trim(d[2].toString());

                                try {
                                    if (excel_sheet.Cells(i, 4).Value != undefined || excel_sheet.Cells(i, 4).Value != "") {
                                        d[3] = "<a href=\'" + excel_sheet.Cells(i, 9).Hyperlinks(blnk + 1).Address + "\'>" + excel_sheet.Cells(i, 9).Value + "</a>";           //Test Steps
                                    }
                                }
                                catch (e) {
                                    d[3] = excel_sheet.Cells(i, 9).Value;   //Test Steps                   
                                }
                                if (d[3] != undefined)
                                    d[3] = jQuery.trim(d[3].toString());

                                if (excel_sheet.Cells(i, 10).Value != undefined) {
                                    d[4] = excel_sheet.Cells(i, 10).Value;              //Roles
                                    if (d[4] != undefined)
                                        d[4] = jQuery.trim(d[4].toString());
                                }
                                else
                                    d[4] = '';

                                TestStep_Listobj.push
                                ({
                                    'Project_Id': ProjectID,
                                    'TestPass_Name': d[1],
                                    'TestCase_Name': d[2],
                                    'TestStep_Name': d[3],
                                    'Role': d[4],
                                    'Expected_Result': _expectedRes,
                                    'Expected_Result_Image': _expectedResImage
                                });

                                impTS.row++;
                            }
                        }


                        if (Tester_Listobj.length == 0) {
                            Tester_Listobj.push
                                  ({
                                      'Project_Id': 0,
                                      'TestPass_Name': "",
                                      'TesterEmail': "",
                                      'RoleName': "",
                                      'Area': ""
                                  });

                        }
                        if (TestCase_Listobj.length == 0) {
                            TestCase_Listobj.push
                                ({
                                    'Project_Id': 0,
                                    'TestPass_Name': "",
                                    'TestCase_Name': "",
                                    'TestCase_Description': "",
                                    'ETT': 0
                                });

                        }
                        if (TestStep_Listobj.length == 0) {
                            TestStep_Listobj.push
                            ({
                                'Project_Id': 0,
                                'TestPass_Name': "",
                                'TestCase_Name': "",
                                'TestStep_Name': "",
                                'Role': "",
                                'Expected_Result': "",
                                'Expected_Result_Image': ""
                            });
                        }

                        var BulkImportArrayList =
                        {
                            "TestPass_Listobj": TestPass_Listobj,
                            "Tester_Listobj": Tester_Listobj,
                            "TestCase_Listobj": TestCase_Listobj,
                            "TestStep_Listobj": TestStep_Listobj
                        };


                        try {
                            //Code to Check if Test Pass Already exist 
                            for (var i = 0; i < show.GetGroupPortfolioProjectTestPass.length; i++) {
                                if (ProjectID == show.GetGroupPortfolioProjectTestPass[i].projectId) {
                                    show.allTestPasses = show.GetGroupPortfolioProjectTestPass[i].testPassList;
                                    break;
                                }
                            }

                            var loopvar = 0; var list;

                            var TestPassAlreadyExist = new Array();

                            if (TestPass_Listobj.length > show.allTestPasses.length) {
                                loopvar = TestPass_Listobj.length;
                                list = "TestPassList";
                            }
                            else if (TestPass_Listobj.length < show.allTestPasses.length) {
                                loopvar = show.allTestPasses.length;
                                list = "AllTestPass";
                            }
                            else if (show.allTestPasses.length == TestPass_Listobj.length) {
                                loopvar = show.allTestPasses.length;
                                list = "TestPassList";
                            }


                            if (list == "TestPassList") {
                                for (var i = 0; i < loopvar; i++) {
                                    for (var j = 0; j < show.allTestPasses.length; j++) {
                                        if (TestPass_Listobj[i].TestPass_Name.toLowerCase() == show.allTestPasses[j].testpassName.toLowerCase()) {
                                            TestPassAlreadyExist.push
                                            ({
                                                'TestPassName': TestPass_Listobj[i].TestPass_Name
                                            });
                                        }
                                    }
                                }
                            }
                            else {
                                for (var i = 0; i < loopvar; i++) {
                                    for (var j = 0; j < TestPass_Listobj.length; j++) {
                                        if (show.allTestPasses[i].testpassName.toLowerCase() == TestPass_Listobj[j].TestPass_Name.toLowerCase()) {
                                            TestPassAlreadyExist.push
                                            ({
                                                'TestPassName': TestPass_Listobj[j].TestPass_Name
                                            });
                                        }
                                    }
                                }
                            }


                            var unique = TestPassAlreadyExist.filter(function (itm, i, TestPassAlreadyExist) {
                                return i == TestPassAlreadyExist.indexOf(itm);
                            });

                            if (TestPassAlreadyExist.length > 0) {
                                var width = 300;
                                var msg = "";

                                var countUniqueTestpassName = 0;

                                for (var k = 0 ; k < unique.length ; k++) {
                                    msg += unique[k].TestPassName + ",";
                                    countUniqueTestpassName++;
                                }


                                msg = msg.substr(0, msg.lastIndexOf(',')) + msg.substr(msg.lastIndexOf(',') + 1);


                                if (countUniqueTestpassName > 1) {
                                    msg = msg.substring(0, msg.lastIndexOf(',')) + ' and ' + msg.substring(msg.lastIndexOf(',') + 1, msg.length)
                                }

                                //  $("#errorMsg").html(msg + " already exist");
                                $("#errorMsg").html(msg + " test pass name(s) already exist.Please remove it and upload excel file again.");

                                $('#errorMsg').dialog({

                                    modal: true,

                                    title: "Bulk Import",

                                    buttons: {

                                        "Ok": function () { $(this).dialog("close"); }

                                    }


                                });
                                $(".ui-dialog #errorMsg").css("width", width + "px");

                            }
                            else {
                                impTS.erroroccur = 0;
                                var resp = ServiceLayer.InsertUpdateData("ImportBulkImportTemplate", BulkImportArrayList, "BulkDownloadImportTemplate");

                                //if (resp != "" && resp != null)
                                //    result = JSON.parse(resp);

                                if (impTS.erroroccur == 1) {
                                    Error_Listobj.push({
                                        row: -3,
                                        sheetName: '',
                                        Error: ''
                                    });
                                }
                                else {
                                    impTS.showErrorMsg(resp);
                                }

                                Main.hideLoading();
                            }

                            Main.hideLoading();
                        }
                        catch (e) {
                            window.setTimeout("Main.hideLoading()", 200);
                        }
                    }
                    else {
                        impTS.showValidationErrMsg(Error_Listobj);
                    }
                }
                else {
                    Error_Listobj.push({
                        row: -1,
                        sheetName: '',
                        Error: ''
                    });

                    impTS.showErrorMsg(Error_Listobj);
                }
            }
        }

        window.setTimeout("Main.hideLoading()", 200);
    },

    pasteData: function (openXML, element) {

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

    alertBox: function (msg) {
        $("#divAlert").empty();
        $("#divAlert").append(msg);
        $('#divAlert').dialog({ modal: true, title: "Import " + teststep.gConfigStatus, height: 'auto', width: 'auto', resizable: false, buttons: { "Ok": function () { $(this).dialog("close"); } } });//Added by Mohini for Resource file
    },
    showValidationErrMsg: function (result) {

        var resArr = new Array();
        resArr = result;
        var msg = "";
        var width = 300;
        {
            {
                width = 680;
                var testPassErr = "";
                var testerErr = "";
                var testCaseErr = "";
                var testStepErr = "";
                var result = "";
                var error = "";

                $.each(resArr, function (ind, itm) {

                    if (itm.sheetName == "Test Pass") {
                        error = itm.Error.charAt(0) == "," ? itm.Error.replace(",", "") : itm.Error;

                        testPassErr += "<span ><span style='color:brown;'>Row " + (parseInt(itm.row)) + "</span>: " + error + "</span><br />";
                    }
                });


                if (testPassErr != "") {
                    //var testPassErrTemp = testPassErr.charAt(0) == "," ? testPassErr.replace(",",""): testPassErr;

                    result += '<table>' +
                                                                                                            '<tr>' +
                                                                                                                '<td colspan="2">' +
                                                                                                                    'Sheet:<b style="color:#009999;" >Test Pass</b> &nbsp;<br/>' +
                                                                                                                '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table>' +
                                                                                                        '<fieldset><legend style="color:red;font-weight:bold">Invalid Rows: </legend><table>' +
                                                                '<tr>' +
                                                                                '<td>' + testPassErr + '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table></fieldset>';

                }

                msg = '<div style="border-bottom-width: 1px; border-bottom-style: none; border-bottom-color: gray; padding-top:15px;overflow-x:auto">' +
                                                                                                                                '<div style="margin-bottom:10px;"><b>Bulk Upload Statistics:</b></div>' +
                                                        result +
                                                                '</div>';
            }

        }


        //Call the dialog box
        $("#errorMsg").html(msg);

        $('#errorMsg').dialog({

            modal: true,

            title: "Bulk Import",

            buttons: {

                "Ok": function () { $(this).dialog("close"); }

            }


        });
        $(".ui-dialog #errorMsg").css("width", width + "px");

        $('#MiddleRush').next().removeAttr("style");
        $('#MiddleRush').next().attr("style", "left: 680px; top: 197px; height: auto; display: block; position: absolute; z-index: 1002;outline-width:0px;outline-style:none;outline-color:invert;");

    },
    showErrorMsg: function (result) {

        var resArr = new Array();
        resArr = result;
        var msg = "";
        var width = 300;
        if (resArr.length == 0) {
            msg = "Uploaded Successfully"

        }
        else {

            if (resArr[0].row == "-1") {
                msg = "Please select proper sheet";
            }
            else if (resArr[0].row == "-2") {
                msg = "Cannot upload blank template";
            }
                
            else if (resArr[0].row == "-3") {
                msg = "Service Failed.Please check your internet conenction";
            }
            else {
                width = 680;
                var testPassErr = "";
                var testerErr = "";
                var testCaseErr = "";
                var testStepErr = "";
                var result = "";
                var error = "";

                $.each(resArr, function (ind, itm) {

                    if (itm.sheetName == "Test Pass") {
                        error = itm.Error.charAt(0) == "," ? itm.Error.replace(",", "") : itm.Error;

                        testPassErr += "<span ><span style='color:brown;'>Row " + (parseInt(itm.row) + 3) + "</span>: " + error + "</span><br />";
                    }
                    else if (itm.sheetName == "Tester") {
                        error = itm.Error.charAt(0) == "," ? itm.Error.replace(",", "") : itm.Error;
                        testerErr += "<span ><span style='color:brown;'>Row " + (parseInt(itm.row) + 3) + "</span>: " + error + "</span><br />";
                    }
                    else if (itm.sheetName == "Test Case") {
                        error = itm.Error.charAt(0) == "," ? itm.Error.replace(",", "") : itm.Error;
                        testCaseErr += "<span ><span style='color:brown;'>Row " + (parseInt(itm.row) + 3) + "</span>: " + error + "</span><br />";
                    }
                    else if (itm.sheetName == "Test Step") {
                        error = itm.Error.charAt(0) == "," ? itm.Error.replace(",", "") : itm.Error;
                        testStepErr += "<span ><span style='color:brown;'>Row " + (parseInt(itm.row) + 3) + "</span>: " + error + "</span><br />";
                    }


                });


                if (testPassErr != "") {
                    //var testPassErrTemp = testPassErr.charAt(0) == "," ? testPassErr.replace(",",""): testPassErr;

                    result += '<table>' +
                                                                                                            '<tr>' +
                                                                                                                '<td colspan="2">' +
                                                                                                                    'Sheet:<b style="color:#009999;" >Test Pass</b> &nbsp;<br/>' +
                                                                                                                '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table>' +
                                                                                                        '<fieldset><legend style="color:red;font-weight:bold">Invalid Rows: </legend><table>' +
                                                                '<tr>' +
                                                                                '<td>' + testPassErr + '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table></fieldset>';

                }
                if (testerErr != "") {

                    //var testerErrTemp = testerErr.charAt(0) == "," ? testerErr.replace(",",""): testerErr;

                    result += '<table>' +
                                                                                                            '<tr>' +
                                                                                                                '<td colspan="2">' +
                                                                                                                    'Sheet:<b style="color:#009999;" >Tester</b> &nbsp;<br/>' +
                                                                                                                '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table>' +
                                                                                                        '<fieldset><legend style="color:red;font-weight:bold">Invalid Rows: </legend><table>' +
                                                                '<tr>' +
                                                                                '<td>' + testerErr + '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table></fieldset>';

                }
                if (testCaseErr != "") {

                    //var testCaseErrTemp = testCaseErr.charAt(0) == "," ? testCaseErr.replace(",",""): testCaseErr;

                    result += '<table>' +
                                                                                                            '<tr>' +
                                                                                                                '<td colspan="2">' +
                                                                                                                    'Sheet:<b  style="color:#009999;" >Test Case</b> &nbsp;<br/>' +
                                                                                                                '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table>' +
                                                                                                        '<fieldset><legend style="color:red;font-weight:bold">Invalid Rows: </legend><table>' +
                                                                '<tr>' +
                                                                                '<td>' + testCaseErr + '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table></fieldset>';

                }
                if (testStepErr != "") {
                    //var testStepErrTemp = testStepErr.charAt(0) == "," ? testStepErr.replace(",",""): testStepErr;

                    result += '<table>' +
                                                                                                            '<tr>' +
                                                                                                                '<td colspan="2">' +
                                                                                                                    'Sheet:<b style="color:#009999;" >Test Step</b> &nbsp;<br/>' +
                                                                                                                '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table>' +
                                                                                                        '<fieldset><legend style="color:red;font-weight:bold">Invalid Rows: </legend><table>' +
                                                                '<tr>' +
                                                                                '<td>' + testStepErr + '</td>' +
                                                                                                            '</tr>' +
                                                                                                        '</table></fieldset>';

                }

                msg = '<div style="border-bottom-width: 1px; border-bottom-style: none; border-bottom-color: gray; padding-top:15px;overflow-x:auto">' +
                                                                                                                                '<div style="margin-bottom:10px;"><b>Bulk Upload Statistics:</b></div>' +
                                                        result +
                                                                '</div>';
            }

        }


        //Call the dialog box
        $("#errorMsg").html(msg);

        $('#errorMsg').dialog({

            modal: true,

            title: "Bulk Import",

            buttons: {

                "Ok": function () { $(this).dialog("close"); }

            }


        });
        $(".ui-dialog #errorMsg").css("width", width + "px");

        $('#MiddleRush').next().removeAttr("style");
        $('#MiddleRush').next().attr("style", "left: 680px; top: 197px; height: auto; display: block; position: absolute; z-index: 1002;outline-width:0px;outline-style:none;outline-color:invert;");

    },


}
