var UserInfo = {

    /*show username in ribbon*/
    showUserName: function () {
        var spUserid = _spUserId;
        var loginUserName;

        var showUser = ServiceLayer.GetData("GetUserInfo" + "/" + spUserid, null, "UserInfo");

        if (showUser != undefined && showUser.length > 0) {
            loginUserName = showUser[0].firstName;
            $('#userW').html('<span>' + loginUserName + '<img style="padding-left:15px;" src="../images/drop-arrow.gif" /></span>');
            var outerDivWidth = $('.userWDiv').width() + "px";
            $(".logOutDiv").css('width', outerDivWidth);
            $(".logOutDiv a").css('width', outerDivWidth);
        }


        $('a[id*=Logout]').click(function () {
            func.removeSession();
        });

        $(".userNameDiv").click(function () {
            $(".logOutDiv").show();

            $(".userWDiv").css({
                "border-top": "1px solid #ccc",
                "border-right": "1px solid #ccc",
                "border-left": "1px solid #ccc"
            });

        });

        $(".userNameDiv").mouseleave(function () {
            $(".logOutDiv").hide();

            $(".userWDiv").css({
                "border-top": "0px solid #fff",
                "border-right": "0px solid #fff",
                "border-left": "0px solid #fff"
            });
        });

        $(".logOutDiv").hover(
              function () {
                  $(".userWDiv").css({
                      "border-top": "1px solid #ccc",
                      "border-right": "1px solid #ccc",
                      "border-left": "1px solid #ccc"
                  });
              }, function () {
                  $(".userWDiv").css({
                      "border-top": "0px solid #fff",
                      "border-right": "0px solid #fff",
                      "border-left": "0px solid #fff"
                  });
              }
        );
    }
}