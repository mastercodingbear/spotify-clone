import React, { useState, useEffect } from "react";
import styles from "./.module.sass";
import { connect } from "react-redux";
import { AiOutlineHeart } from "react-icons/ai";
import "react-input-range/lib/css/index.css";
import RangeInput from "../RangeInput";
import NextImage from "../NextImage";
import moment from "moment";
import Head from "next/head";
import {
  setDeviceId,
  setSpotifyPlayer,
  getPlayerState,
  playPauseTrack,
} from "../../redux/actions";
import {
  IoIosSkipForward,
  IoIosSkipBackward,
  IoIosShuffle,
} from "react-icons/io";
import { TiArrowLoop } from "react-icons/ti";
import { BiPlay, BiPause } from "react-icons/bi";
import { MdQueueMusic } from "react-icons/md";
import { VscUnmute, VscMute } from "react-icons/vsc";

const mapStateToProps = (state) => state;
const mapDispatchToProps = {
  getPlayerState,
  setDeviceId,
  setSpotifyPlayer,
  playPauseTrack,
};

export const AudioPlayer = ({
  user,
  token,
  setDeviceId,
  setSpotifyPlayer,
  playPauseTrack,
}) => {
  const [player, setPlayer] = useState(null);
  const [playerState, setPlayerState] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);

  //************************************************************//
  // INITIALIZE SPOTIFY SDK PLAYER
  //************************************************************//
  useEffect(() => {
    if (user?.product === "premium" && !player) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "NEXTJS SPOTIFY CLONE",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 1,
        });

        setPlayer(player);

        player?.addListener("ready", ({ device_id }) => {
          setDeviceId(device_id);
          if (device_id) playPauseTrack(device_id, token);
          player?.getCurrentState().then((res) => {
            res ? setPlayerState(res) : setPlayerState(playerState);
            res?.context ? setSpotifyPlayer({ ...res, player }) : null;
          });
          player?.addListener("player_state_changed", (state) => {
            if (state) {
              player?.getCurrentState().then((res) => {
                res ? setPlayerState(res) : setPlayerState(playerState);
                res?.context ? setSpotifyPlayer({ ...res, player }) : null;
              });
            }
          });
        });
        player.connect();
      };
    }

    return () => {
      // player?.pause();
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (
      seconds < playerState?.track_window?.current_track?.duration_ms &&
      !playerState?.paused
    ) {
      timeout = setTimeout(() => {
        setSeconds(seconds + 1000);
      }, 1000);
    }
    if (playerState.paused) clearTimeout(timeout);
    return () => clearTimeout(timeout);
  }, [seconds, playerState]);

  useEffect(() => {
    if (playerState?.position) setSeconds(playerState?.position);
  }, [playerState]);

  useEffect(() => {
    if (player?._options?.volume) setVolume(player?._options?.volume * 100);
  }, [player]);

  useEffect(() => {
    volume && !mute ? player?.setVolume(volume / 100) : player?.setVolume(0);
  }, [volume, mute]);

  return (
    <>
      {playerState && !playerState?.paused ? (
        <Head>
          <title>
            Spotify | {playerState?.track_window?.current_track?.name} •{" "}
            {playerState?.track_window?.current_track?.artists[0]?.name}
          </title>
        </Head>
      ) : null}

      <div className={styles.audio_playback_control_wrapper}>
        <div className={styles._wrapper}>
          <div className={styles.current_track_wrapper}>
            <div className={styles.track_cover}>
              {playerState?.track_window?.current_track?.album?.images[1]
                .url ? (
                <NextImage
                  priority
                  width="45px"
                  height="45px"
                  layout="fixed"
                  alt={playerState?.track_window?.current_track?.name}
                  path={
                    playerState?.track_window?.current_track?.album?.images[1]
                      .url
                  }
                />
              ) : null}
            </div>
            <div className={styles.track_title_artist_col}>
              <p className={styles.track_title}>
                {playerState?.track_window?.current_track?.name}
              </p>
              <span className={styles.track_artist}>
                {playerState?.track_window?.current_track?.artists[0]?.name}
              </span>
            </div>
            <div className={styles.track_user_actions}>
              <button className="d-none d-sm-block">
                <AiOutlineHeart />
              </button>
            </div>
          </div>
        </div>
        <div className={styles._wrapper}>
          <div className={styles.track_progress_control_wrapper}>
            <div className="d-flex mt-2 align-items-center">
              <button
                onClick={() => console.log(playerState)}
                className={`${
                  playerState?.shuffle ? styles.active : null
                } d-none d-sm-block`}
                title={
                  playerState?.shuffle ? "Disable Shuffle" : "Enable Shuffle"
                }
              >
                <IoIosShuffle />
              </button>
              <button
                onClick={() =>
                  seconds > 5000 ? player?.seek(0) : player?.previousTrack()
                }
              >
                <IoIosSkipBackward />
              </button>
              <button
                className={`${styles.play_pause_btn} ${
                  !playerState?.paused ? styles.isPlaying : null
                }`}
                onClick={() => player?.togglePlay()}
              >
                {playerState?.paused ? <BiPlay /> : <BiPause />}
              </button>
              <button onClick={() => player?.nextTrack()}>
                <IoIosSkipForward />
              </button>
              <button className="d-none d-sm-block">
                <TiArrowLoop />
              </button>
            </div>
            <div className="d-md-flex d-none justify-content-center w-100 align-items-center">
              <span className={styles.track_interval}>
                {moment(seconds).format("m:ss")}
              </span>
              <div className="w-100" style={{ maxWidth: "450px" }}>
                <RangeInput
                  maxValue={
                    playerState?.track_window?.current_track?.duration_ms
                  }
                  value={seconds}
                  onChange={setSeconds}
                  onCompleteChange={(value) => {
                    player.seek(value);
                  }}
                />
              </div>
              <span className={styles.track_interval}>
                {moment(
                  playerState?.track_window?.current_track?.duration_ms
                ).format("m:ss")}
              </span>
            </div>
          </div>
        </div>

        <div className={`${styles._wrapper} d-none d-lg-block`}>
          <div className={styles.track_adds_settings}>
            <button>
              <MdQueueMusic />
            </button>
            <button
              onClick={() => {
                setMute(!mute);
              }}
            >
              {!mute ? <VscUnmute /> : <VscMute />}
            </button>
            <div className="d-flex align-items-center">
              <div style={{ width: "100px" }}>
                <RangeInput
                  maxValue={100}
                  step={1}
                  value={volume}
                  onCompleteChange={() => {}}
                  onChange={(value) => {
                    setVolume(value);
                  }}
                />
              </div>
              <span className={styles.volume_level}>{volume}%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
