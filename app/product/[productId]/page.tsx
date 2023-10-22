import { Container, ProductDetails } from "@/app/components";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  return (
    <div className="p-8">
      <Container>
        <ProductDetails />
      </Container>
    </div>
  );
};

export default Product;
