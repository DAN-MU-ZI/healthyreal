## 브랜치 네이밍 컨벤션

브랜치는 다음과 같은 네이밍 컨벤션을 따릅니다:

```
<타입>/<이슈번호-설명>
```

### 타입
- **feature**: 새로운 기능 개발
- **bugfix**: 버그 수정
- **hotfix**: 긴급한 버그 수정
- **release**: 릴리즈 준비
- **refactor**: 코드 리팩토링
- **test**: 테스트 추가 또는 수정
- **docs**: 문서 작업
- **chore**: 기타 작업 (예: 빌드 스크립트 수정)

### 예시
- `feature/123-user-authentication`: 사용자 인증 기능 개발 (#123)
- `bugfix/456-password-encryption-error`: 비밀번호 암호화 오류 수정 (#456)
- `hotfix/789-critical-login-issue`: 긴급 로그인 문제 수정 (#789)
- `release/1.0.0`: 버전 1.0.0 릴리즈 준비
- `refactor/1011-database-access-layer`: 데이터베이스 접근 레이어 리팩토링 (#1011)
- `test/1213-add-user-service-tests`: 사용자 서비스 테스트 추가 (#1213)
- `docs/1415-update-readme`: README 파일 업데이트 (#1415)
- `chore/1617-cleanup-unused-files`: 사용되지 않는 파일 정리 (#1617)


## 커밋 메시지 컨벤션

커밋 메시지는 다음과 같은 형식을 따릅니다:

```
<타입>(<옵션>): <설명>
```

### 타입
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 스타일 변경 (포매팅, 세미콜론 누락 등)
- **refactor**: 코드 리팩토링 또는 성능 개선 (기능 변화 없음)
- **test**: 테스트 추가 또는 수정
- **build**: 빌드 관련 변경사항 (빌드 시스템, 외부 종속성 등)
- **ci**: CI 설정 파일 및 스크립트 변경
- **chore**: 기타 변경사항 (빌드 업무, 관리자 업무 등)
- **revert**: 이전 커밋 되돌리기

### 예시
- feat: 사용자 로그인 기능 추가
- fix: 비밀번호 암호화 오류 수정
- docs: README.md 파일 업데이트
- style: 코드 포매팅 수정
- refactor: 데이터베이스 접근 로직 리팩토링
- refactor: 데이터 조회 성능 개선
- test: 사용자 서비스 테스트 코드 추가
- build: Maven 빌드 설정 수정
- ci: GitHub Actions 워크플로우 설정 추가
- chore: 불필요한 파일 삭제
- revert: "feat: 사용자 로그인 기능 추가" 커밋 되돌리기

### 본문 (선택 사항)
- 더 자세한 설명이 필요할 때 본문을 추가할 수 있습니다.
- 본문은 제목 아래에 한 줄을 비우고 작성합니다.

### 본문 예시
```
feat: 사용자 로그인 기능 추가

사용자 로그인 기능을 추가했습니다.

JWT를 사용하여 토큰 기반 인증 구현
로그인 실패 시 에러 메시지 반환
```

## 코드 포매터

이 프로젝트에서는 [네이버 Java 코드 포매터](https://naver.github.io/hackday-conventions-java/)를 따릅니다. 이를 IntelliJ에 자동으로 적용하도록 설정하는 방법은 다음과 같습니다.

### IntelliJ에 네이버 코드 포매터 설정하기

1. **네이버 코드 포매터 XML 다운로드**
   - [네이버 코드 포매터 XML 파일](https://github.com/naver/hackday-conventions-java/blob/master/rule-config/naver-eclipse-formatter.xml)을 다운로드합니다.

2. **IntelliJ에 XML 파일 가져오기**
   - IntelliJ를 열고, 상단 메뉴에서 `File` > `Settings` (또는 `Preferences` on macOS)를 클릭합니다.
   - `Editor` > `Code Style` > `Java`로 이동합니다.
   - 우측 상단의 `톱니바퀴` 버튼을 클릭하고, `Import Scheme` > `Eclipse XML profile`을 선택합니다.
   - 다운로드한 `naver-eclipse-formatter.xml` 파일을 선택합니다.

3. **코드 스타일 설정 적용**
   - 적용된 코드 스타일을 선택하고, `OK` 버튼을 클릭하여 설정을 저장합니다.

### 프로젝트에 코드 스타일 설정 파일 추가

프로젝트 내에서 모든 기여자들이 동일한 코드 스타일을 사용할 수 있도록 코드 스타일 설정 파일을 프로젝트에 포함시킵니다.

### Reformat Code 및 Optimize Imports 설정

- IntelliJ를 열고, 상단 메뉴에서 File > Settings (또는 Preferences on macOS)를 클릭합니다.
- Tools > Actions on Save로 이동합니다.
- "Reformat code" 및 "Optimize imports" 옵션을 선택합니다.
- OK 버튼을 클릭하여 설정을 저장합니다.

이제 IntelliJ에서 파일을 저장할 때마다 자동으로 코드 포맷팅과 import 최적화가 수행됩니다.

## 기술 스택

### 주요 프레임워크 및 라이브러리
- **Spring Boot**: 3.3.1
  - 애플리케이션 프레임워크
- **Spring Web**: Spring Boot Starter
  - 웹 애플리케이션 개발을 위한 MVC 프레임워크
- **Spring Data JPA**: Spring Boot Starter
  - 데이터 액세스 레이어를 위한 JPA 구현
- **Spring Security**: Spring Boot Starter
  - 애플리케이션 보안
- **Spring OAuth2 Client**: Spring Boot Starter
  - OAuth2 클라이언트 구현
- **SpringDoc OpenAPI**: 2.6.0
  - OpenAPI 3 문서화를 위한 라이브러리
- **JWT (JSON Web Tokens)**: 0.12.3
  - 사용자 인증 및 권한 부여
- **Lombok**
  - 반복적인 코드 생성을 줄여주는 라이브러리

### 데이터베이스
- **H2 Database**
  - 인메모리 데이터베이스 (개발 환경)
- **MySQL**
  - 프로덕션 데이터베이스