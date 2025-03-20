interface Props {
    code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => (
    <div>
        <p>Код подтверждения: <b>{code}</b></p>

        <p>
            <a href="http://localhost:3000/api/auth/verify?code={$code}">Подтвердить регистрацию</a>
        </p>
    </div>
)