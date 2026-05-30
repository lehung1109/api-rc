import { cn } from "@/lib/utils";

import ClientComponentWrapper from "../ClientComponentWrapper";
import ProductGallery, {
  type ProductGalleryItemModel,
  type ProductGalleryModel,
} from "./ProductGallery";

export type { ProductGalleryItemModel, ProductGalleryModel };

const ProductGalleryWrapper = (model: ProductGalleryModel) => {
  if (model.items.length === 0) {
    return null;
  }

  return (
    <ClientComponentWrapper
      className={cn("product-gallery-root", model.className)}
      type="productGallery"
      hydrateData={model}
    >
      <ProductGallery {...model} />
    </ClientComponentWrapper>
  );
};

export default ProductGalleryWrapper;
