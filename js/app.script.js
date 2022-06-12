/* Variables y constantes gobales */

/* Recorrido de la página */
$(document).ready(function() {
    $('#inicio').click(viewHome);
    $('#monitoreo').click(viewMonitoreo);
    $('#analisis').click(viewAnalisis);
    $('#datos').click(viewDatos);
    $('#contacto').click(viewContact);
});

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