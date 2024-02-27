/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      patientFirstName
      patientLastName
      guardianFirstName
      guardianLastName
      guardianPhoneNumber
      guardianEmail
      patientPostalCode
      selectedClinic
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patientFirstName
        patientLastName
        guardianFirstName
        guardianLastName
        guardianPhoneNumber
        guardianEmail
        patientPostalCode
        selectedClinic
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
