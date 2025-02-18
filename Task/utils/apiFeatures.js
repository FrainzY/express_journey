const {Op} = require('sequelize');

class APIFeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
        this.features = {};
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ["page", "sort", "limit", "fields", "order"];

        excludedFields.forEach(el => delete queryObj[el]);

        const queryOperators = {
            gte: Op.gte,  // Greater than or equal
            gt: Op.gt,    // Greater than
            lte: Op.lte,  // Less than or equal
            lt: Op.lt,    // Less than
            ne: Op.ne,    // Not equal
            like: Op.iLike 
        };

        let where = {};

        for (let key in queryObj){
            let operatorKey = Object.keys(queryObj[key])[0];
            let operatorValue = queryObj[key][operatorKey];

            if(queryOperators[operatorKey]){
                where[key] = {
                    [queryOperators[operatorKey]]: operatorValue
                }
            } else {
                where[key] = queryObj[key];
            }
        }

        if(where){
            this.features = {
                where: where
            };
        }

        return this; 
    }

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort;
            const orderDirection = this.queryString.order 
                ? this.queryString.order.toLowerCase().split(',').map(dir => ['asc', 'desc'].includes(dir) ? dir.toUpperCase() : "ASC") 
                : ["ASC"];
            
            if(sortBy) {
                const sortFields = sortBy.split(',');

                const sortOrder = sortFields.map((_, i) => orderDirection[i] || "ASC");

                const orderArray = sortFields.map((field, index) =>[field, sortOrder[index]]);

                this.features = {
                    ...this.features,
                    order: orderArray,
                };
            }
        } else{
            this.features = {
                ...this.features,
                order: [['created_at', 'DESC']],
            };
        }
        return this;
    }

    limitFields(){
        if (this.queryString.fields){
            const fields = this.queryString.fields.split(',');
            this.features = {
                ...this.features,
                attributes: fields,
            }
        }

        return this;
    }

    paginate(){
        if(this.queryString.limit && this.queryString.page){
            const page = this.queryString.page * 1 || 1;
            const limit = this.queryString.limit * 1 || 100;
            const skip = (page - 1) * limit;
    
            this.features = {
                ...this.features,
                limit: limit,
                offset: skip,
            }
        }
        return this;
    }

    async execute(){
        console.log(this.features)
        this.query = await this.query.findAll(this.features);
        return this;
    }
}

module.exports = APIFeatures;