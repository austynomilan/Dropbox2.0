'use client';
import { useAppStore } from '@/Store/Store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUser } from '@clerk/nextjs';
import { deleteObject, ref } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';
import { db, storage } from '@/firebase';
import { deleteDoc, doc } from 'firebase/firestore';

export function DeleteModal() {
  const { user } = useUser();

  const [IsDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
    useAppStore((state) => [
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
      state.fileId,
      state.setFileId,
    ]);

  async function deleteFile() {
    if (!user || !fileId) return;
    const toastId = toast.loading('Deleting...');
    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
    try {
      deleteObject(fileRef)
        .then(async () => {
          deleteDoc(doc(db, 'users', user.id, 'file', `${fileId}`)).then(() => {
            toast.success('Deleted Successfully', {
              id: toastId,
            });
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      toast.error(`${error}`, {
        id: toastId,
      });
    }
  }

  return (
    <Dialog
      open={IsDeleteModalOpen}
      onOpenChange={() => {
        setIsDeleteModalOpen(false);
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-center pb-3'>
            Are you sure you want to delete?
          </DialogTitle>
          <DialogDescription className='text-center text-red-500 text-xs font-semibold'>
            This action cannot be undone, this will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>

        <div className='flex py-3 space-x-2'>
          <Button
            variant={'ghost'}
            size='sm'
            className='px-3 flex-1'
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            size='sm'
            variant={'destructive'}
            className='px-3 flex-1'
            onClick={() => deleteFile()}
          >
            <span className='sr-only'>Cancel</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
