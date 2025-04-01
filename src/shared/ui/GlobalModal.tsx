import { useModalStore } from '../stores/modal.store'

export function GlobalModal() {
  const { isOpen, title, content, closeModal } = useModalStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-[320px]">
        {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
        {content}
        <div className="mt-4 text-right">
          <button onClick={closeModal} className="text-sm text-gray-500 hover:underline">
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}
