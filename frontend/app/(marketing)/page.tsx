import { api } from "@/lib/api";

const testApi = await api('/')

export default function Home() {
  return (
    <code><pre>{testApi.message}</pre></code>
  );
}
