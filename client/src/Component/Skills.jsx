import { Button } from 'antd';
import React from 'react';

function Skills({data}) {
    return (
        <>
          {data.length > 0 ? 
            <ul className='list-skill'>
                <strong>Skills: </strong>
                {
                    data.map((skill,index) =>(
                    <li key={index} >{skill}</li>
                ))
                }
            </ul>
            :
            ''
        }  
        </>
    );
}

export default Skills;