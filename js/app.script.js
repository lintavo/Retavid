/* Variables y constantes gobales */
var myFirebaseRef;
/* Gráfico de líneas */
var chart;
var chartx;
var chartd1;
var chartd2;
var chartLinesData1 = ['PGL'];
var chartLinesData2 = ['CO'];
var chartLinesX = [];
var chartLines = [];
var chartLinesCategory = [];
var test = [
    ['x', '2010', '2011', '2012', '2013', '2014', '2015'],
    ['data1', 30, 200, 100, 400, 150, 250],
    ['data2', 130, 340, 200, 500, 250, 350]
];

var CO;
var PLG;

/* Recorrido de la página */
$(document).ready(function() {
    myFirebaseRef = new Firebase("https://gasesutec-default-rtdb.firebaseio.com/");
    $('#inicio').click(viewHome);
    $('#monitoreo').click(viewMonitoreo);
    $('#monitoreo').click(addChartPGL);
    $('#analisis').click(viewAnalisis);
    $('#datos').click(viewDatos);
    $('#contacto').click(viewContact);
    requestData();
    //addChartLine();
    //addChartPGL();
    //console.log(test());
});

/* Función requestData */
requestData = function(){

    var IoT;
    var any;

    //$("#spinner").addClass('visible');

    myFirebaseRef.on("value", function(data) {
        var lecter = data.val();
        //var arr;
        var ultimate;
        chartLines=[];
        chartLinesData1 = ['PLG'];
        chartLinesData2 = ['CO'];
        chartLinesX = [];
        for(ultimate in lecter){
            CO = (lecter[ultimate].ultimoDato.CO);
            PLG = (lecter[ultimate].ultimoDato.PLG);
        }

        var arr1;
        var arr2;
        var arr3;
        var arr4;

        for(IoT in lecter){
            var history = lecter[IoT].historico;

            for(any in history){
                arr1 = Number(history[any].PLG);
                chartLinesData1.push(arr1);

                arr2 = Number(history[any].CO);
                chartLinesData2.push(arr2);

                arr3 = history[any].fecha + ' ' + history[any].hora;
                chartLinesX.push(arr3);
            
            }
            //console.log(chartLinesData1, chartLinesData2, chartLinesX);
            //chartLinesCategory.push(chartLinesX);
            chartLines.push(chartLinesData1);
            chartLines.push(chartLinesData2);     
            chart.load({
                columns: chartLines
            });
            console.log(chartLines);
            console.log(test);
        }
        
        
        //$("#total span").html(total);

        //chart.load({
        //    columns: chartLinesData
        //});//Carga el gráfico con los datos obtenidos en el arreglo
        //$("#spinner").addClass('invisible');
    });
};

/* Función para generar gráfica de líneas */
addChartLine = function() {
        chart = c3.generate({
        bindto: '#graph-lines',
        data: {
            columns: chartLines
        },
        axis: {
            x: {
                type: 'category',
                categories: chartLinesX,
                show: false,
                rotated: true,
                label: 'Fecha y hora de la lectura'
            }
        }
    });
    console.log(chartLinesData1);
};

/* Función para gráfica de monitoreo PGL */
addChartPGL = function() {
      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['PLG', PLG],
        ]);

        var options = {
          width: 400, height: 120,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('graph-plg'));

        chart.draw(data, options);
}};

/* Función botón inicio */
viewHome = function() {
    $('#monitoreo-tool-section').removeClass('show');
    $('#analytics').removeClass('show');
    $('#data').removeClass('show');
    $('#contacts').removeClass('show');
    $('#home-section').addClass('show');
};

/* Función botón monitoreo */
viewMonitoreo = function() {
    $('#home-section').removeClass('show');
    $('#analytics').removeClass('show');
    $('#contacts').removeClass('show');
    $('#data').removeClass('show');
    $('#monitoreo-tool-section').addClass('show');
};

/* Función botón analisis */
viewAnalisis = function() {
    $('#home-section').removeClass('show');
    $('#monitoreo-tool-section').removeClass('show');
    $('#data').removeClass('show');
    $('#contacts').removeClass('show');
    addChartLine();
    $('#analytics').addClass('show');
};

/* Función botón datos */
viewDatos = function() {
    $('#home-section').removeClass('show');
    $('#monitoreo-tool-section').removeClass('show');
    $('#analytics').removeClass('show');
    $('#contacts').removeClass('show');
    $('#data').addClass('show');
};

/* Función botón contacto */
viewContact = function() {
    $('#home-section').removeClass('show');
    $('#monitoreo-tool-section').removeClass('show');
    $('#analytics').removeClass('show');
    $('#data').removeClass('show');
    $('#contacts').addClass('show');
};