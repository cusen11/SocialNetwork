import { message } from "antd";

export const formatDAY = (date) =>{  
    let AllDay = new Date(date); 
    let minute = AllDay.getMinutes();
    let hours = AllDay.getUTCHours();
    let days = AllDay.getUTCDate();
    let month = AllDay.getUTCMonth() + 1; 
    let year = AllDay.getUTCFullYear();  
    
    
    let CurrentAllDay = new Date(); 
    let minuteCurrent = CurrentAllDay.getMinutes();
    let hoursCurrent = CurrentAllDay.getUTCHours();
    let daysCurrent = CurrentAllDay.getUTCDate();
    let monthCurrent = CurrentAllDay.getUTCMonth() + 1; 
    let yearCurrent = CurrentAllDay.getUTCFullYear();    
 
    let dayResult = `${minuteCurrent - minute} phút trước` ;
    if(yearCurrent > year){
        return dayResult = `${yearCurrent - year} năm trước`;
    }
    if(yearCurrent === year &&  monthCurrent > month){
        return dayResult = 'Ngày '+ AllDay.getDay() + '/' + AllDay.getMonth(); 
    }
    if(yearCurrent === year &&  monthCurrent === month && daysCurrent > days ){
        return dayResult = `${daysCurrent - days} ngày trước`;
    }
    if(yearCurrent === year &&  monthCurrent === month && daysCurrent === days && hoursCurrent > hours ){
        return dayResult = `${hoursCurrent - hours} giờ trước`;
    } 
    if(yearCurrent === year &&  monthCurrent === month && daysCurrent === days && hoursCurrent === hours && minuteCurrent === minute){
        return dayResult = `Vừa cập nhật`;
    }
    else{
        return dayResult;
    } 
}

export const formatDDMMYY = (date) =>{
    let AllDay = new Date(date);   
    return AllDay.getDay() + '/' + AllDay.getMonth()+1 + '/' + AllDay.getFullYear();
}

export const success = (content) => {
    message.success(content);
};
  
export  const error = (content) => {
    message.error(content);
};
  
export  const warning = (content) => {
    message.warning(content);
};
 