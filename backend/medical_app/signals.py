from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Patient
from .utils import send_sms
from django.conf import settings
import json
import pytz

def open_clinic_data():
    # Opening JSON file
    f = open('./medical_app/clinics.json')
    
    # returns JSON object as
    # a dictionary
    data = json.load(f)

    return data

@receiver(post_save, sender=Patient)
def send_sms_on_patient_update(sender, instance, created, **kwargs):

    # Format timestamps
    pst = pytz.timezone('America/Los_Angeles') # Set timezone to PST
    entry_date = instance.entryDate.astimezone(pst).strftime('%Y-%m-%d %H:%M')
    follow_up_date = instance.followUpDate.astimezone(pst).strftime('%Y-%m-%d %H:%M')

    # Fetch clinic information
    clinic_info = {
        "name": str(),
        "email": str(),
        "address": str(),
    }
    clinic_data = open_clinic_data()

    for clinic in clinic_data['clinics']:
        if clinic['id'] == instance.selectedClinic:
            clinic_info['name'] = clinic['name']
            clinic_info['email'] = clinic['email']
            clinic_info['address'] = clinic['address']
            break

    message = f"\n\nPediaMatch Demo\n\nDr.Donlan is requesting a consultation at: {clinic_info['name']} for {instance.firstName} {instance.lastName}. Below is the information filled out by the user:\n\n \
          - Patient Information:\n \
          \t- Patient Name: {instance.firstName} {instance.lastName}\n \
          \t- Guardian Email: {instance.email}\n \
          \t- Guardian Phone Number: {instance.phoneNumber}\n \
          \t- Patient Postal Code: {instance.postalCode}\n\n \
        - Clinic Information:\n \
          \t- Name: {clinic_info['name']}\n \
          \t- Contact Email: {clinic_info['email']}\n \
          \t- Address: {clinic_info['address']}\n\n \
        - Consultation Request Status:\n \
          \t- Consultation initial request date: {entry_date} PST\n \
          \t- Consultation follow up date: {follow_up_date} PST\n \
          \t- Consultation scheduled status: {instance.consultationScheduled}\n "

    recipient_phone = settings.TWILIO_RECIPIENT
    send_sms(recipient_phone, message)
