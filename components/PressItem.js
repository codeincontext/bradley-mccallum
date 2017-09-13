import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { weights } from '~/lib/theme';
import YearListingItem from '~/components/YearListingItem';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function formatDate(date) {
  const d = new Date(date);
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

const PressItem = ({ item: { author, title, link, publication, date } }) => (
  <YearListingItem>
    {author}, &ldquo;<Link href={link ? link.url : undefined}>
      <a>{title},</a>
    </Link>&rdquo; {RichText.asText(publication)}, {formatDate(date)}
  </YearListingItem>
);

export default PressItem;
