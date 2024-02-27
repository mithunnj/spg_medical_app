/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatient = /* GraphQL */ `
  mutation CreatePatient(
    $input: CreatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    createPatient(input: $input, condition: $condition) {
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
export const updatePatient = /* GraphQL */ `
  mutation UpdatePatient(
    $input: UpdatePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    updatePatient(input: $input, condition: $condition) {
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
export const deletePatient = /* GraphQL */ `
  mutation DeletePatient(
    $input: DeletePatientInput!
    $condition: ModelPatientConditionInput
  ) {
    deletePatient(input: $input, condition: $condition) {
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
