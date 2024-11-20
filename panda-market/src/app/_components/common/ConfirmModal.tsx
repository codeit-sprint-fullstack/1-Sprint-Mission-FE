import { Check } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "default";
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  variant = "default",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const getColors = () => {
    if (variant === "danger") {
      return {
        icon: "bg-error-red",
        confirmButton: "bg-error-red",
        cancelBorder: "border-error-red",
        cancelText: "text-error-red",
      };
    }
    return {
      icon: "bg-primary-100",
      confirmButton: "bg-primary-100 hover:bg-primary-200",
      cancelBorder: "border-primary-100",
      cancelText: "text-primary-100",
    };
  };

  const colors = getColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative w-full max-w-[320px] rounded-2xl bg-white p-4 text-center">
        <div
          className={`mx-auto mb-4 flex h-8 w-8 items-center justify-center rounded-full ${colors.icon}`}
        >
          <Check className="h-6 w-6 text-white" />
        </div>
        <h2 className="mb-6 whitespace-pre-line text-lg font-bold text-secondary-900">
          {message}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`flex-1 rounded-[8px] border bg-white py-3 text-base font-bold ${colors.cancelBorder} ${colors.cancelText} hover:bg-secondary-50`}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 rounded-[8px] py-3 text-base font-bold text-white ${colors.confirmButton}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
