/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var feedback = {
    searchTestPassKey: "",
    searchProjectKey: "",
    searchRoleKey: "",
    startIndex: 0,
    SiteURL: Main.getSiteUrl(),
    Ei: 0,
    flag: 0,
    userName: "",
    rteText: "",
    caseName: "",
    stepName: "",
    saveStepDetailsMngr: new Array(),
    stepIDArrayMngr: new Array(),
    stepIDArrayTester: new Array(),
    stepNameArrayTester: new Array(),
    caseNameArrayTester: new Array(),
    stepNameArrayMngr: new Array(),
    caseNameArrayMngr: new Array(),
    popUpOpenFlagMngr: false,
    stepExpMngr: new Array(),//Converted variable to Array on 16 April
    stepActualMngr: new Array(),//Converted variable to Array on 16 April
    stepStatusMngr: new Array(),//Converted variable to Array on 16 April
    prjNameTester: "",
    passNameTester: "",
    stepNameTester: "",
    caseNameTester: "",
    details: "",
    oldFeedback: "",
    rteFeedback: "",
    nextClickFlag: false,
    saveBtnClick: false,
    autoFlag: false,
    autoSavedID: "",
    clearAutosave: false,
    flagForManager: 0,
    roleNameForRoleID: new Array(),
    userAssociationForTP: new Array(),
    actualResultAndRoleNameForChildID: new Array(),
    SPUserIDs: new Array(),
    userAssociationForTP: new Array(),
    rolesForTester: new Array(),
    arrofProjectName: new Array(),
    /******Variable defined for resource file by Mohini*******/
    rsProject: 'Project',
    rsRole: 'Role',
    rstestPass: 'Test Pass',
    rsTestStep: 'Test Step',
    rsTestCase: 'Test Case',
    rsTester: 'Tester',
    rsfeedback: 'Feedback',
    rsRating: 'Rating',
    rsAction: 'Action',
    rsActualResult: 'Actual Result',
    rsExpectedResult: 'Expected Result',
    rsVersion: 'Version',
    rsassTC: 'Associated Test Case',

    //Portfolio Variable
    getVerByProjName: new Array(),
    isPortfolioOn: false,


    //Mangesh   FOR TEST PASS TAB
    getTestPassIdByProjectIdForTesterAndRole: new Array,
    getProjectNameByID: new Array(),
    getTestPassNameByProjectId: new Array(), // Added by Mangesh
    resultPrj: [], // Added by Mangesh

    getTestPassIdByProjectId: new Array(),

    getTesterIdByTestpassId: new Array(),   // Added by Mangesh

    getRoleIdByTesterId: new Array(),   // Added by Mangesh

    getCountByTesterIdAndRoleId: new Array(),    // Added by Mangesh

    getFRByTPId: new Array(),

    getFRByTPIdRId: new Array(),

    getFRByTPIdTId: new Array(),

    getFRByTPIdTIdRId: new Array(),

    getFRByPId: new Array(),

    getFRByPIdRId: new Array(),

    getFRByPIdTId: new Array(),

    getFRByPIdTIdRId: new Array(),

    getRoleIdByPIdTesterId: new Array(),



    //MANGESH FOR TEST STEP TAB : 1st part

    getProjectNameByIDFTS: new Array(),
    getTestPassNameByProjectIdFTS: new Array(), // Added by Mangesh
    resultPrjFTS: [], // Added by Mangesh

    getTestPassIdByProjectIdFTS: new Array(),

    getTesterIdByTestpassIdFTS: new Array(),   // Added by Mangesh

    getRoleIdByTesterIdFTS: new Array(),   // Added by Mangesh

    getCountByTesterIdAndRoleIdFTS: new Array(),    // Added by Mangesh

    getVerByProjNameFTS: new Array(),


    //MANGESH FOR TEST STEP TAB : 2nd part

    resultTestStep: [],

    getTestStepDataArr: new Array(),

    //getFRByPIdFTS:new Array(),


    init: function () {
        /*******Added by mohini For resource file*********/
        if (resource.isConfig.toLowerCase() == 'true') {
            feedback.rsProject = resource.gPageSpecialTerms['Project'] == undefined ? 'Project' : resource.gPageSpecialTerms['Project'];
            feedback.rstestPass = resource.gPageSpecialTerms['Test Pass'] == undefined ? 'Test Pass' : resource.gPageSpecialTerms['Test Pass'];
            feedback.rsTestCase = resource.gPageSpecialTerms['Test Case'] == undefined ? 'Test Case' : resource.gPageSpecialTerms['Test Case'];
            feedback.rsTestStep = resource.gPageSpecialTerms['Test Step'] == undefined ? 'Test Step' : resource.gPageSpecialTerms['Test Step'];
            feedback.rsTester = resource.gPageSpecialTerms['Tester'] == undefined ? 'Tester' : resource.gPageSpecialTerms['Tester'];
            feedback.rsRole = resource.gPageSpecialTerms['Role'] == undefined ? 'Role' : resource.gPageSpecialTerms['Role'];
            feedback.rsfeedback = resource.gPageSpecialTerms['Feedback'] == undefined ? 'Feedback' : resource.gPageSpecialTerms['Feedback'];
            feedback.rsRating = resource.gPageSpecialTerms['Rating'] == undefined ? 'Rating' : resource.gPageSpecialTerms['Rating'];
            feedback.rsAction = resource.gPageSpecialTerms['Action'] == undefined ? 'Action' : resource.gPageSpecialTerms['Action'];
            feedback.rsActualResult = resource.gPageSpecialTerms['Actual Result'] == undefined ? 'Actual Result' : resource.gPageSpecialTerms['Actual Result'];
            feedback.rsExpectedResult = resource.gPageSpecialTerms['Expected Result'] == undefined ? 'Expected Result' : resource.gPageSpecialTerms['Expected Result'];
            feedback.rsVersion = resource.gPageSpecialTerms['Version'] == undefined ? 'Version' : resource.gPageSpecialTerms['Version'];
            feedback.rsassTC = resource.gPageSpecialTerms['Associated Test Case'] == undefined ? 'Associated Test Case' : resource.gPageSpecialTerms['Associated Test Case'];
        }
        $('#popUpRTE').attr('title', feedback.rsfeedback);
        $("#projSelect").html('<option>Select ' + feedback.rsProject + '</option>');
        $("#testPasSelect").html('<option>Select ' + feedback.rstestPass + '</option>');
        $("#testerSelect").html('<option>Select ' + feedback.rsTester + '</option>');
        $("#roleSelect").html('<option>Select ' + feedback.rsRole + '</option>');

        $("#projSelectTC").html('<option value="-1">Select ' + feedback.rsProject + '</option>');
        $("#testPasSelectTC").html('<option>Select ' + feedback.rstestPass + '</option>');
        $("#testerSelectTC").html('<option>Select ' + feedback.rsTester + '</option>');
        $("#roleSelectTC").html('<option>Select ' + feedback.rsRole + '</option>');
        $("#btnShow").val("Show " + feedback.rsfeedback);
        $('#versionSelectTC').html('<option>Select ' + feedback.rsVersion + '</option>');
        $('#versionSelect').html('<option>Select ' + feedback.rsVersion + '</option>');

    },

    /*Function to show the feedback grid*/
    showGrid: function () {
        var tempVerArrFTS = new Array();
        Main.showLoading();
        $("img[title='Spell Check']").hide();
        $("img[title='Add Image']").hide();
        //security.applySecurityForAnalysis(_spUserId,$('#userW').text());
        $("ul li a:eq(4)").attr('class', 'selHeading');

        /*Get the project id and test pass id from query string*/
        $('.filter').show();

        feedback.fillProjectDDLPortfolio();

        //feedback.fillProjectDDL();
        /*var url=window.location.href;
    	var link=url.split("?");
     	if(link != null || link != undefined)
    	{
	    	  if(link[1] != null || link[1] != undefined)
	    	  {
		    		var getKey=link[1]; 
		 			var getval=(getKey!= null || getKey != undefined) ? getKey.split("=") : ''; 		
		    		var twoKeys=(getval[1] != null || getval[1] != undefined) ? getval[1] : '';	  
		    		twoKeys=(twoKeys!= null || twoKeys!= undefined) ? twoKeys.split(",") : ''; 	
		    	    feedback.searchTestPassKey=twoKeys[1];
		    	    feedback.searchProjectKey=twoKeys[0];
		    	    feedback.searchRoleKey=twoKeys[2];
		    	    
				    $("#projSelect option").each(function(){ 
						if($(this).val() == feedback.searchProjectKey)
						{
							$("#projSelect").val(feedback.searchProjectKey);
							feedback.GetTestPassonProjectChange();
							$("#testPasSelect").val(feedback.searchTestPassKey);
							
							feedback.OnTestPassChange();
							
							if($.inArray(_spUserId.toString(),feedback.SPUserIDs) != -1)
							{	
								$("#testerSelect").val(_spUserId);
								feedback.OnTesterChange();
								$("#roleSelect option").each(function(){
									if($(this).val() == feedback.searchRoleKey)
									{
										$("#roleSelect").val(feedback.searchRoleKey);
										feedback.showTesterFeedbackGrd();
									}	
								});
								
							}
							else
							{
								if(feedback.SPUserIDs.length == 0)
								{
									$("#testPasSelect").val('0');
									//$("#roleSelect").html('<option value="0">Select Role</option>');
									//$("#testerSelect").html('<option value="0">Select Tester</option>');
                                    /****Added by Moihini for resource file******/ /*
									$("#roleSelect").html('<option value="0">Select '+feedback.rsRole+'</option>');
									$("#testerSelect").html('<option value="0">Select '+feedback.rsTester+'</option>');
								}	
							}
						}
					});
				 }
    	}*/

        /*Fill testpass ddl on change of project name*/
        $('#projSelect').change(function () {

            if ($('#projSelect option:selected').text() == "Select " + feedback.rsProject) {
                $("#versionSelect").html("<option>Select " + feedback.rsVersion + "</option>");
                $("#testPasSelect").html("<option>Select " + feedback.rstestPass + "</option>");
                $("#testerSelect").html("<option>Select " + feedback.rsTester + "</option>");
                $("#roleSelect").html("<option>Select " + feedback.rsRole + "</option>");
            }
            else {
                if (feedback.isPortfolioOn) {
                    //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                    var data = feedback.getVerByProjNameFTS[$('#projSelect option:selected').attr('title')];
                    var NoOfVer = 0;
                    if (data != undefined)
                        NoOfVer = data.length;

                    var verOptions = '';
                    tempVerArrFTS = [];

                    for (var i = 0; i < NoOfVer; i++) {

                        if ($.inArray(data[i].projectVersion, tempVerArrFTS) == -1) {
                            tempVerArrFTS.push(data[i].projectVersion);

                            verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                        }
                    }

                    if (verOptions == "")
                        verOptions = '<option >Default ' + feedback.rsVersion + '</option>';

                    $("#versionSelect").html(verOptions);
                    //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
                }

                feedback.GetTestPassonProjectChange();
            }
        });
        $("#versionSelect").change(function () {

            feedback.GetTestPassonProjectChange();

        });
        /*Fill tester ddl on change of test pass*/
        $('#testPasSelect').change(function () {

            feedback.OnTestPassChange();
        });

        $("#testerSelect").change(function () {

            feedback.OnTesterChange();
        });

        $("#roleSelect").change(function () {

            $("#feedbackGrid").empty();
            $("#testPassCount").hide();

        });

        window.setTimeout("Main.hideLoading()", 400);

    },

    fillProjectDDLPortfolio: function () {
        //Declare arrays
        var temp = '';

        var projectName = '';
        var projectDD = new Array();
        var projectList = '';
        var projectQuery = '';
        var testPassName = '';
        var testPassId = '';
        var testerId = '';
        var testerName = '';
        var roleId = '';
        var roleName = '';
        var projectVersion = '';
        var projectID = '';
        var testCaseId = '';
        var testCaseName = '';
        var rating = '';
        var feedBack = '';


        $("#projSelect").empty();
        feedback.userName = "";
        //$("#projSelect").html('<option value="0">Select Project</option>');
        $("#projSelect").html('<option value="0">Select ' + feedback.rsProject + '</option>');//added by Mohini for resource file


        //Using the generic service layer getmethod to call the required function  :   Mangesh
        //feedback.resultPrj=ServiceLayer.GetData("GetDropdownDataForDetailAnalysis_Portfolio",_spUserId);  // _spUserId   "12" 
        feedback.resultPrj = ServiceLayer.GetData("GetDropdownDataForDetailAnalysis_Portfolio", null, "Feedback");

        if ((feedback.resultPrj != null) && (feedback.resultPrj != undefined) && (feedback.resultPrj.length > 0)) {
            var tempProjName = new Array();
            for (var zz = 0; zz < feedback.resultPrj.length; zz++) {
                projectName = feedback.resultPrj[zz].projectName;
                temp = '<option value="' + feedback.resultPrj[zz].projectId + '" title="' + projectName + '" >' + trimText(projectName, 25) + '</option>';

                //To filter data in arrays accordingly
                //Analysis.leadNameForProjectID[ Analysis.projectItems[i].projectId] = Analysis.projectItems[i].versionLead;
                projectID = feedback.resultPrj[zz].projectId;
                projectName = feedback.resultPrj[zz].projectName;
                //versionLead=feedback.resultPrj[zz].versionLead;

                testPassName = feedback.resultPrj[zz].testpassName; //added by Mangesh
                testPassId = feedback.resultPrj[zz].testpassId; //added by Mangesh
                //testerId=feedback.resultPrj[zz].testerId; //added by Mangesh
                //testerName=feedback.resultPrj[zz].testerName; //added by Mangesh
                //roleId=feedback.resultPrj[zz].roleId; //added by Mangesh
                //roleName=feedback.resultPrj[zz].roleName; //added by Mangesh
                tpEndDate = feedback.resultPrj[zz].tpEndDate; //added by Mangesh
                testManager = feedback.resultPrj[zz].testManager; //added by Mangesh
                rating = feedback.resultPrj[zz].rating; //added by Mangesh
                feedBack = feedback.resultPrj[zz].feedBack; //added by Mangesh
                testCaseId = feedback.resultPrj[zz].testCaseId; //added by Mangesh
                testCaseName = feedback.resultPrj[zz].testCaseName; //added by Mangesh
                projectVersion = feedback.resultPrj[zz].projectVersion; //added by Mangesh


                if (feedback.getProjectNameByID[feedback.resultPrj[zz].projectId] == undefined) {
                    feedback.getProjectNameByID[feedback.resultPrj[zz].projectId] = new Array();
                    feedback.getProjectNameByID[feedback.resultPrj[zz].projectId].push({

                        "projectId": projectID,

                        "projectName": projectName,

                        "projectVersion": projectVersion

                    });
                }

                if (testPassId != "") {

                    if (feedback.getTestPassIdByProjectId[feedback.resultPrj[zz].projectId] == undefined) {
                        feedback.getTestPassIdByProjectId[feedback.resultPrj[zz].projectId] = new Array();
                        feedback.getTestPassIdByProjectId[feedback.resultPrj[zz].projectId].push({

                            "testPassId": testPassId,
                            "testPassName": testPassName,
                            //"testerId":testerId,
                            //"testerName": testerName,
                            "testManager": testManager,
                            "tpEndDate": tpEndDate,
                            //"roleId":roleId,
                            //"roleName":roleName

                        }); //added by Mangesh
                    }
                    else {
                        feedback.getTestPassIdByProjectId[feedback.resultPrj[zz].projectId].push({

                            "testPassId": testPassId,
                            "testPassName": testPassName,
                            //"testerId":testerId,
                            //"testerName": testerName,
                            "testManager": testManager,
                            "tpEndDate": tpEndDate,
                            //"roleId":roleId,
                            //"roleName":roleName

                        }); //added by Mangesh
                    }
                }




                ///////////////////////Added by Mangesh for tptab tester dropdown
                var listTester = feedback.resultPrj[zz].lstTesterList;
                for (var j = 0; j < listTester.length; j++) {


                    if (testPassId != "") {

                        if (feedback.getTestPassIdByProjectIdForTesterAndRole[feedback.resultPrj[zz].projectId] == undefined) {
                            feedback.getTestPassIdByProjectIdForTesterAndRole[feedback.resultPrj[zz].projectId] = new Array();
                            feedback.getTestPassIdByProjectIdForTesterAndRole[feedback.resultPrj[zz].projectId].push({

                                "testerId": listTester[j].testerId,
                                "testerName": listTester[j].testerName,
                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName

                            }); //added by Mangesh
                        }
                        else {
                            feedback.getTestPassIdByProjectIdForTesterAndRole[feedback.resultPrj[zz].projectId].push({

                                "testerId": listTester[j].testerId,
                                "testerName": listTester[j].testerName,
                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName

                            }); //added by Mangesh
                        }
                    }



                    if (listTester[j].testerId != "") {
                        if (feedback.getTesterIdByTestpassId[feedback.resultPrj[zz].testpassId] == undefined) {
                            feedback.getTesterIdByTestpassId[feedback.resultPrj[zz].testpassId] = new Array();
                            feedback.getTesterIdByTestpassId[feedback.resultPrj[zz].testpassId].push({
                                "testerId": listTester[j].testerId,
                                "testerName": listTester[j].testerName,
                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName
                            });
                        }
                        else {
                            feedback.getTesterIdByTestpassId[feedback.resultPrj[zz].testpassId].push({
                                "testerId": listTester[j].testerId,
                                "testerName": listTester[j].testerName,
                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName

                            });

                        }
                    }

                    if (listTester[j].roleId != "") {
                        if (feedback.getRoleIdByTesterId[feedback.resultPrj[zz].projectId + "-" + feedback.resultPrj[zz].testpassId + "-" + listTester[j].testerId] == undefined) {
                            feedback.getRoleIdByTesterId[feedback.resultPrj[zz].projectId + "-" + feedback.resultPrj[zz].testpassId + "-" + listTester[j].testerId] = new Array();
                            feedback.getRoleIdByTesterId[feedback.resultPrj[zz].projectId + "-" + feedback.resultPrj[zz].testpassId + "-" + listTester[j].testerId].push({

                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName
                            });
                        }
                        else {
                            feedback.getRoleIdByTesterId[feedback.resultPrj[zz].projectId + "-" + feedback.resultPrj[zz].testpassId + "-" + listTester[j].testerId].push({
                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName
                            });

                        }
                    }


                    if (listTester[j].roleId != "") {
                        if (feedback.getRoleIdByPIdTesterId[feedback.resultPrj[zz].projectId + "-" + listTester[j].testerId] == undefined) {
                            feedback.getRoleIdByPIdTesterId[feedback.resultPrj[zz].projectId + "-" + listTester[j].testerId] = new Array();
                            feedback.getRoleIdByPIdTesterId[feedback.resultPrj[zz].projectId + "-" + listTester[j].testerId].push({

                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName
                            });
                        }
                        else {
                            feedback.getRoleIdByPIdTesterId[feedback.resultPrj[zz].projectId + "-" + listTester[j].testerId].push({
                                "roleId": listTester[j].roleId,
                                "roleName": listTester[j].roleName
                            });

                        }
                    }

                }


                ///////////////////////Added by Mangesh for tptab tester dropdown
                /*				var listTester=Analysis.projectItems[i].lstTesterList;
                  for(var j=0;j<listTester.length;j++)			            
                  {
                          if(listTester[j].testerId!="") 
                          {
                                        
                                if(Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testPassId]==undefined)
                                {
                                    Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testPassId]=new Array();
                                    Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testPassId].push({
                                    "testerId":listTester[j].testerId,
                                    "testerName":listTester[j].testerName,
                                    "roleId":listTester[j].roleId,
                                    "roleName":listTester[j].roleName
                                    });
                                }	
                                else
                                {
                                    Analysis.getTesterIdByTestpassId[Analysis.projectItems[i].testPassId].push({
                                    "testerId":listTester[j].testerId,
                                    "testerName":listTester[j].testerName,
                                    "roleId":listTester[j].roleId,
                                    "roleName":listTester[j].roleName
          
                                   });
          
                                }	
                           }			  
                    
                          if(listTester[j].roleId!="") 
                          {
  
                                if(Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId+"-"+Analysis.projectItems[i].testPassId+"-"+listTester[j].testerId]==undefined)
                                {
                                    Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId+"-"+Analysis.projectItems[i].testPassId+"-"+listTester[j].testerId]=new Array();
                                    Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId+"-"+Analysis.projectItems[i].testPassId+"-"+listTester[j].testerId].push({
                                    
                                    "roleId":listTester[j].roleId,
                                    "roleName":listTester[j].roleName
                                    });
                                }
                                else
                                {
                                       Analysis.getRoleIdByTesterId[Analysis.projectItems[i].projectId+"-"+Analysis.projectItems[i].testPassId+"-"+listTester[j].testerId].push({						  
                                    "roleId":listTester[j].roleId,
                                    "roleName":listTester[j].roleName
                                    });
          
                                }
                           }
                  }
                  */

                ////////////////////////






                //Code for portfolio changes :Ejaz Waquif DT:1/23/2014
                if ($.inArray(projectName, tempProjName) == -1) {
                    //$("#projSelect").append(temp);
                    $("#projSelectTC").append(temp);

                    tempProjName.push(projectName);

                    if (feedback.isPortfolioOn) {
                        //var version = resultPrj[zz]['ProjectVersion']==null||resultPrj[zz]['ProjectVersion']==undefined ?"No Version":resultPrj[zz]['ProjectVersion'];
                        var version = feedback.resultPrj[zz].projectVersion == null || feedback.resultPrj[zz].projectVersion == undefined ? "Default " + feedback.rsVersion : feedback.resultPrj[zz].projectVersion;//Added by Mohini for resource file
                        feedback.getVerByProjName[projectName] = new Array();
                        feedback.getVerByProjName[projectName].push({
                            "projectVersion": version,
                            "projectId": projectID

                        });
                    }

                }
                else {
                    if (feedback.isPortfolioOn) {
                        //var version = resultPrj[zz]['ProjectVersion']==null||resultPrj[zz]['ProjectVersion']==undefined ?"No Version":resultPrj[zz]['ProjectVersion'];
                        var version = feedback.resultPrj[zz].projectVersion == null || feedback.resultPrj[zz].projectVersion == undefined ? "Default " + feedback.rsVersion : feedback.resultPrj[zz].projectVersion;//Added by Mohini for resource file
                        feedback.getVerByProjName[projectName].push({
                            "projectVersion": version,
                            "projectId": projectID

                        });
                    }

                }
                //End of Code for portfolio changes :Ejaz Waquif DT:1/23/2014
                feedback.arrofProjectName[feedback.resultPrj[zz].projectId] = feedback.resultPrj[zz].projectName;

            }
        }
        else
            window.location.href = Main.getSiteUrl() + "/Dashboard/Index";





        //For TestStep tab : ProjectDD filling and forming according arrays

        var tempFTS = "";
        var projectIDFTS = '';
        var projectNameFTS = '';
        var projectVersionFTS = '';

        var testpassNameFTS = '';
        var testpassIdFTS = '';
        var testerIdFTS = '';
        var testerNameFTS = '';
        var roleIdFTS = '';
        var roleNameFTS = '';



        //Using the generic service layer getmethod output already calculated  :   Mangesh

        feedback.resultPrjFTS = feedback.resultPrj;

        if (feedback.resultPrjFTS != null || feedback.resultPrjFTS != undefined) {

            var tempProjNameFTS = new Array();
            for (var zz = 0; zz < feedback.resultPrjFTS.length; zz++) {
                projectNameFTS = feedback.resultPrjFTS[zz].projectName;
                tempFTS = '<option value="' + feedback.resultPrjFTS[zz].projectId + '" title="' + projectNameFTS + '" >' + trimText(projectNameFTS, 25) + '</option>';

                //To filter data in arrays accordingly		            
                projectIDFTS = feedback.resultPrjFTS[zz].projectId;
                projectNameFTS = feedback.resultPrjFTS[zz].projectName;
                projectVersionFTS = feedback.resultPrjFTS[zz].projectVersion; //added by Mangesh
                testpassNameFTS = feedback.resultPrjFTS[zz].testpassName; //added by Mangesh
                testpassIdFTS = feedback.resultPrjFTS[zz].testpassId; //added by Mangesh
                testerIdFTS = feedback.resultPrjFTS[zz].testerId; //added by Mangesh
                testerNameFTS = feedback.resultPrjFTS[zz].testerName; //added by Mangesh
                roleIdFTS = feedback.resultPrjFTS[zz].roleId; //added by Mangesh
                roleNameFTS = feedback.resultPrjFTS[zz].roleName; //added by Mangesh	                  		  

                if (feedback.getProjectNameByIDFTS[feedback.resultPrjFTS[zz].projectId] == undefined) {
                    feedback.getProjectNameByIDFTS[feedback.resultPrjFTS[zz].projectId] = new Array();
                    feedback.getProjectNameByIDFTS[feedback.resultPrjFTS[zz].projectId].push({

                        "projectId": projectIDFTS,
                        "projectName": projectNameFTS,

                        "projectVersion": projectVersionFTS

                    });
                }


                if (testpassIdFTS != "") {

                    if (feedback.getTestPassIdByProjectIdFTS[feedback.resultPrjFTS[zz].projectId] == undefined) {
                        feedback.getTestPassIdByProjectIdFTS[feedback.resultPrjFTS[zz].projectId] = new Array();
                        feedback.getTestPassIdByProjectIdFTS[feedback.resultPrjFTS[zz].projectId].push({

                            "testPassId": testpassIdFTS,
                            "testPassName": testpassNameFTS,
                            "testerId": testerIdFTS,
                            "testerName": testerNameFTS,

                            "roleId": roleIdFTS,
                            "roleName": roleNameFTS

                        }); //added by Mangesh
                    }
                    else {
                        feedback.getTestPassIdByProjectIdFTS[feedback.resultPrjFTS[zz].projectId].push({

                            "testPassId": testpassIdFTS,
                            "testPassName": testpassNameFTS,
                            "testerId": testerIdFTS,
                            "testerName": testerNameFTS,


                            "roleId": roleIdFTS,
                            "roleName": roleNameFTS

                        }); //added by Mangesh
                    }
                }


                if (testerIdFTS != "") {

                    if (feedback.getTesterIdByTestpassIdFTS[feedback.resultPrjFTS[zz].testpassId] == undefined) {
                        feedback.getTesterIdByTestpassIdFTS[feedback.resultPrjFTS[zz].testpassId] = new Array();
                        feedback.getTesterIdByTestpassIdFTS[feedback.resultPrjFTS[zz].testpassId].push({
                            "testerId": testerIdFTS,
                            "testerName": testerNameFTS,
                            "roleId": roleIdFTS,
                            "roleName": roleNameFTS
                        });
                    }
                    else {
                        feedback.getTesterIdByTestpassIdFTS[feedback.resultPrjFTS[zz].testpassId].push({
                            "testerId": testerIdFTS,
                            "testerName": testerNameFTS,
                            "roleId": roleIdFTS,
                            "roleName": roleNameFTS

                        });

                    }
                }


                if (roleIdFTS != "") {
                    if (feedback.getRoleIdByTesterIdFTS[feedback.resultPrjFTS[zz].projectId + "-" + feedback.resultPrjFTS[zz].testpassId + "-" + feedback.resultPrjFTS[zz].testerId] == undefined) {
                        feedback.getRoleIdByTesterIdFTS[feedback.resultPrjFTS[zz].projectId + "-" + feedback.resultPrjFTS[zz].testpassId + "-" + feedback.resultPrjFTS[zz].testerId] = new Array();
                        feedback.getRoleIdByTesterIdFTS[feedback.resultPrjFTS[zz].projectId + "-" + feedback.resultPrjFTS[zz].testpassId + "-" + feedback.resultPrjFTS[zz].testerId].push({

                            "roleId": roleIdFTS,
                            "roleName": roleNameFTS
                        });
                    }
                    else {
                        feedback.getRoleIdByTesterIdFTS[feedback.resultPrjFTS[zz].projectId + "-" + feedback.resultPrjFTS[zz].testpassId + "-" + feedback.resultPrjFTS[zz].testerId].push({
                            "roleId": roleIdFTS,
                            "roleName": roleNameFTS
                        });

                    }
                }

                //Code for portfolio changes :Ejaz Waquif DT:1/23/2014
                if ($.inArray(projectNameFTS, tempProjNameFTS) == -1) {
                    $("#projSelect").append(tempFTS);

                    tempProjNameFTS.push(projectNameFTS);

                    if (feedback.isPortfolioOn) {
                        var versionFTS = feedback.resultPrjFTS[zz].projectVersion == null || feedback.resultPrjFTS[zz].projectVersion == undefined ? "Default " + feedback.rsVersion : feedback.resultPrjFTS[zz].projectVersion;//Added by Mohini for resource file
                        feedback.getVerByProjNameFTS[projectNameFTS] = new Array();
                        feedback.getVerByProjNameFTS[projectNameFTS].push({
                            "projectVersion": versionFTS,
                            "projectId": projectIDFTS
                        });
                    }
                }
                else {
                    if (feedback.isPortfolioOn) {
                        //var version = resultPrj[zz]['ProjectVersion']==null||resultPrj[zz]['ProjectVersion']==undefined ?"No Version":resultPrj[zz]['ProjectVersion'];
                        var versionFTS = feedback.resultPrjFTS[zz].projectVersion == null || feedback.resultPrjFTS[zz].projectVersion == undefined ? "Default " + feedback.rsVersion : feedback.resultPrjFTS[zz].projectVersion;//Added by Mohini for resource file
                        feedback.getVerByProjNameFTS[projectNameFTS].push({
                            "projectVersion": versionFTS,
                            "projectId": projectIDFTS
                        });
                    }
                }
            }
        }
        else
            window.location.href = Main.getSiteUrl() + "/SitePages/Dashboard.aspx";


    },
    FeedbackRating: new Array(),
    DrillFeedbackRating: new Array(),

    FillTestPassTabArrays: function () {
        //Declare arrays
        var temp = '';

        if (!feedback.isPortfolioOn) {
            var projectID = $("#projSelectTC option:selected").val();
        }
        else {
            var projectID = $("#versionSelectTC option:selected").val();
        }


        var projectName = '';
        var projectVersion = '';
        var testPassName = '';
        var testPassId = '';
        var testerId = '';
        var testerName = '';
        var roleId = '';
        var roleName = '';
        var testCaseId = '';
        var testCaseName = '';
        var rating = '';
        var feedBack = '';

        var tpidtcid = '';

        var fbType = '';

        //for single test pass
        var temp11FR = new Array();
        var temp12FR = new Array();
        var temp21FR = new Array();
        var temp22FR = new Array();
        var temp31FR = new Array();
        var temp32FR = new Array();
        var temp41FR = new Array();
        var temp42FR = new Array();

        //for all test passes
        var temp51FR = new Array();
        var temp52FR = new Array();
        var temp61FR = new Array();
        var temp62FR = new Array();
        var temp71FR = new Array();
        var temp72FR = new Array();
        var temp81FR = new Array();
        var temp82FR = new Array();


        feedback.getFRByTPId = [];
        feedback.getFRByTPIdRId = [];
        feedback.getFRByTPIdTId = [];
        feedback.getFRByTPIdTIdRId = [];

        feedback.getFRByPId = [];
        feedback.getFRByPIdRId = [];
        feedback.getFRByPIdTId = [];
        feedback.getFRByPIdTIdRId = [];


        var param = projectID + "/0";
        feedback.FeedbackRating = ServiceLayer.GetData("GetFeedback", param, "Feedback");
        for (var i = 0; i < feedback.FeedbackRating.length; i++) {

            testcaseId = feedback.FeedbackRating[i].testcaseId;
            testcaseName = feedback.FeedbackRating[i].testcaseName;
            testerName = feedback.FeedbackRating[i].testerName;
            testerId = feedback.FeedbackRating[i].userId;
            testPassName = feedback.FeedbackRating[i].testpassName;
            testPassId = feedback.FeedbackRating[i].testpassId;


            feedback.DrillFeedbackRating = feedback.FeedbackRating[i].listTesterDetail;

            for (var j = 0; j < feedback.DrillFeedbackRating.length; j++) {

                roleId = feedback.DrillFeedbackRating[j].roleId;
                roleName = feedback.DrillFeedbackRating[j].roleName;
                rating = feedback.DrillFeedbackRating[j].tpTcRating;
                feedBack = feedback.DrillFeedbackRating[j].tpTcFeedback;

                fbType = feedback.DrillFeedbackRating[j].fBType;

                if (fbType == "")
                    fbType = "0";

                //tpidtcid=testPassId+"-"+testcaseId+"-"+testerId+"-"+roleId;					  								  		
                tpidtcid = feedback.DrillFeedbackRating[j].feedbackRatingId;    //to uniquely idendtify the test pass feedback records


                //To read FeedBack Rating of eight scenarios
                //fbType=0 : TP level feedback, fbType=1: TC level feedback,  fbType=2: No feedback
                if (rating != "" && fbType != "2") {
                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp11FR) == -1) {
                            temp11FR.push(tpidtcid);

                            if (feedback.getFRByTPId[testPassId] == undefined) {
                                feedback.getFRByTPId[testPassId] = new Array();
                                feedback.getFRByTPId[testPassId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {
                                feedback.getFRByTPId[testPassId].push({
                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }

                        }
                    }
                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp12FR) == -1) {
                            temp12FR.push(tpidtcid);


                            if (feedback.getFRByTPId[testPassId] == undefined) {
                                feedback.getFRByTPId[testPassId] = new Array();
                                feedback.getFRByTPId[testPassId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {
                                feedback.getFRByTPId[testPassId].push({
                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }


                    if (fbType == "0") {

                        if ($.inArray(tpidtcid, temp21FR) == -1) {
                            temp21FR.push(tpidtcid);


                            if (feedback.getFRByTPIdRId[testPassId + "-" + roleId] == undefined) {
                                feedback.getFRByTPIdRId[testPassId + "-" + roleId] = new Array();
                                feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {
                                feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({
                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });

                            }
                        }

                    }

                    else if (fbType == "1") {

                        if ($.inArray(tpidtcid, temp22FR) == -1) {
                            temp22FR.push(tpidtcid);

                            if (feedback.getFRByTPIdRId[testPassId + "-" + roleId] == undefined) {
                                feedback.getFRByTPIdRId[testPassId + "-" + roleId] = new Array();
                                feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {
                                feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({
                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });

                            }
                        }

                    }

                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp31FR) == -1) {
                            temp31FR.push(tpidtcid);


                            if (feedback.getFRByTPIdTId[testPassId + "-" + testerId] == undefined) {
                                feedback.getFRByTPIdTId[testPassId + "-" + testerId] = new Array();
                                feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {
                                feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({
                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });

                            }
                        }
                    }
                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp32FR) == -1) {
                            temp32FR.push(tpidtcid);


                            if (feedback.getFRByTPIdTId[testPassId + "-" + testerId] == undefined) {
                                feedback.getFRByTPIdTId[testPassId + "-" + testerId] = new Array();
                                feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {
                                feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({
                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });

                            }
                        }
                    }


                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp41FR) == -1) {
                            temp41FR.push(tpidtcid);

                            if (feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] == undefined) {
                                feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] = new Array();
                                feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });
                            }
                            else {
                                feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack


                                });

                            }
                        }
                    }

                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp42FR) == -1) {
                            temp42FR.push(tpidtcid);

                            if (feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] == undefined) {
                                feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] = new Array();
                                feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });
                            }
                            else {
                                feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack


                                });

                            }
                        }
                    }

                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp51FR) == -1) {
                            temp51FR.push(tpidtcid);


                            if (feedback.getFRByPId[projectID] == undefined) {
                                feedback.getFRByPId[projectID] = new Array();
                                feedback.getFRByPId[projectID].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPId[projectID].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }
                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp52FR) == -1) {
                            temp52FR.push(tpidtcid);


                            if (feedback.getFRByPId[projectID] == undefined) {
                                feedback.getFRByPId[projectID] = new Array();
                                feedback.getFRByPId[projectID].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPId[projectID].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }

                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp61FR) == -1) {
                            temp61FR.push(tpidtcid);


                            if (feedback.getFRByPIdRId[projectID + "-" + roleId] == undefined) {
                                feedback.getFRByPIdRId[projectID + "-" + roleId] = new Array();
                                feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }
                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp62FR) == -1) {
                            temp62FR.push(tpidtcid);


                            if (feedback.getFRByPIdRId[projectID + "-" + roleId] == undefined) {
                                feedback.getFRByPIdRId[projectID + "-" + roleId] = new Array();
                                feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }

                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp71FR) == -1) {
                            temp71FR.push(tpidtcid);


                            if (feedback.getFRByPIdTId[projectID + "-" + testerId] == undefined) {
                                feedback.getFRByPIdTId[projectID + "-" + testerId] = new Array();
                                feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }
                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp72FR) == -1) {
                            temp72FR.push(tpidtcid);


                            if (feedback.getFRByPIdTId[projectID + "-" + testerId] == undefined) {
                                feedback.getFRByPIdTId[projectID + "-" + testerId] = new Array();
                                feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }

                    if (fbType == "0") {
                        if ($.inArray(tpidtcid, temp81FR) == -1) {
                            temp81FR.push(tpidtcid);


                            if (feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] == undefined) {
                                feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] = new Array();
                                feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": '',
                                    "testcaseName": "N/A",
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }
                    else if (fbType == "1") {
                        if ($.inArray(tpidtcid, temp82FR) == -1) {
                            temp82FR.push(tpidtcid);


                            if (feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] == undefined) {
                                feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] = new Array();
                                feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack
                                });
                            }
                            else {

                                feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                    "testPassId": testPassId,
                                    "testPassName": testPassName,
                                    "testcaseId": testcaseId,
                                    "testcaseName": testcaseName,
                                    "testerId": testerId,
                                    "testerName": testerName,
                                    "roleId": roleId,
                                    "roleName": roleName,
                                    "rating": rating,
                                    "feedBack": feedBack

                                });

                            }
                        }
                    }





                }
            }

        }
    }
,
    OnTesterChange: function () {
        var tempRoleArrFTS = new Array();
        $("#feedbackGrid").empty();
        $("#testPassCount").hide();
        $("#roleSelect").empty();
        //$("#roleSelect").append('<option value="0">Select Role</option>');
        $("#roleSelect").append('<option value="0">Select ' + feedback.rsRole + '</option>');//added by Mohini for resource file
        if ($("#testerSelect").val() != '0') {
            if (!feedback.isPortfolioOn) {
                var projectID = $("#projSelect option:selected").val();
            }
            else {
                var projectID = $("#versionSelect option:selected").val();
            }
            var roles = feedback.getRoleIdByTesterIdFTS[projectID + "-" + $("#testPasSelect option:selected").val() + "-" + $("#testerSelect option:selected").val()];
            if (roles != undefined) {
                for (var i = 0; i < roles.length; i++) {

                    if ($.inArray(roles[i].roleName, tempRoleArrFTS) == -1) {
                        tempRoleArrFTS.push(roles[i].roleName);
                        temp = '<option title="' + roles[i].roleName + '" value="' + roles[i].roleId + '">' + trimText(roles[i].roleName, 16) + '</option>';
                        $("#roleSelect").append(temp);
                    }
                }
            }
        }
        else {
            $("#feedbackGrid").empty();

        }
    },
    OnTestPassChange: function () {
        feedback.rolesForTester.length = 0;
        $("#feedbackGrid").empty();
        $("#testPassCount").hide();
        var temp = '';
        var TesterQuery = '';
        $("#testerSelect").empty();
        $("#roleSelect").empty();
        // $("#roleSelect").append('<option value="0">Select Role</option>');
        $("#roleSelect").append('<option value="0">Select ' + feedback.rsRole + '</option>');//added by Mohini for resource file

        var tempTesterArrFTS = new Array();

        if ($("#projSelect").val() != 0 && $("#testPasSelect").val() != 0) {
            var temp = '';

            var TesterItems = feedback.getTesterIdByTestpassIdFTS[$("#testPasSelect option:selected").val()];

            if ((TesterItems != undefined) && (TesterItems != null) || $('#testPasSelect option:selected').text() == 'Select Test Pass') {
                for (var ii = 0; ii < TesterItems.length; ii++) {

                    if ($.inArray(TesterItems[ii].testerName, tempTesterArrFTS) == -1) {
                        tempTesterArrFTS.push(TesterItems[ii].testerName);
                        temp = '<option title="' + TesterItems[ii].testerName + '" value="' + TesterItems[ii].testerId + '">' + trimText(TesterItems[ii].testerName, 16) + '</option>';
                        $("#testerSelect").append(temp);
                        //feedback.SPUserIDs.push(spUserID);
                    }
                }

                feedback.OnTesterChange();
            }
            else {
                //$("#testerSelect").append('<option>No Tester</option>');
                $("#testerSelect").append('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
                $("#roleSelect").empty();
                //$("#roleSelect").append('<option>No Role</option>');
                $("#roleSelect").append('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file
                $("#feedbackGrid").empty();

            }
        }
        else {
            //$("#testerSelect").append('<option>Select Tester</option>');
            $("#testerSelect").append('<option value="0">Select ' + feedback.rsTester + '</option>'); //Added by Mohini for Resource file

            $("#feedbackGrid").empty();
        }
    },

    //////////////////////////////  Added For Test Case View  ///////////////////////////////////////////////////////////////////////////////////////////////
    rolesForSPUserIDTCView: new Array(),
    aliasForSPUserIDTCView: new Array(),
    TesteFullNameForSPUserIDTCView: new Array(),
    TestPassNameForTPIDTCView: new Array(),
    childItemsTCView: new Array(),
    startIndexTCView: 0,
    EiTCView: 0,
    flagTCView: 0,
    forTPIDGetFRConfg: new Array(),
    flagForTestCase: 0,
    showTestPassForTCView: function () {
        //Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
        var tempTestPassArrFTP = new Array();
        var tempVerArr = new Array();

        if (feedback.isPortfolioOn) {
            var data = feedback.getVerByProjName[$('#projSelectTC option:selected').attr('title')];
            var NoOfVer = 0;
            if (data != undefined)
                NoOfVer = data.length;
            var verOptions = '';

            for (var i = 0; i < NoOfVer; i++) {
                if ($.inArray(data[i].projectVersion, tempVerArr) == -1) {
                    tempVerArr.push(data[i].projectVersion);
                    verOptions += '<option value="' + data[i].projectId + '">' + data[i].projectVersion + '</option>'
                }
            }

            if (verOptions == "")
                verOptions = '<option >Default ' + feedback.rsVersion + '</option>';

            $("#versionSelectTC").html(verOptions);
            //End of Code for Portfolio changes :Ejaz Waquif DT:1/23/2014
        }

        $("#feedbackGridTC").empty();
        $("#testCaseCount").hide();
        $("#testerSelectTC").empty();
        $("#testPasSelectTC").empty();
        $("#roleSelectTC").empty();

        var temp = '';
        var ScenarioName = '';
        var ScenarioList = '';
        var ScenarioQuery = '';
        var ScenarioItems = '';
        //if($("#projSelectTC").val() != -1 && $("#projSelectTC").val() != "Select Project" && $('#projSelectTC option:selected').text() != "Select Project")
        if ($('#projSelectTC option:selected').text() == "Select " + feedback.rsProject) {
            $("#testPasSelectTC").html('<option value="0">Select ' + feedback.rstestPass + '</option>');//added by Mohini for resource file
            $("#testerSelectTC").html('<option>Select ' + feedback.rsTester + '</option>');//added by Mohini for resource file
            $("#roleSelectTC").html('<option>Select ' + feedback.rsRole + '</option>');//added by Mohini for resource file
            $("#versionSelectTC").html('<option>Select ' + feedback.rsVersion + '</option>');

        }
        else if ($("#projSelectTC").val() != -1 && $("#projSelectTC").val() != "Select " + feedback.rsProject && $('#projSelectTC option:selected').text() != "Select " + feedback.rsProject)//Added by Mohini for resource file
        {
            if (!feedback.isPortfolioOn) {
                var projectID = $("#projSelectTC option:selected").val();
            }
            else {
                var projectID = $("#versionSelectTC option:selected").val();
            }

            var tpItems = feedback.getTestPassIdByProjectId[projectID];
            if ((tpItems != undefined) && (tpItems != null)) {
                //var temp ='<option value="0">All Test Passes</option>';
                var temp = '<option value="0">All ' + feedback.rstestPass + '</option>';//Added by Mohini for resource file
                $("#testPasSelectTC").append(temp);
                for (var ii = 0; ii < tpItems.length ; ii++) {
                    if (tpItems[ii].testPassName != "") {
                        if ($.inArray(tpItems[ii].testPassName, tempTestPassArrFTP) == -1) {
                            tempTestPassArrFTP.push(tpItems[ii].testPassName);

                            temp = '<option title="' + tpItems[ii].testPassName + '" value="' + tpItems[ii].testPassId + '">' + trimText(tpItems[ii].testPassName.toString(), 20) + '</option>';
                            $("#testPasSelectTC").append(temp);
                        }
                    }
                }
            }
            else /* Added by shilpa for bug 5145 */ {
                //$("#testPasSelectTC").html('<option value="0">No Test Pass</option>');
                // $("#testerSelectTC").html('<option>No Tester</option>');
                //$("#roleSelectTC").html('<option>No Role</option>');  // Added for bug 6025
                $("#testPasSelectTC").html('<option value="0">No ' + feedback.rstestPass + '</option>');//added by Mohini for resource file
                $("#testerSelectTC").html('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
                $("#roleSelectTC").html('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file
            }
            //if($('#projSelectTC option:selected').text()=='Select Project' || $('#testPasSelectTC option:selected').text()=='Select Test Pass')
            if ($('#projSelectTC option:selected').text() == 'Select ' + feedback.rsProject || $('#testPasSelectTC option:selected').text() == 'Select ' + feedback.rstestPass) {
                $("#feedbackGridTC").empty();
                $("#testPassCount").empty();
            }
            feedback.showTestersForTCView();
        }
        else {
            /*$("#testerSelectTC").html('<option>Select Tester</option>');
            $("#testPasSelectTC").html('<option>Select Test Pass</option>');
            $("#roleSelectTC").html('<option>Select Role</option>');*/
            $("#testPasSelectTC").html('<option value="0">No ' + feedback.rstestPass + '</option>');//added by Mohini for resource file
            $("#testerSelectTC").html('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
            $("#roleSelectTC").html('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file

        }
    },

    changeTestPass: function () {
        $("#feedbackGridTC").empty();
        $("#testCaseCount").hide();
        $("#testerSelectTC").empty();
        $("#testPasSelectTC").empty();
        $("#roleSelectTC").empty();

        var temp = '';
        var ScenarioName = '';
        var ScenarioList = '';
        var ScenarioQuery = '';
        var ScenarioItems = '';

        var tempVerTesterArrFTP = new Array();

        if (!feedback.isPortfolioOn) {
            var projID = $("#projSelectTC option:selected").val();
        }
        else {
            var projID = $("#versionSelectTC option:selected").val();
        }


        if ($("#projSelectTC").val() != -1 && $("#projSelectTC").val() != "Select Project" && $('#projSelectTC option:selected').text() != "Select Project") {

            var tpItemsVer = feedback.getTestPassIdByProjectId[projID];
            if ((tpItemsVer != undefined) && (tpItemsVer != null)) {
                //var temp ='<option value="0">All Test Passes</option>';
                var temp = '<option value="0">All ' + feedback.rstestPass + '</option>';//Added by Mohini for resource file
                $("#testPasSelectTC").append(temp);
                for (var ii = 0; ii < tpItemsVer.length ; ii++) {
                    if (tpItemsVer[ii].testPassName != "") {
                        if ($.inArray(tpItemsVer[ii].testPassName, tempVerTesterArrFTP) == -1) {
                            tempVerTesterArrFTP.push(tpItemsVer[ii].testPassName);

                            temp = '<option title="' + tpItemsVer[ii].testPassName + '" value="' + tpItemsVer[ii].testPassId + '">' + trimText(tpItemsVer[ii].testPassName.toString(), 16) + '</option>';
                            $("#testPasSelectTC").append(temp);
                        }
                    }
                }
            }
            else /* Added by shilpa for bug 5145 */ {
                //$("#testPasSelectTC").html('<option value="0">No Test Pass</option>');
                // $("#testerSelectTC").html('<option>No Tester</option>');
                //$("#roleSelectTC").html('<option>No Role</option>');  // Added for bug 6025
                $("#testPasSelectTC").html('<option value="0">No ' + feedback.rstestPass + '</option>');//added by Mohini for resource file
                $("#testerSelectTC").html('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
                $("#roleSelectTC").html('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file
            }
            //if($('#projSelectTC option:selected').text()=='Select Project' || $('#testPasSelectTC option:selected').text()=='Select Test Pass')
            if ($('#projSelectTC option:selected').text() == 'Select ' + feedback.rsProject || $('#testPasSelectTC option:selected').text() == 'Select ' + feedback.rstestPass) {
                $("#feedbackGridTC").empty();
                $("#testPassCount").empty();
            }
            feedback.showTestersForTCView();
        }
        else {
            /*$("#testerSelectTC").html('<option>Select Tester</option>');
            $("#testPasSelectTC").html('<option>Select Test Pass</option>');
            $("#roleSelectTC").html('<option>Select Role</option>');*/
            $("#testPasSelectTC").html('<option value="0">No ' + feedback.rstestPass + '</option>');//added by Mohini for resource file
            $("#testerSelectTC").html('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
            $("#roleSelectTC").html('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file

        }

    },


    showTestersForTCView: function () {
        var temp1 = '';
        var temp2 = '';
        var temp3 = '';
        var temp4 = '';
        var temp5 = '';
        var temp6 = '';

        var tempTesterArr = new Array();
        var tempRoleArr = new Array();

        feedback.rolesForSPUserIDTCView.length = 0;
        $("#feedbackGridTC").empty();
        $("#testCaseCount").hide();
        $("#testerSelectTC").empty();
        $("#roleSelectTC").empty();

        if (!feedback.isPortfolioOn) {
            var projectID = $("#projSelectTC option:selected").val();
        }
        else {
            var projectID = $("#versionSelectTC option:selected").val();
        }


        var tpItemsDrill = feedback.getTestPassIdByProjectIdForTesterAndRole[projectID];

        if ($("#testPasSelectTC option:selected").val() == 0 && tpItemsDrill != null && tpItemsDrill != undefined) {
            temp1 = '<option value="0">All ' + feedback.rsTester + '</option>';//Added by Mohini for resource file
            $("#testerSelectTC").append(temp1);

            $("#roleSelectTC").append('<option value="0">All ' + feedback.rsRole + '</option>');//Added by Mohini for resource file  

            for (var hh = 0; hh < tpItemsDrill.length; hh++) {
                if (tpItemsDrill[hh].testerName != "") {
                    if ($.inArray(tpItemsDrill[hh].testerName, tempTesterArr) == -1) {
                        tempTesterArr.push(tpItemsDrill[hh].testerName);

                        temp2 = '<option title="' + tpItemsDrill[hh].testerName + '" value="' + tpItemsDrill[hh].testerId + '">' + trimText(tpItemsDrill[hh].testerName, 16) + '</option>';
                        $("#testerSelectTC").append(temp2);
                    }

                    if ($.inArray(tpItemsDrill[hh].roleName, tempRoleArr) == -1) {
                        tempRoleArr.push(tpItemsDrill[hh].roleName);

                        temp3 = '<option title="' + tpItemsDrill[hh].roleName + '" value="' + tpItemsDrill[hh].roleId + '">' + trimText(tpItemsDrill[hh].roleName, 16) + '</option>';
                        $("#roleSelectTC").append(temp3);
                    }
                }

            } //end of for loop

            //For checking whether the testers/roles are not available 
            if (tempTesterArr.length == 0 && tempRoleArr.length == 0) {
                $("#testerSelectTC").html('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
                $("#roleSelectTC").html('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file		
            }
        }
        else {
            var TesterItems = feedback.getTesterIdByTestpassId[$("#testPasSelectTC option:selected").val()];
            if (TesterItems != null && TesterItems != undefined) {
                var roleIDs = new Array();
                temp4 = '<option value="0">All ' + feedback.rsTester + '</option>';//Added by Mohini for resource file
                $("#testerSelectTC").append(temp4);
                $("#roleSelectTC").append('<option value="0">All ' + feedback.rsRole + '</option>');//Added by Mohini for resource file  
                var index = 1;
                var TesterSPUserIDs = new Array();
                for (var hh = 0; hh < TesterItems.length; hh++) {
                    if ($.inArray(TesterItems[hh].roleId, roleIDs) == -1)
                        roleIDs.push(TesterItems[hh].roleId);

                    if ($.inArray(TesterItems[hh].testerName, tempTesterArr) == -1) {
                        tempTesterArr.push(TesterItems[hh].testerName);

                        temp5 = '<option title="' + TesterItems[hh].testerName + '" value="' + TesterItems[hh].testerId + '">' + trimText(TesterItems[hh].testerName, 16) + '</option>';
                        $("#testerSelectTC").append(temp5);
                    }

                    if ($.inArray(TesterItems[hh].roleName, tempRoleArr) == -1) {
                        tempRoleArr.push(TesterItems[hh].roleName);

                        temp6 = '<option title="' + TesterItems[hh].roleName + '" value="' + TesterItems[hh].roleId + '">' + trimText(TesterItems[hh].roleName, 16) + '</option>';
                        $("#roleSelectTC").append(temp6);
                    }


                    /* temp = '<option title="'+TesterItems[hh].testerName+'" value="'+TesterItems[hh].testerId+'">'+trimText(TesterItems[hh].testerName,16)+'</option>';
                     $("#testerSelectTC").append(temp);
                                                                                                            
                     temp = '<option title="'+TesterItems [hh].roleName+'" value="'+TesterItems [hh].roleId+'">'+trimText(TesterItems [hh].roleName,16)+'</option>';
                     $("#roleSelectTC").append(temp);	*/
                }
            }
            else {
                $("#testerSelectTC").html('<option>No ' + feedback.rsTester + '</option>');//added by Mohini for resource file
                $("#roleSelectTC").html('<option>No ' + feedback.rsRole + '</option>');//added by Mohini for resource file

            }
        }

    },
    showRolesForTCView: function () {
        if (!feedback.isPortfolioOn) {
            var projectID = $("#projSelectTC option:selected").val();
        }
        else {
            var projectID = $("#versionSelectTC option:selected").val();
        }

        var temp4 = '';
        var temp5 = '';

        var tempRoleRArr = new Array();

        $("#feedbackGridTC").empty();
        $("#testCaseCount").hide();
        $("#roleSelectTC").empty();
        //$("#roleSelectTC").append('<option value="0">All Tester</option>');
        $("#roleSelectTC").append('<option value="0">All ' + feedback.rsRole + '</option>');//added by Mohini for resource file


        //To handle four scenarios and call according arrays
        if ($("#testPasSelectTC").val() == 0) {

            if ($("#testerSelectTC").val() == 0) {
                var roles = new Array();

                roles = feedback.getTestPassIdByProjectIdForTesterAndRole[projectID];
                //var roleIDs = new Array();
                for (var ii = 0; ii < roles.length; ii++) {
                    if (roles[ii].roleName != "") {
                        if ($.inArray(roles[ii].roleName, tempRoleRArr) == -1) {
                            tempRoleRArr.push(roles[ii].roleName);

                            temp4 = '<option title="' + roles[ii].roleName + '" value="' + roles[ii].roleId + '">' + trimText(roles[ii].roleName, 16) + '</option>';
                            $("#roleSelectTC").append(temp4);

                        }
                    }
                }
            }
            else {
                var RoleItems = new Array();

                RoleItems = feedback.getRoleIdByPIdTesterId[projectID + "-" + $("#testerSelectTC option:selected").val()];

                if (RoleItems != null && RoleItems != undefined) {
                    for (var i = 0; i < RoleItems.length; i++) {
                        if ($.inArray(RoleItems[i].roleName, tempRoleRArr) == -1) {
                            tempRoleRArr.push(RoleItems[i].roleName);

                            temp5 = '<option title="' + RoleItems[i].roleName + '" value="' + RoleItems[i].roleId + '">' + trimText(RoleItems[i].roleName, 16) + '</option>';
                            $("#roleSelectTC").append(temp5);
                        }
                    }
                }
            }
        }
        else {

            if ($("#testerSelectTC").val() == 0) {
                var roles = new Array();
                roles = feedback.getTesterIdByTestpassId[$("#testPasSelectTC option:selected").val()];
                //var roleIDs = new Array();
                for (var ii = 0; ii < roles.length; ii++) {

                    if ($.inArray(roles[ii].roleName, tempRoleRArr) == -1) {
                        tempRoleRArr.push(roles[ii].roleName);

                        temp4 = '<option title="' + roles[ii].roleName + '" value="' + roles[ii].roleId + '">' + trimText(roles[ii].roleName, 16) + '</option>';
                        $("#roleSelectTC").append(temp4);

                    }
                }
            }
            else {
                var RoleItems = new Array();
                RoleItems = feedback.getRoleIdByTesterId[projectID + "-" + $("#testPasSelectTC option:selected").val() + "-" + $("#testerSelectTC option:selected").val()];

                if (RoleItems != null && RoleItems != undefined) {
                    for (var i = 0; i < RoleItems.length; i++) {

                        if ($.inArray(RoleItems[i].roleName, tempRoleRArr) == -1) {
                            tempRoleRArr.push(RoleItems[i].roleName);

                            temp5 = '<option title="' + RoleItems[i].roleName + '" value="' + RoleItems[i].roleId + '">' + trimText(RoleItems[i].roleName, 16) + '</option>';
                            $("#roleSelectTC").append(temp5);
                        }

                    }
                }
            }
        }



    },
    //To show tp grid data
    showTestCase: function () {

        feedback.FillTestPassTabArrays();

        if (!feedback.isPortfolioOn) {
            var projectID = $("#projSelectTC option:selected").val();
        }
        else {
            var projectID = $("#versionSelectTC option:selected").val();
        }


        feedback.startIndexTCView = 0;
        feedback.childItemsTCView.length = 0;
        feedback.feed.length = 0;
        var feedAvail = 0;
        var index = 0;
        if ($("#projSelectTC").val() == -1) {
            $("#feedbackGridTC").empty();
            $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rsProject.toLowerCase() + '.</b></div>');//Added by Mohini for resource flie
            Main.hideLoading();
        }
            //else if($("#testPasSelectTC").text() == "No Test Pass")
        else if ($("#testPasSelectTC").text() == "No " + feedback.rstestPass)//Added By Mohini for resource file
        {
            $("#feedbackGridTC").empty();

            $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rstestPass + ' available in ' + feedback.rsProject + '.</b></div>');//added by Mohini For resource file
            Main.hideLoading();
        }
        else if ($("#testerSelectTC").text() == "No " + feedback.rsTester)//Added By Mohini for resource file
        {
            $("#feedbackGridTC").empty();

            $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rsTester + ' available.</b></div>');//added by Mohini For resource file
            Main.hideLoading();
        }
        else {
            var testPassId = '';
            feedback.flagForTestCase = 1;


            var FeedbackRatingItems = '';


            if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() == 0)
                FeedbackRatingItems = feedback.getFRByTPId[$('#testPasSelectTC option:selected').val()];

            else if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() != 0)
                FeedbackRatingItems = feedback.getFRByTPIdRId[$('#testPasSelectTC option:selected').val() + "-" + $('#roleSelectTC option:selected').val()];

            else if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() == 0)
                FeedbackRatingItems = feedback.getFRByTPIdTId[$('#testPasSelectTC option:selected').val() + "-" + $('#testerSelectTC option:selected').val()];

            else if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() != 0)
                FeedbackRatingItems = feedback.getFRByTPIdTIdRId[$('#testPasSelectTC option:selected').val() + "-" + $('#testerSelectTC option:selected').val() + "-" + $('#roleSelectTC option:selected').val()];

            else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() == 0)
                FeedbackRatingItems = feedback.getFRByPId[projectID];

            else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() != 0)
                FeedbackRatingItems = feedback.getFRByPIdRId[projectID + "-" + $('#roleSelectTC option:selected').val()];

            else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() == 0)
                FeedbackRatingItems = feedback.getFRByPIdTId[projectID + "-" + $('#testerSelectTC option:selected').val()];

            else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() != 0)
                FeedbackRatingItems = feedback.getFRByPIdTIdRId[projectID + "-" + $('#testerSelectTC option:selected').val() + "-" + $('#roleSelectTC option:selected').val()];




            if (FeedbackRatingItems != null && FeedbackRatingItems != undefined) {
                var gridv = '';
                for (var ii = 0; ii < FeedbackRatingItems.length; ii++) {
                    var testPassName = FeedbackRatingItems[ii].testPassName;
                    //var Tester = feedback.aliasForSPUserIDTCView[ FeedbackRatingItems[ii]['SPUserID'] ]; 
                    var Tester = FeedbackRatingItems[ii].testerName;
                    var role = FeedbackRatingItems[ii].roleName;
                    var rating = FeedbackRatingItems[ii].rating;

                    if (rating == 1)
                        rating = "Very Satisfied";
                    else if (rating == 2)
                        rating = "Very Dis-satisfied";
                    else if (rating == 3)
                        rating = "Somewhat Satisfied";
                    else if (rating == 4)
                        rating = "Somewhat Dis-satisfied";


                    var feed = FeedbackRatingItems[ii].feedBack;
                    var TestCaseName = FeedbackRatingItems[ii].testcaseName;
                    gridv = '<tbody><tr>' +
									'<td title="' + testPassName + '">' + testPassName + '</td>';
                    if (feedback.flagForTestCase == 1) {
                        if (FeedbackRatingItems[ii].testcaseName != undefined)
                            gridv += '<td>' + FeedbackRatingItems[ii].testcaseName + '</td>';
                        else
                            gridv += '<td>N/A</td>';
                    }
                    gridv += '<td >' + Tester + '</td>';
                    gridv += '<td title="' + role + '">' + role + '</td>';
                    gridv += '<td title="' + rating + '">' + rating + '</td>';
                    if (feed != undefined && feed != "") {
                        var feed2 = feedback.filterData(feed);
                        gridv += '<td style="cursor:pointer" onclick="feedback.openPPForTCView(' + index + ');">' + feed2 + '</td>';
                        feedback.feed.push(feed);
                    }
                    else {
                        gridv += '<td>N/A</td>';
                        feedback.feed.push("N/A");
                    }
                    gridv += '</tr>';
                    feedback.childItemsTCView.push(gridv);
                    index++;
                }
                feedAvail = 1;
            }

            if (feedAvail == 1)
                feedback.showFeedbackFromBufferTCView();
            else {
                $('#testCaseCount').empty();
                $("#feedbackGridTC").empty();
                $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rsRating + ' available.</b></div>');//Added by mohini for resource file
            }
        }
        Main.hideLoading();
    },
    feed: new Array(),
    openPPForTCView: function (i) {
        document.getElementById('hdn' + 'rte2').value = "";
        //enableDesignMode("rte1", "", false);
        enableDesignMode("rte2", feedback.feed[i], false);
        $('#popUpRTETCView').dialog({ height: 550, width: 550, resizable: false, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
        $("#rteDiv1").attr('disabled', 'disabled');
        $("#Buttons2_rte2 tbody").find("img").removeAttr("onclick");
        enableDesignMode("rte2", feedback.feed[i], false);
    },
    showFeedbackFromBufferTCView: function () {
        $("#feedbackGridTC").empty();
        $("#testCaseCount").show();
        if (feedback.childItemsTCView.length >= (feedback.startIndexTCView + 10))
            feedback.EiTCView = (feedback.startIndexTCView + 10);
        else
            feedback.EiTCView = feedback.childItemsTCView.length;

        var gridv = "";
        if (feedback.flagForTestCase == 1) {
            /*******Added by Mohini for resource file****/
            gridv += '<table class="gridDetails" cellspacing="0" style="table-layout:fixed;word-wrap:break-word;"><thead><tr>' +
            '<td class="tblhd" width="14%">' + feedback.rstestPass + '</td>' +
            '<td class="tblhd" width="18%">' + feedback.rsTestCase + '</td>' +
            '<td class="tblhd" width="14%">' + feedback.rsTester + '</td>' +
            '<td class="tblhd" width="12%">' + feedback.rsRole + '</td>' +
            '<td class="tblhd" width="12%">' + feedback.rsRating + '</td>' +
            '<td class="tblhd" width="30%">' + feedback.rsfeedback + '</td></tr></thead>';

        }
        else {
            /*******Added by Mohini for resource file****/
            gridv += '<table class="gridDetails" cellspacing="0" style="table-layout:fixed;word-wrap:break-word;"><thead><tr>' +
            '<td class="tblhd" width="20%">' + feedback.rstestPass + '</td>' +
            '<td class="tblhd" width="13%">' + feedback.rsTester + '</td>' +
            '<td class="tblhd" width="15%">' + feedback.rsRole + '</td>' +
            '<td class="tblhd" width="12%">' + feedback.rsRating + '</td>' +
            '<td class="tblhd" width="40%">' + feedback.rsfeedback + '</td></tr></thead>';
        }
        for (var s = feedback.startIndexTCView; s < feedback.EiTCView; s++) {
            gridv += feedback.childItemsTCView[s];
        }

        var info = '<label>Showing ' + (feedback.startIndexTCView + 1) + '-' + feedback.EiTCView + ' record(s) of Total ' + feedback.childItemsTCView.length + ' record(s)</label> | <a id="previousTCView" style="cursor:pointer" onclick="feedback.startIndexDecrementTCView();feedback.showFeedbackFromBufferTCView()">Previous</a> | <a  id="nextTCView" style="cursor:pointer" onclick="feedback.startIndexIncrementTCView();feedback.showFeedbackFromBufferTCView()">Next</a>';
        $('#testCaseCount').empty();
        $("#testCaseCount").append(info);
        if (feedback.startIndexTCView <= 0) {
            document.getElementById('previousTCView').disabled = "disabled";
            document.getElementById('previousTCView').style.color = "#989898";

        }
        else {
            document.getElementById('previousTCView').disabled = false;

        }
        if (feedback.EiTCView >= feedback.childItemsTCView.length) {
            document.getElementById('nextTCView').disabled = "disabled";
            document.getElementById('nextTCView').style.color = "#989898";
            feedback.flagTCView = 1;
        }
        else {
            document.getElementById('nextTCView').disabled = false;
            feedback.flagTCView = 0;
        }

        gridv += '</tbody></table>';
        //alert(gridv);
        $("#feedbackGridTC").append(gridv);
        //resource.UpdateTableHeaderText();//Added by Mohini for Resource file

    },
    /* Function to perform to increment the index in paging */
    startIndexIncrementTCView: function () {
        if (feedback.flagTCView == 0)
            feedback.startIndexTCView += 10;


    },

    /* Function to perform to decrement the index in paging */
    startIndexDecrementTCView: function () {
        if (feedback.startIndexTCView >= 10)
            feedback.startIndexTCView -= 10;


    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    arrFRConfgForTPID: new Array(),
    GetTestPassonProjectChange: function () {
        feedback.rolesForTester.length = 0;
        $("#feedbackGrid").empty();
        $("#testPassCount").hide();
        $("#testerSelect").empty();
        //$("#testerSelect").html('<option>Select Tester</option>');
        $("#testerSelect").html('<option>Select ' + feedback.rsTester + '</option>');//Added by Mohini for resource file
        $("#testPasSelect").empty();
        //$("#testPasSelect").html('<option value="0">Select Test Pass</option>');
        $("#testPasSelect").html('<option value="0">Select ' + feedback.rstestPass + '</option>');//Added by Mohini for resource file
        $("#roleSelect").empty();
        // $("#roleSelect").html('<option value="0">Select Role</option>');
        $("#roleSelect").html('<option value="0">Select ' + feedback.rsRole + '</option>');//Added by Mohini for resource file


        var temp = '';
        var ScenarioName = '';
        var ScenarioList = '';
        var ScenarioQuery = '';
        var ScenarioItems = '';
        var ProjID = '';
        var tempTestPassArrFTS = new Array();

        if (!feedback.isPortfolioOn) {
            var ProjID = $("#projSelect option:selected").val();
        }
        else {
            var ProjID = $("#versionSelect option:selected").val();
        }


        if (ProjID != 0) {

            var tpItems = feedback.getTestPassIdByProjectIdFTS[ProjID];
            if ((tpItems != undefined) && (tpItems != null)) {
                for (var ii = 0; ii < tpItems.length ; ii++) {
                    if ($.inArray(tpItems[ii].testPassName, tempTestPassArrFTS) == -1) {
                        tempTestPassArrFTS.push(tpItems[ii].testPassName);
                        temp = '<option title="' + tpItems[ii].testPassName + '" value="' + tpItems[ii].testPassId + '">' + trimText(tpItems[ii].testPassName.toString(), 20) + '</option>';
                        $("#testPasSelect").append(temp);
                    }
                }
            }
            else /* Added by shilpa for bug 5145 */ {

                /*****Added by Mohini for resource file*****/
                $("#testPasSelect").html('<option value="0">No ' + feedback.rstestPass + '</option>');
                $("#testerSelect").html('<option>No ' + feedback.rsTester + '</option>');
                $("#roleSelect").html('<option>No ' + feedback.rsRole + '</option>');

            }
            //if($('#projSelect option:selected').text()=='Select Project' || $('#testPasSelect option:selected').text()=='Select Test Pass')
            if ($('#projSelect option:selected').text() == 'Select ' + feedback.rsProject || $('#testPasSelect option:selected').text() == 'Select ' + feedback.rstestPass)//added by Mohini for resource file
            {
                $("#feedbackGrid").empty();
                $("#testPassCount").empty();
            }
        }
    },
    //Added by HRW
    showTestStep: function () {

        //To read the filtered test step data according to selected dropdowns

        feedback.startIndex = 0;


        if ($('#testerSelect option:selected').val() == _spUserId)  //_spUserId
        {
            feedback.FillTestStepTabArrays();
            feedback.showTesterFeedbackGrd();
        }
        else {
            feedback.FillTestStepTabArraysFNT();
            feedback.showFeedback();
        }
        Main.hideLoading();
    },

    arrshowTesterFeedbackGrd: new Array(),
    feedbackratingType: '',

    FeedbackRatingForTestStep: new Array(),
    DrillFeedbackRatingForTestStep: new Array(),
    getFRByTPIdTIdRIdForTestStep: new Array(),

    FillTestStepTabArrays: function () {
        if (!feedback.isPortfolioOn) {
            var projectID = $("#projSelect option:selected").val();
        }
        else {
            var projectID = $("#versionSelect option:selected").val();
        }

        var projectName = '';

        var testPassName = '';
        var testPassId = '';
        var testerId = '';
        var testerName = '';
        var roleId = '';
        var roleName = '';
        var testStepId = '';
        var testStepName = ''
        var status = '';

        var testCaseId = '';
        var testCaseName = '';

        var actualResult = '';
        var expectedResult = '';
        var tsFeedback = '';


        var feedBack = '';

        var fbType = '';

        var testplanId = '';

        var tempForTestStep = new Array();

        feedback.getFRByTPIdTIdRIdForTestStep = [];

        var param = projectID +  "/1";

        feedback.FeedbackRatingForTestStep = ServiceLayer.GetData("GetFeedback", param, "Feedback");

        for (var i = 0; i < feedback.FeedbackRatingForTestStep.length; i++) {

            testcaseId = feedback.FeedbackRatingForTestStep[i].testcaseId;
            testcaseName = feedback.FeedbackRatingForTestStep[i].testcaseName;
            testerName = feedback.FeedbackRatingForTestStep[i].testerName;
            testerId = feedback.FeedbackRatingForTestStep[i].userId;
            testPassName = feedback.FeedbackRatingForTestStep[i].testpassName;
            testPassId = feedback.FeedbackRatingForTestStep[i].testpassId;

            feedback.DrillFeedbackRatingForTestStep = feedback.FeedbackRatingForTestStep[i].listTesterDetail;

            for (var j = 0; j < feedback.DrillFeedbackRatingForTestStep.length; j++) {

                roleId = feedback.DrillFeedbackRatingForTestStep[j].roleId;
                roleName = feedback.DrillFeedbackRatingForTestStep[j].roleName;

                //test Step data read
                testStepId = feedback.DrillFeedbackRatingForTestStep[j].testStepId;
                testStepName = feedback.DrillFeedbackRatingForTestStep[j].testStepName;
                status = feedback.DrillFeedbackRatingForTestStep[j].status;
                tsFeedback = feedback.DrillFeedbackRatingForTestStep[j].tsFeedback;
                testplanId = feedback.DrillFeedbackRatingForTestStep[j].testplanId;
                actualResult = feedback.DrillFeedbackRatingForTestStep[j].actualResult;
                expectedResult = feedback.DrillFeedbackRatingForTestStep[j].expectedResult;



                if (feedback.getFRByTPIdTIdRIdForTestStep[testPassId + "-" + testerId + "-" + roleId] == undefined) {
                    feedback.getFRByTPIdTIdRIdForTestStep[testPassId + "-" + testerId + "-" + roleId] = new Array();
                    feedback.getFRByTPIdTIdRIdForTestStep[testPassId + "-" + testerId + "-" + roleId].push({

                        "testPassId": testPassId,
                        "testPassName": testPassName,
                        "testcaseId": testcaseId,
                        "testcaseName": testcaseName,
                        "testerId": testerId,
                        "testerName": testerName,
                        "roleId": roleId,
                        "roleName": roleName,
                        "testStepId": testStepId,
                        "testStepName": testStepName,
                        "status": status,
                        "actualResult": actualResult,
                        "expectedResult": expectedResult,
                        "tsFeedback": tsFeedback,
                        "testplanId": testplanId

                    });
                }
                else {
                    feedback.getFRByTPIdTIdRIdForTestStep[testPassId + "-" + testerId + "-" + roleId].push({

                        "testPassId": testPassId,
                        "testPassName": testPassName,
                        "testcaseId": testcaseId,
                        "testcaseName": testcaseName,
                        "testerId": testerId,
                        "testerName": testerName,
                        "roleId": roleId,
                        "roleName": roleName,
                        "testStepId": testStepId,
                        "testStepName": testStepName,
                        "status": status,
                        "actualResult": actualResult,
                        "expectedResult": expectedResult,
                        "tsFeedback": tsFeedback,
                        "testplanId": testplanId


                    });
                }
            }
        }

    },

    FeedbackRatingForTestStepFNT: new Array(),
    DrillFeedbackRatingForTestStepFNT: new Array(),
    getFRByTPIdTIdRIdForTestStepFNT: new Array(),

    FillTestStepTabArraysFNT: function () {

        if (!feedback.isPortfolioOn) {
            var projectID = $("#projSelect option:selected").val();
        }
        else {
            var projectID = $("#versionSelect option:selected").val();
        }


        var projectName = '';

        var testPassName = '';
        var testPassId = '';
        var testerId = '';
        var testerName = '';
        var roleId = '';
        var roleName = '';
        var testStepId = '';
        var testStepName = ''
        var status = '';

        var testCaseId = '';
        var testCaseName = '';

        var actualResult = '';
        var expectedResult = '';
        var tsFeedback = '';


        var feedBack = '';

        var fbType = '';

        var testplanId = '';

        var tempForTestStep = new Array();

        feedback.getFRByTPIdTIdRIdForTestStepFNT = [];

        var param = projectID + "/1";

        feedback.FeedbackRatingForTestStepFNT = ServiceLayer.GetData("GetFeedback", param, "Feedback");

        for (var i = 0; i < feedback.FeedbackRatingForTestStepFNT.length; i++) {

            testcaseId = feedback.FeedbackRatingForTestStepFNT[i].testcaseId;
            testcaseName = feedback.FeedbackRatingForTestStepFNT[i].testcaseName;
            testerName = feedback.FeedbackRatingForTestStepFNT[i].testerName;
            testerId = feedback.FeedbackRatingForTestStepFNT[i].userId;
            testPassName = feedback.FeedbackRatingForTestStepFNT[i].testpassName;
            testPassId = feedback.FeedbackRatingForTestStepFNT[i].testpassId;

            feedback.DrillFeedbackRatingForTestStepFNT = feedback.FeedbackRatingForTestStepFNT[i].listTesterDetail;

            for (var j = 0; j < feedback.DrillFeedbackRatingForTestStepFNT.length; j++) {

                roleId = feedback.DrillFeedbackRatingForTestStepFNT[j].roleId;
                roleName = feedback.DrillFeedbackRatingForTestStepFNT[j].roleName;

                //test Step data read
                testStepId = feedback.DrillFeedbackRatingForTestStepFNT[j].testStepId;
                testStepName = feedback.DrillFeedbackRatingForTestStepFNT[j].testStepName;
                status = feedback.DrillFeedbackRatingForTestStepFNT[j].status;
                tsFeedback = feedback.DrillFeedbackRatingForTestStepFNT[j].tsFeedback;
                testplanId = feedback.DrillFeedbackRatingForTestStepFNT[j].testplanId;
                actualResult = feedback.DrillFeedbackRatingForTestStepFNT[j].actualResult;
                expectedResult = feedback.DrillFeedbackRatingForTestStepFNT[j].expectedResult;

                if (tsFeedback != "") {
                    if (feedback.getFRByTPIdTIdRIdForTestStepFNT[testPassId + "-" + testerId + "-" + roleId] == undefined) {
                        feedback.getFRByTPIdTIdRIdForTestStepFNT[testPassId + "-" + testerId + "-" + roleId] = new Array();
                        feedback.getFRByTPIdTIdRIdForTestStepFNT[testPassId + "-" + testerId + "-" + roleId].push({

                            "testPassId": testPassId,
                            "testPassName": testPassName,
                            "testcaseId": testcaseId,
                            "testcaseName": testcaseName,
                            "testerId": testerId,
                            "testerName": testerName,
                            "roleId": roleId,
                            "roleName": roleName,
                            "testStepId": testStepId,
                            "testStepName": testStepName,
                            "status": status,
                            "actualResult": actualResult,
                            "expectedResult": expectedResult,
                            "tsFeedback": tsFeedback,
                            "testplanId": testplanId

                        });
                    }
                    else {
                        feedback.getFRByTPIdTIdRIdForTestStepFNT[testPassId + "-" + testerId + "-" + roleId].push({

                            "testPassId": testPassId,
                            "testPassName": testPassName,
                            "testcaseId": testcaseId,
                            "testcaseName": testcaseName,
                            "testerId": testerId,
                            "testerName": testerName,
                            "roleId": roleId,
                            "roleName": roleName,
                            "testStepId": testStepId,
                            "testStepName": testStepName,
                            "status": status,
                            "actualResult": actualResult,
                            "expectedResult": expectedResult,
                            "tsFeedback": tsFeedback,
                            "testplanId": testplanId


                        });
                    }
                }
            }
        }

    },





    testStepListResult: new Array(),
    //popUpInformation:new Array(),  //For information for pop up 
    tsMappingTester: new Array(),
    tsMappingTsIdTester: new Array(),
    tsIndexTester: new Array(),

    showTesterFeedbackGrd: function () {

        var testStepId = '';
        var testStepName = '';
        var testcaseName = '';
        var status = '';
        var actualResult = '';
        var expectedResult = '';
        var tsFeedback = '';
        var anchText = 'Provide Feedback';
        feedback.arrshowTesterFeedbackGrd = [];
        feedback.tsIndexTester = [];
        feedback.tsMappingTester = [];
        feedback.tsMappingTsIdTester = [];
        var testplanId = '';

        feedback.testStepListResult = feedback.getFRByTPIdTIdRIdForTestStep[$("#testPasSelect option:selected").val() + "-" + $("#testerSelect option:selected").val() + "-" + $("#roleSelect option:selected").val()];

        if (feedback.testStepListResult != null && feedback.testStepListResult != undefined) {
            $("#feedbackGrid").empty();

            for (var y = 0; y < feedback.testStepListResult.length; y++) {

                testStepId = feedback.testStepListResult[y].testStepId;
                testStepName = feedback.testStepListResult[y].testStepName;
                testcaseName = feedback.replaceSplCharacters(feedback.testStepListResult[y].testcaseName);
                testcaseName = testcaseName.replace(/"/g, "&quot;");

                status = feedback.testStepListResult[y].status;
                actualResult = feedback.filterData(feedback.testStepListResult[y].actualResult);
                actualResult = feedback.replaceSplCharacters(actualResult);

                expectedResult = feedback.filterData(feedback.testStepListResult[y].expectedResult);
                expectedResult = feedback.replaceSplCharacters(expectedResult);

                tsFeedback = feedback.testStepListResult[y].tsFeedback;
                testplanId = feedback.testStepListResult[y].testplanId;


                ///////test step formatting removing chars etc
                testStepName = feedback.filterData(testStepName);
                testStepName = feedback.replaceSplCharacters(testStepName);
                testStepName = testStepName.replace(/"/g, "&quot;");


                feedback.tsMappingTester[testStepId] = new Array();
                feedback.tsMappingTester[testStepId].push({

                    "testStepId": testStepId,
                    "testStepName": testStepName,
                    "testcaseName": testcaseName,
                    "status": status,
                    "actualResult": actualResult,
                    "expectedResult": expectedResult,
                    "tsFeedback": tsFeedback,
                    "testplanId": testplanId

                });

                if (feedback.tsMappingTsIdTester == undefined) {
                    feedback.tsMappingTsIdTester = new Array();
                    feedback.tsMappingTsIdTester.push(testStepId);
                }
                else {
                    feedback.tsMappingTsIdTester.push(testStepId);
                }

                feedback.tsIndexTester[y] = new Array();
                feedback.tsIndexTester[y].push(testStepId);

                if (tsFeedback != "")
                    anchText = 'Edit Feedback';
                else
                    anchText = 'Provide Feedback';



                gridv = '<tbody><tr ><td class="center" width="1%" >' + testStepId + '</td>' +
                '<td class="" width="4%" title="' + testStepName + '">' + testStepName + '</td>' +
                '<td class="" width="4%" title="' + testcaseName + '">' + testcaseName + '</td>' +
                '<td class="center" width="2%">' + status + '</td>' +
                '<td class="center" width="2%"><div><a style="color:#0000FF;text-decoration:underline;cursor:pointer;" id="textAnchor' + testStepId + '" onclick="feedback.popForFeedbackFrTester(' + testStepId + ');">' + anchText + '</a></div></td>' +
                '</tr>';

                feedback.arrshowTesterFeedbackGrd.push(gridv);
            }

            feedback.showFeedbackFromBuffer();

        }
        else {
            $("#feedbackGrid").empty();
            if ($("#roleSelect").val() == "0") {
                $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rsRole + ' first.</b></div>');//Added by Mohini for resource file 
                $('#testPassCount').empty();
            }
            else {
                $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rsfeedback + ' available</b></div>');//Added by Mohini for resource file
                $('#testPassCount').empty();
            }
        }

    },
    replaceSplCharacters: function (str) {
        str = str.replace(/(\r\n)+/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return str;
    },
    //Added by HRW
    showFeedbackFromBuffer: function () {
        $("#feedbackGrid").empty();
        $("#testPassCount").show();
        if (feedback.arrshowTesterFeedbackGrd.length >= (feedback.startIndex + 10))
            feedback.Ei = (feedback.startIndex + 10);
        else
            feedback.Ei = feedback.arrshowTesterFeedbackGrd.length;

        /*var gridv="";
            gridv+='<table class="gridDetails" cellspacing="0"><thead><tr>'+
            '<td class="tblhd center" width="1%">Test ID</td>'+
            '<td class="tblhd center" width="4%">Test Step</td>'+
            '<td class="tblhd center" width="4%">Associated Test Case</td>'+
            '<td class="tblhd center" width="2%">Result</td>'+
            '<td class="tblhd  center" width="2%">Action</td></tr></thead>';*/

        /*******Added by Mohini for resource file*********/
        var gridv = "";
        gridv += '<table class="gridDetails" cellspacing="0"><thead><tr>' +
		'<td class="tblhd center" width="1%">Test ID</td>' +
		'<td class="tblhd center" width="4%">' + feedback.rsTestStep + '</td>' +
		'<td class="tblhd center" width="4%">' + feedback.rsassTC + '</td>' +
		'<td class="tblhd center" width="2%">Result</td>' +
		'<td class="tblhd  center" width="2%">' + feedback.rsAction + '</td></tr></thead>';


        for (var s = feedback.startIndex; s < feedback.Ei; s++) {
            gridv += feedback.arrshowTesterFeedbackGrd[s];
        }

        var info = '<label>Showing ' + (feedback.startIndex + 1) + '-' + feedback.Ei + ' record(s) of Total ' + feedback.arrshowTesterFeedbackGrd.length + ' record(s)</label> | <a id="previous" style="cursor:pointer" onclick="feedback.startIndexDecrement();feedback.showFeedbackFromBuffer()">Previous</a> | <a  id="next" style="cursor:pointer" onclick="feedback.startIndexIncrement();feedback.showFeedbackFromBuffer()">Next</a>';
        $('#testPassCount').empty();
        $("#testPassCount").append(info);
        if (feedback.startIndex <= 0) {
            document.getElementById('previous').disabled = "disabled";
            document.getElementById('previous').style.color = "#989898";

        }
        else {
            document.getElementById('previous').disabled = false;

        }
        if (feedback.Ei >= feedback.arrshowTesterFeedbackGrd.length) {
            document.getElementById('next').disabled = "disabled";
            document.getElementById('next').style.color = "#989898";
            feedback.flag = 1;
        }
        else {
            document.getElementById('next').disabled = false;
            feedback.flag = 0;
        }

        gridv += '</tbody></table>';
        //alert(gridv);
        $("#feedbackGrid").append(gridv);

    },
    arr: new Array(),
    testStepListResultMgr: new Array(),
    tsIndexMgr: new Array(),
    tsMappingTsIdMgr: new Array(),
    tsMappingMgr: new Array(),
    showFeedback: function () {

        feedback.tsIndexMgr = [];

        //feedback.tsMappingTsIdMgr=[];
        feedback.arr.length = 0;
        /*Get the info from TestPassToTestCaseMapping list for tester and test pass*/
        Main.showLoading();
        feedback.stepIDArrayMngr.length = 0;
        feedback.saveStepDetailsMngr.length = 0;
        feedback.stepIDArrayMngr.length = 0;
        feedback.stepIDArrayTester.length = 0;
        feedback.stepNameArrayTester.length = 0;
        feedback.caseNameArrayTester.length = 0;
        feedback.stepNameArrayMngr.length = 0;
        feedback.caseNameArrayMngr.length = 0;
        feedback.stepExpMngr.length = 0;
        feedback.stepActualMngr.length = 0;
        feedback.stepStatusMngr.length = 0;

        feedback.tsMappingTester = [];
        feedback.tsMappingTsIdMgr = [];


        $("#feedbackGrid").empty();
        $('#testPassCount').empty();
        if ($('#projSelect option:selected').val() == "0") {
            $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rsProject + ' first.</b></div>');//Added by Mohini for resource file
        }
        else if ($('#testPasSelect option:selected').val() == '0') {
            if ($('#testPasSelect option:selected').text() == "No " + feedback.rstestPass) {
                $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rstestPass + ' available in Project.</b></div>');///Added by Mohini for resource flie
            }
            else {
                $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rstestPass + ' first.</b></div>');///Added by Mohini for resource flie
            }
        }
        else if ($('#testerSelect option:selected').val() == '0') {
            $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rsTester + ' first.</b></div>');//Added by Mohini for resource flie                	
        }
        else if ($('#testerSelect option:selected').text() == "No " + feedback.rsTester) {
            $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rsTester + ' available in Test Pass.</b></div>');///Added by Mohini for resource flie
        }

        else if ($('#roleSelect option:selected').val() == '0') {
            $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rsRole + ' first.</b></div>');//Added by Mohini for resource flie			    	
        }
        else {
            var testStepId = '';
            var testStepName = '';
            var testcaseName = '';
            var status = '';
            var actualResult = '';
            var expectedResult = '';
            var tsFeedback = '';

            feedback.arr = [];

            feedback.testStepListResultMgr = feedback.getFRByTPIdTIdRIdForTestStepFNT[$("#testPasSelect option:selected").val() + "-" + $("#testerSelect option:selected").val() + "-" + $("#roleSelect option:selected").val()];

            if (feedback.testStepListResultMgr != null && feedback.testStepListResultMgr != undefined) {
                $("#feedbackGrid").empty();

                for (var y = 0; y < feedback.testStepListResultMgr.length; y++) {

                    testStepId = feedback.testStepListResultMgr[y].testStepId;
                    testStepName = feedback.testStepListResultMgr[y].testStepName;
                    testcaseName = feedback.replaceSplCharacters(feedback.testStepListResultMgr[y].testcaseName);
                    testcaseName = testcaseName.replace(/"/g, "&quot;");

                    status = feedback.testStepListResultMgr[y].status;
                    actualResult = feedback.filterData(feedback.testStepListResultMgr[y].actualResult);
                    actualResult = feedback.replaceSplCharacters(actualResult);

                    expectedResult = feedback.filterData(feedback.testStepListResultMgr[y].expectedResult);
                    expectedResult = feedback.replaceSplCharacters(expectedResult);

                    tsFeedback = feedback.testStepListResultMgr[y].tsFeedback;


                    ///////test step formatting removing chars etc
                    testStepName = feedback.filterData(testStepName);
                    testStepName = feedback.replaceSplCharacters(testStepName);
                    testStepName = testStepName.replace(/"/g, "&quot;");

                    feedback.tsMappingMgr[testStepId] = new Array();
                    feedback.tsMappingMgr[testStepId].push({

                        "testStepId": testStepId,
                        "testStepName": testStepName,
                        "testcaseName": testcaseName,
                        "status": status,
                        "actualResult": actualResult,
                        "expectedResult": expectedResult,
                        "tsFeedback": tsFeedback

                    });

                    if (feedback.tsMappingTsIdMgr == undefined) {
                        feedback.tsMappingTsIdMgr = new Array();
                        feedback.tsMappingTsIdMgr.push(testStepId);
                    }
                    else {
                        feedback.tsMappingTsIdMgr.push(testStepId);
                    }

                    feedback.tsIndexMgr[y] = new Array();
                    feedback.tsIndexMgr[y].push(testStepId);


                    grid = '<tbody><tr ><td class="center" width="1%" >' + testStepId + '</td>' +
                    '<td class="" width="4%" title="' + testStepName + '">' + testStepName + '</td>' +
                    '<td class="" width="4%" title="' + testcaseName + '">' + testcaseName + '</td>' +
                    '<td class="center" width="2%">' + status + '</td>' +
                    '<td class="center" width="2%"><div><a style="color:#0000FF;text-decoration:underline;cursor:pointer;" id="textAnchor' + testStepId + '" onclick="feedback.popForFeedbackFrMngr(' + testStepId + ');">Received Feedback</a></div></td>' +
                    '</tr>';

                    feedback.arr.push(grid);
                }

                feedback.showFeedbackFromBufferToManager();
            }
            else {
                $("#feedbackGrid").empty();
                $("#feedbackGrid").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rsfeedback + ' available</b></div>');//Added by Mohini for resource file
            }

        }

        window.setTimeout("Main.hideLoading()", 400);

    },

    showFeedbackFromBufferToManager: function () {
        $("#feedbackGrid").empty();
        $("#testPassCount").show();
        if (feedback.arr.length >= (feedback.startIndex + 10))
            feedback.Ei = (feedback.startIndex + 10);
        else
            feedback.Ei = feedback.arr.length;
        var grid = "";

        /****Added by Mohini Resource file*****/
        grid += '<table class="gridDetails" cellspacing="0"><thead><tr>' +
        '<td class="tblhd center" width="1%">Test ID</td>' +
        '<td class="tblhd center" width="4%">' + feedback.rsTestStep + '</td>' +
        '<td class="tblhd center" width="4%">' + feedback.rsassTC + '</td>' +
        '<td class="tblhd center" width="2%">Result</td>' +
        '<td class="tblhd  center" width="2%">' + feedback.rsAction + '</td></tr></thead>';


        for (var yy = feedback.startIndex; yy < feedback.Ei; yy++) {
            grid += feedback.arr[yy];
        }
        var info = '<label>Showing ' + (feedback.startIndex + 1) + '-' + feedback.Ei + ' record(s) of Total ' + feedback.arr.length + ' record(s)</label> | <a id="previous" style="cursor:pointer" onclick="feedback.startIndexDecrement();feedback.showFeedbackFromBufferToManager()">Previous</a> | <a  id="next" style="cursor:pointer" onclick="feedback.startIndexIncrement();feedback.showFeedbackFromBufferToManager()">Next</a>';
        $('#testPassCount').empty();
        $("#testPassCount").append(info);
        if (feedback.startIndex <= 0) {
            document.getElementById('previous').disabled = "disabled";
            document.getElementById('previous').style.color = "#989898";

        }
        else {
            document.getElementById('previous').disabled = false;

        }
        if (feedback.Ei >= feedback.arr.length) {
            document.getElementById('next').disabled = "disabled";
            document.getElementById('next').style.color = "#989898";
            feedback.flag = 1;
        }
        else {
            document.getElementById('next').disabled = false;
            feedback.flag = 0;
        }
        grid += '</tbody></table>';
        $("#feedbackGrid").append(grid);

    },
    saveFeedback_popUp: function (id) {


        //Code commented,removed and new code added by HRW for optimization
        $("#autoSaveDiv").text("");
        feedback.autoFlag = false;
        updateRTE('rte1');

        var testplanId = feedback.tsMappingTester[id][0].testplanId;

        var olderFeed = (this.oldFeedback).replace(/^\s+|\s+$/g, '').replace(/&nbsp;/g, '').replace(/^\s+|\s+$/g, "");
        olderFeed = feedback.filterData(olderFeed);
        this.rteFeedback = document.getElementById('hdn' + 'rte1').value;
        var newFeed = (this.rteFeedback).replace(/^\s+|\s+$/g, '').replace(/&nbsp;/g, '').replace(/^\s+|\s+$/g, "");//For bug 5963
        newFeed = feedback.filterData(newFeed);
        if (newFeed != '' || olderFeed != '') {
            if (document.getElementById('hdn' + 'rte1').value.replace(/^\s+|\s+$/g, "") != this.oldFeedback.replace(/^\s+|\s+$/g, "")) {
                var newFeedback = (this.rteFeedback).replace(/^\s+|\s+$/g, '').replace(/&nbsp;/g, '').replace(/^\s+|\s+$/g, "");//For bug 5963
                newFeedback = feedback.filterData(newFeedback);

                var data = '';

                if (newFeed != '') {
                    data = {
                        "testStepPlanId": testplanId,
                        "feedback": document.getElementById('hdn' + 'rte1').value
                    }
                }
                else {
                    data = {
                        "testStepPlanId": testplanId,
                        "feedback": newFeed
                    }
                }


                var feedbacksave = ServiceLayer.InsertUpdateData("InsertUpdateFeedBack", data, "Feedback");

                if (feedback.saveBtnClick == true) {
                    //feedback.alertBox("Feedback saved successfully.");

                    feedback.alertBox(feedback.rsfeedback + ' saved successfully.');//Added by Mohini for resource file

                    feedback.autoFlag = false;
                }
                else if (feedbacksave.Success) {
                    feedback.autoFlag = true;
                    feedback.autoSavedID = id;
                }
                //Added by HRW on 9 Jan 2012
                var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdTester);
                if (newFeedback == '') {
                    //$("#textAnchor"+id).text("Provide Feedback");
                    $("#textAnchor" + id).text('"Provide' + feedback.rsfeedback + '"');//Added by Mohini for resource flie

                    if (getIndex != -1) {
                        //var feed = feedback.arrshowTesterFeedbackGrd[getIndex].replace("Edit Feedback", "Provide Feedback");
                        var feed = feedback.arrshowTesterFeedbackGrd[getIndex].replace('"Edit ' + feedback.rsfeedback + '"', '"Provide ' + feedback.rsfeedback + '"');//Added by Mohini for resource flie
                        feedback.arrshowTesterFeedbackGrd[getIndex] = feed;
                    }
                }
                else {
                    //$("#textAnchor"+id).text("Edit Feedback");
                    $("#textAnchor" + id).text('"Edit ' + feedback.rsfeedback + '"');//Added by Mohini for resource flie

                    if (getIndex != -1) {
                        //var feed = feedback.arrshowTesterFeedbackGrd[getIndex].replace("Provide Feedback","Edit Feedback");
                        var feed = feedback.arrshowTesterFeedbackGrd[getIndex].replace('"Edit ' + feedback.rsfeedback + '"', '"Provide ' + feedback.rsfeedback + '"');//Added by Mohini for resource flie

                        feedback.arrshowTesterFeedbackGrd[getIndex] = feed;
                    }
                }
            }
            else {
                feedback.clearAutosave = true;
            }
        }
        else {
            feedback.clearAutosave = true;
        }

    },

    next_popUp: function (id) {
        if (id != undefined) {
            var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdMgr);
            if (getIndex != -1) {
                var nextID = feedback.tsIndexMgr[getIndex + 1];
                feedback.popForFeedbackFrMngr(nextID);
                //Added for changing the pagination(Bug 5726)
                var pag = (getIndex + 1) / 10;
                if (pag.toString().indexOf(".") == -1) {
                    feedback.startIndexIncrement();
                    feedback.showFeedbackFromBufferToManager();
                }
            }
        }
    },
    previous_popUp: function (id) {
        if (id != undefined) {
            var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdMgr);
            if (getIndex != -1) {
                var prevID = feedback.tsIndexMgr[getIndex - 1];
                feedback.popForFeedbackFrMngr(prevID);
                //Added for changing the pagination(Bug 5726)
                var pag = (getIndex) / 10;
                if (pag.toString().indexOf(".") == -1) {
                    feedback.startIndexDecrement();
                    feedback.showFeedbackFromBufferToManager();
                }

            }
        }
    },
    next_popUpTester: function (id) {
        feedback.saveFeedback_popUp(id);
        if (id != undefined) {
            var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdTester);
            if (getIndex != -1) {
                var nextID = feedback.tsIndexTester[getIndex + 1];
                feedback.popForFeedbackFrTester(nextID);

                //To reload updated data
                feedback.FillTestStepTabArrays();
                feedback.showTesterFeedbackGrd();

                //Added for changing the pagination(Bug 5726)
                var pag = (getIndex + 1) / 10;
                if (pag.toString().indexOf(".") == -1) {
                    feedback.startIndexIncrement();
                    feedback.showFeedbackFromBuffer();
                }
            }
        }
    },
    previous_popUpTester: function (id) {
        feedback.saveFeedback_popUp(id);
        if (id != undefined) {
            var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdTester);
            if (getIndex != -1) {
                var prevID = feedback.tsIndexTester[getIndex - 1];
                feedback.popForFeedbackFrTester(prevID);

                //To reload updated data
                feedback.FillTestStepTabArrays();
                feedback.showTesterFeedbackGrd();

                //Added for changing the pagination(Bug 5726)
                var pag = (getIndex) / 10;
                if (pag.toString().indexOf(".") == -1) {
                    feedback.startIndexDecrement();
                    feedback.showFeedbackFromBuffer();

                }

            }
        }
    },
    /* Function to perform to increment the index in paging */
    startIndexIncrement: function () {
        if (feedback.flag == 0)
            feedback.startIndex += 10;


    },

    /* Function to perform to decrement the index in paging */
    startIndexDecrement: function () {
        if (feedback.startIndex >= 10)
            feedback.startIndex -= 10;


    },


    popForFeedbackFrMngr: function (id) {
        if (id != undefined) {
            //var tt=$.inArray(id.toString(),feedback.stepIDArrayMngr);
            var actualResult = feedback.tsMappingMgr[id][0].actualResult;
            var expectedResult = feedback.tsMappingMgr[id][0].expectedResult;

            var stepStatus = feedback.tsMappingMgr[id][0].status;

            var testStepName = feedback.tsMappingMgr[id][0].testStepName;
            var testcaseName = feedback.tsMappingMgr[id][0].testcaseName;
            var tsFeedback = feedback.tsMappingMgr[id][0].tsFeedback;

            if (actualResult == "" || actualResult == null || actualResult == undefined)
                actualResult = '-';
            if (expectedResult == "" || expectedResult == null || expectedResult == undefined)
                expectedResult = '-';


            var ts = feedback.filterData(testStepName);
            ts = ts.replace(/(\r\n)+/g, '');
            if (testStepName.indexOf("<") != -1 && testStepName.indexOf(">") != -1)
                testStepName = ts;



            var actualRes = feedback.filterData(actualResult);
            actualRes = actualRes.replace(/(\r\n)+/g, '');
            if (actualResult.indexOf("<") != -1 && actualResult.indexOf(">") != -1)
                actualResult = actualRes;


            var expRes = feedback.filterData(expectedResult);
            expRes = expRes.replace(/(\r\n)+/g, '');
            if (expectedResult.indexOf("<") != -1 && expectedResult.indexOf(">") != -1)
                actualResult = expRes;


            /********** **********/
            // Added for bug 6027
            testStepName = testStepName.replace(/"/g, "&quot;");
            testcaseName = testcaseName.replace(/"/g, "&quot;");

            /********** **********/

            //Ankita 8/13/2012 : modified for issue(1.When added very long test step name and after completing testing for that test step when go to the feedback page and select provide feedback then you can see the defected GUI.()
            //Ankita : 8/13/2012 modified  for bug id 2238
            /*var readInfo='<table class="" cellspacing="0">'+
            '<tr><td class="" style="width:150px;"><b>Project Name:</b></td><td title="'+$('#projSelect option:selected').attr('title')+'">'+trimText($('#projSelect option:selected').attr('title'),75)+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Test Pass Name:</b></td><td title="'+$('#testPasSelect option:selected').text()+'">'+trimText($('#testPasSelect option:selected').text(),75)+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Test Case Name:</b></td><td title="'+getCaseNmMngr+'">'+trimText(getCaseNmMngr,75)+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Test ID:</b></td><td>'+id+'</td></tr>'+
            '<tr><td class="" style="width:150px;vertical-align:top"><b>Test Step Name:</b></td><td title="'+getStepNmMngr+'">'+getStepNmMngr+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Result:</b></td><td>'+feedback.stepStatusMngr[tt]+'</td></tr>'+
            '<tr><td class="" style="width:150px;vertical-align:top"><b>Expected Result:</b></td><td style="overflow:auto;" >'+expectedResult+'</td></tr>'+
            '<tr><td class="" style="width:150px;vertical-align:top"><b>Actual Result:</b></td><td style="overflow:auto;">'+actualResult+'</td></tr>'+
            '</table>';*/
            /******Added by Mohini for resource file*******/
            var readInfo = '<table class="" cellspacing="0">' +
            '<tr><td class="" style="width:150px;"><b>' + feedback.rsProject + ' Name:</b></td><td title="' + $('#projSelect option:selected').attr('title') + '">' + trimText($('#projSelect option:selected').attr('title'), 75) + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>' + feedback.rstestPass + ' Name:</b></td><td title="' + $('#testPasSelect option:selected').attr('title') + '">' + trimText($('#testPasSelect option:selected').attr('title'), 75) + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>' + feedback.rsTestCase + ' Name:</b></td><td title="' + testcaseName + '">' + trimText(testcaseName, 75) + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>Test ID:</b></td><td>' + id + '</td></tr>' +
            '<tr><td class="" style="width:150px;vertical-align:top"><b>' + feedback.rsTestStep + ' Name:</b></td><td title="' + testStepName + '">' + testStepName + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>Result:</b></td><td>' + stepStatus + '</td></tr>' +
            '<tr><td class="" style="width:150px;vertical-align:top"><b>' + feedback.rsExpectedResult + ':</b></td><td style="overflow:auto;" >' + expectedResult + '</td></tr>' +
            '<tr><td class="" style="width:150px;vertical-align:top"><b>' + feedback.rsActualResult + ':</b></td><td style="overflow:auto;">' + actualResult + '</td></tr>' +
            '</table>';

            $("#detailInfo").html(readInfo);

            //To check the according indexed teststepId
            var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdMgr);

            var prevID = feedback.tsIndexMgr[getIndex - 1];
            var nextID = feedback.tsIndexMgr[getIndex + 1];

            var navigaPop = "";
            if (prevID == undefined)
                navigaPop += '<a class="hyper" style="color:gray"  onclick="feedback.previous_popUp(' + id + ');">Previous</a>';
            else
                navigaPop += '<a class="hyper" style="color:#f60;	cursor:pointer;"  onclick="feedback.previous_popUp(' + id + ');">Previous</a>';

            if (nextID == undefined)
                navigaPop += '<a class="hyper" style="color:gray;" onclick="feedback.next_popUp(' + id + ');">Next</a>';
            else
                navigaPop += '<a class="hyper" style="color:#f60;	cursor:pointer;" onclick="feedback.next_popUp(' + id + ');">Next</a>';


            $("#nextPrev").html(navigaPop);

            //Added by HRW
            /*feedback.rteText="";
            document.getElementById('hdn' + 'rte1').value="";
            enableDesignMode("rte1", "", false);
            
                  var TCtoTSMpList=jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping'); 
                  var fiQuery='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+id+'</Value></Eq></Where></Query>';
                                            //enableDesignMode("rte1", "", false);
    
                  var TCtoTSMpListItems=TCtoTSMpList.getSPItemsWithQuery(fiQuery).Items;
                    if(TCtoTSMpListItems != null || TCtoTSMpListItems != undefined) 
                    {
                        feedback.rteText="";*/
            if (tsFeedback != null && tsFeedback != undefined && tsFeedback != "") {
                feedback.rteText = tsFeedback;
                //Commented by HRW and uncommented the RTE code to show the RTE styling
                //	$("#containts").html(TCtoTSMpListItems[0]['feedback']);
                //$("#containts").show();
                enableDesignMode("rte1", tsFeedback, false);
            }
            else {
                //feedback.rteText="<b>-</b>";
                //uncommented the RTE code to show the RTE styling
                enableDesignMode("rte1", feedback.rteText, false);
            }


            /* Added for bug 2388 */
            $('#formatblock_rte1 option[value=""]').attr('selected', 'selected');
            $('#fontname_rte1 option[value="Font"]').attr('selected', 'selected');
            $('#fontsize_rte1 option[value="Size"]').attr('selected', 'selected');

            $("#cprte1").css('visibility', 'hidden'); // Added for bug 6932

            //if(feedback.popUpOpenFlagMngr==false)
            //Ankita 8/8/2012 : modified the button to 'Ok' for bug id 2270
            $('#popUpRTE').dialog({ height: 550, width: 750, resizable: false, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });


        }

        $("#detailInfo table tbody tr").each(function () {

            if ($.trim($(this).children("td:eq(1)").text()).indexOf(" ") == -1) {
                $(this).css("word-break", "break-all");
            }
            else {
                $(this).css("word-break", "normal");
            }
        });

    },


    popForFeedbackFrTester: function (id) {
        if (id != undefined) {

            //Code commnented,removed and new code added by HRW for optimization on 9 Jan 2012
            var stepActualResult = feedback.tsMappingTester[id][0].actualResult;
            //var roleName = feedback.actualResultAndRoleNameForChildID[id].split("`")[1];
            var stepStatus = feedback.tsMappingTester[id][0].status;

            var testPassName = $('#testPasSelect option:selected').attr('title');
            var projectName = $('#projSelect option:selected').attr('title');
            var testStepName = feedback.tsMappingTester[id][0].testStepName;
            var testcaseName = feedback.tsMappingTester[id][0].testcaseName;
            var expectedResult = feedback.tsMappingTester[id][0].expectedResult;

            var tsFeedback = feedback.tsMappingTester[id][0].tsFeedback;

            /*
            if(stepActualResult=="")
                stepActualResult='-';
            if(expectedResult=="")
                expectedResult='-';
                */


            ///////////////////////////////////////////
            if (stepActualResult == "" || stepActualResult == null || stepActualResult == undefined)
                stepActualResult = '-';
            if (expectedResult == "" || expectedResult == null || expectedResult == undefined)
                expectedResult = '-';


            var ts = feedback.filterData(testStepName);
            ts = ts.replace(/(\r\n)+/g, '');
            if (testStepName.indexOf("<") != -1 && testStepName.indexOf(">") != -1)
                testStepName = ts;



            var actualRes = feedback.filterData(stepActualResult);
            actualRes = actualRes.replace(/(\r\n)+/g, '');
            if (stepActualResult.indexOf("<") != -1 && stepActualResult.indexOf(">") != -1)
                stepActualResult = actualRes;


            var expRes = feedback.filterData(expectedResult);
            expRes = expRes.replace(/(\r\n)+/g, '');
            if (expectedResult.indexOf("<") != -1 && expectedResult.indexOf(">") != -1)
                expectedResult = expRes;


            /********** **********/
            // Added for bug 6027
            testStepName = testStepName.replace(/"/g, "&quot;");
            testcaseName = testcaseName.replace(/"/g, "&quot;");
            /////////////////////////////////////////////////////



            //var stepActualResult=(stepActualResult== undefined ||stepActualResult== undefined)?"-":stepActualResult;		

            //var tt=$.inArray(id.toString(),feedback.stepIDArrayTester);
            //var getStepNm=this.stepNameArrayTester[tt];
            //var getCaseNm=this.caseNameArrayTester[tt];


            /*var readInfo='<table class="" cellspacing="0">'+
            '<tr><td class="" style="width:150px;"><b>Project Name:</b></td><td title="'+projectName+'">'+trimText(projectName,75)+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Test Pass Name:</b></td><td title="'+testPassName+'">'+trimText(testPassName,75)+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Test Case Name:</b></td><td title="'+getCaseNm+'">'+trimText(getCaseNm,75)+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Test ID:</b></td><td>'+id+'</td></tr>'+
            '<tr><td class="" style="width:150px;vertical-align:top"><b>Test Step Name:</b></td><td title="'+getStepNm+'">'+getStepNm+'</td></tr>'+
            '<tr><td class="" style="width:150px;"><b>Result:</b></td><td>'+stepStatus+'</td></tr>'+
            '<tr><td class="" style="width:150px;vertical-align:top"><b>Expected Result:</b></td><td>'+((this.stepExpMngr[tt] == undefined || this.stepExpMngr[tt] == "undefined")?"-":this.stepExpMngr[tt])+'<td id="Exp1"></td></tr>'+
            '<tr><td class="" style="width:150px;vertical-align:top"><b>Actual Result:</b></td><td>'+stepActualResult+'</td></tr>'+
            '</table>';*/
            /*******Added by Mohini for resource file****/
            var readInfo = '<table class="" cellspacing="0">' +
            '<tr><td class="" style="width:150px;"><b>' + feedback.rsProject + ' Name:</b></td><td title="' + projectName + '">' + trimText(projectName, 75) + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>' + feedback.rstestPass + ' Name:</b></td><td title="' + testPassName + '">' + trimText(testPassName, 75) + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>' + feedback.rsTestCase + ' Name:</b></td><td title="' + testcaseName + '">' + trimText(testcaseName, 75) + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>Test ID:</b></td><td>' + id + '</td></tr>' +
            '<tr><td class="" style="width:150px;vertical-align:top"><b>' + feedback.rsTestStep + ' Name:</b></td><td title="' + testStepName + '">' + testStepName + '</td></tr>' +
            '<tr><td class="" style="width:150px;"><b>Result:</b></td><td>' + stepStatus + '</td></tr>' +
            '<tr><td class="" style="width:150px;vertical-align:top"><b>' + feedback.rsExpectedResult + ':</b></td><td>' + expectedResult + '<td id="Exp1"></td></tr>' +
            '<tr><td class="" style="width:150px;vertical-align:top"><b>' + feedback.rsActualResult + ':</b></td><td>' + stepActualResult + '</td></tr>' +
            '</table>';


            $("#act1").val(stepActualResult);
            $("#detailInfo").html(readInfo);


            $("#nextPrev").empty();

            //To check the according indexed teststepId
            var getIndex = $.inArray(id.toString(), feedback.tsMappingTsIdTester);

            var prevID = feedback.tsIndexTester[getIndex - 1];
            var nextID = feedback.tsIndexTester[getIndex + 1];


            var navigaPop = "";
            if (prevID == undefined)
                navigaPop += '<a class="hyper" style="color:gray">Previous</a>';
            else if (feedback.nextClickFlag == true)
                navigaPop += '<span id="autoSaveDiv" style="color:#f60"></span><a class="hyper" style="color:#f60;cursor:pointer;"  onclick="feedback.saveBtnClick=false;feedback.nextClickFlag=true; feedback.previous_popUpTester(' + id + ');">Previous</a>';
            else
                navigaPop += '<span id="autoSaveDiv" style="color:#f60"></span><a class="hyper" style="color:#f60;cursor:pointer;"  onclick="feedback.saveBtnClick=false;feedback.previous_popUpTester(' + id + ');">Previous</a>';



            if (nextID == undefined)
                navigaPop += '<a class="hyper" style="color:gray;">Next</a>';
            else
                navigaPop += '<a class="hyper" style="color:#f60;	cursor:pointer;" onclick="feedback.saveBtnClick=false;feedback.nextClickFlag=true; feedback.next_popUpTester(' + id + ');">Next</a>';
            $("#nextPrev").html(navigaPop);


            if (feedback.autoFlag == true) {
                $("#autoSaveDiv").text("Feedback (#" + feedback.autoSavedID + ") Autosaved.");
                $("#autoSaveDiv").css("padding-right", "25px");
            }
            else if (feedback.clearAutosave == true) {
                $("#autoSaveDiv").text("");
            }
            else {
                $("#autoSaveDiv").text("");

            }
            feedback.rteText = "";
            document.getElementById('hdn' + 'rte1').value = "";
            enableDesignMode("rte1", "", false);

            //var TCtoTSMpListTest=jP.Lists.setSPObject(Main.getSiteUrl(),'TestCaseToTestStepMapping'); 
            //var fiQueryTest='<Query><Where><Eq><FieldRef Name="ID" /><Value Type="Counter">'+id+'</Value></Eq></Where></Query>';

            //var TCtoTSMpListTestItems=TCtoTSMpListTest.getSPItemsWithQuery(fiQueryTest).Items;
            //if(TCtoTSMpListTestItems != null || TCtoTSMpListTestItems != undefined) 
            //{
            feedback.rteText = "";
            if (tsFeedback != null && tsFeedback != undefined && tsFeedback != "") {
                feedback.rteText = tsFeedback;
                enableDesignMode("rte1", tsFeedback, false);
                feedback.oldFeedback = tsFeedback;
                $("#textAnchor").html("Edit Feedback");

            }
            else//Added by HRW for bug 4088
            {
                enableDesignMode("rte1", "", false);
                feedback.oldFeedback = "";
            }
            //}
            //else
            //{
            //enableDesignMode("rte1","", false);	
            //feedback.oldFeedback="";
            //}

            this.rteFeedback = document.getElementById('hdn' + 'rte1').value;

            /* Added for bug 2388 */
            $('#formatblock_rte1 option[value=""]').attr('selected', 'selected');
            $('#fontname_rte1 option[value="Font"]').attr('selected', 'selected');
            $('#fontsize_rte1 option[value="Size"]').attr('selected', 'selected');

            $("#cprte1").css('visibility', 'hidden'); // Added for bug 6932

            $('#popUpRTE').dialog({
                height: 650, width: 750, resizable: false, modal: true, buttons: {
                    "Save": function () {
                        Main.showLoading();
                        feedback.saveBtnClick = true;
                        feedback.saveFeedback_popUp(id);
                        $(this).dialog("close");

                        //to reload the updated data		
                        feedback.FillTestStepTabArrays();
                        feedback.showTesterFeedbackGrd();

                        Main.hideLoading();
                    },
                    "Cancel": function () {
                        feedback.autoFlag = false;
                        $(this).dialog("close");
                    }
                },
                "close": function () {
                    feedback.autoFlag = false;
                }

            });

        }
        $("#detailInfo table tbody tr").each(function () {

            if ($.trim($(this).children("td:eq(1)").text()).indexOf(" ") == -1) {
                $(this).css("word-break", "break-all");
            }
            else {
                $(this).css("word-break", "normal");
            }
        });

    },
   

     exportTestCase: function () {
        var projectName = '';
        var projectVersion = '';
        var testPassName = '';
        var testPassId = '';
        var testerId = '';
        var testerName = '';
        var roleId = '';
        var roleName = '';
        var testCaseId = '';
        var testCaseName = '';
        var rating = '';
        var feedBack = '';

        var tpidtcid = '';

        var fbType = '';

        //for single test pass
        var temp11FR = new Array();
        var temp12FR = new Array();
        var temp21FR = new Array();
        var temp22FR = new Array();
        var temp31FR = new Array();
        var temp32FR = new Array();
        var temp41FR = new Array();
        var temp42FR = new Array();

        //for all test passes
        var temp51FR = new Array();
        var temp52FR = new Array();
        var temp61FR = new Array();
        var temp62FR = new Array();
        var temp71FR = new Array();
        var temp72FR = new Array();
        var temp81FR = new Array();
        var temp82FR = new Array();


        feedback.getFRByTPId = [];
        feedback.getFRByTPIdRId = [];
        feedback.getFRByTPIdTId = [];
        feedback.getFRByTPIdTIdRId = [];

        feedback.getFRByPId = [];
        feedback.getFRByPIdRId = [];
        feedback.getFRByPIdTId = [];
        feedback.getFRByPIdTIdRId = [];

        if ($("#projSelectTC").val() == -1) {
            //feedback.alertBox("Please select project.");
            feedback.alertBox('Please select ' + feedback.rsProject + '.');//added by Mohini for resource file
            Main.hideLoading();
        }
            //else if($("#testPasSelectTC").text() == "No Test Pass")
        else if ($("#testPasSelectTC").text() == "No " + feedback.rstestPass)//added by Mohini for resource file
        {
            //feedback.alertBox("No Test Pass available in Project.");
            feedback.alertBox('No ' + feedback.rstestPass + ' available in ' + feedback.rsProject + '.');//added by Mohini for resource file
            Main.hideLoading();
        }
        else if (typeof (window.ActiveXObject) == undefined) {
            Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
        }
        else {
            Main.showLoading();
            var stat = 0;
            try {
                var xlApp = new ActiveXObject("Excel.Application");
                stat = 1;
            }
            catch (ex) {
                Main.showPrerequisites("Prerequisites for 'Excel-Import/Export' feature"); // shilpa 12 apr
            }
            if (stat == 0) {
                Main.hideLoading();
                return;
            }
            try {
                xlApp.DisplayAlerts = false;
                var xlBook = xlApp.Workbooks.Add();
                xlBook.worksheets("Sheet1").activate;
                var XlSheet = xlBook.activeSheet;
                //XlSheet.Name="Feedback Template";
                XlSheet.Name = '"' + feedback.rsfeedback + ' Template"';//added by Mohini for resource file

                //To assign cell number for portfolio on/off mode for version column:SD
                if (isPortfolioOn) {
                    var projectCellNo = 1; var versionCellNo = 2; var testPassCellNo = 3; var testCaseCellNo = 4; var testerCellNo = 4; var roleCellNo = 5; var ratingCellNo = 6; var feedbackCellNo = 7;
                }
                else {
                    var projectCellNo = 1; var testPassCellNo = 2; var testCaseCellNo = 3; var testerCellNo = 3; var roleCellNo = 4; var ratingCellNo = 5; var feedbackCellNo = 6;
                }

                //Set Excel Column Headers and formatting from array
                //XlSheet.Range("A1:H1000").NumberFormat = "@";
                feedback.flagForTestCase = 0;
                //if ($('#testPasSelectTC').val() == 0) {
                //    for (var ii = 1; ii < $('#testPasSelectTC option').length; ii++) {
                //        //if (feedback.forTPIDGetFRConfg[$('#testPasSelectTC option').eq(ii).val()] == "1")
                //        if ($('#testPasSelectTC option').eq(ii).val() == "1")
                //            feedback.flagForTestCase = 1;
                //    }
                //}
                //else {
                //    if ($('#testPasSelectTC').val() == "1")
                //        feedback.flagForTestCase = 1;
                //}

                var TestPassID = '';
                var feedAvail = 0;
                var cellCount = 1;
                var lastCount = 1;
                var flagTrue = 0;
                FeedbackRating: new Array();
                var prjName = $("#projSelectTC option:selected").attr('title');
                if (!feedback.isPortfolioOn) {
                    var projectID = $("#projSelectTC option:selected").val();
                }
                else {
                    var projectID = $("#versionSelectTC option:selected").val();
                }
                var param = projectID + "/0";
                feedback.FeedbackRating = ServiceLayer.GetData("GetFeedback", param, "Feedback");

                for (var i = 0; i < feedback.FeedbackRating.length; i++) {

                    testcaseId = feedback.FeedbackRating[i].testcaseId;
                    testcaseName = feedback.FeedbackRating[i].testcaseName;
                    testerName = feedback.FeedbackRating[i].testerName;
                    testerId = feedback.FeedbackRating[i].userId;
                    testPassName = feedback.FeedbackRating[i].testpassName;
                    testPassId = feedback.FeedbackRating[i].testpassId;


                    feedback.DrillFeedbackRating = feedback.FeedbackRating[i].listTesterDetail;

                    for (var j = 0; j < feedback.DrillFeedbackRating.length; j++) {

                        roleId = feedback.DrillFeedbackRating[j].roleId;
                        roleName = feedback.DrillFeedbackRating[j].roleName;
                        rating = feedback.DrillFeedbackRating[j].tpTcRating;
                        feedBack = feedback.DrillFeedbackRating[j].tpTcFeedback;

                        fbType = feedback.DrillFeedbackRating[j].fBType;

                        if (fbType == "")
                            fbType = "0";

                        //tpidtcid=testPassId+"-"+testcaseId+"-"+testerId+"-"+roleId;					  								  		
                        tpidtcid = feedback.DrillFeedbackRating[j].feedbackRatingId;    //to uniquely idendtify the test pass feedback records


                        //To read FeedBack Rating of eight scenarios
                        //fbType=0 : TP level feedback, fbType=1: TC level feedback,  fbType=2: No feedback
                        if (rating != "" && fbType != "2") {
                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp11FR) == -1) {
                                    temp11FR.push(tpidtcid);

                                    if (feedback.getFRByTPId[testPassId] == undefined) {
                                        feedback.getFRByTPId[testPassId] = new Array();
                                        feedback.getFRByTPId[testPassId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {
                                        feedback.getFRByTPId[testPassId].push({
                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }

                                }
                            }
                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp12FR) == -1) {
                                    temp12FR.push(tpidtcid);


                                    if (feedback.getFRByTPId[testPassId] == undefined) {
                                        feedback.getFRByTPId[testPassId] = new Array();
                                        feedback.getFRByTPId[testPassId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {
                                        feedback.getFRByTPId[testPassId].push({
                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }


                            if (fbType == "0") {

                                if ($.inArray(tpidtcid, temp21FR) == -1) {
                                    temp21FR.push(tpidtcid);


                                    if (feedback.getFRByTPIdRId[testPassId + "-" + roleId] == undefined) {
                                        feedback.getFRByTPIdRId[testPassId + "-" + roleId] = new Array();
                                        feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {
                                        feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({
                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });

                                    }
                                }

                            }

                            else if (fbType == "1") {

                                if ($.inArray(tpidtcid, temp22FR) == -1) {
                                    temp22FR.push(tpidtcid);

                                    if (feedback.getFRByTPIdRId[testPassId + "-" + roleId] == undefined) {
                                        feedback.getFRByTPIdRId[testPassId + "-" + roleId] = new Array();
                                        feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {
                                        feedback.getFRByTPIdRId[testPassId + "-" + roleId].push({
                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });

                                    }
                                }

                            }

                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp31FR) == -1) {
                                    temp31FR.push(tpidtcid);


                                    if (feedback.getFRByTPIdTId[testPassId + "-" + testerId] == undefined) {
                                        feedback.getFRByTPIdTId[testPassId + "-" + testerId] = new Array();
                                        feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {
                                        feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({
                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });

                                    }
                                }
                            }
                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp32FR) == -1) {
                                    temp32FR.push(tpidtcid);


                                    if (feedback.getFRByTPIdTId[testPassId + "-" + testerId] == undefined) {
                                        feedback.getFRByTPIdTId[testPassId + "-" + testerId] = new Array();
                                        feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {
                                        feedback.getFRByTPIdTId[testPassId + "-" + testerId].push({
                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });

                                    }
                                }
                            }


                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp41FR) == -1) {
                                    temp41FR.push(tpidtcid);

                                    if (feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] == undefined) {
                                        feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] = new Array();
                                        feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });
                                    }
                                    else {
                                        feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack


                                        });

                                    }
                                }
                            }

                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp42FR) == -1) {
                                    temp42FR.push(tpidtcid);

                                    if (feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] == undefined) {
                                        feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId] = new Array();
                                        feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });
                                    }
                                    else {
                                        feedback.getFRByTPIdTIdRId[testPassId + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack


                                        });

                                    }
                                }
                            }

                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp51FR) == -1) {
                                    temp51FR.push(tpidtcid);


                                    if (feedback.getFRByPId[projectID] == undefined) {
                                        feedback.getFRByPId[projectID] = new Array();
                                        feedback.getFRByPId[projectID].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPId[projectID].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }
                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp52FR) == -1) {
                                    temp52FR.push(tpidtcid);


                                    if (feedback.getFRByPId[projectID] == undefined) {
                                        feedback.getFRByPId[projectID] = new Array();
                                        feedback.getFRByPId[projectID].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPId[projectID].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }

                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp61FR) == -1) {
                                    temp61FR.push(tpidtcid);


                                    if (feedback.getFRByPIdRId[projectID + "-" + roleId] == undefined) {
                                        feedback.getFRByPIdRId[projectID + "-" + roleId] = new Array();
                                        feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }
                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp62FR) == -1) {
                                    temp62FR.push(tpidtcid);


                                    if (feedback.getFRByPIdRId[projectID + "-" + roleId] == undefined) {
                                        feedback.getFRByPIdRId[projectID + "-" + roleId] = new Array();
                                        feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPIdRId[projectID + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }

                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp71FR) == -1) {
                                    temp71FR.push(tpidtcid);


                                    if (feedback.getFRByPIdTId[projectID + "-" + testerId] == undefined) {
                                        feedback.getFRByPIdTId[projectID + "-" + testerId] = new Array();
                                        feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }
                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp72FR) == -1) {
                                    temp72FR.push(tpidtcid);


                                    if (feedback.getFRByPIdTId[projectID + "-" + testerId] == undefined) {
                                        feedback.getFRByPIdTId[projectID + "-" + testerId] = new Array();
                                        feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPIdTId[projectID + "-" + testerId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }

                            if (fbType == "0") {
                                if ($.inArray(tpidtcid, temp81FR) == -1) {
                                    temp81FR.push(tpidtcid);


                                    if (feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] == undefined) {
                                        feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] = new Array();
                                        feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": '',
                                            "testcaseName": "N/A",
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }
                            else if (fbType == "1") {
                                if ($.inArray(tpidtcid, temp82FR) == -1) {
                                    temp82FR.push(tpidtcid);


                                    if (feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] == undefined) {
                                        feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId] = new Array();
                                        feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack
                                        });
                                    }
                                    else {

                                        feedback.getFRByPIdTIdRId[projectID + "-" + testerId + "-" + roleId].push({

                                            "testPassId": testPassId,
                                            "testPassName": testPassName,
                                            "testcaseId": testcaseId,
                                            "testcaseName": testcaseName,
                                            "testerId": testerId,
                                            "testerName": testerName,
                                            "roleId": roleId,
                                            "roleName": roleName,
                                            "rating": rating,
                                            "feedBack": feedBack

                                        });

                                    }
                                }
                            }
                        }
                    }

                }

                feedback.startIndexTCView = 0;
                feedback.childItemsTCView.length = 0;
              
                var feedAvail = 0;
                var index = 0;
                if ($("#projSelectTC").val() == -1) {
                    $("#feedbackGridTC").empty();
                    $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>Please select ' + feedback.rsProject.toLowerCase() + '.</b></div>');//Added by Mohini for resource flie
                    Main.hideLoading();
                }
                    //else if($("#testPasSelectTC").text() == "No Test Pass")
                else if ($("#testPasSelectTC").text() == "No " + feedback.rstestPass)//Added By Mohini for resource file
                {
                    $("#feedbackGridTC").empty();

                    $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rstestPass + ' available in ' + feedback.rsProject + '.</b></div>');//added by Mohini For resource file
                    Main.hideLoading();
                }
                //else if ($("#testerSelectTC").text() == "No " + feedback.rsTester)//Added By Mohini for resource file
                //{
                //    $("#feedbackGridTC").empty();

                //    $("#feedbackGridTC").append('<div class="divMsg" style="padding-left:5px"><b>No ' + feedback.rsTester + ' available.</b></div>');//added by Mohini For resource file
                //    Main.hideLoading();
                //}
                else {
                    var testPassId = '';
                    feedback.flagForTestCase = 1;


                    var FeedbackRatingItems = '';
                //XlSheet.cells(1,1).value= "Project";
                XlSheet.cells(1, projectCellNo).value = feedback.rsProject;//added by Mohini for resource file
                XlSheet.cells(1, projectCellNo).font.colorindex = "2";
                XlSheet.cells(1, projectCellNo).font.bold = "false";
                XlSheet.cells(1, projectCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,2).value="Version";
                if (isPortfolioOn)//:SD
                {
                    XlSheet.cells(1, versionCellNo).value = feedback.rsVersion;//added by Mohini for resource file
                    XlSheet.cells(1, versionCellNo).font.colorindex = "2";
                    XlSheet.cells(1, versionCellNo).font.bold = "false";
                    XlSheet.cells(1, versionCellNo).interior.colorindex = "23";
                }

                //XlSheet.cells(1,2).value= "Test Pass";
                XlSheet.cells(1, testPassCellNo).value = feedback.rstestPass;//added by Mohini for resource file
                XlSheet.cells(1, testPassCellNo).font.colorindex = "2";
                XlSheet.cells(1, testPassCellNo).font.bold = "false";
                XlSheet.cells(1, testPassCellNo).interior.colorindex = "23";

                var i = 0;
                if (feedback.flagForTestCase == 1) {
                    i = 1;
                    //XlSheet.cells(1,3).value= "Test Case";
                    XlSheet.cells(1, testCaseCellNo).value = feedback.rsTestCase;//added by Mohini for resource file
                    XlSheet.cells(1, testCaseCellNo).font.colorindex = "2";
                    XlSheet.cells(1, testCaseCellNo).font.bold = "false";
                    XlSheet.cells(1, testCaseCellNo).interior.colorindex = "23";
                }
                //XlSheet.cells(1,i+3).value= "Tester";			   	
                XlSheet.cells(1, i + testerCellNo).value = feedback.rsTester;//added by Mohini for resource file
                XlSheet.cells(1, i + testerCellNo).font.colorindex = "2";
                XlSheet.cells(1, i + testerCellNo).font.bold = "false";
                XlSheet.cells(1, i + testerCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,i+4).value= "Role";
                XlSheet.cells(1, i + roleCellNo).value = feedback.rsRole;//added by Mohini for resource file
                XlSheet.cells(1, i + roleCellNo).font.colorindex = "2";
                XlSheet.cells(1, i + roleCellNo).font.bold = "false";
                XlSheet.cells(1, i + roleCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,i+5).value= "Rating";
                XlSheet.cells(1, i + ratingCellNo).value = feedback.rsRating;//added by Mohini for resource file

                XlSheet.cells(1, i + ratingCellNo).font.colorindex = "2";
                XlSheet.cells(1, i + ratingCellNo).font.bold = "false";
                XlSheet.cells(1, i + ratingCellNo).interior.colorindex = "23";

                //XlSheet.cells(1,i+6).value= "Feedback";
                XlSheet.cells(1, i + feedbackCellNo).value = feedback.rsfeedback;//added by Mohini for resource file
                XlSheet.cells(1, i + feedbackCellNo).font.colorindex = "2";
                XlSheet.cells(1, i + feedbackCellNo).font.bold = "false";
                XlSheet.cells(1, i + feedbackCellNo).interior.colorindex = "23";
                XlSheet.Range("A1").EntireColumn.AutoFit();
                XlSheet.Range("B1").EntireColumn.AutoFit();
                XlSheet.Range("C1").EntireColumn.AutoFit();
                XlSheet.Range("D1").EntireColumn.AutoFit();
                XlSheet.Range("E1").EntireColumn.AutoFit();
                XlSheet.Range("F1").EntireColumn.AutoFit();
                if (isPortfolioOn)//:SD
                {
                    if (feedback.flagForTestCase == 1) {
                        XlSheet.Range("A1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("B1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("C1").EntireColumn.columnwidth = '25';
                        XlSheet.Range("D1").EntireColumn.columnwidth = '25';
                        XlSheet.Range("E1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("F1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("G1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("H1").EntireColumn.columnwidth = '80';
                        XlSheet.Range("F1").EntireColumn.WrapText = 'True';
                        XlSheet.Range("G1").EntireColumn.WrapText = 'True';
                        XlSheet.Range("H1").EntireColumn.WrapText = 'True';
                    }
                    else {
                        XlSheet.Range("A1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("B1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("C1").EntireColumn.columnwidth = '25';
                        XlSheet.Range("D1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("E1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("F1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("G1").EntireColumn.columnwidth = '80';

                    }
                }
                else {
                    if (feedback.flagForTestCase == 1) {
                        XlSheet.Range("A1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("B1").EntireColumn.columnwidth = '25';
                        XlSheet.Range("C1").EntireColumn.columnwidth = '25';
                        XlSheet.Range("D1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("E1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("F1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("G1").EntireColumn.columnwidth = '80';
                        XlSheet.Range("E1").EntireColumn.WrapText = 'True';
                        XlSheet.Range("F1").EntireColumn.WrapText = 'True';
                        XlSheet.Range("G1").EntireColumn.WrapText = 'True';
                    }
                    else {
                        XlSheet.Range("A1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("B1").EntireColumn.columnwidth = '25';
                        XlSheet.Range("C1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("D1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("E1").EntireColumn.columnwidth = '20';
                        XlSheet.Range("F1").EntireColumn.columnwidth = '80';
                    }

                }
                XlSheet.Range("A1").EntireColumn.WrapText = 'True';
                XlSheet.Range("B1").EntireColumn.WrapText = 'True';
                XlSheet.Range("C1").EntireColumn.WrapText = 'True';
                XlSheet.Range("D1").EntireColumn.WrapText = 'True';
                XlSheet.Range("E1").EntireColumn.WrapText = 'True';
                //XlSheet.Range("F1").EntireColumn.WrapText='True';

               


                    if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() == 0)
                        FeedbackRatingItems = feedback.getFRByTPId[$('#testPasSelectTC option:selected').val()];

                    else if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() != 0)
                        FeedbackRatingItems = feedback.getFRByTPIdRId[$('#testPasSelectTC option:selected').val() + "-" + $('#roleSelectTC option:selected').val()];

                    else if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() == 0)
                        FeedbackRatingItems = feedback.getFRByTPIdTId[$('#testPasSelectTC option:selected').val() + "-" + $('#testerSelectTC option:selected').val()];

                    else if ($('#testPasSelectTC option:selected').val() != 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() != 0)
                        FeedbackRatingItems = feedback.getFRByTPIdTIdRId[$('#testPasSelectTC option:selected').val() + "-" + $('#testerSelectTC option:selected').val() + "-" + $('#roleSelectTC option:selected').val()];

                    else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() == 0)
                        FeedbackRatingItems = feedback.getFRByPId[projectID];

                    else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() == 0 && $("#roleSelectTC option:selected").val() != 0)
                        FeedbackRatingItems = feedback.getFRByPIdRId[projectID + "-" + $('#roleSelectTC option:selected').val()];

                    else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() == 0)
                        FeedbackRatingItems = feedback.getFRByPIdTId[projectID + "-" + $('#testerSelectTC option:selected').val()];

                    else if ($('#testPasSelectTC option:selected').val() == 0 && $("#testerSelectTC option:selected").val() != 0 && $("#roleSelectTC option:selected").val() != 0)
                        FeedbackRatingItems = feedback.getFRByPIdTIdRId[projectID + "-" + $('#testerSelectTC option:selected').val() + "-" + $('#roleSelectTC option:selected').val()];


                    if (FeedbackRatingItems != null && FeedbackRatingItems != undefined) {

                    var gridv = '';
                    for (var ii = 0; ii < FeedbackRatingItems.length; ii++) {
                                    flagTrue = 0;
                                    lastCount = cellCount;

                                    XlSheet.cells((cellCount + 1), projectCellNo).value = $("#projSelectTC option:selected").attr('title');
                                    if (isPortfolioOn)//:SD
                                        XlSheet.cells((cellCount + 1), versionCellNo).value = "'" + $("#versionSelectTC option:selected").text().toString();
                                    //XlSheet.cells((cellCount + 1), testPassCellNo).value = feedback.TestPassNameForTPIDTCView[feedback.FeedbackRating[ii]['TestPass_ID']];
                                    XlSheet.cells((cellCount + 1), testPassCellNo).value = FeedbackRatingItems[ii]['testPassName'];
                                    var cc = 0;
                                    if (feedback.flagForTestCase == 1) {
                                        cc = 1;
                                        if (FeedbackRatingItems[ii]['testcaseName'] != undefined)
                                            XlSheet.cells((cellCount + 1), testCaseCellNo).value = FeedbackRatingItems[ii]['testcaseName'];
                                        else
                                            XlSheet.cells((cellCount + 1), testCaseCellNo).value = "N/A";
                                    }
                                    //XlSheet.cells((cellCount + 1), testerCellNo + cc).value = feedback.TesteFullNameForSPUserIDTCView[FeedbackRatingItems[ii]['User_Id']];
                                    XlSheet.cells((cellCount + 1), testerCellNo + cc).value = FeedbackRatingItems[ii]['testerName'];
                                    //XlSheet.cells((cellCount + 1), roleCellNo + cc).value = feedback.roleNameForRoleID[FeedbackRatingItems[ii]['Role_Id']];
                                    XlSheet.cells((cellCount + 1), roleCellNo + cc).value = FeedbackRatingItems[ii]['roleName'];
                                   switch (FeedbackRatingItems[ii]['rating'].trim().toString()) {
                                        case "1": rating = "Very Satisfied";
                                            break;
                                        case "2": rating = "Very Dis-satisfied";
                                            break;
                                        case "3": rating = "Somewhat Satisfied";
                                            break;
                                        case "4": rating = "Somewhat Dis-satisfied";
                                            break;
                                    }
                                    XlSheet.cells((cellCount + 1), ratingCellNo + cc).value = rating;

                                    var feed = FeedbackRatingItems[ii]['feedBack'];
                                    if (feed != undefined) {
                                        feed = feed.replace(/&quot;/g, '"');
                                        /*For Bug Id:11779 Mohini DT:15-05-2014*/
                                        feed = feed.replace(/&gt;/g, '>');
                                        feed = feed.replace(/&lt;/g, '<');
                                        feed = feed.replace(/&amp;/g, '&');
                                    }
                                    /****************************************/
                                    if (feed != undefined) {
                                        if (feed.match(/</g) == undefined && feed.match(/</g) == null)
                                            XlSheet.cells((cellCount + 1), feedbackCellNo + cc).value = feed;
                                        else if (feed.match(/</g).length == 2 && (feed.indexOf("<div") != -1 || feed.indexOf("<p") != -1))
                                            XlSheet.cells((cellCount + 1), feedbackCellNo + cc).value = feedback.filterData(feed);
                                        else if (feed.indexOf("</table>") != -1 && feed.indexOf("<table") != -1) {
                                            if (feed.match(/<tr/g).length > 1 && feed.match(/<td/g).length > 1) {
                                                var completeActionName = feedback.filterData(feed);
                                                completeActionName = completeActionName.replace(/&quot;/g, '"');
                                                completeActionName = completeActionName.replace(/(\r\n)+/g, '');
                                                XlSheet.cells((cellCount + 1), feedbackCellNo + cc).value = completeActionName;
                                            }
                                            else
                                                flagTrue = 1;
                                        }
                                        else
                                            flagTrue = 1;
                                        if (flagTrue == 1) {
                                            enableDesignMode("rte3", feed, false);
                                            rteCommand("rte3", "selectAll");
                                            rteCommand("rte3", "copy");
                                            XlSheet.cells((cellCount + 1), feedbackCellNo + cc).PasteSpecial();
                                        }
                                        XlSheet.cells((cellCount + 1), feedbackCellNo + cc).WrapText = 'True';

                                        cellCount = XlSheet.UsedRange.Rows.Count;
                                        if (lastCount < cellCount - 1) {
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 1), XlSheet.cells(cellCount, 1)).Merge();
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 2), XlSheet.cells(cellCount, 2)).Merge();
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 3), XlSheet.cells(cellCount, 3)).Merge();
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 4), XlSheet.cells(cellCount, 4)).Merge();
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 5), XlSheet.cells(cellCount, 5)).Merge();
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 6), XlSheet.cells(cellCount, 6)).Merge();
                                            XlSheet.Range(XlSheet.cells((lastCount + 1), 7), XlSheet.cells(cellCount, 7)).Merge();

                                            for (var mm = lastCount + 2; mm <= cellCount; mm++)
                                                XlSheet.cells(mm, feedbackCellNo + cc).WrapText = 'True';

                                        }
                                    }
                                    else {
                                        XlSheet.cells((cellCount + 1), feedbackCellNo + cc).value = "N/A";
                                        cellCount++;
                                    }

                                }
                                feedAvail = 1;
                          }
                        if (feedAvail == 0) {
                            XlSheet.cells(2, 1).value = $("#projSelectTC option:selected").attr('title');
                            XlSheet.cells(2, 2).interior.colorindex = "27";
                            //XlSheet.cells(2,2).value = "No Rating available.";
                            //feedback.alertBox("No Rating available.");
                            /***Added by Mohini for resource file****/
                            XlSheet.cells(2, 2).value = '"No ' + feedback.rsRating + ' available."';
                            feedback.alertBox('"No ' + feedback.rsRating + ' available."');

                        }
                        else {
                            XlSheet.Range("A2:A" + cellCount).VerticalAlignment = -4108;
                            XlSheet.Range("A2:A" + cellCount).HorizontalAlignment = -4108;

                            XlSheet.Range("B2:B" + cellCount).VerticalAlignment = -4108;
                            XlSheet.Range("B2:B" + cellCount).HorizontalAlignment = -4108;

                            XlSheet.Range("C2:C" + cellCount).VerticalAlignment = -4108;
                            XlSheet.Range("C2:C" + cellCount).HorizontalAlignment = -4108;

                            XlSheet.Range("D2:D" + cellCount).VerticalAlignment = -4108;
                            XlSheet.Range("D2:D" + cellCount).HorizontalAlignment = -4108;

                            XlSheet.Range("E2:E" + cellCount).VerticalAlignment = -4108;
                            XlSheet.Range("E2:E" + cellCount).HorizontalAlignment = -4108;

                            if (isPortfolioOn) {
                                XlSheet.Range("F2:F" + cellCount).VerticalAlignment = -4108;
                                XlSheet.Range("F2:F" + cellCount).HorizontalAlignment = -4108;
                            }
                        }
                        xlApp.DisplayAlerts = true;
                        xlApp.Visible = true;
                        CollectGarbage();
                                }
                            
            }
            catch (err) {
                feedback.alertBox(err.message);
                window.setTimeout("Main.hideLoading()", 200);
            }

        }
        Main.hideLoading();
    },
    
    /* Function to show jquery alert box */
    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 150, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    },
    /* function added by shilpa */
    filterData: function (info2) {
        var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        if (navigator.appName == "Microsoft Internet Explorer")
            info2 = mydiv.innerText;
        else
            info2 = mydiv.textContent;
        return info2;
    },

    alertBox: function (msg) {
        $("#divAlert").text(msg);
        $('#divAlert').dialog({ height: 150, modal: true, buttons: { "Ok": function () { $(this).dialog("close"); } } });
    }



}
