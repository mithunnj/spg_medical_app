<template>
  <PatientFormItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Patient Information</template>
    <form @submit.prevent="submitForm" class="form-content">
      <!-- Patient First Name -->
      <div class="form-group">
        <label for="patientFirstName">Patient First Name</label>
        <input id="patientFirstName" type="text" v-model="patientFirstName" required>
      </div>

      <!-- Patient Last Name -->
      <div class="form-group">
        <label for="patientLastName">Patient Last Name</label>
        <input id="patientLastName" type="text" v-model="patientLastName" required>
      </div>

      <!-- Guardian First Name -->
      <div class="form-group">
        <label for="guardianFirstName">Guardian First Name</label>
        <input id="guardianFirstName" type="text" v-model="guardianFirstName" required>
      </div>

      <!-- Guardian Last Name -->
      <div class="form-group">
        <label for="guardianLastName">Guardian Last Name</label>
        <input id="guardianLastName" type="text" v-model="guardianLastName" required>
      </div>

      <!-- Guardian Phone Number -->
      <div class="form-group">
        <label for="guardianPhoneNumber">Guardian Phone Number</label>
        <input id="guardianPhoneNumber" type="tel" v-model="guardianPhoneNumber" pattern="\d{10}" title="Phone number must be 10 digits" required>
      </div>

      <!-- Guardian Email -->
      <div class="form-group">
        <label for="guardianEmail">Guardian Email</label>
        <input id="guardianEmail" type="email" v-model="guardianEmail" required>
      </div>

      <!-- Patient Postal Code (Canadian postal code validation pattern) -->
      <div class="form-group">
        <label for="patientPostalCode">Patient Postal Code</label>
        <input id="patientPostalCode" type="text" v-model="patientPostalCode" pattern="[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d" title="Must be a valid Canadian postal code" required>
      </div>

      <!-- Clinic Selection -->
      <div class="form-group">
        <label for="clinicSelection">Select Clinic</label>
        <select id="clinicSelection" v-model="selectedClinic" required>
          <option disabled value="">Please select one</option>
          <option v-for="clinic in clinics" :key="clinic.id" :value="clinic.id">
            {{ clinic.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </PatientFormItem>
</template>


<script setup>
import { ref } from 'vue'
import PatientFormItem from './PatientFormItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'

const patientFirstName = ref('')
const patientLastName = ref('')
const guardianFirstName = ref('')
const guardianLastName = ref('')
const guardianEmail = ref('')
const patientPostalCode = ref('')
const guardianPhoneNumber = ref('')
const selectedClinic = ref('') // Holds the selected clinic's ID or name
const clinics = ref([
  { id: 1, name: 'The Children\'s Care Clinic Pierrefonds' },
  { id: 2, name: 'Lasalle Hospital Pediatrics' },
  { id: 3, name: 'Tiny Tots' },
  { id: 4, name: 'Bloom Clinic'},
  { id: 5, name: 'Hopital Maisonneuve-Rosemont'},
  { id: 6, name: 'Centre ambulatoire de pediatrique CIUSSS Du Nord-de l\'ile'},
  { id: 7, name: 'Hôtel-Dieu d\'Arthabaska'},
  { id: 8, name: 'Clinique Pédiatrique Sept-Îles-CISSS de la Cote-Nord'},
  { id: 9, name: 'CISSS de Gaspésie-Hôpital de Maria'},
  { id: 10, name: 'Hopital Pierre-Le Gardeur Pediatrie'},
  { id: 11, name: 'Pédiatres de l\'Hôpital de St-Eustache'},
  { id: 12, name: 'Pédiatres de Ste-Agathe'},
  { id: 13, name: 'Hopital Charles Lemoyne'},
  { id: 14, name: 'Hopital Pierre Boucher'},
  { id: 15, name: 'Hôpital Honoré-Mercier Pavillon Saint-Charles'},
  { id: 16, name: 'Northern Program-Montreal Children\'s Hospital'},
  { id: 17, name: 'Clinique Le Copain-CISSSO Outaouais Hôpital de Gatineau\'s Hospital'},
  { id: 18, name: 'Clinique de Pédiatrie du Saguenay'},
])


function submitForm() {
  console.log({
    patientFirstName: patientFirstName.value,
    patientLastName: patientLastName.value,
    guardianFirstName: guardianFirstName.value,
    guardianLastName: guardianLastName.value,
    guardianEmail: guardianEmail.value,
    patientPostalCode: patientPostalCode.value,
    guardianPhoneNumber: guardianPhoneNumber.value,
    selectedClinic: selectedClinic.value // Include the selected clinic
  })
  // Add actual submission logic here (e.g., API call)
}
</script>


<style scoped>
/* Styling for the form content to align with Vue 3 + Vite aesthetic */
.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px; /* Space between form elements */
  max-width: 500px; /* Maximum width for the form */
  margin: 0 auto; /* Centering the form */
}

/* Styling for individual form groups */
.form-group {
  display: flex;
  flex-direction: column; /* Stack label and input vertically */
}

/* Label styling for better visibility */
.form-group label {
  margin-bottom: 8px; /* Space between label and input */
  font-weight: bold; /* Make labels bold */
}

/* Input and textarea styling for consistency */
.form-group input,
.form-group textarea {
  padding: 8px; /* Padding inside inputs */
  font-size: 16px; /* Font size for readability */
  border: 1px solid #ccc; /* Border color */
  border-radius: 4px; /* Rounded corners */
}

/* Styling for the submit button */
.submit-btn {
  background-color: #42b983; /* Vue's brand green color */
  color: white; /* Text color */
  padding: 10px 15px; /* Padding around text */
  border: none; /* Remove default border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
}

/* Hover effect for the submit button */
.submit-btn:hover {
  background-color: #369b7a; /* Darker green on hover */
}
</style>
