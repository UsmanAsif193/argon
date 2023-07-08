
const server = "http://localhost:8080"


export const APIS = {
    token_fed: server + '/fedexp_token',
    token_stamps: server + '/auth_stamps',
    token_micro: server + '/token_microsoft',
    inventory_micro: "/inventory",
    token_refresh_stamps: server + '/refresh_stamps',

    // fedexp 
    create_shipment: server + '/shipment',
    check_address_fedexp: server + '/address_validate_fedexp',
    rate_list_fedexp: server + '/rate_list_fedexp',

    // ups
    create_Shipment_UPS: server + '/ups_shipment',
    check_address_ups: server + '/address_validate_ups',
    rate_list_ups: server + '/rate_list_ups',

    // printer
    printer: "/printer",

    // stamps
    funds_STAMP: "/funds_stamps",
    create_shipment_stamps: server + '/stamps_shipment',
    check_address_stamps: server + '/address_validate_stamps',
    rate_list_stamps: server + '/rate_list_stamps',

    // authorise.net
    auth_net_charge: "/charge_card",

    // microsoft
    sale_orders_micro: server + '/sales',
    history_micro: server + '/history',
    new_order_micro: server + '/newOrder',
    csv_order_micro: server + '/csv_orders',
    customers_micro: server + '/customers',
    shipFrom: server + '/shipfrom',
    create_Shipment_micro: server + '/createShipment',
    pick_details_micro: server + '/pickDetails',
    request_pick_micro: server + '/requestPick',
    successPick_micro: server + '/successPick',
    pickingPage_micro: server + '/pickingPage',
    createPaking_micro: server + '/create-packing',
    registerPacking_micro: server + '/register-picking',
    getPacking_micro: server + '/get-picking',
    postPacking_micro: server + '/post-picking',
    gets_lots_detail_micro: server + '/lots',
    post_shipment_micro: server + '/post-shipment',
    post_invoice_micro: server + '/post-invoice',
    patchPicking_micro: server + '/patchDetails',


}





