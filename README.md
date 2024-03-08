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

- src > app > layout
  1. 기본적인 틀을 보여줌
  2. html, body태그 생성
  3. 공통되는 부분은 이곳에 작성하는 것이 좋음 (ex)제목
- src > app > page
  1. body내부의 main 태그 생성
  2. layout.js의 {children}의 내용

### Routing

- a.com : domain
- /dashboard : segment
- /analytics : segment
- /dashboard/analytics/ : path
- 라우팅 : 경로(path)에 따라 어떤 컨텐츠를 어떻게 보여줄지 결정
- / : 초기값 home = app/page.js

- 경로에 맞는 폴더와 파일을 만들어서 라우팅
- 경로에 맞는 폴더의 page.js파일을 가장 처음 만나는 layout.js의 children으로 들어감, 같은 폴더에 layout.js가 없다면 상단 폴더에서 찾고, 있다면 해당 layout에 포함시키고 그 전체를 부모의 layout에 포함시킴

```js
// a.com/create
// src/app/create/page.js
export default function Create() {
  return <>Create!</>;
}

//src/app/create/layout.js
export default function Layout(props) {
  return (
    <form>
      <h2>Create</h2>
      {props.children}
    </form>
  );
}
```

- 다이나믹 라우팅: id값에 따라 주소가 변할 때

```js
// app/read/[id]/page.js
export default function Read(props) {
  return (
    <>
      <h2>Read</h2>
      id: {props.params.id}
    </>
  );
}
```
