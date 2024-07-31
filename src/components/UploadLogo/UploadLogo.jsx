import React, { useRef, useState } from 'react'
import { PhotoIcon, PlayIcon,MapPinIcon, ClockIcon } from "@heroicons/react/20/solid";


const UploadLogo = () => {
  const [image, setImage] = useState(null)
  const imageRef = useRef()

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
    handleSubmit();
  };

  const handleSubmit = (e) => {

  }

  return (
    <>
      <div className="flex justify-center items-center border-2 w-50%">
        <div className="flex flex-col">
          <div className="flex justify-around">
            <div onClick={() => { imageRef.current.click() }} className="flex flex-col items-center indigo-500" >
              <PhotoIcon className="mr-2 w-20 h-20" />
              Photo
            </div>
            <div style={{ display: "none" }}>
              <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
            </div>
          </div>
          {image && (
            <div className="relative">
              {/* <UilTimes
                onClick={() => setImage(null)}
                className="absolute top-2 right-4 bg-white rounded-full cursor-pointer"
              /> */}
              <img src={URL.createObjectURL(image)} alt="" className="w-full max-h-80 rounded-md object-cover" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UploadLogo