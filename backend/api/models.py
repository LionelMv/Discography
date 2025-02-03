from django.db import models


class User(models.Model):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Album(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="albums")
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Photo(models.Model):
    album = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="photos")
    title = models.CharField(max_length=255)
    image_url = models.URLField()

    def __str__(self):
        return self.title
