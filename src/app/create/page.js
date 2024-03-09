"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch("http://localhost:9999/topics", options)
          .then((resp) => resp.json())
          .then((res) => {
            const lastID = res.id;
            router.push(`/read/${lastID}`);
            router.refresh();
          });
      }}
    >
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <input type="text" name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value="create" />
      </p>
    </form>
  );
}
