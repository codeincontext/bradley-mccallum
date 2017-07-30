export default ({ items }) =>
  <div>
    <ul>
      {items.map(item =>
        <li key={item.label}>
          {item.label}
        </li>
      )}
    </ul>

    <style jsx>{`
      ul {
        margin: 0;
        padding: 0;
      }
      li {
        list-style: none;
      }
    `}</style>
  </div>;
