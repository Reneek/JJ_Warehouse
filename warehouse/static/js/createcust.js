function validEmail(v) {
    var r = new RegExp("[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
}

$(function() {
  $("#register_submit").click(function() { 


    
    var first = $("#fname").val();
    var last = $("#lname").val();
        
    var company = $("#comp").val();
       
    var phone = $("#phone").val();

    var email = $("#email").val();

   if (first==""){
      $("#fnamelabel").css({"color":"red"});
      $("#fnamelabel").text("Please enter first name");
      $("#fname").css({"border-color":"red"});
      $("#fname").focus();
      return false;
    }
    else{
      $("#fnamelabel").css({"color":"black"});
      $("#fname").css({"border-color":"black"});
      
    }

    if (last==""){
      $("#lnamelabel").css({"color":"red"});
      $("#lnamelabel").text("Please enter last name");
      $("#lname").css({"border-color":"red"});
      $("#lname").focus();
      return false;
    }
    else{
      $("#lnamelabel").css({"color":"black"});
      $("#lname").css({"border-color":"black"});
      
    }

    if (company==""){
      $("#complabel").css({"color":"red"});
      $("#complabel").text("Please enter company name");
      $("#comp").css({"border-color":"red"});
      $("#comp").focus();
      return false;
    }
    else{
      $("#complabel").css({"color":"black"});
      $("#comp").css({"border-color":"black"});
      
    }

     if (phone==""){
      $("#phonelabel").css({"color":"red"});
      $("#phonelabel").text("Please enter a phone number");
      $("#phone").css({"border-color":"red"});
      $("#phone").focus();
      return false;
    }
    else{
      $("#phonelabel").css({"color":"black"});
      $("#phone").css({"border-color":"black"});
      
    }

     if (!validEmail(email)){
        $("#emaillabel").css({"color":"red"});
        $("#emaillabel").text("please enter valid email。");
        $("#email").css({"border-color":"red"});
        $("#email").focus();
        return false;     
      }
      else{
        $("#emaillabel").css({"color":"black"});
        $("#email").css({"border-color":"black"});

      }
       
       
        $.ajax({ // JQuery ajax function
            type: "GET", // Submitting Method
            url: 'http://127.0.0.1:8000/createcust/',  //这里是你的api名字
            data: {"first":first,"last":last,"company":company,"phone":phone,"email":email}, // the data that will be sent to php processor
            dataType: "json", // type of returned data
            success: function(data) { 
                if (data["code"]==0) {
                    alert("Customer added")                             //成功，跳转至任务界面
                    window.location="./dash.html"
                }else{
                    alert('Error, try again')             //此处返回哪些值还要讨论...........
                }
            }
        });
                
        return false;
    });
    
    $("#return").click(function(){

      window.location="./dash.html"

    });
    
      
            
         
   
  });


  