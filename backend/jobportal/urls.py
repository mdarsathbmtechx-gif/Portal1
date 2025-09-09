from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
import os

from jobs.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Add your API routes here
]

# Serve React static files in development
if settings.DEBUG:
    urlpatterns += static('/assets/', document_root=os.path.join(settings.BASE_DIR, '../client/dist/assets'))

# Catch-all route for React (must be last!)
urlpatterns += [re_path(r'^.*$', FrontendAppView.as_view(), name='home')]
