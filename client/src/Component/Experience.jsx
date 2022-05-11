
import { Button } from 'antd';
import React from 'react'; 

function Experience({data}) { 
    return (
        <>
           {data.length > 0 ? 
                <ul>
                    {
                        data.map((e,index) =>(
                        <p key={index} >{e.title}</p>
                    ))
                    }
                </ul>
                :
                <Button>Add new experience</Button>
            } 
        </>
    );
}

export default Experience;