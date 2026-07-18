# BizBeacon DB ERD Specification

본 문서는 `API_SPEC.md` 및 `FUNCTIONS.md` 요구사항을 바탕으로 작성된 백엔드 데이터베이스 ERD(Entity-Relationship Diagram) 명세서입니다.

## 1. ERD (Mermaid)

```mermaid
erDiagram
    USERS ||--o{ SEARCH_HISTORIES : "has"
    USERS ||--o{ NOTIFICATIONS : "receives"
    REPORTS ||--o{ DRAFTS : "generates"
    REPORTS ||--o{ COMPETITORS : "analyzes"

    USERS {
        uuid id PK
        string email UK
        string name
        string role "직종"
        json preferences "테마/알림 설정"
        datetime created_at
    }

    SEARCH_HISTORIES {
        uuid id PK
        uuid user_id FK
        string keyword
        string search_type "keyword, url, competitor"
        datetime created_at
    }

    REPORTS {
        uuid id PK
        string title
        float impact_score "1~10점"
        text summary
        json chart_data
        datetime created_at
    }

    COMPETITORS {
        uuid id PK
        uuid report_id FK
        string comp_name
        string threat_level "High, Medium, Low"
        datetime created_at
    }

    DRAFTS {
        uuid id PK
        uuid report_id FK
        string target_role "직무 맞춤형 시각"
        text content "기안서 초안"
        datetime created_at
    }

    SCRAPING_TASKS {
        uuid id PK
        string domain
        string status "pending, processing, completed"
        string task_type "html, ocr"
        datetime created_at
    }

    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        string noti_type "alert, report, system"
        text message
        boolean is_read
        datetime created_at
    }
```

## 2. 테이블 상세 명세

| 테이블명 (Table) | 컬럼명 (Column) | 데이터 타입 (Type) | 필수 (Not Null) | 관계 (Relations) |
| :--- | :--- | :--- | :--- | :--- |
| **USERS** | `id` (PK)<br>`email`<br>`name`<br>`role`<br>`preferences`<br>`created_at` | UUID<br>VARCHAR<br>VARCHAR<br>VARCHAR<br>JSON<br>DATETIME | Y<br>Y<br>Y<br>Y<br>N<br>Y | 1:N with `SEARCH_HISTORIES`<br>1:N with `NOTIFICATIONS` |
| **SEARCH_HISTORIES** | `id` (PK)<br>`user_id` (FK)<br>`keyword`<br>`search_type`<br>`created_at` | UUID<br>UUID<br>VARCHAR<br>VARCHAR<br>DATETIME | Y<br>Y<br>Y<br>Y<br>Y | Belongs to `USERS` |
| **REPORTS** | `id` (PK)<br>`title`<br>`impact_score`<br>`summary`<br>`chart_data`<br>`created_at` | UUID<br>VARCHAR<br>DECIMAL<br>TEXT<br>JSON<br>DATETIME | Y<br>Y<br>Y<br>Y<br>N<br>Y | 1:N with `DRAFTS`<br>1:N with `COMPETITORS` |
| **DRAFTS** | `id` (PK)<br>`report_id` (FK)<br>`target_role`<br>`content`<br>`created_at` | UUID<br>UUID<br>VARCHAR<br>TEXT<br>DATETIME | Y<br>Y<br>Y<br>Y<br>Y | Belongs to `REPORTS` |
| **COMPETITORS** | `id` (PK)<br>`report_id` (FK)<br>`comp_name`<br>`threat_level`<br>`created_at` | UUID<br>UUID<br>VARCHAR<br>VARCHAR<br>DATETIME | Y<br>Y<br>Y<br>Y<br>Y | Belongs to `REPORTS` |
| **SCRAPING_TASKS** | `id` (PK)<br>`domain`<br>`status`<br>`task_type`<br>`created_at` | UUID<br>VARCHAR<br>VARCHAR<br>VARCHAR<br>DATETIME | Y<br>Y<br>Y<br>Y<br>Y | (독립 스케줄러 테이블) |
| **NOTIFICATIONS** | `id` (PK)<br>`user_id` (FK)<br>`noti_type`<br>`message`<br>`is_read`<br>`created_at` | UUID<br>UUID<br>VARCHAR<br>TEXT<br>BOOLEAN<br>DATETIME | Y<br>Y<br>Y<br>Y<br>Y<br>Y | Belongs to `USERS` |
