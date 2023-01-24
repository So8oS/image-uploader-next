/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';



interface acceptedFilesInterface {
    name: string;
    preview: string;
}

const iswindow = typeof window !== 'undefined';


const Box = () => {
    const [files, setFiles] = useState<
    acceptedFilesInterface[]
    >([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image': ['image/jpeg', 'image/png', 'image/gif'],
        },
        onDrop: acceptedFiles => {
            //  @ts-ignore
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }
});

const uploadBytton = useRef<HTMLInputElement>(null);

const imageRef = React.useRef<HTMLImageElement>(null);

const copyImageToClipboard = () => {
    if (imageRef.current) {
      const image = new Image();
      image.src = imageRef.current.src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
            // @ts-ignore
          navigator.clipboard.write([new ClipboardItem({'image/png': blob})]);
        }, 'image/png');
      };
    }
  };






const [image, setImage] = useState('')
//  @ts-ignore
const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
//  @ts-ignore
   setImage(URL.createObjectURL(event.target.files[0]));
 }
}



return (
    <div className='h-[30rem] bg-white w-[20rem] md:w-[33rem] rounded-xl shadow-md flex flex-col items-center justify-evenly'>
        
        {  (files.length  || image.length) === 0 &&
            <div className='flex flex-col items-center' >
            <span className='text-lg font-medium' >Upload your image</span>
            <span className='text-[0.625rem] font-medium text-[#828282]' >File should be Jpeg,png...</span>
        </div>
        }

        <div {...getRootProps()} className='h-[13.5rem] w-[18rem] md:w-[21rem] bg-[#F6F8FB] border border-dashed border-[#97BEF4] rounded-xl flex flex-col items-center justify-around'>
            <div className="flex flex-wrap h-full w-full">
                {
                    files.length>0 ? (
                        files.map((file: acceptedFilesInterface
                            ) => (
                                <div key={file.name} className={`w-full `}>
                                <img className='object-contain h-full w-full rounded-lg p-1' src={file.preview} alt="" />
                                </div>
                            ))  
                    ) : image.length > 0 ? (
                        <div className="flex flex-wrap h-full w-full">
                        <div  className={`w-full `}>
                        <img ref={imageRef} className='object-contain h-full w-full rounded-lg p-1' src={image} alt="" />
                        </div>
                        </div>
                    ) : (<div className=' w-full flex flex-col justify-center items-center ' >
                        <img src="/image.svg" alt="" />
                        <span className='text-[#BDBDBD]' >Drag and drop your image here</span>
                        <input {...getInputProps()}/>
                        </div>
                    )
                }
            </div>     
        </div>

        
        {(files.length  || image.length) === 0 ? 
        
        
        (<>
        <div className='text-[#BDBDBD]'>Or</div>
            <div>
                <button  onClick={ () => {
    
                if(uploadBytton.current){
                    uploadBytton.current.click();
                }
                }} className='h-8 w-24   bg-[#2F80ED] rounded-lg text-white text-xs '>Choose a file</button>
                <input ref={uploadBytton}  className='hidden h-8 w-24  bg-[#2F80ED] rounded-lg text-white text-xs '
                accept='image/*'
                type="file" onChange={onImageChange}/>
            </div>
        </>
        
): ( 
    <div className='flex space-x-5' >
        <button  onClick={ () => {
            if(iswindow){
                copyImageToClipboard();
            

            }
        }} className='h-8 w-28    bg-[#2F80ED] rounded-lg text-white text-xs '>Copy to clipboard</button>
        <button  onClick={() => {
            setFiles([]);
            setImage('');
        }} className='h-8 w-28   bg-red-500 rounded-lg text-white text-xs '>Clear</button>
    </div>
)
            
                    }

    </div>

  )
}

export default Box