from django.shortcuts import render
from django.http import JsonResponse, HttpResponseNotAllowed
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMessage
from .forms import ContactForm
import json


def home(request):
    form = ContactForm()
    return render(request, 'myport/index.html', {'form': form})


@csrf_exempt
def submit_contact(request):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])

    try:
        data = json.loads(request.body)
        form = ContactForm(data)

        if not form.is_valid():
            return JsonResponse({'status': 'error', 'message': 'Invalid input fields'}, status=400)

        # Save message to DB
        contact = form.save()

        # Send email to you
        admin_email = EmailMessage(
            subject=f"📩 New message from {contact.name}: {contact.subject or 'No Subject'}",
            body=f"Name: {contact.name}\nEmail: {contact.email}\n\nMessage:\n{contact.message}",
            from_email="svelan004@gmail.com",
            to=["svelan004@gmail.com"],
            reply_to=[contact.email],
        )
        admin_email.send(fail_silently=False)

        # Send confirmation email to sender
        html_body = f"""
        <html>
          <body style="font-family: Arial; color: #333;">
            <h2 style="color: #4CAF50;">✅ Message Received!</h2>
            <p>Hello <strong>{contact.name}</strong>,</p>
            <p>Thanks for contacting <strong>Sakthivelan</strong>! Your message has been received successfully.</p>
            <hr>
            <p style="font-size: 0.9em; color: #555;">
              — Sakthivelan<br>
              📧 <a href="mailto:svelan004@gmail.com">svelan004@gmail.com</a>
            </p>
          </body>
        </html>
        """
        confirm_email = EmailMessage(
            subject="✅ Thanks for contacting me!",
            body=html_body,
            from_email="svelan004@gmail.com",
            to=[contact.email],
        )
        confirm_email.content_subtype = "html"
        confirm_email.send(fail_silently=True)

        return JsonResponse({'status': 'success'})

    except json.JSONDecodeError:
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)
    except Exception as e:
        print("Email send error:", e)
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)
