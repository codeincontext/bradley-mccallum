import React from 'react';
import Paragraph from './Paragraph';
import Subheading from './Subheading';
import Callout from './Callout';
import Embed from './Embed';
import SingleImage from './SingleImage';
import ImageBanner from './ImageBanner';
import ImageSlider from './ImageSlider';
import ImageGrid from './ImageGrid';
import Divider from './Divider';
import Audio from './Audio';

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
