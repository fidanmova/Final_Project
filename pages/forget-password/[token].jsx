import PageTemplate from "../../components/ui/PageTemplate";
import NewPass from "../../components/ui/auth/NewPass";
import { findTokenByIdAndType } from '../../utils/db/token';

const ResetPasswordToken = ({ valid, token }) => {
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed-Events">
            <NewPass valid={valid} token={token} />
        </PageTemplate>
    );
};

export async function getServerSideProps(context) {
    const db = await dbConnect();

    const tokenDoc = await findTokenByIdAndType(
        db,
        context.params.token,
        "passwordReset"
    );

    return { props: { token: context.params.token, valid: !!tokenDoc } };
}

export default ResetPasswordToken;
