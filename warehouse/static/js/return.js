$(function() {
     
     var stat;

     
    $("#show").click(function() { // if submit button is clicked
        var num = $("#tnum").val(); 

            $.ajax({ // JQuery ajax function
                type: "GET", // Submitting Method
                url: 'http://'+ip_addr+'/get_r/',  //这里是你的api名字
                data: {"number":num}, // the data that will be sent to php processor
                dataType: "json", // type of returned data
                success: function(data) { // if ajax function results success 这里返回你后台检查通过或者不通过的信息  还要吗？？？？
                    
                    if (data["code"]==0){
                        alert("receipt does not exist, please try again")

                    }
                    else {
                        var status = data["status"]
                        stat = status
                        var sta

                        switch (status){
                                case 0:
                                    sta = "paid & retrieved";
                                    break;
                                case 1:
                                    sta = "ongoing";
                                    break;

                                default:
                                    sta = "error"                                             
                                                    
                            }
                        $(".details").remove();
                        $("#rtable").append("<td class = 'details'>" + data["name"] + "</td>");
                        $("#rtable").append("<td class = 'details'>" + data["sdate"] + "</td>"); //开始时间
                        $("#rtable").append("<td class = 'details'>" + data["edate"] + "</td>");//结束时间
                        $("#rtable").append("<td class = 'details'>" + data["warehouse"] + "</td>")
                        $("#rtable").append("<td class = 'details'>" + num + "</td>")
                        $("#rtable").append("<td class = 'details'>" + sta + "</td>")

                    }
                    var cost = data["cost"];
                    $("#cost").text(cost)
                }
        });
        return false;
    

        
    });

    $("#retrieve").click(function(){
        var num = $("#tnum").val();

        if (stat == 0){
            alert("Item has already been retrieved");
            
        }
        else {        
        $.ajax({ // JQuery ajax function
                type: "GET", // Submitting Method
                url: 'http://'+ip_addr+'/release/',  //这里是你的api名字
                data: {"key":num}, // the data that will be sent to php processor
                dataType: "json",
                success: function(data){
                        
                    if(data["code"]==0){
                        alert("success!")
                        window.location=("./dash.html")
                    }
                    else{
                        alert("error")
                    }

                    
                }
            });

        }
            return false;
    });

});