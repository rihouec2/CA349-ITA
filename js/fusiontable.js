$(document).ready(function(){
    
    /* Global variables to build queries for both map and chart */
    var query;
    var city;
    
    /* Function to set default variables and htlm forms and to display map and chart */
    function initialize(){
       
        $(".type").val('0');
        $(".year").val('col5');
        $("#min").val('0');
        $("#max").val('500000');
        $("#city").val('Achill');
        
        query = "";
        city = "Achill";
        
        displayMap();
        displayChart();
    }
    
    /* Function to display map with variable query */
    function displayMap() {
        
        google.maps.visualRefresh = true;
        var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) ||
          (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
        if (isMobile) {
          var viewport = document.querySelector("meta[name=viewport]");
          viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
        }
        
        var mapDiv = document.getElementById('googft-mapCanvas');
        mapDiv.style.width = isMobile ? '100%' : '700px';
        mapDiv.style.height = isMobile ? '100%' : '500px';
        var map = new google.maps.Map(mapDiv, {
          center: new google.maps.LatLng(53.31424702330468, -8.58),
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        layer = new google.maps.FusionTablesLayer({
          map: map,
          heatmap: { enabled: false },
          query: {
            select: "col1",
            from: "1yCqOdai7HpblC6Xi-aGN-yFGww9YqVzVAvS8mYRd",
            where: query // global variable
          },
          options: {
            styleId: 2,
            templateId: 2
          }
        });

        if (isMobile) {
          var legend = document.getElementById('googft-legend');
          var legendOpenButton = document.getElementById('googft-legend-open');
          var legendCloseButton = document.getElementById('googft-legend-close');
          legend.style.display = 'none';
          legendOpenButton.style.display = 'block';
          legendCloseButton.style.display = 'block';
          legendOpenButton.onclick = function() {
            legend.style.display = 'block';
            legendOpenButton.style.display = 'none';
          }
          legendCloseButton.onclick = function() {
            legend.style.display = 'none';
            legendOpenButton.style.display = 'block';
          }
        }
    }
    
    /* Function to display chart with variable city */
    function displayChart(){
        
        var frame = '<iframe width="700" height="500" scrolling="no" frameborder="no" src="https://fusiontables.google.com/embedviz?containerId=googft-gviz-canvas&amp;q=select+col1%3E%3E0%2C+col5%3E%3E0%2C+col5%3E%3E1%2C+col6%3E%3E0%2C+col6%3E%3E1%2C+col7%3E%3E0%2C+col7%3E%3E1%2C+col8%3E%3E0%2C+col8%3E%3E1%2C+col9%3E%3E0%2C+col9%3E%3E1%2C+col10%3E%3E0%2C+col10%3E%3E1%2C+col11%3E%3E0%2C+col11%3E%3E1+from+1yCqOdai7HpblC6Xi-aGN-yFGww9YqVzVAvS8mYRd+where+col1%3E%3E0+%3D+&#39;' + city +'&#39;+order+by+col1%3E%3E0+asc+limit+10&amp;viz=GVIZ&amp;t=COLUMN&amp;uiversion=2&amp;gco_forceIFrame=true&amp;gco_hasLabelsColumn=true&amp;gco_vAxes=%5B%7B%22title%22%3Anull%2C+%22minValue%22%3Anull%2C+%22maxValue%22%3Anull%2C+%22useFormatFromData%22%3Atrue%2C+%22viewWindow%22%3A%7B%22max%22%3Anull%2C+%22min%22%3Anull%7D%2C+%22logScale%22%3Afalse%7D%2C%7B%22useFormatFromData%22%3Atrue%2C+%22viewWindow%22%3A%7B%22max%22%3Anull%2C+%22min%22%3Anull%7D%2C+%22minValue%22%3Anull%2C+%22maxValue%22%3Anull%2C+%22logScale%22%3Afalse%7D%5D&amp;gco_useFirstColumnAsDomain=true&amp;gco_legacyScatterChartLabels=true&amp;gco_isStacked=false&amp;gco_booleanRole=certainty&amp;gco_hAxis=%7B%22useFormatFromData%22%3Atrue%2C+%22minValue%22%3Anull%2C+%22maxValue%22%3Anull%2C+%22viewWindow%22%3Anull%2C+%22viewWindowMode%22%3Anull%7D&amp;gco_legend=right&amp;gco_title=&amp;gco_series=%7B%220%22%3A%7B%22errorBars%22%3A%7B%22errorType%22%3A%22none%22%7D%7D%2C+%221%22%3A%7B%22color%22%3A%22%236fa8dc%22%7D%2C+%223%22%3A%7B%22color%22%3A%22%23f1c232%22%7D%2C+%225%22%3A%7B%22color%22%3A%22%23c27ba0%22%7D%2C+%226%22%3A%7B%22color%22%3A%22%23109618%22%7D%2C+%228%22%3A%7B%22color%22%3A%22%23dc3912%22%7D%2C+%229%22%3A%7B%22color%22%3A%22%23e69138%22%7D%2C+%2210%22%3A%7B%22color%22%3A%22%23ff00ff%22%7D%2C+%2211%22%3A%7B%22color%22%3A%22%23d5a6bd%22%7D%2C+%2212%22%3A%7B%22color%22%3A%22%23980000%22%7D%2C+%2213%22%3A%7B%22color%22%3A%22%23cc4125%22%2C+%22targetAxisIndex%22%3A0%7D%7D&amp;gco_domainAxis=%7B%22direction%22%3A1%7D&amp;width=700&amp;height=500"></iframe>';
        
        document.getElementById("chart").innerHTML = frame;        
          
    }
    
    /* Build the variable query for map when Submit button is clicked */
    var submitBtn = document.getElementById("submit");
    submitBtn.onclick = function(){            
        query = "";
        var type = $(".type option:selected").val();
        var year = $(".year option:selected").val();
        var min = parseInt($("#min").val()); // min and max are numbers
        var max = parseInt($("#max").val());
        
        if(!isNaN(min) && !isNaN(max)){
            if(min <= max){
                query += year + "\x3e\x3e" + type + " \x3e\x3d "+ min + " and " + year + "\x3e\x3e" + type + " \x3c\x3d " + max;
            }
            else{
                alert("Minimum value must be inferior to Maximum value !");
                $("#min").val('0');
                $("#max").val('500000');
            }
        }
        else if (!isNaN(min) && isNaN(max)){
            $("#max").val('500000'); // set max to default value
            query += year + "\x3e\x3e" + type + " \x3e\x3d "+ min;            
        }
        else if (isNaN(min) && !isNaN(max)){
            $("#min").val('0'); // set min to default value
            query += year + "\x3e\x3e" + type + " \x3c\x3d "+ max;            
        }
        else{
            $("#min").val('0'); // set min to default value
            $("#max").val('500000'); // set max to default value
            query = ""; // query remains empty           
        }
        displayMap(); // reload map with new query
    }
    
    /* Reset variable query and html forms to default values */
    var resetBtn = document.getElementById("reset");
    resetBtn.onclick = function(){
        query = "";
        $(".type").val('0');
        $(".year").val('col5');
        $("#min").val('0');
        $("#max").val('500000');
        displayMap(); // reload map with default settings
    }
    
    /* Set the variable city for chart when a city is selected */
    var cityList = document.getElementById("city");
    cityList.onchange = function(){
        city = $("#city option:selected").val();
        displayChart(); // reload chart with new city
    }    
    
    initialize();
    
});
