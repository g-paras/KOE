from rest_framework import pagination as rest_pagination

class CursorPagination(rest_pagination.CursorPagination):
    """
    Cursor pagination based on created at field
    """
    ordering = '-created_at'
