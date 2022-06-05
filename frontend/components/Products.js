import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Product from "./Product";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

const Products = () => {
  const { data, loading, error } = useQuery(ALL_PRODUCTS_QUERY);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ProductsList>
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product}/>
        ))}
      </ProductsList>
    </div>
  );
};

export default Products;
