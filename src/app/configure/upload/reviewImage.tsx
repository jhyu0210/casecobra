import React, { ChangeEvent, useState } from "react";

const ReviewImage = () => {
  const [selectedImage, setSelectedImage] = useState<string>();

  // This function will be triggered when the file field change
  // const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e?.target?.files?.[0] && e.target.files.length > 0) {
  //     console.log("e?.target?.files?.[0] type???", e?.target?.files?.[0].name);
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectedImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage("");
  };

  return (
    <>
      <div>
        <input
          accept="image/*"
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e?.target?.files?.[0] && e.target.files.length > 0) {
              console.log(
                "e?.target?.files?.[0] type???",
                e?.target?.files?.[0].name
              );
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                setSelectedImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        />

        {/* {selectedImage} */}
        {selectedImage && (
          <div>
            {/* selectedImage:{selectedImage.toString()} */}
            <img src={selectedImage} alt="Thumb" className="h-24 w-24" />
            <button onClick={removeSelectedImage}>Remove This Image</button>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewImage;
