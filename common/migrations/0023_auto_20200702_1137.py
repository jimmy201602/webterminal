# Generated by Django 3.0.6 on 2020-07-02 11:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0022_auto_20200702_1055'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='defaultusersettings',
            options={'permissions': (('can_add_defaultusersettings', 'Can add commands'), ('can_change_defaultusersettings', 'Can change commands info'), ('can_delete_defaultusersettings', 'Can delete commands info'), ('can_view_defaultusersettings', 'Can view commands info'))},
        ),
    ]