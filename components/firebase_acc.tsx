// src/hooks/useESP32.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "./firebase_configs";

export const useESP32 = (path: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const writeData = useCallback(
    async (value: any) => {
      try {
        const dataRef = ref(db, path);
        await set(dataRef, value);
      } catch (err: any) {
        console.error("Firebase Write Error:", err.message);
      }
    },
    [path],
  );

  useEffect(() => {
    let unsubscribe: () => void;

    // 1. Auth Handshake
    signInWithEmailAndPassword(auth, "test@gmail.com", "kosuru")
      .then(() => {
        // 2. Attach Listener
        const dataRef = ref(db, path);
        unsubscribe = onValue(
          dataRef,
          (snapshot) => {
            setData(snapshot.val());
            setLoading(false);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          },
        );
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // 3. Cleanup: Stop listening if the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [path]);

  return { data, loading, error, writeData };
};
