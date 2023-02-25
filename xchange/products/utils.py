import os

from products import constants as products_constants

def get_file_name(instance, filename):
    """
    Method to rename product image with its url-slug
    """
    ext = filename.split('.')[-1]
    filename = f"{instance.slug}.{ext}"
    return os.path.join(products_constants.IMAGE_FOLDER, filename)
