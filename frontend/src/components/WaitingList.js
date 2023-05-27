import WaitingListItem from './WaitingListItem';
import { Space, Table, Tag, Button } from 'antd';
import { BellFilled, CheckOutlined, DeleteFilled } from '@ant-design/icons'
import './WaitingList.css'
import { useEffect, useState } from 'react';

const testDatas = [
    {waitReqId: 'aaa', waitingNumber:12, lineUserId:'ruby', isWaiting:true, status:'late', groupSize:2, requestMadeTime:'18:00', requestAnsweredTime: '18:05', arriveTime: undefined, cancelTime: undefined},
    {waitReqId: 'bbb', waitingNumber:13, lineUserId:'minmin', isWaiting:true, status:'notified', groupSize:2, requestMadeTime:'18:16', requestAnsweredTime: '18:25', arriveTime: undefined, cancelTime: undefined},
    {waitReqId: 'ccc', waitingNumber:14, lineUserId:'abc', isWaiting:true, status:'pending', groupSize:4, requestMadeTime:'18:20', requestAnsweredTime: undefined, arriveTime: undefined, cancelTime: undefined},
    {waitReqId: 'ddd', waitingNumber:15, lineUserId:'morris', isWaiting:false, status:'arrived', groupSize:4, requestMadeTime:'17:00', requestAnsweredTime: '17:10', arriveTime: '17:20', cancelTime: undefined},
    {waitReqId: '1aa', waitingNumber:12, lineUserId:'ruby', isWaiting:true, status:'late', groupSize:2, requestMadeTime:'18:00', requestAnsweredTime: '18:05', arriveTime: undefined, cancelTime: undefined},
    {waitReqId: '2bb', waitingNumber:13, lineUserId:'minmin', isWaiting:true, status:'notified', groupSize:2, requestMadeTime:'18:16', requestAnsweredTime: '18:25', arriveTime: undefined, cancelTime: undefined},
    {waitReqId: '3cc', waitingNumber:14, lineUserId:'abc', isWaiting:true, status:'pending', groupSize:4, requestMadeTime:'18:20', requestAnsweredTime: undefined, arriveTime: undefined, cancelTime: undefined},
    {waitReqId: '4dd', waitingNumber:15, lineUserId:'morris', isWaiting:false, status:'arrived', groupSize:4, requestMadeTime:'17:00', requestAnsweredTime: '17:10', arriveTime: '17:20', cancelTime: undefined},
    {waitReqId: '5aa', waitingNumber:12, lineUserId:'ruby', isWaiting:true, status:'late', groupSize:2, requestMadeTime:'18:00', requestAnsweredTime: '18:05', arriveTime: undefined, cancelTime: undefined},
    {waitReqId: '6bb', waitingNumber:13, lineUserId:'minmin', isWaiting:true, status:'notified', groupSize:2, requestMadeTime:'18:16', requestAnsweredTime: '18:25', arriveTime: undefined, cancelTime: undefined},
    {waitReqId: '7cc', waitingNumber:14, lineUserId:'abc', isWaiting:true, status:'pending', groupSize:4, requestMadeTime:'18:20', requestAnsweredTime: undefined, arriveTime: undefined, cancelTime: undefined},
    {waitReqId: '8dd', waitingNumber:15, lineUserId:'morris', isWaiting:false, status:'arrived', groupSize:4, requestMadeTime:'17:00', requestAnsweredTime: '17:10', arriveTime: '17:20', cancelTime: undefined},
]
// waitingNumber, lineUserId, status, groupSize, requestMadeTime, requestAnsweredTime, arriveTime, cancelTime


const clickNotification = (waitReqId) => {
    console.log("clickNotification, waitReqId", waitReqId);
}

const clickCheck = (waitReqId) => {
    console.log("clickCheck, waitReqId", waitReqId);
}

const clickDelete = (waitReqId) => {
    console.log("clickDelete, waitReqId", waitReqId);
}

const clickClear = () => {
    console.log("clickClear");
}

const clickRemoveAll = () => {
    console.log("clickRemoveAll");
}

const WaitingList = () => {
    const columns = [
        {
            title: '候位編號',
            dataIndex: 'waitingNumber',
            key: 'waitingNumber',
        },
        {
            title: '人數',
            dataIndex: 'groupSize',
            key: 'groupSize',
        },
        {
            title: '候位時間',
            dataIndex: 'requestMadeTime',
            key: 'requestMadeTime',
        },
        {
            title: '通知時間',
            dataIndex: 'requestAnsweredTime',
            key: 'requestAnsweredTime',
        },
        {
            title: '狀態',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'blue';
                let word = '';
                if(status === 'pending'){
                    color='blue';
                    word='尚未叫號';
                }else if(status === 'notified'){
                    color='orange';
                    word='已叫號';
                }else if(status === 'late'){
                    color='red';
                    word='逾時';
                }else if(status === 'arrived'){
                    color='green';
                    word='已入座';
                }else if(status === 'removed'){
                    word='老闆取消';
                }else if(status === 'canceled'){
                    word='顧客取消';
                }
                return (
                    <Tag bordered={false} color={color} key={status}>
                        {word}
                    </Tag>
                );
                
            }
        },
        {
            title: '計時',
            dataIndex: ['requestAnsweredTime', 'arriveTime'],
            key: 'test',
            render: (text, row) => {
                return (
                    // row["arriveTime"] !== undefined ?
                    // arriveTime/cancelTime/removeTime都要檢查
                    //     <div>{row["requestAnsweredTime"]+row["arriveTime"]}</div> :
                    // <div>{ now }</div>
                    <div>test</div>
                )
            }
        },
        {
            title: '',
            dataIndex: 'waitReqId',
            key: 'buttons',
            render: (waitReqId) => {
                return (
                    <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '1.2rem',
                        }}
                    >
                      <BellFilled style={{ fontSize: '20px' }} onClick={() => clickNotification(waitReqId) } key={'Notification'+waitReqId}/>
                      <CheckOutlined style={{ fontSize: '20px' }} onClick={() => clickCheck(waitReqId) } key={'Check'+waitReqId}/>
                      <DeleteFilled style={{ fontSize: '20px' }} onClick={() => clickDelete(waitReqId) } key={'Delete'+waitReqId}/>
                    </div>
                );
            }
        },
    ]
    
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
            return ;
        }, 30000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            {/* {
                testDatas.map((item, id) => {
                    return (<WaitingListItem item={item} key={`waiting-list-item-${id}`} />)
                })
            } */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                gap: '1.2rem',
                padding: '0.8rem'
            }}>
                <Button danger onClick={clickClear}>刪除已完成</Button>
                <Button danger onClick={clickRemoveAll}>刪除全部</Button>
            </div>
            
            <Table columns={columns} dataSource={testDatas} rowClassName={row => !row.isWaiting && "disabled-row"} pagination={{ pageSize: 50 }} scroll={{y: 450}}/>
        </div>
    );
}

export default WaitingList;