var impTS = {

    i: 0,
    msg: '',
    row: 0,
    blExl: 0,
    intc: 0,
    totc: 0,
    testCaseIDsInPage: new Array(),
    testWithSpecialCharacter: 0,
    flagForImport: 0,
    isPortfolioOn: false,

    exportExcel: function () {
        var data = ServiceLayer.GetData("DownloadBulkImportTemplate" + "/" + 1, null, "BulkDownloadImportTemplate");

        if (data == undefined) {
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
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature");
        }

        var objExcel = excel.Workbooks.Open(ServiceLayer.appurl + "/excel/BulkImportTemplateUAT.xlsx");
        var ExcelSheet = objExcel;

        try {
            var fileObj = new ActiveXObject("Scripting.FileSystemObject");
        }
        catch (e) {
            stat = 1;
        }
        try {

            var DestinationFileLoc = "BulkImportTemplateUAT" + Math.random() + ".xlsx";

            fileExists = fileObj.fileExists("C:\\Download\\" + DestinationFileLoc);

            if (fileExists)
                var DestinationFileLoc = "BulkImportTemplateUAT" + Math.random() + ".xlsx";

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
    },

    importExcel: function () {

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
            // $("#fileUpload").html('<input type="file" id="upload" style="display:none"/>');
            $("#fileUpload").click();
            var path = $('#fileUpload').val();

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
                    impTS.msg = "Please select the Excel file Template for " + teststep.gConfigTestStep + " with extension .xls or .xlsx!<br/>";
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
                    if (excel_sheet.Cells(i, 3).Value != undefined) {
                        var Startdate;
                        var Enddate;
                       
                       
                        if (excel_sheet.Cells(i, 6).Value != undefined) {
                            Startdate = new Date(excel_sheet.Cells(i, 6).Value);
                        }
                        if (excel_sheet.Cells(i, 7).Value != undefined) {
                            Enddate = new Date(excel_sheet.Cells(i, 7).Value);
                        }
                        var Startdate1 = Startdate.getUTCFullYear() + "-" + (Startdate.getUTCMonth() + 1) + "-" + (Startdate.getUTCDate() + 1);
                        var EndDate1 = Enddate.getUTCFullYear() + "-" + (Enddate.getUTCMonth() + 1) + "-" + (Enddate.getUTCDate() + 1);

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
                            'ETT': excel_sheet.Cells(i, 8).Value == undefined ? "" : excel_sheet.Cells(i, 8).Value
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

               // updateRTE('rte2');

               // var currTestStepName = document.getElementById('hdn' + 'rte2').value;

                var myRange1 = document.body.createTextRange();
                var tableName = excel_sheet.ListObjects(1).Name;

                var tableAddress = excel_sheet.ListObjects("tblTestStep").Range.Address;
                var startIndex = parseInt(tableAddress.split(":")[0].split('$')[2]) + 1;
                var endIndex = parseInt(tableAddress.split(":")[1].split('$')[2]);

                var rows = excel_sheet.UsedRange.Rows.Count;

                for (var i = startIndex; i <= endIndex; i++) {
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

                    d[1] = excel_sheet.Cells(i, 4).Value;    //Test Pass Name
                    if (d[1] != undefined)
                        d[1] = jQuery.trim(d[1].toString());

                    d[2] = excel_sheet.Cells(i, 7).Value;    //Test Case Name

                    if (d[2] != undefined)

                        d[2] = jQuery.trim(d[2].toString());

                    try {
                        d[3] = "<a href=\'" + excel_sheet.Cells(i, 9).Hyperlinks(blnk + 1).Address + "\'>" + excel_sheet.Cells(i, 9).Value + "</a>";	 //Test Steps
                    }
                    catch (e) {
                        d[3] = excel_sheet.Cells(i, 9).Value;	 //Test Steps                   
                    }
                    if (d[3] != undefined)
                        d[3] = jQuery.trim(d[3].toString());

                    if (excel_sheet.Cells(i, 10).Value != undefined) {
                        d[5] = excel_sheet.Cells(i, 10).Value;	 //Roles
                        if (d[5] != undefined)
                            d[5] = jQuery.trim(d[5].toString());
                    }
                    else
                        d[5] = '';

                    impTS.row++;

                    if (d[1] == '' || d[1] == undefined || d[1] == null) {
                        impTS.msg += "Row" + impTS.row + " " + ":" + " Test Pass Name is a mandatory field!<br/>";//Added by Mohini for Resource file
                        impTS.intc++;
                        continue;
                    }
                    if (d[2] == '' || d[2] == undefined || d[2] == null) {
                        impTS.msg += "Row" + impTS.row + " " + ":" + "Test Case Name is a mandatory field!<br/>";//Added by Mohini for Resource file
                        impTS.intc++;
                        continue;
                    }

                    if (d[3] == '' || d[3] == undefined || d[3] == null) {
                        impTS.msg += "Row" + impTS.row + " " + ":" + "Test Step Name is a mandatory field!<br/>";//Added by Mohini for Resource file
                        impTS.intc++;
                        continue;
                    }
                }
                var TestStep_Listobj = new Array();

                TestStep_Listobj.push
                ({
                    'Project_Id': ProjectID,
                    'TestPass_Name': d[1],
                    'TestCase_Name': d[2],
                    'TestStep_Name': d[3],
                    'Role': d[5],
                    'Expected_Result': _expectedRes,
                    'Expected_Result_Image': _expectedResImage
                });


                var BulkImportArrayList = {
                    "TestPass_Listobj": [TestPass_Listobj[0]],
                    "Tester_Listobj": [Tester_Listobj[0]],
                    "TestCase_Listobj": [TestCase_Listobj[0]],
                    "TestStep_Listobj": [TestStep_Listobj[0]]
                };

                var data = ServiceLayer.InsertUpdateData("ImportBulkImportTemplate", BulkImportArrayList, "BulkDownloadImportTemplate");

                impTS.alertBox(data);

                //  enableDesignMode("rte2", currTestStepName, false);
                window.setTimeout("Main.hideLoading()", 200);
            }

        }
    },


    pasteData: function (openXML, element) {

        //$(openXML).each(function (ind, item) {
        //    if ($(item).length > 0) {

        //        var x = $(item)[0].innerHTML
        //        if (x != undefined) {
        //            $(x).each(function (ind1, item1) {

        //                var hyper = ($(item1).find('p > hyperlink')[0]);

        //            });
        //        }

        //    }

        //});


        Main.showLoading();
        xmlDoc = $.parseXML(openXML),
        $xml = $(xmlDoc),

        $xml.find('part > xmlData > document > body').children().each(function (index, val) {
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

    //Alert box
    alertBox: function (msg) {
        $("#divAlert").empty();
        $("#divAlert").append(msg);
        $('#divAlert').dialog({ modal: true, title: "Import " + teststep.gConfigStatus, height: 'auto', width: 'auto', resizable: false, buttons: { "Ok": function () { $(this).dialog("close"); } } });//Added by Mohini for Resource file
    },
}