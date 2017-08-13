import Container from "~/components/Container";

export default ({ item }) =>
  <Container>
    <p>
      {item.text}
    </p>
    <style jsx>{`
      p {
        line-height: 24px;
      }
    `}</style>
  </Container>;
