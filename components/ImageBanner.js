import Image from "~/components/Image";

export default ({ item }) =>
  <div>
    {item.images.map(image => <Image image={image} />)}
  </div>;
