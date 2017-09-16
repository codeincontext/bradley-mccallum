import Container from '~/components/Container';

const Embed = ({ item: { embed } }) => (
  <Container>
    <div dangerouslySetInnerHTML={{ __html: embed.html }} />

    <style jsx>{`
        div > :global(*) {
          width: 100%;
        }
      `}</style>
  </Container>
  );

export default Embed;
