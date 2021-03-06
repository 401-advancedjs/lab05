'use strict';

const transforms = require('./transforms.js');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */

const Bitmap = function(filePath) {
  this.file = filePath;
};

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */

Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.file_size = buffer.readInt16LE(2);
  this.start_of_pixel = buffer.readInt16LE(10);
  this.file_width = buffer.readInt32LE(18);
  this.file_height = buffer.readInt32LE(22);
  this.bits_per_pix = buffer.readInt16LE(28);
  
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */

Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

module.exports = Bitmap;




