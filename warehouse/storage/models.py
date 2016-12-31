from django.db import models
from datetime import date

# Create your models here.
# list of warehouse with address



class Warehouse_list(models.Model):

    name = models.CharField(max_length=5)
    district = models.CharField(max_length=10)
    street = models.CharField(max_length=20)
    aisle = models.IntegerField()

    def __str__(self):
        name = self.name + ' ' + str(self.aisle)
        return name

#list of warehouse with all shelves
class Aisle(models.Model):
    aname = models.ForeignKey(Warehouse_list, related_name='warehouse_aisle')
    shelf = models.CharField(max_length = 2)

    def __str__(self):
        return u'%s %s %s'%(self.aname.name,self.aname.aisle,self.shelf)

#list of warehouse with all levels. basic unit of storage
class Shelf(models.Model):
    sname = models.ForeignKey(Aisle, related_name = 'aisle_shelf')
    level = models.IntegerField()
    start = models.DateField(default = date(1999,10,30),blank = True)
    end = models.DateField(default = date(1999,10,31), blank = True)
    #  0 = working, -1 = under repair, cannot rent out
    status = models.IntegerField(default = 0)

    def __str__(self): # return warehouse name, aisle+shelf+level
        return u'%s %s%s%s'%(self.sname.aname.name, self.sname.aname.aisle, self.sname.shelf, self.level)

class Customer(models.Model):
    first_name = models.CharField(max_length= 30)
    last_name = models.CharField(max_length= 40)
    company = models.CharField(max_length= 100, blank = True)
    #cell phone number
    phone = models.CharField(max_length= 13)
    email = models.EmailField(max_length= 254)


    def __str__(self):
        return u'%s %s %s' %(self.first_name,self.last_name,self.company)

class Category2(models.Model):
    category =models.CharField(max_length = 50)
    description = models.CharField(max_length= 254, blank = True)
    price = models.IntegerField(default = 10)

    def __str__(self):
        return self.category


class Transaction(models.Model):
    tcustomer = models.ForeignKey(Customer)
    tcategory = models.ForeignKey(Category2, related_name = 'transaction_category')
    amount = models.IntegerField()
    tshelf = models.ForeignKey(Shelf)
    tstart = models.DateField()
    tend = models.DateField()
    tcost = models.IntegerField()
    tstatus = models.IntegerField(default = 1)#1 = ongoing, 0 = paid and over

    def __str__(self):
        return u'%s%s%s' %(self.id, self.tcustomer.first_name, self.tcustomer.last_name)