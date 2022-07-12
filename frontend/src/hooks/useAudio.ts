import { FC, useState } from "react";
import { Howl, Howler } from "howler";

export const useAudio = () => {
  const [sound, setSound] = useState<Howl>();

  const playAudio = (audioSrc: string) => {
    const sound = new Howl({
      src: [audioSrc],
    });
    setSound(sound);
    sound.play();
  };
  return { playAudio, sound };
};
