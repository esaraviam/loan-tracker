"use client"
import {useState} from "react";
import ImageUploading, {ImageListType} from "react-images-uploading";
import Image from "next/image";
import {UploadImage} from "@/lib/loan/actions";


const ImageUploader = () => {
  const [image, setImage] = useState<ImageListType>([]);

  const onImageChange = async (imageList: ImageListType) => {
    setImage(imageList);

    imageList.map(async image => {
      const formData = new FormData();
      formData.append("file", image.file as File);
      formData.append("folderName", "loanApp");
      await UploadImage(formData);
    })
  }
  return (
    <div>
      <ImageUploading
        value={image}
        onChange={onImageChange}
        multiple={true}
        maxFileSize={5000000}
      >
        {({
            imageList,
            onImageUpload,
            isDragging,
            dragProps
          }) => (
          <div>
            {imageList.length === 0 &&
                <button
                    onClick={onImageUpload}
                    {...dragProps}
                    className={`border-2 border-dashed w-full rounded-md text-center py-12 hover:border-main ${isDragging ? "border-main" : "border-gray-300"}`}
                    type="button"
                >
                    <div className={`${isDragging ? "pointer-events-none" : ""}`}>
                        <h6 className="text-base font-medium text-gray-600">Drop your image here, or <span
                            className="text-main">browse</span></h6>
                    </div>
                </button>
            }
            {imageList.length > 0 && (

              <div className="grid grid-cols-3">
                {imageList.map((image, i) => (
                  <div key={i} >
                    <Image src={image.dataURL as string} alt="Image" width={200} height={200}
                           className="w-full object-cover object-top"/>
                  </div>

                ))}
              </div>
            )

            }
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUploader;
