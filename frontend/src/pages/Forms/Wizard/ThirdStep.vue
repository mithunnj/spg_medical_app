<template>
  <form @submit.prevent="validate">
  <div>
    <h5 class="info-text">Select the nearest clinic from patient postal: {{ this.postalCode }}</h5>
    <div class="row justify-content-center mt-5">
      <select v-model="selectedClinic" required>
        <option v-for="clinic in sortedClinics" :key="clinic.id" :value="clinic.id">
          {{ clinic.name }} - {{ clinic.distance }} km from patient
        </option>
      </select>
    </div>
    <div v-if="hasError" class="error-text">Please select a clinic</div>
  </div>
  </form>
</template>

<script>
export default {
  props: ['postalCode'],
  data() {
    return {
      clinics: [], // to store the list of clinics fetched from the database
      sortedClinics: [], // to store the sorted list of clinics
      selectedClinic: null, // to store the selected clinic
      hasError: false // to handle error for clinic selection
    };
  },
  mounted() {
    // Assume fetchClinics is a method to fetch clinic data from the database
    this.clinics = this.fetchClinics();
    this.calculateAndSortClinics();
  },
  // NOTE DEBUG: You can remove once debugging is done
  watch: {
    clinics(newVal) {
      console.log('DEBUG, ThirdStep.Vue: Clinics List from Database Updated: ', newVal);
    },
    sortedClinics(newVal) {
      console.log('DEBUG, ThirdStep.Vue: Sorted Clinics List Updated: ', newVal);
    },
    selectedClinic(newVal) {
      console.log('DEBUG, ThirdStep.Vue: Selected Clinic Updated: ', newVal);
    },
    hasError(newVal) {
      console.log('DEBUG, ThirdStep.Vue: Error detection Updated: ', newVal);
    }
  },
  methods: {
    calculateAndSortClinics() {
      this.sortedClinics = this.clinics.map(clinic => {
        // Assume calculateDistance is a function that calculates distance
        const distance = this.calculateDistance(this.postalCode, clinic.postalCode);
        // Round the distance to two decimal places
        const roundedDistance = parseFloat(distance.toFixed(2));
        return { ...clinic, distance: roundedDistance };
      }).sort((a, b) => a.distance - b.distance);
    },
    calculateDistance(postalCode1, postalCode2) {
      // Actual distance calculation logic
      // For example, using Google Maps API or other similar services
      return Math.random() * 100; // placeholder logic
    },
    validate() {
      console.log('DEBUG, ThirdStep.Vue: Validate: ', this.selectedClinic)

      if (this.selectedClinic) {
        this.hasError = false;
        this.$emit('on-validated', true, this.selectedClinic);
        return true;
      } 
      else {
        this.hasError = true;
        return false;
      }

    },
    fetchClinics() {
      // Fetch clinics from the database
      // This is a placeholder, replace it with actual fetch logic
      return [
        { id: 1, name: 'The Children\'s Care Clinic Pierrefonds', postalCode: '12345' },
        { id: 2, name: 'Lasalle Hospital Pediatrics', postalCode: '67890' },
        { id: 3, name: 'Tiny Tots', postalCode: '67890' },
        { id: 4, name: 'Bloom Clinic', postalCode: '67890' },
        { id: 5, name: 'Hopital Maisonneuve-Rosemont', postalCode: '67890' },
        { id: 6, name: 'Centre ambulatoire de pediatrique CIUSSS Du Nord-de l\'ile', postalCode: '67890' },
        { id: 7, name: 'Hôtel-Dieu d\'Arthabaska', postalCode: '67890' },
        { id: 8, name: 'Clinique Pédiatrique Sept-Îles-CISSS de la Cote-Nord', postalCode: '67890' },
        { id: 9, name: 'CISSS de Gaspésie-Hôpital de Maria', postalCode: '67890' },
        { id: 10, name: 'Hopital Pierre-Le Gardeur Pediatrie', postalCode: '67890' },
      ];
    },
  }
};
</script>

<style>
.error-text {
  color: red;
}
</style>

