import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query Profile {
    profile {
      id
      name
      email
      signUpDate
      commandId
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    profile {
      update(input: $input) {
        id
        name
        email
      }
    }
  }
`;

export const GET_PROFILE_ID = gql`
  query ProfileId {
    profile {
      id
    }
  }
`;
