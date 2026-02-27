import { productModule } from 'features/products/module';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await productModule.getProductById(id);

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'PRODUCT_NOT_FOUND') {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    if (error instanceof Error && error.message === 'DATA_INTEGRITY_ERROR') {
      return NextResponse.json({ message: 'Data Integrity Error' }, { status: 500 });
    }
    return NextResponse.json({ message: 'An unexpected error occured' }, { status: 500 });
  }
}
