"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = Modal;
const modal_module_css_1 = __importDefault(require("./modal.module.css"));
const image_1 = __importDefault(require("next/image"));
function Modal({ isModalOpen, onClose, children }) {
    // 모달이 열리지 않으면 아무것도 렌더링하지 않음
    if (!isModalOpen)
        return null;
    return (<div className={modal_module_css_1.default.modalOverlay} onClick={onClose}>
      <div className={modal_module_css_1.default.modalContent} onClick={(e) => e.stopPropagation()}>
        <image_1.default src="/deleteImg.svg" alt="close" width={20} height={20} className={modal_module_css_1.default.closeImg} onClick={onClose}/>
        {children}
      </div>
    </div>);
}
