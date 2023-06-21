import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import BoxTable from '../../../../components/utility/boxTable';
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import Report from "../ReportOrigin";
import { Checkbox, DatePicker as DatePickerAnt, message, Modal, Tooltip } from 'antd';
import { RollbackOutlined } from '@ant-design/icons'
import dayjs from "dayjs";
// import DatePickerFormat from "../../../../components/uielements/datePickerFormat";
// import DatePickerFormat from "../../../../components/uielements/datePickerFormat";
import Datepicker from "../../../../components/uielements/datePicker";
import { Button, InputSearch, Select, Option } from '../../../../components/uielements/exportComponent';
import { WrapperReport } from '../HOC'
import actions from '../../../redux/BaoCao/BaoCao2A/action'
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import { changeUrlFilter, getFilterData } from "../../../../helpers/utility";
import moment from "moment";
import styled from "styled-components";
import api from "./config";
import {
    DatePicker as DatePickerFormat
  } from '../../../../components/uielements/exportComponent';

const Report2A = props => {
    const [filterData, setFilterData] = useState(queryString.parse(props.location.search))
    const [DanhSachCap, setDanhSachCap] = useState([])
    const [Step, setStep] = useState(1)
    const { ThongTinBaoCao, tableLoading } = useSelector(state => state.BaoCao2A)
    const [ThongTinBaoCaoChiTiet, setThongTinBaoCaoChiTiet] = useState({})
    const [loadingDetailsReport, setLoadingDetailsReport] = useState(false)
    const [DetailsReportPayload,setDetailsReportPayload] = useState({})


    const dispatch = useDispatch()


    useEffect(() => {
        const initFilter = {
            ...filterData,
            DenNgay: filterData.DenNgay ? filterData.DenNgay : moment().format('MM/DD/YYYY')
        }
        setFilterData(initFilter)
        api.DanhSachCapBaoCao().then(res => {
            if (res.data.Status > 0) {

                setDanhSachCap(res.data.Data)
            } else {
                message.destroy()
                message.warning(res.data.Message)
            }
        }).catch(err => {
            message.destroy()
            message.warning(err.toString())
        })
    }, [])



    useEffect(() => {
        changeUrlFilter(filterData);
        // dispatch(actions.getData(filterData))
    }, [filterData]);

    const onFilter = (value, property) => {
        let oldFilterData = filterData;
        let onFilter = { value, property };
        let newfilterData = getFilterData(oldFilterData, onFilter, null);
        setFilterData(newfilterData);
    };






    const handleCreateReport = () => {
        let ListCapIDStr = ""
        if (typeof filterData?.ListCapIDStr !== "string" && filterData?.ListCapIDStr) {
            filterData.ListCapIDStr.forEach((item, index) => {
                index === filterData.ListCapIDStr.length - 1 ? ListCapIDStr += item : ListCapIDStr += item + ","
            })
        } else {
            ListCapIDStr = filterData.ListCapIDStr
        }
        // console.log(filterData)
        // console.log({
        //         ...filterData,
        //         DenNgay : filterData?.DenNgay ? moment(filterData.DenNgay,'MM/DD/YYYY').format('YYYY/MM/DD') : '',
        //         TuNgay : filterData?.TuNgay ? moment(filterData.TuNgay,'DD/MM/YYYY').format('YYYY/MM/DD') : '',ListCapIDStr
        // })
        dispatch(actions.getData({
            ...filterData,
            // DenNgay : filterData?.DenNgay ? moment(filterData.DenNgay,'MM/DD/YYYY').format('YYYY/MM/DD') : '',
            //     TuNgay : filterData?.TuNgay ? moment(filterData.TuNgay,'DD/MM/YYYY').format('YYYY/MM/DD') : '',
            // DenNgay : filterData?.DenNgay ? moment(filterData.DenNgay,'YYYY/MM/DD').format('YYYY/MM/DD') : '',
            // TuNgay : filterData?.TuNgay ? moment(filterData.TuNgay,'YYYY/MM/DD').format('YYYY/MM/DD') : '',
            ListCapIDStr
        }))

    }


    let defaultSelectValue
    if (typeof filterData.ListCapIDStr === 'string') {
        defaultSelectValue = filterData && filterData.ListCapIDStr ? filterData?.ListCapIDStr.split(',').map(item => Number(item)) : []
    } else {
        defaultSelectValue = filterData?.ListCapIDStr ? filterData.ListCapIDStr : []
    }



    const GetChiTietDonThu = (CapID, Index, CoQuanID,key,PageNumber) => {
        const DenNgay = filterData?.DenNgay ? moment(filterData.DenNgay).format('YYYY/MM/DD') : ''
        const TuNgay = filterData?.TuNgay ? moment(filterData.TuNgay).format('YYYY/MM/DD') : ''
        let data = []
        setDetailsReportPayload({
            CapID,
            Index,
            CoQuanID
        })
        // console.log(key,'key')
        if(key === 'set'){
            setLoadingDetailsReport(true)
            console.log('handle sett')
            api.ChiTietDonThu({ DenNgay, TuNgay, CapID, Index, CoQuanID }).then(res => {
                setLoadingDetailsReport(false) 
               if (res.data.Status > 0) {
                    setThongTinBaoCaoChiTiet(res.data.Data)
               } else {
                   message.destroy()
                   message.warning(res.data.Message)
               }
           }).catch(err => {
               setLoadingDetailsReport(false)
               message.destroy()
               message.warning(err.toString())
           })
        }else if(key === 'get'){
            console.log('handle gett')
            api.ChiTietDonThu({ DenNgay, TuNgay, CapID, Index, CoQuanID,PageNumber }).then(res => {
                if (res.data.Status > 0) {
                    data = res.data.Data
                } else {
                    message.destroy()
                    message.warning(res.data.Message)
                }
           }).catch(err => {
               message.destroy()
               message.warning(err.toString())
           })
        }
        return key === 'get' ? data : []
    }

    function disabledDate(current) {
        // Can not select days before today and today
        return current && current.valueOf() > moment(filterData?.DenNgay, "MM/DD/YYYY")
    }


    const handleBackReport = () => {
        setStep(1)
        setThongTinBaoCaoChiTiet([])
    }


    return <ReportWrappper>
        <LayoutWrapper>
            <PageHeader>Báo cáo Tổng hợp kết quả thanh tra hành chính</PageHeader>
            <Box>
                <BoxFilter>
                    {
                        Step === 1 ?
                            <>
                                <Checkbox.Group
                                    onChange={value => onFilter(value, 'ListCapIDStr')}
                                    defaultValue={defaultSelectValue}
                                >
                                    {DanhSachCap.map(item => <Checkbox key={item.CapID} value={item.CapID}>{item?.TenCap}</Checkbox>)}
                                </Checkbox.Group>
                                <DatePickerFormat
                                    style = {{width : '200px'}}
                                    placeholder='Từ Ngày'
                                    value={filterData?.TuNgay ? dayjs(filterData?.TuNgay, 'MM/DD/YYYY') : null}
                                    format={'DD/MM/YYYY'}
                                    onChange={(value, valueString) => {
                                        return onFilter(valueString ? dayjs(valueString, 'DD/MM/YYYY').format('MM/DD/YYYY') : null, 'TuNgay')
                                    }}
                                    disabledDate={disabledDate}
                                >
                                </DatePickerFormat>
                                <DatePickerFormat
                                    style = {{width : '200px'}}
                                    value={filterData?.DenNgay ? dayjs(filterData?.DenNgay, 'MM/DD/YYYY') : null}
                                    format={'DD/MM/YYYY'}
                                    placeholder='Đến Ngày'
                                    onChange={(value, valueString) => {
                                        console.log(dayjs(valueString, 'DD/MM/YYYY').format('MM/DD/YYYY'));
                                        return onFilter(valueString ? dayjs(valueString, 'DD/MM/YYYY').format('MM/DD/YYYY') : null, 'DenNgay')
                                    }}
                                >

                                </DatePickerFormat>
                                <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
                            </>
                            : null
                    }
                    {Step === 2 ? <Button style={{ float: "right" }} onClick={handleBackReport}><RollbackOutlined /></Button> : ''}
                </BoxFilter>
                <div className="title-report">
                    <p>{ThongTinBaoCao?.Title}</p>
                </div>
                <div className="unit-report" dangerouslySetInnerHTML={{ __html: ThongTinBaoCao?.DonViTinh }}></div>
                {ThongTinBaoCao && ThongTinBaoCao.DataTable ? 
                <Report
                    setThongTinBaoCaoChiTiet={setThongTinBaoCaoChiTiet}
                    ThongTinBaoCaoChiTiet={ThongTinBaoCaoChiTiet}
                    DetailsReportPayload = {DetailsReportPayload}
                    loadingDetailsReport={loadingDetailsReport}
                    handleCreateReport={handleCreateReport}
                    GetChiTietDonThu={GetChiTietDonThu}
                    onRollBack={handleBackReport}
                    ThongTinBaoCao={ThongTinBaoCao}
                    tableLoading={tableLoading}
                    title="Báo cáo 2A"
                    setStep={setStep}
                    Step={Step}
                /> : null}
            </Box>
        </LayoutWrapper>
    </ReportWrappper>
}


const ReportWrappper = styled.div`
    .title-report {
        text-align: center;
        padding: 10px 0;
        p {
            font-size: 20px;
            font-weight: 600;
        }
    }
    .unit-report {
        text-align: right;
        padding: 5px 0;
        font-size: 15px;
        font-weight: 600;
    }
`


export default Report2A