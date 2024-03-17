import json
import boto3

CLINICS = {
    1: 'The Children\'s Care Clinic Pierrefonds',
    2: 'Lasalle Hospital Pediatrics',
    3: 'Tiny Tots',
    4: 'Bloom Clinic',
    5: 'Hopital Maisonneuve-Rosemont',
    6: 'Centre ambulatoire de pediatrique CIUSSS Du Nord-de l\'ile',
    7: 'Hôtel-Dieu d\'Arthabaska',
    8: 'Clinique Pédiatrique Sept-Îles-CISSS de la Cote-Nord',
    9: 'CISSS de Gaspésie-Hôpital de Maria',
    10: 'Hopital Pierre-Le Gardeur Pediatrie',
    11: 'Pédiatres de l\'Hôpital de St-Eustache',
    12: 'Pédiatres de Ste-Agathe',
    13: 'Hopital Charles Lemoyne',
    14: 'Hopital Pierre Boucher',
    15: 'Hôpital Honoré-Mercier Pavillon Saint-Charles',
    16: 'Northern Program-Montreal Children\'s Hospital',
    17: 'Clinique Le Copain-CISSSO Outaouais Hôpital de Gatineau\'s Hospital',
    18: 'Clinique de Pédiatrie du Saguenay'
}

def lambda_handler(event, context):
    ses_client = boto3.client('ses', region_name='us-east-1')  # Update 'us-east-1' with your AWS region

    # Email configuration
    sender_email = 'mithun.jothiravi@mail.utoronto.ca'  # Replace with your verified SES sender email address
    recipient_email = 'mithun.jothiravi@mail.utoronto.ca'  # Replace with the recipient email address
    subject = 'Demande de rendez-vous - Hôpital de Montréal pour enfants / Appointment Request - Montreal Children\'s Hospital'

    for record in event['Records']:
        if record['eventName'] == 'INSERT':
            new_image = record['dynamodb']['NewImage']

            # Construct the email body using patient and guardian information
            email_body = create_email_body(new_image)

            # Send the email
            try:
                response = ses_client.send_email(
                    Source=sender_email,
                    Destination={'ToAddresses': [recipient_email]},
                    Message={
                        'Subject': {'Data': subject},
                        'Body': {'Text': {'Data': email_body}}
                    }
                )
                print(f"Email sent! Message ID: {response['MessageId']}")
            except Exception as e:
                print(f"An error occurred: {e}")

    return {
        "statusCode": 200,
        "body": json.dumps('Function executed successfully!')
    }

def get_value(dynamodb_attribute):
    if dynamodb_attribute is None:
        return None
    for dtype, value in dynamodb_attribute.items():
        if dtype in ['S', 'N', 'BOOL']:
            return value
    return None

def create_email_body(new_image):
    return f"""
Cher/Chère {CLINICS[int(get_value(new_image.get('selectedClinic')))]},

J'espère que ce message vous trouve en bonne santé. Je vous écris au nom de l'Hôpital de Montréal pour enfants pour demander un rendez-vous avec un médecin de famille pour l'un de nos patients.

Informations sur le patient :

Prénom : {get_value(new_image.get('patientFirstName'))}
Nom de famille : {get_value(new_image.get('patientLastName'))}
Code postal : {get_value(new_image.get('patientPostalCode'))}

Informations sur le tuteur :

Prénom : {get_value(new_image.get('guardianFirstName'))}
Nom de famille : {get_value(new_image.get('guardianLastName'))}
Numéro de téléphone : {get_value(new_image.get('guardianPhoneNumber'))}
Courriel : {get_value(new_image.get('guardianEmail'))}

Nous vous demandons de bien vouloir organiser un rendez-vous dès que possible et de nous informer des dates et heures disponibles. Notre priorité est de garantir que le patient reçoive des soins médicaux en temps opportun.

Merci de votre attention et de votre coopération. N'hésitez pas à nous contacter pour toute information supplémentaire.

Cordialement,
Hôpital de Montréal pour enfants

-----------------------------------------------------------------------------------------------------------

Dear {CLINICS[int(get_value(new_image.get('selectedClinic')))]},

I hope this message finds you well. I am writing on behalf of Montreal Children's Hospital to request an appointment with a family doctor for one of our patients.

Patient Information:

First Name: {get_value(new_image.get('patientFirstName'))}
Last Name: {get_value(new_image.get('patientLastName'))}
Postal Code: {get_value(new_image.get('patientPostalCode'))}

Guardian Information:

First Name: {get_value(new_image.get('guardianFirstName'))}
Last Name: {get_value(new_image.get('guardianLastName'))}
Phone Number: {get_value(new_image.get('guardianPhoneNumber'))}
Email: {get_value(new_image.get('guardianEmail'))}

We kindly request you to arrange an appointment at your earliest convenience and inform us about the available dates and times. Our priority is to ensure that the patient receives timely and necessary medical care.

Thank you for your attention and cooperation. Please let us know if you need any additional information.

Best regards,
Montreal Children's Hospital
"""
