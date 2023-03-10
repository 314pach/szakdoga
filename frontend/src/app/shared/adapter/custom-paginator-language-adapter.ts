import { MatPaginatorIntl } from '@angular/material/paginator';

const hungarianRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) { return `0 / ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} / ${length}`;
}
export function getHungarianPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Elemek oldalanként:';
  paginatorIntl.nextPageLabel = 'Következő';
  paginatorIntl.previousPageLabel = 'Előző';
  paginatorIntl.firstPageLabel = 'Első oldal';
  paginatorIntl.lastPageLabel = 'Utolsó oldal';
  paginatorIntl.getRangeLabel = hungarianRangeLabel;

  return paginatorIntl;
}
