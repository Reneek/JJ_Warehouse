"""warehouse URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from storage import views

urlpatterns = [
    url(r'^dash/$',views.trans_init),
    url(r'^admin/', admin.site.urls),
    url(r'^load_category/$',views.trans_init),
    url(r'^load_warehouse/$',views.available_location),
    url(r'^create_order/$', views.create_order),
    url(r'^createcust/$',views.add_cust),
    url(r'^get_r/$',views.print_r),
    url(r'^get_cust/$',views.get_cust),
    url(r'^release/$',views.release),
    url(r'^load_trans/$',views.get_trans),
    url(r'login/$',views.login_1),
    url(r'register/$',views.register),



]
