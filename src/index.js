const { registerPlugin } = require('@scullyio/scully');
const imagemin = require('imagemin');
const webp = require('imagemin-webp');
const { JSDOM } = require('jsdom');

const convertImages = async (imagesFolder, formats, imageQuality) => {
    const images = imagesFolder + '/*.{' + formats + '}';
    console.log('Converting the images at: ' + images);
    await imagemin([images], {
        destination: outputFolder,
        plugins: [
            webp({ quality: imageQuality })
        ]
    });
    console.log('Conversion of images completed.')
}

const webpImagesPlugin = async (html, route) => {
    try {
        const options = route.config.webpConfig;
        const imagesFolder = (options && options.imagesFolder) ?
            options.imagesFolder :
            '';
        const imageQuality = (options && options.quality) ?
            options.quality :
            50;
        const formats = 'jpg, jpeg, png';
        await convertImages(imagesFolder, formats, imageQuality);
    }
    catch (error) {
        console.error(error);
    }

    const dom = new JSDOM(html);
    try {
        const doc = dom.window.document;
        const imageElements = doc.getElementsByTagName('img');

        console.log('Number of images found: '+ imageElements.length);

        imageElements.forEach(element => {
            const imageRelativePath = element.getAttribute('src');
            const imageParentNode = element.parentNode;
            const imageExtension = imageRelativePath.substr(imageRelativePath.lastIndexOf('.'));
            const webpRelativePath = imageRelativePath.replace(imageExtension, '.webp');

            const pictureElement = doc.createElement('picture');
            const sourceElementForWebp = doc.createElement('source');
            sourceElementForWebp.setAttribute('type', 'image/webp');
            sourceElementForWebp.setAttribute('srcset', webpRelativePath);
            pictureElement.appendChild(sourceElementForWebp);
            if (imageExtension === '.jpeg' || imageExtension === '.jpg') {
                const sourceElementForJpeg = doc.createElement('source');
                sourceElementForJpeg.setAttribute('type', 'image/jpeg');
                sourceElementForJpeg.setAttribute('srcset', imageRelativePath);
                pictureElement.appendChild(sourceElementForJpeg);
            }
            if (imageExtension === '.png') {
                const sourceElementForPng = doc.createElement('source');
                sourceElementForPng.setAttribute('type', 'image/png');
                sourceElementForPng.setAttribute('srcset', imageRelativePath);
                pictureElement.appendChild(sourceElementForPng);
            }
            pictureElement.appendChild(element);
            imageParentNode.replaceChild(pictureElement, element);
        });
    }
    catch (error) {
        console.error(error);
    }
    finally {
        console.log('Webp rendering complete.')
    }
    return dom.serialize();
}
// DON NOT FORGET REGISTER THE PLUGIN
const validator = async conf => [];
registerPlugin('render', 'webpimages', webpImagesPlugin, validator);

module.exports = {
    webpImagesPlugin
};