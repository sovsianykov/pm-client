import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './Day.module.scss';

type DayProps = {
    date: number;
    trackedHours: number;
    isWeekend?: boolean;
    isToday?: boolean;
    showBars?: boolean;
};

const Day: FC<DayProps> = ({
                               date,
                               trackedHours,
                               isWeekend = false,
                               isToday = false,
                               showBars = true,
                           }) => {
    const TOTAL = 8;
    const hours = Math.max(0, Math.min(TOTAL, Math.floor(trackedHours)));
    const bars = Array.from({ length: TOTAL });

    return (
        <div className={styles.wrapper}>
            <div className={classNames(styles.date, isToday && styles.today)}>{date}</div>

            <div
                className={classNames(styles.column, {
                    'bg-[#cacaca]': isWeekend,
                    'bg-none': !isWeekend,
                })}
            >

            {showBars ? (
                    <div className={styles.bars} aria-hidden={!showBars}>
                        {bars.map((_, i) => (
                            <div
                                key={i}
                                className={classNames(
                                    styles.bar,
                                    isWeekend ? styles.weekendBar : i < hours ? styles.tracked : styles.untracked
                                )}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptySpot} />
                )}
            </div>

            <div className={styles.hours}>{isWeekend ? 0 : hours}</div>
        </div>
    );
};

export default Day;
