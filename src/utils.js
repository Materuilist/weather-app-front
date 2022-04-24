import { BODY_PARTS } from "./constants";

export const compareLocations = (locationA, locationB) => {
  return locationA[0] === locationB[0] && locationA[1] === locationB[1];
};

export const getOutfitDataUrl = (garments) => {
  const svgHeight = 200;
  const svgWidth = 200;
  const svgId = "outfitSvgId";

  const getGarmentAttributes = (garment, isDualPartLeft) => {
    switch (garment.bodyPartId) {
      case BODY_PARTS.HEAD:
        return {
          y: 0,
          x: 0.25 * svgWidth,
          width: 0.5 * svgWidth,
          height: 0.2 * svgHeight,
        };
      case BODY_PARTS.NECK:
        return {
          y: 0.2 * svgHeight,
          x: 0.35 * svgWidth,
          width: 0.3 * svgWidth,
          height: 0.15 * svgHeight,
        };
      case BODY_PARTS.BODY:
        return {
          y: 0.35 * svgHeight,
          height: 0.25 * svgHeight,
          x: 0.3 * svgWidth,
          width: 0.4 * svgWidth,
        };
      case BODY_PARTS.LEG:
        return {
          y: 0.6 * svgHeight,
          height: 0.25 * svgHeight,
          x: 0.3 * svgWidth,
          width: 0.4 * svgWidth,
        };
      case BODY_PARTS.FOOT:
        return {
          y: 0.85 * svgHeight,
          x: isDualPartLeft ? 0.3 * svgWidth : 0.55 * svgWidth,
          height: 0.15 * svgHeight,
          width: 0.15 * svgWidth,
        };
      case BODY_PARTS.HAND:
        return {
          y: 0.4 * svgHeight,
          x: isDualPartLeft ? 0.1 * svgWidth : 0.7 * svgWidth,
          height: 0.2 * svgHeight,
          width: 0.2 * svgWidth,
        };
    }
  };

  const imagesHTML = garments.reduce((res, garment) => {
    const { x, y, height, width } = getGarmentAttributes(garment, true);

    let additionalImage;
    if ([BODY_PARTS.FOOT, BODY_PARTS.HAND].includes(garment.bodyPartId)) {
      const dualAttributes = getGarmentAttributes(garment, false);
      const dualHTML = `<svg id=${svgId + "Dual"} width=${
        dualAttributes.width
      } height=${
        dualAttributes.height
      } style="transform:scale(-1,1)" ><image href="${
        garment.imageData
      }" x="${0}" y="${0}" height="${dualAttributes.height}" width="${
        dualAttributes.width
      }" /></svg>`;
      document.body.insertAdjacentHTML("beforeend", dualHTML);

      const svgDual = document.getElementById(svgId + "Dual");

      const xmlDual = new XMLSerializer().serializeToString(svgDual);
      const svgDual64 = btoa(xmlDual);
      const imageDual64 = "data:image/svg+xml;base64," + svgDual64;
      additionalImage = `<image href="${imageDual64}" x="${dualAttributes.x}" y="${dualAttributes.y}" height="${dualAttributes.height}" width="${dualAttributes.width}" />`;

      svgDual.remove();
    }

    return (
      res +
      `<image href="${
        garment.imageData
      }" x="${x}" y="${y}" height="${height}" width="${width}" />${
        additionalImage || ""
      }`
    );
  }, "");

  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg id=${svgId} width=${svgWidth} height=${svgHeight} >${imagesHTML}</svg>`
  );

  const svg = document.getElementById(svgId);

  const xml = new XMLSerializer().serializeToString(svg);
  const svg64 = btoa(xml);
  const image64 = "data:image/svg+xml;base64," + svg64;

  svg.remove();

  return image64;
};
