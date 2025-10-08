import Week from "@/components/Timetable/Week";
import {toJS} from "mobx";
import {observer} from "mobx-react";
import {getWeeksInfo} from "@/utils/getWeeksInfo";
import {useWorkedHours} from "@/contexts/workedHoursContext";


const Timetable = observer(() => {

    const workedHoursStore = useWorkedHours();

    const workHours = toJS(workedHoursStore.workedHours) ?? [];


    if (workedHoursStore.isLoading) {
        return <div>Загрузка данных...</div>;
    }

    if (workedHoursStore.error) {
        return <div>Ошибка: {workedHoursStore.error}</div>;
    }

    const {previousWeek, currentWeek, currentMonth, totalTrackedHours} = getWeeksInfo(workHours)


    return (<div className=' flex flex-col items-center'>
            <h2 className='text-[18px] pb-[.2rem] text-[#222222] mx-auto'>Your timetable:</h2>
        <div className='w-[500px] h-[174px] bg-[#eeeeee] relative'>
            <div
                className='w-full h-[26px] px-[12px] py-[5px] flex items-center justify-center text-[14px] text-[#333333]'>
                {currentMonth}
            </div>
            <div className='absolute w-[500px] h-[32px] bg-[#e1e1e1] top-[26px] left-0'/>
            <div className='flex'>
                <Week week={previousWeek} totalTrackedHour={totalTrackedHours}/>
                <Week week={currentWeek} totalTrackedHour={totalTrackedHours}/>
            </div>
        </div>
        </div>
    );
});

export default Timetable;