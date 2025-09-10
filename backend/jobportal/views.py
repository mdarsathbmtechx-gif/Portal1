# jobportal/views.py
from django.views.generic import View
from django.http import HttpResponse
import os

class FrontendAppView(View):
    def get(self, request, *args, **kwargs):
        try:
            with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                "React build not found. Run `npm run build` in your frontend folder.",
                status=501,
            )
