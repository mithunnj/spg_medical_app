# Generated by Django 4.2.5 on 2023-10-03 01:30

from django.db import migrations, models
import django.utils.timezone
import medical_app.models


class Migration(migrations.Migration):

    dependencies = [
        ('medical_app', '0002_rename_first_name_patient_firstname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='patient',
            old_name='phone',
            new_name='phoneNumber',
        ),
        migrations.AddField(
            model_name='patient',
            name='consultationScheduled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='patient',
            name='entryDate',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='patient',
            name='followUpDate',
            field=models.DateTimeField(default=medical_app.models.get_follow_up_date),
        ),
    ]
