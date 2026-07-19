import uuid
from django.db import models

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=100)
    preferences = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'USERS'

class SearchHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='search_histories')
    keyword = models.CharField(max_length=255)
    search_type = models.CharField(max_length=50) # keyword, url, competitor
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'SEARCH_HISTORIES'

class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    impact_score = models.DecimalField(max_digits=4, decimal_places=2) # e.g. 1~10.00
    summary = models.TextField()
    chart_data = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'REPORTS'

class Draft(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='drafts')
    target_role = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'DRAFTS'

class Competitor(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='competitors')
    comp_name = models.CharField(max_length=255)
    threat_level = models.CharField(max_length=50) # High, Medium, Low
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'COMPETITORS'

class ScrapingTask(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    domain = models.CharField(max_length=255)
    status = models.CharField(max_length=50) # pending, processing, completed
    task_type = models.CharField(max_length=50) # html, ocr
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'SCRAPING_TASKS'

class Notification(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    noti_type = models.CharField(max_length=50) # alert, report, system
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'NOTIFICATIONS'
