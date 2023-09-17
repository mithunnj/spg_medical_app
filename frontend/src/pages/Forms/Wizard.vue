<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <simple-wizard @finish="wizardComplete">
          <template slot="header">
            <h3 class="card-title">Register new patient for Pediatrician match</h3>
            <h3 class="description">
              This information will begin the matching process for your patient.
            </h3>
          </template>

          <wizard-tab :before-change="() => validateStep('step1')">
            <template slot="label">
              <i class="tim-icons icon-single-02"></i>
              <p>About</p>
            </template>
            <first-step
              ref="step1"
              @on-validated="onStepValidatedStep1"
            ></first-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="tim-icons icon-attach-87"></i>
              <p>Attachments</p>
            </template>
            <second-step
              ref="step2"
              @on-validated="onStepValidatedDefault"
            ></second-step>
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step3')">
            <template slot="label">
              <i class="tim-icons icon-map-big"></i>
              <p>Clinic</p>
            </template>
            <third-step
              ref="step3"
              :postalCode="wizardModel.postalCode" 
              @on-validated="onStepValidatedStep3"
            ></third-step>
          </wizard-tab>
        </simple-wizard>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import FirstStep from './Wizard/FirstStep.vue';
import SecondStep from './Wizard/SecondStep.vue';
import ThirdStep from './Wizard/ThirdStep.vue';
import swal from 'sweetalert2';
import { SimpleWizard, WizardTab } from 'src/components';

export default {
  data() {
    return {
      wizardModel: {}
    };
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    SimpleWizard,
    WizardTab
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    calculateFollowUpDate() {
      const entryDate = new Date();

      // Calculate 30 days from the current date
      return new Date(entryDate.setDate(entryDate.getDate() + 30));
    },
    onStepValidatedStep1(validated, firstName, lastName, email, phoneNumber, postalCode) {
      if (validated) {
        this.wizardModel = {
          ...this.wizardModel,
          firstName,
          lastName,
          email,
          phoneNumber,
          postalCode
        };
      }
      console.log("DEBUG, Wizard.Vue: onStepValidatedStep1: ", this.wizardModel);
    },
    onStepValidatedStep3(validated, selectedClinic) {
      if (validated) {
        this.wizardModel = {
          ...this.wizardModel,
          selectedClinic,
          entryDate: new Date(),
          followUpDate: this.calculateFollowUpDate(),
          consultationScheduled: false
        };
      }
      console.log("DEBUG, Wizard.Vue: onStepValidatedStep3: ", this.wizardModel);
    },
    onStepValidatedDefault(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };

      console.log("DEBUG, Wizard.Vue: onStepValidated: ", this.wizardModel);
    },
    async wizardComplete() {
      console.log("DEBUG, Wizard.Vue: Wizard Complete: ", this.wizardModel);

      // The URL of your Django backend API endpoint
      const apiUrl = 'http://127.0.0.1:8000/api/create/'; 

      try {
        // Sending POST request to the API endpoint
        const response = await axios.post(apiUrl, this.wizardModel);
        console.log('DEBUG, Wizard.vue: Response from backend', response.data);
        // Handle the response accordingly
        swal.fire('Success!', `Patient profile created for: ${this.wizardModel.firstName} ${this.wizardModel.lastName}`, 'success');
      } catch (error) {
        console.error('Error sending data', error);
        // Handle the error accordingly
        swal.fire('Error!', 'Error sending data!', 'error');
      }
    }
  }
};
</script>
