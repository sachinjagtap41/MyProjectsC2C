/* Copyright Â© 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var multiSelectList={

functionToInvoke:"",
functionToInvoke1:"",
allRolesUnchecked:true,
height:"120px;",
sBulleteChar:'Ã,v,Ã¼,Â§',  //Added by Nikhil

/*Function to check all check boxes*/
selectAll:function(divID)
{
            //alert(divID);
            //flag is when event is called from teststep page
            if(divID=="testCaseName")
            	teststep.flagSelectAll+=1;
            else
            {
	            if(divID=="assotestcases")
	            	teststep.flagSelectAll = 1;
            }
         	$("#"+divID).find(".mslChk").attr('checked','checked');
         	//Code Modified by swapnil kamle on 6/8/2012 to show checkboxes when click All.
         	$("#"+divID+" li").each(
       				function()
       				{
			     		if($(this).children(".mslChk").attr('disabled') == true)
			         	{
			         		$(this).children(".mslChk").attr('checked', false);
			         	}
			     		$(this).show();
			     		//$("#anchShow_"+divID).text('Selected'); 
			     		
       				}
       			);
       		 //	
         	//$("#ulItems"+divID).children(".mslChk").attr('checked','checked');
        
},

/*Function to unchecked all check boxes*/
selectNone:function(divID)
{

			//$("#ulItems"+divID).children(".mslChk").attr('checked','checked');

         	$("#"+divID).find(".mslChk").removeAttr('checked','checked');
         	multiSelectList.allRolesUnchecked=true;
         	

},

toggleSelectionDisplay:function(divID)
{			
			
         	if($("#anchShow_"+divID).text().trim()=="Selected")						    			
			{
				$("#"+divID+" li").each(
					function()
					{
			   			if($(this).children(".mslChk").attr('checked') == false)
						{
						 	 $(this).hide();
						} 
						$("#anchShow_"+divID).text('All'); 
					}
				); 
			}
       		else if($("#anchShow_"+divID).text().trim()=="All")
       		{ 
       			$("#"+divID+" li").each(
       				function()
       				{
			     		$(this).show();
			     		$("#anchShow_"+divID).text('Selected'); 
			     		
       				}
       			);
			}    		
},

//create multi select list control in specified divison with list items passed in parameter
//along with name of column (i.e. columnNameForText) for Text property and name of column 
//(i.e. columnNameForValue) for Value property of list control
createMultiSelectList:function(divID,listItems,columnNameForText,columnNameForValue,height,width)
{
	/*Code added by Deepak for implementation of sequencing 16-4-13*/
	var divhtml="";
	
	if(divID == "assotestcases")
	{   
		divhtml+="<div class='Mediumddl' style='border: solid 1px #ccc;  width:"+width+" '>" /*  padding-left:1px; */

		+"<ul id='ulItemsassotestcases' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
			"<li>Select:&nbsp;<a id='linkSA_assotestcases' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");"+multiSelectList.functionToInvoke1+"'>All</a>"+
				 //"&nbsp;&nbsp;&nbsp;<a id='linkSN_assotestcases' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");"+multiSelectList.functionToInvoke1+"'>None</a>"+
				 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_assotestcases' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke1+"'>Selected</a></li>"+
			"<li><hr/></li>"+
			//"<div style='overflow-y:scroll; height:"+multiSelectList.height+" width:290px'>";
			"<div style='overflow-y:scroll; height:"+height+" width:"+width+"'>";
	}

	else if(divID != "testerRoles")
	{   
	    if(divID=="testCaseName")
		divhtml+= "" //"<p style='margin-top:5px;'><b>NOTE:</b>Please select single testcase for teststep sequence configuration.</p>"		
		divhtml+="<div class='Mediumddl' style='border: solid 1px #ccc;  width:"+width+" '>" /*  padding-left:1px; */
		/*Code added by Deepak for implementation of sequencing 16-4-13*/

			+"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
				"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>All</a>"+
					 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>None</a>"+
					 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>Selected</a></li>"+
				"<li><hr/></li>"+
				//"<div style='overflow-y:scroll; height:"+multiSelectList.height+" width:290px'>";
				"<div style='overflow-y:scroll; height:"+height+" width:"+width+"'>";
	}
	else
	{
		var divhtml="<div class='Mediumddl' style='border: solid 1px #ccc;  width:447px; padding-left:1px;'>"+
			"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
				"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");'>All</a>"+
					 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");'>None</a>"+
					 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>Selected</a></li>"+
				"<li><hr/></li>"+
				//"<div style='overflow-y:scroll; height:"+multiSelectList.height+" width:290px'>";
				"<div style='overflow-y:scroll; height:"+height+" width:447px'>";
	}				
					
	for(var i=0;i<listItems.length;i++)
	{		
		var itemId = divID+"_"+listItems[i][columnNameForValue];
		/*Edited ny nitu on 18 dec 2012 for  item text to display on hover*/
		if(listItems[i][columnNameForText] != undefined)
		{
			var hoverTxt=multiSelectList.GetFormatedText(listItems[i][columnNameForText]).replace(/(\r\n)+/g, '');
			hoverTxt = multiSelectList.filterData1(hoverTxt); //shilpa 17 apr bug: 7660
			hoverTxt = hoverTxt.replace(/(.|\n)*?/ig,'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
			hoverTxt=hoverTxt.replace(/"/g, "&quot;");
			hoverTxt=hoverTxt.replace(/'/g, '&quot;');
			hoverTxt=hoverTxt.replace(/(\r\n)+/g, '');
	
			//Nikhil - 03/04/2012 - Added to handle bullted Text
			
			if(divID == "assotestcases")
			{	
				divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke1+"'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(listItems[i][columnNameForText].replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(listItems[i][columnNameForText].replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
			}
			else if(divID=='testStepName')
			{
				var vTestStepData = multiSelectList.GetFormatedText(listItems[i][columnNameForText].replace(/(\r\n)+/g, ''));
				//var vTrimmedData= trimText(multiSelectList.filterData(vTestStepData),100);
				var vTrimmedData = multiSelectList.filterData(vTestStepData); // modified for bug 10552
				
				divhtml=divhtml+"<li title='"+multiSelectList.filterData(hoverTxt).trim()+"'><input id='"+itemId+"' type='checkbox'  class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"'  style=\"display: none;\">"+vTestStepData+"</span>"+vTrimmedData+"</li>";
			}
			else if(divID=='testStepMultiSel')
			{
				var vTestStepData = multiSelectList.GetFormatedText(listItems[i][columnNameForText].replace(/(\r\n)+/g, ''));
				var vTrimmedData= trimText(multiSelectList.filterData(vTestStepData),100);
				
				divhtml=divhtml+"<li title='"+multiSelectList.filterData(hoverTxt).trim()+"'><input id='"+itemId+"' type='checkbox'  class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"'  style=\"display: none;\">"+vTestStepData+"</span>"+vTrimmedData+"</li>";
			}
			else
			{
				if(divID=="testerRoles")
					divhtml=divhtml+"<li title='"+multiSelectList.filterData(hoverTxt).trim()+"'><input id='"+itemId+"'  type='checkbox' class='mslChk'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(listItems[i][columnNameForText])+"</span>"+trimText(multiSelectList.filterData(listItems[i][columnNameForText]),100)+"</li>";
				else
				{
					divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(listItems[i][columnNameForText].replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(listItems[i][columnNameForText].replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
				}		
			}
		}	
	}			
											
	divhtml+="</div></ul></div>";//</div>";

	$("#"+divID).html(divhtml);										

},
/*Function added for Roles Div by swapnil kamle on 29 jan 2013*/
createRoleMultiSelectList:function(divID,listItems,columnNameForText,columnNameForValue,height)
{
	var divhtml="<div class='Mediumddl' style='border: solid 1px #ccc;  width:447px; padding-left:1px;'>"+
				"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
					"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");'>All</a>"+
						 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");'>None</a>"+
						 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:#0066FF; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");'>Selected</a></li>"+
					"<li><hr/></li>"+
					"<div style='overflow-y:scroll; height:"+height+" width:447px'>";
					
	if(divID=="role")
	{
		var itemId = divID+"_1";
		divhtml=divhtml+"<li title='Standard'><input id='"+itemId+"'  type='checkbox' class='mslChk'></input><span id='"+itemId+"' style=\"display: none;\">Standard</span>Standard</li>";				
	}				
	for(var i=0;i<listItems.length;i++)
	{		
		var itemId = divID+"_"+listItems[i][columnNameForValue];
		/*Edited ny nitu on 18 dec 2012 for  item text to display on hover*/
		var hoverTxt=multiSelectList.GetFormatedText(listItems[i][columnNameForText]).replace(/(\r\n)+/g, '');
		hoverTxt = multiSelectList.filterData1(hoverTxt); //shilpa 17 apr bug: 7660
		hoverTxt = hoverTxt.replace(/(.|\n)*?/ig,'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
		hoverTxt=hoverTxt.replace(/"/g, "&quot;");
		hoverTxt=hoverTxt.replace(/'/g, '&quot;');
		hoverTxt=hoverTxt.replace(/(\r\n)+/g, '');

		//Nikhil - 03/04/2012 - Added to handle bullted Text	
		if(divID=='testStepName')
		{
			var vTestStepData = multiSelectList.GetFormatedText(listItems[i][columnNameForText].replace(/(\r\n)+/g, ''));
			var vTrimmedData= trimText(multiSelectList.filterData(vTestStepData),100);
			
			divhtml=divhtml+"<li title='"+multiSelectList.filterData(hoverTxt).trim()+"'><input id='"+itemId+"' type='checkbox'  class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"'  style=\"display: none;\">"+vTestStepData+"</span>"+vTrimmedData+"</li>";
		}
		else
		{
			if(divID=="testerRoles")
				divhtml=divhtml+"<li title='"+multiSelectList.filterData(hoverTxt).trim()+"'><input id='"+itemId+"'  type='checkbox' class='mslChk'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(listItems[i][columnNameForText])+"</span>"+trimText(multiSelectList.filterData(listItems[i][columnNameForText]),100)+"</li>";
			else
				divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(listItems[i][columnNameForText].replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(listItems[i][columnNameForText].replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
		}
		
	}			
											
	divhtml+="</div></ul></div>";//</div>";
	

	$("#"+divID).html(divhtml);										

},




/*End */

setSelectedItems:function(divID,selectedListItems,columnNameForSelectedListItems)
{
		multiSelectList.selectNone(divID);
   
	
	for(var i=0;i<selectedListItems.length;i++)
	{	var itemId = divID+"_"+parseInt(selectedListItems[i][columnNameForSelectedListItems]);
		$('input[id="'+itemId+'"]').attr('checked','checked');
		//alert(selectedListItems[i][columnNameForSelectedListItems]);
	}
},

setSelectedItemsFromArray:function(divID,itemArray)
{
	multiSelectList.selectNone(divID);
	for(var i=0;i<itemArray.length;i++)
	{		
		var itemId = divID+"_"+itemArray[i];
		$('input[id='+itemId+']').attr('checked','checked');
	}
},
selectItem:function(divID,id)
{
	multiSelectList.selectNone(divID);
   
    if(id.indexOf(',')==-1)
    {    var itemId = divID+"_"+id;
		$('input[id='+itemId+']').attr('checked','checked');
	}
	else
	{
		var ids=id.split(",");
		for(var i=0;i<ids.length;i++)
		{   var itemId = divID+"_"+ids[i];
			$('input[id='+itemId+']').attr('checked','checked');
		}

	}	
},

selectItemByIndex:function(divID,index)
{
	multiSelectList.selectNone(divID);

	$(':checkbox:eq('+index+')').attr('checked','checked');
},

addItem:function(divID,itemText,itemID)
{
	var itemId = divID+"_"+itemID;
	var strHtml="<li><input id='"+itemId+"' type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+itemId+"'>"+itemText+"</span></li>";
	$('#ulItems'+divID).append(strHtml);
	
},

filterData:function (info2){

	if(info2!=null && info2!=undefined)
		return info2.replace(/<(.|\n)*?>/ig,'');
   		
},
getTextofItemsByValue:function(divID,arrID)
{
	var arrText=new Array();
	for(var i=0;i<arrID.length;i++)
	{	
	    var itemId = divID+"_"+arrID[i];
		//not to push blank value in array
		if($('#'+divID+' span[id="'+itemId+'"]').text()!="")
		arrText.push($('#'+divID+' span[id="'+itemId+'"]').text());
	}
	
	return arrText;
},
getSelectedItems:function(divID)
{
	var arrItems=new Array();
	$("#"+divID+" li").each(
			function()
			{
				if($(this).children(".mslChk").attr('checked') == true)
				{
					arrItems.push($(this).children(".mslChk").attr('Id'));  
				}
			});
	return arrItems; 
},
/* shilpa 17 apr bug 7660 */
filterData1:function (info2){
   		var mydiv = document.createElement("div");
        mydiv.innerHTML = info2;
        info2=mydiv.innerText;            
		return  info2;     
},

createMultiSelectListUsingArray:function(divID,array,height,width)
{
	var divhtml="<div class='Mediumddl' style='border: solid 1px #ccc;  width:"+width+"; padding-left:1px;'>"+				
				"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
					"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>All</a>"+
						 "&nbsp;&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>None</a>"+
						 "&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;Show:&nbsp;<a id='anchShow_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.toggleSelectionDisplay(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>Selected</a></li>"+
					"<li><hr/></li>"+
					"<div style='overflow-y:scroll; height:"+height+" width:"+width+"'>";								
	for(var i=0;i<array.length;i++)
	{			
		divhtml=divhtml+"<li><input id='"+i+"' type='checkbox' class='mslChk' onclick='"+multiSelectList.functionToInvoke+"'></input><span id='"+i+"'  style=\"display: none;\">"+array[i]+"</span>"+trimText(array[i],100)+"</li>";
	}														
	divhtml+="</div></ul></div>";//</div>";
	$("#"+divID).html(divhtml);									
},

//Nikhil - 2/03/2012 - Returns Formated Text for Actual and Expected Results.
GetFormatedText:function(sText,FromExport)
{
	if(FromExport=='true')
	{
		var sNewLine='\n';
		
		if(FromExport=='true')
		{
			sNewLine='\n';
		}
		else
		{
			sNewLine='<br/>';
		}
		var sResult ='';
		var FlagBullete='false';
		$('#dvTemp').html('');
		$('#dvTemp').html(sText);
		var length = $('#dvTemp').find('p').length-1;
		if(length>0)
		{
			for(i=0;i<=length;i++)
			{
				FlagBullete='false';
				var txtText;
				var pElement= $('#dvTemp').find('p')[i];
				// case for Special bullete 
				if(pElement.childNodes.length==1)
				{
					//if(pElement.childNodes[0].nodeName=='A')
					if(pElement.childNodes[0].childNodes.length >= 2)
					{
						pElement= pElement.childNodes[0];
					}
				}
				// Handle Three Span to determine bullete.
				
				if(pElement.childNodes.length>=2)
				{
					FlagBullete='true';
				}
				if(pElement.childNodes.length>=2)
				{
					txtText= pElement.childNodes[pElement.childNodes.length-1].innerText;
					if(txtText!=undefined && txtText!=null && txtText!='')
					{	
						if(FlagBullete=='true')
						{
							sResult = sResult+'*  '+txtText+sNewLine;	//'\n';
						}
						else
						{
							sResult = sResult + txtText+sNewLine;	//'\n';
						}
					}
				}
				else
				{
					sResult = sResult + $('#dvTemp').find('p')[i].innerText +sNewLine;	//'\n';
				}
			}
		}
		else
		{
			while(sText.indexOf('<br />')!=-1)
			{
				sText= sText.replace('<br />','');
			}
			sResult= sText;
		}
		return sResult;
	}
	else
	{
		var arrBullet= multiSelectList.sBulleteChar.split(',');
			
		for(i=0;i<=arrBullet.length-1;i++)
		{
		  while(sText.indexOf('>'+arrBullet[i]+'<span')!=-1)
			   	sText= sText.replace('>'+arrBullet[i]+'<span','>* <span');
		}
		return sText;
	}
}
}