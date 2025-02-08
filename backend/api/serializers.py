from rest_framework import serializers
from .models import User, Album, Photo


class UserSerializer(serializers.ModelSerializer):
    album_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'album_count']

    def get_album_count(self, obj):
        return obj.albums.count()


class AlbumSerializer(serializers.ModelSerializer):
    photo_count = serializers.SerializerMethodField()

    class Meta:
        model = Album
        fields = ['id', 'user', 'title', 'photo_count']

    def get_photo_count(self, obj):
        return obj.photos.count()


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'album', 'title', 'image_url']
