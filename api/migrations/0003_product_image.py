# Generated by Django 3.2.7 on 2021-09-15 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_order_orderitem_review_shippingaddress'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]