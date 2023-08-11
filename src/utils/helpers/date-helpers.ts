import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export const getAge = (value: Date) => {
  return dayjs().diff(formatDate(value), 'year');
};

export const formatDate = (value: Date) => {
  return dayjs(value).format('YYYY-MM-DD');
};
