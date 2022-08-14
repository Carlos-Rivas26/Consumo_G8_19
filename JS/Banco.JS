var UrlBancos = 'http://20.216.41.245:90/G8_19/controller/banco.php?opc=Getbancos'
var UrlInsertBanco = 'http://20.216.41.245:90/G8_19/controller/banco.php?opc=InsertBanco'
var UrlGetBanco = 'http://20.216.41.245:90/G8_19/controller/banco.php?opc=Getbanco'
var UrlUpdateBanco = 'http://20.216.41.245:90/G8_19/controller/banco.php?opc=UpdateBanco'
var UrlDeleteBanco ='http://20.216.41.245:90/G8_19/controller/banco.php?opc=DeleteBanco'
$(document).ready(function(){
    CargarBancos();
});

function CargarBancos(){
    
    $.ajax({
         url: UrlBancos,
         type:'GET',
         datatype:'JSON',
         success: function(response){
            var MiItems= response;
            var Valores='';
            

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].Codigo_Banco +'</td>'+
                '<td>'+ MiItems[i].Nombre_Banco +'</td>'+
                '<td>'+ MiItems[i].Oficina_Principal +'</td>'+
                '<td>'+ MiItems[i].Cantidad_Sucursales +'</td>'+
                '<td>'+ MiItems[i].Fecha_Fundacion +'</td>'+
                '<td>'+ MiItems[i].Pais +'</td>'+
                '<td>'+ MiItems[i].RTN +'</td>'+
                '<td>' +
                '<button class="btn btn-info" onclick = "CargarBanco('+  MiItems[i].Codigo_Banco +')">Editar</button>'+
                '</td>'+
                '<td>' +
                '<button class="btn btn-danger" onclick = "EliminarBanco('+  MiItems[i].Codigo_Banco +')">Eliminar</button>'+
                '</td>'+
               '</tr>';
               $('#DataBancos').html(Valores); 
            }
        }/*,
       error: function(textStatus, errorThrown ){
           alert('Error al agrear socio'+ textStatus + errorThrown);
       }*/
     });
}

function AgregarBanco(){
    var datosbanco={
    Codigo_Banco:$('#Codigo_Banco').val(),
    Nombre_Banco:$('#Nombre_Banco').val(),
    Oficina_Principal: $('#Oficina_Principal').val(),
    Cantidad_Sucursales: $('#Cantidad_Sucursales').val(),
    Fecha_Fundacion: $('#Fecha_Fundacion').val(),
    Pais: $('#Pais').val(),
    RTN: $('#RTN').val(),
    };
    var datosbancojson =JSON.stringify(datosbanco);
    $.ajax({
        url: UrlInsertBanco,
        type: 'POST',
        data: datosbancojson,
        datatype: 'JSON',
         contenttype: 'application/json',
        success: function(reponse){
        console.log(reponse);
        alert('Banco Agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('error al agregar Banco'+textStatus + errorThrown);
        }

    
    })
     alert('Aviso');
}
function CargarBanco (Codigo_Banco){
     var datosbanco = {
        Codigo_Banco: Codigo_Banco
     };
var datosbancojson=JSON.stringify (datosbanco);
$.ajax({
    url: UrlGetBanco,
    type: 'POST',
    data: datosbancojson,
    datatype: 'JSON',
    contenttype: 'application/json',
    success: function(response){
    var MiItems= response;
    $('#Codigo_Banco').val(MiItems[0].Codigo_Banco);
    $('#Nombre_Banco').val(MiItems[0].Nombre_Banco);
    $('#Oficina_Principal').val(MiItems[0].Oficina_Principal);
    $('#Cantidad_Sucursales').val(MiItems[0].Cantidad_Sucursales);
    $('#Fecha_Fundacion').val(MiItems[0].Fecha_Fundacion);
    $('#Pais').val(MiItems[0].Pais);
    $('#RTN').val(MiItems[0].RTN);
    var btnactualizar ='<input type="submit"  id="btn_actualizar" onclick= "ActualizaBanco('+ MiItems[0].Codigo_Banco +')" ' +
    'value = "Actualizar Banco" class="btn btn-primary"></input>';
    $('#btnagregarbanco').html(btnactualizar);
     }
    });
}

 function ActualizaBanco(Codigo_Banco){
    var datosbanco = {
        Codigo_Banco: Codigo_Banco,
        Nombre_Banco: $('#Nombre_Banco').val(),
        Oficina_Principal: $('#Oficina_Principal').val(),
        Cantidad_Sucursales: $('#Cantidad_Sucursales').val(),
        Fecha_Fundacion: $('#Fecha_Fundacion').val(),
        Pais: $('#Pais').val(),
        RTN: $('#RTN').val(),
     }
     var datosbancojson=JSON.stringify (datosbanco);
     $.ajax({
        url: UrlUpdateBanco,
        type: 'PUT',
        data: datosbancojson,
        datatype: 'JSON',
         contenttype: 'application/json',
         success: function(response){
         console.log(response);
         alert("Banco Actualizado");

    },
 error: function(textStatus, errorThrown){
    alert('error al Actualizar Banco'+textStatus + errorThrown);
    }

    });
      alert('Aviso');
 }
 
 function EliminarBanco(CodigoBanco){
    
    //alert("entre");
    var datosbanco = {
        Codigo_Banco:CodigoBanco
        
      };
      var datosbancojson= JSON.stringify(datosbanco);
      
      $.ajax({
        url:UrlDeleteBanco,
        type:'DELETE',
        data:datosbancojson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
        console.log(response);
        },
       error: function(textStatus, errorThrown ){
           alert('Error al borrar Banco'+ textStatus + errorThrown);
       }
      });
         alert("Banco Eliminado");
         CargarBancos();

 }