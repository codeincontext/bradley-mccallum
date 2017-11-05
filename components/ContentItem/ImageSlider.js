import cx from 'classnames';

import Image from '~/components/Image';
import Container from '~/components/Container';
import Carousel from '~/components/Carousel';
import Caption from '~/components/Caption';
import { CONTENT_ITEM_SPACING } from '~/lib/theme';

const Item = ({ image }) => {
  const ratio = image.dimensions.width / image.dimensions.height;
  const portrait = ratio < 1;

  return (
    <div className="root">
      <div className={cx('item', { portrait })}>
        <Image key={image.url} image={image} />
      </div>

      <style jsx>{`
        .root {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .item {
          width: 100%;
        }
        .item.portrait {
          width: 50%;
        }
      `}</style>
    </div>
  );
};

export default class ImageSlider extends React.Component {
  state = { selectedIndex: 0 };

  handleIndexChange = (id, item) => {
    this.setState({ selectedIndex: id });
  };

  render() {
    const items = this.props.item.items.filter(({ image }) => image.url);
    const { selectedIndex } = this.state;

    if (!items.length) {
      return null;
    }
    return (
      <Container>
        <div className="root">
          <Carousel
            onChange={this.handleIndexChange}
            selectedIndex={selectedIndex}
          >
            {items
              .filter(item => item.image.url)
              .map(({ image }) => <Item image={image} key={image.url} />)}
          </Carousel>

          <Caption>{items[selectedIndex].caption}</Caption>
        </div>

        <style jsx>{`
          .root {
            margin-bottom: ${CONTENT_ITEM_SPACING};
          }
        `}</style>
      </Container>
    );
  }
}
