import React, { useRef, useState } from 'react';
import axios from 'axios';
import { FileSelectInput } from '../Input';
import { FileUploadIconButton } from '../Button'
import { FileUploadForm, FileSelectIcon, SelectedFileName } from './styled'
import handleSelectedFileName from '../../util/handleSelectedFileName';
import validateFileSize from '../../util/validateFileSize';


export default function FileUploader() {
  const [file, setFile] = useState(null);
  const fileSelectInput = useRef(null);

  const description = file
    ? file.name.toLowerCase()
    : 'Select your files..';

  function clickHandler() {
    fileSelectInput.current.click();
  }

  function changeHandler(event) {
    const file = event.target.files[0];
    const isValidSize = validateFileSize(file);
    if (isValidSize) setFile(file);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const mediaFile = new FormData();
    mediaFile.append('mediaFile', file );
    await sendUserFile();
    setFile(null);

    async function sendUserFile() {
      let response = await axios.post(
        'http://www.localhost:4000/mediaFile',
        mediaFile
      );
    }
  }

return (
    <FileUploadForm onSubmit={submitHandler}>
      <FileSelectInput
        ref={fileSelectInput}
        type='file'
        name='mediaFile'
        accept='.mov, .mp4, .gif'
        onChange={changeHandler}
      />
      <FileSelectIcon onClick={clickHandler} />
      {handleSelectedFileName(SelectedFileName, description)}
      <FileUploadIconButton disabled={!file}/>
    </FileUploadForm>
  )
};
