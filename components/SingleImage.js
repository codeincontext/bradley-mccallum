import Image from "~/components/Image";
import Container from "~/components/Container";

export default ({ item }) =>
  <Container>
    <Image image={item.image} />
    <p>
      {item.caption}
    </p>
  </Container>;
