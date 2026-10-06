/* ==========================================
   PASO 2: Clase Producto
   ========================================== */
class Producto {
  // Constructor: inicializa los atributos
  constructor(nombre, precio, descuento, imagen) {
    this.nombre = nombre;
    this.precio = precio;       // precio base (S/)
    this.descuento = descuento; // porcentaje (ej. 20 = 20%)
    this.imagen = imagen;
  }

  // Método: retorna el precio con el descuento aplicado
  calcularPrecioFinal() {
    return this.precio - (this.precio * this.descuento) / 100;
  }
}

/* ==========================================
   PASO 3: Instanciar objetos y crear el catálogo
   ========================================== */
const producto1 = new Producto("Laptop HP Victus Ryzen 7 RTX 4050", 3500, 
  15, "img/laptop.png");
const producto2 = new Producto("Audífonos Bluetooth Inalámbricos", 250, 20, "img/audifonos.png");
const producto3 = new Producto("Smartphone Samsung con S Pen", 1800, 10, "img/celular.png");

const catalogo = [producto1, producto2, producto3];

/* ==========================================
   PASO 4: Renderizado dinámico en el DOM
   ========================================== */
const contenedor = document.getElementById("contenedor-productos");

catalogo.forEach((producto, indice) => {
  // Crear la tarjeta
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta");

  // Contenido de la tarjeta: nombre, imagen, precio base y botón
  tarjeta.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h2>${producto.nombre}</h2>
    <p class="precio" id="precio-${indice}">S/ ${producto.precio.toFixed(2)}</p>
    <button class="btn-descuento" data-indice="${indice}">Aplicar Descuento</button>
  `;

  contenedor.appendChild(tarjeta);
});

/* ==========================================
   PASO 5: Eventos (interactividad)
   ========================================== */
const botones = document.querySelectorAll(".btn-descuento");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    // Identificar qué producto es
    const indice = boton.dataset.indice;
    const producto = catalogo[indice];

    // Ejecutar el método del objeto
    const precioFinal = producto.calcularPrecioFinal();

    // Actualizar el DOM con el nuevo precio
    const parrafoPrecio = document.getElementById(`precio-${indice}`);
    parrafoPrecio.classList.add("con-descuento");
    parrafoPrecio.innerHTML = `
      <span class="tachado">S/ ${producto.precio.toFixed(2)}</span>
      <span class="final">S/ ${precioFinal.toFixed(2)}</span>
      <small>(-${producto.descuento}%)</small>
    `;

    // Evitar aplicar el descuento más de una vez
    boton.disabled = true;
    boton.textContent = "Descuento aplicado";

    console.log(`${producto.nombre}: precio final S/ ${precioFinal.toFixed(2)}`);
  });
});
