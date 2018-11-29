/* Copyright © 2014 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/
var resource ={

 isConfig:'false',
 gPageConfigLabelOldValues:new Array(),
 gPageConfigLabelNewValues:new Array(),
 gMenuConfigurableOldValues:new Array(),
 gMenuConfigurableNewValues:new Array(),
 gPageHeadingOldValues:new Array(),
 gPageHeadingNewValues:new Array(),
 gPageTabOldValues:new Array(),
 gPageTabNewValues:new Array(),
 gPageSpecialTerms:new Array(),
 gPageSpecialTermsOldValues:new Array(),
 gPageSpecialTermsNewValues:new Array(),

UpdateTableHeaderText:function(){
 	 //Assign column name of table header text
    $('table.gridDetails thead tr td').each(function(){
    	var index = $.inArray($(this).text().replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
    	if(index!=-1)
    	{
    		var newValue = resource.gPageConfigLabelNewValues[index];
    		if(newValue!='')
    		{
               $(this).html($.trim(newValue));
            }
    	}
	});
 
},
updateTableColumnHeadingTesMgnt:function()
{
  $('table.tableGrid thead tr.griDetails td').each(function(ind,val){
       	var index = $.inArray($(this).text().replace(/\s/g, '').toUpperCase(),resource.gPageSpecialTermsOldValues);
       	if(index!=-1)
       	{
       	   var newValue=resource.gPageSpecialTermsNewValues[index];
       	   if(newValue!='')
       	   {
       	     $(this).html($.trim(newValue));
       	   }
       	}
  });
},
/**********Code For Table Header Of New Report Page(Go to detailed view page from dashboard Stakeholder page)******************/
updateTableHeaderTextOfNewReportPage:function()
{
	$('table.gConfigTableHeader thead tr td').each(function(){
	   var index = $.inArray($(this).text().replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
	   if(index!=-1)
	   {
		    var newValue = resource.gPageConfigLabelNewValues[index];
		    if(newValue!='')
	        {
	           $(this).html($.trim(newValue));
	        }
	   }
	});
},
updateTableColumnHeadingNewDashboard:function()
{
    $('table.gridDetails thead tr td').each(function(){
       var index=$.inArray($(this).text().replace(/\s/g, '').toUpperCase(),resource.gPageSpecialTermsOldValues);
       if(index!=-1)
       {
	        var newValue=resource.gPageSpecialTermsNewValues[index];
	        if(newValue!=-1)
	        {
	          $(this).html($.trim(newValue));
	        }
       }

    });
},
CreateMenu:function(){
   //assign Menu values
	for(var i=1;i<7;i++)
	{
		var indexFound = $.inArray($('#navHeading .navHead #tab'+parseInt(i)).text(),resource.gMenuConfigurableOldValues);
		if(indexFound!=-1)
			$('#navHeading .navHead #tab'+parseInt(i)).text(resource.gMenuConfigurableNewValues[indexFound]);
	}

},

ClearGloabalCollection:function(){
  resource.gPageConfigLabelOldValues.splice(0,resource.gPageConfigLabelOldValues.length);
  resource.gPageConfigLabelNewValues.splice(0,resource.gPageConfigLabelNewValues.length);
  resource.gMenuConfigurableOldValues.splice(0,resource.gMenuConfigurableOldValues.length);
  resource.gMenuConfigurableNewValues.splice(0,resource.gMenuConfigurableNewValues.length);
  resource.gPageHeadingOldValues.splice(0,resource.gPageHeadingOldValues.length);
  resource.gPageHeadingNewValues.splice(0,resource.gPageHeadingNewValues.length);
  resource.gPageSpecialTermsOldValues.splice(0,resource.gPageSpecialTermsOldValues.length);
  resource.gPageSpecialTermsNewValues.splice(0,resource.gPageSpecialTermsNewValues.length);
  resource.gPageTabOldValues.splice(0,resource.gPageTabOldValues.length);
  resource.gPageTabNewValues.splice(0,resource.gPageTabNewValues.length);
}

}


$(document).ready(function(){  
				 if(Main.isRootWebFlag == 0)
					Main.getSiteType();
				 if(isRootWeb)
				 	  var url = "../SiteAssets/ConfigurableData/template.xml";
				 else
				 	var url = "../../SiteAssets/ConfigurableData/template.xml"	         		
          		 // get clients
			    $.ajax({
			        type: "GET",
			        url: url,
			        dataType: "xml",
			        async:false,
			        success: function (xml) {
			        
			        	$(xml).find('configurableText').each(function(){
			        		resource.isConfig = $(this).attr('isConfig');
			        	});
			        	
			        	resource.ClearGloabalCollection();
			        	
			        	if(resource.isConfig.toLowerCase()=='true')
			        	{
				        	//read xml Menu tabs 
				        	$(xml).find('menuItems').each(function(indexM,valM){
				        		 resource.gMenuConfigurableOldValues.push($.trim($(this).attr('oldValue')));
				        		 resource.gMenuConfigurableNewValues.push($.trim($(this).attr('newValue')));
				        	});
				        	//assign Menu values
				        	for(var i=1;i<7;i++)
				        	{
				        		var indexFound = $.inArray($('#navHeading .navHead #tab'+parseInt(i)).text(),resource.gMenuConfigurableOldValues);
				        		if(indexFound!=-1)
				        			$('#navHeading .navHead #tab'+parseInt(i)).text(resource.gMenuConfigurableNewValues[indexFound]);
				        	}
				        	
				        	//read xml Page Headings 
				        	$(xml).find('heading').each(function(indexM,valM){
				        		 resource.gPageHeadingOldValues.push($.trim($(this).attr('oldValue')));
				        		 resource.gPageHeadingNewValues.push($.trim($(this).attr('newValue')));
				        	});
				        		
                            var indexHead = $.inArray($.trim($('.box span:eq(0)').text()),resource.gPageHeadingOldValues);
				        	if(indexHead!=-1)
				        		$('.box span:eq(0)').text($.trim(resource.gPageHeadingNewValues[indexHead]));
				        		
				        	//assign heading text testMgnt
				        	var indexHeadTstMgnt = $.inArray($.trim($('.pgHead').text()),resource.gPageHeadingOldValues);
				        	if(indexHeadTstMgnt !=-1)
				        		$('.pgHead').text($.trim(resource.gPageHeadingNewValues[indexHeadTstMgnt ]));
				        			
				        	//read xml tab
				        	$(xml).find('tabItems').each(function(){ 
				        	     resource.gPageTabOldValues.push($.trim($(this).attr('oldValue')).replace(/\s/g, '').toUpperCase());
				        		 resource.gPageTabNewValues.push($.trim($(this).attr('newValue')).toUpperCase());
				        	});
				        	
				        	//for testManagement lefthand side navigation panel
                            for(var i=0;i<5;i++)
                            {
                              index=$.inArray($.trim($('.navTabs h2:eq('+i+')').text()).replace(/\s/g, '').toUpperCase(),resource.gPageTabOldValues);
                              if(index!=-1)
                              {
                               $('.navTabs h2:eq('+i+')').text(resource.gPageTabNewValues[index]);
                              }
                            }
                            	
                            //read xml Special terms
				        	$(xml).find('term').each(function(){ 
				        	     resource.gPageSpecialTermsOldValues.push($(this).attr('oldValue').replace(/\s/g, '').toUpperCase());
				        		 resource.gPageSpecialTermsNewValues.push($(this).attr('newValue'));
				        	});
				        	//for Portfolio feature
				        	$('.boxName').each(function(index,value){
				        	 var spanText=$.trim($(this).text());
				        	 var index=$.inArray(spanText.replace(/\s/g, '').toUpperCase(),resource.gPageSpecialTermsOldValues);
				        	 if(index!=-1)
				        	 {
				        	   var newValue = resource.gPageSpecialTermsNewValues[index];
				        	   if(newValue!=-1)
				        	   {
				        	     $(this).text(newValue);
				        	   }
				        	 }
				        	});
				        	
				        	//read xml values for page lables
				            $(xml).find('configurableText').each(function () {
				                 	var lblvar = $(this).find('text');
				                 	if(lblvar.length>0)
				                 	{
				                 		$(this).find('text').each(function(){
				                 			resource.gPageConfigLabelOldValues.push($(this).attr('oldValue').replace(/\s/g, '').toUpperCase());
				                 			resource.gPageConfigLabelNewValues.push($.trim($(this).attr('newValue')));
				                 		});
				                 	}
				            });
				            
				            //Assign label values
				            $('.box label').each(function(index,val){
				            	var labelTextWithColon = $.trim($(this).text());
				            	var labelText = labelTextWithColon.substring(0,labelTextWithColon.length-1)
				            	//To remove in between spaces in labelText then find in array
				            	var index = $.inArray(labelText.replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
				            	if(index!=-1)
				            	{
				            		var newValue = resource.gPageConfigLabelNewValues[index];
				            		if(newValue!='')
				            		{
						            	if($(this).hasClass('mandatory'))
			        						$(this).html($.trim(newValue)+":"+"<font color='red'>*</font>");
			        					else
							            	$(this).html($.trim(newValue)+":");
						            }
				            	}
			          		});
			          		//Assign label values of testManagementab
				            $('.DivlblWithColon label').each(function(index,val){
				            	var labelTextWithColon = $.trim($(this).text());
				            	var labelText = labelTextWithColon.substring(0,labelTextWithColon.length-1)
				            	//To remove in between spaces in labelText then find in array
				            	var index = $.inArray(labelText.replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
				            	if(index!=-1)
				            	{
				            		var newValue = resource.gPageConfigLabelNewValues[index];
				            		if(newValue!='')
				            		{
						            	if($(this).hasClass('mandatory'))
			        						$(this).html($.trim(newValue)+":"+"<font color='red'><b>*</b></font>");
			        					else
							            	$(this).html($.trim(newValue)+":");
						            }
				            	}
			          		});

			          		
			          					          		
			          		//Assign label values code added for configuration page where some label are not inside box class
			          		//so lblDiv class is added in surrounding div
			          		$('.lblDiv label').each(function(index,val){
				            	var labelTextWithColon = $.trim($(this).text());
				            	var labelText = labelTextWithColon.substring(0,labelTextWithColon.length-1)
				            	//To remove in between spaces in labelText then find in array
				            	var index = $.inArray(labelText.replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
				            	if(index!=-1)
				            	{
				            		var newValue = resource.gPageConfigLabelNewValues[index];
				            		if(newValue!='')
				            		{
						            	if($(this).hasClass('mandatory'))
			        						$(this).html('<b>'+$.trim(newValue)+":"+"<font color='red'>*</font></b>");
			        					else
							            	$(this).html('<b>'+$.trim(newValue)+":</b>");
						            }
				            	}
			          		});
			          		
			          		//Assign label[With NoColon] text on query page
				            $('.DivlblWithNoColon label').each(function(index,val){
				            	var labelText = $.trim($(this).text());
				            	//To remove in between spaces in labelText then find in array
				            	var index = $.inArray(labelText.replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
				            	if(index!=-1)
				            	{
				            		var newValue = resource.gPageConfigLabelNewValues[index];
				            		if(newValue!='')
				            		{
						            	$(this).html($.trim(newValue));
						            }
				            	}
			          		});
			          		
			          		//Assign h3 heading text orange text
				            $('h3').each(function(index,val){
				            	var labelText = $.trim($(this).text());
				            	//To remove in between spaces in labelText then find in array
				            	var index = $.inArray(labelText.replace(/\s/g, '').toUpperCase(),resource.gPageConfigLabelOldValues);
				            	if(index!=-1)
				            	{
				            		var newValue = resource.gPageConfigLabelNewValues[index];
				            		if(newValue!='')
				            		{
						            	$(this).html($.trim(newValue));
						            }
				            	}
			          		});
			          		
			          		//read xml values for page special terms lables [used for changing runtime code terms e.g. in messages] 
				            $(xml).find('configurableText').each(function () {
				                 	var lblvar = $(this).find('term');
				                 	if(lblvar.length>0)
				                 	{
				                 		$(this).find('term').each(function(){
				                 			resource.gPageSpecialTerms[$(this).attr('oldValue')]= $(this).attr('newValue');
				                 		});
				                 	}
				            });
				            
			          		//Assign column name of table header text
			          		resource.updateTableColumnHeadingTesMgnt();
			          		resource.updateTableColumnHeadingNewDashboard();
			          		resource.UpdateTableHeaderText();
			          		resource.updateTableHeaderTextOfNewReportPage();
		          		}
		          		else
		          		{
		          			 //When configuration is false
		          			 //Assign mandatory label text with star
				            $('.box label').each(function(index,val){
				            	if($(this).hasClass('mandatory'))
	        						$(this).html($.trim($(this).html())+"<font color='red'>*</font>");
			          		});
			          		$('.lblDiv label').each(function(index,val){
				            	if($(this).hasClass('mandatory'))
	        						$(this).html('<b>'+$.trim($(this).html())+"<font color='red'>*</font></b>");
			          		});
			          		$('.DivlblWithColon label').each(function(index,val){
				            	if($(this).hasClass('mandatory'))
	        						$(this).html($.trim($(this).html())+"<font color='red'><b>*</b></font>");
			          		});

		          		}
			        }
			    });
			    
			    resource.CreateMenu();
			    
			    
 });
 
 
