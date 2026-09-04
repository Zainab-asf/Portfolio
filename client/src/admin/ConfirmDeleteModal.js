import React, { useState } from 'react';

export default function ConfirmDeleteModal({ project, onCancel, onConfirm }) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    await onConfirm();
    setDeleting(false);
  };

  return (
    <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-label="Delete project">
        <div className="dialog-title">Delete Project?</div>
        <div className="dialog-body">
          "{project.title}" will be permanently removed. This action cannot be undone.
        </div>
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={deleting}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={handleConfirm} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete Project'}
          </button>
        </div>
      </div>
    </div>
  );
}
