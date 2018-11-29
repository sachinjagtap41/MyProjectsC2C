/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var DropDown={

/*For filling up Project drop down*/
fillProjectDD:function(projectList){
try{



}catch(e){
}
},



/*For filling up Scenario drop down*/
fillScenarioDD:function(scenarioList){
try{



}catch(e){
}
},



/*For filling up Testcase drop down*/
fillTestcaseDD:function(testcaseList){
try{



}catch(e){
}
},


/*For filling up pririty drop down*/
fillPriorityDD:function(id){

 var url= Main.getSiteUrl();
 var PriorityList = jP.Lists.setSPObject(url,'Priority');
 var QueryPri = '<Query><FieldRef Name="priorityId" Ascending="True" /></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;

if(PriorityNames != undefined)
{
 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['priorityValue'].toString();
	     var obj=new Option();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
} 
},

/*For filling up severity drop down*/
fillSeverityDD:function(id){

 var url= Main.getSiteUrl();
 var PriorityList = jP.Lists.setSPObject(url,'Severity');
 var QueryPri = '<Query><FieldRef Name="severityId" Ascending="True" /></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;


 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['severityValue'].toString();
	     var obj=new Option();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
},

/*For filling up status for scenario screen drop down*/
fillStatusSceDD:function(id){

 var url= Main.getSiteUrl();
 var PriorityList = jP.Lists.setSPObject(url,'StatusSce');
 var QueryPri = '<Query><FieldRef Name="statusId" Ascending="True" /></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;


 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['statusValue'].toString();
	     var obj=new Option();Main.getSiteUrl();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
},

/*For filling up status for testcases screen drop down*/
fillStatusTestDD:function(id){
 var url= Main.getSiteUrl();

 var PriorityList = jP.Lists.setSPObject(url,'StatusTestCase');
 var QueryPri = '<Query><FieldRef Name="StatusId" Ascending="True" /></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;


 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['StatusValue'].toString();
	     var obj=new Option();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
},


/*For filling up state drop down*/
fillStateDD:function(id){

 var url= Main.getSiteUrl();
 var PriorityList = jP.Lists.setSPObject(url,'State');
 var QueryPri = '<Query><FieldRef Name="stateId" Ascending="True" /></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;


 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['stateValue'].toString();
	     var obj=new Option();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
},

/*For filling up tester role drop down*/
fillTesterRoleDD:function(id){

 var url= Main.getSiteUrl();
 var PriorityList = jP.Lists.setSPObject(url,'TesterRole');
 var QueryPri = '<Query><FieldRef Name="testerRoleId" Ascending="True" /></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;

 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['testerRoleValue'].toString();
	     var obj=new Option();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
},

/*For filling up people drop down from project list to scenario screen */
fillPeopleDD:function(selPrjId,id){

 var url= Main.getSiteUrl();
 var PriorityList = jP.Lists.setSPObject(url,'Project');
 var QueryPri ='<Query><Where><Eq><FieldRef Name="projectTester"/><Value Type="Text">'+selPrjId+'</Value></Eq></Where></Query>';
 var PriorityNames = PriorityList.getSPItemsWithQuery(QueryPri).Items;

 for(var i=0;i<PriorityNames.length;i++)
 {
         var Pnames=PriorityNames[i]['projectTester'].toString();
	     var obj=new Option();
	     document.getElementById(id).options[i]=obj;
         document.getElementById(id).options[i].text = Pnames; 
  }
},



/*For filling up pririty drop down in edit mode*/
fillPriorityDDInEdit:function(selElement,dropid1){

 var url= Main.getSiteUrl();
 var List = jP.Lists.setSPObject(url,'Priority');
 var q='<Query><Where><Neq><FieldRef Name="priorityValue" /><Value Type="Text">'+selElement+'</Value></Neq></Where></Query>';
 var Data =List.getSPItemsWithQuery(q).Items;
 var obj=new Option();
 document.getElementById(dropid1).options[0]=obj;
 document.getElementById(dropid1).options[0].text = selElement; 
	     
 for(var i=1;i<=Data.length;i++)
 {
         var Pnames=Data[i-1]['priorityValue'].toString();
	     var obj=new Option();	     
	     document.getElementById(dropid1).options[i]=obj;
         document.getElementById(dropid1).options[i].text = Pnames;          
  }
},


/*For filling up state drop down in edit mode */
fillStateDDInEdit:function(selElement,dropid2){

 var url= Main.getSiteUrl();
 var List = jP.Lists.setSPObject(url,'State');
 var q='<Query><Where><Neq><FieldRef Name="stateValue" /><Value Type="Text">'+selElement+'</Value></Neq></Where></Query>';
 var Data =List.getSPItemsWithQuery(q).Items;
 var obj=new Option();
 document.getElementById(dropid2).options[0]=obj;
 document.getElementById(dropid2).options[0].text = selElement; 
 for(var i=1;i<=Data.length;i++)
 {
         var Pnames=Data[i-1]['stateValue'].toString();
	     var obj=new Option();	    
	     document.getElementById(dropid2).options[i]=obj;
         document.getElementById(dropid2).options[i].text = Pnames;
  }
},


/*For filling up severity drop down in edit mode*/
fillSeverityDDInEdit:function(selElement,dropid3){

 var url= Main.getSiteUrl();
 var List = jP.Lists.setSPObject(url,'Severity');
 var q='<Query><Where><Neq><FieldRef Name="severityValue" /><Value Type="Text">'+selElement+'</Value></Neq></Where></Query>';
 var Data =List.getSPItemsWithQuery(q).Items;
 var obj=new Option();
 document.getElementById(dropid3).options[0]=obj;
 document.getElementById(dropid3).options[0].text = selElement; 
 for(var i=1;i<=Data.length;i++)
 {
         var Pnames=Data[i-1]['severityValue'].toString();
	     var obj=new Option();	     
	     document.getElementById(dropid3).options[i]=obj;
         document.getElementById(dropid3).options[i].text = Pnames; 
 }
},


/*For filling up status drop down in edit mode of scenario screen*/
fillStatusDDInEdit:function(selElement,dropid4){

 var url= Main.getSiteUrl();
 var List = jP.Lists.setSPObject(url,'StatusSce');
 var q='<Query><Where><Neq><FieldRef Name="statusValue" /><Value Type="Text">'+selElement+'</Value></Neq></Where></Query>';
 var Data =List.getSPItemsWithQuery(q).Items;
 var obj=new Option();
 document.getElementById(dropid4).options[0]=obj;
 document.getElementById(dropid4).options[0].text = selElement; 
 for(var i=1;i<=Data.length;i++)
 {
         var Pnames=Data[i-1]['statusValue'].toString();
	     var obj=new Option();	     
	     document.getElementById(dropid4).options[i]=obj;
         document.getElementById(dropid4).options[i].text = Pnames; 
  }
},

/*For filling up status drop down in edit mode of Test Case screen*/
fillTestStatusDDInEdit:function(selElement,dropid6){

 var url= Main.getSiteUrl();
 var List = jP.Lists.setSPObject(url,'StatusTestCase');
 var q='<Query><Where><Neq><FieldRef Name="StatusValue" /><Value Type="Text">'+selElement+'</Value></Neq></Where></Query>';
 var Data =List.getSPItemsWithQuery(q).Items;
 var obj=new Option();	     	     
 document.getElementById(dropid6).options[0]=obj;
 document.getElementById(dropid6).options[0].text = selElement; 
 for(var i=1;i<=Data.length;i++)
 {
         var Pnames=Data[i-1]['StatusValue'].toString();
	     var obj=new Option();	     	     
	     document.getElementById(dropid6).options[i]=obj;
         document.getElementById(dropid6).options[i].text = Pnames; 
         
  }
},


/*For filling up tester role drop down in edit mode  */
fillTesterRoleDDInEdit:function(selElement,dropid5){

 var url= Main.getSiteUrl();
 var List = jP.Lists.setSPObject(url,'TesterRole');
 var q='<Query><Where><Neq><FieldRef Name="testerRoleValue" /><Value Type="Text">'+selElement+'</Value></Neq></Where></Query>';
 var Data =List.getSPItemsWithQuery(q).Items;
 var obj=new Option();
 document.getElementById(dropid5).options[0]=obj;
 document.getElementById(dropid5).options[0].text = selElement; 
 for(var i=1;i<=Data.length;i++)
 {
         var Pnames=Data[i-1]['testerRoleValue'].toString();
	     var obj=new Option();	     
         document.getElementById(dropid5).options[i]=obj;
         document.getElementById(dropid5).options[i].text = Pnames; 
  }
}

}
