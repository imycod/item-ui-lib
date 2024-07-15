/* eslint-disable */
// @ts-nocheck
import {reactive,ref} from "vue";
export default function useTable() {

    const tableData = ref([])

    const columns = reactive([
        {
            dataIndex: 'dataChannel',
            title: 'CHANNEL',
            width: 150,
        },
        {
            dataIndex: 'channelName',
            title: 'CHANNEL NAME',
            width: 150
        },
        {
            dataIndex: 'orderNo',
            slotName: 'orderIdUrl',
            title: 'ORDER NO',
            width: 150,
            sortable: {
                sortDirections: ['ascend', 'descend'],
                sorter: true
            }
        },
        {
            dataIndex: 'channelSalesOrderNumber',
            title: 'CHANNEL SALES ORDER NO',
            width: 180,
            sortable: {
                sortDirections: ['ascend', 'descend'],
                sorter: true
            }
        },
        {
            dataIndex: 'status',
            slotName: 'statusName',
            width: 173,
            title: 'STATUS'
        },
        {
            dataIndex: 'shipToAddress.name',
            title: 'RECIPIENT',
            width: 180,
        },
        {
            dataIndex: 'shipToAddress.country',
            title: 'COUNTRY',
            width: 180,
        },
        {
            dataIndex: 'purchaseOrderNo',
            title: 'PO NO',
            width: 173
        },
        {
            dataIndex: 'referenceNo',
            title: 'REFERENCE',
            width: 173
        },
        {
            dataIndex: 'carrier.name',
            title: 'CARRIER',
            width: 180,
            render: record => {
                if (!isEmpty(record.record.carrier)) {
                    return record.record.carrier.name
                }
                return ''
            }
        },
        {
            dataIndex: 'orderDate',
            title: 'ORDER DATE',
            width: 170,
            render: record => {
                if (!isEmpty(record.record.orderDate)) {
                    return formattedTime12Hour(record.record.orderDate)
                }
                return ''
            },
            sortable: {
                sortDirections: ['ascend', 'descend'],
                sorter: true
            }
        },
        {
            dataIndex: 'totalAmount',
            title: 'TOTAL',
            render: record => {
                if (!isEmpty(record.record.totalAmount)) {
                    return '$' + record.record.totalAmount
                }
                return ''
            },
            sortable: {
                sortDirections: ['ascend', 'descend'],
                sorter: true
            }
        },
        {
            dataIndex: 'shipDate',
            title: 'SHIPDATE',
            width: 180,
            render: record => {
                if (!isEmpty(record.record.shipDate)) {
                    return formattedTime12Hour(record.record.shipDate)
                }
                return ''
            }
        },
        {
            dataIndex: 'itemSku',
            title: 'PRODUCT',
            width: 180,
            slotName: 'itemSkuSlot'
        }
    ])

    return {
        columns,
        tableData
    }
}