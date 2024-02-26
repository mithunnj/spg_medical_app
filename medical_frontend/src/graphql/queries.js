/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      firstName
      lastName
      guardianFirstName
      guardianLastName
      postalCode
      guardianPhoneNumber
      guardianEmail
      attachments {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $id: ID
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPatients(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        firstName
        lastName
        guardianFirstName
        guardianLastName
        postalCode
        guardianPhoneNumber
        guardianEmail
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getS3Object = /* GraphQL */ `
  query GetS3Object($id: ID!) {
    getS3Object(id: $id) {
      id
      patientId
      bucket
      key
      region
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listS3Objects = /* GraphQL */ `
  query ListS3Objects(
    $id: ID
    $filter: ModelS3ObjectFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listS3Objects(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        patientId
        bucket
        key
        region
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const s3ObjectsByPatientIdAndCreatedAt = /* GraphQL */ `
  query S3ObjectsByPatientIdAndCreatedAt(
    $patientId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelS3ObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    s3ObjectsByPatientIdAndCreatedAt(
      patientId: $patientId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        patientId
        bucket
        key
        region
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
