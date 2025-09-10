from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from jobportal.views import FrontendAppView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),  # Jobs API routes
  
    # React catch-all (must be last)
    re_path(r'^(?:.*)/?$', FrontendAppView.as_view(), name='frontend'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
