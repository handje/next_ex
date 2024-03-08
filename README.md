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

### 네트워크 관련 특징

- SSR지원: 브라우저 콘솔에서 js를 비활성화 시켜도 렌더링이 유지
- content만 변경되어도 전체 페이지가 리로딩되고, 이미 방문한 페이지도 기억 x => link사용하여 SinglePageApplication으로 생성

## backend

1. 백엔드로 이용하고 싶을 땐 Route Handlers참고하여 api로 생성 가능
2. json-server

1) npx json-server@0.17.4 --port 9999 --watch db.json

- port 9999
- db.json 생성 및 데이터 저장
- --watch : db.json이 변경되면 서버 동작

2. db.json
   "topics": [{ "id": 1, "title": "html", "body": "html is,,," }] 내용 추가 후 http://localhost:9999/topics 방문하면 json형태의 내용을 출력
3. 데이터 가져오기

- 브라우저의 개발자도구>console
- fetch('http://localhost:9999/topics').then((res)=>{return res.json();}).then(result=>{console.log(result)})

## SeverComponent, ClientComponet

- react18 에서 추가된 부분
- react18 이전에 분리되기 전에는 보통 Client Component를 구현
- 사용할수있는 api가 다름
  1. Server Component : secure data, cookie, header
  2. Client Component : useState,useEffect, onClick,onChange, useRouter,useParams
  3. 공통 : fetch
- 특별한 처리가 없으면 nextJS는 Server Component로 간주
- example
  [사진]

  1. Server Component : navbar,sidebar,main => 정보를 단순히 보여주는 기능
  2. Client Component : search, button => 사용자와 상호작용하는 기능

- 두 코드 비교

  1. ClientC

  - "use client"선언이 있어야함
  - fetching(서버에서 클라이언트로 데이터를 가져옴)의 시간이 오래 걸릴 수 있음 (비동기적 코드)
  - 자바스크립트가 disable일 경우 서버통신 부분은 실행되지 않음 (useEffect등)
  - 디비에 접속할 때, 코드에 보여줄 경우 보안의 문제가 생길 수 있음

  ```js
  "use client"; //선언이 없으면 server component로 인식하여 useState,useEffect 사용 x
  //meta data는 사용 x

  //데이터를 가져오는 부분
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9999/topics")
      .then((resp) => resp.json())
      .then((res) => {
        setTopics(res);
      });
  });

  //읽은 내용을 화면에 뿌리기
  {
    topics.map((topic) => {
      return (
        <li key={topic.id}>
          <Link href={`/read/${topic.id}`}>{topic.title}</Link>
        </li>
      );
    });
  }
  ```

2. ServerC

- 선언이 없으면 자동으로 Server Component
- 동기적으로 코딩 (async - await)
- 만들어진 결과를 저장해두고 정적인 내용을 전달(클라이언트로 js를 전달하지 않음) => 속도가 빠름

```js
export default async function RootLayout({ children }) {
  const resp = await fetch("http://localhost:9999/topics");
  const topics = await resp.json();
  //...
}
```

## READ

```js
export default async function Read(props) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`);
  const topic = await resp.json();
  //...
}
```

## Write

- options(method,header,body)를 포함하여 fetch
- router를 이용하여 생성된 후 보여지는 화면을 리디렉션

```js
  "use client"; //사용자와 상호작용(onSubmit)하는 기능이기 때문에
  import { useRouter } from "next/navigation";
  //...
  const router = useRouter();
  //...
   <form
      onSubmit={(event) => {
        event.preventDefault();
        const title=event.target.title.value;
        const body=event.target.title.body;

        //서버에 정보를 추가하기 위한 option
        const options={
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body:JSON.stringify({title,body}) //object->json문자열로
        }
          fetch("http://localhost:9999/topics", options)
          .then((resp) => resp.json())
          .then((res) => {
            const lastID = res.id;
            router.push(`/read/${lastID}`); //생성된 id의 내용으로 read
          });
      }}
    >

```
