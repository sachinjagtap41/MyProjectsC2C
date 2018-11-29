/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

//FORMAT DATE 
//eg. Apr 15, 2011
function formatDate(dt)
{
	var dtNow=new Date(dt);
		
	dArr=dtNow.toDateString().split(" ");
	
	return dArr[1]+" "+dArr[2]+", "+dArr[3]; 
	
}

//TRIM TEXT
function trimText(txt,len)
{	
	if( txt != undefined && txt != null && txt != "" )
	{	
		if(txt.length>len)
			return txt.substring(0,len)+'...';
		else
			return txt;
		
	}	
}

function mmddyyyy(dt)
{

 
if(dt!='')
  var date= dt.charAt(5)+dt.charAt(6)+"/"+dt.charAt(8)+dt.charAt(9)+"/"+dt.charAt(0)+dt.charAt(1)+dt.charAt(2)+dt.charAt(3);
else
  var date='';  
 
 
 
 return date; 
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}