# BizBeacon RESTful API Specification

본 명세서는 `FUNCTIONS.md`에 명시된 핵심 기능(수집 레이어, AI 정제, 실행형 보고)과 프론트엔드 화면(대시보드, 리포트, 설정, 알림)에서 요구하는 데이터 구조를 바탕으로 작성된 백엔드 REST API 설계입니다.

## 1. Dashboard & Search (대시보드 및 검색)

| Domain | Method | Endpoint | Description | Request Body (JSON) | Response Body (JSON) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Search** | `GET` | `/api/v1/search/history` | 최근 30일 간의 검색 및 분석 히스토리 목록 조회 | - | `[{ "id": "1", "keyword": "Q1 Tech Trends", "date": "2024-03-01" }, ...]` |
| **Search** | `POST` | `/api/v1/search` | 신규 키워드, 경쟁사, URL 심층 분석 요청 (수집 레이어 트리거) | `{ "keyword": "Retail AI", "type": "keyword" }` | `{ "taskId": "task_123", "status": "processing" }` |
| **Dashboard** | `GET` | `/api/v1/dashboard/summary` | 대시보드 요약 정보(트렌드 알림, 경쟁사 동향, 시장 심리) 조회 | - | `{ "trendAlert": {...}, "competitorIntel": {...}, "marketSentiment": {...} }` |

## 2. Analysis & Report (AI 분석 및 정제 모듈)

| Domain | Method | Endpoint | Description | Request Body (JSON) | Response Body (JSON) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Analysis** | `GET` | `/api/v1/reports/:reportId` | 분석 리포트 상세 데이터 (Business Impact Score 1~10점 포함) | - | `{ "title": "...", "impactScore": 9.2, "summary": "...", "chartData": [...], "competitors": [...] }` |
| **Analysis** | `POST` | `/api/v1/reports/:reportId/draft` | 예비 대안 시나리오 및 맞춤형 기안서 초안 자동 생성 | `{ "role": "Strategic Planning" }` | `{ "draftId": "d_123", "content": "..." }` |
| **Analysis** | `POST` | `/api/v1/reports/:reportId/share` | 직무 영역별 맞춤형 시각(Role-Based View)으로 사내 협업툴 전송 | `{ "channels": ["slack", "email"] }` | `{ "success": true }` |

## 3. Data Collection (지능형 수집 레이어)

| Domain | Method | Endpoint | Description | Request Body (JSON) | Response Body (JSON) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Collection** | `POST` | `/api/v1/collect/trigger` | 타겟 도메인 단위 스크래핑(가격, 채용 공고 변화 등 센싱) 수동 트리거 | `{ "domain": "acmecorp.com" }` | `{ "status": "started" }` |
| **Collection** | `POST` | `/api/v1/collect/ocr` | 광고 배너 및 규제 공고문 속 이미지 텍스트 OCR 및 비전 AI 처리 | `FormData (image)` | `{ "text": "...", "extractedEntities": [...] }` |

## 4. Notifications (알림 및 데일리 리포트)

| Domain | Method | Endpoint | Description | Request Body (JSON) | Response Body (JSON) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Notify** | `GET` | `/api/v1/notifications` | 알림 센터 목록 (스코어 상승, 시스템 알림, 리포트 준비 등) 조회 | - | `[{ "id": "n1", "type": "alert", "message": "...", "read": false }]` |
| **Notify** | `PATCH` | `/api/v1/notifications/read` | 알림 일괄 읽음 처리 | `{ "notificationIds": ["n1", "n2"] }` | `{ "success": true }` |

## 5. Users & Settings (설정)

| Domain | Method | Endpoint | Description | Request Body (JSON) | Response Body (JSON) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Users** | `GET` | `/api/v1/users/profile` | 사용자 프로필 및 알림 수신 설정 조회 | - | `{ "name": "John Doe", "role": "Marketing", "preferences": {...} }` |
| **Users** | `PUT` | `/api/v1/users/profile` | 사용자 정보 및 데일리 리포트 이메일/슬랙 수신 설정 변경 | `{ "preferences": { "emailDaily": true, "slackAlerts": true } }` | `{ "success": true, "user": {...} }` |
