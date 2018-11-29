var multiSelectList = {

sBulleteChar:'Ø,v,ü,§',

selectAll:function(divID)
{
   	var elementsLadder = divID+" div div li";
 	   	$("#"+elementsLadder).each(function()
		{
			if($(this).css("display") != "none")
				$(this).find("input").attr("checked","checked");	
		});
	//if($.inArray(divID,Reporting.FilterAppliedDivIDs) != -1)
		//report.filterRecords(divID);
},


setSelectedItemsFromArray:function(divID,itemArray)
{
	multiSelectList.selectNone(divID);
	for(var i=0;i<itemArray.length;i++)
	{		
		if(itemArray[i] == "Not Completed")
		{
			$('#ulItemsdvStatusC div').find('span').each(function(){if($(this).text() == "Not Completed") $(this).siblings().eq(0).attr('checked','checked');});
			$('#ulItemsdvStatus div').find('span').each(function(){if($(this).text() == "Not Completed") $(this).siblings().eq(0).attr('checked','checked');});
		}
		else
		{
			var itemId = divID+"_"+itemArray[i];
			itemId = itemId.replace(/\s/g, "");
			$('input[id='+itemId+']').attr('checked','checked');
		}	
	}
},


selectNone:function(divID)
{
 	$("#"+divID).find(".mslChk").removeAttr('checked','checked');
 	multiSelectList.allRolesUnchecked=true;
},

createMultiSelectList:function(divID,listItems,columnNameForText,columnNameForValue,height,chk,clear)
	{
		var divhtml="";
		    
    	divhtml+="<div class='Mediumddl' style='border: solid 1px #ccc; width:300px; padding-left:1px;margin-left:-5px;margin-top:5px'>"
			+"<ul id='ulItems"+divID+"' style='list-style-type:none; list-style-position:outside;display:inline;'>"+
			"<li>Select:&nbsp;<a id='linkSA_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectAll(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>All</a>"+
				 "&nbsp;&nbsp;<a id='linkSN_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='multiSelectList.selectNone(\""+divID+"\");"+multiSelectList.functionToInvoke+"'>None</a>";
				// if(clear == "clear" || $.inArray(divID,report.arrayOfFilteredColumn) != -1)
				 	//divhtml+="&nbsp;&nbsp;|&nbsp;&nbsp;<a id='anchShow_"+divID+"' style='color:blue; text-decoration:underline; cursor:pointer' onclick='newDashboard.clearFilter(\""+divID+"\");'>Clear Filter</a></li>";
				 
			divhtml+="<li><hr/></li>";
			divhtml+="<div style='overflow-y:auto; height:"+height+" width:inherit;white-space: nowrap;border:1px #ccc solid'>";
		    				
		var TestCaseID = new Array();
		var TestCaseName ; 
		var RoleName;
		var RoleID = new Array();
		var status ;
		var arrStatus = new Array();
		
		for(var i=0;i<listItems.length;i++)
		{		
			if(listItems[i][columnNameForValue].indexOf(",") != -1)
			{
				var listItemsForRole = listItems[i][columnNameForValue].split(",");
				for(var l=0; l<listItemsForRole.length; l++)
				{
					
					var itemId = divID+"_"+listItemsForRole[l];
					itemId = itemId.replace(/\s/g, ""); 
					if(listItems[i][columnNameForText] != undefined)
					{
						status = report.statusFortestStepIDs[i];
						var hoverTxt=multiSelectList.GetFormatedText(listItemsForRole[l]).replace(/(\r\n)+/g, '');
						hoverTxt = multiSelectList.filterData1(hoverTxt); 
						hoverTxt = hoverTxt.replace(/(.|\n)*?/ig,'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
						hoverTxt=hoverTxt.replace(/"/g, "&quot;");
						hoverTxt=hoverTxt.replace(/'/g, '&quot;');
						hoverTxt=hoverTxt.replace(/(\r\n)+/g, '');
						switch(divID)
						{
							case "dvTestCasesID":
									if($.inArray(listItems[i][columnNameForValue],TestCaseID) == -1)
									  {
									  
									  	TestCaseID.push(listItems[i][columnNameForValue]);
									  	TestCaseName = report.TCIDForTCName[listItems[i][columnNameForValue]];
									  	if(chk == "checked")
									  		divhtml=divhtml+"<li title='"+TestCaseName +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";
									  	else	
									  		divhtml=divhtml+"<li title='"+TestCaseName +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";
									  }
							break;
							
							case "dvRole":
										if($.inArray(listItemsForRole ,RoleID ) == -1)
									  	{
											RoleName = report.RoleNameForRoleID[listItemsForRole[l]];
											RoleID.push(listItemsForRole[l]);
		
											if(chk == "checked")
												divhtml=divhtml+"<li title='"+RoleName +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
											else
												divhtml=divhtml+"<li title='"+RoleName +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";		
										}
							break;
							
							case "dvStatus":
										if($.inArray(status,arrStatus) == -1)
									  	{
									  		itemId = divID+"_"+report.statusFortestStepIDs[i];
									  		itemId = itemId.replace(/\s/g, ""); 
		
											arrStatus.push(status);
		
											if(chk == "checked")
												divhtml=divhtml+"<li title='"+status +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
											else
												divhtml=divhtml+"<li title='"+status +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";		
										}
							break;
		
						
						}	
							
					}
			
			
				
				}
			}
			
			else
			{
					var itemId = divID+"_"+listItems[i][columnNameForValue];
					itemId = itemId.replace(/\s/g, ""); 
					if(listItems[i][columnNameForText] != undefined)
					{
						status = report.statusFortestStepIDs[i];
						var hoverTxt=multiSelectList.GetFormatedText(listItems[i][columnNameForText]).replace(/(\r\n)+/g, '');
						hoverTxt = multiSelectList.filterData1(hoverTxt); 
						hoverTxt = hoverTxt.replace(/(.|\n)*?/ig,'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
						hoverTxt=hoverTxt.replace(/"/g, "&quot;");
						hoverTxt=hoverTxt.replace(/'/g, '&quot;');
						hoverTxt=hoverTxt.replace(/(\r\n)+/g, '');
						switch(divID)
						{
							case "dvTestCasesID":
									if($.inArray(listItems[i][columnNameForValue],TestCaseID) == -1)
									  {
									  
									  	TestCaseID.push(listItems[i][columnNameForValue]);
									  	TestCaseName = report.TCIDForTCName[listItems[i][columnNameForValue]];
									  	if(chk == "checked")
									  		divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";
									  	else	
									  		divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(TestCaseName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";
									  }
							break;
							
							case "dvRole":
										if($.inArray(listItems[i][columnNameForValue],RoleID ) == -1)
									  	{
											RoleName = report.RoleNameForRoleID[listItems[i][columnNameForValue]];
											RoleID.push(listItems[i][columnNameForValue]);
		
											if(chk == "checked")
												divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
											else
												divhtml=divhtml+"<li title='"+hoverTxt+"'><input id='"+itemId+"'  type='checkbox' class='mslChk' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(RoleName.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";		
										}
							break;
							
							case "dvStatus":
										if($.inArray(status,arrStatus) == -1)
									  	{
									  		itemId = divID+"_"+report.statusFortestStepIDs[i];
									  		itemId = itemId.replace(/\s/g, ""); 
		
											arrStatus.push(status);
		
											if(chk == "checked")
												divhtml=divhtml+"<li title='"+status +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' checked='checked' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";	
											else
												divhtml=divhtml+"<li title='"+status +"'><input id='"+itemId+"'  type='checkbox' class='mslChk' ></input><span id='"+itemId+"' style=\"display: none;\">"+multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;'))+"</span>"+trimText(multiSelectList.filterData(status.replace(/</g,'&lt;').replace(/>/g,'&gt;')),100)+"</li>";		
										}
							break;
		
						
						}	
							
					}
			
			}
			
			
			
			
		}			
		divhtml+="</div></ul><div style='margin-top:5px;float:right;padding:5px 0px 5px 0px'><input type='button' class='btn' style='width:50px;margin-left:0px' value='Ok' onclick='report.startFilters(\""+divID+"\")'/><input type='button' class='btn' style='margin-left:0px' value='Clear Filter' style='margin-left:5px;margin-right:7px;' onclick='report.clearFilter(\""+divID+"\");'/></div></div>";
		
		$("#"+divID).html(divhtml);										
	
	},

GetFormatedText:function(sText,FromExport)
{
	  
	  sText = sText.toString();//Added by Rajiv on 20 May 2013 to handle indef operation below for string formatting
	  if(FromExport=='true')
	  {
		  var sNewLine='\n';
		  if(FromExport=='true')
		  	sNewLine='\n';
		  else
		  	sNewLine='<br/>';
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
							pElement= pElement.childNodes[0];
					}
					// Handle Three Span to determine bullete.
					if(pElement.childNodes.length>=2)
						FlagBullete='true';
					if(pElement.childNodes.length>=2)
					{
					
						txtText= pElement.childNodes[pElement.childNodes.length-1].innerText;
						if(txtText!=undefined && txtText!=null && txtText!='')
						{	
							if(FlagBullete=='true')
								sResult = sResult+'*  '+txtText+sNewLine;	//'\n';
							else
								sResult = sResult + txtText+sNewLine;	//'\n';
						}
					}
					else
						sResult = sResult + $('#dvTemp').find('p')[i].innerText +sNewLine;	//'\n';
				}
			}
			else
			{
				// Remove <br />
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
	},
	

filterData:function (info2){
	if(info2!=null && info2!=undefined)
		return info2.replace(/<(.|\n)*?>/ig,'');
},
filterData1:function (info2){
	var mydiv = document.createElement("div");
    mydiv.innerHTML = info2;
    info2=mydiv.innerText;            
	return  info2;     
},


}