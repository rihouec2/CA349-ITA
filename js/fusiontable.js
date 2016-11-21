$(document).ready(function(){
    
    var query = "";
    
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
          center: new google.maps.LatLng(53.31424702330468, -6.419693859375002),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        layer = new google.maps.FusionTablesLayer({
          map: map,
          heatmap: { enabled: false },
          query: {
            select: "col1",
            from: "1WZkzM2NWeY_1KvLfUkibDJCl63IJBXcvYg6AWRGM",
            where: query
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
    
    function displayChart(){
        var frame = '<iframe width="500" height="300" scrolling="no" frameborder="no" src="https://fusiontables.google.com/embedviz?containerId=googft-gviz-canvas&amp;q=select+col1%2C+col5%2C+col6+from+1WZkzM2NWeY_1KvLfUkibDJCl63IJBXcvYg6AWRGM+order+by+col1+asc+limit+100&amp;viz=GVIZ&amp;t=COLUMN&amp;uiversion=2&amp;gco_forceIFrame=true&amp;gco_hasLabelsColumn=true&amp;att=true&amp;width=500&amp;height=300"></iframe>';
        document.getElementById("chart").innerHTML = frame;
    }
    
    var submitBtn = document.getElementById("submit");
    submitBtn.onclick = function(){            
        query = "";
        var date = $(".date option:selected").val();
        var min = $("#min").val();
        var max = $("#max").val();
        
        if( date != ""){
            if(min != "" && max != ""){
                query += date + " \x3e\x3d "+ min + " and " + date + " \x3c\x3d " + max;
            }
            else if (min != "" && max == ""){
                query += date + " \x3e\x3d "+ min;
            }
            else if (min == "" && max != ""){
                query += date + " \x3c\x3d "+ max;
            }
            else{
                query = "";
            }
        }
        else{
            query = "";
        }       
        
        alert(query);
        displayMap();
    }
    
    displayMap();
    displayChart();
    //google.maps.event.addDomListener(window, 'load', initialize);
    
});
