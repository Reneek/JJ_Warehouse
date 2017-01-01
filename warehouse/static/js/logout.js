$(function() {
  $("#logout").click(function() { // if submit button is clicked
    

    $.ajax({ // JQuery ajax function
      type: "GET", // Submitting Method
      url: 'http://'+ip_addr+'/logout/',  //这里是你的api名字
      window.location=("./login.html")
      
     });
    return false;
    });
 
});