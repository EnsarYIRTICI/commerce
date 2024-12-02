import { ImageSize } from "@/lib/enum/image_size.enum";
import { IProductImage } from "@/lib/types/IProduct";

const Thumbnail = ({
  image,
  size,
}: {
  image: IProductImage;
  size: ImageSize;
}) => {
  const minio = "http://localhost:9000";
  const bucket = "product-images";
  const file = image.name;

  const imageUri = `${minio}/${bucket}/${file}_${size}`;

  return (
    <div>
      <img className="w-[2rem] h-[2rem] object-cover" src={imageUri} />
    </div>
  );
};
export default Thumbnail;
