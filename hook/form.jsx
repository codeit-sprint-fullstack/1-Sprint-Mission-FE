"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
// 제네릭을 사용하여 initialValues의 타입을 지정합니다.
const useForm = (initialValues) => {
    const [values, setValues] = (0, react_1.useState)(initialValues);
    const [isSubmitting, setIsSubmitting] = (0, react_1.useState)(false);
    // 입력값 변경 시 호출되는 함수
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setValues(Object.assign(Object.assign({}, values), { [name]: value }));
    };
    // 폼 제출 시 호출되는 함수
    const handleSubmit = (callback) => (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        callback();
    };
    // 폼 초기화 함수
    const resetForm = () => {
        setValues(initialValues);
        setIsSubmitting(false);
    };
    return {
        values,
        handleChange,
        handleSubmit,
        resetForm,
        isSubmitting,
        setValues,
    };
};
exports.default = useForm;
