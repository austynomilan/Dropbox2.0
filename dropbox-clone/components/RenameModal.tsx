'use client';
import { useAppStore } from '@/Store/Store';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from './ui/input';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState('');
  const [IsRenameModalOpen, setIsRenameModalOpen, fileId, fileName] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.fileId,
      state.fileName,
    ]);

  async function renameFile() {
    if (!user || !fileId) return;
    await updateDoc(doc(db, `users/${user.id}/file/${fileId}`), {
        fileName: input,
      });
      
    setInput('')
    setIsRenameModalOpen(false)
  }

  return (
    <Dialog
      open={IsRenameModalOpen}
      onOpenChange={() => {
        setIsRenameModalOpen(false);
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='pb-2'>Rename the File</DialogTitle>
          <Input
            id='Link'
            defaultValue={`${fileName}`}
            onChange={(e) => setInput(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter') {
                renameFile();
              }
            }}
          />

          <div className='flex py-3 space-x-2'>
            <Button
              variant={'ghost'}
              size='sm'
              className='px-3 flex-1'
              onClick={() => setIsRenameModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              size='sm'
              className='px-3'
              onClick={() => renameFile()}
            >
              <span className='sr-only'>Rename</span>
              <span>Rename</span>
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
