import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export const getAge = (value: string) => {
  const date = dayjs(Date.parse(value));
  return dayjs().diff(date, 'year');
};
