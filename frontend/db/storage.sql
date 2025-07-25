-- Crear bucket para imágenes de productos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true);

-- Política para permitir acceso público a las imágenes
CREATE POLICY "Acceso público a imágenes de productos"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Política para permitir subida de imágenes (solo para usuarios autenticados)
CREATE POLICY "Permitir subida de imágenes a usuarios autenticados"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
); 