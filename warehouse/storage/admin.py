from django.contrib import admin
from storage.models import Warehouse_list, Aisle, Shelf, Customer, Category2, Transaction
# Register your models here.

class Warehouse_listAdmin(admin.ModelAdmin):
    list_display = ("name","district","street","aisle")

class AisleAdmin(admin.ModelAdmin):
    list_display = ("aname","shelf")

class ShelfAdmin(admin.ModelAdmin):
    list_display = ("sname","start","end","level","status")

class CustomerAdmin(admin.ModelAdmin):
    list_display = ("first_name","last_name","company","phone","email")

class Category2Admin(admin.ModelAdmin):
    list_display = ("category","price","description")

class tAdmin(admin.ModelAdmin):
    list_display = ("pk","tcustomer","tcategory","tstart","tend","tshelf","tcost","tstatus")



admin.site.register(Warehouse_list, Warehouse_listAdmin)
admin.site.register(Aisle,AisleAdmin)
admin.site.register(Shelf,ShelfAdmin)
admin.site.register(Customer,CustomerAdmin)
admin.site.register(Category2,Category2Admin)
admin.site.register(Transaction,tAdmin)






