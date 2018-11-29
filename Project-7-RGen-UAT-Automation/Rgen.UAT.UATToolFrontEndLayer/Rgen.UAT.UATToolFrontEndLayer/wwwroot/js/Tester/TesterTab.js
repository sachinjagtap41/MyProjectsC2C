var tester = {
    SiteURL: Main.getSiteUrl(),
    roleNameForRoleID: [],
    roleDescForRoleID: [],
    roleIDArrayColl: [],
    roles: [],
    oldTesterRoles: new Array(),
    forSPUserIdGetRoleIDs: new Array(),
    forSPUserIdGetTesterName: new Array(),
    forSPUserIdGetAlias: new Array(),
    forSPUserIdGetEmail: new Array(),
    areaForSPID: new Array(),
    countVal: '',
    tempname: '',
    tempHdnname: '',//added by Rupal 
    /****************Added by Mohini for Resource file***********/
    gCongfigRole: "Role",
    gConfigTestPass: "Test Pass",
    gConfigTester: "Tester",
    gConfigProject: "Project",
    gConfigTestStep: "Test Step",
    gConfigTestCase: "Test Case",
    gConfigTestManager: "Test Manager",
    gConfigRoles: "Role(s)",
    gConfigArea: "Area",
    gConfigVersion: "Version",
    gConfigGroup: 'Group',
    gConfigPortfolio: 'Portfolio',
    /**************************************************/
    //defined by Mohini for assign role in bulk
    gPrincipalType: '',
    testerNameForSPuserID: new Array(),
    testerDisplayNameForSPuserID: new Array(),
    testerEmailForSPuserID: new Array(),
    testerDisplayName: new Array(),
    testerName: new Array(),
    SPUserID: new Array(),
    testerEmail: new Array(),
    noprjFlag: 0,
    noTPFlag: 0,
    TesterResult: new Array(),

    currProject: new Array(),
    currProjectIndex: '',

    hdn_SpuserId: '',
    hdn_SpUserName: '',
    hdn_EmailId: '',
    hdn_alias: '',
    setTesterValue: function () {
        var ele = $('#Auto_Hdn').val();
        if (ele.trim() != '') {
            tester.hdn_SpuserId = ele.split('|')[1]
            tester.hdn_SpUserName = ele.split('|')[0]
            tester.hdn_EmailId = ele.split('|')[2]
            tester.hdn_alias = "i:0#.f|membership|" + ele.split('|')[2]
            tester.gPrincipalType = 'User'
        }
    },
    pageLoad: function () {
       Main.showLoading();
      
        /*Added by Mohini for handling people picker's message issue on keypress DT:02-05-2014*/
        jQuery(document).keydown(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                return;
            }
        });


        tester.setTesterValue();

        /////////////////////////
        //	AddUser.GetGroups();
        //show.showData();

        show.showData('tester');
        tester.populateArea();
        $("#countDiv").css('display', '');//added by Mohini

        /****************Added by Mohini for Resource file***********/
        if (resource.isConfig.toLowerCase() == 'true') {
            tester.gCongfigRole = resource.gPageSpecialTerms['Role'] != undefined ? resource.gPageSpecialTerms['Role'] : "Role";
            tester.gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] != undefined ? resource.gPageSpecialTerms['Test Pass'] : "Test Pass";
            tester.gConfigTester = resource.gPageSpecialTerms['Tester'] != undefined ? resource.gPageSpecialTerms['Tester'] : "Tester";
            tester.gConfigProject = resource.gPageSpecialTerms['Project'] != undefined ? resource.gPageSpecialTerms['Project'] : "Project";
            tester.gConfigTestStep = resource.gPageSpecialTerms['Test Step'] != undefined ? resource.gPageSpecialTerms['Test Step'] : "Test Step";
            tester.gConfigTestCase = resource.gPageSpecialTerms['Test Case'] != undefined ? resource.gPageSpecialTerms['Test Case'] : "Test Case";
            tester.gConfigTestManager = resource.gPageSpecialTerms['Test Manager'] != undefined ? resource.gPageSpecialTerms['Test Manager'] : "Test Manager";
            tester.gConfigRoles = resource.gPageSpecialTerms['Role(s)'] != undefined ? resource.gPageSpecialTerms['Role(s)'] : "Role(s)";
            tester.gConfigArea = resource.gPageSpecialTerms['Area'] != undefined ? resource.gPageSpecialTerms['Area'] : "Area";
            tester.gConfigVersion = resource.gPageSpecialTerms['Version'] != undefined ? resource.gPageSpecialTerms['Version'] : "Version";
            tester.gConfigGroup = resource.gPageSpecialTerms['Group'] != undefined ? resource.gPageSpecialTerms['Group'] : "Group";
            tester.gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] != undefined ? resource.gPageSpecialTerms['Portfolio'] : "Portfolio";
        }
        //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014
        $("#groupHead label").html(tester.gConfigGroup + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#portfolioHead label").html(tester.gConfigPortfolio + '<img s src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#projectHead label").html(tester.gConfigProject + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#versionHead label").html(tester.gConfigVersion + '<img src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');
        $("#TestPassHead label").html(tester.gConfigTestPass + '<img  src="/images/drop-arrow.gif" style="float:right;padding-top:5px"/>');

        //To make the bredcrumb box label cofigurable :Ejaz Waquif DT:2/18/2014

        $('#template-form').find('p:eq(0)').html('Do you want a pre-filled template for selected ' + tester.gConfigProject + '?');
        $('#template-form').find('p:eq(2)').html('Click <b>No</b> to download empty template for selected ' + tester.gConfigProject + '.');
        $('#area').find('option[value="0"]').text('Select ' + tester.gConfigArea);
        $('#noteDiv').find('p:eq(0)').html('Please follow below steps to Import ' + tester.gConfigTester + '(s):');
        $('#noteDiv').find('p:eq(2)').html('&nbsp;&nbsp;2. Populate data of ' + tester.gConfigTester + 's as directed in template.');
        $('#addRole').html('Add ' + tester.gCongfigRole);
        $('#editRole').html('Edit ' + tester.gCongfigRole);
        $('#delRole').html('Delete ' + tester.gCongfigRole);
        $('#notePara').html('NOTE:</b>&nbsp;As a ' + tester.gConfigTestManager.toLowerCase() + ', you can create ' + tester.gCongfigRole.toLowerCase() + 's to associate ' +
				'to each ' + tester.gConfigTester.toLowerCase() + ' to help define what they should be testing for.' +
				"‘Standard’ is the default " + tester.gCongfigRole.toLowerCase() + " that exists for all " + tester.gConfigTestPass.toLowerCase() + "es." +
				'If you don’t want to create any new ' + tester.gCongfigRole.toLowerCase() + ' then assign default ' +
				"‘Standard’ " + tester.gCongfigRole.toLowerCase() + ' to all ' + tester.gConfigTester + 's and create all ' + tester.gConfigTestStep + 's with ' +
				"the same ‘Standard’ " + tester.gCongfigRole.toLowerCase() + '. If you want to associate certain ' +
				 tester.gConfigTestStep.toLowerCase() + 's to a ' + tester.gConfigTester.toLowerCase() + ', create a ' + tester.gCongfigRole.toLowerCase() + ' and assign that to respective ' +
				tester.gConfigTester.toLowerCase() + ' then create all associated ' + tester.gConfigTestStep.toLowerCase() + 's with the same ' + tester.gCongfigRole.toLowerCase() + '.');
        /***********************************************************************/
        $('.rgTableBread').show();
        if (isPortfolioOn) {
            $(".prjHead").hide();
            createDD.create();
        }
        else
            createDD.createWithoutPort();

        $("#allT").click(function () {
            // Added for DD
            Main.showLoading();
            tester.clearFields();
            createDD.editMode = 0
            createDD.showDD();

            /*******Added by Mohini**********/
            if (tester.countVal == 00) {
                $("#countDiv").css('display', 'none');
            }
            else {
                $("#countDiv").css('display', '');
                $("#labelCount").html(tester.countVal);
            }
            /************************************/
            $("#createT").css('color', '#7F7F7F');
            $("#downloadT").css('color', '#7F7F7F');
            $(this).css('color', '#000000');
            $("#editT").hide();
            $("#testerForm").hide();
            $("#testerGrid").show();
            $("#pagination").show();
            $("#impExpTemplate").hide();

            /* Added by shilpa on 10 dec */
            if ($("#testerGrid table tbody").find('tr').length == 0)
                $("#pagination").hide();
            /**/
            tester.editFlag = 0;
            Main.hideLoading();
        });
        $("#createT").click(function () {
            // Added for DD
            Main.showLoading();
            tester.clearFields();
            createDD.editMode = 0
            createDD.showDD();

            /****************Added by  Mohini on 12-19-2013****************/
            if (show.testPassId == '') {
                if (show.projectId == '') {
                    tester.alertBox1("Sorry! No " + tester.gConfigProject + " is available for selected " + tester.gConfigPortfolio.toLowerCase() + " !<br/>Please create the " + tester.gConfigProject + " First.");
                    tester.noprjFlag = 1;
                }
                else {
                    tester.alertBox1("Sorry! No " + tester.gConfigTestPass + " is available for selected " + tester.gConfigProject.toLowerCase() + " '" + $("#projectTitle label").attr('title') + "'!<br/>Please create the " + tester.gConfigTestPass + " First.");
                    tester.noTPFlag = 1;
                }
            }

            $('#countDiv').hide();//Added by Mohini
            $("#allT").css('color', '#7F7F7F');
            $("#downloadT").css('color', '#7F7F7F');
            $(this).css('color', '#000000');
            $("#editT").hide();
            $("#testerGrid").hide();
            $("#testerForm").show();
            $("#pagination").hide();
            $("#impExpTemplate").hide();

            //Added by Mohini For assign Role in Bulk DT:11-04-2014
            $('#lblRole').css('display', '');
            $('#assigRole').css('display', 'none');
            $('#testerRolesinBulk').css('display', 'none');
            $('#testerRoles').css('display', '');
            $('#buttonsDiv').css('margin-top', '60px');
            tester.populateRoles();
            tester.gPrincipalType = '';
            tester.editFlag = 0;
            /************************************/
            tester.addMode();
            tester.enableRoleSelection();//Added by Mohini on 12-19-2013 to resolve the bug 10524
            Main.hideLoading();
        });
        $("#downloadT").click(function () {
            // Added for DD
            createDD.editMode = 0
            createDD.showDD();

            /****************Added by  Mohini on 12-19-2013****************/
            if (show.testPassId == '') {
                if (show.projectId == '')//for bug id 11699
                {
                    tester.alertBox1("Sorry! No " + tester.gConfigProject + " is available for selected " + tester.gConfigPortfolio.toLowerCase() + " !<br/>Please create the " + tester.gConfigProject + " First.");
                    tester.noprjFlag = 1;
                }
                else {
                    tester.alertBox1("Sorry! No " + tester.gConfigTestPass + " is available for selected " + tester.gConfigProject.toLowerCase() + " " + $("#projectTitle label").attr('title') + "!<br/>Please create the " + tester.gConfigTestPass + " First.");//Added by Mohini for Resource file
                    tester.noTPFlag = 1;
                }
            }
            $('#countDiv').hide();//Added by Mohini
            $("#createT").css('color', '#7F7F7F');
            $("#allT").css('color', '#7F7F7F');
            $("#editT").hide();
            $(this).css('color', '#000000');
            $("#testerForm").hide();
            $("#testerGrid").hide();
            $("#pagination").hide();
            $("#impExpTemplate").show();
        });
        //////////////////////////

    },
    populateArea: function () {
        jQuery.support.cors = true;
        var msg = ServiceLayer.GetData("GetArea", undefined, 'tester');
        if (msg != undefined && msg != null) {
            var areaDD = '<option value="0">Select Area</option>';
            for (var i = 0; i < msg.length; i++)
                areaDD += '<option value="' + msg[i].areaId + '" title="' + msg[i].areaName + '">' + msg[i].areaName + '</option>';

            $("#area").html(areaDD);
        }
    },
    getProjectIndex: function () {
        tester.currProjectIndex = '';
        for (var ss = 0; ss < show.GetGroupPortfolioProjectTestPass.length; ss++) {
            if (show.GetGroupPortfolioProjectTestPass[ss].projectId == show.projectId) {
                tester.currProjectIndex = ss;
                break;
            }
        }
    },
    getTesters: function () {
        //##hardcode
        //show.testPassId='2062'
        tester.TesterResult = ServiceLayer.GetData("GetTestersByTestPassID", show.testPassId, 'Tester');
    },
    CheckPreRequisite: function () {
        if (typeof (window.ActiveXObject) == "undefined" || typeof (window.ActiveXObject) == undefined) {
            importExport.showPrerequisites();
            Main.hideLoading();
        }
        else {
            try {
                var xlApp = new ActiveXObject("Excel.Application");
            }
            catch (ex) {
                importExport.showPrerequisites();
                Main.hideLoading();
            }
        }
    },

    testersArray: new Array(),
    showTestersGrid: function () {
        tester.testersArray = [];
        tester.getTesterArr();
        var member = tester.testersArray.length;

        /**********Added by Mohini************/
        tester.countVal = ((member) >= 10) ? (member) : ('0' + (member));
        if (tester.countVal == 00) {
            $("#countDiv").css('display', 'none');
        }
        else {
            // $("#countDiv").css('display','');
            $("#labelCount").html(tester.countVal);
        }
        /*****************************/
        $("#pagination").pagination(member, {
            callback: tester.pageselectCallback,
            items_per_page: 10,
            num_display_entries: 10,
            num: 2
        });
    },
    pageselectCallback: function (page_index, jq) {
        var tablemarkup = '<table class="tableGrid" cellspacing="1">' +
								  '<thead>' +
								   '<tr class="griDetails">' +
								        '<td style="width:9%;text-align:center">#</td>' +//added by Mohini
                                        '<td style="width:25%;">TESTER</td>' +
									    '<td style="width:56%">ROLE(S)</td>' +
									    '<td align="center" style="border-right:none;width:10%;">ACTION</td>' +
								   '</tr>' +
								   '<tr>' +
								    	'<td colspan="6" class="gridHeadingRow"></td>' +
								   '</tr>' +
								   '<tr><td colspan="6"></td></tr>' +
									'<tr><td colspan="6"></td></tr>' +
									'<tr><td colspan="6"></td></tr>' +
									'<tr><td colspan="6"></td></tr>' + '</thead>' +
									'<tbody>';
        var items_per_page = 10;
        var max_elem = Math.min((page_index + 1) * items_per_page, tester.testersArray.length);
        for (var i = page_index * items_per_page; i < max_elem; i++)
            tablemarkup += tester.testersArray[i];
        if (tester.testersArray.length != 0) {
            tablemarkup += '</tbody></table>';
            $('#testerGrid').empty().html(tablemarkup);
            /********added by Mohini***********/
            var len = $('.tableGrid tbody tr').length;
            for (var i = 0; i <= len; i++)
                $('.tableGrid tbody tr:eq(' + i + ') td:eq(1)').attr('class', 'selTD');

            $("#pagination").show();
        }
        else {
            $("#testerGrid").html('<h2 style="font-size:30px;color:#B8B8B8;">No ' + tester.gConfigTester + '(s) Available!</h2>');//Added by Mohini for Resource file
            $("#pagination").hide();
        }
        resource.updateTableColumnHeadingTesMgnt();
    },
    getTesterArr: function () {
        //tester.TesterResult = [];

        tester.TesterResult = tester.TesterResult.sort(function (a, b) {
            return b.testerID - a.testerID
        });

        var TesterResult = tester.TesterResult;
        if (TesterResult != null && TesterResult != undefined) {
            //tester.TesterResult = TesterResult;
            tester.forSPUserIdGetRoleIDs = new Array();
            tester.forSPUserIdGetTesterName = new Array();
            tester.forSPUserIdGetAlias = new Array();
            tester.forSPUserIdGetEmail = new Array();
            tester.SPUserIDs = new Array();
            var roleIDs = [];
            var roleName = [];
            var tablemarkup = '';

            for (var i = 0; i < TesterResult.length; i++) {
                roleName = [];
                roleNames = TesterResult[i].roleList;
                roleIDs = [];
                roleName = [];
                for (var ii = 0; ii < roleNames.length; ii++) {
                    roleName.push(roleNames[ii].roleName);
                    roleIDs.push(roleNames[ii].roleId);
                }
                tablemarkup = '<tr><td align="center">' + (i + 1) + '</td><td>' + TesterResult[i].testerName + '</td>' +
				    			'<td title="' + roleName.toString() + '">' + trimText(roleName.toString(), 200) + '</td>' +
				    			'<td align="center"><img title="Edit ' + tester.gConfigTester + ' Details" style="cursor:pointer;" src="/images/Admin/Edit.png" class="actionEdit" onclick="tester.editTester(' + i + ')"/><img title="Delete ' + tester.gConfigTester + '"' + ' style="cursor:pointer;" src="/images/Admin/Garbage.png" onclick="tester.deleteTester(' + TesterResult[i].spUserId + ')" class="actionDel"/></td>' +
				    			//'</tr><tr><td colspan="3" style="background-color:white"></td></tr>'+
				    			'<input type="hidden" id="hid2' + i + '" value="' + show.testPassId + '"/>' +
								'<input type="hidden" id="hid3' + i + '" value="' + TesterResult[i].testerAlias + '"/>' +
								'<input type="hidden" id="hidUsrEmail' + i + '" value="' + TesterResult[i].testerEmail + '"/>' +
								'<input type="hidden" id="hidUserFulNm' + i + '" value="' + TesterResult[i].testerName + '"/>' +
  								'<input type="hidden" id="hidUserID' + i + '" value="' + TesterResult[i].spUserId + '"/>';

                tester.testersArray.push(tablemarkup);

                tester.areaForSPID[TesterResult[i].spUserId] = TesterResult[i].areaId;

                tester.forSPUserIdGetTesterName[TesterResult[i].spUserId] = TesterResult[i].testerName;
                tester.forSPUserIdGetAlias[TesterResult[i].spUserId] = TesterResult[i].testerAlias;
                tester.forSPUserIdGetEmail[TesterResult[i].spUserId] = TesterResult[i].testerEmail;

                tester.forSPUserIdGetRoleIDs[TesterResult[i].spUserId] = roleIDs.toString();

                if ($.inArray(TesterResult[i].spUserId, tester.SPUserIDs) == -1)
                    tester.SPUserIDs.push(TesterResult[i].spUserId);

            }

        }
        else {
            //$("#testerGrid").html('<h2 style="font-size:30px;color:#B8B8B8;">No Tester(s) Available!</h2>');
            $("#testerGrid").html('<h2 style="font-size:30px;color:#B8B8B8;">No ' + tester.gConfigTester + '(s) Available!</h2>');//Added by Mohini for Resource file
        }
        Main.hideLoading();
    },
    editFlag: 0,
    editTester: function (j) {
        Main.showLoading();
        // Added for DD
        createDD.editMode = 1;
        createDD.hideDD();

        multiSelectList.selectNone("testerRoles");
        tester.enableRoleSelection();// Added by Mohini
        //Added by Mohini for Assign Roles in Bulk DT:15-04-2014
        tester.editFlag = 1;
        $('#lblRole').css('display', '');
        $('#assigRole').css('display', 'none');
        $('#testerRolesinBulk').css('display', 'none');
        $('#testerRoles').css('display', '');
        $('#buttonsDiv').css('margin-top', '60px');
        tester.populateRoles();
        tester.gPrincipalType = '';
        /*******************************************/
        $("#allT").css('color', '#7F7F7F');
        $("#downloadT").css('color', '#7F7F7F');
        $("#createT").css('color', '#7F7F7F');
        $("#editT").css('color', '#000000');
        $("#editT").show();

        $('#countDiv').hide();//adee by Mohini
        $("#testerGrid").hide();
        $("#pagination").hide();
        $("#testerForm").show();

        tester.oldTesterRoles = new Array();
        document.getElementById('btnNewCancel').style.display = "none";
        document.getElementById('btnReset').style.display = "inline";

        this.indicateNewUser = false;
        $('#getHidID').val($('#hidID' + j).val());
        $('#getHidUserId').val($('#hidUserID' + j).val());
        $('#getHidUserEmailId').val($('#hidUsrEmail' + j).val());
        $('#getHidUserFulNm').val($('#hidUserFulNm' + j).val());
        var TID = $('#hid' + j).val();
        var TestPassID = $('#hid2' + j).val();


        //*Added by Rupal*//
        var TesterTxtBox = $('#Auto');
        var testerHdn = $('#Auto_Hdn');
        TesterTxtBox.val($('#hidUserFulNm' + j).val());

        $('#Auto_Otxt').val($('#hidUserFulNm' + j).val());
        var hdn = $('#hidUserFulNm' + j).val() + '|' + $('#hidUserID' + j).val() + '|' + $('#hidUsrEmail' + j).val();
        testerHdn.val(hdn);

        /*End*/
        tester.tempname = $('#hidUserFulNm' + j).val();
        tester.tempHdnname = $('#hidUserFulNm' + j).val() + '|' + $('#hidUserID' + j).val() + '|' + $('#hidUsrEmail' + j).val();

        // $("div[title='tester']").text($('#hid3' + j).val());
        $("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2_checkNames").trigger('click');
        tester.oldTesterName = $('#hid3' + j).val();
        var tpIdArray = new Array();
        if (TestPassID.indexOf(",") != -1) {
            TestPassID = TestPassID.split(",");
            for (var y = 0; y < TestPassID.length; y++)
                tpIdArray.push(TestPassID[y]);
        } else
            tpIdArray.push(TestPassID);


        ////#Rupal
        //this.indicateNewUser = false;
        ////$('#getHidID').val($('#hidID' + j).val());
        ////$('#getHidUserId').val($('#hidUserID' + j).val());
        ////$('#getHidUserEmailId').val($('#hidUsrEmail' + j).val());
        ////$('#getHidUserFulNm').val($('#hidUserFulNm' + j).val());
        //var TID = tester.hdn_SpuserId;
        //var TestPassID = 2164;
        ////$("div[title='tester']").text($('#hid3' + j).val());
        ////$("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2_checkNames").trigger('click');
        //tester.oldTesterName = tester.hdn_SpUserName;
        //var tpIdArray = new Array();
        //if (TestPassID.indexOf(",") != -1) {
        //    TestPassID = TestPassID.split(",");
        //    for (var y = 0; y < TestPassID.length; y++)
        //        tpIdArray.push(TestPassID[y]);
        //}

        //else
        //tpIdArray.push(TestPassID);



        //#Rupal
        var testerName = $('#hid3' + j).val();

        //tester.selectedTestPassId = TestPassID;
        //tester.TesterIDs = TID;
        tester.selectedTestPassId = tester.hdn_SpuserId;
        tester.TesterIDs = TID;


        var roles = tester.forSPUserIdGetRoleIDs[$('#hidUserID' + j).val()].split(",");
        $("#ulItemstesterRoles input").each(
			function () {
			    if ($.inArray($(this).attr('id').split("_")[1], roles) != -1)
			        $(this).attr('checked', true);
			}
		)
        if (tester.areaForSPID[$('#hidUserID' + j).val()] != undefined && tester.areaForSPID[$('#hidUserID' + j).val()] != "") {
            $("#area").val(tester.areaForSPID[$('#hidUserID' + j).val()]);
            tester.oldArea = tester.areaForSPID[$('#hidUserID' + j).val()];
        }
        else {
            $("#area").val(0);
            tester.oldArea = "";
        }
        //btnUpdate
        document.getElementById('btnUpdate').style.display = "inline";
        document.getElementById('btnSave').style.display = "none";

        $("#testerRoles div div li").each(function () {
            if ($(this).children(".mslChk").attr('checked') == true)
                tester.oldTesterRoles.push($(this).children(".mslChk").attr('Id').split("_")[1]);
        });
        Main.hideLoading();

        //To disable the Create and view links on edit mode
        //$(".navTabs h2:eq(0)").attr("disabled",true).css("cursor","default");
        //$(".navTabs h2:eq(1)").attr("disabled",true).css("cursor","default");
    },
    addMode: function () {
        $("div[title='tester']").empty();
        $("textarea[title='tester']").text('');
        $("textarea[title='tester']").empty();
        document.getElementById('btnNewCancel').style.display = "inline";
        document.getElementById('btnReset').style.display = "none";
        document.getElementById('btnUpdate').style.display = "none";
        document.getElementById('btnSave').style.display = "inline";
        multiSelectList.selectNone("testerRoles");
        $("#area").val("0");
    },
    populateRoles: function () {
        tester.roleNameForRoleID[1] = "Standard";
        tester.configRolesArray = [];
        var TesterRoles = new Array();
        var i = tester.currProjectIndex;
        if (i != undefined && show.GetGroupPortfolioProjectTestPass.length != 0) {
            TesterRoles = show.GetGroupPortfolioProjectTestPass[i].roleList;
            tester.roles = TesterRoles
        }

        if (TesterRoles != null && TesterRoles != undefined) {
            if (TesterRoles.length != 0) {
                document.getElementById('btnDiv').style.display = "inline";	//added for bug 5560

                $("#testerRoles").html('');
                var TesterRoles2 = new Array();
                $('#testerRoles').attr('disabled', false); 	//for bug 6006		
                $('#addRole').disabled = false;
                $('#divRole').hide();
                tester.roleIDArrayColl.splice(0, tester.roleIDArrayColl.length);

                for (var yy = 0; yy < TesterRoles.length; yy++) {
                    if (TesterRoles[yy].displayOnSignUp == "Yes")
                        tester.configRolesArray.push(TesterRoles[yy].roleId);

                    if (TesterRoles[yy].roleDetails != "" && TesterRoles[yy].roleDetails != undefined)
                        tester.roleDescForRoleID[TesterRoles[yy].roleId] = TesterRoles[yy].roleDetails;
                    else
                        tester.roleDescForRoleID[TesterRoles[yy].roleId] = "-";

                    tester.roleNameForRoleID[TesterRoles[yy].roleId] = TesterRoles[yy].roleName;
                }
                multiSelectList.createMultiSelectList("testerRoles", TesterRoles, "roleName", "roleId", "150px;");
                $("#ulItemstesterRoles a").each(function () {
                    $(this).css('color', "#0066ff")
                });
            }
            else {
                tester.createMultiSelectList("testerRoles", "150px;");
                $('#addRole').disabled = true;
            }

        }
        else {
            tester.createMultiSelectList("testerRoles", "150px;");
            $('#addRole').disabled = true;
        }
        /*Commented by HRW on 10 Nov 2014 (As we are not using onboarding feature)
        var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">'+show.projectId+'</Value></Eq></Where></Query>';
        var result = tester.dmlOperation(query,'StandardSignUp');
        if(result != undefined)
            tester.configRolesArray.push(1);*/
        /* Added by shilpa */
        $('#btnDiv').show();
        $('#btnAdd').show();
        $('#btnEdit').hide();
        $('#txtNewRole').val('');
        $('#txtDescription').val('');
        $('#divRole').hide();
    },
    //Added on 13 June
    createMultiSelectList: function (divID, height) {
        var divhtml = "";
        var divhtml = "<div class='Mediumddl' style='border: solid 1px #ccc;  width:inherit; padding-left:1px;'>" +

					"<ul id='ulItems" + divID + "' style='list-style-type:none; list-style-position:outside;display:inline;'>" +
						"<li>Select:&nbsp;<a id='linkSA_" + divID + "' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\"" + divID + "\");'>All</a>" +
							 "&nbsp;&nbsp;&nbsp;<a id='linkSN_" + divID + "' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\"" + divID + "\");'>None</a>" +
							 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_" + divID + "' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\"" + divID + "\");" + multiSelectList.functionToInvoke + "'>Selected</a></li>" +
						"<li><hr/></li>" +
						"<div style='overflow-y:scroll; height:" + height + " width:inherit'>";

        var itemId = divID + "_1";
        if (divID != "testerRolesConf")
            divhtml = divhtml + "<li title='Standard'><input id='" + itemId + "'  type='checkbox' class='mslChk'></input><span id='" + itemId + "' style=\"display: none;\">Standard</span>Standard</li>";
        else
            divhtml = divhtml + "<li title='Standard'><input id='" + itemId + "'  type='checkbox' class='mslChk' checked='checked'></input><span id='" + itemId + "' style=\"display: none;\">Standard</span>Standard</li>";
        divhtml += "</div></ul></div>";
        $("#" + divID).html(divhtml);

    },

    //Enable new role insertion mode
    prepareAddRole: function () {
        document.getElementById('testerRoles').disabled = "true";
        $('#lblEnterRole').text(tester.gCongfigRole + ':');//:SD
        $('#addRole').disabled = true;
        $('#divRole').show();
        $('#txtNewRole').focus();
        if (tester.gPrincipalType == 'SecurityGroup' || tester.gPrincipalType == 'DistributionList')//Added by Mohini for assign role in bulk Dt:11-04-2014
        {
            $('#div2').css('min-height', '364px');
        }
    },
    editRole: function () {
        if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList')//Added by Mohini for assign role in bulk Dt:11-04-2014
        {
            if ($("#testerRoles div div li").find(":checked").length == 0) {
                //tester.alertBox("Select the Role first!");
                tester.alertBox("Select the " + tester.gCongfigRole + " first!");//Added by Mohini for Resource file
            }
            else if ($("#testerRoles div div li").find(":checked").length > 1) {
                //tester.alertBox("Select one role at a time!");
                tester.alertBox("Select one " + tester.gCongfigRole.toLowerCase() + " at a time!");//Added by Mohini for Resource file
            }
            else {
                $('#txtNewRole').val("");
                $('#txtDescription').val('');
                var flg = false;
                var selectedRoleId = "";
                //hidRoleId
                $('#hidRoleId').val("");

                $("#testerRoles div div li").each(function () {
                    if (flg == false) {
                        if ($(this).children(".mslChk").attr('checked') == true) {
                            $('#hidRoleId').val($(this).children(".mslChk").attr('Id').split("_")[1]);
                            flg = true;
                        }
                    }
                });
                if ($('#hidRoleId').val() != '1') {
                    $('#divRole').show();
                    document.getElementById('btnAdd').style.display = "none";
                    document.getElementById('btnEdit').style.display = "inline";
                    //document.getElementById('btnDiv').style.display="none";	
                    $('#txtNewRole').val($('span[id="testerRoles_' + $('#hidRoleId').val() + '"]').text());
                    $('#txtDescription').val(tester.roleDescForRoleID[$('#hidRoleId').val()]);
                }
                else {
                    //tester.alertBox("You can not edit the Standard role!");
                    tester.alertBox("You can not edit the Standard " + tester.gCongfigRole.toLowerCase() + "!");//Added by Mohini for Resource file	
                    $('#hidRoleId').val("");
                }

            }

        }
            //Added by Mohini for assign role in bulk Dt:11-04-2014
        else {
            $('#div2').css('min-height', '364px');
            var count = -1;
            $('#rowTable thead tr td').each(function () {
                if ($(this).find('input').is(':checked')) {
                    count++;
                }
            });
            if (count == 0 && $('#rowTable thead tr td:eq(0)').find('input').is(':checked') == true) {
                //tester.alertBox("Select the Role first!");
                tester.alertBox("Select the " + tester.gCongfigRole + " first!");//Added by Mohini for Resource file
            }
            else if (count > 1 && $('#rowTable thead tr td:eq(0)').find('input').is(':checked') == true) {
                //tester.alertBox("Select one role at a time!");
                tester.alertBox("Select one " + tester.gCongfigRole.toLowerCase() + " at a time!");//Added by Mohini for Resource file
            }
            else if (count >= 1 && $('#rowTable thead tr td:eq(0)').find('input').is(':checked') == false) {
                //tester.alertBox("Select one role at a time!");
                tester.alertBox("Select one " + tester.gCongfigRole.toLowerCase() + " at a time!");//Added by Mohini for Resource file
            }
            else if (count == -1) {
                tester.alertBox("To Edit or Delete a " + tester.gCongfigRole + ", please first select the check box available in the respective " + tester.gCongfigRole + "s column below the " + tester.gCongfigRole + " name.");
            }
            else {
                $('#txtNewRole').val("");
                $('#txtDescription').val('');
                var flg = false;
                var selectedRoleId = "";
                //hidRoleId
                $('#hidRoleId').val("");

                $('#rowTable thead tr td').each(function () {
                    if (flg == false) {
                        if ($(this).find('input').is(':checked')) {
                            if ($(this).find('input').attr('role') != undefined) {
                                $('#hidRoleId').val($(this).find('input').attr('role'));
                                flg = true;
                            }
                        }
                    }
                });
                if ($('#hidRoleId').val() != '1') {
                    $('#divRole').show();
                    document.getElementById('btnAdd').style.display = "none";
                    document.getElementById('btnEdit').style.display = "inline";
                    //document.getElementById('btnDiv').style.display="none";	
                    $('#txtNewRole').val(tester.roleNameForRoleID[$('#hidRoleId').val()]);
                    $('#txtDescription').val(tester.roleDescForRoleID[$('#hidRoleId').val()]);
                }
                else {
                    //tester.alertBox("You can not edit the Standard role!");
                    tester.alertBox("You can not edit the Standard " + tester.gCongfigRole.toLowerCase() + "!");//Added by Mohini for Resource file	
                    $('#hidRoleId').val("");
                }

            }
        }

    },
    updateRoles: function () {
        var updrole = 0;
     
        //Added by Mohini for assign role in bulk Dt:11-04-2014
        if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList') {
            $("#testerRoles div div li").each(function () {

                if (($.trim($('#txtNewRole').val().toLowerCase()) == $(this).children('span').text().toLowerCase()) && ($(this).children('span').attr('id').split("_")[1] != $('#hidRoleId').val())) {
                    //tester.alertBox("Role already exists.");
                    tester.alertBox(tester.gCongfigRole + " already exists.");//Added by Mohini for Resource file	
                    updrole = 1;
                }
            });
        }
        else {
            $('#rowTable thead tr td').each(function () {

                if (($.trim($('#txtNewRole').val().toLowerCase()) == $(this).text().toLowerCase()) && ($(this).find('input').attr('role') != $('#hidRoleId').val())) {
                    //tester.alertBox("Role already exists.");
                    tester.alertBox(tester.gCongfigRole + " already exists.");//Added by Mohini for Resource file	
                    updrole = 1;
                }
            });
        }
        /*************************************/
        if ($('#txtNewRole').val() == null || $('#txtNewRole').val() == undefined || $.trim($('#txtNewRole').val()) == '') {
            tester.alertBox("Please enter the " + tester.gCongfigRole.toLowerCase() + " first.");//Added by Mohini for Resource file
            updrole = 1;
        }

        if (($.trim($('#txtNewRole').val())).toLowerCase() == ('Standard'.toLowerCase()))// || ($.trim($('#txtNewRole').val())).toLowerCase()==('All'.toLowerCase()) )
        {
            tester.alertBox("Cannot create " + tester.gCongfigRole + "s with this name Standard");//Added by Mohini for Resource file
            updrole = 1;
        }
        var iChars = "!@#$%^&*()+=[]\';,/{}|\":<>?";
        for (var i = 0; i < $.trim($('#txtNewRole').val()).length; i++) {
            if (iChars.indexOf($.trim($('#txtNewRole').val()).charAt(i)) != -1) {
                var msgTag = tester.gCongfigRole + ' Name contains special characters. \n These are not allowed.\n Please remove them and try again.!'//Added by Mohini for Resource file
                tester.alertBox(msgTag);
                updrole = 1;
            }
        }
        if (updrole == 1)
            return;
        else {
            Main.showLoading();
            var roleId = $('#hidRoleId').val();

            var data = {
                "roleId": roleId,
                "roleName": $.trim($('#txtNewRole').val()),
                "roleDetails": $.trim($('#txtDescription').val()),
                "projectId": show.projectId
            };
            var result = ServiceLayer.InsertUpdateData("InsertUpdateRole", data, 'Tester');
            if (result != '' && result != undefined) {
                //if (result[0].Value == "Done") {

                if (result.Success == "Done") {
                    var ss = tester.currProjectIndex;
                    for (var mm = 0; mm < show.GetGroupPortfolioProjectTestPass[ss].roleList.length; mm++) {
                        if (show.GetGroupPortfolioProjectTestPass[ss].roleList[mm].roleId == roleId) {
                            show.GetGroupPortfolioProjectTestPass[ss].roleList[mm].roleName = $.trim($('#txtNewRole').val());
                            show.GetGroupPortfolioProjectTestPass[ss].roleList[mm].roleDetails = $.trim($('#txtDescription').val());
                            break;
                        }
                    }

                    $('#divRole').hide();
                    //Added by Mohini for assign role in bulk Dt:11-04-2014
                    if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList') {
                        tester.populateRoles();
                    }
                    else {
                        tester.populateRolesForBulk();
                    }
                    document.getElementById('btnDiv').style.display = "inline";
                    document.getElementById('btnEdit').style.display = "none";
                    document.getElementById('btnAdd').style.display = "inline";
                    //tester.alertBox("Tester role updated successfully!");
                    //tester.alertBox(tester.gConfigTester+" "+tester.gCongfigRole.toLowerCase()+" updated successfully!");//Added by Mohini for Resource file
                    Main.AutoHideAlertBox(tester.gConfigTester + " " + tester.gCongfigRole.toLowerCase() + " updated successfully!");
                    $('#txtNewRole').val('');
                    $('#txtDescription').val('');

                    document.getElementById('testerRoles').disabled = false; /* for bug 5506*/

                }
                else
                    tester.alertBox('Sorry! Something went wrong, please try again!');
            }
            else
                tester.alertBox('Sorry! Something went wrong, please try again!');
        }
        Main.hideLoading();
    },
    deleteRole: function () {
        var flag = 0;
        var roleNames = '';
        var toBeDeletedFlag = 0;
        var associationFlag = 0;
        var roleIdArray = new Array();
        var roleIdToBeDeleted = new Array();
        var delitem1;
        var delitem;
        var ChildList1;
        var ChildList;
        var nodelete;
        var onlyRoleDeletionFlag = 0;
        var tpexist = 0;
        var roleIDnew;

        if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList') {
            if ($("#testerRoles div div li").find(":checked").length == 0) {
                tester.alertBox("Select the " + tester.gConfigRoles + " first!");//Added by Mohini for Resource file
                flag = 1;
                return;
            }
            else if (($("#testerRoles div div li").find(":checked").length > 1) && flag != 1) {
                tester.alertBox("Select one " + tester.gCongfigRole.toLowerCase() + " at a time!");//Added by Mohini for Resource file
                flag = 1;
                return;
            }
            else if ($("#testerRoles div div li").find(":checked").attr("Id").split("_")[1] == '1') {
                tester.alertBox("You can not delete Standard " + tester.gCongfigRole + "!");
                flag = 1;
                return;
            }
        }
        else {
            var count = -1;
            $('#rowTable thead tr td').each(function () {
                if ($(this).find('input').is(':checked')) {
                    count++;
                }
            });
            if (count == 0 && $('#rowTable thead tr td:eq(0)').find('input').is(':checked') == true) {
                tester.alertBox("Select the " + tester.gConfigRoles + " first!");//Added by Mohini for Resource file
                flag = 1;
                return;
            }
            else if (count > 1 && $('#rowTable thead tr td:eq(0)').find('input').is(':checked') == true && flag != 1) {
                tester.alertBox("Select one " + tester.gCongfigRole.toLowerCase() + " at a time!");//Added by Mohini for Resource file
                flag = 1;
                return;
            }
            else if (count >= 1 && $('#rowTable thead tr td:eq(0)').find('input').is(':checked') == false && flag != 1) {
                tester.alertBox("Select one " + tester.gCongfigRole.toLowerCase() + " at a time!");//Added by Mohini for Resource file
                flag = 1;
                return;
            }

            else if (count == 1) {
                $('#rowTable thead tr td').each(function () {
                    if ($(this).find('input').is(':checked')) {
                        if ($(this).find('input').attr('role') == '1') {
                            tester.alertBox("You can not delete Standard " + tester.gCongfigRole + "!");
                            flag = 1;
                            return;
                        }
                    }
                });
            }
            else if (count == -1) {
                tester.alertBox("To Edit or Delete a " + tester.gCongfigRole + ", please first select the check box available in the respective " + tester.gCongfigRole + "s column below the " + tester.gCongfigRole + " name.");
                flag = 1;
                return;
            }

        }

        var roleID;
        var delflag = 0;
        // Added by Mohini for assign roles in bulk DT:11-04-2014
        if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList') {
            $("#testerRoles div div li").each(function () {
                if ($(this).children(".mslChk").attr('checked') == true)
                    roleID = $(this).children(".mslChk").attr('Id').split("_")[1];

            });
        }
        else {
            $('#rowTable thead tr td').each(function () {
                if ($(this).find('input').is(':checked')) {
                    if ($(this).find('input').attr('role') != undefined) {
                        roleID = $(this).find('input').attr('role');
                    }
                }

            });
        }

        var roleList = show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList;
        /*if(roleList != undefined)
		{
			for(var ii=0;ii<roleList.length;ii++)
			{
				if(roleList[ii].roleId == roleID)
				{
					if(roleList[ii].isTestersAssigned == "1")
					{
						tester.alertBox(tester.gCongfigRole+" cannot be deleted because this "+tester.gCongfigRole.toLowerCase()+" is already assigned to some of the "+tester.gConfigTester.toLowerCase()+"(s) in this "+tester.gConfigProject.toLowerCase());
						flag=1;
					}
					break;
				}
			}
		}
		
	   if(flag==1) 										
		return;							
	   else*/
        {
            var data = { "roleId": roleID };
            var result = ServiceLayer.DeleteData("DeleteRole", data, 'Tester');
            if (result != '' && result != undefined) {
                //if (result[0].Value == "Done")

                if (result.Success == "Done") {
                    var ss = tester.currProjectIndex;
                    for (var mm = 0; mm < show.GetGroupPortfolioProjectTestPass[ss].roleList.length; mm++) {
                        if (show.GetGroupPortfolioProjectTestPass[ss].roleList[mm].roleId == roleID) {
                            show.GetGroupPortfolioProjectTestPass[ss].roleList.splice(mm, 1);
                            break;
                        }
                    }

                    onlyRoleDeletionFlag = 1;
                    //tester.alertBox(tester.gCongfigRole+" Deleted Successfully"); //modified for bug 8038//Added by Mohini for Resource file
                    Main.AutoHideAlertBox(tester.gCongfigRole + " Deleted Successfully");

                    //Added Mohini for assign roles in bulk DT:11-04-2014
                    if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList') {
                        tester.populateRoles();
                    }
                    else {
                        tester.populateRolesForBulk();
                    }
                }
                    //else if (result[0].Value.toLowerCase() == "role cannot be deleted! testers are assigned with selected roleid.") {  
                else if (result.Success == "role cannot be deleted! testers are assigned with selected roleid.") {
                    tester.alertBox(tester.gCongfigRole + " cannot be deleted because this " + tester.gCongfigRole.toLowerCase() + " is already assigned to some of the " + tester.gConfigTester.toLowerCase() + "(s) in this " + tester.gConfigProject.toLowerCase());
                }

                else
                    tester.alertBox('Sorry! Something went wrong, please try again!');
            }
            else
                tester.alertBox('Sorry! Something went wrong, please try again!');
        }
    },
    addRole: function () {
        if ($.trim($('#txtNewRole').val()) != '') {
            var roleDiv = $("#testerRoles").html();
            var flagk = 0;
            //Added Mohini for assign roles in bulk DT:11-04-2014
            if (tester.gPrincipalType != 'SecurityGroup' && tester.gPrincipalType != 'DistributionList') {
                $("#testerRoles div div li").each(function () {

                    if ($.trim($('#txtNewRole').val().toLowerCase()) == $(this).children('span').text().toLowerCase()) {
                        //tester.alertBox("Role already exists.");
                        tester.alertBox(tester.gCongfigRole + " already exists.");//Added by Mohini for Resource file	
                        flagk = 1;
                    }

                });
            }
            else {
                $('#rowTable thead tr td').each(function () {

                    if (($.trim($('#txtNewRole').val().toLowerCase()) == $(this).text().toLowerCase()) && ($(this).find('input').attr('role') != $('#hidRoleId').val())) {
                        //tester.alertBox("Role already exists.");
                        tester.alertBox(tester.gCongfigRole + " already exists.");//Added by Mohini for Resource file	
                        flagk = 1;
                    }
                });


            }

            var iChars = "!@#$%^&*()+=[]\';,/{}|\":<>?";
            for (var i = 0; i < $.trim($('#txtNewRole').val()).length; i++) {
                if (iChars.indexOf($.trim($('#txtNewRole').val()).charAt(i)) != -1) {
                    //var msgTag='Role Name contains special characters. \n These are not allowed.\n Please remove them and try again.!'
                    var msgTag = tester.gCongfigRole + ' Name contains special characters. \n These are not allowed.\n Please remove them and try again!'//Added by Mohini for Resource file
                    tester.alertBox(msgTag);
                    flagk = 1;
                }
            }

            if (($.trim($('#txtNewRole').val())).toLowerCase() == ('Standard'.toLowerCase()) || ($.trim($('#txtNewRole').val())).toLowerCase() == ('All'.toLowerCase())) {
                //tester.alertBox("Cannot create roles with names Standard and All");
                tester.alertBox("Cannot create " + tester.gCongfigRole.toLowerCase() + "s with names Standard and All");//Added by Mohini for Resource file
                flagk = 1;
            }
            if (flagk == 0) {
                var data = {
                    "roleName": $.trim($('#txtNewRole').val()),
                    "roleDetails": $.trim($('#txtDescription').val()),
                    "projectId": show.projectId //TBC
                };
                var result = ServiceLayer.InsertUpdateData("InsertUpdateRole", data, 'Tester');
                if (result != '' && result != undefined) {
                    //if (result[1].Value == "Done") { // Rupal
                    if (result.Success == "Done") {
                        var item = {}
                        item["roleId"] = result.roleId; //result[0].Value;
                        item["roleName"] = $.trim($('#txtNewRole').val());
                        item["roleDetails"] = $.trim($('#txtDescription').val());

                        show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList.push(item);

                        if ($.trim($('#txtDescription').val()) != "")
                            tester.roleDescForRoleID[result.ID] = $.trim($('#txtDescription').val());
                        else
                            tester.roleDescForRoleID[result.ID] = "-";
                        document.getElementById('testerRoles').disabled = false;
                        multiSelectList.addItem($('#txtNewRole').val(), result['ID']);

                        $('#addRole').disabled = false;
                        $('#divRole').hide();
                        //Added by Mohini for Assign role in bulk DT:10-04-2014
                        if (tester.gPrincipalType == 'SecurityGroup' || tester.gPrincipalType == 'DistributionList') {
                            tester.populateRolesForBulk();
                            Main.AutoHideAlertBox(tester.gConfigTester + ' added successfully!');
                        }
                            //{
                            //var item = {}
                            //item["roleId"] = result.Value; //result[0].Value;
                            //item["roleName"] = $.trim($('#txtNewRole').val());
                            //item["roleDetails"] = $.trim($('#txtDescription').val());

                            //show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList.push(item);

                            //if ($.trim($('#txtDescription').val()) != "")
                            //    tester.roleDescForRoleID[result.ID] = $.trim($('#txtDescription').val());
                            //else
                            //    tester.roleDescForRoleID[result.ID] = "-";
                            //document.getElementById('testerRoles').disabled = false;
                            //multiSelectList.addItem($('#txtNewRole').val(), result['ID']);

                            //$('#addRole').disabled = false;
                            //$('#divRole').hide();
                            ////Added by Mohini for Assign role in bulk DT:10-04-2014
                            //if (tester.gPrincipalType == 'SecurityGroup' || tester.gPrincipalType == 'DistributionList') {
                            //    tester.populateRolesForBulk();
                            //}
                        else {
                            tester.populateRoles();
                        }
                        $('#txtNewRole').val("");
                        $('#txtDescription').val('');
                    }
                    else
                        tester.alertBox('Sorry! Something went wrong, please try again!');
                }
                else
                    tester.alertBox('Sorry! Something went wrong, please try again!');
            }
            else
                return;
        }
        else {
            //tester.alertBox("Please enter role.");
            tester.alertBox("Please enter " + tester.gCongfigRole.toLowerCase() + ".");//Added by Mohini for Resource file
        }
    },

    //Cancel new role insertion
    cancelRole: function () {
        document.getElementById('btnDiv').style.display = "inline";
        document.getElementById('btnEdit').style.display = "none";
        document.getElementById('btnAdd').style.display = "inline";

        $('#txtNewRole').val("");
        $('#txtDescription').val('');

        document.getElementById('testerRoles').disabled = false;
        $('#addRole').disabled = false;
        $('#divRole').hide();
        if (tester.gPrincipalType == 'SecurityGroup' || tester.gPrincipalType == 'DistributionList')//Added by Mohini for assign role in bulk Dt:11-04-2014
        {
            $('#div2').css('min-height', '300px');
        }

    },
    configRolesArray: new Array(),
    configRole: function () {

        if ($("#ulItemstesterRoles div li").length != 1)
            multiSelectList.createMultiSelectList("testerRolesConf", tester.roles, "Role", "ID", "80px;");
        else
            tester.createMultiSelectList("testerRolesConf", "80px");
        $(".Mediumddl:last").css('width', '460px');
        $("#ulItemstesterRolesConf div").css('width', '460px');

        $("#ulItemstesterRolesConf a").each(function () {
            $(this).css('color', "#0066ff")
        });

        if (tester.configRolesArray != 0)
            multiSelectList.setSelectedItemsFromArray("testerRolesConf", tester.configRolesArray);
        else// If no role is configured then Standard role will get configured for project
        {
            $('input[id=testerRolesConf_1]').attr('checked', 'checked');
            var StandardSignUpList = jP.Lists.setSPObject(tester.SiteURL, 'StandardSignUp');
            var obj = [];
            obj.push({
                'projectID': show.projectId
            });

            var Result = StandardSignUpList.updateItem(obj);
        }
        $('#confRole').dialog({
            resizable: false,
            modal: true,
            height: 370,
            width: 500,
            buttons: {
                "Ok": function () {

                    tester.configRolesArray = [];
                    var obj = [];
                    var count = 0;
                    var standardRolePresentForConfig = 0;
                    $("#testerRolesConf div div li").each(function () {
                        if ($(this).children(".mslChk").attr('checked') == true) {
                            if ($(this).children(".mslChk").attr('Id').split("_")[1] != '1') {
                                tester.configRolesArray.push($(this).children(".mslChk").attr('Id').split("_")[1]);
                                obj.push({
                                    'ID': $(this).children(".mslChk").attr('Id').split("_")[1],
                                    'displayOnSignUp': 'Yes'
                                });
                            }
                            else {
                                standardRolePresentForConfig = 1;
                                tester.configRolesArray.push("1");
                                var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">' + show.projectId + '</Value></Eq></Where></Query>';
                                var result = tester.dmlOperation(query, 'StandardSignUp');
                                if (result == undefined)//If standard is not present for configuration earlier
                                {
                                    var StandardSignUpList = jP.Lists.setSPObject(tester.SiteURL, 'StandardSignUp');
                                    var obj2 = [];
                                    obj2.push({
                                        'projectID': show.projectId
                                    });

                                    var Result = StandardSignUpList.updateItem(obj2);
                                }
                            }
                            count++;
                        }
                        else if ($(this).children(".mslChk").attr('Id').split("_")[1] != '1') {
                            obj.push({
                                'ID': $(this).children(".mslChk").attr('Id').split("_")[1],
                                'displayOnSignUp': 'No'
                            });
                        }
                    });
                    if (count != 0) {
                        if (obj.length != 0) {
                            var RoleDetailsList = jP.Lists.setSPObject(tester.SiteURL, 'TesterRole');
                            var Result = RoleDetailsList.updateItem(obj);
                            if (standardRolePresentForConfig == 0)//If standard role is not present for configuration then delete its entry from StandardSignUp list
                            {
                                var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">' + show.projectId + '</Value></Eq></Where></Query>';
                                var result = tester.dmlOperation(query, 'StandardSignUp');
                                if (result != undefined) {
                                    var StandardSignUpList = jP.Lists.setSPObject(tester.SiteURL, 'StandardSignUp');
                                    var res = StandardSignUpList.deleteItem(result[0]['ID']);
                                }
                            }
                        }
                        $(this).dialog("close");
                    }
                    else
                        //tester.alertBox('Please select minimum one Role for configuration!');	
                        tester.alertBox('Please select minimum one ' + tester.gCongfigRole + ' for configuration!');//Added by Mohini for Resource file
                },
                "Cancel": function () {
                    $(this).dialog("close");
                }
            }

        });

    },

    clearFields: function () {
        //Added by Mohini for Assign Roles in Bulk DT:15-04-2014
        $('#testerRolesinBulk').html('');
        $('#lblRole').css('display', '');
        $('#assigRole').css('display', 'none');
        $('#testerRolesinBulk').css('display', 'none');
        $('#testerRoles').css('display', '');
        $('#buttonsDiv').css('margin-top', '60px');
        tester.populateRoles();
        tester.gPrincipalType = '';
        /*******************************************/
        $("#TooltipVersionLead").hide(); //r
        //New code added by Rupal.s
        $('#Auto').val('');
        $('#Auto_Hdn').val('');
        // End
        $("div[title='tester']").empty();
        $("textarea[title='tester']").text('');
        $("textarea[title='tester']").empty();
        multiSelectList.selectNone("testerRoles");
        document.getElementById('btnUpdate').style.display = "none";
        document.getElementById('btnSave').style.display = "inline";
        document.getElementById('btnNewCancel').style.display = "inline";
        document.getElementById('btnReset').style.display = "none";
        $("#area").val("0");

    },
    reset: function () {
        multiSelectList.setSelectedItemsFromArray("testerRoles", tester.oldTesterRoles);
        $("div[title='tester']").text(tester.oldTesterName);
        $("#TooltipVersionLead").hide(); //r
        $("#ctl00_ctl00_midPannel_ContentPlaceHolder1_Child_ContentPlaceHolder1_PeopleEditorUser2_checkNames").trigger('click');
        if (tester.oldArea != "") {
            $("#area").val(tester.oldArea);
        }
        else
        $("#area").val(0);
        $("#Auto").val(tester.tempname);
        $("#Auto_Hdn").val(tester.tempHdnname);
       

        //Rupal
      //  $("#Auto").val()

        //To enable the Create and View links
        //$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
        //$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");	
    },
    updateTester: function () {
        tester.setTesterValue();
        //tester.tempname = '';
        //tester.tempHdnname = '';
        // Added By Rupal
        if ($("#TooltipVersionLead").is(':visible') == true) {
            var msgTag1 = tester.gConfigTester +' name is invalid !';
            tester.alertBox(msgTag1);
            Main.hideLoading();
            return;

        }
        var Ele = $('#Auto_Hdn').val();
        var Ele1 = $('#Auto').val();
        if (Ele.trim() == '' || Ele1 == "") {
            var msgTag = tester.gConfigTester +' cannot be empty !'//added by Rupal 
            tester.alertBox(msgTag);
            $('#Tester').show();
            Main.hideLoading();
            return;
        }

        if ($("#testerRoles div div li").find(":checked").length == "0")
            tester.alertBox("Please select the " + tester.gConfigRoles.toLowerCase() + " first!");//Added  for Resource file
        else if (tester.hdn_SpUserName == "")
            tester.alertBox("Enter the " + tester.gConfigTester + "(s) first!");//Added for Resource file
        else {
            /*Modified  for migration to O365 DT:7/16/2014*/
            //Commented By Rupal 
            //var displayText = $("div[Title='tester'] #divEntityData").attr("displaytext");
            //if (displayText.indexOf("\\") != -1) {
            //    displayText = displayText.split("\\")[1];
            //}
            var principalType = 'User';//Main.SearchPrincipalType(displayText)
            //if (principalType == undefined)
            //    principalType = 'User';
            /*Modified  for migration to O365 DT:7/16/2014*/

            if (principalType != 'User') {
                tester.alertBox("Select " + tester.gConfigTester + " to be updated!");
            }
            else {
                // var TesterStr = $("textarea[Title='tester']").val();
                AddUser.globTesterName = tester.hdn_SpUserName; //tester.resolveTesterName(TesterStr);
                //AddUser.presentInGroup = 0;
                //AddUser.GetGroupNameforUser();
                //if (AddUser.presentInGroup == 1)//User is not present in member group
                //    AddUser.AddUserToSharePointGroup();
                //else
                //    AddUser.GetUserProperty();
                newSPUserIdN = tester.hdn_SpuserId; //AddUser.testerSPID;

                var testPassID = show.testPassId;

                //var Ele = $('#Auto_Hdn').val();
                //var Ele1 = $('#Auto').val();
                //if (Ele.trim() == '' || Ele1 == "") {
                //    var msgTag = tester.gConfigTester +' cannot be empty !'//added by Rupal 
                //    tester.alertBox(msgTag);
                //    $('#Tester').show();
                //    Main.hideLoading();
                //    return;
                //}



                //tester old role from list in ttoldroles
                var roles = new Array();
                var rolesDeleted = new Array();
                var rolesAdded = new Array();
                var RoleBasedOnRoleID = new Array();
                // to get all checked roles in rroleIdArray
                $("#testerRoles div div li").each(function () {
                    RoleBasedOnRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] = $(this).children('span').text();
                    if (($(this).children(".mslChk").attr('checked')) == true) {
                        roles.push(($(this).children(".mslChk").attr('Id').split("_")[1]));
                        if ($.inArray($(this).children(".mslChk").attr('Id').split("_")[1], tester.oldTesterRoles) == -1)
                            rolesAdded.push(($(this).children(".mslChk").attr('Id').split("_")[1]));
                    }
                });

                for (var i = 0; i < tester.oldTesterRoles.length; i++) {
                    if ($.inArray(tester.oldTesterRoles[i], roles) == -1) {
                        rolesDeleted.push(tester.oldTesterRoles[i]);
                    }
                }

                if (newSPUserIdN != $('#getHidUserId').val()) {
                    for (var i = 0; i < tester.TesterResult.length; i++) {
                        if (tester.TesterResult[i].spUserId == newSPUserIdN) {
                            tester.alertBox(tester.gConfigTester + ' ' + (AddUser.testerFullName) + ' already exists in this ' + tester.gConfigTestPass + '.You can find the ' + tester.gConfigTester.toLowerCase() + ' from following grid and click edit to update the details of ' + tester.gConfigTester.toLowerCase() + '.');
                            Main.hideLoading();
                            return;
                        }
                    }
                }

                ///////////////////////////////////////////////////////////
                var testingStarted = false;
                var blockDelete = false;
                var testerPresentWithRemovedRoles = new Array();
                if (rolesDeleted.length > 0) {
                    var roleList = new Array();
                    var testStepPresentWithRolesForDelTester = new Array();
                    var testStepPresentWithRoles = new Array();
                    var testStepAssociated = false;
                    for (var i = 0; i < tester.TesterResult.length; i++) {
                        roleList = new Array();
                        if (tester.TesterResult[i].spUserId == $('#getHidUserId').val()) {
                            roleList = tester.TesterResult[i].roleList;
                            for (var mm = 0; mm < roleList.length; mm++) {
                                if ($.inArray(roleList[mm].roleId, rolesDeleted) != -1) {
                                    if (roleList[mm].isTestingInprogress == "1")
                                        testingStarted = true;
                                    if (roleList[mm].isTestStepsAssigned == "1" && $.inArray(roleList[mm].roleId, testStepPresentWithRolesForDelTester) == -1)
                                        testStepPresentWithRolesForDelTester.push(roleList[mm].roleId);
                                    if (roleList[mm].isTestStepsAssigned == "1")
                                        testStepAssociated = true;
                                }
                            }
                        }
                        else {
                            roleList = tester.TesterResult[i].roleList;
                            for (var mm = 0; mm < roleList.length; mm++) {
                                if ($.inArray(roleList[mm].roleId, rolesDeleted) != -1) {
                                    if (roleList[mm].isTestStepsAssigned == "1" && $.inArray(roleList[mm].roleId, testStepPresentWithRoles) == -1)
                                        testStepPresentWithRoles.push(roleList[mm].roleId);

                                    testerPresentWithRemovedRoles.push(roleList[mm].roleId);
                                }
                            }
                        }
                    }
                    var oldSelectedTestPassNames = $("#TestPassTitle label").attr("title");
                    if (testStepPresentWithRolesForDelTester.length > testStepPresentWithRoles.length) {
                        var roleNames = new Array();
                        for (var i = 0; i < testStepPresentWithRolesForDelTester.length; i++) {
                            if ($.inArray(testStepPresentWithRolesForDelTester[i], testStepPresentWithRoles) == -1)
                                roleNames.push(RoleBasedOnRoleID[testStepPresentWithRolesForDelTester[i]]);
                        }
                        if (testingStarted)
                            tester.alertBox("Testing has already been started for this " + tester.gConfigTester.toLowerCase() + " and this is the only " + tester.gConfigTester.toLowerCase() + " available for " + tester.gConfigRoles.toLowerCase() + " :" + roleNames + " under :" + oldSelectedTestPassNames + tester.gConfigTestPass.toLowerCase() + " for which " + tester.gConfigTestStep.toLowerCase() + "(s) are already created, so delete the associated " + tester.gConfigTestStep.toLowerCase() + "(s) first!");
                        else
                            tester.alertBox("This is the only " + tester.gConfigTester.toLowerCase() + " available for " + tester.gConfigRoles.toLowerCase() + " :" + roleNames.join(',') + " under :" + oldSelectedTestPassNames + " " + tester.gConfigTestPass.toLowerCase() + " for which " + tester.gConfigTestStep.toLowerCase() + "(s) are already created, so delete the associated " + tester.gConfigTestStep.toLowerCase() + "(s) first!");
                        blockDelete = true;

                        Main.hideLoading();
                        return;
                    }
                    if (!blockDelete && testingStarted) {
                        tester.alertBox('There have already been ' + tester.gConfigTestStep.toLowerCase() + 's completed that are associated to ' + tester.gConfigRoles.toLowerCase() + ', therefore it cannot be deleted.  You may only change the name of the ' + tester.gConfigRoles.toLowerCase() + '.');//Added by Mohini for Resource file
                        Main.hideLoading();
                        return;
                    }

                    if (!blockDelete && !testingStarted && testStepAssociated) {
                        var msg = "If you remove existing " + tester.gConfigRoles.toLowerCase() + " the related " + tester.gConfigTestStep.toLowerCase() + "(s) will also be deleted for the " + tester.gConfigTester.toLowerCase() + ".Do you want to continue ?";//Added by Mohini for Resource file
                        Main.hideLoading();
                        confirmationForUpdate = confirm(msg);
                        if (confirmationForUpdate)
                            blockDelete = false;
                        else
                            blockDelete = true;
                    }
                }
                if (!blockDelete) {
                    var area = "";
                    var areaId = "";
                    if ($("#area").val() != "0") {
                        area = $("#area option:selected").text().replace(/\t/g, "").replace(/\n/g, "");
                        areaId = $("#area").val();
                    }
                    var roleIdArray = [];
                    $("#testerRoles div div li").each(function () {
                        if (($(this).children(".mslChk").attr('checked')) == true) {
                            roleIdArray.push($(this).children(".mslChk").attr('Id').split("_")[1].toString());  //all selected roeles
                        }
                    });
                    //  var TesterStr = $("textarea[Title='tester']").val();
                    var testerDisplayName = tester.hdn_SpUserName; //tester.resolveTesterFullName(TesterStr);
                    var testerEmail = tester.hdn_EmailId; //tester.resolveTesterEmail(TesterStr);

                    if (newSPUserIdN == $('#getHidUserId').val()) {
                        var data = {
                            'testPassId': show.testPassId,
                            //'spUserId': newSPUserIdN,
                            'spUserId': tester.hdn_SpuserId,

                            //'spUserId': SPUserID[ss],
                            'testerName': tester.hdn_SpUserName,
                            'testerAlias': tester.hdn_alias,
                            'testerEmail': tester.hdn_EmailId,
                            //'testerName': testerDisplayName[0],
                            //'testerAlias': AddUser.globTesterName[0],
                            //'testerEmail': testerEmail[0],
                            'areaId': areaId,
                            'roleArray': roleIdArray,
                            'action': 'edit'

                        };
                    }
                    else {
                        var data = {
                            'testPassId': show.testPassId,
                            //'spUserId': newSPUserIdN,
                            'spUserId': tester.hdn_SpuserId,

                            'oldTesterspUserId': $('#getHidUserId').val(),
                            'testerName': tester.hdn_SpUserName,
                            'testerAlias': tester.hdn_alias,
                            'testerEmail': tester.hdn_EmailId,
                            //'testerName': testerDisplayName[0],
                            //'testerAlias': AddUser.globTesterName[0],
                            //'testerEmail': testerEmail[0],
                            'areaId': areaId,
                            'roleArray': roleIdArray,
                            'action': 'edit'

                        };
                    }
                    var result = ServiceLayer.InsertUpdateData("InsertUpdateTester", data, 'Tester');
                    if (result != undefined && result != '') {
                        var prevRoles = new Array();
                        for (var ii = 0; ii < tester.TesterResult.length; ii++) {
                            if (tester.TesterResult[ii].spUserId == $('#getHidUserId').val()) {
                                prevRoles = tester.TesterResult[ii].roleList;
                                tester.TesterResult.splice(ii, 1);
                            }
                        }





                        var item = {};
                        item["testPassId"] = show.testPassId;
                        //item["spUserId"] = newSPUserIdN;
                        //item["testerName"] = testerDisplayName[0];
                        //item["testerAlias"] = AddUser.globTesterName[0];
                        //item["testerEmail"] = testerEmail[0];

                        item["spUserId"] = tester.hdn_SpuserId;
                        item["testerName"] = tester.hdn_SpUserName;
                        item["testerAlias"] = tester.hdn_alias;
                        item["testerEmail"] = tester.hdn_EmailId;
                        item["areaName"] = area;
                        item["areaId"] = areaId;
                        item["roleList"] = [];
                        tester.TesterResult.push(item);
                        var l = tester.TesterResult.length - 1;
                        if (rolesAdded.length > 0) {
                            //////// Test Step Assigned with roles  /////
                            var testStepPresentWithRoles = new Array();
                            var roleList = new Array();
                            for (var ii = 0; ii < tester.TesterResult.length; ii++) {
                                roleList = new Array();
                                roleList = tester.TesterResult[ii].roleList;
                                if (roleList != undefined && roleList != '') {
                                    for (var b = 0; b < roleList.length; b++) {
                                        if (roleList[b].isTestStepsAssigned == "1")
                                            testStepPresentWithRoles.push(roleList[b].roleId);
                                    }
                                }
                            }
                            for (var dd = 0; dd < rolesAdded.length; dd++) {
                                var item2 = {};
                                item2["roleId"] = rolesAdded[dd];
                                item2["roleName"] = RoleBasedOnRoleID[rolesAdded[dd]];
                                if ($.inArray(rolesAdded[dd], testStepPresentWithRoles) != -1)
                                    item2["isTestStepsAssigned"] = "1";
                                else
                                    item2["isTestStepsAssigned"] = "0";

                                item2["isTestingInprogress"] = "0";
                                tester.TesterResult[l].roleList.push(item2);
                            }
                        }
                        for (var dd = 0; dd < prevRoles.length; dd++) {
                            if ($.inArray(prevRoles[dd].roleId, rolesAdded) == -1 && $.inArray(prevRoles[dd].roleId, rolesDeleted) == -1) {
                                var item2 = {};
                                item2["roleId"] = prevRoles[dd].roleId;
                                item2["roleName"] = RoleBasedOnRoleID[prevRoles[dd].roleId];
                                item2["isTestStepsAssigned"] = prevRoles[dd].isTestStepsAssigned;
                                item2["isTestingInprogress"] = prevRoles[dd].isTestingInprogress;
                                tester.TesterResult[l].roleList.push(item2);
                            }
                        }

                        var roleList = show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList;
                        for (var b = 0; b < rolesAdded.length; b++) {
                            for (var ii = 0; ii < roleList.length; ii++) {
                                if (roleList[ii].roleId == rolesAdded[b]) {
                                    show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList[ii].isTestersAssigned = "1";
                                    break;
                                }
                            }
                        }
                        if (rolesDeleted.length != 0) {
                            for (var b = 0; b < rolesDeleted.length; b++) {
                                for (var ii = 0; ii < roleList.length; ii++) {
                                    if (roleList[ii].roleId == rolesDeleted[b] && $.inArray(roleList[ii].roleId, testerPresentWithRemovedRoles) == -1) {
                                        show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList[ii].isTestersAssigned = "0";
                                        break;
                                    }
                                }
                            }
                        }
                        Main.AutoHideAlertBox(tester.gConfigTester + " updated successfully!");
                        tester.showTestersGrid();
                        $("#allT").click();
                    }
                    else
                        tester.alertBox1('Sorry! Something went wrong, please try again!');
                }
            }
        }
        $("#TooltipVersionLead").hide(); //r
        Main.hideLoading();
        //To enable the Create and View links
        //$(".navTabs h2:eq(0)").removeAttr("disabled").css("cursor","pointer");
        //$(".navTabs h2:eq(1)").removeAttr("disabled").css("cursor","pointer");
    },


    /////////////// Delete Tester / /////////////////////////////////////////////
    deleteTester: function (spUserId) {
        var RoleBasedOnRoleID = new Array();
        $("#testerRoles div div li").each(function () {
            RoleBasedOnRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] = $(this).children('span').text();//role name based on RoleID
        });

        var testersPresentForDelRole = new Array();
        var blockDelete = false;
        var testingStarted = false;
        var roleList = new Array();
        var testStepPresentWithRolesForDelTester = new Array();
        var testStepPresentWithRoles = new Array();
        var rolesDeletedForTester = new Array();
        for (var i = 0; i < tester.TesterResult.length; i++) {
            roleList = new Array();
            if (tester.TesterResult[i].spUserId == spUserId) {
                roleList = tester.TesterResult[i].roleList;
                for (var mm = 0; mm < roleList.length; mm++) {
                    rolesDeletedForTester.push(roleList[mm].roleId);
                    if (roleList[mm].isTestingInprogress == "1")
                        testingStarted = true;
                    if (roleList[mm].isTestStepsAssigned == "1" && $.inArray(roleList[mm].roleId, testStepPresentWithRolesForDelTester) == -1)
                        testStepPresentWithRolesForDelTester.push(roleList[mm].roleId);
                }
                break;
            }
        }
        var otherTesterPresentFlag = 0;
        var testStepPresentWithRolesForOtherTester = new Array();
        for (var i = 0; i < tester.TesterResult.length; i++) {
            if (tester.TesterResult[i].spUserId != spUserId) {
                otherTesterPresentFlag = 1;
                roleList = tester.TesterResult[i].roleList;
                for (var mm = 0; mm < roleList.length; mm++) {
                    if ($.inArray(roleList[mm].roleId, rolesDeletedForTester) != -1) {
                        testersPresentForDelRole[roleList[mm].roleId] = "1";

                        if (roleList[mm].isTestStepsAssigned == "1" && $.inArray(roleList[mm].roleId, testStepPresentWithRolesForOtherTester) == -1) {
                            testStepPresentWithRolesForOtherTester.push(roleList[mm].roleId);
                        }
                    }
                }
            }
        }
        var oldSelectedTestPassNames = $("#TestPassTitle label").attr("title");
        if (testStepPresentWithRolesForDelTester.length > testStepPresentWithRoles.length && testStepPresentWithRolesForOtherTester.length < testStepPresentWithRolesForDelTester.length) {
            var roleNames = new Array();
            for (var i = 0; i < testStepPresentWithRolesForDelTester.length; i++) {
                if ($.inArray(testStepPresentWithRolesForDelTester[i], testStepPresentWithRoles) == -1)
                    roleNames.push(RoleBasedOnRoleID[testStepPresentWithRolesForDelTester[i]]);
            }
            if (testingStarted)
                tester.alertBox("Testing has already been started for this " + tester.gConfigTester.toLowerCase() + " and this is the only " + tester.gConfigTester.toLowerCase() + " available for " + tester.gConfigRoles.toLowerCase() + " :" + roleNames + " under :" + oldSelectedTestPassNames + " " + tester.gConfigTestPass.toLowerCase() + " for which " + tester.gConfigTestStep.toLowerCase() + "(s) are already created, so delete the associated " + tester.gConfigTestStep.toLowerCase() + "(s) first!");
            else
                tester.alertBox("This is the only " + tester.gConfigTester.toLowerCase() + " available for " + tester.gConfigRoles.toLowerCase() + " :" + roleNames.join(',') + " under :" + oldSelectedTestPassNames + " " + tester.gConfigTestPass.toLowerCase() + " for which " + tester.gConfigTestStep.toLowerCase() + "(s) are already created, so delete the associated " + tester.gConfigTestStep.toLowerCase() + "(s) first!");
            blockDelete = true;
        }
        if (otherTesterPresentFlag == 0 && blockDelete == false) {
            var TestCaseResult = ServiceLayer.GetData("GetTestCaseDetailForTestPassId", show.testPassId, 'Tester');
            if (TestCaseResult.length > 0) {
                blockDelete = true;
                tester.alertBox("This is the only " + tester.gConfigTester.toLowerCase() + " available for :" + oldSelectedTestPassNames + " test pass whose " + tester.gConfigTestCase.toLowerCase() + "(s) are already created, so delete the associated " + tester.gConfigTestCase.toLowerCase() + "(s) first!");//Added by Mohini for Resource file
            }
        }
        ///////////////////////////////////////

        if (blockDelete == false) {
            var msg;
            if (testingStarted)
                msg = "Testing has already been started for this " + tester.gConfigTester.toLowerCase() + ",on deleting tester his testing history for this " + tester.gConfigProject.toLowerCase() + " will be deleted,are you sure want to delete this " + tester.gConfigTester.toLowerCase() + " association ? ";//Added by Mohini for Resource file
            else
                msg = "Are you sure want to delete this " + tester.gConfigTester.toLowerCase() + " association?";//Added by Mohini for Resource file

            $("#dialog:ui-dialog").dialog("destroy");
            //$( "#divConfirm" ).text('Are you sure want to delete this tester association?');
            $("#divConfirm").text(msg);
            $("#divConfirm").dialog
				({
				    autoOpen: false,
				    resizable: false,
				    height: 140,
				    modal: true,
				    buttons:
                    {
                        "Delete": function () {
                            Main.showLoading();

                            var obj = {
                                'spUserID': spUserId,
                                'testPassId': show.testPassId
                            };
                            var result = ServiceLayer.DeleteData("DeleteTester", obj, 'Tester');




                            if (result != undefined && result != '') {
                                //if (result[0].Value == "Done") {

                                if (result.Success == "Done") {
                                    for (var i = 0; i < tester.TesterResult.length; i++) {
                                        if (tester.TesterResult[i]['spUserId'] == spUserId) {
                                            tester.TesterResult.splice(i, 1);
                                            break;
                                        }
                                    }
                                    //////////////////////
                                    /*var roleList = show.GetGroupPortfolioProjectTestPass[ tester.currProjectIndex ].roleList;
                                    if(roleList != undefined)
                                    {
                                        for(var ii=0;ii<roleList.length;ii++)
                                        {
                                            if($.inArray(roleList[ii].roleId,rolesDeletedForTester) != -1)
                                            {
                                                if(testersPresentForDelRole[ roleList[ii].roleId ] != "1")
                                                {
                                                    show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList[ii].isTestersAssigned = "0";
                                                }
                                                
                                            }
                                        }
                                    }*/
                                    //////////////////////	
                                    tester.showTestersGrid();
                                    tester.clearFields();
                                    //tester.alertBox(tester.gConfigTester+' association deleted successfully.');
                                    Main.AutoHideAlertBox(tester.gConfigTester + ' association deleted successfully.');
                                }
                                else
                                    tester.alertBox('Sorry! Something went wrong, please try again!');
                            }
                            else
                                tester.alertBox('Sorry! Something went wrong, please try again!');

                            $(this).dialog("close");
                            Main.hideLoading();

                        },
                        "Cancel": function () {
                            $(this).dialog("close");
                        }
                    }
				});
            $('#divConfirm').dialog("open");

        }

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
    resolveSPUserID: function (str) {
        var subStr = new Array();
        var gflag = -2;
        while (str.length != 0) {
            if (str.length < 200) {
                gflag = -3;
                break;
            }

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
        if (gflag == -3)
            return gflag;
        else
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

    tblWd: '',
    /*********Added by Mohini DT:24-03-2014	***********************/
    validationOnSave: function ()//function get call on save
    {

        tester.setTesterValue();
        Main.showLoading();
        var valFlag = 0;
        

        if ($("#TooltipVersionLead").is(':visible') == true) {
            var msgTag1 = tester.gConfigTester +' name is invalid !';
            tester.alertBox(msgTag1);
            Main.hideLoading();
            return;

        }
        var Ele = $('#Auto_Hdn').val();
        var Ele1 = $('#Auto').val();
        if (Ele.trim() == '' || Ele1 == "") {
            var msgTag = tester.gConfigTester +' cannot be empty !'//added by Rupal 
            tester.alertBox(msgTag);
            $('#Tester').show();
            Main.hideLoading();
            return;
        }
        if (show.projectId == '') {
            tester.alertBox("No " + tester.gConfigProject + " available under selected " + tester.gConfigPortfolio + "!");//Added by Mohini for Resource file
            Main.hideLoading();
            return;
        }
        else if (show.testPassId == '') {
            tester.alertBox("No " + tester.gConfigTestPass + " available under selected " + tester.gConfigVersion + "!");//Added by Mohini for Resource file
            Main.hideLoading();
            return;
        }
        else if (tester.hdn_SpuserId == '') {
            tester.alertBox("Select the " + tester.gConfigTester + "(s) first!");//Added by Mohini for Resource file
            Main.hideLoading();
            return;
        }
      

        var SPUserID = [];
        var testerName = [];
        var testerDisplayName = [];
        var testerEmail = [];
        var newSPUserIdN = '';

        if (tester.gPrincipalType == 'User') {
            if ($("#testerRoles li").find(":checked").length == 0) {
                Main.hideLoading();
                tester.alertBox("Select the " + tester.gConfigRoles + " first!");//Added by Mohini for Resource file
                return;
            }
            var TesterSPUserID;

            newSPUserIdN = tester.hdn_SpuserId
            //Commented by Rupal
            // tester.resolveSPUserID($("textarea[Title='tester']").val());
            /*
            if ($("textarea[Title='tester']").val() != '')
            tester.TesterStr = $("textarea[Title='tester']").val();
            if (newSPUserIdN == '' || newSPUserIdN == null || newSPUserIdN == undefined) {
                if ($("div[Title='tester']").text() == '' || $("div[Title='tester']").text() == null || $("div[Title='tester']").text() == undefined) {
                    Main.hideLoading();
                    tester.alertBox("Select the Tester(s) first!");
                    return;
                }
            }
 */

            /* Newly added by Rupal*/
            if (tester.hdn_SpUserName != '')
                tester.TesterStr = tester.hdn_SpUserName;
            if (newSPUserIdN == '' || newSPUserIdN == null || newSPUserIdN == undefined) {
                if (tester.hdn_SpUserName == '') {
                    Main.hideLoading();
                    tester.alertBox("Select the Tester(s) first!");
                    return;
                }
            }

            var TesterStr = tester.hdn_SpUserName;



            //
            ////SP13//
            AddUser.testerSPID = '';
            AddUser.globTesterName = tester.hdn_alias //  $('div[title="tester"] #divEntityData').attr('key');//Added for SP13
            AddUser.presentInGroup = 0;
            //AddUser.GetGroupNameforUser();
            //if(AddUser.presentInGroup == 1)//User is not present in member group
            //{
            //	AddUser.AddUserToSharePointGroup();
            //}
            newSPUserIdN = tester.hdn_SpuserId /// AddUser.testerSPID;
            /////				   

            //testerName.push(tester.resolveTesterName(tester.TesterStr));
            //SPUserID.push(newSPUserIdN);
            //testerDisplayName.push(tester.resolveTesterFullName(tester.TesterStr));
            //testerEmail.push(tester.resolveTesterEmail(tester.TesterStr));


            testerName.push(tester.resolveTesterName(tester.TesterStr));
            SPUserID.push(newSPUserIdN);
            testerDisplayName.push(tester.resolveTesterFullName(tester.TesterStr));
            testerEmail.push(tester.resolveTesterEmail(tester.TesterStr));

            tester.saveAfterValidation(SPUserID, testerName, testerDisplayName, testerEmail, tester.gPrincipalType);//Function get call after validation and retriving all information of Tester

        }
        else if (tester.gPrincipalType == 'SecurityGroup' || tester.gPrincipalType == 'DistributionList') {
            var principalType = tester.gPrincipalType;
            var arrayOfAllRolesForRoleID = new Array();
            arrayOfAllRolesForRoleID = tester.roleNameForRoleID;
            var len = $('#rowTlb tr').length;
            var count = 0;
            $('#rowTlb tr').each(function () {
                if (!$(this).find('td:eq(0)').find('input').is(':checked')) {
                    count++;
                }

            });


            if (count == len) {
                tester.alertBox("Please select at least one " + tester.gConfigTester + " !");
            }
            else if ($('#rowTable thead tr td:eq(0)').find('input').is(':checked') != true && count == len) {
                tester.alertBox("Please select at least one " + tester.gConfigTester + " !");
            }
            else {
                var SPUserIDs = new Array();
                var arrayOfRoleForSPUserID = new Array();

                $('#rowTlb tr').each(function () {
                    if ($(this).find('td:first').find('input').is(':checked'))
                        var id = $(this).find('td:first').attr('id');
                    if (id != "" && id != undefined) {
                        SPUserIDs.push(id);
                        testerName.push(tester.testerNameForSPuserID[id] != undefined ? tester.testerNameForSPuserID[id] : "-");
                        testerDisplayName.push(tester.testerDisplayNameForSPuserID[id] != undefined ? tester.testerDisplayNameForSPuserID[id] : "-");
                        testerEmail.push(tester.testerEmailForSPuserID[id] != undefined ? tester.testerEmailForSPuserID[id] : "-");
                    }
                });

                $('#rowTlb tr').each(function () {
                    var userID = $(this).find('td').eq(0).attr('id');
                    if ($.inArray(userID, SPUserIDs) != -1) {
                        $(this).find('td').each(function () {
                            if ($(this).find('input').hasClass('role') == true) {
                                if ($(this).find('input').is(':checked')) {
                                    //var userID=$('#rowTlb tr td:first').attr('id');
                                    if (arrayOfRoleForSPUserID[userID] == undefined) {
                                        arrayOfRoleForSPUserID[userID] = $(this).attr('id');
                                    }
                                    else {
                                        arrayOfRoleForSPUserID[userID] += "," + $(this).attr('id');
                                    }
                                }
                            }
                        });
                    }
                });
                for (var i = 0; i < SPUserIDs.length; i++) {
                    var arrOfRole = arrayOfRoleForSPUserID[SPUserIDs[i]];
                    if (arrOfRole == undefined || arrOfRole == null) {
                        Main.hideLoading();
                        tester.alertBox("Please select at least one " + tester.gCongfigRole + " for each " + tester.gConfigTester);
                        return;
                    }
                }
                tester.saveAfterValidation(SPUserIDs, testerName, testerDisplayName, testerEmail, principalType, arrayOfRoleForSPUserID, arrayOfAllRolesForRoleID);
            }

        }
        else
            tester.alertBox("Selected user can not be added!");
        $("#TooltipVersionLead").hide(); //r
        Main.hideLoading();
    },



    checkUncheckUser: function () {
        if ($('#allTester').is(':checked')) {
            $('#lblAlert').text("");
            $('#rowTlb tr').each(function () {
                $(this).find('td:eq(0)').find('input').attr('checked', true);
            });
        }
        else {
            $('#rowTlb tr').each(function () {
                $(this).find('td:eq(0)').find('input').attr('checked', false);
            });

        }
    },
    checkUncheckRole: function (roleId) {
        var count = -1;
        $('#rowTable thead tr td').each(function () {
            count++;
            if ($(this).find('input').attr('role') == roleId) {
                if ($(this).find('input').is(':checked')) {
                    $('#rowTlb tr').each(function () {
                        if ($(this).find('td').eq(0).find('input').attr('checked') == true)
                            $(this).find("td:eq(" + count + ")").find('input').attr('checked', true);
                    });
                }
                else {
                    $('#rowTlb tr').each(function () {
                        $(this).find("td:eq(" + count + ")").find('input').attr('checked', false);
                    });
                }

            }
        });
    },
    checkUncheckallRoleForUser: function (userId) {
        $('#rowTlb tr').each(function () {
            if ($(this).attr('userId') == userId) {
                if ($(this).find('td:eq(0)').find('input').is(':checked')) {
                    $('#lblAlert').text("");
                    $(this).find('input').attr('checked', true);
                }
                else {
                    $(this).find('input').attr('checked', false);
                }
            }

        });
    },
    saveAfterValidation: function (SPUserID, testerName, testerDisplayName, testerEmail, principalType, arrayOfRoleForSPUserID, arrayOfAllRolesForRoleID) {
        //Main.showLoading();
        var selectedTestPassId = new Array();
        var countForSavedTester = 0;
        selectedTestPassId.push(show.testPassId);
        var roleIdArray = new Array();
        //var roleIdArray='';
        var RoleBasedOnRoleID = new Array();
        var testerAddSuccessfully = new Array();
        var testerAlreadyExist = new Array();
        var arrayOfRolesForTester = new Array();
        var aarayOfSavedTesterID = new Array();
        var notAddedTester = new Array();
        var stringofAllRole = '';
        //To check for the new tester being added is already assigned for the project
        for (var ss = 0; ss < SPUserID.length; ss++) {
            newSPUserIdN = SPUserID[ss];
            var TestersListItemsFind = 0;
            for (var i = 0; i < tester.TesterResult.length; i++) {
                if (tester.TesterResult[i].spUserId == newSPUserIdN) {
                    TestersListItemsFind = 1;
                    break;
                }
            }
            if (TestersListItemsFind == 0) {
                if (principalType == 'User') {
                    var a = 0;
                    var rname;
                    $("#testerRoles div div li").each(function () {
                        if (($(this).children(".mslChk").attr('checked')) == true) {
                            roleIdArray.push($(this).children(".mslChk").attr('Id').split("_")[1].toString());
                            RoleBasedOnRoleID[$(this).children(".mslChk").attr('Id').split("_")[1]] = $(this).children('span').text();
                        }
                        a++;
                    });
                    if (a == 0)
                        rname = 'Standard';
                    else
                        rname = 'All';
                    if ($("#testerRoles div div li").find(":checked").length == 0) {
                        roleIdArray.push("1");
                        RoleBasedOnRoleID[1] = rname;
                    }
                }
                else {
                    if (arrayOfRoleForSPUserID[SPUserID[ss]] != undefined) {
                        var arr = arrayOfRoleForSPUserID[SPUserID[ss]].split(',');
                        roleIdArray = arr;
                    }
                    RoleBasedOnRoleID = arrayOfAllRolesForRoleID;//all roles for roleId
                }

                //code to insert listitems in Tester List for selected testpassId(s) and RoleId(s) for the new tester being added
                var area = "";
                var areaId = "";
                if ($("#area").val() != "0") {
                    area = $("#area option:selected").text().replace(/\t/g, "").replace(/\n/g, "");
                    areaId = $("#area").val();
                }


                var data = {
                    'testPassId': show.testPassId,
                    'spUserId': SPUserID[ss],
                    'testerName': tester.hdn_SpUserName,
                    'testerAlias': tester.hdn_alias,
                    'testerEmail': tester.hdn_EmailId,
                    'areaName': area,
                    'areaId': areaId,
                    'roleArray': roleIdArray,
                    'action': 'add'

                };
                var result = ServiceLayer.InsertUpdateData("InsertUpdateTester", data, 'Tester');
                if (result != undefined && result != '') {
                    //////// Test Step Assigned with roles  /////
                    var testStepPresentWithRoles = new Array();
                    var roleList = new Array();
                    var maxTesterID = 0;
                    for (var ii = 0; ii < tester.TesterResult.length; ii++) {
                        if (parseInt(tester.TesterResult[ii].testerID) > maxTesterID)
                            maxTesterID = parseInt(tester.TesterResult[ii].testerID)

                        roleList = new Array();
                        roleList = tester.TesterResult[ii].roleList;
                        if (roleList != undefined && roleList != '') {
                            for (var b = 0; b < roleList.length; b++) {
                                if (roleList[b].isTestStepsAssigned == "1")
                                    testStepPresentWithRoles.push(roleList[b].roleId);
                            }
                        }
                    }

                    ///////////////////////////////////////////

                    var item = {};
                    item["testerID"] = (maxTesterID + 1).toString();
                    item["testPassId"] = show.testPassId;
                    item["spUserId"] = SPUserID[ss];
                    //item["testerName"] = testerDisplayName[ss];
                    //item["testerAlias"] = testerName[ss];
                    //item["testerEmail"] = testerEmail[ss];

                    item["testerName"] = tester.hdn_SpUserName;
                    item["testerAlias"] = tester.hdn_alias;
                    item["testerEmail"] = tester.hdn_EmailId;
                    item["areaName"] = area;
                    item["areaId"] = areaId;
                    item["roleList"] = [];
                    tester.TesterResult.push(item);
                    var l = tester.TesterResult.length - 1;
                    for (var dd = 0; dd < roleIdArray.length; dd++) {
                        var item2 = {};
                        item2["roleId"] = roleIdArray[dd];
                        item2["roleName"] = RoleBasedOnRoleID[roleIdArray[dd]];
                        if ($.inArray(roleIdArray[dd], testStepPresentWithRoles) != -1)
                            item2["isTestStepsAssigned"] = "1";
                        else
                            item2["isTestStepsAssigned"] = "0";

                        item2["isTestingInprogress"] = "0";
                        tester.TesterResult[l].roleList.push(item2);
                    }
                    var roleList = show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList;
                    for (var b = 0; b < roleIdArray.length; b++) {
                        if (principalType == 'SecurityGroup' || principalType == 'DistributionList') {

                            if (arrayOfRolesForTester[SPUserID[ss]] == undefined)
                                arrayOfRolesForTester[SPUserID[ss]] = arrayOfAllRolesForRoleID[roleIdArray[b]];
                            else
                                arrayOfRolesForTester[SPUserID[ss]] += ',  ' + arrayOfAllRolesForRoleID[roleIdArray[b]];
                        }
                        else if (principalType == 'User') {
                            if (b < roleIdArray.length - 1)
                                stringofAllRole += RoleBasedOnRoleID[roleIdArray[b]] + ', ';
                            else
                                stringofAllRole += RoleBasedOnRoleID[roleIdArray[b]];
                        }

                        for (var ii = 0; ii < roleList.length; ii++) {
                            if (roleList[ii].roleId == roleIdArray[b]) {
                                show.GetGroupPortfolioProjectTestPass[tester.currProjectIndex].roleList[ii].isTestersAssigned = "1";
                                break;
                            }
                        }

                    }
                    countForSavedTester++;
                    testerAddSuccessfully.push(testerDisplayName[ss]);
                    aarayOfSavedTesterID.push(SPUserID[ss]);
                }
                else
                    notAddedTester.push(testerDisplayName[ss]);

            }
            else
                testerAlreadyExist.push(testerDisplayName[ss]);
        }//End Of For loop		
        tester.showTestersGrid();
        $("#pagination").hide();
        tester.clearFields();

        if (SPUserID.length == 0) {
            tester.alertBox('Sorry! No ' + tester.gConfigTester + ' available in selected Group.');
        }
        else if (SPUserID.length == 1) {
            //message for single tester selected
            if (testerAlreadyExist.length == 1) {
                tester.alertBox(testerAlreadyExist.join(',') + ' ' + tester.gConfigTester + ' already exists for selected ' + tester.gConfigTestPass + ' of this ' + tester.gConfigProject + '.You can find the ' + tester.gConfigTester + ' from following grid and click edit to update the details of ' + tester.gConfigTester + '.');
            }
            else if (parseInt(countForSavedTester) == 1 || notAddedTester.length > 0) {
                if (principalType == 'SecurityGroup' || principalType == 'DistributionList') {
                    var stringrole = '';
                    for (i = 0; i < aarayOfSavedTesterID.length; i++) {
                        stringrole = arrayOfRolesForTester[aarayOfSavedTesterID[i]].split(',');
                    }
                    //tester.alertBoxHtml(testerAddSuccessfully.join(',')+'  '+tester.gConfigTester+'(s) Saved successfully with the role(s) '+stringrole.toString()+'.<br/>Please click "VIEW ALL" to see the details.',300,170);
                    Main.AutoHideAlertBox(testerAddSuccessfully.join(',') + '  ' + tester.gConfigTester + '(s) added successfully with the role(s) ' + stringrole.toString() + '.', 300, 170);
                    $(".navTabs h2:eq(0)").click();
                }
                else if (principalType == 'User') {
                    if (notAddedTester.length == 0) {
                        //tester.alertBoxHtml(testerAddSuccessfully.join(',')+'  '+tester.gConfigTester+'(s) Saved successfully with the role(s) '+stringofAllRole+'.<br/>Please click "VIEW ALL" to see the details.',200,320);
                        Main.AutoHideAlertBox(testerAddSuccessfully.join(',') + '  ' + tester.gConfigTester + '(s) added successfully with the role(s) ' + stringofAllRole + '.', 200, 320);
                        $(".navTabs h2:eq(0)").click();
                    }
                    else
                        tester.alertBoxHtml('Sorry, while adding ' + tester.gConfigTester + ' ' + notAddedTester.join(',') + '  ' + 'something went wrong, please try again!', 200, 320);
                }
            }
        }
        else if (SPUserID.length > 1) {
            //message for testers with group  	 	  	
            if (parseInt(countForSavedTester) == SPUserID.length) {
                var testersCreated = '';
                for (var m = 0; m < testerAddSuccessfully.length; m++) {
                    testersCreated += '<span>' + testerAddSuccessfully[m] + '</span><br/>';
                }
                var messageHtml = '<div style="padding-left: 15px;">'
                                    + 'The following users have been associated with the ' + tester.gConfigRoles + ' you selected.Please click "VIEW ALL" to see the details.'
                                    + '</div>'
                                     + '<div style="padding-top: 15px; padding-left: 15px; border-bottom-color: gray; border-bottom-width: 1px; border-bottom-style: dotted;">'
                                    + '<b>' + tester.gConfigTester + ' creation status</b>'
                                    + '<fieldset>'
                                        + '<legend style="color:green;font-weight:bold;">' + testerAddSuccessfully.length + ' ' + tester.gConfigTester + 's created successfully</legend>'
                                        + '<table>'
                                            + '<tbody><tr><td><b>User Name</b></td><td>&nbsp;</td>'
                                            + '<td><b>' + tester.gConfigRoles + '</b></td></tr>';
                var row = '';
                for (var m = 0; m < testerAddSuccessfully.length; m++) {
                    row += '<tr><td style="vertical-align:top;">' + testerAddSuccessfully[m] + '</td>'
                    row += '<td>&nbsp;</td>'
                    row += '<td>' + arrayOfRolesForTester[aarayOfSavedTesterID[m]] + '</td></tr>'
                }
                messageHtml += row;
                messageHtml += '</tbody>'
                            + '</table>'
                       + '</fieldset>'
                       + '</div>';
                tester.alertBoxHtml(messageHtml, 300, 170);
            }
            else if (testerAlreadyExist.length > 0 && parseInt(countForSavedTester) > 0) {
                var testersExist = '';
                for (var m = 0; m < testerAlreadyExist.length; m++) {
                    testersExist += '<span>' + testerAlreadyExist[m] + '</span><br/>';
                }
                var testersCreated = '';
                for (var m = 0; m < testerAddSuccessfully.length; m++) {
                    testersCreated += '<span>' + testerAddSuccessfully[m] + '</span><br/>';
                }
                var messageHtml = '<div style="padding-left: 15px;">'
                                    + 'The following users have been associated with the ' + tester.gConfigRoles + ' you selected.Please click "VIEW ALL" to see the details.'
                                    + '</div>'
                                    + '<div style="padding-top: 15px; padding-left: 15px; border-bottom-color: gray; border-bottom-width: 1px; border-bottom-style: dotted;">'
                                    + '<b>' + tester.gConfigTester + ' creation status</b>'
                                    + '<fieldset>'
                                        + '<legend style="color:green;font-weight:bold;">' + testerAddSuccessfully.length + ' ' + tester.gConfigTester + 's created successfully</legend>'
                                        + '<table>'
                                            + '<tbody><tr><td><b>User Name</b></td><td>&nbsp;</td>'
                                            + '<td><b>' + tester.gConfigRoles + '</b></td></tr>';
                var row = '';
                for (var m = 0; m < testerAddSuccessfully.length; m++) {
                    row += '<tr><td style="vertical-align:top;">' + testerAddSuccessfully[m] + '</td>'
                    row += '<td>&nbsp;</td>'
                    row += '<td>' + arrayOfRolesForTester[aarayOfSavedTesterID[m]] + '</td></tr>'
                }
                messageHtml += row;
                messageHtml += '</tbody>'
                           + '</table>'
                       + '</fieldset>'
                       + '<fieldset>'
                           + '<legend style="color:red;font-weight:bold;">' + testerAlreadyExist.length + ' ' + tester.gConfigTester + 's already exist for selected ' + tester.gConfigTestPass + '</legend>'
                           + '<table>'
                               + '<tbody><tr><td>'
                               + testersExist
                               + '</td></tr></tbody>'
                '</table>'
            + '</fieldset>'
            + '</div>';
                tester.alertBoxHtml(messageHtml, 300, 170);
            }
            else if (testerAlreadyExist.length > 0 && parseInt(countForSavedTester) == 0) {
                var testersExist = '';
                for (var m = 0; m < testerAlreadyExist.length; m++) {
                    testersExist += '<span>' + testerAlreadyExist[m] + '</span><br/>';
                }
                var messageHtml = '<div style="padding-top: 15px; padding-left: 15px; border-bottom-color: gray; border-bottom-width: 1px; border-bottom-style: dotted;">'
                                    + '<b>' + tester.gConfigTester + ' creation status</b>'
                                    + '<fieldset>'
                                        + '<legend style="color:red;font-weight:bold;">' + testerAlreadyExist.length + ' ' + tester.gConfigTester + 's already exist for selected ' + tester.gConfigTestPass + '</legend>'
                                        + '<table>'
                                            + '<tbody><tr><td>'
                                            + testersExist
                                            + '</td></tr></tbody>'
                '</table>'
            + '</fieldset>'
            + '</div>';
                tester.alertBoxHtml(messageHtml, 300, 170);
            }
        }
        //Main.hideLoading();

    },
    /******************************End of code******************/
    alertBox: function (msg) {
        $("#divAlert2").text(msg);
        $('#divAlert2').dialog(
		{
		  //  width: '450px',       
		   //width: '637px',
		    // width: 'auto',
		    //height: 170,
		   // height: 140,
		    modal: true,
		    buttons:
					{
					    "Ok": function () {
					        $(this).dialog("close");
					    }
					}
		});
    },
    alertBoxHtml: function (msg, left, top) {
        $("#divAlert").html(msg);
        $('#divAlert').dialog(
		{
		    height: 170,
		    modal: true,
		    position: [($(window).width() / 2) - left, top],
		    buttons:
					{
					    "Ok": function () {
					        $(this).dialog("close");
					        //Added by Mohini for assign roles in bulk DT:14-04-2014
					        $('#testerRolesinBulk').html('');
					        $('#lblRole').css('display', '');
					        $('#assigRole').css('display', 'none');
					        $('#testerRolesinBulk').css('display', 'none');
					        $('#testerRoles').css('display', '');
					        $('#buttonsDiv').css('margin-top', '60px');
					        $('#btnDiv').css('margin-top', '0px');
					        tester.populateRoles();
					        /**********************************/

					    }
					}
		});

    },
    alertBoxHtml3: function (msg) {
        $("#divAlert3").html(msg);
        $('#divAlert3').dialog(
		{
		    height: 170,
		    modal: true,
		    buttons:
					{
					    "Ok": function () {
					        $(this).dialog("close");
					    }
					}
		});

    },

    /****************Added by  Mohini on 12-19-2013****************/
    alertBox1: function (msg) {
        $("#divAlert1").html(msg);
        $('#divAlert1').dialog(
		{
		    height: 170,
		    width: 'auto',
		    modal: true,
		    buttons:
					{
					    "Ok": function () {
					        if (tester.noprjFlag == 1)
					            window.location.pathname = 'Dashboard/ProjectMgnt'
					            //  window.location.href = Main.getSiteUrl() + '/SitePages/ProjectMgnt_1.aspx';
					        else if (tester.noTPFlag == 1)
					            //   window.location.href = Main.getSiteUrl() + '/SitePages/TestPassMgnt_1.aspx' + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
					            window.location.pathname = 'TestPass'
					        $(this).dialog("close");
					    },
					    "Cancel": function () {
					        $(this).dialog("close");
					    }
					}
		});
    },



    //Excecute DML operations on list
    dmlOperation: function (search, list) {
        var listname = jP.Lists.setSPObject(Main.getSiteUrl(), list);
        var query = search;
        var result = listname.getSPItemsWithQuery(query).Items;
        return (result);
    },

    /**********Added by Mohini on 12-19-2013 to resolve the bug 10524 *******************/
    enableRoleSelection: function () {
        $('#divRole').hide();
        //		document.getElementById('testerRoles').disabled=false;
        $('#addRole').disabled = false;
        $('#txtNewRole').val("");
        $('#txtDescription').val('');
    },
    populateRolesForBulk: function () {
        var arrayOfRoleIds = new Array();
        arrayOfRoleIds.push("1");
        tester.roleNameForRoleID[1] = "Standard";
        tester.configRolesArray = [];

        var TesterRoles = new Array();
        var i = tester.currProjectIndex

        TesterRoles = show.GetGroupPortfolioProjectTestPass[i].roleList;
        tester.roles = TesterRoles

        if (TesterRoles != null && TesterRoles != undefined) {
            document.getElementById('btnDiv').style.display = "inline";	//added for bug 5560

            $("#testerRoles").html('');
            var TesterRoles2 = new Array();
            $('#testerRoles').attr('disabled', false); 	//for bug 6006		
            $('#addRole').disabled = false;
            $('#divRole').hide();
            tester.roleIDArrayColl.splice(0, tester.roleIDArrayColl.length);

            for (var yy = 0; yy < TesterRoles.length; yy++) {
                arrayOfRoleIds.push(TesterRoles[yy].roleId);
                /*if(TesterRoles[yy]['displayOnSignUp'] == "Yes")
                    tester.configRolesArray.push(TesterRoles[yy]['ID']);*/

                if (TesterRoles[yy].roleDetails != "" && TesterRoles[yy].roleDetails != undefined)
                    tester.roleDescForRoleID[TesterRoles[yy].roleId] = TesterRoles[yy].roleDetails;
                else
                    tester.roleDescForRoleID[TesterRoles[yy].roleId] = "-";

                tester.roleNameForRoleID[TesterRoles[yy].roleId] = TesterRoles[yy].roleName;
            }
            var html = '';
            //Code without fixed header
            html += '<table id="rowTable" cellSpacing="1"style="table-layout:fixed;padding-left:10px;padding-right:10px;"><thead>' +
             '<tr><td style="border-right:1px #ccc solid;border-bottom:1px #ccc solid;padding:5px 5px 5px 0px;width:160px;vertical-align:top"><div style="width:160px">' +
               '<input id="allTester" style="float:left;vAlign:top" type="checkbox" class="mslChk" checked="checked" onclick="tester.checkUncheckUser();"></input><div><span>&nbsp;&nbsp;' + tester.gConfigTester + 's \\ ' + tester.gCongfigRole + 's</span>&nbsp;&nbsp;<img style="width:10px;height:10px" align="middle" src="../SiteAssets/images/Admin/rightArrow.png"/></br>&nbsp;&nbsp;&nbsp;&nbsp;<img style="width:10px;height:10px;margin-right:55px" src="../SiteAssets/images/Admin/downArrow.png"/></div></div></td>';
            for (var i = 0; i < arrayOfRoleIds.length; i++) {
                if ($.inArray(arrayOfRoleIds[i], arrayOfRoleIds) != -1)
                    html += '<td id="' + arrayOfRoleIds[i] + '" style="border-right:1px #ccc solid;border-bottom:1px #ccc solid;padding:5px 5px 5px 5px;text-align:center;vertical-align:top;white-space:nowrap;" title="' + tester.roleNameForRoleID[arrayOfRoleIds[i]] + '">' + trimText(tester.roleNameForRoleID[arrayOfRoleIds[i]].toString(), 11) + '</br><input role="' + arrayOfRoleIds[i] + '" style="vAlign:top" type="checkbox" class="mslChk" onclick="tester.checkUncheckRole(' + arrayOfRoleIds[i] + ');"></input></td>';
            }
            //html+='</tr><tr><td style="background-color:#ccc;text-align:center" colSpan="'+arrayOfRoleIds.length+1+'"></td></tr><tr><td style="border-right:1px #ccc solid;" colSpan="'+arrayOfRoleIds.length+1+'"></td></tr><tr><td style="border-right:1px #ccc solid;" colSpan="'+arrayOfRoleIds.length+'"></td></tr></thead><tbody id="rowTlb">';
            html += '</tr></thead><tbody id="rowTlb">';
            for (var i = 0; i < tester.SPUserID.length; i++) {
                var row = '<tr userId="' + tester.SPUserID[i] + '"><td id="' + tester.SPUserID[i] + '" style="vertical-align:top;border-right:1px #ccc solid;padding-top:5px;padding-right:5px;padding-bottom:5px;text-align:Left;word-wrap:break-word;" align="center"><input style="float:left;margin-right:7px" type="checkbox" class="mslChk" checked="checked" onclick="tester.checkUncheckallRoleForUser(' + tester.SPUserID[i] + ');"></input>' + tester.testerDisplayName[i] + '</td>';
                for (var j = 0; j < arrayOfRoleIds.length; j++) {
                    if ($.inArray(arrayOfRoleIds[j], arrayOfRoleIds) != -1)
                        row += '<td id="' + arrayOfRoleIds[j] + '" style="border-right:1px #ccc solid;padding:5px 5px 5px 5px;vertical-align:top" align="center"><input type="checkbox" class="mslChk role"></input></td>';
                }
                row += "</tr>";
                html += row;
            }
            html += '</tbody></table>';

            //Added for bug id:11530
            if (tester.SPUserID.length == 0) {
                tester.alertBox('No user is available under selected DL/SG');
                tester.gPrincipalType = "";
                tester.clearFields();
                tester.populateRoles();
                $('#testerRolesinBulk').html('');
                $('#lblRole').css('display', '');
                $('#assigRole').css('display', 'none');
                $('#testerRolesinBulk').css('display', 'none');
                $('#testerRoles').css('display', '');
                $('#buttonsDiv').css('margin-top', '60px');
                $('#btnDiv').css('margin-top', '0px');
                Main.hideLoading();
                return;
            }
            $('#testerRolesinBulk').html(html);
            $('#lblRole').css('display', 'none');
            $('#assigRole').css('display', '');
            $('#testerRolesinBulk').css('display', '');
            $('#testerRoles').css('display', 'none');
            $('#buttonsDiv').css('margin-top', '133px');
            $('#btnDiv').css('margin-top', '5px');

            $("#ulItemstesterRoles a").each(function () {
                $(this).css('color', "#0066ff")
            });

        }
        else// for standard role only
        {
            var html = '';
            html += '<table id="rowTable" cellSpacing="1"style="table-layout:fixed;padding-left:10px;padding-right:10px"><thead>'
                + '<tr><td style="border-right:1px #ccc solid;border-bottom:1px #ccc solid;padding-top:5px;padding-right:5px;padding-bottom:5px;width:160px;vertical-align:top"><div style="width:160px">'
                + '<input id="allTester" style="float:left;vAlign:top" type="checkbox" class="mslChk" checked="checked" onclick="tester.checkUncheckUser();"></input><div style="float:right"><span>&nbsp;&nbsp;' + tester.gConfigTester + 's \\ ' + tester.gCongfigRole + 's</span>&nbsp;&nbsp;<img style="width:10px;height:10px" align="middle" src="../SiteAssets/images/Admin/rightArrow.png"/></br>&nbsp;&nbsp;&nbsp;&nbsp;<img style="width:10px;height:10px;margin-right:55px" src="../SiteAssets/images/Admin/downArrow.png"/></div></div></td>';
            html += '<td id="1" style="border-right:1px #ccc solid;padding-top:5px;padding-right:5px;padding-bottom:5px;text-align:center;vertical-align:top" title="Standard">Standard</br><input role="1" style="vAlign:top" type="checkbox" class="mslChk" onclick="tester.checkUncheckRole(1);"></input></td>';
            html += '</tr><tr><td style="background-color:#ccc;text-align:center" colSpan="2"></td></tr><tr><td style="border-right:1px #ccc solid;" colSpan="2"></td></tr><tr><td style="border-right:1px #ccc solid;" colSpan="2"></td></tr></thead><tbody id="rowTlb" style="overflow:auto;">';
            for (var i = 0; i < tester.SPUserID.length; i++) {
                var row = '<tr userId="' + tester.SPUserID[i] + '"><td id="' + tester.SPUserID[i] + '" style="vertical-align:top;border-right:1px #ccc solid;padding-top:5px;padding-right:5px;padding-bottom:5px;text-align:Left;word-wrap:break-word;" align="center"><input style="float:left;margin-right:7px" type="checkbox" checked="checked" class="mslChk" onclick="tester.checkUncheckallRoleForUser(' + tester.SPUserID[i] + ');"></input>' + tester.testerDisplayName[i] + '</td>';
                for (var j = 0; j < arrayOfRoleIds.length; j++) {
                    if ($.inArray(arrayOfRoleIds[j], arrayOfRoleIds) != -1)
                        row += '<td id="' + arrayOfRoleIds[j] + '" style="border-right:1px #ccc solid;padding:5px 5px 5px 5px;vertical-align:top" align="center"><input type="checkbox" class="mslChk role"></input></td>';
                }
                row += "</tr>";
                html += row;
            }
            html += '</tbody></table>';
            //Added for bug id:11530
            if (tester.SPUserID.length == 0) {
                tester.alertBox('No user is available under selected DL/SG');
                tester.gPrincipalType = "";
                tester.clearFields();
                tester.populateRoles();
                $('#testerRolesinBulk').html('');
                $('#lblRole').css('display', '');
                $('#assigRole').css('display', 'none');
                $('#testerRolesinBulk').css('display', 'none');
                $('#testerRoles').css('display', '');
                $('#buttonsDiv').css('margin-top', '60px');
                $('#btnDiv').css('margin-top', '0px');
                Main.hideLoading();
                return;
            }
            $('#testerRolesinBulk').html(html);
            $('#lblRole').css('display', 'none');
            $('#assigRole').css('display', '');
            $('#testerRolesinBulk').css('display', '');
            $('#testerRoles').css('display', 'none');
            $('#buttonsDiv').css('margin-top', '133px');
            $('#btnDiv').css('margin-top', '5px');

            $('#addRole').disabled = true;
        }
        /*var query = '<Query><Where><Eq><FieldRef Name="projectID" /><Value Type="Text">'+show.projectId+'</Value></Eq></Where></Query>';
        var result = tester.dmlOperation(query,'StandardSignUp');
        if(result != undefined)
            tester.configRolesArray.push(1);*/
        /* Added by shilpa */
        $('#btnDiv').show();
        $('#btnAdd').show();
        $('#btnEdit').hide();
        $('#txtNewRole').val('');
        $('#txtDescription').val('');
        $('#divRole').hide();

        Main.hideLoading();
    }

}