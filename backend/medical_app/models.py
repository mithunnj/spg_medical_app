from django.db import models
from django.utils import timezone
import datetime

def get_follow_up_date():
    return timezone.now() + datetime.timedelta(days=30)

class Patient(models.Model):
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    email = models.EmailField(max_length=254)
    phoneNumber = models.CharField(max_length=15)
    postalCode = models.CharField(max_length=10)
    file = models.FileField(upload_to='uploads/', null=True, blank=True) # Update the parameters of this file to be able to save the file properly
    selectedClinic = models.IntegerField()
    entryDate = models.DateTimeField(default=timezone.now)
    followUpDate = models.DateTimeField(default=get_follow_up_date)
    consultationScheduled = models.BooleanField(default=False)
