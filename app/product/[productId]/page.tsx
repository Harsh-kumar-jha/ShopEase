import { Container, ProductDetails } from "@/app/components";
import ListRating from "./ListRating";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={Product} />
        <div className="flex flex-col mt-20 gap-4">
          <div className="">Add Rating</div>
          <ListRating product={Product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
