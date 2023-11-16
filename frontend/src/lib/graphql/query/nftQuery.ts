import { gql } from "graphql-request";

export const fetchMarketNftQuery = gql`
  query MarketQuery($dateCreated: Int!) {
    nfts(
      first: 100
      where: { dateCreated_gt: $dateCreated }
      orderBy: dateCreated
      orderDirection: desc
    ) {
      id
      owner {
        id
      }
      uri
      description
    }
  }
`;

export const fetchSelfMarketNftQuery = gql`
  query SelfMarketQuery($dateCreated: Int!, $owner: String) {
    nfts(
      first: 100
      where: { dateCreated_gt: $dateCreated, owner: $owner }
      orderBy: dateCreated
      orderDirection: desc
    ) {
      id
      owner {
        id
      }
      uri
      description
    }
  }
`;

export const fetchSingleNftQuery = gql`
  query SingleNftQuery($id: String) {
    nfts(first: 1, where: { id: $id }) {
      id
      owner {
        id
      }
      uri
      description
    }
  }
`;
