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


class UserAlbumsView(generics.ListAPIView):
    serializer_class = AlbumSerializer

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return Album.objects.filter(user_id=user_id)


class AlbumPhotosView(generics.ListAPIView):
    serializer_class = PhotoSerializer

    def get_queryset(self):
        album_id = self.kwargs["album_id"]
        return Photo.objects.filter(album_id=album_id)
