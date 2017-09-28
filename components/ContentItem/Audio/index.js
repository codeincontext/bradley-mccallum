import videoConnect from 'react-html5video';
import cx from 'classnames';

import Container from '~/components/Container';
import Caption from '~/components/Caption';
import { colors, fonts, weights, CONTENT_ITEM_SPACING } from '~/lib/theme';
import {
  setVolume,
  showTrack,
  toggleTracks,
  toggleMute,
  togglePause,
  setCurrentTime,
  toggleFullscreen,
  getPercentagePlayed,
  getPercentageBuffered,
} from './api';
import Track from './Track';

const formatTime = seconds => {
  const date = new Date(Date.UTC(1970, 1, 1, 0, 0, 0, 0));
  seconds = isNaN(seconds) || seconds > 3600 ? 0 : Math.floor(seconds);
  date.setSeconds(seconds);
  const secondsText = date
    .getSeconds()
    .toString()
    .padStart(2, '0');
  return `${date.getMinutes()}:${secondsText}`;
};

class Audio extends React.Component {
  // This seems to fix a problem loading from cache in Chrome
  cacheBuster = Math.random();

  render() {
    const {
      item: { file, caption },
      video: {
        paused,
        duration,
        percentageBuffered,
        percentagePlayed,
        volume,
        currentTime,
      },
      onVolumeClick,
      onPlayPauseClick,
      onVolumeChange,
      onSeekChange,
    } = this.props;

    return (
      <Container>
        <div className="root">
          <div className="player">
            <video
              src={`${file.url}?q=${this.cacheBuster}`}
              className="video"
            />
            <button
              className="playPause"
              onClick={onPlayPauseClick}
              aria-label={paused ? 'Play audio' : 'Pause audio'}
              type="button"
            />

            <div className="seek">
              <Track
                buffered={percentageBuffered}
                filled={percentagePlayed}
                onChange={onSeekChange}
                defaultFill={0}
                label="Seek audio"
              />
            </div>

            <span className="timeRemaining">
              {formatTime(duration - currentTime)}
            </span>

            <button
              aria-label={volume <= 0 ? 'Unmute audio' : 'Mute audio'}
              className={cx('volumeButton', { muted: volume <= 0 })}
              onClick={onVolumeClick}
              type="button"
            />

            <div className="volume">
              <Track
                filled={volume}
                onChange={onVolumeChange}
                label="Set volume"
                defaultFill={1}
              />
            </div>
          </div>

          <Caption>{caption}</Caption>

          <style jsx>{`
            .root {
              margin-bottom: ${CONTENT_ITEM_SPACING};
            }

            .player {
              width: 100%;
              height: 50px;
              background-color: ${colors.midGrey};
              border-radius: 4px;
              display: flex;
              align-items: center;
            }

            .video {
              height: 0;
              width: 0;
            }

            button {
              background: none;
              border: 0;
              line-height: normal;
              overflow: visible;
              padding: 0;
              cursor: pointer;
            }

            button:focus {
              outline: 0;
            }

            .playPause {
              margin-left: 20px;
              background-image: url('/static/components/ContentItem/Audio/play.svg');
              background-repeat: no-repeat;
              background-size: contain;
              width: 17px;
              height: 19px;
            }

            .seek {
              margin-left: 15px;
              flex-grow: 1;
            }

            .timeRemaining {
              margin-left: 20px;
              font-size: ${fonts.f12};
              font-weight: ${weights.bold};
              // Element looks too high as there are no descenders
              transform: translateY(0.05em);
            }

            .volumeButton {
              margin-left: 42px;
              width: 12px;
              height: 14px;
              background-image: url('/static/components/ContentItem/Audio/volume.svg');
              background-repeat: no-repeat;
              background-size: contain;
            }
            .volumeButton.muted {
              opacity: 0.75;
            }

            .volume {
              width: 48px;
              margin-left: 6px;
              margin-right: 20px;
            }
          `}</style>
        </div>
      </Container>
    );
  }
}

export default videoConnect(
  Audio,
  ({ networkState, readyState, error, volume, muted, ...restState }) => ({
    video: {
      readyState,
      networkState,
      error: error || networkState === 3,
      loading: readyState < 4,
      percentagePlayed: getPercentagePlayed(restState),
      percentageBuffered: getPercentageBuffered(restState),
      volume: muted ? 0 : volume,
      ...restState,
    },
  }),
  (videoEl, state) => ({
    onVolumeClick: () => toggleMute(videoEl, state),
    onPlayPauseClick: () => togglePause(videoEl, state),
    onVolumeChange: e => setVolume(videoEl, state, e.target.value),
    onSeekChange: e =>
      setCurrentTime(videoEl, state, e.target.value * state.duration),
  })
);
