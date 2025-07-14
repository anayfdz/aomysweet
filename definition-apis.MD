# Autenticación y Usuarios
##  POST /api/auth/register

```
{
  "name": "María González",
  "email": "maria@example.com",
  "password": "SecurePass123!",
  "phone": "+56912345678"
} bash
```

### Response 201 created
```
{
    "message": "successfully"
}
bash
```

## POST /api/auth/login
```
{
    "email": "email@email.com",
    "password": "abc123"
} bash
```
### Response 200 ok
```
{
    "name": "ana",
    "email": "email@email.com"
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.."
} bash
```
# Productos
## GET /api/products

```

```

### Response 200 OK
```json
{
    "products": [
        {
            "id": 1,
            "name": "Cupcakes Unicornio",
            "description": "Motores ocupados con tiempo de seguridad y desarrollo del usuario",
            "price": 15000.00,
            "featured": true,
            "discount": 0,
            "category": {
                "id": 1,
                "name": "Cupcakes"
            }
        }
    ],
    "total": 10,
    "page": 1,
    "limit": 10
}
```

## GET /api/products/:id
### Response 200 OK
```json
{
    "id": 1,
    "name": "Cupcakes Unicornio",
    "description": "Motores ocupados con tiempo de seguridad y desarrollo del usuario",
    "price": 15000.00,
    "featured": true,
    "discount": 0,
    "category": {
        "id": 1,
        "name": "Cupcakes"
    }
}
```

# Carrito de Compras
## GET /api/cart
### Response 200 OK
```json
{
    "items": [
        {
            "id": 1,
            "product": {
                "id": 1,
                "name": "Cupcakes Unicornio",
                "price": 15000.00
            },
            "quantity": 2,
            "subtotal": 30000.00
        }
    ],
    "total": 30000.00
}
```

## POST /api/cart/add
```json
{
    "product_id": 1,
    "quantity": 1
}
```
### Response 200 OK
```json
{
    "message": "Producto agregado al carrito"
}
```

## PUT /api/cart/:id
```json
{
    "quantity": 2
}
```
### Response 200 OK
```json
{
    "message": "Cantidad actualizada"
}
```

## DELETE /api/cart/:id
### Response 200 OK
```json
{
    "message": "Producto eliminado del carrito"
}
```

# Pedidos
## POST /api/orders
```json
{
    "payment_method": "credit_card",
    "shipping_address": {
        "street": "Calle Principal 123",
        "city": "Ciudad",
        "state": "Estado",
        "zip": "12345"
    }
}
```
### Response 201 Created
```json
{
    "order_id": 1,
    "status": "pending",
    "total": 30000.00
}
```
