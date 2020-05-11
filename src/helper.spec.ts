import { getMimetypeFromExtension } from './helper';

describe('getMimetypeFromExtension method', () => {
  test.each([
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.jfif', 'image/jpeg'],
    ['.pjpeg', 'image/jpeg'],
    ['.dummy', 'image/jpeg'],
    ['', 'image/jpeg'],
    ['.pjp', 'image/jpeg'],
    ['.webp', 'image/webp'],
    ['.tiff', 'image/tiff'],
    ['.tif', 'image/tiff'],
    ['.ico', 'image/x-icon'],
    ['.cur', 'image/x-icon'],
    ['.svg', 'image/svg+xml'],
    ['.gif', 'image/gif'],
    ['.png', 'image/png'],
    ['.bmp', 'image/bmp'],
    ['.apng', 'image/apng'],
  ])('should evaluate %s as %s', (extension, expectedMimeType) => {
    const mimeType = getMimetypeFromExtension(extension);
    expect(mimeType).toEqual(expectedMimeType);
  });
});
