const MIN_LENGTH_NAME: number = 2;
const MAX_LENGTH_NAME: number = 255;
const MIN_LENGTH_NICKNAME: number = 1;
const MAX_LENGTH_NICKNAME: number = 50;
const MIN_LENGTH_PASSWORD: number = 8;
const MAX_LENGTH_PASSWORD: number = 24;
const MAX_LENGTH_EMAIL: number = 254;

export const userSchema: { [id: string]: number } = {
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
  MIN_LENGTH_NICKNAME,
  MAX_LENGTH_NICKNAME,
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  MAX_LENGTH_EMAIL,
};

const MIN_LENGTH_IMAGE: number = 1;
const MAX_LENGTH_IMAGE: number = 2048;

export const imageSchema: { [id: string]: number } = {
  MIN_LENGTH_IMAGE,
  MAX_LENGTH_IMAGE,
};

export const MIN_NUMBER_IMAGES: number = 0;
export const MAX_NUMBER_IMAGES: number = 5;

const MIN_LENGTH_POST_NAME: number = 1;
const MAX_LENGTH_POST_NAME: number = 50;
const MIN_LENGTH_POST_CONTENT: number = 1;
const MAX_LENGTH_POST_CONTENT: number = 1024;

export const postSchema: { [id: string]: number } = {
  MIN_LENGTH_POST_NAME,
  MAX_LENGTH_POST_NAME,
  MIN_LENGTH_POST_CONTENT,
  MAX_LENGTH_POST_CONTENT,
};

const MIN_LENGTH_POST_COMMENT_CONTENT: number = 1;
const MAX_LENGTH_POST_COMMENT_CONTENT: number = 1024;

export const postCommentSchema: { [id: string]: number } = {
  MIN_LENGTH_POST_COMMENT_CONTENT,
  MAX_LENGTH_POST_COMMENT_CONTENT,
};

const MIN_LENGTH_PTODUCT_NAME: number = 1;
const MAX_LENGTH_PTODUCT_NAME: number = 50;
const MIN_LENGTH_PTODUCT_DESCRIPTION: number = 1;
const MAX_LENGTH_PTODUCT_DESCRIPTION: number = 1024;
const MIN_VALUE_PTODUCT_PRICE: number = 1;
const MAX_VALUE_PTODUCT_PRICE: number = 9999999999;

export const productSchema: { [id: string]: number } = {
  MIN_LENGTH_PTODUCT_NAME,
  MAX_LENGTH_PTODUCT_NAME,
  MIN_LENGTH_PTODUCT_DESCRIPTION,
  MAX_LENGTH_PTODUCT_DESCRIPTION,
  MIN_VALUE_PTODUCT_PRICE,
  MAX_VALUE_PTODUCT_PRICE,
};

const MIN_LENGTH_TAG: number = 1;
const MAX_LENGTH_TAG: number = 50;

export const tagSchema: { [id: string]: number } = {
  MIN_LENGTH_TAG,
  MAX_LENGTH_TAG,
};

export const MIN_NUMBER_TAGS: number = 0;
export const MAX_NUMBER_TAGS: number = 5;

const MIN_LENGTH_PTODUCT_COMMENT_CONTENT: number = 1;
const MAX_LENGTH_PTODUCT_COMMENT_CONTENT: number = 1024;

export const productCommentSchema: { [id: string]: number } = {
  MIN_LENGTH_PTODUCT_COMMENT_CONTENT,
  MAX_LENGTH_PTODUCT_COMMENT_CONTENT,
};
