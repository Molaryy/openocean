import { useMutation } from "@tanstack/react-query";
import { constants } from "../constants";
import axios from "axios";

const usePinFileToIPFS = () => {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "pinataMetadata",
        JSON.stringify({
          name: file.name,
        })
      );
      formData.append(
        "pinataOptions",
        JSON.stringify({
          cidVersion: 0,
        })
      );
      return axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: Infinity,
          headers: {
            "Content-Type": `multipart/form-data`,
            Authorization: `Bearer ${constants.pinataAPIKey}`,
          },
        }
      );
    },
  });
};

export default usePinFileToIPFS;
