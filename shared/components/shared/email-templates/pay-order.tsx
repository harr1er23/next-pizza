interface Props {
    fullName: string;
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
}

export const PayOrderTemaplate: React.FC<Props> = ({
    orderId,
    fullName,
    totalAmount,
    paymentUrl
}) => (
    <div>
        Уважаемый, {fullName}, благодарим за оформление <h1>заказа №{orderId} на нашем сайте!</h1>

        <p>Ваш заказ на сумму {totalAmount} ₽ ожидает оплаты. Перейдите по <a href={paymentUrl}>ссылке</a> для оплаты.</p>
    </div>
)