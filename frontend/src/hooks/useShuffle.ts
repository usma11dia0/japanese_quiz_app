import { useState } from "react";

export const useShuffle = <T>() => {
  const [orderedArrayObject, setOrderedArrayObject] = useState<T>();

  const setArrayObjectShuffle = <T>(
    arrayObject: T extends Array<T> ? any : any
  ) => {
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
  return { orderedArrayObject, setArrayObjectShuffle };
};
