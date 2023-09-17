from django.apps import AppConfig


class MedicalAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'medical_app'

    def ready(self):
        import medical_app.signals
