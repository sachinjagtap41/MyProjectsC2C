"use strict"          
var UserRegistration =
    {

              
          
        Checkpass: function () {
            var password = $("#Password").val();
            var confirmPassword = $("#ConfirmPassword").val();
            if (password != null && confirmPassword != null && password != "" && confirmPassword != "") {
                if (password != confirmPassword) {         
                    $(".Cpass").html("Passwords do not match..!");
                    return false;
                }
            }
            return true;
        },
              
        _collectformValues: function (_container) {
            if (_container != null && _container != undefined && _container.length > 0) {
                var FirstName = $('#' + _container[0] + '');
                var LastName = $('#' + _container[1] + '');
                var Email = $('#' + _container[2] + '');
                var Password = $('#' + _container[3] + '');
                var ConfirmPassword = $('#' + _container[4] + '');
                var DOB = $('#' + _container[5] + '');
                //var Gender = $('#' + _container[6] + ' input[type=radio]:checked');     
                var Gender = $('input[name=opGender]:checked', '#Gender').val()
                var MobileNo = $('#' + _container[7] + '');
                var Country = $('#' + _container[8] + ' option:selected');




                var data = {
                    'FirstName': FirstName.val(),
                    'LastName': LastName.val(),
                    'Email': Email.val(),
                    'Password': Password.val(),
                    'ConfirmPassword': ConfirmPassword.val(),
                    'DOB': DOB.val(),
                    'Gender': Gender,
                    'MobileNo': MobileNo.val(),
                    'Country': Country.text()

                };




                // return UserRegistration.Checkpass();
                var Passresult = UserRegistration.Checkpass();
                if (Passresult==true)
                {
                   
                    var result = ServiceLayer.InsertUserData("InsertRegisterUser", data, "UserRegistration");
                    if (result != '') {
                        if (result.Success == "Done") {
                            var glblvalOfEmail = result.Email;

                            func.resetFormFeilds('form-horizontal');
                            $("#lbl_alert").html("Registration successful..!!");
                            setTimeout("location.href = 'Login';", 2500);
                         
                            // eval(func.redirect('Login'));
                            //$("#autoHideAlert").html("Registration successful..!!").hide();
                            //$('#autoHideAlert').dialog({
                            //    height: 150, modal: true, buttons: {
                            //        "Ok":
                            //            function () {
                            //                eval(func.redirect('Login'));
                            //                $(this).dialog("close");

                            //            }
                            //    }
                            //});

                        }
                        else
                            $("#lbl_alert").html('Sorry..!This Email is already registered..!');
                            //func.alertBox('Sorry!This Email is already registered.');
                    }
                }
                else
                {
                    if (Passresult==false)
                    {
                        $(".Cpass").html("Passwords do not match..!");
                        return false;
                    }
                }
                // else

                //     $("#lbl_alert").html('Sorry..! Something went wrong, please try again..!');
                //       // func.alertBox('Sorry! Something went wrong, please try again!'); 

                //}
            }
            }
        }


    