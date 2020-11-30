import ReactAudioPlayer from "react-audio-player";

import React from "react";

interface Props {
  link: string;
}

const SongAudio = (props: Props) => {
  return (
    <ReactAudioPlayer
      src={props.link}
      controls
      style={{
        width: "100%",
      }}
    />
  );
};

export default SongAudio;
