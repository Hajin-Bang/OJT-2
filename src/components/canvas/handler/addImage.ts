import { Canvas, Image as FabricImage } from "fabric";

/** 이미지 파일을 캔버스에 추가하는 handler */
export async function addImage(
  canvas: Canvas,
  imageUrl: string
): Promise<void> {
  const res = await fetch(imageUrl);
  const svgText = await res.text();
  const updatedSvg = injectSVGSize(svgText);
  const blob = new Blob([updatedSvg], { type: "image/svg+xml" });
  const blobUrl = URL.createObjectURL(blob);

  const imgElement = new Image();
  imgElement.crossOrigin = "anonymous";
  imgElement.src = blobUrl;

  imgElement.onload = () => {
    const fabricImg = new FabricImage(imgElement, {
      left: 100,
      top: 100,
      objectCaching: false,
      selectable: true,
    });

    fabricImg.scaleToWidth(100);
    canvas.add(fabricImg);
    canvas.setActiveObject(fabricImg);
    canvas.requestRenderAll();
  };

  imgElement.onerror = (e) => {
    console.error("이미지 로드 실패:", e);
  };
}

/**
 * SVG 문자열에 width/height가 없으면 viewBox로부터 값을 계산해 삽입
 * fabric에서 clipping 되는 크롬 전용 문제 해결
 */
function injectSVGSize(svg: string): string {
  const hasWidth = /<svg[^>]*\swidth=["']?\d+/i.test(svg);
  const hasHeight = /<svg[^>]*\sheight=["']?\d+/i.test(svg);
  const viewBoxMatch = svg.match(/viewBox=["']([\d.\s]+)["']/i);

  if (!hasWidth && !hasHeight && viewBoxMatch) {
    const [, viewBox] = viewBoxMatch;
    const [, , width, height] = viewBox.split(/\s+/);
    return svg.replace(/<svg/i, `<svg width="${width}" height="${height}"`);
  }

  return svg;
}
