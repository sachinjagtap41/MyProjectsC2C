"use strict"
var _companydetails =
    {
       
        _collectformValues: function (_container, SaveMsg) {
            if (_container != null && _container != undefined && _container.length > 0) {
                var fname = $('#' + _container[0] + '');
                var Lname = $('#' + _container[1] + '');
                var Email = $('#' + _container[2] + '');
                var Contact = $('#' + _container[3] + '');
                var CompanyName = $('#' + _container[4] + '');
                var CompanyUrl = $('#' + _container[5] + '');
                var Address = $('#' + _container[6] + '');
                var Country = $('#' + _container[7] + ' option:selected');
                var State = $('#' + _container[8] + ' option:selected');
                var Pwd = $('#' + _container[9] + '');
                var TxtmobileNo = $('#' + _container[10] + '');
                var SpanSaveMsg = "";
                if (SaveMsg != undefined) {
                    SpanSaveMsg = $('.' + SaveMsg + '');
                }
                var tempData;
                if ($('#chkTempData').is(":checked") == true) {
                    tempData = "true";
                }
                else
                    tempData = "false";
                
                var values = {
                    'FirstName': fname.val(),
                    'LastName': Lname.val(),
                    'sClient_Name': CompanyName.val(),
                    'sClient_Address': Address.val(),
                    'sClient_State': State.text(),
                    'sClient_Country': Country.text(),
                    'sClient_ContactNo': Contact.val(),
                    'sClient_Url': CompanyUrl.val(),
                    'sClient_AdminEmailID': Email.val(),
                    'sClientType': "R",
                    'Password': Pwd.val(),
                    'Mobile_Number': TxtmobileNo.val(),
                    'sClientApp_url': _container[11],
                    'chkTempData': tempData
                };


                var _insert = ServiceLayer.InsertUpdateData('SaveCompanyDetails', values, 'CompanyReg');
                if (_insert == 'Insert Successfully..!!!') {
                    func.resetFormFeilds('form-horizontal');
                    //var msg = "<br/>";
                    //$("#autoHideAlert").html("Congragulations Company Create Successfully..!! <br/>  Please add more users for better UAT..!!");
                    //$('#autoHideAlert').dialog({
                    //    height: 150, modal: true, buttons: {
                    //        "Ok":
                    //            function () {
                    //                eval(_companydetails._RedirectToLogin('UserRegistration'));
                    //                $(this).dialog("close");

                    //            }
                    //    }
                    //});
                    if (SpanSaveMsg != "") {
                      _companydetails.ShowLoader();
                       /* $('html,body').scrollTop(0);
                        SpanSaveMsg.text("Congragulations Company Create Successfully..Please add more users for better UAT..!!")*/
                    }
                    setTimeout(function () {
                        func.redirect('Login');
                    }, 2000)
                }
                else {
                    //func.AutoHideAlertBox(_insert);
                    if (SpanSaveMsg != "") {
                        $('html,body').scrollTop(0);
                        SpanSaveMsg.text(_insert)
                    }
                }


            }
        },
        _RedirectToLogin: function (url) {
            func.redirect(url)
        },
          ShowLoader: function () {
            $.blockUI({
                message: '<div style="font-size:24pt;font-weight:400;color:white;background-color:rgb(0,102,179);padding-top:8px;padding-bottom:8px;">Congratulations! Company Registered Successfully..!!</div>',
                fadeIn: 0,
                css: {
                   
                    width: '100%',
                    top: '42%',
                    left:'0%',
                    opacity: .5,
                }
            });
        }

    }