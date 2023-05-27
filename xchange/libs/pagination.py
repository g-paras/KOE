from collections import OrderedDict

from rest_framework import pagination as rest_pagination
from rest_framework import response as rest_response


class CursorPagination(rest_pagination.CursorPagination):
    """
    Cursor pagination based on created_at field
    """
    ordering = '-created_at'

    def get_next_cursor(self):
        """
        Method to get next cursor from next link
        """
        next_link = self.get_next_link()
        return next_link.split('?cursor=')[-1] if next_link else None

    def get_previous_cursor(self):
        """
        Method to get previous cursor from previous link
        """
        previous_link = self.get_previous_link()
        return previous_link.split('?cursor=')[-1] if previous_link else None

    def get_paginated_response(self, data):
        """
        Override `get_paginated_response` method of `CursorPagination`
        to send next & previous cursor instead of link 
        """
        return rest_response.Response(OrderedDict([
            ('next', self.get_next_cursor()),
            ('previous', self.get_previous_cursor()),
            ('results', data)
        ]))
