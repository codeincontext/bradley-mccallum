import Container from '~/components/Container';
import RichText from '~/components/RichText';

export default ({ item }) => (
  <Container>
    <p>
      <RichText text={item.text} />
    </p>
    <style jsx>{`
      p {
        line-height: 24px;
      }
      // TODO
    `}</style>
  </Container>
);
