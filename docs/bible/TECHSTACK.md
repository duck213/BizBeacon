기술 스택 정의서 (Tech Stack Definition):

1. 수집 및 비전 엔진: Playwright / Scrapy를 조합한 분산 크롤러 환경과, 이미지 및 문서 내 텍스트의 구조적 의미까지 종합 판독하는 OCR(Tesseract/EasyOCR/Google Cloud Vision) 및 GPT-4o Multimodal Vision API 파이프라인 설계.

---

2. 자연어 처리 및 RAG 인프라: 정교한 손익 분석과 보고 초안을 기안하기 위한 대형 언어 모델(GPT-4o, gpt-4-turbo)을 주축으로 하며, 과거 기획서나 로드맵 등 사내 내부 지식 데이터베이스와 실시간 뉴스를 대조 분석하기 위해 LangChain 및 Supabase Vector DB를 사용한 RAG 시스템 구성.

---

3. 백엔드/데이터베이스: 비동기 처리에 특화된 FastAPI와 관리가 용이한 Django 프레임워크를 이중화하며, 새벽 크롤링 대량 작업 제어를 위해 Celery + Redis를 스케줄러로 채택. 대량의 메타데이터와 히스토리 관리를 위해 관계형 DB인 PostgreSQL 사용.

---

4. 프론트엔드 및 인프라: 모던 대시보드 구성을 위한 Next.js(React)와 데이터 시각화를 위한 Recharts 활용. 안정적인 엔터프라이즈 보안 및 쉬운 리포트 배포를 위해 Docker 콘테이너 및 Vercel 클라우드 인프라 아키텍처 제시.
