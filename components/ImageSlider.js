import Image from "~/components/Image";
import Container from "~/components/Container";

export default ({ item }) =>
  <Container>
    <div>
      {item.items.map(image => <Image image={image} />)}
    </div>
  </Container>;
