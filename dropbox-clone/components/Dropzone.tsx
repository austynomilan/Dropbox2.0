'use client';

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import toast, { Toaster } from 'react-hot-toast';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone';

function Dropzone() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('error reading file');

      reader.onload = async () => {
        await UploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  // Declare UploadPost function
  const UploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;
    const toastId = toast.loading('Uploading File...');
    setLoading(true);

    //addDoc -> user/userID/files
    try {
        const docRef = await addDoc(collection(db, 'users', user.id, 'file'), {
          
            userId: user.id,
            fileName: selectedFile.name,
            fullName: user.fullName,
            profileImage: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,
        });
    
        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
        uploadBytes(imageRef, selectedFile).then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
    
            await updateDoc(doc(db, 'users', user.id, 'file', docRef.id), {
                downloadURL: downloadURL
            });
    
            toast.success('Uploaded Successfully', {
              id: toastId,
            });
        });
    } catch (error) {
        // Handle errors here
        toast.error(`${error}`, {
          id: toastId,
        });
    }
    
    setLoading(false);
  };
  //maximum file size 20MB
  const maxSize = 20971520;

  return (
    <DropzoneComponent onDrop={onDrop} minSize={0} maxSize={maxSize}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className='m-4'>
            <div
              {...getRootProps()}
              className={cn(
                'w-full h-52 flex justify-center p-5 border border-dashed rounded-lg text-center items-center cursor-grab',
                isDragActive
                  ? 'bg-[#035FFE] text-white animate-pulse'
                  : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400'
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && 'click here or drop a file to upload.'}
              {isDragActive && !isDragReject && 'Drop this file to upload.'}
              {isDragReject && 'File type not accepted, sorry!'}
              {isFileTooLarge && (
                <div className='text-danger mt-2'>File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
