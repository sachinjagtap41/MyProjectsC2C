var ClipData = {

	SiteURL:Main.getSiteUrl(),
	tblIndex:0,	
	flagIndent:'',	        
	
	GetClipBoard:function(element)
	{
		
		// JS: Check if ActiveX object can be created and MS Word is available
		var flgActiveX = 0, flgWord = 0;
		try {
            var objActiveX = new ActiveXObject("Scripting.FileSystemObject");
            flgActiveX = 1;
            var objWord = new ActiveXObject("Word.Application");
            flgWord = 1;
            if(flgActiveX == 1 && flgWord == 1)
            {
            	// JS: Open a word document and paste clipboard data to it
            	//objWord.Visible = true;
		        var doc = objWord.Documents.Add();
		        var sel = objWord.Selection;
		        sel.Paste();
		        // JS: Read Open XML for the word document
		        //var openXML = doc.WordOpenXML;
		        //if (!$.isXMLDoc(openXML)) openXML = $($.parseXML(openXML));
		        
		        /****/
		        var xdDoc = new ActiveXObject("Microsoft.XMLDOM");
				xdDoc.loadXML(doc.WordOpenXML); 
				var openXML = xdDoc.xml;
		        /****/
		        		        
		        ClipData.pasteData(openXML,element);
		        		
				//setTimeout("ClipData.pasteData("+openXML+"",""+element+");", 200);
		        
		        // JS: Cleanup Code
		        objActiveX.Quit();
		        objWord.Quit(0);
		        doc=sel=openXML=firstCut=secondCut=imgData=img=null;
        	}
        }
        catch (e) {
        	if(flgActiveX == 0 && flgWord == 0) Main.showPrerequisites();//alert("ActiveX Object cannot be created.");
        	if(flgActiveX == 1 && flgWord == 0) alert("Microsoft Word cannot be detected.");
        }	
	},
	
	//Function modified by Ejaz Waquif to support IE 10 
	pasteData:function(openXML,element)
	{
		Main.showLoading();
		
	    var openXML = 	openXML.replace(new RegExp('pkg:', 'g'),'')
					    .replace(new RegExp('w:document', 'g'),'document')
					    .replace(new RegExp('<w:body>', 'g'),'')
					    .replace(new RegExp('w:', 'g'),'')
					    .replace(new RegExp('</w:body>', 'g'),'')
					    .replace(new RegExp('</body>', 'g'),'')
					    .replace(new RegExp('a:graphic', 'g'),'graphic')
					    .replace(new RegExp('a:graphicData', 'g'),'graphicData')
					    .replace(new RegExp('pic:pic', 'g'),'pic')
					    .replace(new RegExp('pic:blipFill', 'g'),'blipFill')
					    .replace(new RegExp('a:blip', 'g'),'blip')
					    .replace(new RegExp('pic:pic', 'g'),'pic')
					    .replace(new RegExp('<tr', 'g'),'<tr1');

		
		/*
		var trArray = new Array();
		
		trArray = openXML.split('<tr rsidR');
		
		var openXMLFormatted = "";
		
		$.each( trArray, function(ind,val){
		
			if( ind == 0 )
				openXMLFormatted += val;
			else
			{
				var len = val.length;
				
				openXMLFormatted +="<tr>"+val.substring(30,len);
			}	
		
		
		});
		
		openXMLFormatted  = openXMLFormatted.replace(new RegExp('tr', 'g'),'tr1');
		*/
		
		////////Code Added by Mangesh to distinguish between bullets and numbering
		if($(openXML).find('part > xmlData > numbering').length>0)
		{
			var a=$(openXML).find('part > xmlData > numbering').find('lvl')[0].children[1].getAttribute('val');
			if(a=='bullet')
			{
				ClipData.flagIndent='b';	
			}
			else if(a=='decimal')
			{
				ClipData.flagIndent='d';
			}
		}	
		/////////////////////////////
		
		
		$(openXML).find('part > xmlData > document').children().each(function(index,val)
		{
		
			var arr = new Array();
			
			/* for inserting table **/
			if($(val).find('tr1')[0]!=undefined)
			{
				var p = document.createElement("table");
				
				p.id = "table" + ClipData.tblIndex;
				
				p.cellPadding = '0';
				
				p.cellSpacing = '0';
				
				element.appendChild(p); //table tag created
				
				var cnt = 0;
				
				var ii = 0;
				
				var colSpanValue = 0;
				
				var mergeStat = 0;
				
				$(val).find('tr1').each(function(i,v){	// iterating rows   
				
					if($(val).find('tr1')[0]!=undefined)
					{
						var p = document.createElement("tr");
						
						p.id = 'table' + ClipData.tblIndex + "row" + i;
						
						$('#table'+ClipData.tblIndex).append(p); // table-row created
						
						mergeStat = 0;
						
						if($(v).find('tcPr').find('vMerge')[0]!=undefined)
						{
							if($(v).find('tcPr').find('vMerge')[0].getAttribute('val')!="restart")
							{
								mergeStat = 1;
							}
							cnt++;
							
							ii++;
							
							arr[ii] = 'table' + ClipData.tblIndex + "row" + i;
						}
						else
						{
							cnt = 0;
							
							arr = arr.slice(2,-1);
							
							arr.length = 0;
							
							ii = 0;
						}
						
						$(v).find('tc').each(function(i1,v1)
						{	
							// iterating columns
							if($(v1).find('r').find('t')[0]!=undefined || $(v).find('tc')[0]!=undefined)
							{
								if(mergeStat==1 && i1==0)
								{
								}
								else
								{
									var paraText = $(v1).find('r').find('t').text();
									
									var p = document.createElement("td");
									
									p.innerHTML = paraText;

									if($(v1).find('tcPr').find('gridSpan')[0]!=undefined)
									{
										colSpanValue = $(v1).find('tcPr').find('gridSpan')[0].getAttribute('val');
										
										p.colSpan = colSpanValue;
									}
									$('#table' + ClipData.tblIndex +'row'+i).append(p);
								}
							}
						});
					}
					
					$('#'+arr[1]).find('td:eq(0)').attr('rowSpan', cnt);	
				});
				
				$('#table'+ClipData.tblIndex).find('td').css('border','1px black solid');
				
				$('#table'+ClipData.tblIndex).css('border','1px black solid');
				
				$('#table'+ClipData.tblIndex).css('margin-left','10px');
				
				$('#table'+ClipData.tblIndex).css('margin-top','10px');
				
				ClipData.tblIndex++;
			}	
			/****/	
			else
			{
        	if($(val).find('hyperlink')[0]!=undefined)  // for hyperlink
			{	
				/****/
				if($(val).find('pPr').find('numPr')[0]!=undefined)  // If text contains any bullets
				{
					if(ClipData.flagIndent=='b')   //for bullets
					{

						var p = document.createElement("ul");
						
						p.id = "ul" + index;
						
						element.appendChild(p);
						
						var paraText = $(val).find('r').next().text(); //$(val).find('t').text();
													
						var rId = $(val).find('hyperlink')[0].getAttribute('r:id');	
						
						// JS: Using imageData ID  find the Target XPath
						var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
						
						var paraText1 = $(val).find('hyperlink').text();
						
						var p = document.createElement("a");
						
						p.innerHTML = paraText1;
						
						p.href = target;
						
						element.appendChild(p);
						
						var p1 = document.createElement("li");
						
						p1.innerHTML = paraText;
						
						p1.appendChild(p);
						
						$('#ul' + index).append(p1);
						
						$('#ul' + index).css('padding-left','30px');
						
					}
					else if(ClipData.flagIndent=='d')
					{
						if(index==0)
						{	
							var p = document.createElement("ol");
							
							p.id = "ol" + index;
							
							element.appendChild(p);
							
							var paraText = $(val).find('r').next().text(); //$(val).find('t').text();
														
							var rId = $(val).find('hyperlink')[0].getAttribute('r:id');	
							
							// JS: Using imageData ID  find the Target XPath
							var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
							
							var paraText1 = $(val).find('hyperlink').text();
							
							var p = document.createElement("a");
							
							p.innerHTML = paraText1;
							
							p.href = target;
							
							element.appendChild(p);
							
							var p1 = document.createElement("li");
							
							p1.innerHTML = paraText;
							
							p1.appendChild(p);
							
							$('#ol' + index).append(p1);
							
							$('#ol' + index).css('padding-left','30px');
						}
						else
						{
							var paraText = $(val).find('r').next().text(); //$(val).find('t').text();
														
							var rId = $(val).find('hyperlink')[0].getAttribute('r:id');	
							
							// JS: Using imageData ID  find the Target XPath
							var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
							
							var paraText1 = $(val).find('hyperlink').text();
							
							var p = document.createElement("a");
							
							p.innerHTML = paraText1;
							
							p.href = target;
							
							element.appendChild(p);
							
							var p1 = document.createElement("li");
							
							p1.innerHTML = paraText;
							
							p1.appendChild(p);
							
							$('#ol' + 0).append(p1);
							
							$('#ol' + 0).css('padding-left','30px');
						}
					}
				}
				else // for normal text
				{
					var rId = $(val).find('hyperlink')[0].getAttribute('r:id');	
					
					// JS: Using imageData ID  find the Target XPath
					var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
					
					var paraText = $(val).find('hyperlink').text();
					
					var p = document.createElement("a");
					
					p.innerHTML = paraText;
					
					p.href = target;
					
					element.appendChild(p);
				}
				$(element).find('a').css('margin-left','5px') // shilpa:27th may bug:8001
			}

        	if($(val).find('r').find('t')[0]!=undefined && $(val).find('hyperlink')[0]==undefined)
			{
				if($(val).find('pPr').find('numPr')[0]!=undefined)  // If text contains any bullets
				{
					if(ClipData.flagIndent=='b')   //for bullets
					{
						var p = document.createElement("ul");
						
						p.id = "ul" + index;
						
						element.appendChild(p);
						
						var paraText = $(val).find('r').find('t').text();
						
						var p1 = document.createElement("li");
						
						p1.innerHTML = paraText;
						
						$('#ul' + index).append(p1);
						
						$('#ul' + index).css('padding-left','30px');
					}
					else if(ClipData.flagIndent=='d')   // for numbering
					{
						if(index==0)
						{							
							var p = document.createElement("ol");
							
							p.id = "ol" + index;
							
							element.appendChild(p);
							
							var paraText = $(val).find('r').find('t').text();
							
							var p1 = document.createElement("li");
							
							p1.innerHTML = paraText;
							
							$('#ol' + index).append(p1);
							
							$('#ol' + index).css('padding-left','30px');
						}
						else
						{
							var paraText = $(val).find('r').find('t').text();
							
							var p1 = document.createElement("li");
							
							p1.innerHTML = paraText;
							
							$('#ol' + 0).append(p1);
							
							$('#ol' + 0).css('padding-left','30px');
							
						}												
					}
				}
				else // for normal text
				{
					var paraText = $(val).find('r').find('t').text();
					
					var p = document.createElement("p");
					
					p.innerHTML = paraText;
					
					element.appendChild(p);
				}
			}
							
			if($(val).find('pict').find('shape').find('imagedata')[0]!=undefined){
			
				// JS: Find imageData ID for the image
				var imageDataId = $(val).find('pict > shape > imagedata')[0].getAttribute('r:id');	
				
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + imageDataId + '"]')[0].getAttribute('Target');
				
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
    			
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		
        		img.src = imageData;
        		
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br"); // shilpa:27th may
        		
        		element.appendChild(breakLine);
			} 
			if($(val).find('drawing').find('inline').find('graphic').find('graphicData').find('pic').find('blipFill').find('blip')[0]!=undefined){
			
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing > inline > graphic > graphicData > pic > blipFill > blip')[0].getAttribute('r:embed');	
				
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
    			
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		
        		img.src = imageData;
        		
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		
        		element.appendChild(breakLine);
			}
			if($(val).find('drawing').find('graphic').find('graphicData').find('wgp').find('pic').find('blipFill').find('blip')[0]!=undefined){
			
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing').find('graphic').find('graphicData').find('wgp').find('pic').find('blipFill').find('blip')[0].getAttribute('r:embed');	
				
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[:name="/word/' + target + '"] > binaryData').text();
				
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
    			
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		
        		img.src = imageData;
        		
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		
        		element.appendChild(breakLine);
			}
			if($(val).find('drawing').find('graphic').find('graphicData').find('pic').find('blipFill').find('blip')[0]!=undefined)
			{
			
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing').find('graphic').find('graphicData').find('pic').find('blipFill').find('blip')[0].getAttribute('r:embed');
					
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[name="/word/' + target + '"]').find('binaryData').text();
				
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
    			
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		
        		img.src = imageData;
        		
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		
        		element.appendChild(breakLine);
			}

        }// End of else block
		});
		Main.hideLoading();
	},

	pasteDataOld:function(openXML,element)
	{
	    var openXML = openXML.replace(new RegExp('pkg:', 'g'),'').replace(new RegExp('w:document', 'g'),'document')
	    .replace(new RegExp('<w:body>', 'g'),'').replace(new RegExp('w:', 'g'),'')
	    .replace(new RegExp('</w:body>', 'g'),'').replace(new RegExp('</body>', 'g'),'');
		Main.showLoading();
		
		$(openXML).find('part > xmlData > document').children().each(function(index,val){
		var s = $(this);
		});
		//$(openXML).find('part > xmlData > document > body').children().each(function(index,val){
		$(openXML).find('part > xmlData > document').children().each(function(index,val){
			var arr = new Array();
			/* for inserting table **/
			if($(val).find('>tr')[0]!=undefined)
			{
				var p = document.createElement("table");
				p.id = "table" + ClipData.tblIndex;
				p.cellPadding = '0';
				p.cellSpacing = '0';
				element.appendChild(p); //table tag created
				var cnt = 0;
				var ii = 0;
				var colSpanValue = 0;
				var mergeStat = 0;
				
				$(val).find('>tr').each(function(i,v){	// iterating rows   
					if($(val).find('>tr')[0]!=undefined)
					{
						var p = document.createElement("tr");
						p.id = 'table' + ClipData.tblIndex + "row" + i;
						$('#table'+ClipData.tblIndex).append(p); // table-row created
						mergeStat = 0;
						
						if($(v).find('tcPr > vMerge')[0]!=undefined)
						{
							if($(v).find('tcPr > vMerge')[0].getAttribute('w:val')!="restart")
							{
								mergeStat = 1;
							}
							cnt++;
							ii++;
							arr[ii] = 'table' + ClipData.tblIndex + "row" + i;
						}
						else
						{
							cnt = 0;
							arr = arr.slice(2,-1);
							arr.length = 0;
							ii = 0;
						}
						
						$(v).find('>tc').each(function(i1,v1){	// iterating columns
							if($(v1).find('r > t')[0]!=undefined || $(v).find('>tc')[0]!=undefined)
							{
								if(mergeStat==1 && i1==0)
								{
								}
								else
								{
									var paraText = $(v1).find('r > t').text();
									var p = document.createElement("td");
									p.innerHTML = paraText;

									if($(v1).find('tcPr > gridSpan')[0]!=undefined)
									{
										colSpanValue = $(v1).find('tcPr > gridSpan')[0].getAttribute('w:val');
										p.colSpan = colSpanValue;
									}
									$('#table' + ClipData.tblIndex +'row'+i).append(p);
								}
							}
						});
					}
					
					$('#'+arr[1]).find('td:eq(0)').attr('rowSpan', cnt);	
				});
				
				$('#table'+ClipData.tblIndex).find('td').css('border','1px black solid');
				$('#table'+ClipData.tblIndex).css('border','1px black solid');
				$('#table'+ClipData.tblIndex).css('margin-left','10px');
				$('#table'+ClipData.tblIndex).css('margin-top','10px');
				
				ClipData.tblIndex++;
			}	
			/****/	
			else{
        	if($(val).find('>hyperlink')[0]!=undefined)  // for hyperlink
			{	
				/****/
				if($(val).find('pPr > numPr')[0]!=undefined)  // If text contains any bullets
				{
					var p = document.createElement("ul");
					p.id = "ul" + index;
					element.appendChild(p);
					
					var paraText = $(val).find('r').next().text(); //$(val).find('t').text();
												
					var rId = $(val).find('>hyperlink')[0].getAttribute('r:id');	
					// JS: Using imageData ID  find the Target XPath
					var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
					var paraText1 = $(val).find('>hyperlink').text();
					var p = document.createElement("a");
					p.innerHTML = paraText1;
					p.href = target;
					element.appendChild(p);
					
					var p1 = document.createElement("li");
					p1.innerHTML = paraText;
					p1.appendChild(p);
					$('#ul' + index).append(p1);
					$('#ul' + index).css('padding-left','30px');
				}
				else // for normal text
				{
					var rId = $(val).find('>hyperlink')[0].getAttribute('r:id');	
					// JS: Using imageData ID  find the Target XPath
					var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
					var paraText = $(val).find('>hyperlink').text();
					var p = document.createElement("a");
					p.innerHTML = paraText;
					p.href = target;
					element.appendChild(p);
				}
				//$('a').css('margin-left','5px');
				$(element).find('a').css('margin-left','5px') // shilpa:27th may bug:8001
				/****/
				/*var rId = $(val).find('hyperlink')[0].getAttribute('r:id');	
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + rId + '"]')[0].getAttribute('Target');
				var paraText = $(val).find('hyperlink').text();
				var p = document.createElement("a");
				p.innerHTML = paraText;
				p.href = target;
				element.appendChild(p);*/
			}
			/****/
	        /*$(element).bind("paste keyup", function(e) {
			    $(element).find('a').mouseover(function(e){
	                $(element).attr('contentEditable','false');
	                $(this).attr('title',$(this)[0].href); 
				});
                $(element).find('a').mouseout(function(e){
		        	$(element).attr('contentEditable','true'); 
				});
			    $(element).find('a').each(function(){
					$(this).unbind('click');    
		            $(this).click(function(){
		                window.open($(this)[0].href,'_blank');
			            return false;
		        	});
		       });
			}); */
	        /****/

        	//if($(val).find('r > t')[0]!=undefined && $(val).find('>hyperlink')[0]==undefined)
        	if($(val).find('r').find('t')[0]!=undefined && $(val).find('>hyperlink')[0]==undefined)
			{
				if($(val).find('pPr > numPr')[0]!=undefined)  // If text contains any bullets
				{
					var p = document.createElement("ul");
					p.id = "ul" + index;
					element.appendChild(p);
					var paraText = $(val).find('r > t').text();
					var p1 = document.createElement("li");
					p1.innerHTML = paraText;
					$('#ul' + index).append(p1);
					$('#ul' + index).css('padding-left','30px');
				}
				else // for normal text
				{
					//var paraText = $(val).find('r > t').text();
					var paraText = $(val).find('r').find('t').text();
					var p = document.createElement("p");
					p.innerHTML = paraText;
					element.appendChild(p);
				}
			}
							
			if($(val).find('pict > shape > imagedata')[0]!=undefined){
				// JS: Find imageData ID for the image
				var imageDataId = $(val).find('pict > shape > imagedata')[0].getAttribute('r:id');	
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + imageDataId + '"]')[0].getAttribute('Target');
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		img.src = imageData;
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br"); // shilpa:27th may
        		element.appendChild(breakLine);
			} 
			if($(val).find('drawing > inline > graphic > graphicData > pic > blipFill > blip')[0]!=undefined){
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing > inline > graphic > graphicData > pic > blipFill > blip')[0].getAttribute('r:embed');	
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		img.src = imageData;
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		element.appendChild(breakLine);
			}
			if($(val).find('drawing > anchor > graphic > graphicData > wgp > pic > blipFill > blip')[0]!=undefined){
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing > anchor > graphic > graphicData > wgp > pic > blipFill > blip')[0].getAttribute('r:embed');	
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		img.src = imageData;
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		element.appendChild(breakLine);
			}
			if($(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip')[0]!=undefined){
				// JS: Find imageData ID for the image
				var embedId = $(val).find('drawing > anchor > graphic > graphicData > pic > blipFill > blip')[0].getAttribute('r:embed');	
				// JS: Using imageData ID  find the Target XPath
				var target = $(openXML).find('Relationship[Id="' + embedId + '"]')[0].getAttribute('Target');
				// JS: Using Target XPath find the base64 format of image data
				var imageData = $(openXML).find('part[pkg\\:name="/word/' + target + '"] > binaryData').text();
				// JS: Prepend following header to make base64 string to DataURI
    			imageData = "data:image/png;base64," + imageData;
        		// JS: Create <img> tag and equate it 'src' attribute to DataURI
        		var img = document.createElement("img");
        		img.src = imageData;
        		// JS: Finally append this <img> tag to the container
        		element.appendChild(img);
        		
        		var breakLine = document.createElement("br");  // shilpa:27th may
        		element.appendChild(breakLine);
			}

        }// End of else block
		});
		Main.hideLoading();
	},
	
	saveData:function()
	{
		alert('start');
		var ClipbrdList = jP.Lists.setSPObject(ClipData.SiteURL,'ClipboardData');
		var obj = new Array();
		obj.push({
		'ClipboardData' : $("#editableDiv").html()
	    });
		var result = ClipbrdList.updateItem(obj);
		alert('End');
	},
	showData:function()
	{
		alert('start');
		var arr = new Array();
		var ClipbrdList = jP.Lists.setSPObject(ClipData.SiteURL,'ClipboardData');
		var query = "<Query></Query>";
		arr = ClipbrdList.getSPItemsWithQuery(query).Items;
		$("#editableDiv").empty();
		/*for(var i=0; i<arr.length; i++)
		{
			$("#editableDiv").append(arr[i]['ClipboardData']);
		}*/
		$("#editableDiv").append(arr[arr.length - 1]['ClipboardData']);
		
		/* for hyperlink */
		$("#editableDiv p").each(function(){
			if($(this).text().indexOf('http://') != -1 || $(this).text().indexOf('https://') != -1)
			{
				$(this).html('<a href="'+$(this).text()+'">'+$(this).text()+'</a>');	
			}
		});
		$("#editableDiv p").css('margin-left','5px');
        $("#editableDiv").find('a').each(function(){    
	      $(this).click(function(){
		                 window.open($(this)[0].href,'_blank');
		                 return false;
		             });
		});
		$("#editableDiv").find('a').mouseover(function(e){
			$("#editableDiv").attr('contentEditable','false'); 
		});
        $("#editableDiv").find('a').mouseout(function(e){
	        $("#editableDiv").attr('contentEditable','true'); 
		});

		/*****/
		alert('End');
	},
	clear:function()
	{
		$("#editableDiv").empty();
	}

}

