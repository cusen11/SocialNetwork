import { Button, Card, Typography } from 'antd';
import React from 'react';
import { formatDDMMYY } from '../Action/func';

function Education({data}) {
    const { Title } = Typography
    return (
        <>
            {data.length > 0 ? 
                <>{
                    data.map((e,index) =>(
                    <Card
                    key={index}
                    title={<Title level={4}>{e.title}</Title>}
                    >
                        <Title level={5}>{e.school}</Title>
                        <Typography><strong>Khóa học / Chuyên nghành : </strong>{e.description}</Typography>
                        <Typography><strong>Bằng cấp / Chứng chỉ: </strong>{e.degree}</Typography>
                        <Typography><strong>Nghiệp vụ: </strong>{e.fieldofstudy}</Typography>
                        <Typography><strong>Thời gian: </strong>{formatDDMMYY(e.from)} - {e.current ? 'Bây giờ' : e.to}</Typography> 
                    </Card>
                ))
                }
                <br/>
                 <Button>Add new experience</Button>
                </>
                :
                <Button>Add new education</Button>
            }
        </>
    );
}

export default Education;