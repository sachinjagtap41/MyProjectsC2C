// Write your Javascript code.
/*
Name: site.js
Created: 6-Oct-2016
Author: Atul Sirsode
Description: JS file for Autocomple Textbox for Users and People Picker
*/

//[!] Code for AutoComplete Textbox

var GlobalUsersArray = [];
var DicKeyValArrayforUser = [];
var url = ServiceLayer.serviceURL + '/Dashboard/GetUsers'
var Appurl = ServiceLayer.serviceURL + '/Dashboard/GetUsers?AppUrl=' + window.location.href
var AutoCompleteTextbox =
    {
        GetDataForUsers: function () {
            var data = AutoCompleteTextbox.GetData(ServiceLayer.serviceURL + '/Dashboard/GetUsers?AppUrl=' + window.location.href);
            if (data != undefined && data.length > 0) {
                GlobalUsersArray = data;

                if (GlobalUsersArray.length > 0 && GlobalUsersArray != undefined) {
                    var Len = GlobalUsersArray.length;
                    for (i = 0; i < Len; i++) {
                        DicKeyValArrayforUser[GlobalUsersArray[i].UserId] = [];
                        DicKeyValArrayforUser[GlobalUsersArray[i].UserId].push(GlobalUsersArray[i].UserId);
                        DicKeyValArrayforUser[GlobalUsersArray[i].UserId].push(GlobalUsersArray[i].UserName);
                        DicKeyValArrayforUser[GlobalUsersArray[i].UserId].push(GlobalUsersArray[i].Email);
                    }
                }
            }
        },
        GetData: function (URL) {
            var req = new XMLHttpRequest();
            var resultCollection;
            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    // Request successful, read the response
                    var resp = req.responseText;

                    if (resp != "" && resp != null && resp != "value")
                        resultCollection = JSON.parse(resp);
                }
            }

            req.open("GET", URL, false);
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            req.send();

            return resultCollection;
        },
        leftNavClick: function (Controller, pageName) {
            var redirect = '';
            if (pageName == "ProjectMgnt") {
                redirect = '/' + Controller + '/' + pageName + '?pid=' + show.projectId;
            }
            else {
                redirect = '/' + Controller + '/' + pageName + '?pid=' + show.projectId + '&tpid=' + show.testPassId;
            }
            window.location.href = redirect;
        },
        downloadAttachment: function (Controller, param) {
            var url = ServiceLayer.serviceURL + '/' + Controller + '/' + param + '&' + ServiceLayer.appurl;
            window.open(url, "_blank");
        },
        _testingPgattchmentdownload: function (param) {
            var url = ServiceLayer.serviceURL + '/TestingPg/GetAttachmentFile' + '?id=' + param + '&_Appurl=' + ServiceLayer.appurl;
            window.open(url, "_blank");
                                },
        _testpassAttachmentForEmail: function (_attdId) {
            var url = ServiceLayer.serviceURL + '/TestPass/GetAttachmentFile?id=' + _attdId + '&appurl=' + ServiceLayer.appurl;
            var req = new XMLHttpRequest();
            var resultCollection;
            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    // Request successful, read the response
                    var resp = req.responseText;

                    if (resp != "" && resp != null && resp != "value")
                        resultCollection = resp;
                }
            }

            req.open("GET", url, false);
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            req.send();

            return resultCollection;
        },

    }



var testArr;

$(function () {

    var txtId = $('#AutoText');
    if (document.readyState == 'interactive') {

        if (func._checkIfUserLoginorNot()) {
            AutoCompleteTextbox.GetDataForUsers();
        }
    }


});




function CallAuto(TxtId, HdnFldId, ToolTip, HdnOrignalTxt) {



    var TxtBox = $('#' + TxtId + '');
    var HdnFld = $('#' + HdnFldId + '');
    var tooltip;
    if (ToolTip != undefined) {
        tooltip = $('#' + ToolTip + '');
    }
    var OrignalTxt = '';
    if (HdnOrignalTxt != undefined) {
        OrignalTxt = $('#' + HdnOrignalTxt + '');
    }
    var ProcessArray = [];
    ProcessArray = GlobalUsersArray;
    TxtBox.keyup(function () { addEvent();});

    TxtBox.autocomplete({

        source: function (request, response) {
            if (tooltip != undefined)
            { tooltip.hide();}
            var _filterArray = []; var blankArray = [];
            if (request.term != '') {
                var inputTxt = request.term.replace(' ', '');

                GlobalUsersArray.forEach(function (item, index) {
                    var ValuefromArray = item.UserName;
                    ValuefromArray = ValuefromArray.replace(" ", "").toLowerCase().trim();
                    if (ValuefromArray.indexOf(inputTxt.toLowerCase().trim()) > 0 || ValuefromArray.startsWith(inputTxt.toLowerCase().trim())) {

                        _filterArray.push(item);
                    }
                });
            }
           
            if (_filterArray.length > 0) {
                ProcessArray = _filterArray;
            }
            else {
                ProcessArray = blankArray;
                if (tooltip != undefined && request.term.trim() != '') {
                    tooltip.show();

                }
            }
            response($.map(ProcessArray, function (value, key) {
                return {
                    label: value.UserName,
                    value: value.UserId + '|' + value.Email
                }
            }));

        },
        focus: function (event, ui) {
            TxtBox.val(ui.item.label);
            return false;
        },

        select: function (event, ui) {
            HdnFld.val('');
            HdnFld.val(ui.item.label + '|' + ui.item.value);
            if (OrignalTxt!=undefined) {
                OrignalTxt.val('');
                OrignalTxt.val(ui.item.label)
            }
           
            return false;
        }
    })

    TxtBox.keypress(function (evt) {
        if (tooltip != undefined) {
            tooltip.hide();
        }
        if (evt != undefined) {
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32) || (charCode == 8)) {
                return true;
            }
            else {
                return false;
            }
        }
    });

    TxtBox.unbind('mouseup');
    TxtBox.bind("mouseup", function (e) {
        var $input = $(this),
            oldValue = $input.val();

        if (oldValue == "") return;
        setTimeout(function () {
            var newValue = $input.val();

            if (newValue == "") {
                HdnFld.val('');
                if (tooltip != undefined) {
                    tooltip.hide();
                }
                $input.trigger("cleared");
                return;

            }
        }, 1);
    });

    
    function addEvent() {

        if (tooltip != undefined) {
            tooltip.hide();
        }

      
    }
}




function split(val) {
    return val.split(/,s*/);
}

function extractLast(term) {
    return split(term).pop();
}



function MultipleStakeholder() {

    var Modal = $('#popup');
    Modal.draggable();
    $.blockUI({ message: Modal });
    $(document).unbind('contextmenu');
    $(document).bind('contextmenu', function (e) { e.preventDefault(); })
    $('.blockUI.blockMsg.blockPage').removeAttr('style');
    $('.blockUI.blockMsg.blockPage').css({'position': 'fixed' });
    $('.blockUI.blockOverlay').css({ 'background-color': '', 'cursor': 'default' })
   // addListeners();
    Modal.find('input[id*=txtFindBox]').focus();
    $('#txtFindBox').val('');
    _checkedItemsIds = []; _addCheckItems = [];
    MultipleStakeHolderItem.addAllItems(GlobalUsersArray);
    MultipleStakeHolderItem.bindCheckboxEvnt();
    $('#btnAddModel').unbind('click');
    $('#btnAddModel').click(function () {
        MultipleStakeHolderItem.AddItemInTxtBox();
    });
    MultipleStakeHolderItem.bindSearchNCbtnEvnt();
    HdnModalValue.val('');
    $('#DivmodalInputBox').html('');
    $('#DivmodalInputBox').keypress(function () { return false; })
    $('#DivmodalInputBox').unbind('paste');
    $('#DivmodalInputBox').bind('paste', function () { return false });
    _disableKeypressatDiv();
    MultipleStakeHolderItem._bindEventToOkButton('VersionStakeholder', 'HdnVersionStakeHolder');
    $('#btnOkModal').attr('disabled', false);
    $('#btnAddModel').attr('disabled', false);
}


/*Add  Dragabble Event*/
function addListeners() {
    document.getElementById('popup').addEventListener('mousedown', mouseDown, false);
    window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
    var div = document.getElementById('popup');
    div.style.position = 'absolute';
    div.style.top = (e.clientY-25) + 'px';
    div.style.left = (e.clientX - 250) + 'px';

}
/*END*/

$(function myfunction() {
    $('.js-modal-close , #btnCancelModal').click(function () {
        if ($.unblockUI != undefined) {
            setTimeout($.unblockUI, 500);
        }
        $('#popup').hide();
    });
    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            $('.js-modal-close , #btnCancelModal').click();
        }
    }
    $('#popup').unbind('mouseenter mousedown');
    $('#popup').bind('mouseenter mousedown', function () {
        $('.blockUI.blockMsg.blockPage').removeAttr('style');
        $('.blockUI.blockMsg.blockPage').css({ 'z-index': '1002', 'position': 'fixed' });
    });
    $('#btnOkModal').mouseenter(function () {
        $('.blockUI.blockMsg.blockPage').removeAttr('style');
    })
});

var _divModal = $('#DivmodalInputBox');
var HdnModalValue = $('#popup #HdnModalvalue')
var _checkedItemsIds = []; var _addCheckItems = [];
var MultipleStakeHolderItem =
    {
        addItemsToStakeholderPopUp: function () {

        },
        addAllItems: function (_inArray) {
            var html = '<table class="table-responsive" style="margin-top: 20px;">';
            var Div = $('#DivListUser #DivAllItem ');
            Div.html('');
            var Len = (_inArray != undefined && _inArray != null && _inArray != '') ? _inArray.length : 0;
            var tr = ''; th = '';
            if (Len > 0) {
                th += '<thead style="position: absolute;top:95px;margin-left:2px"><tr><th><input type="checkbox"  id="chkSelectAllModal"/></th><th style="width:50px;padding-left:5px;" >UserId</th><th  style="width:150px;padding-left:5px;"> UserName </th><th  style="width:210px;padding-left:5px;"> Email-Id</th></tr></thead>'
                tr += '<tbody>'
                for (var i = 0; i < _inArray.length; i++) {
                    var UserName = _inArray[i].UserName.length > 18 ? Trim(_inArray[i].UserName, 18) : _inArray[i].UserName;
                    var Utitle = _inArray[i].UserName
                    var Etitle = _inArray[i].Email
                    tr += '<tr ><td><input onchange="return MultipleStakeHolderItem.EnableDisableBtn(this);" type="checkbox"/></td><td style="width:50px;padding-left:5px;" >' + _inArray[i].UserId + '</td><td  title="' + Utitle + '"  style="width:150px;padding-left:5px;" >' + UserName + '</td><td  title="' + Etitle + '" style="width:210px;padding-left:5px;">' + _inArray[i].Email + '</td></tr>'
                }
                tr += '</tbody>'
                html += th + tr;
                html += '</table>'
                Div.append(html);


                if (_checkedItemsIds != null && _checkedItemsIds.length > 0) {
                    Div.find('table>tbody>tr').each(function (ind, itm) {
                        for (var j = 0; j < _checkedItemsIds.length; j++) {

                            var id = $(itm).find('td:eq(1)').text();
                            if (id == _checkedItemsIds[j]) {
                                $(itm).find('td:eq(0)>input[type=checkbox]').attr('checked', true);
                            }


                        }
                    });
                }

            }

        },
        bindSearchNCbtnEvnt: function () {
            $('#txtFindBox').unbind('mouseup');
            $('#txtFindBox').keyup(function () {
                return MultipleStakeHolderItem._SerchInput(this.value);
            });

            $('#txtFindBox').keypress(function (evt) {
                if (evt != undefined) {
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 8) || charCode == 32) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            });

            $('#txtFindBox').bind("mouseup", function (e) {
                var $input = $(this),
                    oldValue = $input.val();

                if (oldValue == "") return;
                setTimeout(function () {
                    var newValue = $input.val();

                    if (newValue == "") {
                        MultipleStakeHolderItem.addAllItems(GlobalUsersArray);
                        MultipleStakeHolderItem.bindCheckboxEvnt();
                        // MultipleStakeHolderItem.bindSearchNCbtnEvnt();
                        $input.trigger("cleared");
                        return;

                    }
                }, 1);
            });




        },
        bindCheckboxEvnt: function () {

            $('#chkSelectAllModal').change(function () {
                if (this.checked) {
                    $('.table-responsive tbody>tr>td input[type=checkbox]').each(function () { $(this).attr('checked', true) });
                  //  $('#btnAddModel,#btnOkModal').removeAttr('disabled');
                }
                else {
                    $('.table-responsive tbody>tr>td input[type=checkbox]').each(function () { $(this).attr('checked', false) });
                  //  $('#btnAddModel,#btnOkModal').attr('disabled', true);
                }
            });
            return false;

        },
        _checkAllchkbox: function () {
            var ischeck = false;
            $('.table-responsive tbody>tr>td input[type=checkbox]').each(function () {
                var chk = $(this).attr('checked');
                var _ids = $(this).parent().parent().find('td:eq(1)').text();

                if (chk) {

                    if ($.inArray(_ids, _checkedItemsIds) == -1) {
                        _checkedItemsIds.push(_ids);

                    }

                    ischeck = true;
                }
                else {
                    if ($.inArray(_ids, _checkedItemsIds) != -1) {
                        if (_checkedItemsIds.length == 1) {
                            _checkedItemsIds.pop(_ids);

                        }
                        else {
                            _checkedItemsIds.splice(1, _ids);

                        }

                    }

                }

            })
            return ischeck;
        },
        _countCheckedItems: function () {
            var count = 0;
            $('.table-responsive tbody>tr>td input[type=checkbox]').each(function () {
                var chk = $(this).attr('checked');
                if (chk) {
                    count++;
                }
            })
            return count;
        },
        EnableDisableBtn: function (obj) {
            var _ids = $(obj).parent().parent().find('td:eq(1)').text();
            var txt = $(obj).parent().parent().find('td:eq(2)').text();
            var email = $(obj).parent().parent().find('td:eq(3)').text();
            var Hdnval = _ids + '|' + txt + '|' + email
            var span = '<span  title="' + email + '"  class="all-copy" contenteditable="true"  val="' + Hdnval + '">' + txt + ';' + '</span>'
            if (obj.checked) {
             //   $('#btnAddModel,#btnOkModal').attr('disabled', false);
                _addCheckItems.push(span)
            }
            else {
                if ($.inArray(span, _addCheckItems) != -1) {
                    if (_addCheckItems.length == 1) {
                        _addCheckItems.pop(span);

                    }
                    else {
                        _addCheckItems.remove(span);

                    }

                }

              //  (!MultipleStakeHolderItem._checkAllchkbox()) ? $('#btnAddModel,#btnOkModal').attr('disabled', true) : '';
            }

            if (!MultipleStakeHolderItem._checkAllchkbox()) {
                $('#chkSelectAllModal').attr('checked', false);
            }

            MultipleStakeHolderItem._removeItemOnUnselect(obj);
            return false;
        },
        AddItemInTxtBox: function () {
            var SpanArray = []; var span = ''; var NewArray = [];
            if (MultipleStakeHolderItem._countCheckedItems() > 20) {
                Main.AutoHideAlertBox('A project can have maximum 20 Version Stakeholders')
                return false;
            }
            $('.table-responsive tbody>tr>td input[type=checkbox]').each(function () {
                var chkitm = $(this).attr('checked');

                if (chkitm) {
                    var values = $(this).parent().parent();

                    var Hdnval = values.find('td:eq(1)').text() + '|' + values.find('td:eq(2)').text() + '|' + values.find('td:eq(3)').text()

                    var title = values.find('td:eq(3)').attr('title');

                    /* Testing Purpose*/
                    SpanArray.push('<span  title="' + title + '"  class="all-copy" contenteditable="true"  val="' + Hdnval + '">' + values.find('td:eq(2)').text() + ';' + '</span>')
                }




            });


            var ExistingSpan;
            ExistingSpan = $('#DivmodalInputBox span');

            if (ExistingSpan.length > 0 && ExistingSpan != undefined && ExistingSpan != null) {
                for (var m = 0; m < ExistingSpan.length; m++) {
                    var html = ExistingSpan[m].outerHTML;
                    var Name = $(html).attr('val').split('|')[1];
                    var ExistId = $(html).attr('val').split('|')[0];
                    SpanArray.push($(html).text(Name + ';')[0].outerHTML);
                }
            }

            if (_addCheckItems.length > 0) {
                for (var r = 0; r < _addCheckItems.length; r++) {
                    SpanArray.push(_addCheckItems[r]);
                }
            }

            /*Remove Duplicate*/ var NewSpanArray = [];
            for (var t = 0; t < SpanArray.length; t++) {
                var Id = $(SpanArray[t]).attr('val').split('|')[0];
                if ($.inArray(Id, NewArray) == -1) {
                    NewArray.push(Id);
                    NewSpanArray.push(SpanArray[t]);
                }
            }
            /*End*/

            /* Testing Purpose*/
            NewSpanArray.join(';');
            if (NewSpanArray.length > 0) {
                for (var i = 0; i < NewSpanArray.length; i++) {
                    span += NewSpanArray[i]
                }
            }
            $('#DivmodalInputBox').html('');
            $('#DivmodalInputBox').html(span);
            funcCounter = 1;
            return true;

        }
        , _removeItemOnUnselect: function (obj) {
            var val = '';
            var values = $(obj).parent().parent();
            val = (obj != undefined) ? values.find('td:eq(1)').text() + '|' + values.find('td:eq(2)').text() + '|' + values.find('td:eq(3)').text() : '';


            var ele = $('#DivmodalInputBox');
            if (ele != undefined && ele.length > 0) {
                ele.find('span').each(function () {

                    var itm = $(this).attr('val');
                    if (val == itm) {
                        $(this).remove();
                    }


                });
            }
        },
        _bindEventToOkButton: function (Txtval, Hdnval) {
            $('#btnOkModal').unbind('click');

            var OkValues = '';
            $('#btnOkModal').click(function () {
                $('.blockUI.blockMsg.blockPage').removeAttr('style');
                /*validation for Check existing item */
                var newele = $('#DivmodalInputBox span');
                if (newele.length <= 0) {
                    return false;
                }
                var exitele = $('#' + Txtval + ' span')
                if (newele != undefined && newele.length > 0) {
                    for (var ni = 0; ni < newele.length; ni++) {

                        var Newvalues = $(newele[ni]).attr('val');
                        var NewTxt = Newvalues.split('|')[0];
                        var NewName = Newvalues.split('|')[1];
                        if (exitele.length > 0 && exitele != undefined) {
                            for (var ei = 0; ei < exitele.length; ei++) {

                                var exitvalue = $(exitele[ei]).attr('val');
                                var ExtTxt = exitvalue.split('|')[1];
                                if (ExtTxt == NewTxt) {
                                    Main.AutoHideAlertBox(NewName + '   Already Added..!!')
                                    return false;

                                }

                            }
                        }



                    }
                }
                /*end*/


                var divele = $('#DivmodalInputBox');
                var btnAdd = $('#btnAddModel').attr('disabled');
                if (divele.html().trim() == '' && !btnAdd) {
                    Main.AutoHideAlertBox('Please add selected User..!!');

                    return false;
                }
                else {
                    if (MultipleStakeHolderItem._countCheckedItems() > 20) {
                        Main.AutoHideAlertBox('A project can have maximum 20 Version Stakeholders')
                        return false;
                    }
                    OkValues = MultipleStakeHolderItem._getValuesfromDiv();
                }

                if (Txtval != undefined && Hdnval != undefined) {
                    var Txt = $('#' + Txtval + '')
                    var Val = $('#' + Hdnval + '')
                    Txt.val('');
                    Val.val('');
                    var DisplayValue = []; var Valuearry = [];

                    /* for Removing Stakeholder */
                    var NewArrayforRemoveStakeholder = []; var span = ''; var SpanArray = [];
                    /*End*/
                    if (OkValues != '') {
                        for (var i = 0; i < OkValues.split(';').length ; i++) {
                            if (OkValues.split(';')[i].trim() != '') {
                                DisplayValue.push(OkValues.split(';')[i].split('|')[1]);
                                var eles = OkValues.split(';')[i].split('|')[1] + '|' + OkValues.split(';')[i].split('|')[0] + '|' + OkValues.split(';')[i].split('|')[2]
                                Valuearry.push(eles);

                                NewArrayforRemoveStakeholder.push(
                                    {
                                        'name': OkValues.split(';')[i].split('|')[1],
                                        'value': eles
                                    })

                            }

                        }
                        /* for Removing Stakeholder */
                        var ExistingSpan;
                        ExistingSpan = Txt.find('span');
                        Txt.html('');
                        for (var k = 0; k < NewArrayforRemoveStakeholder.length; k++) {
                            var title = NewArrayforRemoveStakeholder[k].value.split('|')[2];
                            SpanArray.push('<span  title="' + title + '"  class="all-copy" contenteditable="true" val="' + NewArrayforRemoveStakeholder[k].value + '">' + NewArrayforRemoveStakeholder[k].name + ';' + '</span>')
                        }

                        if (ExistingSpan.length > 0 && ExistingSpan != undefined && ExistingSpan != null) {
                            for (var m = 0; m < ExistingSpan.length; m++) {
                                var html = ExistingSpan[m].outerHTML;
                                var Name = $(html).attr('val').split('|')[0];
                                SpanArray.push($(html).text(Name + ';')[0].outerHTML);
                                // <span title="sam@gmail.com" class="all-copy" contenteditable="true" val="sam J|2|sam@gmail.com"></span>

                            }
                        }


                        SpanArray.join(';');
                        if (SpanArray.length > 0) {
                            for (var i = 0; i < SpanArray.length; i++) {
                                span += SpanArray[i]
                            }
                        }

                        Txt.html(span);

                        /*ENd*/
                        //Txt.val(DisplayValue.join(';'));
                        Val.val(Valuearry.join(';'));
                    }

                }
                $('.js-modal-close , #btnCancelModal').click();

                $('#popup').hide();
               
            });

            return OkValues;
        },
        _getValuesfromDiv: function () {
            var value = '';
            var ele = $('#DivmodalInputBox span');
            for (var i = 0; i < ele.length; i++) {
                value += $(ele[i]).attr('val') + ';';
            }
            return value;
        },
        _SerchInput: function (_inputTxt) {
            var _filterArray = [];
            if (_inputTxt != '') {
                GlobalUsersArray.forEach(function (item, index) {
                    var ValuefromArray = item.UserName;
                    ValuefromArray = ValuefromArray.replace(" ", "").toLowerCase().trim();
                    if (ValuefromArray.indexOf(_inputTxt.toLowerCase().trim()) > 0 || ValuefromArray.startsWith(_inputTxt.toLowerCase().trim())) {

                        _filterArray.push(item);
                    }
                });
            }
            if (_filterArray.length > 0) {
                MultipleStakeHolderItem.addAllItems(_filterArray);
                MultipleStakeHolderItem.bindCheckboxEvnt();


            }
            else {
                MultipleStakeHolderItem.addAllItems(GlobalUsersArray);
                MultipleStakeHolderItem.bindCheckboxEvnt();


            }
            return true;
        },


    }

$(function () {
    _disableKeypressatDiv();
});
function _disableKeypressatDiv() {
    $('.divModalInputStake').keypress(function () { return false; })


}
function Trim(str, len) {
    if (str.length > len)
        return str.slice(0, len) + "...";
    else
        return str;
}

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function CC() {
    location.reload(true);
}