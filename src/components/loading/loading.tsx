import {Image, Spin} from "antd";

export const Loading = () => {
    return (
        <div className='grid place-items-center bg-gray-200 min-h-screen'>
            <div className='flex flex-col items-center m-5'>
                    <Image preview={false} src={require('./icon.png')}/>
                    <Spin size={"large"}/>
            </div>
        </div>
    )
}