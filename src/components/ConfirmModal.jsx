import { createPortal } from 'react-dom'
import styles from './ConfirmModal.module.css'

// Portal: renders the modal inside #modal-root instead of its parent
function ConfirmModal({ text, onConfirm, onCancel }) {
  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Delete task">
        <h2>Delete this task?</h2>
        <p>{text}</p>
        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.delete} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default ConfirmModal
