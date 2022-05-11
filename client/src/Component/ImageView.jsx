import { Image } from 'antd';
import React, { useState } from 'react';

function ImageView({img}) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Image
                preview={{ visible: false }}
                width={200}
                src={img}
                onClick={() => setVisible(true)}
            />
            <div style={{ display: 'none' }}>
                <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                    <Image src={img} /> 
                </Image.PreviewGroup>
            </div>
        </>
    );
}

export default ImageView;