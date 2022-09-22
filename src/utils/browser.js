//判断是否IE<11浏览器
export function isIE() {
  return (
    navigator.userAgent.includes('compatible') &&
    navigator.userAgent.includes('MSIE')
  );
}

export function isIE11() {
  return (
    navigator.userAgent.includes('Trident') &&
    navigator.userAgent.includes('rv:11.0')
  );
}

//判断是否IE的Edge浏览器
export function isEdge() {
  return navigator.userAgent.includes('Edge') && !isIE();
}

export function getIEVersion() {
  const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  const isIE = isIE();
  const isIE11 = isIE11();
  const isEdge = isEdge();

  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
    reIE.test(userAgent);
    const fIEVersion = Number.parseFloat(RegExp['$1']);
    if (
      fIEVersion === 7 ||
      fIEVersion === 8 ||
      fIEVersion === 9 ||
      fIEVersion === 10
    ) {
      return fIEVersion;
    } else {
      return 6; //IE版本<7
    }
  } else if (isEdge) {
    return 'edge';
  } else if (isIE11) {
    return 11;
  } else {
    return -1;
  }
}
