import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <h1>Drop box</h1>

      <UserButton />
    </main>
  );
}
