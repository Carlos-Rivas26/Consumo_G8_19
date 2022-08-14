var UrlClientes      = 'http://20.216.41.245:90/G8_19/controller/cliente.php?opc=GetClientes';
var UrlInsertCliente = 'http://20.216.41.245:90/G8_19/controller/cliente.php?opc=InsertCliente';
var UrlGetCliente    = 'http://20.216.41.245:90/G8_19/controller/cliente.php?opc=GetCliente';
var UrlUpdateCliente = 'http://20.216.41.245:90/G8_19/controller/cliente.php?opc=UpdateCliente';
var UrlDeleteCliente = 'http://20.216.41.245:90/G8_19/controller/cliente.php?opc=DeleteCliente';

$(document).ready(function(){
    CargarClientes();
});

function CargarClientes(){
    
    $.ajax({
         url: UrlClientes,
         type:'GET',
         datatype:'JSON',
         success: function(response){
            var MiItems= response;
            var Valores='';
            

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].numeroCliente +'</td>'+
                '<td>'+ MiItems[i].nombres +'</td>'+
                '<td>'+ MiItems[i].apellidos +'</td>'+
                '<td>'+ MiItems[i].rtn +'</td>'+
                '<td>'+ MiItems[i].fechaAfiliacion +'</td>'+
                '<td>'+ MiItems[i].saldoActual +'</td>'+
                '<td>'+ MiItems[i].numeroCuenta +'</td>'+
                '<td>' +
                '<button class="btn btn-info" onclick = "CargarCliente('+  MiItems[i].numeroCliente +')">Editar</button>'+
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick = "EliminarCliente('+  MiItems[i].numeroCliente +')">Eliminar</button>'+
                '</td>'+
               '</tr>';
               $('#DataClientes').html(Valores); 
            }
        }/*,
       error: function(textStatus, errorThrown ){
           alert('Error al agrear socio'+ textStatus + errorThrown);
       }*/
     });
}

function AgregarCliente() {
    var datosClientes = {
        numeroCliente:$('#numeroCliente').val(),
        nombres:$('#nombres').val(),
        apellidos: $('#apellidos').val(),
        rtn: $('#rtn').val(),
        fechaAfiliacion: $('#fechaAfiliacion').val(),
        saldoActual: $('#saldoActual').val(),
        numeroCuenta: $('#numeroCuenta').val(),
    };

    var datosclientejson =JSON.stringify(datosClientes);
    
    console.log(datosclientejson);

    $.ajax({
        url: UrlInsertCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse) {
            $('.limpiar').val(''); // Sirve para dejar vacio los campos una vez que se guarde el nuevo cliente

            console.log(reponse);
            alert('Cliente Agregado Correctamente');
            CargarClientes();
        },
        error: function(textStatus, errorThrown){
            alert('error al agregar Cliente'+textStatus + errorThrown);
        }    
    })
    
    //alert('Aviso');
}

function CargarCliente(numeroCliente) {
     var datosClientes = {
        numeroCliente: numeroCliente
     };

    var datosclientejson=JSON.stringify (datosClientes);

    $.ajax({
        url: UrlGetCliente,
        type: 'POST',
        data: datosclientejson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            var MiItems= response;
            $('#numeroCliente').val(MiItems[0].numeroCliente);
            $('#nombres').val(MiItems[0].nombres);
            $('#apellidos').val(MiItems[0].apellidos);
            $('#rtn').val(MiItems[0].rtn);
            $('#fechaAfiliacion').val(MiItems[0].fechaAfiliacion);
            $('#saldoActual').val(MiItems[0].saldoActual);
            $('#numeroCuenta').val(MiItems[0].numeroCuenta);

            var btnactualizar ='<input type="button" id="btn_actualizar" onclick= "ActualizaCliente('+ MiItems[0].numeroCliente +')" value = "Actualizar Cliente" class="btn btn-primary"></input>';
            $('#btnAccionCliente').html(btnactualizar);
        }
    });
}

 function ActualizaCliente(numeroCliente){
    var datosClientes = {
        numeroCliente: numeroCliente,
        nombres: $('#nombres').val(),
        apellidos: $('#apellidos').val(),
        rtn: $('#rtn').val(),
        fechaAfiliacion: $('#fechaAfiliacion').val(),
        saldoActual: $('#saldoActual').val(),
        numeroCuenta: $('#numeroCuenta').val(),
    }
    
    var datosclientejson=JSON.stringify (datosClientes);

    $.ajax({
    url: UrlUpdateCliente,
    type: 'PUT',
    data: datosclientejson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function(response) {
        $('.limpiar').val(''); // Sirve para dejar en blanco los campos una vez que se actualice los datos del cliente

        console.log(response);
        alert("Cliente Actualizado");
        CargarClientes();
    },
    error: function(textStatus, errorThrown){
        alert('error al Actualizar Cliente'+textStatus + errorThrown);
    }
    });
    
    //alert('Aviso');
 }
 
 function EliminarCliente(numeroCliente){
    var datosClientes = {
        numeroCliente:numeroCliente
    };

    var datosclientejson= JSON.stringify(datosClientes);

    $.ajax({
        url:UrlDeleteCliente,
        type:'DELETE',
        data:datosclientejson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response) {
            console.log(response);
            alert("Cliente Eliminado");
            CargarClientes();
        },
        error: function(textStatus, errorThrown ) {
            alert('Error al borrar Cliente'+ textStatus + errorThrown);
        }
    });

    //alert("ClienteEliminado");

    //CargarClientes();
 }



