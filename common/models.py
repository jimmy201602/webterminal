# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes import generic

#A solution for foreignkey
#class Foo(models.Model):
    #company_type = models.ForeignKey(ContentType)
    #company_id = models.PositiveIntegerField()
    #company = generic.GenericForeignKey('company_type', 'company_id')
#seller = Seller.objects.create()
#buyer = Buyer.objects.create()
#foo1 = Foo.objects.create(company = seller)
#foo2 = Foo.objects.create(company = buyer)
#foo1.company
#<Seller: Seller object>
#foo2.company
#<Buyer: Buyer object>
#https://stackoverflow.com/questions/30551057/django-what-are-the-alternatives-to-having-a-foreignkey-to-an-abstract-class
#https://lukeplant.me.uk/blog/posts/avoid-django-genericforeignkey/