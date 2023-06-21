import styled from 'styled-components'
import { Button } from 'antd'


const Wrapper = styled.div`
    .wrapper-title {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 600;
        text-align: start;
        margin-bottom: 10px;
        color: black;
        
    }

    .wrapper-progress{
        /* width: 100%; */
        /* margin-bottom: 40px;
        font-size: 14px; */


    }
    .progress-item {
        display: flex;
        width: 100%;
        flex-direction:row;
        justify-content: space-between;
        /* background: red; */
        /* line-height: 75px; */
        /* font-size: 30px; */
    }
    .progress-circle{
        width: 3%;
        margin-bottom:40px;
    }
    .progress-title{
        width: 12%;
    }
    .progress-time {
        width: 10%;
    }
    .progress-user__update{
        width: 20%;
    }
    .progress-action{
        width: 25%;

    }
    .progress-opinion{
        width: 25%;

    }
`


export const But = styled(Button)`
width: 200px !important;
/* max-width: 200px ; */
background: #0f74e2;
`;




export default Wrapper