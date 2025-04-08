import axios from "axios";
import { TGetImage } from "../types/image";

const getConfigure = () => {
  const token =
    window.sessionStorage.getItem("accessToken") || "rE_M6Kmix3p7mqOLaXAe";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getImageList = async (): Promise<TGetImage[]> => {
  const res = await axios.get(
    "https://sol2-api.esls.io/editor/image/T1",
    getConfigure()
  );

  return res.data.list;
};
