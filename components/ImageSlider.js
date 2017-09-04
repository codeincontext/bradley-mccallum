import Image from '~/components/Image';
import Container from '~/components/Container';

const ImageSlider = ({ item }) => (
  <Container>
    <div>{item.items.map(image => <Image image={image} />)}</div>
  </Container>
);

export default ImageSlider;
