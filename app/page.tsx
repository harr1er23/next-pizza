import { Container, Title, Categories } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-6">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />

        <Categories />
      </Container>
    </>
  );
}
