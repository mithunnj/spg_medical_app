from twilio.rest import Client
from django.conf import settings

def send_sms(to, message):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body=message,
        from_=settings.TWILIO_PHONE,
        to=to
    )

    return message.sid  # Return the message SID to confirm the message was sent
