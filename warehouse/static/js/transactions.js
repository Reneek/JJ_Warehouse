$(function() {

    $( "#d_start" ).datepicker();
    $( "#d_end" ).datepicker();
    var full

$("#d_search").click(function() { // if search  button is clicked
    var d_start = $("#d_start").val();
    var d_end = $("#d_end").val();
    

    $.ajax({
    type:"GET",
    url:'http://'+ ip_addr+'/load_trans/',
    data:{"d_start":d_start,"d_end":d_end},
    datatype:"json",
    success:function(data){//[[{"customer":firstname + lastname},...,]{'name':'start':,'end':,"wh":wh,'location':, "cost", "status":},...,]]
    full = data;

       
        // load warehouse filter options
        $("#d_customer").html("");
        $("#d_customer").append('<option disable selected value>'+'----filter by customer----'+'</option>');
        for (var i = 0 ;  i < data[0].length ; i++){
            var customer = data[0][i]["name"];
            $("#d_customer").append('<option id=' + i + ' value="'+ customer +'">' + customer + '</option>');
        }

    //load table
    $(".de").remove();
        for (var i = 0 ;  i < data[1].length ; i++){ 
            var name = data[1][i]['name'];
            var start = data[1][i]['start'];
            var end = data[1][i]['end'];
            var wh = data[1][i]['wh'];  
            var location = data[1][i]['location'];
            var cost = data[1][i]['cost'];
            var status = data[1][i]['status'];
            var sta
            switch (status){
                                case 0:
                                    sta = "paid";
                                    break;
                                case 1:
                                    sta = "ongoing";
                                    break;

                                default:
                                    sta = "error"
                                              
                                                    
                            }
                   
            tr = $('<tr/>');
            tr.append("<td class = 'de'>" + name + "</td>");
            tr.append("<td class = 'de'>" + start + "</td>");
            tr.append("<td class = 'de'>" + end + "</td>");
            tr.append("<td class = 'de'>" + wh + "</td>");
            tr.append("<td class = 'de'>" + location + "</td>");                            
            tr.append("<td class = 'de'>" + cost + "</td>");
            tr.append("<td class = 'de'>" + sta + "</td>");
            $('#ttable').append(tr);
        }
}
});
});

$("#d_customer").change(function(){ //after selecting warehouse
    $(".de").remove();
    
    var d_customer = $("#d_customer").val();    
    for (var i = 0 ;  i < full[1].length ; i++){
        var name = full[1][i]['name']
        
        if(name==d_customer){

            var name = full[1][i]['name'];
            var start = full[1][i]['start'];
            var end = full[1][i]['end'];
            var wh = full[1][i]['wh'];  
            var location = full[1][i]['location'];
            var cost = full[1][i]['cost'];
            var status = full[1][i]['status'];
            var sta
            switch (status){
                                case 0:
                                    sta = "paid";
                                    break;
                                case 1:
                                    sta = "ongoing";
                                    break;
                                default:
                                    sta = "error";
                                                      
                            }
                   
            tr = $('<tr/>');
            tr.append("<td class = 'de'>" + name + "</td>");
            tr.append("<td class = 'de'>" + start + "</td>");
            tr.append("<td class = 'de'>" + end + "</td>");
            tr.append("<td class = 'de'>" + wh + "</td>");
            tr.append("<td class = 'de'>" + location + "</td>");                            
            tr.append("<td class = 'de'>" + cost + "</td>");
            tr.append("<td class = 'de'>" + sta + "</td>");
            $('#ttable').append(tr);

        }
    }
      
        
              
       
       
    

});



    
   
});    
