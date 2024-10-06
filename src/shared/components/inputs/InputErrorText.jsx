import classNames from 'classnames';
import styles from '@shared/components/inputs/InputErrorText.module.css';

export default function InputErrorText({ content, page, ...props }) {
  const errorClass = classNames({
    [styles[page]]: page,
  });
  return (
    <div className={errorClass} {...props}>
      {content}
    </div>
  );
}
