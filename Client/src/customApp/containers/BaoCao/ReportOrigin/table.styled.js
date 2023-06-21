import styled from 'styled-components'
import { Col } from 'antd'

const Wrapper = styled.div` 
    flex-basis: 100%;
    height: 100%;
    .visible {
        display: none;
    }
    .wrapperLoading {
      background : rgba(255,255,255,0.5);
      position: absolute;
      top: 70px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
        p {
            text-align: left;
        }
        .disabled-rowItem {
            display: none;
        }
        .wrapper__table {
            max-height: 630px;
            overflow-y: scroll;
            width: calc(100% + 5px);
            /* box-shadow : 0px 1px 0px 0px black; */
        }
        /* table, th, td {
            border: 1px solid black;
            border-color: #000000;
        } */
        #my-table {
            table-layout: fixed;
            /* width: 100%; */
            width : ${props => props.TableWidth}
    
        }
        div.wrapper-table {
            /* max-height: 550px; */
        }
        tbody tr {
            border: 1px solid;
            border-color: #000000;
            height: 50px;
        }
        tbody   .trHover:hover {
            background-color: #e6e6e6;
            cursor: pointer;
            input {
                background-color: #e6e6e6 !important;
            }
        }
        tbody input {
            width: 100%;
            border: none;
            outline: none;
        }
        table {
            border-collapse: collapse;
            /* height: 100%; */
            table-layout: fixed;
            /* max-height: 300px; */
        }
        th {
            font-size: 12px;
        }
        thead {
            z-index: 222;
            background: #fff;
            position: sticky;
            top: 0px;
        }
        thead th {
            padding: 10px;
            border: 1px solid;
            border-color: #000000;
            /* display:table; */
            /* table-layout:fixed; */
            box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
        }
        tbody th {
            border: 1px solid;
            border-color: #000000;
            word-break : break-all
            /* border-left: 1px solid;
             */
        }
        tbody td  {
            border: 1px solid;
            border-color: #000000;
        }
        /* thead,tbody { display: block; } */

        tbody {
         
            overflow-y: auto;    /* Trigger vertical scroll    */
            overflow-x: hidden;  /* Hide the horizontal scroll */
            border-collapse: collapse;
            width: 100%;
            table-layout: fixed;
        }
        table thead th {
            border-top: none !important;
            border-bottom: none !important;
            box-shadow: inset 0 -1px 0 #000000, inset 0 1px 0 #000000;
            font-size: 15px;
            height: 50px;
  /* padding: 2px 0; */
        }

`

export const ColCustom = styled(Col)` 
background: white;
border-radius: 8px;
height: 100%;
min-width: 30%;
/* margin-left:20px ; */
/* margin: 10px; */
display: flex;

.file-items{
    /* background: white; */
    position: relative;
    padding: 10px;
    display: flex;
    /* margin: auto; */
}
.file-items__info{
    /* padding:10px; */
}
.file-items__image{
    margin-top: 10px;
}
.file-items__type {
    margin-top: 3px;
    /* border: 2px solid red; */
    /* border-radius: 5px 5px 5px 5px; */
}
.file-items__desc{
    margin-top: 10px;

}
.file-items__ion{
    position: absolute;
    top: 15px;
    right: 10px;
}

`


export default Wrapper