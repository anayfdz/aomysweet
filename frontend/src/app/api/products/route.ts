import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        ratings:ratings(*)
      `);

    if (error) throw error;

    const productsWithAverageRating = products.map((product) => {
      const ratings = product.ratings;
      const averageRating = ratings.length > 0
        ? ratings.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0) / ratings.length
        : 0;

      return {
        ...product,
        rating: {
          average: averageRating,
          count: ratings.length
        }
      };
    });

    return NextResponse.json(productsWithAverageRating);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data: product, error } = await supabase
      .from('products')
      .insert([{
        name: body.name,
        description: body.description,
        price: body.price,
        image_url: body.imageUrl,
        featured: body.featured,
        category_id: body.categoryId,
      }])
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) throw error;

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    );
  }
} 