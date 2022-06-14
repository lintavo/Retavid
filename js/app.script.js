/* Variables y constantes gobales */
var myFirebaseRef;
/* Gráfico de líneas */
var chart;
var chartPLG;
var chartCO;
var chartLinesData1 = ['PLG'];
var chartLinesData2 = ['CO'];
var chartLinesX = [];
var chartLines = [];
var lecterPLG = ['PLG'];
var lecterCO = ['CO'];
var CO;
var PLG;

/* Recorrido de la página */
$(document).ready(function() {
    myFirebaseRef = new Firebase("https://gasesutec-default-rtdb.firebaseio.com/");
    
    requestData();
    addChartLine();
    addChartPLG();
    addChartCO();
    
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
        lecterPLG = [];
        lecterCO = [];

        for(ultimate in lecter){
            CO = (lecter[ultimate].ultimoDato.CO);
            PLG = (lecter[ultimate].ultimoDato.PLG);
        }
        lecterPLG.push(['PLG', Number(PLG)]);
        lecterCO.push(['CO', Number(CO)]);

        chartPLG.load({
            columns: lecterPLG
        });

        chartCO.load({
            columns: lecterCO
        });

        var arr1;
        var arr2;
        var arr3;

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
            chartLines.push(chartLinesData1);
            chartLines.push(chartLinesData2);     
            chart.load({
                columns: chartLines
            });
            console.log(chartLines);
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
                rotated: false,
                label: 'Fecha y hora de la lectura'
            }
        }
    });
    //console.log(chartLinesData1);
};

/* Función para gráfica de monitoreo PGL */
addChartPLG = function() {
      chartPLG = c3.generate({
        bindto: '#graph-plg',
        data: {
            columns: [ lecterPLG ],
            type: 'gauge'
        },
        gauge: {
            show: true,
            min: 0,
            max: 1300,
            units: 'PPM'
        },
        color: {
            pattern: ['#47704c', '#f59e01', '#e61348'],
            threshold: {
                values: [700, 1000, 1300]
            }
        }
      });
      console.log(lecterPLG);
};

/* Función para gráfica de monitoreo PGL */
addChartCO = function() {
    chartCO = c3.generate({
      bindto: '#graph-co',
      data: {
          columns: [ lecterCO ],
          type: 'gauge'
      },
      gauge: {
          show: true,
          min: 0,
          max: 130,
          units: 'PPM'
      },
      color: {
          pattern: ['#47704c', '#f59e01', '#e61348'],
          threshold: {
              values: [70, 100, 130]
          }
      }
    });
    console.log(lecterCO);
};