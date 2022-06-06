// 백엔드 서비스 주소를 설정하기 위한 파일
let backendHost;

//현재 브라우저의 domain name을 얻음
const hostname = window && window.location && window.location.hostname;

//현재 브랑저의 domain name이 localhost이면 아래 주소를 백엔드 서비스 주소로 설정함.
if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
} else {
  backendHost =
    "http://todoapp-backend20181008-dev2.ap-northeast-2.elasticbeanstalk.com";
}

export const API_BASE_URL = `${backendHost}`;
