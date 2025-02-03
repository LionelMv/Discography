from django.urls import path
from .views import (
    UserListView,
    UserDetailView,
    AlbumListView,
    AlbumDetailView,
    PhotoListView,
    PhotoDetailView
)


urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),

    path('albums/', AlbumListView.as_view(), name='album-list'),
    path('albums/<int:pk>/', AlbumDetailView.as_view(), name='album-detail'),

    path('photos/', PhotoListView.as_view(), name='photo-list'),
    path('photos/<int:pk>/', PhotoDetailView.as_view(), name='photo-detail'),
]
