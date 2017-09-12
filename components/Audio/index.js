import videoConnect from 'react-html5video';
import Container from '~/components/Container';
import { colors, fonts, weights } from '~/lib/theme';
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
      item: { file },
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
        <div className="audio">
          <video src={`${file.url}?q=${this.cacheBuster}`} className="video" />
          <button
            className="playPause"
            onClick={onPlayPauseClick}
            aria-label={paused ? 'Play audio' : 'Pause audio'}
            type="button"
          >
            {paused ? '|>' : '||'}
          </button>

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
            className="volumeButton"
            onClick={onVolumeClick}
            type="button"
          >
            {volume <= 0 ? '<\\' : '<'}
          </button>

          <div className="volume">
            <Track
              filled={volume}
              onChange={onVolumeChange}
              label="Set volume"
              defaultFill={1}
            />
          </div>

          <style jsx>{`
            .audio {
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
            }

            .seek {
              margin-left: 15px;
              flex-grow: 1;
            }

            .timeRemaining {
              margin-left: 20px;
              font-size: ${fonts.f12}
              font-weight: ${weights.bold};
              // Element looks too high as there are no descenders
              transform: translateY(.05em);
            }

            .volumeButton {
              margin-left: 45px;
              width: 34px;
              height: 34px;
            }

            .volume {
              width: 48px;
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
