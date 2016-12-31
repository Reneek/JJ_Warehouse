$(function() {
  $("#login-btn").click(function() { // if submit button is clicked
    var username = $("#login-user").val(); 
    var psw = $("#login-pass").val(); // define password variable

    $.ajax({ // JQuery ajax function
      type: "GET", // Submitting Method
      url: 'http://127.0.0.1:8000/login/',  //这里是你的api名字
     
      data: {"username":username,"psw":psw}, // the data that will be sent to php processor
      dataType: "json", // type of returned data
      success: function(data) { // if ajax function results success 这里返回你后台检查通过或者不通过的信息
      if (data["code"]==1) {
      	window.location="./dash.html"
      }else if (data["code"]==0){
        window.location="./login.html"
        alert("Error. Please make sure your username and password are correct, or create an account");
      }
      }
     });
    return false;
    });
  $('#reg-btn').click(function(){window.location="./register.html"});
});