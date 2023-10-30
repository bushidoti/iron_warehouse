import {Image} from "antd";
import {CircularProgress} from "@mui/material";

export const Loading = () => {
    return (
        <div className='grid place-items-center bg-gray-200 min-h-screen'>
            <div className='flex flex-col items-center m-5'>
                    <Image preview={false} src={require('../../assets/icon.png')}/>
                    <CircularProgress color="error" />
            </div>
        </div>
    )
}
