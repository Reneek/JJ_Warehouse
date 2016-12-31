$(function() {
     
    
    $("#show").click(function() { // if submit button is clicked
        var num = $("#tnum").val();    //数据类型text  25/
            $.ajax({ // JQuery ajax function
                type: "GET", // Submitting Method
                url: 'http://127.0.0.1:8000/get_r/',  //这里是你的api名字
                data: {"number":num}, // the data that will be sent to php processor
                dataType: "json", // type of returned data
                success: function(data) { // if ajax function results success 这里返回你后台检查通过或者不通过的信息  还要吗？？？？
                    
                    if (data["code"]==0){
                        alert("receipt does not exist, please try again")

                    }
                    else {
                        $(".details").remove();
                        $("#rtable").append("<td class = 'details'>" + data["name"] + "</td>");
                        $("#rtable").append("<td class = 'details'>" + data["sdate"] + "</td>"); //开始时间
                        $("#rtable").append("<td class = 'details'>" + data["edate"] + "</td>");//结束时间
                        $("#rtable").append("<td class = 'details'>" + data["warehouse"] + "</td>")
                        $("#rtable").append("<td class = 'details'>" + num + "</td>")
                        $("#cost").text(data["cost"])
                    }
                }
        });
        return false;   
    });

    $("#print").click(function(){
        window.print();
        return false 
    });



});