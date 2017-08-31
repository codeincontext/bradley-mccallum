import groupBy from 'lodash.groupby';

export function groupByYear(items) {
  const grouped = groupBy(items, item => new Date(item.date).getFullYear());
  const asTuples = Object.entries(grouped);
  return asTuples.sort(([year1], [year2]) => year2 - year1);
}
