export function getCvType(encoding: string): string {
  encoding = encoding.toUpperCase()
  // Check for the most common encodings first
  if (encoding == 'BGR8') return 'CV_8UC3'
  if (encoding == 'MONO8') return 'CV_8UC1'
  if (encoding == 'RGB8') return 'CV_8UC3'
  if (encoding == 'MONO16') return 'CV_16UC1'
  if (encoding == 'BGR16') return 'CV_16UC3'
  if (encoding == 'RGB16') return 'CV_16UC3'
  if (encoding == 'BGRA8') return 'CV_8UC4'
  if (encoding == 'RGBA8') return 'CV_8UC4'
  if (encoding == 'BGRA16') return 'CV_16UC4'
  if (encoding == 'RGBA16') return 'CV_16UC4'

  // For bayer, return one-channel
  if (encoding == 'BAYER_RGGB8') return 'CV_8UC1'
  if (encoding == 'BAYER_BGGR8') return 'CV_8UC1'
  if (encoding == 'BAYER_GBRG8') return 'CV_8UC1'
  if (encoding == 'BAYER_GRBG8') return 'CV_8UC1'
  if (encoding == 'BAYER_RGGB16') return 'CV_16UC1'
  if (encoding == 'BAYER_BGGR16') return 'CV_16UC1'
  if (encoding == 'BAYER_GBRG16') return 'CV_16UC1'
  if (encoding == 'BAYER_GRBG16') return 'CV_16UC1'

  // Miscellaneous
  if (encoding == 'YUV422') return 'CV_8UC2'

  return 'CV_8UC3'
}

export function getCvConversion(encoding: string): string {
  encoding = encoding.toUpperCase()
  // Check for the most common encodings first
  if (encoding == 'BGR8') return `BGR`
  if (encoding == 'MONO8') return 'GRAY'
  if (encoding == 'RGB8') return 'RGB'
  if (encoding == 'MONO16') return 'GRAY'
  if (encoding == 'BGR16') return 'BGR'
  if (encoding == 'RGB16') return 'RGB'
  if (encoding == 'BGRA8') return 'BGRA'
  if (encoding == 'RGBA8') return 'RGBA'
  if (encoding == 'BGRA16') return 'BGRA'
  if (encoding == 'RGBA16') return 'RGBA'

  // For bayer, return one-channel
  if (encoding == 'BAYER_RGGB8') return 'GRAY'
  if (encoding == 'BAYER_BGGR8') return 'GRAY'
  if (encoding == 'BAYER_GBRG8') return 'GRAY'
  if (encoding == 'BAYER_GRBG8') return 'GRAY'
  if (encoding == 'BAYER_RGGB16') return 'GRAY'
  if (encoding == 'BAYER_BGGR16') return 'GRAY'
  if (encoding == 'BAYER_GBRG16') return 'GRAY'
  if (encoding == 'BAYER_GRBG16') return 'GRAY'

  // Miscellaneous
  if (encoding == 'YUV422') return 'PLEASE_GODS_PLEASE'

  return 'PLEASE_GODS_PLEASE'
}
