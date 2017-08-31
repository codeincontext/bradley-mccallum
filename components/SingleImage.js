import Image from '~/components/Image';
import Container from '~/components/Container';
import RichText from '~/components/RichText';

export default ({ item }) => (
  <Container>
    <Image image={item.image.url} />
    <p>
      <RichText text={item.caption} />
    </p>
  </Container>
);
