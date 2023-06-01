[ESP]
Thesesocksshop es un proyecto de práctica que simula una webapp para un ecommerce utilizando django (un ecommerce que solo vende calcetines).
La webapp tiene las siguientes caracteristicas :

* Una página principal con una muestra de los productos mas populares (basado en su número de ventas).
* Creación e ingreso de perfiles de clientes.
* Simulación completa del proceso de compra que consiste en : 
   1. Carrito de compras 
   2. Formularios de datos del cliente y de envío 
   3. Integración de la API de PayPal para pagos 
   4. Página de confirmación de compra
* Creación de reseñas de productos.
* Administración del inventario existente y adición de productos nuevos desde la misma app (sin tener que ingresar al django admin)
* Barra de búsqueda de productos

La app fue creada utilizando Python, React, Javascript, HTML y CSS El backend es administrado a través de "DjangoRestFramework" , los 
archivos estáticos servidos con "whitenoise" y las imágenes de productos subidas al servicio AWS S3 Buckets.

[ENG]
Thesesocksshop is a practice project of a mock ecommerce django webapp (for a commerce that only sells socks). 
The app has the following features :

* Carousel showcasing most popular products (based on the number of sales)
* Customer profile creation and login.
* Simulation of the shopping process consisting of:
    1. Shopping cart 
    2. Customer and shipping forms 
    3. Paypal API integration 
    4. Checkout page
* Product review creation
* Managing product inventory from within a view in the app (not having to access django admin page)
* Product search bar.

The app was codded using Python, React, JavaScript, HTML and CSS. The backend is managed with "DjangoRestFramework" , 
static files are served with "whitenoise" and product images are hosted using AWS S3 Buckets.

By Gastón Ariel Peppino.
