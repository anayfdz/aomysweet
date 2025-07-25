-- Limpiar tablas existentes
DELETE FROM ratings;
DELETE FROM products;
DELETE FROM categories;

-- Insertar categorías
INSERT INTO categories (id, name, created_at, updated_at) VALUES
(1, 'Cupcakes', NOW(), NOW()),
(2, 'Tortas', NOW(), NOW()),
(3, 'Postres', NOW(), NOW()),
(4, 'Galletas', NOW(), NOW());

-- Insertar productos
INSERT INTO products (
  name, 
  description, 
  price, 
  image_url, 
  featured, 
  category_id, 
  is_available,
  created_at, 
  updated_at
) VALUES
-- Cupcakes
(
  'Cupcakes Unicornio',
  'Deliciosos cupcakes decorados con motivos de unicornio, perfectos para fiestas infantiles. Incluye detalles en colores pastel y un hermoso cuerno de unicornio.',
  15000,
  'https://example.com/images/cupcake-unicornio.jpg',
  true,
  1,
  true,
  NOW(),
  NOW()
),
(
  'Cupcakes Red Velvet',
  'Clásicos cupcakes red velvet con su característico color rojo y delicioso frosting de queso crema.',
  12000,
  'https://example.com/images/cupcake-redvelvet.jpg',
  false,
  1,
  true,
  NOW(),
  NOW()
),

-- Tortas
(
  'Torta de Chocolate',
  'Exquisita torta de chocolate con tres capas, rellena de ganache de chocolate y decorada con flores de chocolate.',
  45000,
  'https://example.com/images/torta-chocolate.jpg',
  true,
  2,
  true,
  NOW(),
  NOW()
),
(
  'Torta de Frutillas',
  'Suave bizcocho de vainilla relleno con crema y frutillas frescas, decorado con más frutillas y chocolate blanco.',
  42000,
  'https://example.com/images/torta-frutilla.jpg',
  false,
  2,
  true,
  NOW(),
  NOW()
),

-- Postres
(
  'Tiramisú Italiano',
  'Auténtico tiramisú italiano preparado con mascarpone, café espresso y bizcochos savoiardi.',
  25000,
  'https://example.com/images/tiramisu.jpg',
  true,
  3,
  true,
  NOW(),
  NOW()
),
(
  'Cheesecake de Frutos Rojos',
  'Cremoso cheesecake horneado sobre base de galletas, cubierto con salsa de frutos rojos frescos.',
  28000,
  'https://example.com/images/cheesecake.jpg',
  false,
  3,
  true,
  NOW(),
  NOW()
),

-- Galletas
(
  'Galletas de Mantequilla',
  'Delicadas galletas de mantequilla decoradas con glaseado real, perfectas para cualquier ocasión.',
  12000,
  'https://example.com/images/galletas-mantequilla.jpg',
  true,
  4,
  true,
  NOW(),
  NOW()
),
(
  'Cookies con Chips de Chocolate',
  'Clásicas cookies americanas con abundantes chips de chocolate, crocantes por fuera y suaves por dentro.',
  15000,
  'https://example.com/images/cookies-chocolate.jpg',
  false,
  4,
  true,
  NOW(),
  NOW()
);

-- Insertar ratings
INSERT INTO ratings (rating, comment, product_id, created_at, updated_at) VALUES
-- Ratings para Cupcakes Unicornio
(5, '¡Perfectos para la fiesta de mi hija! Los niños quedaron encantados', 1, NOW(), NOW()),
(5, 'Hermosos y deliciosos, excelente presentación', 1, NOW(), NOW()),
(4, 'Muy buenos aunque un poco dulces para mi gusto', 1, NOW(), NOW()),

-- Ratings para Torta de Chocolate
(5, 'La mejor torta de chocolate que he probado', 3, NOW(), NOW()),
(5, 'Excelente sabor y presentación, perfecta para mi cumpleaños', 3, NOW(), NOW()),
(4, 'Muy rica, aunque el tamaño podría ser un poco más grande', 3, NOW(), NOW()),

-- Ratings para Tiramisú
(5, 'Auténtico sabor italiano, me recordó a Roma', 5, NOW(), NOW()),
(4, 'Muy bueno, el café podría ser un poco más intenso', 5, NOW(), NOW()),

-- Ratings para Galletas de Mantequilla
(5, 'Perfectas para el té, muy delicadas y sabrosas', 7, NOW(), NOW()),
(5, 'La decoración es hermosa y el sabor exquisito', 7, NOW(), NOW()),
(4, 'Buena textura y sabor, un poco caras', 7, NOW(), NOW()); 