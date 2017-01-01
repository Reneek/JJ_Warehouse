$(function() {

    $( "#me" ).text("hi");


    $( "#d_start" ).datepicker();
    $( "#d_end" ).datepicker();
   


    $(window).load(function() { //load category dropdown box
    
    $.ajax({
        type:"GET",
        url:'http://'+ip_addr+'/load_category/',
        datatype:"Json",
        success:function (data){
            $("#d_category").append('<option disable selected value>'+'----select a category----'+'</option>');
            for (var i = 0 ;  i < data[0].length ; i++){
            var category = data[0][i]["category"];
            $("#d_category").append('<option id=category' + i + 'value="'+category+'">'+category+'</option>');
        }

            $("#d_customer").append('<option disable selected value>'+'----select a customer----'+'</option>');
            for (var i = 0 ;  i < data[1].length ; i++){
            var customer = data[1][i]["customer"];
            var id = data[1][i]["pk"]
            $("#d_customer").append('<option id=' + id + ' value="'+i+'">'+customer+'</option>');
        
        
    }
}
});
});


var full

$("#d_search").click(function() { // if search  button is clicked
    var d_start = $("#d_start").val();
    var d_end = $("#d_end").val();
    var d_category = $("#d_category").val();
    

    $.ajax({
    type:"GET",
    url:'http://'+ip_addr+'/load_warehouse/',
    data:{"d_start":d_start,"d_end":d_end,"d_category":d_category},
    datatype:"json",
    success:function(data){
        full = data;
        $("#d_warehouse").html("");
        $("#d_warehouse").append('<option disable selected value>'+'----select a warehouse----'+'</option>');
        for (var i = 0 ;  i < data[0].length ; i++){
        var warehouse = data[0][i];
        $("#d_warehouse").append('<option id=' + i + ' value="'+ warehouse +'">'+warehouse+'</option>');
    }
}
});
});
    



$("#d_submit").click(function(){ // if submit button is clicked
    var d_customer = $("#d_customer").find('option:selected').attr('id')
    var d_start = $("#d_start").val();
    var d_end = $("#d_end").val();
    var d_category = $("#d_category").val();
    var d_pk = $("#d_space").find('option:selected').attr('id')


    $.ajax({ // JQuery ajax function
    type: "GET", // Submitting Method
    url: 'http://'+ip_addr+'/create_order/',  //这里是你的api名字
    data: {"d_customer":d_customer,"d_start":d_start,"d_end":d_end,"d_category":d_category,"d_pk":d_pk}, // the data that will be sent to php processor
    dataType: "json", // type of returned data
    success: function(data) { // if ajax function results success 这里返回你后台检查通过或者不通过的信息  还要吗？？？？
    
        if (data["code"]==0) {  
            var message = "Your recept number is: " + data["pk"]+". Please print out your reciept with this number."    
            alert(message)                       //成功，跳转至任务界面
            window.location="./print.html"
        }else{
            alert('矮油，好像哪里不太对劲。')             //此处返回哪些值还要讨论...........
        }
    }
});

});

$("#d_warehouse").change(function(){ //after selecting warehouse
    
    var d_warehouse = $("#d_warehouse").val();

    
    

     
    
        
        $("#d_space").html("");
        $("#d_space").append('<option disable selected value>'+'----select a space----'+'</option>');
        for (var i = 0 ;  i < full[1].length ; i++){
        var wh = full[1][i]['Wh']
        var aisle = full[1][i]['Aisle'];
        var shelf = full[1][i]['Shelf'];
        var level = full[1][i]['Level'];
        var id = full[1][i]['pk'];
        if (wh == d_warehouse){
            $("#d_space").append('<option id=' + id + ' value="'+i+'">'+ wh + ' '+ aisle+ ' ' + shelf + ' '+level +'</option>');
            }
        }             
       
       
    

});

$("#new_customer").click(function() { 


    
                     //成功，跳转至任务界面
                    window.location="./createcust.html"
               
        
                
        return false;
    });
    
   
});    
