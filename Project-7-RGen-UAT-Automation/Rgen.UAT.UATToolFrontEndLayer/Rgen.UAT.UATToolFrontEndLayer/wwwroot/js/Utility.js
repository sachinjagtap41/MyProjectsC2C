// Write your Javascript code.
/*
Name: Utility.js
Created: 11-Oct-2016
Author: Atul Sirsode
Description: Custom logic for Global validations functions
*/


var func =
    {
        IE_keydown: function () {
            var t = event.srcElement.type;
            var kc = event.keyCode;
            if (kc == 13)
                return func.FunKeyDown(event, event.srcElement);
            return ((kc != 8) || (t == 'text') || (t == 'textarea') || (t == 'submit') || (t == 'password'))
        },
        Other_keypress: function (e) {
            var t = e.target.type;
            var kc = e.keyCode;
            if (kc == 13) {
                return func.FunKeyDown(e, e.target);
            }
            if ((kc != 8) || (t == 'text') ||
                    (t == 'textarea') || (t == 'submit') || (t == 'password'))
                return true
            else {
                MessageBox('Sorry Backspace/Enter is not allowed here'); // Demo code
                return false
            }
        },
        FunKeyDown: function (event, obj) {
            var code = (event.which) ? event.which : event.keyCode;
            var character = String.fromCharCode(code);
            var objid = null;
            var elem1 = null;
            if (obj.tagName == "TEXTAREA") { return true; }
            if (obj.tagName == "SPAN") { objid = obj.childNodes[0].id; } else { objid = obj.id; }
            if (obj.type == 'submit') { return true; }
            if (obj.type == 'image') { return true; }
            if (code == 13) {
                var findit = false
                var elem = document.all;
                for (var i = 0; i < elem.length; i++) {
                    elem1 = elem[i];
                    if ((elem1.type != "hidden") && (elem1.style.display != "none")) {
                        if (findit) {
                            if ((elem1.tagName == "TEXTAREA" || elem1.tagName == "INPUT" || elem1.tagName == "SELECT")) {
                                if (!elem1.isDisabled) {
                                    if (elem1.tagName != "SELECT") {
                                        if (elem1.readOnly == false) {
                                            if (!elem1.disabled) {
                                                elem1.focus(); break;
                                            }
                                        }
                                    } else {
                                        if (!elem1.disabled) {
                                            elem1.focus(); break;
                                        }
                                    }
                                }
                                else {
                                    if (elem1.isDisabled == false) {
                                        elem1.focus(); break;
                                    }
                                }
                            }
                        }
                        if (elem1.id == objid) {
                            findit = true;
                        }
                    }
                }
                return false;
            }
            else {
                return true;
            }
        },
        chkAlphaNumeric: function (e, obj) {
            var key;
            if (e.keyCode) key = e.keyCode;
            else if (e.which) key = e.which;
            if (/[^A-Za-z0-9_]/.test(String.fromCharCode(key)))
                return false;
            else
                return true;
        },

        chkAlphabet: function (e, obj) {
            var key;
            if (e.keyCode) key = e.keyCode;
            else if (e.which) key = e.which;
            if (/[^A-Za-z]/.test(String.fromCharCode(key)))
                return false;
            else
                return true;
        },

        chkNumber: function (e, obj) {
            var chrCode = (e.which) ? e.which : event.keyCode
            return (chrCode > 47 && chrCode < 58)
                     ? true : false;
        },
        alertBox: function (message) {
            $("#autoHideAlert").text(message);
            $('#autoHideAlert').dialog({ height: 150, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
        },
        AutoHideAlertBox: function (msg) {
            $("#DivHideAlert").text(msg);

            var dialogBox = $('#DivHideAlert').dialog({ height: 150, modal: true });

            setTimeout(function () {
                dialogBox.dialog("close");
            }, 1000);
        },
        validateEmailAddress: function (obj) {
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!emailRegExp.test(obj.value)) {
                func.alertBox("Please enter valid Email Address");

                return false;
            }
        },

        CheckEmail: function (obj, msgSpan) {
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var msgSpan = $('.' + msgSpan + '');
            if (!emailRegExp.test(obj.value)) {
                msgSpan.text("Please enter valid Email Address");
                $(obj).focus();
                return false;
            }
            else {
                msgSpan.text(" ");
            }
        },
        resetFormFeilds: function (_container) {
            if (_container != undefined && _container.length > 0) {
                {
                    $('.' + _container + '').each(function (ind, item) {
                        var txtbox = $(item).find('input[type=text]');
                        txtbox.val('');
                        var txtarea = $(item).find('textarea');
                        txtarea.val('');
                        var select = $(item).find('select');
                        select.val(0);
                        var pwd = $(item).find('input[type=password]');
                        pwd.val('');
                        $('#OptCountry').trigger('change');
                    })
                }
            }
            return false;
        },
        redirectAfterAlertOk: function (msg, FuncName) {
            $("#autoHideAlert").text(message);
            $('#autoHideAlert').dialog({
                height: 150, modal: true, buttons: {
                    "Ok":
                        function () {
                            eval(FuncName);
                            $(this).dialog("close");

                        }
                }
            });
        },
        redirect: function (url) {
            window.location.href = url;

        },
        redictFailed: function () {
            window.location.href = ServiceLayer.appurl;
            func.removeSession();
        },
        validateControls: function (_container, className) {
            var isvalidated = true;
            var controls = $('.' + _container + ' input[class*=' + className + ']');
            if (controls != undefined && controls.length > 0) {
                controls.each(function (ind, item) {

                    var _txtbox = $(item).val().trim();
                    var _label = $(item).parent().parent().find('label[class*=control-label]').text().replace('*', '').trim();
                    var _msgbox = $(item).parent().parent().find('span[class*=msgSpan]');
                    if (_txtbox == "") {
                        isvalidated = false;
                        _msgbox.text('');
                        _msgbox.text("Please Provide " + _label + "..!!");
                    }
                    else {
                        _msgbox.text('');
                    }
                    $(item).keypress(function () {
                        _msgbox.text('');
                    });
                })
            }
            return isvalidated;
        },
        fillDropdown: function (_parameter) {
            var param = "Type=" + _parameter.Type.toString() + "&_Param=" + _parameter.countryId;
            var url = ServiceLayer.serviceURL + "/CompanyReg/FillDropdown?" + param;

            try {
                var req = new XMLHttpRequest();
                var _data = [];
                req.onreadystatechange = function () {
                    if (req.readyState == 4) {

                        var resp = req.responseText;

                        if (resp != "" && resp != null && resp != "value") {
                            _data = JSON.parse(resp);
                        }
                    }
                }

                req.open("GET", url, false);
                req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                req.setRequestHeader("appurl", ServiceLayer.appurl);
                req.send();
                if (_data != undefined && _data.length > 0) {
                    if (_parameter.DropdownId != undefined && _parameter.DropdownId != null) {
                        var dropdown = $('#' + _parameter.DropdownId + '');
                        var _option = "";
                        var Len = _data.length;
                        for (var i = 0; i < Len; i++) {
                            _option += "<option value=" + _data[i].id + ">" + _data[i].value + "</option>"
                        }

                        dropdown.html('');
                        dropdown.append(_option);
                    }
                }
            } catch (e) {
                func.NetworkErrorMsg(e);
            }


        },
        NetworkErrorMsg: function (msg) {
            if (msg.message == "NetworkError") {
                func.AutoHideAlertBox("Please run the Service Layer..!!");
            }

        },
        onSaveClick: function (_control, className) {
            var _status;
            var _valid = func.validateControls(_control, className);
            if (_valid) {

                _status = true;
            }
            else {
                _status = false;
            }
            return _status;
        },
        GetData: function (methodName, parameter, ControllerName) {
            var controller = (ControllerName != undefined && ControllerName != '') ? ControllerName : "";
            var resultCollection = new Array();
            try {
                //[!] changes in Passing paramater by Atul


                if (methodName == "UserLogin") {
                    var URL = ServiceLayer.serviceURL + "/" + controller + "/" + methodName + "?" + parameter + "&" + $.now();
                }




                var req = new XMLHttpRequest();

                req.onreadystatechange = function () {
                    if (req.readyState == 4) {

                        // Request successful, read the response
                        var resp = req.responseText;

                        if (resp != "" && resp != null)
                            resultCollection = JSON.parse(resp);



                    }
                }

                req.open("GET", URL, false);

                req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                req.setRequestHeader("appurl", ServiceLayer.appurl);
                req.setRequestHeader("Cache-Control", "no-cache");
                req.send();

            }
            catch (e)
            { }

            return resultCollection;
        },
        SetSpUserId: function (id) {
            if (id != "" && id != undefined) {
                return sessionStorage.setItem('SpUserId', id);
            }
        },
        GetSPUserId: function () {
            return sessionStorage.getItem('SpUserId');
        },
        createCookie: function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";
            document.cookie = name + "=" + value + expires + "";
        },

        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        ,
        _checkIfUserLoginorNot: function () {
            var isValidUser = true;
            if (sessionStorage.getItem('SpUserId') == null) {
                isValidUser = false;
            }
            return isValidUser;
        },
        removeSession: function () {
            sessionStorage.removeItem('SpUserId');
            sessionStorage.clear();
        },
        showLoading: function () {
            if ($.blockUI != undefined) {
                $.blockUI({
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
            if ($.unblockUI != undefined) {
                setTimeout($.unblockUI, 2000);
            }

        },

        CheckPassword: function (obj1,obj2, cpass) {
                var password = $('#'+obj2+'').val();
            var confirmPassword = obj1.value
            var msgSpan = $('.' + cpass + '');
            if (confirmPassword.match(password))
            {
                msgSpan.text(" ");
               
            }
            else
            { 
                msgSpan.text('Passwords do not match..!')
               
                return false;
            }
        }

    
    }