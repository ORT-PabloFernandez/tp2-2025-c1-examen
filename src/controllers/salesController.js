import { getSales, saleByid, getSaleTotals, getSalesByClientEmail, setUpdateCouponUsed, topProducts } from "../services/salesService.js";

export const getAllSales = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSales(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSaleByid = async ( req, res ) => {
    try {
        const { id } = req.params;
        const sale = await saleByid(id);

        if( !sale ){
            res.status(404).json({ message: "No existe el sale con ese ID"})
        }

        res.json( sale )
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getTotalsSales = async (req, res) => {
    try {
        const sales = await getSaleTotals();

        if( !sales || sales.length === 0 ) {
            res.status(404).json({ message: "No hay ventas"})
        }

        res.json( sales )
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSaleByCustomerEmail = async ( req, res) => {
    try {
        const email = req.params.email
        const sales = await getSalesByClientEmail( email );

        if( !sales || sales.length === 0){
            res.status(404).json({ message: "No se encontraron ventas para ese email" });
        };

        res.json( sales );
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCoupon = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { couponUsed } = req.body;

        const result = await setUpdateCouponUsed( id , couponUsed );

        res.json( result );

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getTopRankingProducts = async ( req, res ) =>{
    try {
        const limit = parseInt(req.query.limit) || 5;

        const products = await topProducts( limit );

        res.json( products )

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}