export enum IAm {
    BuyerSeller = 0,
    Seller,
    Buyer,
    Renter
}

export const getIAmDisplayString = (iam: IAm) => {
    switch (iam) {
        case IAm.BuyerSeller:
            return 'Buyer & Seller';
        
        case IAm.Seller:
            return 'Seller';

        case IAm.Buyer:
            return 'Buyer';

        case IAm.Renter:
            return 'Renter';

        default:
            throw `Unknown IAm type: ${iam}`;
    }
}