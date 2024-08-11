import "./validateModal.scss";

function ValidateModal({ show, message, onConfirm, onCancel }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Confirmer</button>
          <button onClick={onCancel}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default ValidateModal;
