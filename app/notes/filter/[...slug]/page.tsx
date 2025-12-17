import NotesClient from './Notes.client'

type Props = {
  params: Promise<{ slug?: string[] }>; 
};

export default async function FilterNotes({ params }: Props) {
  const { slug } = await params
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  return <NotesClient tag={tag} />;
}