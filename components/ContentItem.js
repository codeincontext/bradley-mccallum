import React from 'react';
import Paragraph from '~/components/Paragraph';
import Subheading from '~/components/Subheading';
import Callout from '~/components/Callout';
import Embed from '~/components/Embed';
import SingleImage from '~/components/SingleImage';
import ImageBanner from '~/components/ImageBanner';
import ImageSlider from '~/components/ImageSlider';
import ImageGrid from '~/components/ImageGrid';
import Divider from '~/components/Divider';
import Audio from '~/components/Audio';

const componentMap = {
  text: Paragraph,
  heading: Subheading,
  callout: Callout,
  image: SingleImage,
  embed: Embed,
  image_banner: ImageBanner,
  image_grid: ImageGrid,
  image_carousel: ImageSlider,
  divider: Divider,
  audio: Audio,
};

const ContentItem = ({ item }) => {
  const component = componentMap[item.slice_type];
  if (!component) {
    return null;
  }

  return React.createElement(component, {
    item: { ...item.primary, items: item.items },
  });
};

export default ContentItem;
