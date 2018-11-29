var navigation={


changeLinks:function(){
return false;

$("#navProjects").attr("onClick","navigation.redirect(\'ProjectMgnt_Portfolio.aspx\')"); 
$("#navTestPasses").attr("onClick","navigation.redirect(\'TestPassMgnt_Portfolio.aspx\')");
$("#navTesters").attr("oncliCk","navigation.redirect(\'Tester_Portfolio.aspx\')");
$("#navTestCases").attr("onClick","navigation.redirect(\'testcase_Portfolio.aspx\')");
$("#navTestSteps").attr("onClick","navigation.redirect(\'TestStep_Portfolio.aspx\')");
$("#navAttachments").attr("onClick","navigation.redirect(\'attachment_Portfolio.aspx\')");
    


},
redirect:function(pageName)
		{
			if(pageName == "ProjectMgnt_Portfolio.aspx")
				window.location.href=Main.getSiteUrl()+'/SitePages/'+pageName+'?pid='+show.projectId;
			else
				window.location.href=Main.getSiteUrl()+'/SitePages/'+pageName+'?pid='+show.projectId+'&tpid='+show.testPassId;	
		}


}