import { HandledRoute } from '@scullyio/scully';
import { JSDOM } from 'jsdom';

import { getMimetypeFromExtension } from './helper';

export const webpImagesPlugin = async (html: string, route: HandledRoute) => {

    const dom = new JSDOM(html);
    try {
        const doc = dom.window.document;
        const imageElements = doc.getElementsByTagName('img');

        console.log('Number of images found: ' + imageElements.length);

        for (const element of Array.from(imageElements)) {
            const imageRelativePath: any = element.getAttribute('src');
            const imageAlternateText: any = element.getAttribute('alt');
            const imageParentNode = element.parentNode;
            console.log(imageParentNode?.nodeName);
            console.log(imageParentNode?.hasChildNodes());
            const imageExtension = imageRelativePath.substr(imageRelativePath.lastIndexOf('.'));
            const webpRelativePath = imageRelativePath.replace(imageExtension, '.webp');

            const pictureElement = doc.createElement('picture');
            const sourceElementForWebp = doc.createElement('source');
            sourceElementForWebp.setAttribute('type', 'image/webp');
            sourceElementForWebp.setAttribute('srcset', webpRelativePath);
            pictureElement.appendChild(sourceElementForWebp);

            const sourceElementForUserImage = doc.createElement('source');
            sourceElementForUserImage.setAttribute('type', getMimetypeFromExtension(imageExtension));
            sourceElementForUserImage.setAttribute('srcset', imageRelativePath);
            pictureElement.appendChild(sourceElementForUserImage);

            const newImageElement = doc.createElement('img');
            newImageElement.setAttribute('src', imageRelativePath);
            newImageElement.setAttribute('alt', imageAlternateText);

            pictureElement.appendChild(newImageElement);

            console.log(element.parentNode?.hasChildNodes());
            element.parentNode?.replaceChild(pictureElement, element);
        };

    }
    catch (error) {
        console.error(error);
    }
    finally {
        console.log('Webp rendering complete.')
    }
    return dom.serialize();
}