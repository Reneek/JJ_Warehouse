$(function() {

    $( "#d_start" ).datepicker();
    $( "#d_end" ).datepicker();
    var full

$("#d_search").click(function() { // if search  button is clicked
    var d_start = $("#d_start").val();
    var d_end = $("#d_end").val();
    var d_category = "placeholder"
    

    $.ajax({
    type:"GET",
    url:'http://'+ip_addr+'/load_warehouse/',
    data:{"d_start":d_start,"d_end":d_end,"d_category":d_category},
    datatype:"json",
    success:function(data){
    full = data;
       
        // load warehouse filter options
        $("#d_warehouse").html("");
        $("#d_warehouse").append('<option disable selected value>'+'----filter by warehouse----'+'</option>');
        for (var i = 0 ;  i < data[0].length ; i++){
        var warehouse = data[0][i];
        $("#d_warehouse").append('<option id=' + i + ' value="'+ warehouse +'">'+warehouse+'</option>');
    }

    //load table
    $(".de").remove();
        for (var i = 0 ;  i < data[1].length ; i++){ 
            var wh = data[1][i]['Wh'];
            var aisle = data[1][i]['Aisle'];
            var shelf = data[1][i]['Shelf'];
            var level = data[1][i]['Level'];  
            var status = data[1][i]['Status'];
            var sta
            switch (status){
                                case 0:
                                    sta = "available";
                                    break;
                                case -1:
                                    sta = "under repair";
                                    break;
                                                      
                            }
                   
            tr = $('<tr/>');
            tr.append("<td class = 'de'>" + wh + "</td>");
            tr.append("<td class = 'de'>" + aisle + "</td>");
            tr.append("<td class = 'de'>" + shelf + "</td>");
            tr.append("<td class = 'de'>" + level + "</td>");
            tr.append("<td class = 'de'>" + sta + "</td>");                            
            $('#wtable').append(tr);
        }
}
});
});

$("#d_warehouse").change(function(){ //after selecting warehouse
    $(".de").remove();
    
    var d_warehouse = $("#d_warehouse").val();    
    for (var i = 0 ;  i < full[1].length ; i++){
        var wh = full[1][i]['Wh']
        
        if(wh==d_warehouse){

            var aisle = full[1][i]['Aisle'];
            var shelf = full[1][i]['Shelf'];
            var level = full[1][i]['Level'];  
            var status = full[1][i]['Status'];
            var sta
            switch (status){
                                case 0:
                                    sta = "available";
                                    break;
                                case -1:
                                    sta = "under repair";
                                    break;
                                                      
                            }
                    
            tr = $('<tr/>');
            tr.append("<td class = 'de'>" + wh + "</td>");
            tr.append("<td class = 'de'>" + aisle + "</td>");
            tr.append("<td class = 'de'>" + shelf + "</td>");
            tr.append("<td class = 'de'>" + level + "</td>");
            tr.append("<td class = 'de'>" + sta + "</td>");                            
            $('#wtable').append(tr);           

        }
    }
      
        
              
       
       
    

});



    
   
});    
