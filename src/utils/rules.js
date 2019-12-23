export const ruleOfLowerCase = /^[a-z]+$/

export const ruleOfUpperCase = /^[A-Z]+$/

export const ruleOfAlphabets = /^[A-Za-z]+$/

export const ruleOfURL = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

export const ruleOfPhoneNumber = /^1[3456789]\d{9}$/

export const ruleOfEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const regOfSpecial = new RegExp("[_%`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？+-]")

//挂载主机
export const ruleOfHost = /^([a-zA-Z0-9]+(.[a-zA-Z0-9]+)+)(:)+[0-9]+$/


//主机地址，带http校验
export const ruleOfHost2 = /^http(s)?:\/\/([a-zA-Z0-9]+(.[a-zA-Z0-9]+)+)((:)+[0-9]+)?$/

// 社会信用代码
export const ruleOfSocialCreditCode = /^[A-Z0-9]{18}$/
