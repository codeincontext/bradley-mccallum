import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { weights } from '~/components/theme';

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

export default ({ item: { author, title, link, publication, date } }) => (
  <li>
    {author}, &ldquo;<Link href={link ? link.url : undefined}>
      <a>{title},</a>
    </Link>&rdquo; {RichText.asText(publication)}, {formatDate(date)}
    <style jsx>{`
      li {
        list-style: none;
      }
      a {
        font-weight: ${weights.bold};
        text-decoration: underline;
        text-decoration-skip: ink;
      }
    `}</style>
  </li>
);
