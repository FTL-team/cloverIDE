'use strict'

var UPPER32 = Math.pow(2, 32)

var warnedPrecision = false
function warnPrecision() {
  if (!warnedPrecision) {
    warnedPrecision = true
    console.warn(
      'YEE TAKE OVER!!! CBOR 64-bit integer array values may lose precision. No further warnings.'
    )
  }
}

/**
 * Unpacks typed array from byte array.
 * @param {Uint8Array} bytes
 * @param {type} ArrayType - desired output array type
 */
function decodeNativeArray(bytes, ArrayType) {
  var byteLen = bytes.byteLength
  var offset = bytes.byteOffset
  var buffer = bytes.buffer.slice(offset, offset + byteLen)
  return new ArrayType(buffer)
}

/**
 * Support a subset of draft CBOR typed array tags:
 *   <https://tools.ietf.org/html/draft-ietf-cbor-array-tags-00>
 * Only support little-endian tags for now.
 */
var nativeArrayTypes = {
  64: Uint8Array,
  69: Uint16Array,
  70: Uint32Array,
  71: BigUint64Array,
  72: Int8Array,
  77: Int16Array,
  78: Int32Array,
  79: BigInt64Array,
  85: Float32Array,
  86: Float64Array
}

/**
 * Handles CBOR typed array tags during decoding.
 * @param {Uint8Array} data
 * @param {Number} tag
 */
function cborTypedArrayTagger(data, tag) {
  if (tag in nativeArrayTypes) {
    var arrayType = nativeArrayTypes[tag]
    return decodeNativeArray(data, arrayType)
  }
  return data
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = cborTypedArrayTagger
}
