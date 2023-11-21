import dayjs from 'dayjs';
import 'dayjs/locale/en'
import 'dayjs/locale/tr'
import i18n from '../../i18nConfig';
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect } from 'react';

dayjs.extend(relativeTime)

const dayjsInstance = (param: string) => {

    const day = dayjs(param).locale(i18n.language);

    useEffect(() => {
        
        day.locale(i18n.language);

    }, [i18n.language]);

    return day;

}

export default dayjsInstance;