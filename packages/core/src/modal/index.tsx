import "./index.css";
export default function Modal({ open, children, onOk, onCancel, title }) {
  if (open) {
    return (
      <>
        <div className="modal-out-whole"></div>
        <div className="modal">
          <div className="modal-whole-in">
            <div className="modal-title">
              <div>{title}</div>
              <div>x</div>
            </div>
            <div className="modal-content">{children}</div>
            <div className="modal-foot">
              <div className="button-whole">
                <div className="cancel button" onClick={onCancel}>
                  取消
                </div>
                <div className="ok button" onClick={onOk}>
                  确定
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
