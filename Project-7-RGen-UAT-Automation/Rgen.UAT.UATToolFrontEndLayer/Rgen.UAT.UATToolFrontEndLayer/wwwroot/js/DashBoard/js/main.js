/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var Main = {

    /*Globally accessible variables at application level*/
    SiteUrl: '',
    i: 0,
    isRootWebFlag: 0,

    /*All common page functionalities*/

    /*Getting site url*/
    getSiteUrl: function () {
        var r = window.location.href.split('/');
        var FrontEndUrl = r[0] + "//" + r[2];
        //Main.SiteUrl="/";  
        //try
        //{  	 
        //	var url = _spPageContextInfo.webServerRelativeUrl;//$().SPServices.SPGetCurrentSite();
        //}
        //catch(e)
        //{
        //	var url = window.location.href.split("SitePages")[0];
        //}	
        //if((url=='') || (url==null))
        //	url="http://srvsps2/uat/uatappv2";
        url = FrontEndUrl;
        return url;
    },
    getSiteType: function () {
        //var siteUrl = _spPageContextInfo.siteServerRelativeUrl;
        //var webUrl = _spPageContextInfo.webServerRelativeUrl;
        //isRootWeb = siteUrl == webUrl;
        //Main.isRootWebFlag = 1;
    },
    //Added by Mangesh for popup exit
    /*popupExit:function(msg)
    {
        $('#wrapper-ft').append('<div id="browserAlert" style="height:800px"></div>');
        $("#browserAlert").html(msg);
        
        $('#browserAlert').dialog({
            dialogClass:"no-close",
            resizable: false,
            Width:'800',
            height: '800',
            title:"Incompatible Browser",
            modal:true, 
            position:[500,300],
            create: function( event, ui ) {
                $(this).css("maxHeight", "800px");
                $(this).css("minHeight", "800px");
                $(this).css("height", "800px");
                $(".ui-dialog-titlebar-close").hide();
            },		    	
            buttons: { "Exit":function() { window.location.replace("/sites/UAT/Dev/_layouts/15/SignOut.aspx") 
            }} 
        });
    },*/

    pageLoad: function () {
        /////////////////////////////////////////////////////////////////////////////////////////////
        //Code to check whether the current browser is IE8 and above and if not then show the popup
        //Added by Mangesh
        if ($.browser != undefined) {
            var version = parseInt($.browser.version);
            if (!($.browser.msie)) {
                //Main.popupExit("Please open the UAT App in Internet Explorer Version 8 and above!");
                window.location.replace("no-compatability.aspx")
            }
            else if (version < 8) {
                //Main.popupExit("Please open the UAT App in Internet Explorer Version 8 and above!");
                window.location.replace("no-compatability.aspx")
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////


        //Added for UAT V2.0
        isPortfolioOn = true;
        //	
        var url = window.location.href;
        var checkurl = CheckUrl();
        if(url.indexOf("tester") == -1){
        
            security.applyCommanSecurity(_spUserId, $('#userW').text());
        }

        if (Main.isRootWebFlag == 0)
            Main.getSiteType();

        isRootWeb = true;

        Main.setBanner();
        /* Added by shilpa for bug 7238 */
        $("a").mousedown(function () { return false });
        $("img").mousedown(function () { return false });

        /*For Hover Over text Added by Mohini*/
        var gConfigProject = 'Project';
        var gConfigTestPass = 'Test Pass';
        var gConfigTestCase = 'Test Case';
        var gConfigTestStep = 'Test Step';
        var gConfigTriage = 'Triage';
        var gConfigFeedback = 'Feedback';
        var gConfigStatus = 'Status';
        var gConfigTester = 'Tester';
        var gConfigActivities = 'Activities';
        var gConfigQuery = 'Query';
        var gConfigLead = 'Lead';
        var gConfigManager = 'Test Manager';
        var gConfigStakeholder = 'Stakeholders';
        var gConfigAttachments = 'Attachments';
        var gConfigGroup = 'Group';
        var gConfigPortfolio = 'Portfolio';
        var gConfigVersion = 'Version';

        //for porfolio
        if (resource.isConfig.toLowerCase() == 'true') {
            gConfigProject = resource.gPageSpecialTerms['Project'] == undefined ? 'Project' : resource.gPageSpecialTerms['Project'];
            gConfigTestPass = resource.gPageSpecialTerms['Test Pass'] == undefined ? 'Test Pass' : resource.gPageSpecialTerms['Test Pass'];
            gConfigTestCase = resource.gPageSpecialTerms['Test Case'] == undefined ? 'Test Case' : resource.gPageSpecialTerms['Test Case'];
            gConfigTestStep = resource.gPageSpecialTerms['Test Step'] == undefined ? 'Test Step' : resource.gPageSpecialTerms['Test Step'];
            gConfigTriage = resource.gPageSpecialTerms['Triage'] == undefined ? 'Triage' : resource.gPageSpecialTerms['Triage'];
            gConfigFeedback = resource.gPageSpecialTerms['Feedback'] == undefined ? 'Feedback' : resource.gPageSpecialTerms['Feedback'];
            gConfigStatus = resource.gPageSpecialTerms['Status'] == undefined ? 'Status' : resource.gPageSpecialTerms['Status'];
            gConfigTester = resource.gPageSpecialTerms['Tester'] == undefined ? 'Tester' : resource.gPageSpecialTerms['Tester'];
            gConfigActivities = resource.gPageSpecialTerms['Activities'] == undefined ? 'Activities' : resource.gPageSpecialTerms['Activities'];
            gConfigQuery = resource.gPageSpecialTerms['Query'] == undefined ? 'Query' : resource.gPageSpecialTerms['Query'];
            gConfigLead = resource.gPageSpecialTerms['Lead'] == undefined ? 'Lead' : resource.gPageSpecialTerms['Lead'];
            gConfigManager = resource.gPageSpecialTerms['Test Manager'] == undefined ? 'Test Manager' : resource.gPageSpecialTerms['Test Manager'];
            gConfigStakeholder = resource.gPageSpecialTerms['Stakeholders'] == undefined ? 'Stakeholders' : resource.gPageSpecialTerms['Stakeholders'];
            gConfigAttachments = resource.gPageSpecialTerms['Attachments'] == undefined ? 'Attachments' : resource.gPageSpecialTerms['Attachments'];
            gConfigGroup = resource.gPageSpecialTerms['Group'] == undefined ? 'Group' : resource.gPageSpecialTerms['Group'];
            gConfigPortfolio = resource.gPageSpecialTerms['Portfolio'] == undefined ? 'Portfolio' : resource.gPageSpecialTerms['Portfolio'];
            gConfigVersion = resource.gPageSpecialTerms['Version'] == undefined ? 'Version' : resource.gPageSpecialTerms['Version'];

        }

        //var query = "<Query></Query>";
        //var listname = jP.Lists.setSPObject(Main.getSiteUrl(),'Portfolio');	
        //var result = listname.getSPItemsWithQuery(query).Items;
        //if(result!=null && result!=undefined)
        //{
        //  if(result [0]["EnablePortfolio"] == "1")
        //    isPortfolioOn = true;
        //    gPortfolioID=result [0]["ID"];
        //}

        if (!isPortfolioOn) //if portfolio is disable
        {
            //Test Management-----> 
            $('#testMgnt').attr('title', 'Data inputting section where in required data to execute a UAT ' + gConfigTestPass + ' of your ' + gConfigProject.toLowerCase() + ' viz. ' +
                                  gConfigProject + ', ' + gConfigTestPass + ', ' + gConfigTester + 's, ' + gConfigTestCase + 's, ' + gConfigTestStep + 's and ' + gConfigAttachments + ' could be created.');

            //Stakeholder Dashboard----->
            $('#dashStak').attr('title', 'Stakeholder\'s dashboard to view ' + gConfigProject + ' ' + gConfigStatus.toLowerCase() + ' as per Group, ' +
                                  'Fiscal Year/Quarter or by selecting a Duration with date range.');

            //Query----->					    
            $('#qury').attr('title', 'Creates ' + gConfigQuery.toLowerCase() + ' to search for an entity based on ' + gConfigProject + ', ' + gConfigTestPass + ', ' + gConfigTestCase + ', ' + gConfigTestStep + ' or users ' +
                     '(like ' + gConfigProject + ' ' + gConfigLead + ', ' + gConfigManager + ', ' + gConfigStakeholder + ' and ' + gConfigTester + ') with a small hint ' +
                     'like id or partial text. And created ' + gConfigQuery.toLowerCase() + ' could be saved for future reference.');

            //Configuration----->
            $('#config').attr('title', gConfigManager + ' can provide information required to ' + gConfigTester + 's while executing UAT Test Scripts like Test Environment, ' +
                                     'Supporting documents for reference. ' + gConfigManager + ' (or ' + gConfigStakeholder + ' or ' + gConfigProject + ' ' + gConfigLead + ') can configure Application, ' +
                                     gConfigTestPass + ' level General settings. ' + gConfigTester + ' can view information required to execute UAT Test Scripts here.');

        }
        else {
            //Stakeholder Dashboard----->
            $('#dashStak').attr('title', 'Stakeholder\'s dashboard to view ' + gConfigProject + ' ' + gConfigStatus.toLowerCase() + ' as per ' + gConfigGroup + ', ' + gConfigPortfolio + ', ' +
                                   'Fiscal Year/Quarter or by selecting a Duration with date range.');
            //Test Management-----> 
            $('#testMgnt').attr('title', 'Data inputting section where in required data to execute a UAT ' + gConfigTestPass + ' of your ' + gConfigProject.toLowerCase() + ' viz. ' +
                                  gConfigGroup + ', ' + gConfigPortfolio + ', ' + gConfigProject + ', ' + gConfigVersion + ', ' + gConfigTestPass + ', ' + gConfigTester + 's, ' + gConfigTestCase + 's, ' + gConfigTestStep + 's and ' + gConfigAttachments + ' could be created.');

            //Query----->					    
            $('#qury').attr('title', 'Creates ' + gConfigQuery.toLowerCase() + ' to search for an entity based on ' + gConfigProject + ', ' + gConfigVersion + ', ' + gConfigTestPass + ', ' + gConfigTestCase + ', ' + gConfigTestStep + ' or users ' +
                      '(like ' + gConfigProject + ' ' + gConfigLead + ', ' + gConfigManager + ', ' + gConfigStakeholder + ' and ' + gConfigTester + ') with a small hint ' +
                              'like id or partial text. And created ' + gConfigQuery.toLowerCase() + ' could be saved for future reference.');

            //Configuration----->
            $('#config').attr('title', gConfigManager + ' can provide information required to ' + gConfigTester + 's while executing UAT Test Scripts like Test Environment, ' +
                    'Supporting documents for reference. ' + gConfigManager + ' (or ' + gConfigStakeholder + ' or ' + gConfigVersion + ' ' + gConfigLead + ') can configure Application, ' +
                    gConfigVersion + ' and ' + gConfigTestPass + ' level General settings. ' + gConfigTester + ' can view information required to execute UAT Test Scripts here.');

        }
        //Dashboard------>
        $('#dash').attr('title', gConfigStatus + ' of ' + gConfigProject + ' and ' + gConfigTestPass + ' as per Testing performed by ' +
                                'corresponding ' + gConfigTester + '. Summarized details of assigned ' + gConfigProject + ' ' +
                                'and ' + gConfigTestPass + '. Execute assigned Testing tasks/' + gConfigActivities.toLowerCase() + '.');


        //Report------>
        $('#rpt').attr('title', 'Tabular representation of ' + gConfigTestStep + 's showing its Testing ' + gConfigStatus + ' as per selection of ' + gConfigProject + 's, its ' +
                               gConfigTestPass + 'es, ' + gConfigTester + 's, and ' + gConfigStatus);



        //Feedback------> 
        $('#fee').attr('title', 'Shows the Remark/Comment/' + gConfigFeedback + ' provided by ' + gConfigTester + 's while executing the Test Scripts. ' +
                               gConfigFeedback + ' could be exported into an excel file format.');


        //Sync------>
        $('#sync').attr('title', 'Synchronization of UAT APP with TFS to import ' + gConfigTestCase + 's, ' + gConfigTestStep + 's and ' + gConfigAttachments + ' from TFS team Projects. ' +
                                'This feature is not a part of current UAT  APP Version.');




        //Triage------>
        $('#trig').attr('title', gConfigManager + ' can decide whether failed ' + gConfigTestStep + ' is bug or not, ' +
                                'if it\'s a bug then can log bug against it in SharePoint List.');

        $('.tTip').betterTooltip();//added by Mohini for increasing the delay time of hover over text
        /*End of Hover Over text*/

        //Added for Yammer and Lync integration
        $("#yammer").click(function () {
            var _url = Main.getSiteUrl();
            if (_url.indexOf("/Index") > 0) {
                _url = _url.substr(0, _url.indexOf("/Index"))
            }
            else if (_url.indexOf("/ProjectMgnt") > 0) {
                _url = _url.substr(0, _url.indexOf("/ProjectMgnt"))
            }
            var loc="";
            if(_url.split('/').length - 1 > 2)
                loc = _url.substr(0, _url.lastIndexOf('/')) + "/Yammer/Index";
            else
                loc = _url + "/Yammer/Index";
            window.open(loc, '_blank');
        });

        if (window.ActiveXObject) {
            try {
                nameCtrl = new ActiveXObject("Name.NameCtrl");
                if (!nameCtrl) {
                    return;
                }
                else {
                    /*UAT 3.0 (Traige)
                    nameCtrl.OnStatusChange =onStatusChange;
                    nameCtrl.GetStatus(sipUrl, "1");*/
                }

            }
            catch (ex) {
                Main.showPrerequisites("Prerequisite to display Lync status icon");
            }
        }
        function onStatusChange(name, status, id) {
            getLyncPresenceString(status);
        }
        function getLyncPresenceString(status) {
            var imgStr = '/images/spimn.png';
            var className = 'ms-spimn-presence-away-10x10x32';

            switch (status) {
                case 0:
                    className = 'ms-spimn-presence-online-10x10x32';
                    break;
                case 1:
                    className = 'ms-spimn-presence-offline-10x10x32';
                    break;
                case 2:
                    className = 'ms-spimn-presence-away-10x10x32';
                    break;
                case 3:
                    className = 'ms-spimn-presence-busy-10x10x32';
                    break;
                case 4:
                    className = 'ms-spimn-presence-away-10x10x32';
                    break;
                case 9:
                    className = 'ms-spimn-presence-donotdisturb-10x10x32';
                    break;
                default:
                    break;
            }

            $('#indicatorImg').html('<img id="StatusImg" style="max-width:none !important; cursor:pointer;" class="ms-spimn-img ' + className + '" alt="' + imgStr + '" src="' + imgStr + '" />');
        }

        $("span[title='Open Menu']").click(function () {
            $(".ms-core-menu-list li").eq(2).hide();
            $(".ms-core-menu-list li").eq(3).hide();
        });
        $("a[title='Open Menu']").click(function () {
            $(".ms-core-menu-list li").eq(2).hide();
            $(".ms-core-menu-list li").eq(3).hide();
        });
    },

    showAttachmentTab: function () {

        Main.deletecookie("AttachPageState");
        window.location.href = Main.getSiteUrl() + "/SitePages/attachment.aspx";
    },

    showTestStepTab: function () {

        Main.deletecookie("TestStepState");
        window.location.href = Main.getSiteUrl() + "/SitePages/teststep.aspx";
    },

    /*Getting current user*/
    getSiteUser: function () {
        var user = $().SPServices.SPGetCurrentUser();
        return user;
    },

    hideBodyloader: function () {
        document.getElementById("bodyloader").style.display = "none";
    },

    showLoading: function () {

        /* modified by shilpa on 2/4/2013 */
        if ($.blockUI != undefined) {
            $.blockUI({
                //message: '<img src="../../NewDesign/images/ajax-loader.gif" alt="Loading..." />',
                message: '<div style="font-size:12pt;font-weight:400;color:white;"> Please wait.... </div>',
                fadeIn: 0,
                css: {
                    border: '1px solid black', //border: '1px solid #fbb600',
                    padding: '5px 10px 20px 10px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    'border-top-left-radius': '10px',
                    'border-top-right-radius': '10px',
                    'border-bottom-right-radius': '10px',
                    'border-bottom-left-radius': '10px',
                    opacity: .5,
                    color: '#fff',
                    width: '120px',
                    height: '8px',
                    top: ($(window).height() - 40) / 2 + 'px',
                    left: ($(window).width() - 40) / 2 + 'px'
                }
            });
        }


    },
    hideLoading: function () {
        //$('#bodyloader').css('display','none');
        if ($.unblockUI != undefined) {
            setTimeout($.unblockUI, 2000);
        }

        //$.unblockUI();


    },
    getSiteUserEmail: function () {
        var eMail = $().SPServices.SPGetCurrentUser({ fieldName: "EMail", debug: false });
        return eMail;
    },
    getCurrentSystmDt: function () {
        var systemDate = new Date();
        var dd = systemDate.getDate();
        var mm = systemDate.getMonth() + 1;
        if (mm < 10)
            mm = "0" + mm;
        if (dd < 10)
            dd = "0" + dd;
        var yy = systemDate.getFullYear();

        var date = mm + "/" + dd + "/" + yy;
        return date;
    },

    /*Function for linking all the tabs*/
    changeTabURL: function (selId) {
        if (selId != null || selId != undefined) {
            var urlPart = Main.getSiteUrl();


            $('.t1').attr('href', urlPart + "/SitePages/ProjectMgnt.aspx?pid=" + selId);
            $('.t2').attr('href', urlPart + "/SitePages/TestPassMgnt.aspx?pid=" + selId);
            $('.t3').attr('href', urlPart + "/SitePages/testcase.aspx?pid=" + selId);
            $('.t4').attr('href', urlPart + "/SitePages/TestStep.aspx?pid=" + selId);
            $('.t5').attr('href', urlPart + "/SitePages/attachment.aspx?pid=" + selId);
            //$('.t5').attr('href',"../../SitePages/attachment.aspx?source=http://rgenindia018:7001/SitePages/attachment.aspx?pid="+selId);

            $('.t6').attr('href', urlPart + "/SitePages/testerMgnt.aspx?pid=" + selId);
        }
    },

    filterData: function (info2) {

        info2.replace(/<(.|\n)*?>/ig, '');
        return info2;
    },

    setCookie: function (c_name, value, exdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    },

    getCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    },

    deletecookie: function (cookie_name) {
        var cookie_date = new Date();  // current date & time
        cookie_date.setTime(cookie_date.getTime() - 1);
        document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
    },
    encodeHtmlData: function (info2) {

        info2 = info2.replace(/</g, '&lt\;').replace(/>/g, '&gt\;');

        return info2;

    },

    //Modified By Anil On 27/02/20112
    preventBackspace: function (e) {
        var evt = e || window.event;
        if (evt) {
            var keyCode = evt.charCode || evt.keyCode;
            if (keyCode === 8) {
                if (evt.preventDefault) {
                    evt.preventDefault();
                }
                else {
                    evt.returnValue = false;
                }
            }
        }
    },
    checkAlphanumeric: function (str) {
        var strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._ ";
        for (i = 0; i < str.length; i++) {
            strChar = str.charAt(i);
            if (strValidChars.indexOf(strChar) == -1)
                return false;
        }
        return true;
    },
    getQuerystring: function (key, default_) {

        if (default_ == null) default_ = "";
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null)
            return default_;
        else
            return qs[1];
    },
    setBanner:function()
    {
        var _url = window.location.href;
        if (_url.indexOf("/Index") > 0) {
            _url = _url.substr(0, _url.indexOf("/Index"))
        }
  

        var a = _url.lastIndexOf('/');
        //var b = url.lastIndexOf('.');
        var pageName = _url.substring(a + 1).toLowerCase();

        if(isRootWeb)
        {
            switch(pageName)
            {
                case "dashboard":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-dashboard.jpg" complete="complete"/>');
                    break;
                case "stakeholderdashboard": $(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-dashboard.jpg" complete="complete"/>');
                    break;
               /* case "report":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-dashboard.jpg" complete="complete"/>');
                    break;*/
       
                case "analysis":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Analysis.jpg" complete="complete"/>');
                    break;
                case "attachment":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Attachments.jpg" complete="complete"/>');
                    break;
                case "configuration":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Configuration.jpg" complete="complete"/>');
                    break;
                case "feedback":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Feedback.jpg" complete="complete"/>');
                    break;
                case "projectmgnt":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-projects.jpg" complete="complete"/>');
                    break;
                case "query":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-query.jpg" complete="complete"/>');
                    break;
                case "report":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-reports.jpg" complete="complete"/>');
                    break;
                case "testcase":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testcases.jpg" complete="complete"/>');
                    break;
                case "tester":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testers.jpg" complete="complete"/>');
                    break;
                case "tester":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testing.jpg" complete="complete"/>');
                    break;
                case "testpass":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testpasses.jpg" complete="complete"/>');
                    break;
                case "teststep":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-TestSteps.jpg" complete="complete"/>');
                    break;
                case "triage":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-triage.jpg" complete="complete"/>');
                    break;
                case "yammer":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner_yammer.jpg" complete="complete"/>');
                    break;
                default: $(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Blank.jpg" complete="complete"/>');
                    break;    
            }
        }
        else
        {
            switch(pageName)
            {
                case "dashboard":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-dashboard.jpg" complete="complete"/>');
                    break;
                case "stakeholderdashboard": $(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src=" /images/theme/banner-dashboard.jpg" complete="complete"/>');
                    break;
                case "report":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-dashboard.jpg" complete="complete"/>');
                    break;
       
                case "analysis":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Analysis.jpg" complete="complete"/>');
                    break;
                case "attachment":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Attachments.jpg" complete="complete"/>');
                    break;
                case "configuration":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Configuration.jpg" complete="complete"/>');
                    break;
                case "feedback":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Feedback.jpg" complete="complete"/>');
                    break;
                case "projectmgnt": $(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-projects.jpg" complete="complete"/>');
                    break;
                case "query":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-query.jpg" complete="complete"/>');
                    break;
                case "report":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-reports.jpg" complete="complete"/>');
                    break;
                case "testcase":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testcases.jpg" complete="complete"/>');
                    break;
                case "tester":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testers.jpg" complete="complete"/>');
                    break;
                case "tester":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testing.jpg" complete="complete"/>');
                    break;
                case "testpass":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Testpasses.jpg" complete="complete"/>');
                    break;
                case "teststep":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-TestSteps.jpg" complete="complete"/>');
                    break;
                case "triage":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-triage.jpg" complete="complete"/>');
                    break;
                case "yammer":$(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner_yammer.jpg" complete="complete"/>');
                    break;
                default: $(".adv").html('<img style="width:1024px" alt="Customized banner goes here" src="/images/theme/banner-Blank.jpg" complete="complete"/>');
                    break;
                     
            }
        }
        //if(window.location.href.toLowerCase().indexOf('unus') != -1) /* Added for unus subsite */
        {
              
            $(".logo").css('float','left');
            $(".adv img").css('width','1005px');
            $('.adv').css('border','none');
        }
        if(Main.getSiteUrl().indexOf('msvoice') != -1) /* Added for msvoice subsite */
        {
            $(".logo").empty().html('<img src="~/images/CEMSolutions_logo.jpg" alt="logo" style="width:150px;height:100px;padding-left:30px"/>');       
            $(".logo").css('float','left');
            $(".adv").html('<img width="1015px" alt="Customized banner goes here" src="~/images/CEM 2.jpg" complete="complete"/>');
            $('.adv').css('border','none');
        }
    }
,

    /* function added by shilpa */
    showPrerequisites: function (pre) {
        if (pre == undefined || pre == "") {
            pre = 'Prerequesites for Active-X';
        }
        if (window.navigator.appName == "Microsoft Internet Explorer") {
            try {
                var Activeobj = new ActiveXObject("WScript.shell");
            }
            catch (e) {
            }
            if (Activeobj == undefined) {
                $('#activeX-form').dialog({
                    height: 320,
                    width: 600,
                    modal: true,
                    title: pre,
                    resizable: false,
                    position: [500, 300],
                    open: function () {
                        $(".ui-dialog-titlebar-close").show();
                        /*added by mohini for to made the pop up hidden division DT:12-06-2014*/
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
    },

    getSPUserIDByName: function (loginName) {

        jQuery.support.cors = true;

        //constructing the call to a user profile using web services
        var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
           + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
             + '<soap:Body>'
               + '<GetUserInfo xmlns="http://schemas.microsoft.com/sharepoint/soap/directory/">'
                 + '<userLoginName>' + loginName + '</userLoginName>'
               + '</GetUserInfo>'
             + '</soap:Body>'
           + '</soap:Envelope>';
        //making a call with jQuery
        $.ajax
        ({
            url: _spPageContextInfo.webServerRelativeUrl + '/_vti_bin/usergroup.asmx',
            type: "POST",
            dataType: "xml",
            async: false,
            data: soapMessage,
            complete: displayProfileProperty,
            contentType: "text/xml; charset=\"utf-8\""
        });


        function displayProfileProperty(xmlHttpRequest, status) {
            if (status == 'error') {
                if ($(xmlHttpRequest.responseXML).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseXML).find('errorstring')[0].text == "User cannot be found.") {

                }
            }
            else {
                GlobalSPUserID = $($(xmlHttpRequest.responseXML).find('User')[0]).attr('ID');

            }
        }
        return GlobalSPUserID;

    },
    SearchPrincipalType: function (searchText) {

        var maxResults = 100;
        var pType = "All";
        var principalType = '';
        var soapMessage = "<?xml version=\"1.0\"?>"
                + "<soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" "
                + "    xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" "
                + "    xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">"
                + "<soap:Body>"
                + "    <SearchPrincipals "
                + "      xmlns=\"http://schemas.microsoft.com/sharepoint/soap/\">"
                + "      <searchText>" + searchText + "</searchText>"
                + "      <maxResults>" + maxResults + "</maxResults>"
                + "      <principalType>" + pType + "</principalType>"
                + "    </SearchPrincipals>"
                + "  </soap:Body>"
                + "</soap:Envelope>";


        var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        + '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
          + '<soap:Body>'
            + '<SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">'
              + '<searchText>' + searchText + '</searchText>'
              + '<maxResults>100</maxResults>'
              + '<principalType>All</principalType>'
            + '</SearchPrincipals>'
          + '</soap:Body>'
        + '</soap:Envelope>';

        var soapMessage = '<?xml version="1.0" encoding="utf-8"?>'
        + '<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'
          + '<soap12:Body>'
            + '<SearchPrincipals xmlns="http://schemas.microsoft.com/sharepoint/soap/">'
              + '<searchText>' + searchText + '</searchText>'
              + '<maxResults>100</maxResults>'
              + '<principalType>All</principalType>'
            + '</SearchPrincipals>'
          + '</soap12:Body>'
        + '</soap12:Envelope>';

        $.ajax
        ({
            url: _spPageContextInfo.webServerRelativeUrl + '/_vti_bin/People.asmx',
            type: "POST",
            dataType: "xml",
            async: false,
            data: soapMessage,
            complete: displayPeopleProperty,
            contentType: "text/xml; charset=\"utf-8\""
        });

        function displayPeopleProperty(xmlHttpRequest, status) {
            if (status == 'error') {
                if ($(xmlHttpRequest.responseXML).find('errorcode')[0].text == '0x80131600' && $(xmlHttpRequest.responseXML).find('errorstring')[0].text == "User cannot be found.") {

                }
            }
            else {
                principalType = $(xmlHttpRequest.responseXML).find("PrincipalType")[0].text;
            }
        }

        return principalType;

    },
    AutoHideAlertBox: function (msg) {
        $("#autoHideAlert").text(msg);

        var dialogBox = $('#autoHideAlert').dialog({ height: 100, modal: true });

        $("#autoHideAlert").prev().find('a').hide();

        setTimeout(function () {
            dialogBox.dialog("close");
        }, 2000);
    },


}
