import React, {FC, MouseEventHandler} from 'react';
import styles from './BlueButton.module.scss'

interface Props {
    text: string;
    type?: 'button' | 'submit';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;

}

const BlueButton:FC<Props> = ({text,type = "button" ,onClick}) => {

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        onClick?.(e);
    };
    return (
        <button  className={styles['blue-btn']} onClick={onClickHandler } type={type}>
            {text}
        </button>
    );
};

export default BlueButton;