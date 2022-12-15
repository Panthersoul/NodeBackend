
async function getProds() {
  let url = './api/productos';
    try {
            let res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.log(error);
        }
    }

  async function createCart()  {

    
    let url = './api/carrito/';
        await fetch(url, {
        method: 'POST'
        })
      .then((response) => response.json())
      .then((result) => 
      {
        if (!localStorage.getItem("cart")){
        localStorage.setItem('cart', JSON.stringify(result));
         }
      })
    
  }

  console.log(!localStorage.getItem("cart"));


    async function renderProds() {


      if (!localStorage.getItem("cart")){
        createCart();
        }

        let prods = await getProds();
        let listado = JSON.parse(prods);
        
        if (listado.length == 0){
          alert("No hay productos para listar")
        }
        let html = '';
        listado.forEach(producto => {
            let htmlSegment = `<div style="max-width:200px;" class="card m-3" >
                               <img class="card-img-top" style="max-width: 200px" src="${producto.urlFotoProducto}" />
                                <div class="card-body">
                                  <h2>${producto.nombreProducto}</h2>
                                  <span><strong>Descripcion: </strong>${producto.descripcionProducto}</span><br>
                                  <span><strong>Código: </strong>${producto.codigoProducto}</span><br>
                                  <span><strong>Precio: </strong>$${producto.precioProducto}</span>
                                  <p><strong> Stock Disponible: </strong> ${producto.stockProducto}</p>
                                  <a href="#" onclick="agregarCarrito(${producto.id})" class="btn btn-primary">Agregar al Carrito</a>
                                  <hr>
                                  <button type="button" onclick="actualizarIdModal(${producto.id})"  class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Actualizar
                                  </button>

                                  <a href="#" onclick="eliminar(${producto.id})" class="mt-2 btn btn-danger">Eliminar</a>
                                </div>
                            </div>`;
            html += htmlSegment;
        });

        let container = document.getElementById('contenedor');
        container.innerHTML = html;
    }

    async function eliminar(id){
      if (soyAdmin.checked){
          let url = './api/productos/';
          await fetch(url + id + '?admin=true', {
            method: 'DELETE'
          }).then(response => alert("Eliminado: "+response.json));
        
      }else{
        alert("Usted no es administrador para realizar esta acción.")
      }
    }

    let nombre = document.getElementById("nombreProducto");
    let descr = document.getElementById("descripcionProducto");
    let codigo = document.getElementById("codigoProducto");
    let foto = document.getElementById("foto");
    let precio = document.getElementById("precio");
    let stock = document.getElementById("stock");
    let idModal = document.getElementById("idModal");
    
   async function actualizarIdModal(id){
      let url = './api/productos';
      try {
            let url1 = './api/productos';
            await fetch(url+'/'+id, {
                method: 'GET'
                })
              .then((response) => response.json())
              .then((result) => 
              {
                arti = result;
              })

            idModal.value = id;
            nombre.value = arti.nombreProducto;
            descr.value = arti.descripcionProducto;
            codigo.value = arti.codigoProducto;
            foto.value = arti.urlFotoProducto;
            precio.value = arti.precioProducto;
            stock.value = arti.stockProducto;
            admin.value = arti.admin;

    }catch (error) {
            console.log(error);
        }
      }
  

    async function actualizar(){
      //e.preventDefault();
      let id = document.getElementById("idModal")
      
      id = id.value;
      try{
        let cuerpo = {
                "nombreProducto": nombre.value,
                "descripcionProducto": descr.value,
                "codigoProducto": codigo.value,
                "urlFotoProducto": foto.value,
                "precioProducto": precio.value,
                "stockProducto": stock.value,
                "id": id,
                "admin": JSON.stringify(true)

        }

          if (admin.value === "true"){
          let url = './api/productos/';
          console.log(url + id +"/?admin=true");
            await fetch(url + id, {
              "method": 'PUT',
              "headers": {
                  "Content-Type": "application/json"
              },
              "body": JSON.stringify(cuerpo)
            }).then(response => {
              console.log(response.body);
            }); 
            }else{
            alert("Usted no es administrador para realizar esta acción.")
          }
        } catch (error) {
            console.log(error);
        }
                  

    }
  

    async function agregarCarrito (id){

      let idCart = JSON.parse(localStorage.getItem("cart"))
      let cart=JSON.parse(idCart);
      let producto;

      let url1 = './api/productos/';
        await fetch(url1+id, {
        method: 'GET'
        })
      .then((response) => response.json())
      .then((result) => 
      {
       producto = result;
       producto.id = JSON.stringify(producto.id);
       producto.timestamp = JSON.stringify(producto.timestamp);
      })

      let url = './api/carrito/';
      await fetch(url + cart.id + '/productos', {   
              "method": 'POST',
              "headers": {
                  "Content-Type": "application/json"
              },
              "body": JSON.stringify(producto)
          })
          .then((response) => console.log(response.body));
          //.then((result) => //{                      console.log(result);                      //localStorage.setItem('cart', JSON.stringify(result));                    })
          
          //.then(response => alert("Agregado al carrito: "+response.json)); 
    }
    
    


    (function () {
        renderProds();
    })();

    let soyAdmin = document.getElementById("admin");
