'use client';
import { forwardRef, MouseEventHandler } from 'react';
import classNames from 'classnames';

interface SmallButtonProps {
    text: string;
    type?: 'button' | 'submit';
    inverted?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    role?: string;
    className?: string;
    textOnly?: boolean;
    id?: string;
}

const Button = forwardRef<HTMLButtonElement | null, SmallButtonProps>(
    (
        {
            text,
            type = 'button',
            onClick,
            inverted = false,
            textOnly = false,
            className = '',
            role = 'button',
            id,
        },
        ref,
    ) => {
        const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
            onClick?.(e);
        };

        return (
            <button
                ref={ref}
                id={id}
                type={type}
                role={role}
                onClick={onClickHandler}
                className={classNames(
                   'leading-[26px] h-[2.5rem] cursor-pointer px-[1rem] text-[#ffffff] rounded-sm font-[500] tracking-wide',
                    {
                        'underline !text-[#827127] bg-transparent hover:bg-transparent min-w-0 px-0  !text-[16px]':
                        textOnly,
                        'text-white bg-[#827127] hover:bg-[#64582b] min-w-[106px] px-6':
                            !inverted && !textOnly,
                        'border border-[#827127] text-goldBase bg-[#ffffff] min-w-[106px] px-6':
                        inverted,
                    },
                    className,
                )}
            >
                {text}
            </button>
        );
    },
);

Button.displayName = 'Button';

export default Button;
