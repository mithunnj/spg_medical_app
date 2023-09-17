from django.shortcuts import render
from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer
from twilio.twiml.messaging_response import MessagingResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import re

@csrf_exempt  # Disable CSRF check. Be cautious and read Twilio’s security documentation.
def sms_webhook(request):
    # Extract the SMS message body and from number from the request
    from_number = request.POST.get('From', '')
    body = request.POST.get('Body', '')

    # Use a regular expression to extract names or ID from the message body
    # Adapt this according to how you expect messages to be formatted
    # Regular expression pattern
    pattern = r'Appointment scheduled for, Patient Name: (?P<first_name>\w+)'

    match = re.search(pattern, body)

    # If a name was found in the message, try to update a patient
    if match:
        first_name = match.group('first_name')
        
        # Lookup the patient by name
        # NOTE: This is a simplification. Names are not unique, so you might want to use an ID or another identifier in practice.
        try:
            patient = Patient.objects.get(firstName__iexact=first_name)
            patient.consultationScheduled = True  # or other logic to update based on your SMS
            patient.save()
            message = f"\n\nPediaMatch Demo\n\nUpdated consultation status for {patient.firstName} {patient.lastName}."
        except Patient.DoesNotExist:
            message = f"No patient found with name: {first_name}."
    
    # Craft a Twilio XML response
    twiml_response = MessagingResponse()
    twiml_response.message(message)

    # Return the response to Twilio
    return HttpResponse(str(twiml_response), content_type='application/xml')

class PatientCreateView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


