export function paginate<T>(items: T[], page: number = 1, limit: number = 10) {
  // Guard against invalid inputs
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  const total = items.length;
  const totalPages = Math.ceil(total / safeLimit);
  const skip = (safePage - 1) * safeLimit;

  return {
    items: items.slice(skip, skip + safeLimit),
    total,
    page: safePage,
    limit: safeLimit,
    skip,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}
