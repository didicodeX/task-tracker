import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  title?: string
  content?: React.ReactNode
  openModal: (payload: { title?: string; content?: React.ReactNode }) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: '',
  content: null,
  openModal: ({ title, content }) => set({ isOpen: true, title, content }),
  closeModal: () => set({ isOpen: false, title: '', content: null }),
}))
