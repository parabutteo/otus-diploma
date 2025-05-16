import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation Signup($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        profile {
          id
          name
          email
          signUpDate
          commandId
        }
        token
      }
    }
  }
`;

export const SIGN_IN = gql`
  mutation Signin($email: String!, $password: String!) {
    profile {
      signin(email: $email, password: $password) {
        token
        profile {
          id
          name
          email
          signUpDate
          commandId
        }
      }
    }
  }
`;
