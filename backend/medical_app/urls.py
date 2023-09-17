from django.urls import path
from .views import PatientCreateView, sms_webhook

urlpatterns = [
    path('create/', PatientCreateView.as_view(), name='create-patient'),
    path('sms_webhook/', sms_webhook, name='sms_webhook')
]
