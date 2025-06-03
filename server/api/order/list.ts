  async getList() {
    const { page, pageSize, status, startTime, endTime, orderNo, phone, name } = this.query
    const query: any = {}
    if (status) {
      query.status = status
    }
    if (startTime && endTime) {
      query.createTime = {
        $gte: new Date(startTime),
        $lte: new Date(endTime)
      }
    }
    if (orderNo) {
      query.orderNo = orderNo
    }
    if (phone) {
      query.phone = phone
    }
    if (name) {
      query.name = name
    }
    const total = await this.model.countDocuments(query)
    const list = await this.model
      .find(query)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
    return {
      list,
      total,
      page,
      pageSize
    }
  } 