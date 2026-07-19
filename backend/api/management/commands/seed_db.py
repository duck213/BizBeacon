from django.core.management.base import BaseCommand
from api.models import User, SearchHistory, Report, Draft, Competitor, ScrapingTask, Notification

class Command(BaseCommand):
    help = 'Seeds the database with mock data from the UI.'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')
        
        # 1. Create a User
        user, _ = User.objects.get_or_create(
            email='test@bizbeacon.com',
            defaults={
                'name': 'John Doe',
                'role': '전략기획',
                'preferences': {'emailDaily': True, 'slackAlerts': True}
            }
        )

        # 2. Create Search History
        histories = [
            {'keyword': 'Q1 Tech Trends', 'search_type': 'keyword'},
            {'keyword': 'Retail Growth', 'search_type': 'keyword'},
            {'keyword': 'SaaS Analysis', 'search_type': 'keyword'},
            {'keyword': 'Logistics AI', 'search_type': 'keyword'},
        ]
        for h in histories:
            SearchHistory.objects.get_or_create(
                user=user, keyword=h['keyword'], defaults={'search_type': h['search_type']}
            )

        # 3. Create Report (Dashboard Summary data can be fetched from this or related tables)
        report, created = Report.objects.get_or_create(
            title='AI Adoption in Retail',
            defaults={
                'impact_score': 8.50,
                'summary': 'Analysis indicates a 45% surge in automated inventory management solutions within mid-market retail sectors over the last quarter.',
                'chart_data': [10, 20, 30, 45, 60]
            }
        )

        report2, _ = Report.objects.get_or_create(
            title='Q1 Tech Trends Analysis',
            defaults={
                'impact_score': 9.20,
                'summary': 'The landscape of mid-market retail is experiencing a rapid shift towards AI-driven automation. Our analysis indicates a 45% surge in adoption over the last quarter...',
                'chart_data': [15, 25, 35, 50, 70]
            }
        )

        # 4. Create Competitors
        if created:
            Competitor.objects.create(report=report, comp_name='Acme Corp', threat_level='High')
            Competitor.objects.create(report=report, comp_name='Globex', threat_level='Medium')
        
        # 5. Create Notification
        Notification.objects.get_or_create(
            user=user,
            message='Impact score for Retail AI increased to 9.2',
            defaults={'noti_type': 'alert', 'is_read': False}
        )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))
