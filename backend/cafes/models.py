from django.db import models

class Cafes(models.Model):
    cafe_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    neighborhood = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    price_level = models.SmallIntegerField()
    opening_hours = models.TextField(blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True, null=True)
    is_active = models.BooleanField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = "cafes"


class Amenities(models.Model):
    amenity_id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = "amenities"


class CafeAmenities(models.Model):
    pk = models.CompositePrimaryKey("cafe_id", "amenity_id")

    cafe = models.ForeignKey(Cafes, on_delete=models.DO_NOTHING)
    amenity = models.ForeignKey(Amenities, on_delete=models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = "cafe_amenities"
