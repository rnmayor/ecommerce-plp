export function sortItems<T>(items: T[], field?: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  if (!field) return items;

  return [...items].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;

    // Handle different data types (Strings, Numbers, Dates)
    if (typeof valA === 'string' && typeof valB === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;

    return 0;
  });
}
