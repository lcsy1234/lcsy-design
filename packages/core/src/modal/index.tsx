import "./index.css";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  title?: React.ReactNode;
  closeOnEsc?: boolean;
  closeOnMaskClick?: boolean;
}

export default function Modal({ open, children, onOk, onCancel, title, closeOnEsc = true, closeOnMaskClick = true }: ModalProps) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel?.();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEsc, onCancel]);

  if (!open) return null;

  return (
    <>
      <div
        className="lcsy-modal-overlay"
        onClick={() => {
          if (closeOnMaskClick) onCancel?.();
        }}
      ></div>
      <div className="lcsy-modal" role="dialog" aria-modal="true" aria-label={typeof title === "string" ? title : undefined}>
        <div className="lcsy-modal-inner">
          <div className="lcsy-modal-title">
            <div>{title}</div>
            <div onClick={onCancel} aria-label="Close" role="button" tabIndex={0}>x</div>
          </div>
          <div className="lcsy-modal-content">{children}</div>
          <div className="lcsy-modal-footer">
            <div className="lcsy-modal-actions">
              <div className="lcsy-btn lcsy-btn-cancel" onClick={onCancel}>
                取消
              </div>
              <div className="lcsy-btn lcsy-btn-ok" onClick={onOk}>
                确定
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
