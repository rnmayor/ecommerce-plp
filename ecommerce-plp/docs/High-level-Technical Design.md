# Product Listings Page (PLP) - High Level Design

## Objective:

- Create a mini e-commerce web application focused solely on building a high-quality
  Product Listing Page (PLP) showcasing products with images, names and vital product
  information.

### Requirements:

1. You must use Next JS & Typescript in creating this project.
2. Your project should have the following functionalities:

   a. Filter

   b. Sort

   c. Search

3. Your project should use routing navigation.
4. Product data must be fetched on the server side using Next js server components.

### Endpoints for reference:

```
https://dummyjson.com/products
https://dummyjson.com/products/1
https://dummyjson.com/products/search?q=phone
https://dummyjson.com/products/category/smartphones
```

### Sample data

```
{
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 10.48,
      "rating": 2.56,
      "stock": 99,
      "tags": [
        "beauty",
        "mascara"
      ],
      "brand": "Essence",
      "sku": "BEA-ESS-ESS-001",
      "weight": 4,
      "dimensions": {
        "width": 15.14,
        "height": 13.08,
        "depth": 22.99
      },
      "warrantyInformation": "1 week warranty",
      "shippingInformation": "Ships in 3-5 business days",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 3,
          "comment": "Would not recommend!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Collins",
          "reviewerEmail": "eleanor.collins@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Very satisfied!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Lucas Gordon",
          "reviewerEmail": "lucas.gordon@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Highly impressed!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Eleanor Collins",
          "reviewerEmail": "eleanor.collins@x.dummyjson.com"
        }
      ],
      "returnPolicy": "No return policy",
      "minimumOrderQuantity": 48,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "5784719087687",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
    },
    {
      "id": 2,
      "title": "Eyeshadow Palette with Mirror",
      "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      "category": "beauty",
      "price": 19.99,
      "discountPercentage": 18.19,
      "rating": 2.86,
      "stock": 34,
      "tags": [
        "beauty",
        "eyeshadow"
      ],
      "brand": "Glamour Beauty",
      "sku": "BEA-GLA-EYE-002",
      "weight": 9,
      "dimensions": {
        "width": 9.26,
        "height": 22.47,
        "depth": 27.67
      },
      "warrantyInformation": "1 year warranty",
      "shippingInformation": "Ships in 2 weeks",
      "availabilityStatus": "In Stock",
      "reviews": [
        {
          "rating": 5,
          "comment": "Great product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Savannah Gomez",
          "reviewerEmail": "savannah.gomez@x.dummyjson.com"
        },
        {
          "rating": 4,
          "comment": "Awesome product!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Christian Perez",
          "reviewerEmail": "christian.perez@x.dummyjson.com"
        },
        {
          "rating": 1,
          "comment": "Poor quality!",
          "date": "2025-04-30T09:41:02.053Z",
          "reviewerName": "Nicholas Bailey",
          "reviewerEmail": "nicholas.bailey@x.dummyjson.com"
        }
      ],
      "returnPolicy": "7 days return policy",
      "minimumOrderQuantity": 20,
      "meta": {
        "createdAt": "2025-04-30T09:41:02.053Z",
        "updatedAt": "2025-04-30T09:41:02.053Z",
        "barcode": "9170275171413",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp"
      ],
      "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp"
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 2
}
```

## Design Solution:

### UI/UX:

1. Product Listing Page

- Display product cards:
  - Title
  - Description
  - Thumbnail
  - Rating
  - Discount percentage
  - Computed discounted price
  - Availability
- Supports:
  - Search (global search bar)
  - Filter (by category - AirBnb style, can support multiple category)
  - Sort (dropdown with price, rating, availability, etc.)
  - Pagination
- URL-driven state (query parameters as source of truth)

```
/products?search=mascara&category=beauty&sort=price-desc&page=2&limit=30
```

2. Product Details page

- Fetch product by ID
- Display more product details:
  - Warranty
  - Shipping Information
  - SKU
  - Dimensions
  - Reviews
  - Return policy

```
/products/[id]
```

### Layered modular architecture:

```
App Router (Server Components) -> API Route (api/products) -> Product Service -> Repository -> Json Data
```

### API Design

1. `GET PRODUCTS`: /api/products

- Supports combination of:

```
/api/products
/api/products?search=mascara
/api/products?category=beauty,groceries
/api/products?sort=price-desc
/api/products?page=2&limit=30
/api/products?search=mascara&category=beauty&sort=price-desc&page=2&limit=30
```

- Fetch all products from external source
- Apply:
  - Search
  - Category Filter
  - Sort
  - Pagination
- Return normalized response:

```
{
  total: number,
  page: number,
  limit: number,
  skip: number,
  products: Product[]
}
```

- Use Zod for schema validation (query parameters and product payload structure)

2. `GET PRODUCT BY ID`

- Fetch single product
- Used by Product Details page

### NOTES:

- All search, filter, and sort state is encoded in the URL.
- Each interaction in the search bar, category icons, sort dropdown, and pagination controls - updates URL and triggers server fetch
- Fetch all - caching strategy will leverage Next.js built-in caching mechanism
