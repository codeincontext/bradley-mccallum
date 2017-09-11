// Taken from https://github.com/mderrick/react-html5video/blob/master/src/video/api.js
/**
 * These are custom helper methods that are not native
 * to the HTMLMediaElement API. Pass in the native
 * Video element, state and optional desired value to
 * set. To be primarily used in `mapVideoElToProps`.
 */
export const togglePause = (videoEl, { paused }) => {
  if (paused) {
    videoEl.play();
  } else {
    videoEl.pause();
  }
};

export const setCurrentTime = (videoEl, state, value) => {
  videoEl.currentTime = value;
};

export const setVolume = (videoEl, state, value) => {
  videoEl.muted = false;
  videoEl.volume = value;
};

export const toggleMute = (videoEl, { volume, muted }) => {
  if (muted || volume <= 0) {
    if (volume <= 0) {
      videoEl.volume = 1;
    }
    videoEl.muted = false;
  } else {
    videoEl.muted = true;
  }
};

/**
 * Custom getter methods that are commonly used
 * across video layouts. To be primarily used in
 * `mapStateToProps`
 */
export const getPercentageBuffered = ({ buffered, duration }) =>
  (buffered &&
    buffered.length &&
    buffered.end(buffered.length - 1) / duration) ||
  0;

export const getPercentagePlayed = ({ currentTime, duration }) =>
  currentTime / duration;
