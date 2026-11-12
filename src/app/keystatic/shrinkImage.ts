// GitHub refuse les enregistrements de plus de ~6 Mo (l'admin affiche alors
// « Failed to fetch »). Une photo de téléphone dépasse vite cette limite : on la
// réduit dans le navigateur avant de la confier à Keystatic.

export type UploadedImage = { data: Uint8Array; extension: string; filename: string };

const MAX_SIDE = 2000;
const KEEP_BELOW = 700 * 1024;

const toBlob = (canvas: HTMLCanvasElement, type: string) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, 0.85));

export async function shrinkImage(image: UploadedImage): Promise<UploadedImage> {
  if (/^(svg|gif)$/i.test(image.extension)) return image;
  try {
    const bitmap = await createImageBitmap(new Blob([image.data as BlobPart]));
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && image.data.length <= KEEP_BELOW) return image;

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    // WebP garde la transparence ; JPEG en repli pour les navigateurs sans encodeur WebP.
    let blob = await toBlob(canvas, "image/webp");
    if (blob?.type !== "image/webp") blob = await toBlob(canvas, "image/jpeg");
    if (!blob || blob.size >= image.data.length) return image;

    const extension = blob.type === "image/webp" ? "webp" : "jpg";
    return {
      data: new Uint8Array(await blob.arrayBuffer()),
      extension,
      filename: image.filename.replace(/\.[^.]+$/, "") + "." + extension,
    };
  } catch {
    return image;
  }
}
