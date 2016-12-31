from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.http import HttpResponse
from datetime import date
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import logout


def login_1(request):

    # receive username and password entered
    uname = request.GET['username']
    password = request.GET['psw']

    #compare username and password with database
    user = authenticate(username=uname, password=password)
    if user is not None:
        if user.is_active:
            login(request, user)
            request.session['user'] = uname
            request.session.set_expiry(3000) # 50 min timeout
            # Return matching success code 1
            return JsonResponse({'code':1})
        else: # Return a 'disabled account' error message, code = -1
            return JsonResponse({'code':-1})
    else: # Return an 'invalid login' error message.
        return JsonResponse({'code':0})

def register(request):
    first_name = request.GET['fname']
    lname = request.GET['lname']
    uname = request.GET['username']
    password = request.GET['psw']

    email = request.GET['email']

    # create user in class user
    u = User.objects.create_user(
        username=uname,
        password=password,
        email=email,
        first_name=first_name,
        last_name = lname
    )
    u.save()
    return JsonResponse({'code':1})
#search for available location

def available_location(request):
    l_start = request.GET['d_start']
    l_end = request.GET['d_end']
    l_category = request.GET['d_category']

    string = str(l_start)  # format of time sent time, month/day/year. need year,month,day
    month = string[0] + string[1]
    day = string[3] + string[4]
    year = string[6] + string[7] + string[8] + string[9]
    start_date = date(int(year), int(month),int(day))

    # spaces with earlier ending dates, and usable.. returns  dictionary  ({'sname': pk,'level': 2, 'pk':1}...etc)
    spaces = Shelf.objects.all().filter(end__lt=start_date).filter(status=0).order_by('sname').values('sname','level','pk','status')

    w_list = []
    s_list = []
    for item in spaces:
        a_id = Aisle.objects.get(pk=item['sname'])#get the shelf object
        string = {'Wh': a_id.aname.name , 'Aisle':  str(a_id.aname.aisle) ,  'Shelf': a_id.shelf ,'Level': str(item['level']),'pk':str(item['pk']),'Status':item["status"]}
        s_list.append(string)
        if a_id.aname.name in w_list: #only append to list if name is new. compared variable is the name of warehouse
            pass
        else:
            w_list.append(a_id.aname.name)

    data = [w_list,s_list]

    return JsonResponse(data, safe = False)

def test(request):
    customer = Customer.objects.all()
    c_list = []
    for person in customer:
        name = person.first_name + ' ' + person.last_name
        c_list.append({'customer': name})

    return JsonResponse(c_list, safe=False)



# initiate transaction page
def trans_init(request):
    customer = Customer.objects.all()
    c_list = []
    for person in customer:
        name = person.first_name + ' ' + person.last_name
        list = {'customer': name, 'pk':person.pk}
        c_list.append(list)

    category = Category2.objects.all()
    ca_list = []
    for type in category:
        ca_list.append({'category':type.category})

    data = [ca_list,c_list]
    return JsonResponse(data, safe = False)

# create order
def create_order(request):
    customer = request.GET['d_customer']
    start = request.GET['d_start']
    end = request.GET['d_end']
    category = request.GET['d_category']
    shelf = request.GET['d_pk']
    target = Category2.objects.get(category=category)


    string = str(start)  # format of time sent time, month/day/year. need year,month,day
    month = string[0] + string[1]
    day = string[3] + string[4]
    year = string[6] + string[7] + string[8] + string[9]
    start_date = date(int(year), int(month), int(day))

    estring = str(end)  # format of time sent time, month/day/year. need year,month,day
    month = estring[0] + estring[1]
    day = estring[3] + estring[4]
    year = estring[6] + estring[7] + estring[8] + estring[9]
    end_date = date(int(year), int(month), int(day))
    delta = end_date - start_date
    cost = target.price

    payment = delta.days*cost

    t = Transaction.objects.create(
        tcustomer=Customer.objects.get(pk=int(customer)),
        tcategory=target,
        amount=1,
        tshelf=Shelf.objects.get(pk=int(shelf)),
        tstart= start_date,
        tend = end_date,
        tcost = payment
    )

    t.save()

    shelf = Shelf.objects.get(pk=int(shelf))

    shelf.save()

    data  = {"code":0,"pk":t.pk}

    return JsonResponse(data)

def trythis(request):
    l_start = date(2016,12,18)
    end = date(2016,12,30)
    trans = Transaction.objects.all().filter(tstart__gte=l_start).filter(tstart__lte=end)
    data = []
    customer = []
    for item in trans:
        name = item.tcustomer.first_name + ' ' + item.tcustomer.last_name
        if name not in customer:
            nstring = {"name": name}
            customer.append(nstring)
        wh = item.tshelf.sname.aname.name
        location = str(item.tshelf.sname.aname.aisle) + ' ' + item.tshelf.sname.shelf + ' ' + str(item.tshelf.level)
        st = str(item.tstart.year) + '/' + str(item.tstart.month) + '/' + str(item.tstart.day)
        en = str(item.tend.year) + '/' + str(item.tend.month) + '/' + str(item.tend.day)
        string = {'name': name, 'start': st, 'end': en, "wh": wh, 'location': location, "cost": item.tcost,
                  "status": item.tstatus}
        data.append(string)
    final = [data, customer]
    return JsonResponse(final, safe=False)

def add_cust(request):
    first = request.GET['first']
    last = request.GET['last']
    phone = request.GET['phone']
    company = request.GET['company']
    email = request.GET['email']

    c = Customer.objects.create(
        first_name=first,
        last_name = last,
        company = company,
        phone = phone,
        email = email

        )
    c.save()

    return JsonResponse({'code':0})

def get_cust(request):


    c = Customer.objects.all()
    data = []
    for person in c:
        data.append({'fname':person.first_name,'lname':person.last_name,'company':person.company,"phone":person.phone,"email":person.email})

    return JsonResponse(data,safe = False)




def print_r(request):
    key = request.GET['number']
    try:
        trans = Transaction.objects.get(pk = key)
        detail = {"name":trans.tcustomer.first_name,"sdate":trans.tstart,"edate":trans.tend,"warehouse": trans.tshelf.sname.aname.name,"cost":trans.tcost,"status":trans.tstatus}
        return JsonResponse(detail, safe = False)
    except:
        return JsonResponse({"code":0})

def release(request):
    default = date(1999,10,30)
    num = request.GET['key']
    trans = Transaction.objects.get(pk=num)
    trans.tstatus = 0
    trans.tshelf.start = default
    trans.tshelf.end = default
    trans.save()
    return JsonResponse({"code":0})
    #except:
        #return JsonResponse({"code":-1})

def get_trans(request):
    start = request.GET['d_start']
    end = request.GET['d_end']
    string = str(start)  # format of time sent time, month/day/year. need year,month,day
    month = string[0] + string[1]
    day = string[3] + string[4]
    year = string[6] + string[7] + string[8] + string[9]
    start_date = date(int(year), int(month), int(day))

    estring = str(end)  # format of time sent time, month/day/year. need year,month,day
    month = estring[0] + estring[1]
    day = estring[3] + estring[4]
    year = estring[6] + estring[7] + estring[8] + estring[9]
    end_date = date(int(year), int(month), int(day))
    try:
        trans = Transaction.objects.all().filter(tstart__gte=start_date).filter(tstart__lte=end_date)
        data = []
        customer = []
        for item in trans:
            name = item.tcustomer.first_name + ' '+ item.tcustomer.last_name
            if name not in customer:
                nstring = {"name":name}
                customer.append(nstring)
            wh = item.tshelf.sname.aname.name
            location = str(item.tshelf.sname.aname.aisle) +' ' + item.tshelf.sname.shelf+' ' + str(item.tshelf.level)
            st = str(item.tstart.year)+'/'+str(item.tstart.month)+'/'+str(item.tstart.day)
            en = str(item.tend.year) + '/' + str(item.tend.month) + '/' + str(item.tend.day)
            string = {'name':name, 'start':st,'end':en,"wh":wh,'location':location, "cost":item.tcost, "status":item.tstatus}
            data.append(string)
        final = [customer,data]
        return JsonResponse(final, safe = False)
    except:
        return JsonResponse({'code':0})


def out(request):
    logout(request)