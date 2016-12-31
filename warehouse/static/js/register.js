function validEmail(v) {
    var r = new RegExp("[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

$(function() {
  $("#register_submit").click(function() { 
    
    var fname = $("#fname").val();
    var lname = $("#lname").val(); 
    var username = $("#username").val();
    var psw = $("#psw").val(); 
    var psw_1 = $("#psw_1").val(); 
    var email = $("#email").val();
    
    if (fname==""){
      $("#namelabel").css({"color":"red"});
      $("#namelabel").text("Please enter your first name");
      $("#name").css({"border-color":"red"});
      $("#name").focus();
      return false;
    }
    else{
      $("#namelabel").css({"color":"black"});
      $("#name").css({"border-color":"black"});
      
    }

    if (lname==""){
      $("#namelabel").css({"color":"red"});
      $("#namelabel").text("Please enter your last name");
      $("#name").css({"border-color":"red"});
      $("#name").focus();
      return false;
    }
    else{
      $("#namelabel").css({"color":"black"});
      $("#name").css({"border-color":"black"});
      
    }
    
    if (username==""){
      $("#usernamelabel").css({"color":"red"});
      $("#usernamelabel").text("Please enter username");
      $("#username").css({"border-color":"red"});
      $("#username").focus();
      return false;
    }
    else{
      $("#usernamelabel").css({"color":"black"});
      $("#username").css({"border-color":"black"});
      
    }
    
    if (psw==""){
      $("#pswlabel").css({"color":"red"});
      $("#pswlabel").text("Please enter your password");
      $("#psw").css({"border-color":"red"});
      $("#psw").focus();
      return false;
    }
    else{
      $("#pswlabel").css({"color":"black"});
      $("#psw").css({"border-color":"black"});
      
    }
    
    if (psw_1==""){
      $("#psw_1label").css({"color":"red"});
      $("#psw_1label").text("Please confirm your password。");
      $("#psw_1").css({"border-color":"red"});
      $("#psw_1").focus();
      return false;
    }
    else{
      $("#psw_1label").css({"color":"black"});
      $("#psw_1").css({"border-color":"black"});
      
    }
    
    if (psw != psw_1){
      $("#psw").css({"border-color":"red"});
      $("#psw_1").css({"border-color":"red"});
      $("#pswlabel").css({"color":"red"});
      $("#pswlabel").text("Even thought you can't see it..");
      $("#psw_1label").css({"color":"red"});
      $("#psw_1label").text("The two passwords don't match");
      $("#psw_1").focus();
      return false;
    }else{
      $("#psw").css({"border-color":"black"});
      $("#psw_1").css({"border-color":"black"});
      $("#pswlabel").css({"color":"black"});
     
    }
      
      if (!validEmail(email)){
        $("#emaillabel").css({"color":"red"});
        $("#emaillabel").text("Please enter valid email");
        $("#email").css({"border-color":"red"});
        $("#email").focus();
        return false;    	
      }
      else{
        $("#emaillabel").css({"color":"black"});
        $("#email").css({"border-color":"black"});
        
      }	
      
    $.ajax({ 
        type: "GET", 
        url: 'http://127.0.0.1:8000/register/',  
        data: {"fname":name,"lname":lname, "username":username,"psw":psw, "email":email},
        dataType: "json", 
        success: function(data) { 
          if (data["code"]==1){
            window.location="./login.html"
            alert("Success! You may now log in");
          }else{
            alert("Sorry, an error has occured. Please try again");
          }
        }
      });
    return false;
    });
  });


  