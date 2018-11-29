<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882">
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=14.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<head>
	<title>Insert Table</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script language="JavaScript" type="text/javascript">
<!--
function AddTable() {
	var widthType = (document.tableForm.widthType.value == "pixels") ? "" : "%";
	var html = '<table border="' + document.tableForm.border.value + '" cellpadding="' + document.tableForm.padding.value + '" ';
	
	html += 'cellspacing="' + document.tableForm.spacing.value + '" width="' + document.tableForm.width.value + widthType + '">\n';
	for (var rows = 0; rows < document.tableForm.rows.value; rows++) {
		html += "<tr>\n";
		for (cols = 0; cols < document.tableForm.columns.value; cols++) {
			html += "<td>&nbsp;</td>\n";
		}
		html+= "</tr>\n";
	}
	html += "</table>\n";
	
	window.opener.insertHTML(html);
	window.close();
}
//-->
</script>

<!--[if gte mso 9]><SharePoint:CTFieldRefs runat=server Prefix="mso:" FieldList="FileLeafRef"><xml>
<mso:CustomDocumentProperties>
<mso:xd_Signature msdt:dt="string"></mso:xd_Signature>
<mso:TemplateUrl msdt:dt="string"></mso:TemplateUrl>
<mso:Order msdt:dt="string">30800.0000000000</mso:Order>
<mso:xd_ProgID msdt:dt="string"></mso:xd_ProgID>
<mso:ContentTypeId msdt:dt="string">0x010100B368333E0B30A94B852819C49833C540</mso:ContentTypeId>
<mso:_SourceUrl msdt:dt="string"></mso:_SourceUrl>
<mso:_SharedFileIndex msdt:dt="string"></mso:_SharedFileIndex>
<mso:MetaInfo msdt:dt="string">549;#vti_contentversionisdirty:BW|false
vti_parserversion:SR|14.0.0.5114
TemplateUrl:SW|
Order:DW|30800.0000000000
vti_contenttag:SW|{343EB84B-40F0-4D52-83A5-DD899092D86B},1,1
vti_folderitemcount:IR|0
vti_charset:SR|utf-8
vti_author:SR|RSINNGP\\rajiv.khobragade
vti_cachedneedsrewrite:BR|false
xd_Signature:SW|
vti_cachedhastheme:BR|false
xd_ProgID:SW|
vti_cachedcustomprops:VX|xd_Signature TemplateUrl Order xd_ProgID ContentTypeId vti_title _SourceUrl _SharedFileIndex
vti_modifiedby:SR|RSINNGP\\rajiv.khobragade
vti_docstoreversion:IR|1
vti_metainfoversion:IW|1
vti_foldersubfolderitemcount:IR|0
vti_syncwith_srvsps2\:80/uat/uatappv2:TW|29 Nov 2011 06:17:54 -0000
vti_cachedtitle:SR|Insert Table
vti_metatags:VR|HTTP-EQUIV=Content-Type text/html;\\ charset=utf-8
vti_title:SR|Insert Table
ContentTypeId:SW|0x0101000E425423D6662C49A3F1F5AC345B9453
vti_cachedbodystyle:SR|&lt;body style=&quot;margin: 10px; background: #D3D3D3;&quot;&gt;
_SourceUrl:SW|
_SharedFileIndex:SW|
</mso:MetaInfo>
<mso:FSObjType msdt:dt="string">0</mso:FSObjType>
<mso:FileDirRef msdt:dt="string">uat/TestEnv/SiteAssets/js/RTE</mso:FileDirRef>
<mso:FileLeafRef msdt:dt="string">insert_table.aspx</mso:FileLeafRef>
<mso:ContentType msdt:dt="string">Document</mso:ContentType>
</mso:CustomDocumentProperties>
</xml></SharePoint:CTFieldRefs><![endif]-->
</head>

<body style="margin: 10px; background: #D3D3D3;">

<form name="tableForm">
<table cellpadding="4" cellspacing="0" border="0">
	<tr>
		<td align="right">Rows:</td>
		<td><input name="rows" type="text" id="rows" value="2" size="4"></td>
		<td align="left">Columns: <input name="columns" type="text" id="columns" value="2" size="4"></td>
	</tr>
	<tr>
		<td align="right">Table width:</td>
		<td><input name="width" type="text" id="width" value="100" size="4"></td>
		<td align="left">
			<select name="widthType" id="widthType">
				<option value="pixels">pixels</option>
				<option value="percent" selected>percent</option>
			</select>
		</td>
	</tr>
	<tr>
		<td align="right">Border thickness:</td>
		<td><input name="border" type="text" id="border" value="1" size="4"></td>
		<td align="left">pixels</td>
	</tr>
	<tr>
		<td align="right">Cell padding:</td>
		<td><input name="padding" type="text" id="padding" value="4" size="4"></td>
		<td>Cell spacing: <input name="spacing" type="text" id="0" value="0" size="4"></td>
	</tr>
	<tr>
		<td colspan="3" align="center">
			<input type="button" value="Insert Table" onClick="AddTable();" />
			<input type="button" value="Cancel" onClick="window.close();" />
		</td>
	</tr>
</table>

</form>

</body>
</html>
