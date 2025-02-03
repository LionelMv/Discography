from rest_framework import generics
from .models import User, Album, Photo
from .serializers import UserSerializer, AlbumSerializer, PhotoSerializer


# List all users
class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Retrieve a specific user
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# List all albums
class AlbumListView(generics.ListCreateAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


# Retrieve a specific album
class AlbumDetailView(generics.RetrieveAPIView):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


# List all photos
class PhotoListView(generics.ListCreateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


# Retrieve a specific photo and allow title updates
class PhotoDetailView(generics.RetrieveUpdateAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
