from django.urls import path
from .views import TransactionListCreateView, get_balance, delete_all_transactions
urlpatterns = [
    path('transactions/', TransactionListCreateView.as_view(), name='transaction-list-create'),
    path('balance/', get_balance, name='get-balance'),
    path('delete_all/', delete_all_transactions, name='delete-all-transactions'),
]