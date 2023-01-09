import React from "react";
import styles from "./.module.sass";
import { BiPlay, BiPause } from "react-icons/bi";
import { playPauseTrack } from "../../redux/actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;
const mapDispatchToProps = { playPauseTrack };

function PlayPauseBtn({
  isPlaying,
  uri,
  size,
  playPauseTrack,
  token,
  deviceID,
  spotifyPlayer,
  offset,
}) {
  if (token && deviceID && uri)
    return (
      <button
        style={{ minHeight: `${size}px`, minWidth: `${size}px` }}
        onClick={() => {
          spotifyPlayer?.context?.uri === uri
            ? isPlaying
              ? spotifyPlayer?.player?.pause()
              : !offset
              ? spotifyPlayer?.player?.resume()
              : playPauseTrack(deviceID, token, uri, offset - 1)
            : playPauseTrack(deviceID, token, uri, 0);
        }}
        className={`${styles.play_pause_track_btn} ${
          isPlaying ? styles.isPlaying : null
        }`}
      >
        {isPlaying ? <BiPause /> : <BiPlay />}
      </button>
    );
  return <></>;
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseBtn);
