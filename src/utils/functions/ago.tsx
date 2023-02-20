export function ago(ms: number) {
    if(ms < 1000 * 60) {return 'Только что'}
    if(ms < 1000 * 60 * 5) {return `${Math.floor( ms / 1000 / 60 )} минуты назад`}
    if(ms < 1000 * 60 * 60) {return `${Math.floor( ms / 1000 / 60 )} минут назад`}
    if(ms < 1000 * 60 * 60 * 2) {return `${Math.floor( ms / 1000 / 60 / 60 )} час назад`}
    if(ms < 1000 * 60 * 60 * 5) {return `${Math.floor( ms / 1000 / 60 / 60 )} часа назад`}
    if(ms < 1000 * 60 * 60 * 24) {return `${Math.floor( ms / 1000 / 60 / 60 )} часов назад`}
    if(ms < 1000 * 60 * 60 * 24 * 2) {return `вчера`}
    if(ms < 1000 * 60 * 60 * 24 * 5) {return `${Math.floor( ms / 1000 / 60 / 60 / 24 )} дня назад`}
    if(ms < 1000 * 60 * 60 * 24 * 31) {return `${Math.floor( ms / 1000 / 60 / 60 / 24 )} дней назад`}
    if(ms < 1000 * 60 * 60 * 24 * 30.4 * 5) {return `${Math.floor( ms / 1000 / 60 / 60 / 24 / 30.4 )} месяца назад`}
    if(ms < 1000 * 60 * 60 * 24 * 365) {return `${Math.floor( ms / 1000 / 60 / 60 / 24 / 30.4 )} месяцев назад`}
    if(ms < 1000 * 60 * 60 * 24 * 365 * 2) {return `год назад`}
    if(ms < 1000 * 60 * 60 * 24 * 365 * 5) {return `${Math.floor( ms / 1000 / 60 / 60 / 24 / 365 )} года назад`}
    return `${Math.floor( ms / 1000 / 60 / 60 / 24 / 365 )} лет назад`
  }