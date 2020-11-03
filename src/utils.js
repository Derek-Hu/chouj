/**
 * 获取mimeType
 * @param  {String} type the old mime-type
 * @return the new mime-type
 */
var _supporttedType = /png|jpeg|bmp|gif/;
var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(_supporttedType)[0];
    return 'image/' + r;
};
/**
 * 在本地进行文件保存
 * @param  {String} canvas     要保存到本地的图片数据
 * @param  {String} fileType     要保存到本地的图片格式
 * @param  {String} filename 文件名
 */
var downloadFile = function(canvas, filename, fileType) {
    if (!canvas) {
        return;
    }
    if (fileType === 'jpg') {
        fileType = 'jpeg';
    }
    if (!_supporttedType.test(fileType)) {
        console.error('Supportted File Type is ', _supporttedType);
        return;
    }
    if (!filename) {
        filename = 'picture.' + fileType;
    }
    var imgData = canvas.toDataURL(fileType);
    // 加工image data，替换mime type
    imgData = imgData.replace(_fixType(fileType), 'image/octet-stream');

    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = imgData;
    save_link.download = filename;

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
/**
 * 生成唯一的ID
 * @return {String} 唯一的ID
 */
var guid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export {
    downloadFile,
    guid
}
