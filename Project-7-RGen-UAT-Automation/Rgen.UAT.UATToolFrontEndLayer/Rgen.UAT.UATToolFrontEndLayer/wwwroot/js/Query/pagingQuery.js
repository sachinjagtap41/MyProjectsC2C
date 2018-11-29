/* Copyright © 2012 RGen Solutions . All Rights Reserved.
   Contact : support@rgensolutions.com 
*/

var Paging={
    /*Configuring initial page settings*/
	TotalPaging:null,
	PrevPaging:null,
    NextPaging:null,
    currentPaging:null,
    PagingSize:null,
    pagingList:null, 
       
/*For paging settings*/
initPaging:function(){
	Paging.TotalPaging=0;
	Paging.PrevPaging=0;
    Paging.NextPaging=0;
    Paging.currentPaging=0;
    Paging.PagingSize=10;
    PagingpagingList=null;    
   
},

/*For paging display*/    
showPagination:function(){
        
            var startNo=Paging.PrevPaging +1;
            if(Paging.TotalPaging<Paging.NextPaging)
	        	Paging.NextPaging=Paging.TotalPaging;
            var info='<label id="pageLabel">Showing ' + startNo + '-' + Paging.NextPaging+' Result(s) of Total '+Paging.TotalPaging+' Result(s)</label> | <a id="pageFirst"  href="#pagingLoc" onclick=\'Paging.firstPage("results");\' >First</a> | <a id="pagePrev" href="#pagingLoc"  onclick=\'Paging.previousPage("results");\' >Previous</a> | <a id="pageNext"  href="#pagingLoc" onclick=\'Paging.nextPage("results");\'>Next</a> | <a id="pageLast"  href="#pagingLoc" onclick=\'Paging.lastPage("results");\'>Last</a>';        		        		
	    //}
	$("#pagingDiv").html(info);     
   Paging.navigationVisibility();       		 
},

navigationVisibility:function(){
	if(Paging.NextPaging<=Paging.PagingSize){
	  $('#pageFirst').css('color','#726E6D');
	  $('#pagePrev').css('color','#726E6D');
	}	
	if(Paging.NextPaging>Paging.PagingSize){
	  $('#pageFirst').css('color','#000000');
	  $('#pagePrev').css('color','#000000');
	}  	
	if(Paging.NextPaging>=Paging.TotalPaging){
	  $('#pageLast').css('color','#726E6D');
	  $('#pageNext').css('color','#726E6D');
	}    
},

/*For next paging*/
nextPage:function(page){
try{ 
  if(Paging.NextPaging>=Paging.TotalPaging)
     return false;

	Paging.PrevPaging=Paging.NextPaging;
	Paging.NextPaging+=Paging.PagingSize;		
			
	if(page=='results'){	
	 	var tableId='resultToExcel0';
	 	/*Rendering page list*/
	 	var result=Query.displayAllResult(Query.QuerySetDisplay,Paging.PrevPaging,Paging.NextPaging,Paging.PagingSize); 	 	
	 	$('#queryResults').html(result);
	 	
	 	if($("#queryResults").find("a").length != 0) /* shilpa 16 apr 7664 */
			$("#queryResults").find("a").attr('target','_blank');
	}
		
}catch(e){
}
},


/*For previous paging*/
previousPage:function(page){
try{
	
	if(Paging.PrevPaging<=0)
    return false;      
	
	Paging.NextPaging=Paging.PrevPaging;
	Paging.PrevPaging -=Paging.PagingSize;
	if(page=='results'){	
	 var tableId='resultToExcel0';
	 
	/*Rendering page list*/
	var result=Query.displayAllResult(Query.QuerySetDisplay,Paging.PrevPaging,Paging.NextPaging,Paging.PagingSize); 	 	
	$('#queryResults').html(result);
	
	 
	if($("#queryResults").find("a").length != 0) /* shilpa 16 apr 7664 */
		$("#queryResults").find("a").attr('target','_blank');			
	}

}catch(e){
}
},


/*For First paging*/
firstPage:function(page){
try{		
	if(Paging.pagingList==null)
    return false;            
	
	var prevLastLength=0;
	var lastLength=Paging.PagingSize;	
	//alert('lp'+lastLength+'pp'+prevLastLength);	
	Paging.NextPaging=lastLength;
	Paging.PrevPaging =prevLastLength;
	if(page=='results'){	
	 	var tableId='resultToExcel0';
	 	
		/*Rendering page list*/
		var result=Query.displayAllResult(Query.QuerySetDisplay,Paging.PrevPaging,Paging.NextPaging,Paging.PagingSize); 	 	
	 	$('#queryResults').html(result);
		
	if($("#queryResults").find("a").length != 0) /* shilpa 16 apr 7664 */
		$("#queryResults").find("a").attr('target','_blank');	
	}	
	
}catch(e){
}
},

/*For Last paging*/
lastPage:function(page){
try{			
	if(Paging.pagingList==null)
    return false;            
	//Code Modified by swapnil kamle on 2/8/2012
	var lastLength='';
	lastLength=Paging.pagingList.length.toString();
	//lastLength=parseInt(lstlengthstr);
	var LastValue='';
	LastValue=lastLength.substring(lastLength.length-1,lastLength.length);
	if(LastValue==0)
	{
		var prevLastLength=parseInt(lastLength)-Paging.PagingSize;	
	}
	else
	{
		var prevLastLength=(parseInt(lastLength)-parseInt(LastValue));	
	}
	//var prevLastLength=lastLength-Paging.PagingSize;	
	//
	//alert('ll'+lastLength+'pl'+prevLastLength);	
	Paging.NextPaging=lastLength;
	Paging.PrevPaging =prevLastLength;
	if(page=='results'){	
		var tableId='resultToExcel0';
		
		/*Rendering page list*/
	 	var result=Query.displayAllResult(Query.QuerySetDisplay,Paging.PrevPaging,Paging.NextPaging,Paging.PagingSize); 	 	
	 	$('#queryResults').html(result);		
		if($("#queryResults").find("a").length != 0) /* shilpa 16 apr 7664 */
			$("#queryResults").find("a").attr('target','_blank');
	 }	
	
}catch(e){
}
},
resetPagingFirst:function(){
	Paging.PrevPaging =0;
	Paging.NextPaging=Paging.PagingSize;			  						
}


}
