
import { Button, Card, Typography } from 'antd';
import React from 'react'; 
import { formatDDMMYY } from '../Action/func';

function Experience({data}) { 
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
                            <Title level={5}>{e.company}</Title>
                            <Typography><strong>Nghiệp vụ: </strong>{e.description}</Typography>
                            <Typography><strong>Địa chỉ: </strong>{e.location}</Typography>
                            <Typography><strong>Thời gian: </strong>{formatDDMMYY(e.from)} - {e.current ? 'Bây giờ' : e.to}</Typography> 
                        </Card>
                    ))
                    }
                    <br/>
                     <Button>Add new experience</Button>
                    </>
                :
                <Button>Add new experience</Button>
            } 
        </>
    );
}

export default Experience;