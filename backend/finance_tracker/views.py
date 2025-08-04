from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from .models import Transaction
from .serializers import TransactionSerializer
from django.http import JsonResponse
# Create your views here.


class TransactionListCreateView(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    
def get_balance(request):
    transactions = Transaction.objects.all()
    balance = sum(transaction.amount for transaction in transactions)
    return JsonResponse({'balance': float(balance)})


@csrf_exempt
def delete_all_transactions(request):
    if request.method == 'DELETE':
        Transaction.objects.all().delete()
        return JsonResponse({'status': 'success'})