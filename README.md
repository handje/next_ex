# Next.js

=Full Stack Web Application FrameWork
(egoing강의 참고)

- 웹을 구현할 때 사용하는 여러 기술들을 섞어놓은 것(React+Express.js+React-Router-Dom+ServerSideRendering)
  =React로 만드는 서버사이드 렌더링 프레인 워크
- npx create-next-app@latest
- 명령어

  1. 개발환경 실행 npm run dev : react의 npm start와 같은 느낌
  2. 배포 파일 생성 npm run build : .next폴더에 배포를 위한 파일 생성
  3. 서비스 시작 npm run start : 배포 파일을 사용, nextjs는 서버가 포함된 솔루션이기에 실 서버를 실행

- src > app > layout 이 기본적인 틀을 보여줌 : html, body태그 생성
- src > app > page : main 태그 생성
