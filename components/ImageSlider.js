import Image from "~/components/Image";
import Container from "~/components/Container";

export default ({ item }) =>
  <Container>
    <div>
      {item.images.map(image => <Image image={image} />)}
    </div>
  </Container>;
