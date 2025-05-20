import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetMany($input: ProductGetManyInput) {
    products {
      getMany(input: $input) {
        pagination {
          pageSize
          pageNumber
          total
        }
        data {
          id
          name
          photo
          desc
          price
          category {
            id
            name
            photo
            commandId
          }
          commandId
        }
      }
    }
  }
`;

export const GET_PRODUCTS_IDS = gql`
  query GetProductIds($input: ProductGetManyInput) {
    products {
      getMany(input: $input) {
        data {
          id
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($getOneId: ID!) {
    products {
      getOne(id: $getOneId) {
        photo
        name
        price
        id
        desc
        category {
          name
        }
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($input: CategoryGetManyInput) {
    categories {
      getMany(input: $input) {
        data {
          id
          name
        }
      }
    }
  }
`;

export const GET_ORDERS = gql`
  query ExampleQuery($input: OrderGetManyInput) {
    orders {
      getMany(input: $input) {
        data {
          id
          status
          products {
            _id
            product {
              id
              name
            }
            quantity
          }
          user {
            id
            name
            commandId
          }
          commandId
        }
      }
    }
  }
`;
