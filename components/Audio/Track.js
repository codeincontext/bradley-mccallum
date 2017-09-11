import { colors } from '~/lib/theme';

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

const Track = ({ buffered, filled, defaultFill, onChange, label }) => (
  <div className="root">
    <div className="track">
      {buffered && (
        <div className="buffer" style={{ width: `${buffered * 100 || 0}%` }} />
      )}
      <div className="fill" style={{ width: `${filled * 100 || 0}%` }} />
      <input
        min="0"
        step="any"
        max="1"
        type="range"
        orient="horizontal"
        onChange={onChange}
        aria-label={label}
        value={filled || defaultFill}
      />
    </div>

    <style jsx>{`
      .root {
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
      }

      .track {
        width: 100%;
        height: 100%;
        position: relative;
        background: ${colors.lightGrey};
      }

      .buffer,
      .fill,
      input {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }

      .buffer {
        background: ${colors.white};
        transition: width 0.5s;
      }

      .fill {
        background: ${colors.black};
        transition: width 0.5s;
      }

      input {
        width: 100%;
        opacity: 0;
        cursor: pointer;
        margin: 0;
      }

      input[type='range']::-webkit-slider-thumb {
        pointer-events: none;
      }
    `}</style>
  </div>
);

export default Track;
