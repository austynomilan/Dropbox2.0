import { create } from 'zustand'

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeketeModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenmaeModalOpen: (open: boolean) => void;

    fileId: String | null;
    setFileId: (fileId: String) => void;

    fileName: String | null;
    setFileName: (fileName: String) => void;      
}

export const useAppStore = create<AppState>()((set) => ({
    fileId: null,
    setFileId: (fileId:String) => setState((state) => ({fileId})),

    fileName: "",
    setFileName: (fileName:String) => setState((state) => ({fileName})),

    isDeleteModalOpen: false,
    setIsDeletModalOpen: (open) => set((state) => ({isDeleteModalOpen: open})),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) => set((state) => ({isRenameModalOpen: open}))
}))