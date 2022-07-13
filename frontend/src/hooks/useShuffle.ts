import { useState } from "react";

export const useShuffle = () => {
  const [orderedArrayObject, setOrderedArrayObject] = useState<{}[]>();

  const arrayObjectShuffle = (arrayObject: {}[]) => {
    if (orderedArrayObject === undefined) {
      for (let i = arrayObject.length - 1; 0 < i; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        var tmp = arrayObject[i];
        arrayObject[i] = arrayObject[r];
        arrayObject[r] = tmp;
      }
      setOrderedArrayObject(arrayObject);
    }
  };
  return { arrayObjectShuffle, orderedArrayObject };
};
