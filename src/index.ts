import { registerPlugin } from '@scullyio/scully';

import { webpImagesPlugin } from './web-images';

// DON NOT FORGET REGISTER THE PLUGIN
const validator = async (conf: any) => [];
registerPlugin('render', 'webpimages', webpImagesPlugin, validator);

module.exports.webpImagesPlugin = webpImagesPlugin;
