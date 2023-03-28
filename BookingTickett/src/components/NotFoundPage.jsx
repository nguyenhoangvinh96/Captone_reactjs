import React from 'react';

const NotFoundPage = () => {
    return (
        <div className='mt-3 flex justify-center items-center text-center'>

            <div>
                <h3 className=''>TRANG KHÔNG TỒN TẠI</h3>
                <img src="./assets/error.png" alt="404" width={500} class="animate-bounce" style={{ animationDuration: "2s" }}></img>
            </div>
        </div>
    );
};

export default NotFoundPage;