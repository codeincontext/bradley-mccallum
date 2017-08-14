import Container from "~/components/Container";
import PrismicDom from "prismic-dom";

export default ({ item }) =>
  <Container>
    <h3>
      {PrismicDom.RichText.asText(item.text)}
    </h3>
  </Container>;
