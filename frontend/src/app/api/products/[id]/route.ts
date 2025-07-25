import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        ratings:ratings(*)
      `)
      .eq('id', parseInt(params.id))
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    const ratings = product.ratings;
    const averageRating = ratings.length > 0
      ? ratings.reduce((acc: number, curr: { rating: number }) => acc + curr.rating, 0) / ratings.length
      : 0;

    const productWithRating = {
      ...product,
      rating: {
        average: averageRating,
        count: ratings.length
      }
    };

    return NextResponse.json(productWithRating);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
} 