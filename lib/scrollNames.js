const thisYear = new Date().getFullYear();
export const YEARS = [thisYear, 2015, 2010, 2005, 2000, 1995, 1990];

export const scrollNameForYear = year => `year-${year}`;

export const scrollNameForProject = project => {
  const year = new Date(project.date).getFullYear();
  const closestYear = YEARS.find(y => y <= year);
  return scrollNameForYear(closestYear);
};

export const scrollNameForExhibitionId = id => `exhibition-${id}`;
