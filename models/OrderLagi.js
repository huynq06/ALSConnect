
import moment from 'moment';
class OrderLagi {
    constructor(id, items,orderId, date) {
      this.id = id;
      this.items = items;
      this.orderId = orderId;
      this.date = date;
    }
    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
      }
}

export default OrderLagi;


