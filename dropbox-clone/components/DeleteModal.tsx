'use client'

import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useAppStore from '@/Store/Store'

export function DeleteModal() {
    const [
        setIsDeleteModalOpen,
        setFileId,
        setFileNmae,
        setIsRenameModalOpen
      ] = useAppStore(state=>[
        state.setIsDeleteModalOpen, 
        state.setFileId,
        state.fileName,
        state.isRenameModalOpen
      ])

       async deleFile(){

       }
  return (
    <Dialog
    open={setIsDeleteModalOpen}
    onOpenChange={()=>{
        setIsDeleteModalOpen(isOpen);
    }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
           This action cannot be undone, this will permanently delete your file! 
          </DialogDescription>
        </DialogHeader>

        <div className="flex py-3 space-x-2">
          <Button
          variant={ghost} 
          size="sm" 
          className="px-3 flex-1"
          onClick ={()=>setIsDeleteModalOpen(false)}
          >

          </Button>
          <Button
           type="submit" 
           size="sm" 
           className="px-3 flex-1"
           onClick={()=>deleFile()}
           >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

