# from django.db import models
# from django.contrib.auth.models import AbstractUser
# # Create your models here.
# class User(AbstractUser):
#     name=models.CharField(max_length=255)
#     email=models.EmailField(max_length=255,unique=True)
    
#     username=None
    
#     USERNAME_FIELD='email'
#     REQUIRED_FIELDS=['name']

#     def __str__(self):
#         return self.email
    
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    
    username = None
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',  # Custom related_name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions_set',  # Custom related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.email
