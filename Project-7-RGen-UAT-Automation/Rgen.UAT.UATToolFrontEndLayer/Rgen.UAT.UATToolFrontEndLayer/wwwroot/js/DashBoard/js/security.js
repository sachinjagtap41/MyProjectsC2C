/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var Arrr;
function transformArr(orig) {
    var newArr = [], types = {}, newItem, i, j, cur;
    try {
        for (i = 0, j = orig.length; i < j; i++) {
            cur = orig[i];
            if (cur.Security_Id == "1" && cur.Project_Id == null) {
                var listSecurityID = []
                listSecurityID.push(cur.Security_Id);
                var list = { 'projectID': cur.Project_Id == "" || cur.Project_Id == null ? "" : cur.Project_Id.toString(), 'listSecurityID': listSecurityID };
                newArr.push(list);
            }
            else {
                if (!(cur.Project_Id in types)) {
                    types[cur.Project_Id] = { projectID: cur.Project_Id, listSecurityID: [] };
                    newArr.push(types[cur.Project_Id == "" || cur.Project_Id == null ? "" : cur.Project_Id.toString()]);
                }
                types[cur.Project_Id == "" || cur.Project_Id == null ? "" : cur.Project_Id.toString()].listSecurityID.push(cur.Security_Id == "" || cur.Security_Id == null ? "" : cur.Security_Id.toString());
            }


        }
    } catch (e) {
        return;
    }
    return newArr;
}



var security = {
    userType: new Array(),
    userName: new Array(),
    projectId: new Array(),
    userAssociationForProject: new Array(),
    ProjectIDsForProject: new Array(),
    globalSPUserID: "",
    ProjectIDForTestManager: new Array(),
    UserSecurityListItems: new Array(),

    applyCommanSecurity: function (SPUserID, nameOnly) {
        var urlPart = Main.getSiteUrl();
        security.globalSPUserID = SPUserID;

        /*** UAT Version 2.0**/
        var msg = ServiceLayer.GetData("GetUserProjectsWithSecurity", undefined, 'Dashboard');
        Arrr = transformArr(msg);



        if (Arrr != undefined && Arrr != null && Arrr.length > 0) {


            // $("#dashStak").attr('href', "../SitePages/Report_New.aspx");
            $("#dashStak").attr('href', "/StakeholderDashboard");
            security.UserSecurityListItems = Arrr;
            security.ProjectIDsForProject.length = 0;
            security.ProjectIDForTestManager.length = 0;
            security.userAssociationForProject.length = 0;
            var userAuthority = '4';

            for (var dd = 0; dd < Arrr.length; dd++) {
                var listSecurityID = Arrr[dd].listSecurityID;
                security.userAssociationForProject[Arrr[dd].projectID] = listSecurityID;

                if ($.inArray(Arrr[dd].projectID, security.ProjectIDsForProject) == -1)
                    security.ProjectIDsForProject.push(Arrr[dd].projectID);

                for (var pj = 0; pj < listSecurityID.length; pj++) {
                    var userType = listSecurityID[pj];
                    userType = userType.toString();
                    switch (userType) {
                        case '1': userAuthority = '1';
                            security.userType.push('1');
                            //security.userName.push(UserSecurityListItems[i]['UserName']);

                            break;
                        case '2': userAuthority = '2';
                            security.userType.push('2');
                            //security.userName.push(UserSecurityListItems[i]['UserName']);

                            break;
                        case '3': userAuthority = '3';
                            security.userType.push('3');
                            //security.userName.push(UserSecurityListItems[i]['UserName']);
                            if ($.inArray(Arrr[dd].projectID, security.ProjectIDForTestManager) == -1)
                                security.ProjectIDForTestManager.push(Arrr[dd].projectID);
                            break;
                        case '4':
                            security.userType.push('4');
                            //security.userName.push(UserSecurityListItems[i]['UserName']);
                            break;
                        case '5': userAuthority = '5';
                            security.userType.push('5');
                            //security.userName.push(UserSecurityListItems[i]['UserName']);
                            break;
                    }
                }
            }
            var url = window.location.href;
            var check = url.indexOf("?");
            if (check != -1) {
                url = url.split("?");
                url = url[0];
            }
            if ((userAuthority == '1') || (userAuthority == '2') || (userAuthority == '3') || (userAuthority == '5')) {
                var urlPart = Main.getSiteUrl();
                $('#rstnav').empty();
                $('#rstnav').append('<a href="' + urlPart + '/ProjectMgnt" class="t1" >Projects</a>');
                $('#rstnav').append('<a href="' + urlPart + '/TestPass" class="t2" >Test Passes</a>');
                $('#rstnav').append('<a href="' + urlPart + '/testcase" class="t3" >Test Cases</a>');
                $('#rstnav').append('<a onclick="Main.showTestStepTab();" class="t4" id="attTab" style="cursor:pointer">Test Steps</a>');
                $('#rstnav').append('<a class="t5" onclick="Main.showAttachmentTab();" style="cursor:pointer">Attachments</a>');
                $('#rstnav').append('<a href="' + urlPart + '/tester.aspx" class="t6" >Testers</a>');

            }
            else {
                $("ul li a:eq(7)").hide();

                //$("ul li a:eq(1)").attr('disabled',true);
                //$("ul li a:eq(8)").attr('disabled',true);

                $("ul li a:eq(1)").removeAttr('href').css("color", "gray");
                $("ul li a:eq(8)").removeAttr('href').css("color", "gray");
            }
            var url = window.location.href;
            var checkurl = CheckUrl();
            if ($.inArray('5', security.userType) != -1 && $.inArray('2', security.userType) == -1 && $.inArray('3', security.userType) == -1 && $.inArray('4', security.userType) == -1 && $.inArray('1', security.userType) == -1) {
                $("#tabTestManagement").prev().hide();
            }

            //If user is stakeholder only
            if (CheckUrl() == 'Dashboard' && $.inArray('5', security.userType) != -1 && $.inArray('2', security.userType) == -1 && $.inArray('3', security.userType) == -1 && $.inArray('4', security.userType) == -1) {
                window.location.href = '/StakeholderDashboard';
                $("#tabTestManagement").prev().hide();
            }//If the user is stakeholder in one project and tester in other projects
            else if (CheckUrl() == 'Dashboard' && $.inArray('5', security.userType) != -1 && $.inArray('4', security.userType) != -1) {
                return;
            }//If the user is stakeholder in one project and version lead or test manager in other projects
            else if (CheckUrl() == 'Dashboard' && $.inArray('5', security.userType) != -1 && ($.inArray('2', security.userType) != -1 || $.inArray('3', security.userType) != -1)) {
                var splitUrl = url.split("?");
                if (splitUrl.length >= 1) {
                    return;
                }
                else
                    window.location.href = '/StakeholderDashboard';
            }
            $("#dash").attr('href', "../Dashboard");
        }
        else
            window.location.href = 'AccessDenied';
        /***********/

    },

    showAttachmentTab: function () {

        Main.deletecookie("AttachPageState");
        window.location.href = Main.getSiteUrl() + "/attachment";

    },

    showTestStepTab: function () {

        Main.deletecookie("TestStepState");
        window.location.href = Main.getSiteUrl() + "/teststep";
    },

    getUser: function () {
        /* Code to extrct SPUSERID of logged in user */
        var LoginDiv = document.getElementById("wrapper-hd").innerHTML;
        var start = LoginDiv.indexOf("CDATA");
        var temp = LoginDiv.substring(start, start + 100);
        var id = temp.substring(temp.indexOf("=") + 1, temp.indexOf(";"));
        /**************************************/
        return id;
    }

}