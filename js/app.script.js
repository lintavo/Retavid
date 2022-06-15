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
var table = [];
var dataset;
var lecterPLG = ['PLG'];
var lecterCO = ['CO'];
var CO;
var PLG;
var date;
var byetable;

/* Recorrido de la página */
$(document).ready(function() {
    myFirebaseRef = new Firebase("https://gasesutec-default-rtdb.firebaseio.com/");
    
    requestData();
    addChartLine();
    addChartPLG();
    addChartCO();
    date = new Date();
    $('#año').html(date.getFullYear());
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

        $('#plg-ultimate').html(lecter[ultimate].ultimoDato.fecha + ' ' + lecter[ultimate].ultimoDato.hora);
        $('#co-ultimate').html(lecter[ultimate].ultimoDato.fecha + ' ' + lecter[ultimate].ultimoDato.hora);

        chartPLG.load({
            columns: lecterPLG
        });

        chartCO.load({
            columns: lecterCO
        });

        var arr1;
        var arr2;
        var arr3;
        var regt;

        for(IoT in lecter){
            var history = lecter[IoT].historico;

            for(any in history){
                arr1 = Number(history[any].PLG);
                chartLinesData1.push(arr1);

                arr2 = Number(history[any].CO);
                chartLinesData2.push(arr2);

                arr3 = history[any].fecha + ' ' + history[any].hora;
                chartLinesX.push(arr3);
 
                regt = [history[any].PLG, history[any].CO, history[any].fecha, history[any].hora];
                table.push(regt);
            }
            llenarTabla();
            chartLines.push(chartLinesData1);
            chartLines.push(chartLinesData2);     
            chart.load({
                columns: chartLines
            });
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

/* LLenar tabla con datos */
llenarTabla = function() {
    $('#historico').DataTable({
        data: table,
        columns: [
            { title: '<i class="bi bi-speedometer"></i> PLG' },
            { title: '<i class="bi bi-speedometer"></i> CO' },
            { title: '<i class="bi bi-calendar-date"></i> Fecha' },
            { title: '<i class="bi bi-clock"></i> Hora' },
        ],
        retrieve: true,
        paging: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
        },
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                text: '<i class="bi bi-clipboard2-plus"></i> Copiar',
                titleAttr: 'Copiar datos',
                footer: true
            },
            {
                extend: 'csvHtml5',
                text: '<i class="bi bi-filetype-csv"></i> CSV',
                titleAttr: 'Descargar archivo csv',
                footer: true
            },
            {
                extend: 'excelHtml5',
                text: '<i class="bi bi-file-spreadsheet"></i> Excel',
                titleAttr: 'Descargar hoja de excel',
                footer: true
            },
            /* {
                extend: 'pdfHtml5',
                text: '<i class="bi bi-filetype-pdf"></i> PDF',
                titleAttr: 'Descargar PDF',
                footer: true
            }, */
            {
                text: '<i class="bi bi-filetype-json"></i> JSON',
                action: function ( e, dt, button, config ) {
					var data = dt.buttons.exportData();
					$.fn.dataTable.fileSave(
						new Blob( [ JSON.stringify( data ) ] ),
						'Retavid - Sistema de monitoreo de gas propano.json'
					);
				},
                titleAttr: 'Descargar archivo JSON',
                footer: true
            },
            {
                extend: 'print',
                text: '<i class="bi bi-printer"></i> Imprimir',
                titleAttr: 'Imprimir datos de la tabla',
                footer: true
            },
        ],
        responsive: true
      });
};

/* Destruir tabla creada */
/* hakai = function() {
    byetable = $('#historico').DataTable( {
        paging: false
    } );
     
    byetable.destroy();
     
    byetable = $('#example').DataTable( {
        searching: false
    } );
}; */