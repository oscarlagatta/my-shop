export interface serverErrorProps {
    message?:string;
}
export function ServerError(props: serverErrorProps) {
    const { message } = props;
    return (
        <div className="bg-red-800 text-white rounded-xl p-3 my-6">
            {message || 'A server error occurred'}
        </div>
    )
}