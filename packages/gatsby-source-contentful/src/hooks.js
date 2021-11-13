// @ts-check
import { getImageData } from "gatsby-plugin-image"

import { createUrl } from "./image-helpers"

export function useContentfulImage({ image, ...props }) {
  return getImageData({
    baseUrl: image.url,
    sourceWidth: image.width,
    sourceHeight: image.height,
    backgroundColor: null,
    urlBuilder: ({ baseUrl, width, height, options, format }) =>
      createUrl(baseUrl, { ...options, height, width, toFormat: format }),
    pluginName: `gatsby-source-contentful`,
    ...props,
  })
}
