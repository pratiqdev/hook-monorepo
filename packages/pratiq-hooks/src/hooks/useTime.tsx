import { useState, useEffect } from 'react';
import useInterval from './useInterval.js';




// const timezoneLabels: Record<string, string> = {
//     'UTC': '+00:00',
//     'GMT': '+00:00',
//     'EST': '-05:00', // Eastern Standard Time (North America)
//     'EDT': '-04:00', // Eastern Daylight Time (North America)
//     'CST': '-06:00', // Central Standard Time (North America)
//     'CDT': '-05:00', // Central Daylight Time (North America)
//     'MST': '-07:00', // Mountain Standard Time (North America)
//     'MDT': '-06:00', // Mountain Daylight Time (North America)
//     'PST': '-08:00', // Pacific Standard Time (North America)
//     'PDT': '-07:00', // Pacific Daylight Time (North America)
//     'WET': '+00:00', // Western European Time
//     'CET': '+01:00', // Central European Time
//     'CEST': '+02:00', // Central European Summer Time
//     'EET': '+02:00', // Eastern European Time
//     'EEST': '+03:00', // Eastern European Summer Time
//     'IST': '+05:30', // Indian Standard Time
//     'CST_CN': '+08:00', // China Standard Time
//     'JST': '+09:00', // Japan Standard Time
//     'AEST': '+10:00', // Australian Eastern Standard Time
//     'AEDT': '+11:00', // Australian Eastern Daylight Time
//     // ... add more as needed ...
// };

// const getTimezoneOffset = (timezone:string):number => {
//   if (!timezone) return 0;

//   if (timezoneLabels[timezone]) {
//     timezone = timezoneLabels[timezone];
//   }

//   const match = timezone.match(/^([+\-]?)(\d{2}):(\d{2})$/);
//   if (match) {
//     const sign = match[1] === '-' ? -1 : 1;
//     const hours = parseInt(match[2]);
//     const minutes = parseInt(match[3]);
//     return sign * ((hours * 60 + minutes) * 60 * 1000);
//   }

//   console.warn('Invalid timezone provided:', timezone);
//   return 0;
// };

const formatTime = (date:Date, formatString:string):string => {
    const hour12 = date.getHours() % 12 || 12;
    const amPm = date.getHours() < 12 ? 'AM' : 'PM';

    const replacements: Record<string, string> = {

        '%Y': String(date.getFullYear()),
        '%M': String(date.getMonth() + 1).padStart(2, '0'),
        '%D': String(date.getDate()).padStart(2, '0'),
        '%H': String(date.getHours()).padStart(2, '0'),
        '%h': String(hour12).padStart(2, '0'),
        '%m': String(date.getMinutes()).padStart(2, '0'),
        '%s': String(date.getSeconds()).padStart(2, '0'),
        '%S': String(date.getMilliseconds()).padStart(2, '0'),
        '%t': String(date.getTime()).padStart(2, '0'),
        '%p': amPm
    };

    return formatString.replace(/%Y|%M|%D|%H|%h|%m|%s|%S|%t|%p/g, (match) => replacements[match]);
};


export type UseTimeConfig = {
    // timezone: keyof typeof timezoneLabels;
    format: string;
    interval: number;
}

export type UseTimeReturn = {
    rawTime: number;
    time: string;
}

/*
{
    timezone = 'GMT',
    format = '%Y-%M-%D %h:%m:%s',
    interval = 1000
}
*/

/** Refresh and parse the current time */
const useTime = (config: UseTimeConfig):UseTimeReturn => {

    const settings = {
        // offset: getTimezoneOffset(config?.timezone ?? 'UTC'),
        interval: config?.interval ?? 1000,
        format: config?.format ?? '%Y-%M-%D %h:%m:%s'
    }
    
    const [rawTime, setRawTime] = useState(Date.now());
    const [time, setTime] = useState('NO TIME SET YET');

    useInterval(() => {
        // Adding the offset and setting the raw time
        setRawTime(Date.now());
    }, settings.interval, {
        autoStart: true
    });

    useEffect(() => {
        // Parsing the raw time according to the provided format
        const date = new Date(rawTime);
        const parsedTime = formatTime(date, settings.format);
        setTime(parsedTime);
    }, [rawTime, settings.format]);

    return { rawTime, time };
};


export default useTime