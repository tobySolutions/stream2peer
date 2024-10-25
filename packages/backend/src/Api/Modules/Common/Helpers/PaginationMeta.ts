type PaginationMeta = {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  
export function generatePaginationMeta(
    totalRecords: number,
    currentPage: number,
    pageSize: number
): PaginationMeta {
    const totalPages = Math.ceil(totalRecords / pageSize);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;
  
    return {
      currentPage,
      pageSize,
      totalRecords,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
}
  