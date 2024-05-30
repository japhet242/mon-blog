import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { Dispatch, SetStateAction } from "react";

export function UploadComponent({urlimage}:{urlimage:Dispatch<SetStateAction<string |undefined>>}) {
    
    return(
        <UploadDropzone
        endpoint="imageUploader"
        appearance={{
          button:{color:"blue"}
        }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          urlimage(res[0].url)
          console.log("Files: ", res);
          console.log(res?.[0].url)
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

    )
}