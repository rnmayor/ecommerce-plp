# Product Listings Page (PLP) - Technical Implementation

## Objective:

- Create a mini e-commerce web application focused solely on building a high-quality
  Product Listing Page (PLP) showcasing products with images, names and vital product
  information.

## Summary:

- This project delivers a high-quality Product Listing Page (PLP) using Next.js and Typescript. We adjusted our initial plan to leverage the native pagination and filtering capabilities of DummyJson API to optimize performance and ensure URL state synchronization.

## Decisions and Improvements

A. Data Fetching

- Initial Plan/Implementation:
  - Download all 1,000 products (`/products?limit=1000`) and perform filtering/sorting/pagination in the application(service) layer.

- Actual Implementation:
  - Utilized API-level `limit` and `skip` parameters to leverage its native pagination and filtering capabilities.
  - `Repository` fetches the data, and the `Service` handles the sorting and provides necessary details for pagination to be consumed by the frontend.

```
/products?limit=30&skip=0
findAll(params?: { limit?: number; skip?: number }): Promise<RawProductListResponse>;

/products/1
findById(id: string): Promise<Product>;

/products/search?q={query}&limit=30&skip=0
search(q: string, params?: { limit?: number; skip?: number }): Promise<RawProductListResponse>;

/products/category/{category}?limit=30&skip=0
findByCategory(
  category: string,
  params?: { limit?: number; skip?: number },
): Promise<RawProductListResponse>;
```

- Output: Prevents 'long-running query' minimizing client-side memory usage that degrades performance.

B. Filtering

- Initial Plan/Implementation:
  - Support combined search and multiple category filters.

- Actual Implementation:
  - To sync with the DummyJson API's support for search and category filtering, we make the "Search" and "Category" filters to work one at a time. Choosing a category will clear your search, and typing a search will clear the category.

- Output: Ensures users always get accurate, validated results directly from the DummyJson API.

C. Layered Architecture

- Initial Plan/Implementation:

```
App Router (Server Components) -> API Route (api/products) -> Product Service -> Repository -> Json Data
```

- Actual Implementation:
  - Leverage Next.js capability to call the `getProducts` service directly within the server component through a "Feature Action" wrapper, which encapsulates the service logic.

```
App Router (Server Components) -> Feature Action (Wrapper) -> Product Service -> Repository -> Json Data
```

- Output:
  - We eliminated the internal HTTP overhead and network hops, while still keeping the API routes available for external/client-side use.

D. User Experience

- Initial Plan/Implementation:
  - While doing update in the URL for each action in the category, search, sorting and pagination, we are using `router.push()` to update the URL. This adds new entry to your browser's "Back" button history.

- Actual Implementation:
  - Switched to `router.replace()` to swap the current URL without cluttering the browser's history.
  - Wrapped URL update in the `startTransition()`, a "background worker" that marks the URL change as "low priority" update - telling React to process the change in the background so it can handle the heavy lifting of navigation without interrupting the user's current actions.
  - Used `isPending` to provide visual feedback (using loaders) while the "Server Component" is re-rendering the background data.

- Output: Keeps the user's experience seamless and non-blocking.

## Technical Highlights

1. Domain-Driven Layered Architecture: We implemented strict "Layered Architecture" (Repository -> Service -> Action/Route). This separates the data-fetching logic (Repository) from the business rule (Service), making the codebase highly maintainable, testable, and independent of the external API's structure.

2. Modular Package-Feature Architecture: Organized the codebase that separates the shared logic into "Packages" (core and ui) and domain-specific logic into "Features". Utilize a "feature-slice" approach within the application, ensuring that all components, hooks, schemas, and logic related to a specific feature domain stays together. This ensures the code is highly discoverable and decoupled from core business logic and allows consistent design language while keeping the app easy to scale and maintain.

3. URL-Driven State Management: Url is the single source of truth. This can ensure users can share links, bookmark results, and use the browser's back/forward buttons seamlessly.

4. Zod Schema Validation: We synchronized our query and API response with the DummyJson API to fetch only what the user is currently viewing. We added `Zod` as "data gatekeeper" to automatically verify that the information we receive is correct and safe, preventing unexpected crashes caused by messy or missing data.

5. Advance Concurrent UI: Leveraged "Concurrent React features" like `useTransition()` and `isPending`. This allows the application to remain interactive during heavy data revalidation and provides immediate visual feedback through synchronized "Loading States", ensuring the UI never feels "stuck" during server-side transitions.

6. Error and Boundary Handling: Utilized "Next.js File-Based Metadata" (error.tsx, loading.tsx, not-found.tsx) to provide resilient user experience. This handles network failures and empty states at the framework level ensuring users are never left with a blank screen.
