var UrlTransaccion = 'http://20.216.41.245:90/G8_19/controller/transaccion.php?opc=Gettransaccions'
var UrlInsertarTransaccion = 'http://20.216.41.245:90/G8_19/controller/transaccion.php?opc=InsertTransaccion'
var UrlGetTransaccion = 'http://20.216.41.245:90/G8_19/controller/transaccion.php?opc=Gettransaccion'
var UrlUpdateTransaccion = 'http://localhost:90/G8_19/controller/transaccion.php?opc=UpdateTransaccion'
var UrlDeleteTransaccion ='http://20.216.41.245:90/G8_19/controller/transaccion.php?opc=DeleteTransaccion'
$(document).ready(function(){
    CargarTransaccion();
});

function CargarTransaccion(){
    
    $.ajax({
         url: UrlTransaccion,
         type:'GET',
         datatype:'JSON',
         success: function(response){
            var MiItems= response;
            var Valores='';
            

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].Codigo_transaccion +'</td>'+
                '<td>'+ MiItems[i].Tipo_transaccion +'</td>'+
                '<td>'+ MiItems[i].Cod_cliente +'</td>'+
                '<td>'+ MiItems[i].Fecha_transaccion +'</td>'+
                '<td>'+ MiItems[i].Monto_transaccion +'</td>'+
                '<td>'+ MiItems[i].Sucursal +'</td>'+
                '<td>'+ MiItems[i].Num_cuenta +'</td>'+
                '<td>' +
                '<button class="btn btn-info" onclick = "CargarTransacciones('+  MiItems[i].Codigo_transaccion +')">Editar</button>'+
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick = "EliminarTransaccion('+  MiItems[i].Codigo_transaccion +')">Eliminar</button>'+
                '</td>'+
               '</tr>';
               $('#DataTransaccion').html(Valores); 
            }
        }/*,
       error: function(textStatus, errorThrown ){
           alert('Error al agrear socio'+ textStatus + errorThrown);
       }*/
     });
}

function AgregarTransaccion(){
    var datostransaccion={
    Codigo_transaccion:$('#Codigo_transaccion').val(),
    Tipo_transaccion:$('#Tipo_transaccion').val(),
    Cod_cliente: $('#Cod_cliente').val(),
    Fecha_transaccion: $('#Fecha_transaccion').val(),
    Monto_transaccion: $('#Monto_transaccion').val(),
    Sucursal: $('#Sucursal').val(),
    Num_cuenta: $('#Num_cuenta').val(),
    };
    var datostransaccionjson =JSON.stringify(datostransaccion);
    $.ajax({
        url: UrlInsertarTransaccion,
        type: 'POST',
        data: datostransaccionjson,
        datatype: 'JSON',
         contenttype: 'application/json',
        success: function(reponse){
        console.log(reponse);
        alert('Transaccion Agregada Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al Agregar Transaccion'+textStatus + errorThrown);
        }

    
    })
     alert('Aviso');
}
function CargarTransacciones(Codigo_transaccion){
     var datostransaccion = {
        Codigo_transaccion: Codigo_transaccion
     };
var datostransaccionjson=JSON.stringify(datostransaccion);
$.ajax({
    url: UrlGetTransaccion,
    type: 'POST',
    data: datostransaccionjson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function(response){
    var MiItems= response;
    $('#Codigo_transaccion').val(MiItems[0].Codigo_transaccion);
    $('#Tipo_transaccion').val(MiItems[0].Tipo_transaccion);
    $('#Cod_cliente').val(MiItems[0].Cod_cliente);
    $('#Fecha_transaccion').val(MiItems[0].Fecha_transaccion);
    $('#Monto_transaccion').val(MiItems[0].Monto_transaccion);
    $('#Sucursal').val(MiItems[0].Sucursal);
    $('#Num_cuenta').val(MiItems[0].Num_cuenta);

    var btnactualizar ='<input type="submit"  id="btn_actualizar" onclick= "ActualizaTransaccion('+ MiItems[0].Codigo_transaccion +')" ' +
        'value = "Actualizar Transaccion" class="btn btn-primary"></input>';
          $('#btnagregartransaccion').html(btnactualizar);
     }
    });
}

 function ActualizaTransaccion(Codigo_transaccion){
    var datostransaccion = {
        Codigo_transaccion: Codigo_transaccion,
        Tipo_transaccion:$('#Tipo_transaccion').val(),
        Cod_cliente: $('#Cod_cliente').val(),
        Fecha_transaccion: $('#Fecha_transaccion').val(),
        Monto_transaccion: $('#Monto_transaccion').val(),
        Sucursal: $('#Sucursal').val(),
        Num_cuenta: $('#Num_cuenta').val(),

     }
     var datostransaccionjson=JSON.stringify(datostransaccion);
     $.ajax({
        url: UrlUpdateTransaccion,
        type: 'PUT',
        data: datostransaccionjson,
        datatype: 'JSON',
         contenttype: 'application/json',
         success: function(response){
         console.log(response);
         alert("Transacccion Actualizado");

    },
 error: function(textStatus, errorThrown){
    alert('Error al Actualizar Transaccion'+ textStatus + errorThrown);
    }

    });
      alert('Aviso');
 }
 
 function EliminarTransaccion(Codigotransaccion){
    
    //alert("entre");
    var datostransaccion = {
        Codigo_transaccion:Codigotransaccion
        
      };
      var datostransaccionjson= JSON.stringify(datostransaccion);
      
      $.ajax({
        url:UrlDeleteTransaccion,
        type:'DELETE',
        data:datostransaccionjson,
        datatype:'JSON',
        contenttype:'application/json',
        success: function(response){
        console.log(response);
        },
       error: function(textStatus, errorThrown ){
           alert('Error al borrar la Transaccion'+ textStatus + errorThrown);
       }
      });
         alert("Transaccion Eliminado");
         CargarTransaccion();

 }