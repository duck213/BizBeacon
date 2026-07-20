# BizBeacon 📊

**비즈니스 임팩트 분석과 C-Level의 신속한 의사결정 지원에 초점을 맞추어 가치를 극대화하는 AI 기반 인사이트 플랫폼**

---

## 🚀 Live Demo
**현재 Vercel에 배포되어 라이브로 동작 중입니다:**  
🔗 **[BizBeacon 접속하기](https://biz-beacon.vercel.app/)**

---

## 📖 1. 프로젝트 개요 (Introduction)

**Problem**  
매일 발행되는 수많은 경쟁사 뉴스와 정부 규제 속에서 '우리 회사에 진짜 필요한 정보'를 골라내기 어렵습니다. 또한 단순 요약된 정보만으로는 이것이 실제 비즈니스에 미칠 영향과 대응 방안을 즉각적으로 판단하기엔 한계가 있습니다.

**Target**  
정보 과부하 시대에서 리스크를 방어하고 새로운 기회를 선점하기 위해 빠른 의사결정이 필요한 기획 실무자 및 경영진(C-Level).

**Solution**  
LLM이 우리 비즈니스 상황과 키워드 간의 맥락을 이해하여 무관한 노이즈를 걸러냅니다. 뉴스 및 이슈별로 비즈니스 임팩트 점수를 도출하고, 직무별(전략, 영업 등) 대응 시나리오 초안을 생성하여 신속한 의사결정을 돕는 데일리 리포트를 발행합니다.

---

## ✨ 2. 핵심 기능 (Key Features)

1. **지능형 AI 분석 및 정제 모듈**
   - 쏟아지는 동일 이슈의 중복 기사를 단일 이슈 그룹으로 묶어 가독성 향상.
   - 키워드가 우리 비즈니스에 주는 영향도를 1~10점의 **정량적 스코어(Business Impact Score)**로 자동 환산 및 툴팁 제공.
2. **실행형 보고 및 분배 (Role-Based Insights)**
   - 대시보드에서 `전략기획`, `영업`, `마케팅` 등 직무(Role)를 선택하면 타겟 대상에게 완벽히 최적화된 시각으로 AI가 시장 분석 리포트를 맞춤 생성.
3. **오프라인 / 로컬 브라우저 저장 지원 (Fallback 시스템)**
   - 백엔드 서버 이슈 발생 시에도, 프론트엔드 내 브라우저 `LocalStorage`를 활용해 검색 분석 히스토리를 즉각적으로 저장 및 복구(Not Found 방지).

---

## 🛠 3. 기술 스택 (Tech Stack)

### Frontend
- **Framework**: Next.js (App / Pages Router 호환 적용)
- **UI & Styling**: React, Recharts (데이터 시각화), Material Symbols (아이콘)
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI (비동기 API 특화), Django (ORM 및 관리 툴)
- **AI & NLP**: OpenAI (gpt-4o), LangChain
- **Task Queue**: Celery + Redis
- **Database**: PostgreSQL (Supabase / Local)

> *참고: 초기 기획상 고려되었던 Scrapy, Playwright, Tesseract 등 크롤링/OCR 비전 모듈은 현재 페이즈에서는 걷어내고, LLM 중심의 핵심 비즈니스 분석 엔진 최적화에 집중하고 있습니다.*

---

## 📚 4. 아키텍처 및 설계 문서 안내 (Documentation)

개발 및 구조 변경 시 아래의 산출물 명세서를 참조하세요. (문서는 `/docs` 폴더 내에 위치합니다.)

- [API 명세서 보러가기 (API_SPEC.md)](./docs/design/API_SPEC.md)
- [데이터베이스 ERD 보러가기 (ERD.md)](./docs/design/ERD.md)
- [기능 정의서 보러가기 (FUNCTIONS.md)](./docs/bible/FUNCTIONS.md)

---

## 💻 5. 로컬 개발 환경 시작하기 (Getting Started)

프로젝트를 로컬에서 직접 구동하여 테스트하기 위한 방법입니다.

### Prerequisites
- Docker 및 Docker Compose
- Node.js (v18+)
- Python 3.11+ 및 `.venv` 설정

### 1단계: 백엔드 및 인프라 구동
프로젝트 최상단 폴더에서 Docker Compose를 사용해 Redis, PostgreSQL, FastAPI 백엔드 등을 일괄 실행합니다.
```bash
docker-compose up -d --build
```

### 2단계: 프론트엔드 구동
프론트엔드 디렉토리로 이동하여 개발 서버를 실행합니다.
```bash
cd frontend
npm install
npm run dev
```

### 3단계: 접속
브라우저를 열고 `http://localhost:3000` 에 접속하여 데모를 확인합니다. API 서버는 `http://localhost:8001`에서 동작합니다.
