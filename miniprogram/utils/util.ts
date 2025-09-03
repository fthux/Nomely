import { ShareMenuImages, ShareMenuTexts } from "../constants"

export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
// 移除重复字符
export const removeDuplicateChars = (str: string) => {
  return str
    .split('')
    .filter((char, index, array) => array.indexOf(char) === index)
    .join('');
};
// 同时替换非中文字符和空白符
export const removeNonChineseAndWhitespace = (str: string) => {
  return str.replace(/[^\u4e00-\u9fa5]|\s/g, '');
};

export const getShareMenuMessage = (res: WechatMiniprogram.Page.IShareAppMessageOption) => {
  return {
    title: ShareMenuTexts[randomInt(0, ShareMenuTexts.length - 1)],
    imageUrl: ShareMenuImages[randomInt(0, ShareMenuImages.length - 1)],
    path: '/pages/index/index',
  }
};

export const getShareTimelineMessage = () => {
  return {
    title: ShareMenuTexts[randomInt(0, ShareMenuTexts.length - 1)],
    imageUrl: ShareMenuImages[randomInt(0, ShareMenuImages.length - 1)],
  }
};

// 生成uuid
export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
