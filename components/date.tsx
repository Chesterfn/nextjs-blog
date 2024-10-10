import { parseISO, format } from 'date-fns' //格式化日期的库
interface DateString{
    dateString:string
}
export default function Date({ dateString}:DateString) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}