import React from "react";
import Paragraph from "~/components/Paragraph";
import Subheading from "~/components/Subheading";
import Callout from "~/components/Callout";
import Embed from "~/components/Embed";
import SingleImage from "~/components/SingleImage";
import StickyImage from "~/components/StickyImage";
import ImageBanner from "~/components/ImageBanner";
import ImageSlider from "~/components/ImageSlider";
import ImageGrid from "~/components/ImageGrid";

const componentMap = {
  paragraph: Paragraph,
  subheading: Subheading,
  callout: Callout,
  embed: Embed,
  singleImage: SingleImage,
  stickyImage: StickyImage,
  imageBanner: ImageBanner,
  imageSlider: ImageSlider,
  imageGrid: ImageGrid,
};

export default ({ item }) => {
  const contentType = item.sys.contentType.sys.id;
  const component = componentMap[contentType];
  return React.createElement(component, { item: item.fields });
};
