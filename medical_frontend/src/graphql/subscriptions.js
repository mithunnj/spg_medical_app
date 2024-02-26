/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatient = /* GraphQL */ `
  subscription OnCreatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onCreatePatient(filter: $filter) {
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
export const onUpdatePatient = /* GraphQL */ `
  subscription OnUpdatePatient($filter: ModelSubscriptionPatientFilterInput) {
    onUpdatePatient(filter: $filter) {
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
export const onDeletePatient = /* GraphQL */ `
  subscription OnDeletePatient($filter: ModelSubscriptionPatientFilterInput) {
    onDeletePatient(filter: $filter) {
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
export const onCreateS3Object = /* GraphQL */ `
  subscription OnCreateS3Object($filter: ModelSubscriptionS3ObjectFilterInput) {
    onCreateS3Object(filter: $filter) {
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
export const onUpdateS3Object = /* GraphQL */ `
  subscription OnUpdateS3Object($filter: ModelSubscriptionS3ObjectFilterInput) {
    onUpdateS3Object(filter: $filter) {
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
export const onDeleteS3Object = /* GraphQL */ `
  subscription OnDeleteS3Object($filter: ModelSubscriptionS3ObjectFilterInput) {
    onDeleteS3Object(filter: $filter) {
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
