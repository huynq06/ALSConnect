class Lagi{
    constructor(id,mawb,hawb, piecesReceived,piecesExpected,weightReceived,weightExpected,statusGoods,tso,shipper,consignee,remark,lagi_master_ident,isFavourite=false) {
        this.id = id;
        this.mawb = mawb;
        this.hawb = hawb;
        this.piecesReceived = piecesReceived;
        this.piecesExpected = piecesExpected;
        this.weightReceived = weightReceived;
        this.weightExpected = weightExpected;
        this.statusGoods = statusGoods;
        this.tso = tso;
        this.shipper = shipper;
        this.consignee = consignee;
        this.remark = remark;
        this.lagi_master_ident = lagi_master_ident;
        this.isFavourite = isFavourite
      }
}
export default Lagi;