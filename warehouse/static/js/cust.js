$(function(){

	 $(window).load(function(){
        $.ajax({ // JQuery ajax function
            type: "GET", // Submitting Method
            url: 'http://'+ip_addr+'/get_cust/',  //这里是你的api名字
            dataType: "json", // type of returned data
            success: function(data) { 
            	if (data["code"]==0){
            		alert("error")
            	}
	          
            for (var i = 0 ;  i < data.length ; i++){
        	var fname = data[i]["fname"];
        	var lname = data[i]["lname"];
        	var comp = data[i]["company"];
        	var phone = data[i]["phone"];
            var email = data[i]["email"];
        					tr = $('<tr/>');
                 		    tr.append("<td>" + fname + "</td>");
                            tr.append("<td>" + lname + "</td>");
                            tr.append("<td>" + comp + "</td>");
                            tr.append("<td>" + phone + "</td>");
                            tr.append("<td>" + email + "</td>");                            
                            $('#ctable').append(tr);
            }
        }
        });
    });

	

	$("#new").click(function(){
		window.location ="./createcust.html"
	});


});