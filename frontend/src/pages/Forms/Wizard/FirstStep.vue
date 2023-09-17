<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
    <div>
      <h5 class="info-text">
        Please input patient and guardian information.
      </h5>
      <div class="row justify-content-center mt-5">
        <div class="col-sm-5">

          <ValidationProvider
            name="Patient First Name"
            rules="required|alpha"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            required
            v-model="firstName"
            placeholder="Patient First Name"
            addon-left-icon="tim-icons icon-single-02"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>

         <ValidationProvider
           name="Guardian Email"
           rules="required|email"
           v-slot="{ passed, failed, errors }"
         >
         <base-input
           required
           v-model="email"
           placeholder="Guardian Email"
           addon-left-icon="tim-icons icon-email-85"
           :error="errors[0]"
           :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
         </base-input>
        </ValidationProvider>
        </div>
        <div class="col-sm-5">

          <ValidationProvider
            name="Patient Last Name"
            rules="required|alpha"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            required
            v-model="lastName"
            placeholder="Patient Last Name"
            addon-left-icon="tim-icons icon-caps-small"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>

         <ValidationProvider
           name="Guardian Phone Number"
           rules="required|numeric"
           v-slot="{ passed, failed, errors }"
         >
         <base-input
           required
           v-model="phoneNumber"
           placeholder="Guardian Phone Number"
           addon-left-icon="tim-icons icon-mobile"
           :error="errors[0]"
           :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
         </base-input>
        </ValidationProvider>
        </div>
        <div class="col-sm-10">

          <ValidationProvider
            name="Patient Postal Code"
            rules="required|alpha_num|min:6"
            v-slot="{ passed, failed, errors }"
          >
          <base-input
            required
            v-model="postalCode"
            placeholder="Patient Postal Code ex. K1V1Z3"
            addon-left-icon="tim-icons icon-square-pin"
            :error="errors[0]"
            :class="[{ 'has-success': passed }, { 'has-danger': failed }]">
          </base-input>
         </ValidationProvider>

        </div>
      </div>
    </div>
  </form>
</ValidationObserver>
</template>
<script>

import { extend } from "vee-validate";
import { required, numeric, email, alpha, alpha_num, min } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("numeric", numeric);
extend("alpha", alpha);
extend("alpha_num", alpha_num);
extend("min", min);


export default {
  data() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        postalCode: ''
    };
  },
  // NOTE DEBUG: You can remove once debugging is done
  watch: {
      firstName(newVal) {
        console.log('DEBUG, FirstStep.Vue: First Name Updated: ', newVal);
      },
      lastName(newVal) {
        console.log('DEBUG, FirstStep.Vue: Last Name Updated: ', newVal);
      },
      email(newVal) {
        console.log('DEBUG, FirstStep.Vue: Email Updated: ', newVal);
      },
      phoneNumber(newVal) {
        console.log('DEBUG, FirstStep.Vue: phoneNumber Updated: ', newVal);
      },
      postalCode(newVal) {
        console.log('DEBUG, FirstStep.Vue: Postal Code Updated: ', newVal);
      },
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then(res => {
        // Transform postalCode to uppercase before sending it to the parent component.
        let upperPostalCode = this.postalCode.toUpperCase();

        this.$emit("on-validated", res, this.firstName, this.lastName, this.email, this.phoneNumber, upperPostalCode);
        return res;
      });
    },
  }
};
</script>
<style></style>
