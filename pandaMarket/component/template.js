//인풋

export const input = ({ id, type, label, holder }) => {
  return `
    <div class="inputBox ${id}">
              <label for="${id}">${label}</label>
              <input
                type="${type}"
                id="${id}"
                name="${id}"
                placeholder="${holder}"
              />
    </div>
    <div class="err ${id}" style='dispaly: none'>${holder}</div>
    `;
};

//패스워드 인풋
export const inputPw = ({ id, type, label, holder }) => {
  return `
    <div class="inputBox ${id}">
              <label for="${id}">${label}</label>
              <input
                type="${type}"
                id="${id}"
                name="${id}"
                placeholder="${holder}"
              />
      <div id="${id}Eye"></div>
      <div id="${id}EyeSlash"></div>
    </div>
    <div class="err ${id}" style='dispaly: none'>${holder}</div>
    `;
};

//버튼

export const button = (type, text) => {
  return `
    <button class="${type}" disabled="disabled">${text}</button>
    `;
};

//버튼 객체 생성

export class buttonType {
  constructor(type, text) {
    (this.type = type), (this.text = text);
  }
}
