'use client'
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetailes.module.css";


export default function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
const { data, isLoading, error } = useQuery({
  queryKey: ["note", id],
  queryFn: () => fetchNoteById(id),
  enabled: !!id,
  refetchOnMount: false,
})

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data?.title}</h2>
        </div>
        <p className={css.content}>{data?.content}</p>
        <p className={css.date}>{data?.createdAt}</p>
      </div>
    </div>
  );
}
