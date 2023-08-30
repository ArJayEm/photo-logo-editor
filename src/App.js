import React, { useState } from "react";
import "./styles.css";
import uniqid from "uniqid";

function App() {
  const acceptImages = ".jpg, .jpeg, .png, .webp";
  const [files, setFiles] = useState([]);

  const handleOnSelectPhotosChange = (e) => {
    const selectedFiles = e.currentTarget.files;

    if (selectedFiles && selectedFiles[0]) {
      setFiles([]);
      [...selectedFiles].forEach((file, i) => {
        var id = `Photo_${i}`;
        setFiles((files) => [...files, { file: file, id: id }]);

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async (f) => {
          var jpgFile = f.target.result;
          document.querySelector(`fieldset#SelectedPhotos img#${id}`).src =
            jpgFile;
        };
      });
    }
  };

  return (
    <>
      <input
        id="SelectPhotos"
        type="file"
        onChange={handleOnSelectPhotosChange}
        accept={acceptImages}
        multiple
      />
      <fieldset id="SelectedPhotos">
        <legend>Selected Photos</legend>
        {files &&
          files.map((file, i) => {
            var image = file.file;
            console.log(image);
            return (
              <img
                key={uniqid()}
                id={`${file.id}`}
                src={image}
                alt={`${image.name}`}
              />
            );
          })}
      </fieldset>
    </>
  );
}

export default App;
