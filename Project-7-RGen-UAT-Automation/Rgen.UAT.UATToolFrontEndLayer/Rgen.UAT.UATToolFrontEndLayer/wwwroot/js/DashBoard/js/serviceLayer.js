/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
   Author: Shrutika Mendhe
   Modified By: Ejaz Waquif (For XMLHTTPRequest) modified Atul 
   Modified: 30 Jan 2015
   Created: 08/11/2013 
*/
$.ajaxSetup({
    // Disable caching of AJAX responses
    cache: false


});
var r = window.location.href.split('/');
var FrontEndUrl = r[0] + "//" + r[2];
var ServiceLayer = {

   //serviceURL: "http://uatservicelayer-uatvs-servicelayer.cloudapps.click2cloud.org/api",

    serviceURL: "http://uat-demo-service-uat-demo-service.cloudapps.click2cloud.org/api",

    

    appurl: FrontEndUrl,
    clientInfo: new Array(),

    GetData: function (methodName, parameter, ControllerName) {
        var controller = (ControllerName != undefined && ControllerName != '') ? ControllerName : "";
        var resultCollection = new Array();
        try {
            //[!] changes in Passing paramater by Atul
            if (parameter == undefined)
                var URL = ServiceLayer.serviceURL + "/" + controller + "/" + methodName + "?" + $.now();
            else {
                if (methodName == "GetDetailAnalysisData") {
                    var URL = ServiceLayer.serviceURL + "/" + controller + "/" + methodName + "?" + parameter + "&" + $.now();
                }
                else if (methodName == "GetRCDetailAnalysisData") {
                    var URL = ServiceLayer.serviceURL + "/" + controller + "/" + methodName + "/" + parameter + "&" + $.now();
                }
                else if (methodName == "UserLogin") {
                    var URL = ServiceLayer.serviceURL + "/" + controller + "/" + methodName + "?" + parameter + "&" + $.now();
                }
                else {
                    var URL = ServiceLayer.serviceURL + "/" + controller + "/" + methodName + "/" + parameter + "?" + $.now();
                }

            }


            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    // Request successful, read the response
                    var resp = req.responseText;

                    if (resp != "" && resp != null)
                        resultCollection = JSON.parse(resp);
                    var Rstate = req.readyState
                    var status = req.status

                    //To get the client name and client logo info
                    //if (methodName == "GetUserProjectsWithSecurity" || methodName.indexOf("GetTestCasesTestSteps") != -1) {
                    //    ServiceLayer.getClientInfo(req.getAllResponseHeaders());

                    //    //Main.bannerLogo();
                    //}
                }
            }

            req.open("GET", URL, false);

            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader("LoggedInUserSPUserId", _spUserId);
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            req.setRequestHeader("Cache-Control", "no-cache");
            req.send();

        }
        catch (e)
        { }

        return resultCollection;
    },

    InsertUpdateData: function (methodName, data, ControllerName) {
        var response = "";

        try {

            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    var resp = req.responseText;

                    if (resp != "" && resp != null)
                        if (ControllerName=="CompanyReg") {
                            response = resp;
                        }
                        else {
                            response = JSON.parse(resp);
                        }
                        

                }

            }


            req.open("POST", ServiceLayer.serviceURL + "/" + ControllerName + "/" + methodName, false);

            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            if (ControllerName != "CompanyReg") {
                req.setRequestHeader("LoggedInUserSPUserId", _spUserId);
            }
            
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            
            // if(ControllerName == "BulkDownloadImportTemplate")
          //    {
             // var jsonvar = JSON.stringify(data);
            //  req.send(JSON.parse(jsonvar));
          //   }
        //  else
         //  {           
               req.send(JSON.stringify(data));
         //  }
           
        }
        catch (e) { impTS.erroroccur = 1; }

        return response;


    },


    InsertUserData: function (methodName, data, ControllerName) {
        var response = "";

        try {

            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    var resp = req.responseText;

                    if (resp != "" && resp != null)
                        response = JSON.parse(resp);

                }

            }


            req.open("POST", ServiceLayer.serviceURL + "/" + ControllerName + "/" + methodName, false);
            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader("appurl", ServiceLayer.appurl);         
            req.send(JSON.stringify(data));
           
        }
        catch (e) { }

        return response;


    },

    DeleteData: function (methodName, data, ControllerName) {
        var response = "";

        try {

            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    // Request successful, read the response
                    var resp = req.responseText;

                    if (resp != "" && resp != null)
                        response = JSON.parse(resp);


                }

            }

            req.open("DELETE", ServiceLayer.serviceURL + "/" + ControllerName + "/" + methodName, false);

            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            req.setRequestHeader("LoggedInUserSPUserId", _spUserId);

            req.send(JSON.stringify(data));

        }
        catch (e) { }

        return response;

    },

    GenerateReport: function (methodName, parameter) {
        var requestResponse = "";

        try {

            var url = ServiceLayer.serviceURL + "/" + methodName;

            if (parameter != undefined)
                url += "/" + parameter;

            window.location.href = url;
        }
        catch (e)
        { }

        return requestResponse;
    },

    getClientInfo: function (str) {

        try {
            var tempClient = str.split("ClientInfo: ")[1].split("~")[0];

            ServiceLayer.clientInfo = tempClient.split("|");

        }
        catch (e)
        { }

    }
    ,
    GetProjectData: function (methodName, data, ControllerName) {
        var response = "";

        try {

            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    // Request successful, read the response
                    var resp = req.responseText;

                    if (resp != "" && resp != null)
                        response = JSON.parse(resp);


                }

            }

            req.open("POST", ServiceLayer.serviceURL + "/" + ControllerName + "/" + methodName, false);

            req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            req.setRequestHeader("LoggedInUserSPUserId", _spUserId);

            req.send(JSON.stringify(data));

        }
        catch (e) { }

        return response;
    },


    whatIsIt: function (object) {
        var stringConstructor = "test".constructor;
        var arrayConstructor = [].constructor;
        var objectConstructor = {}.constructor;
        if (object === null) {
            return "null";
        }
        else if (object === undefined) {
            return "undefined";
        }
        else if (object.constructor === stringConstructor) {
            return "String";
        }
        else if (object.constructor === arrayConstructor) {
            return "Array";
        }
        else if (object.constructor === objectConstructor) {
            return "Object";
        }
        else {
            return "don't know";
        }
    }

    ,

    postFile: function (methodName, data, ControllerName) {

        try {

            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {

                    var resp = req.responseText;

                    if (resp != "" && resp != null)
                        response = JSON.parse(resp);

                }

            }


            req.open("POST", ServiceLayer.serviceURL + "/" + ControllerName + "/" + methodName, false);
            req.setRequestHeader("LoggedInUserSPUserId", _spUserId);
            req.setRequestHeader("appurl", ServiceLayer.appurl);
            req.send(data);
        }
        catch (e) { }

        return response;
    },


    downloadAttachment: function (param) {
        var url = ServiceLayer.serviceURL + '/TestingPg/GetAttachmentFile/' + param;
        window.open(url, "_blank");
    },

    getConfigAttachment: function (param) {
        var url = ServiceLayer.serviceURL + '/Configuration/GetConfigurationAttachment?id=' + param + '&Url=' + ServiceLayer.appurl;
        window.open(url, "_blank");
    },
    downloadFromAttachmentPg: function (param) {
        var url = ServiceLayer.serviceURL + '/Attachment/GetFileToDownload?id=' + param + '&Url=' + ServiceLayer.appurl;
        //window.location.assign(url);
        var win = window.open(url, "_blank");
        win.focus();
    },

    getFileAtta: function (param) {



        var url = ServiceLayer.serviceURL + '/Attachment/GetFileToPreview?id=' + param + "&" + $.now();
        var req = new XMLHttpRequest();
        var resultCollection;
        req.onreadystatechange = function () {
            if (req.readyState == 4) {

                // Request successful, read the response
                var resp = req.responseText;

                if (resp != "" && resp != null && resp != "value") {
                    //resultCollection = JSON.parse(resp);
                    resultCollection = req.response;
                }
            }
        }
        req.open("GET", url, false);
        //req.responseType = "blob";
        //req.responseType = 'ArrayBuffer';
        req.setRequestHeader("Cache-Control", "no-cache");
        req.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        req.setRequestHeader("appurl", ServiceLayer.appurl);
        req.send();

        return resultCollection;
    }

}

