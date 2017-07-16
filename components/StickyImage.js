import Image from "~/components/Image";

export default ({ item }) =>
  <div>
    <Image image={item.image} />
    <p>
      {item.description}
    </p>
  </div>;
