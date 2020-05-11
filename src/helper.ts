export const getMimetypeFromExtension = (extension: string): string => {
  let mimeType;
  switch (extension) {
    case '.apng':
      mimeType = 'image/apng';
      break;
    case '.bmp':
      mimeType = 'image/bmp';
      break;
    case '.gif':
      mimeType = 'image/gif';
      break;
    case '.ico':
    case '.cur':
      mimeType = 'image/x-icon';
      break;
    case '.png':
      mimeType = 'image/png';
      break;
    case '.svg':
      mimeType = 'image/svg+xml';
      break;
    case '.tiff':
    case '.tif':
      mimeType = 'image/tiff';
      break;
    case '.webp':
      mimeType = 'image/webp';
      break;
    case '.jpg':
    case '.jpeg':
    case '.jfif':
    case '.pjpeg':
    case '.pjp':
    default:
      mimeType = 'image/jpeg';
      break;
  }
  return mimeType;
};
