export type IAddress=IAddressItem | IAddressItem[]

export interface IAddressItem{
    userId: number,
    addressId?: number,
    area: string,
    areaCode: string,
    detailsAddress: string,
    receiver: string,
    phone: string,
    isDefault: boolean
}