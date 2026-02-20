import { jsonRepository } from 'features/products/repositories/json-repository';
import { getProductById } from 'features/products/services/product-service';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await getProductById(id, jsonRepository());

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'PRODUCT_NOT_FOUND') {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Data Integrity Error' }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unexpected error occured' }, { status: 500 });
  }
}
