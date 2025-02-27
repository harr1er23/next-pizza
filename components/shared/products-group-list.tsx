import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';


interface Props {
    title: string;
    categoryId: number;
    items: any[];
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = (
    {
        title,
        categoryId,
        items,
        className,
        listClassName
    }) => {
    return (
        <div className={className}>
            <Title text={title} size="lg" className='font-extrabold mb-5' />

            <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
                {items.map((item, idx) => (
                    <ProductCard 
                        key={item.id}
                        price={item.items[0].price}
                        {...item}/>
                ))}
            </div>
        </div>
    )
}