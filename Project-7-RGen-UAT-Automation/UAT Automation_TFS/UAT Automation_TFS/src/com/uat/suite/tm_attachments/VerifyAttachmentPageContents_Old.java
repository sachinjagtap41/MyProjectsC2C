package com.uat.suite.tm_attachments;

import java.util.ArrayList;

import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.uat.base.Credentials;
import com.uat.util.TestUtil;

public class VerifyAttachmentPageContents_Old extends TestSuiteBase {
	
	String runmodes[]=null;
	static boolean fail=false;
	static boolean skip=false;
	static boolean isTestPass=true;
	static int count=-1;
	String comments;
	static boolean isLoginSuccess=true;
	
	// Runmode of test case in a suite
	
		@BeforeTest
		public void checkTestSkip(){
			
			APP_LOGS.debug("Beginning test case '"+this.getClass().getSimpleName()+"'.");
			
			if(!TestUtil.isTestCaseRunnable(TM_attachmentsSuiteXls,this.getClass().getSimpleName())){
				APP_LOGS.debug("Skipping Test Case"+this.getClass().getSimpleName()+" as runmode set to NO");//logs
				throw new SkipException("Skipping Test Case"+this.getClass().getSimpleName()+" as runmode set to NO");//reports
			}
			runmodes=TestUtil.getDataSetRunmodes(TM_attachmentsSuiteXls, this.getClass().getSimpleName());
		}
	
	// Test Case Implementation ...
		
	@Test(dataProvider="getTestData")
	public void verifyAttachmentPageContents(String role,String group,String portfolio,String project, String version,
			String projectEndMonth, String projectEndYear, String projectEndDate, String testPassName,
			String testPassEndMonth, String testPassEndYear,String testPassEndDate, String testerRole,
			String testCaseName,String testStepName,String assignedRole, String expectedResult, String attachmentName, String attachmentPath) throws Exception
	{
		count++;
		ArrayList<Credentials> versionLead = getUsers("Version Lead", 1);
		ArrayList<Credentials> testManager = getUsers("Test Manager", 1);
		ArrayList<Credentials> tester = getUsers("Tester", 1);
		String otherProject = project+"1";
		//String otherTestCaseName=testCaseName+"1";
		//String otherTestStepName = testStepName+"1";
		String pageHeaderText;
		String selectedGroup;
		String selectedPortfolio;
		String selectedProject;
		String selectedVersion;
		String selectedTestPass;
		String selectedTestCase;
		Select testCaseDropDown;
		boolean viewAllIsDisplayed;
		boolean createNewIsDisplayed;
		boolean testCaseDropDownIsDisplayed;
		boolean noAttachmentIsDisplayed;
		boolean totalRecordsIsDisplayed;
		int totalRecordsCount;
		int totalAttachments;
		
		
		if(!(runmodes[count].equalsIgnoreCase("Y") && versionLead!=null && testManager!=null && tester!=null))
		{
			skip=true;
			APP_LOGS.debug("Runmode for test set data no. "+(count+1)+" set to no.........So its skipping Test Set Data No."+(count+1));;

			throw new SkipException("Runmode for test set data no. "+(count+1)+" set to no");

		}
		
		
		openBrowser();
		
		
					
					login(versionLead.get(0).username, versionLead.get(0).password, "Version Lead");
					
					getElement("UAT_testManagement_Id").click();
					
					Thread.sleep(1000);
					
					getElement("TM_attachmentTab_Id").click();
					
					Thread.sleep(1000);
					
					pageHeaderText = getElementByClassAttr("Attachments_pageHeaderText_Class").getText();
					
					if (!pageHeaderText.contains("Attachment")) 
					{
						fail=true;
						APP_LOGS.debug("Attachment page landing unsuccessfull.");
						comments+="Attachment page landing unsuccessfull(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "AttachmentPageLandingUnsuccessfull");
						//closeBrowser();

						throw new SkipException("Attachment page landing unsuccessfull");
						
					}
					
					APP_LOGS.debug("Attachment page landing successfull.");
					comments+="Attachment page landing successfull(Pass). ";
					
					selectedGroup= getObject("Attachments_groupMemberSelected").getText();
					selectedPortfolio= getObject("Attachments_portfolioMemberSelected").getText();
					selectedProject= getObject("Attachments_projectMemberSelected").getText();
					selectedVersion = getObject("Attachments_versionMemberSelected").getText();
					selectedTestPass= getObject("Attachments_testPassMemberSelected").getText();
					
					testCaseDropDown = new Select(getElement("Attachments_testCaseDropDown_Id"));
					
					selectedTestCase = testCaseDropDown.getFirstSelectedOption().getText();
					
					
					if (assertTrue(selectedGroup.equals(group) && selectedPortfolio.equals(portfolio) && 
							selectedProject.equals(project) && selectedVersion.equals(version)&& selectedTestPass.equals(testPassName))) 
					{
						APP_LOGS.debug("Recent created group/project displayed in navigation pane.");
						comments+="Recent created group/project displayed in navigation pane(Pass). ";
					}
					else 
					{
						fail = true;
						APP_LOGS.debug("Recent created group/project not displayed in navigation pane.");
						comments+="Recent created group/project not displayed in navigation pane(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "RecentProjectDisplay");
						
					}
					
					
					
					viewAllIsDisplayed = getObject("Attachments_viewAll_link").isDisplayed();
					createNewIsDisplayed = getObject("Attachments_createNew_link").isDisplayed();
					testCaseDropDownIsDisplayed = getElement("Attachments_testCaseDropDown_Id").isDisplayed();
					noAttachmentIsDisplayed = getElement("Attachments_noAttachmentAvailableDiv_Id").isDisplayed();
					totalRecordsIsDisplayed= getElement("Attachments_totalRecordsDiv_Id").isDisplayed();
					
					if (assertTrue(viewAllIsDisplayed && createNewIsDisplayed)) 
					{
						APP_LOGS.debug("View All and Create New link displayed.");
						comments+="View All and Create New link displayed(Pass). ";
						
					}
					else 
					{
						fail = true;
						APP_LOGS.debug("View All and Create New link not displayed.");
						comments+="View All and Create New link not displayed(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "ViewAllCreateNewDisplay");
						
					}
					
					
					
					if (assertTrue(testCaseDropDownIsDisplayed)) 
					{
						APP_LOGS.debug("Test Case drop down displayed.");
						comments+="Test Case drop down displayed(Pass). ";
						
						testCaseDropDown = new Select(getElement("Attachments_testCaseDropDown_Id"));
						
						selectedTestCase = testCaseDropDown.getFirstSelectedOption().getText();
						
						if (assertTrue(selectedTestCase.equals(testCaseName))) 
						{
							APP_LOGS.debug("First Test Case Selected.");
							comments+="First Test Case Selected(Pass). ";
						}
						else 
						{
							fail = true;
							APP_LOGS.debug("First Test Case not Selected.");
							comments+="First Test Case not Selected(Fail). ";
							TestUtil.takeScreenShot(this.getClass().getSimpleName(), "FirstTestCaseSelection");
							
						}
						
					}
					else 
					{
						fail = true;
						APP_LOGS.debug("Test Case drop down not displayed.");
						comments+="Test Case drop down not displayed(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "TestCaseddDisplay");
						
					}
					
					
					if (assertTrue(noAttachmentIsDisplayed)) 
					{
						APP_LOGS.debug("'No Attachment Available' displayed.");
						comments+="'No Attachment Available' displayed(Pass). ";
					}
					else 
					{
						fail = true;
						APP_LOGS.debug("'No Attachment Available' not displayed.");
						comments+="'No Attachment Available' not displayed(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "NoAttachmentDisplay");
						
					}
					
					if (!assertTrue(totalRecordsIsDisplayed)) 
					{
						APP_LOGS.debug("'Total Records Count' not displayed.");
						comments+="'Total Records Count' not displayed(Pass). ";
					}
					else 
					{
						fail = true;
						APP_LOGS.debug("'Total Records Count' displayed.");
						comments+="'Total Records Count' displayed(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "TotalRecordsDisplay");
						
					}
					
					Thread.sleep(1000);
					
					getObject("Attachments_createNew_link").click();
					
					getElement("AttachmentsCreateNew_attachmentNameTextField_Id").sendKeys(attachmentName);
					
					getObject("AttachmentsCreateNew_attachmentTestStepNameCheckBox1", "AttachmentsCreateNew_attachmentTestStepNameCheckBox2", 1).click();
					
					getElement("AttachmentsCreateNew_attachmentFileNameBrowseButton_Id").sendKeys(attachmentPath);
					
					getElement("AttachmentsCreateNew_saveButton_Id").click();
					
					Thread.sleep(3000);
					
					//wait.until(ExpectedConditions.elementToBeClickable(By.xpath("AttachmentsCreateNew_attachmentSuccessfullOkButton"))).click();
					getObject("AttachmentsCreateNew_attachmentSuccessfullOkButton").click();
					Thread.sleep(500);
					totalAttachments = getElement("AttachmentsViewAll_table_Id").findElements(By.xpath("tbody/tr")).size();
					
					
					if (totalAttachments!=0) 
					{
						totalRecordsIsDisplayed= getElement("Attachments_totalRecordsDiv_Id").isDisplayed();
						APP_LOGS.debug("Attachment Table displayed.");
						comments+="Attachment Table displayed(Pass). ";
					}
					else
					{
						fail = true;
						APP_LOGS.debug("Attachment Table not displayed.");
						comments+="Attachment Table not displayed(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "AttachmentTableDisplay");
						assertTrue(false);
					}
					
					
					if (assertTrue(totalRecordsIsDisplayed)) 
					{
						
						APP_LOGS.debug("'Total Records Count' displayed after attachment created .");
						comments+="'Total Records Count' displayed after attachment created(Pass). ";
						
						totalRecordsCount=Integer.parseInt(getElement("Attachments_totalRecordsDiv_Id").findElement(By.id("labelCount")).getText()); 
						
						if (totalAttachments==totalRecordsCount) 
						{
							APP_LOGS.debug("'Total Records Count' is correct .");
							comments+="'Total Records Count' is correct(Pass). ";
							
						}
						else
						{
							fail = true;
							APP_LOGS.debug("'Total Records Count' is not correct .");
							comments+="'Total Records Count' is not correct(Fail). ";
							TestUtil.takeScreenShot(this.getClass().getSimpleName(), "TotalRecordsCount");
							assertTrue(false);
						
						}
					}
					else 
					{
						fail = true;
						APP_LOGS.debug("'Total Records Count' not displayed after attachment created .");
						comments+="'Total Records Count' not displayed after attachment created(Fail). ";
						TestUtil.takeScreenShot(this.getClass().getSimpleName(), "TotalRecordsNotDisplayed");
						
						
					}
					
					
				}
				
				
				
				
				
				
				
			
			
			
			
			
		
		
		
		
			
			
		
		
		
	
	@AfterMethod
	public void reportDataSetResult(){
		if(skip)
			TestUtil.reportDataSetResult(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, "SKIP");
		
		else if(!isLoginSuccess){
			isTestPass=false;
			TestUtil.reportDataSetResult(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, "Login UnSuccessfull");
			TestUtil.printComments(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, comments);
		}
		else if(fail){
			isTestPass=false;
			TestUtil.reportDataSetResult(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, "FAIL");
			TestUtil.printComments(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, comments);
		}
		else
		{
			TestUtil.reportDataSetResult(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, "PASS");
			TestUtil.printComments(TM_attachmentsSuiteXls, this.getClass().getSimpleName(), count+2, comments);
		}
		skip=false;
		fail=false;
		

	}
	
	
	@AfterTest
	public void reportTestResult(){
		if(isTestPass)
			TestUtil.reportDataSetResult(TM_attachmentsSuiteXls, "Test Cases", TestUtil.getRowNum(TM_attachmentsSuiteXls,this.getClass().getSimpleName()), "PASS");
		else
			TestUtil.reportDataSetResult(TM_attachmentsSuiteXls, "Test Cases", TestUtil.getRowNum(TM_attachmentsSuiteXls,this.getClass().getSimpleName()), "FAIL");
	
	}
	
	
	
	@DataProvider
	public Object[][] getTestData(){
		return TestUtil.getData(TM_attachmentsSuiteXls, this.getClass().getSimpleName()) ;
	}
	
	
	
}
