import { RichText } from 'prismic-dom';
import Link from 'next/link';
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

const MaybeLink = ({ link, linkProps, children }) => {
  if (!link || !link.url) {
    return <span>{children}</span>;
  }
  return (
    <Link href={link.url}>
      <a target="_blank" rel="noopener">
        <span>{children}</span>
      </a>
    </Link>
  );
};

const PressItem = ({ item: { author, title, link, publication, date } }) => (
  <YearListingItem>
    {author}, &ldquo;<MaybeLink link={link}>{title},</MaybeLink>&rdquo;{' '}
    {RichText.asText(publication)}, {formatDate(date)}
  </YearListingItem>
);

export default PressItem;
