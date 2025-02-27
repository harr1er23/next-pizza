import { Container, Filters, ProductsGroupList, Title, TopBar } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-6">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />

      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пиццы" categoryId={1} items={[{
                id: 1,
                name: "Чизбургер-пицца",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif",
                price: 499,
                items: [{price: 499}]
              },
              {
                id: 2,
                name: "Маргарита",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif",
                price: 550,
                items: [{price: 550}]
              },
              {
                id: 3,
                name: "Гавайская",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d617e9339cfb185921a343ad8fd.avif",
                price: 450,
                items: [{price: 450}]
              },
              {
                id: 4,
                name: "Четыре сезона",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d611adf5aad898b8b651186e023.avif",
                price: 490,
                items: [{price: 490}]
              }
              ]}/>
              <ProductsGroupList title="Завтрак" categoryId={1} items={[{
                id: 1,
                name: "Чизбургер-пицца",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/0194491914e478b4aa3e18d44e07eed9.avif",
                price: 499,
                items: [{price: 499}]
              },
              {
                id: 2,
                name: "Маргарита",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d6105ef6690b86fbde6150b5b0c.avif",
                price: 550,
                items: [{price: 550}]
              },
              {
                id: 3,
                name: "Гавайская",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d617e9339cfb185921a343ad8fd.avif",
                price: 450,
                items: [{price: 450}]
              },
              {
                id: 4,
                name: "Четыре сезона",
                imageUrl: "https://media.dodostatic.net/image/r:292x292/11ee7d611adf5aad898b8b651186e023.avif",
                price: 490,
                items: [{price: 490}]
              }
              ]}/>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
