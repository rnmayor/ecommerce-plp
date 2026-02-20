import { jsonRepository } from 'features/products/repositories/json-repository';
import { ProductQuerySchema } from 'features/products/schemas/product-query-schema';
import { getProducts } from 'features/products/services/product-service';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  try {
    const queryObject = Object.fromEntries(req.nextUrl.searchParams);
    const parsedQuery = ProductQuerySchema.parse(queryObject);

    const data = await getProducts(parsedQuery, jsonRepository());

    return NextResponse.json(data, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: 'Invalid query parameters',
          errors: z.flattenError(error).fieldErrors,
        },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === 'DATA_INTEGRITY_ERROR') {
      return NextResponse.json({ message: 'Data Integrity Error' }, { status: 500 });
    }

    return NextResponse.json({ message: 'An unexpected error occured' }, { status: 500 });
  }
}
